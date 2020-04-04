import React, { useState, useContext } from 'react';
import PlayButton from './PlayButton';
import { AudioUtilsContext } from 'common/AudioUtils';

import click1 from 'assets/click1.wav';

function AudioPlayer() {
  const [ isPlaying, togglePlaying ] = useState(false);
  const audioUtils = useContext(AudioUtilsContext);
  const handleTogglePlaying = () => {
    audioUtils.loadClip(click1).then(clip => {
      clip.start();
    });
    togglePlaying(!isPlaying);
  };

  return (
    <PlayButton isPlaying={isPlaying} onClick={handleTogglePlaying} />
  );
}

export default AudioPlayer;
