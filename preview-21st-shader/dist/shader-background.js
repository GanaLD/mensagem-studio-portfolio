var _0 = { exports: {} }, an = {};
var Im;
function nd() {
  if (Im) return an;
  Im = 1;
  var N = /* @__PURE__ */ Symbol.for("react.transitional.element"), hl = /* @__PURE__ */ Symbol.for("react.fragment");
  function G(g, O, _l) {
    var nl = null;
    if (_l !== void 0 && (nl = "" + _l), O.key !== void 0 && (nl = "" + O.key), "key" in O) {
      _l = {};
      for (var lt in O)
        lt !== "key" && (_l[lt] = O[lt]);
    } else _l = O;
    return O = _l.ref, {
      $$typeof: N,
      type: g,
      key: nl,
      ref: O !== void 0 ? O : null,
      props: _l
    };
  }
  return an.Fragment = hl, an.jsx = G, an.jsxs = G, an;
}
var km;
function fd() {
  return km || (km = 1, _0.exports = nd()), _0.exports;
}
var i1 = fd(), T0 = { exports: {} }, en = {}, E0 = { exports: {} }, b0 = {};
var Pm;
function cd() {
  return Pm || (Pm = 1, (function(N) {
    function hl(z, D) {
      var q = z.length;
      z.push(D);
      l: for (; 0 < q; ) {
        var L = q - 1 >>> 1, W = z[L];
        if (0 < O(W, D))
          z[L] = D, z[q] = W, q = L;
        else break l;
      }
    }
    function G(z) {
      return z.length === 0 ? null : z[0];
    }
    function g(z) {
      if (z.length === 0) return null;
      var D = z[0], q = z.pop();
      if (q !== D) {
        z[0] = q;
        l: for (var L = 0, W = z.length, Zl = W >>> 1; L < Zl; ) {
          var at = 2 * (L + 1) - 1, wu = z[at], v = at + 1, E = z[v];
          if (0 > O(wu, q))
            v < W && 0 > O(E, wu) ? (z[L] = E, z[v] = q, L = v) : (z[L] = wu, z[at] = q, L = at);
          else if (v < W && 0 > O(E, q))
            z[L] = E, z[v] = q, L = v;
          else break l;
        }
      }
      return D;
    }
    function O(z, D) {
      var q = z.sortIndex - D.sortIndex;
      return q !== 0 ? q : z.id - D.id;
    }
    if (N.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var _l = performance;
      N.unstable_now = function() {
        return _l.now();
      };
    } else {
      var nl = Date, lt = nl.now();
      N.unstable_now = function() {
        return nl.now() - lt;
      };
    }
    var gl = [], Al = [], B = 1, S = null, Y = 3, bl = !1, Il = !1, Rl = !1, tl = !1, kl = typeof setTimeout == "function" ? setTimeout : null, Xl = typeof clearTimeout == "function" ? clearTimeout : null, Hl = typeof setImmediate < "u" ? setImmediate : null;
    function Ql(z) {
      for (var D = G(Al); D !== null; ) {
        if (D.callback === null) g(Al);
        else if (D.startTime <= z)
          g(Al), D.sortIndex = D.expirationTime, hl(gl, D);
        else break;
        D = G(Al);
      }
    }
    function tt(z) {
      if (Rl = !1, Ql(z), !Il)
        if (G(gl) !== null)
          Il = !0, ql || (ql = !0, jl());
        else {
          var D = G(Al);
          D !== null && zl(tt, D.startTime - z);
        }
    }
    var ql = !1, Z = -1, I = 5, At = -1;
    function ut() {
      return tl ? !0 : !(N.unstable_now() - At < I);
    }
    function Yl() {
      if (tl = !1, ql) {
        var z = N.unstable_now();
        At = z;
        var D = !0;
        try {
          l: {
            Il = !1, Rl && (Rl = !1, Xl(Z), Z = -1), bl = !0;
            var q = Y;
            try {
              t: {
                for (Ql(z), S = G(gl); S !== null && !(S.expirationTime > z && ut()); ) {
                  var L = S.callback;
                  if (typeof L == "function") {
                    S.callback = null, Y = S.priorityLevel;
                    var W = L(
                      S.expirationTime <= z
                    );
                    if (z = N.unstable_now(), typeof W == "function") {
                      S.callback = W, Ql(z), D = !0;
                      break t;
                    }
                    S === G(gl) && g(gl), Ql(z);
                  } else g(gl);
                  S = G(gl);
                }
                if (S !== null) D = !0;
                else {
                  var Zl = G(Al);
                  Zl !== null && zl(
                    tt,
                    Zl.startTime - z
                  ), D = !1;
                }
              }
              break l;
            } finally {
              S = null, Y = q, bl = !1;
            }
            D = void 0;
          }
        } finally {
          D ? jl() : ql = !1;
        }
      }
    }
    var jl;
    if (typeof Hl == "function")
      jl = function() {
        Hl(Yl);
      };
    else if (typeof MessageChannel < "u") {
      var Bt = new MessageChannel(), Zt = Bt.port2;
      Bt.port1.onmessage = Yl, jl = function() {
        Zt.postMessage(null);
      };
    } else
      jl = function() {
        kl(Yl, 0);
      };
    function zl(z, D) {
      Z = kl(function() {
        z(N.unstable_now());
      }, D);
    }
    N.unstable_IdlePriority = 5, N.unstable_ImmediatePriority = 1, N.unstable_LowPriority = 4, N.unstable_NormalPriority = 3, N.unstable_Profiling = null, N.unstable_UserBlockingPriority = 2, N.unstable_cancelCallback = function(z) {
      z.callback = null;
    }, N.unstable_forceFrameRate = function(z) {
      0 > z || 125 < z ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : I = 0 < z ? Math.floor(1e3 / z) : 5;
    }, N.unstable_getCurrentPriorityLevel = function() {
      return Y;
    }, N.unstable_next = function(z) {
      switch (Y) {
        case 1:
        case 2:
        case 3:
          var D = 3;
          break;
        default:
          D = Y;
      }
      var q = Y;
      Y = D;
      try {
        return z();
      } finally {
        Y = q;
      }
    }, N.unstable_requestPaint = function() {
      tl = !0;
    }, N.unstable_runWithPriority = function(z, D) {
      switch (z) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          z = 3;
      }
      var q = Y;
      Y = z;
      try {
        return D();
      } finally {
        Y = q;
      }
    }, N.unstable_scheduleCallback = function(z, D, q) {
      var L = N.unstable_now();
      switch (typeof q == "object" && q !== null ? (q = q.delay, q = typeof q == "number" && 0 < q ? L + q : L) : q = L, z) {
        case 1:
          var W = -1;
          break;
        case 2:
          W = 250;
          break;
        case 5:
          W = 1073741823;
          break;
        case 4:
          W = 1e4;
          break;
        default:
          W = 5e3;
      }
      return W = q + W, z = {
        id: B++,
        callback: D,
        priorityLevel: z,
        startTime: q,
        expirationTime: W,
        sortIndex: -1
      }, q > L ? (z.sortIndex = q, hl(Al, z), G(gl) === null && z === G(Al) && (Rl ? (Xl(Z), Z = -1) : Rl = !0, zl(tt, q - L))) : (z.sortIndex = W, hl(gl, z), Il || bl || (Il = !0, ql || (ql = !0, jl()))), z;
    }, N.unstable_shouldYield = ut, N.unstable_wrapCallback = function(z) {
      var D = Y;
      return function() {
        var q = Y;
        Y = D;
        try {
          return z.apply(this, arguments);
        } finally {
          Y = q;
        }
      };
    };
  })(b0)), b0;
}
var l1;
function id() {
  return l1 || (l1 = 1, E0.exports = cd()), E0.exports;
}
var z0 = { exports: {} }, X = {};
var t1;
function od() {
  if (t1) return X;
  t1 = 1;
  var N = /* @__PURE__ */ Symbol.for("react.transitional.element"), hl = /* @__PURE__ */ Symbol.for("react.portal"), G = /* @__PURE__ */ Symbol.for("react.fragment"), g = /* @__PURE__ */ Symbol.for("react.strict_mode"), O = /* @__PURE__ */ Symbol.for("react.profiler"), _l = /* @__PURE__ */ Symbol.for("react.consumer"), nl = /* @__PURE__ */ Symbol.for("react.context"), lt = /* @__PURE__ */ Symbol.for("react.forward_ref"), gl = /* @__PURE__ */ Symbol.for("react.suspense"), Al = /* @__PURE__ */ Symbol.for("react.memo"), B = /* @__PURE__ */ Symbol.for("react.lazy"), S = /* @__PURE__ */ Symbol.for("react.activity"), Y = /* @__PURE__ */ Symbol.for("react.view_transition"), bl = Symbol.iterator;
  function Il(v) {
    return v === null || typeof v != "object" ? null : (v = bl && v[bl] || v["@@iterator"], typeof v == "function" ? v : null);
  }
  var Rl = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, tl = Object.assign, kl = {};
  function Xl(v, E, C) {
    this.props = v, this.context = E, this.refs = kl, this.updater = C || Rl;
  }
  Xl.prototype.isReactComponent = {}, Xl.prototype.setState = function(v, E) {
    if (typeof v != "object" && typeof v != "function" && v != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, v, E, "setState");
  }, Xl.prototype.forceUpdate = function(v) {
    this.updater.enqueueForceUpdate(this, v, "forceUpdate");
  };
  function Hl() {
  }
  Hl.prototype = Xl.prototype;
  function Ql(v, E, C) {
    this.props = v, this.context = E, this.refs = kl, this.updater = C || Rl;
  }
  var tt = Ql.prototype = new Hl();
  tt.constructor = Ql, tl(tt, Xl.prototype), tt.isPureReactComponent = !0;
  var ql = Array.isArray;
  function Z() {
  }
  var I = { H: null, A: null, T: null, S: null }, At = Object.prototype.hasOwnProperty;
  function ut(v, E, C) {
    var H = C.ref;
    return {
      $$typeof: N,
      type: v,
      key: E,
      ref: H !== void 0 ? H : null,
      props: C
    };
  }
  function Yl(v, E) {
    return ut(v.type, E, v.props);
  }
  function jl(v) {
    return typeof v == "object" && v !== null && v.$$typeof === N;
  }
  function Bt(v) {
    var E = { "=": "=0", ":": "=2" };
    return "$" + v.replace(/[=:]/g, function(C) {
      return E[C];
    });
  }
  var Zt = /\/+/g;
  function zl(v, E) {
    return typeof v == "object" && v !== null && v.key != null ? Bt("" + v.key) : E.toString(36);
  }
  function z(v) {
    switch (v.status) {
      case "fulfilled":
        return v.value;
      case "rejected":
        throw v.reason;
      default:
        switch (typeof v.status == "string" ? v.then(Z, Z) : (v.status = "pending", v.then(
          function(E) {
            v.status === "pending" && (v.status = "fulfilled", v.value = E);
          },
          function(E) {
            v.status === "pending" && (v.status = "rejected", v.reason = E);
          }
        )), v.status) {
          case "fulfilled":
            return v.value;
          case "rejected":
            throw v.reason;
        }
    }
    throw v;
  }
  function D(v, E, C, H, k) {
    var P = typeof v;
    (P === "undefined" || P === "boolean") && (v = null);
    var ul = !1;
    if (v === null) ul = !0;
    else
      switch (P) {
        case "bigint":
        case "string":
        case "number":
          ul = !0;
          break;
        case "object":
          switch (v.$$typeof) {
            case N:
            case hl:
              ul = !0;
              break;
            case B:
              return ul = v._init, D(
                ul(v._payload),
                E,
                C,
                H,
                k
              );
          }
      }
    if (ul)
      return k = k(v), ul = H === "" ? "." + zl(v, 0) : H, ql(k) ? (C = "", ul != null && (C = ul.replace(Zt, "$&/") + "/"), D(k, E, C, "", function(uu) {
        return uu;
      })) : k != null && (jl(k) && (k = Yl(
        k,
        C + (k.key == null || v && v.key === k.key ? "" : ("" + k.key).replace(
          Zt,
          "$&/"
        ) + "/") + ul
      )), E.push(k)), 1;
    ul = 0;
    var U = H === "" ? "." : H + ":";
    if (ql(v))
      for (var x = 0; x < v.length; x++)
        H = v[x], P = U + zl(H, x), ul += D(
          H,
          E,
          C,
          P,
          k
        );
    else if (x = Il(v), typeof x == "function")
      for (v = x.call(v), x = 0; !(H = v.next()).done; )
        H = H.value, P = U + zl(H, x++), ul += D(
          H,
          E,
          C,
          P,
          k
        );
    else if (P === "object") {
      if (typeof v.then == "function")
        return D(
          z(v),
          E,
          C,
          H,
          k
        );
      throw E = String(v), Error(
        "Objects are not valid as a React child (found: " + (E === "[object Object]" ? "object with keys {" + Object.keys(v).join(", ") + "}" : E) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ul;
  }
  function q(v, E, C) {
    if (v == null) return v;
    var H = [], k = 0;
    return D(v, H, "", "", function(P) {
      return E.call(C, P, k++);
    }), H;
  }
  function L(v) {
    if (v._status === -1) {
      var E = v._result, C = E();
      C.then(
        function(H) {
          (v._status === 0 || v._status === -1) && (v._status = 1, v._result = H, C.status === void 0 && (C.status = "fulfilled", C.value = H));
        },
        function(H) {
          (v._status === 0 || v._status === -1) && (v._status = 2, v._result = H, C.status === void 0 && (C.status = "rejected", C.reason = H));
        }
      ), v._status === -1 && (v._status = 0, v._result = C);
    }
    if (v._status === 1) return v._result.default;
    throw v._result;
  }
  var W = typeof reportError == "function" ? reportError : function(v) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var E = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof v == "object" && v !== null && typeof v.message == "string" ? String(v.message) : String(v),
        error: v
      });
      if (!window.dispatchEvent(E)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", v);
      return;
    }
    console.error(v);
  };
  function Zl(v) {
    var E = I.T, C = {};
    C.types = E !== null ? E.types : null, I.T = C;
    try {
      var H = v(), k = I.S;
      k !== null && k(C, H), typeof H == "object" && H !== null && typeof H.then == "function" && H.then(Z, W);
    } catch (P) {
      W(P);
    } finally {
      E !== null && C.types !== null && (E.types = C.types), I.T = E;
    }
  }
  function at(v) {
    var E = I.T;
    if (E !== null) {
      var C = E.types;
      C === null ? E.types = [v] : C.indexOf(v) === -1 && C.push(v);
    } else Zl(at.bind(null, v));
  }
  var wu = {
    map: q,
    forEach: function(v, E, C) {
      q(
        v,
        function() {
          E.apply(this, arguments);
        },
        C
      );
    },
    count: function(v) {
      var E = 0;
      return q(v, function() {
        E++;
      }), E;
    },
    toArray: function(v) {
      return q(v, function(E) {
        return E;
      }) || [];
    },
    only: function(v) {
      if (!jl(v))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return v;
    }
  };
  return X.Activity = S, X.Children = wu, X.Component = Xl, X.Fragment = G, X.Profiler = O, X.PureComponent = Ql, X.StrictMode = g, X.Suspense = gl, X.ViewTransition = Y, X.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = I, X.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(v) {
      return I.H.useMemoCache(v);
    }
  }, X.addTransitionType = at, X.cache = function(v) {
    return function() {
      return v.apply(null, arguments);
    };
  }, X.cacheSignal = function() {
    return null;
  }, X.cloneElement = function(v, E, C) {
    if (v == null)
      throw Error(
        "The argument must be a React element, but you passed " + v + "."
      );
    var H = tl({}, v.props), k = v.key;
    if (E != null)
      for (P in E.key !== void 0 && (k = "" + E.key), E)
        !At.call(E, P) || P === "key" || P === "__self" || P === "__source" || P === "ref" && E.ref === void 0 || (H[P] = E[P]);
    var P = arguments.length - 2;
    if (P === 1) H.children = C;
    else if (1 < P) {
      for (var ul = Array(P), U = 0; U < P; U++)
        ul[U] = arguments[U + 2];
      H.children = ul;
    }
    return ut(v.type, k, H);
  }, X.createContext = function(v) {
    return v = {
      $$typeof: nl,
      _currentValue: v,
      _currentValue2: v,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, v.Provider = v, v.Consumer = {
      $$typeof: _l,
      _context: v
    }, v;
  }, X.createElement = function(v, E, C) {
    var H, k = {}, P = null;
    if (E != null)
      for (H in E.key !== void 0 && (P = "" + E.key), E)
        At.call(E, H) && H !== "key" && H !== "__self" && H !== "__source" && (k[H] = E[H]);
    var ul = arguments.length - 2;
    if (ul === 1) k.children = C;
    else if (1 < ul) {
      for (var U = Array(ul), x = 0; x < ul; x++)
        U[x] = arguments[x + 2];
      k.children = U;
    }
    if (v && v.defaultProps)
      for (H in ul = v.defaultProps, ul)
        k[H] === void 0 && (k[H] = ul[H]);
    return ut(v, P, k);
  }, X.createRef = function() {
    return { current: null };
  }, X.forwardRef = function(v) {
    return { $$typeof: lt, render: v };
  }, X.isValidElement = jl, X.lazy = function(v) {
    return {
      $$typeof: B,
      _payload: { _status: -1, _result: v },
      _init: L
    };
  }, X.memo = function(v, E) {
    return {
      $$typeof: Al,
      type: v,
      compare: E === void 0 ? null : E
    };
  }, X.startTransition = Zl, X.unstable_useCacheRefresh = function() {
    return I.H.useCacheRefresh();
  }, X.use = function(v) {
    return I.H.use(v);
  }, X.useActionState = function(v, E, C) {
    return I.H.useActionState(v, E, C);
  }, X.useCallback = function(v, E) {
    return I.H.useCallback(v, E);
  }, X.useContext = function(v) {
    return I.H.useContext(v);
  }, X.useDebugValue = function() {
  }, X.useDeferredValue = function(v, E) {
    return I.H.useDeferredValue(v, E);
  }, X.useEffect = function(v, E) {
    return I.H.useEffect(v, E);
  }, X.useEffectEvent = function(v) {
    return I.H.useEffectEvent(v);
  }, X.useId = function() {
    return I.H.useId();
  }, X.useImperativeHandle = function(v, E, C) {
    return I.H.useImperativeHandle(v, E, C);
  }, X.useInsertionEffect = function(v, E) {
    return I.H.useInsertionEffect(v, E);
  }, X.useLayoutEffect = function(v, E) {
    return I.H.useLayoutEffect(v, E);
  }, X.useMemo = function(v, E) {
    return I.H.useMemo(v, E);
  }, X.useOptimistic = function(v, E) {
    return I.H.useOptimistic(v, E);
  }, X.useReducer = function(v, E, C) {
    return I.H.useReducer(v, E, C);
  }, X.useRef = function(v) {
    return I.H.useRef(v);
  }, X.useState = function(v) {
    return I.H.useState(v);
  }, X.useSyncExternalStore = function(v, E, C) {
    return I.H.useSyncExternalStore(
      v,
      E,
      C
    );
  }, X.useTransition = function() {
    return I.H.useTransition();
  }, X.version = "19.3.0", X;
}
var u1;
function A0() {
  return u1 || (u1 = 1, z0.exports = od()), z0.exports;
}
var O0 = { exports: {} }, $l = {};
var a1;
function vd() {
  if (a1) return $l;
  a1 = 1;
  var N = A0();
  function hl(B) {
    var S = "https://react.dev/errors/" + B;
    if (1 < arguments.length) {
      S += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var Y = 2; Y < arguments.length; Y++)
        S += "&args[]=" + encodeURIComponent(arguments[Y]);
    }
    return "Minified React error #" + B + "; visit " + S + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function G() {
  }
  var g = {
    d: {
      f: G,
      r: function() {
        throw Error(hl(522));
      },
      D: G,
      C: G,
      L: G,
      m: G,
      X: G,
      S: G,
      M: G
    },
    p: 0,
    findDOMNode: null
  }, O = /* @__PURE__ */ Symbol.for("react.portal"), _l = /* @__PURE__ */ Symbol.for("react.recoverable"), nl = /* @__PURE__ */ Symbol.for("react.optimistic_key");
  function lt(B, S, Y) {
    var bl = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: O,
      key: bl == null ? null : bl === nl ? nl : "" + bl,
      children: B,
      containerInfo: S,
      implementation: Y
    };
  }
  var gl = N.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function Al(B, S) {
    if (B === "font") return "";
    if (typeof S == "string")
      return S === "use-credentials" ? S : "";
  }
  return $l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = g, $l.browser = function(B) {
    return { $$typeof: _l, _reason: B };
  }, $l.createPortal = function(B, S) {
    var Y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!S || S.nodeType !== 1 && S.nodeType !== 9 && S.nodeType !== 11)
      throw Error(hl(299));
    return lt(B, S, null, Y);
  }, $l.flushSync = function(B) {
    var S = gl.T, Y = g.p;
    try {
      if (gl.T = null, g.p = 2, B) return B();
    } finally {
      gl.T = S, g.p = Y, g.d.f();
    }
  }, $l.preconnect = function(B, S) {
    typeof B == "string" && (S ? (S = S.crossOrigin, S = typeof S == "string" ? S === "use-credentials" ? S : "" : void 0) : S = null, g.d.C(B, S));
  }, $l.prefetchDNS = function(B) {
    typeof B == "string" && g.d.D(B);
  }, $l.preinit = function(B, S) {
    if (typeof B == "string" && S && typeof S.as == "string") {
      var Y = S.as, bl = Al(Y, S.crossOrigin), Il = typeof S.integrity == "string" ? S.integrity : void 0, Rl = typeof S.fetchPriority == "string" ? S.fetchPriority : void 0;
      Y === "style" ? g.d.S(
        B,
        typeof S.precedence == "string" ? S.precedence : void 0,
        {
          crossOrigin: bl,
          integrity: Il,
          fetchPriority: Rl
        }
      ) : Y === "script" && g.d.X(B, {
        crossOrigin: bl,
        integrity: Il,
        fetchPriority: Rl,
        nonce: typeof S.nonce == "string" ? S.nonce : void 0
      });
    }
  }, $l.preinitModule = function(B, S) {
    if (typeof B == "string")
      if (typeof S == "object" && S !== null) {
        if (S.as == null || S.as === "script") {
          var Y = Al(
            S.as,
            S.crossOrigin
          );
          g.d.M(B, {
            crossOrigin: Y,
            integrity: typeof S.integrity == "string" ? S.integrity : void 0,
            nonce: typeof S.nonce == "string" ? S.nonce : void 0,
            fetchPriority: typeof S.fetchPriority == "string" ? S.fetchPriority : void 0
          });
        }
      } else S == null && g.d.M(B);
  }, $l.preload = function(B, S) {
    if (typeof B == "string" && typeof S == "object" && S !== null && typeof S.as == "string") {
      var Y = S.as, bl = Al(Y, S.crossOrigin);
      g.d.L(B, Y, {
        crossOrigin: bl,
        integrity: typeof S.integrity == "string" ? S.integrity : void 0,
        nonce: typeof S.nonce == "string" ? S.nonce : void 0,
        type: typeof S.type == "string" ? S.type : void 0,
        fetchPriority: typeof S.fetchPriority == "string" ? S.fetchPriority : void 0,
        referrerPolicy: typeof S.referrerPolicy == "string" ? S.referrerPolicy : void 0,
        imageSrcSet: typeof S.imageSrcSet == "string" ? S.imageSrcSet : void 0,
        imageSizes: typeof S.imageSizes == "string" ? S.imageSizes : void 0,
        media: typeof S.media == "string" ? S.media : void 0
      });
    }
  }, $l.preloadModule = function(B, S) {
    if (typeof B == "string")
      if (S) {
        var Y = Al(S.as, S.crossOrigin);
        g.d.m(B, {
          as: typeof S.as == "string" && S.as !== "script" ? S.as : void 0,
          crossOrigin: Y,
          integrity: typeof S.integrity == "string" ? S.integrity : void 0,
          nonce: typeof S.nonce == "string" ? S.nonce : void 0,
          fetchPriority: typeof S.fetchPriority == "string" ? S.fetchPriority : void 0
        });
      } else g.d.m(B);
  }, $l.requestFormReset = function(B) {
    g.d.r(B);
  }, $l.unstable_batchedUpdates = function(B, S) {
    return B(S);
  }, $l.useFormState = function(B, S, Y) {
    return gl.H.useFormState(B, S, Y);
  }, $l.useFormStatus = function() {
    return gl.H.useHostTransitionStatus();
  }, $l.version = "19.3.0", $l;
}
var e1;
function sd() {
  if (e1) return O0.exports;
  e1 = 1;
  function N() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(N);
      } catch (hl) {
        console.error(hl);
      }
  }
  return N(), O0.exports = vd(), O0.exports;
}
var n1;
function md() {
  if (n1) return en;
  n1 = 1;
  var N = id(), hl = A0(), G = sd();
  function g(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var u = 2; u < arguments.length; u++)
        t += "&args[]=" + encodeURIComponent(arguments[u]);
    }
    return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function O(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function _l(l) {
    for (var t = l, u = t; u && !u.alternate; )
      t = u, (t.flags & 4098) !== 0 && (l = t.return), u = t.return;
    for (; t.return; ) t = t.return;
    return t.tag === 3 ? l : null;
  }
  function nl(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function lt(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function gl(l) {
    if (_l(l) !== l)
      throw Error(g(188));
  }
  function Al(l) {
    var t = l.alternate;
    if (!t) {
      if (t = _l(l), t === null) throw Error(g(188));
      return t !== l ? null : l;
    }
    for (var u = l, a = t; ; ) {
      var e = u.return;
      if (e === null) break;
      var n = e.alternate;
      if (n === null) {
        if (a = e.return, a !== null) {
          u = a;
          continue;
        }
        break;
      }
      if (e.child === n.child) {
        for (n = e.child; n; ) {
          if (n === u) return gl(e), l;
          if (n === a) return gl(e), t;
          n = n.sibling;
        }
        throw Error(g(188));
      }
      if (u.return !== a.return) u = e, a = n;
      else {
        for (var f = !1, c = e.child; c; ) {
          if (c === u) {
            f = !0, u = e, a = n;
            break;
          }
          if (c === a) {
            f = !0, a = e, u = n;
            break;
          }
          c = c.sibling;
        }
        if (!f) {
          for (c = n.child; c; ) {
            if (c === u) {
              f = !0, u = n, a = e;
              break;
            }
            if (c === a) {
              f = !0, a = n, u = e;
              break;
            }
            c = c.sibling;
          }
          if (!f) throw Error(g(189));
        }
      }
      if (u.alternate !== a) throw Error(g(190));
    }
    if (u.tag !== 3) throw Error(g(188));
    return u.stateNode.current === u ? l : t;
  }
  function B(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (t = B(l), t !== null) return t;
      l = l.sibling;
    }
    return null;
  }
  function S(l, t, u, a, e, n) {
    for (; l !== null; ) {
      if ((l.tag === 5 || l.tag === 27 || l.tag === 6) && u(l, a, e, n) || (l.tag !== 22 || l.memoizedState === null) && (t || l.tag !== 5 && l.tag !== 27) && S(
        l.child,
        t,
        u,
        a,
        e,
        n
      ))
        return !0;
      l = l.sibling;
    }
    return !1;
  }
  function Y(l) {
    for (l = l.return; l !== null; ) {
      if (l.tag === 3 || l.tag === 5 || l.tag === 27) return l;
      l = l.return;
    }
    return null;
  }
  function bl(l) {
    var t = !1;
    for (l = l.return; l !== null && (l.tag === 4 && (t = !0), !(l.tag === 3 || l.tag === 5 || l.tag === 27)); )
      l = l.return;
    return t;
  }
  function Il(l) {
    var t = [null, null], u = Y(l);
    return u === null || Rl(
      t,
      l,
      u.child,
      { foundSelf: !1 }
    ), t;
  }
  function Rl(l, t, u, a) {
    for (; u !== null; ) {
      if (u === t) a.foundSelf = !0;
      else if (u.tag === 5 || u.tag === 27 || u.tag === 6) {
        if (a.foundSelf) return l[1] = u, !0;
        l[0] = u;
      } else if ((u.tag !== 22 || u.memoizedState === null) && Rl(
        l,
        t,
        u.child,
        a
      ))
        return !0;
      u = u.sibling;
    }
    return !1;
  }
  function tl(l) {
    switch (l.tag) {
      case 5:
      case 27:
      case 6:
        return l.stateNode;
      case 3:
        return l.stateNode.containerInfo;
      default:
        throw Error(g(559));
    }
  }
  var kl = null, Xl = null;
  function Hl(l, t, u) {
    return l === u ? !0 : l === t ? (kl = l, !0) : !1;
  }
  function Ql(l, t, u) {
    return l === u ? (Xl = l, !1) : l === t ? (Xl !== null && (kl = l), !0) : !1;
  }
  function tt(l) {
    if (l === null) return null;
    do
      l = l === null ? null : l.return;
    while (l && l.tag !== 5 && l.tag !== 27 && l.tag !== 3);
    return l || null;
  }
  function ql(l, t, u) {
    for (var a = 0, e = l; e; e = u(e)) a++;
    e = 0;
    for (var n = t; n; n = u(n)) e++;
    for (; 0 < a - e; ) l = u(l), a--;
    for (; 0 < e - a; ) t = u(t), e--;
    for (; a--; ) {
      if (l === t || t !== null && l === t.alternate)
        return l;
      l = u(l), t = u(t);
    }
    return null;
  }
  var Z = Object.assign, I = /* @__PURE__ */ Symbol.for("react.element"), At = /* @__PURE__ */ Symbol.for("react.transitional.element"), ut = /* @__PURE__ */ Symbol.for("react.portal"), Yl = /* @__PURE__ */ Symbol.for("react.fragment"), jl = /* @__PURE__ */ Symbol.for("react.strict_mode"), Bt = /* @__PURE__ */ Symbol.for("react.profiler"), Zt = /* @__PURE__ */ Symbol.for("react.consumer"), zl = /* @__PURE__ */ Symbol.for("react.context"), z = /* @__PURE__ */ Symbol.for("react.forward_ref"), D = /* @__PURE__ */ Symbol.for("react.suspense"), q = /* @__PURE__ */ Symbol.for("react.suspense_list"), L = /* @__PURE__ */ Symbol.for("react.memo"), W = /* @__PURE__ */ Symbol.for("react.lazy"), Zl = /* @__PURE__ */ Symbol.for("react.activity"), at = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), wu = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), v = /* @__PURE__ */ Symbol.for("react.view_transition"), E = /* @__PURE__ */ Symbol.for("react.recoverable"), C = Symbol.iterator;
  function H(l) {
    return l === null || typeof l != "object" ? null : (l = C && l[C] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var k = /* @__PURE__ */ Symbol.for("react.client.reference");
  function P(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === k ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case Yl:
        return "Fragment";
      case Bt:
        return "Profiler";
      case jl:
        return "StrictMode";
      case D:
        return "Suspense";
      case q:
        return "SuspenseList";
      case Zl:
        return "Activity";
      case v:
        return "ViewTransition";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case ut:
          return "Portal";
        case zl:
          return l.displayName || "Context";
        case Zt:
          return (l._context.displayName || "Context") + ".Consumer";
        case z:
          var t = l.render;
          return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
        case L:
          return t = l.displayName || null, t !== null ? t : P(l.type) || "Memo";
        case W:
          t = l._payload, l = l._init;
          try {
            return P(l(t));
          } catch {
          }
      }
    return null;
  }
  var ul = Array.isArray, U = hl.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, x = G.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, uu = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, xf = [], ga = -1;
  function Vt(l) {
    return { current: l };
  }
  function Vl(l) {
    0 > ga || (l.current = xf[ga], xf[ga] = null, ga--);
  }
  function ml(l, t) {
    ga++, xf[ga] = l.current, l.current = t;
  }
  var Lt = Vt(null), oe = Vt(null), Su = Vt(null), fn = Vt(null);
  function cn(l, t) {
    switch (ml(Su, t), ml(oe, l), ml(Lt, null), t.nodeType) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? fm(l) : 0;
        break;
      default:
        if (l = t.tagName, t = t.namespaceURI)
          t = fm(t), l = cm(t, l);
        else
          switch (l) {
            case "svg":
              l = 1;
              break;
            case "math":
              l = 2;
              break;
            default:
              l = 0;
          }
    }
    Vl(Lt), ml(Lt, l);
  }
  function Sa() {
    Vl(Lt), Vl(oe), Vl(Su);
  }
  function Xf(l) {
    var t = l.memoizedState;
    t !== null && (ne._currentValue = t.memoizedState, ml(fn, l)), t = Lt.current;
    var u = cm(t, l.type);
    t !== u && (ml(oe, l), ml(Lt, u));
  }
  function on(l) {
    oe.current === l && (Vl(Lt), Vl(oe)), fn.current === l && (Vl(fn), ne._currentValue = uu);
  }
  var Qf, N0;
  function _u(l) {
    if (Qf === void 0)
      try {
        throw Error();
      } catch (u) {
        var t = u.stack.trim().match(/\n( *(at )?)/);
        Qf = t && t[1] || "", N0 = -1 < u.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < u.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Qf + l + N0;
  }
  var jf = !1;
  function Zf(l, t) {
    if (!l || jf) return "";
    jf = !0;
    var u = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var T = function() {
                throw Error();
              };
              if (Object.defineProperty(T.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(T, []);
                } catch (b) {
                  var s = b;
                }
                Reflect.construct(l, [], T);
              } else {
                try {
                  T.call();
                } catch (b) {
                  s = b;
                }
                T = !1;
                try {
                  var d = Object.getOwnPropertyDescriptor(
                    l.prototype,
                    "props"
                  );
                  Object.defineProperty(l.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), T = !0, new l();
                } finally {
                  T && (d !== void 0 ? Object.defineProperty(l.prototype, "props", d) : delete l.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (b) {
                s = b;
              }
              (T = l()) && typeof T.catch == "function" && T.catch(function() {
              });
            }
          } catch (b) {
            if (b && s && typeof b.stack == "string")
              return [b.stack, s.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var e = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      e && e.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var n = a.DetermineComponentFrameRoot(), f = n[0], c = n[1];
      if (f && c) {
        var i = f.split(`
`), r = c.split(`
`);
        for (e = a = 0; a < i.length && !i[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; e < r.length && !r[e].includes(
          "DetermineComponentFrameRoot"
        ); )
          e++;
        if (a === i.length || e === r.length)
          for (a = i.length - 1, e = r.length - 1; 1 <= a && 0 <= e && i[a] !== r[e]; )
            e--;
        for (; 1 <= a && 0 <= e; a--, e--)
          if (i[a] !== r[e]) {
            if (a !== 1 || e !== 1)
              do
                if (a--, e--, 0 > e || i[a] !== r[e]) {
                  var h = `
` + i[a].replace(" at new ", " at ");
                  return l.displayName && h.includes("<anonymous>") && (h = h.replace("<anonymous>", l.displayName)), h;
                }
              while (1 <= a && 0 <= e);
            break;
          }
      }
    } finally {
      jf = !1, Error.prepareStackTrace = u;
    }
    return (u = l ? l.displayName || l.name : "") ? _u(u) : "";
  }
  function o1(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return _u(l.type);
      case 16:
        return _u("Lazy");
      case 13:
        return l.child !== t && t !== null ? _u("Suspense Fallback") : _u("Suspense");
      case 19:
        return _u("SuspenseList");
      case 0:
      case 15:
        return Zf(l.type, !1);
      case 11:
        return Zf(l.type.render, !1);
      case 1:
        return Zf(l.type, !0);
      case 31:
        return _u("Activity");
      case 30:
        return _u("ViewTransition");
      default:
        return "";
    }
  }
  function M0(l) {
    try {
      var t = "", u = null;
      do
        t += o1(l, u), u = l, l = l.return;
      while (l);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var Vf = Object.prototype.hasOwnProperty, Lf = N.unstable_scheduleCallback, Kf = N.unstable_cancelCallback, v1 = N.unstable_shouldYield, s1 = N.unstable_requestPaint, yt = N.unstable_now, m1 = N.unstable_getCurrentPriorityLevel, D0 = N.unstable_ImmediatePriority, U0 = N.unstable_UserBlockingPriority, vn = N.unstable_NormalPriority, r1 = N.unstable_LowPriority, R0 = N.unstable_IdlePriority, y1 = N.log, d1 = N.unstable_setDisableYieldValue, ve = null, dt = null;
  function Tu(l) {
    if (typeof y1 == "function" && d1(l), dt && typeof dt.setStrictMode == "function")
      try {
        dt.setStrictMode(ve, l);
      } catch {
      }
  }
  var ht = Math.clz32 ? Math.clz32 : S1, h1 = Math.log, g1 = Math.LN2;
  function S1(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (h1(l) / g1 | 0) | 0;
  }
  var sn = 256, mn = 262144, rn = 4194304;
  function Fu(l) {
    var t = l & 42;
    if (t !== 0) return t;
    switch (l & -l) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return l & -l;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return l;
    }
  }
  function yn(l, t, u) {
    var a = l.pendingLanes;
    if (a === 0) return 0;
    var e = 0, n = l.suspendedLanes, f = l.pingedLanes;
    l = l.warmLanes;
    var c = a & 134217727;
    return c !== 0 ? (a = c & ~n, a !== 0 ? e = Fu(a) : (f &= c, f !== 0 ? e = Fu(f) : u || (u = c & ~l, u !== 0 && (e = Fu(u))))) : (c = a & ~n, c !== 0 ? e = Fu(c) : f !== 0 ? e = Fu(f) : u || (u = a & ~l, u !== 0 && (e = Fu(u)))), e === 0 ? 0 : t !== 0 && t !== e && (t & n) === 0 && (n = e & -e, u = t & -t, n >= u || n === 32 && (u & 4194048) !== 0) ? t : e;
  }
  function se(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function C0(l, t) {
    (t & 8) !== 0 && (t |= t & 32);
    var u = l.entangledLanes;
    if (u !== 0)
      for (l = l.entanglements, u &= t; 0 < u; ) {
        var a = 31 - ht(u), e = 1 << a;
        t |= l[a], u &= ~e;
      }
    return t;
  }
  function _1(l, t) {
    switch (l) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function H0() {
    var l = rn;
    return rn <<= 1, (rn & 62914560) === 0 && (rn = 4194304), l;
  }
  function Jf(l) {
    for (var t = [], u = 0; 31 > u; u++) t.push(l);
    return t;
  }
  function me(l, t) {
    l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function T1(l, t, u, a, e, n) {
    var f = l.pendingLanes;
    l.pendingLanes = u, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= u, l.entangledLanes &= u, l.errorRecoveryDisabledLanes &= u, l.shellSuspendCounter = 0;
    var c = l.entanglements, i = l.expirationTimes, r = l.hiddenUpdates;
    for (u = f & ~u; 0 < u; ) {
      var h = 31 - ht(u), T = 1 << h;
      c[h] = 0, i[h] = -1;
      var s = r[h];
      if (s !== null)
        for (r[h] = null, h = 0; h < s.length; h++) {
          var d = s[h];
          d !== null && (d.lane &= -536870913);
        }
      u &= ~T;
    }
    a !== 0 && q0(l, a, 0), n !== 0 && e === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(f & ~t));
  }
  function q0(l, t, u) {
    l.pendingLanes |= t, l.suspendedLanes &= ~t;
    var a = 31 - ht(t);
    l.entangledLanes |= t, l.entanglements[a] = l.entanglements[a] | 1073741824 | u & 261930;
  }
  function Y0(l, t) {
    var u = l.entangledLanes |= t;
    for (l = l.entanglements; u; ) {
      var a = 31 - ht(u), e = 1 << a;
      e & t | l[a] & t && (l[a] |= t), u &= ~e;
    }
  }
  function B0(l, t) {
    var u = t & -t;
    return u = (u & 42) !== 0 ? 1 : wf(u), (u & (l.suspendedLanes | t)) !== 0 ? 0 : u;
  }
  function wf(l) {
    switch (l) {
      case 2:
        l = 1;
        break;
      case 8:
        l = 4;
        break;
      case 32:
        l = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        l = 128;
        break;
      case 268435456:
        l = 134217728;
        break;
      default:
        l = 0;
    }
    return l;
  }
  function Ff(l) {
    return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function p0() {
    var l = x.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : Lm(l.type));
  }
  function G0(l, t) {
    var u = x.p;
    try {
      return x.p = l, t();
    } finally {
      x.p = u;
    }
  }
  var au = Math.random().toString(36).slice(2), Ll = "__reactFiber$" + au, it = "__reactProps$" + au, _a = "__reactContainer$" + au, x0 = "__reactEvents$" + au, E1 = "__reactListeners$" + au, b1 = "__reactHandles$" + au, X0 = "__reactResources$" + au, re = "__reactMarker$" + au, dn = "__reactLoad$" + au;
  function hn(l) {
    delete l[Ll], delete l[it], delete l[E1], delete l[b1];
  }
  function Wu(l) {
    var t;
    if (t = l[Ll]) return t;
    for (var u = l.parentNode; u; ) {
      if (t = u[_a] || u[Ll]) {
        if (u = t.alternate, t.child !== null || u !== null && u.child !== null)
          for (l = Om(l); l !== null; ) {
            if (u = l[Ll]) return u;
            l = Om(l);
          }
        return t;
      }
      l = u, u = l.parentNode;
    }
    return null;
  }
  function Ta(l) {
    if (l = l[Ll] || l[_a]) {
      var t = l.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return l;
    }
    return null;
  }
  function ye(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(g(33));
  }
  function Ea(l) {
    var t = l[X0];
    return t || (t = l[X0] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Bl(l) {
    l[re] = !0;
  }
  function Q0(l) {
    l[dn] = void 0;
  }
  var j0 = /* @__PURE__ */ new Set(), Z0 = {};
  function $u(l, t) {
    ba(l, t), ba(l + "Capture", t);
  }
  function ba(l, t) {
    for (Z0[l] = t, l = 0; l < t.length; l++)
      j0.add(t[l]);
  }
  var z1 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), V0 = {}, L0 = {};
  function O1(l) {
    return Vf.call(L0, l) ? !0 : Vf.call(V0, l) ? !1 : z1.test(l) ? L0[l] = !0 : (V0[l] = !0, !1);
  }
  var ll = !1;
  function K0() {
    var l = ll;
    return ll = !1, l;
  }
  function gn(l, t, u) {
    if (O1(t))
      if (u === null) l.removeAttribute(t);
      else {
        switch (typeof u) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(t);
            return;
          case "boolean":
            var a = t.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              l.removeAttribute(t);
              return;
            }
        }
        l.setAttribute(t, u);
      }
  }
  function Sn(l, t, u) {
    if (u === null) l.removeAttribute(t);
    else {
      switch (typeof u) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(t);
          return;
      }
      l.setAttribute(t, u);
    }
  }
  function eu(l, t, u, a) {
    if (a === null) l.removeAttribute(u);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(u);
          return;
      }
      l.setAttributeNS(t, u, a);
    }
  }
  function gt(l) {
    switch (typeof l) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return l;
      case "object":
        return l;
      default:
        return "";
    }
  }
  function J0(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function A1(l, t, u) {
    var a = Object.getOwnPropertyDescriptor(
      l.constructor.prototype,
      t
    );
    if (!l.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var e = a.get, n = a.set;
      return Object.defineProperty(l, t, {
        configurable: !0,
        get: function() {
          return e.call(this);
        },
        set: function(f) {
          u = "" + f, n.call(this, f);
        }
      }), Object.defineProperty(l, t, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return u;
        },
        setValue: function(f) {
          u = "" + f;
        },
        stopTracking: function() {
          l._valueTracker = null, delete l[t];
        }
      };
    }
  }
  function Wf(l) {
    if (!l._valueTracker) {
      var t = J0(l) ? "checked" : "value";
      l._valueTracker = A1(
        l,
        t,
        "" + l[t]
      );
    }
  }
  function w0(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var u = t.getValue(), a = "";
    return l && (a = J0(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== u ? (t.setValue(l), !0) : !1;
  }
  var N1 = /[\n"\\]/g;
  function Nt(l) {
    return l.replace(
      N1,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function $f(l, t, u, a, e, n, f, c) {
    l.name = "", f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? l.type = f : l.removeAttribute("type"), t != null ? f === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + gt(t)) : l.value !== "" + gt(t) && (l.value = "" + gt(t)) : f !== "submit" && f !== "reset" || l.removeAttribute("value"), t != null ? f === "number" && l.value == t ? If(l, gt(l.value)) : If(l, gt(t)) : u != null ? If(l, gt(u)) : a != null && l.removeAttribute("value"), e == null && n != null && (l.defaultChecked = !!n), e != null && (l.checked = e && typeof e != "function" && typeof e != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.name = "" + gt(c) : l.removeAttribute("name");
  }
  function F0(l, t, u, a, e, n, f, c) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (l.type = n), t != null || u != null) {
      if (!(n !== "submit" && n !== "reset" || t != null)) {
        Wf(l);
        return;
      }
      u = u != null ? "" + gt(u) : "", t = t != null ? "" + gt(t) : u, c || t === l.value || (l.value = t), l.defaultValue = t;
    }
    a = a ?? e, a = typeof a != "function" && typeof a != "symbol" && !!a, l.checked = c ? l.checked : !!a, l.defaultChecked = !!a, f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (l.name = f), Wf(l);
  }
  function If(l, t) {
    l.defaultValue !== "" + t && (l.defaultValue = "" + t);
  }
  function za(l, t, u, a) {
    if (l = l.options, t) {
      t = {};
      for (var e = 0; e < u.length; e++)
        t["$" + u[e]] = !0;
      for (u = 0; u < l.length; u++)
        e = t.hasOwnProperty("$" + l[u].value), l[u].selected !== e && (l[u].selected = e), e && a && (l[u].defaultSelected = !0);
    } else {
      for (u = "" + gt(u), t = null, e = 0; e < l.length; e++) {
        if (l[e].value === u) {
          l[e].selected = !0, a && (l[e].defaultSelected = !0);
          return;
        }
        t !== null || l[e].disabled || (t = l[e]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function W0(l, t, u) {
    if (t != null && (t = "" + gt(t), t !== l.value && (l.value = t), u == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = u != null ? "" + gt(u) : "";
  }
  function $0(l, t, u, a) {
    if (t == null) {
      if (a != null) {
        if (u != null) throw Error(g(92));
        if (ul(a)) {
          if (1 < a.length) throw Error(g(93));
          a = a[0];
        }
        u = a;
      }
      u == null && (u = ""), t = u;
    }
    u = gt(t), l.defaultValue = u, a = l.textContent, a === u && a !== "" && a !== null && (l.value = a), Wf(l);
  }
  function Oa(l, t) {
    if (t) {
      var u = l.firstChild;
      if (u && u === l.lastChild && u.nodeType === 3) {
        u.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var M1 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function I0(l, t, u) {
    var a = t.indexOf("--") === 0;
    u == null || typeof u == "boolean" || u === "" ? a ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : a ? l.setProperty(t, u) : typeof u != "number" || u === 0 || M1.has(t) ? t === "float" ? l.cssFloat = u : l[t] = ("" + u).trim() : l[t] = u + "px";
  }
  function k0(l, t, u) {
    if (t != null && typeof t != "object")
      throw Error(g(62));
    if (l = l.style, u != null) {
      for (var a in u)
        !u.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "", ll = !0);
      for (var e in t)
        a = t[e], t.hasOwnProperty(e) && u[e] !== a && (I0(l, e, a), ll = !0);
    } else
      for (var n in t)
        t.hasOwnProperty(n) && I0(l, n, t[n]);
  }
  function kf(l) {
    if (l.indexOf("-") === -1) return !1;
    switch (l) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var D1 = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["maskType", "mask-type"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), U1 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function _n(l) {
    return U1.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function Kt() {
  }
  var Pf = null;
  function lc(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var Aa = null, Na = null;
  function P0(l) {
    var t = Ta(l);
    if (t && (l = t.stateNode)) {
      var u = l[it] || null;
      l: switch (l = t.stateNode, t.type) {
        case "input":
          if ($f(
            l,
            u.value,
            u.defaultValue,
            u.defaultValue,
            u.checked,
            u.defaultChecked,
            u.type,
            u.name
          ), t = u.name, u.type === "radio" && t != null) {
            for (u = l; u.parentNode; ) u = u.parentNode;
            for (u = u.querySelectorAll(
              'input[name="' + Nt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < u.length; t++) {
              var a = u[t];
              if (a !== l && a.form === l.form) {
                var e = a[it] || null;
                if (!e) throw Error(g(90));
                $f(
                  a,
                  e.value,
                  e.defaultValue,
                  e.defaultValue,
                  e.checked,
                  e.defaultChecked,
                  e.type,
                  e.name
                );
              }
            }
            for (t = 0; t < u.length; t++)
              a = u[t], a.form === l.form && w0(a);
          }
          break l;
        case "textarea":
          W0(l, u.value, u.defaultValue);
          break l;
        case "select":
          t = u.value, t != null && za(l, !!u.multiple, t, !1);
      }
    }
  }
  var tc = !1;
  function lo(l, t, u) {
    if (tc) return l(t, u);
    tc = !0;
    try {
      var a = l(t);
      return a;
    } finally {
      if (tc = !1, (Aa !== null || Na !== null) && (Tf(), Aa && (t = Aa, l = Na, Na = Aa = null, P0(t), l)))
        for (t = 0; t < l.length; t++) P0(l[t]);
    }
  }
  function de(l, t) {
    var u = l.stateNode;
    if (u === null) return null;
    var a = u[it] || null;
    if (a === null) return null;
    u = a[t];
    l: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (a = !a.disabled) || (l = l.type, a = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !a;
        break l;
      default:
        l = !1;
    }
    if (l) return null;
    if (u && typeof u != "function")
      throw Error(
        g(231, t, typeof u)
      );
    return u;
  }
  var nu = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), uc = !1;
  if (nu)
    try {
      var he = {};
      Object.defineProperty(he, "passive", {
        get: function() {
          uc = !0;
        }
      }), window.addEventListener("test", he, he), window.removeEventListener("test", he, he);
    } catch {
      uc = !1;
    }
  var Eu = null, ac = null, Tn = null;
  function to() {
    if (Tn) return Tn;
    var l, t = ac, u = t.length, a, e = "value" in Eu ? Eu.value : Eu.textContent, n = e.length;
    for (l = 0; l < u && t[l] === e[l]; l++) ;
    var f = u - l;
    for (a = 1; a <= f && t[u - a] === e[n - a]; a++) ;
    return Tn = e.slice(l, 1 < a ? 1 - a : void 0);
  }
  function En(l) {
    var t = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function bn() {
    return !0;
  }
  function uo() {
    return !1;
  }
  function et(l) {
    function t(u, a, e, n, f) {
      this._reactName = u, this._targetInst = e, this.type = a, this.nativeEvent = n, this.target = f, this.currentTarget = null;
      for (var c in l)
        l.hasOwnProperty(c) && (u = l[c], this[c] = u ? u(n) : n[c]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? bn : uo, this.isPropagationStopped = uo, this;
    }
    return Z(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var u = this.nativeEvent;
        u && (u.preventDefault ? u.preventDefault() : typeof u.returnValue != "unknown" && (u.returnValue = !1), this.isDefaultPrevented = bn);
      },
      stopPropagation: function() {
        var u = this.nativeEvent;
        u && (u.stopPropagation ? u.stopPropagation() : typeof u.cancelBubble != "unknown" && (u.cancelBubble = !0), this.isPropagationStopped = bn);
      },
      persist: function() {
      },
      isPersistent: bn
    }), t;
  }
  var bu = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, zn = et(bu), ge = Z({}, bu, { view: 0, detail: 0 }), R1 = et(ge), ec, nc, Se, On = Z({}, ge, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: cc,
    button: 0,
    buttons: 0,
    relatedTarget: function(l) {
      return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
    },
    movementX: function(l) {
      return "movementX" in l ? l.movementX : (l !== Se && (Se && l.type === "mousemove" ? (ec = l.screenX - Se.screenX, nc = l.screenY - Se.screenY) : nc = ec = 0, Se = l), ec);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : nc;
    }
  }), ao = et(On), C1 = Z({}, On, { dataTransfer: 0 }), H1 = et(C1), q1 = Z({}, ge, { relatedTarget: 0 }), fc = et(q1), Y1 = Z({}, bu, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), B1 = et(Y1), p1 = Z({}, bu, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), G1 = et(p1), x1 = Z({}, bu, { data: 0 }), eo = et(x1), X1 = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Q1 = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, j1 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Z1(l) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(l) : (l = j1[l]) ? !!t[l] : !1;
  }
  function cc() {
    return Z1;
  }
  var V1 = Z({}, ge, {
    key: function(l) {
      if (l.key) {
        var t = X1[l.key] || l.key;
        if (t !== "Unidentified") return t;
      }
      return l.type === "keypress" ? (l = En(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? Q1[l.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: cc,
    charCode: function(l) {
      return l.type === "keypress" ? En(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? En(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), L1 = et(V1), K1 = Z({}, On, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), no = et(K1), J1 = Z({}, bu, { submitter: 0 }), w1 = et(J1), F1 = Z({}, ge, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: cc
  }), W1 = et(F1), $1 = Z({}, bu, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), I1 = et($1), k1 = Z({}, On, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), P1 = et(k1), lr = Z({}, bu, {
    newState: 0,
    oldState: 0,
    source: 0
  }), tr = et(lr), ur = [9, 13, 27, 32], ic = nu && "CompositionEvent" in window, _e = null;
  nu && "documentMode" in document && (_e = document.documentMode);
  var ar = nu && "TextEvent" in window && !_e, fo = nu && (!ic || _e && 8 < _e && 11 >= _e), co = " ", io = !1;
  function oo(l, t) {
    switch (l) {
      case "keyup":
        return ur.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function vo(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var Ma = !1;
  function er(l, t) {
    switch (l) {
      case "compositionend":
        return vo(t);
      case "keypress":
        return t.which !== 32 ? null : (io = !0, co);
      case "textInput":
        return l = t.data, l === co && io ? null : l;
      default:
        return null;
    }
  }
  function nr(l, t) {
    if (Ma)
      return l === "compositionend" || !ic && oo(l, t) ? (l = to(), Tn = ac = Eu = null, Ma = !1, l) : null;
    switch (l) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length)
            return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return fo && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var fr = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function so(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!fr[l.type] : t === "textarea";
  }
  function mo(l, t, u, a) {
    Aa ? Na ? Na.push(a) : Na = [a] : Aa = a, t = Nf(t, "onChange"), 0 < t.length && (u = new zn(
      "onChange",
      "change",
      null,
      u,
      a
    ), l.push({ event: u, listeners: t }));
  }
  var Te = null, Ee = null;
  function cr(l) {
    lm(l, 0);
  }
  function An(l) {
    var t = ye(l);
    if (w0(t)) return l;
  }
  function ro(l, t) {
    if (l === "change") return t;
  }
  var yo = !1;
  if (nu) {
    var oc;
    if (nu) {
      var vc = "oninput" in document;
      if (!vc) {
        var ho = document.createElement("div");
        ho.setAttribute("oninput", "return;"), vc = typeof ho.oninput == "function";
      }
      oc = vc;
    } else oc = !1;
    yo = oc && (!document.documentMode || 9 < document.documentMode);
  }
  function go() {
    Te && (Te.detachEvent("onpropertychange", So), Ee = Te = null);
  }
  function So(l) {
    if (l.propertyName === "value" && An(Ee)) {
      var t = [];
      mo(
        t,
        Ee,
        l,
        lc(l)
      ), lo(cr, t);
    }
  }
  function ir(l, t, u) {
    l === "focusin" ? (go(), Te = t, Ee = u, Te.attachEvent("onpropertychange", So)) : l === "focusout" && go();
  }
  function or(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return An(Ee);
  }
  function vr(l, t) {
    if (l === "click") return An(t);
  }
  function sr(l, t) {
    if (l === "input" || l === "change")
      return An(t);
  }
  function mr(l, t) {
    return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
  }
  var St = typeof Object.is == "function" ? Object.is : mr;
  function be(l, t) {
    if (St(l, t)) return !0;
    if (typeof l != "object" || l === null || typeof t != "object" || t === null)
      return !1;
    var u = Object.keys(l), a = Object.keys(t);
    if (u.length !== a.length) return !1;
    for (a = 0; a < u.length; a++) {
      var e = u[a];
      if (!Vf.call(t, e) || !St(l[e], t[e]))
        return !1;
    }
    return !0;
  }
  function sc(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  function _o(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function To(l, t) {
    var u = _o(l);
    l = 0;
    for (var a; u; ) {
      if (u.nodeType === 3) {
        if (a = l + u.textContent.length, l <= t && a >= t)
          return { node: u, offset: t - l };
        l = a;
      }
      l: {
        for (; u; ) {
          if (u.nextSibling) {
            u = u.nextSibling;
            break l;
          }
          u = u.parentNode;
        }
        u = void 0;
      }
      u = _o(u);
    }
  }
  function Eo(l, t) {
    return l && t ? l === t ? !0 : l && l.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Eo(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function bo(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var t = sc(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var u = typeof t.contentWindow.location.href == "string";
      } catch {
        u = !1;
      }
      if (u) l = t.contentWindow;
      else break;
      t = sc(l.document);
    }
    return t;
  }
  function mc(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
  }
  var rr = nu && "documentMode" in document && 11 >= document.documentMode, Da = null, rc = null, ze = null, yc = !1;
  function zo(l, t, u) {
    var a = u.window === u ? u.document : u.nodeType === 9 ? u : u.ownerDocument;
    yc || Da == null || Da !== sc(a) || (a = Da, "selectionStart" in a && mc(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), ze && be(ze, a) || (ze = a, a = Nf(rc, "onSelect"), 0 < a.length && (t = new zn(
      "onSelect",
      "select",
      null,
      t,
      u
    ), l.push({ event: t, listeners: a }), t.target = Da)));
  }
  function Iu(l, t) {
    var u = {};
    return u[l.toLowerCase()] = t.toLowerCase(), u["Webkit" + l] = "webkit" + t, u["Moz" + l] = "moz" + t, u;
  }
  var Ua = {
    animationend: Iu("Animation", "AnimationEnd"),
    animationiteration: Iu("Animation", "AnimationIteration"),
    animationstart: Iu("Animation", "AnimationStart"),
    transitionrun: Iu("Transition", "TransitionRun"),
    transitionstart: Iu("Transition", "TransitionStart"),
    transitioncancel: Iu("Transition", "TransitionCancel"),
    transitionend: Iu("Transition", "TransitionEnd")
  }, dc = {}, Oo = {};
  nu && (Oo = document.createElement("div").style, "AnimationEvent" in window || (delete Ua.animationend.animation, delete Ua.animationiteration.animation, delete Ua.animationstart.animation), "TransitionEvent" in window || delete Ua.transitionend.transition);
  function ku(l) {
    if (dc[l]) return dc[l];
    if (!Ua[l]) return l;
    var t = Ua[l], u;
    for (u in t)
      if (t.hasOwnProperty(u) && u in Oo)
        return dc[l] = t[u];
    return l;
  }
  var Ao = ku("animationend"), No = ku("animationiteration"), Mo = ku("animationstart"), yr = ku("transitionrun"), dr = ku("transitionstart"), hr = ku("transitioncancel"), Do = ku("transitionend"), Uo = /* @__PURE__ */ new Map(), hc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  hc.push("scrollEnd");
  function pt(l, t) {
    Uo.set(l, t), $u(t, [l]);
  }
  var gr = 0;
  function fu(l, t) {
    if (l.name != null && l.name !== "auto") return l.name;
    if (t.autoName !== null) return t.autoName;
    l = Qt.identifierPrefix;
    var u = gr++;
    return l = "_" + l + "t_" + u.toString(32) + "_", t.autoName = l;
  }
  function Ro(l) {
    if (l == null || typeof l == "string")
      return l;
    var t = null, u = Wa;
    if (u !== null)
      for (var a = 0; a < u.length; a++) {
        var e = l[u[a]];
        if (e != null) {
          if (e === "none") return "none";
          t = t == null ? e : t + (" " + e);
        }
      }
    return t ?? l.default;
  }
  function cu(l, t) {
    return l = Ro(l), t = Ro(t), t == null ? l === "auto" ? null : l : t === "auto" ? null : t;
  }
  var Nn = typeof reportError == "function" ? reportError : function(l) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
        error: l
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", l);
      return;
    }
    console.error(l);
  }, Mt = [], Ra = 0, gc = 0;
  function Mn() {
    for (var l = Ra, t = gc = Ra = 0; t < l; ) {
      var u = Mt[t];
      Mt[t++] = null;
      var a = Mt[t];
      Mt[t++] = null;
      var e = Mt[t];
      Mt[t++] = null;
      var n = Mt[t];
      if (Mt[t++] = null, a !== null && e !== null) {
        var f = a.pending;
        f === null ? e.next = e : (e.next = f.next, f.next = e), a.pending = e;
      }
      n !== 0 && Co(u, e, n);
    }
  }
  function Dn(l, t, u, a) {
    Mt[Ra++] = l, Mt[Ra++] = t, Mt[Ra++] = u, Mt[Ra++] = a, gc |= a, l.lanes |= a, l = l.alternate, l !== null && (l.lanes |= a);
  }
  function Sc(l, t, u, a) {
    return Dn(l, t, u, a), Un(l);
  }
  function Pu(l, t) {
    return Dn(l, null, null, t), Un(l);
  }
  function Co(l, t, u) {
    l.lanes |= u;
    var a = l.alternate;
    a !== null && (a.lanes |= u);
    for (var e = !1, n = l.return; n !== null; )
      n.childLanes |= u, a = n.alternate, a !== null && (a.childLanes |= u), n.tag === 22 && (l = n.stateNode, l === null || l._visibility & 1 || (e = !0)), l = n, n = n.return;
    return l.tag === 3 ? (n = l.stateNode, e && t !== null && (e = 31 - ht(u), l = n.hiddenUpdates, a = l[e], a === null ? l[e] = [t] : a.push(t), t.lane = u | 536870912), n) : null;
  }
  function Un(l) {
    if (50 < Ke)
      throw Ke = 0, _f = null, Error(g(185));
    for (var t = l.return; t !== null; )
      l = t, t = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var Ca = {};
  function Sr(l, t, u, a) {
    this.tag = l, this.key = u, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function ot(l, t, u, a) {
    return new Sr(l, t, u, a);
  }
  function _c(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function iu(l, t) {
    var u = l.alternate;
    return u === null ? (u = ot(
      l.tag,
      t,
      l.key,
      l.mode
    ), u.elementType = l.elementType, u.type = l.type, u.stateNode = l.stateNode, u.alternate = l, l.alternate = u) : (u.pendingProps = t, u.type = l.type, u.flags = 0, u.subtreeFlags = 0, u.deletions = null), u.flags = l.flags & 1206910976, u.childLanes = l.childLanes, u.lanes = l.lanes, u.child = l.child, u.memoizedProps = l.memoizedProps, u.memoizedState = l.memoizedState, u.updateQueue = l.updateQueue, t = l.dependencies, u.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, u.sibling = l.sibling, u.index = l.index, u.ref = l.ref, u.refCleanup = l.refCleanup, u;
  }
  function Ho(l, t) {
    l.flags &= 1206910978;
    var u = l.alternate;
    return u === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = u.childLanes, l.lanes = u.lanes, l.child = u.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = u.memoizedProps, l.memoizedState = u.memoizedState, l.updateQueue = u.updateQueue, l.type = u.type, t = u.dependencies, l.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), l;
  }
  function Rn(l, t, u, a, e, n) {
    var f = 0;
    if (a = l, typeof a == "function") _c(a) && (f = 1);
    else if (typeof a == "string")
      f = Jy(
        l,
        u,
        Lt.current
      ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      l: switch (a) {
        case Zl:
          return l = ot(31, u, t, e), l.elementType = Zl, l.lanes = n, l;
        case Yl:
          return la(u.children, e, n, t);
        case jl:
          f = 8, e |= 24;
          break;
        case Bt:
          return l = ot(12, u, t, e | 2), l.elementType = Bt, l.lanes = n, l;
        case D:
          return l = ot(13, u, t, e), l.elementType = D, l.lanes = n, l;
        case q:
          return l = ot(19, u, t, e), l.elementType = q, l.lanes = n, l;
        case at:
        case v:
          return l = e | 32, l = ot(30, u, t, l), l.elementType = v, l.lanes = n, l.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, l;
        default:
          if (typeof a == "object" && a !== null)
            switch (a.$$typeof) {
              case zl:
                f = 10;
                break l;
              case Zt:
                f = 9;
                break l;
              case z:
                f = 11;
                break l;
              case L:
                f = 14;
                break l;
              case W:
                f = 16, a = null;
                break l;
            }
          f = 29, u = Error(
            g(130, l === null ? "null" : typeof l, "")
          ), a = null;
      }
    return t = ot(f, u, t, e), t.elementType = l, t.type = a, t.lanes = n, t;
  }
  function la(l, t, u, a) {
    return l = ot(7, l, a, t), l.lanes = u, l;
  }
  function Tc(l, t, u) {
    return l = ot(6, l, null, t), l.lanes = u, l;
  }
  function qo(l) {
    var t = ot(18, null, null, 0);
    return t.stateNode = l, t;
  }
  function Ec(l, t, u) {
    return t = ot(
      4,
      l.children !== null ? l.children : [],
      l.key,
      t
    ), t.lanes = u, t.stateNode = {
      containerInfo: l.containerInfo,
      pendingChildren: null,
      implementation: l.implementation
    }, t;
  }
  var Yo = /* @__PURE__ */ new WeakMap();
  function Dt(l, t) {
    if (typeof l == "object" && l !== null) {
      var u = Yo.get(l);
      return u !== void 0 ? u : (t = {
        value: l,
        source: t,
        stack: M0(t)
      }, Yo.set(l, t), t);
    }
    return {
      value: l,
      source: t,
      stack: M0(t)
    };
  }
  var Ha = [], qa = 0, Cn = null, Oe = 0, Ut = [], Rt = 0, zu = null, Jt = 1, wt = "";
  function ou(l, t) {
    Ha[qa++] = Oe, Ha[qa++] = Cn, Cn = l, Oe = t;
  }
  function Bo(l, t, u) {
    Ut[Rt++] = Jt, Ut[Rt++] = wt, Ut[Rt++] = zu, zu = l;
    var a = Jt;
    l = wt;
    var e = 32 - ht(a) - 1;
    a &= ~(1 << e), u += 1;
    var n = 32 - ht(t) + e;
    if (30 < n) {
      var f = e - e % 5;
      n = (a & (1 << f) - 1).toString(32), a >>= f, e -= f, Jt = 1 << 32 - ht(t) + e | u << e | a, wt = n + l;
    } else
      Jt = 1 << n | u << e | a, wt = l;
  }
  function Hn(l) {
    l.return !== null && (ou(l, 1), Bo(l, 1, 0));
  }
  function bc(l) {
    for (; l === Cn; )
      Cn = Ha[--qa], Ha[qa] = null, Oe = Ha[--qa], Ha[qa] = null;
    for (; l === zu; )
      zu = Ut[--Rt], Ut[Rt] = null, wt = Ut[--Rt], Ut[Rt] = null, Jt = Ut[--Rt], Ut[Rt] = null;
  }
  function po(l, t) {
    Ut[Rt++] = Jt, Ut[Rt++] = wt, Ut[Rt++] = zu, Jt = t.id, wt = t.overflow, zu = l;
  }
  var pl = null, rl = null, V = !1, Ou = null, Ct = !1, zc = Error(g(519));
  function Au(l) {
    var t = Error(
      g(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ae(Dt(t, l)), zc;
  }
  function Go(l) {
    var t = l.stateNode, u = l.type, a = l.memoizedProps;
    switch (t[Ll] = l, t[it] = a, u) {
      case "dialog":
        J("cancel", t), J("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        J("load", t);
        break;
      case "video":
      case "audio":
        for (u = 0; u < we.length; u++)
          J(we[u], t);
        break;
      case "source":
        J("error", t);
        break;
      case "img":
      case "image":
      case "link":
        J("error", t), J("load", t);
        break;
      case "details":
        J("toggle", t);
        break;
      case "input":
        J("invalid", t), F0(
          t,
          a.value,
          a.defaultValue,
          a.checked,
          a.defaultChecked,
          a.type,
          a.name,
          !0
        );
        break;
      case "select":
        J("invalid", t);
        break;
      case "textarea":
        J("invalid", t), $0(t, a.value, a.defaultValue, a.children);
    }
    u = a.children, typeof u != "string" && typeof u != "number" && typeof u != "bigint" || t.textContent === "" + u || a.suppressHydrationWarning === !0 || em(t.textContent, u) ? (a.popover != null && (J("beforetoggle", t), J("toggle", t)), a.onScroll != null && J("scroll", t), a.onScrollEnd != null && J("scrollend", t), a.onClick != null && (t.onclick = Kt), t = !0) : t = !1, t || Au(l, !0);
  }
  function qn(l) {
    for (pl = l.return; pl; )
      switch (pl.tag) {
        case 5:
        case 31:
        case 13:
          Ct = !1;
          return;
        case 27:
        case 3:
          Ct = !0;
          return;
        default:
          pl = pl.return;
      }
  }
  function Ya(l) {
    if (l !== pl) return !1;
    if (!V) return qn(l), V = !0, !1;
    var t = l.tag, u;
    if ((u = t !== 3 && t !== 27) && ((u = t === 5) && (u = l.type, u = !(u !== "form" && u !== "button") || Pi(l.type, l.memoizedProps)), u = !u), u && rl && Au(l), qn(l), t === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(g(317));
      rl = zm(l);
    } else if (t === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(g(317));
      rl = zm(l);
    } else
      t === 27 ? (t = rl, ju(l.type) ? (l = i0, i0 = null, rl = l) : rl = t) : rl = pl ? qt(l.stateNode.nextSibling) : null;
    return !0;
  }
  function ta() {
    rl = pl = null, V = !1;
  }
  function Oc() {
    var l = Ou;
    return l !== null && (mt === null ? mt = l : mt.push.apply(
      mt,
      l
    ), Ou = null), l;
  }
  function Ae(l) {
    Ou === null ? Ou = [l] : Ou.push(l);
  }
  var Ac = Vt(null), ua = null, vu = null;
  function Nu(l, t, u) {
    ml(Ac, t._currentValue), t._currentValue = u;
  }
  function su(l) {
    l._currentValue = Ac.current, Vl(Ac);
  }
  function Yn(l, t, u) {
    for (; l !== null; ) {
      var a = l.alternate;
      if ((l.childLanes & t) !== t ? (l.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), l === u) break;
      l = l.return;
    }
  }
  function Nc(l, t, u, a) {
    var e = l.child;
    for (e !== null && (e.return = l); e !== null; ) {
      var n = e.dependencies;
      if (n !== null) {
        var f = e.child;
        n = n.firstContext;
        l: for (; n !== null; ) {
          var c = n;
          n = e;
          for (var i = 0; i < t.length; i++)
            if (c.context === t[i]) {
              n.lanes |= u, c = n.alternate, c !== null && (c.lanes |= u), Yn(
                n.return,
                u,
                l
              ), a || (f = null);
              break l;
            }
          n = c.next;
        }
      } else if (e.tag === 18) {
        if (f = e.return, f === null) throw Error(g(341));
        f.lanes |= u, n = f.alternate, n !== null && (n.lanes |= u), Yn(f, u, l), f = null;
      } else
        e.tag === 13 && e.memoizedState !== null && e.memoizedState.dehydrated === null ? (e.lanes |= u, f = e.alternate, f !== null && (f.lanes |= u), Yn(
          e.return,
          u,
          l
        ), f = e.child, f = f !== null ? f.sibling : null) : f = e.child;
      if (f !== null) f.return = e;
      else
        for (f = e; f !== null; ) {
          if (f === l) {
            f = null;
            break;
          }
          if (e = f.sibling, e !== null) {
            e.return = f.return, f = e;
            break;
          }
          f = f.return;
        }
      e = f;
    }
  }
  function aa(l, t, u, a) {
    l = null;
    for (var e = t, n = !1; e !== null; ) {
      if (!n) {
        if ((e.flags & 524288) !== 0) n = !0;
        else if ((e.flags & 262144) !== 0) break;
      }
      if (e.tag === 10) {
        var f = e.alternate;
        if (f === null) throw Error(g(387));
        if (f = f.memoizedProps, f !== null) {
          var c = e.type;
          St(e.pendingProps.value, f.value) || (l !== null ? l.push(c) : l = [c]);
        }
      } else if (e === fn.current) {
        if (f = e.alternate, f === null) throw Error(g(387));
        f.memoizedState.memoizedState !== e.memoizedState.memoizedState && (l !== null ? l.push(ne) : l = [ne]);
      }
      e = e.return;
    }
    return l !== null && Nc(
      t,
      l,
      u,
      a
    ), t.flags |= 262144, l !== null;
  }
  function Bn(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!St(
        l.context._currentValue,
        l.memoizedValue
      ))
        return !0;
      l = l.next;
    }
    return !1;
  }
  function ea(l) {
    ua = l, vu = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function Kl(l) {
    return xo(ua, l);
  }
  function pn(l, t) {
    return ua === null && ea(l), xo(l, t);
  }
  function xo(l, t) {
    var u = t._currentValue;
    if (t = { context: t, memoizedValue: u, next: null }, vu === null) {
      if (l === null) throw Error(g(308));
      vu = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
    } else vu = vu.next = t;
    return u;
  }
  var _r = typeof AbortController < "u" ? AbortController : function() {
    var l = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(u, a) {
        l.push(a);
      }
    };
    this.abort = function() {
      t.aborted = !0, l.forEach(function(u) {
        return u();
      });
    };
  }, Tr = N.unstable_scheduleCallback, Er = N.unstable_NormalPriority, Nl = {
    $$typeof: zl,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Mc() {
    return {
      controller: new _r(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Ne(l) {
    l.refCount--, l.refCount === 0 && Tr(Er, function() {
      l.controller.abort();
    });
  }
  function Xo(l, t) {
    if ((l.pendingLanes & 4194048) !== 0) {
      var u = l.transitionTypes;
      for (u === null && (u = l.transitionTypes = []), l = 0; l < t.length; l++) {
        var a = t[l];
        u.indexOf(a) === -1 && u.push(a);
      }
    }
  }
  var Me = null;
  function br(l) {
    var t = l.transitionTypes;
    return l.transitionTypes = null, t;
  }
  var De = null, Dc = 0, na = 0, Ba = null;
  function zr(l, t) {
    if (De === null) {
      var u = De = [];
      Dc = 0, na = Li(), Ba = {
        status: "pending",
        value: void 0,
        then: function(a) {
          u.push(a);
        }
      };
    }
    return Dc++, t.then(Qo, Qo), t;
  }
  function Qo() {
    if (--Dc === 0 && (Me = null, De !== null)) {
      Ba !== null && (Ba.status = "fulfilled");
      var l = De;
      De = null, na = 0, Ba = null;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function Or(l, t) {
    var u = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(e) {
        u.push(e);
      }
    };
    return l.then(
      function() {
        a.status = "fulfilled", a.value = t;
        for (var e = 0; e < u.length; e++) (0, u[e])(t);
      },
      function(e) {
        for (a.status = "rejected", a.reason = e, e = 0; e < u.length; e++)
          (0, u[e])(void 0);
      }
    ), a;
  }
  var jo = U.S;
  U.S = function(l, t) {
    if (qs = yt(), typeof t == "object" && t !== null && typeof t.then == "function" && zr(l, t), Me !== null)
      for (var u = Pa; u !== null; )
        Xo(u, Me), u = u.next;
    if (u = l.types, u !== null) {
      for (var a = Pa; a !== null; )
        Xo(a, u), a = a.next;
      if (na !== 0) {
        a = Me, a === null && (a = Me = []);
        for (var e = 0; e < u.length; e++) {
          var n = u[e];
          a.indexOf(n) === -1 && a.push(n);
        }
      }
    }
    jo !== null && jo(l, t);
  };
  var fa = Vt(null);
  function Uc() {
    var l = fa.current;
    return l !== null ? l : sl.pooledCache;
  }
  function Gn(l, t) {
    t === null ? ml(fa, fa.current) : ml(fa, t.pool);
  }
  function Zo() {
    var l = Uc();
    return l === null ? null : { parent: Nl._currentValue, pool: l };
  }
  var pa = Error(g(460)), Rc = Error(g(474)), xn = Error(g(542)), Xn = { then: function() {
  } };
  function Vo(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function Lo(l, t, u) {
    switch (u = l[u], u === void 0 ? l.push(t) : u !== t && (t.then(Kt, Kt), t = u), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw l = t.reason, Jo(l), l === void 0 && !("reason" in t) ? Error(g(600)) : l;
      default:
        if (typeof t.status == "string") t.then(Kt, Kt);
        else {
          if (l = sl, l !== null && 100 < l.shellSuspendCounter)
            throw Error(g(482));
          l = t, l.status = "pending", l.then(
            function(a) {
              if (t.status === "pending") {
                var e = t;
                e.status = "fulfilled", e.value = a;
              }
            },
            function(a) {
              if (t.status === "pending") {
                var e = t;
                e.status = "rejected", e.reason = a;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw l = t.reason, Jo(l), l;
        }
        throw ia = t, pa;
    }
  }
  function ca(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (u) {
      throw u !== null && typeof u == "object" && typeof u.then == "function" ? (ia = u, pa) : u;
    }
  }
  var ia = null;
  function Ko() {
    if (ia === null) throw Error(g(459));
    var l = ia;
    return ia = null, l;
  }
  function Jo(l) {
    if (l === pa || l === xn)
      throw Error(g(483));
  }
  var Ga = null, Ue = 0;
  function Qn(l) {
    var t = Ue;
    return Ue += 1, Ga === null && (Ga = []), Lo(Ga, l, t);
  }
  function Mu(l, t) {
    t = t.props.ref, l.ref = t !== void 0 ? t : null;
  }
  function jn(l, t) {
    throw t.$$typeof === I ? Error(g(525)) : (l = Object.prototype.toString.call(t), Error(
      g(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l
      )
    ));
  }
  function wo(l) {
    function t(m, o) {
      if (l) {
        var y = m.deletions;
        y === null ? (m.deletions = [o], m.flags |= 16) : y.push(o);
      }
    }
    function u(m, o) {
      if (!l) return null;
      for (; o !== null; )
        t(m, o), o = o.sibling;
      return null;
    }
    function a(m) {
      for (var o = /* @__PURE__ */ new Map(); m !== null; )
        m.key === null ? o.set(m.index, m) : o.set(m.key, m), m = m.sibling;
      return o;
    }
    function e(m, o) {
      return m = iu(m, o), m.index = 0, m.sibling = null, m;
    }
    function n(m, o, y) {
      return m.index = y, l ? (y = m.alternate, y !== null ? (y = y.index, y < o ? (m.flags |= 2, o) : y) : (m.flags |= 134217730, o)) : (m.flags |= 1048576, o);
    }
    function f(m) {
      return l && m.alternate === null && (m.flags |= 134217730), m;
    }
    function c(m, o, y, _) {
      return o === null || o.tag !== 6 ? (o = Tc(y, m.mode, _), o.return = m, o) : (o = e(o, y), o.return = m, o);
    }
    function i(m, o, y, _) {
      var A = y.type;
      return A === Yl ? (m = h(
        m,
        o,
        y.props.children,
        _,
        y.key
      ), Mu(m, y), m) : o !== null && (o.elementType === A || typeof A == "object" && A !== null && A.$$typeof === W && ca(A) === o.type) ? (o = e(o, y.props), Mu(o, y), o.return = m, o) : (o = Rn(
        y.type,
        y.key,
        y.props,
        null,
        m.mode,
        _
      ), Mu(o, y), o.return = m, o);
    }
    function r(m, o, y, _) {
      return o === null || o.tag !== 4 || o.stateNode.containerInfo !== y.containerInfo || o.stateNode.implementation !== y.implementation ? (o = Ec(y, m.mode, _), o.return = m, o) : (o = e(o, y.children || []), o.return = m, o);
    }
    function h(m, o, y, _, A) {
      return o === null || o.tag !== 7 ? (o = la(
        y,
        m.mode,
        _,
        A
      ), o.return = m, o) : (o = e(o, y), o.return = m, o);
    }
    function T(m, o, y) {
      if (typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint")
        return o = Tc(
          "" + o,
          m.mode,
          y
        ), o.return = m, o;
      if (typeof o == "object" && o !== null) {
        switch (o.$$typeof) {
          case At:
            return y = Rn(
              o.type,
              o.key,
              o.props,
              null,
              m.mode,
              y
            ), Mu(y, o), y.return = m, y;
          case ut:
            return o = Ec(
              o,
              m.mode,
              y
            ), o.return = m, o;
          case W:
            return o = ca(o), T(m, o, y);
        }
        if (ul(o) || H(o))
          return o = la(
            o,
            m.mode,
            y,
            null
          ), o.return = m, o;
        if (typeof o.then == "function")
          return T(m, Qn(o), y);
        if (o.$$typeof === zl)
          return T(
            m,
            pn(m, o),
            y
          );
        jn(m, o);
      }
      return null;
    }
    function s(m, o, y, _) {
      var A = o !== null ? o.key : null;
      if (typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint")
        return A !== null ? null : c(m, o, "" + y, _);
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case At:
            return y.key === A ? i(m, o, y, _) : null;
          case ut:
            return y.key === A ? r(m, o, y, _) : null;
          case W:
            return y = ca(y), s(m, o, y, _);
        }
        if (ul(y) || H(y))
          return A !== null ? null : h(m, o, y, _, null);
        if (typeof y.then == "function")
          return s(
            m,
            o,
            Qn(y),
            _
          );
        if (y.$$typeof === zl)
          return s(
            m,
            o,
            pn(m, y),
            _
          );
        jn(m, y);
      }
      return null;
    }
    function d(m, o, y, _, A) {
      if (typeof _ == "string" && _ !== "" || typeof _ == "number" || typeof _ == "bigint")
        return m = m.get(y) || null, c(o, m, "" + _, A);
      if (typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case At:
            return m = m.get(
              _.key === null ? y : _.key
            ) || null, i(o, m, _, A);
          case ut:
            return m = m.get(
              _.key === null ? y : _.key
            ) || null, r(o, m, _, A);
          case W:
            return _ = ca(_), d(
              m,
              o,
              y,
              _,
              A
            );
        }
        if (ul(_) || H(_))
          return m = m.get(y) || null, h(o, m, _, A, null);
        if (typeof _.then == "function")
          return d(
            m,
            o,
            y,
            Qn(_),
            A
          );
        if (_.$$typeof === zl)
          return d(
            m,
            o,
            y,
            pn(o, _),
            A
          );
        jn(o, _);
      }
      return null;
    }
    function b(m, o, y, _) {
      for (var A = null, F = null, R = o, p = o = 0, Ul = null; R !== null && p < y.length; p++) {
        R.index > p ? (Ul = R, R = null) : Ul = R.sibling;
        var $ = s(
          m,
          R,
          y[p],
          _
        );
        if ($ === null) {
          R === null && (R = Ul);
          break;
        }
        l && R && $.alternate === null && t(m, R), o = n($, o, p), F === null ? A = $ : F.sibling = $, F = $, R = Ul;
      }
      if (p === y.length)
        return u(m, R), V && ou(m, p), A;
      if (R === null) {
        for (; p < y.length; p++)
          R = T(m, y[p], _), R !== null && (o = n(
            R,
            o,
            p
          ), F === null ? A = R : F.sibling = R, F = R);
        return V && ou(m, p), A;
      }
      for (R = a(R); p < y.length; p++)
        Ul = d(
          R,
          m,
          p,
          y[p],
          _
        ), Ul !== null && (l && ($ = Ul.alternate, $ !== null && R.delete($.key === null ? p : $.key)), o = n(
          Ul,
          o,
          p
        ), F === null ? A = Ul : F.sibling = Ul, F = Ul);
      return l && R.forEach(function(Ju) {
        return t(m, Ju);
      }), V && ou(m, p), A;
    }
    function M(m, o, y, _) {
      if (y == null) throw Error(g(151));
      for (var A = null, F = null, R = o, p = o = 0, Ul = null, $ = y.next(); R !== null && !$.done; p++, $ = y.next()) {
        R.index > p ? (Ul = R, R = null) : Ul = R.sibling;
        var Ju = s(m, R, $.value, _);
        if (Ju === null) {
          R === null && (R = Ul);
          break;
        }
        l && R && Ju.alternate === null && t(m, R), o = n(Ju, o, p), F === null ? A = Ju : F.sibling = Ju, F = Ju, R = Ul;
      }
      if ($.done)
        return u(m, R), V && ou(m, p), A;
      if (R === null) {
        for (; !$.done; p++, $ = y.next())
          $ = T(m, $.value, _), $ !== null && (o = n($, o, p), F === null ? A = $ : F.sibling = $, F = $);
        return V && ou(m, p), A;
      }
      for (R = a(R); !$.done; p++, $ = y.next())
        $ = d(R, m, p, $.value, _), $ !== null && (l && (Ul = $.alternate, Ul !== null && R.delete(
          Ul.key === null ? p : Ul.key
        )), o = n($, o, p), F === null ? A = $ : F.sibling = $, F = $);
      return l && R.forEach(function(ed) {
        return t(m, ed);
      }), V && ou(m, p), A;
    }
    function j(m, o, y, _) {
      if (typeof y == "object" && y !== null && y.type === Yl && y.key === null && y.props.ref === void 0 && (y = y.props.children), typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case At:
            l: {
              for (var A = y.key; o !== null; ) {
                if (o.key === A) {
                  if (A = y.type, A === Yl) {
                    if (o.tag === 7) {
                      u(
                        m,
                        o.sibling
                      ), _ = e(
                        o,
                        y.props.children
                      ), Mu(_, y), _.return = m, m = _;
                      break l;
                    }
                  } else if (o.elementType === A || typeof A == "object" && A !== null && A.$$typeof === W && ca(A) === o.type) {
                    u(
                      m,
                      o.sibling
                    ), _ = e(o, y.props), Mu(_, y), _.return = m, m = _;
                    break l;
                  }
                  u(m, o);
                  break;
                } else t(m, o);
                o = o.sibling;
              }
              y.type === Yl ? (_ = la(
                y.props.children,
                m.mode,
                _,
                y.key
              ), Mu(_, y), _.return = m, m = _) : (_ = Rn(
                y.type,
                y.key,
                y.props,
                null,
                m.mode,
                _
              ), Mu(_, y), _.return = m, m = _);
            }
            return f(m);
          case ut:
            l: {
              for (A = y.key; o !== null; ) {
                if (o.key === A)
                  if (o.tag === 4 && o.stateNode.containerInfo === y.containerInfo && o.stateNode.implementation === y.implementation) {
                    u(
                      m,
                      o.sibling
                    ), _ = e(o, y.children || []), _.return = m, m = _;
                    break l;
                  } else {
                    u(m, o);
                    break;
                  }
                else t(m, o);
                o = o.sibling;
              }
              _ = Ec(y, m.mode, _), _.return = m, m = _;
            }
            return f(m);
          case W:
            return y = ca(y), j(
              m,
              o,
              y,
              _
            );
        }
        if (ul(y))
          return b(
            m,
            o,
            y,
            _
          );
        if (H(y)) {
          if (A = H(y), typeof A != "function") throw Error(g(150));
          return y = A.call(y), M(
            m,
            o,
            y,
            _
          );
        }
        if (typeof y.then == "function")
          return j(
            m,
            o,
            Qn(y),
            _
          );
        if (y.$$typeof === zl)
          return j(
            m,
            o,
            pn(m, y),
            _
          );
        jn(m, y);
      }
      return typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint" ? (y = "" + y, o !== null && o.tag === 6 ? (u(m, o.sibling), _ = e(o, y), _.return = m, m = _) : (u(m, o), _ = Tc(y, m.mode, _), _.return = m, m = _), f(m)) : u(m, o);
    }
    return function(m, o, y, _) {
      try {
        Ue = 0;
        var A = j(
          m,
          o,
          y,
          _
        );
        return Ga = null, A;
      } catch (R) {
        if (R === pa || R === xn) throw R;
        var F = ot(29, R, null, m.mode);
        return F.lanes = _, F.return = m, F;
      }
    };
  }
  var oa = wo(!0), Fo = wo(!1), Du = !1;
  function Cc(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Hc(l, t) {
    l = l.updateQueue, t.updateQueue === l && (t.updateQueue = {
      baseState: l.baseState,
      firstBaseUpdate: l.firstBaseUpdate,
      lastBaseUpdate: l.lastBaseUpdate,
      shared: l.shared,
      callbacks: null
    });
  }
  function Uu(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function Ru(l, t, u) {
    var a = l.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (al & 2) !== 0) {
      var e = a.pending;
      return e === null ? t.next = t : (t.next = e.next, e.next = t), a.pending = t, t = Un(l), Co(l, null, u), t;
    }
    return Dn(l, a, t, u), Un(l);
  }
  function Re(l, t, u) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (u & 4194048) !== 0)) {
      var a = t.lanes;
      a &= l.pendingLanes, u |= a, t.lanes = u, Y0(l, u);
    }
  }
  function qc(l, t) {
    var u = l.updateQueue, a = l.alternate;
    if (a !== null && (a = a.updateQueue, u === a)) {
      var e = null, n = null;
      if (u = u.firstBaseUpdate, u !== null) {
        do {
          var f = {
            lane: u.lane,
            tag: u.tag,
            payload: u.payload,
            callback: null,
            next: null
          };
          n === null ? e = n = f : n = n.next = f, u = u.next;
        } while (u !== null);
        n === null ? e = n = t : n = n.next = t;
      } else e = n = t;
      u = {
        baseState: a.baseState,
        firstBaseUpdate: e,
        lastBaseUpdate: n,
        shared: a.shared,
        callbacks: a.callbacks
      }, l.updateQueue = u;
      return;
    }
    l = u.lastBaseUpdate, l === null ? u.firstBaseUpdate = t : l.next = t, u.lastBaseUpdate = t;
  }
  var Yc = !1;
  function Ce() {
    if (Yc) {
      var l = Ba;
      if (l !== null) throw l;
    }
  }
  function He(l, t, u, a) {
    Yc = !1;
    var e = l.updateQueue;
    Du = !1;
    var n = e.firstBaseUpdate, f = e.lastBaseUpdate, c = e.shared.pending;
    if (c !== null) {
      e.shared.pending = null;
      var i = c, r = i.next;
      i.next = null, f === null ? n = r : f.next = r, f = i;
      var h = l.alternate;
      h !== null && (h = h.updateQueue, c = h.lastBaseUpdate, c !== f && (c === null ? h.firstBaseUpdate = r : c.next = r, h.lastBaseUpdate = i));
    }
    if (n !== null) {
      var T = e.baseState;
      f = 0, h = r = i = null, c = n;
      do {
        var s = c.lane & -536870913, d = s !== c.lane;
        if (d ? (w & s) === s : (a & s) === s) {
          s !== 0 && s === na && (Yc = !0), h !== null && (h = h.next = {
            lane: 0,
            tag: c.tag,
            payload: c.payload,
            callback: null,
            next: null
          });
          l: {
            var b = l, M = c;
            s = t;
            var j = u;
            switch (M.tag) {
              case 1:
                if (b = M.payload, typeof b == "function") {
                  T = b.call(j, T, s);
                  break l;
                }
                T = b;
                break l;
              case 3:
                b.flags = b.flags & -65537 | 128;
              case 0:
                if (b = M.payload, s = typeof b == "function" ? b.call(j, T, s) : b, s == null) break l;
                T = Z({}, T, s);
                break l;
              case 2:
                Du = !0;
            }
          }
          s = c.callback, s !== null && (l.flags |= 64, d && (l.flags |= 8192), d = e.callbacks, d === null ? e.callbacks = [s] : d.push(s));
        } else
          d = {
            lane: s,
            tag: c.tag,
            payload: c.payload,
            callback: c.callback,
            next: null
          }, h === null ? (r = h = d, i = T) : h = h.next = d, f |= s;
        if (c = c.next, c === null) {
          if (c = e.shared.pending, c === null)
            break;
          d = c, c = d.next, d.next = null, e.lastBaseUpdate = d, e.shared.pending = null;
        }
      } while (!0);
      h === null && (i = T), e.baseState = i, e.firstBaseUpdate = r, e.lastBaseUpdate = h, n === null && (e.shared.lanes = 0), Gu |= f, l.lanes = f, l.memoizedState = T;
    }
  }
  function Wo(l, t) {
    if (typeof l != "function")
      throw Error(g(191, l));
    l.call(t);
  }
  function $o(l, t) {
    var u = l.callbacks;
    if (u !== null)
      for (l.callbacks = null, l = 0; l < u.length; l++)
        Wo(u[l], t);
  }
  var Cu = Vt(null), Zn = Vt(0);
  function Io(l, t) {
    l = hu, ml(Zn, l), ml(Cu, t), hu = l | t.baseLanes;
  }
  function Bc() {
    ml(Zn, hu), ml(Cu, Cu.current);
  }
  function pc() {
    hu = Zn.current, Vl(Cu), Vl(Zn);
  }
  var Jl = Vt(null), Pl = null;
  function Hu(l) {
    var t = l.alternate;
    ml(wl, wl.current & 1), ml(Jl, l), Pl === null && (t === null || Cu.current !== null || t.memoizedState !== null) && (Pl = l);
  }
  function Gc(l) {
    ml(wl, wl.current), ml(Jl, l), Pl === null && (Pl = l);
  }
  function ko(l) {
    l.tag === 22 ? (ml(wl, wl.current), ml(Jl, l), Pl === null && (Pl = l)) : qu();
  }
  function qu() {
    ml(wl, wl.current), ml(Jl, Jl.current);
  }
  function _t(l) {
    Vl(Jl), Pl === l && (Pl = null), Vl(wl);
  }
  var wl = Vt(0);
  function qe(l, t) {
    ml(Jl, Jl.current), ml(wl, t);
  }
  function xc(l) {
    Vl(wl), Vl(Jl), Pl === l && (Pl = null);
  }
  function Vn(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var u = t.memoizedState;
        if (u !== null && (u = u.dehydrated, u === null || f0(u) || c0(u)))
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== "independent") {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === l) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === l) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var mu = 0, Q = null, ol = null, Ml = null, Ln = !1, xa = !1, va = !1, Kn = 0, Ye = 0, Xa = null, Ar = 0;
  function Tl() {
    throw Error(g(321));
  }
  function Xc(l, t) {
    if (t === null) return !1;
    for (var u = 0; u < t.length && u < l.length; u++)
      if (!St(l[u], t[u])) return !1;
    return !0;
  }
  function Qc(l, t, u, a, e, n) {
    return mu = n, Q = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, U.H = l === null || l.memoizedState === null ? Bv : pv, va = !1, n = u(a, e), va = !1, xa && (n = lv(
      t,
      u,
      a,
      e
    )), Po(l), n;
  }
  function Po(l) {
    U.H = kn;
    var t = ol !== null && ol.next !== null;
    if (mu = 0, Ml = ol = Q = null, Ln = !1, Ye = 0, Xa = null, t) throw Error(g(300));
    l === null || Dl || (l = l.dependencies, l !== null && Bn(l) && (Dl = !0));
  }
  function lv(l, t, u, a) {
    Q = l;
    var e = 0;
    do {
      if (xa && (Xa = null), Ye = 0, xa = !1, 25 <= e) throw Error(g(301));
      if (e += 1, Ml = ol = null, l.updateQueue != null) {
        var n = l.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      U.H = qr, n = t(u, a);
    } while (xa);
    return n;
  }
  function Nr() {
    var l = U.H, t = l.useState()[0];
    return t = typeof t.then == "function" ? Be(t) : t, l = l.useState()[0], (ol !== null ? ol.memoizedState : null) !== l && (Q.flags |= 1024), t;
  }
  function jc() {
    var l = Kn !== 0;
    return Kn = 0, l;
  }
  function Zc(l, t, u) {
    t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~u;
  }
  function Vc(l) {
    if (Ln) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        t !== null && (t.pending = null), l = l.next;
      }
      Ln = !1;
    }
    mu = 0, Ml = ol = Q = null, xa = !1, Ye = Kn = 0, Xa = null;
  }
  function nt() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ml === null ? Q.memoizedState = Ml = l : Ml = Ml.next = l, Ml;
  }
  function Ol() {
    if (ol === null) {
      var l = Q.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = ol.next;
    var t = Ml === null ? Q.memoizedState : Ml.next;
    if (t !== null)
      Ml = t, ol = l;
    else {
      if (l === null)
        throw Q.alternate === null ? Error(g(467)) : Error(g(310));
      ol = l, l = {
        memoizedState: ol.memoizedState,
        baseState: ol.baseState,
        baseQueue: ol.baseQueue,
        queue: ol.queue,
        next: null
      }, Ml === null ? Q.memoizedState = Ml = l : Ml = Ml.next = l;
    }
    return Ml;
  }
  function Jn() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Be(l) {
    var t = Ye;
    return Ye += 1, Xa === null && (Xa = []), l = Lo(Xa, l, t), t = Q, (Ml === null ? t.memoizedState : Ml.next) === null && (t = t.alternate, U.H = t === null || t.memoizedState === null ? Bv : pv), l;
  }
  function wn(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return Be(l);
      if (l.$$typeof === E) return;
      if (l.$$typeof === zl) return Kl(l);
    }
    throw Error(g(438, String(l)));
  }
  function Lc(l) {
    var t = null, u = Q.updateQueue;
    if (u !== null && (t = u.memoCache), t == null) {
      var a = Q.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
        data: a.data.map(function(e) {
          return e.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), u === null && (u = Jn(), Q.updateQueue = u), u.memoCache = t, u = t.data[t.index], u === void 0)
      for (u = t.data[t.index] = Array(l), a = 0; a < l; a++)
        u[a] = wu;
    return t.index++, u;
  }
  function ru(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function Fn(l) {
    var t = Ol();
    return Kc(t, ol, l);
  }
  function Kc(l, t, u) {
    var a = l.queue;
    if (a === null) throw Error(g(311));
    a.lastRenderedReducer = u;
    var e = l.baseQueue, n = a.pending;
    if (n !== null) {
      if (e !== null) {
        var f = e.next;
        e.next = n.next, n.next = f;
      }
      t.baseQueue = e = n, a.pending = null;
    }
    if (n = l.baseState, e === null) l.memoizedState = n;
    else {
      t = e.next;
      var c = f = null, i = null, r = t, h = !1;
      do {
        var T = r.lane & -536870913;
        if (T !== r.lane ? (w & T) === T : (mu & T) === T) {
          var s = r.revertLane;
          if (s === 0)
            i !== null && (i = i.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: r.action,
              hasEagerState: r.hasEagerState,
              eagerState: r.eagerState,
              next: null
            }), T === na && (h = !0);
          else if ((mu & s) === s) {
            r = r.next, s === na && (h = !0);
            continue;
          } else
            T = {
              lane: 0,
              revertLane: r.revertLane,
              gesture: null,
              action: r.action,
              hasEagerState: r.hasEagerState,
              eagerState: r.eagerState,
              next: null
            }, i === null ? (c = i = T, f = n) : i = i.next = T, Q.lanes |= s, Gu |= s;
          T = r.action, va && u(n, T), n = r.hasEagerState ? r.eagerState : u(n, T);
        } else
          s = {
            lane: T,
            revertLane: r.revertLane,
            gesture: r.gesture,
            action: r.action,
            hasEagerState: r.hasEagerState,
            eagerState: r.eagerState,
            next: null
          }, i === null ? (c = i = s, f = n) : i = i.next = s, Q.lanes |= T, Gu |= T;
        r = r.next;
      } while (r !== null && r !== t);
      if (i === null ? f = n : i.next = c, !St(n, l.memoizedState) && (Dl = !0, h && (u = Ba, u !== null)))
        throw u;
      l.memoizedState = n, l.baseState = f, l.baseQueue = i, a.lastRenderedState = n;
    }
    return e === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
  }
  function Jc(l) {
    var t = Ol(), u = t.queue;
    if (u === null) throw Error(g(311));
    u.lastRenderedReducer = l;
    var a = u.dispatch, e = u.pending, n = t.memoizedState;
    if (e !== null) {
      u.pending = null;
      var f = e = e.next;
      do
        n = l(n, f.action), f = f.next;
      while (f !== e);
      St(n, t.memoizedState) || (Dl = !0), t.memoizedState = n, t.baseQueue === null && (t.baseState = n), u.lastRenderedState = n;
    }
    return [n, a];
  }
  function tv(l, t, u) {
    var a = Q, e = Ol(), n = V;
    if (n) {
      if (u === void 0) throw Error(g(407));
      u = u();
    } else u = t();
    var f = !St(
      (ol || e).memoizedState,
      u
    );
    if (f && (e.memoizedState = u, Dl = !0), e = e.queue, Wc(ev.bind(null, a, e, l), [
      l
    ]), l = e.getSnapshot !== t || f || Ml !== null && (Ml.memoizedState.tag & 1) !== 0, Qa(
      l ? 9 : 8,
      { destroy: void 0 },
      av.bind(null, a, e, u, t),
      null
    ), l) {
      if (a.flags |= 2048, sl === null) throw Error(g(349));
      n || (mu & 127) !== 0 || uv(a, t, u);
    }
    return u;
  }
  function uv(l, t, u) {
    l.flags |= 16384, l = { getSnapshot: t, value: u }, t = Q.updateQueue, t === null ? (t = Jn(), Q.updateQueue = t, t.stores = [l]) : (u = t.stores, u === null ? t.stores = [l] : u.push(l));
  }
  function av(l, t, u, a) {
    t.value = u, t.getSnapshot = a, nv(t) && fv(l);
  }
  function ev(l, t, u) {
    return u(function() {
      nv(t) && fv(l);
    });
  }
  function nv(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var u = t();
      return !St(l, u);
    } catch {
      return !0;
    }
  }
  function fv(l) {
    var t = Pu(l, 2);
    t !== null && rt(t, l, 2);
  }
  function wc(l) {
    var t = nt();
    if (typeof l == "function") {
      var u = l;
      if (l = u(), va) {
        Tu(!0);
        try {
          u();
        } finally {
          Tu(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = l, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ru,
      lastRenderedState: l
    }, t;
  }
  function cv(l, t, u, a) {
    return l.baseState = u, Kc(
      l,
      ol,
      typeof a == "function" ? a : ru
    );
  }
  function Mr(l, t, u, a, e) {
    if (In(l)) throw Error(g(485));
    if (l = t.action, l !== null) {
      var n = {
        payload: e,
        action: l,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(f) {
          n.listeners.push(f);
        }
      };
      U.T !== null ? u(!0) : n.isTransition = !1, a(n), u = t.pending, u === null ? (n.next = t.pending = n, iv(t, n)) : (n.next = u.next, t.pending = u.next = n);
    }
  }
  function iv(l, t) {
    var u = t.action, a = t.payload, e = l.state;
    if (t.isTransition) {
      var n = U.T, f = {};
      f.types = n !== null ? n.types : null, U.T = f;
      try {
        var c = u(e, a), i = U.S;
        i !== null && i(f, c), ov(l, t, c);
      } catch (r) {
        Fc(l, t, r);
      } finally {
        n !== null && f.types !== null && (n.types = f.types), U.T = n;
      }
    } else
      try {
        n = u(e, a), ov(l, t, n);
      } catch (r) {
        Fc(l, t, r);
      }
  }
  function ov(l, t, u) {
    u !== null && typeof u == "object" && typeof u.then == "function" ? u.then(
      function(a) {
        vv(l, t, a);
      },
      function(a) {
        return Fc(l, t, a);
      }
    ) : vv(l, t, u);
  }
  function vv(l, t, u) {
    t.status = "fulfilled", t.value = u, sv(t), l.state = u, t = l.pending, t !== null && (u = t.next, u === t ? l.pending = null : (u = u.next, t.next = u, iv(l, u)));
  }
  function Fc(l, t, u) {
    var a = l.pending;
    if (l.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = u, sv(t), t = t.next;
      while (t !== a);
    }
    l.action = null;
  }
  function sv(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function mv(l, t) {
    return t;
  }
  function rv(l, t) {
    if (V) {
      var u = sl.formState;
      if (u !== null) {
        l: {
          var a = Q;
          if (V) {
            if (rl) {
              t: {
                for (var e = rl, n = Ct; e.nodeType !== 8; ) {
                  if (!n) {
                    e = null;
                    break t;
                  }
                  if (e = qt(
                    e.nextSibling
                  ), e === null) {
                    e = null;
                    break t;
                  }
                }
                n = e.data, e = n === "F!" || n === "F" ? e : null;
              }
              if (e) {
                rl = qt(
                  e.nextSibling
                ), a = e.data === "F!";
                break l;
              }
            }
            Au(a);
          }
          a = !1;
        }
        a && (t = u[0]);
      }
    }
    return u = nt(), u.memoizedState = u.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: mv,
      lastRenderedState: t
    }, u.queue = a, u = Hv.bind(
      null,
      Q,
      a
    ), a.dispatch = u, a = wc(!1), n = li.bind(
      null,
      Q,
      !1,
      a.queue
    ), a = nt(), e = {
      state: t,
      dispatch: null,
      action: l,
      pending: null
    }, a.queue = e, u = Mr.bind(
      null,
      Q,
      e,
      n,
      u
    ), e.dispatch = u, a.memoizedState = l, [t, u, !1];
  }
  function yv(l) {
    var t = Ol();
    return dv(t, ol, l);
  }
  function dv(l, t, u) {
    if (t = Kc(
      l,
      t,
      mv
    )[0], l = Fn(ru)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = Be(t);
      } catch (f) {
        throw f === pa ? xn : f;
      }
    else a = t;
    t = Ol();
    var e = t.queue, n = e.dispatch;
    return u !== t.memoizedState && (Q.flags |= 2048, Qa(
      9,
      { destroy: void 0 },
      Dr.bind(null, e, u),
      null
    )), [a, n, l];
  }
  function Dr(l, t) {
    l.action = t;
  }
  function hv(l) {
    var t = Ol(), u = ol;
    if (u !== null)
      return dv(t, u, l);
    Ol(), t = t.memoizedState, u = Ol();
    var a = u.queue.dispatch;
    return u.memoizedState = l, [t, a, !1];
  }
  function Qa(l, t, u, a) {
    return l = { tag: l, create: u, deps: a, inst: t, next: null }, t = Q.updateQueue, t === null && (t = Jn(), Q.updateQueue = t), u = t.lastEffect, u === null ? t.lastEffect = l.next = l : (a = u.next, u.next = l, l.next = a, t.lastEffect = l), l;
  }
  function gv() {
    return Ol().memoizedState;
  }
  function Wn(l, t, u, a) {
    var e = nt();
    Q.flags |= l, e.memoizedState = Qa(
      1 | t,
      { destroy: void 0 },
      u,
      a === void 0 ? null : a
    );
  }
  function $n(l, t, u, a) {
    var e = Ol();
    a = a === void 0 ? null : a;
    var n = e.memoizedState.inst;
    ol !== null && a !== null && Xc(a, ol.memoizedState.deps) ? e.memoizedState = Qa(t, n, u, a) : (Q.flags |= l, e.memoizedState = Qa(
      1 | t,
      n,
      u,
      a
    ));
  }
  function Sv(l, t) {
    Wn(8390656, 8, l, t);
  }
  function Wc(l, t) {
    $n(2048, 8, l, t);
  }
  function Ur(l) {
    Q.flags |= 4;
    var t = Q.updateQueue;
    if (t === null)
      t = Jn(), Q.updateQueue = t, t.events = [l];
    else {
      var u = t.events;
      u === null ? t.events = [l] : u.push(l);
    }
  }
  function _v(l) {
    var t = Ol().memoizedState;
    return Ur({ ref: t, nextImpl: l }), function() {
      if ((al & 2) !== 0) throw Error(g(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Tv(l, t) {
    return $n(4, 2, l, t);
  }
  function Ev(l, t) {
    return $n(4, 4, l, t);
  }
  function bv(l, t) {
    if (typeof t == "function") {
      l = l();
      var u = t(l);
      return function() {
        typeof u == "function" ? u() : t(null);
      };
    }
    if (t != null)
      return l = l(), t.current = l, function() {
        t.current = null;
      };
  }
  function zv(l, t, u) {
    u = u != null ? u.concat([l]) : null, $n(4, 4, bv.bind(null, t, l), u);
  }
  function $c() {
  }
  function Ov(l, t) {
    var u = Ol();
    t = t === void 0 ? null : t;
    var a = u.memoizedState;
    return t !== null && Xc(t, a[1]) ? a[0] : (u.memoizedState = [l, t], l);
  }
  function Av(l, t) {
    var u = Ol();
    t = t === void 0 ? null : t;
    var a = u.memoizedState;
    if (t !== null && Xc(t, a[1]))
      return a[0];
    if (a = l(), va) {
      Tu(!0);
      try {
        l();
      } finally {
        Tu(!1);
      }
    }
    return u.memoizedState = [a, t], a;
  }
  function Ic(l, t, u) {
    return u === void 0 || (mu & 1073741824) !== 0 && (w & 261930) === 0 ? l.memoizedState = t : (l.memoizedState = u, l = Bs(), Q.lanes |= l, Gu |= l, u);
  }
  function Nv(l, t, u, a) {
    return St(u, t) ? u : Cu.current !== null ? (l = Ic(l, u, a), St(l, t) || (Dl = !0), l) : (mu & 106) === 0 || (mu & 1073741824) !== 0 && (w & 261930) === 0 ? (Dl = !0, l.memoizedState = u) : (l = Bs(), Q.lanes |= l, Gu |= l, t);
  }
  function Mv(l, t, u, a, e) {
    var n = x.p;
    x.p = n !== 0 && 8 > n ? n : 8;
    var f = U.T, c = {};
    c.types = f !== null ? f.types : null, U.T = c, li(l, !1, t, u);
    try {
      var i = e(), r = U.S;
      if (r !== null && r(c, i), i !== null && typeof i == "object" && typeof i.then == "function") {
        var h = Or(
          i,
          a
        );
        pe(
          l,
          t,
          h,
          zt(l)
        );
      } else
        pe(
          l,
          t,
          a,
          zt(l)
        );
    } catch (T) {
      pe(
        l,
        t,
        { then: function() {
        }, status: "rejected", reason: T },
        zt()
      );
    } finally {
      x.p = n, f !== null && c.types !== null && (f.types = c.types), U.T = f;
    }
  }
  function Rr() {
  }
  function kc(l, t, u, a) {
    if (l.tag !== 5) throw Error(g(476));
    var e = Dv(l).queue;
    Mv(
      l,
      e,
      t,
      uu,
      u === null ? Rr : function() {
        return Uv(l), u(a);
      }
    );
  }
  function Dv(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: uu,
      baseState: uu,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ru,
        lastRenderedState: uu
      },
      next: null
    };
    var u = {};
    return t.next = {
      memoizedState: u,
      baseState: u,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ru,
        lastRenderedState: u
      },
      next: null
    }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
  }
  function Uv(l) {
    var t = Dv(l);
    t.next === null && (t = l.alternate.memoizedState), pe(
      l,
      t.next.queue,
      {},
      zt()
    );
  }
  function Pc() {
    return Kl(ne);
  }
  function Rv() {
    return Ol().memoizedState;
  }
  function Cv() {
    return Ol().memoizedState;
  }
  function Cr(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var u = zt();
          l = Uu(u);
          var a = Ru(t, l, u);
          a !== null && (rt(a, t, u), Re(a, t, u)), t = { cache: Mc() }, l.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Hr(l, t, u) {
    var a = zt();
    u = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: u,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, In(l) ? qv(t, u) : (u = Sc(l, t, u, a), u !== null && (rt(u, l, a), Yv(u, t, a)));
  }
  function Hv(l, t, u) {
    var a = zt();
    pe(l, t, u, a);
  }
  function pe(l, t, u, a) {
    var e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: u,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (In(l)) qv(t, e);
    else {
      var n = l.alternate;
      if (l.lanes === 0 && (n === null || n.lanes === 0) && (n = t.lastRenderedReducer, n !== null))
        try {
          var f = t.lastRenderedState, c = n(f, u);
          if (e.hasEagerState = !0, e.eagerState = c, St(c, f))
            return Dn(l, t, e, 0), sl === null && Mn(), !1;
        } catch {
        }
      if (u = Sc(l, t, e, a), u !== null)
        return rt(u, l, a), Yv(u, t, a), !0;
    }
    return !1;
  }
  function li(l, t, u, a) {
    if (a = {
      lane: 2,
      revertLane: Li(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, In(l)) {
      if (t) throw Error(g(479));
    } else
      t = Sc(
        l,
        u,
        a,
        2
      ), t !== null && rt(t, l, 2);
  }
  function In(l) {
    var t = l.alternate;
    return l === Q || t !== null && t === Q;
  }
  function qv(l, t) {
    xa = Ln = !0;
    var u = l.pending;
    u === null ? t.next = t : (t.next = u.next, u.next = t), l.pending = t;
  }
  function Yv(l, t, u) {
    if ((u & 4194048) !== 0) {
      var a = t.lanes;
      a &= l.pendingLanes, u |= a, t.lanes = u, Y0(l, u);
    }
  }
  var kn = {
    readContext: Kl,
    use: wn,
    useCallback: Tl,
    useContext: Tl,
    useEffect: Tl,
    useImperativeHandle: Tl,
    useLayoutEffect: Tl,
    useInsertionEffect: Tl,
    useMemo: Tl,
    useReducer: Tl,
    useRef: Tl,
    useState: Tl,
    useDebugValue: Tl,
    useDeferredValue: Tl,
    useTransition: Tl,
    useSyncExternalStore: Tl,
    useId: Tl,
    useHostTransitionStatus: Tl,
    useFormState: Tl,
    useActionState: Tl,
    useOptimistic: Tl,
    useMemoCache: Tl,
    useCacheRefresh: Tl,
    useEffectEvent: Tl
  }, Bv = {
    readContext: Kl,
    use: wn,
    useCallback: function(l, t) {
      return nt().memoizedState = [
        l,
        t === void 0 ? null : t
      ], l;
    },
    useContext: Kl,
    useEffect: Sv,
    useImperativeHandle: function(l, t, u) {
      u = u != null ? u.concat([l]) : null, Wn(
        4194308,
        4,
        bv.bind(null, t, l),
        u
      );
    },
    useLayoutEffect: function(l, t) {
      return Wn(4194308, 4, l, t);
    },
    useInsertionEffect: function(l, t) {
      Wn(4, 2, l, t);
    },
    useMemo: function(l, t) {
      var u = nt();
      t = t === void 0 ? null : t;
      var a = l();
      if (va) {
        Tu(!0);
        try {
          l();
        } finally {
          Tu(!1);
        }
      }
      return u.memoizedState = [a, t], a;
    },
    useReducer: function(l, t, u) {
      var a = nt();
      if (u !== void 0) {
        var e = u(t);
        if (va) {
          Tu(!0);
          try {
            u(t);
          } finally {
            Tu(!1);
          }
        }
      } else e = t;
      return a.memoizedState = a.baseState = e, l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: e
      }, a.queue = l, l = l.dispatch = Hr.bind(
        null,
        Q,
        l
      ), [a.memoizedState, l];
    },
    useRef: function(l) {
      var t = nt();
      return l = { current: l }, t.memoizedState = l;
    },
    useState: function(l) {
      l = wc(l);
      var t = l.queue, u = Hv.bind(null, Q, t);
      return t.dispatch = u, [l.memoizedState, u];
    },
    useDebugValue: $c,
    useDeferredValue: function(l, t) {
      var u = nt();
      return Ic(u, l, t);
    },
    useTransition: function() {
      var l = wc(!1);
      return l = Mv.bind(
        null,
        Q,
        l.queue,
        !0,
        !1
      ), nt().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, t, u) {
      var a = Q, e = nt();
      if (V) {
        if (u === void 0)
          throw Error(g(407));
        u = u();
      } else {
        if (u = t(), sl === null)
          throw Error(g(349));
        (w & 127) !== 0 || uv(a, t, u);
      }
      e.memoizedState = u;
      var n = { value: u, getSnapshot: t };
      return e.queue = n, Sv(ev.bind(null, a, n, l), [
        l
      ]), a.flags |= 2048, Qa(
        9,
        { destroy: void 0 },
        av.bind(
          null,
          a,
          n,
          u,
          t
        ),
        null
      ), u;
    },
    useId: function() {
      var l = nt(), t = sl.identifierPrefix;
      if (V) {
        var u = wt, a = Jt;
        u = (a & ~(1 << 32 - ht(a) - 1)).toString(32) + u, t = "_" + t + "R_" + u, u = Kn++, 0 < u && (t += "H" + u.toString(32)), t += "_";
      } else
        u = Ar++, t = "_" + t + "r_" + u.toString(32) + "_";
      return l.memoizedState = t;
    },
    useHostTransitionStatus: Pc,
    useFormState: rv,
    useActionState: rv,
    useOptimistic: function(l) {
      var t = nt();
      t.memoizedState = t.baseState = l;
      var u = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = u, t = li.bind(
        null,
        Q,
        !0,
        u
      ), u.dispatch = t, [l, t];
    },
    useMemoCache: Lc,
    useCacheRefresh: function() {
      return nt().memoizedState = Cr.bind(
        null,
        Q
      );
    },
    useEffectEvent: function(l) {
      var t = nt(), u = { impl: l };
      return t.memoizedState = u, function() {
        if ((al & 2) !== 0)
          throw Error(g(440));
        return u.impl.apply(void 0, arguments);
      };
    }
  }, pv = {
    readContext: Kl,
    use: wn,
    useCallback: Ov,
    useContext: Kl,
    useEffect: Wc,
    useImperativeHandle: zv,
    useInsertionEffect: Tv,
    useLayoutEffect: Ev,
    useMemo: Av,
    useReducer: Fn,
    useRef: gv,
    useState: function() {
      return Fn(ru);
    },
    useDebugValue: $c,
    useDeferredValue: function(l, t) {
      var u = Ol();
      return Nv(
        u,
        ol.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = Fn(ru)[0], t = Ol().memoizedState;
      return [
        typeof l == "boolean" ? l : Be(l),
        t
      ];
    },
    useSyncExternalStore: tv,
    useId: Rv,
    useHostTransitionStatus: Pc,
    useFormState: yv,
    useActionState: yv,
    useOptimistic: function(l, t) {
      var u = Ol();
      return cv(u, ol, l, t);
    },
    useMemoCache: Lc,
    useCacheRefresh: Cv,
    useEffectEvent: _v
  }, qr = {
    readContext: Kl,
    use: wn,
    useCallback: Ov,
    useContext: Kl,
    useEffect: Wc,
    useImperativeHandle: zv,
    useInsertionEffect: Tv,
    useLayoutEffect: Ev,
    useMemo: Av,
    useReducer: Jc,
    useRef: gv,
    useState: function() {
      return Jc(ru);
    },
    useDebugValue: $c,
    useDeferredValue: function(l, t) {
      var u = Ol();
      return ol === null ? Ic(u, l, t) : Nv(
        u,
        ol.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = Jc(ru)[0], t = Ol().memoizedState;
      return [
        typeof l == "boolean" ? l : Be(l),
        t
      ];
    },
    useSyncExternalStore: tv,
    useId: Rv,
    useHostTransitionStatus: Pc,
    useFormState: hv,
    useActionState: hv,
    useOptimistic: function(l, t) {
      var u = Ol();
      return ol !== null ? cv(u, ol, l, t) : (u.baseState = l, [l, u.queue.dispatch]);
    },
    useMemoCache: Lc,
    useCacheRefresh: Cv,
    useEffectEvent: _v
  };
  function ti(l, t, u, a) {
    t = l.memoizedState, u = u(a, t), u = u == null ? t : Z({}, t, u), l.memoizedState = u, l.lanes === 0 && (l.updateQueue.baseState = u);
  }
  var ui = {
    enqueueSetState: function(l, t, u) {
      l = l._reactInternals;
      var a = zt(), e = Uu(a);
      e.payload = t, u != null && (e.callback = u), t = Ru(l, e, a), t !== null && (rt(t, l, a), Re(t, l, a));
    },
    enqueueReplaceState: function(l, t, u) {
      l = l._reactInternals;
      var a = zt(), e = Uu(a);
      e.tag = 1, e.payload = t, u != null && (e.callback = u), t = Ru(l, e, a), t !== null && (rt(t, l, a), Re(t, l, a));
    },
    enqueueForceUpdate: function(l, t) {
      l = l._reactInternals;
      var u = zt(), a = Uu(u);
      a.tag = 2, t != null && (a.callback = t), t = Ru(l, a, u), t !== null && (rt(t, l, u), Re(t, l, u));
    }
  };
  function Gv(l, t, u, a, e, n, f) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(a, n, f) : t.prototype && t.prototype.isPureReactComponent ? !be(u, a) || !be(e, n) : !0;
  }
  function xv(l, t, u, a) {
    l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(u, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(u, a), t.state !== l && ui.enqueueReplaceState(t, t.state, null);
  }
  function sa(l, t) {
    var u = t;
    if ("ref" in t) {
      u = {};
      for (var a in t)
        a !== "ref" && (u[a] = t[a]);
    }
    if (l = l.defaultProps) {
      u === t && (u = Z({}, u));
      for (var e in l)
        u[e] === void 0 && (u[e] = l[e]);
    }
    return u;
  }
  function Xv(l) {
    Nn(l);
  }
  function Qv(l) {
    console.error(l);
  }
  function jv(l) {
    Nn(l);
  }
  function Pn(l, t) {
    try {
      var u = l.onUncaughtError;
      u(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Zv(l, t, u) {
    try {
      var a = l.onCaughtError;
      a(u.value, {
        componentStack: u.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (e) {
      setTimeout(function() {
        throw e;
      });
    }
  }
  function ai(l, t, u) {
    return u = Uu(u), u.tag = 3, u.payload = { element: null }, u.callback = function() {
      Pn(l, t);
    }, u;
  }
  function Vv(l) {
    return l = Uu(l), l.tag = 3, l;
  }
  function Lv(l, t, u, a) {
    var e = u.type.getDerivedStateFromError;
    if (typeof e == "function") {
      var n = a.value;
      l.payload = function() {
        return e(n);
      }, l.callback = function() {
        Zv(t, u, a);
      };
    }
    var f = u.stateNode;
    f !== null && typeof f.componentDidCatch == "function" && (l.callback = function() {
      Zv(t, u, a), typeof e != "function" && (xu === null ? xu = /* @__PURE__ */ new Set([this]) : xu.add(this));
      var c = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: c !== null ? c : ""
      });
    });
  }
  function Yr(l, t, u, a, e) {
    if (u.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = u.alternate, t !== null && aa(
        t,
        u,
        e,
        !0
      ), u = Jl.current, u !== null) {
        switch (u.tag) {
          case 31:
          case 13:
          case 19:
            return Pl === null ? Ef() : u.alternate === null && El === 0 && (El = 3), u.flags &= -257, u.flags |= 65536, u.lanes = e, a === Xn ? u.flags |= 16384 : (t = u.updateQueue, t === null ? u.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), ji(l, a, e)), !1;
          case 22:
            return u.flags |= 65536, a === Xn ? u.flags |= 16384 : (t = u.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, u.updateQueue = t) : (u = t.retryQueue, u === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : u.add(a)), ji(l, a, e)), !1;
        }
        throw Error(g(435, u.tag));
      }
      return ji(l, a, e), Ef(), !1;
    }
    if (V)
      return t = Jl.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = e, a !== zc && (l = Error(g(422), { cause: a }), Ae(Dt(l, u)))) : (a !== zc && (t = Error(g(423), {
        cause: a
      }), Ae(
        Dt(t, u)
      )), l = l.current.alternate, l.flags |= 65536, e &= -e, l.lanes |= e, a = Dt(a, u), e = ai(
        l.stateNode,
        a,
        e
      ), qc(l, e), El !== 4 && (El = 2)), !1;
    var n = Error(g(520), { cause: a });
    if (n = Dt(n, u), Le === null ? Le = [n] : Le.push(n), El !== 4 && (El = 2), t === null) return !0;
    a = Dt(a, u), u = t;
    do {
      switch (u.tag) {
        case 3:
          return u.flags |= 65536, l = e & -e, u.lanes |= l, l = ai(u.stateNode, a, l), qc(u, l), !1;
        case 1:
          if (t = u.type, n = u.stateNode, (u.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (xu === null || !xu.has(n))))
            return u.flags |= 65536, e &= -e, u.lanes |= e, e = Vv(e), Lv(
              e,
              l,
              u,
              a
            ), qc(u, e), !1;
          break;
        case 22:
          if (u.memoizedState !== null)
            return u.flags |= 65536, !1;
      }
      u = u.return;
    } while (u !== null);
    return !1;
  }
  var ei = Error(g(461)), Dl = !1;
  function Cl(l, t, u, a) {
    t.child = l === null ? Fo(t, null, u, a) : oa(
      t,
      l.child,
      u,
      a
    );
  }
  function Kv(l, t, u, a, e) {
    u = u.render;
    var n = t.ref;
    if ("ref" in a) {
      var f = {};
      for (var c in a)
        c !== "ref" && (f[c] = a[c]);
    } else f = a;
    return ea(t), a = Qc(
      l,
      t,
      u,
      f,
      n,
      e
    ), c = jc(), l !== null && !Dl ? (Zc(l, t, e), yu(l, t, e)) : (V && c && Hn(t), t.flags |= 1, Cl(l, t, a, e), t.child);
  }
  function Jv(l, t, u, a, e) {
    if (l === null) {
      var n = u.type;
      return typeof n == "function" && !_c(n) && n.defaultProps === void 0 && u.compare === null ? (t.tag = 15, t.type = n, wv(
        l,
        t,
        n,
        a,
        e
      )) : (l = Rn(
        u.type,
        null,
        a,
        t,
        t.mode,
        e
      ), l.ref = t.ref, l.return = t, t.child = l);
    }
    if (n = l.child, !mi(l, e)) {
      var f = n.memoizedProps;
      if (u = u.compare, u = u !== null ? u : be, u(f, a) && l.ref === t.ref)
        return yu(l, t, e);
    }
    return t.flags |= 1, l = iu(n, a), l.ref = t.ref, l.return = t, t.child = l;
  }
  function wv(l, t, u, a, e) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (be(n, a) && l.ref === t.ref)
        if (Dl = !1, t.pendingProps = a = n, mi(l, e))
          (l.flags & 131072) !== 0 && (Dl = !0);
        else
          return t.lanes = l.lanes, yu(l, t, e);
    }
    return ni(
      l,
      t,
      u,
      a,
      e
    );
  }
  function Fv(l, t, u, a) {
    var e = a.children, n = l !== null ? l.memoizedState : null;
    if (l === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (n = n !== null ? n.baseLanes | u : u, l !== null) {
          for (a = t.child = l.child, e = 0; a !== null; )
            e = e | a.lanes | a.childLanes, a = a.sibling;
          a = e & ~n;
        } else a = 0, t.child = null;
        return Wv(
          l,
          t,
          n,
          u,
          a
        );
      }
      if ((u & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && Gn(
          t,
          n !== null ? n.cachePool : null
        ), n !== null ? Io(t, n) : Bc(), ko(t);
      else
        return a = t.lanes = 536870912, Wv(
          l,
          t,
          n !== null ? n.baseLanes | u : u,
          u,
          a
        );
    } else
      n !== null ? (Gn(t, n.cachePool), Io(t, n), qu(), t.memoizedState = null) : (l !== null && Gn(t, null), Bc(), qu());
    return Cl(l, t, e, u), t.child;
  }
  function Ge(l, t) {
    return l !== null && l.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Wv(l, t, u, a, e) {
    var n = Uc();
    return n = n === null ? null : { parent: Nl._currentValue, pool: n }, t.memoizedState = {
      baseLanes: u,
      cachePool: n
    }, l !== null && Gn(t, null), Bc(), ko(t), l !== null && aa(l, t, a, !0), t.childLanes = e, null;
  }
  function lf(l, t) {
    return t = tf(
      { mode: t.mode, children: t.children },
      l.mode
    ), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function $v(l, t, u) {
    return oa(t, l.child, null, u), l = lf(t, t.pendingProps), l.flags |= 2, _t(t), t.memoizedState = null, l;
  }
  function Br(l, t, u) {
    var a = t.pendingProps, e = (t.flags & 128) !== 0;
    if (t.flags &= -129, l === null) {
      if (V) {
        if (a.mode === "hidden")
          return l = lf(t, a), t.lanes = 536870912, l.memoizedState = { baseLanes: 0, cachePool: null }, Ge(null, l);
        if (Gc(t), (l = rl) ? (l = bm(
          l,
          Ct
        ), l = l !== null && l.data === "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: zu !== null ? { id: Jt, overflow: wt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, u = qo(l), u.return = t, t.child = u, pl = t, rl = null)) : l = null, l === null) throw Au(t);
        return t.lanes = 536870912, null;
      }
      return lf(t, a);
    }
    var n = l.memoizedState;
    if (n !== null) {
      var f = n.dehydrated;
      if (Gc(t), e)
        if (t.flags & 256)
          t.flags &= -257, t = $v(
            l,
            t,
            u
          );
        else if (t.memoizedState !== null)
          t.child = l.child, t.flags |= 128, t = null;
        else throw Error(g(558));
      else if (Dl || aa(l, t, u, !1), e = (u & l.childLanes) !== 0, Dl || e) {
        if (Cu.current === null) {
          if (a = sl, a !== null && (f = B0(a, u), f !== 0 && f !== n.retryLane))
            throw n.retryLane = f, Pu(l, f), rt(a, l, f), ei;
          Ef();
        }
        t = $v(
          l,
          t,
          u
        );
      } else
        l = n.treeContext, rl = qt(f.nextSibling), pl = t, V = !0, Ou = null, Ct = !1, l !== null && po(t, l), t = lf(t, a), t.flags |= 134221824;
      return t;
    }
    return l = iu(l.child, {
      mode: a.mode,
      children: a.children
    }), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function ja(l, t) {
    var u = t.ref;
    if (u === null)
      l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof u != "function" && typeof u != "object")
        throw Error(g(284));
      (l === null || l.ref !== u) && (t.flags |= 4194816);
    }
  }
  function ni(l, t, u, a, e) {
    return ea(t), u = Qc(
      l,
      t,
      u,
      a,
      void 0,
      e
    ), a = jc(), l !== null && !Dl ? (Zc(l, t, e), yu(l, t, e)) : (V && a && Hn(t), t.flags |= 1, Cl(l, t, u, e), t.child);
  }
  function Iv(l, t, u, a, e, n) {
    return ea(t), t.updateQueue = null, u = lv(
      t,
      a,
      u,
      e
    ), Po(l), a = jc(), l !== null && !Dl ? (Zc(l, t, n), yu(l, t, n)) : (V && a && Hn(t), t.flags |= 1, Cl(l, t, u, n), t.child);
  }
  function kv(l, t, u, a, e) {
    if (ea(t), t.stateNode === null) {
      var n = Ca, f = u.contextType;
      typeof f == "object" && f !== null && (n = Kl(f)), n = new u(a, n), t.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = ui, t.stateNode = n, n._reactInternals = t, n = t.stateNode, n.props = a, n.state = t.memoizedState, n.refs = {}, Cc(t), f = u.contextType, n.context = typeof f == "object" && f !== null ? Kl(f) : Ca, n.state = t.memoizedState, f = u.getDerivedStateFromProps, typeof f == "function" && (ti(
        t,
        u,
        f,
        a
      ), n.state = t.memoizedState), typeof u.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (f = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), f !== n.state && ui.enqueueReplaceState(n, n.state, null), He(t, a, n, e), Ce(), n.state = t.memoizedState), typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (l === null) {
      n = t.stateNode;
      var c = t.memoizedProps, i = sa(u, c);
      n.props = i;
      var r = n.context, h = u.contextType;
      f = Ca, typeof h == "object" && h !== null && (f = Kl(h));
      var T = u.getDerivedStateFromProps;
      h = typeof T == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = t.pendingProps !== c, h || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || r !== f) && xv(
        t,
        n,
        a,
        f
      ), Du = !1;
      var s = t.memoizedState;
      n.state = s, He(t, a, n, e), Ce(), r = t.memoizedState, c || s !== r || Du ? (typeof T == "function" && (ti(
        t,
        u,
        T,
        a
      ), r = t.memoizedState), (i = Du || Gv(
        t,
        u,
        i,
        a,
        s,
        r,
        f
      )) ? (h || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = r), n.props = a, n.state = r, n.context = f, a = i) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      n = t.stateNode, Hc(l, t), f = t.memoizedProps, h = sa(u, f), n.props = h, T = t.pendingProps, s = n.context, r = u.contextType, i = Ca, typeof r == "object" && r !== null && (i = Kl(r)), c = u.getDerivedStateFromProps, (r = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (f !== T || s !== i) && xv(
        t,
        n,
        a,
        i
      ), Du = !1, s = t.memoizedState, n.state = s, He(t, a, n, e), Ce();
      var d = t.memoizedState;
      f !== T || s !== d || Du || l !== null && l.dependencies !== null && Bn(l.dependencies) ? (typeof c == "function" && (ti(
        t,
        u,
        c,
        a
      ), d = t.memoizedState), (h = Du || Gv(
        t,
        u,
        h,
        a,
        s,
        d,
        i
      ) || l !== null && l.dependencies !== null && Bn(l.dependencies)) ? (r || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(a, d, i), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
        a,
        d,
        i
      )), typeof n.componentDidUpdate == "function" && (t.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || f === l.memoizedProps && s === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || f === l.memoizedProps && s === l.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = d), n.props = a, n.state = d, n.context = i, a = h) : (typeof n.componentDidUpdate != "function" || f === l.memoizedProps && s === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || f === l.memoizedProps && s === l.memoizedState || (t.flags |= 1024), a = !1);
    }
    return n = a, ja(l, t), a = (t.flags & 128) !== 0, n || a ? (n = t.stateNode, u = a && typeof u.getDerivedStateFromError != "function" ? null : n.render(), t.flags |= 1, l !== null && a ? (t.child = oa(
      t,
      l.child,
      null,
      e
    ), t.child = oa(
      t,
      null,
      u,
      e
    )) : Cl(l, t, u, e), t.memoizedState = n.state, l = t.child) : l = yu(
      l,
      t,
      e
    ), l;
  }
  function Pv(l, t, u, a) {
    return ta(), t.flags |= 256, Cl(l, t, u, a), t.child;
  }
  var fi = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function ci(l) {
    return { baseLanes: l, cachePool: Zo() };
  }
  function ii(l, t, u) {
    return l = l !== null ? l.childLanes & ~u : 0, t && (l |= bt), l;
  }
  function ls(l, t, u) {
    var a = t.pendingProps, e = !1, n = (t.flags & 128) !== 0, f;
    if ((f = n) || (f = l !== null && l.memoizedState === null ? !1 : (wl.current & 2) !== 0), f && (e = !0, t.flags &= -129), f = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
      if (V) {
        if (e ? Hu(t) : qu(), (l = rl) ? (l = bm(
          l,
          Ct
        ), l = l !== null && l.data !== "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: zu !== null ? { id: Jt, overflow: wt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, u = qo(l), u.return = t, t.child = u, pl = t, rl = null)) : l = null, l === null) throw Au(t);
        return c0(l) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      return n = a.children, a = a.fallback, e ? (qu(), e = t.mode, n = tf(
        { mode: "hidden", children: n },
        e
      ), a = la(
        a,
        e,
        u,
        null
      ), n.return = t, a.return = t, n.sibling = a, t.child = n, a = t.child, a.memoizedState = ci(u), a.childLanes = ii(
        l,
        f,
        u
      ), t.memoizedState = fi, Ge(null, a)) : (Hu(t), oi(t, n));
    }
    var c = l.memoizedState;
    if (c !== null) {
      var i = c.dehydrated;
      if (i !== null)
        return pr(
          l,
          t,
          n,
          f,
          a,
          i,
          c,
          u
        );
    }
    return e ? (qu(), e = a.fallback, n = t.mode, c = l.child, i = c.sibling, a = iu(c, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = c.subtreeFlags & 1206910976, i !== null ? e = iu(i, e) : (e = la(
      e,
      n,
      u,
      null
    ), e.flags |= 2), e.return = t, a.return = t, a.sibling = e, t.child = a, Ge(null, a), a = t.child, e = l.child.memoizedState, e === null ? e = ci(u) : (n = e.cachePool, n !== null ? (c = Nl._currentValue, n = n.parent !== c ? { parent: c, pool: c } : n) : n = Zo(), e = {
      baseLanes: e.baseLanes | u,
      cachePool: n
    }), a.memoizedState = e, a.childLanes = ii(
      l,
      f,
      u
    ), t.memoizedState = fi, Ge(l.child, a)) : (Hu(t), u = l.child, l = u.sibling, u = iu(u, {
      mode: "visible",
      children: a.children
    }), u.return = t, u.sibling = null, l !== null && (f = t.deletions, f === null ? (t.deletions = [l], t.flags |= 16) : f.push(l)), t.child = u, t.memoizedState = null, u);
  }
  function oi(l, t) {
    return t = tf(
      { mode: "visible", children: t },
      l.mode
    ), t.return = l, l.child = t;
  }
  function tf(l, t) {
    return l = ot(22, l, null, t), l.lanes = 0, l;
  }
  function uf(l, t, u) {
    return oa(t, l.child, null, u), l = oi(
      t,
      t.pendingProps.children
    ), l.flags |= 2, t.memoizedState = null, l;
  }
  function pr(l, t, u, a, e, n, f, c) {
    if (u)
      return t.flags & 256 ? (Hu(t), t.flags &= -257, uf(
        l,
        t,
        c
      )) : t.memoizedState !== null ? (qu(), t.child = l.child, t.flags |= 128, null) : (qu(), n = e.fallback, f = t.mode, e = tf(
        { mode: "visible", children: e.children },
        f
      ), n = la(
        n,
        f,
        c,
        null
      ), n.flags |= 2, e.return = t, n.return = t, e.sibling = n, t.child = e, oa(t, l.child, null, c), e = t.child, e.memoizedState = ci(c), e.childLanes = ii(
        l,
        a,
        c
      ), t.memoizedState = fi, Ge(null, e));
    if (Hu(t), c0(n)) {
      if (a = n.nextSibling && n.nextSibling.dataset, a) var i = a.dgst;
      return a = i, a !== "" && (e = Error(g(419)), e.stack = "", e.digest = a, Ae({ value: e, source: null, stack: null })), uf(
        l,
        t,
        c
      );
    }
    if (Dl || aa(l, t, c, !1), a = (c & l.childLanes) !== 0, Dl || a) {
      if (Cu.current !== null)
        return uf(
          l,
          t,
          c
        );
      if (a = sl, a !== null && (e = B0(
        a,
        c
      ), e !== 0 && e !== f.retryLane))
        throw f.retryLane = e, Pu(l, e), rt(a, l, e), ei;
      return f0(n) || Ef(), uf(
        l,
        t,
        c
      );
    }
    return f0(n) ? (t.flags |= 192, t.child = l.child, null) : (l = f.treeContext, rl = qt(n.nextSibling), pl = t, V = !0, Ou = null, Ct = !1, l !== null && po(t, l), t = oi(
      t,
      e.children
    ), t.flags |= 134221824, t);
  }
  function ts(l, t, u) {
    l.lanes |= t;
    var a = l.alternate;
    a !== null && (a.lanes |= t), Yn(l.return, t, u);
  }
  function us(l) {
    for (var t = null; l !== null; ) {
      var u = l.alternate;
      u !== null && Vn(u) === null && (t = l), l = l.sibling;
    }
    return t;
  }
  function af(l, t, u, a, e, n) {
    var f = l.memoizedState;
    f === null ? l.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: u,
      tailMode: e,
      treeForkCount: n
    } : (f.isBackwards = t, f.rendering = null, f.renderingStartTime = 0, f.last = a, f.tail = u, f.tailMode = e, f.treeForkCount = n);
  }
  function vi(l) {
    var t = l.child;
    for (l.child = null; t !== null; ) {
      var u = t.sibling;
      t.sibling = l.child, l.child = t, t = u;
    }
  }
  function si(l, t, u) {
    var a = t.pendingProps, e = a.revealOrder, n = a.tail;
    a = a.children;
    var f = wl.current;
    if (t.flags & 128)
      return qe(t, f), null;
    var c = (f & 2) !== 0;
    if (c ? (f = f & 1 | 2, t.flags |= 128) : f &= 1, qe(t, f), e === "backwards" && l !== null ? (vi(l), Cl(l, t, a, u), vi(l)) : Cl(l, t, a, u), a = V ? Oe : 0, !c && l !== null && (l.flags & 128) !== 0)
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && ts(l, u, t);
        else if (l.tag === 19)
          ts(l, u, t);
        else if (l.child !== null) {
          l.child.return = l, l = l.child;
          continue;
        }
        if (l === t) break l;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t)
            break l;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    switch (e) {
      case "backwards":
        u = us(t.child), u === null ? (e = t.child, t.child = null) : (e = u.sibling, u.sibling = null, vi(t)), af(
          t,
          !0,
          e,
          null,
          n,
          a
        );
        break;
      case "unstable_legacy-backwards":
        for (u = null, e = t.child, t.child = null; e !== null; ) {
          if (l = e.alternate, l !== null && Vn(l) === null) {
            t.child = e;
            break;
          }
          l = e.sibling, e.sibling = u, u = e, e = l;
        }
        af(
          t,
          !0,
          u,
          null,
          n,
          a
        );
        break;
      case "together":
        af(
          t,
          !1,
          null,
          null,
          void 0,
          a
        );
        break;
      case "independent":
        t.memoizedState = null;
        break;
      default:
        u = us(t.child), u === null ? (e = t.child, t.child = null) : (e = u.sibling, u.sibling = null), af(
          t,
          !1,
          e,
          u,
          n,
          a
        );
    }
    return t.child;
  }
  function as(l, t, u) {
    var a = t.pendingProps;
    return Nu(t, t.type, a.value), Cl(l, t, a.children, u), t.child;
  }
  function yu(l, t, u) {
    if (l !== null && (t.dependencies = l.dependencies), Gu |= t.lanes, (u & t.childLanes) === 0)
      if (l !== null) {
        if (aa(
          l,
          t,
          u,
          !1
        ), (u & t.childLanes) === 0)
          return null;
      } else return null;
    if (l !== null && t.child !== l.child)
      throw Error(g(153));
    if (t.child !== null) {
      for (l = t.child, u = iu(l, l.pendingProps), t.child = u, u.return = t; l.sibling !== null; )
        l = l.sibling, u = u.sibling = iu(l, l.pendingProps), u.return = t;
      u.sibling = null;
    }
    return t.child;
  }
  function mi(l, t) {
    return (l.lanes & t) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && Bn(l)));
  }
  function Gr(l, t, u) {
    switch (t.tag) {
      case 3:
        cn(t, t.stateNode.containerInfo), Nu(t, Nl, l.memoizedState.cache), ta();
        break;
      case 27:
      case 5:
        Xf(t);
        break;
      case 4:
        cn(t, t.stateNode.containerInfo);
        break;
      case 10:
        Nu(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Gc(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null) {
          if (a.dehydrated !== null)
            return Hu(t), t.flags |= 128, null;
          a = aa(
            l,
            t,
            u,
            !1
          );
          var e = t.child.childLanes;
          return a || (u & e) !== 0 ? ls(l, t, u) : (Hu(t), l = yu(
            l,
            t,
            u
          ), l !== null ? l.sibling : null);
        }
        Hu(t);
        break;
      case 19:
        if (t.flags & 128)
          return si(
            l,
            t,
            u
          );
        if (e = (l.flags & 128) !== 0, a = (u & t.childLanes) !== 0, a || (aa(
          l,
          t,
          u,
          !1
        ), a = (u & t.childLanes) !== 0), e) {
          if (a)
            return si(
              l,
              t,
              u
            );
          t.flags |= 128;
        }
        if (e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null, e.lastEffect = null), qe(t, wl.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, Fv(
          l,
          t,
          u,
          t.pendingProps
        );
      case 24:
        Nu(t, Nl, l.memoizedState.cache);
    }
    return yu(l, t, u);
  }
  function es(l, t, u) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps)
        Dl = !0;
      else {
        if (!mi(l, u) && (t.flags & 128) === 0)
          return Dl = !1, Gr(
            l,
            t,
            u
          );
        Dl = (l.flags & 131072) !== 0;
      }
    else
      Dl = !1, V && (t.flags & 1048576) !== 0 && Bo(t, Oe, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (l = ca(t.elementType), t.type = l, typeof l == "function")
            _c(l) ? (a = sa(l, a), t.tag = 1, t = kv(
              null,
              t,
              l,
              a,
              u
            )) : (t.tag = 0, t = ni(
              null,
              t,
              l,
              a,
              u
            ));
          else {
            if (l != null) {
              var e = l.$$typeof;
              if (e === z) {
                t.tag = 11, t = Kv(
                  null,
                  t,
                  l,
                  a,
                  u
                );
                break l;
              } else if (e === L) {
                t.tag = 14, t = Jv(
                  null,
                  t,
                  l,
                  a,
                  u
                );
                break l;
              } else if (e === zl) {
                t.tag = 10, t.type = l, t = as(
                  null,
                  t,
                  u
                );
                break l;
              }
            }
            throw t = P(l) || l, Error(g(306, t, ""));
          }
        }
        return t;
      case 0:
        return ni(
          l,
          t,
          t.type,
          t.pendingProps,
          u
        );
      case 1:
        return a = t.type, e = sa(
          a,
          t.pendingProps
        ), kv(
          l,
          t,
          a,
          e,
          u
        );
      case 3:
        l: {
          if (cn(
            t,
            t.stateNode.containerInfo
          ), l === null) throw Error(g(387));
          a = t.pendingProps;
          var n = t.memoizedState;
          e = n.element, Hc(l, t), He(t, a, null, u);
          var f = t.memoizedState;
          if (a = f.cache, Nu(t, Nl, a), a !== n.cache && Nc(
            t,
            [Nl],
            u,
            !0
          ), Ce(), a = f.element, n.isDehydrated)
            if (n = {
              element: a,
              isDehydrated: !1,
              cache: f.cache
            }, t.updateQueue.baseState = n, t.memoizedState = n, t.flags & 256) {
              t = Pv(
                l,
                t,
                a,
                u
              );
              break l;
            } else if (a !== e) {
              e = Dt(
                Error(g(424)),
                t
              ), Ae(e), t = Pv(
                l,
                t,
                a,
                u
              );
              break l;
            } else
              for (l = t.stateNode.containerInfo, l.nodeType === 9 ? l = l.body : l = l.nodeName === "HTML" ? l.ownerDocument.body : l, rl = qt(l.firstChild), pl = t, V = !0, Ou = null, Ct = !0, u = Fo(
                t,
                null,
                a,
                u
              ), t.child = u; u; )
                u.flags = u.flags & -3 | 134221824, u = u.sibling;
          else {
            if (ta(), a === e) {
              t = yu(
                l,
                t,
                u
              );
              break l;
            }
            Cl(l, t, a, u);
          }
          t = t.child;
        }
        return t;
      case 26:
        return ja(l, t), l === null ? (u = Um(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = u : V || (t.stateNode = im(
          t.type,
          t.pendingProps,
          Su.current,
          t
        )) : t.memoizedState = Um(
          t.type,
          l.memoizedProps,
          t.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return Xf(t), l === null && V && (a = t.stateNode = Am(
          t.type,
          t.pendingProps,
          Su.current
        ), pl = t, Ct = !0, e = rl, ju(t.type) ? (i0 = e, rl = qt(a.firstChild)) : rl = e), Cl(
          l,
          t,
          t.pendingProps.children,
          u
        ), ja(l, t), l === null && (t.flags |= 4194304), t.child;
      case 5:
        return l === null && V && ((e = a = rl) && (a = Cy(
          a,
          t.type,
          t.pendingProps,
          Ct
        ), a !== null ? (t.stateNode = a, pl = t, rl = qt(a.firstChild), Ct = !1, e = !0) : e = !1), e || Au(t)), Xf(t), e = t.type, n = t.pendingProps, f = l !== null ? l.memoizedProps : null, a = n.children, Pi(e, n) ? a = null : f !== null && Pi(e, f) && (t.flags |= 32), t.memoizedState !== null && (e = Qc(
          l,
          t,
          Nr,
          null,
          null,
          u
        ), ne._currentValue = e), ja(l, t), Cl(l, t, a, u), t.child;
      case 6:
        return l === null && V && ((l = u = rl) && (u = Hy(
          u,
          t.pendingProps,
          Ct
        ), u !== null ? (t.stateNode = u, pl = t, rl = null, l = !0) : l = !1), l || Au(t)), null;
      case 13:
        return ls(l, t, u);
      case 4:
        return cn(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, l === null ? t.child = oa(
          t,
          null,
          a,
          u
        ) : Cl(l, t, a, u), t.child;
      case 11:
        return Kv(
          l,
          t,
          t.type,
          t.pendingProps,
          u
        );
      case 7:
        return a = t.pendingProps, ja(l, t), Cl(l, t, a, u), t.child;
      case 8:
        return Cl(
          l,
          t,
          t.pendingProps.children,
          u
        ), t.child;
      case 12:
        return Cl(
          l,
          t,
          t.pendingProps.children,
          u
        ), t.child;
      case 10:
        return as(l, t, u);
      case 9:
        return e = t.type._context, a = t.pendingProps.children, ea(t), e = Kl(e), a = a(e), t.flags |= 1, Cl(l, t, a, u), t.child;
      case 14:
        return Jv(
          l,
          t,
          t.type,
          t.pendingProps,
          u
        );
      case 15:
        return wv(
          l,
          t,
          t.type,
          t.pendingProps,
          u
        );
      case 19:
        return si(l, t, u);
      case 31:
        return Br(l, t, u);
      case 22:
        return Fv(
          l,
          t,
          u,
          t.pendingProps
        );
      case 24:
        return ea(t), a = Kl(Nl), l === null ? (e = Uc(), e === null && (e = sl, n = Mc(), e.pooledCache = n, n.refCount++, n !== null && (e.pooledCacheLanes |= u), e = n), t.memoizedState = { parent: a, cache: e }, Cc(t), Nu(t, Nl, e)) : ((l.lanes & u) !== 0 && (Hc(l, t), He(t, null, null, u), Ce()), e = l.memoizedState, n = t.memoizedState, e.parent !== a ? (e = { parent: a, cache: a }, t.memoizedState = e, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = e), Nu(t, Nl, a)) : (a = n.cache, Nu(t, Nl, a), a !== e.cache && Nc(
          t,
          [Nl],
          u,
          !0
        ))), Cl(
          l,
          t,
          t.pendingProps.children,
          u
        ), t.child;
      case 30:
        return t.stateNode === null && (t.stateNode = {
          autoName: null,
          paired: null,
          clones: null,
          ref: null
        }), a = t.pendingProps, a.name != null && a.name !== "auto" ? t.flags |= l === null ? 18882560 : 18874368 : V && Hn(t), l !== null && l.memoizedProps.name !== a.name ? t.flags |= 4194816 : ja(l, t), Cl(l, t, a.children, u), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(g(156, t.tag));
  }
  function du(l) {
    l.flags |= 4;
  }
  function ri(l, t, u, a, e) {
    var n;
    if ((n = (l.mode & 32) !== 0) && (n = u === null ? qm(t, a) : qm(t, a) && (a.src !== u.src || a.srcSet !== u.srcSet)), n) {
      if (l.flags |= 16777216, (e & 335544128) === e)
        if (l.stateNode.complete) l.flags |= 8192;
        else if (Xs()) l.flags |= 8192;
        else
          throw ia = Xn, Rc;
    } else l.flags &= -16777217;
  }
  function ns(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !Ym(t))
      if (Xs()) l.flags |= 8192;
      else
        throw ia = Xn, Rc;
  }
  function ef(l, t) {
    t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? H0() : 536870912, l.lanes |= t, Ja |= t);
  }
  function xe(l, t) {
    if (!V)
      switch (l.tailMode) {
        case "visible":
          break;
        case "collapsed":
          for (var u = l.tail, a = null; u !== null; )
            u.alternate !== null && (a = u), u = u.sibling;
          a === null ? t || l.tail === null ? l.tail = null : l.tail.sibling = null : a.sibling = null;
          break;
        default:
          for (t = l.tail, u = null; t !== null; )
            t.alternate !== null && (u = t), t = t.sibling;
          u === null ? l.tail = null : u.sibling = null;
      }
  }
  function yl(l) {
    var t = l.alternate !== null && l.alternate.child === l.child, u = 0, a = 0;
    if (t)
      for (var e = l.child; e !== null; )
        u |= e.lanes | e.childLanes, a |= e.subtreeFlags & 1206910976, a |= e.flags & 1206910976, e.return = l, e = e.sibling;
    else
      for (e = l.child; e !== null; )
        u |= e.lanes | e.childLanes, a |= e.subtreeFlags, a |= e.flags, e.return = l, e = e.sibling;
    return l.subtreeFlags |= a, l.childLanes = u, t;
  }
  function xr(l, t, u) {
    var a = t.pendingProps;
    switch (bc(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return yl(t), null;
      case 1:
        return yl(t), null;
      case 3:
        return u = t.stateNode, a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), su(Nl), Sa(), u.pendingContext && (u.context = u.pendingContext, u.pendingContext = null), (l === null || l.child === null) && (Ya(t) ? du(t) : l === null || l.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Oc())), yl(t), null;
      case 26:
        var e = t.type, n = t.memoizedState;
        return l === null ? (du(t), n !== null ? (yl(t), ns(t, n)) : (yl(t), ri(
          t,
          e,
          null,
          a,
          u
        ))) : n ? n !== l.memoizedState ? (du(t), yl(t), ns(t, n)) : (yl(t), t.flags &= -16777217) : (l = l.memoizedProps, l !== a && du(t), yl(t), ri(
          t,
          e,
          l,
          a,
          u
        )), null;
      case 27:
        if (on(t), u = Su.current, e = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && du(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(g(166));
            return yl(t), t.subtreeFlags &= -33554433, null;
          }
          l = Lt.current, Ya(t) ? Go(t) : (l = Am(e, a, u), t.stateNode = l, du(t));
        }
        return yl(t), t.subtreeFlags &= -33554433, null;
      case 5:
        if (on(t), e = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && du(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(g(166));
            return yl(t), t.subtreeFlags &= -33554433, null;
          }
          if (n = Lt.current, Ya(t))
            Go(t);
          else {
            var f = We(
              Su.current
            );
            switch (n) {
              case 1:
                n = f.createElementNS(
                  "http://www.w3.org/2000/svg",
                  e
                );
                break;
              case 2:
                n = f.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  e
                );
                break;
              default:
                switch (e) {
                  case "svg":
                    n = f.createElementNS(
                      "http://www.w3.org/2000/svg",
                      e
                    );
                    break;
                  case "math":
                    n = f.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      e
                    );
                    break;
                  case "script":
                    n = f.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(
                      n.firstChild
                    );
                    break;
                  case "select":
                    n = typeof a.is == "string" ? f.createElement("select", {
                      is: a.is
                    }) : f.createElement("select"), a.multiple ? n.multiple = !0 : a.size && (n.size = a.size);
                    break;
                  default:
                    n = typeof a.is == "string" ? f.createElement(e, { is: a.is }) : f.createElement(e);
                }
            }
            n[Ll] = t, n[it] = a;
            l: for (f = t.child; f !== null; ) {
              if (f.tag === 5 || f.tag === 6)
                n.appendChild(f.stateNode);
              else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                f.child.return = f, f = f.child;
                continue;
              }
              if (f === t) break l;
              for (; f.sibling === null; ) {
                if (f.return === null || f.return === t)
                  break l;
                f = f.return;
              }
              f.sibling.return = f.return, f = f.sibling;
            }
            t.stateNode = n;
            l: switch (Wl(n, e, a), e) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break l;
              case "img":
                a = !0;
                break l;
              default:
                a = !1;
            }
            a && du(t);
          }
        }
        return yl(t), t.subtreeFlags &= -33554433, ri(
          t,
          t.type,
          l === null ? null : l.memoizedProps,
          t.pendingProps,
          u
        ), null;
      case 6:
        if (l && t.stateNode != null)
          l.memoizedProps !== a && du(t);
        else {
          if (typeof a != "string" && t.stateNode === null)
            throw Error(g(166));
          if (l = Su.current, Ya(t)) {
            if (l = t.stateNode, u = t.memoizedProps, a = null, e = pl, e !== null)
              switch (e.tag) {
                case 27:
                case 5:
                  a = e.memoizedProps;
              }
            l[Ll] = t, l = !!(l.nodeValue === u || a !== null && a.suppressHydrationWarning === !0 || em(l.nodeValue, u)), l || Au(t, !0);
          } else
            l = We(l).createTextNode(
              a
            ), l[Ll] = t, t.stateNode = l;
        }
        return yl(t), null;
      case 31:
        if (u = t.memoizedState, l === null || l.memoizedState !== null) {
          if (a = Ya(t), u !== null) {
            if (l === null) {
              if (!a) throw Error(g(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(g(557));
              l[Ll] = t;
            } else
              ta(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            yl(t), l = !1;
          } else
            u = Oc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = u), l = !0;
          if (!l)
            return t.flags & 256 ? (_t(t), t) : (_t(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(g(558));
        }
        return yl(t), null;
      case 13:
        if (a = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (e = Ya(t), a !== null && a.dehydrated !== null) {
            if (l === null) {
              if (!e) throw Error(g(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(g(317));
              e[Ll] = t;
            } else
              ta(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            yl(t), e = !1;
          } else
            e = Oc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), e = !0;
          if (!e)
            return t.flags & 256 ? (_t(t), t) : (_t(t), null);
        }
        return _t(t), (t.flags & 128) !== 0 ? (t.lanes = u, t) : (u = a !== null, l = l !== null && l.memoizedState !== null, u && (a = t.child, e = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (e = a.alternate.memoizedState.cachePool.pool), n = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (n = a.memoizedState.cachePool.pool), n !== e && (a.flags |= 2048)), u !== l && u && (t.child.flags |= 8192), ef(t, t.updateQueue), yl(t), null);
      case 4:
        return Sa(), l === null && Fi(t.stateNode.containerInfo), t.flags |= 67108864, yl(t), null;
      case 10:
        return su(t.type), yl(t), null;
      case 19:
        if (xc(t), a = t.memoizedState, a === null) return yl(t), null;
        if (e = (t.flags & 128) !== 0, n = a.rendering, n === null)
          if (e) xe(a, !1);
          else {
            if (El !== 0 || l !== null && (l.flags & 128) !== 0)
              for (l = t.child; l !== null; ) {
                if (n = Vn(l), n !== null) {
                  for (t.flags |= 128, xe(a, !1), l = n.updateQueue, t.updateQueue = l, ef(t, l), t.subtreeFlags = 0, l = u, u = t.child; u !== null; )
                    Ho(u, l), u = u.sibling;
                  return qe(
                    t,
                    wl.current & 1 | 2
                  ), V && ou(t, a.treeForkCount), t.child;
                }
                l = l.sibling;
              }
            a.tail !== null && yt() > gf && (t.flags |= 128, e = !0, xe(a, !1), t.lanes = 4194304);
          }
        else {
          if (!e)
            if (l = Vn(n), l !== null) {
              if (t.flags |= 128, e = !0, l = l.updateQueue, t.updateQueue = l, ef(t, l), xe(a, !0), a.tail === null && a.tailMode !== "collapsed" && a.tailMode !== "visible" && !n.alternate && !V)
                return yl(t), null;
            } else
              2 * yt() - a.renderingStartTime > gf && u !== 536870912 && (t.flags |= 128, e = !0, xe(a, !1), t.lanes = 4194304);
          a.isBackwards ? (n.sibling = t.child, t.child = n) : (l = a.last, l !== null ? l.sibling = n : t.child = n, a.last = n);
        }
        if (a.tail !== null) {
          l = a.tail;
          l: {
            for (u = l; u !== null; ) {
              if (u.alternate !== null) {
                u = !1;
                break l;
              }
              u = u.sibling;
            }
            u = !0;
          }
          return a.rendering = l, a.tail = l.sibling, a.renderingStartTime = yt(), l.sibling = null, n = wl.current, n = e ? n & 1 | 2 : n & 1, a.tailMode === "visible" || a.tailMode === "collapsed" || !u || V ? qe(t, n) : (u = n, ml(Jl, t), ml(wl, u), Pl === null && (Pl = t)), V && ou(t, a.treeForkCount), l;
        }
        return yl(t), null;
      case 22:
      case 23:
        return _t(t), pc(), a = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (u & 536870912) !== 0 && (t.flags & 128) === 0 && (yl(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : yl(t), u = t.updateQueue, u !== null && ef(t, u.retryQueue), u = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== u && (t.flags |= 2048), l !== null && Vl(fa), null;
      case 24:
        return u = null, l !== null && (u = l.memoizedState.cache), t.memoizedState.cache !== u && (t.flags |= 2048), su(Nl), yl(t), null;
      case 25:
        return null;
      case 30:
        return t.flags |= 33554432, yl(t), null;
    }
    throw Error(g(156, t.tag));
  }
  function Xr(l, t) {
    switch (bc(t), t.tag) {
      case 1:
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 3:
        return su(Nl), Sa(), l = t.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (t.flags = l & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return on(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (_t(t), t.alternate === null)
            throw Error(g(340));
          ta();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 13:
        if (_t(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(g(340));
          ta();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 19:
        return xc(t), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null), t.flags |= 4, t) : null;
      case 4:
        return Sa(), null;
      case 10:
        return su(t.type), null;
      case 22:
      case 23:
        return _t(t), pc(), l !== null && Vl(fa), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 24:
        return su(Nl), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function fs(l, t) {
    switch (bc(t), t.tag) {
      case 3:
        su(Nl), Sa();
        break;
      case 26:
      case 27:
      case 5:
        on(t);
        break;
      case 4:
        Sa();
        break;
      case 31:
        t.memoizedState !== null && _t(t);
        break;
      case 13:
        _t(t);
        break;
      case 19:
        xc(t);
        break;
      case 10:
        su(t.type);
        break;
      case 22:
      case 23:
        _t(t), pc(), l !== null && Vl(fa);
        break;
      case 24:
        su(Nl);
    }
  }
  function Xe(l, t) {
    try {
      var u = t.updateQueue, a = u !== null ? u.lastEffect : null;
      if (a !== null) {
        var e = a.next;
        u = e;
        do {
          if ((u.tag & l) === l) {
            a = void 0;
            var n = u.create, f = u.inst;
            a = n(), f.destroy = a;
          }
          u = u.next;
        } while (u !== e);
      }
    } catch (c) {
      cl(t, t.return, c);
    }
  }
  function Yu(l, t, u) {
    try {
      var a = t.updateQueue, e = a !== null ? a.lastEffect : null;
      if (e !== null) {
        var n = e.next;
        a = n;
        do {
          if ((a.tag & l) === l) {
            var f = a.inst, c = f.destroy;
            if (c !== void 0) {
              f.destroy = void 0, e = t;
              var i = u, r = c;
              try {
                r();
              } catch (h) {
                cl(
                  e,
                  i,
                  h
                );
              }
            }
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (h) {
      cl(t, t.return, h);
    }
  }
  function cs(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var u = l.stateNode;
      try {
        $o(t, u);
      } catch (a) {
        cl(l, l.return, a);
      }
    }
  }
  function is(l, t, u) {
    u.props = sa(
      l.type,
      l.memoizedProps
    ), u.state = l.memoizedState;
    try {
      u.componentWillUnmount();
    } catch (a) {
      cl(l, t, a);
    }
  }
  function Ft(l, t) {
    try {
      var u = l.ref;
      if (u !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var a = l.stateNode;
            break;
          case 30:
            var e = l.stateNode, n = fu(l.memoizedProps, e);
            (e.ref === null || e.ref.name !== n) && (e.ref = dm(n)), a = e.ref;
            break;
          case 7:
            if (l.stateNode === null) {
              var f = new Ot(l);
              S(
                l.child,
                !1,
                Uy,
                f,
                void 0,
                void 0
              ), l.stateNode = f;
            }
            a = l.stateNode;
            break;
          default:
            a = l.stateNode;
        }
        typeof u == "function" ? l.refCleanup = u(a) : u.current = a;
      }
    } catch (c) {
      cl(l, t, c);
    }
  }
  function Fl(l, t) {
    var u = l.ref, a = l.refCleanup;
    if (u !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (e) {
          cl(l, t, e);
        } finally {
          l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
        }
      else if (typeof u == "function")
        try {
          u(null);
        } catch (e) {
          cl(l, t, e);
        }
      else u.current = null;
  }
  function nf(l, t) {
    if ((l.tag === 5 || l.tag === 27 || l.tag === 6) && l.alternate === null && t !== null)
      for (var u = 0; u < t.length; u++)
        Em(
          l.stateNode,
          t[u]
        );
  }
  function os(l) {
    for (var t = l.return; t !== null && (di(t) && Em(l.stateNode, t.stateNode), !yi(t)); )
      t = t.return;
  }
  function Qe(l) {
    for (var t = l.return; t !== null && (di(t) && Ry(l.stateNode, t.stateNode), !yi(t)); )
      t = t.return;
  }
  function yi(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 27;
  }
  function di(l) {
    return l && l.tag === 7 && l.stateNode !== null;
  }
  function hi(l) {
    var t = l.type, u = l.memoizedProps, a = l.stateNode;
    try {
      l: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          u.autoFocus && a.focus();
          break l;
        case "img":
          u.src ? a.src = u.src : u.srcSet && (a.srcset = u.srcSet);
      }
    } catch (e) {
      cl(l, l.return, e);
    }
  }
  function gi(l, t, u) {
    try {
      var a = l.stateNode;
      sy(a, l.type, u, t), a[it] = t;
    } catch (e) {
      cl(l, l.return, e);
    }
  }
  function vs(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && ju(l.type) || l.tag === 4;
  }
  function Si(l) {
    l: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || vs(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && ju(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function _i(l, t, u, a) {
    var e = l.tag;
    if (e === 5 || e === 6)
      e = l.stateNode, t ? (u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u).insertBefore(e, t) : (t = u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u, t.appendChild(e), u = u._reactRootContainer, u != null || t.onclick !== null || (t.onclick = Kt)), nf(l, a), ll = !0;
    else if (e !== 4 && (e === 27 && (nf(l, a), a = null, ju(l.type) && (u = l.stateNode, t = null)), l = l.child, l !== null))
      for (_i(
        l,
        t,
        u,
        a
      ), l = l.sibling; l !== null; )
        _i(
          l,
          t,
          u,
          a
        ), l = l.sibling;
  }
  function ff(l, t, u, a) {
    var e = l.tag;
    if (e === 5 || e === 6)
      e = l.stateNode, t ? u.insertBefore(e, t) : u.appendChild(e), nf(l, a), ll = !0;
    else if (e !== 4 && (e === 27 && (nf(l, a), a = null, ju(l.type) && (u = l.stateNode)), l = l.child, l !== null))
      for (ff(
        l,
        t,
        u,
        a
      ), l = l.sibling; l !== null; )
        ff(
          l,
          t,
          u,
          a
        ), l = l.sibling;
  }
  function ss(l) {
    var t = l.stateNode, u = l.memoizedProps;
    try {
      for (var a = l.type, e = t.attributes; e.length; )
        t.removeAttributeNode(e[0]);
      Wl(t, a, u), t[Ll] = l, t[it] = u;
    } catch (n) {
      cl(l, l.return, n);
    }
  }
  var cf = !1, Tt = null;
  function ms(l) {
    (l.tag === 30 || (l.subtreeFlags & 33554432) !== 0) && (cf = !0);
  }
  var Wt = null;
  function rs() {
    var l = Wt;
    return Wt = null, l;
  }
  var vt = 0;
  function Za(l, t, u, a, e) {
    return vt = 0, ys(
      l.child,
      t,
      u,
      a,
      e
    );
  }
  function ys(l, t, u, a, e) {
    for (var n = !1; l !== null; ) {
      if (l.tag === 5) {
        var f = l.stateNode;
        if (a !== null) {
          var c = u0(f);
          a.push(c), c.view && (n = !0);
        } else
          n || u0(f).view && (n = !0);
        cf = !0, rm(
          f,
          vt === 0 ? t : t + "_" + vt,
          u
        ), vt++;
      } else (l.tag !== 22 || l.memoizedState === null) && (l.tag === 30 && e || ys(
        l.child,
        t,
        u,
        a,
        e
      ) && (n = !0));
      l = l.sibling;
    }
    return n;
  }
  function $t(l, t) {
    for (; l !== null; )
      l.tag === 5 ? ym(l.stateNode, l.memoizedProps) : (l.tag !== 22 || l.memoizedState === null) && (l.tag === 30 && t || $t(
        l.child,
        t
      )), l = l.sibling;
  }
  function of(l) {
    if ((l.subtreeFlags & 18874368) !== 0)
      for (l = l.child; l !== null; ) {
        if ((l.tag !== 22 || l.memoizedState === null) && (of(l), l.tag === 30 && (l.flags & 18874368) !== 0 && l.stateNode.paired)) {
          var t = l.memoizedProps;
          if (t.name == null || t.name === "auto")
            throw Error(g(544));
          var u = t.name;
          t = cu(t.default, t.share), t !== "none" && (Za(
            l,
            u,
            t,
            null,
            !1
          ) || $t(l.child, !1));
        }
        l = l.sibling;
      }
  }
  function Ti(l, t) {
    if (l.tag === 30) {
      var u = l.stateNode, a = l.memoizedProps, e = fu(a, u), n = cu(
        a.default,
        u.paired ? a.share : a.enter
      );
      n !== "none" ? Za(l, e, n, null, !1) ? (of(l), u.paired || t || $a(l, a.onEnter)) : $t(l.child, !1) : of(l);
    } else if ((l.subtreeFlags & 33554432) !== 0)
      for (l = l.child; l !== null; )
        Ti(l, t), l = l.sibling;
    else of(l);
  }
  function Ei(l) {
    if (Tt !== null && Tt.size !== 0) {
      var t = Tt;
      if ((l.subtreeFlags & 18874368) !== 0)
        for (l = l.child; l !== null; ) {
          if (l.tag !== 22 || l.memoizedState === null) {
            if (l.tag === 30 && (l.flags & 18874368) !== 0) {
              var u = l.memoizedProps, a = u.name;
              if (a != null && a !== "auto") {
                var e = t.get(a);
                if (e !== void 0) {
                  var n = cu(
                    u.default,
                    u.share
                  );
                  if (n !== "none" && (Za(
                    l,
                    a,
                    n,
                    null,
                    !1
                  ) ? (n = l.stateNode, e.paired = n, n.paired = e, $a(l, u.onShare)) : $t(l.child, !1)), t.delete(a), t.size === 0) break;
                }
              }
            }
            Ei(l);
          }
          l = l.sibling;
        }
    }
  }
  function bi(l) {
    if (l.tag === 30) {
      var t = l.memoizedProps, u = fu(t, l.stateNode), a = Tt !== null ? Tt.get(u) : void 0, e = cu(
        t.default,
        a !== void 0 ? t.share : t.exit
      );
      e !== "none" && (Za(l, u, e, null, !1) ? a !== void 0 ? (e = l.stateNode, a.paired = e, e.paired = a, Tt.delete(u), $a(l, t.onShare)) : $a(l, t.onExit) : $t(l.child, !1)), Tt !== null && Ei(l);
    } else if ((l.subtreeFlags & 33554432) !== 0)
      for (l = l.child; l !== null; )
        bi(l), l = l.sibling;
    else
      Tt !== null && Ei(l);
  }
  function ds(l) {
    for (l = l.child; l !== null; ) {
      if (l.tag === 30) {
        var t = l.memoizedProps, u = fu(t, l.stateNode);
        t = cu(t.default, t.update), l.flags &= -5, t !== "none" && Za(
          l,
          u,
          t,
          l.memoizedState = [],
          !1
        );
      } else
        (l.subtreeFlags & 33554432) !== 0 && ds(l);
      l = l.sibling;
    }
  }
  function zi(l) {
    if ((l.subtreeFlags & 18874368) !== 0)
      for (l = l.child; l !== null; ) {
        if (l.tag !== 22 || l.memoizedState === null) {
          if (l.tag === 30 && (l.flags & 18874368) !== 0) {
            var t = l.stateNode;
            t.paired !== null && (t.paired = null, $t(l.child, !1));
          }
          zi(l);
        }
        l = l.sibling;
      }
  }
  function vf(l) {
    if (l.tag === 30)
      l.stateNode.paired = null, $t(l.child, !1), zi(l);
    else if ((l.subtreeFlags & 33554432) !== 0)
      for (l = l.child; l !== null; )
        vf(l), l = l.sibling;
    else zi(l);
  }
  function hs(l) {
    for (l = l.child; l !== null; )
      l.tag === 30 ? $t(l.child, !1) : (l.subtreeFlags & 33554432) !== 0 && hs(l), l = l.sibling;
  }
  function Oi(l, t, u, a, e, n, f) {
    for (var c = !1; t !== null; ) {
      if (t.tag === 5) {
        var i = t.stateNode;
        if (n !== null && vt < n.length) {
          var r = n[vt], h = u0(i);
          (r.view || h.view) && (c = !0);
          var T;
          if (T = (l.flags & 4) === 0)
            if (h.clip) T = !0;
            else {
              T = r.rect;
              var s = h.rect;
              T = T.y !== s.y || T.x !== s.x || T.height !== s.height || T.width !== s.width;
            }
          T && (l.flags |= 4), h.abs ? h = !r.abs : (r = r.rect, h = h.rect, h = r.height !== h.height || r.width !== h.width), h && (l.flags |= 32);
        } else l.flags |= 32;
        (l.flags & 4) !== 0 && rm(
          i,
          vt === 0 ? u : u + "_" + vt,
          e
        ), c && (l.flags & 4) !== 0 || (Wt === null && (Wt = []), Wt.push(
          i,
          vt === 0 ? a : a + "_" + vt,
          t.memoizedProps
        )), vt++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && f ? l.flags |= t.flags & 32 : Oi(
        l,
        t.child,
        u,
        a,
        e,
        n,
        f
      ) && (c = !0));
      t = t.sibling;
    }
    return c;
  }
  function gs(l, t) {
    for (l = l.child; l !== null; ) {
      if (l.tag === 30) {
        var u = l.memoizedProps, a = l.stateNode, e = fu(u, a), n = cu(u.default, u.update), f;
        f = l.memoizedState, l.memoizedState = null, a = l;
        var c = l.child;
        vt = 0, e = Oi(
          a,
          c,
          e,
          e,
          n,
          f,
          !1
        ), (l.flags & 4) !== 0 && e && $a(l, u.onUpdate);
      } else
        (l.subtreeFlags & 33554432) !== 0 && gs(l);
      l = l.sibling;
    }
  }
  var Gl = !1, el = !1, It = !1, Ai = !1, Ss = typeof WeakSet == "function" ? WeakSet : Set, xl = null, kt = !1, je = !1, sf = !1, Ni = !1;
  function Qr(l, t, u) {
    if (l = l.containerInfo, Ii = fe, l = bo(l), mc(l)) {
      if ("selectionStart" in l)
        var a = {
          start: l.selectionStart,
          end: l.selectionEnd
        };
      else
        l: {
          a = (a = l.ownerDocument) && a.defaultView || window;
          var e = a.getSelection && a.getSelection();
          if (e && e.rangeCount !== 0) {
            a = e.anchorNode;
            var n = e.anchorOffset, f = e.focusNode;
            e = e.focusOffset;
            try {
              a.nodeType, f.nodeType;
            } catch {
              a = null;
              break l;
            }
            var c = 0, i = -1, r = -1, h = 0, T = 0, s = l, d = null;
            t: for (; ; ) {
              for (var b; s !== a || n !== 0 && s.nodeType !== 3 || (i = c + n), s !== f || e !== 0 && s.nodeType !== 3 || (r = c + e), s.nodeType === 3 && (c += s.nodeValue.length), (b = s.firstChild) !== null; )
                d = s, s = b;
              for (; ; ) {
                if (s === l) break t;
                if (d === a && ++h === n && (i = c), d === f && ++T === e && (r = c), (b = s.nextSibling) !== null) break;
                s = d, d = s.parentNode;
              }
              s = b;
            }
            a = i === -1 || r === -1 ? null : { start: i, end: r };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (ki = { focusedElem: l, selectionRange: a }, fe = !1, u = (u & 335544064) === u, xl = t, t = u ? 9270 : 1024; xl !== null; ) {
      if (l = xl, u && (a = l.deletions, a !== null))
        for (n = 0; n < a.length; n++)
          u && bi(a[n]);
      if (l.alternate === null && (l.flags & 2) !== 0)
        u && ms(l), mf(u);
      else {
        if (l.tag === 22) {
          if (a = l.alternate, l.memoizedState !== null) {
            a !== null && a.memoizedState === null && u && bi(a), mf(u);
            continue;
          } else if (a !== null && a.memoizedState !== null) {
            u && ms(l), mf(u);
            continue;
          }
        }
        a = l.child, (l.subtreeFlags & t) !== 0 && a !== null ? (a.return = l, xl = a) : (u && ds(l), mf(u));
      }
    }
    Tt = null;
  }
  function mf(l) {
    for (; xl !== null; ) {
      var t = xl, u = l, a = t.alternate, e = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ((e & 1024) !== 0 && a !== null) {
            u = void 0, e = a.memoizedProps, a = a.memoizedState;
            var n = t.stateNode;
            try {
              var f = sa(
                t.type,
                e
              );
              u = n.getSnapshotBeforeUpdate(
                f,
                a
              ), n.__reactInternalSnapshotBeforeUpdate = u;
            } catch (c) {
              cl(t, t.return, c);
            }
          }
          break;
        case 3:
          if ((e & 1024) !== 0) {
            if (a = t.stateNode.containerInfo, u = a.nodeType, u === 9)
              n0(a);
            else if (u === 1)
              switch (a.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  n0(a);
                  break;
                default:
                  a.textContent = "";
              }
          }
          break;
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        case 30:
          u && a !== null && (u = fu(
            a.memoizedProps,
            a.stateNode
          ), e = t.memoizedProps, e = cu(e.default, e.update), e !== "none" && Za(
            a,
            u,
            e,
            a.memoizedState = [],
            !0
          ));
          break;
        default:
          if ((e & 1024) !== 0) throw Error(g(163));
      }
      if (a = t.sibling, a !== null) {
        a.return = t.return, xl = a;
        break;
      }
      xl = t.return;
    }
  }
  function _s(l, t, u) {
    var a = u.flags;
    switch (u.tag) {
      case 0:
      case 11:
      case 15:
        Pt(l, u), a & 4 && Xe(5, u);
        break;
      case 1:
        if (Pt(l, u), a & 4)
          if (l = u.stateNode, t === null)
            try {
              l.componentDidMount();
            } catch (f) {
              cl(u, u.return, f);
            }
          else {
            var e = sa(
              u.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              l.componentDidUpdate(
                e,
                t,
                l.__reactInternalSnapshotBeforeUpdate
              );
            } catch (f) {
              cl(
                u,
                u.return,
                f
              );
            }
          }
        a & 64 && cs(u), a & 512 && Ft(u, u.return);
        break;
      case 3:
        if (Pt(l, u), a & 64 && (l = u.updateQueue, l !== null)) {
          if (t = null, u.child !== null)
            switch (u.child.tag) {
              case 27:
              case 5:
                t = u.child.stateNode;
                break;
              case 1:
                t = u.child.stateNode;
            }
          try {
            $o(l, t);
          } catch (f) {
            cl(u, u.return, f);
          }
        }
        break;
      case 27:
        t === null && a & 4 && ss(u);
      case 26:
      case 5:
        Pt(l, u), t === null && a & 4 && hi(u), a & 512 && Ft(u, u.return);
        break;
      case 12:
        Pt(l, u);
        break;
      case 31:
        Pt(l, u), a & 4 && zs(l, u);
        break;
      case 13:
        Pt(l, u), a & 4 && Os(l, u), a & 64 && (l = u.memoizedState, l !== null && (l = l.dehydrated, l !== null && (u = kr.bind(
          null,
          u
        ), qy(l, u))));
        break;
      case 22:
        if (a = u.memoizedState !== null || Gl, !a) {
          var n = t !== null && t.memoizedState !== null || el;
          t = Gl, e = el, Gl = a, (el = n) && !e ? (a = 2, (u.subtreeFlags & 8772) !== 0 && (a |= 1), Xt(
            l,
            u,
            a
          )) : Pt(l, u), Gl = t, el = e;
        }
        break;
      case 30:
        Pt(l, u), a & 512 && Ft(u, u.return);
        break;
      case 7:
        a & 512 && Ft(u, u.return);
      default:
        Pt(l, u);
    }
  }
  function Mi(l, t) {
    for (l = l.child; l !== null; )
      Ts(l, t), l = l.sibling;
  }
  function Ts(l, t) {
    switch (l.tag) {
      case 5:
      case 26:
        try {
          var u = l.stateNode;
          if (t) {
            var a = u.style;
            typeof a.setProperty == "function" ? a.setProperty("display", "none", "important") : a.display = "none";
          } else {
            var e = l.stateNode, n = l.memoizedProps.style, f = n != null && n.hasOwnProperty("display") ? n.display : null;
            e.style.display = f == null || typeof f == "boolean" ? "" : ("" + f).trim();
          }
        } catch (i) {
          cl(l, l.return, i);
        }
        Di(l, t);
        break;
      case 6:
        try {
          l.stateNode.nodeValue = t ? "" : l.memoizedProps, ll = !0;
        } catch (i) {
          cl(l, l.return, i);
        }
        break;
      case 18:
        try {
          var c = l.stateNode;
          t ? mm(c, !0) : mm(l.stateNode, !1);
        } catch (i) {
          cl(l, l.return, i);
        }
        break;
      case 22:
      case 23:
        l.memoizedState === null && Mi(l, t);
        break;
      default:
        Mi(l, t);
    }
  }
  function Di(l, t) {
    if (l.subtreeFlags & 67108864)
      for (l = l.child; l !== null; ) {
        l: {
          var u = l, a = t;
          switch (u.tag) {
            case 4:
              Ts(u, a);
              break l;
            case 22:
              u.memoizedState === null && Di(u, a);
              break l;
            default:
              Di(u, a);
          }
        }
        l = l.sibling;
      }
  }
  function Es(l) {
    var t = l.alternate;
    t !== null && (l.alternate = null, Es(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && hn(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var dl = null, st = !1;
  function Gt(l, t, u) {
    for (u = u.child; u !== null; )
      bs(l, t, u), u = u.sibling;
  }
  function bs(l, t, u) {
    if (dt && typeof dt.onCommitFiberUnmount == "function")
      try {
        dt.onCommitFiberUnmount(ve, u);
      } catch {
      }
    switch (u.tag) {
      case 26:
        el || Fl(u, t), Gt(
          l,
          t,
          u
        ), u.memoizedState ? u.memoizedState.count-- : u.stateNode && !el && (u = u.stateNode, u.parentNode.removeChild(u));
        break;
      case 27:
        el || Fl(u, t), Qe(u);
        var a = dl, e = st;
        ju(u.type) && (dl = u.stateNode, st = !1), Gt(
          l,
          t,
          u
        ), Nm(
          u.stateNode,
          u.type,
          u.memoizedProps
        ), dl = a, st = e;
        break;
      case 5:
        el || Fl(u, t), Qe(u);
      case 6:
        if (u.tag === 6 && Qe(u), a = dl, e = st, dl = null, Gt(
          l,
          t,
          u
        ), dl = a, st = e, dl !== null)
          if (st)
            try {
              (dl.nodeType === 9 ? dl.body : dl.nodeName === "HTML" ? dl.ownerDocument.body : dl).removeChild(u.stateNode), ll = !0;
            } catch (n) {
              cl(
                u,
                t,
                n
              );
            }
          else
            try {
              dl.removeChild(u.stateNode), ll = !0;
            } catch (n) {
              cl(
                u,
                t,
                n
              );
            }
        break;
      case 18:
        dl !== null && (st ? (l = dl, sm(
          l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
          u.stateNode
        ), ce(l)) : sm(dl, u.stateNode));
        break;
      case 4:
        a = dl, e = st, dl = u.stateNode.containerInfo, st = !0, Gt(
          l,
          t,
          u
        ), dl = a, st = e;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Yu(2, u, t), el || Yu(4, u, t), Gt(
          l,
          t,
          u
        );
        break;
      case 1:
        el || (Fl(u, t), a = u.stateNode, typeof a.componentWillUnmount == "function" && is(
          u,
          t,
          a
        )), Gt(
          l,
          t,
          u
        );
        break;
      case 21:
        Gt(
          l,
          t,
          u
        );
        break;
      case 22:
        el = (a = el) || u.memoizedState !== null, Gt(
          l,
          t,
          u
        ), el = a;
        break;
      case 30:
        Fl(u, t), Gt(
          l,
          t,
          u
        );
        break;
      case 7:
        el || Fl(u, t), Gt(
          l,
          t,
          u
        );
        break;
      default:
        Gt(
          l,
          t,
          u
        );
    }
  }
  function zs(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        ce(l);
      } catch (u) {
        cl(t, t.return, u);
      }
    }
  }
  function Os(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        ce(l);
      } catch (u) {
        cl(t, t.return, u);
      }
  }
  function jr(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new Ss()), t;
      case 22:
        return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new Ss()), t;
      default:
        throw Error(g(435, l.tag));
    }
  }
  function rf(l, t) {
    var u = jr(l);
    t.forEach(function(a) {
      if (!u.has(a)) {
        u.add(a);
        var e = Pr.bind(null, l, a);
        a.then(e, e);
      }
    });
  }
  function ft(l, t, u) {
    var a = t.deletions;
    if (a !== null)
      for (var e = 0; e < a.length; e++) {
        var n = a[e], f = l, c = t, i = c;
        l: for (; i !== null; ) {
          switch (i.tag) {
            case 27:
              if (ju(i.type)) {
                dl = i.stateNode, st = !1;
                break l;
              }
              break;
            case 5:
              dl = i.stateNode, st = !1;
              break l;
            case 3:
            case 4:
              dl = i.stateNode.containerInfo, st = !0;
              break l;
          }
          i = i.return;
        }
        if (dl === null) throw Error(g(160));
        bs(f, c, n), dl = null, st = !1, f = n.alternate, f !== null && (f.return = null), n.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        As(t, l, u), t = t.sibling;
  }
  var xt = null;
  function As(l, t, u) {
    var a = l.alternate, e = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (e & 4 && (a = l.updateQueue, a = a !== null ? a.events : null, a !== null))
          for (var n = 0; n < a.length; n++) {
            var f = a[n];
            f.ref.impl = f.nextImpl;
          }
        ft(t, l, u), ct(l), e & 4 && (Yu(3, l, l.return), Xe(3, l), Yu(5, l, l.return));
        break;
      case 1:
        ft(t, l, u), ct(l), e & 512 && (el || a === null || Fl(a, a.return)), e & 64 && Gl && (l = l.updateQueue, l !== null && (t = l.callbacks, t !== null && (u = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = u === null ? t : u.concat(t))));
        break;
      case 26:
        if (n = xt, ft(t, l, u), ct(l), e & 512 && (el || a === null || Fl(a, a.return)), e & 4)
          if (e = a !== null ? a.memoizedState : null, u = l.memoizedState, a === null)
            if (u === null)
              if (l.stateNode === null)
                if (Gl)
                  l.stateNode = im(
                    l.type,
                    l.memoizedProps,
                    t.containerInfo,
                    l
                  );
                else {
                  l: {
                    t = l.type, u = l.memoizedProps, e = n.ownerDocument || n;
                    t: switch (t) {
                      case "title":
                        a = e.getElementsByTagName("title")[0], (!a || a[re] || a[Ll] || a.namespaceURI === "http://www.w3.org/2000/svg" || a.hasAttribute("itemprop")) && (a = e.createElement(t), e.head.insertBefore(
                          a,
                          e.querySelector("head > title")
                        )), Wl(a, t, u), a[Ll] = l, Bl(a), t = a;
                        break l;
                      case "link":
                        if (n = Hm(
                          "link",
                          "href",
                          e
                        ).get(t + (u.href || ""))) {
                          for (f = 0; f < n.length; f++)
                            if (a = n[f], a.getAttribute("href") === (u.href == null || u.href === "" ? null : u.href) && a.getAttribute("rel") === (u.rel == null ? null : u.rel) && a.getAttribute("title") === (u.title == null ? null : u.title) && a.getAttribute("crossorigin") === (u.crossOrigin == null ? null : u.crossOrigin)) {
                              n.splice(f, 1);
                              break t;
                            }
                        }
                        a = e.createElement(t), Wl(a, t, u), e.head.appendChild(a);
                        break;
                      case "meta":
                        if (n = Hm(
                          "meta",
                          "content",
                          e
                        ).get(t + (u.content || ""))) {
                          for (f = 0; f < n.length; f++)
                            if (a = n[f], a.getAttribute("content") === (u.content == null ? null : "" + u.content) && a.getAttribute("name") === (u.name == null ? null : u.name) && a.getAttribute("property") === (u.property == null ? null : u.property) && a.getAttribute("http-equiv") === (u.httpEquiv == null ? null : u.httpEquiv) && a.getAttribute("charset") === (u.charSet == null ? null : u.charSet)) {
                              n.splice(f, 1);
                              break t;
                            }
                        }
                        a = e.createElement(t), Wl(a, t, u), e.head.appendChild(a);
                        break;
                      default:
                        throw Error(g(468, t));
                    }
                    a[Ll] = l, Bl(a), t = a;
                  }
                  l.stateNode = t;
                }
              else
                Gl || m0(n, l.type, l.stateNode);
            else
              l.stateNode = Cm(
                n,
                u,
                l.memoizedProps
              );
          else
            e !== u ? (e === null ? (t = a.stateNode, t === null || el || t.parentNode.removeChild(t)) : e.count--, u === null ? Gl || m0(n, l.type, l.stateNode) : Cm(n, u, l.memoizedProps)) : u === null && l.stateNode !== null && gi(
              l,
              l.memoizedProps,
              a.memoizedProps
            );
        break;
      case 27:
        ft(t, l, u), ct(l), e & 512 && (el || a === null || Fl(a, a.return)), a !== null && e & 4 && gi(
          l,
          l.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (n = It, It = !1, ft(t, l, u), It = n, ct(l), e & 512 && (el || a === null || Fl(a, a.return)), l.flags & 32) {
          t = l.stateNode;
          try {
            Oa(t, ""), ll = !0;
          } catch (h) {
            cl(l, l.return, h);
          }
        }
        e & 4 && l.stateNode != null && (t = l.memoizedProps, gi(
          l,
          t,
          a !== null ? a.memoizedProps : t
        )), e & 1024 && (Ai = !0);
        break;
      case 6:
        if (ft(t, l, u), ct(l), e & 4) {
          if (l.stateNode === null)
            throw Error(g(162));
          t = l.memoizedProps, u = l.stateNode;
          try {
            u.nodeValue = t, ll = !0;
          } catch (h) {
            cl(l, l.return, h);
          }
        }
        break;
      case 3:
        if (ll = !1, Df = null, n = xt, xt = $e(t.containerInfo), ft(t, l, u), xt = n, ct(l), e & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            ce(t.containerInfo);
          } catch (h) {
            cl(l, l.return, h);
          }
        Ai && (Ai = !1, Ns(l)), ll = !1;
        break;
      case 4:
        e = It, It = Gl, a = K0(), n = xt, xt = $e(
          l.stateNode.containerInfo
        ), ft(t, l, u), ct(l), xt = n, ll && je && (sf = !0), ll = a, It = e;
        break;
      case 12:
        ft(t, l, u), ct(l);
        break;
      case 31:
        ft(t, l, u), ct(l), e & 4 && (t = l.updateQueue, t !== null && (l.updateQueue = null, rf(l, t)));
        break;
      case 13:
        ft(t, l, u), ct(l), l.child.flags & 8192 && l.memoizedState !== null != (a !== null && a.memoizedState !== null) && (hf = yt()), e & 4 && (t = l.updateQueue, t !== null && (l.updateQueue = null, rf(l, t)));
        break;
      case 22:
        n = l.memoizedState !== null, f = a !== null && a.memoizedState !== null;
        var c = Gl, i = el, r = It;
        Gl = c || n, It = r || n, el = i || f, ft(t, l, u), el = i, It = r, Gl = c, ct(l), e & 8192 && (t = l.stateNode, t._visibility = n ? t._visibility & -2 : t._visibility | 1, !n || a === null || f || Gl || el || (t = f || el, u = Gl, a = el, Gl = n || Gl, el = t, Bu(l, 2), Gl = u, el = a), !n && It || Mi(l, n)), e & 4 && (t = l.updateQueue, t !== null && (u = t.retryQueue, u !== null && (t.retryQueue = null, rf(l, u))));
        break;
      case 19:
        ft(t, l, u), ct(l), e & 4 && (t = l.updateQueue, t !== null && (l.updateQueue = null, rf(l, t)));
        break;
      case 30:
        e & 512 && (el || a === null || Fl(a, a.return)), e = K0(), n = je, f = (u & 335544064) === u, c = l.memoizedProps, je = f && cu(
          c.default,
          c.update
        ) !== "none", ft(t, l, u), ct(l), f && a !== null && ll && (l.flags |= 4), je = n, ll = e;
        break;
      case 21:
        break;
      case 7:
        e & 512 && (el || a === null || Fl(a, a.return)), a && a.stateNode !== null && (a.stateNode._fragmentFiber = l);
      default:
        ft(t, l, u), ct(l);
    }
  }
  function ct(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var u, a = l.return; a !== null; ) {
          if (vs(a)) {
            u = a;
            break;
          }
          a = a.return;
        }
        a = null;
        for (var e = l.return; e !== null; ) {
          if (di(e)) {
            var n = e.stateNode;
            a === null ? a = [n] : a.push(n);
          }
          if (yi(e)) break;
          e = e.return;
        }
        var f = a;
        if (u == null) throw Error(g(160));
        switch (u.tag) {
          case 27:
            var c = u.stateNode, i = Si(l);
            ff(
              l,
              i,
              c,
              f
            );
            break;
          case 5:
            var r = u.stateNode;
            u.flags & 32 && (Oa(r, ""), u.flags &= -33);
            var h = Si(l);
            ff(
              l,
              h,
              r,
              f
            );
            break;
          case 3:
          case 4:
            var T = u.stateNode.containerInfo, s = Si(l);
            _i(
              l,
              s,
              T,
              f
            );
            break;
          default:
            throw Error(g(161));
        }
      } catch (d) {
        cl(l, l.return, d);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function Ns(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        Ns(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, fe = !0, t.reset(), fe = !1), l = l.sibling;
      }
  }
  function Va(l, t) {
    if (t.subtreeFlags & 9270)
      for (t = t.child; t !== null; )
        Ms(t, l), t = t.sibling;
    else gs(t);
  }
  function Ms(l, t) {
    var u = l.alternate;
    if (u === null) Ti(l, !1);
    else
      switch (l.tag) {
        case 3:
          if (Ni = kt = !1, rs(), Va(t, l), !kt && !sf) {
            if (l = Wt, l !== null)
              for (var a = 0; a < l.length; a += 3) {
                u = l[a];
                var e = l[a + 1];
                ym(u, l[a + 2]), u = u.ownerDocument.documentElement, u !== null && u.animate(
                  { opacity: [0, 0], pointerEvents: ["none", "none"] },
                  {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition-group(" + e + ")"
                  }
                );
              }
            l = t.containerInfo, l = l.nodeType === 9 ? l.documentElement : l.ownerDocument.documentElement, l !== null && l.style.viewTransitionName === "" && (l.style.viewTransitionName = "none", l.animate(
              { opacity: [0, 0], pointerEvents: ["none", "none"] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition-group(root)"
              }
            ), l.animate(
              { width: [0, 0], height: [0, 0] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition"
              }
            )), Ni = !0;
          }
          Wt = null;
          break;
        case 5:
          Va(t, l);
          break;
        case 4:
          a = kt, kt = !1, Va(t, l), kt && (sf = !0), kt = a;
          break;
        case 22:
          l.memoizedState === null && (u.memoizedState !== null ? Ti(l, !1) : Va(t, l));
          break;
        case 30:
          a = kt, e = rs(), kt = !1, Va(t, l), kt && (l.flags |= 4);
          var n = l.memoizedProps, f = l.stateNode;
          t = fu(n, f), f = fu(u.memoizedProps, f);
          var c = cu(n.default, n.update);
          c === "none" ? t = !1 : (n = u.memoizedState, u.memoizedState = null, u = l.child, vt = 0, t = Oi(
            l,
            u,
            t,
            f,
            c,
            n,
            !0
          ), vt !== (n === null ? 0 : n.length) && (l.flags |= 32)), (l.flags & 4) !== 0 && t ? ($a(
            l,
            l.memoizedProps.onUpdate
          ), Wt = e) : e !== null && (e.push.apply(e, Wt), Wt = e), kt = (l.flags & 32) !== 0 ? !0 : a;
          break;
        default:
          Va(t, l);
      }
  }
  function Pt(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        _s(l, t.alternate, t), t = t.sibling;
  }
  function Bu(l, t) {
    for (l = l.child; l !== null; ) {
      var u = l, a = t;
      switch (u.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Yu(4, u, u.return), Bu(
            u,
            a
          );
          break;
        case 1:
          Fl(u, u.return);
          var e = u.stateNode;
          typeof e.componentWillUnmount == "function" && is(
            u,
            u.return,
            e
          ), Bu(
            u,
            a
          );
          break;
        case 27:
          (a & 2) !== 0 && Nm(
            u.stateNode,
            u.type,
            u.memoizedProps
          );
        case 5:
          Fl(u, u.return), u.tag !== 5 && u.tag !== 27 || Qe(u), Bu(
            u,
            a
          );
          break;
        case 6:
          Qe(u);
          break;
        case 26:
          Fl(u, u.return), e = u.stateNode, u.memoizedState !== null || e === null || el || e.parentNode.removeChild(e), Bu(
            u,
            a
          );
          break;
        case 22:
          u.memoizedState === null && Bu(
            u,
            a
          );
          break;
        case 30:
          Fl(u, u.return), Bu(
            u,
            a
          );
          break;
        case 7:
          Fl(u, u.return);
        default:
          Bu(
            u,
            a
          );
      }
      l = l.sibling;
    }
  }
  function Xt(l, t, u) {
    for (u = (t.subtreeFlags & 8772) !== 0 ? u : u & -2, t = t.child; t !== null; ) {
      var a = t.alternate, e = l, n = t, f = n.flags, c = (u & 1) !== 0;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Xt(
            e,
            n,
            u
          ), Xe(4, n);
          break;
        case 1:
          if (Xt(
            e,
            n,
            u
          ), a = n, e = a.stateNode, typeof e.componentDidMount == "function")
            try {
              e.componentDidMount();
            } catch (h) {
              cl(a, a.return, h);
            }
          if (a = n, e = a.updateQueue, e !== null) {
            var i = a.stateNode;
            try {
              var r = e.shared.hiddenCallbacks;
              if (r !== null)
                for (e.shared.hiddenCallbacks = null, e = 0; e < r.length; e++)
                  Wo(r[e], i);
            } catch (h) {
              cl(a, a.return, h);
            }
          }
          c && f & 64 && cs(n), Ft(n, n.return);
          break;
        case 27:
          (u & 2) !== 0 && ss(n);
        case 5:
          n.tag !== 5 && n.tag !== 27 || os(n), Xt(
            e,
            n,
            u
          ), c && a === null && f & 4 && hi(n), Ft(n, n.return);
          break;
        case 6:
          os(n);
          break;
        case 26:
          i = n.stateNode, n.memoizedState !== null || i === null || Gl || m0(
            $e(i.ownerDocument),
            n.type,
            i
          ), Xt(
            e,
            n,
            u
          ), c && a === null && f & 4 && hi(n), Ft(n, n.return);
          break;
        case 12:
          Xt(
            e,
            n,
            u
          );
          break;
        case 31:
          Xt(
            e,
            n,
            u
          ), c && f & 4 && zs(e, n);
          break;
        case 13:
          Xt(
            e,
            n,
            u
          ), c && f & 4 && Os(e, n);
          break;
        case 22:
          n.memoizedState === null && Xt(
            e,
            n,
            u
          ), Ft(n, n.return);
          break;
        case 30:
          Xt(
            e,
            n,
            u
          ), Ft(n, n.return);
          break;
        case 7:
          Ft(n, n.return);
        default:
          Xt(
            e,
            n,
            u
          );
      }
      t = t.sibling;
    }
  }
  function Ui(l, t) {
    var u = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== u && (l != null && l.refCount++, u != null && Ne(u));
  }
  function Ri(l, t) {
    l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Ne(l));
  }
  function Ht(l, t, u, a) {
    var e = (u & 335544064) === u;
    if (t.subtreeFlags & (e ? 10262 : 10256))
      for (t = t.child; t !== null; )
        Ds(
          l,
          t,
          u,
          a
        ), t = t.sibling;
    else e && hs(t);
  }
  function Ds(l, t, u, a) {
    var e = (u & 335544064) === u;
    e && t.alternate === null && t.return !== null && t.return.alternate !== null && vf(t);
    var n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Ht(
          l,
          t,
          u,
          a
        ), n & 2048 && Xe(9, t);
        break;
      case 1:
        Ht(
          l,
          t,
          u,
          a
        );
        break;
      case 3:
        Ht(
          l,
          t,
          u,
          a
        ), e && Ni && (l = l.containerInfo, l = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, l.style.viewTransitionName === "root" && (l.style.viewTransitionName = ""), l = l.ownerDocument.documentElement, l !== null && l.style.viewTransitionName === "none" && (l.style.viewTransitionName = "")), n & 2048 && (n = null, t.alternate !== null && (n = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== n && (t.refCount++, n != null && Ne(n)));
        break;
      case 12:
        if (n & 2048) {
          Ht(
            l,
            t,
            u,
            a
          ), n = t.stateNode;
          try {
            var f = t.memoizedProps, c = f.id, i = f.onPostCommit;
            typeof i == "function" && i(
              c,
              t.alternate === null ? "mount" : "update",
              n.passiveEffectDuration,
              -0
            );
          } catch (r) {
            cl(t, t.return, r);
          }
        } else
          Ht(
            l,
            t,
            u,
            a
          );
        break;
      case 31:
        Ht(
          l,
          t,
          u,
          a
        );
        break;
      case 13:
        Ht(
          l,
          t,
          u,
          a
        );
        break;
      case 23:
        break;
      case 22:
        f = t.stateNode, c = t.alternate, t.memoizedState !== null ? (e && c !== null && c.memoizedState === null && vf(c), f._visibility & 2 ? Ht(
          l,
          t,
          u,
          a
        ) : Ze(
          l,
          t
        )) : (e && c !== null && c.memoizedState !== null && vf(t), f._visibility & 2 ? Ht(
          l,
          t,
          u,
          a
        ) : (f._visibility |= 2, La(
          l,
          t,
          u,
          a,
          (t.subtreeFlags & 10256) !== 0 || !1
        ))), n & 2048 && Ui(c, t);
        break;
      case 24:
        Ht(
          l,
          t,
          u,
          a
        ), n & 2048 && Ri(t.alternate, t);
        break;
      case 30:
        e && (n = t.alternate, n !== null && ($t(n.child, !0), $t(t.child, !0))), Ht(
          l,
          t,
          u,
          a
        );
        break;
      default:
        Ht(
          l,
          t,
          u,
          a
        );
    }
  }
  function La(l, t, u, a, e) {
    for (e = e && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var n = l, f = t, c = u, i = a, r = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          La(
            n,
            f,
            c,
            i,
            e
          ), Xe(8, f);
          break;
        case 23:
          break;
        case 22:
          var h = f.stateNode;
          f.memoizedState !== null ? h._visibility & 2 ? La(
            n,
            f,
            c,
            i,
            e
          ) : Ze(
            n,
            f
          ) : (h._visibility |= 2, La(
            n,
            f,
            c,
            i,
            e
          )), e && r & 2048 && Ui(
            f.alternate,
            f
          );
          break;
        case 24:
          La(
            n,
            f,
            c,
            i,
            e
          ), e && r & 2048 && Ri(f.alternate, f);
          break;
        default:
          La(
            n,
            f,
            c,
            i,
            e
          );
      }
      t = t.sibling;
    }
  }
  function Ze(l, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var u = l, a = t, e = a.flags;
        switch (a.tag) {
          case 22:
            Ze(u, a), e & 2048 && Ui(
              a.alternate,
              a
            );
            break;
          case 24:
            Ze(u, a), e & 2048 && Ri(a.alternate, a);
            break;
          default:
            Ze(u, a);
        }
        t = t.sibling;
      }
  }
  var ma = 8192;
  function ra(l, t, u) {
    if (l.subtreeFlags & ma)
      for (l = l.child; l !== null; )
        Us(
          l,
          t,
          u
        ), l = l.sibling;
  }
  function Us(l, t, u) {
    switch (l.tag) {
      case 26:
        ra(
          l,
          t,
          u
        ), l.flags & ma && (l.memoizedState !== null ? wy(
          u,
          xt,
          l.memoizedState,
          l.memoizedProps
        ) : (l = l.stateNode, (t & 335544128) === t && pm(u, l)));
        break;
      case 5:
        ra(
          l,
          t,
          u
        ), l.flags & ma && (l = l.stateNode, (t & 335544128) === t && pm(u, l));
        break;
      case 3:
      case 4:
        var a = xt;
        xt = $e(l.stateNode.containerInfo), ra(
          l,
          t,
          u
        ), xt = a;
        break;
      case 22:
        l.memoizedState === null && (a = l.alternate, a !== null && a.memoizedState !== null ? (a = ma, ma = 16777216, ra(
          l,
          t,
          u
        ), ma = a) : ra(
          l,
          t,
          u
        ));
        break;
      case 30:
        if ((l.flags & ma) !== 0 && (a = l.memoizedProps.name, a != null && a !== "auto")) {
          var e = l.stateNode;
          e.paired = null, Tt === null && (Tt = /* @__PURE__ */ new Map()), Tt.set(a, e);
        }
        ra(
          l,
          t,
          u
        );
        break;
      default:
        ra(
          l,
          t,
          u
        );
    }
  }
  function Rs(l) {
    var t = l.alternate;
    if (t !== null && (l = t.child, l !== null)) {
      t.child = null;
      do
        t = l.sibling, l.sibling = null, l = t;
      while (l !== null);
    }
  }
  function Ve(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var u = 0; u < t.length; u++) {
          var a = t[u];
          xl = a, Hs(
            a,
            l
          );
        }
      Rs(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        Cs(l), l = l.sibling;
  }
  function Cs(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Ve(l), l.flags & 2048 && Yu(9, l, l.return);
        break;
      case 3:
        Ve(l);
        break;
      case 12:
        Ve(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, yf(l)) : Ve(l);
        break;
      default:
        Ve(l);
    }
  }
  function yf(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var u = 0; u < t.length; u++) {
          var a = t[u];
          xl = a, Hs(
            a,
            l
          );
        }
      Rs(l);
    }
    for (l = l.child; l !== null; ) {
      switch (t = l, t.tag) {
        case 0:
        case 11:
        case 15:
          Yu(8, t, t.return), yf(t);
          break;
        case 22:
          u = t.stateNode, u._visibility & 2 && (u._visibility &= -3, yf(t));
          break;
        default:
          yf(t);
      }
      l = l.sibling;
    }
  }
  function Hs(l, t) {
    for (; xl !== null; ) {
      var u = xl;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          Yu(8, u, t);
          break;
        case 23:
        case 22:
          if (u.memoizedState !== null && u.memoizedState.cachePool !== null) {
            var a = u.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Ne(u.memoizedState.cache);
      }
      if (a = u.child, a !== null) a.return = u, xl = a;
      else
        l: for (u = l; xl !== null; ) {
          a = xl;
          var e = a.sibling, n = a.return;
          if (Es(a), a === u) {
            xl = null;
            break l;
          }
          if (e !== null) {
            e.return = n, xl = e;
            break l;
          }
          xl = n;
        }
    }
  }
  var Zr = {
    getCacheForType: function(l) {
      var t = Kl(Nl), u = t.data.get(l);
      return u === void 0 && (u = l(), t.data.set(l, u)), u;
    },
    cacheSignal: function() {
      return Kl(Nl).controller.signal;
    }
  }, Vr = typeof WeakMap == "function" ? WeakMap : Map, al = 0, sl = null, K = null, w = 0, fl = 0, Et = null, pu = !1, Ka = !1, Ci = !1, hu = 0, El = 0, Gu = 0, ya = 0, df = 0, bt = 0, Ja = 0, Le = null, mt = null, Hi = !1, hf = 0, qs = 0, gf = 1 / 0, Sf = null, xu = null, Sl = 0, Qt = null, da = null, lu = 0, qi = 0, Yi = null, Ys = null, wa = null, Fa = null, Wa = null, Ke = 0, _f = null;
  function zt() {
    return (al & 2) !== 0 && w !== 0 ? w & -w : U.T !== null ? Li() : p0();
  }
  function Bs() {
    if (bt === 0)
      if ((w & 536870912) === 0 || V) {
        var l = mn;
        mn <<= 1, (mn & 3932160) === 0 && (mn = 262144), bt = l;
      } else bt = 536870912;
    return l = Jl.current, l !== null && (l.flags |= 32), bt;
  }
  function $a(l, t) {
    if (t != null) {
      var u = l.stateNode, a = u.ref;
      a === null && (a = u.ref = dm(
        fu(l.memoizedProps, u)
      )), Fa === null && (Fa = []), Fa.push(t.bind(null, a));
    }
  }
  function rt(l, t, u) {
    (l === sl && (fl === 2 || fl === 9) || l.cancelPendingCommit !== null) && (Ia(l, 0), Xu(
      l,
      w,
      bt,
      !1
    )), me(l, u), ((al & 2) === 0 || l !== sl) && (l === sl && ((al & 2) === 0 && (ya |= u), El === 4 && Xu(
      l,
      w,
      bt,
      !1
    )), tu(l));
  }
  function ps(l, t, u) {
    if ((al & 6) !== 0) throw Error(g(327));
    var a = !u && (t & 127) === 0 && (t & l.expiredLanes) === 0 || se(l, t), e = a ? Jr(l, t) : pi(l, t, !0), n = a;
    do {
      if (e === 0) {
        Ka && !a && Xu(l, t, 0, !1);
        break;
      } else {
        if (u = l.current.alternate, n && !Lr(u)) {
          e = pi(l, t, !1), n = !1;
          continue;
        }
        if (e === 2) {
          if (n = t, l.errorRecoveryDisabledLanes & n)
            var f = 0;
          else
            f = l.pendingLanes & -536870913, f = f !== 0 ? f : f & 536870912 ? 536870912 : 0;
          if (f !== 0) {
            t = f;
            l: {
              var c = l;
              e = Le;
              var i = c.current.memoizedState.isDehydrated;
              if (i && (Ia(c, f).flags |= 256), f = pi(
                c,
                f,
                !1
              ), f !== 2 && f !== 6) {
                if (Ci && !i) {
                  c.errorRecoveryDisabledLanes |= n, ya |= n, e = 4;
                  break l;
                }
                n = mt, mt = e, n !== null && (mt === null ? mt = n : mt.push.apply(
                  mt,
                  n
                ));
              }
              e = f;
            }
            if (n = !1, e !== 2) continue;
          }
        }
        if (e === 1) {
          Ia(l, 0), Xu(l, t, 0, !0);
          break;
        }
        l: {
          switch (a = l, n = e, n) {
            case 0:
            case 1:
              throw Error(g(345));
            case 4:
              if ((t & 4194048) !== t && (t & 62914560) !== t)
                break;
            case 6:
              Xu(
                a,
                t,
                bt,
                !pu
              );
              break l;
            case 2:
              mt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(g(329));
          }
          if ((t & 62914560) === t && (e = hf + 300 - yt(), 10 < e)) {
            if (Xu(
              a,
              t,
              bt,
              !pu
            ), yn(a, 0, !0) !== 0) break l;
            lu = t, a.timeoutHandle = t0(
              Gs.bind(
                null,
                a,
                u,
                mt,
                Sf,
                Hi,
                t,
                bt,
                ya,
                Ja,
                pu,
                n,
                "Throttled",
                -0,
                0
              ),
              e
            );
            break l;
          }
          Gs(
            a,
            u,
            mt,
            Sf,
            Hi,
            t,
            bt,
            ya,
            Ja,
            pu,
            n,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    tu(l);
  }
  function Gs(l, t, u, a, e, n, f, c, i, r, h, T, s, d) {
    l.timeoutHandle = -1;
    var b = t.subtreeFlags, M = (n & 335544064) === n;
    if (T = null, (M || b & 8192 || (b & 16785408) === 16785408) && (T = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: Kt
    }, Tt = null, Us(
      t,
      n,
      T
    ), M && (b = T, M = l.containerInfo, M = (M.nodeType === 9 ? M : M.ownerDocument).__reactViewTransition, M != null && (b.count++, b.waitingForViewTransition = !0, b = Pe.bind(b), M.finished.then(b, b))), b = (n & 62914560) === n ? hf - yt() : (n & 4194048) === n ? qs - yt() : 0, b = Fy(
      T,
      b
    ), b !== null)) {
      lu = n, l.cancelPendingCommit = b(
        Ks.bind(
          null,
          l,
          t,
          n,
          u,
          a,
          e,
          f,
          c,
          i,
          r,
          h,
          T,
          null,
          s,
          d
        )
      ), Xu(l, n, f, !r);
      return;
    }
    Ks(
      l,
      t,
      n,
      u,
      a,
      e,
      f,
      c,
      i,
      r,
      h,
      T
    );
  }
  function Lr(l) {
    for (var t = l; ; ) {
      var u = t.tag;
      if ((u === 0 || u === 11 || u === 15) && t.flags & 16384 && (u = t.updateQueue, u !== null && (u = u.stores, u !== null)))
        for (var a = 0; a < u.length; a++) {
          var e = u[a], n = e.getSnapshot;
          e = e.value;
          try {
            if (!St(n(), e)) return !1;
          } catch {
            return !1;
          }
        }
      if (u = t.child, t.subtreeFlags & 16384 && u !== null)
        u.return = t, t = u;
      else {
        if (t === l) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function Xu(l, t, u, a) {
    t = C0(l, t), t &= ~df, t &= ~ya, l.suspendedLanes |= t, l.pingedLanes &= ~t, a && (l.warmLanes |= t), a = l.expirationTimes;
    for (var e = t; 0 < e; ) {
      var n = 31 - ht(e), f = 1 << n;
      a[n] = -1, e &= ~f;
    }
    u !== 0 && q0(l, u, t);
  }
  function Tf() {
    return (al & 6) === 0 ? (Je(0), !1) : !0;
  }
  function Bi() {
    if (K !== null) {
      if (fl === 0)
        var l = K.return;
      else
        l = K, vu = ua = null, Vc(l), Ga = null, Ue = 0, l = K;
      for (; l !== null; )
        fs(l.alternate, l), l = l.return;
      K = null;
    }
  }
  function Ia(l, t) {
    var u = l.timeoutHandle;
    return u !== -1 && (l.timeoutHandle = -1, yy(u)), u = l.cancelPendingCommit, u !== null && (l.cancelPendingCommit = null, u()), lu = 0, Bi(), sl = l, K = u = iu(l.current, null), w = t, fl = 0, Et = null, pu = !1, Ka = se(l, t), Ci = !1, Ja = bt = df = ya = Gu = El = 0, mt = Le = null, Hi = !1, hu = C0(l, t), Mn(), u;
  }
  function xs(l, t) {
    Q = null, U.H = kn, t === pa || t === xn ? (t = Ko(), fl = 3) : t === Rc ? (t = Ko(), fl = 4) : fl = t === ei ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Et = t, K === null && (El = 1, Pn(
      l,
      Dt(t, l.current)
    ));
  }
  function Xs() {
    var l = Jl.current;
    return l === null ? !0 : (w & 4194048) === w ? Pl === null : (w & 62914560) === w || (w & 536870912) !== 0 ? l === Pl : !1;
  }
  function Qs() {
    var l = U.H;
    return U.H = kn, l === null ? kn : l;
  }
  function js() {
    var l = U.A;
    return U.A = Zr, l;
  }
  function Ef() {
    El = 4, pu || (w & 4194048) !== w && Jl.current !== null || (Ka = !0), (Gu & 134217727) === 0 && (ya & 134217727) === 0 || sl === null || Xu(
      sl,
      w,
      bt,
      !1
    );
  }
  function pi(l, t, u) {
    var a = al;
    al |= 2;
    var e = Qs(), n = js();
    (sl !== l || w !== t) && (Sf = null, Ia(l, t)), t = !1;
    var f = El;
    l: do
      try {
        if (fl !== 0 && K !== null) {
          var c = K, i = Et;
          switch (fl) {
            case 8:
              Bi(), f = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              Jl.current === null && (t = !0);
              var r = fl;
              if (fl = 0, Et = null, ka(l, c, i, r), u && Ka) {
                f = 0;
                break l;
              }
              break;
            default:
              r = fl, fl = 0, Et = null, ka(l, c, i, r);
          }
        }
        Kr(), f = El;
        break;
      } catch (h) {
        xs(l, h);
      }
    while (!0);
    return t && l.shellSuspendCounter++, vu = ua = null, al = a, U.H = e, U.A = n, K === null && (sl = null, w = 0, Mn()), f;
  }
  function Kr() {
    for (; K !== null; ) Zs(K);
  }
  function Jr(l, t) {
    var u = al;
    al |= 2;
    var a = Qs(), e = js();
    sl !== l || w !== t ? (Sf = null, gf = yt() + 500, Ia(l, t)) : Ka = se(
      l,
      t
    );
    l: do
      try {
        if (fl !== 0 && K !== null) {
          t = K;
          var n = Et;
          t: switch (fl) {
            case 1:
              fl = 0, Et = null, ka(l, t, n, 1);
              break;
            case 2:
            case 9:
              if (Vo(n)) {
                fl = 0, Et = null, Vs(t);
                break;
              }
              t = function() {
                fl !== 2 && fl !== 9 || sl !== l || (fl = 7), tu(l);
              }, n.then(t, t);
              break l;
            case 3:
              fl = 7;
              break l;
            case 4:
              fl = 5;
              break l;
            case 7:
              Vo(n) ? (fl = 0, Et = null, Vs(t)) : (fl = 0, Et = null, ka(l, t, n, 7));
              break;
            case 5:
              var f = null;
              switch (K.tag) {
                case 26:
                  f = K.memoizedState;
                case 5:
                case 27:
                  var c = K;
                  if (f ? Ym(f) : c.stateNode.complete) {
                    fl = 0, Et = null;
                    var i = c.sibling;
                    if (i !== null) K = i;
                    else {
                      var r = c.return;
                      r !== null ? (K = r, bf(r)) : K = null;
                    }
                    break t;
                  }
              }
              fl = 0, Et = null, ka(l, t, n, 5);
              break;
            case 6:
              fl = 0, Et = null, ka(l, t, n, 6);
              break;
            case 8:
              Bi(), El = 6;
              break l;
            default:
              throw Error(g(462));
          }
        }
        wr();
        break;
      } catch (h) {
        xs(l, h);
      }
    while (!0);
    return vu = ua = null, U.H = a, U.A = e, al = u, K !== null ? 0 : (sl = null, w = 0, Mn(), El);
  }
  function wr() {
    for (; K !== null && !v1(); )
      Zs(K);
  }
  function Zs(l) {
    var t = es(l.alternate, l, hu);
    l.memoizedProps = l.pendingProps, t === null ? bf(l) : K = t;
  }
  function Vs(l) {
    var t = l, u = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Iv(
          u,
          t,
          t.pendingProps,
          t.type,
          void 0,
          w
        );
        break;
      case 11:
        t = Iv(
          u,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          w
        );
        break;
      case 5:
        Vc(t);
        var a = t;
        a === pl && (V ? (qn(a), a.tag === 5 && a.stateNode != null && (rl = a.stateNode)) : (qn(a), V = !0));
      default:
        fs(u, t), t = K = Ho(t, hu), t = es(u, t, hu);
    }
    l.memoizedProps = l.pendingProps, t === null ? bf(l) : K = t;
  }
  function ka(l, t, u, a) {
    vu = ua = null, Vc(t), Ga = null, Ue = 0;
    var e = t.return;
    try {
      if (Yr(
        l,
        e,
        t,
        u,
        w
      )) {
        El = 1, Pn(
          l,
          Dt(u, l.current)
        ), K = null;
        return;
      }
    } catch (n) {
      if (e !== null) throw K = e, n;
      El = 1, Pn(
        l,
        Dt(u, l.current)
      ), K = null;
      return;
    }
    t.flags & 32768 ? (V || a === 1 ? l = !0 : Ka || (w & 536870912) !== 0 ? l = !1 : (pu = l = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Jl.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Ls(t, l)) : bf(t);
  }
  function bf(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        Ls(
          t,
          pu
        );
        return;
      }
      l = t.return;
      var u = xr(
        t.alternate,
        t,
        hu
      );
      if (u !== null) {
        K = u;
        return;
      }
      if (t = t.sibling, t !== null) {
        K = t;
        return;
      }
      K = t = l;
    } while (t !== null);
    El === 0 && (El = 5);
  }
  function Ls(l, t) {
    do {
      var u = Xr(l.alternate, l);
      if (u !== null) {
        u.flags &= 32767, K = u;
        return;
      }
      if (u = l.return, u !== null && (u.flags |= 32768, u.subtreeFlags = 0, u.deletions = null), !t && (l = l.sibling, l !== null)) {
        K = l;
        return;
      }
      K = l = u;
    } while (l !== null);
    El = 6, K = null;
  }
  function Ks(l, t, u, a, e, n, f, c, i, r, h, T) {
    l.cancelPendingCommit = null;
    do
      zf();
    while (Sl !== 0);
    if ((al & 6) !== 0) throw Error(g(327));
    if (t !== null) {
      if (t === l.current) throw Error(g(177));
      l === sl && (K = sl = null, w = 0), da = t, Qt = l, lu = u, Yi = e, Ys = a, Fr(
        l,
        t,
        u,
        f,
        c,
        i,
        T
      );
    }
  }
  function Fr(l, t, u, a, e, n, f) {
    var c = t.lanes | t.childLanes;
    if (qi = c, c |= gc, T1(
      l,
      u,
      c,
      a,
      e,
      n
    ), Fa = null, (u & 335544064) === u ? (Wa = br(l), a = 10262) : (Wa = null, a = 10256), (t.subtreeFlags & a) !== 0 || (t.flags & a) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, ly(vn, function() {
      return Qi(), null;
    })) : (l.callbackNode = null, l.callbackPriority = 0), cf = !1, a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
      a = U.T, U.T = null, e = x.p, x.p = 2, n = al, al |= 4;
      try {
        Qr(l, t, u);
      } finally {
        al = n, x.p = e, U.T = a;
      }
    }
    Sl = 1, cf ? wa = Ty(
      f,
      l.containerInfo,
      Wa,
      Gi,
      xi,
      $r,
      Xi,
      Qi,
      Wr
    ) : (Gi(), xi(), Xi());
  }
  function Wr(l) {
    if (Sl !== 0) {
      var t = Qt.onRecoverableError;
      t(l, { componentStack: null });
    }
  }
  function $r() {
    Sl === 3 && (Sl = 0, Ms(da, Qt), Sl = 4);
  }
  function Gi() {
    if (Sl === 1) {
      Sl = 0;
      var l = Qt, t = da, u = lu, a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        a = U.T, U.T = null;
        var e = x.p;
        x.p = 2;
        var n = al;
        al |= 4;
        try {
          je = sf = !1, As(t, l, u), u = ki;
          var f = bo(l.containerInfo), c = u.focusedElem, i = u.selectionRange;
          if (f !== c && c && c.ownerDocument && Eo(
            c.ownerDocument.documentElement,
            c
          )) {
            if (i !== null && mc(c)) {
              var r = i.start, h = i.end;
              if (h === void 0 && (h = r), "selectionStart" in c)
                c.selectionStart = r, c.selectionEnd = Math.min(
                  h,
                  c.value.length
                );
              else {
                var T = c.ownerDocument || document, s = T && T.defaultView || window;
                if (s.getSelection) {
                  var d = s.getSelection(), b = c.textContent.length, M = Math.min(i.start, b), j = i.end === void 0 ? M : Math.min(i.end, b);
                  !d.extend && M > j && (f = j, j = M, M = f);
                  var m = To(
                    c,
                    M
                  ), o = To(
                    c,
                    j
                  );
                  if (m && o && (d.rangeCount !== 1 || d.anchorNode !== m.node || d.anchorOffset !== m.offset || d.focusNode !== o.node || d.focusOffset !== o.offset)) {
                    var y = T.createRange();
                    y.setStart(m.node, m.offset), d.removeAllRanges(), M > j ? (d.addRange(y), d.extend(o.node, o.offset)) : (y.setEnd(o.node, o.offset), d.addRange(y));
                  }
                }
              }
            }
            for (T = [], d = c; d = d.parentNode; )
              d.nodeType === 1 && T.push({
                element: d,
                left: d.scrollLeft,
                top: d.scrollTop
              });
            for (typeof c.focus == "function" && c.focus(), c = 0; c < T.length; c++) {
              var _ = T[c];
              _.element.scrollLeft = _.left, _.element.scrollTop = _.top;
            }
          }
          fe = !!Ii, ki = Ii = null;
        } finally {
          al = n, x.p = e, U.T = a;
        }
      }
      l.current = t, Sl = 2;
    }
  }
  function xi() {
    if (Sl === 2) {
      Sl = 0;
      var l = Qt, t = da, u = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || u) {
        u = U.T, U.T = null;
        var a = x.p;
        x.p = 2;
        var e = al;
        al |= 4;
        try {
          _s(l, t.alternate, t);
        } finally {
          al = e, x.p = a, U.T = u;
        }
      }
      Sl = 3;
    }
  }
  function Xi() {
    if (Sl === 4 || Sl === 3) {
      Sl = 0;
      var l = wa;
      wa = null, s1();
      var t = Qt, u = da, a = lu, e = Ys, n = (a & 335544064) === a ? 10262 : 10256;
      if ((u.subtreeFlags & n) !== 0 || (u.flags & n) !== 0 ? Sl = 5 : (Sl = 0, da = Qt = null, Js(t, t.pendingLanes)), n = t.pendingLanes, n === 0 && (xu = null), Ff(a), u = u.stateNode, dt && typeof dt.onCommitFiberRoot == "function")
        try {
          dt.onCommitFiberRoot(
            ve,
            u,
            void 0,
            (u.current.flags & 128) === 128
          );
        } catch {
        }
      if (e !== null) {
        u = U.T, n = x.p, x.p = 2, U.T = null;
        try {
          for (var f = t.onRecoverableError, c = 0; c < e.length; c++) {
            var i = e[c];
            f(i.value, {
              componentStack: i.stack
            });
          }
        } finally {
          U.T = u, x.p = n;
        }
      }
      if (e = Fa, f = Wa, Wa = null, e !== null && (Fa = null, f === null && (f = []), l !== null))
        for (i = 0; i < e.length; i++)
          u = (0, e[i])(
            f
          ), u !== void 0 && l.finished.finally(u);
      (lu & 3) !== 0 && zf(), tu(t), n = t.pendingLanes, (a & 261930) !== 0 && (n & 42) !== 0 ? t === _f ? Ke++ : (Ke = 0, _f = t) : (Ke = 0, _f = null), Je(0);
    }
  }
  function Js(l, t) {
    (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, Ne(t)));
  }
  function zf() {
    return wa !== null && (wa.skipTransition(), wa = null), Gi(), xi(), Xi(), Qi();
  }
  function Qi() {
    if (Sl !== 5) return !1;
    var l = Qt, t = qi;
    qi = 0;
    var u = Ff(lu), a = U.T, e = x.p;
    try {
      x.p = 32 > u ? 32 : u, U.T = null, u = Yi, Yi = null;
      var n = Qt, f = lu;
      if (Sl = 0, da = Qt = null, lu = 0, (al & 6) !== 0) throw Error(g(331));
      var c = al;
      if (al |= 4, Cs(n.current), Ds(
        n,
        n.current,
        f,
        u
      ), al = c, Je(0, !1), dt && typeof dt.onPostCommitFiberRoot == "function")
        try {
          dt.onPostCommitFiberRoot(ve, n);
        } catch {
        }
      return !0;
    } finally {
      x.p = e, U.T = a, Js(l, t);
    }
  }
  function ws(l, t, u) {
    t = Dt(u, t), t = ai(l.stateNode, t, 2), l = Ru(l, t, 2), l !== null && (me(l, 2), tu(l));
  }
  function cl(l, t, u) {
    if (l.tag === 3)
      ws(l, l, u);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          ws(
            t,
            l,
            u
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (xu === null || !xu.has(a))) {
            l = Dt(u, l), u = Vv(2), a = Ru(t, u, 2), a !== null && (Lv(
              u,
              a,
              t,
              l
            ), me(a, 2), tu(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function ji(l, t, u) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new Vr();
      var e = /* @__PURE__ */ new Set();
      a.set(t, e);
    } else
      e = a.get(t), e === void 0 && (e = /* @__PURE__ */ new Set(), a.set(t, e));
    e.has(u) || (Ci = !0, e.add(u), l = Ir.bind(null, l, t, u), t.then(l, l));
  }
  function Ir(l, t, u) {
    var a = l.pingCache;
    a !== null && a.delete(t), l.pingedLanes |= l.suspendedLanes & u, l.warmLanes &= ~u, sl === l && (w & u) === u && ((El === 4 || El === 3 && (w & 62914560) === w && 300 > yt() - hf) && (al & 2) === 0 ? Ia(l, 0) : df |= u, Ja === w && (Ja = 0)), tu(l);
  }
  function Fs(l, t) {
    t === 0 && (t = H0()), l = Pu(l, t), l !== null && (me(l, t), tu(l));
  }
  function kr(l) {
    var t = l.memoizedState, u = 0;
    t !== null && (u = t.retryLane), Fs(l, u);
  }
  function Pr(l, t) {
    var u = 0;
    switch (l.tag) {
      case 31:
      case 13:
        var a = l.stateNode, e = l.memoizedState;
        e !== null && (u = e.retryLane);
        break;
      case 19:
        a = l.stateNode;
        break;
      case 22:
        a = l.stateNode._retryCache;
        break;
      default:
        throw Error(g(314));
    }
    a !== null && a.delete(t), Fs(l, u);
  }
  function ly(l, t) {
    return Lf(l, t);
  }
  var Pa = null, le = null, Zi = !1, Of = !1, Vi = !1, Qu = 0;
  function tu(l) {
    l !== le && l.next === null && (le === null ? Pa = le = l : le = le.next = l), Of = !0, Zi || (Zi = !0, uy());
  }
  function Je(l, t) {
    if (!Vi && Of) {
      Vi = !0;
      do
        for (var u = !1, a = Pa; a !== null; ) {
          if (l !== 0) {
            var e = a.pendingLanes;
            if (e === 0) var n = 0;
            else {
              var f = a.suspendedLanes, c = a.pingedLanes;
              n = (1 << 31 - ht(42 | l) + 1) - 1, n &= e & ~(f & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (u = !0, ks(a, n));
          } else
            n = w, n = yn(
              a,
              a === sl ? n : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (n & 3) === 0 || se(a, n) || (u = !0, ks(a, n));
          a = a.next;
        }
      while (u);
      Vi = !1;
    }
  }
  function ty() {
    Ws();
  }
  function Ws() {
    Of = Zi = !1;
    var l = 0;
    Qu !== 0 && ry() && (l = Qu);
    for (var t = yt(), u = null, a = Pa; a !== null; ) {
      var e = a.next, n = $s(a, t);
      n === 0 ? (a.next = null, u === null ? Pa = e : u.next = e, e === null && (le = u)) : (u = a, (l !== 0 || (n & 3) !== 0) && (Of = !0)), a = e;
    }
    Sl !== 0 && Sl !== 5 || Je(l), Qu !== 0 && (Qu = 0);
  }
  function $s(l, t) {
    for (var u = l.suspendedLanes, a = l.pingedLanes, e = l.expirationTimes, n = l.pendingLanes & -62914561; 0 < n; ) {
      var f = 31 - ht(n), c = 1 << f, i = e[f];
      i === -1 ? ((c & u) === 0 || (c & a) !== 0) && (e[f] = _1(c, t)) : i <= t && (l.expiredLanes |= c), n &= ~c;
    }
    if (t = sl, u = w, u = yn(
      l,
      l === t ? u : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a = l.callbackNode, u === 0 || l === t && (fl === 2 || fl === 9) || l.cancelPendingCommit !== null)
      return a !== null && a !== null && Kf(a), l.callbackNode = null, l.callbackPriority = 0;
    if ((u & 3) === 0 || se(l, u)) {
      if (t = u & -u, t === l.callbackPriority) return t;
      switch (a !== null && Kf(a), Ff(u)) {
        case 2:
        case 8:
          u = U0;
          break;
        case 32:
          u = vn;
          break;
        case 268435456:
          u = R0;
          break;
        default:
          u = vn;
      }
      return a = Is.bind(null, l), u = Lf(u, a), l.callbackPriority = t, l.callbackNode = u, t;
    }
    return a !== null && a !== null && Kf(a), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function Is(l, t) {
    if (Sl !== 0 && Sl !== 5)
      return l.callbackNode = null, l.callbackPriority = 0, null;
    var u = l.callbackNode;
    if (zf() && l.callbackNode !== u)
      return null;
    var a = w;
    return a = yn(
      l,
      l === sl ? a : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a === 0 ? null : (ps(l, a, t), $s(l, yt()), l.callbackNode != null && l.callbackNode === u ? Is.bind(null, l) : null);
  }
  function ks(l, t) {
    if (zf()) return null;
    ps(l, t, !0);
  }
  function uy() {
    dy(function() {
      (al & 6) !== 0 ? Lf(
        D0,
        ty
      ) : Ws();
    });
  }
  function Li() {
    if (Qu === 0) {
      var l = na;
      l === 0 && (l = sn, sn <<= 1, (sn & 261888) === 0 && (sn = 256)), Qu = l;
    }
    return Qu;
  }
  function Ps(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : _n(l);
  }
  function ay(l, t, u, a, e) {
    if (t === "submit" && u && u.stateNode === e) {
      var n = Ps(
        (e[it] || null).action
      ), f = a.submitter;
      f && (t = (t = f[it] || null) ? Ps(t.formAction) : f.getAttribute("formAction"), t !== null && (n = t, f = null));
      var c = new zn(
        "action",
        "action",
        null,
        a,
        e
      );
      l.push({
        event: c,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (Qu !== 0) {
                  var i = new FormData(e, f);
                  kc(
                    u,
                    {
                      pending: !0,
                      data: i,
                      method: e.method,
                      action: n
                    },
                    null,
                    i
                  );
                }
              } else
                typeof n == "function" && (c.preventDefault(), i = new FormData(e, f), kc(
                  u,
                  {
                    pending: !0,
                    data: i,
                    method: e.method,
                    action: n
                  },
                  n,
                  i
                ));
            },
            currentTarget: e
          }
        ]
      });
    }
  }
  for (var Ki = 0; Ki < hc.length; Ki++) {
    var Ji = hc[Ki], ey = Ji.toLowerCase(), ny = Ji[0].toUpperCase() + Ji.slice(1);
    pt(
      ey,
      "on" + ny
    );
  }
  pt(Ao, "onAnimationEnd"), pt(No, "onAnimationIteration"), pt(Mo, "onAnimationStart"), pt("dblclick", "onDoubleClick"), pt("focusin", "onFocus"), pt("focusout", "onBlur"), pt(yr, "onTransitionRun"), pt(dr, "onTransitionStart"), pt(hr, "onTransitionCancel"), pt(Do, "onTransitionEnd"), ba("onMouseEnter", ["mouseout", "mouseover"]), ba("onMouseLeave", ["mouseout", "mouseover"]), ba("onPointerEnter", ["pointerout", "pointerover"]), ba("onPointerLeave", ["pointerout", "pointerover"]), $u(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), $u(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), $u("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), $u(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), $u(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), $u(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var we = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), fy = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(we)
  );
  function lm(l, t) {
    t = (t & 4) !== 0;
    for (var u = 0; u < l.length; u++) {
      var a = l[u], e = a.event;
      a = a.listeners;
      l: {
        var n = void 0;
        if (t)
          for (var f = a.length - 1; 0 <= f; f--) {
            var c = a[f], i = c.instance, r = c.currentTarget;
            if (c = c.listener, i !== n && e.isPropagationStopped())
              break l;
            n = c, e.currentTarget = r;
            try {
              n(e);
            } catch (h) {
              Nn(h);
            }
            e.currentTarget = null, n = i;
          }
        else
          for (f = 0; f < a.length; f++) {
            if (c = a[f], i = c.instance, r = c.currentTarget, c = c.listener, i !== n && e.isPropagationStopped())
              break l;
            n = c, e.currentTarget = r;
            try {
              n(e);
            } catch (h) {
              Nn(h);
            }
            e.currentTarget = null, n = i;
          }
      }
    }
  }
  function J(l, t) {
    var u = t[x0];
    u === void 0 && (u = t[x0] = /* @__PURE__ */ new Set());
    var a = l + "__bubble";
    u.has(a) || (tm(t, l, 2, !1), u.add(a));
  }
  function wi(l, t, u) {
    var a = 0;
    t && (a |= 4), tm(
      u,
      l,
      a,
      t
    );
  }
  var Af = "_reactListening" + Math.random().toString(36).slice(2);
  function Fi(l) {
    if (!l[Af]) {
      l[Af] = !0, j0.forEach(function(u) {
        u !== "selectionchange" && (fy.has(u) || wi(u, !1, l), wi(u, !0, l));
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[Af] || (t[Af] = !0, wi("selectionchange", !1, t));
    }
  }
  function tm(l, t, u, a) {
    switch (Lm(t)) {
      case 2:
        var e = ky;
        break;
      case 8:
        e = Py;
        break;
      default:
        e = y0;
    }
    u = e.bind(
      null,
      t,
      u,
      l
    ), e = void 0, !uc || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (e = !0), a ? e !== void 0 ? l.addEventListener(t, u, {
      capture: !0,
      passive: e
    }) : l.addEventListener(t, u, !0) : e !== void 0 ? l.addEventListener(t, u, {
      passive: e
    }) : l.addEventListener(t, u, !1);
  }
  function Wi(l, t, u, a, e) {
    var n = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      l: for (; ; ) {
        if (a === null) return;
        var f = a.tag;
        if (f === 3 || f === 4) {
          var c = a.stateNode.containerInfo;
          if (c === e) break;
          if (f === 4)
            for (f = a.return; f !== null; ) {
              var i = f.tag;
              if ((i === 3 || i === 4) && f.stateNode.containerInfo === e)
                return;
              f = f.return;
            }
          for (; c !== null; ) {
            if (f = Wu(c), f === null) return;
            if (i = f.tag, i === 5 || i === 6 || i === 26 || i === 27) {
              a = n = f;
              continue l;
            }
            c = c.parentNode;
          }
        }
        a = a.return;
      }
    lo(function() {
      var r = n, h = lc(u), T = [];
      l: {
        var s = Uo.get(l);
        if (s !== void 0) {
          var d = zn, b = l;
          switch (l) {
            case "keypress":
              if (En(u) === 0) break l;
            case "keydown":
            case "keyup":
              d = L1;
              break;
            case "focusin":
              b = "focus", d = fc;
              break;
            case "focusout":
              b = "blur", d = fc;
              break;
            case "beforeblur":
            case "afterblur":
              d = fc;
              break;
            case "click":
              if (u.button === 2) break l;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              d = ao;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              d = H1;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              d = W1;
              break;
            case Ao:
            case No:
            case Mo:
              d = B1;
              break;
            case Do:
              d = I1;
              break;
            case "scroll":
            case "scrollend":
              d = R1;
              break;
            case "wheel":
              d = P1;
              break;
            case "copy":
            case "cut":
            case "paste":
              d = G1;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              d = no;
              break;
            case "submit":
              d = w1;
              break;
            case "toggle":
            case "beforetoggle":
              d = tr;
          }
          var M = (t & 4) !== 0, j = !M && (l === "scroll" || l === "scrollend"), m = M ? s !== null ? s + "Capture" : null : s;
          M = [];
          for (var o = r, y; o !== null; ) {
            var _ = o;
            if (y = _.stateNode, _ = _.tag, _ !== 5 && _ !== 26 && _ !== 27 || y === null || m === null || (_ = de(o, m), _ != null && M.push(
              Fe(o, _, y)
            )), j) break;
            o = o.return;
          }
          0 < M.length && (s = new d(
            s,
            b,
            null,
            u,
            h
          ), T.push({ event: s, listeners: M }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (d = l === "mouseover" || l === "pointerover", s = l === "mouseout" || l === "pointerout", d && u !== Pf && (b = u.relatedTarget || u.fromElement) && (Wu(b) || b[_a]))
            break l;
          (s || d) && (b = h.window === h ? h : (d = h.ownerDocument) ? d.defaultView || d.parentWindow : window, s ? (d = u.relatedTarget || u.toElement, s = r, d = d ? Wu(d) : null, d !== null && (j = _l(d), M = d.tag, d !== j || M !== 5 && M !== 27 && M !== 6) && (d = null)) : (s = null, d = r), s !== d && (M = ao, _ = "onMouseLeave", m = "onMouseEnter", o = "mouse", (l === "pointerout" || l === "pointerover") && (M = no, _ = "onPointerLeave", m = "onPointerEnter", o = "pointer"), j = s == null ? b : ye(s), y = d == null ? b : ye(d), b = new M(
            _,
            o + "leave",
            s,
            u,
            h
          ), b.target = j, b.relatedTarget = y, _ = null, Wu(h) === r && (M = new M(
            m,
            o + "enter",
            d,
            u,
            h
          ), M.target = y, M.relatedTarget = j, _ = M), j = _, M = s && d ? ql(
            s,
            d,
            cy
          ) : null, s !== null && um(
            T,
            b,
            s,
            M,
            !1
          ), d !== null && j !== null && um(
            T,
            j,
            d,
            M,
            !0
          )));
        }
        l: {
          if (s = r ? ye(r) : window, d = s.nodeName && s.nodeName.toLowerCase(), d === "select" || d === "input" && s.type === "file")
            var A = ro;
          else if (so(s))
            if (yo)
              A = sr;
            else {
              A = or;
              var F = ir;
            }
          else
            d = s.nodeName, !d || d.toLowerCase() !== "input" || s.type !== "checkbox" && s.type !== "radio" ? r && kf(r.elementType) && (A = ro) : A = vr;
          if (A && (A = A(l, r))) {
            mo(
              T,
              A,
              u,
              h
            );
            break l;
          }
          F && F(l, s, r);
        }
        switch (F = r ? ye(r) : window, l) {
          case "focusin":
            (so(F) || F.contentEditable === "true") && (Da = F, rc = r, ze = null);
            break;
          case "focusout":
            ze = rc = Da = null;
            break;
          case "mousedown":
            yc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            yc = !1, zo(T, u, h);
            break;
          case "selectionchange":
            if (rr) break;
          case "keydown":
          case "keyup":
            zo(T, u, h);
        }
        var R;
        if (ic)
          l: {
            switch (l) {
              case "compositionstart":
                var p = "onCompositionStart";
                break l;
              case "compositionend":
                p = "onCompositionEnd";
                break l;
              case "compositionupdate":
                p = "onCompositionUpdate";
                break l;
            }
            p = void 0;
          }
        else
          Ma ? oo(l, u) && (p = "onCompositionEnd") : l === "keydown" && u.keyCode === 229 && (p = "onCompositionStart");
        p && (fo && u.locale !== "ko" && (Ma || p !== "onCompositionStart" ? p === "onCompositionEnd" && Ma && (R = to()) : (Eu = h, ac = "value" in Eu ? Eu.value : Eu.textContent, Ma = !0)), F = Nf(r, p), 0 < F.length && (p = new eo(
          p,
          l,
          null,
          u,
          h
        ), T.push({ event: p, listeners: F }), R ? p.data = R : (R = vo(u), R !== null && (p.data = R)))), (R = ar ? er(l, u) : nr(l, u)) && (p = Nf(r, "onBeforeInput"), 0 < p.length && (F = new eo(
          "onBeforeInput",
          "beforeinput",
          null,
          u,
          h
        ), T.push({
          event: F,
          listeners: p
        }), F.data = R)), ay(
          T,
          l,
          r,
          u,
          h
        );
      }
      lm(T, t);
    });
  }
  function Fe(l, t, u) {
    return {
      instance: l,
      listener: t,
      currentTarget: u
    };
  }
  function Nf(l, t) {
    for (var u = t + "Capture", a = []; l !== null; ) {
      var e = l, n = e.stateNode;
      if (e = e.tag, e !== 5 && e !== 26 && e !== 27 || n === null || (e = de(l, u), e != null && a.unshift(
        Fe(l, e, n)
      ), e = de(l, t), e != null && a.push(
        Fe(l, e, n)
      )), l.tag === 3) return a;
      l = l.return;
    }
    return [];
  }
  function cy(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function um(l, t, u, a, e) {
    for (var n = t._reactName, f = []; u !== null && u !== a; ) {
      var c = u, i = c.alternate, r = c.stateNode;
      if (c = c.tag, i !== null && i === a) break;
      c !== 5 && c !== 26 && c !== 27 || r === null || (i = r, e ? (r = de(u, n), r != null && f.unshift(
        Fe(u, r, i)
      )) : e || (r = de(u, n), r != null && f.push(
        Fe(u, r, i)
      ))), u = u.return;
    }
    f.length !== 0 && l.push({ event: t, listeners: f });
  }
  var iy = /\r\n?/g, oy = /\u0000|\uFFFD/g;
  function am(l) {
    return (typeof l == "string" ? l : "" + l).replace(iy, `
`).replace(oy, "");
  }
  function em(l, t) {
    return t = am(t), am(l) === t;
  }
  function il(l, t, u, a, e, n) {
    switch (u) {
      case "children":
        if (typeof a == "string")
          t === "body" || t === "textarea" && a === "" || Oa(l, a);
        else if (typeof a == "number" || typeof a == "bigint")
          t !== "body" && Oa(l, "" + a);
        else return;
        break;
      case "className":
        Sn(l, "class", a);
        break;
      case "tabIndex":
        Sn(l, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Sn(l, u, a);
        break;
      case "style":
        k0(l, a, n);
        return;
      case "data":
        if (t !== "object") {
          Sn(l, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || u !== "href")) {
          l.removeAttribute(u);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(u);
          break;
        }
        a = _n(a), l.setAttribute(u, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          l.setAttribute(
            u,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof n == "function" && (u === "formAction" ? (t !== "input" && il(l, t, "name", e.name, e, null), il(
            l,
            t,
            "formEncType",
            e.formEncType,
            e,
            null
          ), il(
            l,
            t,
            "formMethod",
            e.formMethod,
            e,
            null
          ), il(
            l,
            t,
            "formTarget",
            e.formTarget,
            e,
            null
          )) : (il(l, t, "encType", e.encType, e, null), il(l, t, "method", e.method, e, null), il(l, t, "target", e.target, e, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(u);
          break;
        }
        a = _n(a), l.setAttribute(u, a);
        break;
      case "onClick":
        a != null && (l.onclick = Kt);
        return;
      case "onScroll":
        a != null && J("scroll", l);
        return;
      case "onScrollEnd":
        a != null && J("scrollend", l);
        return;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(g(61));
          if (u = a.__html, u != null) {
            if (e.children != null) throw Error(g(60));
            n?.__html !== u && (l.innerHTML = u);
          }
        }
        break;
      case "multiple":
        l.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        l.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
          l.removeAttribute("xlink:href");
          break;
        }
        u = _n(a), l.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          u
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(u, a) : l.removeAttribute(u);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "credentialless":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(u, "") : l.removeAttribute(u);
        break;
      case "capture":
      case "download":
        a === !0 ? l.setAttribute(u, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(u, a) : l.removeAttribute(u);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? l.setAttribute(u, a) : l.removeAttribute(u);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? l.removeAttribute(u) : l.setAttribute(u, a);
        break;
      case "popover":
        J("beforetoggle", l), J("toggle", l), gn(l, "popover", a);
        break;
      case "xlinkActuate":
        eu(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        eu(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        eu(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        eu(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        eu(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        eu(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        eu(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        eu(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        eu(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        gn(l, "is", a);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < u.length) || u[0] !== "o" && u[0] !== "O" || u[1] !== "n" && u[1] !== "N")
          u = D1.get(u) || u, gn(l, u, a);
        else return;
    }
    ll = !0;
  }
  function $i(l, t, u, a, e, n) {
    switch (u) {
      case "style":
        k0(l, a, n);
        return;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(g(61));
          if (u = a.__html, u != null) {
            if (e.children != null) throw Error(g(60));
            n?.__html !== u && (l.innerHTML = u);
          }
        }
        break;
      case "children":
        if (typeof a == "string") Oa(l, a);
        else if (typeof a == "number" || typeof a == "bigint")
          Oa(l, "" + a);
        else return;
        break;
      case "onScroll":
        a != null && J("scroll", l);
        return;
      case "onScrollEnd":
        a != null && J("scrollend", l);
        return;
      case "onClick":
        a != null && (l.onclick = Kt);
        return;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        return;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!Z0.hasOwnProperty(u))
          l: {
            if (u[0] === "o" && u[1] === "n" && (e = u.endsWith("Capture"), n = u.slice(2, e ? u.length - 7 : void 0), t = l[it] || null, t = t != null ? t[u] : null, typeof t == "function" && l.removeEventListener(n, t, e), typeof a == "function")) {
              typeof t != "function" && t !== null && (u in l ? l[u] = null : l.hasAttribute(u) && l.removeAttribute(u)), l.addEventListener(n, a, e);
              break l;
            }
            ll = !0, u in l ? l[u] = a : a === !0 ? l.setAttribute(u, "") : gn(l, u, a);
          }
        return;
    }
    ll = !0;
  }
  function Wl(l, t, u) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        J("error", l), J("load", l);
        var a = !1, e = !1, n;
        for (n in u)
          if (u.hasOwnProperty(n)) {
            var f = u[n];
            if (f != null)
              switch (n) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  e = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(g(137, t));
                default:
                  il(l, t, n, f, u, null);
              }
          }
        e && il(l, t, "srcSet", u.srcSet, u, null), a && il(l, t, "src", u.src, u, null);
        return;
      case "input":
        J("invalid", l);
        var c = n = f = e = null, i = null, r = null;
        for (a in u)
          if (u.hasOwnProperty(a)) {
            var h = u[a];
            if (h != null)
              switch (a) {
                case "name":
                  e = h;
                  break;
                case "type":
                  f = h;
                  break;
                case "checked":
                  i = h;
                  break;
                case "defaultChecked":
                  r = h;
                  break;
                case "value":
                  n = h;
                  break;
                case "defaultValue":
                  c = h;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (h != null)
                    throw Error(g(137, t));
                  break;
                default:
                  il(l, t, a, h, u, null);
              }
          }
        F0(
          l,
          n,
          c,
          i,
          r,
          f,
          e,
          !1
        );
        return;
      case "select":
        J("invalid", l), a = f = n = null;
        for (e in u)
          if (u.hasOwnProperty(e) && (c = u[e], c != null))
            switch (e) {
              case "value":
                n = c;
                break;
              case "defaultValue":
                f = c;
                break;
              case "multiple":
                a = c;
              default:
                il(l, t, e, c, u, null);
            }
        t = n, u = f, l.multiple = !!a, t != null ? za(l, !!a, t, !1) : u != null && za(l, !!a, u, !0);
        return;
      case "textarea":
        J("invalid", l), n = e = a = null;
        for (f in u)
          if (u.hasOwnProperty(f) && (c = u[f], c != null))
            switch (f) {
              case "value":
                a = c;
                break;
              case "defaultValue":
                e = c;
                break;
              case "children":
                n = c;
                break;
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(g(91));
                break;
              default:
                il(l, t, f, c, u, null);
            }
        $0(l, a, e, n);
        return;
      case "option":
        for (i in u)
          u.hasOwnProperty(i) && (a = u[i], a != null) && (i === "selected" ? l.selected = a && typeof a != "function" && typeof a != "symbol" : il(l, t, i, a, u, null));
        return;
      case "dialog":
        J("beforetoggle", l), J("toggle", l), J("cancel", l), J("close", l);
        break;
      case "iframe":
      case "object":
        J("load", l);
        break;
      case "video":
      case "audio":
        for (a = 0; a < we.length; a++)
          J(we[a], l);
        break;
      case "image":
        J("error", l), J("load", l);
        break;
      case "details":
        J("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        J("error", l), J("load", l);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (r in u)
          if (u.hasOwnProperty(r) && (a = u[r], a != null))
            switch (r) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(g(137, t));
              default:
                il(l, t, r, a, u, null);
            }
        return;
      default:
        if (kf(t)) {
          for (h in u)
            u.hasOwnProperty(h) && (a = u[h], a !== void 0 && $i(
              l,
              t,
              h,
              a,
              u,
              void 0
            ));
          return;
        }
    }
    for (c in u)
      u.hasOwnProperty(c) && (a = u[c], a != null && il(l, t, c, a, u, null));
  }
  var vy = {};
  function sy(l, t, u, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var e = null, n = null, f = null, c = null, i = null, r = null, h = null;
        for (d in u) {
          var T = u[d];
          if (u.hasOwnProperty(d) && T != null)
            switch (d) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                i = T;
              default:
                a.hasOwnProperty(d) || il(l, t, d, null, a, T);
            }
        }
        for (var s in a) {
          var d = a[s];
          if (T = u[s], a.hasOwnProperty(s) && (d != null || T != null))
            switch (s) {
              case "type":
                d !== T && (ll = !0), n = d;
                break;
              case "name":
                d !== T && (ll = !0), e = d;
                break;
              case "checked":
                d !== T && (ll = !0), r = d;
                break;
              case "defaultChecked":
                d !== T && (ll = !0), h = d;
                break;
              case "value":
                d !== T && (ll = !0), f = d;
                break;
              case "defaultValue":
                d !== T && (ll = !0), c = d;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (d != null)
                  throw Error(g(137, t));
                break;
              default:
                d !== T && il(
                  l,
                  t,
                  s,
                  d,
                  a,
                  T
                );
            }
        }
        $f(
          l,
          f,
          c,
          i,
          r,
          h,
          n,
          e
        );
        return;
      case "select":
        d = f = c = s = null;
        for (n in u)
          if (i = u[n], u.hasOwnProperty(n) && i != null)
            switch (n) {
              case "value":
                break;
              case "multiple":
                d = i;
              default:
                a.hasOwnProperty(n) || il(
                  l,
                  t,
                  n,
                  null,
                  a,
                  i
                );
            }
        for (e in a)
          if (n = a[e], i = u[e], a.hasOwnProperty(e) && (n != null || i != null))
            switch (e) {
              case "value":
                n !== i && (ll = !0), s = n;
                break;
              case "defaultValue":
                n !== i && (ll = !0), c = n;
                break;
              case "multiple":
                n !== i && (ll = !0), f = n;
              default:
                n !== i && il(
                  l,
                  t,
                  e,
                  n,
                  a,
                  i
                );
            }
        t = c, u = f, a = d, s != null ? za(l, !!u, s, !1) : !!a != !!u && (t != null ? za(l, !!u, t, !0) : za(l, !!u, u ? [] : "", !1));
        return;
      case "textarea":
        d = s = null;
        for (c in u)
          if (e = u[c], u.hasOwnProperty(c) && e != null && !a.hasOwnProperty(c))
            switch (c) {
              case "value":
                break;
              case "children":
                break;
              default:
                il(l, t, c, null, a, e);
            }
        for (f in a)
          if (e = a[f], n = u[f], a.hasOwnProperty(f) && (e != null || n != null))
            switch (f) {
              case "value":
                e !== n && (ll = !0), s = e;
                break;
              case "defaultValue":
                e !== n && (ll = !0), d = e;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (e != null) throw Error(g(91));
                break;
              default:
                e !== n && il(l, t, f, e, a, n);
            }
        W0(l, s, d);
        return;
      case "option":
        for (var b in u)
          s = u[b], u.hasOwnProperty(b) && s != null && !a.hasOwnProperty(b) && (b === "selected" ? l.selected = !1 : il(
            l,
            t,
            b,
            null,
            a,
            s
          ));
        for (i in a)
          s = a[i], d = u[i], a.hasOwnProperty(i) && s !== d && (s != null || d != null) && (i === "selected" ? (s !== d && (ll = !0), l.selected = s && typeof s != "function" && typeof s != "symbol") : il(
            l,
            t,
            i,
            s,
            a,
            d
          ));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var M in u)
          s = u[M], u.hasOwnProperty(M) && s != null && !a.hasOwnProperty(M) && il(l, t, M, null, a, s);
        for (r in a)
          if (s = a[r], d = u[r], a.hasOwnProperty(r) && s !== d && (s != null || d != null))
            switch (r) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (s != null)
                  throw Error(g(137, t));
                break;
              default:
                il(
                  l,
                  t,
                  r,
                  s,
                  a,
                  d
                );
            }
        return;
      default:
        if (kf(t)) {
          for (var j in u)
            s = u[j], u.hasOwnProperty(j) && s !== void 0 && !a.hasOwnProperty(j) && $i(
              l,
              t,
              j,
              void 0,
              a,
              s
            );
          for (h in a)
            s = a[h], d = u[h], !a.hasOwnProperty(h) || s === d || s === void 0 && d === void 0 || $i(
              l,
              t,
              h,
              s,
              a,
              d
            );
          return;
        }
    }
    for (var m in u)
      s = u[m], u.hasOwnProperty(m) && s != null && !a.hasOwnProperty(m) && il(l, t, m, null, a, s);
    for (T in a)
      s = a[T], d = u[T], !a.hasOwnProperty(T) || s === d || s == null && d == null || il(l, t, T, s, a, d);
  }
  function nm(l) {
    switch (l) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function my() {
    if (typeof performance.getEntriesByType == "function") {
      for (var l = 0, t = 0, u = performance.getEntriesByType("resource"), a = 0; a < u.length; a++) {
        var e = u[a], n = e.transferSize, f = e.initiatorType, c = e.duration;
        if (n && c && nm(f)) {
          for (f = 0, c = e.responseEnd, a += 1; a < u.length; a++) {
            var i = u[a], r = i.startTime;
            if (r > c) break;
            var h = i.transferSize, T = i.initiatorType;
            h && nm(T) && (i = i.responseEnd, f += h * (i < c ? 1 : (c - r) / (i - r)));
          }
          if (--a, t += 8 * (n + f) / (e.duration / 1e3), l++, 10 < l) break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
  }
  var Ii = null, ki = null;
  function We(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function fm(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function cm(l, t) {
    if (l === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return l === 1 && t === "foreignObject" ? 0 : l;
  }
  function im(l, t, u, a) {
    return u = We(
      u
    ).createElement(l), u[Ll] = a, u[it] = t, Wl(u, l, t), Bl(u), u;
  }
  function Pi(l, t) {
    return l === "textarea" || l === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var l0 = null;
  function ry() {
    var l = window.event;
    return l && l.type === "popstate" ? l === l0 ? !1 : (l0 = l, !0) : (l0 = null, !1);
  }
  var t0 = typeof setTimeout == "function" ? setTimeout : void 0, yy = typeof clearTimeout == "function" ? clearTimeout : void 0, om = typeof Promise == "function" ? Promise : void 0, vm = typeof requestAnimationFrame == "function" ? requestAnimationFrame : t0, dy = typeof queueMicrotask == "function" ? queueMicrotask : typeof om < "u" ? function(l) {
    return om.resolve(null).then(l).catch(hy);
  } : t0;
  function hy(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function ju(l) {
    return l === "head";
  }
  function sm(l, t) {
    var u = t, a = 0;
    do {
      var e = u.nextSibling;
      if (l.removeChild(u), e && e.nodeType === 8)
        if (u = e.data, u === "/$" || u === "/&") {
          if (a === 0) {
            l.removeChild(e), ce(t);
            return;
          }
          a--;
        } else if (u === "$" || u === "$?" || u === "$~" || u === "$!" || u === "&")
          a++;
        else if (u === "html")
          o0(
            l.ownerDocument.documentElement
          );
        else if (u === "head") {
          u = l.ownerDocument.head, o0(u);
          for (var n = u.firstChild; n; ) {
            var f = n.nextSibling, c = n.nodeName;
            n[re] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && n.rel.toLowerCase() === "stylesheet" || u.removeChild(n), n = f;
          }
        } else
          u === "body" && o0(l.ownerDocument.body);
      u = e;
    } while (u);
    ce(t);
  }
  function mm(l, t) {
    var u = l;
    l = 0;
    do {
      var a = u.nextSibling;
      if (u.nodeType === 1 ? t ? (u._stashedDisplay = u.style.display, u.style.display = "none") : (u.style.display = u._stashedDisplay || "", u.getAttribute("style") === "" && u.removeAttribute("style")) : u.nodeType === 3 && (t ? (u._stashedText = u.nodeValue, u.nodeValue = "") : u.nodeValue = u._stashedText || ""), a && a.nodeType === 8)
        if (u = a.data, u === "/$") {
          if (l === 0) break;
          l--;
        } else
          u !== "$" && u !== "$?" && u !== "$~" && u !== "$!" || l++;
      u = a;
    } while (u);
  }
  function rm(l, t, u) {
    if (t = CSS.escape(t) !== t ? "r-" + btoa(t).replace(/=/g, "") : t, l.style.viewTransitionName = t, u != null && (l.style.viewTransitionClass = u), u = getComputedStyle(l), u.display === "inline") {
      if (t = l.getClientRects(), t.length === 1) var a = 1;
      else
        for (var e = a = 0; e < t.length; e++) {
          var n = t[e];
          0 < n.width && 0 < n.height && a++;
        }
      a === 1 && (l = l.style, l.display = t.length === 1 ? "inline-block" : "block", l.marginTop = "-" + u.paddingTop, l.marginBottom = "-" + u.paddingBottom);
    }
  }
  function ym(l, t) {
    l = l.style, t = t.style;
    var u = t != null ? t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null : null;
    l.viewTransitionName = u == null || typeof u == "boolean" ? "" : ("" + u).trim(), u = t != null ? t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null : null, l.viewTransitionClass = u == null || typeof u == "boolean" ? "" : ("" + u).trim(), l.display === "inline-block" && (t == null ? l.display = l.margin = "" : (u = t.display, l.display = u == null || typeof u == "boolean" ? "" : u, u = t.margin, u != null ? l.margin = u : (u = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], l.marginTop = u == null || typeof u == "boolean" ? "" : u, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], l.marginBottom = t == null || typeof t == "boolean" ? "" : t)));
  }
  function gy(l, t, u) {
    return u = u.ownerDocument.defaultView, {
      rect: l,
      abs: t.position === "absolute" || t.position === "fixed",
      clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
      view: 0 <= l.bottom && 0 <= l.right && l.top <= u.innerHeight && l.left <= u.innerWidth
    };
  }
  function u0(l) {
    var t = l.getBoundingClientRect(), u = getComputedStyle(l);
    return gy(t, u, l);
  }
  function Sy(l) {
    return l.documentElement.clientHeight;
  }
  function _y(l) {
    this.addEventListener("load", l), this.addEventListener("error", l);
  }
  function Ty(l, t, u, a, e, n, f, c, i) {
    var r = t.nodeType === 9 ? t : t.ownerDocument;
    try {
      var h = r.startViewTransition({
        update: function() {
          var s = r.defaultView, d = s.navigation && s.navigation.transition, b = r.fonts.status;
          a();
          var M = [];
          if (b === "loaded" && (Sy(r), r.fonts.status === "loading" && M.push(r.fonts.ready)), b = M.length, l !== null)
            for (var j = l.suspenseyImages, m = 0, o = 0; o < j.length; o++) {
              var y = j[o];
              if (!y.complete) {
                var _ = y.getBoundingClientRect();
                if (0 < _.bottom && 0 < _.right && _.top < s.innerHeight && _.left < s.innerWidth) {
                  if (m += Bm(y), m > Uf) {
                    M.length = b;
                    break;
                  }
                  y = new Promise(
                    _y.bind(y)
                  ), M.push(y);
                }
              }
            }
          if (0 < M.length)
            return s = Promise.race([
              Promise.all(M),
              new Promise(function(A) {
                return setTimeout(A, 500);
              })
            ]).then(e, e), (d ? Promise.allSettled([d.finished, s]) : s).then(n, n);
          if (e(), d)
            return d.finished.then(
              n,
              n
            );
          n();
        },
        types: u
      });
      r.__reactViewTransition = h;
      var T = [];
      return h.ready.then(
        function() {
          for (var s = r.documentElement.getAnimations({
            subtree: !0
          }), d = 0; d < s.length; d++) {
            var b = s[d], M = b.effect, j = M.pseudoElement;
            if (j != null && j.startsWith("::view-transition")) {
              T.push(b), b = M.getKeyframes();
              for (var m = j = void 0, o = !0, y = 0; y < b.length; y++) {
                var _ = b[y], A = _.width;
                if (j === void 0) j = A;
                else if (j !== A) {
                  o = !1;
                  break;
                }
                if (A = _.height, m === void 0) m = A;
                else if (m !== A) {
                  o = !1;
                  break;
                }
                delete _.width, delete _.height, _.transform === "none" && delete _.transform;
              }
              o && j !== void 0 && m !== void 0 && (M.setKeyframes(b), o = getComputedStyle(
                M.target,
                M.pseudoElement
              ), o.width !== j || o.height !== m) && (o = b[0], o.width = j, o.height = m, o = b[b.length - 1], o.width = j, o.height = m, M.setKeyframes(b));
            }
          }
          f();
        },
        function(s) {
          r.__reactViewTransition === h && (r.__reactViewTransition = null);
          try {
            typeof s == "object" && s !== null && s.name === "InvalidStateError" && (s.message === "View transition was skipped because document visibility state is hidden." || s.message === "Skipping view transition because document visibility state has become hidden." || s.message === "Skipping view transition because viewport size changed." || s.message === "Transition was aborted because of invalid state") && (s = null), s !== null && i(s);
          } finally {
            a(), e(), f();
          }
        }
      ), h.finished.finally(function() {
        for (var s = 0; s < T.length; s++)
          T[s].cancel();
        r.__reactViewTransition === h && (r.__reactViewTransition = null), c();
      }), h;
    } catch {
      return a(), e(), f(), null;
    }
  }
  function ha(l, t) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + l + "(" + t + ")";
  }
  ha.prototype.animate = function(l, t) {
    return t = typeof t == "number" ? { duration: t } : Z({}, t), t.pseudoElement = this._selector, this._scope.animate(l, t);
  }, ha.prototype.getAnimations = function() {
    for (var l = this._scope, t = this._selector, u = l.getAnimations({ subtree: !0 }), a = [], e = 0; e < u.length; e++) {
      var n = u[e].effect;
      n !== null && n.target === l && n.pseudoElement === t && a.push(u[e]);
    }
    return a;
  }, ha.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function dm(l) {
    return {
      name: l,
      group: new ha("group", l),
      imagePair: new ha("image-pair", l),
      old: new ha("old", l),
      new: new ha("new", l)
    };
  }
  function Ot(l) {
    this._fragmentFiber = l, this._observers = this._eventListeners = null;
  }
  Ot.prototype.addEventListener = function(l, t, u) {
    var a = null, e = null;
    if (!(u != null && typeof u != "boolean" && (a = u.signal || null, a !== null && a.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var n = this._eventListeners;
      if (gm(n, l, t, u) === -1) {
        var f = this, c = t;
        u != null && typeof u != "boolean" && u.once === !0 && (c = function(i) {
          f.removeEventListener(
            l,
            t,
            u
          ), typeof t == "function" ? t.call(this, i) : t.handleEvent(i);
        }), a !== null && (e = f.removeEventListener.bind(
          f,
          l,
          t,
          u
        ), a.addEventListener("abort", e, { once: !0 }), e = a.removeEventListener.bind(a, "abort", e)), a = te(u), n.push({
          type: l,
          listener: t,
          optionsOrUseCapture: u,
          attachedListener: c,
          cleanup: e
        }), S(
          this._fragmentFiber.child,
          !1,
          Ey,
          l,
          c,
          a
        );
      }
      this._eventListeners = n;
    }
  };
  function Ey(l, t, u, a) {
    return tl(l).addEventListener(
      t,
      u,
      a
    ), !1;
  }
  Ot.prototype.removeEventListener = function(l, t, u) {
    var a = this._eventListeners;
    if (a !== null && (t = gm(
      a,
      l,
      t,
      u
    ), t !== -1)) {
      var e = a[t];
      u = e.attachedListener;
      var n = e.cleanup;
      e = te(e.optionsOrUseCapture), S(
        this._fragmentFiber.child,
        !1,
        by,
        l,
        u,
        e
      ), a.splice(t, 1), n !== null && n();
    }
  };
  function by(l, t, u, a) {
    return tl(l).removeEventListener(
      t,
      u,
      a
    ), !1;
  }
  function te(l) {
    return l != null && typeof l != "boolean" && (l.once === !0 || l.signal instanceof AbortSignal) ? { capture: l.capture, passive: l.passive } : l;
  }
  function hm(l) {
    return l == null ? "c=0" : typeof l == "boolean" ? "c=" + (l ? "1" : "0") : "c=" + (l.capture ? "1" : "0");
  }
  function gm(l, t, u, a) {
    if (l.length === 0) return -1;
    a = hm(a);
    for (var e = 0; e < l.length; e++) {
      var n = l[e];
      if (n.type === t && n.listener === u && hm(n.optionsOrUseCapture) === a)
        return e;
    }
    return -1;
  }
  Ot.prototype.dispatchEvent = function(l) {
    var t = Y(
      this._fragmentFiber
    );
    if (t === null) return !0;
    t = tl(t);
    var u = this._eventListeners;
    if (u !== null && 0 < u.length || !l.bubbles) {
      var a = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
      if (u)
        for (var e = 0; e < u.length; e++) {
          var n = u[e];
          a.addEventListener(
            n.type,
            n.attachedListener,
            te(n.optionsOrUseCapture)
          );
        }
      if (t.appendChild(a), l = a.dispatchEvent(l), u)
        for (e = 0; e < u.length; e++)
          n = u[e], a.removeEventListener(
            n.type,
            n.attachedListener,
            te(n.optionsOrUseCapture)
          );
      return t.removeChild(a), l;
    }
    return t.dispatchEvent(l);
  }, Ot.prototype.focus = function(l) {
    S(
      this._fragmentFiber.child,
      !0,
      Sm,
      l,
      void 0,
      void 0
    );
  };
  function Sm(l, t) {
    return l.tag === 6 ? !1 : (l = tl(l), Yy(l, t));
  }
  Ot.prototype.focusLast = function(l) {
    var t = [];
    S(
      this._fragmentFiber.child,
      !0,
      a0,
      t,
      void 0,
      void 0
    );
    for (var u = t.length - 1; 0 <= u && !Sm(t[u], l); u--) ;
  };
  function a0(l, t) {
    return t.push(l), !1;
  }
  Ot.prototype.blur = function() {
    var l = Y(
      this._fragmentFiber
    );
    l !== null && (l = tl(l), l = We(l).activeElement, l !== null && S(
      this._fragmentFiber.child,
      !1,
      zy,
      l,
      void 0,
      void 0
    ));
  };
  function zy(l, t) {
    return l.tag === 6 ? !1 : (l = tl(l), l === t || l.contains(t) ? (t.blur(), !0) : !1);
  }
  Ot.prototype.observeUsing = function(l) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(l), S(
      this._fragmentFiber.child,
      !1,
      Oy,
      l,
      void 0,
      void 0
    );
  };
  function Oy(l, t) {
    return l.tag === 6 || (l = tl(l), t.observe(l)), !1;
  }
  Ot.prototype.unobserveUsing = function(l) {
    var t = this._observers;
    if (t !== null && t.has(l)) {
      t.delete(l), S(
        this._fragmentFiber.child,
        !1,
        Ay,
        l,
        void 0,
        void 0
      );
      for (var u = t = 0; u < jt.length; u++) {
        var a = jt[u];
        a.fragmentInstance === this && a.observer === l ? l.unobserve(a.instance) : jt[t++] = a;
      }
      jt.length = t;
    }
  };
  function Ay(l, t) {
    return l.tag === 6 || (l = tl(l), t.unobserve(l)), !1;
  }
  var jt = [], e0 = !1;
  function Ny(l, t, u) {
    jt.push({
      fragmentInstance: l,
      observer: t,
      instance: u
    }), e0 || (e0 = !0, By(function() {
      e0 = !1;
      var a = jt;
      jt = [];
      for (var e = 0; e < a.length; e++) {
        var n = a[e];
        n.observer.unobserve(n.instance);
      }
    }));
  }
  Ot.prototype.getClientRects = function() {
    var l = [];
    return S(
      this._fragmentFiber.child,
      !1,
      My,
      l,
      void 0,
      void 0
    ), l;
  };
  function My(l, t) {
    if (l.tag === 6) {
      l = l.stateNode;
      var u = l.ownerDocument.createRange();
      u.selectNodeContents(l), t.push.apply(t, u.getClientRects());
    } else
      l = tl(l), t.push.apply(t, l.getClientRects());
    return !1;
  }
  Ot.prototype.getRootNode = function(l) {
    var t = Y(
      this._fragmentFiber
    );
    return t === null ? this : tl(t).getRootNode(l);
  }, Ot.prototype.compareDocumentPosition = function(l) {
    var t = Y(
      this._fragmentFiber
    );
    if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var u = [];
    S(
      this._fragmentFiber.child,
      !1,
      a0,
      u,
      void 0,
      void 0
    );
    var a = tl(t);
    if (u.length === 0) {
      if (u = a, bl(this._fragmentFiber)) {
        l: {
          for (t = this._fragmentFiber.return; t !== null; ) {
            if (t.tag === 4) {
              t = t.stateNode.containerInfo;
              break l;
            }
            if (t.tag === 3 || t.tag === 5 || t.tag === 27)
              break;
            t = t.return;
          }
          t = null;
        }
        t != null && (u = t);
      }
      t = this._fragmentFiber;
      var e = a = u.compareDocumentPosition(l);
      return u === l ? e = Node.DOCUMENT_POSITION_CONTAINS : a & Node.DOCUMENT_POSITION_CONTAINED_BY && (u = Il(t)[1], u === null ? e = Node.DOCUMENT_POSITION_PRECEDING : (l = tl(u).compareDocumentPosition(
        l
      ), e = l === 0 || l & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), e |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    t = tl(u[0]), e = tl(u[u.length - 1]);
    var n = bl(this._fragmentFiber) ? t.parentElement : a;
    if (n == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    a = n.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, n = n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var f = t.compareDocumentPosition(l), c = e.compareDocumentPosition(l), i = f & Node.DOCUMENT_POSITION_CONTAINED_BY || c & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return c = a && n && f & Node.DOCUMENT_POSITION_FOLLOWING && c & Node.DOCUMENT_POSITION_PRECEDING, t = a && t === l || n && e === l || i || c ? Node.DOCUMENT_POSITION_CONTAINED_BY : !a && t === l || !n && e === l ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : f, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Dy(
      t,
      this._fragmentFiber,
      u[0],
      u[u.length - 1],
      l
    ) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function Dy(l, t, u, a, e) {
    var n = Wu(e);
    if (l & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (u = !!n)
        l: {
          for (; n !== null; ) {
            if (n.tag === 7 && (n === t || n.alternate === t)) {
              u = !0;
              break l;
            }
            n = n.return;
          }
          u = !1;
        }
      return u;
    }
    if (l & Node.DOCUMENT_POSITION_CONTAINS) {
      if (n === null)
        return n = e.ownerDocument, e === n || e === n.documentElement || e === n.body;
      l: {
        for (n = t, t = Y(t); n !== null; ) {
          if (!(n.tag !== 5 && n.tag !== 3 && n.tag !== 27 || n !== t && n.alternate !== t)) {
            n = !0;
            break l;
          }
          n = n.return;
        }
        n = !1;
      }
      return n;
    }
    return l & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!n) && !(t = n === u) && (t = ql(
      u,
      n,
      tt
    ), t === null ? t = !1 : (S(
      t,
      !0,
      Hl,
      n,
      u
    ), n = kl, kl = null, t = n !== null)), t) : l & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!n) && !(t = n === a) && (t = ql(
      a,
      n,
      tt
    ), t === null ? t = !1 : (S(
      t,
      !0,
      Ql,
      n,
      a
    ), n = kl, Xl = kl = null, t = n !== null)), t) : !1;
  }
  function _m(l, t) {
    var u = l.ownerDocument.createRange();
    u.selectNodeContents(l), l = u.getBoundingClientRect(), window.scrollTo(
      window.scrollX + l.left,
      t ? window.scrollY + l.top : window.scrollY + l.bottom - window.innerHeight
    );
  }
  Ot.prototype.scrollIntoView = function(l) {
    if (typeof l == "object") throw Error(g(566));
    var t = [];
    S(
      this._fragmentFiber.child,
      !1,
      a0,
      t,
      void 0,
      void 0
    );
    var u = l !== !1;
    if (t.length === 0) {
      var a = Il(
        this._fragmentFiber
      );
      if (a = u ? a[1] || a[0] || Y(this._fragmentFiber) : a[0] || a[1], a === null) return;
      if (a.tag === 6) {
        l = tl(a), _m(l, u);
        return;
      }
      if (a = tl(a), a.nodeType !== 9) {
        if (a.nodeType === 11) {
          u = "host" in a ? a.host : null, u !== null && u.scrollIntoView(l);
          return;
        }
        a.scrollIntoView(l);
      }
    }
    for (a = u ? t.length - 1 : 0; a !== (u ? -1 : t.length); ) {
      var e = t[a];
      e.tag === 6 ? (e = tl(e), _m(e, u)) : tl(e).scrollIntoView(l), a += u ? -1 : 1;
    }
  };
  function Uy(l, t) {
    return l = tl(l), Tm(l, t), !1;
  }
  function Tm(l, t) {
    l.reactFragments == null && (l.reactFragments = /* @__PURE__ */ new Set()), l.reactFragments.add(t);
  }
  function Em(l, t) {
    var u = t._eventListeners;
    if (u !== null)
      for (var a = 0; a < u.length; a++) {
        var e = u[a];
        l.addEventListener(
          e.type,
          e.attachedListener,
          te(e.optionsOrUseCapture)
        );
      }
    l.nodeType !== 3 && (u = t._observers, u !== null && u.forEach(function(n) {
      for (var f = 0, c = 0; c < jt.length; c++) {
        var i = jt[c];
        (i.fragmentInstance !== t || i.observer !== n || i.instance !== l) && (jt[f++] = i);
      }
      jt.length = f, n.observe(l);
    }), Tm(l, t));
  }
  function Ry(l, t) {
    var u = t._eventListeners;
    if (u !== null)
      for (var a = 0; a < u.length; a++) {
        var e = u[a];
        l.removeEventListener(
          e.type,
          e.attachedListener,
          te(e.optionsOrUseCapture)
        );
      }
    l.nodeType !== 3 && (u = t._observers, u !== null && u.forEach(function(n) {
      typeof n.rootMargin == "string" ? Ny(
        t,
        n,
        l
      ) : n.unobserve(l);
    }), l.reactFragments != null && l.reactFragments.delete(t));
  }
  function n0(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var u = t;
      switch (t = t.nextSibling, u.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          n0(u), hn(u);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (u.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(u);
    }
  }
  function Cy(l, t, u, a) {
    for (; l.nodeType === 1; ) {
      var e = u;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden"))
          break;
      } else if (a) {
        if (!l[re])
          switch (t) {
            case "meta":
              if (!l.hasAttribute("itemprop")) break;
              return l;
            case "link":
              if (n = l.getAttribute("rel"), n === "stylesheet" && l.hasAttribute("data-precedence"))
                break;
              if (n !== e.rel || l.getAttribute("href") !== (e.href == null || e.href === "" ? null : e.href) || l.getAttribute("crossorigin") !== (e.crossOrigin == null ? null : e.crossOrigin) || l.getAttribute("title") !== (e.title == null ? null : e.title))
                break;
              return l;
            case "style":
              if (l.hasAttribute("data-precedence")) break;
              return l;
            case "script":
              if (n = l.getAttribute("src"), (n !== (e.src == null ? null : e.src) || l.getAttribute("type") !== (e.type == null ? null : e.type) || l.getAttribute("crossorigin") !== (e.crossOrigin == null ? null : e.crossOrigin)) && n && l.hasAttribute("async") && !l.hasAttribute("itemprop"))
                break;
              return l;
            default:
              return l;
          }
      } else if (t === "input" && l.type === "hidden") {
        var n = e.name == null ? null : "" + e.name;
        if (e.type === "hidden" && l.getAttribute("name") === n)
          return l;
      } else return l;
      if (l = qt(l.nextSibling), l === null) break;
    }
    return null;
  }
  function Hy(l, t, u) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !u || (l = qt(l.nextSibling), l === null)) return null;
    return l;
  }
  function bm(l, t) {
    for (; l.nodeType !== 8; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t || (l = qt(l.nextSibling), l === null)) return null;
    return l;
  }
  function f0(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function c0(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
  }
  function qy(l, t) {
    var u = l.ownerDocument;
    if (l.data === "$~") l._reactRetry = t;
    else if (l.data !== "$?" || u.readyState !== "loading")
      t();
    else {
      var a = function() {
        t(), u.removeEventListener("DOMContentLoaded", a);
      };
      u.addEventListener("DOMContentLoaded", a), l._reactRetry = a;
    }
  }
  function qt(l) {
    for (; l != null; l = l.nextSibling) {
      var t = l.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = l.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return l;
  }
  var i0 = null;
  function zm(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var u = l.data;
        if (u === "/$" || u === "/&") {
          if (t === 0)
            return qt(l.nextSibling);
          t--;
        } else
          u !== "$" && u !== "$!" && u !== "$?" && u !== "$~" && u !== "&" || t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function Om(l) {
    l = l.previousSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var u = l.data;
        if (u === "$" || u === "$!" || u === "$?" || u === "$~" || u === "&") {
          if (t === 0) return l;
          t--;
        } else u !== "/$" && u !== "/&" || t++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function Yy(l, t) {
    function u() {
      a = !0;
    }
    if (l.ownerDocument.activeElement === l) return !0;
    var a = !1;
    try {
      l.ownerDocument.addEventListener("focus", u, !0), (l.focus || HTMLElement.prototype.focus).call(l, t);
    } finally {
      l.ownerDocument.removeEventListener("focus", u, !0);
    }
    return a;
  }
  function By(l) {
    vm(function() {
      vm(function(t) {
        return l(t);
      });
    });
  }
  function Am(l, t, u) {
    switch (t = We(u), l) {
      case "html":
        if (l = t.documentElement, !l) throw Error(g(452));
        return l;
      case "head":
        if (l = t.head, !l) throw Error(g(453));
        return l;
      case "body":
        if (l = t.body, !l) throw Error(g(454));
        return l;
      default:
        throw Error(g(451));
    }
  }
  function Nm(l, t, u) {
    for (var a in u) {
      var e = u[a];
      u.hasOwnProperty(a) && e != null && il(l, t, a, null, vy, e);
    }
    u.dangerouslySetInnerHTML != null && (l.textContent = ""), l.onclick === Kt && (l.onclick = null), hn(l);
  }
  function o0(l) {
    for (var t = l.attributes; t.length; )
      l.removeAttributeNode(t[0]);
    hn(l);
  }
  var Yt = /* @__PURE__ */ new Map(), Mm = /* @__PURE__ */ new Set();
  function $e(l) {
    if (typeof l.getRootNode == "function") {
      var t = l.getRootNode();
      if (t.nodeType === 9 || t.nodeType === 11) return t;
    }
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  var gu = x.d;
  x.d = {
    f: py,
    r: Gy,
    D: xy,
    C: Xy,
    L: Qy,
    m: jy,
    X: Vy,
    S: Zy,
    M: Ly
  };
  function py() {
    var l = gu.f(), t = Tf();
    return l || t;
  }
  function Gy(l) {
    var t = Ta(l);
    t !== null && t.tag === 5 && t.type === "form" ? Uv(t) : gu.r(l);
  }
  var ue = typeof document > "u" ? null : document;
  function Dm(l, t, u) {
    var a = ue;
    if (a && typeof t == "string" && t) {
      var e = Nt(t);
      e = 'link[rel="' + l + '"][href="' + e + '"]', typeof u == "string" && (e += '[crossorigin="' + u + '"]'), Mm.has(e) || (Mm.add(e), l = { rel: l, crossOrigin: u, href: t }, a.querySelector(e) === null && (t = a.createElement("link"), Wl(t, "link", l), Bl(t), a.head.appendChild(t)));
    }
  }
  function xy(l) {
    gu.D(l), Dm("dns-prefetch", l, null);
  }
  function Xy(l, t) {
    gu.C(l, t), Dm("preconnect", l, t);
  }
  function Qy(l, t, u) {
    gu.L(l, t, u);
    var a = ue;
    if (a && l && t) {
      var e = 'link[rel="preload"][as="' + Nt(t) + '"]';
      t === "image" && u && u.imageSrcSet ? (e += '[imagesrcset="' + Nt(
        u.imageSrcSet
      ) + '"]', typeof u.imageSizes == "string" && (e += '[imagesizes="' + Nt(
        u.imageSizes
      ) + '"]')) : e += '[href="' + Nt(l) + '"]';
      var n = e;
      switch (t) {
        case "style":
          n = ae(l);
          break;
        case "script":
          n = ee(l);
      }
      if (!(Yt.has(n) || (l = Z(
        {
          rel: "preload",
          href: t === "image" && u && u.imageSrcSet ? void 0 : l,
          as: t
        },
        u
      ), Yt.set(n, l), a.querySelector(e) !== null || t === "style" && a.querySelector(Ie(n)) || t === "script" && a.querySelector(ke(n))))) {
        var f = a.createElement("link");
        Wl(f, "link", l), t === "style" && (f[dn] = !0, f.onload = f.onerror = function() {
          Q0(f);
        }), Bl(f), a.head.appendChild(f);
      }
    }
  }
  function jy(l, t) {
    gu.m(l, t);
    var u = ue;
    if (u && l) {
      var a = t && typeof t.as == "string" ? t.as : "script", e = 'link[rel="modulepreload"][as="' + Nt(a) + '"][href="' + Nt(l) + '"]', n = e;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = ee(l);
      }
      if (!Yt.has(n) && (l = Z({ rel: "modulepreload", href: l }, t), Yt.set(n, l), u.querySelector(e) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (u.querySelector(ke(n)))
              return;
        }
        a = u.createElement("link"), Wl(a, "link", l), Bl(a), u.head.appendChild(a);
      }
    }
  }
  function Zy(l, t, u) {
    gu.S(l, t, u);
    var a = ue;
    if (a && l) {
      var e = Ea(a).hoistableStyles, n = ae(l);
      t = t || "default";
      var f = e.get(n);
      if (!f) {
        var c = { loading: 0, preload: null };
        if (f = a.querySelector(
          Ie(n)
        ))
          c.loading = 5;
        else {
          l = Z(
            { rel: "stylesheet", href: l, "data-precedence": t },
            u
          ), (u = Yt.get(n)) && v0(l, u);
          var i = f = a.createElement("link");
          Bl(i), Wl(i, "link", l), i._p = new Promise(function(r, h) {
            i.onload = r, i.onerror = h;
          }), i.addEventListener("load", function() {
            c.loading |= 1;
          }), i.addEventListener("error", function() {
            c.loading |= 2;
          }), c.loading |= 4, Mf(f, t, a);
        }
        f = {
          type: "stylesheet",
          instance: f,
          count: 1,
          state: c
        }, e.set(n, f);
      }
    }
  }
  function Vy(l, t) {
    gu.X(l, t);
    var u = ue;
    if (u && l) {
      var a = Ea(u).hoistableScripts, e = ee(l), n = a.get(e);
      n || (n = u.querySelector(ke(e)), n || (l = Z({ src: l, async: !0 }, t), (t = Yt.get(e)) && s0(l, t), n = u.createElement("script"), Bl(n), Wl(n, "link", l), u.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(e, n));
    }
  }
  function Ly(l, t) {
    gu.M(l, t);
    var u = ue;
    if (u && l) {
      var a = Ea(u).hoistableScripts, e = ee(l), n = a.get(e);
      n || (n = u.querySelector(ke(e)), n || (l = Z({ src: l, async: !0, type: "module" }, t), (t = Yt.get(e)) && s0(l, t), n = u.createElement("script"), Bl(n), Wl(n, "link", l), u.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(e, n));
    }
  }
  function Um(l, t, u, a) {
    var e = (e = Su.current) ? $e(e) : null;
    if (!e) throw Error(g(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof u.precedence == "string" && typeof u.href == "string" ? (u = ae(u.href), t = Ea(
          e
        ).hoistableStyles, a = t.get(u), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, t.set(u, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (u.rel === "stylesheet" && typeof u.href == "string" && typeof u.precedence == "string") {
          l = ae(u.href);
          var n = Ea(
            e
          ).hoistableStyles, f = n.get(l);
          if (f || (e = e.ownerDocument || e, f = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, n.set(l, f), (n = e.querySelector(
            Ie(l)
          )) ? n._p || (f.instance = n, f.state.loading = 5) : (n = Yt.get(l), n || (n = {
            rel: "preload",
            as: "style",
            href: u.href,
            crossOrigin: u.crossOrigin,
            integrity: u.integrity,
            media: u.media,
            hrefLang: u.hrefLang,
            referrerPolicy: u.referrerPolicy
          }, Yt.set(l, n)), Ky(
            e,
            l,
            n,
            f.state
          ))), t && a === null)
            throw Error(g(528, ""));
          return f;
        }
        if (t && a !== null)
          throw Error(g(529, ""));
        return null;
      case "script":
        return t = u.async, u = u.src, typeof u == "string" && t && typeof t != "function" && typeof t != "symbol" ? (u = ee(u), t = Ea(
          e
        ).hoistableScripts, a = t.get(u), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, t.set(u, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(g(444, l));
    }
  }
  function ae(l) {
    return 'href="' + Nt(l) + '"';
  }
  function Ie(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function Rm(l) {
    return Z({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function Ky(l, t, u, a) {
    if (t = l.querySelector(
      'link[rel="preload"][as="style"][' + t + "]"
    )) {
      if (t[dn] !== !0) {
        a.loading = 1;
        return;
      }
    } else
      t = l.createElement("link"), t[dn] = !0, t.onload = t.onerror = Q0.bind(null, t), Wl(t, "link", u), Bl(t), l.head.appendChild(t);
    a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    });
  }
  function ee(l) {
    return '[src="' + Nt(l) + '"]';
  }
  function ke(l) {
    return "script[async]" + l;
  }
  function Cm(l, t, u) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = l.querySelector(
            'style[data-href~="' + Nt(u.href) + '"]'
          );
          if (a)
            return t.instance = a, Bl(a), a;
          var e = Z({}, u, {
            "data-href": u.href,
            "data-precedence": u.precedence,
            href: null,
            precedence: null
          });
          return a = (l.ownerDocument || l).createElement(
            "style"
          ), Bl(a), Wl(a, "style", e), Mf(a, u.precedence, l), t.instance = a;
        case "stylesheet":
          e = ae(u.href);
          var n = l.querySelector(
            Ie(e)
          );
          if (n)
            return t.state.loading |= 4, t.instance = n, Bl(n), n;
          a = Rm(u), (e = Yt.get(e)) && v0(a, e), n = (l.ownerDocument || l).createElement("link"), Bl(n);
          var f = n;
          return f._p = new Promise(function(c, i) {
            f.onload = c, f.onerror = i;
          }), Wl(n, "link", a), t.state.loading |= 4, Mf(n, u.precedence, l), t.instance = n;
        case "script":
          return n = ee(u.src), (e = l.querySelector(
            ke(n)
          )) ? (t.instance = e, Bl(e), e) : (a = u, (e = Yt.get(n)) && (a = Z({}, u), s0(a, e)), l = l.ownerDocument || l, e = l.createElement("script"), Bl(e), Wl(e, "link", a), l.head.appendChild(e), t.instance = e);
        case "void":
          return null;
        default:
          throw Error(g(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, Mf(a, u.precedence, l));
    return t.instance;
  }
  function Mf(l, t, u) {
    for (var a = u.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), e = a.length ? a[a.length - 1] : null, n = e, f = 0; f < a.length; f++) {
      var c = a[f];
      if (c.dataset.precedence === t) n = c;
      else if (n !== e) break;
    }
    n ? n.parentNode.insertBefore(l, n.nextSibling) : (t = u.nodeType === 9 ? u.head : u, t.insertBefore(l, t.firstChild));
  }
  function v0(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
  }
  function s0(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
  }
  var Df = null;
  function Hm(l, t, u) {
    if (Df === null) {
      var a = /* @__PURE__ */ new Map(), e = Df = /* @__PURE__ */ new Map();
      e.set(u, a);
    } else
      e = Df, a = e.get(u), a || (a = /* @__PURE__ */ new Map(), e.set(u, a));
    if (a.has(l)) return a;
    for (a.set(l, null), u = u.getElementsByTagName(l), e = 0; e < u.length; e++) {
      var n = u[e];
      if (!(n[re] || n[Ll] || l === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var f = n.getAttribute(t) || "";
        f = l + f;
        var c = a.get(f);
        c ? c.push(n) : a.set(f, [n]);
      }
    }
    return a;
  }
  function m0(l, t, u) {
    l = l.ownerDocument || l, l.head.insertBefore(
      u,
      t === "title" ? l.querySelector("head > title") : null
    );
  }
  function Jy(l, t, u) {
    if (u === 1 || t.itemProp != null) return !1;
    switch (l) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
          break;
        return !0;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
          break;
        return t.rel === "stylesheet" ? (l = t.disabled, typeof t.precedence == "string" && l == null) : !0;
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function qm(l, t) {
    return l === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
  }
  function Ym(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function Bm(l) {
    return (l.width || 100) * (l.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function pm(l, t) {
    typeof t.decode == "function" && (l.imgCount++, t.complete || (l.imgBytes += Bm(t), l.suspenseyImages.push(t)), l = Wy.bind(l), t.decode().then(l, l));
  }
  function wy(l, t, u, a) {
    if (u.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (u.state.loading & 4) === 0) {
      if (u.instance === null) {
        var e = ae(a.href), n = t.querySelector(
          Ie(e)
        );
        if (n) {
          t = n._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = Pe.bind(l), t.then(l, l)), u.state.loading |= 4, u.instance = n, Bl(n);
          return;
        }
        n = t.ownerDocument || t, a = Rm(a), (e = Yt.get(e)) && v0(a, e), n = n.createElement("link"), Bl(n);
        var f = n;
        f._p = new Promise(function(c, i) {
          f.onload = c, f.onerror = i;
        }), Wl(n, "link", a), u.instance = n;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(u, t), (t = u.state.preload) && (u.state.loading & 3) === 0 && (l.count++, u = Pe.bind(l), t.addEventListener("load", u), t.addEventListener("error", u));
    }
  }
  var Uf = 0;
  function Fy(l, t) {
    return l.stylesheets && l.count === 0 && Cf(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(u) {
      var a = setTimeout(function() {
        if (l.stylesheets && Cf(l, l.stylesheets), l.unsuspend) {
          var n = l.unsuspend;
          l.unsuspend = null, n();
        }
      }, 6e4 + t);
      0 < l.imgBytes && Uf === 0 && (Uf = 62500 * my());
      var e = setTimeout(
        function() {
          if (l.waitingForImages = !1, l.count === 0 && (l.stylesheets && Cf(l, l.stylesheets), l.unsuspend)) {
            var n = l.unsuspend;
            l.unsuspend = null, n();
          }
        },
        (l.imgBytes > Uf ? 50 : 800) + t
      );
      return l.unsuspend = u, function() {
        l.unsuspend = null, clearTimeout(a), clearTimeout(e);
      };
    } : null;
  }
  function Gm(l) {
    if (l.count === 0 && (l.imgCount === 0 || !l.waitingForImages)) {
      if (l.stylesheets) Cf(l, l.stylesheets);
      else if (l.unsuspend) {
        var t = l.unsuspend;
        l.unsuspend = null, t();
      }
    }
  }
  function Pe() {
    this.count--, Gm(this);
  }
  function Wy() {
    this.imgCount--, Gm(this);
  }
  var Rf = null;
  function Cf(l, t) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, Rf = /* @__PURE__ */ new Map(), t.forEach($y, l), Rf = null, Pe.call(l));
  }
  function $y(l, t) {
    if (!(t.state.loading & 4)) {
      var u = Rf.get(l);
      if (u) var a = u.get(null);
      else {
        u = /* @__PURE__ */ new Map(), Rf.set(l, u);
        for (var e = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), n = 0; n < e.length; n++) {
          var f = e[n];
          (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") && (u.set(f.dataset.precedence, f), a = f);
        }
        a && u.set(null, a);
      }
      e = t.instance, f = e.getAttribute("data-precedence"), n = u.get(f) || a, n === a && u.set(null, e), u.set(f, e), this.count++, a = Pe.bind(this), e.addEventListener("load", a), e.addEventListener("error", a), n ? n.parentNode.insertBefore(e, n.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(e, l.firstChild)), t.state.loading |= 4;
    }
  }
  var ne = {
    $$typeof: zl,
    Provider: null,
    Consumer: null,
    _currentValue: uu,
    _currentValue2: uu,
    _threadCount: 0
  };
  function Iy(l, t, u, a, e, n, f, c, i) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Jf(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Jf(0), this.hiddenUpdates = Jf(null), this.identifierPrefix = a, this.onUncaughtError = e, this.onCaughtError = n, this.onRecoverableError = f, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = i, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function xm(l, t, u, a, e, n, f, c, i, r, h, T) {
    return l = new Iy(
      l,
      t,
      u,
      f,
      i,
      r,
      h,
      T,
      c
    ), t = 1, n === !0 && (t |= 24), n = ot(3, null, null, t), l.current = n, n.stateNode = l, t = Mc(), t.refCount++, l.pooledCache = t, t.refCount++, n.memoizedState = {
      element: a,
      isDehydrated: u,
      cache: t
    }, Cc(n), l;
  }
  function Xm(l) {
    return l ? (l = Ca, l) : Ca;
  }
  function Qm(l, t, u, a, e, n) {
    e = Xm(e), a.context === null ? a.context = e : a.pendingContext = e, a = Uu(t), a.payload = { element: u }, n = n === void 0 ? null : n, n !== null && (a.callback = n), u = Ru(l, a, t), u !== null && (rt(u, l, t), Re(u, l, t));
  }
  function jm(l, t) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var u = l.retryLane;
      l.retryLane = u !== 0 && u < t ? u : t;
    }
  }
  function r0(l, t) {
    jm(l, t), (l = l.alternate) && jm(l, t);
  }
  function Zm(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = Pu(l, 67108864);
      t !== null && rt(t, l, 67108864), r0(l, 67108864);
    }
  }
  function Vm(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = zt();
      t = wf(t);
      var u = Pu(l, t);
      u !== null && rt(u, l, t), r0(l, t);
    }
  }
  var fe = !0;
  function ky(l, t, u, a) {
    var e = U.T;
    U.T = null;
    var n = x.p;
    try {
      x.p = 2, y0(l, t, u, a);
    } finally {
      x.p = n, U.T = e;
    }
  }
  function Py(l, t, u, a) {
    var e = U.T;
    U.T = null;
    var n = x.p;
    try {
      x.p = 8, y0(l, t, u, a);
    } finally {
      x.p = n, U.T = e;
    }
  }
  function y0(l, t, u, a) {
    if (fe) {
      var e = d0(a);
      if (e === null)
        Wi(
          l,
          t,
          a,
          Hf,
          u
        ), Km(l, a);
      else if (td(
        e,
        l,
        t,
        u,
        a
      ))
        a.stopPropagation();
      else if (Km(l, a), t & 4 && -1 < ld.indexOf(l)) {
        for (; e !== null; ) {
          var n = Ta(e);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                  var f = Fu(n.pendingLanes);
                  if (f !== 0) {
                    var c = n;
                    for (c.pendingLanes |= 2, c.entangledLanes |= 2; f; ) {
                      var i = 1 << 31 - ht(f);
                      c.entanglements[1] |= i, f &= ~i;
                    }
                    tu(n), (al & 6) === 0 && (gf = yt() + 500, Je(0));
                  }
                }
                break;
              case 31:
              case 13:
                c = Pu(n, 2), c !== null && rt(c, n, 2), Tf(), r0(n, 2);
            }
          if (n = d0(a), n === null && Wi(
            l,
            t,
            a,
            Hf,
            u
          ), n === e) break;
          e = n;
        }
        e !== null && a.stopPropagation();
      } else
        Wi(
          l,
          t,
          a,
          null,
          u
        );
    }
  }
  function d0(l) {
    return l = lc(l), h0(l);
  }
  var Hf = null;
  function h0(l) {
    if (Hf = null, l = Wu(l), l !== null) {
      var t = _l(l);
      if (t === null) l = null;
      else {
        var u = t.tag;
        if (u === 13) {
          if (l = nl(t), l !== null) return l;
          l = null;
        } else if (u === 31) {
          if (l = lt(t), l !== null) return l;
          l = null;
        } else if (u === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return Hf = l, null;
  }
  function Lm(l) {
    switch (l) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "fullscreenerror":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "resize":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (m1()) {
          case D0:
            return 2;
          case U0:
            return 8;
          case vn:
          case r1:
            return 32;
          case R0:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var g0 = !1, Zu = null, Vu = null, Lu = null, ln = /* @__PURE__ */ new Map(), tn = /* @__PURE__ */ new Map(), Ku = [], ld = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Km(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        Zu = null;
        break;
      case "dragenter":
      case "dragleave":
        Vu = null;
        break;
      case "mouseover":
      case "mouseout":
        Lu = null;
        break;
      case "pointerover":
      case "pointerout":
        ln.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        tn.delete(t.pointerId);
    }
  }
  function un(l, t, u, a, e, n) {
    return l === null || l.nativeEvent !== n ? (l = {
      blockedOn: t,
      domEventName: u,
      eventSystemFlags: a,
      nativeEvent: n,
      targetContainers: [e]
    }, t !== null && (t = Ta(t), t !== null && Zm(t)), l) : (l.eventSystemFlags |= a, t = l.targetContainers, e !== null && t.indexOf(e) === -1 && t.push(e), l);
  }
  function td(l, t, u, a, e) {
    switch (t) {
      case "focusin":
        return Zu = un(
          Zu,
          l,
          t,
          u,
          a,
          e
        ), !0;
      case "dragenter":
        return Vu = un(
          Vu,
          l,
          t,
          u,
          a,
          e
        ), !0;
      case "mouseover":
        return Lu = un(
          Lu,
          l,
          t,
          u,
          a,
          e
        ), !0;
      case "pointerover":
        var n = e.pointerId;
        return ln.set(
          n,
          un(
            ln.get(n) || null,
            l,
            t,
            u,
            a,
            e
          )
        ), !0;
      case "gotpointercapture":
        return n = e.pointerId, tn.set(
          n,
          un(
            tn.get(n) || null,
            l,
            t,
            u,
            a,
            e
          )
        ), !0;
    }
    return !1;
  }
  function Jm(l) {
    var t = Wu(l.target);
    if (t !== null) {
      var u = _l(t);
      if (u !== null) {
        if (t = u.tag, t === 13) {
          if (t = nl(u), t !== null) {
            l.blockedOn = t, G0(l.priority, function() {
              Vm(u);
            });
            return;
          }
        } else if (t === 31) {
          if (t = lt(u), t !== null) {
            l.blockedOn = t, G0(l.priority, function() {
              Vm(u);
            });
            return;
          }
        } else if (t === 3 && u.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = u.tag === 3 ? u.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function qf(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var u = d0(l.nativeEvent);
      if (u === null) {
        u = l.nativeEvent;
        var a = new u.constructor(
          u.type,
          u
        );
        Pf = a, u.target.dispatchEvent(a), Pf = null;
      } else
        return t = Ta(u), t !== null && Zm(t), l.blockedOn = u, !1;
      t.shift();
    }
    return !0;
  }
  function wm(l, t, u) {
    qf(l) && u.delete(t);
  }
  function ud() {
    g0 = !1, Zu !== null && qf(Zu) && (Zu = null), Vu !== null && qf(Vu) && (Vu = null), Lu !== null && qf(Lu) && (Lu = null), ln.forEach(wm), tn.forEach(wm);
  }
  function Yf(l, t) {
    l.blockedOn === t && (l.blockedOn = null, g0 || (g0 = !0, N.unstable_scheduleCallback(
      N.unstable_NormalPriority,
      ud
    )));
  }
  var Bf = null;
  function Fm(l) {
    Bf !== l && (Bf = l, N.unstable_scheduleCallback(
      N.unstable_NormalPriority,
      function() {
        Bf === l && (Bf = null);
        for (var t = 0; t < l.length; t += 3) {
          var u = l[t], a = l[t + 1], e = l[t + 2];
          if (typeof a != "function") {
            if (h0(a || u) === null)
              continue;
            break;
          }
          var n = Ta(u);
          n !== null && (l.splice(t, 3), t -= 3, kc(
            n,
            {
              pending: !0,
              data: e,
              method: u.method,
              action: a
            },
            a,
            e
          ));
        }
      }
    ));
  }
  function ce(l) {
    function t(i) {
      return Yf(i, l);
    }
    Zu !== null && Yf(Zu, l), Vu !== null && Yf(Vu, l), Lu !== null && Yf(Lu, l), ln.forEach(t), tn.forEach(t);
    for (var u = 0; u < Ku.length; u++) {
      var a = Ku[u];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < Ku.length && (u = Ku[0], u.blockedOn === null); )
      Jm(u), u.blockedOn === null && Ku.shift();
    if (u = (l.ownerDocument || l).$$reactFormReplay, u != null)
      for (a = 0; a < u.length; a += 3) {
        var e = u[a], n = u[a + 1], f = e[it] || null;
        if (typeof n == "function")
          f || Fm(u);
        else if (f) {
          var c = null;
          if (n && n.hasAttribute("formAction")) {
            if (e = n, f = n[it] || null)
              c = f.formAction;
            else if (h0(e) !== null) continue;
          } else c = f.action;
          typeof c == "function" ? u[a + 1] = c : (u.splice(a, 3), a -= 3), Fm(u);
        }
      }
  }
  function Wm() {
    function l(n) {
      n.canIntercept && n.info === "react-transition" && n.intercept({
        handler: function() {
          return new Promise(function(f) {
            return e = f;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      e !== null && (e(), e = null), a || setTimeout(u, 20);
    }
    function u() {
      if (!a && !navigation.transition) {
        var n = navigation.currentEntry;
        n && n.url != null && navigation.navigate(n.url, {
          state: n.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var a = !1, e = null;
      return navigation.addEventListener("navigate", l), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(u, 100), function() {
        a = !0, navigation.removeEventListener("navigate", l), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), e !== null && (e(), e = null);
      };
    }
  }
  function S0(l) {
    this._internalRoot = l;
  }
  pf.prototype.render = S0.prototype.render = function(l) {
    var t = this._internalRoot;
    if (t === null) throw Error(g(409));
    var u = t.current, a = zt();
    Qm(u, a, l, t, null, null);
  }, pf.prototype.unmount = S0.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      Qm(l.current, 2, null, l, null, null), Tf(), t[_a] = null;
    }
  };
  function pf(l) {
    this._internalRoot = l;
  }
  pf.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var t = p0();
      l = { blockedOn: null, target: l, priority: t };
      for (var u = 0; u < Ku.length && t !== 0 && t < Ku[u].priority; u++) ;
      Ku.splice(u, 0, l), u === 0 && Jm(l);
    }
  };
  var $m = hl.version;
  if ($m !== "19.3.0")
    throw Error(
      g(
        527,
        $m,
        "19.3.0"
      )
    );
  x.findDOMNode = function(l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function" ? Error(g(188)) : (l = Object.keys(l).join(","), Error(g(268, l)));
    return l = Al(t), l = l !== null ? B(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var ad = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: U,
    reconcilerVersion: "19.3.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Gf = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Gf.isDisabled && Gf.supportsFiber)
      try {
        ve = Gf.inject(
          ad
        ), dt = Gf;
      } catch {
      }
  }
  return en.createRoot = function(l, t) {
    if (!O(l)) throw Error(g(299));
    var u = !1, a = "", e = Xv, n = Qv, f = jv;
    return t != null && (t.unstable_strictMode === !0 && (u = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (e = t.onUncaughtError), t.onCaughtError !== void 0 && (n = t.onCaughtError), t.onRecoverableError !== void 0 && (f = t.onRecoverableError)), t = xm(
      l,
      1,
      !1,
      null,
      null,
      u,
      a,
      null,
      e,
      n,
      f,
      Wm
    ), l[_a] = t.current, Fi(l), new S0(t);
  }, en.hydrateRoot = function(l, t, u) {
    if (!O(l)) throw Error(g(299));
    var a = !1, e = "", n = Xv, f = Qv, c = jv, i = null;
    return u != null && (u.unstable_strictMode === !0 && (a = !0), u.identifierPrefix !== void 0 && (e = u.identifierPrefix), u.onUncaughtError !== void 0 && (n = u.onUncaughtError), u.onCaughtError !== void 0 && (f = u.onCaughtError), u.onRecoverableError !== void 0 && (c = u.onRecoverableError), u.formState !== void 0 && (i = u.formState)), t = xm(
      l,
      1,
      !0,
      t,
      u ?? null,
      a,
      e,
      i,
      n,
      f,
      c,
      Wm
    ), t.context = Xm(null), u = t.current, a = zt(), a = wf(a), e = Uu(a), e.callback = null, Ru(u, e, a), u = a, t.current.lanes = u, me(t, u), tu(t), l[_a] = t.current, Fi(l), new pf(t);
  }, en.version = "19.3.0", en;
}
var f1;
function rd() {
  if (f1) return T0.exports;
  f1 = 1;
  function N() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(N);
      } catch (hl) {
        console.error(hl);
      }
  }
  return N(), T0.exports = md(), T0.exports;
}
var yd = rd(), c1 = A0();
const dd = `attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`, hd = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec3 u_colors[8];
uniform vec4 u_scene;
uniform vec4 u_shape;
uniform vec4 u_surface;
uniform vec4 u_finish;
uniform vec4 u_transform;
uniform vec4 u_space;
uniform vec4 u_cursor;

#define u_resolution u_scene.xy
#define u_time u_scene.z
#define u_colorCount u_scene.w
#define u_scale u_shape.x
#define u_intensity u_shape.y
#define u_paramA u_shape.z
#define u_warp u_shape.w
#define u_detail u_surface.x
#define u_contrast u_surface.y
#define u_brightness u_surface.z
#define u_saturation u_surface.w
#define u_hue u_finish.x
#define u_vignette u_finish.y
#define u_blur u_finish.z
#define u_grain u_finish.w
#ifdef GL_FRAGMENT_PRECISION_HIGH
#define u_seed u_transform.x
#else
#define u_seed mod(u_transform.x, 31.0)
#endif
#define u_rotate u_transform.y
#define u_drift u_transform.z
#define u_oklab u_transform.w
#define u_offset u_space.xy
#define u_mouse u_space.zw
#define u_cursorPresence u_cursor.x
#define u_cursorEffect u_cursor.y
#define u_cursorStrength u_cursor.z
#define u_cursorRadius u_cursor.w

float hash21(vec2 p) {
#ifndef GL_FRAGMENT_PRECISION_HIGH
  p = mod(p, 31.0);
#endif
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float grainHash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec2 hash22(vec2 p) {
#ifndef GL_FRAGMENT_PRECISION_HIGH
  p = mod(p, 31.0);
#endif
  float n = sin(dot(p, vec2(41.0, 289.0)));
  return fract(vec2(15731.743, 7892.321) * n);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
    u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(17.0, 9.2);
    a *= 0.5;
  }
  return v;
}

vec3 srgbToLinear(vec3 c) {
  return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)),
    step(0.04045, c));
}

vec3 linearToSrgb(vec3 c) {
  return mix(c * 12.92, 1.055 * pow(max(c, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055,
    step(0.0031308, c));
}

vec3 linToOklab(vec3 c) {
  float l = 0.4122214708 * c.r + 0.5363325363 * c.g + 0.0514459929 * c.b;
  float m = 0.2119034982 * c.r + 0.6806995451 * c.g + 0.1073969566 * c.b;
  float s = 0.0883024619 * c.r + 0.2817188376 * c.g + 0.6299787005 * c.b;
  l = pow(max(l, 0.0), 1.0 / 3.0);
  m = pow(max(m, 0.0), 1.0 / 3.0);
  s = pow(max(s, 0.0), 1.0 / 3.0);
  return vec3(
    0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s);
}

vec3 oklabToLin(vec3 c) {
  float l = c.x + 0.3963377774 * c.y + 0.2158037573 * c.z;
  float m = c.x - 0.1055613458 * c.y - 0.0638541728 * c.z;
  float s = c.x - 0.0894841775 * c.y - 1.2914855480 * c.z;
  l = l * l * l; m = m * m * m; s = s * s * s;
  return vec3(
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s);
}

vec3 mixColour(vec3 a, vec3 b, float t) {
  if (u_oklab > 0.5) {
    vec3 la = linToOklab(srgbToLinear(a));
    vec3 lb = linToOklab(srgbToLinear(b));
    return clamp(linearToSrgb(oklabToLin(mix(la, lb, t))), 0.0, 1.0);
  }
  return mix(a, b, t);
}

vec3 palette(float x) {
  float n = max(u_colorCount - 1.0, 1.0);
  float f = clamp(x, 0.0, 1.0) * n;
  vec3 col = u_colors[0];
  for (int i = 0; i < 7; i++) {
    if (float(i) < n)
      col = mixColour(col, u_colors[i + 1],
        smoothstep(0.0, 1.0, clamp(f - float(i), 0.0, 1.0)));
  }
  return col;
}

vec3 hueRotate(vec3 col, float a) {
  const mat3 toYIQ = mat3(0.299, 0.596, 0.211,
                          0.587, -0.274, -0.523,
                          0.114, -0.322, 0.312);
  const mat3 toRGB = mat3(1.0, 1.0, 1.0,
                          0.956, -0.272, -1.106,
                          0.621, -0.647, 1.703);
  vec3 yiq = toYIQ * col;
  float ca = cos(a), sa = sin(a);
  yiq = vec3(yiq.x, yiq.y * ca - yiq.z * sa, yiq.y * sa + yiq.z * ca);
  return toRGB * yiq;
}

vec3 shade(vec2 uv, vec2 p, float t) {
  vec3 acc = u_colors[0] * 0.15;
  float total = 0.15;
  for (int i = 0; i < 8; i++) {
    if (float(i) >= u_colorCount) break;
    float fi = float(i);
    vec2 c = vec2(
      sin(t * (0.21 + fi * 0.071) + fi * 2.4 + u_seed),
      cos(t * (0.17 + fi * 0.093) + fi * 1.7)) * (0.45 + u_intensity * 0.35);
    float w = exp(-dot(p - c, p - c) * 6.0);
    acc += u_colors[i] * w;
    total += w;
  }
  return acc / total;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 screenUv = uv;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy)
    / min(u_resolution.x, u_resolution.y);
  float cursorMask = 0.0;

  if (u_cursorPresence > 0.001) {
    vec2 cursor = (0.5 * u_mouse * u_resolution.xy)
      / min(u_resolution.x, u_resolution.y);
    vec2 cursorDelta = p - cursor;
    if (u_cursorEffect < 0.5) {
      p += cursor * u_cursorPresence * u_cursorStrength * 0.55;
    } else {
      float cursorDistance = length(cursorDelta);
      vec2 cursorDirection = cursorDelta / max(cursorDistance, 0.0001);
      cursorMask = u_cursorPresence
        * (1.0 - smoothstep(0.0, u_cursorRadius, cursorDistance));
      if (u_cursorEffect < 1.5) {
        p -= cursorDirection * cursorMask * u_cursorStrength * 0.24;
      } else if (u_cursorEffect < 2.5) {
        float cursorAngle = cursorMask * u_cursorStrength * 2.2;
        float cc = cos(cursorAngle), cs = sin(cursorAngle);
        p = cursor + mat2(cc, -cs, cs, cc) * cursorDelta;
      } else if (u_cursorEffect < 3.5) {
        float ripple = sin(
          cursorDistance / max(u_cursorRadius, 0.001) * 18.0 - u_time * 5.0);
        p -= cursorDirection * ripple * cursorMask * u_cursorStrength * 0.07;
      }
    }
  }

  uv = p * min(u_resolution.x, u_resolution.y) / u_resolution.xy + 0.5;
  p *= u_scale;

  if (abs(u_rotate) > 0.0001) {
    float cr = cos(u_rotate), sr = sin(u_rotate);
    p = mat2(cr, -sr, sr, cr) * p;
  }

  p += u_offset;

  if (u_drift > 0.0001)
    p += u_drift * vec2(sin(u_time * 0.31), cos(u_time * 0.23));

  if (u_warp > 0.0) {
    p += u_warp * (vec2(
      fbm(p * u_detail + u_seed),
      fbm(p * u_detail + vec2(5.2, 1.3))) - 0.5);
  }

  vec3 col;
  if (u_blur > 0.0) {
    float e = u_blur;
    float pe = e * u_scale;
    vec2 uvE = vec2(e) * min(u_resolution.x, u_resolution.y) / u_resolution.xy;
    col  = shade(uv, p, u_time) * 0.36;
    col += shade(uv + vec2(uvE.x, 0.0), p + vec2(pe, 0.0), u_time) * 0.16;
    col += shade(uv - vec2(uvE.x, 0.0), p - vec2(pe, 0.0), u_time) * 0.16;
    col += shade(uv + vec2(0.0, uvE.y), p + vec2(0.0, pe), u_time) * 0.16;
    col += shade(uv - vec2(0.0, uvE.y), p - vec2(0.0, pe), u_time) * 0.16;
  } else {
    col = shade(uv, p, u_time);
  }

  if (abs(u_contrast - 1.0) > 0.0001)
    col = (col - 0.5) * u_contrast + 0.5;

  if (abs(u_saturation - 1.0) > 0.0001) {
    float luma = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(luma), col, u_saturation);
  }

  if (abs(u_hue) > 0.0001)
    col = hueRotate(col, u_hue);

  if (abs(u_brightness) > 0.0001)
    col += u_brightness;

  if (u_vignette > 0.0001) {
    float vd = length(screenUv - 0.5) * 1.41421356;
    col *= 1.0 - u_vignette * smoothstep(0.35, 1.0, vd);
  }

  if (u_cursorPresence > 0.001 && u_cursorEffect > 3.5)
    col += (vec3(0.18) + col * 0.12) * cursorMask * u_cursorStrength;

  if (u_grain > 0.0001)
    col += (grainHash(
      gl_FragCoord.xy + vec2(u_seed * 17.0, u_seed * 31.0)) - 0.5) * u_grain;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`, vl = {
  colors: [[0.011764705882352941, 0.07058823529411765, 0.054901960784313725], [0.054901960784313725, 0.48627450980392156, 0.35294117647058826], [0.48627450980392156, 0.8980392156862745, 0.4666666666666667], [0.9568627450980393, 1, 0.7803921568627451], [0.9568627450980393, 1, 0.7803921568627451], [0.9568627450980393, 1, 0.7803921568627451], [0.9568627450980393, 1, 0.7803921568627451], [0.9568627450980393, 1, 0.7803921568627451]],
  colorCount: 4,
  scale: 1.16,
  intensity: 0.34,
  paramA: 0.5,
  warp: 0,
  detail: 2.4,
  contrast: 1.158,
  brightness: 0,
  saturation: 1,
  hue: 0,
  vignette: 0,
  blur: 0,
  grain: 0.091,
  seed: 1453,
  rotate: 0,
  offsetX: 0,
  offsetY: 0,
  drift: 0,
  cursorEffect: 2,
  cursorStrength: 0.65,
  cursorRadius: 0.46,
  oklab: 0,
  timeScale: 0.727
}, nn = /* @__PURE__ */ new WeakMap();
function gd({ className: N }) {
  const hl = c1.useRef(null);
  return c1.useEffect(() => {
    const G = hl.current;
    if (!G) return;
    const g = nn.get(G);
    g !== void 0 && window.clearTimeout(g), nn.delete(G);
    const O = G.getContext("webgl", { antialias: !1 });
    if (!O) return;
    const _l = (D, q) => {
      const L = O.createShader(D);
      return O.shaderSource(L, q), O.compileShader(L), L;
    }, nl = O.createProgram(), lt = _l(O.VERTEX_SHADER, dd), gl = _l(O.FRAGMENT_SHADER, hd);
    O.attachShader(nl, lt), O.attachShader(nl, gl), O.linkProgram(nl), O.deleteShader(lt), O.deleteShader(gl), O.useProgram(nl);
    const Al = O.createBuffer();
    O.bindBuffer(O.ARRAY_BUFFER, Al), O.bufferData(
      O.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      O.STATIC_DRAW
    );
    const B = O.getAttribLocation(nl, "a_position");
    O.enableVertexAttribArray(B), O.vertexAttribPointer(B, 2, O.FLOAT, !1, 0, 0);
    const S = {
      colors: O.getUniformLocation(nl, "u_colors"),
      scene: O.getUniformLocation(nl, "u_scene"),
      shape: O.getUniformLocation(nl, "u_shape"),
      surface: O.getUniformLocation(nl, "u_surface"),
      finish: O.getUniformLocation(nl, "u_finish"),
      transform: O.getUniformLocation(nl, "u_transform"),
      space: O.getUniformLocation(nl, "u_space"),
      cursor: O.getUniformLocation(nl, "u_cursor")
    };
    O.uniform3fv(S.colors, new Float32Array(vl.colors.flat())), O.uniform4f(
      S.shape,
      vl.scale,
      vl.intensity,
      vl.paramA,
      vl.warp
    ), O.uniform4f(
      S.surface,
      vl.detail,
      vl.contrast,
      vl.brightness,
      vl.saturation
    ), O.uniform4f(
      S.finish,
      vl.hue,
      vl.vignette,
      vl.blur,
      vl.grain
    ), O.uniform4f(
      S.transform,
      vl.seed,
      vl.rotate,
      vl.drift,
      vl.oklab
    ), O.uniform4f(
      S.cursor,
      0,
      vl.cursorEffect,
      vl.cursorStrength,
      vl.cursorRadius
    );
    let Y = 0, bl = 0, Il = 0, Rl = 0, tl = 0, kl = 0, Xl = G.getBoundingClientRect(), Hl = 0, Ql = null, tt = document.visibilityState === "visible", ql = !0, Z = !1;
    const I = performance.now(), At = Math.abs(vl.timeScale) > 1e-4, ut = () => {
      const D = Math.min(window.devicePixelRatio || 1, 2), q = Math.max(1, Math.round(Xl.width * D)), L = Math.max(1, Math.round(Xl.height * D)), W = Math.min(
        1,
        Math.sqrt(2e6 / Math.max(1, q * L))
      ), Zl = Math.max(1, Math.round(q * W)), at = Math.max(1, Math.round(L * W));
      (G.width !== Zl || G.height !== at) && (G.width = Zl, G.height = at, O.viewport(0, 0, Zl, at));
    };
    function Yl() {
      !Z && tt && ql && Hl === 0 && (Hl = requestAnimationFrame(z));
    }
    const jl = () => {
      Xl = G.getBoundingClientRect(), ut(), Yl();
    };
    window.addEventListener("resize", jl);
    const Bt = new ResizeObserver(jl);
    Bt.observe(G);
    const Zt = new IntersectionObserver(([D]) => {
      ql = D?.isIntersecting ?? !0, ql ? Yl() : Hl !== 0 && (cancelAnimationFrame(Hl), Hl = 0, Ql = null);
    });
    Zt.observe(G);
    const zl = () => {
      tt = document.visibilityState === "visible", tt ? Yl() : Hl !== 0 && (cancelAnimationFrame(Hl), Hl = 0, Ql = null);
    };
    document.addEventListener("visibilitychange", zl);
    function z(D) {
      if (Hl = 0, Z || !tt || !ql) return;
      const q = Ql === null ? 0 : Math.min((D - Ql) / 1e3, 0.1);
      Ql = D;
      const L = 1 - Math.exp(-12 * q);
      Rl += (Y - Rl) * L, tl += (bl - tl) * L, kl += (Il - kl) * L, ut();
      const W = G.width, Zl = G.height;
      O.uniform4f(
        S.scene,
        W,
        Zl,
        (D - I) / 1e3 * vl.timeScale,
        vl.colorCount
      ), O.uniform4f(
        S.space,
        vl.offsetX,
        vl.offsetY,
        Rl,
        tl
      ), O.uniform4f(
        S.cursor,
        0,
        vl.cursorEffect,
        vl.cursorStrength,
        vl.cursorRadius
      ), O.drawArrays(O.TRIANGLES, 0, 3);
      const at = Math.abs(Y - Rl) > 1e-3 || Math.abs(bl - tl) > 1e-3 || Math.abs(Il - kl) > 1e-3;
      At || at ? Yl() : Ql = null;
    }
    return Yl(), () => {
      Z = !0, cancelAnimationFrame(Hl), Bt.disconnect(), Zt.disconnect(), document.removeEventListener("visibilitychange", zl), window.removeEventListener("resize", jl), O.deleteBuffer(Al), O.deleteProgram(nl);
      const D = window.setTimeout(() => {
        nn.get(G) === D && (nn.delete(G), O.getExtension("WEBGL_lose_context")?.loseContext(), G.width = 1, G.height = 1);
      }, 0);
      nn.set(G, D);
    };
  }, []), /* @__PURE__ */ i1.jsx(
    "canvas",
    {
      ref: hl,
      className: N,
      style: { display: "block", width: "100%", height: "100%" }
    }
  );
}
const ie = document.querySelector(".projects-shader");
if (ie && ie.dataset.shader21stMounted !== "1") {
  ie.dataset.shader21stMounted = "1", ie.classList.add("shader-21st-active"), ie.querySelectorAll(".projects-aurora-canvas,.projects-heated-canvas").forEach((G) => G.remove());
  const N = document.createElement("div");
  N.id = "projects-21st-shader-root", N.setAttribute("aria-hidden", "true"), ie.prepend(N);
  const hl = yd.createRoot(N);
  hl.render(
    /* @__PURE__ */ i1.jsx(gd, { className: "projects-21st-shader-canvas" })
  ), window.addEventListener("pagehide", () => hl.unmount(), { once: !0 });
}
