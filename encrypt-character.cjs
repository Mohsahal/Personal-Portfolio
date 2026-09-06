const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const encryptCharacter = () => {
  const inputPath = path.join(__dirname, "public", "models", "character.glb");
  const outputPath = path.join(__dirname, "public", "models", "character.enc");
  const password = "MyCharacter12";

  if (!fs.existsSync(inputPath)) {
    console.error("File not found:", inputPath);
    return;
  }

  const fileBuffer = fs.readFileSync(inputPath);
  const iv = crypto.randomBytes(16);
  const key = crypto.createHash("sha256").update(password).digest();

  try {
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    const encrypted = Buffer.concat([iv, cipher.update(fileBuffer), cipher.final()]);
    fs.writeFileSync(outputPath, encrypted);
    console.log("Successfully encrypted character model to:", outputPath);
    console.log("File size:", encrypted.length, "bytes");
  } catch (err) {
    console.error("Encryption failed:", err.message);
  }
};

encryptCharacter();
