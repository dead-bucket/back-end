'use strict';
const nodeMailer = require('nodemailer');

module.exports = function(message) {
  
  let body_html;
  body_html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>${message.title}</title>
      </head>
      <body
        style="text-align: center;font-family: Verdana, Geneva, Tahoma, sans-serif;"
      >
        <div
          id="title-div"
          style="margin:auto;margin-top: 100px; width:150px; position: relative;"
        >
          
    
          <img
            id="logo"
            src="https://thoughtline.s3-us-west-2.amazonaws.com/thoughtline-logo-primary.png"
            alt="Thoughtline logo"
            style="width: 100px;
                position: absolute;
                top: -65px;
                right: -65px"
          />
        </div>
        <div id="invite" style="margin: auto;">
          <h2 style="margin-bottom:0px">
            
          <p>${message.text}</p>
          
        </div>
      </body>
    </html>    
  `;
  
  
 
  // send grid smtp sending.
  let transporter = nodeMailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SENDGRIDUSERNAME,
      pass: process.env.SENDGRIDKEY,
    },
  });
  let mailOptions = {
    from: '"Friends at Thoughtline" <thoughtline2019@gmail.com>', // sender address
    to: message.email, // list of receivers
    subject: `${message.subject}`, // Subject line
    text: `${message.text}`, // plain text body
    html: body_html, // html body
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, data) =>
      err ? reject(err) : resolve(data)
    );
  });
};
