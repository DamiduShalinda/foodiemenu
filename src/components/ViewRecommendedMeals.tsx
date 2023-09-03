import React, { useEffect } from 'react'
import { collection , onSnapshot, query,  where } from '@firebase/firestore';
import { useAuth } from '../context/Auth';
import { db } from '../FirebaseConfig';
import axios from 'axios';

interface inputtype {
    user_input: string;
}

interface outputtype {
    recommended_meals: string[];
}

const ViewRecommendedMeals:React.FC = () => {

    const { user} = useAuth();
    const [ mealName , setMealName ] = React.useState<outputtype>();
    const [ loading , setLoading ] = React.useState<boolean>(true);
    const userDataRef = collection(db , 'userData');
    const queryUserData = query(userDataRef , where('user_id' , '==' , user?.uid));
    const url = 'http://localhost:5000/recommend_meals'

    useEffect(() => {

        console.log("loading");

        const unsubscribe = onSnapshot(queryUserData , (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                favorite_ingrediants: doc.data().favorite_ingrediants,
                id: doc.id,
            }));
            const strfav_ing = formatArrayToJson(data[0].favorite_ingrediants);
            getRecommendedMeals(strfav_ing).then(() => {
                setLoading(false);
            }
            );
        })
        return unsubscribe;
        
    }, [])



    function formatArrayToJson(inputArray: string[]): inputtype {
        const user_input = inputArray.join(" , ");
        const result = { user_input };
        return result;
      }


    const getRecommendedMeals = async (data : inputtype) => {

        const res  = await axios.post(url ,data)
        setMealName(res.data);
        console.log(mealName);
    }

    
    
  return (
    <>
    {loading ?
    <div className='flex justify-center items-center w-full h-screen '>
    <h1>Loading...</h1>
    </div> :
    <div  className='flex justify-center items-center w-full h-screen flex-col'>
        {mealName?.recommended_meals.map((meal , index) => (
            <div key={index}>
                <h1>{meal}</h1>
            </div>
        ))}
    </div>
    }
    </>
  )
}

export default ViewRecommendedMeals