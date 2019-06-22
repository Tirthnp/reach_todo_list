import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Todos from './components/Todos';
import Header from './components/layout/Header'
import AddTodo from './components/AddTodo'
import about from './components/pages/about'
import './App.css';
//import uuid from 'uuid';
import axios from 'axios';

class App extends React.Component {
  
  state={
    todos:[]
  };

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res=> this.setState({ todos: res.data}))
  }
  markComplete=(id)=>{
    this.setState({ todos: this.state.todos.map(todo => {
      if (todo.id === id){
        todo.completed = !todo.completed;
      }
      
      return todo;
    })});
  }

  delTodo=(id)=>{
    this.setState({todos:[...this.state.todos.filter(todo => todo.id!==id)]});
    
  }

  addTodo=(title)=>{
   axios.post('https://jsonplaceholder.typicode.com/todos',{
     title:title,
     completed:false
   })
   .then(res =>(
    this.setState({todos: [...this.state.todos, res.data]})
   ))
    
  }
  render() {
    return (
      <Router> 
        <div className="App">
        <div className="container">
          <Header  />
          <Route exact path="/" render={props => (
            <React.Fragment>  
              <AddTodo addTodo={this.addTodo}/> 
              <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
            </React.Fragment>
          )} />
          <Route path='/about' component={about} />
          
        </div>
        
      </div>
      </Router>
      
    );
  }
}

export default App;
