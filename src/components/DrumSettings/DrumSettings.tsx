import React from 'react';

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
  updateTempo, updateBeatOffset, updateTempoOscilation,
  commitTempo, commitBeatOffset, commitTempoOscilation,
} from 'state';

import TempoEdit from './TempoEdit';
import BeatOffsetEdit from './BeatOffsetEdit';
import TempoOscilationEdit from './TempoOscilationEdit';

const mapState = (state: RootState) => ({
  settings: state.drumSettings
});

const mapDispatch = (dispatch: Dispatch) => bindActionCreators({
  updateTempo,
  updateBeatOffset,
  updateTempoOscilation,
  commitTempo,
  commitBeatOffset,
  commitTempoOscilation
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

  const handleTempoCommit = (val: number) => {
    props.commitTempo(val);
  }

  const handleBeatOffsetCommit = (val: number) => {
    props.commitBeatOffset(val);
  }

  const handleTempoOscilationCommit = (val: number) => {
    props.commitTempoOscilation(val);
  }


  return (
    <React.Fragment>
      <TempoEdit value={tempo} onChange={handleTempoChange} onCommit={handleTempoCommit}/>
      <BeatOffsetEdit value={100 * beatOffset} onChange={handleBeatOffsetChange} onCommit={handleBeatOffsetCommit}/>
      <TempoOscilationEdit value={tempoOscilation} onChange={handleTempoOscilationChange} onCommit={handleTempoOscilationCommit}/>
    </React.Fragment>
  );
}

export default connector(DrumSettings);

export { DrumSettings };
