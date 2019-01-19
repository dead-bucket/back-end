const fs = require('fs');
const AWS = require('aws-sdk');
require('dotenv').config();
console.log('accesskey  ',process.env.ACCESS_KEY);

module.exports = (picture) => {
  
  console.log('in upload this is what we get', picture);
  let buf = new Buffer(picture.replace(/^data:image\/\w+;base64,/, ''),'base64');
  const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  });

  const params = {
    ACL: 'public-read',
    Bucket: 'thoughtline', // pass your bucket name
    Key: `${Date.now()}.jpeg`, // file will be saved as testBucket/contacts.csv
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
  };
  s3.upload(params, function(s3Err, data) {
    if (s3Err) throw s3Err;
    console.log(`File uploaded successfully at ${data.Location}`);
    return data.Location;
  });

};

