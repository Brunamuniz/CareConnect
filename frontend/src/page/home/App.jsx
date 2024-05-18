import './App.css';
import { Link } from 'react-router-dom';
import imagemHome from '../../imagens/Voluntario.jpg';
import Header from '../../components/header';

function App() {
  return (
    <div>
      <Header />
      <div className="home">
        <div>
          <div className="container">
            <img src={imagemHome} alt="imagem" />
          </div>
        </div>
        <div className="textHome">
          <h1 className="titulo">Care<span>Connect</span></h1>
          <p>Junte-se ao CareConnect para transformar o mundo em um lugar melhor</p>
          <Link to="/voluntario">
            <button>Seja um voluntário</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
