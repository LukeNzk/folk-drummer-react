import React, { Component } from 'react'

import TempoEdit from './TempoEdit';
import PhraseLengthEdit from './PhraseLengthEdit';

import Typography from '@material-ui/core/Typography';

class DrumSettings extends Component<{}, {
  tempo: number;
  phraseLength: number;
}> {
  constructor(props: any) {
    super(props);
    this.state = {
      tempo: 120,
      phraseLength: 1
    };
  }

  render() {
    const { tempo, phraseLength } = this.state;

    return (
      <React.Fragment>
        <Typography>Settings</Typography>
        <TempoEdit value={tempo} onChange={e => this.setState({ tempo: e })}/>
        <PhraseLengthEdit value={phraseLength} onChange={e => this.setState({ phraseLength: e })} />
      </React.Fragment>
    );
  }
}

export default DrumSettings;
