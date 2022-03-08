const DELIMITER = "[]C[]H[]A[]N[]T[]U[]"
let stopWhatscrypt = false;
const user = {}

// wait for whatsapp to complete loading
globalThis.waitForElementToLoad('._2JIth').then(() => {
	setTimeout(() => {
		main();
	}, 1000);
})

async function main() {
	let encodedKeys = await checkIfKeysArePresentInLocalStorage();
	console.log(encodedKeys);
	if (!encodedKeys) { // BUG: Always returning false
		// 	encodedKeys = await userSignUp();
		// 	if (encodedKeys === null) {
		// 		stopWhatscrypt = true;
		// 		return;
		// 	}
		await globalThis.setToStorage({ "ENCODED_PRIVATE_KEY": encodedKeys.privateKey });
		await globalThis.setToStorage({ "ENCODED_PUBLIC_KEY": encodedKeys.publicKey });
	}
	// else {
	// 	// TODO: verify PUBLIC_KEY with server
	// }
	// user.encodedPrivateKey = encodedKeys.encodedPrivateKey;
	// user.encodedPublicKey = encodedKeys.encodedPublicKey;

	// // add onClickListnerForContacts
	// globalThis.addOnClickListnerForContacts();
	// window.onscroll = () => {
	// 	globalThis.addOnClickListnerForContacts();
	// }
	console.log(await checkIfKeysArePresentInLocalStorage())
}

async function userSignUp() {
	const phoneNumber = prompt("Enter your phone number (will be used for encrypting messages)");
	const data = globalThis.initialize()
	const response = await fetch('http://localhost:3000/api/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify({
			phoneNumber,
			publicKey: nacl.util.encodeBase64(data.publicKey)
		})
	})
	if (response && response.status === 200) {
		return { encodedPublicKey: globalThis.nacl.util.encodeBase64(data.publicKey), encodedPrivateKey: globalThis.nacl.util.encodeBase64(data.secretKey) }
	}
	else {
		stopWhatscrypt = true;
		alert("SOMETHING WENT WRONG")
		return null;
	}
}

async function checkIfKeysArePresentInLocalStorage() {
	// chrome.storage.sync.clear();
	const encodedPrivateKey = await globalThis.getFromStorage('ENCODED_PRIVATE_KEY');
	if (!encodedPrivateKey) {
		return false;
	}
	const encodedPublicKey = await globalThis.getFromStorage('ENCODED_PUBLIC_KEY')
	return { encodedPublicKey, encodedPrivateKey };
}
