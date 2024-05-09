import crypto from "crypto";

function generatePasswordHash(password) {
  const salt = crypto.randomBytes(32).toString("hex").slice(0, 32);
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex")
    .slice(0, 64);

  return {
    salt: salt,
    hash: genHash,
  };
}

function validatePassword(password, hash, salt) {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex").slice(0,64);
  return hash === hashVerify;
}

export { generatePasswordHash, validatePassword };
