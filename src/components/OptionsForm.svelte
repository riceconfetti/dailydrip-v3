<script lang="ts">
  export let options;
</script>

<form class="flex flex-col gap-4 p-6 bg-white w-full" method="POST">
  {#each Object.keys(options) as option}
    <h1 class="text-lg font-bold">{option}</h1>
    {#each Object.entries(options[option]) as opt}
      <label
        for={`${option}_${opt[0]}`}
        class="text-sm italic flex flex-col border rounded-sm gap-1 p-2 justify-center"
      >
        {opt[0]}
        {#if typeof opt[1] == "object"}
          <div class="flex gap-2">
            {#each Object.entries(opt[1]) as prop}
              <label
                for={`${option}_${opt[0]}_${prop[0]}`}
                class="text-sm italic flex rounded-sm gap-3 p-2 items-center"
              >
                {prop[0]}
                <input
                  class="bg-neutral-300 p-2 w-full not-italic text-base"
                  name={`${option}_${opt[0]}_${prop[0]}`}
                  id={`${option}_${opt[0]}_${prop[0]}`}
                  type="text"
                  value={prop[1]}
                />
              </label>
            {/each}
          </div>
        {:else}
          <input
            class="bg-neutral-300 p-2 w-full not-italic text-base"
            name={`${option}_${opt[0]}`}
            id={`${option}_${opt[0]}`}
            type="text"
            value={opt[1]}
          />
        {/if}
      </label>
    {/each}
  {/each}
  <button class="bg-dark text-light font-bold p-3">Save</button>
</form>
