<script lang="ts">
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import Check from "lucide-svelte/icons/check";
    import { plans } from '$lib/utils';
    import { toast } from "svelte-sonner";
    import { goto } from "$app/navigation";

    export let data;
</script>

<svelte:head>
    <title>Pricing</title>
</svelte:head>

{#if data.user}
    <main class="w-full h-full flex justify-center items-center">
        <Tabs.Root value="monthly" class="w-[400px]">
            <Tabs.List class="grid w-full grid-cols-2">
                <Tabs.Trigger value="monthly">Monthly</Tabs.Trigger>
                <Tabs.Trigger value="yearly">Yearly</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="monthly">
                <Card.Root>
                    <Card.Header>
                        <Card.Description>
                            <span class="text-black font-bold text-2xl">${plans[0].price}</span>{plans[0].duration}
                        </Card.Description>
                    </Card.Header>
                    <Card.Content class="space-y-2">
                        <ul class="flex flex-col gap-2">
                            <li class="flex items-center">
                                <Check class="mr-2 size-4" aria-hidden="true" />
                                <p class="text-sm">View all events and reservations for the next 2 days.</p>
                            </li>
                            <li class="flex items-center">
                                <Check class="mr-2 size-4" aria-hidden="true" />
                                <p class="text-sm">Filter events based on approval status.</p>
                            </li>
                            <li class="flex items-center">
                                <Check class="mr-2 size-4" aria-hidden="true" />
                                <p class="text-sm">Create public and custom calendar views.</p>
                            </li>
                            <li class="flex items-center">
                                <Check class="mr-2 size-4" aria-hidden="true" />
                                <p class="text-sm">Create private, password protected calendar views.</p>
                            </li>
                        </ul>
                    </Card.Content>
                    <Card.Footer>
                        <Button href="{plans[0].link}?prefilled_email={data.user.subscriptionEmail}" target="_blank" on:click={(e) => {
                            if (!data.user?.subscriptionEmail) {
                                e.preventDefault();
                                toast.error("Error", { description: "You must set an email first." });
                                goto("/settings/account");
                            }
                        }}>Select This Plan</Button>
                    </Card.Footer>
                </Card.Root>
            </Tabs.Content>
            <Tabs.Content value="yearly">
                <Card.Root>
                    <Card.Header>
                        <Card.Description>
                            <span class="text-black font-bold text-2xl">${plans[1].price}</span>{plans[1].duration}
                        </Card.Description>
                    </Card.Header>
                    <Card.Content class="space-y-2">
                        <ul class="flex flex-col gap-2">
                            <li class="flex items-center">
                                <Check class="mr-2 size-4" aria-hidden="true" />
                                <p class="text-sm">View all events and reservations for the next 2 days.</p>
                            </li>
                            <li class="flex items-center">
                                <Check class="mr-2 size-4" aria-hidden="true" />
                                <p class="text-sm">Filter events based on approval status.</p>
                            </li>
                            <li class="flex items-center">
                                <Check class="mr-2 size-4" aria-hidden="true" />
                                <p class="text-sm">Create public and custom calendar views.</p>
                            </li>
                            <li class="flex items-center">
                                <Check class="mr-2 size-4" aria-hidden="true" />
                                <p class="text-sm">Create private, password protected calendar views.</p>
                            </li>
                        </ul>
                    </Card.Content>
                    <Card.Footer>
                        <Button href="{plans[1].link}?prefilled_email={data.user.subscriptionEmail}" target="_blank" on:click={(e) => {
                            if (!data.user?.subscriptionEmail) {
                                e.preventDefault();
                                toast.error("Error", { description: "You must set an email first." });
                                goto("/settings/account");
                            }
                        }}>Select This Plan</Button>
                    </Card.Footer>
                </Card.Root>
            </Tabs.Content>
        </Tabs.Root>
    </main>
{/if}