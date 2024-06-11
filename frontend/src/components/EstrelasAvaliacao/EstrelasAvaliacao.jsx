import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function EstrelasAvaliacao({ value }) {
  const [rating, setRating] = React.useState(value);

  const handleChange = (event) => {
    setRating(event.target.value);
  };

  return (
    <Stack spacing={1}>
      <Rating name="half-rating-read" value={rating} precision={0.5} onChange={handleChange} readOnly />
    </Stack>
  );
}
