import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  beatActive: {
    fontWeight: 700
  },
  beatInactive: {
    fontWeight: 300
  }
});

interface Props {
  beatCount: number,
  currentBeat: number
}

interface BeatProps {
  index: number,
  activeIndex: number
}

function Beat(props: BeatProps) {
  const classes = useStyles();
  const { index, activeIndex } = props;

  return (
    <Typography 
      className={((index === activeIndex) ? classes.beatActive : classes.beatInactive)} 
      align="center" 
      variant="h2">
        {index + 1}
    </Typography>
  );
}

function Timeline(props: Props) {
  const { beatCount, currentBeat } = props

  const beatElements = [...Array(beatCount).keys()].map((key: number) => {
    return (
      <Grid key={"beats_timeline_" + key} item xs>
        <Beat index={key} activeIndex={currentBeat}/>
      </Grid>
    )
  });
  
  return (
    <Grid container>
      {beatElements}
    </Grid>
  )
}

export default Timeline;
