import React from 'react'

const Settings = () => {
  return (
    <div className='bg-black w-[20%] text-white flex flex-col'>
        <div className="h-[200px]">responses</div>
        <div className="h-[50px]">REQUIRED</div>
        <div className="">
          THEME
          <div className="grid grid-cols-2 p-3 gap-3">
            <div className="bg-red-300 flex justify-center py-2 rounded-3xl">theme1</div>
            <div className="bg-red-300 flex justify-center py-2 rounded-3xl">theme1</div>
            <div className="bg-red-300 flex justify-center py-2 rounded-3xl">theme1</div>
            <div className="bg-red-300 flex justify-center py-2 rounded-3xl">theme1</div>
          </div>
        </div>
        
        
    </div>
  )
}

export default Settings