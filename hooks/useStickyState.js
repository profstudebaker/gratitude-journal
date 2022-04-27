import { useEffect, useState } from "react";

export function useStickyState(defaultValue, key) {
    const [value, setValue] = useState(defaultValue);

    // run code after each render
    useEffect(() => {
        // after the initial page load
        // see if there is a value with that key in local storage
        // if so, update our state
        const stickyValue = window.localStorage.getItem(key)
        if (stickyValue !== null) {
            // parse from json
            setValue(JSON.parse(stickyValue))
        }
    },[key])

    useEffect(() => {
        // if the contents of value changes,
        // set our localStorage to that new value
        window.localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]

}