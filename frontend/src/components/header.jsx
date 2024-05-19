import { Link, useLocation, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./header.css";


function Header() {
  const location = useLocation();

  return (
    <div className="header">
      <div className="textHeader">
        <Link
          to="/"
          className={location.pathname === "/" ? "active" : "linkHeader"}
        >
          Home
        </Link>
        <Link
          to="/voluntario"
          className={
            location.pathname === "/voluntario" ? "active" : "linkHeader"
          }
        >
          Seja Voluntário
        </Link>
        <Link
          to="/familia"
          className={location.pathname === "/familia" ? "active" : "linkHeader"}
        >
          Familia
        </Link>
        <Link
          to="/hostel"
          className={location.pathname === "/hostel" ? "active" : "linkHeader"}
        >
          Locais
        </Link>
        <Link
          to="/homeless"
          className={location.pathname === "/homeless" ? "active" : "linkHeader"}
        >
          Moradores de Rua
        </Link>
        <Link
          to="/doacao"
          className={location.pathname === "/doacao" ? "active" : "linkHeader"}
        >
          Doações
        </Link>
      </div>
    </div>
  );
}

export default Header;
