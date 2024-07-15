import {Args, Command, Flags} from '@oclif/core'

export default class HueOff extends Command {
  static override args = {
    room: Args.string({description: 'name of the room to turn off'}),
  }

  static override description = 'Turn off all the lights in a given room'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  static override flags = {
    // flag with no value (-f, --force)
    force: Flags.boolean({char: 'f'}),
  }

  public async run(): Promise<void> {
    const {args} = await this.parse(HueOff)

    if (!args.room) {
      this.error('You must specify a room')
    }

    this.log(`Turning off the ${args.room} room`)
  }
}
