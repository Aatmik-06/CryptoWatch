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

        <div id='sidebar'
          className={`lg:hidden fixed top-0 left-0 w-64 h-full bg-black text-white transition-transform transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } z-50`} 
        >
          <ul className="flex flex-col items-start p-4">
          <h1 id="nav-h1" className='flex flex-row mb-2'> <img className='mr-2' src={img.src} alt="" style={{height:"35px" }}/> <span className='mt-1'> CryptoWatch </span> </h1>

          <li className="relative">
            <Link
              className="relative flex items-center justify-center rounded px-8 py-3 transition-all hover:bg-foreground/10"
              href="/"
            >
              Home
            </Link>
          </li>
          <li className="relative">
            <Link
              className="relative flex items-center justify-center rounded px-8 py-3 transition-all hover:bg-foreground/10"
              href="/"
              onClick={scrollto}
            >
              Coins
            </Link>
          </li>
          <li className="relative">
            <Link
              className="relative flex items-center justify-center rounded px-8 py-3 transition-all hover:bg-foreground/10"
              href="/nfts"
            >
              NFT's
            </Link>
          </li>
          <li className="relative">
            <Link
              className="relative flex items-center justify-center rounded px-8 py-3 transition-all hover:bg-foreground/10"
              href="/"
            >
              About Us
            </Link>
          </li>
          <li className="relative">
            <Link
              className="relative flex items-center justify-center rounded px-8 py-3 transition-all hover:bg-foreground/10"
              href="/"
            >
              Contact
            </Link>
          </li>
          </ul>
        </div>

        {/* Desktop menu */}
        <ul className="hidden lg:flex items-center">
        <img src={img.src} alt="" style={{height:"35px" ,marginLeft:"20px"}}/> <h1 id="nav-h1">  CryptoWatch</h1>
          <li className="relative">
            <Link
              className="relative flex items-center justify-center rounded px-8 py-3 transition-all hover:bg-foreground/10"
              href="/"
            >
              Home
            </Link>
          </li>
          <li className="relative">
            <Link
              className="relative flex items-center justify-center rounded px-8 py-3 transition-all hover:bg-foreground/10"
              href="/"
              onClick={scrollto}
            >
              Coins
            </Link>
          </li>
          <li className="relative">
            <Link
              className="relative flex items-center justify-center rounded px-8 py-3 transition-all hover:bg-foreground/10"
                href="/"
            >
              NFT's
            </Link>
          </li>
          <li className="relative">
            <Link
              className="relative flex items-center justify-center rounded px-8 py-3 transition-all hover:bg-foreground/10"
              href="/"
            >
              About Us
            </Link>
          </li>
          <li className="relative">
            <Link
              className="relative flex items-center justify-center rounded px-8 py-3 transition-all hover:bg-foreground/10"
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
