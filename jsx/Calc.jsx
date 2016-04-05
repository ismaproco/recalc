import React from 'react';
import ReactDOM from 'react-dom';

require("../styles/style.less");

class Calc extends React.Component {
  constructor() {
    super();
    this.state = { operation: '', value: 0, memory: undefined };
  }

  changeOperation(cell){

    if(cell.props.rotate) {
      if(cell.props.text == '+'){
        this.setState({operationText: '*'});  
      }else {
        this.setState({operationText: '/'});  
      }
    } else {
      this.setState({operationText: cell.props.text}); 
    }

    if(!this.state.memory) {
      this.setState({memory: this.state.value, value: 0});  
    }
    
    this.setState({operation: (<span className={cell.props.rotate}>{cell.props.text}</span> )});
  }

  updateValue(event){
    let target = event.target;
    let spans = target.getElementsByTagName('span');
    let text, newValue, result;

    if(spans.length > 0 ) {
      text = spans[0].innerText;
    } else {
      if(target) {
        text = target.innerText;
      }
    }

    if(!isNaN(text)) {
      if( (this.state.value + text).length < 15 ) {
        newValue = this.state.value + text;
      } else {
        newValue = this.state.value;
      }  
      this.setState({value: parseInt( newValue )});
    } else {
      if(text === '='){
        console.log(this.state.operationText);
        
        switch(this.state.operationText) {
          case '+':
            result = this.state.memory + this.state.value;
          break;
          case '-':
            result = this.state.memory - this.state.value;
          break;
          case '*':
            result = this.state.memory * this.state.value;
          break;
          case '/':
            result = this.state.memory / this.state.value;
          break;
        }
        
        if(this.state.operationText) {
          if(result % 1 !== 0){
            result = parseFloat(result).toFixed(2);
          }
          
          this.setState( { memory: result, value: 0 } );

          

          console.log('result',this.state.operationText ,result);  
        }
      } else if( text == 'C' ) {
        this.setState( { memory: undefined, value: 0, operationText: undefined, operation: ''  } );
      }
    }
  }

  render() {
    let changeOperation = this.changeOperation.bind(this);
    let updateValue = this.updateValue.bind(this);

    return (
      <div>
        <div className="top">
          <Screen operation={this.state.operation} 
                  value={this.state.value}
                  memory={this.state.memory} />
        </div>  
        <div className="operations" >
            <Operations operationHandler={changeOperation}/>
        </div>
        <div className="commands">
            <Commands commandHandler={updateValue} />
        </div>
      </div>
    );
  }
}

const Screen = (props) => (
  <div>
    <div className="operation">{props.operation}</div>
    <div className="value">{props.value}</div>
    <div className="memory">{props.memory}</div>
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

const Commands = (props) => (<div onClick={props.commandHandler}>
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

ReactDOM.render(<Calc />, document.getElementById('main'));