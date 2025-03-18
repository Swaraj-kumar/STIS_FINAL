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
// const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });


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

// const uploadDir = path.join(process.cwd(), "uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Configure multer for file storage
// const storage = multer.memoryStorage();
// const uploads = multer({ storage: storage });
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
// app.post("/submit-abstract", verifyToken, upload.single("abstractFile"), async (req, res) => {
//   try {
//     const { uid, title, theme, presentingType, firstAuthorName, firstAuthorAffiliation, 
//             otherAuthors, presentingAuthorName, presentingAuthorAffiliation, mainBody } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ message: "Abstract file is required" });
//     }

//     // Upload file to Cloudinary
//     const uploadToCloudinary = () => {
//       return new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           { resource_type: "auto", folder: "abstracts" },
//           (error, cloudinaryResult) => {
//             if (error) {
//               reject(error);
//             } else {
//               resolve(cloudinaryResult);
//             }
//           }
//         );
//         stream.end(req.file.buffer);
//       });
//     };

//     const cloudinaryResult = await uploadToCloudinary();

//     // Save details in MongoDB
//     const user = await User.findOneAndUpdate(
//       { uid },
//       {
//         $set: {
//           "abstractSubmission.title": title,
//           "abstractSubmission.scope": theme,
//           "abstractSubmission.presentingType": presentingType,
//           "abstractSubmission.firstAuthorName": firstAuthorName,
//           "abstractSubmission.firstAuthorAffiliation": firstAuthorAffiliation,
//           "abstractSubmission.otherAuthors": otherAuthors,
//           "abstractSubmission.presentingAuthorName": presentingAuthorName,
//           "abstractSubmission.presentingAuthorAffiliation": presentingAuthorAffiliation,
//           "abstractSubmission.abstractFile": cloudinaryResult.secure_url,
//           "abstractSubmission.mainBody": mainBody,
//         },
//       },
//       { new: true, upsert: true }
//     );

//     res.status(200).json({ message: "Abstract submitted successfully!", abstract: user.abstractSubmission });

//   } catch (error) {
//     console.error("Error submitting abstract:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });


// app.delete("/delete-abstract-file", verifyToken, async (req, res) => {
//   try {
//     const { uid } = req.body;
//     const user = await User.findOne({ uid });
//     if (!user || !user.abstractSubmission.abstractFile) {
//       return res.status(404).json({ message: "Abstract file not found" });
//     }

//     const publicId = user.abstractSubmission.abstractFile.split("/").pop().split(".")[0];
//     cloudinary.uploader.destroy(publicId, async (error, result) => {
//       if (error) {
//         console.error("Error deleting file from Cloudinary:", error);
//         return res.status(500).json({ message: "Error deleting file" });
//       }
//       user.abstractSubmission.abstractFile = null;
//       await user.save();
//       res.json({ message: "File deleted successfully" });
//     });
//   } catch (error) {
//     console.error("Error deleting file:", error);
//     res.status(500).json({ message: "Internal Server Error" });
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






//sending email problem 



// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const { v4: uuidv4 } = require("uuid");

// const nodemailer = require("nodemailer");
// const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });


// const transporter = nodemailer.createTransport({
//   service: "Outlook365",
//   host: "smtp.office365.com",
//   port: 587,
//   secure: false, // Use TLS
//   auth: {
//     user: process.env.EMAIL_USER, 
//     pass: process.env.EMAIL_PASS,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });




// const app = express();
// const PORT = process.env.PORT || 5000;

// const uploadDir = path.join(process.cwd(), "uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Configure multer for file storage
// const storage = multer.memoryStorage();
// const uploads = multer({ storage: storage });
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


// app.post("/submit-abstract", verifyToken, upload.single("abstractFile"), async (req, res) => {
//   console.log("📥 Abstract submission endpoint hit"); // Add this
//   console.log("Decoded Token Data:", req.user);
//   try {
//     const { uid, title, theme, presentingType, firstAuthorName, firstAuthorAffiliation, 
//             otherAuthors, presentingAuthorName, presentingAuthorAffiliation, mainBody } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ message: "Abstract file is required" });
//     }

