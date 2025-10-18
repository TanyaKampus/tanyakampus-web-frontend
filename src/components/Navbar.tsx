import { useLocation } from 'react-router-dom';
import Button from './Button';

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navClass = isHomePage
    ? 'absolute top-0 left-0 w-full z-20 bg-transparent text-tertiary-100'
    : 'relative w-full z-20 bg-cyan-700 text-tertiary-100 shadow-md'; 

  return (
    <nav className={navClass}>
      <div className="container mx-auto px-16 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold">TanyaKampus</span>
        </div>

        <ul className="hidden md:flex items-center space-x-8 font-medium">
          <li><a href="/" className="hover:text-gray-300 transition-colors">Home</a></li>
          <li><a href="/about" className="hover:text-gray-300 transition-colors">Lorem</a></li>
          <li><a href="#" className="hover:text-gray-300 transition-colors">Lorem</a></li>
        </ul>

        <div className="hidden md:flex items-center space-x-4">
            <Button label='Daftar' variant='solid-light'/>
            <Button label='Masuk' variant='outline'/>
        </div>
        
        <div className="md:hidden">
            <button className="text-white focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

