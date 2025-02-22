<script lang="ts">
    import { getAllContexts, getContext } from "svelte";
    import type { NodeOpts } from "./types.ts";


    type Props = {
        src: NodeOpts
        target: NodeOpts
        label: string
        color?: string
    }

    let {
        src,
        target,
        label,
        color = "blue",
    }: Props = $props()

    // list all context keys
    const context = getAllContexts()
    console.log(context)

    type TCanvas = {
        add_line: (src: NodeOpts, target: NodeOpts, label: string) => number
        rm_line: (n: number) => void
        options: () => unknown[]
        set_options: (vals: unknown[]) => void
    }
    
    const canvas = getContext<TCanvas>("pointer-canvas")

    let myline = $state(-1)

    let pointer = $state()
    let src_rect = $state()
    let target_rect = $state()

    const highlight = () => {
        myline = canvas.add_line(src, target, label, color)
    }

    const unhighlight = () => {
        canvas.rm_line(myline)
    }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions,
            a11y_mouse_events_have_key_events -->
<div class="pointer-control" 
     onmouseenter={highlight} 
     onmouseleave={unhighlight} 
     bind:this={pointer}>
    src:
    <pre>{src}</pre>
    target:
    <pre>{target}</pre>
    src_rect:
    <pre>{JSON.stringify(src_rect, null, 2)}</pre>
    target_rect:
    <pre>{JSON.stringify(target_rect, null, 2)}</pre>
</div>

<style>
    :global(.pointer) {
        outline: 3px dotted blue;
    }

    .pointer-control {
        width: 700px;
        /* height: 600px; */
        padding: 1rem;
        background-color: rgb(219, 202, 202);
    }

</style>
