import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import {toHex} from "ethereum-cryptography/utils";
import mapping from "./Mapping";

function Wallet({ userId, setUserId, balance, setBalance }) {
  async function onChange(evt) {
    const userId = evt.target.value;
    setUserId(userId);
    if (mapping[userId]) {
      const publickey = secp.getPublicKey(mapping[userId]);
      const publickeyToHex = toHex(publickey);
      const {
        data: { balance },
      } = await server.get(`balance/${publickeyToHex}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input placeholder="Enter the userId, for example: Account1" value={userId} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
