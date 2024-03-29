import { Command } from 'commander'
import { version } from '../package.json'
import { create } from './command/create'

const program = new Command('yl')
program.version(version, '-v, --version')

program
  .command('create')
  .description('create a new project')
  .argument('[name]', '项目名称')
  .action(async dirName => {
    create(dirName)
    // if (dirName) {
    //   create(dirName)
    // } else {
    //   console.log(`create ${dirName}`)
    // }
  })

program.parse()
