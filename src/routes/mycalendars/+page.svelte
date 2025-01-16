<script lang="ts">
	import Activity from "lucide-svelte/icons/activity";
	import Download from "lucide-svelte/icons/download";
    import * as Avatar from "$lib/components/ui/avatar/index.js";
	import Users from "lucide-svelte/icons/users";
	import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card/index.js";
	import * as Tabs from "$lib/components/ui/tabs/index.js";

	export let data;

    console.log(data);
</script>

{#if data.user}
    <div class="hidden flex-col md:flex px-24 mt-20">
        <div class="flex-1 space-y-4 p-8 pt-6">
            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-3xl font-bold tracking-tight">My calendars</h2>
                <div class="flex items-center space-x-2">
                    <Button size="sm">
                        <Download class="mr-2 h-4 w-4" />
                        Download
                    </Button>
                </div>
            </div>
            <Tabs.Root value="overview" class="space-y-4">
                <Tabs.List>
                    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
                    <Tabs.Trigger value="analytics" disabled>Analytics</Tabs.Trigger>
                    <Tabs.Trigger value="reports" disabled>Reports</Tabs.Trigger>
                    <Tabs.Trigger value="notifications" disabled>Notifications</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="overview" class="space-y-4">
                    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <!-- <TotalLoginsCard logins={data.user.logins} /> -->
                        <Card.Root>
                            <Card.Header
                                class="flex flex-row items-center justify-between space-y-0 pb-2"
                            >
                                <Card.Title class="text-sm font-medium">Subscriptions</Card.Title>
                                <Users class="h-4 w-4 text-muted-foreground" />
                            </Card.Header>
                            <Card.Content>
                                <div class="text-2xl font-bold">1</div>
                                <p class="text-xs text-muted-foreground">+180.1% from last month</p>
                            </Card.Content>
                        </Card.Root>
                        <!-- <MostUsedPasskey passkeys={data.publicPasskeys} /> -->
                        <Card.Root>
                            <Card.Header
                                class="flex flex-row items-center justify-between space-y-0 pb-2"
                            >
                                <Card.Title class="text-sm font-medium">Active Now</Card.Title>
                                <Activity class="h-4 w-4 text-muted-foreground" />
                            </Card.Header>
                            <Card.Content>
                                <div class="text-2xl font-bold">+573</div>
                                <p class="text-xs text-muted-foreground">+201 since last hour</p>
                            </Card.Content>
                        </Card.Root>
                    </div>
                    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card.Root class="col-span-3">
                            <Card.Header>
                                <Card.Title>Calendar List</Card.Title>
                                <Card.Description>All the calendars that you've created.</Card.Description>
                            </Card.Header>
                            <Card.Content>
                                <div class="space-y-8">
                                    {#each data.calendars as calendar (calendar.id)}
                                        <div class="flex items-center">
                                            <Avatar.Root class="h-9 w-9">
                                                <Avatar.Image src={calendar.logoLink} alt="Avatar" />
                                                <Avatar.Fallback>{calendar.name[0]}</Avatar.Fallback>
                                            </Avatar.Root>
                                            <div class="ml-4 space-y-1">
                                                <p class="text-sm font-medium leading-none">{calendar.name}</p>
                                                <a href="/calendar/{calendar.id}" class="underline text-muted-foreground text-sm">/calendar/{calendar.id}</a>
                                            </div>
                                            <Button variant="secondary" class="ml-auto font-medium" size="sm">
                                                Edit
                                            </Button>
                                        </div>
                                    {/each}
                                </div>
                            </Card.Content>
                        </Card.Root>
                    </div>
                </Tabs.Content>
            </Tabs.Root>
        </div>
    </div>
{/if}