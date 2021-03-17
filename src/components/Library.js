import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  setcurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus,
}) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            song={song}
            setcurrentSong={setcurrentSong}
            audioRef={audioRef}
            isPlaying={isPlaying}
            id={song.id}
            songs={songs}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
