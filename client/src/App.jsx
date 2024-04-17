import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [userId, setUserId] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        userId={userId}
        setUserId={setUserId}
      />
      <Transfer setBalance={setBalance} userId={userId} />
    </div>
  );
}

export default App;
