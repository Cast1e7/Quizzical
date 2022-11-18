import {useState} from "react"
import {useEffect} from "react"
import QuizCard from "./Components/QuizCard"
import Navbar from "./Components/Navbar"



export default function App() {
    
    const [quizCards, setQuizCards] = useState([])
    const [quizActive, setQuizActive] = useState(false)
    const [allQuizData, setAllQuizData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [gameStart, setGameStart] = useState(true)
    const [score, setScore] = useState(null)
    const [darkMode, setDarkMode] = useState(false)
    
    useEffect(() => {
        if(quizActive === true) {
            fetch(`https://opentdb.com/api.php?amount=5&type=multiple`)
            .then(res => res.json())
            .then(data => setAllQuizData(data))
        } 
        
    },[quizActive])
    
    function startQuiz() {
        setGameStart(false)
        setIsLoading(true)
        setQuizCards([])
        setScore[null]
        setQuizActive(true)
    }
    

    useEffect(() => {
        if(allQuizData.results){
        const quizArray = allQuizData.results
        const newCards = quizArray.map((item, i) => ({
            question: item.question,
            correct_answer: item.correct_answer,
            answers: [...item.incorrect_answers, item.correct_answer]
                    .sort(function(a, b){return 0.5 - Math.random()}),
            selected: "",
            id: i+1,
            isCorrect: ""
        })) 
        setQuizCards(newCards)
        setIsLoading(false)
        }     
    },[allQuizData]) 
    
    
    
    function checkAnswers() {
        setQuizActive(false)
        const scoreArray = quizCards.map(card => {
            return card.selected === card.correct_answer ? true : false      
            }
        )

        setScore(scoreArray.filter(x => x === true).length)
    }
    
    function handleClick(event,id) {
        if(quizActive){
            console.log(event.target.id)
            console.log(id)
            setQuizCards(prevQuizCards => prevQuizCards.map(card => {
                return card.id === id ? {...card, selected: event.target.id}
                    : card
            }))
        }
    }
    
    
    const quizCardElements = quizCards.map(card => 
        <QuizCard 
            key={card.id} 
            {...card} 
            handleClick={handleClick} 
            isActive={quizActive}
            />
    )


    function toggleDarkMode() {
        setDarkMode(prevDarkMode => !prevDarkMode)
    }
    

    
return (
        <div className="app-body">
            <Navbar darkMode={darkMode} toggle={toggleDarkMode}/>
            <main>
                {gameStart ?
                <div className="game-start container">
                    <h1 className="game-start--title">Quizzical</h1>
                    <h2 className="game-start--desc">Try your luck at some Multiple Choice trivia!</h2>
                    <button className="game-start--btn" onClick={startQuiz}>Start quiz</button>
                </div>
                : isLoading 
                    ? <h2 className="text-loading">Loading ...</h2> 
                    : <div className="game-continue container">
                        <div className="quiz-container">
                            {quizCardElements}
                        </div>
                        {(!quizActive && score != null) &&
                        <div className="play-again">
                            <h3 className="score--text">You scored {score}/5 correct answers </h3>
                            <button onClick={startQuiz}>Play again</button>
                        </div>}
                        {(quizActive && !isLoading) && <button onClick={checkAnswers}>Check answers</button>}
                    </div>
                }
        </main>
        </div>
    )
}