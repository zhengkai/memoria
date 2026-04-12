import { pb } from './pb/pb';

const path = '/api';

const gateway = async (req: pb.APIReq): Promise<pb.APIRsp | null> => {

	const buf = pb.APIReq.encode(req).finish();

	// TODO: lib.dom.d.ts 兼容问题，之后会 fix
	// https://github.com/microsoft/TypeScript/issues/59765
	const ab = buf.buffer.slice(
		buf.byteOffset,
		buf.byteOffset + buf.byteLength
	) as ArrayBuffer;

	const res = await fetch(`${path}?${req?.one}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/protobuf'
		},
		body: ab,
	});

	if (!res.ok) {
		throw new Error(`http response error: ${res.status}`);
	}

	const re = new Uint8Array(await res.arrayBuffer());
	return pb.APIRsp.decode(re);
}

class API {

	lastError: pb.Error | null = null;

	private async _apiCall<T>(key: string, req: any): Promise<T | null> {
		const o = pb.APIReq.fromObject({
			[key]: req,
		});
		const rsp = await gateway(o) as any;
		if (rsp?.error) {
			const e = pb.Error.create(rsp.error);
			this.lastError = e;
			console.warn(`api error ${e.code}: ${e.message}`);
			return null;
		}
		this.lastError = null;
		return rsp?.[key] ?? null;
	}

	async itemGet(id: number) {
		return await this._apiCall<pb.Item>('itemGet', id);
	}

	async itemSet(e: pb.ItemEdit) {
		return await this._apiCall<boolean>('itemSet', e);
	}

	async itemListRecent() {
		return await this._apiCall<pb.ItemList>('itemListRecent', 100);
	}

	async itemSearch(s: pb.ItemSearch) {
		return await this._apiCall<pb.ItemList>('itemSearch', s);
	}
}

export const api = new API();
