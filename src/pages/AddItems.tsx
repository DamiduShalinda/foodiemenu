import React from 'react';
import AddCatgories from '../components/AddCatgories';
import AddMenuItems from '../components/AddMenuItems';
import AddHealthData from '../components/AddHealthData';

const AddItems: React.FC = () => {
  const [selectedOption, setSelectedOption] = React.useState<number>(2);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(parseInt(e.target.value));
  };

  return (
    <div className='flex items-center justify-center w-full md:h-screen h-full bg-slate-20 text-black p-5 md:px-0'>
      <div className='flex md:fixed md:left-80 flex-col gap-2 md:grid md:grid-cols-3 md:gap-10'>
        <div className='flex flex-col items-start justify-center gap-4 w-full'>
          <label>
            <input
              type="radio"
              name="option"
              value="1"
              onChange={handleOptionChange}
              checked={selectedOption === 1}
            />{' '}
            Add Categories
          </label>
          <label>
            <input
              type="radio"
              name="option"
              value="2"
              onChange={handleOptionChange}
              checked={selectedOption === 2}
            />{' '}
            Add Menu Items
          </label>
          <label>
            <input
              type="radio"
              name="option"
              value="3"
              onChange={handleOptionChange}
              checked={selectedOption === 3}
            />{' '}
            Add Health Data
          </label>
        </div>
      </div>
      <div className='md:ml-72'> {/* Adjust margin-left to match your layout */}
        {selectedOption === 1 && <AddCatgories />}
        {selectedOption === 2 && <AddMenuItems />}
        {selectedOption === 3 && <AddHealthData />}
      </div>
    </div>
  );
};

export default AddItems;
