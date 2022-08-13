<script lang="ts">
  import Board from "./lib/Board.svelte";
  import DraggableCard from "./lib/DraggableCard.svelte";
  import Initiative from "./lib/Initiative.svelte";
  import InitiativeCard from "./lib/InitiativeCard.svelte";
  import { playDiceSound } from "./lib/Sound";
  import Switch from "./lib/Switch.svelte";
  import TailwindCss from "./lib/TailwindCSS.svelte";
  import type { Card, Player } from "./lib/types";
  import { range, shuffle } from "./lib/util";

  let players: Player[] = [];
  let cards: Card[] = [];

  // maybe seperate in some other file?
  const [cardWidth, cardHeight] = [100, 60];
  const [boardWidth, boardHeight] = [1000, 800];

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

  // these are just for calculating card initial position
  {
    const [cols, rows] = [6, 6];
    const [dX, dY] = [boardWidth / cols, boardHeight / rows];
    const [offsetX, offsetY] = [(dX - cardWidth) / 2, (dY - cardHeight) / 2];

    cards = range(cols)
      .map((col) => range(rows).map((row) => [col, row]))
      .flat()
      .map(([col, row]) => ({
        left: Math.round(col * dX + offsetX),
        top: Math.round(row * dY + offsetY),
      }));
  }

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

<TailwindCss />

<main>
  <div class="flex flex-row" style="border: solid;">
    <div
      class="flex flex-col"
      style="height: fill; width: fill; padding: 0px; margin: 0px;"
    >
      <button class="m-0 p-0 bg-gray-300" on:click={shufflePlayer}
        >shuffle</button
      >
      <!--
      <Initiative style="width: fill; padding: 0px; margin: 0px; flex: 1;">
      -->
      <Initiative class="flex-auto" style="margin: 0px; padding: 0px;">
        {#each players as player}
          <div class="flex flex-row mt-1 mb-1">
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
        <DraggableCard
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
</style>
