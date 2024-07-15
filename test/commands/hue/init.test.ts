import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('hue:init', () => {
  it('runs hue:init cmd', async () => {
    const {stdout} = await runCommand('hue:init')
    expect(stdout).to.contain('hello world')
  })

  it('runs hue:init --name oclif', async () => {
    const {stdout} = await runCommand('hue:init --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
