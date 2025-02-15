<script>
  import { tv } from "tailwind-variants";
  const sizes = [
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
  let width, height;
</script>

<div class="size-full flex flex-col gap-6 justify-start items-center p-6">
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
  </div>
  <div class={preview({ width: width, height: height })}><slot></slot></div>
</div>
