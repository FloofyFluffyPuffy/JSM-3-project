
import Body from "./components/Body";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import Stream from "./components/Stream";
function App() {
  return (
    <>
      <Nav />
      <Routes>
       <Route path='/' element={<Body/>}/>
       <Route path='/watch/:href' element={<Stream/>}></Route> 
      </Routes>
    </>
  );
}

export default App;
