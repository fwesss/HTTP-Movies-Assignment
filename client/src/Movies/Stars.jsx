import React from 'react';
import { FormControl, Input } from '@chakra-ui/core';

const Stars = ({ movie, setMovie }) => {
  const handleChange = (event) => {
    const updatedStars = [...movie.stars];
    updatedStars[event.target.name] = event.target.value;

    setMovie({ ...movie, stars: updatedStars });
  };

  return movie.stars ? (
    movie.stars.map((star) => (
      <FormControl key={movie.stars.indexOf(star)} isRequired>
        <Input
          id={movie.stars.indexOf(star)}
          type="text"
          name={movie.stars.indexOf(star)}
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
