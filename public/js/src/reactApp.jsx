import tableify from './lib/tableify.js';
import React from 'react';
import ReactDOM from 'react-dom';

import Tables from './react/tableManager.jsx';
import Distribution from './react/distribution.jsx';

tableify.addTable(4, 1);
tableify.addTable(5, 2);

class App extends React.Component {
  
  constructor() {
    super();
    this.state = {
      tables: tableify.getTables(),
      distribution: 0
    };
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
    var distribution  = tableify.optimalDistribution().distrib;
    console.log(distribution);
    this.setState({distribution: distribution});
  }
  
  render() {
    return (
        (<div>
          <Tables tables={this.state.tables}
            onRemove={(i) => this.removeTable(i)}
            onAdd={(i) => this.addTable(i)} />
          <button onClick={()=> this.calculate()}>Compile</button>
          <Distribution distrib={this.state.distribution} />
        </div>)
      );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


