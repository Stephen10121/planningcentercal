<script lang="ts">
    import "../app.css";
    import { ModeWatcher } from "mode-watcher";
    import Sun from "lucide-svelte/icons/sun";
    import Moon from "lucide-svelte/icons/moon";
   
    import { resetMode, setMode } from "mode-watcher";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Badge } from "$lib/components/ui/badge";
    
    import { Toaster } from "$lib/components/ui/sonner";
    import * as Avatar from "$lib/components/ui/avatar/index.js";
    import { page } from "$app/stores";

    export let data;

    let cl = "show";

    let prevScrollPos = 0;
    function scrolling(event: any) {
        let currentScrollPos = event.target.scrollingElement.scrollTop;
        if(currentScrollPos > 250) {
            if (currentScrollPos < prevScrollPos) {
                cl = "show";
            } else {
                cl = "hide";
            }
        } else {
            cl = "show";
        }
        prevScrollPos = currentScrollPos;
    }

    let logoutForm: HTMLFormElement;
</script>

<svelte:window on:scroll={scrolling} />

{#if ($page.url ? $page.url.pathname.length > 9 ? $page.url.pathname.substring(0, 9) !== "/calendar" : true : true)}
<header class="{cl} border-b flex justify-between items-center w-screen px-32 py-5 fixed top-0 left-0 z-20 bg-white dark:bg-background">
    <section class="flex item gap-2 items-center">
        {#if !data.user}
            <a href="/">
                <h2 class="scroll-m-20 pb-2 text-3xl font-bold tracking-tight transition-colors first:mt-0">
                    EventLooker
                </h2>
            </a>
        {:else}
            <a href="/dashboard">
                <h2 class="scroll-m-20 pb-2 text-3xl font-bold tracking-tight transition-colors first:mt-0">
                    EventLooker
                </h2>
            </a>
        {/if}
        <Badge class="h-5" variant="default">V1</Badge>
    </section>
    <section class="flex items-center gap-3">
        {#if !data.user}
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild let:builder>
                    <Button builders={[builder]} variant="outline" size="icon">
                        <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span class="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content align="end">
                    <DropdownMenu.Item on:click={() => setMode("light")}>Light</DropdownMenu.Item>
                    <DropdownMenu.Item on:click={() => setMode("dark")}>Dark</DropdownMenu.Item>
                    <DropdownMenu.Item on:click={() => resetMode()}>System</DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
            <!-- <form method="POST">
                <Button type="submit" class="bg-blue-600 hover:bg-blue-700">Sign up with Planning Center</Button>
            </form> -->
        {:else}
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild let:builder>
                    <Button builders={[builder]} variant="ghost" class="w-11 h-11 rounded-full">
                        <Avatar.Root class="h-9 w-9">
                            <Avatar.Image src={data.avatar} alt="Avatar" />
                            <Avatar.Fallback>{data.user.name[0]}</Avatar.Fallback>
                        </Avatar.Root>
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content class="w-56">
                    <DropdownMenu.Label>My Account</DropdownMenu.Label>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Group>
                        <a href="/">
                            <DropdownMenu.Item>Home Page</DropdownMenu.Item>
                        </a>
                        <a href="/dashboard">
                            <DropdownMenu.Item>Dashboard</DropdownMenu.Item>
                        </a>
                        <a href="/mycalendars">
                            <DropdownMenu.Item>My Calendars</DropdownMenu.Item>
                        </a>
                        <DropdownMenu.Separator />
                        <a href="/settings/profile">
                            <DropdownMenu.Item>Profile</DropdownMenu.Item>
                        </a>
                        {#if data.hasAccess}
                            <a href={data.stripeBilling} target="_blank">
                                <DropdownMenu.Item>Billing Portal</DropdownMenu.Item>
                            </a>
                        {:else}
                            <a href="/settings/pricing">
                                <DropdownMenu.Item>Pricing</DropdownMenu.Item>
                            </a>
                        {/if}
                        <a href="/settings/account">
                            <DropdownMenu.Item>Account</DropdownMenu.Item>
                        </a>
                        <a href="/settings/security">
                            <DropdownMenu.Item>Security</DropdownMenu.Item>
                        </a>
                    </DropdownMenu.Group>
                    <DropdownMenu.Separator />
                    <a href="https://github.com/Stephen10121" target="_blank">
                        <DropdownMenu.Item>GitHub</DropdownMenu.Item>
                    </a>
                    <a href="https://buymeacoffee.com/stephen10121" target="_blank">
                        <DropdownMenu.Item>Support</DropdownMenu.Item>
                    </a>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger>Theme</DropdownMenu.SubTrigger>
                        <DropdownMenu.SubContent>
                            <DropdownMenu.Item on:click={() => setMode("light")}>Light</DropdownMenu.Item>
                            <DropdownMenu.Item on:click={() => setMode("dark")}>Dark</DropdownMenu.Item>
                            <DropdownMenu.Item on:click={() => resetMode()}>System</DropdownMenu.Item>
                        </DropdownMenu.SubContent>
                      </DropdownMenu.Sub>
                    <DropdownMenu.Separator />
                    <form action="/logout" method="POST" bind:this={logoutForm}>
                        <DropdownMenu.Item on:click={() => {logoutForm.submit()}}>Log out</DropdownMenu.Item>
                    </form>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        {/if}
    </section>
</header>
{/if}

<ModeWatcher />
<Toaster />

<slot></slot>

<style>
    header.hide {
        transform: translate(0, -100%);
        transition: transform 0.1s linear 0.5s;
    }

    header.show {
        transform: translate(0, 0);
        transition: transform 0.1s linear 0.2s;
    }
</style>