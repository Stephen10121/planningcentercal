<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
 
    const templates = [
        { value: "LIGHT", label: "Light Theme" },
        { value: "DARK", label: "Dark Theme" },
        { value: "OTHER", label: "3rd party theme" }
    ];

    let selectedTemplate: string;

    $: {
        console.log(selectedTemplate)
    }
</script>

<Popover.Root>
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