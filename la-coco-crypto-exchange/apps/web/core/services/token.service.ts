import { TokenPrices } from "../dtos/token-prices.dto";
import { Token } from "../entities/token.entity";
import { TokenRepository } from "../repositories/token.repository";


export class TokenService {
  constructor(private readonly tokenRepository: TokenRepository) {}

  async getSupportedTokens(
  ): Promise<Token[]> {
    return this.tokenRepository.getSupportedTokens();
  }

  async getSupportedTokenPrices(
  ): Promise<TokenPrices> {
    return this.tokenRepository.getSupportedTokenPrices();
  }
}
