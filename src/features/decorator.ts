function logClass(target: any) {
  // save a reference to the original constructor
  const original = target;

  // a utility function to generate instances of a class
  function construct(constructor: any, ...args: any[]) {
    const c: any = function() {
      return constructor.apply(this, args);
    };
    c.prototype = constructor.prototype;
    return new c();
  }

  // the new constructor behaviour
  const f: any = (...args: any[]) => {
    console.log('New: ' + original.name);
    return construct(original, args);
  };

  // copy prototype so intanceof operator still works
  f.prototype = original.prototype;

  // return new constructor (will override original)
  return f;
}

function logParameter(target: any, key: string, index: number) {
  const metadataKey = `__log_${key}_parameters`;
  if (Array.isArray(target[metadataKey])) {
    target[metadataKey].push(index);
  } else {
    target[metadataKey] = [index];
  }
}

function logMethod(target: any, key: string, descriptor: any) {
  if (descriptor === undefined) {
    descriptor = Object.getOwnPropertyDescriptor(target, key);
  }
  const originalMethod = descriptor.value;

  // editing the descriptor/value parameter
  descriptor.value = function(...args: any[]) {
    const metadataKey = `__log_${key}_parameters`;
    const indices = target[metadataKey];

    if (Array.isArray(indices)) {
      for (let i = 0; i < args.length; i++) {
        if (indices.indexOf(i) !== -1) {
          const arg = args[i];
          const argStr = JSON.stringify(arg) || arg.toString();
          console.log(`${key} arg[${i}]: ${argStr}`);
        }
      }
      const result = originalMethod.apply(this, args);
      return result;
    } else {
      const b = args.map(a => JSON.stringify(a) || a.toString()).join();
      const result = originalMethod.apply(this, args);
      const r = JSON.stringify(result);
      console.log(`Call: ${key}(${b}) => ${r}`);
      return result;
    }
  };

  // return edited descriptor as opposed to overwriting the descriptor
  return descriptor;
}

function logProperty(target: any, key: string) {
  // property value
  let _val = this[key];

  // property getter
  const getter = () => {
    console.log(`Get: ${key} => ${_val}`);
    return _val;
  };

  // property setter
  const setter = (newVal: any) => {
    console.log(`Set: ${key} => ${newVal}`);
    _val = newVal;
  };

  // Delete property.
  if (delete this[key]) {
    // Create new property with getter and setter
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  }
}

function logClassWithArgs(filter: any) {
  return (target: any) => {
    // implement class decorator here, the class decorator
    // will have access to the decorator arguments (filter)
    // because they are  stored in a closure
  };
}

function logFactory(...args: any[]) {
  switch (args.length) {
    case 1:
      return logClass.apply(this, args);
    case 2:
      return logProperty.apply(this, args);
    case 3:
      if (typeof args[2] === 'number') {
        return logParameter.apply(this, args);
      }
      return logMethod.apply(this, args);
    default:
      throw new Error();
  }
}

@logClass
class Person {
  @logProperty public name: string;
  public surname: string;

  constructor(name: string, surname: string) {
    this.name = name;
    this.surname = surname;
  }

  @logMethod
  public saySomething(@logParameter something: string, somethingElse: string): string {
    return this.name + ' ' + this.surname + ' says: ' + something + ' ' + somethingElse;
  }
}

let p = new Person('remo', 'jansen');
p.saySomething('I love playing', 'halo');
