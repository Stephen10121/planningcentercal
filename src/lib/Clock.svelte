<section>
    <div></div>
    <div class="times">
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
        <div class="time"><p>12:00 AM</p></div>
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
        font-family: "Zona Pro";
        font-weight: bold;
        color: #d4beaf;
        font-size: 0.7rem;
        pointer-events: none;
        display: block;
    }
</style>