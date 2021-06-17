import React, { Fragment } from 'react';
import spinner from '../../assets/images/spinner.gif';
import './Spinner.scss'
export default function Spinner() {
    return (
        <Fragment>
            <div className="spinner">
                <img
                    src={spinner}
                    style={{ margin: 'auto', display: 'block', width: '120px', background: 'transparent' }}
                    alt='Loading...'
                />
            </div>
        </Fragment>
    )
}
