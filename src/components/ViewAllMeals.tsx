import React, { useEffect, useState } from 'react'
import { collection ,  onSnapshot} from '@firebase/firestore';
import ReactFlipCard from 'reactjs-flip-card';
import { db } from '../FirebaseConfig';

export interface MenuItem {
    id: string;
    meal_name: string;
    description: string;
    price: string;
    image: string;
    receipe_category: string;
    keywords: string;
  }

const ViewAllMeals:React.FC = () => {

    const [menuItems, setMenuItems] = React.useState<MenuItem[]>([]);
    const menuitemsref = collection(db, 'menuItems');
    const [ loading , setLoading] = useState(true);
    const styles = {
      card: {
        color: 'white', 
        borderRadius: 20,
        width : 300,
      },
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(menuitemsref , (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        })) as MenuItem[];
        setMenuItems(data);
    })
    return unsubscribe;
}, [])

useEffect(() => {
  if (menuItems.length > 0) {
    console.log(menuItems);
    setLoading(false);
  }
}
, [menuItems])


  return (
    <>
    {
    loading ? 
    <div className='flex justify-center items-center w-full h-screen '>
      <h1>Loading...</h1>
    </div>
     :
    <div className='flex justify-center items-center w-full h-full '>

    <div className='mt-4 mb-16 md:mt-20 md:mb-0 md:gap-2 md:grid md:grid-cols-4 flex-col gap-4'>
      {menuItems.map((item) => {
        return (
          <>
                  {/* card */}
          <div className="w-[300px] rounded-md border">
            {/* <img
              src={item.image}
              alt="Laptop"
              className="h-[200px] w-full rounded-md object-cover"
            /> */}
            <div className='h-52'>
              <ReactFlipCard
                  flipTrigger='onClick'
                  direction='vertical'
                  frontStyle={styles.card}
                  backStyle={styles.card}
                  frontComponent={
                  <img
                    src={item.image}
                    alt="Laptop"
                    className="h-[200px] w-[300px] rounded-md object-cover"
                  />}
                  backComponent={
                    <img
                      src={item.image}
                      alt="Laptop"
                      className="h-[200px] w-[300px] rounded-md object-cover"
                    />}
              />
            </div>
            <div className="p-4 flex items-start justify-end flex-col">
              <h1 className="text-lg font-semibold">{item.meal_name}</h1>
              <p className="mt-3 text-sm text-gray-600">
                {item.keywords}
              </p>
              <button
                type="button"
                className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                ${item.price}
              </button>
            </div>
          </div>
          </>
        )
      })}
    </div>
    </div>
  }
    </>
  )
}

export default ViewAllMeals