import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";

export function SearchList(props){
    // console.log(props)
    return (
        
        <ul className="list-group">
        {props.results.map((result) => (
            //handle click on each list item  to change input value
            <li key = {result.id} className="list-group-item d-flex justify-content-between align-items-center w-100">
                {result[props.index]}
                {/* {console.log(props.index)} */}
                <span className="icon"><FontAwesomeIcon icon = {faMapPin}/></span>
            </li>
        ))}
      </ul>
    )
}
