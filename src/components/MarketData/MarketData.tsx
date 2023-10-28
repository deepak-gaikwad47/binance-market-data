import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  MarketDataContainer, 
  NoData, 
  TableCell, 
  TableHeader, 
  TableHeaderCell, 
  TickerDataContainer, 
  TradesTable 
} from '../../styledComponent/styledComponent';

interface TradeData {
  time: string;
  price: number;
  quantity: number;
}

const MarketData: React.FC<{ selectedPair: string }> = ({ selectedPair }) => {
  const [tickerData, setTickerData] = useState<any>(null); // Adjust the type as needed
  const [tradesData, setTradesData] = useState<TradeData[]>([]);
  const [sortField, setSortField] = useState<string>('time');
  const [sortDirection, setSortDirection] = useState<string>('asc');
  
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const [tickerResponse, tradesResponse] = await Promise.all([
          axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${selectedPair}`),
          axios.get(`https://api.binance.com/api/v3/trades?symbol=${selectedPair}`),
        ]);

        setTickerData(tickerResponse.data);
        const mappedTradeData: TradeData[] | undefined = tradesResponse?.data?.map((trade: any) => ({
          time: new Date(trade.time).toLocaleString(),
          price: parseFloat(trade.price),
          quantity: parseFloat(trade.qty),
        }));
        setTradesData(mappedTradeData || []);
      } catch (error) {
        console.error('Error fetching market data:', error);
      }
    };

    if (selectedPair) {
      fetchMarketData();
    }
  }, [selectedPair]);

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: string) => {
    if (field === sortField) {
      return sortDirection === 'asc' ? '↑' : '↓';
    }
    return '';
  };

  const sortedTrades = [...tradesData].sort((a, b) => {
    const multiplier = sortDirection === 'asc' ? 1 : -1;

    if (sortField === 'time') {
      return multiplier * (new Date(a.time).getTime() - new Date(b.time).getTime());
    }
    if (sortField === 'price') {
      return multiplier * (a.price - b.price);
    }
    if (sortField === 'quantity') {
      return multiplier * (a.quantity - b.quantity);
    }
    return 0;
  });

  return (
    <MarketDataContainer>
      {tickerData && (
        <TickerDataContainer>
          <h2>Ticker Data</h2>
          <pre>{JSON.stringify(tickerData, null, 2)}</pre>
        </TickerDataContainer>
      )}
      {tradesData.length > 0 ? (
        <div>
          <h2>Recent Trades</h2>
          <TradesTable>
            <TableHeader>
              <tr>
                <TableHeaderCell onClick={() => handleSort('time')}>Time {getSortIcon('time')}</TableHeaderCell>
                <TableHeaderCell onClick={() => handleSort('price')}>Price {getSortIcon('price')}</TableHeaderCell>
                <TableHeaderCell onClick={() => handleSort('quantity')}>Quantity {getSortIcon('quantity')}</TableHeaderCell>
              </tr>
            </TableHeader>
            <tbody>
              {sortedTrades.map((trade, index) => (
                <tr key={index}>
                  <TableCell>{trade.time}</TableCell>
                  <TableCell>{trade.price}</TableCell>
                  <TableCell>{trade.quantity}</TableCell>
                </tr>
              ))}
            </tbody>
          </TradesTable>
        </div>
      ) : (
        <NoData>No recent trades available.</NoData>
      )}
    </MarketDataContainer>
  );
};

export default MarketData;
