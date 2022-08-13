<script>
    export let style = "";
    let classProp = "";
    export { classProp as class };
</script>

<div class="initiative {classProp}" {style}>
    <slot />
</div>

<style>
    .initiative {
        width: 200px;
        border: "solid";
        background-color: aqua;
        margin: 10px;
        display: flex;
        flex-direction: column;
        align-items: stretch center;
    }
</style>
