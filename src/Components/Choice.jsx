import {decode} from 'html-entities'

export default function Choice(props) {
    let styles

    if(!props.isActive) {
        styles = {
            backgroundColor: props.value === props.correct ? "#94D7A2" : props.value === props.selected ? "#F8BCBC" : "",
            opacity: props.value === props.correct ? 1 : 0.5,
            border: props.value === props.correct ? "none" : props.value === props.selected ? "none" : ""
            }
    }else {
        styles = {backgroundColor: props.value === props.selected ? "#D6DBF5" : "", 
        border: props.value === props.selected ? "none" : ""}
    }
    
    
    return (
        <div className="choice"
            onClick={(event) => props.handleClick(event, props.cardId)}
            id={props.value}
            style={styles}
        >
            {decode(props.value)}  
        </div>
        
    )
}


