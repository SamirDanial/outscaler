import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MovieForm: React.FC = () => {
  const [name, setName] = useState('');
  const [director, setDirector] = useState('');
  const [mainCharacter, setMainCharacter] = useState('');

  const navigate = useNavigate()

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDirectorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDirector(e.target.value);
  };

  const handleMainCharacterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMainCharacter(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/movies/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, director, mainCharecter: mainCharacter }),
      });

      if (response.ok) {
        console.log('Movie created successfully');
        navigate('/')
      } else {
        console.error('Failed to create movie');
      }
    } catch (error) {
      console.error('Network error', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <form onSubmit={handleSubmit} className="w-64 mt-36">
        <h2 className="text-2xl font-bold mb-4">Create Movie From</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            required
            onChange={handleNameChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="director" className="block mb-2">
            Director
          </label>
          <input
            type="text"
            id="director"
            value={director}
            required
            onChange={handleDirectorChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mainCharacter" className="block mb-2">
            Main Character
          </label>
          <input
            type="text"
            id="mainCharacter"
            value={mainCharacter}
            required
            onChange={handleMainCharacterChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
