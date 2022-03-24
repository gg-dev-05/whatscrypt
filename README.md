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
1. In Chrome/Edge go to the extensions page (`chrome://extensions` or `brave://extensions`).
1. Enable `Developer Mode`.
1. Drag the `extension` folder anywhere on the page to import it (do not delete the folder afterwards).  
   **NOTE** Only drag extension folder
