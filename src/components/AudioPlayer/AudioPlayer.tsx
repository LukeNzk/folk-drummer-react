import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import PlayButton from './PlayButton';
import { AudioUtilsContext } from 'common/AudioUtils';
import AudioTrackPlayer from 'common/AudioTrackPlayer';
import { isUndefined } from 'util';
import { RootState } from 'state'; // eslint-disable-line no-unused-vars
import { DrumSettingsState } from 'state/types'; // eslint-disable-line no-unused-vars

let player: AudioTrackPlayer;

const updatePlayer = (settings: DrumSettingsState) => {
  const gen = player.generator;
  gen.bpm = settings.tempo;
}

type Props = ReturnType<typeof mapState>

function AudioPlayer(props: Props) {
  const { settings } = props;
  const [ isPlaying, togglePlaying ] = useState(false);
  const audioUtils = useContext(AudioUtilsContext);

  player && updatePlayer(settings);

  const handleTogglePlaying = () => {
    if (isUndefined(player)) {
      player = new AudioTrackPlayer(audioUtils);

    }

    if (!isPlaying) {
      player.start();
    }
    else {
      player.stop();
    }

    togglePlaying(!isPlaying);
  };

  return (
    <PlayButton isPlaying={isPlaying} onClick={handleTogglePlaying} />
  );
}

const mapState = (state: RootState) => {
  return { settings: state.drumSettings };
}

export default connect(mapState)(AudioPlayer);
