<script>
  const { events } = $props();
  import { Calendar } from "bits-ui";
  import { getServer } from "$store/settings.svelte";
  import {
    parseAbsoluteToLocal,
    toCalendarDate,
    getLocalTimeZone,
    today,
  } from "@internationalized/date";

  events.forEach((e) => {
    const server = getServer(e.game);
    const tz = e.phase.phase == "1" ? "+08:00" : server?.value?.timezone;
    e.dateTime = parseAbsoluteToLocal(e.startDate + "T" + e.phase.start + tz);
  });

  const calendarEvents = events.map((e) =>
    toCalendarDate(e.dateTime).toString(),
  );
  // console.log(calendarEvents);

  const isDateUnavailable = (date) => {
    return calendarEvents.includes(date);
  };
  let value = $state(today(getLocalTimeZone()));
</script>

<Calendar.Root
  class="font-body flex w-full flex-col p-4 text-center md:grid md:h-full md:grid-rows-[fit-content(--spacing(32))] md:min-h-0"
  fixedWeeks={true}
  {isDateUnavailable}
  weekdayFormat="short"
  bind:value
>
  {#snippet children({ months, weekdays })}
    <Calendar.Header
      class="font-heading font-bold flex items-center justify-between gap-2 p-2"
    >
      <Calendar.PrevButton
        class="rounded-9px bg-background-alt hover:bg-muted active:scale-98 inline-flex size-10 items-center justify-center active:transition-all"
      >
        <i class="ri-arrow-left-s-line"></i>
      </Calendar.PrevButton>
      <Calendar.Heading />
      <Calendar.NextButton
        class="rounded-9px bg-background-alt hover:bg-muted active:scale-98 inline-flex size-10 items-center justify-center active:transition-all"
      >
        <i class="ri-arrow-right-s-line"></i>
      </Calendar.NextButton>
    </Calendar.Header>

    {#each months as month, i (i)}
      <Calendar.Grid
        class="md:flex md:h-full md:w-full md:border-collapse md:flex-col md:gap-4 md:text-left md:min-h-0"
      >
        <Calendar.GridHead class="hidden h-min md:block">
          <Calendar.GridRow
            class="playfair-display-sc-bold grid grid-cols-7 justify-items-center text-dark/50"
          >
            {#each weekdays as day}
              <Calendar.HeadCell class="align-center text-xs">
                {day.slice(0, 3)}
              </Calendar.HeadCell>
            {/each}
          </Calendar.GridRow>
        </Calendar.GridHead>
        <Calendar.GridBody
          class=" min-h-0 md:grid md:h-full md:grid-rows-6 md:divide-y md:border md:border-dark/20"
        >
          {#each month.weeks as weekDates}
            <Calendar.GridRow
              class="md:grid md:grid-cols-7 md:divide-x md:border-dark/20 md:align-top"
            >
              {#each weekDates as date}
                <Calendar.Cell
                  {date}
                  month={month.value}
                  class="min-h-0 p-2 md:aspect-square md:h-full md:w-full md:border-dark/20 md:p-1 md:px-2 data-[disabled]:text-dark/40"
                >
                  <Calendar.Day class="data-[unavailable]:line-through">
                    {date.day}
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
