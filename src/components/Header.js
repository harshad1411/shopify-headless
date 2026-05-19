   
  import { Link } from 'react-router-dom';
import logo from '../images/ecom-logo.png';
  function Header({cartCount, setShowCart}) {
   return (
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
                <button onClick={() => setShowCart(true)} className='text-2xl p-4  font-bold text-sm cursor-pointer'>
                    {cartCount > 0 ? `Cart (${cartCount})` : 'Cart'}
                </button>
            </div>
        </div>
    );
}

export default Header;