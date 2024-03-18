import { useEffect, useState } from "react";
import dragon from "./assets/dragon.png";
import random_postion from "./util";
import "./App.css";
import GameLevel from "./GameLevel";
import back from "./assets/back.png";
import close from "./assets/closemodal.png";
import coin from "./assets/coin.png";
import { useMutation } from "react-query";
import { getBalance, updateBalance } from "./balanceHook";

function App() {
  const [game, setGame] = useState([]);
  const [level, setLevel] = useState(9);
  const [bet, setBet] = useState(false);
  const [view, setView] = useState(false);
  const [win, setWin] = useState(false);
  const [wallet, setWallet] = useState(7000);
  const [profit, setProfit] = useState(0);
  const [amount, setAmount] = useState(0);
  const [retry, setRetry] = useState(false);
  const [cashOutModal, setCashOutModal] = useState(false);
  const [lowModal, setLowModal] = useState(false);
  const [howTo, setHowTo] = useState(false);
  const [cash, setCash] = useState(0);
  const token = localStorage.getItem("access_token");
  const balance = useMutation(getBalance, {
    onSuccess: (data) => {
      setWallet(data.amount);
    },
    onError: () => {
      console.log("there was an error");
    },
  });

  const decreaseBalance = useMutation(updateBalance, {
    onSuccess: (data) => {
      setProfit(parseInt(amount));
      setWin(false);
      setBet(true);
      setView(false);
      setRetry(false);
      setLevel(9);
    },
    onError: () => {
      console.log("there was an error");
    },
  });

  const increaseBalance = useMutation(updateBalance, {
    onSuccess: (data) => {
      parseInt(profit) !== 0
        ? setCash(parseInt(profit) - amount)
        : setCash(parseInt(profit));
      setProfit(0);
      setBet(false);
      setView(false);
      setLevel(9);
      setCashOutModal(true);
    },
    onError: () => {
      console.log("there was an error");
    },
  });

  useEffect(() => {
    let newArray = [];
    for (let i = 0; i < 10; i++) {
      newArray.push(random_postion());
    }
    setGame(newArray);
    // balance.mutate(token);
  }, [bet]);

  const handleBet = () => {
    // decreaseBalance.mutate({
    //   token,
    //   amount: parseInt(amount),
    //   stat: "decrease",
    // });
    if (parseInt(wallet) - parseInt(amount) < 0) {
      setLowModal(true);
    } else {
      setWallet(parseInt(wallet) - parseInt(amount));
      setProfit(parseInt(amount));
      setWin(false);
      setBet(true);
      setView(false);
      setRetry(false);
      setLevel(9);
      setCash(0);
    }
  };

  const handleCashout = () => {
    // increaseBalance.mutate({
    //   token,
    //   amount: parseInt(profit),
    //   stat: "increase",
    // });
    setWallet(parseInt(wallet) + parseInt(profit));
    console.log("profit", profit);
    console.log("amount", amount)
    setCash(parseInt(profit));
    setProfit(0);
    setBet(false);
    setView(false);
    setLevel(9);
    setCashOutModal(true);
  };

  const handleRetry = () => {
    setView(false);
    setBet(false);
    setProfit(0);
    setLevel(9);
    setCash(0);
  };

  return (
    <div className="app">
      {cashOutModal && (
        <div className="cash-out-modal">
          <div className="cashout-info">
            <p className="cash-close">
              <img
                src={close}
                alt="close"
                onClick={() => setCashOutModal(false)}
              />
            </p>
            {
              cash !== 0? <p className="margin">YOU WON</p> : <p className="margin">REFUND</p>
            }
            <p>
              <hr />
            </p>
            <p className="profit">{cash} Birr</p>
          </div>
        </div>
      )}
      {lowModal && (
        <div className="cash-out-modal">
          <div className="cashout-info">
            <p className="cash-close">
              <img src={close} alt="close" onClick={() => setLowModal(false)} />
            </p>
            <p className="low">Low Balance</p>
          </div>
        </div>
      )}
      {howTo && (
        <div className="how-to-play-modal">
          <div className="how-to-play-modal-instruction">
            <p className="cash-close">
              <img src={close} alt="close" onClick={() => setHowTo(false)} />
            </p>
            <p>
              <img src={dragon} alt="dragon" />
            </p>
            <h2>How to Play Dragon Bonanza</h2>
            <h3>Overview:</h3>
            <div className="text">
              Dragon Bonanza is a straightforward game featuring 10 towers
              arranged in 3 rows. The objective is to navigate through the tiles
              by choosing the correct tiles while avoiding the skull tile to win
              and claim your profit.
            </div>
            <h3>Gameplay:</h3>
            <div className="text">
              1. Place Your Bet: Start by placing your desired bet amount.
            </div>
            <div className="text">
              2. Select a Tile: Choose one of the tiles on the tower to reveal
              whether it's a coin or a skull. You can click or tap on a tile to
              make your selection.
            </div>
            <div className="text">
              3. Guessing Correctly: If you select a tile containing a coin,
              you'll progress to the next tile. Each successful guess allows you
              to move forward to the next tile.
            </div>
            <div className="text">
              4. Avoiding the Skull: If you click on a tile containing a skull,
              you lose the bet and will need to retry.
            </div>
            <div className="text">
              5. Cashout and Claim Your Profit: To win, you must cash out before
              stepping on a skull. You can claim your profit by cashing out at
              any point during the game.
            </div>
            <h3>Multipliers:</h3>
            <div className="text">
              Each correct tile guessed multiplies your bet by 0.5x.
            </div>
            <h3>Winning Strategy:</h3>
            <div className="text">
              The key to winning in Dragon Bonanza is to strategically navigate
              through the tiles, avoiding the skull, and cashing out at the
              right moment to claim your profits.
            </div>
            <h3>Note:</h3>
            <div className="text">
              Exercise caution while progressing through the tiles, as stepping
              on a skull results in losing the bet.
            </div>
          </div>
        </div>
      )}
      <div className="app-back">
        <div className="app-back-link">
          <img
            src={back}
            alt="back"
            onClick={() =>
              (window.location.href = "https://maverickhabesha.com/index.html")
            }
          />
          <p
            onClick={() =>
              (window.location.href = "https://maverickhabesha.com/index.html")
            }
          >
            Go back to homepage
          </p>
        </div>
        <div className="app-back-how-to">
          <div className="how-to-play" onClick={() => setHowTo(true)}>
            How to play?
          </div>
        </div>
      </div>

      <div className="app-wallet">
        <div className="app-wallet-info">
          <div className="app-wallet-info-value">{wallet}</div>
          <div className="app-wallet-info-text">BALANCE</div>
        </div>
      </div>
      <div className="app-game">
        <div className="app-input">
          <input
            type="text"
            placeholder="Amount"
            className="input"
            disabled={bet}
            onChange={(e) => setAmount(e.target.value)}
          />
          {bet && (
            <>
              <p>Total Profit(0.5x)</p>
              <div className="app-profit">
                 {parseInt(profit) !== 0
                  ? <p>{parseInt(profit) - amount}</p>
                  : <p>{parseInt(profit)}</p>} <p className="pro-color" id="pro">1/2</p><p className="pro-color">Max</p>
              </div>
            </>
          )}

          {bet ? (
            retry ? (
              <button onClick={handleRetry}>Retry</button>
            ) : (
              <button onClick={handleCashout}>cash out</button>
            )
          ) : (
            <button onClick={handleBet}>Bet</button>
          )}
        </div>
        <div className="app-game-display">
          <div className="app-game-display-logo">
            <img src={dragon} alt="" />
          </div>
          <div className="app-game-display-game">
            {game.map((egg, index) => (
              <GameLevel
                egg1={egg.egg1}
                egg2={egg.egg2}
                index={index}
                level={level}
                setLevel={setLevel}
                bet={bet}
                setBet={setBet}
                view={view}
                win={win}
                setWin={setWin}
                key={index}
                profit={profit}
                setProfit={setProfit}
                setView={setView}
                retry={retry}
                amount={amount}
                setRetry={setRetry}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
