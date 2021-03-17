import React from "react";

const LibrarySong = ({
  song,
  setcurrentSong,
  audioRef,
  isPlaying,
  id,
  songs,
  setSongs,
}) => {
  const changeCurrentSonfHandler = async () => {
    await setcurrentSong(song);

    //add active state
    const newArrayOfSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newArrayOfSongs);
    if (isPlaying) audioRef.current.play();
  };
  return (
    <div
      onClick={changeCurrentSonfHandler}
      className={`librarysong-container ${song.active ? "selected" : ""}`}
    >
      <img alt={song.name} src={song.cover}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
