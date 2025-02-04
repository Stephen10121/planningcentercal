<script lang="ts">
    import cardIcon from "$lib/assets/cards.svg";
    import coinIcon from "$lib/assets/coin.svg";
    import walletIcon from "$lib/assets/purse.svg";
</script>

<svelte:head>
    <title>EventLooker | Home Page</title>
</svelte:head>

<header>
    <h2 class="poppins-semibold">EventLooker</h2>
    <form method="POST">
        <button type="submit" class="body18 gettingStartedButton">Get started</button>
    </form>
</header>
<main>
    <section class="first">
        <div class="left">
            <h1 class="headline40 title">View events.<br>A better way.</h1>
            <p class="body18">You can view all your events, sort by approval, customise the look of your calendar and so much more.</p>
            <form method="POST" style="margin-top: 72px;">
                <button type="submit" class="body18 gettingStartedButton">Get started</button>
            </form>
        </div>
        <div class="right">
            <img src="/example.png" alt="Example pic of the dashboard">
        </div>
    </section>
    <section class="cards">
        <div class="card">
            <img src={cardIcon} alt="Cards" />
            <h3 class="bodybold18">Customizable card</h3>
            <p class="body18">Custom your own card for your exact incomes and expenses needs.</p>
        </div>
        <div class="card">
            <img src={coinIcon} alt="Coin" />
            <h3 class="bodybold18">No payment fee</h3>
            <p class="body18">Transfer your payment all over the world with no payment fee.</p>
        </div>
        <div class="card">
            <img src={walletIcon} alt="Wallet" />
            <h3 class="bodybold18">All in one place</h3>
            <p class="body18">The right place to keep you credit and debit cards, boarding passes & more.</p>
        </div>
    </section>
    <section class="review">
        <h3 class="secondary-body-semi-b24">“Wallet is a great product! All of my most important information is there - credit cards, transit cards, boarding passes, tickets, and more. And I don't need to worry because it's all in one place! thanks!”</h3>
        <img src="/group.png" alt="User pic">
    </section>
    <section class="contact">
        <div class="left">
        <h3 class="headline40">Questions?<br> Let's talk</h3>
        <p class="body18">Contact us through our 24/7 live chat.<br>We're always happy to help!</p>
        <button class="body18 gettingStartedButton">Get started</button>
        </div>
        <div class="right">
            <img src="/contact.png" alt="">
        </div>
    </section>
</main>

<footer>
    <div class="bar"></div>
    <h3 class="poppins-semibold">EventLooker</h3>
    <div class="links">
        <a href="/" class="bodybold18">Terms of use</a>
        <a href="/" class="bodybold18">Cookies policy</a>
        <a href="/" class="bodybold18">Privacy policy</a>
        <p class="bodybold18">© EventLooker 2025</p>
    </div>
</footer>

<style>
    :global(html) {
        background-color: #2B2B2B;
    }

    :global(body) {
        overflow-y: auto !important;
        overflow-x: hidden !important;
    }

    header {
        width: 100%;
        height: 100px;
        background-color: #2B2B2B;
        display: flex;
        align-items: center;
        padding: 0 20px;
    }

    header form {
        display: none;
    }

    header h2 {
        color: #ffffff;
        font-size: 1.5rem;
        line-height: 1.5rem;
    }

    main {
        width: 100%;
        background-color: #2B2B2B;
        padding: 0 20px;
    }

    main section {
        width: 100%;
    }

    .left {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 30px;
    }

    .right {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 30px;
    }

    .right img {
        margin-top: 60px;
        width: 100%;
        border-radius: 10px;
    }

    .title {
        color: #ffffff;
        text-align: center;
        margin-top: 70px;
    }

    p {
        text-align: center;
        color: #ffffff;
        opacity: 0.4;
    }

    .gettingStartedButton {
        height: 3.125rem;
        color: #ffffff;
        background-color: #2563eb;
        border-radius: 15px;
        padding: 0 35px;
    }

    .cards {
        margin-top: 100px;
        display: flex;
        gap: 50px;
        flex-direction: column;
    }

    .card {
        width: 100%;
        padding: 0 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }

    .card img {
        width: 60px;
    }

    .card h3 {
        margin-top: 30px;
        text-align: center;
        color: #ffffff;
    }

    .card p {
        color: #ffffff;
        text-align: center;
        opacity: 0.4;
    }

    .review {
        background-color: #BFAFF2;
        width: 100%;
        border-radius: 20px;
        margin-top: 90px;
        padding: 80px 30px;
        display: flex;
        flex-direction: column;
        gap: 80px;
        align-items: center;
    }

    .review h3 {
        color: #000000;
        text-align: center;
    }

    .review img {
        width: 220px;
    }

    .contact {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
        margin-top: 90px;
    }

    .contact h3 {
        color: #ffffff;
        text-align: center;
    }

    .contact button {
        background-color: #F8D57E;
        color: #000000;
        margin-top: 10px;
    }

    .contact img {
        margin-top: 30px;
        width: 100%;
    }

    footer {
        margin-top: 50px;
        width: 100%;
        padding: 50px 20px;
        position: relative;
    }

    footer .bar {
        position: absolute;
        width: calc(100% - 40px);
        top: 0;
        left: 20px;
        background-color: #ffffff;
        opacity: 0.2;
        height: 2px;
        border-radius: 100%;
    }

    footer h3 {
        font-size: 1.5rem;
        line-height: 1.5rem;
        color: #ffffff;
    }

    footer .links {
        padding: 0 15px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-top: 20px;
    }

    .links a,
    .links p {
        color: #ffffff;
        text-align: left;
        opacity: 1;
    }

    @media screen and (min-width: 900px) {
        header {
            justify-content: space-between;
            padding: 0 50px;
        }

        header form {
            display: block;
        }

        main {
            padding: 0 100px;
        }

        .first,
        .contact {
            display: grid;
            grid-template-columns: 3fr 4fr;
        }

        .left {
            align-items: flex-start;
            justify-content: center;
            padding: 0 30px 0 0;
        }

        .left h1,
        .contact h3 {
            font-family: "Poppins", serif;
            font-weight: 600;
            font-style: normal;
            font-size: 3.75rem;
            line-height: 5.625rem;
            text-align: left;
            max-width: 600px;
        }

        .left p {
            text-align: left;
            max-width: 600px;
        }

        .right {
            margin-top: 80px;
        }

        .cards {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
        }

        .card {
            padding: 0 70px;
        }

        footer {
            margin-top: 100px;
            width: 100%;
            padding: 50px;
        }

        footer h3 {
            font-size: 1.5rem;
            line-height: 1.5rem;
            color: #ffffff;
        }

        footer .links {
            flex-direction: row;
        }
    }
</style>