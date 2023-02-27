import styled from 'styled-components';

export const ErrorPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
`;

export const GlitchWrapper = styled.div`
	width: 100%;
	text-align: center;
	animation: glitch 5s linear infinite;
`;

export const Glitch404 = styled.div`
        font-family: 'Poppins', sans-serif;
        font-size: 150px;
        font-weight: 700;
        line-height: 1.2;
        color: #fff;
      position: relative;
      z-index: 2;
      opacity: 0.9;
      animation: glitch 6s infinite;

      &:before {
        content: '404';
        color: black;
        position: absolute;
        z-index: -1;
        left: 0;
        right: 0;
        opacity: 0.5;
      }

      @keyframes glitch {
        3% {
          text-shadow: 7px 7px 0 red
        }
        6% {
          text-shadow: -9px 4px 0 blue;
          transform: translate(4px, -10px) skewX(3240deg)
        }
        7% {
          text-shadow: 3px -4px 0 green
        }
        9% {
          text-shadow: 0 0 3px white;
          transform: translate(0, 0) skewX(0deg)
        }
        2%, 54% {
          transform: translateX(0) skew(0deg)
        }
        55% {
          transform: translate(-2px, 6px) skew(-5530deg)
        }
        56% {
          text-shadow: 0 0 3px white;
          transform: translate(0, 0) skew(0deg)
        }
        57% {
          text-shadow: 7px 7px 0 red;
          transform: translate(4px, -10px) skew(-70deg)
        }
        58% {
          text-shadow: 0 0 3px white;
          transform: translate(0, 0) skew(0deg)
        }
        62% {
          text-shadow: 3px -4px 0 green;
          transform: translate(0, 20px) skew(0deg)
        }
        63% {
          text-shadow: 0 0 3px white;
          transform: translate(4px, -2px) skew(0deg)
        }
        64% {
          transform: translate(1px, 3px) skew(-230deg)
        }
        65% {
          transform: translate(-7px, 2px) skew(120deg)
        }
        66% {
          transform: translate(0, 0) skew(0deg)
        }
`;

export const GlitchTitle = styled.div`
	font-family: 'Poppins', sans-serif;
	font-size: 48px;
	font-weight: 700;
	line-height: 1.2;
	color: #fff;
	position: relative;
	z-index: 2;
	opacity: 0.9;
	animation: glitch 6s infinite;
`;

export const GlitchTextWrapper = styled.div`
	margin-top: 50px;
`;

export const GlitchText = styled.div`
	font-family: 'Josefin Sans', sans-serif;
	font-size: 20px;
	font-weight: 400;
	line-height: 1.2;
	color: #fff;
	position: relative;
	z-index: 2;
	opacity: 0.9;
`;

export const ButtonsWrapper = styled.div`
	margin-top: 50px;
`;

export const ButtonsTitle = styled.div`
	font-family: 'Josefin Sans', sans-serif;
	font-size: 32px;
	font-weight: 600;
	line-height: 1.2;
	color: #fff;
`;

export const ButtonsContainer = styled.div`
	margin: 20px auto 0;
	width: 300px;
	display: flex;
	justify-content: space-between;

	img {
		cursor: pointer;
	}
`;
