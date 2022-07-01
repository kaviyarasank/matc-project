import axios from 'axios';
import PrivateRouter from './Components/Routes/privateRoute';
import PublicRouter from './Components/Routes/publicRoute';
import { getLocalStorageValuesBoolean } from './Helper/localStore';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const localValues = getLocalStorageValuesBoolean();

  const notify = () =>
    toast.error('INCOMING TOKEN EXPIRED', {
      className: 'toast-error'
    });
  const notifySuccess = () =>
    toast.error('API EXCESSED OUT OF LIMIT', {
      className: 'toast-error'
    });

  const navigate = useNavigate();
  const logout = () => {
    navigate('/');
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    notify();
  };

  const logoutSuccess = () => {
    navigate('/');
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    notifySuccess();
  };

  
  axios.interceptors.request.use(
    (config: any) => {
      let userData = JSON.parse(localStorage.getItem('token') || '{}');
      config.headers['X-access-token'] = `${userData?.Token}`;
      return config;
    },
    function (error: any) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response: any) => {
      console.log('responsemmm', response);

      axios({
        method: 'POST',
        url: 'http://localhost:3002/checkAuth'
      });
      if (response?.data?.statusCode === 403) {
        logoutSuccess();
      }
      return response;
    },
    function (error) {
      console.log('error', error);

      if (error?.code === 'ERR_BAD_REQUEST') {
        logout();
      }
      return Promise.reject(error);
    }
  );

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className={'toastMargin'}
      />
      {localValues ? <PrivateRouter /> : <PublicRouter />}
    </div>
  );
}

export default App;
