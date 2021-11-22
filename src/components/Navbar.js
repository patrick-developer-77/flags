import { Container } from "reactstrap"

// styles & images
import './Navbar.css'
import IconMoon from '../img/moon.svg'
import IconMoonOutline from '../img/moon-outline.svg'

export default function Navbar({mode, setMode }) {
	const handleClick = () => {
		setMode(mode === 'dark' ? 'light' : 'dark')
	}

	return (
		<header>
			<nav className={`navbar navbar-expand-lg navbar-light shadow-sm ${mode}`}>
				<Container>
					<div className="navbar-brand">Where in the world?</div>
					<span className="mode ms-auto" onClick={handleClick}><img src={mode === 'dark' ? IconMoon : IconMoonOutline} alt="moon icon" width="15" height="15" /> Dark Mode</span>
				</Container>
			</nav>
		</header>
	)
}
