import React, { useState, useContext, useCallback, useMemo, useEffect } from 'react';
import { connect,
  ConnectedProps // eslint-disable-line no-unused-vars  
 } from 'react-redux';

import { 
  Dispatch, // eslint-disable-line no-unused-vars  
  bindActionCreators 
} from 'redux';

import { togglePlayback } from 'state'
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
  gen.setOffset(1, settings.beatOffset);
  player.setTempoOscilation(settings.tempoOscilation);
}

const mapState = (state: RootState) => {
  return { settings: state.drumSettings };
}

const mapDispatch = (dispatch: Dispatch) => bindActionCreators({
  togglePlayback
}, dispatch);

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>

function AudioPlayer(props: Props) {
  const { settings } = props;
  const [ isPlaying, togglePlaying ] = useState(false);
  const [ beatIndex, setBeatIndex ] = useState(-1);

  const audioUtils = useContext(AudioUtilsContext);

  const onBeatChanged = useCallback((beat: BeatInfo) => {
    setBeatIndex(beat.index);
  }, []);

  const onKeyDown = (e:  KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault();
      handleTogglePlaying();
    }
  }
  
  useEffect(() => { 
    document.body.addEventListener('keyup', onKeyDown, false);
    return () => document.body.removeEventListener('keyup', onKeyDown, false);
  });

  useMemo(() => {
    if (isUndefined(player)) {
      console.log("player init");
      player = new AudioTrackPlayer(audioUtils);
    }
  }, [audioUtils]);

  if (player) {
    player.setOnBeatChanged(onBeatChanged);
    updatePlayer(settings);
  }

  const handleTogglePlaying = () => {
    if (isUndefined(player)) {
      console.log("player init");
      player = new AudioTrackPlayer(audioUtils);
      player.setBeatOffset(1, -0.2);
    }

    if (!isPlaying) {
      player.start();
      togglePlaying(true);
      props.togglePlayback(true);
    }
    else {
      player.stop();
      togglePlaying(false);
      props.togglePlayback(false);
    }
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

export default connector(AudioPlayer);
