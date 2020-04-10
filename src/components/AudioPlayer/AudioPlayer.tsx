import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import PlayButton from './PlayButton';
import { AudioUtilsContext } from 'common/AudioUtils';
import AudioTrackPlayer from 'common/AudioTrackPlayer';
import { isUndefined } from 'util';
import { RootState } from 'state'; // eslint-disable-line no-unused-vars
import { DrumSettingsState } from 'state/types'; // eslint-disable-line no-unused-vars
import Timeline from './Timeline';
import Grid from '@material-ui/core/Grid';
import BeatInfo from 'common/AudioTrackGenerator/BeatInfo'; // eslint-disable-line no-unused-vars


let player: AudioTrackPlayer;

const updatePlayer = (settings: DrumSettingsState) => {
  const gen = player.generator;
  gen.bpm = settings.tempo;
}

type Props = ReturnType<typeof mapState>

function AudioPlayer(props: Props) {
  const { settings } = props;
  const [ isPlaying, togglePlaying ] = useState(false);
  const [ beatIndex, setBeatIndex ] = useState(-1);

  const audioUtils = useContext(AudioUtilsContext);

  player && updatePlayer(settings);
  const onBeatChanged = (beat: BeatInfo) => {
    setBeatIndex(beat.index);
  }

  const handleTogglePlaying = () => {
    if (isUndefined(player)) {
      player = new AudioTrackPlayer(audioUtils, onBeatChanged);
      player.setBeatOffset(1, -0.2);
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
    <Grid container justify="center">
      <Grid item xs={12}>
        <Timeline beatCount={3} currentBeat={beatIndex}/>
      </Grid>
      <Grid style={{ textAlign: "center"}} item xs>
        <PlayButton isPlaying={isPlaying} onClick={handleTogglePlaying} />
      </Grid>
    </Grid>
  );
}

const mapState = (state: RootState) => {
  return { settings: state.drumSettings };
}

export default connect(mapState)(AudioPlayer);
