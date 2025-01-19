<script lang="ts">
    import * as Avatar from "$lib/components/ui/avatar/index.js";
	import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card/index.js";
    import Pencil from "lucide-svelte/icons/pencil";
    import Question from "lucide-svelte/icons/circle-help";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import * as Sheet from "$lib/components/ui/sheet/index.js";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import * as Tooltip from "$lib/components/ui/tooltip/index.js";
    import { toast } from "svelte-sonner";
    import { enhance } from "$app/forms";
    import { goto } from "$app/navigation";
    import { PRICING_PAGE } from "$lib/constants.js";

	export let data;
    export let form;

    let linkToAvatar = "";
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
            } else if (form.billing) {
                dismissLoading();
                toast(form.message, {
                    action: {
                        label: 'Pricing',
                        onClick: () => goto(PRICING_PAGE)
                    },
                })
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

    let usePassword = false;
</script>

<svelte:head>
    <title>My Calendars</title>
</svelte:head>

{#if data.user}
    <div class="hidden flex-col md:flex px-24 mt-20">
        <div class="flex-1 space-y-4 p-8 pt-6">
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div class="col-span-1"></div>
                <Card.Root class="col-span-5">
                    <Card.Header>
                        <Card.Title>Calendar List</Card.Title>
                        <Card.Description>All the calendars that you've created.</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <div class="space-y-8">
                            {#if data.calendars}
                                {#each data.calendars as calendar (calendar.id)}
                                    <div class="flex items-center">
                                        <Avatar.Root class="h-11 w-11 border-gray border-2">
                                            <Avatar.Image src={calendar.logoLink} alt="Avatar" />
                                            <Avatar.Fallback>{calendar.name[0]}</Avatar.Fallback>
                                        </Avatar.Root>
                                        <div class="ml-4 space-y-1">
                                            <p class="text-sm font-medium leading-none">{calendar.name}</p>
                                            <a href="/calendar/{calendar.id}" target="_blank" class="underline text-muted-foreground text-sm">/calendar/{calendar.id}</a>
                                        </div>
                                        <Button variant="secondary" class="ml-auto text-xs p-2 h-7" size="sm" href="/mycalendars/{calendar.id}">
                                            More Info
                                        </Button>
                                    </div>
                                {/each}
                            {:else}
                                <p class="flex items-center justify-center">No Calendars yet.</p>
                            {/if}
                            <div class="flex items-center justify-center">
                                <Sheet.Root>
                                    <Sheet.Trigger asChild let:builder>
                                      <Button builders={[builder]}>Create New</Button>
                                    </Sheet.Trigger>
                                    <Sheet.Content side="right">
                                      <Sheet.Header>
                                        <Sheet.Title>Create a new calendar</Sheet.Title>
                                        <Sheet.Description>
                                            You can always update the settings later.
                                        </Sheet.Description>
                                      </Sheet.Header>
                                      <form method="POST" enctype="multipart/form-data" use:enhance={() => {
                                        if (!creatingCalendar) creatingCalendar = toast.loading("Creating Calendar...");
                                        return async ({ update }) => {
                                            dismissLoading();
                                            update({ reset: false });
                                        };
                                      }}>
                                        <div class="flex flex-col mt-10 gap-10 px-2 w-full mx-auto">
                                            <div class="w-fit mx-auto">
                                                <label for="logo" class="relative cursor-pointer w-72 h-72" title="Choose a Logo">
                                                    <Avatar.Root class="w-64 h-64 border-2">
                                                        <Avatar.Image src={linkToAvatar} alt="Logo"/>
                                                        <Avatar.Fallback>{data.user.name[0]}</Avatar.Fallback>
                                                    </Avatar.Root>
                                                    <div class="absolute rounded-full bg-red-600 w-10 h-10 right-5 bottom-5 flex items-center justify-center hover:bg-red-400 transition-colors">
                                                        <Pencil class="size-4" aria-hidden="true" color="#ffffff" />
                                                    </div>
                                                </label>
                                                <input type="file" id="logo" name="logo" accept="image/png, image/jpeg, image/svg+xml, image/gif, image/webp" hidden on:change={showPreview} />
                                            </div>
                                            <div class="flex flex-col gap-3">
                                                <div class="grid w-full max-w-sm items-center gap-1.5">
                                                    <Label for="name">Name</Label>
                                                    <Input required type="text" autocomplete="off" id='name' name="name" placeholder="e.g. 'Bobs Calendar'" class="max-w-xs" />
                                                </div>
                                                <div class="grid w-full max-w-sm items-center gap-1.5">
                                                    <div class="flex justify-between items-center">
                                                        <Label for="id">Unique Id</Label>
                                                        <Tooltip.Root>
                                                            <Tooltip.Trigger asChild let:builder>
                                                                <Button builders={[builder]} variant="ghost" class="w-5 h-5">
                                                                    <div class="rounded-full w-5 h-5 flex items-center justify-center">
                                                                        <Question class="size-4" aria-hidden="true" color="#000000" />
                                                                    </div>
                                                                </Button>
                                                            </Tooltip.Trigger>
                                                            <Tooltip.Content>
                                                                <p>This is the unique identifier for this calendar. <br>You can access the link to the calendar<br> given the id. e.g. "/calendar/bob123"</p>
                                                            </Tooltip.Content>
                                                        </Tooltip.Root>
                                                    </div>
                                                    <Input required type="text" autocomplete="off" id='id' name="id" placeholder="e.g. 'bob123'" class="max-w-xs" />
                                                </div>
                                                <div class="flex items-center justify-between space-x-2 mt-2">
                                                    <Label for="use-password">Use Password</Label>
                                                    <Switch id="use-password" bind:checked={usePassword} />
                                                </div>
                                                {#if usePassword}
                                                    <div class="grid w-full max-w-sm items-center gap-1.5">
                                                        <Label for="password">Password</Label>
                                                        <Input type="password" autocomplete="off" id='password' name="password" placeholder="Password" class="max-w-xs" />
                                                    </div>
                                                {/if}
                                                <Button class="mt-4" type="submit">Create Calendar</Button>
                                            </div>
                                        </div>
                                    </form>
                                    </Sheet.Content>
                                  </Sheet.Root>
                            </div>
                        </div>
                    </Card.Content>
                </Card.Root>
                <div class="col-span-1"></div>
            </div>
        </div>
    </div>
{/if}