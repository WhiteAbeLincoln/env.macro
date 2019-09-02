declare module 'babel-plugin-tester' {
  type Teardown = () => void | Promise<void>
  type Setup = () => void | Teardown | Promise<Teardown> | Promise<void>

  type TestObjectBase = {
    title?: string
    output?: string
    outputFixture?: string
    only?: boolean
    skip?: boolean
    snapshot?: boolean
    error?: boolean | string | RegExp | (new (...args: any) => any) | ((err: any) => boolean | undefined)
    setup?: Setup
    teardown?: Teardown
    formatResult?: (result: string) => string
  }
  export type TestObject =
    | (TestObjectBase & { code: string })
    | (TestObjectBase & { fixture: string })

  export type Test = string | TestObject
  export type Options = {
    plugin: any
    pluginName?: string
    pluginOptions?: any
    babelOptions?: any
    title?: string
    filename?: string
    fixtures?: string
    tests?: Test[] | { [it: string]: Test }
    babel?: any
    snapshot?: boolean
  }

  export default function(options: Options): void
}
