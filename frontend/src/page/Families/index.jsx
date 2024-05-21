import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios'; // Adicionei a importação do axios
import imagemFamilia from '../../imagens/familia.jpg';
import Header from '../../components/header';
import Cards from '../../components/Cards';
import Global from '../../global/global';

// Styled Components
const PageFamilia = styled.div`
  background-color: #E8EDDF;
  height: 100%;
  display: flex;
  font-family: "Mohave", sans-serif;
  font-optical-sizing: auto;
  font-weight: weight;
  font-style: normal;
  font-size: 42px;
  color: #333533;
  text-shadow: 0.5px 0.5px 4px #E8EDDF;

  &:hover {
    text-shadow: 0.5px 0.5px 4px #E8EDDF;
  }

  img {
    padding: 10px;
  }
`;

const FamiliaSection = styled.div`
  width: 50%;
`;

const LoginFamilia = styled.div`
  margin: 50px;
`;

const FormContainer = styled.div`
width: 50%;

  display: flex;
  flex-direction: column;
  align-items: center;
  background: #F5CB5C;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  margin-bottom: 20px;
`;

const FormTitle = styled.h2`
  color: #242423;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  width: 100%;
`;

const FormLabel = styled.label`
  color: #242423;
  margin-bottom: 5px;
`;

const FormInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const FormCheckbox = styled.input`
  margin-right: 10px;
`;

const SubmitButton = styled.button`
  background: #242423;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background: #333533;
  }
`;
const FamilyContainer = styled.div`
  background-color: #E8EDDF;
  height: 100%;
  min-height: 100px;
  display: flex;
  justify-content: center;
  border-color: #F5CB5C;
  border-style: solid;
`;

const CreateFamilyForm = ({ onCreate }) => {
  const [name, setName] = useState("");
  const [register, setRegister] = useState("");
  const [donation, setDonation] = useState("");
  const [followUp, setFollowUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onCreate({ name, register, donation, followUp });
      setName("");
      setRegister("");
      setDonation("");
      setFollowUp(false);
    } catch (error) {
      console.error("Error creating family:", error);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Create Family</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>Name:</FormLabel>
          <FormInput type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <FormLabel>Register:</FormLabel>
          <FormInput type="number" value={register} onChange={(e) => setRegister(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <FormLabel>Donation:</FormLabel>
          <FormInput type="number" value={donation} onChange={(e) => setDonation(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <FormLabel>
            <FormCheckbox type="checkbox" checked={followUp} onChange={(e) => setFollowUp(e.target.checked)} />
            Follow Up
          </FormLabel>
        </FormGroup>
        <SubmitButton type="submit">Create Family</SubmitButton>
      </form>
    </FormContainer>
  );
};


function Familia() {
  const handleCreateFamily = async (newFamily) => {
    try {
      const response = await axios.post("https://careconnect-oy9k.onrender.com/api/families", newFamily);
      // Aqui você precisa definir o que fazer com a resposta, como atualizar o estado das famílias
    } catch (error) {
      console.error("Error creating family:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "#E8EDDF" }}>
      <Global/>
      <Header />
      <PageFamilia>
        <FamiliaSection>
          <img src={imagemFamilia} alt="Familia" />
        </FamiliaSection>
        <LoginFamilia>
          <h2>Famílias Cadastradas</h2>
          <Cards />
        </LoginFamilia>
      </PageFamilia>
          <FamilyContainer>
          <CreateFamilyForm onCreate={handleCreateFamily} />
        </FamilyContainer>
    </div>
  );
}

export default Familia;
