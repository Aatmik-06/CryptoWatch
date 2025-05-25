'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Github, Twitter, Globe, MessageCircle, BookOpen, Users, Activity, BarChart3, Link as LinkIcon, Calendar } from 'lucide-react';
import Link from 'next/link';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

interface CoinDetails {
  id: string;
  symbol: string;
  name: string;
  image: {
    large: string;
    small: string;
    thumb: string;
  };
  market_data: {
    current_price: {
      usd: number;
      eur: number;
      gbp: number;
    };
    market_cap: {
      usd: number;
      eur: number;
      gbp: number;
    };
    total_volume: {
      usd: number;
      eur: number;
      gbp: number;
    };
    high_24h: {
      usd: number;
      eur: number;
      gbp: number;
    };
    low_24h: {
      usd: number;
      eur: number;
      gbp: number;
    };
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
    market_cap_change_percentage_24h: number;
    total_supply: number;
    max_supply: number | null;
    circulating_supply: number;
    market_cap_rank: number;
  };
  community_data: {
    facebook_likes: number;
    twitter_followers: number;
    reddit_subscribers: number;
    telegram_channel_user_count: number;
  };
  developer_data: {
    forks: number;
    stars: number;
    subscribers: number;
    total_issues: number;
    closed_issues: number;
    pull_requests_merged: number;
    pull_request_contributors: number;
    code_additions_deletions_4_weeks: {
      additions: number;
      deletions: number;
    };
    commit_count_4_weeks: number;
  };
  description: {
    en: string;
  };
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    twitter_screen_name: string;
    facebook_username: string;
    bitcointalk_thread_identifier: number | null;
    telegram_channel_identifier: string;
    subreddit_url: string;
    repos_url: {
      github: string[];
      bitbucket: string[];
    };
  };
  genesis_date: string | null;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
}

interface PriceData {
  prices: [number, number][];
}


