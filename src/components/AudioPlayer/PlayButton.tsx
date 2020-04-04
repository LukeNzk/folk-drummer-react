import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  icon: {
    fontSize: "4rem"
  }  
});

interface Props {
  isPlaying?: boolean;
  onClick?: () => void;
}

function PlayButton(props: Props) {
  const { isPlaying, onClick } = props
  const classes = useStyles();

  const handleOnClick = () => {
    onClick && onClick();
  };

  return (
    <IconButton onClick={handleOnClick} className={classes.icon}>
      {isPlaying ? <PauseIcon fontSize="inherit"/> : <PlayArrowIcon fontSize="inherit"/> }
    </IconButton>  
  );
}

export default PlayButton;
