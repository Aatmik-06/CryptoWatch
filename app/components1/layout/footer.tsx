import { Link } from "wouter";
import { Github, Twitter, Linkedin, Facebook } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-gray-900 border-t border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-blue-500 font-semibold text-lg mb-4">CryptoWatch</h3>
            <p className="text-gray-400 text-sm">
              Track real-time cryptocurrency prices, market trends, and insights on the most secure 
              and advanced crypto platform.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-400 hover:text-blue-500 transition-colors">Home</Link></li>
              <li><Link href="/coins" className="text-gray-400 hover:text-blue-500 transition-colors">Coins</Link></li>
              <li><Link href="/nfts" className="text-gray-400 hover:text-blue-500 transition-colors">NFT's</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-blue-500 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-blue-500 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Market Analysis</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-blue-500 transition-colors">FAQ</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Github size={20} />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              Subscribe to our newsletter for the latest updates.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>© {currentYear} CryptoWatch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
