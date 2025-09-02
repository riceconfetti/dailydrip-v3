<script lang="ts">
  import dayjs from "dayjs";
  import utc from "dayjs/plugin/utc";
  import timezone from "dayjs/plugin/timezone";
  dayjs.extend(utc);
  dayjs.extend(timezone);

  let { item, text, classlist } = $props();

  const {event, game, start, end,...rest} = item
  import { getServer } from "$store/settings.svelte";
  const server = $derived(getServer(game.id));
  let currzone = dayjs.tz.guess();
  const tz = $derived(
    rest.server_start ? "+08:00" : server?.value?.timezone,
  );


    // console.log(server)
// [` ${event.phase.phase == "1" ? "bg-[#BFBFBF] text-text-light" : "bg-dark text-accent-gold order-0"}`]


</script>

<div
  class={classlist}
>
  <h1>{text}</h1>
  <p class="font-light italic">
    {dayjs(event.startDate + "T" + start + tz)
      .tz(currzone)
      .format("MMM D") +
      " @" +
      dayjs(event.startDate + "T" + start + tz)
        .tz(currzone)
        .format("h a")}
  </p>
</div>
