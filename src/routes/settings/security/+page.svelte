<script lang="ts">
    import {
        Button,
        buttonVariants
    } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";

    export let data;

    let text = "";
    $: deleteEnable = text === "DELETE ACCOUNT";
</script>

{#if data.user}
    <div class="flex flex-col w-full h-full p-10">
        <h3 class="text-2xl font-medium">Security</h3>
        <div class="w-full h-full px-5">
            <h4 class="scroll-m-20 text-xl font-semibold tracking-tight mt-7">Delete Account!</h4>
            <p class="leading-6 text-sm mt-3">Be careful!!! All your calendar customisations, webhook endpoints and account preferences will be deleted.</p>
            <Dialog.Root>
                <Dialog.Trigger class="mt-3 {buttonVariants({ variant: "destructive" })}">Delete Account</Dialog.Trigger>
                <Dialog.Content class="sm:max-w-[425px]">
                    <Dialog.Header>
                        <Dialog.Title>We're sad to see you go 😢</Dialog.Title>
                        <Dialog.Description>
                            Type "DELETE ACCOUNT" into the text field
                        </Dialog.Description>
                    </Dialog.Header>
                    <div class="grid gap-4 py-4">
                        <Input id="name" bind:value={text} class="col-span-3" autocomplete="off" />
                    </div>
                    <Dialog.Footer>
                        <form action="?/deleteAccount" method="POST">
                            <Button type="submit" disabled={!deleteEnable}>Confirm</Button>
                        </form>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
        </div>
    </div>
{/if}