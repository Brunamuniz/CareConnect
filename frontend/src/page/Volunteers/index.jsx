import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Header from '../../components/header';
import Global from '../../global/global';
import imagemVoluntario from '../../imagens/voluntariado.jpg';

// Styled Components
const PageVoluntario = styled.div`
  background-color: #E8EDDF;
  height: 1000px;
`;

const VoluntarioSection = styled.div`
  height: 600px;
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextVoluntario = styled.div`
  color: #F5CB5C;
  text-shadow: 2px 2px 8px #242423;
  font-size: 100px;
  height: 100px;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 20px;
`;

const TextoExplicativo = styled.div`
  margin: 20px 0;
  color: #333533;
  font-family: "Kanit", sans-serif;
  font-weight: 300;
  font-size: 18px;
  padding: 20px;

  h2 {
    color: #F5CB5C;
    text-shadow: 0.05px 0.05px 5px #E8EDDF;
    font-family: "Mohave", sans-serif;
    font-size: 30px;
    text-align: center;
    margin-bottom: 20px;
  }
`;

const VolunteerSection = styled.div`
  background-color: #CFDBD5;
  margin: 20px 0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const VolunteerCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin: 10px 0;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormContainer = styled.div`
  margin-top: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #28a745;
  color: white;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 10px;

  &:hover {
    background-color: #218838;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;

const SearchInput = styled(Input)`
  margin-bottom: 20px;
