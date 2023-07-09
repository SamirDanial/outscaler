import React from 'react';
import { useSelector } from 'react-redux'

interface Movie {
    _id: string;
  name: string;
  director: string;
  mainCharecter: string;
}

interface MovieCardProps {
  movie: Movie;
  handleDelete: any;
}



const MovieCard: React.FC<MovieCardProps> = ({ movie, handleDelete }) => {

    const token = useSelector((state: any) => state.notification.token)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
      <h2 className="text-xl font-bold mb-2">{movie.name}</h2>
      <p>
        <span className="font-bold">Director:</span> {movie.director}
      </p>
      <p>
        <span className="font-bold">Main Character:</span> {movie.mainCharecter}
      </p>
      {
        token && <button type="button" onClick={() => handleDelete(movie._id)} className='bg-red-700 text-white px-4 py-2 rounded'>Delete</button>
      }
    </div>
  );
};

export default MovieCard;