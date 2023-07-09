import React from 'react';

interface ErrorNotificationProps {
  error: string;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({ error }) => {
  return (
    <div className=" fixed right-10 top-[60px] error-notification bg-red-500 text-white p-4 rounded">
      <p>{error}</p>
    </div>
  );
};

export default ErrorNotification;
