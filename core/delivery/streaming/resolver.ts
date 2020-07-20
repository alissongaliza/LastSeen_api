import JustWatch from 'justwatch-api';

import { COMPANY_LOGO, ICON_SIZE } from 'util/constants';

export const streamingResolver = {
	Query: {},
	Streaming: {
		company: ({ id }) => {
			return new JustWatch().getProviders().then((e) => {
				const company = e.filter((el) => {
					return el.id == id;
				})[0];

				if (!company) return null;
				else {
					const iconURL = `${COMPANY_LOGO}${company.icon_url.replace('{profile}', ICON_SIZE)}`;
					return { id: company.id, name: company.clear_name, iconURL };
				}
			});
		},
	},
};
