<script lang="ts">
    export let hours: number;
    export let color = "#FBDCD4";
</script>

<div class="event" style="--hours: {hours};--color:{color};">
    <div class="inner">
        <p class="time">1:00 AM-6:00 AM</p>
        <p class="name">Morning Service</p>
    </div>
</div>

<style>
    .event {
        position: absolute;
        top: 0;
        left: 20px;
        width: calc(100% - 40px);
        height: calc(calc(100% / 24 + 0.2%) * var(--hours));
        padding: 5px;
    }

    .inner {
        width: 100%;
        height: 100%;
        background-color: var(--color);
        border: 1px solid #0000002c;
        padding: 10px;
        border-radius: 3px;
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
        margin-top: 5px;
    }
</style>