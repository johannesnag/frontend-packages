const fs = require('fs');
const cheerio = require('cheerio');
const camelcase = require('camelcase');
const capitalize = require('capitalize');
const glob = require('glob');
const path = require('path');
const chalk = require('chalk');
const prettier = require('prettier');
const defined = require('defined');

const rootDir = path.join(__dirname, '..', 'packages', 'ndla-icons');
const attrs = ['xlink:href'];

const copyright = fs.readFileSync(
  path.join(__dirname, '..', 'COPYRIGHT'),
  'utf-8',
);
const autoNotice = '// N.B! AUTOGENERATED FILE. DO NOT EDIT';

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function cleanAtrributes($el, $) {
  attrs.forEach(attr => {
    $el.removeAttr(attr);
  });
  if ($el.children().length === 0) {
    return false;
  }

  $el.children().each((index, el) => {
    cleanAtrributes($(el), $);
  });
  return true;
}

function createComponent(name, svg) {
  const $ = cheerio.load(svg, {
    xmlMode: true,
  });
  const $svg = $('svg');
  const viewBox = $svg.attr('viewBox');
  const license = $svg.attr('data-license');
  if (!license) {
    return undefined;
  }

  cleanAtrributes($svg, $);

  const iconSvg = $svg.html();
  return prettier.format(
    `${copyright}
${autoNotice}
import React from 'react';
import Icon from '../Icon';

const ${name} = props => (
  <Icon viewBox="${viewBox}" data-license="${license}" {...props}>
    <g>${iconSvg}</g>
  </Icon>
);

export default ${name};
`,
    {
      jsxBracketSameLine: true,
      singleQuote: true,
      trailingComma: 'all',
    },
  );
}

function writeIndexFiles(types) {
  Object.keys(types).forEach(folder => {
    const components = types[folder];
    const exportsString = components
      .map(
        component =>
          `export { default as ${component} } from './${component}';`,
      )
      .join('\n');
    const iconsModule = `${copyright}
${autoNotice}
${exportsString}\n`;

    const fileName = path.join(rootDir, 'src', folder, 'index.js');
    fs.writeFileSync(fileName, iconsModule, 'utf-8');
    console.log(
      `${chalk.green(`CREATED`)} ${chalk.dim(
        path.join(rootDir, 'src'),
      )}${chalk.bold(`${folder}/index.js`)}`,
    );
  });
}

function writePackageFiles(types) {
  Object.keys(types).forEach(folder => {
    const iconsModule = `
{
  "name": "ndla-icons${folder}",
  "private": true,
  "main": "../lib${folder}/index.js",
  "module": "../es${folder}/index.js",
  "jsnext:main": "../es${folder}/index.js"
}
    `;

    const fileName = path.join(rootDir, folder, 'package.json');
    ensureDirectoryExistence(fileName);
    fs.writeFileSync(fileName, iconsModule, 'utf-8');

    console.log(
      `${chalk.green(`CREATED`)} ${chalk.dim(path.join(rootDir))}${chalk.bold(
        `${folder}/package.json`,
      )}`,
    );
  });
}

glob(`${rootDir}/svg/*/*.svg`, (err, icons) => {
  const types = {};
  icons.forEach(iconPath => {
    const id = path.basename(iconPath, '.svg');
    const svg = fs.readFileSync(iconPath, 'utf-8');
    const folder = iconPath
      .replace(path.join(`${rootDir}/`, 'svg'), '')
      .replace(`/${path.basename(iconPath)}`, '');
    const name = capitalize(camelcase(id));
    const componentPath = path.join(folder, `${name}.js`);

    if (!types[folder]) {
      types[folder] = [];
    }
    types[folder].push(name);

    const component = createComponent(name, svg);
    if (component) {
      const dest = path.join(rootDir, 'src', componentPath);
      ensureDirectoryExistence(dest);
      fs.writeFileSync(dest, component, 'utf-8');
      console.log(
        `${chalk.green(`CREATED`)} ${chalk.dim(
          path.join(rootDir, 'src'),
        )}${chalk.bold(componentPath)}`,
      );
    } else {
      console.log(
        `${chalk.red(`Failed`)} ${chalk.dim(
          path.join(rootDir, 'src'),
        )}${chalk.bold(componentPath)}`,
      );
      console.log('No data-license attribute on <svg>');
    }
  });
  writeIndexFiles(types);
  writePackageFiles(types);
});
