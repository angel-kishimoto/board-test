<script>
    export let style = "";
    let classProp = "";
    export { classProp as class };
</script>

<span
    class="flex items-center justify-center h-20 w-full m-1 bg-yellow-200 {classProp}"
    {style}
    disabled
>
    <slot />
</span>
