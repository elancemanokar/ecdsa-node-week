import { useState } from "react";
import mapping from "./Mapping";
import * as secp from "ethereum-cryptography/secp256k1";
import {toHex, utf8ToBytes} from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";
import server from "./server";
import JSONbig from "json-big";

function Transfer({ userId, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    const signature = await secp.sign(hexMessageHash(), mapping[userId], {recovered : true});
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: toHexAddress(userId),
        amount: parseInt(sendAmount),
        recipient: toHexAddress(recipient),
        hexMessageHash: hexMessageHash(),
        signature: toHex(signature[0]),
        recovery: signature[1]
      });
      setBalance(balance);
    } catch (ex) {
      console.log(ex);
    }
  }
  const toHexAddress = (key) => {
    const publickey = secp.getPublicKey(mapping[key]);
    return toHex(publickey);
  }
  const hexMessageHash = () => {
    try{
    const transaction = {
      sender: toHexAddress(userId),
      amount: parseInt(sendAmount),
      recipient: toHexAddress(recipient)
    }
    return toHex(keccak256(utf8ToBytes(JSON.stringify(transaction))));
    }
    catch(ex){
    console.log("In hex message hash function"+ ex);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>
      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>
      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>
      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
