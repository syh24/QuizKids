import TabLayout, {Tab} from '@enact/sandstone/TabLayout';
import {Header, Panel} from '@enact/sandstone/Panels';
import {VirtualList, VirtualGridList} from '@enact/sandstone/VirtualList';
import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';
import Icon from '@enact/sandstone/Icon';
import ri from '@enact/ui/resolution';

import $L from '@enact/i18n/$L';
import Home from './Home';
import Account from './Account';
import { useState, useEffect } from 'react';

const Main = (props) => {
	return (
		<Panel {...props}>
			<Header title={$L('Enact Template')} />
				<TabLayout>
					<Tab title={$L('Home')} icon = "home">
						<Home />
					</Tab>
					<Tab title={$L('Account')} icon = "profile">
						<Account />
					</Tab>
				</TabLayout>
		</Panel>
	);
};
export default Main;
