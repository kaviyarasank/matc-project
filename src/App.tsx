
import axios from "axios";
import PrivateRouter from "./Components/Routes/privateRoute";
import PublicRouter from "./Components/Routes/publicRoute";
import {getLocalStorageValuesBoolean} from "./Helper/localStore";
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  let localValues = getLocalStorageValuesBoolean();

  const notify = () => toast.error('INCOMING TOKEN EXPIRED', {
    className: 'toast-error'
  });
  const notifySuccess = () => toast.error('API EXCESSED OUT OF LIMIT', {
    className: 'toast-error'
  });

  let navigate = useNavigate();
  const logout=()=>{
      navigate("/")
      localStorage.removeItem("name");
      localStorage.removeItem("token");
      notify();
  }
  
  const logoutSuccess=()=>{
    navigate("/")
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    notifySuccess();
  }

  axios.interceptors.request.use(
    (config: any) => {
    console.log("config",config)
    var userData = JSON.parse(localStorage.getItem("token") || "{}");
    console.log("userDatauserData",userData?.Token)
      config.headers["X-RapidAPI-Key"] = "a08b46e4f2msh25a8dc2a3d14f2fp17daeajsna7b2bc642d72";
      config.headers["X-RapidAPI-Host"] = "amazon-data-scraper67.p.rapidapi.com";
      config.headers["X-access-token"] = `${userData?.Token}`

      return config;
    },
    function (error: any) {
     return Promise.reject(error);
    }
  );
  
  axios.interceptors.response.use(
    (response:any) => {
      console.log("responsemmm",response)

      axios({
        method: 'POST',
        url: 'http://localhost:3002/checkAuth'
      });
      if(response?.data?.statusCode === 403){
        logoutSuccess();
      }
      return response;
    },
     function (error) {
      console.log("error",error)
    
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
