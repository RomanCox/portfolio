import React, { useEffect, useRef } from 'react';

import { CanvasStyled } from './Canvas.styled';

type ColorType = 'red' | 'green';

interface BackgroundPropsType {
	color: ColorType;
}

export const Canvas = ({ color }: BackgroundPropsType) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;

		const textColor = color === 'red' ? '#990014' : '#008000';

		if (canvas == null) {
			return;
		}

		const ctx = canvas.getContext('2d');

		// making the canvas full screen
		canvas.height = window.innerHeight;
		canvas.width = window.innerWidth;

		// chinese characters - taken from the unicode charset
		const matrix =
			'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}';
		// const matrix =
		('鑑於對人類家庭所有成員的固有尊嚴及其平等的和不移的權利的承認，乃是世界自由、正義與和平的基礎');
		// converting the string into an array of single characters
		const matrixArray = matrix.split('');

		const fontSize = 12;
		const columns = canvas.width / fontSize; // number of columns for the rain
		// an array of drops - one per column
		const drops: any[] = [];
		// x below is the x coordinate
		// 1 = y coordinate of the drop(same for every drop initially)
		for (let x = 0; x < columns; x++) {
			drops[x] = 1;
		}

		// drawing the characters
		function draw() {
			if (ctx == null || canvas == null) {
				return;
			}
			// Black BG for the canvas
			// translucent BG to show trail
			ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.fillStyle = textColor; // red text
			ctx.font = `${fontSize}` + 'px Noto Sans TC';
			// looping over drops
			for (let i = 0; i < drops.length; i++) {
				// a random chinese character to print
				const text =
					matrixArray[Math.floor(Math.random() * matrixArray.length)];
				// x = i*font_size, y = value of drops[i]*font_size
				ctx.fillText(text, i * fontSize, drops[i] * fontSize);

				// sending the drop back to the top randomly after it has crossed the screen
				// adding a randomness to the reset to make the drops scattered on the Y axis
				if (
					drops[i] * fontSize > canvas.height &&
					Math.random() > 0.975
				) {
					drops[i] = 0;
				}

				// incrementing Y coordinate
				drops[i]++;
			}
		}
		setInterval(draw, 45);
	}, []);

	return <CanvasStyled id='canvas' ref={canvasRef} />;
};
