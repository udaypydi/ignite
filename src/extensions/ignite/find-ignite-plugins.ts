import { IgnitePlugin } from '../../types'

export default (plugin, command, context) => {
  // gluegun stuff
  const {
    runtime,
    filesystem: { separator },
  } = context

  // how to identify ignite plugins
  const ignitePrefixed = (p: IgnitePlugin) => p.name.startsWith('ignite-') // propSatisfies(startsWith('ignite-'), 'name')
  const isInRightLocation = (s: string) => s.includes(`ignite${separator}plugins`) // contains(`ignite${separator}plugins`)
  const inProjectPlugins = (p: IgnitePlugin) => isInRightLocation(p.directory) // propSatisfies(isInRightLocation, 'directory')
  const onlyIgnitePlugins = (plugins: IgnitePlugin[]) => plugins.filter(p => ignitePrefixed(p) || inProjectPlugins(p)) // filter(anyPass([ignitePrefixed, inProjectPlugins]))
  const getIgnitePlugins = (plugins: IgnitePlugin[]) =>
    onlyIgnitePlugins(plugins).sort((a, b) => (a.name < b.name ? -1 : 1)) // pipe(onlyIgnitePlugins, sortBy(prop('name'))

  /**
   * Finds the gluegun plugins that are also ignite plugins.  These are
   * plugins which have 1 of the following:
   *
   *   - the name starts with "ignite-"
   *   - the directory contains "ignite/plugins"
   *
   * @returns {Plugin[]} - an array of ignite plugins
   */
  return () => getIgnitePlugins(runtime.plugins)
}
