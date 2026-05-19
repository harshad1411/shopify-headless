const SideCart =({cart, setShowCart}) => {
    console.log("side cart", cart);
    return (
    <div onClick={() => setShowCart(false)} className="fixed z-10 top-0 bottom-0 left-0 right-0 w-full h-full bg-black/50">
        <div onClick={(e) => e.stopPropagation()} className='fixed z-[20] top-0 right-0 w-1/4 h-full bg-white'>
            <div className='flex items-center justify-between border-b-[#000] border-b-[1px]'>
                <h1 className='text-2xl p-4  font-bold '>Cart</h1>
            </div>
            <div className='p-4'>
                {cart.lines.edges.map((line) => (
                    <div key={line.node.id} className='flex items-center gap-4'>
                    <div className='w-20 h-20'>
                        <img src={line.node.merchandise.image.url} alt={line.node.merchandise.title} />
                    </div>
                    <div>
                        <h2>{line.node.merchandise.product.title}</h2>
                        <p>Quantity: {line.node.quantity}</p>
                        <p>Price: {line.node.cost.amountPerQuantity.amount} {line.node.cost.amountPerQuantity.currencyCode}</p>
                        <p>Total: {line.node.cost.totalAmount.amount} {line.node.cost.totalAmount.currencyCode}</p>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
};
export default SideCart;