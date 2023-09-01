import { collection , addDoc , serverTimestamp , onSnapshot , deleteDoc , doc  } from '@firebase/firestore';
import React , {useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { db } from '../FirebaseConfig';

interface formInput {
  category: string;
}

interface categoryitem {
    category: string;
    createdAt: string;
    id: string;
}

const AddCatgories:React.FC = () => {

    const { register , handleSubmit , reset } = useForm<formInput>();
    const categoryRef = collection(db , 'categories');
    const [ categories , setCategories ] = React.useState<categoryitem[]>([]);

    const onSubmit = async (data: formInput) => {

        const newData = {
            ...data,
            createdAt: serverTimestamp(),
        }
        try {
            const res = await addDoc(categoryRef , newData);
            console.log(res.id);
            reset();
        } catch (error) {
            console.log(error);
        }
    };

    const onDelete = async (id : string) => {

        const docref = doc(db , 'categories' , id)
        try {
            await deleteDoc(docref);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        const unsubscribe = onSnapshot(categoryRef , (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            })) as categoryitem[];
            setCategories(data);
        })
        return unsubscribe;
        
    }, [])


  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full md:w-80">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="category"
          >
            Category
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Enter new category"
            id="category"
            {...register("category" , {required: true})}
          ></input>
        </div>
        <button
          className="bg-black/20 hover:bg-black/60 text-black px-4 py-2 rounded-md mt-2 text-sm" type='submit'>Add New Category</button>
    </form>
    <div className='mt-5'>
        <h1 className='text-2xl'>Categories</h1>
        <div>
            {categories.map((category) => {
                return (
                    <div className='flex flex-row items-center justify-between w-full mt-2' key={category.id}>
                        <p>{category.category}</p>
                        <button className='bg-red-200  px-3 py-1 rounded-md mt-2 text-xs' onClick={() => onDelete(category.id)}>
                            Delete
                        </button>
                    </div>
                )
            }
            )}
        </div>
    </div>
    </div>
  )
}

export default AddCatgories