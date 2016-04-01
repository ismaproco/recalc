import React from 'react';
import ReactDOM from 'react-dom';

require("../styles/style.less");

class Calc extends React.Component {
  constructor() {
    super();
    this.state = { operationText: '0' };
  }

  handleClick(elem) {
    console.log('elem click', elem);
    this.state.operationText = elem.val;
    this.setState({operationText: elem.val});
  }

  render() {

    var boundClick = this.handleClick.bind(this);

    return (
      <div>
        <h1>This is the calc</h1>
        {this.state.operationText}
        <CalcInput text={this.state.operationText} />
        <CalcButton text="1" val="1" type="number" onclick={boundClick} />
        <CalcButton text="2" val="2" type="number" onclick={boundClick} />
        <CalcButton text="3" val="3" type="number" onclick={boundClick} />
        <CalcButton text="4" val="4" type="number" onclick={boundClick} />
        <CalcButton text="5" val="5" type="number" onclick={boundClick} />
        <CalcButton text="6" val="6" type="number" onclick={boundClick} />
        <CalcButton text="7" val="7" type="number" onclick={boundClick} />
        <CalcButton text="8" val="8" type="number" onclick={boundClick} />
        <CalcButton text="9" val="9" type="number" onclick={boundClick} />
        <CalcButton text="0" val="0" type="number" onclick={boundClick} />
      </div>
      );
  }
}

const Screen = (props) => (
  <div>
    <div className="operation">+</div>
    <div className="value">1000</div>
    <div className="memory">69</div>
  </div>
);

const Operations = (props) => (<div>
    <Cell text="+" />
    <Cell text="-" />
    <Cell text="+" rotate="rotate"/>
    <Cell text="-" rotate="rotate"/>
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
    console.log('props', this.props);
    let props = this.props;
    let  _className = 'cell';
    if(props.optClass){
      _className+=' ' + props.optClass;
    }

    return (
      <div className={_className} >
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
      onChange={() => {console.log('somthing happened')}}>
    </input>
);

const CalcButton = (props) => (
   <button onClick={ () => { props.onclick(props) } }>
      {props.text}
    </button>
);

ReactDOM.render(<Calc />, document.getElementById('calc'));
ReactDOM.render(<Screen />, document.querySelector('.top'));
ReactDOM.render(<Operations />, document.querySelector('.operations'));
ReactDOM.render(<Commands />, document.querySelector('.commands'));