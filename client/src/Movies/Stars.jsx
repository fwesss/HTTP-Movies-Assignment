import React from 'react';
import { FormControl, Input } from '@chakra-ui/core';

const Stars = ({ movie, movie: { stars }, setMovie }) => {
  const handleChange = (event) => {
    console.log(movie);
    const updatedStars = [...stars];
    updatedStars[event.target.name] = event.target.value;

    setMovie({ ...movie, stars: updatedStars });
  };

  return stars ? (
    stars.map((star) => (
      <FormControl key={stars.indexOf(star)} isRequired>
        <Input
          id={stars.indexOf(star)}
          type="text"
          name={stars.indexOf(star)}
          value={star}
          onChange={handleChange}
          autoComplete="on"
        />
      </FormControl>
    ))
  ) : (
    <p>Nothing here</p>
  );
};

export default Stars;
