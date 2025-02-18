<script lang="ts">
  import dayjs from "dayjs";
  import utc from "dayjs/plugin/utc";
  import timezone from "dayjs/plugin/timezone";
  dayjs.extend(utc);
  dayjs.extend(timezone);

  let { event } = $props();
  let game = event.game;

  import { getServer } from "$store/settings.svelte";
  const server = $derived(getServer(game));
  let currzone = dayjs.tz.guess();
  const tz = $derived(
    event.phase.phase == "1" ? "+08:00" : server?.value?.timezone,
  );
</script>

<div class={`relative flex w-full flex-col gap-2 overflow-hidden rounded-md `}>
  <div
    class="absolute inset-0 z-10 flex h-full w-2/3 flex-col justify-center p-4"
  >
    <h2 class={`z-10 text-sm text-white text-balance `}>
      {event.bannerName}
    </h2>
  </div>
</div>
