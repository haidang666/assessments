import { TokenPrices } from "../dtos/token-prices.dto";
import { Token } from "../entities/token.entity";

export abstract class TokenRepository {
  abstract getSupportedTokens(): Promise<Token[]>;
  abstract getSupportedTokenPrices(): Promise<TokenPrices>;
}
