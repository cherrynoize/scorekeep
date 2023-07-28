import { useState } from 'react';
import Popup, { queryPopup } from './popup';

const MAX_SCORE = (10 ** 6) - 1;

function TrackerContainer(props) {
  return (
    <div className="tracker-container">
      {props.children}
    </div>
  );
}

function PlayerTracker(props) {
  const [isEditable, setIsEditable] = useState(false);

  function updateScore() {
    const reply = Number(queryPopup("player-" + props.index));

    const amount = isNaN(reply)
      ? 0
      : reply;

    props.onScoreChange(amount);
  }

  const PlayerNameComponent = isEditable === false
    ? (_props) => <span {..._props} />
    : (_props) => (
      <form className="player-name-container"
            onSubmit={event => {
              const name = event.target.elements.name.value;
              props.onNameChange(name);
              setIsEditable(false);
            }}>
        <input className={_props.className} type="text" name="name" maxlength="12" defaultValue={_props.children} />
        <button className="delete-player btn"
                type="button"
                onClick={() => {
                  props.onPlayerDelete();
                  setIsEditable(false);
                }}>
          x
        </button>
      </form>
    )

  return (
    <>
      <TrackerContainer>
        <button className="score btn" onClick={updateScore}>
          {props.children}
        </button>
        <PlayerNameComponent className="player-name" onClick={() => setIsEditable(true)}>
          {props.player}
        </PlayerNameComponent>
      </TrackerContainer>
      <Popup resultElementId={"popup__result-" + props.index}
             tag={"player-" + props.index}
             divClass="score__update">
        <span>Score</span>
        <input id={"popup__result-" + props.index}
               type="text"
               pattern="\d*"
               maxlength="6"
               placeholder="0" />
    </Popup>
    </>
  );
}

const initialState = [];

function App() {
  const [players, setPlayers] = useState(initialState);

  return (
    <div className="App">
      <header>
        <button
          className="add-player btn"
          onClick={() => setPlayers(players => [...players, { name: "Player #" + players.length, score: 0 }])}
        >
          +
        </button>
      </header>
      <main>
        {
          players.length ? (
            <div className="scoreboard">
              {players.map((player, index) => (
                <PlayerTracker
                  key={index}
                  index={index}
                  player={player.name}
                  onNameChange={name => setPlayers(players => {
                    players[index].name = name;
                    return players.slice();
                  })}
                  onScoreChange={amount => setPlayers(players => {
                    players[index].score += amount;
                    return players.slice();
                  })}
                  onPlayerDelete={() => setPlayers(players => {
                    players.splice(index,1);
                    return players.slice();
                  })}
                >
                {
                  player.score > MAX_SCORE
                    ? '∞'
                    : player.score
                }
                </PlayerTracker>
              ))}
            </div>
          ) : ''
        }
      </main>
    </div>
  );
}

export default App;
