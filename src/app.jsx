import React from "react";
import * as ReactDOM from "react-dom";

const App = () => {
  React.useEffect(() => {
    console.log("Hello world");
  }, []);
  return <h1>Hello world</h1>;
};

ReactDOM.render(<App />, document.getElementById("root"));
