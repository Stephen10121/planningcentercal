<script lang="ts">
    import type { ResourseType } from "$lib";

    export let resource: ResourseType;
</script>

<p><span>{resource.kind}:</span> {#if resource.path_name}{resource.path_name}/{/if}{resource.name}</p>

<style>
    p {
        font-family: "Zona Pro";
        color: #222222;
        font-size: 0.7rem;
        font-weight: 600;
        display: inline;
    }

    span {
        color: #696969;
    }
</style>