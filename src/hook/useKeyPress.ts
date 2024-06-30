import {useEffect, useState} from "react";

export const useKeyPress = (targetKey: string) => {
    const [isKeyPressed, setIsKeyPressed] = useState(false);

    const downHandler = ({key}: KeyboardEvent) => {
        if (key === targetKey) {
            setIsKeyPressed(true);
        }
    };

    const upHandler = ({key}: KeyboardEvent) => {
        if (key === targetKey) {
            setIsKeyPressed(false);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);

        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
    }, []);

    return isKeyPressed;
}
