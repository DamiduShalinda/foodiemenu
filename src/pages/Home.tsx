import React from 'react'
import { collection , addDoc , serverTimestamp } from '@firebase/firestore';
import { menuItems } from '../data'
import MenuItem from '../components/MenuItem'
import { useAuth } from '../context/Auth'
import { db } from '../FirebaseConfig';

interface cartItem {
  [key: number]: number;
  title : string;	
  quantity : number;
}

const Home : React.FC = () => {

  const { user} = useAuth();
  const[ cart , setCart ] = React.useState<Record<string , number>>({})
  const [ cartItems , setCartItems ] = React.useState<cartItem[]>([])
  const orderRef = collection(db , 'orders');

  const { isAuth} = useAuth();

  const addToCart = (id: number) => {
    setCart((prev) => {
      return {...prev , [id] : prev[id] + 1 || 1}
    })
  }

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      return {...prev , [id] : prev[id] - 1 || 0}
    })
  }

  const handleCheckout = () => {
    const tempcartItems: cartItem[] = [];
    for (const itemId in cart) {
      const menuItem = menuItems.find((item) => item.id === parseInt(itemId));
      if (menuItem) {
        tempcartItems.push({
          title: menuItem.title,
          quantity: cart[itemId],
        });
      }
    }
    setCartItems(tempcartItems);
    addOrder();
  }
  
  const addOrder = async () => {
    if (cartItems.length > 0) {
      const newData = {
        userid : user?.uid,
        cartItems,
        createdAt: serverTimestamp(),
      }
      try {
        const res = await addDoc(orderRef , newData);
        console.log(res.id);
      } catch (error) {
        console.log(error);
      }
    }
  }


  return (
    <div className='flex items-center justify-center w-full md:h-screen h-full bg-slate-20 text-black px-8 md:px-0'>
        <div className='md:mt-96 mt-5'>
          <div className='flex flex-col gap-5 md:mt-60 md:mb-10 mb-20'>
            {menuItems.map((menuItem) => {
                return (
                    <MenuItem menuItem={menuItem} key={menuItem.id} addToCart={() => addToCart(menuItem.id)} removeFromCart={() => removeFromCart(menuItem.id)}/>
                )
          
            }
            )}
          </div>
        </div>
        <button 
          className='fixed md:bottom-0 md:right-0 bg-slate-400 text-white px-5 py-2 md:rounded-tl-md bottom-14 right-2 rounded-md'
          onClick={handleCheckout}
          disabled={!isAuth}
          >Order</button>
    </div>
  )
}

export default Home