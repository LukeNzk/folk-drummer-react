import React, { useState } from 'react';
import PlayButton from './PlayButton';

function AudioPlayer() {
  const [ isPlaying, togglePlaying ] = useState(false);

  return (
    <PlayButton isPlaying={isPlaying} onClick={() => togglePlaying(!isPlaying)} />
  );
}

export default AudioPlayer;
