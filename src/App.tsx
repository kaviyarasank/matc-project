import axios from 'axios';
import PrivateRouter from './Routes/privateRoute';
import PublicRouter from './Routes/publicRoute';
import { getLocalStorageValues } from './Helper/localStore';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCallback, useEffect } from 'react';
import { fectchAccess } from './Redux/Access';
import { AppDispatch } from './Redux/Store';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const localValues = getLocalStorageValues();

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

      if(response){
        axios({
          method: 'POST',
          url: 'http://localhost:8080/checkAuth'
        });
      }
      if (response?.data?.statusCode === 403) {
        logoutSuccess();
      }
      return response;
    },
    function (error) {
      console.log('error', error);

      if (error?.response?.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );


  const fetch = useCallback(() => {
    try {
      dispatch(fectchAccess());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(()=>{
    fetch();
  },[fetch])

  const playerList = useSelector((state: any) => state.access.playerList);

  let validEmail = false;
  let validPassword = false;

  Object.values(playerList?.data)?.forEach((res:any) => {
    if(res.email === localValues.email){
      validEmail= true;
    }
    if(res.password === localValues.password ){
      validPassword = true;
    }
  });
  

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
      {validEmail  && validPassword ? <PrivateRouter /> : <PublicRouter />}
    </div>
  );
}

export default App;
