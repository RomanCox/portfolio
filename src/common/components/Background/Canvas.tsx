import React, {useEffect, useRef} from 'react';
import style from './Canvas.module.scss';

type ColorType = 'red' | 'green';

type BackgroundPropsType = {
    color: ColorType
};

export const Canvas = ({color}: BackgroundPropsType) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        let canvas = canvasRef.current;

        let textColor = color === 'red' ? '#990014' : '#008000';

        if (!canvas) {
            return
        }

        let ctx = canvas.getContext('2d');
        console.log(ctx)

        //making the canvas full screen
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;

        //chinese characters - taken from the unicode charset
        let matrix = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}';
        //converting the string into an array of single characters
        let matrixArray = matrix.split('');

        let font_size = 15;
        let columns = canvas.width / font_size; //number of columns for the rain
        //an array of drops - one per column
        let drops: any[] = [];
        //x below is the x coordinate
        //1 = y coordinate of the drop(same for every drop initially)
        for (let x = 0; x < columns; x++)
            drops[x] = 1;

        //drawing the characters
        function draw() {
            if (!ctx || !canvas) {
                return
            }
            //Black BG for the canvas
            //translucent BG to show trail
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = textColor;//red text
            ctx.font = font_size + 'px system-ui';
            //looping over drops
            for (let i = 0; i < drops.length; i++) {
                //a random chinese character to print
                let text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                //x = i*font_size, y = value of drops[i]*font_size
                ctx.fillText(text, i * font_size, drops[i] * font_size);

                //sending the drop back to the top randomly after it has crossed the screen
                //adding a randomness to the reset to make the drops scattered on the Y axis
                if (drops[i] * font_size > canvas.height && Math.random() > 0.975)
                    drops[i] = 0;

                //incrementing Y coordinate
                drops[i]++;
            }
        }
        setInterval(draw, 35);
    }, [])

    return (
            <canvas
                id='canvas'
                className={style.canvas}
                ref={canvasRef}
            ></canvas>
    );
}