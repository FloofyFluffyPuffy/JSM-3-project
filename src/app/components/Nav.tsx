const Nav = () => {
  return (
    <div className="nav">
      <div className="logo-container">
        <img className="logo" src="/logo.png" alt="Logo" />
      </div>
      <div className="search">
        <input type="text" placeholder=" Search..." />
        <img className="search-icon" src="/search.png" alt="" />
      </div>
      <div className="menu"> 
        <img className="menu-icon" src="/menu.svg" alt="" />
      </div>
    </div>
  );
};

export default Nav;
