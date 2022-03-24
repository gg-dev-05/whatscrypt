## Description

Want to share some sensitive/private information with someone, but afraid that whatsapp/facebook is seeing ur text activity? You have found the right tool!

Whatscrypt is an encrypting tool that takes your message and converts it to illegible
gibberish that can only be decrypted by the person you want to send it to. No middleman will be able to decrypt the text! (Not even us, check the source code if you still have your doubts).

### How it works?
The encryption works based on asymmetric cryptography aka private-public key cryptography. 
Once you register with the extension with your phone number, we give you a private-public key pair. 
The private key pair goes in the local storage of your browser while the public pair goes on a database from where other users(the reciever) can access your public key based on your phone number mapping.
This happens both ways and we get the desired function. Without access to the reciever's private key, no one will be able to see the actual message!
