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