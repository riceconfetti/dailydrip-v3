<script lang="ts">
  import { onMount } from "svelte";
  import { settings, type Settings } from "$store/settings.svelte";

  onMount(() => {
    const userSettings = window.localStorage.getItem("settings");
    if (userSettings) {
      const temp: Settings = JSON.parse(userSettings);
      Object.keys(temp).forEach((k: string) => {
        settings[k] = temp[k];
      });
    }
  });

  $effect(() => {
    window.localStorage.setItem("settings", JSON.stringify(settings));
  });
</script>

<div
  id="settings"
  class="absolute h-dvh w-dvw bg-dark/20 z-50 backdrop-blur-sm items-center hidden justify-center p-4"
>
  <div
    class="bg-light flex flex-col font-subheading font-semibold gap-4 w-full sm:w-4/5 md:w-3/5"
  >
    <div
      class="tracking-wide h-min font-bold font-subheading flex w-full border border-black/10 p-3 px-4 text-base sm:text-xl bg-dark text-text-dark order-0 items-center gap-2"
    >
      <i class="ri-settings-4-line text-accent-gold leading-none"></i>
      <h1 class="leading-none">Settings</h1>
    </div>

    <ul class="grid grid-cols-2 grid-rows-2 gap-4 p-4">
      <li class="grid grid-rows-2 gap-2">
        <label for="setting_genshin">Genshin Impact</label>

        <select
          bind:value={settings.genshin}
          class="bg-dark/5 border border-accent-gold-500/20 text-accent-gold-500 px-2 text-sm rounded-xs"
        >
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="America">Amercia</option>
        </select>
      </li>
      <li class="grid grid-rows-2 gap-2">
        <label for="setting_starrail">Honkai: Star Rail</label>

        <select
          bind:value={settings.starrail}
          class="bg-dark/5 border border-accent-gold-500/20 text-accent-gold-500 px-2 text-sm rounded-xs"
        >
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="America">Amercia</option>
        </select>
      </li>
      <li class="grid grid-rows-2 gap-2">
        <label for="setting_wuwa">Wuthering Waves</label>

        <select
          bind:value={settings.wuwa}
          class="bg-dark/5 border border-accent-gold-500/20 text-accent-gold-500 px-2 text-sm rounded-xs"
        >
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="America">Amercia</option>
        </select>
      </li>
      <li class="grid grid-rows-2 gap-2">
        <label for="setting_zzz">Zenless Zone Zero</label>

        <select
          bind:value={settings.zzz}
          class="bg-dark/5 border border-accent-gold-500/20 text-accent-gold-500 px-2 text-sm rounded-xs"
        >
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="America">Amercia</option>
        </select>
      </li>
    </ul>
    <div class="flex gap-2 justify-end items-center p-4 pt-0">
      <button class="setting_close rounded bg-dark/90 text-light p-1 px-2"
        >Close</button
      >
    </div>
  </div>
</div>
