var inquirer = require('inquirer');
var Environmentbuilder = require( './src/generatorbuilder' );
// TODO generate array from roles dir
var roles = ['mysql', 'wdqs-frontend', 'wdqs', 'wdqs-proxy', 'wdqs-updater', 'volumes'];

var questions = [];

function includeQuestionGenerator (name) {
	return {
		type: 'confirm',
		name: 'roles.' + name,
		message: `Would you like to include ${name}?\n`,
		default: true,
	}
}

var saveQuestion = {
	type: 'input',
	name: 'outputDir',
	message: 'Where would you like to save the output files?\n',
	default: './blubber-docker-setup'
};

var portQuestion = {
	type: 'input',
	name: 'dockerPort',
	message: 'How would you like to expose your port?\n',
	default: '8181'
};

var serviceVersion = {
	type: 'input',
	name: 'serviceVersion',
	message: 'what docker compose version would you need?\n',
	default: '3'
};

var generator = Environmentbuilder.build();

questions.push(saveQuestion);
questions.push(serviceVersion);
questions.push(portQuestion);

questions = questions.concat(roles.map(includeQuestionGenerator));

inquirer.prompt(questions)
.then(answers => {
	generator.generate( answers );
});


