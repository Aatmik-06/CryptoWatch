"use client";

import { useState } from "react";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";

interface NFT {
  id: string;
  contract_address: string;
  asset_platform_id: string;
  name: string;
  symbol: string;
  image: {
    small: string;
    small_2x: string;
  };
  banner_image: string;
  description: string;
  native_currency: string;
  native_currency_symbol: string;
  market_cap_rank: number;
  floor_price: {
    native_currency: string;
    native_currency_symbol: string;
    amount: number;
  };
}

const nftData: NFT = {
  id: "pudgy-penguins",
  contract_address: "0xBd3531dA5CF5857e7CfAA92426877b022e612cf8",
  asset_platform_id: "ethereum",
  name: "Pudgy Penguins",
  symbol: "PPG",
  image: {
    small: "https://coin-images.coingecko.com/nft_contracts/images/38/small/pudgy.jpg?1730778323",
    small_2x: "https://coin-images.coingecko.com/nft_contracts/images/38/small_2x/pudgy.jpg?1730778323"
  },
  banner_image: "https://coin-images.coingecko.com/nft_contracts/images/20/bored-ape-yacht-club-banner.png?1708416120",
  description: "Pudgy Penguins is a collection of 8,888 unique NFTs featuring cute cartoon penguins, which are generated from a collection of 150 different hand-drawn traits.",
  native_currency: "ethereum",
  native_currency_symbol: "ETH",
  market_cap_rank: 3,
  floor_price: {
    native_currency: "ethereum",
    native_currency_symbol: "ETH",
    amount: 9.70
  }
};

const nftList = [
  {
    id: "cryptopunks",
    name: "CryptoPunks",
    platform: "Ethereum",
    floor_price: 42.59,
    market_cap: 762976045,
    volume_24h: 425644,
    sales_24h: 96.98
  },
  {
    id: "infinex-patrons",
    name: "Infinex Patrons",
    platform: "Ethereum",
    floor_price: 2.32,
    market_cap: 415864551,
    volume_24h: 232000,
    sales_24h: 5.89
  },
  {
    id: "bored-ape-yacht-club",
    name: "Bored Ape Yacht Club",
    platform: "Ethereum",
    floor_price: 14.25,
    market_cap: 255382959,
    volume_24h: 142472,
    sales_24h: 105.64
  },
  {
    id: "pudgy-penguins",
    name: "Pudgy Penguins",
    platform: "Ethereum",
    floor_price: 9.70,
    market_cap: 154537361,
    volume_24h: 86212,
    sales_24h: 66.32
  },
  // Add more NFTs here as needed
];

export default function NFTPage() {
  return (
    <main className="min-h-screen">
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pt-8 sm:pt-20 pb-16 sm:pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12">
            <div className="space-y-4 sm:space-y-8 px-4 sm:px-6">
              <div className="flex flex-wrap justify-items-end gap-4 text-xs sm:text-sm p-4 rounded-lg shadow-lg">
                <NeonGradientCard>
                  <div className="flex items-center gap-3 p-3 shadow-md w-full sm:w-24 md:w-32 lg:w-48 xl:w-60">
                    <span className="text-muted-foreground text-gray-300 text-xs sm:text-sm">
                      Market Cap Rank:
                    </span>
                    <span className="font-medium text-xs sm:text-sm text-white">
                      #{nftData.market_cap_rank}
                    </span>
                  </div>
                </NeonGradientCard>

                <NeonGradientCard>
                  <div className="flex items-center gap-3 p-3 shadow-md w-full sm:w-24 md:w-32 lg:w-48 xl:w-60">
                    <span className="text-muted-foreground text-gray-300 text-xs sm:text-sm">
                      Floor Price:
                    </span>
                    <span className="font-medium text-xs sm:text-sm text-white">
                      {nftData.floor_price.amount} {nftData.floor_price.native_currency_symbol}
                    </span>
                  </div>
                </NeonGradientCard>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
                {nftData.name}
              </h1>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-muted-foreground">
                {nftData.description}
              </p>
            </div>

            <div className="relative order-first sm:order-last">
              <img
                src={nftData.banner_image}
                alt={nftData.name}
                className="relative rounded-2xl w-full sm:w-3/4 md:w-full h-auto object-cover shadow-lg sm:shadow-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mt-8">
            {nftList.map((nft) => (
              <NeonGradientCard key={nft.id}>
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{nft.name}</h2>
                  <p className="text-sm text-muted-foreground">{nft.platform}</p>
                  <div className="mt-2">
                    <p className="text-sm">
                      Floor Price: {nft.floor_price} ETH
                    </p>
                    <p className="text-sm">
                      Market Cap: ${nft.market_cap.toLocaleString()}
                    </p>
                    <p className="text-sm">
                      24h Volume: {nft.volume_24h} ETH
                    </p>
                    <p className="text-sm">
                      24h Sales: {nft.sales_24h} ETH
                    </p>
                  </div>
                </div>
              </NeonGradientCard>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}