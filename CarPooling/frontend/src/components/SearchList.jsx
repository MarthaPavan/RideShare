import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';

export function SearchList({ results, onSelect, inputName }) {
    return (
        <ul 
            className="list-group position-sticky z-1" 
            style={{ 
                zIndex: 1000, 
                width: '100%', 
                maxHeight: '200px',  // height to fit approximately 4 items
                overflowY: 'auto' 
            }}
        >
            {results.map((result, index) => (
                <li
                    key={`${result}-${index}`} // Ensure unique key for each item
                    className="list-group-item d-flex justify-content-start align-items-center w-100"
                    onClick={() => onSelect(result, inputName)}
                    style={{ cursor: 'pointer' }}
                    aria-label={`Select ${result}`}
                >
                    <FontAwesomeIcon icon={faMapPin} className="me-2" />
                    <span className="text">{result}</span>
                </li>
            ))}
        </ul>
    );
}

SearchList.propTypes = {
    results: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSelect: PropTypes.func.isRequired,
    inputName: PropTypes.string.isRequired, // Adjusted to pass the name of the input to update
};
