<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import type { EventData } from "$lib";
    import Day from "$lib/Day.svelte";
    import { onMount } from "svelte";
    import { DARK_THEME, LIGHT_THEME, type CalendarThemes, type CustomTheme } from "./utils";

    export let events: EventData[];
    export let theme: CalendarThemes;
    export let customTheme: CustomTheme;
    let themeString = chooseStyle();

    $: {
        customTheme;
        theme;
        themeString = chooseStyle();
    }

    function chooseStyle() {
        let tempStyle = "";
        if (theme === "CUSTOM") {
            for (let i=0;i<Object.keys(customTheme).length;i++) {
                tempStyle += `--${Object.keys(customTheme)[i]}:${customTheme[Object.keys(customTheme)[i]]};`;
            }
        } else if (theme === "LIGHT") {
            for (let i=0;i<Object.keys(LIGHT_THEME).length;i++) {
                tempStyle += `--${Object.keys(LIGHT_THEME)[i]}:${LIGHT_THEME[Object.keys(LIGHT_THEME)[i]]};`;
            }
        } else {
            for (let i=0;i<Object.keys(DARK_THEME).length;i++) {
                tempStyle += `--${Object.keys(DARK_THEME)[i]}:${DARK_THEME[Object.keys(DARK_THEME)[i]]};`;
            }
        }

        return tempStyle
    }

    let today = new Date(new Date(new Date().getTime() + (24 * 60 * 60 * 1000) * 0).setHours(0, 0, 0, 0));
    let tomorrow = new Date(new Date(new Date().getTime() + (24 * 60 * 60 * 1000) * 1).setHours(0, 0, 0, 0));
    let thirdDay = new Date(new Date(new Date().getTime() + (24 * 60 * 60 * 1000) * 2).setHours(0, 0, 0, 0));

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

<main style={themeString}>
    <Day {events} day={today} isToday />
    <Day {events} day={tomorrow} />
    <Day {events} day={thirdDay} />
</main>

<style>
    :global(html) {
        background-color: #303030;
    }

    main {
        width: 100%;
        height: 100%;
        background-color: var(--backgroundColor, #303030);
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
</style>