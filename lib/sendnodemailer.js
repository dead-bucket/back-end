'use strict';
const nodeMailer = require('nodemailer');
const thoughtImage = "http://localhost:3000/";



module.exports = function(req) {
  let  body_html;
  if(!req.user.firstname) {
    body_html = 
    `<html>
     <head>
     <style>
       div {background-image: url("https://cdn.westseattleblog.com/blog/wp-content/uploads/2019/02/Lowman-Beach-Park-log-e1549775797146.jpeg");}
       h1   {color: blue;}
       p    {color: red;}
      </style>
     </head>
     <body >
     <div>
     <h1>ThoughtLine</h1>
     <h2> Your friend ${req.user.username} has requested you join Thoughtline.info </h2>
     <img src=${req.user.picture} />
     <a href=${thoughtImage}> click here to join </a>
     </div>
      </body>
      </html>`;
  }
  if (req.user.firstname) {
    body_html = 
      `<html>
       <head>
       <style>
       div {background-image: url("https://cdn.westseattleblog.com/blog/wp-content/uploads/2019/02/Lowman-Beach-Park-log-e1549775797146.jpeg");}
       body {background-color: powderblue;}
h1   {color: blue;}
p    {color: red;}
      </style>
       </head>
       <body>
       <div>
       <h1>ThoughtLine</h1>
       <h2> Your friend ${req.user.firstname} ${req.user.lastname} has requested you join Thoughtline.info </h2>
       <img src=${req.user.picture} />
      <a href=${thoughtImage}> click here to join </a>
      </div>
        </body>
        </html>`;

  }

  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  let mailOptions = {
    from: '"Friends at Thoughtline" <thoughtline2019@gmail.com>', // sender address
    to: req.body.email, // list of receivers
    subject: 'Your friend wants you to join thoughtline', // Subject line
    text: 'test test', // plain text body
    html: body_html, // html body
  };

  return new Promise ((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, data) => err ? reject(err) : resolve(data));
  });
};