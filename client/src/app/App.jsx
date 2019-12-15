import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { ThemeProvider } from '@chakra-ui/core';
import SavedList from '../Movies/SavedList';
import MovieList from '../Movies/MovieList';
import Movie from '../Movies/Movie';
import MovieForm from '../Movies/MovieForm';
import theme from './theme';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [moveToUpdate, setMovieToUpdate] = useState(null);

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  return (
    <ThemeProvider theme={theme}>
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
            />
          );
        }}
      />
      <Route
        path="/update-movie/:id"
        render={() => {
          return (
            <MovieForm
              movieToUpdate={moveToUpdate}
              setMovieToUpdate={setMovieToUpdate}
            />
          );
        }}
      />
    </ThemeProvider>
  );
};

export default App;
