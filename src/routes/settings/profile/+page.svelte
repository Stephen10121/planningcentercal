<script lang="ts">
    import * as Avatar from "$lib/components/ui/avatar/index.js";
    import Pencil from "lucide-svelte/icons/pencil";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { enhance } from "$app/forms";
    import { toast } from "svelte-sonner";

    export let data;
    export let form;

    $: {
        if (form) {
            if (form.error) {
                toast.error("Error", { description: form.message});
            } else if (form.success) {
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

    $: linkToAvatar = data.avatar;
    let updatingToast: undefined | string | number = "";
    let usersName = data.user?.name;
</script>

{#if data.user}
    <div class="flex flex-col w-full h-full p-10">
        <form action="?/updateProfile" method="POST" class="w-full" enctype="multipart/form-data" use:enhance={() => {
            updatingToast = toast.loading("Updating profile...");
            return async ({ update }) => {
                if (updatingToast) {
                    toast.dismiss(updatingToast);
                    updatingToast = undefined;
                }
                update({ reset: true });
                setTimeout(() => {
                    usersName = data.user?.name;
                }, 200);
            };
          }}>
            <h3 class="text-2xl font-medium">Profile</h3>
            <div class="flex flex-col mt-10 gap-10 px-5 w-full mx-auto">
                <div class="w-fit mx-auto">
                    <label for="avatar" class="relative cursor-pointer w-72 h-72" title="Choose New Avatar">
                        <Avatar.Root class="w-72 h-72 border-2">
                            <Avatar.Image src={linkToAvatar} alt="Your Avatar"/>
                            <Avatar.Fallback>{data.user.name[0]}</Avatar.Fallback>
                        </Avatar.Root>
                        <div class="absolute rounded-full bg-red-600 w-10 h-10 right-5 bottom-5 flex items-center justify-center hover:bg-red-400 transition-colors">
                            <Pencil class="size-4" aria-hidden="true" color="#ffffff" />
                        </div>
                    </label>
                    <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg, image/svg+xml, image/gif, image/webp" hidden on:change={showPreview} />
                </div>
                <div class="flex flex-col gap-3">
                    <div class="grid w-full max-w-sm items-center gap-1.5">
                        <Label for="name">Name</Label>
                        <Input type="text" id='name' name="name" placeholder="Name" class="max-w-xs" value={usersName} />
                    </div>
                    <Button class="w-fit" type="submit">Update Profile</Button>
                </div>
            </div>
        </form>
    </div>
{/if}