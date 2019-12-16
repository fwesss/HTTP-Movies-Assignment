import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import { ButtonGroup, Button, Link } from '@chakra-ui/core';
import MovieCard from './MovieCard';

const Movie = ({
  savedList,
  addToSavedList,
  setMovieToUpdate,
  deleteFromSavedList,
}) => {
  const history = useHistory();
  const [movie, setMovie] = useState(null);
  const {
    params: { id },
  } = useRouteMatch('/movies/:id');
  const [deleteMovie, setDeleteMovie] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  }, [id]);

  useEffect(() => {
    if (deleteMovie) {
      axios
        .delete(`http://localhost:5000/api/movies/${id}`)
        .then(() => {
          deleteFromSavedList(id);
          history.push('/movies');
        })
        .catch((error) => error);
    }
  }, [deleteFromSavedList, deleteMovie, history, id]);

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
      <ButtonGroup>
        <Button variantColor="red" onClick={() => setDeleteMovie(true)}>
          Delete
        </Button>
        <Button role="link" onClick={() => setMovieToUpdate(movie)}>
          <Link as={NavLink} to={`/update-movie/${id}`}>
            Update Movie
          </Link>
        </Button>
      </ButtonGroup>
    </div>
  ) : (
    <div>Loading movie information...</div>
  );
};

export default Movie;
