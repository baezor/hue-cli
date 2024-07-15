import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('hue:off', () => {
  it('runs hue:off cmd', async () => {
    const {stdout} = await runCommand('hue:off')
    expect(stdout).to.contain('hello world')
  })

  it('runs hue:off --name oclif', async () => {
    const {stdout} = await runCommand('hue:off --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
