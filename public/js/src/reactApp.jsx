var tableify = require('./lib/tableify.js');
import React from 'react';
import ReactDOM from 'react-dom';

tableify.addTable(4, 1);
tableify.addTable(5, 2);
tableify.addTable(5, 2);
tableify.addTable(5, 2);
tableify.addTable(5, 2);
tableify.addTable(5, 2);
tableify.addTable(5, 2);

console.log(tableify.optimalDistribution());

class App extends React.Component {
  render() {
    return <p>bonjour</p>;
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


