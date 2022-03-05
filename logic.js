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

waitForElm('._2JIth').then(() => {
	setTimeout(() => {
		document.onscroll = addListnerToAddEncryptSendButton()
	}, 1000);
})

// set user's private key on page load
window.onload = setPrivateKey

async function setPrivateKey() {
	chrome.storage.sync.get(['PRIVATE_KEY'], function (items) {
		if (Object.keys(items).length !== 0) {
			alert(`PRIVATE_KEY: ${items['PRIVATE_KEY']}`)
		}
		else {
			chrome.storage.sync.set({ 'PRIVATE_KEY': 'SOME_SECRET_PRIVATE_KEY' }, function () {
				alert("PRIVATE KEY SET")
			});
		}
	});
}

async function addListnerToAddEncryptSendButton() {
	// dummy fetch
	// await fetch('https://jsonplaceholder.typicode.com/todos/1')
	// 	.then(response => response.json())
	// 	.then(json => alert(json.title))
	const people = document.getElementsByClassName("_3m_Xw")
	const len = people.length

	// add onClick listner for each contact
	for (let i = 0; i < len; i++) {
		people[i].onclick = () => { addEncryptSendButton() }
	}
}

function addEncryptSendButton() {
	// clone send button
	const encryptSend = document.getElementsByClassName("_3HQNh _1Ae7k")[0].cloneNode(true)

	// change svg
	encryptSend.children[0].children[0].children[0].children[0].setAttribute("d", "M23,18V17.5A2.5,2.5 0 0,0 20.5,15A2.5,2.5 0 0,0 18,17.5V18A1,1 0 0,0 17,19V23A1,1 0 0,0 18,24H23A1,1 0 0,0 24,23V19A1,1 0 0,0 23,18M22,18H19V17.5A1.5,1.5 0 0,1 20.5,16A1.5,1.5 0 0,1 22,17.5V18M23,12L2,21V14L17,12L2,10V3L23,12Z");

	// change onclick
	encryptSend.children[0].onclick = () => { encryptAndSend() }

	// add after send button
	document.getElementsByClassName("_2lMWa")[0].append(encryptSend)
}

function encryptAndSend() {
	const messageBox = document.querySelectorAll("[contenteditable='true']")[1];
	const message = messageBox.innerHTML
	if (!message) return;

	const encryptedMessage = encryptMessage(message);
	messageBox.innerHTML = encryptedMessage;
	eventx = document.createEvent("UIEvents");
	eventx.initUIEvent("input", true, true, window, 1);
	messageBox.dispatchEvent(eventx);

	document.querySelector('span[data-icon="send"]').click();
}

function encryptMessage(message) {
	return "{}/" + message + "{}"
}