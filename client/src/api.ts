import { pb } from './pb';

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

const apiCall = async <T>(key: string, req: any): Promise<T | null> => {
	const o = pb.APIReq.fromObject({
		[key]: req,
	});
	const rsp = await gateway(o) as any;
	return rsp?.[key] ?? null;
}

class API {

	async itemGet(id: number) {
		return await apiCall<pb.Item>('itemGet', id);
	}

	async itemSet(e: pb.ItemEdit) {
		return await apiCall<boolean>('itemSet', e);
	}

	async itemListRecent() {
		return await apiCall<pb.ItemList>('itemListRecent', 100);
	}

	async itemSearch(s: pb.ItemSearch) {
		return await apiCall<pb.ItemList>('itemSearch', s);
	}
}

export const api = new API();
