import React, {FC} from 'react';
import styles from "../Counter/CounterStyles.module.scss";

export interface CounterProps {
    styleCounter?: 'primary' | 'secondary';
    size?: 8 | 12 | 16 | 20 | 24;
    stroke?: boolean;
    quantity: string | number;
    pulse?: boolean;
}

const counterStyles = {
    styles: {
        primary: styles.counterPrimary,
        secondary: styles.counterSecondary,
    },
    sizes: {
        8: styles.counterSize8,
        12: styles.counterSize12,
        16: styles.counterSize16,
        20: styles.counterSize20,
        24: styles.counterSize24,
    },
};

const Counter: FC<CounterProps> = ({styleCounter = 'secondary', size = 24, stroke = false, quantity, pulse = false}) => {
    const styleClass = counterStyles.styles[styleCounter];
    const sizeClass = counterStyles.sizes[size];
    const pulseClass = pulse && (size === 8 || size === 12)  ? styles.pulse : '';
    const classes = `${styles.counter} ${styleClass} ${sizeClass}`;
    return (
        <div className={classes}>
            {(size !== 12 && size !== 8) &&
                <div className={styles.counterQuantity}>
                    {(quantity > 99) ? '99+' : (typeof quantity === 'string' && quantity.length > 3) ? quantity.slice(0, 3) : quantity}
                </div>
            }
            <div className={pulseClass}/>
        </div>
    );
};

export default Counter;
