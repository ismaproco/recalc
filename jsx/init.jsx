import React from 'react';
import ReactDOM from 'react-dom';
 
class Init extends React.Component {
  render() {
    return <h1>Hello React!</h1>
  }
}
 
ReactDOM.render(<Init />, document.getElementById('main'));