import axios from 'axios';

export const checkAuth = () => {
  const timer = setTimeout(() => {
    axios({ method: 'POST', url: 'http://localhost:8080/checkAuth' });
  }, 2000);
  return () => clearTimeout(timer);
};
