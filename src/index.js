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

globalThis.initialize = initialize;
globalThis.encrypt = encrypt;
globalThis.decrypt = decrypt;