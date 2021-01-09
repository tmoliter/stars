(() => {
  var t = {
      669: (t, n, e) => {
        t.exports = e(609);
      },
      448: (t, n, e) => {
        "use strict";
        var r = e(867),
          i = e(26),
          o = e(372),
          a = e(327),
          u = e(97),
          s = e(109),
          c = e(985),
          l = e(61);
        t.exports = function (t) {
          return new Promise(function (n, e) {
            var f = t.data,
              h = t.headers;
            r.isFormData(f) && delete h["Content-Type"];
            var p = new XMLHttpRequest();
            if (t.auth) {
              var d = t.auth.username || "",
                m = t.auth.password
                  ? unescape(encodeURIComponent(t.auth.password))
                  : "";
              h.Authorization = "Basic " + btoa(d + ":" + m);
            }
            var g = u(t.baseURL, t.url);
            if (
              (p.open(
                t.method.toUpperCase(),
                a(g, t.params, t.paramsSerializer),
                !0
              ),
              (p.timeout = t.timeout),
              (p.onreadystatechange = function () {
                if (
                  p &&
                  4 === p.readyState &&
                  (0 !== p.status ||
                    (p.responseURL && 0 === p.responseURL.indexOf("file:")))
                ) {
                  var r =
                      "getAllResponseHeaders" in p
                        ? s(p.getAllResponseHeaders())
                        : null,
                    o = {
                      data:
                        t.responseType && "text" !== t.responseType
                          ? p.response
                          : p.responseText,
                      status: p.status,
                      statusText: p.statusText,
                      headers: r,
                      config: t,
                      request: p,
                    };
                  i(n, e, o), (p = null);
                }
              }),
              (p.onabort = function () {
                p &&
                  (e(l("Request aborted", t, "ECONNABORTED", p)), (p = null));
              }),
              (p.onerror = function () {
                e(l("Network Error", t, null, p)), (p = null);
              }),
              (p.ontimeout = function () {
                var n = "timeout of " + t.timeout + "ms exceeded";
                t.timeoutErrorMessage && (n = t.timeoutErrorMessage),
                  e(l(n, t, "ECONNABORTED", p)),
                  (p = null);
              }),
              r.isStandardBrowserEnv())
            ) {
              var v =
                (t.withCredentials || c(g)) && t.xsrfCookieName
                  ? o.read(t.xsrfCookieName)
                  : void 0;
              v && (h[t.xsrfHeaderName] = v);
            }
            if (
              ("setRequestHeader" in p &&
                r.forEach(h, function (t, n) {
                  void 0 === f && "content-type" === n.toLowerCase()
                    ? delete h[n]
                    : p.setRequestHeader(n, t);
                }),
              r.isUndefined(t.withCredentials) ||
                (p.withCredentials = !!t.withCredentials),
              t.responseType)
            )
              try {
                p.responseType = t.responseType;
              } catch (n) {
                if ("json" !== t.responseType) throw n;
              }
            "function" == typeof t.onDownloadProgress &&
              p.addEventListener("progress", t.onDownloadProgress),
              "function" == typeof t.onUploadProgress &&
                p.upload &&
                p.upload.addEventListener("progress", t.onUploadProgress),
              t.cancelToken &&
                t.cancelToken.promise.then(function (t) {
                  p && (p.abort(), e(t), (p = null));
                }),
              f || (f = null),
              p.send(f);
          });
        };
      },
      609: (t, n, e) => {
        "use strict";
        var r = e(867),
          i = e(849),
          o = e(321),
          a = e(185);
        function u(t) {
          var n = new o(t),
            e = i(o.prototype.request, n);
          return r.extend(e, o.prototype, n), r.extend(e, n), e;
        }
        var s = u(e(655));
        (s.Axios = o),
          (s.create = function (t) {
            return u(a(s.defaults, t));
          }),
          (s.Cancel = e(263)),
          (s.CancelToken = e(972)),
          (s.isCancel = e(502)),
          (s.all = function (t) {
            return Promise.all(t);
          }),
          (s.spread = e(713)),
          (s.isAxiosError = e(268)),
          (t.exports = s),
          (t.exports.default = s);
      },
      263: (t) => {
        "use strict";
        function n(t) {
          this.message = t;
        }
        (n.prototype.toString = function () {
          return "Cancel" + (this.message ? ": " + this.message : "");
        }),
          (n.prototype.__CANCEL__ = !0),
          (t.exports = n);
      },
      972: (t, n, e) => {
        "use strict";
        var r = e(263);
        function i(t) {
          if ("function" != typeof t)
            throw new TypeError("executor must be a function.");
          var n;
          this.promise = new Promise(function (t) {
            n = t;
          });
          var e = this;
          t(function (t) {
            e.reason || ((e.reason = new r(t)), n(e.reason));
          });
        }
        (i.prototype.throwIfRequested = function () {
          if (this.reason) throw this.reason;
        }),
          (i.source = function () {
            var t;
            return {
              token: new i(function (n) {
                t = n;
              }),
              cancel: t,
            };
          }),
          (t.exports = i);
      },
      502: (t) => {
        "use strict";
        t.exports = function (t) {
          return !(!t || !t.__CANCEL__);
        };
      },
      321: (t, n, e) => {
        "use strict";
        var r = e(867),
          i = e(327),
          o = e(782),
          a = e(572),
          u = e(185);
        function s(t) {
          (this.defaults = t),
            (this.interceptors = { request: new o(), response: new o() });
        }
        (s.prototype.request = function (t) {
          "string" == typeof t
            ? ((t = arguments[1] || {}).url = arguments[0])
            : (t = t || {}),
            (t = u(this.defaults, t)).method
              ? (t.method = t.method.toLowerCase())
              : this.defaults.method
              ? (t.method = this.defaults.method.toLowerCase())
              : (t.method = "get");
          var n = [a, void 0],
            e = Promise.resolve(t);
          for (
            this.interceptors.request.forEach(function (t) {
              n.unshift(t.fulfilled, t.rejected);
            }),
              this.interceptors.response.forEach(function (t) {
                n.push(t.fulfilled, t.rejected);
              });
            n.length;

          )
            e = e.then(n.shift(), n.shift());
          return e;
        }),
          (s.prototype.getUri = function (t) {
            return (
              (t = u(this.defaults, t)),
              i(t.url, t.params, t.paramsSerializer).replace(/^\?/, "")
            );
          }),
          r.forEach(["delete", "get", "head", "options"], function (t) {
            s.prototype[t] = function (n, e) {
              return this.request(
                u(e || {}, { method: t, url: n, data: (e || {}).data })
              );
            };
          }),
          r.forEach(["post", "put", "patch"], function (t) {
            s.prototype[t] = function (n, e, r) {
              return this.request(u(r || {}, { method: t, url: n, data: e }));
            };
          }),
          (t.exports = s);
      },
      782: (t, n, e) => {
        "use strict";
        var r = e(867);
        function i() {
          this.handlers = [];
        }
        (i.prototype.use = function (t, n) {
          return (
            this.handlers.push({ fulfilled: t, rejected: n }),
            this.handlers.length - 1
          );
        }),
          (i.prototype.eject = function (t) {
            this.handlers[t] && (this.handlers[t] = null);
          }),
          (i.prototype.forEach = function (t) {
            r.forEach(this.handlers, function (n) {
              null !== n && t(n);
            });
          }),
          (t.exports = i);
      },
      97: (t, n, e) => {
        "use strict";
        var r = e(793),
          i = e(303);
        t.exports = function (t, n) {
          return t && !r(n) ? i(t, n) : n;
        };
      },
      61: (t, n, e) => {
        "use strict";
        var r = e(481);
        t.exports = function (t, n, e, i, o) {
          var a = new Error(t);
          return r(a, n, e, i, o);
        };
      },
      572: (t, n, e) => {
        "use strict";
        var r = e(867),
          i = e(527),
          o = e(502),
          a = e(655);
        function u(t) {
          t.cancelToken && t.cancelToken.throwIfRequested();
        }
        t.exports = function (t) {
          return (
            u(t),
            (t.headers = t.headers || {}),
            (t.data = i(t.data, t.headers, t.transformRequest)),
            (t.headers = r.merge(
              t.headers.common || {},
              t.headers[t.method] || {},
              t.headers
            )),
            r.forEach(
              ["delete", "get", "head", "post", "put", "patch", "common"],
              function (n) {
                delete t.headers[n];
              }
            ),
            (t.adapter || a.adapter)(t).then(
              function (n) {
                return (
                  u(t), (n.data = i(n.data, n.headers, t.transformResponse)), n
                );
              },
              function (n) {
                return (
                  o(n) ||
                    (u(t),
                    n &&
                      n.response &&
                      (n.response.data = i(
                        n.response.data,
                        n.response.headers,
                        t.transformResponse
                      ))),
                  Promise.reject(n)
                );
              }
            )
          );
        };
      },
      481: (t) => {
        "use strict";
        t.exports = function (t, n, e, r, i) {
          return (
            (t.config = n),
            e && (t.code = e),
            (t.request = r),
            (t.response = i),
            (t.isAxiosError = !0),
            (t.toJSON = function () {
              return {
                message: this.message,
                name: this.name,
                description: this.description,
                number: this.number,
                fileName: this.fileName,
                lineNumber: this.lineNumber,
                columnNumber: this.columnNumber,
                stack: this.stack,
                config: this.config,
                code: this.code,
              };
            }),
            t
          );
        };
      },
      185: (t, n, e) => {
        "use strict";
        var r = e(867);
        t.exports = function (t, n) {
          n = n || {};
          var e = {},
            i = ["url", "method", "data"],
            o = ["headers", "auth", "proxy", "params"],
            a = [
              "baseURL",
              "transformRequest",
              "transformResponse",
              "paramsSerializer",
              "timeout",
              "timeoutMessage",
              "withCredentials",
              "adapter",
              "responseType",
              "xsrfCookieName",
              "xsrfHeaderName",
              "onUploadProgress",
              "onDownloadProgress",
              "decompress",
              "maxContentLength",
              "maxBodyLength",
              "maxRedirects",
              "transport",
              "httpAgent",
              "httpsAgent",
              "cancelToken",
              "socketPath",
              "responseEncoding",
            ],
            u = ["validateStatus"];
          function s(t, n) {
            return r.isPlainObject(t) && r.isPlainObject(n)
              ? r.merge(t, n)
              : r.isPlainObject(n)
              ? r.merge({}, n)
              : r.isArray(n)
              ? n.slice()
              : n;
          }
          function c(i) {
            r.isUndefined(n[i])
              ? r.isUndefined(t[i]) || (e[i] = s(void 0, t[i]))
              : (e[i] = s(t[i], n[i]));
          }
          r.forEach(i, function (t) {
            r.isUndefined(n[t]) || (e[t] = s(void 0, n[t]));
          }),
            r.forEach(o, c),
            r.forEach(a, function (i) {
              r.isUndefined(n[i])
                ? r.isUndefined(t[i]) || (e[i] = s(void 0, t[i]))
                : (e[i] = s(void 0, n[i]));
            }),
            r.forEach(u, function (r) {
              r in n
                ? (e[r] = s(t[r], n[r]))
                : r in t && (e[r] = s(void 0, t[r]));
            });
          var l = i.concat(o).concat(a).concat(u),
            f = Object.keys(t)
              .concat(Object.keys(n))
              .filter(function (t) {
                return -1 === l.indexOf(t);
              });
          return r.forEach(f, c), e;
        };
      },
      26: (t, n, e) => {
        "use strict";
        var r = e(61);
        t.exports = function (t, n, e) {
          var i = e.config.validateStatus;
          e.status && i && !i(e.status)
            ? n(
                r(
                  "Request failed with status code " + e.status,
                  e.config,
                  null,
                  e.request,
                  e
                )
              )
            : t(e);
        };
      },
      527: (t, n, e) => {
        "use strict";
        var r = e(867);
        t.exports = function (t, n, e) {
          return (
            r.forEach(e, function (e) {
              t = e(t, n);
            }),
            t
          );
        };
      },
      655: (t, n, e) => {
        "use strict";
        var r = e(867),
          i = e(16),
          o = { "Content-Type": "application/x-www-form-urlencoded" };
        function a(t, n) {
          !r.isUndefined(t) &&
            r.isUndefined(t["Content-Type"]) &&
            (t["Content-Type"] = n);
        }
        var u,
          s = {
            adapter:
              (("undefined" != typeof XMLHttpRequest ||
                ("undefined" != typeof process &&
                  "[object process]" ===
                    Object.prototype.toString.call(process))) &&
                (u = e(448)),
              u),
            transformRequest: [
              function (t, n) {
                return (
                  i(n, "Accept"),
                  i(n, "Content-Type"),
                  r.isFormData(t) ||
                  r.isArrayBuffer(t) ||
                  r.isBuffer(t) ||
                  r.isStream(t) ||
                  r.isFile(t) ||
                  r.isBlob(t)
                    ? t
                    : r.isArrayBufferView(t)
                    ? t.buffer
                    : r.isURLSearchParams(t)
                    ? (a(n, "application/x-www-form-urlencoded;charset=utf-8"),
                      t.toString())
                    : r.isObject(t)
                    ? (a(n, "application/json;charset=utf-8"),
                      JSON.stringify(t))
                    : t
                );
              },
            ],
            transformResponse: [
              function (t) {
                if ("string" == typeof t)
                  try {
                    t = JSON.parse(t);
                  } catch (t) {}
                return t;
              },
            ],
            timeout: 0,
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",
            maxContentLength: -1,
            maxBodyLength: -1,
            validateStatus: function (t) {
              return t >= 200 && t < 300;
            },
            headers: {
              common: { Accept: "application/json, text/plain, */*" },
            },
          };
        r.forEach(["delete", "get", "head"], function (t) {
          s.headers[t] = {};
        }),
          r.forEach(["post", "put", "patch"], function (t) {
            s.headers[t] = r.merge(o);
          }),
          (t.exports = s);
      },
      849: (t) => {
        "use strict";
        t.exports = function (t, n) {
          return function () {
            for (var e = new Array(arguments.length), r = 0; r < e.length; r++)
              e[r] = arguments[r];
            return t.apply(n, e);
          };
        };
      },
      327: (t, n, e) => {
        "use strict";
        var r = e(867);
        function i(t) {
          return encodeURIComponent(t)
            .replace(/%3A/gi, ":")
            .replace(/%24/g, "$")
            .replace(/%2C/gi, ",")
            .replace(/%20/g, "+")
            .replace(/%5B/gi, "[")
            .replace(/%5D/gi, "]");
        }
        t.exports = function (t, n, e) {
          if (!n) return t;
          var o;
          if (e) o = e(n);
          else if (r.isURLSearchParams(n)) o = n.toString();
          else {
            var a = [];
            r.forEach(n, function (t, n) {
              null != t &&
                (r.isArray(t) ? (n += "[]") : (t = [t]),
                r.forEach(t, function (t) {
                  r.isDate(t)
                    ? (t = t.toISOString())
                    : r.isObject(t) && (t = JSON.stringify(t)),
                    a.push(i(n) + "=" + i(t));
                }));
            }),
              (o = a.join("&"));
          }
          if (o) {
            var u = t.indexOf("#");
            -1 !== u && (t = t.slice(0, u)),
              (t += (-1 === t.indexOf("?") ? "?" : "&") + o);
          }
          return t;
        };
      },
      303: (t) => {
        "use strict";
        t.exports = function (t, n) {
          return n ? t.replace(/\/+$/, "") + "/" + n.replace(/^\/+/, "") : t;
        };
      },
      372: (t, n, e) => {
        "use strict";
        var r = e(867);
        t.exports = r.isStandardBrowserEnv()
          ? {
              write: function (t, n, e, i, o, a) {
                var u = [];
                u.push(t + "=" + encodeURIComponent(n)),
                  r.isNumber(e) &&
                    u.push("expires=" + new Date(e).toGMTString()),
                  r.isString(i) && u.push("path=" + i),
                  r.isString(o) && u.push("domain=" + o),
                  !0 === a && u.push("secure"),
                  (document.cookie = u.join("; "));
              },
              read: function (t) {
                var n = document.cookie.match(
                  new RegExp("(^|;\\s*)(" + t + ")=([^;]*)")
                );
                return n ? decodeURIComponent(n[3]) : null;
              },
              remove: function (t) {
                this.write(t, "", Date.now() - 864e5);
              },
            }
          : {
              write: function () {},
              read: function () {
                return null;
              },
              remove: function () {},
            };
      },
      793: (t) => {
        "use strict";
        t.exports = function (t) {
          return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t);
        };
      },
      268: (t) => {
        "use strict";
        t.exports = function (t) {
          return "object" == typeof t && !0 === t.isAxiosError;
        };
      },
      985: (t, n, e) => {
        "use strict";
        var r = e(867);
        t.exports = r.isStandardBrowserEnv()
          ? (function () {
              var t,
                n = /(msie|trident)/i.test(navigator.userAgent),
                e = document.createElement("a");
              function i(t) {
                var r = t;
                return (
                  n && (e.setAttribute("href", r), (r = e.href)),
                  e.setAttribute("href", r),
                  {
                    href: e.href,
                    protocol: e.protocol ? e.protocol.replace(/:$/, "") : "",
                    host: e.host,
                    search: e.search ? e.search.replace(/^\?/, "") : "",
                    hash: e.hash ? e.hash.replace(/^#/, "") : "",
                    hostname: e.hostname,
                    port: e.port,
                    pathname:
                      "/" === e.pathname.charAt(0)
                        ? e.pathname
                        : "/" + e.pathname,
                  }
                );
              }
              return (
                (t = i(window.location.href)),
                function (n) {
                  var e = r.isString(n) ? i(n) : n;
                  return e.protocol === t.protocol && e.host === t.host;
                }
              );
            })()
          : function () {
              return !0;
            };
      },
      16: (t, n, e) => {
        "use strict";
        var r = e(867);
        t.exports = function (t, n) {
          r.forEach(t, function (e, r) {
            r !== n &&
              r.toUpperCase() === n.toUpperCase() &&
              ((t[n] = e), delete t[r]);
          });
        };
      },
      109: (t, n, e) => {
        "use strict";
        var r = e(867),
          i = [
            "age",
            "authorization",
            "content-length",
            "content-type",
            "etag",
            "expires",
            "from",
            "host",
            "if-modified-since",
            "if-unmodified-since",
            "last-modified",
            "location",
            "max-forwards",
            "proxy-authorization",
            "referer",
            "retry-after",
            "user-agent",
          ];
        t.exports = function (t) {
          var n,
            e,
            o,
            a = {};
          return t
            ? (r.forEach(t.split("\n"), function (t) {
                if (
                  ((o = t.indexOf(":")),
                  (n = r.trim(t.substr(0, o)).toLowerCase()),
                  (e = r.trim(t.substr(o + 1))),
                  n)
                ) {
                  if (a[n] && i.indexOf(n) >= 0) return;
                  a[n] =
                    "set-cookie" === n
                      ? (a[n] ? a[n] : []).concat([e])
                      : a[n]
                      ? a[n] + ", " + e
                      : e;
                }
              }),
              a)
            : a;
        };
      },
      713: (t) => {
        "use strict";
        t.exports = function (t) {
          return function (n) {
            return t.apply(null, n);
          };
        };
      },
      867: (t, n, e) => {
        "use strict";
        var r = e(849),
          i = Object.prototype.toString;
        function o(t) {
          return "[object Array]" === i.call(t);
        }
        function a(t) {
          return void 0 === t;
        }
        function u(t) {
          return null !== t && "object" == typeof t;
        }
        function s(t) {
          if ("[object Object]" !== i.call(t)) return !1;
          var n = Object.getPrototypeOf(t);
          return null === n || n === Object.prototype;
        }
        function c(t) {
          return "[object Function]" === i.call(t);
        }
        function l(t, n) {
          if (null != t)
            if (("object" != typeof t && (t = [t]), o(t)))
              for (var e = 0, r = t.length; e < r; e++)
                n.call(null, t[e], e, t);
            else
              for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) &&
                  n.call(null, t[i], i, t);
        }
        t.exports = {
          isArray: o,
          isArrayBuffer: function (t) {
            return "[object ArrayBuffer]" === i.call(t);
          },
          isBuffer: function (t) {
            return (
              null !== t &&
              !a(t) &&
              null !== t.constructor &&
              !a(t.constructor) &&
              "function" == typeof t.constructor.isBuffer &&
              t.constructor.isBuffer(t)
            );
          },
          isFormData: function (t) {
            return "undefined" != typeof FormData && t instanceof FormData;
          },
          isArrayBufferView: function (t) {
            return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView
              ? ArrayBuffer.isView(t)
              : t && t.buffer && t.buffer instanceof ArrayBuffer;
          },
          isString: function (t) {
            return "string" == typeof t;
          },
          isNumber: function (t) {
            return "number" == typeof t;
          },
          isObject: u,
          isPlainObject: s,
          isUndefined: a,
          isDate: function (t) {
            return "[object Date]" === i.call(t);
          },
          isFile: function (t) {
            return "[object File]" === i.call(t);
          },
          isBlob: function (t) {
            return "[object Blob]" === i.call(t);
          },
          isFunction: c,
          isStream: function (t) {
            return u(t) && c(t.pipe);
          },
          isURLSearchParams: function (t) {
            return (
              "undefined" != typeof URLSearchParams &&
              t instanceof URLSearchParams
            );
          },
          isStandardBrowserEnv: function () {
            return (
              ("undefined" == typeof navigator ||
                ("ReactNative" !== navigator.product &&
                  "NativeScript" !== navigator.product &&
                  "NS" !== navigator.product)) &&
              "undefined" != typeof window &&
              "undefined" != typeof document
            );
          },
          forEach: l,
          merge: function t() {
            var n = {};
            function e(e, r) {
              s(n[r]) && s(e)
                ? (n[r] = t(n[r], e))
                : s(e)
                ? (n[r] = t({}, e))
                : o(e)
                ? (n[r] = e.slice())
                : (n[r] = e);
            }
            for (var r = 0, i = arguments.length; r < i; r++)
              l(arguments[r], e);
            return n;
          },
          extend: function (t, n, e) {
            return (
              l(n, function (n, i) {
                t[i] = e && "function" == typeof n ? r(n, e) : n;
              }),
              t
            );
          },
          trim: function (t) {
            return t.replace(/^\s*/, "").replace(/\s*$/, "");
          },
          stripBOM: function (t) {
            return 65279 === t.charCodeAt(0) && (t = t.slice(1)), t;
          },
        };
      },
    },
    n = {};
  function e(r) {
    if (n[r]) return n[r].exports;
    var i = (n[r] = { exports: {} });
    return t[r](i, i.exports, e), i.exports;
  }
  (e.n = (t) => {
    var n = t && t.__esModule ? () => t.default : () => t;
    return e.d(n, { a: n }), n;
  }),
    (e.d = (t, n) => {
      for (var r in n)
        e.o(n, r) &&
          !e.o(t, r) &&
          Object.defineProperty(t, r, { enumerable: !0, get: n[r] });
    }),
    (e.o = (t, n) => Object.prototype.hasOwnProperty.call(t, n)),
    (() => {
      "use strict";
      function t(t, n) {
        let e;
        if (void 0 === n)
          for (const n of t)
            null != n && (e < n || (void 0 === e && n >= n)) && (e = n);
        else {
          let r = -1;
          for (let i of t)
            null != (i = n(i, ++r, t)) &&
              (e < i || (void 0 === e && i >= i)) &&
              (e = i);
        }
        return e;
      }
      var n = Array.prototype.slice;
      function r(t) {
        return t;
      }
      var i = 1e-6;
      function o(t) {
        return "translate(" + (t + 0.5) + ",0)";
      }
      function a(t) {
        return "translate(0," + (t + 0.5) + ")";
      }
      function u(t) {
        return (n) => +t(n);
      }
      function s(t) {
        var n = Math.max(0, t.bandwidth() - 1) / 2;
        return (
          t.round() && (n = Math.round(n)),
          function (e) {
            return +t(e) + n;
          }
        );
      }
      function c() {
        return !this.__axis;
      }
      function l(t, e) {
        var l = [],
          f = null,
          h = null,
          p = 6,
          d = 6,
          m = 3,
          g = 1 === t || 4 === t ? -1 : 1,
          v = 4 === t || 2 === t ? "x" : "y",
          y = 1 === t || 3 === t ? o : a;
        function w(n) {
          var o = null == f ? (e.ticks ? e.ticks.apply(e, l) : e.domain()) : f,
            a = null == h ? (e.tickFormat ? e.tickFormat.apply(e, l) : r) : h,
            w = Math.max(p, 0) + m,
            _ = e.range(),
            x = +_[0] + 0.5,
            b = +_[_.length - 1] + 0.5,
            M = (e.bandwidth ? s : u)(e.copy()),
            k = n.selection ? n.selection() : n,
            A = k.selectAll(".domain").data([null]),
            N = k.selectAll(".tick").data(o, e).order(),
            E = N.exit(),
            S = N.enter().append("g").attr("class", "tick"),
            C = N.select("line"),
            j = N.select("text");
          (A = A.merge(
            A.enter()
              .insert("path", ".tick")
              .attr("class", "domain")
              .attr("stroke", "currentColor")
          )),
            (N = N.merge(S)),
            (C = C.merge(
              S.append("line")
                .attr("stroke", "currentColor")
                .attr(v + "2", g * p)
            )),
            (j = j.merge(
              S.append("text")
                .attr("fill", "currentColor")
                .attr(v, g * w)
                .attr("dy", 1 === t ? "0em" : 3 === t ? "0.71em" : "0.32em")
            )),
            n !== k &&
              ((A = A.transition(n)),
              (N = N.transition(n)),
              (C = C.transition(n)),
              (j = j.transition(n)),
              (E = E.transition(n)
                .attr("opacity", i)
                .attr("transform", function (t) {
                  return isFinite((t = M(t)))
                    ? y(t)
                    : this.getAttribute("transform");
                })),
              S.attr("opacity", i).attr("transform", function (t) {
                var n = this.parentNode.__axis;
                return y(n && isFinite((n = n(t))) ? n : M(t));
              })),
            E.remove(),
            A.attr(
              "d",
              4 === t || 2 == t
                ? d
                  ? "M" + g * d + "," + x + "H0.5V" + b + "H" + g * d
                  : "M0.5," + x + "V" + b
                : d
                ? "M" + x + "," + g * d + "V0.5H" + b + "V" + g * d
                : "M" + x + ",0.5H" + b
            ),
            N.attr("opacity", 1).attr("transform", function (t) {
              return y(M(t));
            }),
            C.attr(v + "2", g * p),
            j.attr(v, g * w).text(a),
            k
              .filter(c)
              .attr("fill", "none")
              .attr("font-size", 10)
              .attr("font-family", "sans-serif")
              .attr(
                "text-anchor",
                2 === t ? "start" : 4 === t ? "end" : "middle"
              ),
            k.each(function () {
              this.__axis = M;
            });
        }
        return (
          (w.scale = function (t) {
            return arguments.length ? ((e = t), w) : e;
          }),
          (w.ticks = function () {
            return (l = n.call(arguments)), w;
          }),
          (w.tickArguments = function (t) {
            return arguments.length
              ? ((l = null == t ? [] : n.call(t)), w)
              : l.slice();
          }),
          (w.tickValues = function (t) {
            return arguments.length
              ? ((f = null == t ? null : n.call(t)), w)
              : f && f.slice();
          }),
          (w.tickFormat = function (t) {
            return arguments.length ? ((h = t), w) : h;
          }),
          (w.tickSize = function (t) {
            return arguments.length ? ((p = d = +t), w) : p;
          }),
          (w.tickSizeInner = function (t) {
            return arguments.length ? ((p = +t), w) : p;
          }),
          (w.tickSizeOuter = function (t) {
            return arguments.length ? ((d = +t), w) : d;
          }),
          (w.tickPadding = function (t) {
            return arguments.length ? ((m = +t), w) : m;
          }),
          w
        );
      }
      function f() {}
      function h(t) {
        return null == t
          ? f
          : function () {
              return this.querySelector(t);
            };
      }
      function p(t) {
        return "object" == typeof t && "length" in t ? t : Array.from(t);
      }
      function d() {
        return [];
      }
      function m(t) {
        return null == t
          ? d
          : function () {
              return this.querySelectorAll(t);
            };
      }
      function g(t) {
        return function () {
          return this.matches(t);
        };
      }
      function v(t) {
        return function (n) {
          return n.matches(t);
        };
      }
      var y = Array.prototype.find;
      function w() {
        return this.firstElementChild;
      }
      var _ = Array.prototype.filter;
      function x() {
        return this.children;
      }
      function b(t) {
        return new Array(t.length);
      }
      function M(t, n) {
        (this.ownerDocument = t.ownerDocument),
          (this.namespaceURI = t.namespaceURI),
          (this._next = null),
          (this._parent = t),
          (this.__data__ = n);
      }
      function k(t) {
        return function () {
          return t;
        };
      }
      function A(t, n, e, r, i, o) {
        for (var a, u = 0, s = n.length, c = o.length; u < c; ++u)
          (a = n[u])
            ? ((a.__data__ = o[u]), (r[u] = a))
            : (e[u] = new M(t, o[u]));
        for (; u < s; ++u) (a = n[u]) && (i[u] = a);
      }
      function N(t, n, e, r, i, o, a) {
        var u,
          s,
          c,
          l = new Map(),
          f = n.length,
          h = o.length,
          p = new Array(f);
        for (u = 0; u < f; ++u)
          (s = n[u]) &&
            ((p[u] = c = a.call(s, s.__data__, u, n) + ""),
            l.has(c) ? (i[u] = s) : l.set(c, s));
        for (u = 0; u < h; ++u)
          (c = a.call(t, o[u], u, o) + ""),
            (s = l.get(c))
              ? ((r[u] = s), (s.__data__ = o[u]), l.delete(c))
              : (e[u] = new M(t, o[u]));
        for (u = 0; u < f; ++u) (s = n[u]) && l.get(p[u]) === s && (i[u] = s);
      }
      function E(t) {
        return t.__data__;
      }
      function S(t, n) {
        return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
      }
      M.prototype = {
        constructor: M,
        appendChild: function (t) {
          return this._parent.insertBefore(t, this._next);
        },
        insertBefore: function (t, n) {
          return this._parent.insertBefore(t, n);
        },
        querySelector: function (t) {
          return this._parent.querySelector(t);
        },
        querySelectorAll: function (t) {
          return this._parent.querySelectorAll(t);
        },
      };
      var C = "http://www.w3.org/1999/xhtml";
      const j = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: C,
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/",
      };
      function O(t) {
        var n = (t += ""),
          e = n.indexOf(":");
        return (
          e >= 0 && "xmlns" !== (n = t.slice(0, e)) && (t = t.slice(e + 1)),
          j.hasOwnProperty(n) ? { space: j[n], local: t } : t
        );
      }
      function R(t) {
        return function () {
          this.removeAttribute(t);
        };
      }
      function P(t) {
        return function () {
          this.removeAttributeNS(t.space, t.local);
        };
      }
      function T(t, n) {
        return function () {
          this.setAttribute(t, n);
        };
      }
      function q(t, n) {
        return function () {
          this.setAttributeNS(t.space, t.local, n);
        };
      }
      function L(t, n) {
        return function () {
          var e = n.apply(this, arguments);
          null == e ? this.removeAttribute(t) : this.setAttribute(t, e);
        };
      }
      function B(t, n) {
        return function () {
          var e = n.apply(this, arguments);
          null == e
            ? this.removeAttributeNS(t.space, t.local)
            : this.setAttributeNS(t.space, t.local, e);
        };
      }
      function U(t) {
        return (
          (t.ownerDocument && t.ownerDocument.defaultView) ||
          (t.document && t) ||
          t.defaultView
        );
      }
      function D(t) {
        return function () {
          this.style.removeProperty(t);
        };
      }
      function X(t, n, e) {
        return function () {
          this.style.setProperty(t, n, e);
        };
      }
      function z(t, n, e) {
        return function () {
          var r = n.apply(this, arguments);
          null == r
            ? this.style.removeProperty(t)
            : this.style.setProperty(t, r, e);
        };
      }
      function F(t, n) {
        return (
          t.style.getPropertyValue(n) ||
          U(t).getComputedStyle(t, null).getPropertyValue(n)
        );
      }
      function H(t) {
        return function () {
          delete this[t];
        };
      }
      function I(t, n) {
        return function () {
          this[t] = n;
        };
      }
      function V(t, n) {
        return function () {
          var e = n.apply(this, arguments);
          null == e ? delete this[t] : (this[t] = e);
        };
      }
      function $(t) {
        return t.trim().split(/^|\s+/);
      }
      function Y(t) {
        return t.classList || new J(t);
      }
      function J(t) {
        (this._node = t), (this._names = $(t.getAttribute("class") || ""));
      }
      function K(t, n) {
        for (var e = Y(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
      }
      function G(t, n) {
        for (var e = Y(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
      }
      function W(t) {
        return function () {
          K(this, t);
        };
      }
      function Z(t) {
        return function () {
          G(this, t);
        };
      }
      function Q(t, n) {
        return function () {
          (n.apply(this, arguments) ? K : G)(this, t);
        };
      }
      function tt() {
        this.textContent = "";
      }
      function nt(t) {
        return function () {
          this.textContent = t;
        };
      }
      function et(t) {
        return function () {
          var n = t.apply(this, arguments);
          this.textContent = null == n ? "" : n;
        };
      }
      function rt() {
        this.innerHTML = "";
      }
      function it(t) {
        return function () {
          this.innerHTML = t;
        };
      }
      function ot(t) {
        return function () {
          var n = t.apply(this, arguments);
          this.innerHTML = null == n ? "" : n;
        };
      }
      function at() {
        this.nextSibling && this.parentNode.appendChild(this);
      }
      function ut() {
        this.previousSibling &&
          this.parentNode.insertBefore(this, this.parentNode.firstChild);
      }
      function st(t) {
        return function () {
          var n = this.ownerDocument,
            e = this.namespaceURI;
          return e === C && n.documentElement.namespaceURI === C
            ? n.createElement(t)
            : n.createElementNS(e, t);
        };
      }
      function ct(t) {
        return function () {
          return this.ownerDocument.createElementNS(t.space, t.local);
        };
      }
      function lt(t) {
        var n = O(t);
        return (n.local ? ct : st)(n);
      }
      function ft() {
        return null;
      }
      function ht() {
        var t = this.parentNode;
        t && t.removeChild(this);
      }
      function pt() {
        var t = this.cloneNode(!1),
          n = this.parentNode;
        return n ? n.insertBefore(t, this.nextSibling) : t;
      }
      function dt() {
        var t = this.cloneNode(!0),
          n = this.parentNode;
        return n ? n.insertBefore(t, this.nextSibling) : t;
      }
      function mt(t) {
        return t
          .trim()
          .split(/^|\s+/)
          .map(function (t) {
            var n = "",
              e = t.indexOf(".");
            return (
              e >= 0 && ((n = t.slice(e + 1)), (t = t.slice(0, e))),
              { type: t, name: n }
            );
          });
      }
      function gt(t) {
        return function () {
          var n = this.__on;
          if (n) {
            for (var e, r = 0, i = -1, o = n.length; r < o; ++r)
              (e = n[r]),
                (t.type && e.type !== t.type) || e.name !== t.name
                  ? (n[++i] = e)
                  : this.removeEventListener(e.type, e.listener, e.options);
            ++i ? (n.length = i) : delete this.__on;
          }
        };
      }
      function vt(t, n, e) {
        return function () {
          var r,
            i = this.__on,
            o = (function (t) {
              return function (n) {
                t.call(this, n, this.__data__);
              };
            })(n);
          if (i)
            for (var a = 0, u = i.length; a < u; ++a)
              if ((r = i[a]).type === t.type && r.name === t.name)
                return (
                  this.removeEventListener(r.type, r.listener, r.options),
                  this.addEventListener(
                    r.type,
                    (r.listener = o),
                    (r.options = e)
                  ),
                  void (r.value = n)
                );
          this.addEventListener(t.type, o, e),
            (r = {
              type: t.type,
              name: t.name,
              value: n,
              listener: o,
              options: e,
            }),
            i ? i.push(r) : (this.__on = [r]);
        };
      }
      function yt(t, n, e) {
        var r = U(t),
          i = r.CustomEvent;
        "function" == typeof i
          ? (i = new i(n, e))
          : ((i = r.document.createEvent("Event")),
            e
              ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
              : i.initEvent(n, !1, !1)),
          t.dispatchEvent(i);
      }
      function wt(t, n) {
        return function () {
          return yt(this, t, n);
        };
      }
      function _t(t, n) {
        return function () {
          return yt(this, t, n.apply(this, arguments));
        };
      }
      J.prototype = {
        add: function (t) {
          this._names.indexOf(t) < 0 &&
            (this._names.push(t),
            this._node.setAttribute("class", this._names.join(" ")));
        },
        remove: function (t) {
          var n = this._names.indexOf(t);
          n >= 0 &&
            (this._names.splice(n, 1),
            this._node.setAttribute("class", this._names.join(" ")));
        },
        contains: function (t) {
          return this._names.indexOf(t) >= 0;
        },
      };
      var xt = [null];
      function bt(t, n) {
        (this._groups = t), (this._parents = n);
      }
      function Mt() {
        return new bt([[document.documentElement]], xt);
      }
      bt.prototype = Mt.prototype = {
        constructor: bt,
        select: function (t) {
          "function" != typeof t && (t = h(t));
          for (
            var n = this._groups, e = n.length, r = new Array(e), i = 0;
            i < e;
            ++i
          )
            for (
              var o,
                a,
                u = n[i],
                s = u.length,
                c = (r[i] = new Array(s)),
                l = 0;
              l < s;
              ++l
            )
              (o = u[l]) &&
                (a = t.call(o, o.__data__, l, u)) &&
                ("__data__" in o && (a.__data__ = o.__data__), (c[l] = a));
          return new bt(r, this._parents);
        },
        selectAll: function (t) {
          t =
            "function" == typeof t
              ? (function (t) {
                  return function () {
                    var n = t.apply(this, arguments);
                    return null == n ? [] : p(n);
                  };
                })(t)
              : m(t);
          for (
            var n = this._groups, e = n.length, r = [], i = [], o = 0;
            o < e;
            ++o
          )
            for (var a, u = n[o], s = u.length, c = 0; c < s; ++c)
              (a = u[c]) && (r.push(t.call(a, a.__data__, c, u)), i.push(a));
          return new bt(r, i);
        },
        selectChild: function (t) {
          return this.select(
            null == t
              ? w
              : (function (t) {
                  return function () {
                    return y.call(this.children, t);
                  };
                })("function" == typeof t ? t : v(t))
          );
        },
        selectChildren: function (t) {
          return this.selectAll(
            null == t
              ? x
              : (function (t) {
                  return function () {
                    return _.call(this.children, t);
                  };
                })("function" == typeof t ? t : v(t))
          );
        },
        filter: function (t) {
          "function" != typeof t && (t = g(t));
          for (
            var n = this._groups, e = n.length, r = new Array(e), i = 0;
            i < e;
            ++i
          )
            for (
              var o, a = n[i], u = a.length, s = (r[i] = []), c = 0;
              c < u;
              ++c
            )
              (o = a[c]) && t.call(o, o.__data__, c, a) && s.push(o);
          return new bt(r, this._parents);
        },
        data: function (t, n) {
          if (!arguments.length) return Array.from(this, E);
          var e = n ? N : A,
            r = this._parents,
            i = this._groups;
          "function" != typeof t && (t = k(t));
          for (
            var o = i.length,
              a = new Array(o),
              u = new Array(o),
              s = new Array(o),
              c = 0;
            c < o;
            ++c
          ) {
            var l = r[c],
              f = i[c],
              h = f.length,
              d = p(t.call(l, l && l.__data__, c, r)),
              m = d.length,
              g = (u[c] = new Array(m)),
              v = (a[c] = new Array(m)),
              y = (s[c] = new Array(h));
            e(l, f, g, v, y, d, n);
            for (var w, _, x = 0, b = 0; x < m; ++x)
              if ((w = g[x])) {
                for (x >= b && (b = x + 1); !(_ = v[b]) && ++b < m; );
                w._next = _ || null;
              }
          }
          return ((a = new bt(a, r))._enter = u), (a._exit = s), a;
        },
        enter: function () {
          return new bt(this._enter || this._groups.map(b), this._parents);
        },
        exit: function () {
          return new bt(this._exit || this._groups.map(b), this._parents);
        },
        join: function (t, n, e) {
          var r = this.enter(),
            i = this,
            o = this.exit();
          return (
            (r = "function" == typeof t ? t(r) : r.append(t + "")),
            null != n && (i = n(i)),
            null == e ? o.remove() : e(o),
            r && i ? r.merge(i).order() : i
          );
        },
        merge: function (t) {
          if (!(t instanceof bt)) throw new Error("invalid merge");
          for (
            var n = this._groups,
              e = t._groups,
              r = n.length,
              i = e.length,
              o = Math.min(r, i),
              a = new Array(r),
              u = 0;
            u < o;
            ++u
          )
            for (
              var s,
                c = n[u],
                l = e[u],
                f = c.length,
                h = (a[u] = new Array(f)),
                p = 0;
              p < f;
              ++p
            )
              (s = c[p] || l[p]) && (h[p] = s);
          for (; u < r; ++u) a[u] = n[u];
          return new bt(a, this._parents);
        },
        selection: function () {
          return this;
        },
        order: function () {
          for (var t = this._groups, n = -1, e = t.length; ++n < e; )
            for (var r, i = t[n], o = i.length - 1, a = i[o]; --o >= 0; )
              (r = i[o]) &&
                (a &&
                  4 ^ r.compareDocumentPosition(a) &&
                  a.parentNode.insertBefore(r, a),
                (a = r));
          return this;
        },
        sort: function (t) {
          function n(n, e) {
            return n && e ? t(n.__data__, e.__data__) : !n - !e;
          }
          t || (t = S);
          for (
            var e = this._groups, r = e.length, i = new Array(r), o = 0;
            o < r;
            ++o
          ) {
            for (
              var a, u = e[o], s = u.length, c = (i[o] = new Array(s)), l = 0;
              l < s;
              ++l
            )
              (a = u[l]) && (c[l] = a);
            c.sort(n);
          }
          return new bt(i, this._parents).order();
        },
        call: function () {
          var t = arguments[0];
          return (arguments[0] = this), t.apply(null, arguments), this;
        },
        nodes: function () {
          return Array.from(this);
        },
        node: function () {
          for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
            for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
              var a = r[i];
              if (a) return a;
            }
          return null;
        },
        size: function () {
          let t = 0;
          for (const n of this) ++t;
          return t;
        },
        empty: function () {
          return !this.node();
        },
        each: function (t) {
          for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
            for (var i, o = n[e], a = 0, u = o.length; a < u; ++a)
              (i = o[a]) && t.call(i, i.__data__, a, o);
          return this;
        },
        attr: function (t, n) {
          var e = O(t);
          if (arguments.length < 2) {
            var r = this.node();
            return e.local
              ? r.getAttributeNS(e.space, e.local)
              : r.getAttribute(e);
          }
          return this.each(
            (null == n
              ? e.local
                ? P
                : R
              : "function" == typeof n
              ? e.local
                ? B
                : L
              : e.local
              ? q
              : T)(e, n)
          );
        },
        style: function (t, n, e) {
          return arguments.length > 1
            ? this.each(
                (null == n ? D : "function" == typeof n ? z : X)(
                  t,
                  n,
                  null == e ? "" : e
                )
              )
            : F(this.node(), t);
        },
        property: function (t, n) {
          return arguments.length > 1
            ? this.each((null == n ? H : "function" == typeof n ? V : I)(t, n))
            : this.node()[t];
        },
        classed: function (t, n) {
          var e = $(t + "");
          if (arguments.length < 2) {
            for (var r = Y(this.node()), i = -1, o = e.length; ++i < o; )
              if (!r.contains(e[i])) return !1;
            return !0;
          }
          return this.each(("function" == typeof n ? Q : n ? W : Z)(e, n));
        },
        text: function (t) {
          return arguments.length
            ? this.each(null == t ? tt : ("function" == typeof t ? et : nt)(t))
            : this.node().textContent;
        },
        html: function (t) {
          return arguments.length
            ? this.each(null == t ? rt : ("function" == typeof t ? ot : it)(t))
            : this.node().innerHTML;
        },
        raise: function () {
          return this.each(at);
        },
        lower: function () {
          return this.each(ut);
        },
        append: function (t) {
          var n = "function" == typeof t ? t : lt(t);
          return this.select(function () {
            return this.appendChild(n.apply(this, arguments));
          });
        },
        insert: function (t, n) {
          var e = "function" == typeof t ? t : lt(t),
            r = null == n ? ft : "function" == typeof n ? n : h(n);
          return this.select(function () {
            return this.insertBefore(
              e.apply(this, arguments),
              r.apply(this, arguments) || null
            );
          });
        },
        remove: function () {
          return this.each(ht);
        },
        clone: function (t) {
          return this.select(t ? dt : pt);
        },
        datum: function (t) {
          return arguments.length
            ? this.property("__data__", t)
            : this.node().__data__;
        },
        on: function (t, n, e) {
          var r,
            i,
            o = mt(t + ""),
            a = o.length;
          if (!(arguments.length < 2)) {
            for (u = n ? vt : gt, r = 0; r < a; ++r) this.each(u(o[r], n, e));
            return this;
          }
          var u = this.node().__on;
          if (u)
            for (var s, c = 0, l = u.length; c < l; ++c)
              for (r = 0, s = u[c]; r < a; ++r)
                if ((i = o[r]).type === s.type && i.name === s.name)
                  return s.value;
        },
        dispatch: function (t, n) {
          return this.each(("function" == typeof n ? _t : wt)(t, n));
        },
        [Symbol.iterator]: function* () {
          for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
            for (var r, i = t[n], o = 0, a = i.length; o < a; ++o)
              (r = i[o]) && (yield r);
        },
      };
      const kt = Mt;
      var At = { value: () => {} };
      function Nt() {
        for (var t, n = 0, e = arguments.length, r = {}; n < e; ++n) {
          if (!(t = arguments[n] + "") || t in r || /[\s.]/.test(t))
            throw new Error("illegal type: " + t);
          r[t] = [];
        }
        return new Et(r);
      }
      function Et(t) {
        this._ = t;
      }
      function St(t, n) {
        return t
          .trim()
          .split(/^|\s+/)
          .map(function (t) {
            var e = "",
              r = t.indexOf(".");
            if (
              (r >= 0 && ((e = t.slice(r + 1)), (t = t.slice(0, r))),
              t && !n.hasOwnProperty(t))
            )
              throw new Error("unknown type: " + t);
            return { type: t, name: e };
          });
      }
      function Ct(t, n) {
        for (var e, r = 0, i = t.length; r < i; ++r)
          if ((e = t[r]).name === n) return e.value;
      }
      function jt(t, n, e) {
        for (var r = 0, i = t.length; r < i; ++r)
          if (t[r].name === n) {
            (t[r] = At), (t = t.slice(0, r).concat(t.slice(r + 1)));
            break;
          }
        return null != e && t.push({ name: n, value: e }), t;
      }
      Et.prototype = Nt.prototype = {
        constructor: Et,
        on: function (t, n) {
          var e,
            r = this._,
            i = St(t + "", r),
            o = -1,
            a = i.length;
          if (!(arguments.length < 2)) {
            if (null != n && "function" != typeof n)
              throw new Error("invalid callback: " + n);
            for (; ++o < a; )
              if ((e = (t = i[o]).type)) r[e] = jt(r[e], t.name, n);
              else if (null == n) for (e in r) r[e] = jt(r[e], t.name, null);
            return this;
          }
          for (; ++o < a; )
            if ((e = (t = i[o]).type) && (e = Ct(r[e], t.name))) return e;
        },
        copy: function () {
          var t = {},
            n = this._;
          for (var e in n) t[e] = n[e].slice();
          return new Et(t);
        },
        call: function (t, n) {
          if ((e = arguments.length - 2) > 0)
            for (var e, r, i = new Array(e), o = 0; o < e; ++o)
              i[o] = arguments[o + 2];
          if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
          for (o = 0, e = (r = this._[t]).length; o < e; ++o)
            r[o].value.apply(n, i);
        },
        apply: function (t, n, e) {
          if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
          for (var r = this._[t], i = 0, o = r.length; i < o; ++i)
            r[i].value.apply(n, e);
        },
      };
      const Ot = Nt;
      var Rt,
        Pt,
        Tt = 0,
        qt = 0,
        Lt = 0,
        Bt = 0,
        Ut = 0,
        Dt = 0,
        Xt =
          "object" == typeof performance && performance.now
            ? performance
            : Date,
        zt =
          "object" == typeof window && window.requestAnimationFrame
            ? window.requestAnimationFrame.bind(window)
            : function (t) {
                setTimeout(t, 17);
              };
      function Ft() {
        return Ut || (zt(Ht), (Ut = Xt.now() + Dt));
      }
      function Ht() {
        Ut = 0;
      }
      function It() {
        this._call = this._time = this._next = null;
      }
      function Vt(t, n, e) {
        var r = new It();
        return r.restart(t, n, e), r;
      }
      function $t() {
        (Ut = (Bt = Xt.now()) + Dt), (Tt = qt = 0);
        try {
          !(function () {
            Ft(), ++Tt;
            for (var t, n = Rt; n; )
              (t = Ut - n._time) >= 0 && n._call.call(null, t), (n = n._next);
            --Tt;
          })();
        } finally {
          (Tt = 0),
            (function () {
              for (var t, n, e = Rt, r = 1 / 0; e; )
                e._call
                  ? (r > e._time && (r = e._time), (t = e), (e = e._next))
                  : ((n = e._next),
                    (e._next = null),
                    (e = t ? (t._next = n) : (Rt = n)));
              (Pt = t), Jt(r);
            })(),
            (Ut = 0);
        }
      }
      function Yt() {
        var t = Xt.now(),
          n = t - Bt;
        n > 1e3 && ((Dt -= n), (Bt = t));
      }
      function Jt(t) {
        Tt ||
          (qt && (qt = clearTimeout(qt)),
          t - Ut > 24
            ? (t < 1 / 0 && (qt = setTimeout($t, t - Xt.now() - Dt)),
              Lt && (Lt = clearInterval(Lt)))
            : (Lt || ((Bt = Xt.now()), (Lt = setInterval(Yt, 1e3))),
              (Tt = 1),
              zt($t)));
      }
      function Kt(t, n, e) {
        var r = new It();
        return (
          (n = null == n ? 0 : +n),
          r.restart(
            (e) => {
              r.stop(), t(e + n);
            },
            n,
            e
          ),
          r
        );
      }
      It.prototype = Vt.prototype = {
        constructor: It,
        restart: function (t, n, e) {
          if ("function" != typeof t)
            throw new TypeError("callback is not a function");
          (e = (null == e ? Ft() : +e) + (null == n ? 0 : +n)),
            this._next ||
              Pt === this ||
              (Pt ? (Pt._next = this) : (Rt = this), (Pt = this)),
            (this._call = t),
            (this._time = e),
            Jt();
        },
        stop: function () {
          this._call && ((this._call = null), (this._time = 1 / 0), Jt());
        },
      };
      var Gt = Ot("start", "end", "cancel", "interrupt"),
        Wt = [];
      function Zt(t, n, e, r, i, o) {
        var a = t.__transition;
        if (a) {
          if (e in a) return;
        } else t.__transition = {};
        !(function (t, n, e) {
          var r,
            i = t.__transition;
          function o(s) {
            var c, l, f, h;
            if (1 !== e.state) return u();
            for (c in i)
              if ((h = i[c]).name === e.name) {
                if (3 === h.state) return Kt(o);
                4 === h.state
                  ? ((h.state = 6),
                    h.timer.stop(),
                    h.on.call("interrupt", t, t.__data__, h.index, h.group),
                    delete i[c])
                  : +c < n &&
                    ((h.state = 6),
                    h.timer.stop(),
                    h.on.call("cancel", t, t.__data__, h.index, h.group),
                    delete i[c]);
              }
            if (
              (Kt(function () {
                3 === e.state &&
                  ((e.state = 4), e.timer.restart(a, e.delay, e.time), a(s));
              }),
              (e.state = 2),
              e.on.call("start", t, t.__data__, e.index, e.group),
              2 === e.state)
            ) {
              for (
                e.state = 3, r = new Array((f = e.tween.length)), c = 0, l = -1;
                c < f;
                ++c
              )
                (h = e.tween[c].value.call(t, t.__data__, e.index, e.group)) &&
                  (r[++l] = h);
              r.length = l + 1;
            }
          }
          function a(n) {
            for (
              var i =
                  n < e.duration
                    ? e.ease.call(null, n / e.duration)
                    : (e.timer.restart(u), (e.state = 5), 1),
                o = -1,
                a = r.length;
              ++o < a;

            )
              r[o].call(t, i);
            5 === e.state &&
              (e.on.call("end", t, t.__data__, e.index, e.group), u());
          }
          function u() {
            for (var r in ((e.state = 6), e.timer.stop(), delete i[n], i))
              return;
            delete t.__transition;
          }
          (i[n] = e),
            (e.timer = Vt(
              function (t) {
                (e.state = 1),
                  e.timer.restart(o, e.delay, e.time),
                  e.delay <= t && o(t - e.delay);
              },
              0,
              e.time
            ));
        })(t, e, {
          name: n,
          index: r,
          group: i,
          on: Gt,
          tween: Wt,
          time: o.time,
          delay: o.delay,
          duration: o.duration,
          ease: o.ease,
          timer: null,
          state: 0,
        });
      }
      function Qt(t, n) {
        var e = nn(t, n);
        if (e.state > 0) throw new Error("too late; already scheduled");
        return e;
      }
      function tn(t, n) {
        var e = nn(t, n);
        if (e.state > 3) throw new Error("too late; already running");
        return e;
      }
      function nn(t, n) {
        var e = t.__transition;
        if (!e || !(e = e[n])) throw new Error("transition not found");
        return e;
      }
      function en(t, n) {
        return (
          (t = +t),
          (n = +n),
          function (e) {
            return t * (1 - e) + n * e;
          }
        );
      }
      var rn,
        on = 180 / Math.PI,
        an = {
          translateX: 0,
          translateY: 0,
          rotate: 0,
          skewX: 0,
          scaleX: 1,
          scaleY: 1,
        };
      function un(t, n, e, r, i, o) {
        var a, u, s;
        return (
          (a = Math.sqrt(t * t + n * n)) && ((t /= a), (n /= a)),
          (s = t * e + n * r) && ((e -= t * s), (r -= n * s)),
          (u = Math.sqrt(e * e + r * r)) && ((e /= u), (r /= u), (s /= u)),
          t * r < n * e && ((t = -t), (n = -n), (s = -s), (a = -a)),
          {
            translateX: i,
            translateY: o,
            rotate: Math.atan2(n, t) * on,
            skewX: Math.atan(s) * on,
            scaleX: a,
            scaleY: u,
          }
        );
      }
      function sn(t, n, e, r) {
        function i(t) {
          return t.length ? t.pop() + " " : "";
        }
        return function (o, a) {
          var u = [],
            s = [];
          return (
            (o = t(o)),
            (a = t(a)),
            (function (t, r, i, o, a, u) {
              if (t !== i || r !== o) {
                var s = a.push("translate(", null, n, null, e);
                u.push({ i: s - 4, x: en(t, i) }, { i: s - 2, x: en(r, o) });
              } else (i || o) && a.push("translate(" + i + n + o + e);
            })(o.translateX, o.translateY, a.translateX, a.translateY, u, s),
            (function (t, n, e, o) {
              t !== n
                ? (t - n > 180 ? (n += 360) : n - t > 180 && (t += 360),
                  o.push({
                    i: e.push(i(e) + "rotate(", null, r) - 2,
                    x: en(t, n),
                  }))
                : n && e.push(i(e) + "rotate(" + n + r);
            })(o.rotate, a.rotate, u, s),
            (function (t, n, e, o) {
              t !== n
                ? o.push({
                    i: e.push(i(e) + "skewX(", null, r) - 2,
                    x: en(t, n),
                  })
                : n && e.push(i(e) + "skewX(" + n + r);
            })(o.skewX, a.skewX, u, s),
            (function (t, n, e, r, o, a) {
              if (t !== e || n !== r) {
                var u = o.push(i(o) + "scale(", null, ",", null, ")");
                a.push({ i: u - 4, x: en(t, e) }, { i: u - 2, x: en(n, r) });
              } else
                (1 === e && 1 === r) ||
                  o.push(i(o) + "scale(" + e + "," + r + ")");
            })(o.scaleX, o.scaleY, a.scaleX, a.scaleY, u, s),
            (o = a = null),
            function (t) {
              for (var n, e = -1, r = s.length; ++e < r; )
                u[(n = s[e]).i] = n.x(t);
              return u.join("");
            }
          );
        };
      }
      var cn = sn(
          function (t) {
            const n = new ("function" == typeof DOMMatrix
              ? DOMMatrix
              : WebKitCSSMatrix)(t + "");
            return n.isIdentity ? an : un(n.a, n.b, n.c, n.d, n.e, n.f);
          },
          "px, ",
          "px)",
          "deg)"
        ),
        ln = sn(
          function (t) {
            return null == t
              ? an
              : (rn ||
                  (rn = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "g"
                  )),
                rn.setAttribute("transform", t),
                (t = rn.transform.baseVal.consolidate())
                  ? un((t = t.matrix).a, t.b, t.c, t.d, t.e, t.f)
                  : an);
          },
          ", ",
          ")",
          ")"
        );
      function fn(t, n) {
        var e, r;
        return function () {
          var i = tn(this, t),
            o = i.tween;
          if (o !== e)
            for (var a = 0, u = (r = e = o).length; a < u; ++a)
              if (r[a].name === n) {
                (r = r.slice()).splice(a, 1);
                break;
              }
          i.tween = r;
        };
      }
      function hn(t, n, e) {
        var r, i;
        if ("function" != typeof e) throw new Error();
        return function () {
          var o = tn(this, t),
            a = o.tween;
          if (a !== r) {
            i = (r = a).slice();
            for (var u = { name: n, value: e }, s = 0, c = i.length; s < c; ++s)
              if (i[s].name === n) {
                i[s] = u;
                break;
              }
            s === c && i.push(u);
          }
          o.tween = i;
        };
      }
      function pn(t, n, e) {
        var r = t._id;
        return (
          t.each(function () {
            var t = tn(this, r);
            (t.value || (t.value = {}))[n] = e.apply(this, arguments);
          }),
          function (t) {
            return nn(t, r).value[n];
          }
        );
      }
      function dn(t, n, e) {
        (t.prototype = n.prototype = e), (e.constructor = t);
      }
      function mn(t, n) {
        var e = Object.create(t.prototype);
        for (var r in n) e[r] = n[r];
        return e;
      }
      function gn() {}
      var vn = 0.7,
        yn = 1 / vn,
        wn = "\\s*([+-]?\\d+)\\s*",
        _n = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
        xn = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
        bn = /^#([0-9a-f]{3,8})$/,
        Mn = new RegExp("^rgb\\(" + [wn, wn, wn] + "\\)$"),
        kn = new RegExp("^rgb\\(" + [xn, xn, xn] + "\\)$"),
        An = new RegExp("^rgba\\(" + [wn, wn, wn, _n] + "\\)$"),
        Nn = new RegExp("^rgba\\(" + [xn, xn, xn, _n] + "\\)$"),
        En = new RegExp("^hsl\\(" + [_n, xn, xn] + "\\)$"),
        Sn = new RegExp("^hsla\\(" + [_n, xn, xn, _n] + "\\)$"),
        Cn = {
          aliceblue: 15792383,
          antiquewhite: 16444375,
          aqua: 65535,
          aquamarine: 8388564,
          azure: 15794175,
          beige: 16119260,
          bisque: 16770244,
          black: 0,
          blanchedalmond: 16772045,
          blue: 255,
          blueviolet: 9055202,
          brown: 10824234,
          burlywood: 14596231,
          cadetblue: 6266528,
          chartreuse: 8388352,
          chocolate: 13789470,
          coral: 16744272,
          cornflowerblue: 6591981,
          cornsilk: 16775388,
          crimson: 14423100,
          cyan: 65535,
          darkblue: 139,
          darkcyan: 35723,
          darkgoldenrod: 12092939,
          darkgray: 11119017,
          darkgreen: 25600,
          darkgrey: 11119017,
          darkkhaki: 12433259,
          darkmagenta: 9109643,
          darkolivegreen: 5597999,
          darkorange: 16747520,
          darkorchid: 10040012,
          darkred: 9109504,
          darksalmon: 15308410,
          darkseagreen: 9419919,
          darkslateblue: 4734347,
          darkslategray: 3100495,
          darkslategrey: 3100495,
          darkturquoise: 52945,
          darkviolet: 9699539,
          deeppink: 16716947,
          deepskyblue: 49151,
          dimgray: 6908265,
          dimgrey: 6908265,
          dodgerblue: 2003199,
          firebrick: 11674146,
          floralwhite: 16775920,
          forestgreen: 2263842,
          fuchsia: 16711935,
          gainsboro: 14474460,
          ghostwhite: 16316671,
          gold: 16766720,
          goldenrod: 14329120,
          gray: 8421504,
          green: 32768,
          greenyellow: 11403055,
          grey: 8421504,
          honeydew: 15794160,
          hotpink: 16738740,
          indianred: 13458524,
          indigo: 4915330,
          ivory: 16777200,
          khaki: 15787660,
          lavender: 15132410,
          lavenderblush: 16773365,
          lawngreen: 8190976,
          lemonchiffon: 16775885,
          lightblue: 11393254,
          lightcoral: 15761536,
          lightcyan: 14745599,
          lightgoldenrodyellow: 16448210,
          lightgray: 13882323,
          lightgreen: 9498256,
          lightgrey: 13882323,
          lightpink: 16758465,
          lightsalmon: 16752762,
          lightseagreen: 2142890,
          lightskyblue: 8900346,
          lightslategray: 7833753,
          lightslategrey: 7833753,
          lightsteelblue: 11584734,
          lightyellow: 16777184,
          lime: 65280,
          limegreen: 3329330,
          linen: 16445670,
          magenta: 16711935,
          maroon: 8388608,
          mediumaquamarine: 6737322,
          mediumblue: 205,
          mediumorchid: 12211667,
          mediumpurple: 9662683,
          mediumseagreen: 3978097,
          mediumslateblue: 8087790,
          mediumspringgreen: 64154,
          mediumturquoise: 4772300,
          mediumvioletred: 13047173,
          midnightblue: 1644912,
          mintcream: 16121850,
          mistyrose: 16770273,
          moccasin: 16770229,
          navajowhite: 16768685,
          navy: 128,
          oldlace: 16643558,
          olive: 8421376,
          olivedrab: 7048739,
          orange: 16753920,
          orangered: 16729344,
          orchid: 14315734,
          palegoldenrod: 15657130,
          palegreen: 10025880,
          paleturquoise: 11529966,
          palevioletred: 14381203,
          papayawhip: 16773077,
          peachpuff: 16767673,
          peru: 13468991,
          pink: 16761035,
          plum: 14524637,
          powderblue: 11591910,
          purple: 8388736,
          rebeccapurple: 6697881,
          red: 16711680,
          rosybrown: 12357519,
          royalblue: 4286945,
          saddlebrown: 9127187,
          salmon: 16416882,
          sandybrown: 16032864,
          seagreen: 3050327,
          seashell: 16774638,
          sienna: 10506797,
          silver: 12632256,
          skyblue: 8900331,
          slateblue: 6970061,
          slategray: 7372944,
          slategrey: 7372944,
          snow: 16775930,
          springgreen: 65407,
          steelblue: 4620980,
          tan: 13808780,
          teal: 32896,
          thistle: 14204888,
          tomato: 16737095,
          turquoise: 4251856,
          violet: 15631086,
          wheat: 16113331,
          white: 16777215,
          whitesmoke: 16119285,
          yellow: 16776960,
          yellowgreen: 10145074,
        };
      function jn() {
        return this.rgb().formatHex();
      }
      function On() {
        return this.rgb().formatRgb();
      }
      function Rn(t) {
        var n, e;
        return (
          (t = (t + "").trim().toLowerCase()),
          (n = bn.exec(t))
            ? ((e = n[1].length),
              (n = parseInt(n[1], 16)),
              6 === e
                ? Pn(n)
                : 3 === e
                ? new Bn(
                    ((n >> 8) & 15) | ((n >> 4) & 240),
                    ((n >> 4) & 15) | (240 & n),
                    ((15 & n) << 4) | (15 & n),
                    1
                  )
                : 8 === e
                ? Tn(
                    (n >> 24) & 255,
                    (n >> 16) & 255,
                    (n >> 8) & 255,
                    (255 & n) / 255
                  )
                : 4 === e
                ? Tn(
                    ((n >> 12) & 15) | ((n >> 8) & 240),
                    ((n >> 8) & 15) | ((n >> 4) & 240),
                    ((n >> 4) & 15) | (240 & n),
                    (((15 & n) << 4) | (15 & n)) / 255
                  )
                : null)
            : (n = Mn.exec(t))
            ? new Bn(n[1], n[2], n[3], 1)
            : (n = kn.exec(t))
            ? new Bn(
                (255 * n[1]) / 100,
                (255 * n[2]) / 100,
                (255 * n[3]) / 100,
                1
              )
            : (n = An.exec(t))
            ? Tn(n[1], n[2], n[3], n[4])
            : (n = Nn.exec(t))
            ? Tn(
                (255 * n[1]) / 100,
                (255 * n[2]) / 100,
                (255 * n[3]) / 100,
                n[4]
              )
            : (n = En.exec(t))
            ? zn(n[1], n[2] / 100, n[3] / 100, 1)
            : (n = Sn.exec(t))
            ? zn(n[1], n[2] / 100, n[3] / 100, n[4])
            : Cn.hasOwnProperty(t)
            ? Pn(Cn[t])
            : "transparent" === t
            ? new Bn(NaN, NaN, NaN, 0)
            : null
        );
      }
      function Pn(t) {
        return new Bn((t >> 16) & 255, (t >> 8) & 255, 255 & t, 1);
      }
      function Tn(t, n, e, r) {
        return r <= 0 && (t = n = e = NaN), new Bn(t, n, e, r);
      }
      function qn(t) {
        return (
          t instanceof gn || (t = Rn(t)),
          t ? new Bn((t = t.rgb()).r, t.g, t.b, t.opacity) : new Bn()
        );
      }
      function Ln(t, n, e, r) {
        return 1 === arguments.length
          ? qn(t)
          : new Bn(t, n, e, null == r ? 1 : r);
      }
      function Bn(t, n, e, r) {
        (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
      }
      function Un() {
        return "#" + Xn(this.r) + Xn(this.g) + Xn(this.b);
      }
      function Dn() {
        var t = this.opacity;
        return (
          (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t)))
            ? "rgb("
            : "rgba(") +
          Math.max(0, Math.min(255, Math.round(this.r) || 0)) +
          ", " +
          Math.max(0, Math.min(255, Math.round(this.g) || 0)) +
          ", " +
          Math.max(0, Math.min(255, Math.round(this.b) || 0)) +
          (1 === t ? ")" : ", " + t + ")")
        );
      }
      function Xn(t) {
        return (
          ((t = Math.max(0, Math.min(255, Math.round(t) || 0))) < 16
            ? "0"
            : "") + t.toString(16)
        );
      }
      function zn(t, n, e, r) {
        return (
          r <= 0
            ? (t = n = e = NaN)
            : e <= 0 || e >= 1
            ? (t = n = NaN)
            : n <= 0 && (t = NaN),
          new Hn(t, n, e, r)
        );
      }
      function Fn(t) {
        if (t instanceof Hn) return new Hn(t.h, t.s, t.l, t.opacity);
        if ((t instanceof gn || (t = Rn(t)), !t)) return new Hn();
        if (t instanceof Hn) return t;
        var n = (t = t.rgb()).r / 255,
          e = t.g / 255,
          r = t.b / 255,
          i = Math.min(n, e, r),
          o = Math.max(n, e, r),
          a = NaN,
          u = o - i,
          s = (o + i) / 2;
        return (
          u
            ? ((a =
                n === o
                  ? (e - r) / u + 6 * (e < r)
                  : e === o
                  ? (r - n) / u + 2
                  : (n - e) / u + 4),
              (u /= s < 0.5 ? o + i : 2 - o - i),
              (a *= 60))
            : (u = s > 0 && s < 1 ? 0 : a),
          new Hn(a, u, s, t.opacity)
        );
      }
      function Hn(t, n, e, r) {
        (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
      }
      function In(t, n, e) {
        return (
          255 *
          (t < 60
            ? n + ((e - n) * t) / 60
            : t < 180
            ? e
            : t < 240
            ? n + ((e - n) * (240 - t)) / 60
            : n)
        );
      }
      function Vn(t, n, e, r, i) {
        var o = t * t,
          a = o * t;
        return (
          ((1 - 3 * t + 3 * o - a) * n +
            (4 - 6 * o + 3 * a) * e +
            (1 + 3 * t + 3 * o - 3 * a) * r +
            a * i) /
          6
        );
      }
      dn(gn, Rn, {
        copy: function (t) {
          return Object.assign(new this.constructor(), this, t);
        },
        displayable: function () {
          return this.rgb().displayable();
        },
        hex: jn,
        formatHex: jn,
        formatHsl: function () {
          return Fn(this).formatHsl();
        },
        formatRgb: On,
        toString: On,
      }),
        dn(
          Bn,
          Ln,
          mn(gn, {
            brighter: function (t) {
              return (
                (t = null == t ? yn : Math.pow(yn, t)),
                new Bn(this.r * t, this.g * t, this.b * t, this.opacity)
              );
            },
            darker: function (t) {
              return (
                (t = null == t ? vn : Math.pow(vn, t)),
                new Bn(this.r * t, this.g * t, this.b * t, this.opacity)
              );
            },
            rgb: function () {
              return this;
            },
            displayable: function () {
              return (
                -0.5 <= this.r &&
                this.r < 255.5 &&
                -0.5 <= this.g &&
                this.g < 255.5 &&
                -0.5 <= this.b &&
                this.b < 255.5 &&
                0 <= this.opacity &&
                this.opacity <= 1
              );
            },
            hex: Un,
            formatHex: Un,
            formatRgb: Dn,
            toString: Dn,
          })
        ),
        dn(
          Hn,
          function (t, n, e, r) {
            return 1 === arguments.length
              ? Fn(t)
              : new Hn(t, n, e, null == r ? 1 : r);
          },
          mn(gn, {
            brighter: function (t) {
              return (
                (t = null == t ? yn : Math.pow(yn, t)),
                new Hn(this.h, this.s, this.l * t, this.opacity)
              );
            },
            darker: function (t) {
              return (
                (t = null == t ? vn : Math.pow(vn, t)),
                new Hn(this.h, this.s, this.l * t, this.opacity)
              );
            },
            rgb: function () {
              var t = (this.h % 360) + 360 * (this.h < 0),
                n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
                e = this.l,
                r = e + (e < 0.5 ? e : 1 - e) * n,
                i = 2 * e - r;
              return new Bn(
                In(t >= 240 ? t - 240 : t + 120, i, r),
                In(t, i, r),
                In(t < 120 ? t + 240 : t - 120, i, r),
                this.opacity
              );
            },
            displayable: function () {
              return (
                ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
                0 <= this.l &&
                this.l <= 1 &&
                0 <= this.opacity &&
                this.opacity <= 1
              );
            },
            formatHsl: function () {
              var t = this.opacity;
              return (
                (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t)))
                  ? "hsl("
                  : "hsla(") +
                (this.h || 0) +
                ", " +
                100 * (this.s || 0) +
                "%, " +
                100 * (this.l || 0) +
                "%" +
                (1 === t ? ")" : ", " + t + ")")
              );
            },
          })
        );
      const $n = (t) => () => t;
      function Yn(t, n) {
        var e = n - t;
        return e
          ? (function (t, n) {
              return function (e) {
                return t + e * n;
              };
            })(t, e)
          : $n(isNaN(t) ? n : t);
      }
      const Jn = (function t(n) {
        var e = (function (t) {
          return 1 == (t = +t)
            ? Yn
            : function (n, e) {
                return e - n
                  ? (function (t, n, e) {
                      return (
                        (t = Math.pow(t, e)),
                        (n = Math.pow(n, e) - t),
                        (e = 1 / e),
                        function (r) {
                          return Math.pow(t + r * n, e);
                        }
                      );
                    })(n, e, t)
                  : $n(isNaN(n) ? e : n);
              };
        })(n);
        function r(t, n) {
          var r = e((t = Ln(t)).r, (n = Ln(n)).r),
            i = e(t.g, n.g),
            o = e(t.b, n.b),
            a = Yn(t.opacity, n.opacity);
          return function (n) {
            return (
              (t.r = r(n)),
              (t.g = i(n)),
              (t.b = o(n)),
              (t.opacity = a(n)),
              t + ""
            );
          };
        }
        return (r.gamma = t), r;
      })(1);
      function Kn(t) {
        return function (n) {
          var e,
            r,
            i = n.length,
            o = new Array(i),
            a = new Array(i),
            u = new Array(i);
          for (e = 0; e < i; ++e)
            (r = Ln(n[e])),
              (o[e] = r.r || 0),
              (a[e] = r.g || 0),
              (u[e] = r.b || 0);
          return (
            (o = t(o)),
            (a = t(a)),
            (u = t(u)),
            (r.opacity = 1),
            function (t) {
              return (r.r = o(t)), (r.g = a(t)), (r.b = u(t)), r + "";
            }
          );
        };
      }
      Kn(function (t) {
        var n = t.length - 1;
        return function (e) {
          var r =
              e <= 0 ? (e = 0) : e >= 1 ? ((e = 1), n - 1) : Math.floor(e * n),
            i = t[r],
            o = t[r + 1],
            a = r > 0 ? t[r - 1] : 2 * i - o,
            u = r < n - 1 ? t[r + 2] : 2 * o - i;
          return Vn((e - r / n) * n, a, i, o, u);
        };
      }),
        Kn(function (t) {
          var n = t.length;
          return function (e) {
            var r = Math.floor(((e %= 1) < 0 ? ++e : e) * n),
              i = t[(r + n - 1) % n],
              o = t[r % n],
              a = t[(r + 1) % n],
              u = t[(r + 2) % n];
            return Vn((e - r / n) * n, i, o, a, u);
          };
        });
      var Gn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
        Wn = new RegExp(Gn.source, "g");
      function Zn(t, n) {
        var e,
          r,
          i,
          o = (Gn.lastIndex = Wn.lastIndex = 0),
          a = -1,
          u = [],
          s = [];
        for (t += "", n += ""; (e = Gn.exec(t)) && (r = Wn.exec(n)); )
          (i = r.index) > o &&
            ((i = n.slice(o, i)), u[a] ? (u[a] += i) : (u[++a] = i)),
            (e = e[0]) === (r = r[0])
              ? u[a]
                ? (u[a] += r)
                : (u[++a] = r)
              : ((u[++a] = null), s.push({ i: a, x: en(e, r) })),
            (o = Wn.lastIndex);
        return (
          o < n.length && ((i = n.slice(o)), u[a] ? (u[a] += i) : (u[++a] = i)),
          u.length < 2
            ? s[0]
              ? (function (t) {
                  return function (n) {
                    return t(n) + "";
                  };
                })(s[0].x)
              : (function (t) {
                  return function () {
                    return t;
                  };
                })(n)
            : ((n = s.length),
              function (t) {
                for (var e, r = 0; r < n; ++r) u[(e = s[r]).i] = e.x(t);
                return u.join("");
              })
        );
      }
      function Qn(t, n) {
        var e;
        return ("number" == typeof n
          ? en
          : n instanceof Rn
          ? Jn
          : (e = Rn(n))
          ? ((n = e), Jn)
          : Zn)(t, n);
      }
      function te(t) {
        return function () {
          this.removeAttribute(t);
        };
      }
      function ne(t) {
        return function () {
          this.removeAttributeNS(t.space, t.local);
        };
      }
      function ee(t, n, e) {
        var r,
          i,
          o = e + "";
        return function () {
          var a = this.getAttribute(t);
          return a === o ? null : a === r ? i : (i = n((r = a), e));
        };
      }
      function re(t, n, e) {
        var r,
          i,
          o = e + "";
        return function () {
          var a = this.getAttributeNS(t.space, t.local);
          return a === o ? null : a === r ? i : (i = n((r = a), e));
        };
      }
      function ie(t, n, e) {
        var r, i, o;
        return function () {
          var a,
            u,
            s = e(this);
          if (null != s)
            return (a = this.getAttribute(t)) === (u = s + "")
              ? null
              : a === r && u === i
              ? o
              : ((i = u), (o = n((r = a), s)));
          this.removeAttribute(t);
        };
      }
      function oe(t, n, e) {
        var r, i, o;
        return function () {
          var a,
            u,
            s = e(this);
          if (null != s)
            return (a = this.getAttributeNS(t.space, t.local)) === (u = s + "")
              ? null
              : a === r && u === i
              ? o
              : ((i = u), (o = n((r = a), s)));
          this.removeAttributeNS(t.space, t.local);
        };
      }
      function ae(t, n) {
        return function (e) {
          this.setAttribute(t, n.call(this, e));
        };
      }
      function ue(t, n) {
        return function (e) {
          this.setAttributeNS(t.space, t.local, n.call(this, e));
        };
      }
      function se(t, n) {
        var e, r;
        function i() {
          var i = n.apply(this, arguments);
          return i !== r && (e = (r = i) && ue(t, i)), e;
        }
        return (i._value = n), i;
      }
      function ce(t, n) {
        var e, r;
        function i() {
          var i = n.apply(this, arguments);
          return i !== r && (e = (r = i) && ae(t, i)), e;
        }
        return (i._value = n), i;
      }
      function le(t, n) {
        return function () {
          Qt(this, t).delay = +n.apply(this, arguments);
        };
      }
      function fe(t, n) {
        return (
          (n = +n),
          function () {
            Qt(this, t).delay = n;
          }
        );
      }
      function he(t, n) {
        return function () {
          tn(this, t).duration = +n.apply(this, arguments);
        };
      }
      function pe(t, n) {
        return (
          (n = +n),
          function () {
            tn(this, t).duration = n;
          }
        );
      }
      function de(t, n) {
        if ("function" != typeof n) throw new Error();
        return function () {
          tn(this, t).ease = n;
        };
      }
      function me(t, n, e) {
        var r,
          i,
          o = (function (t) {
            return (t + "")
              .trim()
              .split(/^|\s+/)
              .every(function (t) {
                var n = t.indexOf(".");
                return n >= 0 && (t = t.slice(0, n)), !t || "start" === t;
              });
          })(n)
            ? Qt
            : tn;
        return function () {
          var a = o(this, t),
            u = a.on;
          u !== r && (i = (r = u).copy()).on(n, e), (a.on = i);
        };
      }
      var ge = kt.prototype.constructor;
      function ve(t) {
        return function () {
          this.style.removeProperty(t);
        };
      }
      function ye(t, n, e) {
        return function (r) {
          this.style.setProperty(t, n.call(this, r), e);
        };
      }
      function we(t, n, e) {
        var r, i;
        function o() {
          var o = n.apply(this, arguments);
          return o !== i && (r = (i = o) && ye(t, o, e)), r;
        }
        return (o._value = n), o;
      }
      function _e(t) {
        return function (n) {
          this.textContent = t.call(this, n);
        };
      }
      function xe(t) {
        var n, e;
        function r() {
          var r = t.apply(this, arguments);
          return r !== e && (n = (e = r) && _e(r)), n;
        }
        return (r._value = t), r;
      }
      var be = 0;
      function Me(t, n, e, r) {
        (this._groups = t),
          (this._parents = n),
          (this._name = e),
          (this._id = r);
      }
      function ke() {
        return ++be;
      }
      var Ae = kt.prototype;
      Me.prototype = function (t) {
        return kt().transition(t);
      }.prototype = {
        constructor: Me,
        select: function (t) {
          var n = this._name,
            e = this._id;
          "function" != typeof t && (t = h(t));
          for (
            var r = this._groups, i = r.length, o = new Array(i), a = 0;
            a < i;
            ++a
          )
            for (
              var u,
                s,
                c = r[a],
                l = c.length,
                f = (o[a] = new Array(l)),
                p = 0;
              p < l;
              ++p
            )
              (u = c[p]) &&
                (s = t.call(u, u.__data__, p, c)) &&
                ("__data__" in u && (s.__data__ = u.__data__),
                (f[p] = s),
                Zt(f[p], n, e, p, f, nn(u, e)));
          return new Me(o, this._parents, n, e);
        },
        selectAll: function (t) {
          var n = this._name,
            e = this._id;
          "function" != typeof t && (t = m(t));
          for (
            var r = this._groups, i = r.length, o = [], a = [], u = 0;
            u < i;
            ++u
          )
            for (var s, c = r[u], l = c.length, f = 0; f < l; ++f)
              if ((s = c[f])) {
                for (
                  var h,
                    p = t.call(s, s.__data__, f, c),
                    d = nn(s, e),
                    g = 0,
                    v = p.length;
                  g < v;
                  ++g
                )
                  (h = p[g]) && Zt(h, n, e, g, p, d);
                o.push(p), a.push(s);
              }
          return new Me(o, a, n, e);
        },
        filter: function (t) {
          "function" != typeof t && (t = g(t));
          for (
            var n = this._groups, e = n.length, r = new Array(e), i = 0;
            i < e;
            ++i
          )
            for (
              var o, a = n[i], u = a.length, s = (r[i] = []), c = 0;
              c < u;
              ++c
            )
              (o = a[c]) && t.call(o, o.__data__, c, a) && s.push(o);
          return new Me(r, this._parents, this._name, this._id);
        },
        merge: function (t) {
          if (t._id !== this._id) throw new Error();
          for (
            var n = this._groups,
              e = t._groups,
              r = n.length,
              i = e.length,
              o = Math.min(r, i),
              a = new Array(r),
              u = 0;
            u < o;
            ++u
          )
            for (
              var s,
                c = n[u],
                l = e[u],
                f = c.length,
                h = (a[u] = new Array(f)),
                p = 0;
              p < f;
              ++p
            )
              (s = c[p] || l[p]) && (h[p] = s);
          for (; u < r; ++u) a[u] = n[u];
          return new Me(a, this._parents, this._name, this._id);
        },
        selection: function () {
          return new ge(this._groups, this._parents);
        },
        transition: function () {
          for (
            var t = this._name,
              n = this._id,
              e = ke(),
              r = this._groups,
              i = r.length,
              o = 0;
            o < i;
            ++o
          )
            for (var a, u = r[o], s = u.length, c = 0; c < s; ++c)
              if ((a = u[c])) {
                var l = nn(a, n);
                Zt(a, t, e, c, u, {
                  time: l.time + l.delay + l.duration,
                  delay: 0,
                  duration: l.duration,
                  ease: l.ease,
                });
              }
          return new Me(r, this._parents, t, e);
        },
        call: Ae.call,
        nodes: Ae.nodes,
        node: Ae.node,
        size: Ae.size,
        empty: Ae.empty,
        each: Ae.each,
        on: function (t, n) {
          var e = this._id;
          return arguments.length < 2
            ? nn(this.node(), e).on.on(t)
            : this.each(me(e, t, n));
        },
        attr: function (t, n) {
          var e = O(t),
            r = "transform" === e ? ln : Qn;
          return this.attrTween(
            t,
            "function" == typeof n
              ? (e.local ? oe : ie)(e, r, pn(this, "attr." + t, n))
              : null == n
              ? (e.local ? ne : te)(e)
              : (e.local ? re : ee)(e, r, n)
          );
        },
        attrTween: function (t, n) {
          var e = "attr." + t;
          if (arguments.length < 2) return (e = this.tween(e)) && e._value;
          if (null == n) return this.tween(e, null);
          if ("function" != typeof n) throw new Error();
          var r = O(t);
          return this.tween(e, (r.local ? se : ce)(r, n));
        },
        style: function (t, n, e) {
          var r = "transform" == (t += "") ? cn : Qn;
          return null == n
            ? this.styleTween(
                t,
                (function (t, n) {
                  var e, r, i;
                  return function () {
                    var o = F(this, t),
                      a = (this.style.removeProperty(t), F(this, t));
                    return o === a
                      ? null
                      : o === e && a === r
                      ? i
                      : (i = n((e = o), (r = a)));
                  };
                })(t, r)
              ).on("end.style." + t, ve(t))
            : "function" == typeof n
            ? this.styleTween(
                t,
                (function (t, n, e) {
                  var r, i, o;
                  return function () {
                    var a = F(this, t),
                      u = e(this),
                      s = u + "";
                    return (
                      null == u &&
                        (this.style.removeProperty(t), (s = u = F(this, t))),
                      a === s
                        ? null
                        : a === r && s === i
                        ? o
                        : ((i = s), (o = n((r = a), u)))
                    );
                  };
                })(t, r, pn(this, "style." + t, n))
              ).each(
                (function (t, n) {
                  var e,
                    r,
                    i,
                    o,
                    a = "style." + n,
                    u = "end." + a;
                  return function () {
                    var s = tn(this, t),
                      c = s.on,
                      l = null == s.value[a] ? o || (o = ve(n)) : void 0;
                    (c === e && i === l) || (r = (e = c).copy()).on(u, (i = l)),
                      (s.on = r);
                  };
                })(this._id, t)
              )
            : this.styleTween(
                t,
                (function (t, n, e) {
                  var r,
                    i,
                    o = e + "";
                  return function () {
                    var a = F(this, t);
                    return a === o ? null : a === r ? i : (i = n((r = a), e));
                  };
                })(t, r, n),
                e
              ).on("end.style." + t, null);
        },
        styleTween: function (t, n, e) {
          var r = "style." + (t += "");
          if (arguments.length < 2) return (r = this.tween(r)) && r._value;
          if (null == n) return this.tween(r, null);
          if ("function" != typeof n) throw new Error();
          return this.tween(r, we(t, n, null == e ? "" : e));
        },
        text: function (t) {
          return this.tween(
            "text",
            "function" == typeof t
              ? (function (t) {
                  return function () {
                    var n = t(this);
                    this.textContent = null == n ? "" : n;
                  };
                })(pn(this, "text", t))
              : (function (t) {
                  return function () {
                    this.textContent = t;
                  };
                })(null == t ? "" : t + "")
          );
        },
        textTween: function (t) {
          var n = "text";
          if (arguments.length < 1) return (n = this.tween(n)) && n._value;
          if (null == t) return this.tween(n, null);
          if ("function" != typeof t) throw new Error();
          return this.tween(n, xe(t));
        },
        remove: function () {
          return this.on(
            "end.remove",
            (function (t) {
              return function () {
                var n = this.parentNode;
                for (var e in this.__transition) if (+e !== t) return;
                n && n.removeChild(this);
              };
            })(this._id)
          );
        },
        tween: function (t, n) {
          var e = this._id;
          if (((t += ""), arguments.length < 2)) {
            for (
              var r, i = nn(this.node(), e).tween, o = 0, a = i.length;
              o < a;
              ++o
            )
              if ((r = i[o]).name === t) return r.value;
            return null;
          }
          return this.each((null == n ? fn : hn)(e, t, n));
        },
        delay: function (t) {
          var n = this._id;
          return arguments.length
            ? this.each(("function" == typeof t ? le : fe)(n, t))
            : nn(this.node(), n).delay;
        },
        duration: function (t) {
          var n = this._id;
          return arguments.length
            ? this.each(("function" == typeof t ? he : pe)(n, t))
            : nn(this.node(), n).duration;
        },
        ease: function (t) {
          var n = this._id;
          return arguments.length
            ? this.each(de(n, t))
            : nn(this.node(), n).ease;
        },
        easeVarying: function (t) {
          if ("function" != typeof t) throw new Error();
          return this.each(
            (function (t, n) {
              return function () {
                var e = n.apply(this, arguments);
                if ("function" != typeof e) throw new Error();
                tn(this, t).ease = e;
              };
            })(this._id, t)
          );
        },
        end: function () {
          var t,
            n,
            e = this,
            r = e._id,
            i = e.size();
          return new Promise(function (o, a) {
            var u = { value: a },
              s = {
                value: function () {
                  0 == --i && o();
                },
              };
            e.each(function () {
              var e = tn(this, r),
                i = e.on;
              i !== t &&
                ((n = (t = i).copy())._.cancel.push(u),
                n._.interrupt.push(u),
                n._.end.push(s)),
                (e.on = n);
            }),
              0 === i && o();
          });
        },
        [Symbol.iterator]: Ae[Symbol.iterator],
      };
      var Ne = {
        time: null,
        delay: 0,
        duration: 250,
        ease: function (t) {
          return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
        },
      };
      function Ee(t, n) {
        for (var e; !(e = t.__transition) || !(e = e[n]); )
          if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
        return e;
      }
      (kt.prototype.interrupt = function (t) {
        return this.each(function () {
          !(function (t, n) {
            var e,
              r,
              i,
              o = t.__transition,
              a = !0;
            if (o) {
              for (i in ((n = null == n ? null : n + ""), o))
                (e = o[i]).name === n
                  ? ((r = e.state > 2 && e.state < 5),
                    (e.state = 6),
                    e.timer.stop(),
                    e.on.call(
                      r ? "interrupt" : "cancel",
                      t,
                      t.__data__,
                      e.index,
                      e.group
                    ),
                    delete o[i])
                  : (a = !1);
              a && delete t.__transition;
            }
          })(this, t);
        });
      }),
        (kt.prototype.transition = function (t) {
          var n, e;
          t instanceof Me
            ? ((n = t._id), (t = t._name))
            : ((n = ke()),
              ((e = Ne).time = Ft()),
              (t = null == t ? null : t + ""));
          for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
            for (var a, u = r[o], s = u.length, c = 0; c < s; ++c)
              (a = u[c]) && Zt(a, t, n, c, u, e || Ee(a, n));
          return new Me(r, this._parents, t, n);
        });
      const { abs: Se, max: Ce, min: je } = Math;
      function Oe(t) {
        return { type: t };
      }
      ["w", "e"].map(Oe),
        ["n", "s"].map(Oe),
        ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(Oe);
      var Re = Math.sqrt(50),
        Pe = Math.sqrt(10),
        Te = Math.sqrt(2);
      function qe(t, n, e) {
        var r = (n - t) / Math.max(0, e),
          i = Math.floor(Math.log(r) / Math.LN10),
          o = r / Math.pow(10, i);
        return i >= 0
          ? (o >= Re ? 10 : o >= Pe ? 5 : o >= Te ? 2 : 1) * Math.pow(10, i)
          : -Math.pow(10, -i) / (o >= Re ? 10 : o >= Pe ? 5 : o >= Te ? 2 : 1);
      }
      function Le(t, n) {
        return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
      }
      function Be(t) {
        let n = t,
          e = t;
        function r(t, n, r, i) {
          for (null == r && (r = 0), null == i && (i = t.length); r < i; ) {
            const o = (r + i) >>> 1;
            e(t[o], n) < 0 ? (r = o + 1) : (i = o);
          }
          return r;
        }
        return (
          1 === t.length &&
            ((n = (n, e) => t(n) - e),
            (e = (function (t) {
              return (n, e) => Le(t(n), e);
            })(t))),
          {
            left: r,
            center: function (t, e, i, o) {
              null == i && (i = 0), null == o && (o = t.length);
              const a = r(t, e, i, o - 1);
              return a > i && n(t[a - 1], e) > -n(t[a], e) ? a - 1 : a;
            },
            right: function (t, n, r, i) {
              for (null == r && (r = 0), null == i && (i = t.length); r < i; ) {
                const o = (r + i) >>> 1;
                e(t[o], n) > 0 ? (i = o) : (r = o + 1);
              }
              return r;
            },
          }
        );
      }
      const Ue = Be(Le),
        De = Ue.right,
        Xe =
          (Ue.left,
          Be(function (t) {
            return null === t ? NaN : +t;
          }).center,
          De);
      function ze(t, n) {
        var e,
          r = n ? n.length : 0,
          i = t ? Math.min(r, t.length) : 0,
          o = new Array(i),
          a = new Array(r);
        for (e = 0; e < i; ++e) o[e] = Ve(t[e], n[e]);
        for (; e < r; ++e) a[e] = n[e];
        return function (t) {
          for (e = 0; e < i; ++e) a[e] = o[e](t);
          return a;
        };
      }
      function Fe(t, n) {
        var e = new Date();
        return (
          (t = +t),
          (n = +n),
          function (r) {
            return e.setTime(t * (1 - r) + n * r), e;
          }
        );
      }
      function He(t, n) {
        var e,
          r = {},
          i = {};
        for (e in ((null !== t && "object" == typeof t) || (t = {}),
        (null !== n && "object" == typeof n) || (n = {}),
        n))
          e in t ? (r[e] = Ve(t[e], n[e])) : (i[e] = n[e]);
        return function (t) {
          for (e in r) i[e] = r[e](t);
          return i;
        };
      }
      function Ie(t, n) {
        n || (n = []);
        var e,
          r = t ? Math.min(n.length, t.length) : 0,
          i = n.slice();
        return function (o) {
          for (e = 0; e < r; ++e) i[e] = t[e] * (1 - o) + n[e] * o;
          return i;
        };
      }
      function Ve(t, n) {
        var e,
          r,
          i = typeof n;
        return null == n || "boolean" === i
          ? $n(n)
          : ("number" === i
              ? en
              : "string" === i
              ? (e = Rn(n))
                ? ((n = e), Jn)
                : Zn
              : n instanceof Rn
              ? Jn
              : n instanceof Date
              ? Fe
              : ((r = n),
                !ArrayBuffer.isView(r) || r instanceof DataView
                  ? Array.isArray(n)
                    ? ze
                    : ("function" != typeof n.valueOf &&
                        "function" != typeof n.toString) ||
                      isNaN(n)
                    ? He
                    : en
                  : Ie))(t, n);
      }
      function $e(t, n) {
        return (
          (t = +t),
          (n = +n),
          function (e) {
            return Math.round(t * (1 - e) + n * e);
          }
        );
      }
      function Ye(t) {
        return +t;
      }
      var Je = [0, 1];
      function Ke(t) {
        return t;
      }
      function Ge(t, n) {
        return (n -= t = +t)
          ? function (e) {
              return (e - t) / n;
            }
          : ((e = isNaN(n) ? NaN : 0.5),
            function () {
              return e;
            });
        var e;
      }
      function We(t, n, e) {
        var r = t[0],
          i = t[1],
          o = n[0],
          a = n[1];
        return (
          i < r
            ? ((r = Ge(i, r)), (o = e(a, o)))
            : ((r = Ge(r, i)), (o = e(o, a))),
          function (t) {
            return o(r(t));
          }
        );
      }
      function Ze(t, n, e) {
        var r = Math.min(t.length, n.length) - 1,
          i = new Array(r),
          o = new Array(r),
          a = -1;
        for (
          t[r] < t[0] && ((t = t.slice().reverse()), (n = n.slice().reverse()));
          ++a < r;

        )
          (i[a] = Ge(t[a], t[a + 1])), (o[a] = e(n[a], n[a + 1]));
        return function (n) {
          var e = Xe(t, n, 1, r) - 1;
          return o[e](i[e](n));
        };
      }
      function Qe(t, n) {
        return n
          .domain(t.domain())
          .range(t.range())
          .interpolate(t.interpolate())
          .clamp(t.clamp())
          .unknown(t.unknown());
      }
      function tr() {
        return (function () {
          var t,
            n,
            e,
            r,
            i,
            o,
            a = Je,
            u = Je,
            s = Ve,
            c = Ke;
          function l() {
            var t,
              n,
              e,
              s = Math.min(a.length, u.length);
            return (
              c !== Ke &&
                ((t = a[0]),
                (n = a[s - 1]),
                t > n && ((e = t), (t = n), (n = e)),
                (c = function (e) {
                  return Math.max(t, Math.min(n, e));
                })),
              (r = s > 2 ? Ze : We),
              (i = o = null),
              f
            );
          }
          function f(n) {
            return isNaN((n = +n))
              ? e
              : (i || (i = r(a.map(t), u, s)))(t(c(n)));
          }
          return (
            (f.invert = function (e) {
              return c(n((o || (o = r(u, a.map(t), en)))(e)));
            }),
            (f.domain = function (t) {
              return arguments.length
                ? ((a = Array.from(t, Ye)), l())
                : a.slice();
            }),
            (f.range = function (t) {
              return arguments.length ? ((u = Array.from(t)), l()) : u.slice();
            }),
            (f.rangeRound = function (t) {
              return (u = Array.from(t)), (s = $e), l();
            }),
            (f.clamp = function (t) {
              return arguments.length ? ((c = !!t || Ke), l()) : c !== Ke;
            }),
            (f.interpolate = function (t) {
              return arguments.length ? ((s = t), l()) : s;
            }),
            (f.unknown = function (t) {
              return arguments.length ? ((e = t), f) : e;
            }),
            function (e, r) {
              return (t = e), (n = r), l();
            }
          );
        })()(Ke, Ke);
      }
      function nr(t, n) {
        switch (arguments.length) {
          case 0:
            break;
          case 1:
            this.range(t);
            break;
          default:
            this.range(n).domain(t);
        }
        return this;
      }
      var er,
        rr = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
      function ir(t) {
        if (!(n = rr.exec(t))) throw new Error("invalid format: " + t);
        var n;
        return new or({
          fill: n[1],
          align: n[2],
          sign: n[3],
          symbol: n[4],
          zero: n[5],
          width: n[6],
          comma: n[7],
          precision: n[8] && n[8].slice(1),
          trim: n[9],
          type: n[10],
        });
      }
      function or(t) {
        (this.fill = void 0 === t.fill ? " " : t.fill + ""),
          (this.align = void 0 === t.align ? ">" : t.align + ""),
          (this.sign = void 0 === t.sign ? "-" : t.sign + ""),
          (this.symbol = void 0 === t.symbol ? "" : t.symbol + ""),
          (this.zero = !!t.zero),
          (this.width = void 0 === t.width ? void 0 : +t.width),
          (this.comma = !!t.comma),
          (this.precision = void 0 === t.precision ? void 0 : +t.precision),
          (this.trim = !!t.trim),
          (this.type = void 0 === t.type ? "" : t.type + "");
      }
      function ar(t, n) {
        if (
          (e = (t = n ? t.toExponential(n - 1) : t.toExponential()).indexOf(
            "e"
          )) < 0
        )
          return null;
        var e,
          r = t.slice(0, e);
        return [r.length > 1 ? r[0] + r.slice(2) : r, +t.slice(e + 1)];
      }
      function ur(t) {
        return (t = ar(Math.abs(t))) ? t[1] : NaN;
      }
      function sr(t, n) {
        var e = ar(t, n);
        if (!e) return t + "";
        var r = e[0],
          i = e[1];
        return i < 0
          ? "0." + new Array(-i).join("0") + r
          : r.length > i + 1
          ? r.slice(0, i + 1) + "." + r.slice(i + 1)
          : r + new Array(i - r.length + 2).join("0");
      }
      (ir.prototype = or.prototype),
        (or.prototype.toString = function () {
          return (
            this.fill +
            this.align +
            this.sign +
            this.symbol +
            (this.zero ? "0" : "") +
            (void 0 === this.width ? "" : Math.max(1, 0 | this.width)) +
            (this.comma ? "," : "") +
            (void 0 === this.precision
              ? ""
              : "." + Math.max(0, 0 | this.precision)) +
            (this.trim ? "~" : "") +
            this.type
          );
        });
      const cr = {
        "%": (t, n) => (100 * t).toFixed(n),
        b: (t) => Math.round(t).toString(2),
        c: (t) => t + "",
        d: function (t) {
          return Math.abs((t = Math.round(t))) >= 1e21
            ? t.toLocaleString("en").replace(/,/g, "")
            : t.toString(10);
        },
        e: (t, n) => t.toExponential(n),
        f: (t, n) => t.toFixed(n),
        g: (t, n) => t.toPrecision(n),
        o: (t) => Math.round(t).toString(8),
        p: (t, n) => sr(100 * t, n),
        r: sr,
        s: function (t, n) {
          var e = ar(t, n);
          if (!e) return t + "";
          var r = e[0],
            i = e[1],
            o = i - (er = 3 * Math.max(-8, Math.min(8, Math.floor(i / 3)))) + 1,
            a = r.length;
          return o === a
            ? r
            : o > a
            ? r + new Array(o - a + 1).join("0")
            : o > 0
            ? r.slice(0, o) + "." + r.slice(o)
            : "0." +
              new Array(1 - o).join("0") +
              ar(t, Math.max(0, n + o - 1))[0];
        },
        X: (t) => Math.round(t).toString(16).toUpperCase(),
        x: (t) => Math.round(t).toString(16),
      };
      function lr(t) {
        return t;
      }
      var fr,
        hr,
        pr,
        dr = Array.prototype.map,
        mr = [
          "y",
          "z",
          "a",
          "f",
          "p",
          "n",
          "µ",
          "m",
          "",
          "k",
          "M",
          "G",
          "T",
          "P",
          "E",
          "Z",
          "Y",
        ];
      function gr(t) {
        var n = t.domain;
        return (
          (t.ticks = function (t) {
            var e = n();
            return (function (t, n, e) {
              var r,
                i,
                o,
                a,
                u = -1;
              if (((e = +e), (t = +t) == (n = +n) && e > 0)) return [t];
              if (
                ((r = n < t) && ((i = t), (t = n), (n = i)),
                0 === (a = qe(t, n, e)) || !isFinite(a))
              )
                return [];
              if (a > 0)
                for (
                  t = Math.ceil(t / a),
                    n = Math.floor(n / a),
                    o = new Array((i = Math.ceil(n - t + 1)));
                  ++u < i;

                )
                  o[u] = (t + u) * a;
              else
                for (
                  a = -a,
                    t = Math.ceil(t * a),
                    n = Math.floor(n * a),
                    o = new Array((i = Math.ceil(n - t + 1)));
                  ++u < i;

                )
                  o[u] = (t + u) / a;
              return r && o.reverse(), o;
            })(e[0], e[e.length - 1], null == t ? 10 : t);
          }),
          (t.tickFormat = function (t, e) {
            var r = n();
            return (function (t, n, e, r) {
              var i,
                o = (function (t, n, e) {
                  var r = Math.abs(n - t) / Math.max(0, e),
                    i = Math.pow(10, Math.floor(Math.log(r) / Math.LN10)),
                    o = r / i;
                  return (
                    o >= Re
                      ? (i *= 10)
                      : o >= Pe
                      ? (i *= 5)
                      : o >= Te && (i *= 2),
                    n < t ? -i : i
                  );
                })(t, n, e);
              switch ((r = ir(null == r ? ",f" : r)).type) {
                case "s":
                  var a = Math.max(Math.abs(t), Math.abs(n));
                  return (
                    null != r.precision ||
                      isNaN(
                        (i = (function (t, n) {
                          return Math.max(
                            0,
                            3 *
                              Math.max(-8, Math.min(8, Math.floor(ur(n) / 3))) -
                              ur(Math.abs(t))
                          );
                        })(o, a))
                      ) ||
                      (r.precision = i),
                    pr(r, a)
                  );
                case "":
                case "e":
                case "g":
                case "p":
                case "r":
                  null != r.precision ||
                    isNaN(
                      (i = (function (t, n) {
                        return (
                          (t = Math.abs(t)),
                          (n = Math.abs(n) - t),
                          Math.max(0, ur(n) - ur(t)) + 1
                        );
                      })(o, Math.max(Math.abs(t), Math.abs(n))))
                    ) ||
                    (r.precision = i - ("e" === r.type));
                  break;
                case "f":
                case "%":
                  null != r.precision ||
                    isNaN(
                      (i = (function (t) {
                        return Math.max(0, -ur(Math.abs(t)));
                      })(o))
                    ) ||
                    (r.precision = i - 2 * ("%" === r.type));
              }
              return hr(r);
            })(r[0], r[r.length - 1], null == t ? 10 : t, e);
          }),
          (t.nice = function (e) {
            null == e && (e = 10);
            var r,
              i,
              o = n(),
              a = 0,
              u = o.length - 1,
              s = o[a],
              c = o[u],
              l = 10;
            for (
              c < s && ((i = s), (s = c), (c = i), (i = a), (a = u), (u = i));
              l-- > 0;

            ) {
              if ((i = qe(s, c, e)) === r) return (o[a] = s), (o[u] = c), n(o);
              if (i > 0)
                (s = Math.floor(s / i) * i), (c = Math.ceil(c / i) * i);
              else {
                if (!(i < 0)) break;
                (s = Math.ceil(s * i) / i), (c = Math.floor(c * i) / i);
              }
              r = i;
            }
            return t;
          }),
          t
        );
      }
      function vr() {
        var t = tr();
        return (
          (t.copy = function () {
            return Qe(t, vr());
          }),
          nr.apply(t, arguments),
          gr(t)
        );
      }
      (fr = (function (t) {
        var n,
          e,
          r =
            void 0 === t.grouping || void 0 === t.thousands
              ? lr
              : ((n = dr.call(t.grouping, Number)),
                (e = t.thousands + ""),
                function (t, r) {
                  for (
                    var i = t.length, o = [], a = 0, u = n[0], s = 0;
                    i > 0 &&
                    u > 0 &&
                    (s + u + 1 > r && (u = Math.max(1, r - s)),
                    o.push(t.substring((i -= u), i + u)),
                    !((s += u + 1) > r));

                  )
                    u = n[(a = (a + 1) % n.length)];
                  return o.reverse().join(e);
                }),
          i = void 0 === t.currency ? "" : t.currency[0] + "",
          o = void 0 === t.currency ? "" : t.currency[1] + "",
          a = void 0 === t.decimal ? "." : t.decimal + "",
          u =
            void 0 === t.numerals
              ? lr
              : (function (t) {
                  return function (n) {
                    return n.replace(/[0-9]/g, function (n) {
                      return t[+n];
                    });
                  };
                })(dr.call(t.numerals, String)),
          s = void 0 === t.percent ? "%" : t.percent + "",
          c = void 0 === t.minus ? "−" : t.minus + "",
          l = void 0 === t.nan ? "NaN" : t.nan + "";
        function f(t) {
          var n = (t = ir(t)).fill,
            e = t.align,
            f = t.sign,
            h = t.symbol,
            p = t.zero,
            d = t.width,
            m = t.comma,
            g = t.precision,
            v = t.trim,
            y = t.type;
          "n" === y
            ? ((m = !0), (y = "g"))
            : cr[y] || (void 0 === g && (g = 12), (v = !0), (y = "g")),
            (p || ("0" === n && "=" === e)) && ((p = !0), (n = "0"), (e = "="));
          var w =
              "$" === h
                ? i
                : "#" === h && /[boxX]/.test(y)
                ? "0" + y.toLowerCase()
                : "",
            _ = "$" === h ? o : /[%p]/.test(y) ? s : "",
            x = cr[y],
            b = /[defgprs%]/.test(y);
          function M(t) {
            var i,
              o,
              s,
              h = w,
              M = _;
            if ("c" === y) (M = x(t) + M), (t = "");
            else {
              var k = (t = +t) < 0 || 1 / t < 0;
              if (
                ((t = isNaN(t) ? l : x(Math.abs(t), g)),
                v &&
                  (t = (function (t) {
                    t: for (var n, e = t.length, r = 1, i = -1; r < e; ++r)
                      switch (t[r]) {
                        case ".":
                          i = n = r;
                          break;
                        case "0":
                          0 === i && (i = r), (n = r);
                          break;
                        default:
                          if (!+t[r]) break t;
                          i > 0 && (i = 0);
                      }
                    return i > 0 ? t.slice(0, i) + t.slice(n + 1) : t;
                  })(t)),
                k && 0 == +t && "+" !== f && (k = !1),
                (h =
                  (k ? ("(" === f ? f : c) : "-" === f || "(" === f ? "" : f) +
                  h),
                (M =
                  ("s" === y ? mr[8 + er / 3] : "") +
                  M +
                  (k && "(" === f ? ")" : "")),
                b)
              )
                for (i = -1, o = t.length; ++i < o; )
                  if (48 > (s = t.charCodeAt(i)) || s > 57) {
                    (M = (46 === s ? a + t.slice(i + 1) : t.slice(i)) + M),
                      (t = t.slice(0, i));
                    break;
                  }
            }
            m && !p && (t = r(t, 1 / 0));
            var A = h.length + t.length + M.length,
              N = A < d ? new Array(d - A + 1).join(n) : "";
            switch (
              (m &&
                p &&
                ((t = r(N + t, N.length ? d - M.length : 1 / 0)), (N = "")),
              e)
            ) {
              case "<":
                t = h + t + M + N;
                break;
              case "=":
                t = h + N + t + M;
                break;
              case "^":
                t = N.slice(0, (A = N.length >> 1)) + h + t + M + N.slice(A);
                break;
              default:
                t = N + h + t + M;
            }
            return u(t);
          }
          return (
            (g =
              void 0 === g
                ? 6
                : /[gprs]/.test(y)
                ? Math.max(1, Math.min(21, g))
                : Math.max(0, Math.min(20, g))),
            (M.toString = function () {
              return t + "";
            }),
            M
          );
        }
        return {
          format: f,
          formatPrefix: function (t, n) {
            var e = f((((t = ir(t)).type = "f"), t)),
              r = 3 * Math.max(-8, Math.min(8, Math.floor(ur(n) / 3))),
              i = Math.pow(10, -r),
              o = mr[8 + r / 3];
            return function (t) {
              return e(i * t) + o;
            };
          },
        };
      })({ thousands: ",", grouping: [3], currency: ["$", ""] })),
        (hr = fr.format),
        (pr = fr.formatPrefix);
      const yr = Symbol("implicit");
      function wr(t, n, e) {
        (this.k = t), (this.x = n), (this.y = e);
      }
      (wr.prototype = {
        constructor: wr,
        scale: function (t) {
          return 1 === t ? this : new wr(this.k * t, this.x, this.y);
        },
        translate: function (t, n) {
          return (0 === t) & (0 === n)
            ? this
            : new wr(this.k, this.x + this.k * t, this.y + this.k * n);
        },
        apply: function (t) {
          return [t[0] * this.k + this.x, t[1] * this.k + this.y];
        },
        applyX: function (t) {
          return t * this.k + this.x;
        },
        applyY: function (t) {
          return t * this.k + this.y;
        },
        invert: function (t) {
          return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
        },
        invertX: function (t) {
          return (t - this.x) / this.k;
        },
        invertY: function (t) {
          return (t - this.y) / this.k;
        },
        rescaleX: function (t) {
          return t
            .copy()
            .domain(t.range().map(this.invertX, this).map(t.invert, t));
        },
        rescaleY: function (t) {
          return t
            .copy()
            .domain(t.range().map(this.invertY, this).map(t.invert, t));
        },
        toString: function () {
          return (
            "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")"
          );
        },
      }),
        new wr(1, 0, 0),
        wr.prototype;
      var _r = e(669),
        xr = e.n(_r);
      const br = (function (t) {
        return new bt(
          [[document.querySelector(t)]],
          [document.documentElement]
        );
      })("body")
        .append("svg")
        .attr("width", 800)
        .attr("height", 600)
        .append("g")
        .attr("transform", "translate(30, 20)");
      xr()
        .get(
          "http://bugenhagen.herokuapp.com/?start=12-30-2020&end=1-30-2021",
          { crossdomain: !0 }
        )
        .then((t) => console.log(t));
      const Mr = [
          { name: "Steve", age: 10, weight: 30, gender: "male" },
          { name: "Stan", age: 15, weight: 60, gender: "male" },
          { name: "Tom", age: 18, weight: 70, gender: "male" },
          { name: "Marie", age: 18, weight: 58, gender: "female" },
        ],
        kr = (function t() {
          var n = new Map(),
            e = [],
            r = [],
            i = yr;
          function o(t) {
            var o = t + "",
              a = n.get(o);
            if (!a) {
              if (i !== yr) return i;
              n.set(o, (a = e.push(t)));
            }
            return r[(a - 1) % r.length];
          }
          return (
            (o.domain = function (t) {
              if (!arguments.length) return e.slice();
              (e = []), (n = new Map());
              for (const r of t) {
                const t = r + "";
                n.has(t) || n.set(t, e.push(r));
              }
              return o;
            }),
            (o.range = function (t) {
              return arguments.length ? ((r = Array.from(t)), o) : r.slice();
            }),
            (o.unknown = function (t) {
              return arguments.length ? ((i = t), o) : i;
            }),
            (o.copy = function () {
              return t(e, r).unknown(i);
            }),
            nr.apply(o, arguments),
            o
          );
        })()
          .domain(["female", "male"])
          .range(["red", "blue"]),
        Ar = vr()
          .domain([0, t(Mr, (t) => t.age)])
          .range([0, 750]),
        Nr = vr()
          .domain([0, t(Mr, (t) => t.weight)])
          .range([540, 0]),
        Er = l(3, Ar),
        Sr = l(4, Nr);
      br
        .append("g")
        .classed("x.axis", !0)
        .attr("transform", "translate(0,540)")
        .call(Er),
        br.append("g").classed("y.axis", !0).call(Sr);
      const Cr = br
        .append("g")
        .selectAll("circle")
        .data(Mr)
        .join(
          (t) => {
            const n = t.append("circle");
            return n.attr("r", 5).append("title"), n;
          },
          (t) => t,
          (t) => t.remove()
        );
      Cr.style("fill", (t) => kr(t.gender))
        .attr("cx", (t) => Ar(t.age))
        .attr("cy", (t) => Nr(t.weight)),
        Cr.select("title").text((t) => t.name);
    })();
})();
