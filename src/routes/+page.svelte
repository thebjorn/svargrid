<script lang="ts">
    import { WillowDark, Calendar } from "wx-svelte-core";
    import { Grid } from "wx-svelte-grid"; 
    import { ContextMenu } from "wx-svelte-menu";
    import Pointer from "$lib/Pointer.svelte";

    type Sort = "asc" | "desc" | null
    type HeadItem = { id: string, header: string, width: number, sort: Sort, type: string }
    const columns: HeadItem[] = $state([
        { id: "id", header: "id", width: 50, sort: null, type: "number", footer: {text: "Total", colspan: 2} },
        { id: "name", header: "name", width: 250, sort: null, type: "string" },
        { id: "color", header: "color", width: 150, sort: null, type: "string" },
        { id: "type", header: "type", width: 150, sort: null, type: "string" },
        { id: "price", header: "price", width: 150, sort: null, type: "number", hidden: false }
    ])

    const data = $state([
        {id: 1, name: "Apple MacBook Pro 17\"", color: "Sliver", type: "Laptop", price: 2999},
        {id: 2, name: "Microsoft Surface Pro", color: "White", type: "Laptop PC", price: 1999},
        {id: 3, name: "Magic Mouse 2", color: "Black", type: "Accessories", price: 99},
        {id: 4, name: "Google Pixel Phone", color: "Gray", type: "Phone", price: 799},
        {id: 5, name: "Apple Watch 5", color: "Red", type: "Wearables", price: 999}
    ])

    let table = $state()

    const options = [
        {
            id: "add:before",
            text: "Add before",
            icon: "wxi-table-row-plus-before",
        },
        {
            id: "add:after",
            text: "Add after",
            icon: "wxi-table-row-plus-after",
        },
    { type: "separator" },
        { id: "copy", text: "Copy", icon: "wxi-content-copy" },
        { type: "separator" },
        { id: "delete", text: "Delete", icon: "wxi-delete-outline" },
    ];

    let title = $state(null)
</script>
  

<main class="flex flex-col justify-center items-center h-screen">
    <h1 bind:this={title} id="title" class="my-4 font-bold text-3xl" style="opacity: 0.3">
        SvarGrid
    </h1>

    <div class="col-2">
        <!-- <ContextMenu api={table} at={"bottom"} {options} style="z-index: 1000;background-color: #fff;"> -->
            <Grid {data} {columns} bind:this={table} />
        <!-- </ContextMenu> -->
        <!-- <Calendar /> -->
    </div>

    <div class="my-4 p-4 border-2 border-base-content/5 rounded-box w-1/2">
        <div class="chat chat-start">
            <div class="chat-bubble chat-bubble-primary">What kind of nonsense is this</div>
        </div>
        <div class="chat chat-start">
            <div class="chat-bubble chat-bubble-secondary">Put me on the Council and not make me a Master!??</div>
        </div>
        <div class="chat chat-start">
            <div class="chat-bubble chat-bubble-accent">That's never been done in the history of the Jedi.</div>
        </div>
        <div class="chat chat-start">
            <div class="chat-bubble chat-bubble-neutral">It's insulting!</div>
          </div>
        <div class="chat chat-end">
            <div class="chat-bubble chat-bubble-info">Calm down, Anakin.</div>
        </div>
        <div class="chat chat-end">
        <div class="chat-bubble chat-bubble-success">You have been given a great honor.</div>
        </div>
      <div class="chat chat-end">
        <div class="chat-bubble chat-bubble-warning">To be on the Council at your age.</div>
      </div>
      <div class="chat chat-end">
        <div class="chat-bubble chat-bubble-error">It's never happened before.</div>
      </div>
    </div>

    <!-- <Calendar value={new Date()} /> -->
</main>
<Pointer src={{selector: `[data-row-id="5"][data-col-id="type"]`, draw: true}}
         target={{selector: `[data-row-id="1"][data-col-id="name"]`, draw: true}}
         color="green"
         label="Hello"/>

<style lang="postcss">
    main {
        background-color: #fffff1;
    }

    .col-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
    /* @reference "tailwindcss/theme"; */

    /* :global(html) {
        background-color: theme(--color-gray-100);
    } */
</style>