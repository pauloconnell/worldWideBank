const React = require('react');
const Link = require('react-router-dom').Link

/* the main page for the about route of this app */
const Open = function(props) {
  var inputText="";
  const change=(evt)=>{
    console.log(evt.target.value);
    //props.handleChange(evt.target.value);
    inputText=evt.target.value;
  }
  
  return (
    <div>
      <h1>World Wide Bank</h1>

      <p>Please enter account number</p>
      
      <input value={inputText} onChange={change}></input>
      <input type="submit"></input>
    {inputText}
    </div>
  );
}

module.exports = Open;