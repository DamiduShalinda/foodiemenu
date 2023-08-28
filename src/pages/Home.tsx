import React from 'react'
import { menuItems } from '../data'
import MenuItem from '../components/MenuItem'

const Home : React.FC = () => {

  const[ cart , setCart ] = React.useState<Record<string , number>>({})

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
    console.log('Cart Contents:');
    for (const itemId in cart) {
      const menuItem = menuItems.find((item) => item.id === parseInt(itemId));
      if (menuItem) {
        console.log(`${menuItem.title}: ${cart[itemId]}`);
      }
    }
  };

  return (
    <div className=' flex items-center justify-center w-full md:h-screen h-full bg-slate-20 text-black px-5 md:px-0'>
        <div className='md:mt-96 mt-40'>
          <div className='flex flex-col gap-5 md:mt-60 mb-10'>
            {menuItems.map((menuItem) => {
                return (
                    <MenuItem menuItem={menuItem} key={menuItem.id} addToCart={() => addToCart(menuItem.id)} removeFromCart={() => removeFromCart(menuItem.id)}/>
                )
          
            }
            )}
          </div>
        </div>
        <button 
          className='fixed bottom-0 right-0 bg-slate-400 text-white px-5 py-2 rounded-tl-md'
          onClick={handleCheckout}
          >Order</button>
    </div>
  )
}

export default Home