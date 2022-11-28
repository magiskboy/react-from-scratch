import React from "react";
import * as ReactDOM from "react-dom";
import './app.scss';

const App = () => {
  React.useEffect(() => {
    console.log("Hello world");
  }, []);
  return <h1>Hello world 1</h1>;
};

ReactDOM.render(<App />, document.getElementById("root"));
