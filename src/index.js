const DELIMITER = "[]C[]H[]A[]N[]T[]U[]"
const nacl = require("tweetnacl");
nacl.util = require("tweetnacl-util");

function initialize() {
  return nacl.box.keyPair();
}

function encrypt(myPrivateKey, theirPublicKey, message) {
  const sharedKey = nacl.box.before(theirPublicKey, myPrivateKey);
  const oneTimeCode = nacl.randomBytes(24);
  const cipherText = nacl.box.after(nacl.util.decodeUTF8(message), oneTimeCode, sharedKey);
  return { cipherText, oneTimeCode }
}

function decrypt(myPrivateKey, theirPublicKey, encryptedMessage) {
  const sharedKey = nacl.box.before(theirPublicKey, myPrivateKey);
  const message = nacl.box.open.after(encryptedMessage.cipherText, encryptedMessage.oneTimeCode, sharedKey);
  const plainText = nacl.util.encodeUTF8(message);
  return plainText
}

const david = initialize();
const victoria = initialize();

const message = "HELO";

const encryptedMessage = encrypt(david.secretKey, victoria.publicKey, message);
const messageString = nacl.util.encodeBase64(encryptedMessage.cipherText) + DELIMITER + nacl.util.encodeBase64(encryptedMessage.oneTimeCode);
console.log(messageString);


const messageGot = messageString.split(DELIMITER);
const obj = {
  cipherText: nacl.util.decodeBase64(messageGot[0]),
  oneTimeCode: nacl.util.decodeBase64(messageGot[1]),
}
console.log(decrypt(victoria.secretKey, david.publicKey, obj));
// globalThis.nacl = nacl;
// globalThis.initialize = initialize;
// globalThis.encrypt = encrypt;
// globalThis.decrypt = decrypt;