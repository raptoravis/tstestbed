const handler = new Proxy(
  {},
  {
    get(target: any, trapName: string, receiver) {
      // Return the handler method named trapName
      return (...args: any[]) => {
        // Don’t log args[0]
        // const a = args.slice(1);
        // const t = trapName.toUpperCase() + ' ' + JSON.stringify(a);
        // console.log(t);

        // Forward the operation
        const r: any = Reflect;
        return r[trapName](...args);
      };
    }
  }
);

const targetObj = {};
const proxy: any = new Proxy(targetObj, handler);

proxy.foo = 123;

proxy.foo;
