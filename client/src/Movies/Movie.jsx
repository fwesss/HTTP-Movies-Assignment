import React, { useEffect, useState } from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@chakra-ui/core';
import MovieCard from './MovieCard';

const Movie = ({ savedList, addToSavedList, setMovieToUpdate }) => {
  const [movie, setMovie] = useState(null);
  const {
    params: { id },
  } = useRouteMatch('/movies/:id');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  }, [id]);

  const saveMovie = () => {
    addToSavedList(movie);
  };

  return movie ? (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <div
        role="button"
        tabIndex={0}
        className="save-button"
        onKeyPress={() =>
          !savedList.some((savedMovie) => savedMovie.id === movie.id) &&
          saveMovie()
        }
        onClick={() =>
          !savedList.some((savedMovie) => savedMovie.id === movie.id) &&
          saveMovie()
        }
      >
        Save
      </div>
      <Button onClick={() => setMovieToUpdate(movie)}>
        <NavLink to={`/update-movie/${id}`}>Update Movie</NavLink>
      </Button>
    </div>
  ) : (
    <div>Loading movie information...</div>
  );
};

export default Movie;
