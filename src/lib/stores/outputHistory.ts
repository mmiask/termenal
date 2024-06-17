import { writable } from 'svelte/store';

export const outputHistory = writable<Array<{ prompt: string; output: string[] }>>([]);

// outputHistory.subscribe((value) => {});
