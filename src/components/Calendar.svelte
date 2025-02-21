<script>
  const { events } = $props();
  import serverJSON from "$store/servers.json";
  import { Calendar } from "bits-ui";
  import { settings, getTimezones } from "$store/settings.svelte";
  import {
    parseAbsoluteToLocal,
    toCalendarDate,
  } from "@internationalized/date";

  let timeZones = $derived(getTimezones(settings));
  events.forEach((e) => {
    const tz =
      e.phase.phase == "1"
        ? "+08:00"
        : timeZones.find(({ key }) => key == e.game.id).value;
    const isoString = e.startDate + "T" + e.phase.start + tz;
    e.iso = isoString;
  });

  let interEvents = events.map((e) => {
    let zoned = parseAbsoluteToLocal(e.iso);
    return toCalendarDate(zoned).toString();
  });

  $effect(() => {
    events.forEach((e) => {
      const tz =
        e.phase.phase == "1"
          ? "+08:00"
          : timeZones.find(({ key }) => key == e.game.id).value;
      const isoString = e.startDate + "T" + e.phase.start + tz;
      e.iso = isoString;
    });

    interEvents = events.map((e) => {
      let zoned = parseAbsoluteToLocal(e.iso);
      return toCalendarDate(zoned).toString();
    });
  });

  const isDateUnavailable = (date) => {
    return interEvents.includes(date.toString());
  };

  const verFormat = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 1,
  });

  const gameColors = {
    bg_starrail: "--bg-starrail",
    bg_genshin: "--bg-genshin",
    bg_wuwa: "--bg-wuwa",
    bg_zzz: "--bg-zzz",
    bg_default: "transparent",
    text_starrail: "--text-starrail",
    text_genshin: "--text-genshin",
    text_wuwa: "--text-wuwa",
    text_zzz: "--text-zzz",
    text_default: "transparent",
  };
</script>

<Calendar.Root
  class="font-body w-full flex flex-col p-4 text-center md:grid max-lg:aspect-square grid-rows-[fit-content(--spacing(32))]"
  fixedWeeks={true}
  {isDateUnavailable}
  weekdayFormat="short"
  type="single"
>
  {#snippet children({ months, weekdays })}
    <Calendar.Header
      class="font-heading font-bold flex items-center justify-between md:gap-22 w-full"
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
                    ? events.find((e) => {
                        let zoned = parseAbsoluteToLocal(e.iso);
                        return toCalendarDate(zoned).compare(date) === 0;
                      })
                    : false}
                  <Calendar.Day
                    class="absolute inset-0 flex flex-col  items-center justify-center md:justify-start md:items-start  @container-[size] size-full gap-1 p-2"
                  >
                    <div
                      class="flex items-center group"
                      data-event={isDateUnavailable(date)}
                    >
                      <div
                        style:--accentColor={"var(" +
                          gameColors[
                            "bg_" + (event ? event.game.id : "default")
                          ] +
                          ")"}
                        style:--textColor={"var(" +
                          gameColors[
                            "text_" + (event ? event.game.id : "default")
                          ] +
                          ")"}
                        style:--bg-starrail="oklch(50.3% 0.1828 262.59)"
                        style:--bg-genshin="oklch(79.08% 0.0829 0)"
                        style:--bg-wuwa="oklch(19.14% 0.0247 266.53)"
                        style:--bg-zzz="oklch(56% 0.1431 43.41)"
                        style:--text-starrail="var(--color-text-dark)"
                        style:--text-genshin="var(--color-text-light)"
                        style:--text-wuwa="var(--color-text-dark)"
                        style:--text-zzz="var(--color-text-light)"
                        class="group-data-[event=true]:bg-(--accentColor) group-data-[event=true]:text-(--textColor) px-1 md:h-[17cqh] aspect-square flex items-center justify-center rounded-xs"
                      >
                        <p>{date.day}</p>
                      </div>
                      <p
                        class="hidden md:block ml-1 w-full font-subheading text-xs font-semibold"
                      >
                        {event ? event.game.name : ""}
                      </p>
                    </div>
                    <div class="px-2 hidden lg:flex flex-col gap-1">
                      <p class="w-full font-heading text-xs text-balance">
                        {event
                          ? "Version " + verFormat.format(event.version.semVer)
                          : ""}
                      </p>
                      <ul
                        class=" w-full font-subheading italic text-[.68rem] list-disc list-inside text-balance"
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
