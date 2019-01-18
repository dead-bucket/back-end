const fs = require('fs');
const AWS = require('aws-sdk');
require('dotenv').config();
console.log('accesskey  ',process.env.ACCESS_KEY);

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const fileName = 'headshot.jpeg';

const uploadFile = () => {
  fs.readFile(fileName, (err, data) => {
    if (err) throw err;
    const params = {
      ACL: 'public-read',
      Bucket: 'thoughtline', // pass your bucket name
      Key: 'headshot.jpeg', // file will be saved as testBucket/contacts.csv
      Body: data,
    };
    s3.upload(params, function(s3Err, data) {
      if (s3Err) throw s3Err;
      console.log(`File uploaded successfully at ${data.Location}`);
    });
  });
};

uploadFile();