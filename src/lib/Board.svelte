<script>
    export let style = "";
    let classProp = "";
    export { classProp as class };
</script>

<div class="board {classProp}" {style}>
    <slot />
</div>

<style>
    .board {
        position: relative;
        width: 1000px;
        height: 800px;
        border: 1px;
        border-style: solid;
    }
</style>
