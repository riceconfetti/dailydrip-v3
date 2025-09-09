<script lang="ts">
  import dayjs from "dayjs";
  import utc from "dayjs/plugin/utc";
  import timezone from "dayjs/plugin/timezone";
  dayjs.extend(utc);
  dayjs.extend(timezone);

  let { item } = $props();

  const { base, event, game } = item;
  const { start, server_start } = base;

  import { getServer } from "$store/settings.svelte";
  import { classlist } from "../gridclass";

  const server = $derived(getServer(game.id));
  const tz = $derived(!server_start ? "+08:00" : server?.value?.timezone);
  const grid = classlist(
    [
      "tracking-normal",
      "font-semibold",
      "flex",
      "w-full",
      "justify-between",
      "border",
      "border-black/10",
      "bg-(--header_bg)",
      "text-(--header_text)",
      "font-subheading",
      "p-2",
      "h-full",
      "items-center",
      "text-xs",
      "sm:text-sm",
      "h-min",
    ],
    item,
  );

  let currzone = dayjs.tz.guess();
  // $inspect(event.startDate + "T" + start + tz, currzone);
</script>

<div
  class={grid.list}
  style={Object.entries(grid.style).reduce(
    (p, c) => (p += `${c[0]}:${c[1]}; `),
    "",
  )}
>
  <h1>{item.text}</h1>
  <p class="font-light italic">
    {dayjs(event.startDate + "T" + start + tz)
      .tz(currzone)
      .format("MMM D") +
      " @" +
      dayjs(event.startDate + "T" + start + tz)
        .tz(currzone)
        .format("h a")}
  </p>
  <!-- <p class="font-light italic">
    {dayjs(event.startDate + "T" + start + tz).tz(currzone)}
  </p> -->
</div>
