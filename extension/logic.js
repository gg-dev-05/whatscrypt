const DELIMITER = "[]C[]H[]A[]N[]T[]U[]"
const david = globalThis.initialize();
const victoria = globalThis.initialize();
// wait for whatsapp to complete loading
waitForElm('._2JIth').then(() => {
	setTimeout(() => {
		document.onscroll = addListnerToAddEncryptSendButton()
	}, 1000);

})

// set user's private key on page load
window.onload = setPrivateKey;

async function setPrivateKey() {
	// TODOS:
	// [1] Query API to check if this user exists or not
	// [2] 
	//  If already exists check local storage for private key
	// 	[2.1] Private key exists => Do nothing, continue
	//  [2.2] Private key does not exist =>
	//					[2.2.1]	Remove user's public key from db
	//					[2.2.2] Generate new pair
	//					[2.2.3] Post public key to db
	//					[2.2.4] Save private key locally 
	// If does not exist
	// chrome.storage.sync.clear();
	// const privateKey = await getFromStorage('PRIVATE_KEY');
	// if (!privateKey)
	// 	setToStorage('PRIVATE_KEY', user.secretKey);
}

async function addListnerToAddEncryptSendButton() {

	const people = document.getElementsByClassName("_3m_Xw")
	const len = people.length

	// add onClick listner for each contact
	for (let i = 0; i < len; i++) {
		people[i].onclick = () => { addEncryptSendButton() }
	}
}

function addEncryptSendButton() {
	decryptAllMessages();

	// decrypt on new messages
	document.getElementsByClassName("_33LGR")[0].onscroll = () => decryptAllMessages();
	// clone send button
	const encryptSend = document.getElementsByClassName("_3HQNh _1Ae7k")[0].cloneNode(true)

	// change svg
	encryptSend.children[0].children[0].children[0].children[0].setAttribute("d", "M23,18V17.5A2.5,2.5 0 0,0 20.5,15A2.5,2.5 0 0,0 18,17.5V18A1,1 0 0,0 17,19V23A1,1 0 0,0 18,24H23A1,1 0 0,0 24,23V19A1,1 0 0,0 23,18M22,18H19V17.5A1.5,1.5 0 0,1 20.5,16A1.5,1.5 0 0,1 22,17.5V18M23,12L2,21V14L17,12L2,10V3L23,12Z");

	// change onclick
	encryptSend.children[0].onclick = () => { encryptAndSend() }

	// add after send button
	if (document.getElementsByClassName("_2lMWa")[0].childElementCount < 3)
		document.getElementsByClassName("_2lMWa")[0].append(encryptSend)
}

async function encryptAndSend() {
	const messageBox = document.querySelectorAll("[contenteditable='true']")[1];
	const message = messageBox.innerHTML
	if (!message) return;

	const encryptedMessage = await encryptMessage(message);
	messageBox.innerHTML = encryptedMessage;
	eventx = document.createEvent("UIEvents");
	eventx.initUIEvent("input", true, true, window, 1);
	messageBox.dispatchEvent(eventx);

	document.querySelector('span[data-icon="send"]').click();

	decryptAllMessages();
}

async function encryptMessage(message) {
	const encryptedMessage = globalThis.encrypt(david.secretKey, victoria.publicKey, message);
	const messageString = nacl.util.encodeBase64(encryptedMessage.cipherText) + DELIMITER + nacl.util.encodeBase64(encryptedMessage.oneTimeCode);
	return messageString;
}

function waitForElm(selector) {
	return new Promise(resolve => {
		if (document.querySelector(selector)) {
			return resolve(document.querySelector(selector));
		}

		const observer = new MutationObserver(mutations => {
			if (document.querySelector(selector)) {
				resolve(document.querySelector(selector));
				observer.disconnect();
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true
		});
	});
}

function decryptAllMessages() {
	const messages = document.getElementsByClassName("y8WcF")[0].children
	for (let i = 0; i < messages.length; i++) {
		if (!messages[i].classList.contains('decrypted') && (messages[i].classList.contains('message-in') || messages[i].classList.contains('message-out'))) {
			const messageNode = messages[i].getElementsByClassName("i0jNr selectable-text copyable-text")[0]
			const message = messageNode?.textContent
			try {
				if (message && message.includes(DELIMITER)) {
					messages[i].classList.add('decrypted')
					const messageComponents = message.split(DELIMITER)
					if (messageComponents.length === 2) {
						const messageGot = message.split(DELIMITER);
						const obj = {
							cipherText: nacl.util.decodeBase64(messageGot[0]),
							oneTimeCode: nacl.util.decodeBase64(messageGot[1]),
						}
						messageNode.innerHTML = globalThis.decrypt(victoria.secretKey, david.publicKey, obj);
					}
				}
			} catch (error) {
				console.error("Unable to decrypt, Invalid keys")
				messageNode.innerHTML = " ==== Unable to decrypt this message ==== "
			}
		}
	}
}

const getFromStorage = key => new Promise((resolve, reject) =>
	chrome.storage.sync.get(key, result => resolve(result[key])));

const setToStorage = (key, value) => {
	chrome.storage.sync.set({ [key]: value })
}

// dummy fetch
// await fetch('https://jsonplaceholder.typicode.com/todos/1')
// 	.then(response => response.json())
// 	.then(json => alert(json.title))