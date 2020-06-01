const {
    usingStorybook,
    appDirectory,
    styles,
    typescript,
} = require('../constants');

const outputPath = `${appDirectory}/src/components`;

const ignore = [];

const prompts = [
    {
        type: 'list',
        name: 'ext',
        message: 'select extension',
        default: 0,
        choices: typescript ? ['tsx', 'ts' ] : ['jsx', 'js'],
    },
    {
        type: 'input',
        name: 'name',
        message: 'enter component name',
        validate: (input) => input.length > 2 ? true : 'name must be at least 3 characters',
    },
];

if (usingStorybook) {
    prompts.push({
        type: 'list',
        name: 'type',
        message: 'enter type of component',
        default: 0,
        choices: [
            'Other',
            'Layout',
            'Inputs',
            'Navigation',
            'Surfaces',
            'Feedback',
            'DataDisplay',
            'Utils',
            'Cell Renderer',
            'Cell Editor',
        ]
    });
} else {
    ignore.push('templates/component/*.stories.*.hbs');
}

if (!styles) {
    ignore.push('templates/component/*.{{styles}}.hbs');
}


module.exports = {
    prompts,
    actions: [{
        type: 'addMany',
        base: `templates/component/`,
        destination: `${outputPath}/{{pascalCase name}}`,
        templateFiles: 'templates/component/*.hbs',
        globOptions: {
            ignore,
        },
        data: {
            styles,
            typescript,
        },
    }],
}
