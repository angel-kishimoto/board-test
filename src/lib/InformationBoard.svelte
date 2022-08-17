<script lang="ts">
  import Initiative from "./Initiative.svelte";
  import InitiativeCard from "./InitiativeCard.svelte";
  import { playDiceSound } from "./Sound";
  import Toggle from "./Toggle.svelte";
  import type { PlayerType } from "./types";
  import { shuffle } from "./util";

  export let players: PlayerType[] = [];

  const shufflePlayer = () => {
    let selected = players.filter((p) => p.selected);
    let nonSelected = players.filter((p) => !p.selected);
    players = [...shuffle(selected), ...shuffle(nonSelected)];
    playDiceSound();
  };
</script>

<div class="flex flex-col m-0 p-0">
  <button class="m-0 p-0 bg-gray-300" on:click={shufflePlayer}>shuffle</button>
  <Initiative class="flex flex-col flex-1 m-0 p-0 w-52">
    {#each players as player}
      <div class="flex flex-row mt-1 mb-1">
        <InitiativeCard class="select-none flex-1">{player.name}</InitiativeCard
        >
        <Toggle bind:checked={player.selected} />
      </div>
    {/each}
  </Initiative>
</div>
