import db from "../config/db.config.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/email.config.mjs";
const saltRounds = 10;
const jwtSecret = "secret";

export const registerUser = (req, res) => {
  const { name, email, phone_no, password } = req.body;

  if (!name || !email || !phone_no || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if email exists in User or Auth tables
  db.query(
    "SELECT email FROM user WHERE email = ?",
    [email],
    (err, userRows) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Error checking email in User table." });
      }

      if (userRows.length > 0) {
        return res
          .status(400)
          .json({ message: "Email already exists in User table." });
      }

      db.query(
        "SELECT email FROM auth WHERE email = ?",
        [email],
        (err, authRows) => {
          if (err) {
            console.error(err);
            return res
              .status(500)
              .json({ message: "Error checking email in Auth table." });
          }

          if (authRows.length > 0) {
            return res
              .status(400)
              .json({ message: "Email already exists in Auth table." });
          }

          // Hash the password
          bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
            if (err) {
              console.error(err);
              return res
                .status(500)
                .json({ message: "Error hashing password." });
            }

            // Insert into User table
            db.query(
              "INSERT INTO user (first_name, email, phone_no, password) VALUES (?, ?, ?, ?)",
              [name, email, phone_no, hashedPassword],
              (err, userResult) => {
                if (err) {
                  console.error(err);
                  return res
                    .status(500)
                    .json({ message: "Error inserting into User table." });
                }

                // Get user ID
                const userId = userResult.insertId;

                // Insert into Auth table
                db.query(
                  "INSERT INTO auth (email, password, user_id) VALUES (?, ?, ?)",
                  [email, hashedPassword, userId],
                  (err) => {
                    if (err) {
                      console.error(err);

                      // Rollback User table insert if Auth insert fails
                      db.query(
                        "DELETE FROM user WHERE email = ?",
                        [email],
                        () => {}
                      );

                      return res
                        .status(500)
                        .json({ message: "Error inserting into Auth table." });
                    }

                    // Insert into Context table
                    db.query(
                      "INSERT INTO context (contextlevel, instanceid) VALUES (?, ?)",
                      [2, userId],
                      (err, contextResult) => {
                        if (err) {
                          console.error(err);

                          // Rollback the inserts if Context insert fails
                          db.query(
                            "DELETE FROM user WHERE email = ?",
                            [email],
                            () => {}
                          );
                          db.query(
                            "DELETE FROM auth WHERE email = ?",
                            [email],
                            () => {}
                          );

                          return res.status(500).json({
                            message: "Error inserting into Context table.",
                          });
                        }

                        const contextId = contextResult.insertId;

                        // Update the User table with context_id
                        db.query(
                          "UPDATE user SET context_id = ? WHERE email = ?",
                          [contextId, email],
                          (err) => {
                            if (err) {
                              console.error(err);

                              // Rollback the inserts if User update fails
                              db.query(
                                "DELETE FROM user WHERE email = ?",
                                [email],
                                () => {}
                              );
                              db.query(
                                "DELETE FROM auth WHERE email = ?",
                                [email],
                                () => {}
                              );

                              return res.status(500).json({
                                message:
                                  "Error updating User table with context_id.",
                              });
                            }

                            // Send welcome email
                            const mailOptions = {
                              from: "sivaranji5670@gmail.com",
                              to: email,
                              subject: "Welcome to LMS",
                              text: `Hello ${name},\n\nThank you for registering with our LMS platform!\n\nBest Regards,\nLMS Team`,
                            };

                            transporter.sendMail(mailOptions, (error) => {
                              if (error) {
                                console.error(error);

                                // Rollback the inserts if email fails
                                db.query(
                                  "DELETE FROM user WHERE email = ?",
                                  [email],
                                  () => {}
                                );
                                db.query(
                                  "DELETE FROM auth WHERE email = ?",
                                  [email],
                                  () => {}
                                );

                                return res.status(500).json({
                                  message:
                                    "Registration failed. Please try again.",
                                });
                              } else {
                                res.status(201).json({
                                  message: "User registered successfully.",
                                });
                              }
                            });
                          }
                        );
                      }
                    );
                  }
                );
              }
            );
          });
        }
      );
    }
  );
};

export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Check if the user exists
  db.query("SELECT * FROM auth WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.json({ message: "Invalid email or password raw data" });
    }

    const user = results[0];

    // Compare the hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: "Error comparing passwords" });
      }

      if (!isMatch) {
        return res.json({ message: "Invalid email or password" });
      }

      // Create a JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
        expiresIn: "1h",
      });

      // Respond with the token
      res.json({ message: "login success", token, user});
    });
  });
};
