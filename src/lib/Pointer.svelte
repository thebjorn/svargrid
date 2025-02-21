<script lang="ts">
    import { getContext } from "svelte";
    let {
        src,
        target,
        label,
    } = $props()

    const canvas = getContext("pointer-canvas")

    let pointer = $state()
    let src_rect = $state()
    let target_rect = $state()

    const highlight = () => {
        // width + outline + outline-offset
        const dot_size = 10 + 2 + 2 + 2 + 2 + 2

        const source = document.querySelector(src)
        const dest = document.querySelector(target)

        if (source) source.classList.add("pointer")
        if (dest) dest.classList.add("pointer")

        src_rect = source?.getBoundingClientRect()
        target_rect = dest?.getBoundingClientRect()

        const src_dot = document.getElementById("src-dot")
        const target_dot = document.getElementById("target-dot")
        const line = document.getElementById("line")
        const line_label = document.getElementById("line-label")
        line_label.innerHTML = label

        if (src_dot) {
            src_dot.style.left = `${3 + (src_rect?.left ?? 0)}px`
            src_dot.style.top = `${3 + (src_rect?.top ?? 0)}px` 
            src_dot.style.display = "block"
        }

        if (target_dot) {
            target_dot.style.left = `${3 + (target_rect?.left ?? 0)}px`
            target_dot.style.top = `${3 + (target_rect?.top ?? 0)}px`
            target_dot.style.display = "block"
        }
        console.log('src dot', src_dot)
        console.log('target dot', target_dot)

        const center_dot = (n: number) => n + (dot_size/2);

        if (line) {
            line.style.display = "block"
            line.style.left = `${center_dot(src_rect?.left ?? 0)}px`
            line.style.top = `${center_dot(src_rect?.top ?? 0)}px`
            line.style.width = `${(13*2)/2 + target_rect?.left - src_rect?.left}px`
            line.style.height = `${target_rect?.top - src_rect?.top}px`
            line.style.height = `${2}px`
            // line.style.width = `${5}px`
            line.style.transform = `rotate(${Math.atan2(target_rect?.top - src_rect?.top, target_rect?.left - src_rect?.left) * 180 / Math.PI}deg)`
            line.style.transformOrigin = `${src_rect?.left}px ${src_rect?.top}px`
        }
    }

    const unhighlight = () => {
        const source = document.querySelector(src)
        const dest = document.querySelector(target)
        const src_dot = document.getElementById("src-dot")
        const target_dot = document.getElementById("target-dot")
        const line = document.getElementById("line")

        if (source) source.classList.remove("pointer")
        if (dest) dest.classList.remove("pointer")
        if (src_dot) src_dot.style.display = "none"
        if (target_dot) target_dot.style.display = "none"
        if (line) line.style.display = "none"
    }
    
</script>


<!-- svelte-ignore a11y_no_static_element_interactions,
            a11y_mouse_events_have_key_events -->
<div class="pointer-control" onmouseenter={highlight} onmouseleave={unhighlight} bind:this={pointer}>
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

    .dot {
        width: 10px;
        height: 10px;
        background-color: blue;
        border-radius: 50%;
    }
</style>
