import React, { useState, useRef } from "react";
//adding components
import Song from "./components/Song";
import Player from "./components/Player";
import { faSnowboarding } from "@fortawesome/free-solid-svg-icons";
import "./styles/app.scss";
//Import Util
import data from "./data";
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
  //statecomponents
  const [songs, setSongs] = useState(data());
  const [currentSong, setcurrentSong] = useState(songs[2]);
  const [isPlaying, setisPlaying] = useState(false);

  //statefromplayer
  const [songInfo, setsongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentge: 0,
  });
  const [libraryStatus, setlibraryStatus] = useState(false);
  //event handler
  const updateTimeHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //calculate animationPercentge
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);

    setsongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animationPercentge: animation,
    });
  };
  //ref
  const audioRef = useRef(null);
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setcurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };
  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setlibraryStatus={setlibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        isPlaying={isPlaying}
        setisPlaying={setisPlaying}
        currentSong={currentSong}
        audioRef={audioRef}
        setsongInfo={setsongInfo}
        songInfo={songInfo}
        songs={songs}
        setcurrentSong={setcurrentSong}
        setSongs={setSongs}
      />
      <Library
        songs={songs}
        setcurrentSong={setcurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio
        onLoadedMetadata={updateTimeHandler}
        onTimeUpdate={updateTimeHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
