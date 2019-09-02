declare module 'babel-plugin-macros' {
  import { NodePath } from '@babel/traverse'
  type core = typeof import('@babel/core')
  type References = { [key: string]: NodePath[] }
  export type MacroFn = (args: { references: References, state: any, babel: core, source: string }) => any
  export const createMacro: (fn: MacroFn) => any
  export class MacroError extends Error {
    constructor(message?: string)
  }
}
