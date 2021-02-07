import React from "react";
import "./Card.css";

class Card extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            processo: props.processo,
            processoAberto: props.processoAberto,
            onClick: props.onClick
        }
    }   

    handleClick = (e) => { 
        this.state.onClick (e, this.state.processo);
    }

    render () {

        let classCard="card-row";
        if (this.state.processoAberto) {
            classCard = classCard + " card-row-resumido";
            if (this.state.processoAberto.id === this.state.processo.id) {
                classCard = classCard + " card-row-ativo";
            }
        }           

        return (
            <div className={classCard} onClick={this.handleClick}> 
                
                <div className="card-column card-column-numero">
                    <p className="card-title">Número</p>
                    <p className="card-text">{this.state.processo.numero}</p>
                </div>

                <div className="card-column card-column-assunto">
                    <p className="card-title">Assunto</p>
                    <p className="card-text">{this.state.processo.assunto}</p>
                </div>

                <div className="card-column card-column-interessado">
                    <p className="card-title">Interessado</p>
                    <p className="card-text">{this.state.processo.interessados[0]}</p>
                </div>

                <div className="card-column card-column-descricao">
                    <p className="card-title">Descrição</p>
                    <p className="card-text">{this.state.processo.descricao}</p>
                </div>
            </div>
        )
    }
}

export default Card;


