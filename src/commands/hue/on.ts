import {Args, Command, Flags} from '@oclif/core'
import * as fs from 'fs-extra'
import * as path from 'node:path'

export default class HueOn extends Command {
  static override args = {
    room: Args.string({description: 'name of the room to turn on'}),
  }

  static override description = 'Turn on all the lights in a given room'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  static override flags = {
    // flag with no value (-f, --force)
    force: Flags.boolean({char: 'f'}),
  }

  public async run(): Promise<void> {
    const {args} = await this.parse(HueOn)

    if (!args.room) {
      this.error('You must specify a room')
    }

    this.log(`Turning on the ${args.room} room`)
  }

  private async getUserConfig(): Promise<{clientKey: string; ip: string}> {
    const userConfig = await fs.readJSON(path.join(this.config.configDir, 'config.json'))
    return userConfig
  }
}
