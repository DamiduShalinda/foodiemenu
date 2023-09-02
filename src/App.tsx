import Navbar from "./components/Navbar"
import ProtectedRoute from "./context/ProtectedRoute"
import Account from "./pages/Account"
import AddItems from "./pages/AddItems"
import Categories from "./pages/Categories"
import Home from "./pages/Home"
import { Route , Routes } from "react-router-dom"


function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/categories" element={<Categories/>}/>
      <Route path="/account" element={<Account/>}/>
      <Route path="/admin" element={<ProtectedRoute><AddItems/></ProtectedRoute>}/>
    </Routes>
    </>
  )
}

export default App
