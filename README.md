# statefull
Set values to state and listen to changes.

## Usage
```javascript
const state = new State({});

state.on(console.log) // prints whole state
state.on('first', console.log) // prints if "first" changes
state.on('first.second', console.log) // prints if "first" changes
state.subscribe('first', console.log) // prints if "first" changes
state.subscribeTo('first', console.log) // prints if "first" changes

state.set({ first: 2 });
stage.get('first'); // returns 2
stage.get(); // returns { first: 2 }

state.set('first', 1);
stage.get('first'); // returns 1
state.setState('first', 1);
stage.getState('first'); // returns 1
stage.get(); // returns { first: 1 }

state.set('first.second', 1);
stage.get(); // returns { first: { second: 1 } }
stage.get('first.second'); // returns 1

state.off('first');
state.unsubscribe('first');
state.unsubscribeFrom('first');
```
