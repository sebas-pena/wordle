;(() => {
	const rows = document.querySelectorAll("tr")
	const keyboardKeys = document.querySelectorAll(".key.letter")
	const keyboardEnter = document.querySelector(".key.enter")
	const keyboardDel = document.querySelector(".key.del")
	let gameStatus = "playing"
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
		// first line
		z: 19,
		x: 20,
		c: 21,
		v: 22,
		b: 23,
		n: 24,
		m: 25,
	}

	let actualRow = 0
	let wordToGuess = totalWords[Math.floor(totalWords.length * Math.random())]
	console.log(wordToGuess)
	let userWord = []

	const verifyWord = () => {
		if (userWord.length !== 5 || gameStatus !== "playing") return
		for (let i = 0; i < 5; i++) {
			setTimeout(() => {
				const cell = rows[actualRow].children[i]
				if (userWord[i] === wordToGuess[i]) {
					cell.setAttribute("status", "correct")
				} else if (wordToGuess.includes(userWord[i])) {
					cell.setAttribute("status", "clue")
				} else {
					cell.setAttribute("status", "wrong")
				}
			}, i * 500)
		}

		setTimeout(() => {
			if (userWord.join("") === wordToGuess) {
				gameStatus = "win"
				return
			}
			userWord.forEach((letter, index) => {
				let key = keyboardKeys[keysPositions[letter]]
				let keyStatus = key.getAttribute("status")
				if (!wordToGuess.includes(letter)) {
					if (keyStatus == "correct" || keyStatus == "clue") return
					key.setAttribute("status", "wrong")
				} else if (wordToGuess[index] !== letter) {
					if (keyStatus == "correct") return
					key.setAttribute("status", "clue")
				} else {
					key.setAttribute("status", "correct")
					key.classList
				}
			})
			actualRow++
			userWord.length = 0
			if (actualRow == 6) gameStatus = "lose"
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
