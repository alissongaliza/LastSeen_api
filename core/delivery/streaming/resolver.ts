import JustWatch from 'justwatch-api';

import { COMPANY_LOGO, ICON_SIZE } from 'util/constants';

export const streamingResolver = {
	Query: {},
	Streaming: {
		provider: ({ id }) => {
			return new JustWatch().getProviders().then((e) => {
				const provider = e.filter((el) => {
					return el.id == id;
				})[0];

				if (!provider) return null;
				else {
					const iconURL = `${COMPANY_LOGO}${provider.icon_url.replace('{profile}', ICON_SIZE)}`;
					return { id: provider.id, name: provider.clear_name, iconURL };
				}
			});
		},
	},
};
