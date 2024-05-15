/* Albergue -> cadastrados -> vagas de pessoas, serviços; doação; reservas */
import React, { useState } from 'react';
import "./Hostel.css"
import Header from '../../components/header';


function Hostel() {

    return (
        <div>
            <Header></Header>
            <div class="pageHostel">
                <div class="hostel">
                    <div class="textHostel">
                        <div class="tituloHostel">
                            <h1 class="Hostel">Locais</h1>
                        </div>
                    </div>
                    <div class="conteudoHostel"></div>
                </div>
            </div>
        </div>  
    )
}

export default Hostel;
