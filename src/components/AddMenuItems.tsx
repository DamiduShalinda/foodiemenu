import React , { useEffect} from 'react'
import { collection , addDoc , serverTimestamp , onSnapshot , deleteDoc , doc , getDocs } from '@firebase/firestore';
import { useForm } from 'react-hook-form'
import { db } from '../FirebaseConfig';

interface formInput {
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface menuitem {
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
    createdAt: string;
    id: string;
}

const AddMenuItems:React.FC = () => {

  const { register , handleSubmit , reset } = useForm<formInput>();
  const [ loading , setLoading ] = React.useState<boolean>(true);
  const menuItemRef = collection(db , 'menuItems');
  const [ categories , setCategories ] = React.useState<string[]>([]);
  const [ menuItems , setMenuItems ] = React.useState<menuitem[]>([]);

  const onSubmit = async (data: formInput) => {
    
    const newData = {
      ...data,
      createdAt: serverTimestamp(),
    }
    try {
      const res = await addDoc(menuItemRef , newData);
      console.log(res.id);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async (id : string) => {
      
      const docref = doc(db , 'menuItems' , id)
      try {
        await deleteDoc(docref);
      } catch (error) {
        console.log(error);
      }
    }

  useEffect(() => {

    const getAllCategories = async () => {
      const docsnap = await getDocs(collection(db , 'categories'));
      const data = docsnap.docs.map((doc) => doc.data().category);
      setCategories(data);
    }
    getAllCategories();
    
    
  }, [])

  useEffect(() => {
    if(categories.length > 0){
      setLoading(false);
    }
  } , [categories])

  useEffect(() => {
    const unsubscribe = onSnapshot(menuItemRef , (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as menuitem[];
      setMenuItems(data);
    })
    return unsubscribe;
    
  }, [])



  

  return (
    <>
    {loading ? <p>Loading...</p> :
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* menu item title */}
          <div className="w-full">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Enter items title"
            id="title"
            {...register("title" , {required: true})}
          ></input>
              </div>
  
          {/* menu item description */}
          <div className="w-full">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="description"
          >
            Description
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Enter your name"
            id="description"
            {...register("description" , {required: true})}
          ></input>
              </div>
  
          {/* menu item price */}
          <div className="w-full">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="price"
          >
            Price
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="number"
            placeholder="Enter item's price"
            id="price"
            {...register("price" , {required: true})}
          ></input>
              </div>
  
          {/* menu item image */}
          <div className="w-full">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="image"
          >
            Image
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Enter item's image url"
            id="name"
            {...register("image" , {required: true})}
          ></input>
              </div>
              <div className="w-full">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="category"
            >
              Category
            </label>
            <select
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600  disabled:cursor-not-allowed disabled:opacity-50"
              id="category"
              {...register("category", { required: true })}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <button
            className="bg-black/20 hover:bg-black/60 text-black px-4 py-2 rounded-md mt-2 text-sm" type='submit'>Add New Item</button>
        </form>

        {/* menu items */}
        <div className='mt-5'>
            <h1 className='text-2xl'>Menu Items</h1>
            <div>
                {menuItems.map((menuItem) => {
                    return (
                        <div className='flex flex-row items-center justify-between w-full mt-2' key={menuItem.id}>
                            <p>{menuItem.title}</p>
                            <button className='bg-red-200  px-3 py-1 rounded-md mt-2 text-xs' onClick={() => onDelete(menuItem.id)}>
                                Delete
                            </button>
                        </div>
                    )
                }
                )}
            </div>
      </div>
      </div>
    }
    </>
  )
}

export default AddMenuItems