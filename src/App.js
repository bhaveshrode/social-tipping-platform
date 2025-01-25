import React, { useState, useEffect } from 'react';
import web3 from './web3';
import Tipping from './contracts/Tipping.json';

const App = () => {
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState(null);
    const [creators, setCreators] = useState([]);
    const [tipAmount, setTipAmount] = useState('');

    useEffect(() => {
        const loadBlockchainData = async () => {
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);

            const networkId = await web3.eth.net.getId();
            const deployedNetwork = Tipping.networks[networkId];
            const instance = new web3.eth.Contract(
                Tipping.abi,
                deployedNetwork && deployedNetwork.address,
            );
            setContract(instance);
        };

        loadBlockchainData();
    }, []);

    const handleTip = async (creator) => {
        await contract.methods.tip(creator).send({from: account, value: web3.utils.toWei(tipAmount, 'ether') });
        setTipAmount('');
    };

    return (
        <div>
            <h1>Social Tipping Platform</h1>
            <h2>Your Account: {account}</h2>
            <input 
                type="text"
                placeholder = "Tip Amount in ETH"
                value = {tipAmount}
                onChange = {(e) => setTipAmount(e.target.value)}
            />
            <h3>Creators</h3>
            {creators.map((creator) => (
                <div key = {creator}>
                    <span>{creator}</span>
                    <button onClick = {() => handleTip(creator)}>Tip</button>
                </div>
            ))}
        </div>
    );
};

export default App;
