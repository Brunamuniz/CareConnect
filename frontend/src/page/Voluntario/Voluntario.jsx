import React, { useState } from 'react';
import "./Voluntario.css"
import imagemVoluntario from '../../imagens/voluntariado.jpg';
import Header from '../../components/header';


function Voluntario() {

  return (
    <div>
      <Header></Header>
      <div class="pageVoluntario">
        <div class="voluntario">
          <img src={imagemVoluntario} alt="voluntariado" />
          <div class="textVoluntario">
            <div class="conteudoVoluntario"></div>
            <h1 class="texto">Voluntariado</h1>
          </div>
        </div>
        <div class="textoExplicativo">
          <h2 class>O que é ser um(a) voluntário(a)?</h2>
          <p>Ser um voluntário significa dedicar seu tempo, habilidades e energia para ajudar os outros sem esperar nada em troca além da satisfação de fazer a diferença. Um voluntário pode estar envolvido em uma variedade de atividades, desde trabalhar em abrigos de animais até ensinar crianças carentes. O voluntariado não apenas beneficia a comunidade, mas também pode trazer uma sensação de realização pessoal e conexão com os outros. Ser voluntário é sobre dar de si mesmo e contribuir para um mundo melhor, um ato de bondade que pode inspirar e impactar positivamente a vida de muitas pessoas.</p>
        </div>
      </div>
    </div>
  )
}

export default Voluntario;
