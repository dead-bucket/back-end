const AWS = require('aws-sdk');

module.exports = (id) => {
  
  
  
  const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  });

  const params = {
    Bucket: 'thoughtline', // pass your bucket name
    Key: `${id}.jpeg`, // file will be saved as the file name will be the user _id.jpeg
  };
  
  return new Promise ((resolve, reject) => {
    s3.headObject(params, (err, data) => err ? reject(err) : resolve(data));
  });
  

};