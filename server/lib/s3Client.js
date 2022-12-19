// Create service client module using ES6 syntax.
const AWS = require('aws-sdk');

const s3Client = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  endpoint: process.env.AWS_S3_ENDPOINT,
  sslEnabled: false,
  /**
   * Including this option gets localstack to more closely match the defaults for
   * live S3. If you omit this, you will need to add the bucketName to the `Key`
   * property in the upload function below.
   *
   * see: https://github.com/localstack/localstack/issues/1180
   */
  s3ForcePathStyle: true,
  region: process.env.AWS_DEFAULT_REGION
});

module.exports = {
  s3Client
};