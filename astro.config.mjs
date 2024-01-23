import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.terriblegeralds.com',
  integrations: [vue(), icon()]
});