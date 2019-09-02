# env.macro

Babel macro that inlines environment variables if they exist at compile-time, otherwise deferring to insertion at runtime.

## Installation
`npm i -D env.macro`

## Usage
```js
import env from 'env.macro'
const variable = env('ENV VAR')
```

if 'ENV VAR' exists at compile time transforms to:

```js
const variable = 'Value'
```

otherwise:

```js
const variable = process.env['ENV VAR']
```
