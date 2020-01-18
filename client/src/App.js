import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };
  
  componentDidMount() {
  }
  
  handleSubmit = async e => {
    e.preventDefault();    
    var response = "";    
    var body = "";
        if (this.state.post == 'consultar'){//Se ejecuta cuando el usuario oprime el boton consultar
          if(this.state.identificador && (this.state.identificador >= 0 && this.state.identificador <= 99999999999999)){
            response = await fetch('/api/hello/'+this.state.identificador, Request);
            body = await response.text();    
          }else{
            body = "Debe ingresar un identificador valido";
          }
        }else if (this.state.post == 'grabar'){//Se ejecuta cuando el usuario oprime el boton grabar consultar
          if(this.state.name && this.state.email){
              response = await fetch('/api/world', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: this.state.name , email: this.state.email}),  
              });
              body = await response.text();
          }else if (!this.state.name && !this.state.email){//validar si el nombre y el correo estan correctos
            body = "Debe ingresar un nombre y un correo electronico";
          }else if(!this.state.name){//validar si el nombre esta correctos
            body = "Debe ingresar un nombre";
          }else{//validar si el email esta correctos
            body = "Debe ingresar un email";
          }
        }
        this.setState({ responseToPost: body });
  };
  
render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <table border="1" align="center" width = "60%"> 
            <tr>
                <p><strong>Administrador de Usuarios:</strong></p>
                <br></br>
                <br></br>
                <p><strong>Crear usuario:</strong></p>
                Nombre de Usuario:
                <input
                  type="text"
                  name = "name"
                  value={this.state.nombre}
                  onChange={e => this.setState({ name: e.target.value })}
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Correo Electronico:
                <input
                  type="text"
                  name = "email"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                />
                <br></br><br></br>
                <button  onClick={() => {this.setState({ post: "grabar"})}}>Grabar</button>
                <br></br><br></br><br></br><br></br><br></br><br></br>
                <p><strong>Consultar usuario:</strong></p>
                Identificador del Usuario:
                <input
                  type = "text"
                  name = "identificador"
                  value={this.state.identificador}
                  onChange={e => this.setState({ identificador: e.target.value })}
                />
                <br></br><br></br>
                <button  onClick={() => {this.setState({ post: "consultar"})}}>Consultar</button>
                <br></br><br></br><br></br><br></br>
                <p>{this.state.responseToPost}</p>
                <br></br><br></br><br></br>
                <input
                  type="text"
                  hidden= "true"
                  name="post"
                  value="2"
                  onChange={e => this.setState({ post: e.target.value })}
                />
                <br></br><br></br>
              </tr>
          </table>
        </form>
      </div>
    );
  }
}
export default App;