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

            {list?.map((item) => {
              return (
                <li key={item.id} className="relative ml-9">
                  <Link
                    className="relative flex items-center justify-center rounded px-10 py-3 transition-all hover:bg-foreground/10"
                    href={item?.url}
                  >
                    {item?.title}
                  </Link>
                  {item?.dropdown && (
                    <div
                      className="absolute left-0 top-full"
                      onMouseEnter={() => setHovered(item.id)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <motion.div
                        layout
                        transition={{ bounce: 0 }}
                        initial={{ y: 10 }}
                        animate={{ y: 0 }}
                        exit={{ y: 10 }}
                        className="mt-4 flex w-64 flex-col rounded bg-background border"
                      >
                        {item?.items?.map((nav) => {
                          return (
                            <motion.a
                              key={`link-${nav?.id}`}
                              href={`${nav?.url}`}
                              className="w-full p-4 hover:bg-muted"
                            >
                              {nav?.title}
                            </motion.a>
                          );
                        })}
                      </motion.div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Desktop menu */}
        <ul className="hidden lg:flex items-center">
        <img src={img.src} alt="" style={{height:"35px" ,marginLeft:"20px"}}/> <h1 id="nav-h1">  CryptoWatch</h1>
          {list?.map((item ) => {
            return (
              <li key={item.id} className="relative">
                <Link
                  className={`relative flex items-center justify-center rounded px-8 py-3 transition-all
                    hover:bg-foreground/10
                    ${hovered === item?.id ? 'bg-foreground/10' : ''}`}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  href={item?.url}
                >
                  {item?.title}
                </Link>
                {hovered === item?.id && !item?.dropdown && (
                  <motion.div
                    layout
                    layoutId={`cursor`}
                    className="absolute h-0.5 w-full bg-foreground"
                  />
                )}
                {item?.dropdown && hovered === item?.id && (
                  <div
                    className="absolute left-0 top-full"
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <motion.div
                      layout
                      transition={{ bounce: 0 }}
                      initial={{ y: 10 }}
                      animate={{ y: 0 }}
                      exit={{ y: 10 }}
                      style={{
                        borderRadius: '8px',
                      }}
                      className="mt-4 flex w-64 flex-col rounded bg-background border"
                      layoutId={'cursor'}
                    >
                      {item?.items?.map((nav) => {
                        return (
                          <motion.a
                            key={`link-${nav?.id}`}
                            href={`${nav?.url}`}
                            className="w-full p-4 hover:bg-muted"
                          >
                            {nav?.title}
                          </motion.a>
                        );
                      })}
                    </motion.div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </MotionConfig>
  );
};

export default Menu;
