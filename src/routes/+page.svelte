<script lang="ts">
    import Event from "$lib/Event.svelte";

    export let data;
</script>

{#if data.newData}
    {#each data.newData as event (event.id)}
        <Event {event} />   
    {/each}
{/if}