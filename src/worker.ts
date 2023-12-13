import template from './template';
import { ImageResponse } from '@skorfmann/workers-og';

export interface Env {}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const cover = new URL(request.url).searchParams.get('cover');
		if (!cover) {
			return new Response('Missing cover', { status: 400 });
		}

		return new ImageResponse(template(cover), {
			format: 'png',
			width: 1200,
			height: 630,
		});
	},
};
