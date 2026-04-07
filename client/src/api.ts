import { pb } from './pb';

const path = '/api';

class API {

	async gateway(req: pb.APIReq): Promise<pb.APIRsp | null> {

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

	async itemEdit(e: pb.ItemEdit) {
		const req = pb.APIReq.fromObject({
			itemEdit: e,
		});
		const rsp = await this.gateway(req);
		return rsp?.itemEdit || null;
	}

	async itemListRecent() {
		const req = pb.APIReq.fromObject({
			itemListRecent: 100,
		});
		const rsp = await this.gateway(req);
		return rsp?.itemListRecent || null;
	}
}

export const api = new API();
