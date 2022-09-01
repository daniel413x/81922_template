import React, { useState, useEffect, useContext } from 'react';
import { Image } from 'react-bootstrap';
import { INotification } from '../types/types';
import Context from '../context/context';

function Notification({
  message,
  color,
  timeout,
  image,
  id,
}: INotification) {
  const { notifications } = useContext(Context);
  const [classes, setClasses] = useState<string>('');
  const close = () => {
    setClasses('');
    const timer = setTimeout(() => {
      notifications.removeNotification(id);
      setClasses('');
    }, 220);
    return () => clearTimeout(timer);
  };
  useEffect(() => {
    setClasses('show');
    const timer = setTimeout(() => close(), timeout);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className={`notification ${color} ${classes}`}>
      {image && (
      <Image
        roundedCircle
        src={`${process.env.REACT_APP_API_URL}${image}`}
      />
      )}
      <div className="body">
        {message}
      </div>
    </div>
  );
}

export default Notification;
