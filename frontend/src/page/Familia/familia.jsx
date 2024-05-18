import React, { useState } from 'react';
import "./familia.css"
import imagemFamilia from '../../imagens/familia.jpg';
import Header from '../../components/header';
import Cards from '../../components/Cards';


function Familia() {

  return (
    <div>
      <Header></Header>
      <div class="pageFamilia">
        <div class="Familia">
          <img src={imagemFamilia} alt="Familia" />
        </div>
        <div class="LoginFamilia">
          <h2 class>Famílias Cadastradas</h2>
          <Cards/>
        </div>
      </div>
    </div>
  )
}

export default Familia;
