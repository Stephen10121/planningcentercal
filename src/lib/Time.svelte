<script lang="ts">
    import type { EventTimes } from "$lib";

    export let time: EventTimes;
    export let eventName: string;

    const startTime = new Date(time.startTime);
    const endTime = new Date(time.endTime);
</script>

<p><span>{time.name === eventName ? "Actual Event" : time.name}:</span> {String(startTime.getHours()).padStart(2, "0")}:{String(startTime.getMinutes()).padStart(2, "0")} - {String(endTime.getHours()).padStart(2, "0")}:{String(endTime.getMinutes()).padStart(2, "0")}</p>

<style>
    p {
        font-family: "Zona Pro";
        color: #ffffff;
        font-size: 0.7rem;
        font-weight: 600;
        display: inline;
        margin-left: 5px;
    }

    span {
        color: #bdbdbd;
        font-size: 0.65rem;
    }
</style>