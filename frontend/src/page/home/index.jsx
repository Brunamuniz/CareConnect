import styled from 'styled-components';
import { Link } from 'react-router-dom';
import imagemHome from '../../imagens/Voluntario.jpg';
import Header from '../../components/header';
import Global from '../../global/global';


const HomeWrapper = styled.div`
  .home {
    background-image: url(${imagemHome});
    background-color: #CFDBD5;
    height: 550px;
    width: 100%;
    background-size: cover;
    background-position: center;
  }
`;

const Container = styled.div`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5); /* cor de sobreposição, neste caso, preto com 50% de opacidade */
  }

  img {
    width: 100%;
    height: 600px;
  }
`;

const TextHome = styled.div`
  color: #333533;
  width: 505px;
  height: 300px;
  background-color: #CFDBD5;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  padding: 30px 30px 20px;
  font-family: "Kanit", sans-serif;
  font-weight: 300;
  font-size: 19.5px;
  align-items: flex-start;
  justify-content: space-evenly;
  position: fixed;
  top: 60%;
  left: 70%;
  transform: translate(-50%, -50%);
  z-index: 1;

  @media (max-width: 1200px) {
    width: 50%;
    font-size: 18px;
    padding: 20px;
    border-radius: 20px;
  }

  @media (max-width: 992px) {
    width: 50%;
    font-size: 16px;
    padding: 15px;
    border-radius: 15px;
    height: 200px;
    top: 50%;
    position: absolute;
  }

  @media (max-width: 768px) {
    width: 50%;
    font-size: 14px;
    padding: 10px;
    border-radius: 10px;
    height: 200px;
  }

  @media (max-width: 576px) {
    width: 50%;
    font-size: 12px;
    padding: 10px;
    border-radius: 10px;
    height: 200px;
  }
`;

const Titulo = styled.h1`
  color: #333533;
  font-family: "Mohave", sans-serif;
  font-weight: bold;
  font-size: 100px;
  height: 110px;

  &:hover {
    color: #E8EDDF;
    text-shadow: 2px 2px 8px #242423;
  }

  span {
    color: #F5CB5C;
    text-shadow: 2px 2px 8px #E8EDDF;
  }

  @media (max-width: 1200px) {
    font-size: 80px;
    height: auto;
  }

  @media (max-width: 992px) {
    font-size: 60px;
  }

  @media (max-width: 768px) {
    font-size: 50px;
  }

  @media (max-width: 576px) {
    font-size: 40px;
  }
`;

const Button = styled.button`
  background-color: #242423;
  border: none;
  color: #FDFFFC;
  width: 180px;
  height: 40px;
  border-radius: 30px;
  box-shadow: 4px 4px 5px #E8EDDF;
  font-size: 17px;

  &:hover {
    background-color: #F5CB5C;
    color: #242423;
    box-shadow: 2px 2px 8px #242423;
  }

  @media (max-width: 992px) {
    width: 150px;
    height: 35px;
    font-size: 15px;
  }

  @media (max-width: 768px) {
    width: 120px;
    height: 30px;
    font-size: 13px;
  }

  @media (max-width: 576px) {
    width: 100px;
    height: 28px;
    font-size: 12px;
  }
`;

function Home() {
  return (
    <HomeWrapper>
      <Global/>
      <Header />
      <div className="home">
        <Container>
          <img src={imagemHome} alt="imagem" />
        </Container>
        <TextHome>
          <Titulo>Care<span>Connect</span></Titulo>
          <p>Junte-se ao CareConnect para transformar o mundo em um lugar melhor</p>
          <Link to="/voluntario">
            <Button>Seja um voluntário</Button>
          </Link>
        </TextHome>
      </div>
    </HomeWrapper>
  );
}

export default Home;
