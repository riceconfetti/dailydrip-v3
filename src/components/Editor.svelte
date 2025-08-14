<script>
  import { tv } from "tailwind-variants";
  const sizes = [
    "9xs",
    "8xs",
    "7xs",
    "6xs",
    "5xs",
    "4xs",
    "3xs",
    "2xs",
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
  ];

  const preview = tv({
    base: "",
    variants: {
      width: {
        "9xs": "w-[4rem]",
        "8xs": "w-[6rem]",
        "7xs": "w-[8rem]",
        "6xs": "w-[10rem]",
        "5xs": "w-[12rem]",
        "4xs": "w-[14rem]",
        "3xs": "w-[16rem]",
        "2xs": "w-[18rem]",
        xs: "w-[20rem]",
        sm: "w-[24rem]",
        md: "w-[28rem]",
        lg: "w-[32rem]",
        xl: "w-[36rem]",
        "2xl": "w-[42rem]",
        "3xl": "w-[48rem]",
        "4xl": "w-[56rem]",
        "5xl": "w-[64rem]",
      },
      height: {
        "9xs": "h-[4rem]",
        "8xs": "h-[6rem]",
        "7xs": "h-[8rem]",
        "6xs": "h-[10rem]",
        "5xs": "h-[12rem]",
        "4xs": "h-[14rem]",
        "3xs": "h-[16rem]",
        "2xs": "h-[18rem]",
        xs: "h-[20rem]",
        sm: "h-[24rem]",
        md: "h-[28rem]",
        lg: "h-[32rem]",
        xl: "h-[36rem]",
        "2xl": "h-[42rem]",
        "3xl": "h-[48rem]",
        "4xl": "h-[56rem]",
        "5xl": "h-[64rem]",
      },
    },
  });

  export let width = "sm";
  export let height = "xl";

  function landscape() {
    height = "3xs";
  }
  function portrait() {
    height = "md";
  }
  function swap() {
    const temp = width;
    width = height;
    height = temp;
  }

  let show = false;
</script>

<div class="size-full flex flex-col gap-6 justify-start items-center">
  <div class="flex gap-7">
    <label for="width">Width:</label>
    <select id="width" bind:value={width}>
      {#each sizes as size}
        <option value={size}>{size}</option>
      {/each}
    </select>
    <label for="height">Height:</label>
    <select id="height" bind:value={height}>
      {#each sizes as size}
        <option value={size}>{size}</option>
      {/each}
    </select>
    <!-- <button onclick={landscape}>Landscape</button>
    <button onclick={portrait}>Portrait</button> -->
    <button onclick={swap}>Swap</button>
    <button onclick={()=> show = !show}>Grid</button>
  </div>
  <div class="w-full flex flex-wrap justify-center gap-4">
    <div class={[preview({ width: width, height: height }), "relative"]}>
      {#if show}
      <div class="w-full absolute h-1/4 border-b border-black/50 z-20"></div>
      <div class="h-full absolute w-1/2 border-r border-black/50  z-20"></div>
      <div
        class="absolute size-18 aspect-square rounded-full overflow-clip border border-black/50 z-20 left-1/2 -translate-x-1/2 top-1/4 -translate-y-1/2"
      ></div>
      {/if}
      <slot name="base" />
    </div>
    <div class={preview({ width: width, height: height })}>
      <slot name="debut" />
    </div>
    <div class={preview({ width: width, height: height })}>
      <slot name="spec" />
    </div>
    <div class={preview({ width: width, height: height })}>
      <slot name="both" />
    </div>
  </div>
</div>
