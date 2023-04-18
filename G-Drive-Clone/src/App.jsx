import {BrowserRouter , Routes , Route } from "react-router-dom"
import LoginPage from "./Component/login"
import RegistrationPage from "./Component/RegistrationPage"
import { ToastContextProvider } from "./Component/context/ToastContext"
import HomeUploadPage from "./Component/home";
import FileList from "./Component/homeList";


const App = () =>{
  return (
    <BrowserRouter>
    <ToastContextProvider>
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/register" element={<RegistrationPage/>}/>
      <Route path="/upload" element={<HomeUploadPage/>}/>
      <Route path="/list" element={<FileList/>}/>
    </Routes>
    </ToastContextProvider>
    </BrowserRouter>
  )
}
export default App