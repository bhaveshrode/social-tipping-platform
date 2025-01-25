import React from 'react';
import TipForm from './TipForm';

const CreatorList = ({ creators, onTip}) => {
    return (
        <div>
            <h3>Creators</h3>
            {creators.map((creator) => (
                <div key = {creator}>
                    <span>{creator}</span>
                    <TipForm creator = {creator} onTip={onTip} />
                </div>
            ))}
        </div>
    );
};

export default CreatorList;
