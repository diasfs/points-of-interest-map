var _r = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Pi(y) {
  return y && y.__esModule && Object.prototype.hasOwnProperty.call(y, "default") ? y.default : y;
}
var wi = "0123456789bcdefghjkmnpqrstuvwxyz", Nn = {};
for (var Ze = 0; Ze < wi.length; Ze++)
  Nn[wi.charAt(Ze)] = Ze;
var Rn = "auto", jt = -90, Vt = 90, qt = -180, kt = 180, mr = [0, 5, 7, 8, 11, 12, 13, 15, 16, 17, 18], fe = function(y, w, h) {
  if (h === Rn) {
    if (typeof y == "number" || typeof w == "number")
      throw new Error("string notation required for auto precision.");
    var p = y.split(".")[1].length, l = w.split(".")[1].length, d = Math.max(p, l);
    h = mr[d];
  } else
    h === void 0 && (h = 9);
  for (var c = [], v = 0, _ = 0, b = 0, z = Vt, T = jt, R = kt, tt = qt, H; c.length < h; )
    if (_ % 2 === 0 ? (H = (R + tt) / 2, w > H ? (b = (b << 1) + 1, tt = H) : (b = (b << 1) + 0, R = H)) : (H = (z + T) / 2, y > H ? (b = (b << 1) + 1, T = H) : (b = (b << 1) + 0, z = H)), v++, _++, v === 5) {
      var E = wi[b];
      c.push(E), v = 0, b = 0;
    }
  return c.join("");
}, Kt = function(y, w, h) {
  h = h || 52;
  for (var p = 0, l = Vt, d = jt, c = kt, v = qt, _, b = 0; p < h; )
    b *= 2, p % 2 === 0 ? (_ = (c + v) / 2, w > _ ? (b += 1, v = _) : c = _) : (_ = (l + d) / 2, y > _ ? (b += 1, d = _) : l = _), p++;
  return b;
}, Ie = function(y) {
  for (var w = !0, h = Vt, p = jt, l = kt, d = qt, c, v = 0, _ = 0, b = y.length; _ < b; _++) {
    var z = y[_].toLowerCase();
    v = Nn[z];
    for (var T = 4; T >= 0; T--) {
      var R = v >> T & 1;
      w ? (c = (l + d) / 2, R === 1 ? d = c : l = c) : (c = (h + p) / 2, R === 1 ? p = c : h = c), w = !w;
    }
  }
  return [p, d, h, l];
}, de = function(y, w) {
  w = w || 52;
  for (var h = Vt, p = jt, l = kt, d = qt, c = 0, v = 0, _ = w / 2, b = 0; b < _; b++)
    v = In(y, (_ - b) * 2 - 1), c = In(y, (_ - b) * 2 - 2), c === 0 ? h = (h + p) / 2 : p = (h + p) / 2, v === 0 ? l = (l + d) / 2 : d = (l + d) / 2;
  return [p, d, h, l];
};
function In(y, w) {
  return y / Math.pow(2, w) & 1;
}
var Be = function(y) {
  var w = Ie(y), h = (w[0] + w[2]) / 2, p = (w[1] + w[3]) / 2, l = w[2] - h, d = w[3] - p;
  return {
    latitude: h,
    longitude: p,
    error: { latitude: l, longitude: d }
  };
}, _e = function(y, w) {
  var h = de(y, w), p = (h[0] + h[2]) / 2, l = (h[1] + h[3]) / 2, d = h[2] - p, c = h[3] - l;
  return {
    latitude: p,
    longitude: l,
    error: { latitude: d, longitude: c }
  };
}, Dn = function(y, w) {
  var h = Be(y), p = h.latitude + w[0] * h.error.latitude * 2, l = h.longitude + w[1] * h.error.longitude * 2;
  return l = Ne(l), p = Re(p), fe(p, l, y.length);
}, Hn = function(y, w, h) {
  h = h || 52;
  var p = _e(y, h), l = p.latitude + w[0] * p.error.latitude * 2, d = p.longitude + w[1] * p.error.longitude * 2;
  return d = Ne(d), l = Re(l), Kt(l, d, h);
}, pr = function(y) {
  var w = y.length, h = Be(y), p = h.latitude, l = h.longitude, d = h.error.latitude * 2, c = h.error.longitude * 2, v, _, b = [
    z(1, 0),
    z(1, 1),
    z(0, 1),
    z(-1, 1),
    z(-1, 0),
    z(-1, -1),
    z(0, -1),
    z(1, -1)
  ];
  function z(T, R) {
    return v = p + T * d, _ = l + R * c, _ = Ne(_), v = Re(v), fe(v, _, w);
  }
  return b;
}, vr = function(y, w) {
  w = w || 52;
  var h = _e(y, w), p = h.latitude, l = h.longitude, d = h.error.latitude * 2, c = h.error.longitude * 2, v, _, b = [
    z(1, 0),
    z(1, 1),
    z(0, 1),
    z(-1, 1),
    z(-1, 0),
    z(-1, -1),
    z(0, -1),
    z(1, -1)
  ];
  function z(T, R) {
    return v = p + T * d, _ = l + R * c, _ = Ne(_), v = Re(v), Kt(v, _, w);
  }
  return b;
}, gr = function(y, w, h, p, l) {
  l = l || 9;
  for (var d = fe(y, w, l), c = fe(h, p, l), v = Be(d), _ = v.error.latitude * 2, b = v.error.longitude * 2, z = Ie(d), T = Ie(c), R = Math.round((T[0] - z[0]) / _), tt = Math.round((T[1] - z[1]) / b), H = [], E = 0; E <= R; E++)
    for (var W = 0; W <= tt; W++)
      H.push(Dn(d, [E, W]));
  return H;
}, yr = function(y, w, h, p, l) {
  l = l || 52;
  for (var d = Kt(y, w, l), c = Kt(h, p, l), v = _e(d, l), _ = v.error.latitude * 2, b = v.error.longitude * 2, z = de(d, l), T = de(c, l), R = Math.round((T[0] - z[0]) / _), tt = Math.round((T[1] - z[1]) / b), H = [], E = 0; E <= R; E++)
    for (var W = 0; W <= tt; W++)
      H.push(Hn(d, [E, W], l));
  return H;
};
function Ne(y) {
  return y > kt ? qt + y % kt : y < qt ? kt + y % kt : y;
}
function Re(y) {
  return y > Vt ? Vt : y < jt ? jt : y;
}
var wr = {
  ENCODE_AUTO: Rn,
  encode: fe,
  encode_uint64: Kt,
  // keeping for backwards compatibility, will deprecate
  encode_int: Kt,
  decode: Be,
  decode_int: _e,
  decode_uint64: _e,
  // keeping for backwards compatibility, will deprecate
  decode_bbox: Ie,
  decode_bbox_uint64: de,
  // keeping for backwards compatibility, will deprecate
  decode_bbox_int: de,
  neighbor: Dn,
  neighbor_int: Hn,
  neighbors: pr,
  neighbors_int: vr,
  bboxes: gr,
  bboxes_int: yr
}, xr = wr;
const Bn = /* @__PURE__ */ Pi(xr), Pr = async ({ latitude: y, longitude: w }, { neighbors: h = !1, precision: p = 5, endpoint: l = "https://cdn.jsdelivr.net/gh/diasfs/osm-proximity@latest/poi-data" } = {}) => {
  let d = [Bn.encode(y, w, p)];
  if (h) {
    let [v] = d;
    d = [...d, ...Bn.neighbors(v)];
  }
  let c = d.map(async (v) => {
    let _ = `${l}/${p}/${v}.json`;
    return await fetch(_).then((b) => b.json()).catch(() => []);
  });
  return (await Promise.all(c)).reduce((v, _) => [...v, ..._]);
};
var Fn = { exports: {} };
(function(y, w) {
  (function(h, p) {
    y.exports = p();
  })(window, function() {
    return function(h) {
      var p = {};
      function l(d) {
        if (p[d])
          return p[d].exports;
        var c = p[d] = { i: d, l: !1, exports: {} };
        return h[d].call(c.exports, c, c.exports, l), c.l = !0, c.exports;
      }
      return l.m = h, l.c = p, l.d = function(d, c, v) {
        l.o(d, c) || Object.defineProperty(d, c, { enumerable: !0, get: v });
      }, l.r = function(d) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(d, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(d, "__esModule", { value: !0 });
      }, l.t = function(d, c) {
        if (1 & c && (d = l(d)), 8 & c || 4 & c && typeof d == "object" && d && d.__esModule)
          return d;
        var v = /* @__PURE__ */ Object.create(null);
        if (l.r(v), Object.defineProperty(v, "default", { enumerable: !0, value: d }), 2 & c && typeof d != "string")
          for (var _ in d)
            l.d(v, _, (function(b) {
              return d[b];
            }).bind(null, _));
        return v;
      }, l.n = function(d) {
        var c = d && d.__esModule ? function() {
          return d.default;
        } : function() {
          return d;
        };
        return l.d(c, "a", c), c;
      }, l.o = function(d, c) {
        return Object.prototype.hasOwnProperty.call(d, c);
      }, l.p = "", l(l.s = 5);
    }([function(h, p) {
      h.exports = function(l, d) {
        (d == null || d > l.length) && (d = l.length);
        for (var c = 0, v = new Array(d); c < d; c++)
          v[c] = l[c];
        return v;
      };
    }, function(h, p) {
      h.exports = function(l, d, c) {
        return d in l ? Object.defineProperty(l, d, { value: c, enumerable: !0, configurable: !0, writable: !0 }) : l[d] = c, l;
      };
    }, function(h, p, l) {
      var d = l(6), c = l(7), v = l(8), _ = l(9);
      h.exports = function(b) {
        return d(b) || c(b) || v(b) || _();
      };
    }, function(h, p) {
      h.exports = function(l, d) {
        if (!(l instanceof d))
          throw new TypeError("Cannot call a class as a function");
      };
    }, function(h, p) {
      function l(d, c) {
        for (var v = 0; v < c.length; v++) {
          var _ = c[v];
          _.enumerable = _.enumerable || !1, _.configurable = !0, "value" in _ && (_.writable = !0), Object.defineProperty(d, _.key, _);
        }
      }
      h.exports = function(d, c, v) {
        return c && l(d.prototype, c), v && l(d, v), d;
      };
    }, function(h, p, l) {
      l.r(p);
      var d = l(1), c = l.n(d), v = l(2), _ = l.n(v), b = l(3), z = l.n(b), T = l(4), R = l.n(T);
      function tt(W, D) {
        var Z = Object.keys(W);
        if (Object.getOwnPropertySymbols) {
          var P = Object.getOwnPropertySymbols(W);
          D && (P = P.filter(function(A) {
            return Object.getOwnPropertyDescriptor(W, A).enumerable;
          })), Z.push.apply(Z, P);
        }
        return Z;
      }
      function H(W) {
        for (var D = 1; D < arguments.length; D++) {
          var Z = arguments[D] != null ? arguments[D] : {};
          D % 2 ? tt(Object(Z), !0).forEach(function(P) {
            c()(W, P, Z[P]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(W, Object.getOwnPropertyDescriptors(Z)) : tt(Object(Z)).forEach(function(P) {
            Object.defineProperty(W, P, Object.getOwnPropertyDescriptor(Z, P));
          });
        }
        return W;
      }
      var E = function() {
        function W() {
          z()(this, W);
        }
        return R()(W, [{ key: "_convertMeasurements", value: function(D) {
          var Z = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "km", P = "";
          switch (Z.toLowerCase()) {
            case "mi":
              P = (0.62137 * D).toFixed(1);
              break;
            case "km":
              P = D.toFixed(1);
              break;
            case "m":
              P = (1e3 * D).toFixed();
              break;
            default:
              P = D.toFixed(1);
          }
          return parseFloat(P);
        } }, { key: "_haversine", value: function() {
          for (var D = arguments.length, Z = new Array(D), P = 0; P < D; P++)
            Z[P] = arguments[P];
          var A = Z.map(function(dt) {
            return dt / 180 * Math.PI;
          }), G = A[0], Q = A[1], K = A[2], Tt = A[3], Et = 6372.8, Xt = K - G, it = Tt - Q, rt = Math.sin(Xt / 2) * Math.sin(Xt / 2) + Math.sin(it / 2) * Math.sin(it / 2) * Math.cos(G) * Math.cos(K), De = 2 * Math.asin(Math.sqrt(rt));
          return Et * De;
        } }, { key: "isGeolocationAvailable", value: function() {
          return new Promise(function(D, Z) {
            "geolocation" in navigator ? navigator.geolocation.getCurrentPosition(function(P) {
              D(P);
            }, function(P) {
              switch (P.code) {
                case P.PERMISSION_DENIED:
                  Z(new Error("Error: Permission denied"));
                  break;
                case P.POSITION_UNAVAILABLE:
                  Z(new Error("Error: Position unavailable"));
                  break;
                case P.TIMEOUT:
                  Z(new Error("Error: Timeout"));
              }
            }) : Z(new Error("Error: Geolocation disabled in your browser"));
          });
        } }, { key: "getDistanceBetween", value: function(D, Z, P) {
          if (D.hasOwnProperty("latitude") && D.hasOwnProperty("longitude") && Z.hasOwnProperty("latitude") && Z.hasOwnProperty("longitude")) {
            var A = this._haversine(D.latitude, D.longitude, Z.latitude, Z.longitude);
            return this._convertMeasurements(A, P);
          }
          throw new Error("Error: Position latitude or longitude is not correct");
        } }, { key: "getClosestPosition", value: function(D, Z, P) {
          var A = this, G = Z.map(function(K) {
            return A.getDistanceBetween(D, K, P);
          }), Q = G.indexOf(Math.min.apply(Math, _()(G)));
          return console.log("getClosestPosition: closestPosition: ", H(H({}, Z[Q]), {}, { haversine: { distance: G[Q], measurement: P, accuracy: D.accuracy } })), H(H({}, Z[Q]), {}, { haversine: { distance: G[Q], measurement: P, accuracy: D.accuracy } });
        } }]), W;
      }();
      p.default = new E();
    }, function(h, p, l) {
      var d = l(0);
      h.exports = function(c) {
        if (Array.isArray(c))
          return d(c);
      };
    }, function(h, p) {
      h.exports = function(l) {
        if (typeof Symbol < "u" && Symbol.iterator in Object(l))
          return Array.from(l);
      };
    }, function(h, p, l) {
      var d = l(0);
      h.exports = function(c, v) {
        if (c) {
          if (typeof c == "string")
            return d(c, v);
          var _ = Object.prototype.toString.call(c).slice(8, -1);
          return _ === "Object" && c.constructor && (_ = c.constructor.name), _ === "Map" || _ === "Set" ? Array.from(c) : _ === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(_) ? d(c, v) : void 0;
        }
      };
    }, function(h, p) {
      h.exports = function() {
        throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      };
    }]);
  });
})(Fn);
var Lr = Fn.exports;
const br = /* @__PURE__ */ Pi(Lr);
var xi = { exports: {} };
/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */
(function(y, w) {
  (function(h, p) {
    p(w);
  })(_r, function(h) {
    var p = "1.9.4";
    function l(t) {
      var e, i, n, o;
      for (i = 1, n = arguments.length; i < n; i++) {
        o = arguments[i];
        for (e in o)
          t[e] = o[e];
      }
      return t;
    }
    var d = Object.create || /* @__PURE__ */ function() {
      function t() {
      }
      return function(e) {
        return t.prototype = e, new t();
      };
    }();
    function c(t, e) {
      var i = Array.prototype.slice;
      if (t.bind)
        return t.bind.apply(t, i.call(arguments, 1));
      var n = i.call(arguments, 2);
      return function() {
        return t.apply(e, n.length ? n.concat(i.call(arguments)) : arguments);
      };
    }
    var v = 0;
    function _(t) {
      return "_leaflet_id" in t || (t._leaflet_id = ++v), t._leaflet_id;
    }
    function b(t, e, i) {
      var n, o, r, s;
      return s = function() {
        n = !1, o && (r.apply(i, o), o = !1);
      }, r = function() {
        n ? o = arguments : (t.apply(i, arguments), setTimeout(s, e), n = !0);
      }, r;
    }
    function z(t, e, i) {
      var n = e[1], o = e[0], r = n - o;
      return t === n && i ? t : ((t - o) % r + r) % r + o;
    }
    function T() {
      return !1;
    }
    function R(t, e) {
      if (e === !1)
        return t;
      var i = Math.pow(10, e === void 0 ? 6 : e);
      return Math.round(t * i) / i;
    }
    function tt(t) {
      return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
    }
    function H(t) {
      return tt(t).split(/\s+/);
    }
    function E(t, e) {
      Object.prototype.hasOwnProperty.call(t, "options") || (t.options = t.options ? d(t.options) : {});
      for (var i in e)
        t.options[i] = e[i];
      return t.options;
    }
    function W(t, e, i) {
      var n = [];
      for (var o in t)
        n.push(encodeURIComponent(i ? o.toUpperCase() : o) + "=" + encodeURIComponent(t[o]));
      return (!e || e.indexOf("?") === -1 ? "?" : "&") + n.join("&");
    }
    var D = /\{ *([\w_ -]+) *\}/g;
    function Z(t, e) {
      return t.replace(D, function(i, n) {
        var o = e[n];
        if (o === void 0)
          throw new Error("No value provided for variable " + i);
        return typeof o == "function" && (o = o(e)), o;
      });
    }
    var P = Array.isArray || function(t) {
      return Object.prototype.toString.call(t) === "[object Array]";
    };
    function A(t, e) {
      for (var i = 0; i < t.length; i++)
        if (t[i] === e)
          return i;
      return -1;
    }
    var G = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
    function Q(t) {
      return window["webkit" + t] || window["moz" + t] || window["ms" + t];
    }
    var K = 0;
    function Tt(t) {
      var e = +/* @__PURE__ */ new Date(), i = Math.max(0, 16 - (e - K));
      return K = e + i, window.setTimeout(t, i);
    }
    var Et = window.requestAnimationFrame || Q("RequestAnimationFrame") || Tt, Xt = window.cancelAnimationFrame || Q("CancelAnimationFrame") || Q("CancelRequestAnimationFrame") || function(t) {
      window.clearTimeout(t);
    };
    function it(t, e, i) {
      if (i && Et === Tt)
        t.call(e);
      else
        return Et.call(window, c(t, e));
    }
    function rt(t) {
      t && Xt.call(window, t);
    }
    var De = {
      __proto__: null,
      extend: l,
      create: d,
      bind: c,
      get lastId() {
        return v;
      },
      stamp: _,
      throttle: b,
      wrapNum: z,
      falseFn: T,
      formatNum: R,
      trim: tt,
      splitWords: H,
      setOptions: E,
      getParamString: W,
      template: Z,
      isArray: P,
      indexOf: A,
      emptyImageUrl: G,
      requestFn: Et,
      cancelFn: Xt,
      requestAnimFrame: it,
      cancelAnimFrame: rt
    };
    function dt() {
    }
    dt.extend = function(t) {
      var e = function() {
        E(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
      }, i = e.__super__ = this.prototype, n = d(i);
      n.constructor = e, e.prototype = n;
      for (var o in this)
        Object.prototype.hasOwnProperty.call(this, o) && o !== "prototype" && o !== "__super__" && (e[o] = this[o]);
      return t.statics && l(e, t.statics), t.includes && (Wn(t.includes), l.apply(null, [n].concat(t.includes))), l(n, t), delete n.statics, delete n.includes, n.options && (n.options = i.options ? d(i.options) : {}, l(n.options, t.options)), n._initHooks = [], n.callInitHooks = function() {
        if (!this._initHooksCalled) {
          i.callInitHooks && i.callInitHooks.call(this), this._initHooksCalled = !0;
          for (var r = 0, s = n._initHooks.length; r < s; r++)
            n._initHooks[r].call(this);
        }
      }, e;
    }, dt.include = function(t) {
      var e = this.prototype.options;
      return l(this.prototype, t), t.options && (this.prototype.options = e, this.mergeOptions(t.options)), this;
    }, dt.mergeOptions = function(t) {
      return l(this.prototype.options, t), this;
    }, dt.addInitHook = function(t) {
      var e = Array.prototype.slice.call(arguments, 1), i = typeof t == "function" ? t : function() {
        this[t].apply(this, e);
      };
      return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(i), this;
    };
    function Wn(t) {
      if (!(typeof L > "u" || !L || !L.Mixin)) {
        t = P(t) ? t : [t];
        for (var e = 0; e < t.length; e++)
          t[e] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", new Error().stack);
      }
    }
    var ut = {
      /* @method on(type: String, fn: Function, context?: Object): this
       * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
       *
       * @alternative
       * @method on(eventMap: Object): this
       * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
       */
      on: function(t, e, i) {
        if (typeof t == "object")
          for (var n in t)
            this._on(n, t[n], e);
        else {
          t = H(t);
          for (var o = 0, r = t.length; o < r; o++)
            this._on(t[o], e, i);
        }
        return this;
      },
      /* @method off(type: String, fn?: Function, context?: Object): this
       * Removes a previously added listener function. If no function is specified, it will remove all the listeners of that particular event from the object. Note that if you passed a custom context to `on`, you must pass the same context to `off` in order to remove the listener.
       *
       * @alternative
       * @method off(eventMap: Object): this
       * Removes a set of type/listener pairs.
       *
       * @alternative
       * @method off: this
       * Removes all listeners to all events on the object. This includes implicitly attached events.
       */
      off: function(t, e, i) {
        if (!arguments.length)
          delete this._events;
        else if (typeof t == "object")
          for (var n in t)
            this._off(n, t[n], e);
        else {
          t = H(t);
          for (var o = arguments.length === 1, r = 0, s = t.length; r < s; r++)
            o ? this._off(t[r]) : this._off(t[r], e, i);
        }
        return this;
      },
      // attach listener (without syntactic sugar now)
      _on: function(t, e, i, n) {
        if (typeof e != "function") {
          console.warn("wrong listener type: " + typeof e);
          return;
        }
        if (this._listens(t, e, i) === !1) {
          i === this && (i = void 0);
          var o = { fn: e, ctx: i };
          n && (o.once = !0), this._events = this._events || {}, this._events[t] = this._events[t] || [], this._events[t].push(o);
        }
      },
      _off: function(t, e, i) {
        var n, o, r;
        if (this._events && (n = this._events[t], !!n)) {
          if (arguments.length === 1) {
            if (this._firingCount)
              for (o = 0, r = n.length; o < r; o++)
                n[o].fn = T;
            delete this._events[t];
            return;
          }
          if (typeof e != "function") {
            console.warn("wrong listener type: " + typeof e);
            return;
          }
          var s = this._listens(t, e, i);
          if (s !== !1) {
            var a = n[s];
            this._firingCount && (a.fn = T, this._events[t] = n = n.slice()), n.splice(s, 1);
          }
        }
      },
      // @method fire(type: String, data?: Object, propagate?: Boolean): this
      // Fires an event of the specified type. You can optionally provide a data
      // object — the first argument of the listener function will contain its
      // properties. The event can optionally be propagated to event parents.
      fire: function(t, e, i) {
        if (!this.listens(t, i))
          return this;
        var n = l({}, e, {
          type: t,
          target: this,
          sourceTarget: e && e.sourceTarget || this
        });
        if (this._events) {
          var o = this._events[t];
          if (o) {
            this._firingCount = this._firingCount + 1 || 1;
            for (var r = 0, s = o.length; r < s; r++) {
              var a = o[r], u = a.fn;
              a.once && this.off(t, u, a.ctx), u.call(a.ctx || this, n);
            }
            this._firingCount--;
          }
        }
        return i && this._propagateEvent(n), this;
      },
      // @method listens(type: String, propagate?: Boolean): Boolean
      // @method listens(type: String, fn: Function, context?: Object, propagate?: Boolean): Boolean
      // Returns `true` if a particular event type has any listeners attached to it.
      // The verification can optionally be propagated, it will return `true` if parents have the listener attached to it.
      listens: function(t, e, i, n) {
        typeof t != "string" && console.warn('"string" type argument expected');
        var o = e;
        typeof e != "function" && (n = !!e, o = void 0, i = void 0);
        var r = this._events && this._events[t];
        if (r && r.length && this._listens(t, o, i) !== !1)
          return !0;
        if (n) {
          for (var s in this._eventParents)
            if (this._eventParents[s].listens(t, e, i, n))
              return !0;
        }
        return !1;
      },
      // returns the index (number) or false
      _listens: function(t, e, i) {
        if (!this._events)
          return !1;
        var n = this._events[t] || [];
        if (!e)
          return !!n.length;
        i === this && (i = void 0);
        for (var o = 0, r = n.length; o < r; o++)
          if (n[o].fn === e && n[o].ctx === i)
            return o;
        return !1;
      },
      // @method once(…): this
      // Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
      once: function(t, e, i) {
        if (typeof t == "object")
          for (var n in t)
            this._on(n, t[n], e, !0);
        else {
          t = H(t);
          for (var o = 0, r = t.length; o < r; o++)
            this._on(t[o], e, i, !0);
        }
        return this;
      },
      // @method addEventParent(obj: Evented): this
      // Adds an event parent - an `Evented` that will receive propagated events
      addEventParent: function(t) {
        return this._eventParents = this._eventParents || {}, this._eventParents[_(t)] = t, this;
      },
      // @method removeEventParent(obj: Evented): this
      // Removes an event parent, so it will stop receiving propagated events
      removeEventParent: function(t) {
        return this._eventParents && delete this._eventParents[_(t)], this;
      },
      _propagateEvent: function(t) {
        for (var e in this._eventParents)
          this._eventParents[e].fire(t.type, l({
            layer: t.target,
            propagatedFrom: t.target
          }, t), !0);
      }
    };
    ut.addEventListener = ut.on, ut.removeEventListener = ut.clearAllEventListeners = ut.off, ut.addOneTimeEventListener = ut.once, ut.fireEvent = ut.fire, ut.hasEventListeners = ut.listens;
    var Yt = dt.extend(ut);
    function S(t, e, i) {
      this.x = i ? Math.round(t) : t, this.y = i ? Math.round(e) : e;
    }
    var Li = Math.trunc || function(t) {
      return t > 0 ? Math.floor(t) : Math.ceil(t);
    };
    S.prototype = {
      // @method clone(): Point
      // Returns a copy of the current point.
      clone: function() {
        return new S(this.x, this.y);
      },
      // @method add(otherPoint: Point): Point
      // Returns the result of addition of the current and the given points.
      add: function(t) {
        return this.clone()._add(M(t));
      },
      _add: function(t) {
        return this.x += t.x, this.y += t.y, this;
      },
      // @method subtract(otherPoint: Point): Point
      // Returns the result of subtraction of the given point from the current.
      subtract: function(t) {
        return this.clone()._subtract(M(t));
      },
      _subtract: function(t) {
        return this.x -= t.x, this.y -= t.y, this;
      },
      // @method divideBy(num: Number): Point
      // Returns the result of division of the current point by the given number.
      divideBy: function(t) {
        return this.clone()._divideBy(t);
      },
      _divideBy: function(t) {
        return this.x /= t, this.y /= t, this;
      },
      // @method multiplyBy(num: Number): Point
      // Returns the result of multiplication of the current point by the given number.
      multiplyBy: function(t) {
        return this.clone()._multiplyBy(t);
      },
      _multiplyBy: function(t) {
        return this.x *= t, this.y *= t, this;
      },
      // @method scaleBy(scale: Point): Point
      // Multiply each coordinate of the current point by each coordinate of
      // `scale`. In linear algebra terms, multiply the point by the
      // [scaling matrix](https://en.wikipedia.org/wiki/Scaling_%28geometry%29#Matrix_representation)
      // defined by `scale`.
      scaleBy: function(t) {
        return new S(this.x * t.x, this.y * t.y);
      },
      // @method unscaleBy(scale: Point): Point
      // Inverse of `scaleBy`. Divide each coordinate of the current point by
      // each coordinate of `scale`.
      unscaleBy: function(t) {
        return new S(this.x / t.x, this.y / t.y);
      },
      // @method round(): Point
      // Returns a copy of the current point with rounded coordinates.
      round: function() {
        return this.clone()._round();
      },
      _round: function() {
        return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
      },
      // @method floor(): Point
      // Returns a copy of the current point with floored coordinates (rounded down).
      floor: function() {
        return this.clone()._floor();
      },
      _floor: function() {
        return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
      },
      // @method ceil(): Point
      // Returns a copy of the current point with ceiled coordinates (rounded up).
      ceil: function() {
        return this.clone()._ceil();
      },
      _ceil: function() {
        return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
      },
      // @method trunc(): Point
      // Returns a copy of the current point with truncated coordinates (rounded towards zero).
      trunc: function() {
        return this.clone()._trunc();
      },
      _trunc: function() {
        return this.x = Li(this.x), this.y = Li(this.y), this;
      },
      // @method distanceTo(otherPoint: Point): Number
      // Returns the cartesian distance between the current and the given points.
      distanceTo: function(t) {
        t = M(t);
        var e = t.x - this.x, i = t.y - this.y;
        return Math.sqrt(e * e + i * i);
      },
      // @method equals(otherPoint: Point): Boolean
      // Returns `true` if the given point has the same coordinates.
      equals: function(t) {
        return t = M(t), t.x === this.x && t.y === this.y;
      },
      // @method contains(otherPoint: Point): Boolean
      // Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
      contains: function(t) {
        return t = M(t), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y);
      },
      // @method toString(): String
      // Returns a string representation of the point for debugging purposes.
      toString: function() {
        return "Point(" + R(this.x) + ", " + R(this.y) + ")";
      }
    };
    function M(t, e, i) {
      return t instanceof S ? t : P(t) ? new S(t[0], t[1]) : t == null ? t : typeof t == "object" && "x" in t && "y" in t ? new S(t.x, t.y) : new S(t, e, i);
    }
    function j(t, e) {
      if (t)
        for (var i = e ? [t, e] : t, n = 0, o = i.length; n < o; n++)
          this.extend(i[n]);
    }
    j.prototype = {
      // @method extend(point: Point): this
      // Extends the bounds to contain the given point.
      // @alternative
      // @method extend(otherBounds: Bounds): this
      // Extend the bounds to contain the given bounds
      extend: function(t) {
        var e, i;
        if (!t)
          return this;
        if (t instanceof S || typeof t[0] == "number" || "x" in t)
          e = i = M(t);
        else if (t = st(t), e = t.min, i = t.max, !e || !i)
          return this;
        return !this.min && !this.max ? (this.min = e.clone(), this.max = i.clone()) : (this.min.x = Math.min(e.x, this.min.x), this.max.x = Math.max(i.x, this.max.x), this.min.y = Math.min(e.y, this.min.y), this.max.y = Math.max(i.y, this.max.y)), this;
      },
      // @method getCenter(round?: Boolean): Point
      // Returns the center point of the bounds.
      getCenter: function(t) {
        return M(
          (this.min.x + this.max.x) / 2,
          (this.min.y + this.max.y) / 2,
          t
        );
      },
      // @method getBottomLeft(): Point
      // Returns the bottom-left point of the bounds.
      getBottomLeft: function() {
        return M(this.min.x, this.max.y);
      },
      // @method getTopRight(): Point
      // Returns the top-right point of the bounds.
      getTopRight: function() {
        return M(this.max.x, this.min.y);
      },
      // @method getTopLeft(): Point
      // Returns the top-left point of the bounds (i.e. [`this.min`](#bounds-min)).
      getTopLeft: function() {
        return this.min;
      },
      // @method getBottomRight(): Point
      // Returns the bottom-right point of the bounds (i.e. [`this.max`](#bounds-max)).
      getBottomRight: function() {
        return this.max;
      },
      // @method getSize(): Point
      // Returns the size of the given bounds
      getSize: function() {
        return this.max.subtract(this.min);
      },
      // @method contains(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle contains the given one.
      // @alternative
      // @method contains(point: Point): Boolean
      // Returns `true` if the rectangle contains the given point.
      contains: function(t) {
        var e, i;
        return typeof t[0] == "number" || t instanceof S ? t = M(t) : t = st(t), t instanceof j ? (e = t.min, i = t.max) : e = i = t, e.x >= this.min.x && i.x <= this.max.x && e.y >= this.min.y && i.y <= this.max.y;
      },
      // @method intersects(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle intersects the given bounds. Two bounds
      // intersect if they have at least one point in common.
      intersects: function(t) {
        t = st(t);
        var e = this.min, i = this.max, n = t.min, o = t.max, r = o.x >= e.x && n.x <= i.x, s = o.y >= e.y && n.y <= i.y;
        return r && s;
      },
      // @method overlaps(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle overlaps the given bounds. Two bounds
      // overlap if their intersection is an area.
      overlaps: function(t) {
        t = st(t);
        var e = this.min, i = this.max, n = t.min, o = t.max, r = o.x > e.x && n.x < i.x, s = o.y > e.y && n.y < i.y;
        return r && s;
      },
      // @method isValid(): Boolean
      // Returns `true` if the bounds are properly initialized.
      isValid: function() {
        return !!(this.min && this.max);
      },
      // @method pad(bufferRatio: Number): Bounds
      // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
      // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
      // Negative values will retract the bounds.
      pad: function(t) {
        var e = this.min, i = this.max, n = Math.abs(e.x - i.x) * t, o = Math.abs(e.y - i.y) * t;
        return st(
          M(e.x - n, e.y - o),
          M(i.x + n, i.y + o)
        );
      },
      // @method equals(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle is equivalent to the given bounds.
      equals: function(t) {
        return t ? (t = st(t), this.min.equals(t.getTopLeft()) && this.max.equals(t.getBottomRight())) : !1;
      }
    };
    function st(t, e) {
      return !t || t instanceof j ? t : new j(t, e);
    }
    function at(t, e) {
      if (t)
        for (var i = e ? [t, e] : t, n = 0, o = i.length; n < o; n++)
          this.extend(i[n]);
    }
    at.prototype = {
      // @method extend(latlng: LatLng): this
      // Extend the bounds to contain the given point
      // @alternative
      // @method extend(otherBounds: LatLngBounds): this
      // Extend the bounds to contain the given bounds
      extend: function(t) {
        var e = this._southWest, i = this._northEast, n, o;
        if (t instanceof F)
          n = t, o = t;
        else if (t instanceof at) {
          if (n = t._southWest, o = t._northEast, !n || !o)
            return this;
        } else
          return t ? this.extend(I(t) || X(t)) : this;
        return !e && !i ? (this._southWest = new F(n.lat, n.lng), this._northEast = new F(o.lat, o.lng)) : (e.lat = Math.min(n.lat, e.lat), e.lng = Math.min(n.lng, e.lng), i.lat = Math.max(o.lat, i.lat), i.lng = Math.max(o.lng, i.lng)), this;
      },
      // @method pad(bufferRatio: Number): LatLngBounds
      // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
      // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
      // Negative values will retract the bounds.
      pad: function(t) {
        var e = this._southWest, i = this._northEast, n = Math.abs(e.lat - i.lat) * t, o = Math.abs(e.lng - i.lng) * t;
        return new at(
          new F(e.lat - n, e.lng - o),
          new F(i.lat + n, i.lng + o)
        );
      },
      // @method getCenter(): LatLng
      // Returns the center point of the bounds.
      getCenter: function() {
        return new F(
          (this._southWest.lat + this._northEast.lat) / 2,
          (this._southWest.lng + this._northEast.lng) / 2
        );
      },
      // @method getSouthWest(): LatLng
      // Returns the south-west point of the bounds.
      getSouthWest: function() {
        return this._southWest;
      },
      // @method getNorthEast(): LatLng
      // Returns the north-east point of the bounds.
      getNorthEast: function() {
        return this._northEast;
      },
      // @method getNorthWest(): LatLng
      // Returns the north-west point of the bounds.
      getNorthWest: function() {
        return new F(this.getNorth(), this.getWest());
      },
      // @method getSouthEast(): LatLng
      // Returns the south-east point of the bounds.
      getSouthEast: function() {
        return new F(this.getSouth(), this.getEast());
      },
      // @method getWest(): Number
      // Returns the west longitude of the bounds
      getWest: function() {
        return this._southWest.lng;
      },
      // @method getSouth(): Number
      // Returns the south latitude of the bounds
      getSouth: function() {
        return this._southWest.lat;
      },
      // @method getEast(): Number
      // Returns the east longitude of the bounds
      getEast: function() {
        return this._northEast.lng;
      },
      // @method getNorth(): Number
      // Returns the north latitude of the bounds
      getNorth: function() {
        return this._northEast.lat;
      },
      // @method contains(otherBounds: LatLngBounds): Boolean
      // Returns `true` if the rectangle contains the given one.
      // @alternative
      // @method contains (latlng: LatLng): Boolean
      // Returns `true` if the rectangle contains the given point.
      contains: function(t) {
        typeof t[0] == "number" || t instanceof F || "lat" in t ? t = I(t) : t = X(t);
        var e = this._southWest, i = this._northEast, n, o;
        return t instanceof at ? (n = t.getSouthWest(), o = t.getNorthEast()) : n = o = t, n.lat >= e.lat && o.lat <= i.lat && n.lng >= e.lng && o.lng <= i.lng;
      },
      // @method intersects(otherBounds: LatLngBounds): Boolean
      // Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
      intersects: function(t) {
        t = X(t);
        var e = this._southWest, i = this._northEast, n = t.getSouthWest(), o = t.getNorthEast(), r = o.lat >= e.lat && n.lat <= i.lat, s = o.lng >= e.lng && n.lng <= i.lng;
        return r && s;
      },
      // @method overlaps(otherBounds: LatLngBounds): Boolean
      // Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
      overlaps: function(t) {
        t = X(t);
        var e = this._southWest, i = this._northEast, n = t.getSouthWest(), o = t.getNorthEast(), r = o.lat > e.lat && n.lat < i.lat, s = o.lng > e.lng && n.lng < i.lng;
        return r && s;
      },
      // @method toBBoxString(): String
      // Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
      toBBoxString: function() {
        return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",");
      },
      // @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
      // Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
      equals: function(t, e) {
        return t ? (t = X(t), this._southWest.equals(t.getSouthWest(), e) && this._northEast.equals(t.getNorthEast(), e)) : !1;
      },
      // @method isValid(): Boolean
      // Returns `true` if the bounds are properly initialized.
      isValid: function() {
        return !!(this._southWest && this._northEast);
      }
    };
    function X(t, e) {
      return t instanceof at ? t : new at(t, e);
    }
    function F(t, e, i) {
      if (isNaN(t) || isNaN(e))
        throw new Error("Invalid LatLng object: (" + t + ", " + e + ")");
      this.lat = +t, this.lng = +e, i !== void 0 && (this.alt = +i);
    }
    F.prototype = {
      // @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
      // Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
      equals: function(t, e) {
        if (!t)
          return !1;
        t = I(t);
        var i = Math.max(
          Math.abs(this.lat - t.lat),
          Math.abs(this.lng - t.lng)
        );
        return i <= (e === void 0 ? 1e-9 : e);
      },
      // @method toString(): String
      // Returns a string representation of the point (for debugging purposes).
      toString: function(t) {
        return "LatLng(" + R(this.lat, t) + ", " + R(this.lng, t) + ")";
      },
      // @method distanceTo(otherLatLng: LatLng): Number
      // Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
      distanceTo: function(t) {
        return Mt.distance(this, I(t));
      },
      // @method wrap(): LatLng
      // Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
      wrap: function() {
        return Mt.wrapLatLng(this);
      },
      // @method toBounds(sizeInMeters: Number): LatLngBounds
      // Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
      toBounds: function(t) {
        var e = 180 * t / 40075017, i = e / Math.cos(Math.PI / 180 * this.lat);
        return X(
          [this.lat - e, this.lng - i],
          [this.lat + e, this.lng + i]
        );
      },
      clone: function() {
        return new F(this.lat, this.lng, this.alt);
      }
    };
    function I(t, e, i) {
      return t instanceof F ? t : P(t) && typeof t[0] != "object" ? t.length === 3 ? new F(t[0], t[1], t[2]) : t.length === 2 ? new F(t[0], t[1]) : null : t == null ? t : typeof t == "object" && "lat" in t ? new F(t.lat, "lng" in t ? t.lng : t.lon, t.alt) : e === void 0 ? null : new F(t, e, i);
    }
    var wt = {
      // @method latLngToPoint(latlng: LatLng, zoom: Number): Point
      // Projects geographical coordinates into pixel coordinates for a given zoom.
      latLngToPoint: function(t, e) {
        var i = this.projection.project(t), n = this.scale(e);
        return this.transformation._transform(i, n);
      },
      // @method pointToLatLng(point: Point, zoom: Number): LatLng
      // The inverse of `latLngToPoint`. Projects pixel coordinates on a given
      // zoom into geographical coordinates.
      pointToLatLng: function(t, e) {
        var i = this.scale(e), n = this.transformation.untransform(t, i);
        return this.projection.unproject(n);
      },
      // @method project(latlng: LatLng): Point
      // Projects geographical coordinates into coordinates in units accepted for
      // this CRS (e.g. meters for EPSG:3857, for passing it to WMS services).
      project: function(t) {
        return this.projection.project(t);
      },
      // @method unproject(point: Point): LatLng
      // Given a projected coordinate returns the corresponding LatLng.
      // The inverse of `project`.
      unproject: function(t) {
        return this.projection.unproject(t);
      },
      // @method scale(zoom: Number): Number
      // Returns the scale used when transforming projected coordinates into
      // pixel coordinates for a particular zoom. For example, it returns
      // `256 * 2^zoom` for Mercator-based CRS.
      scale: function(t) {
        return 256 * Math.pow(2, t);
      },
      // @method zoom(scale: Number): Number
      // Inverse of `scale()`, returns the zoom level corresponding to a scale
      // factor of `scale`.
      zoom: function(t) {
        return Math.log(t / 256) / Math.LN2;
      },
      // @method getProjectedBounds(zoom: Number): Bounds
      // Returns the projection's bounds scaled and transformed for the provided `zoom`.
      getProjectedBounds: function(t) {
        if (this.infinite)
          return null;
        var e = this.projection.bounds, i = this.scale(t), n = this.transformation.transform(e.min, i), o = this.transformation.transform(e.max, i);
        return new j(n, o);
      },
      // @method distance(latlng1: LatLng, latlng2: LatLng): Number
      // Returns the distance between two geographical coordinates.
      // @property code: String
      // Standard code name of the CRS passed into WMS services (e.g. `'EPSG:3857'`)
      //
      // @property wrapLng: Number[]
      // An array of two numbers defining whether the longitude (horizontal) coordinate
      // axis wraps around a given range and how. Defaults to `[-180, 180]` in most
      // geographical CRSs. If `undefined`, the longitude axis does not wrap around.
      //
      // @property wrapLat: Number[]
      // Like `wrapLng`, but for the latitude (vertical) axis.
      // wrapLng: [min, max],
      // wrapLat: [min, max],
      // @property infinite: Boolean
      // If true, the coordinate space will be unbounded (infinite in both axes)
      infinite: !1,
      // @method wrapLatLng(latlng: LatLng): LatLng
      // Returns a `LatLng` where lat and lng has been wrapped according to the
      // CRS's `wrapLat` and `wrapLng` properties, if they are outside the CRS's bounds.
      wrapLatLng: function(t) {
        var e = this.wrapLng ? z(t.lng, this.wrapLng, !0) : t.lng, i = this.wrapLat ? z(t.lat, this.wrapLat, !0) : t.lat, n = t.alt;
        return new F(i, e, n);
      },
      // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
      // Returns a `LatLngBounds` with the same size as the given one, ensuring
      // that its center is within the CRS's bounds.
      // Only accepts actual `L.LatLngBounds` instances, not arrays.
      wrapLatLngBounds: function(t) {
        var e = t.getCenter(), i = this.wrapLatLng(e), n = e.lat - i.lat, o = e.lng - i.lng;
        if (n === 0 && o === 0)
          return t;
        var r = t.getSouthWest(), s = t.getNorthEast(), a = new F(r.lat - n, r.lng - o), u = new F(s.lat - n, s.lng - o);
        return new at(a, u);
      }
    }, Mt = l({}, wt, {
      wrapLng: [-180, 180],
      // Mean Earth Radius, as recommended for use by
      // the International Union of Geodesy and Geophysics,
      // see https://rosettacode.org/wiki/Haversine_formula
      R: 6371e3,
      // distance between two geographical points using spherical law of cosines approximation
      distance: function(t, e) {
        var i = Math.PI / 180, n = t.lat * i, o = e.lat * i, r = Math.sin((e.lat - t.lat) * i / 2), s = Math.sin((e.lng - t.lng) * i / 2), a = r * r + Math.cos(n) * Math.cos(o) * s * s, u = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return this.R * u;
      }
    }), bi = 6378137, He = {
      R: bi,
      MAX_LATITUDE: 85.0511287798,
      project: function(t) {
        var e = Math.PI / 180, i = this.MAX_LATITUDE, n = Math.max(Math.min(i, t.lat), -i), o = Math.sin(n * e);
        return new S(
          this.R * t.lng * e,
          this.R * Math.log((1 + o) / (1 - o)) / 2
        );
      },
      unproject: function(t) {
        var e = 180 / Math.PI;
        return new F(
          (2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * e,
          t.x * e / this.R
        );
      },
      bounds: function() {
        var t = bi * Math.PI;
        return new j([-t, -t], [t, t]);
      }()
    };
    function Fe(t, e, i, n) {
      if (P(t)) {
        this._a = t[0], this._b = t[1], this._c = t[2], this._d = t[3];
        return;
      }
      this._a = t, this._b = e, this._c = i, this._d = n;
    }
    Fe.prototype = {
      // @method transform(point: Point, scale?: Number): Point
      // Returns a transformed point, optionally multiplied by the given scale.
      // Only accepts actual `L.Point` instances, not arrays.
      transform: function(t, e) {
        return this._transform(t.clone(), e);
      },
      // destructive transform (faster)
      _transform: function(t, e) {
        return e = e || 1, t.x = e * (this._a * t.x + this._b), t.y = e * (this._c * t.y + this._d), t;
      },
      // @method untransform(point: Point, scale?: Number): Point
      // Returns the reverse transformation of the given point, optionally divided
      // by the given scale. Only accepts actual `L.Point` instances, not arrays.
      untransform: function(t, e) {
        return e = e || 1, new S(
          (t.x / e - this._b) / this._a,
          (t.y / e - this._d) / this._c
        );
      }
    };
    function Jt(t, e, i, n) {
      return new Fe(t, e, i, n);
    }
    var We = l({}, Mt, {
      code: "EPSG:3857",
      projection: He,
      transformation: function() {
        var t = 0.5 / (Math.PI * He.R);
        return Jt(t, 0.5, -t, 0.5);
      }()
    }), Un = l({}, We, {
      code: "EPSG:900913"
    });
    function Ti(t) {
      return document.createElementNS("http://www.w3.org/2000/svg", t);
    }
    function Mi(t, e) {
      var i = "", n, o, r, s, a, u;
      for (n = 0, r = t.length; n < r; n++) {
        for (a = t[n], o = 0, s = a.length; o < s; o++)
          u = a[o], i += (o ? "L" : "M") + u.x + " " + u.y;
        i += e ? g.svg ? "z" : "x" : "";
      }
      return i || "M0 0";
    }
    var Ue = document.documentElement.style, me = "ActiveXObject" in window, Gn = me && !document.addEventListener, Si = "msLaunchUri" in navigator && !("documentMode" in document), Ge = pt("webkit"), Ci = pt("android"), ki = pt("android 2") || pt("android 3"), jn = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), Vn = Ci && pt("Google") && jn < 537 && !("AudioNode" in window), je = !!window.opera, Ei = !Si && pt("chrome"), zi = pt("gecko") && !Ge && !je && !me, qn = !Ei && pt("safari"), Oi = pt("phantom"), Ai = "OTransition" in Ue, Kn = navigator.platform.indexOf("Win") === 0, Zi = me && "transition" in Ue, Ve = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !ki, Ii = "MozPerspective" in Ue, Xn = !window.L_DISABLE_3D && (Zi || Ve || Ii) && !Ai && !Oi, $t = typeof orientation < "u" || pt("mobile"), Yn = $t && Ge, Jn = $t && Ve, Bi = !window.PointerEvent && window.MSPointerEvent, Ni = !!(window.PointerEvent || Bi), Ri = "ontouchstart" in window || !!window.TouchEvent, $n = !window.L_NO_TOUCH && (Ri || Ni), Qn = $t && je, to = $t && zi, eo = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, io = function() {
      var t = !1;
      try {
        var e = Object.defineProperty({}, "passive", {
          get: function() {
            t = !0;
          }
        });
        window.addEventListener("testPassiveEventSupport", T, e), window.removeEventListener("testPassiveEventSupport", T, e);
      } catch {
      }
      return t;
    }(), no = function() {
      return !!document.createElement("canvas").getContext;
    }(), qe = !!(document.createElementNS && Ti("svg").createSVGRect), oo = !!qe && function() {
      var t = document.createElement("div");
      return t.innerHTML = "<svg/>", (t.firstChild && t.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
    }(), ro = !qe && function() {
      try {
        var t = document.createElement("div");
        t.innerHTML = '<v:shape adj="1"/>';
        var e = t.firstChild;
        return e.style.behavior = "url(#default#VML)", e && typeof e.adj == "object";
      } catch {
        return !1;
      }
    }(), so = navigator.platform.indexOf("Mac") === 0, ao = navigator.platform.indexOf("Linux") === 0;
    function pt(t) {
      return navigator.userAgent.toLowerCase().indexOf(t) >= 0;
    }
    var g = {
      ie: me,
      ielt9: Gn,
      edge: Si,
      webkit: Ge,
      android: Ci,
      android23: ki,
      androidStock: Vn,
      opera: je,
      chrome: Ei,
      gecko: zi,
      safari: qn,
      phantom: Oi,
      opera12: Ai,
      win: Kn,
      ie3d: Zi,
      webkit3d: Ve,
      gecko3d: Ii,
      any3d: Xn,
      mobile: $t,
      mobileWebkit: Yn,
      mobileWebkit3d: Jn,
      msPointer: Bi,
      pointer: Ni,
      touch: $n,
      touchNative: Ri,
      mobileOpera: Qn,
      mobileGecko: to,
      retina: eo,
      passiveEvents: io,
      canvas: no,
      svg: qe,
      vml: ro,
      inlineSvg: oo,
      mac: so,
      linux: ao
    }, Di = g.msPointer ? "MSPointerDown" : "pointerdown", Hi = g.msPointer ? "MSPointerMove" : "pointermove", Fi = g.msPointer ? "MSPointerUp" : "pointerup", Wi = g.msPointer ? "MSPointerCancel" : "pointercancel", Ke = {
      touchstart: Di,
      touchmove: Hi,
      touchend: Fi,
      touchcancel: Wi
    }, Ui = {
      touchstart: _o,
      touchmove: pe,
      touchend: pe,
      touchcancel: pe
    }, Bt = {}, Gi = !1;
    function ho(t, e, i) {
      return e === "touchstart" && fo(), Ui[e] ? (i = Ui[e].bind(this, i), t.addEventListener(Ke[e], i, !1), i) : (console.warn("wrong event specified:", e), T);
    }
    function uo(t, e, i) {
      if (!Ke[e]) {
        console.warn("wrong event specified:", e);
        return;
      }
      t.removeEventListener(Ke[e], i, !1);
    }
    function lo(t) {
      Bt[t.pointerId] = t;
    }
    function co(t) {
      Bt[t.pointerId] && (Bt[t.pointerId] = t);
    }
    function ji(t) {
      delete Bt[t.pointerId];
    }
    function fo() {
      Gi || (document.addEventListener(Di, lo, !0), document.addEventListener(Hi, co, !0), document.addEventListener(Fi, ji, !0), document.addEventListener(Wi, ji, !0), Gi = !0);
    }
    function pe(t, e) {
      if (e.pointerType !== (e.MSPOINTER_TYPE_MOUSE || "mouse")) {
        e.touches = [];
        for (var i in Bt)
          e.touches.push(Bt[i]);
        e.changedTouches = [e], t(e);
      }
    }
    function _o(t, e) {
      e.MSPOINTER_TYPE_TOUCH && e.pointerType === e.MSPOINTER_TYPE_TOUCH && nt(e), pe(t, e);
    }
    function mo(t) {
      var e = {}, i, n;
      for (n in t)
        i = t[n], e[n] = i && i.bind ? i.bind(t) : i;
      return t = e, e.type = "dblclick", e.detail = 2, e.isTrusted = !1, e._simulated = !0, e;
    }
    var po = 200;
    function vo(t, e) {
      t.addEventListener("dblclick", e);
      var i = 0, n;
      function o(r) {
        if (r.detail !== 1) {
          n = r.detail;
          return;
        }
        if (!(r.pointerType === "mouse" || r.sourceCapabilities && !r.sourceCapabilities.firesTouchEvents)) {
          var s = Yi(r);
          if (!(s.some(function(u) {
            return u instanceof HTMLLabelElement && u.attributes.for;
          }) && !s.some(function(u) {
            return u instanceof HTMLInputElement || u instanceof HTMLSelectElement;
          }))) {
            var a = Date.now();
            a - i <= po ? (n++, n === 2 && e(mo(r))) : n = 1, i = a;
          }
        }
      }
      return t.addEventListener("click", o), {
        dblclick: e,
        simDblclick: o
      };
    }
    function go(t, e) {
      t.removeEventListener("dblclick", e.dblclick), t.removeEventListener("click", e.simDblclick);
    }
    var Xe = ye(
      ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]
    ), Qt = ye(
      ["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]
    ), Vi = Qt === "webkitTransition" || Qt === "OTransition" ? Qt + "End" : "transitionend";
    function qi(t) {
      return typeof t == "string" ? document.getElementById(t) : t;
    }
    function te(t, e) {
      var i = t.style[e] || t.currentStyle && t.currentStyle[e];
      if ((!i || i === "auto") && document.defaultView) {
        var n = document.defaultView.getComputedStyle(t, null);
        i = n ? n[e] : null;
      }
      return i === "auto" ? null : i;
    }
    function N(t, e, i) {
      var n = document.createElement(t);
      return n.className = e || "", i && i.appendChild(n), n;
    }
    function V(t) {
      var e = t.parentNode;
      e && e.removeChild(t);
    }
    function ve(t) {
      for (; t.firstChild; )
        t.removeChild(t.firstChild);
    }
    function Nt(t) {
      var e = t.parentNode;
      e && e.lastChild !== t && e.appendChild(t);
    }
    function Rt(t) {
      var e = t.parentNode;
      e && e.firstChild !== t && e.insertBefore(t, e.firstChild);
    }
    function Ye(t, e) {
      if (t.classList !== void 0)
        return t.classList.contains(e);
      var i = ge(t);
      return i.length > 0 && new RegExp("(^|\\s)" + e + "(\\s|$)").test(i);
    }
    function k(t, e) {
      if (t.classList !== void 0)
        for (var i = H(e), n = 0, o = i.length; n < o; n++)
          t.classList.add(i[n]);
      else if (!Ye(t, e)) {
        var r = ge(t);
        Je(t, (r ? r + " " : "") + e);
      }
    }
    function q(t, e) {
      t.classList !== void 0 ? t.classList.remove(e) : Je(t, tt((" " + ge(t) + " ").replace(" " + e + " ", " ")));
    }
    function Je(t, e) {
      t.className.baseVal === void 0 ? t.className = e : t.className.baseVal = e;
    }
    function ge(t) {
      return t.correspondingElement && (t = t.correspondingElement), t.className.baseVal === void 0 ? t.className : t.className.baseVal;
    }
    function lt(t, e) {
      "opacity" in t.style ? t.style.opacity = e : "filter" in t.style && yo(t, e);
    }
    function yo(t, e) {
      var i = !1, n = "DXImageTransform.Microsoft.Alpha";
      try {
        i = t.filters.item(n);
      } catch {
        if (e === 1)
          return;
      }
      e = Math.round(e * 100), i ? (i.Enabled = e !== 100, i.Opacity = e) : t.style.filter += " progid:" + n + "(opacity=" + e + ")";
    }
    function ye(t) {
      for (var e = document.documentElement.style, i = 0; i < t.length; i++)
        if (t[i] in e)
          return t[i];
      return !1;
    }
    function zt(t, e, i) {
      var n = e || new S(0, 0);
      t.style[Xe] = (g.ie3d ? "translate(" + n.x + "px," + n.y + "px)" : "translate3d(" + n.x + "px," + n.y + "px,0)") + (i ? " scale(" + i + ")" : "");
    }
    function Y(t, e) {
      t._leaflet_pos = e, g.any3d ? zt(t, e) : (t.style.left = e.x + "px", t.style.top = e.y + "px");
    }
    function Ot(t) {
      return t._leaflet_pos || new S(0, 0);
    }
    var ee, ie, $e;
    if ("onselectstart" in document)
      ee = function() {
        C(window, "selectstart", nt);
      }, ie = function() {
        U(window, "selectstart", nt);
      };
    else {
      var ne = ye(
        ["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]
      );
      ee = function() {
        if (ne) {
          var t = document.documentElement.style;
          $e = t[ne], t[ne] = "none";
        }
      }, ie = function() {
        ne && (document.documentElement.style[ne] = $e, $e = void 0);
      };
    }
    function Qe() {
      C(window, "dragstart", nt);
    }
    function ti() {
      U(window, "dragstart", nt);
    }
    var we, ei;
    function ii(t) {
      for (; t.tabIndex === -1; )
        t = t.parentNode;
      t.style && (xe(), we = t, ei = t.style.outlineStyle, t.style.outlineStyle = "none", C(window, "keydown", xe));
    }
    function xe() {
      we && (we.style.outlineStyle = ei, we = void 0, ei = void 0, U(window, "keydown", xe));
    }
    function Ki(t) {
      do
        t = t.parentNode;
      while ((!t.offsetWidth || !t.offsetHeight) && t !== document.body);
      return t;
    }
    function ni(t) {
      var e = t.getBoundingClientRect();
      return {
        x: e.width / t.offsetWidth || 1,
        y: e.height / t.offsetHeight || 1,
        boundingClientRect: e
      };
    }
    var wo = {
      __proto__: null,
      TRANSFORM: Xe,
      TRANSITION: Qt,
      TRANSITION_END: Vi,
      get: qi,
      getStyle: te,
      create: N,
      remove: V,
      empty: ve,
      toFront: Nt,
      toBack: Rt,
      hasClass: Ye,
      addClass: k,
      removeClass: q,
      setClass: Je,
      getClass: ge,
      setOpacity: lt,
      testProp: ye,
      setTransform: zt,
      setPosition: Y,
      getPosition: Ot,
      get disableTextSelection() {
        return ee;
      },
      get enableTextSelection() {
        return ie;
      },
      disableImageDrag: Qe,
      enableImageDrag: ti,
      preventOutline: ii,
      restoreOutline: xe,
      getSizedParentNode: Ki,
      getScale: ni
    };
    function C(t, e, i, n) {
      if (e && typeof e == "object")
        for (var o in e)
          ri(t, o, e[o], i);
      else {
        e = H(e);
        for (var r = 0, s = e.length; r < s; r++)
          ri(t, e[r], i, n);
      }
      return this;
    }
    var vt = "_leaflet_events";
    function U(t, e, i, n) {
      if (arguments.length === 1)
        Xi(t), delete t[vt];
      else if (e && typeof e == "object")
        for (var o in e)
          si(t, o, e[o], i);
      else if (e = H(e), arguments.length === 2)
        Xi(t, function(a) {
          return A(e, a) !== -1;
        });
      else
        for (var r = 0, s = e.length; r < s; r++)
          si(t, e[r], i, n);
      return this;
    }
    function Xi(t, e) {
      for (var i in t[vt]) {
        var n = i.split(/\d/)[0];
        (!e || e(n)) && si(t, n, null, null, i);
      }
    }
    var oi = {
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      wheel: !("onwheel" in window) && "mousewheel"
    };
    function ri(t, e, i, n) {
      var o = e + _(i) + (n ? "_" + _(n) : "");
      if (t[vt] && t[vt][o])
        return this;
      var r = function(a) {
        return i.call(n || t, a || window.event);
      }, s = r;
      !g.touchNative && g.pointer && e.indexOf("touch") === 0 ? r = ho(t, e, r) : g.touch && e === "dblclick" ? r = vo(t, r) : "addEventListener" in t ? e === "touchstart" || e === "touchmove" || e === "wheel" || e === "mousewheel" ? t.addEventListener(oi[e] || e, r, g.passiveEvents ? { passive: !1 } : !1) : e === "mouseenter" || e === "mouseleave" ? (r = function(a) {
        a = a || window.event, hi(t, a) && s(a);
      }, t.addEventListener(oi[e], r, !1)) : t.addEventListener(e, s, !1) : t.attachEvent("on" + e, r), t[vt] = t[vt] || {}, t[vt][o] = r;
    }
    function si(t, e, i, n, o) {
      o = o || e + _(i) + (n ? "_" + _(n) : "");
      var r = t[vt] && t[vt][o];
      if (!r)
        return this;
      !g.touchNative && g.pointer && e.indexOf("touch") === 0 ? uo(t, e, r) : g.touch && e === "dblclick" ? go(t, r) : "removeEventListener" in t ? t.removeEventListener(oi[e] || e, r, !1) : t.detachEvent("on" + e, r), t[vt][o] = null;
    }
    function At(t) {
      return t.stopPropagation ? t.stopPropagation() : t.originalEvent ? t.originalEvent._stopped = !0 : t.cancelBubble = !0, this;
    }
    function ai(t) {
      return ri(t, "wheel", At), this;
    }
    function oe(t) {
      return C(t, "mousedown touchstart dblclick contextmenu", At), t._leaflet_disable_click = !0, this;
    }
    function nt(t) {
      return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this;
    }
    function Zt(t) {
      return nt(t), At(t), this;
    }
    function Yi(t) {
      if (t.composedPath)
        return t.composedPath();
      for (var e = [], i = t.target; i; )
        e.push(i), i = i.parentNode;
      return e;
    }
    function Ji(t, e) {
      if (!e)
        return new S(t.clientX, t.clientY);
      var i = ni(e), n = i.boundingClientRect;
      return new S(
        // offset.left/top values are in page scale (like clientX/Y),
        // whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
        (t.clientX - n.left) / i.x - e.clientLeft,
        (t.clientY - n.top) / i.y - e.clientTop
      );
    }
    var xo = g.linux && g.chrome ? window.devicePixelRatio : g.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
    function $i(t) {
      return g.edge ? t.wheelDeltaY / 2 : (
        // Don't trust window-geometry-based delta
        t.deltaY && t.deltaMode === 0 ? -t.deltaY / xo : (
          // Pixels
          t.deltaY && t.deltaMode === 1 ? -t.deltaY * 20 : (
            // Lines
            t.deltaY && t.deltaMode === 2 ? -t.deltaY * 60 : (
              // Pages
              t.deltaX || t.deltaZ ? 0 : (
                // Skip horizontal/depth wheel events
                t.wheelDelta ? (t.wheelDeltaY || t.wheelDelta) / 2 : (
                  // Legacy IE pixels
                  t.detail && Math.abs(t.detail) < 32765 ? -t.detail * 20 : (
                    // Legacy Moz lines
                    t.detail ? t.detail / -32765 * 60 : (
                      // Legacy Moz pages
                      0
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
    function hi(t, e) {
      var i = e.relatedTarget;
      if (!i)
        return !0;
      try {
        for (; i && i !== t; )
          i = i.parentNode;
      } catch {
        return !1;
      }
      return i !== t;
    }
    var Po = {
      __proto__: null,
      on: C,
      off: U,
      stopPropagation: At,
      disableScrollPropagation: ai,
      disableClickPropagation: oe,
      preventDefault: nt,
      stop: Zt,
      getPropagationPath: Yi,
      getMousePosition: Ji,
      getWheelDelta: $i,
      isExternalTarget: hi,
      addListener: C,
      removeListener: U
    }, Qi = Yt.extend({
      // @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
      // Run an animation of a given element to a new position, optionally setting
      // duration in seconds (`0.25` by default) and easing linearity factor (3rd
      // argument of the [cubic bezier curve](https://cubic-bezier.com/#0,0,.5,1),
      // `0.5` by default).
      run: function(t, e, i, n) {
        this.stop(), this._el = t, this._inProgress = !0, this._duration = i || 0.25, this._easeOutPower = 1 / Math.max(n || 0.5, 0.2), this._startPos = Ot(t), this._offset = e.subtract(this._startPos), this._startTime = +/* @__PURE__ */ new Date(), this.fire("start"), this._animate();
      },
      // @method stop()
      // Stops the animation (if currently running).
      stop: function() {
        this._inProgress && (this._step(!0), this._complete());
      },
      _animate: function() {
        this._animId = it(this._animate, this), this._step();
      },
      _step: function(t) {
        var e = +/* @__PURE__ */ new Date() - this._startTime, i = this._duration * 1e3;
        e < i ? this._runFrame(this._easeOut(e / i), t) : (this._runFrame(1), this._complete());
      },
      _runFrame: function(t, e) {
        var i = this._startPos.add(this._offset.multiplyBy(t));
        e && i._round(), Y(this._el, i), this.fire("step");
      },
      _complete: function() {
        rt(this._animId), this._inProgress = !1, this.fire("end");
      },
      _easeOut: function(t) {
        return 1 - Math.pow(1 - t, this._easeOutPower);
      }
    }), B = Yt.extend({
      options: {
        // @section Map State Options
        // @option crs: CRS = L.CRS.EPSG3857
        // The [Coordinate Reference System](#crs) to use. Don't change this if you're not
        // sure what it means.
        crs: We,
        // @option center: LatLng = undefined
        // Initial geographic center of the map
        center: void 0,
        // @option zoom: Number = undefined
        // Initial map zoom level
        zoom: void 0,
        // @option minZoom: Number = *
        // Minimum zoom level of the map.
        // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
        // the lowest of their `minZoom` options will be used instead.
        minZoom: void 0,
        // @option maxZoom: Number = *
        // Maximum zoom level of the map.
        // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
        // the highest of their `maxZoom` options will be used instead.
        maxZoom: void 0,
        // @option layers: Layer[] = []
        // Array of layers that will be added to the map initially
        layers: [],
        // @option maxBounds: LatLngBounds = null
        // When this option is set, the map restricts the view to the given
        // geographical bounds, bouncing the user back if the user tries to pan
        // outside the view. To set the restriction dynamically, use
        // [`setMaxBounds`](#map-setmaxbounds) method.
        maxBounds: void 0,
        // @option renderer: Renderer = *
        // The default method for drawing vector layers on the map. `L.SVG`
        // or `L.Canvas` by default depending on browser support.
        renderer: void 0,
        // @section Animation Options
        // @option zoomAnimation: Boolean = true
        // Whether the map zoom animation is enabled. By default it's enabled
        // in all browsers that support CSS3 Transitions except Android.
        zoomAnimation: !0,
        // @option zoomAnimationThreshold: Number = 4
        // Won't animate zoom if the zoom difference exceeds this value.
        zoomAnimationThreshold: 4,
        // @option fadeAnimation: Boolean = true
        // Whether the tile fade animation is enabled. By default it's enabled
        // in all browsers that support CSS3 Transitions except Android.
        fadeAnimation: !0,
        // @option markerZoomAnimation: Boolean = true
        // Whether markers animate their zoom with the zoom animation, if disabled
        // they will disappear for the length of the animation. By default it's
        // enabled in all browsers that support CSS3 Transitions except Android.
        markerZoomAnimation: !0,
        // @option transform3DLimit: Number = 2^23
        // Defines the maximum size of a CSS translation transform. The default
        // value should not be changed unless a web browser positions layers in
        // the wrong place after doing a large `panBy`.
        transform3DLimit: 8388608,
        // Precision limit of a 32-bit float
        // @section Interaction Options
        // @option zoomSnap: Number = 1
        // Forces the map's zoom level to always be a multiple of this, particularly
        // right after a [`fitBounds()`](#map-fitbounds) or a pinch-zoom.
        // By default, the zoom level snaps to the nearest integer; lower values
        // (e.g. `0.5` or `0.1`) allow for greater granularity. A value of `0`
        // means the zoom level will not be snapped after `fitBounds` or a pinch-zoom.
        zoomSnap: 1,
        // @option zoomDelta: Number = 1
        // Controls how much the map's zoom level will change after a
        // [`zoomIn()`](#map-zoomin), [`zoomOut()`](#map-zoomout), pressing `+`
        // or `-` on the keyboard, or using the [zoom controls](#control-zoom).
        // Values smaller than `1` (e.g. `0.5`) allow for greater granularity.
        zoomDelta: 1,
        // @option trackResize: Boolean = true
        // Whether the map automatically handles browser window resize to update itself.
        trackResize: !0
      },
      initialize: function(t, e) {
        e = E(this, e), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(t), this._initLayout(), this._onResize = c(this._onResize, this), this._initEvents(), e.maxBounds && this.setMaxBounds(e.maxBounds), e.zoom !== void 0 && (this._zoom = this._limitZoom(e.zoom)), e.center && e.zoom !== void 0 && this.setView(I(e.center), e.zoom, { reset: !0 }), this.callInitHooks(), this._zoomAnimated = Qt && g.any3d && !g.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), C(this._proxy, Vi, this._catchTransitionEnd, this)), this._addLayers(this.options.layers);
      },
      // @section Methods for modifying map state
      // @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
      // Sets the view of the map (geographical center and zoom) with the given
      // animation options.
      setView: function(t, e, i) {
        if (e = e === void 0 ? this._zoom : this._limitZoom(e), t = this._limitCenter(I(t), e, this.options.maxBounds), i = i || {}, this._stop(), this._loaded && !i.reset && i !== !0) {
          i.animate !== void 0 && (i.zoom = l({ animate: i.animate }, i.zoom), i.pan = l({ animate: i.animate, duration: i.duration }, i.pan));
          var n = this._zoom !== e ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, e, i.zoom) : this._tryAnimatedPan(t, i.pan);
          if (n)
            return clearTimeout(this._sizeTimer), this;
        }
        return this._resetView(t, e, i.pan && i.pan.noMoveStart), this;
      },
      // @method setZoom(zoom: Number, options?: Zoom/pan options): this
      // Sets the zoom of the map.
      setZoom: function(t, e) {
        return this._loaded ? this.setView(this.getCenter(), t, { zoom: e }) : (this._zoom = t, this);
      },
      // @method zoomIn(delta?: Number, options?: Zoom options): this
      // Increases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
      zoomIn: function(t, e) {
        return t = t || (g.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom + t, e);
      },
      // @method zoomOut(delta?: Number, options?: Zoom options): this
      // Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
      zoomOut: function(t, e) {
        return t = t || (g.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom - t, e);
      },
      // @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
      // Zooms the map while keeping a specified geographical point on the map
      // stationary (e.g. used internally for scroll zoom and double-click zoom).
      // @alternative
      // @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
      // Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
      setZoomAround: function(t, e, i) {
        var n = this.getZoomScale(e), o = this.getSize().divideBy(2), r = t instanceof S ? t : this.latLngToContainerPoint(t), s = r.subtract(o).multiplyBy(1 - 1 / n), a = this.containerPointToLatLng(o.add(s));
        return this.setView(a, e, { zoom: i });
      },
      _getBoundsCenterZoom: function(t, e) {
        e = e || {}, t = t.getBounds ? t.getBounds() : X(t);
        var i = M(e.paddingTopLeft || e.padding || [0, 0]), n = M(e.paddingBottomRight || e.padding || [0, 0]), o = this.getBoundsZoom(t, !1, i.add(n));
        if (o = typeof e.maxZoom == "number" ? Math.min(e.maxZoom, o) : o, o === 1 / 0)
          return {
            center: t.getCenter(),
            zoom: o
          };
        var r = n.subtract(i).divideBy(2), s = this.project(t.getSouthWest(), o), a = this.project(t.getNorthEast(), o), u = this.unproject(s.add(a).divideBy(2).add(r), o);
        return {
          center: u,
          zoom: o
        };
      },
      // @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
      // Sets a map view that contains the given geographical bounds with the
      // maximum zoom level possible.
      fitBounds: function(t, e) {
        if (t = X(t), !t.isValid())
          throw new Error("Bounds are not valid.");
        var i = this._getBoundsCenterZoom(t, e);
        return this.setView(i.center, i.zoom, e);
      },
      // @method fitWorld(options?: fitBounds options): this
      // Sets a map view that mostly contains the whole world with the maximum
      // zoom level possible.
      fitWorld: function(t) {
        return this.fitBounds([[-90, -180], [90, 180]], t);
      },
      // @method panTo(latlng: LatLng, options?: Pan options): this
      // Pans the map to a given center.
      panTo: function(t, e) {
        return this.setView(t, this._zoom, { pan: e });
      },
      // @method panBy(offset: Point, options?: Pan options): this
      // Pans the map by a given number of pixels (animated).
      panBy: function(t, e) {
        if (t = M(t).round(), e = e || {}, !t.x && !t.y)
          return this.fire("moveend");
        if (e.animate !== !0 && !this.getSize().contains(t))
          return this._resetView(this.unproject(this.project(this.getCenter()).add(t)), this.getZoom()), this;
        if (this._panAnim || (this._panAnim = new Qi(), this._panAnim.on({
          step: this._onPanTransitionStep,
          end: this._onPanTransitionEnd
        }, this)), e.noMoveStart || this.fire("movestart"), e.animate !== !1) {
          k(this._mapPane, "leaflet-pan-anim");
          var i = this._getMapPanePos().subtract(t).round();
          this._panAnim.run(this._mapPane, i, e.duration || 0.25, e.easeLinearity);
        } else
          this._rawPanBy(t), this.fire("move").fire("moveend");
        return this;
      },
      // @method flyTo(latlng: LatLng, zoom?: Number, options?: Zoom/pan options): this
      // Sets the view of the map (geographical center and zoom) performing a smooth
      // pan-zoom animation.
      flyTo: function(t, e, i) {
        if (i = i || {}, i.animate === !1 || !g.any3d)
          return this.setView(t, e, i);
        this._stop();
        var n = this.project(this.getCenter()), o = this.project(t), r = this.getSize(), s = this._zoom;
        t = I(t), e = e === void 0 ? s : e;
        var a = Math.max(r.x, r.y), u = a * this.getZoomScale(s, e), f = o.distanceTo(n) || 1, m = 1.42, x = m * m;
        function O(J) {
          var Ae = J ? -1 : 1, lr = J ? u : a, cr = u * u - a * a + Ae * x * x * f * f, fr = 2 * lr * x * f, yi = cr / fr, Zn = Math.sqrt(yi * yi + 1) - yi, dr = Zn < 1e-9 ? -18 : Math.log(Zn);
          return dr;
        }
        function ot(J) {
          return (Math.exp(J) - Math.exp(-J)) / 2;
        }
        function et(J) {
          return (Math.exp(J) + Math.exp(-J)) / 2;
        }
        function ft(J) {
          return ot(J) / et(J);
        }
        var ht = O(0);
        function Gt(J) {
          return a * (et(ht) / et(ht + m * J));
        }
        function sr(J) {
          return a * (et(ht) * ft(ht + m * J) - ot(ht)) / x;
        }
        function ar(J) {
          return 1 - Math.pow(1 - J, 1.5);
        }
        var hr = Date.now(), On = (O(1) - ht) / m, ur = i.duration ? 1e3 * i.duration : 1e3 * On * 0.8;
        function An() {
          var J = (Date.now() - hr) / ur, Ae = ar(J) * On;
          J <= 1 ? (this._flyToFrame = it(An, this), this._move(
            this.unproject(n.add(o.subtract(n).multiplyBy(sr(Ae) / f)), s),
            this.getScaleZoom(a / Gt(Ae), s),
            { flyTo: !0 }
          )) : this._move(t, e)._moveEnd(!0);
        }
        return this._moveStart(!0, i.noMoveStart), An.call(this), this;
      },
      // @method flyToBounds(bounds: LatLngBounds, options?: fitBounds options): this
      // Sets the view of the map with a smooth animation like [`flyTo`](#map-flyto),
      // but takes a bounds parameter like [`fitBounds`](#map-fitbounds).
      flyToBounds: function(t, e) {
        var i = this._getBoundsCenterZoom(t, e);
        return this.flyTo(i.center, i.zoom, e);
      },
      // @method setMaxBounds(bounds: LatLngBounds): this
      // Restricts the map view to the given bounds (see the [maxBounds](#map-maxbounds) option).
      setMaxBounds: function(t) {
        return t = X(t), this.listens("moveend", this._panInsideMaxBounds) && this.off("moveend", this._panInsideMaxBounds), t.isValid() ? (this.options.maxBounds = t, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this);
      },
      // @method setMinZoom(zoom: Number): this
      // Sets the lower limit for the available zoom levels (see the [minZoom](#map-minzoom) option).
      setMinZoom: function(t) {
        var e = this.options.minZoom;
        return this.options.minZoom = t, this._loaded && e !== t && (this.fire("zoomlevelschange"), this.getZoom() < this.options.minZoom) ? this.setZoom(t) : this;
      },
      // @method setMaxZoom(zoom: Number): this
      // Sets the upper limit for the available zoom levels (see the [maxZoom](#map-maxzoom) option).
      setMaxZoom: function(t) {
        var e = this.options.maxZoom;
        return this.options.maxZoom = t, this._loaded && e !== t && (this.fire("zoomlevelschange"), this.getZoom() > this.options.maxZoom) ? this.setZoom(t) : this;
      },
      // @method panInsideBounds(bounds: LatLngBounds, options?: Pan options): this
      // Pans the map to the closest view that would lie inside the given bounds (if it's not already), controlling the animation using the options specific, if any.
      panInsideBounds: function(t, e) {
        this._enforcingBounds = !0;
        var i = this.getCenter(), n = this._limitCenter(i, this._zoom, X(t));
        return i.equals(n) || this.panTo(n, e), this._enforcingBounds = !1, this;
      },
      // @method panInside(latlng: LatLng, options?: padding options): this
      // Pans the map the minimum amount to make the `latlng` visible. Use
      // padding options to fit the display to more restricted bounds.
      // If `latlng` is already within the (optionally padded) display bounds,
      // the map will not be panned.
      panInside: function(t, e) {
        e = e || {};
        var i = M(e.paddingTopLeft || e.padding || [0, 0]), n = M(e.paddingBottomRight || e.padding || [0, 0]), o = this.project(this.getCenter()), r = this.project(t), s = this.getPixelBounds(), a = st([s.min.add(i), s.max.subtract(n)]), u = a.getSize();
        if (!a.contains(r)) {
          this._enforcingBounds = !0;
          var f = r.subtract(a.getCenter()), m = a.extend(r).getSize().subtract(u);
          o.x += f.x < 0 ? -m.x : m.x, o.y += f.y < 0 ? -m.y : m.y, this.panTo(this.unproject(o), e), this._enforcingBounds = !1;
        }
        return this;
      },
      // @method invalidateSize(options: Zoom/pan options): this
      // Checks if the map container size changed and updates the map if so —
      // call it after you've changed the map size dynamically, also animating
      // pan by default. If `options.pan` is `false`, panning will not occur.
      // If `options.debounceMoveend` is `true`, it will delay `moveend` event so
      // that it doesn't happen often even if the method is called many
      // times in a row.
      // @alternative
      // @method invalidateSize(animate: Boolean): this
      // Checks if the map container size changed and updates the map if so —
      // call it after you've changed the map size dynamically, also animating
      // pan by default.
      invalidateSize: function(t) {
        if (!this._loaded)
          return this;
        t = l({
          animate: !1,
          pan: !0
        }, t === !0 ? { animate: !0 } : t);
        var e = this.getSize();
        this._sizeChanged = !0, this._lastCenter = null;
        var i = this.getSize(), n = e.divideBy(2).round(), o = i.divideBy(2).round(), r = n.subtract(o);
        return !r.x && !r.y ? this : (t.animate && t.pan ? this.panBy(r) : (t.pan && this._rawPanBy(r), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(c(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
          oldSize: e,
          newSize: i
        }));
      },
      // @section Methods for modifying map state
      // @method stop(): this
      // Stops the currently running `panTo` or `flyTo` animation, if any.
      stop: function() {
        return this.setZoom(this._limitZoom(this._zoom)), this.options.zoomSnap || this.fire("viewreset"), this._stop();
      },
      // @section Geolocation methods
      // @method locate(options?: Locate options): this
      // Tries to locate the user using the Geolocation API, firing a [`locationfound`](#map-locationfound)
      // event with location data on success or a [`locationerror`](#map-locationerror) event on failure,
      // and optionally sets the map view to the user's location with respect to
      // detection accuracy (or to the world view if geolocation failed).
      // Note that, if your page doesn't use HTTPS, this method will fail in
      // modern browsers ([Chrome 50 and newer](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins))
      // See `Locate options` for more details.
      locate: function(t) {
        if (t = this._locateOptions = l({
          timeout: 1e4,
          watch: !1
          // setView: false
          // maxZoom: <Number>
          // maximumAge: 0
          // enableHighAccuracy: false
        }, t), !("geolocation" in navigator))
          return this._handleGeolocationError({
            code: 0,
            message: "Geolocation not supported."
          }), this;
        var e = c(this._handleGeolocationResponse, this), i = c(this._handleGeolocationError, this);
        return t.watch ? this._locationWatchId = navigator.geolocation.watchPosition(e, i, t) : navigator.geolocation.getCurrentPosition(e, i, t), this;
      },
      // @method stopLocate(): this
      // Stops watching location previously initiated by `map.locate({watch: true})`
      // and aborts resetting the map view if map.locate was called with
      // `{setView: true}`.
      stopLocate: function() {
        return navigator.geolocation && navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(this._locationWatchId), this._locateOptions && (this._locateOptions.setView = !1), this;
      },
      _handleGeolocationError: function(t) {
        if (this._container._leaflet_id) {
          var e = t.code, i = t.message || (e === 1 ? "permission denied" : e === 2 ? "position unavailable" : "timeout");
          this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
            code: e,
            message: "Geolocation error: " + i + "."
          });
        }
      },
      _handleGeolocationResponse: function(t) {
        if (this._container._leaflet_id) {
          var e = t.coords.latitude, i = t.coords.longitude, n = new F(e, i), o = n.toBounds(t.coords.accuracy * 2), r = this._locateOptions;
          if (r.setView) {
            var s = this.getBoundsZoom(o);
            this.setView(n, r.maxZoom ? Math.min(s, r.maxZoom) : s);
          }
          var a = {
            latlng: n,
            bounds: o,
            timestamp: t.timestamp
          };
          for (var u in t.coords)
            typeof t.coords[u] == "number" && (a[u] = t.coords[u]);
          this.fire("locationfound", a);
        }
      },
      // TODO Appropriate docs section?
      // @section Other Methods
      // @method addHandler(name: String, HandlerClass: Function): this
      // Adds a new `Handler` to the map, given its name and constructor function.
      addHandler: function(t, e) {
        if (!e)
          return this;
        var i = this[t] = new e(this);
        return this._handlers.push(i), this.options[t] && i.enable(), this;
      },
      // @method remove(): this
      // Destroys the map and clears all related event listeners.
      remove: function() {
        if (this._initEvents(!0), this.options.maxBounds && this.off("moveend", this._panInsideMaxBounds), this._containerId !== this._container._leaflet_id)
          throw new Error("Map container is being reused by another instance");
        try {
          delete this._container._leaflet_id, delete this._containerId;
        } catch {
          this._container._leaflet_id = void 0, this._containerId = void 0;
        }
        this._locationWatchId !== void 0 && this.stopLocate(), this._stop(), V(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest && (rt(this._resizeRequest), this._resizeRequest = null), this._clearHandlers(), this._loaded && this.fire("unload");
        var t;
        for (t in this._layers)
          this._layers[t].remove();
        for (t in this._panes)
          V(this._panes[t]);
        return this._layers = [], this._panes = [], delete this._mapPane, delete this._renderer, this;
      },
      // @section Other Methods
      // @method createPane(name: String, container?: HTMLElement): HTMLElement
      // Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
      // then returns it. The pane is created as a child of `container`, or
      // as a child of the main map pane if not set.
      createPane: function(t, e) {
        var i = "leaflet-pane" + (t ? " leaflet-" + t.replace("Pane", "") + "-pane" : ""), n = N("div", i, e || this._mapPane);
        return t && (this._panes[t] = n), n;
      },
      // @section Methods for Getting Map State
      // @method getCenter(): LatLng
      // Returns the geographical center of the map view
      getCenter: function() {
        return this._checkIfLoaded(), this._lastCenter && !this._moved() ? this._lastCenter.clone() : this.layerPointToLatLng(this._getCenterLayerPoint());
      },
      // @method getZoom(): Number
      // Returns the current zoom level of the map view
      getZoom: function() {
        return this._zoom;
      },
      // @method getBounds(): LatLngBounds
      // Returns the geographical bounds visible in the current map view
      getBounds: function() {
        var t = this.getPixelBounds(), e = this.unproject(t.getBottomLeft()), i = this.unproject(t.getTopRight());
        return new at(e, i);
      },
      // @method getMinZoom(): Number
      // Returns the minimum zoom level of the map (if set in the `minZoom` option of the map or of any layers), or `0` by default.
      getMinZoom: function() {
        return this.options.minZoom === void 0 ? this._layersMinZoom || 0 : this.options.minZoom;
      },
      // @method getMaxZoom(): Number
      // Returns the maximum zoom level of the map (if set in the `maxZoom` option of the map or of any layers).
      getMaxZoom: function() {
        return this.options.maxZoom === void 0 ? this._layersMaxZoom === void 0 ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom;
      },
      // @method getBoundsZoom(bounds: LatLngBounds, inside?: Boolean, padding?: Point): Number
      // Returns the maximum zoom level on which the given bounds fit to the map
      // view in its entirety. If `inside` (optional) is set to `true`, the method
      // instead returns the minimum zoom level on which the map view fits into
      // the given bounds in its entirety.
      getBoundsZoom: function(t, e, i) {
        t = X(t), i = M(i || [0, 0]);
        var n = this.getZoom() || 0, o = this.getMinZoom(), r = this.getMaxZoom(), s = t.getNorthWest(), a = t.getSouthEast(), u = this.getSize().subtract(i), f = st(this.project(a, n), this.project(s, n)).getSize(), m = g.any3d ? this.options.zoomSnap : 1, x = u.x / f.x, O = u.y / f.y, ot = e ? Math.max(x, O) : Math.min(x, O);
        return n = this.getScaleZoom(ot, n), m && (n = Math.round(n / (m / 100)) * (m / 100), n = e ? Math.ceil(n / m) * m : Math.floor(n / m) * m), Math.max(o, Math.min(r, n));
      },
      // @method getSize(): Point
      // Returns the current size of the map container (in pixels).
      getSize: function() {
        return (!this._size || this._sizeChanged) && (this._size = new S(
          this._container.clientWidth || 0,
          this._container.clientHeight || 0
        ), this._sizeChanged = !1), this._size.clone();
      },
      // @method getPixelBounds(): Bounds
      // Returns the bounds of the current map view in projected pixel
      // coordinates (sometimes useful in layer and overlay implementations).
      getPixelBounds: function(t, e) {
        var i = this._getTopLeftPoint(t, e);
        return new j(i, i.add(this.getSize()));
      },
      // TODO: Check semantics - isn't the pixel origin the 0,0 coord relative to
      // the map pane? "left point of the map layer" can be confusing, specially
      // since there can be negative offsets.
      // @method getPixelOrigin(): Point
      // Returns the projected pixel coordinates of the top left point of
      // the map layer (useful in custom layer and overlay implementations).
      getPixelOrigin: function() {
        return this._checkIfLoaded(), this._pixelOrigin;
      },
      // @method getPixelWorldBounds(zoom?: Number): Bounds
      // Returns the world's bounds in pixel coordinates for zoom level `zoom`.
      // If `zoom` is omitted, the map's current zoom level is used.
      getPixelWorldBounds: function(t) {
        return this.options.crs.getProjectedBounds(t === void 0 ? this.getZoom() : t);
      },
      // @section Other Methods
      // @method getPane(pane: String|HTMLElement): HTMLElement
      // Returns a [map pane](#map-pane), given its name or its HTML element (its identity).
      getPane: function(t) {
        return typeof t == "string" ? this._panes[t] : t;
      },
      // @method getPanes(): Object
      // Returns a plain object containing the names of all [panes](#map-pane) as keys and
      // the panes as values.
      getPanes: function() {
        return this._panes;
      },
      // @method getContainer: HTMLElement
      // Returns the HTML element that contains the map.
      getContainer: function() {
        return this._container;
      },
      // @section Conversion Methods
      // @method getZoomScale(toZoom: Number, fromZoom: Number): Number
      // Returns the scale factor to be applied to a map transition from zoom level
      // `fromZoom` to `toZoom`. Used internally to help with zoom animations.
      getZoomScale: function(t, e) {
        var i = this.options.crs;
        return e = e === void 0 ? this._zoom : e, i.scale(t) / i.scale(e);
      },
      // @method getScaleZoom(scale: Number, fromZoom: Number): Number
      // Returns the zoom level that the map would end up at, if it is at `fromZoom`
      // level and everything is scaled by a factor of `scale`. Inverse of
      // [`getZoomScale`](#map-getZoomScale).
      getScaleZoom: function(t, e) {
        var i = this.options.crs;
        e = e === void 0 ? this._zoom : e;
        var n = i.zoom(t * i.scale(e));
        return isNaN(n) ? 1 / 0 : n;
      },
      // @method project(latlng: LatLng, zoom: Number): Point
      // Projects a geographical coordinate `LatLng` according to the projection
      // of the map's CRS, then scales it according to `zoom` and the CRS's
      // `Transformation`. The result is pixel coordinate relative to
      // the CRS origin.
      project: function(t, e) {
        return e = e === void 0 ? this._zoom : e, this.options.crs.latLngToPoint(I(t), e);
      },
      // @method unproject(point: Point, zoom: Number): LatLng
      // Inverse of [`project`](#map-project).
      unproject: function(t, e) {
        return e = e === void 0 ? this._zoom : e, this.options.crs.pointToLatLng(M(t), e);
      },
      // @method layerPointToLatLng(point: Point): LatLng
      // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
      // returns the corresponding geographical coordinate (for the current zoom level).
      layerPointToLatLng: function(t) {
        var e = M(t).add(this.getPixelOrigin());
        return this.unproject(e);
      },
      // @method latLngToLayerPoint(latlng: LatLng): Point
      // Given a geographical coordinate, returns the corresponding pixel coordinate
      // relative to the [origin pixel](#map-getpixelorigin).
      latLngToLayerPoint: function(t) {
        var e = this.project(I(t))._round();
        return e._subtract(this.getPixelOrigin());
      },
      // @method wrapLatLng(latlng: LatLng): LatLng
      // Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
      // map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
      // CRS's bounds.
      // By default this means longitude is wrapped around the dateline so its
      // value is between -180 and +180 degrees.
      wrapLatLng: function(t) {
        return this.options.crs.wrapLatLng(I(t));
      },
      // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
      // Returns a `LatLngBounds` with the same size as the given one, ensuring that
      // its center is within the CRS's bounds.
      // By default this means the center longitude is wrapped around the dateline so its
      // value is between -180 and +180 degrees, and the majority of the bounds
      // overlaps the CRS's bounds.
      wrapLatLngBounds: function(t) {
        return this.options.crs.wrapLatLngBounds(X(t));
      },
      // @method distance(latlng1: LatLng, latlng2: LatLng): Number
      // Returns the distance between two geographical coordinates according to
      // the map's CRS. By default this measures distance in meters.
      distance: function(t, e) {
        return this.options.crs.distance(I(t), I(e));
      },
      // @method containerPointToLayerPoint(point: Point): Point
      // Given a pixel coordinate relative to the map container, returns the corresponding
      // pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
      containerPointToLayerPoint: function(t) {
        return M(t).subtract(this._getMapPanePos());
      },
      // @method layerPointToContainerPoint(point: Point): Point
      // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
      // returns the corresponding pixel coordinate relative to the map container.
      layerPointToContainerPoint: function(t) {
        return M(t).add(this._getMapPanePos());
      },
      // @method containerPointToLatLng(point: Point): LatLng
      // Given a pixel coordinate relative to the map container, returns
      // the corresponding geographical coordinate (for the current zoom level).
      containerPointToLatLng: function(t) {
        var e = this.containerPointToLayerPoint(M(t));
        return this.layerPointToLatLng(e);
      },
      // @method latLngToContainerPoint(latlng: LatLng): Point
      // Given a geographical coordinate, returns the corresponding pixel coordinate
      // relative to the map container.
      latLngToContainerPoint: function(t) {
        return this.layerPointToContainerPoint(this.latLngToLayerPoint(I(t)));
      },
      // @method mouseEventToContainerPoint(ev: MouseEvent): Point
      // Given a MouseEvent object, returns the pixel coordinate relative to the
      // map container where the event took place.
      mouseEventToContainerPoint: function(t) {
        return Ji(t, this._container);
      },
      // @method mouseEventToLayerPoint(ev: MouseEvent): Point
      // Given a MouseEvent object, returns the pixel coordinate relative to
      // the [origin pixel](#map-getpixelorigin) where the event took place.
      mouseEventToLayerPoint: function(t) {
        return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t));
      },
      // @method mouseEventToLatLng(ev: MouseEvent): LatLng
      // Given a MouseEvent object, returns geographical coordinate where the
      // event took place.
      mouseEventToLatLng: function(t) {
        return this.layerPointToLatLng(this.mouseEventToLayerPoint(t));
      },
      // map initialization methods
      _initContainer: function(t) {
        var e = this._container = qi(t);
        if (e) {
          if (e._leaflet_id)
            throw new Error("Map container is already initialized.");
        } else
          throw new Error("Map container not found.");
        C(e, "scroll", this._onScroll, this), this._containerId = _(e);
      },
      _initLayout: function() {
        var t = this._container;
        this._fadeAnimated = this.options.fadeAnimation && g.any3d, k(t, "leaflet-container" + (g.touch ? " leaflet-touch" : "") + (g.retina ? " leaflet-retina" : "") + (g.ielt9 ? " leaflet-oldie" : "") + (g.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
        var e = te(t, "position");
        e !== "absolute" && e !== "relative" && e !== "fixed" && e !== "sticky" && (t.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
      },
      _initPanes: function() {
        var t = this._panes = {};
        this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), Y(this._mapPane, new S(0, 0)), this.createPane("tilePane"), this.createPane("overlayPane"), this.createPane("shadowPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (k(t.markerPane, "leaflet-zoom-hide"), k(t.shadowPane, "leaflet-zoom-hide"));
      },
      // private methods that modify map state
      // @section Map state change events
      _resetView: function(t, e, i) {
        Y(this._mapPane, new S(0, 0));
        var n = !this._loaded;
        this._loaded = !0, e = this._limitZoom(e), this.fire("viewprereset");
        var o = this._zoom !== e;
        this._moveStart(o, i)._move(t, e)._moveEnd(o), this.fire("viewreset"), n && this.fire("load");
      },
      _moveStart: function(t, e) {
        return t && this.fire("zoomstart"), e || this.fire("movestart"), this;
      },
      _move: function(t, e, i, n) {
        e === void 0 && (e = this._zoom);
        var o = this._zoom !== e;
        return this._zoom = e, this._lastCenter = t, this._pixelOrigin = this._getNewPixelOrigin(t), n ? i && i.pinch && this.fire("zoom", i) : ((o || i && i.pinch) && this.fire("zoom", i), this.fire("move", i)), this;
      },
      _moveEnd: function(t) {
        return t && this.fire("zoomend"), this.fire("moveend");
      },
      _stop: function() {
        return rt(this._flyToFrame), this._panAnim && this._panAnim.stop(), this;
      },
      _rawPanBy: function(t) {
        Y(this._mapPane, this._getMapPanePos().subtract(t));
      },
      _getZoomSpan: function() {
        return this.getMaxZoom() - this.getMinZoom();
      },
      _panInsideMaxBounds: function() {
        this._enforcingBounds || this.panInsideBounds(this.options.maxBounds);
      },
      _checkIfLoaded: function() {
        if (!this._loaded)
          throw new Error("Set map center and zoom first.");
      },
      // DOM event handling
      // @section Interaction events
      _initEvents: function(t) {
        this._targets = {}, this._targets[_(this._container)] = this;
        var e = t ? U : C;
        e(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this), this.options.trackResize && e(window, "resize", this._onResize, this), g.any3d && this.options.transform3DLimit && (t ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
      },
      _onResize: function() {
        rt(this._resizeRequest), this._resizeRequest = it(
          function() {
            this.invalidateSize({ debounceMoveend: !0 });
          },
          this
        );
      },
      _onScroll: function() {
        this._container.scrollTop = 0, this._container.scrollLeft = 0;
      },
      _onMoveEnd: function() {
        var t = this._getMapPanePos();
        Math.max(Math.abs(t.x), Math.abs(t.y)) >= this.options.transform3DLimit && this._resetView(this.getCenter(), this.getZoom());
      },
      _findEventTargets: function(t, e) {
        for (var i = [], n, o = e === "mouseout" || e === "mouseover", r = t.target || t.srcElement, s = !1; r; ) {
          if (n = this._targets[_(r)], n && (e === "click" || e === "preclick") && this._draggableMoved(n)) {
            s = !0;
            break;
          }
          if (n && n.listens(e, !0) && (o && !hi(r, t) || (i.push(n), o)) || r === this._container)
            break;
          r = r.parentNode;
        }
        return !i.length && !s && !o && this.listens(e, !0) && (i = [this]), i;
      },
      _isClickDisabled: function(t) {
        for (; t && t !== this._container; ) {
          if (t._leaflet_disable_click)
            return !0;
          t = t.parentNode;
        }
      },
      _handleDOMEvent: function(t) {
        var e = t.target || t.srcElement;
        if (!(!this._loaded || e._leaflet_disable_events || t.type === "click" && this._isClickDisabled(e))) {
          var i = t.type;
          i === "mousedown" && ii(e), this._fireDOMEvent(t, i);
        }
      },
      _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
      _fireDOMEvent: function(t, e, i) {
        if (t.type === "click") {
          var n = l({}, t);
          n.type = "preclick", this._fireDOMEvent(n, n.type, i);
        }
        var o = this._findEventTargets(t, e);
        if (i) {
          for (var r = [], s = 0; s < i.length; s++)
            i[s].listens(e, !0) && r.push(i[s]);
          o = r.concat(o);
        }
        if (o.length) {
          e === "contextmenu" && nt(t);
          var a = o[0], u = {
            originalEvent: t
          };
          if (t.type !== "keypress" && t.type !== "keydown" && t.type !== "keyup") {
            var f = a.getLatLng && (!a._radius || a._radius <= 10);
            u.containerPoint = f ? this.latLngToContainerPoint(a.getLatLng()) : this.mouseEventToContainerPoint(t), u.layerPoint = this.containerPointToLayerPoint(u.containerPoint), u.latlng = f ? a.getLatLng() : this.layerPointToLatLng(u.layerPoint);
          }
          for (s = 0; s < o.length; s++)
            if (o[s].fire(e, u, !0), u.originalEvent._stopped || o[s].options.bubblingMouseEvents === !1 && A(this._mouseEvents, e) !== -1)
              return;
        }
      },
      _draggableMoved: function(t) {
        return t = t.dragging && t.dragging.enabled() ? t : this, t.dragging && t.dragging.moved() || this.boxZoom && this.boxZoom.moved();
      },
      _clearHandlers: function() {
        for (var t = 0, e = this._handlers.length; t < e; t++)
          this._handlers[t].disable();
      },
      // @section Other Methods
      // @method whenReady(fn: Function, context?: Object): this
      // Runs the given function `fn` when the map gets initialized with
      // a view (center and zoom) and at least one layer, or immediately
      // if it's already initialized, optionally passing a function context.
      whenReady: function(t, e) {
        return this._loaded ? t.call(e || this, { target: this }) : this.on("load", t, e), this;
      },
      // private methods for getting map state
      _getMapPanePos: function() {
        return Ot(this._mapPane) || new S(0, 0);
      },
      _moved: function() {
        var t = this._getMapPanePos();
        return t && !t.equals([0, 0]);
      },
      _getTopLeftPoint: function(t, e) {
        var i = t && e !== void 0 ? this._getNewPixelOrigin(t, e) : this.getPixelOrigin();
        return i.subtract(this._getMapPanePos());
      },
      _getNewPixelOrigin: function(t, e) {
        var i = this.getSize()._divideBy(2);
        return this.project(t, e)._subtract(i)._add(this._getMapPanePos())._round();
      },
      _latLngToNewLayerPoint: function(t, e, i) {
        var n = this._getNewPixelOrigin(i, e);
        return this.project(t, e)._subtract(n);
      },
      _latLngBoundsToNewLayerBounds: function(t, e, i) {
        var n = this._getNewPixelOrigin(i, e);
        return st([
          this.project(t.getSouthWest(), e)._subtract(n),
          this.project(t.getNorthWest(), e)._subtract(n),
          this.project(t.getSouthEast(), e)._subtract(n),
          this.project(t.getNorthEast(), e)._subtract(n)
        ]);
      },
      // layer point of the current center
      _getCenterLayerPoint: function() {
        return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
      },
      // offset of the specified place to the current center in pixels
      _getCenterOffset: function(t) {
        return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint());
      },
      // adjust center for view to get inside bounds
      _limitCenter: function(t, e, i) {
        if (!i)
          return t;
        var n = this.project(t, e), o = this.getSize().divideBy(2), r = new j(n.subtract(o), n.add(o)), s = this._getBoundsOffset(r, i, e);
        return Math.abs(s.x) <= 1 && Math.abs(s.y) <= 1 ? t : this.unproject(n.add(s), e);
      },
      // adjust offset for view to get inside bounds
      _limitOffset: function(t, e) {
        if (!e)
          return t;
        var i = this.getPixelBounds(), n = new j(i.min.add(t), i.max.add(t));
        return t.add(this._getBoundsOffset(n, e));
      },
      // returns offset needed for pxBounds to get inside maxBounds at a specified zoom
      _getBoundsOffset: function(t, e, i) {
        var n = st(
          this.project(e.getNorthEast(), i),
          this.project(e.getSouthWest(), i)
        ), o = n.min.subtract(t.min), r = n.max.subtract(t.max), s = this._rebound(o.x, -r.x), a = this._rebound(o.y, -r.y);
        return new S(s, a);
      },
      _rebound: function(t, e) {
        return t + e > 0 ? Math.round(t - e) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(e));
      },
      _limitZoom: function(t) {
        var e = this.getMinZoom(), i = this.getMaxZoom(), n = g.any3d ? this.options.zoomSnap : 1;
        return n && (t = Math.round(t / n) * n), Math.max(e, Math.min(i, t));
      },
      _onPanTransitionStep: function() {
        this.fire("move");
      },
      _onPanTransitionEnd: function() {
        q(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
      },
      _tryAnimatedPan: function(t, e) {
        var i = this._getCenterOffset(t)._trunc();
        return (e && e.animate) !== !0 && !this.getSize().contains(i) ? !1 : (this.panBy(i, e), !0);
      },
      _createAnimProxy: function() {
        var t = this._proxy = N("div", "leaflet-proxy leaflet-zoom-animated");
        this._panes.mapPane.appendChild(t), this.on("zoomanim", function(e) {
          var i = Xe, n = this._proxy.style[i];
          zt(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1)), n === this._proxy.style[i] && this._animatingZoom && this._onZoomTransitionEnd();
        }, this), this.on("load moveend", this._animMoveEnd, this), this._on("unload", this._destroyAnimProxy, this);
      },
      _destroyAnimProxy: function() {
        V(this._proxy), this.off("load moveend", this._animMoveEnd, this), delete this._proxy;
      },
      _animMoveEnd: function() {
        var t = this.getCenter(), e = this.getZoom();
        zt(this._proxy, this.project(t, e), this.getZoomScale(e, 1));
      },
      _catchTransitionEnd: function(t) {
        this._animatingZoom && t.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd();
      },
      _nothingToAnimate: function() {
        return !this._container.getElementsByClassName("leaflet-zoom-animated").length;
      },
      _tryAnimatedZoom: function(t, e, i) {
        if (this._animatingZoom)
          return !0;
        if (i = i || {}, !this._zoomAnimated || i.animate === !1 || this._nothingToAnimate() || Math.abs(e - this._zoom) > this.options.zoomAnimationThreshold)
          return !1;
        var n = this.getZoomScale(e), o = this._getCenterOffset(t)._divideBy(1 - 1 / n);
        return i.animate !== !0 && !this.getSize().contains(o) ? !1 : (it(function() {
          this._moveStart(!0, i.noMoveStart || !1)._animateZoom(t, e, !0);
        }, this), !0);
      },
      _animateZoom: function(t, e, i, n) {
        this._mapPane && (i && (this._animatingZoom = !0, this._animateToCenter = t, this._animateToZoom = e, k(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
          center: t,
          zoom: e,
          noUpdate: n
        }), this._tempFireZoomEvent || (this._tempFireZoomEvent = this._zoom !== this._animateToZoom), this._move(this._animateToCenter, this._animateToZoom, void 0, !0), setTimeout(c(this._onZoomTransitionEnd, this), 250));
      },
      _onZoomTransitionEnd: function() {
        this._animatingZoom && (this._mapPane && q(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(!0));
      }
    });
    function Lo(t, e) {
      return new B(t, e);
    }
    var _t = dt.extend({
      // @section
      // @aka Control Options
      options: {
        // @option position: String = 'topright'
        // The position of the control (one of the map corners). Possible values are `'topleft'`,
        // `'topright'`, `'bottomleft'` or `'bottomright'`
        position: "topright"
      },
      initialize: function(t) {
        E(this, t);
      },
      /* @section
       * Classes extending L.Control will inherit the following methods:
       *
       * @method getPosition: string
       * Returns the position of the control.
       */
      getPosition: function() {
        return this.options.position;
      },
      // @method setPosition(position: string): this
      // Sets the position of the control.
      setPosition: function(t) {
        var e = this._map;
        return e && e.removeControl(this), this.options.position = t, e && e.addControl(this), this;
      },
      // @method getContainer: HTMLElement
      // Returns the HTMLElement that contains the control.
      getContainer: function() {
        return this._container;
      },
      // @method addTo(map: Map): this
      // Adds the control to the given map.
      addTo: function(t) {
        this.remove(), this._map = t;
        var e = this._container = this.onAdd(t), i = this.getPosition(), n = t._controlCorners[i];
        return k(e, "leaflet-control"), i.indexOf("bottom") !== -1 ? n.insertBefore(e, n.firstChild) : n.appendChild(e), this._map.on("unload", this.remove, this), this;
      },
      // @method remove: this
      // Removes the control from the map it is currently active on.
      remove: function() {
        return this._map ? (V(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), this._map = null, this) : this;
      },
      _refocusOnMap: function(t) {
        this._map && t && t.screenX > 0 && t.screenY > 0 && this._map.getContainer().focus();
      }
    }), re = function(t) {
      return new _t(t);
    };
    B.include({
      // @method addControl(control: Control): this
      // Adds the given control to the map
      addControl: function(t) {
        return t.addTo(this), this;
      },
      // @method removeControl(control: Control): this
      // Removes the given control from the map
      removeControl: function(t) {
        return t.remove(), this;
      },
      _initControlPos: function() {
        var t = this._controlCorners = {}, e = "leaflet-", i = this._controlContainer = N("div", e + "control-container", this._container);
        function n(o, r) {
          var s = e + o + " " + e + r;
          t[o + r] = N("div", s, i);
        }
        n("top", "left"), n("top", "right"), n("bottom", "left"), n("bottom", "right");
      },
      _clearControlPos: function() {
        for (var t in this._controlCorners)
          V(this._controlCorners[t]);
        V(this._controlContainer), delete this._controlCorners, delete this._controlContainer;
      }
    });
    var tn = _t.extend({
      // @section
      // @aka Control.Layers options
      options: {
        // @option collapsed: Boolean = true
        // If `true`, the control will be collapsed into an icon and expanded on mouse hover, touch, or keyboard activation.
        collapsed: !0,
        position: "topright",
        // @option autoZIndex: Boolean = true
        // If `true`, the control will assign zIndexes in increasing order to all of its layers so that the order is preserved when switching them on/off.
        autoZIndex: !0,
        // @option hideSingleBase: Boolean = false
        // If `true`, the base layers in the control will be hidden when there is only one.
        hideSingleBase: !1,
        // @option sortLayers: Boolean = false
        // Whether to sort the layers. When `false`, layers will keep the order
        // in which they were added to the control.
        sortLayers: !1,
        // @option sortFunction: Function = *
        // A [compare function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
        // that will be used for sorting the layers, when `sortLayers` is `true`.
        // The function receives both the `L.Layer` instances and their names, as in
        // `sortFunction(layerA, layerB, nameA, nameB)`.
        // By default, it sorts layers alphabetically by their name.
        sortFunction: function(t, e, i, n) {
          return i < n ? -1 : n < i ? 1 : 0;
        }
      },
      initialize: function(t, e, i) {
        E(this, i), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1, this._preventClick = !1;
        for (var n in t)
          this._addLayer(t[n], n);
        for (n in e)
          this._addLayer(e[n], n, !0);
      },
      onAdd: function(t) {
        this._initLayout(), this._update(), this._map = t, t.on("zoomend", this._checkDisabledLayers, this);
        for (var e = 0; e < this._layers.length; e++)
          this._layers[e].layer.on("add remove", this._onLayerChange, this);
        return this._container;
      },
      addTo: function(t) {
        return _t.prototype.addTo.call(this, t), this._expandIfNotCollapsed();
      },
      onRemove: function() {
        this._map.off("zoomend", this._checkDisabledLayers, this);
        for (var t = 0; t < this._layers.length; t++)
          this._layers[t].layer.off("add remove", this._onLayerChange, this);
      },
      // @method addBaseLayer(layer: Layer, name: String): this
      // Adds a base layer (radio button entry) with the given name to the control.
      addBaseLayer: function(t, e) {
        return this._addLayer(t, e), this._map ? this._update() : this;
      },
      // @method addOverlay(layer: Layer, name: String): this
      // Adds an overlay (checkbox entry) with the given name to the control.
      addOverlay: function(t, e) {
        return this._addLayer(t, e, !0), this._map ? this._update() : this;
      },
      // @method removeLayer(layer: Layer): this
      // Remove the given layer from the control.
      removeLayer: function(t) {
        t.off("add remove", this._onLayerChange, this);
        var e = this._getLayer(_(t));
        return e && this._layers.splice(this._layers.indexOf(e), 1), this._map ? this._update() : this;
      },
      // @method expand(): this
      // Expand the control container if collapsed.
      expand: function() {
        k(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
        var t = this._map.getSize().y - (this._container.offsetTop + 50);
        return t < this._section.clientHeight ? (k(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = t + "px") : q(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this;
      },
      // @method collapse(): this
      // Collapse the control container if expanded.
      collapse: function() {
        return q(this._container, "leaflet-control-layers-expanded"), this;
      },
      _initLayout: function() {
        var t = "leaflet-control-layers", e = this._container = N("div", t), i = this.options.collapsed;
        e.setAttribute("aria-haspopup", !0), oe(e), ai(e);
        var n = this._section = N("section", t + "-list");
        i && (this._map.on("click", this.collapse, this), C(e, {
          mouseenter: this._expandSafely,
          mouseleave: this.collapse
        }, this));
        var o = this._layersLink = N("a", t + "-toggle", e);
        o.href = "#", o.title = "Layers", o.setAttribute("role", "button"), C(o, {
          keydown: function(r) {
            r.keyCode === 13 && this._expandSafely();
          },
          // Certain screen readers intercept the key event and instead send a click event
          click: function(r) {
            nt(r), this._expandSafely();
          }
        }, this), i || this.expand(), this._baseLayersList = N("div", t + "-base", n), this._separator = N("div", t + "-separator", n), this._overlaysList = N("div", t + "-overlays", n), e.appendChild(n);
      },
      _getLayer: function(t) {
        for (var e = 0; e < this._layers.length; e++)
          if (this._layers[e] && _(this._layers[e].layer) === t)
            return this._layers[e];
      },
      _addLayer: function(t, e, i) {
        this._map && t.on("add remove", this._onLayerChange, this), this._layers.push({
          layer: t,
          name: e,
          overlay: i
        }), this.options.sortLayers && this._layers.sort(c(function(n, o) {
          return this.options.sortFunction(n.layer, o.layer, n.name, o.name);
        }, this)), this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex)), this._expandIfNotCollapsed();
      },
      _update: function() {
        if (!this._container)
          return this;
        ve(this._baseLayersList), ve(this._overlaysList), this._layerControlInputs = [];
        var t, e, i, n, o = 0;
        for (i = 0; i < this._layers.length; i++)
          n = this._layers[i], this._addItem(n), e = e || n.overlay, t = t || !n.overlay, o += n.overlay ? 0 : 1;
        return this.options.hideSingleBase && (t = t && o > 1, this._baseLayersList.style.display = t ? "" : "none"), this._separator.style.display = e && t ? "" : "none", this;
      },
      _onLayerChange: function(t) {
        this._handlingClick || this._update();
        var e = this._getLayer(_(t.target)), i = e.overlay ? t.type === "add" ? "overlayadd" : "overlayremove" : t.type === "add" ? "baselayerchange" : null;
        i && this._map.fire(i, e);
      },
      // IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see https://stackoverflow.com/a/119079)
      _createRadioElement: function(t, e) {
        var i = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"' + (e ? ' checked="checked"' : "") + "/>", n = document.createElement("div");
        return n.innerHTML = i, n.firstChild;
      },
      _addItem: function(t) {
        var e = document.createElement("label"), i = this._map.hasLayer(t.layer), n;
        t.overlay ? (n = document.createElement("input"), n.type = "checkbox", n.className = "leaflet-control-layers-selector", n.defaultChecked = i) : n = this._createRadioElement("leaflet-base-layers_" + _(this), i), this._layerControlInputs.push(n), n.layerId = _(t.layer), C(n, "click", this._onInputClick, this);
        var o = document.createElement("span");
        o.innerHTML = " " + t.name;
        var r = document.createElement("span");
        e.appendChild(r), r.appendChild(n), r.appendChild(o);
        var s = t.overlay ? this._overlaysList : this._baseLayersList;
        return s.appendChild(e), this._checkDisabledLayers(), e;
      },
      _onInputClick: function() {
        if (!this._preventClick) {
          var t = this._layerControlInputs, e, i, n = [], o = [];
          this._handlingClick = !0;
          for (var r = t.length - 1; r >= 0; r--)
            e = t[r], i = this._getLayer(e.layerId).layer, e.checked ? n.push(i) : e.checked || o.push(i);
          for (r = 0; r < o.length; r++)
            this._map.hasLayer(o[r]) && this._map.removeLayer(o[r]);
          for (r = 0; r < n.length; r++)
            this._map.hasLayer(n[r]) || this._map.addLayer(n[r]);
          this._handlingClick = !1, this._refocusOnMap();
        }
      },
      _checkDisabledLayers: function() {
        for (var t = this._layerControlInputs, e, i, n = this._map.getZoom(), o = t.length - 1; o >= 0; o--)
          e = t[o], i = this._getLayer(e.layerId).layer, e.disabled = i.options.minZoom !== void 0 && n < i.options.minZoom || i.options.maxZoom !== void 0 && n > i.options.maxZoom;
      },
      _expandIfNotCollapsed: function() {
        return this._map && !this.options.collapsed && this.expand(), this;
      },
      _expandSafely: function() {
        var t = this._section;
        this._preventClick = !0, C(t, "click", nt), this.expand();
        var e = this;
        setTimeout(function() {
          U(t, "click", nt), e._preventClick = !1;
        });
      }
    }), bo = function(t, e, i) {
      return new tn(t, e, i);
    }, ui = _t.extend({
      // @section
      // @aka Control.Zoom options
      options: {
        position: "topleft",
        // @option zoomInText: String = '<span aria-hidden="true">+</span>'
        // The text set on the 'zoom in' button.
        zoomInText: '<span aria-hidden="true">+</span>',
        // @option zoomInTitle: String = 'Zoom in'
        // The title set on the 'zoom in' button.
        zoomInTitle: "Zoom in",
        // @option zoomOutText: String = '<span aria-hidden="true">&#x2212;</span>'
        // The text set on the 'zoom out' button.
        zoomOutText: '<span aria-hidden="true">&#x2212;</span>',
        // @option zoomOutTitle: String = 'Zoom out'
        // The title set on the 'zoom out' button.
        zoomOutTitle: "Zoom out"
      },
      onAdd: function(t) {
        var e = "leaflet-control-zoom", i = N("div", e + " leaflet-bar"), n = this.options;
        return this._zoomInButton = this._createButton(
          n.zoomInText,
          n.zoomInTitle,
          e + "-in",
          i,
          this._zoomIn
        ), this._zoomOutButton = this._createButton(
          n.zoomOutText,
          n.zoomOutTitle,
          e + "-out",
          i,
          this._zoomOut
        ), this._updateDisabled(), t.on("zoomend zoomlevelschange", this._updateDisabled, this), i;
      },
      onRemove: function(t) {
        t.off("zoomend zoomlevelschange", this._updateDisabled, this);
      },
      disable: function() {
        return this._disabled = !0, this._updateDisabled(), this;
      },
      enable: function() {
        return this._disabled = !1, this._updateDisabled(), this;
      },
      _zoomIn: function(t) {
        !this._disabled && this._map._zoom < this._map.getMaxZoom() && this._map.zoomIn(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1));
      },
      _zoomOut: function(t) {
        !this._disabled && this._map._zoom > this._map.getMinZoom() && this._map.zoomOut(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1));
      },
      _createButton: function(t, e, i, n, o) {
        var r = N("a", i, n);
        return r.innerHTML = t, r.href = "#", r.title = e, r.setAttribute("role", "button"), r.setAttribute("aria-label", e), oe(r), C(r, "click", Zt), C(r, "click", o, this), C(r, "click", this._refocusOnMap, this), r;
      },
      _updateDisabled: function() {
        var t = this._map, e = "leaflet-disabled";
        q(this._zoomInButton, e), q(this._zoomOutButton, e), this._zoomInButton.setAttribute("aria-disabled", "false"), this._zoomOutButton.setAttribute("aria-disabled", "false"), (this._disabled || t._zoom === t.getMinZoom()) && (k(this._zoomOutButton, e), this._zoomOutButton.setAttribute("aria-disabled", "true")), (this._disabled || t._zoom === t.getMaxZoom()) && (k(this._zoomInButton, e), this._zoomInButton.setAttribute("aria-disabled", "true"));
      }
    });
    B.mergeOptions({
      zoomControl: !0
    }), B.addInitHook(function() {
      this.options.zoomControl && (this.zoomControl = new ui(), this.addControl(this.zoomControl));
    });
    var To = function(t) {
      return new ui(t);
    }, en = _t.extend({
      // @section
      // @aka Control.Scale options
      options: {
        position: "bottomleft",
        // @option maxWidth: Number = 100
        // Maximum width of the control in pixels. The width is set dynamically to show round values (e.g. 100, 200, 500).
        maxWidth: 100,
        // @option metric: Boolean = True
        // Whether to show the metric scale line (m/km).
        metric: !0,
        // @option imperial: Boolean = True
        // Whether to show the imperial scale line (mi/ft).
        imperial: !0
        // @option updateWhenIdle: Boolean = false
        // If `true`, the control is updated on [`moveend`](#map-moveend), otherwise it's always up-to-date (updated on [`move`](#map-move)).
      },
      onAdd: function(t) {
        var e = "leaflet-control-scale", i = N("div", e), n = this.options;
        return this._addScales(n, e + "-line", i), t.on(n.updateWhenIdle ? "moveend" : "move", this._update, this), t.whenReady(this._update, this), i;
      },
      onRemove: function(t) {
        t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
      },
      _addScales: function(t, e, i) {
        t.metric && (this._mScale = N("div", e, i)), t.imperial && (this._iScale = N("div", e, i));
      },
      _update: function() {
        var t = this._map, e = t.getSize().y / 2, i = t.distance(
          t.containerPointToLatLng([0, e]),
          t.containerPointToLatLng([this.options.maxWidth, e])
        );
        this._updateScales(i);
      },
      _updateScales: function(t) {
        this.options.metric && t && this._updateMetric(t), this.options.imperial && t && this._updateImperial(t);
      },
      _updateMetric: function(t) {
        var e = this._getRoundNum(t), i = e < 1e3 ? e + " m" : e / 1e3 + " km";
        this._updateScale(this._mScale, i, e / t);
      },
      _updateImperial: function(t) {
        var e = t * 3.2808399, i, n, o;
        e > 5280 ? (i = e / 5280, n = this._getRoundNum(i), this._updateScale(this._iScale, n + " mi", n / i)) : (o = this._getRoundNum(e), this._updateScale(this._iScale, o + " ft", o / e));
      },
      _updateScale: function(t, e, i) {
        t.style.width = Math.round(this.options.maxWidth * i) + "px", t.innerHTML = e;
      },
      _getRoundNum: function(t) {
        var e = Math.pow(10, (Math.floor(t) + "").length - 1), i = t / e;
        return i = i >= 10 ? 10 : i >= 5 ? 5 : i >= 3 ? 3 : i >= 2 ? 2 : 1, e * i;
      }
    }), Mo = function(t) {
      return new en(t);
    }, So = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>', li = _t.extend({
      // @section
      // @aka Control.Attribution options
      options: {
        position: "bottomright",
        // @option prefix: String|false = 'Leaflet'
        // The HTML text shown before the attributions. Pass `false` to disable.
        prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (g.inlineSvg ? So + " " : "") + "Leaflet</a>"
      },
      initialize: function(t) {
        E(this, t), this._attributions = {};
      },
      onAdd: function(t) {
        t.attributionControl = this, this._container = N("div", "leaflet-control-attribution"), oe(this._container);
        for (var e in t._layers)
          t._layers[e].getAttribution && this.addAttribution(t._layers[e].getAttribution());
        return this._update(), t.on("layeradd", this._addAttribution, this), this._container;
      },
      onRemove: function(t) {
        t.off("layeradd", this._addAttribution, this);
      },
      _addAttribution: function(t) {
        t.layer.getAttribution && (this.addAttribution(t.layer.getAttribution()), t.layer.once("remove", function() {
          this.removeAttribution(t.layer.getAttribution());
        }, this));
      },
      // @method setPrefix(prefix: String|false): this
      // The HTML text shown before the attributions. Pass `false` to disable.
      setPrefix: function(t) {
        return this.options.prefix = t, this._update(), this;
      },
      // @method addAttribution(text: String): this
      // Adds an attribution text (e.g. `'&copy; OpenStreetMap contributors'`).
      addAttribution: function(t) {
        return t ? (this._attributions[t] || (this._attributions[t] = 0), this._attributions[t]++, this._update(), this) : this;
      },
      // @method removeAttribution(text: String): this
      // Removes an attribution text.
      removeAttribution: function(t) {
        return t ? (this._attributions[t] && (this._attributions[t]--, this._update()), this) : this;
      },
      _update: function() {
        if (this._map) {
          var t = [];
          for (var e in this._attributions)
            this._attributions[e] && t.push(e);
          var i = [];
          this.options.prefix && i.push(this.options.prefix), t.length && i.push(t.join(", ")), this._container.innerHTML = i.join(' <span aria-hidden="true">|</span> ');
        }
      }
    });
    B.mergeOptions({
      attributionControl: !0
    }), B.addInitHook(function() {
      this.options.attributionControl && new li().addTo(this);
    });
    var Co = function(t) {
      return new li(t);
    };
    _t.Layers = tn, _t.Zoom = ui, _t.Scale = en, _t.Attribution = li, re.layers = bo, re.zoom = To, re.scale = Mo, re.attribution = Co;
    var gt = dt.extend({
      initialize: function(t) {
        this._map = t;
      },
      // @method enable(): this
      // Enables the handler
      enable: function() {
        return this._enabled ? this : (this._enabled = !0, this.addHooks(), this);
      },
      // @method disable(): this
      // Disables the handler
      disable: function() {
        return this._enabled ? (this._enabled = !1, this.removeHooks(), this) : this;
      },
      // @method enabled(): Boolean
      // Returns `true` if the handler is enabled
      enabled: function() {
        return !!this._enabled;
      }
      // @section Extension methods
      // Classes inheriting from `Handler` must implement the two following methods:
      // @method addHooks()
      // Called when the handler is enabled, should add event hooks.
      // @method removeHooks()
      // Called when the handler is disabled, should remove the event hooks added previously.
    });
    gt.addTo = function(t, e) {
      return t.addHandler(e, this), this;
    };
    var ko = { Events: ut }, nn = g.touch ? "touchstart mousedown" : "mousedown", St = Yt.extend({
      options: {
        // @section
        // @aka Draggable options
        // @option clickTolerance: Number = 3
        // The max number of pixels a user can shift the mouse pointer during a click
        // for it to be considered a valid click (as opposed to a mouse drag).
        clickTolerance: 3
      },
      // @constructor L.Draggable(el: HTMLElement, dragHandle?: HTMLElement, preventOutline?: Boolean, options?: Draggable options)
      // Creates a `Draggable` object for moving `el` when you start dragging the `dragHandle` element (equals `el` itself by default).
      initialize: function(t, e, i, n) {
        E(this, n), this._element = t, this._dragStartTarget = e || t, this._preventOutline = i;
      },
      // @method enable()
      // Enables the dragging ability
      enable: function() {
        this._enabled || (C(this._dragStartTarget, nn, this._onDown, this), this._enabled = !0);
      },
      // @method disable()
      // Disables the dragging ability
      disable: function() {
        this._enabled && (St._dragging === this && this.finishDrag(!0), U(this._dragStartTarget, nn, this._onDown, this), this._enabled = !1, this._moved = !1);
      },
      _onDown: function(t) {
        if (this._enabled && (this._moved = !1, !Ye(this._element, "leaflet-zoom-anim"))) {
          if (t.touches && t.touches.length !== 1) {
            St._dragging === this && this.finishDrag();
            return;
          }
          if (!(St._dragging || t.shiftKey || t.which !== 1 && t.button !== 1 && !t.touches) && (St._dragging = this, this._preventOutline && ii(this._element), Qe(), ee(), !this._moving)) {
            this.fire("down");
            var e = t.touches ? t.touches[0] : t, i = Ki(this._element);
            this._startPoint = new S(e.clientX, e.clientY), this._startPos = Ot(this._element), this._parentScale = ni(i);
            var n = t.type === "mousedown";
            C(document, n ? "mousemove" : "touchmove", this._onMove, this), C(document, n ? "mouseup" : "touchend touchcancel", this._onUp, this);
          }
        }
      },
      _onMove: function(t) {
        if (this._enabled) {
          if (t.touches && t.touches.length > 1) {
            this._moved = !0;
            return;
          }
          var e = t.touches && t.touches.length === 1 ? t.touches[0] : t, i = new S(e.clientX, e.clientY)._subtract(this._startPoint);
          !i.x && !i.y || Math.abs(i.x) + Math.abs(i.y) < this.options.clickTolerance || (i.x /= this._parentScale.x, i.y /= this._parentScale.y, nt(t), this._moved || (this.fire("dragstart"), this._moved = !0, k(document.body, "leaflet-dragging"), this._lastTarget = t.target || t.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), k(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(i), this._moving = !0, this._lastEvent = t, this._updatePosition());
        }
      },
      _updatePosition: function() {
        var t = { originalEvent: this._lastEvent };
        this.fire("predrag", t), Y(this._element, this._newPos), this.fire("drag", t);
      },
      _onUp: function() {
        this._enabled && this.finishDrag();
      },
      finishDrag: function(t) {
        q(document.body, "leaflet-dragging"), this._lastTarget && (q(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null), U(document, "mousemove touchmove", this._onMove, this), U(document, "mouseup touchend touchcancel", this._onUp, this), ti(), ie();
        var e = this._moved && this._moving;
        this._moving = !1, St._dragging = !1, e && this.fire("dragend", {
          noInertia: t,
          distance: this._newPos.distanceTo(this._startPos)
        });
      }
    });
    function on(t, e, i) {
      var n, o = [1, 4, 2, 8], r, s, a, u, f, m, x, O;
      for (r = 0, m = t.length; r < m; r++)
        t[r]._code = It(t[r], e);
      for (a = 0; a < 4; a++) {
        for (x = o[a], n = [], r = 0, m = t.length, s = m - 1; r < m; s = r++)
          u = t[r], f = t[s], u._code & x ? f._code & x || (O = Pe(f, u, x, e, i), O._code = It(O, e), n.push(O)) : (f._code & x && (O = Pe(f, u, x, e, i), O._code = It(O, e), n.push(O)), n.push(u));
        t = n;
      }
      return t;
    }
    function rn(t, e) {
      var i, n, o, r, s, a, u, f, m;
      if (!t || t.length === 0)
        throw new Error("latlngs not passed");
      ct(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
      var x = I([0, 0]), O = X(t), ot = O.getNorthWest().distanceTo(O.getSouthWest()) * O.getNorthEast().distanceTo(O.getNorthWest());
      ot < 1700 && (x = ci(t));
      var et = t.length, ft = [];
      for (i = 0; i < et; i++) {
        var ht = I(t[i]);
        ft.push(e.project(I([ht.lat - x.lat, ht.lng - x.lng])));
      }
      for (a = u = f = 0, i = 0, n = et - 1; i < et; n = i++)
        o = ft[i], r = ft[n], s = o.y * r.x - r.y * o.x, u += (o.x + r.x) * s, f += (o.y + r.y) * s, a += s * 3;
      a === 0 ? m = ft[0] : m = [u / a, f / a];
      var Gt = e.unproject(M(m));
      return I([Gt.lat + x.lat, Gt.lng + x.lng]);
    }
    function ci(t) {
      for (var e = 0, i = 0, n = 0, o = 0; o < t.length; o++) {
        var r = I(t[o]);
        e += r.lat, i += r.lng, n++;
      }
      return I([e / n, i / n]);
    }
    var Eo = {
      __proto__: null,
      clipPolygon: on,
      polygonCenter: rn,
      centroid: ci
    };
    function sn(t, e) {
      if (!e || !t.length)
        return t.slice();
      var i = e * e;
      return t = Ao(t, i), t = Oo(t, i), t;
    }
    function an(t, e, i) {
      return Math.sqrt(se(t, e, i, !0));
    }
    function zo(t, e, i) {
      return se(t, e, i);
    }
    function Oo(t, e) {
      var i = t.length, n = typeof Uint8Array < "u" ? Uint8Array : Array, o = new n(i);
      o[0] = o[i - 1] = 1, fi(t, o, e, 0, i - 1);
      var r, s = [];
      for (r = 0; r < i; r++)
        o[r] && s.push(t[r]);
      return s;
    }
    function fi(t, e, i, n, o) {
      var r = 0, s, a, u;
      for (a = n + 1; a <= o - 1; a++)
        u = se(t[a], t[n], t[o], !0), u > r && (s = a, r = u);
      r > i && (e[s] = 1, fi(t, e, i, n, s), fi(t, e, i, s, o));
    }
    function Ao(t, e) {
      for (var i = [t[0]], n = 1, o = 0, r = t.length; n < r; n++)
        Zo(t[n], t[o]) > e && (i.push(t[n]), o = n);
      return o < r - 1 && i.push(t[r - 1]), i;
    }
    var hn;
    function un(t, e, i, n, o) {
      var r = n ? hn : It(t, i), s = It(e, i), a, u, f;
      for (hn = s; ; ) {
        if (!(r | s))
          return [t, e];
        if (r & s)
          return !1;
        a = r || s, u = Pe(t, e, a, i, o), f = It(u, i), a === r ? (t = u, r = f) : (e = u, s = f);
      }
    }
    function Pe(t, e, i, n, o) {
      var r = e.x - t.x, s = e.y - t.y, a = n.min, u = n.max, f, m;
      return i & 8 ? (f = t.x + r * (u.y - t.y) / s, m = u.y) : i & 4 ? (f = t.x + r * (a.y - t.y) / s, m = a.y) : i & 2 ? (f = u.x, m = t.y + s * (u.x - t.x) / r) : i & 1 && (f = a.x, m = t.y + s * (a.x - t.x) / r), new S(f, m, o);
    }
    function It(t, e) {
      var i = 0;
      return t.x < e.min.x ? i |= 1 : t.x > e.max.x && (i |= 2), t.y < e.min.y ? i |= 4 : t.y > e.max.y && (i |= 8), i;
    }
    function Zo(t, e) {
      var i = e.x - t.x, n = e.y - t.y;
      return i * i + n * n;
    }
    function se(t, e, i, n) {
      var o = e.x, r = e.y, s = i.x - o, a = i.y - r, u = s * s + a * a, f;
      return u > 0 && (f = ((t.x - o) * s + (t.y - r) * a) / u, f > 1 ? (o = i.x, r = i.y) : f > 0 && (o += s * f, r += a * f)), s = t.x - o, a = t.y - r, n ? s * s + a * a : new S(o, r);
    }
    function ct(t) {
      return !P(t[0]) || typeof t[0][0] != "object" && typeof t[0][0] < "u";
    }
    function ln(t) {
      return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), ct(t);
    }
    function cn(t, e) {
      var i, n, o, r, s, a, u, f;
      if (!t || t.length === 0)
        throw new Error("latlngs not passed");
      ct(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
      var m = I([0, 0]), x = X(t), O = x.getNorthWest().distanceTo(x.getSouthWest()) * x.getNorthEast().distanceTo(x.getNorthWest());
      O < 1700 && (m = ci(t));
      var ot = t.length, et = [];
      for (i = 0; i < ot; i++) {
        var ft = I(t[i]);
        et.push(e.project(I([ft.lat - m.lat, ft.lng - m.lng])));
      }
      for (i = 0, n = 0; i < ot - 1; i++)
        n += et[i].distanceTo(et[i + 1]) / 2;
      if (n === 0)
        f = et[0];
      else
        for (i = 0, r = 0; i < ot - 1; i++)
          if (s = et[i], a = et[i + 1], o = s.distanceTo(a), r += o, r > n) {
            u = (r - n) / o, f = [
              a.x - u * (a.x - s.x),
              a.y - u * (a.y - s.y)
            ];
            break;
          }
      var ht = e.unproject(M(f));
      return I([ht.lat + m.lat, ht.lng + m.lng]);
    }
    var Io = {
      __proto__: null,
      simplify: sn,
      pointToSegmentDistance: an,
      closestPointOnSegment: zo,
      clipSegment: un,
      _getEdgeIntersection: Pe,
      _getBitCode: It,
      _sqClosestPointOnSegment: se,
      isFlat: ct,
      _flat: ln,
      polylineCenter: cn
    }, di = {
      project: function(t) {
        return new S(t.lng, t.lat);
      },
      unproject: function(t) {
        return new F(t.y, t.x);
      },
      bounds: new j([-180, -90], [180, 90])
    }, _i = {
      R: 6378137,
      R_MINOR: 6356752314245179e-9,
      bounds: new j([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
      project: function(t) {
        var e = Math.PI / 180, i = this.R, n = t.lat * e, o = this.R_MINOR / i, r = Math.sqrt(1 - o * o), s = r * Math.sin(n), a = Math.tan(Math.PI / 4 - n / 2) / Math.pow((1 - s) / (1 + s), r / 2);
        return n = -i * Math.log(Math.max(a, 1e-10)), new S(t.lng * e * i, n);
      },
      unproject: function(t) {
        for (var e = 180 / Math.PI, i = this.R, n = this.R_MINOR / i, o = Math.sqrt(1 - n * n), r = Math.exp(-t.y / i), s = Math.PI / 2 - 2 * Math.atan(r), a = 0, u = 0.1, f; a < 15 && Math.abs(u) > 1e-7; a++)
          f = o * Math.sin(s), f = Math.pow((1 - f) / (1 + f), o / 2), u = Math.PI / 2 - 2 * Math.atan(r * f) - s, s += u;
        return new F(s * e, t.x * e / i);
      }
    }, Bo = {
      __proto__: null,
      LonLat: di,
      Mercator: _i,
      SphericalMercator: He
    }, No = l({}, Mt, {
      code: "EPSG:3395",
      projection: _i,
      transformation: function() {
        var t = 0.5 / (Math.PI * _i.R);
        return Jt(t, 0.5, -t, 0.5);
      }()
    }), fn = l({}, Mt, {
      code: "EPSG:4326",
      projection: di,
      transformation: Jt(1 / 180, 1, -1 / 180, 0.5)
    }), Ro = l({}, wt, {
      projection: di,
      transformation: Jt(1, 0, -1, 0),
      scale: function(t) {
        return Math.pow(2, t);
      },
      zoom: function(t) {
        return Math.log(t) / Math.LN2;
      },
      distance: function(t, e) {
        var i = e.lng - t.lng, n = e.lat - t.lat;
        return Math.sqrt(i * i + n * n);
      },
      infinite: !0
    });
    wt.Earth = Mt, wt.EPSG3395 = No, wt.EPSG3857 = We, wt.EPSG900913 = Un, wt.EPSG4326 = fn, wt.Simple = Ro;
    var mt = Yt.extend({
      // Classes extending `L.Layer` will inherit the following options:
      options: {
        // @option pane: String = 'overlayPane'
        // By default the layer will be added to the map's [overlay pane](#map-overlaypane). Overriding this option will cause the layer to be placed on another pane by default.
        pane: "overlayPane",
        // @option attribution: String = null
        // String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers.
        attribution: null,
        bubblingMouseEvents: !0
      },
      /* @section
       * Classes extending `L.Layer` will inherit the following methods:
       *
       * @method addTo(map: Map|LayerGroup): this
       * Adds the layer to the given map or layer group.
       */
      addTo: function(t) {
        return t.addLayer(this), this;
      },
      // @method remove: this
      // Removes the layer from the map it is currently active on.
      remove: function() {
        return this.removeFrom(this._map || this._mapToAdd);
      },
      // @method removeFrom(map: Map): this
      // Removes the layer from the given map
      //
      // @alternative
      // @method removeFrom(group: LayerGroup): this
      // Removes the layer from the given `LayerGroup`
      removeFrom: function(t) {
        return t && t.removeLayer(this), this;
      },
      // @method getPane(name? : String): HTMLElement
      // Returns the `HTMLElement` representing the named pane on the map. If `name` is omitted, returns the pane for this layer.
      getPane: function(t) {
        return this._map.getPane(t ? this.options[t] || t : this.options.pane);
      },
      addInteractiveTarget: function(t) {
        return this._map._targets[_(t)] = this, this;
      },
      removeInteractiveTarget: function(t) {
        return delete this._map._targets[_(t)], this;
      },
      // @method getAttribution: String
      // Used by the `attribution control`, returns the [attribution option](#gridlayer-attribution).
      getAttribution: function() {
        return this.options.attribution;
      },
      _layerAdd: function(t) {
        var e = t.target;
        if (e.hasLayer(this)) {
          if (this._map = e, this._zoomAnimated = e._zoomAnimated, this.getEvents) {
            var i = this.getEvents();
            e.on(i, this), this.once("remove", function() {
              e.off(i, this);
            }, this);
          }
          this.onAdd(e), this.fire("add"), e.fire("layeradd", { layer: this });
        }
      }
    });
    B.include({
      // @method addLayer(layer: Layer): this
      // Adds the given layer to the map
      addLayer: function(t) {
        if (!t._layerAdd)
          throw new Error("The provided object is not a Layer.");
        var e = _(t);
        return this._layers[e] ? this : (this._layers[e] = t, t._mapToAdd = this, t.beforeAdd && t.beforeAdd(this), this.whenReady(t._layerAdd, t), this);
      },
      // @method removeLayer(layer: Layer): this
      // Removes the given layer from the map.
      removeLayer: function(t) {
        var e = _(t);
        return this._layers[e] ? (this._loaded && t.onRemove(this), delete this._layers[e], this._loaded && (this.fire("layerremove", { layer: t }), t.fire("remove")), t._map = t._mapToAdd = null, this) : this;
      },
      // @method hasLayer(layer: Layer): Boolean
      // Returns `true` if the given layer is currently added to the map
      hasLayer: function(t) {
        return _(t) in this._layers;
      },
      /* @method eachLayer(fn: Function, context?: Object): this
       * Iterates over the layers of the map, optionally specifying context of the iterator function.
       * ```
       * map.eachLayer(function(layer){
       *     layer.bindPopup('Hello');
       * });
       * ```
       */
      eachLayer: function(t, e) {
        for (var i in this._layers)
          t.call(e, this._layers[i]);
        return this;
      },
      _addLayers: function(t) {
        t = t ? P(t) ? t : [t] : [];
        for (var e = 0, i = t.length; e < i; e++)
          this.addLayer(t[e]);
      },
      _addZoomLimit: function(t) {
        (!isNaN(t.options.maxZoom) || !isNaN(t.options.minZoom)) && (this._zoomBoundLayers[_(t)] = t, this._updateZoomLevels());
      },
      _removeZoomLimit: function(t) {
        var e = _(t);
        this._zoomBoundLayers[e] && (delete this._zoomBoundLayers[e], this._updateZoomLevels());
      },
      _updateZoomLevels: function() {
        var t = 1 / 0, e = -1 / 0, i = this._getZoomSpan();
        for (var n in this._zoomBoundLayers) {
          var o = this._zoomBoundLayers[n].options;
          t = o.minZoom === void 0 ? t : Math.min(t, o.minZoom), e = o.maxZoom === void 0 ? e : Math.max(e, o.maxZoom);
        }
        this._layersMaxZoom = e === -1 / 0 ? void 0 : e, this._layersMinZoom = t === 1 / 0 ? void 0 : t, i !== this._getZoomSpan() && this.fire("zoomlevelschange"), this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom);
      }
    });
    var Dt = mt.extend({
      initialize: function(t, e) {
        E(this, e), this._layers = {};
        var i, n;
        if (t)
          for (i = 0, n = t.length; i < n; i++)
            this.addLayer(t[i]);
      },
      // @method addLayer(layer: Layer): this
      // Adds the given layer to the group.
      addLayer: function(t) {
        var e = this.getLayerId(t);
        return this._layers[e] = t, this._map && this._map.addLayer(t), this;
      },
      // @method removeLayer(layer: Layer): this
      // Removes the given layer from the group.
      // @alternative
      // @method removeLayer(id: Number): this
      // Removes the layer with the given internal ID from the group.
      removeLayer: function(t) {
        var e = t in this._layers ? t : this.getLayerId(t);
        return this._map && this._layers[e] && this._map.removeLayer(this._layers[e]), delete this._layers[e], this;
      },
      // @method hasLayer(layer: Layer): Boolean
      // Returns `true` if the given layer is currently added to the group.
      // @alternative
      // @method hasLayer(id: Number): Boolean
      // Returns `true` if the given internal ID is currently added to the group.
      hasLayer: function(t) {
        var e = typeof t == "number" ? t : this.getLayerId(t);
        return e in this._layers;
      },
      // @method clearLayers(): this
      // Removes all the layers from the group.
      clearLayers: function() {
        return this.eachLayer(this.removeLayer, this);
      },
      // @method invoke(methodName: String, …): this
      // Calls `methodName` on every layer contained in this group, passing any
      // additional parameters. Has no effect if the layers contained do not
      // implement `methodName`.
      invoke: function(t) {
        var e = Array.prototype.slice.call(arguments, 1), i, n;
        for (i in this._layers)
          n = this._layers[i], n[t] && n[t].apply(n, e);
        return this;
      },
      onAdd: function(t) {
        this.eachLayer(t.addLayer, t);
      },
      onRemove: function(t) {
        this.eachLayer(t.removeLayer, t);
      },
      // @method eachLayer(fn: Function, context?: Object): this
      // Iterates over the layers of the group, optionally specifying context of the iterator function.
      // ```js
      // group.eachLayer(function (layer) {
      // 	layer.bindPopup('Hello');
      // });
      // ```
      eachLayer: function(t, e) {
        for (var i in this._layers)
          t.call(e, this._layers[i]);
        return this;
      },
      // @method getLayer(id: Number): Layer
      // Returns the layer with the given internal ID.
      getLayer: function(t) {
        return this._layers[t];
      },
      // @method getLayers(): Layer[]
      // Returns an array of all the layers added to the group.
      getLayers: function() {
        var t = [];
        return this.eachLayer(t.push, t), t;
      },
      // @method setZIndex(zIndex: Number): this
      // Calls `setZIndex` on every layer contained in this group, passing the z-index.
      setZIndex: function(t) {
        return this.invoke("setZIndex", t);
      },
      // @method getLayerId(layer: Layer): Number
      // Returns the internal ID for a layer
      getLayerId: function(t) {
        return _(t);
      }
    }), Do = function(t, e) {
      return new Dt(t, e);
    }, xt = Dt.extend({
      addLayer: function(t) {
        return this.hasLayer(t) ? this : (t.addEventParent(this), Dt.prototype.addLayer.call(this, t), this.fire("layeradd", { layer: t }));
      },
      removeLayer: function(t) {
        return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]), t.removeEventParent(this), Dt.prototype.removeLayer.call(this, t), this.fire("layerremove", { layer: t })) : this;
      },
      // @method setStyle(style: Path options): this
      // Sets the given path options to each layer of the group that has a `setStyle` method.
      setStyle: function(t) {
        return this.invoke("setStyle", t);
      },
      // @method bringToFront(): this
      // Brings the layer group to the top of all other layers
      bringToFront: function() {
        return this.invoke("bringToFront");
      },
      // @method bringToBack(): this
      // Brings the layer group to the back of all other layers
      bringToBack: function() {
        return this.invoke("bringToBack");
      },
      // @method getBounds(): LatLngBounds
      // Returns the LatLngBounds of the Feature Group (created from bounds and coordinates of its children).
      getBounds: function() {
        var t = new at();
        for (var e in this._layers) {
          var i = this._layers[e];
          t.extend(i.getBounds ? i.getBounds() : i.getLatLng());
        }
        return t;
      }
    }), Ho = function(t, e) {
      return new xt(t, e);
    }, Ht = dt.extend({
      /* @section
       * @aka Icon options
       *
       * @option iconUrl: String = null
       * **(required)** The URL to the icon image (absolute or relative to your script path).
       *
       * @option iconRetinaUrl: String = null
       * The URL to a retina sized version of the icon image (absolute or relative to your
       * script path). Used for Retina screen devices.
       *
       * @option iconSize: Point = null
       * Size of the icon image in pixels.
       *
       * @option iconAnchor: Point = null
       * The coordinates of the "tip" of the icon (relative to its top left corner). The icon
       * will be aligned so that this point is at the marker's geographical location. Centered
       * by default if size is specified, also can be set in CSS with negative margins.
       *
       * @option popupAnchor: Point = [0, 0]
       * The coordinates of the point from which popups will "open", relative to the icon anchor.
       *
       * @option tooltipAnchor: Point = [0, 0]
       * The coordinates of the point from which tooltips will "open", relative to the icon anchor.
       *
       * @option shadowUrl: String = null
       * The URL to the icon shadow image. If not specified, no shadow image will be created.
       *
       * @option shadowRetinaUrl: String = null
       *
       * @option shadowSize: Point = null
       * Size of the shadow image in pixels.
       *
       * @option shadowAnchor: Point = null
       * The coordinates of the "tip" of the shadow (relative to its top left corner) (the same
       * as iconAnchor if not specified).
       *
       * @option className: String = ''
       * A custom class name to assign to both icon and shadow images. Empty by default.
       */
      options: {
        popupAnchor: [0, 0],
        tooltipAnchor: [0, 0],
        // @option crossOrigin: Boolean|String = false
        // Whether the crossOrigin attribute will be added to the tiles.
        // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
        // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
        crossOrigin: !1
      },
      initialize: function(t) {
        E(this, t);
      },
      // @method createIcon(oldIcon?: HTMLElement): HTMLElement
      // Called internally when the icon has to be shown, returns a `<img>` HTML element
      // styled according to the options.
      createIcon: function(t) {
        return this._createIcon("icon", t);
      },
      // @method createShadow(oldIcon?: HTMLElement): HTMLElement
      // As `createIcon`, but for the shadow beneath it.
      createShadow: function(t) {
        return this._createIcon("shadow", t);
      },
      _createIcon: function(t, e) {
        var i = this._getIconUrl(t);
        if (!i) {
          if (t === "icon")
            throw new Error("iconUrl not set in Icon options (see the docs).");
          return null;
        }
        var n = this._createImg(i, e && e.tagName === "IMG" ? e : null);
        return this._setIconStyles(n, t), (this.options.crossOrigin || this.options.crossOrigin === "") && (n.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), n;
      },
      _setIconStyles: function(t, e) {
        var i = this.options, n = i[e + "Size"];
        typeof n == "number" && (n = [n, n]);
        var o = M(n), r = M(e === "shadow" && i.shadowAnchor || i.iconAnchor || o && o.divideBy(2, !0));
        t.className = "leaflet-marker-" + e + " " + (i.className || ""), r && (t.style.marginLeft = -r.x + "px", t.style.marginTop = -r.y + "px"), o && (t.style.width = o.x + "px", t.style.height = o.y + "px");
      },
      _createImg: function(t, e) {
        return e = e || document.createElement("img"), e.src = t, e;
      },
      _getIconUrl: function(t) {
        return g.retina && this.options[t + "RetinaUrl"] || this.options[t + "Url"];
      }
    });
    function Fo(t) {
      return new Ht(t);
    }
    var ae = Ht.extend({
      options: {
        iconUrl: "marker-icon.png",
        iconRetinaUrl: "marker-icon-2x.png",
        shadowUrl: "marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      },
      _getIconUrl: function(t) {
        return typeof ae.imagePath != "string" && (ae.imagePath = this._detectIconPath()), (this.options.imagePath || ae.imagePath) + Ht.prototype._getIconUrl.call(this, t);
      },
      _stripUrl: function(t) {
        var e = function(i, n, o) {
          var r = n.exec(i);
          return r && r[o];
        };
        return t = e(t, /^url\((['"])?(.+)\1\)$/, 2), t && e(t, /^(.*)marker-icon\.png$/, 1);
      },
      _detectIconPath: function() {
        var t = N("div", "leaflet-default-icon-path", document.body), e = te(t, "background-image") || te(t, "backgroundImage");
        if (document.body.removeChild(t), e = this._stripUrl(e), e)
          return e;
        var i = document.querySelector('link[href$="leaflet.css"]');
        return i ? i.href.substring(0, i.href.length - 11 - 1) : "";
      }
    }), dn = gt.extend({
      initialize: function(t) {
        this._marker = t;
      },
      addHooks: function() {
        var t = this._marker._icon;
        this._draggable || (this._draggable = new St(t, t, !0)), this._draggable.on({
          dragstart: this._onDragStart,
          predrag: this._onPreDrag,
          drag: this._onDrag,
          dragend: this._onDragEnd
        }, this).enable(), k(t, "leaflet-marker-draggable");
      },
      removeHooks: function() {
        this._draggable.off({
          dragstart: this._onDragStart,
          predrag: this._onPreDrag,
          drag: this._onDrag,
          dragend: this._onDragEnd
        }, this).disable(), this._marker._icon && q(this._marker._icon, "leaflet-marker-draggable");
      },
      moved: function() {
        return this._draggable && this._draggable._moved;
      },
      _adjustPan: function(t) {
        var e = this._marker, i = e._map, n = this._marker.options.autoPanSpeed, o = this._marker.options.autoPanPadding, r = Ot(e._icon), s = i.getPixelBounds(), a = i.getPixelOrigin(), u = st(
          s.min._subtract(a).add(o),
          s.max._subtract(a).subtract(o)
        );
        if (!u.contains(r)) {
          var f = M(
            (Math.max(u.max.x, r.x) - u.max.x) / (s.max.x - u.max.x) - (Math.min(u.min.x, r.x) - u.min.x) / (s.min.x - u.min.x),
            (Math.max(u.max.y, r.y) - u.max.y) / (s.max.y - u.max.y) - (Math.min(u.min.y, r.y) - u.min.y) / (s.min.y - u.min.y)
          ).multiplyBy(n);
          i.panBy(f, { animate: !1 }), this._draggable._newPos._add(f), this._draggable._startPos._add(f), Y(e._icon, this._draggable._newPos), this._onDrag(t), this._panRequest = it(this._adjustPan.bind(this, t));
        }
      },
      _onDragStart: function() {
        this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
      },
      _onPreDrag: function(t) {
        this._marker.options.autoPan && (rt(this._panRequest), this._panRequest = it(this._adjustPan.bind(this, t)));
      },
      _onDrag: function(t) {
        var e = this._marker, i = e._shadow, n = Ot(e._icon), o = e._map.layerPointToLatLng(n);
        i && Y(i, n), e._latlng = o, t.latlng = o, t.oldLatLng = this._oldLatLng, e.fire("move", t).fire("drag", t);
      },
      _onDragEnd: function(t) {
        rt(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", t);
      }
    }), Le = mt.extend({
      // @section
      // @aka Marker options
      options: {
        // @option icon: Icon = *
        // Icon instance to use for rendering the marker.
        // See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
        // If not specified, a common instance of `L.Icon.Default` is used.
        icon: new ae(),
        // Option inherited from "Interactive layer" abstract class
        interactive: !0,
        // @option keyboard: Boolean = true
        // Whether the marker can be tabbed to with a keyboard and clicked by pressing enter.
        keyboard: !0,
        // @option title: String = ''
        // Text for the browser tooltip that appear on marker hover (no tooltip by default).
        // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
        title: "",
        // @option alt: String = 'Marker'
        // Text for the `alt` attribute of the icon image.
        // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
        alt: "Marker",
        // @option zIndexOffset: Number = 0
        // By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like `1000` (or high negative value, respectively).
        zIndexOffset: 0,
        // @option opacity: Number = 1.0
        // The opacity of the marker.
        opacity: 1,
        // @option riseOnHover: Boolean = false
        // If `true`, the marker will get on top of others when you hover the mouse over it.
        riseOnHover: !1,
        // @option riseOffset: Number = 250
        // The z-index offset used for the `riseOnHover` feature.
        riseOffset: 250,
        // @option pane: String = 'markerPane'
        // `Map pane` where the markers icon will be added.
        pane: "markerPane",
        // @option shadowPane: String = 'shadowPane'
        // `Map pane` where the markers shadow will be added.
        shadowPane: "shadowPane",
        // @option bubblingMouseEvents: Boolean = false
        // When `true`, a mouse event on this marker will trigger the same event on the map
        // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
        bubblingMouseEvents: !1,
        // @option autoPanOnFocus: Boolean = true
        // When `true`, the map will pan whenever the marker is focused (via
        // e.g. pressing `tab` on the keyboard) to ensure the marker is
        // visible within the map's bounds
        autoPanOnFocus: !0,
        // @section Draggable marker options
        // @option draggable: Boolean = false
        // Whether the marker is draggable with mouse/touch or not.
        draggable: !1,
        // @option autoPan: Boolean = false
        // Whether to pan the map when dragging this marker near its edge or not.
        autoPan: !1,
        // @option autoPanPadding: Point = Point(50, 50)
        // Distance (in pixels to the left/right and to the top/bottom) of the
        // map edge to start panning the map.
        autoPanPadding: [50, 50],
        // @option autoPanSpeed: Number = 10
        // Number of pixels the map should pan by.
        autoPanSpeed: 10
      },
      /* @section
       *
       * In addition to [shared layer methods](#Layer) like `addTo()` and `remove()` and [popup methods](#Popup) like bindPopup() you can also use the following methods:
       */
      initialize: function(t, e) {
        E(this, e), this._latlng = I(t);
      },
      onAdd: function(t) {
        this._zoomAnimated = this._zoomAnimated && t.options.markerZoomAnimation, this._zoomAnimated && t.on("zoomanim", this._animateZoom, this), this._initIcon(), this.update();
      },
      onRemove: function(t) {
        this.dragging && this.dragging.enabled() && (this.options.draggable = !0, this.dragging.removeHooks()), delete this.dragging, this._zoomAnimated && t.off("zoomanim", this._animateZoom, this), this._removeIcon(), this._removeShadow();
      },
      getEvents: function() {
        return {
          zoom: this.update,
          viewreset: this.update
        };
      },
      // @method getLatLng: LatLng
      // Returns the current geographical position of the marker.
      getLatLng: function() {
        return this._latlng;
      },
      // @method setLatLng(latlng: LatLng): this
      // Changes the marker position to the given point.
      setLatLng: function(t) {
        var e = this._latlng;
        return this._latlng = I(t), this.update(), this.fire("move", { oldLatLng: e, latlng: this._latlng });
      },
      // @method setZIndexOffset(offset: Number): this
      // Changes the [zIndex offset](#marker-zindexoffset) of the marker.
      setZIndexOffset: function(t) {
        return this.options.zIndexOffset = t, this.update();
      },
      // @method getIcon: Icon
      // Returns the current icon used by the marker
      getIcon: function() {
        return this.options.icon;
      },
      // @method setIcon(icon: Icon): this
      // Changes the marker icon.
      setIcon: function(t) {
        return this.options.icon = t, this._map && (this._initIcon(), this.update()), this._popup && this.bindPopup(this._popup, this._popup.options), this;
      },
      getElement: function() {
        return this._icon;
      },
      update: function() {
        if (this._icon && this._map) {
          var t = this._map.latLngToLayerPoint(this._latlng).round();
          this._setPos(t);
        }
        return this;
      },
      _initIcon: function() {
        var t = this.options, e = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"), i = t.icon.createIcon(this._icon), n = !1;
        i !== this._icon && (this._icon && this._removeIcon(), n = !0, t.title && (i.title = t.title), i.tagName === "IMG" && (i.alt = t.alt || "")), k(i, e), t.keyboard && (i.tabIndex = "0", i.setAttribute("role", "button")), this._icon = i, t.riseOnHover && this.on({
          mouseover: this._bringToFront,
          mouseout: this._resetZIndex
        }), this.options.autoPanOnFocus && C(i, "focus", this._panOnFocus, this);
        var o = t.icon.createShadow(this._shadow), r = !1;
        o !== this._shadow && (this._removeShadow(), r = !0), o && (k(o, e), o.alt = ""), this._shadow = o, t.opacity < 1 && this._updateOpacity(), n && this.getPane().appendChild(this._icon), this._initInteraction(), o && r && this.getPane(t.shadowPane).appendChild(this._shadow);
      },
      _removeIcon: function() {
        this.options.riseOnHover && this.off({
          mouseover: this._bringToFront,
          mouseout: this._resetZIndex
        }), this.options.autoPanOnFocus && U(this._icon, "focus", this._panOnFocus, this), V(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null;
      },
      _removeShadow: function() {
        this._shadow && V(this._shadow), this._shadow = null;
      },
      _setPos: function(t) {
        this._icon && Y(this._icon, t), this._shadow && Y(this._shadow, t), this._zIndex = t.y + this.options.zIndexOffset, this._resetZIndex();
      },
      _updateZIndex: function(t) {
        this._icon && (this._icon.style.zIndex = this._zIndex + t);
      },
      _animateZoom: function(t) {
        var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();
        this._setPos(e);
      },
      _initInteraction: function() {
        if (this.options.interactive && (k(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), dn)) {
          var t = this.options.draggable;
          this.dragging && (t = this.dragging.enabled(), this.dragging.disable()), this.dragging = new dn(this), t && this.dragging.enable();
        }
      },
      // @method setOpacity(opacity: Number): this
      // Changes the opacity of the marker.
      setOpacity: function(t) {
        return this.options.opacity = t, this._map && this._updateOpacity(), this;
      },
      _updateOpacity: function() {
        var t = this.options.opacity;
        this._icon && lt(this._icon, t), this._shadow && lt(this._shadow, t);
      },
      _bringToFront: function() {
        this._updateZIndex(this.options.riseOffset);
      },
      _resetZIndex: function() {
        this._updateZIndex(0);
      },
      _panOnFocus: function() {
        var t = this._map;
        if (t) {
          var e = this.options.icon.options, i = e.iconSize ? M(e.iconSize) : M(0, 0), n = e.iconAnchor ? M(e.iconAnchor) : M(0, 0);
          t.panInside(this._latlng, {
            paddingTopLeft: n,
            paddingBottomRight: i.subtract(n)
          });
        }
      },
      _getPopupAnchor: function() {
        return this.options.icon.options.popupAnchor;
      },
      _getTooltipAnchor: function() {
        return this.options.icon.options.tooltipAnchor;
      }
    });
    function Wo(t, e) {
      return new Le(t, e);
    }
    var Ct = mt.extend({
      // @section
      // @aka Path options
      options: {
        // @option stroke: Boolean = true
        // Whether to draw stroke along the path. Set it to `false` to disable borders on polygons or circles.
        stroke: !0,
        // @option color: String = '#3388ff'
        // Stroke color
        color: "#3388ff",
        // @option weight: Number = 3
        // Stroke width in pixels
        weight: 3,
        // @option opacity: Number = 1.0
        // Stroke opacity
        opacity: 1,
        // @option lineCap: String= 'round'
        // A string that defines [shape to be used at the end](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) of the stroke.
        lineCap: "round",
        // @option lineJoin: String = 'round'
        // A string that defines [shape to be used at the corners](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linejoin) of the stroke.
        lineJoin: "round",
        // @option dashArray: String = null
        // A string that defines the stroke [dash pattern](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dasharray). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
        dashArray: null,
        // @option dashOffset: String = null
        // A string that defines the [distance into the dash pattern to start the dash](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dashoffset). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
        dashOffset: null,
        // @option fill: Boolean = depends
        // Whether to fill the path with color. Set it to `false` to disable filling on polygons or circles.
        fill: !1,
        // @option fillColor: String = *
        // Fill color. Defaults to the value of the [`color`](#path-color) option
        fillColor: null,
        // @option fillOpacity: Number = 0.2
        // Fill opacity.
        fillOpacity: 0.2,
        // @option fillRule: String = 'evenodd'
        // A string that defines [how the inside of a shape](https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule) is determined.
        fillRule: "evenodd",
        // className: '',
        // Option inherited from "Interactive layer" abstract class
        interactive: !0,
        // @option bubblingMouseEvents: Boolean = true
        // When `true`, a mouse event on this path will trigger the same event on the map
        // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
        bubblingMouseEvents: !0
      },
      beforeAdd: function(t) {
        this._renderer = t.getRenderer(this);
      },
      onAdd: function() {
        this._renderer._initPath(this), this._reset(), this._renderer._addPath(this);
      },
      onRemove: function() {
        this._renderer._removePath(this);
      },
      // @method redraw(): this
      // Redraws the layer. Sometimes useful after you changed the coordinates that the path uses.
      redraw: function() {
        return this._map && this._renderer._updatePath(this), this;
      },
      // @method setStyle(style: Path options): this
      // Changes the appearance of a Path based on the options in the `Path options` object.
      setStyle: function(t) {
        return E(this, t), this._renderer && (this._renderer._updateStyle(this), this.options.stroke && t && Object.prototype.hasOwnProperty.call(t, "weight") && this._updateBounds()), this;
      },
      // @method bringToFront(): this
      // Brings the layer to the top of all path layers.
      bringToFront: function() {
        return this._renderer && this._renderer._bringToFront(this), this;
      },
      // @method bringToBack(): this
      // Brings the layer to the bottom of all path layers.
      bringToBack: function() {
        return this._renderer && this._renderer._bringToBack(this), this;
      },
      getElement: function() {
        return this._path;
      },
      _reset: function() {
        this._project(), this._update();
      },
      _clickTolerance: function() {
        return (this.options.stroke ? this.options.weight / 2 : 0) + (this._renderer.options.tolerance || 0);
      }
    }), be = Ct.extend({
      // @section
      // @aka CircleMarker options
      options: {
        fill: !0,
        // @option radius: Number = 10
        // Radius of the circle marker, in pixels
        radius: 10
      },
      initialize: function(t, e) {
        E(this, e), this._latlng = I(t), this._radius = this.options.radius;
      },
      // @method setLatLng(latLng: LatLng): this
      // Sets the position of a circle marker to a new location.
      setLatLng: function(t) {
        var e = this._latlng;
        return this._latlng = I(t), this.redraw(), this.fire("move", { oldLatLng: e, latlng: this._latlng });
      },
      // @method getLatLng(): LatLng
      // Returns the current geographical position of the circle marker
      getLatLng: function() {
        return this._latlng;
      },
      // @method setRadius(radius: Number): this
      // Sets the radius of a circle marker. Units are in pixels.
      setRadius: function(t) {
        return this.options.radius = this._radius = t, this.redraw();
      },
      // @method getRadius(): Number
      // Returns the current radius of the circle
      getRadius: function() {
        return this._radius;
      },
      setStyle: function(t) {
        var e = t && t.radius || this._radius;
        return Ct.prototype.setStyle.call(this, t), this.setRadius(e), this;
      },
      _project: function() {
        this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds();
      },
      _updateBounds: function() {
        var t = this._radius, e = this._radiusY || t, i = this._clickTolerance(), n = [t + i, e + i];
        this._pxBounds = new j(this._point.subtract(n), this._point.add(n));
      },
      _update: function() {
        this._map && this._updatePath();
      },
      _updatePath: function() {
        this._renderer._updateCircle(this);
      },
      _empty: function() {
        return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
      },
      // Needed by the `Canvas` renderer for interactivity
      _containsPoint: function(t) {
        return t.distanceTo(this._point) <= this._radius + this._clickTolerance();
      }
    });
    function Uo(t, e) {
      return new be(t, e);
    }
    var mi = be.extend({
      initialize: function(t, e, i) {
        if (typeof e == "number" && (e = l({}, i, { radius: e })), E(this, e), this._latlng = I(t), isNaN(this.options.radius))
          throw new Error("Circle radius cannot be NaN");
        this._mRadius = this.options.radius;
      },
      // @method setRadius(radius: Number): this
      // Sets the radius of a circle. Units are in meters.
      setRadius: function(t) {
        return this._mRadius = t, this.redraw();
      },
      // @method getRadius(): Number
      // Returns the current radius of a circle. Units are in meters.
      getRadius: function() {
        return this._mRadius;
      },
      // @method getBounds(): LatLngBounds
      // Returns the `LatLngBounds` of the path.
      getBounds: function() {
        var t = [this._radius, this._radiusY || this._radius];
        return new at(
          this._map.layerPointToLatLng(this._point.subtract(t)),
          this._map.layerPointToLatLng(this._point.add(t))
        );
      },
      setStyle: Ct.prototype.setStyle,
      _project: function() {
        var t = this._latlng.lng, e = this._latlng.lat, i = this._map, n = i.options.crs;
        if (n.distance === Mt.distance) {
          var o = Math.PI / 180, r = this._mRadius / Mt.R / o, s = i.project([e + r, t]), a = i.project([e - r, t]), u = s.add(a).divideBy(2), f = i.unproject(u).lat, m = Math.acos((Math.cos(r * o) - Math.sin(e * o) * Math.sin(f * o)) / (Math.cos(e * o) * Math.cos(f * o))) / o;
          (isNaN(m) || m === 0) && (m = r / Math.cos(Math.PI / 180 * e)), this._point = u.subtract(i.getPixelOrigin()), this._radius = isNaN(m) ? 0 : u.x - i.project([f, t - m]).x, this._radiusY = u.y - s.y;
        } else {
          var x = n.unproject(n.project(this._latlng).subtract([this._mRadius, 0]));
          this._point = i.latLngToLayerPoint(this._latlng), this._radius = this._point.x - i.latLngToLayerPoint(x).x;
        }
        this._updateBounds();
      }
    });
    function Go(t, e, i) {
      return new mi(t, e, i);
    }
    var Pt = Ct.extend({
      // @section
      // @aka Polyline options
      options: {
        // @option smoothFactor: Number = 1.0
        // How much to simplify the polyline on each zoom level. More means
        // better performance and smoother look, and less means more accurate representation.
        smoothFactor: 1,
        // @option noClip: Boolean = false
        // Disable polyline clipping.
        noClip: !1
      },
      initialize: function(t, e) {
        E(this, e), this._setLatLngs(t);
      },
      // @method getLatLngs(): LatLng[]
      // Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.
      getLatLngs: function() {
        return this._latlngs;
      },
      // @method setLatLngs(latlngs: LatLng[]): this
      // Replaces all the points in the polyline with the given array of geographical points.
      setLatLngs: function(t) {
        return this._setLatLngs(t), this.redraw();
      },
      // @method isEmpty(): Boolean
      // Returns `true` if the Polyline has no LatLngs.
      isEmpty: function() {
        return !this._latlngs.length;
      },
      // @method closestLayerPoint(p: Point): Point
      // Returns the point closest to `p` on the Polyline.
      closestLayerPoint: function(t) {
        for (var e = 1 / 0, i = null, n = se, o, r, s = 0, a = this._parts.length; s < a; s++)
          for (var u = this._parts[s], f = 1, m = u.length; f < m; f++) {
            o = u[f - 1], r = u[f];
            var x = n(t, o, r, !0);
            x < e && (e = x, i = n(t, o, r));
          }
        return i && (i.distance = Math.sqrt(e)), i;
      },
      // @method getCenter(): LatLng
      // Returns the center ([centroid](https://en.wikipedia.org/wiki/Centroid)) of the polyline.
      getCenter: function() {
        if (!this._map)
          throw new Error("Must add layer to map before using getCenter()");
        return cn(this._defaultShape(), this._map.options.crs);
      },
      // @method getBounds(): LatLngBounds
      // Returns the `LatLngBounds` of the path.
      getBounds: function() {
        return this._bounds;
      },
      // @method addLatLng(latlng: LatLng, latlngs?: LatLng[]): this
      // Adds a given point to the polyline. By default, adds to the first ring of
      // the polyline in case of a multi-polyline, but can be overridden by passing
      // a specific ring as a LatLng array (that you can earlier access with [`getLatLngs`](#polyline-getlatlngs)).
      addLatLng: function(t, e) {
        return e = e || this._defaultShape(), t = I(t), e.push(t), this._bounds.extend(t), this.redraw();
      },
      _setLatLngs: function(t) {
        this._bounds = new at(), this._latlngs = this._convertLatLngs(t);
      },
      _defaultShape: function() {
        return ct(this._latlngs) ? this._latlngs : this._latlngs[0];
      },
      // recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
      _convertLatLngs: function(t) {
        for (var e = [], i = ct(t), n = 0, o = t.length; n < o; n++)
          i ? (e[n] = I(t[n]), this._bounds.extend(e[n])) : e[n] = this._convertLatLngs(t[n]);
        return e;
      },
      _project: function() {
        var t = new j();
        this._rings = [], this._projectLatlngs(this._latlngs, this._rings, t), this._bounds.isValid() && t.isValid() && (this._rawPxBounds = t, this._updateBounds());
      },
      _updateBounds: function() {
        var t = this._clickTolerance(), e = new S(t, t);
        this._rawPxBounds && (this._pxBounds = new j([
          this._rawPxBounds.min.subtract(e),
          this._rawPxBounds.max.add(e)
        ]));
      },
      // recursively turns latlngs into a set of rings with projected coordinates
      _projectLatlngs: function(t, e, i) {
        var n = t[0] instanceof F, o = t.length, r, s;
        if (n) {
          for (s = [], r = 0; r < o; r++)
            s[r] = this._map.latLngToLayerPoint(t[r]), i.extend(s[r]);
          e.push(s);
        } else
          for (r = 0; r < o; r++)
            this._projectLatlngs(t[r], e, i);
      },
      // clip polyline by renderer bounds so that we have less to render for performance
      _clipPoints: function() {
        var t = this._renderer._bounds;
        if (this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          var e = this._parts, i, n, o, r, s, a, u;
          for (i = 0, o = 0, r = this._rings.length; i < r; i++)
            for (u = this._rings[i], n = 0, s = u.length; n < s - 1; n++)
              a = un(u[n], u[n + 1], t, n, !0), a && (e[o] = e[o] || [], e[o].push(a[0]), (a[1] !== u[n + 1] || n === s - 2) && (e[o].push(a[1]), o++));
        }
      },
      // simplify each clipped part of the polyline for performance
      _simplifyPoints: function() {
        for (var t = this._parts, e = this.options.smoothFactor, i = 0, n = t.length; i < n; i++)
          t[i] = sn(t[i], e);
      },
      _update: function() {
        this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath());
      },
      _updatePath: function() {
        this._renderer._updatePoly(this);
      },
      // Needed by the `Canvas` renderer for interactivity
      _containsPoint: function(t, e) {
        var i, n, o, r, s, a, u = this._clickTolerance();
        if (!this._pxBounds || !this._pxBounds.contains(t))
          return !1;
        for (i = 0, r = this._parts.length; i < r; i++)
          for (a = this._parts[i], n = 0, s = a.length, o = s - 1; n < s; o = n++)
            if (!(!e && n === 0) && an(t, a[o], a[n]) <= u)
              return !0;
        return !1;
      }
    });
    function jo(t, e) {
      return new Pt(t, e);
    }
    Pt._flat = ln;
    var Ft = Pt.extend({
      options: {
        fill: !0
      },
      isEmpty: function() {
        return !this._latlngs.length || !this._latlngs[0].length;
      },
      // @method getCenter(): LatLng
      // Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the Polygon.
      getCenter: function() {
        if (!this._map)
          throw new Error("Must add layer to map before using getCenter()");
        return rn(this._defaultShape(), this._map.options.crs);
      },
      _convertLatLngs: function(t) {
        var e = Pt.prototype._convertLatLngs.call(this, t), i = e.length;
        return i >= 2 && e[0] instanceof F && e[0].equals(e[i - 1]) && e.pop(), e;
      },
      _setLatLngs: function(t) {
        Pt.prototype._setLatLngs.call(this, t), ct(this._latlngs) && (this._latlngs = [this._latlngs]);
      },
      _defaultShape: function() {
        return ct(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
      },
      _clipPoints: function() {
        var t = this._renderer._bounds, e = this.options.weight, i = new S(e, e);
        if (t = new j(t.min.subtract(i), t.max.add(i)), this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          for (var n = 0, o = this._rings.length, r; n < o; n++)
            r = on(this._rings[n], t, !0), r.length && this._parts.push(r);
        }
      },
      _updatePath: function() {
        this._renderer._updatePoly(this, !0);
      },
      // Needed by the `Canvas` renderer for interactivity
      _containsPoint: function(t) {
        var e = !1, i, n, o, r, s, a, u, f;
        if (!this._pxBounds || !this._pxBounds.contains(t))
          return !1;
        for (r = 0, u = this._parts.length; r < u; r++)
          for (i = this._parts[r], s = 0, f = i.length, a = f - 1; s < f; a = s++)
            n = i[s], o = i[a], n.y > t.y != o.y > t.y && t.x < (o.x - n.x) * (t.y - n.y) / (o.y - n.y) + n.x && (e = !e);
        return e || Pt.prototype._containsPoint.call(this, t, !0);
      }
    });
    function Vo(t, e) {
      return new Ft(t, e);
    }
    var Lt = xt.extend({
      /* @section
       * @aka GeoJSON options
       *
       * @option pointToLayer: Function = *
       * A `Function` defining how GeoJSON points spawn Leaflet layers. It is internally
       * called when data is added, passing the GeoJSON point feature and its `LatLng`.
       * The default is to spawn a default `Marker`:
       * ```js
       * function(geoJsonPoint, latlng) {
       * 	return L.marker(latlng);
       * }
       * ```
       *
       * @option style: Function = *
       * A `Function` defining the `Path options` for styling GeoJSON lines and polygons,
       * called internally when data is added.
       * The default value is to not override any defaults:
       * ```js
       * function (geoJsonFeature) {
       * 	return {}
       * }
       * ```
       *
       * @option onEachFeature: Function = *
       * A `Function` that will be called once for each created `Feature`, after it has
       * been created and styled. Useful for attaching events and popups to features.
       * The default is to do nothing with the newly created layers:
       * ```js
       * function (feature, layer) {}
       * ```
       *
       * @option filter: Function = *
       * A `Function` that will be used to decide whether to include a feature or not.
       * The default is to include all features:
       * ```js
       * function (geoJsonFeature) {
       * 	return true;
       * }
       * ```
       * Note: dynamically changing the `filter` option will have effect only on newly
       * added data. It will _not_ re-evaluate already included features.
       *
       * @option coordsToLatLng: Function = *
       * A `Function` that will be used for converting GeoJSON coordinates to `LatLng`s.
       * The default is the `coordsToLatLng` static method.
       *
       * @option markersInheritOptions: Boolean = false
       * Whether default Markers for "Point" type Features inherit from group options.
       */
      initialize: function(t, e) {
        E(this, e), this._layers = {}, t && this.addData(t);
      },
      // @method addData( <GeoJSON> data ): this
      // Adds a GeoJSON object to the layer.
      addData: function(t) {
        var e = P(t) ? t : t.features, i, n, o;
        if (e) {
          for (i = 0, n = e.length; i < n; i++)
            o = e[i], (o.geometries || o.geometry || o.features || o.coordinates) && this.addData(o);
          return this;
        }
        var r = this.options;
        if (r.filter && !r.filter(t))
          return this;
        var s = Te(t, r);
        return s ? (s.feature = Ce(t), s.defaultOptions = s.options, this.resetStyle(s), r.onEachFeature && r.onEachFeature(t, s), this.addLayer(s)) : this;
      },
      // @method resetStyle( <Path> layer? ): this
      // Resets the given vector layer's style to the original GeoJSON style, useful for resetting style after hover events.
      // If `layer` is omitted, the style of all features in the current layer is reset.
      resetStyle: function(t) {
        return t === void 0 ? this.eachLayer(this.resetStyle, this) : (t.options = l({}, t.defaultOptions), this._setLayerStyle(t, this.options.style), this);
      },
      // @method setStyle( <Function> style ): this
      // Changes styles of GeoJSON vector layers with the given style function.
      setStyle: function(t) {
        return this.eachLayer(function(e) {
          this._setLayerStyle(e, t);
        }, this);
      },
      _setLayerStyle: function(t, e) {
        t.setStyle && (typeof e == "function" && (e = e(t.feature)), t.setStyle(e));
      }
    });
    function Te(t, e) {
      var i = t.type === "Feature" ? t.geometry : t, n = i ? i.coordinates : null, o = [], r = e && e.pointToLayer, s = e && e.coordsToLatLng || pi, a, u, f, m;
      if (!n && !i)
        return null;
      switch (i.type) {
        case "Point":
          return a = s(n), _n(r, t, a, e);
        case "MultiPoint":
          for (f = 0, m = n.length; f < m; f++)
            a = s(n[f]), o.push(_n(r, t, a, e));
          return new xt(o);
        case "LineString":
        case "MultiLineString":
          return u = Me(n, i.type === "LineString" ? 0 : 1, s), new Pt(u, e);
        case "Polygon":
        case "MultiPolygon":
          return u = Me(n, i.type === "Polygon" ? 1 : 2, s), new Ft(u, e);
        case "GeometryCollection":
          for (f = 0, m = i.geometries.length; f < m; f++) {
            var x = Te({
              geometry: i.geometries[f],
              type: "Feature",
              properties: t.properties
            }, e);
            x && o.push(x);
          }
          return new xt(o);
        case "FeatureCollection":
          for (f = 0, m = i.features.length; f < m; f++) {
            var O = Te(i.features[f], e);
            O && o.push(O);
          }
          return new xt(o);
        default:
          throw new Error("Invalid GeoJSON object.");
      }
    }
    function _n(t, e, i, n) {
      return t ? t(e, i) : new Le(i, n && n.markersInheritOptions && n);
    }
    function pi(t) {
      return new F(t[1], t[0], t[2]);
    }
    function Me(t, e, i) {
      for (var n = [], o = 0, r = t.length, s; o < r; o++)
        s = e ? Me(t[o], e - 1, i) : (i || pi)(t[o]), n.push(s);
      return n;
    }
    function vi(t, e) {
      return t = I(t), t.alt !== void 0 ? [R(t.lng, e), R(t.lat, e), R(t.alt, e)] : [R(t.lng, e), R(t.lat, e)];
    }
    function Se(t, e, i, n) {
      for (var o = [], r = 0, s = t.length; r < s; r++)
        o.push(e ? Se(t[r], ct(t[r]) ? 0 : e - 1, i, n) : vi(t[r], n));
      return !e && i && o.length > 0 && o.push(o[0].slice()), o;
    }
    function Wt(t, e) {
      return t.feature ? l({}, t.feature, { geometry: e }) : Ce(e);
    }
    function Ce(t) {
      return t.type === "Feature" || t.type === "FeatureCollection" ? t : {
        type: "Feature",
        properties: {},
        geometry: t
      };
    }
    var gi = {
      toGeoJSON: function(t) {
        return Wt(this, {
          type: "Point",
          coordinates: vi(this.getLatLng(), t)
        });
      }
    };
    Le.include(gi), mi.include(gi), be.include(gi), Pt.include({
      toGeoJSON: function(t) {
        var e = !ct(this._latlngs), i = Se(this._latlngs, e ? 1 : 0, !1, t);
        return Wt(this, {
          type: (e ? "Multi" : "") + "LineString",
          coordinates: i
        });
      }
    }), Ft.include({
      toGeoJSON: function(t) {
        var e = !ct(this._latlngs), i = e && !ct(this._latlngs[0]), n = Se(this._latlngs, i ? 2 : e ? 1 : 0, !0, t);
        return e || (n = [n]), Wt(this, {
          type: (i ? "Multi" : "") + "Polygon",
          coordinates: n
        });
      }
    }), Dt.include({
      toMultiPoint: function(t) {
        var e = [];
        return this.eachLayer(function(i) {
          e.push(i.toGeoJSON(t).geometry.coordinates);
        }), Wt(this, {
          type: "MultiPoint",
          coordinates: e
        });
      },
      // @method toGeoJSON(precision?: Number|false): Object
      // Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
      // Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the layer group (as a GeoJSON `FeatureCollection`, `GeometryCollection`, or `MultiPoint`).
      toGeoJSON: function(t) {
        var e = this.feature && this.feature.geometry && this.feature.geometry.type;
        if (e === "MultiPoint")
          return this.toMultiPoint(t);
        var i = e === "GeometryCollection", n = [];
        return this.eachLayer(function(o) {
          if (o.toGeoJSON) {
            var r = o.toGeoJSON(t);
            if (i)
              n.push(r.geometry);
            else {
              var s = Ce(r);
              s.type === "FeatureCollection" ? n.push.apply(n, s.features) : n.push(s);
            }
          }
        }), i ? Wt(this, {
          geometries: n,
          type: "GeometryCollection"
        }) : {
          type: "FeatureCollection",
          features: n
        };
      }
    });
    function mn(t, e) {
      return new Lt(t, e);
    }
    var qo = mn, ke = mt.extend({
      // @section
      // @aka ImageOverlay options
      options: {
        // @option opacity: Number = 1.0
        // The opacity of the image overlay.
        opacity: 1,
        // @option alt: String = ''
        // Text for the `alt` attribute of the image (useful for accessibility).
        alt: "",
        // @option interactive: Boolean = false
        // If `true`, the image overlay will emit [mouse events](#interactive-layer) when clicked or hovered.
        interactive: !1,
        // @option crossOrigin: Boolean|String = false
        // Whether the crossOrigin attribute will be added to the image.
        // If a String is provided, the image will have its crossOrigin attribute set to the String provided. This is needed if you want to access image pixel data.
        // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
        crossOrigin: !1,
        // @option errorOverlayUrl: String = ''
        // URL to the overlay image to show in place of the overlay that failed to load.
        errorOverlayUrl: "",
        // @option zIndex: Number = 1
        // The explicit [zIndex](https://developer.mozilla.org/docs/Web/CSS/CSS_Positioning/Understanding_z_index) of the overlay layer.
        zIndex: 1,
        // @option className: String = ''
        // A custom class name to assign to the image. Empty by default.
        className: ""
      },
      initialize: function(t, e, i) {
        this._url = t, this._bounds = X(e), E(this, i);
      },
      onAdd: function() {
        this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (k(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset();
      },
      onRemove: function() {
        V(this._image), this.options.interactive && this.removeInteractiveTarget(this._image);
      },
      // @method setOpacity(opacity: Number): this
      // Sets the opacity of the overlay.
      setOpacity: function(t) {
        return this.options.opacity = t, this._image && this._updateOpacity(), this;
      },
      setStyle: function(t) {
        return t.opacity && this.setOpacity(t.opacity), this;
      },
      // @method bringToFront(): this
      // Brings the layer to the top of all overlays.
      bringToFront: function() {
        return this._map && Nt(this._image), this;
      },
      // @method bringToBack(): this
      // Brings the layer to the bottom of all overlays.
      bringToBack: function() {
        return this._map && Rt(this._image), this;
      },
      // @method setUrl(url: String): this
      // Changes the URL of the image.
      setUrl: function(t) {
        return this._url = t, this._image && (this._image.src = t), this;
      },
      // @method setBounds(bounds: LatLngBounds): this
      // Update the bounds that this ImageOverlay covers
      setBounds: function(t) {
        return this._bounds = X(t), this._map && this._reset(), this;
      },
      getEvents: function() {
        var t = {
          zoom: this._reset,
          viewreset: this._reset
        };
        return this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
      },
      // @method setZIndex(value: Number): this
      // Changes the [zIndex](#imageoverlay-zindex) of the image overlay.
      setZIndex: function(t) {
        return this.options.zIndex = t, this._updateZIndex(), this;
      },
      // @method getBounds(): LatLngBounds
      // Get the bounds that this ImageOverlay covers
      getBounds: function() {
        return this._bounds;
      },
      // @method getElement(): HTMLElement
      // Returns the instance of [`HTMLImageElement`](https://developer.mozilla.org/docs/Web/API/HTMLImageElement)
      // used by this overlay.
      getElement: function() {
        return this._image;
      },
      _initImage: function() {
        var t = this._url.tagName === "IMG", e = this._image = t ? this._url : N("img");
        if (k(e, "leaflet-image-layer"), this._zoomAnimated && k(e, "leaflet-zoom-animated"), this.options.className && k(e, this.options.className), e.onselectstart = T, e.onmousemove = T, e.onload = c(this.fire, this, "load"), e.onerror = c(this._overlayOnError, this, "error"), (this.options.crossOrigin || this.options.crossOrigin === "") && (e.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), t) {
          this._url = e.src;
          return;
        }
        e.src = this._url, e.alt = this.options.alt;
      },
      _animateZoom: function(t) {
        var e = this._map.getZoomScale(t.zoom), i = this._map._latLngBoundsToNewLayerBounds(this._bounds, t.zoom, t.center).min;
        zt(this._image, i, e);
      },
      _reset: function() {
        var t = this._image, e = new j(
          this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
          this._map.latLngToLayerPoint(this._bounds.getSouthEast())
        ), i = e.getSize();
        Y(t, e.min), t.style.width = i.x + "px", t.style.height = i.y + "px";
      },
      _updateOpacity: function() {
        lt(this._image, this.options.opacity);
      },
      _updateZIndex: function() {
        this._image && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._image.style.zIndex = this.options.zIndex);
      },
      _overlayOnError: function() {
        this.fire("error");
        var t = this.options.errorOverlayUrl;
        t && this._url !== t && (this._url = t, this._image.src = t);
      },
      // @method getCenter(): LatLng
      // Returns the center of the ImageOverlay.
      getCenter: function() {
        return this._bounds.getCenter();
      }
    }), Ko = function(t, e, i) {
      return new ke(t, e, i);
    }, pn = ke.extend({
      // @section
      // @aka VideoOverlay options
      options: {
        // @option autoplay: Boolean = true
        // Whether the video starts playing automatically when loaded.
        // On some browsers autoplay will only work with `muted: true`
        autoplay: !0,
        // @option loop: Boolean = true
        // Whether the video will loop back to the beginning when played.
        loop: !0,
        // @option keepAspectRatio: Boolean = true
        // Whether the video will save aspect ratio after the projection.
        // Relevant for supported browsers. See [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
        keepAspectRatio: !0,
        // @option muted: Boolean = false
        // Whether the video starts on mute when loaded.
        muted: !1,
        // @option playsInline: Boolean = true
        // Mobile browsers will play the video right where it is instead of open it up in fullscreen mode.
        playsInline: !0
      },
      _initImage: function() {
        var t = this._url.tagName === "VIDEO", e = this._image = t ? this._url : N("video");
        if (k(e, "leaflet-image-layer"), this._zoomAnimated && k(e, "leaflet-zoom-animated"), this.options.className && k(e, this.options.className), e.onselectstart = T, e.onmousemove = T, e.onloadeddata = c(this.fire, this, "load"), t) {
          for (var i = e.getElementsByTagName("source"), n = [], o = 0; o < i.length; o++)
            n.push(i[o].src);
          this._url = i.length > 0 ? n : [e.src];
          return;
        }
        P(this._url) || (this._url = [this._url]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(e.style, "objectFit") && (e.style.objectFit = "fill"), e.autoplay = !!this.options.autoplay, e.loop = !!this.options.loop, e.muted = !!this.options.muted, e.playsInline = !!this.options.playsInline;
        for (var r = 0; r < this._url.length; r++) {
          var s = N("source");
          s.src = this._url[r], e.appendChild(s);
        }
      }
      // @method getElement(): HTMLVideoElement
      // Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
      // used by this overlay.
    });
    function Xo(t, e, i) {
      return new pn(t, e, i);
    }
    var vn = ke.extend({
      _initImage: function() {
        var t = this._image = this._url;
        k(t, "leaflet-image-layer"), this._zoomAnimated && k(t, "leaflet-zoom-animated"), this.options.className && k(t, this.options.className), t.onselectstart = T, t.onmousemove = T;
      }
      // @method getElement(): SVGElement
      // Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
      // used by this overlay.
    });
    function Yo(t, e, i) {
      return new vn(t, e, i);
    }
    var yt = mt.extend({
      // @section
      // @aka DivOverlay options
      options: {
        // @option interactive: Boolean = false
        // If true, the popup/tooltip will listen to the mouse events.
        interactive: !1,
        // @option offset: Point = Point(0, 0)
        // The offset of the overlay position.
        offset: [0, 0],
        // @option className: String = ''
        // A custom CSS class name to assign to the overlay.
        className: "",
        // @option pane: String = undefined
        // `Map pane` where the overlay will be added.
        pane: void 0,
        // @option content: String|HTMLElement|Function = ''
        // Sets the HTML content of the overlay while initializing. If a function is passed the source layer will be
        // passed to the function. The function should return a `String` or `HTMLElement` to be used in the overlay.
        content: ""
      },
      initialize: function(t, e) {
        t && (t instanceof F || P(t)) ? (this._latlng = I(t), E(this, e)) : (E(this, t), this._source = e), this.options.content && (this._content = this.options.content);
      },
      // @method openOn(map: Map): this
      // Adds the overlay to the map.
      // Alternative to `map.openPopup(popup)`/`.openTooltip(tooltip)`.
      openOn: function(t) {
        return t = arguments.length ? t : this._source._map, t.hasLayer(this) || t.addLayer(this), this;
      },
      // @method close(): this
      // Closes the overlay.
      // Alternative to `map.closePopup(popup)`/`.closeTooltip(tooltip)`
      // and `layer.closePopup()`/`.closeTooltip()`.
      close: function() {
        return this._map && this._map.removeLayer(this), this;
      },
      // @method toggle(layer?: Layer): this
      // Opens or closes the overlay bound to layer depending on its current state.
      // Argument may be omitted only for overlay bound to layer.
      // Alternative to `layer.togglePopup()`/`.toggleTooltip()`.
      toggle: function(t) {
        return this._map ? this.close() : (arguments.length ? this._source = t : t = this._source, this._prepareOpen(), this.openOn(t._map)), this;
      },
      onAdd: function(t) {
        this._zoomAnimated = t._zoomAnimated, this._container || this._initLayout(), t._fadeAnimated && lt(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), t._fadeAnimated && lt(this._container, 1), this.bringToFront(), this.options.interactive && (k(this._container, "leaflet-interactive"), this.addInteractiveTarget(this._container));
      },
      onRemove: function(t) {
        t._fadeAnimated ? (lt(this._container, 0), this._removeTimeout = setTimeout(c(V, void 0, this._container), 200)) : V(this._container), this.options.interactive && (q(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container));
      },
      // @namespace DivOverlay
      // @method getLatLng: LatLng
      // Returns the geographical point of the overlay.
      getLatLng: function() {
        return this._latlng;
      },
      // @method setLatLng(latlng: LatLng): this
      // Sets the geographical point where the overlay will open.
      setLatLng: function(t) {
        return this._latlng = I(t), this._map && (this._updatePosition(), this._adjustPan()), this;
      },
      // @method getContent: String|HTMLElement
      // Returns the content of the overlay.
      getContent: function() {
        return this._content;
      },
      // @method setContent(htmlContent: String|HTMLElement|Function): this
      // Sets the HTML content of the overlay. If a function is passed the source layer will be passed to the function.
      // The function should return a `String` or `HTMLElement` to be used in the overlay.
      setContent: function(t) {
        return this._content = t, this.update(), this;
      },
      // @method getElement: String|HTMLElement
      // Returns the HTML container of the overlay.
      getElement: function() {
        return this._container;
      },
      // @method update: null
      // Updates the overlay content, layout and position. Useful for updating the overlay after something inside changed, e.g. image loaded.
      update: function() {
        this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan());
      },
      getEvents: function() {
        var t = {
          zoom: this._updatePosition,
          viewreset: this._updatePosition
        };
        return this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
      },
      // @method isOpen: Boolean
      // Returns `true` when the overlay is visible on the map.
      isOpen: function() {
        return !!this._map && this._map.hasLayer(this);
      },
      // @method bringToFront: this
      // Brings this overlay in front of other overlays (in the same map pane).
      bringToFront: function() {
        return this._map && Nt(this._container), this;
      },
      // @method bringToBack: this
      // Brings this overlay to the back of other overlays (in the same map pane).
      bringToBack: function() {
        return this._map && Rt(this._container), this;
      },
      // prepare bound overlay to open: update latlng pos / content source (for FeatureGroup)
      _prepareOpen: function(t) {
        var e = this._source;
        if (!e._map)
          return !1;
        if (e instanceof xt) {
          e = null;
          var i = this._source._layers;
          for (var n in i)
            if (i[n]._map) {
              e = i[n];
              break;
            }
          if (!e)
            return !1;
          this._source = e;
        }
        if (!t)
          if (e.getCenter)
            t = e.getCenter();
          else if (e.getLatLng)
            t = e.getLatLng();
          else if (e.getBounds)
            t = e.getBounds().getCenter();
          else
            throw new Error("Unable to get source layer LatLng.");
        return this.setLatLng(t), this._map && this.update(), !0;
      },
      _updateContent: function() {
        if (this._content) {
          var t = this._contentNode, e = typeof this._content == "function" ? this._content(this._source || this) : this._content;
          if (typeof e == "string")
            t.innerHTML = e;
          else {
            for (; t.hasChildNodes(); )
              t.removeChild(t.firstChild);
            t.appendChild(e);
          }
          this.fire("contentupdate");
        }
      },
      _updatePosition: function() {
        if (this._map) {
          var t = this._map.latLngToLayerPoint(this._latlng), e = M(this.options.offset), i = this._getAnchor();
          this._zoomAnimated ? Y(this._container, t.add(i)) : e = e.add(t).add(i);
          var n = this._containerBottom = -e.y, o = this._containerLeft = -Math.round(this._containerWidth / 2) + e.x;
          this._container.style.bottom = n + "px", this._container.style.left = o + "px";
        }
      },
      _getAnchor: function() {
        return [0, 0];
      }
    });
    B.include({
      _initOverlay: function(t, e, i, n) {
        var o = e;
        return o instanceof t || (o = new t(n).setContent(e)), i && o.setLatLng(i), o;
      }
    }), mt.include({
      _initOverlay: function(t, e, i, n) {
        var o = i;
        return o instanceof t ? (E(o, n), o._source = this) : (o = e && !n ? e : new t(n, this), o.setContent(i)), o;
      }
    });
    var Ee = yt.extend({
      // @section
      // @aka Popup options
      options: {
        // @option pane: String = 'popupPane'
        // `Map pane` where the popup will be added.
        pane: "popupPane",
        // @option offset: Point = Point(0, 7)
        // The offset of the popup position.
        offset: [0, 7],
        // @option maxWidth: Number = 300
        // Max width of the popup, in pixels.
        maxWidth: 300,
        // @option minWidth: Number = 50
        // Min width of the popup, in pixels.
        minWidth: 50,
        // @option maxHeight: Number = null
        // If set, creates a scrollable container of the given height
        // inside a popup if its content exceeds it.
        // The scrollable container can be styled using the
        // `leaflet-popup-scrolled` CSS class selector.
        maxHeight: null,
        // @option autoPan: Boolean = true
        // Set it to `false` if you don't want the map to do panning animation
        // to fit the opened popup.
        autoPan: !0,
        // @option autoPanPaddingTopLeft: Point = null
        // The margin between the popup and the top left corner of the map
        // view after autopanning was performed.
        autoPanPaddingTopLeft: null,
        // @option autoPanPaddingBottomRight: Point = null
        // The margin between the popup and the bottom right corner of the map
        // view after autopanning was performed.
        autoPanPaddingBottomRight: null,
        // @option autoPanPadding: Point = Point(5, 5)
        // Equivalent of setting both top left and bottom right autopan padding to the same value.
        autoPanPadding: [5, 5],
        // @option keepInView: Boolean = false
        // Set it to `true` if you want to prevent users from panning the popup
        // off of the screen while it is open.
        keepInView: !1,
        // @option closeButton: Boolean = true
        // Controls the presence of a close button in the popup.
        closeButton: !0,
        // @option autoClose: Boolean = true
        // Set it to `false` if you want to override the default behavior of
        // the popup closing when another popup is opened.
        autoClose: !0,
        // @option closeOnEscapeKey: Boolean = true
        // Set it to `false` if you want to override the default behavior of
        // the ESC key for closing of the popup.
        closeOnEscapeKey: !0,
        // @option closeOnClick: Boolean = *
        // Set it if you want to override the default behavior of the popup closing when user clicks
        // on the map. Defaults to the map's [`closePopupOnClick`](#map-closepopuponclick) option.
        // @option className: String = ''
        // A custom CSS class name to assign to the popup.
        className: ""
      },
      // @namespace Popup
      // @method openOn(map: Map): this
      // Alternative to `map.openPopup(popup)`.
      // Adds the popup to the map and closes the previous one.
      openOn: function(t) {
        return t = arguments.length ? t : this._source._map, !t.hasLayer(this) && t._popup && t._popup.options.autoClose && t.removeLayer(t._popup), t._popup = this, yt.prototype.openOn.call(this, t);
      },
      onAdd: function(t) {
        yt.prototype.onAdd.call(this, t), t.fire("popupopen", { popup: this }), this._source && (this._source.fire("popupopen", { popup: this }, !0), this._source instanceof Ct || this._source.on("preclick", At));
      },
      onRemove: function(t) {
        yt.prototype.onRemove.call(this, t), t.fire("popupclose", { popup: this }), this._source && (this._source.fire("popupclose", { popup: this }, !0), this._source instanceof Ct || this._source.off("preclick", At));
      },
      getEvents: function() {
        var t = yt.prototype.getEvents.call(this);
        return (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (t.preclick = this.close), this.options.keepInView && (t.moveend = this._adjustPan), t;
      },
      _initLayout: function() {
        var t = "leaflet-popup", e = this._container = N(
          "div",
          t + " " + (this.options.className || "") + " leaflet-zoom-animated"
        ), i = this._wrapper = N("div", t + "-content-wrapper", e);
        if (this._contentNode = N("div", t + "-content", i), oe(e), ai(this._contentNode), C(e, "contextmenu", At), this._tipContainer = N("div", t + "-tip-container", e), this._tip = N("div", t + "-tip", this._tipContainer), this.options.closeButton) {
          var n = this._closeButton = N("a", t + "-close-button", e);
          n.setAttribute("role", "button"), n.setAttribute("aria-label", "Close popup"), n.href = "#close", n.innerHTML = '<span aria-hidden="true">&#215;</span>', C(n, "click", function(o) {
            nt(o), this.close();
          }, this);
        }
      },
      _updateLayout: function() {
        var t = this._contentNode, e = t.style;
        e.width = "", e.whiteSpace = "nowrap";
        var i = t.offsetWidth;
        i = Math.min(i, this.options.maxWidth), i = Math.max(i, this.options.minWidth), e.width = i + 1 + "px", e.whiteSpace = "", e.height = "";
        var n = t.offsetHeight, o = this.options.maxHeight, r = "leaflet-popup-scrolled";
        o && n > o ? (e.height = o + "px", k(t, r)) : q(t, r), this._containerWidth = this._container.offsetWidth;
      },
      _animateZoom: function(t) {
        var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center), i = this._getAnchor();
        Y(this._container, e.add(i));
      },
      _adjustPan: function() {
        if (this.options.autoPan) {
          if (this._map._panAnim && this._map._panAnim.stop(), this._autopanning) {
            this._autopanning = !1;
            return;
          }
          var t = this._map, e = parseInt(te(this._container, "marginBottom"), 10) || 0, i = this._container.offsetHeight + e, n = this._containerWidth, o = new S(this._containerLeft, -i - this._containerBottom);
          o._add(Ot(this._container));
          var r = t.layerPointToContainerPoint(o), s = M(this.options.autoPanPadding), a = M(this.options.autoPanPaddingTopLeft || s), u = M(this.options.autoPanPaddingBottomRight || s), f = t.getSize(), m = 0, x = 0;
          r.x + n + u.x > f.x && (m = r.x + n - f.x + u.x), r.x - m - a.x < 0 && (m = r.x - a.x), r.y + i + u.y > f.y && (x = r.y + i - f.y + u.y), r.y - x - a.y < 0 && (x = r.y - a.y), (m || x) && (this.options.keepInView && (this._autopanning = !0), t.fire("autopanstart").panBy([m, x]));
        }
      },
      _getAnchor: function() {
        return M(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
      }
    }), Jo = function(t, e) {
      return new Ee(t, e);
    };
    B.mergeOptions({
      closePopupOnClick: !0
    }), B.include({
      // @method openPopup(popup: Popup): this
      // Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
      // @alternative
      // @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
      // Creates a popup with the specified content and options and opens it in the given point on a map.
      openPopup: function(t, e, i) {
        return this._initOverlay(Ee, t, e, i).openOn(this), this;
      },
      // @method closePopup(popup?: Popup): this
      // Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
      closePopup: function(t) {
        return t = arguments.length ? t : this._popup, t && t.close(), this;
      }
    }), mt.include({
      // @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
      // Binds a popup to the layer with the passed `content` and sets up the
      // necessary event listeners. If a `Function` is passed it will receive
      // the layer as the first argument and should return a `String` or `HTMLElement`.
      bindPopup: function(t, e) {
        return this._popup = this._initOverlay(Ee, this._popup, t, e), this._popupHandlersAdded || (this.on({
          click: this._openPopup,
          keypress: this._onKeyPress,
          remove: this.closePopup,
          move: this._movePopup
        }), this._popupHandlersAdded = !0), this;
      },
      // @method unbindPopup(): this
      // Removes the popup previously bound with `bindPopup`.
      unbindPopup: function() {
        return this._popup && (this.off({
          click: this._openPopup,
          keypress: this._onKeyPress,
          remove: this.closePopup,
          move: this._movePopup
        }), this._popupHandlersAdded = !1, this._popup = null), this;
      },
      // @method openPopup(latlng?: LatLng): this
      // Opens the bound popup at the specified `latlng` or at the default popup anchor if no `latlng` is passed.
      openPopup: function(t) {
        return this._popup && (this instanceof xt || (this._popup._source = this), this._popup._prepareOpen(t || this._latlng) && this._popup.openOn(this._map)), this;
      },
      // @method closePopup(): this
      // Closes the popup bound to this layer if it is open.
      closePopup: function() {
        return this._popup && this._popup.close(), this;
      },
      // @method togglePopup(): this
      // Opens or closes the popup bound to this layer depending on its current state.
      togglePopup: function() {
        return this._popup && this._popup.toggle(this), this;
      },
      // @method isPopupOpen(): boolean
      // Returns `true` if the popup bound to this layer is currently open.
      isPopupOpen: function() {
        return this._popup ? this._popup.isOpen() : !1;
      },
      // @method setPopupContent(content: String|HTMLElement|Popup): this
      // Sets the content of the popup bound to this layer.
      setPopupContent: function(t) {
        return this._popup && this._popup.setContent(t), this;
      },
      // @method getPopup(): Popup
      // Returns the popup bound to this layer.
      getPopup: function() {
        return this._popup;
      },
      _openPopup: function(t) {
        if (!(!this._popup || !this._map)) {
          Zt(t);
          var e = t.layer || t.target;
          if (this._popup._source === e && !(e instanceof Ct)) {
            this._map.hasLayer(this._popup) ? this.closePopup() : this.openPopup(t.latlng);
            return;
          }
          this._popup._source = e, this.openPopup(t.latlng);
        }
      },
      _movePopup: function(t) {
        this._popup.setLatLng(t.latlng);
      },
      _onKeyPress: function(t) {
        t.originalEvent.keyCode === 13 && this._openPopup(t);
      }
    });
    var ze = yt.extend({
      // @section
      // @aka Tooltip options
      options: {
        // @option pane: String = 'tooltipPane'
        // `Map pane` where the tooltip will be added.
        pane: "tooltipPane",
        // @option offset: Point = Point(0, 0)
        // Optional offset of the tooltip position.
        offset: [0, 0],
        // @option direction: String = 'auto'
        // Direction where to open the tooltip. Possible values are: `right`, `left`,
        // `top`, `bottom`, `center`, `auto`.
        // `auto` will dynamically switch between `right` and `left` according to the tooltip
        // position on the map.
        direction: "auto",
        // @option permanent: Boolean = false
        // Whether to open the tooltip permanently or only on mouseover.
        permanent: !1,
        // @option sticky: Boolean = false
        // If true, the tooltip will follow the mouse instead of being fixed at the feature center.
        sticky: !1,
        // @option opacity: Number = 0.9
        // Tooltip container opacity.
        opacity: 0.9
      },
      onAdd: function(t) {
        yt.prototype.onAdd.call(this, t), this.setOpacity(this.options.opacity), t.fire("tooltipopen", { tooltip: this }), this._source && (this.addEventParent(this._source), this._source.fire("tooltipopen", { tooltip: this }, !0));
      },
      onRemove: function(t) {
        yt.prototype.onRemove.call(this, t), t.fire("tooltipclose", { tooltip: this }), this._source && (this.removeEventParent(this._source), this._source.fire("tooltipclose", { tooltip: this }, !0));
      },
      getEvents: function() {
        var t = yt.prototype.getEvents.call(this);
        return this.options.permanent || (t.preclick = this.close), t;
      },
      _initLayout: function() {
        var t = "leaflet-tooltip", e = t + " " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
        this._contentNode = this._container = N("div", e), this._container.setAttribute("role", "tooltip"), this._container.setAttribute("id", "leaflet-tooltip-" + _(this));
      },
      _updateLayout: function() {
      },
      _adjustPan: function() {
      },
      _setPosition: function(t) {
        var e, i, n = this._map, o = this._container, r = n.latLngToContainerPoint(n.getCenter()), s = n.layerPointToContainerPoint(t), a = this.options.direction, u = o.offsetWidth, f = o.offsetHeight, m = M(this.options.offset), x = this._getAnchor();
        a === "top" ? (e = u / 2, i = f) : a === "bottom" ? (e = u / 2, i = 0) : a === "center" ? (e = u / 2, i = f / 2) : a === "right" ? (e = 0, i = f / 2) : a === "left" ? (e = u, i = f / 2) : s.x < r.x ? (a = "right", e = 0, i = f / 2) : (a = "left", e = u + (m.x + x.x) * 2, i = f / 2), t = t.subtract(M(e, i, !0)).add(m).add(x), q(o, "leaflet-tooltip-right"), q(o, "leaflet-tooltip-left"), q(o, "leaflet-tooltip-top"), q(o, "leaflet-tooltip-bottom"), k(o, "leaflet-tooltip-" + a), Y(o, t);
      },
      _updatePosition: function() {
        var t = this._map.latLngToLayerPoint(this._latlng);
        this._setPosition(t);
      },
      setOpacity: function(t) {
        this.options.opacity = t, this._container && lt(this._container, t);
      },
      _animateZoom: function(t) {
        var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
        this._setPosition(e);
      },
      _getAnchor: function() {
        return M(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
      }
    }), $o = function(t, e) {
      return new ze(t, e);
    };
    B.include({
      // @method openTooltip(tooltip: Tooltip): this
      // Opens the specified tooltip.
      // @alternative
      // @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
      // Creates a tooltip with the specified content and options and open it.
      openTooltip: function(t, e, i) {
        return this._initOverlay(ze, t, e, i).openOn(this), this;
      },
      // @method closeTooltip(tooltip: Tooltip): this
      // Closes the tooltip given as parameter.
      closeTooltip: function(t) {
        return t.close(), this;
      }
    }), mt.include({
      // @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
      // Binds a tooltip to the layer with the passed `content` and sets up the
      // necessary event listeners. If a `Function` is passed it will receive
      // the layer as the first argument and should return a `String` or `HTMLElement`.
      bindTooltip: function(t, e) {
        return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(), this._tooltip = this._initOverlay(ze, this._tooltip, t, e), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this;
      },
      // @method unbindTooltip(): this
      // Removes the tooltip previously bound with `bindTooltip`.
      unbindTooltip: function() {
        return this._tooltip && (this._initTooltipInteractions(!0), this.closeTooltip(), this._tooltip = null), this;
      },
      _initTooltipInteractions: function(t) {
        if (!(!t && this._tooltipHandlersAdded)) {
          var e = t ? "off" : "on", i = {
            remove: this.closeTooltip,
            move: this._moveTooltip
          };
          this._tooltip.options.permanent ? i.add = this._openTooltip : (i.mouseover = this._openTooltip, i.mouseout = this.closeTooltip, i.click = this._openTooltip, this._map ? this._addFocusListeners() : i.add = this._addFocusListeners), this._tooltip.options.sticky && (i.mousemove = this._moveTooltip), this[e](i), this._tooltipHandlersAdded = !t;
        }
      },
      // @method openTooltip(latlng?: LatLng): this
      // Opens the bound tooltip at the specified `latlng` or at the default tooltip anchor if no `latlng` is passed.
      openTooltip: function(t) {
        return this._tooltip && (this instanceof xt || (this._tooltip._source = this), this._tooltip._prepareOpen(t) && (this._tooltip.openOn(this._map), this.getElement ? this._setAriaDescribedByOnLayer(this) : this.eachLayer && this.eachLayer(this._setAriaDescribedByOnLayer, this))), this;
      },
      // @method closeTooltip(): this
      // Closes the tooltip bound to this layer if it is open.
      closeTooltip: function() {
        if (this._tooltip)
          return this._tooltip.close();
      },
      // @method toggleTooltip(): this
      // Opens or closes the tooltip bound to this layer depending on its current state.
      toggleTooltip: function() {
        return this._tooltip && this._tooltip.toggle(this), this;
      },
      // @method isTooltipOpen(): boolean
      // Returns `true` if the tooltip bound to this layer is currently open.
      isTooltipOpen: function() {
        return this._tooltip.isOpen();
      },
      // @method setTooltipContent(content: String|HTMLElement|Tooltip): this
      // Sets the content of the tooltip bound to this layer.
      setTooltipContent: function(t) {
        return this._tooltip && this._tooltip.setContent(t), this;
      },
      // @method getTooltip(): Tooltip
      // Returns the tooltip bound to this layer.
      getTooltip: function() {
        return this._tooltip;
      },
      _addFocusListeners: function() {
        this.getElement ? this._addFocusListenersOnLayer(this) : this.eachLayer && this.eachLayer(this._addFocusListenersOnLayer, this);
      },
      _addFocusListenersOnLayer: function(t) {
        var e = typeof t.getElement == "function" && t.getElement();
        e && (C(e, "focus", function() {
          this._tooltip._source = t, this.openTooltip();
        }, this), C(e, "blur", this.closeTooltip, this));
      },
      _setAriaDescribedByOnLayer: function(t) {
        var e = typeof t.getElement == "function" && t.getElement();
        e && e.setAttribute("aria-describedby", this._tooltip._container.id);
      },
      _openTooltip: function(t) {
        if (!(!this._tooltip || !this._map)) {
          if (this._map.dragging && this._map.dragging.moving() && !this._openOnceFlag) {
            this._openOnceFlag = !0;
            var e = this;
            this._map.once("moveend", function() {
              e._openOnceFlag = !1, e._openTooltip(t);
            });
            return;
          }
          this._tooltip._source = t.layer || t.target, this.openTooltip(this._tooltip.options.sticky ? t.latlng : void 0);
        }
      },
      _moveTooltip: function(t) {
        var e = t.latlng, i, n;
        this._tooltip.options.sticky && t.originalEvent && (i = this._map.mouseEventToContainerPoint(t.originalEvent), n = this._map.containerPointToLayerPoint(i), e = this._map.layerPointToLatLng(n)), this._tooltip.setLatLng(e);
      }
    });
    var gn = Ht.extend({
      options: {
        // @section
        // @aka DivIcon options
        iconSize: [12, 12],
        // also can be set through CSS
        // iconAnchor: (Point),
        // popupAnchor: (Point),
        // @option html: String|HTMLElement = ''
        // Custom HTML code to put inside the div element, empty by default. Alternatively,
        // an instance of `HTMLElement`.
        html: !1,
        // @option bgPos: Point = [0, 0]
        // Optional relative position of the background, in pixels
        bgPos: null,
        className: "leaflet-div-icon"
      },
      createIcon: function(t) {
        var e = t && t.tagName === "DIV" ? t : document.createElement("div"), i = this.options;
        if (i.html instanceof Element ? (ve(e), e.appendChild(i.html)) : e.innerHTML = i.html !== !1 ? i.html : "", i.bgPos) {
          var n = M(i.bgPos);
          e.style.backgroundPosition = -n.x + "px " + -n.y + "px";
        }
        return this._setIconStyles(e, "icon"), e;
      },
      createShadow: function() {
        return null;
      }
    });
    function Qo(t) {
      return new gn(t);
    }
    Ht.Default = ae;
    var he = mt.extend({
      // @section
      // @aka GridLayer options
      options: {
        // @option tileSize: Number|Point = 256
        // Width and height of tiles in the grid. Use a number if width and height are equal, or `L.point(width, height)` otherwise.
        tileSize: 256,
        // @option opacity: Number = 1.0
        // Opacity of the tiles. Can be used in the `createTile()` function.
        opacity: 1,
        // @option updateWhenIdle: Boolean = (depends)
        // Load new tiles only when panning ends.
        // `true` by default on mobile browsers, in order to avoid too many requests and keep smooth navigation.
        // `false` otherwise in order to display new tiles _during_ panning, since it is easy to pan outside the
        // [`keepBuffer`](#gridlayer-keepbuffer) option in desktop browsers.
        updateWhenIdle: g.mobile,
        // @option updateWhenZooming: Boolean = true
        // By default, a smooth zoom animation (during a [touch zoom](#map-touchzoom) or a [`flyTo()`](#map-flyto)) will update grid layers every integer zoom level. Setting this option to `false` will update the grid layer only when the smooth animation ends.
        updateWhenZooming: !0,
        // @option updateInterval: Number = 200
        // Tiles will not update more than once every `updateInterval` milliseconds when panning.
        updateInterval: 200,
        // @option zIndex: Number = 1
        // The explicit zIndex of the tile layer.
        zIndex: 1,
        // @option bounds: LatLngBounds = undefined
        // If set, tiles will only be loaded inside the set `LatLngBounds`.
        bounds: null,
        // @option minZoom: Number = 0
        // The minimum zoom level down to which this layer will be displayed (inclusive).
        minZoom: 0,
        // @option maxZoom: Number = undefined
        // The maximum zoom level up to which this layer will be displayed (inclusive).
        maxZoom: void 0,
        // @option maxNativeZoom: Number = undefined
        // Maximum zoom number the tile source has available. If it is specified,
        // the tiles on all zoom levels higher than `maxNativeZoom` will be loaded
        // from `maxNativeZoom` level and auto-scaled.
        maxNativeZoom: void 0,
        // @option minNativeZoom: Number = undefined
        // Minimum zoom number the tile source has available. If it is specified,
        // the tiles on all zoom levels lower than `minNativeZoom` will be loaded
        // from `minNativeZoom` level and auto-scaled.
        minNativeZoom: void 0,
        // @option noWrap: Boolean = false
        // Whether the layer is wrapped around the antimeridian. If `true`, the
        // GridLayer will only be displayed once at low zoom levels. Has no
        // effect when the [map CRS](#map-crs) doesn't wrap around. Can be used
        // in combination with [`bounds`](#gridlayer-bounds) to prevent requesting
        // tiles outside the CRS limits.
        noWrap: !1,
        // @option pane: String = 'tilePane'
        // `Map pane` where the grid layer will be added.
        pane: "tilePane",
        // @option className: String = ''
        // A custom class name to assign to the tile layer. Empty by default.
        className: "",
        // @option keepBuffer: Number = 2
        // When panning the map, keep this many rows and columns of tiles before unloading them.
        keepBuffer: 2
      },
      initialize: function(t) {
        E(this, t);
      },
      onAdd: function() {
        this._initContainer(), this._levels = {}, this._tiles = {}, this._resetView();
      },
      beforeAdd: function(t) {
        t._addZoomLimit(this);
      },
      onRemove: function(t) {
        this._removeAllTiles(), V(this._container), t._removeZoomLimit(this), this._container = null, this._tileZoom = void 0;
      },
      // @method bringToFront: this
      // Brings the tile layer to the top of all tile layers.
      bringToFront: function() {
        return this._map && (Nt(this._container), this._setAutoZIndex(Math.max)), this;
      },
      // @method bringToBack: this
      // Brings the tile layer to the bottom of all tile layers.
      bringToBack: function() {
        return this._map && (Rt(this._container), this._setAutoZIndex(Math.min)), this;
      },
      // @method getContainer: HTMLElement
      // Returns the HTML element that contains the tiles for this layer.
      getContainer: function() {
        return this._container;
      },
      // @method setOpacity(opacity: Number): this
      // Changes the [opacity](#gridlayer-opacity) of the grid layer.
      setOpacity: function(t) {
        return this.options.opacity = t, this._updateOpacity(), this;
      },
      // @method setZIndex(zIndex: Number): this
      // Changes the [zIndex](#gridlayer-zindex) of the grid layer.
      setZIndex: function(t) {
        return this.options.zIndex = t, this._updateZIndex(), this;
      },
      // @method isLoading: Boolean
      // Returns `true` if any tile in the grid layer has not finished loading.
      isLoading: function() {
        return this._loading;
      },
      // @method redraw: this
      // Causes the layer to clear all the tiles and request them again.
      redraw: function() {
        if (this._map) {
          this._removeAllTiles();
          var t = this._clampZoom(this._map.getZoom());
          t !== this._tileZoom && (this._tileZoom = t, this._updateLevels()), this._update();
        }
        return this;
      },
      getEvents: function() {
        var t = {
          viewprereset: this._invalidateAll,
          viewreset: this._resetView,
          zoom: this._resetView,
          moveend: this._onMoveEnd
        };
        return this.options.updateWhenIdle || (this._onMove || (this._onMove = b(this._onMoveEnd, this.options.updateInterval, this)), t.move = this._onMove), this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
      },
      // @section Extension methods
      // Layers extending `GridLayer` shall reimplement the following method.
      // @method createTile(coords: Object, done?: Function): HTMLElement
      // Called only internally, must be overridden by classes extending `GridLayer`.
      // Returns the `HTMLElement` corresponding to the given `coords`. If the `done` callback
      // is specified, it must be called when the tile has finished loading and drawing.
      createTile: function() {
        return document.createElement("div");
      },
      // @section
      // @method getTileSize: Point
      // Normalizes the [tileSize option](#gridlayer-tilesize) into a point. Used by the `createTile()` method.
      getTileSize: function() {
        var t = this.options.tileSize;
        return t instanceof S ? t : new S(t, t);
      },
      _updateZIndex: function() {
        this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._container.style.zIndex = this.options.zIndex);
      },
      _setAutoZIndex: function(t) {
        for (var e = this.getPane().children, i = -t(-1 / 0, 1 / 0), n = 0, o = e.length, r; n < o; n++)
          r = e[n].style.zIndex, e[n] !== this._container && r && (i = t(i, +r));
        isFinite(i) && (this.options.zIndex = i + t(-1, 1), this._updateZIndex());
      },
      _updateOpacity: function() {
        if (this._map && !g.ielt9) {
          lt(this._container, this.options.opacity);
          var t = +/* @__PURE__ */ new Date(), e = !1, i = !1;
          for (var n in this._tiles) {
            var o = this._tiles[n];
            if (!(!o.current || !o.loaded)) {
              var r = Math.min(1, (t - o.loaded) / 200);
              lt(o.el, r), r < 1 ? e = !0 : (o.active ? i = !0 : this._onOpaqueTile(o), o.active = !0);
            }
          }
          i && !this._noPrune && this._pruneTiles(), e && (rt(this._fadeFrame), this._fadeFrame = it(this._updateOpacity, this));
        }
      },
      _onOpaqueTile: T,
      _initContainer: function() {
        this._container || (this._container = N("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container));
      },
      _updateLevels: function() {
        var t = this._tileZoom, e = this.options.maxZoom;
        if (t !== void 0) {
          for (var i in this._levels)
            i = Number(i), this._levels[i].el.children.length || i === t ? (this._levels[i].el.style.zIndex = e - Math.abs(t - i), this._onUpdateLevel(i)) : (V(this._levels[i].el), this._removeTilesAtZoom(i), this._onRemoveLevel(i), delete this._levels[i]);
          var n = this._levels[t], o = this._map;
          return n || (n = this._levels[t] = {}, n.el = N("div", "leaflet-tile-container leaflet-zoom-animated", this._container), n.el.style.zIndex = e, n.origin = o.project(o.unproject(o.getPixelOrigin()), t).round(), n.zoom = t, this._setZoomTransform(n, o.getCenter(), o.getZoom()), T(n.el.offsetWidth), this._onCreateLevel(n)), this._level = n, n;
        }
      },
      _onUpdateLevel: T,
      _onRemoveLevel: T,
      _onCreateLevel: T,
      _pruneTiles: function() {
        if (this._map) {
          var t, e, i = this._map.getZoom();
          if (i > this.options.maxZoom || i < this.options.minZoom) {
            this._removeAllTiles();
            return;
          }
          for (t in this._tiles)
            e = this._tiles[t], e.retain = e.current;
          for (t in this._tiles)
            if (e = this._tiles[t], e.current && !e.active) {
              var n = e.coords;
              this._retainParent(n.x, n.y, n.z, n.z - 5) || this._retainChildren(n.x, n.y, n.z, n.z + 2);
            }
          for (t in this._tiles)
            this._tiles[t].retain || this._removeTile(t);
        }
      },
      _removeTilesAtZoom: function(t) {
        for (var e in this._tiles)
          this._tiles[e].coords.z === t && this._removeTile(e);
      },
      _removeAllTiles: function() {
        for (var t in this._tiles)
          this._removeTile(t);
      },
      _invalidateAll: function() {
        for (var t in this._levels)
          V(this._levels[t].el), this._onRemoveLevel(Number(t)), delete this._levels[t];
        this._removeAllTiles(), this._tileZoom = void 0;
      },
      _retainParent: function(t, e, i, n) {
        var o = Math.floor(t / 2), r = Math.floor(e / 2), s = i - 1, a = new S(+o, +r);
        a.z = +s;
        var u = this._tileCoordsToKey(a), f = this._tiles[u];
        return f && f.active ? (f.retain = !0, !0) : (f && f.loaded && (f.retain = !0), s > n ? this._retainParent(o, r, s, n) : !1);
      },
      _retainChildren: function(t, e, i, n) {
        for (var o = 2 * t; o < 2 * t + 2; o++)
          for (var r = 2 * e; r < 2 * e + 2; r++) {
            var s = new S(o, r);
            s.z = i + 1;
            var a = this._tileCoordsToKey(s), u = this._tiles[a];
            if (u && u.active) {
              u.retain = !0;
              continue;
            } else
              u && u.loaded && (u.retain = !0);
            i + 1 < n && this._retainChildren(o, r, i + 1, n);
          }
      },
      _resetView: function(t) {
        var e = t && (t.pinch || t.flyTo);
        this._setView(this._map.getCenter(), this._map.getZoom(), e, e);
      },
      _animateZoom: function(t) {
        this._setView(t.center, t.zoom, !0, t.noUpdate);
      },
      _clampZoom: function(t) {
        var e = this.options;
        return e.minNativeZoom !== void 0 && t < e.minNativeZoom ? e.minNativeZoom : e.maxNativeZoom !== void 0 && e.maxNativeZoom < t ? e.maxNativeZoom : t;
      },
      _setView: function(t, e, i, n) {
        var o = Math.round(e);
        this.options.maxZoom !== void 0 && o > this.options.maxZoom || this.options.minZoom !== void 0 && o < this.options.minZoom ? o = void 0 : o = this._clampZoom(o);
        var r = this.options.updateWhenZooming && o !== this._tileZoom;
        (!n || r) && (this._tileZoom = o, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), o !== void 0 && this._update(t), i || this._pruneTiles(), this._noPrune = !!i), this._setZoomTransforms(t, e);
      },
      _setZoomTransforms: function(t, e) {
        for (var i in this._levels)
          this._setZoomTransform(this._levels[i], t, e);
      },
      _setZoomTransform: function(t, e, i) {
        var n = this._map.getZoomScale(i, t.zoom), o = t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(e, i)).round();
        g.any3d ? zt(t.el, o, n) : Y(t.el, o);
      },
      _resetGrid: function() {
        var t = this._map, e = t.options.crs, i = this._tileSize = this.getTileSize(), n = this._tileZoom, o = this._map.getPixelWorldBounds(this._tileZoom);
        o && (this._globalTileRange = this._pxBoundsToTileRange(o)), this._wrapX = e.wrapLng && !this.options.noWrap && [
          Math.floor(t.project([0, e.wrapLng[0]], n).x / i.x),
          Math.ceil(t.project([0, e.wrapLng[1]], n).x / i.y)
        ], this._wrapY = e.wrapLat && !this.options.noWrap && [
          Math.floor(t.project([e.wrapLat[0], 0], n).y / i.x),
          Math.ceil(t.project([e.wrapLat[1], 0], n).y / i.y)
        ];
      },
      _onMoveEnd: function() {
        !this._map || this._map._animatingZoom || this._update();
      },
      _getTiledPixelBounds: function(t) {
        var e = this._map, i = e._animatingZoom ? Math.max(e._animateToZoom, e.getZoom()) : e.getZoom(), n = e.getZoomScale(i, this._tileZoom), o = e.project(t, this._tileZoom).floor(), r = e.getSize().divideBy(n * 2);
        return new j(o.subtract(r), o.add(r));
      },
      // Private method to load tiles in the grid's active zoom level according to map bounds
      _update: function(t) {
        var e = this._map;
        if (e) {
          var i = this._clampZoom(e.getZoom());
          if (t === void 0 && (t = e.getCenter()), this._tileZoom !== void 0) {
            var n = this._getTiledPixelBounds(t), o = this._pxBoundsToTileRange(n), r = o.getCenter(), s = [], a = this.options.keepBuffer, u = new j(
              o.getBottomLeft().subtract([a, -a]),
              o.getTopRight().add([a, -a])
            );
            if (!(isFinite(o.min.x) && isFinite(o.min.y) && isFinite(o.max.x) && isFinite(o.max.y)))
              throw new Error("Attempted to load an infinite number of tiles");
            for (var f in this._tiles) {
              var m = this._tiles[f].coords;
              (m.z !== this._tileZoom || !u.contains(new S(m.x, m.y))) && (this._tiles[f].current = !1);
            }
            if (Math.abs(i - this._tileZoom) > 1) {
              this._setView(t, i);
              return;
            }
            for (var x = o.min.y; x <= o.max.y; x++)
              for (var O = o.min.x; O <= o.max.x; O++) {
                var ot = new S(O, x);
                if (ot.z = this._tileZoom, !!this._isValidTile(ot)) {
                  var et = this._tiles[this._tileCoordsToKey(ot)];
                  et ? et.current = !0 : s.push(ot);
                }
              }
            if (s.sort(function(ht, Gt) {
              return ht.distanceTo(r) - Gt.distanceTo(r);
            }), s.length !== 0) {
              this._loading || (this._loading = !0, this.fire("loading"));
              var ft = document.createDocumentFragment();
              for (O = 0; O < s.length; O++)
                this._addTile(s[O], ft);
              this._level.el.appendChild(ft);
            }
          }
        }
      },
      _isValidTile: function(t) {
        var e = this._map.options.crs;
        if (!e.infinite) {
          var i = this._globalTileRange;
          if (!e.wrapLng && (t.x < i.min.x || t.x > i.max.x) || !e.wrapLat && (t.y < i.min.y || t.y > i.max.y))
            return !1;
        }
        if (!this.options.bounds)
          return !0;
        var n = this._tileCoordsToBounds(t);
        return X(this.options.bounds).overlaps(n);
      },
      _keyToBounds: function(t) {
        return this._tileCoordsToBounds(this._keyToTileCoords(t));
      },
      _tileCoordsToNwSe: function(t) {
        var e = this._map, i = this.getTileSize(), n = t.scaleBy(i), o = n.add(i), r = e.unproject(n, t.z), s = e.unproject(o, t.z);
        return [r, s];
      },
      // converts tile coordinates to its geographical bounds
      _tileCoordsToBounds: function(t) {
        var e = this._tileCoordsToNwSe(t), i = new at(e[0], e[1]);
        return this.options.noWrap || (i = this._map.wrapLatLngBounds(i)), i;
      },
      // converts tile coordinates to key for the tile cache
      _tileCoordsToKey: function(t) {
        return t.x + ":" + t.y + ":" + t.z;
      },
      // converts tile cache key to coordinates
      _keyToTileCoords: function(t) {
        var e = t.split(":"), i = new S(+e[0], +e[1]);
        return i.z = +e[2], i;
      },
      _removeTile: function(t) {
        var e = this._tiles[t];
        e && (V(e.el), delete this._tiles[t], this.fire("tileunload", {
          tile: e.el,
          coords: this._keyToTileCoords(t)
        }));
      },
      _initTile: function(t) {
        k(t, "leaflet-tile");
        var e = this.getTileSize();
        t.style.width = e.x + "px", t.style.height = e.y + "px", t.onselectstart = T, t.onmousemove = T, g.ielt9 && this.options.opacity < 1 && lt(t, this.options.opacity);
      },
      _addTile: function(t, e) {
        var i = this._getTilePos(t), n = this._tileCoordsToKey(t), o = this.createTile(this._wrapCoords(t), c(this._tileReady, this, t));
        this._initTile(o), this.createTile.length < 2 && it(c(this._tileReady, this, t, null, o)), Y(o, i), this._tiles[n] = {
          el: o,
          coords: t,
          current: !0
        }, e.appendChild(o), this.fire("tileloadstart", {
          tile: o,
          coords: t
        });
      },
      _tileReady: function(t, e, i) {
        e && this.fire("tileerror", {
          error: e,
          tile: i,
          coords: t
        });
        var n = this._tileCoordsToKey(t);
        i = this._tiles[n], i && (i.loaded = +/* @__PURE__ */ new Date(), this._map._fadeAnimated ? (lt(i.el, 0), rt(this._fadeFrame), this._fadeFrame = it(this._updateOpacity, this)) : (i.active = !0, this._pruneTiles()), e || (k(i.el, "leaflet-tile-loaded"), this.fire("tileload", {
          tile: i.el,
          coords: t
        })), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), g.ielt9 || !this._map._fadeAnimated ? it(this._pruneTiles, this) : setTimeout(c(this._pruneTiles, this), 250)));
      },
      _getTilePos: function(t) {
        return t.scaleBy(this.getTileSize()).subtract(this._level.origin);
      },
      _wrapCoords: function(t) {
        var e = new S(
          this._wrapX ? z(t.x, this._wrapX) : t.x,
          this._wrapY ? z(t.y, this._wrapY) : t.y
        );
        return e.z = t.z, e;
      },
      _pxBoundsToTileRange: function(t) {
        var e = this.getTileSize();
        return new j(
          t.min.unscaleBy(e).floor(),
          t.max.unscaleBy(e).ceil().subtract([1, 1])
        );
      },
      _noTilesToLoad: function() {
        for (var t in this._tiles)
          if (!this._tiles[t].loaded)
            return !1;
        return !0;
      }
    });
    function tr(t) {
      return new he(t);
    }
    var Ut = he.extend({
      // @section
      // @aka TileLayer options
      options: {
        // @option minZoom: Number = 0
        // The minimum zoom level down to which this layer will be displayed (inclusive).
        minZoom: 0,
        // @option maxZoom: Number = 18
        // The maximum zoom level up to which this layer will be displayed (inclusive).
        maxZoom: 18,
        // @option subdomains: String|String[] = 'abc'
        // Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.
        subdomains: "abc",
        // @option errorTileUrl: String = ''
        // URL to the tile image to show in place of the tile that failed to load.
        errorTileUrl: "",
        // @option zoomOffset: Number = 0
        // The zoom number used in tile URLs will be offset with this value.
        zoomOffset: 0,
        // @option tms: Boolean = false
        // If `true`, inverses Y axis numbering for tiles (turn this on for [TMS](https://en.wikipedia.org/wiki/Tile_Map_Service) services).
        tms: !1,
        // @option zoomReverse: Boolean = false
        // If set to true, the zoom number used in tile URLs will be reversed (`maxZoom - zoom` instead of `zoom`)
        zoomReverse: !1,
        // @option detectRetina: Boolean = false
        // If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
        detectRetina: !1,
        // @option crossOrigin: Boolean|String = false
        // Whether the crossOrigin attribute will be added to the tiles.
        // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
        // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
        crossOrigin: !1,
        // @option referrerPolicy: Boolean|String = false
        // Whether the referrerPolicy attribute will be added to the tiles.
        // If a String is provided, all tiles will have their referrerPolicy attribute set to the String provided.
        // This may be needed if your map's rendering context has a strict default but your tile provider expects a valid referrer
        // (e.g. to validate an API token).
        // Refer to [HTMLImageElement.referrerPolicy](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/referrerPolicy) for valid String values.
        referrerPolicy: !1
      },
      initialize: function(t, e) {
        this._url = t, e = E(this, e), e.detectRetina && g.retina && e.maxZoom > 0 ? (e.tileSize = Math.floor(e.tileSize / 2), e.zoomReverse ? (e.zoomOffset--, e.minZoom = Math.min(e.maxZoom, e.minZoom + 1)) : (e.zoomOffset++, e.maxZoom = Math.max(e.minZoom, e.maxZoom - 1)), e.minZoom = Math.max(0, e.minZoom)) : e.zoomReverse ? e.minZoom = Math.min(e.maxZoom, e.minZoom) : e.maxZoom = Math.max(e.minZoom, e.maxZoom), typeof e.subdomains == "string" && (e.subdomains = e.subdomains.split("")), this.on("tileunload", this._onTileRemove);
      },
      // @method setUrl(url: String, noRedraw?: Boolean): this
      // Updates the layer's URL template and redraws it (unless `noRedraw` is set to `true`).
      // If the URL does not change, the layer will not be redrawn unless
      // the noRedraw parameter is set to false.
      setUrl: function(t, e) {
        return this._url === t && e === void 0 && (e = !0), this._url = t, e || this.redraw(), this;
      },
      // @method createTile(coords: Object, done?: Function): HTMLElement
      // Called only internally, overrides GridLayer's [`createTile()`](#gridlayer-createtile)
      // to return an `<img>` HTML element with the appropriate image URL given `coords`. The `done`
      // callback is called when the tile has been loaded.
      createTile: function(t, e) {
        var i = document.createElement("img");
        return C(i, "load", c(this._tileOnLoad, this, e, i)), C(i, "error", c(this._tileOnError, this, e, i)), (this.options.crossOrigin || this.options.crossOrigin === "") && (i.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), typeof this.options.referrerPolicy == "string" && (i.referrerPolicy = this.options.referrerPolicy), i.alt = "", i.src = this.getTileUrl(t), i;
      },
      // @section Extension methods
      // @uninheritable
      // Layers extending `TileLayer` might reimplement the following method.
      // @method getTileUrl(coords: Object): String
      // Called only internally, returns the URL for a tile given its coordinates.
      // Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
      getTileUrl: function(t) {
        var e = {
          r: g.retina ? "@2x" : "",
          s: this._getSubdomain(t),
          x: t.x,
          y: t.y,
          z: this._getZoomForUrl()
        };
        if (this._map && !this._map.options.crs.infinite) {
          var i = this._globalTileRange.max.y - t.y;
          this.options.tms && (e.y = i), e["-y"] = i;
        }
        return Z(this._url, l(e, this.options));
      },
      _tileOnLoad: function(t, e) {
        g.ielt9 ? setTimeout(c(t, this, null, e), 0) : t(null, e);
      },
      _tileOnError: function(t, e, i) {
        var n = this.options.errorTileUrl;
        n && e.getAttribute("src") !== n && (e.src = n), t(i, e);
      },
      _onTileRemove: function(t) {
        t.tile.onload = null;
      },
      _getZoomForUrl: function() {
        var t = this._tileZoom, e = this.options.maxZoom, i = this.options.zoomReverse, n = this.options.zoomOffset;
        return i && (t = e - t), t + n;
      },
      _getSubdomain: function(t) {
        var e = Math.abs(t.x + t.y) % this.options.subdomains.length;
        return this.options.subdomains[e];
      },
      // stops loading all tiles in the background layer
      _abortLoading: function() {
        var t, e;
        for (t in this._tiles)
          if (this._tiles[t].coords.z !== this._tileZoom && (e = this._tiles[t].el, e.onload = T, e.onerror = T, !e.complete)) {
            e.src = G;
            var i = this._tiles[t].coords;
            V(e), delete this._tiles[t], this.fire("tileabort", {
              tile: e,
              coords: i
            });
          }
      },
      _removeTile: function(t) {
        var e = this._tiles[t];
        if (e)
          return e.el.setAttribute("src", G), he.prototype._removeTile.call(this, t);
      },
      _tileReady: function(t, e, i) {
        if (!(!this._map || i && i.getAttribute("src") === G))
          return he.prototype._tileReady.call(this, t, e, i);
      }
    });
    function yn(t, e) {
      return new Ut(t, e);
    }
    var wn = Ut.extend({
      // @section
      // @aka TileLayer.WMS options
      // If any custom options not documented here are used, they will be sent to the
      // WMS server as extra parameters in each request URL. This can be useful for
      // [non-standard vendor WMS parameters](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html).
      defaultWmsParams: {
        service: "WMS",
        request: "GetMap",
        // @option layers: String = ''
        // **(required)** Comma-separated list of WMS layers to show.
        layers: "",
        // @option styles: String = ''
        // Comma-separated list of WMS styles.
        styles: "",
        // @option format: String = 'image/jpeg'
        // WMS image format (use `'image/png'` for layers with transparency).
        format: "image/jpeg",
        // @option transparent: Boolean = false
        // If `true`, the WMS service will return images with transparency.
        transparent: !1,
        // @option version: String = '1.1.1'
        // Version of the WMS service to use
        version: "1.1.1"
      },
      options: {
        // @option crs: CRS = null
        // Coordinate Reference System to use for the WMS requests, defaults to
        // map CRS. Don't change this if you're not sure what it means.
        crs: null,
        // @option uppercase: Boolean = false
        // If `true`, WMS request parameter keys will be uppercase.
        uppercase: !1
      },
      initialize: function(t, e) {
        this._url = t;
        var i = l({}, this.defaultWmsParams);
        for (var n in e)
          n in this.options || (i[n] = e[n]);
        e = E(this, e);
        var o = e.detectRetina && g.retina ? 2 : 1, r = this.getTileSize();
        i.width = r.x * o, i.height = r.y * o, this.wmsParams = i;
      },
      onAdd: function(t) {
        this._crs = this.options.crs || t.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
        var e = this._wmsVersion >= 1.3 ? "crs" : "srs";
        this.wmsParams[e] = this._crs.code, Ut.prototype.onAdd.call(this, t);
      },
      getTileUrl: function(t) {
        var e = this._tileCoordsToNwSe(t), i = this._crs, n = st(i.project(e[0]), i.project(e[1])), o = n.min, r = n.max, s = (this._wmsVersion >= 1.3 && this._crs === fn ? [o.y, o.x, r.y, r.x] : [o.x, o.y, r.x, r.y]).join(","), a = Ut.prototype.getTileUrl.call(this, t);
        return a + W(this.wmsParams, a, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + s;
      },
      // @method setParams(params: Object, noRedraw?: Boolean): this
      // Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
      setParams: function(t, e) {
        return l(this.wmsParams, t), e || this.redraw(), this;
      }
    });
    function er(t, e) {
      return new wn(t, e);
    }
    Ut.WMS = wn, yn.wms = er;
    var bt = mt.extend({
      // @section
      // @aka Renderer options
      options: {
        // @option padding: Number = 0.1
        // How much to extend the clip area around the map view (relative to its size)
        // e.g. 0.1 would be 10% of map view in each direction
        padding: 0.1
      },
      initialize: function(t) {
        E(this, t), _(this), this._layers = this._layers || {};
      },
      onAdd: function() {
        this._container || (this._initContainer(), k(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this);
      },
      onRemove: function() {
        this.off("update", this._updatePaths, this), this._destroyContainer();
      },
      getEvents: function() {
        var t = {
          viewreset: this._reset,
          zoom: this._onZoom,
          moveend: this._update,
          zoomend: this._onZoomEnd
        };
        return this._zoomAnimated && (t.zoomanim = this._onAnimZoom), t;
      },
      _onAnimZoom: function(t) {
        this._updateTransform(t.center, t.zoom);
      },
      _onZoom: function() {
        this._updateTransform(this._map.getCenter(), this._map.getZoom());
      },
      _updateTransform: function(t, e) {
        var i = this._map.getZoomScale(e, this._zoom), n = this._map.getSize().multiplyBy(0.5 + this.options.padding), o = this._map.project(this._center, e), r = n.multiplyBy(-i).add(o).subtract(this._map._getNewPixelOrigin(t, e));
        g.any3d ? zt(this._container, r, i) : Y(this._container, r);
      },
      _reset: function() {
        this._update(), this._updateTransform(this._center, this._zoom);
        for (var t in this._layers)
          this._layers[t]._reset();
      },
      _onZoomEnd: function() {
        for (var t in this._layers)
          this._layers[t]._project();
      },
      _updatePaths: function() {
        for (var t in this._layers)
          this._layers[t]._update();
      },
      _update: function() {
        var t = this.options.padding, e = this._map.getSize(), i = this._map.containerPointToLayerPoint(e.multiplyBy(-t)).round();
        this._bounds = new j(i, i.add(e.multiplyBy(1 + t * 2)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom();
      }
    }), xn = bt.extend({
      // @section
      // @aka Canvas options
      options: {
        // @option tolerance: Number = 0
        // How much to extend the click tolerance around a path/object on the map.
        tolerance: 0
      },
      getEvents: function() {
        var t = bt.prototype.getEvents.call(this);
        return t.viewprereset = this._onViewPreReset, t;
      },
      _onViewPreReset: function() {
        this._postponeUpdatePaths = !0;
      },
      onAdd: function() {
        bt.prototype.onAdd.call(this), this._draw();
      },
      _initContainer: function() {
        var t = this._container = document.createElement("canvas");
        C(t, "mousemove", this._onMouseMove, this), C(t, "click dblclick mousedown mouseup contextmenu", this._onClick, this), C(t, "mouseout", this._handleMouseOut, this), t._leaflet_disable_events = !0, this._ctx = t.getContext("2d");
      },
      _destroyContainer: function() {
        rt(this._redrawRequest), delete this._ctx, V(this._container), U(this._container), delete this._container;
      },
      _updatePaths: function() {
        if (!this._postponeUpdatePaths) {
          var t;
          this._redrawBounds = null;
          for (var e in this._layers)
            t = this._layers[e], t._update();
          this._redraw();
        }
      },
      _update: function() {
        if (!(this._map._animatingZoom && this._bounds)) {
          bt.prototype._update.call(this);
          var t = this._bounds, e = this._container, i = t.getSize(), n = g.retina ? 2 : 1;
          Y(e, t.min), e.width = n * i.x, e.height = n * i.y, e.style.width = i.x + "px", e.style.height = i.y + "px", g.retina && this._ctx.scale(2, 2), this._ctx.translate(-t.min.x, -t.min.y), this.fire("update");
        }
      },
      _reset: function() {
        bt.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths());
      },
      _initPath: function(t) {
        this._updateDashArray(t), this._layers[_(t)] = t;
        var e = t._order = {
          layer: t,
          prev: this._drawLast,
          next: null
        };
        this._drawLast && (this._drawLast.next = e), this._drawLast = e, this._drawFirst = this._drawFirst || this._drawLast;
      },
      _addPath: function(t) {
        this._requestRedraw(t);
      },
      _removePath: function(t) {
        var e = t._order, i = e.next, n = e.prev;
        i ? i.prev = n : this._drawLast = n, n ? n.next = i : this._drawFirst = i, delete t._order, delete this._layers[_(t)], this._requestRedraw(t);
      },
      _updatePath: function(t) {
        this._extendRedrawBounds(t), t._project(), t._update(), this._requestRedraw(t);
      },
      _updateStyle: function(t) {
        this._updateDashArray(t), this._requestRedraw(t);
      },
      _updateDashArray: function(t) {
        if (typeof t.options.dashArray == "string") {
          var e = t.options.dashArray.split(/[, ]+/), i = [], n, o;
          for (o = 0; o < e.length; o++) {
            if (n = Number(e[o]), isNaN(n))
              return;
            i.push(n);
          }
          t.options._dashArray = i;
        } else
          t.options._dashArray = t.options.dashArray;
      },
      _requestRedraw: function(t) {
        this._map && (this._extendRedrawBounds(t), this._redrawRequest = this._redrawRequest || it(this._redraw, this));
      },
      _extendRedrawBounds: function(t) {
        if (t._pxBounds) {
          var e = (t.options.weight || 0) + 1;
          this._redrawBounds = this._redrawBounds || new j(), this._redrawBounds.extend(t._pxBounds.min.subtract([e, e])), this._redrawBounds.extend(t._pxBounds.max.add([e, e]));
        }
      },
      _redraw: function() {
        this._redrawRequest = null, this._redrawBounds && (this._redrawBounds.min._floor(), this._redrawBounds.max._ceil()), this._clear(), this._draw(), this._redrawBounds = null;
      },
      _clear: function() {
        var t = this._redrawBounds;
        if (t) {
          var e = t.getSize();
          this._ctx.clearRect(t.min.x, t.min.y, e.x, e.y);
        } else
          this._ctx.save(), this._ctx.setTransform(1, 0, 0, 1, 0, 0), this._ctx.clearRect(0, 0, this._container.width, this._container.height), this._ctx.restore();
      },
      _draw: function() {
        var t, e = this._redrawBounds;
        if (this._ctx.save(), e) {
          var i = e.getSize();
          this._ctx.beginPath(), this._ctx.rect(e.min.x, e.min.y, i.x, i.y), this._ctx.clip();
        }
        this._drawing = !0;
        for (var n = this._drawFirst; n; n = n.next)
          t = n.layer, (!e || t._pxBounds && t._pxBounds.intersects(e)) && t._updatePath();
        this._drawing = !1, this._ctx.restore();
      },
      _updatePoly: function(t, e) {
        if (this._drawing) {
          var i, n, o, r, s = t._parts, a = s.length, u = this._ctx;
          if (a) {
            for (u.beginPath(), i = 0; i < a; i++) {
              for (n = 0, o = s[i].length; n < o; n++)
                r = s[i][n], u[n ? "lineTo" : "moveTo"](r.x, r.y);
              e && u.closePath();
            }
            this._fillStroke(u, t);
          }
        }
      },
      _updateCircle: function(t) {
        if (!(!this._drawing || t._empty())) {
          var e = t._point, i = this._ctx, n = Math.max(Math.round(t._radius), 1), o = (Math.max(Math.round(t._radiusY), 1) || n) / n;
          o !== 1 && (i.save(), i.scale(1, o)), i.beginPath(), i.arc(e.x, e.y / o, n, 0, Math.PI * 2, !1), o !== 1 && i.restore(), this._fillStroke(i, t);
        }
      },
      _fillStroke: function(t, e) {
        var i = e.options;
        i.fill && (t.globalAlpha = i.fillOpacity, t.fillStyle = i.fillColor || i.color, t.fill(i.fillRule || "evenodd")), i.stroke && i.weight !== 0 && (t.setLineDash && t.setLineDash(e.options && e.options._dashArray || []), t.globalAlpha = i.opacity, t.lineWidth = i.weight, t.strokeStyle = i.color, t.lineCap = i.lineCap, t.lineJoin = i.lineJoin, t.stroke());
      },
      // Canvas obviously doesn't have mouse events for individual drawn objects,
      // so we emulate that by calculating what's under the mouse on mousemove/click manually
      _onClick: function(t) {
        for (var e = this._map.mouseEventToLayerPoint(t), i, n, o = this._drawFirst; o; o = o.next)
          i = o.layer, i.options.interactive && i._containsPoint(e) && (!(t.type === "click" || t.type === "preclick") || !this._map._draggableMoved(i)) && (n = i);
        this._fireEvent(n ? [n] : !1, t);
      },
      _onMouseMove: function(t) {
        if (!(!this._map || this._map.dragging.moving() || this._map._animatingZoom)) {
          var e = this._map.mouseEventToLayerPoint(t);
          this._handleMouseHover(t, e);
        }
      },
      _handleMouseOut: function(t) {
        var e = this._hoveredLayer;
        e && (q(this._container, "leaflet-interactive"), this._fireEvent([e], t, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = !1);
      },
      _handleMouseHover: function(t, e) {
        if (!this._mouseHoverThrottled) {
          for (var i, n, o = this._drawFirst; o; o = o.next)
            i = o.layer, i.options.interactive && i._containsPoint(e) && (n = i);
          n !== this._hoveredLayer && (this._handleMouseOut(t), n && (k(this._container, "leaflet-interactive"), this._fireEvent([n], t, "mouseover"), this._hoveredLayer = n)), this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : !1, t), this._mouseHoverThrottled = !0, setTimeout(c(function() {
            this._mouseHoverThrottled = !1;
          }, this), 32);
        }
      },
      _fireEvent: function(t, e, i) {
        this._map._fireDOMEvent(e, i || e.type, t);
      },
      _bringToFront: function(t) {
        var e = t._order;
        if (e) {
          var i = e.next, n = e.prev;
          if (i)
            i.prev = n;
          else
            return;
          n ? n.next = i : i && (this._drawFirst = i), e.prev = this._drawLast, this._drawLast.next = e, e.next = null, this._drawLast = e, this._requestRedraw(t);
        }
      },
      _bringToBack: function(t) {
        var e = t._order;
        if (e) {
          var i = e.next, n = e.prev;
          if (n)
            n.next = i;
          else
            return;
          i ? i.prev = n : n && (this._drawLast = n), e.prev = null, e.next = this._drawFirst, this._drawFirst.prev = e, this._drawFirst = e, this._requestRedraw(t);
        }
      }
    });
    function Pn(t) {
      return g.canvas ? new xn(t) : null;
    }
    var ue = function() {
      try {
        return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(t) {
          return document.createElement("<lvml:" + t + ' class="lvml">');
        };
      } catch {
      }
      return function(t) {
        return document.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
      };
    }(), ir = {
      _initContainer: function() {
        this._container = N("div", "leaflet-vml-container");
      },
      _update: function() {
        this._map._animatingZoom || (bt.prototype._update.call(this), this.fire("update"));
      },
      _initPath: function(t) {
        var e = t._container = ue("shape");
        k(e, "leaflet-vml-shape " + (this.options.className || "")), e.coordsize = "1 1", t._path = ue("path"), e.appendChild(t._path), this._updateStyle(t), this._layers[_(t)] = t;
      },
      _addPath: function(t) {
        var e = t._container;
        this._container.appendChild(e), t.options.interactive && t.addInteractiveTarget(e);
      },
      _removePath: function(t) {
        var e = t._container;
        V(e), t.removeInteractiveTarget(e), delete this._layers[_(t)];
      },
      _updateStyle: function(t) {
        var e = t._stroke, i = t._fill, n = t.options, o = t._container;
        o.stroked = !!n.stroke, o.filled = !!n.fill, n.stroke ? (e || (e = t._stroke = ue("stroke")), o.appendChild(e), e.weight = n.weight + "px", e.color = n.color, e.opacity = n.opacity, n.dashArray ? e.dashStyle = P(n.dashArray) ? n.dashArray.join(" ") : n.dashArray.replace(/( *, *)/g, " ") : e.dashStyle = "", e.endcap = n.lineCap.replace("butt", "flat"), e.joinstyle = n.lineJoin) : e && (o.removeChild(e), t._stroke = null), n.fill ? (i || (i = t._fill = ue("fill")), o.appendChild(i), i.color = n.fillColor || n.color, i.opacity = n.fillOpacity) : i && (o.removeChild(i), t._fill = null);
      },
      _updateCircle: function(t) {
        var e = t._point.round(), i = Math.round(t._radius), n = Math.round(t._radiusY || i);
        this._setPath(t, t._empty() ? "M0 0" : "AL " + e.x + "," + e.y + " " + i + "," + n + " 0," + 65535 * 360);
      },
      _setPath: function(t, e) {
        t._path.v = e;
      },
      _bringToFront: function(t) {
        Nt(t._container);
      },
      _bringToBack: function(t) {
        Rt(t._container);
      }
    }, Oe = g.vml ? ue : Ti, le = bt.extend({
      _initContainer: function() {
        this._container = Oe("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = Oe("g"), this._container.appendChild(this._rootGroup);
      },
      _destroyContainer: function() {
        V(this._container), U(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
      },
      _update: function() {
        if (!(this._map._animatingZoom && this._bounds)) {
          bt.prototype._update.call(this);
          var t = this._bounds, e = t.getSize(), i = this._container;
          (!this._svgSize || !this._svgSize.equals(e)) && (this._svgSize = e, i.setAttribute("width", e.x), i.setAttribute("height", e.y)), Y(i, t.min), i.setAttribute("viewBox", [t.min.x, t.min.y, e.x, e.y].join(" ")), this.fire("update");
        }
      },
      // methods below are called by vector layers implementations
      _initPath: function(t) {
        var e = t._path = Oe("path");
        t.options.className && k(e, t.options.className), t.options.interactive && k(e, "leaflet-interactive"), this._updateStyle(t), this._layers[_(t)] = t;
      },
      _addPath: function(t) {
        this._rootGroup || this._initContainer(), this._rootGroup.appendChild(t._path), t.addInteractiveTarget(t._path);
      },
      _removePath: function(t) {
        V(t._path), t.removeInteractiveTarget(t._path), delete this._layers[_(t)];
      },
      _updatePath: function(t) {
        t._project(), t._update();
      },
      _updateStyle: function(t) {
        var e = t._path, i = t.options;
        e && (i.stroke ? (e.setAttribute("stroke", i.color), e.setAttribute("stroke-opacity", i.opacity), e.setAttribute("stroke-width", i.weight), e.setAttribute("stroke-linecap", i.lineCap), e.setAttribute("stroke-linejoin", i.lineJoin), i.dashArray ? e.setAttribute("stroke-dasharray", i.dashArray) : e.removeAttribute("stroke-dasharray"), i.dashOffset ? e.setAttribute("stroke-dashoffset", i.dashOffset) : e.removeAttribute("stroke-dashoffset")) : e.setAttribute("stroke", "none"), i.fill ? (e.setAttribute("fill", i.fillColor || i.color), e.setAttribute("fill-opacity", i.fillOpacity), e.setAttribute("fill-rule", i.fillRule || "evenodd")) : e.setAttribute("fill", "none"));
      },
      _updatePoly: function(t, e) {
        this._setPath(t, Mi(t._parts, e));
      },
      _updateCircle: function(t) {
        var e = t._point, i = Math.max(Math.round(t._radius), 1), n = Math.max(Math.round(t._radiusY), 1) || i, o = "a" + i + "," + n + " 0 1,0 ", r = t._empty() ? "M0 0" : "M" + (e.x - i) + "," + e.y + o + i * 2 + ",0 " + o + -i * 2 + ",0 ";
        this._setPath(t, r);
      },
      _setPath: function(t, e) {
        t._path.setAttribute("d", e);
      },
      // SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
      _bringToFront: function(t) {
        Nt(t._path);
      },
      _bringToBack: function(t) {
        Rt(t._path);
      }
    });
    g.vml && le.include(ir);
    function Ln(t) {
      return g.svg || g.vml ? new le(t) : null;
    }
    B.include({
      // @namespace Map; @method getRenderer(layer: Path): Renderer
      // Returns the instance of `Renderer` that should be used to render the given
      // `Path`. It will ensure that the `renderer` options of the map and paths
      // are respected, and that the renderers do exist on the map.
      getRenderer: function(t) {
        var e = t.options.renderer || this._getPaneRenderer(t.options.pane) || this.options.renderer || this._renderer;
        return e || (e = this._renderer = this._createRenderer()), this.hasLayer(e) || this.addLayer(e), e;
      },
      _getPaneRenderer: function(t) {
        if (t === "overlayPane" || t === void 0)
          return !1;
        var e = this._paneRenderers[t];
        return e === void 0 && (e = this._createRenderer({ pane: t }), this._paneRenderers[t] = e), e;
      },
      _createRenderer: function(t) {
        return this.options.preferCanvas && Pn(t) || Ln(t);
      }
    });
    var bn = Ft.extend({
      initialize: function(t, e) {
        Ft.prototype.initialize.call(this, this._boundsToLatLngs(t), e);
      },
      // @method setBounds(latLngBounds: LatLngBounds): this
      // Redraws the rectangle with the passed bounds.
      setBounds: function(t) {
        return this.setLatLngs(this._boundsToLatLngs(t));
      },
      _boundsToLatLngs: function(t) {
        return t = X(t), [
          t.getSouthWest(),
          t.getNorthWest(),
          t.getNorthEast(),
          t.getSouthEast()
        ];
      }
    });
    function nr(t, e) {
      return new bn(t, e);
    }
    le.create = Oe, le.pointsToPath = Mi, Lt.geometryToLayer = Te, Lt.coordsToLatLng = pi, Lt.coordsToLatLngs = Me, Lt.latLngToCoords = vi, Lt.latLngsToCoords = Se, Lt.getFeature = Wt, Lt.asFeature = Ce, B.mergeOptions({
      // @option boxZoom: Boolean = true
      // Whether the map can be zoomed to a rectangular area specified by
      // dragging the mouse while pressing the shift key.
      boxZoom: !0
    });
    var Tn = gt.extend({
      initialize: function(t) {
        this._map = t, this._container = t._container, this._pane = t._panes.overlayPane, this._resetStateTimeout = 0, t.on("unload", this._destroy, this);
      },
      addHooks: function() {
        C(this._container, "mousedown", this._onMouseDown, this);
      },
      removeHooks: function() {
        U(this._container, "mousedown", this._onMouseDown, this);
      },
      moved: function() {
        return this._moved;
      },
      _destroy: function() {
        V(this._pane), delete this._pane;
      },
      _resetState: function() {
        this._resetStateTimeout = 0, this._moved = !1;
      },
      _clearDeferredResetState: function() {
        this._resetStateTimeout !== 0 && (clearTimeout(this._resetStateTimeout), this._resetStateTimeout = 0);
      },
      _onMouseDown: function(t) {
        if (!t.shiftKey || t.which !== 1 && t.button !== 1)
          return !1;
        this._clearDeferredResetState(), this._resetState(), ee(), Qe(), this._startPoint = this._map.mouseEventToContainerPoint(t), C(document, {
          contextmenu: Zt,
          mousemove: this._onMouseMove,
          mouseup: this._onMouseUp,
          keydown: this._onKeyDown
        }, this);
      },
      _onMouseMove: function(t) {
        this._moved || (this._moved = !0, this._box = N("div", "leaflet-zoom-box", this._container), k(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(t);
        var e = new j(this._point, this._startPoint), i = e.getSize();
        Y(this._box, e.min), this._box.style.width = i.x + "px", this._box.style.height = i.y + "px";
      },
      _finish: function() {
        this._moved && (V(this._box), q(this._container, "leaflet-crosshair")), ie(), ti(), U(document, {
          contextmenu: Zt,
          mousemove: this._onMouseMove,
          mouseup: this._onMouseUp,
          keydown: this._onKeyDown
        }, this);
      },
      _onMouseUp: function(t) {
        if (!(t.which !== 1 && t.button !== 1) && (this._finish(), !!this._moved)) {
          this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(c(this._resetState, this), 0);
          var e = new at(
            this._map.containerPointToLatLng(this._startPoint),
            this._map.containerPointToLatLng(this._point)
          );
          this._map.fitBounds(e).fire("boxzoomend", { boxZoomBounds: e });
        }
      },
      _onKeyDown: function(t) {
        t.keyCode === 27 && (this._finish(), this._clearDeferredResetState(), this._resetState());
      }
    });
    B.addInitHook("addHandler", "boxZoom", Tn), B.mergeOptions({
      // @option doubleClickZoom: Boolean|String = true
      // Whether the map can be zoomed in by double clicking on it and
      // zoomed out by double clicking while holding shift. If passed
      // `'center'`, double-click zoom will zoom to the center of the
      //  view regardless of where the mouse was.
      doubleClickZoom: !0
    });
    var Mn = gt.extend({
      addHooks: function() {
        this._map.on("dblclick", this._onDoubleClick, this);
      },
      removeHooks: function() {
        this._map.off("dblclick", this._onDoubleClick, this);
      },
      _onDoubleClick: function(t) {
        var e = this._map, i = e.getZoom(), n = e.options.zoomDelta, o = t.originalEvent.shiftKey ? i - n : i + n;
        e.options.doubleClickZoom === "center" ? e.setZoom(o) : e.setZoomAround(t.containerPoint, o);
      }
    });
    B.addInitHook("addHandler", "doubleClickZoom", Mn), B.mergeOptions({
      // @option dragging: Boolean = true
      // Whether the map is draggable with mouse/touch or not.
      dragging: !0,
      // @section Panning Inertia Options
      // @option inertia: Boolean = *
      // If enabled, panning of the map will have an inertia effect where
      // the map builds momentum while dragging and continues moving in
      // the same direction for some time. Feels especially nice on touch
      // devices. Enabled by default.
      inertia: !0,
      // @option inertiaDeceleration: Number = 3000
      // The rate with which the inertial movement slows down, in pixels/second².
      inertiaDeceleration: 3400,
      // px/s^2
      // @option inertiaMaxSpeed: Number = Infinity
      // Max speed of the inertial movement, in pixels/second.
      inertiaMaxSpeed: 1 / 0,
      // px/s
      // @option easeLinearity: Number = 0.2
      easeLinearity: 0.2,
      // TODO refactor, move to CRS
      // @option worldCopyJump: Boolean = false
      // With this option enabled, the map tracks when you pan to another "copy"
      // of the world and seamlessly jumps to the original one so that all overlays
      // like markers and vector layers are still visible.
      worldCopyJump: !1,
      // @option maxBoundsViscosity: Number = 0.0
      // If `maxBounds` is set, this option will control how solid the bounds
      // are when dragging the map around. The default value of `0.0` allows the
      // user to drag outside the bounds at normal speed, higher values will
      // slow down map dragging outside bounds, and `1.0` makes the bounds fully
      // solid, preventing the user from dragging outside the bounds.
      maxBoundsViscosity: 0
    });
    var Sn = gt.extend({
      addHooks: function() {
        if (!this._draggable) {
          var t = this._map;
          this._draggable = new St(t._mapPane, t._container), this._draggable.on({
            dragstart: this._onDragStart,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this), this._draggable.on("predrag", this._onPreDragLimit, this), t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), t.on("zoomend", this._onZoomEnd, this), t.whenReady(this._onZoomEnd, this));
        }
        k(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = [];
      },
      removeHooks: function() {
        q(this._map._container, "leaflet-grab"), q(this._map._container, "leaflet-touch-drag"), this._draggable.disable();
      },
      moved: function() {
        return this._draggable && this._draggable._moved;
      },
      moving: function() {
        return this._draggable && this._draggable._moving;
      },
      _onDragStart: function() {
        var t = this._map;
        if (t._stop(), this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
          var e = X(this._map.options.maxBounds);
          this._offsetLimit = st(
            this._map.latLngToContainerPoint(e.getNorthWest()).multiplyBy(-1),
            this._map.latLngToContainerPoint(e.getSouthEast()).multiplyBy(-1).add(this._map.getSize())
          ), this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity));
        } else
          this._offsetLimit = null;
        t.fire("movestart").fire("dragstart"), t.options.inertia && (this._positions = [], this._times = []);
      },
      _onDrag: function(t) {
        if (this._map.options.inertia) {
          var e = this._lastTime = +/* @__PURE__ */ new Date(), i = this._lastPos = this._draggable._absPos || this._draggable._newPos;
          this._positions.push(i), this._times.push(e), this._prunePositions(e);
        }
        this._map.fire("move", t).fire("drag", t);
      },
      _prunePositions: function(t) {
        for (; this._positions.length > 1 && t - this._times[0] > 50; )
          this._positions.shift(), this._times.shift();
      },
      _onZoomEnd: function() {
        var t = this._map.getSize().divideBy(2), e = this._map.latLngToLayerPoint([0, 0]);
        this._initialWorldOffset = e.subtract(t).x, this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
      },
      _viscousLimit: function(t, e) {
        return t - (t - e) * this._viscosity;
      },
      _onPreDragLimit: function() {
        if (!(!this._viscosity || !this._offsetLimit)) {
          var t = this._draggable._newPos.subtract(this._draggable._startPos), e = this._offsetLimit;
          t.x < e.min.x && (t.x = this._viscousLimit(t.x, e.min.x)), t.y < e.min.y && (t.y = this._viscousLimit(t.y, e.min.y)), t.x > e.max.x && (t.x = this._viscousLimit(t.x, e.max.x)), t.y > e.max.y && (t.y = this._viscousLimit(t.y, e.max.y)), this._draggable._newPos = this._draggable._startPos.add(t);
        }
      },
      _onPreDragWrap: function() {
        var t = this._worldWidth, e = Math.round(t / 2), i = this._initialWorldOffset, n = this._draggable._newPos.x, o = (n - e + i) % t + e - i, r = (n + e + i) % t - e - i, s = Math.abs(o + i) < Math.abs(r + i) ? o : r;
        this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = s;
      },
      _onDragEnd: function(t) {
        var e = this._map, i = e.options, n = !i.inertia || t.noInertia || this._times.length < 2;
        if (e.fire("dragend", t), n)
          e.fire("moveend");
        else {
          this._prunePositions(+/* @__PURE__ */ new Date());
          var o = this._lastPos.subtract(this._positions[0]), r = (this._lastTime - this._times[0]) / 1e3, s = i.easeLinearity, a = o.multiplyBy(s / r), u = a.distanceTo([0, 0]), f = Math.min(i.inertiaMaxSpeed, u), m = a.multiplyBy(f / u), x = f / (i.inertiaDeceleration * s), O = m.multiplyBy(-x / 2).round();
          !O.x && !O.y ? e.fire("moveend") : (O = e._limitOffset(O, e.options.maxBounds), it(function() {
            e.panBy(O, {
              duration: x,
              easeLinearity: s,
              noMoveStart: !0,
              animate: !0
            });
          }));
        }
      }
    });
    B.addInitHook("addHandler", "dragging", Sn), B.mergeOptions({
      // @option keyboard: Boolean = true
      // Makes the map focusable and allows users to navigate the map with keyboard
      // arrows and `+`/`-` keys.
      keyboard: !0,
      // @option keyboardPanDelta: Number = 80
      // Amount of pixels to pan when pressing an arrow key.
      keyboardPanDelta: 80
    });
    var Cn = gt.extend({
      keyCodes: {
        left: [37],
        right: [39],
        down: [40],
        up: [38],
        zoomIn: [187, 107, 61, 171],
        zoomOut: [189, 109, 54, 173]
      },
      initialize: function(t) {
        this._map = t, this._setPanDelta(t.options.keyboardPanDelta), this._setZoomDelta(t.options.zoomDelta);
      },
      addHooks: function() {
        var t = this._map._container;
        t.tabIndex <= 0 && (t.tabIndex = "0"), C(t, {
          focus: this._onFocus,
          blur: this._onBlur,
          mousedown: this._onMouseDown
        }, this), this._map.on({
          focus: this._addHooks,
          blur: this._removeHooks
        }, this);
      },
      removeHooks: function() {
        this._removeHooks(), U(this._map._container, {
          focus: this._onFocus,
          blur: this._onBlur,
          mousedown: this._onMouseDown
        }, this), this._map.off({
          focus: this._addHooks,
          blur: this._removeHooks
        }, this);
      },
      _onMouseDown: function() {
        if (!this._focused) {
          var t = document.body, e = document.documentElement, i = t.scrollTop || e.scrollTop, n = t.scrollLeft || e.scrollLeft;
          this._map._container.focus(), window.scrollTo(n, i);
        }
      },
      _onFocus: function() {
        this._focused = !0, this._map.fire("focus");
      },
      _onBlur: function() {
        this._focused = !1, this._map.fire("blur");
      },
      _setPanDelta: function(t) {
        var e = this._panKeys = {}, i = this.keyCodes, n, o;
        for (n = 0, o = i.left.length; n < o; n++)
          e[i.left[n]] = [-1 * t, 0];
        for (n = 0, o = i.right.length; n < o; n++)
          e[i.right[n]] = [t, 0];
        for (n = 0, o = i.down.length; n < o; n++)
          e[i.down[n]] = [0, t];
        for (n = 0, o = i.up.length; n < o; n++)
          e[i.up[n]] = [0, -1 * t];
      },
      _setZoomDelta: function(t) {
        var e = this._zoomKeys = {}, i = this.keyCodes, n, o;
        for (n = 0, o = i.zoomIn.length; n < o; n++)
          e[i.zoomIn[n]] = t;
        for (n = 0, o = i.zoomOut.length; n < o; n++)
          e[i.zoomOut[n]] = -t;
      },
      _addHooks: function() {
        C(document, "keydown", this._onKeyDown, this);
      },
      _removeHooks: function() {
        U(document, "keydown", this._onKeyDown, this);
      },
      _onKeyDown: function(t) {
        if (!(t.altKey || t.ctrlKey || t.metaKey)) {
          var e = t.keyCode, i = this._map, n;
          if (e in this._panKeys) {
            if (!i._panAnim || !i._panAnim._inProgress)
              if (n = this._panKeys[e], t.shiftKey && (n = M(n).multiplyBy(3)), i.options.maxBounds && (n = i._limitOffset(M(n), i.options.maxBounds)), i.options.worldCopyJump) {
                var o = i.wrapLatLng(i.unproject(i.project(i.getCenter()).add(n)));
                i.panTo(o);
              } else
                i.panBy(n);
          } else if (e in this._zoomKeys)
            i.setZoom(i.getZoom() + (t.shiftKey ? 3 : 1) * this._zoomKeys[e]);
          else if (e === 27 && i._popup && i._popup.options.closeOnEscapeKey)
            i.closePopup();
          else
            return;
          Zt(t);
        }
      }
    });
    B.addInitHook("addHandler", "keyboard", Cn), B.mergeOptions({
      // @section Mouse wheel options
      // @option scrollWheelZoom: Boolean|String = true
      // Whether the map can be zoomed by using the mouse wheel. If passed `'center'`,
      // it will zoom to the center of the view regardless of where the mouse was.
      scrollWheelZoom: !0,
      // @option wheelDebounceTime: Number = 40
      // Limits the rate at which a wheel can fire (in milliseconds). By default
      // user can't zoom via wheel more often than once per 40 ms.
      wheelDebounceTime: 40,
      // @option wheelPxPerZoomLevel: Number = 60
      // How many scroll pixels (as reported by [L.DomEvent.getWheelDelta](#domevent-getwheeldelta))
      // mean a change of one full zoom level. Smaller values will make wheel-zooming
      // faster (and vice versa).
      wheelPxPerZoomLevel: 60
    });
    var kn = gt.extend({
      addHooks: function() {
        C(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
      },
      removeHooks: function() {
        U(this._map._container, "wheel", this._onWheelScroll, this);
      },
      _onWheelScroll: function(t) {
        var e = $i(t), i = this._map.options.wheelDebounceTime;
        this._delta += e, this._lastMousePos = this._map.mouseEventToContainerPoint(t), this._startTime || (this._startTime = +/* @__PURE__ */ new Date());
        var n = Math.max(i - (+/* @__PURE__ */ new Date() - this._startTime), 0);
        clearTimeout(this._timer), this._timer = setTimeout(c(this._performZoom, this), n), Zt(t);
      },
      _performZoom: function() {
        var t = this._map, e = t.getZoom(), i = this._map.options.zoomSnap || 0;
        t._stop();
        var n = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), o = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(n)))) / Math.LN2, r = i ? Math.ceil(o / i) * i : o, s = t._limitZoom(e + (this._delta > 0 ? r : -r)) - e;
        this._delta = 0, this._startTime = null, s && (t.options.scrollWheelZoom === "center" ? t.setZoom(e + s) : t.setZoomAround(this._lastMousePos, e + s));
      }
    });
    B.addInitHook("addHandler", "scrollWheelZoom", kn);
    var or = 600;
    B.mergeOptions({
      // @section Touch interaction options
      // @option tapHold: Boolean
      // Enables simulation of `contextmenu` event, default is `true` for mobile Safari.
      tapHold: g.touchNative && g.safari && g.mobile,
      // @option tapTolerance: Number = 15
      // The max number of pixels a user can shift his finger during touch
      // for it to be considered a valid tap.
      tapTolerance: 15
    });
    var En = gt.extend({
      addHooks: function() {
        C(this._map._container, "touchstart", this._onDown, this);
      },
      removeHooks: function() {
        U(this._map._container, "touchstart", this._onDown, this);
      },
      _onDown: function(t) {
        if (clearTimeout(this._holdTimeout), t.touches.length === 1) {
          var e = t.touches[0];
          this._startPos = this._newPos = new S(e.clientX, e.clientY), this._holdTimeout = setTimeout(c(function() {
            this._cancel(), this._isTapValid() && (C(document, "touchend", nt), C(document, "touchend touchcancel", this._cancelClickPrevent), this._simulateEvent("contextmenu", e));
          }, this), or), C(document, "touchend touchcancel contextmenu", this._cancel, this), C(document, "touchmove", this._onMove, this);
        }
      },
      _cancelClickPrevent: function t() {
        U(document, "touchend", nt), U(document, "touchend touchcancel", t);
      },
      _cancel: function() {
        clearTimeout(this._holdTimeout), U(document, "touchend touchcancel contextmenu", this._cancel, this), U(document, "touchmove", this._onMove, this);
      },
      _onMove: function(t) {
        var e = t.touches[0];
        this._newPos = new S(e.clientX, e.clientY);
      },
      _isTapValid: function() {
        return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
      },
      _simulateEvent: function(t, e) {
        var i = new MouseEvent(t, {
          bubbles: !0,
          cancelable: !0,
          view: window,
          // detail: 1,
          screenX: e.screenX,
          screenY: e.screenY,
          clientX: e.clientX,
          clientY: e.clientY
          // button: 2,
          // buttons: 2
        });
        i._simulated = !0, e.target.dispatchEvent(i);
      }
    });
    B.addInitHook("addHandler", "tapHold", En), B.mergeOptions({
      // @section Touch interaction options
      // @option touchZoom: Boolean|String = *
      // Whether the map can be zoomed by touch-dragging with two fingers. If
      // passed `'center'`, it will zoom to the center of the view regardless of
      // where the touch events (fingers) were. Enabled for touch-capable web
      // browsers.
      touchZoom: g.touch,
      // @option bounceAtZoomLimits: Boolean = true
      // Set it to false if you don't want the map to zoom beyond min/max zoom
      // and then bounce back when pinch-zooming.
      bounceAtZoomLimits: !0
    });
    var zn = gt.extend({
      addHooks: function() {
        k(this._map._container, "leaflet-touch-zoom"), C(this._map._container, "touchstart", this._onTouchStart, this);
      },
      removeHooks: function() {
        q(this._map._container, "leaflet-touch-zoom"), U(this._map._container, "touchstart", this._onTouchStart, this);
      },
      _onTouchStart: function(t) {
        var e = this._map;
        if (!(!t.touches || t.touches.length !== 2 || e._animatingZoom || this._zooming)) {
          var i = e.mouseEventToContainerPoint(t.touches[0]), n = e.mouseEventToContainerPoint(t.touches[1]);
          this._centerPoint = e.getSize()._divideBy(2), this._startLatLng = e.containerPointToLatLng(this._centerPoint), e.options.touchZoom !== "center" && (this._pinchStartLatLng = e.containerPointToLatLng(i.add(n)._divideBy(2))), this._startDist = i.distanceTo(n), this._startZoom = e.getZoom(), this._moved = !1, this._zooming = !0, e._stop(), C(document, "touchmove", this._onTouchMove, this), C(document, "touchend touchcancel", this._onTouchEnd, this), nt(t);
        }
      },
      _onTouchMove: function(t) {
        if (!(!t.touches || t.touches.length !== 2 || !this._zooming)) {
          var e = this._map, i = e.mouseEventToContainerPoint(t.touches[0]), n = e.mouseEventToContainerPoint(t.touches[1]), o = i.distanceTo(n) / this._startDist;
          if (this._zoom = e.getScaleZoom(o, this._startZoom), !e.options.bounceAtZoomLimits && (this._zoom < e.getMinZoom() && o < 1 || this._zoom > e.getMaxZoom() && o > 1) && (this._zoom = e._limitZoom(this._zoom)), e.options.touchZoom === "center") {
            if (this._center = this._startLatLng, o === 1)
              return;
          } else {
            var r = i._add(n)._divideBy(2)._subtract(this._centerPoint);
            if (o === 1 && r.x === 0 && r.y === 0)
              return;
            this._center = e.unproject(e.project(this._pinchStartLatLng, this._zoom).subtract(r), this._zoom);
          }
          this._moved || (e._moveStart(!0, !1), this._moved = !0), rt(this._animRequest);
          var s = c(e._move, e, this._center, this._zoom, { pinch: !0, round: !1 }, void 0);
          this._animRequest = it(s, this, !0), nt(t);
        }
      },
      _onTouchEnd: function() {
        if (!this._moved || !this._zooming) {
          this._zooming = !1;
          return;
        }
        this._zooming = !1, rt(this._animRequest), U(document, "touchmove", this._onTouchMove, this), U(document, "touchend touchcancel", this._onTouchEnd, this), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom));
      }
    });
    B.addInitHook("addHandler", "touchZoom", zn), B.BoxZoom = Tn, B.DoubleClickZoom = Mn, B.Drag = Sn, B.Keyboard = Cn, B.ScrollWheelZoom = kn, B.TapHold = En, B.TouchZoom = zn, h.Bounds = j, h.Browser = g, h.CRS = wt, h.Canvas = xn, h.Circle = mi, h.CircleMarker = be, h.Class = dt, h.Control = _t, h.DivIcon = gn, h.DivOverlay = yt, h.DomEvent = Po, h.DomUtil = wo, h.Draggable = St, h.Evented = Yt, h.FeatureGroup = xt, h.GeoJSON = Lt, h.GridLayer = he, h.Handler = gt, h.Icon = Ht, h.ImageOverlay = ke, h.LatLng = F, h.LatLngBounds = at, h.Layer = mt, h.LayerGroup = Dt, h.LineUtil = Io, h.Map = B, h.Marker = Le, h.Mixin = ko, h.Path = Ct, h.Point = S, h.PolyUtil = Eo, h.Polygon = Ft, h.Polyline = Pt, h.Popup = Ee, h.PosAnimation = Qi, h.Projection = Bo, h.Rectangle = bn, h.Renderer = bt, h.SVG = le, h.SVGOverlay = vn, h.TileLayer = Ut, h.Tooltip = ze, h.Transformation = Fe, h.Util = De, h.VideoOverlay = pn, h.bind = c, h.bounds = st, h.canvas = Pn, h.circle = Go, h.circleMarker = Uo, h.control = re, h.divIcon = Qo, h.extend = l, h.featureGroup = Ho, h.geoJSON = mn, h.geoJson = qo, h.gridLayer = tr, h.icon = Fo, h.imageOverlay = Ko, h.latLng = I, h.latLngBounds = X, h.layerGroup = Do, h.map = Lo, h.marker = Wo, h.point = M, h.polygon = Vo, h.polyline = jo, h.popup = Jo, h.rectangle = nr, h.setOptions = E, h.stamp = _, h.svg = Ln, h.svgOverlay = Yo, h.tileLayer = yn, h.tooltip = $o, h.transformation = Jt, h.version = p, h.videoOverlay = Xo;
    var rr = window.L;
    h.noConflict = function() {
      return window.L = rr, this;
    }, window.L = h;
  });
})(xi, xi.exports);
var Tr = xi.exports;
const ce = /* @__PURE__ */ Pi(Tr), Mr = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'%20standalone='no'?%3e%3csvg%20width='25.200001'%20height='31.921476'%20viewBox='0%200%2012.599999%2010.61438'%20fill='none'%20version='1.1'%20id='svg4'%20sodipodi:docname='pin.svg'%20inkscape:version='1.1.2%20(0a00cf5339,%202022-02-04)'%20xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape'%20xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:svg='http://www.w3.org/2000/svg'%3e%3cg%20id='g1166'%20transform='translate(0,1.3464525)'%3e%3cpath%20style='fill:%23c19959;fill-opacity:1;stroke:%23c19959;stroke-width:0.958008px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1'%20d='M%205.7872836,14.422701%201.7724431,9.8470581%200.7547601,5.3318759%20l%201.853069,-2.95099%202.05719,-1.3001193%202.6449553,-0.090655%202.6445838,1.2241615%201.2841878,2.604041%20-0.284433,4.0453174%20-2.073989,3.1705705%20-2.5803241,2.483465%20z'%20id='path666'%20clip-path='url(%23clipPath243)'%20inkscape:path-effect='%23path-effect247'%20inkscape:original-d='M%205.7872836,14.422701%201.7724431,9.8470581%200.7547601,5.3318759%20l%201.853069,-2.95099%202.05719,-1.3001193%202.6449553,-0.090655%202.6445838,1.2241615%201.2841878,2.604041%20-0.284433,4.0453174%20-2.073989,3.1705705%20-2.5803241,2.483465%20z'%20transform='translate(0,-4.0196307)'%20/%3e%3cpath%20d='m%206.3001699,-0.52079369%20h%20-1.7e-4%20c%20-0.55402,0%20-1.09559,0.16428%20-1.55624,0.47208%20-0.46065,0.3078%20-0.81968,0.74528%20-1.0317,1.25711999%20-0.21201,0.51185%20-0.26748,1.07507%20-0.1594,1.61844%200.10808,0.54337%200.37487,1.04249%200.76662,1.43424%200.39175,0.39175%200.89087,0.65854%201.43424,0.76662%200.54337,0.10808%201.10659,0.05261%201.61844,-0.1594%200.51185,-0.21202%200.9493296,-0.57105%201.2571196,-1.0317%200.3078,-0.46064%200.47208,-1.00222%200.47208,-1.55624%20v%20-1.7e-4%20c%20-8.4e-4,-0.74261%20-0.29621,-1.45456999%20-0.82132,-1.97966999%20-0.5250996,-0.52511%20-1.2370596,-0.82048%20-1.9796696,-0.82132%20z%20m%200,-3.34883701%20h%20-3.4e-4%20c%20-1.63047,0.00184%20-3.19364,0.650357%20-4.34656,1.803267%20-1.15291997,1.15292001%20-1.80143389,2.71609001%20-1.80326989,4.34656%20v%201.7e-4%20c%200,2.20312%201.02159989,4.52707%202.93009989,6.72177%200.86156,0.9952%201.83114,1.8913997%202.89086,2.6720997%20l%20-3e-5,10e-5%200.00294,0.002%20c%200.09557,0.067%200.20942,0.1029%200.3261,0.1029%200.11667,0%200.23052,-0.0359%200.32609,-0.1029%20l%202e-5,1e-4%200.00289,-0.0022%20c%201.05968,-0.7807%202.0292196,-1.6767997%202.8907296,-2.6718997%201.9086995,-2.1948%202.9302995,-4.5188%202.9302995,-6.72197%20v%20-1.7e-4%20c%20-0.0018,-1.63046999%20-0.6504,-3.19363999%20-1.8033,-4.34656%20-1.1528995,-1.15291%20-2.7160591,-1.801431%20-4.3465291,-1.803267%20z%20m%20-3.4e-4,7.813947%20c%20-0.32904,-3e-5%20-0.65068,-0.09762%20-0.92427,-0.28042%20-0.27364,-0.18284%20-0.48691,-0.44271%20-0.61285,-0.74676%20-0.12594,-0.30405%20-0.1589,-0.63861%20-0.09469,-0.96139%200.0642,-0.32277%200.22268,-0.61926%200.45539,-0.85197%200.23271,-0.23270999%200.52919,-0.39118999%200.85197,-0.45538999%200.32277,-0.0642%200.65734,-0.03125%200.96139,0.09469%200.30405,0.12594%200.56392,0.33920999%200.74676,0.61284999%200.1828,0.27359%200.28039,0.59523%200.28042,0.92427%20-5e-4,0.4412%20-0.17599,0.86418%20-0.48797,1.17615%20-0.31197,0.31198%20-0.73495,0.48747%20-1.17615,0.48797%20z%20m%201.7e-4,6.5537197%20c%20-0.56668,-0.4451%20-1.77007,-1.4621997%20-2.85634,-2.8493997%20-1.15063,-1.4694%20-2.15645,-3.33681%20-2.15645,-5.36827%200,-1.32946999%200.52813,-2.60448999%201.46821,-3.54458%200.94008,-0.94008%202.21511,-1.46821%203.54458,-1.46821%201.32947,0%202.6044996,0.52813%203.5445992,1.46821%200.9400999,0.94009001%201.4681999,2.21511001%201.4681999,3.54458%200,2.03146%20-1.0059,3.89887%20-2.1565395,5.36827%20-1.08628,1.3872%20-2.2896696,2.4043997%20-2.8562596,2.8493997%20z'%20fill='%23c19959'%20stroke='%23c19959'%20stroke-width='0.3'%20id='path2'%20style='stroke-width:0.3;stroke-miterlimit:4;stroke-dasharray:none'%20/%3e%3c/g%3e%3cdefs%20id='defs8'%3e%3cinkscape:path-effect%20effect='powerclip'%20id='path-effect247'%20is_visible='true'%20lpeversion='1'%20inverse='true'%20flatten='false'%20hide_clip='false'%20message='Usar%20a%20regra%20de%20preenchimento%20par%20ou%20ímpar%20na%20caixa%20de%20diálogo%20&lt;b&gt;preenchimento%20e%20contorno&lt;/b&gt;%20se%20nenhum%20resultado%20nivelar%20após%20converter%20o%20clipe%20em%20caminhos.'%20/%3e%3cclipPath%20clipPathUnits='userSpaceOnUse'%20id='clipPath38'%3e%3cpath%20d='M%207.00017,3.72557%20H%207%20c%20-0.55402,0%20-1.09559,0.16428%20-1.55624,0.47208%20C%204.98311,4.50545%204.62408,4.94293%204.41206,5.45477%204.20005,5.96662%204.14458,6.52984%204.25266,7.07321%204.36074,7.61658%204.62753,8.1157%205.01928,8.50745%205.41103,8.8992%205.91015,9.16599%206.45352,9.27407%206.99689,9.38215%207.56011,9.32668%208.07196,9.11467%208.58381,8.90265%209.02129,8.54362%209.32908,8.08297%209.63688,7.62233%209.80116,7.08075%209.80116,6.52673%20V%206.52656%20C%209.80032,5.78395%209.50495,5.07199%208.97984,4.54689%208.45474,4.02178%207.74278,3.72641%207.00017,3.72557%20Z%20m%200,-3.348837%20H%206.99983%20C%205.36936,0.378569%203.80619,1.02709%202.65327,2.18%201.50035,3.33292%200.851836,4.89609%200.85,6.52656%20v%201.7e-4%20c%200,2.20312%201.0216,4.52707%202.9301,6.72177%200.86156,0.9952%201.83114,1.8914%202.89086,2.6721%20l%20-3e-5,10e-5%200.00294,0.002%20c%200.09557,0.067%200.20942,0.1029%200.3261,0.1029%200.11667,0%200.23052,-0.0359%200.32609,-0.1029%20l%202e-5,10e-5%200.00289,-0.0022%20C%208.38865,15.1399%209.35819,14.2438%2010.2197,13.2487%2012.1284,11.0539%2013.15,8.7299%2013.15,6.52673%20V%206.52656%20C%2013.1482,4.89609%2012.4996,3.33292%2011.3467,2.18%2010.1938,1.02709%208.63064,0.378569%207.00017,0.376733%20Z%20M%206.99983,8.19068%20C%206.67079,8.19065%206.34915,8.09306%206.07556,7.91026%205.80192,7.72742%205.58865,7.46755%205.46271,7.1635%205.33677,6.85945%205.30381,6.52489%205.36802,6.20211%205.43222,5.87934%205.5907,5.58285%205.82341,5.35014%206.05612,5.11743%206.3526,4.95895%206.67538,4.89475%206.99815,4.83055%207.33272,4.8635%207.63677,4.98944%207.94082,5.11538%208.20069,5.32865%208.38353,5.60229%208.56633,5.87588%208.66392,6.19752%208.66395,6.52656%208.66345,6.96776%208.48796,7.39074%208.17598,7.70271%207.86401,8.01469%207.44103,8.19018%206.99983,8.19068%20Z%20M%207,14.7444%20C%206.43332,14.2993%205.22993,13.2822%204.14366,11.895%202.99303,10.4256%201.98721,8.55819%201.98721,6.52673%201.98721,5.19726%202.51534,3.92224%203.45542,2.98215%204.3955,2.04207%205.67053,1.51394%207,1.51394%20c%201.32947,0%202.6045,0.52813%203.5446,1.46821%200.9401,0.94009%201.4682,2.21511%201.4682,3.54458%200,2.03146%20-1.0059,3.89887%20-2.15654,5.36827%20C%208.76998,13.2822%207.56659,14.2994%207,14.7444%20Z'%20fill='%23c19959'%20stroke='%23c19959'%20stroke-width='0.3'%20id='path40'%20style='display:block'%20/%3e%3c/clipPath%3e%3cinkscape:path-effect%20effect='powerclip'%20id='path-effect42'%20is_visible='true'%20lpeversion='1'%20inverse='true'%20flatten='false'%20hide_clip='false'%20message='Usar%20a%20regra%20de%20preenchimento%20par%20ou%20ímpar%20na%20caixa%20de%20diálogo%20&lt;b&gt;preenchimento%20e%20contorno&lt;/b&gt;%20se%20nenhum%20resultado%20nivelar%20após%20converter%20o%20clipe%20em%20caminhos.'%20/%3e%3cclipPath%20clipPathUnits='userSpaceOnUse'%20id='clipPath243'%3e%3cpath%20style='display:none;fill:%23ffffff;fill-opacity:1;stroke:%23ffffff;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1'%20d='m%204.6756464,5.2617573%201.214039,-0.8414449%201.8467038,0.0594%20L%208.3434441,6.9653716%206.9523547,7.877592%205.0692179,7.892937%204.3115481,6.3525482%20Z'%20id='path245'%20/%3e%3cpath%20id='lpe_path-effect247'%20style='fill:%23ffffff;fill-opacity:1;stroke:%23ffffff;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1'%20class='powerclip'%20d='M%20-4.7559625,-4.4925206%20H%2016.725658%20V%2020.033492%20H%20-4.7559625%20Z%20M%204.6756464,5.2617573%204.3115481,6.3525482%205.0692179,7.892937%206.9523547,7.877592%208.3434441,6.9653716%207.7363892,4.4797124%205.8896854,4.4203124%20Z'%20/%3e%3c/clipPath%3e%3c/defs%3e%3csodipodi:namedview%20id='namedview6'%20pagecolor='%23ffffff'%20bordercolor='%23666666'%20borderopacity='1.0'%20inkscape:pageshadow='2'%20inkscape:pageopacity='0.0'%20inkscape:pagecheckerboard='0'%20showgrid='false'%20fit-margin-top='0'%20fit-margin-left='0'%20fit-margin-right='0'%20fit-margin-bottom='0'%20inkscape:zoom='20.764706'%20inkscape:cx='-2.7932011'%20inkscape:cy='5.5623229'%20inkscape:window-width='1920'%20inkscape:window-height='1021'%20inkscape:window-x='0'%20inkscape:window-y='29'%20inkscape:window-maximized='1'%20inkscape:current-layer='svg4'%20/%3e%3c/svg%3e", Sr = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMfvkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xpKCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqYULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZHJZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd086Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn222mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKnwBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLCmahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFcsdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3HbwJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC";
let Cr = {
  "amenity:arts_centre": "Centro Artístico",
  "aeroway:aerodrome": "Aeroporto",
  "amenity:atm": "Caixa Eletrônico",
  "amenity:bank": "Banco",
  "amenity:bar": "Bar",
  "amenity:bus_station": "Estação de Ônibus",
  "amenity:cafe": "Café",
  "amenity:car_wash": "Lavagem de Carro",
  "amenity:grave_yard": "Cemitério",
  "amenity:pharmacy": "Farmácia",
  "amenity:hospital": "Hospital",
  "amenity:library": "Biblioteca",
  "amenity:post_depot": "Depósito",
  "amenity:nightclub": "Clube Noturno",
  "amenity:parking": "Estacionamento",
  "amenity:police": "Polícia",
  "amenity:post_office": "Correios",
  "amenity:school": "Escola",
  "amenity:childcare": "Creche",
  "amenity:university": "Universidade",
  "amenity:restaurant": "Restaurante",
  "amenity:fuel": "Posto de Combustível",
  "craft:bakery": "Padaria",
  "shop:beauty": "Salão de Beleza",
  "shop:books": "Livraria",
  "shop:convenience": "Loja de Conveniência",
  "shop:chemist": "Farmácia",
  "shop:pet": "Pet Shop",
  "shop:mall": "Mercado",
  "shop:supermarket": "Supermercado",
  "landuse:cemetery": "Cemitério",
  "building:church": "Igreja",
  "building:stadium": "Estádio",
  "leisure:fitness_centre": "Academia",
  "leisure:sports_centre": "Centro Esportivo",
  "leisure:park": "Parque",
  "leisure:stadium": "Estádio",
  "tourism:museum": "Museu",
  "tourism:attraction": "Atração Turística",
  "public_transport:station": "Transporte Público"
}, kr = {
  i18n: Cr,
  selector: ".points-of-interest",
  icon_url: Mr,
  icon_shadow_url: Sr,
  precision: 6,
  neighbors: !0
};
const Er = async function(y = {}) {
  let {
    i18n: w,
    selector: h,
    icon_url: p,
    icon_shadow_url: l,
    precision: d,
    neighbors: c
  } = { ...kr, ...y };
  if (document.querySelector(h)) {
    let _ = document.querySelector(h), { lat: b, lng: z } = _.dataset, T = +b, R = +z, tt = await Pr({ latitude: T, longitude: R }, { precision: d, neighbors: c });
    tt = tt.map((A) => {
      let G = A.tags.split(",").filter((K) => !(!/^(amenity|shop|tourism|public_transportation|leisure|craft|building|aeroway|landuse)\:/.test(K) || w && !w[K])).map((K) => ({
        tag: K,
        title: w[K]
      }));
      G.sort();
      let Q = br.getDistanceBetween({
        latitude: A.lat,
        longitude: A.lng
      }, { latitude: T, longitude: R }, "m");
      return {
        ...A,
        tags: G,
        distance: Q
      };
    });
    let H = _.querySelector(".map");
    var v = ce.map(H).setView([T, R], 13);
    ce.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: ""
    }).addTo(v);
    let E = ce.icon({
      iconUrl: p,
      shadowUrl: l
    });
    ce.marker([T, R], {
      icon: E
    }).addTo(v);
    let W = _.querySelector("ul");
    W.innerHTML = "";
    let D = tt.reduce((A, { tags: G }) => [...A, ...G], []), Z = [...new Set(D.map(({ tag: A }) => A))].map((A) => D.find((G) => G.tag == A));
    Z.sort((A, G) => A.title < G.title ? -1 : 1);
    let P = {};
    for (let A of Z) {
      $(W).append(`<li class="me-2" data-tag="${A.tag}"><a href="javascript:void(0)">${A.title}</a></li>`);
      let G = tt.filter((Q) => Q.tags.map(({ tag: Tt }) => Tt).includes(A.tag)).map(({ name: Q, distance: K, lat: Tt, lng: Et }) => ce.marker([Tt, Et], {
        icon: E,
        title: `${Q} à ${K}m`
      }));
      P[A.tag] = G;
    }
    $(_).on("click", "ul li", function() {
      let A = $(this), G = A.data("tag"), Q = P[G];
      if (A.is(".active")) {
        A.removeClass("active");
        for (let K of Q)
          K.remove();
      } else {
        A.addClass("active");
        for (let K of Q)
          K.addTo(v);
      }
    });
  }
};
window.PointsOfInterestMap = Er;
export {
  Er as PointsOfInterestMap,
  Er as default
};
//# sourceMappingURL=points-of-interest-map.js.map
