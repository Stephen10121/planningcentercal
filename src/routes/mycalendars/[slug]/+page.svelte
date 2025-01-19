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
    import Question from "lucide-svelte/icons/circle-help";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import * as Tooltip from "$lib/components/ui/tooltip/index.js";
    import { toast } from "svelte-sonner";
    import { enhance } from "$app/forms";

	export let data;
    export let form;

    let linkToAvatar = data.logoLink;
    let name = data.name;

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

    let usePassword = data.hasPassword;
    let changesMade = false;

    $: {
        if (data.name !== name || usePassword !== data.hasPassword) {
            changesMade = true;
        } else {
            changesMade = false;
        }
    }
</script>

<svelte:head>
    <title>{data.name} | My Calendars</title>
</svelte:head>

{#if data.user}
    <div class="flex items-center justify-center px-24 mt-20 w-full">
        <form method="POST" enctype="multipart/form-data" use:enhance={() => {
                if (!creatingCalendar) creatingCalendar = toast.loading("Creating Calendar...");
                return async ({ update }) => {
                    dismissLoading();
                    update({ reset: false });
                };
        }}>
            <div class="flex flex-col mt-10 gap-10 px-2 w-full mx-auto">
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
                    <input type="file" id="logo" name="logo" accept="image/png, image/jpeg, image/svg+xml, image/gif, image/webp" hidden on:change={showPreview} />
                </div>
                <div class="flex flex-col gap-3">
                    <div class="grid w-full max-w-sm items-center gap-1.5">
                        <Label for="name">Name</Label>
                        <Input type="text" autocomplete="off" id='name' bind:value={name} name="name" placeholder="e.g. 'Bobs Calendar'" class="max-w-xs" />
                    </div>
                    <div class="flex items-center justify-between space-x-2 mt-2">
                        <Label for="use-password">Use Password</Label>
                        <Switch id="use-password" bind:checked={usePassword} />
                    </div>
                    {#if usePassword}
                        <Dialog.Root>
                            <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>Change Password</Dialog.Trigger>
                            <Dialog.Content class="sm:max-w-[425px]">
                            <Dialog.Header>
                                <Dialog.Title>Change Password</Dialog.Title>
                                <Dialog.Description>
                                Make changes to your password here. Click save when you're done.
                                </Dialog.Description>
                            </Dialog.Header>
                            <div class="grid gap-4 py-4">
                                <div class="grid w-full max-w-sm items-center gap-1.5">
                                    <Label for="prevPassword">Previous Password</Label>
                                    <Input type="password" autocomplete="off" id='prevPassword' placeholder="Previous Password" />
                                </div>
                                <div class="grid w-full max-w-sm items-center gap-1.5">
                                    <Label for="newPassword">New Password</Label>
                                    <Input type="password" autocomplete="off" id='newPassword' placeholder="New Password" />
                                </div>
                            </div>
                            <Dialog.Footer>
                                <Button type="submit">Save changes</Button>
                            </Dialog.Footer>
                            </Dialog.Content>
                        </Dialog.Root>
                    {/if}
                    {#if changesMade}
                        <Button class="mt-4" type="submit">Update Calendar</Button>
                    {/if}
                </div>
            </div>
        </form>
    </div>
{/if}