import React from "react";
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';


function Images() {

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Paper
          sx={{
            height: 400,
            position: 'relative',
            backgroundColor: 'grey.800',
            color: '#fff',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(https://source.unsplash.com/random?wallpapers)`,
          }}
        >
          {/* Increase the priority of the hero background image */}
          {/* {<img src='https://source.unsplash.com/random?wallpapers' alt='main image description' />} */}
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default Images;