<script lang="ts">
    import { MONTHTOSTRING, type EventData } from "$lib";

    export let data: EventData;
    export let currentDay: Date;
    
    const start = new Date(data.startTime);
    const end = new Date(data.endTime);

    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    const passedHours = Math.abs(start.getTime() - currentDay.getTime()) / 36e5;

    const FIRST_DAY = currentDay.getDate() === start.getDate();
    const MULTI_DAY_EVENT = hours > 24;

    const trueStartHour = start.getHours() + start.getMinutes() / 60;

    const startHourStr = String(start.getHours()).padStart(2, "0");
    const startMinutesStr = String(start.getMinutes()).padStart(2, "0");

    const endHourStr = String(end.getHours()).padStart(2, "0");
    const endMinutesStr = String(end.getMinutes()).padStart(2, "0");
</script>

<div class="event" style="--start-hour:{!FIRST_DAY && MULTI_DAY_EVENT ? 0 : trueStartHour};--hours: {hours - (MULTI_DAY_EVENT ? passedHours : 0)};--color:{data.color};">
    <div class="inner {hours - (MULTI_DAY_EVENT ? passedHours : 0) < 2 ? "small" : ""}">
        <div class="stage1">
            {#if MULTI_DAY_EVENT}
                <p class="time">{MONTHTOSTRING[start.getMonth()]} {start.getDate()}, {startHourStr}:{startMinutesStr} - {MONTHTOSTRING[end.getMonth()]} {end.getDate()}, {endHourStr}:{endMinutesStr}</p>
            {:else}
                <p class="time">{startHourStr}:{startMinutesStr} -{endHourStr}:{endMinutesStr}</p>
            {/if}
            <p class="name">{data.name} {#if MULTI_DAY_EVENT && !FIRST_DAY}<span class="lighter">continued.</span>{/if}</p>
            {#if MULTI_DAY_EVENT}
                <p class="lighter">Multiple Day Event</p>
            {/if}
        </div>
    </div>
</div>

<style>
    .event {
        position: absolute;
        top: calc(calc(100% / 25 + 0.165%) * min(var(--start-hour), 24));;
        left: 20px;
        width: calc(100% - 40px);
        height: calc(calc(100% / 25 + 0.165%) * min(var(--hours), 24));
    }

    .inner {
        width: 100%;
        height: 100%;
        background-color: var(--color);
        border: 1px solid #0000002c;
        padding: 10px;
        border-radius: 3px;
    }

    .stage1 {
        display: flex;
        flex-direction: column;
        gap: 5px;
        align-items: flex-start;
    }

    .inner.small {
        display: flex;
        align-items: center;
    }

    .inner.small .stage1 {
        flex-direction: row;
        align-items: center;
    }

    .time {
        font-family: sans-serif, monospace;
        color: #858585;
        font-weight: 500;
        font-size: 0.8rem;
        pointer-events: none;
        display: block;
    }

    .name {
        font-family: "Zona Pro";
        color: #000000;
        font-weight: 600;
        font-size: 1rem;
        pointer-events: none;
        display: block;
    }

    .lighter {
        font-family: "Zona Pro";
        color: #7e7e7e;
        font-size: 0.8rem;
        font-weight: 600;
        pointer-events: none;
    }
</style>