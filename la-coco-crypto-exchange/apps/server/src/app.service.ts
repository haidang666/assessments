import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as NodeCache from 'node-cache';

export interface Token {
  id: string;
  symbol: string;
  usdPrice?: number;
}

@Injectable()
export class AppService {
  private cache: NodeCache;

  private readonly tokenPricesKey = 'tokenPrices';

  constructor() {
    this.cache = new NodeCache({
      stdTTL: 60,
    });
  }

  getSupportedTokens() {
    return [
      {
        symbol: 'BTC',
        id: 'bitcoin',
      },
      {
        symbol: 'ETH',
        id: 'ethereum',
      },
      {
        symbol: 'USDT',
        id: 'tether',
      },
      {
        symbol: 'SOL',
        id: 'solana',
      },
      {
        symbol: 'DOGE',
        id: 'dogecoin',
      },
    ];
  }

  async getSupportedTokenPrice() {
    const tokenList = this.getSupportedTokens() as Token[];
    const tokenIds = tokenList.map((token) => token.id).join(',');

    if (this.cache.has(this.tokenPricesKey)) {
      return this.cache.get(this.tokenPricesKey);
    }

    const result = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${tokenIds}&vs_currencies=usd`,
    );

    tokenList.forEach((token) => {
      token.usdPrice = result?.data[token.id]?.usd || 0;
    });

    const data = {
      tokens: tokenList,
      fetchTimestamp: new Date(),
    };

    this.cache.set(this.tokenPricesKey, data);
    return data;
  }
}
