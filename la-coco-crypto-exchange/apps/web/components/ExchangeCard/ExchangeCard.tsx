"use client"

import { use, useEffect, useMemo, useState } from 'react';
import { Input, Button, Typography, Dropdown, Space } from 'antd';
import useCurrentDateTime from '@/hooks/useCurrentDateTime';
import { TokenApi } from '@/services/token/token.api';
import { Token } from '@/core/entities/token.entity';
import useTokenPrices from '@/hooks/useTokenPrices';

export default function ExchangeCard() {
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const currentDateTime = useCurrentDateTime();
  const [tokens, setTokens] = useState<{ [key: string]: Token }>({});
  const { prices, fetchTimestamp } = useTokenPrices();

  const getSupportedCurrencies = async () => {
    try {
      const tokens = await TokenApi.getSupportedTokens();
      setTokens(tokens.reduce((acc, token) => {
        acc[token.id] = token;
        return acc;
      }, {} as { [key: string]: Token }));

      setFromCurrency(tokens[0].id);
      setToCurrency(tokens[1].id);
    }
    catch (error) {
      console.error('Failed to fetch supported tokens', error);
    }
  };

  const dropdownMenuItems = useMemo(() => {
    return Object.keys(tokens).map((key) => {
      return {
        key,
        value: tokens[key].symbol,
        label: tokens[key].symbol,
      };
    });
  }, [tokens]);

  const handleSwitchCurrency = () => {
    const fromCurrencyTemp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrencyTemp);

    // setToValue( 1 / toValue || 1);
    const valueTmp = toValue;
    setToValue(fromValue);
    setFromValue(valueTmp);
  }

  useEffect(() => {
    getSupportedCurrencies();
  }, []);

  const rateByToken = useMemo(() => {
    let result = 0;
    if (prices[fromCurrency]?.usdPrice && prices[toCurrency]?.usdPrice) {
      result = prices[fromCurrency].usdPrice / prices[toCurrency].usdPrice || 1;
    }
    return result;
  }, [fromCurrency, prices, toCurrency]);

  return (
    <div className="max-w-md mx-auto p-4 rounded-xl bg-black">
      <div className="flex justify-center mb-4">
        <div className="flex space-x-4 flex-col">
          <Typography.Title level={2} className='text-center'>
            <span className='text-white'>La Coco Crypto Exchange</span>
          </Typography.Title>
          <div className='flex gap-2 justify-center'>
            <span>Current Time: </span>
            <div className='flex gap-2'>
              <span>{currentDateTime.date}</span>
              <span>{currentDateTime.time}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-left">
        <Typography.Title level={5}>
          <span className='text-white'>FROM</span>
        </Typography.Title>
        <div className="bg-gray-800 p-4 rounded-lg flex justify-between items-center gap-1">
          <Input placeholder="0" className="" value={fromValue} onChange={
            (e) => {
              setFromValue(Number(e.target.value));
              setToValue((parseFloat(e.target.value) * rateByToken) || 0);
            }
          }/>
          <Dropdown menu={{
            items: dropdownMenuItems,
            onClick: (e) => {
              if (fromCurrency === e.key) {
                return;
              }
              setFromCurrency(e.key);

              if (prices[e.key]?.usdPrice && prices[toCurrency]?.usdPrice) {
                const rate = prices[e.key].usdPrice! / prices[toCurrency].usdPrice! || 1;
                setToValue(fromValue * rate);
              }
            },
          }}>
            <Button className='w-[100px]'>
              <Space>
                {tokens[fromCurrency]?.symbol || 'loading...'}
              </Space>
            </Button>
          </Dropdown>
        </div>

        <Typography.Title level={5} className='mt-2'>
          <span className='text-white'>TO</span>
        </Typography.Title>
        <div className="bg-gray-800 p-4 rounded-lg flex justify-between items-center gap-1">
          <Input placeholder="0" className="" value={toValue} onChange={(e) => {
            setToValue(Number(e.target.value));
            setFromValue((parseFloat(e.target.value) / rateByToken || 1) || 0);
          }} />
          <Dropdown menu={{
            items: dropdownMenuItems,
            onClick: (e) => {
              if (toCurrency === e.key) {
                return;
              }
              setToCurrency(e.key);

              if (prices[fromCurrency]?.usdPrice && prices[e.key]?.usdPrice) {
                const rate = prices[fromCurrency].usdPrice / prices[e.key].usdPrice! || 1;
                setFromValue(toValue / rate);
              }
            },
          }}>
            <Button className='w-[100px]'>
              <Space>
                {tokens[toCurrency]?.symbol || 'loading...'}
              </Space>
            </Button>
          </Dropdown>
        </div>
      </div>

      <Button type="primary" className="w-full mt-4 bg-green-500 text-black" onClick={handleSwitchCurrency}>
        SWITCH INPUT
      </Button>

      <div>
        <Typography.Title level={5} className='mt-4'>
          <span className='text-white'>Exchange Rate</span>
        </Typography.Title>
        <div className="bg-gray-800 p-4 rounded-lg flex justify-center items-center gap-1">
          <span className='text-white'>1 {tokens[fromCurrency]?.symbol || 'loading...'} = {tokens[toCurrency]?.symbol || 'loading...'} {rateByToken}</span>
        </div>
      </div>

      <div>
        <Typography.Title level={5} className='mt-4'>
          <span className='text-white'>Supported Token List With USD Price</span>
        </Typography.Title>
        <Typography.Text type="secondary">
          <span className='text-white'>Last fetched at {fetchTimestamp?.date} {fetchTimestamp?.time}</span>
        </Typography.Text>
        <div className="bg-gray-800 p-4 rounded-lg text-left">
          <ul>
            {Object.keys(tokens).map((key) => {
              return (
                <li key={key} className='text-white'>
                  <div className='flex justify-between'>
                    <span>{tokens[key].symbol}</span>
                    <span className='ml-2'>${prices[key]?.usdPrice || 'loading...'} USD</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
