<script lang="ts">
    export let form;
</script>

<svelte:head>
    <title>Login</title>
</svelte:head>

<main>
    {#if form && form.error}
        <p>{form.error}</p>
    {/if}
    <form method="POST">
        <label class=" svelte-flns1k">
            <div class="border svelte-flns1k">
                <input required name="password" type="password" placeholder="Password" autocomplete="off" />
            </div>
        </label>
        <button>Login</button>
    </form>
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

    p {
        font-family: "Zona Pro";
        font-weight: bold;
        color: #ff0000;
        font-size: 1rem;
    }

    form {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 10px;
    }

    label {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        position: relative;
        background-color: rgb(255, 255, 255);
        gap: 5px;
        width: 300px;
    }

    label div {
        margin: 0;
        box-sizing: border-box;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(219, 219, 219);
        border-image: initial;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: text;
        transition: border 0.15s linear;
    }

    label div input {
        margin: 0;
        box-sizing: border-box;
        width: 100%;
        aspect-ratio: 20 / 1;
        font-family: Poppins, sans-serif;
        font-size: 1rem;
        font-weight: 700;
        caret-color: #A53335;
        padding: 0px;
        border-width: initial;
        border-style: none;
        border-color: initial;
        border-image: initial;
        outline: none;
    }

    label div:has(input:focus) {
        border-color: #A53335;
    }

    button {
        width: 300px;
        height: 35px;
        border-radius: 5px;
        border: none;
        background-color: #A53335;
        color: white;
    }
</style>