import React from 'react';
import Typography from '@material-ui/core/Typography';

interface Props {
  text: string
}

function Header(props: Props) {
  const { text } = props;

  return (
    <Typography variant="h4">{text}</Typography>
  );
}

export default Header;
