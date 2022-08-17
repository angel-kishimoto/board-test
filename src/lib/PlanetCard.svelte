<script lang="ts">
    import Card from "./Card.svelte";
    import type { PlanetCardData } from "./loadCards";

    export let card: PlanetCardData;
    export let left: number;
    export let top: number;
    const [cardWidth, cardHeight] = [150, 100];
</script>

<Card
    bind:left
    bind:top
    class="hover:scale-150"
    width={cardWidth}
    height={cardHeight}
    isOpen={true}
>
    <div
        class="flex flex-col w-full h-full align-middle justify-center"
        slot="face"
    >
        {#if card.description}
            <strong class="flex-nowrap text-[8px] p-0">{card.name}</strong>
            {#if card.condition}
                <div class="text-[5px] m-0 p-0 pl-1 pr-1">{card.condition}</div>
            {/if}
            <div
                class="text-[5px] whitespace-pre-wrap text-left p-1 leading-tight"
            >
                {card.description}
            </div>
        {:else}
            <strong class="text-2xl">{card.name}</strong>
        {/if}
    </div>

    <div
        slot="back"
        class="flex justify-center flex-col align-middle h-full w-full bg-green-500"
    >
        <strong class="text-xl">惑星カード</strong>
    </div>
</Card>
