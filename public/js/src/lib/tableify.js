'use strict';
var seedrandom = require('seedrandom');

var tableify = (function () {

  var rng = seedrandom('hello!');

  //initial data
  var tables = {}; // a:{total, foreign}
  var nbrForeigners;
  var nbrPeoples;

  //output
  var results;

  //util
  var alphabet = 'abcdefghijklmnopqrstuvwxyz0';

  //setting functions (function called before assignPeople())

  function addTable(korean, foreigner = 0, letter) {
    if (!letter) {
      var index = 0;
      do {
        letter = alphabet[index];
        index++;
        if (letter == 0) throw 'alphabet overflow... more than 26 tables ?';
      } while (tables[letter]);
    }
    tables[letter] = {
      nbrSeat: (korean + foreigner),
      foreign: foreigner,
    };
    setTotals();
    console.log(getTotals());
  }
  
  function removeTable(letter) {
    console.log('Table ' + letter + ' have been deleted.');
    delete tables[letter];
  }
  
  function getTables() {
    return Object.keys(tables).map(function(key) {
      tables[key].key = key;
      return tables[key];
    });
  }

  function getTotals() {
    return {
      nbrPeoples,
      nbrForeigners,
    };
  }

  function setTotals() {
    nbrPeoples = Object.keys(tables).reduce(function (acc, key) {
      return acc + tables[key].nbrSeat;
    }, 0);
    nbrForeigners = Object.keys(tables).reduce(function (acc, key) {
      return acc + tables[key].foreign;
    }, 0);
  }

  //functions linked to assignPeople()

  function assignPeople() {
    var distribution = [];
    var rounds = [];
    for (var i = 0; i < nbrPeoples; i++) {
      distribution[i] = [];
    }
    for (i = 0; i < 3; i++) {
      rounds[i] = newRound(distribution);
      distribution = applyRound(rounds[i], distribution);
    }
    return distribution;
  }

  function newRound(distribution) {
    var round = {};
    for (var key in tables) {
      round[key] = [];
    }
    distribution.forEach(function (person, index, array) {
      round[findBestTable(person, round, array)].push(index);
    });
    return round;
  }

  function findBestTable(person, round, array) {
    var tableRatios = {};
    var tableScores = {};
    for (var key in round) {
      let ratio = round[key].length / tables[key].nbrSeat;
      let score = round[key].reduce(function (acc, curr) {
        acc += compare(array[curr], person);
        return acc;
      }, 0);
      tableRatios[key] = ratio;
      tableScores[key] = score;
    }
    var minScore = Math.min.apply(null, Object.keys(tableScores).map(function (key) {
      return tableScores[key]
    }));
    var selectedTables = Object.keys(tableScores).filter(function (key) {
      return tableScores[key] === minScore;
    });
    var minRatio = Math.min.apply(null, selectedTables.map(function (key) {
      return tableRatios[key];
    }));
    selectedTables = selectedTables.filter(function (key) {
      return tableRatios[key] === minRatio;
    });
    return selectRandom(selectedTables);
  }

  function applyRound(round, distribution) {
    for (var key in round) {
      for (var i = 0; i < round[key].length; i++) {
        distribution[round[key][i]].push(key);
      }
    }
    return distribution;
  }

  function findPossibleTable(persons, tablesRepartition, personIndex) {
    var possibleTables = [];
    var tablesScores = tablesRepartition.map(function (table) {
      table.reduce(function (acc, curr) {
        return acc + compare(person[curr], personIndex);
      });
    });
    var possibleTables = tableRepartition.filter(function (elmt, index) {
      return tableScores[index] === Math.min.apply(null, tableScores);
    });
    var tablesRatio = possibleTables.map(function (table) {
      return table.length
    });
    tablesRepartition = tablesRepartition;

    return possibleTables;
  }

  function random(min, max) {
    return Math.floor(rng() * (max - min) + min);
  }

  function selectRandom(array) {
    return array[random(0, array.length)];
  }

  //return the number of time two people meet
  function compare(person1, person2) {
    var total = 0;
    for (var i = 0; i < Math.min(person1.length, person2.length); i++) {
      if (person1[i] === person2[i]) total++;
    }
    return total;
  }

  //return the number of people that meet more than once
  function check(result) {
    var score = result.reduce(function (acc, curr, currentIndex, array) {

      //compare curr to all the other (with higher index)
      array.map(function (compared, index) {
        if (currentIndex < index) {
          let total = compare(curr, compared);
          acc += (total > 1) ? (total - 1) : 0;
        }
      });
      return acc;
    }, 0);
    return score;
  }
  
  function optimalDistribution() {
    var distribs = [];
    for (var i = 0; i<20; i++) {
      var nextDistrib = {
        distrib: assignPeople()
      }
      nextDistrib.score = check(nextDistrib.distrib);
      distribs.push(nextDistrib);
    }
    var minScore = Math.min.apply(null, distribs.map(function(distrib) {
      return distrib['score'];
    }));
    
    var results = distribs.filter(function(distrib) {
      return distrib['score'] === minScore;
    });
    
    return results[0];
  }
  
  function getComplexity() {
    var visibility = (nbrPeoples/Object.keys(tables).length) - 1;
    console.log(visibility);
    var globalVisibility = visibility * 3;
        console.log(globalVisibility);

    var complexity = globalVisibility/nbrPeoples; // when >1 perfect score impossible
        console.log(complexity);

    return complexity;
  }

  return {
    addTable,
    check,
    optimalDistribution,
    getComplexity,
    getTables,
    removeTable
  }
})();

module.exports = tableify;
