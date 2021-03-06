import { Provider } from './Provider';

export type Streaming = {
	provider: Provider;
	idProvider: number;
	web_url: string;
	android_url: string;
	ios_url: string;
};
