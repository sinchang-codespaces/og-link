import template from './template';
import { ImageResponse } from '@skorfmann/workers-og';

export interface Env {}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const cover = new URL(request.url).searchParams.get('cover');
		if (!cover) {
			return new Response('Missing cover', { status: 400 });
		}
		const cache = caches.default;
		const cacheKey = cover;
		let response = await cache.match(cacheKey);

		if (!response) {
			const response = new ImageResponse(template(cover), {
				format: 'png',
				width: 1200,
				height: 630,
			});

			response.headers.append('Cache-Control', 's-maxage=604800');

			ctx.waitUntil(cache.put(cacheKey, response.clone()));
		}

		return response;
	},
};
