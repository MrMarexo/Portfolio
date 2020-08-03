import React, { useEffect, useState } from 'react';

import CurrencyRow from '../Components/CurrencyRow';
import CountryColumn from '../Components/CountryColumn';

const CONVERT_URL = 'https://api.exchangeratesapi.io/latest';
const COUNTRIES_URL = 'https://api.ipgeolocationapi.com/countries';
const PROXY = 'https://cors-anywhere.herokuapp.com/';

const ICON_CLASSES = ['fas', 'fa-sync-alt'];

let countriesData;

function Convert() {

  const [currencyOptions, setCurrencyOptions] = useState([]);
  //[from currency, to currency]
  const [currency, setCurrency] = useState([]);
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
      .catch(err => {
        console.log(err);
        window.alert("Ooops! Something's wrong. Please reload the page.")})
    fetch(CONVERT_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setCurrency([data.base, firstCurrency]);
        // setFromCurrency(data.base);
        // setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);

      })
      .catch(err => {
        console.log(err);
        window.alert("Ooops! Something's wrong. Please reload the page.")})
    },[]);


  useEffect(() => {
    if (currency[0] != null && currency[1] != null) {
      fetch(`${CONVERT_URL}?base=${currency[0]}&symbols=${currency[1]}`)
      .then(res => res.json())
      .then(data => {
        setExchangeRate(data.rates[currency[1]]);
      })
      .catch(err => {
        console.log(err);
        window.alert("Ooops! Something's wrong. Please reload the page.")})
      findCountries();
    }
    
  }, [currency]);

  const findCountries = () => {
    const to = [];
    for (let country in countriesData) {
      if (countriesData[country].currency_code === currency[1]) to.push(countriesData[country]);
    }

    const from = [];
    for (let country in countriesData) {
      if (countriesData[country].currency_code === currency[0]) from.push(countriesData[country]);
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
    if (value !== currency[1]) {
      setCurrency([value, currency[1]]);
      closeDropdown(0);
    }
    else return;
  }

  const changeToCurrencyHandler = (e) => {
    const value = e.target.value;
    if (value !== currency[0]) {
      setCurrency([currency[0], value]);
      closeDropdown(1);
    }
    else return;
  }

  const switchCurrencies = () => {
    const classes = [...iconClasses, 'active'];
    setLists([false, false])
    setTimeout(() => {
      const newFromCurrency = currency[1];
      const newToCurrency = currency[0];
      setCurrency([newFromCurrency, newToCurrency]);
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
    <div className="convert">
      <section className="working-space">
        <div className="country-section-landscape">
            <CountryColumn currency={currency[0]} countries={fromCountries} shouldShow={lists[0]}/>    
        </div> 
        <div className="convert-box">
            <div className="convert-box-real">
                <div className="title">
                    <h1>Convert</h1>
                </div>
                <CurrencyRow curOptions={currencyOptions} value={currency[0]} amount={fromAmount} drop={(e) => dropdownHandler(0, e)} shouldDrop={dropdowns[0]} spec="0"
                    changeValue={(e) => changeValueHandler(true, e)} changeCurrency={changeFromCurrencyHandler}/> 
                <div className="icons"> 
                    <i className={iconClasses.join(' ')} onAnimationEnd={removeClass} onClick={switchCurrencies}></i>
                </div>
                <CurrencyRow curOptions={currencyOptions} value={currency[1]} amount={toAmount} drop={(e) => dropdownHandler(1, e)} shouldDrop={dropdowns[1]} spec="1"
                    changeValue={(e) => changeValueHandler(false, e)} changeCurrency={changeToCurrencyHandler}/>
            </div>

            {/* only for portrait displays */}
            <div className="country-section-portrait">
                <CountryColumn currency={currency[0]} countries={fromCountries} shouldShow={lists[0]}/>
                <CountryColumn currency={currency[1]} countries={toCountries} shouldShow={lists[1]}/>
            </div>
        </div>
        {/* only for landscape displays */}
        <div className="country-section-landscape">
            <CountryColumn currency={currency[1]} countries={toCountries} shouldShow={lists[1]}/>
        </div>
        
      </section>
      <footer>
        <h3 className="mention">Powered by 'exchangeratesapi.io' and 'ipgeolocationapi.com'</h3>
        <h3 className="mention">Created by Marexo</h3>
      </footer>
    </div>

    
  );
};

export default Convert;
