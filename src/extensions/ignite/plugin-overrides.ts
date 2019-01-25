import * as jetpack from 'fs-jetpack'
import { uniq } from 'ramda'

// Lists the additional places to look for plugins before falling back to npm.
const isWindows = process.platform === 'win32'
const homeDir = process.env[isWindows ? 'USERPROFILE' : 'HOME']

export default (plugin, command, context) => {
  // grab ~/.ignite/overrides
  const overrideDir: string = jetpack.path(`${homeDir}`, '.ignite', 'overrides')

  // grab the environment var
  const envDir: string = process.env.IGNITE_PLUGIN_PATH || ''

  // sanitize & verify they exist
  return uniq(envDir.split(';').map(s => s.trim()))
    .map(s => `${overrideDir}${s}`)
    .filter(s => jetpack.exists(s))
}
