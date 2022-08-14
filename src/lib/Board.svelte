<script>
    export let style = "";
    let classProp = "";
    export let width;
    export let height;
    export { classProp as class };
</script>

<div
    class="board {classProp} border-solid relative"
    style="border: 1px; width: {width}px; height: {height}px; {style}"
>
    <slot />
</div>
