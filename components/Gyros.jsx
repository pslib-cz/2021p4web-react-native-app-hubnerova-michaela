import React, { useState, useEffect } from 'react';
import { Gyroscope } from 'expo-sensors';

const Gyros = props => {
	const [subscription, setSubscription] = useState(null);

	const _subscribe = () => {
		Gyroscope.setUpdateInterval(1000);

		setSubscription(
			Gyroscope.addListener(data => {
				const speed = Math.abs(data.x + data.y + data.z);
				onChange(speed);
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

	const onChange = speed => {
		props.speedChanged(speed);
	}

	return (<></>);
}

export default Gyros;
