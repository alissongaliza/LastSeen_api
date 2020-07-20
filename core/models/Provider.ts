export class Provider {
	id: number;
	name: string;
	iconURL: string;
	constructor(id: number, name: string, iconURL: string) {
		this.id = id;
		this.name = name;
		this.iconURL = iconURL;
	}
}
