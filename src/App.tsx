import axios from 'axios';
import PrivateRouter from './Routes/privateRoute';
import PublicRouter from './Routes/publicRoute';
import { getLocalStorageValuesBoolean } from './Helper/localStore';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  let localValuesBoolean = getLocalStorageValuesBoolean();
  // const notify = () =>
  //   toast.error('INCOMING TOKEN EXPIRED', {
  //     className: 'toast-error'
  //   });
  const notifySuccess = () =>
    toast.error('API EXCESSED OUT OF LIMIT', {
      className: 'toast-error'
    });

  const navigate = useNavigate();
  // const logout = () => {
  //   navigate('/');
  //   localStorage.removeItem('name');
  //   localStorage.removeItem('token');
  //   notify();
  // };
  const refreshToken = () => {
    let userData = JSON.parse(localStorage.getItem('token') || '{}');
    const postData = axios({
      method: 'POST',
      url: 'http://localhost:8080/refresh',
      headers: {
        'X-access-token': `${userData.refreshToken}`
      }
    }).then((res) => {
      console.log('response', res);
      localStorage.setItem('token', JSON.stringify(res?.data));
    });
    return postData;
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
      if (response?.data?.statusCode === 403) {
        logoutSuccess();
      }
      return response;
    },
    function (error: any) {
      if (error?.response?.status === 401) {
        refreshToken();
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
