namespace App {
  export function Bind(
    _1: any,
    _2: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    return {
      configurable: true,
      enumerable: false,
      get() {
        return descriptor.value.bind(this);
      }
    };
  }
}
