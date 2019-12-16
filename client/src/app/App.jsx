import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { ThemeProvider } from '@chakra-ui/core';
import SavedList from '../Movies/SavedList';
import MovieList from '../Movies/MovieList';
import Movie from '../Movies/Movie';
import MovieForm from '../Movies/MovieForm';
import customTheme from './theme';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [moveToUpdate, setMovieToUpdate] = useState(null);

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  const deleteFromSavedList = (id) => {
    setSavedList(savedList.filter((movie) => movie.id !== parseInt(id, 10)));
  };

  return (
    <ThemeProvider theme={customTheme}>
      <SavedList list={savedList} />
      <Route exact path={['/', '/movies']} component={MovieList} />
      <Route
        path="/movies/:id"
        render={() => {
          return (
            <Movie
              savedList={savedList}
              addToSavedList={addToSavedList}
              setMovieToUpdate={setMovieToUpdate}
              deleteFromSavedList={deleteFromSavedList}
            />
          );
        }}
      />
      <Route
        path="/update-movie/:id"
        render={({ match }) => {
          return (
            <MovieForm
              path="/update-movie/:id"
              match={match}
              movieToUpdate={moveToUpdate}
              setMovieToUpdate={setMovieToUpdate}
            />
          );
        }}
      />
      <Route path="/add-movie" component={MovieForm} />
    </ThemeProvider>
  );
};

export default App;
