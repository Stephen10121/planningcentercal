<script lang="ts">
    import { enhance } from "$app/forms";
    import {
        Button,
        buttonVariants
    } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
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

    let emailChangeOpen = false;
</script>

{#if data.user}
    <div class="flex flex-col w-full h-full p-10">
        <h3 class="text-2xl font-medium">Account</h3>
        <div class="w-full h-full px-5">
            {#if !data.user.subscriptionEmail}
            <h4 class="scroll-m-20 text-xl font-semibold tracking-tight mt-7">Email</h4>
            <p class="leading-6 text-sm mt-3">Your email is required to confirm your subscription. Once you set your email, you cannot change it.</p>
            <Dialog.Root open={emailChangeOpen}>
                <Dialog.Trigger class="{buttonVariants({ variant: "outline" })} w-fit mt-5">Set Email</Dialog.Trigger>
                <Dialog.Content class="sm:max-w-[425px]">
                    <Dialog.Header>
                        <Dialog.Title>Set Email</Dialog.Title>
                        <Dialog.Description>Your email is required to confirm your subscription. Once you set your email, you cannot change it. REMEMBER TO USE this email when choosing a subscription plan!!!</Dialog.Description>
                    </Dialog.Header>
                        <form action="?/setEmail" method="POST" class="grid gap-4 py-4" use:enhance={() => {
                            return async ({ update }) => {
                              update({ reset: false });
                              emailChangeOpen = false;
                            };
                          }}>
                            <div class="space-y-1">
                                <Label for="email" class="text-right">Your Email</Label>
                                <Input id="email" name="email" type="email" class="col-span-3" required />
                            </div>
                            <div class="w-full flex justify-end -mb-5 mt-5">
                                <Button type="submit" class="w-fit">Set Email</Button>
                            </div>
                        </form>
                    </Dialog.Content>
            </Dialog.Root>
            {:else}
                <h4 class="scroll-m-20 text-xl font-semibold tracking-tight mt-7">Email</h4>
                <p class="leading-6 text-sm mt-3">Your email is required to confirm your subscription. Once you set your email, you cannot change it.</p>
                <Input type="text" value={data.user.subscriptionEmail} class="mt-3 w-fit" disabled />
            {/if}
            <h4 class="scroll-m-20 text-xl font-semibold tracking-tight mt-7">Username</h4>
            <p class="leading-6 text-sm mt-3">Don't like your username? Just pick a new one!</p>
            <Input type="text" value={data.user.username} class="mt-3 w-fit" disabled />
            <Dialog.Root>
                <Dialog.Trigger class="{buttonVariants({ variant: "outline" })} w-fit mt-5">Change Username</Dialog.Trigger>
                <Dialog.Content class="sm:max-w-[425px]">
                    <Dialog.Header>
                        <Dialog.Title>Change Username</Dialog.Title>
                        <Dialog.Description>Make changes to your username here. Click Update Username when you're done.</Dialog.Description>
                    </Dialog.Header>
                        <form action="?/updateUsername" method="POST" class="grid gap-4 py-4" use:enhance={() => {
                            return async ({ update }) => {
                              update({ reset: false });
                            };
                          }}>
                            <div class="space-y-1">
                                <Label for="username" class="text-right">New Username</Label>
                                <Input id="username" name="username" type="text" class="col-span-3" required />
                            </div>
                            <div class="w-full flex justify-end -mb-5 mt-5">
                                <Button type="submit" class="w-fit">Update Username</Button>
                            </div>
                        </form>
                    </Dialog.Content>
            </Dialog.Root>
        </div>
    </div>
{/if}