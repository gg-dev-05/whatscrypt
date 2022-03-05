function addEncryptSendButton() {
	// clone send button
	const encryptSend = document.getElementsByClassName("_3HQNh _1Ae7k")[0].cloneNode(true)

	// change svg
	encryptSend.children[0].children[0].children[0].children[0].setAttribute("d", "M23,18V17.5A2.5,2.5 0 0,0 20.5,15A2.5,2.5 0 0,0 18,17.5V18A1,1 0 0,0 17,19V23A1,1 0 0,0 18,24H23A1,1 0 0,0 24,23V19A1,1 0 0,0 23,18M22,18H19V17.5A1.5,1.5 0 0,1 20.5,16A1.5,1.5 0 0,1 22,17.5V18M23,12L2,21V14L17,12L2,10V3L23,12Z");

	// change onclick
	encryptSend.children[0].onclick = () => { encryptMessage() }

	// add after send button
	document.getElementsByClassName("_2lMWa")[0].append(encryptSend)
}

function encryptMessage() {
	const messageBox = document.querySelectorAll("[contenteditable='true']")[1];
	const message = messageBox.innerHTML
	if (!message) return;
	const encryptedMessage = "ENCRYPT" + message + "ENCRYPT"
	messageBox.innerHTML = encryptedMessage;
	eventx = document.createEvent("UIEvents");
	eventx.initUIEvent("input", true, true, window, 1);
	messageBox.dispatchEvent(eventx);
	document.querySelector('span[data-icon="send"]').click();
}

function addListnerToAddEncryptSendButton() {
	const people = document.getElementsByClassName("_3m_Xw")
	const len = people.length
	for (let i = 0; i < len; i++) {
		people[i].onclick = () => { addEncryptSendButton() }
	}
}

document.onscroll = addListnerToAddEncryptSendButton()
