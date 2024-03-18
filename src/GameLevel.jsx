import React from "react";
import "./App.css";
import Box from "./Box";

function GameLevel({
  egg1,
  egg2,
  index,
  level,
  setLevel,
  bet,
  setBet,
  view,
  win,
  setWin,
  profit,
  setProfit,
  setView,
  amount,
  retry,
  setRetry,
}) {
  return (
    <div className="level">
      <Box
        egg1={egg1}
        egg2={egg2}
        index={index}
        level={level}
        setLevel={setLevel}
        bet={bet}
        setBet={setBet}
        view={view}
        boxidx={1}
        win={win}
        setWin={setWin}
        profit={profit}
        setProfit={setProfit}
        setView={setView}
        retry={retry}
        amount={amount}
        setRetry={setRetry}
      />
      <Box
        egg1={egg1}
        egg2={egg2}
        index={index}
        level={level}
        setLevel={setLevel}
        bet={bet}
        setBet={setBet}
        view={view}
        boxidx={2}
        win={win}
        setWin={setWin}
        profit={profit}
        setProfit={setProfit}
        setView={setView}
        retry={retry}
        amount={amount}
        setRetry={setRetry}
      />
      <Box
        egg1={egg1}
        egg2={egg2}
        index={index}
        level={level}
        setLevel={setLevel}
        bet={bet}
        setBet={setBet}
        view={view}
        boxidx={2}
        win={win}
        setWin={setWin}
        profit={profit}
        setProfit={setProfit}
        setView={setView}
        retry={retry}
        amount={amount}
        setRetry={setRetry}
      />
    </div>
  );
}

export default GameLevel;
