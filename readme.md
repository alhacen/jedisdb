<h1 align="center">jedisdb</h1>
<h3 align="center">redis like key-value state management solution for React</h3>
<p align="center">Reactive. Redux alternative. Simple and powerful global state management system, accessible through every component.</p>

<h1>Philosophy</h1>

jedisdb is a wrapper for React.JS useState hook. jedisdb makes the hook accessible in every component without the need to explicity pass it down or to create stores, actions, and dispatchers.

<h1>Features 📋</h1>

1. Reactive 
2. State accessable through every components
3. no reducer, no action needed
4. small bundle size

<h1>Basic Usage</h1>

```
npm i jedisdb
yarn add jedisdb
```

<h3>happy hacking</h3>

```javascript
import React from 'react'
import useJedis from 'jedisdb'
const Counter = () =>{
/*
if a key is not present in jedis, useJedis('myKey', fallbackValue) will create create that key in jedisdb and then it will return that jedis object,
if key is present it will simply return that jedis object
if we don't pass fallbackValue it will create jedis object with value undefined 
*/
  const counter = useJedis('counter', 0)
  return (
    <div>
      <h1>My counter</h1>
      {counter.state}
      <button onClick={()=>{ counter.state++ }}>+</button>
    </div>
  );
}
```
<h3>Demo:</h3>

Counter [Codesandbox](https://codesandbox.io/s/usejedis-demo1-owozg?file=/src/App.js).

Shopping Cart [Codesandbox](https://codesandbox.io/s/shopping-cart-usejedis-qbgwq?file=/src/App.js).

>`useJedis` returns a react hook so it can only used in react functional components,<br><br>
`selectState` has no side effects, it can be used anywhere,<br>
`createState` creates jedis object without any side effects. <br>
demo: Accessing value in JS funciton [Codesandbox](https://codesandbox.io/s/usejedis-demo2-pdfsm?file=/src/myjsfunction.js).

<h3>Best Practice</h3>

use `createState` to create jedis object and then use `useJedis` to access it, is considered best practice

```javascript
//myGlobalHook.js
//create jedis object
import {createState} from 'jedisdb'
createState({
    theme: 'dark',
    uesrLevel: 'admin',
    counter: 7
})
```

```javascript
//app.js
//import jedis object in app
import React from 'react';
import Main from './main';
require('./myGlobalHook')
function App() {
  return (
      <Main />
  );
}
export default App;
```

```javascript
//counter.js
//access anywhere
import React from 'react';
import useJedis from "jedisdb";

function Counter() {
  const counter = useJedis('counter') //no need to pass fallback value
  return (
      <>
        {counter.state}
        <button onClick={()=>{ counter.state++ }}>+</button>
      </>
  );
}
export default Counter;
```
demo: [Codesandbox](https://codesandbox.io/s/usejedis-practice-lxrhs)

<br>

# 🤝 Contributing

Contributions, issues and feature requests are welcome! Feel free to check [issues page](https://github.com/alhaqhassan/jedisdb/issues).
