import { Token } from "../entities/token.entity";

export interface TokenPrices {
  tokens: Token[];
  priceTimestamp: Date;
}