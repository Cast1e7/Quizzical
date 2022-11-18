import githubLogo from "/github-logo.svg"
import lightMode from "/light-mode.svg"
import darkMode from "/dark-mode.svg"

export default function Navbar(props) {
    return (
        <nav>
            <a  className="nav--github_link" href="https://github.com/Cast1e7">
                <img 
                    className="nav--logo_icon fa-light"
                    src={githubLogo}
                />
                <h3 className="nav--logo_text">GitHub</h3>
            </a>
            <div onClick={props.toggle} className="nav--darkMode">
            <img className="nav--darkMode_icon" src={darkMode} style={{opacity: props.darkMode ? 1 : 0}}/>
            <img className="nav--lightMode_icon" src={lightMode} style={{opacity: props.darkMode ? 0 : 1}}/>
            </div>
        </nav>
    )
}