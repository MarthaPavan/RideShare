import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';

export function SearchList({ results, onSelect,e}) {
    return (
        <ul className="list-group">
            {results.map((result) => (
                <li 
                    // key={result.id || `${result}-${index}`} 
                    className="list-group-item d-flex justify-content-start align-items-center w-100"
                    onClick={() => onSelect(e,result)}
                    style={{ cursor: 'pointer' }}
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
    e: PropTypes.object.isRequired
};
