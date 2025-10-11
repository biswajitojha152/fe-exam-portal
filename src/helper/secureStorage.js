import CryptoJS from "crypto-js";
import config from "../config/config";

function getSessionId() {
  const existing = sessionStorage.getItem("sessionId");
  if (existing) return existing;

  const newId = crypto.randomUUID();
  sessionStorage.setItem("sessionId", newId);
  return newId;
}

function getDerivedValues() {
  const sessionId = getSessionId();

  const salt = CryptoJS.enc.Hex.parse(
    CryptoJS.SHA256(sessionId + "salt")
      .toString()
      .slice(0, 32)
  );

  const iv = CryptoJS.enc.Hex.parse(
    CryptoJS.SHA256(sessionId + "iv")
      .toString()
      .slice(0, 32)
  );

  const key = CryptoJS.PBKDF2(config.passPhrase, salt, {
    keySize: 256 / 32,
    iterations: 1000,
  });

  return { key, iv };
}

const secureStorage = {
  setItem: (key, value) => {
    try {
      const { key: derivedKey, iv } = getDerivedValues();

      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(value),
        derivedKey,
        { iv }
      );

      sessionStorage.setItem(key, encrypted.toString());
    } catch (err) {
      console.error("Encryption error:", err);
    }
  },

  getItem: (key) => {
    try {
      const { key: derivedKey, iv } = getDerivedValues();

      const ciphertext = sessionStorage.getItem(key);
      if (!ciphertext) return null;

      const bytes = CryptoJS.AES.decrypt(ciphertext, derivedKey, { iv });
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (err) {
      console.error("Decryption error:", err);
      return null;
    }
  },

  removeItem: (key) => sessionStorage.removeItem(key),
  clear: () => sessionStorage.clear(),
};

export default secureStorage;
