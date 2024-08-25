import React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function EstrelasAvaliacao({ value }) {
  // O estado 'rating' é removido porque não é necessário
  // Uma vez que você está apenas exibindo a avaliação e não a alterando

  return (
    <Stack spacing={1}>
      <Rating name="half-rating-read" value={value} precision={0.5} readOnly />
    </Stack>
  );
}
