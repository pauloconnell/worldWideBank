const React = require('react');
const ReactDOM = require('react-dom');
const Route = require('react-router-dom').Route;
const BrowserRouter = require('react-router-dom').BrowserRouter;
const hashHistory = require('react-router-dom').hashHistory;


/* Import Components */

const About = require('./components/About');

const MainBank=require('./components/MainBank');

//<Route exact path="/" component={HelloWorld}/>
      //<Route path="/about" component={About}/>

ReactDOM.render((
  <BrowserRouter>
    <div>
      <MainBank />
    </div>
  </BrowserRouter>), document.getElementById('main'));