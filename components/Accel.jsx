import React, { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';

const Accel = props => {
	const [subscription, setSubscription] = useState(null);
	const sensibility = 1.7;

	const _subscribe = () => {
		Accelerometer.setUpdateInterval(350);

		setSubscription(
			Accelerometer.addListener(data => {
				const strength = Math.sqrt(data.x * data.x + data.y * data.y + data.z * data.z);

				if (strength >= sensibility) {
					onShake();
				}
			})
		);
	};

	const _unsubscribe = () => {
		subscription && subscription.remove();
		setSubscription(null);
	};

	useEffect(() => {
		_subscribe();
		return () => _unsubscribe();
	}, []);

	const onShake = () => {
		props.shakeDetected();
	}
	
	return (<></>);
}

export default Accel;
