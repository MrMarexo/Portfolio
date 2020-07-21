import React, { useEffect, useState } from 'react';

import './App.css';

import CurrencyRow from './CurrencyRow/CurrencyRow';
import CountryColumn from './CountryColumn';

const CONVERT_URL = 'https://api.exchangeratesapi.io/latest';
const COUNTRIES_URL = 'https://api.ipgeolocationapi.com/countries';
const PROXY = 'https://cors-anywhere.herokuapp.com/';

const ICON_CLASSES = ['fas', 'fa-sync-alt'];

let countriesData;

function App() {

  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [isFrom, setIsFrom] = useState(true);
  const [iconClasses, setIconClasses] = useState(['fas', 'fa-sync-alt']);
  const [dropdowns, setDropdowns] = useState([false, false]);
  const [lists, setLists] = useState([true, true]);
  const [toCountries, setToCoutries] = useState([]);
  const [fromCountries, setFromCountries] = useState([]);

  let fromAmount, toAmount;
  if (isFrom) {
    fromAmount = amount;
    toAmount = (amount * exchangeRate).toFixed(2);
  } else {
    toAmount = amount;
    fromAmount = (amount / exchangeRate).toFixed(2);
  }

  
  

  useEffect(() => {
    fetch(PROXY + COUNTRIES_URL)
      .then(res => res.json())
      .then(data => countriesData = data)
    fetch(CONVERT_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      })
    },[]);

  //console.log(countriesData);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${CONVERT_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then(res => res.json())
      .then(data => {
        setExchangeRate(data.rates[toCurrency]);
      })
      findCountries();
    }
    
  }, [fromCurrency, toCurrency]);

  const findCountries = () => {
    const to = [];
    for (let country in countriesData) {
      if (countriesData[country].currency_code === toCurrency) to.push(countriesData[country]);
    }

    const from = [];
    for (let country in countriesData) {
      if (countriesData[country].currency_code === fromCurrency) from.push(countriesData[country]);
    }
    const toInfo = to.map((el) => el.name);

    const fromInfo = from.map((el) => el.name);
    setFromCountries(fromInfo);
    setToCoutries(toInfo);
    

  }
  
  const changeValueHandler = (fromTo, e) => {
    setAmount(e.target.value);
    setIsFrom(fromTo);
  }
  
  const changeFromCurrencyHandler = (e) => {
    const value = e.target.value;
    if (value !== toCurrency) {
      setFromCurrency(value);
      closeDropdown(0);
    }
    else return;
  }

  const changeToCurrencyHandler = (e) => {
    const value = e.target.value;
    if (value !== fromCurrency) {
      setToCurrency(value);
      closeDropdown(1);
    }
    else return;
  }

  const switchCurrencies = () => {
    const classes = [...iconClasses, 'active'];
    setLists([false, false])
    setTimeout(() => {
      const newFromCurrency = toCurrency;
      const newToCurrency = fromCurrency;
      //setToCurrency('');
      setFromCurrency(newFromCurrency);
      setToCurrency(newToCurrency);
      setLists([true, true]);
    }, 500);
    setIconClasses(classes);
  };

  const removeClass = () => {
    setIconClasses([...ICON_CLASSES]);
  }

  const dropdownHandler = (which, e) => {
    const drops = [...dropdowns];
    const ls = [...lists];
    drops[which] = !drops[which];
    ls[which] = !lists[which];
    setDropdowns(drops);
    setLists(ls);
  }

  const closeDropdown = (which) => {
    console.log('run');
    const drops = [...dropdowns];
    const ls = [...lists];
    drops[which] = false;
    ls[which] = true;
    setDropdowns(drops);
    setLists(ls);
  }
  
  return (
    <React.Fragment>
      <div className="tops">
        <nav>
          <div className="logo">
            <h2>byMarexo</h2>
            <div className="empty"></div>
          </div>
          <ul>
            <li>Convert Currency</li>
            <li>About</li>
          </ul>
        </nav>
      </div>
      <section className="working">
        <CountryColumn currency={fromCurrency} countries={fromCountries} shouldShow={lists[0]}/>
        <div >
          <h1 className="convert">Convert</h1>
          <CurrencyRow curOptions={currencyOptions} value={fromCurrency} amount={fromAmount} drop={(e) => dropdownHandler(0, e)} shouldDrop={dropdowns[0]} spec="0"
            changeValue={(e) => changeValueHandler(true, e)} changeCurrency={changeFromCurrencyHandler}/> 
          <div className="icons"> 
            <i className={iconClasses.join(' ')} onAnimationEnd={removeClass} onClick={switchCurrencies}></i>
          </div>
          <CurrencyRow curOptions={currencyOptions} value={toCurrency} amount={toAmount} drop={(e) => dropdownHandler(1, e)} shouldDrop={dropdowns[1]} spec="1"
            changeValue={(e) => changeValueHandler(false, e)} changeCurrency={changeToCurrencyHandler}/>
        </div>
        <CountryColumn currency={toCurrency} countries={toCountries} shouldShow={lists[1]}/>
      </section>
      <footer>
        <h3 className="mention">Powered by 'exchangeratesapi.io' and 'ipgeolocationapi.com'</h3>
        <h3 className="mention">Created by Marexo</h3>
      </footer>
    </React.Fragment>

    
  );
};

export default App;
