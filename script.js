const rows = document.querySelectorAll("tr")
const keyboardKeys = document.querySelectorAll(".key")
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
	z: 20,
	x: 21,
	c: 22,
	v: 23,
	b: 24,
	n: 25,
	m: 26,
}

let actualRow = 0
let actualCol = 0
let word = "amor"

document.addEventListener("keydown", (e) => {
	let pressedKey = e.key
	if (pressedKey) {
	} else if (pressedKey === "Backspace") {
	} else if (pressedKey === "Enter") {
	}

	let pressedKeyPosition = keysPositions[pressedKey]
	let keyElement = keyboardKeys[pressedKeyPosition]
})
