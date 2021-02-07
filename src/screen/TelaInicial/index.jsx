import React from "react";
import CampoBusca from "../../components/CampoBusca/index";
import { Link, Redirect} from "react-router-dom";
import "./TelaInicial.css"

class TelaInicial extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            redirect: false,
            texto: ""
        }
    }
    handleCampoBuscaSearch = (e, texto) => {
        this.setState({ redirect: true , texto: texto })
    }

    render () {
        if (this.state.redirect) {
            return <Redirect to={{pathname: "/listagem", state: { pesquisa: this.state.texto }}} />
        }
        return (
            <div className="tela-inicial">
                <h1>Busca de processos</h1>
                <CampoBusca onSearch={this.handleCampoBuscaSearch}/>
                <p>Você pode criar um novo projeto <Link to="/cadastro-processo">clicando aqui</Link> </p>
            </div>
        );
    }
}

export default TelaInicial;