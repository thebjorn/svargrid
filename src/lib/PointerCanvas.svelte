<script lang="ts">
    import { setContext } from "svelte";

    let src_dot = $state()
    let target_dot = $state()
    let line = $state()
    let line_label = $state()
    let options = $state()

    let lines = $state([])

    setContext("pointer-canvas", {
        src_dot: () => src_dot, 
        set_src_dot: (dot: HTMLElement) => src_dot = dot,
        target_dot: () => target_dot, 
        set_target_dot: (dot: HTMLElement) => target_dot = dot,
        line: () => line, 
        set_line: (line: HTMLElement) => line = line,
        line_label: () => line_label, 
        set_line_label: (label: HTMLElement) => line_label = label,

        add_line: (src, dst) => { lines.push({ src, dst }); return lines.length - 1; },
        rm_line: n => { lines.splice(n, 1); },
        
        options: () => options,
        set_options: (vals: unknown[]) => options = vals
    })
</script>

{#each lines as line, i}
    <div bind:this={line.src} class="src dot line-{i}"></div>
    <div bind:this={line.dst} class="dst dot line-{i}"></div>
    <div bind:this={line.line} class="line line-{i}"><span class="line-label line-{i}"></span></div>
{/each}


<style>
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
        position: absolute;
        width: 2px;
        height: 100px;
        z-index: 1000;
        text-align: center;
        background-color: blue;
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
</style>