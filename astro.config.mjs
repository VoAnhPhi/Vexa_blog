// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: "Vexa Blog - Vo Anh Phi",
			social: [{ icon: "github", label: "GitHub", href: "https://github.com/withastro/starlight" }],
			customCss: ["./src/styles/custom.css"],
			pagefind: true,
			sidebar: [
				{
					label: "Guides",
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: "Example Guide", slug: "guides/example" },
					],
				},
				{
					label: "Reference",
					autogenerate: { directory: "reference" },
				},
			],
		}),
	],
});
