import React from 'react';

import { SkillTitleStyled } from './Skills.styled';

interface SkillTitlePropsType {
	title: string;
	isTextLight: boolean;
}
export const SkillTitle = ({ title, isTextLight }: SkillTitlePropsType) => {
	function compareNumeric(a: number, b: number) {
		if (a > b) {
			return 1;
		} else if (a === b) {
			return 0;
		} else {
			return -1;
		}
	}
	const getIndexes = (word: string) => {
		if (word.split(' ').length > 1) {
			return;
		}
		let arr = word.split('').map((m, i) => i);
		if (arr.length) {
			let count = arr.length <= 2 ? 0 : arr.length <= 4 ? 1 : 2;
			// : Math.ceil(arr.length / 6) + 1; // instead number 2, if the word is long and word can have more than 2 flickering letters

			let num1 = Math.floor(
				arr[0] + Math.random() * (arr[arr.length - 1] - arr[0] + 1),
			);
			arr = arr.filter((f) => f !== num1);
			let resultArray = [num1];
			if (count === 0) {
				return [];
			} else if (count === 1) {
				return resultArray;
			} else {
				for (let i = 2; i <= count; i++) {
					let num = 0;
					do {
						num = Math.floor(
							arr[0] +
								Math.random() *
									(arr[arr.length - 1] + 1 - arr[0]),
						);
					} while (resultArray.includes(num));

					arr = arr.filter((f) => f !== num);
					resultArray.push(num);
				}
				return resultArray.sort(compareNumeric);
			}
		}
	};
	let words: Array<string> = title.split(' ');
	let wordsRandomIndexes = words[0].length ? [getIndexes(words[0])] : [[]];
	for (let i = 1; i < words.length; i++) {
		let array = words[i].length ? getIndexes(words[0]) : [];
		wordsRandomIndexes.push(array);
	}

	let spacesCount =
		title.split('').length -
		title.split('').filter((f) => f !== ' ').length;
	let indexesArray: Array<number> = [];

	for (let i = 0; i <= spacesCount; i++) {
		const letters = words[i].split('');
		for (let j = 0; j < letters.length; j++) {
			wordsRandomIndexes[i]?.includes(j) &&
				indexesArray.push(i === 0 ? j : j + words[i - 1].length + 1);
		}
	}

	return (
		<SkillTitleStyled isTextLight={isTextLight}>
			{title.split('').map((symbol, index) => {
				return indexesArray.includes(index) ? (
					<span key={index}>{symbol}</span>
				) : (
					symbol
				);
			})}
		</SkillTitleStyled>
	);
};
