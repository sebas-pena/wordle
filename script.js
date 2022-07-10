;(() => {
	const rows = document.querySelectorAll("tr")
	const keyboardKeys = document.querySelectorAll(".key.letter")
	const keyboardEnter = document.querySelector(".key.enter")
	const keyboardDel = document.querySelector(".key.del")
	const modal = document.getElementById("modal")
	const keysPositions = {
		q: 0,
		w: 1,
		e: 2,
		r: 3,
		t: 4,
		y: 5,
		u: 6,
		i: 7,
		o: 8,
		p: 9,
		// first line
		a: 10,
		s: 11,
		d: 12,
		f: 13,
		g: 14,
		h: 15,
		j: 16,
		k: 17,
		l: 18,
		ñ: 19,
		// first line
		z: 20,
		x: 21,
		c: 22,
		v: 23,
		b: 24,
		n: 25,
		m: 26,
	}

	let gameStatus = "playing"
	let actualRow = 0
	let wordToGuess = totalWords[Math.floor(totalWords.length * Math.random())]

	let userWord = []

	const restartGame = () => {
		gameStatus = "playing"
		actualRow = 0
		userWord = []
		wordToGuess = totalWords[Math.floor(totalWords.length * Math.random())]
		console.log(wordToGuess)
		modal.classList.remove("open")
		modal.innerHTML = ""
		rows.forEach((row) => {
			for (let i = 0; i < row.children.length; i++) {
				const cell = row.children[i]
				cell.setAttribute("status", "empty")
				cell.textContent = ""
			}
		})

		keyboardKeys.forEach((key) => {
			key.removeAttribute("status")
		})
	}

	const openModal = (message) => {
		const word = wordToGuess.split("")
		word[0] = word[0].toUpperCase()
		modal.classList.add("open")
		modal.innerHTML = `
			<div>
				<h2>${message}!</h2>
				${message == "Perdiste" ? `<p>La palabra era: ${word.join("")}</p>` : ""}
				<button class="modal__button">Jugar de nuevo</button>
			</div>
		`

		modal
			.querySelector("div > .modal__button")
			.addEventListener("click", restartGame)
	}

	const verifyWord = () => {
		if (userWord.length !== 5 || gameStatus !== "playing") return
		if (!totalWords.includes(userWord.join(""))) {
			rows[actualRow].classList.add("shake")
			setTimeout(() => {
				rows[actualRow].classList.remove("shake")
			}, 500)
			return
		}

		let results = []
		let auxWordToGuess = wordToGuess.split("")

		userWord.forEach((letter, index) => {
			if (letter === auxWordToGuess[index]) {
				results.push("correct")
				auxWordToGuess[index] = "-"
			} else {
				results.push("wrong")
			}
		})

		userWord.forEach((letter, index) => {
			if (results[index] === "correct") return
			else if (auxWordToGuess.includes(letter)) {
				results[index] = "close"
				auxWordToGuess[auxWordToGuess.indexOf(letter)] = "-"
			}
		})

		for (let i = 0; i < 5; i++) {
			setTimeout(() => {
				const cell = rows[actualRow].children[i]
				cell.setAttribute("status", results[i])
			}, i * 500)
		}

		setTimeout(() => {
			if (userWord.join("") === wordToGuess) {
				gameStatus = "end"
				openModal("Ganaste")
				return
			}
			userWord.forEach((letter, index) => {
				let key = keyboardKeys[keysPositions[letter]]
				let keyStatus = key.getAttribute("status")
				if (!wordToGuess.includes(letter)) {
					if (keyStatus == "correct" || keyStatus == "close") return
					key.setAttribute("status", "wrong")
				} else if (wordToGuess[index] !== letter) {
					if (keyStatus == "correct") return
					key.setAttribute("status", "close")
				} else {
					key.setAttribute("status", "correct")
					key.classList
				}
			})
			actualRow++
			userWord.length = 0
			if (actualRow == 6) {
				gameStatus = "end"
				openModal("Perdiste")
			}
		}, 3500)
	}

	const handleAddLetter = (pressedKey) => {
		const ammountOfLetters = userWord.length
		if (ammountOfLetters > 4 || gameStatus !== "playing") return
		let cell = rows[actualRow].children[ammountOfLetters]
		cell.textContent = pressedKey
		cell.setAttribute("status", "active")
		userWord.push(pressedKey)
	}

	const handleRemoveLetter = () => {
		const letterIndex = userWord.length - 1
		if (letterIndex < 0 || gameStatus !== "playing") return
		let cell = rows[actualRow].children[letterIndex]
		cell.setAttribute("status", "empty")
		cell.textContent = ""
		userWord.pop()
	}

	keyboardKeys.forEach((key) => {
		key.addEventListener("click", () => {
			handleAddLetter(key.textContent.toLowerCase())
		})
	})

	keyboardEnter.addEventListener("click", () => {
		verifyWord()
	})

	keyboardDel.addEventListener("click", () => {
		handleRemoveLetter()
	})

	document.addEventListener("keydown", (e) => {
		let pressedKey = e.key.toLowerCase()
		if (keysPositions[pressedKey] != undefined) {
			handleAddLetter(pressedKey)
		} else if (pressedKey === "backspace") {
			handleRemoveLetter()
		} else if (pressedKey === "enter") {
			verifyWord()
		}
	})
})()
