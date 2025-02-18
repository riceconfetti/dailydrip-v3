<script>
  const { events } = $props();
  import serverJSON from "$store/servers.json";
  import { Calendar } from "bits-ui";
  import { getServers, getServer, settings } from "$store/settings.svelte";
  import {
    parseAbsoluteToLocal,
    toCalendarDate,
  } from "@internationalized/date";

  const games = [...new Set(events.map((e) => e.game.id))];
  const servers = $derived.by(() => {
    return Object.keys(settings).map((key) => {
      let value = serverJSON.find(
        (s) => s.game == key && s.name == settings[key],
      );
      return { key: key, value: value };
    });
  });

  $inspect(servers);

  events.sort(
    (a, b) =>
      a.version.semVer +
      Number(a.phase.phase) / 100 -
      (b.version.semVer + Number(b.phase.phase) / 100),
  );
  events.forEach((e) => {
    const server = getServer(e.game.id);
    const tz = e.phase.phase == "1" ? "+08:00" : server?.value?.timezone;
    const str = e.startDate + "T" + e.phase.start + tz;
    // console.log(str);
    e.dateTime = parseAbsoluteToLocal(e.startDate + "T" + e.phase.start + tz);
  });

  const calendarEvents = events.map((e) =>
    toCalendarDate(e.dateTime).toString(),
  );

  // console.log(events.map((e) => e.startDate));

  const isDateUnavailable = (date) => {
    return calendarEvents.includes(date.toString());
  };

  const verFormat = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 1,
  });
</script>

<Calendar.Root
  class="font-body w-full flex flex-col p-4 text-center md:grid h-full grid-rows-[fit-content(--spacing(32))] min-h-0"
  {isDateUnavailable}
  fixedWeeks={true}
  weekdayFormat="short"
  type="single"
>
  {#snippet children({ months, weekdays })}
    <Calendar.Header
      class="font-heading font-bold flex items-center justify-between gap-22"
    >
      <Calendar.PrevButton
        class="rounded-9px bg-background-alt hover:bg-muted active:scale-98 inline-flex size-10 items-center justify-center active:transition-all"
      >
        <i class="ri-arrow-left-s-line"></i>
      </Calendar.PrevButton>
      <Calendar.Heading class="text-nowrap" />
      <Calendar.NextButton
        class="rounded-9px bg-background-alt hover:bg-muted active:scale-98 inline-flex size-10 items-center justify-center active:transition-all"
      >
        <i class="ri-arrow-right-s-line"></i>
      </Calendar.NextButton>
    </Calendar.Header>

    {#each months as month, i (i)}
      <Calendar.Grid
        class="flex size-full border-collapse flex-col gap-4 text-left min-h-0"
      >
        <Calendar.GridHead class="h-min block">
          <Calendar.GridRow
            class="playfair-display-sc-bold grid grid-cols-7 justify-items-center text-dark text-opacity-50"
          >
            {#each weekdays as day}
              <Calendar.HeadCell class="align-center text-xs">
                <div>{day.slice(0, 3)}</div>
              </Calendar.HeadCell>
            {/each}
          </Calendar.GridRow>
        </Calendar.GridHead>
        <Calendar.GridBody
          class="min-h-0 grid h-full grid-rows-6 divide-y border border-dark/20"
        >
          {#each month.weeks as weekDates}
            <Calendar.GridRow
              class="grid grid-cols-7 divide-x border-dark/20 align-top"
            >
              {#each weekDates as date}
                <Calendar.Cell
                  {date}
                  month={month.value}
                  class="relative min-h-0 aspect-square h-full w-full border-dark/20 p-2 data-[disabled]:text-dark/40"
                >
                  {@const event = isDateUnavailable(date)
                    ? events.find(
                        (e) => toCalendarDate(e.dateTime).compare(date) == 0,
                      )
                    : false}
                  <Calendar.Day
                    class="absolute inset-0 flex flex-col group items-center justify-center md:justify-start md:items-start  @container-[size] size-full gap-1 p-2"
                  >
                    <div class="flex items-center">
                      <div
                        class="group-data-[unavailable]:bg-accent-gold px-1 md:h-[17cqh] aspect-square flex items-center justify-center rounded-xs"
                      >
                        <p>{date.day}</p>
                      </div>
                      <p
                        class="hidden block ml-1 w-full font-subheading text-xs font-semibold"
                      >
                        {event ? event.game.name : ""}
                      </p>
                    </div>
                    <div class="px-2 hidden lg:flex flex-col gap-1">
                      <p class="w-full font-heading text-sm text-balance">
                        {event
                          ? "Version " + verFormat.format(event.version.semVer)
                          : ""}
                      </p>
                      <ul
                        class=" w-full font-heading text-xs list-disc list-inside text-balance"
                      >
                        {#each event.featured_characters as character}
                          <li>{character.name}</li>
                        {/each}
                      </ul>
                    </div>
                  </Calendar.Day>
                </Calendar.Cell>
              {/each}
            </Calendar.GridRow>
          {/each}
        </Calendar.GridBody>
      </Calendar.Grid>
    {/each}
  {/snippet}
</Calendar.Root>
