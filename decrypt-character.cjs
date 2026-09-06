const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const decryptCharacter = () => {
  const inputPath = path.join(__dirname, "public", "models", "character.enc");
  const outputPath = path.join(__dirname, "public", "models", "character.glb");
  const password = "MyCharacter12";

  if (!fs.existsSync(inputPath)) {
    console.error("File not found:", inputPath);
    return;
  }

  const fileBuffer = fs.readFileSync(inputPath);
  const iv = fileBuffer.subarray(0, 16);
  const encryptedData = fileBuffer.subarray(16);

  const key = crypto.createHash("sha256").update(password).digest();

  try {
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
    fs.writeFileSync(outputPath, decrypted);
    console.log("Successfully decrypted character model to:", outputPath);
    console.log("File size:", decrypted.length, "bytes");
  } catch (err) {
    console.error("Decryption failed:", err.message);
  }
};

decryptCharacter();
