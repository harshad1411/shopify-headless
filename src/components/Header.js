   
  import { Link } from 'react-router-dom';
import logo from '../images/ecom-logo.png';
  function Header() {
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
            </div>
        </div>
    );
}

export default Header;