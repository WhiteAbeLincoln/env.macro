import pluginTester from 'babel-plugin-tester'
import plugin from 'babel-plugin-macros'

pluginTester({
  plugin
  , babelOptions: { filename: __filename}
  , tests: [
    { title: 'replaces with process.env[\'NAME\'] if not exists'
    , code: `
      import env from './env.macro'
      let x = env('NAME')
      let y = env("Another")
    `
    , output: `
      let x = process.env['NAME'];
      let y = process.env["Another"];
    `
    }
  , { title: 'replaces with result if exists'
    , code: `
      import env from './env.macro'
      let x = env('NAME')
    `
    , output: `
      let x = "value";
    `
    , setup: () => {
      process.env.NAME = 'value'
      return () => {
        delete process.env.NAME
      }
    }
    }
  ]
})
