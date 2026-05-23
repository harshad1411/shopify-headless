import { useState, useEffect } from "react";
import { removeCartLine, updateCartLine } from '../lib/utils';
const CartLine = ({ line, renderCartData, id }) => {
    const [quantity, setQuantity] = useState(line.node.quantity);
    useEffect(() => {
        // setQuantity(line.node.quantity);
        updateCartLineItem()
    }, [quantity]);

    const updateCartLineItem = async () => {
        const payload = {
            cartId: id,
            lines: [
                {id: line.node.id, quantity: quantity}
            ]
        }
        const data = await updateCartLine(payload);
        renderCartData(id);
    }
    const handleRemoveItem = async () => {
        // console.log(line.node.id);
        const payload = {
            cartId: id,
            lineIds: [line.node.id]
        }
        const data = await removeCartLine(payload);
        renderCartData(id);
    }
    const handleQuantityChange = async (type) => {
        if (type == 'increment') {
            setQuantity(quantity + 1);
         
        } else {
            if(quantity < 1) {
                return;
            }
            setQuantity(quantity - 1);
        }
    }
    return (
        <div key={line.node.id} className='flex gap-4 border-b-[#ddd] mb-4 pb-4 border-b-[1px] pb-4'>
            <div className='w-20 h-20'>
                <img src={line.node.merchandise.image.url} alt={line.node.merchandise.title} />
            </div>
            <div className=' w-full px-4'>
                <h2 className='text-[14px] mb-2 font-bold'>{line.node.merchandise.product.title}</h2>
                <div className='flex items-center gap-2 mb-2'>
                    <p>{line.node.cost.totalAmount.amount} {line.node.cost.totalAmount.currencyCode}</p>
                </div>
                <div className="qty-box flex items-center justify-between">
                    <div className='flex items-center gap-2 border-[1px] border-[#ddd] '>
                    <button onClick={() => handleQuantityChange('decrement')} className='text-sm bg-[#ddd] text-black w-8 h-8 flex text-black items-center justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                            </svg>
                        </button>
                        <span className='text-sm text-black w-6 h-8 flex items-center justify-center'>{quantity}</span>
                        <button onClick={() => handleQuantityChange('increment')} className='text-sm bg-[#ddd] text-black w-8 h-8 flex items-center justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>
                    </div>
                    <div className='flex items-center gap-2'>
                        <button onClick={() => handleRemoveItem()} className='remove-item text-sm bg-[#ddd] text-black w-8 h-8 flex items-center justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
    </div>
    );
};

export default CartLine;