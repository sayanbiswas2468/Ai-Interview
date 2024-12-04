import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				heroImg: "url('../assets/Background.jpg')",
				interviewImg: "url('../assets/HeroInterview.jpg')",
			},
			fontFamily: {
				lexend: ['Lexend Deca', 'sans-serif'],
				offside: ['Offside', 'cursive']
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
