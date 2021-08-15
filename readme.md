<h1 align="center">usejedis</h1>
<h3 align="center">redis like key-value state management solution for React</h3>
<p align="center">Reactive, Redux alternative, Simple and powerfull global state management system, accessible in all components</p>

<h1>Philosophy</h1>

usestate is a wrapper on react useState hook, that makes it accessible through all the components without passing in the components, so no need to create stores, actions, or dispatchers.


<h1>Features 📋</h1>

1. Reactive 
2. State accessable in all components
3. no reducer, no action needed
4. small bundle size

<h1>Basic Usage</h1>

```npm i jedisdb```

<h3>happy hacking</h3>

```javascript
import React from 'react'
import useJedis from 'jedisdb'
const Counter = () =>{
/*
if a key is not present in jedis, useJedis('myKey', fallbackValue) will create create that key in jedis and then it will return that object,
if key is present it will simply return that key
if we don't pass fallbackValue it will create jedis object of value undefined 
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

[Codesandbox Demo](https://codesandbox.io/s/usejedis-demo1-owozg?file=/src/App.js).

