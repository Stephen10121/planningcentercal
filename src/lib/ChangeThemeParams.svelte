<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Accordion from "$lib/components/ui/accordion/index.js";
    import type { CalendarThemes, CustomTheme } from "./utils";
    import LoadTemplate from "./LoadTemplate.svelte";

    export let customThemeJSON: CustomTheme;
    export let theme: CalendarThemes | undefined;

    $: customThemeText = JSON.stringify(customThemeJSON);
</script>

<div>
    <Label>Theme</Label>
    <div class="tabs bg-[#f4f4f5] dark:bg-[#27272a]">
        <label title="Choose Theme"><input form="updateCalendar" type="radio" name="style" class="sr-only" value="LIGHT" bind:group={theme} checked={theme=="LIGHT"} /><p>Light</p></label>
        <label title="Choose Theme"><input form="updateCalendar" type="radio" name="style" class="sr-only" value="DARK" bind:group={theme} checked={theme=="DARK"} /><p>Dark</p></label>
        <label title="Choose Theme"><input form="updateCalendar" type="radio" name="style" class="sr-only" value="CUSTOM" bind:group={theme} checked={theme=="CUSTOM"} /><p>Custom</p></label>
    </div>
</div>
{#if theme === "CUSTOM"}
    <LoadTemplate bind:customThemeJSON={customThemeJSON} />
    <Accordion.Root class="w-full" disabled={theme !== "CUSTOM"}>
        <Accordion.Item value="mainpagestyles">
            <Accordion.Trigger style="{theme !== "CUSTOM" ? 'opacity: 0.5;':''}">Main Page Styles</Accordion.Trigger>
            <Accordion.Content>
                <div class="customisers">
                    <label class="colorPicker">
                        <Label>Background Color</Label>
                        <input type="color" bind:value={customThemeJSON.backgroundColor}>
                    </label>
                </div>
            </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="headerstyles">
            <Accordion.Trigger style="{theme !== "CUSTOM" ? 'opacity: 0.5;':''}">Header Styles</Accordion.Trigger>
            <Accordion.Content>
                <div class="customisers">
                    <label class="colorPicker">
                        <Label>Header Background Color</Label>
                        <input type="color" bind:value={customThemeJSON.headerColor}>
                    </label>
                    <div class="bar"></div>
                    <label class="colorPicker">
                        <Label>Day Text Color</Label>
                        <input type="color" bind:value={customThemeJSON.dayTextColor}>
                    </label>
                    <div class="bar"></div>
                    <label class="colorPicker">
                        <Label>Selected Day Text Color</Label>
                        <input type="color" bind:value={customThemeJSON.selectedDayTextColor}>
                    </label>
                    <div class="bar"></div>
                    <label class="text">
                        <Label>Day of the Week Text Size</Label>
                        <Input type="text" autocomplete="off" bind:value={customThemeJSON.dayOfWeekSize} />
                    </label>
                    <div class="bar"></div>
                    <label class="text">
                        <Label>Header Height</Label>
                        <Input type="text" autocomplete="off" bind:value={customThemeJSON.headerHeight} />
                    </label>
                    <div class="bar"></div>
                    <label class="text">
                        <Label>Header Shadow</Label>
                        <Input type="text" autocomplete="off" bind:value={customThemeJSON.headerBoxShadow} />
                    </label>
                </div>
            </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="dayseparatorstyles">
            <Accordion.Trigger style="{theme !== "CUSTOM" ? 'opacity: 0.5;':''}">Day Separator Styles</Accordion.Trigger>
            <Accordion.Content>
                <div class="customisers">
                    <label class="text">
                        <Label>Line Width</Label>
                        <Input type="text" autocomplete="off" bind:value={customThemeJSON.daySeparatorLineWidth} />
                    </label>
                    <div class="bar"></div>
                    <label class="text">
                        <Label>Line Style</Label>
                        <Input type="text" autocomplete="off" bind:value={customThemeJSON.daySeparatorLineStyle} />
                    </label>
                    <div class="bar"></div>
                    <label class="colorPicker">
                        <Label>Line Color</Label>
                        <input type="color" bind:value={customThemeJSON.daySeparatorLineColor}>
                    </label>
                </div>
            </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="eventstyles">
            <Accordion.Trigger style="{theme !== "CUSTOM" ? 'opacity: 0.5;':''}">Event Styles</Accordion.Trigger>
            <Accordion.Content>
                <div class="customisers">
                    <label class="colorPicker">
                        <Label>Background Color</Label>
                        <input type="color" bind:value={customThemeJSON.eventBackgroundColor}>
                    </label>
                    <div class="bar"></div>
                    <label class="text">
                        <Label>Border Radius</Label>
                        <Input type="text" autocomplete="off" bind:value={customThemeJSON.eventBorderRadius} />
                    </label>
                    <div class="bar"></div>
                    <label class="colorPicker">
                        <Label>Title Color</Label>
                        <input type="color" bind:value={customThemeJSON.eventTitleColor}>
                    </label>
                    <div class="bar"></div>
                    <label class="colorPicker">
                        <Label>Resource Text Color</Label>
                        <input type="color" bind:value={customThemeJSON.resourceTextColor}>
                    </label>
                    <div class="bar"></div>
                    <label class="text">
                        <Label>Resource Font Size</Label>
                        <Input type="text" autocomplete="off" bind:value={customThemeJSON.resourceFontSize} />
                    </label>
                    <div class="bar"></div>
                    <label class="text">
                        <Label>Title Font Size</Label>
                        <Input type="text" autocomplete="off" bind:value={customThemeJSON.eventTitleFontSize} />
                    </label>
                    <div class="bar"></div>
                    <label class="text">
                        <Label>Tag Font Size</Label>
                        <Input type="text" autocomplete="off" bind:value={customThemeJSON.tagFontSize} />
                    </label>
                    <div class="bar"></div>
                    <label class="colorPicker">
                        <Label>Time Text Color</Label>
                        <input type="color" bind:value={customThemeJSON.timeTextColor}>
                    </label>
                    <div class="bar"></div>
                    <label class="text">
                        <Label>Time Text Font Size</Label>
                        <Input type="text" autocomplete="off" bind:value={customThemeJSON.timeTextFontSize} />
                    </label>
                </div>
            </Accordion.Content>
        </Accordion.Item>
    </Accordion.Root>
{/if}
<input type="hidden" name="customStyle" form="updateCalendar" bind:value={customThemeText}>

<style>
    .tabs {
        /* background-color:#f4f4f5; */
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

    .customisers {
        display: flex;
        flex-direction: column;
        gap: 7px;
    }

    .bar {
        width: 100%;
        height: 1px;
        border-radius: 100vw;
        background-color: #b1b1b1;
    }

    .colorPicker {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        padding: 5px 4px;
    }

    .text {
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: space-between;
        padding: 2px 4px;
        gap: 4px;
    }
</style>