//     // Find the user in MongoDB
//     const user = await User.findOne({ uid });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Upload file to Cloudinary
//     const uploadToCloudinary = () => {
//       return new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           { resource_type: "auto", folder: "abstracts" },
//           (error, cloudinaryResult) => {
//             if (error) {
//               reject(error);
//             } else {
//               resolve(cloudinaryResult);
//             }
//           }
//         );
//         stream.end(req.file.buffer);
//       });
//     };

//     const cloudinaryResult = await uploadToCloudinary();

//     // Update the user's abstract details in MongoDB
//     user.abstractSubmission = {
//       title,
//       scope: theme,
//       presentingType,
//       firstAuthorName,
//       firstAuthorAffiliation,
//       otherAuthors,
//       presentingAuthorName,
//       presentingAuthorAffiliation,
//       abstractFile: cloudinaryResult.secure_url,
//       mainBody,
//     };

//     await user.save();

//     // Send a thank-you email
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: user.email, // User's registered email
//       subject: "Abstract Submission Confirmation",
//       text: `Dear ${user.givenName},\n\nThank you for submitting your abstract titled "${title}". We have received your submission successfully.\n\nBest Regards,\nSTIS-V 2025 Team`,
//     };
    
//     await transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error("Error sending confirmation email:", error);
//       } else {
//         console.log("Confirmation email sent: " + info.response);
//       }
//     });
    

//     res.status(200).json({ message: "Abstract submitted successfully! A confirmation email has been sent." });

//   } catch (error) {
//     console.error("Error submitting abstract:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });



// app.delete("/delete-abstract-file", verifyToken, async (req, res) => {
//   try {
//     const { uid } = req.body;
//     const user = await User.findOne({ uid });
//     if (!user || !user.abstractSubmission.abstractFile) {
//       return res.status(404).json({ message: "Abstract file not found" });
//     }

//     const publicId = user.abstractSubmission.abstractFile.split("/").pop().split(".")[0];
//     cloudinary.uploader.destroy(publicId, async (error, result) => {
//       if (error) {
//         console.error("Error deleting file from Cloudinary:", error);
//         return res.status(500).json({ message: "Error deleting file" });
//       }
//       user.abstractSubmission.abstractFile = null;
//       await user.save();
//       res.json({ message: "File deleted successfully" });
//     });
//   } catch (error) {
//     console.error("Error deleting file:", error);
//     res.status(500).json({ message: "Internal Server Error" });
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































// FINAL

// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const { v4: uuidv4 } = require("uuid");

// const nodemailer = require("nodemailer");
// const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });


// const transporter = nodemailer.createTransport({
//   service: "Outlook365",
//   host: "smtp.office365.com",
//   port: 587,
//   secure: false, // Use TLS
//   auth: {
//     user: process.env.EMAIL_USER, 
//     pass: process.env.EMAIL_PASS,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });


// const app = express();
// const PORT = process.env.PORT || 5000;

// const uploadDir = path.join(process.cwd(), "uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Configure multer for file storage
// const storage = multer.memoryStorage();
// const uploads = multer({ storage: storage });
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

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Welcome to STIS-V 2025 Conference!",
//       text: `Dear ${givenName},
    
//       Thank you for registering for STIS-V 2025.
//       Your account has been successfully created.
//       We look forward to your participation.
//       Thanking you and with best regards,

//       STIS-V 2025 Organizing Team`,
//     };
    
//     try {
//       const info = await transporter.sendMail(mailOptions);
//       console.log("✅ Registration email sent:", info.response);
//     } catch (error) {
//       console.error("❌ Error sending registration email:", error);
//     }
    

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

// app.post("/submit-abstract", verifyToken, upload.single("abstractFile"), async (req, res) => {
//   console.log("🔥 /submit-abstract endpoint hit");

