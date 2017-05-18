import React from 'react';
import ReactDOM from 'react-dom';

function Tables(props) {  
  var lignes = props.tables.map((table) => {
    return (
      <Table key={table.key}
        table={table} 
        onClick={(i) => {props.onClick(i)}} />
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
      </tbody>
    </table>
  );
}

function Table(props) {
  return (
    <tr>
      <td>{props.table.nbrSeat}</td>
      <td>{props.table.foreign}</td>
      <td><button onClick={() => props.onClick(props.table.key)}>X</button></td>
    </tr>
  );
}

export {Tables, Table};

