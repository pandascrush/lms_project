import db from "../../config/db.config.mjs";
import transporter from "../../config/email.config.mjs";

export const getPaidUsersCount = (req, res) => {
  // SQL query to count users with has_paid = 1, excluding user_id 1 and 2
  const query = `
      SELECT COUNT(*) AS paidUsersCount
      FROM user
      WHERE user_id NOT IN (1, 2) AND has_paid = 1
    `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching paid users count: ", err);
      return res.status(500).json({ error: "Database query failed." });
    }

    // Retrieve the count from the query result
    const { paidUsersCount } = results[0];
    res.json({ paidUsersCount });
  });
};

export const getUserStatusCounts = (req, res) => {
  const activeThreshold = 10; // days
  const currentDate = new Date();

  // Query for active users (last login/logout within 10 days) excluding user_id 1 and 2
  const activeUsersQuery = `
      SELECT user_id 
      FROM standardlog 
      WHERE eventname IN ('login', 'logout') 
      AND user_id NOT IN (1, 2)
      GROUP BY user_id
      HAVING DATEDIFF(?, MAX(time_created)) <= ?;
    `;

  // Query for inactive users (no login/logout within the last 10 days) excluding user_id 1 and 2
  const inactiveUsersQuery = `
      SELECT u.user_id 
      FROM user u
      LEFT JOIN (
        SELECT user_id 
        FROM standardlog 
        WHERE eventname IN ('login', 'logout')
        AND user_id NOT IN (1, 2)
        GROUP BY user_id
        HAVING DATEDIFF(?, MAX(time_created)) <= ?
      ) AS active_users ON u.user_id = active_users.user_id
      WHERE active_users.user_id IS NULL
      AND u.user_id NOT IN (1, 2);
    `;

  // Query for completed users (assessment_type === 2 for all 18 modules)
  const completedUsersQuery = `
      SELECT COUNT(DISTINCT user_id) AS completedUsers 
      FROM quiz_attempt 
      WHERE assessment_type = 2
      GROUP BY user_id 
      HAVING COUNT(DISTINCT moduleid) = 18;
    `;

  // Execute the queries
  db.query(
    activeUsersQuery,
    [currentDate, activeThreshold],
    (err, activeResults) => {
      if (err) {
        console.error("Error querying active users:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const activeCount = activeResults.length;

      db.query(
        inactiveUsersQuery,
        [currentDate, activeThreshold],
        (err, inactiveResults) => {
          if (err) {
            console.error("Error querying inactive users:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          const inactiveCount = inactiveResults.length;

          db.query(completedUsersQuery, (err, completedResults) => {
            if (err) {
              console.error("Error querying completed users:", err);
              return res.status(500).json({ error: "Internal Server Error" });
            }

            const completedCount = completedResults[0]?.completedUsers || 0;

            res.json({
              activeUsers: activeCount,
              inactiveUsers: inactiveCount,
              completedUsers: completedCount,
            });
          });
        }
      );
    }
  );
};

export const getUserStats = async (req, res) => {
  try {
    const currentDate = new Date();
    const activeThreshold = 10; // days
    const totalModules = 18; // Total number of modules

    // Query to get active users with module completion count and percentage
    const activeUsersQuery = `
        SELECT u.user_id, u.first_name, u.created_at as last_activity,
               COUNT(DISTINCT qa.moduleid) as completed_modules
        FROM user u
        JOIN standardlog sl ON u.user_id = sl.user_id
        LEFT JOIN quiz_attempt qa ON u.user_id = qa.user_id AND qa.assessment_type = 2
        WHERE sl.eventname IN ('login', 'logout')
        AND u.user_id NOT IN (1, 2) -- Exclude specific user_ids
        GROUP BY u.user_id
        HAVING DATEDIFF(?, MAX(sl.time_created)) <= ?;
      `;

    // Query to get inactive users
    const inactiveUsersQuery = `
        SELECT u.user_id, u.first_name, u.created_at as last_activity
        FROM user u
        LEFT JOIN standardlog sl ON u.user_id = sl.user_id
        WHERE u.user_id NOT IN (1, 2) -- Exclude specific user_ids
        AND u.user_id NOT IN (
          SELECT DISTINCT user_id 
          FROM standardlog 
          WHERE eventname IN ('login', 'logout')
          AND DATEDIFF(?, time_created) <= ?
        )
        GROUP BY u.user_id;
      `;

    // Query to get completed users
    const completedUsersQuery = `
        SELECT u.user_id, u.first_name, COUNT(DISTINCT qa.moduleid) as completed_modules 
        FROM user u
        JOIN quiz_attempt qa ON u.user_id = qa.user_id
        WHERE qa.assessment_type = 2
        GROUP BY u.user_id 
        HAVING completed_modules = 18
        AND u.user_id NOT IN (1, 2); -- Exclude specific user_ids
      `;

    // Query to get leaderboard data
    const leaderboardQuery = `
        SELECT u.user_id, u.first_name, COUNT(DISTINCT qa.moduleid) as modules,
               u.created_at as date
        FROM user u
        JOIN quiz_attempt qa ON u.user_id = qa.user_id
        WHERE qa.assessment_type = 2
        GROUP BY u.user_id
        ORDER BY modules DESC;
      `;

    // Execute the queries
    const [activeUsers] = await db
      .promise()
      .query(activeUsersQuery, [currentDate, activeThreshold]);
    const [inactiveUsers] = await db
      .promise()
      .query(inactiveUsersQuery, [currentDate, activeThreshold]);
    const [completedUsers] = await db.promise().query(completedUsersQuery);
    const [leaderboardData] = await db.promise().query(leaderboardQuery);

    // Format the results
    const activeData = activeUsers.map((user) => ({
      name: user.first_name, // Use first_name here
      date: user.last_activity,
      modules: user.completed_modules, // Number of completed modules
      percent: `${((user.completed_modules / totalModules) * 100).toFixed(2)}%`, // Calculate percentage
    }));

    const inactiveData = inactiveUsers.map((user) => ({
      name: user.first_name, // Use first_name here
      date: user.last_activity,
      modules: 0, // Default for inactive users
      percent: "0%",
    }));

    const completedData = completedUsers.map((user) => ({
      name: user.first_name, // Use first_name here
      date: user.last_activity,
      modules: 18, // Completed all 18 modules
      percent: "100%",
    }));

    const leaderBoardData = leaderboardData.map((user) => ({
      name: user.first_name, // Use first_name here
      date: user.date,
      modules: user.modules,
      percent: `${((user.modules / totalModules) * 100).toFixed(2)}%`, // Assuming 18 modules total
    }));

    // Return the aggregated response
    res.json({
      activeData,
      inactiveData,
      completedData,
      leaderBoardData,
    });
  } catch (error) {
    console.error("Error fetching user stats: ", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

export const countTotalUsers = (req, res) => {
  const query = `
    SELECT COUNT(*) as totalUsers 
    FROM user 
    WHERE user_id NOT IN (1, 2);
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching total user count:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    const totalUsers = results[0].totalUsers;
    res.json({ totalUsers });
  });
};

// -----------------------------------------

export const inviteLearners = (req, res) => {
  const { company_id } = req.params;
  const { emails } = req.body; // expecting a comma-separated string of emails

  if (!emails || typeof emails !== "string") {
    return res.json({ message: "Invalid email list provided." });
  }

  // Split the emails string by commas and trim whitespace
  const emailArray = emails.split(",").map((email) => email.trim());

  // Step 1: Check for existing emails
  const checkEmailQuery =
    "SELECT email FROM invite_learners WHERE company_id = ? AND email IN (?)";

  db.query(
    checkEmailQuery,
    [company_id, emailArray],
    (checkErr, existingEmailsResult) => {
      if (checkErr) {
        return res.json({
          message: "Database error while checking emails",
          error: checkErr,
        });
      }

      // Get the list of already existing emails
      const existingEmails = existingEmailsResult.map((row) => row.email);

      // Filter out the existing emails from the emailArray
      const emailsToInvite = emailArray.filter(
        (email) => !existingEmails.includes(email)
      );
      const emailCount = emailsToInvite.length; // Number of emails to invite

      // If all emails are already invited, send a response
      if (emailCount === 0) {
        return res.json({
          message: "All emails are already invited",
          existingEmails,
        });
      }

      // Start transaction
      db.beginTransaction((transactionError) => {
        if (transactionError) {
          return res.json({
            message: "Transaction error",
            error: transactionError,
          });
        }

        // Step 2: Fetch the current license and invite counts
        const getLicenseQuery =
          "SELECT license, invite FROM license WHERE company_id = ?";
        db.query(getLicenseQuery, [company_id], (err, licenseResults) => {
          if (err) {
            return db.rollback(() => {
              res.json({
                message: "Error fetching license details",
                error: err,
              });
            });
          }

          if (licenseResults.length === 0) {
            return db.rollback(() => {
              res.json({
                message: "No license record found for this company.",
              });
            });
          }

          const { license, invite } = licenseResults[0];

          // Check if there are enough licenses available
          if (license < emailCount) {
            return db.rollback(() => {
              res.json({ message: "Not enough licenses available." });
            });
          }

          // Step 3: Update license and invite counts
          const updatedLicense = license - emailCount;
          const updatedInvite = invite + emailCount;
          const updateLicenseQuery =
            "UPDATE license SET license = ?, invite = ? WHERE company_id = ?";

          db.query(
            updateLicenseQuery,
            [updatedLicense, updatedInvite, company_id],
            (updateErr) => {
              if (updateErr) {
                return db.rollback(() => {
                  res.json({
                    message: "Error updating license count",
                    error: updateErr,
                  });
                });
              }

              // Step 4: Insert new learners into invite_learners table
              const insertQuery =
                "INSERT INTO invite_learners (company_id, email) VALUES ?";
              const values = emailsToInvite.map((email) => [company_id, email]);

              db.query(insertQuery, [values], (insertErr, result) => {
                if (insertErr) {
                  return db.rollback(() => {
                    res.json({
                      message: "Error inviting learners",
                      error: insertErr,
                    });
                  });
                }

                // Step 5: Send emails to newly invited learners
                emailsToInvite.forEach((email) => {
                  sendEmail(email, company_id); // Send email to each learner
                });

                // Commit the transaction if everything is successful
                db.commit((commitErr) => {
                  if (commitErr) {
                    return db.rollback(() => {
                      res.json({
                        message: "Transaction commit error",
                        error: commitErr,
                      });
                    });
                  }

                  res.json({
                    message:
                      "Learners invited, licenses updated, and emails sent successfully",
                    invitedEmails: emailsToInvite,
                    existingEmails,
                  });
                });
              });
            }
          );
        });
      });
    }
  );
};

// Email sending function
const sendEmail = (email, company_id) => {
  const URL = `${process.env.DOMAIN}/inv_register/${company_id}`;

  const mailOptions = {
    from: "sivaranji5670@gmail.com", // sender email
    to: email, // recipient email
    subject: "Welcome to Dr Ken Spine Coach",
    text: `Welcome to Dr Ken Spine Coach!

You have been invited to join the platform.

Your registration link is here:
${URL}

Best regards,
The Dr Ken Spine Coach Team`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email to:", email, error);
    } else {
      console.log("Email sent successfully to:", email, info.response);
    }
  });
};

export const companyEmailDetail = (req, res) => {
  let { bussiness_id } = req.params;
  var Dashboardsql = `SELECT spoc_email_id 
FROM business_register 
WHERE company_id = ?`;
  db.query(Dashboardsql, [bussiness_id], (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }
  });
};

export const checkTransaction = (req, res) => {
  var { bussiness_id } = req.params;
  var { email, checkno, quantity, amount } = req.body;
  var insertchecktransation =
    "insert into offlinetransaction(company_id,email,checkno,quantity,amount,status,approved)values(?,?,?,?,?,?,?)";
  db.query(
    insertchecktransation,
    [bussiness_id, email, checkno, quantity, amount, "C", 0],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send({ status: "inserted" });
      }
    }
  );
};

export const neftTransaction = (req, res) => {
  var { bussiness_id } = req.params;
  var { email, checkno, quantity, amount } = req.body;
  var insertchecktransation =
    "insert into offlinetransaction(company_id,email,checkno,quantity,amount,status,approved)values(?,?,?,?,?,?,?)";
  db.query(
    insertchecktransation,
    [bussiness_id, email, checkno, quantity, amount, "C", 0],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send({ status: "inserted" });
      }
    }
  );
};

export const getLicenseCountByCompanyId = (req, res) => {
  const companyId = req.params.company_id;

  // Query to get license details from the 'license' table
  const query = "SELECT license FROM license WHERE company_id = ?";

  db.query(query, [companyId], (error, results) => {
    if (error) {
      console.error("Error fetching license:", error);
      return res.json({
        success: false,
        message: "An error occurred while fetching license details",
      });
    }

    if (results.length === 0) {
      return res.json({
        success: false,
        message: `No license found for company_id: ${companyId}`,
      });
    }

    // Send the license details in the response
    res.json({
      success: true,
      data: results[0], // Return the license details
    });
  });
};

export const countInvitedLearners = (req, res) => {
  const { company_id } = req.params;

  if (!company_id) {
    return res.status(400).json({ message: "Company ID is required." });
  }

  // SQL query to count learners based on company_id
  const query =
    "SELECT COUNT(*) AS invite_count FROM invite_learners WHERE company_id = ?";

  db.query(query, [company_id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    // Return the count from the result
    const inviteCount = results[0].invite_count;
    res.json({ company_id, invite_count: inviteCount });
  });
};

export const enrolledUserCount = (req, res) => {
  const { company_id } = req.params;

  // Query to fetch emails from user_enrollment and invite_learners tables
  const enrollmentQuery =
    "SELECT email FROM user_enrollment WHERE company_id = ?";
  const inviteQuery = "SELECT email FROM invite_learners WHERE company_id = ?";

  // Fetch emails from user_enrollment
  db.query(enrollmentQuery, [company_id], (enrollErr, enrollmentResults) => {
    if (enrollErr) {
      console.error(enrollErr);
      return res.json({
        message: "Error fetching emails from user_enrollment table.",
      });
    }

    if (enrollmentResults.length === 0) {
      return res.json({
        message: "No emails found in user_enrollment table for this company.",
      });
    }

    // Fetch emails from invite_learners
    db.query(inviteQuery, [company_id], (inviteErr, inviteResults) => {
      if (inviteErr) {
        console.error(inviteErr);
        return res.json({
          message: "Error fetching emails from invite_learners table.",
        });
      }

      if (inviteResults.length === 0) {
        return res.json({
          message: "No emails found in invite_learners table for this company.",
        });
      }

      // Extract emails from both results
      const enrollmentEmails = enrollmentResults.map((row) => row.email);
      const inviteEmails = inviteResults.map((row) => row.email);

      // Find matching emails between the two lists
      const matchingEmails = enrollmentEmails.filter((email) =>
        inviteEmails.includes(email)
      );
      const matchingCount = matchingEmails.length;

      // Return the count of matched emails
      res.json({
        message: "Matching emails counted successfully",
        matchingCount,
      });
    });
  });
};
