import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const CardText = styled.h1`
  color: #803d3b;
  font-size: 40px;
  display: flex;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;
const CardParagraph = styled.p`
  color: #803d3b;
  font-size: 30px;
  display: flex;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;
const CardItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 200px;
  width: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  background: linear-gradient(45deg, #f3d6d6, #e8b4b4);
  margin-bottom: 30px;
`;

const Card = ({ family, onUpdateDonation }) => {
  const { _id, name, donation } = family;
  const [newDonation, setNewDonation] = useState(0);

  const handleAddDonation = async () => {
    try {
      await onUpdateDonation(_id, donation + parseFloat(newDonation));
      setNewDonation(0);
    } catch (error) {
      console.error("Error adding donation:", error);
    }
  };

  return (
    <CardItem>
      <h2>{name}</h2>
      <CardParagraph>Total Arrecadado: ${donation}</CardParagraph>
      <input
        type="number"
        value={newDonation}
        onChange={(e) => setNewDonation(e.target.value)}
        placeholder="Enter donation amount"
      />
      <button onClick={handleAddDonation}>Doar</button>
    </CardItem>
  );
};

const Cards = () => {
  const [families, setFamilies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://careconnect-oy9k.onrender.com/api/families"
        );
        setFamilies(response.data.slice(0, 3));
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

  return (
    <>
      <CardText>Doe agora</CardText>
      <CardContainer>
        {families.map((family) => (
          <Card
            key={family._id}
            family={family}
            onUpdateDonation={handleUpdateDonation}
          />
        ))}
      </CardContainer>
    </>
  );
};

export default Cards;
