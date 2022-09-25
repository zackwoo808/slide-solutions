// Create service client module using ES6 syntax.
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
// Set the AWS Region.
const REGION = 'us-west-1';
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION });

module.exports = {
  s3Client
};