const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");
const creds = require("../config/sheets-key.json"); // Path to your JSON key file

// ✅ Google Sheet ID (Replace with your actual Sheet ID)
const SHEET_ID = "13WezerzzuaGoWN3mDEpnmZmgj4I0aS9h3i91X7Msw0g"; 

// ✅ Function to update Google Sheets on registration
async function updateGoogleSheet(userData) {
  try {
    console.log("🟢 Received user data for Google Sheets:", userData);

    // ✅ Authenticate using Google Service Account
    const auth = new JWT({
      email: creds.client_email,
      key: creds.private_key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    // ✅ Pass authentication directly into GoogleSpreadsheet constructor
    const doc = new GoogleSpreadsheet(SHEET_ID, auth);
    await doc.loadInfo(); // Load document properties and worksheets

    const sheet = doc.sheetsByIndex[0]; // Select the first sheet

    console.log("✅ Google Sheets connected. Adding row...");

    await sheet.addRow({
      UID: userData.uid,
      Email: userData.email,
      Phone: userData.phone,
      Given_Name: userData.givenName,
      Family_Name: userData.familyName || "N/A",
      Full_Name: userData.fullName,
      Country: userData.country,
      Affiliation: userData.affiliation,
      Registered_At: new Date().toISOString(),
    });

    console.log("✅ Google Sheet updated successfully!");

  } catch (error) {
    console.error("❌ Error updating Google Sheet:", error);
  }
}

// ✅ Ensure function is properly exported
module.exports = { updateGoogleSheet };
