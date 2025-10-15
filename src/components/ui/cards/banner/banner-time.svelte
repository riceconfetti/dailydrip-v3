<script lang="ts">
  import dayjs from "dayjs";
  import utc from "dayjs/plugin/utc";
  import timezone from "dayjs/plugin/timezone";
  import relativeTime from "dayjs/plugin/relativeTime";
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(relativeTime);

  let { bannerEvent } = $props();
  let game = bannerEvent.game.id;

  import { getServer } from "$store/settings.svelte";
  const server = $derived(getServer(game));
  let currzone = dayjs.tz.guess();
  const tz = $derived(
    bannerEvent.layout.server_start ? server?.value?.timezone : "+08:00",
  );

  let startDate = $derived(
    dayjs(bannerEvent.startDate + "T" + bannerEvent.layout.start + tz).tz(
      currzone,
    ),
  );
  let endDate = $derived(
    dayjs(
      bannerEvent.endDate +
        "T" +
        bannerEvent.layout.end +
        server?.value?.timezone,
    ).tz(currzone),
  );

  let bannerTime = $derived.by(() => {
    if (dayjs(startDate).isBefore(dayjs()) && dayjs(endDate).isAfter(dayjs())) {
      return "Ending " + dayjs(endDate).fromNow();
    } else {
      return "Starting " + dayjs(startDate).fromNow();
    }
  });
</script>

<p>
  {bannerTime}
</p>
