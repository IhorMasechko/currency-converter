import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import CurrencyInput from "./CurrencyInput";

function App() {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("UAH");
  const [rates, setRates] = useState([]);
  const [usdToUahRate, setUsdToUahRate] = useState(null);
  const [eurToUahRate, setEurToUahRate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://openexchangerates.org/api/latest.json?app_id=af957a6f8d0949a287a8a9a2332f8144&base=USD`
        );

        const selectedCurrencies = ["USD", "EUR", "UAH"];
        const filteredRates = Object.fromEntries(
          Object.entries(response.data.rates).filter(([key]) =>
            selectedCurrencies.includes(key)
          )
        );

        setRates(filteredRates);
        setUsdToUahRate(filteredRates.UAH / filteredRates.USD);
        setEurToUahRate(filteredRates.UAH / filteredRates.EUR);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!!rates) {
      function init() {
        handleAmount1Change(1);
      }
      init();
    }
  }, [rates]);

  function format(number) {
    return number.toFixed(2);
  }

  function handleAmount1Change(amount1) {
    setAmount2(format((Number(amount1) * rates[currency2]) / rates[currency1]));
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(format((Number(amount1) * rates[currency2]) / rates[currency1]));
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setCurrency2(currency2);
  }

  return (
    <>
      <header>
        {usdToUahRate && eurToUahRate && (
          <p>
            Current Rate: 1 USD ={usdToUahRate.toFixed(2)} UAH, 1 EUR =
            {eurToUahRate.toFixed(2)} UAH
          </p>
        )}
      </header>

      <div className="container">
        <h1 className="nameConverter">Currency Converter</h1>
        <CurrencyInput
          onAmountChange={handleAmount1Change}
          onCurrencyChange={handleCurrency1Change}
          currencies={Object.keys(rates)}
          amount={amount1.toString()}
          currency={currency1}
        />
        <CurrencyInput
          onAmountChange={handleAmount2Change}
          onCurrencyChange={handleCurrency2Change}
          currencies={Object.keys(rates)}
          amount={amount2.toString()}
          currency={currency2}
        />
      </div>
      <footer>
        <p>Built with ❤️ by Ihor Masechko using React</p>
      </footer>
    </>
  );
}

export default App;
