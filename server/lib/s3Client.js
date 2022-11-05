// Create service client module using ES6 syntax.
const { S3Client } = require('@aws-sdk/client-s3');
// Create an Amazon S3 service client object.
const s3Client = new S3Client({
  endpoint: 'http://localhost:4566',
  region: process.env.AWS_DEFAULT_REGION,
});

module.exports = {
  s3Client
};