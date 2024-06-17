<script lang="ts">
	import { outputHistory } from '$lib/stores/outputHistory';
</script>

{#each $outputHistory as { prompt, output }}
	<div class="terminal-input-area">
		<p class="terminal-prompt">{'>'}</p>
		<p class="terminal-input">{prompt}</p>
	</div>
	{#each output as out}
		<p class="whitespace-pre" bind:innerHTML={out} contenteditable>
			<!--{out}-->
		</p>
	{/each}
{/each}

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

    .terminal-input {
        font-family: inherit;
        font-size: inherit;
        color: inherit;
        background: transparent;
        border: 0px;
        padding: 0;
        margin: 0;
        outline: none; /* no highlight on focus */
        width: 100%;
    }
</style>