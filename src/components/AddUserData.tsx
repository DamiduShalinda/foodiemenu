import React from 'react'
import { useForm } from 'react-hook-form';
import { userdata } from '../pages/Account';
import { useAuth } from '../context/Auth';

interface props {
  onSubmit: (data: userdata) => void;
}



const AddUserData:React.FC<props> = ({onSubmit}) => {

  const { register , reset , handleSubmit} = useForm<userdata>();
  const { user } = useAuth();

  const dietOptions = [
    'Vegetarianism',
    'Veganism',
    'Gluten-Free',
    'Paleo Diet',
    'Ketogenic',
    'Mediterranean',
    'Low-Carb',
    'Halal',
    'Kosher',
    'Raw Food',
    'Low-FODMAP',
    'Whole30',
    'Flexitarian',
    'Carnivore',
    'DASH',
    'Fruitarian',
    'Allergen-Free',
    'Lactose-Free',
    'Sugar-Free',
    'Low-Sodium',
    'Organic',
    'Nut-Free',
  ];

  

  const onFormSubmit = (data: userdata) => {
    onSubmit(data);
    reset();
  }
  

  return (
    <div className='flex items-center justify-start w-full h-screen'>
          <form onSubmit={handleSubmit(onFormSubmit)} className='flex flex-col items-center justify-center gap-4'>

            <p>User Name : {user?.displayName}</p>
            
           {/* favorite_ingrediants  */}
          <div className="w-full">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="favIng"
          >
            Favorite Ingrediants
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Enter Favorite Ingrediants"
            id="favIng"
            {...register("favorite_ingrediants" , {required: true})}
          ></input>
              </div>

            {/* health_conditions  */}
          <div className="w-full">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="healthConditions"
          >
            Health Conditions
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Enter Health Conditions"
            id="healthConditions"
            {...register("health_conditions" , {required: true})}
          ></input>
              </div>

            {/* prefered_diet_category  */}
            <div className="w-full">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="preferedDietCategory"
            >
              Prefered Diet Category
            </label>
            <select
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600  disabled:cursor-not-allowed disabled:opacity-50"
              id="preferedDietCategory"
              {...register("prefered_diet_category", { required: true })}
            >
              {dietOptions.map((dietOption, index) => (
                <option key={index} value={dietOption}>
                  {dietOption}
                </option>
              ))}
            </select>
          </div>


              <button
            className="bg-black/20 hover:bg-black/60 text-black px-4 py-2 rounded-md mt-2 text-sm" type='submit'>Add UserData</button>  
          </form>
      </div>
  )
}

export default AddUserData