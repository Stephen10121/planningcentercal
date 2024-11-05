<script lang="ts">
    import Clock from "$lib/Clock.svelte";
    import Day from "$lib/Day.svelte";
    import Event from "$lib/Event.svelte";

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
    export let data;

    console.log(data);
</script>

<svelte:head>
    <title>Calendar</title>
</svelte:head>

<main>
    <Clock />
    <Day day={currentDay} dayStr={currentDayStr} isToday>
        <Event hours={5} />
    </Day>
    <Day day={nextDayDay} dayStr={nextDaydayStr}>
        <Event hours={10} color="#BEE2D6" />
    </Day>
    <Day day={thirdDay} dayStr={thirdDayStr}>
        <Event hours={6} />
    </Day>
</main>

<!-- {#if data.newData}
    {#each data.newData as event (event.id)}
        {JSON.stringify(event)}
    {/each}
{/if} -->

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