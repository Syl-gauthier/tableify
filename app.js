var tableify = require('./tableify.js');



tableify.addTable(4, 1);
tableify.addTable(5, 2);
tableify.addTable(5, 2);
tableify.addTable(5, 2);
tableify.addTable(5, 2);
tableify.addTable(5, 2);
tableify.addTable(5, 2);

console.log(tableify.optimalDistribution());