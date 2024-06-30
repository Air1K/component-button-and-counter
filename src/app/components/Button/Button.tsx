import * as React from 'react';
import styles from './ButtonStyles.module.scss';
import {LuLoader2} from "react-icons/lu";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    styleButton?: 'primary' | 'secondary';
    size?: 28 | 36 | 56;
    label: string;
    state?: 'enabled' | 'loading' | 'disabled';
    counter?: boolean;
    focused?: boolean;
}

const buttonStyles = {
    base: styles.button,
    styles: {
        primary: styles.buttonPrimary,
        secondary: styles.buttonSecondary,
    },
    sizes: {
        28: styles.buttonSize28,
        36: styles.buttonSize36,
        56: styles.buttonSize56,
    },
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ styleButton = 'primary', size = 36, state = 'enabled', counter = false, focused = false, className = '', label, ...props }, ref) => {
        const [clickPosition, setClickPosition] = React.useState({ x: 0, y: 0 });
        const [isClicked, setIsClicked] = React.useState(false);
        const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setClickPosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
            setIsClicked(true);
        };

        const handleMouseUp = () => {
            setIsClicked(false);
        };

        const styleClass = buttonStyles.styles[styleButton];
        const sizeClass = buttonStyles.sizes[size];
        const counterClass = counter ? 'relative' : '';

        const classes = `${buttonStyles.base} ${styleClass} ${sizeClass} ${counterClass} ${className} ${state === 'loading' && styles.buttonLoadingGradient}`;

        const overlayStyle: React.CSSProperties = {
            left: clickPosition.x,
            top: clickPosition.y,
            transform: isClicked ? 'scale(25)' : 'scale(0)',
            opacity: isClicked ? 0.2 : 0,
            transition: 'transform 500ms cubic-bezier(0, -0.3, 0.5, 1.3), opacity 500ms cubic-bezier(0, -0.3, 0.5, 1.3)',
        };

        return (
            <button
                ref={ref}
                className={classes}
                style={{pointerEvents: state === 'loading' || state === 'disabled' ? 'none' : 'auto', opacity:  state === 'disabled' ? 0.36 : 1}}
                {...props}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                disabled={state === 'disabled' || state === 'loading'}
            >
                <div className={`${styles.content} ${state === 'loading' && styles.contentHidden}`}>
                    <span className={styles.text}>
                        {label}
                    </span>
                    {counter && <span className={styles.counter}>3</span>}
                </div>
                <span
                    className={styles.buttonPressed}
                    style={overlayStyle}
                />
                <span
                    className={`${styles.loaderContainer} ${state !== 'loading' ? styles.loaderContainerHidden : styles.loaderContainerVisible}`}><LuLoader2
                    className={styles.loader}/></span>
            </button>
        );
    },
);

Button.displayName = 'Button';
