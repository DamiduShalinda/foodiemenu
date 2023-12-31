import Navbar from "./components/Navbar"
import ViewAllMeals from "./components/ViewAllMeals"
import ProtectedRoute from "./context/ProtectedRoute"
import ProtectedRouteUser from "./context/ProtectedRouteUser"
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
      <Route path="/allitems" element={<ViewAllMeals/>}/>
      <Route path="/account" element={<ProtectedRouteUser><Account/></ProtectedRouteUser>}/>
      <Route path="/admin" element={<ProtectedRoute><AddItems/></ProtectedRoute>}/>
    </Routes>
    </>
  )
}

export default App
