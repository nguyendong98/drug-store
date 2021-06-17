import React from 'react';
import './Spinner.scss'
import spinner from 'assets/images/spinner.gif';

export default function Spinner() {
    return (
        <>
            <div className="spinner">
                <img
                    src={spinner}
                    style={{ margin: 'auto', display: 'block', width: '120px', background: 'transparent' }}
                    alt='Loading...'
                />
            </div>
        </>
    )
}
