<script lang="ts">
    import { MONTHTOSTRING, type EventData } from "$lib";
    import Resource from "./Resource.svelte";
    import Tag from "./Tag.svelte";

    export let data: EventData;
    export let currentDay: Date;
    
    const start = new Date(data.startTime);
    const end = new Date(data.endTime);

    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

    const FIRST_DAY = currentDay.getDate() === start.getDate();
    const MULTI_DAY_EVENT = hours > 24;

    const startHourStr = String(start.getHours()).padStart(2, "0");
    const startMinutesStr = String(start.getMinutes()).padStart(2, "0");

    const endHourStr = String(end.getHours()).padStart(2, "0");
    const endMinutesStr = String(end.getMinutes()).padStart(2, "0");
</script>

{@debug data}

<div class="event">
    <div class="inner">
        <div class="tags">
            {#if data.tags}
                {#each data.tags as tag}
                    <Tag name={tag.name} color={tag.color} />
                {/each}
            {/if}
        </div>
        <div class="stage1">
            <p class="name">{data.name} {#if MULTI_DAY_EVENT && !FIRST_DAY}<span class="cont">continued.</span>{/if}</p>
            {#if MULTI_DAY_EVENT}
                <p class="time">{MONTHTOSTRING[start.getMonth()]} {start.getDate()}, {startHourStr}:{startMinutesStr} - {MONTHTOSTRING[end.getMonth()]} {end.getDate()}, {endHourStr}:{endMinutesStr}</p>
            {:else}
                <p class="time">{startHourStr}:{startMinutesStr} - {endHourStr}:{endMinutesStr}</p>
            {/if}
            {#if MULTI_DAY_EVENT}
                <p class="lighter">Multi-Day Event</p>
            {/if}
        </div>
        <div class="resources">
            {#if data.resources}
                {#each data.resources as resource}
                    <Resource {resource} />
                {/each}
            {/if}
        </div>
    </div>
</div>

<style>
    .event {
        width: 100%;
        margin-top: 5px;
    }

    .inner {
        width: 100%;
        height: 100%;
        background-color: #2D9FD6;
        border: 1px solid #0000002c;
        padding: 10px 10px 10px 10px;
        border-radius: 3px;
        position: relative;
        isolation: isolate;
    }

    .time {
        font-family: sans-serif, monospace;
        color: #000000;
        font-weight: 500;
        font-size: 0.8rem;
        pointer-events: none;
    }

    .stage1 {
        display: flex;
        flex-direction: column;
        gap: 5px;
        align-items: flex-start;
        margin-left: 0px;
    }

    .name {
        font-family: sans-serif;
        color: #000000;
        font-weight: 700;
        font-size: 1.05rem;
        pointer-events: none;
        display: block;
    }

    .lighter {
        font-family: "Zona Pro";
        color: #7e7e7e;
        font-size: 0.8rem;
        font-weight: 600;
        pointer-events: none;
        margin-left: 22px;
    }

    .cont {
        font-family: "Zona Pro";
        color: #7e7e7e;
        font-size: 0.8rem;
        font-weight: 600;
        pointer-events: none;
    }

    .tags {
        display: flex;
        gap: 2px;
        position: absolute;
        right: 5px;
        top: 5px;
    }

    .resources {
        display: flex;
        gap: 2px;
        flex-direction: column;
        gap: 5px;
        margin-top: 5px;
    }
</style>