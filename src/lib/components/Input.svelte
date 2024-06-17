<script lang="ts">
	import { onMount } from 'svelte';
	import { commands } from '$lib/utils/commands';
	import { outputHistory } from '$lib/stores/outputHistory';

	let command = '';
	let input: HTMLInputElement;

	onMount(() => {
		// let's focus on the terminal input at the start
		input.focus();

		if ($outputHistory.length === 0) {
			const command = commands['welcome'] as () => string;

			if (command) {
				const output = command();

				$outputHistory = [...$outputHistory, { prompt: 'welcome', output: [output] }];
			}
		}
	});

	async function handleKeyDown(event: KeyboardEvent) {
		switch (event.key) {
			case 'Enter': {
				const [commandKey, ...args] = command.split(' ');

				const commandFn = commands[commandKey];

				if (commandFn) {
					let output = await commandFn(args);
					if (typeof output === 'string') output = [output];
					else output = [...output];

					if (commandKey !== 'clear') {
						$outputHistory = [...$outputHistory, { prompt: command, output: output }];
					}
				} else if (commandKey === '') {
					$outputHistory = [...$outputHistory, { prompt: '', output: [] }];
				} else {
					// TODO: implement ErrorMessage, with different styling. How to append a component to the array below?
					const output = `command not found: ${commandKey}`;
					$outputHistory = [...$outputHistory, { prompt: command, output: [output] }];
				}
				command = '';
				break;
			}
			case 'ArrowUp':
			case 'ArrowDown':
			case 'Tab': {
				event.preventDefault();
				break;
			}
		}
	}

</script>

<!--adds an event listener to `window` object, that will cause focus on the input-->
<svelte:window
	on:click={() => {
		input.focus();
	}}
/>

<div class="terminal-input-area">
	<p class="terminal-prompt">></p>
	<input class="terminal-input" bind:value={command} on:keydown={handleKeyDown} bind:this={input} type="text" />
</div>

<style>
    .terminal-input-area {
        display: inline-flex;
        width: 100%;
        align-items: center;
    }

    .terminal-prompt {
        margin-top: 0;
        margin-bottom: 0;
        margin-right: 10px;
    }

    input {
        caret-shape: block;
    }

    .terminal-input {
        font-family: inherit;
        font-size: inherit;
        color: inherit;
        background: transparent;
        border: 0px;
        padding: 0;
        outline: none; /* no highlight on focus */
        width: 100%;
    }
</style>
