<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.js";
    import { Textarea } from "$lib/components/ui/textarea";
    import type { CalendarThemes } from "./utils";

    export let customThemeText: string;
    export let theme: CalendarThemes | undefined;
</script>

<div>
    <Label>Theme</Label>
    <div class="tabs">
        <label title="Choose Theme"><input form="updateCalendar" type="radio" name="style" class="sr-only" value="LIGHT" bind:group={theme} checked={theme=="LIGHT"} /><p>Light</p></label>
        <label title="Choose Theme"><input form="updateCalendar" type="radio" name="style" class="sr-only" value="DARK" bind:group={theme} checked={theme=="DARK"} /><p>Dark</p></label>
        <label title="Choose Theme"><input form="updateCalendar" type="radio" name="style" class="sr-only" value="CUSTOM" bind:group={theme} checked={theme=="CUSTOM"} /><p>Custom</p></label>
    </div>
</div>
<div class="grid w-full items-center gap-1.5">
    <Label for="customStyle">Custom Styling (Beta)</Label>
    <Textarea form="updateCalendar" autocomplete="off" id='customStyle' bind:value={customThemeText} name="customStyle" />
</div>

<style>
    .tabs {
        background-color:#f4f4f5;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        border-radius:5px;
        padding: 0 5px;
        width: 100%;
    }

    .sr-only {
        clip: rect(0 0 0 0); 
        clip-path: inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap; 
        width: 1px;
    }

    .tabs p {
        cursor:pointer;
        display:block;
        color:#71717a;
        font-size: .875rem;
        font-weight: 600;
        margin: 0;
        display:flex;
        align-items:center;
        justify-content:center;
        padding: 5px;
        border-radius: 5px;
        width:100%;
        background-color:#ffffff00;
        transition:color 0.1s linear, background-color 0.1s linear;
    }

    .tabs input:checked + p {
        background-color:#ffffff;
        color:#000000;
    }

    .tabs label {
        width:100%;
        height:100%;
        padding: 5px 0;
    }
</style>