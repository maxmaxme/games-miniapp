import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Persik from './panels/Persik';
import Home from './panels/Home'
import {Game} from "./types";

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	// @ts-ignore
	const [popout, setPopout] = useState<Element|null>(<ScreenSpinner size='large' />);
	const [games, setGames] = useState<Game[]|null>(null);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				// @ts-ignore
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			setPopout(null);

			const game1 = {title: 'Я никогда не..', duration: '10+', players: '2+', image_url: 'https://sun9-62.userapi.com/impf/CjpreBz-At3iffDV1988mdTk3KSRWHzlBLhUeA/gF6X3_BfEN4.jpg?size=1090x604&quality=96&proxy=1&sign=e3e0b7280d2ef0a778a37888ac3b09c2&type=album'};
			setGames([
				game1,
				game1,
				game1,
				game1,
				game1,
				game1,
			])
		}
		fetchData();
	}, []);

	const go = (event: React.SyntheticEvent<EventTarget>) => {
		// @ts-ignore
		setActivePanel(event.currentTarget.dataset.to);
	};

	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id='home' go={go} games={games} />
			<Persik id='persik' go={go} />
		</View>
	);
}

export default App;

