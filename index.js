#!/usr/bin/env node
const chalk = require('chalk');

const nodePlop = require('node-plop');
const path = require('path');
const plopFilePath = `${path.resolve(__dirname, 'plopfile.js')}`;
const plop = nodePlop(plopFilePath);

async function main() {

    try {

        const args = process.argv.slice(2);
        const argv = require('minimist')(args);

        const generators = plop.getGeneratorList();

        let chosen;

        if (generators.length === 1) {
            chosen = generators[0].name;
        } else if (argv['_'].length) {
            // check if first arg matches a generator
            const [potentialGeneratorName] = argv['_'];
            if (generators.find((opt) => opt.name === potentialGeneratorName)) {
                // matches a name of a generator
                chosen = potentialGeneratorName;
            }
        } else {
            const plop = nodePlop();
            const generator = plop.setGenerator('choose', {
                prompts: [{
                    type: 'list',
                    name: 'generator',
                    message: 'select a generator',
                    choices: generators.map(function (p) {
                        return {
                            name: p.name + chalk.gray(!!p.description ? ' - ' + p.description : ''),
                            value: p.name
                        };
                    })
                }]
            });
            chosen = await generator.runPrompts().then(results => results.generator);
        }

        const generator = plop.getGenerator(chosen);
        const prompts = await generator.runPrompts();
        const results = await generator.runActions(prompts);
        for (const result of results.changes) {
            console.log(chalk.green('✔ ') + result.path);
        }
        for (const result of results.failures) {
            console.log(chalk.red('x ') + result.error);
        }
    } catch (err) {
        console.error(err);
    }
}

main();
