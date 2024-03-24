var nodemailer = require('nodemailer');

function mail(email, content) {

    var transporter = nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: "elevanceclub@gmail.com",
          pass: "BWwdQvnrHg13xU0S",
        }
    });
    
    var mailOptions = {
      from: content ? 'contactSupport@gmail.com': 'elevanceclub@gmail.com',
      to: content ? 'elevanceclub@gmail.com' : email ,
      subject: content ? 'Query from a customer': `Thank you for registering! Here's what you need to do next!`,
      text: `Welcome to Elevance Club!

      Dear Creator,
      
      Thank you for registering yourself as an Elevance creator! We're thrilled to have you on board and look forward to seeing your creativity shine.
      
      Just a friendly reminder: please ensure that your Instagram account is set to public to fully participate in Elevance Club's activities and opportunities.
      
      Additionally, we encourage you to utilize:
      • Elevance Media Kit
      • The Hashtag #ElevanceClub
      (ALL MANDATORY)
      
      It's advised to see the "how to use elevance media kit" below to know more.
      
      
      NOTE: THE CREATOR MUST USE ELEVANCE BRANDING FOR EVERY POST IN ORDER TO BE ELIGIBLE FOR MONTHLY REWARDS.

      
      
      It's designed to help you showcase our brand effectively while staying true to your unique style.
      
      If you have any questions or need further assistance, feel free to reach out. We're here to support you every step of the way!
      
      Best regards,
      Elevance Team`,
      html: content ? ` ${content} <br/> from Client Email: ${email}` :`<h2>Welcome to Elevance Club!</h2>

      Dear Creator, <br />
      
      <br />Thank you for registering yourself as an Elevance creator! We're thrilled to have you on board and look forward to seeing your creativity shine. <br /><br />
      
      Just a friendly reminder: please ensure that your Instagram account is set to public to fully participate in Elevance Club's activities and opportunities.<br /><br />
      
      Additionally, we encourage you to utilize:<br />
      • Elevance Media Kit<br />
      • The Hashtag #ElevanceClub<br />
      (ALL MANDATORY)<br /><br />
      
      <b>The link of the media kit and other instructions are placed below.</b>
      
      
      <h4>NOTE: THE CREATOR MUST USE ELEVANCE BRANDING FOR EVERY POST IN ORDER TO BE ELIGIBLE FOR MONTHLY REWARDS. 
      <a href='https://drive.google.com/file/d/12EpXY0U-Q63PTjeB65CusOTww9ymojwC/view?usp=drive_link'>Click here</a> to download the Elevance Media Kit.
      </h4>
      
      
      It's designed to help you showcase our brand effectively while staying true to your unique style.<br /><br />
      
      If you have any questions or need further assistance, feel free to reach out. We're here to support you every step of the way!<br /><br />
      
      Best regards,<br />
      Elevance Team`,
      attatchments: {
        filename: 'media_kit.zip',
        path:'./Elevance_media_kit.zip'
      }

    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    }); 
}

module.exports = { mail };