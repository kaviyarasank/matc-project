import axios from 'axios';
import PrivateRouter from './Routes/privateRoute';
import PublicRouter from './Routes/publicRoute';
import { getLocalStorageValuesBoolean } from './Helper/localStore';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  let localValuesBoolean = getLocalStorageValuesBoolean();

  const notifySuccess = () =>
    toast.error('API EXCESSED OUT OF LIMIT', {
      className: 'toast-error'
    });

  const navigate = useNavigate();

  const logoutSuccess = () => {
    navigate('/');
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    notifySuccess();
  };
  const notify = () =>
    toast.error('INCOMING TOKEN EXPIRED', {
      className: 'toast-error'
    });

  const logOut = () => {
    navigate('/');
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    notify();
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
      if (response?.data?.statusCode === 403) {
        logoutSuccess();
      }
      return response;
    },
    function (error: any) {
      console.log('error', error);
      if (error?.response?.status === 401) {
        let userData = JSON.parse(localStorage.getItem('token') || '{}');
        return axios({
          method: 'POST',
          url: 'http://localhost:8080/refresh',
          headers: {
            'X-access-token': `${userData.refreshToken}`
          }
        }).then((res) => {
          localStorage.setItem('token', JSON.stringify(res?.data));
        });
      } else if (error?.response?.status === 402) {
        return logOut();
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
      {localValuesBoolean ? <PrivateRouter /> : <PublicRouter />}
    </div>
  );
}

export default App;