//   try {
//     const {
//       uid,
//       title,
//       theme,
//       presentingType,
//       firstAuthorName,
//       firstAuthorAffiliation,
//       otherAuthors,
//       presentingAuthorName,
//       presentingAuthorAffiliation,
//       mainBody
//     } = req.body;

//     if (!uid) {
//       return res.status(400).json({ message: "User ID is required" });
//     }

//     if (!req.file) {
//       return res.status(400).json({ message: "Abstract file is required" });
//     }

//     console.log("🧾 Request Body:", req.body);
//     console.log("📎 File received:", req.file.originalname);

//     // Upload to Cloudinary
//     const uploadToCloudinary = () => {
//       return new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           { resource_type: "auto", folder: "abstracts" },
//           (error, result) => {
//             if (error) reject(error);
//             else resolve(result);
//           }
//         );
//         stream.end(req.file.buffer);
//       });
//     };

//     const cloudinaryResult = await uploadToCloudinary();

//     // Update user's abstractSubmission in DB
//     const user = await User.findOneAndUpdate(
//       { uid },
//       {
//         $set: {
//           "abstractSubmission.title": title,
//           "abstractSubmission.scope": theme,
//           "abstractSubmission.presentingType": presentingType,
//           "abstractSubmission.firstAuthorName": firstAuthorName,
//           "abstractSubmission.firstAuthorAffiliation": firstAuthorAffiliation,
//           "abstractSubmission.otherAuthors": otherAuthors,
//           "abstractSubmission.presentingAuthorName": presentingAuthorName,
//           "abstractSubmission.presentingAuthorAffiliation": presentingAuthorAffiliation,
//           "abstractSubmission.abstractFile": cloudinaryResult.secure_url,
//           "abstractSubmission.mainBody": mainBody,
//         }
//       },
//       { new: true, upsert: true }
//     );

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Send confirmation email
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: user.email,
//       subject: "Abstract Submission Received Confirmation - STIS-V 2025 Conference",
//       text: `Dear ${user.givenName || user.fullName || "Author"},

// We are pleased to confirm that we have received your submission successfully.
// Please note that all submissions will be carefully reviewed, and you can expect to hear from us by 31st May 2025.
// We truly appreciate your contribution and look forward to your active participation in the Conference.

// Thanking you and with best regards,

// STIS-V 2025 Organizing Team

// `,
//     };

//     console.log("📨 Sending confirmation email to:", user.email);

//     try {
//       const info = await transporter.sendMail(mailOptions);
//       console.log("✅ Abstract confirmation email sent:", info.response);
//     } catch (error) {
//       console.error("❌ Error sending abstract confirmation email:", error);
//     }

//     res.status(200).json({
//       message: "Abstract submitted successfully!",
//       abstract: user.abstractSubmission
//     });

//   } catch (error) {
//     console.error("Error submitting abstract:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });


// app.delete("/delete-abstract-file", verifyToken, async (req, res) => {
//   try {
//     const { uid } = req.body;
//     const user = await User.findOne({ uid });
//     if (!user || !user.abstractSubmission.abstractFile) {
//       return res.status(404).json({ message: "Abstract file not found" });
//     }

//     const publicId = user.abstractSubmission.abstractFile.split("/").pop().split(".")[0];
//     cloudinary.uploader.destroy(publicId, async (error, result) => {
//       if (error) {
//         console.error("Error deleting file from Cloudinary:", error);
//         return res.status(500).json({ message: "Error deleting file" });
//       }
//       user.abstractSubmission.abstractFile = null;
//       await user.save();
//       res.json({ message: "File deleted successfully" });
//     });
//   } catch (error) {
//     console.error("Error deleting file:", error);
//     res.status(500).json({ message: "Internal Server Error" });
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






