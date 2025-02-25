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
  class="absolute h-dvh w-dvw bg-dark/20 z-50 backdrop-blur-sm items-center justify-center hidden p-4"
>
  <div
    class="bg-light rounded p-4 flex flex-col font-subheading font-semibold gap-4 w-full sm:w-4/5 md:w-3/5"
  >
    <h2 class="font-heading font-bold-bold text-2xl">Settings</h2>
    <hr class="border-accent-gold-500" />
    <ul class="grid grid-cols-2 gap-4">
      <li class="grid grid-cols-subgrid col-span-2">
        <label for="setting_genshin">Genshin Impact</label>
        <select
          bind:value={settings.genshin}
          class="bg-dark/10 border border-accent-gold-500/20 text-accent-gold-500 px-2 text-sm rounded-sm"
        >
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="America">Amercia</option>
        </select>
      </li>
      <li class="grid grid-cols-subgrid col-span-2">
        <label for="setting_genshin">Honkai: Star Rail</label>
        <select
          bind:value={settings.starrail}
          class="bg-dark/10 border border-accent-gold-500/20 text-accent-gold-500 px-2 text-sm rounded-sm"
        >
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="America">Amercia</option>
        </select>
      </li>
      <li class="grid grid-cols-subgrid col-span-2">
        <label for="setting_genshin">Wuthering Waves</label>
        <select
          bind:value={settings.wuwa}
          class="bg-dark/10 border border-accent-gold-500/20 text-accent-gold-500 px-2 text-sm rounded-sm"
        >
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="America">Amercia</option>
        </select>
      </li>
      <li class="grid grid-cols-subgrid col-span-2">
        <label for="setting_genshin">Zenless Zone Zero</label>
        <select
          bind:value={settings.zzz}
          class="bg-dark/10 border border-accent-gold-500/20 text-accent-gold-500 px-2 text-sm rounded-sm"
        >
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="America">Amercia</option>
        </select>
      </li>
    </ul>
    <hr class="border-accent-gold-500" />
    <div class="flex gap-2 justify-end items-center">
      <button class="setting_close rounded bg-dark text-light p-1 px-2"
        >Close</button
      >
    </div>
  </div>
</div>
