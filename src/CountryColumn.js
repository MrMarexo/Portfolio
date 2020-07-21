import React from 'react';

const CountryColumn = (props) => {
    return (
        <div className="country-box">
            <div className={props.shouldShow ? "country-list active" : "country-list"}>
                <h3>Countries with {props.currency}</h3>
                <ul>
                    {props.countries.map(el => <li key={el}>{el}</li>)}
                </ul>
            </div>
        </div>
        
    );
};

export default CountryColumn;
