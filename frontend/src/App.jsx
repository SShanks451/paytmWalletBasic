import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/signin",
      element: <Signin />,
    },
    {
      path: "/dashboard",
      element: <Dashboard balance={"50,000"} />,
    },
    {
      path: "/send",
      element: <SendMoney />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
