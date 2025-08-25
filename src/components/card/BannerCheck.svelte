<script lang="ts">
  import dayjs from "dayjs";
  import utc from "dayjs/plugin/utc";
  import timezone from "dayjs/plugin/timezone";
  import relativeTime from "dayjs/plugin/relativeTime";
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(relativeTime);

  let { bannerEvent, children, class: className, status } = $props();
  let game = bannerEvent.game.id;

 
  import { getServer } from "$store/settings.svelte";
  const server = $derived(getServer(game));
  let currzone = dayjs.tz.guess();
  const tz = $derived(
    bannerEvent.phase.phase == "1" ? "+08:00" : server?.value?.timezone,
  );

  let startString = $derived(
    bannerEvent.startDate + "T" + bannerEvent.phase.start + tz,
  );
  let startDate = $derived(dayjs(startString).tz(currzone));

  let endString = $derived(
    bannerEvent.endDate + "T" + bannerEvent.phase.end + server?.value?.timezone,
  );
  let endDate = $derived(dayjs(endString).tz(currzone));

  const currentDisplay = $derived(
    startDate.isBefore(dayjs()) && endDate.isAfter(dayjs()) ? "" : "hidden",
  );

  const upcomingDisplay = $derived(startDate.isAfter(dayjs()) ? "" : "hidden");

  const display = $derived(
    status == "current" ? currentDisplay : upcomingDisplay,
  );
</script>

<div class={[className, display]}>{@render children()}</div>
