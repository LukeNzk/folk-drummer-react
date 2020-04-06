import React, { useState, useContext } from 'react';
import PlayButton from './PlayButton';
import { AudioUtilsContext } from 'common/AudioUtils';
import AudioTrackPlayer from 'common/AudioTrackPlayer';
import { isUndefined } from 'util';

let player: AudioTrackPlayer;

function AudioPlayer() {
  const [ isPlaying, togglePlaying ] = useState(false);
  const audioUtils = useContext(AudioUtilsContext);


  const handleTogglePlaying = () => {
    if (isUndefined(player)) {
      player = new AudioTrackPlayer(audioUtils);
      console.log("Player created");
    }

    if (isPlaying) {
      player.stop();
    }
    else {
      player.start();
    }

    togglePlaying(!isPlaying);
  };

  return (
    <PlayButton isPlaying={isPlaying} onClick={handleTogglePlaying} />
  );
}

export default AudioPlayer;
