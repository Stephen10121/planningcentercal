<script lang="ts">
    import { MONTHTOSTRING, type EventData } from "$lib";
    import Resource from "./Resource.svelte";
    import Tag from "./Tag.svelte";
    import Time from "./Time.svelte";

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

<div class="event">
    <div class="inner">
        {#if data.tags}
            <div class="tags">
                {#each data.tags as tag}
                    <Tag name={tag.name} color={tag.color} />
                {/each}
            </div>
        {/if}
        <div class="stage1">
            {#if MULTI_DAY_EVENT}
                <p class="time">{MONTHTOSTRING[start.getMonth()]} {start.getDate()}, {startHourStr}:{startMinutesStr} - {MONTHTOSTRING[end.getMonth()]} {end.getDate()}, {endHourStr}:{endMinutesStr}</p>
            {:else}
                <p class="time">{startHourStr}:{startMinutesStr} - {endHourStr}:{endMinutesStr}</p>
            {/if}
            <p class="name">{data.name} {#if MULTI_DAY_EVENT && !FIRST_DAY}<span class="cont">continued.</span>{/if}</p>
            {#if MULTI_DAY_EVENT}
                <p class="lighter">Multi-Day Event</p>
            {/if}
        </div>
        {#if data.resources}
            <div class="resources">
                {#each data.resources as resource}
                    <Resource {resource} />
                {/each}
            </div>
        {/if}
        {#if data.times.length > 1}
            <p class="timeTitle">Times:</p>
            <div class="times">
                {#each data.times as time}
                    <Time {time} eventName={data.name} />
                {/each}
            </div>
        {/if}
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
        background-color: #424242;
        border: 1px solid #0000002c;
        padding: 10px 10px 10px 10px;
        border-radius: 3px;
        position: relative;
        isolation: isolate;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    }

    .time {
        font-family: sans-serif, monospace;
        color: #fdfdfd;
        font-weight: 500;
        font-size: clamp(0.8rem, 0rem + 1.4vw, 1rem);
        pointer-events: none;
        margin-top: -3px;
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
        color: #8AB4F4;
        font-weight: 700;
        font-size: 0.9rem;
        pointer-events: none;
        display: block;
    }

    @media screen and (min-width: 480px) {
        .name {
            font-size: 1.25rem;
        }
    }

    .lighter {
        font-family: "Zona Pro";
        color: #dddbdb;
        font-size: 0.8rem;
        font-weight: 600;
        pointer-events: none;
        margin-left: 5px;
    }

    .cont {
        font-family: "Zona Pro";
        color: #dddbdb;
        font-size: 0.8rem;
        font-weight: 600;
        pointer-events: none;
    }

    .tags {
        display: flex;
        align-items: flex-end;
        gap: 3px;
        position: absolute;
        right: 5px;
        top: 5px;
    }

    .resources,
    .times {
        display: flex;
        gap: 2px;
        flex-direction: column;
        gap: 5px;
        margin-top: 5px;
    }

    .times {
        margin-left: 10px;
    }

    .timeTitle {
        font-family: "Zona Pro";
        color: #bdbdbd;
        font-size: 0.65rem;
        font-weight: 600;
        display: inline;
        margin-left: 5px;
        display: block;
        margin-top: 5px;
    }
</style>