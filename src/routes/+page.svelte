<script lang="ts">
    export let data;

    console.log(data)
</script>

{#if data.newData}
    {#each data.newData as event (event.id)}
        <p>{event.id}: {event.time.data[0].attributes.name} {new Date(event.time.data[0].attributes.starts_at)}</p>    
    {/each}
{/if}