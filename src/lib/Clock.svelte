<script lang="ts">
    import { onMount } from "svelte";

    let hourStr = "00";
    let minuteStr = "00";
    let time = 0;

    onMount(() => {
        const timeIntervalCancel = setInterval(() => {
            const today = new Date();
            let hours = today.getHours();
            let minutes = today.getMinutes();
            hourStr = String(hours).padStart(2, "0");
            minuteStr = String(minutes).padStart(2, "0");
            time = hours + minutes / 60;
        }, 100);

        return () => {
            clearInterval(timeIntervalCancel);
        }
    });
</script>

<section>
    <div></div>
    <div class="times">
        <div class="time"><p>00:00</p></div>
        <div class="time"><p>01:00</p></div>
        <div class="time"><p>02:00</p></div>
        <div class="time"><p>03:00</p></div>
        <div class="time"><p>04:00</p></div>
        <div class="time"><p>05:00</p></div>
        <div class="time"><p>06:00</p></div>
        <div class="time"><p>07:00</p></div>
        <div class="time"><p>08:00</p></div>
        <div class="time"><p>09:00</p></div>
        <div class="time"><p>10:00</p></div>
        <div class="time"><p>11:00</p></div>
        <div class="time"><p>12:00</p></div>
        <div class="time"><p>13:00</p></div>
        <div class="time"><p>14:00</p></div>
        <div class="time"><p>15:00</p></div>
        <div class="time"><p>16:00</p></div>
        <div class="time"><p>17:00</p></div>
        <div class="time"><p>18:00</p></div>
        <div class="time"><p>19:00</p></div>
        <div class="time"><p>20:00</p></div>
        <div class="time"><p>21:00</p></div>
        <div class="time"><p>22:00</p></div>
        <div class="time"><p>23:00</p></div>
        <div class="time"><p>24:00</p></div>
        <!-- <div class="time"><p>12:00 AM</p></div>
        <div class="time"><p>01:00 AM</p></div>
        <div class="time"><p>02:00 AM</p></div>
        <div class="time"><p>03:00 AM</p></div>
        <div class="time"><p>04:00 AM</p></div>
        <div class="time"><p>05:00 AM</p></div>
        <div class="time"><p>06:00 AM</p></div>
        <div class="time"><p>07:00 AM</p></div>
        <div class="time"><p>08:00 AM</p></div>
        <div class="time"><p>09:00 AM</p></div>
        <div class="time"><p>10:00 AM</p></div>
        <div class="time"><p>11:00 AM</p></div>
        <div class="time"><p>12:00 PM</p></div>
        <div class="time"><p>01:00 PM</p></div>
        <div class="time"><p>02:00 PM</p></div>
        <div class="time"><p>03:00 PM</p></div>
        <div class="time"><p>04:00 PM</p></div>
        <div class="time"><p>05:00 PM</p></div>
        <div class="time"><p>06:00 PM</p></div>
        <div class="time"><p>07:00 PM</p></div>
        <div class="time"><p>08:00 PM</p></div>
        <div class="time"><p>09:00 PM</p></div>
        <div class="time"><p>10:00 PM</p></div>
        <div class="time"><p>11:00 PM</p></div>
        <div class="time"><p>12:00 AM</p></div> -->
    </div>
    <div class="actualTime" style="--time: {time}">
        <div>
            <p>{hourStr}:{minuteStr}</p>
        </div>
    </div>
</section>

<style>
    section {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: 130px auto;
        padding-top: 10px;
    }

    .actualTime {
        position: fixed;
        width: calc(100% - 60px);
        height: 3px;
        background-color: rgba(255, 0, 0, 0.315);
        --l: calc((100% - 123px) / 25);
        top: calc(var(--l) * var(--time, 1) + 149px);
        left: 78px;
        z-index: 200;
    }

    .actualTime div {
        background-color: red;
        padding: 3px;
        border-radius: 3px;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(-100%, -50%);
    }

    .actualTime div p {
        color: #ffffff;
    }

    .times {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .time {
        width: 100%;
        height: 1px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 5px;
    }

    p {
        font-family: "Zona Pro", monospace;
        font-weight: bold;
        color: #d4beaf;
        font-size: 0.7rem;
        pointer-events: none;
        display: block;
    }
</style>