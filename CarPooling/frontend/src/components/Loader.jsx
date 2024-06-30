import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Loader = ({ size = 'md', color = 'primary', type = 'border' }) => {
    const spinnerClass = type === 'grow' ? `spinner-grow` : `spinner-border`;
    const sizeClass = size === 'sm' ? `${spinnerClass}-sm` : '';
    const colorClass = `text-${color}`;

    return (
        <div className={`d-flex justify-content-center align-items-center`} style={{ minHeight: '100vh' }}>
            <div className={`${spinnerClass} ${sizeClass} ${colorClass}`} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Loader;