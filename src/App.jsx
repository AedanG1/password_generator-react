import './App.css'
import Generator from './Generator'
import characters from './characters'

function App() {
	//etest
	return (
		<div className='container'>
			<h1>Generate a<br/><span>random password</span></h1>
			<h3>Have fun remembering these!</h3>
			<Generator characters={characters}/>
		</div>
	)
}

export default App
