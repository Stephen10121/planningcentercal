import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";
// import { PRICEONELINK, PRICEONEID, PRICETWOLINK, PRICETWOID } from '$env/static/private';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === "none" ? "" : style.transform;

	const scaleConversion = (
		valueA: number,
		scaleA: [number, number],
		scaleB: [number, number]
	) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (
		style: Record<string, number | string | undefined>
	): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, "");
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

export function serializeNonPOJOs<T>(obj: T): T {
	return structuredClone(obj);
}

export type Plan = {
	link: string;
	priceId: string;
	price: number;
	duration: string;
}

export const plans: Plan[] = [
	{
		link: true ? "https://buy.stripe.com/test_9AQ4iR9LtakY6gUbII" : "PRICEONELINK",
		priceId: true ? "price_1QgFesIvhCJ9S72Ick1mBZq2" : "PRICEONEID",
		price: 10,
		duration: "/month"
	},
	{
		link: true ? "https://buy.stripe.com/test_aEU9Db0aTeBeaxa5kl" : "PRICETWOLINK",
		priceId: true ? "price_1QgFvGIvhCJ9S72Ixo8laCKE" : "PRICETWOID",
		price: 99,
		duration: "/year"
	}
];

/**
 * This function get the url that is passed and makes a fetch request to recieve the file. The function then returns the file in a blob format.
 * @param fileLink 
 * @returns Blob
 */
export async function fetchFileFromURL(fileLink: string): Promise<{error: false, blob: Blob} | {error: true, msg: unknown}> {
	try {
		const res = await fetch(fileLink);
		const blob = await res.blob();
		return {
			error: false,
			blob
		}
	} catch (err) {
		return {
			error: true,
			msg: err
		}
	}
}

export type CalendarThemes = "LIGHT" | "DARK" | "CUSTOM"

export type CustomTheme = {
	backgroundColor: string
	headerColor: string
	dayTextColor: string
	dayOfWeekSize: string,
	headerHeight: string,
	daySeparatorLineWidth: string,
	eventBackgroundColor: string,
	eventBorderRadius: string,
	eventTitleColor: string,
	eventTitleFontSize: string,
	resourceTextColor: string,
    resourceFontSize: string,
	tagFontSize: string,
	timeTextColor: string,
	timeTextFontSize: string,
	[key: string]: any
}

export const LIGHT_THEME: CustomTheme = {
	"backgroundColor": "#ededed",
	"headerColor": "#b3b3b3",
	"dayTextColor": "#f5f5f5",
	"dayOfWeekSize": "2rem",
	"selectedDayTextColor": "#ffffff",
	"headerHeight": "80px",
	"headerBoxShadow": "0px 8px 18px -18px rgb(0, 0, 0)",
	"daySeparatorLineWidth": "1px",
	"daySeparatorLineStyle": "solid",
	"daySeparatorLineColor": "#9e9e9e",
	"eventBorderRadius": "3px",
	"eventTitleColor": "#6a81a4",
	"eventTitleFontSize": "clamp(0.9rem, 0.6951rem + 0.6829vw, 1.25rem)",
	"tagFontSize": "0.6rem",
	"timeTextColor": "#545454",
	"timeTextFontSize": "clamp(0.8rem, 0rem + 1.4vw, 1rem)",
	"eventBackgroundColor": "#adadad",
	"resourceFontSize": "1rem",
	"resourceTextColor": "#ffffff"
}

export const DARK_THEME: CustomTheme = {
	backgroundColor: "#303030",
	headerColor: "#212121",
	dayTextColor: "#ffffff",
	dayOfWeekSize: "2rem",
	selectedDayTextColor: "#8AB4F4",
	headerHeight: "80px",
	headerBoxShadow: "0px 8px 18px -18px rgb(0, 0, 0)",
	daySeparatorLineWidth: "1px",
	daySeparatorLineStyle: "dashed",
	daySeparatorLineColor: "#202020",
	eventBackgroundColor: "#424242",
	eventBorderRadius: "3px",
	eventTitleColor: "#8AB4F4",
	eventTitleFontSize: "clamp(0.9rem, 0.6951rem + 0.6829vw, 1.25rem)",
	resourceTextColor: "#ffffff",
	resourceFontSize: "1rem",
	tagFontSize: "0.6rem",
	timeTextColor: "#fdfdfd",
	timeTextFontSize: "clamp(0.8rem, 0rem + 1.4vw, 1rem)"
}

export const CANDY_THEME: CustomTheme = {
	"backgroundColor": "#fff4e9",
	"headerColor": "#8d6b94",
	"dayTextColor": "#f5f5f5",
	"dayOfWeekSize": "2rem",
	"selectedDayTextColor": "#fff4e9",
	"headerHeight": "80px",
	"headerBoxShadow": "0px 8px 18px -18px rgb(0, 0, 0)",
	"daySeparatorLineWidth": "1px",
	"daySeparatorLineStyle": "solid",
	"daySeparatorLineColor": "#b185a7",
	"eventTitleColor": "#fff4e9",
	"eventTitleFontSize": "clamp(0.9rem, 0.6951rem + 0.6829vw, 1.25rem)",
	"tagFontSize": "0.6rem",
	"timeTextColor": "#000000",
	"timeTextFontSize": "clamp(0.8rem, 0rem + 1.4vw, 1rem)",
	"eventBackgroundColor": "#b185a7",
	"resourceFontSize": "1rem",
	"resourceTextColor": "#dbdbdb",
	"eventBorderRadius": "15px"
}