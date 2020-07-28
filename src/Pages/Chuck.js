import React, { useEffect, useState } from 'react';

import chuckImage from '../assets/chuck.png';
import howdyImage from '../assets/Howdy.png';

const LINK = 'https://api.chucknorris.io/jokes/random';

const Chuck = () => {

    const [joke, setJoke] = useState('A joke');
    const [active, setActive] = useState(true);
    const [showBubble, setShowBubble] = useState(false);

    useEffect(() => {
        getRandJoke();
    }, []);

    const ranJokeHandler = () => {
        setActive(false);
        setTimeout(() => {
            getRandJoke();
        }, 500);
        
    }

    const getRandJoke = () => {
        fetch(LINK)
            .then(res => res.json())
            .then(data => {
                setJoke(data.value);
                setActive(true);
            })
            .catch(err => {
                console.log(err);
                window.alert("Ooops! Something's wrong. Please reload the page.")})
    }



    return (
        <section className="chuck">
            <div className="chuck-img">
                <img className="chuck-himself" src={chuckImage} alt="chuck norris" onMouseEnter={() => setShowBubble(true)} onMouseLeave={() => setShowBubble(false)} />
            </div>

            <div className="chuck-btn">
                <button className="chutton" onClick={ranJokeHandler}>Give me another one!</button>
            </div>

            <div className="chuck-title">
                <h1>Chuck <span className="almighty">almighty</span></h1>   
            </div>

            <div className={active ? "chuck-note active" : "chuck-note"}>
                <h2 className={active ? "joke active" : "joke"}>{joke}</h2>
             </div>
            
            
        </section>
    );
};

export default Chuck;