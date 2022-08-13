<script lang="ts">
    import { onMount } from "svelte";
    import { getMovement, getNodePos } from "./util";

    export let style = "";
    export let left = null;
    export let top = null;
    export let width;
    export let height;

    let moving = false;
    let node: HTMLElement;
    const updatePos = (node: HTMLElement) => {
        ({ left, top } = getNodePos(node));
    };
    onMount(() => {
        updatePos(node);
    });

    const drag = (node: HTMLElement) => {
        node.addEventListener("mousedown", (event) => {
            moving = true;
        });
        window.addEventListener("mouseup", (event) => {
            moving = false;
        });
        window.addEventListener("mousemove", (event) => {
            if (!moving) return;
            updatePos(node);
            let { x, y } = getMovement(event);
            [left, top] = [left + x, top + y];
        });
    };
</script>

<div
    bind:this={node}
    use:drag
    class:draggable={true}
    class:card={true}
    style="left: {left}px; top:{top}px; width: {width}px; height: {height}px; {style}"
    {...$$restProps}
>
    <slot>
        <p>{left}, {top}</p>
    </slot>
</div>

<style>
    .draggable {
        position: absolute;
        user-select: none;
    }
    .card {
        background-color: aqua;
        border: solid;
        border-color: black;
        border-width: 1px;
        z-index: 0;
        margin: 0;
        padding: 0;
    }
    .card:hover {
        background-color: black;
        z-index: 1;
    }
    .card:active {
        background-color: bisque;
        z-index: 1;
    }
</style>
