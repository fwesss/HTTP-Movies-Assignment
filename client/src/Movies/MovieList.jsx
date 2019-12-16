import React, { Component } from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import MovieCard from './MovieCard';

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/movies')
      .then((res) => this.setState({ movies: res.data }))
      .catch((err) => console.log(err.response));
  }

  render() {
    const { movies } = this.state;
    return (
      <>
        <Link as={NavLink} to="/add-movie">
          Add Movie
        </Link>
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieDetails key={movie.id} movie={movie} />
          ))}
        </div>
      </>
    );
  }
}

function MovieDetails({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
  );
}
