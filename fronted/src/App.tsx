

import { ToastContainer } from "react-toastify";
import { AppRouter } from "./routes/AppRoutes";


export default function App() {


  return (
    <>

      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>


  );
}