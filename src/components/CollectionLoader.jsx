const CollectionLoader = () => {
    return (
        <div className='py-8 max-w-7xl mx-auto'>
        {/* Title Skeleton */}
        <div className='h-8 w-64 bg-gray-200 rounded-md mb-8 animate-pulse'></div>
        
        {/* Product Grid Skeleton */}
        <div className='grid grid-cols-4 gap-4'>
            {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                    {/* Image Placeholder */}
                    <div className='aspect-square w-full bg-gray-200 rounded-lg animate-pulse'></div>
                    {/* Text Placeholder */}
                    <div className='h-4 w-3/4 bg-gray-200 rounded animate-pulse'></div>
                    <div className='h-4 w-1/2 bg-gray-100 rounded animate-pulse'></div>
                </div>
            ))}
        </div>
    
        {/* Pagination Skeleton */}
        <div className='flex justify-center items-center gap-4 mt-8'>
            <div className='h-10 w-24 bg-gray-200 rounded-md animate-pulse'></div>
            <div className='h-10 w-24 bg-gray-200 rounded-md animate-pulse'></div>
        </div>
    </div>
    );
};

export default CollectionLoader;