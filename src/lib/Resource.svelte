<script lang="ts">
    import type { ResourseType } from "$lib";

    export let resource: ResourseType;
</script>

<p><span>{resource.kind}:</span> {#if resource.path_name}{resource.path_name}\\{/if}{resource.name}</p>

<style>
    p {
        font-family: "Zona Pro";
        color: var(--resourceTextColor, #ffffff);
        font-size: var(--resourceFontSize, 1rem);
        font-weight: 600;
        display: inline;
        margin-left: 5px;
    }

    span {
        /* color: #bdbdbd; */
        opacity: 0.7;
        font-size: 0.95em;
    }
</style>
