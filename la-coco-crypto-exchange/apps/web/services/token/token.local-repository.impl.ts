
import { TokenPrices } from "@/core/dtos/token-prices.dto";
import { Token } from "@/core/entities/token.entity";
import { TokenRepository } from "@/core/repositories/token.repository";
import { AxiosInstance } from "axios";

export class TokenRepositoryImpl implements TokenRepository {
  constructor(private readonly rest: AxiosInstance) {}

  async getSupportedTokens(): Promise<Token[]> {
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
    ]
  }
  async getSupportedTokenPrices(): Promise<TokenPrices> {

    return {
      tokens: [
        {
          symbol: 'BTC',
          id: 'bitcoin',
          usdPrice: 48000,
        },
        {
          symbol: 'ETH',
          id: 'ethereum',
          usdPrice: 3000,
        },
        {
          symbol: 'USDT',
          id: 'tether',
          usdPrice: 1,
        },
        {
          symbol: 'SOL',
          id: 'solana',
          usdPrice: 150,
        },
        {
          symbol: 'DOGE',
          id: 'dogecoin',
          usdPrice: 0.3,
        },
      ],
      priceTimestamp: new Date(),
    }
  }
}

export default TokenRepositoryImpl;
