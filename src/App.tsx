import React, { useState } from 'react';
import './App.css';
import { MarketData, MarketDataForm } from './components';

function App() {
  const [selectedPair, setSelectedPair] = useState<string>('');

  const handleFormSubmit = (pair: string) => {
    setSelectedPair(pair);
  };
  
  return (
    <div>
      <h1>Binance Market Data Viewer</h1>
      <MarketDataForm onFormSubmit={handleFormSubmit} />
      {selectedPair && <MarketData selectedPair={selectedPair} />}
    </div>
  );
}

export default App;