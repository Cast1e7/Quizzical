import Choice from "./Choice"
import {decode} from 'html-entities'

export default function QuizCard(props) {
    
    const choicesElements = props.answers.map(ans => 
        <Choice key={ans}
            value={ans} 
            selected={props.selected} 
            cardId={props.id} 
            handleClick={props.handleClick}
            isActive={props.isActive}
            correct={props.correct_answer}
            />
        )

    return (
        <div className="quiz-card">
            <h3 className="quiz-card--question">{decode(props.question)}</h3>
            <div className="choices--container">
                {choicesElements}
            </div>
        </div>
    )
}
