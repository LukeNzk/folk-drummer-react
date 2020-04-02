import React from 'react'

import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

interface TempoEditProps {
  onChange: (val: number) => void;
  value: number;
}

const TempoEdit = (props : TempoEditProps) => {
  const { value, onChange } = props;

  const handleValueChange = (val: number | number[]) => {
    if (typeof val === 'number') {
      onChange(val);
    }
    else {
      throw new Error("Multi-slider is not supported.");
    }
  }

  return (
    <React.Fragment>
      <Typography variant="h5">Tempo</Typography>
      <Grid container spacing={2}>
        <Grid item xs>
          <Slider
            value={value}
            min={10}
            max={260}
            onChange={(e, val) => handleValueChange(val)}
          />
        </Grid>
        <Grid item>
          <Typography>{value} bpm</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default TempoEdit;
