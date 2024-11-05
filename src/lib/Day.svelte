<script lang="ts">
    import { DAYTOSTRING, isDateWithinRange, type EventData } from "$lib";
    import Event from "./Event.svelte";

    export let day: Date;
    export let isToday: boolean = false;
    export let events: EventData[];

    const dayOfMonth = day.getDate();
</script>

<section class="{isToday ? "today" : ""}">
    <div class="day">
        <h2>{dayOfMonth}</h2>
        <p>{DAYTOSTRING[day.getDay()]}</p>
        <div class="line">
            {#if isToday}
                <div class="ball"></div>
            {/if}
        </div>
    </div>
    <div class="times">
        <div class="schedule">
            {#each events as event (event.instanceId)}
                {#if isDateWithinRange(new Date(event.startTime), new Date(event.endTime), day)}
                    <Event data={event} currentDay={day} />
                {/if}
            {/each}
            <slot />
        </div>
        <div class="timeLine"></div>
        <div class="timeLine"></div>
        <div class="timeLine"></div>
        <div class="timeLine"></div>
        <div class="timeLine"></div>
        <div class="timeLine"></div>
        <div class="timeLine"></div>
        <div class="timeLine"></div>
        <div class="timeLine"></div>
        <div class="timeLine"></div>
        <div class="timeLine"></div>
        <div class="timeLine"></div>
        <div class="timeLine"></div>
        <div class="timeLine"></div>
        <div class="timeLine"></div>
        <div class="timeLine"></div>
        <div class="timeLine"></div>
        <div class="timeLine"></div>
        <div class="timeLine"></div>
        <div class="timeLine"></div>
        <div class="timeLine"></div>
        <div class="timeLine"></div>
        <div class="timeLine"></div>
        <div class="timeLine"></div>
        <div class="timeLine"></div>
    </div>
</section>

<style>
    section {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: 130px auto;
        padding-top: 3rem;
    }

    section:not(.today) {
        border-left: 1px dashed #b1a69e;
    }

    .day {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }

    section.today .day .line {
        background-color: #000000;
    }

    .times {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
    }

    .schedule {
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 0 20px;
        overflow: hidden;
    }

    .timeLine {
        height: 1px;
        width: 100%;
        background-color: #E6D9D0;
    }

    .line {
        width: 2px;
        height: 20px;
        background-color: rgb(134, 134, 134);
        position: relative;
    }

    .ball {
        background-color: #FF5454;
        width: 5px;
        height: 5px;
        border-radius: 100%;
        outline: 4px solid #FCF7F4;
        position: absolute;
        bottom: 3px;
        left: 50%;
        transform: translate(-50%);
    }

    h2 {
        font-family: "Zona Pro";
        font-weight: bold;
        color: #DDCDC2;
        font-size: 3rem;
    }

    section.today .day h2,
    section.today .day p {
        color: #131E3A;
    }

    p {
        font-family: "Zona Pro";
        font-weight: bold;
        color: #DDCDC2;
        font-size: 1.5rem;
    }
</style>