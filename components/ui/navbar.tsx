import Link from 'next/link';
import { useState } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import * as React from 'react';
import '../../app/globals.css';
import img from '../../app/logo.jpeg'

export type IMenu = {
  id: number;
  title: string;
  url: string;
  dropdown?: boolean;
  items?: IMenu[];
};

type MenuProps = {
  list: IMenu[];
};

const Menu = ({ list }: MenuProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const scrollto = ()=>{
   
      const position = window.scrollY + 1000;
      window.scrollTo({ top: position, behavior: 'smooth' });
   
   
  }

  return (
    <MotionConfig transition={{ bounce: 0, type: 'tween' }}>
      <nav className="relative bg-background border-b border-border">
      <div className=" lg:hidden flex flex-row justify-between items-center px-0 py-2">
        <h1 id="nav-h1" className='flex flex-row'> <img className='mr-1' src={img.src} alt="" style={{height:"35px" }}/> <span className='mt-1'> CryptoWatch </span> </h1>

          {/* Hamburger button for mobile */}
          <button
            className="lg:hidden text-2xl mr-6"
            onClick={toggleSidebar}
          >
              
            ☰
            
          </button>
        </div>
        <div id='off-canvas'
          className={`lg:hidden fixed inset-0 ${
            isSidebarOpen ? 'block' : 'hidden'
          }`}
          onClick={() => setSidebarOpen(false)}
          
        ></div>
        {/* Sidebar for mobile */}
        <div 
          className={`lg:hidden fixed inset-0 bg-black-500 bg-opacity-10 transition-all ${
            isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={toggleSidebar}
        ></div>

        <div
          id="sidebar"
          className={`lg:hidden fixed top-0 left-0 w-72 h-full bg-gradient-to-b from-black via-gray-900 to-black text-white shadow-2xl transition-transform transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } z-50 flex flex-col`}
        >
          <div className="flex items-center justify-between px-6 py-3 ">
            <div className="flex items-center">
              <img className="mr-3 rounded shadow-lg" src={img.src} alt="" style={{ height: '32px' }} />
              <span className="text-xl font-bold tracking-wide">CryptoWatch</span>
            </div>
            <button
              className="text-gray-400 hover:text-primary text-2xl focus:outline-none"
              onClick={toggleSidebar}
              aria-label="Close sidebar"
            >
            </button>
          </div>
          <ul className="flex flex-col gap-2 px-4 py-6">
            <li className="w-full">
              <Link
          className="flex items-center gap-3 rounded-lg px-5 py-3 w-full transition-all bg-gradient-to-r from-black via-gray-900 to-black hover:from-primary/80 hover:to-primary/60 hover:text-white shadow hover:shadow-lg"
          href="/"
          onClick={toggleSidebar}
              >
          <span className="material-icons text-lg">Home</span>
              </Link>
            </li>
            <li className="w-full">
              <Link
          className="flex items-center gap-3 rounded-lg px-5 py-3 w-full transition-all bg-gradient-to-r from-black via-gray-900 to-black hover:from-primary/80 hover:to-primary/60 hover:text-white shadow hover:shadow-lg"
          href="/"
          onClick={e => {
            toggleSidebar();
            scrollto();
          }}
              >
          <span className="material-icons text-lg">Coins</span>
          
              </Link>
            </li>
            <li className="w-full">
              <Link
          className="flex items-center gap-3 rounded-lg px-5 py-3 w-full transition-all bg-gradient-to-r from-black via-gray-900 to-black hover:from-primary/80 hover:to-primary/60 hover:text-white shadow hover:shadow-lg"
          href="/calculator"
          onClick={toggleSidebar}
              >
          <span className="material-icons text-lg">Profit Calculator</span>
          
              </Link>
            </li>
            <li className="w-full">
              <Link
          className="flex items-center gap-3 rounded-lg px-5 py-3 w-full transition-all bg-gradient-to-r from-black via-gray-900 to-black hover:from-primary/80 hover:to-primary/60 hover:text-white shadow hover:shadow-lg"
          href="/about"
          onClick={toggleSidebar}
              >
          <span className="material-icons text-lg">About Us</span>
          
              </Link>
            </li>
            <li className="w-full">
              <Link
          className="flex items-center gap-3 rounded-lg px-5 py-3 w-full transition-all bg-gradient-to-r from-black via-gray-900 to-black hover:from-primary/80 hover:to-primary/60 hover:text-white shadow hover:shadow-lg"
          href="/"
          onClick={toggleSidebar}
              >
          <span className="material-icons text-lg">Contact</span>
          
              </Link>
            </li>
          </ul>
          <div className="mt-auto px-6 pb-6 text-xs text-gray-500">
            &copy; {new Date().getFullYear()} CryptoWatch. All rights reserved.
          </div>
        </div>

        {/* Desktop menu */}
        <ul className="hidden lg:flex items-center bg-black/95 rounded-b-xl shadow-lg px-4 py-2">
          <img src={img.src} alt="" style={{height:"35px" ,marginLeft:"20px"}}/> 
          <h1 id="nav-h1" className="text-white ml-2 mr-6 font-bold text-lg">CryptoWatch</h1>
          <li className="relative group">
            <Link
              className="relative flex items-center justify-center rounded px-8 py-3 transition-all text-white hover:bg-primary/20 hover:text-primary"
              href="/"
            >
              Home
            </Link>
          </li>
          <li className="relative group">
            <Link
              className="relative flex items-center justify-center rounded px-8 py-3 transition-all text-white hover:bg-primary/20 hover:text-primary"
              href="/"
              onClick={scrollto}
            >
              Coins
            </Link>
          </li>
          <li className="relative group">
            <Link
              className="relative flex items-center justify-center rounded px-8 py-3 transition-all text-white hover:bg-primary/20 hover:text-primary"
              href="/calculator"
            >
              Profit Calculator
            </Link>
          </li>
          <li className="relative group">
            <Link
              className="relative flex items-center justify-center rounded px-8 py-3 transition-all text-white hover:bg-primary/20 hover:text-primary"
              href="/about"
            >
              About Us
            </Link>
          </li>
          <li className="relative group">
            <Link
              className="relative flex items-center justify-center rounded px-8 py-3 transition-all text-white hover:bg-primary/20 hover:text-primary"
              href="/"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </MotionConfig>
  );
};

export default Menu;
