import CoinDetails from './CoinDetails';
import CoinContextProvider from '../../coincontext/CoinContext';

// Define which coin IDs should be pre-rendered at build time
export async function generateStaticParams() {
  // Always include these essential coins
  const essentialCoins = [
    'bitcoin',
    'ethereum',
    'tether',
    'binancecoin',
    'ripple',
    'cardano',
    'solana',
    'polkadot',
    'dogecoin',
    'avalanche-2',
    'polygon',
    'usd-coin',
    'shiba-inu',
    'tron',
    'chainlink',
    'wrapped-bitcoin',
    'uniswap',
    'litecoin',
    'bitcoin-cash',
    'dai',
    'cosmos',
    'stellar',
    'monero',
    'ethereum-classic',
    'okb',
    'crypto-com-chain',
    'algorand',
    'bitcoin-sv',
    'vechain',
    'filecoin',
    'internet-computer',
    'theta-token',
    'tezos',
    'aave',
    'eos',
    'quant-network',
    'elrond-erd-2',
    'iota',
    'the-graph',
    'neo',
    'kucoin-shares',
    'pancakeswap-token',
    'maker',
    'klay-token',
    'terra-luna',
    'ftx-token',
    'compound-ether',
    'amp-token',
    'helium',
    'decentraland',
    'axie-infinity',
    'harmony',
    'chiliz',
    'enjincoin',
    'zilliqa',
    'synthetix-network-token',
    'theta-fuel',
    'huobi-token',
    'near',
    'basic-attention-token',
    'waves',
    'celo',
    'holotoken',
    'curve-dao-token',
    'kava',
    'nexo',
    'arweave',
    'blockstack',
    'dash',
    'renbtc',
    'compound-governance-token',
    '0x',
    'omisego',
    'reserve-rights-token',
    'uma',
    'yearn-finance',
    'icon',
    'ravencoin',
    'siacoin',
    'serum',
    'balancer',
    'sushi',
    'swipe',
    'band-protocol',
    'ankr',
    'ontology',
    'iostoken',
    'wazirx',
    'digibyte',
    'lisk',
    'nervos-network',
    'golem',
    'augur',
    'loopring',
    'oasis-network',
    'decred',
    'qtum',
    'zencash',
    'bittorrent',
    'status',
    'nano',
    'hive',
    'bitcoin-gold',
    'horizen',
    'steem',
    'pax-gold',
    'trueusd',
    'hedera-hashgraph',
    'ren',
    'bancor',
    'kyber-network',
    'numeraire',
    'fetch-ai',
    'civic',
    'district0x',
    'funfair',
    'gnosis',
    'gifttoken',
    'metal',
    'request-network',
    'stormx',
    'veritaseum',
    'wink',
    'wrapped-nxm',
    'xdce-crowd-sale',
    'yearn-finance-ii',
    'zcoin',
    '0chain',
    '1inch',
    'aelf',
    'aergo',
    'aion',
    'akropolis',
    'aleph-im',
    'alpha-finance-lab',
    'amber',
    'ampleforth',
    'ankr-network',
    'apollo-currency',
    'appcoins',
    'aragon',
    'ardor',
    'ark',
    'arpa-chain',
    'audius',
    'aurora',
    'aventus',
    'bancor-network-token',
    'barnbridge',
    'beam',
    'bella-protocol',
    'bepro-network',
    'bibox-token',
    'binance-usd',
    'bitcoin-diamond',
    'bitcoin-private',
    'bitcoin-rhodium',
    'bitcoinz',
    'bitcore',
    'bitmax-token',
    'bitrue-token',
    'bitshares',
    'blackcoin',
    'bluzelle',
    'bosagora',
    'bounce-token',
    'bread',
    'bridge-oracle',
    'btu-protocol',
    'bytecoin',
    'cargo-x',
    'cartesi',
    'celsius-degree-token',
    'centrifuge',
    'certik',
    'cindicator',
    'civic-power',
    'coin98',
    'coinbase-stock',
    'coinmetro',
    'coinvest',
    'compound-usd-coin',
    'conflux-token',
    'constellation-labs',
    'contentos',
    'coti',
    'cream-2',
    'cred'
        
  ];

  try {
    // Fetch all available coins from the API
    const response = await fetch('https://api.coingecko.com/api/v3/coins/list', {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch coins list');
    }

    const coins = await response.json();
    
    // Start with essential coins
    const allCoins = [...essentialCoins];
    
    // Add additional coins up to 500
    for (const coin of coins) {
      if (!allCoins.includes(coin.id) && allCoins.length < 500) {
        allCoins.push(coin.id);
      }
    }

    return allCoins.map((id) => ({
      id,
    }));
  } catch (error) {
    console.error('Error fetching coins list:', error);
    // If API call fails, return at least the essential coins
    return essentialCoins.map((id) => ({
      id,
    }));
  }
}

export default function CoinPage({ params }: { params: { id: string } }) {
  return (
    <CoinContextProvider>
      <CoinDetails id={params.id} />
    </CoinContextProvider>
  );
}
