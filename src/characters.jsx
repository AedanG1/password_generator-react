const alphabet = []
for (let i = 65; i <= 122; i++) {
    if (i > 90 && i < 97) {
        continue
    } else {
        alphabet.push(String.fromCharCode(i))
    }
}

const symbols = []
for (let i = 33; i <= 126; i++) {
    if (i > 47 && i < 58) {
        continue
    } else if (i > 64 && i < 91) {
        continue
    } else if (i > 96 && i < 123) {
        continue
    } else {
        symbols.push(String.fromCharCode(i))
    }
}

const numbers = []
for (let i = 48; i <= 57; i++) {
    numbers.push(String.fromCharCode(i))
}

const characters = {
	alphabetArr: alphabet,
	symbolsArr: symbols,
	numbersArr: numbers
}

export default characters
