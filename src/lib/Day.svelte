<script lang="ts">
    export let day: number;
    export let dayStr: string;
    export let isToday: boolean = false;
</script>

<section>
    <div class="day {isToday ? "today" : ""}">
        <h2>{day}</h2>
        <p>{dayStr}</p>
        <div class="line">
            {#if isToday}
                <div class="ball"></div>
            {/if}
        </div>
    </div>
</section>

<style>
    section {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding-top: 3rem;
    }

    .day {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }

    .day.today .line {
        background-color: #000000;
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

    .day.today h2,
    .day.today p {
        color: #131E3A;
    }

    p {
        font-family: "Zona Pro";
        font-weight: bold;
        color: #DDCDC2;
        font-size: 1.5rem;
    }
</style>