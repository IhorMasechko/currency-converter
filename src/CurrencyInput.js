import PropTypes from "prop-types";
import "./currencyInput.css";
import { useFlags } from "./hooks/useFlags";

function CurrencyInput(props) {
  const { currencies, onCurrencyChange, currency, onAmountChange, amount } =
    props;

  const { flagUrl } = useFlags(currency);

  return (
    <div className="group">
      <input
        type="text"
        value={amount}
        onChange={(ev) => onAmountChange(ev.target.value)}
        className="amount-input"
      />
      <img src={flagUrl} alt="Country Flag" />
      <select
        value={currency}
        onChange={(ev) => onCurrencyChange(ev.target.value)}
        className="currency-select"
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}

CurrencyInput.propTypes = {
  amount: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array,
  onAmountChange: PropTypes.func,
  onCurrencyChange: PropTypes.func,
};

export default CurrencyInput;
