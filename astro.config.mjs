// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: "Vexa Blog - Vo Anh Phi",
			social: [{ icon: "github", label: "GitHub", href: "https://github.com/VoAnhPhi" }],
			customCss: ["./src/styles/custom.css"],
			pagefind: true,
			defaultLocale: "root",
			locales: {
				root: {
					label: "Tiếng Việt",
					lang: "vi",
				},
				en: {
					label: "English",
					lang: "en",
				},
			},
			sidebar: [
				{
					label: "Languages",
					translations: {
						en: "Languages",
						vi: "Ngôn Ngữ Lập Trình",
					},
					autogenerate: { directory: "languages" },
				},
				{
					label: "Frontend",
					translations: {
						en: "Frontend",
						vi: "Frontend",
					},
					autogenerate: { directory: "frontend" },
				},
				{
					label: "Backend",
					translations: {
						en: "Backend",
						vi: "Backend",
					},
					autogenerate: { directory: "backend" },
				},
				{
					label: "Business Analysis",
					translations: {
						en: "Business Analysis",
						vi: "Phân Tích Nghiệp Vụ",
					},
					autogenerate: { directory: "ba" },
				},
				{
					label: "UI/UX",
					translations: {
						en: "UI/UX Design",
						vi: "Thiết Kế UI/UX",
					},
					autogenerate: { directory: "uiux" },
				},
				{
					label: "Reference",
					translations: {
						en: "Reference",
						vi: "Tham Khảo",
					},
					autogenerate: { directory: "reference" },
				},
				{
					label: "Follow",
					translations: {
						en: "Updates",
						vi: "Cập Nhật",
					},
					autogenerate: { directory: "follow" },
				},
			],
		}),
	],
});
