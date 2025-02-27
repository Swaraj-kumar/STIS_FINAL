// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const { v4: uuidv4 } = require("uuid");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Create uploads directory if it doesn't exist
// const uploadDir = "C:/uploads";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Configure multer for file storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     // Create unique filename with original extension
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// // File filter function
// const fileFilter = (req, file, cb) => {
//   // Accept only PDF and Word documents
//   const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'), false);
//   }
// };

// const upload = multer({ 
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024 // 5MB limit
//   }
// });

// // Middleware
// app.use(express.json());
// app.use(cors({ origin: "*", credentials: true }));

// // Middleware to verify JWT token
// const verifyToken = (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");
//   if (!token) {
//     return res.status(401).json({ message: "No token, authorization denied" });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Token is not valid" });
//   }
// };

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // User Schema
// const userSchema = new mongoose.Schema({
//   uid: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   phone: { type: String, required: true },
//   givenName: { type: String, required: true },
//   familyName: { type: String },
//   fullName: { type: String, required: true },
//   country: { type: String, required: true },
//   affiliation: { type: String, required: true },
//   abstractSubmission: {
//     title: { type: String },
//     scope: { type: String },
//     presentingType: { type: String },
//     firstAuthorName: { type: String },
//     firstAuthorAffiliation: { type: String },
//     secondAuthorName: { type: String },
//     secondAuthorAffiliation: { type: String },
//     otherAuthors: { type: String },
//     presentingAuthorName: { type: String },
//     presentingAuthorAffiliation: { type: String },
//     abstractFile: { type: String }, // Stores the file path
//     mainBody: { type: String },
//   }
// });

// const User = mongoose.model("User", userSchema);

// // Register User
// app.post("/register", async (req, res) => {
//   try {
//     const { email, password, phone, givenName, familyName, fullName, country, affiliation } = req.body;
    
//     if (!email || !password || !phone || !givenName || !fullName || !country || !affiliation) {
//       return res.status(400).json({ message: "All required fields must be filled" });
//     }
    
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: "User already exists" });
    
//     const hashedPassword = await bcrypt.hash(password, 10);
    
//     const newUser = new User({
//       uid: uuidv4(),
//       email,
//       password: hashedPassword,
//       phone,
//       givenName,
//       familyName,
//       fullName,
//       country,
//       affiliation,
//     });
    
//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("Error registering user:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });


