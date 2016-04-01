import React from 'react';
import ReactDOM from 'react-dom';

require("../styles/style.less");

class Calc extends React.Component {
  constructor() {
    super();
    this.state = { operation: '' };
  }

  handleClick(elem) {
    console.log('elem click', elem);
    this.state.operationText = elem.val;
    this.setState({operationText: elem.val});
  }

  changeOperation(cell){
    console.log('operation', cell, this);
    this.setState({operation: (<span className={cell.props.rotate}>{cell.props.text}</span> )});
  }

  render() {

    let boundClick = this.handleClick.bind(this);
    let changeOperation = this.changeOperation.bind(this);

    return (
      <div>
        <div className="top">
          <Screen operation={this.state.operation} />
        </div>  
        <div className="operations" >
            <Operations operationHandler={changeOperation}/>
        </div>
        <div className="commands">
            <Commands />
        </div>
      </div>
    );
  }
}

const Screen = (props) => (
  <div>
    <div className="operation">{props.operation}</div>
    <div className="value">1000</div>
    <div className="memory">69</div>
  </div>
);

const Operations = (props) => (
  <div>
    <Cell text="+" cellHandler={props.operationHandler} />
    <Cell text="-" cellHandler={props.operationHandler}/>
    <Cell text="+" rotate="rotate" cellHandler={props.operationHandler}/>
    <Cell text="-" rotate="rotate" cellHandler={props.operationHandler}/>
  </div>
);

const Commands = (props) => (<div>
    <div className="row">
      <Cell text="1" />
      <Cell text="2" />
      <Cell text="3" />
    </div>
    <div className="row">
      <Cell text="4" />
      <Cell text="5" />
      <Cell text="6" />
    </div>
    <div className="row">
      <Cell text="7" />
      <Cell text="8" />
      <Cell text="9" />
    </div>
    <div className="row">
      <Cell text="C" optClass="dark"/>
      <Cell text="0" />
      <Cell text="=" optClass="action"/>
    </div>
  </div>
);

class Cell extends React.Component {
  constructor() {
    super();
  }

  render(){
    let props = this.props;
    let  _className = 'cell';
    if(props.optClass){
      _className+=' ' + props.optClass;
    }

    let cellHandler = (args) => {
      if(props.cellHandler) {
        props.cellHandler(this);
      }
    }

    return (
      <div className={_className} onClick={cellHandler}>
          <p>
            <span className={props.rotate}>
            {props.text}</span>
          </p>
      </div>
    );
  }
}

const CalcInput = (props) => (
   <input type="text" value={props.text} 
      onChange={ () => {console.log('somthing happened')} }>
    </input>
);

const CalcButton = (props) => (
   <button onClick={ () => { props.onclick(props) } }>
      {props.text}
    </button>
);

ReactDOM.render(<Calc />, document.getElementById('main'));