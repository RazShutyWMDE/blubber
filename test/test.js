var assert = require('assert');
var inquirer = require('inquirer');

yaml = require('js-yaml');
fs   = require('fs');

var Environmentbuilder = require( '../src/generatorbuilder' );

describe("The Generate class", function() {
  var roles = ['mysql', 'wdqs-frontend', 'wdqs', 'wdqs-proxy', 'wdqs-updater', 'volumes'];

  var questions = []

  beforeEach(function(){


    //questions = questions.concat(roles.map(includeQuestionGenerator));

  })

    it('should have the same values in the outputfile as in the inputfile');
        var generator = Environmentbuilder.build();

        answers ={ outputDir: './blubber-docker-setup',
          serviceVersion: '3',
          dockerPort: '8181',
          roles:
           { mysql: true,
             'wdqs-frontend': true,
             wdqs: true,
             'wdqs-proxy': true,
             'wdqs-updater': true,
             volumes: true }
          }

        generator.generate(answers)
        var doc = yaml.safeLoad(fs.readFileSync('./blubber-docker-setup/docker-compose.yml', 'utf8'));
        assert.equal(doc["version"],'3',"version seems to be updated")


});
