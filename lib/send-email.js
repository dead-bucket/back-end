var aws = require("aws-sdk");

//this is the aws config with the keys from .env
// aws.config = ({ 'accessKeyId': process.env., 'secretAccessKey': process.env.REACT_APP_SECRET_KEY, "region": process.env.REACT_APP_REGION })

// this function send the informatin from the form to email reciepient
module.exports = function(req) {
  // console.log('formInfo at top of send email', formInfo.resume)

  // This address must be verified with Amazon SES.
  console.log("in send email req", req.body.email);

  const sender = "ThoughtLine <roger@davenport-home.com>";
  const recipient = `${req.body.email}`;
  // const thoughtImage = "https://s3-us-west-2.amazonaws.com/thoughtline/thought.jpg";
  const thoughtImage = "http://localhost:3000/";
  // let dayForSubject = formInfo.date.getDay();
  const subject = `Request from your friend ${
    req.user.username
  } at Thoughtline`;

  // The email body for recipients with non-HTML email clients.
  const body_text = `Request to join Thoughtline`;
  let body_html;
  if (!req.user.firstname) {
    body_html = `<html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Document</title>
      <link
        href="https://fonts.googleapis.com/css?family=Roboto|Satisfy"
        rel="stylesheet"
      />
      <style>
        body {
          display: flex;
          flex-direction: column;
          align-items: center;
          background-image: url(http://cdn.backgroundhost.com/backgrounds/subtlepatterns/white_wall2.png);
        }
        p {
          font-family: Roboto, sans-serif;
        }
        #invite {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        #invite p {
          font-size: 25px;
        }
        div#invite {
          text-align: center;
          margin: 0 30px;
        }
        #title-div {
          display: flex;
          align-items: center;
          font-size: 60px;
          margin-top: 15px;
        }
  
        .logo {
          height: 50px;
          width: 50px;
        }
  
        .satisfy {
          font-family: Satisfy, cursive;
          color: #0058cf;
        }
        p.satisfy {
          margin-bottom: 20px;
        }
        span.satisfy {
          font-size: 30px;
        }
        .satisfy-white {
          font-family: Satisfy, cursive;
          color: #ffffff;
          font-size: 20px;
        }
        .roboto {
          font-family: Roboto, sans-serif;
        }
        button {
          outline: none;
          color: white;
          background: #0058cf;
          width: 200px;
          height: 65px;
          border-radius: 25px;
          font-size: 15px;
        }
        button:active {
          color: white;
          background: #4b75ac;
          width: 200px;
          height: 100px;
          border-radius: 25px;
        }
        .description {
          width: 90%;
          text-align: center;
        }
        .description h1 {
          font-family: Roboto, sans-serif;
          font-style: italic;
          font-weight: lighter;
          font-size: 22px;
        }
  
        .highlight-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }
        .highlight {
          width: 200px;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
        }
  
        .highlight p {
          text-align: center;
          width: 200px;
        }
  
        .highlight img {
          border-radius: 10px;
        }
      </style>
    </head>
    <body>
      <div id="title-div">
        <p class="satisfy">Thoughtline</p>
        <img
          class="logo"
          src="https://previews.dropbox.com/p/thumb/AAV95_Fcnbh0xEcep8ND3t3q69fByCzBiIOdhxZek1_SYj8OikXJGUs00UEps6QKKR8i95gNMHbL8bblHSdH8DI-6wEKAnp9A0Cr5fntWoE-wUTKbg-BGB35zavL9_N81tI49R74DYvacMY7cvIQ5h_QdgHWPtyOwGQtWqW_zSjSyNiCoRo2oEdYW5ZfCjTvPII2SoZvsNpSiJxvQVVyXWK5oVzFAgna_DNfwcHJdxnhyLp4FcklnH-kXPsLS08f4uaso0ik-GRw7jIauzyLdLUFOWAQtK66sPa3zFmBKnymWw/p.png?size_mode=5"
          alt="Thoughtline logo"
        />
      </div>
      <div id="invite">
        <img
          src=${req.user.picture}
          class="friend-image"
        />
        <p>
        ${
          req.user.username
        } wants you to join <span class="satisfy">Thoughtline</span> so
          they can send you their thoughts!
        </p>
        <p>
          Click the button below to setup an account:
        </p>
        <a href="#">
          <button>Join <span class="satisfy-white"> Thoughtline</span></button>
        </a>
      </div>
      <div class="description">
        <h1>What is <span class="satisfy">Thoughtline?</span></h1>
        <div class="highlight-container">
          <div class="highlight">
            <img
              src="https://previews.dropbox.com/p/thumb/AAW3j0SKx3YQvvpgLPW1BxyIgF9cV3D1feQ0o2JFoRcbhs9nVajqYE2Zz8dg7QNu4uKXIpKkABWVTRMXxgWg2P7pRgxZUJENJF1n_wOPXDTNaeB6yD3YqGpkeCsL1f_o8ugSevtjroqDi5ES7uIn0Q9sdDnSfp1RdaHERMvY4MRe2oywQQTC3CQMaAaFNb4744nOk7pVkS2J-uBlcDIJNn3rQMZg3NPFLOjOgTcri8C7_vLlbjgZSb39P0koVKXYhyFYnW6_X0814v9H01ogXGDlnbosUGvZpLMgPQ0o56_N0A/p.png?size_mode=5"
            />
            <p>
              A safe, secure place to save all of your thoughts about the people
              that matter to you.
            </p>
          </div>
          <div class="highlight">
            <img
              src="https://previews.dropbox.com/p/thumb/AAW-iFnWX3LgxGTmP06qYuPQHhLHBHryYWrR2fYGSe7vzSaPNkpPTqkHH9v3Cqp_-To09l2qEFuV79_1mnO-YV0zcmZCpw7h5HlCwxeRDuanqd-R4Pjr8NnWpO4o85ibhwIxREyYVsRgR6P0uaRZao_amEUVRTmguxyrNbMPBSJfx5pZoduSKOwrb9c0R45sWhYOreZtksYLEydqRmVY25GS09r6JPrdGdJjaEry50r7nxt-eukb0DwKMe7DJQtdMhbpDIz02HZnGL6oIMbtH08foHIWvVmn05hesy_3fPlBKA/p.png?size_mode=5"
            />
            <p>
              Write thoughts and search through your Thoughtline history for that
              friend.
            </p>
          </div>
          <div class="highlight">
            <img
              src="https://previews.dropbox.com/p/thumb/AAX6TvQw9ulOSHiE2jjsf3lx_Tb5m98kA6-UIiksNWc8zQGq53JhFGBl3YGL5lXRNLH2x07u1-ZJSkOlRGJdt8oEELxSuQSI_S3jxAlaJUfqUn5Rb2l_B2uk-8im5_-Ss4YQhh1BN-chbKqbCah_NQZbPz_EPR2zdPCPP3s-fc4X9pi_3Mb5CiZlUQTm10ylRORMHKXRwi8Jys23G5Ew4XqS7-996ucizoamwNVHl68J-ZwbDwUWSwGhJbB2stGyv_z09p6DwEJLIXC0Z3iVddFEjX8JxvCbfg_2PVWPOVtx3w/p.png?size_mode=5"
            />
            <p>
              Send and receive thoughts from friends.
            </p>
          </div>
        </div>
      </div>
    </body>
  </html>`;
  }
  if (req.user.firstname) {
    body_html = `<html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Document</title>
      <link
        href="https://fonts.googleapis.com/css?family=Roboto|Satisfy"
        rel="stylesheet"
      />
      <style>
        body {
          display: flex;
          flex-direction: column;
          align-items: center;
          background-image: url(http://cdn.backgroundhost.com/backgrounds/subtlepatterns/white_wall2.png);
        }
        p {
          font-family: Roboto, sans-serif;
        }
        #invite {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        #invite p {
          font-size: 25px;
        }
        div#invite {
          text-align: center;
          margin: 0 30px;
        }
        #title-div {
          display: flex;
          align-items: center;
          font-size: 60px;
          margin-top: 15px;
        }
  
        .logo {
          height: 50px;
          width: 50px;
        }
  
        .satisfy {
          font-family: Satisfy, cursive;
          color: #0058cf;
        }
        p.satisfy {
          margin-bottom: 20px;
        }
        span.satisfy {
          font-size: 30px;
        }
        .satisfy-white {
          font-family: Satisfy, cursive;
          color: #ffffff;
          font-size: 20px;
        }
        .roboto {
          font-family: Roboto, sans-serif;
        }
        button {
          outline: none;
          color: white;
          background: #0058cf;
          width: 200px;
          height: 65px;
          border-radius: 25px;
          font-size: 15px;
        }
        button:active {
          color: white;
          background: #4b75ac;
          width: 200px;
          height: 100px;
          border-radius: 25px;
        }
        .description {
          width: 90%;
          text-align: center;
        }
        .description h1 {
          font-family: Roboto, sans-serif;
          font-style: italic;
          font-weight: lighter;
          font-size: 22px;
        }
  
        .highlight-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }
        .highlight {
          width: 200px;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
        }
  
        .highlight p {
          text-align: center;
          width: 200px;
        }
  
        .highlight img {
          border-radius: 10px;
        }
      </style>
    </head>
    <body>
      <div id="title-div">
        <p class="satisfy">Thoughtline</p>
        <img
          class="logo"
          src="https://previews.dropbox.com/p/thumb/AAV95_Fcnbh0xEcep8ND3t3q69fByCzBiIOdhxZek1_SYj8OikXJGUs00UEps6QKKR8i95gNMHbL8bblHSdH8DI-6wEKAnp9A0Cr5fntWoE-wUTKbg-BGB35zavL9_N81tI49R74DYvacMY7cvIQ5h_QdgHWPtyOwGQtWqW_zSjSyNiCoRo2oEdYW5ZfCjTvPII2SoZvsNpSiJxvQVVyXWK5oVzFAgna_DNfwcHJdxnhyLp4FcklnH-kXPsLS08f4uaso0ik-GRw7jIauzyLdLUFOWAQtK66sPa3zFmBKnymWw/p.png?size_mode=5"
          alt="Thoughtline logo"
        />
      </div>
      <div id="invite">
        <img
          src=${req.user.picture}
          class="friend-image"
        />
        <p>
        ${req.user.firstname} ${
      req.user.lastname
    } wants you to join <span class="satisfy">Thoughtline</span> so
          they can send you their thoughts!
        </p>
        <p>
          Click the button below to setup an account:
        </p>
        <a href="#">
          <button>Join <span class="satisfy-white"> Thoughtline</span></button>
        </a>
      </div>
      <div class="description">
        <h1>What is <span class="satisfy">Thoughtline?</span></h1>
        <div class="highlight-container">
          <div class="highlight">
            <img
              src="https://previews.dropbox.com/p/thumb/AAW3j0SKx3YQvvpgLPW1BxyIgF9cV3D1feQ0o2JFoRcbhs9nVajqYE2Zz8dg7QNu4uKXIpKkABWVTRMXxgWg2P7pRgxZUJENJF1n_wOPXDTNaeB6yD3YqGpkeCsL1f_o8ugSevtjroqDi5ES7uIn0Q9sdDnSfp1RdaHERMvY4MRe2oywQQTC3CQMaAaFNb4744nOk7pVkS2J-uBlcDIJNn3rQMZg3NPFLOjOgTcri8C7_vLlbjgZSb39P0koVKXYhyFYnW6_X0814v9H01ogXGDlnbosUGvZpLMgPQ0o56_N0A/p.png?size_mode=5"
            />
            <p>
              A safe, secure place to save all of your thoughts about the people
              that matter to you.
            </p>
          </div>
          <div class="highlight">
            <img
              src="https://previews.dropbox.com/p/thumb/AAW-iFnWX3LgxGTmP06qYuPQHhLHBHryYWrR2fYGSe7vzSaPNkpPTqkHH9v3Cqp_-To09l2qEFuV79_1mnO-YV0zcmZCpw7h5HlCwxeRDuanqd-R4Pjr8NnWpO4o85ibhwIxREyYVsRgR6P0uaRZao_amEUVRTmguxyrNbMPBSJfx5pZoduSKOwrb9c0R45sWhYOreZtksYLEydqRmVY25GS09r6JPrdGdJjaEry50r7nxt-eukb0DwKMe7DJQtdMhbpDIz02HZnGL6oIMbtH08foHIWvVmn05hesy_3fPlBKA/p.png?size_mode=5"
            />
            <p>
              Write thoughts and search through your Thoughtline history for that
              friend.
            </p>
          </div>
          <div class="highlight">
            <img
              src="https://previews.dropbox.com/p/thumb/AAX6TvQw9ulOSHiE2jjsf3lx_Tb5m98kA6-UIiksNWc8zQGq53JhFGBl3YGL5lXRNLH2x07u1-ZJSkOlRGJdt8oEELxSuQSI_S3jxAlaJUfqUn5Rb2l_B2uk-8im5_-Ss4YQhh1BN-chbKqbCah_NQZbPz_EPR2zdPCPP3s-fc4X9pi_3Mb5CiZlUQTm10ylRORMHKXRwi8Jys23G5Ew4XqS7-996ucizoamwNVHl68J-ZwbDwUWSwGhJbB2stGyv_z09p6DwEJLIXC0Z3iVddFEjX8JxvCbfg_2PVWPOVtx3w/p.png?size_mode=5"
            />
            <p>
              Send and receive thoughts from friends.
            </p>
          </div>
        </div>
      </div>
    </body>
  </html>`;
  }

  // The character encoding for the email.
  const charset = "UTF-8";

  // Create a new SES object.
  var ses = new aws.SES({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: "us-west-2"
  });

  // Specify the parameters to pass to the API.
  var params = {
    Source: sender,
    Destination: {
      ToAddresses: [recipient]
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: charset
      },
      Body: {
        Text: {
          Data: body_text,
          Charset: charset
        },
        Html: {
          Data: body_html,
          Charset: charset
        }
      }
    }
  };

  return new Promise((resolve, reject) => {
    ses.sendEmail(params, (err, data) => (err ? reject(err) : resolve(data)));
  });
};
