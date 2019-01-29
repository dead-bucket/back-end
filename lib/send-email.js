var aws = require('aws-sdk');

//this is the aws config with the keys from .env
// aws.config = ({ 'accessKeyId': process.env., 'secretAccessKey': process.env.REACT_APP_SECRET_KEY, "region": process.env.REACT_APP_REGION })


// this function send the informatin from the form to email reciepient
module.exports = function(req) {
  // console.log('formInfo at top of send email', formInfo.resume)

  // This address must be verified with Amazon SES.
 console.log('in send email req', req);
  
  const sender = 'ThoughtLine <roger@davenport-home.com>';
  const recipient = `${req.email}`;
  // let dayForSubject = formInfo.date.getDay();
  const subject = `Request from your friend ${req.user.username} at Thoughtline`;

  // The email body for recipients with non-HTML email clients.
  const body_text = `Request to join Thoughtline`;
  let  body_html;
  body_html = 
    `<html>
     <head></head>
     <body>
     <h1>ThoughtLine</h1>
     <h2> Your friend has requested you join Thoughtline.info </h2>
      
      </body>
      </html>`;
  
  
  


  // The character encoding for the email.
  const charset = 'UTF-8';

  // Create a new SES object. 
  var ses = new aws.SES({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: 'us-west-2',
  });
  
  // Specify the parameters to pass to the API.
  var params = { 
    Source: sender, 
    Destination: { 
      ToAddresses: [
        recipient, 
      ],
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: charset,
      },
      Body: {
        Text: {
          Data: body_text,
          Charset: charset, 
        },
        Html: {
          Data: body_html,
          Charset: charset,
        },
        
      },
    },
    
  };
  
  //Try to send the email.
  ses.sendEmail(params, function(err, data) {
    // If something goes wrong, print an error message.
    
    if(err) {
      console.log('in send email.js', err.message);
      
    } else {
      console.log('Email sent! Message ID: ', data);
      
    }
  });
   
  
 

};