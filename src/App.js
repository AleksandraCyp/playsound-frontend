import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Sound from "react-sound";

import "./App.css";
import Join from "./components/Join/Join";
import AdminView from "./components/AdminView/AdminView";
import PlayerView from "./components/PlayerView/PlayerView";

import correct from "./dobra-odpowiedz.wav";
import wrong from "./zla-odpowiedz.wav";
import next from "./nastepna-runda.wav";
import fail from "./zegnaj-z-teleturnieju.wav";

function App() {
  const socket = io("https://playsound-backend.herokuapp.com/");
  const [activePlayer, setActivePlayer] = useState(null);
  const [playersInRoom, setPlayersInRoom] = useState([]);
  const [URL, setURL] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    socket.on("newPlayer", (players) => {
      setPlayersInRoom(players);
    });

    socket.on("newSound", (sound) => {
      if (sound === "dobra-odpowiedz.wav") setURL(correct);
      if (sound === "zla-odpowiedz.wav") setURL(wrong);
      if (sound === "nastepna-runda.wav") setURL(next);
      if (sound === "zegnaj-z-teleturnieju.wav") setURL(fail);
      setIsPlaying(true);
    });
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
      <Sound url={URL} playStatus={isPlaying && Sound.status.PLAYING} />
    </div>
  );
}

export default App;
