const ProductCard = ({ product, addToCart }) => {
    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product);
    };
    return (
        <div className='w-full' key={product.id}>
            <a href={`/products/${product.handle}`}>
                <div className='relative mb-4 outline-none'>
                    <img src={product.images[0]} alt={product.title} className='outline-none w-full block h-auto' />
                </div>
                <h1>{product.title}</h1>
                <p className='mb-4'>Rs. {product.price}</p>
                <button className='bg-black w-full text-white p-2 rounded-md' onClick={(e) => handleAddToCart(e)}>Add to Cart</button>
            </a>
        </div>
    );
};

export default ProductCard;