import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link, Redirect } from "react-router-dom";
import "./CadastroProcesso.css"

class CadastroProcesso extends React.Component {
    constructor (props) {
        super(props)
        let processo = {}
        let modoEdicao = false

        if (props.location && props.location.state) {
            processo = props.location.state.processo;
            modoEdicao = props.location.state.modoEdicao;
        }

        this.state = {
            redirect: false,
            modoEdicao: modoEdicao,
            interessado: "",
            processo: processo 
        };
    }

    handleAdicionarClick = (e) => {
        if (this.state.interessado === "") return;

        let interessados = [];
        if (this.state.processo.interessados) {
            interessados = this.state.processo.interessados;
        }

        interessados.push(this.state.interessado);

        let processo = this.state.processo;
        processo.interessados = interessados
        this.setState({ processo: processo, interessado: "" })
    }

    handleInteressadoChange = (e) => {
        this.setState({ interessado: e.target.value })
    }

    handleExcluirInteressado = (e, interessado) => {
        let index = this.state.processo.interessados.indexOf(interessado);
        if (index < 0) return;

        let processo =  this.state.processo;
        processo.interessados.splice(index, 1);
        this.setState({ processo: processo }) 
    }
    handleAssuntoChange = (e) => {
        let processo =  this.state.processo;
        processo.assunto = e.target.value;
        this.setState({ processo: processo }) 
    }

    handleDescricaoChange = (e) => {
        let processo =  this.state.processo;
        processo.descricao = e.target.value;
        this.setState({ processo: processo }) 
    }

    handleSalvarClick = (e) => {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        if (this.state.modoEdicao) {
            fetch(`http://localhost:3002/processo/${this.state.processo.id}`, { method: 'PUT', headers: headers, body: JSON.stringify(this.state.processo) })
                .then(() => this.setState({redirect: true}));
        } else {
            fetch(`http://localhost:3002/processo`, { method: 'POST', headers: headers, body: JSON.stringify(this.state.processo) })
                .then(() => this.setState({redirect: true}));
        }
    }

    render () {
        if (this.state.redirect) {
            return <Redirect to={{pathname: "/listagem", state: { pesquisa: this.state.processo.assunto }}} />
        }
        let elementoInteressados;
        if (this.state.processo.interessados) {
            elementoInteressados = this.state.processo.interessados.map( i => {
                return (
                    <div key={i} className="interessado">
                        <p>{i} <FontAwesomeIcon onClick={(e) => this.handleExcluirInteressado(e, i)} icon={faTimes}/></p>
                    </div>
                )
            }) 
        }

        return (
            <div className="cadastro-processo">
                <p className="titulo">Cadastro de processo</p>

                <div className="cadastro-campos cadastro-assunto">
                    <label>Assunto</label>
                    <input type="text" value={this.state.processo.assunto} onChange={this.handleAssuntoChange}/>
                </div>
                <div className="cadastro-campos cadastro-interessados">
                    <label>Interessados</label>
                    {elementoInteressados}
                    <input type="text" value={this.state.interessado} onChange={this.handleInteressadoChange} />
                    <button type="button" className="botao" onClick={this.handleAdicionarClick}>Adicionar</button>
                </div>
                <div className="cadastro-campos cadastro-descricao">
                    <label>Descrição</label>                    
                    <input type="text" value={this.state.processo.descricao} onChange={this.handleDescricaoChange}/>
                </div>
                <div className="cadastro-salvar">
                    <button type="button" className="botao botao-azul" onClick={this.handleSalvarClick}>Salvar</button>
                    <Link className="botao" to="/">Voltar</Link>
                </div>
            </div>
        )
    }
}

export default CadastroProcesso;