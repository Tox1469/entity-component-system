[![CI](https://img.shields.io/github/actions/workflow/status/Tox1469/entity-component-system/ci.yml?style=flat-square&label=ci)](https://github.com/Tox1469/entity-component-system/actions)
[![License](https://img.shields.io/github/license/Tox1469/entity-component-system?style=flat-square)](LICENSE)
[![Release](https://img.shields.io/github/v/release/Tox1469/entity-component-system?style=flat-square)](https://github.com/Tox1469/entity-component-system/releases)
[![Stars](https://img.shields.io/github/stars/Tox1469/entity-component-system?style=flat-square)](https://github.com/Tox1469/entity-component-system/stargazers)

---

# entity-component-system

ECS minimalista para jogos, com entidades, componentes tipados e sistemas.

## Instalacao

```bash
npm install entity-component-system
```

## Uso

```ts
import { World, defineComponent } from "entity-component-system";

const Position = defineComponent<{ x: number; y: number }>("Position");
const world = new World();
const e = world.createEntity();
world.addComponent(e, Position, { x: 0, y: 0 });
```

## API

- `World` — container de entidades/componentes/sistemas
- `defineComponent<T>(name)` — cria tipo de componente
- `world.createEntity()`, `destroyEntity`, `addComponent`, `getComponent`, `query`, `addSystem`, `update`

## Licenca

MIT