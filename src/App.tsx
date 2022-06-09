
import PrivateRouter from "./Components/Routes/privateRoute";
import PublicRouter from "./Components/Routes/publicRoute";
import {getLocalStorageValuesBoolean} from "./Helper/localStore";

function App() {
  let localValues = getLocalStorageValuesBoolean();
  console.log("localValues",localValues)
  return (
    <div className="App">
      {
        localValues  ?  <PrivateRouter/> : <PublicRouter/>
      }
     
     
    </div>
  );
}

export default App;
