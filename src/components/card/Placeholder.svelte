<script lang="ts">
  import { tv } from "tailwind-variants";
  const placeholder = tv({
    base: "absolute inset-0 block bg-[image:var(--placeholder)] bg-[50%_45%] bg-no-repeat @landscape:bg-[size:35cqh_35cqh] @portrait:bg-[size:45cqw_45cqw] @square:bg-[size:35cqw_35cqw]",
    variants: {
      hasSplash: {
        true: "hidden",
      },
    },
  });
  let { class: className, url } = $props();

  async function getSplash(url: string) {
    const res = await fetch(url);
    return res.ok;
  }
</script>

{#await getSplash(url)}
  <div></div>
{:then res}
  <div class={placeholder({ hasSplash: res }) + " " + className}></div>
{/await}
