<script lang="ts">
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { enhance } from "$app/forms";
    import { toast } from "svelte-sonner";

    let settingPasswordNotification: string | number | undefined = undefined;
    let openDialog = false;

    function enhancedForm() {
        if (!settingPasswordNotification) settingPasswordNotification = toast.loading("Setting password...");
        //@ts-ignore
        return async ({ update }) => {
            if (settingPasswordNotification) {
                toast.dismiss(settingPasswordNotification);
            }
            update({ reset: true });
            openDialog = false;
        };
    }
</script>

<Dialog.Root bind:open={openDialog}>
    <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>Set Password</Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
        <Dialog.Title>Set Password</Dialog.Title>
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
                <Label for="newPassword">New Password</Label>
                <Input required type="password" autocomplete="off" name="newPassword" id='newPassword' placeholder="New Password" />
            </div>
        </div>
    </form>
    <Dialog.Footer>
        <Button type="submit" form="updatePassword">Update Password</Button>
    </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>