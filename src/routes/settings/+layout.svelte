<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import Cog from "lucide-svelte/icons/settings";
    import Person from "lucide-svelte/icons/circle-user-round";
    import ArrowBack from "lucide-svelte/icons/corner-up-left";
    import Shield from "lucide-svelte/icons/shield-check";
    import Pricing from "lucide-svelte/icons/badge-dollar-sign";
    import { page } from "$app/stores";

    export let data;
</script>

<main class="mt-20 w-full grid p-3 pt-5 px-32">
    <aside class="w-full h-full border-2 rounded-sm">
        <div class="group flex flex-col gap-4 py-2">
            <nav class="grid gap-1 px-2">
                <Button href="/dashboard" variant="ghost" size="sm" class="justify-start">
                    <ArrowBack class="mr-2 size-4" aria-hidden="true" />
                    Back to Dashboard
                </Button>
                <Button href="/settings/profile" variant={$page.url.pathname === "/settings/profile" ? "secondary" : "ghost"} size="sm" class="justify-start">
                    <Person class="mr-2 size-4" aria-hidden="true" />
                    Profile
                </Button>
                {#if data.hasAccess}
                    <Button href={data.stripeBilling} target="_blank" variant="ghost" size="sm" class="justify-start">
                        <Pricing class="mr-2 size-4" aria-hidden="true" />
                        Billing Portal
                    </Button>
                {:else}
                    <Button href="/settings/pricing" variant={$page.url.pathname === "/settings/pricing" ? "secondary" : "ghost"} size="sm" class="justify-start">
                        <Pricing class="mr-2 size-4" aria-hidden="true" />
                        Pricing
                    </Button>
                {/if}
                <Button href="/settings/account" variant={$page.url.pathname === "/settings/account" ? "secondary" : "ghost"} size="sm" class="justify-start">
                    <Cog class="mr-2 size-4" aria-hidden="true" />
                    Account
                </Button>
                <Button href="/settings/security" variant={$page.url.pathname === "/settings/security" ? "secondary" : "ghost"} size="sm" class="justify-start">
                    <Shield class="mr-2 size-4" aria-hidden="true" />
                    Security
                </Button>
            </nav>
        </div>
    </aside>
    <section class="w-full h-full border-2 rounded-sm">
        <slot />
    </section>
</main>

<style>
    main {
        height: calc(100vh - 80px);
        height: calc(100dvh - 80px);
        grid-template-columns: 300px auto;
        column-gap: 1rem;
    }

    :global(body) {
        overflow-y: hidden;
    }
</style>