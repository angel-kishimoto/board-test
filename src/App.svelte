<script lang="ts">
  import Board from "./lib/Board.svelte";
  import Card from "./lib/Card.svelte";
  import Initiative from "./lib/Initiative.svelte";
  import InitiativeCard from "./lib/InitiativeCard.svelte";
  import { playDiceSound } from "./lib/Sound";
  import Switch from "./lib/Switch.svelte";
  import { range, shuffle } from "./lib/util";

  // move into app store
  type Player = {
    name: string;
    selected: boolean;
  };
  type Card = {
    left: number;
    top: number;
  };
  const newPlayer = (name: string): Player => ({
    name: name,
    selected: false,
  });

  let players: Array<Player> = [
    "test 1",
    "test 2",
    "test 3",
    "test 4",
    "fight",
  ].map(newPlayer);

  const shufflePlayer = () => {
    let selected = players.filter((p) => p.selected);
    let nonSelected = players.filter((p) => !p.selected);
    players = [...shuffle(selected), ...nonSelected];
    playDiceSound();
  };
  let cards: Array<Card> = [];

  // maybe seperate in some other file?
  const [cardWidth, cardHeight] = [100, 60];
  const [boardWidth, boardHeight] = [1000, 800];

  // disable right click
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  // these are just for calculating card initial position
  {
    const [cols, rows] = [6, 6];
    const [dX, dY] = [boardWidth / cols, boardHeight / rows];
    const [offsetX, offsetY] = [(dX - cardWidth) / 2, (dY - cardHeight) / 2];

    range(cols)
      .map((col) => range(rows).map((row) => [col, row]))
      .flat()
      .forEach(([col, row]) =>
        cards.push({
          left: Math.round(col * dX + offsetX),
          top: Math.round(row * dY + offsetY),
        })
      );
  }
</script>

<main>
  <div class="container" style="border: solid;">
    <div
      class="container"
      style="flex-direction: column; height: fill; width: fill; padding: 0px; margin: 0px;"
    >
      <button on:click={shufflePlayer}>shuffle</button>
      <Initiative style="width: fill; padding: 0px; margin: 0px; flex: 1;">
        {#each players as player}
          <div class="container" style="flex-directon: row">
            <InitiativeCard style="user-select: none; flex: 1;"
              >{player.name}</InitiativeCard
            >
            <Switch bind:checked={player.selected} />
          </div>
        {/each}
      </Initiative>
    </div>

    <Board>
      {#each cards as { left, top }}
        <Card
          bind:left
          bind:top
          width={cardWidth}
          height={cardHeight}
          style="color: red"
        />
      {/each}
    </Board>
  </div>

  <!--
  <Connection />
  -->
</main>

<style>
  .container {
    display: flex;
    flex-direction: row;
  }
  button {
    background-color: gray;
  }
</style>
