import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import "./CampoBusca.css"

class CampoBusca extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            texto: props.texto || "", 
            onSearch: props.onSearch
        }
    }
    handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            this.executeSearch(e)
        }
    }
    handleChange = (e) => {
        this.setState({ texto: e.target.value })
    }

    handleClick = (e) => {
        e.preventDefault();
        this.executeSearch(e)
    }

    executeSearch (e) {      
        this.state.onSearch(e, this.state.texto)
    }

    render () {
        
        
        return (
            <div className="campo-busca">
                <input type="text" value={this.state.texto} onChange={this.handleChange} onKeyPress={this.handleKeyPress} placeholder="Pesquise por uma informação do processo"/>
                <FontAwesomeIcon onClick={this.handleClick} icon={faSearch}/>
            </div>
        )
    }
}

export default CampoBusca;