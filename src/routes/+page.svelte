<script lang="ts">
    import Clock from "$lib/Clock.svelte";
    import Day from "$lib/Day.svelte";

    const today = new Date(new Date(new Date().getTime() + (24 * 60 * 60 * 1000) * 3).setHours(0, 0, 0, 0));
    const tomorrow = new Date(new Date(new Date().getTime() + (24 * 60 * 60 * 1000) * 4).setHours(0, 0, 0, 0));
    const thirdDay = new Date(new Date(new Date().getTime() + (24 * 60 * 60 * 1000) * 5).setHours(0, 0, 0, 0));

    export let data;
</script>

<svelte:head>
    <title>Calendar</title>
</svelte:head>

<main>
    {#if data.newData}
        <Clock />
        <Day events={data.newData} day={today} isToday />
        <Day events={data.newData} day={tomorrow} />
        <Day events={data.newData} day={thirdDay} />
    {/if}
</main>

<style>
    :global(html) {
        background-color: #FCF7F4;
    }

    main {
        width: 100%;
        height: 100%;
        background-color: #FCF7F4;
        display: grid;
        grid-template-columns: 70px 1fr 1fr 1fr;
        padding: 10px;
    }
</style>