<script lang="ts">
	import Activity from "lucide-svelte/icons/activity";
	import Download from "lucide-svelte/icons/download";
	import Users from "lucide-svelte/icons/users";
	import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card/index.js";
	import * as Tabs from "$lib/components/ui/tabs/index.js";

	export let data;

    let totalLogins = 0;
    let calendarAmount = 0;

    if (data.calendars) {
        calendarAmount = data.calendars.length;
        for (let i=0;i<data.calendars.length;i++) {
            totalLogins += data.calendars[i].logins;
        }
    }
</script>

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
                                <p class="text-xs text-muted-foreground">Customised Calendars.</p>
                            </Card.Content>
                        </Card.Root>
                    </div>
                </Tabs.Content>
            </Tabs.Root>
        </div>
    </div>
{/if}