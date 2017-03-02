import * as TextParser from './text-parser'

var config = {
  prefix         : 'v',
  debug          : false,
  silent         : false,
  enterClass     : 'v-enter',
  leaveClass     : 'v-leave',
  interpolate    : true
}

Object.defineProperty(config, 'delimiters', {
    get: function () {
        return TextParser.delimiters
    },
    set: function (delimiters) {
        TextParser.setDelimiters(delimiters)
    }
})

export default config
