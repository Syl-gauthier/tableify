var tableify = require('./lib/tableify.js');
import React from 'react';
import ReactDOM from 'react-dom';

import {Tables, Table} from './react/tableManager.jsx';

tableify.addTable(4, 1);
tableify.addTable(5, 2);
tableify.addTable(5, 2);
tableify.addTable(5, 2);
tableify.addTable(5, 2);
tableify.addTable(5, 2);
tableify.addTable(5, 2);

console.log(tableify.getTables())

console.log(tableify.optimalDistribution());

class App extends React.Component {
  
  constructor() {
    super();
    this.state = {
      tables: tableify.getTables()
    };
  }
  
  addTable (korean, foreigner) {
    tableify.addTable(korean, foreigner);
    this.setState({tables: tableify.getTables()});
  }
  
  removeTable(letter) {
    tableify.removeTable(letter);
    this.setState({tables: tableify.getTables()});
  }
  
  render() {
    return (
        (<div>
          <button onClick={() => {this.addTable(1,1)}}>bouton</button>
          <Tables tables={this.state.tables}
            onClick={(i) => {this.removeTable(i)}}/>
        </div>)
      );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


