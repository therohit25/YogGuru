import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Routes from "./Routes/route";

function App() {
  axios.defaults.withCredentials = true;

  return (
    <div style={{ width: "100vw" }}>
      <Routes />
    </div>
  );
}

export default App;
