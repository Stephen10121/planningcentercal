<script lang="ts">
    import Times from "./Times.svelte";

    export let event;
    console.log(event);
</script>

<p>{event.id}: {event.time.data[0].attributes.name}</p> 
<ul>
    {#each event.time.data as aTime (event.id + aTime.id)}
        <Times time={aTime} />
    {/each}
</ul>