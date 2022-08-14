<script lang="ts">
  import Board from "./lib/Board.svelte";
  import Card from "./lib/Card.svelte";
  import Initiative from "./lib/Initiative.svelte";
  import InitiativeCard from "./lib/InitiativeCard.svelte";
  import { playDiceSound } from "./lib/Sound";
  import Toggle from "./lib/Toggle.svelte";
  import type { PlayerType } from "./lib/types";
  import { range, shuffle } from "./lib/util";

  let players: PlayerType[] = [];
  //let cards: CardType[] = [];

  // maybe seperate in some other file?
  const [cardWidth, cardHeight] = [300, 180];
  const [boardWidth, boardHeight] = [1000, 800];

  type PlanetCard = {
    type: string;
    name: string;
    condition: string;
    description: string;
  };
  type PlanetCardObject = PlanetCard & { left: number; top: number };
  let cards: PlanetCardObject[] = [];

  fetch("planet_cards.json").then((res) => {
    res.json().then((data: PlanetCard[]) => {
      let shuffled = shuffle(data);
      const [cols, rows] = [6, 6];
      const [dX, dY] = [boardWidth / cols, boardHeight / rows];
      const [offsetX, offsetY] = [(dX - cardWidth) / 2, (dY - cardHeight) / 2];
      let tempCards = [];

      for (let i of range(cols * rows)) {
        let planetcard = {
          ...shuffled[i],
          left: (i % 6) * dX + offsetX,
          top: Math.floor(i / 6) * dY + offsetY,
        };
        tempCards.push(planetcard);
      }
      cards = tempCards;
    });
  });

  // disable right click
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  // for button
  const shufflePlayer = () => {
    let selected = players.filter((p) => p.selected);
    let nonSelected = players.filter((p) => !p.selected);
    players = [...shuffle(selected), ...shuffle(nonSelected)];
    playDiceSound();
  };

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
    <div class="flex flex-col m-0 p-0">
      <button class="m-0 p-0 bg-gray-300" on:click={shufflePlayer}
        >shuffle</button
      >
      <!--
      <Initiative style="width: fill; padding: 0px; margin: 0px; flex: 1;">
      -->
      <Initiative class="flex flex-col flex-1 m-0 p-0 w-52">
        {#each players as player}
          <div class="flex flex-row mt-1 mb-1">
            <InitiativeCard class="select-none flex-1"
              >{player.name}</InitiativeCard
            >
            <Toggle bind:checked={player.selected} />
          </div>
        {/each}
      </Initiative>
    </div>

    <Board width={boardWidth} height={boardHeight}>
      {#each cards as card}
        <Card
          bind:left={card.left}
          bind:top={card.top}
          class="text-red-300 scale-50 hover:scale-100"
          width={cardWidth}
          height={cardHeight}
          isOpen={true}
        >
          <div class="flex flex-col w-full h-full" slot="face">
            <h1 class="flex-nowrap m-1"><strong>{card.name}</strong></h1>
            <div
              class="text-[10px] whitespace-pre-wrap text-left p-2 leading-3"
            >
              {card.description}
            </div>
          </div>

          <h1 slot="back"><strong>惑星カード</strong></h1>
        </Card>
      {/each}
    </Board>
  </div>

  <!--
  <Connection />
  -->
</main>

<style>
</style>
