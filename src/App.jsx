import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer";

function App() {
  return (
    <div className="container">
      <NavBar />
      <ItemListContainer greeting="Welcome to Spice and Dance!" />
    </div>
  );
}

export default App;
