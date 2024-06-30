import React, {useEffect, useState} from 'react';
import {Button, ButtonProps} from "./components/Button/Button";
import {useKeyPress} from "../hook/useKeyPress";
import Counter from "./components/Counter/Counter";

function App() {
  const [stateButton, setStateButton] = useState<ButtonProps['state']>();
  const keyPress = useKeyPress('r');

  const eventHandler = (value: ButtonProps['state']) => {
      setStateButton(value);
  }

    useEffect(() => {
        if(keyPress) {
            eventHandler('enabled');
        }
    }, [keyPress]);

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <div style={{maxWidth: '760px', width: '100%'}}>
            <h3>
                Button
            </h3>
            <div style={{
                textAlign: 'center',
                padding: '16px',
                fontWeight: '500',
                fontSize: '16px',
                lineHeight: '24px',
            }}>Нажмите на ' r ' чтобы сбросить статус
            </div>
            <div style={{
                backgroundColor: 'rgba(247, 244, 242, 1)',
                borderRadius: '16px',
                padding: '48px',
                border: '1px solid rgba(50, 23, 0, 0.08)',
                display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>
                <Button
                    counter={true}
                    styleButton='primary'
                    onClick={() => eventHandler('loading')}
                    size={56}
                    label='Что сделать'
                    state={stateButton}
                />
            </div>
            <h3 style={{marginTop: '36px',}}>
                Counter
            </h3>
            <div style={{
                backgroundColor: 'rgba(247, 244, 242, 1)',
                borderRadius: '16px',
                padding: '48px',
                border: '1px solid rgba(50, 23, 0, 0.08)',
                display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>
                <Counter
                    styleCounter='primary'
                    quantity='23'
                    size={12}
                    pulse={true}
                />
            </div>
        </div>
    </div>
  );
}

export default App;
