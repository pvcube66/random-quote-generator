import { useEffect, useState } from 'react';
import './App.css';

interface Quote {
  quote: string;
  author: string;
  category: string;
}

const App = () => {
  const [val, setVal] = useState(0);
  const [quote, setQuote] = useState<Quote>({
    quote: 'Press the button for wisdom',
    author: 'Your App',
    category: 'inspiration'
  });
  const [isLoading, setIsLoading] = useState(false);

  async function fetchQuote(): Promise<Quote> {
    const res = await fetch("https://api.api-ninjas.com/v1/quotes", {
      headers: { 'X-Api-Key': 'h7dGb6sbfUJHxGChEPSi7A==kyg0q9eoEgYSYCYt' }
    });
    return (await res.json())[0];
  }

  useEffect(() => {
    const getQuote = async () => {
      const data = await fetchQuote();
      setQuote(data);
      setIsLoading(false);
    };
    if (isLoading) getQuote();
  }, [val, isLoading]);

  return (
    <div className="app-container">
      <div className="quote-card">
        {isLoading ? (
          <p className="loading">Loading wisdom...</p>
        ) : (
          <>
            <h1 className="quote-text">"{quote.quote}"</h1>
            <p className="author">— {quote.author}</p>
          </>
        )}
      </div>
      <button 
        className="sexy-button"
        onClick={() => {
          setVal(val + 1);
          setIsLoading(true);
        }}
      >
       Click Me
      </button>
    </div>
  );
};

export default App;