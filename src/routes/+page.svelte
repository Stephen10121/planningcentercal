<script lang="ts">
    import Day from "$lib/Day.svelte";
    const dayStrConvert = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date();

    const currentDay = date.getDate();
    const currentDayStr = dayStrConvert[date.getDay()];

    const nextDay = new Date(date.setDate(date.getDate() + 1));
    const nextDayDay = nextDay.getDate();
    const nextDaydayStr = dayStrConvert[nextDay.getDay()];

    const nextThreeDays = new Date(date.setDate(date.getDate() + 1));
    const thirdDay = nextThreeDays.getDate();
    const thirdDayStr = dayStrConvert[nextThreeDays.getDay()];
    // export let data;
</script>

<svelte:head>
    <title>Calendar</title>
</svelte:head>

<main>
    <Day day={currentDay} dayStr={currentDayStr} isToday />
    <Day day={nextDayDay} dayStr={nextDaydayStr} />
    <Day day={thirdDay} dayStr={thirdDayStr} />
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
        grid-template-columns: 1fr 1fr 1fr;
    }
</style>

<!-- {#if data.newData}
    {#each data.newData as event (event.id)}
        <Event {event} />   
    {/each}
{/if} -->