`;

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [newVolunteer, setNewVolunteer] = useState({
    nomeGrupo: '',
    voluntarios: [{ nome: '', habilidades: '', disponibilidade: '' }],
    correspondencia: [{ habilidade: '', necessidade: '' }],
    agendamento: [{ atividade: '', data: '' }],
  });
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axios.get('https://careconnect-oy9k.onrender.com/api/volunteer');
        setVolunteers(response.data);
      } catch (error) {
        console.error('Error fetching volunteers:', error);
      }
    };
    fetchVolunteers();
  }, []);

  const handleChange = (e, index, category) => {
    const { name, value } = e.target;
    if (category) {
      const updatedCategory = [...newVolunteer[category]];
      updatedCategory[index] = { ...updatedCategory[index], [name]: value };
      setNewVolunteer({ ...newVolunteer, [category]: updatedCategory });
    } else {
      setNewVolunteer({ ...newVolunteer, [name]: value });
    }
  };

  const addField = (category) => {
    const updatedCategory = [...newVolunteer[category], {}];
    setNewVolunteer({ ...newVolunteer, [category]: updatedCategory });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = selectedVolunteer
        ? await axios.put(`https://careconnect-oy9k.onrender.com/api/volunteer/${selectedVolunteer._id}`, newVolunteer)
        : await axios.post('https://careconnect-oy9k.onrender.com/api/volunteer', newVolunteer);

      if (selectedVolunteer) {
        setVolunteers(volunteers.map(v => (v._id === selectedVolunteer._id ? response.data : v)));
      } else {
        setVolunteers([...volunteers, response.data]);
      }
      setNewVolunteer({
        nomeGrupo: '',
        voluntarios: [{ nome: '', habilidades: '', disponibilidade: '' }],
        correspondencia: [{ habilidade: '', necessidade: '' }],
        agendamento: [{ atividade: '', data: '' }],
      });
      setSelectedVolunteer(null);
    } catch (error) {
      console.error('Error adding/updating volunteer:', error.response ? error.response.data : error.message);
    }
  };

  const handleEdit = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setNewVolunteer(volunteer);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://careconnect-oy9k.onrender.com/api/volunteer/${id}`);
      setVolunteers(volunteers.filter(v => v._id !== id));
    } catch (error) {
      console.error('Error deleting volunteer:', error.response ? error.response.data : error.message);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredVolunteers = volunteers.filter((volunteer) =>
    volunteer.nomeGrupo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Global />
      <Header />
      <PageVoluntario>
        <VoluntarioSection>
          <Image src={imagemVoluntario} alt="voluntariado" />
          <TextVoluntario>Voluntariado</TextVoluntario>
        </VoluntarioSection>
        <TextoExplicativo>
          <h2>O que é ser um(a) voluntário(a)?</h2>
          <p>
            Ser um voluntário significa dedicar seu tempo, habilidades e energia para ajudar os outros sem esperar nada em troca além da satisfação de fazer a diferença. Um voluntário pode estar envolvido em uma variedade de atividades, desde trabalhar em abrigos de animais até ensinar crianças carentes. O voluntariado não apenas beneficia a comunidade, mas também pode trazer uma sensação de realização pessoal e conexão com os outros. Ser voluntário é sobre dar de si mesmo e contribuir para um mundo melhor, um ato de bondade que pode inspirar e impactar positivamente a vida de muitas pessoas.
          </p>
        </TextoExplicativo>
        <VolunteerSection>
          <h1>Voluntários</h1>
          <SearchInput
            type="text"
            placeholder="Pesquisar voluntário por nome do grupo"
            value={searchTerm}
            onChange={handleSearch}
          />
          {filteredVolunteers.map((volunteer) => (
            <VolunteerCard key={volunteer._id}>
              <h3>Nome do grupo: {volunteer.nomeGrupo}</h3>
              <div>
                <h3>Voluntário:</h3>
                {volunteer.voluntarios.map((v, index) => (
                  <div key={index}>
                    <p>Nome: {v.nome}</p>
                    <p>Habilidades: {v.habilidades.join(', ')}</p>
                    <p>Disponibilidade: {v.disponibilidade}</p>
                  </div>
                ))}
              </div>
              <div>
                <h3>Correspondência:</h3>
                {volunteer.correspondencia.map((c, index) => (
                  <div key={index}>
                    <p>Habilidade: {c.habilidade}</p>
                    <p>Necessidade: {c.necessidade}</p>
                  </div>
                ))}
              </div>
              <div>
                <h3>Agendamento:</h3>
                {volunteer.agendamento.map((a, index) => (
                  <div key={index}>
                    <p>Atividade: {a.atividade}</p>
                    <p>Data disponível: {new Date(a.data).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
              <Button onClick={() => handleEdit(volunteer)}>Editar</Button>
              <DeleteButton onClick={() => handleDelete(volunteer._id)}>Excluir</DeleteButton>
            </VolunteerCard>
          ))}

          <FormContainer>
            <h2>{selectedVolunteer ? 'Editar Voluntário' : 'Adicionar Novo Voluntário'}</h2>
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                name="nomeGrupo"
                placeholder="Nome do grupo"
                value={newVolunteer.nomeGrupo}
                onChange={(e) => handleChange(e)}
                required
              />
              <h3>Voluntários</h3>
              {newVolunteer.voluntarios.map((voluntario, index) => (
                <div key={index}>
                  <Input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={voluntario.nome}
                    onChange={(e) => handleChange(e, index, 'voluntarios')}
                    required
                  />
                  <Input
                    type="text"
                    name="habilidades"
                    placeholder="Habilidades (separadas por vírgula)"
                    value={voluntario.habilidades}
                    onChange={(e) => handleChange(e, index, 'voluntarios')}
                    required
                  />
                  <Input
                    type="text"
                    name="disponibilidade"
                    placeholder="Disponibilidade"
                    value={voluntario.disponibilidade}
                    onChange={(e) => handleChange(e, index, 'voluntarios')}
                    required
                  />
                </div>
              ))}

              <h3>Correspondência</h3>
              {newVolunteer.correspondencia.map((correspondencia, index) => (
                <div key={index}>
                  <Input
                    type="text"
                    name="habilidade"
                    placeholder="Habilidade"
                    value={correspondencia.habilidade}
                    onChange={(e) => handleChange(e, index, 'correspondencia')}
                    required
                  />
                  <Input
                    type="text"
                    name="necessidade"
                    placeholder="Necessidade"
                    value={correspondencia.necessidade}
                    onChange={(e) => handleChange(e, index, 'correspondencia')}
                    required
                  />
                </div>
              ))}

              <h3>Agendamento</h3>
              {newVolunteer.agendamento.map((agendamento, index) => (
                <div key={index}>
                  <Input
                    type="text"
                    name="atividade"
                    placeholder="Atividade"
                    value={agendamento.atividade}
                    onChange={(e) => handleChange(e, index, 'agendamento')}
                    required
                  />
                  <Input
                    type="date"
                    name="data"
                    value={agendamento.data}
                    onChange={(e) => handleChange(e, index, 'agendamento')}
                    required
                  />
                </div>
              ))}

              <Button type="submit">{selectedVolunteer ? 'Atualizar Voluntário' : 'Adicionar Voluntário'}</Button>
            </Form>
          </FormContainer>
        </VolunteerSection>
      </PageVoluntario>
    </div>
  );
};

export default Volunteers;
