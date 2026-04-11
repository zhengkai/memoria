//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
//#region \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
//#endregion
//#region src/component/edit/edit.html?raw
var edit_default = "<form>\n<div class=\"row\">\n	<div class=\"col-12\">\n		<h1>Edit <span class=\"id\"></span></h1>\n	</div>\n</div>\n<div class=\"row\">\n	<div class=\"col-12\">\n		<input name=\"title\" class=\"form-control\" placeholder=\"Title\">\n	</div>\n</div>\n<div class=\"row\">\n	<div class=\"col-12\">\n		<textarea name=\"content\" class=\"form-control\" rows=\"6\"></textarea>\n	</div>\n</div>\n<div class=\"row\">\n	<div class=\"col\">\n		<label class=\"form-check-label\">\n			<input class=\"form-check-input\" type=\"radio\" name=\"format\" value=\"0\">\n				Plain\n		</label><label class=\"form-check-label\">\n			<input class=\"form-check-input\" type=\"radio\" name=\"format\" value=\"1\">\n				Markdown\n		</label><label class=\"form-check-label\">\n			<input class=\"form-check-input\" type=\"radio\" name=\"format\" value=\"2\" checked>\n				AsciiDoc\n		</label>\n	</div>\n</div>\n<div class=\"row\">\n	<div class=\"col-auto\">\n		<label class=\"form-check-label\">\n			<input type=\"checkbox\" name=\"original\" value=\"1\">\n				原创\n		</label>\n	</div>\n	<div class=\"col-auto\">\n		<label class=\"form-check-label\">\n			<input type=\"checkbox\" name=\"trivial\" value=\"1\">\n				琐事\n		</label>\n	</div>\n	<div class=\"col-auto\">\n		<label class=\"form-check-label\">\n			<input type=\"checkbox\" name=\"hide\" value=\"1\">\n				隐藏\n		</label>\n	</div>\n</div>\n<div class=\"row\">\n	<label for=\"itemRoot\" class=\"col-3 col-form-label text-end\">\n		root\n	</label>\n	<div class=\"col-4\">\n		<input name=\"root\" id=\"itemRoot\" type=\"number\" class=\"form-control\">\n	</div>\n</div>\n<div class=\"row\">\n	<label for=\"timeCreate\" class=\"col-3 col-form-label text-end\">\n		创建日期\n	</label>\n	<div class=\"col\">\n		<input name=\"time-create\" id=\"timeCreate\" type=\"text\" class=\"form-control\">\n	</div>\n</div>\n<div class=\"row\">\n	<label for=\"ogImage\" class=\"col-3 col-form-label text-end\">\n		OpenGraph 封面\n	</label>\n	<div class=\"col-4\">\n		<input name=\"og-image\" id=\"ogImage\" type=\"number\" class=\"form-control\">\n	</div>\n</div>\n<div class=\"row\">\n	<label for=\"ogDescription\" class=\"col-3 col-form-label text-end\">\n		OpenGraph 描述\n	</label>\n	<div class=\"col\">\n		<input name=\"og-description\" id=\"ogDescription\" type=\"text\" class=\"form-control\">\n	</div>\n</div>\n<div class=\"row\">\n	<label for=\"ogTag\" class=\"col-3 col-form-label text-end\">\n		OpenGraph 标签\n	</label>\n	<div class=\"col\">\n		<input name=\"og-tag\" id=\"ogTag\" type=\"text\" class=\"form-control\">\n	</div>\n</div>\n\n<div class=\"row\">\n	<div class=\"col\">\n	</div>\n	<div class=\"col-auto\">\n		<button type=\"submit\" class=\"btn btn-primary\">Save</button>\n	</div>\n</div>\n</form>\n";
//#endregion
//#region node_modules/@protobufjs/aspromise/index.js
var require_aspromise = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = asPromise;
	/**
	* Callback as used by {@link util.asPromise}.
	* @typedef asPromiseCallback
	* @type {function}
	* @param {Error|null} error Error, if any
	* @param {...*} params Additional arguments
	* @returns {undefined}
	*/
	/**
	* Returns a promise from a node-style callback function.
	* @memberof util
	* @param {asPromiseCallback} fn Function to call
	* @param {*} ctx Function context
	* @param {...*} params Function arguments
	* @returns {Promise<*>} Promisified function
	*/
	function asPromise(fn, ctx) {
		var params = new Array(arguments.length - 1), offset = 0, index = 2, pending = true;
		while (index < arguments.length) params[offset++] = arguments[index++];
		return new Promise(function executor(resolve, reject) {
			params[offset] = function callback(err) {
				if (pending) {
					pending = false;
					if (err) reject(err);
					else {
						var params = new Array(arguments.length - 1), offset = 0;
						while (offset < params.length) params[offset++] = arguments[offset];
						resolve.apply(null, params);
					}
				}
			};
			try {
				fn.apply(ctx || null, params);
			} catch (err) {
				if (pending) {
					pending = false;
					reject(err);
				}
			}
		});
	}
}));
//#endregion
//#region node_modules/@protobufjs/base64/index.js
var require_base64 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* A minimal base64 implementation for number arrays.
	* @memberof util
	* @namespace
	*/
	var base64 = exports;
	/**
	* Calculates the byte length of a base64 encoded string.
	* @param {string} string Base64 encoded string
	* @returns {number} Byte length
	*/
	base64.length = function length(string) {
		var p = string.length;
		if (!p) return 0;
		var n = 0;
		while (--p % 4 > 1 && string.charAt(p) === "=") ++n;
		return Math.ceil(string.length * 3) / 4 - n;
	};
	var b64 = new Array(64);
	var s64 = new Array(123);
	for (var i = 0; i < 64;) s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
	/**
	* Encodes a buffer to a base64 encoded string.
	* @param {Uint8Array} buffer Source buffer
	* @param {number} start Source start
	* @param {number} end Source end
	* @returns {string} Base64 encoded string
	*/
	base64.encode = function encode(buffer, start, end) {
		var parts = null, chunk = [];
		var i = 0, j = 0, t;
		while (start < end) {
			var b = buffer[start++];
			switch (j) {
				case 0:
					chunk[i++] = b64[b >> 2];
					t = (b & 3) << 4;
					j = 1;
					break;
				case 1:
					chunk[i++] = b64[t | b >> 4];
					t = (b & 15) << 2;
					j = 2;
					break;
				case 2:
					chunk[i++] = b64[t | b >> 6];
					chunk[i++] = b64[b & 63];
					j = 0;
					break;
			}
			if (i > 8191) {
				(parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
				i = 0;
			}
		}
		if (j) {
			chunk[i++] = b64[t];
			chunk[i++] = 61;
			if (j === 1) chunk[i++] = 61;
		}
		if (parts) {
			if (i) parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
			return parts.join("");
		}
		return String.fromCharCode.apply(String, chunk.slice(0, i));
	};
	var invalidEncoding = "invalid encoding";
	/**
	* Decodes a base64 encoded string to a buffer.
	* @param {string} string Source string
	* @param {Uint8Array} buffer Destination buffer
	* @param {number} offset Destination offset
	* @returns {number} Number of bytes written
	* @throws {Error} If encoding is invalid
	*/
	base64.decode = function decode(string, buffer, offset) {
		var start = offset;
		var j = 0, t;
		for (var i = 0; i < string.length;) {
			var c = string.charCodeAt(i++);
			if (c === 61 && j > 1) break;
			if ((c = s64[c]) === void 0) throw Error(invalidEncoding);
			switch (j) {
				case 0:
					t = c;
					j = 1;
					break;
				case 1:
					buffer[offset++] = t << 2 | (c & 48) >> 4;
					t = c;
					j = 2;
					break;
				case 2:
					buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
					t = c;
					j = 3;
					break;
				case 3:
					buffer[offset++] = (t & 3) << 6 | c;
					j = 0;
					break;
			}
		}
		if (j === 1) throw Error(invalidEncoding);
		return offset - start;
	};
	/**
	* Tests if the specified string appears to be base64 encoded.
	* @param {string} string String to test
	* @returns {boolean} `true` if probably base64 encoded, otherwise false
	*/
	base64.test = function test(string) {
		return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
	};
}));
//#endregion
//#region node_modules/@protobufjs/eventemitter/index.js
var require_eventemitter = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = EventEmitter;
	/**
	* Constructs a new event emitter instance.
	* @classdesc A minimal event emitter.
	* @memberof util
	* @constructor
	*/
	function EventEmitter() {
		/**
		* Registered listeners.
		* @type {Object.<string,*>}
		* @private
		*/
		this._listeners = {};
	}
	/**
	* Registers an event listener.
	* @param {string} evt Event name
	* @param {function} fn Listener
	* @param {*} [ctx] Listener context
	* @returns {util.EventEmitter} `this`
	*/
	EventEmitter.prototype.on = function on(evt, fn, ctx) {
		(this._listeners[evt] || (this._listeners[evt] = [])).push({
			fn,
			ctx: ctx || this
		});
		return this;
	};
	/**
	* Removes an event listener or any matching listeners if arguments are omitted.
	* @param {string} [evt] Event name. Removes all listeners if omitted.
	* @param {function} [fn] Listener to remove. Removes all listeners of `evt` if omitted.
	* @returns {util.EventEmitter} `this`
	*/
	EventEmitter.prototype.off = function off(evt, fn) {
		if (evt === void 0) this._listeners = {};
		else if (fn === void 0) this._listeners[evt] = [];
		else {
			var listeners = this._listeners[evt];
			for (var i = 0; i < listeners.length;) if (listeners[i].fn === fn) listeners.splice(i, 1);
			else ++i;
		}
		return this;
	};
	/**
	* Emits an event by calling its listeners with the specified arguments.
	* @param {string} evt Event name
	* @param {...*} args Arguments
	* @returns {util.EventEmitter} `this`
	*/
	EventEmitter.prototype.emit = function emit(evt) {
		var listeners = this._listeners[evt];
		if (listeners) {
			var args = [], i = 1;
			for (; i < arguments.length;) args.push(arguments[i++]);
			for (i = 0; i < listeners.length;) listeners[i].fn.apply(listeners[i++].ctx, args);
		}
		return this;
	};
}));
//#endregion
//#region node_modules/@protobufjs/float/index.js
var require_float = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = factory(factory);
	/**
	* Reads / writes floats / doubles from / to buffers.
	* @name util.float
	* @namespace
	*/
	/**
	* Writes a 32 bit float to a buffer using little endian byte order.
	* @name util.float.writeFloatLE
	* @function
	* @param {number} val Value to write
	* @param {Uint8Array} buf Target buffer
	* @param {number} pos Target buffer offset
	* @returns {undefined}
	*/
	/**
	* Writes a 32 bit float to a buffer using big endian byte order.
	* @name util.float.writeFloatBE
	* @function
	* @param {number} val Value to write
	* @param {Uint8Array} buf Target buffer
	* @param {number} pos Target buffer offset
	* @returns {undefined}
	*/
	/**
	* Reads a 32 bit float from a buffer using little endian byte order.
	* @name util.float.readFloatLE
	* @function
	* @param {Uint8Array} buf Source buffer
	* @param {number} pos Source buffer offset
	* @returns {number} Value read
	*/
	/**
	* Reads a 32 bit float from a buffer using big endian byte order.
	* @name util.float.readFloatBE
	* @function
	* @param {Uint8Array} buf Source buffer
	* @param {number} pos Source buffer offset
	* @returns {number} Value read
	*/
	/**
	* Writes a 64 bit double to a buffer using little endian byte order.
	* @name util.float.writeDoubleLE
	* @function
	* @param {number} val Value to write
	* @param {Uint8Array} buf Target buffer
	* @param {number} pos Target buffer offset
	* @returns {undefined}
	*/
	/**
	* Writes a 64 bit double to a buffer using big endian byte order.
	* @name util.float.writeDoubleBE
	* @function
	* @param {number} val Value to write
	* @param {Uint8Array} buf Target buffer
	* @param {number} pos Target buffer offset
	* @returns {undefined}
	*/
	/**
	* Reads a 64 bit double from a buffer using little endian byte order.
	* @name util.float.readDoubleLE
	* @function
	* @param {Uint8Array} buf Source buffer
	* @param {number} pos Source buffer offset
	* @returns {number} Value read
	*/
	/**
	* Reads a 64 bit double from a buffer using big endian byte order.
	* @name util.float.readDoubleBE
	* @function
	* @param {Uint8Array} buf Source buffer
	* @param {number} pos Source buffer offset
	* @returns {number} Value read
	*/
	function factory(exports$1) {
		if (typeof Float32Array !== "undefined") (function() {
			var f32 = new Float32Array([-0]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
			function writeFloat_f32_cpy(val, buf, pos) {
				f32[0] = val;
				buf[pos] = f8b[0];
				buf[pos + 1] = f8b[1];
				buf[pos + 2] = f8b[2];
				buf[pos + 3] = f8b[3];
			}
			function writeFloat_f32_rev(val, buf, pos) {
				f32[0] = val;
				buf[pos] = f8b[3];
				buf[pos + 1] = f8b[2];
				buf[pos + 2] = f8b[1];
				buf[pos + 3] = f8b[0];
			}
			/* istanbul ignore next */
			exports$1.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
			/* istanbul ignore next */
			exports$1.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
			function readFloat_f32_cpy(buf, pos) {
				f8b[0] = buf[pos];
				f8b[1] = buf[pos + 1];
				f8b[2] = buf[pos + 2];
				f8b[3] = buf[pos + 3];
				return f32[0];
			}
			function readFloat_f32_rev(buf, pos) {
				f8b[3] = buf[pos];
				f8b[2] = buf[pos + 1];
				f8b[1] = buf[pos + 2];
				f8b[0] = buf[pos + 3];
				return f32[0];
			}
			/* istanbul ignore next */
			exports$1.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
			/* istanbul ignore next */
			exports$1.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
		})();
		else (function() {
			function writeFloat_ieee754(writeUint, val, buf, pos) {
				var sign = val < 0 ? 1 : 0;
				if (sign) val = -val;
				if (val === 0) writeUint(1 / val > 0 ? 0 : 2147483648, buf, pos);
				else if (isNaN(val)) writeUint(2143289344, buf, pos);
				else if (val > 34028234663852886e22) writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
				else if (val < 11754943508222875e-54) writeUint((sign << 31 | Math.round(val / 1401298464324817e-60)) >>> 0, buf, pos);
				else {
					var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
					writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
				}
			}
			exports$1.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
			exports$1.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
			function readFloat_ieee754(readUint, buf, pos) {
				var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
				return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
			}
			exports$1.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
			exports$1.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
		})();
		if (typeof Float64Array !== "undefined") (function() {
			var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
			function writeDouble_f64_cpy(val, buf, pos) {
				f64[0] = val;
				buf[pos] = f8b[0];
				buf[pos + 1] = f8b[1];
				buf[pos + 2] = f8b[2];
				buf[pos + 3] = f8b[3];
				buf[pos + 4] = f8b[4];
				buf[pos + 5] = f8b[5];
				buf[pos + 6] = f8b[6];
				buf[pos + 7] = f8b[7];
			}
			function writeDouble_f64_rev(val, buf, pos) {
				f64[0] = val;
				buf[pos] = f8b[7];
				buf[pos + 1] = f8b[6];
				buf[pos + 2] = f8b[5];
				buf[pos + 3] = f8b[4];
				buf[pos + 4] = f8b[3];
				buf[pos + 5] = f8b[2];
				buf[pos + 6] = f8b[1];
				buf[pos + 7] = f8b[0];
			}
			/* istanbul ignore next */
			exports$1.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
			/* istanbul ignore next */
			exports$1.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
			function readDouble_f64_cpy(buf, pos) {
				f8b[0] = buf[pos];
				f8b[1] = buf[pos + 1];
				f8b[2] = buf[pos + 2];
				f8b[3] = buf[pos + 3];
				f8b[4] = buf[pos + 4];
				f8b[5] = buf[pos + 5];
				f8b[6] = buf[pos + 6];
				f8b[7] = buf[pos + 7];
				return f64[0];
			}
			function readDouble_f64_rev(buf, pos) {
				f8b[7] = buf[pos];
				f8b[6] = buf[pos + 1];
				f8b[5] = buf[pos + 2];
				f8b[4] = buf[pos + 3];
				f8b[3] = buf[pos + 4];
				f8b[2] = buf[pos + 5];
				f8b[1] = buf[pos + 6];
				f8b[0] = buf[pos + 7];
				return f64[0];
			}
			/* istanbul ignore next */
			exports$1.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
			/* istanbul ignore next */
			exports$1.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
		})();
		else (function() {
			function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
				var sign = val < 0 ? 1 : 0;
				if (sign) val = -val;
				if (val === 0) {
					writeUint(0, buf, pos + off0);
					writeUint(1 / val > 0 ? 0 : 2147483648, buf, pos + off1);
				} else if (isNaN(val)) {
					writeUint(0, buf, pos + off0);
					writeUint(2146959360, buf, pos + off1);
				} else if (val > 17976931348623157e292) {
					writeUint(0, buf, pos + off0);
					writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
				} else {
					var mantissa;
					if (val < 22250738585072014e-324) {
						mantissa = val / 5e-324;
						writeUint(mantissa >>> 0, buf, pos + off0);
						writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
					} else {
						var exponent = Math.floor(Math.log(val) / Math.LN2);
						if (exponent === 1024) exponent = 1023;
						mantissa = val * Math.pow(2, -exponent);
						writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
						writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
					}
				}
			}
			exports$1.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
			exports$1.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
			function readDouble_ieee754(readUint, off0, off1, buf, pos) {
				var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
				var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
				return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
			}
			exports$1.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
			exports$1.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
		})();
		return exports$1;
	}
	function writeUintLE(val, buf, pos) {
		buf[pos] = val & 255;
		buf[pos + 1] = val >>> 8 & 255;
		buf[pos + 2] = val >>> 16 & 255;
		buf[pos + 3] = val >>> 24;
	}
	function writeUintBE(val, buf, pos) {
		buf[pos] = val >>> 24;
		buf[pos + 1] = val >>> 16 & 255;
		buf[pos + 2] = val >>> 8 & 255;
		buf[pos + 3] = val & 255;
	}
	function readUintLE(buf, pos) {
		return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
	}
	function readUintBE(buf, pos) {
		return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
	}
}));
//#endregion
//#region node_modules/@protobufjs/inquire/index.js
var require_inquire = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = inquire;
	/**
	* Requires a module only if available.
	* @memberof util
	* @param {string} moduleName Module to require
	* @returns {?Object} Required module if available and not empty, otherwise `null`
	*/
	function inquire(moduleName) {
		try {
			var mod = eval("quire".replace(/^/, "re"))(moduleName);
			if (mod && (mod.length || Object.keys(mod).length)) return mod;
		} catch (e) {}
		return null;
	}
}));
//#endregion
//#region node_modules/@protobufjs/utf8/index.js
var require_utf8 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* A minimal UTF8 implementation for number arrays.
	* @memberof util
	* @namespace
	*/
	var utf8 = exports;
	/**
	* Calculates the UTF8 byte length of a string.
	* @param {string} string String
	* @returns {number} Byte length
	*/
	utf8.length = function utf8_length(string) {
		var len = 0, c = 0;
		for (var i = 0; i < string.length; ++i) {
			c = string.charCodeAt(i);
			if (c < 128) len += 1;
			else if (c < 2048) len += 2;
			else if ((c & 64512) === 55296 && (string.charCodeAt(i + 1) & 64512) === 56320) {
				++i;
				len += 4;
			} else len += 3;
		}
		return len;
	};
	/**
	* Reads UTF8 bytes as a string.
	* @param {Uint8Array} buffer Source buffer
	* @param {number} start Source start
	* @param {number} end Source end
	* @returns {string} String read
	*/
	utf8.read = function utf8_read(buffer, start, end) {
		if (end - start < 1) return "";
		var parts = null, chunk = [], i = 0, t;
		while (start < end) {
			t = buffer[start++];
			if (t < 128) chunk[i++] = t;
			else if (t > 191 && t < 224) chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
			else if (t > 239 && t < 365) {
				t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 65536;
				chunk[i++] = 55296 + (t >> 10);
				chunk[i++] = 56320 + (t & 1023);
			} else chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
			if (i > 8191) {
				(parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
				i = 0;
			}
		}
		if (parts) {
			if (i) parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
			return parts.join("");
		}
		return String.fromCharCode.apply(String, chunk.slice(0, i));
	};
	/**
	* Writes a string as UTF8 bytes.
	* @param {string} string Source string
	* @param {Uint8Array} buffer Destination buffer
	* @param {number} offset Destination offset
	* @returns {number} Bytes written
	*/
	utf8.write = function utf8_write(string, buffer, offset) {
		var start = offset, c1, c2;
		for (var i = 0; i < string.length; ++i) {
			c1 = string.charCodeAt(i);
			if (c1 < 128) buffer[offset++] = c1;
			else if (c1 < 2048) {
				buffer[offset++] = c1 >> 6 | 192;
				buffer[offset++] = c1 & 63 | 128;
			} else if ((c1 & 64512) === 55296 && ((c2 = string.charCodeAt(i + 1)) & 64512) === 56320) {
				c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
				++i;
				buffer[offset++] = c1 >> 18 | 240;
				buffer[offset++] = c1 >> 12 & 63 | 128;
				buffer[offset++] = c1 >> 6 & 63 | 128;
				buffer[offset++] = c1 & 63 | 128;
			} else {
				buffer[offset++] = c1 >> 12 | 224;
				buffer[offset++] = c1 >> 6 & 63 | 128;
				buffer[offset++] = c1 & 63 | 128;
			}
		}
		return offset - start;
	};
}));
//#endregion
//#region node_modules/@protobufjs/pool/index.js
var require_pool = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = pool;
	/**
	* An allocator as used by {@link util.pool}.
	* @typedef PoolAllocator
	* @type {function}
	* @param {number} size Buffer size
	* @returns {Uint8Array} Buffer
	*/
	/**
	* A slicer as used by {@link util.pool}.
	* @typedef PoolSlicer
	* @type {function}
	* @param {number} start Start offset
	* @param {number} end End offset
	* @returns {Uint8Array} Buffer slice
	* @this {Uint8Array}
	*/
	/**
	* A general purpose buffer pool.
	* @memberof util
	* @function
	* @param {PoolAllocator} alloc Allocator
	* @param {PoolSlicer} slice Slicer
	* @param {number} [size=8192] Slab size
	* @returns {PoolAllocator} Pooled allocator
	*/
	function pool(alloc, slice, size) {
		var SIZE = size || 8192;
		var MAX = SIZE >>> 1;
		var slab = null;
		var offset = SIZE;
		return function pool_alloc(size) {
			if (size < 1 || size > MAX) return alloc(size);
			if (offset + size > SIZE) {
				slab = alloc(SIZE);
				offset = 0;
			}
			var buf = slice.call(slab, offset, offset += size);
			if (offset & 7) offset = (offset | 7) + 1;
			return buf;
		};
	}
}));
//#endregion
//#region node_modules/protobufjs/src/util/longbits.js
var require_longbits = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = LongBits;
	var util = require_minimal$1();
	/**
	* Constructs new long bits.
	* @classdesc Helper class for working with the low and high bits of a 64 bit value.
	* @memberof util
	* @constructor
	* @param {number} lo Low 32 bits, unsigned
	* @param {number} hi High 32 bits, unsigned
	*/
	function LongBits(lo, hi) {
		/**
		* Low bits.
		* @type {number}
		*/
		this.lo = lo >>> 0;
		/**
		* High bits.
		* @type {number}
		*/
		this.hi = hi >>> 0;
	}
	/**
	* Zero bits.
	* @memberof util.LongBits
	* @type {util.LongBits}
	*/
	var zero = LongBits.zero = new LongBits(0, 0);
	zero.toNumber = function() {
		return 0;
	};
	zero.zzEncode = zero.zzDecode = function() {
		return this;
	};
	zero.length = function() {
		return 1;
	};
	/**
	* Zero hash.
	* @memberof util.LongBits
	* @type {string}
	*/
	var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
	/**
	* Constructs new long bits from the specified number.
	* @param {number} value Value
	* @returns {util.LongBits} Instance
	*/
	LongBits.fromNumber = function fromNumber(value) {
		if (value === 0) return zero;
		var sign = value < 0;
		if (sign) value = -value;
		var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
		if (sign) {
			hi = ~hi >>> 0;
			lo = ~lo >>> 0;
			if (++lo > 4294967295) {
				lo = 0;
				if (++hi > 4294967295) hi = 0;
			}
		}
		return new LongBits(lo, hi);
	};
	/**
	* Constructs new long bits from a number, long or string.
	* @param {Long|number|string} value Value
	* @returns {util.LongBits} Instance
	*/
	LongBits.from = function from(value) {
		if (typeof value === "number") return LongBits.fromNumber(value);
		if (util.isString(value))
 /* istanbul ignore else */
		if (util.Long) value = util.Long.fromString(value);
		else return LongBits.fromNumber(parseInt(value, 10));
		return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
	};
	/**
	* Converts this long bits to a possibly unsafe JavaScript number.
	* @param {boolean} [unsigned=false] Whether unsigned or not
	* @returns {number} Possibly unsafe number
	*/
	LongBits.prototype.toNumber = function toNumber(unsigned) {
		if (!unsigned && this.hi >>> 31) {
			var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
			if (!lo) hi = hi + 1 >>> 0;
			return -(lo + hi * 4294967296);
		}
		return this.lo + this.hi * 4294967296;
	};
	/**
	* Converts this long bits to a long.
	* @param {boolean} [unsigned=false] Whether unsigned or not
	* @returns {Long} Long
	*/
	LongBits.prototype.toLong = function toLong(unsigned) {
		return util.Long ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : {
			low: this.lo | 0,
			high: this.hi | 0,
			unsigned: Boolean(unsigned)
		};
	};
	var charCodeAt = String.prototype.charCodeAt;
	/**
	* Constructs new long bits from the specified 8 characters long hash.
	* @param {string} hash Hash
	* @returns {util.LongBits} Bits
	*/
	LongBits.fromHash = function fromHash(hash) {
		if (hash === zeroHash) return zero;
		return new LongBits((charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0, (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0);
	};
	/**
	* Converts this long bits to a 8 characters long hash.
	* @returns {string} Hash
	*/
	LongBits.prototype.toHash = function toHash() {
		return String.fromCharCode(this.lo & 255, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, this.hi & 255, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
	};
	/**
	* Zig-zag encodes this long bits.
	* @returns {util.LongBits} `this`
	*/
	LongBits.prototype.zzEncode = function zzEncode() {
		var mask = this.hi >> 31;
		this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
		this.lo = (this.lo << 1 ^ mask) >>> 0;
		return this;
	};
	/**
	* Zig-zag decodes this long bits.
	* @returns {util.LongBits} `this`
	*/
	LongBits.prototype.zzDecode = function zzDecode() {
		var mask = -(this.lo & 1);
		this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
		this.hi = (this.hi >>> 1 ^ mask) >>> 0;
		return this;
	};
	/**
	* Calculates the length of this longbits when encoded as a varint.
	* @returns {number} Length
	*/
	LongBits.prototype.length = function length() {
		var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
		return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
	};
}));
//#endregion
//#region node_modules/protobufjs/src/util/minimal.js
var require_minimal$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var util = exports;
	util.asPromise = require_aspromise();
	util.base64 = require_base64();
	util.EventEmitter = require_eventemitter();
	util.float = require_float();
	util.inquire = require_inquire();
	util.utf8 = require_utf8();
	util.pool = require_pool();
	util.LongBits = require_longbits();
	/**
	* Whether running within node or not.
	* @memberof util
	* @type {boolean}
	*/
	util.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
	/**
	* Global object reference.
	* @memberof util
	* @type {Object}
	*/
	util.global = util.isNode && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || exports;
	/**
	* An immuable empty array.
	* @memberof util
	* @type {Array.<*>}
	* @const
	*/
	util.emptyArray = Object.freeze ? Object.freeze([]) : [];
	/**
	* An immutable empty object.
	* @type {Object}
	* @const
	*/
	util.emptyObject = Object.freeze ? Object.freeze({}) : (	/* istanbul ignore next */ {});
	/**
	* Tests if the specified value is an integer.
	* @function
	* @param {*} value Value to test
	* @returns {boolean} `true` if the value is an integer
	*/
	util.isInteger = Number.isInteger || function isInteger(value) {
		return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
	};
	/**
	* Tests if the specified value is a string.
	* @param {*} value Value to test
	* @returns {boolean} `true` if the value is a string
	*/
	util.isString = function isString(value) {
		return typeof value === "string" || value instanceof String;
	};
	/**
	* Tests if the specified value is a non-null object.
	* @param {*} value Value to test
	* @returns {boolean} `true` if the value is a non-null object
	*/
	util.isObject = function isObject(value) {
		return value && typeof value === "object";
	};
	/**
	* Checks if a property on a message is considered to be present.
	* This is an alias of {@link util.isSet}.
	* @function
	* @param {Object} obj Plain object or message instance
	* @param {string} prop Property name
	* @returns {boolean} `true` if considered to be present, otherwise `false`
	*/
	util.isset = util.isSet = function isSet(obj, prop) {
		var value = obj[prop];
		if (value != null && obj.hasOwnProperty(prop)) return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
		return false;
	};
	/**
	* Any compatible Buffer instance.
	* This is a minimal stand-alone definition of a Buffer instance. The actual type is that exported by node's typings.
	* @interface Buffer
	* @extends Uint8Array
	*/
	/**
	* Node's Buffer class if available.
	* @type {Constructor<Buffer>}
	*/
	util.Buffer = (function() {
		try {
			var Buffer = util.inquire("buffer").Buffer;
			return Buffer.prototype.utf8Write ? Buffer : null;
		} catch (e) {
			/* istanbul ignore next */
			return null;
		}
	})();
	util._Buffer_from = null;
	util._Buffer_allocUnsafe = null;
	/**
	* Creates a new buffer of whatever type supported by the environment.
	* @param {number|number[]} [sizeOrArray=0] Buffer size or number array
	* @returns {Uint8Array|Buffer} Buffer
	*/
	util.newBuffer = function newBuffer(sizeOrArray) {
		/* istanbul ignore next */
		return typeof sizeOrArray === "number" ? util.Buffer ? util._Buffer_allocUnsafe(sizeOrArray) : new util.Array(sizeOrArray) : util.Buffer ? util._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
	};
	/**
	* Array implementation used in the browser. `Uint8Array` if supported, otherwise `Array`.
	* @type {Constructor<Uint8Array>}
	*/
	util.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
	/**
	* Any compatible Long instance.
	* This is a minimal stand-alone definition of a Long instance. The actual type is that exported by long.js.
	* @interface Long
	* @property {number} low Low bits
	* @property {number} high High bits
	* @property {boolean} unsigned Whether unsigned or not
	*/
	/**
	* Long.js's Long class if available.
	* @type {Constructor<Long>}
	*/
	util.Long = util.global.dcodeIO && util.global.dcodeIO.Long || util.global.Long || util.inquire("long");
	/**
	* Regular expression used to verify 2 bit (`bool`) map keys.
	* @type {RegExp}
	* @const
	*/
	util.key2Re = /^true|false|0|1$/;
	/**
	* Regular expression used to verify 32 bit (`int32` etc.) map keys.
	* @type {RegExp}
	* @const
	*/
	util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
	/**
	* Regular expression used to verify 64 bit (`int64` etc.) map keys.
	* @type {RegExp}
	* @const
	*/
	util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
	/**
	* Converts a number or long to an 8 characters long hash string.
	* @param {Long|number} value Value to convert
	* @returns {string} Hash
	*/
	util.longToHash = function longToHash(value) {
		return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
	};
	/**
	* Converts an 8 characters long hash string to a long or number.
	* @param {string} hash Hash
	* @param {boolean} [unsigned=false] Whether unsigned or not
	* @returns {Long|number} Original value
	*/
	util.longFromHash = function longFromHash(hash, unsigned) {
		var bits = util.LongBits.fromHash(hash);
		if (util.Long) return util.Long.fromBits(bits.lo, bits.hi, unsigned);
		return bits.toNumber(Boolean(unsigned));
	};
	/**
	* Merges the properties of the source object into the destination object.
	* @memberof util
	* @param {Object.<string,*>} dst Destination object
	* @param {Object.<string,*>} src Source object
	* @param {boolean} [ifNotSet=false] Merges only if the key is not already set
	* @returns {Object.<string,*>} Destination object
	*/
	function merge(dst, src, ifNotSet) {
		for (var keys = Object.keys(src), i = 0; i < keys.length; ++i) if (dst[keys[i]] === void 0 || !ifNotSet) dst[keys[i]] = src[keys[i]];
		return dst;
	}
	util.merge = merge;
	/**
	* Converts the first character of a string to lower case.
	* @param {string} str String to convert
	* @returns {string} Converted string
	*/
	util.lcFirst = function lcFirst(str) {
		return str.charAt(0).toLowerCase() + str.substring(1);
	};
	/**
	* Creates a custom error constructor.
	* @memberof util
	* @param {string} name Error name
	* @returns {Constructor<Error>} Custom error constructor
	*/
	function newError(name) {
		function CustomError(message, properties) {
			if (!(this instanceof CustomError)) return new CustomError(message, properties);
			Object.defineProperty(this, "message", { get: function() {
				return message;
			} });
			/* istanbul ignore next */
			if (Error.captureStackTrace) Error.captureStackTrace(this, CustomError);
			else Object.defineProperty(this, "stack", { value: (/* @__PURE__ */ new Error()).stack || "" });
			if (properties) merge(this, properties);
		}
		CustomError.prototype = Object.create(Error.prototype, {
			constructor: {
				value: CustomError,
				writable: true,
				enumerable: false,
				configurable: true
			},
			name: {
				get: function get() {
					return name;
				},
				set: void 0,
				enumerable: false,
				configurable: true
			},
			toString: {
				value: function value() {
					return this.name + ": " + this.message;
				},
				writable: true,
				enumerable: false,
				configurable: true
			}
		});
		return CustomError;
	}
	util.newError = newError;
	/**
	* Constructs a new protocol error.
	* @classdesc Error subclass indicating a protocol specifc error.
	* @memberof util
	* @extends Error
	* @template T extends Message<T>
	* @constructor
	* @param {string} message Error message
	* @param {Object.<string,*>} [properties] Additional properties
	* @example
	* try {
	*     MyMessage.decode(someBuffer); // throws if required fields are missing
	* } catch (e) {
	*     if (e instanceof ProtocolError && e.instance)
	*         console.log("decoded so far: " + JSON.stringify(e.instance));
	* }
	*/
	util.ProtocolError = newError("ProtocolError");
	/**
	* So far decoded message instance.
	* @name util.ProtocolError#instance
	* @type {Message<T>}
	*/
	/**
	* A OneOf getter as returned by {@link util.oneOfGetter}.
	* @typedef OneOfGetter
	* @type {function}
	* @returns {string|undefined} Set field name, if any
	*/
	/**
	* Builds a getter for a oneof's present field name.
	* @param {string[]} fieldNames Field names
	* @returns {OneOfGetter} Unbound getter
	*/
	util.oneOfGetter = function getOneOf(fieldNames) {
		var fieldMap = {};
		for (var i = 0; i < fieldNames.length; ++i) fieldMap[fieldNames[i]] = 1;
		/**
		* @returns {string|undefined} Set field name, if any
		* @this Object
		* @ignore
		*/
		return function() {
			for (var keys = Object.keys(this), i = keys.length - 1; i > -1; --i) if (fieldMap[keys[i]] === 1 && this[keys[i]] !== void 0 && this[keys[i]] !== null) return keys[i];
		};
	};
	/**
	* A OneOf setter as returned by {@link util.oneOfSetter}.
	* @typedef OneOfSetter
	* @type {function}
	* @param {string|undefined} value Field name
	* @returns {undefined}
	*/
	/**
	* Builds a setter for a oneof's present field name.
	* @param {string[]} fieldNames Field names
	* @returns {OneOfSetter} Unbound setter
	*/
	util.oneOfSetter = function setOneOf(fieldNames) {
		/**
		* @param {string} name Field name
		* @returns {undefined}
		* @this Object
		* @ignore
		*/
		return function(name) {
			for (var i = 0; i < fieldNames.length; ++i) if (fieldNames[i] !== name) delete this[fieldNames[i]];
		};
	};
	/**
	* Default conversion options used for {@link Message#toJSON} implementations.
	*
	* These options are close to proto3's JSON mapping with the exception that internal types like Any are handled just like messages. More precisely:
	*
	* - Longs become strings
	* - Enums become string keys
	* - Bytes become base64 encoded strings
	* - (Sub-)Messages become plain objects
	* - Maps become plain objects with all string keys
	* - Repeated fields become arrays
	* - NaN and Infinity for float and double fields become strings
	*
	* @type {IConversionOptions}
	* @see https://developers.google.com/protocol-buffers/docs/proto3?hl=en#json
	*/
	util.toJSONOptions = {
		longs: String,
		enums: String,
		bytes: String,
		json: true
	};
	util._configure = function() {
		var Buffer = util.Buffer;
		/* istanbul ignore if */
		if (!Buffer) {
			util._Buffer_from = util._Buffer_allocUnsafe = null;
			return;
		}
		util._Buffer_from = Buffer.from !== Uint8Array.from && Buffer.from || function Buffer_from(value, encoding) {
			return new Buffer(value, encoding);
		};
		util._Buffer_allocUnsafe = Buffer.allocUnsafe || function Buffer_allocUnsafe(size) {
			return new Buffer(size);
		};
	};
}));
//#endregion
//#region node_modules/protobufjs/src/writer.js
var require_writer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Writer;
	var util = require_minimal$1();
	var BufferWriter;
	var LongBits = util.LongBits, base64 = util.base64, utf8 = util.utf8;
	/**
	* Constructs a new writer operation instance.
	* @classdesc Scheduled writer operation.
	* @constructor
	* @param {function(*, Uint8Array, number)} fn Function to call
	* @param {number} len Value byte length
	* @param {*} val Value to write
	* @ignore
	*/
	function Op(fn, len, val) {
		/**
		* Function to call.
		* @type {function(Uint8Array, number, *)}
		*/
		this.fn = fn;
		/**
		* Value byte length.
		* @type {number}
		*/
		this.len = len;
		/**
		* Next operation.
		* @type {Writer.Op|undefined}
		*/
		this.next = void 0;
		/**
		* Value to write.
		* @type {*}
		*/
		this.val = val;
	}
	/* istanbul ignore next */
	function noop() {}
	/**
	* Constructs a new writer state instance.
	* @classdesc Copied writer state.
	* @memberof Writer
	* @constructor
	* @param {Writer} writer Writer to copy state from
	* @ignore
	*/
	function State(writer) {
		/**
		* Current head.
		* @type {Writer.Op}
		*/
		this.head = writer.head;
		/**
		* Current tail.
		* @type {Writer.Op}
		*/
		this.tail = writer.tail;
		/**
		* Current buffer length.
		* @type {number}
		*/
		this.len = writer.len;
		/**
		* Next state.
		* @type {State|null}
		*/
		this.next = writer.states;
	}
	/**
	* Constructs a new writer instance.
	* @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
	* @constructor
	*/
	function Writer() {
		/**
		* Current length.
		* @type {number}
		*/
		this.len = 0;
		/**
		* Operations head.
		* @type {Object}
		*/
		this.head = new Op(noop, 0, 0);
		/**
		* Operations tail
		* @type {Object}
		*/
		this.tail = this.head;
		/**
		* Linked forked states.
		* @type {Object|null}
		*/
		this.states = null;
	}
	var create = function create() {
		return util.Buffer ? function create_buffer_setup() {
			return (Writer.create = function create_buffer() {
				return new BufferWriter();
			})();
		} : function create_array() {
			return new Writer();
		};
	};
	/**
	* Creates a new writer.
	* @function
	* @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
	*/
	Writer.create = create();
	/**
	* Allocates a buffer of the specified size.
	* @param {number} size Buffer size
	* @returns {Uint8Array} Buffer
	*/
	Writer.alloc = function alloc(size) {
		return new util.Array(size);
	};
	/* istanbul ignore else */
	if (util.Array !== Array) Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);
	/**
	* Pushes a new operation to the queue.
	* @param {function(Uint8Array, number, *)} fn Function to call
	* @param {number} len Value byte length
	* @param {number} val Value to write
	* @returns {Writer} `this`
	* @private
	*/
	Writer.prototype._push = function push(fn, len, val) {
		this.tail = this.tail.next = new Op(fn, len, val);
		this.len += len;
		return this;
	};
	function writeByte(val, buf, pos) {
		buf[pos] = val & 255;
	}
	function writeVarint32(val, buf, pos) {
		while (val > 127) {
			buf[pos++] = val & 127 | 128;
			val >>>= 7;
		}
		buf[pos] = val;
	}
	/**
	* Constructs a new varint writer operation instance.
	* @classdesc Scheduled varint writer operation.
	* @extends Op
	* @constructor
	* @param {number} len Value byte length
	* @param {number} val Value to write
	* @ignore
	*/
	function VarintOp(len, val) {
		this.len = len;
		this.next = void 0;
		this.val = val;
	}
	VarintOp.prototype = Object.create(Op.prototype);
	VarintOp.prototype.fn = writeVarint32;
	/**
	* Writes an unsigned 32 bit value as a varint.
	* @param {number} value Value to write
	* @returns {Writer} `this`
	*/
	Writer.prototype.uint32 = function write_uint32(value) {
		this.len += (this.tail = this.tail.next = new VarintOp((value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5, value)).len;
		return this;
	};
	/**
	* Writes a signed 32 bit value as a varint.
	* @function
	* @param {number} value Value to write
	* @returns {Writer} `this`
	*/
	Writer.prototype.int32 = function write_int32(value) {
		return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) : this.uint32(value);
	};
	/**
	* Writes a 32 bit value as a varint, zig-zag encoded.
	* @param {number} value Value to write
	* @returns {Writer} `this`
	*/
	Writer.prototype.sint32 = function write_sint32(value) {
		return this.uint32((value << 1 ^ value >> 31) >>> 0);
	};
	function writeVarint64(val, buf, pos) {
		while (val.hi) {
			buf[pos++] = val.lo & 127 | 128;
			val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
			val.hi >>>= 7;
		}
		while (val.lo > 127) {
			buf[pos++] = val.lo & 127 | 128;
			val.lo = val.lo >>> 7;
		}
		buf[pos++] = val.lo;
	}
	/**
	* Writes an unsigned 64 bit value as a varint.
	* @param {Long|number|string} value Value to write
	* @returns {Writer} `this`
	* @throws {TypeError} If `value` is a string and no long library is present.
	*/
	Writer.prototype.uint64 = function write_uint64(value) {
		var bits = LongBits.from(value);
		return this._push(writeVarint64, bits.length(), bits);
	};
	/**
	* Writes a signed 64 bit value as a varint.
	* @function
	* @param {Long|number|string} value Value to write
	* @returns {Writer} `this`
	* @throws {TypeError} If `value` is a string and no long library is present.
	*/
	Writer.prototype.int64 = Writer.prototype.uint64;
	/**
	* Writes a signed 64 bit value as a varint, zig-zag encoded.
	* @param {Long|number|string} value Value to write
	* @returns {Writer} `this`
	* @throws {TypeError} If `value` is a string and no long library is present.
	*/
	Writer.prototype.sint64 = function write_sint64(value) {
		var bits = LongBits.from(value).zzEncode();
		return this._push(writeVarint64, bits.length(), bits);
	};
	/**
	* Writes a boolish value as a varint.
	* @param {boolean} value Value to write
	* @returns {Writer} `this`
	*/
	Writer.prototype.bool = function write_bool(value) {
		return this._push(writeByte, 1, value ? 1 : 0);
	};
	function writeFixed32(val, buf, pos) {
		buf[pos] = val & 255;
		buf[pos + 1] = val >>> 8 & 255;
		buf[pos + 2] = val >>> 16 & 255;
		buf[pos + 3] = val >>> 24;
	}
	/**
	* Writes an unsigned 32 bit value as fixed 32 bits.
	* @param {number} value Value to write
	* @returns {Writer} `this`
	*/
	Writer.prototype.fixed32 = function write_fixed32(value) {
		return this._push(writeFixed32, 4, value >>> 0);
	};
	/**
	* Writes a signed 32 bit value as fixed 32 bits.
	* @function
	* @param {number} value Value to write
	* @returns {Writer} `this`
	*/
	Writer.prototype.sfixed32 = Writer.prototype.fixed32;
	/**
	* Writes an unsigned 64 bit value as fixed 64 bits.
	* @param {Long|number|string} value Value to write
	* @returns {Writer} `this`
	* @throws {TypeError} If `value` is a string and no long library is present.
	*/
	Writer.prototype.fixed64 = function write_fixed64(value) {
		var bits = LongBits.from(value);
		return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
	};
	/**
	* Writes a signed 64 bit value as fixed 64 bits.
	* @function
	* @param {Long|number|string} value Value to write
	* @returns {Writer} `this`
	* @throws {TypeError} If `value` is a string and no long library is present.
	*/
	Writer.prototype.sfixed64 = Writer.prototype.fixed64;
	/**
	* Writes a float (32 bit).
	* @function
	* @param {number} value Value to write
	* @returns {Writer} `this`
	*/
	Writer.prototype.float = function write_float(value) {
		return this._push(util.float.writeFloatLE, 4, value);
	};
	/**
	* Writes a double (64 bit float).
	* @function
	* @param {number} value Value to write
	* @returns {Writer} `this`
	*/
	Writer.prototype.double = function write_double(value) {
		return this._push(util.float.writeDoubleLE, 8, value);
	};
	var writeBytes = util.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
		buf.set(val, pos);
	} : function writeBytes_for(val, buf, pos) {
		for (var i = 0; i < val.length; ++i) buf[pos + i] = val[i];
	};
	/**
	* Writes a sequence of bytes.
	* @param {Uint8Array|string} value Buffer or base64 encoded string to write
	* @returns {Writer} `this`
	*/
	Writer.prototype.bytes = function write_bytes(value) {
		var len = value.length >>> 0;
		if (!len) return this._push(writeByte, 1, 0);
		if (util.isString(value)) {
			var buf = Writer.alloc(len = base64.length(value));
			base64.decode(value, buf, 0);
			value = buf;
		}
		return this.uint32(len)._push(writeBytes, len, value);
	};
	/**
	* Writes a string.
	* @param {string} value Value to write
	* @returns {Writer} `this`
	*/
	Writer.prototype.string = function write_string(value) {
		var len = utf8.length(value);
		return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
	};
	/**
	* Forks this writer's state by pushing it to a stack.
	* Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
	* @returns {Writer} `this`
	*/
	Writer.prototype.fork = function fork() {
		this.states = new State(this);
		this.head = this.tail = new Op(noop, 0, 0);
		this.len = 0;
		return this;
	};
	/**
	* Resets this instance to the last state.
	* @returns {Writer} `this`
	*/
	Writer.prototype.reset = function reset() {
		if (this.states) {
			this.head = this.states.head;
			this.tail = this.states.tail;
			this.len = this.states.len;
			this.states = this.states.next;
		} else {
			this.head = this.tail = new Op(noop, 0, 0);
			this.len = 0;
		}
		return this;
	};
	/**
	* Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
	* @returns {Writer} `this`
	*/
	Writer.prototype.ldelim = function ldelim() {
		var head = this.head, tail = this.tail, len = this.len;
		this.reset().uint32(len);
		if (len) {
			this.tail.next = head.next;
			this.tail = tail;
			this.len += len;
		}
		return this;
	};
	/**
	* Finishes the write operation.
	* @returns {Uint8Array} Finished buffer
	*/
	Writer.prototype.finish = function finish() {
		var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
		while (head) {
			head.fn(head.val, buf, pos);
			pos += head.len;
			head = head.next;
		}
		return buf;
	};
	Writer._configure = function(BufferWriter_) {
		BufferWriter = BufferWriter_;
		Writer.create = create();
		BufferWriter._configure();
	};
}));
//#endregion
//#region node_modules/protobufjs/src/writer_buffer.js
var require_writer_buffer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = BufferWriter;
	var Writer = require_writer();
	(BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
	var util = require_minimal$1();
	/**
	* Constructs a new buffer writer instance.
	* @classdesc Wire format writer using node buffers.
	* @extends Writer
	* @constructor
	*/
	function BufferWriter() {
		Writer.call(this);
	}
	BufferWriter._configure = function() {
		/**
		* Allocates a buffer of the specified size.
		* @function
		* @param {number} size Buffer size
		* @returns {Buffer} Buffer
		*/
		BufferWriter.alloc = util._Buffer_allocUnsafe;
		BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
			buf.set(val, pos);
		} : function writeBytesBuffer_copy(val, buf, pos) {
			if (val.copy) val.copy(buf, pos, 0, val.length);
			else for (var i = 0; i < val.length;) buf[pos++] = val[i++];
		};
	};
	/**
	* @override
	*/
	BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
		if (util.isString(value)) value = util._Buffer_from(value, "base64");
		var len = value.length >>> 0;
		this.uint32(len);
		if (len) this._push(BufferWriter.writeBytesBuffer, len, value);
		return this;
	};
	function writeStringBuffer(val, buf, pos) {
		if (val.length < 40) util.utf8.write(val, buf, pos);
		else if (buf.utf8Write) buf.utf8Write(val, pos);
		else buf.write(val, pos);
	}
	/**
	* @override
	*/
	BufferWriter.prototype.string = function write_string_buffer(value) {
		var len = util.Buffer.byteLength(value);
		this.uint32(len);
		if (len) this._push(writeStringBuffer, len, value);
		return this;
	};
	/**
	* Finishes the write operation.
	* @name BufferWriter#finish
	* @function
	* @returns {Buffer} Finished buffer
	*/
	BufferWriter._configure();
}));
//#endregion
//#region node_modules/protobufjs/src/reader.js
var require_reader = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Reader;
	var util = require_minimal$1();
	var BufferReader;
	var LongBits = util.LongBits, utf8 = util.utf8;
	/* istanbul ignore next */
	function indexOutOfRange(reader, writeLength) {
		return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
	}
	/**
	* Constructs a new reader instance using the specified buffer.
	* @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
	* @constructor
	* @param {Uint8Array} buffer Buffer to read from
	*/
	function Reader(buffer) {
		/**
		* Read buffer.
		* @type {Uint8Array}
		*/
		this.buf = buffer;
		/**
		* Read buffer position.
		* @type {number}
		*/
		this.pos = 0;
		/**
		* Read buffer length.
		* @type {number}
		*/
		this.len = buffer.length;
	}
	var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
		if (buffer instanceof Uint8Array || Array.isArray(buffer)) return new Reader(buffer);
		throw Error("illegal buffer");
	} : function create_array(buffer) {
		if (Array.isArray(buffer)) return new Reader(buffer);
		throw Error("illegal buffer");
	};
	var create = function create() {
		return util.Buffer ? function create_buffer_setup(buffer) {
			return (Reader.create = function create_buffer(buffer) {
				return util.Buffer.isBuffer(buffer) ? new BufferReader(buffer) : create_array(buffer);
			})(buffer);
		} : create_array;
	};
	/**
	* Creates a new reader using the specified buffer.
	* @function
	* @param {Uint8Array|Buffer} buffer Buffer to read from
	* @returns {Reader|BufferReader} A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
	* @throws {Error} If `buffer` is not a valid buffer
	*/
	Reader.create = create();
	Reader.prototype._slice = util.Array.prototype.subarray || util.Array.prototype.slice;
	/**
	* Reads a varint as an unsigned 32 bit value.
	* @function
	* @returns {number} Value read
	*/
	Reader.prototype.uint32 = (function read_uint32_setup() {
		var value = 4294967295;
		return function read_uint32() {
			value = (this.buf[this.pos] & 127) >>> 0;
			if (this.buf[this.pos++] < 128) return value;
			value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
			if (this.buf[this.pos++] < 128) return value;
			value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
			if (this.buf[this.pos++] < 128) return value;
			value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
			if (this.buf[this.pos++] < 128) return value;
			value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
			if (this.buf[this.pos++] < 128) return value;
			/* istanbul ignore if */
			if ((this.pos += 5) > this.len) {
				this.pos = this.len;
				throw indexOutOfRange(this, 10);
			}
			return value;
		};
	})();
	/**
	* Reads a varint as a signed 32 bit value.
	* @returns {number} Value read
	*/
	Reader.prototype.int32 = function read_int32() {
		return this.uint32() | 0;
	};
	/**
	* Reads a zig-zag encoded varint as a signed 32 bit value.
	* @returns {number} Value read
	*/
	Reader.prototype.sint32 = function read_sint32() {
		var value = this.uint32();
		return value >>> 1 ^ -(value & 1) | 0;
	};
	function readLongVarint() {
		var bits = new LongBits(0, 0);
		var i = 0;
		if (this.len - this.pos > 4) {
			for (; i < 4; ++i) {
				bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
				if (this.buf[this.pos++] < 128) return bits;
			}
			bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
			bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
			if (this.buf[this.pos++] < 128) return bits;
			i = 0;
		} else {
			for (; i < 3; ++i) {
				/* istanbul ignore if */
				if (this.pos >= this.len) throw indexOutOfRange(this);
				bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
				if (this.buf[this.pos++] < 128) return bits;
			}
			bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
			return bits;
		}
		if (this.len - this.pos > 4) for (; i < 5; ++i) {
			bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
			if (this.buf[this.pos++] < 128) return bits;
		}
		else for (; i < 5; ++i) {
			/* istanbul ignore if */
			if (this.pos >= this.len) throw indexOutOfRange(this);
			bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
			if (this.buf[this.pos++] < 128) return bits;
		}
		/* istanbul ignore next */
		throw Error("invalid varint encoding");
	}
	/**
	* Reads a varint as a signed 64 bit value.
	* @name Reader#int64
	* @function
	* @returns {Long} Value read
	*/
	/**
	* Reads a varint as an unsigned 64 bit value.
	* @name Reader#uint64
	* @function
	* @returns {Long} Value read
	*/
	/**
	* Reads a zig-zag encoded varint as a signed 64 bit value.
	* @name Reader#sint64
	* @function
	* @returns {Long} Value read
	*/
	/**
	* Reads a varint as a boolean.
	* @returns {boolean} Value read
	*/
	Reader.prototype.bool = function read_bool() {
		return this.uint32() !== 0;
	};
	function readFixed32_end(buf, end) {
		return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
	}
	/**
	* Reads fixed 32 bits as an unsigned 32 bit integer.
	* @returns {number} Value read
	*/
	Reader.prototype.fixed32 = function read_fixed32() {
		/* istanbul ignore if */
		if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
		return readFixed32_end(this.buf, this.pos += 4);
	};
	/**
	* Reads fixed 32 bits as a signed 32 bit integer.
	* @returns {number} Value read
	*/
	Reader.prototype.sfixed32 = function read_sfixed32() {
		/* istanbul ignore if */
		if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
		return readFixed32_end(this.buf, this.pos += 4) | 0;
	};
	function readFixed64() {
		/* istanbul ignore if */
		if (this.pos + 8 > this.len) throw indexOutOfRange(this, 8);
		return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
	}
	/**
	* Reads fixed 64 bits.
	* @name Reader#fixed64
	* @function
	* @returns {Long} Value read
	*/
	/**
	* Reads zig-zag encoded fixed 64 bits.
	* @name Reader#sfixed64
	* @function
	* @returns {Long} Value read
	*/
	/**
	* Reads a float (32 bit) as a number.
	* @function
	* @returns {number} Value read
	*/
	Reader.prototype.float = function read_float() {
		/* istanbul ignore if */
		if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
		var value = util.float.readFloatLE(this.buf, this.pos);
		this.pos += 4;
		return value;
	};
	/**
	* Reads a double (64 bit float) as a number.
	* @function
	* @returns {number} Value read
	*/
	Reader.prototype.double = function read_double() {
		/* istanbul ignore if */
		if (this.pos + 8 > this.len) throw indexOutOfRange(this, 4);
		var value = util.float.readDoubleLE(this.buf, this.pos);
		this.pos += 8;
		return value;
	};
	/**
	* Reads a sequence of bytes preceeded by its length as a varint.
	* @returns {Uint8Array} Value read
	*/
	Reader.prototype.bytes = function read_bytes() {
		var length = this.uint32(), start = this.pos, end = this.pos + length;
		/* istanbul ignore if */
		if (end > this.len) throw indexOutOfRange(this, length);
		this.pos += length;
		if (Array.isArray(this.buf)) return this.buf.slice(start, end);
		if (start === end) {
			var nativeBuffer = util.Buffer;
			return nativeBuffer ? nativeBuffer.alloc(0) : new this.buf.constructor(0);
		}
		return this._slice.call(this.buf, start, end);
	};
	/**
	* Reads a string preceeded by its byte length as a varint.
	* @returns {string} Value read
	*/
	Reader.prototype.string = function read_string() {
		var bytes = this.bytes();
		return utf8.read(bytes, 0, bytes.length);
	};
	/**
	* Skips the specified number of bytes if specified, otherwise skips a varint.
	* @param {number} [length] Length if known, otherwise a varint is assumed
	* @returns {Reader} `this`
	*/
	Reader.prototype.skip = function skip(length) {
		if (typeof length === "number") {
			/* istanbul ignore if */
			if (this.pos + length > this.len) throw indexOutOfRange(this, length);
			this.pos += length;
		} else do
			/* istanbul ignore if */
			if (this.pos >= this.len) throw indexOutOfRange(this);
		while (this.buf[this.pos++] & 128);
		return this;
	};
	/**
	* Skips the next element of the specified wire type.
	* @param {number} wireType Wire type received
	* @returns {Reader} `this`
	*/
	Reader.prototype.skipType = function(wireType) {
		switch (wireType) {
			case 0:
				this.skip();
				break;
			case 1:
				this.skip(8);
				break;
			case 2:
				this.skip(this.uint32());
				break;
			case 3:
				while ((wireType = this.uint32() & 7) !== 4) this.skipType(wireType);
				break;
			case 5:
				this.skip(4);
				break;
			default: throw Error("invalid wire type " + wireType + " at offset " + this.pos);
		}
		return this;
	};
	Reader._configure = function(BufferReader_) {
		BufferReader = BufferReader_;
		Reader.create = create();
		BufferReader._configure();
		var fn = util.Long ? "toLong" : "toNumber";
		util.merge(Reader.prototype, {
			int64: function read_int64() {
				return readLongVarint.call(this)[fn](false);
			},
			uint64: function read_uint64() {
				return readLongVarint.call(this)[fn](true);
			},
			sint64: function read_sint64() {
				return readLongVarint.call(this).zzDecode()[fn](false);
			},
			fixed64: function read_fixed64() {
				return readFixed64.call(this)[fn](true);
			},
			sfixed64: function read_sfixed64() {
				return readFixed64.call(this)[fn](false);
			}
		});
	};
}));
//#endregion
//#region node_modules/protobufjs/src/reader_buffer.js
var require_reader_buffer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = BufferReader;
	var Reader = require_reader();
	(BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
	var util = require_minimal$1();
	/**
	* Constructs a new buffer reader instance.
	* @classdesc Wire format reader using node buffers.
	* @extends Reader
	* @constructor
	* @param {Buffer} buffer Buffer to read from
	*/
	function BufferReader(buffer) {
		Reader.call(this, buffer);
		/**
		* Read buffer.
		* @name BufferReader#buf
		* @type {Buffer}
		*/
	}
	BufferReader._configure = function() {
		/* istanbul ignore else */
		if (util.Buffer) BufferReader.prototype._slice = util.Buffer.prototype.slice;
	};
	/**
	* @override
	*/
	BufferReader.prototype.string = function read_string_buffer() {
		var len = this.uint32();
		return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
	};
	/**
	* Reads a sequence of bytes preceeded by its length as a varint.
	* @name BufferReader#bytes
	* @function
	* @returns {Buffer} Value read
	*/
	BufferReader._configure();
}));
//#endregion
//#region node_modules/protobufjs/src/rpc/service.js
var require_service = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Service;
	var util = require_minimal$1();
	(Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;
	/**
	* A service method callback as used by {@link rpc.ServiceMethod|ServiceMethod}.
	*
	* Differs from {@link RPCImplCallback} in that it is an actual callback of a service method which may not return `response = null`.
	* @typedef rpc.ServiceMethodCallback
	* @template TRes extends Message<TRes>
	* @type {function}
	* @param {Error|null} error Error, if any
	* @param {TRes} [response] Response message
	* @returns {undefined}
	*/
	/**
	* A service method part of a {@link rpc.Service} as created by {@link Service.create}.
	* @typedef rpc.ServiceMethod
	* @template TReq extends Message<TReq>
	* @template TRes extends Message<TRes>
	* @type {function}
	* @param {TReq|Properties<TReq>} request Request message or plain object
	* @param {rpc.ServiceMethodCallback<TRes>} [callback] Node-style callback called with the error, if any, and the response message
	* @returns {Promise<Message<TRes>>} Promise if `callback` has been omitted, otherwise `undefined`
	*/
	/**
	* Constructs a new RPC service instance.
	* @classdesc An RPC service as returned by {@link Service#create}.
	* @exports rpc.Service
	* @extends util.EventEmitter
	* @constructor
	* @param {RPCImpl} rpcImpl RPC implementation
	* @param {boolean} [requestDelimited=false] Whether requests are length-delimited
	* @param {boolean} [responseDelimited=false] Whether responses are length-delimited
	*/
	function Service(rpcImpl, requestDelimited, responseDelimited) {
		if (typeof rpcImpl !== "function") throw TypeError("rpcImpl must be a function");
		util.EventEmitter.call(this);
		/**
		* RPC implementation. Becomes `null` once the service is ended.
		* @type {RPCImpl|null}
		*/
		this.rpcImpl = rpcImpl;
		/**
		* Whether requests are length-delimited.
		* @type {boolean}
		*/
		this.requestDelimited = Boolean(requestDelimited);
		/**
		* Whether responses are length-delimited.
		* @type {boolean}
		*/
		this.responseDelimited = Boolean(responseDelimited);
	}
	/**
	* Calls a service method through {@link rpc.Service#rpcImpl|rpcImpl}.
	* @param {Method|rpc.ServiceMethod<TReq,TRes>} method Reflected or static method
	* @param {Constructor<TReq>} requestCtor Request constructor
	* @param {Constructor<TRes>} responseCtor Response constructor
	* @param {TReq|Properties<TReq>} request Request message or plain object
	* @param {rpc.ServiceMethodCallback<TRes>} callback Service callback
	* @returns {undefined}
	* @template TReq extends Message<TReq>
	* @template TRes extends Message<TRes>
	*/
	Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
		if (!request) throw TypeError("request must be specified");
		var self = this;
		if (!callback) return util.asPromise(rpcCall, self, method, requestCtor, responseCtor, request);
		if (!self.rpcImpl) {
			setTimeout(function() {
				callback(Error("already ended"));
			}, 0);
			return;
		}
		try {
			return self.rpcImpl(method, requestCtor[self.requestDelimited ? "encodeDelimited" : "encode"](request).finish(), function rpcCallback(err, response) {
				if (err) {
					self.emit("error", err, method);
					return callback(err);
				}
				if (response === null) {
					self.end(true);
					return;
				}
				if (!(response instanceof responseCtor)) try {
					response = responseCtor[self.responseDelimited ? "decodeDelimited" : "decode"](response);
				} catch (err) {
					self.emit("error", err, method);
					return callback(err);
				}
				self.emit("data", response, method);
				return callback(null, response);
			});
		} catch (err) {
			self.emit("error", err, method);
			setTimeout(function() {
				callback(err);
			}, 0);
			return;
		}
	};
	/**
	* Ends this service and emits the `end` event.
	* @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
	* @returns {rpc.Service} `this`
	*/
	Service.prototype.end = function end(endedByRPC) {
		if (this.rpcImpl) {
			if (!endedByRPC) this.rpcImpl(null, null, null);
			this.rpcImpl = null;
			this.emit("end").off();
		}
		return this;
	};
}));
//#endregion
//#region node_modules/protobufjs/src/rpc.js
var require_rpc = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Streaming RPC helpers.
	* @namespace
	*/
	var rpc = exports;
	/**
	* RPC implementation passed to {@link Service#create} performing a service request on network level, i.e. by utilizing http requests or websockets.
	* @typedef RPCImpl
	* @type {function}
	* @param {Method|rpc.ServiceMethod<Message<{}>,Message<{}>>} method Reflected or static method being called
	* @param {Uint8Array} requestData Request data
	* @param {RPCImplCallback} callback Callback function
	* @returns {undefined}
	* @example
	* function rpcImpl(method, requestData, callback) {
	*     if (protobuf.util.lcFirst(method.name) !== "myMethod") // compatible with static code
	*         throw Error("no such method");
	*     asynchronouslyObtainAResponse(requestData, function(err, responseData) {
	*         callback(err, responseData);
	*     });
	* }
	*/
	/**
	* Node-style callback as used by {@link RPCImpl}.
	* @typedef RPCImplCallback
	* @type {function}
	* @param {Error|null} error Error, if any, otherwise `null`
	* @param {Uint8Array|null} [response] Response data or `null` to signal end of stream, if there hasn't been an error
	* @returns {undefined}
	*/
	rpc.Service = require_service();
}));
//#endregion
//#region node_modules/protobufjs/src/roots.js
var require_roots = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {};
}));
/**
* Named roots.
* This is where pbjs stores generated structures (the option `-r, --root` specifies a name).
* Can also be used manually to make roots available across modules.
* @name roots
* @type {Object.<string,Root>}
* @example
* // pbjs -r myroot -o compiled.js ...
*
* // in another module:
* require("./compiled.js");
*
* // in any subsequent module:
* var root = protobuf.roots["myroot"];
*/
//#endregion
//#region node_modules/protobufjs/src/index-minimal.js
var require_index_minimal = /* @__PURE__ */ __commonJSMin(((exports) => {
	var protobuf = exports;
	/**
	* Build type, one of `"full"`, `"light"` or `"minimal"`.
	* @name build
	* @type {string}
	* @const
	*/
	protobuf.build = "minimal";
	protobuf.Writer = require_writer();
	protobuf.BufferWriter = require_writer_buffer();
	protobuf.Reader = require_reader();
	protobuf.BufferReader = require_reader_buffer();
	protobuf.util = require_minimal$1();
	protobuf.rpc = require_rpc();
	protobuf.roots = require_roots();
	protobuf.configure = configure;
	/* istanbul ignore next */
	/**
	* Reconfigures the library according to the environment.
	* @returns {undefined}
	*/
	function configure() {
		protobuf.util._configure();
		protobuf.Writer._configure(protobuf.BufferWriter);
		protobuf.Reader._configure(protobuf.BufferReader);
	}
	configure();
}));
//#endregion
//#region node_modules/protobufjs/minimal.js
var require_minimal = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_index_minimal();
}));
//#endregion
//#region src/inc/pb/pb.js
var import_minimal = /* @__PURE__ */ __toESM(require_minimal(), 1);
var $Reader = import_minimal.Reader, $Writer = import_minimal.Writer, $util = import_minimal.util;
var $root = import_minimal.roots["default"] || (import_minimal.roots["default"] = {});
var pb = $root.pb = (() => {
	/**
	* Namespace pb.
	* @exports pb
	* @namespace
	*/
	const pb = {};
	pb.APIError = (function() {
		/**
		* Properties of a APIError.
		* @memberof pb
		* @interface IAPIError
		* @property {pb.APIError.Enum|null} [code] APIError code
		* @property {string|null} [message] APIError message
		*/
		/**
		* Constructs a new APIError.
		* @memberof pb
		* @classdesc Represents a APIError.
		* @implements IAPIError
		* @constructor
		* @param {pb.IAPIError=} [properties] Properties to set
		*/
		function APIError(properties) {
			if (properties) {
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
			}
		}
		/**
		* APIError code.
		* @member {pb.APIError.Enum} code
		* @memberof pb.APIError
		* @instance
		*/
		APIError.prototype.code = 0;
		/**
		* APIError message.
		* @member {string} message
		* @memberof pb.APIError
		* @instance
		*/
		APIError.prototype.message = "";
		/**
		* Creates a new APIError instance using the specified properties.
		* @function create
		* @memberof pb.APIError
		* @static
		* @param {pb.IAPIError=} [properties] Properties to set
		* @returns {pb.APIError} APIError instance
		*/
		APIError.create = function create(properties) {
			return new APIError(properties);
		};
		/**
		* Encodes the specified APIError message. Does not implicitly {@link pb.APIError.verify|verify} messages.
		* @function encode
		* @memberof pb.APIError
		* @static
		* @param {pb.IAPIError} message APIError message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		APIError.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.code != null && Object.hasOwnProperty.call(message, "code")) writer.uint32(8).int32(message.code);
			if (message.message != null && Object.hasOwnProperty.call(message, "message")) writer.uint32(18).string(message.message);
			return writer;
		};
		/**
		* Encodes the specified APIError message, length delimited. Does not implicitly {@link pb.APIError.verify|verify} messages.
		* @function encodeDelimited
		* @memberof pb.APIError
		* @static
		* @param {pb.IAPIError} message APIError message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		APIError.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};
		/**
		* Decodes a APIError message from the specified reader or buffer.
		* @function decode
		* @memberof pb.APIError
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @param {number} [length] Message length if known beforehand
		* @returns {pb.APIError} APIError
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		APIError.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.pb.APIError();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error) break;
				switch (tag >>> 3) {
					case 1:
						message.code = reader.int32();
						break;
					case 2:
						message.message = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};
		/**
		* Decodes a APIError message from the specified reader or buffer, length delimited.
		* @function decodeDelimited
		* @memberof pb.APIError
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @returns {pb.APIError} APIError
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		APIError.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};
		/**
		* Verifies a APIError message.
		* @function verify
		* @memberof pb.APIError
		* @static
		* @param {Object.<string,*>} message Plain object to verify
		* @returns {string|null} `null` if valid, otherwise the reason why it is not
		*/
		APIError.verify = function verify(message) {
			if (typeof message !== "object" || message === null) return "object expected";
			if (message.code != null && message.hasOwnProperty("code")) switch (message.code) {
				default: return "code: enum value expected";
				case 0:
				case 100:
				case 300: break;
			}
			if (message.message != null && message.hasOwnProperty("message")) {
				if (!$util.isString(message.message)) return "message: string expected";
			}
			return null;
		};
		/**
		* Creates a APIError message from a plain object. Also converts values to their respective internal types.
		* @function fromObject
		* @memberof pb.APIError
		* @static
		* @param {Object.<string,*>} object Plain object
		* @returns {pb.APIError} APIError
		*/
		APIError.fromObject = function fromObject(object) {
			if (object instanceof $root.pb.APIError) return object;
			let message = new $root.pb.APIError();
			switch (object.code) {
				default:
					if (typeof object.code === "number") {
						message.code = object.code;
						break;
					}
					break;
				case "NONE":
				case 0:
					message.code = 0;
					break;
				case "INPUT":
				case 100:
					message.code = 100;
					break;
				case "DB":
				case 300:
					message.code = 300;
					break;
			}
			if (object.message != null) message.message = String(object.message);
			return message;
		};
		/**
		* Creates a plain object from a APIError message. Also converts values to other types if specified.
		* @function toObject
		* @memberof pb.APIError
		* @static
		* @param {pb.APIError} message APIError
		* @param {$protobuf.IConversionOptions} [options] Conversion options
		* @returns {Object.<string,*>} Plain object
		*/
		APIError.toObject = function toObject(message, options) {
			if (!options) options = {};
			let object = {};
			if (options.defaults) {
				object.code = options.enums === String ? "NONE" : 0;
				object.message = "";
			}
			if (message.code != null && message.hasOwnProperty("code")) object.code = options.enums === String ? $root.pb.APIError.Enum[message.code] === void 0 ? message.code : $root.pb.APIError.Enum[message.code] : message.code;
			if (message.message != null && message.hasOwnProperty("message")) object.message = message.message;
			return object;
		};
		/**
		* Converts this APIError to JSON.
		* @function toJSON
		* @memberof pb.APIError
		* @instance
		* @returns {Object.<string,*>} JSON object
		*/
		APIError.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, import_minimal.util.toJSONOptions);
		};
		/**
		* Gets the default type url for APIError
		* @function getTypeUrl
		* @memberof pb.APIError
		* @static
		* @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		* @returns {string} The default type url
		*/
		APIError.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === void 0) typeUrlPrefix = "type.googleapis.com";
			return typeUrlPrefix + "/pb.APIError";
		};
		/**
		* Enum enum.
		* @name pb.APIError.Enum
		* @enum {number}
		* @property {number} NONE=0 NONE value
		* @property {number} INPUT=100 INPUT value
		* @property {number} DB=300 DB value
		*/
		APIError.Enum = (function() {
			const valuesById = {}, values = Object.create(valuesById);
			values[valuesById[0] = "NONE"] = 0;
			values[valuesById[100] = "INPUT"] = 100;
			values[valuesById[300] = "DB"] = 300;
			return values;
		})();
		return APIError;
	})();
	pb.APIReq = (function() {
		/**
		* Properties of a APIReq.
		* @memberof pb
		* @interface IAPIReq
		* @property {number|null} [itemGet] APIReq itemGet
		* @property {pb.IItemEdit|null} [itemSet] APIReq itemSet
		* @property {number|null} [itemListRecent] APIReq itemListRecent
		* @property {pb.IItemSearch|null} [itemSearch] APIReq itemSearch
		*/
		/**
		* Constructs a new APIReq.
		* @memberof pb
		* @classdesc Represents a APIReq.
		* @implements IAPIReq
		* @constructor
		* @param {pb.IAPIReq=} [properties] Properties to set
		*/
		function APIReq(properties) {
			if (properties) {
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
			}
		}
		/**
		* APIReq itemGet.
		* @member {number|null|undefined} itemGet
		* @memberof pb.APIReq
		* @instance
		*/
		APIReq.prototype.itemGet = null;
		/**
		* APIReq itemSet.
		* @member {pb.IItemEdit|null|undefined} itemSet
		* @memberof pb.APIReq
		* @instance
		*/
		APIReq.prototype.itemSet = null;
		/**
		* APIReq itemListRecent.
		* @member {number|null|undefined} itemListRecent
		* @memberof pb.APIReq
		* @instance
		*/
		APIReq.prototype.itemListRecent = null;
		/**
		* APIReq itemSearch.
		* @member {pb.IItemSearch|null|undefined} itemSearch
		* @memberof pb.APIReq
		* @instance
		*/
		APIReq.prototype.itemSearch = null;
		let $oneOfFields;
		/**
		* APIReq one.
		* @member {"itemGet"|"itemSet"|"itemListRecent"|"itemSearch"|undefined} one
		* @memberof pb.APIReq
		* @instance
		*/
		Object.defineProperty(APIReq.prototype, "one", {
			get: $util.oneOfGetter($oneOfFields = [
				"itemGet",
				"itemSet",
				"itemListRecent",
				"itemSearch"
			]),
			set: $util.oneOfSetter($oneOfFields)
		});
		/**
		* Creates a new APIReq instance using the specified properties.
		* @function create
		* @memberof pb.APIReq
		* @static
		* @param {pb.IAPIReq=} [properties] Properties to set
		* @returns {pb.APIReq} APIReq instance
		*/
		APIReq.create = function create(properties) {
			return new APIReq(properties);
		};
		/**
		* Encodes the specified APIReq message. Does not implicitly {@link pb.APIReq.verify|verify} messages.
		* @function encode
		* @memberof pb.APIReq
		* @static
		* @param {pb.IAPIReq} message APIReq message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		APIReq.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.itemGet != null && Object.hasOwnProperty.call(message, "itemGet")) writer.uint32(80).uint32(message.itemGet);
			if (message.itemSet != null && Object.hasOwnProperty.call(message, "itemSet")) $root.pb.ItemEdit.encode(message.itemSet, writer.uint32(90).fork()).ldelim();
			if (message.itemListRecent != null && Object.hasOwnProperty.call(message, "itemListRecent")) writer.uint32(160).uint32(message.itemListRecent);
			if (message.itemSearch != null && Object.hasOwnProperty.call(message, "itemSearch")) $root.pb.ItemSearch.encode(message.itemSearch, writer.uint32(170).fork()).ldelim();
			return writer;
		};
		/**
		* Encodes the specified APIReq message, length delimited. Does not implicitly {@link pb.APIReq.verify|verify} messages.
		* @function encodeDelimited
		* @memberof pb.APIReq
		* @static
		* @param {pb.IAPIReq} message APIReq message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		APIReq.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};
		/**
		* Decodes a APIReq message from the specified reader or buffer.
		* @function decode
		* @memberof pb.APIReq
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @param {number} [length] Message length if known beforehand
		* @returns {pb.APIReq} APIReq
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		APIReq.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.pb.APIReq();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error) break;
				switch (tag >>> 3) {
					case 10:
						message.itemGet = reader.uint32();
						break;
					case 11:
						message.itemSet = $root.pb.ItemEdit.decode(reader, reader.uint32());
						break;
					case 20:
						message.itemListRecent = reader.uint32();
						break;
					case 21:
						message.itemSearch = $root.pb.ItemSearch.decode(reader, reader.uint32());
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};
		/**
		* Decodes a APIReq message from the specified reader or buffer, length delimited.
		* @function decodeDelimited
		* @memberof pb.APIReq
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @returns {pb.APIReq} APIReq
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		APIReq.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};
		/**
		* Verifies a APIReq message.
		* @function verify
		* @memberof pb.APIReq
		* @static
		* @param {Object.<string,*>} message Plain object to verify
		* @returns {string|null} `null` if valid, otherwise the reason why it is not
		*/
		APIReq.verify = function verify(message) {
			if (typeof message !== "object" || message === null) return "object expected";
			let properties = {};
			if (message.itemGet != null && message.hasOwnProperty("itemGet")) {
				properties.one = 1;
				if (!$util.isInteger(message.itemGet)) return "itemGet: integer expected";
			}
			if (message.itemSet != null && message.hasOwnProperty("itemSet")) {
				if (properties.one === 1) return "one: multiple values";
				properties.one = 1;
				{
					let error = $root.pb.ItemEdit.verify(message.itemSet);
					if (error) return "itemSet." + error;
				}
			}
			if (message.itemListRecent != null && message.hasOwnProperty("itemListRecent")) {
				if (properties.one === 1) return "one: multiple values";
				properties.one = 1;
				if (!$util.isInteger(message.itemListRecent)) return "itemListRecent: integer expected";
			}
			if (message.itemSearch != null && message.hasOwnProperty("itemSearch")) {
				if (properties.one === 1) return "one: multiple values";
				properties.one = 1;
				{
					let error = $root.pb.ItemSearch.verify(message.itemSearch);
					if (error) return "itemSearch." + error;
				}
			}
			return null;
		};
		/**
		* Creates a APIReq message from a plain object. Also converts values to their respective internal types.
		* @function fromObject
		* @memberof pb.APIReq
		* @static
		* @param {Object.<string,*>} object Plain object
		* @returns {pb.APIReq} APIReq
		*/
		APIReq.fromObject = function fromObject(object) {
			if (object instanceof $root.pb.APIReq) return object;
			let message = new $root.pb.APIReq();
			if (object.itemGet != null) message.itemGet = object.itemGet >>> 0;
			if (object.itemSet != null) {
				if (typeof object.itemSet !== "object") throw TypeError(".pb.APIReq.itemSet: object expected");
				message.itemSet = $root.pb.ItemEdit.fromObject(object.itemSet);
			}
			if (object.itemListRecent != null) message.itemListRecent = object.itemListRecent >>> 0;
			if (object.itemSearch != null) {
				if (typeof object.itemSearch !== "object") throw TypeError(".pb.APIReq.itemSearch: object expected");
				message.itemSearch = $root.pb.ItemSearch.fromObject(object.itemSearch);
			}
			return message;
		};
		/**
		* Creates a plain object from a APIReq message. Also converts values to other types if specified.
		* @function toObject
		* @memberof pb.APIReq
		* @static
		* @param {pb.APIReq} message APIReq
		* @param {$protobuf.IConversionOptions} [options] Conversion options
		* @returns {Object.<string,*>} Plain object
		*/
		APIReq.toObject = function toObject(message, options) {
			if (!options) options = {};
			let object = {};
			if (message.itemGet != null && message.hasOwnProperty("itemGet")) {
				object.itemGet = message.itemGet;
				if (options.oneofs) object.one = "itemGet";
			}
			if (message.itemSet != null && message.hasOwnProperty("itemSet")) {
				object.itemSet = $root.pb.ItemEdit.toObject(message.itemSet, options);
				if (options.oneofs) object.one = "itemSet";
			}
			if (message.itemListRecent != null && message.hasOwnProperty("itemListRecent")) {
				object.itemListRecent = message.itemListRecent;
				if (options.oneofs) object.one = "itemListRecent";
			}
			if (message.itemSearch != null && message.hasOwnProperty("itemSearch")) {
				object.itemSearch = $root.pb.ItemSearch.toObject(message.itemSearch, options);
				if (options.oneofs) object.one = "itemSearch";
			}
			return object;
		};
		/**
		* Converts this APIReq to JSON.
		* @function toJSON
		* @memberof pb.APIReq
		* @instance
		* @returns {Object.<string,*>} JSON object
		*/
		APIReq.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, import_minimal.util.toJSONOptions);
		};
		/**
		* Gets the default type url for APIReq
		* @function getTypeUrl
		* @memberof pb.APIReq
		* @static
		* @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		* @returns {string} The default type url
		*/
		APIReq.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === void 0) typeUrlPrefix = "type.googleapis.com";
			return typeUrlPrefix + "/pb.APIReq";
		};
		return APIReq;
	})();
	pb.APIRsp = (function() {
		/**
		* Properties of a APIRsp.
		* @memberof pb
		* @interface IAPIRsp
		* @property {pb.IAPIError|null} [error] APIRsp error
		* @property {pb.IItem|null} [itemGet] APIRsp itemGet
		* @property {number|null} [itemSet] APIRsp itemSet
		* @property {pb.IItemList|null} [itemListRecent] APIRsp itemListRecent
		* @property {pb.IItemList|null} [itemSearch] APIRsp itemSearch
		*/
		/**
		* Constructs a new APIRsp.
		* @memberof pb
		* @classdesc Represents a APIRsp.
		* @implements IAPIRsp
		* @constructor
		* @param {pb.IAPIRsp=} [properties] Properties to set
		*/
		function APIRsp(properties) {
			if (properties) {
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
			}
		}
		/**
		* APIRsp error.
		* @member {pb.IAPIError|null|undefined} error
		* @memberof pb.APIRsp
		* @instance
		*/
		APIRsp.prototype.error = null;
		/**
		* APIRsp itemGet.
		* @member {pb.IItem|null|undefined} itemGet
		* @memberof pb.APIRsp
		* @instance
		*/
		APIRsp.prototype.itemGet = null;
		/**
		* APIRsp itemSet.
		* @member {number|null|undefined} itemSet
		* @memberof pb.APIRsp
		* @instance
		*/
		APIRsp.prototype.itemSet = null;
		/**
		* APIRsp itemListRecent.
		* @member {pb.IItemList|null|undefined} itemListRecent
		* @memberof pb.APIRsp
		* @instance
		*/
		APIRsp.prototype.itemListRecent = null;
		/**
		* APIRsp itemSearch.
		* @member {pb.IItemList|null|undefined} itemSearch
		* @memberof pb.APIRsp
		* @instance
		*/
		APIRsp.prototype.itemSearch = null;
		let $oneOfFields;
		/**
		* APIRsp one.
		* @member {"itemGet"|"itemSet"|"itemListRecent"|"itemSearch"|undefined} one
		* @memberof pb.APIRsp
		* @instance
		*/
		Object.defineProperty(APIRsp.prototype, "one", {
			get: $util.oneOfGetter($oneOfFields = [
				"itemGet",
				"itemSet",
				"itemListRecent",
				"itemSearch"
			]),
			set: $util.oneOfSetter($oneOfFields)
		});
		/**
		* Creates a new APIRsp instance using the specified properties.
		* @function create
		* @memberof pb.APIRsp
		* @static
		* @param {pb.IAPIRsp=} [properties] Properties to set
		* @returns {pb.APIRsp} APIRsp instance
		*/
		APIRsp.create = function create(properties) {
			return new APIRsp(properties);
		};
		/**
		* Encodes the specified APIRsp message. Does not implicitly {@link pb.APIRsp.verify|verify} messages.
		* @function encode
		* @memberof pb.APIRsp
		* @static
		* @param {pb.IAPIRsp} message APIRsp message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		APIRsp.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.error != null && Object.hasOwnProperty.call(message, "error")) $root.pb.APIError.encode(message.error, writer.uint32(10).fork()).ldelim();
			if (message.itemGet != null && Object.hasOwnProperty.call(message, "itemGet")) $root.pb.Item.encode(message.itemGet, writer.uint32(82).fork()).ldelim();
			if (message.itemSet != null && Object.hasOwnProperty.call(message, "itemSet")) writer.uint32(88).uint64(message.itemSet);
			if (message.itemListRecent != null && Object.hasOwnProperty.call(message, "itemListRecent")) $root.pb.ItemList.encode(message.itemListRecent, writer.uint32(162).fork()).ldelim();
			if (message.itemSearch != null && Object.hasOwnProperty.call(message, "itemSearch")) $root.pb.ItemList.encode(message.itemSearch, writer.uint32(170).fork()).ldelim();
			return writer;
		};
		/**
		* Encodes the specified APIRsp message, length delimited. Does not implicitly {@link pb.APIRsp.verify|verify} messages.
		* @function encodeDelimited
		* @memberof pb.APIRsp
		* @static
		* @param {pb.IAPIRsp} message APIRsp message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		APIRsp.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};
		/**
		* Decodes a APIRsp message from the specified reader or buffer.
		* @function decode
		* @memberof pb.APIRsp
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @param {number} [length] Message length if known beforehand
		* @returns {pb.APIRsp} APIRsp
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		APIRsp.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.pb.APIRsp();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error) break;
				switch (tag >>> 3) {
					case 1:
						message.error = $root.pb.APIError.decode(reader, reader.uint32());
						break;
					case 10:
						message.itemGet = $root.pb.Item.decode(reader, reader.uint32());
						break;
					case 11:
						message.itemSet = reader.uint64();
						break;
					case 20:
						message.itemListRecent = $root.pb.ItemList.decode(reader, reader.uint32());
						break;
					case 21:
						message.itemSearch = $root.pb.ItemList.decode(reader, reader.uint32());
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};
		/**
		* Decodes a APIRsp message from the specified reader or buffer, length delimited.
		* @function decodeDelimited
		* @memberof pb.APIRsp
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @returns {pb.APIRsp} APIRsp
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		APIRsp.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};
		/**
		* Verifies a APIRsp message.
		* @function verify
		* @memberof pb.APIRsp
		* @static
		* @param {Object.<string,*>} message Plain object to verify
		* @returns {string|null} `null` if valid, otherwise the reason why it is not
		*/
		APIRsp.verify = function verify(message) {
			if (typeof message !== "object" || message === null) return "object expected";
			let properties = {};
			if (message.error != null && message.hasOwnProperty("error")) {
				let error = $root.pb.APIError.verify(message.error);
				if (error) return "error." + error;
			}
			if (message.itemGet != null && message.hasOwnProperty("itemGet")) {
				properties.one = 1;
				{
					let error = $root.pb.Item.verify(message.itemGet);
					if (error) return "itemGet." + error;
				}
			}
			if (message.itemSet != null && message.hasOwnProperty("itemSet")) {
				if (properties.one === 1) return "one: multiple values";
				properties.one = 1;
				if (!$util.isInteger(message.itemSet) && !(message.itemSet && $util.isInteger(message.itemSet.low) && $util.isInteger(message.itemSet.high))) return "itemSet: integer|Long expected";
			}
			if (message.itemListRecent != null && message.hasOwnProperty("itemListRecent")) {
				if (properties.one === 1) return "one: multiple values";
				properties.one = 1;
				{
					let error = $root.pb.ItemList.verify(message.itemListRecent);
					if (error) return "itemListRecent." + error;
				}
			}
			if (message.itemSearch != null && message.hasOwnProperty("itemSearch")) {
				if (properties.one === 1) return "one: multiple values";
				properties.one = 1;
				{
					let error = $root.pb.ItemList.verify(message.itemSearch);
					if (error) return "itemSearch." + error;
				}
			}
			return null;
		};
		/**
		* Creates a APIRsp message from a plain object. Also converts values to their respective internal types.
		* @function fromObject
		* @memberof pb.APIRsp
		* @static
		* @param {Object.<string,*>} object Plain object
		* @returns {pb.APIRsp} APIRsp
		*/
		APIRsp.fromObject = function fromObject(object) {
			if (object instanceof $root.pb.APIRsp) return object;
			let message = new $root.pb.APIRsp();
			if (object.error != null) {
				if (typeof object.error !== "object") throw TypeError(".pb.APIRsp.error: object expected");
				message.error = $root.pb.APIError.fromObject(object.error);
			}
			if (object.itemGet != null) {
				if (typeof object.itemGet !== "object") throw TypeError(".pb.APIRsp.itemGet: object expected");
				message.itemGet = $root.pb.Item.fromObject(object.itemGet);
			}
			if (object.itemSet != null) {
				if ($util.Long) (message.itemSet = $util.Long.fromValue(object.itemSet)).unsigned = true;
				else if (typeof object.itemSet === "string") message.itemSet = parseInt(object.itemSet, 10);
				else if (typeof object.itemSet === "number") message.itemSet = object.itemSet;
				else if (typeof object.itemSet === "object") message.itemSet = new $util.LongBits(object.itemSet.low >>> 0, object.itemSet.high >>> 0).toNumber(true);
			}
			if (object.itemListRecent != null) {
				if (typeof object.itemListRecent !== "object") throw TypeError(".pb.APIRsp.itemListRecent: object expected");
				message.itemListRecent = $root.pb.ItemList.fromObject(object.itemListRecent);
			}
			if (object.itemSearch != null) {
				if (typeof object.itemSearch !== "object") throw TypeError(".pb.APIRsp.itemSearch: object expected");
				message.itemSearch = $root.pb.ItemList.fromObject(object.itemSearch);
			}
			return message;
		};
		/**
		* Creates a plain object from a APIRsp message. Also converts values to other types if specified.
		* @function toObject
		* @memberof pb.APIRsp
		* @static
		* @param {pb.APIRsp} message APIRsp
		* @param {$protobuf.IConversionOptions} [options] Conversion options
		* @returns {Object.<string,*>} Plain object
		*/
		APIRsp.toObject = function toObject(message, options) {
			if (!options) options = {};
			let object = {};
			if (options.defaults) object.error = null;
			if (message.error != null && message.hasOwnProperty("error")) object.error = $root.pb.APIError.toObject(message.error, options);
			if (message.itemGet != null && message.hasOwnProperty("itemGet")) {
				object.itemGet = $root.pb.Item.toObject(message.itemGet, options);
				if (options.oneofs) object.one = "itemGet";
			}
			if (message.itemSet != null && message.hasOwnProperty("itemSet")) {
				if (typeof message.itemSet === "number") object.itemSet = options.longs === String ? String(message.itemSet) : message.itemSet;
				else object.itemSet = options.longs === String ? $util.Long.prototype.toString.call(message.itemSet) : options.longs === Number ? new $util.LongBits(message.itemSet.low >>> 0, message.itemSet.high >>> 0).toNumber(true) : message.itemSet;
				if (options.oneofs) object.one = "itemSet";
			}
			if (message.itemListRecent != null && message.hasOwnProperty("itemListRecent")) {
				object.itemListRecent = $root.pb.ItemList.toObject(message.itemListRecent, options);
				if (options.oneofs) object.one = "itemListRecent";
			}
			if (message.itemSearch != null && message.hasOwnProperty("itemSearch")) {
				object.itemSearch = $root.pb.ItemList.toObject(message.itemSearch, options);
				if (options.oneofs) object.one = "itemSearch";
			}
			return object;
		};
		/**
		* Converts this APIRsp to JSON.
		* @function toJSON
		* @memberof pb.APIRsp
		* @instance
		* @returns {Object.<string,*>} JSON object
		*/
		APIRsp.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, import_minimal.util.toJSONOptions);
		};
		/**
		* Gets the default type url for APIRsp
		* @function getTypeUrl
		* @memberof pb.APIRsp
		* @static
		* @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		* @returns {string} The default type url
		*/
		APIRsp.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === void 0) typeUrlPrefix = "type.googleapis.com";
			return typeUrlPrefix + "/pb.APIRsp";
		};
		return APIRsp;
	})();
	pb.Item = (function() {
		/**
		* Properties of an Item.
		* @memberof pb
		* @interface IItem
		* @property {number|null} [id] Item id
		* @property {pb.IItemMeta|null} [meta] Item meta
		* @property {pb.IRevision|null} [content] Item content
		* @property {pb.IOpenGraph|null} [og] Item og
		*/
		/**
		* Constructs a new Item.
		* @memberof pb
		* @classdesc Represents an Item.
		* @implements IItem
		* @constructor
		* @param {pb.IItem=} [properties] Properties to set
		*/
		function Item(properties) {
			if (properties) {
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
			}
		}
		/**
		* Item id.
		* @member {number} id
		* @memberof pb.Item
		* @instance
		*/
		Item.prototype.id = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
		/**
		* Item meta.
		* @member {pb.IItemMeta|null|undefined} meta
		* @memberof pb.Item
		* @instance
		*/
		Item.prototype.meta = null;
		/**
		* Item content.
		* @member {pb.IRevision|null|undefined} content
		* @memberof pb.Item
		* @instance
		*/
		Item.prototype.content = null;
		/**
		* Item og.
		* @member {pb.IOpenGraph|null|undefined} og
		* @memberof pb.Item
		* @instance
		*/
		Item.prototype.og = null;
		/**
		* Creates a new Item instance using the specified properties.
		* @function create
		* @memberof pb.Item
		* @static
		* @param {pb.IItem=} [properties] Properties to set
		* @returns {pb.Item} Item instance
		*/
		Item.create = function create(properties) {
			return new Item(properties);
		};
		/**
		* Encodes the specified Item message. Does not implicitly {@link pb.Item.verify|verify} messages.
		* @function encode
		* @memberof pb.Item
		* @static
		* @param {pb.IItem} message Item message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		Item.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.id != null && Object.hasOwnProperty.call(message, "id")) writer.uint32(8).uint64(message.id);
			if (message.meta != null && Object.hasOwnProperty.call(message, "meta")) $root.pb.ItemMeta.encode(message.meta, writer.uint32(18).fork()).ldelim();
			if (message.content != null && Object.hasOwnProperty.call(message, "content")) $root.pb.Revision.encode(message.content, writer.uint32(26).fork()).ldelim();
			if (message.og != null && Object.hasOwnProperty.call(message, "og")) $root.pb.OpenGraph.encode(message.og, writer.uint32(34).fork()).ldelim();
			return writer;
		};
		/**
		* Encodes the specified Item message, length delimited. Does not implicitly {@link pb.Item.verify|verify} messages.
		* @function encodeDelimited
		* @memberof pb.Item
		* @static
		* @param {pb.IItem} message Item message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		Item.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};
		/**
		* Decodes an Item message from the specified reader or buffer.
		* @function decode
		* @memberof pb.Item
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @param {number} [length] Message length if known beforehand
		* @returns {pb.Item} Item
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		Item.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.pb.Item();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error) break;
				switch (tag >>> 3) {
					case 1:
						message.id = reader.uint64();
						break;
					case 2:
						message.meta = $root.pb.ItemMeta.decode(reader, reader.uint32());
						break;
					case 3:
						message.content = $root.pb.Revision.decode(reader, reader.uint32());
						break;
					case 4:
						message.og = $root.pb.OpenGraph.decode(reader, reader.uint32());
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};
		/**
		* Decodes an Item message from the specified reader or buffer, length delimited.
		* @function decodeDelimited
		* @memberof pb.Item
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @returns {pb.Item} Item
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		Item.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};
		/**
		* Verifies an Item message.
		* @function verify
		* @memberof pb.Item
		* @static
		* @param {Object.<string,*>} message Plain object to verify
		* @returns {string|null} `null` if valid, otherwise the reason why it is not
		*/
		Item.verify = function verify(message) {
			if (typeof message !== "object" || message === null) return "object expected";
			if (message.id != null && message.hasOwnProperty("id")) {
				if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high))) return "id: integer|Long expected";
			}
			if (message.meta != null && message.hasOwnProperty("meta")) {
				let error = $root.pb.ItemMeta.verify(message.meta);
				if (error) return "meta." + error;
			}
			if (message.content != null && message.hasOwnProperty("content")) {
				let error = $root.pb.Revision.verify(message.content);
				if (error) return "content." + error;
			}
			if (message.og != null && message.hasOwnProperty("og")) {
				let error = $root.pb.OpenGraph.verify(message.og);
				if (error) return "og." + error;
			}
			return null;
		};
		/**
		* Creates an Item message from a plain object. Also converts values to their respective internal types.
		* @function fromObject
		* @memberof pb.Item
		* @static
		* @param {Object.<string,*>} object Plain object
		* @returns {pb.Item} Item
		*/
		Item.fromObject = function fromObject(object) {
			if (object instanceof $root.pb.Item) return object;
			let message = new $root.pb.Item();
			if (object.id != null) {
				if ($util.Long) (message.id = $util.Long.fromValue(object.id)).unsigned = true;
				else if (typeof object.id === "string") message.id = parseInt(object.id, 10);
				else if (typeof object.id === "number") message.id = object.id;
				else if (typeof object.id === "object") message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber(true);
			}
			if (object.meta != null) {
				if (typeof object.meta !== "object") throw TypeError(".pb.Item.meta: object expected");
				message.meta = $root.pb.ItemMeta.fromObject(object.meta);
			}
			if (object.content != null) {
				if (typeof object.content !== "object") throw TypeError(".pb.Item.content: object expected");
				message.content = $root.pb.Revision.fromObject(object.content);
			}
			if (object.og != null) {
				if (typeof object.og !== "object") throw TypeError(".pb.Item.og: object expected");
				message.og = $root.pb.OpenGraph.fromObject(object.og);
			}
			return message;
		};
		/**
		* Creates a plain object from an Item message. Also converts values to other types if specified.
		* @function toObject
		* @memberof pb.Item
		* @static
		* @param {pb.Item} message Item
		* @param {$protobuf.IConversionOptions} [options] Conversion options
		* @returns {Object.<string,*>} Plain object
		*/
		Item.toObject = function toObject(message, options) {
			if (!options) options = {};
			let object = {};
			if (options.defaults) {
				if ($util.Long) {
					let long = new $util.Long(0, 0, true);
					object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
				} else object.id = options.longs === String ? "0" : 0;
				object.meta = null;
				object.content = null;
				object.og = null;
			}
			if (message.id != null && message.hasOwnProperty("id")) if (typeof message.id === "number") object.id = options.longs === String ? String(message.id) : message.id;
			else object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber(true) : message.id;
			if (message.meta != null && message.hasOwnProperty("meta")) object.meta = $root.pb.ItemMeta.toObject(message.meta, options);
			if (message.content != null && message.hasOwnProperty("content")) object.content = $root.pb.Revision.toObject(message.content, options);
			if (message.og != null && message.hasOwnProperty("og")) object.og = $root.pb.OpenGraph.toObject(message.og, options);
			return object;
		};
		/**
		* Converts this Item to JSON.
		* @function toJSON
		* @memberof pb.Item
		* @instance
		* @returns {Object.<string,*>} JSON object
		*/
		Item.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, import_minimal.util.toJSONOptions);
		};
		/**
		* Gets the default type url for Item
		* @function getTypeUrl
		* @memberof pb.Item
		* @static
		* @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		* @returns {string} The default type url
		*/
		Item.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === void 0) typeUrlPrefix = "type.googleapis.com";
			return typeUrlPrefix + "/pb.Item";
		};
		return Item;
	})();
	pb.ItemLite = (function() {
		/**
		* Properties of an ItemLite.
		* @memberof pb
		* @interface IItemLite
		* @property {number|null} [id] ItemLite id
		* @property {pb.IItemMeta|null} [meta] ItemLite meta
		*/
		/**
		* Constructs a new ItemLite.
		* @memberof pb
		* @classdesc Represents an ItemLite.
		* @implements IItemLite
		* @constructor
		* @param {pb.IItemLite=} [properties] Properties to set
		*/
		function ItemLite(properties) {
			if (properties) {
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
			}
		}
		/**
		* ItemLite id.
		* @member {number} id
		* @memberof pb.ItemLite
		* @instance
		*/
		ItemLite.prototype.id = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
		/**
		* ItemLite meta.
		* @member {pb.IItemMeta|null|undefined} meta
		* @memberof pb.ItemLite
		* @instance
		*/
		ItemLite.prototype.meta = null;
		/**
		* Creates a new ItemLite instance using the specified properties.
		* @function create
		* @memberof pb.ItemLite
		* @static
		* @param {pb.IItemLite=} [properties] Properties to set
		* @returns {pb.ItemLite} ItemLite instance
		*/
		ItemLite.create = function create(properties) {
			return new ItemLite(properties);
		};
		/**
		* Encodes the specified ItemLite message. Does not implicitly {@link pb.ItemLite.verify|verify} messages.
		* @function encode
		* @memberof pb.ItemLite
		* @static
		* @param {pb.IItemLite} message ItemLite message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		ItemLite.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.id != null && Object.hasOwnProperty.call(message, "id")) writer.uint32(8).uint64(message.id);
			if (message.meta != null && Object.hasOwnProperty.call(message, "meta")) $root.pb.ItemMeta.encode(message.meta, writer.uint32(18).fork()).ldelim();
			return writer;
		};
		/**
		* Encodes the specified ItemLite message, length delimited. Does not implicitly {@link pb.ItemLite.verify|verify} messages.
		* @function encodeDelimited
		* @memberof pb.ItemLite
		* @static
		* @param {pb.IItemLite} message ItemLite message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		ItemLite.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};
		/**
		* Decodes an ItemLite message from the specified reader or buffer.
		* @function decode
		* @memberof pb.ItemLite
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @param {number} [length] Message length if known beforehand
		* @returns {pb.ItemLite} ItemLite
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		ItemLite.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.pb.ItemLite();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error) break;
				switch (tag >>> 3) {
					case 1:
						message.id = reader.uint64();
						break;
					case 2:
						message.meta = $root.pb.ItemMeta.decode(reader, reader.uint32());
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};
		/**
		* Decodes an ItemLite message from the specified reader or buffer, length delimited.
		* @function decodeDelimited
		* @memberof pb.ItemLite
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @returns {pb.ItemLite} ItemLite
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		ItemLite.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};
		/**
		* Verifies an ItemLite message.
		* @function verify
		* @memberof pb.ItemLite
		* @static
		* @param {Object.<string,*>} message Plain object to verify
		* @returns {string|null} `null` if valid, otherwise the reason why it is not
		*/
		ItemLite.verify = function verify(message) {
			if (typeof message !== "object" || message === null) return "object expected";
			if (message.id != null && message.hasOwnProperty("id")) {
				if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high))) return "id: integer|Long expected";
			}
			if (message.meta != null && message.hasOwnProperty("meta")) {
				let error = $root.pb.ItemMeta.verify(message.meta);
				if (error) return "meta." + error;
			}
			return null;
		};
		/**
		* Creates an ItemLite message from a plain object. Also converts values to their respective internal types.
		* @function fromObject
		* @memberof pb.ItemLite
		* @static
		* @param {Object.<string,*>} object Plain object
		* @returns {pb.ItemLite} ItemLite
		*/
		ItemLite.fromObject = function fromObject(object) {
			if (object instanceof $root.pb.ItemLite) return object;
			let message = new $root.pb.ItemLite();
			if (object.id != null) {
				if ($util.Long) (message.id = $util.Long.fromValue(object.id)).unsigned = true;
				else if (typeof object.id === "string") message.id = parseInt(object.id, 10);
				else if (typeof object.id === "number") message.id = object.id;
				else if (typeof object.id === "object") message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber(true);
			}
			if (object.meta != null) {
				if (typeof object.meta !== "object") throw TypeError(".pb.ItemLite.meta: object expected");
				message.meta = $root.pb.ItemMeta.fromObject(object.meta);
			}
			return message;
		};
		/**
		* Creates a plain object from an ItemLite message. Also converts values to other types if specified.
		* @function toObject
		* @memberof pb.ItemLite
		* @static
		* @param {pb.ItemLite} message ItemLite
		* @param {$protobuf.IConversionOptions} [options] Conversion options
		* @returns {Object.<string,*>} Plain object
		*/
		ItemLite.toObject = function toObject(message, options) {
			if (!options) options = {};
			let object = {};
			if (options.defaults) {
				if ($util.Long) {
					let long = new $util.Long(0, 0, true);
					object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
				} else object.id = options.longs === String ? "0" : 0;
				object.meta = null;
			}
			if (message.id != null && message.hasOwnProperty("id")) if (typeof message.id === "number") object.id = options.longs === String ? String(message.id) : message.id;
			else object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber(true) : message.id;
			if (message.meta != null && message.hasOwnProperty("meta")) object.meta = $root.pb.ItemMeta.toObject(message.meta, options);
			return object;
		};
		/**
		* Converts this ItemLite to JSON.
		* @function toJSON
		* @memberof pb.ItemLite
		* @instance
		* @returns {Object.<string,*>} JSON object
		*/
		ItemLite.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, import_minimal.util.toJSONOptions);
		};
		/**
		* Gets the default type url for ItemLite
		* @function getTypeUrl
		* @memberof pb.ItemLite
		* @static
		* @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		* @returns {string} The default type url
		*/
		ItemLite.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === void 0) typeUrlPrefix = "type.googleapis.com";
			return typeUrlPrefix + "/pb.ItemLite";
		};
		return ItemLite;
	})();
	pb.ItemMeta = (function() {
		/**
		* Properties of an ItemMeta.
		* @memberof pb
		* @interface IItemMeta
		* @property {number|null} [tsCreate] ItemMeta tsCreate
		* @property {number|null} [tsRevise] ItemMeta tsRevise
		* @property {number|null} [tsHide] ItemMeta tsHide
		* @property {number|null} [root] ItemMeta root
		* @property {string|null} [title] ItemMeta title
		* @property {boolean|null} [original] ItemMeta original
		* @property {boolean|null} [trivial] ItemMeta trivial
		* @property {string|null} [tweetId] ItemMeta tweetId
		*/
		/**
		* Constructs a new ItemMeta.
		* @memberof pb
		* @classdesc Represents an ItemMeta.
		* @implements IItemMeta
		* @constructor
		* @param {pb.IItemMeta=} [properties] Properties to set
		*/
		function ItemMeta(properties) {
			if (properties) {
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
			}
		}
		/**
		* ItemMeta tsCreate.
		* @member {number} tsCreate
		* @memberof pb.ItemMeta
		* @instance
		*/
		ItemMeta.prototype.tsCreate = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
		/**
		* ItemMeta tsRevise.
		* @member {number} tsRevise
		* @memberof pb.ItemMeta
		* @instance
		*/
		ItemMeta.prototype.tsRevise = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
		/**
		* ItemMeta tsHide.
		* @member {number} tsHide
		* @memberof pb.ItemMeta
		* @instance
		*/
		ItemMeta.prototype.tsHide = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
		/**
		* ItemMeta root.
		* @member {number} root
		* @memberof pb.ItemMeta
		* @instance
		*/
		ItemMeta.prototype.root = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
		/**
		* ItemMeta title.
		* @member {string} title
		* @memberof pb.ItemMeta
		* @instance
		*/
		ItemMeta.prototype.title = "";
		/**
		* ItemMeta original.
		* @member {boolean} original
		* @memberof pb.ItemMeta
		* @instance
		*/
		ItemMeta.prototype.original = false;
		/**
		* ItemMeta trivial.
		* @member {boolean} trivial
		* @memberof pb.ItemMeta
		* @instance
		*/
		ItemMeta.prototype.trivial = false;
		/**
		* ItemMeta tweetId.
		* @member {string} tweetId
		* @memberof pb.ItemMeta
		* @instance
		*/
		ItemMeta.prototype.tweetId = "";
		/**
		* Creates a new ItemMeta instance using the specified properties.
		* @function create
		* @memberof pb.ItemMeta
		* @static
		* @param {pb.IItemMeta=} [properties] Properties to set
		* @returns {pb.ItemMeta} ItemMeta instance
		*/
		ItemMeta.create = function create(properties) {
			return new ItemMeta(properties);
		};
		/**
		* Encodes the specified ItemMeta message. Does not implicitly {@link pb.ItemMeta.verify|verify} messages.
		* @function encode
		* @memberof pb.ItemMeta
		* @static
		* @param {pb.IItemMeta} message ItemMeta message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		ItemMeta.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.tsCreate != null && Object.hasOwnProperty.call(message, "tsCreate")) writer.uint32(8).uint64(message.tsCreate);
			if (message.tsRevise != null && Object.hasOwnProperty.call(message, "tsRevise")) writer.uint32(16).uint64(message.tsRevise);
			if (message.tsHide != null && Object.hasOwnProperty.call(message, "tsHide")) writer.uint32(24).uint64(message.tsHide);
			if (message.root != null && Object.hasOwnProperty.call(message, "root")) writer.uint32(32).uint64(message.root);
			if (message.title != null && Object.hasOwnProperty.call(message, "title")) writer.uint32(42).string(message.title);
			if (message.original != null && Object.hasOwnProperty.call(message, "original")) writer.uint32(48).bool(message.original);
			if (message.trivial != null && Object.hasOwnProperty.call(message, "trivial")) writer.uint32(56).bool(message.trivial);
			if (message.tweetId != null && Object.hasOwnProperty.call(message, "tweetId")) writer.uint32(66).string(message.tweetId);
			return writer;
		};
		/**
		* Encodes the specified ItemMeta message, length delimited. Does not implicitly {@link pb.ItemMeta.verify|verify} messages.
		* @function encodeDelimited
		* @memberof pb.ItemMeta
		* @static
		* @param {pb.IItemMeta} message ItemMeta message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		ItemMeta.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};
		/**
		* Decodes an ItemMeta message from the specified reader or buffer.
		* @function decode
		* @memberof pb.ItemMeta
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @param {number} [length] Message length if known beforehand
		* @returns {pb.ItemMeta} ItemMeta
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		ItemMeta.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.pb.ItemMeta();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error) break;
				switch (tag >>> 3) {
					case 1:
						message.tsCreate = reader.uint64();
						break;
					case 2:
						message.tsRevise = reader.uint64();
						break;
					case 3:
						message.tsHide = reader.uint64();
						break;
					case 4:
						message.root = reader.uint64();
						break;
					case 5:
						message.title = reader.string();
						break;
					case 6:
						message.original = reader.bool();
						break;
					case 7:
						message.trivial = reader.bool();
						break;
					case 8:
						message.tweetId = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};
		/**
		* Decodes an ItemMeta message from the specified reader or buffer, length delimited.
		* @function decodeDelimited
		* @memberof pb.ItemMeta
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @returns {pb.ItemMeta} ItemMeta
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		ItemMeta.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};
		/**
		* Verifies an ItemMeta message.
		* @function verify
		* @memberof pb.ItemMeta
		* @static
		* @param {Object.<string,*>} message Plain object to verify
		* @returns {string|null} `null` if valid, otherwise the reason why it is not
		*/
		ItemMeta.verify = function verify(message) {
			if (typeof message !== "object" || message === null) return "object expected";
			if (message.tsCreate != null && message.hasOwnProperty("tsCreate")) {
				if (!$util.isInteger(message.tsCreate) && !(message.tsCreate && $util.isInteger(message.tsCreate.low) && $util.isInteger(message.tsCreate.high))) return "tsCreate: integer|Long expected";
			}
			if (message.tsRevise != null && message.hasOwnProperty("tsRevise")) {
				if (!$util.isInteger(message.tsRevise) && !(message.tsRevise && $util.isInteger(message.tsRevise.low) && $util.isInteger(message.tsRevise.high))) return "tsRevise: integer|Long expected";
			}
			if (message.tsHide != null && message.hasOwnProperty("tsHide")) {
				if (!$util.isInteger(message.tsHide) && !(message.tsHide && $util.isInteger(message.tsHide.low) && $util.isInteger(message.tsHide.high))) return "tsHide: integer|Long expected";
			}
			if (message.root != null && message.hasOwnProperty("root")) {
				if (!$util.isInteger(message.root) && !(message.root && $util.isInteger(message.root.low) && $util.isInteger(message.root.high))) return "root: integer|Long expected";
			}
			if (message.title != null && message.hasOwnProperty("title")) {
				if (!$util.isString(message.title)) return "title: string expected";
			}
			if (message.original != null && message.hasOwnProperty("original")) {
				if (typeof message.original !== "boolean") return "original: boolean expected";
			}
			if (message.trivial != null && message.hasOwnProperty("trivial")) {
				if (typeof message.trivial !== "boolean") return "trivial: boolean expected";
			}
			if (message.tweetId != null && message.hasOwnProperty("tweetId")) {
				if (!$util.isString(message.tweetId)) return "tweetId: string expected";
			}
			return null;
		};
		/**
		* Creates an ItemMeta message from a plain object. Also converts values to their respective internal types.
		* @function fromObject
		* @memberof pb.ItemMeta
		* @static
		* @param {Object.<string,*>} object Plain object
		* @returns {pb.ItemMeta} ItemMeta
		*/
		ItemMeta.fromObject = function fromObject(object) {
			if (object instanceof $root.pb.ItemMeta) return object;
			let message = new $root.pb.ItemMeta();
			if (object.tsCreate != null) {
				if ($util.Long) (message.tsCreate = $util.Long.fromValue(object.tsCreate)).unsigned = true;
				else if (typeof object.tsCreate === "string") message.tsCreate = parseInt(object.tsCreate, 10);
				else if (typeof object.tsCreate === "number") message.tsCreate = object.tsCreate;
				else if (typeof object.tsCreate === "object") message.tsCreate = new $util.LongBits(object.tsCreate.low >>> 0, object.tsCreate.high >>> 0).toNumber(true);
			}
			if (object.tsRevise != null) {
				if ($util.Long) (message.tsRevise = $util.Long.fromValue(object.tsRevise)).unsigned = true;
				else if (typeof object.tsRevise === "string") message.tsRevise = parseInt(object.tsRevise, 10);
				else if (typeof object.tsRevise === "number") message.tsRevise = object.tsRevise;
				else if (typeof object.tsRevise === "object") message.tsRevise = new $util.LongBits(object.tsRevise.low >>> 0, object.tsRevise.high >>> 0).toNumber(true);
			}
			if (object.tsHide != null) {
				if ($util.Long) (message.tsHide = $util.Long.fromValue(object.tsHide)).unsigned = true;
				else if (typeof object.tsHide === "string") message.tsHide = parseInt(object.tsHide, 10);
				else if (typeof object.tsHide === "number") message.tsHide = object.tsHide;
				else if (typeof object.tsHide === "object") message.tsHide = new $util.LongBits(object.tsHide.low >>> 0, object.tsHide.high >>> 0).toNumber(true);
			}
			if (object.root != null) {
				if ($util.Long) (message.root = $util.Long.fromValue(object.root)).unsigned = true;
				else if (typeof object.root === "string") message.root = parseInt(object.root, 10);
				else if (typeof object.root === "number") message.root = object.root;
				else if (typeof object.root === "object") message.root = new $util.LongBits(object.root.low >>> 0, object.root.high >>> 0).toNumber(true);
			}
			if (object.title != null) message.title = String(object.title);
			if (object.original != null) message.original = Boolean(object.original);
			if (object.trivial != null) message.trivial = Boolean(object.trivial);
			if (object.tweetId != null) message.tweetId = String(object.tweetId);
			return message;
		};
		/**
		* Creates a plain object from an ItemMeta message. Also converts values to other types if specified.
		* @function toObject
		* @memberof pb.ItemMeta
		* @static
		* @param {pb.ItemMeta} message ItemMeta
		* @param {$protobuf.IConversionOptions} [options] Conversion options
		* @returns {Object.<string,*>} Plain object
		*/
		ItemMeta.toObject = function toObject(message, options) {
			if (!options) options = {};
			let object = {};
			if (options.defaults) {
				if ($util.Long) {
					let long = new $util.Long(0, 0, true);
					object.tsCreate = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
				} else object.tsCreate = options.longs === String ? "0" : 0;
				if ($util.Long) {
					let long = new $util.Long(0, 0, true);
					object.tsRevise = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
				} else object.tsRevise = options.longs === String ? "0" : 0;
				if ($util.Long) {
					let long = new $util.Long(0, 0, true);
					object.tsHide = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
				} else object.tsHide = options.longs === String ? "0" : 0;
				if ($util.Long) {
					let long = new $util.Long(0, 0, true);
					object.root = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
				} else object.root = options.longs === String ? "0" : 0;
				object.title = "";
				object.original = false;
				object.trivial = false;
				object.tweetId = "";
			}
			if (message.tsCreate != null && message.hasOwnProperty("tsCreate")) if (typeof message.tsCreate === "number") object.tsCreate = options.longs === String ? String(message.tsCreate) : message.tsCreate;
			else object.tsCreate = options.longs === String ? $util.Long.prototype.toString.call(message.tsCreate) : options.longs === Number ? new $util.LongBits(message.tsCreate.low >>> 0, message.tsCreate.high >>> 0).toNumber(true) : message.tsCreate;
			if (message.tsRevise != null && message.hasOwnProperty("tsRevise")) if (typeof message.tsRevise === "number") object.tsRevise = options.longs === String ? String(message.tsRevise) : message.tsRevise;
			else object.tsRevise = options.longs === String ? $util.Long.prototype.toString.call(message.tsRevise) : options.longs === Number ? new $util.LongBits(message.tsRevise.low >>> 0, message.tsRevise.high >>> 0).toNumber(true) : message.tsRevise;
			if (message.tsHide != null && message.hasOwnProperty("tsHide")) if (typeof message.tsHide === "number") object.tsHide = options.longs === String ? String(message.tsHide) : message.tsHide;
			else object.tsHide = options.longs === String ? $util.Long.prototype.toString.call(message.tsHide) : options.longs === Number ? new $util.LongBits(message.tsHide.low >>> 0, message.tsHide.high >>> 0).toNumber(true) : message.tsHide;
			if (message.root != null && message.hasOwnProperty("root")) if (typeof message.root === "number") object.root = options.longs === String ? String(message.root) : message.root;
			else object.root = options.longs === String ? $util.Long.prototype.toString.call(message.root) : options.longs === Number ? new $util.LongBits(message.root.low >>> 0, message.root.high >>> 0).toNumber(true) : message.root;
			if (message.title != null && message.hasOwnProperty("title")) object.title = message.title;
			if (message.original != null && message.hasOwnProperty("original")) object.original = message.original;
			if (message.trivial != null && message.hasOwnProperty("trivial")) object.trivial = message.trivial;
			if (message.tweetId != null && message.hasOwnProperty("tweetId")) object.tweetId = message.tweetId;
			return object;
		};
		/**
		* Converts this ItemMeta to JSON.
		* @function toJSON
		* @memberof pb.ItemMeta
		* @instance
		* @returns {Object.<string,*>} JSON object
		*/
		ItemMeta.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, import_minimal.util.toJSONOptions);
		};
		/**
		* Gets the default type url for ItemMeta
		* @function getTypeUrl
		* @memberof pb.ItemMeta
		* @static
		* @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		* @returns {string} The default type url
		*/
		ItemMeta.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === void 0) typeUrlPrefix = "type.googleapis.com";
			return typeUrlPrefix + "/pb.ItemMeta";
		};
		return ItemMeta;
	})();
	pb.ItemDB = (function() {
		/**
		* Properties of an ItemDB.
		* @memberof pb
		* @interface IItemDB
		* @property {number|null} [id] ItemDB id
		* @property {pb.IItemMeta|null} [meta] ItemDB meta
		* @property {number|null} [revisionId] ItemDB revisionId
		* @property {number|null} [ogId] ItemDB ogId
		*/
		/**
		* Constructs a new ItemDB.
		* @memberof pb
		* @classdesc Represents an ItemDB.
		* @implements IItemDB
		* @constructor
		* @param {pb.IItemDB=} [properties] Properties to set
		*/
		function ItemDB(properties) {
			if (properties) {
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
			}
		}
		/**
		* ItemDB id.
		* @member {number} id
		* @memberof pb.ItemDB
		* @instance
		*/
		ItemDB.prototype.id = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
		/**
		* ItemDB meta.
		* @member {pb.IItemMeta|null|undefined} meta
		* @memberof pb.ItemDB
		* @instance
		*/
		ItemDB.prototype.meta = null;
		/**
		* ItemDB revisionId.
		* @member {number} revisionId
		* @memberof pb.ItemDB
		* @instance
		*/
		ItemDB.prototype.revisionId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
		/**
		* ItemDB ogId.
		* @member {number} ogId
		* @memberof pb.ItemDB
		* @instance
		*/
		ItemDB.prototype.ogId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
		/**
		* Creates a new ItemDB instance using the specified properties.
		* @function create
		* @memberof pb.ItemDB
		* @static
		* @param {pb.IItemDB=} [properties] Properties to set
		* @returns {pb.ItemDB} ItemDB instance
		*/
		ItemDB.create = function create(properties) {
			return new ItemDB(properties);
		};
		/**
		* Encodes the specified ItemDB message. Does not implicitly {@link pb.ItemDB.verify|verify} messages.
		* @function encode
		* @memberof pb.ItemDB
		* @static
		* @param {pb.IItemDB} message ItemDB message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		ItemDB.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.id != null && Object.hasOwnProperty.call(message, "id")) writer.uint32(8).uint64(message.id);
			if (message.meta != null && Object.hasOwnProperty.call(message, "meta")) $root.pb.ItemMeta.encode(message.meta, writer.uint32(18).fork()).ldelim();
			if (message.revisionId != null && Object.hasOwnProperty.call(message, "revisionId")) writer.uint32(24).uint64(message.revisionId);
			if (message.ogId != null && Object.hasOwnProperty.call(message, "ogId")) writer.uint32(32).uint64(message.ogId);
			return writer;
		};
		/**
		* Encodes the specified ItemDB message, length delimited. Does not implicitly {@link pb.ItemDB.verify|verify} messages.
		* @function encodeDelimited
		* @memberof pb.ItemDB
		* @static
		* @param {pb.IItemDB} message ItemDB message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		ItemDB.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};
		/**
		* Decodes an ItemDB message from the specified reader or buffer.
		* @function decode
		* @memberof pb.ItemDB
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @param {number} [length] Message length if known beforehand
		* @returns {pb.ItemDB} ItemDB
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		ItemDB.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.pb.ItemDB();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error) break;
				switch (tag >>> 3) {
					case 1:
						message.id = reader.uint64();
						break;
					case 2:
						message.meta = $root.pb.ItemMeta.decode(reader, reader.uint32());
						break;
					case 3:
						message.revisionId = reader.uint64();
						break;
					case 4:
						message.ogId = reader.uint64();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};
		/**
		* Decodes an ItemDB message from the specified reader or buffer, length delimited.
		* @function decodeDelimited
		* @memberof pb.ItemDB
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @returns {pb.ItemDB} ItemDB
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		ItemDB.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};
		/**
		* Verifies an ItemDB message.
		* @function verify
		* @memberof pb.ItemDB
		* @static
		* @param {Object.<string,*>} message Plain object to verify
		* @returns {string|null} `null` if valid, otherwise the reason why it is not
		*/
		ItemDB.verify = function verify(message) {
			if (typeof message !== "object" || message === null) return "object expected";
			if (message.id != null && message.hasOwnProperty("id")) {
				if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high))) return "id: integer|Long expected";
			}
			if (message.meta != null && message.hasOwnProperty("meta")) {
				let error = $root.pb.ItemMeta.verify(message.meta);
				if (error) return "meta." + error;
			}
			if (message.revisionId != null && message.hasOwnProperty("revisionId")) {
				if (!$util.isInteger(message.revisionId) && !(message.revisionId && $util.isInteger(message.revisionId.low) && $util.isInteger(message.revisionId.high))) return "revisionId: integer|Long expected";
			}
			if (message.ogId != null && message.hasOwnProperty("ogId")) {
				if (!$util.isInteger(message.ogId) && !(message.ogId && $util.isInteger(message.ogId.low) && $util.isInteger(message.ogId.high))) return "ogId: integer|Long expected";
			}
			return null;
		};
		/**
		* Creates an ItemDB message from a plain object. Also converts values to their respective internal types.
		* @function fromObject
		* @memberof pb.ItemDB
		* @static
		* @param {Object.<string,*>} object Plain object
		* @returns {pb.ItemDB} ItemDB
		*/
		ItemDB.fromObject = function fromObject(object) {
			if (object instanceof $root.pb.ItemDB) return object;
			let message = new $root.pb.ItemDB();
			if (object.id != null) {
				if ($util.Long) (message.id = $util.Long.fromValue(object.id)).unsigned = true;
				else if (typeof object.id === "string") message.id = parseInt(object.id, 10);
				else if (typeof object.id === "number") message.id = object.id;
				else if (typeof object.id === "object") message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber(true);
			}
			if (object.meta != null) {
				if (typeof object.meta !== "object") throw TypeError(".pb.ItemDB.meta: object expected");
				message.meta = $root.pb.ItemMeta.fromObject(object.meta);
			}
			if (object.revisionId != null) {
				if ($util.Long) (message.revisionId = $util.Long.fromValue(object.revisionId)).unsigned = true;
				else if (typeof object.revisionId === "string") message.revisionId = parseInt(object.revisionId, 10);
				else if (typeof object.revisionId === "number") message.revisionId = object.revisionId;
				else if (typeof object.revisionId === "object") message.revisionId = new $util.LongBits(object.revisionId.low >>> 0, object.revisionId.high >>> 0).toNumber(true);
			}
			if (object.ogId != null) {
				if ($util.Long) (message.ogId = $util.Long.fromValue(object.ogId)).unsigned = true;
				else if (typeof object.ogId === "string") message.ogId = parseInt(object.ogId, 10);
				else if (typeof object.ogId === "number") message.ogId = object.ogId;
				else if (typeof object.ogId === "object") message.ogId = new $util.LongBits(object.ogId.low >>> 0, object.ogId.high >>> 0).toNumber(true);
			}
			return message;
		};
		/**
		* Creates a plain object from an ItemDB message. Also converts values to other types if specified.
		* @function toObject
		* @memberof pb.ItemDB
		* @static
		* @param {pb.ItemDB} message ItemDB
		* @param {$protobuf.IConversionOptions} [options] Conversion options
		* @returns {Object.<string,*>} Plain object
		*/
		ItemDB.toObject = function toObject(message, options) {
			if (!options) options = {};
			let object = {};
			if (options.defaults) {
				if ($util.Long) {
					let long = new $util.Long(0, 0, true);
					object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
				} else object.id = options.longs === String ? "0" : 0;
				object.meta = null;
				if ($util.Long) {
					let long = new $util.Long(0, 0, true);
					object.revisionId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
				} else object.revisionId = options.longs === String ? "0" : 0;
				if ($util.Long) {
					let long = new $util.Long(0, 0, true);
					object.ogId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
				} else object.ogId = options.longs === String ? "0" : 0;
			}
			if (message.id != null && message.hasOwnProperty("id")) if (typeof message.id === "number") object.id = options.longs === String ? String(message.id) : message.id;
			else object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber(true) : message.id;
			if (message.meta != null && message.hasOwnProperty("meta")) object.meta = $root.pb.ItemMeta.toObject(message.meta, options);
			if (message.revisionId != null && message.hasOwnProperty("revisionId")) if (typeof message.revisionId === "number") object.revisionId = options.longs === String ? String(message.revisionId) : message.revisionId;
			else object.revisionId = options.longs === String ? $util.Long.prototype.toString.call(message.revisionId) : options.longs === Number ? new $util.LongBits(message.revisionId.low >>> 0, message.revisionId.high >>> 0).toNumber(true) : message.revisionId;
			if (message.ogId != null && message.hasOwnProperty("ogId")) if (typeof message.ogId === "number") object.ogId = options.longs === String ? String(message.ogId) : message.ogId;
			else object.ogId = options.longs === String ? $util.Long.prototype.toString.call(message.ogId) : options.longs === Number ? new $util.LongBits(message.ogId.low >>> 0, message.ogId.high >>> 0).toNumber(true) : message.ogId;
			return object;
		};
		/**
		* Converts this ItemDB to JSON.
		* @function toJSON
		* @memberof pb.ItemDB
		* @instance
		* @returns {Object.<string,*>} JSON object
		*/
		ItemDB.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, import_minimal.util.toJSONOptions);
		};
		/**
		* Gets the default type url for ItemDB
		* @function getTypeUrl
		* @memberof pb.ItemDB
		* @static
		* @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		* @returns {string} The default type url
		*/
		ItemDB.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === void 0) typeUrlPrefix = "type.googleapis.com";
			return typeUrlPrefix + "/pb.ItemDB";
		};
		return ItemDB;
	})();
	pb.ItemEdit = (function() {
		/**
		* Properties of an ItemEdit.
		* @memberof pb
		* @interface IItemEdit
		* @property {number|null} [id] ItemEdit id
		* @property {pb.IRevision|null} [content] ItemEdit content
		* @property {string|null} [title] ItemEdit title
		* @property {number|null} [root] ItemEdit root
		* @property {number|null} [tsCreate] ItemEdit tsCreate
		* @property {boolean|null} [hide] ItemEdit hide
		* @property {boolean|null} [original] ItemEdit original
		* @property {boolean|null} [trivial] ItemEdit trivial
		* @property {pb.IOpenGraph|null} [og] ItemEdit og
		* @property {string|null} [tweetId] ItemEdit tweetId
		*/
		/**
		* Constructs a new ItemEdit.
		* @memberof pb
		* @classdesc Represents an ItemEdit.
		* @implements IItemEdit
		* @constructor
		* @param {pb.IItemEdit=} [properties] Properties to set
		*/
		function ItemEdit(properties) {
			if (properties) {
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
			}
		}
		/**
		* ItemEdit id.
		* @member {number} id
		* @memberof pb.ItemEdit
		* @instance
		*/
		ItemEdit.prototype.id = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
		/**
		* ItemEdit content.
		* @member {pb.IRevision|null|undefined} content
		* @memberof pb.ItemEdit
		* @instance
		*/
		ItemEdit.prototype.content = null;
		/**
		* ItemEdit title.
		* @member {string} title
		* @memberof pb.ItemEdit
		* @instance
		*/
		ItemEdit.prototype.title = "";
		/**
		* ItemEdit root.
		* @member {number} root
		* @memberof pb.ItemEdit
		* @instance
		*/
		ItemEdit.prototype.root = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
		/**
		* ItemEdit tsCreate.
		* @member {number} tsCreate
		* @memberof pb.ItemEdit
		* @instance
		*/
		ItemEdit.prototype.tsCreate = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
		/**
		* ItemEdit hide.
		* @member {boolean} hide
		* @memberof pb.ItemEdit
		* @instance
		*/
		ItemEdit.prototype.hide = false;
		/**
		* ItemEdit original.
		* @member {boolean} original
		* @memberof pb.ItemEdit
		* @instance
		*/
		ItemEdit.prototype.original = false;
		/**
		* ItemEdit trivial.
		* @member {boolean} trivial
		* @memberof pb.ItemEdit
		* @instance
		*/
		ItemEdit.prototype.trivial = false;
		/**
		* ItemEdit og.
		* @member {pb.IOpenGraph|null|undefined} og
		* @memberof pb.ItemEdit
		* @instance
		*/
		ItemEdit.prototype.og = null;
		/**
		* ItemEdit tweetId.
		* @member {string} tweetId
		* @memberof pb.ItemEdit
		* @instance
		*/
		ItemEdit.prototype.tweetId = "";
		/**
		* Creates a new ItemEdit instance using the specified properties.
		* @function create
		* @memberof pb.ItemEdit
		* @static
		* @param {pb.IItemEdit=} [properties] Properties to set
		* @returns {pb.ItemEdit} ItemEdit instance
		*/
		ItemEdit.create = function create(properties) {
			return new ItemEdit(properties);
		};
		/**
		* Encodes the specified ItemEdit message. Does not implicitly {@link pb.ItemEdit.verify|verify} messages.
		* @function encode
		* @memberof pb.ItemEdit
		* @static
		* @param {pb.IItemEdit} message ItemEdit message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		ItemEdit.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.id != null && Object.hasOwnProperty.call(message, "id")) writer.uint32(8).uint64(message.id);
			if (message.content != null && Object.hasOwnProperty.call(message, "content")) $root.pb.Revision.encode(message.content, writer.uint32(18).fork()).ldelim();
			if (message.title != null && Object.hasOwnProperty.call(message, "title")) writer.uint32(26).string(message.title);
			if (message.root != null && Object.hasOwnProperty.call(message, "root")) writer.uint32(32).uint64(message.root);
			if (message.tsCreate != null && Object.hasOwnProperty.call(message, "tsCreate")) writer.uint32(40).uint64(message.tsCreate);
			if (message.hide != null && Object.hasOwnProperty.call(message, "hide")) writer.uint32(48).bool(message.hide);
			if (message.original != null && Object.hasOwnProperty.call(message, "original")) writer.uint32(56).bool(message.original);
			if (message.trivial != null && Object.hasOwnProperty.call(message, "trivial")) writer.uint32(64).bool(message.trivial);
			if (message.og != null && Object.hasOwnProperty.call(message, "og")) $root.pb.OpenGraph.encode(message.og, writer.uint32(74).fork()).ldelim();
			if (message.tweetId != null && Object.hasOwnProperty.call(message, "tweetId")) writer.uint32(82).string(message.tweetId);
			return writer;
		};
		/**
		* Encodes the specified ItemEdit message, length delimited. Does not implicitly {@link pb.ItemEdit.verify|verify} messages.
		* @function encodeDelimited
		* @memberof pb.ItemEdit
		* @static
		* @param {pb.IItemEdit} message ItemEdit message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		ItemEdit.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};
		/**
		* Decodes an ItemEdit message from the specified reader or buffer.
		* @function decode
		* @memberof pb.ItemEdit
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @param {number} [length] Message length if known beforehand
		* @returns {pb.ItemEdit} ItemEdit
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		ItemEdit.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.pb.ItemEdit();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error) break;
				switch (tag >>> 3) {
					case 1:
						message.id = reader.uint64();
						break;
					case 2:
						message.content = $root.pb.Revision.decode(reader, reader.uint32());
						break;
					case 3:
						message.title = reader.string();
						break;
					case 4:
						message.root = reader.uint64();
						break;
					case 5:
						message.tsCreate = reader.uint64();
						break;
					case 6:
						message.hide = reader.bool();
						break;
					case 7:
						message.original = reader.bool();
						break;
					case 8:
						message.trivial = reader.bool();
						break;
					case 9:
						message.og = $root.pb.OpenGraph.decode(reader, reader.uint32());
						break;
					case 10:
						message.tweetId = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};
		/**
		* Decodes an ItemEdit message from the specified reader or buffer, length delimited.
		* @function decodeDelimited
		* @memberof pb.ItemEdit
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @returns {pb.ItemEdit} ItemEdit
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		ItemEdit.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};
		/**
		* Verifies an ItemEdit message.
		* @function verify
		* @memberof pb.ItemEdit
		* @static
		* @param {Object.<string,*>} message Plain object to verify
		* @returns {string|null} `null` if valid, otherwise the reason why it is not
		*/
		ItemEdit.verify = function verify(message) {
			if (typeof message !== "object" || message === null) return "object expected";
			if (message.id != null && message.hasOwnProperty("id")) {
				if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high))) return "id: integer|Long expected";
			}
			if (message.content != null && message.hasOwnProperty("content")) {
				let error = $root.pb.Revision.verify(message.content);
				if (error) return "content." + error;
			}
			if (message.title != null && message.hasOwnProperty("title")) {
				if (!$util.isString(message.title)) return "title: string expected";
			}
			if (message.root != null && message.hasOwnProperty("root")) {
				if (!$util.isInteger(message.root) && !(message.root && $util.isInteger(message.root.low) && $util.isInteger(message.root.high))) return "root: integer|Long expected";
			}
			if (message.tsCreate != null && message.hasOwnProperty("tsCreate")) {
				if (!$util.isInteger(message.tsCreate) && !(message.tsCreate && $util.isInteger(message.tsCreate.low) && $util.isInteger(message.tsCreate.high))) return "tsCreate: integer|Long expected";
			}
			if (message.hide != null && message.hasOwnProperty("hide")) {
				if (typeof message.hide !== "boolean") return "hide: boolean expected";
			}
			if (message.original != null && message.hasOwnProperty("original")) {
				if (typeof message.original !== "boolean") return "original: boolean expected";
			}
			if (message.trivial != null && message.hasOwnProperty("trivial")) {
				if (typeof message.trivial !== "boolean") return "trivial: boolean expected";
			}
			if (message.og != null && message.hasOwnProperty("og")) {
				let error = $root.pb.OpenGraph.verify(message.og);
				if (error) return "og." + error;
			}
			if (message.tweetId != null && message.hasOwnProperty("tweetId")) {
				if (!$util.isString(message.tweetId)) return "tweetId: string expected";
			}
			return null;
		};
		/**
		* Creates an ItemEdit message from a plain object. Also converts values to their respective internal types.
		* @function fromObject
		* @memberof pb.ItemEdit
		* @static
		* @param {Object.<string,*>} object Plain object
		* @returns {pb.ItemEdit} ItemEdit
		*/
		ItemEdit.fromObject = function fromObject(object) {
			if (object instanceof $root.pb.ItemEdit) return object;
			let message = new $root.pb.ItemEdit();
			if (object.id != null) {
				if ($util.Long) (message.id = $util.Long.fromValue(object.id)).unsigned = true;
				else if (typeof object.id === "string") message.id = parseInt(object.id, 10);
				else if (typeof object.id === "number") message.id = object.id;
				else if (typeof object.id === "object") message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber(true);
			}
			if (object.content != null) {
				if (typeof object.content !== "object") throw TypeError(".pb.ItemEdit.content: object expected");
				message.content = $root.pb.Revision.fromObject(object.content);
			}
			if (object.title != null) message.title = String(object.title);
			if (object.root != null) {
				if ($util.Long) (message.root = $util.Long.fromValue(object.root)).unsigned = true;
				else if (typeof object.root === "string") message.root = parseInt(object.root, 10);
				else if (typeof object.root === "number") message.root = object.root;
				else if (typeof object.root === "object") message.root = new $util.LongBits(object.root.low >>> 0, object.root.high >>> 0).toNumber(true);
			}
			if (object.tsCreate != null) {
				if ($util.Long) (message.tsCreate = $util.Long.fromValue(object.tsCreate)).unsigned = true;
				else if (typeof object.tsCreate === "string") message.tsCreate = parseInt(object.tsCreate, 10);
				else if (typeof object.tsCreate === "number") message.tsCreate = object.tsCreate;
				else if (typeof object.tsCreate === "object") message.tsCreate = new $util.LongBits(object.tsCreate.low >>> 0, object.tsCreate.high >>> 0).toNumber(true);
			}
			if (object.hide != null) message.hide = Boolean(object.hide);
			if (object.original != null) message.original = Boolean(object.original);
			if (object.trivial != null) message.trivial = Boolean(object.trivial);
			if (object.og != null) {
				if (typeof object.og !== "object") throw TypeError(".pb.ItemEdit.og: object expected");
				message.og = $root.pb.OpenGraph.fromObject(object.og);
			}
			if (object.tweetId != null) message.tweetId = String(object.tweetId);
			return message;
		};
		/**
		* Creates a plain object from an ItemEdit message. Also converts values to other types if specified.
		* @function toObject
		* @memberof pb.ItemEdit
		* @static
		* @param {pb.ItemEdit} message ItemEdit
		* @param {$protobuf.IConversionOptions} [options] Conversion options
		* @returns {Object.<string,*>} Plain object
		*/
		ItemEdit.toObject = function toObject(message, options) {
			if (!options) options = {};
			let object = {};
			if (options.defaults) {
				if ($util.Long) {
					let long = new $util.Long(0, 0, true);
					object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
				} else object.id = options.longs === String ? "0" : 0;
				object.content = null;
				object.title = "";
				if ($util.Long) {
					let long = new $util.Long(0, 0, true);
					object.root = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
				} else object.root = options.longs === String ? "0" : 0;
				if ($util.Long) {
					let long = new $util.Long(0, 0, true);
					object.tsCreate = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
				} else object.tsCreate = options.longs === String ? "0" : 0;
				object.hide = false;
				object.original = false;
				object.trivial = false;
				object.og = null;
				object.tweetId = "";
			}
			if (message.id != null && message.hasOwnProperty("id")) if (typeof message.id === "number") object.id = options.longs === String ? String(message.id) : message.id;
			else object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber(true) : message.id;
			if (message.content != null && message.hasOwnProperty("content")) object.content = $root.pb.Revision.toObject(message.content, options);
			if (message.title != null && message.hasOwnProperty("title")) object.title = message.title;
			if (message.root != null && message.hasOwnProperty("root")) if (typeof message.root === "number") object.root = options.longs === String ? String(message.root) : message.root;
			else object.root = options.longs === String ? $util.Long.prototype.toString.call(message.root) : options.longs === Number ? new $util.LongBits(message.root.low >>> 0, message.root.high >>> 0).toNumber(true) : message.root;
			if (message.tsCreate != null && message.hasOwnProperty("tsCreate")) if (typeof message.tsCreate === "number") object.tsCreate = options.longs === String ? String(message.tsCreate) : message.tsCreate;
			else object.tsCreate = options.longs === String ? $util.Long.prototype.toString.call(message.tsCreate) : options.longs === Number ? new $util.LongBits(message.tsCreate.low >>> 0, message.tsCreate.high >>> 0).toNumber(true) : message.tsCreate;
			if (message.hide != null && message.hasOwnProperty("hide")) object.hide = message.hide;
			if (message.original != null && message.hasOwnProperty("original")) object.original = message.original;
			if (message.trivial != null && message.hasOwnProperty("trivial")) object.trivial = message.trivial;
			if (message.og != null && message.hasOwnProperty("og")) object.og = $root.pb.OpenGraph.toObject(message.og, options);
			if (message.tweetId != null && message.hasOwnProperty("tweetId")) object.tweetId = message.tweetId;
			return object;
		};
		/**
		* Converts this ItemEdit to JSON.
		* @function toJSON
		* @memberof pb.ItemEdit
		* @instance
		* @returns {Object.<string,*>} JSON object
		*/
		ItemEdit.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, import_minimal.util.toJSONOptions);
		};
		/**
		* Gets the default type url for ItemEdit
		* @function getTypeUrl
		* @memberof pb.ItemEdit
		* @static
		* @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		* @returns {string} The default type url
		*/
		ItemEdit.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === void 0) typeUrlPrefix = "type.googleapis.com";
			return typeUrlPrefix + "/pb.ItemEdit";
		};
		return ItemEdit;
	})();
	pb.ItemList = (function() {
		/**
		* Properties of an ItemList.
		* @memberof pb
		* @interface IItemList
		* @property {Array.<pb.IItem>|null} [list] ItemList list
		*/
		/**
		* Constructs a new ItemList.
		* @memberof pb
		* @classdesc Represents an ItemList.
		* @implements IItemList
		* @constructor
		* @param {pb.IItemList=} [properties] Properties to set
		*/
		function ItemList(properties) {
			this.list = [];
			if (properties) {
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
			}
		}
		/**
		* ItemList list.
		* @member {Array.<pb.IItem>} list
		* @memberof pb.ItemList
		* @instance
		*/
		ItemList.prototype.list = $util.emptyArray;
		/**
		* Creates a new ItemList instance using the specified properties.
		* @function create
		* @memberof pb.ItemList
		* @static
		* @param {pb.IItemList=} [properties] Properties to set
		* @returns {pb.ItemList} ItemList instance
		*/
		ItemList.create = function create(properties) {
			return new ItemList(properties);
		};
		/**
		* Encodes the specified ItemList message. Does not implicitly {@link pb.ItemList.verify|verify} messages.
		* @function encode
		* @memberof pb.ItemList
		* @static
		* @param {pb.IItemList} message ItemList message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		ItemList.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.list != null && message.list.length) for (let i = 0; i < message.list.length; ++i) $root.pb.Item.encode(message.list[i], writer.uint32(10).fork()).ldelim();
			return writer;
		};
		/**
		* Encodes the specified ItemList message, length delimited. Does not implicitly {@link pb.ItemList.verify|verify} messages.
		* @function encodeDelimited
		* @memberof pb.ItemList
		* @static
		* @param {pb.IItemList} message ItemList message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		ItemList.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};
		/**
		* Decodes an ItemList message from the specified reader or buffer.
		* @function decode
		* @memberof pb.ItemList
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @param {number} [length] Message length if known beforehand
		* @returns {pb.ItemList} ItemList
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		ItemList.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.pb.ItemList();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error) break;
				switch (tag >>> 3) {
					case 1:
						if (!(message.list && message.list.length)) message.list = [];
						message.list.push($root.pb.Item.decode(reader, reader.uint32()));
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};
		/**
		* Decodes an ItemList message from the specified reader or buffer, length delimited.
		* @function decodeDelimited
		* @memberof pb.ItemList
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @returns {pb.ItemList} ItemList
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		ItemList.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};
		/**
		* Verifies an ItemList message.
		* @function verify
		* @memberof pb.ItemList
		* @static
		* @param {Object.<string,*>} message Plain object to verify
		* @returns {string|null} `null` if valid, otherwise the reason why it is not
		*/
		ItemList.verify = function verify(message) {
			if (typeof message !== "object" || message === null) return "object expected";
			if (message.list != null && message.hasOwnProperty("list")) {
				if (!Array.isArray(message.list)) return "list: array expected";
				for (let i = 0; i < message.list.length; ++i) {
					let error = $root.pb.Item.verify(message.list[i]);
					if (error) return "list." + error;
				}
			}
			return null;
		};
		/**
		* Creates an ItemList message from a plain object. Also converts values to their respective internal types.
		* @function fromObject
		* @memberof pb.ItemList
		* @static
		* @param {Object.<string,*>} object Plain object
		* @returns {pb.ItemList} ItemList
		*/
		ItemList.fromObject = function fromObject(object) {
			if (object instanceof $root.pb.ItemList) return object;
			let message = new $root.pb.ItemList();
			if (object.list) {
				if (!Array.isArray(object.list)) throw TypeError(".pb.ItemList.list: array expected");
				message.list = [];
				for (let i = 0; i < object.list.length; ++i) {
					if (typeof object.list[i] !== "object") throw TypeError(".pb.ItemList.list: object expected");
					message.list[i] = $root.pb.Item.fromObject(object.list[i]);
				}
			}
			return message;
		};
		/**
		* Creates a plain object from an ItemList message. Also converts values to other types if specified.
		* @function toObject
		* @memberof pb.ItemList
		* @static
		* @param {pb.ItemList} message ItemList
		* @param {$protobuf.IConversionOptions} [options] Conversion options
		* @returns {Object.<string,*>} Plain object
		*/
		ItemList.toObject = function toObject(message, options) {
			if (!options) options = {};
			let object = {};
			if (options.arrays || options.defaults) object.list = [];
			if (message.list && message.list.length) {
				object.list = [];
				for (let j = 0; j < message.list.length; ++j) object.list[j] = $root.pb.Item.toObject(message.list[j], options);
			}
			return object;
		};
		/**
		* Converts this ItemList to JSON.
		* @function toJSON
		* @memberof pb.ItemList
		* @instance
		* @returns {Object.<string,*>} JSON object
		*/
		ItemList.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, import_minimal.util.toJSONOptions);
		};
		/**
		* Gets the default type url for ItemList
		* @function getTypeUrl
		* @memberof pb.ItemList
		* @static
		* @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		* @returns {string} The default type url
		*/
		ItemList.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === void 0) typeUrlPrefix = "type.googleapis.com";
			return typeUrlPrefix + "/pb.ItemList";
		};
		return ItemList;
	})();
	pb.Revision = (function() {
		/**
		* Properties of a Revision.
		* @memberof pb
		* @interface IRevision
		* @property {pb.Format.Enum|null} [format] Revision format
		* @property {string|null} [raw] Revision raw
		*/
		/**
		* Constructs a new Revision.
		* @memberof pb
		* @classdesc Represents a Revision.
		* @implements IRevision
		* @constructor
		* @param {pb.IRevision=} [properties] Properties to set
		*/
		function Revision(properties) {
			if (properties) {
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
			}
		}
		/**
		* Revision format.
		* @member {pb.Format.Enum} format
		* @memberof pb.Revision
		* @instance
		*/
		Revision.prototype.format = 0;
		/**
		* Revision raw.
		* @member {string} raw
		* @memberof pb.Revision
		* @instance
		*/
		Revision.prototype.raw = "";
		/**
		* Creates a new Revision instance using the specified properties.
		* @function create
		* @memberof pb.Revision
		* @static
		* @param {pb.IRevision=} [properties] Properties to set
		* @returns {pb.Revision} Revision instance
		*/
		Revision.create = function create(properties) {
			return new Revision(properties);
		};
		/**
		* Encodes the specified Revision message. Does not implicitly {@link pb.Revision.verify|verify} messages.
		* @function encode
		* @memberof pb.Revision
		* @static
		* @param {pb.IRevision} message Revision message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		Revision.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.format != null && Object.hasOwnProperty.call(message, "format")) writer.uint32(8).int32(message.format);
			if (message.raw != null && Object.hasOwnProperty.call(message, "raw")) writer.uint32(18).string(message.raw);
			return writer;
		};
		/**
		* Encodes the specified Revision message, length delimited. Does not implicitly {@link pb.Revision.verify|verify} messages.
		* @function encodeDelimited
		* @memberof pb.Revision
		* @static
		* @param {pb.IRevision} message Revision message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		Revision.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};
		/**
		* Decodes a Revision message from the specified reader or buffer.
		* @function decode
		* @memberof pb.Revision
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @param {number} [length] Message length if known beforehand
		* @returns {pb.Revision} Revision
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		Revision.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.pb.Revision();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error) break;
				switch (tag >>> 3) {
					case 1:
						message.format = reader.int32();
						break;
					case 2:
						message.raw = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};
		/**
		* Decodes a Revision message from the specified reader or buffer, length delimited.
		* @function decodeDelimited
		* @memberof pb.Revision
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @returns {pb.Revision} Revision
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		Revision.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};
		/**
		* Verifies a Revision message.
		* @function verify
		* @memberof pb.Revision
		* @static
		* @param {Object.<string,*>} message Plain object to verify
		* @returns {string|null} `null` if valid, otherwise the reason why it is not
		*/
		Revision.verify = function verify(message) {
			if (typeof message !== "object" || message === null) return "object expected";
			if (message.format != null && message.hasOwnProperty("format")) switch (message.format) {
				default: return "format: enum value expected";
				case 0:
				case 1:
				case 2: break;
			}
			if (message.raw != null && message.hasOwnProperty("raw")) {
				if (!$util.isString(message.raw)) return "raw: string expected";
			}
			return null;
		};
		/**
		* Creates a Revision message from a plain object. Also converts values to their respective internal types.
		* @function fromObject
		* @memberof pb.Revision
		* @static
		* @param {Object.<string,*>} object Plain object
		* @returns {pb.Revision} Revision
		*/
		Revision.fromObject = function fromObject(object) {
			if (object instanceof $root.pb.Revision) return object;
			let message = new $root.pb.Revision();
			switch (object.format) {
				default:
					if (typeof object.format === "number") {
						message.format = object.format;
						break;
					}
					break;
				case "PLAIN":
				case 0:
					message.format = 0;
					break;
				case "MARKDOWN":
				case 1:
					message.format = 1;
					break;
				case "ASCIIDOC":
				case 2:
					message.format = 2;
					break;
			}
			if (object.raw != null) message.raw = String(object.raw);
			return message;
		};
		/**
		* Creates a plain object from a Revision message. Also converts values to other types if specified.
		* @function toObject
		* @memberof pb.Revision
		* @static
		* @param {pb.Revision} message Revision
		* @param {$protobuf.IConversionOptions} [options] Conversion options
		* @returns {Object.<string,*>} Plain object
		*/
		Revision.toObject = function toObject(message, options) {
			if (!options) options = {};
			let object = {};
			if (options.defaults) {
				object.format = options.enums === String ? "PLAIN" : 0;
				object.raw = "";
			}
			if (message.format != null && message.hasOwnProperty("format")) object.format = options.enums === String ? $root.pb.Format.Enum[message.format] === void 0 ? message.format : $root.pb.Format.Enum[message.format] : message.format;
			if (message.raw != null && message.hasOwnProperty("raw")) object.raw = message.raw;
			return object;
		};
		/**
		* Converts this Revision to JSON.
		* @function toJSON
		* @memberof pb.Revision
		* @instance
		* @returns {Object.<string,*>} JSON object
		*/
		Revision.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, import_minimal.util.toJSONOptions);
		};
		/**
		* Gets the default type url for Revision
		* @function getTypeUrl
		* @memberof pb.Revision
		* @static
		* @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		* @returns {string} The default type url
		*/
		Revision.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === void 0) typeUrlPrefix = "type.googleapis.com";
			return typeUrlPrefix + "/pb.Revision";
		};
		return Revision;
	})();
	pb.RevisionDB = (function() {
		/**
		* Properties of a RevisionDB.
		* @memberof pb
		* @interface IRevisionDB
		* @property {number|null} [id] RevisionDB id
		* @property {Uint8Array|null} [hash] RevisionDB hash
		*/
		/**
		* Constructs a new RevisionDB.
		* @memberof pb
		* @classdesc Represents a RevisionDB.
		* @implements IRevisionDB
		* @constructor
		* @param {pb.IRevisionDB=} [properties] Properties to set
		*/
		function RevisionDB(properties) {
			if (properties) {
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
			}
		}
		/**
		* RevisionDB id.
		* @member {number} id
		* @memberof pb.RevisionDB
		* @instance
		*/
		RevisionDB.prototype.id = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
		/**
		* RevisionDB hash.
		* @member {Uint8Array} hash
		* @memberof pb.RevisionDB
		* @instance
		*/
		RevisionDB.prototype.hash = $util.newBuffer([]);
		/**
		* Creates a new RevisionDB instance using the specified properties.
		* @function create
		* @memberof pb.RevisionDB
		* @static
		* @param {pb.IRevisionDB=} [properties] Properties to set
		* @returns {pb.RevisionDB} RevisionDB instance
		*/
		RevisionDB.create = function create(properties) {
			return new RevisionDB(properties);
		};
		/**
		* Encodes the specified RevisionDB message. Does not implicitly {@link pb.RevisionDB.verify|verify} messages.
		* @function encode
		* @memberof pb.RevisionDB
		* @static
		* @param {pb.IRevisionDB} message RevisionDB message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		RevisionDB.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.id != null && Object.hasOwnProperty.call(message, "id")) writer.uint32(8).uint64(message.id);
			if (message.hash != null && Object.hasOwnProperty.call(message, "hash")) writer.uint32(18).bytes(message.hash);
			return writer;
		};
		/**
		* Encodes the specified RevisionDB message, length delimited. Does not implicitly {@link pb.RevisionDB.verify|verify} messages.
		* @function encodeDelimited
		* @memberof pb.RevisionDB
		* @static
		* @param {pb.IRevisionDB} message RevisionDB message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		RevisionDB.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};
		/**
		* Decodes a RevisionDB message from the specified reader or buffer.
		* @function decode
		* @memberof pb.RevisionDB
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @param {number} [length] Message length if known beforehand
		* @returns {pb.RevisionDB} RevisionDB
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		RevisionDB.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.pb.RevisionDB();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error) break;
				switch (tag >>> 3) {
					case 1:
						message.id = reader.uint64();
						break;
					case 2:
						message.hash = reader.bytes();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};
		/**
		* Decodes a RevisionDB message from the specified reader or buffer, length delimited.
		* @function decodeDelimited
		* @memberof pb.RevisionDB
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @returns {pb.RevisionDB} RevisionDB
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		RevisionDB.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};
		/**
		* Verifies a RevisionDB message.
		* @function verify
		* @memberof pb.RevisionDB
		* @static
		* @param {Object.<string,*>} message Plain object to verify
		* @returns {string|null} `null` if valid, otherwise the reason why it is not
		*/
		RevisionDB.verify = function verify(message) {
			if (typeof message !== "object" || message === null) return "object expected";
			if (message.id != null && message.hasOwnProperty("id")) {
				if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high))) return "id: integer|Long expected";
			}
			if (message.hash != null && message.hasOwnProperty("hash")) {
				if (!(message.hash && typeof message.hash.length === "number" || $util.isString(message.hash))) return "hash: buffer expected";
			}
			return null;
		};
		/**
		* Creates a RevisionDB message from a plain object. Also converts values to their respective internal types.
		* @function fromObject
		* @memberof pb.RevisionDB
		* @static
		* @param {Object.<string,*>} object Plain object
		* @returns {pb.RevisionDB} RevisionDB
		*/
		RevisionDB.fromObject = function fromObject(object) {
			if (object instanceof $root.pb.RevisionDB) return object;
			let message = new $root.pb.RevisionDB();
			if (object.id != null) {
				if ($util.Long) (message.id = $util.Long.fromValue(object.id)).unsigned = true;
				else if (typeof object.id === "string") message.id = parseInt(object.id, 10);
				else if (typeof object.id === "number") message.id = object.id;
				else if (typeof object.id === "object") message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber(true);
			}
			if (object.hash != null) {
				if (typeof object.hash === "string") $util.base64.decode(object.hash, message.hash = $util.newBuffer($util.base64.length(object.hash)), 0);
				else if (object.hash.length >= 0) message.hash = object.hash;
			}
			return message;
		};
		/**
		* Creates a plain object from a RevisionDB message. Also converts values to other types if specified.
		* @function toObject
		* @memberof pb.RevisionDB
		* @static
		* @param {pb.RevisionDB} message RevisionDB
		* @param {$protobuf.IConversionOptions} [options] Conversion options
		* @returns {Object.<string,*>} Plain object
		*/
		RevisionDB.toObject = function toObject(message, options) {
			if (!options) options = {};
			let object = {};
			if (options.defaults) {
				if ($util.Long) {
					let long = new $util.Long(0, 0, true);
					object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
				} else object.id = options.longs === String ? "0" : 0;
				if (options.bytes === String) object.hash = "";
				else {
					object.hash = [];
					if (options.bytes !== Array) object.hash = $util.newBuffer(object.hash);
				}
			}
			if (message.id != null && message.hasOwnProperty("id")) if (typeof message.id === "number") object.id = options.longs === String ? String(message.id) : message.id;
			else object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber(true) : message.id;
			if (message.hash != null && message.hasOwnProperty("hash")) object.hash = options.bytes === String ? $util.base64.encode(message.hash, 0, message.hash.length) : options.bytes === Array ? Array.prototype.slice.call(message.hash) : message.hash;
			return object;
		};
		/**
		* Converts this RevisionDB to JSON.
		* @function toJSON
		* @memberof pb.RevisionDB
		* @instance
		* @returns {Object.<string,*>} JSON object
		*/
		RevisionDB.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, import_minimal.util.toJSONOptions);
		};
		/**
		* Gets the default type url for RevisionDB
		* @function getTypeUrl
		* @memberof pb.RevisionDB
		* @static
		* @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		* @returns {string} The default type url
		*/
		RevisionDB.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === void 0) typeUrlPrefix = "type.googleapis.com";
			return typeUrlPrefix + "/pb.RevisionDB";
		};
		return RevisionDB;
	})();
	pb.Format = (function() {
		/**
		* Properties of a Format.
		* @memberof pb
		* @interface IFormat
		*/
		/**
		* Constructs a new Format.
		* @memberof pb
		* @classdesc Represents a Format.
		* @implements IFormat
		* @constructor
		* @param {pb.IFormat=} [properties] Properties to set
		*/
		function Format(properties) {
			if (properties) {
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
			}
		}
		/**
		* Creates a new Format instance using the specified properties.
		* @function create
		* @memberof pb.Format
		* @static
		* @param {pb.IFormat=} [properties] Properties to set
		* @returns {pb.Format} Format instance
		*/
		Format.create = function create(properties) {
			return new Format(properties);
		};
		/**
		* Encodes the specified Format message. Does not implicitly {@link pb.Format.verify|verify} messages.
		* @function encode
		* @memberof pb.Format
		* @static
		* @param {pb.IFormat} message Format message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		Format.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			return writer;
		};
		/**
		* Encodes the specified Format message, length delimited. Does not implicitly {@link pb.Format.verify|verify} messages.
		* @function encodeDelimited
		* @memberof pb.Format
		* @static
		* @param {pb.IFormat} message Format message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		Format.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};
		/**
		* Decodes a Format message from the specified reader or buffer.
		* @function decode
		* @memberof pb.Format
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @param {number} [length] Message length if known beforehand
		* @returns {pb.Format} Format
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		Format.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.pb.Format();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error) break;
				switch (tag >>> 3) {
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};
		/**
		* Decodes a Format message from the specified reader or buffer, length delimited.
		* @function decodeDelimited
		* @memberof pb.Format
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @returns {pb.Format} Format
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		Format.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};
		/**
		* Verifies a Format message.
		* @function verify
		* @memberof pb.Format
		* @static
		* @param {Object.<string,*>} message Plain object to verify
		* @returns {string|null} `null` if valid, otherwise the reason why it is not
		*/
		Format.verify = function verify(message) {
			if (typeof message !== "object" || message === null) return "object expected";
			return null;
		};
		/**
		* Creates a Format message from a plain object. Also converts values to their respective internal types.
		* @function fromObject
		* @memberof pb.Format
		* @static
		* @param {Object.<string,*>} object Plain object
		* @returns {pb.Format} Format
		*/
		Format.fromObject = function fromObject(object) {
			if (object instanceof $root.pb.Format) return object;
			return new $root.pb.Format();
		};
		/**
		* Creates a plain object from a Format message. Also converts values to other types if specified.
		* @function toObject
		* @memberof pb.Format
		* @static
		* @param {pb.Format} message Format
		* @param {$protobuf.IConversionOptions} [options] Conversion options
		* @returns {Object.<string,*>} Plain object
		*/
		Format.toObject = function toObject() {
			return {};
		};
		/**
		* Converts this Format to JSON.
		* @function toJSON
		* @memberof pb.Format
		* @instance
		* @returns {Object.<string,*>} JSON object
		*/
		Format.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, import_minimal.util.toJSONOptions);
		};
		/**
		* Gets the default type url for Format
		* @function getTypeUrl
		* @memberof pb.Format
		* @static
		* @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		* @returns {string} The default type url
		*/
		Format.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === void 0) typeUrlPrefix = "type.googleapis.com";
			return typeUrlPrefix + "/pb.Format";
		};
		/**
		* Enum enum.
		* @name pb.Format.Enum
		* @enum {number}
		* @property {number} PLAIN=0 PLAIN value
		* @property {number} MARKDOWN=1 MARKDOWN value
		* @property {number} ASCIIDOC=2 ASCIIDOC value
		*/
		Format.Enum = (function() {
			const valuesById = {}, values = Object.create(valuesById);
			values[valuesById[0] = "PLAIN"] = 0;
			values[valuesById[1] = "MARKDOWN"] = 1;
			values[valuesById[2] = "ASCIIDOC"] = 2;
			return values;
		})();
		return Format;
	})();
	pb.OpenGraph = (function() {
		/**
		* Properties of an OpenGraph.
		* @memberof pb
		* @interface IOpenGraph
		* @property {number|null} [image] OpenGraph image
		* @property {string|null} [description] OpenGraph description
		* @property {Array.<number>|null} [tag] OpenGraph tag
		*/
		/**
		* Constructs a new OpenGraph.
		* @memberof pb
		* @classdesc Represents an OpenGraph.
		* @implements IOpenGraph
		* @constructor
		* @param {pb.IOpenGraph=} [properties] Properties to set
		*/
		function OpenGraph(properties) {
			this.tag = [];
			if (properties) {
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
			}
		}
		/**
		* OpenGraph image.
		* @member {number} image
		* @memberof pb.OpenGraph
		* @instance
		*/
		OpenGraph.prototype.image = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
		/**
		* OpenGraph description.
		* @member {string} description
		* @memberof pb.OpenGraph
		* @instance
		*/
		OpenGraph.prototype.description = "";
		/**
		* OpenGraph tag.
		* @member {Array.<number>} tag
		* @memberof pb.OpenGraph
		* @instance
		*/
		OpenGraph.prototype.tag = $util.emptyArray;
		/**
		* Creates a new OpenGraph instance using the specified properties.
		* @function create
		* @memberof pb.OpenGraph
		* @static
		* @param {pb.IOpenGraph=} [properties] Properties to set
		* @returns {pb.OpenGraph} OpenGraph instance
		*/
		OpenGraph.create = function create(properties) {
			return new OpenGraph(properties);
		};
		/**
		* Encodes the specified OpenGraph message. Does not implicitly {@link pb.OpenGraph.verify|verify} messages.
		* @function encode
		* @memberof pb.OpenGraph
		* @static
		* @param {pb.IOpenGraph} message OpenGraph message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		OpenGraph.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.image != null && Object.hasOwnProperty.call(message, "image")) writer.uint32(8).uint64(message.image);
			if (message.description != null && Object.hasOwnProperty.call(message, "description")) writer.uint32(18).string(message.description);
			if (message.tag != null && message.tag.length) {
				writer.uint32(26).fork();
				for (let i = 0; i < message.tag.length; ++i) writer.uint64(message.tag[i]);
				writer.ldelim();
			}
			return writer;
		};
		/**
		* Encodes the specified OpenGraph message, length delimited. Does not implicitly {@link pb.OpenGraph.verify|verify} messages.
		* @function encodeDelimited
		* @memberof pb.OpenGraph
		* @static
		* @param {pb.IOpenGraph} message OpenGraph message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		OpenGraph.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};
		/**
		* Decodes an OpenGraph message from the specified reader or buffer.
		* @function decode
		* @memberof pb.OpenGraph
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @param {number} [length] Message length if known beforehand
		* @returns {pb.OpenGraph} OpenGraph
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		OpenGraph.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.pb.OpenGraph();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error) break;
				switch (tag >>> 3) {
					case 1:
						message.image = reader.uint64();
						break;
					case 2:
						message.description = reader.string();
						break;
					case 3:
						if (!(message.tag && message.tag.length)) message.tag = [];
						if ((tag & 7) === 2) {
							let end2 = reader.uint32() + reader.pos;
							while (reader.pos < end2) message.tag.push(reader.uint64());
						} else message.tag.push(reader.uint64());
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};
		/**
		* Decodes an OpenGraph message from the specified reader or buffer, length delimited.
		* @function decodeDelimited
		* @memberof pb.OpenGraph
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @returns {pb.OpenGraph} OpenGraph
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		OpenGraph.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};
		/**
		* Verifies an OpenGraph message.
		* @function verify
		* @memberof pb.OpenGraph
		* @static
		* @param {Object.<string,*>} message Plain object to verify
		* @returns {string|null} `null` if valid, otherwise the reason why it is not
		*/
		OpenGraph.verify = function verify(message) {
			if (typeof message !== "object" || message === null) return "object expected";
			if (message.image != null && message.hasOwnProperty("image")) {
				if (!$util.isInteger(message.image) && !(message.image && $util.isInteger(message.image.low) && $util.isInteger(message.image.high))) return "image: integer|Long expected";
			}
			if (message.description != null && message.hasOwnProperty("description")) {
				if (!$util.isString(message.description)) return "description: string expected";
			}
			if (message.tag != null && message.hasOwnProperty("tag")) {
				if (!Array.isArray(message.tag)) return "tag: array expected";
				for (let i = 0; i < message.tag.length; ++i) if (!$util.isInteger(message.tag[i]) && !(message.tag[i] && $util.isInteger(message.tag[i].low) && $util.isInteger(message.tag[i].high))) return "tag: integer|Long[] expected";
			}
			return null;
		};
		/**
		* Creates an OpenGraph message from a plain object. Also converts values to their respective internal types.
		* @function fromObject
		* @memberof pb.OpenGraph
		* @static
		* @param {Object.<string,*>} object Plain object
		* @returns {pb.OpenGraph} OpenGraph
		*/
		OpenGraph.fromObject = function fromObject(object) {
			if (object instanceof $root.pb.OpenGraph) return object;
			let message = new $root.pb.OpenGraph();
			if (object.image != null) {
				if ($util.Long) (message.image = $util.Long.fromValue(object.image)).unsigned = true;
				else if (typeof object.image === "string") message.image = parseInt(object.image, 10);
				else if (typeof object.image === "number") message.image = object.image;
				else if (typeof object.image === "object") message.image = new $util.LongBits(object.image.low >>> 0, object.image.high >>> 0).toNumber(true);
			}
			if (object.description != null) message.description = String(object.description);
			if (object.tag) {
				if (!Array.isArray(object.tag)) throw TypeError(".pb.OpenGraph.tag: array expected");
				message.tag = [];
				for (let i = 0; i < object.tag.length; ++i) if ($util.Long) (message.tag[i] = $util.Long.fromValue(object.tag[i])).unsigned = true;
				else if (typeof object.tag[i] === "string") message.tag[i] = parseInt(object.tag[i], 10);
				else if (typeof object.tag[i] === "number") message.tag[i] = object.tag[i];
				else if (typeof object.tag[i] === "object") message.tag[i] = new $util.LongBits(object.tag[i].low >>> 0, object.tag[i].high >>> 0).toNumber(true);
			}
			return message;
		};
		/**
		* Creates a plain object from an OpenGraph message. Also converts values to other types if specified.
		* @function toObject
		* @memberof pb.OpenGraph
		* @static
		* @param {pb.OpenGraph} message OpenGraph
		* @param {$protobuf.IConversionOptions} [options] Conversion options
		* @returns {Object.<string,*>} Plain object
		*/
		OpenGraph.toObject = function toObject(message, options) {
			if (!options) options = {};
			let object = {};
			if (options.arrays || options.defaults) object.tag = [];
			if (options.defaults) {
				if ($util.Long) {
					let long = new $util.Long(0, 0, true);
					object.image = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
				} else object.image = options.longs === String ? "0" : 0;
				object.description = "";
			}
			if (message.image != null && message.hasOwnProperty("image")) if (typeof message.image === "number") object.image = options.longs === String ? String(message.image) : message.image;
			else object.image = options.longs === String ? $util.Long.prototype.toString.call(message.image) : options.longs === Number ? new $util.LongBits(message.image.low >>> 0, message.image.high >>> 0).toNumber(true) : message.image;
			if (message.description != null && message.hasOwnProperty("description")) object.description = message.description;
			if (message.tag && message.tag.length) {
				object.tag = [];
				for (let j = 0; j < message.tag.length; ++j) if (typeof message.tag[j] === "number") object.tag[j] = options.longs === String ? String(message.tag[j]) : message.tag[j];
				else object.tag[j] = options.longs === String ? $util.Long.prototype.toString.call(message.tag[j]) : options.longs === Number ? new $util.LongBits(message.tag[j].low >>> 0, message.tag[j].high >>> 0).toNumber(true) : message.tag[j];
			}
			return object;
		};
		/**
		* Converts this OpenGraph to JSON.
		* @function toJSON
		* @memberof pb.OpenGraph
		* @instance
		* @returns {Object.<string,*>} JSON object
		*/
		OpenGraph.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, import_minimal.util.toJSONOptions);
		};
		/**
		* Gets the default type url for OpenGraph
		* @function getTypeUrl
		* @memberof pb.OpenGraph
		* @static
		* @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		* @returns {string} The default type url
		*/
		OpenGraph.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === void 0) typeUrlPrefix = "type.googleapis.com";
			return typeUrlPrefix + "/pb.OpenGraph";
		};
		return OpenGraph;
	})();
	pb.OpenGraphBook = (function() {
		/**
		* Properties of an OpenGraphBook.
		* @memberof pb
		* @interface IOpenGraphBook
		* @property {string|null} [title] OpenGraphBook title
		* @property {string|null} [isbn] OpenGraphBook isbn
		* @property {Array.<string>|null} [author] OpenGraphBook author
		* @property {string|null} [releaseDate] OpenGraphBook releaseDate
		*/
		/**
		* Constructs a new OpenGraphBook.
		* @memberof pb
		* @classdesc Represents an OpenGraphBook.
		* @implements IOpenGraphBook
		* @constructor
		* @param {pb.IOpenGraphBook=} [properties] Properties to set
		*/
		function OpenGraphBook(properties) {
			this.author = [];
			if (properties) {
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
			}
		}
		/**
		* OpenGraphBook title.
		* @member {string} title
		* @memberof pb.OpenGraphBook
		* @instance
		*/
		OpenGraphBook.prototype.title = "";
		/**
		* OpenGraphBook isbn.
		* @member {string} isbn
		* @memberof pb.OpenGraphBook
		* @instance
		*/
		OpenGraphBook.prototype.isbn = "";
		/**
		* OpenGraphBook author.
		* @member {Array.<string>} author
		* @memberof pb.OpenGraphBook
		* @instance
		*/
		OpenGraphBook.prototype.author = $util.emptyArray;
		/**
		* OpenGraphBook releaseDate.
		* @member {string} releaseDate
		* @memberof pb.OpenGraphBook
		* @instance
		*/
		OpenGraphBook.prototype.releaseDate = "";
		/**
		* Creates a new OpenGraphBook instance using the specified properties.
		* @function create
		* @memberof pb.OpenGraphBook
		* @static
		* @param {pb.IOpenGraphBook=} [properties] Properties to set
		* @returns {pb.OpenGraphBook} OpenGraphBook instance
		*/
		OpenGraphBook.create = function create(properties) {
			return new OpenGraphBook(properties);
		};
		/**
		* Encodes the specified OpenGraphBook message. Does not implicitly {@link pb.OpenGraphBook.verify|verify} messages.
		* @function encode
		* @memberof pb.OpenGraphBook
		* @static
		* @param {pb.IOpenGraphBook} message OpenGraphBook message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		OpenGraphBook.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.title != null && Object.hasOwnProperty.call(message, "title")) writer.uint32(10).string(message.title);
			if (message.isbn != null && Object.hasOwnProperty.call(message, "isbn")) writer.uint32(18).string(message.isbn);
			if (message.author != null && message.author.length) for (let i = 0; i < message.author.length; ++i) writer.uint32(26).string(message.author[i]);
			if (message.releaseDate != null && Object.hasOwnProperty.call(message, "releaseDate")) writer.uint32(34).string(message.releaseDate);
			return writer;
		};
		/**
		* Encodes the specified OpenGraphBook message, length delimited. Does not implicitly {@link pb.OpenGraphBook.verify|verify} messages.
		* @function encodeDelimited
		* @memberof pb.OpenGraphBook
		* @static
		* @param {pb.IOpenGraphBook} message OpenGraphBook message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		OpenGraphBook.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};
		/**
		* Decodes an OpenGraphBook message from the specified reader or buffer.
		* @function decode
		* @memberof pb.OpenGraphBook
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @param {number} [length] Message length if known beforehand
		* @returns {pb.OpenGraphBook} OpenGraphBook
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		OpenGraphBook.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.pb.OpenGraphBook();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error) break;
				switch (tag >>> 3) {
					case 1:
						message.title = reader.string();
						break;
					case 2:
						message.isbn = reader.string();
						break;
					case 3:
						if (!(message.author && message.author.length)) message.author = [];
						message.author.push(reader.string());
						break;
					case 4:
						message.releaseDate = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};
		/**
		* Decodes an OpenGraphBook message from the specified reader or buffer, length delimited.
		* @function decodeDelimited
		* @memberof pb.OpenGraphBook
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @returns {pb.OpenGraphBook} OpenGraphBook
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		OpenGraphBook.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};
		/**
		* Verifies an OpenGraphBook message.
		* @function verify
		* @memberof pb.OpenGraphBook
		* @static
		* @param {Object.<string,*>} message Plain object to verify
		* @returns {string|null} `null` if valid, otherwise the reason why it is not
		*/
		OpenGraphBook.verify = function verify(message) {
			if (typeof message !== "object" || message === null) return "object expected";
			if (message.title != null && message.hasOwnProperty("title")) {
				if (!$util.isString(message.title)) return "title: string expected";
			}
			if (message.isbn != null && message.hasOwnProperty("isbn")) {
				if (!$util.isString(message.isbn)) return "isbn: string expected";
			}
			if (message.author != null && message.hasOwnProperty("author")) {
				if (!Array.isArray(message.author)) return "author: array expected";
				for (let i = 0; i < message.author.length; ++i) if (!$util.isString(message.author[i])) return "author: string[] expected";
			}
			if (message.releaseDate != null && message.hasOwnProperty("releaseDate")) {
				if (!$util.isString(message.releaseDate)) return "releaseDate: string expected";
			}
			return null;
		};
		/**
		* Creates an OpenGraphBook message from a plain object. Also converts values to their respective internal types.
		* @function fromObject
		* @memberof pb.OpenGraphBook
		* @static
		* @param {Object.<string,*>} object Plain object
		* @returns {pb.OpenGraphBook} OpenGraphBook
		*/
		OpenGraphBook.fromObject = function fromObject(object) {
			if (object instanceof $root.pb.OpenGraphBook) return object;
			let message = new $root.pb.OpenGraphBook();
			if (object.title != null) message.title = String(object.title);
			if (object.isbn != null) message.isbn = String(object.isbn);
			if (object.author) {
				if (!Array.isArray(object.author)) throw TypeError(".pb.OpenGraphBook.author: array expected");
				message.author = [];
				for (let i = 0; i < object.author.length; ++i) message.author[i] = String(object.author[i]);
			}
			if (object.releaseDate != null) message.releaseDate = String(object.releaseDate);
			return message;
		};
		/**
		* Creates a plain object from an OpenGraphBook message. Also converts values to other types if specified.
		* @function toObject
		* @memberof pb.OpenGraphBook
		* @static
		* @param {pb.OpenGraphBook} message OpenGraphBook
		* @param {$protobuf.IConversionOptions} [options] Conversion options
		* @returns {Object.<string,*>} Plain object
		*/
		OpenGraphBook.toObject = function toObject(message, options) {
			if (!options) options = {};
			let object = {};
			if (options.arrays || options.defaults) object.author = [];
			if (options.defaults) {
				object.title = "";
				object.isbn = "";
				object.releaseDate = "";
			}
			if (message.title != null && message.hasOwnProperty("title")) object.title = message.title;
			if (message.isbn != null && message.hasOwnProperty("isbn")) object.isbn = message.isbn;
			if (message.author && message.author.length) {
				object.author = [];
				for (let j = 0; j < message.author.length; ++j) object.author[j] = message.author[j];
			}
			if (message.releaseDate != null && message.hasOwnProperty("releaseDate")) object.releaseDate = message.releaseDate;
			return object;
		};
		/**
		* Converts this OpenGraphBook to JSON.
		* @function toJSON
		* @memberof pb.OpenGraphBook
		* @instance
		* @returns {Object.<string,*>} JSON object
		*/
		OpenGraphBook.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, import_minimal.util.toJSONOptions);
		};
		/**
		* Gets the default type url for OpenGraphBook
		* @function getTypeUrl
		* @memberof pb.OpenGraphBook
		* @static
		* @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		* @returns {string} The default type url
		*/
		OpenGraphBook.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === void 0) typeUrlPrefix = "type.googleapis.com";
			return typeUrlPrefix + "/pb.OpenGraphBook";
		};
		return OpenGraphBook;
	})();
	pb.ItemSearch = (function() {
		/**
		* Properties of an ItemSearch.
		* @memberof pb
		* @interface IItemSearch
		* @property {number|null} [id] ItemSearch id
		* @property {pb.ItemSearch.Cmd|null} [og] ItemSearch og
		* @property {pb.ItemSearch.Cmd|null} [title] ItemSearch title
		* @property {pb.ItemSearch.Cmd|null} [original] ItemSearch original
		* @property {pb.ItemSearch.Cmd|null} [trivial] ItemSearch trivial
		* @property {string|null} [keyword] ItemSearch keyword
		*/
		/**
		* Constructs a new ItemSearch.
		* @memberof pb
		* @classdesc Represents an ItemSearch.
		* @implements IItemSearch
		* @constructor
		* @param {pb.IItemSearch=} [properties] Properties to set
		*/
		function ItemSearch(properties) {
			if (properties) {
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
			}
		}
		/**
		* ItemSearch id.
		* @member {number} id
		* @memberof pb.ItemSearch
		* @instance
		*/
		ItemSearch.prototype.id = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
		/**
		* ItemSearch og.
		* @member {pb.ItemSearch.Cmd} og
		* @memberof pb.ItemSearch
		* @instance
		*/
		ItemSearch.prototype.og = 0;
		/**
		* ItemSearch title.
		* @member {pb.ItemSearch.Cmd} title
		* @memberof pb.ItemSearch
		* @instance
		*/
		ItemSearch.prototype.title = 0;
		/**
		* ItemSearch original.
		* @member {pb.ItemSearch.Cmd} original
		* @memberof pb.ItemSearch
		* @instance
		*/
		ItemSearch.prototype.original = 0;
		/**
		* ItemSearch trivial.
		* @member {pb.ItemSearch.Cmd} trivial
		* @memberof pb.ItemSearch
		* @instance
		*/
		ItemSearch.prototype.trivial = 0;
		/**
		* ItemSearch keyword.
		* @member {string} keyword
		* @memberof pb.ItemSearch
		* @instance
		*/
		ItemSearch.prototype.keyword = "";
		/**
		* Creates a new ItemSearch instance using the specified properties.
		* @function create
		* @memberof pb.ItemSearch
		* @static
		* @param {pb.IItemSearch=} [properties] Properties to set
		* @returns {pb.ItemSearch} ItemSearch instance
		*/
		ItemSearch.create = function create(properties) {
			return new ItemSearch(properties);
		};
		/**
		* Encodes the specified ItemSearch message. Does not implicitly {@link pb.ItemSearch.verify|verify} messages.
		* @function encode
		* @memberof pb.ItemSearch
		* @static
		* @param {pb.IItemSearch} message ItemSearch message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		ItemSearch.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.id != null && Object.hasOwnProperty.call(message, "id")) writer.uint32(8).uint64(message.id);
			if (message.og != null && Object.hasOwnProperty.call(message, "og")) writer.uint32(16).int32(message.og);
			if (message.title != null && Object.hasOwnProperty.call(message, "title")) writer.uint32(24).int32(message.title);
			if (message.original != null && Object.hasOwnProperty.call(message, "original")) writer.uint32(32).int32(message.original);
			if (message.trivial != null && Object.hasOwnProperty.call(message, "trivial")) writer.uint32(40).int32(message.trivial);
			if (message.keyword != null && Object.hasOwnProperty.call(message, "keyword")) writer.uint32(50).string(message.keyword);
			return writer;
		};
		/**
		* Encodes the specified ItemSearch message, length delimited. Does not implicitly {@link pb.ItemSearch.verify|verify} messages.
		* @function encodeDelimited
		* @memberof pb.ItemSearch
		* @static
		* @param {pb.IItemSearch} message ItemSearch message or plain object to encode
		* @param {$protobuf.Writer} [writer] Writer to encode to
		* @returns {$protobuf.Writer} Writer
		*/
		ItemSearch.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};
		/**
		* Decodes an ItemSearch message from the specified reader or buffer.
		* @function decode
		* @memberof pb.ItemSearch
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @param {number} [length] Message length if known beforehand
		* @returns {pb.ItemSearch} ItemSearch
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		ItemSearch.decode = function decode(reader, length, error) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.pb.ItemSearch();
			while (reader.pos < end) {
				let tag = reader.uint32();
				if (tag === error) break;
				switch (tag >>> 3) {
					case 1:
						message.id = reader.uint64();
						break;
					case 2:
						message.og = reader.int32();
						break;
					case 3:
						message.title = reader.int32();
						break;
					case 4:
						message.original = reader.int32();
						break;
					case 5:
						message.trivial = reader.int32();
						break;
					case 6:
						message.keyword = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};
		/**
		* Decodes an ItemSearch message from the specified reader or buffer, length delimited.
		* @function decodeDelimited
		* @memberof pb.ItemSearch
		* @static
		* @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		* @returns {pb.ItemSearch} ItemSearch
		* @throws {Error} If the payload is not a reader or valid buffer
		* @throws {$protobuf.util.ProtocolError} If required fields are missing
		*/
		ItemSearch.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};
		/**
		* Verifies an ItemSearch message.
		* @function verify
		* @memberof pb.ItemSearch
		* @static
		* @param {Object.<string,*>} message Plain object to verify
		* @returns {string|null} `null` if valid, otherwise the reason why it is not
		*/
		ItemSearch.verify = function verify(message) {
			if (typeof message !== "object" || message === null) return "object expected";
			if (message.id != null && message.hasOwnProperty("id")) {
				if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high))) return "id: integer|Long expected";
			}
			if (message.og != null && message.hasOwnProperty("og")) switch (message.og) {
				default: return "og: enum value expected";
				case 0:
				case 1:
				case 2: break;
			}
			if (message.title != null && message.hasOwnProperty("title")) switch (message.title) {
				default: return "title: enum value expected";
				case 0:
				case 1:
				case 2: break;
			}
			if (message.original != null && message.hasOwnProperty("original")) switch (message.original) {
				default: return "original: enum value expected";
				case 0:
				case 1:
				case 2: break;
			}
			if (message.trivial != null && message.hasOwnProperty("trivial")) switch (message.trivial) {
				default: return "trivial: enum value expected";
				case 0:
				case 1:
				case 2: break;
			}
			if (message.keyword != null && message.hasOwnProperty("keyword")) {
				if (!$util.isString(message.keyword)) return "keyword: string expected";
			}
			return null;
		};
		/**
		* Creates an ItemSearch message from a plain object. Also converts values to their respective internal types.
		* @function fromObject
		* @memberof pb.ItemSearch
		* @static
		* @param {Object.<string,*>} object Plain object
		* @returns {pb.ItemSearch} ItemSearch
		*/
		ItemSearch.fromObject = function fromObject(object) {
			if (object instanceof $root.pb.ItemSearch) return object;
			let message = new $root.pb.ItemSearch();
			if (object.id != null) {
				if ($util.Long) (message.id = $util.Long.fromValue(object.id)).unsigned = true;
				else if (typeof object.id === "string") message.id = parseInt(object.id, 10);
				else if (typeof object.id === "number") message.id = object.id;
				else if (typeof object.id === "object") message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber(true);
			}
			switch (object.og) {
				default:
					if (typeof object.og === "number") {
						message.og = object.og;
						break;
					}
					break;
				case "NONE":
				case 0:
					message.og = 0;
					break;
				case "HAVE":
				case 1:
					message.og = 1;
					break;
				case "NOT_HAVE":
				case 2:
					message.og = 2;
					break;
			}
			switch (object.title) {
				default:
					if (typeof object.title === "number") {
						message.title = object.title;
						break;
					}
					break;
				case "NONE":
				case 0:
					message.title = 0;
					break;
				case "HAVE":
				case 1:
					message.title = 1;
					break;
				case "NOT_HAVE":
				case 2:
					message.title = 2;
					break;
			}
			switch (object.original) {
				default:
					if (typeof object.original === "number") {
						message.original = object.original;
						break;
					}
					break;
				case "NONE":
				case 0:
					message.original = 0;
					break;
				case "HAVE":
				case 1:
					message.original = 1;
					break;
				case "NOT_HAVE":
				case 2:
					message.original = 2;
					break;
			}
			switch (object.trivial) {
				default:
					if (typeof object.trivial === "number") {
						message.trivial = object.trivial;
						break;
					}
					break;
				case "NONE":
				case 0:
					message.trivial = 0;
					break;
				case "HAVE":
				case 1:
					message.trivial = 1;
					break;
				case "NOT_HAVE":
				case 2:
					message.trivial = 2;
					break;
			}
			if (object.keyword != null) message.keyword = String(object.keyword);
			return message;
		};
		/**
		* Creates a plain object from an ItemSearch message. Also converts values to other types if specified.
		* @function toObject
		* @memberof pb.ItemSearch
		* @static
		* @param {pb.ItemSearch} message ItemSearch
		* @param {$protobuf.IConversionOptions} [options] Conversion options
		* @returns {Object.<string,*>} Plain object
		*/
		ItemSearch.toObject = function toObject(message, options) {
			if (!options) options = {};
			let object = {};
			if (options.defaults) {
				if ($util.Long) {
					let long = new $util.Long(0, 0, true);
					object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
				} else object.id = options.longs === String ? "0" : 0;
				object.og = options.enums === String ? "NONE" : 0;
				object.title = options.enums === String ? "NONE" : 0;
				object.original = options.enums === String ? "NONE" : 0;
				object.trivial = options.enums === String ? "NONE" : 0;
				object.keyword = "";
			}
			if (message.id != null && message.hasOwnProperty("id")) if (typeof message.id === "number") object.id = options.longs === String ? String(message.id) : message.id;
			else object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber(true) : message.id;
			if (message.og != null && message.hasOwnProperty("og")) object.og = options.enums === String ? $root.pb.ItemSearch.Cmd[message.og] === void 0 ? message.og : $root.pb.ItemSearch.Cmd[message.og] : message.og;
			if (message.title != null && message.hasOwnProperty("title")) object.title = options.enums === String ? $root.pb.ItemSearch.Cmd[message.title] === void 0 ? message.title : $root.pb.ItemSearch.Cmd[message.title] : message.title;
			if (message.original != null && message.hasOwnProperty("original")) object.original = options.enums === String ? $root.pb.ItemSearch.Cmd[message.original] === void 0 ? message.original : $root.pb.ItemSearch.Cmd[message.original] : message.original;
			if (message.trivial != null && message.hasOwnProperty("trivial")) object.trivial = options.enums === String ? $root.pb.ItemSearch.Cmd[message.trivial] === void 0 ? message.trivial : $root.pb.ItemSearch.Cmd[message.trivial] : message.trivial;
			if (message.keyword != null && message.hasOwnProperty("keyword")) object.keyword = message.keyword;
			return object;
		};
		/**
		* Converts this ItemSearch to JSON.
		* @function toJSON
		* @memberof pb.ItemSearch
		* @instance
		* @returns {Object.<string,*>} JSON object
		*/
		ItemSearch.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, import_minimal.util.toJSONOptions);
		};
		/**
		* Gets the default type url for ItemSearch
		* @function getTypeUrl
		* @memberof pb.ItemSearch
		* @static
		* @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		* @returns {string} The default type url
		*/
		ItemSearch.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === void 0) typeUrlPrefix = "type.googleapis.com";
			return typeUrlPrefix + "/pb.ItemSearch";
		};
		/**
		* Cmd enum.
		* @name pb.ItemSearch.Cmd
		* @enum {number}
		* @property {number} NONE=0 NONE value
		* @property {number} HAVE=1 HAVE value
		* @property {number} NOT_HAVE=2 NOT_HAVE value
		*/
		ItemSearch.Cmd = (function() {
			const valuesById = {}, values = Object.create(valuesById);
			values[valuesById[0] = "NONE"] = 0;
			values[valuesById[1] = "HAVE"] = 1;
			values[valuesById[2] = "NOT_HAVE"] = 2;
			return values;
		})();
		return ItemSearch;
	})();
	return pb;
})();
//#endregion
//#region src/inc/api.ts
var path = "/api";
var gateway = async (req) => {
	const buf = pb.APIReq.encode(req).finish();
	const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
	const res = await fetch(`${path}?${req?.one}`, {
		method: "POST",
		headers: { "Content-Type": "application/protobuf" },
		body: ab
	});
	if (!res.ok) throw new Error(`http response error: ${res.status}`);
	const re = new Uint8Array(await res.arrayBuffer());
	return pb.APIRsp.decode(re);
};
var apiCall = async (key, req) => {
	return (await gateway(pb.APIReq.fromObject({ [key]: req })))?.[key] ?? null;
};
var API = class {
	async itemGet(id) {
		return await apiCall("itemGet", id);
	}
	async itemSet(e) {
		return await apiCall("itemSet", e);
	}
	async itemListRecent() {
		return await apiCall("itemListRecent", 100);
	}
	async itemSearch(s) {
		return await apiCall("itemSearch", s);
	}
};
var api = new API();
//#endregion
//#region node_modules/long/index.js
/**
* @license
* Copyright 2009 The Closure Library Authors
* Copyright 2020 Daniel Wirtz / The long.js Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* SPDX-License-Identifier: Apache-2.0
*/
var wasm = null;
try {
	wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
		0,
		97,
		115,
		109,
		1,
		0,
		0,
		0,
		1,
		13,
		2,
		96,
		0,
		1,
		127,
		96,
		4,
		127,
		127,
		127,
		127,
		1,
		127,
		3,
		7,
		6,
		0,
		1,
		1,
		1,
		1,
		1,
		6,
		6,
		1,
		127,
		1,
		65,
		0,
		11,
		7,
		50,
		6,
		3,
		109,
		117,
		108,
		0,
		1,
		5,
		100,
		105,
		118,
		95,
		115,
		0,
		2,
		5,
		100,
		105,
		118,
		95,
		117,
		0,
		3,
		5,
		114,
		101,
		109,
		95,
		115,
		0,
		4,
		5,
		114,
		101,
		109,
		95,
		117,
		0,
		5,
		8,
		103,
		101,
		116,
		95,
		104,
		105,
		103,
		104,
		0,
		0,
		10,
		191,
		1,
		6,
		4,
		0,
		35,
		0,
		11,
		36,
		1,
		1,
		126,
		32,
		0,
		173,
		32,
		1,
		173,
		66,
		32,
		134,
		132,
		32,
		2,
		173,
		32,
		3,
		173,
		66,
		32,
		134,
		132,
		126,
		34,
		4,
		66,
		32,
		135,
		167,
		36,
		0,
		32,
		4,
		167,
		11,
		36,
		1,
		1,
		126,
		32,
		0,
		173,
		32,
		1,
		173,
		66,
		32,
		134,
		132,
		32,
		2,
		173,
		32,
		3,
		173,
		66,
		32,
		134,
		132,
		127,
		34,
		4,
		66,
		32,
		135,
		167,
		36,
		0,
		32,
		4,
		167,
		11,
		36,
		1,
		1,
		126,
		32,
		0,
		173,
		32,
		1,
		173,
		66,
		32,
		134,
		132,
		32,
		2,
		173,
		32,
		3,
		173,
		66,
		32,
		134,
		132,
		128,
		34,
		4,
		66,
		32,
		135,
		167,
		36,
		0,
		32,
		4,
		167,
		11,
		36,
		1,
		1,
		126,
		32,
		0,
		173,
		32,
		1,
		173,
		66,
		32,
		134,
		132,
		32,
		2,
		173,
		32,
		3,
		173,
		66,
		32,
		134,
		132,
		129,
		34,
		4,
		66,
		32,
		135,
		167,
		36,
		0,
		32,
		4,
		167,
		11,
		36,
		1,
		1,
		126,
		32,
		0,
		173,
		32,
		1,
		173,
		66,
		32,
		134,
		132,
		32,
		2,
		173,
		32,
		3,
		173,
		66,
		32,
		134,
		132,
		130,
		34,
		4,
		66,
		32,
		135,
		167,
		36,
		0,
		32,
		4,
		167,
		11
	])), {}).exports;
} catch {}
/**
* Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
*  See the from* functions below for more convenient ways of constructing Longs.
* @exports Long
* @class A Long class for representing a 64 bit two's-complement integer value.
* @param {number} low The low (signed) 32 bits of the long
* @param {number} high The high (signed) 32 bits of the long
* @param {boolean=} unsigned Whether unsigned or not, defaults to signed
* @constructor
*/
function Long(low, high, unsigned) {
	/**
	* The low 32 bits as a signed value.
	* @type {number}
	*/
	this.low = low | 0;
	/**
	* The high 32 bits as a signed value.
	* @type {number}
	*/
	this.high = high | 0;
	/**
	* Whether unsigned or not.
	* @type {boolean}
	*/
	this.unsigned = !!unsigned;
}
/**
* An indicator used to reliably determine if an object is a Long or not.
* @type {boolean}
* @const
* @private
*/
Long.prototype.__isLong__;
Object.defineProperty(Long.prototype, "__isLong__", { value: true });
/**
* @function
* @param {*} obj Object
* @returns {boolean}
* @inner
*/
function isLong(obj) {
	return (obj && obj["__isLong__"]) === true;
}
/**
* @function
* @param {*} value number
* @returns {number}
* @inner
*/
function ctz32(value) {
	var c = Math.clz32(value & -value);
	return value ? 31 - c : c;
}
/**
* Tests if the specified object is a Long.
* @function
* @param {*} obj Object
* @returns {boolean}
*/
Long.isLong = isLong;
/**
* A cache of the Long representations of small integer values.
* @type {!Object}
* @inner
*/
var INT_CACHE = {};
/**
* A cache of the Long representations of small unsigned integer values.
* @type {!Object}
* @inner
*/
var UINT_CACHE = {};
/**
* @param {number} value
* @param {boolean=} unsigned
* @returns {!Long}
* @inner
*/
function fromInt(value, unsigned) {
	var obj, cachedObj, cache;
	if (unsigned) {
		value >>>= 0;
		if (cache = 0 <= value && value < 256) {
			cachedObj = UINT_CACHE[value];
			if (cachedObj) return cachedObj;
		}
		obj = fromBits(value, 0, true);
		if (cache) UINT_CACHE[value] = obj;
		return obj;
	} else {
		value |= 0;
		if (cache = -128 <= value && value < 128) {
			cachedObj = INT_CACHE[value];
			if (cachedObj) return cachedObj;
		}
		obj = fromBits(value, value < 0 ? -1 : 0, false);
		if (cache) INT_CACHE[value] = obj;
		return obj;
	}
}
/**
* Returns a Long representing the given 32 bit integer value.
* @function
* @param {number} value The 32 bit integer in question
* @param {boolean=} unsigned Whether unsigned or not, defaults to signed
* @returns {!Long} The corresponding Long value
*/
Long.fromInt = fromInt;
/**
* @param {number} value
* @param {boolean=} unsigned
* @returns {!Long}
* @inner
*/
function fromNumber(value, unsigned) {
	if (isNaN(value)) return unsigned ? UZERO : ZERO;
	if (unsigned) {
		if (value < 0) return UZERO;
		if (value >= TWO_PWR_64_DBL) return MAX_UNSIGNED_VALUE;
	} else {
		if (value <= -TWO_PWR_63_DBL) return MIN_VALUE;
		if (value + 1 >= TWO_PWR_63_DBL) return MAX_VALUE;
	}
	if (value < 0) return fromNumber(-value, unsigned).neg();
	return fromBits(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0, unsigned);
}
/**
* Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
* @function
* @param {number} value The number in question
* @param {boolean=} unsigned Whether unsigned or not, defaults to signed
* @returns {!Long} The corresponding Long value
*/
Long.fromNumber = fromNumber;
/**
* @param {number} lowBits
* @param {number} highBits
* @param {boolean=} unsigned
* @returns {!Long}
* @inner
*/
function fromBits(lowBits, highBits, unsigned) {
	return new Long(lowBits, highBits, unsigned);
}
/**
* Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
*  assumed to use 32 bits.
* @function
* @param {number} lowBits The low 32 bits
* @param {number} highBits The high 32 bits
* @param {boolean=} unsigned Whether unsigned or not, defaults to signed
* @returns {!Long} The corresponding Long value
*/
Long.fromBits = fromBits;
/**
* @function
* @param {number} base
* @param {number} exponent
* @returns {number}
* @inner
*/
var pow_dbl = Math.pow;
/**
* @param {string} str
* @param {(boolean|number)=} unsigned
* @param {number=} radix
* @returns {!Long}
* @inner
*/
function fromString(str, unsigned, radix) {
	if (str.length === 0) throw Error("empty string");
	if (typeof unsigned === "number") {
		radix = unsigned;
		unsigned = false;
	} else unsigned = !!unsigned;
	if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity") return unsigned ? UZERO : ZERO;
	radix = radix || 10;
	if (radix < 2 || 36 < radix) throw RangeError("radix");
	var p;
	if ((p = str.indexOf("-")) > 0) throw Error("interior hyphen");
	else if (p === 0) return fromString(str.substring(1), unsigned, radix).neg();
	var radixToPower = fromNumber(pow_dbl(radix, 8));
	var result = ZERO;
	for (var i = 0; i < str.length; i += 8) {
		var size = Math.min(8, str.length - i), value = parseInt(str.substring(i, i + size), radix);
		if (size < 8) {
			var power = fromNumber(pow_dbl(radix, size));
			result = result.mul(power).add(fromNumber(value));
		} else {
			result = result.mul(radixToPower);
			result = result.add(fromNumber(value));
		}
	}
	result.unsigned = unsigned;
	return result;
}
/**
* Returns a Long representation of the given string, written using the specified radix.
* @function
* @param {string} str The textual representation of the Long
* @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to signed
* @param {number=} radix The radix in which the text is written (2-36), defaults to 10
* @returns {!Long} The corresponding Long value
*/
Long.fromString = fromString;
/**
* @function
* @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val
* @param {boolean=} unsigned
* @returns {!Long}
* @inner
*/
function fromValue(val, unsigned) {
	if (typeof val === "number") return fromNumber(val, unsigned);
	if (typeof val === "string") return fromString(val, unsigned);
	return fromBits(val.low, val.high, typeof unsigned === "boolean" ? unsigned : val.unsigned);
}
/**
* Converts the specified value to a Long using the appropriate from* function for its type.
* @function
* @param {!Long|number|bigint|string|!{low: number, high: number, unsigned: boolean}} val Value
* @param {boolean=} unsigned Whether unsigned or not, defaults to signed
* @returns {!Long}
*/
Long.fromValue = fromValue;
/**
* @type {number}
* @const
* @inner
*/
var TWO_PWR_16_DBL = 65536;
/**
* @type {number}
* @const
* @inner
*/
var TWO_PWR_24_DBL = 1 << 24;
/**
* @type {number}
* @const
* @inner
*/
var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
/**
* @type {number}
* @const
* @inner
*/
var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
/**
* @type {number}
* @const
* @inner
*/
var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
/**
* @type {!Long}
* @const
* @inner
*/
var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
/**
* @type {!Long}
* @inner
*/
var ZERO = fromInt(0);
/**
* Signed zero.
* @type {!Long}
*/
Long.ZERO = ZERO;
/**
* @type {!Long}
* @inner
*/
var UZERO = fromInt(0, true);
/**
* Unsigned zero.
* @type {!Long}
*/
Long.UZERO = UZERO;
/**
* @type {!Long}
* @inner
*/
var ONE = fromInt(1);
/**
* Signed one.
* @type {!Long}
*/
Long.ONE = ONE;
/**
* @type {!Long}
* @inner
*/
var UONE = fromInt(1, true);
/**
* Unsigned one.
* @type {!Long}
*/
Long.UONE = UONE;
/**
* @type {!Long}
* @inner
*/
var NEG_ONE = fromInt(-1);
/**
* Signed negative one.
* @type {!Long}
*/
Long.NEG_ONE = NEG_ONE;
/**
* @type {!Long}
* @inner
*/
var MAX_VALUE = fromBits(-1, 2147483647, false);
/**
* Maximum signed value.
* @type {!Long}
*/
Long.MAX_VALUE = MAX_VALUE;
/**
* @type {!Long}
* @inner
*/
var MAX_UNSIGNED_VALUE = fromBits(-1, -1, true);
/**
* Maximum unsigned value.
* @type {!Long}
*/
Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
/**
* @type {!Long}
* @inner
*/
var MIN_VALUE = fromBits(0, -2147483648, false);
/**
* Minimum signed value.
* @type {!Long}
*/
Long.MIN_VALUE = MIN_VALUE;
/**
* @alias Long.prototype
* @inner
*/
var LongPrototype = Long.prototype;
/**
* Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
* @this {!Long}
* @returns {number}
*/
LongPrototype.toInt = function toInt() {
	return this.unsigned ? this.low >>> 0 : this.low;
};
/**
* Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
* @this {!Long}
* @returns {number}
*/
LongPrototype.toNumber = function toNumber() {
	if (this.unsigned) return (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0);
	return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
};
/**
* Converts the Long to a string written in the specified radix.
* @this {!Long}
* @param {number=} radix Radix (2-36), defaults to 10
* @returns {string}
* @override
* @throws {RangeError} If `radix` is out of range
*/
LongPrototype.toString = function toString(radix) {
	radix = radix || 10;
	if (radix < 2 || 36 < radix) throw RangeError("radix");
	if (this.isZero()) return "0";
	if (this.isNegative()) if (this.eq(MIN_VALUE)) {
		var radixLong = fromNumber(radix), div = this.div(radixLong), rem1 = div.mul(radixLong).sub(this);
		return div.toString(radix) + rem1.toInt().toString(radix);
	} else return "-" + this.neg().toString(radix);
	var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned), rem = this;
	var result = "";
	while (true) {
		var remDiv = rem.div(radixToPower), digits = (rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0).toString(radix);
		rem = remDiv;
		if (rem.isZero()) return digits + result;
		else {
			while (digits.length < 6) digits = "0" + digits;
			result = "" + digits + result;
		}
	}
};
/**
* Gets the high 32 bits as a signed integer.
* @this {!Long}
* @returns {number} Signed high bits
*/
LongPrototype.getHighBits = function getHighBits() {
	return this.high;
};
/**
* Gets the high 32 bits as an unsigned integer.
* @this {!Long}
* @returns {number} Unsigned high bits
*/
LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
	return this.high >>> 0;
};
/**
* Gets the low 32 bits as a signed integer.
* @this {!Long}
* @returns {number} Signed low bits
*/
LongPrototype.getLowBits = function getLowBits() {
	return this.low;
};
/**
* Gets the low 32 bits as an unsigned integer.
* @this {!Long}
* @returns {number} Unsigned low bits
*/
LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
	return this.low >>> 0;
};
/**
* Gets the number of bits needed to represent the absolute value of this Long.
* @this {!Long}
* @returns {number}
*/
LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
	if (this.isNegative()) return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
	var val = this.high != 0 ? this.high : this.low;
	for (var bit = 31; bit > 0; bit--) if ((val & 1 << bit) != 0) break;
	return this.high != 0 ? bit + 33 : bit + 1;
};
/**
* Tests if this Long can be safely represented as a JavaScript number.
* @this {!Long}
* @returns {boolean}
*/
LongPrototype.isSafeInteger = function isSafeInteger() {
	var top11Bits = this.high >> 21;
	if (!top11Bits) return true;
	if (this.unsigned) return false;
	return top11Bits === -1 && !(this.low === 0 && this.high === -2097152);
};
/**
* Tests if this Long's value equals zero.
* @this {!Long}
* @returns {boolean}
*/
LongPrototype.isZero = function isZero() {
	return this.high === 0 && this.low === 0;
};
/**
* Tests if this Long's value equals zero. This is an alias of {@link Long#isZero}.
* @returns {boolean}
*/
LongPrototype.eqz = LongPrototype.isZero;
/**
* Tests if this Long's value is negative.
* @this {!Long}
* @returns {boolean}
*/
LongPrototype.isNegative = function isNegative() {
	return !this.unsigned && this.high < 0;
};
/**
* Tests if this Long's value is positive or zero.
* @this {!Long}
* @returns {boolean}
*/
LongPrototype.isPositive = function isPositive() {
	return this.unsigned || this.high >= 0;
};
/**
* Tests if this Long's value is odd.
* @this {!Long}
* @returns {boolean}
*/
LongPrototype.isOdd = function isOdd() {
	return (this.low & 1) === 1;
};
/**
* Tests if this Long's value is even.
* @this {!Long}
* @returns {boolean}
*/
LongPrototype.isEven = function isEven() {
	return (this.low & 1) === 0;
};
/**
* Tests if this Long's value equals the specified's.
* @this {!Long}
* @param {!Long|number|bigint|string} other Other value
* @returns {boolean}
*/
LongPrototype.equals = function equals(other) {
	if (!isLong(other)) other = fromValue(other);
	if (this.unsigned !== other.unsigned && this.high >>> 31 === 1 && other.high >>> 31 === 1) return false;
	return this.high === other.high && this.low === other.low;
};
/**
* Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
* @function
* @param {!Long|number|bigint|string} other Other value
* @returns {boolean}
*/
LongPrototype.eq = LongPrototype.equals;
/**
* Tests if this Long's value differs from the specified's.
* @this {!Long}
* @param {!Long|number|bigint|string} other Other value
* @returns {boolean}
*/
LongPrototype.notEquals = function notEquals(other) {
	return !this.eq(other);
};
/**
* Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
* @function
* @param {!Long|number|bigint|string} other Other value
* @returns {boolean}
*/
LongPrototype.neq = LongPrototype.notEquals;
/**
* Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
* @function
* @param {!Long|number|bigint|string} other Other value
* @returns {boolean}
*/
LongPrototype.ne = LongPrototype.notEquals;
/**
* Tests if this Long's value is less than the specified's.
* @this {!Long}
* @param {!Long|number|bigint|string} other Other value
* @returns {boolean}
*/
LongPrototype.lessThan = function lessThan(other) {
	return this.comp(other) < 0;
};
/**
* Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
* @function
* @param {!Long|number|bigint|string} other Other value
* @returns {boolean}
*/
LongPrototype.lt = LongPrototype.lessThan;
/**
* Tests if this Long's value is less than or equal the specified's.
* @this {!Long}
* @param {!Long|number|bigint|string} other Other value
* @returns {boolean}
*/
LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
	return this.comp(other) <= 0;
};
/**
* Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
* @function
* @param {!Long|number|bigint|string} other Other value
* @returns {boolean}
*/
LongPrototype.lte = LongPrototype.lessThanOrEqual;
/**
* Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
* @function
* @param {!Long|number|bigint|string} other Other value
* @returns {boolean}
*/
LongPrototype.le = LongPrototype.lessThanOrEqual;
/**
* Tests if this Long's value is greater than the specified's.
* @this {!Long}
* @param {!Long|number|bigint|string} other Other value
* @returns {boolean}
*/
LongPrototype.greaterThan = function greaterThan(other) {
	return this.comp(other) > 0;
};
/**
* Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
* @function
* @param {!Long|number|bigint|string} other Other value
* @returns {boolean}
*/
LongPrototype.gt = LongPrototype.greaterThan;
/**
* Tests if this Long's value is greater than or equal the specified's.
* @this {!Long}
* @param {!Long|number|bigint|string} other Other value
* @returns {boolean}
*/
LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
	return this.comp(other) >= 0;
};
/**
* Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
* @function
* @param {!Long|number|bigint|string} other Other value
* @returns {boolean}
*/
LongPrototype.gte = LongPrototype.greaterThanOrEqual;
/**
* Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
* @function
* @param {!Long|number|bigint|string} other Other value
* @returns {boolean}
*/
LongPrototype.ge = LongPrototype.greaterThanOrEqual;
/**
* Compares this Long's value with the specified's.
* @this {!Long}
* @param {!Long|number|bigint|string} other Other value
* @returns {number} 0 if they are the same, 1 if the this is greater and -1
*  if the given one is greater
*/
LongPrototype.compare = function compare(other) {
	if (!isLong(other)) other = fromValue(other);
	if (this.eq(other)) return 0;
	var thisNeg = this.isNegative(), otherNeg = other.isNegative();
	if (thisNeg && !otherNeg) return -1;
	if (!thisNeg && otherNeg) return 1;
	if (!this.unsigned) return this.sub(other).isNegative() ? -1 : 1;
	return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
};
/**
* Compares this Long's value with the specified's. This is an alias of {@link Long#compare}.
* @function
* @param {!Long|number|bigint|string} other Other value
* @returns {number} 0 if they are the same, 1 if the this is greater and -1
*  if the given one is greater
*/
LongPrototype.comp = LongPrototype.compare;
/**
* Negates this Long's value.
* @this {!Long}
* @returns {!Long} Negated Long
*/
LongPrototype.negate = function negate() {
	if (!this.unsigned && this.eq(MIN_VALUE)) return MIN_VALUE;
	return this.not().add(ONE);
};
/**
* Negates this Long's value. This is an alias of {@link Long#negate}.
* @function
* @returns {!Long} Negated Long
*/
LongPrototype.neg = LongPrototype.negate;
/**
* Returns the sum of this and the specified Long.
* @this {!Long}
* @param {!Long|number|bigint|string} addend Addend
* @returns {!Long} Sum
*/
LongPrototype.add = function add(addend) {
	if (!isLong(addend)) addend = fromValue(addend);
	var a48 = this.high >>> 16;
	var a32 = this.high & 65535;
	var a16 = this.low >>> 16;
	var a00 = this.low & 65535;
	var b48 = addend.high >>> 16;
	var b32 = addend.high & 65535;
	var b16 = addend.low >>> 16;
	var b00 = addend.low & 65535;
	var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
	c00 += a00 + b00;
	c16 += c00 >>> 16;
	c00 &= 65535;
	c16 += a16 + b16;
	c32 += c16 >>> 16;
	c16 &= 65535;
	c32 += a32 + b32;
	c48 += c32 >>> 16;
	c32 &= 65535;
	c48 += a48 + b48;
	c48 &= 65535;
	return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
};
/**
* Returns the difference of this and the specified Long.
* @this {!Long}
* @param {!Long|number|bigint|string} subtrahend Subtrahend
* @returns {!Long} Difference
*/
LongPrototype.subtract = function subtract(subtrahend) {
	if (!isLong(subtrahend)) subtrahend = fromValue(subtrahend);
	return this.add(subtrahend.neg());
};
/**
* Returns the difference of this and the specified Long. This is an alias of {@link Long#subtract}.
* @function
* @param {!Long|number|bigint|string} subtrahend Subtrahend
* @returns {!Long} Difference
*/
LongPrototype.sub = LongPrototype.subtract;
/**
* Returns the product of this and the specified Long.
* @this {!Long}
* @param {!Long|number|bigint|string} multiplier Multiplier
* @returns {!Long} Product
*/
LongPrototype.multiply = function multiply(multiplier) {
	if (this.isZero()) return this;
	if (!isLong(multiplier)) multiplier = fromValue(multiplier);
	if (wasm) return fromBits(wasm["mul"](this.low, this.high, multiplier.low, multiplier.high), wasm["get_high"](), this.unsigned);
	if (multiplier.isZero()) return this.unsigned ? UZERO : ZERO;
	if (this.eq(MIN_VALUE)) return multiplier.isOdd() ? MIN_VALUE : ZERO;
	if (multiplier.eq(MIN_VALUE)) return this.isOdd() ? MIN_VALUE : ZERO;
	if (this.isNegative()) if (multiplier.isNegative()) return this.neg().mul(multiplier.neg());
	else return this.neg().mul(multiplier).neg();
	else if (multiplier.isNegative()) return this.mul(multiplier.neg()).neg();
	if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24)) return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
	var a48 = this.high >>> 16;
	var a32 = this.high & 65535;
	var a16 = this.low >>> 16;
	var a00 = this.low & 65535;
	var b48 = multiplier.high >>> 16;
	var b32 = multiplier.high & 65535;
	var b16 = multiplier.low >>> 16;
	var b00 = multiplier.low & 65535;
	var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
	c00 += a00 * b00;
	c16 += c00 >>> 16;
	c00 &= 65535;
	c16 += a16 * b00;
	c32 += c16 >>> 16;
	c16 &= 65535;
	c16 += a00 * b16;
	c32 += c16 >>> 16;
	c16 &= 65535;
	c32 += a32 * b00;
	c48 += c32 >>> 16;
	c32 &= 65535;
	c32 += a16 * b16;
	c48 += c32 >>> 16;
	c32 &= 65535;
	c32 += a00 * b32;
	c48 += c32 >>> 16;
	c32 &= 65535;
	c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
	c48 &= 65535;
	return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
};
/**
* Returns the product of this and the specified Long. This is an alias of {@link Long#multiply}.
* @function
* @param {!Long|number|bigint|string} multiplier Multiplier
* @returns {!Long} Product
*/
LongPrototype.mul = LongPrototype.multiply;
/**
* Returns this Long divided by the specified. The result is signed if this Long is signed or
*  unsigned if this Long is unsigned.
* @this {!Long}
* @param {!Long|number|bigint|string} divisor Divisor
* @returns {!Long} Quotient
*/
LongPrototype.divide = function divide(divisor) {
	if (!isLong(divisor)) divisor = fromValue(divisor);
	if (divisor.isZero()) throw Error("division by zero");
	if (wasm) {
		if (!this.unsigned && this.high === -2147483648 && divisor.low === -1 && divisor.high === -1) return this;
		return fromBits((this.unsigned ? wasm["div_u"] : wasm["div_s"])(this.low, this.high, divisor.low, divisor.high), wasm["get_high"](), this.unsigned);
	}
	if (this.isZero()) return this.unsigned ? UZERO : ZERO;
	var approx, rem, res;
	if (!this.unsigned) {
		if (this.eq(MIN_VALUE)) if (divisor.eq(ONE) || divisor.eq(NEG_ONE)) return MIN_VALUE;
		else if (divisor.eq(MIN_VALUE)) return ONE;
		else {
			approx = this.shr(1).div(divisor).shl(1);
			if (approx.eq(ZERO)) return divisor.isNegative() ? ONE : NEG_ONE;
			else {
				rem = this.sub(divisor.mul(approx));
				res = approx.add(rem.div(divisor));
				return res;
			}
		}
		else if (divisor.eq(MIN_VALUE)) return this.unsigned ? UZERO : ZERO;
		if (this.isNegative()) {
			if (divisor.isNegative()) return this.neg().div(divisor.neg());
			return this.neg().div(divisor).neg();
		} else if (divisor.isNegative()) return this.div(divisor.neg()).neg();
		res = ZERO;
	} else {
		if (!divisor.unsigned) divisor = divisor.toUnsigned();
		if (divisor.gt(this)) return UZERO;
		if (divisor.gt(this.shru(1))) return UONE;
		res = UZERO;
	}
	rem = this;
	while (rem.gte(divisor)) {
		approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
		var log2 = Math.ceil(Math.log(approx) / Math.LN2), delta = log2 <= 48 ? 1 : pow_dbl(2, log2 - 48), approxRes = fromNumber(approx), approxRem = approxRes.mul(divisor);
		while (approxRem.isNegative() || approxRem.gt(rem)) {
			approx -= delta;
			approxRes = fromNumber(approx, this.unsigned);
			approxRem = approxRes.mul(divisor);
		}
		if (approxRes.isZero()) approxRes = ONE;
		res = res.add(approxRes);
		rem = rem.sub(approxRem);
	}
	return res;
};
/**
* Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
* @function
* @param {!Long|number|bigint|string} divisor Divisor
* @returns {!Long} Quotient
*/
LongPrototype.div = LongPrototype.divide;
/**
* Returns this Long modulo the specified.
* @this {!Long}
* @param {!Long|number|bigint|string} divisor Divisor
* @returns {!Long} Remainder
*/
LongPrototype.modulo = function modulo(divisor) {
	if (!isLong(divisor)) divisor = fromValue(divisor);
	if (wasm) return fromBits((this.unsigned ? wasm["rem_u"] : wasm["rem_s"])(this.low, this.high, divisor.low, divisor.high), wasm["get_high"](), this.unsigned);
	return this.sub(this.div(divisor).mul(divisor));
};
/**
* Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
* @function
* @param {!Long|number|bigint|string} divisor Divisor
* @returns {!Long} Remainder
*/
LongPrototype.mod = LongPrototype.modulo;
/**
* Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
* @function
* @param {!Long|number|bigint|string} divisor Divisor
* @returns {!Long} Remainder
*/
LongPrototype.rem = LongPrototype.modulo;
/**
* Returns the bitwise NOT of this Long.
* @this {!Long}
* @returns {!Long}
*/
LongPrototype.not = function not() {
	return fromBits(~this.low, ~this.high, this.unsigned);
};
/**
* Returns count leading zeros of this Long.
* @this {!Long}
* @returns {!number}
*/
LongPrototype.countLeadingZeros = function countLeadingZeros() {
	return this.high ? Math.clz32(this.high) : Math.clz32(this.low) + 32;
};
/**
* Returns count leading zeros. This is an alias of {@link Long#countLeadingZeros}.
* @function
* @param {!Long}
* @returns {!number}
*/
LongPrototype.clz = LongPrototype.countLeadingZeros;
/**
* Returns count trailing zeros of this Long.
* @this {!Long}
* @returns {!number}
*/
LongPrototype.countTrailingZeros = function countTrailingZeros() {
	return this.low ? ctz32(this.low) : ctz32(this.high) + 32;
};
/**
* Returns count trailing zeros. This is an alias of {@link Long#countTrailingZeros}.
* @function
* @param {!Long}
* @returns {!number}
*/
LongPrototype.ctz = LongPrototype.countTrailingZeros;
/**
* Returns the bitwise AND of this Long and the specified.
* @this {!Long}
* @param {!Long|number|bigint|string} other Other Long
* @returns {!Long}
*/
LongPrototype.and = function and(other) {
	if (!isLong(other)) other = fromValue(other);
	return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
};
/**
* Returns the bitwise OR of this Long and the specified.
* @this {!Long}
* @param {!Long|number|bigint|string} other Other Long
* @returns {!Long}
*/
LongPrototype.or = function or(other) {
	if (!isLong(other)) other = fromValue(other);
	return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
};
/**
* Returns the bitwise XOR of this Long and the given one.
* @this {!Long}
* @param {!Long|number|bigint|string} other Other Long
* @returns {!Long}
*/
LongPrototype.xor = function xor(other) {
	if (!isLong(other)) other = fromValue(other);
	return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
};
/**
* Returns this Long with bits shifted to the left by the given amount.
* @this {!Long}
* @param {number|!Long} numBits Number of bits
* @returns {!Long} Shifted Long
*/
LongPrototype.shiftLeft = function shiftLeft(numBits) {
	if (isLong(numBits)) numBits = numBits.toInt();
	if ((numBits &= 63) === 0) return this;
	else if (numBits < 32) return fromBits(this.low << numBits, this.high << numBits | this.low >>> 32 - numBits, this.unsigned);
	else return fromBits(0, this.low << numBits - 32, this.unsigned);
};
/**
* Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
* @function
* @param {number|!Long} numBits Number of bits
* @returns {!Long} Shifted Long
*/
LongPrototype.shl = LongPrototype.shiftLeft;
/**
* Returns this Long with bits arithmetically shifted to the right by the given amount.
* @this {!Long}
* @param {number|!Long} numBits Number of bits
* @returns {!Long} Shifted Long
*/
LongPrototype.shiftRight = function shiftRight(numBits) {
	if (isLong(numBits)) numBits = numBits.toInt();
	if ((numBits &= 63) === 0) return this;
	else if (numBits < 32) return fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >> numBits, this.unsigned);
	else return fromBits(this.high >> numBits - 32, this.high >= 0 ? 0 : -1, this.unsigned);
};
/**
* Returns this Long with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Long#shiftRight}.
* @function
* @param {number|!Long} numBits Number of bits
* @returns {!Long} Shifted Long
*/
LongPrototype.shr = LongPrototype.shiftRight;
/**
* Returns this Long with bits logically shifted to the right by the given amount.
* @this {!Long}
* @param {number|!Long} numBits Number of bits
* @returns {!Long} Shifted Long
*/
LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
	if (isLong(numBits)) numBits = numBits.toInt();
	if ((numBits &= 63) === 0) return this;
	if (numBits < 32) return fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >>> numBits, this.unsigned);
	if (numBits === 32) return fromBits(this.high, 0, this.unsigned);
	return fromBits(this.high >>> numBits - 32, 0, this.unsigned);
};
/**
* Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
* @function
* @param {number|!Long} numBits Number of bits
* @returns {!Long} Shifted Long
*/
LongPrototype.shru = LongPrototype.shiftRightUnsigned;
/**
* Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
* @function
* @param {number|!Long} numBits Number of bits
* @returns {!Long} Shifted Long
*/
LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;
/**
* Returns this Long with bits rotated to the left by the given amount.
* @this {!Long}
* @param {number|!Long} numBits Number of bits
* @returns {!Long} Rotated Long
*/
LongPrototype.rotateLeft = function rotateLeft(numBits) {
	var b;
	if (isLong(numBits)) numBits = numBits.toInt();
	if ((numBits &= 63) === 0) return this;
	if (numBits === 32) return fromBits(this.high, this.low, this.unsigned);
	if (numBits < 32) {
		b = 32 - numBits;
		return fromBits(this.low << numBits | this.high >>> b, this.high << numBits | this.low >>> b, this.unsigned);
	}
	numBits -= 32;
	b = 32 - numBits;
	return fromBits(this.high << numBits | this.low >>> b, this.low << numBits | this.high >>> b, this.unsigned);
};
/**
* Returns this Long with bits rotated to the left by the given amount. This is an alias of {@link Long#rotateLeft}.
* @function
* @param {number|!Long} numBits Number of bits
* @returns {!Long} Rotated Long
*/
LongPrototype.rotl = LongPrototype.rotateLeft;
/**
* Returns this Long with bits rotated to the right by the given amount.
* @this {!Long}
* @param {number|!Long} numBits Number of bits
* @returns {!Long} Rotated Long
*/
LongPrototype.rotateRight = function rotateRight(numBits) {
	var b;
	if (isLong(numBits)) numBits = numBits.toInt();
	if ((numBits &= 63) === 0) return this;
	if (numBits === 32) return fromBits(this.high, this.low, this.unsigned);
	if (numBits < 32) {
		b = 32 - numBits;
		return fromBits(this.high << b | this.low >>> numBits, this.low << b | this.high >>> numBits, this.unsigned);
	}
	numBits -= 32;
	b = 32 - numBits;
	return fromBits(this.low << b | this.high >>> numBits, this.high << b | this.low >>> numBits, this.unsigned);
};
/**
* Returns this Long with bits rotated to the right by the given amount. This is an alias of {@link Long#rotateRight}.
* @function
* @param {number|!Long} numBits Number of bits
* @returns {!Long} Rotated Long
*/
LongPrototype.rotr = LongPrototype.rotateRight;
/**
* Converts this Long to signed.
* @this {!Long}
* @returns {!Long} Signed long
*/
LongPrototype.toSigned = function toSigned() {
	if (!this.unsigned) return this;
	return fromBits(this.low, this.high, false);
};
/**
* Converts this Long to unsigned.
* @this {!Long}
* @returns {!Long} Unsigned long
*/
LongPrototype.toUnsigned = function toUnsigned() {
	if (this.unsigned) return this;
	return fromBits(this.low, this.high, true);
};
/**
* Converts this Long to its byte representation.
* @param {boolean=} le Whether little or big endian, defaults to big endian
* @this {!Long}
* @returns {!Array.<number>} Byte representation
*/
LongPrototype.toBytes = function toBytes(le) {
	return le ? this.toBytesLE() : this.toBytesBE();
};
/**
* Converts this Long to its little endian byte representation.
* @this {!Long}
* @returns {!Array.<number>} Little endian byte representation
*/
LongPrototype.toBytesLE = function toBytesLE() {
	var hi = this.high, lo = this.low;
	return [
		lo & 255,
		lo >>> 8 & 255,
		lo >>> 16 & 255,
		lo >>> 24,
		hi & 255,
		hi >>> 8 & 255,
		hi >>> 16 & 255,
		hi >>> 24
	];
};
/**
* Converts this Long to its big endian byte representation.
* @this {!Long}
* @returns {!Array.<number>} Big endian byte representation
*/
LongPrototype.toBytesBE = function toBytesBE() {
	var hi = this.high, lo = this.low;
	return [
		hi >>> 24,
		hi >>> 16 & 255,
		hi >>> 8 & 255,
		hi & 255,
		lo >>> 24,
		lo >>> 16 & 255,
		lo >>> 8 & 255,
		lo & 255
	];
};
/**
* Creates a Long from its byte representation.
* @param {!Array.<number>} bytes Byte representation
* @param {boolean=} unsigned Whether unsigned or not, defaults to signed
* @param {boolean=} le Whether little or big endian, defaults to big endian
* @returns {Long} The corresponding Long value
*/
Long.fromBytes = function fromBytes(bytes, unsigned, le) {
	return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
};
/**
* Creates a Long from its little endian byte representation.
* @param {!Array.<number>} bytes Little endian byte representation
* @param {boolean=} unsigned Whether unsigned or not, defaults to signed
* @returns {Long} The corresponding Long value
*/
Long.fromBytesLE = function fromBytesLE(bytes, unsigned) {
	return new Long(bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24, bytes[4] | bytes[5] << 8 | bytes[6] << 16 | bytes[7] << 24, unsigned);
};
/**
* Creates a Long from its big endian byte representation.
* @param {!Array.<number>} bytes Big endian byte representation
* @param {boolean=} unsigned Whether unsigned or not, defaults to signed
* @returns {Long} The corresponding Long value
*/
Long.fromBytesBE = function fromBytesBE(bytes, unsigned) {
	return new Long(bytes[4] << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7], bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], unsigned);
};
if (typeof BigInt === "function") {
	/**
	* Returns a Long representing the given big integer.
	* @function
	* @param {number} value The big integer value
	* @param {boolean=} unsigned Whether unsigned or not, defaults to signed
	* @returns {!Long} The corresponding Long value
	*/
	Long.fromBigInt = function fromBigInt(value, unsigned) {
		return fromBits(Number(BigInt.asIntN(32, value)), Number(BigInt.asIntN(32, value >> BigInt(32))), unsigned);
	};
	Long.fromValue = function fromValueWithBigInt(value, unsigned) {
		if (typeof value === "bigint") return Long.fromBigInt(value, unsigned);
		return fromValue(value, unsigned);
	};
	/**
	* Converts the Long to its big integer representation.
	* @this {!Long}
	* @returns {bigint}
	*/
	LongPrototype.toBigInt = function toBigInt() {
		var lowBigInt = BigInt(this.low >>> 0);
		return BigInt(this.unsigned ? this.high >>> 0 : this.high) << BigInt(32) | lowBigInt;
	};
}
//#endregion
//#region src/inc/util.ts
var formatDateTime = (ts) => {
	const date = new Date(ts);
	const f = new Intl.DateTimeFormat("en-CA", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false
	});
	const p = Object.fromEntries(f.formatToParts(date).map((x) => [x.type, x.value]));
	return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}:${p.second}`;
};
//#endregion
//#region src/component/common/nav.ts
var nav = (key) => {
	document.querySelector("body > aside > nav").querySelectorAll("a").forEach((a) => {
		if (a.dataset.id === key) a.classList.add("active");
		else a.classList.remove("active");
	});
};
//#endregion
//#region src/component/edit/edit.ts
var Edit = class {
	id;
	root;
	item = pb.Item.create();
	constructor(url, root) {
		this.root = root;
		this.id = Number(url.searchParams.get("id")) | 0;
		if (this.id) this.getData();
		else {
			nav("new");
			this.genHTML();
		}
	}
	async getData() {
		const it = await api.itemGet(this.id);
		if (!it) return;
		this.item = pb.Item.create(it);
		this.genHTML();
	}
	genHTML() {
		const r = this.root;
		r.innerHTML = edit_default;
		const form = r.querySelector("form");
		form.addEventListener("submit", (event) => {
			event.preventDefault();
			this.submit(form);
		});
		const it = this.item;
		var sid = "New";
		if (it.id > 0) sid = "" + it.id;
		form.querySelector("span.id").innerText = sid;
		this.formMeta(pb.ItemMeta.create(it.meta), form);
		this.formContent(pb.Revision.create(it.content), form);
		if (it.og) this.formOg(pb.OpenGraph.create(it.og), form);
	}
	formMeta(meta, form) {
		form.querySelector("input[name=title]").value = meta.title;
		if (meta.root) form.querySelector("input[name=root]").value = "" + meta.root;
		form.querySelector("input[name=original]").checked = meta.original;
		form.querySelector("input[name=trivial]").checked = meta.trivial;
		form.querySelector("input[name=hide]").checked = meta.tsHide > 0;
	}
	formContent(content, form) {
		form.querySelector(`input[name="format"][value="${content.format}"]`).checked = true;
		form.querySelector("textarea[name=content]").value = content.raw;
	}
	formOg(og, form) {
		if (og.image) form.querySelector(`input[name="og-image"]`).value = "" + og.image;
		form.querySelector(`input[name="og-description"]`).value = og.description;
		form.querySelector(`input[name="og-tag"]`).value = og.tag.join(",");
	}
	valTsCreate(fd) {
		const dt = "" + fd.get("time-create");
		if (!(dt?.length > 18)) return 0;
		let ts = new Date(dt).getTime() || 0;
		if (ts < 946656e6 || ts > Date.now() + 10 * 86400 * 1e3) ts = 0;
		return ts;
	}
	valOpenGraph(fd) {
		let tag = ("" + fd.get("og-tag")).split(",").map((s) => Number(s.trim())).filter((n) => n > 0);
		return pb.OpenGraph.fromObject({
			image: fd.get("og-image") || 0,
			description: "" + fd.get("og-description"),
			tag
		});
	}
	async submit(form) {
		const fd = new FormData(form);
		const o = pb.ItemEdit.fromObject({
			id: this.item.id,
			title: fd.get("title"),
			content: pb.Revision.fromObject({
				format: Number(fd.get("format")),
				raw: fd.get("content")
			}),
			root: fd.get("root") || 0,
			tsCreate: this.valTsCreate(fd),
			original: !!fd.get("original"),
			trivial: !!fd.get("trivial"),
			og: this.valOpenGraph(fd),
			hide: !!fd.get("hide")
		});
		const re = await api.itemSet(o);
		console.log("debug re", re);
	}
};
//#endregion
//#region src/component/list/list.html?raw
var list_default = "<div class=\"item-list\">\n</div>\n";
//#endregion
//#region src/component/common/item-row.ts
var tplItemList = (li, div) => {
	if (!div) return;
	div.textContent = "";
	for (const it of li) div.appendChild(tplItemRow(it));
};
var tplItemRow = (it) => {
	const d = document.createElement("div");
	const datetime = formatDateTime(it.meta.tsCreate);
	d.innerHTML = `<div>
		<div><a href="${`?action=edit&id=${it.id}`}" target="_blank">${it.id}</a></div>
		<div class="content">${it.content.raw}</div>
		<div>${datetime}</div>
	</div>`;
	return d;
};
//#endregion
//#region src/component/list/list.ts
var List = class {
	data = [];
	root;
	constructor(_, root) {
		nav("recent");
		this.root = root;
		this.getData();
	}
	async getData() {
		const re = await api.itemListRecent();
		if (re?.list?.length) this.data = re.list;
		this.genHTML();
	}
	genHTML() {
		const r = this.root;
		r.innerHTML = list_default;
		tplItemList(this.data, r.querySelector("div.item-list"));
	}
};
//#endregion
//#region src/component/search/search.html?raw
var search_default = "<form>\n<div class=\"row\">\n	<div class=\"col-2\">\n		OpenGraph\n	</div>\n	<div class=\"col-4\">\n		<label class=\"form-check-label\">\n			<input class=\"form-check-input\" type=\"radio\" name=\"og\" value=\"0\" checked>\n				忽略\n		</label><label class=\"form-check-label\">\n			<input class=\"form-check-input\" type=\"radio\" name=\"og\" value=\"1\">\n				有\n		</label><label class=\"form-check-label\">\n			<input class=\"form-check-input\" type=\"radio\" name=\"og\" value=\"2\">\n				没有\n		</label>\n	</div>\n	<div class=\"col-2\">\n		标题\n	</div>\n	<div class=\"col-4\">\n		<label class=\"form-check-label\">\n			<input class=\"form-check-input\" type=\"radio\" name=\"title\" value=\"0\" checked>\n				忽略\n		</label><label class=\"form-check-label\">\n			<input class=\"form-check-input\" type=\"radio\" name=\"title\" value=\"1\">\n				有\n		</label><label class=\"form-check-label\">\n			<input class=\"form-check-input\" type=\"radio\" name=\"title\" value=\"2\">\n				没有\n		</label>\n	</div>\n</div>\n<div class=\"row\">\n	<div class=\"col-2\">\n		原创\n	</div>\n	<div class=\"col-4\">\n		<label class=\"form-check-label\">\n			<input class=\"form-check-input\" type=\"radio\" name=\"original\" value=\"0\" checked>\n				忽略\n		</label><label class=\"form-check-label\">\n			<input class=\"form-check-input\" type=\"radio\" name=\"original\" value=\"1\">\n				有\n		</label><label class=\"form-check-label\">\n			<input class=\"form-check-input\" type=\"radio\" name=\"original\" value=\"2\">\n				没有\n		</label>\n	</div>\n	<div class=\"col-2\">\n		琐事\n	</div>\n	<div class=\"col-4\">\n		<label class=\"form-check-label\">\n			<input class=\"form-check-input\" type=\"radio\" name=\"trivial\" value=\"0\" checked>\n				忽略\n		</label><label class=\"form-check-label\">\n			<input class=\"form-check-input\" type=\"radio\" name=\"trivial\" value=\"1\">\n				有\n		</label><label class=\"form-check-label\">\n			<input class=\"form-check-input\" type=\"radio\" name=\"trivial\" value=\"2\">\n				没有\n		</label>\n	</div>\n</div>\n<div class=\"row\">\n	<div class=\"col-12\">\n		<input name=\"keyword\" class=\"form-control\" placeholder=\"Keyword\">\n	</div>\n</div>\n<div class=\"row\">\n	<div class=\"col\">\n		<button type=\"submit\" class=\"btn btn-primary\">Search</button>\n	</div>\n</div>\n</form>\n\n<div class=\"item-list\">\n</div>\n";
//#endregion
//#region src/component/search/search.ts
var Search = class {
	data = [];
	root;
	constructor(_, root) {
		nav("search");
		root.innerHTML = search_default;
		this.root = root;
		this.initHTML();
	}
	initHTML() {
		const form = this.root.querySelector("form");
		this.submit(form);
		form.addEventListener("submit", (event) => {
			event.preventDefault();
			this.submit(form);
		});
	}
	buildData(fd) {
		const d = { keyword: fd.get("keyword")?.toString() || "" };
		for (const key of [
			"og",
			"title",
			"original",
			"trivial"
		]) {
			const v = fd.get(key);
			let r = pb.ItemSearch.Cmd.NONE;
			switch (v) {
				case "1":
					r = pb.ItemSearch.Cmd.HAVE;
					break;
				case "2":
					r = pb.ItemSearch.Cmd.NOT_HAVE;
					break;
			}
			d[key] = r;
		}
		return pb.ItemSearch.fromObject(d);
	}
	async submit(form) {
		const re = await api.itemSearch(this.buildData(new FormData(form)));
		if (!re?.list?.length) return;
		tplItemList(re.list, this.root.querySelector("div.item-list"));
	}
};
//#endregion
//#region src/main.ts
(() => {
	const el = document.querySelector("body > main > section");
	const url = new URL(window.location.href);
	switch (url.searchParams.get("action")) {
		case "edit":
			new Edit(url, el);
			break;
		case "list":
			new List(url, el);
			break;
		case "search":
			new Search(url, el);
			break;
		default:
			new Search(url, el);
			break;
	}
	if (window.location.host !== "memoria.anna.9farm.com") {
		const h = document.querySelector("body > main> header");
		if (h) h.style.backgroundColor = "rgba(200, 150, 100, 0.5)";
	}
})();
//#endregion

//# sourceMappingURL=index-BaAf7xRG.js.map