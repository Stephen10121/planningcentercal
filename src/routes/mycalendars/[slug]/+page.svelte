<script lang="ts">
    import * as Avatar from "$lib/components/ui/avatar/index.js";
	import {
        Button,
        buttonVariants
    } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import Pencil from "lucide-svelte/icons/pencil";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import { toast } from "svelte-sonner";
    import { enhance } from "$app/forms";
    import { Textarea } from "$lib/components/ui/textarea";
    import Calendar from "$lib/Calendar.svelte";

	export let data;
    export let form;

    let linkToAvatar = data.logoLink;
    let name = data.name;
    let theme = data.style;
    let customTheme = JSON.stringify(data.customStyle);
    let customThemeJSON = parseCustomTheme();

    function parseCustomTheme() {
        try {
            return JSON.parse(customTheme) as {[key: string]: any};
        } catch (_) {
            return {} as {[key: string]: any}
        }
    }

    $: {
        customTheme;
        customThemeJSON = parseCustomTheme();
    }

    let creatingCalendar: string | number | undefined = undefined;

    function dismissLoading() {
        if (creatingCalendar !== undefined) {
            toast.dismiss(creatingCalendar);
            creatingCalendar = undefined;
        }
    }

    $: {
        if (form) {
            if (form.error) {
                dismissLoading();
                toast.error("Error", { description: form.message});
            } else if (form.success) {
                dismissLoading();
                toast.success("Success", {description: form.message});
            }
        }
    }

    function showPreview(event: Event) {
        const target = event.target;
        //@ts-ignore
        const files = target.files;

        if (files.length > 0) {
            if (files[0].size > 5000000) {
                toast.error("Error", { description: "This file is too large. Max: 5MB." });
                return;
            }
            linkToAvatar = URL.createObjectURL(files[0]);
        }
    }

    function enhancedForm() {
        if (!creatingCalendar) creatingCalendar = toast.loading("Creating Calendar...");
        //@ts-ignore
        return async ({ update }) => {
            dismissLoading();
            update({ reset: false });
        };
    }

    let usePassword = data.hasPassword;
</script>

<svelte:head>
    <title>{data.name} | My Calendars</title>
</svelte:head>

