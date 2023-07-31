import { useState } from 'react';
import Popup from './Popup';

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
    props.onScoreChangeRequest(props.amount);
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
        <input className={_props.className} type="text" name="name" maxLength="12" defaultValue={_props.children} />
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
    // <>
      <TrackerContainer>
        <button className="score btn" onClick={updateScore}>
          {props.children}
        </button>
        <PlayerNameComponent className="player-name" onClick={() => setIsEditable(true)}>
          {props.player}
        </PlayerNameComponent>
      </TrackerContainer>
    //   <Popup resultelementid={"popup__result-" + props.index}
    //          tag={"player-" + props.index}
    //          divclass="score__update">
    //     <span>Score</span>
    //     <input id={"popup__result-" + props.index}
    //            type="text"
    //            pattern="\d*"
    //            maxLength="6"
    //            placeholder="0" />
    // </Popup>
    // </>
  );
}

const initialState = [];

function App() {
  const [players, setPlayers] = useState(initialState);
  const [popupPlayerIndex, setPopupPlayerIndex] = useState(-1);

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
/*                {onScoreChange={amount => setPlayers(players => {
                    players[index].score += amount;
                    return players.slice();
                  })}} */
                  onScoreChangeRequest={() => {
                    setPopupPlayerIndex(index);
                  }}
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

      <Popup
        width={250}
        isopen={popupPlayerIndex !== -1}
        oncloserequest={() => setPopupPlayerIndex(-1)}
        onconfirm={value => {
          const amount = isNaN(Number(value))
            ? 0
            : Number(value);

          setPlayers(players => {
            players[popupPlayerIndex].score += amount;
            return players.slice();
          })
        }}
      >
        Ed ecco il testo da mostrare...
      </Popup>
    </div>
  );
}

export default App;
