import React from 'react'

export default function CurrencyRow(props) {
    return (
        <React.Fragment>
        {/*<div className="currow">
            <input type="number" value={props.amount} onChange={props.changeValue}/>
            <select value={props.value} onChange={props.changeCurrency}>
                {props.curOptions.map(el => <option key={el} value={el}>{el}</option>)}        
            </select>
        </div>*/}
        <div className="currow">
            <input type="number" value={props.amount} onChange={props.changeValue}/>
            <div className="select-box">
                <div className="selected" onClick={props.drop}>{props.value}</div>
                <div className={props.shouldDrop ? "options-container active" : "options-container"}>
                    {props.curOptions.map(el => (
                        <div className="option" key={el + props.spec}>
                            <input type="radio" className="radio" name={`dropdown-${props.spec}`} id={el + props.spec} value={el} onClick={props.changeCurrency}/>
                            <label htmlFor={el + props.spec}>{el}</label>
                        </div>
                    ))}
                </div>
            </div> 
        </div>
        </React.Fragment>
    )
};


