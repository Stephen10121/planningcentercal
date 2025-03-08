<script lang="ts">
    import Calendar from "$lib/Calendar.svelte";

    export let data;
</script>

<svelte:head>
    <title>{data.name}</title>
</svelte:head>

{#if data.newData}
    <Calendar events={data.newData} theme={data.style} customTheme={data.customStyle} />
{/if}