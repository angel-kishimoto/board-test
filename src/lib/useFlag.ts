import { writable } from "svelte/store";

export const useFlag = () => {
    let { subscribe, set, update } = writable(false);
    return {
        subscribe,
        turnOn: () => set(true),
        turnOff: () => set(false),
    }
};