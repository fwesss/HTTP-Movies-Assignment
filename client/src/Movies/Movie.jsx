import React from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    this.fetchMovie(match.params.id);
  }

  // noinspection JSCheckFunctionSignatures
  componentDidUpdate(newProps) {
    const { match } = this.props;
    if (match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie(id) {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => this.setState({ movie: res.data }))
      .catch((err) => console.log(err.response));
  }

  saveMovie() {
    const { addToSavedList } = this.props;
    const { movie } = this.state;
    addToSavedList(movie);
  }

  render() {
    const { movie } = this.state;
    return movie ? (
      <div className="save-wrapper">
        <MovieCard movie={movie} />
        <div
          role="button"
          tabIndex={0}
          className="save-button"
          onKeyPress={this.saveMovie}
          onClick={this.saveMovie}
        >
          Save
        </div>
      </div>
    ) : (
      <div>Loading movie information...</div>
    );
  }
}
