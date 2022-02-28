const fs = require("fs");
const readline = require("readline");

async function processFile() {
	const fileStream = fs.createReadStream("./data/yesno.txt");
	const returnArray = [];
	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity,
	});
	// Note: crlfDelay is to recognize all instances of CR LF
	// ('\r\n') in the .txt as a single line break.

	for await (const line of rl) {
		// Each line in the .txt will be successively available here as `line`.
		//TODO: fetch lines as template literals instead of strings with quotes
		returnArray.push(line);
	}

	return returnArray;
}

exports.run = async (bot, message, args) => {
	if (args.length < 1) {
		message.channel.send("waht is your question you dumbass");
		return;
	}

	processFile().then(function (data) {
		let quotes = data;
		let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
		message.channel.send(randomQuote);
	});
};

exports.help = {
	name: "yesno",
};
