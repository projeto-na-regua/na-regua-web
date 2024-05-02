import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import image from '../../utils/assets/federico-tonini-tdDPj4Jpwu4-unsplash.jpg'

export default function MultiActionAreaCard() {
  return (
    <Card sx={{ backgroundColor: '#E3A74F', height: 250, width: 400 }}>
      <CardActionArea style={{
        backgroundColor: 'blue',
      }}>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt="green iguana"
        />
      </CardActionArea>
      <CardActions style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Typography variant="h5">
          Dom Bigode
        </Typography>
        <Button>
          Visualizar barbearia
        </Button>
      </CardActions>
    </Card>
  );
}
