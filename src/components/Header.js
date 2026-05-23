   
  import { Link } from 'react-router-dom';
import logo from '../images/ecom-logo.png';
  function Header({cartCount, setShowCart}) {
   return (
        <div className='flex gap-4 items-center justify-between px-4'>
            <div className="flex gap-4 items-center px-4 py-2 border-b-[1px] border-b-[#ccc]">
                <h1>
                    <Link to="/">
                        <img src={logo} alt="logo" className="w-48 cursor-pointer" />
                    </Link>
                </h1>
                <div className="flex items-center gap-4">
                    <Link to="/">Home</Link>
                    <Link to="/collections">Collections</Link>
                    <Link to="/contact">Contact</Link>
                </div>
            </div>
            <div className='flex items-center gap-4'>
                <button onClick={() => setShowCart(true)} className='relative text-2xl  font-bold text-sm cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    <span className='absolute top-[-8px] right-[-4px] text-white bg-[#ff0000] text-xs rounded-full w-4 h-4 flex items-center justify-center z-[8]'>{cartCount}</span>
                    {/* {cartCount > 0 ? `Cart (${cartCount})` : 'Cart'} */}
                </button>
            </div>
        </div>
    );
}

export default Header;