<script lang="ts">
  import dayjs from "dayjs";
  import utc from "dayjs/plugin/utc";
  import timezone from "dayjs/plugin/timezone";
  import relativeTime from "dayjs/plugin/relativeTime";
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(relativeTime);

  let { bannerEvent } = $props();
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

  let bannerTime;
  if (dayjs(startDate).isBefore(dayjs()) && dayjs(endDate).isAfter(dayjs())) {
    bannerTime = "Ending " + dayjs(endDate).fromNow();
  } else {
    bannerTime = "Starting " + dayjs(startDate).fromNow();
  }
</script>

<p>{bannerTime}</p>
