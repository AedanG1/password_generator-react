import { useEffect, useState } from 'react'
import './Generator.css'

export default function Generator({ characters }) {
	const [formData, setFormData] = useState({
		length: 16,
		symbols: true,
		numbers: true
	})
	const [strength, setStrength] = useState("")

	function handleChange(event) {
		const {name, value, type, checked} = event.target
		setFormData(previousData => {
			return {
				...previousData,
				[name]: type === "checkbox" ? checked : value
			}
		})
	}

	useEffect(() => {
		const {length, symbols, numbers} = formData
		let strengthScore = 0

		if (length >= 15) strengthScore += 2
		else if (length >= 10) strengthScore += 1

		if (symbols) strengthScore += 1

		if (numbers) strengthScore += 1

		if (strengthScore >= 4) {
		  setStrength("Strong")
		} else if (strengthScore >= 3) {
		  setStrength("Good")
		} else if (strengthScore >= 2) {
		  setStrength("Weak")
		} else {
		  setStrength("Bad")
		}

	}, [formData.length, formData.symbols, formData.numbers])

	function generatePassword() {
		let password = ""	
		let selectFromArr = []
		const {length, symbols, numbers} = formData
		const {alphabetArr, symbolsArr, numbersArr} = characters

		if (symbols && numbers) {
			selectFromArr.push(alphabetArr, symbolsArr, numbersArr)	
		} else if (symbols === false && numbers) {
			selectFromArr.push(alphabetArr, numbersArr)
		} else if (symbols && numbers === false) {
			selectFromArr.push(alphabetArr, symbolsArr)
		} else {
			selectFromArr.push(alphabetArr)
		}

		const flattenedArr = selectFromArr.flat()

		for (let i = 0; i < length; i++) {
			password += flattenedArr[Math.floor(Math.random() * flattenedArr.length)]
		}

		return password
	}

	function handleSubmit(e) {
		e.preventDefault()
		document.getElementById('password-one').textContent = generatePassword()
		document.getElementById('password-two').textContent = generatePassword()
	}

	function copy(index) {
		const passwordEl = document.getElementById(`password-${index}`)
		const outputContainer = document.querySelector(`.output.${index}`)
		navigator.clipboard.writeText(passwordEl.textContent)

		const message = document.createElement('p')
		message.classList.add('message')
		message.textContent = 'copied!'
		outputContainer.appendChild(message)

		setTimeout(() => {
			message.remove()
		}, 800)
	}

	return (
		<>
		<form onSubmit={handleSubmit}>
			<div id='settings'>
				<div className='slidecontainer'>
					<label htmlFor='slidecontainer' className='sm-label'>Password length</label>
					<div>
						<input 
						type='range'
						name='length'
						value={formData.length}
						min={5}
						max={16}
						className='slider'
						onChange={handleChange}
						/>
						<h3 id='length-display'>{formData.length}</h3>
					</div>
				</div>
				<div>
					<fieldset>
						<legend>Include</legend>
						<div>
							<input
							id='symbol-check'	
							name='symbols'
							type='checkbox'
							checked={formData.symbols}
							onChange={handleChange}
							/>
							<label htmlFor='symbol-check'>Symbols</label>	
						</div>
						<div>
							<input
							id='number-check'	
							name='numbers'
							type='checkbox'
							checked={formData.numbers}
							onChange={handleChange}
							/>
							<label htmlFor='number-check'>Numbers</label>	
						</div>
					</fieldset>
				</div>
			</div>
			<div id='password-score'>
				<label className='sm-label' htmlFor='score-el'>Expected password strength:</label>
				<h2 id='score-el'>{strength}</h2>
			</div>
			<button id='generate-btn' type='submit'>Generate Passwords</button>
		</form>
			<div className='line'></div>
			<div className='passwords'>
				<div className='output one'>
					<p id='password-one' onClick={() => copy('one')}></p>
				</div>
				<div className='output two'>
					<p id='password-two' onClick={() => copy('two')}></p>
				</div>
			</div>
		</>
	)
}

