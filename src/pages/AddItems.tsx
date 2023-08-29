import React from 'react'
import AddCatgories from '../components/AddCatgories';
import AddMenuItems from '../components/AddMenuItems';

const AddItems : React.FC = () => {


    const [ selectedOption , setSelectedOption ] = React.useState<number>(2);

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(parseInt(e.target.value));
    }

  return (
    <div className='flex items-center justify-center w-full md:h-screen h-full bg-slate-20 text-black p-5 md:px-0'>
        <div className='flex flex-col gap-2'>
            <div className='flex flex-row items-center justify-center gap-4 w-full'>
                <div><input type="radio" name="option" value="1" onChange={handleOptionChange}/> Add Categories</div>
                <div><input type="radio" name="option" value="2" onChange={handleOptionChange}/> Add Menu Items</div>
            </div>
            <div>
                {selectedOption === 1 ? <><AddCatgories/></> : <><AddMenuItems/></>}
            </div>
        </div>
        
    </div>
  )
}

export default AddItems