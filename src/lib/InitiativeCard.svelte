<script>
    export let style = "";
    let classProp = "";
    export { classProp as class };
</script>

<span class="initiativeCard {classProp}" {style} disabled>
    <slot />
</span>

<style>
    .initiativeCard {
        width: fill;
        height: 80px;
        background-color: darkgoldenrod;
        margin: 3px;

        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