// // Login User
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ id: user._id, uid: user.uid }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     res.json({ 
//       message: "Login successful", 
//       token, 
//       uid: user.uid, 
//       givenName: user.givenName, // Include first name
//       fullName: user.fullName // Include full name if needed
//     });

//   } catch (error) {
//     console.error("Error logging in user:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });


// // Reset Password Route
// app.post("/reset-password", async (req, res) => {
//   try {
//     const { email, newPassword } = req.body;

//     if (!email || !newPassword) {
//       return res.status(400).json({ message: "Email and new password are required" });
//     }

//     // Check if the user exists in the database
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found. Please register first." });
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update the password
//     user.password = hashedPassword;
//     await user.save();

//     res.json({ message: "Password reset successful. You can now log in with your new password." });

//   } catch (error) {
//     console.error("Error resetting password:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });






// // Submit Abstract with File Upload
// app.post("/submit-abstract", verifyToken, upload.single('abstractFile'), async (req, res) => {
//   try {
//     console.log("Received abstract submission:", req.body);
//     console.log("Received file:", req.file);

//     const { 
//       uid, 
//       title, 
//       scope, 
//       presentingType, 
//       firstAuthorName, 
//       firstAuthorAffiliation,
//       secondAuthorName,
//       secondAuthorAffiliation,
//       otherAuthors, 
//       presentingAuthorName, 
//       presentingAuthorAffiliation, 
//       mainBody 
//     } = req.body;

//     if (!uid) {
//       if (req.file) {
//         fs.unlink(req.file.path, (err) => {
//           if (err) console.error("Error deleting file:", err);
//         });
//       }
//       return res.status(400).json({ message: "User ID is required" });
//     }

//     // Find the existing user first
//     const existingUser = await User.findOne({ uid });
    
//     // If user has an existing abstract file, delete it
//     if (existingUser?.abstractSubmission?.abstractFile) {
//       try {
//         fs.unlinkSync(existingUser.abstractSubmission.abstractFile);
//       } catch (err) {
//         console.error("Error deleting existing file:", err);
//       }
//     }

//     // Update the user's document with the abstract submission details
//     const user = await User.findOneAndUpdate(
//       { uid },
//       {
//         abstractSubmission: {
//           title,
//           scope,
//           presentingType,
//           firstAuthorName,
//           firstAuthorAffiliation,
//           secondAuthorName,
//           secondAuthorAffiliation,
//           otherAuthors,
//           presentingAuthorName,
//           presentingAuthorAffiliation,
//           abstractFile: req.file ? req.file.path : null,
//           mainBody,
//         }
//       },
//       { new: true }
//     );

//     if (!user) {
//       if (req.file) {
//         fs.unlink(req.file.path, (err) => {
//           if (err) console.error("Error deleting file:", err);
//         });
//       }
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({ 
//       message: "Abstract submitted successfully", 
//       abstract: user.abstractSubmission 
//     });
//   } catch (error) {
//     if (req.file) {
//       fs.unlink(req.file.path, (err) => {
//         if (err) console.error("Error deleting file:", err);
//       });
//     }
//     console.error("Error submitting abstract:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // Get User Abstract
// app.get("/get-abstract/:uid", verifyToken, async (req, res) => {
//   try {
//     const user = await User.findOne({ uid: req.params.uid });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json({ abstract: user.abstractSubmission });
//   } catch (error) {
//     console.error("Error fetching abstract:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // Delete Abstract File
// app.delete("/delete-abstract-file/:uid", verifyToken, async (req, res) => {
//   try {
//     const user = await User.findOne({ uid: req.params.uid });
//     if (!user || !user.abstractSubmission?.abstractFile) {
//       return res.status(404).json({ message: "File not found" });
//     }

//     // Delete file from filesystem
//     fs.unlink(user.abstractSubmission.abstractFile, async (err) => {
//       if (err) {
//         console.error("Error deleting file:", err);
//         return res.status(500).json({ message: "Error deleting file" });
//       }

//       // Update database to remove file reference
//       user.abstractSubmission.abstractFile = null;
//       await user.save();
//       res.json({ message: "File deleted successfully" });
//     });
//   } catch (error) {
//     console.error("Error deleting abstract file:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // Error handling middleware for multer
// app.use((error, req, res, next) => {
//   if (error instanceof multer.MulterError) {
//     if (error.code === 'LIMIT_FILE_SIZE') {
//       return res.status(400).json({ message: 'File size is too large. Maximum size is 5MB.' });
//     }
//     return res.status(400).json({ message: error.message });
//   }
//   next(error);
// });

// // Start Server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));














// Email is original file


// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const { v4: uuidv4 } = require("uuid");
// require("dotenv").config();
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.office365.com",
//   port: 587,
//   secure: false, // Use TLS
//   auth: {
//     user: process.env.EMAIL_USER, // swarajk@IISc.ac.in
//     pass: process.env.EMAIL_PASS, // Your email password or App Password
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// const app = express();
// const PORT = process.env.PORT || 5000;
// // C:/uploads
// // /home/stis2025/public_html
// // 
// const uploadDir = "C:/uploads";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Configure multer for file storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//      console.log("Saving file to:", uploadDir);
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     // Create unique filename with original extension
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// // File filter function
// const fileFilter = (req, file, cb) => {
//   // Accept only PDF and Word documents
//   const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'), false);
//   }
// };

// const upload = multer({ 
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024 // 5MB limit
//   }
// });

// // Middleware
// app.use(express.json());
// app.use(cors({ origin: "*", credentials: true }));

// // Middleware to verify JWT token
// const verifyToken = (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");
//   if (!token) {
//     return res.status(401).json({ message: "No token, authorization denied" });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Token is not valid" });
//   }
// };

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // User Schema
// const userSchema = new mongoose.Schema({
//   uid: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   phone: { type: String, required: true },
//   givenName: { type: String, required: true },
//   familyName: { type: String },
//   fullName: { type: String, required: true },
//   country: { type: String, required: true },
//   affiliation: { type: String, required: true },
//   abstractSubmission: {
//     title: { type: String },
//     scope: { type: String },
//     presentingType: { type: String },
//     firstAuthorName: { type: String },
//     firstAuthorAffiliation: { type: String },
//     secondAuthorName: { type: String },
//     secondAuthorAffiliation: { type: String },
//     otherAuthors: { type: String },
//     presentingAuthorName: { type: String },
//     presentingAuthorAffiliation: { type: String },
//     abstractFile: { type: String }, // Stores the file path
//     mainBody: { type: String },
//   }
// });

// const User = mongoose.model("User", userSchema);

// // Register User
// app.post("/register", async (req, res) => {
//   try {
//     const { email, password, phone, givenName, familyName, fullName, country, affiliation } = req.body;
    
//     if (!email || !password || !phone || !givenName || !fullName || !country || !affiliation) {
//       return res.status(400).json({ message: "All required fields must be filled" });
//     }
    
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
    
//     const newUser = new User({
//       uid: uuidv4(),
//       email,
//       password: hashedPassword,
//       phone,
//       givenName,
//       familyName,
//       fullName,
//       country,
//       affiliation,
//     });
    
//     await newUser.save();

//     // Send confirmation email
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Registration Successful",
//       text: `Hello ${givenName},\n\nThank you for registering. Your account has been successfully created.\n\nBest regards,\nConference Team`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error("Error sending email:", error);
//       } else {
//         console.log("Email sent: " + info.response);
//       }
//     });

//     res.status(201).json({ message: "User registered successfully" });

//   } catch (error) {
//     console.error("Error registering user:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });


// // Login User
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ id: user._id, uid: user.uid }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     res.json({ 
//       message: "Login successful", 
//       token, 
//       uid: user.uid, 
//       givenName: user.givenName, // Include first name
//       fullName: user.fullName // Include full name if needed
//     });

//   } catch (error) {
//     console.error("Error logging in user:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });


// // Reset Password Route
// app.post("/reset-password", async (req, res) => {
//   try {
//     const { email, newPassword } = req.body;

//     if (!email || !newPassword) {
//       return res.status(400).json({ message: "Email and new password are required" });
//     }

//     // Check if the user exists in the database
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found. Please register first." });
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update the password
//     user.password = hashedPassword;
//     await user.save();

//     res.json({ message: "Password reset successful. You can now log in with your new password." });

//   } catch (error) {
//     console.error("Error resetting password:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });






// // Submit Abstract with File Upload
// app.post("/submit-abstract", verifyToken, upload.single('abstractFile'), async (req, res) => {
//   try {
//     console.log("Received abstract submission:", req.body);
//     console.log("Received file:", req.file);

//     const { 
//       uid, 
//       title, 
//       scope, 
//       presentingType, 
//       firstAuthorName, 
//       firstAuthorAffiliation,
//       secondAuthorName,
//       secondAuthorAffiliation,
//       otherAuthors, 
//       presentingAuthorName, 
//       presentingAuthorAffiliation, 
//       mainBody 
//     } = req.body;

//     if (!uid) {
//       if (req.file) {
//         fs.unlink(req.file.path, (err) => {
//           if (err) console.error("Error deleting file:", err);
//         });
//       }
//       return res.status(400).json({ message: "User ID is required" });
//     }

//     // Find the existing user first
//     const existingUser = await User.findOne({ uid });
    
//     // If user has an existing abstract file, delete it
//     if (existingUser?.abstractSubmission?.abstractFile) {
//       try {
//         fs.unlinkSync(existingUser.abstractSubmission.abstractFile);
//       } catch (err) {
//         console.error("Error deleting existing file:", err);
//       }
//     }

//     // Update the user's document with the abstract submission details
//     const user = await User.findOneAndUpdate(
//       { uid },
//       {
//         abstractSubmission: {
//           title,
//           scope,
//           presentingType,
//           firstAuthorName,
//           firstAuthorAffiliation,
//           secondAuthorName,
//           secondAuthorAffiliation,
//           otherAuthors,
//           presentingAuthorName,
//           presentingAuthorAffiliation,
//           abstractFile: req.file ? req.file.path : null,
//           mainBody,
//         }
//       },
//       { new: true }
//     );

//     if (!user) {
//       if (req.file) {
//         fs.unlink(req.file.path, (err) => {
//           if (err) console.error("Error deleting file:", err);
//         });
//       }
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({ 
//       message: "Abstract submitted successfully", 
//       abstract: user.abstractSubmission 
//     });
//   } catch (error) {
//     if (req.file) {
//       fs.unlink(req.file.path, (err) => {
//         if (err) console.error("Error deleting file:", err);
//       });
//     }
//     console.error("Error submitting abstract:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // Get User Abstract
// app.get("/get-abstract/:uid", verifyToken, async (req, res) => {
//   try {
//     const user = await User.findOne({ uid: req.params.uid });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json({ abstract: user.abstractSubmission });
//   } catch (error) {
//     console.error("Error fetching abstract:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // Delete Abstract File
// app.delete("/delete-abstract-file/:uid", verifyToken, async (req, res) => {
//   try {
//     const user = await User.findOne({ uid: req.params.uid });
//     if (!user || !user.abstractSubmission?.abstractFile) {
//       return res.status(404).json({ message: "File not found" });
//     }

//     // Delete file from filesystem
//     fs.unlink(user.abstractSubmission.abstractFile, async (err) => {
//       if (err) {
//         console.error("Error deleting file:", err);
//         return res.status(500).json({ message: "Error deleting file" });
//       }

//       // Update database to remove file reference
//       user.abstractSubmission.abstractFile = null;
//       await user.save();
//       res.json({ message: "File deleted successfully" });
//     });
//   } catch (error) {
//     console.error("Error deleting abstract file:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // Error handling middleware for multer
// app.use((error, req, res, next) => {
//   if (error instanceof multer.MulterError) {
//     if (error.code === 'LIMIT_FILE_SIZE') {
//       return res.status(400).json({ message: 'File size is too large. Maximum size is 5MB.' });
//     }
//     return res.status(400).json({ message: error.message });
//   }
//   next(error);
// });

// // Start Server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



























// dummy to check cloudinary


const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const nodemailer = require("nodemailer");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: process.env.EMAIL_USER, // swarajk@IISc.ac.in
    pass: process.env.EMAIL_PASS, // Your email password or App Password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const app = express();
const PORT = process.env.PORT || 5000;

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file storage
const storage = multer.memoryStorage();
const uploads = multer({ storage: storage });
// File filter function
const fileFilter = (req, file, cb) => {
  // Accept only PDF and Word documents
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Middleware
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  givenName: { type: String, required: true },
  familyName: { type: String },
  fullName: { type: String, required: true },
  country: { type: String, required: true },
  affiliation: { type: String, required: true },
  abstractSubmission: {
    title: { type: String },
    scope: { type: String },
    presentingType: { type: String },
    firstAuthorName: { type: String },
    firstAuthorAffiliation: { type: String },
    secondAuthorName: { type: String },
    secondAuthorAffiliation: { type: String },
    otherAuthors: { type: String },
    presentingAuthorName: { type: String },
    presentingAuthorAffiliation: { type: String },
    abstractFile: { type: String }, // Stores the file path
    mainBody: { type: String },
  }
});

const User = mongoose.model("User", userSchema);

// Register User
app.post("/register", async (req, res) => {
  try {
    const { email, password, phone, givenName, familyName, fullName, country, affiliation } = req.body;
    
    if (!email || !password || !phone || !givenName || !fullName || !country || !affiliation) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
      uid: uuidv4(),
      email,
      password: hashedPassword,
      phone,
      givenName,
      familyName,
      fullName,
      country,
      affiliation,
    });
    
    await newUser.save();

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Registration Successful",
      text: `Hello ${givenName},\n\nThank you for registering. Your account has been successfully created.\n\nBest regards,\nConference Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// Login User
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, uid: user.uid }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ 
      message: "Login successful", 
      token, 
      uid: user.uid, 
      givenName: user.givenName, // Include first name
      fullName: user.fullName // Include full name if needed
    });

  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// Reset Password Route
app.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password are required" });
    }

    // Check if the user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found. Please register first." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successful. You can now log in with your new password." });

  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});






// Submit Abstract with File Upload
app.post("/submit-abstract", verifyToken, upload.single("abstractFile"), async (req, res) => {
  try {
    const { uid, title, theme, presentingType, firstAuthorName, firstAuthorAffiliation, 
            otherAuthors, presentingAuthorName, presentingAuthorAffiliation, mainBody } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Abstract file is required" });
    }

    // Upload file to Cloudinary
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "auto", folder: "abstracts" },
          (error, cloudinaryResult) => {
            if (error) {
              reject(error);
            } else {
              resolve(cloudinaryResult);
            }
          }
        );
        stream.end(req.file.buffer);
      });
    };

    const cloudinaryResult = await uploadToCloudinary();

    // Save details in MongoDB
    const user = await User.findOneAndUpdate(
      { uid },
      {
        $set: {
          "abstractSubmission.title": title,
          "abstractSubmission.scope": theme,
          "abstractSubmission.presentingType": presentingType,
          "abstractSubmission.firstAuthorName": firstAuthorName,
          "abstractSubmission.firstAuthorAffiliation": firstAuthorAffiliation,
          "abstractSubmission.otherAuthors": otherAuthors,
          "abstractSubmission.presentingAuthorName": presentingAuthorName,
          "abstractSubmission.presentingAuthorAffiliation": presentingAuthorAffiliation,
          "abstractSubmission.abstractFile": cloudinaryResult.secure_url,
          "abstractSubmission.mainBody": mainBody,
        },
      },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Abstract submitted successfully!", abstract: user.abstractSubmission });

  } catch (error) {
    console.error("Error submitting abstract:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.delete("/delete-abstract-file", verifyToken, async (req, res) => {
  try {
    const { uid } = req.body;
    const user = await User.findOne({ uid });
    if (!user || !user.abstractSubmission.abstractFile) {
      return res.status(404).json({ message: "Abstract file not found" });
    }

    const publicId = user.abstractSubmission.abstractFile.split("/").pop().split(".")[0];
    cloudinary.uploader.destroy(publicId, async (error, result) => {
      if (error) {
        console.error("Error deleting file from Cloudinary:", error);
        return res.status(500).json({ message: "Error deleting file" });
      }
      user.abstractSubmission.abstractFile = null;
      await user.save();
      res.json({ message: "File deleted successfully" });
    });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get User Abstract
app.get("/get-abstract/:uid", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ abstract: user.abstractSubmission });
  } catch (error) {
    console.error("Error fetching abstract:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete Abstract File
app.delete("/delete-abstract-file/:uid", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user || !user.abstractSubmission?.abstractFile) {
      return res.status(404).json({ message: "File not found" });
    }

    // Delete file from filesystem
    fs.unlink(user.abstractSubmission.abstractFile, async (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        return res.status(500).json({ message: "Error deleting file" });
      }

      // Update database to remove file reference
      user.abstractSubmission.abstractFile = null;
      await user.save();
      res.json({ message: "File deleted successfully" });
    });
  } catch (error) {
    console.error("Error deleting abstract file:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Error handling middleware for multer
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size is too large. Maximum size is 5MB.' });
    }
    return res.status(400).json({ message: error.message });
  }
  next(error);
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






// Render problem trial







