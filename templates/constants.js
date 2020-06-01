const fs = require('fs');
const has = require('lodash.has');
const appDirectory = fs.realpathSync(process.cwd());
const packageJson = require(`${appDirectory}/package.json`);

function hasAnyOfDeps(deps) {
    for (const dep of deps) {
        if (
            has(packageJson, ['devDependencies', dep])
            || has(packageJson, ['dependencies', dep])
        ) {
            return true;
        }
    }
    return false;
}

const usingStorybook = hasAnyOfDeps(['@storybook/react']);

const usingScssModules = hasAnyOfDeps(['sass-loader', 'node-sass']);

const usingCssModules = hasAnyOfDeps(['css-loader', 'react-scripts']) && !usingScssModules;

const usingTypescript = hasAnyOfDeps(['typescript']);
const typescript = usingTypescript;

const styles = usingScssModules ? 'scss' : usingCssModules ? 'css' : null;

module.exports = {
    usingStorybook,
    appDirectory,
    styles,
    usingTypescript,
    typescript,
}
