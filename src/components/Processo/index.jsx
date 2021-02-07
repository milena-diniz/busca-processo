import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {Redirect} from "react-router-dom";
import "./Processo.css"

class Processo extends React.Component {
    constructor (props) {
        super (props)
        this.state = { 
            editar: false, 
            processo: props.processo,
            onExit: props.onExit,
            onDelete: props.onDelete
        }
    }

    handleClick = (e) => {
        this.state.onExit(e);
    }

    handleClickRemover = (e) => {
        if (window.confirm("Tem certeza que deseja remover este processo? "))
        {
            fetch(`http://localhost:3002/processo/${this.state.processo.id}`, { method: 'DELETE' })
                .then(() => {
                    this.state.onExit(e);
                    this.state.onDelete(e)
                })
        }
    }

    handleClickEditar = (e) => {
        this.setState({ editar: true})
    }

    render () {

        if (this.state.editar) {
            return <Redirect to={{pathname: "/cadastro-processo", state: { modoEdicao: true, processo: this.state.processo }}} />
        }

        let elementoInteressados = this.state.processo.interessados.map (i => {
            return <p key={i} className="processo-texto">{i}</p>
        })
        return (
            <div className="processo">
                <div className="processo-header">

                    <div className="processo-numero-data">
                        <div className="processo-numero">
                            <p className="processo-titulo">Processo</p>
                            <p className="processo-destaque">{this.state.processo.numero}</p>
                        </div>

                        <div className="processo-data">
                            <p className="processo-titulo">Data</p>
                            <p className="processo-destaque">{this.state.processo.entrada}</p>
                        </div>
                    </div>

                    <div className="processo-assunto">
                        <p className="processo-titulo">Assunto</p>
                        <p className="processo-destaque">{this.state.processo.assunto}</p>
                    </div>
                    <div className="processo-fechar" onClick={this.handleClick}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </div>
                </div>

                <div className="processo-interessado">
                    <p className="processo-titulo">Interessados</p>
                    {elementoInteressados}
                </div>

                <div className="processo-descricao">
                    <p className="processo-titulo">Descrição</p>
                    <p className="processo-texto">{this.state.processo.descricao}</p>
                </div>

                <div className="processo-botoes">
                    <button className="botao" onClick={this.handleClickRemover}>Remover</button>
                    <button className="botao" onClick={this.handleClickEditar}>Editar</button>
                </div>
            </div>
        )
    }
}

export default Processo;