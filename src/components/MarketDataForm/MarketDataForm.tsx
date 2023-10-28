import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, FormContainer, Label, LoadingText, Option, Select } from '../../styledComponent/styledComponent';

interface MarketDataFormProps {
  onFormSubmit: (pair: string) => void;
}

const MarketDataForm: React.FC<MarketDataFormProps> = ({ onFormSubmit }) => {
  const [currencyPairs, setCurrencyPairs] = useState<string[]>([]);
  const [selectedCurrencyPair, setSelectedCurrencyPair] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPairs = async () => {
      try {
        const response = await axios.get('https://api.binance.com/api/v3/exchangeInfo');
        const availablePairs = response.data.symbols.map((symbol: { symbol: string }) => symbol.symbol);
        setCurrencyPairs(availablePairs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching currency pairs:', error);
      }
    };
    fetchPairs();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(selectedCurrencyPair);
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        {loading ? (
          <LoadingText>Loading currency pairs...</LoadingText>
        ) : (
          <>
            <Label htmlFor="currencyPairSelect">Select a Currency Pair: </Label>
            <Select
              id="currencyPairSelect"
              value={selectedCurrencyPair}
              onChange={(e: any) => setSelectedCurrencyPair(e.target.value)}
            >
              <Option value="">-- Select a pair --</Option>
              {currencyPairs.map((pair) => (
                <Option key={pair} value={pair}>
                  {pair}
                </Option>
              ))}
            </Select>
            <Button type="submit" disabled={!selectedCurrencyPair}>
              Fetch Market Data
            </Button>
          </>
        )}
      </Form>
    </FormContainer>
  );
};

export default MarketDataForm;
