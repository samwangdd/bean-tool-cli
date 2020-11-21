#!/usr/bin/env node
import commander from 'commander';
import { CommanderStatic } from 'commander';
// import { default as commander, CommanderStatic } from 'commander';
import { CommandLoader } from '../commands';

const bootstrap = () => {
  const program: CommanderStatic = commander;
  program.version(require('../package.json').version).usage('<command> [options]');
  CommandLoader.load(program);
  commander.parse(process.argv);

  if (!program.args.length) {
    program.outputHelp();
  }
};

bootstrap();
