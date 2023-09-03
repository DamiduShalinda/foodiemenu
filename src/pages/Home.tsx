import ViewAllMeals from "../components/ViewAllMeals";
import ViewRecommendedMeals from "../components/ViewRecommendedMeals";
import { useAuth } from "../context/Auth";
import React from 'react'



const Home : React.FC = () => {

  const { isAuth } = useAuth();


  return (
  <>
  {isAuth ? <ViewRecommendedMeals/> : <ViewAllMeals/>}
  </>
  )
}

export default Home