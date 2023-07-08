import { useQuery } from 'react-query';

const fetchData = async () => {
  const response = await fetch('/api/movies');
  const data = await response.json();
  return data;
};

const MoviesList = () => {
  const { data, isLoading, error } = useQuery('movies', fetchData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Movies</h2>
      <ul>
        {data.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesList;
