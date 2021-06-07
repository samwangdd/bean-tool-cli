#!/usr/bin/env node
const program = require('commander');

program
  .version('0.1.0')
  .command('create <name>')
  .description('create a new project')
  .action(name => console.log('name :>> ', name));

program.parse();
