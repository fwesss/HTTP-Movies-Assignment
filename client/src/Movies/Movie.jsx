import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const Movie = ({
  match: {
    params: { id },
  },
  savedList,
  addToSavedList,
}) => {
  const [movie, setMovie] = useState(null);

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
    </div>
  ) : (
    <div>Loading movie information...</div>
  );
};

export default Movie;
