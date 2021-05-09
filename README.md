# Flutter MVP Scaffolding

VSCode extension to create fields scaffolding to mvp pattern on flutter projects

## Features

The extension request an entity name and will create all files needed to the mvp pattern:

### Data layer
* `lib/data/entities`: Entity class that interacts with backend (API rest, firebase...)
* `lib/data/repositories`: Classes that manage the data access
* `lib/data/mapper`: Classes that manage the transformation from entity to model (used in presentation layer)

### Domain layer
* `lib/domain/model`: Classes shared in presentation layer for data representation
* `lib/domain/services`: Uses cases
* `lib/domain/blocs`: Screens controler that receives events and transforms it to states

### Presentation layer
* `lib/presentation/screens`: Widgets that present the information an react to user actions
* `lib/presentation/injection`: Contains the classes that are shared trought the app

## Requirements

Flutter projects

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release

-----------------------------------------------------------------------------------------------------------
## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

**Note:** You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets

### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
