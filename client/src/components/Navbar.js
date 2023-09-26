import logo from "../logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="Classical Music Collection 2023" />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
