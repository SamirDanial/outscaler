import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import Header from './components/Header';
import LoginForm from './components/Login';
import MoviesList from './components/MovieList';
import CreateMovie from './components/CreateMovie';
import { useDispatch, useSelector } from 'react-redux';
import { newMovieAdded, clearNewMovieAdded } from './store/slices/notificationSlice'
import Notification from './components/NewVideoNotification';
import ErrorNotification from './components/ErrorNotification';

const App = () => {
  const [movies, setMovies] = useState<any>([]);
  const dispatch = useDispatch();
  const newMovie = useSelector((state: any) => state.notification.newMovie)
  const error = useSelector((state: any) => state.notification.error)

  useEffect(() => {
    const socket = io('http://localhost:5000'); // Replace with your server URL

    socket.on('connect', () => {
      console.log('Connected to socket server');
      console.log('Socket ID:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    socket.on('newMovie', (movie) => {
      console.log('New movie created:', movie);
      setMovies((prevMovies: any) => [...prevMovies, movie]);
      dispatch(newMovieAdded(movie))
      setTimeout(() => {
        dispatch(clearNewMovieAdded())
        return
      }, 5000)
    });

    return () => {
      socket.disconnect(); // Disconnect the socket when the component unmounts
    };
  }, []);

  return (
    <>
      <Header />
      {
        newMovie && <Notification newMovie={newMovie} />
      }
      {
        error && <ErrorNotification error={error} />
      }
      
      <Routes>
        <Route path="/" element={<MoviesList movies={movies} />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/createmovie" element={<CreateMovie />} />
      </Routes>
    </>
  );
};

export default App;
