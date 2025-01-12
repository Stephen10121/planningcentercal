<script lang="ts">
    import Floaters from "$lib/components/mine/Floaters.svelte";
    import { Button } from "$lib/components/ui/button";
</script>

<svelte:head>
    <title>Planning Center Calendar</title>
</svelte:head>

<main class="min-w-screen min-h-screen relative isolate">
    <Floaters />
    <section class="w-screen h-screen flex justify-center items-center flex-col bg-gradient-to-t from-secondary dark:to-black to-white">
        <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-10">Just the better way to see your Events!</h1>
        <p class="leading-7 [&:not(:first-child)]:mt-6">You can view all your events, sort by approval, customise the look of your calendar and so much more.</p>
        <form method="POST" class="mt-5">
            <Button type="submit" class="bg-blue-600 hover:bg-blue-700">Sign up using Planning Center</Button>
        </form>
    </section>
</main>

<style>
    :global(html) {
        background-color: #FCF7F4;
    }

    main {
        width: 100%;
        height: 100%;
        background-color: #FCF7F4;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 10px;
    }

    form {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 10px;
    }
</style>