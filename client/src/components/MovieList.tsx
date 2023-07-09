import { useQuery, useMutation } from 'react-query';
import MovieCard from './MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { addError, clearError } from '../store/slices/notificationSlice';

const fetchData = async () => {
  const response = await fetch('http://localhost:5000/movies');
  const data = await response.json();
  return data;
};

const deleteMovie = async (id: string, dispatch: any) => {
  try {
    const response = await fetch(`http://localhost:5000/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'x-auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 500) {
      const res = await response.json();
      dispatch(addError(res.msg));
      setTimeout(() => {
        dispatch(clearError())
        return
      }, 5000)
    }
  } catch (error) {
    dispatch(addError(error.message));
  }
};

const MoviesList = () => {
  const { data, isLoading, error, refetch } = useQuery<any, any, any>('movies', fetchData);
  const dispatch = useDispatch();
  const er = useSelector((state: any) => state.notification.error);

  const deleteMutation = useMutation((id: string) => deleteMovie(id, dispatch), {
    onSuccess: () => {
      refetch();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <div>
      {data.map((movie: any, index: number) => (
        <MovieCard key={index} movie={movie} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default MoviesList;
