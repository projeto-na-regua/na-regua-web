import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import image from '../../utils/assets/federico-tonini-tdDPj4Jpwu4-unsplash.jpg'

export default function MultiActionAreaCard() {
  return (
    <Card sx={{ backgroundColor: 'red', height: 200 }}>
      <CardActionArea style={{
        backgroundColor: 'blue',
      }}>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="green iguana"
        />
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
