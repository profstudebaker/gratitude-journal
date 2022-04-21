/* 
    React allows us to create custom "hooks"
    to use across our projects, similar to the built in hooks
    By convention, they are just functions that start with the word "use"

    Our "useStickyState" hook is a wrapper hook over
    the native "useState" hook you are familiar with,
    but it will persist our state to localStorage via a unique key

    Largely inspired by https://www.joshwcomeau.com/snippets/react-hooks/use-sticky-state/
    but adapted to work with nextjs and only fetch from local storage
    after the initial render
*/

import { useEffect, useState } from 'react'

export function useStickyState(defaultValue, key) {
    const [value, setValue] = useState(defaultValue);
  
    /* 
        We wrap our getting and setting operations
        in useEffect, so they are only run
        after the first render of the component
        and then whenever their dependencies change. 
        Learn more about useEffect: https://reactjs.org/docs/hooks-effect.html

        Since NextJS can be server side rendered,
        it won't have access to the "window" object on the server,
        only on the client after the initial page load
    */
    useEffect(() => {
      // after the first page load,
      // see if our item exists in local storage
      // if so, update state to that value
      const stickyValue = window.localStorage.getItem(key);
  
      if (stickyValue !== null) {
        setValue(JSON.parse(stickyValue));
      }
    }, [key]); // re-fetch if the value of "key" changes
  
    useEffect(() => {
      /* 
        We set an item in localStorage by specifying a unique key
        and the value we want to store

        !!IMPORTANT!!
        - localStorage is synchronous, so you don't want to store large 
        amounts of data in it. It is designed for small things like user preferences
        or quick & dirty data persists, not a replacement db
        - localStorage is NOT SECURE. DO NOT put secrets, api keys, PII,
        or anything else you wouldn't publish to the internet
        into localStorage (we will talk about other things to use for these sensitive values)
      */
      window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]); // reset if either key or value changes
  
    return [value, setValue];
  }