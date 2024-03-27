import { useState, useEffect } from 'react';

const LiveTimeComponent = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className=' hidden md:block'>
        <span className=' px-4 border-x-2 border-primary'>{currentTime.toLocaleTimeString().split(':')[0]} Hours</span>
        <span className=' px-4 border-r-2 border-primary'>{currentTime.toLocaleTimeString().split(':')[1]} Minutes</span>
        <span className=' px-4 border-r-2 border-primary'>{currentTime.toLocaleTimeString().split(':')[2]} </span>
    </div>
  );
};

export default LiveTimeComponent;
