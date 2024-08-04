import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/tokens')
  getSupportedTokens() {
    return this.appService.getSupportedTokens();
  }

  @Get('/tokens/prices')
  getSupportedTokenPrices() {
    return this.appService.getSupportedTokenPrice();
  }
}
