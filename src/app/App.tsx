
import Body from "./components/Body";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Nav />
      <Routes>
       <Route path='/' element={<Body/>}/> 
      </Routes>
    </>
  );
}

export default App;
