import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('hue:on', () => {
  it('runs hue:on cmd', async () => {
    const {stdout} = await runCommand('hue:on')
    expect(stdout).to.contain('hello world')
  })

  it('runs hue:on --name oclif', async () => {
    const {stdout} = await runCommand('hue:on --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
