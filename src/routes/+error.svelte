<script lang="ts">
    import { page } from "$app/stores";

</script>

<main class="mt-20 w-full grid p-3 pt-5 px-32">
    <section class="w-full h-full border-2 rounded-sm flex items-center justify-center">
        <h1>{$page.status}: {$page.error?.message}</h1>
    </section>
</main>

<style>
    main {
        height: calc(100vh - 80px);
        height: calc(100dvh - 80px);
    }

    :global(body) {
        overflow-y: hidden;
    }
</style>