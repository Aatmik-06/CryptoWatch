// import { Link, useLocation } from "wouter";
// import { cn } from "@/lib/utils";

// export function Navbar() {
//   const [location] = useLocation();

//   const navItems = [
//     { name: "Home", path: "/" },
//     { name: "Coins", path: "/coins" },
//     { name: "NFT's", path: "/nfts" },
//     { name: "About Us", path: "/about" },
//     { name: "Contact", path: "/contact" },
//   ];

//   return (
//     <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/90 border-b border-gray-800">
//       <div className="container mx-auto flex items-center justify-between h-16 px-4">
//         <Link href="/" className="flex items-center gap-2">
//           <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
//             <span className="text-white font-bold">CW</span>
//           </div>
//           <span className="text-blue-500 font-bold text-xl">CryptoWatch</span>
//         </Link>
        
//         <nav className="hidden md:flex">
//           <ul className="flex space-x-8">
//             {navItems.map((item) => (
//               <li key={item.path}>
//                 <Link 
//                   href={item.path}
//                   className={cn(
//                     "text-gray-300 hover:text-blue-500 transition-colors py-2",
//                     location === item.path && "text-blue-500 border-b-2 border-blue-500"
//                   )}
//                 >
//                   {item.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
        
//         <div className="md:hidden">
//           {/* Mobile menu toggle would go here */}
//         </div>
//       </div>
//     </header>
//   );
// }
