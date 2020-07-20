import JustWatch from 'justwatch-api';

export const providerResolver = {
	Query: {
		searchProviders: () => {
			return new JustWatch().getProviders().then((e) =>
				e.map(({ id, clear_name }) => {
					return { id, name: clear_name };
				})
			);
		},
	},
};
