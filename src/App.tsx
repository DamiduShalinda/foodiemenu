import Navbar from "./components/Navbar"
import Account from "./pages/Account"
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
    </Routes>
    </>
  )
}

export default App
