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

From `Settings > Extensions > Flutter MVP` it's possible configure paths, preffix and files contents

## Known Issues

**TODO:** Injection of classes!

## Release Notes

### 1.0.0

Initial release

-----------------------------------------------------------------------------------------------------------
## References

* [MVP Pattern](https://en.wikipedia.org/wiki/Model–view–presenter)

**Enjoy!**
