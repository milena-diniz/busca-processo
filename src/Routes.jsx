import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import TelaInicial from "./screen/TelaInicial/index";
import Listagem from "./screen/Listagem/index";
import CadastroProcesso from "./screen/CadastroProcesso/index"; 
import "./Routes.css"
import "./components/Botao/Botao.css"

class Routes extends React.Component  {
    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={TelaInicial} />
                    <Route path="/listagem" component={Listagem} />
                    <Route path="/cadastro-processo" component={CadastroProcesso} />
                </Switch>
            </BrowserRouter>
        )       
    }
}
export default Routes;