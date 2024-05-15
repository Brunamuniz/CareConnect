import './homeless.css';
import Header from '../../components/header';
import imgHomeless from '../../imagens/HOMELESS.jpg'

function Homeless() {

    return (
        <div class='pageHomeless'>
            <Header></Header>
            <div class='homeHomeless'>
                <img src={imgHomeless}></img>
                <div class="textoHomeless">
                    <div class='tituloHomeless'>
                        <h1>Moradores de Rua</h1>
                    </div>
                </div>
            </div>
            <div class='conteudoHomeless'>
                <h3>Moradores de Rua Cadastrados</h3>
                <div class='homelessCadastrados'>
                </div>
            </div>
        </div>
    )
}

export default Homeless;