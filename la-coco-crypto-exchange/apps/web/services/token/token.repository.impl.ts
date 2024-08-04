
import { TokenPrices } from "@/core/dtos/token-prices.dto";
import { Token } from "@/core/entities/token.entity";
import { TokenRepository } from "@/core/repositories/token.repository";
import { AxiosInstance } from "axios";

export class TokenRepositoryImpl implements TokenRepository {
  private readonly rest: AxiosInstance;
  constructor(rest: AxiosInstance) {
    this.rest = rest;
  }

  async getSupportedTokens(): Promise<Token[]> {
    const response = await this.rest.get("/tokens");
    return response.data;
  }
  async getSupportedTokenPrices(): Promise<TokenPrices> {
    const response = await this.rest.get("/tokens/prices");
    return response.data;
  }
}

export default TokenRepositoryImpl;
