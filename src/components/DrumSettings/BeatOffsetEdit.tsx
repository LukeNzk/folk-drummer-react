import React from 'react';

import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

interface Props {
  onChange: (val: number) => void;
  onCommit: (val: number) => void;
  value: number;
}

function BeatOffsetEdit(props: Props) {
  const { value, onChange, onCommit } = props;

  const handleValueChange = (val: number | number[]) => {
    if (typeof val === 'number') {
      const clamped = Math.min(1, Math.max(-1, val / 100));
      onChange(clamped);
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
  };

  return (
    <React.Fragment>
      <Typography variant="h5">Second beat offset</Typography>
      <Grid container spacing={2}>
        <Grid item xs>
          <Slider
            value={value}
            step={1}
            min={-100}
            max={100}
            onChange={(e, val) => handleValueChange(val)}
            onChangeCommitted={(e, val) => handleCommit(val)}
          />
        </Grid>
        <Grid item>
          <Typography>{value.toFixed()} %</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default BeatOffsetEdit;
