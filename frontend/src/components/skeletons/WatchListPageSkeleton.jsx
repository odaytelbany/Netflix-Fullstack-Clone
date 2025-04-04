import React from 'react'

const WatchListPageSkeleton = () => {
  return (
    <div className='animate-pulse'>
        <div className='bg-gray-700 rounded-md w-full h-20 mb-4 shimmer'></div>
        <div className='bg-gray-700 rounded-md w-40 h-6 shimmer mb-8'></div>
        <div className='bg-gray-700 rounded-md w-full h-40 mb-4 shimmer'></div>
        <div className='bg-gray-700 rounded-md w-full h-40 mb-4 shimmer'></div>
        <div className='bg-gray-700 rounded-md w-full h-40 mb-4 shimmer'></div>
    </div>
  )
}

export default WatchListPageSkeleton