async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(url, { 
        signal: controller.signal,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error('Failed after retries');
}

export default function CoinDetails({ id }: { id: string }) {
  const [coinData, setCoinData] = useState<CoinDetails | null>(null);
  const [priceHistory, setPriceHistory] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState<'1d' | '7d' | '30d'>('7d');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCoinData = async () => {
      try {
        const [coinResponse, historyResponse] = await Promise.all([
          fetchWithRetry(`https://api.coingecko.com/api/v3/coins/${id}`),
          fetchWithRetry(
            `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${timeRange === '1d' ? '1' : timeRange === '7d' ? '7' : '30'}`
          ),
        ]);

        const coinData = await coinResponse.json();
        const historyData: PriceData = await historyResponse.json();

        if (isMounted) {
          setCoinData(coinData);
          setPriceHistory(
            historyData.prices.map(([timestamp, price]) => ({
              date: new Date(timestamp).toLocaleDateString(),
              price,
            }))
          );
          setError(null);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching coin data:', error);
          setError('Failed to load coin data. Please try again after 60 seconds.');
          setLoading(false);
        }
      }
    };

    fetchCoinData();
    const interval = setInterval(fetchCoinData, 1000000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [id, timeRange]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (error || !coinData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500">{error || 'Coin not found'}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
     
      <Link href="/" className="inline-flex items-center text-primary hover:underline mb-2 sm:mb-4 text-xs sm:text-sm">
        <ArrowLeft className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
        Back to Home
      </Link>

      {/* Header Section */}
      <Card className="p-2 sm:p-4 mb-2 sm:mb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-2">
          <div className="flex items-center gap-1 sm:gap-2">
            <img
              src={coinData.image.large}
              alt={coinData.name}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
            />
            <div>
              <h1 className="text-lg sm:text-xl font-bold">{coinData.name}</h1>
              <p className="text-sm sm:text-base text-muted-foreground uppercase">
                {coinData.symbol}
              </p>
            </div>
            <div style={{marginLeft:"40px"}}>
                <p className="text-xs sm:text-sm text-muted-foreground">Current Price</p>

                
                <p className="text-base sm:text-lg font-bold"> ${coinData.market_data.current_price.usd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </p>
              </div>
          </div>
          <div className="flex gap-1 w-full sm:w-auto">
            {coinData.links.homepage[0] && (
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-xs sm:text-sm h-7 sm:h-8" asChild>
                <a href={coinData.links.homepage[0]} target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                  Website
                </a>
              </Button>
            )}
            {coinData.links.twitter_screen_name && (
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-xs sm:text-sm h-7 sm:h-8" asChild>
                <a href={`https://twitter.com/${coinData.links.twitter_screen_name}`} target="_blank" rel="noopener noreferrer">
                  <Twitter className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                  Twitter
                </a>
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Price Chart Section */}
      <Card className="p-3 sm:p-4 mb-3 sm:mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
          <h2 className="text-lg sm:text-xl font-bold">Price History</h2>
          <div className="flex gap-1">
            <Button
              variant={timeRange === '1d' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('1d')}
              className="text-xs sm:text-sm h-7 sm:h-8"
            >
              24h
            </Button>
            <Button
              variant={timeRange === '7d' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('7d')}
              className="text-xs sm:text-sm h-7 sm:h-8"
            >
              7d
            </Button>
            <Button
              variant={timeRange === '30d' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('30d')}
              className="text-xs sm:text-sm h-7 sm:h-8"
            >
              30d
            </Button>
          </div>
        </div>
        <div className="h-[200px] sm:h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceHistory}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="#888888"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                domain={['auto', 'auto']}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border border-border rounded-lg p-2 shadow-lg">
                        <p className="text-sm text-muted-foreground">{payload[0].payload.date}</p>
                        <p className="text-sm font-bold">
  ${payload?.[0]?.value?.toLocaleString() ?? 'No data available'}
</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#00ffff"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 2, fill: '#00ffff' }}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Price and Market Data Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {/* Price and Market Data */}
        <Card className="p-3 sm:p-4">
          <h2 className="text-lg sm:text-xl font-bold mb-3">Price & Market Data</h2>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Current Price</p>
                <p className="text-base sm:text-lg font-bold">${coinData.market_data.current_price.usd.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Market Cap</p>
                <p className="text-base sm:text-lg font-bold">${(coinData.market_data.market_cap.usd / 1e9).toFixed(2)}B</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">24h Volume</p>
                <p className="text-base sm:text-lg font-bold">${(coinData.market_data.total_volume.usd / 1e9).toFixed(2)}B</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Market Rank</p>
                <p className="text-base sm:text-lg font-bold">#{coinData.market_data.market_cap_rank}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">24h Change</p>
                <p className={`text-xs sm:text-sm font-semibold ${coinData.market_data.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {coinData.market_data.price_change_percentage_24h > 0 ? '+' : ''}
                  {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">7d Change</p>
                <p className={`text-xs sm:text-sm font-semibold ${coinData.market_data.price_change_percentage_7d > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {coinData.market_data.price_change_percentage_7d > 0 ? '+' : ''}
                  {coinData.market_data.price_change_percentage_7d.toFixed(2)}%
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">30d Change</p>
                <p className={`text-xs sm:text-sm font-semibold ${coinData.market_data.price_change_percentage_30d > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {coinData.market_data.price_change_percentage_30d > 0 ? '+' : ''}
                  {coinData.market_data.price_change_percentage_30d.toFixed(2)}%
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">24h High</p>
                <p className="text-xs sm:text-sm font-semibold">${coinData.market_data.high_24h.usd.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">24h Low</p>
                <p className="text-xs sm:text-sm font-semibold">${coinData.market_data.low_24h.usd.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Supply Information */}
        <Card className="p-3 sm:p-4">
          <h2 className="text-lg sm:text-xl font-bold mb-3">Supply Information</h2>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Circulating Supply</p>
                <p className="text-base sm:text-lg font-bold">{coinData.market_data.circulating_supply.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Total Supply</p>
                <p className="text-base sm:text-lg font-bold">{coinData.market_data.total_supply.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Max Supply</p>
                <p className="text-base sm:text-lg font-bold">{coinData.market_data.max_supply ? coinData.market_data.max_supply.toLocaleString() : '∞'}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Genesis Date</p>
                <p className="text-base sm:text-lg font-bold">{coinData.genesis_date || 'N/A'}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Community Data */}
        <Card className="p-3 sm:p-4">
          <h2 className="text-lg sm:text-xl font-bold mb-3">Community Data</h2>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Twitter Followers</p>
                <p className="text-base sm:text-lg font-bold">
                  {coinData.community_data?.twitter_followers?.toLocaleString() || '0'}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Reddit Subscribers</p>
                <p className="text-base sm:text-lg font-bold">
                  {coinData.community_data?.reddit_subscribers?.toLocaleString() || '0'}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Telegram Users</p>
                <p className="text-base sm:text-lg font-bold">
                  {coinData.community_data?.telegram_channel_user_count?.toLocaleString() || '0'}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Facebook Likes</p>
                <p className="text-base sm:text-lg font-bold">
                  {coinData.community_data?.facebook_likes?.toLocaleString() || '0'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Sentiment Up</p>
                <p className="text-base sm:text-lg font-bold text-green-500">
                  {coinData.sentiment_votes_up_percentage?.toFixed(2) || '0.00'}%
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Sentiment Down</p>
                <p className="text-base sm:text-lg font-bold text-red-500">
                  {coinData.sentiment_votes_down_percentage?.toFixed(2) || '0.00'}%
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Developer Data */}
        <Card className="p-3 sm:p-4">
          <h2 className="text-lg sm:text-xl font-bold mb-3">Developer Data</h2>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">GitHub Stars</p>
                <p className="text-base sm:text-lg font-bold">{coinData.developer_data.stars.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">GitHub Forks</p>
                <p className="text-base sm:text-lg font-bold">{coinData.developer_data.forks.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Subscribers</p>
                <p className="text-base sm:text-lg font-bold">{coinData.developer_data.subscribers.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Total Issues</p>
                <p className="text-base sm:text-lg font-bold">{coinData.developer_data.total_issues.toLocaleString()}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Closed Issues</p>
                <p className="text-base sm:text-lg font-bold">{coinData.developer_data.closed_issues.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Pull Requests Merged</p>
                <p className="text-base sm:text-lg font-bold">{coinData.developer_data.pull_requests_merged.toLocaleString()}</p>
              </div>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Code Changes (4 weeks)</p>
              <div className="flex gap-2">
                <div>
                  
                  <p className="text-xs sm:text-sm text-green-500">+{coinData.developer_data?.code_additions_deletions_4_weeks?.additions?.toLocaleString() || '0'}</p>
                  <p className="text-xs sm:text-sm text-red-500">-{coinData.developer_data?.code_additions_deletions_4_weeks?.deletions?.toLocaleString() || '0'}</p>
                 
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-red-500">-{coinData.developer_data.code_additions_deletions_4_weeks.deletions?.toLocaleString() || '0'}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Links Section */}
      <Card className="p-3 sm:p-4 mt-3 sm:mt-4">
        <h2 className="text-lg sm:text-xl font-bold mb-3">Links & Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-2">Official Links</h3>
            <ul className="space-y-1">
              {coinData.links.homepage.map((link, index) => (
                <li key={index}>
                  <a href={link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs sm:text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-2">Social Media</h3>
            <ul className="space-y-1">
              {coinData.links.twitter_screen_name && (
                <li>
                  <a href={`https://twitter.com/${coinData.links.twitter_screen_name}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs sm:text-sm">
                    Twitter
                  </a>
                </li>
              )}
              {coinData.links.facebook_username && (
                <li>
                  <a href={`https://facebook.com/${coinData.links.facebook_username}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs sm:text-sm">
                    Facebook
                  </a>
                </li>
              )}
              {coinData.links.subreddit_url && (
                <li>
                  <a href={coinData.links.subreddit_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs sm:text-sm">
                    Reddit
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </Card>

      {/* About Section */}
      <Card className="p-3 sm:p-4">
        <h2 className="text-base sm:text-lg font-bold mb-2 flex items-center gap-1">
          <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
          About {coinData.name}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground whitespace-pre-line">
          {coinData.description.en}
        </p>
      </Card>
    </div>
  );
} 





