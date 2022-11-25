
const path = require('path');
const multer = require('multer');
// const multerS3 = require('multer-s3');
// const { S3 } = require('@aws-sdk/client-s3');

// const s3 = new S3({
//   region: process.env.AWS_S3_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//   }
// });

// const storage = multerS3({
//   s3,
//   acl: 'public-read',
//   bucket: process.env.AWS_S3_BUCKET,
//   contentType: multerS3.AUTO_CONTENT_TYPE,
//   key: (req, file, done) => {
//     const fileExtension = path.extname(file.originalname);
//     done(null, `${Date.now()}${fileExtension.toLowerCase()}`);
//   }
// });

// const uploadsMiddleware = multer({
//   storage
// }).single('file-to-upload');

const sounds = path.join(__dirname, 'public/sounds');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, sounds);
  },
  filename: (req, file, callback) => {
    const fileExtension = path.extname(file.originalname);
    const name = `${file.fieldname}-${Date.now()}${fileExtension}`;
    callback(null, name);
  }
});

const uploadsMiddleware = multer({ storage }).single('fileUrl');

module.exports = uploadsMiddleware;
