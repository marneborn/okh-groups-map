import * as ts from 'typescript';
import path from 'node:path';
import fs from 'node:fs';

const options = {
  module: ts.ModuleKind.CommonJS,
  target: ts.ScriptTarget.ES5,
  noEmitOnError: true,
  noImplicitAny: true,
};

const source = fs.readFileSync(path.resolve(__dirname, 'okh.ts')).toString();

export default ts.transpile(source, options);
