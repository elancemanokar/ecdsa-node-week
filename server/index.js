const express = require("express");
const secp = require("ethereum-cryptography/secp256k1");
const {toHex} = require("ethereum-cryptography/utils");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04d13ddea31ee30453ac51a0fd241a314a14a8fa7a8979dd075008da9dca9d4761e19543816984e2629532af273006897901572bb9fe152576924ded42168233ac": 100,
  "045d0e93ee4edd4c56d4637df3fa9cd745086203b2dd7eeb256d0c2a7bb062bb819242c1a25a91a1134bbf5a6517e34416120fb251b7197a8bc4af15332ae0fe4d": 50,
  "0465e243711a29fc3f1daa747d716c2f29b3bc49a515dba9d40e86ed4823df71ac5f3fb5324b848b0d3544e310c0cd49c98babf39c333e7db586838e7d0aca23c7": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, hexMessageHash, signature, recovery } = req.body;
  const signaturePublicKey = toHex(secp.recoverPublicKey(hexMessageHash, signature, recovery));

  if(signaturePublicKey.toString() !== sender){
    res.status(400).send({message: "You are not the person!"})
  }
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
