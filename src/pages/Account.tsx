import React, { useEffect } from 'react'
import { collection  , getDocs , where , query } from '@firebase/firestore';
import { db } from '../FirebaseConfig';
import { useAuth } from '../context/Auth';
import firebase from 'firebase/compat/app';

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

  useEffect(() => {

    const getAllOrders = async () => {
      const docsnap = await getDocs(queryorder(user?.uid || ''));
      setOrders(docsnap.docs.map(doc => ({...doc.data() , id: doc.id} as orderitem)));
      setLoading(false);
    }

    getAllOrders()
  }, [])
  

  const trimDate = (date: firebase.firestore.Timestamp) => {
    return date.toDate().toString().split(' ').slice(0 , 4).join(' ');
  }

  return (
    <>
    {loading ? <p>Loading...</p> :
    <div className=' flex items-center justify-start w-full h-screen bg-slate-20 text-black flex-col'>
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
      ))}

    </div>
    }
    </>
  )
}

export default Account