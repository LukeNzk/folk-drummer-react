import React, { useState } from 'react';

import { 
  connect, 
  ConnectedProps // eslint-disable-line no-unused-vars
} from 'react-redux';
import { 
  Dispatch, // eslint-disable-line no-unused-vars  
  bindActionCreators 
} from 'redux';

import {
  RootState, // eslint-disable-line no-unused-vars
  updateTempo, updateBeatOffset, updateTempoOscilation
} from 'state';

import TempoEdit from './TempoEdit';
import PhraseLengthEdit from './PhraseLengthEdit';
import BeatOffsetEdit from './BeatOffsetEdit';
import TempoOscilationEdit from './TempoOscilationEdit';

import Typography from '@material-ui/core/Typography';

const mapState = (state: RootState) => ({
  settings: state.drumSettings
});

const mapDispatch = (dispatch: Dispatch) => bindActionCreators({
  updateTempo,
  updateBeatOffset,
  updateTempoOscilation
}, dispatch);

const connector = connect(mapState, mapDispatch);
type Props = ConnectedProps<typeof connector>;

function DrumSettings(props: Props) {
  const { tempo, beatOffset, tempoOscilation } = props.settings;

  const handleTempoChange = (val: number) => {
    props.updateTempo(val);
  };

  const handleBeatOffsetChange = (val: number) => {
    props.updateBeatOffset(val);
  }

  const handleTempoOscilationChange = (val: number) => {
    props.updateTempoOscilation(val);
  }

  return (
    <React.Fragment>
      <TempoEdit value={tempo} onChange={e => handleTempoChange(e)}/>
      <BeatOffsetEdit value={100 * beatOffset} onChange={handleBeatOffsetChange}/>
      <TempoOscilationEdit value={tempoOscilation} onChange={handleTempoOscilationChange}/>
    </React.Fragment>
  );
}

export default connector(DrumSettings);

export { DrumSettings };
