
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
app.post("/register", async (req, res) => {
  try {
    const { email, password, phone, givenName, familyName, fullName, country, affiliation } = req.body;

    if (!email || !password || !phone || !givenName || !fullName || !country || !affiliation) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

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

    await newUser.save(); // ✅ Save user first

    // ✅ Send response before long operations like Google Sheets update
    res.status(201).json({ message: "User registered successfully" });

    // ✅ Call `updateGoogleSheet()` only once (after response is sent)
    console.log("🔄 Attempting to update Google Sheets...");
    await updateGoogleSheet(newUser);
    console.log("✅ Google Sheets update was successful!");

    // ✅ Send emails after response is sent
    sendRegistrationEmails(email, givenName, fullName, familyName, phone, country, affiliation);

  } catch (error) {
    console.error("❌ Error registering user:", error);

    if (!res.headersSent) { // ✅ Prevent multiple responses
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
});

// ✅ Function to send emails asynchronously (prevents API slowdowns)
async function sendRegistrationEmails(email, givenName, fullName, familyName, phone, country, affiliation) {
  try {
    // ✅ Send email to user
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to STIS-V 2025 Conference!",
      text: `Dear ${givenName},\n\nThank you for registering for STIS-V 2025.\nYour account has been successfully created.\nWe look forward to your participation.\n\nBest regards,\nSTIS-V 2025 Organizing Team`,
    };


    await transporter.sendMail(mailOptions);
    console.log("✅ Acknowledgement email sent to user:", email);

    // ✅ Send registration details to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: "stis.mte@iisc.ac.in",
      subject: "New User Registration - STIS-V 2025",
      text: `A new user has registered:\n\nFull Name: ${fullName}\nGiven Name: ${givenName}\nFamily Name: ${familyName || "N/A"}\nEmail: ${email}\nPhone: ${phone}\nCountry: ${country}\nAffiliation: ${affiliation}\n\nRegards,\nSTIS-V Registration System`,
    };
    await transporter.sendMail(adminMailOptions);
    console.log("✅ Registration details sent to admin");

  } catch (error) {
    console.error("❌ Error sending emails:", error);
  }
}




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

     // ✅ Update Google Sheets with Abstract details
     console.log("🔄 Attempting to update Google Sheets for Abstract Submission...");
     await updateGoogleSheet(user, true);
     console.log("✅ Google Sheets updated with Abstract details!");
 

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