{#if data.user}
    <section>
    <div class="px-5 py-1 w-full h-full overflow-auto relative">
        <a class="flex items-center gap-2 underline absolute top-1 left-1 px-1 h-5" href="/mycalendars">Go Back</a>
        <form
            method="POST"
            id="updateCalendar"
            action="?/updateCalendar"
            enctype="multipart/form-data"
            use:enhance={enhancedForm}>
        </form>
        <div>
            <div class="flex flex-col mt-2 gap-10 w-full mx-auto">
                <div class="w-fit mx-auto">
                    <label for="logo" class="relative cursor-pointer w-72 h-72" title="Change Logo">
                        <Avatar.Root class="w-64 h-64 border-2">
                            <Avatar.Image src={linkToAvatar} alt="Logo"/>
                            <Avatar.Fallback>{data.user.name[0]}</Avatar.Fallback>
                        </Avatar.Root>
                        <div class="absolute rounded-full bg-red-600 w-10 h-10 right-5 bottom-5 flex items-center justify-center hover:bg-red-400 transition-colors">
                            <Pencil class="size-4" aria-hidden="true" color="#ffffff" />
                        </div>
                    </label>
                    <input form="updateCalendar" type="file" id="logo" name="logo" accept="image/png, image/jpeg, image/svg+xml, image/gif, image/webp" hidden on:change={showPreview} />
                </div>
                <div class="flex flex-col gap-3">
                    <div class="grid w-full max-w-sm items-center gap-1.5">
                        <Label for="name">Name</Label>
                        <Input form="updateCalendar" type="text" autocomplete="off" id='name' bind:value={name} name="name" placeholder="e.g. 'Bobs Calendar'" />
                    </div>
                    <div class="flex items-center justify-between space-x-2 mt-2">
                        <Label for="use-password">Use Password</Label>
                        <Switch id="use-password" bind:checked={usePassword} />
                    </div>
                    {#if usePassword}
                        <Dialog.Root>
                            <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>{data.hasPassword ? "Change" : "Set"} Password</Dialog.Trigger>
                            <Dialog.Content class="sm:max-w-[425px]">
                            <Dialog.Header>
                                <Dialog.Title>{data.hasPassword ? "Change" : "Set"} Password</Dialog.Title>
                                <Dialog.Description>
                                Make changes to your password here. Click save when you're done.
                                </Dialog.Description>
                            </Dialog.Header>
                            <form
                                method="POST"
                                id="updatePassword"
                                action="?/updatePassword"
                                use:enhance={enhancedForm}
                            >
                                <div class="grid gap-4 py-4">
                                    <div class="grid w-full max-w-sm items-center gap-1.5">
                                        <Label for="prevPassword">Previous Password</Label>
                                        <Input required type="password" autocomplete="off" name="prevPassword2" id='prevPassword' placeholder="Previous Password" />
                                    </div>
                                    <div class="grid w-full max-w-sm items-center gap-1.5">
                                        <Label for="newPassword">New Password</Label>
                                        <Input required type="password" autocomplete="off" name="newPassword" id='newPassword' placeholder="New Password" />
                                    </div>
                                </div>
                            </form>
                            <Dialog.Footer>
                                <Button type="submit" form="updatePassword">Save changes</Button>
                            </Dialog.Footer>
                            </Dialog.Content>
                        </Dialog.Root>
                    {/if}
                    <div>
                        <Label>Theme</Label>
                        <div class="tabs">
                            <label title="Choose Theme"><input form="updateCalendar" type="radio" name="style" class="sr-only" value="LIGHT" bind:group={theme} checked={theme=="LIGHT"} /><p>Light</p></label>
                            <label title="Choose Theme"><input form="updateCalendar" type="radio" name="style" class="sr-only" value="DARK" bind:group={theme} checked={theme=="DARK"} /><p>Dark</p></label>
                            <label title="Choose Theme"><input form="updateCalendar" type="radio" name="style" class="sr-only" value="CUSTOM" bind:group={theme} checked={theme=="CUSTOM"} /><p>Custom</p></label>
                        </div>
                    </div>
                    <div class="grid w-full max-w-sm items-center gap-1.5">
                        <Label for="customStyle">Custom Styling (Beta)</Label>
                        <Textarea form="updateCalendar" autocomplete="off" id='customStyle' bind:value={customTheme} name="customStyle" />
                    </div>
                    <Button form="updateCalendar" class="mt-4" type="submit">Update Calendar</Button>
                </div>
            </div>
        </div>
    </div>
    <div class="liveCal border-l">
        <div class="browser border-2">
            <div class="tab border-t-2 border-l-2 border-r-2">
                <Avatar.Root class="h-6 w-6">
                    <Avatar.Image src={linkToAvatar} alt="Logo"/>
                    <Avatar.Fallback>{data.user.name[0]}</Avatar.Fallback>
                </Avatar.Root>
                <p>{name} | Preview</p>
            </div>
            <div class="window">
                {#if data.events && theme && customTheme}
                    <Calendar events={data.events} {theme} customTheme={customThemeJSON} />
                {/if}
            </div>
        </div>
    </div>
    </section>
{/if}

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
    section {
        width: 100%;
        height: calc(100% - 5.3rem);
        margin-top: 5.3rem;
        display: grid;
        grid-template-columns: 1fr 4fr;
    }

    .liveCal {
        width: 100%;
        padding: 10px;
    }

    .browser {
        width: 100%;
        height: calc(100% - 40px);
        padding: 10px;
        margin-top: 40px;
        position: relative;
        border-radius: 5px;
    }

    .tab {
        position: absolute;
        top: 0;
        left: 10px;
        width: fit-content;
        transform: translateY(-100%);
        padding: 5px 10px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .tab p {
        font-size: 0.9rem;
    }

    .window {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        overflow: hidden;
    }
</style>