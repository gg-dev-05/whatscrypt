const DELIMITER = "[]C[]H[]A[]N[]T[]U[]"

const user = {}
const otherUser = {}

function getMyKeys() {
	// Check if keys are present in local storage
	// if nothing is present in local storage
	// 			get new public - private pair from server (after email verification)
	// if present 
	user['PRIVATE_KEY'] = ''
	user['PUBLIC_KEY'] = ''
}

function getOtherUsersPublicKey() {
	// fetch other users phone number
	// ask server for their keys
	otherUser['PUBLIC_KEY'] = ''
}

// wait for whatsapp to complete loading
globalThis.waitForElementToLoad('._2JIth').then(() => {
	setTimeout(() => {
		// document.onscroll = addListnerToAddEncryptSendButton()
		console.log("FINE")
	}, 1000);
})

// set user's private key on page load
window.onload = checkIfKeysArePresentInLocalStorage;

async function checkIfKeysArePresentInLocalStorage() {
	chrome.storage.sync.clear();
	const privateKey = await getFromStorage('PRIVATE_KEY');
	if (!privateKey) {
		alert("NO KEYS PRESENT, Please sign up")
		window.open("https://www.google.com", "", "popup")
	}
}












// dummy fetch
// await fetch('https://jsonplaceholder.typicode.com/todos/1')
// 	.then(response => response.json())
// 	.then(json => alert(json.title))