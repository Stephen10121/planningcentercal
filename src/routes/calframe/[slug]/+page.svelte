<script lang="ts">
    import Calendar from "$lib/Calendar.svelte";
    import { onMount } from "svelte";

    export let data;
    let theme = data.style as "LIGHT" | "DARK" | "CUSTOM";
    let customTheme = data.customStyle as {[key: string]: any};

    function recieveParentMessage(event: MessageEvent<{theme: "LIGHT" | "DARK" | "CUSTOM", customThemeJSON: {[key: string]: any}}>) {
        try {
            theme = event.data.theme;
            customTheme = event.data.customThemeJSON;
        } catch (_err) {
            theme = data.style as "LIGHT" | "DARK" | "CUSTOM";
            customTheme = data.customStyle as {[key: string]: any};
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