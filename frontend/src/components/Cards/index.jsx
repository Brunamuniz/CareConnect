import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDonate, faTrash, faEdit, faSave, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
`;

const CardText = styled.h1`
  color: #F5CB5C;
  font-size: 40px;
  text-align: center;
  margin-bottom: 20px;
`;

const CardParagraph = styled.p`
  color: #242423;
  font-size: 20px;
  text-align: center;
  margin-bottom: 10px;
`;

const CardItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 300px;
  width: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  background: #F5CB5C;
  margin-bottom: 30px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #333533;
  font-size: 24px;
  cursor: pointer;
  margin: 5px;

  &:hover {
    color: #F5CB5C;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: #333533;
  font-size: 36px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.left ? 'left: 0;' : 'right: 0;')}

  &:hover {
    color: #F5CB5C;
  }
`;

const Card = ({ family, onUpdateDonation, onDelete, onShowForm }) => {
  const { _id, name, donation } = family;
  const [newDonation, setNewDonation] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedDonation, setUpdatedDonation] = useState(donation);

  const handleAddDonation = async () => {
    try {
      await onUpdateDonation(_id, donation + parseFloat(newDonation));
      setNewDonation(0);
    } catch (error) {
      console.error("Error adding donation:", error);
    }
  };

  const handleDeleteFamily = async () => {
    try {
      await onDelete(_id);
    } catch (error) {
      console.error("Error deleting family:", error);
    }
  };

  const handleUpdateFamily = async () => {
    try {
      await axios.put(`https://careconnect-oy9k.onrender.com/api/families/${_id}`, {
        name: updatedName,
        donation: updatedDonation,
      });
      setShowForm(false); // Esconde o formulário após a atualização
    } catch (error) {
      console.error("Error updating family:", error);
    }
  };

  return (
    <>
      <CardItem>
        <h2>{name}</h2>
        <CardParagraph>Total Arrecadado: ${donation}</CardParagraph>
        <input
          type="number"
          value={newDonation}
          onChange={(e) => setNewDonation(e.target.value)}
          placeholder="Enter donation amount"
        />
      </CardItem>
      <ButtonContainer>
        <IconButton onClick={handleAddDonation}><FontAwesomeIcon icon={faDonate} /></IconButton>
        <IconButton onClick={handleDeleteFamily}><FontAwesomeIcon icon={faTrash} /></IconButton>
        <IconButton onClick={() => setShowForm(!showForm)}><FontAwesomeIcon icon={faEdit} /></IconButton>
      </ButtonContainer>
      {showForm && (
        <div>
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <input
            type="number"
            value={updatedDonation}
            onChange={(e) => setUpdatedDonation(e.target.value)}
          />
          <IconButton onClick={handleUpdateFamily}><FontAwesomeIcon icon={faSave} /></IconButton>
        </div>
      )}
    </>
  );
};

const Cards = () => {
  const [families, setFamilies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://careconnect-oy9k.onrender.com/api/families"
        );
        setFamilies(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleUpdateDonation = async (familyId, newDonation) => {
    try {
      await axios.put(
        `https://careconnect-oy9k.onrender.com/api/families/${familyId}`,
        { donation: newDonation }
      );
      const updatedFamilies = families.map((family) =>
        family._id === familyId ? { ...family, donation: newDonation } : family
      );
      setFamilies(updatedFamilies);
    } catch (error) {
      console.error("Error updating donation:", error);
    }
  };

  const handleDeleteFamily = async (familyId) => {
    try {
      await axios.delete(`https://careconnect-oy9k.onrender.com/api/families/${familyId}`);
      setFamilies(families.filter((family) => family._id !== familyId));
    } catch (error) {
      console.error("Error deleting family:", error);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % families.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + families.length) % families.length);
  };

  return (
    <>
      <CardText>Doe agora</CardText>
      <CardContainer>
        {families.length > 0 && (
          <Card
            key={families[currentIndex]._id}
            family={families[currentIndex]}
            onUpdateDonation={handleUpdateDonation}
            onDelete={handleDeleteFamily}
          />
        )}
        <NavButton left onClick={handlePrevious}><FontAwesomeIcon icon={faArrowLeft} /></NavButton>
        <NavButton onClick={handleNext}><FontAwesomeIcon icon={faArrowRight} /></NavButton>
      </CardContainer>
    </>
  );
};

export default Cards;
