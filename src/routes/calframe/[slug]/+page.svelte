<script lang="ts">
    import Calendar from "$lib/Calendar.svelte";
    import type { CalendarThemes, CustomTheme } from "$lib/utils.js";
    import { onMount } from "svelte";

    export let data;
    let theme = data.style as CalendarThemes;
    let customTheme = data.customStyle as CustomTheme;

    function recieveParentMessage(event: MessageEvent<{theme: CalendarThemes, customThemeJSON: CustomTheme}>) {
        try {
            theme = event.data.theme;
            customTheme = event.data.customThemeJSON;
        } catch (_err) {
            theme = data.style as CalendarThemes;
            customTheme = data.customStyle as CustomTheme;
        }
    }

    onMount(() => {
        window.addEventListener("message", recieveParentMessage);

        return () => {
            window.removeEventListener("message", recieveParentMessage);
        }
    });
</script>

<main>
    {#if data.events}
        <Calendar events={data.events} {theme} {customTheme} />
    {/if}
</main>
<style>
    main {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>