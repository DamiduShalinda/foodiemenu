import React from 'react'
import { menuItem } from '../data'
import {FiArrowUpRight as ArrowUpRight} from 'react-icons/fi'
import { AiOutlinePlus , AiOutlineMinus} from 'react-icons/ai'

interface MenuItemProps {
    menuItem: menuItem;
    addToCart: () => void;
    removeFromCart: () => void;
  }

const MenuItem : React.FC<MenuItemProps> = ({menuItem , addToCart , removeFromCart}) => {

    const [quantity, setQuantity] = React.useState(0)

    const increment = () => {
        setQuantity(quantity + 1)
    }

    const decrement = () => {
        if(quantity > 0){
            setQuantity(quantity - 1)
        }
    }

    
    return (
        <div className="flex max-w-2xl flex-col items-center rounded-md border md:flex-row">
          <div className="h-full w-full md:h-[200px] md:w-[300px]">
            <img
              src={menuItem.image}
              alt="Laptop"
              className="h-full w-full rounded-md object-cover"
            />
          </div>
          <div>
            <div className="p-4">
              <h1 className="inline-flex items-center text-lg font-semibold">
                {menuItem.title} <ArrowUpRight className="ml-2 h-4 w-4" />
              </h1>
              <p className="mt-3 text-sm text-gray-600">
                {menuItem.description}
              </p>
              <div className="mt-4">
                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                  #{menuItem.category}
                </span>
                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-500 px-3 py-1 text-[10px] font-semibold text-gray-100">
                  ${menuItem.price}
                </span>
              </div>
              <div className='flex flex-row items-center justify-start mt-2 gap-2'>
                <span className='border border-black p-1 rounded-l-md'>
                    <AiOutlineMinus onClick={() => {decrement(); removeFromCart();} } size={15}/>
                </span>
                <p className='text-xs'>{quantity}</p>
                <span className='border border-black p-1 rounded-r-md'>
                    <AiOutlinePlus onClick={() => { increment(); addToCart(); }} size={15} />
                </span>
                {/* Call addToCart when the + button is clicked */}
            </div>
            </div>
          </div>
        </div>
      )
}

export default MenuItem