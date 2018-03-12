const ts = require('typescript');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const shelljs = require('shelljs');
const templateCompiler = require('blueimp-tmpl');

const traverseSourceTree = function(source, cb) {
  function traverse(node) {
    if (cb(node)) {
      ts.forEachChild(node, traverse);
    }
  }

  traverse(source);
};

const template = fs.readFileSync(path.join(__dirname, 'reflection.ts.tmpl'), 'utf8');

const presetDefs = {
  command: {
    input: [path.join(__dirname, '../../../src/nut/**/') + '*.ts'],
    output: path.join(__dirname, '../../../src/nut/', '_reflections.ts'),
    decorators: ['commandInfo', 'componentInfo', 'entityInfo']
  }
};

const run = function(option) {
  const op = Object.assign(
    {
      defs: null,
      presets: []
    },
    option
  );

  if (!op.presets.length) {
    op.presets = Object.keys(presetDefs);
  }

  if (!op.defs) {
    op.defs = [];
  }

  op.presets.forEach(presetName => {
    if (presetDefs[presetName]) {
      op.defs.push(presetDefs[presetName]);
    }
  });

  const checkValid = () => {};

  op.defs.forEach(def => {
    checkValid(def);

    let files = [];
    def.input.forEach(globPath => {
      files = glob.sync(globPath);
    });

    if (!def.exclude) {
      def.exclude = [];
    }
    let excludeFiles = [];
    def.exclude.forEach(globPath => {
      excludeFiles = glob.sync(globPath);
    });

    excludeFiles.push(def.output);
    excludeFiles = excludeFiles.map(file => {
      return file.replace(/\\/g, '/');
    });

    files = files.filter(file => {
      if (excludeFiles.indexOf(file) > -1) {
        return false;
      } else {
        return true;
      }
    });

    let data = {
      exports: []
    };
    files.forEach(filePath => {
      const file = fs.readFileSync(filePath, 'utf8');

      const source = ts.createSourceFile(filePath, file, ts.ScriptTarget.Latest, true);

      traverseSourceTree(source, node => {
        if (ts.SyntaxKind[node.kind] === 'ClassDeclaration') {
          if (node.decorators && node.decorators.length) {
            for (let i = 0; i < node.decorators.length; i++) {
              const d = node.decorators[i];
              const name = d.expression.escapedText || d.expression.expression.escapedText;
              // 读取匹配的decorator
              if (def.decorators.indexOf(name) > -1) {
                const className = node.name.escapedText;
                const rel = path.relative(path.dirname(def.output), path.dirname(filePath));
                const fileName = path.basename(filePath).replace(/\.[^/.]+$/, '');
                const p = './' + path.join(rel, fileName).replace(/\\/g, '/');

                data.exports.push({
                  className,
                  path: p
                });

                console.log(
                  `Found decorator '${name}' for class '${className}' in file '${filePath}'`
                );

                return false;
              }
            }
          }
        }
        return true;
      });
    });

    // 生成代码
    shelljs.rm('-f', def.output);
    const compiled = templateCompiler(template, data);
    fs.writeFileSync(def.output, compiled);

    console.log(`\nFile generated at '${def.output}'`);
  });
};

module.exports = {
  presetDefs,
  run
};
