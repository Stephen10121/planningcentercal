<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import * as Avatar from "$lib/components/ui/avatar/index.js";
    import { enhance } from "$app/forms";
    import { toast } from "svelte-sonner";
    import { goto } from "$app/navigation";

    export let data;
    export let form;

    let updatingToast: undefined | string | number = "";

    function dismissToast() {
        if (updatingToast) {
            toast.dismiss(updatingToast);
            updatingToast = undefined;
        }
    }

    $: {
        if (!form?.success && form?.message) {
            toast.error(form.message);
            dismissToast();
        }
        if (form?.success) {
            dismissToast();
            goto(`/calendar/${data.id}`);
        }
    }

</script>

<svelte:head>
    <title>Login | {data.name}</title>
</svelte:head>

<main class="w-full h-full flex items-center justify-center">
    <Card.Root class="w-[350px]">
        <Card.Header>
            <Card.Title>{data.name}</Card.Title>
            <Card.Description>This calendar is restricted.</Card.Description>
        </Card.Header>
        <Card.Content>
            <form method="POST" use:enhance={() => {
                updatingToast = toast.loading("Logging In...");
                return async ({ update }) => {
                    if (updatingToast) {
                        dismissToast();
                    }
                    update({ reset: true });
                };
              }}>
                <div class="grid w-full items-center gap-4">
                    <div class="w-full flex justify-center">
                        <Avatar.Root class="h-60 w-60 border-black border-2">
                            <Avatar.Image src={data.logo} alt="Avatar" />
                            <Avatar.Fallback>{data.name[0]}</Avatar.Fallback>
                        </Avatar.Root>
                    </div>
                    <div class="flex flex-col space-y-1.5">
                        <Label for="password">Password</Label>
                        <Input id="password" type="password" name="password" placeholder="Password" />
                    </div>
                    <div class="flex justify-between">
                        <Button href="/" variant="outline">Cancel</Button>
                        <Button type="submit">Login</Button>
                    </div>
                </div>
            </form>
        </Card.Content>
    </Card.Root>
</main>