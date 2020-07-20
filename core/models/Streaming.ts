import { Provider } from './Provider';

export class Streaming {
	provider: Provider;
	web_url: string;
	android_url: string;
	ios_url: string;
	constructor(provider: Provider, web_url: string, android_url: string, ios_url: string) {
		this.provider = provider;
		this.web_url = web_url;
		this.android_url = android_url;
		this.ios_url = ios_url;
	}
}
