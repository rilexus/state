function isObject(val) {
  return val != null && typeof val === "object" && Array.isArray(val) === false;
}

class State {
  state = null;

  handlers = [];

  toHandlers = {};

  constructor(initState) {
    this.state = initState;
    this.getSnapshot = this.getSnapshot.bind(this);

    this.setState = this.setState.bind(this);
    this.getState = this.getState.bind(this);

    this.setValue = this.setValue.bind(this);
    this.getValue = this.getValue.bind(this);

    this._getValue = this._getValue.bind(this);

    this.subscribe = this.subscribe.bind(this);
    this.subscribeTo = this.subscribeTo.bind(this);

    this.unsubscribe = this.unsubscribe.bind(this);
    this.unsubscribeFrom = this.unsubscribeFrom.bind(this);

    this.notify = this.notify.bind(this);
  }

  subscribe(handlerOrPath, handler) {
    if (typeof handlerOrPath === "string") {
      this.subscribeTo(handlerOrPath, handler);
    } else {
      this.handlers.push(handlerOrPath);
    }
  }

  _getValue(path, state) {
    const keyPath = path.split(".");
    let value = state

    for (let i = 0; i < keyPath.length; ++i) {
      const key = keyPath[i];
      if(value === null || value === undefined || Array.isArray(value)) {
        return undefined;
      }
      value = value[key];
    }
    return value;
  }

  getValue(path) {
    return this._getValue(path, this.getSnapshot());
  }

  /*
   * @desc Set a value to the state (by mutation).
   * @param {Array<string>} keys
   * @param {any} value
   * @param {object} state
   * */
  set(keys, value, obj) {
    const [key, ...keyRest] = keys;
    const hasMoreKeys = keyRest.length > 0;

    if (hasMoreKeys) {
      // is a value
      if (!isObject(obj[key])) {
        return { ...obj, [key]: this.set(keyRest, value, {}) };
      }

      if (isObject(obj[key])) {
        return { ...obj, [key]: this.set(keyRest, value, obj[key]) };
      }
    }

    if (!hasMoreKeys) {
      obj[key] = value;
      return obj;
    }
  }

  /*
   * @param {string} path
   * @param {any} value
   * */
  setValue(path, value) {
    return this.set(path.split("."), value, this.getState());
  }

  subscribeTo(path, handler) {
    if (path in this.toHandlers) {
      this.toHandlers[path].push(handler);
    } else {
      this.toHandlers[path] = [handler];
    }
  }

  unsubscribeFrom(path, handler) {
    if (path in this.toHandlers) {
      this.toHandlers[path] = this.toHandlers[path].filter(
        (h) => h !== handler
      );
      if (this.toHandlers[path].length === 0) {
        delete this.toHandlers[path];
      }
    }
  }

  unsubscribe(handler) {
    this.handlers = this.handlers.filter((h) => h !== handler);
  }

  getSnapshot() {
    return JSON.parse(JSON.stringify(this.state));
  }

  getState(path) {
    if (path) {
      return this.getValue(path);
    }
    return this.getSnapshot();
  }

  notify(newState, oldState) {
    this.handlers.forEach((h) => {
      if (!(typeof h === "function")) {
        return;
      }
      h(newState);
    });

    Object.entries(this.toHandlers).forEach(([path, handlers]) => {
      const oldValue = this._getValue(path, oldState);
      const newValue = this._getValue(path, newState);

      if (newValue !== oldValue) {
        handlers.forEach((h) => h(newValue));
      }
    });
  }

  setState(valueOrFunctionOrPath, value) {
    let newState = null;
    let oldState = this.getSnapshot();
    if (typeof valueOrFunctionOrPath === "function") {
      newState = valueOrFunctionOrPath(oldState);
    } else if (typeof valueOrFunctionOrPath === "string") {
      newState = this.setValue(valueOrFunctionOrPath, value);
    } else {
      newState = valueOrFunctionOrPath;
    }

    this.state = newState;
    this.notify(newState, oldState);
  }
}









export default State;
