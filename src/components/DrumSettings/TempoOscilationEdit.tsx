import React from 'react';

import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

interface Props {
  onChange: (val: number) => void;
  onCommit: (val: number) => void;
  value: number;
}

function TempoOscilationEdit(props: Props) {
  const { value, onChange, onCommit } = props;

  const handleValueChange = (val: number | number[]) => {
    if (typeof val === 'number') {
      onChange(val);
    }
    else {
      throw new Error("Multi-slider is not supported.");
    }
  }

  const handleCommit = (val: number | number[]) => {
    if (typeof val === 'number') {
      onCommit(val);
    }
    else {
      throw new Error("Multi-slider is not supported.");
    }
  }

  return (
    <React.Fragment>
      <Typography variant="h5">Tempo oscilation</Typography>
      <Grid container spacing={2}>
        <Grid item xs>
          <Slider
            value={value}
            min={0}
            max={10}
            step={0.1}
            onChange={(e, val) => handleValueChange(val)}
            onChangeCommitted={(e, val) => handleCommit(val)}
          />
        </Grid>
        <Grid item>
          <Typography>{value} bpm</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default TempoOscilationEdit;
