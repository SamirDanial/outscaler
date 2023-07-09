import React from 'react';

interface NotificationProps {
  newMovie: {
    name: string;
    director: string;
    mainCharecter: string;
  };
}

const Notification: React.FC<NotificationProps> = ({ newMovie }) => {

  return (
    <div className=" fixed notification bg-green-100 right-10 top-[60px] border border-gray-300 rounded p-4 mb-4">
      <h4 className="text-xl font-bold mb-2">New Movie Added:</h4>
      <p>
        <span className="font-bold">Name:</span> {newMovie.name}
      </p>
      <p>
        <span className="font-bold">Director:</span> {newMovie.director}
      </p>
      <p>
        <span className="font-bold">Main Character:</span> {newMovie.mainCharecter}
      </p>
    </div>
  );
};

export default Notification;
