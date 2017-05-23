import React from 'react';

function Distribution(props) {
  
  
  
  
  if (props.distrib) {
    var lignes = props.distrib.map((list, key) => { 
      list = list.join(' / ');
      return (<tr key={key}><td>{key}</td><td>{list}</td></tr>);
    });
    
    return (
      <table>
        <tbody>
          <tr>
            <th>person</th>
            <th>Table 1, 2, 3...</th>
          </tr>
          {lignes}
        </tbody>
      </table>
    );
  }
  return <div></div>;
}

export default Distribution;