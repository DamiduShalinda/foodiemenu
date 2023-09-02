import React , { useEffect} from 'react'
import { collection , serverTimestamp , onSnapshot , deleteDoc , doc , getDocs  , addDoc} from '@firebase/firestore';
import { useForm } from 'react-hook-form'
import { db } from '../FirebaseConfig';



interface formInput {
  meal_name: string;
  description: string;
  price: number;
  image: string;
  receipe_category: string;
  keywords: string;
  ingredients: string;
  Calories?: number;
  FatContent?: number;
  SaturatedfatContent?: number;
  CarbohydratesContent?: number;
  SugarContent?: number;
  FiberContent?: number;
  ProteinContent?: number;
  CholestrolContent?: number;
  SodiumContent?: number;

}

interface menuitem {
    meal_name: string;
    id: string;
}

const AddMenuItems:React.FC = () => {

  const { register , handleSubmit , reset } = useForm<formInput>();
  const [ loading , setLoading ] = React.useState<boolean>(false);
  const menuItemRef = collection(db , 'menuItems');
  const [ categories , setCategories ] = React.useState<string[]>([]);
  const [ menuItems , setMenuItems ] = React.useState<menuitem[]>([]);

  const onSubmit = async (data: formInput) => {

    const updatedIngredients = data.ingredients.split(',').map((ingredient) => ingredient.trim());
    const ingredientsstring = updatedIngredients.map(item => JSON.stringify(item));
    const finalarray = `c(${ingredientsstring.join(', ')})`;

    const newData = {
      ...data,
      ingredients: finalarray,
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
        meal_name: doc.data().meal_name,
        id: doc.id,
      }));
      setMenuItems(data);
    })
    return unsubscribe;
    
  }, [])



  

  return (
    <>
    {loading ? <p>Loading...</p> :
        <div className='md:w-80 w-auto md:pt-[700px]'>
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* menu item meal name */}
          <div className="w-full">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="meal_name"
          >
            Meal Name
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Enter meal name"
            id="meal_name"
            {...register("meal_name" , {required: true})}
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
            step={0.01}
            placeholder="Enter item's price"
            id="price"
            {...register("price" , {required: true})}
          ></input>
              </div>

          {/* menu item ingredients */}
          <div className="w-full">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="ingredients"
          >
            Ingredients
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Enter item's ingredients"
            id="ingredients"
            {...register("ingredients" , {required: true})}
          ></input>
            </div>

          {/* menu item recipe ingredient quantities
          <div className="w-full">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="recipe_ingredient_quantities"
          >
            Recipe Ingredient Quantities
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Enter item's recipe ingredient quantities"
            id="recipe_ingredient_quantities"
            {...register("recipe_ingredient_quantities" , {required: true})}
          ></input>
              </div> */}

          {/* menu item keywords */}
          <div className="w-full">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="keywords"
          >
            Keywords
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Enter item's keywords"
            id="keywords"
            {...register("keywords" , {required: true})}
          ></input>
              </div>

            {/* menu item calories */}
            <div className="w-full">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="Calories"
            >
              Calories
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
              type="number"
              placeholder="Enter item's calories"
              id="Calories"
              step={0.01}
              {...register("Calories")}
              style={{ appearance: "none" }}
            ></input>
                </div>
          
          <div className='md:grid md:grid-cols-2 md:gap-2'>
            {/* menu item fat content */}
            <div className="w-full">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="FatContent"
            >
              Fat Content
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
              type="number"
              step={0.01}
              placeholder="fat content"
              id="FatContent"
              {...register("FatContent")}
            ></input>
                </div>

            {/* menu item saturated fat content */}
            <div className="w-full">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="SaturatedfatContent"
            >
              Saturated Fat Content
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              type="number"
              step={0.01}
              placeholder="saturated fat content"
              id="SaturatedfatContent"
              {...register("SaturatedfatContent")}
            ></input>
                </div>

            {/* menu item carbohydrates content */}
            <div className="w-full">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
              htmlFor="CarbohydratesContent"
            >
              Carbohydrates Content
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              type="number"
              step={0.01}
              placeholder="carbohydrates content"
              id="CarbohydratesContent"
              {...register("CarbohydratesContent")}
            ></input>
                </div>


            {/* menu item sugar content */}
            <div className="w-full">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
              htmlFor="SugarContent"
            >
              Sugar Content
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              type="number"
              step={0.01}
              placeholder="sugar content"
              id="SugarContent"
              {...register("SugarContent")}
            ></input>
                </div>

            {/* menu item fiber content */}
            <div className="w-full">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
              htmlFor="FiberContent"
            >
              Fiber Content
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              type="number"
              step={0.01}
              placeholder="fiber content"
              id="FiberContent"
              {...register("FiberContent")}
            ></input>
                </div>
            {/* menu item protein content */}
            <div className="w-full">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
              htmlFor="ProteinContent"
            >
              Protein Content
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              type="number"
              placeholder="protein content"
              id="ProteinContent"
              step={0.01}
              {...register("ProteinContent")}
            ></input>
                </div>
            {/* menu item cholestrol content */}
            <div className="w-full">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
              htmlFor="CholestrolContent"
            >
              Cholestrol Content
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              type="number"
              step={0.01}
              placeholder="cholestrol content"
              id="CholestrolContent"
              {...register("CholestrolContent")}
            ></input>
                </div>
            {/* menu item sodium content */}
            <div className="w-full">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
              htmlFor="SodiumContent"
            >
              Sodium Content
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              type="number"
              step={0.01}
              placeholder="sodium content"
              id="SodiumContent"
              {...register("SodiumContent")}
            ></input>
                </div>
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

           {/* menu item category */}
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
              {...register("receipe_category", { required: true })}
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
                            <p>{menuItem.meal_name}</p>
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