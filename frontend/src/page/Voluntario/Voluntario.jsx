import React, { useState, useEffect } from 'react';
import "./Voluntario.css";
import imagemVoluntario from '../../imagens/voluntariado.jpg';
import Header from '../../components/header';
import axios from 'axios';
import styled from 'styled-components';

// Styled components
const VolunteerCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin: 10px 0;
`;

const FormContainer = styled.div`
  margin-top: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #28a745;
  color: white;
  cursor: pointer;
`;

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [newVolunteer, setNewVolunteer] = useState({
    nomeGrupo: '',
    voluntarios: [{ nome: '', habilidades: '', disponibilidade: '' }],
    correspondencia: [{ habilidade: '', necessidade: '' }],
    agendamento: [{ atividade: '', data: '' }],
  
  });

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
    console.log("Data being sent to the server:", newVolunteer); // Adicionando um log para ver os dados enviados
    try {
      const response = await axios.post('https://careconnect-oy9k.onrender.com/api/volunteer', newVolunteer);
      setVolunteers([...volunteers, response.data]);
      setNewVolunteer({
        nomeGrupo: '',
        voluntarios: [{ nome: '', habilidades: '', disponibilidade: '' }],
        correspondencia: [{ habilidade: '', necessidade: '' }],
        agendamento: [{ atividade: '', data: '' }],
       
      });
    } catch (error) {
      console.error('Error adding volunteer:', error.response ? error.response.data : error.message); // Melhorando a mensagem de erro
    }
  };

  return (
    <div>
      <Header />
      <div className="pageVoluntario">
        <div className="voluntario">
          <img src={imagemVoluntario} alt="voluntariado" />
          <div className="textVoluntario">
            <div className="conteudoVoluntario"></div>
            <h1 className="texto">Voluntariado</h1>
          </div>
        </div>
        <div className="textoExplicativo">
          <h2>O que é ser um(a) voluntário(a)?</h2>
          <p>Ser um voluntário significa dedicar seu tempo, habilidades e energia para ajudar os outros sem esperar nada em troca além da satisfação de fazer a diferença. Um voluntário pode estar envolvido em uma variedade de atividades, desde trabalhar em abrigos de animais até ensinar crianças carentes. O voluntariado não apenas beneficia a comunidade, mas também pode trazer uma sensação de realização pessoal e conexão com os outros. Ser voluntário é sobre dar de si mesmo e contribuir para um mundo melhor, um ato de bondade que pode inspirar e impactar positivamente a vida de muitas pessoas.</p>
        </div>
        <div className="volunteers">
          <h1>Voluntários</h1>
          {volunteers.map((volunteer) => (
            <VolunteerCard key={volunteer._id}>
              <p>Nome do grupo: {volunteer.nomeGrupo}</p>
              <div>
                <h3>Voluntários:</h3>
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
             
            </VolunteerCard>
          ))}

          <FormContainer>
            <h2>Add New Volunteer</h2>
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                name="nomeGrupo"
                placeholder="Nome do grupo"
                value={newVolunteer.nomeGrupo}
                onChange={handleChange}
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
              <Button type="button" onClick={() => addField('voluntarios')}>Add Voluntário</Button>

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
              <Button type="button" onClick={() => addField('correspondencia')}>Add Correspondência</Button>

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
                    placeholder="Data"
                    value={agendamento.data}
                    onChange={(e) => handleChange(e, index, 'agendamento')}
                    required
                  />
                </div>
              ))}
              <Button type="button" onClick={() => addField('agendamento')}>Add Agendamento</Button>

          

              <Button type="submit">Add Volunteer</Button>
            </Form>
          </FormContainer>
        </div>
      </div>
    </div>
  );
};

export default Volunteers;
