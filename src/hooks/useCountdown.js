import { useState, useEffect } from 'react';

export function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let birthday = new Date(currentYear, 2, 5); // March 5th (month is 0-indexed)
      
      // If birthday has passed this year, target next year
      if (now > birthday && now.getDate() !== 5) {
        birthday = new Date(currentYear + 1, 2, 5);
      }
      
      // Check if today is the birthday
      const isToday = now.getMonth() === 2 && now.getDate() === 5;
      setIsBirthday(isToday);
      
      if (isToday) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      
      const diff = birthday - now;
      
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return { timeLeft, isBirthday };
}

export default useCountdown;