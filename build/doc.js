const path = require('path');
const tsConfig = require('../tsconfig.json');

const baseDir = path.join(__dirname, '../');

const srcDir = path.join(baseDir, './src/');
const docDir = path.join(baseDir, './doc/API');
const includeDir = path.join(baseDir, './doc/includes');
const shelljs = require('shelljs');

shelljs.rm('-rf', docDir);
shelljs.mkdir(docDir);

const typedoc = require('typedoc');

const option = Object.assign(tsConfig.compilerOptions, {
  out: docDir,
  includes: includeDir,
  ignoreCompilerErrors: true
});
// 使用default的lib选项
delete option.lib;

const typedocApp = new typedoc.Application(option);

let srcDirs = [srcDir];

if (tsConfig.include && tsConfig.include.length) {
  srcDirs = tsConfig.include.map(path => {
    return path;
  });
}

const project = typedocApp.convert(typedocApp.expandInputFiles(srcDirs));

typedocApp.generateDocs(project, docDir);
