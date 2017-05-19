import React from 'react';
import ReactDOM from 'react-dom';

function Tables(props) {  
  var lignes = props.tables.map((table) => {
    return (
      <Table key={table.key}
        table={table} 
        onRemove={(i) => props.onRemove(i)} />
    );
  });
  
  return (
    <table>
      <tbody>
        <tr>
          <th>Total</th>
          <th>Foreigners</th>
          <th>Delete</th>
        </tr>
        {lignes}
        <AddTable onAdd={(i) =>props.onAdd(i)} />
      </tbody>
    </table>
  );
}

function Table(props) {
  return (
    <tr>
      <td>{props.table.nbrSeat}</td>
      <td>{props.table.foreign}</td>
      <td><button onClick={() => props.onRemove(props.table.key)}>X</button></td>
    </tr>
  );
}


class AddTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: '',
      foreigner: ''};
    
    this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }
  
  render() {
    return (<tr>
      <td><input type='text' placeholder='total' id='total' value={this.state.total} onChange={this.handleChange}></input></td>
      <td><input type='text' placeholder='foreigners' id='foreigner' value={this.state.foreigner} onChange={this.handleChange}></input></td>
      <td><button onClick={() => this.props.onAdd(this.state)}>add</button></td>
    </tr>);
  }
}

export {Tables, Table};

