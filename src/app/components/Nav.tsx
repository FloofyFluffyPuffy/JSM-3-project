
import { useNavigate } from "react-router-dom";
import Search from "./search/Search";
const Nav = () => {
  const navigate = useNavigate()
  return (
    <div className="nav">
      <div className="logoContainer">
        <img className="logo" src="/tetoLogo.gif" alt="Teto" />
         <img className="fatTetoLogo" src="/fatTetoHome.png" onClick={() => navigate('/')} />
      </div>
      <Search/>
      <div className="logoContainer">
        <img className="logo" src="/tetoLogo.gif" alt="Teto" />
      </div>
    </div>
  );
};

export default Nav;
