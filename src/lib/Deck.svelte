<script lang="ts">
    import Card from "./Card.svelte";
    import type { CardData } from "./loadCards";

    type Position = { left: number; top: number };

    type Deck = Position & { cards: CardData[] };
    export let deck: Deck = { left: 10, top: 10, cards: [] };
    export let cardsOnBoard;

    const draw = () => {
        let card = deck.cards.pop();
        cardsOnBoard.push({
            left: deck.left + 20,
            top: deck.top + 20,
            ...card,
        });
        cardsOnBoard = cardsOnBoard;
        deck = deck;
        console.log(deck.cards.length);
    };
</script>

<Card
    width={150}
    height={100}
    bind:left={deck.left}
    bind:top={deck.top}
    disableFlip={true}
>
    <div
        class="flex h-full w-full justify-center items-center"
        on:dblclick={draw}
    >
        <strong>
            {deck.cards.length}
        </strong>
    </div>
</Card>
