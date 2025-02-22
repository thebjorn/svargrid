<script lang="ts">
    import "../app.css";
    import type { Snippet } from "svelte";
    import { Willow } from "wx-svelte-core";
    import PointerCanvas from "$lib/PointerCanvas.svelte";

    type Props = {
        children: Snippet;
    }
    let {
        children
    }: Props = $props();
</script>

<PointerCanvas>
    <Willow>
        {@render children()}
    </Willow>
</PointerCanvas>
