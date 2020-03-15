import React , { Component } from 'react';
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      min : 25,
      sec : 0,
      break : 5,
      session : 25,
      title : "Session",
      start : false,
      activated : false
    };
    this.handleBreakDown = this.handleBreakDown.bind(this);
    this.handleBreakUp = this.handleBreakUp.bind(this);
    this.handleSessionDown = this.handleSessionDown.bind(this);
    this.handleSessionUp = this.handleSessionUp.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleReset = this.handleReset.bind(this);
  };

  handleBreakDown(){
    if(this.state.start === true || this.state.activated === true){
      return null
    }else{
      if(this.state.break === 1){
        return null
      }else{
        this.setState({
          ...this.state,
          break : this.state.break - 1
        });
      };
    };
  };

  handleBreakUp(){
    if(this.state.start === true || this.state.activated === true){
      return null
    }
    else{
      if(this.state.break === 30){
        return null
      }else{
        this.setState({
          ...this.state,
          break : this.state.break + 1
        });
      };
    };
  };

  handleSessionDown(){
    if(this.state.start === true || this.state.activated === true){
      return null
    }else{
      if(this.state.session === 1){
        return null
      }else{
        this.setState({
          ...this.state,
          session : this.state.session - 1,
          min : this.state.min - 1
        });
      };
    };  
  };

  handleSessionUp(){
    if(this.state.start === true || this.state.activated === true){
      return null
    }else{
      if(this.state.session === 60){
        return null
      }else{
        this.setState({
          ...this.state,
          session : this.state.session + 1,
          min : this.state.min + 1,
          sec : 0
        });
      };
    };
  };

  handleStart(){
    let breakLength = this.state.break;
    let sessionLength = this.state.session;
    //start
    if(this.state.start === false){
      this.setState({...this.state , start : true , activated : true});
      this.timer = setInterval(()=>{
        //- sec timer
        this.setState({
          ...this.state ,
          sec : this.state.sec - 1
        });
        //if sec reach 0, will jump back to 59 sec and -1 to min
        if(this.state.sec === -1){
          this.setState({...this.state , sec : 59 , min : this.state.min - 1})
        }
        //if min reach 0 , will become break time and start break timer
        if(this.state.min === 0 && this.state.sec === 0){
          this.audio.play();
          if(this.state.title === "Session"){
            this.setState({
              ...this.state ,
              title : "Break",
              min : breakLength
            });
          }else{
            this.setState({
              ...this.state,
              title : "Session",
              min : sessionLength
            });
          };
        };
      } , 1000)
    }else{//pause
      this.setState({...this.state , start : false});
      clearInterval(this.timer);
    };
  };

  handleReset(){
    this.setState({
      min : 25,
      sec : 5,
      break : 5,
      session : 25,
      title : "Session",
      start : false,
      activated : false
    });
    clearInterval(this.timer);
  };

  render(){
    return (
      <div className="App">
        <h1>Pomodoro Clock</h1>

        <div id="controlBox">

          <div id="breakBox">
            <h2>Break Length</h2>
            <div>
              <button onClick={this.handleBreakUp} className="btn"><i className="fas fa-arrow-up"></i></button>
              <h1>{this.state.break}</h1>
              <button onClick={this.handleBreakDown} className="btn"><i className="fas fa-arrow-down"></i></button>
            </div>
            
          </div>

          <div id="sessionBox">
            <h2>Session Length</h2>
            <div>
              <button onClick={this.handleSessionUp} className="btn"><i className="fas fa-arrow-up"></i></button>
              <h1>{this.state.session}</h1>
              <button onClick={this.handleSessionDown} className="btn"><i className="fas fa-arrow-down"></i></button>
            </div>
          </div>

        </div>


        <div id="session">
          <h2>{this.state.title}</h2>
          <h1>{this.state.min < 10 ? "0" + this.state.min : this.state.min} : {this.state.sec < 10 ? "0" + this.state.sec : this.state.sec }</h1>
          <button className="btn" onClick={this.handleStart}><i className="fas fa-play"></i><i className="fas fa-pause"></i></button> <button className="btn"  onClick={this.handleReset}><i className="fas fa-sync"></i></button>
        </div>
        <audio ref={ref=>this.audio = ref} src="./sound/oof.mp3"></audio>
      </div>
    );
  }
}

export default App;
