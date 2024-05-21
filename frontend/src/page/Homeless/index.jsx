import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../../components/header';
import imgHomeless from '../../imagens/HOMELESS.jpg';
import Global from '../../global/global';


// Styled Components
const PageHomeless = styled.div`
  width: 100%;
  height: 100%;
  background-color: #E8EDDF;
`;

const HomeHomeless = styled.div`
  width: 100%;
  height: 600px;
`;

const TextoHomeless = styled.div`
  background-color: #CFDBD5;
  border-radius: 40px;
  margin-top: -350px;
  position: absolute;
  margin-left: 350px;

  &:hover {
    color: #FFFFFF;
    background-color: #F5CB5C;
    text-shadow: 0.5px 0.5px 4px #bebebe;
  }
`;

const TituloHomeless = styled.div`
  color: #333533;
  text-shadow: 0.5px 0.5px 4px #747674;
  font-size: 30px;
  margin: 10px;

  &:hover {
    color: #FFFFFF;
    background-color: #F5CB5C;
    text-shadow: 0.5px 0.5px 4px #bebebe;
  }
`;

const ConteudoHomeless = styled.div`
  padding: 50px;
  font-size: 30px;
  color: #F5CB5C;
  text-shadow: 0.5px 0.5px 2px #6a6a6a;
  font-family: "Mohave", sans-serif;
  font-optical-sizing: auto;
  font-weight: weight;
  font-style: normal;
`;

const HomelessCadastrados = styled.div`
  background-color: #CFDBD5;
  margin: 20px;
  height: 100%;
  min-height: 100px;
  border-radius: 30px;
`;


const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  width: 300px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const CheckboxLabel = styled.label`
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #803d3b;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #bf5656;
  }
`;

const HomelessForm = ({ selectedHomeless, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    historico: '',
    necessidades: {
      abrigo: false,
      alimentacao: false,
      assistenciaMedica: false,
    },
  });

  useEffect(() => {
    if (selectedHomeless) {
      setFormData({
        nome: selectedHomeless.nome,
        idade: selectedHomeless.idade,
        historico: selectedHomeless.historico,
        necessidades: selectedHomeless.necessidades,
      });
    }
  }, [selectedHomeless]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        necessidades: { ...prevData.necessidades, [name]: checked },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedHomeless) {
      // Update existing homeless
      try {
        await axios.put(`https://careconnect-oy9k.onrender.com/api/homeless/${selectedHomeless._id}`, formData);
        onSave();
      } catch (error) {
        console.error('Error updating homeless:', error);
      }
    } else {
      // Create new homeless
      try {
        await axios.post('https://careconnect-oy9k.onrender.com/api/homeless', formData);
        onSave();
      } catch (error) {
        console.error('Error creating homeless:', error);
      }
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <Input
          type="number"
          name="idade"
          placeholder="Idade"
          value={formData.idade}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="historico"
          placeholder="Histórico"
          value={formData.historico}
          onChange={handleChange}
          required
        />
        <CheckboxContainer>
          <CheckboxLabel>
            <input
              type="checkbox"
              name="abrigo"
              checked={formData.necessidades.abrigo}
              onChange={handleChange}
            />
            Abrigo
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              name="alimentacao"
              checked={formData.necessidades.alimentacao}
              onChange={handleChange}
            />
            Alimentação
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              name="assistenciaMedica"
              checked={formData.necessidades.assistenciaMedica}
              onChange={handleChange}
            />
            Assistência Médica
          </CheckboxLabel>
        </CheckboxContainer>
        <Button type="submit">{selectedHomeless ? 'Atualizar' : 'Criar'}</Button>
        <Button type="button" onClick={onCancel}>Cancelar</Button>
      </form>
    </FormContainer>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;



const HomelessManagement = () => {
  const [homelessList, setHomelessList] = useState([]);
  const [selectedHomeless, setSelectedHomeless] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchHomeless = async () => {
      try {
        const response = await axios.get('https://careconnect-oy9k.onrender.com/api/homeless');
        setHomelessList(response.data);
      } catch (error) {
        console.error('Error fetching homeless:', error);
      }
    };
    fetchHomeless();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://careconnect-oy9k.onrender.com/api/homeless/${id}`);
      setHomelessList(homelessList.filter((homeless) => homeless._id !== id));
    } catch (error) {
      console.error('Error deleting homeless:', error);
    }
  };

  const handleEdit = (homeless) => {
    setSelectedHomeless(homeless);
    setIsFormVisible(true);
  };

  const handleFormSave = () => {
    setIsFormVisible(false);
    setSelectedHomeless(null);
    axios.get('https://careconnect-oy9k.onrender.com/api/homeless').then((response) => setHomelessList(response.data));
  };

  const handleFormCancel = () => {
    setIsFormVisible(false);
    setSelectedHomeless(null);
  };

  return (
    <Container>
      <Button onClick={() => setIsFormVisible(true)}>Adicionar Novo Morador de Rua</Button>
      {isFormVisible && (
        <HomelessForm
          selectedHomeless={selectedHomeless}
          onSave={handleFormSave}
          onCancel={handleFormCancel}
        />
      )}
      <ul>
        {homelessList.map((homeless) => (
          <li key={homeless._id}>
            {homeless.nome} - {homeless.idade} anos - {homeless.historico}
            <div>
              Necessidades:
              {homeless.necessidades.abrigo && ' Abrigo'}
              {homeless.necessidades.alimentacao && ' Alimentação'}
              {homeless.necessidades.assistenciaMedica && ' Assistência Médica'}
            </div>
            <Button onClick={() => handleEdit(homeless)}>Editar</Button>
            <Button onClick={() => handleDelete(homeless._id)}>Deletar</Button>
          </li>
        ))}
      </ul>
    </Container>
  );
};



function Homeless() {
  return (
    <PageHomeless>
      <Global />
      <Header />
      <HomeHomeless>
        <img src={imgHomeless} alt="Homeless" />
        <TextoHomeless>
          <TituloHomeless>
            <h1>Moradores de Rua</h1>
          </TituloHomeless>
        </TextoHomeless>
      </HomeHomeless>
      <ConteudoHomeless>
        <h3>Moradores de Rua Cadastrados</h3>
        <HomelessCadastrados>
          <HomelessForm />
          <HomelessManagement />
        </HomelessCadastrados>
      </ConteudoHomeless>
    </PageHomeless>
  );
}

export default Homeless;
