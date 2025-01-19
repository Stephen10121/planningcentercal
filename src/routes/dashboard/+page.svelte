<script lang="ts">
	import Activity from "lucide-svelte/icons/activity";
	import Users from "lucide-svelte/icons/users";
	import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card/index.js";
	import * as Tabs from "$lib/components/ui/tabs/index.js";
    import * as Avatar from "$lib/components/ui/avatar/index.js";
    import type { RecordModel } from "pocketbase";

	export let data;

    let totalLogins = 0;
    let calendarAmount = 0;

    if (data.calendars) {
        calendarAmount = data.calendars.length;
        for (let i=0;i<data.calendars.length;i++) {
            totalLogins += data.calendars[i].logins;
        }
    }

    let calendars: RecordModel[] | undefined = data.calendars;
    if (calendars) {
        calendars.sort((a, b) => {
            return b.logins - a.logins
        });
    }
</script>

<svelte:head>
    <title>Dashboard | EventLooker</title>
</svelte:head>

{#if data.user}
    <div class="hidden flex-col md:flex px-24 mt-20">
        <div class="flex-1 space-y-4 p-8 pt-6">
            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-3xl font-bold tracking-tight">Hello {data.user.name}</h2>
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
                                <Card.Title class="text-sm font-medium">Total Calendar Logins</Card.Title>
                                <Users class="h-4 w-4 text-muted-foreground" />
                            </Card.Header>
                            <Card.Content>
                                <div class="text-2xl font-bold">{totalLogins}</div>
                                <p class="text-xs text-muted-foreground">Logins with your Calendars.</p>
                            </Card.Content>
                        </Card.Root>
                        <Card.Root>
                            <Card.Header
                                class="flex flex-row items-center justify-between space-y-0 pb-2"
                            >
                                <Card.Title class="text-sm font-medium">Custom Calendars</Card.Title>
                                <Activity class="h-4 w-4 text-muted-foreground" />
                            </Card.Header>
                            <Card.Content>
                                <div class="text-2xl font-bold">{calendarAmount}</div>
                                <p class="text-xs text-muted-foreground">Customized Calendars.</p>
                            </Card.Content>
                        </Card.Root>
                    </div>
                    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card.Root class="col-span-4">
                            <Card.Header>
                                <Card.Title>Most popular</Card.Title>
                                <Card.Description>The top 3 most popular calendars that you've created.</Card.Description>
                            </Card.Header>
                            <Card.Content>
                                <div class="space-y-8">
                                    {#if calendars}
                                        {#each calendars.slice(0, 3) as calendar (calendar.id)}
                                            <div class="flex items-center">
                                                <Avatar.Root class="h-11 w-11 border-gray border-2">
                                                    <Avatar.Image src={calendar.logoLink} alt="Avatar" />
                                                    <Avatar.Fallback>{calendar.name[0]}</Avatar.Fallback>
                                                </Avatar.Root>
                                                <div class="ml-4 space-y-1">
                                                    <p class="text-sm font-medium leading-none">{calendar.name}</p>
                                                    <p class="text-muted-foreground text-sm">{calendar.logins} login{calendar.logins !== 1 ? "s" : ""}.</p>
                                                </div>
                                                <Button variant="secondary" class="ml-auto text-xs p-2 h-7" size="sm" href="/mycalendars/{calendar.id}">
                                                    More Info
                                                </Button>
                                            </div>
                                        {/each}
                                    {:else}
                                        <p class="flex items-center justify-center">No Calendars yet.</p>
                                    {/if}
                                </div>
                            </Card.Content>
                        </Card.Root>
                        <div class="col-span-1"></div>
                    </div>
                </Tabs.Content>
            </Tabs.Root>
        </div>
    </div>
{/if}