import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import headerImage from 'assets/bebenek_2.jpg';
interface Props {
  text: string
}

function Header(props: Props) {
  const { text } = props;

  return (
    <React.Fragment>
      <Typography variant="h4">{text}</Typography>
      <img src={headerImage} width="396" alt="raszewski.org"/>
      <Typography variant="body2">The recorded instrument was made by Mateusz Raszewski. You can order one at <Link href="raszewski.org">raszewski.org</Link> </Typography>
    </React.Fragment>
  );
}

export default Header;
