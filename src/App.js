import { useState, useEffect } from "react";
import { io } from "socket.io-client";

import "./App.css";
import Join from "./components/Join/Join";
import AdminView from "./components/AdminView/AdminView";
import PlayerView from "./components/PlayerView/PlayerView";

function App() {
  const socket = io("https://playsound-backend.herokuapp.com/");
  const [activePlayer, setActivePlayer] = useState(null);
  const [playersInRoom, setPlayersInRoom] = useState([]);

  useEffect(() => {
    socket.on("newPlayer", (players) => {
      setPlayersInRoom(players);
    });

    socket.on("newSound", (sound) => {
      const audio = new Audio(sound);
      audio.play();
    })
  }, []);

  return (
    <div className="App">
      {!activePlayer && (
        <Join
          socket={socket}
          setActivePlayer={setActivePlayer}
          playersInRoom={playersInRoom}
        />
      )}
      {activePlayer && activePlayer.isAdmin && (
        <AdminView
          playersInRoom={playersInRoom}
          socket={socket}
          activePlayer={activePlayer}
        />
      )}
      {activePlayer && !activePlayer.isAdmin && <PlayerView socket={socket} />}
    </div>
  );
}

export default App;
