<script lang="ts">
    import FloaterItem from "./FloaterItem.svelte";

</script>

<section class="absolute top-0 left-0 w-full h-full sect">
    <FloaterItem icon="globe" />
    <FloaterItem icon="globe" />
    <FloaterItem icon="lock" />
    <FloaterItem icon="lock" />
    <FloaterItem icon="key" />
    <FloaterItem icon="key" />
    <FloaterItem icon="shield" />
    <FloaterItem icon="shield" />
</section>

<style>
    .sect {
        overflow: hidden;
        user-select: none;
        -moz-user-select: none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -o-user-select: none;
        pointer-events: none;
    }
</style>