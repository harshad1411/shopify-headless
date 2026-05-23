import CartLine from './CartLine';
const SideCart = ({ cart, setShowCart, renderCartData }) => {
    console.log("side cart", cart);
    return (
        <div onClick={() => setShowCart(false)} className="fixed z-10 top-0 bottom-0 left-0 right-0 w-full h-full bg-black/50">
            <div onClick={(e) => e.stopPropagation()} className='fixed z-[20] top-0 right-0 w-1/4 h-full bg-white'>
                <div className='flex items-center justify-between border-b-[#ddd] border-b-[1px] px-4 mb-4'>
                    <h1 className='text-2xl p-4  font-bold relative w-full'>
                        Cart
                        <span onClick={() => setShowCart(false)} className='cursor-pointer text-sm absolute top-1/2 -translate-y-1/2 right-0 text-black'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </h1>
                </div>
                <div className=''>
                    {cart.lines.edges.map((line) => (
                      <CartLine id={cart.id} renderCartData={renderCartData} key={line.node.id} line={line} />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default SideCart;