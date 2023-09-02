import React, { useEffect } from 'react'
import { collection  , getDocs , where , query , serverTimestamp , addDoc } from '@firebase/firestore';
import { db } from '../FirebaseConfig';
import { useAuth } from '../context/Auth';
import firebase from 'firebase/compat/app';
import { useForm } from 'react-hook-form';

interface userdata {
    favorite_ingrediants: string;
    health_conditions: string;
    prefered_diet_category: string;
}

interface orderitem {
    userid: string;
    cartItems: {
        title: string;
        quantity: number;
    }[];
    createdAt: firebase.firestore.Timestamp;
    id: string;
}


const Account:React.FC = () => {

  const orderref = collection(db , 'orders');
  const { user } = useAuth();
  const queryorder = (userid: string) => query(orderref , where('userid' , '==' , userid));
  const [ orders , setOrders ] = React.useState<orderitem[]>([]);
  const [ loading , setLoading ] = React.useState<boolean>(true);
  const { register , reset , handleSubmit} = useForm<userdata>();
  const userDataRef = collection(db , 'userData');

  useEffect(() => {

    const getAllOrders = async () => {
      const docsnap = await getDocs(queryorder(user?.uid || ''));
      setOrders(docsnap.docs.map(doc => ({...doc.data() , id: doc.id} as orderitem)));
      setLoading(false);
    }

    getAllOrders()
  }, [])
  
  const onSubmit = async (data: userdata) => {

    const favorite_ingrediants = data.favorite_ingrediants.split(',').map((ingredient) => ingredient.trim());
    const health_conditions = data.health_conditions.split(',').map((condition) => condition.trim());
    const updated_fav_ing = favorite_ingrediants.map(item => JSON.stringify(item));
    const updated_health_cond = health_conditions.map(item => JSON.stringify(item));
    const finalfav_ingarray = `c(${updated_fav_ing.join(', ')})`;
    const finalhealth_cond = `c(${updated_health_cond.join(', ')})`;


    const newData = {
      createdAt: serverTimestamp(),
      prefered_diet_category: data.prefered_diet_category,
      favorite_ingrediants: finalfav_ingarray,
      health_conditions: finalhealth_cond,
      user_id: user?.uid,
      user_name: user?.displayName
    }

    try {
      const res = await addDoc(userDataRef , newData);
      console.log(res.id);
      reset();
    } catch (error) {
      console.error()
    }
  }


  const trimDate = (date: firebase.firestore.Timestamp) => {
    return date.toDate().toString().split(' ').slice(0 , 4).join(' ');
  }

  return (
    <>
    
    <div className='md:grid grid-cols-2'>
      <div className=' flex items-center justify-center w-full h-screen bg-slate-20 text-black flex-col'>
        {loading ? <p>Loading...</p> : 
        <>
        <p className='text-2xl'>Orders</p>
        {orders && orders.map((order , index) => (
          <div className='flex flex-col items-center justify-center gap-2 border-b border-slate-600  p-2' key={order.id}>
            <p className='text-lg'>{index+1}. Items: </p>
            <p>ordered at {trimDate(order.createdAt)}</p>
            {order.cartItems.map((item) => (
              <div className='flex flex-row items-center justify-between w-full gap-4'>
                <p className='text-lg'>{item.title}</p>
                <p className='text-lg'>Quantity: {item.quantity}</p>
              </div>
            ))}
            </div>
        ))}</>
        }
      </div>
      <div className='flex items-center justify-start w-full h-screen'>
          <form onClick={handleSubmit(onSubmit)} className='flex flex-col items-center justify-center gap-4'>

            <p>User Name : {user?.displayName}</p>
            
           {/* favorite_ingrediants  */}
          <div className="w-full">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="Favorite_Ingrediants"
          >
            Favorite Ingrediants
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Enter Favorite Ingrediants"
            id="Favorite_Ingrediants"
            {...register("favorite_ingrediants" , {required: true})}
          ></input>
              </div>

            {/* health_conditions  */}
          <div className="w-full">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="Health_Conditions"
          >
            Health Conditions
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Enter Health Conditions"
            id="Health_Conditions"
            {...register("health_conditions" , {required: true})}
          ></input>
              </div>

            {/* prefered_diet_category  */}
          <div className="w-full">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="Prefered_Diet_Category"
          >
            Prefered Diet Category
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Enter Prefered Diet Category"
            id="Prefered_Diet_Category"
            {...register("prefered_diet_category" , {required: true})}
          ></input>
              </div>

              <button
            className="bg-black/20 hover:bg-black/60 text-black px-4 py-2 rounded-md mt-2 text-sm" type='submit'>Add UserData</button>  
          </form>
      </div>

    </div>
    </>
  )
}

export default Account