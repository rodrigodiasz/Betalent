import { router } from "./router";
import { RouterProvider } from "react-router-dom";

function App() {
  return <div className="bg-gray-00">
    <RouterProvider router={router} />
  </div>;
}

export default App;