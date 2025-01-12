<script lang="ts">
    import Lock from "lucide-svelte/icons/lock";
    import Key from "lucide-svelte/icons/key-round";
    import Shield from "lucide-svelte/icons/shield-check";
    import Globe from "lucide-svelte/icons/globe-lock";
    import { onMount } from "svelte";

    export let icon: "lock" | "key" | "shield" | "globe";
    export let iconOpacity = Math.max(0.2, Math.random() * 0.6);

    let x = -32;
    let y = -32;
    let randomVel = Math.max(10, Math.floor(Math.random() * 30))
    let velXDir = Math.floor(Math.random() * 2);
    let velYDir = Math.floor(Math.random() * 2);

    function moveX() {
        if (velXDir === 1) {
            if (x==document.body.clientWidth - 32) {
                velXDir = 0;
                x-=1;
                return;
            }
            x += 1;
            return
        }
        if (x === 0) {
            velXDir = 1;
            x+=1;
            return;
        }
        x-=1;
    }

    function moveY() {
        if (velYDir === 1) {
            if (y==document.body.clientHeight - 32) {
                velYDir = 0;
                y-=1;
            } else {
                y += 1;
            }
        } else {
            if (y === 85) {
                velYDir = 1;
                y+=1;
            } else {
                y-=1
            }
        }
    }

    onMount(() => {
        x = Math.max(32, Math.floor(Math.random() * document.body.clientWidth));
        y = Math.max(117, Math.floor(Math.random() * document.body.clientHeight));
        let moveXInterval = setInterval(() => {moveX();moveY()}, randomVel);

        return () => {
            clearInterval(moveXInterval);
        }
    });
</script>

{#if icon === "lock"}
    <Lock style="transform: translate({x}px, {y}px); transition:translate {randomVel}ms linear;" class="absolute h-[2rem] w-[2rem] rotate-0 scale-100 dark:-rotate-90 dark:scale-0 top-0 left-0" opacity={iconOpacity} />  
{:else if icon === "key"}
    <Key style="transform: translate({x}px, {y}px); transition:translate {randomVel}ms linear;" class="absolute h-[2rem] w-[2rem] rotate-0 scale-100 dark:-rotate-90 dark:scale-0 top-0 left-0" opacity={iconOpacity} />
{:else if icon === "shield"}
    <Shield style="transform: translate({x}px, {y}px); transition:translate {randomVel}ms linear;" class="absolute h-[2rem] w-[2rem] rotate-0 scale-100 dark:-rotate-90 dark:scale-0 top-0 left-0" opacity={iconOpacity} />
{:else}
    <Globe style="transform: translate({x}px, {y}px); transition:translate {randomVel}ms linear;" class="absolute h-[2rem] w-[2rem] rotate-0 scale-100 dark:-rotate-90 dark:scale-0 top-0 left-0" opacity={iconOpacity} />
{/if}