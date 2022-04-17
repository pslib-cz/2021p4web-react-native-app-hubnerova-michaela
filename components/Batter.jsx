
import React, { useState, useEffect } from 'react';
import * as Battery from 'expo-battery';

const Batter = props => {
	const [subscription, setSubscription] = useState(null);

	async function _subscribe() {
		const batteryLevel = await Battery.getBatteryLevelAsync();
		onChange(batteryLevel);

		setSubscription(
			Battery.addBatteryLevelListener(battery => {
				setBatteryLevel(battery.batteryLevel);
				onChange(battery.batteryLevel);
			})
		);
	}
	
	const _unsubscribe = () => {
		subscription && subscription.remove();
		setSubscription(null);
	};

	useEffect(() => {
		_subscribe();
		return () => _unsubscribe();
	}, []);

	const onChange = speed => {
		props.batteryChanged(speed);
	}

	return (<></>);
}

export default Batter;
