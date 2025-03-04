<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import type { EventData } from "$lib";
    import Day from "$lib/Day.svelte";
    import { onMount } from "svelte";
    import type { CalendarThemes, CustomTheme } from "./utils";
    import Page from "../routes/+page.svelte";

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
        const LIGHT_THEME: CustomTheme = {
            "backgroundColor": "#ededed",
            "headerColor": "#b3b3b3",
            "dayTextColor": "#f5f5f5",
            "dayOfWeekSize": "2rem",
            "selectedDayTextColor": "#ffffff",
            "headerHeight": "80px",
            "headerBoxShadow": "0px 8px 18px -18px rgb(0, 0, 0)",
            "daySeparatorLineWidth": "1px",
            "daySeparatorLineStyle": "solid",
            "daySeparatorLineColor": "#9e9e9e",
            "eventTitleColor": "#1472ff",
            "eventTitleFontSize": "clamp(0.9rem, 0.6951rem + 0.6829vw, 1.25rem)",
            "tagFontSize": "0.6rem",
            "timeTextColor": "#545454",
            "timeTextFontSize": "clamp(0.8rem, 0rem + 1.4vw, 1rem)",
            "eventBackgroundColor": "#adadad",
            "resourceFontSize": "1rem",
            "resourceTextColor": "#ffffff"
        }
        const DARK_THEME: CustomTheme = {
            backgroundColor: "#303030",
            headerColor: "#212121",
            dayTextColor: "#ffffff",
            dayOfWeekSize: "2rem",
            selectedDayTextColor: "#8AB4F4",
            headerHeight: "80px",
            headerBoxShadow: "0px 8px 18px -18px rgb(0, 0, 0)",
            daySeparatorLineWidth: "1px",
            daySeparatorLineStyle: "dashed",
            daySeparatorLineColor: "#202020",
            eventBackgroundColor: "#424242",
            eventTitleColor: "#8AB4F4",
            eventTitleFontSize: "clamp(0.9rem, 0.6951rem + 0.6829vw, 1.25rem)",
            resourceTextColor: "#ffffff",
            resourceFontSize: "1rem",
            tagFontSize: "0.6rem",
            timeTextColor: "#fdfdfd",
            timeTextFontSize: "clamp(0.8rem, 0rem + 1.4vw, 1rem)"
        }
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