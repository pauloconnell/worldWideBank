const React = require("react");
const Link = require("react-router-dom").Link;

/* the main page for the about route of this app */
function Converter(props) {
  console.log("Converter got props", props);
  return (
    <div>
      <h1>Convert Foreign Currency</h1>
      <h3>
        Enter Foreign Currency amount below, then click which currency{" "}
        <h2>
          <u>{props.currency}</u>
        </h2>
        <h3>Foreign Cash</h3>
        <label>
          First: Input amount of Foreign Currency:
          <input
            type="text"
            name="foreign"
            value={props.inputForeign}
            onChange={props.handleChange}
            required
          />
        </label>
        <label>Second: Click on which currency you are using:</label>
        <button id="us" onClick={props.handleButton}>
          US Dollars
        </button>
        <button id="mp" onClick={props.handleButton}>
          Mexican Peso
        </button>
        <br />
        The amount will be converted to canadian and appear above-ready for
        deposit, withdrawl, or transfer(in Canadian ofcourse).
      </h3>
    </div>
  );
}

module.exports = Converter;
