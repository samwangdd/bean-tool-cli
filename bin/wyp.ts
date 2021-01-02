#!/usr/bin/env node
// https://github.com/nestjs/nest-cli/blob/master/bin/nest.ts
import commander from 'commander';
import { CommanderStatic } from 'commander';
// import { default as commander, CommanderStatic } from 'commander';
import { CommandLoader } from '../commands';

const bootstrap = () => {
  const program: CommanderStatic = commander;
  program
    ?.version(require('../package.json').version)
    .usage('<command> [options]')
    .helpOption('-h, --help', 'Output usage information');
  CommandLoader.load(program);
  commander?.parse(process.argv);

  if (!program?.args.length) {
    program?.outputHelp();
  }
};

bootstrap();
