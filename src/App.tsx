
import axios from "axios";
import PrivateRouter from "./Components/Routes/privateRoute";
import PublicRouter from "./Components/Routes/publicRoute";
import {getLocalStorageValuesBoolean} from "./Helper/localStore";
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  let localValues = getLocalStorageValuesBoolean();

  const notify = () => toast.error('BAD REQUEST FOUND', {
    className: 'toast-error'
  });
  const notifySuccess = () => toast.error('API EXCESSED OUT OF LIMIT', {
    className: 'toast-error'
  });

  let navigate = useNavigate();
  const logout=()=>{
      navigate("/")
      localStorage.removeItem("name");
      notify();
  }
  
  const logoutSuccess=()=>{
    navigate("/")
    localStorage.removeItem("name");
    notifySuccess();
  }

  axios.interceptors.request.use(
    (config: any) => {
    console.log("config",config)
        config.headers["X-RapidAPI-Key"] = "a08b46e4f2msh25a8dc2a3d14f2fp17daeajsna7b2bc642d72";
        config.headers["X-RapidAPI-Host"] = "amazon-scrapper-kteam.p.rapidapi.com";
      return config;
    },
    function (error: any) {
     return Promise.reject(error);
    }
  );
  
  axios.interceptors.response.use(
    (response) => {
      console.log("responsemmm",response?.data)
      if(response?.data?.statusCode === 403){
        logoutSuccess();
      }
      return response;
    },
     function (error:any) {
      console.log("error",error?.code)
    
    if(error?.code === "ERR_BAD_REQUEST"){
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
            className={"toastMargin"}
          />
      {
        localValues  ?  <PrivateRouter/> : <PublicRouter/>
      }
     
     
    </div>
  );
}

export default App;
