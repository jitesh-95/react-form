import "./App.css";
import Form from "./components/Form";
import DataTable from "./components/DataTable";
import { useState } from "react";

function App() {
  // const handleClick = () => {};
  
  const [count, setCount] = useState(0)
  
  return (
    <div className="App">
      <Form />
      <p className="dialog">
        Click on Submit and then Uplaod to see data in Table.
      </p>
      <DataTable  setCount={setCount} count={count} />
    </div>
  );
}

export default App;
