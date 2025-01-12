<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import Day from "$lib/Day.svelte";
    import { onMount } from "svelte";

    let today = new Date(new Date(new Date().getTime() + (24 * 60 * 60 * 1000) * 0).setHours(0, 0, 0, 0));
    let tomorrow = new Date(new Date(new Date().getTime() + (24 * 60 * 60 * 1000) * 1).setHours(0, 0, 0, 0));
    let thirdDay = new Date(new Date(new Date().getTime() + (24 * 60 * 60 * 1000) * 2).setHours(0, 0, 0, 0));

    export let data;

    function updatePage() {
        console.log("Updating Page.");
        today = new Date(new Date(new Date().getTime() + (24 * 60 * 60 * 1000) * 0).setHours(0, 0, 0, 0));
        tomorrow = new Date(new Date(new Date().getTime() + (24 * 60 * 60 * 1000) * 1).setHours(0, 0, 0, 0));
        thirdDay = new Date(new Date(new Date().getTime() + (24 * 60 * 60 * 1000) * 2).setHours(0, 0, 0, 0));

        invalidateAll();
    }

    onMount(() => {
        const updater = setInterval(updatePage, 20000);
        return () => {
            clearInterval(updater);
        }
    });
</script>

<svelte:head>
    <title>Calendar</title>
</svelte:head>

<main>
    {#if data.newData}
        <!-- <Clock /> -->
        <Day events={data.newData} day={today} isToday />
        <Day events={data.newData} day={tomorrow} />
        <Day events={data.newData} day={thirdDay} />
    {/if}
</main>

<style>
    :global(html) {
        background-color: #303030;
    }

    :global(html:has(.darkMode)) {
        background-color: #303030;
    }

    main {
        width: 100%;
        height: 100%;
        background-color: #303030;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }

    :global(html:has(.darkMode) main) {
        background-color: #303030;
    }
</style>