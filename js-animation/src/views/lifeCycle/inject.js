export function initInjections(vm) {
    const result = resolveInject(vm.$options.inject, vm);
    return result;
}

// 通过用户配置的inject, 自底向上搜索可用的注入内容，返回结果
export function resolveInject(inject, vm) {
    if (inject) {
        const result = Object.create(null);
        // Symbol 作为属性名, 该属性不会出现在for...in, for...of, 不会被Object.keys()等枚举类属性中
        const keys = hasSymbol
            // Relect.ownKeys会忽略属性的enumberable
            ? Reflect.ownKeys(inject)
            : Object.keys(inject);
        for(let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const provideKey = inject[key].from;
            let source = vm;
            while(source) {
                if (source._provided && provideKey in source._provided) {
                    result[key] = source._provided[provideKey]
                    break;
                }
                source = source.$parent;
            }
            if (!source) {
                if ('default' in inject[key]) {
                    const provideDefault = inject[key].default;
                    result[key] = typeof provideDefault == 'function'
                        ? provideDefault.call(vm)
                        : provideDefault
                } else if (process.env.NODE_ENV !== 'production') {
                    console.error(`Injection ${key} is not found`);
                }
            }
        }
        return result;
        
    }
}