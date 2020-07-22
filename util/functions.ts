import { redis } from 'core/repository';

export type HashScanType = {
	cursor: number;
	values: string[];
};

// TODO make gereric
export const iterateHash = async (
	hash: string,
	cursor: number,
	match: string,
	count: number
): Promise<HashScanType> => {
	const [newCursor, stream] = await redis.hscan(hash, cursor, 'MATCH', match, 'COUNT', count);
	return { cursor: parseInt(newCursor), values: stream };
};
