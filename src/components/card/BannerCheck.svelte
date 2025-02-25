<script lang="ts">
  import dayjs from "dayjs";
  import utc from "dayjs/plugin/utc";
  import timezone from "dayjs/plugin/timezone";
  import relativeTime from "dayjs/plugin/relativeTime";
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(relativeTime);

  let { bannerEvent, children, class: className } = $props();
  let game = bannerEvent.game;

  import { getServer } from "$store/settings.svelte";
  const server = $derived(getServer(game));
  let currzone = dayjs.tz.guess();
  const tz = $derived(
    bannerEvent.phase == "1" ? "+08:00" : server?.value?.timezone,
  );

  let startDate = $derived(
    dayjs(bannerEvent.startDate + "T" + bannerEvent.phase.start + tz).tz(
      currzone,
    ),
  );
  let endDate = $derived(
    dayjs(
      bannerEvent.endDate +
        "T" +
        bannerEvent.phase.end +
        server?.value?.timezone,
    ).tz(currzone),
  );

  const display = $derived(
    dayjs(startDate).isBefore(endDate) && dayjs(endDate).isAfter(dayjs())
      ? "display"
      : "hidden",
  );
</script>

<div class={[className, display]}>{@render children()}</div>
