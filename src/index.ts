export type Entity = number;
export type ComponentType<T> = { name: string; _t?: T };

export function defineComponent<T>(name: string): ComponentType<T> {
  return { name };
}

export type System = (world: World, dt: number) => void;

export class World {
  private nextId: Entity = 1;
  private entities = new Set<Entity>();
  private components = new Map<string, Map<Entity, unknown>>();
  private systems: System[] = [];

  createEntity(): Entity {
    const id = this.nextId++;
    this.entities.add(id);
    return id;
  }

  destroyEntity(e: Entity): void {
    this.entities.delete(e);
    for (const store of this.components.values()) store.delete(e);
  }

  addComponent<T>(e: Entity, type: ComponentType<T>, data: T): void {
    let store = this.components.get(type.name);
    if (!store) {
      store = new Map();
      this.components.set(type.name, store);
    }
    store.set(e, data);
  }

  removeComponent<T>(e: Entity, type: ComponentType<T>): void {
    this.components.get(type.name)?.delete(e);
  }

  getComponent<T>(e: Entity, type: ComponentType<T>): T | undefined {
    return this.components.get(type.name)?.get(e) as T | undefined;
  }

  hasComponent<T>(e: Entity, type: ComponentType<T>): boolean {
    return this.components.get(type.name)?.has(e) ?? false;
  }

  query(...types: ComponentType<unknown>[]): Entity[] {
    if (types.length === 0) return [...this.entities];
    const stores = types.map((t) => this.components.get(t.name));
    if (stores.some((s) => !s)) return [];
    const smallest = stores.reduce((a, b) => (a!.size <= b!.size ? a : b))!;
    const result: Entity[] = [];
    for (const e of smallest.keys()) {
      if (stores.every((s) => s!.has(e))) result.push(e);
    }
    return result;
  }

  addSystem(sys: System): void {
    this.systems.push(sys);
  }

  update(dt: number): void {
    for (const sys of this.systems) sys(this, dt);
  }
}
