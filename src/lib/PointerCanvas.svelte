<script lang="ts">
    import { setContext } from "svelte";
    import type { Snippet } from "svelte";
    import type { NodeOpts } from "./types.ts";
    import { Line } from "./line.svelte.ts";


    type Props = {
        children: Snippet
    }

    let {
        children
    }: Props = $props()

    let lines: Line[] = $state([])

    setContext("pointer-canvas", {
        add_line: (src: NodeOpts, dst: NodeOpts, label: string, ...rest: unknown[]) => { 
            lines.push(new Line(src, dst, label, ...rest)); 
            return lines.length - 1; 
        },
        rm_line: (n: number) => { n >= 0 && lines.splice(n, 1); },
    })


</script>

{#each lines as line, i}
    {#if line.src.draw}
        <div id={`pc-src-dot-${i}`} 
            class="src dot line-{i}"   
            style={line.src_styles()}
        ></div>
    {/if}
    {#if line.dst.draw}
        <div id={`pc-dst-dot-${i}`} 
            class="dst dot line-{i}"
            style={line.dst_styles()}
        ></div>
    {/if}
    <div id={`pc-line-${i}`} class="line line-{i}"
         style={line.line_styles()}>
        {#if line.label}
            <span id={`pc-line-label-${i}`} style="border-color: {line.color}" class="line-label line-{i}">{line.label}</span>
        {/if}
    </div>
{/each}

{@render children?.()}

<style>
    .line-label {
        font-family: verdana;
        font-size: 12px;
        position: relative;
        top: -.75em;
        line-height: 12px;
        border: 1px solid blue;
        border-radius: 0.5em;
        padding: 0.1em 0.5em;
        background-color: white;
    }
</style>