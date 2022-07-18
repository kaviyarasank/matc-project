import { Routes, Route } from 'react-router-dom';
import Register from '../Pages/Login/Register';

function PublicRouter() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default PublicRouter;
