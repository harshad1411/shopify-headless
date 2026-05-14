const SideCart = ({ cart, setShowCart, removeFromCart }) => {
    console.log(cart);
    return (
        <div onClick={() => setShowCart(false)} className="fixed z-10 top-0 bottom-0 left-0 right-0 w-full h-full bg-black/50">
            <div onClick={(e) => e.stopPropagation()} className='fixed z-[20] top-0 right-0 w-1/4 h-full bg-white'>
                <div className='flex items-center justify-between border-b-[#000] border-b-[1px]'>
                    <h1 className='text-2xl p-4  font-bold '>Cart</h1>
                    <button onClick={() => setShowCart(false)} className='text-2xl p-4  font-bold text-sm cursor-pointer'>Close</button>
                </div>
                <div className='p-4'>
                {cart.map((item) => (
                    <div key={item.id} className='flex items-center gap-4'>
                        <div className='relative mb-4 outline-none'>
                            <img src={item.images[0]} alt={item.title} className='outline-none  w-20 block h-auto' />
                        </div>
                        <div>
                            <h2>{item.title}</h2>
                            <p>{item.price}</p>
                            <p onClick={() => removeFromCart(item.id)} className='text-sm cursor-pointer'>Remove</p>
                        </div>
                    </div>
                ))}
            </div>
            </div>
           
        </div>
  );
};

export default SideCart;