import State from "./index.js";

describe('simple key', () => {
  it("should set value in to empty object", function () {
    const state = new State({});
    state.setState('first', 1);

    const newState = state.getState();
    expect(newState.first === 1);
  });

  it("should override number value", function () {
    const state = new State({first: 0});
    state.setState('first', 1);

    const newState = state.getState();
    expect(newState.first === 1);
  });

  it("should override object value", function () {
    const state = new State({first: {}});
    state.setState('first', 1);

    const newState = state.getState();
    expect(newState.first === 1);
  });

  it("should override null value", function () {
    const state = new State({first: null});
    state.setState('first', 1);

    const newState = state.getState();
    expect(newState.first === 1);
  });

  it("should keep other values", function () {
    const state = new State({first: null, second: 2});
    state.setState('first', 1);

    const newState = state.getState();
    expect(newState.first === 1);
    expect(newState.second === 2);
  });

});

describe('key as path', () => {
  it("should set value with path", function () {
    const state = new State({});
    state.setState('first.second', 1);

    const newState = state.getState();
    expect(newState.first.second === 1);
  });

  it("should override primitive values with path", function () {
    const state = new State({
      first: 1
    });
    state.setState('first.second', 1);

    const newState = state.getState();
    expect(newState.first.second === 1);
  });

  it("should override object values", function () {
    const state = new State({
      first: {}
    });
    state.setState('first.second', 1);

    const newState = state.getState();
    expect(newState.first.second === 1);
  });

  it("should set values in object", function () {
    const state = new State({
      first: { second: 2 }
    });
    state.setState('first.second', 1);

    const newState = state.getState();
    expect(newState.first.second === 1);
  });

  it("should keep values in object", function () {
    const state = new State({
      first: { second: 2, third: 3 }
    });
    state.setState('first.second', 1);

    const newState = state.getState();
    expect(newState.first.second === 1);
    expect(newState.first.third === 3);
  });

  it("should not have other values", function () {
    const state = new State({
      second: 2,
      first: { third: 3, forth: null}
    });
    state.setState('second', 1);
    state.setState('first.third', 1);

    const newState = state.getState();
    expect(newState.second === 1);
    expect(newState.first.third === 1);
    expect(newState.first.forth === null);

    expect(Object.keys(newState).length === 2);
    expect(Object.keys(newState.first).length === 2);
  });

  describe('subscribe', () => {
    it('should call subscribers on state change', function () {
      const func = jest.fn();
      const state = new State({});

      state.subscribe(func);
      state.setState( { value: 1 });
      expect(func).toBeCalledTimes(1);

      state.setState( { value: 2 });
      expect(func).toBeCalledTimes(2);

      state.unsubscribe(func);

      state.setState( { value: 3 });
      expect(func).toBeCalledTimes(2);

    });
  });
  it('should notify on specific value change', function () {
    const funcFirst = jest.fn();
    const funcSecond = jest.fn();
    const state = new State({first: 1, second: 1});

    state.subscribe('first', funcFirst);
    state.subscribe('second', funcSecond);

    state.setState( 'first', 2);
    expect(funcFirst).toBeCalledTimes(1);
    expect(funcFirst).toBeCalledWith(2);
    expect(funcSecond).toBeCalledTimes(0);


    state.setState( 'second', 2);
    expect(funcSecond).toBeCalledTimes(1);
    expect(funcSecond).toBeCalledWith(2);
    expect(funcFirst).toBeCalledTimes(1);


    state.unsubscribeFrom('first', funcFirst);
    state.unsubscribeFrom('second', funcSecond);
    state.setState( 'first', 2);
    state.setState( 'second', 2);

    expect(funcFirst).toBeCalledTimes(1);
    expect(funcSecond).toBeCalledTimes(1);
  });

  describe('get state', () => {
    it('should return undefined if path has no value', function () {
      const state = new State({first: {second: 1, forth: '', fifth: []}, third: null});
      const value = state.getState('first.some');
      const second = state.getState('first.second.some');
      const forth = state.getState('first.forth.some');
      const fifth = state.getState('first.fifth.some');

      expect(value).toEqual(undefined);
      expect(second).toEqual(undefined);
      expect(forth).toEqual(undefined);
      expect(fifth).toEqual(undefined);
    });

    it('should return value by path', function () {
      const state = new State({first: {second: 1, third: { fifth: 1 }}});
      const second = state.getState('first.second');
      const third = state.getState('first.third');
      const fifth = state.getState('first.third.fifth');

      expect(second).toEqual(1);
      expect(third).toEqual({fifth: 1});
      expect(fifth).toEqual(1);
    });

  })

});

