import {Args, Command, Flags} from '@oclif/core'
import * as fs from 'node:fs'
import * as path from 'node:path'

export default class HueInit extends Command {
  static override args = {
    ip: Args.string({description: 'IP address of the Hue bridge', required: true}),
  }

  static override description = 'initialize the Hue bridge connection'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  static override flags = {
    // flag with no value (-f, --force)
    force: Flags.boolean({char: 'f'}),
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({char: 'n', description: 'name to print'}),
  }

  public async run(): Promise<void> {
    const {args} = await this.parse(HueInit)

    // save the IP address to the user's config
    const configPath = this.config.configDir
    this.log(`Saving IP address to ${configPath}`)

    if (!args.ip) {
      this.error('IP address is required')
    }

    const clientKey = await this.generateAPIKey(args.ip)

    if (!fs.existsSync(configPath)) {
      fs.mkdirSync(configPath)
    }

    fs.writeFile(
      path.join(configPath, 'config.json'),
      JSON.stringify({clientKey, ip: args.ip}, null, 2),
      {flag: 'w+'},
      (err) => {
        if (err) {
          this.error(err)
        }
      },
    )

    this.log('Intializing Hue bridge connection')
  }

  private async generateAPIKey(ip: string): Promise<string | undefined> {
    /**
     * Create a request to the Hue bridge to create a client key
     * URL:	http://<bridge ip address>/api
     * Body:	{"devicetype":"app_name#instance_name", "generateclientkey":true}
     * Method	POST
     */

    try {
      const req = await fetch(`http://${ip}/api`, {
        body: JSON.stringify({
          devicetype: 'hue-cli#cli',
          generateclientkey: true,
        }),
        method: 'POST',
      })

      const response = await req.json()
      console.log('Response:', response)
      return response[0].success.clientkey
    } catch (error) {
      console.error('Error generating API key:', error)
    }
  }
}
