<script lang="ts">
    import { dateRangeOverlaps, DAYTOSTRING, type EventData } from "$lib";
    import Event from "./Event.svelte";

    export let day: Date;
    $: nextDay = new Date(day.getTime() + (24 * 60 * 60 * 999) * 1);

    export let isToday: boolean = false;
    export let events: EventData[];

    const dayOfMonth = day.getDate();
</script>

<section class="{isToday ? "today" : ""}">
    <div class="day">
        <p>{DAYTOSTRING[day.getDay()]}</p>
        <div>
            <h2>{dayOfMonth}</h2>
        </div>
    </div>
    <div class="times">
        {#each events as event, i (`${dayOfMonth}${i}${event.instanceId}`)}
            {#if dateRangeOverlaps(day, nextDay, new Date(event.startTime), new Date(event.endTime))}
                <Event data={event} currentDay={day} />
            {/if}
        {/each}
    </div>
</section>

<style>
    section {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: 130px auto;
    }

    section:not(.today) {
        border-left: 1px dashed #202020;
    }

    .day {
        padding-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 5px;
        background-color: #212121;
        box-shadow: 0px 8px 18px -18px rgb(0, 0, 0);
    }

    .times {
        width: 100%;
        height: 100%;
        padding: 15px 20px 0 20px;
        overflow: hidden;
    }

    h2 {
        font-family: "Zona Pro";
        font-weight: bold;
        color: #ffffff;
        font-size: 3rem;
    }

    .day div {
        padding: 10px;
        border-radius: 100%;
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    section.today .day div {
        background-color: #8AB4F4;
    }

    section.today .day h2 {
        color: #000000;
    }

    section.today .day p {
        color: #8AB4F4;
    }

    p {
        font-family: "Zona Pro";
        font-weight: bold;
        color: #ffffff;
        font-size: 1.5rem;
    }
</style>