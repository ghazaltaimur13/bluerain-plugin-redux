# Setup

1. `git clone https://github.com/alexjoverm/typescript-library-starter.git YOURFOLDERNAME`
2. `cd YOURFOLDERNAME`
3. `yarn`
4. In `code-of-conduct.md` replace `alexjovermorales@gmail.com` with `code@blueeast.com`
5. In `CONTRIBUTING.md` replace all instances of repo paths.
6. In `package.json` do the following:
  - Put base version
  - Add description
  - Replace `author` value with `BlueEast Team <code@blueeast.com>`
  - Replace `"prettier --write --no-semi --single-quote"` with `"prettier --write --use-tabs --single-quote"`
7. TSLint
	- Do `yarn add @blueeast/tslint-config-blueeast --dev`
  - Replace contents of `tslint.json` with

```json
{
  "extends": [
    "@blueeast/tslint-config-blueeast/react"
  ]
}
```

  - Remove following dependencies:
    - `yarn remove tslint-config-prettier`
    - `yarn remove tslint-config-standard`

8. Update `README.md`
9. Delete `package-lock.json` since we're using yarn
10. In `.editorconfig` change `indent_style = space` to `indent_style = tab`
