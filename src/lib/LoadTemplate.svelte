<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { toast } from "svelte-sonner";
    import { CANDY_THEME, DARK_THEME, LIGHT_THEME, type CustomTheme } from "./utils";

    export let customThemeJSON: CustomTheme;
 
    const templates = [
        { value: "LIGHT", label: "Light Theme" },
        { value: "DARK", label: "Dark Theme" },
        { value: "CANDY", label: "Candy Theme" },
        { value: "OTHER", label: "3rd party theme" }
    ];

    let selectedTemplate: undefined | string;
    let outsideURL = "";

    async function loadOutsideTheme() {
        if (outsideURL && outsideURL.length > 0) {
            try {
                const resp = await fetch(outsideURL);

                if (resp.ok) {
                    const respJSON = await resp.json();
                    customThemeJSON = structuredClone(respJSON);

                    toast.success("Success", { description: "Fetched the 3rd party theme!" });
                } else {
                    toast.error("Error", { description: "Failed to fetch 3rd party theme."});
                }
            } catch (err) {
                console.log(err);
                toast.error("Error", { description: "Failed to fetch 3rd party theme."});
            }
        } else {
            toast.error("Error", { description: "Invalid link."});
        }
    }

    function setTemplate(theme: string) {
        if (theme === "LIGHT") {
            customThemeJSON = structuredClone(LIGHT_THEME);
        } else if (theme === "DARK") {
            customThemeJSON = structuredClone(DARK_THEME);
        } else if (theme === "CANDY") {
            customThemeJSON = structuredClone(CANDY_THEME);
        }
    }

    $: {
        if (selectedTemplate) setTemplate(selectedTemplate);
    }
</script>

<Popover.Root onOutsideClick={() => selectedTemplate = undefined}>
    <Popover.Trigger asChild let:builder>
      <Button builders={[builder]} variant="outline">Load Template</Button>
    </Popover.Trigger>
    <Popover.Content class="w-80">
        <section>
            <p class="text-xs w-full text-center">!Your current custom settings will get overridden!</p>
            <Select.Root onSelectedChange={(v) => {if (v) selectedTemplate = v.value as any;}}>
                <Select.Trigger class="w-full">
                    <Select.Value placeholder="Template Options" />
                </Select.Trigger>
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Template Options</Select.Label>
                        {#each templates as template}
                            <Select.Item value={template.value} label={template.label}>{template.label}</Select.Item>
                        {/each}
                    </Select.Group>
                </Select.Content>
                <Select.Input />
            </Select.Root>
            {#if selectedTemplate === "OTHER"}
                <Label>3rd party url</Label>
                <Input bind:value={outsideURL} placeholder="e.g. https://tailorcal.com/weirdTheme.json" />
                <Button on:click={loadOutsideTheme}>Load</Button>
            {/if}
        </section>
    </Popover.Content>
</Popover.Root>

<style>
    section {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
</style>