<script lang="ts">
  const { events } = $props();
  import { Calendar } from "bits-ui";
  import { settings, getTimezones } from "$store/settings.svelte";
  import {
    parseAbsoluteToLocal,
    toCalendarDate,
  } from "@internationalized/date";

  interface Event {
    layout: {
      server_start: string;
      start: number;
    };
    game: {
      id: string;
    };
    version: {
      semVer: number;
    };
    featured_characters: {
      id: string;
      characters_id: { name: string, rarity: number };
      spec: boolean;
    };
    event_tags: any;
    startDate: any;
    endDate: any;
    iso: any;
  }

  let timeZones = $derived(getTimezones(settings));
  events.forEach((e: Event) => {
    const tz =
      e.layout.server_start
        ? "+08:00"
        : timeZones.find(({ key }) => key == e.game.id)?.value;
    const isoString = e.startDate + "T" + e.layout.start + tz;
    e.iso = isoString;
  });

  let interEvents = events.map((e: Event) => {
    let zoned = parseAbsoluteToLocal(e.iso);
    return toCalendarDate(zoned).toString();
  });

  $effect(() => {
    events.forEach((e: Event) => {
      const tz =
        e.layout.server_start
          ? "+08:00"
          : timeZones.find(({ key }) => key == e.game.id)?.value;
      const isoString = e.startDate + "T" + e.layout.start + tz;
      e.iso = isoString;
    });

    interEvents = events.map((e: Event) => {
      let zoned = parseAbsoluteToLocal(e.iso);
      return toCalendarDate(zoned).toString();
    });
  });

  const isDateUnavailable = (date: any) => {
    return interEvents.includes(date.toString());
  };

  const verFormat = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 1,
  });

  const gameColors: { [key: string]: any } = {
    bg_starrail: "--bg-starrail",
    bg_genshin: "--bg-genshin",
    bg_wuwa: "--bg-wuwa",
    bg_zzz: "--bg-zzz",
    text_starrail: "--text-starrail",
    text_genshin: "--text-genshin",
    text_wuwa: "--text-wuwa",
    text_zzz: "--text-zzz",
  };
</script>

<Calendar.Root
  class="font-body max-lg:aspect-square w-full flex flex-col px-2 text-center md:grid gap-1 grid-rows-[fit-content(--spacing(32))]"
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
        class="flex size-full border-collapse flex-col gap-2 text-left min-h-0"
      >
        <Calendar.GridHead class="h-min block">
          <Calendar.GridRow
            class="playfair-display-sc-bold grid grid-cols-7 justify-items-center text-dark/50"
          >
            {#each weekdays as day}
              <Calendar.HeadCell class="align-center text-xs">
                <div>{day.slice(0, 1)}</div>
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
                  class="relative min-h-0 aspect-square h-full w-full border-dark/20"
                >
                  {@const event = isDateUnavailable(date)
                    ? events.filter((e: Event) => {
                        let zoned = parseAbsoluteToLocal(e.iso);
                        return toCalendarDate(zoned).compare(date) === 0;
                      })
                    : false}
                  <Calendar.Day
                    data-event={isDateUnavailable(date) ? "" : null}
                    class="absolute -inset-[1px] @container-[size] group line-clamp-4 data-outside-month:opacity-40 data-outside-month:bg-dark/10  data-today:border-accent-gold-300 data-today:border data-today:bg-accent-gold-300/10"
                  >
                    <!-- EVENT DAY COLOR BADGE -->
                    <div
                      style:--text-starrail="var(--color-text-dark)"
                      style:--text-genshin="var(--color-text-light)"
                      style:--text-wuwa="var(--color-text-dark)"
                      style:--text-zzz="var(--color-text-light)"
                      class="absolute inset-0 flex flex-col items-center justify-center md:justify-start md:items-start size-full gap-2 lg:gap-1 p-1 md:p-[0.325rem]"
                    >
                      <div
                        style={isDateUnavailable(date)
                          ? "--accentColor: var(" +
                            gameColors["bg_" + event[0].game.id] +
                            "); --textColor: var(" +
                            gameColors["text_" + event[0].game.id] +
                            ")"
                          : ""}
                        class="aspect-square md:w-[14cqw] lg:group-data-event:text-(--accentColor) lg:group-data-event:brightness-80 lg:group-data-event:font-bold lg:group-data-event:bg-inherit group-data-event:bg-(--accentColor) group-data-event:text-(--textColor) px-1 flex items-center justify-center rounded-xs"
                      >
                        <p class="text-[clamp(0.7rem,12cqw,1rem)] leading-none">
                          {date.day}
                        </p>
                      </div>

                      <div
                        class="absolute inset-0 p-1 flex flex-col gap-1 truncate overflow-y-auto"
                      >
                        {#if event}
                          {#each event as even}
                            {#if even.event_tags && even.event_tags[0] == "chronicled wish"}
                              <div
                                style:--accentColor={"var(" +
                                  gameColors["bg_" + even.game.id] +
                                  ")"}
                                class="first:pl-[25cqw] hidden md:flex italic font-subheading text-[clamp(0.6rem,8cqw,0.725rem)] font-semibold w-full lg:gap-1 sm:gap-2"
                              >
                                <p
                                  class="text-ellipsis w-full overflow-hidden leading-snug text-balance text-right"
                                >
                                  {even.event_tags[1]}
                                </p>
                                <div
                                  class=" rounded-full bg-(--accentColor) w-1"
                                ></div>
                              </div>
                            {:else}
                              {#each even.featured_characters as char}
                                <div
                                  style:--accentColor={"var(" +
                                    gameColors["bg_" + even.game.id] +
                                    ")"}
                                  class="first:pl-[25cqw] hidden md:flex italic font-subheading text-[clamp(0.6rem,8cqw,0.725rem)] font-semibold w-full lg:gap-1 sm:gap-2"
                                >
                                  <p
                                    class={["text-ellipsis w-full overflow-hidden leading-snug text-balance text-right"]}
                                  >
                                    {char.characters_id.name}
                                  </p>
                                  <div
                                    class=" rounded-full bg-(--accentColor) w-1"
                                  ></div>
                                </div>
                              {/each}
                            {/if}
                          {/each}
                        {/if}
                      </div>
                    </div>
                  </Calendar.Day>
                </Calendar.Cell>
              {/each}
            </Calendar.GridRow>
          {/each}
        </Calendar.GridBody>
      </Calendar.Grid>
    {/each}
    <ul
      class="flex font-body w-full text-[.6rem] items-center justify-around mt-2"
    >
      <li class="flex gap-2 grow-0 items-center justify-items-center">
        <div class="rounded-full bg-(--bg-genshin) w-2 aspect-square"></div>
        <p class="text-ellipsis text-nowrap w-full">Genshin Impact</p>
      </li>
      <li class="flex gap-2 grow-0 items-center justify-items-center">
        <div class="rounded-full bg-(--bg-starrail) w-2 aspect-square"></div>
        <p class="text-ellipsis text-nowrap w-full">Honkai: Star Rail</p>
      </li>
      <li class="flex gap-2 grow-0 items-center justify-items-center">
        <div class="rounded-full bg-(--bg-wuwa) w-2 aspect-square"></div>
        <p class="text-ellipsis text-nowrap w-full">Wuthering Waves</p>
      </li>
      <li class="flex gap-2 grow-0 items-center justify-items-center">
        <div class="rounded-full bg-(--bg-zzz) w-2 aspect-square"></div>
        <p class="text-ellipsis text-nowrap w-full">Zenless Zone Zero</p>
      </li>
    </ul>
  {/snippet}
</Calendar.Root>
