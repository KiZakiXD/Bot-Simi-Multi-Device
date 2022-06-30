const chalk = require('chalk')

const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const bgcolor = (text, bgcolor) => {
	return !bgcolor ? chalk.green(text) : chalk.bgKeyword(bgcolor)(text)
}

const KonsolLog = (text, color) => {
	return !color ? chalk.yellow('[KiZakiXD] ') + chalk.green(text) : chalk.yellow('[KiZakiXD] ') + chalk.keyword(color)(text)
}

module.exports = {
	color,
	bgcolor,
    KonsolLog 
}
