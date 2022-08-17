<script lang="ts">
  import Board from "./lib/Board.svelte";
  import Deck from "./lib/Deck.svelte";
  import InformationBoard from "./lib/InformationBoard.svelte";
  import type { PlanetCardData } from "./lib/loadCards";
  import { loadData } from "./lib/loadCards";
  import PlanetCard from "./lib/PlanetCard.svelte";
  import type { PlayerType } from "./lib/types";
  import { calcLatticePosition, shuffle } from "./lib/util";

  let players: PlayerType[] = [];

  // maybe seperate in some other file?
  const [cardWidth, cardHeight] = [150, 100];
  const [boardWidth, boardHeight] = [1000, 800];

  type Position = { left: number; top: number };

  type PlanetCardObject = PlanetCardData & Position;
  let cards: PlanetCardObject[] = [];
  let allCards: PlanetCardObject[] = [];
  let deck: Position & { cards: PlanetCardObject[] } = {
    left: 10,
    top: 10,
    cards: [],
  };

  loadData().then((data) => {
    let { planetCards, ...rest } = data;

    let shuffled = shuffle(planetCards);
    const [cols, rows] = [6, 6];

    calcLatticePosition(
      boardWidth,
      boardHeight,
      cardWidth,
      cardHeight,
      cols,
      rows
    ).forEach(([left, top]) => {
      cards.push({ ...shuffled.pop(), left: left, top: top });
    });

    cards = cards;
    allCards = shuffled;
    deck.cards = allCards;
  });
  // disable right click
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  // for button

  // these are just for calculating player initial
  {
    players = ["baaka", "test 1", "test 2", "test 3", "test 4", "fight"].map(
      (name) => ({
        name: name,
        selected: false,
      })
    );
  }
</script>

<main>
  <div class="flex flex-row" style="border: solid;">
    <InformationBoard {players} />

    <Board width={boardWidth} height={boardHeight}>
      {#each cards as card}
        <PlanetCard {card} bind:left={card.left} bind:top={card.top} />
      {/each}

      {#if deck.cards.length != 0}
        <Deck bind:deck bind:cardsOnBoard={cards} />
      {/if}
    </Board>
  </div>
</main>

<style>
</style>
