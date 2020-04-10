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
  updateTempo, updateBeatOffset
} from 'state';

import TempoEdit from './TempoEdit';
import PhraseLengthEdit from './PhraseLengthEdit';
import BeatOffsetEdit from './BeatOffsetEdit';

import Typography from '@material-ui/core/Typography';

const mapState = (state: RootState) => ({
  settings: state.drumSettings
});

const mapDispatch = (dispatch: Dispatch) => bindActionCreators({
  updateTempo,
  updateBeatOffset,
}, dispatch);

const connector = connect(mapState, mapDispatch);
type Props = ConnectedProps<typeof connector>;

function DrumSettings(props: Props) {
  const [ phraseLength, setPhraseLength ] = useState(1);
  const { tempo, beatOffset } = props.settings;

  const handleTempoChange = (val: number) => {
    props.updateTempo(val);
  };

  const handleBeatOffsetChange = (val: number) => {
    props.updateBeatOffset(val);
  }

  return (
    <React.Fragment>
      <Typography>Settings</Typography>
      <TempoEdit value={tempo} onChange={e => handleTempoChange(e)}/>
      <BeatOffsetEdit value={100 * beatOffset} onChange={handleBeatOffsetChange}/>
      <PhraseLengthEdit value={phraseLength} onChange={e => setPhraseLength(e)} />
    </React.Fragment>
  );
}

export default connector(DrumSettings);

export { DrumSettings };
