import React, { useEffect } from 'react'
import { collection  , where , query , serverTimestamp , addDoc, onSnapshot} from '@firebase/firestore';
import { db } from '../FirebaseConfig';
import { useAuth } from '../context/Auth';
import AddUserData from '../components/AddUserData';

export interface userdata {
    favorite_ingrediants: string;
    health_conditions: string;
    prefered_diet_category: string;
}

interface userDataProps {
  favorite_ingrediants: string[];
  health_conditions: string[];
  prefered_diet_category: string[];
  id: string;
}


const Account:React.FC = () => {

  const { user } = useAuth();
  const [ loading , setLoading ] = React.useState<boolean>(true);
  const userDataRef = collection(db , 'userData');
  const queryUserData = query(userDataRef , where('user_id' , '==' , user?.uid));
  const [ userData , setUserData ] = React.useState<userDataProps[]>([]);

  
  

  useEffect(() => {

    console.log("loading");

    const unsubscribe = onSnapshot(queryUserData , (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
            favorite_ingrediants: doc.data().favorite_ingrediants,
            health_conditions : doc.data().health_conditions,
            prefered_diet_category : doc.data().prefered_diet_category,
            id: doc.id,
        }));
        setUserData(data);
        setLoading(false);
    })
    return unsubscribe;
    
}, [])
  
  const onSubmit = async (data: userdata) => {

    const favorite_ingrediants = data.favorite_ingrediants.split(',').map((ingredient) => ingredient.trim());
    const health_conditions = data.health_conditions.split(',').map((condition) => condition.trim());


    const newData = {
      createdAt: serverTimestamp(),
      prefered_diet_category: data.prefered_diet_category,
      favorite_ingrediants: favorite_ingrediants,
      health_conditions: health_conditions,
      user_id: user?.uid,
      user_name: user?.displayName
    }

    try {
      const res = await addDoc(userDataRef , newData);
      console.log(res.id);
    } catch (error) {
      console.error()
    }
  }


  return (
<>
  <div className="flex items-center justify-center w-full h-screen">
    {loading ? (
      <h1 className="text-xl font-semibold text-center">Loading...</h1>
    ) : userData.length === 0 ? (
      <div className='flex mx-auto'>
        <AddUserData onSubmit={onSubmit} />
      </div>
    ) : (
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Already have data</h1>
        <h1 className="text-lg font-semibold mb-2">
          User Name: {user?.displayName}
        </h1>
        <div className="mb-4">
          <h1 className="text-xl font-semibold mb-2">Favorite Ingredients:</h1>
          <ul className="list-disc pl-4">
            {userData[0].favorite_ingrediants.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h1 className="text-xl font-semibold mb-2">Health Conditions:</h1>
          <ul className="list-disc pl-4">
            {userData[0].health_conditions.map((condition, index) => (
              <li key={index}>{condition}</li>
            ))}
          </ul>
        </div>
        <div>
          <h1 className="text-xl font-semibold">Preferred Diet Category:</h1>
          <p>{userData[0].prefered_diet_category}</p>
        </div>
      </div>
    )}
  </div>
</>

  );
}

export default Account