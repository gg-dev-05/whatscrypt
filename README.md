<p align="center">
  <img src="https://user-images.githubusercontent.com/59741135/159886607-54432562-65a3-435b-8d1a-58f8f91bda74.png" width="75" height="75"/>
</p>

<h1 align="center">Whatscrypt</h1>

<p align="center"><em>Encrypt the encrypted</em></p>

<em>
<p align="center">
Want to share some sensitive/private information with someone, but afraid that whatsapp / facebook is seeing ur text activity? You have found the right tool!
</p>

<p align="center">
<strong>Whatscrypt</strong> is an encrypting tool that takes your message and converts it to illegible
gibberish that can only be decrypted by the person you want to send it to. No middleman will be able to decrypt the text! (Not even us, check the source code if you still have your doubts).
</p>
</em>

<hr>
<h2 align="center">How it Works?</h2>
<p align="center">
The encryption works based on asymmetric cryptography aka <a href="https://en.wikipedia.org/wiki/Public-key_cryptography"><em>private-public key cryptography.</em></a>
Once you register with the extension with your phone number, whatscrypt will assign you a private-public key pair.
The <em>private key</em> goes in the local storage of your browser while the <em>public key </em> goes on a database from where other users(the reciever) can access your public key based on your phone number mapping.
This happens both ways and we get the desired function. Without access to the reciever's private key, no one will be able to see the actual message!
</p>
<hr>
<h2 align="center">Installation Instructions</h1>

**Chrome / Brave** (Custom sites supported)

1. Download this repo as a [ZIP file from GitHub](https://github.com/gg-dev-05/whatscrypt/archive/refs/heads/master.zip)
1. Unzip the file and you should have a folder named `whatscrypt-master`.
1. Open `whatscrypt-master` folder (A folder named `extension` should be visible )
1. Go to the extensions page (<a href="chrome://extensions">`chrome://extensions`</a>).
1. Enable `Developer Mode` ( A toggle switch should be present on the top right corner).
1. Drag the `extension` folder anywhere on the page to import it.

<h3>Important Points</h3>

- Only drag extension folder (as mentioned in #6 of Installation Instructions).
- If the extension does not seem to work try to disable you adblocker
- Since whatscrypt is storing your private key in the browser's storage, if you change browser or remove your private key all previously sent messages will be lost forever as whatscrypt won't be able to decrypt them.

<h3>Helpful Links</h3>

- [Implementing Public Key Cryptography in JS](https://www.section.io/engineering-education/implementing-public-key-cryptography-in-javascript/)
- [API calls using a chrome extension](https://dev.to/debosthefirst/how-to-build-a-chrome-extension-that-makes-api-calls-1g04)
