<script>
    export let style = "";
    let classProp = "";
    export { classProp as class };
</script>

<div class="{classProp} border-solid bg-cyan-300 items-stretch" {style}>
    <slot />
</div>
