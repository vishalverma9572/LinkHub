
  
  app.post('/register', async (req, res) => {
      const { name, email, password } = req.body;
      console.log(name, email, password);
  
      try {
          // Call the user_registration function asynchronously
          const user = await db.user_registration(name, email, password);
  
          if (user.error) {
              // If user_registration returns an error, send a failed response
              res.status(400).json({ status: 'failed', error: user.error });
          } else {
              // Registration successful, send a success response with the user object
  
              res.status(200).json({ status: 'success', user: user });
  
                // Send welcome email to user
        const mailOptions = {
          from: "linkhub055@gmail.com", // Update with your Gmail email address
          to: email,
          subject: "Welcome to LinkHub !",
          text: Hello ${name}, welcome to our app! We're excited to have you on board. Our app is a link hub that allows you to easily share all your links in one place. We hope you enjoy using it!,
        };
  
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
          } else {
            console.log("Email sent:", info.response);
          }
        });
          }
      } catch (error) {
          // Handle registration errors
  
  
          console.error('Registration error:', error);
          res.status(400).json({ status: 'failed', error: error.message });
      }
  });
