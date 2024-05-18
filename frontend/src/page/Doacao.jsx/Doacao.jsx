import './Doacao.css';
import Header from '../../components/header';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const DonationCard = styled.div`
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

const SuccessMessage = styled.p`
  color: green;
  font-weight: bold;
`;

function Doacao() {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [newDonation, setNewDonation] = useState({ tipo: '', quantidade: '', origem: '' });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://careconnect-oy9k.onrender.com/api/donation');
      setDonations(result.data);
    };
    fetchData();
  }, []);

  const handleSelectDonation = (donation) => {
    setSelectedDonation(donation);
    setNewDonation({ tipo: donation.tipo, quantidade: donation.quantidade, origem: donation.origem });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDonation({ ...newDonation, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (selectedDonation) {
        response = await axios.put(`https://careconnect-oy9k.onrender.com/api/donation/${selectedDonation._id}`, newDonation);
      } else {
        response = await axios.post('https://careconnect-oy9k.onrender.com/api/donation', newDonation);
      }
      setDonations([...donations, response.data]);
      setNewDonation({ tipo: '', quantidade: '', origem: '' });
      setSuccessMessage('Doação feita com sucesso!');
      setSelectedDonation(null);
      setTimeout(() => setSuccessMessage(''), 3000); // Limpa a mensagem após 3 segundos
    } catch (error) {
      console.error('Error adding donation:', error);
    }
  };

  return (
    <div className="pageDoacao">
      <Header />
      <div className="Doacao">
        <div className="tituloDoacao">
          <h1>Doações</h1>
        </div>
        <div className="conteudoDoacao">
          <h2>Doe aqui</h2>
          <div>
            <FormContainer>
              <h2>{selectedDonation ? 'Editar Doação' : 'Nova Doação'}</h2>
              <Form onSubmit={handleSubmit}>
                <Input
                  type="text"
                  name="tipo"
                  placeholder="Tipo de Doação"
                  value={newDonation.tipo}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="number"
                  name="quantidade"
                  placeholder="Quantidade"
                  value={newDonation.quantidade}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="text"
                  name="origem"
                  placeholder="Origem"
                  value={newDonation.origem}
                  onChange={handleChange}
                  required
                />
                <Button type="submit">{selectedDonation ? 'Salvar Edição' : 'Adicionar Doação'}</Button>
              </Form>
              {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
            </FormContainer>
            <div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Doacao;
