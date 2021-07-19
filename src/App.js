import { useState } from "react";
import './App.css';

/*eslint-disable no-eval */

function App() {
  let [expression, setexpression] = useState("");
  let [oldexpression, setoldexpression] = useState("");
  let [prev, setprev] = useState("ANS");
  let numerics = new Set("0123456789.");
  let operators = new Set("+-*/%");
  let Button = ["(", ")", "%", "C", "7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"];

  let evaluateExpression = function () {
    let evaluation = eval(expression)
    setexpression(evaluation);
    setoldexpression(expression);
    setprev("ANS");
  }


  let putNumerics = function(value){
    if(prev === "ANS"){
      setexpression(value);
    }else{
      setexpression(expression + value);
    }
    setprev("NUM");
  }

  let putDelete = function()
  {
    if(prev === "ANS"){
      setexpression("")
    }else{
      setexpression(expression.slice(0, -1));
      setprev("DEL");
    }
  }

  let putOperators = function(value){
    if(prev !== "OP")
    {
      setexpression(expression + value);
    }else if(prev === "OP")
    {
      setexpression(expression.slice(0,-1) + value)
    }
    setprev("OP");
  }

  

  let HandleKeyUp = function (event) {
    console.log(event.key);
    if (event.key === "Backspace") {
      putDelete();
    }
    else if (numerics.has(event.key)) {
      putNumerics(event.key);
    }
    else if (operators.has(event.key)) {
      putOperators(event.key);
    }
    else if (event.key === "Enter") {
      evaluateExpression();
    }
  }
  return (
    <div
      className="App"
      tabIndex={0}
      onKeyUp={HandleKeyUp}
      style={{
        width: "100%",
        background: "#FADBD8 ",
        height: "1000px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <h1>Calculator In React</h1>
      <div
        style={{
          width: "320px",
          background: "#ff6347",
          height: "100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
          padding: "20px",
          borderRadius: "10px"
        }}

      >
        <h4>{oldexpression}</h4>
        <h1>{expression}</h1>
      </div>
      <div
        style={{
          width: "320px",
          margin: "20px",
          background: "#ff6347",
          height: "420px",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center",
          padding: "20px",
          borderRadius: "10px",
          flexWrap: "wrap",
        }}
      >
        {Button.map(function (Buttonvalue, idx){
          return <button className="btn"
          onClick = {function () {
            if (Buttonvalue === "=") {
              evaluateExpression();
            } else if (Buttonvalue === "C") {
              putDelete();
            }else if(numerics.has(Buttonvalue)){
              putNumerics(Buttonvalue);
            }else if(operators.has(Buttonvalue)){
              putOperators(Buttonvalue);
            }
            
          }}
          style={
            {
              background: "#000000",
              color: "#ffffff",
              border: "none",
              width :"18.5%",
              padding: "25px",
              textalign: "center",
              textdecoration: "none",
              margin : "10px",
              borderRadius : "5px",
            }
          }
         >{Buttonvalue}</button>
        })}

        <h3>@Develop By igDfuse</h3>
      </div>
    </div>
  );
}

export default App;
