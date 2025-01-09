import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NaviagationRoutes from "./routes/route";

function App() {
  axios.defaults.withCredentials = true;

  return (
    <div style={{ width: "100vw" }}>
      <NaviagationRoutes />
    </div>
  );
}

export default App;
