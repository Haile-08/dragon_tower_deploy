import React, { useEffect, useState } from "react";
import "./App.css";
import coin from "./assets/coin.png";
import skull from "./assets/skul.png";

function Box({
  egg1,
  egg2,
  index,
  level,
  setLevel,
  bet,
  setBet,
  view,
  boxidx,
  win,
  setWin,
  profit,
  setProfit,
  amount,
  setView,
  setRetry,
  retry,
}) {
  const [boxnum, setBoxNum] = useState(null);
  useEffect(() => {
    setBoxNum(null);
  }, [bet]);

  function handleClick() {
    setBoxNum(boxidx);
    setLevel(level - 1);
    if (level === 0) {
      console.log("won");
    }
    setProfit(profit + amount * 0.5);
  }

  function handleLoss() {
    if (retry) {
      setLevel(9);
    } else {
      setView(true);
    }
    setRetry(true);
    setProfit(0);
  }

  let box;
  if (!win) {
    if (level === index && bet) {
      box = <div className="box-green" onClick={() => handleClick()}></div>;
    } else if (level === index) {
      box = <div className="box-green"></div>;
    } else if (boxnum === egg1 || boxnum === egg2) {
      box = (
        <div className="box-egg">
          <img src={coin} alt="coin" />
        </div>
      );
    } else if (boxnum !== egg1 && boxnum !== egg2 && boxnum !== null) {
      handleLoss();
    } else {
      box = <div className="box-closed"></div>;
    }
  }
  if (view) {
    if (boxidx !== egg1 && boxidx !== egg2) {
      box = <div className="transparent-empty-box"></div>;
    }
    if (boxidx === egg1 || boxidx === egg2) {
      box = (
        <div className="transparent-coin-box">
          <img src={coin} alt="coin" />
        </div>
      );
    }
    if (boxnum !== egg1 && boxnum !== egg2 && boxnum !== null) {
      box = (
        <div className="box-skull">
          <img src={skull} alt="skull" />
        </div>
      );
      handleLoss();
    }
  }

  return <div className="box">{box}</div>;
}

export default Box;
