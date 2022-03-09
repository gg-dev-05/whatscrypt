function waitForElementToLoad(selector) {
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

async function openContact() {
  globalThis.contactPhoneNumber = getContactsPhoneNumber();
  if (globalThis.contactPhoneNumber && globalThis.contactPhoneNumber !== "GROUP") {
    globalThis.contactPhoneNumberPublicKey = await getPublicKeyFromServer(globalThis.contactPhoneNumber);
    if (globalThis.contactPhoneNumberPublicKey) {
      addEncryptSendButton();
      decryptAllMessages();
      document.getElementsByClassName("_33LGR")[0].onscroll = () => decryptAllMessages();
    } else {
      alert(`Sorry ${globalThis.contactPhoneNumber} is not using Whatscrypt`)
    }
  } else {
    if (globalThis.contactPhoneNumber === "GROUP") return;
    alert(`Something doesn't seem OK, please try again`)
  }
}

function getContactsPhoneNumber() {
  // open user info panel
  document.getElementsByClassName("_24-Ff")[0].click();

  // get phone number
  let phoneNumberWithCountryCode = document.getElementsByClassName("AjtLy _1FXE6 _1lF7t")[0]?.innerText;

  if (!phoneNumberWithCountryCode) phoneNumberWithCountryCode = null;

  // TODO: Not working
  if (phoneNumberWithCountryCode?.substring(0, 5) === "Group") phoneNumberWithCountryCode = "GROUP";

  if (phoneNumberWithCountryCode && phoneNumberWithCountryCode !== "GROUP" && phoneNumberWithCountryCode[0] !== '+') {
    // for unsaved numbers
    phoneNumberWithCountryCode = document.getElementsByClassName("l7jjieqr")[0].textContent;
  }
  // close user info panel
  document.getElementsByClassName("_18eKe")[0].click();
  if (!phoneNumberWithCountryCode) return null;
  if (phoneNumberWithCountryCode === "GROUP") return "GROUP";

  return getPhoneNumberFromPhoneNumberWithCountryCode(phoneNumberWithCountryCode);
}

function getPhoneNumberFromPhoneNumberWithCountryCode(phoneNumberWithCountryCode) {
  let phoneNumber = "";
  const phoneNumberSplit = phoneNumberWithCountryCode.split(' ')
  for (let i = 1; i < phoneNumberSplit.length; i++) {
    phoneNumber += phoneNumberSplit[i];
  }
  return phoneNumber;
}

function addEncryptSendButton() {
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

async function addOnClickListnerForContacts() {
  const people = document.getElementsByClassName("_3m_Xw")
  const len = people.length

  // add onClick listner for each contact
  for (let i = 0; i < len; i++) {
    people[i].onclick = () => { openContact() }
  }
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
  const encryptedMessage = globalThis.encrypt(nacl.util.decodeBase64(globalThis.user.encodedPrivateKey), nacl.util.decodeBase64(globalThis.contactPhoneNumberPublicKey), message);
  const messageString = nacl.util.encodeBase64(encryptedMessage.cipherText) + DELIMITER + nacl.util.encodeBase64(encryptedMessage.oneTimeCode);
  return messageString;
}

function decryptAllMessages() {
  // returns null for sometimes
  let messages = document.getElementsByClassName("_3K4-L")[0].children
  if (!messages) messages = document.getElementsByClassName("_33LGR")[0].children

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
            messageNode.innerHTML = globalThis.decrypt(nacl.util.decodeBase64(globalThis.user.encodedPrivateKey), nacl.util.decodeBase64(globalThis.contactPhoneNumberPublicKey), obj)
          }
        }
      } catch (error) {
        console.error("Unable to decrypt, Invalid keys")
        messageNode.innerHTML = " ==== Unable to decrypt this message ==== "
      }
    }
  }
}

async function getPublicKeyFromServer(number) {
  const response = await fetch(`https://whatscrypt.herokuapp.com/api/get/${number}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  })
  if (response && response.status === 200) {
    const data = await response.json();
    return data['publicKey']
  } else {
    return null;
  }
}

function getFromStorage(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(key, result => resolve(result[key]));
  })
}

// const getFromStorage = key => {
//   new Promise((resolve, reject) => {
//     chrome.storage.sync.get(key, result =>
//       chrome.runtime.lastError
//         ? reject(Error(chrome.runtime.lastError.message))
//         : resolve(result)
//     )
//   })
// }

function setToStorage(key, value) {
  chrome.storage.sync.set({ [key]: value })
}

function clearStorage() {
  chrome.storage.sync.clear();
}

// const setToStorage = data => {
//   new Promise((resolve, reject) => {
//     chrome.storage.sync.set(data, () =>
//       chrome.runtime.lastError
//         ? reject(Error(chrome.runtime.lastError.message))
//         : resolve()
//     )
//   })
// }

globalThis.waitForElementToLoad = waitForElementToLoad;
globalThis.addOnClickListnerForContacts = addOnClickListnerForContacts;
globalThis.openContact = openContact;
globalThis.encryptAndSend = encryptAndSend;
globalThis.encryptMessage = encryptMessage;
globalThis.decryptAllMessages = decryptAllMessages;
globalThis.getPublicKeyFromServer = getPublicKeyFromServer;
globalThis.getFromStorage = getFromStorage;
globalThis.setToStorage = setToStorage;
globalThis.clearStorage = clearStorage;