import { createMacro, MacroError } from 'babel-plugin-macros'
import { NodePath } from '@babel/core'
import * as t from '@babel/types'

export default createMacro(({ references }) => {
  const { default: env } = references

  for (const path of env) {
    const { parentPath } = path
    if (!parentPath.isCallExpression()) {
      throw new MacroError('`env.macro` can only be used as a call expression')
    }

    const args = parentPath.get('arguments')
    if (args.length !== 1 || !args[0].isStringLiteral()) {
      throw new MacroError('`env.macro` accepts a single string constant as its argument')
    }

    const env_name = args[0] as NodePath<t.StringLiteral>
    const env_value = process.env[env_name.evaluate().value]

    if (env_value != null) {
      parentPath.replaceWith(t.stringLiteral(env_value))
    } else {
      parentPath.replaceWith(t.memberExpression(t.memberExpression(t.identifier('process'), t.identifier('env')), env_name.node, true))
    }
  }
}) as (key: string) => string | undefined
