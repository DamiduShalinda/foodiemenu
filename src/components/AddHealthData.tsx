import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { collection , addDoc , serverTimestamp , onSnapshot , deleteDoc , doc  } from '@firebase/firestore';
import { db } from '../FirebaseConfig';


interface formInput {
    condition_name : string;
    Calories : number;
    FatContent : number;
    SaturatedFatContent : number;
    CholesterolContent : number;
    SodiumContent : number;
    CarbohydrateContent : number;
    FiberContent : number;
    SugarContent : number;
    ProteinContent : number;
}

interface healthitem {
    id: string;
    condition_name : string;
}



const AddHealthData:React.FC = () => {

    const { register , handleSubmit , reset } = useForm<formInput>();
    const healthRef = collection(db , 'healthdata');
    const [ healthdata , setHealthdata ] = React.useState<healthitem[]>([]);

    const onSubmit  = (data: formInput) => {
        const newData = {
            ...data,
            createdAt: serverTimestamp(),
        }
        try {
            const res = addDoc(healthRef , newData);
            console.log(res);
            reset();
        } catch (error) {
            console.log(error);
        }
    }

    const onDelete = async (id : string) => {

        const docref = doc(db , 'healthdata' , id)
        try {
            await deleteDoc(docref);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        const unsubscribe = onSnapshot(healthRef , (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                condition_name : doc.data().condition_name,
                id: doc.id,
            }));
            setHealthdata(data);
            console.log(data);
        })
        return unsubscribe;


     
    }, [])
    

    
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="w-full md:w-80 md:pt-[300px]">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="condition_name"
          >
            Condition Name
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Enter condition name"
            id="condition_name"
            {...register("condition_name" , {required: true})}
          ></input>
    </div>
    <div className="w-full md:w-80">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="Calories"
          >
            Calories
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="number"
            placeholder="Enter calories"
            id="Calories"
            {...register("Calories" , {required: true})}
          ></input>
    </div>
    <div className="w-full md:w-80">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="FatContent"
          >
            Fat Content
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="number"
            placeholder="Enter fat content"
            id="FatContent"
            {...register("FatContent" , {required: true})}
          ></input>
    </div>
    <div className="w-full md:w-80">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="SaturatedFatContent"
          >
            Saturated Fat Content
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="number"
            placeholder="Enter saturated fat content"
            id="SaturatedFatContent"
            {...register("SaturatedFatContent" , {required: true})}
          ></input>
    </div>
    <div className="w-full md:w-80">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="CholesterolContent"
          >
            Cholesterol Content
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="number"
            placeholder="Enter cholesterol content"
            id="CholesterolContent"
            {...register("CholesterolContent" , {required: true})}
          ></input>
    </div>
    <div className="w-full md:w-80">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="SodiumContent"
          >
            Sodium Content
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="number"
            placeholder="Enter sodium content"
            id="SodiumContent"
            {...register("SodiumContent" , {required: true})}
          ></input>
    </div>
    <div className="w-full md:w-80">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="CarbohydrateContent"
          >
            Carbohydrate Content
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="number"
            placeholder="Enter carbohydrate content"
            id="CarbohydrateContent"
            {...register("CarbohydrateContent" , {required: true})}
          ></input>
    </div>
    <div className="w-full md:w-80">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="FiberContent"
          >
            Fiber Content
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter fiber content"
            id="FiberContent"
            {...register("FiberContent" , {required: true})}
          ></input>
    </div>
    <div className="w-full md:w-80">
    <label
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      htmlFor="SugarContent"
    >
        Sugar Content
    </label>
    <input
      className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
      placeholder="Enter sugar content"
      id="SugarContent"
      {...register("SugarContent" , {required: true})}
    ></input>
    </div>
    <div className="w-full md:w-80">
    <label
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      htmlFor="ProteinContent"
    >
        Protein Content
    </label>
    <input
      className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
      placeholder="Enter protein content"
      id="ProteinContent"
      {...register("ProteinContent" , {required: true})}
    ></input>
    </div>
    <div className="w-full md:w-80">
    <button
      className="flex justify-center items-center w-full h-10 rounded-md bg-black/20 mt-3 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
      type="submit"
    >
        Add Health Data
    </button>
    </div>
    </form>

    {healthdata.length > 0 &&
        <div className='my-5'>
            <h1 className='text-2xl'>Health Data</h1>
            <div>
                {healthdata.map((health) => {
                    return (
                        <div className='flex flex-row items-center justify-between w-full mt-2' key={health.id}>
                            <p>{health.condition_name}</p>
                            <button className='bg-red-200  px-3 py-1 rounded-md mt-2 text-xs' onClick={() => onDelete(health.id)}>
                                Delete
                            </button>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    }
    </>
  )
}

export default AddHealthData