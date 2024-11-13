import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [rates, setRates] = useState([]);
  const currencyList = ["CAD", "IDR", "JPY", "CHF", "EUR", "GBP"];

  useEffect(() => {
    const apiKey = "ff401cf54606454198e91b380a1d20e1";
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          `https://api.currencyfreaks.com/latest?apikey=${apiKey}&symbols=${currencyList.join(
            ","
          )}`
        );
        const fetchedRates = currencyList.map((currency) => {
          const exchangeRate = parseFloat(response.data.rates[currency]);
          return {
            currency,
            exchangeRate,
            weBuy: exchangeRate + exchangeRate * 0.05,
            weSell: exchangeRate - exchangeRate * 0.05,
          };
        });
        setRates(fetchedRates);
      } catch (error) {
        console.log(`Error fetching currency rates: ${error}`);
      }
    };
    fetchRates();
  }, []);

  return (
    <div className="w-screen min-h-screen flex justify-center items-center">
      <div className="relative overflow-x-auto w-3/5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Currency
              </th>
              <th scope="col" className="px-6 py-3">
                We Buy
              </th>
              <th scope="col" className="px-6 py-3">
                Exchange Rate
              </th>
              <th scope="col" className="px-6 py-3">
                We Sell
              </th>
            </tr>
          </thead>
          <tbody>
            {rates.map((rate) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={rate.currency}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {rate.currency}
                </th>
                <td className="px-6 py-4">{rate.weBuy.toFixed(4)}</td>
                <td className="px-6 py-4">{rate.exchangeRate.toFixed(6)}</td>
                <td className="px-6 py-4">{rate.weSell.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
