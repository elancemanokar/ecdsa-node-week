const secp = require("ethereum-cryptography/secp256k1");
const {toHex} = require("ethereum-cryptography/utils");

const privatekey = secp.utils.randomPrivateKey();
console.log('private key: '+ toHex(privatekey));

const publickey = secp.getPublicKey(privatekey);
console.log('public key: '+ toHex(publickey));

// private key: b787c2036928242c375487a7f1b84bdde36019a0ba26452e5d677f472131b232
// public key: 04d13ddea31ee30453ac51a0fd241a314a14a8fa7a8979dd075008da9dca9d4761e19543816984e2629532af273006897901572bb9fe152576924ded42168233ac

// private key: fc9da7e6c8bc4b409963bc0e563f3b72c22f2534309f289ceec2c54b69dd16fb
// public key: 045d0e93ee4edd4c56d4637df3fa9cd745086203b2dd7eeb256d0c2a7bb062bb819242c1a25a91a1134bbf5a6517e34416120fb251b7197a8bc4af15332ae0fe4d

// private key: a2a23b927a009f4a030a61e7381bb258f5fe786d571062b8a5ebd18ecf7c9931
// public key: 0465e243711a29fc3f1daa747d716c2f29b3bc49a515dba9d40e86ed4823df71ac5f3fb5324b848b0d3544e310c0cd49c98babf39c333e7db586838e7d0aca23c7