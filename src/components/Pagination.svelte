<script lang="ts">
  import { Pagination } from "bits-ui";
  let { count, perPage, currPage } = $props();
  let myPage = $state(currPage);
</script>

<Pagination.Root {count} {perPage} bind:page={myPage}>
  {#snippet children({ pages, range })}
    <div class="my-8 flex items-center font-subheading">
      <Pagination.PrevButton
        class="hover:bg-dark-10 disabled:text-muted-foreground mr-[25px] inline-flex size-10 items-center justify-center rounded-[9px] bg-transparent active:scale-[0.98] disabled:cursor-not-allowed hover:disabled:bg-transparent"
      >
        <i class="ri-arrow-left-s-line"></i>
      </Pagination.PrevButton>
      <div class="flex items-center gap-2.5">
        {#each pages as page (page.key)}
          {#if page.type === "ellipsis"}
            <div
              class="text-foreground-alt select-none text-[15px] font-medium"
            >
              ...
            </div>
          {:else}
            <a href={"./" + page.value}>
              <Pagination.Page
                {page}
                class="hover:bg-dark-10 inline-flex size-10 select-none items-center justify-center rounded-sm bg-transparent text-[15px] font-medium active:scale-[0.98] data-selected:bg-accent-gold disabled:cursor-not-allowed disabled:opacity-50 hover:disabled:bg-transparent"
              >
                {page.value}
              </Pagination.Page>
            </a>
          {/if}
        {/each}
      </div>
      <Pagination.NextButton
        class="hover:bg-dark-10 disabled:text-muted-foreground ml-[29px] inline-flex size-10 items-center justify-center rounded-[9px] bg-transparent active:scale-[0.98] disabled:cursor-not-allowed hover:disabled:bg-transparent"
      >
        <i class="ri-arrow-right-s-line"></i>
      </Pagination.NextButton>
    </div>
    <p class="text-muted-foreground text-center text-[13px] font-subheading">
      Showing {range.start} - {range.end}
    </p>
  {/snippet}
</Pagination.Root>
