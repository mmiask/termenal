<script>
	import Input from '$lib/components/Input.svelte';
	import Output from '$lib/components/Output.svelte';
</script>

<main>
	<Output />
	<Input />
</main>

<style>
    main {
        height: 100%;
        width: 100%;
        font-family: monospace;
        color: greenyellow;
        overflow-y: auto;
    }

    :global(body) {
        background: black;
        padding: 2em;
        margin: 0;
    }
</style>