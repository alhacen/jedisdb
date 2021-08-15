import { useEffect, useState } from "react";
let myProxy = {
  get(target, key) {
    if (key === 'state') {
      return target.get();
    } else {
      return undefined;
    }
  },
  set(obj, prop, value) {
    if(prop === 'state'){
      obj.set(value);
      return true;
    }
  }
};
const useJedis = (key, defaultValue) =>{
  if (!window.useJedisStateOBJ) //create jedisObject, if not exist
    window.useJedisStateOBJ = {};
  if(!window.useJedisStateOBJ[key])//create key, if not exist
    window.useJedisStateOBJ[key] = { state: defaultValue, setters: [] }

  let jedisObj = window.useJedisStateOBJ[key]
  
  const [value, setKey] = useState(jedisObj.state)//create hook instance
  useEffect(()=>{
    //add setKey function in setters when compoent mount
    jedisObj.setters.push(setKey)
    return () =>{
      //remove setkey when unmount
      jedisObj.setters.splice(jedisObj.setters.indexOf(setKey), 1);
    }
  },[])
//return jedis object
  return new Proxy({
    get: () => value, 
    set: (value) => {
      jedisObj.setters.map(setter=> setter(value));
      jedisObj.state = value;
    }
  }, myProxy)
}

export default useJedis