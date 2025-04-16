"use client"
import { motion } from "framer-motion";
import { CryptoTicker } from "../components1/layout/crypto-ticker";
import { Timeline } from "../components1/about/timeline";
import { TeamMember } from "../components1/about/team-member";
import { timelineItems, teamMembers } from "../lib1/constants";
import { Shield, BarChart3, Globe } from "lucide-react";
import { useState,useEffect } from "react";
import { Coin } from "../page";
import Marquee from "react-fast-marquee";
import MarqueeBar from "../components/MarqueeBar";
import { Search, TrendingUp, Newspaper, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { MarqueeAnimation } from "@/components/ui/marquee-effect";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Meteors } from "@/components/ui/meteors";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";


export default function About() {
     const [coins, setCoins] = useState<Coin[]>([]);   
     const [error, setError] = useState<string | null>(null);
     const [loading, setLoading] = useState(true);  
  useEffect(() => {
    let isMounted = true;

    const fetchCoins = async () => {
      const options = {
        method: "GET",
        url: "https://api.coingecko.com/api/v3/coins/markets",
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 100,
          sparkline: false,
          price_change_percentage: "24h,7d",
        },
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-kn4mzED9f94TGtdGsPf3sZrd",
        },
      };

      axios
        .request(options)
        .then((res) => {
          if (isMounted) {
            setCoins(res.data);
            setError(null);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (isMounted) {
            console.error("Error fetching coins:", err);
            setError(
              "Failed to load cryptocurrency data. Please try again later."
            );
            setLoading(false);
          }
        });
    };

    fetchCoins();
    const interval = setInterval(fetchCoins, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const scrollbtn = ()=>{
   
    const position = window.scrollY + 700;
    window.scrollTo({ top: position, behavior: 'smooth' });
  }

  return (
      <div className="flex flex-col ">
        <Marquee
          direction="left"
          speed={120}
          className="bg-black-500 text-white py-2"
        >
         
            {coins.slice(0, 8).map((coin) => (
              <div key={coin.id} className="flex items-center gap-1">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full"

                  // className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                />
                <div className="flex items-center gap-0">
                  <span className="text-sm sm:text-base font-medium gap-0 sm:block hidden">
                    {coin.name}
                  </span>
                  <span className="text-xs font-medium gap-0 block sm:hidden">
                    {coin.name}
                  </span>
                  <div className="flex items-center gap-0 ml-1 mr-6">
                    {coin.price_change_percentage_24h > 0 ? (
                      <ArrowRight className="w-4 h-4 text-green-500 rotate-45" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-red-500 rotate-[135deg]" />
                    )}
                    <span
                      className={`text-sm ${
                        coin.price_change_percentage_24h > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          
        </Marquee>
       {/* </div> */}
       <MarqueeBar />
      
      {/* Hero Section */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,149,255,0.15)_0%,transparent_70%)]"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About CryptoWatch</h1>
            <p className="text-xl text-gray-400 mb-8">
              Leading the future of digital asset intelligence with real-time data, advanced analytics, and insightful market trends.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Our Mission */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-400 mb-6">
                Founded in 2018, CryptoWatch is on a mission to democratize access to cryptocurrency data and insights, making them accessible to everyone from beginners to experienced traders.
              </p>
              <p className="text-gray-400 mb-6">
                We believe in the transformative power of blockchain technology and digital assets to reshape the global financial landscape, creating a more inclusive and efficient ecosystem.
              </p>
              <p className="text-gray-400">
                Our platform is built on the core principles of accuracy, security, and user experience, providing our users with the tools they need to navigate the complex world of cryptocurrencies with confidence.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-[0_0_15px_rgba(0,149,255,0.1)]">
                <Shield className="h-10 w-10 text-blue-500 mb-4" />
                <h3 className="text-lg font-bold mb-2">Security First</h3>
                <p className="text-gray-400 text-sm">
                  We prioritize the security of our platform and your data with industry-leading encryption and best practices.
                </p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-[0_0_15px_rgba(0,149,255,0.1)]">
                <BarChart3 className="h-10 w-10 text-blue-500 mb-4" />
                <h3 className="text-lg font-bold mb-2">Data Accuracy</h3>
                <p className="text-gray-400 text-sm">
                  Our real-time data feeds and analytics are sourced from multiple reliable exchanges to ensure accuracy.
                </p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-[0_0_15px_rgba(0,149,255,0.1)]">
                <Globe className="h-10 w-10 text-blue-500 mb-4" />
                <h3 className="text-lg font-bold mb-2">Global Reach</h3>
                <p className="text-gray-400 text-sm">
                  Serving users in over 150 countries with localized data and insights for global crypto markets.
                </p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-[0_0_15px_rgba(0,149,255,0.1)]">
                <BarChart3 className="h-10 w-10 text-blue-500 mb-4" />
                <h3 className="text-lg font-bold mb-2">Advanced Analytics</h3>
                <p className="text-gray-400 text-sm">
                  Powerful tools for technical analysis, market sentiment, and trend prediction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Journey */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <Timeline items={timelineItems} />
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={member.name}
                name={member.name}
                position={member.position}
                bio={member.bio}
                socials={member.socials}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-8 rounded-lg text-center shadow-[0_0_15px_rgba(0,149,255,0.1)]"
            >
              <div className="text-blue-500 text-4xl font-bold mb-2">1M+</div>
              <div className="text-gray-300">Active Users</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-8 rounded-lg text-center shadow-[0_0_15px_rgba(0,149,255,0.1)]"
            >
              <div className="text-blue-500 text-4xl font-bold mb-2">17K+</div>
              <div className="text-gray-300">Cryptocurrencies Tracked</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-8 rounded-lg text-center shadow-[0_0_15px_rgba(0,149,255,0.1)]"
            >
              <div className="text-blue-500 text-4xl font-bold mb-2">350+</div>
              <div className="text-gray-300">Exchanges Monitored</div>
            </motion.div>
          </div>
        </div>
      </section>
        {/* Footer */}
        <footer className="bg-secondary/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-20">
            <div>
              <h3 className="text-xl font-bold text-primary mb-4">
                CryptoWatch
              </h3>
              <p className="text-muted-foreground">
                Your trusted source for cryptocurrency market data and insights.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    API Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Market Data
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 CryptoWatch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
