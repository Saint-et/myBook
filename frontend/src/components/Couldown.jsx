import React, { useState, useEffect } from 'react';

function Countdown() {
    const [count, setCount] = useState(1);

    console.log(count);

    useEffect(() => {
        const interval = setInterval(() => {
            if (count < 5) {
                setCount(count + 1);
            } else {
                setCount(1); // Réinitialisez le compte à rebours à 1 lorsque nous atteignons 5
            }
        }, 5000); // Mettre à jour toutes les 5 secondes (5000 millisecondes)

        return () => {
            clearInterval(interval); // Arrêtez l'intervalle lorsque le composant est démonté
        };
    }, [count])

    return (
        <>
            <div>
                <h1>Compte à rebours : {count}</h1>
            </div>

        </>
    );
}

export default Countdown;