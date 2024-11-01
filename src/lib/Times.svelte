<script lang="ts">
    import Times from "./Times.svelte";

    export let time;

    const start_time = new Date(time.attributes.starts_at);
    const end_time = new Date(time.attributes.ends_at);
</script>

<li>
    <p>Name: {time.attributes.name}</p>
    <ul>
        <li>Starts At: {start_time}</li>
        <li>Ends At: {end_time}</li>
    </ul>
</li>