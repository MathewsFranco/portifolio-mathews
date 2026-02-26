export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const fade = {
	hidden: { opacity: 0, y: 30 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.7,
			delay: i * 0.12,
			ease: easeOutExpo,
		},
	}),
};
