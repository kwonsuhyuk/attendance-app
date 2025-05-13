import "./App.css";
import { RouterProvider } from "react-router-dom";
import "./firebase";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/common/Loading";
import MainRoutes from "./routes/MainRoutes";

const App = () => {
  return <RouterProvider router={MainRoutes} fallbackElement={<Loading />} />;
};

export default App;
