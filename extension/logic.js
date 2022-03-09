const DELIMITER = "[]C[]H[]A[]N[]T[]U[]"
let stopWhatscrypt = false;
const user = {}
let phoneNumber;

// wait for whatsapp to complete loading
globalThis.waitForElementToLoad('._2JIth').then(() => {
	setTimeout(() => {
		main();
	}, 1000);
})

async function main() {
	let encodedKeys = await checkIfKeysArePresentInLocalStorage();
	if (!encodedKeys) {
		encodedKeys = await userSignUp();
		if (encodedKeys === null) {
			stopWhatscrypt = true;
			return;
		}
		console.log("SETTING UP LOCAL STORAGE")
		globalThis.setToStorage("ENCODED_PRIVATE_KEY", encodedKeys.encodedPrivateKey);
		globalThis.setToStorage("ENCODED_PUBLIC_KEY", encodedKeys.encodedPublicKey);
		globalThis.setToStorage("PHONE_NUMBER", phoneNumber);
	}
	else {
		// verification of stored public key
		const publicKeyFromServer = await getPublicKey()
		if (publicKeyFromServer !== encodedKeys.encodedPublicKey) {
			alert("PUBLIC_KEY mismatch, you may not be able to read old encrypted messages")
			// reset data
			globalThis.clearStorage();
			return main();
		}
	}
	user.encodedPrivateKey = encodedKeys.encodedPrivateKey;
	user.encodedPublicKey = encodedKeys.encodedPublicKey;

	// add onClickListnerForContacts
	globalThis.addOnClickListnerForContacts();
	window.onscroll = () => {
		globalThis.addOnClickListnerForContacts();
	}
}

async function getPublicKey() {
	await getPhoneNumber("Enter phone number for verification of your public key");
	if (stopWhatscrypt) return;
	const response = await fetch(`http://localhost:3000/api/get/${phoneNumber}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
	})
	if (response && response.status === 200) {
		const data = await response.json();
		return data['publicKey']
	}
	else {
		return null;
	}
}
async function getPhoneNumber(message) {
	// check local storage
	phoneNumber = await globalThis.getFromStorage('PHONE_NUMBER');
	if (phoneNumber) return;

	// ask user to supply phone number
	phoneNumber = prompt(message);
	if (!(phoneNumber && phoneNumber.length === 10)) {
		stopWhatscrypt = true;
		alert("INVALID PHONE NUMBER")
	}
}

async function userSignUp() {
	await getPhoneNumber("Enter phone number for message encryption");
	if (stopWhatscrypt) return;
	const data = globalThis.initialize()
	const response = await fetch('http://localhost:3000/api/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify({
			phoneNumber,
			publicKey: globalThis.nacl.util.encodeBase64(data.publicKey)
		})
	})
	if (response && response.status === 200) {
		return { encodedPublicKey: globalThis.nacl.util.encodeBase64(data.publicKey), encodedPrivateKey: globalThis.nacl.util.encodeBase64(data.secretKey) }
	}
	else {
		stopWhatscrypt = true;
		alert("SOMETHING WENT WRONG while contacting whatscrypt-api")
		return null;
	}
}

async function checkIfKeysArePresentInLocalStorage() {
	const encodedPrivateKey = await globalThis.getFromStorage('ENCODED_PRIVATE_KEY');
	if (!encodedPrivateKey) {
		return false;
	}
	const encodedPublicKey = await globalThis.getFromStorage('ENCODED_PUBLIC_KEY')
	return { encodedPublicKey, encodedPrivateKey };
}
