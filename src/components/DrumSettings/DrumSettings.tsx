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
  updateTempo
} from 'state';

import TempoEdit from './TempoEdit';
import PhraseLengthEdit from './PhraseLengthEdit';

import Typography from '@material-ui/core/Typography';

const mapState = (state: RootState) => ({
  settings: state.drumSettings
});

const mapDispatch = (dispatch: Dispatch) => bindActionCreators({ updateTempo }, dispatch);

const connector = connect(mapState, mapDispatch);
type Props = ConnectedProps<typeof connector>;

function DrumSettings(props: Props) {
  const [ phraseLength, setPhraseLength ] = useState(1);
  const tempo = props.settings.tempo;

  const handleTempoChange = (val: number) => {
    props.updateTempo(val);
  };

  return (
    <React.Fragment>
      <Typography>Settings</Typography>
      <TempoEdit value={tempo} onChange={e => handleTempoChange(e)}/>
      <PhraseLengthEdit value={phraseLength} onChange={e => setPhraseLength(e)} />
    </React.Fragment>
  );
}

export default connector(DrumSettings);

export { DrumSettings };
