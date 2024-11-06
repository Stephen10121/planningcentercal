<script lang="ts">
    export let name: string;
    export let color: string;
</script>

<div style="--color:{color};">
    <p>{name}</p>
</div>

<style>
    div {
        background-color: var(--color);
        width: fit-content;
        padding: 2px 5px;
        border-radius: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #00000063;
    }

    p {
        font-family: "Zona Pro";
        color: #353535;
        font-size: 0.6rem;
        font-weight: 600;
        display: inline;
    }
</style>