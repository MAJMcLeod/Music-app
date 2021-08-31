import './App.css';
import Body from './Components/Body';
import Login from './Components/Login'
//importing appropriate react components and stylesheets

const code = new URLSearchParams(window.location.search).get('code');
// variable used to store the code that is sent by the API via the 
// http string

if (!JSON.parse(sessionStorage.getItem('favItems'))) {
  window.sessionStorage.setItem("favItems", JSON.stringify([]));
}
// if there are no items in session storage then it is set to the default
// value of an empty array so that it is never truly empty, stopping many 
// future errors 

function App() {

  return (
    <div className="App">
      {code
        ? <Body code={code} />
        : <Login />}
        {/* conditional render statement */}
    </div>
  );
}

export default App;
