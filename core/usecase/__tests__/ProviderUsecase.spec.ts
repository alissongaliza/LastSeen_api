import 'reflect-metadata';

import { Provider } from 'core/models/Provider';

import { ProviderUsecaseMock } from '../provider/ProviderUsecase.mock';

// describe('ProviderUsecaseAPI', () => {
// 	// using in-memory native(ts/js data structures) database
// 	setupRepository(MODE.TEST);
// 	// concrete class that makes API calls
// 	const providerUsecase = Container.get(ProviderUsecase);
// 	it('listProviders', async () => {
// 		// searches for providers of ids from 1 to 100
// 		const providers1: Provider[] = await providerUsecase.listProviders();
// 		const providersIdem: Provider[] = await providerUsecase.listProviders();
// 		expect(providers1.length).toBeGreaterThan(0);
// 		// testing idempotency
// 		expect(providers1).toBe(providersIdem);
// 	});
// });
describe('ProviderUsecaseMock', () => {
	let providerUsecase: ProviderUsecaseMock;
	beforeEach(() => (providerUsecase = new ProviderUsecaseMock()));
	it('listProviders', async () => {
		// searches for providers of ids from 1 to 100
		const providers1: Provider[] = await providerUsecase.listProviders();
		const providersIdem: Provider[] = await providerUsecase.listProviders();
		expect(providers1.length).toBeGreaterThan(0);
		// testing idempotency
		expect(providers1).toStrictEqual(providersIdem);
	});
});
