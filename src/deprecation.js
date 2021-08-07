const readMore = ` - please see https://github.com/pearofducks/rollup-plugin-dev/releases/tag/v2.0.0 for more information`

export function deprecate(opts) {
  if ('proxy' in opts && !Array.isArray(opts.proxy)) this.warn(`'proxy' option has changed in v2` + readMore)
  if ('silent' in opts && typeof opts.silent !== 'boolean') this.warn(`'silent' option has changed in v2` + readMore)
  if ('spa' in opts) this.warn(`behavior of 'spa' option has changed in v2` + readMore)
}
