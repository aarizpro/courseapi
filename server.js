require('dotenv').config();
const nodemailer = require('nodemailer');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const { S3Client, ListObjectsV2Command, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const bodyParser = require('body-parser');

// Import routes
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const profile = require('./routes/profileRoute');
const quotes = require('./routes/quotesRoute');
const cimage = require('./routes/cimageRoute');
const courseslot = require('./routes/courseslotRoute');
const course = require('./routes/courseRoute');
const visit = require('./routes/visitorRoute');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
const BUCKET_NAME = process.env.BUCKET_NAME;

// Set up S3 client
const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.ACCESS_SECRET,
  },
  region: process.env.REGION
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// Use multer memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Routes for APIs

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/profile', profile);
app.use('/api/quotes', quotes);
app.use('/api/cimage', cimage);
app.use('/api/cslot', courseslot);
app.use('/api/course', course);
app.use('/api/visit', visit);

// MongoDB connection
mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Node API app is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// S3 Upload Route
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: BUCKET_NAME,
        Key: req.file.originalname,
        Body: req.file.buffer,
      },
    });
    await upload.done();
    res.send({ location: `https://${BUCKET_NAME}.s3.amazonaws.com/${req.file.originalname}` });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).send('Failed to upload file.');
  }
});

// S3 List Files Route
app.get('/list', async (req, res) => {
  try {
    const command = new ListObjectsV2Command({ Bucket: BUCKET_NAME });
    const response = await s3Client.send(command);
    const files = response.Contents.map(item => item.Key);
    res.send(files);
  } catch (error) {
    console.error('List files error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// S3 Download Route
app.get('/download/:filename', async (req, res) => {
  const filename = req.params.filename;
  try {
    const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: filename });
    const response = await s3Client.send(command);
    response.Body.pipe(res);  // Stream the file to the client
  } catch (error) {
    console.error('File download error:', error);
    res.status(404).send('File Not Found');
  }
});

// S3 Delete File Route
app.delete('/delete/:filename', async (req, res) => {
  const filename = req.params.filename;
  try {
    const command = new DeleteObjectCommand({ Bucket: BUCKET_NAME, Key: filename });
    await s3Client.send(command);
    res.send('File Deleted Successfully');
  } catch (error) {
    console.error('File deletion error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/sendemail', async (req, res) => {
  const { recipientEmail, subject, message } = req.body;

  try {
    // Create Nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'thoughtenablers@gmail.com', // Your email
        pass: 'lrisydstaninqwbn',              // Your app-specific password (or use regular password if less secure apps are enabled)
      },
    });

    // Set up email options
    let mailOptions = {
      from: 'thoughtenablers@gmail.com', // Sender email
      to: recipientEmail,             // Recipient email
      subject: subject,               // Subject
      text: message,                  // Message body
    };

    // Send the email
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return res.status(200).send({ status: 'success', message: 'Email sent successfully!' });

  } catch (error) {
    console.error('Error occurred while sending email:', error);
    return res.status(500).send({ status: 'fail', message: error.message });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  res.status(500).send('Internal Server Error');
});
