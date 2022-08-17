<script lang="ts">
    import { onMount } from "svelte";
    import { getMovement, getNodePos } from "./util";

    export let style = "";
    let classProp = "";
    export { classProp as class };
    export let left = null;
    export let top = null;
    export let width;
    export let height;

    let node: HTMLElement;
    export let isOpen = false;
    export let disableFlip = false;

    // handler for flip on dbclick
    const flip = () => {
        if (disableFlip) return;
        isOpen = !isOpen;
    };

    // helper for update position
    const updatePos = (node: HTMLElement) => {
        ({ left, top } = getNodePos(node));
    };

    const movePos = (node: HTMLElement, dx: number, dy: number) => {
        updatePos(node);
        [left, top] = [left + dx, top + dy];
    };

    const makeDragAction = () => {
        let moving = false;
        const drag = (node: HTMLElement) => {
            node.addEventListener("mousedown", (event) => {
                moving = true;
            });
            window.addEventListener("mouseup", (event) => {
                moving = false;
            });
            window.addEventListener("mousemove", (event) => {
                if (!moving) return;
                let { x, y } = getMovement(event);
                movePos(node, x, y);
            });
        };

        return drag;
    };
    let drag = makeDragAction();

    onMount(() => {
        updatePos(node);
    });
</script>

<div
    bind:this={node}
    use:drag
    on:dblclick={flip}
    class="card border-solid m-0 p-0 absolute select-none {classProp} {isOpen
        ? 'bg-gray-100'
        : 'bg-green-200'}
        active:border-solid active:border-red-400 active:border-2
        "
    style="left: {left}px; top:{top}px; width: {width}px; height: {height}px; {style}"
>
    {#if disableFlip}
        <slot />
    {:else if isOpen}
        <slot name="face">
            <p>this is face</p>
            <p>{left}, {top}</p>
        </slot>
    {:else}
        <slot name="back">
            <p>this is back</p>
            <p>{left}, {top}</p>
        </slot>
    {/if}
</div>

<style>
    .card {
        z-index: 0;
    }
    .card:hover {
        z-index: 1;
    }
    .card:active {
        z-index: 1;
    }
</style>
