import { Link } from 'react-router-dom';
import "./header.css"

function Header() {

    return (
        <div class="header">
            <div class="textHeader">
                <Link to="/" className="linkHeader">Home</Link>
                <Link to="/voluntario" className="linkHeader">Seja Voluntário</Link>
                <Link to="/familia" className="linkHeader">Familia</Link>
                <Link to="/hostel" className="linkHeader">Hostel</Link>
            </div>
        </div>
    )
}
  
  export default Header;
  
  
  