import React from 'react'

const Collection = () => {
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* filter options */}
      <div className='min-w-60'>
        <p className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTER</p>
        {/** Category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFiler ? '' :  'hidden'} sm:block`}>

        </div>
      </div>
    </div>
  )
}

export default Collection

