import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/core';
import { useRouteMatch, useHistory } from 'react-router-dom';
import Stars from './Stars';

const MovieForm = ({ movieToUpdate, setMovieToUpdate }) => {
  const history = useHistory();
  const {
    params: { id },
  } = useRouteMatch('/update-movie/:id');
  const [movie, setMovie] = useState(movieToUpdate || null);
  const [submit, setSubmit] = useState(false);

  const handleChange = (event) => {
    setMovie({
      ...movie,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (submit) {
      if (movieToUpdate) {
        axios
          .put(`http://localhost:5000/api/movies/${id}`, movie)
          .then(() => {
            setMovieToUpdate(null);
            history.push('/movies');
          })
          .catch((error) => error);
      } else {
        axios
          .post('http://localhost:5000/api/movies/', movie)
          .then((response) => response)
          .catch((error) => error);
      }
    }
  }, [history, id, movie, movieToUpdate, setMovieToUpdate, submit]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmit(true);
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <FormControl isRequired>
        <FormLabel htmlFor="name">Title</FormLabel>
        <Input
          id="title"
          type="text"
          name="title"
          value={movie.title}
          onChange={handleChange}
          autoComplete="on"
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="age">Director</FormLabel>
        <Input
          id="director"
          type="text"
          name="director"
          value={movie.director}
          onChange={handleChange}
          autoComplete="on"
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="email">Metascore</FormLabel>
        <Input
          id="metascore"
          type="number"
          name="metascore"
          value={movie.metascore}
          onChange={handleChange}
          autoComplete="on"
        />
      </FormControl>

      <h2>Stars</h2>
      <Stars movie={movie} setMovie={setMovie} />

      <Button type="submit" variantColor="blue" mr={3}>
        Submit
      </Button>
    </Box>
  );
};

export default MovieForm;
