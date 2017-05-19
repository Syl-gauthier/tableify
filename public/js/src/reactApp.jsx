var tableify = require('./lib/tableify.js');
import React from 'react';
import ReactDOM from 'react-dom';

import {Tables, Table} from './react/tableManager.jsx';

tableify.addTable(4, 1);
tableify.addTable(5, 2);

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
  
  addTable(state) {
    console.log(state.total + '  ' + state.foreigner);
    var korean = (state.total - state.foreigner);
    console.log(korean);
    tableify.addTable(korean, state.foreigner);
    this.setState({tables: tableify.getTables()});
  }
  
  calculate() {
    console.log(tableify.optimalDistribution());
  }
  
  render() {
    return (
        (<div>
          <Tables tables={this.state.tables}
            onRemove={(i) => this.removeTable(i)}
            onAdd={(i) => this.addTable(i)} />
          <button onClick={()=> this.calculate()}>CALCULATE</button>
        </div>)
      );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


