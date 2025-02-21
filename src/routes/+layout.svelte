<script lang="ts">
    import "../app.css";
    import type { Snippet } from "svelte";
    import {Willow} from "wx-svelte-core"

    type Props = {
        children: Snippet;
    }
    let {
        children
    }: Props = $props();
</script>

<!-- <div class="dot" id="src-dot"></div>
<div class="dot" id="target-dot"></div>
<div class="line" id="line"><span id="line-label"></span></div> -->

<Willow>
    {@render children()}
</Willow>

<!-- <style>
    .dot {
        width: 10px;
        height: 10px;
        background-color: blue;
        border-radius: 50%;
        outline: 2px solid blue;
        outline-offset: 2px;
        position: absolute;
        z-index: 1000;
    }

    .line {
        width: 2px;
        height: 100px;
        background-color: blue;
        position: absolute;
        z-index: 1000;
        text-align: center;
    }

    #line-label {
        position: relative;
        top: -.5em;
        line-height: 1em;
        border: 1px solid blue;
        border-radius: 0.5em;
        padding: 0.1em 0.5em;
        background-color: white;
    }
</style> -->