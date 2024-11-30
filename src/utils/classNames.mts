/**
 * *****************************************************************************
 *
 * classNames 
 * 
 * className is the same as CSS class, and the HTML class attribute.
 * 
 * *****************************************************************************
 */

const classNamesProxy = classNamesTarget => new Proxy(classNamesTarget, {
  get: function (target, property, receiver) {
    if (property === "toString") {
      return () => target.filter(Boolean).map(v => v.trim()).join(" "); 
    }

    if (property === "add") return value => target.push(value);
    if (property === "className") return receiver.toString();

    return Reflect.get(target, property, receiver);
  }
});

export function classNames(): string {
  return classNamesProxy(Array.prototype.slice.apply(arguments));
}
