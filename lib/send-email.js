var aws = require('aws-sdk');

//this is the aws config with the keys from .env
// aws.config = ({ 'accessKeyId': process.env., 'secretAccessKey': process.env.REACT_APP_SECRET_KEY, "region": process.env.REACT_APP_REGION })


// this function send the informatin from the form to email reciepient
module.exports = function(req) {
  // console.log('formInfo at top of send email', formInfo.resume)

  // This address must be verified with Amazon SES.
 console.log('in send email req', req.body.email);
  
  const sender = 'ThoughtLine <roger@davenport-home.com>';
  const recipient = `${req.body.email}`;
  const thoughtImage = "https://s3-us-west-2.amazonaws.com/thoughtline/thought.jpg";
  
  // let dayForSubject = formInfo.date.getDay();
  const subject = `Request from your friend ${req.user.username} at Thoughtline`;

  // The email body for recipients with non-HTML email clients.
  const body_text = `Request to join Thoughtline`;
  let  body_html;
  if(!req.user.firstname) {
    body_html = 
    `<html>
     <head></head>
     <body>
     
     <h1>ThoughtLine</h1>
     <h2> Your friend ${req.user.username} has requested you join Thoughtline.info </h2>
     <img src=${req.user.picture} />
     <a href=${thoughtImage}> click here to join </a>
      </body>
      </html>`;
  }
  if (req.user.firstname) {
    body_html = 
      `<html>
       <head></head>
       <body>
       
       <h1>ThoughtLine</h1>
       <h2> Your friend ${req.user.firstname} ${req.user.lastname} has requested you join Thoughtline.info </h2>
       <img src=${req.user.picture} />
       <a href=${thoughtImage}> click here to join </a>
        </body>
        </html>`;

  }
  
  
  


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

  return new Promise ((resolve, reject) => {
    ses.sendEmail(params, (err, data) => err ? reject(err) : resolve(data));
  });
  
  
   
  
 

};