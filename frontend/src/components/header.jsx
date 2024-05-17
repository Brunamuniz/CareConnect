import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <div class="header">
      <div class="textHeader">
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
        <Link
          to="/internalaccess"
          className={location.pathname === "/acessointerno" ? "active" : "linkHeader"}
        >
          Acesso Interno
        </Link>
      </div>
    </div>
  );
}

export default Header;
