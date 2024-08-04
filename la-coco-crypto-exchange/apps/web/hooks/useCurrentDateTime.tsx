import { useEffect, useState } from 'react';

interface DateTime {
  date: string;
  time: string;
}

const useCurrentDateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState<DateTime>({
    date: '',
    time: '',
  });

  useEffect(() => {
    const setTime = () => {
      const date = new Date();
      setCurrentDateTime({
        date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
        time: `${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`,
      });
    };
    const intervalId = setInterval(() => setTime, 60000);
    setTime();
  
    return () => clearInterval(intervalId);
  }, []);

  return currentDateTime;
};

export default useCurrentDateTime;
