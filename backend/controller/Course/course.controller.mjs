import db from "../../config/db.config.mjs";
import transporter from "../../config/email.config.mjs";
import path from "path";

export const addCourse = (req, res) => {
  const {
    courseFullName,
    courseShortName,
    courseStartDate,
    courseEndDate,
    courseDescription,
    courseCategoryId, // Assuming this is course_category_id
  } = req.body;

  try {
    // Handle file upload
    const courseImage = req.file
      ? path.join("/uploads", req.file.filename)
      : "default_image.jpg";

    // Basic validation
    if (
      !courseFullName ||
      !courseShortName ||
      !courseStartDate ||
      !courseEndDate ||
      !courseImage ||
      !courseDescription
    ) {
      return res.json({ message: "All fields are required." });
    }

    // Insert the new course into the courses table
    db.query(
      `INSERT INTO courses (coursename, course_short_name, course_start_date, course_end_date, course_image, course_desc, course_category_id) 
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        courseFullName,
        courseShortName,
        courseStartDate,
        courseEndDate,
        courseImage,
        courseDescription,
        courseCategoryId,
      ],
      (err, result) => {
        if (err) {
          console.error("Error inserting course:", err);
          return res.status(500).json({ message: "Error inserting course" });
        }

        // Retrieve the inserted course ID
        const insertedCourseId = result.insertId;

        // Prepare path for the context table
        const contextPath = `${courseCategoryId}/${insertedCourseId}`;

        // Insert into the context table
        const addContextQuery = `
          INSERT INTO context (contextlevel, instanceid, path, depth) 
          VALUES (?, ?, ?, ?)`;
        const contextValues = [3, insertedCourseId, contextPath, null]; // contextlevel 3 for course

        db.query(
          addContextQuery,
          contextValues,
          (contextErr, contextResult) => {
            if (contextErr) {
              console.error("Error inserting into context table:", contextErr);
              return res
                .status(500)
                .json({ message: "Error inserting context data" });
            }

            // Successful response
            res
              .status(200)
              .json({ message: "Course and context added successfully" });
          }
        );
      }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ message: "catch error" });
  }
};

export const addModule = (req, res) => {
  const {
    moduleNames,
    path: modulePath,
    parentModule,
    selectedModuleId,
  } = req.body;
  const moduleImage = req.file; // Get the uploaded file

  // Parse moduleNames string to an array if it's a string
  let modules;
  try {
    modules = JSON.parse(moduleNames);
  } catch (error) {
    return res.status(400).json({ message: "Invalid moduleNames format" });
  }

  // Validate the parsed array
  if (!Array.isArray(modules) || modules.length === 0) {
    return res.json({
      message: "moduleNames is mandatory and should be an array",
    });
  }

  // Prepare the full file path or null if no file was uploaded
  const moduleImagePath = moduleImage
    ? path.join("/uploads", moduleImage.filename)
    : null;

  // Insert multiple module names into the modules table
  const addModulesQuery = `INSERT INTO modules (modulename, courseid, module_image, module_enable) VALUES ?`;
  const moduleValues = modules.map((name) => [
    name,
    selectedModuleId,
    moduleImagePath, // Save the full file path in the database
    1, // module_enable is always set to 1 (enabled)
  ]);

  db.query(addModulesQuery, [moduleValues], (err, result) => {
    if (err) {
      console.log("db_error", err);
      return res.json({ message: "db_error" });
    }

    // Retrieve the first inserted module ID
    const moduleIdStart = result.insertId;
    const numInsertedModules = modules.length;
    const insertedModuleIds = Array.from(
      { length: numInsertedModules },
      (_, i) => moduleIdStart + i
    );

    // Determine the effective parent module and course category ID
    const effectiveParentModule = parentModule || selectedModuleId;

    // Fetch the course_category_id and parent module path using a JOIN query
    const fetchCourseCategoryAndPathQuery = `
      SELECT c.course_category_id, ctx.path as parentPath
      FROM courses c
      LEFT JOIN context ctx ON ctx.instanceid = ?
      WHERE c.courseid = ?`;

    db.query(
      fetchCourseCategoryAndPathQuery,
      [effectiveParentModule, effectiveParentModule],
      (fetchErr, fetchResult) => {
        if (fetchErr) {
          console.log("fetch_error", fetchErr);
          return res.json({ message: "fetch_error" });
        }

        if (fetchResult.length === 0) {
          return res.json({ message: "effectiveParentModule not found" });
        }

        const { course_category_id, parentPath } = fetchResult[0];
        const pathPrefix = `${course_category_id}/${selectedModuleId}`;

        // Check existing depth under the current parent module
        const checkExistingDepthQuery = `
          SELECT depth 
          FROM context 
          WHERE contextlevel = 5 AND path = ? 
          ORDER BY depth DESC LIMIT 1`;

        db.query(
          checkExistingDepthQuery,
          [pathPrefix],
          (checkErr, checkResult) => {
            if (checkErr) {
              console.log("check_error", checkErr);
              return res.json({ message: "check_error" });
            }

            let newDepth;

            if (checkResult.length > 0) {
              const lastDepth = checkResult[0].depth;
              const depthSegments = lastDepth.split("/").map(Number);
              const lastSegment = depthSegments.pop();

              // Increment the last segment to generate the new depth
              newDepth = [...depthSegments, lastSegment + 1].join("/");
            } else {
              // If no existing depth, start with '0/1'
              newDepth = `0/1`;
            }

            // Prepare context data with the computed depth
            const addContextQuery = `INSERT INTO context (contextlevel, instanceid, path, depth) VALUES ?`;
            const contextValues = insertedModuleIds.map((moduleId) => [
              5, // Context level for modules
              moduleId,
              pathPrefix, // Path based on course_category_id and selectedModuleId
              newDepth, // Computed depth like '0/1'
            ]);

            // Insert context data into the context table
            db.query(
              addContextQuery,
              [contextValues],
              (contextErr, contextResult) => {
                if (contextErr) {
                  console.log("context_error", contextErr);
                  return res.json({ message: "context_error" });
                }

                res.status(200).json({ message: "modules added successfully" });
              }
            );
          }
        );
      }
    );
  });
};

export const getCourse = (req, res) => {
  const getCourses = `select * from courses`;

  db.query(getCourses, (err, result) => {
    if (err) {
      res.json({ message: "db_error" });
    } else {
      res.status(200).json({ result });
    }
  });
};

export const getModule = (req, res) => {
  const getModule = `select * from modules`;

  db.query(getModule, (err, result) => {
    if (err) {
      res.json({ message: "db_error" });
    } else {
      res.status(200).json({ result });
    }
  });
};

export const getModuleByCourseId = async (req, res) => {
  const { courseId } = req.params;

  try {
    db.query(
      `
      SELECT * FROM modules WHERE courseid = ?
    `,
      [courseId],
      (err, result) => {
        if (err) {
          res.json({ message: "db_error" });
        } else {
          res.status(200).json(result);
        }
      }
    );
  } catch (error) {
    console.error("Error fetching modules:", error);
    res.status(500).json({ message: "Error fetching modules" });
  }
};

export const getModulesByCourseId = (req, res) => {
  const { courseId } = req.params; // Assuming courseId is passed as a route parameter
  const baseUrl = "http://192.168.252.191:5000"; // Base URL for images

  // Query to get module details, count of quizzes, and count of videos based on courseId
  const query = `
    SELECT 
      m.modulename,
      CONCAT('${baseUrl}', m.module_image) AS module_image, -- Concatenate base URL with module_image
      c.instanceid AS moduleId,
      c.path,
      c.depth,
      
      -- Count videos (contextlevel = 6)
      COALESCE(SUM(CASE WHEN sub_c.contextlevel = 6 THEN 1 ELSE 0 END), 0) AS video_count,
      
      -- Count quizzes (contextlevel = 4)
      COALESCE(SUM(CASE WHEN sub_c.contextlevel = 4 THEN 1 ELSE 0 END), 0) AS quiz_count
      
    FROM 
      context c
    INNER JOIN 
      modules m ON c.instanceid = m.moduleid
    LEFT JOIN 
      context sub_c ON sub_c.instanceid = c.instanceid  -- Match the moduleId with the current context's instanceid
    WHERE 
      c.contextlevel = 5  -- Module context level
      AND CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(c.path, '/', -1), '/', 1) AS UNSIGNED) = ? -- Extract and compare courseId
      AND m.module_enable = 1 -- Only fetch modules where module_enable = 1 (enabled)
    GROUP BY 
      m.modulename, 
      m.module_image, 
      c.instanceid, 
      c.path, 
      c.depth
    ORDER BY 
      c.instanceid;
  `;

  db.query(query, [parseInt(courseId)], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "db_error" });
    }

    // Transform results into a structured response
    const modules = results.map((row) => {
      const videoCount = row.video_count;
      const quizCount = row.quiz_count;

      // Prepare video and quiz count string
      const activitySummary = `${videoCount} Video${
        videoCount !== 1 ? "s" : ""
      }  ${quizCount} Quiz${quizCount !== 1 ? "zes" : ""}`;

      return {
        moduleId: row.moduleId,
        modulename: row.modulename,
        module_image: row.module_image, // Full URL now included
        path: row.path,
        depth: row.depth,
        activities: activitySummary, // Return activities as a combined string
      };
    });

    res.status(200).json({ modules });
  });
};

export const submitCourseContent = (req, res) => {
  const {
    courseId,
    moduleId,
    submoduleId,
    description,
    content,
    availableFrom,
    availableUntil,
    completionCriteria,
    groupMode,
    course_category_id,
  } = req.body;

  const image = req.file ? req.file.path : null;

  console.log({
    courseId,
    moduleId,
    description,
    content,
    availableFrom,
    availableUntil,
    completionCriteria,
    groupMode,
    course_category_id,
    image,
  });

  // Step 1: Fetch the module name using the moduleId
  const fetchModuleNameQuery = `SELECT modulename FROM modules WHERE moduleid = ?`;
  db.query(fetchModuleNameQuery, [moduleId], (err, moduleResult) => {
    if (err) {
      console.error("Error fetching module name:", err);
      return res.json({ error: "Failed to fetch module name" });
    }

    const moduleName = moduleResult[0]?.modulename || "";

    // Step 2: Insert into the `pages` table with activity_name
    const insertPageQuery = `
      INSERT INTO pages (courseid, moduleid, description, page_content, activity_name)
      VALUES (?, ?, ?, ?, ?)
    `;
    const pageValues = [courseId, moduleId, description, content, moduleName];

    db.query(insertPageQuery, pageValues, (err, result) => {
      if (err) {
        console.error("Error inserting into pages:", err);
        return res.json({ error: "Failed to insert page data" });
      }

      const pageId = result.insertId;

      // Construct the path for the context table
      const path = `${course_category_id}/${courseId}`;

      // Step 3: Determine the depth based on the existing context entries
      const fetchContextQuery = `
        SELECT MAX(depth) as maxDepth FROM context 
        WHERE path = ? AND contextlevel = 6
      `;
      db.query(fetchContextQuery, [path], (err, contextResult) => {
        if (err) {
          console.error("Error fetching context depth:", err);
          return res.json({ error: "Failed to fetch context depth" });
        }

        // Convert maxDepth to a number before incrementing
        const currentDepth = parseInt(contextResult[0]?.maxDepth) || 0;
        const newDepth = currentDepth + 1;

        // Step 4: Insert into the `context` table with calculated depth
        const insertContextQuery = `
          INSERT INTO context (instanceid, path, contextlevel, depth)
          VALUES (?, ?, ?, ?)
        `;
        const contextValues = [moduleId, path, 6, newDepth];

        db.query(insertContextQuery, contextValues, (err, result) => {
          if (err) {
            console.error("Error inserting into context:", err);
            return res.json({ error: "Failed to insert context data" });
          }

          const contextId = result.insertId;

          // Step 5: Insert into the `activity` table
          const insertActivityQuery = `
            INSERT INTO activity (pageid, context_id, available_from, available_until, completion_criteria, group_mode)
            VALUES (?, ?, ?, ?, ?, ?)
          `;
          const activityValues = [
            pageId,
            contextId,
            availableFrom,
            availableUntil,
            completionCriteria,
            groupMode,
          ];

          db.query(insertActivityQuery, activityValues, (err, result) => {
            if (err) {
              console.error("Error inserting into activity:", err);
              return res.json({ error: "Failed to insert activity data" });
            }

            // Step 6: Update `pages` table to include `context_id`
            const updatePageQuery = `
              UPDATE pages
              SET context_id = ?
              WHERE pageid = ?
            `;
            const updatePageValues = [contextId, pageId];

            db.query(updatePageQuery, updatePageValues, (err, result) => {
              if (err) {
                console.error("Error updating pages with context_id:", err);
                return res.json({
                  error: "Failed to update pages with context_id",
                });
              }

              res.status(200).json({
                message: "Content submitted and updated successfully",
                pageId,
                contextId,
                activityId: result.insertId,
              });
            });
          });
        });
      });
    });
  });
};

export const getStructuredData = (req, res) => {
  // SQL query to fetch all relevant data including quizzes
  const sql = `
    SELECT 
      c.courseid, 
      c.coursename, 
      m.moduleid, 
      m.modulename, 
      q.id AS quiz_id, 
      q.text AS quiz_text,
      ctx_course.contextlevel AS course_contextlevel, 
      ctx_module.contextlevel AS module_contextlevel, 
      ctx_quiz.contextlevel AS quiz_contextlevel, 
      ctx_course.instanceid AS course_instanceid, 
      ctx_module.instanceid AS module_instanceid, 
      ctx_quiz.instanceid AS quiz_instanceid, 
      ctx_module.path AS module_path, 
      ctx_module.depth AS module_depth, 
      ctx_quiz.path AS quiz_path, 
      ctx_quiz.depth AS quiz_depth
    FROM 
      courses c
    LEFT JOIN 
      context ctx_course ON c.courseid = ctx_course.instanceid AND ctx_course.contextlevel = 3
    LEFT JOIN 
      context ctx_module ON ctx_module.path LIKE CONCAT('%/', c.courseid) AND ctx_module.contextlevel = 5
    LEFT JOIN 
      context ctx_quiz ON ctx_quiz.path LIKE CONCAT('%/', c.courseid) AND ctx_quiz.contextlevel = 4
    LEFT JOIN 
      modules m ON m.moduleid = ctx_module.instanceid AND ctx_module.contextlevel = 5
    LEFT JOIN 
      quiz_text q ON q.id = ctx_quiz.instanceid AND ctx_quiz.contextlevel = 4
    WHERE 
      ctx_course.contextlevel = 3 OR ctx_module.contextlevel = 5 OR ctx_quiz.contextlevel = 4
    ORDER BY 
      ctx_course.contextlevel, ctx_module.depth, ctx_quiz.depth;
  `;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error fetching structured data:", error);
      return res.status(500).json({ error: "Failed to fetch structured data" });
    }

    // Initialize a map to store courses
    const courseMap = new Map();

    // First pass: Initialize courses
    results.forEach((row) => {
      const { courseid, coursename, course_contextlevel } = row;

      if (course_contextlevel === 3) {
        // Course level
        if (!courseMap.has(courseid)) {
          courseMap.set(courseid, {
            label: coursename,
            value: `${courseid}`,
            children: [],
          });
        }
      }
    });

    // Second pass: Add modules and quizzes to build hierarchy
    results.forEach((row) => {
      const {
        courseid,
        moduleid,
        modulename,
        module_contextlevel,
        quiz_id,
        quiz_text,
        quiz_contextlevel,
        module_path,
        module_depth,
        quiz_path,
        quiz_depth,
      } = row;

      // Handling Modules
      if (module_contextlevel === 5 && moduleid) {
        const extractedCourseId = module_path
          ? module_path.split("/")[1]
          : null;

        if (extractedCourseId && extractedCourseId === String(courseid)) {
          if (courseMap.has(courseid)) {
            const currentCourse = courseMap.get(courseid);
            const moduleNode = {
              label: modulename || `Module ${moduleid}`,
              value: `${moduleid}`,
              children: [],
            };

            // Directly add module node without unnecessary depth nodes
            currentCourse.children.push(moduleNode);
          }
        }
      }

      // Handling Quizzes
      if (quiz_contextlevel === 4 && quiz_id) {
        const extractedCourseId = quiz_path ? quiz_path.split("/")[1] : null;

        if (extractedCourseId && extractedCourseId === String(courseid)) {
          if (courseMap.has(courseid)) {
            const currentCourse = courseMap.get(courseid);
            const quizNode = {
              label: quiz_text || `Quiz ${quiz_id}`,
              value: `${quiz_id}`,
              children: [],
            };

            // Directly add quiz node without unnecessary depth nodes
            currentCourse.children.push(quizNode);
          }
        }
      }
    });

    // Convert the map to an array
    const structuredData = Array.from(courseMap.values());

    // Debugging: Log the structured data to verify correctness
    // console.log("Structured Data:", JSON.stringify(structuredData, null, 2));

    // Send the response
    res.status(200).json(structuredData);
  });
};

export const getActivityData = (req, res) => {
  const { course_id, module_id } = req.params;

  // Fetch course_category_id using the course_id
  const courseQuery = `
    SELECT course_category_id FROM courses 
    WHERE courseid = ?
  `;

  db.query(courseQuery, [course_id], (err, courseResults) => {
    if (err) {
      console.error("Error fetching course data:", err);
      return res.status(500).json({ message: "Error fetching course data" });
    }

    if (!courseResults.length) {
      return res.status(404).json({ message: "Course not found" });
    }

    const courseCategoryId = courseResults[0].course_category_id;

    // Fetch module name from the modules table
    const moduleQuery = `
      SELECT modulename FROM modules 
      WHERE moduleid = ?
    `;

    db.query(moduleQuery, [module_id], (err, moduleResults) => {
      if (err) {
        console.error("Error fetching module data:", err);
        return res.status(500).json({ message: "Error fetching module data" });
      }

      if (!moduleResults.length) {
        return res.status(404).json({ message: "Module not found" });
      }

      const moduleName = moduleResults[0].modulename;

      // Fetch context data based on course_category_id and module_id
      const contextQuery = `
        SELECT * FROM context 
        WHERE path LIKE ? 
          AND instanceid = ? 
          AND contextlevel IN (4, 6)
      `;

      db.query(
        contextQuery,
        [`%${courseCategoryId}%`, module_id],
        (err, contextResults) => {
          if (err) {
            console.error("Error fetching context data:", err);
            return res
              .status(500)
              .json({ message: "Error fetching context data" });
          }

          if (!contextResults.length) {
            return res.status(404).json({ message: "Context not found" });
          }

          // Process context data
          const contextData = contextResults.map((context) => {
            const { contextlevel, context_id, depth } = context;

            let activitiesQuery = "";
            let queryParams = [];

            if (contextlevel === 4) {
              // Fetch quiz type name along with quiz data (max_no_of_questions, question_ids)
              activitiesQuery = `
              SELECT q.quiz_type_id, qt.quiz_type_name, q.max_no_of_questions, q.question_ids, ? AS depth 
              FROM quiz q
              JOIN quiz_type qt ON q.quiz_type_id = qt.quiz_type_id
              WHERE q.context_id = ?
            `;
              queryParams = [depth, context_id];
            } else if (contextlevel === 6) {
              // Fetch activity name
              activitiesQuery = `
              SELECT page_content, activity_name, ? AS depth 
              FROM pages 
              WHERE context_id = ?
            `;
              queryParams = [depth, context_id];
            }

            return {
              context_id,
              contextlevel,
              depth,
              activitiesQuery,
              queryParams,
            };
          });

          // Fetch activities and handle quiz questions
          let activitiesResults = [];
          let pendingQueries = contextData.length;

          contextData.forEach((data) => {
            if (data.activitiesQuery) {
              db.query(
                data.activitiesQuery,
                data.queryParams,
                (err, results) => {
                  if (err) {
                    console.error("Error fetching activities:", err);
                    return res
                      .status(500)
                      .json({ message: "Error fetching activities" });
                  }

                  // If it's a quiz context (contextlevel === 4), handle quiz questions
                  if (data.contextlevel === 4 && results.length > 0) {
                    const quizData = results[0]; // Assuming each context_id has one quiz

                    handleQuizQuestions(
                      quizData,
                      (err, questionsWithOptions) => {
                        if (err) {
                          return res.status(500).json(err);
                        }

                        activitiesResults.push({
                          quiz_type_id: quizData.quiz_type_id,
                          quiz_type_name: quizData.quiz_type_name,
                          depth: quizData.depth,
                          questions: questionsWithOptions, // Add questions to the quiz data
                        });

                        pendingQueries -= 1;
                        if (pendingQueries === 0) {
                          // Sort activities by depth
                          activitiesResults.sort((a, b) => a.depth - b.depth);
                          return res.json({
                            course_id,
                            module_id,
                            modulename: moduleName, // Add module name to the response
                            activities: activitiesResults,
                          });
                        }
                      }
                    );
                  } else {
                    // For non-quiz activities, just add them to results
                    activitiesResults = activitiesResults.concat(results);

                    pendingQueries -= 1;
                    if (pendingQueries === 0) {
                      activitiesResults.sort((a, b) => a.depth - b.depth);
                      return res.json({
                        course_id,
                        module_id,
                        modulename: moduleName, // Add module name to the response
                        activities: activitiesResults,
                      });
                    }
                  }
                }
              );
            } else {
              pendingQueries -= 1;
              if (pendingQueries === 0) {
                activitiesResults.sort((a, b) => a.depth - b.depth);
                return res.json({
                  course_id,
                  module_id,
                  modulename: moduleName, // Add module name to the response
                  activities: activitiesResults,
                });
              }
            }
          });
        }
      );
    });
  });
};

// Helper function to handle quiz questions logic
const handleQuizQuestions = (quizData, callback) => {
  const { max_no_of_questions, question_ids, context_id } = quizData;

  let questionIdsArray = [];

  // Check if `question_ids` is already a JSON array or a CSV string
  if (typeof question_ids === "string") {
    // If it's a CSV string, split it into an array
    questionIdsArray = question_ids.split(",").map(Number);
  } else if (typeof question_ids === "object" && Array.isArray(question_ids)) {
    // If it's already a JSON array
    questionIdsArray = question_ids;
  } else if (question_ids) {
    // In case it's stored as a JSON string but is still valid JSON (unlikely here but just in case)
    try {
      questionIdsArray = JSON.parse(question_ids);
    } catch (error) {
      console.error("Error parsing question_ids:", error);
      return callback({ message: "Invalid question_ids format" });
    }
  }

  if (!question_ids || questionIdsArray.length === 0) {
    // If question_ids is empty or null, fetch random questions based on max_no_of_questions
    const fetchRandomQuestionsQuery = `
      SELECT id, text, correct_answer, moduleid, courseid 
      FROM quiz_text 
      WHERE context_id = ? 
      ORDER BY RAND() 
      LIMIT ?
    `;
    db.query(
      fetchRandomQuestionsQuery,
      [context_id, max_no_of_questions],
      (err, randomQuestions) => {
        if (err) {
          console.error("Error fetching random questions:", err);
          return callback({ message: "Error fetching random questions" });
        }

        fetchQuestionOptions(randomQuestions, callback);
      }
    );
  } else {
    // If question_ids exist, fetch those specific questions
    const fetchSpecificQuestionsQuery = `
      SELECT id, text, correct_answer, moduleid, courseid 
      FROM quiz_text 
      WHERE id IN (?)
    `;
    db.query(
      fetchSpecificQuestionsQuery,
      [questionIdsArray],
      (err, specificQuestions) => {
        if (err) {
          console.error("Error fetching specific questions:", err);
          return callback({ message: "Error fetching specific questions" });
        }

        fetchQuestionOptions(specificQuestions, callback);
      }
    );
  }
};

// Helper function to fetch options for each question
const fetchQuestionOptions = (questions, callback) => {
  if (!questions || questions.length === 0) {
    return callback(null, []);
  }

  const questionIds = questions.map((q) => q.id);

  const fetchOptionsQuery = `
    SELECT id, \`option\`
    FROM quiz_text
    WHERE id IN (?)
  `;

  db.query(fetchOptionsQuery, [questionIds], (err, options) => {
    if (err) {
      console.error("Error fetching question options:", err);
      return callback({ message: "Error fetching question options" });
    }

    // Attach options to questions
    const questionsWithOptions = questions.map((question) => {
      const questionOption = options.find((opt) => opt.id === question.id);
      if (questionOption) {
        try {
          // Check if the option is already an object, if not parse it
          const parsedOptions =
            typeof questionOption.option === "string"
              ? JSON.parse(questionOption.option) // Parse only if it's a string
              : questionOption.option; // Use it directly if it's an object

          question.options = parsedOptions; // Attach parsed options array to the question
        } catch (jsonErr) {
          console.error("Error parsing JSON options:", jsonErr);
        }
      }
      return question;
    });

    callback(null, questionsWithOptions);
  });
};