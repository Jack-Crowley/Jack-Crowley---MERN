/* eslint-disable react/prop-types */
import republican from "./republican.png";
import democratic from "./democratic.png";
import american from "./american.png";

import "./App.css";
import { useState } from "react";


const PartyVoteBox = ({counter, setCounter, partyName, src}) => {
  return (
    <div className="party">
        <h2>{partyName}</h2>
        <div className="box blue">
          <img src={src} alt={partyName} className="party-image" />
          <br />
          <button className="vote-button" onClick={() => { setCounter(counter + 1) }}>Vote</button>
          <p className="vote-count">Vote Count: {counter}</p>
        </div>
      </div>
  )
}


const Ballot = ({ demo, setDemo, repub, setRepub, ind, setInd }) => {

  return (
    <div className="party-container">
      <PartyVoteBox counter={demo} setCounter={setDemo} partyName="Democrats" src={democratic}/>
      <PartyVoteBox counter={repub} setCounter={setRepub} partyName="Republicans" src={republican}/>
      <PartyVoteBox counter={ind} setCounter={setInd} partyName="Independents" src={american}/>
    </div>
  )
}

const ElectionResults = ({ demo, repub, ind }) => {
  const total = () => { return demo + repub + ind }

  return (
    <div className="vote-statistics">
      <h2>Election Results</h2>
      {total() != 0 ? (
        <div>
          <p>Total Votes: {total()}</p>
          <p>Democrats: {demo} ({Math.round(demo / total() * 10000) / 100}%)</p>
          <p>Republicans: {repub} ({Math.round(repub / total() * 10000) / 100}%)</p>
          <p>Independent: {ind} ({Math.round(ind / total() * 10000) / 100}%)</p>
        </div>
      ) : (
        <h4 className="no-votes">Currently, the system has not received any votes yet.</h4>
      )}

    </div>
  )
}

const App = () => {
  const [demo, setDemo] = useState(0)
  const [repub, setRepub] = useState(0)
  const [ind, setInd] = useState(0)


  return (
    <div>
      <Ballot demo={demo} setDemo={setDemo} repub={repub} setRepub={setRepub} ind={ind} setInd={setInd} />
      <ElectionResults demo={demo} repub={repub} ind={ind} />


    </div >

  );
};

export default App;
