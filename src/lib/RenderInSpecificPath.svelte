<script lang="ts">
    export let dissalowedPaths: string[] = [];
    export let pathname: string;

    function checkIfPathAllowed() {
        for (let i=0;i<dissalowedPaths.length;i++) {
            if (dissalowedPaths[i].slice(-2) === "/*") {
                if (pathname.substring(0, dissalowedPaths[i].length - 2) + "/*" === dissalowedPaths[i]) {
                    return false
                }
            } else {
                if (pathname === dissalowedPaths[i] || pathname + "/" === dissalowedPaths[i]) {
                    return false
                }
            }
        }
        return true
    }
</script>

{#if checkIfPathAllowed()}
    <slot />
{/if}