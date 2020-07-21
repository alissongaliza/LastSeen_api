import { GenreResolver } from './genre/resolver';
import { MovieResolver } from './movie/resolver';
import { ProviderResolver } from './provider/resolver';
import { StreamingResolver } from './streaming/resolver';

export const resolvers = [MovieResolver, StreamingResolver, ProviderResolver, GenreResolver] as const;
