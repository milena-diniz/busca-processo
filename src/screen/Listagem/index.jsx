import React from "react";
import { Link } from "react-router-dom";
import CampoBusca from "../../components/CampoBusca";
import Card from "../../components/Card/index";
import Processo from "../../components/Processo/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import "./Listagem.css";

class Listagem extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            pesquisa: props.location.state.pesquisa,
            processos: [] ,
            processoAberto: null,
            carregando: true
        }   
    }

    componentDidMount() {
        this.buscarProcessos(this.state.pesquisa);
    }
    buscarProcessos (pesquisa) {
        fetch(`http://localhost:3002/processo?q=${pesquisa}`)
            .then(response => response.json())
            .then(data => this.setState({ processos: data, carregando: false }));
    }

    handleCardClick = (e, processo) => {
        this.setState({ processoAberto: processo })
    }

    handleProcessoExit = (e) => {
        this.setState({ processoAberto: null })
    }
    handleProcessoDelete = (e) => {
        this.buscarProcessos(this.state.pesquisa);
    }

    handleCampoBuscaSearch = (e, texto) => {
        this.setState({pesquisa: texto, carregando: true});
        this.buscarProcessos(texto)
    } 

    getCardKey = (p) => {
        let key = p.id;
        if (this.state.processoAberto){
            key = key + this.state.processoAberto.id
        } 
        return key
    
    }

    render () {
        let classListagem = "listagem-itens";
        let elementoDetalhes;
        if (this.state.processoAberto) {
            classListagem = classListagem + " listagem-itens-resumido";
            elementoDetalhes = (
                <div className="listagem-detalhes">
                    <Processo key={this.state.processoAberto.id} processo={this.state.processoAberto} onExit={this.handleProcessoExit} onDelete={this.handleProcessoDelete} />
                </div>
            )
        }

        let elementoConteudo;
        if (this.state.carregando) {
            elementoConteudo = (  
                <div className="listagem-carregando">
                    <FontAwesomeIcon icon={faSpinner} pulse /> 
                </div>
            )
        } else {
            elementoConteudo = (
                <div className={classListagem}>
                    {this.state.processos.map(p => { 
                        return <Card key={this.getCardKey(p)} processo={p} processoAberto={this.state.processoAberto} onClick={this.handleCardClick} /> 
                    })}
                </div>
            );
        }
        
        return (   
            <div className="listagem">    
                <div className="listagem-cabecalho">      
                    <p className="listagem-cabecalho-label">Busca de processo</p>       
                    <CampoBusca texto={this.state.pesquisa} onSearch={this.handleCampoBuscaSearch} />
                    <Link to="/cadastro-processo" className="botao">Novo</Link>   
                </div> 
                <div className="listagem-conteudo">
                    {elementoConteudo} 
                    {elementoDetalhes}
                </div>
            </div>     
        ) 
    } 
}
export default Listagem;