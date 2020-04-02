import React from 'react';

import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

interface Props {
  onChange: (val: number) => void;
  value: number;
}

function PhraseLengthEdit(props: Props) {
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
      <Typography variant="h5">Phrase lenght</Typography>
      <Grid container spacing={2}>
        <Grid item xs>
          <Slider
            valueLabelDisplay="auto"
            value={value}
            min={1}
            max={12}
            marks
            onChange={(e, val) => handleValueChange(val)}
          />
        </Grid>
        <Grid item>
          <Typography>{value}</Typography>
        </Grid>
      </Grid>

    </React.Fragment>
  );
}

export default PhraseLengthEdit;