// trial

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { createObjectCsvWriter } = require("csv-writer");
const { updateGoogleSheet } = require("./controllers/googleSheets");
const nodemailer = require("nodemailer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const transporter = nodemailer.createTransport({
  service: "Outlook365",
  host: "smtp.office365.com",
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
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
     console.log("🔄 Attempting to update Google Sheets...");
     console.log("📝 Data being sent to Google Sheets:", newUser);
 
     await updateGoogleSheet(newUser);
 
     // ✅ Debug log after updating Google Sheets
     console.log("✅ Google Sheets update was successful!");
 
     res.status(201).json({ message: "User registered successfully" });

    // Send acknowledgement to the user
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to STIS-V 2025 Conference!",
      text: `Dear ${givenName},

Thank you for registering for STIS-V 2025.
Your account has been successfully created.
We look forward to your participation.

Thanking you and with best regards,  
STIS-V 2025 Organizing Team`,
    };

    // Send user details to swarajk@iisc.ac.in
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: "stis.mte@iisc.ac.in",
      subject: "New User Registration - STIS-V 2025",
      text: `A new user has registered:

Full Name: ${fullName}
Given Name: ${givenName}
Family Name: ${familyName || "N/A"}
Email: ${email}
Phone: ${phone}
Country: ${country}
Affiliation: ${affiliation}

Regards,
STIS-V Registration System`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("✅ Acknowledgement email sent to user");
    } catch (error) {
      console.error("❌ Error sending email to user:", error);
    }

    try {
      await transporter.sendMail(adminMailOptions);
      console.log("✅ Registration details sent to swarajk@iisc.ac.in");
    } catch (error) {
      console.error("❌ Error sending admin email:", error);
    }

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

app.post("/submit-abstract", verifyToken, upload.single("abstractFile"), async (req, res) => {
  console.log("🔥 /submit-abstract endpoint hit");

  try {
    const {
      uid,
      title,
      theme,
      presentingType,
      firstAuthorName,
      firstAuthorAffiliation,
      otherAuthors,
      presentingAuthorName,
      presentingAuthorAffiliation,
      mainBody
    } = req.body;

    if (!uid) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Abstract file is required" });
    }

    console.log("🧾 Request Body:", req.body);
    console.log("📎 File received:", req.file.originalname);

    // Upload to Cloudinary
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "auto", folder: "abstracts" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
    };

    const cloudinaryResult = await uploadToCloudinary();

    // Update user's abstractSubmission in DB
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
        }
      },
      { new: true, upsert: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Abstract Submission Received Confirmation - STIS-V 2025 Conference",
      text: `Dear ${user.givenName || user.fullName || "Author"},

We are pleased to confirm that we have received your submission successfully.
Please note that all submissions will be carefully reviewed, and you can expect to hear from us by 31st May 2025.
We truly appreciate your contribution and look forward to your active participation in the Conference.

Thanking you and with best regards,

STIS-V 2025 Organizing Team

`,
    };

    console.log("📨 Sending confirmation email to:", user.email);

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("✅ Abstract confirmation email sent:", info.response);

      // Send abstract details to admin
const adminAbstractMail = {
  from: process.env.EMAIL_USER,
  to: "stis.mte@iisc.ac.in",
  subject: `New Abstract Submission from ${user.fullName}`,
  text: `A new abstract has been submitted.

Full Name: ${user.fullName}
Email: ${user.email}
Phone: ${user.phone}
Affiliation: ${user.affiliation}
Title: ${title}
Scope/Theme: ${theme}
Presenting Type: ${presentingType}
First Author: ${firstAuthorName} (${firstAuthorAffiliation})
Other Authors: ${otherAuthors}
Presenting Author: ${presentingAuthorName} (${presentingAuthorAffiliation})
Abstract Link: ${cloudinaryResult.secure_url}

Main Body:
${mainBody}

Regards,  
STIS-V 2025 Submission System`
};

try {
  await transporter.sendMail(adminAbstractMail);
  console.log("✅ Abstract details sent to stis.mte@iisc.ac.in");
} catch (error) {
  console.error("❌ Error sending abstract info to admin:", error);
}


    } catch (error) {
      console.error("❌ Error sending abstract confirmation email:", error);
    }

    res.status(200).json({
      message: "Abstract submitted successfully!",
      abstract: user.abstractSubmission
    });

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






