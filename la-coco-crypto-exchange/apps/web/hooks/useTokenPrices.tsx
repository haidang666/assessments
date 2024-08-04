import { Token } from '@/core/entities/token.entity';
import { TokenApi } from '@/services/token/token.api';
import { useEffect, useState } from 'react';

interface DateTime {
  date: string;
  time: string;
}

interface TokenPrices {
  prices: {[key: string]: Token};
  fetchTimestamp: DateTime | null;
}

const THIRTY_SECONDS = 30000;

const useTokenPrices = () => {
  const [tokenPrices, setTokenPrices] = useState<TokenPrices>({
    prices: {},
    fetchTimestamp: null,
  });

  useEffect(() => {
    const fetchTokenPrices = async () => {
      const prices = await TokenApi.getSupportedTokenPrices();
      const date = new Date(prices.priceTimestamp);
      const fetchTimestamp = {
        date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
        time: `${date.getHours()}:${date.getMinutes()}`,
      };

      setTokenPrices({
        prices: prices.tokens.reduce((acc, token) => {
          acc[token.id] = token;
          return acc;
        }, {} as { [key: string]: Token }),
        fetchTimestamp,
      });
    };

    const intervalId = setInterval(fetchTokenPrices, THIRTY_SECONDS);

    fetchTokenPrices();

    return () => clearInterval(intervalId);
  }, []);

  return tokenPrices;
};

export default useTokenPrices;
