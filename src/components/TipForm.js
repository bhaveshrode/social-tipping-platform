import React,  { useState } from 'react';

const TipForm = ({ creator, onTip}) => {
    const [tipAmount, setTipAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (tipAmount){
            onTip(creator, tipAmount);
            setTipAmount('');
        }
    };

    return (
        <form onSubmit = {handleSubmit}>
            <input
                type = "text"
                placeholder = "Tip Amount in ETH"
                value = {tipAmount}
                onChange = {(e) => setTipAmount(e.target.value)}
            />
            <button type="submit">Tip</button>
        </form>
    );
};

export default TipForm;
