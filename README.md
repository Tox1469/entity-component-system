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
