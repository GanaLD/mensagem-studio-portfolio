var bs = { exports: {} }, au = {};
var ao;
function xg() {
  if (ao) return au;
  ao = 1;
  var f = /* @__PURE__ */ Symbol.for("react.transitional.element"), u = /* @__PURE__ */ Symbol.for("react.fragment");
  function c(r, o, d) {
    var v = null;
    if (d !== void 0 && (v = "" + d), o.key !== void 0 && (v = "" + o.key), "key" in o) {
      d = {};
      for (var E in o)
        E !== "key" && (d[E] = o[E]);
    } else d = o;
    return o = d.ref, {
      $$typeof: f,
      type: r,
      key: v,
      ref: o !== void 0 ? o : null,
      props: d
    };
  }
  return au.Fragment = u, au.jsx = c, au.jsxs = c, au;
}
var uo;
function Rg() {
  return uo || (uo = 1, bs.exports = xg()), bs.exports;
}
var Do = Rg(), _s = { exports: {} }, uu = {}, zs = { exports: {} }, As = {};
var io;
function Ug() {
  return io || (io = 1, (function(f) {
    function u(X, P) {
      var lt = X.length;
      X.push(P);
      t: for (; 0 < lt; ) {
        var At = lt - 1 >>> 1, Tt = X[At];
        if (0 < o(Tt, P))
          X[At] = P, X[lt] = Tt, lt = At;
        else break t;
      }
    }
    function c(X) {
      return X.length === 0 ? null : X[0];
    }
    function r(X) {
      if (X.length === 0) return null;
      var P = X[0], lt = X.pop();
      if (lt !== P) {
        X[0] = lt;
        t: for (var At = 0, Tt = X.length, wt = Tt >>> 1; At < wt; ) {
          var Ml = 2 * (At + 1) - 1, Zl = X[Ml], T = Ml + 1, q = X[T];
          if (0 > o(Zl, lt))
            T < Tt && 0 > o(q, Zl) ? (X[At] = q, X[T] = lt, At = T) : (X[At] = Zl, X[Ml] = lt, At = Ml);
          else if (T < Tt && 0 > o(q, lt))
            X[At] = q, X[T] = lt, At = T;
          else break t;
        }
      }
      return P;
    }
    function o(X, P) {
      var lt = X.sortIndex - P.sortIndex;
      return lt !== 0 ? lt : X.id - P.id;
    }
    if (f.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      f.unstable_now = function() {
        return d.now();
      };
    } else {
      var v = Date, E = v.now();
      f.unstable_now = function() {
        return v.now() - E;
      };
    }
    var y = [], C = [], A = 1, m = null, N = 3, R = !1, U = !1, B = !1, H = !1, G = typeof setTimeout == "function" ? setTimeout : null, at = typeof clearTimeout == "function" ? clearTimeout : null, $ = typeof setImmediate < "u" ? setImmediate : null;
    function K(X) {
      for (var P = c(C); P !== null; ) {
        if (P.callback === null) r(C);
        else if (P.startTime <= X)
          r(C), P.sortIndex = P.expirationTime, u(y, P);
        else break;
        P = c(C);
      }
    }
    function J(X) {
      if (B = !1, K(X), !U)
        if (c(y) !== null)
          U = !0, W || (W = !0, vt());
        else {
          var P = c(C);
          P !== null && zt(J, P.startTime - X);
        }
    }
    var W = !1, V = -1, I = 5, _t = -1;
    function dt() {
      return H ? !0 : !(f.unstable_now() - _t < I);
    }
    function St() {
      if (H = !1, W) {
        var X = f.unstable_now();
        _t = X;
        var P = !0;
        try {
          t: {
            U = !1, B && (B = !1, at(V), V = -1), R = !0;
            var lt = N;
            try {
              l: {
                for (K(X), m = c(y); m !== null && !(m.expirationTime > X && dt()); ) {
                  var At = m.callback;
                  if (typeof At == "function") {
                    m.callback = null, N = m.priorityLevel;
                    var Tt = At(
                      m.expirationTime <= X
                    );
                    if (X = f.unstable_now(), typeof Tt == "function") {
                      m.callback = Tt, K(X), P = !0;
                      break l;
                    }
                    m === c(y) && r(y), K(X);
                  } else r(y);
                  m = c(y);
                }
                if (m !== null) P = !0;
                else {
                  var wt = c(C);
                  wt !== null && zt(
                    J,
                    wt.startTime - X
                  ), P = !1;
                }
              }
              break t;
            } finally {
              m = null, N = lt, R = !1;
            }
            P = void 0;
          }
        } finally {
          P ? vt() : W = !1;
        }
      }
    }
    var vt;
    if (typeof $ == "function")
      vt = function() {
        $(St);
      };
    else if (typeof MessageChannel < "u") {
      var ft = new MessageChannel(), k = ft.port2;
      ft.port1.onmessage = St, vt = function() {
        k.postMessage(null);
      };
    } else
      vt = function() {
        G(St, 0);
      };
    function zt(X, P) {
      V = G(function() {
        X(f.unstable_now());
      }, P);
    }
    f.unstable_IdlePriority = 5, f.unstable_ImmediatePriority = 1, f.unstable_LowPriority = 4, f.unstable_NormalPriority = 3, f.unstable_Profiling = null, f.unstable_UserBlockingPriority = 2, f.unstable_cancelCallback = function(X) {
      X.callback = null;
    }, f.unstable_forceFrameRate = function(X) {
      0 > X || 125 < X ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : I = 0 < X ? Math.floor(1e3 / X) : 5;
    }, f.unstable_getCurrentPriorityLevel = function() {
      return N;
    }, f.unstable_next = function(X) {
      switch (N) {
        case 1:
        case 2:
        case 3:
          var P = 3;
          break;
        default:
          P = N;
      }
      var lt = N;
      N = P;
      try {
        return X();
      } finally {
        N = lt;
      }
    }, f.unstable_requestPaint = function() {
      H = !0;
    }, f.unstable_runWithPriority = function(X, P) {
      switch (X) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          X = 3;
      }
      var lt = N;
      N = X;
      try {
        return P();
      } finally {
        N = lt;
      }
    }, f.unstable_scheduleCallback = function(X, P, lt) {
      var At = f.unstable_now();
      switch (typeof lt == "object" && lt !== null ? (lt = lt.delay, lt = typeof lt == "number" && 0 < lt ? At + lt : At) : lt = At, X) {
        case 1:
          var Tt = -1;
          break;
        case 2:
          Tt = 250;
          break;
        case 5:
          Tt = 1073741823;
          break;
        case 4:
          Tt = 1e4;
          break;
        default:
          Tt = 5e3;
      }
      return Tt = lt + Tt, X = {
        id: A++,
        callback: P,
        priorityLevel: X,
        startTime: lt,
        expirationTime: Tt,
        sortIndex: -1
      }, lt > At ? (X.sortIndex = lt, u(C, X), c(y) === null && X === c(C) && (B ? (at(V), V = -1) : B = !0, zt(J, lt - At))) : (X.sortIndex = Tt, u(y, X), U || R || (U = !0, W || (W = !0, vt()))), X;
    }, f.unstable_shouldYield = dt, f.unstable_wrapCallback = function(X) {
      var P = N;
      return function() {
        var lt = N;
        N = P;
        try {
          return X.apply(this, arguments);
        } finally {
          N = lt;
        }
      };
    };
  })(As)), As;
}
var fo;
function Hg() {
  return fo || (fo = 1, zs.exports = Ug()), zs.exports;
}
var Os = { exports: {} }, nt = {};
var co;
function qg() {
  if (co) return nt;
  co = 1;
  var f = /* @__PURE__ */ Symbol.for("react.transitional.element"), u = /* @__PURE__ */ Symbol.for("react.portal"), c = /* @__PURE__ */ Symbol.for("react.fragment"), r = /* @__PURE__ */ Symbol.for("react.strict_mode"), o = /* @__PURE__ */ Symbol.for("react.profiler"), d = /* @__PURE__ */ Symbol.for("react.consumer"), v = /* @__PURE__ */ Symbol.for("react.context"), E = /* @__PURE__ */ Symbol.for("react.forward_ref"), y = /* @__PURE__ */ Symbol.for("react.suspense"), C = /* @__PURE__ */ Symbol.for("react.memo"), A = /* @__PURE__ */ Symbol.for("react.lazy"), m = /* @__PURE__ */ Symbol.for("react.activity"), N = /* @__PURE__ */ Symbol.for("react.view_transition"), R = Symbol.iterator;
  function U(T) {
    return T === null || typeof T != "object" ? null : (T = R && T[R] || T["@@iterator"], typeof T == "function" ? T : null);
  }
  var B = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, H = Object.assign, G = {};
  function at(T, q, L) {
    this.props = T, this.context = q, this.refs = G, this.updater = L || B;
  }
  at.prototype.isReactComponent = {}, at.prototype.setState = function(T, q) {
    if (typeof T != "object" && typeof T != "function" && T != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, T, q, "setState");
  }, at.prototype.forceUpdate = function(T) {
    this.updater.enqueueForceUpdate(this, T, "forceUpdate");
  };
  function $() {
  }
  $.prototype = at.prototype;
  function K(T, q, L) {
    this.props = T, this.context = q, this.refs = G, this.updater = L || B;
  }
  var J = K.prototype = new $();
  J.constructor = K, H(J, at.prototype), J.isPureReactComponent = !0;
  var W = Array.isArray;
  function V() {
  }
  var I = { H: null, A: null, T: null, S: null }, _t = Object.prototype.hasOwnProperty;
  function dt(T, q, L) {
    var j = L.ref;
    return {
      $$typeof: f,
      type: T,
      key: q,
      ref: j !== void 0 ? j : null,
      props: L
    };
  }
  function St(T, q) {
    return dt(T.type, q, T.props);
  }
  function vt(T) {
    return typeof T == "object" && T !== null && T.$$typeof === f;
  }
  function ft(T) {
    var q = { "=": "=0", ":": "=2" };
    return "$" + T.replace(/[=:]/g, function(L) {
      return q[L];
    });
  }
  var k = /\/+/g;
  function zt(T, q) {
    return typeof T == "object" && T !== null && T.key != null ? ft("" + T.key) : q.toString(36);
  }
  function X(T) {
    switch (T.status) {
      case "fulfilled":
        return T.value;
      case "rejected":
        throw T.reason;
      default:
        switch (typeof T.status == "string" ? T.then(V, V) : (T.status = "pending", T.then(
          function(q) {
            T.status === "pending" && (T.status = "fulfilled", T.value = q);
          },
          function(q) {
            T.status === "pending" && (T.status = "rejected", T.reason = q);
          }
        )), T.status) {
          case "fulfilled":
            return T.value;
          case "rejected":
            throw T.reason;
        }
    }
    throw T;
  }
  function P(T, q, L, j, ct) {
    var rt = typeof T;
    (rt === "undefined" || rt === "boolean") && (T = null);
    var Et = !1;
    if (T === null) Et = !0;
    else
      switch (rt) {
        case "bigint":
        case "string":
        case "number":
          Et = !0;
          break;
        case "object":
          switch (T.$$typeof) {
            case f:
            case u:
              Et = !0;
              break;
            case A:
              return Et = T._init, P(
                Et(T._payload),
                q,
                L,
                j,
                ct
              );
          }
      }
    if (Et)
      return ct = ct(T), Et = j === "" ? "." + zt(T, 0) : j, W(ct) ? (L = "", Et != null && (L = Et.replace(k, "$&/") + "/"), P(ct, q, L, "", function(Bl) {
        return Bl;
      })) : ct != null && (vt(ct) && (ct = St(
        ct,
        L + (ct.key == null || T && T.key === ct.key ? "" : ("" + ct.key).replace(
          k,
          "$&/"
        ) + "/") + Et
      )), q.push(ct)), 1;
    Et = 0;
    var w = j === "" ? "." : j + ":";
    if (W(T))
      for (var et = 0; et < T.length; et++)
        j = T[et], rt = w + zt(j, et), Et += P(
          j,
          q,
          L,
          rt,
          ct
        );
    else if (et = U(T), typeof et == "function")
      for (T = et.call(T), et = 0; !(j = T.next()).done; )
        j = j.value, rt = w + zt(j, et++), Et += P(
          j,
          q,
          L,
          rt,
          ct
        );
    else if (rt === "object") {
      if (typeof T.then == "function")
        return P(
          X(T),
          q,
          L,
          j,
          ct
        );
      throw q = String(T), Error(
        "Objects are not valid as a React child (found: " + (q === "[object Object]" ? "object with keys {" + Object.keys(T).join(", ") + "}" : q) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Et;
  }
  function lt(T, q, L) {
    if (T == null) return T;
    var j = [], ct = 0;
    return P(T, j, "", "", function(rt) {
      return q.call(L, rt, ct++);
    }), j;
  }
  function At(T) {
    if (T._status === -1) {
      var q = T._result, L = q();
      L.then(
        function(j) {
          (T._status === 0 || T._status === -1) && (T._status = 1, T._result = j, L.status === void 0 && (L.status = "fulfilled", L.value = j));
        },
        function(j) {
          (T._status === 0 || T._status === -1) && (T._status = 2, T._result = j, L.status === void 0 && (L.status = "rejected", L.reason = j));
        }
      ), T._status === -1 && (T._status = 0, T._result = L);
    }
    if (T._status === 1) return T._result.default;
    throw T._result;
  }
  var Tt = typeof reportError == "function" ? reportError : function(T) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var q = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof T == "object" && T !== null && typeof T.message == "string" ? String(T.message) : String(T),
        error: T
      });
      if (!window.dispatchEvent(q)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", T);
      return;
    }
    console.error(T);
  };
  function wt(T) {
    var q = I.T, L = {};
    L.types = q !== null ? q.types : null, I.T = L;
    try {
      var j = T(), ct = I.S;
      ct !== null && ct(L, j), typeof j == "object" && j !== null && typeof j.then == "function" && j.then(V, Tt);
    } catch (rt) {
      Tt(rt);
    } finally {
      q !== null && L.types !== null && (q.types = L.types), I.T = q;
    }
  }
  function Ml(T) {
    var q = I.T;
    if (q !== null) {
      var L = q.types;
      L === null ? q.types = [T] : L.indexOf(T) === -1 && L.push(T);
    } else wt(Ml.bind(null, T));
  }
  var Zl = {
    map: lt,
    forEach: function(T, q, L) {
      lt(
        T,
        function() {
          q.apply(this, arguments);
        },
        L
      );
    },
    count: function(T) {
      var q = 0;
      return lt(T, function() {
        q++;
      }), q;
    },
    toArray: function(T) {
      return lt(T, function(q) {
        return q;
      }) || [];
    },
    only: function(T) {
      if (!vt(T))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return T;
    }
  };
  return nt.Activity = m, nt.Children = Zl, nt.Component = at, nt.Fragment = c, nt.Profiler = o, nt.PureComponent = K, nt.StrictMode = r, nt.Suspense = y, nt.ViewTransition = N, nt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = I, nt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(T) {
      return I.H.useMemoCache(T);
    }
  }, nt.addTransitionType = Ml, nt.cache = function(T) {
    return function() {
      return T.apply(null, arguments);
    };
  }, nt.cacheSignal = function() {
    return null;
  }, nt.cloneElement = function(T, q, L) {
    if (T == null)
      throw Error(
        "The argument must be a React element, but you passed " + T + "."
      );
    var j = H({}, T.props), ct = T.key;
    if (q != null)
      for (rt in q.key !== void 0 && (ct = "" + q.key), q)
        !_t.call(q, rt) || rt === "key" || rt === "__self" || rt === "__source" || rt === "ref" && q.ref === void 0 || (j[rt] = q[rt]);
    var rt = arguments.length - 2;
    if (rt === 1) j.children = L;
    else if (1 < rt) {
      for (var Et = Array(rt), w = 0; w < rt; w++)
        Et[w] = arguments[w + 2];
      j.children = Et;
    }
    return dt(T.type, ct, j);
  }, nt.createContext = function(T) {
    return T = {
      $$typeof: v,
      _currentValue: T,
      _currentValue2: T,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, T.Provider = T, T.Consumer = {
      $$typeof: d,
      _context: T
    }, T;
  }, nt.createElement = function(T, q, L) {
    var j, ct = {}, rt = null;
    if (q != null)
      for (j in q.key !== void 0 && (rt = "" + q.key), q)
        _t.call(q, j) && j !== "key" && j !== "__self" && j !== "__source" && (ct[j] = q[j]);
    var Et = arguments.length - 2;
    if (Et === 1) ct.children = L;
    else if (1 < Et) {
      for (var w = Array(Et), et = 0; et < Et; et++)
        w[et] = arguments[et + 2];
      ct.children = w;
    }
    if (T && T.defaultProps)
      for (j in Et = T.defaultProps, Et)
        ct[j] === void 0 && (ct[j] = Et[j]);
    return dt(T, rt, ct);
  }, nt.createRef = function() {
    return { current: null };
  }, nt.forwardRef = function(T) {
    return { $$typeof: E, render: T };
  }, nt.isValidElement = vt, nt.lazy = function(T) {
    return {
      $$typeof: A,
      _payload: { _status: -1, _result: T },
      _init: At
    };
  }, nt.memo = function(T, q) {
    return {
      $$typeof: C,
      type: T,
      compare: q === void 0 ? null : q
    };
  }, nt.startTransition = wt, nt.unstable_useCacheRefresh = function() {
    return I.H.useCacheRefresh();
  }, nt.use = function(T) {
    return I.H.use(T);
  }, nt.useActionState = function(T, q, L) {
    return I.H.useActionState(T, q, L);
  }, nt.useCallback = function(T, q) {
    return I.H.useCallback(T, q);
  }, nt.useContext = function(T) {
    return I.H.useContext(T);
  }, nt.useDebugValue = function() {
  }, nt.useDeferredValue = function(T, q) {
    return I.H.useDeferredValue(T, q);
  }, nt.useEffect = function(T, q) {
    return I.H.useEffect(T, q);
  }, nt.useEffectEvent = function(T) {
    return I.H.useEffectEvent(T);
  }, nt.useId = function() {
    return I.H.useId();
  }, nt.useImperativeHandle = function(T, q, L) {
    return I.H.useImperativeHandle(T, q, L);
  }, nt.useInsertionEffect = function(T, q) {
    return I.H.useInsertionEffect(T, q);
  }, nt.useLayoutEffect = function(T, q) {
    return I.H.useLayoutEffect(T, q);
  }, nt.useMemo = function(T, q) {
    return I.H.useMemo(T, q);
  }, nt.useOptimistic = function(T, q) {
    return I.H.useOptimistic(T, q);
  }, nt.useReducer = function(T, q, L) {
    return I.H.useReducer(T, q, L);
  }, nt.useRef = function(T) {
    return I.H.useRef(T);
  }, nt.useState = function(T) {
    return I.H.useState(T);
  }, nt.useSyncExternalStore = function(T, q, L) {
    return I.H.useSyncExternalStore(
      T,
      q,
      L
    );
  }, nt.useTransition = function() {
    return I.H.useTransition();
  }, nt.version = "19.3.0", nt;
}
var so;
function Us() {
  return so || (so = 1, Os.exports = qg()), Os.exports;
}
var Ms = { exports: {} }, nl = {};
var ro;
function Bg() {
  if (ro) return nl;
  ro = 1;
  var f = Us();
  function u(A) {
    var m = "https://react.dev/errors/" + A;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var N = 2; N < arguments.length; N++)
        m += "&args[]=" + encodeURIComponent(arguments[N]);
    }
    return "Minified React error #" + A + "; visit " + m + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function c() {
  }
  var r = {
    d: {
      f: c,
      r: function() {
        throw Error(u(522));
      },
      D: c,
      C: c,
      L: c,
      m: c,
      X: c,
      S: c,
      M: c
    },
    p: 0,
    findDOMNode: null
  }, o = /* @__PURE__ */ Symbol.for("react.portal"), d = /* @__PURE__ */ Symbol.for("react.recoverable"), v = /* @__PURE__ */ Symbol.for("react.optimistic_key");
  function E(A, m, N) {
    var R = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: R == null ? null : R === v ? v : "" + R,
      children: A,
      containerInfo: m,
      implementation: N
    };
  }
  var y = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function C(A, m) {
    if (A === "font") return "";
    if (typeof m == "string")
      return m === "use-credentials" ? m : "";
  }
  return nl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, nl.browser = function(A) {
    return { $$typeof: d, _reason: A };
  }, nl.createPortal = function(A, m) {
    var N = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!m || m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)
      throw Error(u(299));
    return E(A, m, null, N);
  }, nl.flushSync = function(A) {
    var m = y.T, N = r.p;
    try {
      if (y.T = null, r.p = 2, A) return A();
    } finally {
      y.T = m, r.p = N, r.d.f();
    }
  }, nl.preconnect = function(A, m) {
    typeof A == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, r.d.C(A, m));
  }, nl.prefetchDNS = function(A) {
    typeof A == "string" && r.d.D(A);
  }, nl.preinit = function(A, m) {
    if (typeof A == "string" && m && typeof m.as == "string") {
      var N = m.as, R = C(N, m.crossOrigin), U = typeof m.integrity == "string" ? m.integrity : void 0, B = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
      N === "style" ? r.d.S(
        A,
        typeof m.precedence == "string" ? m.precedence : void 0,
        {
          crossOrigin: R,
          integrity: U,
          fetchPriority: B
        }
      ) : N === "script" && r.d.X(A, {
        crossOrigin: R,
        integrity: U,
        fetchPriority: B,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0
      });
    }
  }, nl.preinitModule = function(A, m) {
    if (typeof A == "string")
      if (typeof m == "object" && m !== null) {
        if (m.as == null || m.as === "script") {
          var N = C(
            m.as,
            m.crossOrigin
          );
          r.d.M(A, {
            crossOrigin: N,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
            nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            fetchPriority: typeof m.fetchPriority == "string" ? m.fetchPriority : void 0
          });
        }
      } else m == null && r.d.M(A);
  }, nl.preload = function(A, m) {
    if (typeof A == "string" && typeof m == "object" && m !== null && typeof m.as == "string") {
      var N = m.as, R = C(N, m.crossOrigin);
      r.d.L(A, N, {
        crossOrigin: R,
        integrity: typeof m.integrity == "string" ? m.integrity : void 0,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0,
        type: typeof m.type == "string" ? m.type : void 0,
        fetchPriority: typeof m.fetchPriority == "string" ? m.fetchPriority : void 0,
        referrerPolicy: typeof m.referrerPolicy == "string" ? m.referrerPolicy : void 0,
        imageSrcSet: typeof m.imageSrcSet == "string" ? m.imageSrcSet : void 0,
        imageSizes: typeof m.imageSizes == "string" ? m.imageSizes : void 0,
        media: typeof m.media == "string" ? m.media : void 0
      });
    }
  }, nl.preloadModule = function(A, m) {
    if (typeof A == "string")
      if (m) {
        var N = C(m.as, m.crossOrigin);
        r.d.m(A, {
          as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
          crossOrigin: N,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0,
          nonce: typeof m.nonce == "string" ? m.nonce : void 0,
          fetchPriority: typeof m.fetchPriority == "string" ? m.fetchPriority : void 0
        });
      } else r.d.m(A);
  }, nl.requestFormReset = function(A) {
    r.d.r(A);
  }, nl.unstable_batchedUpdates = function(A, m) {
    return A(m);
  }, nl.useFormState = function(A, m, N) {
    return y.H.useFormState(A, m, N);
  }, nl.useFormStatus = function() {
    return y.H.useHostTransitionStatus();
  }, nl.version = "19.3.0", nl;
}
var ho;
function Yg() {
  if (ho) return Ms.exports;
  ho = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (u) {
        console.error(u);
      }
  }
  return f(), Ms.exports = Bg(), Ms.exports;
}
var oo;
function Gg() {
  if (oo) return uu;
  oo = 1;
  var f = Hg(), u = Us(), c = Yg();
  function r(t) {
    var l = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      l += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        l += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + t + "; visit " + l + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function d(t) {
    for (var l = t, e = l; e && !e.alternate; )
      l = e, (l.flags & 4098) !== 0 && (t = l.return), e = l.return;
    for (; l.return; ) l = l.return;
    return l.tag === 3 ? t : null;
  }
  function v(t) {
    if (t.tag === 13) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function E(t) {
    if (t.tag === 31) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function y(t) {
    if (d(t) !== t)
      throw Error(r(188));
  }
  function C(t) {
    var l = t.alternate;
    if (!l) {
      if (l = d(t), l === null) throw Error(r(188));
      return l !== t ? null : t;
    }
    for (var e = t, n = l; ; ) {
      var a = e.return;
      if (a === null) break;
      var i = a.alternate;
      if (i === null) {
        if (n = a.return, n !== null) {
          e = n;
          continue;
        }
        break;
      }
      if (a.child === i.child) {
        for (i = a.child; i; ) {
          if (i === e) return y(a), t;
          if (i === n) return y(a), l;
          i = i.sibling;
        }
        throw Error(r(188));
      }
      if (e.return !== n.return) e = a, n = i;
      else {
        for (var s = !1, h = a.child; h; ) {
          if (h === e) {
            s = !0, e = a, n = i;
            break;
          }
          if (h === n) {
            s = !0, n = a, e = i;
            break;
          }
          h = h.sibling;
        }
        if (!s) {
          for (h = i.child; h; ) {
            if (h === e) {
              s = !0, e = i, n = a;
              break;
            }
            if (h === n) {
              s = !0, n = i, e = a;
              break;
            }
            h = h.sibling;
          }
          if (!s) throw Error(r(189));
        }
      }
      if (e.alternate !== n) throw Error(r(190));
    }
    if (e.tag !== 3) throw Error(r(188));
    return e.stateNode.current === e ? t : l;
  }
  function A(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t;
    for (t = t.child; t !== null; ) {
      if (l = A(t), l !== null) return l;
      t = t.sibling;
    }
    return null;
  }
  function m(t, l, e, n, a, i) {
    for (; t !== null; ) {
      if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && e(t, n, a, i) || (t.tag !== 22 || t.memoizedState === null) && (l || t.tag !== 5 && t.tag !== 27) && m(
        t.child,
        l,
        e,
        n,
        a,
        i
      ))
        return !0;
      t = t.sibling;
    }
    return !1;
  }
  function N(t) {
    for (t = t.return; t !== null; ) {
      if (t.tag === 3 || t.tag === 5 || t.tag === 27) return t;
      t = t.return;
    }
    return null;
  }
  function R(t) {
    var l = !1;
    for (t = t.return; t !== null && (t.tag === 4 && (l = !0), !(t.tag === 3 || t.tag === 5 || t.tag === 27)); )
      t = t.return;
    return l;
  }
  function U(t) {
    var l = [null, null], e = N(t);
    return e === null || B(
      l,
      t,
      e.child,
      { foundSelf: !1 }
    ), l;
  }
  function B(t, l, e, n) {
    for (; e !== null; ) {
      if (e === l) n.foundSelf = !0;
      else if (e.tag === 5 || e.tag === 27 || e.tag === 6) {
        if (n.foundSelf) return t[1] = e, !0;
        t[0] = e;
      } else if ((e.tag !== 22 || e.memoizedState === null) && B(
        t,
        l,
        e.child,
        n
      ))
        return !0;
      e = e.sibling;
    }
    return !1;
  }
  function H(t) {
    switch (t.tag) {
      case 5:
      case 27:
      case 6:
        return t.stateNode;
      case 3:
        return t.stateNode.containerInfo;
      default:
        throw Error(r(559));
    }
  }
  var G = null, at = null;
  function $(t, l, e) {
    return t === e ? !0 : t === l ? (G = t, !0) : !1;
  }
  function K(t, l, e) {
    return t === e ? (at = t, !1) : t === l ? (at !== null && (G = t), !0) : !1;
  }
  function J(t) {
    if (t === null) return null;
    do
      t = t === null ? null : t.return;
    while (t && t.tag !== 5 && t.tag !== 27 && t.tag !== 3);
    return t || null;
  }
  function W(t, l, e) {
    for (var n = 0, a = t; a; a = e(a)) n++;
    a = 0;
    for (var i = l; i; i = e(i)) a++;
    for (; 0 < n - a; ) t = e(t), n--;
    for (; 0 < a - n; ) l = e(l), a--;
    for (; n--; ) {
      if (t === l || l !== null && t === l.alternate)
        return t;
      t = e(t), l = e(l);
    }
    return null;
  }
  var V = Object.assign, I = /* @__PURE__ */ Symbol.for("react.element"), _t = /* @__PURE__ */ Symbol.for("react.transitional.element"), dt = /* @__PURE__ */ Symbol.for("react.portal"), St = /* @__PURE__ */ Symbol.for("react.fragment"), vt = /* @__PURE__ */ Symbol.for("react.strict_mode"), ft = /* @__PURE__ */ Symbol.for("react.profiler"), k = /* @__PURE__ */ Symbol.for("react.consumer"), zt = /* @__PURE__ */ Symbol.for("react.context"), X = /* @__PURE__ */ Symbol.for("react.forward_ref"), P = /* @__PURE__ */ Symbol.for("react.suspense"), lt = /* @__PURE__ */ Symbol.for("react.suspense_list"), At = /* @__PURE__ */ Symbol.for("react.memo"), Tt = /* @__PURE__ */ Symbol.for("react.lazy"), wt = /* @__PURE__ */ Symbol.for("react.activity"), Ml = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), Zl = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), T = /* @__PURE__ */ Symbol.for("react.view_transition"), q = /* @__PURE__ */ Symbol.for("react.recoverable"), L = Symbol.iterator;
  function j(t) {
    return t === null || typeof t != "object" ? null : (t = L && t[L] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var ct = /* @__PURE__ */ Symbol.for("react.client.reference");
  function rt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === ct ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case St:
        return "Fragment";
      case ft:
        return "Profiler";
      case vt:
        return "StrictMode";
      case P:
        return "Suspense";
      case lt:
        return "SuspenseList";
      case wt:
        return "Activity";
      case T:
        return "ViewTransition";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case dt:
          return "Portal";
        case zt:
          return t.displayName || "Context";
        case k:
          return (t._context.displayName || "Context") + ".Consumer";
        case X:
          var l = t.render;
          return t = t.displayName, t || (t = l.displayName || l.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case At:
          return l = t.displayName || null, l !== null ? l : rt(t.type) || "Memo";
        case Tt:
          l = t._payload, t = t._init;
          try {
            return rt(t(l));
          } catch {
          }
      }
    return null;
  }
  var Et = Array.isArray, w = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, et = c.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Bl = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Xi = [], Sn = -1;
  function wl(t) {
    return { current: t };
  }
  function Wt(t) {
    0 > Sn || (t.current = Xi[Sn], Xi[Sn] = null, Sn--);
  }
  function Rt(t, l) {
    Sn++, Xi[Sn] = t.current, t.current = l;
  }
  var Kl = wl(null), ra = wl(null), Ee = wl(null), fu = wl(null);
  function cu(t, l) {
    switch (Rt(Ee, l), Rt(ra, t), Rt(Kl, null), l.nodeType) {
      case 9:
      case 11:
        t = (t = l.documentElement) && (t = t.namespaceURI) ? d1(t) : 0;
        break;
      default:
        if (t = l.tagName, l = l.namespaceURI)
          l = d1(l), t = v1(l, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    Wt(Kl), Rt(Kl, t);
  }
  function En() {
    Wt(Kl), Wt(ra), Wt(Ee);
  }
  function Li(t) {
    var l = t.memoizedState;
    l !== null && (ia._currentValue = l.memoizedState, Rt(fu, t)), l = Kl.current;
    var e = v1(l, t.type);
    l !== e && (Rt(ra, t), Rt(Kl, e));
  }
  function su(t) {
    ra.current === t && (Wt(Kl), Wt(ra)), fu.current === t && (Wt(fu), ia._currentValue = Bl);
  }
  var Qi, Hs;
  function Te(t) {
    if (Qi === void 0)
      try {
        throw Error();
      } catch (e) {
        var l = e.stack.trim().match(/\n( *(at )?)/);
        Qi = l && l[1] || "", Hs = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Qi + t + Hs;
  }
  var Vi = !1;
  function ji(t, l) {
    if (!t || Vi) return "";
    Vi = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var n = {
        DetermineComponentFrameRoot: function() {
          try {
            if (l) {
              var x = function() {
                throw Error();
              };
              if (Object.defineProperty(x.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(x, []);
                } catch (Y) {
                  var b = Y;
                }
                Reflect.construct(t, [], x);
              } else {
                try {
                  x.call();
                } catch (Y) {
                  b = Y;
                }
                x = !1;
                try {
                  var M = Object.getOwnPropertyDescriptor(
                    t.prototype,
                    "props"
                  );
                  Object.defineProperty(t.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), x = !0, new t();
                } finally {
                  x && (M !== void 0 ? Object.defineProperty(t.prototype, "props", M) : delete t.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (Y) {
                b = Y;
              }
              (x = t()) && typeof x.catch == "function" && x.catch(function() {
              });
            }
          } catch (Y) {
            if (Y && b && typeof Y.stack == "string")
              return [Y.stack, b.stack];
          }
          return [null, null];
        }
      };
      n.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var a = Object.getOwnPropertyDescriptor(
        n.DetermineComponentFrameRoot,
        "name"
      );
      a && a.configurable && Object.defineProperty(
        n.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var i = n.DetermineComponentFrameRoot(), s = i[0], h = i[1];
      if (s && h) {
        var g = s.split(`
`), z = h.split(`
`);
        for (a = n = 0; n < g.length && !g[n].includes("DetermineComponentFrameRoot"); )
          n++;
        for (; a < z.length && !z[a].includes(
          "DetermineComponentFrameRoot"
        ); )
          a++;
        if (n === g.length || a === z.length)
          for (n = g.length - 1, a = z.length - 1; 1 <= n && 0 <= a && g[n] !== z[a]; )
            a--;
        for (; 1 <= n && 0 <= a; n--, a--)
          if (g[n] !== z[a]) {
            if (n !== 1 || a !== 1)
              do
                if (n--, a--, 0 > a || g[n] !== z[a]) {
                  var p = `
` + g[n].replace(" at new ", " at ");
                  return t.displayName && p.includes("<anonymous>") && (p = p.replace("<anonymous>", t.displayName)), p;
                }
              while (1 <= n && 0 <= a);
            break;
          }
      }
    } finally {
      Vi = !1, Error.prepareStackTrace = e;
    }
    return (e = t ? t.displayName || t.name : "") ? Te(e) : "";
  }
  function qo(t, l) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Te(t.type);
      case 16:
        return Te("Lazy");
      case 13:
        return t.child !== l && l !== null ? Te("Suspense Fallback") : Te("Suspense");
      case 19:
        return Te("SuspenseList");
      case 0:
      case 15:
        return ji(t.type, !1);
      case 11:
        return ji(t.type.render, !1);
      case 1:
        return ji(t.type, !0);
      case 31:
        return Te("Activity");
      case 30:
        return Te("ViewTransition");
      default:
        return "";
    }
  }
  function qs(t) {
    try {
      var l = "", e = null;
      do
        l += qo(t, e), e = t, t = t.return;
      while (t);
      return l;
    } catch (n) {
      return `
Error generating stack: ` + n.message + `
` + n.stack;
    }
  }
  var Zi = Object.prototype.hasOwnProperty, wi = f.unstable_scheduleCallback, Ki = f.unstable_cancelCallback, Bo = f.unstable_shouldYield, Yo = f.unstable_requestPaint, gl = f.unstable_now, Go = f.unstable_getCurrentPriorityLevel, Bs = f.unstable_ImmediatePriority, Ys = f.unstable_UserBlockingPriority, ru = f.unstable_NormalPriority, Xo = f.unstable_LowPriority, Gs = f.unstable_IdlePriority, Lo = f.log, Qo = f.unstable_setDisableYieldValue, ha = null, ml = null;
  function be(t) {
    if (typeof Lo == "function" && Qo(t), ml && typeof ml.setStrictMode == "function")
      try {
        ml.setStrictMode(ha, t);
      } catch {
      }
  }
  var yl = Math.clz32 ? Math.clz32 : Zo, Vo = Math.log, jo = Math.LN2;
  function Zo(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Vo(t) / jo | 0) | 0;
  }
  var hu = 256, ou = 262144, du = 4194304;
  function Fe(t) {
    var l = t & 42;
    if (l !== 0) return l;
    switch (t & -t) {
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
        return t & -t;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
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
        return t;
    }
  }
  function vu(t, l, e) {
    var n = t.pendingLanes;
    if (n === 0) return 0;
    var a = 0, i = t.suspendedLanes, s = t.pingedLanes;
    t = t.warmLanes;
    var h = n & 134217727;
    return h !== 0 ? (n = h & ~i, n !== 0 ? a = Fe(n) : (s &= h, s !== 0 ? a = Fe(s) : e || (e = h & ~t, e !== 0 && (a = Fe(e))))) : (h = n & ~i, h !== 0 ? a = Fe(h) : s !== 0 ? a = Fe(s) : e || (e = n & ~t, e !== 0 && (a = Fe(e)))), a === 0 ? 0 : l !== 0 && l !== a && (l & i) === 0 && (i = a & -a, e = l & -l, i >= e || i === 32 && (e & 4194048) !== 0) ? l : a;
  }
  function oa(t, l) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & l) === 0;
  }
  function Xs(t, l) {
    (l & 8) !== 0 && (l |= l & 32);
    var e = t.entangledLanes;
    if (e !== 0)
      for (t = t.entanglements, e &= l; 0 < e; ) {
        var n = 31 - yl(e), a = 1 << n;
        l |= t[n], e &= ~a;
      }
    return l;
  }
  function wo(t, l) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return l + 250;
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
        return l + 5e3;
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
  function Ls() {
    var t = du;
    return du <<= 1, (du & 62914560) === 0 && (du = 4194304), t;
  }
  function Ji(t) {
    for (var l = [], e = 0; 31 > e; e++) l.push(t);
    return l;
  }
  function da(t, l) {
    t.pendingLanes |= l, l !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function Ko(t, l, e, n, a, i) {
    var s = t.pendingLanes;
    t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= e, t.entangledLanes &= e, t.errorRecoveryDisabledLanes &= e, t.shellSuspendCounter = 0;
    var h = t.entanglements, g = t.expirationTimes, z = t.hiddenUpdates;
    for (e = s & ~e; 0 < e; ) {
      var p = 31 - yl(e), x = 1 << p;
      h[p] = 0, g[p] = -1;
      var b = z[p];
      if (b !== null)
        for (z[p] = null, p = 0; p < b.length; p++) {
          var M = b[p];
          M !== null && (M.lane &= -536870913);
        }
      e &= ~x;
    }
    n !== 0 && Qs(t, n, 0), i !== 0 && a === 0 && t.tag !== 0 && (t.suspendedLanes |= i & ~(s & ~l));
  }
  function Qs(t, l, e) {
    t.pendingLanes |= l, t.suspendedLanes &= ~l;
    var n = 31 - yl(l);
    t.entangledLanes |= l, t.entanglements[n] = t.entanglements[n] | 1073741824 | e & 261930;
  }
  function Vs(t, l) {
    var e = t.entangledLanes |= l;
    for (t = t.entanglements; e; ) {
      var n = 31 - yl(e), a = 1 << n;
      a & l | t[n] & l && (t[n] |= l), e &= ~a;
    }
  }
  function js(t, l) {
    var e = l & -l;
    return e = (e & 42) !== 0 ? 1 : Fi(e), (e & (t.suspendedLanes | l)) !== 0 ? 0 : e;
  }
  function Fi(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
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
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function $i(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Zs() {
    var t = et.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : I1(t.type));
  }
  function ws(t, l) {
    var e = et.p;
    try {
      return et.p = t, l();
    } finally {
      et.p = e;
    }
  }
  var ae = Math.random().toString(36).slice(2), It = "__reactFiber$" + ae, sl = "__reactProps$" + ae, Tn = "__reactContainer$" + ae, Ks = "__reactEvents$" + ae, Jo = "__reactListeners$" + ae, Fo = "__reactHandles$" + ae, Js = "__reactResources$" + ae, va = "__reactMarker$" + ae, gu = "__reactLoad$" + ae;
  function mu(t) {
    delete t[It], delete t[sl], delete t[Jo], delete t[Fo];
  }
  function $e(t) {
    var l;
    if (l = t[It]) return l;
    for (var e = t.parentNode; e; ) {
      if (l = e[Tn] || e[It]) {
        if (e = l.alternate, l.child !== null || e !== null && e.child !== null)
          for (t = x1(t); t !== null; ) {
            if (e = t[It]) return e;
            t = x1(t);
          }
        return l;
      }
      t = e, e = t.parentNode;
    }
    return null;
  }
  function bn(t) {
    if (t = t[It] || t[Tn]) {
      var l = t.tag;
      if (l === 5 || l === 6 || l === 13 || l === 31 || l === 26 || l === 27 || l === 3)
        return t;
    }
    return null;
  }
  function ga(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t.stateNode;
    throw Error(r(33));
  }
  function _n(t) {
    var l = t[Js];
    return l || (l = t[Js] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), l;
  }
  function Kt(t) {
    t[va] = !0;
  }
  function Fs(t) {
    t[gu] = void 0;
  }
  var $s = /* @__PURE__ */ new Set(), Ws = {};
  function We(t, l) {
    zn(t, l), zn(t + "Capture", l);
  }
  function zn(t, l) {
    for (Ws[t] = l, t = 0; t < l.length; t++)
      $s.add(l[t]);
  }
  var $o = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Is = {}, ks = {};
  function Wo(t) {
    return Zi.call(ks, t) ? !0 : Zi.call(Is, t) ? !1 : $o.test(t) ? ks[t] = !0 : (Is[t] = !0, !1);
  }
  var bt = !1;
  function Ps() {
    var t = bt;
    return bt = !1, t;
  }
  function yu(t, l, e) {
    if (Wo(l))
      if (e === null) t.removeAttribute(l);
      else {
        switch (typeof e) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(l);
            return;
          case "boolean":
            var n = l.toLowerCase().slice(0, 5);
            if (n !== "data-" && n !== "aria-") {
              t.removeAttribute(l);
              return;
            }
        }
        t.setAttribute(l, e);
      }
  }
  function Su(t, l, e) {
    if (e === null) t.removeAttribute(l);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(l);
          return;
      }
      t.setAttribute(l, e);
    }
  }
  function ue(t, l, e, n) {
    if (n === null) t.removeAttribute(e);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttributeNS(l, e, n);
    }
  }
  function Sl(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function tr(t) {
    var l = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (l === "checkbox" || l === "radio");
  }
  function Io(t, l, e) {
    var n = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      l
    );
    if (!t.hasOwnProperty(l) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var a = n.get, i = n.set;
      return Object.defineProperty(t, l, {
        configurable: !0,
        get: function() {
          return a.call(this);
        },
        set: function(s) {
          e = "" + s, i.call(this, s);
        }
      }), Object.defineProperty(t, l, {
        enumerable: n.enumerable
      }), {
        getValue: function() {
          return e;
        },
        setValue: function(s) {
          e = "" + s;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[l];
        }
      };
    }
  }
  function Wi(t) {
    if (!t._valueTracker) {
      var l = tr(t) ? "checked" : "value";
      t._valueTracker = Io(
        t,
        l,
        "" + t[l]
      );
    }
  }
  function lr(t) {
    if (!t) return !1;
    var l = t._valueTracker;
    if (!l) return !0;
    var e = l.getValue(), n = "";
    return t && (n = tr(t) ? t.checked ? "true" : "false" : t.value), t = n, t !== e ? (l.setValue(t), !0) : !1;
  }
  var ko = /[\n"\\]/g;
  function pl(t) {
    return t.replace(
      ko,
      function(l) {
        return "\\" + l.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ii(t, l, e, n, a, i, s, h) {
    t.name = "", s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? t.type = s : t.removeAttribute("type"), l != null ? s === "number" ? (l === 0 && t.value === "" || t.value != l) && (t.value = "" + Sl(l)) : t.value !== "" + Sl(l) && (t.value = "" + Sl(l)) : s !== "submit" && s !== "reset" || t.removeAttribute("value"), l != null ? s === "number" && t.value == l ? ki(t, Sl(t.value)) : ki(t, Sl(l)) : e != null ? ki(t, Sl(e)) : n != null && t.removeAttribute("value"), a == null && i != null && (t.defaultChecked = !!i), a != null && (t.checked = a && typeof a != "function" && typeof a != "symbol"), h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? t.name = "" + Sl(h) : t.removeAttribute("name");
  }
  function er(t, l, e, n, a, i, s, h) {
    if (i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.type = i), l != null || e != null) {
      if (!(i !== "submit" && i !== "reset" || l != null)) {
        Wi(t);
        return;
      }
      e = e != null ? "" + Sl(e) : "", l = l != null ? "" + Sl(l) : e, h || l === t.value || (t.value = l), t.defaultValue = l;
    }
    n = n ?? a, n = typeof n != "function" && typeof n != "symbol" && !!n, t.checked = h ? t.checked : !!n, t.defaultChecked = !!n, s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (t.name = s), Wi(t);
  }
  function ki(t, l) {
    t.defaultValue !== "" + l && (t.defaultValue = "" + l);
  }
  function An(t, l, e, n) {
    if (t = t.options, l) {
      l = {};
      for (var a = 0; a < e.length; a++)
        l["$" + e[a]] = !0;
      for (e = 0; e < t.length; e++)
        a = l.hasOwnProperty("$" + t[e].value), t[e].selected !== a && (t[e].selected = a), a && n && (t[e].defaultSelected = !0);
    } else {
      for (e = "" + Sl(e), l = null, a = 0; a < t.length; a++) {
        if (t[a].value === e) {
          t[a].selected = !0, n && (t[a].defaultSelected = !0);
          return;
        }
        l !== null || t[a].disabled || (l = t[a]);
      }
      l !== null && (l.selected = !0);
    }
  }
  function nr(t, l, e) {
    if (l != null && (l = "" + Sl(l), l !== t.value && (t.value = l), e == null)) {
      t.defaultValue !== l && (t.defaultValue = l);
      return;
    }
    t.defaultValue = e != null ? "" + Sl(e) : "";
  }
  function ar(t, l, e, n) {
    if (l == null) {
      if (n != null) {
        if (e != null) throw Error(r(92));
        if (Et(n)) {
          if (1 < n.length) throw Error(r(93));
          n = n[0];
        }
        e = n;
      }
      e == null && (e = ""), l = e;
    }
    e = Sl(l), t.defaultValue = e, n = t.textContent, n === e && n !== "" && n !== null && (t.value = n), Wi(t);
  }
  function On(t, l) {
    if (l) {
      var e = t.firstChild;
      if (e && e === t.lastChild && e.nodeType === 3) {
        e.nodeValue = l;
        return;
      }
    }
    t.textContent = l;
  }
  var Po = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function ur(t, l, e) {
    var n = l.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? n ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "" : n ? t.setProperty(l, e) : typeof e != "number" || e === 0 || Po.has(l) ? l === "float" ? t.cssFloat = e : t[l] = ("" + e).trim() : t[l] = e + "px";
  }
  function ir(t, l, e) {
    if (l != null && typeof l != "object")
      throw Error(r(62));
    if (t = t.style, e != null) {
      for (var n in e)
        !e.hasOwnProperty(n) || l != null && l.hasOwnProperty(n) || (n.indexOf("--") === 0 ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "", bt = !0);
      for (var a in l)
        n = l[a], l.hasOwnProperty(a) && e[a] !== n && (ur(t, a, n), bt = !0);
    } else
      for (var i in l)
        l.hasOwnProperty(i) && ur(t, i, l[i]);
  }
  function Pi(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
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
  var td = /* @__PURE__ */ new Map([
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
  ]), ld = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Eu(t) {
    return ld.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Jl() {
  }
  var tf = null;
  function lf(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Mn = null, pn = null;
  function fr(t) {
    var l = bn(t);
    if (l && (t = l.stateNode)) {
      var e = t[sl] || null;
      t: switch (t = l.stateNode, l.type) {
        case "input":
          if (Ii(
            t,
            e.value,
            e.defaultValue,
            e.defaultValue,
            e.checked,
            e.defaultChecked,
            e.type,
            e.name
          ), l = e.name, e.type === "radio" && l != null) {
            for (e = t; e.parentNode; ) e = e.parentNode;
            for (e = e.querySelectorAll(
              'input[name="' + pl(
                "" + l
              ) + '"][type="radio"]'
            ), l = 0; l < e.length; l++) {
              var n = e[l];
              if (n !== t && n.form === t.form) {
                var a = n[sl] || null;
                if (!a) throw Error(r(90));
                Ii(
                  n,
                  a.value,
                  a.defaultValue,
                  a.defaultValue,
                  a.checked,
                  a.defaultChecked,
                  a.type,
                  a.name
                );
              }
            }
            for (l = 0; l < e.length; l++)
              n = e[l], n.form === t.form && lr(n);
          }
          break t;
        case "textarea":
          nr(t, e.value, e.defaultValue);
          break t;
        case "select":
          l = e.value, l != null && An(t, !!e.multiple, l, !1);
      }
    }
  }
  var ef = !1;
  function cr(t, l, e) {
    if (ef) return t(l, e);
    ef = !0;
    try {
      var n = t(l);
      return n;
    } finally {
      if (ef = !1, (Mn !== null || pn !== null) && (Ei(), Mn && (l = Mn, t = pn, pn = Mn = null, fr(l), t)))
        for (l = 0; l < t.length; l++) fr(t[l]);
    }
  }
  function ma(t, l) {
    var e = t.stateNode;
    if (e === null) return null;
    var n = e[sl] || null;
    if (n === null) return null;
    e = n[l];
    t: switch (l) {
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
        (n = !n.disabled) || (t = t.type, n = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !n;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (e && typeof e != "function")
      throw Error(
        r(231, l, typeof e)
      );
    return e;
  }
  var ie = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), nf = !1;
  if (ie)
    try {
      var ya = {};
      Object.defineProperty(ya, "passive", {
        get: function() {
          nf = !0;
        }
      }), window.addEventListener("test", ya, ya), window.removeEventListener("test", ya, ya);
    } catch {
      nf = !1;
    }
  var _e = null, af = null, Tu = null;
  function sr() {
    if (Tu) return Tu;
    var t, l = af, e = l.length, n, a = "value" in _e ? _e.value : _e.textContent, i = a.length;
    for (t = 0; t < e && l[t] === a[t]; t++) ;
    var s = e - t;
    for (n = 1; n <= s && l[e - n] === a[i - n]; n++) ;
    return Tu = a.slice(t, 1 < n ? 1 - n : void 0);
  }
  function bu(t) {
    var l = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && l === 13 && (t = 13)) : t = l, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function _u() {
    return !0;
  }
  function rr() {
    return !1;
  }
  function ul(t) {
    function l(e, n, a, i, s) {
      this._reactName = e, this._targetInst = a, this.type = n, this.nativeEvent = i, this.target = s, this.currentTarget = null;
      for (var h in t)
        t.hasOwnProperty(h) && (e = t[h], this[h] = e ? e(i) : i[h]);
      return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? _u : rr, this.isPropagationStopped = rr, this;
    }
    return V(l.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = _u);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = _u);
      },
      persist: function() {
      },
      isPersistent: _u
    }), l;
  }
  var ze = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, zu = ul(ze), Sa = V({}, ze, { view: 0, detail: 0 }), ed = ul(Sa), uf, ff, Ea, Au = V({}, Sa, {
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
    getModifierState: sf,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Ea && (Ea && t.type === "mousemove" ? (uf = t.screenX - Ea.screenX, ff = t.screenY - Ea.screenY) : ff = uf = 0, Ea = t), uf);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : ff;
    }
  }), hr = ul(Au), nd = V({}, Au, { dataTransfer: 0 }), ad = ul(nd), ud = V({}, Sa, { relatedTarget: 0 }), cf = ul(ud), id = V({}, ze, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), fd = ul(id), cd = V({}, ze, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), sd = ul(cd), rd = V({}, ze, { data: 0 }), or = ul(rd), hd = {
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
  }, od = {
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
  }, dd = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function vd(t) {
    var l = this.nativeEvent;
    return l.getModifierState ? l.getModifierState(t) : (t = dd[t]) ? !!l[t] : !1;
  }
  function sf() {
    return vd;
  }
  var gd = V({}, Sa, {
    key: function(t) {
      if (t.key) {
        var l = hd[t.key] || t.key;
        if (l !== "Unidentified") return l;
      }
      return t.type === "keypress" ? (t = bu(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? od[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: sf,
    charCode: function(t) {
      return t.type === "keypress" ? bu(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? bu(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), md = ul(gd), yd = V({}, Au, {
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
  }), dr = ul(yd), Sd = V({}, ze, { submitter: 0 }), Ed = ul(Sd), Td = V({}, Sa, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: sf
  }), bd = ul(Td), _d = V({}, ze, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), zd = ul(_d), Ad = V({}, Au, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Od = ul(Ad), Md = V({}, ze, {
    newState: 0,
    oldState: 0,
    source: 0
  }), pd = ul(Md), Nd = [9, 13, 27, 32], rf = ie && "CompositionEvent" in window, Ta = null;
  ie && "documentMode" in document && (Ta = document.documentMode);
  var Cd = ie && "TextEvent" in window && !Ta, vr = ie && (!rf || Ta && 8 < Ta && 11 >= Ta), gr = " ", mr = !1;
  function yr(t, l) {
    switch (t) {
      case "keyup":
        return Nd.indexOf(l.keyCode) !== -1;
      case "keydown":
        return l.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Sr(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Nn = !1;
  function Dd(t, l) {
    switch (t) {
      case "compositionend":
        return Sr(l);
      case "keypress":
        return l.which !== 32 ? null : (mr = !0, gr);
      case "textInput":
        return t = l.data, t === gr && mr ? null : t;
      default:
        return null;
    }
  }
  function xd(t, l) {
    if (Nn)
      return t === "compositionend" || !rf && yr(t, l) ? (t = sr(), Tu = af = _e = null, Nn = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(l.ctrlKey || l.altKey || l.metaKey) || l.ctrlKey && l.altKey) {
          if (l.char && 1 < l.char.length)
            return l.char;
          if (l.which) return String.fromCharCode(l.which);
        }
        return null;
      case "compositionend":
        return vr && l.locale !== "ko" ? null : l.data;
      default:
        return null;
    }
  }
  var Rd = {
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
  function Er(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l === "input" ? !!Rd[t.type] : l === "textarea";
  }
  function Tr(t, l, e, n) {
    Mn ? pn ? pn.push(n) : pn = [n] : Mn = n, l = Oi(l, "onChange"), 0 < l.length && (e = new zu(
      "onChange",
      "change",
      null,
      e,
      n
    ), t.push({ event: e, listeners: l }));
  }
  var ba = null, _a = null;
  function Ud(t) {
    f1(t, 0);
  }
  function Ou(t) {
    var l = ga(t);
    if (lr(l)) return t;
  }
  function br(t, l) {
    if (t === "change") return l;
  }
  var _r = !1;
  if (ie) {
    var hf;
    if (ie) {
      var of = "oninput" in document;
      if (!of) {
        var zr = document.createElement("div");
        zr.setAttribute("oninput", "return;"), of = typeof zr.oninput == "function";
      }
      hf = of;
    } else hf = !1;
    _r = hf && (!document.documentMode || 9 < document.documentMode);
  }
  function Ar() {
    ba && (ba.detachEvent("onpropertychange", Or), _a = ba = null);
  }
  function Or(t) {
    if (t.propertyName === "value" && Ou(_a)) {
      var l = [];
      Tr(
        l,
        _a,
        t,
        lf(t)
      ), cr(Ud, l);
    }
  }
  function Hd(t, l, e) {
    t === "focusin" ? (Ar(), ba = l, _a = e, ba.attachEvent("onpropertychange", Or)) : t === "focusout" && Ar();
  }
  function qd(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Ou(_a);
  }
  function Bd(t, l) {
    if (t === "click") return Ou(l);
  }
  function Yd(t, l) {
    if (t === "input" || t === "change")
      return Ou(l);
  }
  function Gd(t, l) {
    return t === l && (t !== 0 || 1 / t === 1 / l) || t !== t && l !== l;
  }
  var El = typeof Object.is == "function" ? Object.is : Gd;
  function za(t, l) {
    if (El(t, l)) return !0;
    if (typeof t != "object" || t === null || typeof l != "object" || l === null)
      return !1;
    var e = Object.keys(t), n = Object.keys(l);
    if (e.length !== n.length) return !1;
    for (n = 0; n < e.length; n++) {
      var a = e[n];
      if (!Zi.call(l, a) || !El(t[a], l[a]))
        return !1;
    }
    return !0;
  }
  function df(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  function Mr(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function pr(t, l) {
    var e = Mr(t);
    t = 0;
    for (var n; e; ) {
      if (e.nodeType === 3) {
        if (n = t + e.textContent.length, t <= l && n >= l)
          return { node: e, offset: l - t };
        t = n;
      }
      t: {
        for (; e; ) {
          if (e.nextSibling) {
            e = e.nextSibling;
            break t;
          }
          e = e.parentNode;
        }
        e = void 0;
      }
      e = Mr(e);
    }
  }
  function Nr(t, l) {
    return t && l ? t === l ? !0 : t && t.nodeType === 3 ? !1 : l && l.nodeType === 3 ? Nr(t, l.parentNode) : "contains" in t ? t.contains(l) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(l) & 16) : !1 : !1;
  }
  function Cr(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var l = df(t.document); l instanceof t.HTMLIFrameElement; ) {
      try {
        var e = typeof l.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) t = l.contentWindow;
      else break;
      l = df(t.document);
    }
    return l;
  }
  function vf(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l && (l === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || l === "textarea" || t.contentEditable === "true");
  }
  var Xd = ie && "documentMode" in document && 11 >= document.documentMode, Cn = null, gf = null, Aa = null, mf = !1;
  function Dr(t, l, e) {
    var n = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    mf || Cn == null || Cn !== df(n) || (n = Cn, "selectionStart" in n && vf(n) ? n = { start: n.selectionStart, end: n.selectionEnd } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = {
      anchorNode: n.anchorNode,
      anchorOffset: n.anchorOffset,
      focusNode: n.focusNode,
      focusOffset: n.focusOffset
    }), Aa && za(Aa, n) || (Aa = n, n = Oi(gf, "onSelect"), 0 < n.length && (l = new zu(
      "onSelect",
      "select",
      null,
      l,
      e
    ), t.push({ event: l, listeners: n }), l.target = Cn)));
  }
  function Ie(t, l) {
    var e = {};
    return e[t.toLowerCase()] = l.toLowerCase(), e["Webkit" + t] = "webkit" + l, e["Moz" + t] = "moz" + l, e;
  }
  var Dn = {
    animationend: Ie("Animation", "AnimationEnd"),
    animationiteration: Ie("Animation", "AnimationIteration"),
    animationstart: Ie("Animation", "AnimationStart"),
    transitionrun: Ie("Transition", "TransitionRun"),
    transitionstart: Ie("Transition", "TransitionStart"),
    transitioncancel: Ie("Transition", "TransitionCancel"),
    transitionend: Ie("Transition", "TransitionEnd")
  }, yf = {}, xr = {};
  ie && (xr = document.createElement("div").style, "AnimationEvent" in window || (delete Dn.animationend.animation, delete Dn.animationiteration.animation, delete Dn.animationstart.animation), "TransitionEvent" in window || delete Dn.transitionend.transition);
  function ke(t) {
    if (yf[t]) return yf[t];
    if (!Dn[t]) return t;
    var l = Dn[t], e;
    for (e in l)
      if (l.hasOwnProperty(e) && e in xr)
        return yf[t] = l[e];
    return t;
  }
  var Rr = ke("animationend"), Ur = ke("animationiteration"), Hr = ke("animationstart"), Ld = ke("transitionrun"), Qd = ke("transitionstart"), Vd = ke("transitioncancel"), qr = ke("transitionend"), Br = /* @__PURE__ */ new Map(), Sf = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Sf.push("scrollEnd");
  function Yl(t, l) {
    Br.set(t, l), We(l, [t]);
  }
  var jd = 0;
  function fe(t, l) {
    if (t.name != null && t.name !== "auto") return t.name;
    if (l.autoName !== null) return l.autoName;
    t = Ql.identifierPrefix;
    var e = jd++;
    return t = "_" + t + "t_" + e.toString(32) + "_", l.autoName = t;
  }
  function Yr(t) {
    if (t == null || typeof t == "string")
      return t;
    var l = null, e = Wn;
    if (e !== null)
      for (var n = 0; n < e.length; n++) {
        var a = t[e[n]];
        if (a != null) {
          if (a === "none") return "none";
          l = l == null ? a : l + (" " + a);
        }
      }
    return l ?? t.default;
  }
  function ce(t, l) {
    return t = Yr(t), l = Yr(l), l == null ? t === "auto" ? null : t : l === "auto" ? null : l;
  }
  var Mu = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var l = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(l)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, Nl = [], xn = 0, Ef = 0;
  function pu() {
    for (var t = xn, l = Ef = xn = 0; l < t; ) {
      var e = Nl[l];
      Nl[l++] = null;
      var n = Nl[l];
      Nl[l++] = null;
      var a = Nl[l];
      Nl[l++] = null;
      var i = Nl[l];
      if (Nl[l++] = null, n !== null && a !== null) {
        var s = n.pending;
        s === null ? a.next = a : (a.next = s.next, s.next = a), n.pending = a;
      }
      i !== 0 && Gr(e, a, i);
    }
  }
  function Nu(t, l, e, n) {
    Nl[xn++] = t, Nl[xn++] = l, Nl[xn++] = e, Nl[xn++] = n, Ef |= n, t.lanes |= n, t = t.alternate, t !== null && (t.lanes |= n);
  }
  function Tf(t, l, e, n) {
    return Nu(t, l, e, n), Cu(t);
  }
  function Pe(t, l) {
    return Nu(t, null, null, l), Cu(t);
  }
  function Gr(t, l, e) {
    t.lanes |= e;
    var n = t.alternate;
    n !== null && (n.lanes |= e);
    for (var a = !1, i = t.return; i !== null; )
      i.childLanes |= e, n = i.alternate, n !== null && (n.childLanes |= e), i.tag === 22 && (t = i.stateNode, t === null || t._visibility & 1 || (a = !0)), t = i, i = i.return;
    return t.tag === 3 ? (i = t.stateNode, a && l !== null && (a = 31 - yl(e), t = i.hiddenUpdates, n = t[a], n === null ? t[a] = [l] : n.push(l), l.lane = e | 536870912), i) : null;
  }
  function Cu(t) {
    if (50 < Ka)
      throw Ka = 0, Si = null, Error(r(185));
    for (var l = t.return; l !== null; )
      t = l, l = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Rn = {};
  function Zd(t, l, e, n) {
    this.tag = t, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = l, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function rl(t, l, e, n) {
    return new Zd(t, l, e, n);
  }
  function bf(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function se(t, l) {
    var e = t.alternate;
    return e === null ? (e = rl(
      t.tag,
      l,
      t.key,
      t.mode
    ), e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.alternate = t, t.alternate = e) : (e.pendingProps = l, e.type = t.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = t.flags & 1206910976, e.childLanes = t.childLanes, e.lanes = t.lanes, e.child = t.child, e.memoizedProps = t.memoizedProps, e.memoizedState = t.memoizedState, e.updateQueue = t.updateQueue, l = t.dependencies, e.dependencies = l === null ? null : { lanes: l.lanes, firstContext: l.firstContext }, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.refCleanup = t.refCleanup, e;
  }
  function Xr(t, l) {
    t.flags &= 1206910978;
    var e = t.alternate;
    return e === null ? (t.childLanes = 0, t.lanes = l, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, t.type = e.type, l = e.dependencies, t.dependencies = l === null ? null : {
      lanes: l.lanes,
      firstContext: l.firstContext
    }), t;
  }
  function Du(t, l, e, n, a, i) {
    var s = 0;
    if (n = t, typeof n == "function") bf(n) && (s = 1);
    else if (typeof n == "string")
      s = Sg(
        t,
        e,
        Kl.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (n) {
        case wt:
          return t = rl(31, e, l, a), t.elementType = wt, t.lanes = i, t;
        case St:
          return tn(e.children, a, i, l);
        case vt:
          s = 8, a |= 24;
          break;
        case ft:
          return t = rl(12, e, l, a | 2), t.elementType = ft, t.lanes = i, t;
        case P:
          return t = rl(13, e, l, a), t.elementType = P, t.lanes = i, t;
        case lt:
          return t = rl(19, e, l, a), t.elementType = lt, t.lanes = i, t;
        case Ml:
        case T:
          return t = a | 32, t = rl(30, e, l, t), t.elementType = T, t.lanes = i, t.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, t;
        default:
          if (typeof n == "object" && n !== null)
            switch (n.$$typeof) {
              case zt:
                s = 10;
                break t;
              case k:
                s = 9;
                break t;
              case X:
                s = 11;
                break t;
              case At:
                s = 14;
                break t;
              case Tt:
                s = 16, n = null;
                break t;
            }
          s = 29, e = Error(
            r(130, t === null ? "null" : typeof t, "")
          ), n = null;
      }
    return l = rl(s, e, l, a), l.elementType = t, l.type = n, l.lanes = i, l;
  }
  function tn(t, l, e, n) {
    return t = rl(7, t, n, l), t.lanes = e, t;
  }
  function _f(t, l, e) {
    return t = rl(6, t, null, l), t.lanes = e, t;
  }
  function Lr(t) {
    var l = rl(18, null, null, 0);
    return l.stateNode = t, l;
  }
  function zf(t, l, e) {
    return l = rl(
      4,
      t.children !== null ? t.children : [],
      t.key,
      l
    ), l.lanes = e, l.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, l;
  }
  var Qr = /* @__PURE__ */ new WeakMap();
  function Cl(t, l) {
    if (typeof t == "object" && t !== null) {
      var e = Qr.get(t);
      return e !== void 0 ? e : (l = {
        value: t,
        source: l,
        stack: qs(l)
      }, Qr.set(t, l), l);
    }
    return {
      value: t,
      source: l,
      stack: qs(l)
    };
  }
  var Un = [], Hn = 0, xu = null, Oa = 0, Dl = [], xl = 0, Ae = null, Fl = 1, $l = "";
  function re(t, l) {
    Un[Hn++] = Oa, Un[Hn++] = xu, xu = t, Oa = l;
  }
  function Vr(t, l, e) {
    Dl[xl++] = Fl, Dl[xl++] = $l, Dl[xl++] = Ae, Ae = t;
    var n = Fl;
    t = $l;
    var a = 32 - yl(n) - 1;
    n &= ~(1 << a), e += 1;
    var i = 32 - yl(l) + a;
    if (30 < i) {
      var s = a - a % 5;
      i = (n & (1 << s) - 1).toString(32), n >>= s, a -= s, Fl = 1 << 32 - yl(l) + a | e << a | n, $l = i + t;
    } else
      Fl = 1 << i | e << a | n, $l = t;
  }
  function Ru(t) {
    t.return !== null && (re(t, 1), Vr(t, 1, 0));
  }
  function Af(t) {
    for (; t === xu; )
      xu = Un[--Hn], Un[Hn] = null, Oa = Un[--Hn], Un[Hn] = null;
    for (; t === Ae; )
      Ae = Dl[--xl], Dl[xl] = null, $l = Dl[--xl], Dl[xl] = null, Fl = Dl[--xl], Dl[xl] = null;
  }
  function jr(t, l) {
    Dl[xl++] = Fl, Dl[xl++] = $l, Dl[xl++] = Ae, Fl = l.id, $l = l.overflow, Ae = t;
  }
  var Jt = null, Ut = null, st = !1, Oe = null, Rl = !1, Of = Error(r(519));
  function Me(t) {
    var l = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ma(Cl(l, t)), Of;
  }
  function Zr(t) {
    var l = t.stateNode, e = t.type, n = t.memoizedProps;
    switch (l[It] = t, l[sl] = n, e) {
      case "dialog":
        ot("cancel", l), ot("close", l);
        break;
      case "iframe":
      case "object":
      case "embed":
        ot("load", l);
        break;
      case "video":
      case "audio":
        for (e = 0; e < Fa.length; e++)
          ot(Fa[e], l);
        break;
      case "source":
        ot("error", l);
        break;
      case "img":
      case "image":
      case "link":
        ot("error", l), ot("load", l);
        break;
      case "details":
        ot("toggle", l);
        break;
      case "input":
        ot("invalid", l), er(
          l,
          n.value,
          n.defaultValue,
          n.checked,
          n.defaultChecked,
          n.type,
          n.name,
          !0
        );
        break;
      case "select":
        ot("invalid", l);
        break;
      case "textarea":
        ot("invalid", l), ar(l, n.value, n.defaultValue, n.children);
    }
    e = n.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || l.textContent === "" + e || n.suppressHydrationWarning === !0 || h1(l.textContent, e) ? (n.popover != null && (ot("beforetoggle", l), ot("toggle", l)), n.onScroll != null && ot("scroll", l), n.onScrollEnd != null && ot("scrollend", l), n.onClick != null && (l.onclick = Jl), l = !0) : l = !1, l || Me(t, !0);
  }
  function Uu(t) {
    for (Jt = t.return; Jt; )
      switch (Jt.tag) {
        case 5:
        case 31:
        case 13:
          Rl = !1;
          return;
        case 27:
        case 3:
          Rl = !0;
          return;
        default:
          Jt = Jt.return;
      }
  }
  function qn(t) {
    if (t !== Jt) return !1;
    if (!st) return Uu(t), st = !0, !1;
    var l = t.tag, e;
    if ((e = l !== 3 && l !== 27) && ((e = l === 5) && (e = t.type, e = !(e !== "form" && e !== "button") || ls(t.type, t.memoizedProps)), e = !e), e && Ut && Me(t), Uu(t), l === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      Ut = D1(t);
    } else if (l === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      Ut = D1(t);
    } else
      l === 27 ? (l = Ut, Ve(t.type) ? (t = rs, rs = null, Ut = t) : Ut = l) : Ut = Jt ? Hl(t.stateNode.nextSibling) : null;
    return !0;
  }
  function ln() {
    Ut = Jt = null, st = !1;
  }
  function Mf() {
    var t = Oe;
    return t !== null && (dl === null ? dl = t : dl.push.apply(
      dl,
      t
    ), Oe = null), t;
  }
  function Ma(t) {
    Oe === null ? Oe = [t] : Oe.push(t);
  }
  var pf = wl(null), en = null, he = null;
  function pe(t, l, e) {
    Rt(pf, l._currentValue), l._currentValue = e;
  }
  function oe(t) {
    t._currentValue = pf.current, Wt(pf);
  }
  function Hu(t, l, e) {
    for (; t !== null; ) {
      var n = t.alternate;
      if ((t.childLanes & l) !== l ? (t.childLanes |= l, n !== null && (n.childLanes |= l)) : n !== null && (n.childLanes & l) !== l && (n.childLanes |= l), t === e) break;
      t = t.return;
    }
  }
  function Nf(t, l, e, n) {
    var a = t.child;
    for (a !== null && (a.return = t); a !== null; ) {
      var i = a.dependencies;
      if (i !== null) {
        var s = a.child;
        i = i.firstContext;
        t: for (; i !== null; ) {
          var h = i;
          i = a;
          for (var g = 0; g < l.length; g++)
            if (h.context === l[g]) {
              i.lanes |= e, h = i.alternate, h !== null && (h.lanes |= e), Hu(
                i.return,
                e,
                t
              ), n || (s = null);
              break t;
            }
          i = h.next;
        }
      } else if (a.tag === 18) {
        if (s = a.return, s === null) throw Error(r(341));
        s.lanes |= e, i = s.alternate, i !== null && (i.lanes |= e), Hu(s, e, t), s = null;
      } else
        a.tag === 13 && a.memoizedState !== null && a.memoizedState.dehydrated === null ? (a.lanes |= e, s = a.alternate, s !== null && (s.lanes |= e), Hu(
          a.return,
          e,
          t
        ), s = a.child, s = s !== null ? s.sibling : null) : s = a.child;
      if (s !== null) s.return = a;
      else
        for (s = a; s !== null; ) {
          if (s === t) {
            s = null;
            break;
          }
          if (a = s.sibling, a !== null) {
            a.return = s.return, s = a;
            break;
          }
          s = s.return;
        }
      a = s;
    }
  }
  function nn(t, l, e, n) {
    t = null;
    for (var a = l, i = !1; a !== null; ) {
      if (!i) {
        if ((a.flags & 524288) !== 0) i = !0;
        else if ((a.flags & 262144) !== 0) break;
      }
      if (a.tag === 10) {
        var s = a.alternate;
        if (s === null) throw Error(r(387));
        if (s = s.memoizedProps, s !== null) {
          var h = a.type;
          El(a.pendingProps.value, s.value) || (t !== null ? t.push(h) : t = [h]);
        }
      } else if (a === fu.current) {
        if (s = a.alternate, s === null) throw Error(r(387));
        s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (t !== null ? t.push(ia) : t = [ia]);
      }
      a = a.return;
    }
    return t !== null && Nf(
      l,
      t,
      e,
      n
    ), l.flags |= 262144, t !== null;
  }
  function qu(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!El(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function an(t) {
    en = t, he = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function kt(t) {
    return wr(en, t);
  }
  function Bu(t, l) {
    return en === null && an(t), wr(t, l);
  }
  function wr(t, l) {
    var e = l._currentValue;
    if (l = { context: l, memoizedValue: e, next: null }, he === null) {
      if (t === null) throw Error(r(308));
      he = l, t.dependencies = { lanes: 0, firstContext: l }, t.flags |= 524288;
    } else he = he.next = l;
    return e;
  }
  var wd = typeof AbortController < "u" ? AbortController : function() {
    var t = [], l = this.signal = {
      aborted: !1,
      addEventListener: function(e, n) {
        t.push(n);
      }
    };
    this.abort = function() {
      l.aborted = !0, t.forEach(function(e) {
        return e();
      });
    };
  }, Kd = f.unstable_scheduleCallback, Jd = f.unstable_NormalPriority, Lt = {
    $$typeof: zt,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Cf() {
    return {
      controller: new wd(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function pa(t) {
    t.refCount--, t.refCount === 0 && Kd(Jd, function() {
      t.controller.abort();
    });
  }
  function Kr(t, l) {
    if ((t.pendingLanes & 4194048) !== 0) {
      var e = t.transitionTypes;
      for (e === null && (e = t.transitionTypes = []), t = 0; t < l.length; t++) {
        var n = l[t];
        e.indexOf(n) === -1 && e.push(n);
      }
    }
  }
  var Na = null;
  function Fd(t) {
    var l = t.transitionTypes;
    return t.transitionTypes = null, l;
  }
  var Ca = null, Df = 0, un = 0, Bn = null;
  function $d(t, l) {
    if (Ca === null) {
      var e = Ca = [];
      Df = 0, un = Kc(), Bn = {
        status: "pending",
        value: void 0,
        then: function(n) {
          e.push(n);
        }
      };
    }
    return Df++, l.then(Jr, Jr), l;
  }
  function Jr() {
    if (--Df === 0 && (Na = null, Ca !== null)) {
      Bn !== null && (Bn.status = "fulfilled");
      var t = Ca;
      Ca = null, un = 0, Bn = null;
      for (var l = 0; l < t.length; l++) (0, t[l])();
    }
  }
  function Wd(t, l) {
    var e = [], n = {
      status: "pending",
      value: null,
      reason: null,
      then: function(a) {
        e.push(a);
      }
    };
    return t.then(
      function() {
        n.status = "fulfilled", n.value = l;
        for (var a = 0; a < e.length; a++) (0, e[a])(l);
      },
      function(a) {
        for (n.status = "rejected", n.reason = a, a = 0; a < e.length; a++)
          (0, e[a])(void 0);
      }
    ), n;
  }
  var Fr = w.S;
  w.S = function(t, l) {
    if (L0 = gl(), typeof l == "object" && l !== null && typeof l.then == "function" && $d(t, l), Na !== null)
      for (var e = ta; e !== null; )
        Kr(e, Na), e = e.next;
    if (e = t.types, e !== null) {
      for (var n = ta; n !== null; )
        Kr(n, e), n = n.next;
      if (un !== 0) {
        n = Na, n === null && (n = Na = []);
        for (var a = 0; a < e.length; a++) {
          var i = e[a];
          n.indexOf(i) === -1 && n.push(i);
        }
      }
    }
    Fr !== null && Fr(t, l);
  };
  var fn = wl(null);
  function xf() {
    var t = fn.current;
    return t !== null ? t : xt.pooledCache;
  }
  function Yu(t, l) {
    l === null ? Rt(fn, fn.current) : Rt(fn, l.pool);
  }
  function $r() {
    var t = xf();
    return t === null ? null : { parent: Lt._currentValue, pool: t };
  }
  var Yn = Error(r(460)), Rf = Error(r(474)), Gu = Error(r(542)), Xu = { then: function() {
  } };
  function Wr(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Ir(t, l, e) {
    switch (e = t[e], e === void 0 ? t.push(l) : e !== l && (l.then(Jl, Jl), l = e), l.status) {
      case "fulfilled":
        return l.value;
      case "rejected":
        throw t = l.reason, Pr(t), t === void 0 && !("reason" in l) ? Error(r(600)) : t;
      default:
        if (typeof l.status == "string") l.then(Jl, Jl);
        else {
          if (t = xt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(r(482));
          t = l, t.status = "pending", t.then(
            function(n) {
              if (l.status === "pending") {
                var a = l;
                a.status = "fulfilled", a.value = n;
              }
            },
            function(n) {
              if (l.status === "pending") {
                var a = l;
                a.status = "rejected", a.reason = n;
              }
            }
          );
        }
        switch (l.status) {
          case "fulfilled":
            return l.value;
          case "rejected":
            throw t = l.reason, Pr(t), t;
        }
        throw sn = l, Yn;
    }
  }
  function cn(t) {
    try {
      var l = t._init;
      return l(t._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (sn = e, Yn) : e;
    }
  }
  var sn = null;
  function kr() {
    if (sn === null) throw Error(r(459));
    var t = sn;
    return sn = null, t;
  }
  function Pr(t) {
    if (t === Yn || t === Gu)
      throw Error(r(483));
  }
  var Gn = null, Da = 0;
  function Lu(t) {
    var l = Da;
    return Da += 1, Gn === null && (Gn = []), Ir(Gn, t, l);
  }
  function Ne(t, l) {
    l = l.props.ref, t.ref = l !== void 0 ? l : null;
  }
  function Qu(t, l) {
    throw l.$$typeof === I ? Error(r(525)) : (t = Object.prototype.toString.call(l), Error(
      r(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t
      )
    ));
  }
  function th(t) {
    function l(_, S) {
      if (t) {
        var O = _.deletions;
        O === null ? (_.deletions = [S], _.flags |= 16) : O.push(S);
      }
    }
    function e(_, S) {
      if (!t) return null;
      for (; S !== null; )
        l(_, S), S = S.sibling;
      return null;
    }
    function n(_) {
      for (var S = /* @__PURE__ */ new Map(); _ !== null; )
        _.key === null ? S.set(_.index, _) : S.set(_.key, _), _ = _.sibling;
      return S;
    }
    function a(_, S) {
      return _ = se(_, S), _.index = 0, _.sibling = null, _;
    }
    function i(_, S, O) {
      return _.index = O, t ? (O = _.alternate, O !== null ? (O = O.index, O < S ? (_.flags |= 2, S) : O) : (_.flags |= 134217730, S)) : (_.flags |= 1048576, S);
    }
    function s(_) {
      return t && _.alternate === null && (_.flags |= 134217730), _;
    }
    function h(_, S, O, D) {
      return S === null || S.tag !== 6 ? (S = _f(O, _.mode, D), S.return = _, S) : (S = a(S, O), S.return = _, S);
    }
    function g(_, S, O, D) {
      var Q = O.type;
      return Q === St ? (_ = p(
        _,
        S,
        O.props.children,
        D,
        O.key
      ), Ne(_, O), _) : S !== null && (S.elementType === Q || typeof Q == "object" && Q !== null && Q.$$typeof === Tt && cn(Q) === S.type) ? (S = a(S, O.props), Ne(S, O), S.return = _, S) : (S = Du(
        O.type,
        O.key,
        O.props,
        null,
        _.mode,
        D
      ), Ne(S, O), S.return = _, S);
    }
    function z(_, S, O, D) {
      return S === null || S.tag !== 4 || S.stateNode.containerInfo !== O.containerInfo || S.stateNode.implementation !== O.implementation ? (S = zf(O, _.mode, D), S.return = _, S) : (S = a(S, O.children || []), S.return = _, S);
    }
    function p(_, S, O, D, Q) {
      return S === null || S.tag !== 7 ? (S = tn(
        O,
        _.mode,
        D,
        Q
      ), S.return = _, S) : (S = a(S, O), S.return = _, S);
    }
    function x(_, S, O) {
      if (typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint")
        return S = _f(
          "" + S,
          _.mode,
          O
        ), S.return = _, S;
      if (typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case _t:
            return O = Du(
              S.type,
              S.key,
              S.props,
              null,
              _.mode,
              O
            ), Ne(O, S), O.return = _, O;
          case dt:
            return S = zf(
              S,
              _.mode,
              O
            ), S.return = _, S;
          case Tt:
            return S = cn(S), x(_, S, O);
        }
        if (Et(S) || j(S))
          return S = tn(
            S,
            _.mode,
            O,
            null
          ), S.return = _, S;
        if (typeof S.then == "function")
          return x(_, Lu(S), O);
        if (S.$$typeof === zt)
          return x(
            _,
            Bu(_, S),
            O
          );
        Qu(_, S);
      }
      return null;
    }
    function b(_, S, O, D) {
      var Q = S !== null ? S.key : null;
      if (typeof O == "string" && O !== "" || typeof O == "number" || typeof O == "bigint")
        return Q !== null ? null : h(_, S, "" + O, D);
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case _t:
            return O.key === Q ? g(_, S, O, D) : null;
          case dt:
            return O.key === Q ? z(_, S, O, D) : null;
          case Tt:
            return O = cn(O), b(_, S, O, D);
        }
        if (Et(O) || j(O))
          return Q !== null ? null : p(_, S, O, D, null);
        if (typeof O.then == "function")
          return b(
            _,
            S,
            Lu(O),
            D
          );
        if (O.$$typeof === zt)
          return b(
            _,
            S,
            Bu(_, O),
            D
          );
        Qu(_, O);
      }
      return null;
    }
    function M(_, S, O, D, Q) {
      if (typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint")
        return _ = _.get(O) || null, h(S, _, "" + D, Q);
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case _t:
            return _ = _.get(
              D.key === null ? O : D.key
            ) || null, g(S, _, D, Q);
          case dt:
            return _ = _.get(
              D.key === null ? O : D.key
            ) || null, z(S, _, D, Q);
          case Tt:
            return D = cn(D), M(
              _,
              S,
              O,
              D,
              Q
            );
        }
        if (Et(D) || j(D))
          return _ = _.get(O) || null, p(S, _, D, Q, null);
        if (typeof D.then == "function")
          return M(
            _,
            S,
            O,
            Lu(D),
            Q
          );
        if (D.$$typeof === zt)
          return M(
            _,
            S,
            O,
            Bu(S, D),
            Q
          );
        Qu(S, D);
      }
      return null;
    }
    function Y(_, S, O, D) {
      for (var Q = null, mt = null, F = S, tt = S = 0, jt = null; F !== null && tt < O.length; tt++) {
        F.index > tt ? (jt = F, F = null) : jt = F.sibling;
        var yt = b(
          _,
          F,
          O[tt],
          D
        );
        if (yt === null) {
          F === null && (F = jt);
          break;
        }
        t && F && yt.alternate === null && l(_, F), S = i(yt, S, tt), mt === null ? Q = yt : mt.sibling = yt, mt = yt, F = jt;
      }
      if (tt === O.length)
        return e(_, F), st && re(_, tt), Q;
      if (F === null) {
        for (; tt < O.length; tt++)
          F = x(_, O[tt], D), F !== null && (S = i(
            F,
            S,
            tt
          ), mt === null ? Q = F : mt.sibling = F, mt = F);
        return st && re(_, tt), Q;
      }
      for (F = n(F); tt < O.length; tt++)
        jt = M(
          F,
          _,
          tt,
          O[tt],
          D
        ), jt !== null && (t && (yt = jt.alternate, yt !== null && F.delete(yt.key === null ? tt : yt.key)), S = i(
          jt,
          S,
          tt
        ), mt === null ? Q = jt : mt.sibling = jt, mt = jt);
      return t && F.forEach(function(Je) {
        return l(_, Je);
      }), st && re(_, tt), Q;
    }
    function Z(_, S, O, D) {
      if (O == null) throw Error(r(151));
      for (var Q = null, mt = null, F = S, tt = S = 0, jt = null, yt = O.next(); F !== null && !yt.done; tt++, yt = O.next()) {
        F.index > tt ? (jt = F, F = null) : jt = F.sibling;
        var Je = b(_, F, yt.value, D);
        if (Je === null) {
          F === null && (F = jt);
          break;
        }
        t && F && Je.alternate === null && l(_, F), S = i(Je, S, tt), mt === null ? Q = Je : mt.sibling = Je, mt = Je, F = jt;
      }
      if (yt.done)
        return e(_, F), st && re(_, tt), Q;
      if (F === null) {
        for (; !yt.done; tt++, yt = O.next())
          yt = x(_, yt.value, D), yt !== null && (S = i(yt, S, tt), mt === null ? Q = yt : mt.sibling = yt, mt = yt);
        return st && re(_, tt), Q;
      }
      for (F = n(F); !yt.done; tt++, yt = O.next())
        yt = M(F, _, tt, yt.value, D), yt !== null && (t && (jt = yt.alternate, jt !== null && F.delete(
          jt.key === null ? tt : jt.key
        )), S = i(yt, S, tt), mt === null ? Q = yt : mt.sibling = yt, mt = yt);
      return t && F.forEach(function(Dg) {
        return l(_, Dg);
      }), st && re(_, tt), Q;
    }
    function it(_, S, O, D) {
      if (typeof O == "object" && O !== null && O.type === St && O.key === null && O.props.ref === void 0 && (O = O.props.children), typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case _t:
            t: {
              for (var Q = O.key; S !== null; ) {
                if (S.key === Q) {
                  if (Q = O.type, Q === St) {
                    if (S.tag === 7) {
                      e(
                        _,
                        S.sibling
                      ), D = a(
                        S,
                        O.props.children
                      ), Ne(D, O), D.return = _, _ = D;
                      break t;
                    }
                  } else if (S.elementType === Q || typeof Q == "object" && Q !== null && Q.$$typeof === Tt && cn(Q) === S.type) {
                    e(
                      _,
                      S.sibling
                    ), D = a(S, O.props), Ne(D, O), D.return = _, _ = D;
                    break t;
                  }
                  e(_, S);
                  break;
                } else l(_, S);
                S = S.sibling;
              }
              O.type === St ? (D = tn(
                O.props.children,
                _.mode,
                D,
                O.key
              ), Ne(D, O), D.return = _, _ = D) : (D = Du(
                O.type,
                O.key,
                O.props,
                null,
                _.mode,
                D
              ), Ne(D, O), D.return = _, _ = D);
            }
            return s(_);
          case dt:
            t: {
              for (Q = O.key; S !== null; ) {
                if (S.key === Q)
                  if (S.tag === 4 && S.stateNode.containerInfo === O.containerInfo && S.stateNode.implementation === O.implementation) {
                    e(
                      _,
                      S.sibling
                    ), D = a(S, O.children || []), D.return = _, _ = D;
                    break t;
                  } else {
                    e(_, S);
                    break;
                  }
                else l(_, S);
                S = S.sibling;
              }
              D = zf(O, _.mode, D), D.return = _, _ = D;
            }
            return s(_);
          case Tt:
            return O = cn(O), it(
              _,
              S,
              O,
              D
            );
        }
        if (Et(O))
          return Y(
            _,
            S,
            O,
            D
          );
        if (j(O)) {
          if (Q = j(O), typeof Q != "function") throw Error(r(150));
          return O = Q.call(O), Z(
            _,
            S,
            O,
            D
          );
        }
        if (typeof O.then == "function")
          return it(
            _,
            S,
            Lu(O),
            D
          );
        if (O.$$typeof === zt)
          return it(
            _,
            S,
            Bu(_, O),
            D
          );
        Qu(_, O);
      }
      return typeof O == "string" && O !== "" || typeof O == "number" || typeof O == "bigint" ? (O = "" + O, S !== null && S.tag === 6 ? (e(_, S.sibling), D = a(S, O), D.return = _, _ = D) : (e(_, S), D = _f(O, _.mode, D), D.return = _, _ = D), s(_)) : e(_, S);
    }
    return function(_, S, O, D) {
      try {
        Da = 0;
        var Q = it(
          _,
          S,
          O,
          D
        );
        return Gn = null, Q;
      } catch (F) {
        if (F === Yn || F === Gu) throw F;
        var mt = rl(29, F, null, _.mode);
        return mt.lanes = D, mt.return = _, mt;
      }
    };
  }
  var rn = th(!0), lh = th(!1), Ce = !1;
  function Uf(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Hf(t, l) {
    t = t.updateQueue, l.updateQueue === t && (l.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function De(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function xe(t, l, e) {
    var n = t.updateQueue;
    if (n === null) return null;
    if (n = n.shared, (Ot & 2) !== 0) {
      var a = n.pending;
      return a === null ? l.next = l : (l.next = a.next, a.next = l), n.pending = l, l = Cu(t), Gr(t, null, e), l;
    }
    return Nu(t, n, l, e), Cu(t);
  }
  function xa(t, l, e) {
    if (l = l.updateQueue, l !== null && (l = l.shared, (e & 4194048) !== 0)) {
      var n = l.lanes;
      n &= t.pendingLanes, e |= n, l.lanes = e, Vs(t, e);
    }
  }
  function qf(t, l) {
    var e = t.updateQueue, n = t.alternate;
    if (n !== null && (n = n.updateQueue, e === n)) {
      var a = null, i = null;
      if (e = e.firstBaseUpdate, e !== null) {
        do {
          var s = {
            lane: e.lane,
            tag: e.tag,
            payload: e.payload,
            callback: null,
            next: null
          };
          i === null ? a = i = s : i = i.next = s, e = e.next;
        } while (e !== null);
        i === null ? a = i = l : i = i.next = l;
      } else a = i = l;
      e = {
        baseState: n.baseState,
        firstBaseUpdate: a,
        lastBaseUpdate: i,
        shared: n.shared,
        callbacks: n.callbacks
      }, t.updateQueue = e;
      return;
    }
    t = e.lastBaseUpdate, t === null ? e.firstBaseUpdate = l : t.next = l, e.lastBaseUpdate = l;
  }
  var Bf = !1;
  function Ra() {
    if (Bf) {
      var t = Bn;
      if (t !== null) throw t;
    }
  }
  function Ua(t, l, e, n) {
    Bf = !1;
    var a = t.updateQueue;
    Ce = !1;
    var i = a.firstBaseUpdate, s = a.lastBaseUpdate, h = a.shared.pending;
    if (h !== null) {
      a.shared.pending = null;
      var g = h, z = g.next;
      g.next = null, s === null ? i = z : s.next = z, s = g;
      var p = t.alternate;
      p !== null && (p = p.updateQueue, h = p.lastBaseUpdate, h !== s && (h === null ? p.firstBaseUpdate = z : h.next = z, p.lastBaseUpdate = g));
    }
    if (i !== null) {
      var x = a.baseState;
      s = 0, p = z = g = null, h = i;
      do {
        var b = h.lane & -536870913, M = b !== h.lane;
        if (M ? (gt & b) === b : (n & b) === b) {
          b !== 0 && b === un && (Bf = !0), p !== null && (p = p.next = {
            lane: 0,
            tag: h.tag,
            payload: h.payload,
            callback: null,
            next: null
          });
          t: {
            var Y = t, Z = h;
            b = l;
            var it = e;
            switch (Z.tag) {
              case 1:
                if (Y = Z.payload, typeof Y == "function") {
                  x = Y.call(it, x, b);
                  break t;
                }
                x = Y;
                break t;
              case 3:
                Y.flags = Y.flags & -65537 | 128;
              case 0:
                if (Y = Z.payload, b = typeof Y == "function" ? Y.call(it, x, b) : Y, b == null) break t;
                x = V({}, x, b);
                break t;
              case 2:
                Ce = !0;
            }
          }
          b = h.callback, b !== null && (t.flags |= 64, M && (t.flags |= 8192), M = a.callbacks, M === null ? a.callbacks = [b] : M.push(b));
        } else
          M = {
            lane: b,
            tag: h.tag,
            payload: h.payload,
            callback: h.callback,
            next: null
          }, p === null ? (z = p = M, g = x) : p = p.next = M, s |= b;
        if (h = h.next, h === null) {
          if (h = a.shared.pending, h === null)
            break;
          M = h, h = M.next, M.next = null, a.lastBaseUpdate = M, a.shared.pending = null;
        }
      } while (!0);
      p === null && (g = x), a.baseState = g, a.firstBaseUpdate = z, a.lastBaseUpdate = p, i === null && (a.shared.lanes = 0), Ge |= s, t.lanes = s, t.memoizedState = x;
    }
  }
  function eh(t, l) {
    if (typeof t != "function")
      throw Error(r(191, t));
    t.call(l);
  }
  function nh(t, l) {
    var e = t.callbacks;
    if (e !== null)
      for (t.callbacks = null, t = 0; t < e.length; t++)
        eh(e[t], l);
  }
  var Re = wl(null), Vu = wl(0);
  function ah(t, l) {
    t = ye, Rt(Vu, t), Rt(Re, l), ye = t | l.baseLanes;
  }
  function Yf() {
    Rt(Vu, ye), Rt(Re, Re.current);
  }
  function Gf() {
    ye = Vu.current, Wt(Re), Wt(Vu);
  }
  var Pt = wl(null), al = null;
  function Ue(t) {
    var l = t.alternate;
    Rt(tl, tl.current & 1), Rt(Pt, t), al === null && (l === null || Re.current !== null || l.memoizedState !== null) && (al = t);
  }
  function Xf(t) {
    Rt(tl, tl.current), Rt(Pt, t), al === null && (al = t);
  }
  function uh(t) {
    t.tag === 22 ? (Rt(tl, tl.current), Rt(Pt, t), al === null && (al = t)) : He();
  }
  function He() {
    Rt(tl, tl.current), Rt(Pt, Pt.current);
  }
  function Tl(t) {
    Wt(Pt), al === t && (al = null), Wt(tl);
  }
  var tl = wl(0);
  function Ha(t, l) {
    Rt(Pt, Pt.current), Rt(tl, l);
  }
  function Lf(t) {
    Wt(tl), Wt(Pt), al === t && (al = null);
  }
  function ju(t) {
    for (var l = t; l !== null; ) {
      if (l.tag === 13) {
        var e = l.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || cs(e) || ss(e)))
          return l;
      } else if (l.tag === 19 && l.memoizedProps.revealOrder !== "independent") {
        if ((l.flags & 128) !== 0) return l;
      } else if (l.child !== null) {
        l.child.return = l, l = l.child;
        continue;
      }
      if (l === t) break;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === t) return null;
        l = l.return;
      }
      l.sibling.return = l.return, l = l.sibling;
    }
    return null;
  }
  var de = 0, ut = null, Dt = null, Qt = null, Zu = !1, Xn = !1, hn = !1, wu = 0, qa = 0, Ln = null, Id = 0;
  function Yt() {
    throw Error(r(321));
  }
  function Qf(t, l) {
    if (l === null) return !1;
    for (var e = 0; e < l.length && e < t.length; e++)
      if (!El(t[e], l[e])) return !1;
    return !0;
  }
  function Vf(t, l, e, n, a, i) {
    return de = i, ut = l, l.memoizedState = null, l.updateQueue = null, l.lanes = 0, w.H = t === null || t.memoizedState === null ? Vh : jh, hn = !1, i = e(n, a), hn = !1, Xn && (i = fh(
      l,
      e,
      n,
      a
    )), ih(t), i;
  }
  function ih(t) {
    w.H = ku;
    var l = Dt !== null && Dt.next !== null;
    if (de = 0, Qt = Dt = ut = null, Zu = !1, qa = 0, Ln = null, l) throw Error(r(300));
    t === null || Vt || (t = t.dependencies, t !== null && qu(t) && (Vt = !0));
  }
  function fh(t, l, e, n) {
    ut = t;
    var a = 0;
    do {
      if (Xn && (Ln = null), qa = 0, Xn = !1, 25 <= a) throw Error(r(301));
      if (a += 1, Qt = Dt = null, t.updateQueue != null) {
        var i = t.updateQueue;
        i.lastEffect = null, i.events = null, i.stores = null, i.memoCache != null && (i.memoCache.index = 0);
      }
      w.H = uv, i = l(e, n);
    } while (Xn);
    return i;
  }
  function kd() {
    var t = w.H, l = t.useState()[0];
    return l = typeof l.then == "function" ? Ba(l) : l, t = t.useState()[0], (Dt !== null ? Dt.memoizedState : null) !== t && (ut.flags |= 1024), l;
  }
  function jf() {
    var t = wu !== 0;
    return wu = 0, t;
  }
  function Zf(t, l, e) {
    l.updateQueue = t.updateQueue, l.flags &= -2053, t.lanes &= ~e;
  }
  function wf(t) {
    if (Zu) {
      for (t = t.memoizedState; t !== null; ) {
        var l = t.queue;
        l !== null && (l.pending = null), t = t.next;
      }
      Zu = !1;
    }
    de = 0, Qt = Dt = ut = null, Xn = !1, qa = wu = 0, Ln = null;
  }
  function il() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Qt === null ? ut.memoizedState = Qt = t : Qt = Qt.next = t, Qt;
  }
  function Xt() {
    if (Dt === null) {
      var t = ut.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Dt.next;
    var l = Qt === null ? ut.memoizedState : Qt.next;
    if (l !== null)
      Qt = l, Dt = t;
    else {
      if (t === null)
        throw ut.alternate === null ? Error(r(467)) : Error(r(310));
      Dt = t, t = {
        memoizedState: Dt.memoizedState,
        baseState: Dt.baseState,
        baseQueue: Dt.baseQueue,
        queue: Dt.queue,
        next: null
      }, Qt === null ? ut.memoizedState = Qt = t : Qt = Qt.next = t;
    }
    return Qt;
  }
  function Ku() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ba(t) {
    var l = qa;
    return qa += 1, Ln === null && (Ln = []), t = Ir(Ln, t, l), l = ut, (Qt === null ? l.memoizedState : Qt.next) === null && (l = l.alternate, w.H = l === null || l.memoizedState === null ? Vh : jh), t;
  }
  function Ju(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Ba(t);
      if (t.$$typeof === q) return;
      if (t.$$typeof === zt) return kt(t);
    }
    throw Error(r(438, String(t)));
  }
  function Kf(t) {
    var l = null, e = ut.updateQueue;
    if (e !== null && (l = e.memoCache), l == null) {
      var n = ut.alternate;
      n !== null && (n = n.updateQueue, n !== null && (n = n.memoCache, n != null && (l = {
        data: n.data.map(function(a) {
          return a.slice();
        }),
        index: 0
      })));
    }
    if (l == null && (l = { data: [], index: 0 }), e === null && (e = Ku(), ut.updateQueue = e), e.memoCache = l, e = l.data[l.index], e === void 0)
      for (e = l.data[l.index] = Array(t), n = 0; n < t; n++)
        e[n] = Zl;
    return l.index++, e;
  }
  function ve(t, l) {
    return typeof l == "function" ? l(t) : l;
  }
  function Fu(t) {
    var l = Xt();
    return Jf(l, Dt, t);
  }
  function Jf(t, l, e) {
    var n = t.queue;
    if (n === null) throw Error(r(311));
    n.lastRenderedReducer = e;
    var a = t.baseQueue, i = n.pending;
    if (i !== null) {
      if (a !== null) {
        var s = a.next;
        a.next = i.next, i.next = s;
      }
      l.baseQueue = a = i, n.pending = null;
    }
    if (i = t.baseState, a === null) t.memoizedState = i;
    else {
      l = a.next;
      var h = s = null, g = null, z = l, p = !1;
      do {
        var x = z.lane & -536870913;
        if (x !== z.lane ? (gt & x) === x : (de & x) === x) {
          var b = z.revertLane;
          if (b === 0)
            g !== null && (g = g.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: z.action,
              hasEagerState: z.hasEagerState,
              eagerState: z.eagerState,
              next: null
            }), x === un && (p = !0);
          else if ((de & b) === b) {
            z = z.next, b === un && (p = !0);
            continue;
          } else
            x = {
              lane: 0,
              revertLane: z.revertLane,
              gesture: null,
              action: z.action,
              hasEagerState: z.hasEagerState,
              eagerState: z.eagerState,
              next: null
            }, g === null ? (h = g = x, s = i) : g = g.next = x, ut.lanes |= b, Ge |= b;
          x = z.action, hn && e(i, x), i = z.hasEagerState ? z.eagerState : e(i, x);
        } else
          b = {
            lane: x,
            revertLane: z.revertLane,
            gesture: z.gesture,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null
          }, g === null ? (h = g = b, s = i) : g = g.next = b, ut.lanes |= x, Ge |= x;
        z = z.next;
      } while (z !== null && z !== l);
      if (g === null ? s = i : g.next = h, !El(i, t.memoizedState) && (Vt = !0, p && (e = Bn, e !== null)))
        throw e;
      t.memoizedState = i, t.baseState = s, t.baseQueue = g, n.lastRenderedState = i;
    }
    return a === null && (n.lanes = 0), [t.memoizedState, n.dispatch];
  }
  function Ff(t) {
    var l = Xt(), e = l.queue;
    if (e === null) throw Error(r(311));
    e.lastRenderedReducer = t;
    var n = e.dispatch, a = e.pending, i = l.memoizedState;
    if (a !== null) {
      e.pending = null;
      var s = a = a.next;
      do
        i = t(i, s.action), s = s.next;
      while (s !== a);
      El(i, l.memoizedState) || (Vt = !0), l.memoizedState = i, l.baseQueue === null && (l.baseState = i), e.lastRenderedState = i;
    }
    return [i, n];
  }
  function ch(t, l, e) {
    var n = ut, a = Xt(), i = st;
    if (i) {
      if (e === void 0) throw Error(r(407));
      e = e();
    } else e = l();
    var s = !El(
      (Dt || a).memoizedState,
      e
    );
    if (s && (a.memoizedState = e, Vt = !0), a = a.queue, If(hh.bind(null, n, a, t), [
      t
    ]), t = a.getSnapshot !== l || s || Qt !== null && (Qt.memoizedState.tag & 1) !== 0, Qn(
      t ? 9 : 8,
      { destroy: void 0 },
      rh.bind(null, n, a, e, l),
      null
    ), t) {
      if (n.flags |= 2048, xt === null) throw Error(r(349));
      i || (de & 127) !== 0 || sh(n, l, e);
    }
    return e;
  }
  function sh(t, l, e) {
    t.flags |= 16384, t = { getSnapshot: l, value: e }, l = ut.updateQueue, l === null ? (l = Ku(), ut.updateQueue = l, l.stores = [t]) : (e = l.stores, e === null ? l.stores = [t] : e.push(t));
  }
  function rh(t, l, e, n) {
    l.value = e, l.getSnapshot = n, oh(l) && dh(t);
  }
  function hh(t, l, e) {
    return e(function() {
      oh(l) && dh(t);
    });
  }
  function oh(t) {
    var l = t.getSnapshot;
    t = t.value;
    try {
      var e = l();
      return !El(t, e);
    } catch {
      return !0;
    }
  }
  function dh(t) {
    var l = Pe(t, 2);
    l !== null && vl(l, t, 2);
  }
  function $f(t) {
    var l = il();
    if (typeof t == "function") {
      var e = t;
      if (t = e(), hn) {
        be(!0);
        try {
          e();
        } finally {
          be(!1);
        }
      }
    }
    return l.memoizedState = l.baseState = t, l.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ve,
      lastRenderedState: t
    }, l;
  }
  function vh(t, l, e, n) {
    return t.baseState = e, Jf(
      t,
      Dt,
      typeof n == "function" ? n : ve
    );
  }
  function Pd(t, l, e, n, a) {
    if (Iu(t)) throw Error(r(485));
    if (t = l.action, t !== null) {
      var i = {
        payload: a,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(s) {
          i.listeners.push(s);
        }
      };
      w.T !== null ? e(!0) : i.isTransition = !1, n(i), e = l.pending, e === null ? (i.next = l.pending = i, gh(l, i)) : (i.next = e.next, l.pending = e.next = i);
    }
  }
  function gh(t, l) {
    var e = l.action, n = l.payload, a = t.state;
    if (l.isTransition) {
      var i = w.T, s = {};
      s.types = i !== null ? i.types : null, w.T = s;
      try {
        var h = e(a, n), g = w.S;
        g !== null && g(s, h), mh(t, l, h);
      } catch (z) {
        Wf(t, l, z);
      } finally {
        i !== null && s.types !== null && (i.types = s.types), w.T = i;
      }
    } else
      try {
        i = e(a, n), mh(t, l, i);
      } catch (z) {
        Wf(t, l, z);
      }
  }
  function mh(t, l, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(n) {
        yh(t, l, n);
      },
      function(n) {
        return Wf(t, l, n);
      }
    ) : yh(t, l, e);
  }
  function yh(t, l, e) {
    l.status = "fulfilled", l.value = e, Sh(l), t.state = e, l = t.pending, l !== null && (e = l.next, e === l ? t.pending = null : (e = e.next, l.next = e, gh(t, e)));
  }
  function Wf(t, l, e) {
    var n = t.pending;
    if (t.pending = null, n !== null) {
      n = n.next;
      do
        l.status = "rejected", l.reason = e, Sh(l), l = l.next;
      while (l !== n);
    }
    t.action = null;
  }
  function Sh(t) {
    t = t.listeners;
    for (var l = 0; l < t.length; l++) (0, t[l])();
  }
  function Eh(t, l) {
    return l;
  }
  function Th(t, l) {
    if (st) {
      var e = xt.formState;
      if (e !== null) {
        t: {
          var n = ut;
          if (st) {
            if (Ut) {
              l: {
                for (var a = Ut, i = Rl; a.nodeType !== 8; ) {
                  if (!i) {
                    a = null;
                    break l;
                  }
                  if (a = Hl(
                    a.nextSibling
                  ), a === null) {
                    a = null;
                    break l;
                  }
                }
                i = a.data, a = i === "F!" || i === "F" ? a : null;
              }
              if (a) {
                Ut = Hl(
                  a.nextSibling
                ), n = a.data === "F!";
                break t;
              }
            }
            Me(n);
          }
          n = !1;
        }
        n && (l = e[0]);
      }
    }
    return e = il(), e.memoizedState = e.baseState = l, n = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Eh,
      lastRenderedState: l
    }, e.queue = n, e = Xh.bind(
      null,
      ut,
      n
    ), n.dispatch = e, n = $f(!1), i = ec.bind(
      null,
      ut,
      !1,
      n.queue
    ), n = il(), a = {
      state: l,
      dispatch: null,
      action: t,
      pending: null
    }, n.queue = a, e = Pd.bind(
      null,
      ut,
      a,
      i,
      e
    ), a.dispatch = e, n.memoizedState = t, [l, e, !1];
  }
  function bh(t) {
    var l = Xt();
    return _h(l, Dt, t);
  }
  function _h(t, l, e) {
    if (l = Jf(
      t,
      l,
      Eh
    )[0], t = Fu(ve)[0], typeof l == "object" && l !== null && typeof l.then == "function")
      try {
        var n = Ba(l);
      } catch (s) {
        throw s === Yn ? Gu : s;
      }
    else n = l;
    l = Xt();
    var a = l.queue, i = a.dispatch;
    return e !== l.memoizedState && (ut.flags |= 2048, Qn(
      9,
      { destroy: void 0 },
      tv.bind(null, a, e),
      null
    )), [n, i, t];
  }
  function tv(t, l) {
    t.action = l;
  }
  function zh(t) {
    var l = Xt(), e = Dt;
    if (e !== null)
      return _h(l, e, t);
    Xt(), l = l.memoizedState, e = Xt();
    var n = e.queue.dispatch;
    return e.memoizedState = t, [l, n, !1];
  }
  function Qn(t, l, e, n) {
    return t = { tag: t, create: e, deps: n, inst: l, next: null }, l = ut.updateQueue, l === null && (l = Ku(), ut.updateQueue = l), e = l.lastEffect, e === null ? l.lastEffect = t.next = t : (n = e.next, e.next = t, t.next = n, l.lastEffect = t), t;
  }
  function Ah() {
    return Xt().memoizedState;
  }
  function $u(t, l, e, n) {
    var a = il();
    ut.flags |= t, a.memoizedState = Qn(
      1 | l,
      { destroy: void 0 },
      e,
      n === void 0 ? null : n
    );
  }
  function Wu(t, l, e, n) {
    var a = Xt();
    n = n === void 0 ? null : n;
    var i = a.memoizedState.inst;
    Dt !== null && n !== null && Qf(n, Dt.memoizedState.deps) ? a.memoizedState = Qn(l, i, e, n) : (ut.flags |= t, a.memoizedState = Qn(
      1 | l,
      i,
      e,
      n
    ));
  }
  function Oh(t, l) {
    $u(8390656, 8, t, l);
  }
  function If(t, l) {
    Wu(2048, 8, t, l);
  }
  function lv(t) {
    ut.flags |= 4;
    var l = ut.updateQueue;
    if (l === null)
      l = Ku(), ut.updateQueue = l, l.events = [t];
    else {
      var e = l.events;
      e === null ? l.events = [t] : e.push(t);
    }
  }
  function Mh(t) {
    var l = Xt().memoizedState;
    return lv({ ref: l, nextImpl: t }), function() {
      if ((Ot & 2) !== 0) throw Error(r(440));
      return l.impl.apply(void 0, arguments);
    };
  }
  function ph(t, l) {
    return Wu(4, 2, t, l);
  }
  function Nh(t, l) {
    return Wu(4, 4, t, l);
  }
  function Ch(t, l) {
    if (typeof l == "function") {
      t = t();
      var e = l(t);
      return function() {
        typeof e == "function" ? e() : l(null);
      };
    }
    if (l != null)
      return t = t(), l.current = t, function() {
        l.current = null;
      };
  }
  function Dh(t, l, e) {
    e = e != null ? e.concat([t]) : null, Wu(4, 4, Ch.bind(null, l, t), e);
  }
  function kf() {
  }
  function xh(t, l) {
    var e = Xt();
    l = l === void 0 ? null : l;
    var n = e.memoizedState;
    return l !== null && Qf(l, n[1]) ? n[0] : (e.memoizedState = [t, l], t);
  }
  function Rh(t, l) {
    var e = Xt();
    l = l === void 0 ? null : l;
    var n = e.memoizedState;
    if (l !== null && Qf(l, n[1]))
      return n[0];
    if (n = t(), hn) {
      be(!0);
      try {
        t();
      } finally {
        be(!1);
      }
    }
    return e.memoizedState = [n, l], n;
  }
  function Pf(t, l, e) {
    return e === void 0 || (de & 1073741824) !== 0 && (gt & 261930) === 0 ? t.memoizedState = l : (t.memoizedState = e, t = V0(), ut.lanes |= t, Ge |= t, e);
  }
  function Uh(t, l, e, n) {
    return El(e, l) ? e : Re.current !== null ? (t = Pf(t, e, n), El(t, l) || (Vt = !0), t) : (de & 106) === 0 || (de & 1073741824) !== 0 && (gt & 261930) === 0 ? (Vt = !0, t.memoizedState = e) : (t = V0(), ut.lanes |= t, Ge |= t, l);
  }
  function Hh(t, l, e, n, a) {
    var i = et.p;
    et.p = i !== 0 && 8 > i ? i : 8;
    var s = w.T, h = {};
    h.types = s !== null ? s.types : null, w.T = h, ec(t, !1, l, e);
    try {
      var g = a(), z = w.S;
      if (z !== null && z(h, g), g !== null && typeof g == "object" && typeof g.then == "function") {
        var p = Wd(
          g,
          n
        );
        Ya(
          t,
          l,
          p,
          Al(t)
        );
      } else
        Ya(
          t,
          l,
          n,
          Al(t)
        );
    } catch (x) {
      Ya(
        t,
        l,
        { then: function() {
        }, status: "rejected", reason: x },
        Al()
      );
    } finally {
      et.p = i, s !== null && h.types !== null && (s.types = h.types), w.T = s;
    }
  }
  function ev() {
  }
  function tc(t, l, e, n) {
    if (t.tag !== 5) throw Error(r(476));
    var a = qh(t).queue;
    Hh(
      t,
      a,
      l,
      Bl,
      e === null ? ev : function() {
        return Bh(t), e(n);
      }
    );
  }
  function qh(t) {
    var l = t.memoizedState;
    if (l !== null) return l;
    l = {
      memoizedState: Bl,
      baseState: Bl,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ve,
        lastRenderedState: Bl
      },
      next: null
    };
    var e = {};
    return l.next = {
      memoizedState: e,
      baseState: e,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ve,
        lastRenderedState: e
      },
      next: null
    }, t.memoizedState = l, t = t.alternate, t !== null && (t.memoizedState = l), l;
  }
  function Bh(t) {
    var l = qh(t);
    l.next === null && (l = t.alternate.memoizedState), Ya(
      t,
      l.next.queue,
      {},
      Al()
    );
  }
  function lc() {
    return kt(ia);
  }
  function Yh() {
    return Xt().memoizedState;
  }
  function Gh() {
    return Xt().memoizedState;
  }
  function nv(t) {
    for (var l = t.return; l !== null; ) {
      switch (l.tag) {
        case 24:
        case 3:
          var e = Al();
          t = De(e);
          var n = xe(l, t, e);
          n !== null && (vl(n, l, e), xa(n, l, e)), l = { cache: Cf() }, t.payload = l;
          return;
      }
      l = l.return;
    }
  }
  function av(t, l, e) {
    var n = Al();
    e = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Iu(t) ? Lh(l, e) : (e = Tf(t, l, e, n), e !== null && (vl(e, t, n), Qh(e, l, n)));
  }
  function Xh(t, l, e) {
    var n = Al();
    Ya(t, l, e, n);
  }
  function Ya(t, l, e, n) {
    var a = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Iu(t)) Lh(l, a);
    else {
      var i = t.alternate;
      if (t.lanes === 0 && (i === null || i.lanes === 0) && (i = l.lastRenderedReducer, i !== null))
        try {
          var s = l.lastRenderedState, h = i(s, e);
          if (a.hasEagerState = !0, a.eagerState = h, El(h, s))
            return Nu(t, l, a, 0), xt === null && pu(), !1;
        } catch {
        }
      if (e = Tf(t, l, a, n), e !== null)
        return vl(e, t, n), Qh(e, l, n), !0;
    }
    return !1;
  }
  function ec(t, l, e, n) {
    if (n = {
      lane: 2,
      revertLane: Kc(),
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Iu(t)) {
      if (l) throw Error(r(479));
    } else
      l = Tf(
        t,
        e,
        n,
        2
      ), l !== null && vl(l, t, 2);
  }
  function Iu(t) {
    var l = t.alternate;
    return t === ut || l !== null && l === ut;
  }
  function Lh(t, l) {
    Xn = Zu = !0;
    var e = t.pending;
    e === null ? l.next = l : (l.next = e.next, e.next = l), t.pending = l;
  }
  function Qh(t, l, e) {
    if ((e & 4194048) !== 0) {
      var n = l.lanes;
      n &= t.pendingLanes, e |= n, l.lanes = e, Vs(t, e);
    }
  }
  var ku = {
    readContext: kt,
    use: Ju,
    useCallback: Yt,
    useContext: Yt,
    useEffect: Yt,
    useImperativeHandle: Yt,
    useLayoutEffect: Yt,
    useInsertionEffect: Yt,
    useMemo: Yt,
    useReducer: Yt,
    useRef: Yt,
    useState: Yt,
    useDebugValue: Yt,
    useDeferredValue: Yt,
    useTransition: Yt,
    useSyncExternalStore: Yt,
    useId: Yt,
    useHostTransitionStatus: Yt,
    useFormState: Yt,
    useActionState: Yt,
    useOptimistic: Yt,
    useMemoCache: Yt,
    useCacheRefresh: Yt,
    useEffectEvent: Yt
  }, Vh = {
    readContext: kt,
    use: Ju,
    useCallback: function(t, l) {
      return il().memoizedState = [
        t,
        l === void 0 ? null : l
      ], t;
    },
    useContext: kt,
    useEffect: Oh,
    useImperativeHandle: function(t, l, e) {
      e = e != null ? e.concat([t]) : null, $u(
        4194308,
        4,
        Ch.bind(null, l, t),
        e
      );
    },
    useLayoutEffect: function(t, l) {
      return $u(4194308, 4, t, l);
    },
    useInsertionEffect: function(t, l) {
      $u(4, 2, t, l);
    },
    useMemo: function(t, l) {
      var e = il();
      l = l === void 0 ? null : l;
      var n = t();
      if (hn) {
        be(!0);
        try {
          t();
        } finally {
          be(!1);
        }
      }
      return e.memoizedState = [n, l], n;
    },
    useReducer: function(t, l, e) {
      var n = il();
      if (e !== void 0) {
        var a = e(l);
        if (hn) {
          be(!0);
          try {
            e(l);
          } finally {
            be(!1);
          }
        }
      } else a = l;
      return n.memoizedState = n.baseState = a, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: a
      }, n.queue = t, t = t.dispatch = av.bind(
        null,
        ut,
        t
      ), [n.memoizedState, t];
    },
    useRef: function(t) {
      var l = il();
      return t = { current: t }, l.memoizedState = t;
    },
    useState: function(t) {
      t = $f(t);
      var l = t.queue, e = Xh.bind(null, ut, l);
      return l.dispatch = e, [t.memoizedState, e];
    },
    useDebugValue: kf,
    useDeferredValue: function(t, l) {
      var e = il();
      return Pf(e, t, l);
    },
    useTransition: function() {
      var t = $f(!1);
      return t = Hh.bind(
        null,
        ut,
        t.queue,
        !0,
        !1
      ), il().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, l, e) {
      var n = ut, a = il();
      if (st) {
        if (e === void 0)
          throw Error(r(407));
        e = e();
      } else {
        if (e = l(), xt === null)
          throw Error(r(349));
        (gt & 127) !== 0 || sh(n, l, e);
      }
      a.memoizedState = e;
      var i = { value: e, getSnapshot: l };
      return a.queue = i, Oh(hh.bind(null, n, i, t), [
        t
      ]), n.flags |= 2048, Qn(
        9,
        { destroy: void 0 },
        rh.bind(
          null,
          n,
          i,
          e,
          l
        ),
        null
      ), e;
    },
    useId: function() {
      var t = il(), l = xt.identifierPrefix;
      if (st) {
        var e = $l, n = Fl;
        e = (n & ~(1 << 32 - yl(n) - 1)).toString(32) + e, l = "_" + l + "R_" + e, e = wu++, 0 < e && (l += "H" + e.toString(32)), l += "_";
      } else
        e = Id++, l = "_" + l + "r_" + e.toString(32) + "_";
      return t.memoizedState = l;
    },
    useHostTransitionStatus: lc,
    useFormState: Th,
    useActionState: Th,
    useOptimistic: function(t) {
      var l = il();
      l.memoizedState = l.baseState = t;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return l.queue = e, l = ec.bind(
        null,
        ut,
        !0,
        e
      ), e.dispatch = l, [t, l];
    },
    useMemoCache: Kf,
    useCacheRefresh: function() {
      return il().memoizedState = nv.bind(
        null,
        ut
      );
    },
    useEffectEvent: function(t) {
      var l = il(), e = { impl: t };
      return l.memoizedState = e, function() {
        if ((Ot & 2) !== 0)
          throw Error(r(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, jh = {
    readContext: kt,
    use: Ju,
    useCallback: xh,
    useContext: kt,
    useEffect: If,
    useImperativeHandle: Dh,
    useInsertionEffect: ph,
    useLayoutEffect: Nh,
    useMemo: Rh,
    useReducer: Fu,
    useRef: Ah,
    useState: function() {
      return Fu(ve);
    },
    useDebugValue: kf,
    useDeferredValue: function(t, l) {
      var e = Xt();
      return Uh(
        e,
        Dt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = Fu(ve)[0], l = Xt().memoizedState;
      return [
        typeof t == "boolean" ? t : Ba(t),
        l
      ];
    },
    useSyncExternalStore: ch,
    useId: Yh,
    useHostTransitionStatus: lc,
    useFormState: bh,
    useActionState: bh,
    useOptimistic: function(t, l) {
      var e = Xt();
      return vh(e, Dt, t, l);
    },
    useMemoCache: Kf,
    useCacheRefresh: Gh,
    useEffectEvent: Mh
  }, uv = {
    readContext: kt,
    use: Ju,
    useCallback: xh,
    useContext: kt,
    useEffect: If,
    useImperativeHandle: Dh,
    useInsertionEffect: ph,
    useLayoutEffect: Nh,
    useMemo: Rh,
    useReducer: Ff,
    useRef: Ah,
    useState: function() {
      return Ff(ve);
    },
    useDebugValue: kf,
    useDeferredValue: function(t, l) {
      var e = Xt();
      return Dt === null ? Pf(e, t, l) : Uh(
        e,
        Dt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = Ff(ve)[0], l = Xt().memoizedState;
      return [
        typeof t == "boolean" ? t : Ba(t),
        l
      ];
    },
    useSyncExternalStore: ch,
    useId: Yh,
    useHostTransitionStatus: lc,
    useFormState: zh,
    useActionState: zh,
    useOptimistic: function(t, l) {
      var e = Xt();
      return Dt !== null ? vh(e, Dt, t, l) : (e.baseState = t, [t, e.queue.dispatch]);
    },
    useMemoCache: Kf,
    useCacheRefresh: Gh,
    useEffectEvent: Mh
  };
  function nc(t, l, e, n) {
    l = t.memoizedState, e = e(n, l), e = e == null ? l : V({}, l, e), t.memoizedState = e, t.lanes === 0 && (t.updateQueue.baseState = e);
  }
  var ac = {
    enqueueSetState: function(t, l, e) {
      t = t._reactInternals;
      var n = Al(), a = De(n);
      a.payload = l, e != null && (a.callback = e), l = xe(t, a, n), l !== null && (vl(l, t, n), xa(l, t, n));
    },
    enqueueReplaceState: function(t, l, e) {
      t = t._reactInternals;
      var n = Al(), a = De(n);
      a.tag = 1, a.payload = l, e != null && (a.callback = e), l = xe(t, a, n), l !== null && (vl(l, t, n), xa(l, t, n));
    },
    enqueueForceUpdate: function(t, l) {
      t = t._reactInternals;
      var e = Al(), n = De(e);
      n.tag = 2, l != null && (n.callback = l), l = xe(t, n, e), l !== null && (vl(l, t, e), xa(l, t, e));
    }
  };
  function Zh(t, l, e, n, a, i, s) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(n, i, s) : l.prototype && l.prototype.isPureReactComponent ? !za(e, n) || !za(a, i) : !0;
  }
  function wh(t, l, e, n) {
    t = l.state, typeof l.componentWillReceiveProps == "function" && l.componentWillReceiveProps(e, n), typeof l.UNSAFE_componentWillReceiveProps == "function" && l.UNSAFE_componentWillReceiveProps(e, n), l.state !== t && ac.enqueueReplaceState(l, l.state, null);
  }
  function on(t, l) {
    var e = l;
    if ("ref" in l) {
      e = {};
      for (var n in l)
        n !== "ref" && (e[n] = l[n]);
    }
    if (t = t.defaultProps) {
      e === l && (e = V({}, e));
      for (var a in t)
        e[a] === void 0 && (e[a] = t[a]);
    }
    return e;
  }
  function Kh(t) {
    Mu(t);
  }
  function Jh(t) {
    console.error(t);
  }
  function Fh(t) {
    Mu(t);
  }
  function Pu(t, l) {
    try {
      var e = t.onUncaughtError;
      e(l.value, { componentStack: l.stack });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function $h(t, l, e) {
    try {
      var n = t.onCaughtError;
      n(e.value, {
        componentStack: e.stack,
        errorBoundary: l.tag === 1 ? l.stateNode : null
      });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function uc(t, l, e) {
    return e = De(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      Pu(t, l);
    }, e;
  }
  function Wh(t) {
    return t = De(t), t.tag = 3, t;
  }
  function Ih(t, l, e, n) {
    var a = e.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var i = n.value;
      t.payload = function() {
        return a(i);
      }, t.callback = function() {
        $h(l, e, n);
      };
    }
    var s = e.stateNode;
    s !== null && typeof s.componentDidCatch == "function" && (t.callback = function() {
      $h(l, e, n), typeof a != "function" && (Xe === null ? Xe = /* @__PURE__ */ new Set([this]) : Xe.add(this));
      var h = n.stack;
      this.componentDidCatch(n.value, {
        componentStack: h !== null ? h : ""
      });
    });
  }
  function iv(t, l, e, n, a) {
    if (e.flags |= 32768, n !== null && typeof n == "object" && typeof n.then == "function") {
      if (l = e.alternate, l !== null && nn(
        l,
        e,
        a,
        !0
      ), e = Pt.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
          case 19:
            return al === null ? Ti() : e.alternate === null && Gt === 0 && (Gt = 3), e.flags &= -257, e.flags |= 65536, e.lanes = a, n === Xu ? e.flags |= 16384 : (l = e.updateQueue, l === null ? e.updateQueue = /* @__PURE__ */ new Set([n]) : l.add(n), jc(t, n, a)), !1;
          case 22:
            return e.flags |= 65536, n === Xu ? e.flags |= 16384 : (l = e.updateQueue, l === null ? (l = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([n])
            }, e.updateQueue = l) : (e = l.retryQueue, e === null ? l.retryQueue = /* @__PURE__ */ new Set([n]) : e.add(n)), jc(t, n, a)), !1;
        }
        throw Error(r(435, e.tag));
      }
      return jc(t, n, a), Ti(), !1;
    }
    if (st)
      return l = Pt.current, l !== null ? ((l.flags & 65536) === 0 && (l.flags |= 256), l.flags |= 65536, l.lanes = a, n !== Of && (t = Error(r(422), { cause: n }), Ma(Cl(t, e)))) : (n !== Of && (l = Error(r(423), {
        cause: n
      }), Ma(
        Cl(l, e)
      )), t = t.current.alternate, t.flags |= 65536, a &= -a, t.lanes |= a, n = Cl(n, e), a = uc(
        t.stateNode,
        n,
        a
      ), qf(t, a), Gt !== 4 && (Gt = 2)), !1;
    var i = Error(r(520), { cause: n });
    if (i = Cl(i, e), wa === null ? wa = [i] : wa.push(i), Gt !== 4 && (Gt = 2), l === null) return !0;
    n = Cl(n, e), e = l;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, t = a & -a, e.lanes |= t, t = uc(e.stateNode, n, t), qf(e, t), !1;
        case 1:
          if (l = e.type, i = e.stateNode, (e.flags & 128) === 0 && (typeof l.getDerivedStateFromError == "function" || i !== null && typeof i.componentDidCatch == "function" && (Xe === null || !Xe.has(i))))
            return e.flags |= 65536, a &= -a, e.lanes |= a, a = Wh(a), Ih(
              a,
              t,
              e,
              n
            ), qf(e, a), !1;
          break;
        case 22:
          if (e.memoizedState !== null)
            return e.flags |= 65536, !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var ic = Error(r(461)), Vt = !1;
  function Zt(t, l, e, n) {
    l.child = t === null ? lh(l, null, e, n) : rn(
      l,
      t.child,
      e,
      n
    );
  }
  function kh(t, l, e, n, a) {
    e = e.render;
    var i = l.ref;
    if ("ref" in n) {
      var s = {};
      for (var h in n)
        h !== "ref" && (s[h] = n[h]);
    } else s = n;
    return an(l), n = Vf(
      t,
      l,
      e,
      s,
      i,
      a
    ), h = jf(), t !== null && !Vt ? (Zf(t, l, a), ge(t, l, a)) : (st && h && Ru(l), l.flags |= 1, Zt(t, l, n, a), l.child);
  }
  function Ph(t, l, e, n, a) {
    if (t === null) {
      var i = e.type;
      return typeof i == "function" && !bf(i) && i.defaultProps === void 0 && e.compare === null ? (l.tag = 15, l.type = i, t0(
        t,
        l,
        i,
        n,
        a
      )) : (t = Du(
        e.type,
        null,
        n,
        l,
        l.mode,
        a
      ), t.ref = l.ref, t.return = l, l.child = t);
    }
    if (i = t.child, !vc(t, a)) {
      var s = i.memoizedProps;
      if (e = e.compare, e = e !== null ? e : za, e(s, n) && t.ref === l.ref)
        return ge(t, l, a);
    }
    return l.flags |= 1, t = se(i, n), t.ref = l.ref, t.return = l, l.child = t;
  }
  function t0(t, l, e, n, a) {
    if (t !== null) {
      var i = t.memoizedProps;
      if (za(i, n) && t.ref === l.ref)
        if (Vt = !1, l.pendingProps = n = i, vc(t, a))
          (t.flags & 131072) !== 0 && (Vt = !0);
        else
          return l.lanes = t.lanes, ge(t, l, a);
    }
    return fc(
      t,
      l,
      e,
      n,
      a
    );
  }
  function l0(t, l, e, n) {
    var a = n.children, i = t !== null ? t.memoizedState : null;
    if (t === null && l.stateNode === null && (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.mode === "hidden") {
      if ((l.flags & 128) !== 0) {
        if (i = i !== null ? i.baseLanes | e : e, t !== null) {
          for (n = l.child = t.child, a = 0; n !== null; )
            a = a | n.lanes | n.childLanes, n = n.sibling;
          n = a & ~i;
        } else n = 0, l.child = null;
        return e0(
          t,
          l,
          i,
          e,
          n
        );
      }
      if ((e & 536870912) !== 0)
        l.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Yu(
          l,
          i !== null ? i.cachePool : null
        ), i !== null ? ah(l, i) : Yf(), uh(l);
      else
        return n = l.lanes = 536870912, e0(
          t,
          l,
          i !== null ? i.baseLanes | e : e,
          e,
          n
        );
    } else
      i !== null ? (Yu(l, i.cachePool), ah(l, i), He(), l.memoizedState = null) : (t !== null && Yu(l, null), Yf(), He());
    return Zt(t, l, a, e), l.child;
  }
  function Ga(t, l) {
    return t !== null && t.tag === 22 || l.stateNode !== null || (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.sibling;
  }
  function e0(t, l, e, n, a) {
    var i = xf();
    return i = i === null ? null : { parent: Lt._currentValue, pool: i }, l.memoizedState = {
      baseLanes: e,
      cachePool: i
    }, t !== null && Yu(l, null), Yf(), uh(l), t !== null && nn(t, l, n, !0), l.childLanes = a, null;
  }
  function ti(t, l) {
    return l = li(
      { mode: l.mode, children: l.children },
      t.mode
    ), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function n0(t, l, e) {
    return rn(l, t.child, null, e), t = ti(l, l.pendingProps), t.flags |= 2, Tl(l), l.memoizedState = null, t;
  }
  function fv(t, l, e) {
    var n = l.pendingProps, a = (l.flags & 128) !== 0;
    if (l.flags &= -129, t === null) {
      if (st) {
        if (n.mode === "hidden")
          return t = ti(l, n), l.lanes = 536870912, t.memoizedState = { baseLanes: 0, cachePool: null }, Ga(null, t);
        if (Xf(l), (t = Ut) ? (t = C1(
          t,
          Rl
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: Ae !== null ? { id: Fl, overflow: $l } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = Lr(t), e.return = l, l.child = e, Jt = l, Ut = null)) : t = null, t === null) throw Me(l);
        return l.lanes = 536870912, null;
      }
      return ti(l, n);
    }
    var i = t.memoizedState;
    if (i !== null) {
      var s = i.dehydrated;
      if (Xf(l), a)
        if (l.flags & 256)
          l.flags &= -257, l = n0(
            t,
            l,
            e
          );
        else if (l.memoizedState !== null)
          l.child = t.child, l.flags |= 128, l = null;
        else throw Error(r(558));
      else if (Vt || nn(t, l, e, !1), a = (e & t.childLanes) !== 0, Vt || a) {
        if (Re.current === null) {
          if (n = xt, n !== null && (s = js(n, e), s !== 0 && s !== i.retryLane))
            throw i.retryLane = s, Pe(t, s), vl(n, t, s), ic;
          Ti();
        }
        l = n0(
          t,
          l,
          e
        );
      } else
        t = i.treeContext, Ut = Hl(s.nextSibling), Jt = l, st = !0, Oe = null, Rl = !1, t !== null && jr(l, t), l = ti(l, n), l.flags |= 134221824;
      return l;
    }
    return t = se(t.child, {
      mode: n.mode,
      children: n.children
    }), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function Vn(t, l) {
    var e = l.ref;
    if (e === null)
      t !== null && t.ref !== null && (l.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(r(284));
      (t === null || t.ref !== e) && (l.flags |= 4194816);
    }
  }
  function fc(t, l, e, n, a) {
    return an(l), e = Vf(
      t,
      l,
      e,
      n,
      void 0,
      a
    ), n = jf(), t !== null && !Vt ? (Zf(t, l, a), ge(t, l, a)) : (st && n && Ru(l), l.flags |= 1, Zt(t, l, e, a), l.child);
  }
  function a0(t, l, e, n, a, i) {
    return an(l), l.updateQueue = null, e = fh(
      l,
      n,
      e,
      a
    ), ih(t), n = jf(), t !== null && !Vt ? (Zf(t, l, i), ge(t, l, i)) : (st && n && Ru(l), l.flags |= 1, Zt(t, l, e, i), l.child);
  }
  function u0(t, l, e, n, a) {
    if (an(l), l.stateNode === null) {
      var i = Rn, s = e.contextType;
      typeof s == "object" && s !== null && (i = kt(s)), i = new e(n, i), l.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, i.updater = ac, l.stateNode = i, i._reactInternals = l, i = l.stateNode, i.props = n, i.state = l.memoizedState, i.refs = {}, Uf(l), s = e.contextType, i.context = typeof s == "object" && s !== null ? kt(s) : Rn, i.state = l.memoizedState, s = e.getDerivedStateFromProps, typeof s == "function" && (nc(
        l,
        e,
        s,
        n
      ), i.state = l.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (s = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), s !== i.state && ac.enqueueReplaceState(i, i.state, null), Ua(l, n, i, a), Ra(), i.state = l.memoizedState), typeof i.componentDidMount == "function" && (l.flags |= 4194308), n = !0;
    } else if (t === null) {
      i = l.stateNode;
      var h = l.memoizedProps, g = on(e, h);
      i.props = g;
      var z = i.context, p = e.contextType;
      s = Rn, typeof p == "object" && p !== null && (s = kt(p));
      var x = e.getDerivedStateFromProps;
      p = typeof x == "function" || typeof i.getSnapshotBeforeUpdate == "function", h = l.pendingProps !== h, p || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (h || z !== s) && wh(
        l,
        i,
        n,
        s
      ), Ce = !1;
      var b = l.memoizedState;
      i.state = b, Ua(l, n, i, a), Ra(), z = l.memoizedState, h || b !== z || Ce ? (typeof x == "function" && (nc(
        l,
        e,
        x,
        n
      ), z = l.memoizedState), (g = Ce || Zh(
        l,
        e,
        g,
        n,
        b,
        z,
        s
      )) ? (p || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (l.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (l.flags |= 4194308), l.memoizedProps = n, l.memoizedState = z), i.props = n, i.state = z, i.context = s, n = g) : (typeof i.componentDidMount == "function" && (l.flags |= 4194308), n = !1);
    } else {
      i = l.stateNode, Hf(t, l), s = l.memoizedProps, p = on(e, s), i.props = p, x = l.pendingProps, b = i.context, z = e.contextType, g = Rn, typeof z == "object" && z !== null && (g = kt(z)), h = e.getDerivedStateFromProps, (z = typeof h == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (s !== x || b !== g) && wh(
        l,
        i,
        n,
        g
      ), Ce = !1, b = l.memoizedState, i.state = b, Ua(l, n, i, a), Ra();
      var M = l.memoizedState;
      s !== x || b !== M || Ce || t !== null && t.dependencies !== null && qu(t.dependencies) ? (typeof h == "function" && (nc(
        l,
        e,
        h,
        n
      ), M = l.memoizedState), (p = Ce || Zh(
        l,
        e,
        p,
        n,
        b,
        M,
        g
      ) || t !== null && t.dependencies !== null && qu(t.dependencies)) ? (z || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(n, M, g), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(
        n,
        M,
        g
      )), typeof i.componentDidUpdate == "function" && (l.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (l.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || s === t.memoizedProps && b === t.memoizedState || (l.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || s === t.memoizedProps && b === t.memoizedState || (l.flags |= 1024), l.memoizedProps = n, l.memoizedState = M), i.props = n, i.state = M, i.context = g, n = p) : (typeof i.componentDidUpdate != "function" || s === t.memoizedProps && b === t.memoizedState || (l.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || s === t.memoizedProps && b === t.memoizedState || (l.flags |= 1024), n = !1);
    }
    return i = n, Vn(t, l), n = (l.flags & 128) !== 0, i || n ? (i = l.stateNode, e = n && typeof e.getDerivedStateFromError != "function" ? null : i.render(), l.flags |= 1, t !== null && n ? (l.child = rn(
      l,
      t.child,
      null,
      a
    ), l.child = rn(
      l,
      null,
      e,
      a
    )) : Zt(t, l, e, a), l.memoizedState = i.state, t = l.child) : t = ge(
      t,
      l,
      a
    ), t;
  }
  function i0(t, l, e, n) {
    return ln(), l.flags |= 256, Zt(t, l, e, n), l.child;
  }
  var cc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function sc(t) {
    return { baseLanes: t, cachePool: $r() };
  }
  function rc(t, l, e) {
    return t = t !== null ? t.childLanes & ~e : 0, l && (t |= zl), t;
  }
  function f0(t, l, e) {
    var n = l.pendingProps, a = !1, i = (l.flags & 128) !== 0, s;
    if ((s = i) || (s = t !== null && t.memoizedState === null ? !1 : (tl.current & 2) !== 0), s && (a = !0, l.flags &= -129), s = (l.flags & 32) !== 0, l.flags &= -33, t === null) {
      if (st) {
        if (a ? Ue(l) : He(), (t = Ut) ? (t = C1(
          t,
          Rl
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: Ae !== null ? { id: Fl, overflow: $l } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = Lr(t), e.return = l, l.child = e, Jt = l, Ut = null)) : t = null, t === null) throw Me(l);
        return ss(t) ? l.lanes = 32 : l.lanes = 536870912, null;
      }
      return i = n.children, n = n.fallback, a ? (He(), a = l.mode, i = li(
        { mode: "hidden", children: i },
        a
      ), n = tn(
        n,
        a,
        e,
        null
      ), i.return = l, n.return = l, i.sibling = n, l.child = i, n = l.child, n.memoizedState = sc(e), n.childLanes = rc(
        t,
        s,
        e
      ), l.memoizedState = cc, Ga(null, n)) : (Ue(l), hc(l, i));
    }
    var h = t.memoizedState;
    if (h !== null) {
      var g = h.dehydrated;
      if (g !== null)
        return cv(
          t,
          l,
          i,
          s,
          n,
          g,
          h,
          e
        );
    }
    return a ? (He(), a = n.fallback, i = l.mode, h = t.child, g = h.sibling, n = se(h, {
      mode: "hidden",
      children: n.children
    }), n.subtreeFlags = h.subtreeFlags & 1206910976, g !== null ? a = se(g, a) : (a = tn(
      a,
      i,
      e,
      null
    ), a.flags |= 2), a.return = l, n.return = l, n.sibling = a, l.child = n, Ga(null, n), n = l.child, a = t.child.memoizedState, a === null ? a = sc(e) : (i = a.cachePool, i !== null ? (h = Lt._currentValue, i = i.parent !== h ? { parent: h, pool: h } : i) : i = $r(), a = {
      baseLanes: a.baseLanes | e,
      cachePool: i
    }), n.memoizedState = a, n.childLanes = rc(
      t,
      s,
      e
    ), l.memoizedState = cc, Ga(t.child, n)) : (Ue(l), e = t.child, t = e.sibling, e = se(e, {
      mode: "visible",
      children: n.children
    }), e.return = l, e.sibling = null, t !== null && (s = l.deletions, s === null ? (l.deletions = [t], l.flags |= 16) : s.push(t)), l.child = e, l.memoizedState = null, e);
  }
  function hc(t, l) {
    return l = li(
      { mode: "visible", children: l },
      t.mode
    ), l.return = t, t.child = l;
  }
  function li(t, l) {
    return t = rl(22, t, null, l), t.lanes = 0, t;
  }
  function ei(t, l, e) {
    return rn(l, t.child, null, e), t = hc(
      l,
      l.pendingProps.children
    ), t.flags |= 2, l.memoizedState = null, t;
  }
  function cv(t, l, e, n, a, i, s, h) {
    if (e)
      return l.flags & 256 ? (Ue(l), l.flags &= -257, ei(
        t,
        l,
        h
      )) : l.memoizedState !== null ? (He(), l.child = t.child, l.flags |= 128, null) : (He(), i = a.fallback, s = l.mode, a = li(
        { mode: "visible", children: a.children },
        s
      ), i = tn(
        i,
        s,
        h,
        null
      ), i.flags |= 2, a.return = l, i.return = l, a.sibling = i, l.child = a, rn(l, t.child, null, h), a = l.child, a.memoizedState = sc(h), a.childLanes = rc(
        t,
        n,
        h
      ), l.memoizedState = cc, Ga(null, a));
    if (Ue(l), ss(i)) {
      if (n = i.nextSibling && i.nextSibling.dataset, n) var g = n.dgst;
      return n = g, n !== "" && (a = Error(r(419)), a.stack = "", a.digest = n, Ma({ value: a, source: null, stack: null })), ei(
        t,
        l,
        h
      );
    }
    if (Vt || nn(t, l, h, !1), n = (h & t.childLanes) !== 0, Vt || n) {
      if (Re.current !== null)
        return ei(
          t,
          l,
          h
        );
      if (n = xt, n !== null && (a = js(
        n,
        h
      ), a !== 0 && a !== s.retryLane))
        throw s.retryLane = a, Pe(t, a), vl(n, t, a), ic;
      return cs(i) || Ti(), ei(
        t,
        l,
        h
      );
    }
    return cs(i) ? (l.flags |= 192, l.child = t.child, null) : (t = s.treeContext, Ut = Hl(i.nextSibling), Jt = l, st = !0, Oe = null, Rl = !1, t !== null && jr(l, t), l = hc(
      l,
      a.children
    ), l.flags |= 134221824, l);
  }
  function c0(t, l, e) {
    t.lanes |= l;
    var n = t.alternate;
    n !== null && (n.lanes |= l), Hu(t.return, l, e);
  }
  function s0(t) {
    for (var l = null; t !== null; ) {
      var e = t.alternate;
      e !== null && ju(e) === null && (l = t), t = t.sibling;
    }
    return l;
  }
  function ni(t, l, e, n, a, i) {
    var s = t.memoizedState;
    s === null ? t.memoizedState = {
      isBackwards: l,
      rendering: null,
      renderingStartTime: 0,
      last: n,
      tail: e,
      tailMode: a,
      treeForkCount: i
    } : (s.isBackwards = l, s.rendering = null, s.renderingStartTime = 0, s.last = n, s.tail = e, s.tailMode = a, s.treeForkCount = i);
  }
  function oc(t) {
    var l = t.child;
    for (t.child = null; l !== null; ) {
      var e = l.sibling;
      l.sibling = t.child, t.child = l, l = e;
    }
  }
  function dc(t, l, e) {
    var n = l.pendingProps, a = n.revealOrder, i = n.tail;
    n = n.children;
    var s = tl.current;
    if (l.flags & 128)
      return Ha(l, s), null;
    var h = (s & 2) !== 0;
    if (h ? (s = s & 1 | 2, l.flags |= 128) : s &= 1, Ha(l, s), a === "backwards" && t !== null ? (oc(t), Zt(t, l, n, e), oc(t)) : Zt(t, l, n, e), n = st ? Oa : 0, !h && t !== null && (t.flags & 128) !== 0)
      t: for (t = l.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && c0(t, e, l);
        else if (t.tag === 19)
          c0(t, e, l);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === l) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (a) {
      case "backwards":
        e = s0(l.child), e === null ? (a = l.child, l.child = null) : (a = e.sibling, e.sibling = null, oc(l)), ni(
          l,
          !0,
          a,
          null,
          i,
          n
        );
        break;
      case "unstable_legacy-backwards":
        for (e = null, a = l.child, l.child = null; a !== null; ) {
          if (t = a.alternate, t !== null && ju(t) === null) {
            l.child = a;
            break;
          }
          t = a.sibling, a.sibling = e, e = a, a = t;
        }
        ni(
          l,
          !0,
          e,
          null,
          i,
          n
        );
        break;
      case "together":
        ni(
          l,
          !1,
          null,
          null,
          void 0,
          n
        );
        break;
      case "independent":
        l.memoizedState = null;
        break;
      default:
        e = s0(l.child), e === null ? (a = l.child, l.child = null) : (a = e.sibling, e.sibling = null), ni(
          l,
          !1,
          a,
          e,
          i,
          n
        );
    }
    return l.child;
  }
  function r0(t, l, e) {
    var n = l.pendingProps;
    return pe(l, l.type, n.value), Zt(t, l, n.children, e), l.child;
  }
  function ge(t, l, e) {
    if (t !== null && (l.dependencies = t.dependencies), Ge |= l.lanes, (e & l.childLanes) === 0)
      if (t !== null) {
        if (nn(
          t,
          l,
          e,
          !1
        ), (e & l.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && l.child !== t.child)
      throw Error(r(153));
    if (l.child !== null) {
      for (t = l.child, e = se(t, t.pendingProps), l.child = e, e.return = l; t.sibling !== null; )
        t = t.sibling, e = e.sibling = se(t, t.pendingProps), e.return = l;
      e.sibling = null;
    }
    return l.child;
  }
  function vc(t, l) {
    return (t.lanes & l) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && qu(t)));
  }
  function sv(t, l, e) {
    switch (l.tag) {
      case 3:
        cu(l, l.stateNode.containerInfo), pe(l, Lt, t.memoizedState.cache), ln();
        break;
      case 27:
      case 5:
        Li(l);
        break;
      case 4:
        cu(l, l.stateNode.containerInfo);
        break;
      case 10:
        pe(
          l,
          l.type,
          l.memoizedProps.value
        );
        break;
      case 31:
        if (l.memoizedState !== null)
          return l.flags |= 128, Xf(l), null;
        break;
      case 13:
        var n = l.memoizedState;
        if (n !== null) {
          if (n.dehydrated !== null)
            return Ue(l), l.flags |= 128, null;
          n = nn(
            t,
            l,
            e,
            !1
          );
          var a = l.child.childLanes;
          return n || (e & a) !== 0 ? f0(t, l, e) : (Ue(l), t = ge(
            t,
            l,
            e
          ), t !== null ? t.sibling : null);
        }
        Ue(l);
        break;
      case 19:
        if (l.flags & 128)
          return dc(
            t,
            l,
            e
          );
        if (a = (t.flags & 128) !== 0, n = (e & l.childLanes) !== 0, n || (nn(
          t,
          l,
          e,
          !1
        ), n = (e & l.childLanes) !== 0), a) {
          if (n)
            return dc(
              t,
              l,
              e
            );
          l.flags |= 128;
        }
        if (a = l.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), Ha(l, tl.current), n) break;
        return null;
      case 22:
        return l.lanes = 0, l0(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        pe(l, Lt, t.memoizedState.cache);
    }
    return ge(t, l, e);
  }
  function h0(t, l, e) {
    if (t !== null)
      if (t.memoizedProps !== l.pendingProps)
        Vt = !0;
      else {
        if (!vc(t, e) && (l.flags & 128) === 0)
          return Vt = !1, sv(
            t,
            l,
            e
          );
        Vt = (t.flags & 131072) !== 0;
      }
    else
      Vt = !1, st && (l.flags & 1048576) !== 0 && Vr(l, Oa, l.index);
    switch (l.lanes = 0, l.tag) {
      case 16:
        t: {
          var n = l.pendingProps;
          if (t = cn(l.elementType), l.type = t, typeof t == "function")
            bf(t) ? (n = on(t, n), l.tag = 1, l = u0(
              null,
              l,
              t,
              n,
              e
            )) : (l.tag = 0, l = fc(
              null,
              l,
              t,
              n,
              e
            ));
          else {
            if (t != null) {
              var a = t.$$typeof;
              if (a === X) {
                l.tag = 11, l = kh(
                  null,
                  l,
                  t,
                  n,
                  e
                );
                break t;
              } else if (a === At) {
                l.tag = 14, l = Ph(
                  null,
                  l,
                  t,
                  n,
                  e
                );
                break t;
              } else if (a === zt) {
                l.tag = 10, l.type = t, l = r0(
                  null,
                  l,
                  e
                );
                break t;
              }
            }
            throw l = rt(t) || t, Error(r(306, l, ""));
          }
        }
        return l;
      case 0:
        return fc(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 1:
        return n = l.type, a = on(
          n,
          l.pendingProps
        ), u0(
          t,
          l,
          n,
          a,
          e
        );
      case 3:
        t: {
          if (cu(
            l,
            l.stateNode.containerInfo
          ), t === null) throw Error(r(387));
          n = l.pendingProps;
          var i = l.memoizedState;
          a = i.element, Hf(t, l), Ua(l, n, null, e);
          var s = l.memoizedState;
          if (n = s.cache, pe(l, Lt, n), n !== i.cache && Nf(
            l,
            [Lt],
            e,
            !0
          ), Ra(), n = s.element, i.isDehydrated)
            if (i = {
              element: n,
              isDehydrated: !1,
              cache: s.cache
            }, l.updateQueue.baseState = i, l.memoizedState = i, l.flags & 256) {
              l = i0(
                t,
                l,
                n,
                e
              );
              break t;
            } else if (n !== a) {
              a = Cl(
                Error(r(424)),
                l
              ), Ma(a), l = i0(
                t,
                l,
                n,
                e
              );
              break t;
            } else
              for (t = l.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, Ut = Hl(t.firstChild), Jt = l, st = !0, Oe = null, Rl = !0, e = lh(
                l,
                null,
                n,
                e
              ), l.child = e; e; )
                e.flags = e.flags & -3 | 134221824, e = e.sibling;
          else {
            if (ln(), n === a) {
              l = ge(
                t,
                l,
                e
              );
              break t;
            }
            Zt(t, l, n, e);
          }
          l = l.child;
        }
        return l;
      case 26:
        return Vn(t, l), t === null ? (e = B1(
          l.type,
          null,
          l.pendingProps,
          null
        )) ? l.memoizedState = e : st || (l.stateNode = g1(
          l.type,
          l.pendingProps,
          Ee.current,
          l
        )) : l.memoizedState = B1(
          l.type,
          t.memoizedProps,
          l.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Li(l), t === null && st && (n = l.stateNode = R1(
          l.type,
          l.pendingProps,
          Ee.current
        ), Jt = l, Rl = !0, a = Ut, Ve(l.type) ? (rs = a, Ut = Hl(n.firstChild)) : Ut = a), Zt(
          t,
          l,
          l.pendingProps.children,
          e
        ), Vn(t, l), t === null && (l.flags |= 4194304), l.child;
      case 5:
        return t === null && st && ((a = n = Ut) && (n = ng(
          n,
          l.type,
          l.pendingProps,
          Rl
        ), n !== null ? (l.stateNode = n, Jt = l, Ut = Hl(n.firstChild), Rl = !1, a = !0) : a = !1), a || Me(l)), Li(l), a = l.type, i = l.pendingProps, s = t !== null ? t.memoizedProps : null, n = i.children, ls(a, i) ? n = null : s !== null && ls(a, s) && (l.flags |= 32), l.memoizedState !== null && (a = Vf(
          t,
          l,
          kd,
          null,
          null,
          e
        ), ia._currentValue = a), Vn(t, l), Zt(t, l, n, e), l.child;
      case 6:
        return t === null && st && ((t = e = Ut) && (e = ag(
          e,
          l.pendingProps,
          Rl
        ), e !== null ? (l.stateNode = e, Jt = l, Ut = null, t = !0) : t = !1), t || Me(l)), null;
      case 13:
        return f0(t, l, e);
      case 4:
        return cu(
          l,
          l.stateNode.containerInfo
        ), n = l.pendingProps, t === null ? l.child = rn(
          l,
          null,
          n,
          e
        ) : Zt(t, l, n, e), l.child;
      case 11:
        return kh(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 7:
        return n = l.pendingProps, Vn(t, l), Zt(t, l, n, e), l.child;
      case 8:
        return Zt(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 12:
        return Zt(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 10:
        return r0(t, l, e);
      case 9:
        return a = l.type._context, n = l.pendingProps.children, an(l), a = kt(a), n = n(a), l.flags |= 1, Zt(t, l, n, e), l.child;
      case 14:
        return Ph(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 15:
        return t0(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 19:
        return dc(t, l, e);
      case 31:
        return fv(t, l, e);
      case 22:
        return l0(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        return an(l), n = kt(Lt), t === null ? (a = xf(), a === null && (a = xt, i = Cf(), a.pooledCache = i, i.refCount++, i !== null && (a.pooledCacheLanes |= e), a = i), l.memoizedState = { parent: n, cache: a }, Uf(l), pe(l, Lt, a)) : ((t.lanes & e) !== 0 && (Hf(t, l), Ua(l, null, null, e), Ra()), a = t.memoizedState, i = l.memoizedState, a.parent !== n ? (a = { parent: n, cache: n }, l.memoizedState = a, l.lanes === 0 && (l.memoizedState = l.updateQueue.baseState = a), pe(l, Lt, n)) : (n = i.cache, pe(l, Lt, n), n !== a.cache && Nf(
          l,
          [Lt],
          e,
          !0
        ))), Zt(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 30:
        return l.stateNode === null && (l.stateNode = {
          autoName: null,
          paired: null,
          clones: null,
          ref: null
        }), n = l.pendingProps, n.name != null && n.name !== "auto" ? l.flags |= t === null ? 18882560 : 18874368 : st && Ru(l), t !== null && t.memoizedProps.name !== n.name ? l.flags |= 4194816 : Vn(t, l), Zt(t, l, n.children, e), l.child;
      case 29:
        throw l.pendingProps;
    }
    throw Error(r(156, l.tag));
  }
  function me(t) {
    t.flags |= 4;
  }
  function gc(t, l, e, n, a) {
    var i;
    if ((i = (t.mode & 32) !== 0) && (i = e === null ? L1(l, n) : L1(l, n) && (n.src !== e.src || n.srcSet !== e.srcSet)), i) {
      if (t.flags |= 16777216, (a & 335544128) === a)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (K0()) t.flags |= 8192;
        else
          throw sn = Xu, Rf;
    } else t.flags &= -16777217;
  }
  function o0(t, l) {
    if (l.type !== "stylesheet" || (l.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Q1(l))
      if (K0()) t.flags |= 8192;
      else
        throw sn = Xu, Rf;
  }
  function ai(t, l) {
    l !== null && (t.flags |= 4), t.flags & 16384 && (l = t.tag !== 22 ? Ls() : 536870912, t.lanes |= l, Jn |= l);
  }
  function Xa(t, l) {
    if (!st)
      switch (t.tailMode) {
        case "visible":
          break;
        case "collapsed":
          for (var e = t.tail, n = null; e !== null; )
            e.alternate !== null && (n = e), e = e.sibling;
          n === null ? l || t.tail === null ? t.tail = null : t.tail.sibling = null : n.sibling = null;
          break;
        default:
          for (l = t.tail, e = null; l !== null; )
            l.alternate !== null && (e = l), l = l.sibling;
          e === null ? t.tail = null : e.sibling = null;
      }
  }
  function Ht(t) {
    var l = t.alternate !== null && t.alternate.child === t.child, e = 0, n = 0;
    if (l)
      for (var a = t.child; a !== null; )
        e |= a.lanes | a.childLanes, n |= a.subtreeFlags & 1206910976, n |= a.flags & 1206910976, a.return = t, a = a.sibling;
    else
      for (a = t.child; a !== null; )
        e |= a.lanes | a.childLanes, n |= a.subtreeFlags, n |= a.flags, a.return = t, a = a.sibling;
    return t.subtreeFlags |= n, t.childLanes = e, l;
  }
  function rv(t, l, e) {
    var n = l.pendingProps;
    switch (Af(l), l.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ht(l), null;
      case 1:
        return Ht(l), null;
      case 3:
        return e = l.stateNode, n = null, t !== null && (n = t.memoizedState.cache), l.memoizedState.cache !== n && (l.flags |= 2048), oe(Lt), En(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (t === null || t.child === null) && (qn(l) ? me(l) : t === null || t.memoizedState.isDehydrated && (l.flags & 256) === 0 || (l.flags |= 1024, Mf())), Ht(l), null;
      case 26:
        var a = l.type, i = l.memoizedState;
        return t === null ? (me(l), i !== null ? (Ht(l), o0(l, i)) : (Ht(l), gc(
          l,
          a,
          null,
          n,
          e
        ))) : i ? i !== t.memoizedState ? (me(l), Ht(l), o0(l, i)) : (Ht(l), l.flags &= -16777217) : (t = t.memoizedProps, t !== n && me(l), Ht(l), gc(
          l,
          a,
          t,
          n,
          e
        )), null;
      case 27:
        if (su(l), e = Ee.current, a = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== n && me(l);
        else {
          if (!n) {
            if (l.stateNode === null)
              throw Error(r(166));
            return Ht(l), l.subtreeFlags &= -33554433, null;
          }
          t = Kl.current, qn(l) ? Zr(l) : (t = R1(a, n, e), l.stateNode = t, me(l));
        }
        return Ht(l), l.subtreeFlags &= -33554433, null;
      case 5:
        if (su(l), a = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== n && me(l);
        else {
          if (!n) {
            if (l.stateNode === null)
              throw Error(r(166));
            return Ht(l), l.subtreeFlags &= -33554433, null;
          }
          if (i = Kl.current, qn(l))
            Zr(l);
          else {
            var s = Wa(
              Ee.current
            );
            switch (i) {
              case 1:
                i = s.createElementNS(
                  "http://www.w3.org/2000/svg",
                  a
                );
                break;
              case 2:
                i = s.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  a
                );
                break;
              default:
                switch (a) {
                  case "svg":
                    i = s.createElementNS(
                      "http://www.w3.org/2000/svg",
                      a
                    );
                    break;
                  case "math":
                    i = s.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      a
                    );
                    break;
                  case "script":
                    i = s.createElement("div"), i.innerHTML = "<script><\/script>", i = i.removeChild(
                      i.firstChild
                    );
                    break;
                  case "select":
                    i = typeof n.is == "string" ? s.createElement("select", {
                      is: n.is
                    }) : s.createElement("select"), n.multiple ? i.multiple = !0 : n.size && (i.size = n.size);
                    break;
                  default:
                    i = typeof n.is == "string" ? s.createElement(a, { is: n.is }) : s.createElement(a);
                }
            }
            i[It] = l, i[sl] = n;
            t: for (s = l.child; s !== null; ) {
              if (s.tag === 5 || s.tag === 6)
                i.appendChild(s.stateNode);
              else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
                s.child.return = s, s = s.child;
                continue;
              }
              if (s === l) break t;
              for (; s.sibling === null; ) {
                if (s.return === null || s.return === l)
                  break t;
                s = s.return;
              }
              s.sibling.return = s.return, s = s.sibling;
            }
            l.stateNode = i;
            t: switch (el(i, a, n), a) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                n = !!n.autoFocus;
                break t;
              case "img":
                n = !0;
                break t;
              default:
                n = !1;
            }
            n && me(l);
          }
        }
        return Ht(l), l.subtreeFlags &= -33554433, gc(
          l,
          l.type,
          t === null ? null : t.memoizedProps,
          l.pendingProps,
          e
        ), null;
      case 6:
        if (t && l.stateNode != null)
          t.memoizedProps !== n && me(l);
        else {
          if (typeof n != "string" && l.stateNode === null)
            throw Error(r(166));
          if (t = Ee.current, qn(l)) {
            if (t = l.stateNode, e = l.memoizedProps, n = null, a = Jt, a !== null)
              switch (a.tag) {
                case 27:
                case 5:
                  n = a.memoizedProps;
              }
            t[It] = l, t = !!(t.nodeValue === e || n !== null && n.suppressHydrationWarning === !0 || h1(t.nodeValue, e)), t || Me(l, !0);
          } else
            t = Wa(t).createTextNode(
              n
            ), t[It] = l, l.stateNode = t;
        }
        return Ht(l), null;
      case 31:
        if (e = l.memoizedState, t === null || t.memoizedState !== null) {
          if (n = qn(l), e !== null) {
            if (t === null) {
              if (!n) throw Error(r(318));
              if (t = l.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(557));
              t[It] = l;
            } else
              ln(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            Ht(l), t = !1;
          } else
            e = Mf(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = e), t = !0;
          if (!t)
            return l.flags & 256 ? (Tl(l), l) : (Tl(l), null);
          if ((l.flags & 128) !== 0)
            throw Error(r(558));
        }
        return Ht(l), null;
      case 13:
        if (n = l.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (a = qn(l), n !== null && n.dehydrated !== null) {
            if (t === null) {
              if (!a) throw Error(r(318));
              if (a = l.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(r(317));
              a[It] = l;
            } else
              ln(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            Ht(l), a = !1;
          } else
            a = Mf(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a), a = !0;
          if (!a)
            return l.flags & 256 ? (Tl(l), l) : (Tl(l), null);
        }
        return Tl(l), (l.flags & 128) !== 0 ? (l.lanes = e, l) : (e = n !== null, t = t !== null && t.memoizedState !== null, e && (n = l.child, a = null, n.alternate !== null && n.alternate.memoizedState !== null && n.alternate.memoizedState.cachePool !== null && (a = n.alternate.memoizedState.cachePool.pool), i = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (i = n.memoizedState.cachePool.pool), i !== a && (n.flags |= 2048)), e !== t && e && (l.child.flags |= 8192), ai(l, l.updateQueue), Ht(l), null);
      case 4:
        return En(), t === null && Wc(l.stateNode.containerInfo), l.flags |= 67108864, Ht(l), null;
      case 10:
        return oe(l.type), Ht(l), null;
      case 19:
        if (Lf(l), n = l.memoizedState, n === null) return Ht(l), null;
        if (a = (l.flags & 128) !== 0, i = n.rendering, i === null)
          if (a) Xa(n, !1);
          else {
            if (Gt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = l.child; t !== null; ) {
                if (i = ju(t), i !== null) {
                  for (l.flags |= 128, Xa(n, !1), t = i.updateQueue, l.updateQueue = t, ai(l, t), l.subtreeFlags = 0, t = e, e = l.child; e !== null; )
                    Xr(e, t), e = e.sibling;
                  return Ha(
                    l,
                    tl.current & 1 | 2
                  ), st && re(l, n.treeForkCount), l.child;
                }
                t = t.sibling;
              }
            n.tail !== null && gl() > mi && (l.flags |= 128, a = !0, Xa(n, !1), l.lanes = 4194304);
          }
        else {
          if (!a)
            if (t = ju(i), t !== null) {
              if (l.flags |= 128, a = !0, t = t.updateQueue, l.updateQueue = t, ai(l, t), Xa(n, !0), n.tail === null && n.tailMode !== "collapsed" && n.tailMode !== "visible" && !i.alternate && !st)
                return Ht(l), null;
            } else
              2 * gl() - n.renderingStartTime > mi && e !== 536870912 && (l.flags |= 128, a = !0, Xa(n, !1), l.lanes = 4194304);
          n.isBackwards ? (i.sibling = l.child, l.child = i) : (t = n.last, t !== null ? t.sibling = i : l.child = i, n.last = i);
        }
        if (n.tail !== null) {
          t = n.tail;
          t: {
            for (e = t; e !== null; ) {
              if (e.alternate !== null) {
                e = !1;
                break t;
              }
              e = e.sibling;
            }
            e = !0;
          }
          return n.rendering = t, n.tail = t.sibling, n.renderingStartTime = gl(), t.sibling = null, i = tl.current, i = a ? i & 1 | 2 : i & 1, n.tailMode === "visible" || n.tailMode === "collapsed" || !e || st ? Ha(l, i) : (e = i, Rt(Pt, l), Rt(tl, e), al === null && (al = l)), st && re(l, n.treeForkCount), t;
        }
        return Ht(l), null;
      case 22:
      case 23:
        return Tl(l), Gf(), n = l.memoizedState !== null, t !== null ? t.memoizedState !== null !== n && (l.flags |= 8192) : n && (l.flags |= 8192), n ? (e & 536870912) !== 0 && (l.flags & 128) === 0 && (Ht(l), l.subtreeFlags & 6 && (l.flags |= 8192)) : Ht(l), e = l.updateQueue, e !== null && ai(l, e.retryQueue), e = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), n = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (n = l.memoizedState.cachePool.pool), n !== e && (l.flags |= 2048), t !== null && Wt(fn), null;
      case 24:
        return e = null, t !== null && (e = t.memoizedState.cache), l.memoizedState.cache !== e && (l.flags |= 2048), oe(Lt), Ht(l), null;
      case 25:
        return null;
      case 30:
        return l.flags |= 33554432, Ht(l), null;
    }
    throw Error(r(156, l.tag));
  }
  function hv(t, l) {
    switch (Af(l), l.tag) {
      case 1:
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 3:
        return oe(Lt), En(), t = l.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (l.flags = t & -65537 | 128, l) : null;
      case 26:
      case 27:
      case 5:
        return su(l), null;
      case 31:
        if (l.memoizedState !== null) {
          if (Tl(l), l.alternate === null)
            throw Error(r(340));
          ln();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 13:
        if (Tl(l), t = l.memoizedState, t !== null && t.dehydrated !== null) {
          if (l.alternate === null)
            throw Error(r(340));
          ln();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 19:
        return Lf(l), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, t = l.memoizedState, t !== null && (t.rendering = null, t.tail = null), l.flags |= 4, l) : null;
      case 4:
        return En(), null;
      case 10:
        return oe(l.type), null;
      case 22:
      case 23:
        return Tl(l), Gf(), t !== null && Wt(fn), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 24:
        return oe(Lt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function d0(t, l) {
    switch (Af(l), l.tag) {
      case 3:
        oe(Lt), En();
        break;
      case 26:
      case 27:
      case 5:
        su(l);
        break;
      case 4:
        En();
        break;
      case 31:
        l.memoizedState !== null && Tl(l);
        break;
      case 13:
        Tl(l);
        break;
      case 19:
        Lf(l);
        break;
      case 10:
        oe(l.type);
        break;
      case 22:
      case 23:
        Tl(l), Gf(), t !== null && Wt(fn);
        break;
      case 24:
        oe(Lt);
    }
  }
  function La(t, l) {
    try {
      var e = l.updateQueue, n = e !== null ? e.lastEffect : null;
      if (n !== null) {
        var a = n.next;
        e = a;
        do {
          if ((e.tag & t) === t) {
            n = void 0;
            var i = e.create, s = e.inst;
            n = i(), s.destroy = n;
          }
          e = e.next;
        } while (e !== a);
      }
    } catch (h) {
      Nt(l, l.return, h);
    }
  }
  function qe(t, l, e) {
    try {
      var n = l.updateQueue, a = n !== null ? n.lastEffect : null;
      if (a !== null) {
        var i = a.next;
        n = i;
        do {
          if ((n.tag & t) === t) {
            var s = n.inst, h = s.destroy;
            if (h !== void 0) {
              s.destroy = void 0, a = l;
              var g = e, z = h;
              try {
                z();
              } catch (p) {
                Nt(
                  a,
                  g,
                  p
                );
              }
            }
          }
          n = n.next;
        } while (n !== i);
      }
    } catch (p) {
      Nt(l, l.return, p);
    }
  }
  function v0(t) {
    var l = t.updateQueue;
    if (l !== null) {
      var e = t.stateNode;
      try {
        nh(l, e);
      } catch (n) {
        Nt(t, t.return, n);
      }
    }
  }
  function g0(t, l, e) {
    e.props = on(
      t.type,
      t.memoizedProps
    ), e.state = t.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (n) {
      Nt(t, l, n);
    }
  }
  function Wl(t, l) {
    try {
      var e = t.ref;
      if (e !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var n = t.stateNode;
            break;
          case 30:
            var a = t.stateNode, i = fe(t.memoizedProps, a);
            (a.ref === null || a.ref.name !== i) && (a.ref = _1(i)), n = a.ref;
            break;
          case 7:
            if (t.stateNode === null) {
              var s = new Ol(t);
              m(
                t.child,
                !1,
                lg,
                s,
                void 0,
                void 0
              ), t.stateNode = s;
            }
            n = t.stateNode;
            break;
          default:
            n = t.stateNode;
        }
        typeof e == "function" ? t.refCleanup = e(n) : e.current = n;
      }
    } catch (h) {
      Nt(t, l, h);
    }
  }
  function ll(t, l) {
    var e = t.ref, n = t.refCleanup;
    if (e !== null)
      if (typeof n == "function")
        try {
          n();
        } catch (a) {
          Nt(t, l, a);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (a) {
          Nt(t, l, a);
        }
      else e.current = null;
  }
  function ui(t, l) {
    if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && t.alternate === null && l !== null)
      for (var e = 0; e < l.length; e++)
        N1(
          t.stateNode,
          l[e]
        );
  }
  function m0(t) {
    for (var l = t.return; l !== null && (yc(l) && N1(t.stateNode, l.stateNode), !mc(l)); )
      l = l.return;
  }
  function Qa(t) {
    for (var l = t.return; l !== null && (yc(l) && eg(t.stateNode, l.stateNode), !mc(l)); )
      l = l.return;
  }
  function mc(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 27;
  }
  function yc(t) {
    return t && t.tag === 7 && t.stateNode !== null;
  }
  function Sc(t) {
    var l = t.type, e = t.memoizedProps, n = t.stateNode;
    try {
      t: switch (l) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          e.autoFocus && n.focus();
          break t;
        case "img":
          e.src ? n.src = e.src : e.srcSet && (n.srcset = e.srcSet);
      }
    } catch (a) {
      Nt(t, t.return, a);
    }
  }
  function Ec(t, l, e) {
    try {
      var n = t.stateNode;
      Yv(n, t.type, e, l), n[sl] = l;
    } catch (a) {
      Nt(t, t.return, a);
    }
  }
  function y0(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Ve(t.type) || t.tag === 4;
  }
  function Tc(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || y0(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Ve(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function bc(t, l, e, n) {
    var a = t.tag;
    if (a === 5 || a === 6)
      a = t.stateNode, l ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(a, l) : (l = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.appendChild(a), e = e._reactRootContainer, e != null || l.onclick !== null || (l.onclick = Jl)), ui(t, n), bt = !0;
    else if (a !== 4 && (a === 27 && (ui(t, n), n = null, Ve(t.type) && (e = t.stateNode, l = null)), t = t.child, t !== null))
      for (bc(
        t,
        l,
        e,
        n
      ), t = t.sibling; t !== null; )
        bc(
          t,
          l,
          e,
          n
        ), t = t.sibling;
  }
  function ii(t, l, e, n) {
    var a = t.tag;
    if (a === 5 || a === 6)
      a = t.stateNode, l ? e.insertBefore(a, l) : e.appendChild(a), ui(t, n), bt = !0;
    else if (a !== 4 && (a === 27 && (ui(t, n), n = null, Ve(t.type) && (e = t.stateNode)), t = t.child, t !== null))
      for (ii(
        t,
        l,
        e,
        n
      ), t = t.sibling; t !== null; )
        ii(
          t,
          l,
          e,
          n
        ), t = t.sibling;
  }
  function S0(t) {
    var l = t.stateNode, e = t.memoizedProps;
    try {
      for (var n = t.type, a = l.attributes; a.length; )
        l.removeAttributeNode(a[0]);
      el(l, n, e), l[It] = t, l[sl] = e;
    } catch (i) {
      Nt(t, t.return, i);
    }
  }
  var fi = !1, bl = null;
  function E0(t) {
    (t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (fi = !0);
  }
  var Il = null;
  function T0() {
    var t = Il;
    return Il = null, t;
  }
  var hl = 0;
  function jn(t, l, e, n, a) {
    return hl = 0, b0(
      t.child,
      l,
      e,
      n,
      a
    );
  }
  function b0(t, l, e, n, a) {
    for (var i = !1; t !== null; ) {
      if (t.tag === 5) {
        var s = t.stateNode;
        if (n !== null) {
          var h = as(s);
          n.push(h), h.view && (i = !0);
        } else
          i || as(s).view && (i = !0);
        fi = !0, T1(
          s,
          hl === 0 ? l : l + "_" + hl,
          e
        ), hl++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && a || b0(
        t.child,
        l,
        e,
        n,
        a
      ) && (i = !0));
      t = t.sibling;
    }
    return i;
  }
  function kl(t, l) {
    for (; t !== null; )
      t.tag === 5 ? b1(t.stateNode, t.memoizedProps) : (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && l || kl(
        t.child,
        l
      )), t = t.sibling;
  }
  function ci(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if ((t.tag !== 22 || t.memoizedState === null) && (ci(t), t.tag === 30 && (t.flags & 18874368) !== 0 && t.stateNode.paired)) {
          var l = t.memoizedProps;
          if (l.name == null || l.name === "auto")
            throw Error(r(544));
          var e = l.name;
          l = ce(l.default, l.share), l !== "none" && (jn(
            t,
            e,
            l,
            null,
            !1
          ) || kl(t.child, !1));
        }
        t = t.sibling;
      }
  }
  function _c(t, l) {
    if (t.tag === 30) {
      var e = t.stateNode, n = t.memoizedProps, a = fe(n, e), i = ce(
        n.default,
        e.paired ? n.share : n.enter
      );
      i !== "none" ? jn(t, a, i, null, !1) ? (ci(t), e.paired || l || In(t, n.onEnter)) : kl(t.child, !1) : ci(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        _c(t, l), t = t.sibling;
    else ci(t);
  }
  function zc(t) {
    if (bl !== null && bl.size !== 0) {
      var l = bl;
      if ((t.subtreeFlags & 18874368) !== 0)
        for (t = t.child; t !== null; ) {
          if (t.tag !== 22 || t.memoizedState === null) {
            if (t.tag === 30 && (t.flags & 18874368) !== 0) {
              var e = t.memoizedProps, n = e.name;
              if (n != null && n !== "auto") {
                var a = l.get(n);
                if (a !== void 0) {
                  var i = ce(
                    e.default,
                    e.share
                  );
                  if (i !== "none" && (jn(
                    t,
                    n,
                    i,
                    null,
                    !1
                  ) ? (i = t.stateNode, a.paired = i, i.paired = a, In(t, e.onShare)) : kl(t.child, !1)), l.delete(n), l.size === 0) break;
                }
              }
            }
            zc(t);
          }
          t = t.sibling;
        }
    }
  }
  function Ac(t) {
    if (t.tag === 30) {
      var l = t.memoizedProps, e = fe(l, t.stateNode), n = bl !== null ? bl.get(e) : void 0, a = ce(
        l.default,
        n !== void 0 ? l.share : l.exit
      );
      a !== "none" && (jn(t, e, a, null, !1) ? n !== void 0 ? (a = t.stateNode, n.paired = a, a.paired = n, bl.delete(e), In(t, l.onShare)) : In(t, l.onExit) : kl(t.child, !1)), bl !== null && zc(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Ac(t), t = t.sibling;
    else
      bl !== null && zc(t);
  }
  function _0(t) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var l = t.memoizedProps, e = fe(l, t.stateNode);
        l = ce(l.default, l.update), t.flags &= -5, l !== "none" && jn(
          t,
          e,
          l,
          t.memoizedState = [],
          !1
        );
      } else
        (t.subtreeFlags & 33554432) !== 0 && _0(t);
      t = t.sibling;
    }
  }
  function Oc(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if (t.tag !== 22 || t.memoizedState === null) {
          if (t.tag === 30 && (t.flags & 18874368) !== 0) {
            var l = t.stateNode;
            l.paired !== null && (l.paired = null, kl(t.child, !1));
          }
          Oc(t);
        }
        t = t.sibling;
      }
  }
  function si(t) {
    if (t.tag === 30)
      t.stateNode.paired = null, kl(t.child, !1), Oc(t);
    else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        si(t), t = t.sibling;
    else Oc(t);
  }
  function z0(t) {
    for (t = t.child; t !== null; )
      t.tag === 30 ? kl(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && z0(t), t = t.sibling;
  }
  function Mc(t, l, e, n, a, i, s) {
    for (var h = !1; l !== null; ) {
      if (l.tag === 5) {
        var g = l.stateNode;
        if (i !== null && hl < i.length) {
          var z = i[hl], p = as(g);
          (z.view || p.view) && (h = !0);
          var x;
          if (x = (t.flags & 4) === 0)
            if (p.clip) x = !0;
            else {
              x = z.rect;
              var b = p.rect;
              x = x.y !== b.y || x.x !== b.x || x.height !== b.height || x.width !== b.width;
            }
          x && (t.flags |= 4), p.abs ? p = !z.abs : (z = z.rect, p = p.rect, p = z.height !== p.height || z.width !== p.width), p && (t.flags |= 32);
        } else t.flags |= 32;
        (t.flags & 4) !== 0 && T1(
          g,
          hl === 0 ? e : e + "_" + hl,
          a
        ), h && (t.flags & 4) !== 0 || (Il === null && (Il = []), Il.push(
          g,
          hl === 0 ? n : n + "_" + hl,
          l.memoizedProps
        )), hl++;
      } else (l.tag !== 22 || l.memoizedState === null) && (l.tag === 30 && s ? t.flags |= l.flags & 32 : Mc(
        t,
        l.child,
        e,
        n,
        a,
        i,
        s
      ) && (h = !0));
      l = l.sibling;
    }
    return h;
  }
  function A0(t, l) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var e = t.memoizedProps, n = t.stateNode, a = fe(e, n), i = ce(e.default, e.update), s;
        s = t.memoizedState, t.memoizedState = null, n = t;
        var h = t.child;
        hl = 0, a = Mc(
          n,
          h,
          a,
          a,
          i,
          s,
          !1
        ), (t.flags & 4) !== 0 && a && In(t, e.onUpdate);
      } else
        (t.subtreeFlags & 33554432) !== 0 && A0(t);
      t = t.sibling;
    }
  }
  var Ft = !1, Mt = !1, Pl = !1, pc = !1, O0 = typeof WeakSet == "function" ? WeakSet : Set, $t = null, te = !1, Va = !1, ri = !1, Nc = !1;
  function ov(t, l, e) {
    if (t = t.containerInfo, Pc = fa, t = Cr(t), vf(t)) {
      if ("selectionStart" in t)
        var n = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          n = (n = t.ownerDocument) && n.defaultView || window;
          var a = n.getSelection && n.getSelection();
          if (a && a.rangeCount !== 0) {
            n = a.anchorNode;
            var i = a.anchorOffset, s = a.focusNode;
            a = a.focusOffset;
            try {
              n.nodeType, s.nodeType;
            } catch {
              n = null;
              break t;
            }
            var h = 0, g = -1, z = -1, p = 0, x = 0, b = t, M = null;
            l: for (; ; ) {
              for (var Y; b !== n || i !== 0 && b.nodeType !== 3 || (g = h + i), b !== s || a !== 0 && b.nodeType !== 3 || (z = h + a), b.nodeType === 3 && (h += b.nodeValue.length), (Y = b.firstChild) !== null; )
                M = b, b = Y;
              for (; ; ) {
                if (b === t) break l;
                if (M === n && ++p === i && (g = h), M === s && ++x === a && (z = h), (Y = b.nextSibling) !== null) break;
                b = M, M = b.parentNode;
              }
              b = Y;
            }
            n = g === -1 || z === -1 ? null : { start: g, end: z };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (ts = { focusedElem: t, selectionRange: n }, fa = !1, e = (e & 335544064) === e, $t = l, l = e ? 9270 : 1024; $t !== null; ) {
      if (t = $t, e && (n = t.deletions, n !== null))
        for (i = 0; i < n.length; i++)
          e && Ac(n[i]);
      if (t.alternate === null && (t.flags & 2) !== 0)
        e && E0(t), hi(e);
      else {
        if (t.tag === 22) {
          if (n = t.alternate, t.memoizedState !== null) {
            n !== null && n.memoizedState === null && e && Ac(n), hi(e);
            continue;
          } else if (n !== null && n.memoizedState !== null) {
            e && E0(t), hi(e);
            continue;
          }
        }
        n = t.child, (t.subtreeFlags & l) !== 0 && n !== null ? (n.return = t, $t = n) : (e && _0(t), hi(e));
      }
    }
    bl = null;
  }
  function hi(t) {
    for (; $t !== null; ) {
      var l = $t, e = t, n = l.alternate, a = l.flags;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ((a & 1024) !== 0 && n !== null) {
            e = void 0, a = n.memoizedProps, n = n.memoizedState;
            var i = l.stateNode;
            try {
              var s = on(
                l.type,
                a
              );
              e = i.getSnapshotBeforeUpdate(
                s,
                n
              ), i.__reactInternalSnapshotBeforeUpdate = e;
            } catch (h) {
              Nt(l, l.return, h);
            }
          }
          break;
        case 3:
          if ((a & 1024) !== 0) {
            if (n = l.stateNode.containerInfo, e = n.nodeType, e === 9)
              fs(n);
            else if (e === 1)
              switch (n.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  fs(n);
                  break;
                default:
                  n.textContent = "";
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
          e && n !== null && (e = fe(
            n.memoizedProps,
            n.stateNode
          ), a = l.memoizedProps, a = ce(a.default, a.update), a !== "none" && jn(
            n,
            e,
            a,
            n.memoizedState = [],
            !0
          ));
          break;
        default:
          if ((a & 1024) !== 0) throw Error(r(163));
      }
      if (n = l.sibling, n !== null) {
        n.return = l.return, $t = n;
        break;
      }
      $t = l.return;
    }
  }
  function M0(t, l, e) {
    var n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        le(t, e), n & 4 && La(5, e);
        break;
      case 1:
        if (le(t, e), n & 4)
          if (t = e.stateNode, l === null)
            try {
              t.componentDidMount();
            } catch (s) {
              Nt(e, e.return, s);
            }
          else {
            var a = on(
              e.type,
              l.memoizedProps
            );
            l = l.memoizedState;
            try {
              t.componentDidUpdate(
                a,
                l,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (s) {
              Nt(
                e,
                e.return,
                s
              );
            }
          }
        n & 64 && v0(e), n & 512 && Wl(e, e.return);
        break;
      case 3:
        if (le(t, e), n & 64 && (t = e.updateQueue, t !== null)) {
          if (l = null, e.child !== null)
            switch (e.child.tag) {
              case 27:
              case 5:
                l = e.child.stateNode;
                break;
              case 1:
                l = e.child.stateNode;
            }
          try {
            nh(t, l);
          } catch (s) {
            Nt(e, e.return, s);
          }
        }
        break;
      case 27:
        l === null && n & 4 && S0(e);
      case 26:
      case 5:
        le(t, e), l === null && n & 4 && Sc(e), n & 512 && Wl(e, e.return);
        break;
      case 12:
        le(t, e);
        break;
      case 31:
        le(t, e), n & 4 && D0(t, e);
        break;
      case 13:
        le(t, e), n & 4 && x0(t, e), n & 64 && (t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null && (e = Av.bind(
          null,
          e
        ), ug(t, e))));
        break;
      case 22:
        if (n = e.memoizedState !== null || Ft, !n) {
          var i = l !== null && l.memoizedState !== null || Mt;
          l = Ft, a = Mt, Ft = n, (Mt = i) && !a ? (n = 2, (e.subtreeFlags & 8772) !== 0 && (n |= 1), Ll(
            t,
            e,
            n
          )) : le(t, e), Ft = l, Mt = a;
        }
        break;
      case 30:
        le(t, e), n & 512 && Wl(e, e.return);
        break;
      case 7:
        n & 512 && Wl(e, e.return);
      default:
        le(t, e);
    }
  }
  function Cc(t, l) {
    for (t = t.child; t !== null; )
      p0(t, l), t = t.sibling;
  }
  function p0(t, l) {
    switch (t.tag) {
      case 5:
      case 26:
        try {
          var e = t.stateNode;
          if (l) {
            var n = e.style;
            typeof n.setProperty == "function" ? n.setProperty("display", "none", "important") : n.display = "none";
          } else {
            var a = t.stateNode, i = t.memoizedProps.style, s = i != null && i.hasOwnProperty("display") ? i.display : null;
            a.style.display = s == null || typeof s == "boolean" ? "" : ("" + s).trim();
          }
        } catch (g) {
          Nt(t, t.return, g);
        }
        Dc(t, l);
        break;
      case 6:
        try {
          t.stateNode.nodeValue = l ? "" : t.memoizedProps, bt = !0;
        } catch (g) {
          Nt(t, t.return, g);
        }
        break;
      case 18:
        try {
          var h = t.stateNode;
          l ? E1(h, !0) : E1(t.stateNode, !1);
        } catch (g) {
          Nt(t, t.return, g);
        }
        break;
      case 22:
      case 23:
        t.memoizedState === null && Cc(t, l);
        break;
      default:
        Cc(t, l);
    }
  }
  function Dc(t, l) {
    if (t.subtreeFlags & 67108864)
      for (t = t.child; t !== null; ) {
        t: {
          var e = t, n = l;
          switch (e.tag) {
            case 4:
              p0(e, n);
              break t;
            case 22:
              e.memoizedState === null && Dc(e, n);
              break t;
            default:
              Dc(e, n);
          }
        }
        t = t.sibling;
      }
  }
  function N0(t) {
    var l = t.alternate;
    l !== null && (t.alternate = null, N0(l)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (l = t.stateNode, l !== null && mu(l)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var qt = null, ol = !1;
  function Gl(t, l, e) {
    for (e = e.child; e !== null; )
      C0(t, l, e), e = e.sibling;
  }
  function C0(t, l, e) {
    if (ml && typeof ml.onCommitFiberUnmount == "function")
      try {
        ml.onCommitFiberUnmount(ha, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        Mt || ll(e, l), Gl(
          t,
          l,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && !Mt && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        Mt || ll(e, l), Qa(e);
        var n = qt, a = ol;
        Ve(e.type) && (qt = e.stateNode, ol = !1), Gl(
          t,
          l,
          e
        ), U1(
          e.stateNode,
          e.type,
          e.memoizedProps
        ), qt = n, ol = a;
        break;
      case 5:
        Mt || ll(e, l), Qa(e);
      case 6:
        if (e.tag === 6 && Qa(e), n = qt, a = ol, qt = null, Gl(
          t,
          l,
          e
        ), qt = n, ol = a, qt !== null)
          if (ol)
            try {
              (qt.nodeType === 9 ? qt.body : qt.nodeName === "HTML" ? qt.ownerDocument.body : qt).removeChild(e.stateNode), bt = !0;
            } catch (i) {
              Nt(
                e,
                l,
                i
              );
            }
          else
            try {
              qt.removeChild(e.stateNode), bt = !0;
            } catch (i) {
              Nt(
                e,
                l,
                i
              );
            }
        break;
      case 18:
        qt !== null && (ol ? (t = qt, S1(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          e.stateNode
        ), ca(t)) : S1(qt, e.stateNode));
        break;
      case 4:
        n = qt, a = ol, qt = e.stateNode.containerInfo, ol = !0, Gl(
          t,
          l,
          e
        ), qt = n, ol = a;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        qe(2, e, l), Mt || qe(4, e, l), Gl(
          t,
          l,
          e
        );
        break;
      case 1:
        Mt || (ll(e, l), n = e.stateNode, typeof n.componentWillUnmount == "function" && g0(
          e,
          l,
          n
        )), Gl(
          t,
          l,
          e
        );
        break;
      case 21:
        Gl(
          t,
          l,
          e
        );
        break;
      case 22:
        Mt = (n = Mt) || e.memoizedState !== null, Gl(
          t,
          l,
          e
        ), Mt = n;
        break;
      case 30:
        ll(e, l), Gl(
          t,
          l,
          e
        );
        break;
      case 7:
        Mt || ll(e, l), Gl(
          t,
          l,
          e
        );
        break;
      default:
        Gl(
          t,
          l,
          e
        );
    }
  }
  function D0(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        ca(t);
      } catch (e) {
        Nt(l, l.return, e);
      }
    }
  }
  function x0(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        ca(t);
      } catch (e) {
        Nt(l, l.return, e);
      }
  }
  function dv(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var l = t.stateNode;
        return l === null && (l = t.stateNode = new O0()), l;
      case 22:
        return t = t.stateNode, l = t._retryCache, l === null && (l = t._retryCache = new O0()), l;
      default:
        throw Error(r(435, t.tag));
    }
  }
  function oi(t, l) {
    var e = dv(t);
    l.forEach(function(n) {
      if (!e.has(n)) {
        e.add(n);
        var a = Ov.bind(null, t, n);
        n.then(a, a);
      }
    });
  }
  function fl(t, l, e) {
    var n = l.deletions;
    if (n !== null)
      for (var a = 0; a < n.length; a++) {
        var i = n[a], s = t, h = l, g = h;
        t: for (; g !== null; ) {
          switch (g.tag) {
            case 27:
              if (Ve(g.type)) {
                qt = g.stateNode, ol = !1;
                break t;
              }
              break;
            case 5:
              qt = g.stateNode, ol = !1;
              break t;
            case 3:
            case 4:
              qt = g.stateNode.containerInfo, ol = !0;
              break t;
          }
          g = g.return;
        }
        if (qt === null) throw Error(r(160));
        C0(s, h, i), qt = null, ol = !1, s = i.alternate, s !== null && (s.return = null), i.return = null;
      }
    if (l.subtreeFlags & 13886)
      for (l = l.child; l !== null; )
        R0(l, t, e), l = l.sibling;
  }
  var Xl = null;
  function R0(t, l, e) {
    var n = t.alternate, a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (a & 4 && (n = t.updateQueue, n = n !== null ? n.events : null, n !== null))
          for (var i = 0; i < n.length; i++) {
            var s = n[i];
            s.ref.impl = s.nextImpl;
          }
        fl(l, t, e), cl(t), a & 4 && (qe(3, t, t.return), La(3, t), qe(5, t, t.return));
        break;
      case 1:
        fl(l, t, e), cl(t), a & 512 && (Mt || n === null || ll(n, n.return)), a & 64 && Ft && (t = t.updateQueue, t !== null && (l = t.callbacks, l !== null && (e = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = e === null ? l : e.concat(l))));
        break;
      case 26:
        if (i = Xl, fl(l, t, e), cl(t), a & 512 && (Mt || n === null || ll(n, n.return)), a & 4)
          if (a = n !== null ? n.memoizedState : null, e = t.memoizedState, n === null)
            if (e === null)
              if (t.stateNode === null)
                if (Ft)
                  t.stateNode = g1(
                    t.type,
                    t.memoizedProps,
                    l.containerInfo,
                    t
                  );
                else {
                  t: {
                    l = t.type, e = t.memoizedProps, a = i.ownerDocument || i;
                    l: switch (l) {
                      case "title":
                        n = a.getElementsByTagName("title")[0], (!n || n[va] || n[It] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = a.createElement(l), a.head.insertBefore(
                          n,
                          a.querySelector("head > title")
                        )), el(n, l, e), n[It] = t, Kt(n), l = n;
                        break t;
                      case "link":
                        if (i = X1(
                          "link",
                          "href",
                          a
                        ).get(l + (e.href || ""))) {
                          for (s = 0; s < i.length; s++)
                            if (n = i[s], n.getAttribute("href") === (e.href == null || e.href === "" ? null : e.href) && n.getAttribute("rel") === (e.rel == null ? null : e.rel) && n.getAttribute("title") === (e.title == null ? null : e.title) && n.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                              i.splice(s, 1);
                              break l;
                            }
                        }
                        n = a.createElement(l), el(n, l, e), a.head.appendChild(n);
                        break;
                      case "meta":
                        if (i = X1(
                          "meta",
                          "content",
                          a
                        ).get(l + (e.content || ""))) {
                          for (s = 0; s < i.length; s++)
                            if (n = i[s], n.getAttribute("content") === (e.content == null ? null : "" + e.content) && n.getAttribute("name") === (e.name == null ? null : e.name) && n.getAttribute("property") === (e.property == null ? null : e.property) && n.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && n.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                              i.splice(s, 1);
                              break l;
                            }
                        }
                        n = a.createElement(l), el(n, l, e), a.head.appendChild(n);
                        break;
                      default:
                        throw Error(r(468, l));
                    }
                    n[It] = t, Kt(n), l = n;
                  }
                  t.stateNode = l;
                }
              else
                Ft || vs(i, t.type, t.stateNode);
            else
              t.stateNode = G1(
                i,
                e,
                t.memoizedProps
              );
          else
            a !== e ? (a === null ? (l = n.stateNode, l === null || Mt || l.parentNode.removeChild(l)) : a.count--, e === null ? Ft || vs(i, t.type, t.stateNode) : G1(i, e, t.memoizedProps)) : e === null && t.stateNode !== null && Ec(
              t,
              t.memoizedProps,
              n.memoizedProps
            );
        break;
      case 27:
        fl(l, t, e), cl(t), a & 512 && (Mt || n === null || ll(n, n.return)), n !== null && a & 4 && Ec(
          t,
          t.memoizedProps,
          n.memoizedProps
        );
        break;
      case 5:
        if (i = Pl, Pl = !1, fl(l, t, e), Pl = i, cl(t), a & 512 && (Mt || n === null || ll(n, n.return)), t.flags & 32) {
          l = t.stateNode;
          try {
            On(l, ""), bt = !0;
          } catch (p) {
            Nt(t, t.return, p);
          }
        }
        a & 4 && t.stateNode != null && (l = t.memoizedProps, Ec(
          t,
          l,
          n !== null ? n.memoizedProps : l
        )), a & 1024 && (pc = !0);
        break;
      case 6:
        if (fl(l, t, e), cl(t), a & 4) {
          if (t.stateNode === null)
            throw Error(r(162));
          l = t.memoizedProps, e = t.stateNode;
          try {
            e.nodeValue = l, bt = !0;
          } catch (p) {
            Nt(t, t.return, p);
          }
        }
        break;
      case 3:
        if (bt = !1, pi = null, i = Xl, Xl = Ia(l.containerInfo), fl(l, t, e), Xl = i, cl(t), a & 4 && n !== null && n.memoizedState.isDehydrated)
          try {
            ca(l.containerInfo);
          } catch (p) {
            Nt(t, t.return, p);
          }
        pc && (pc = !1, U0(t)), bt = !1;
        break;
      case 4:
        a = Pl, Pl = Ft, n = Ps(), i = Xl, Xl = Ia(
          t.stateNode.containerInfo
        ), fl(l, t, e), cl(t), Xl = i, bt && Va && (ri = !0), bt = n, Pl = a;
        break;
      case 12:
        fl(l, t, e), cl(t);
        break;
      case 31:
        fl(l, t, e), cl(t), a & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, oi(t, l)));
        break;
      case 13:
        fl(l, t, e), cl(t), t.child.flags & 8192 && t.memoizedState !== null != (n !== null && n.memoizedState !== null) && (gi = gl()), a & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, oi(t, l)));
        break;
      case 22:
        i = t.memoizedState !== null, s = n !== null && n.memoizedState !== null;
        var h = Ft, g = Mt, z = Pl;
        Ft = h || i, Pl = z || i, Mt = g || s, fl(l, t, e), Mt = g, Pl = z, Ft = h, cl(t), a & 8192 && (l = t.stateNode, l._visibility = i ? l._visibility & -2 : l._visibility | 1, !i || n === null || s || Ft || Mt || (l = s || Mt, e = Ft, n = Mt, Ft = i || Ft, Mt = l, Be(t, 2), Ft = e, Mt = n), !i && Pl || Cc(t, i)), a & 4 && (l = t.updateQueue, l !== null && (e = l.retryQueue, e !== null && (l.retryQueue = null, oi(t, e))));
        break;
      case 19:
        fl(l, t, e), cl(t), a & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, oi(t, l)));
        break;
      case 30:
        a & 512 && (Mt || n === null || ll(n, n.return)), a = Ps(), i = Va, s = (e & 335544064) === e, h = t.memoizedProps, Va = s && ce(
          h.default,
          h.update
        ) !== "none", fl(l, t, e), cl(t), s && n !== null && bt && (t.flags |= 4), Va = i, bt = a;
        break;
      case 21:
        break;
      case 7:
        a & 512 && (Mt || n === null || ll(n, n.return)), n && n.stateNode !== null && (n.stateNode._fragmentFiber = t);
      default:
        fl(l, t, e), cl(t);
    }
  }
  function cl(t) {
    var l = t.flags;
    if (l & 2) {
      try {
        for (var e, n = t.return; n !== null; ) {
          if (y0(n)) {
            e = n;
            break;
          }
          n = n.return;
        }
        n = null;
        for (var a = t.return; a !== null; ) {
          if (yc(a)) {
            var i = a.stateNode;
            n === null ? n = [i] : n.push(i);
          }
          if (mc(a)) break;
          a = a.return;
        }
        var s = n;
        if (e == null) throw Error(r(160));
        switch (e.tag) {
          case 27:
            var h = e.stateNode, g = Tc(t);
            ii(
              t,
              g,
              h,
              s
            );
            break;
          case 5:
            var z = e.stateNode;
            e.flags & 32 && (On(z, ""), e.flags &= -33);
            var p = Tc(t);
            ii(
              t,
              p,
              z,
              s
            );
            break;
          case 3:
          case 4:
            var x = e.stateNode.containerInfo, b = Tc(t);
            bc(
              t,
              b,
              x,
              s
            );
            break;
          default:
            throw Error(r(161));
        }
      } catch (M) {
        Nt(t, t.return, M);
      }
      t.flags &= -3;
    }
    l & 4096 && (t.flags &= -4097);
  }
  function U0(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var l = t;
        U0(l), l.tag === 5 && l.flags & 1024 && (l = l.stateNode, fa = !0, l.reset(), fa = !1), t = t.sibling;
      }
  }
  function Zn(t, l) {
    if (l.subtreeFlags & 9270)
      for (l = l.child; l !== null; )
        H0(l, t), l = l.sibling;
    else A0(l);
  }
  function H0(t, l) {
    var e = t.alternate;
    if (e === null) _c(t, !1);
    else
      switch (t.tag) {
        case 3:
          if (Nc = te = !1, T0(), Zn(l, t), !te && !ri) {
            if (t = Il, t !== null)
              for (var n = 0; n < t.length; n += 3) {
                e = t[n];
                var a = t[n + 1];
                b1(e, t[n + 2]), e = e.ownerDocument.documentElement, e !== null && e.animate(
                  { opacity: [0, 0], pointerEvents: ["none", "none"] },
                  {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition-group(" + a + ")"
                  }
                );
              }
            t = l.containerInfo, t = t.nodeType === 9 ? t.documentElement : t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "" && (t.style.viewTransitionName = "none", t.animate(
              { opacity: [0, 0], pointerEvents: ["none", "none"] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition-group(root)"
              }
            ), t.animate(
              { width: [0, 0], height: [0, 0] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition"
              }
            )), Nc = !0;
          }
          Il = null;
          break;
        case 5:
          Zn(l, t);
          break;
        case 4:
          n = te, te = !1, Zn(l, t), te && (ri = !0), te = n;
          break;
        case 22:
          t.memoizedState === null && (e.memoizedState !== null ? _c(t, !1) : Zn(l, t));
          break;
        case 30:
          n = te, a = T0(), te = !1, Zn(l, t), te && (t.flags |= 4);
          var i = t.memoizedProps, s = t.stateNode;
          l = fe(i, s), s = fe(e.memoizedProps, s);
          var h = ce(i.default, i.update);
          h === "none" ? l = !1 : (i = e.memoizedState, e.memoizedState = null, e = t.child, hl = 0, l = Mc(
            t,
            e,
            l,
            s,
            h,
            i,
            !0
          ), hl !== (i === null ? 0 : i.length) && (t.flags |= 32)), (t.flags & 4) !== 0 && l ? (In(
            t,
            t.memoizedProps.onUpdate
          ), Il = a) : a !== null && (a.push.apply(a, Il), Il = a), te = (t.flags & 32) !== 0 ? !0 : n;
          break;
        default:
          Zn(l, t);
      }
  }
  function le(t, l) {
    if (l.subtreeFlags & 8772)
      for (l = l.child; l !== null; )
        M0(t, l.alternate, l), l = l.sibling;
  }
  function Be(t, l) {
    for (t = t.child; t !== null; ) {
      var e = t, n = l;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          qe(4, e, e.return), Be(
            e,
            n
          );
          break;
        case 1:
          ll(e, e.return);
          var a = e.stateNode;
          typeof a.componentWillUnmount == "function" && g0(
            e,
            e.return,
            a
          ), Be(
            e,
            n
          );
          break;
        case 27:
          (n & 2) !== 0 && U1(
            e.stateNode,
            e.type,
            e.memoizedProps
          );
        case 5:
          ll(e, e.return), e.tag !== 5 && e.tag !== 27 || Qa(e), Be(
            e,
            n
          );
          break;
        case 6:
          Qa(e);
          break;
        case 26:
          ll(e, e.return), a = e.stateNode, e.memoizedState !== null || a === null || Mt || a.parentNode.removeChild(a), Be(
            e,
            n
          );
          break;
        case 22:
          e.memoizedState === null && Be(
            e,
            n
          );
          break;
        case 30:
          ll(e, e.return), Be(
            e,
            n
          );
          break;
        case 7:
          ll(e, e.return);
        default:
          Be(
            e,
            n
          );
      }
      t = t.sibling;
    }
  }
  function Ll(t, l, e) {
    for (e = (l.subtreeFlags & 8772) !== 0 ? e : e & -2, l = l.child; l !== null; ) {
      var n = l.alternate, a = t, i = l, s = i.flags, h = (e & 1) !== 0;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Ll(
            a,
            i,
            e
          ), La(4, i);
          break;
        case 1:
          if (Ll(
            a,
            i,
            e
          ), n = i, a = n.stateNode, typeof a.componentDidMount == "function")
            try {
              a.componentDidMount();
            } catch (p) {
              Nt(n, n.return, p);
            }
          if (n = i, a = n.updateQueue, a !== null) {
            var g = n.stateNode;
            try {
              var z = a.shared.hiddenCallbacks;
              if (z !== null)
                for (a.shared.hiddenCallbacks = null, a = 0; a < z.length; a++)
                  eh(z[a], g);
            } catch (p) {
              Nt(n, n.return, p);
            }
          }
          h && s & 64 && v0(i), Wl(i, i.return);
          break;
        case 27:
          (e & 2) !== 0 && S0(i);
        case 5:
          i.tag !== 5 && i.tag !== 27 || m0(i), Ll(
            a,
            i,
            e
          ), h && n === null && s & 4 && Sc(i), Wl(i, i.return);
          break;
        case 6:
          m0(i);
          break;
        case 26:
          g = i.stateNode, i.memoizedState !== null || g === null || Ft || vs(
            Ia(g.ownerDocument),
            i.type,
            g
          ), Ll(
            a,
            i,
            e
          ), h && n === null && s & 4 && Sc(i), Wl(i, i.return);
          break;
        case 12:
          Ll(
            a,
            i,
            e
          );
          break;
        case 31:
          Ll(
            a,
            i,
            e
          ), h && s & 4 && D0(a, i);
          break;
        case 13:
          Ll(
            a,
            i,
            e
          ), h && s & 4 && x0(a, i);
          break;
        case 22:
          i.memoizedState === null && Ll(
            a,
            i,
            e
          ), Wl(i, i.return);
          break;
        case 30:
          Ll(
            a,
            i,
            e
          ), Wl(i, i.return);
          break;
        case 7:
          Wl(i, i.return);
        default:
          Ll(
            a,
            i,
            e
          );
      }
      l = l.sibling;
    }
  }
  function xc(t, l) {
    var e = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), t = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (t = l.memoizedState.cachePool.pool), t !== e && (t != null && t.refCount++, e != null && pa(e));
  }
  function Rc(t, l) {
    t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && pa(t));
  }
  function Ul(t, l, e, n) {
    var a = (e & 335544064) === e;
    if (l.subtreeFlags & (a ? 10262 : 10256))
      for (l = l.child; l !== null; )
        q0(
          t,
          l,
          e,
          n
        ), l = l.sibling;
    else a && z0(l);
  }
  function q0(t, l, e, n) {
    var a = (e & 335544064) === e;
    a && l.alternate === null && l.return !== null && l.return.alternate !== null && si(l);
    var i = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Ul(
          t,
          l,
          e,
          n
        ), i & 2048 && La(9, l);
        break;
      case 1:
        Ul(
          t,
          l,
          e,
          n
        );
        break;
      case 3:
        Ul(
          t,
          l,
          e,
          n
        ), a && Nc && (t = t.containerInfo, t = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, t.style.viewTransitionName === "root" && (t.style.viewTransitionName = ""), t = t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "none" && (t.style.viewTransitionName = "")), i & 2048 && (i = null, l.alternate !== null && (i = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== i && (l.refCount++, i != null && pa(i)));
        break;
      case 12:
        if (i & 2048) {
          Ul(
            t,
            l,
            e,
            n
          ), i = l.stateNode;
          try {
            var s = l.memoizedProps, h = s.id, g = s.onPostCommit;
            typeof g == "function" && g(
              h,
              l.alternate === null ? "mount" : "update",
              i.passiveEffectDuration,
              -0
            );
          } catch (z) {
            Nt(l, l.return, z);
          }
        } else
          Ul(
            t,
            l,
            e,
            n
          );
        break;
      case 31:
        Ul(
          t,
          l,
          e,
          n
        );
        break;
      case 13:
        Ul(
          t,
          l,
          e,
          n
        );
        break;
      case 23:
        break;
      case 22:
        s = l.stateNode, h = l.alternate, l.memoizedState !== null ? (a && h !== null && h.memoizedState === null && si(h), s._visibility & 2 ? Ul(
          t,
          l,
          e,
          n
        ) : ja(
          t,
          l
        )) : (a && h !== null && h.memoizedState !== null && si(l), s._visibility & 2 ? Ul(
          t,
          l,
          e,
          n
        ) : (s._visibility |= 2, wn(
          t,
          l,
          e,
          n,
          (l.subtreeFlags & 10256) !== 0 || !1
        ))), i & 2048 && xc(h, l);
        break;
      case 24:
        Ul(
          t,
          l,
          e,
          n
        ), i & 2048 && Rc(l.alternate, l);
        break;
      case 30:
        a && (i = l.alternate, i !== null && (kl(i.child, !0), kl(l.child, !0))), Ul(
          t,
          l,
          e,
          n
        );
        break;
      default:
        Ul(
          t,
          l,
          e,
          n
        );
    }
  }
  function wn(t, l, e, n, a) {
    for (a = a && ((l.subtreeFlags & 10256) !== 0 || !1), l = l.child; l !== null; ) {
      var i = t, s = l, h = e, g = n, z = s.flags;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          wn(
            i,
            s,
            h,
            g,
            a
          ), La(8, s);
          break;
        case 23:
          break;
        case 22:
          var p = s.stateNode;
          s.memoizedState !== null ? p._visibility & 2 ? wn(
            i,
            s,
            h,
            g,
            a
          ) : ja(
            i,
            s
          ) : (p._visibility |= 2, wn(
            i,
            s,
            h,
            g,
            a
          )), a && z & 2048 && xc(
            s.alternate,
            s
          );
          break;
        case 24:
          wn(
            i,
            s,
            h,
            g,
            a
          ), a && z & 2048 && Rc(s.alternate, s);
          break;
        default:
          wn(
            i,
            s,
            h,
            g,
            a
          );
      }
      l = l.sibling;
    }
  }
  function ja(t, l) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) {
        var e = t, n = l, a = n.flags;
        switch (n.tag) {
          case 22:
            ja(e, n), a & 2048 && xc(
              n.alternate,
              n
            );
            break;
          case 24:
            ja(e, n), a & 2048 && Rc(n.alternate, n);
            break;
          default:
            ja(e, n);
        }
        l = l.sibling;
      }
  }
  var dn = 8192;
  function vn(t, l, e) {
    if (t.subtreeFlags & dn)
      for (t = t.child; t !== null; )
        B0(
          t,
          l,
          e
        ), t = t.sibling;
  }
  function B0(t, l, e) {
    switch (t.tag) {
      case 26:
        vn(
          t,
          l,
          e
        ), t.flags & dn && (t.memoizedState !== null ? Eg(
          e,
          Xl,
          t.memoizedState,
          t.memoizedProps
        ) : (t = t.stateNode, (l & 335544128) === l && j1(e, t)));
        break;
      case 5:
        vn(
          t,
          l,
          e
        ), t.flags & dn && (t = t.stateNode, (l & 335544128) === l && j1(e, t));
        break;
      case 3:
      case 4:
        var n = Xl;
        Xl = Ia(t.stateNode.containerInfo), vn(
          t,
          l,
          e
        ), Xl = n;
        break;
      case 22:
        t.memoizedState === null && (n = t.alternate, n !== null && n.memoizedState !== null ? (n = dn, dn = 16777216, vn(
          t,
          l,
          e
        ), dn = n) : vn(
          t,
          l,
          e
        ));
        break;
      case 30:
        if ((t.flags & dn) !== 0 && (n = t.memoizedProps.name, n != null && n !== "auto")) {
          var a = t.stateNode;
          a.paired = null, bl === null && (bl = /* @__PURE__ */ new Map()), bl.set(n, a);
        }
        vn(
          t,
          l,
          e
        );
        break;
      default:
        vn(
          t,
          l,
          e
        );
    }
  }
  function Y0(t) {
    var l = t.alternate;
    if (l !== null && (t = l.child, t !== null)) {
      l.child = null;
      do
        l = t.sibling, t.sibling = null, t = l;
      while (t !== null);
    }
  }
  function Za(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var n = l[e];
          $t = n, X0(
            n,
            t
          );
        }
      Y0(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        G0(t), t = t.sibling;
  }
  function G0(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Za(t), t.flags & 2048 && qe(9, t, t.return);
        break;
      case 3:
        Za(t);
        break;
      case 12:
        Za(t);
        break;
      case 22:
        var l = t.stateNode;
        t.memoizedState !== null && l._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (l._visibility &= -3, di(t)) : Za(t);
        break;
      default:
        Za(t);
    }
  }
  function di(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var n = l[e];
          $t = n, X0(
            n,
            t
          );
        }
      Y0(t);
    }
    for (t = t.child; t !== null; ) {
      switch (l = t, l.tag) {
        case 0:
        case 11:
        case 15:
          qe(8, l, l.return), di(l);
          break;
        case 22:
          e = l.stateNode, e._visibility & 2 && (e._visibility &= -3, di(l));
          break;
        default:
          di(l);
      }
      t = t.sibling;
    }
  }
  function X0(t, l) {
    for (; $t !== null; ) {
      var e = $t;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          qe(8, e, l);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var n = e.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          pa(e.memoizedState.cache);
      }
      if (n = e.child, n !== null) n.return = e, $t = n;
      else
        t: for (e = t; $t !== null; ) {
          n = $t;
          var a = n.sibling, i = n.return;
          if (N0(n), n === e) {
            $t = null;
            break t;
          }
          if (a !== null) {
            a.return = i, $t = a;
            break t;
          }
          $t = i;
        }
    }
  }
  var vv = {
    getCacheForType: function(t) {
      var l = kt(Lt), e = l.data.get(t);
      return e === void 0 && (e = t(), l.data.set(t, e)), e;
    },
    cacheSignal: function() {
      return kt(Lt).controller.signal;
    }
  }, gv = typeof WeakMap == "function" ? WeakMap : Map, Ot = 0, xt = null, ht = null, gt = 0, pt = 0, _l = null, Ye = !1, Kn = !1, Uc = !1, ye = 0, Gt = 0, Ge = 0, gn = 0, vi = 0, zl = 0, Jn = 0, wa = null, dl = null, Hc = !1, gi = 0, L0 = 0, mi = 1 / 0, yi = null, Xe = null, Bt = 0, Ql = null, mn = null, ee = 0, qc = 0, Bc = null, Q0 = null, Fn = null, $n = null, Wn = null, Ka = 0, Si = null;
  function Al() {
    return (Ot & 2) !== 0 && gt !== 0 ? gt & -gt : w.T !== null ? Kc() : Zs();
  }
  function V0() {
    if (zl === 0)
      if ((gt & 536870912) === 0 || st) {
        var t = ou;
        ou <<= 1, (ou & 3932160) === 0 && (ou = 262144), zl = t;
      } else zl = 536870912;
    return t = Pt.current, t !== null && (t.flags |= 32), zl;
  }
  function In(t, l) {
    if (l != null) {
      var e = t.stateNode, n = e.ref;
      n === null && (n = e.ref = _1(
        fe(t.memoizedProps, e)
      )), $n === null && ($n = []), $n.push(l.bind(null, n));
    }
  }
  function vl(t, l, e) {
    (t === xt && (pt === 2 || pt === 9) || t.cancelPendingCommit !== null) && (kn(t, 0), Le(
      t,
      gt,
      zl,
      !1
    )), da(t, e), ((Ot & 2) === 0 || t !== xt) && (t === xt && ((Ot & 2) === 0 && (gn |= e), Gt === 4 && Le(
      t,
      gt,
      zl,
      !1
    )), ne(t));
  }
  function j0(t, l, e) {
    if ((Ot & 6) !== 0) throw Error(r(327));
    var n = !e && (l & 127) === 0 && (l & t.expiredLanes) === 0 || oa(t, l), a = n ? Sv(t, l) : Gc(t, l, !0), i = n;
    do {
      if (a === 0) {
        Kn && !n && Le(t, l, 0, !1);
        break;
      } else {
        if (e = t.current.alternate, i && !mv(e)) {
          a = Gc(t, l, !1), i = !1;
          continue;
        }
        if (a === 2) {
          if (i = l, t.errorRecoveryDisabledLanes & i)
            var s = 0;
          else
            s = t.pendingLanes & -536870913, s = s !== 0 ? s : s & 536870912 ? 536870912 : 0;
          if (s !== 0) {
            l = s;
            t: {
              var h = t;
              a = wa;
              var g = h.current.memoizedState.isDehydrated;
              if (g && (kn(h, s).flags |= 256), s = Gc(
                h,
                s,
                !1
              ), s !== 2 && s !== 6) {
                if (Uc && !g) {
                  h.errorRecoveryDisabledLanes |= i, gn |= i, a = 4;
                  break t;
                }
                i = dl, dl = a, i !== null && (dl === null ? dl = i : dl.push.apply(
                  dl,
                  i
                ));
              }
              a = s;
            }
            if (i = !1, a !== 2) continue;
          }
        }
        if (a === 1) {
          kn(t, 0), Le(t, l, 0, !0);
          break;
        }
        t: {
          switch (n = t, i = a, i) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((l & 4194048) !== l && (l & 62914560) !== l)
                break;
            case 6:
              Le(
                n,
                l,
                zl,
                !Ye
              );
              break t;
            case 2:
              dl = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((l & 62914560) === l && (a = gi + 300 - gl(), 10 < a)) {
            if (Le(
              n,
              l,
              zl,
              !Ye
            ), vu(n, 0, !0) !== 0) break t;
            ee = l, n.timeoutHandle = ns(
              Z0.bind(
                null,
                n,
                e,
                dl,
                yi,
                Hc,
                l,
                zl,
                gn,
                Jn,
                Ye,
                i,
                "Throttled",
                -0,
                0
              ),
              a
            );
            break t;
          }
          Z0(
            n,
            e,
            dl,
            yi,
            Hc,
            l,
            zl,
            gn,
            Jn,
            Ye,
            i,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    ne(t);
  }
  function Z0(t, l, e, n, a, i, s, h, g, z, p, x, b, M) {
    t.timeoutHandle = -1;
    var Y = l.subtreeFlags, Z = (i & 335544064) === i;
    if (x = null, (Z || Y & 8192 || (Y & 16785408) === 16785408) && (x = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: Jl
    }, bl = null, B0(
      l,
      i,
      x
    ), Z && (Y = x, Z = t.containerInfo, Z = (Z.nodeType === 9 ? Z : Z.ownerDocument).__reactViewTransition, Z != null && (Y.count++, Y.waitingForViewTransition = !0, Y = tu.bind(Y), Z.finished.then(Y, Y))), Y = (i & 62914560) === i ? gi - gl() : (i & 4194048) === i ? L0 - gl() : 0, Y = Tg(
      x,
      Y
    ), Y !== null)) {
      ee = i, t.cancelPendingCommit = Y(
        k0.bind(
          null,
          t,
          l,
          i,
          e,
          n,
          a,
          s,
          h,
          g,
          z,
          p,
          x,
          null,
          b,
          M
        )
      ), Le(t, i, s, !z);
      return;
    }
    k0(
      t,
      l,
      i,
      e,
      n,
      a,
      s,
      h,
      g,
      z,
      p,
      x
    );
  }
  function mv(t) {
    for (var l = t; ; ) {
      var e = l.tag;
      if ((e === 0 || e === 11 || e === 15) && l.flags & 16384 && (e = l.updateQueue, e !== null && (e = e.stores, e !== null)))
        for (var n = 0; n < e.length; n++) {
          var a = e[n], i = a.getSnapshot;
          a = a.value;
          try {
            if (!El(i(), a)) return !1;
          } catch {
            return !1;
          }
        }
      if (e = l.child, l.subtreeFlags & 16384 && e !== null)
        e.return = l, l = e;
      else {
        if (l === t) break;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t) return !0;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    }
    return !0;
  }
  function Le(t, l, e, n) {
    l = Xs(t, l), l &= ~vi, l &= ~gn, t.suspendedLanes |= l, t.pingedLanes &= ~l, n && (t.warmLanes |= l), n = t.expirationTimes;
    for (var a = l; 0 < a; ) {
      var i = 31 - yl(a), s = 1 << i;
      n[i] = -1, a &= ~s;
    }
    e !== 0 && Qs(t, e, l);
  }
  function Ei() {
    return (Ot & 6) === 0 ? (Ja(0), !1) : !0;
  }
  function Yc() {
    if (ht !== null) {
      if (pt === 0)
        var t = ht.return;
      else
        t = ht, he = en = null, wf(t), Gn = null, Da = 0, t = ht;
      for (; t !== null; )
        d0(t.alternate, t), t = t.return;
      ht = null;
    }
  }
  function kn(t, l) {
    var e = t.timeoutHandle;
    return e !== -1 && (t.timeoutHandle = -1, Lv(e)), e = t.cancelPendingCommit, e !== null && (t.cancelPendingCommit = null, e()), ee = 0, Yc(), xt = t, ht = e = se(t.current, null), gt = l, pt = 0, _l = null, Ye = !1, Kn = oa(t, l), Uc = !1, Jn = zl = vi = gn = Ge = Gt = 0, dl = wa = null, Hc = !1, ye = Xs(t, l), pu(), e;
  }
  function w0(t, l) {
    ut = null, w.H = ku, l === Yn || l === Gu ? (l = kr(), pt = 3) : l === Rf ? (l = kr(), pt = 4) : pt = l === ic ? 8 : l !== null && typeof l == "object" && typeof l.then == "function" ? 6 : 1, _l = l, ht === null && (Gt = 1, Pu(
      t,
      Cl(l, t.current)
    ));
  }
  function K0() {
    var t = Pt.current;
    return t === null ? !0 : (gt & 4194048) === gt ? al === null : (gt & 62914560) === gt || (gt & 536870912) !== 0 ? t === al : !1;
  }
  function J0() {
    var t = w.H;
    return w.H = ku, t === null ? ku : t;
  }
  function F0() {
    var t = w.A;
    return w.A = vv, t;
  }
  function Ti() {
    Gt = 4, Ye || (gt & 4194048) !== gt && Pt.current !== null || (Kn = !0), (Ge & 134217727) === 0 && (gn & 134217727) === 0 || xt === null || Le(
      xt,
      gt,
      zl,
      !1
    );
  }
  function Gc(t, l, e) {
    var n = Ot;
    Ot |= 2;
    var a = J0(), i = F0();
    (xt !== t || gt !== l) && (yi = null, kn(t, l)), l = !1;
    var s = Gt;
    t: do
      try {
        if (pt !== 0 && ht !== null) {
          var h = ht, g = _l;
          switch (pt) {
            case 8:
              Yc(), s = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Pt.current === null && (l = !0);
              var z = pt;
              if (pt = 0, _l = null, Pn(t, h, g, z), e && Kn) {
                s = 0;
                break t;
              }
              break;
            default:
              z = pt, pt = 0, _l = null, Pn(t, h, g, z);
          }
        }
        yv(), s = Gt;
        break;
      } catch (p) {
        w0(t, p);
      }
    while (!0);
    return l && t.shellSuspendCounter++, he = en = null, Ot = n, w.H = a, w.A = i, ht === null && (xt = null, gt = 0, pu()), s;
  }
  function yv() {
    for (; ht !== null; ) $0(ht);
  }
  function Sv(t, l) {
    var e = Ot;
    Ot |= 2;
    var n = J0(), a = F0();
    xt !== t || gt !== l ? (yi = null, mi = gl() + 500, kn(t, l)) : Kn = oa(
      t,
      l
    );
    t: do
      try {
        if (pt !== 0 && ht !== null) {
          l = ht;
          var i = _l;
          l: switch (pt) {
            case 1:
              pt = 0, _l = null, Pn(t, l, i, 1);
              break;
            case 2:
            case 9:
              if (Wr(i)) {
                pt = 0, _l = null, W0(l);
                break;
              }
              l = function() {
                pt !== 2 && pt !== 9 || xt !== t || (pt = 7), ne(t);
              }, i.then(l, l);
              break t;
            case 3:
              pt = 7;
              break t;
            case 4:
              pt = 5;
              break t;
            case 7:
              Wr(i) ? (pt = 0, _l = null, W0(l)) : (pt = 0, _l = null, Pn(t, l, i, 7));
              break;
            case 5:
              var s = null;
              switch (ht.tag) {
                case 26:
                  s = ht.memoizedState;
                case 5:
                case 27:
                  var h = ht;
                  if (s ? Q1(s) : h.stateNode.complete) {
                    pt = 0, _l = null;
                    var g = h.sibling;
                    if (g !== null) ht = g;
                    else {
                      var z = h.return;
                      z !== null ? (ht = z, bi(z)) : ht = null;
                    }
                    break l;
                  }
              }
              pt = 0, _l = null, Pn(t, l, i, 5);
              break;
            case 6:
              pt = 0, _l = null, Pn(t, l, i, 6);
              break;
            case 8:
              Yc(), Gt = 6;
              break t;
            default:
              throw Error(r(462));
          }
        }
        Ev();
        break;
      } catch (p) {
        w0(t, p);
      }
    while (!0);
    return he = en = null, w.H = n, w.A = a, Ot = e, ht !== null ? 0 : (xt = null, gt = 0, pu(), Gt);
  }
  function Ev() {
    for (; ht !== null && !Bo(); )
      $0(ht);
  }
  function $0(t) {
    var l = h0(t.alternate, t, ye);
    t.memoizedProps = t.pendingProps, l === null ? bi(t) : ht = l;
  }
  function W0(t) {
    var l = t, e = l.alternate;
    switch (l.tag) {
      case 15:
      case 0:
        l = a0(
          e,
          l,
          l.pendingProps,
          l.type,
          void 0,
          gt
        );
        break;
      case 11:
        l = a0(
          e,
          l,
          l.pendingProps,
          l.type.render,
          l.ref,
          gt
        );
        break;
      case 5:
        wf(l);
        var n = l;
        n === Jt && (st ? (Uu(n), n.tag === 5 && n.stateNode != null && (Ut = n.stateNode)) : (Uu(n), st = !0));
      default:
        d0(e, l), l = ht = Xr(l, ye), l = h0(e, l, ye);
    }
    t.memoizedProps = t.pendingProps, l === null ? bi(t) : ht = l;
  }
  function Pn(t, l, e, n) {
    he = en = null, wf(l), Gn = null, Da = 0;
    var a = l.return;
    try {
      if (iv(
        t,
        a,
        l,
        e,
        gt
      )) {
        Gt = 1, Pu(
          t,
          Cl(e, t.current)
        ), ht = null;
        return;
      }
    } catch (i) {
      if (a !== null) throw ht = a, i;
      Gt = 1, Pu(
        t,
        Cl(e, t.current)
      ), ht = null;
      return;
    }
    l.flags & 32768 ? (st || n === 1 ? t = !0 : Kn || (gt & 536870912) !== 0 ? t = !1 : (Ye = t = !0, (n === 2 || n === 9 || n === 3 || n === 6) && (n = Pt.current, n !== null && n.tag === 13 && (n.flags |= 16384))), I0(l, t)) : bi(l);
  }
  function bi(t) {
    var l = t;
    do {
      if ((l.flags & 32768) !== 0) {
        I0(
          l,
          Ye
        );
        return;
      }
      t = l.return;
      var e = rv(
        l.alternate,
        l,
        ye
      );
      if (e !== null) {
        ht = e;
        return;
      }
      if (l = l.sibling, l !== null) {
        ht = l;
        return;
      }
      ht = l = t;
    } while (l !== null);
    Gt === 0 && (Gt = 5);
  }
  function I0(t, l) {
    do {
      var e = hv(t.alternate, t);
      if (e !== null) {
        e.flags &= 32767, ht = e;
        return;
      }
      if (e = t.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !l && (t = t.sibling, t !== null)) {
        ht = t;
        return;
      }
      ht = t = e;
    } while (t !== null);
    Gt = 6, ht = null;
  }
  function k0(t, l, e, n, a, i, s, h, g, z, p, x) {
    t.cancelPendingCommit = null;
    do
      _i();
    while (Bt !== 0);
    if ((Ot & 6) !== 0) throw Error(r(327));
    if (l !== null) {
      if (l === t.current) throw Error(r(177));
      t === xt && (ht = xt = null, gt = 0), mn = l, Ql = t, ee = e, Bc = a, Q0 = n, Tv(
        t,
        l,
        e,
        s,
        h,
        g,
        x
      );
    }
  }
  function Tv(t, l, e, n, a, i, s) {
    var h = l.lanes | l.childLanes;
    if (qc = h, h |= Ef, Ko(
      t,
      e,
      h,
      n,
      a,
      i
    ), $n = null, (e & 335544064) === e ? (Wn = Fd(t), n = 10262) : (Wn = null, n = 10256), (l.subtreeFlags & n) !== 0 || (l.flags & n) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, Mv(ru, function() {
      return Vc(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), fi = !1, n = (l.flags & 13878) !== 0, (l.subtreeFlags & 13878) !== 0 || n) {
      n = w.T, w.T = null, a = et.p, et.p = 2, i = Ot, Ot |= 4;
      try {
        ov(t, l, e);
      } finally {
        Ot = i, et.p = a, w.T = n;
      }
    }
    Bt = 1, fi ? Fn = Kv(
      s,
      t.containerInfo,
      Wn,
      Xc,
      Lc,
      _v,
      Qc,
      Vc,
      bv
    ) : (Xc(), Lc(), Qc());
  }
  function bv(t) {
    if (Bt !== 0) {
      var l = Ql.onRecoverableError;
      l(t, { componentStack: null });
    }
  }
  function _v() {
    Bt === 3 && (Bt = 0, H0(mn, Ql), Bt = 4);
  }
  function Xc() {
    if (Bt === 1) {
      Bt = 0;
      var t = Ql, l = mn, e = ee, n = (l.flags & 13878) !== 0;
      if ((l.subtreeFlags & 13878) !== 0 || n) {
        n = w.T, w.T = null;
        var a = et.p;
        et.p = 2;
        var i = Ot;
        Ot |= 4;
        try {
          Va = ri = !1, R0(l, t, e), e = ts;
          var s = Cr(t.containerInfo), h = e.focusedElem, g = e.selectionRange;
          if (s !== h && h && h.ownerDocument && Nr(
            h.ownerDocument.documentElement,
            h
          )) {
            if (g !== null && vf(h)) {
              var z = g.start, p = g.end;
              if (p === void 0 && (p = z), "selectionStart" in h)
                h.selectionStart = z, h.selectionEnd = Math.min(
                  p,
                  h.value.length
                );
              else {
                var x = h.ownerDocument || document, b = x && x.defaultView || window;
                if (b.getSelection) {
                  var M = b.getSelection(), Y = h.textContent.length, Z = Math.min(g.start, Y), it = g.end === void 0 ? Z : Math.min(g.end, Y);
                  !M.extend && Z > it && (s = it, it = Z, Z = s);
                  var _ = pr(
                    h,
                    Z
                  ), S = pr(
                    h,
                    it
                  );
                  if (_ && S && (M.rangeCount !== 1 || M.anchorNode !== _.node || M.anchorOffset !== _.offset || M.focusNode !== S.node || M.focusOffset !== S.offset)) {
                    var O = x.createRange();
                    O.setStart(_.node, _.offset), M.removeAllRanges(), Z > it ? (M.addRange(O), M.extend(S.node, S.offset)) : (O.setEnd(S.node, S.offset), M.addRange(O));
                  }
                }
              }
            }
            for (x = [], M = h; M = M.parentNode; )
              M.nodeType === 1 && x.push({
                element: M,
                left: M.scrollLeft,
                top: M.scrollTop
              });
            for (typeof h.focus == "function" && h.focus(), h = 0; h < x.length; h++) {
              var D = x[h];
              D.element.scrollLeft = D.left, D.element.scrollTop = D.top;
            }
          }
          fa = !!Pc, ts = Pc = null;
        } finally {
          Ot = i, et.p = a, w.T = n;
        }
      }
      t.current = l, Bt = 2;
    }
  }
  function Lc() {
    if (Bt === 2) {
      Bt = 0;
      var t = Ql, l = mn, e = (l.flags & 8772) !== 0;
      if ((l.subtreeFlags & 8772) !== 0 || e) {
        e = w.T, w.T = null;
        var n = et.p;
        et.p = 2;
        var a = Ot;
        Ot |= 4;
        try {
          M0(t, l.alternate, l);
        } finally {
          Ot = a, et.p = n, w.T = e;
        }
      }
      Bt = 3;
    }
  }
  function Qc() {
    if (Bt === 4 || Bt === 3) {
      Bt = 0;
      var t = Fn;
      Fn = null, Yo();
      var l = Ql, e = mn, n = ee, a = Q0, i = (n & 335544064) === n ? 10262 : 10256;
      if ((e.subtreeFlags & i) !== 0 || (e.flags & i) !== 0 ? Bt = 5 : (Bt = 0, mn = Ql = null, P0(l, l.pendingLanes)), i = l.pendingLanes, i === 0 && (Xe = null), $i(n), e = e.stateNode, ml && typeof ml.onCommitFiberRoot == "function")
        try {
          ml.onCommitFiberRoot(
            ha,
            e,
            void 0,
            (e.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        e = w.T, i = et.p, et.p = 2, w.T = null;
        try {
          for (var s = l.onRecoverableError, h = 0; h < a.length; h++) {
            var g = a[h];
            s(g.value, {
              componentStack: g.stack
            });
          }
        } finally {
          w.T = e, et.p = i;
        }
      }
      if (a = $n, s = Wn, Wn = null, a !== null && ($n = null, s === null && (s = []), t !== null))
        for (g = 0; g < a.length; g++)
          e = (0, a[g])(
            s
          ), e !== void 0 && t.finished.finally(e);
      (ee & 3) !== 0 && _i(), ne(l), i = l.pendingLanes, (n & 261930) !== 0 && (i & 42) !== 0 ? l === Si ? Ka++ : (Ka = 0, Si = l) : (Ka = 0, Si = null), Ja(0);
    }
  }
  function P0(t, l) {
    (t.pooledCacheLanes &= l) === 0 && (l = t.pooledCache, l != null && (t.pooledCache = null, pa(l)));
  }
  function _i() {
    return Fn !== null && (Fn.skipTransition(), Fn = null), Xc(), Lc(), Qc(), Vc();
  }
  function Vc() {
    if (Bt !== 5) return !1;
    var t = Ql, l = qc;
    qc = 0;
    var e = $i(ee), n = w.T, a = et.p;
    try {
      et.p = 32 > e ? 32 : e, w.T = null, e = Bc, Bc = null;
      var i = Ql, s = ee;
      if (Bt = 0, mn = Ql = null, ee = 0, (Ot & 6) !== 0) throw Error(r(331));
      var h = Ot;
      if (Ot |= 4, G0(i.current), q0(
        i,
        i.current,
        s,
        e
      ), Ot = h, Ja(0, !1), ml && typeof ml.onPostCommitFiberRoot == "function")
        try {
          ml.onPostCommitFiberRoot(ha, i);
        } catch {
        }
      return !0;
    } finally {
      et.p = a, w.T = n, P0(t, l);
    }
  }
  function t1(t, l, e) {
    l = Cl(e, l), l = uc(t.stateNode, l, 2), t = xe(t, l, 2), t !== null && (da(t, 2), ne(t));
  }
  function Nt(t, l, e) {
    if (t.tag === 3)
      t1(t, t, e);
    else
      for (; l !== null; ) {
        if (l.tag === 3) {
          t1(
            l,
            t,
            e
          );
          break;
        } else if (l.tag === 1) {
          var n = l.stateNode;
          if (typeof l.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (Xe === null || !Xe.has(n))) {
            t = Cl(e, t), e = Wh(2), n = xe(l, e, 2), n !== null && (Ih(
              e,
              n,
              l,
              t
            ), da(n, 2), ne(n));
            break;
          }
        }
        l = l.return;
      }
  }
  function jc(t, l, e) {
    var n = t.pingCache;
    if (n === null) {
      n = t.pingCache = new gv();
      var a = /* @__PURE__ */ new Set();
      n.set(l, a);
    } else
      a = n.get(l), a === void 0 && (a = /* @__PURE__ */ new Set(), n.set(l, a));
    a.has(e) || (Uc = !0, a.add(e), t = zv.bind(null, t, l, e), l.then(t, t));
  }
  function zv(t, l, e) {
    var n = t.pingCache;
    n !== null && n.delete(l), t.pingedLanes |= t.suspendedLanes & e, t.warmLanes &= ~e, xt === t && (gt & e) === e && ((Gt === 4 || Gt === 3 && (gt & 62914560) === gt && 300 > gl() - gi) && (Ot & 2) === 0 ? kn(t, 0) : vi |= e, Jn === gt && (Jn = 0)), ne(t);
  }
  function l1(t, l) {
    l === 0 && (l = Ls()), t = Pe(t, l), t !== null && (da(t, l), ne(t));
  }
  function Av(t) {
    var l = t.memoizedState, e = 0;
    l !== null && (e = l.retryLane), l1(t, e);
  }
  function Ov(t, l) {
    var e = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var n = t.stateNode, a = t.memoizedState;
        a !== null && (e = a.retryLane);
        break;
      case 19:
        n = t.stateNode;
        break;
      case 22:
        n = t.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    n !== null && n.delete(l), l1(t, e);
  }
  function Mv(t, l) {
    return wi(t, l);
  }
  var ta = null, la = null, Zc = !1, zi = !1, wc = !1, Qe = 0;
  function ne(t) {
    t !== la && t.next === null && (la === null ? ta = la = t : la = la.next = t), zi = !0, Zc || (Zc = !0, Nv());
  }
  function Ja(t, l) {
    if (!wc && zi) {
      wc = !0;
      do
        for (var e = !1, n = ta; n !== null; ) {
          if (t !== 0) {
            var a = n.pendingLanes;
            if (a === 0) var i = 0;
            else {
              var s = n.suspendedLanes, h = n.pingedLanes;
              i = (1 << 31 - yl(42 | t) + 1) - 1, i &= a & ~(s & ~h), i = i & 201326741 ? i & 201326741 | 1 : i ? i | 2 : 0;
            }
            i !== 0 && (e = !0, u1(n, i));
          } else
            i = gt, i = vu(
              n,
              n === xt ? i : 0,
              n.cancelPendingCommit !== null || n.timeoutHandle !== -1
            ), (i & 3) === 0 || oa(n, i) || (e = !0, u1(n, i));
          n = n.next;
        }
      while (e);
      wc = !1;
    }
  }
  function pv() {
    e1();
  }
  function e1() {
    zi = Zc = !1;
    var t = 0;
    Qe !== 0 && Xv() && (t = Qe);
    for (var l = gl(), e = null, n = ta; n !== null; ) {
      var a = n.next, i = n1(n, l);
      i === 0 ? (n.next = null, e === null ? ta = a : e.next = a, a === null && (la = e)) : (e = n, (t !== 0 || (i & 3) !== 0) && (zi = !0)), n = a;
    }
    Bt !== 0 && Bt !== 5 || Ja(t), Qe !== 0 && (Qe = 0);
  }
  function n1(t, l) {
    for (var e = t.suspendedLanes, n = t.pingedLanes, a = t.expirationTimes, i = t.pendingLanes & -62914561; 0 < i; ) {
      var s = 31 - yl(i), h = 1 << s, g = a[s];
      g === -1 ? ((h & e) === 0 || (h & n) !== 0) && (a[s] = wo(h, l)) : g <= l && (t.expiredLanes |= h), i &= ~h;
    }
    if (l = xt, e = gt, e = vu(
      t,
      t === l ? e : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), n = t.callbackNode, e === 0 || t === l && (pt === 2 || pt === 9) || t.cancelPendingCommit !== null)
      return n !== null && n !== null && Ki(n), t.callbackNode = null, t.callbackPriority = 0;
    if ((e & 3) === 0 || oa(t, e)) {
      if (l = e & -e, l === t.callbackPriority) return l;
      switch (n !== null && Ki(n), $i(e)) {
        case 2:
        case 8:
          e = Ys;
          break;
        case 32:
          e = ru;
          break;
        case 268435456:
          e = Gs;
          break;
        default:
          e = ru;
      }
      return n = a1.bind(null, t), e = wi(e, n), t.callbackPriority = l, t.callbackNode = e, l;
    }
    return n !== null && n !== null && Ki(n), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function a1(t, l) {
    if (Bt !== 0 && Bt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var e = t.callbackNode;
    if (_i() && t.callbackNode !== e)
      return null;
    var n = gt;
    return n = vu(
      t,
      t === xt ? n : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), n === 0 ? null : (j0(t, n, l), n1(t, gl()), t.callbackNode != null && t.callbackNode === e ? a1.bind(null, t) : null);
  }
  function u1(t, l) {
    if (_i()) return null;
    j0(t, l, !0);
  }
  function Nv() {
    Qv(function() {
      (Ot & 6) !== 0 ? wi(
        Bs,
        pv
      ) : e1();
    });
  }
  function Kc() {
    if (Qe === 0) {
      var t = un;
      t === 0 && (t = hu, hu <<= 1, (hu & 261888) === 0 && (hu = 256)), Qe = t;
    }
    return Qe;
  }
  function i1(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Eu(t);
  }
  function Cv(t, l, e, n, a) {
    if (l === "submit" && e && e.stateNode === a) {
      var i = i1(
        (a[sl] || null).action
      ), s = n.submitter;
      s && (l = (l = s[sl] || null) ? i1(l.formAction) : s.getAttribute("formAction"), l !== null && (i = l, s = null));
      var h = new zu(
        "action",
        "action",
        null,
        n,
        a
      );
      t.push({
        event: h,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (n.defaultPrevented) {
                if (Qe !== 0) {
                  var g = new FormData(a, s);
                  tc(
                    e,
                    {
                      pending: !0,
                      data: g,
                      method: a.method,
                      action: i
                    },
                    null,
                    g
                  );
                }
              } else
                typeof i == "function" && (h.preventDefault(), g = new FormData(a, s), tc(
                  e,
                  {
                    pending: !0,
                    data: g,
                    method: a.method,
                    action: i
                  },
                  i,
                  g
                ));
            },
            currentTarget: a
          }
        ]
      });
    }
  }
  for (var Jc = 0; Jc < Sf.length; Jc++) {
    var Fc = Sf[Jc], Dv = Fc.toLowerCase(), xv = Fc[0].toUpperCase() + Fc.slice(1);
    Yl(
      Dv,
      "on" + xv
    );
  }
  Yl(Rr, "onAnimationEnd"), Yl(Ur, "onAnimationIteration"), Yl(Hr, "onAnimationStart"), Yl("dblclick", "onDoubleClick"), Yl("focusin", "onFocus"), Yl("focusout", "onBlur"), Yl(Ld, "onTransitionRun"), Yl(Qd, "onTransitionStart"), Yl(Vd, "onTransitionCancel"), Yl(qr, "onTransitionEnd"), zn("onMouseEnter", ["mouseout", "mouseover"]), zn("onMouseLeave", ["mouseout", "mouseover"]), zn("onPointerEnter", ["pointerout", "pointerover"]), zn("onPointerLeave", ["pointerout", "pointerover"]), We(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), We(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), We("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), We(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), We(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), We(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Fa = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Rv = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Fa)
  );
  function f1(t, l) {
    l = (l & 4) !== 0;
    for (var e = 0; e < t.length; e++) {
      var n = t[e], a = n.event;
      n = n.listeners;
      t: {
        var i = void 0;
        if (l)
          for (var s = n.length - 1; 0 <= s; s--) {
            var h = n[s], g = h.instance, z = h.currentTarget;
            if (h = h.listener, g !== i && a.isPropagationStopped())
              break t;
            i = h, a.currentTarget = z;
            try {
              i(a);
            } catch (p) {
              Mu(p);
            }
            a.currentTarget = null, i = g;
          }
        else
          for (s = 0; s < n.length; s++) {
            if (h = n[s], g = h.instance, z = h.currentTarget, h = h.listener, g !== i && a.isPropagationStopped())
              break t;
            i = h, a.currentTarget = z;
            try {
              i(a);
            } catch (p) {
              Mu(p);
            }
            a.currentTarget = null, i = g;
          }
      }
    }
  }
  function ot(t, l) {
    var e = l[Ks];
    e === void 0 && (e = l[Ks] = /* @__PURE__ */ new Set());
    var n = t + "__bubble";
    e.has(n) || (c1(l, t, 2, !1), e.add(n));
  }
  function $c(t, l, e) {
    var n = 0;
    l && (n |= 4), c1(
      e,
      t,
      n,
      l
    );
  }
  var Ai = "_reactListening" + Math.random().toString(36).slice(2);
  function Wc(t) {
    if (!t[Ai]) {
      t[Ai] = !0, $s.forEach(function(e) {
        e !== "selectionchange" && (Rv.has(e) || $c(e, !1, t), $c(e, !0, t));
      });
      var l = t.nodeType === 9 ? t : t.ownerDocument;
      l === null || l[Ai] || (l[Ai] = !0, $c("selectionchange", !1, l));
    }
  }
  function c1(t, l, e, n) {
    switch (I1(l)) {
      case 2:
        var a = Ag;
        break;
      case 8:
        a = Og;
        break;
      default:
        a = ms;
    }
    e = a.bind(
      null,
      l,
      e,
      t
    ), a = void 0, !nf || l !== "touchstart" && l !== "touchmove" && l !== "wheel" || (a = !0), n ? a !== void 0 ? t.addEventListener(l, e, {
      capture: !0,
      passive: a
    }) : t.addEventListener(l, e, !0) : a !== void 0 ? t.addEventListener(l, e, {
      passive: a
    }) : t.addEventListener(l, e, !1);
  }
  function Ic(t, l, e, n, a) {
    var i = n;
    if ((l & 1) === 0 && (l & 2) === 0 && n !== null)
      t: for (; ; ) {
        if (n === null) return;
        var s = n.tag;
        if (s === 3 || s === 4) {
          var h = n.stateNode.containerInfo;
          if (h === a) break;
          if (s === 4)
            for (s = n.return; s !== null; ) {
              var g = s.tag;
              if ((g === 3 || g === 4) && s.stateNode.containerInfo === a)
                return;
              s = s.return;
            }
          for (; h !== null; ) {
            if (s = $e(h), s === null) return;
            if (g = s.tag, g === 5 || g === 6 || g === 26 || g === 27) {
              n = i = s;
              continue t;
            }
            h = h.parentNode;
          }
        }
        n = n.return;
      }
    cr(function() {
      var z = i, p = lf(e), x = [];
      t: {
        var b = Br.get(t);
        if (b !== void 0) {
          var M = zu, Y = t;
          switch (t) {
            case "keypress":
              if (bu(e) === 0) break t;
            case "keydown":
            case "keyup":
              M = md;
              break;
            case "focusin":
              Y = "focus", M = cf;
              break;
            case "focusout":
              Y = "blur", M = cf;
              break;
            case "beforeblur":
            case "afterblur":
              M = cf;
              break;
            case "click":
              if (e.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              M = hr;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              M = ad;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              M = bd;
              break;
            case Rr:
            case Ur:
            case Hr:
              M = fd;
              break;
            case qr:
              M = zd;
              break;
            case "scroll":
            case "scrollend":
              M = ed;
              break;
            case "wheel":
              M = Od;
              break;
            case "copy":
            case "cut":
            case "paste":
              M = sd;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              M = dr;
              break;
            case "submit":
              M = Ed;
              break;
            case "toggle":
            case "beforetoggle":
              M = pd;
          }
          var Z = (l & 4) !== 0, it = !Z && (t === "scroll" || t === "scrollend"), _ = Z ? b !== null ? b + "Capture" : null : b;
          Z = [];
          for (var S = z, O; S !== null; ) {
            var D = S;
            if (O = D.stateNode, D = D.tag, D !== 5 && D !== 26 && D !== 27 || O === null || _ === null || (D = ma(S, _), D != null && Z.push(
              $a(S, D, O)
            )), it) break;
            S = S.return;
          }
          0 < Z.length && (b = new M(
            b,
            Y,
            null,
            e,
            p
          ), x.push({ event: b, listeners: Z }));
        }
      }
      if ((l & 7) === 0) {
        t: {
          if (M = t === "mouseover" || t === "pointerover", b = t === "mouseout" || t === "pointerout", M && e !== tf && (Y = e.relatedTarget || e.fromElement) && ($e(Y) || Y[Tn]))
            break t;
          (b || M) && (Y = p.window === p ? p : (M = p.ownerDocument) ? M.defaultView || M.parentWindow : window, b ? (M = e.relatedTarget || e.toElement, b = z, M = M ? $e(M) : null, M !== null && (it = d(M), Z = M.tag, M !== it || Z !== 5 && Z !== 27 && Z !== 6) && (M = null)) : (b = null, M = z), b !== M && (Z = hr, D = "onMouseLeave", _ = "onMouseEnter", S = "mouse", (t === "pointerout" || t === "pointerover") && (Z = dr, D = "onPointerLeave", _ = "onPointerEnter", S = "pointer"), it = b == null ? Y : ga(b), O = M == null ? Y : ga(M), Y = new Z(
            D,
            S + "leave",
            b,
            e,
            p
          ), Y.target = it, Y.relatedTarget = O, D = null, $e(p) === z && (Z = new Z(
            _,
            S + "enter",
            M,
            e,
            p
          ), Z.target = O, Z.relatedTarget = it, D = Z), it = D, Z = b && M ? W(
            b,
            M,
            Uv
          ) : null, b !== null && s1(
            x,
            Y,
            b,
            Z,
            !1
          ), M !== null && it !== null && s1(
            x,
            it,
            M,
            Z,
            !0
          )));
        }
        t: {
          if (b = z ? ga(z) : window, M = b.nodeName && b.nodeName.toLowerCase(), M === "select" || M === "input" && b.type === "file")
            var Q = br;
          else if (Er(b))
            if (_r)
              Q = Yd;
            else {
              Q = qd;
              var mt = Hd;
            }
          else
            M = b.nodeName, !M || M.toLowerCase() !== "input" || b.type !== "checkbox" && b.type !== "radio" ? z && Pi(z.elementType) && (Q = br) : Q = Bd;
          if (Q && (Q = Q(t, z))) {
            Tr(
              x,
              Q,
              e,
              p
            );
            break t;
          }
          mt && mt(t, b, z);
        }
        switch (mt = z ? ga(z) : window, t) {
          case "focusin":
            (Er(mt) || mt.contentEditable === "true") && (Cn = mt, gf = z, Aa = null);
            break;
          case "focusout":
            Aa = gf = Cn = null;
            break;
          case "mousedown":
            mf = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            mf = !1, Dr(x, e, p);
            break;
          case "selectionchange":
            if (Xd) break;
          case "keydown":
          case "keyup":
            Dr(x, e, p);
        }
        var F;
        if (rf)
          t: {
            switch (t) {
              case "compositionstart":
                var tt = "onCompositionStart";
                break t;
              case "compositionend":
                tt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                tt = "onCompositionUpdate";
                break t;
            }
            tt = void 0;
          }
        else
          Nn ? yr(t, e) && (tt = "onCompositionEnd") : t === "keydown" && e.keyCode === 229 && (tt = "onCompositionStart");
        tt && (vr && e.locale !== "ko" && (Nn || tt !== "onCompositionStart" ? tt === "onCompositionEnd" && Nn && (F = sr()) : (_e = p, af = "value" in _e ? _e.value : _e.textContent, Nn = !0)), mt = Oi(z, tt), 0 < mt.length && (tt = new or(
          tt,
          t,
          null,
          e,
          p
        ), x.push({ event: tt, listeners: mt }), F ? tt.data = F : (F = Sr(e), F !== null && (tt.data = F)))), (F = Cd ? Dd(t, e) : xd(t, e)) && (tt = Oi(z, "onBeforeInput"), 0 < tt.length && (mt = new or(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          p
        ), x.push({
          event: mt,
          listeners: tt
        }), mt.data = F)), Cv(
          x,
          t,
          z,
          e,
          p
        );
      }
      f1(x, l);
    });
  }
  function $a(t, l, e) {
    return {
      instance: t,
      listener: l,
      currentTarget: e
    };
  }
  function Oi(t, l) {
    for (var e = l + "Capture", n = []; t !== null; ) {
      var a = t, i = a.stateNode;
      if (a = a.tag, a !== 5 && a !== 26 && a !== 27 || i === null || (a = ma(t, e), a != null && n.unshift(
        $a(t, a, i)
      ), a = ma(t, l), a != null && n.push(
        $a(t, a, i)
      )), t.tag === 3) return n;
      t = t.return;
    }
    return [];
  }
  function Uv(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function s1(t, l, e, n, a) {
    for (var i = l._reactName, s = []; e !== null && e !== n; ) {
      var h = e, g = h.alternate, z = h.stateNode;
      if (h = h.tag, g !== null && g === n) break;
      h !== 5 && h !== 26 && h !== 27 || z === null || (g = z, a ? (z = ma(e, i), z != null && s.unshift(
        $a(e, z, g)
      )) : a || (z = ma(e, i), z != null && s.push(
        $a(e, z, g)
      ))), e = e.return;
    }
    s.length !== 0 && t.push({ event: l, listeners: s });
  }
  var Hv = /\r\n?/g, qv = /\u0000|\uFFFD/g;
  function r1(t) {
    return (typeof t == "string" ? t : "" + t).replace(Hv, `
`).replace(qv, "");
  }
  function h1(t, l) {
    return l = r1(l), r1(t) === l;
  }
  function Ct(t, l, e, n, a, i) {
    switch (e) {
      case "children":
        if (typeof n == "string")
          l === "body" || l === "textarea" && n === "" || On(t, n);
        else if (typeof n == "number" || typeof n == "bigint")
          l !== "body" && On(t, "" + n);
        else return;
        break;
      case "className":
        Su(t, "class", n);
        break;
      case "tabIndex":
        Su(t, "tabindex", n);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Su(t, e, n);
        break;
      case "style":
        ir(t, n, i);
        return;
      case "data":
        if (l !== "object") {
          Su(t, "data", n);
          break;
        }
      case "src":
      case "href":
        if (n === "" && (l !== "a" || e !== "href")) {
          t.removeAttribute(e);
          break;
        }
        if (n == null || typeof n == "function" || typeof n == "symbol" || typeof n == "boolean") {
          t.removeAttribute(e);
          break;
        }
        n = Eu(n), t.setAttribute(e, n);
        break;
      case "action":
      case "formAction":
        if (typeof n == "function") {
          t.setAttribute(
            e,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof i == "function" && (e === "formAction" ? (l !== "input" && Ct(t, l, "name", a.name, a, null), Ct(
            t,
            l,
            "formEncType",
            a.formEncType,
            a,
            null
          ), Ct(
            t,
            l,
            "formMethod",
            a.formMethod,
            a,
            null
          ), Ct(
            t,
            l,
            "formTarget",
            a.formTarget,
            a,
            null
          )) : (Ct(t, l, "encType", a.encType, a, null), Ct(t, l, "method", a.method, a, null), Ct(t, l, "target", a.target, a, null)));
        if (n == null || typeof n == "symbol" || typeof n == "boolean") {
          t.removeAttribute(e);
          break;
        }
        n = Eu(n), t.setAttribute(e, n);
        break;
      case "onClick":
        n != null && (t.onclick = Jl);
        return;
      case "onScroll":
        n != null && ot("scroll", t);
        return;
      case "onScrollEnd":
        n != null && ot("scrollend", t);
        return;
      case "dangerouslySetInnerHTML":
        if (n != null) {
          if (typeof n != "object" || !("__html" in n))
            throw Error(r(61));
          if (e = n.__html, e != null) {
            if (a.children != null) throw Error(r(60));
            i?.__html !== e && (t.innerHTML = e);
          }
        }
        break;
      case "multiple":
        t.multiple = n && typeof n != "function" && typeof n != "symbol";
        break;
      case "muted":
        t.muted = n && typeof n != "function" && typeof n != "symbol";
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
        if (n == null || typeof n == "function" || typeof n == "boolean" || typeof n == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        e = Eu(n), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          e
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
        n != null && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(e, n) : t.removeAttribute(e);
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
        n && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(e, "") : t.removeAttribute(e);
        break;
      case "capture":
      case "download":
        n === !0 ? t.setAttribute(e, "") : n !== !1 && n != null && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(e, n) : t.removeAttribute(e);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        n != null && typeof n != "function" && typeof n != "symbol" && !isNaN(n) && 1 <= n ? t.setAttribute(e, n) : t.removeAttribute(e);
        break;
      case "rowSpan":
      case "start":
        n == null || typeof n == "function" || typeof n == "symbol" || isNaN(n) ? t.removeAttribute(e) : t.setAttribute(e, n);
        break;
      case "popover":
        ot("beforetoggle", t), ot("toggle", t), yu(t, "popover", n);
        break;
      case "xlinkActuate":
        ue(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          n
        );
        break;
      case "xlinkArcrole":
        ue(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          n
        );
        break;
      case "xlinkRole":
        ue(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          n
        );
        break;
      case "xlinkShow":
        ue(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          n
        );
        break;
      case "xlinkTitle":
        ue(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          n
        );
        break;
      case "xlinkType":
        ue(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          n
        );
        break;
      case "xmlBase":
        ue(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          n
        );
        break;
      case "xmlLang":
        ue(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          n
        );
        break;
      case "xmlSpace":
        ue(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          n
        );
        break;
      case "is":
        yu(t, "is", n);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N")
          e = td.get(e) || e, yu(t, e, n);
        else return;
    }
    bt = !0;
  }
  function kc(t, l, e, n, a, i) {
    switch (e) {
      case "style":
        ir(t, n, i);
        return;
      case "dangerouslySetInnerHTML":
        if (n != null) {
          if (typeof n != "object" || !("__html" in n))
            throw Error(r(61));
          if (e = n.__html, e != null) {
            if (a.children != null) throw Error(r(60));
            i?.__html !== e && (t.innerHTML = e);
          }
        }
        break;
      case "children":
        if (typeof n == "string") On(t, n);
        else if (typeof n == "number" || typeof n == "bigint")
          On(t, "" + n);
        else return;
        break;
      case "onScroll":
        n != null && ot("scroll", t);
        return;
      case "onScrollEnd":
        n != null && ot("scrollend", t);
        return;
      case "onClick":
        n != null && (t.onclick = Jl);
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
        if (!Ws.hasOwnProperty(e))
          t: {
            if (e[0] === "o" && e[1] === "n" && (a = e.endsWith("Capture"), i = e.slice(2, a ? e.length - 7 : void 0), l = t[sl] || null, l = l != null ? l[e] : null, typeof l == "function" && t.removeEventListener(i, l, a), typeof n == "function")) {
              typeof l != "function" && l !== null && (e in t ? t[e] = null : t.hasAttribute(e) && t.removeAttribute(e)), t.addEventListener(i, n, a);
              break t;
            }
            bt = !0, e in t ? t[e] = n : n === !0 ? t.setAttribute(e, "") : yu(t, e, n);
          }
        return;
    }
    bt = !0;
  }
  function el(t, l, e) {
    switch (l) {
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
        ot("error", t), ot("load", t);
        var n = !1, a = !1, i;
        for (i in e)
          if (e.hasOwnProperty(i)) {
            var s = e[i];
            if (s != null)
              switch (i) {
                case "src":
                  n = !0;
                  break;
                case "srcSet":
                  a = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, l));
                default:
                  Ct(t, l, i, s, e, null);
              }
          }
        a && Ct(t, l, "srcSet", e.srcSet, e, null), n && Ct(t, l, "src", e.src, e, null);
        return;
      case "input":
        ot("invalid", t);
        var h = i = s = a = null, g = null, z = null;
        for (n in e)
          if (e.hasOwnProperty(n)) {
            var p = e[n];
            if (p != null)
              switch (n) {
                case "name":
                  a = p;
                  break;
                case "type":
                  s = p;
                  break;
                case "checked":
                  g = p;
                  break;
                case "defaultChecked":
                  z = p;
                  break;
                case "value":
                  i = p;
                  break;
                case "defaultValue":
                  h = p;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (p != null)
                    throw Error(r(137, l));
                  break;
                default:
                  Ct(t, l, n, p, e, null);
              }
          }
        er(
          t,
          i,
          h,
          g,
          z,
          s,
          a,
          !1
        );
        return;
      case "select":
        ot("invalid", t), n = s = i = null;
        for (a in e)
          if (e.hasOwnProperty(a) && (h = e[a], h != null))
            switch (a) {
              case "value":
                i = h;
                break;
              case "defaultValue":
                s = h;
                break;
              case "multiple":
                n = h;
              default:
                Ct(t, l, a, h, e, null);
            }
        l = i, e = s, t.multiple = !!n, l != null ? An(t, !!n, l, !1) : e != null && An(t, !!n, e, !0);
        return;
      case "textarea":
        ot("invalid", t), i = a = n = null;
        for (s in e)
          if (e.hasOwnProperty(s) && (h = e[s], h != null))
            switch (s) {
              case "value":
                n = h;
                break;
              case "defaultValue":
                a = h;
                break;
              case "children":
                i = h;
                break;
              case "dangerouslySetInnerHTML":
                if (h != null) throw Error(r(91));
                break;
              default:
                Ct(t, l, s, h, e, null);
            }
        ar(t, n, a, i);
        return;
      case "option":
        for (g in e)
          e.hasOwnProperty(g) && (n = e[g], n != null) && (g === "selected" ? t.selected = n && typeof n != "function" && typeof n != "symbol" : Ct(t, l, g, n, e, null));
        return;
      case "dialog":
        ot("beforetoggle", t), ot("toggle", t), ot("cancel", t), ot("close", t);
        break;
      case "iframe":
      case "object":
        ot("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Fa.length; n++)
          ot(Fa[n], t);
        break;
      case "image":
        ot("error", t), ot("load", t);
        break;
      case "details":
        ot("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        ot("error", t), ot("load", t);
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
        for (z in e)
          if (e.hasOwnProperty(z) && (n = e[z], n != null))
            switch (z) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, l));
              default:
                Ct(t, l, z, n, e, null);
            }
        return;
      default:
        if (Pi(l)) {
          for (p in e)
            e.hasOwnProperty(p) && (n = e[p], n !== void 0 && kc(
              t,
              l,
              p,
              n,
              e,
              void 0
            ));
          return;
        }
    }
    for (h in e)
      e.hasOwnProperty(h) && (n = e[h], n != null && Ct(t, l, h, n, e, null));
  }
  var Bv = {};
  function Yv(t, l, e, n) {
    switch (l) {
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
        var a = null, i = null, s = null, h = null, g = null, z = null, p = null;
        for (M in e) {
          var x = e[M];
          if (e.hasOwnProperty(M) && x != null)
            switch (M) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                g = x;
              default:
                n.hasOwnProperty(M) || Ct(t, l, M, null, n, x);
            }
        }
        for (var b in n) {
          var M = n[b];
          if (x = e[b], n.hasOwnProperty(b) && (M != null || x != null))
            switch (b) {
              case "type":
                M !== x && (bt = !0), i = M;
                break;
              case "name":
                M !== x && (bt = !0), a = M;
                break;
              case "checked":
                M !== x && (bt = !0), z = M;
                break;
              case "defaultChecked":
                M !== x && (bt = !0), p = M;
                break;
              case "value":
                M !== x && (bt = !0), s = M;
                break;
              case "defaultValue":
                M !== x && (bt = !0), h = M;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (M != null)
                  throw Error(r(137, l));
                break;
              default:
                M !== x && Ct(
                  t,
                  l,
                  b,
                  M,
                  n,
                  x
                );
            }
        }
        Ii(
          t,
          s,
          h,
          g,
          z,
          p,
          i,
          a
        );
        return;
      case "select":
        M = s = h = b = null;
        for (i in e)
          if (g = e[i], e.hasOwnProperty(i) && g != null)
            switch (i) {
              case "value":
                break;
              case "multiple":
                M = g;
              default:
                n.hasOwnProperty(i) || Ct(
                  t,
                  l,
                  i,
                  null,
                  n,
                  g
                );
            }
        for (a in n)
          if (i = n[a], g = e[a], n.hasOwnProperty(a) && (i != null || g != null))
            switch (a) {
              case "value":
                i !== g && (bt = !0), b = i;
                break;
              case "defaultValue":
                i !== g && (bt = !0), h = i;
                break;
              case "multiple":
                i !== g && (bt = !0), s = i;
              default:
                i !== g && Ct(
                  t,
                  l,
                  a,
                  i,
                  n,
                  g
                );
            }
        l = h, e = s, n = M, b != null ? An(t, !!e, b, !1) : !!n != !!e && (l != null ? An(t, !!e, l, !0) : An(t, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        M = b = null;
        for (h in e)
          if (a = e[h], e.hasOwnProperty(h) && a != null && !n.hasOwnProperty(h))
            switch (h) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ct(t, l, h, null, n, a);
            }
        for (s in n)
          if (a = n[s], i = e[s], n.hasOwnProperty(s) && (a != null || i != null))
            switch (s) {
              case "value":
                a !== i && (bt = !0), b = a;
                break;
              case "defaultValue":
                a !== i && (bt = !0), M = a;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (a != null) throw Error(r(91));
                break;
              default:
                a !== i && Ct(t, l, s, a, n, i);
            }
        nr(t, b, M);
        return;
      case "option":
        for (var Y in e)
          b = e[Y], e.hasOwnProperty(Y) && b != null && !n.hasOwnProperty(Y) && (Y === "selected" ? t.selected = !1 : Ct(
            t,
            l,
            Y,
            null,
            n,
            b
          ));
        for (g in n)
          b = n[g], M = e[g], n.hasOwnProperty(g) && b !== M && (b != null || M != null) && (g === "selected" ? (b !== M && (bt = !0), t.selected = b && typeof b != "function" && typeof b != "symbol") : Ct(
            t,
            l,
            g,
            b,
            n,
            M
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
        for (var Z in e)
          b = e[Z], e.hasOwnProperty(Z) && b != null && !n.hasOwnProperty(Z) && Ct(t, l, Z, null, n, b);
        for (z in n)
          if (b = n[z], M = e[z], n.hasOwnProperty(z) && b !== M && (b != null || M != null))
            switch (z) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (b != null)
                  throw Error(r(137, l));
                break;
              default:
                Ct(
                  t,
                  l,
                  z,
                  b,
                  n,
                  M
                );
            }
        return;
      default:
        if (Pi(l)) {
          for (var it in e)
            b = e[it], e.hasOwnProperty(it) && b !== void 0 && !n.hasOwnProperty(it) && kc(
              t,
              l,
              it,
              void 0,
              n,
              b
            );
          for (p in n)
            b = n[p], M = e[p], !n.hasOwnProperty(p) || b === M || b === void 0 && M === void 0 || kc(
              t,
              l,
              p,
              b,
              n,
              M
            );
          return;
        }
    }
    for (var _ in e)
      b = e[_], e.hasOwnProperty(_) && b != null && !n.hasOwnProperty(_) && Ct(t, l, _, null, n, b);
    for (x in n)
      b = n[x], M = e[x], !n.hasOwnProperty(x) || b === M || b == null && M == null || Ct(t, l, x, b, n, M);
  }
  function o1(t) {
    switch (t) {
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
  function Gv() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, l = 0, e = performance.getEntriesByType("resource"), n = 0; n < e.length; n++) {
        var a = e[n], i = a.transferSize, s = a.initiatorType, h = a.duration;
        if (i && h && o1(s)) {
          for (s = 0, h = a.responseEnd, n += 1; n < e.length; n++) {
            var g = e[n], z = g.startTime;
            if (z > h) break;
            var p = g.transferSize, x = g.initiatorType;
            p && o1(x) && (g = g.responseEnd, s += p * (g < h ? 1 : (h - z) / (g - z)));
          }
          if (--n, l += 8 * (i + s) / (a.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return l / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Pc = null, ts = null;
  function Wa(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function d1(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function v1(t, l) {
    if (t === 0)
      switch (l) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && l === "foreignObject" ? 0 : t;
  }
  function g1(t, l, e, n) {
    return e = Wa(
      e
    ).createElement(t), e[It] = n, e[sl] = l, el(e, t, l), Kt(e), e;
  }
  function ls(t, l) {
    return t === "textarea" || t === "noscript" || typeof l.children == "string" || typeof l.children == "number" || typeof l.children == "bigint" || typeof l.dangerouslySetInnerHTML == "object" && l.dangerouslySetInnerHTML !== null && l.dangerouslySetInnerHTML.__html != null;
  }
  var es = null;
  function Xv() {
    var t = window.event;
    return t && t.type === "popstate" ? t === es ? !1 : (es = t, !0) : (es = null, !1);
  }
  var ns = typeof setTimeout == "function" ? setTimeout : void 0, Lv = typeof clearTimeout == "function" ? clearTimeout : void 0, m1 = typeof Promise == "function" ? Promise : void 0, y1 = typeof requestAnimationFrame == "function" ? requestAnimationFrame : ns, Qv = typeof queueMicrotask == "function" ? queueMicrotask : typeof m1 < "u" ? function(t) {
    return m1.resolve(null).then(t).catch(Vv);
  } : ns;
  function Vv(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Ve(t) {
    return t === "head";
  }
  function S1(t, l) {
    var e = l, n = 0;
    do {
      var a = e.nextSibling;
      if (t.removeChild(e), a && a.nodeType === 8)
        if (e = a.data, e === "/$" || e === "/&") {
          if (n === 0) {
            t.removeChild(a), ca(l);
            return;
          }
          n--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          n++;
        else if (e === "html")
          hs(
            t.ownerDocument.documentElement
          );
        else if (e === "head") {
          e = t.ownerDocument.head, hs(e);
          for (var i = e.firstChild; i; ) {
            var s = i.nextSibling, h = i.nodeName;
            i[va] || h === "SCRIPT" || h === "STYLE" || h === "LINK" && i.rel.toLowerCase() === "stylesheet" || e.removeChild(i), i = s;
          }
        } else
          e === "body" && hs(t.ownerDocument.body);
      e = a;
    } while (e);
    ca(l);
  }
  function E1(t, l) {
    var e = t;
    t = 0;
    do {
      var n = e.nextSibling;
      if (e.nodeType === 1 ? l ? (e._stashedDisplay = e.style.display, e.style.display = "none") : (e.style.display = e._stashedDisplay || "", e.getAttribute("style") === "" && e.removeAttribute("style")) : e.nodeType === 3 && (l ? (e._stashedText = e.nodeValue, e.nodeValue = "") : e.nodeValue = e._stashedText || ""), n && n.nodeType === 8)
        if (e = n.data, e === "/$") {
          if (t === 0) break;
          t--;
        } else
          e !== "$" && e !== "$?" && e !== "$~" && e !== "$!" || t++;
      e = n;
    } while (e);
  }
  function T1(t, l, e) {
    if (l = CSS.escape(l) !== l ? "r-" + btoa(l).replace(/=/g, "") : l, t.style.viewTransitionName = l, e != null && (t.style.viewTransitionClass = e), e = getComputedStyle(t), e.display === "inline") {
      if (l = t.getClientRects(), l.length === 1) var n = 1;
      else
        for (var a = n = 0; a < l.length; a++) {
          var i = l[a];
          0 < i.width && 0 < i.height && n++;
        }
      n === 1 && (t = t.style, t.display = l.length === 1 ? "inline-block" : "block", t.marginTop = "-" + e.paddingTop, t.marginBottom = "-" + e.paddingBottom);
    }
  }
  function b1(t, l) {
    t = t.style, l = l.style;
    var e = l != null ? l.hasOwnProperty("viewTransitionName") ? l.viewTransitionName : l.hasOwnProperty("view-transition-name") ? l["view-transition-name"] : null : null;
    t.viewTransitionName = e == null || typeof e == "boolean" ? "" : ("" + e).trim(), e = l != null ? l.hasOwnProperty("viewTransitionClass") ? l.viewTransitionClass : l.hasOwnProperty("view-transition-class") ? l["view-transition-class"] : null : null, t.viewTransitionClass = e == null || typeof e == "boolean" ? "" : ("" + e).trim(), t.display === "inline-block" && (l == null ? t.display = t.margin = "" : (e = l.display, t.display = e == null || typeof e == "boolean" ? "" : e, e = l.margin, e != null ? t.margin = e : (e = l.hasOwnProperty("marginTop") ? l.marginTop : l["margin-top"], t.marginTop = e == null || typeof e == "boolean" ? "" : e, l = l.hasOwnProperty("marginBottom") ? l.marginBottom : l["margin-bottom"], t.marginBottom = l == null || typeof l == "boolean" ? "" : l)));
  }
  function jv(t, l, e) {
    return e = e.ownerDocument.defaultView, {
      rect: t,
      abs: l.position === "absolute" || l.position === "fixed",
      clip: l.clipPath !== "none" || l.overflow !== "visible" || l.filter !== "none" || l.mask !== "none" || l.mask !== "none" || l.borderRadius !== "0px",
      view: 0 <= t.bottom && 0 <= t.right && t.top <= e.innerHeight && t.left <= e.innerWidth
    };
  }
  function as(t) {
    var l = t.getBoundingClientRect(), e = getComputedStyle(t);
    return jv(l, e, t);
  }
  function Zv(t) {
    return t.documentElement.clientHeight;
  }
  function wv(t) {
    this.addEventListener("load", t), this.addEventListener("error", t);
  }
  function Kv(t, l, e, n, a, i, s, h, g) {
    var z = l.nodeType === 9 ? l : l.ownerDocument;
    try {
      var p = z.startViewTransition({
        update: function() {
          var b = z.defaultView, M = b.navigation && b.navigation.transition, Y = z.fonts.status;
          n();
          var Z = [];
          if (Y === "loaded" && (Zv(z), z.fonts.status === "loading" && Z.push(z.fonts.ready)), Y = Z.length, t !== null)
            for (var it = t.suspenseyImages, _ = 0, S = 0; S < it.length; S++) {
              var O = it[S];
              if (!O.complete) {
                var D = O.getBoundingClientRect();
                if (0 < D.bottom && 0 < D.right && D.top < b.innerHeight && D.left < b.innerWidth) {
                  if (_ += V1(O), _ > Ni) {
                    Z.length = Y;
                    break;
                  }
                  O = new Promise(
                    wv.bind(O)
                  ), Z.push(O);
                }
              }
            }
          if (0 < Z.length)
            return b = Promise.race([
              Promise.all(Z),
              new Promise(function(Q) {
                return setTimeout(Q, 500);
              })
            ]).then(a, a), (M ? Promise.allSettled([M.finished, b]) : b).then(i, i);
          if (a(), M)
            return M.finished.then(
              i,
              i
            );
          i();
        },
        types: e
      });
      z.__reactViewTransition = p;
      var x = [];
      return p.ready.then(
        function() {
          for (var b = z.documentElement.getAnimations({
            subtree: !0
          }), M = 0; M < b.length; M++) {
            var Y = b[M], Z = Y.effect, it = Z.pseudoElement;
            if (it != null && it.startsWith("::view-transition")) {
              x.push(Y), Y = Z.getKeyframes();
              for (var _ = it = void 0, S = !0, O = 0; O < Y.length; O++) {
                var D = Y[O], Q = D.width;
                if (it === void 0) it = Q;
                else if (it !== Q) {
                  S = !1;
                  break;
                }
                if (Q = D.height, _ === void 0) _ = Q;
                else if (_ !== Q) {
                  S = !1;
                  break;
                }
                delete D.width, delete D.height, D.transform === "none" && delete D.transform;
              }
              S && it !== void 0 && _ !== void 0 && (Z.setKeyframes(Y), S = getComputedStyle(
                Z.target,
                Z.pseudoElement
              ), S.width !== it || S.height !== _) && (S = Y[0], S.width = it, S.height = _, S = Y[Y.length - 1], S.width = it, S.height = _, Z.setKeyframes(Y));
            }
          }
          s();
        },
        function(b) {
          z.__reactViewTransition === p && (z.__reactViewTransition = null);
          try {
            typeof b == "object" && b !== null && b.name === "InvalidStateError" && (b.message === "View transition was skipped because document visibility state is hidden." || b.message === "Skipping view transition because document visibility state has become hidden." || b.message === "Skipping view transition because viewport size changed." || b.message === "Transition was aborted because of invalid state") && (b = null), b !== null && g(b);
          } finally {
            n(), a(), s();
          }
        }
      ), p.finished.finally(function() {
        for (var b = 0; b < x.length; b++)
          x[b].cancel();
        z.__reactViewTransition === p && (z.__reactViewTransition = null), h();
      }), p;
    } catch {
      return n(), a(), s(), null;
    }
  }
  function yn(t, l) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + t + "(" + l + ")";
  }
  yn.prototype.animate = function(t, l) {
    return l = typeof l == "number" ? { duration: l } : V({}, l), l.pseudoElement = this._selector, this._scope.animate(t, l);
  }, yn.prototype.getAnimations = function() {
    for (var t = this._scope, l = this._selector, e = t.getAnimations({ subtree: !0 }), n = [], a = 0; a < e.length; a++) {
      var i = e[a].effect;
      i !== null && i.target === t && i.pseudoElement === l && n.push(e[a]);
    }
    return n;
  }, yn.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function _1(t) {
    return {
      name: t,
      group: new yn("group", t),
      imagePair: new yn("image-pair", t),
      old: new yn("old", t),
      new: new yn("new", t)
    };
  }
  function Ol(t) {
    this._fragmentFiber = t, this._observers = this._eventListeners = null;
  }
  Ol.prototype.addEventListener = function(t, l, e) {
    var n = null, a = null;
    if (!(e != null && typeof e != "boolean" && (n = e.signal || null, n !== null && n.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var i = this._eventListeners;
      if (A1(i, t, l, e) === -1) {
        var s = this, h = l;
        e != null && typeof e != "boolean" && e.once === !0 && (h = function(g) {
          s.removeEventListener(
            t,
            l,
            e
          ), typeof l == "function" ? l.call(this, g) : l.handleEvent(g);
        }), n !== null && (a = s.removeEventListener.bind(
          s,
          t,
          l,
          e
        ), n.addEventListener("abort", a, { once: !0 }), a = n.removeEventListener.bind(n, "abort", a)), n = ea(e), i.push({
          type: t,
          listener: l,
          optionsOrUseCapture: e,
          attachedListener: h,
          cleanup: a
        }), m(
          this._fragmentFiber.child,
          !1,
          Jv,
          t,
          h,
          n
        );
      }
      this._eventListeners = i;
    }
  };
  function Jv(t, l, e, n) {
    return H(t).addEventListener(
      l,
      e,
      n
    ), !1;
  }
  Ol.prototype.removeEventListener = function(t, l, e) {
    var n = this._eventListeners;
    if (n !== null && (l = A1(
      n,
      t,
      l,
      e
    ), l !== -1)) {
      var a = n[l];
      e = a.attachedListener;
      var i = a.cleanup;
      a = ea(a.optionsOrUseCapture), m(
        this._fragmentFiber.child,
        !1,
        Fv,
        t,
        e,
        a
      ), n.splice(l, 1), i !== null && i();
    }
  };
  function Fv(t, l, e, n) {
    return H(t).removeEventListener(
      l,
      e,
      n
    ), !1;
  }
  function ea(t) {
    return t != null && typeof t != "boolean" && (t.once === !0 || t.signal instanceof AbortSignal) ? { capture: t.capture, passive: t.passive } : t;
  }
  function z1(t) {
    return t == null ? "c=0" : typeof t == "boolean" ? "c=" + (t ? "1" : "0") : "c=" + (t.capture ? "1" : "0");
  }
  function A1(t, l, e, n) {
    if (t.length === 0) return -1;
    n = z1(n);
    for (var a = 0; a < t.length; a++) {
      var i = t[a];
      if (i.type === l && i.listener === e && z1(i.optionsOrUseCapture) === n)
        return a;
    }
    return -1;
  }
  Ol.prototype.dispatchEvent = function(t) {
    var l = N(
      this._fragmentFiber
    );
    if (l === null) return !0;
    l = H(l);
    var e = this._eventListeners;
    if (e !== null && 0 < e.length || !t.bubbles) {
      var n = l.nodeType === 9 ? l.createComment("") : document.createTextNode("");
      if (e)
        for (var a = 0; a < e.length; a++) {
          var i = e[a];
          n.addEventListener(
            i.type,
            i.attachedListener,
            ea(i.optionsOrUseCapture)
          );
        }
      if (l.appendChild(n), t = n.dispatchEvent(t), e)
        for (a = 0; a < e.length; a++)
          i = e[a], n.removeEventListener(
            i.type,
            i.attachedListener,
            ea(i.optionsOrUseCapture)
          );
      return l.removeChild(n), t;
    }
    return l.dispatchEvent(t);
  }, Ol.prototype.focus = function(t) {
    m(
      this._fragmentFiber.child,
      !0,
      O1,
      t,
      void 0,
      void 0
    );
  };
  function O1(t, l) {
    return t.tag === 6 ? !1 : (t = H(t), ig(t, l));
  }
  Ol.prototype.focusLast = function(t) {
    var l = [];
    m(
      this._fragmentFiber.child,
      !0,
      us,
      l,
      void 0,
      void 0
    );
    for (var e = l.length - 1; 0 <= e && !O1(l[e], t); e--) ;
  };
  function us(t, l) {
    return l.push(t), !1;
  }
  Ol.prototype.blur = function() {
    var t = N(
      this._fragmentFiber
    );
    t !== null && (t = H(t), t = Wa(t).activeElement, t !== null && m(
      this._fragmentFiber.child,
      !1,
      $v,
      t,
      void 0,
      void 0
    ));
  };
  function $v(t, l) {
    return t.tag === 6 ? !1 : (t = H(t), t === l || t.contains(l) ? (l.blur(), !0) : !1);
  }
  Ol.prototype.observeUsing = function(t) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(t), m(
      this._fragmentFiber.child,
      !1,
      Wv,
      t,
      void 0,
      void 0
    );
  };
  function Wv(t, l) {
    return t.tag === 6 || (t = H(t), l.observe(t)), !1;
  }
  Ol.prototype.unobserveUsing = function(t) {
    var l = this._observers;
    if (l !== null && l.has(t)) {
      l.delete(t), m(
        this._fragmentFiber.child,
        !1,
        Iv,
        t,
        void 0,
        void 0
      );
      for (var e = l = 0; e < Vl.length; e++) {
        var n = Vl[e];
        n.fragmentInstance === this && n.observer === t ? t.unobserve(n.instance) : Vl[l++] = n;
      }
      Vl.length = l;
    }
  };
  function Iv(t, l) {
    return t.tag === 6 || (t = H(t), l.unobserve(t)), !1;
  }
  var Vl = [], is = !1;
  function kv(t, l, e) {
    Vl.push({
      fragmentInstance: t,
      observer: l,
      instance: e
    }), is || (is = !0, fg(function() {
      is = !1;
      var n = Vl;
      Vl = [];
      for (var a = 0; a < n.length; a++) {
        var i = n[a];
        i.observer.unobserve(i.instance);
      }
    }));
  }
  Ol.prototype.getClientRects = function() {
    var t = [];
    return m(
      this._fragmentFiber.child,
      !1,
      Pv,
      t,
      void 0,
      void 0
    ), t;
  };
  function Pv(t, l) {
    if (t.tag === 6) {
      t = t.stateNode;
      var e = t.ownerDocument.createRange();
      e.selectNodeContents(t), l.push.apply(l, e.getClientRects());
    } else
      t = H(t), l.push.apply(l, t.getClientRects());
    return !1;
  }
  Ol.prototype.getRootNode = function(t) {
    var l = N(
      this._fragmentFiber
    );
    return l === null ? this : H(l).getRootNode(t);
  }, Ol.prototype.compareDocumentPosition = function(t) {
    var l = N(
      this._fragmentFiber
    );
    if (l === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var e = [];
    m(
      this._fragmentFiber.child,
      !1,
      us,
      e,
      void 0,
      void 0
    );
    var n = H(l);
    if (e.length === 0) {
      if (e = n, R(this._fragmentFiber)) {
        t: {
          for (l = this._fragmentFiber.return; l !== null; ) {
            if (l.tag === 4) {
              l = l.stateNode.containerInfo;
              break t;
            }
            if (l.tag === 3 || l.tag === 5 || l.tag === 27)
              break;
            l = l.return;
          }
          l = null;
        }
        l != null && (e = l);
      }
      l = this._fragmentFiber;
      var a = n = e.compareDocumentPosition(t);
      return e === t ? a = Node.DOCUMENT_POSITION_CONTAINS : n & Node.DOCUMENT_POSITION_CONTAINED_BY && (e = U(l)[1], e === null ? a = Node.DOCUMENT_POSITION_PRECEDING : (t = H(e).compareDocumentPosition(
        t
      ), a = t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), a |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    l = H(e[0]), a = H(e[e.length - 1]);
    var i = R(this._fragmentFiber) ? l.parentElement : n;
    if (i == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    n = i.compareDocumentPosition(l) & Node.DOCUMENT_POSITION_CONTAINED_BY, i = i.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var s = l.compareDocumentPosition(t), h = a.compareDocumentPosition(t), g = s & Node.DOCUMENT_POSITION_CONTAINED_BY || h & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return h = n && i && s & Node.DOCUMENT_POSITION_FOLLOWING && h & Node.DOCUMENT_POSITION_PRECEDING, l = n && l === t || i && a === t || g || h ? Node.DOCUMENT_POSITION_CONTAINED_BY : !n && l === t || !i && a === t ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : s, l & Node.DOCUMENT_POSITION_DISCONNECTED || l & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || tg(
      l,
      this._fragmentFiber,
      e[0],
      e[e.length - 1],
      t
    ) ? l : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function tg(t, l, e, n, a) {
    var i = $e(a);
    if (t & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (e = !!i)
        t: {
          for (; i !== null; ) {
            if (i.tag === 7 && (i === l || i.alternate === l)) {
              e = !0;
              break t;
            }
            i = i.return;
          }
          e = !1;
        }
      return e;
    }
    if (t & Node.DOCUMENT_POSITION_CONTAINS) {
      if (i === null)
        return i = a.ownerDocument, a === i || a === i.documentElement || a === i.body;
      t: {
        for (i = l, l = N(l); i !== null; ) {
          if (!(i.tag !== 5 && i.tag !== 3 && i.tag !== 27 || i !== l && i.alternate !== l)) {
            i = !0;
            break t;
          }
          i = i.return;
        }
        i = !1;
      }
      return i;
    }
    return t & Node.DOCUMENT_POSITION_PRECEDING ? ((l = !!i) && !(l = i === e) && (l = W(
      e,
      i,
      J
    ), l === null ? l = !1 : (m(
      l,
      !0,
      $,
      i,
      e
    ), i = G, G = null, l = i !== null)), l) : t & Node.DOCUMENT_POSITION_FOLLOWING ? ((l = !!i) && !(l = i === n) && (l = W(
      n,
      i,
      J
    ), l === null ? l = !1 : (m(
      l,
      !0,
      K,
      i,
      n
    ), i = G, at = G = null, l = i !== null)), l) : !1;
  }
  function M1(t, l) {
    var e = t.ownerDocument.createRange();
    e.selectNodeContents(t), t = e.getBoundingClientRect(), window.scrollTo(
      window.scrollX + t.left,
      l ? window.scrollY + t.top : window.scrollY + t.bottom - window.innerHeight
    );
  }
  Ol.prototype.scrollIntoView = function(t) {
    if (typeof t == "object") throw Error(r(566));
    var l = [];
    m(
      this._fragmentFiber.child,
      !1,
      us,
      l,
      void 0,
      void 0
    );
    var e = t !== !1;
    if (l.length === 0) {
      var n = U(
        this._fragmentFiber
      );
      if (n = e ? n[1] || n[0] || N(this._fragmentFiber) : n[0] || n[1], n === null) return;
      if (n.tag === 6) {
        t = H(n), M1(t, e);
        return;
      }
      if (n = H(n), n.nodeType !== 9) {
        if (n.nodeType === 11) {
          e = "host" in n ? n.host : null, e !== null && e.scrollIntoView(t);
          return;
        }
        n.scrollIntoView(t);
      }
    }
    for (n = e ? l.length - 1 : 0; n !== (e ? -1 : l.length); ) {
      var a = l[n];
      a.tag === 6 ? (a = H(a), M1(a, e)) : H(a).scrollIntoView(t), n += e ? -1 : 1;
    }
  };
  function lg(t, l) {
    return t = H(t), p1(t, l), !1;
  }
  function p1(t, l) {
    t.reactFragments == null && (t.reactFragments = /* @__PURE__ */ new Set()), t.reactFragments.add(l);
  }
  function N1(t, l) {
    var e = l._eventListeners;
    if (e !== null)
      for (var n = 0; n < e.length; n++) {
        var a = e[n];
        t.addEventListener(
          a.type,
          a.attachedListener,
          ea(a.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (e = l._observers, e !== null && e.forEach(function(i) {
      for (var s = 0, h = 0; h < Vl.length; h++) {
        var g = Vl[h];
        (g.fragmentInstance !== l || g.observer !== i || g.instance !== t) && (Vl[s++] = g);
      }
      Vl.length = s, i.observe(t);
    }), p1(t, l));
  }
  function eg(t, l) {
    var e = l._eventListeners;
    if (e !== null)
      for (var n = 0; n < e.length; n++) {
        var a = e[n];
        t.removeEventListener(
          a.type,
          a.attachedListener,
          ea(a.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (e = l._observers, e !== null && e.forEach(function(i) {
      typeof i.rootMargin == "string" ? kv(
        l,
        i,
        t
      ) : i.unobserve(t);
    }), t.reactFragments != null && t.reactFragments.delete(l));
  }
  function fs(t) {
    var l = t.firstChild;
    for (l && l.nodeType === 10 && (l = l.nextSibling); l; ) {
      var e = l;
      switch (l = l.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          fs(e), mu(e);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (e.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(e);
    }
  }
  function ng(t, l, e, n) {
    for (; t.nodeType === 1; ) {
      var a = e;
      if (t.nodeName.toLowerCase() !== l.toLowerCase()) {
        if (!n && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (n) {
        if (!t[va])
          switch (l) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (i = t.getAttribute("rel"), i === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (i !== a.rel || t.getAttribute("href") !== (a.href == null || a.href === "" ? null : a.href) || t.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin) || t.getAttribute("title") !== (a.title == null ? null : a.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (i = t.getAttribute("src"), (i !== (a.src == null ? null : a.src) || t.getAttribute("type") !== (a.type == null ? null : a.type) || t.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin)) && i && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (l === "input" && t.type === "hidden") {
        var i = a.name == null ? null : "" + a.name;
        if (a.type === "hidden" && t.getAttribute("name") === i)
          return t;
      } else return t;
      if (t = Hl(t.nextSibling), t === null) break;
    }
    return null;
  }
  function ag(t, l, e) {
    if (l === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Hl(t.nextSibling), t === null)) return null;
    return t;
  }
  function C1(t, l) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = Hl(t.nextSibling), t === null)) return null;
    return t;
  }
  function cs(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function ss(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function ug(t, l) {
    var e = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = l;
    else if (t.data !== "$?" || e.readyState !== "loading")
      l();
    else {
      var n = function() {
        l(), e.removeEventListener("DOMContentLoaded", n);
      };
      e.addEventListener("DOMContentLoaded", n), t._reactRetry = n;
    }
  }
  function Hl(t) {
    for (; t != null; t = t.nextSibling) {
      var l = t.nodeType;
      if (l === 1 || l === 3) break;
      if (l === 8) {
        if (l = t.data, l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&" || l === "F!" || l === "F")
          break;
        if (l === "/$" || l === "/&") return null;
      }
    }
    return t;
  }
  var rs = null;
  function D1(t) {
    t = t.nextSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var e = t.data;
        if (e === "/$" || e === "/&") {
          if (l === 0)
            return Hl(t.nextSibling);
          l--;
        } else
          e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || l++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function x1(t) {
    t = t.previousSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var e = t.data;
        if (e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&") {
          if (l === 0) return t;
          l--;
        } else e !== "/$" && e !== "/&" || l++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function ig(t, l) {
    function e() {
      n = !0;
    }
    if (t.ownerDocument.activeElement === t) return !0;
    var n = !1;
    try {
      t.ownerDocument.addEventListener("focus", e, !0), (t.focus || HTMLElement.prototype.focus).call(t, l);
    } finally {
      t.ownerDocument.removeEventListener("focus", e, !0);
    }
    return n;
  }
  function fg(t) {
    y1(function() {
      y1(function(l) {
        return t(l);
      });
    });
  }
  function R1(t, l, e) {
    switch (l = Wa(e), t) {
      case "html":
        if (t = l.documentElement, !t) throw Error(r(452));
        return t;
      case "head":
        if (t = l.head, !t) throw Error(r(453));
        return t;
      case "body":
        if (t = l.body, !t) throw Error(r(454));
        return t;
      default:
        throw Error(r(451));
    }
  }
  function U1(t, l, e) {
    for (var n in e) {
      var a = e[n];
      e.hasOwnProperty(n) && a != null && Ct(t, l, n, null, Bv, a);
    }
    e.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === Jl && (t.onclick = null), mu(t);
  }
  function hs(t) {
    for (var l = t.attributes; l.length; )
      t.removeAttributeNode(l[0]);
    mu(t);
  }
  var ql = /* @__PURE__ */ new Map(), H1 = /* @__PURE__ */ new Set();
  function Ia(t) {
    if (typeof t.getRootNode == "function") {
      var l = t.getRootNode();
      if (l.nodeType === 9 || l.nodeType === 11) return l;
    }
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Se = et.d;
  et.d = {
    f: cg,
    r: sg,
    D: rg,
    C: hg,
    L: og,
    m: dg,
    X: gg,
    S: vg,
    M: mg
  };
  function cg() {
    var t = Se.f(), l = Ei();
    return t || l;
  }
  function sg(t) {
    var l = bn(t);
    l !== null && l.tag === 5 && l.type === "form" ? Bh(l) : Se.r(t);
  }
  var na = typeof document > "u" ? null : document;
  function q1(t, l, e) {
    var n = na;
    if (n && typeof l == "string" && l) {
      var a = pl(l);
      a = 'link[rel="' + t + '"][href="' + a + '"]', typeof e == "string" && (a += '[crossorigin="' + e + '"]'), H1.has(a) || (H1.add(a), t = { rel: t, crossOrigin: e, href: l }, n.querySelector(a) === null && (l = n.createElement("link"), el(l, "link", t), Kt(l), n.head.appendChild(l)));
    }
  }
  function rg(t) {
    Se.D(t), q1("dns-prefetch", t, null);
  }
  function hg(t, l) {
    Se.C(t, l), q1("preconnect", t, l);
  }
  function og(t, l, e) {
    Se.L(t, l, e);
    var n = na;
    if (n && t && l) {
      var a = 'link[rel="preload"][as="' + pl(l) + '"]';
      l === "image" && e && e.imageSrcSet ? (a += '[imagesrcset="' + pl(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (a += '[imagesizes="' + pl(
        e.imageSizes
      ) + '"]')) : a += '[href="' + pl(t) + '"]';
      var i = a;
      switch (l) {
        case "style":
          i = aa(t);
          break;
        case "script":
          i = ua(t);
      }
      if (!(ql.has(i) || (t = V(
        {
          rel: "preload",
          href: l === "image" && e && e.imageSrcSet ? void 0 : t,
          as: l
        },
        e
      ), ql.set(i, t), n.querySelector(a) !== null || l === "style" && n.querySelector(ka(i)) || l === "script" && n.querySelector(Pa(i))))) {
        var s = n.createElement("link");
        el(s, "link", t), l === "style" && (s[gu] = !0, s.onload = s.onerror = function() {
          Fs(s);
        }), Kt(s), n.head.appendChild(s);
      }
    }
  }
  function dg(t, l) {
    Se.m(t, l);
    var e = na;
    if (e && t) {
      var n = l && typeof l.as == "string" ? l.as : "script", a = 'link[rel="modulepreload"][as="' + pl(n) + '"][href="' + pl(t) + '"]', i = a;
      switch (n) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          i = ua(t);
      }
      if (!ql.has(i) && (t = V({ rel: "modulepreload", href: t }, l), ql.set(i, t), e.querySelector(a) === null)) {
        switch (n) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(Pa(i)))
              return;
        }
        n = e.createElement("link"), el(n, "link", t), Kt(n), e.head.appendChild(n);
      }
    }
  }
  function vg(t, l, e) {
    Se.S(t, l, e);
    var n = na;
    if (n && t) {
      var a = _n(n).hoistableStyles, i = aa(t);
      l = l || "default";
      var s = a.get(i);
      if (!s) {
        var h = { loading: 0, preload: null };
        if (s = n.querySelector(
          ka(i)
        ))
          h.loading = 5;
        else {
          t = V(
            { rel: "stylesheet", href: t, "data-precedence": l },
            e
          ), (e = ql.get(i)) && os(t, e);
          var g = s = n.createElement("link");
          Kt(g), el(g, "link", t), g._p = new Promise(function(z, p) {
            g.onload = z, g.onerror = p;
          }), g.addEventListener("load", function() {
            h.loading |= 1;
          }), g.addEventListener("error", function() {
            h.loading |= 2;
          }), h.loading |= 4, Mi(s, l, n);
        }
        s = {
          type: "stylesheet",
          instance: s,
          count: 1,
          state: h
        }, a.set(i, s);
      }
    }
  }
  function gg(t, l) {
    Se.X(t, l);
    var e = na;
    if (e && t) {
      var n = _n(e).hoistableScripts, a = ua(t), i = n.get(a);
      i || (i = e.querySelector(Pa(a)), i || (t = V({ src: t, async: !0 }, l), (l = ql.get(a)) && ds(t, l), i = e.createElement("script"), Kt(i), el(i, "link", t), e.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, n.set(a, i));
    }
  }
  function mg(t, l) {
    Se.M(t, l);
    var e = na;
    if (e && t) {
      var n = _n(e).hoistableScripts, a = ua(t), i = n.get(a);
      i || (i = e.querySelector(Pa(a)), i || (t = V({ src: t, async: !0, type: "module" }, l), (l = ql.get(a)) && ds(t, l), i = e.createElement("script"), Kt(i), el(i, "link", t), e.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, n.set(a, i));
    }
  }
  function B1(t, l, e, n) {
    var a = (a = Ee.current) ? Ia(a) : null;
    if (!a) throw Error(r(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (e = aa(e.href), l = _n(
          a
        ).hoistableStyles, n = l.get(e), n || (n = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(e, n)), n) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          t = aa(e.href);
          var i = _n(
            a
          ).hoistableStyles, s = i.get(t);
          if (s || (a = a.ownerDocument || a, s = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, i.set(t, s), (i = a.querySelector(
            ka(t)
          )) ? i._p || (s.instance = i, s.state.loading = 5) : (i = ql.get(t), i || (i = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, ql.set(t, i)), yg(
            a,
            t,
            i,
            s.state
          ))), l && n === null)
            throw Error(r(528, ""));
          return s;
        }
        if (l && n !== null)
          throw Error(r(529, ""));
        return null;
      case "script":
        return l = e.async, e = e.src, typeof e == "string" && l && typeof l != "function" && typeof l != "symbol" ? (e = ua(e), l = _n(
          a
        ).hoistableScripts, n = l.get(e), n || (n = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, l.set(e, n)), n) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(r(444, t));
    }
  }
  function aa(t) {
    return 'href="' + pl(t) + '"';
  }
  function ka(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Y1(t) {
    return V({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function yg(t, l, e, n) {
    if (l = t.querySelector(
      'link[rel="preload"][as="style"][' + l + "]"
    )) {
      if (l[gu] !== !0) {
        n.loading = 1;
        return;
      }
    } else
      l = t.createElement("link"), l[gu] = !0, l.onload = l.onerror = Fs.bind(null, l), el(l, "link", e), Kt(l), t.head.appendChild(l);
    n.preload = l, l.addEventListener("load", function() {
      return n.loading |= 1;
    }), l.addEventListener("error", function() {
      return n.loading |= 2;
    });
  }
  function ua(t) {
    return '[src="' + pl(t) + '"]';
  }
  function Pa(t) {
    return "script[async]" + t;
  }
  function G1(t, l, e) {
    if (l.count++, l.instance === null)
      switch (l.type) {
        case "style":
          var n = t.querySelector(
            'style[data-href~="' + pl(e.href) + '"]'
          );
          if (n)
            return l.instance = n, Kt(n), n;
          var a = V({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return n = (t.ownerDocument || t).createElement(
            "style"
          ), Kt(n), el(n, "style", a), Mi(n, e.precedence, t), l.instance = n;
        case "stylesheet":
          a = aa(e.href);
          var i = t.querySelector(
            ka(a)
          );
          if (i)
            return l.state.loading |= 4, l.instance = i, Kt(i), i;
          n = Y1(e), (a = ql.get(a)) && os(n, a), i = (t.ownerDocument || t).createElement("link"), Kt(i);
          var s = i;
          return s._p = new Promise(function(h, g) {
            s.onload = h, s.onerror = g;
          }), el(i, "link", n), l.state.loading |= 4, Mi(i, e.precedence, t), l.instance = i;
        case "script":
          return i = ua(e.src), (a = t.querySelector(
            Pa(i)
          )) ? (l.instance = a, Kt(a), a) : (n = e, (a = ql.get(i)) && (n = V({}, e), ds(n, a)), t = t.ownerDocument || t, a = t.createElement("script"), Kt(a), el(a, "link", n), t.head.appendChild(a), l.instance = a);
        case "void":
          return null;
        default:
          throw Error(r(443, l.type));
      }
    else
      l.type === "stylesheet" && (l.state.loading & 4) === 0 && (n = l.instance, l.state.loading |= 4, Mi(n, e.precedence, t));
    return l.instance;
  }
  function Mi(t, l, e) {
    for (var n = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), a = n.length ? n[n.length - 1] : null, i = a, s = 0; s < n.length; s++) {
      var h = n[s];
      if (h.dataset.precedence === l) i = h;
      else if (i !== a) break;
    }
    i ? i.parentNode.insertBefore(t, i.nextSibling) : (l = e.nodeType === 9 ? e.head : e, l.insertBefore(t, l.firstChild));
  }
  function os(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.title == null && (t.title = l.title);
  }
  function ds(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.integrity == null && (t.integrity = l.integrity);
  }
  var pi = null;
  function X1(t, l, e) {
    if (pi === null) {
      var n = /* @__PURE__ */ new Map(), a = pi = /* @__PURE__ */ new Map();
      a.set(e, n);
    } else
      a = pi, n = a.get(e), n || (n = /* @__PURE__ */ new Map(), a.set(e, n));
    if (n.has(t)) return n;
    for (n.set(t, null), e = e.getElementsByTagName(t), a = 0; a < e.length; a++) {
      var i = e[a];
      if (!(i[va] || i[It] || t === "link" && i.getAttribute("rel") === "stylesheet") && i.namespaceURI !== "http://www.w3.org/2000/svg") {
        var s = i.getAttribute(l) || "";
        s = t + s;
        var h = n.get(s);
        h ? h.push(i) : n.set(s, [i]);
      }
    }
    return n;
  }
  function vs(t, l, e) {
    t = t.ownerDocument || t, t.head.insertBefore(
      e,
      l === "title" ? t.querySelector("head > title") : null
    );
  }
  function Sg(t, l, e) {
    if (e === 1 || l.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof l.precedence != "string" || typeof l.href != "string" || l.href === "")
          break;
        return !0;
      case "link":
        if (typeof l.rel != "string" || typeof l.href != "string" || l.href === "" || l.onLoad || l.onError)
          break;
        return l.rel === "stylesheet" ? (t = l.disabled, typeof l.precedence == "string" && t == null) : !0;
      case "script":
        if (l.async && typeof l.async != "function" && typeof l.async != "symbol" && !l.onLoad && !l.onError && l.src && typeof l.src == "string")
          return !0;
    }
    return !1;
  }
  function L1(t, l) {
    return t === "img" && l.src != null && l.src !== "" && l.onLoad == null && l.loading !== "lazy";
  }
  function Q1(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function V1(t) {
    return (t.width || 100) * (t.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function j1(t, l) {
    typeof l.decode == "function" && (t.imgCount++, l.complete || (t.imgBytes += V1(l), t.suspenseyImages.push(l)), t = bg.bind(t), l.decode().then(t, t));
  }
  function Eg(t, l, e, n) {
    if (e.type === "stylesheet" && (typeof n.media != "string" || matchMedia(n.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var a = aa(n.href), i = l.querySelector(
          ka(a)
        );
        if (i) {
          l = i._p, l !== null && typeof l == "object" && typeof l.then == "function" && (t.count++, t = tu.bind(t), l.then(t, t)), e.state.loading |= 4, e.instance = i, Kt(i);
          return;
        }
        i = l.ownerDocument || l, n = Y1(n), (a = ql.get(a)) && os(n, a), i = i.createElement("link"), Kt(i);
        var s = i;
        s._p = new Promise(function(h, g) {
          s.onload = h, s.onerror = g;
        }), el(i, "link", n), e.instance = i;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(e, l), (l = e.state.preload) && (e.state.loading & 3) === 0 && (t.count++, e = tu.bind(t), l.addEventListener("load", e), l.addEventListener("error", e));
    }
  }
  var Ni = 0;
  function Tg(t, l) {
    return t.stylesheets && t.count === 0 && Di(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(e) {
      var n = setTimeout(function() {
        if (t.stylesheets && Di(t, t.stylesheets), t.unsuspend) {
          var i = t.unsuspend;
          t.unsuspend = null, i();
        }
      }, 6e4 + l);
      0 < t.imgBytes && Ni === 0 && (Ni = 62500 * Gv());
      var a = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Di(t, t.stylesheets), t.unsuspend)) {
            var i = t.unsuspend;
            t.unsuspend = null, i();
          }
        },
        (t.imgBytes > Ni ? 50 : 800) + l
      );
      return t.unsuspend = e, function() {
        t.unsuspend = null, clearTimeout(n), clearTimeout(a);
      };
    } : null;
  }
  function Z1(t) {
    if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
      if (t.stylesheets) Di(t, t.stylesheets);
      else if (t.unsuspend) {
        var l = t.unsuspend;
        t.unsuspend = null, l();
      }
    }
  }
  function tu() {
    this.count--, Z1(this);
  }
  function bg() {
    this.imgCount--, Z1(this);
  }
  var Ci = null;
  function Di(t, l) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Ci = /* @__PURE__ */ new Map(), l.forEach(_g, t), Ci = null, tu.call(t));
  }
  function _g(t, l) {
    if (!(l.state.loading & 4)) {
      var e = Ci.get(t);
      if (e) var n = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), Ci.set(t, e);
        for (var a = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), i = 0; i < a.length; i++) {
          var s = a[i];
          (s.nodeName === "LINK" || s.getAttribute("media") !== "not all") && (e.set(s.dataset.precedence, s), n = s);
        }
        n && e.set(null, n);
      }
      a = l.instance, s = a.getAttribute("data-precedence"), i = e.get(s) || n, i === n && e.set(null, a), e.set(s, a), this.count++, n = tu.bind(this), a.addEventListener("load", n), a.addEventListener("error", n), i ? i.parentNode.insertBefore(a, i.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(a, t.firstChild)), l.state.loading |= 4;
    }
  }
  var ia = {
    $$typeof: zt,
    Provider: null,
    Consumer: null,
    _currentValue: Bl,
    _currentValue2: Bl,
    _threadCount: 0
  };
  function zg(t, l, e, n, a, i, s, h, g) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ji(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ji(0), this.hiddenUpdates = Ji(null), this.identifierPrefix = n, this.onUncaughtError = a, this.onCaughtError = i, this.onRecoverableError = s, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = g, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function w1(t, l, e, n, a, i, s, h, g, z, p, x) {
    return t = new zg(
      t,
      l,
      e,
      s,
      g,
      z,
      p,
      x,
      h
    ), l = 1, i === !0 && (l |= 24), i = rl(3, null, null, l), t.current = i, i.stateNode = t, l = Cf(), l.refCount++, t.pooledCache = l, l.refCount++, i.memoizedState = {
      element: n,
      isDehydrated: e,
      cache: l
    }, Uf(i), t;
  }
  function K1(t) {
    return t ? (t = Rn, t) : Rn;
  }
  function J1(t, l, e, n, a, i) {
    a = K1(a), n.context === null ? n.context = a : n.pendingContext = a, n = De(l), n.payload = { element: e }, i = i === void 0 ? null : i, i !== null && (n.callback = i), e = xe(t, n, l), e !== null && (vl(e, t, l), xa(e, t, l));
  }
  function F1(t, l) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var e = t.retryLane;
      t.retryLane = e !== 0 && e < l ? e : l;
    }
  }
  function gs(t, l) {
    F1(t, l), (t = t.alternate) && F1(t, l);
  }
  function $1(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = Pe(t, 67108864);
      l !== null && vl(l, t, 67108864), gs(t, 67108864);
    }
  }
  function W1(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = Al();
      l = Fi(l);
      var e = Pe(t, l);
      e !== null && vl(e, t, l), gs(t, l);
    }
  }
  var fa = !0;
  function Ag(t, l, e, n) {
    var a = w.T;
    w.T = null;
    var i = et.p;
    try {
      et.p = 2, ms(t, l, e, n);
    } finally {
      et.p = i, w.T = a;
    }
  }
  function Og(t, l, e, n) {
    var a = w.T;
    w.T = null;
    var i = et.p;
    try {
      et.p = 8, ms(t, l, e, n);
    } finally {
      et.p = i, w.T = a;
    }
  }
  function ms(t, l, e, n) {
    if (fa) {
      var a = ys(n);
      if (a === null)
        Ic(
          t,
          l,
          n,
          xi,
          e
        ), k1(t, n);
      else if (pg(
        a,
        t,
        l,
        e,
        n
      ))
        n.stopPropagation();
      else if (k1(t, n), l & 4 && -1 < Mg.indexOf(t)) {
        for (; a !== null; ) {
          var i = bn(a);
          if (i !== null)
            switch (i.tag) {
              case 3:
                if (i = i.stateNode, i.current.memoizedState.isDehydrated) {
                  var s = Fe(i.pendingLanes);
                  if (s !== 0) {
                    var h = i;
                    for (h.pendingLanes |= 2, h.entangledLanes |= 2; s; ) {
                      var g = 1 << 31 - yl(s);
                      h.entanglements[1] |= g, s &= ~g;
                    }
                    ne(i), (Ot & 6) === 0 && (mi = gl() + 500, Ja(0));
                  }
                }
                break;
              case 31:
              case 13:
                h = Pe(i, 2), h !== null && vl(h, i, 2), Ei(), gs(i, 2);
            }
          if (i = ys(n), i === null && Ic(
            t,
            l,
            n,
            xi,
            e
          ), i === a) break;
          a = i;
        }
        a !== null && n.stopPropagation();
      } else
        Ic(
          t,
          l,
          n,
          null,
          e
        );
    }
  }
  function ys(t) {
    return t = lf(t), Ss(t);
  }
  var xi = null;
  function Ss(t) {
    if (xi = null, t = $e(t), t !== null) {
      var l = d(t);
      if (l === null) t = null;
      else {
        var e = l.tag;
        if (e === 13) {
          if (t = v(l), t !== null) return t;
          t = null;
        } else if (e === 31) {
          if (t = E(l), t !== null) return t;
          t = null;
        } else if (e === 3) {
          if (l.stateNode.current.memoizedState.isDehydrated)
            return l.tag === 3 ? l.stateNode.containerInfo : null;
          t = null;
        } else l !== t && (t = null);
      }
    }
    return xi = t, null;
  }
  function I1(t) {
    switch (t) {
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
        switch (Go()) {
          case Bs:
            return 2;
          case Ys:
            return 8;
          case ru:
          case Xo:
            return 32;
          case Gs:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Es = !1, je = null, Ze = null, we = null, lu = /* @__PURE__ */ new Map(), eu = /* @__PURE__ */ new Map(), Ke = [], Mg = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function k1(t, l) {
    switch (t) {
      case "focusin":
      case "focusout":
        je = null;
        break;
      case "dragenter":
      case "dragleave":
        Ze = null;
        break;
      case "mouseover":
      case "mouseout":
        we = null;
        break;
      case "pointerover":
      case "pointerout":
        lu.delete(l.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        eu.delete(l.pointerId);
    }
  }
  function nu(t, l, e, n, a, i) {
    return t === null || t.nativeEvent !== i ? (t = {
      blockedOn: l,
      domEventName: e,
      eventSystemFlags: n,
      nativeEvent: i,
      targetContainers: [a]
    }, l !== null && (l = bn(l), l !== null && $1(l)), t) : (t.eventSystemFlags |= n, l = t.targetContainers, a !== null && l.indexOf(a) === -1 && l.push(a), t);
  }
  function pg(t, l, e, n, a) {
    switch (l) {
      case "focusin":
        return je = nu(
          je,
          t,
          l,
          e,
          n,
          a
        ), !0;
      case "dragenter":
        return Ze = nu(
          Ze,
          t,
          l,
          e,
          n,
          a
        ), !0;
      case "mouseover":
        return we = nu(
          we,
          t,
          l,
          e,
          n,
          a
        ), !0;
      case "pointerover":
        var i = a.pointerId;
        return lu.set(
          i,
          nu(
            lu.get(i) || null,
            t,
            l,
            e,
            n,
            a
          )
        ), !0;
      case "gotpointercapture":
        return i = a.pointerId, eu.set(
          i,
          nu(
            eu.get(i) || null,
            t,
            l,
            e,
            n,
            a
          )
        ), !0;
    }
    return !1;
  }
  function P1(t) {
    var l = $e(t.target);
    if (l !== null) {
      var e = d(l);
      if (e !== null) {
        if (l = e.tag, l === 13) {
          if (l = v(e), l !== null) {
            t.blockedOn = l, ws(t.priority, function() {
              W1(e);
            });
            return;
          }
        } else if (l === 31) {
          if (l = E(e), l !== null) {
            t.blockedOn = l, ws(t.priority, function() {
              W1(e);
            });
            return;
          }
        } else if (l === 3 && e.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Ri(t) {
    if (t.blockedOn !== null) return !1;
    for (var l = t.targetContainers; 0 < l.length; ) {
      var e = ys(t.nativeEvent);
      if (e === null) {
        e = t.nativeEvent;
        var n = new e.constructor(
          e.type,
          e
        );
        tf = n, e.target.dispatchEvent(n), tf = null;
      } else
        return l = bn(e), l !== null && $1(l), t.blockedOn = e, !1;
      l.shift();
    }
    return !0;
  }
  function to(t, l, e) {
    Ri(t) && e.delete(l);
  }
  function Ng() {
    Es = !1, je !== null && Ri(je) && (je = null), Ze !== null && Ri(Ze) && (Ze = null), we !== null && Ri(we) && (we = null), lu.forEach(to), eu.forEach(to);
  }
  function Ui(t, l) {
    t.blockedOn === l && (t.blockedOn = null, Es || (Es = !0, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      Ng
    )));
  }
  var Hi = null;
  function lo(t) {
    Hi !== t && (Hi = t, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      function() {
        Hi === t && (Hi = null);
        for (var l = 0; l < t.length; l += 3) {
          var e = t[l], n = t[l + 1], a = t[l + 2];
          if (typeof n != "function") {
            if (Ss(n || e) === null)
              continue;
            break;
          }
          var i = bn(e);
          i !== null && (t.splice(l, 3), l -= 3, tc(
            i,
            {
              pending: !0,
              data: a,
              method: e.method,
              action: n
            },
            n,
            a
          ));
        }
      }
    ));
  }
  function ca(t) {
    function l(g) {
      return Ui(g, t);
    }
    je !== null && Ui(je, t), Ze !== null && Ui(Ze, t), we !== null && Ui(we, t), lu.forEach(l), eu.forEach(l);
    for (var e = 0; e < Ke.length; e++) {
      var n = Ke[e];
      n.blockedOn === t && (n.blockedOn = null);
    }
    for (; 0 < Ke.length && (e = Ke[0], e.blockedOn === null); )
      P1(e), e.blockedOn === null && Ke.shift();
    if (e = (t.ownerDocument || t).$$reactFormReplay, e != null)
      for (n = 0; n < e.length; n += 3) {
        var a = e[n], i = e[n + 1], s = a[sl] || null;
        if (typeof i == "function")
          s || lo(e);
        else if (s) {
          var h = null;
          if (i && i.hasAttribute("formAction")) {
            if (a = i, s = i[sl] || null)
              h = s.formAction;
            else if (Ss(a) !== null) continue;
          } else h = s.action;
          typeof h == "function" ? e[n + 1] = h : (e.splice(n, 3), n -= 3), lo(e);
        }
      }
  }
  function eo() {
    function t(i) {
      i.canIntercept && i.info === "react-transition" && i.intercept({
        handler: function() {
          return new Promise(function(s) {
            return a = s;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function l() {
      a !== null && (a(), a = null), n || setTimeout(e, 20);
    }
    function e() {
      if (!n && !navigation.transition) {
        var i = navigation.currentEntry;
        i && i.url != null && navigation.navigate(i.url, {
          state: i.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var n = !1, a = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", l), navigation.addEventListener("navigateerror", l), setTimeout(e, 100), function() {
        n = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", l), navigation.removeEventListener("navigateerror", l), a !== null && (a(), a = null);
      };
    }
  }
  function Ts(t) {
    this._internalRoot = t;
  }
  qi.prototype.render = Ts.prototype.render = function(t) {
    var l = this._internalRoot;
    if (l === null) throw Error(r(409));
    var e = l.current, n = Al();
    J1(e, n, t, l, null, null);
  }, qi.prototype.unmount = Ts.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var l = t.containerInfo;
      J1(t.current, 2, null, t, null, null), Ei(), l[Tn] = null;
    }
  };
  function qi(t) {
    this._internalRoot = t;
  }
  qi.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var l = Zs();
      t = { blockedOn: null, target: t, priority: l };
      for (var e = 0; e < Ke.length && l !== 0 && l < Ke[e].priority; e++) ;
      Ke.splice(e, 0, t), e === 0 && P1(t);
    }
  };
  var no = u.version;
  if (no !== "19.3.0")
    throw Error(
      r(
        527,
        no,
        "19.3.0"
      )
    );
  et.findDOMNode = function(t) {
    var l = t._reactInternals;
    if (l === void 0)
      throw typeof t.render == "function" ? Error(r(188)) : (t = Object.keys(t).join(","), Error(r(268, t)));
    return t = C(l), t = t !== null ? A(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var Cg = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: w,
    reconcilerVersion: "19.3.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Bi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Bi.isDisabled && Bi.supportsFiber)
      try {
        ha = Bi.inject(
          Cg
        ), ml = Bi;
      } catch {
      }
  }
  return uu.createRoot = function(t, l) {
    if (!o(t)) throw Error(r(299));
    var e = !1, n = "", a = Kh, i = Jh, s = Fh;
    return l != null && (l.unstable_strictMode === !0 && (e = !0), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (a = l.onUncaughtError), l.onCaughtError !== void 0 && (i = l.onCaughtError), l.onRecoverableError !== void 0 && (s = l.onRecoverableError)), l = w1(
      t,
      1,
      !1,
      null,
      null,
      e,
      n,
      null,
      a,
      i,
      s,
      eo
    ), t[Tn] = l.current, Wc(t), new Ts(l);
  }, uu.hydrateRoot = function(t, l, e) {
    if (!o(t)) throw Error(r(299));
    var n = !1, a = "", i = Kh, s = Jh, h = Fh, g = null;
    return e != null && (e.unstable_strictMode === !0 && (n = !0), e.identifierPrefix !== void 0 && (a = e.identifierPrefix), e.onUncaughtError !== void 0 && (i = e.onUncaughtError), e.onCaughtError !== void 0 && (s = e.onCaughtError), e.onRecoverableError !== void 0 && (h = e.onRecoverableError), e.formState !== void 0 && (g = e.formState)), l = w1(
      t,
      1,
      !0,
      l,
      e ?? null,
      n,
      a,
      g,
      i,
      s,
      h,
      eo
    ), l.context = K1(null), e = l.current, n = Al(), n = Fi(n), a = De(n), a.callback = null, xe(e, a, n), e = n, l.current.lanes = e, da(l, e), ne(l), t[Tn] = l.current, Wc(t), new qi(l);
  }, uu.version = "19.3.0", uu;
}
var vo;
function Xg() {
  if (vo) return _s.exports;
  vo = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (u) {
        console.error(u);
      }
  }
  return f(), _s.exports = Gg(), _s.exports;
}
var Lg = Xg(), Yi = Us();
function iu(f) {
  let u = f[0], c = f[1], r = f[2];
  return Math.sqrt(u * u + c * c + r * r);
}
function xs(f, u) {
  return f[0] = u[0], f[1] = u[1], f[2] = u[2], f;
}
function Qg(f, u, c, r) {
  return f[0] = u, f[1] = c, f[2] = r, f;
}
function go(f, u, c) {
  return f[0] = u[0] + c[0], f[1] = u[1] + c[1], f[2] = u[2] + c[2], f;
}
function mo(f, u, c) {
  return f[0] = u[0] - c[0], f[1] = u[1] - c[1], f[2] = u[2] - c[2], f;
}
function Vg(f, u, c) {
  return f[0] = u[0] * c[0], f[1] = u[1] * c[1], f[2] = u[2] * c[2], f;
}
function jg(f, u, c) {
  return f[0] = u[0] / c[0], f[1] = u[1] / c[1], f[2] = u[2] / c[2], f;
}
function ps(f, u, c) {
  return f[0] = u[0] * c, f[1] = u[1] * c, f[2] = u[2] * c, f;
}
function Zg(f, u) {
  let c = u[0] - f[0], r = u[1] - f[1], o = u[2] - f[2];
  return Math.sqrt(c * c + r * r + o * o);
}
function wg(f, u) {
  let c = u[0] - f[0], r = u[1] - f[1], o = u[2] - f[2];
  return c * c + r * r + o * o;
}
function yo(f) {
  let u = f[0], c = f[1], r = f[2];
  return u * u + c * c + r * r;
}
function Kg(f, u) {
  return f[0] = -u[0], f[1] = -u[1], f[2] = -u[2], f;
}
function Jg(f, u) {
  return f[0] = 1 / u[0], f[1] = 1 / u[1], f[2] = 1 / u[2], f;
}
function Rs(f, u) {
  let c = u[0], r = u[1], o = u[2], d = c * c + r * r + o * o;
  return d > 0 && (d = 1 / Math.sqrt(d)), f[0] = u[0] * d, f[1] = u[1] * d, f[2] = u[2] * d, f;
}
function xo(f, u) {
  return f[0] * u[0] + f[1] * u[1] + f[2] * u[2];
}
function So(f, u, c) {
  let r = u[0], o = u[1], d = u[2], v = c[0], E = c[1], y = c[2];
  return f[0] = o * y - d * E, f[1] = d * v - r * y, f[2] = r * E - o * v, f;
}
function Fg(f, u, c, r) {
  let o = u[0], d = u[1], v = u[2];
  return f[0] = o + r * (c[0] - o), f[1] = d + r * (c[1] - d), f[2] = v + r * (c[2] - v), f;
}
function $g(f, u, c, r, o) {
  const d = Math.exp(-r * o);
  let v = u[0], E = u[1], y = u[2];
  return f[0] = c[0] + (v - c[0]) * d, f[1] = c[1] + (E - c[1]) * d, f[2] = c[2] + (y - c[2]) * d, f;
}
function Wg(f, u, c) {
  let r = u[0], o = u[1], d = u[2], v = c[3] * r + c[7] * o + c[11] * d + c[15];
  return v = v || 1, f[0] = (c[0] * r + c[4] * o + c[8] * d + c[12]) / v, f[1] = (c[1] * r + c[5] * o + c[9] * d + c[13]) / v, f[2] = (c[2] * r + c[6] * o + c[10] * d + c[14]) / v, f;
}
function Ig(f, u, c) {
  let r = u[0], o = u[1], d = u[2], v = c[3] * r + c[7] * o + c[11] * d + c[15];
  return v = v || 1, f[0] = (c[0] * r + c[4] * o + c[8] * d) / v, f[1] = (c[1] * r + c[5] * o + c[9] * d) / v, f[2] = (c[2] * r + c[6] * o + c[10] * d) / v, f;
}
function kg(f, u, c) {
  let r = u[0], o = u[1], d = u[2];
  return f[0] = r * c[0] + o * c[3] + d * c[6], f[1] = r * c[1] + o * c[4] + d * c[7], f[2] = r * c[2] + o * c[5] + d * c[8], f;
}
function Pg(f, u, c) {
  let r = u[0], o = u[1], d = u[2], v = c[0], E = c[1], y = c[2], C = c[3], A = E * d - y * o, m = y * r - v * d, N = v * o - E * r, R = E * N - y * m, U = y * A - v * N, B = v * m - E * A, H = C * 2;
  return A *= H, m *= H, N *= H, R *= 2, U *= 2, B *= 2, f[0] = r + A + R, f[1] = o + m + U, f[2] = d + N + B, f;
}
const tm = /* @__PURE__ */ (function() {
  const f = [0, 0, 0], u = [0, 0, 0];
  return function(c, r) {
    xs(f, c), xs(u, r), Rs(f, f), Rs(u, u);
    let o = xo(f, u);
    return o > 1 ? 0 : o < -1 ? Math.PI : Math.acos(o);
  };
})();
function lm(f, u) {
  return f[0] === u[0] && f[1] === u[1] && f[2] === u[2];
}
class jl extends Array {
  constructor(u = 0, c = u, r = u) {
    return super(u, c, r), this;
  }
  get x() {
    return this[0];
  }
  get y() {
    return this[1];
  }
  get z() {
    return this[2];
  }
  set x(u) {
    this[0] = u;
  }
  set y(u) {
    this[1] = u;
  }
  set z(u) {
    this[2] = u;
  }
  set(u, c = u, r = u) {
    return u.length ? this.copy(u) : (Qg(this, u, c, r), this);
  }
  copy(u) {
    return xs(this, u), this;
  }
  add(u, c) {
    return c ? go(this, u, c) : go(this, this, u), this;
  }
  sub(u, c) {
    return c ? mo(this, u, c) : mo(this, this, u), this;
  }
  multiply(u) {
    return u.length ? Vg(this, this, u) : ps(this, this, u), this;
  }
  divide(u) {
    return u.length ? jg(this, this, u) : ps(this, this, 1 / u), this;
  }
  inverse(u = this) {
    return Jg(this, u), this;
  }
  // Can't use 'length' as Array.prototype uses it
  len() {
    return iu(this);
  }
  distance(u) {
    return u ? Zg(this, u) : iu(this);
  }
  squaredLen() {
    return yo(this);
  }
  squaredDistance(u) {
    return u ? wg(this, u) : yo(this);
  }
  negate(u = this) {
    return Kg(this, u), this;
  }
  cross(u, c) {
    return c ? So(this, u, c) : So(this, this, u), this;
  }
  scale(u) {
    return ps(this, this, u), this;
  }
  normalize() {
    return Rs(this, this), this;
  }
  dot(u) {
    return xo(this, u);
  }
  equals(u) {
    return lm(this, u);
  }
  applyMatrix3(u) {
    return kg(this, this, u), this;
  }
  applyMatrix4(u) {
    return Wg(this, this, u), this;
  }
  scaleRotateMatrix4(u) {
    return Ig(this, this, u), this;
  }
  applyQuaternion(u) {
    return Pg(this, this, u), this;
  }
  angle(u) {
    return tm(this, u);
  }
  lerp(u, c) {
    return Fg(this, this, u, c), this;
  }
  smoothLerp(u, c, r) {
    return $g(this, this, u, c, r), this;
  }
  clone() {
    return new jl(this[0], this[1], this[2]);
  }
  fromArray(u, c = 0) {
    return this[0] = u[c], this[1] = u[c + 1], this[2] = u[c + 2], this;
  }
  toArray(u = [], c = 0) {
    return u[c] = this[0], u[c + 1] = this[1], u[c + 2] = this[2], u;
  }
  transformDirection(u) {
    const c = this[0], r = this[1], o = this[2];
    return this[0] = u[0] * c + u[4] * r + u[8] * o, this[1] = u[1] * c + u[5] * r + u[9] * o, this[2] = u[2] * c + u[6] * r + u[10] * o, this.normalize();
  }
}
const Eo = /* @__PURE__ */ new jl();
let em = 1, nm = 1, To = !1;
class am {
  constructor(u, c = {}) {
    u.canvas || console.error("gl not passed as first argument to Geometry"), this.gl = u, this.attributes = c, this.id = em++, this.VAOs = {}, this.drawRange = { start: 0, count: 0 }, this.instancedCount = 0, this.gl.renderer.bindVertexArray(null), this.gl.renderer.currentGeometry = null, this.glState = this.gl.renderer.state;
    for (let r in c)
      this.addAttribute(r, c[r]);
  }
  addAttribute(u, c) {
    if (this.attributes[u] = c, c.id = nm++, c.size = c.size || 1, c.type = c.type || (c.data.constructor === Float32Array ? this.gl.FLOAT : c.data.constructor === Uint16Array ? this.gl.UNSIGNED_SHORT : this.gl.UNSIGNED_INT), c.target = u === "index" ? this.gl.ELEMENT_ARRAY_BUFFER : this.gl.ARRAY_BUFFER, c.normalized = c.normalized || !1, c.stride = c.stride || 0, c.offset = c.offset || 0, c.count = c.count || (c.stride ? c.data.byteLength / c.stride : c.data.length / c.size), c.divisor = c.instanced || 0, c.needsUpdate = !1, c.usage = c.usage || this.gl.STATIC_DRAW, c.buffer || this.updateAttribute(c), c.divisor) {
      if (this.isInstanced = !0, this.instancedCount && this.instancedCount !== c.count * c.divisor)
        return console.warn("geometry has multiple instanced buffers of different length"), this.instancedCount = Math.min(this.instancedCount, c.count * c.divisor);
      this.instancedCount = c.count * c.divisor;
    } else u === "index" ? this.drawRange.count = c.count : this.attributes.index || (this.drawRange.count = Math.max(this.drawRange.count, c.count));
  }
  updateAttribute(u) {
    const c = !u.buffer;
    c && (u.buffer = this.gl.createBuffer()), this.glState.boundBuffer !== u.buffer && (this.gl.bindBuffer(u.target, u.buffer), this.glState.boundBuffer = u.buffer), c ? this.gl.bufferData(u.target, u.data, u.usage) : this.gl.bufferSubData(u.target, 0, u.data), u.needsUpdate = !1;
  }
  setIndex(u) {
    this.addAttribute("index", u);
  }
  setDrawRange(u, c) {
    this.drawRange.start = u, this.drawRange.count = c;
  }
  setInstancedCount(u) {
    this.instancedCount = u;
  }
  createVAO(u) {
    this.VAOs[u.attributeOrder] = this.gl.renderer.createVertexArray(), this.gl.renderer.bindVertexArray(this.VAOs[u.attributeOrder]), this.bindAttributes(u);
  }
  bindAttributes(u) {
    u.attributeLocations.forEach((c, { name: r, type: o }) => {
      if (!this.attributes[r]) {
        console.warn(`active attribute ${r} not being supplied`);
        return;
      }
      const d = this.attributes[r];
      this.gl.bindBuffer(d.target, d.buffer), this.glState.boundBuffer = d.buffer;
      let v = 1;
      o === 35674 && (v = 2), o === 35675 && (v = 3), o === 35676 && (v = 4);
      const E = d.size / v, y = v === 1 ? 0 : v * v * 4, C = v === 1 ? 0 : v * 4;
      for (let A = 0; A < v; A++)
        this.gl.vertexAttribPointer(c + A, E, d.type, d.normalized, d.stride + y, d.offset + A * C), this.gl.enableVertexAttribArray(c + A), this.gl.renderer.vertexAttribDivisor(c + A, d.divisor);
    }), this.attributes.index && this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.attributes.index.buffer);
  }
  draw({ program: u, mode: c = this.gl.TRIANGLES }) {
    this.gl.renderer.currentGeometry !== `${this.id}_${u.attributeOrder}` && (this.VAOs[u.attributeOrder] || this.createVAO(u), this.gl.renderer.bindVertexArray(this.VAOs[u.attributeOrder]), this.gl.renderer.currentGeometry = `${this.id}_${u.attributeOrder}`), u.attributeLocations.forEach((o, { name: d }) => {
      const v = this.attributes[d];
      v.needsUpdate && this.updateAttribute(v);
    });
    let r = 2;
    this.attributes.index?.type === this.gl.UNSIGNED_INT && (r = 4), this.isInstanced ? this.attributes.index ? this.gl.renderer.drawElementsInstanced(
      c,
      this.drawRange.count,
      this.attributes.index.type,
      this.attributes.index.offset + this.drawRange.start * r,
      this.instancedCount
    ) : this.gl.renderer.drawArraysInstanced(c, this.drawRange.start, this.drawRange.count, this.instancedCount) : this.attributes.index ? this.gl.drawElements(
      c,
      this.drawRange.count,
      this.attributes.index.type,
      this.attributes.index.offset + this.drawRange.start * r
    ) : this.gl.drawArrays(c, this.drawRange.start, this.drawRange.count);
  }
  getPosition() {
    const u = this.attributes.position;
    if (u.data) return u;
    if (!To)
      return console.warn("No position buffer data found to compute bounds"), To = !0;
  }
  computeBoundingBox(u) {
    u || (u = this.getPosition());
    const c = u.data, r = u.size;
    this.bounds || (this.bounds = {
      min: new jl(),
      max: new jl(),
      center: new jl(),
      scale: new jl(),
      radius: 1 / 0
    });
    const o = this.bounds.min, d = this.bounds.max, v = this.bounds.center, E = this.bounds.scale;
    o.set(1 / 0), d.set(-1 / 0);
    for (let y = 0, C = c.length; y < C; y += r) {
      const A = c[y], m = c[y + 1], N = c[y + 2];
      o.x = Math.min(A, o.x), o.y = Math.min(m, o.y), o.z = Math.min(N, o.z), d.x = Math.max(A, d.x), d.y = Math.max(m, d.y), d.z = Math.max(N, d.z);
    }
    E.sub(d, o), v.add(o, d).divide(2);
  }
  computeBoundingSphere(u) {
    u || (u = this.getPosition());
    const c = u.data, r = u.size;
    this.bounds || this.computeBoundingBox(u);
    let o = 0;
    for (let d = 0, v = c.length; d < v; d += r)
      Eo.fromArray(c, d), o = Math.max(o, this.bounds.center.squaredDistance(Eo));
    this.bounds.radius = Math.sqrt(o);
  }
  remove() {
    for (let u in this.VAOs)
      this.gl.renderer.deleteVertexArray(this.VAOs[u]), delete this.VAOs[u];
    for (let u in this.attributes)
      this.gl.deleteBuffer(this.attributes[u].buffer), delete this.attributes[u];
  }
}
let um = 1;
const bo = {};
class im {
  constructor(u, {
    vertex: c,
    fragment: r,
    uniforms: o = {},
    transparent: d = !1,
    cullFace: v = u.BACK,
    frontFace: E = u.CCW,
    depthTest: y = !0,
    depthWrite: C = !0,
    depthFunc: A = u.LEQUAL
  } = {}) {
    u.canvas || console.error("gl not passed as first argument to Program"), this.gl = u, this.uniforms = o, this.id = um++, c || console.warn("vertex shader not supplied"), r || console.warn("fragment shader not supplied"), this.transparent = d, this.cullFace = v, this.frontFace = E, this.depthTest = y, this.depthWrite = C, this.depthFunc = A, this.blendFunc = {}, this.blendEquation = {}, this.stencilFunc = {}, this.stencilOp = {}, this.transparent && !this.blendFunc.src && (this.gl.renderer.premultipliedAlpha ? this.setBlendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA) : this.setBlendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA)), this.vertexShader = u.createShader(u.VERTEX_SHADER), this.fragmentShader = u.createShader(u.FRAGMENT_SHADER), this.program = u.createProgram(), u.attachShader(this.program, this.vertexShader), u.attachShader(this.program, this.fragmentShader), this.setShaders({ vertex: c, fragment: r });
  }
  setShaders({ vertex: u, fragment: c }) {
    if (u && (this.gl.shaderSource(this.vertexShader, u), this.gl.compileShader(this.vertexShader), this.gl.getShaderInfoLog(this.vertexShader) !== "" && console.warn(`${this.gl.getShaderInfoLog(this.vertexShader)}
Vertex Shader
${_o(u)}`)), c && (this.gl.shaderSource(this.fragmentShader, c), this.gl.compileShader(this.fragmentShader), this.gl.getShaderInfoLog(this.fragmentShader) !== "" && console.warn(`${this.gl.getShaderInfoLog(this.fragmentShader)}
Fragment Shader
${_o(c)}`)), this.gl.linkProgram(this.program), !this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS))
      return console.warn(this.gl.getProgramInfoLog(this.program));
    this.uniformLocations = /* @__PURE__ */ new Map();
    let r = this.gl.getProgramParameter(this.program, this.gl.ACTIVE_UNIFORMS);
    for (let v = 0; v < r; v++) {
      let E = this.gl.getActiveUniform(this.program, v);
      this.uniformLocations.set(E, this.gl.getUniformLocation(this.program, E.name));
      const y = E.name.match(/(\w+)/g);
      E.uniformName = y[0], E.nameComponents = y.slice(1);
    }
    this.attributeLocations = /* @__PURE__ */ new Map();
    const o = [], d = this.gl.getProgramParameter(this.program, this.gl.ACTIVE_ATTRIBUTES);
    for (let v = 0; v < d; v++) {
      const E = this.gl.getActiveAttrib(this.program, v), y = this.gl.getAttribLocation(this.program, E.name);
      y !== -1 && (o[y] = E.name, this.attributeLocations.set(E, y));
    }
    this.attributeOrder = o.join("");
  }
  setBlendFunc(u, c, r, o) {
    this.blendFunc.src = u, this.blendFunc.dst = c, this.blendFunc.srcAlpha = r, this.blendFunc.dstAlpha = o, u && (this.transparent = !0);
  }
  setBlendEquation(u, c) {
    this.blendEquation.modeRGB = u, this.blendEquation.modeAlpha = c;
  }
  setStencilFunc(u, c, r) {
    this.stencilRef = c, this.stencilFunc.func = u, this.stencilFunc.ref = c, this.stencilFunc.mask = r;
  }
  setStencilOp(u, c, r) {
    this.stencilOp.stencilFail = u, this.stencilOp.depthFail = c, this.stencilOp.depthPass = r;
  }
  applyState() {
    this.depthTest ? this.gl.renderer.enable(this.gl.DEPTH_TEST) : this.gl.renderer.disable(this.gl.DEPTH_TEST), this.cullFace ? this.gl.renderer.enable(this.gl.CULL_FACE) : this.gl.renderer.disable(this.gl.CULL_FACE), this.blendFunc.src ? this.gl.renderer.enable(this.gl.BLEND) : this.gl.renderer.disable(this.gl.BLEND), this.cullFace && this.gl.renderer.setCullFace(this.cullFace), this.gl.renderer.setFrontFace(this.frontFace), this.gl.renderer.setDepthMask(this.depthWrite), this.gl.renderer.setDepthFunc(this.depthFunc), this.blendFunc.src && this.gl.renderer.setBlendFunc(this.blendFunc.src, this.blendFunc.dst, this.blendFunc.srcAlpha, this.blendFunc.dstAlpha), this.gl.renderer.setBlendEquation(this.blendEquation.modeRGB, this.blendEquation.modeAlpha), this.stencilFunc.func || this.stencilOp.stencilFail ? this.gl.renderer.enable(this.gl.STENCIL_TEST) : this.gl.renderer.disable(this.gl.STENCIL_TEST), this.gl.renderer.setStencilFunc(this.stencilFunc.func, this.stencilFunc.ref, this.stencilFunc.mask), this.gl.renderer.setStencilOp(this.stencilOp.stencilFail, this.stencilOp.depthFail, this.stencilOp.depthPass);
  }
  use({ flipFaces: u = !1 } = {}) {
    let c = -1;
    this.gl.renderer.state.currentProgram === this.id || (this.gl.useProgram(this.program), this.gl.renderer.state.currentProgram = this.id), this.uniformLocations.forEach((o, d) => {
      let v = this.uniforms[d.uniformName];
      for (const E of d.nameComponents) {
        if (!v) break;
        if (E in v)
          v = v[E];
        else {
          if (Array.isArray(v.value))
            break;
          v = void 0;
          break;
        }
      }
      if (!v)
        return zo(`Active uniform ${d.name} has not been supplied`);
      if (v && v.value === void 0)
        return zo(`${d.name} uniform is missing a value parameter`);
      if (v.value.texture)
        return c = c + 1, v.value.update(c), Ns(this.gl, d.type, o, c);
      if (v.value.length && v.value[0].texture) {
        const E = [];
        return v.value.forEach((y) => {
          c = c + 1, y.update(c), E.push(c);
        }), Ns(this.gl, d.type, o, E);
      }
      Ns(this.gl, d.type, o, v.value);
    }), this.applyState(), u && this.gl.renderer.setFrontFace(this.frontFace === this.gl.CCW ? this.gl.CW : this.gl.CCW);
  }
  remove() {
    this.gl.deleteProgram(this.program);
  }
}
function Ns(f, u, c, r) {
  r = r.length ? fm(r) : r;
  const o = f.renderer.state.uniformLocations.get(c);
  if (r.length)
    if (o === void 0 || o.length !== r.length)
      f.renderer.state.uniformLocations.set(c, r.slice(0));
    else {
      if (cm(o, r)) return;
      o.set ? o.set(r) : sm(o, r), f.renderer.state.uniformLocations.set(c, o);
    }
  else {
    if (o === r) return;
    f.renderer.state.uniformLocations.set(c, r);
  }
  switch (u) {
    case 5126:
      return r.length ? f.uniform1fv(c, r) : f.uniform1f(c, r);
    // FLOAT
    case 35664:
      return f.uniform2fv(c, r);
    // FLOAT_VEC2
    case 35665:
      return f.uniform3fv(c, r);
    // FLOAT_VEC3
    case 35666:
      return f.uniform4fv(c, r);
    // FLOAT_VEC4
    case 35670:
    // BOOL
    case 5124:
    // INT
    case 35678:
    // SAMPLER_2D
    case 36306:
    // U_SAMPLER_2D
    case 35680:
    // SAMPLER_CUBE
    case 36289:
      return r.length ? f.uniform1iv(c, r) : f.uniform1i(c, r);
    // SAMPLER_CUBE
    case 35671:
    // BOOL_VEC2
    case 35667:
      return f.uniform2iv(c, r);
    // INT_VEC2
    case 35672:
    // BOOL_VEC3
    case 35668:
      return f.uniform3iv(c, r);
    // INT_VEC3
    case 35673:
    // BOOL_VEC4
    case 35669:
      return f.uniform4iv(c, r);
    // INT_VEC4
    case 35674:
      return f.uniformMatrix2fv(c, !1, r);
    // FLOAT_MAT2
    case 35675:
      return f.uniformMatrix3fv(c, !1, r);
    // FLOAT_MAT3
    case 35676:
      return f.uniformMatrix4fv(c, !1, r);
  }
}
function _o(f) {
  let u = f.split(`
`);
  for (let c = 0; c < u.length; c++)
    u[c] = c + 1 + ": " + u[c];
  return u.join(`
`);
}
function fm(f) {
  const u = f.length, c = f[0].length;
  if (c === void 0) return f;
  const r = u * c;
  let o = bo[r];
  o || (bo[r] = o = new Float32Array(r));
  for (let d = 0; d < u; d++) o.set(f[d], d * c);
  return o;
}
function cm(f, u) {
  if (f.length !== u.length) return !1;
  for (let c = 0, r = f.length; c < r; c++)
    if (f[c] !== u[c]) return !1;
  return !0;
}
function sm(f, u) {
  for (let c = 0, r = f.length; c < r; c++)
    f[c] = u[c];
}
let Cs = 0;
function zo(f) {
  Cs > 100 || (console.warn(f), Cs++, Cs > 100 && console.warn("More than 100 program warnings - stopping logs."));
}
const Ds = /* @__PURE__ */ new jl();
let rm = 1;
class hm {
  constructor({
    canvas: u = document.createElement("canvas"),
    width: c = 300,
    height: r = 150,
    dpr: o = 1,
    alpha: d = !1,
    depth: v = !0,
    stencil: E = !1,
    antialias: y = !1,
    premultipliedAlpha: C = !1,
    preserveDrawingBuffer: A = !1,
    powerPreference: m = "default",
    autoClear: N = !0,
    webgl: R = 2
  } = {}) {
    const U = { alpha: d, depth: v, stencil: E, antialias: y, premultipliedAlpha: C, preserveDrawingBuffer: A, powerPreference: m };
    this.dpr = o, this.alpha = d, this.color = !0, this.depth = v, this.stencil = E, this.premultipliedAlpha = C, this.autoClear = N, this.id = rm++, R === 2 && (this.gl = u.getContext("webgl2", U)), this.isWebgl2 = !!this.gl, this.gl || (this.gl = u.getContext("webgl", U)), this.gl || console.error("unable to create webgl context"), this.gl.renderer = this, this.setSize(c, r), this.state = {}, this.state.blendFunc = { src: this.gl.ONE, dst: this.gl.ZERO }, this.state.blendEquation = { modeRGB: this.gl.FUNC_ADD }, this.state.cullFace = !1, this.state.frontFace = this.gl.CCW, this.state.depthMask = !0, this.state.depthFunc = this.gl.LEQUAL, this.state.premultiplyAlpha = !1, this.state.flipY = !1, this.state.unpackAlignment = 4, this.state.framebuffer = null, this.state.viewport = { x: 0, y: 0, width: null, height: null }, this.state.textureUnits = [], this.state.activeTextureUnit = 0, this.state.boundBuffer = null, this.state.uniformLocations = /* @__PURE__ */ new Map(), this.state.currentProgram = null, this.extensions = {}, this.isWebgl2 ? (this.getExtension("EXT_color_buffer_float"), this.getExtension("OES_texture_float_linear")) : (this.getExtension("OES_texture_float"), this.getExtension("OES_texture_float_linear"), this.getExtension("OES_texture_half_float"), this.getExtension("OES_texture_half_float_linear"), this.getExtension("OES_element_index_uint"), this.getExtension("OES_standard_derivatives"), this.getExtension("EXT_sRGB"), this.getExtension("WEBGL_depth_texture"), this.getExtension("WEBGL_draw_buffers")), this.getExtension("WEBGL_compressed_texture_astc"), this.getExtension("EXT_texture_compression_bptc"), this.getExtension("WEBGL_compressed_texture_s3tc"), this.getExtension("WEBGL_compressed_texture_etc1"), this.getExtension("WEBGL_compressed_texture_pvrtc"), this.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"), this.vertexAttribDivisor = this.getExtension("ANGLE_instanced_arrays", "vertexAttribDivisor", "vertexAttribDivisorANGLE"), this.drawArraysInstanced = this.getExtension("ANGLE_instanced_arrays", "drawArraysInstanced", "drawArraysInstancedANGLE"), this.drawElementsInstanced = this.getExtension("ANGLE_instanced_arrays", "drawElementsInstanced", "drawElementsInstancedANGLE"), this.createVertexArray = this.getExtension("OES_vertex_array_object", "createVertexArray", "createVertexArrayOES"), this.bindVertexArray = this.getExtension("OES_vertex_array_object", "bindVertexArray", "bindVertexArrayOES"), this.deleteVertexArray = this.getExtension("OES_vertex_array_object", "deleteVertexArray", "deleteVertexArrayOES"), this.drawBuffers = this.getExtension("WEBGL_draw_buffers", "drawBuffers", "drawBuffersWEBGL"), this.parameters = {}, this.parameters.maxTextureUnits = this.gl.getParameter(this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS), this.parameters.maxAnisotropy = this.getExtension("EXT_texture_filter_anisotropic") ? this.gl.getParameter(this.getExtension("EXT_texture_filter_anisotropic").MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0;
  }
  setSize(u, c) {
    this.width = u, this.height = c, this.gl.canvas.width = u * this.dpr, this.gl.canvas.height = c * this.dpr, this.gl.canvas.style && Object.assign(this.gl.canvas.style, {
      width: u + "px",
      height: c + "px"
    });
  }
  setViewport(u, c, r = 0, o = 0) {
    this.state.viewport.width === u && this.state.viewport.height === c || (this.state.viewport.width = u, this.state.viewport.height = c, this.state.viewport.x = r, this.state.viewport.y = o, this.gl.viewport(r, o, u, c));
  }
  setScissor(u, c, r = 0, o = 0) {
    this.gl.scissor(r, o, u, c);
  }
  enable(u) {
    this.state[u] !== !0 && (this.gl.enable(u), this.state[u] = !0);
  }
  disable(u) {
    this.state[u] !== !1 && (this.gl.disable(u), this.state[u] = !1);
  }
  setBlendFunc(u, c, r, o) {
    this.state.blendFunc.src === u && this.state.blendFunc.dst === c && this.state.blendFunc.srcAlpha === r && this.state.blendFunc.dstAlpha === o || (this.state.blendFunc.src = u, this.state.blendFunc.dst = c, this.state.blendFunc.srcAlpha = r, this.state.blendFunc.dstAlpha = o, r !== void 0 ? this.gl.blendFuncSeparate(u, c, r, o) : this.gl.blendFunc(u, c));
  }
  setBlendEquation(u, c) {
    u = u || this.gl.FUNC_ADD, !(this.state.blendEquation.modeRGB === u && this.state.blendEquation.modeAlpha === c) && (this.state.blendEquation.modeRGB = u, this.state.blendEquation.modeAlpha = c, c !== void 0 ? this.gl.blendEquationSeparate(u, c) : this.gl.blendEquation(u));
  }
  setCullFace(u) {
    this.state.cullFace !== u && (this.state.cullFace = u, this.gl.cullFace(u));
  }
  setFrontFace(u) {
    this.state.frontFace !== u && (this.state.frontFace = u, this.gl.frontFace(u));
  }
  setDepthMask(u) {
    this.state.depthMask !== u && (this.state.depthMask = u, this.gl.depthMask(u));
  }
  setDepthFunc(u) {
    this.state.depthFunc !== u && (this.state.depthFunc = u, this.gl.depthFunc(u));
  }
  setStencilMask(u) {
    this.state.stencilMask !== u && (this.state.stencilMask = u, this.gl.stencilMask(u));
  }
  setStencilFunc(u, c, r) {
    this.state.stencilFunc === u && this.state.stencilRef === c && this.state.stencilFuncMask === r || (this.state.stencilFunc = u || this.gl.ALWAYS, this.state.stencilRef = c || 0, this.state.stencilFuncMask = r || 0, this.gl.stencilFunc(u || this.gl.ALWAYS, c || 0, r || 0));
  }
  setStencilOp(u, c, r) {
    this.state.stencilFail === u && this.state.stencilDepthFail === c && this.state.stencilDepthPass === r || (this.state.stencilFail = u, this.state.stencilDepthFail = c, this.state.stencilDepthPass = r, this.gl.stencilOp(u, c, r));
  }
  activeTexture(u) {
    this.state.activeTextureUnit !== u && (this.state.activeTextureUnit = u, this.gl.activeTexture(this.gl.TEXTURE0 + u));
  }
  bindFramebuffer({ target: u = this.gl.FRAMEBUFFER, buffer: c = null } = {}) {
    this.state.framebuffer !== c && (this.state.framebuffer = c, this.gl.bindFramebuffer(u, c));
  }
  getExtension(u, c, r) {
    return c && this.gl[c] ? this.gl[c].bind(this.gl) : (this.extensions[u] || (this.extensions[u] = this.gl.getExtension(u)), c ? this.extensions[u] ? this.extensions[u][r].bind(this.extensions[u]) : null : this.extensions[u]);
  }
  sortOpaque(u, c) {
    return u.renderOrder !== c.renderOrder ? u.renderOrder - c.renderOrder : u.program.id !== c.program.id ? u.program.id - c.program.id : u.zDepth !== c.zDepth ? u.zDepth - c.zDepth : c.id - u.id;
  }
  sortTransparent(u, c) {
    return u.renderOrder !== c.renderOrder ? u.renderOrder - c.renderOrder : u.zDepth !== c.zDepth ? c.zDepth - u.zDepth : c.id - u.id;
  }
  sortUI(u, c) {
    return u.renderOrder !== c.renderOrder ? u.renderOrder - c.renderOrder : u.program.id !== c.program.id ? u.program.id - c.program.id : c.id - u.id;
  }
  getRenderList({ scene: u, camera: c, frustumCull: r, sort: o }) {
    let d = [];
    if (c && r && c.updateFrustum(), u.traverse((v) => {
      if (!v.visible) return !0;
      v.draw && (r && v.frustumCulled && c && !c.frustumIntersectsMesh(v) || d.push(v));
    }), o) {
      const v = [], E = [], y = [];
      d.forEach((C) => {
        C.program.transparent ? C.program.depthTest ? E.push(C) : y.push(C) : v.push(C), C.zDepth = 0, !(C.renderOrder !== 0 || !C.program.depthTest || !c) && (C.worldMatrix.getTranslation(Ds), Ds.applyMatrix4(c.projectionViewMatrix), C.zDepth = Ds.z);
      }), v.sort(this.sortOpaque), E.sort(this.sortTransparent), y.sort(this.sortUI), d = v.concat(E, y);
    }
    return d;
  }
  render({ scene: u, camera: c, target: r = null, update: o = !0, sort: d = !0, frustumCull: v = !0, clear: E }) {
    r === null ? (this.bindFramebuffer(), this.setViewport(this.width * this.dpr, this.height * this.dpr)) : (this.bindFramebuffer(r), this.setViewport(r.width, r.height)), (E || this.autoClear && E !== !1) && (this.depth && (!r || r.depth) && (this.enable(this.gl.DEPTH_TEST), this.setDepthMask(!0)), (this.stencil || !r || r.stencil) && (this.enable(this.gl.STENCIL_TEST), this.setStencilMask(255)), this.gl.clear(
      (this.color ? this.gl.COLOR_BUFFER_BIT : 0) | (this.depth ? this.gl.DEPTH_BUFFER_BIT : 0) | (this.stencil ? this.gl.STENCIL_BUFFER_BIT : 0)
    )), o && u.updateMatrixWorld(), c && c.updateMatrixWorld(), this.getRenderList({ scene: u, camera: c, frustumCull: v, sort: d }).forEach((C) => {
      C.draw({ camera: c });
    });
  }
}
function om(f, u) {
  return f[0] = u[0], f[1] = u[1], f[2] = u[2], f[3] = u[3], f;
}
function dm(f, u, c, r, o) {
  return f[0] = u, f[1] = c, f[2] = r, f[3] = o, f;
}
function vm(f, u) {
  let c = u[0], r = u[1], o = u[2], d = u[3], v = c * c + r * r + o * o + d * d;
  return v > 0 && (v = 1 / Math.sqrt(v)), f[0] = c * v, f[1] = r * v, f[2] = o * v, f[3] = d * v, f;
}
function gm(f, u) {
  return f[0] * u[0] + f[1] * u[1] + f[2] * u[2] + f[3] * u[3];
}
function mm(f) {
  return f[0] = 0, f[1] = 0, f[2] = 0, f[3] = 1, f;
}
function ym(f, u, c) {
  c = c * 0.5;
  let r = Math.sin(c);
  return f[0] = r * u[0], f[1] = r * u[1], f[2] = r * u[2], f[3] = Math.cos(c), f;
}
function Ao(f, u, c) {
  let r = u[0], o = u[1], d = u[2], v = u[3], E = c[0], y = c[1], C = c[2], A = c[3];
  return f[0] = r * A + v * E + o * C - d * y, f[1] = o * A + v * y + d * E - r * C, f[2] = d * A + v * C + r * y - o * E, f[3] = v * A - r * E - o * y - d * C, f;
}
function Sm(f, u, c) {
  c *= 0.5;
  let r = u[0], o = u[1], d = u[2], v = u[3], E = Math.sin(c), y = Math.cos(c);
  return f[0] = r * y + v * E, f[1] = o * y + d * E, f[2] = d * y - o * E, f[3] = v * y - r * E, f;
}
function Em(f, u, c) {
  c *= 0.5;
  let r = u[0], o = u[1], d = u[2], v = u[3], E = Math.sin(c), y = Math.cos(c);
  return f[0] = r * y - d * E, f[1] = o * y + v * E, f[2] = d * y + r * E, f[3] = v * y - o * E, f;
}
function Tm(f, u, c) {
  c *= 0.5;
  let r = u[0], o = u[1], d = u[2], v = u[3], E = Math.sin(c), y = Math.cos(c);
  return f[0] = r * y + o * E, f[1] = o * y - r * E, f[2] = d * y + v * E, f[3] = v * y - d * E, f;
}
function bm(f, u, c, r) {
  let o = u[0], d = u[1], v = u[2], E = u[3], y = c[0], C = c[1], A = c[2], m = c[3], N, R, U, B, H;
  return R = o * y + d * C + v * A + E * m, R < 0 && (R = -R, y = -y, C = -C, A = -A, m = -m), 1 - R > 1e-6 ? (N = Math.acos(R), U = Math.sin(N), B = Math.sin((1 - r) * N) / U, H = Math.sin(r * N) / U) : (B = 1 - r, H = r), f[0] = B * o + H * y, f[1] = B * d + H * C, f[2] = B * v + H * A, f[3] = B * E + H * m, f;
}
function _m(f, u) {
  let c = u[0], r = u[1], o = u[2], d = u[3], v = c * c + r * r + o * o + d * d, E = v ? 1 / v : 0;
  return f[0] = -c * E, f[1] = -r * E, f[2] = -o * E, f[3] = d * E, f;
}
function zm(f, u) {
  return f[0] = -u[0], f[1] = -u[1], f[2] = -u[2], f[3] = u[3], f;
}
function Am(f, u) {
  let c = u[0] + u[4] + u[8], r;
  if (c > 0)
    r = Math.sqrt(c + 1), f[3] = 0.5 * r, r = 0.5 / r, f[0] = (u[5] - u[7]) * r, f[1] = (u[6] - u[2]) * r, f[2] = (u[1] - u[3]) * r;
  else {
    let o = 0;
    u[4] > u[0] && (o = 1), u[8] > u[o * 3 + o] && (o = 2);
    let d = (o + 1) % 3, v = (o + 2) % 3;
    r = Math.sqrt(u[o * 3 + o] - u[d * 3 + d] - u[v * 3 + v] + 1), f[o] = 0.5 * r, r = 0.5 / r, f[3] = (u[d * 3 + v] - u[v * 3 + d]) * r, f[d] = (u[d * 3 + o] + u[o * 3 + d]) * r, f[v] = (u[v * 3 + o] + u[o * 3 + v]) * r;
  }
  return f;
}
function Om(f, u, c = "YXZ") {
  let r = Math.sin(u[0] * 0.5), o = Math.cos(u[0] * 0.5), d = Math.sin(u[1] * 0.5), v = Math.cos(u[1] * 0.5), E = Math.sin(u[2] * 0.5), y = Math.cos(u[2] * 0.5);
  return c === "XYZ" ? (f[0] = r * v * y + o * d * E, f[1] = o * d * y - r * v * E, f[2] = o * v * E + r * d * y, f[3] = o * v * y - r * d * E) : c === "YXZ" ? (f[0] = r * v * y + o * d * E, f[1] = o * d * y - r * v * E, f[2] = o * v * E - r * d * y, f[3] = o * v * y + r * d * E) : c === "ZXY" ? (f[0] = r * v * y - o * d * E, f[1] = o * d * y + r * v * E, f[2] = o * v * E + r * d * y, f[3] = o * v * y - r * d * E) : c === "ZYX" ? (f[0] = r * v * y - o * d * E, f[1] = o * d * y + r * v * E, f[2] = o * v * E - r * d * y, f[3] = o * v * y + r * d * E) : c === "YZX" ? (f[0] = r * v * y + o * d * E, f[1] = o * d * y + r * v * E, f[2] = o * v * E - r * d * y, f[3] = o * v * y - r * d * E) : c === "XZY" && (f[0] = r * v * y - o * d * E, f[1] = o * d * y - r * v * E, f[2] = o * v * E + r * d * y, f[3] = o * v * y + r * d * E), f;
}
const Mm = om, pm = dm, Nm = gm, Cm = vm;
class Dm extends Array {
  constructor(u = 0, c = 0, r = 0, o = 1) {
    super(u, c, r, o), this.onChange = () => {
    }, this._target = this;
    const d = ["0", "1", "2", "3"];
    return new Proxy(this, {
      set(v, E) {
        const y = Reflect.set(...arguments);
        return y && d.includes(E) && v.onChange(), y;
      }
    });
  }
  get x() {
    return this[0];
  }
  get y() {
    return this[1];
  }
  get z() {
    return this[2];
  }
  get w() {
    return this[3];
  }
  set x(u) {
    this._target[0] = u, this.onChange();
  }
  set y(u) {
    this._target[1] = u, this.onChange();
  }
  set z(u) {
    this._target[2] = u, this.onChange();
  }
  set w(u) {
    this._target[3] = u, this.onChange();
  }
  identity() {
    return mm(this._target), this.onChange(), this;
  }
  set(u, c, r, o) {
    return u.length ? this.copy(u) : (pm(this._target, u, c, r, o), this.onChange(), this);
  }
  rotateX(u) {
    return Sm(this._target, this._target, u), this.onChange(), this;
  }
  rotateY(u) {
    return Em(this._target, this._target, u), this.onChange(), this;
  }
  rotateZ(u) {
    return Tm(this._target, this._target, u), this.onChange(), this;
  }
  inverse(u = this._target) {
    return _m(this._target, u), this.onChange(), this;
  }
  conjugate(u = this._target) {
    return zm(this._target, u), this.onChange(), this;
  }
  copy(u) {
    return Mm(this._target, u), this.onChange(), this;
  }
  normalize(u = this._target) {
    return Cm(this._target, u), this.onChange(), this;
  }
  multiply(u, c) {
    return c ? Ao(this._target, u, c) : Ao(this._target, this._target, u), this.onChange(), this;
  }
  dot(u) {
    return Nm(this._target, u);
  }
  fromMatrix3(u) {
    return Am(this._target, u), this.onChange(), this;
  }
  fromEuler(u, c) {
    return Om(this._target, u, u.order), c || this.onChange(), this;
  }
  fromAxisAngle(u, c) {
    return ym(this._target, u, c), this.onChange(), this;
  }
  slerp(u, c) {
    return bm(this._target, this._target, u, c), this.onChange(), this;
  }
  fromArray(u, c = 0) {
    return this._target[0] = u[c], this._target[1] = u[c + 1], this._target[2] = u[c + 2], this._target[3] = u[c + 3], this.onChange(), this;
  }
  toArray(u = [], c = 0) {
    return u[c] = this[0], u[c + 1] = this[1], u[c + 2] = this[2], u[c + 3] = this[3], u;
  }
}
const xm = 1e-6;
function Rm(f, u) {
  return f[0] = u[0], f[1] = u[1], f[2] = u[2], f[3] = u[3], f[4] = u[4], f[5] = u[5], f[6] = u[6], f[7] = u[7], f[8] = u[8], f[9] = u[9], f[10] = u[10], f[11] = u[11], f[12] = u[12], f[13] = u[13], f[14] = u[14], f[15] = u[15], f;
}
function Um(f, u, c, r, o, d, v, E, y, C, A, m, N, R, U, B, H) {
  return f[0] = u, f[1] = c, f[2] = r, f[3] = o, f[4] = d, f[5] = v, f[6] = E, f[7] = y, f[8] = C, f[9] = A, f[10] = m, f[11] = N, f[12] = R, f[13] = U, f[14] = B, f[15] = H, f;
}
function Hm(f) {
  return f[0] = 1, f[1] = 0, f[2] = 0, f[3] = 0, f[4] = 0, f[5] = 1, f[6] = 0, f[7] = 0, f[8] = 0, f[9] = 0, f[10] = 1, f[11] = 0, f[12] = 0, f[13] = 0, f[14] = 0, f[15] = 1, f;
}
function qm(f, u) {
  let c = u[0], r = u[1], o = u[2], d = u[3], v = u[4], E = u[5], y = u[6], C = u[7], A = u[8], m = u[9], N = u[10], R = u[11], U = u[12], B = u[13], H = u[14], G = u[15], at = c * E - r * v, $ = c * y - o * v, K = c * C - d * v, J = r * y - o * E, W = r * C - d * E, V = o * C - d * y, I = A * B - m * U, _t = A * H - N * U, dt = A * G - R * U, St = m * H - N * B, vt = m * G - R * B, ft = N * G - R * H, k = at * ft - $ * vt + K * St + J * dt - W * _t + V * I;
  return k ? (k = 1 / k, f[0] = (E * ft - y * vt + C * St) * k, f[1] = (o * vt - r * ft - d * St) * k, f[2] = (B * V - H * W + G * J) * k, f[3] = (N * W - m * V - R * J) * k, f[4] = (y * dt - v * ft - C * _t) * k, f[5] = (c * ft - o * dt + d * _t) * k, f[6] = (H * K - U * V - G * $) * k, f[7] = (A * V - N * K + R * $) * k, f[8] = (v * vt - E * dt + C * I) * k, f[9] = (r * dt - c * vt - d * I) * k, f[10] = (U * W - B * K + G * at) * k, f[11] = (m * K - A * W - R * at) * k, f[12] = (E * _t - v * St - y * I) * k, f[13] = (c * St - r * _t + o * I) * k, f[14] = (B * $ - U * J - H * at) * k, f[15] = (A * J - m * $ + N * at) * k, f) : null;
}
function Ro(f) {
  let u = f[0], c = f[1], r = f[2], o = f[3], d = f[4], v = f[5], E = f[6], y = f[7], C = f[8], A = f[9], m = f[10], N = f[11], R = f[12], U = f[13], B = f[14], H = f[15], G = u * v - c * d, at = u * E - r * d, $ = u * y - o * d, K = c * E - r * v, J = c * y - o * v, W = r * y - o * E, V = C * U - A * R, I = C * B - m * R, _t = C * H - N * R, dt = A * B - m * U, St = A * H - N * U, vt = m * H - N * B;
  return G * vt - at * St + $ * dt + K * _t - J * I + W * V;
}
function Oo(f, u, c) {
  let r = u[0], o = u[1], d = u[2], v = u[3], E = u[4], y = u[5], C = u[6], A = u[7], m = u[8], N = u[9], R = u[10], U = u[11], B = u[12], H = u[13], G = u[14], at = u[15], $ = c[0], K = c[1], J = c[2], W = c[3];
  return f[0] = $ * r + K * E + J * m + W * B, f[1] = $ * o + K * y + J * N + W * H, f[2] = $ * d + K * C + J * R + W * G, f[3] = $ * v + K * A + J * U + W * at, $ = c[4], K = c[5], J = c[6], W = c[7], f[4] = $ * r + K * E + J * m + W * B, f[5] = $ * o + K * y + J * N + W * H, f[6] = $ * d + K * C + J * R + W * G, f[7] = $ * v + K * A + J * U + W * at, $ = c[8], K = c[9], J = c[10], W = c[11], f[8] = $ * r + K * E + J * m + W * B, f[9] = $ * o + K * y + J * N + W * H, f[10] = $ * d + K * C + J * R + W * G, f[11] = $ * v + K * A + J * U + W * at, $ = c[12], K = c[13], J = c[14], W = c[15], f[12] = $ * r + K * E + J * m + W * B, f[13] = $ * o + K * y + J * N + W * H, f[14] = $ * d + K * C + J * R + W * G, f[15] = $ * v + K * A + J * U + W * at, f;
}
function Bm(f, u, c) {
  let r = c[0], o = c[1], d = c[2], v, E, y, C, A, m, N, R, U, B, H, G;
  return u === f ? (f[12] = u[0] * r + u[4] * o + u[8] * d + u[12], f[13] = u[1] * r + u[5] * o + u[9] * d + u[13], f[14] = u[2] * r + u[6] * o + u[10] * d + u[14], f[15] = u[3] * r + u[7] * o + u[11] * d + u[15]) : (v = u[0], E = u[1], y = u[2], C = u[3], A = u[4], m = u[5], N = u[6], R = u[7], U = u[8], B = u[9], H = u[10], G = u[11], f[0] = v, f[1] = E, f[2] = y, f[3] = C, f[4] = A, f[5] = m, f[6] = N, f[7] = R, f[8] = U, f[9] = B, f[10] = H, f[11] = G, f[12] = v * r + A * o + U * d + u[12], f[13] = E * r + m * o + B * d + u[13], f[14] = y * r + N * o + H * d + u[14], f[15] = C * r + R * o + G * d + u[15]), f;
}
function Ym(f, u, c) {
  let r = c[0], o = c[1], d = c[2];
  return f[0] = u[0] * r, f[1] = u[1] * r, f[2] = u[2] * r, f[3] = u[3] * r, f[4] = u[4] * o, f[5] = u[5] * o, f[6] = u[6] * o, f[7] = u[7] * o, f[8] = u[8] * d, f[9] = u[9] * d, f[10] = u[10] * d, f[11] = u[11] * d, f[12] = u[12], f[13] = u[13], f[14] = u[14], f[15] = u[15], f;
}
function Gm(f, u, c, r) {
  let o = r[0], d = r[1], v = r[2], E = Math.hypot(o, d, v), y, C, A, m, N, R, U, B, H, G, at, $, K, J, W, V, I, _t, dt, St, vt, ft, k, zt;
  return Math.abs(E) < xm ? null : (E = 1 / E, o *= E, d *= E, v *= E, y = Math.sin(c), C = Math.cos(c), A = 1 - C, m = u[0], N = u[1], R = u[2], U = u[3], B = u[4], H = u[5], G = u[6], at = u[7], $ = u[8], K = u[9], J = u[10], W = u[11], V = o * o * A + C, I = d * o * A + v * y, _t = v * o * A - d * y, dt = o * d * A - v * y, St = d * d * A + C, vt = v * d * A + o * y, ft = o * v * A + d * y, k = d * v * A - o * y, zt = v * v * A + C, f[0] = m * V + B * I + $ * _t, f[1] = N * V + H * I + K * _t, f[2] = R * V + G * I + J * _t, f[3] = U * V + at * I + W * _t, f[4] = m * dt + B * St + $ * vt, f[5] = N * dt + H * St + K * vt, f[6] = R * dt + G * St + J * vt, f[7] = U * dt + at * St + W * vt, f[8] = m * ft + B * k + $ * zt, f[9] = N * ft + H * k + K * zt, f[10] = R * ft + G * k + J * zt, f[11] = U * ft + at * k + W * zt, u !== f && (f[12] = u[12], f[13] = u[13], f[14] = u[14], f[15] = u[15]), f);
}
function Xm(f, u) {
  return f[0] = u[12], f[1] = u[13], f[2] = u[14], f;
}
function Uo(f, u) {
  let c = u[0], r = u[1], o = u[2], d = u[4], v = u[5], E = u[6], y = u[8], C = u[9], A = u[10];
  return f[0] = Math.hypot(c, r, o), f[1] = Math.hypot(d, v, E), f[2] = Math.hypot(y, C, A), f;
}
function Lm(f) {
  let u = f[0], c = f[1], r = f[2], o = f[4], d = f[5], v = f[6], E = f[8], y = f[9], C = f[10];
  const A = u * u + c * c + r * r, m = o * o + d * d + v * v, N = E * E + y * y + C * C;
  return Math.sqrt(Math.max(A, m, N));
}
const Ho = /* @__PURE__ */ (function() {
  const f = [1, 1, 1];
  return function(u, c) {
    let r = f;
    Uo(r, c);
    let o = 1 / r[0], d = 1 / r[1], v = 1 / r[2], E = c[0] * o, y = c[1] * d, C = c[2] * v, A = c[4] * o, m = c[5] * d, N = c[6] * v, R = c[8] * o, U = c[9] * d, B = c[10] * v, H = E + m + B, G = 0;
    return H > 0 ? (G = Math.sqrt(H + 1) * 2, u[3] = 0.25 * G, u[0] = (N - U) / G, u[1] = (R - C) / G, u[2] = (y - A) / G) : E > m && E > B ? (G = Math.sqrt(1 + E - m - B) * 2, u[3] = (N - U) / G, u[0] = 0.25 * G, u[1] = (y + A) / G, u[2] = (R + C) / G) : m > B ? (G = Math.sqrt(1 + m - E - B) * 2, u[3] = (R - C) / G, u[0] = (y + A) / G, u[1] = 0.25 * G, u[2] = (N + U) / G) : (G = Math.sqrt(1 + B - E - m) * 2, u[3] = (y - A) / G, u[0] = (R + C) / G, u[1] = (N + U) / G, u[2] = 0.25 * G), u;
  };
})();
function Qm(f, u, c, r) {
  let o = iu([f[0], f[1], f[2]]);
  const d = iu([f[4], f[5], f[6]]), v = iu([f[8], f[9], f[10]]);
  Ro(f) < 0 && (o = -o), c[0] = f[12], c[1] = f[13], c[2] = f[14];
  const y = f.slice(), C = 1 / o, A = 1 / d, m = 1 / v;
  y[0] *= C, y[1] *= C, y[2] *= C, y[4] *= A, y[5] *= A, y[6] *= A, y[8] *= m, y[9] *= m, y[10] *= m, Ho(u, y), r[0] = o, r[1] = d, r[2] = v;
}
function Vm(f, u, c, r) {
  const o = f, d = u[0], v = u[1], E = u[2], y = u[3], C = d + d, A = v + v, m = E + E, N = d * C, R = d * A, U = d * m, B = v * A, H = v * m, G = E * m, at = y * C, $ = y * A, K = y * m, J = r[0], W = r[1], V = r[2];
  return o[0] = (1 - (B + G)) * J, o[1] = (R + K) * J, o[2] = (U - $) * J, o[3] = 0, o[4] = (R - K) * W, o[5] = (1 - (N + G)) * W, o[6] = (H + at) * W, o[7] = 0, o[8] = (U + $) * V, o[9] = (H - at) * V, o[10] = (1 - (N + B)) * V, o[11] = 0, o[12] = c[0], o[13] = c[1], o[14] = c[2], o[15] = 1, o;
}
function jm(f, u) {
  let c = u[0], r = u[1], o = u[2], d = u[3], v = c + c, E = r + r, y = o + o, C = c * v, A = r * v, m = r * E, N = o * v, R = o * E, U = o * y, B = d * v, H = d * E, G = d * y;
  return f[0] = 1 - m - U, f[1] = A + G, f[2] = N - H, f[3] = 0, f[4] = A - G, f[5] = 1 - C - U, f[6] = R + B, f[7] = 0, f[8] = N + H, f[9] = R - B, f[10] = 1 - C - m, f[11] = 0, f[12] = 0, f[13] = 0, f[14] = 0, f[15] = 1, f;
}
function Zm(f, u, c, r, o) {
  let d = 1 / Math.tan(u / 2), v = 1 / (r - o);
  return f[0] = d / c, f[1] = 0, f[2] = 0, f[3] = 0, f[4] = 0, f[5] = d, f[6] = 0, f[7] = 0, f[8] = 0, f[9] = 0, f[10] = (o + r) * v, f[11] = -1, f[12] = 0, f[13] = 0, f[14] = 2 * o * r * v, f[15] = 0, f;
}
function wm(f, u, c, r, o, d, v) {
  let E = 1 / (u - c), y = 1 / (r - o), C = 1 / (d - v);
  return f[0] = -2 * E, f[1] = 0, f[2] = 0, f[3] = 0, f[4] = 0, f[5] = -2 * y, f[6] = 0, f[7] = 0, f[8] = 0, f[9] = 0, f[10] = 2 * C, f[11] = 0, f[12] = (u + c) * E, f[13] = (o + r) * y, f[14] = (v + d) * C, f[15] = 1, f;
}
function Km(f, u, c, r) {
  let o = u[0], d = u[1], v = u[2], E = r[0], y = r[1], C = r[2], A = o - c[0], m = d - c[1], N = v - c[2], R = A * A + m * m + N * N;
  R === 0 ? N = 1 : (R = 1 / Math.sqrt(R), A *= R, m *= R, N *= R);
  let U = y * N - C * m, B = C * A - E * N, H = E * m - y * A;
  return R = U * U + B * B + H * H, R === 0 && (C ? E += 1e-6 : y ? C += 1e-6 : y += 1e-6, U = y * N - C * m, B = C * A - E * N, H = E * m - y * A, R = U * U + B * B + H * H), R = 1 / Math.sqrt(R), U *= R, B *= R, H *= R, f[0] = U, f[1] = B, f[2] = H, f[3] = 0, f[4] = m * H - N * B, f[5] = N * U - A * H, f[6] = A * B - m * U, f[7] = 0, f[8] = A, f[9] = m, f[10] = N, f[11] = 0, f[12] = o, f[13] = d, f[14] = v, f[15] = 1, f;
}
function Mo(f, u, c) {
  return f[0] = u[0] + c[0], f[1] = u[1] + c[1], f[2] = u[2] + c[2], f[3] = u[3] + c[3], f[4] = u[4] + c[4], f[5] = u[5] + c[5], f[6] = u[6] + c[6], f[7] = u[7] + c[7], f[8] = u[8] + c[8], f[9] = u[9] + c[9], f[10] = u[10] + c[10], f[11] = u[11] + c[11], f[12] = u[12] + c[12], f[13] = u[13] + c[13], f[14] = u[14] + c[14], f[15] = u[15] + c[15], f;
}
function po(f, u, c) {
  return f[0] = u[0] - c[0], f[1] = u[1] - c[1], f[2] = u[2] - c[2], f[3] = u[3] - c[3], f[4] = u[4] - c[4], f[5] = u[5] - c[5], f[6] = u[6] - c[6], f[7] = u[7] - c[7], f[8] = u[8] - c[8], f[9] = u[9] - c[9], f[10] = u[10] - c[10], f[11] = u[11] - c[11], f[12] = u[12] - c[12], f[13] = u[13] - c[13], f[14] = u[14] - c[14], f[15] = u[15] - c[15], f;
}
function Jm(f, u, c) {
  return f[0] = u[0] * c, f[1] = u[1] * c, f[2] = u[2] * c, f[3] = u[3] * c, f[4] = u[4] * c, f[5] = u[5] * c, f[6] = u[6] * c, f[7] = u[7] * c, f[8] = u[8] * c, f[9] = u[9] * c, f[10] = u[10] * c, f[11] = u[11] * c, f[12] = u[12] * c, f[13] = u[13] * c, f[14] = u[14] * c, f[15] = u[15] * c, f;
}
class Gi extends Array {
  constructor(u = 1, c = 0, r = 0, o = 0, d = 0, v = 1, E = 0, y = 0, C = 0, A = 0, m = 1, N = 0, R = 0, U = 0, B = 0, H = 1) {
    return super(u, c, r, o, d, v, E, y, C, A, m, N, R, U, B, H), this;
  }
  get x() {
    return this[12];
  }
  get y() {
    return this[13];
  }
  get z() {
    return this[14];
  }
  get w() {
    return this[15];
  }
  set x(u) {
    this[12] = u;
  }
  set y(u) {
    this[13] = u;
  }
  set z(u) {
    this[14] = u;
  }
  set w(u) {
    this[15] = u;
  }
  set(u, c, r, o, d, v, E, y, C, A, m, N, R, U, B, H) {
    return u.length ? this.copy(u) : (Um(this, u, c, r, o, d, v, E, y, C, A, m, N, R, U, B, H), this);
  }
  translate(u, c = this) {
    return Bm(this, c, u), this;
  }
  rotate(u, c, r = this) {
    return Gm(this, r, u, c), this;
  }
  scale(u, c = this) {
    return Ym(this, c, typeof u == "number" ? [u, u, u] : u), this;
  }
  add(u, c) {
    return c ? Mo(this, u, c) : Mo(this, this, u), this;
  }
  sub(u, c) {
    return c ? po(this, u, c) : po(this, this, u), this;
  }
  multiply(u, c) {
    return u.length ? c ? Oo(this, u, c) : Oo(this, this, u) : Jm(this, this, u), this;
  }
  identity() {
    return Hm(this), this;
  }
  copy(u) {
    return Rm(this, u), this;
  }
  fromPerspective({ fov: u, aspect: c, near: r, far: o } = {}) {
    return Zm(this, u, c, r, o), this;
  }
  fromOrthogonal({ left: u, right: c, bottom: r, top: o, near: d, far: v }) {
    return wm(this, u, c, r, o, d, v), this;
  }
  fromQuaternion(u) {
    return jm(this, u), this;
  }
  setPosition(u) {
    return this.x = u[0], this.y = u[1], this.z = u[2], this;
  }
  inverse(u = this) {
    return qm(this, u), this;
  }
  compose(u, c, r) {
    return Vm(this, u, c, r), this;
  }
  decompose(u, c, r) {
    return Qm(this, u, c, r), this;
  }
  getRotation(u) {
    return Ho(u, this), this;
  }
  getTranslation(u) {
    return Xm(u, this), this;
  }
  getScaling(u) {
    return Uo(u, this), this;
  }
  getMaxScaleOnAxis() {
    return Lm(this);
  }
  lookAt(u, c, r) {
    return Km(this, u, c, r), this;
  }
  determinant() {
    return Ro(this);
  }
  fromArray(u, c = 0) {
    return this[0] = u[c], this[1] = u[c + 1], this[2] = u[c + 2], this[3] = u[c + 3], this[4] = u[c + 4], this[5] = u[c + 5], this[6] = u[c + 6], this[7] = u[c + 7], this[8] = u[c + 8], this[9] = u[c + 9], this[10] = u[c + 10], this[11] = u[c + 11], this[12] = u[c + 12], this[13] = u[c + 13], this[14] = u[c + 14], this[15] = u[c + 15], this;
  }
  toArray(u = [], c = 0) {
    return u[c] = this[0], u[c + 1] = this[1], u[c + 2] = this[2], u[c + 3] = this[3], u[c + 4] = this[4], u[c + 5] = this[5], u[c + 6] = this[6], u[c + 7] = this[7], u[c + 8] = this[8], u[c + 9] = this[9], u[c + 10] = this[10], u[c + 11] = this[11], u[c + 12] = this[12], u[c + 13] = this[13], u[c + 14] = this[14], u[c + 15] = this[15], u;
  }
}
function Fm(f, u, c = "YXZ") {
  return c === "XYZ" ? (f[1] = Math.asin(Math.min(Math.max(u[8], -1), 1)), Math.abs(u[8]) < 0.99999 ? (f[0] = Math.atan2(-u[9], u[10]), f[2] = Math.atan2(-u[4], u[0])) : (f[0] = Math.atan2(u[6], u[5]), f[2] = 0)) : c === "YXZ" ? (f[0] = Math.asin(-Math.min(Math.max(u[9], -1), 1)), Math.abs(u[9]) < 0.99999 ? (f[1] = Math.atan2(u[8], u[10]), f[2] = Math.atan2(u[1], u[5])) : (f[1] = Math.atan2(-u[2], u[0]), f[2] = 0)) : c === "ZXY" ? (f[0] = Math.asin(Math.min(Math.max(u[6], -1), 1)), Math.abs(u[6]) < 0.99999 ? (f[1] = Math.atan2(-u[2], u[10]), f[2] = Math.atan2(-u[4], u[5])) : (f[1] = 0, f[2] = Math.atan2(u[1], u[0]))) : c === "ZYX" ? (f[1] = Math.asin(-Math.min(Math.max(u[2], -1), 1)), Math.abs(u[2]) < 0.99999 ? (f[0] = Math.atan2(u[6], u[10]), f[2] = Math.atan2(u[1], u[0])) : (f[0] = 0, f[2] = Math.atan2(-u[4], u[5]))) : c === "YZX" ? (f[2] = Math.asin(Math.min(Math.max(u[1], -1), 1)), Math.abs(u[1]) < 0.99999 ? (f[0] = Math.atan2(-u[9], u[5]), f[1] = Math.atan2(-u[2], u[0])) : (f[0] = 0, f[1] = Math.atan2(u[8], u[10]))) : c === "XZY" && (f[2] = Math.asin(-Math.min(Math.max(u[4], -1), 1)), Math.abs(u[4]) < 0.99999 ? (f[0] = Math.atan2(u[6], u[5]), f[1] = Math.atan2(u[8], u[0])) : (f[0] = Math.atan2(-u[9], u[10]), f[1] = 0)), f;
}
const No = /* @__PURE__ */ new Gi();
class $m extends Array {
  constructor(u = 0, c = u, r = u, o = "YXZ") {
    super(u, c, r), this.order = o, this.onChange = () => {
    }, this._target = this;
    const d = ["0", "1", "2"];
    return new Proxy(this, {
      set(v, E) {
        const y = Reflect.set(...arguments);
        return y && d.includes(E) && v.onChange(), y;
      }
    });
  }
  get x() {
    return this[0];
  }
  get y() {
    return this[1];
  }
  get z() {
    return this[2];
  }
  set x(u) {
    this._target[0] = u, this.onChange();
  }
  set y(u) {
    this._target[1] = u, this.onChange();
  }
  set z(u) {
    this._target[2] = u, this.onChange();
  }
  set(u, c = u, r = u) {
    return u.length ? this.copy(u) : (this._target[0] = u, this._target[1] = c, this._target[2] = r, this.onChange(), this);
  }
  copy(u) {
    return this._target[0] = u[0], this._target[1] = u[1], this._target[2] = u[2], this.onChange(), this;
  }
  reorder(u) {
    return this._target.order = u, this.onChange(), this;
  }
  fromRotationMatrix(u, c = this.order) {
    return Fm(this._target, u, c), this.onChange(), this;
  }
  fromQuaternion(u, c = this.order, r) {
    return No.fromQuaternion(u), this._target.fromRotationMatrix(No, c), r || this.onChange(), this;
  }
  fromArray(u, c = 0) {
    return this._target[0] = u[c], this._target[1] = u[c + 1], this._target[2] = u[c + 2], this;
  }
  toArray(u = [], c = 0) {
    return u[c] = this[0], u[c + 1] = this[1], u[c + 2] = this[2], u;
  }
}
class Wm {
  constructor() {
    this.parent = null, this.children = [], this.visible = !0, this.matrix = new Gi(), this.worldMatrix = new Gi(), this.matrixAutoUpdate = !0, this.worldMatrixNeedsUpdate = !1, this.position = new jl(), this.quaternion = new Dm(), this.scale = new jl(1), this.rotation = new $m(), this.up = new jl(0, 1, 0), this.rotation._target.onChange = () => this.quaternion.fromEuler(this.rotation, !0), this.quaternion._target.onChange = () => this.rotation.fromQuaternion(this.quaternion, void 0, !0);
  }
  setParent(u, c = !0) {
    this.parent && u !== this.parent && this.parent.removeChild(this, !1), this.parent = u, c && u && u.addChild(this, !1);
  }
  addChild(u, c = !0) {
    ~this.children.indexOf(u) || this.children.push(u), c && u.setParent(this, !1);
  }
  removeChild(u, c = !0) {
    ~this.children.indexOf(u) && this.children.splice(this.children.indexOf(u), 1), c && u.setParent(null, !1);
  }
  updateMatrixWorld(u) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.worldMatrixNeedsUpdate || u) && (this.parent === null ? this.worldMatrix.copy(this.matrix) : this.worldMatrix.multiply(this.parent.worldMatrix, this.matrix), this.worldMatrixNeedsUpdate = !1, u = !0);
    for (let c = 0, r = this.children.length; c < r; c++)
      this.children[c].updateMatrixWorld(u);
  }
  updateMatrix() {
    this.matrix.compose(this.quaternion, this.position, this.scale), this.worldMatrixNeedsUpdate = !0;
  }
  traverse(u) {
    if (!u(this))
      for (let c = 0, r = this.children.length; c < r; c++)
        this.children[c].traverse(u);
  }
  decompose() {
    this.matrix.decompose(this.quaternion._target, this.position, this.scale), this.rotation.fromQuaternion(this.quaternion);
  }
  lookAt(u, c = !1) {
    c ? this.matrix.lookAt(this.position, u, this.up) : this.matrix.lookAt(u, this.position, this.up), this.matrix.getRotation(this.quaternion._target), this.rotation.fromQuaternion(this.quaternion);
  }
}
function Im(f, u) {
  return f[0] = u[0], f[1] = u[1], f[2] = u[2], f[3] = u[4], f[4] = u[5], f[5] = u[6], f[6] = u[8], f[7] = u[9], f[8] = u[10], f;
}
function km(f, u) {
  let c = u[0], r = u[1], o = u[2], d = u[3], v = c + c, E = r + r, y = o + o, C = c * v, A = r * v, m = r * E, N = o * v, R = o * E, U = o * y, B = d * v, H = d * E, G = d * y;
  return f[0] = 1 - m - U, f[3] = A - G, f[6] = N + H, f[1] = A + G, f[4] = 1 - C - U, f[7] = R - B, f[2] = N - H, f[5] = R + B, f[8] = 1 - C - m, f;
}
function Pm(f, u) {
  return f[0] = u[0], f[1] = u[1], f[2] = u[2], f[3] = u[3], f[4] = u[4], f[5] = u[5], f[6] = u[6], f[7] = u[7], f[8] = u[8], f;
}
function ty(f, u, c, r, o, d, v, E, y, C) {
  return f[0] = u, f[1] = c, f[2] = r, f[3] = o, f[4] = d, f[5] = v, f[6] = E, f[7] = y, f[8] = C, f;
}
function ly(f) {
  return f[0] = 1, f[1] = 0, f[2] = 0, f[3] = 0, f[4] = 1, f[5] = 0, f[6] = 0, f[7] = 0, f[8] = 1, f;
}
function ey(f, u) {
  let c = u[0], r = u[1], o = u[2], d = u[3], v = u[4], E = u[5], y = u[6], C = u[7], A = u[8], m = A * v - E * C, N = -A * d + E * y, R = C * d - v * y, U = c * m + r * N + o * R;
  return U ? (U = 1 / U, f[0] = m * U, f[1] = (-A * r + o * C) * U, f[2] = (E * r - o * v) * U, f[3] = N * U, f[4] = (A * c - o * y) * U, f[5] = (-E * c + o * d) * U, f[6] = R * U, f[7] = (-C * c + r * y) * U, f[8] = (v * c - r * d) * U, f) : null;
}
function Co(f, u, c) {
  let r = u[0], o = u[1], d = u[2], v = u[3], E = u[4], y = u[5], C = u[6], A = u[7], m = u[8], N = c[0], R = c[1], U = c[2], B = c[3], H = c[4], G = c[5], at = c[6], $ = c[7], K = c[8];
  return f[0] = N * r + R * v + U * C, f[1] = N * o + R * E + U * A, f[2] = N * d + R * y + U * m, f[3] = B * r + H * v + G * C, f[4] = B * o + H * E + G * A, f[5] = B * d + H * y + G * m, f[6] = at * r + $ * v + K * C, f[7] = at * o + $ * E + K * A, f[8] = at * d + $ * y + K * m, f;
}
function ny(f, u, c) {
  let r = u[0], o = u[1], d = u[2], v = u[3], E = u[4], y = u[5], C = u[6], A = u[7], m = u[8], N = c[0], R = c[1];
  return f[0] = r, f[1] = o, f[2] = d, f[3] = v, f[4] = E, f[5] = y, f[6] = N * r + R * v + C, f[7] = N * o + R * E + A, f[8] = N * d + R * y + m, f;
}
function ay(f, u, c) {
  let r = u[0], o = u[1], d = u[2], v = u[3], E = u[4], y = u[5], C = u[6], A = u[7], m = u[8], N = Math.sin(c), R = Math.cos(c);
  return f[0] = R * r + N * v, f[1] = R * o + N * E, f[2] = R * d + N * y, f[3] = R * v - N * r, f[4] = R * E - N * o, f[5] = R * y - N * d, f[6] = C, f[7] = A, f[8] = m, f;
}
function uy(f, u, c) {
  let r = c[0], o = c[1];
  return f[0] = r * u[0], f[1] = r * u[1], f[2] = r * u[2], f[3] = o * u[3], f[4] = o * u[4], f[5] = o * u[5], f[6] = u[6], f[7] = u[7], f[8] = u[8], f;
}
function iy(f, u) {
  let c = u[0], r = u[1], o = u[2], d = u[3], v = u[4], E = u[5], y = u[6], C = u[7], A = u[8], m = u[9], N = u[10], R = u[11], U = u[12], B = u[13], H = u[14], G = u[15], at = c * E - r * v, $ = c * y - o * v, K = c * C - d * v, J = r * y - o * E, W = r * C - d * E, V = o * C - d * y, I = A * B - m * U, _t = A * H - N * U, dt = A * G - R * U, St = m * H - N * B, vt = m * G - R * B, ft = N * G - R * H, k = at * ft - $ * vt + K * St + J * dt - W * _t + V * I;
  return k ? (k = 1 / k, f[0] = (E * ft - y * vt + C * St) * k, f[1] = (y * dt - v * ft - C * _t) * k, f[2] = (v * vt - E * dt + C * I) * k, f[3] = (o * vt - r * ft - d * St) * k, f[4] = (c * ft - o * dt + d * _t) * k, f[5] = (r * dt - c * vt - d * I) * k, f[6] = (B * V - H * W + G * J) * k, f[7] = (H * K - U * V - G * $) * k, f[8] = (U * W - B * K + G * at) * k, f) : null;
}
class fy extends Array {
  constructor(u = 1, c = 0, r = 0, o = 0, d = 1, v = 0, E = 0, y = 0, C = 1) {
    return super(u, c, r, o, d, v, E, y, C), this;
  }
  set(u, c, r, o, d, v, E, y, C) {
    return u.length ? this.copy(u) : (ty(this, u, c, r, o, d, v, E, y, C), this);
  }
  translate(u, c = this) {
    return ny(this, c, u), this;
  }
  rotate(u, c = this) {
    return ay(this, c, u), this;
  }
  scale(u, c = this) {
    return uy(this, c, u), this;
  }
  multiply(u, c) {
    return c ? Co(this, u, c) : Co(this, this, u), this;
  }
  identity() {
    return ly(this), this;
  }
  copy(u) {
    return Pm(this, u), this;
  }
  fromMatrix4(u) {
    return Im(this, u), this;
  }
  fromQuaternion(u) {
    return km(this, u), this;
  }
  fromBasis(u, c, r) {
    return this.set(u[0], u[1], u[2], c[0], c[1], c[2], r[0], r[1], r[2]), this;
  }
  inverse(u = this) {
    return ey(this, u), this;
  }
  getNormalMatrix(u) {
    return iy(this, u), this;
  }
}
let cy = 0;
class sy extends Wm {
  constructor(u, { geometry: c, program: r, mode: o = u.TRIANGLES, frustumCulled: d = !0, renderOrder: v = 0 } = {}) {
    super(), u.canvas || console.error("gl not passed as first argument to Mesh"), this.gl = u, this.id = cy++, this.geometry = c, this.program = r, this.mode = o, this.frustumCulled = d, this.renderOrder = v, this.modelViewMatrix = new Gi(), this.normalMatrix = new fy(), this.beforeRenderCallbacks = [], this.afterRenderCallbacks = [];
  }
  onBeforeRender(u) {
    return this.beforeRenderCallbacks.push(u), this;
  }
  onAfterRender(u) {
    return this.afterRenderCallbacks.push(u), this;
  }
  draw({ camera: u } = {}) {
    u && (this.program.uniforms.modelMatrix || Object.assign(this.program.uniforms, {
      modelMatrix: { value: null },
      viewMatrix: { value: null },
      modelViewMatrix: { value: null },
      normalMatrix: { value: null },
      projectionMatrix: { value: null },
      cameraPosition: { value: null }
    }), this.program.uniforms.projectionMatrix.value = u.projectionMatrix, this.program.uniforms.cameraPosition.value = u.worldPosition, this.program.uniforms.viewMatrix.value = u.viewMatrix, this.modelViewMatrix.multiply(u.viewMatrix, this.worldMatrix), this.normalMatrix.getNormalMatrix(this.modelViewMatrix), this.program.uniforms.modelMatrix.value = this.worldMatrix, this.program.uniforms.modelViewMatrix.value = this.modelViewMatrix, this.program.uniforms.normalMatrix.value = this.normalMatrix), this.beforeRenderCallbacks.forEach((r) => r && r({ mesh: this, camera: u }));
    let c = this.program.cullFace && this.worldMatrix.determinant() < 0;
    this.program.use({ flipFaces: c }), this.geometry.draw({ mode: this.mode, program: this.program }), this.afterRenderCallbacks.forEach((r) => r && r({ mesh: this, camera: u }));
  }
}
class ry extends am {
  constructor(u, { attributes: c = {} } = {}) {
    Object.assign(c, {
      position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
      uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) }
    }), super(u, c);
  }
}
const hy = (f) => {
  const u = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(f);
  return u ? [parseInt(u[1], 16) / 255, parseInt(u[2], 16) / 255, parseInt(u[3], 16) / 255] : [1, 0.5, 0.2];
}, oy = `#version 300 es
precision highp float;
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`, dy = 60, vy = (f) => `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uCustomColor;
uniform float uUseCustomColor;
uniform float uSpeed;
uniform float uDirection;
uniform float uScale;   
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseInteractive;
uniform float uQuality;
uniform float uStepScale;
uniform float uLightMode;
out vec4 fragColor;

void mainImage(out vec4 o, vec2 C) {
  vec2 center = iResolution.xy * 0.5;
  C = (C - center) / uScale + center;
  
  vec2 mouseOffset = (uMouse - center) * 0.0002;
  C += mouseOffset * length(C - center) * step(0.5, uMouseInteractive);
  
  float i, d, z, T = iTime * uSpeed * uDirection;
  vec3 O, p, S;

  for (vec2 r = iResolution.xy, Q; ++i < 60.0; O += o.w/d*o.xyz) {
    p = z*normalize(vec3(C-.5*r,r.y)); 
    p.z -= 4.; 
    S = p;
    d = p.y-T;
    
    p.x += .4*(1.+p.y)*sin(d + p.x*0.1)*cos(.34*d + p.x*0.05); 
    Q = p.xz *= mat2(cos(p.y+vec4(0,11,33,0)-T)); 
    z += d = (abs(sqrt(length(Q*Q)) - .25*(5.+S.y))/3.+8e-4) * uStepScale;
    o = 1.+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));
    if (i >= uQuality) break;
  }
  
  o.xyz = tanh(O/1e4);
}

bool finite1(float x){ return !(isnan(x) || isinf(x)); }
vec3 sanitize(vec3 c){
  return vec3(
    finite1(c.r) ? c.r : 0.0,
    finite1(c.g) ? c.g : 0.0,
    finite1(c.b) ? c.b : 0.0
  );
}

void main() {
  vec4 o = vec4(0.0);
  mainImage(o, gl_FragCoord.xy);
  vec3 rgb = sanitize(o.rgb);
  
  float intensity = (rgb.r + rgb.g + rgb.b) / 3.0;
  vec3 customColor = intensity * uCustomColor;
  vec3 finalColor = mix(rgb, customColor, step(0.5, uUseCustomColor));
  
  float alpha = length(rgb) * uOpacity;
  if (uLightMode > 0.5) {
    vec3 source = clamp(finalColor, 0.0, 1.0);
    float peak = max(source.r, max(source.g, source.b));
    float floorColor = min(source.r, min(source.g, source.b));
    vec3 chroma = (source - vec3(floorColor)) / max(peak - floorColor, 0.0001);
    vec3 pigment = mix(source / max(peak, 0.0001), chroma, 0.68) * 0.72;
    float energy = clamp(length(rgb) / 1.7320508, 0.0, 1.0);
    float coverage = pow(smoothstep(0.035, 0.72, energy), 0.76) * min(uOpacity, 1.0) * 0.9;
    fragColor = vec4(mix(vec3(1.0), pigment, coverage), 1.0);
  } else {
    fragColor = vec4(finalColor, alpha);
  }
}`, gy = ({
  color: f = "#ffffff",
  speed: u = 1,
  direction: c = "forward",
  scale: r = 1,
  opacity: o = 1,
  mouseInteractive: d = !0,
  renderScale: v = 0.55,
  maxDpr: E = 1.5,
  targetFps: y = 60,
  iterations: C = 60,
  lightMode: A = !1
}) => {
  const m = Yi.useRef(null), N = Yi.useRef({ x: 0, y: 0 }), R = Yi.useRef(null);
  return Yi.useEffect(() => {
    if (!m.current) return;
    const U = m.current, B = typeof window < "u" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches, H = f ? 1 : 0, G = f ? hy(f) : [1, 1, 1], at = c === "reverse" ? -1 : 1;
    let $;
    try {
      $ = new hm({
        webgl: 2,
        alpha: !0,
        antialias: !1,
        dpr: Math.min(window.devicePixelRatio || 1, E)
      });
    } catch {
      return;
    }
    const K = $.gl;
    if (!K) return;
    const J = K.canvas;
    J.style.display = "block", J.style.width = "100%", J.style.height = "100%", U.appendChild(J);
    const W = new ry(K), V = new im(K, {
      vertex: oy,
      fragment: vy(),
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uCustomColor: { value: new Float32Array(G) },
        uUseCustomColor: { value: H },
        uSpeed: { value: u * 0.4 },
        uDirection: { value: at },
        uScale: { value: r },
        uOpacity: { value: o },
        uMouse: { value: new Float32Array([0, 0]) },
        uMouseInteractive: { value: d ? 1 : 0 },
        uQuality: { value: C },
        uStepScale: { value: dy / C },
        uLightMode: { value: A ? 1 : 0 }
      }
    }), I = new sy(K, { geometry: W, program: V }), _t = (L) => {
      if (!d) return;
      const j = U.getBoundingClientRect();
      R.current = {
        x: L.clientX - j.left,
        y: L.clientY - j.top
      };
    };
    d && U.addEventListener("mousemove", _t, { passive: !0 });
    let dt = !1;
    const St = () => {
      const L = U.getBoundingClientRect(), j = Math.max(1, Math.floor(L.width * v)), ct = Math.max(1, Math.floor(L.height * v));
      $.setSize(j, ct), J.style.width = "100%", J.style.height = "100%";
      const rt = V.uniforms.iResolution.value;
      rt[0] = K.drawingBufferWidth, rt[1] = K.drawingBufferHeight;
    }, vt = new ResizeObserver(() => {
      dt || (dt = !0, requestAnimationFrame(() => {
        dt = !1, St();
      }));
    });
    vt.observe(U), St();
    let ft = 0, k = !1, zt = !0, X = document.visibilityState !== "hidden";
    const P = performance.now(), lt = 1e3 / y;
    let At = 0;
    const Tt = () => {
      V.uniforms.iTime.value = 0, $.render({ scene: I });
    }, wt = (L) => {
      if (k || !zt || !X) return;
      if (L - At < lt) {
        ft = requestAnimationFrame(wt);
        return;
      }
      if (At = L, R.current) {
        N.current = R.current, R.current = null;
        const ct = V.uniforms.uMouse.value;
        ct[0] = N.current.x, ct[1] = N.current.y;
      }
      let j = (L - P) * 1e-3;
      if (c === "pingpong") {
        const rt = j % 10, Et = Math.floor(j / 10) % 2 === 0, w = rt / 10, et = w * w * (3 - 2 * w), Bl = Et ? et * 10 : (1 - et) * 10;
        V.uniforms.uDirection.value = 1, V.uniforms.iTime.value = Bl;
      } else
        V.uniforms.iTime.value = j;
      $.render({ scene: I }), ft = requestAnimationFrame(wt);
    }, Ml = (L) => {
      L.preventDefault(), k = !0, cancelAnimationFrame(ft);
    }, Zl = () => {
      k = !1, zt && X && !B && (cancelAnimationFrame(ft), ft = requestAnimationFrame(wt));
    };
    J.addEventListener("webglcontextlost", Ml), J.addEventListener("webglcontextrestored", Zl);
    const T = new IntersectionObserver(([L]) => {
      const j = zt;
      zt = L.isIntersecting, zt && !j && !k && X && !B && (cancelAnimationFrame(ft), ft = requestAnimationFrame(wt));
    }, { threshold: 0 });
    T.observe(U);
    const q = () => {
      X = document.visibilityState !== "hidden", X && zt && !k && !B ? (cancelAnimationFrame(ft), At = 0, ft = requestAnimationFrame(wt)) : cancelAnimationFrame(ft);
    };
    return document.addEventListener("visibilitychange", q), B ? Tt() : ft = requestAnimationFrame(wt), () => {
      cancelAnimationFrame(ft), vt.disconnect(), T.disconnect(), document.removeEventListener("visibilitychange", q), J.removeEventListener("webglcontextlost", Ml), J.removeEventListener("webglcontextrestored", Zl), d && U && U.removeEventListener("mousemove", _t);
      try {
        U?.removeChild(J);
      } catch {
      }
    };
  }, [f, u, c, r, o, d, v, E, y, C, A]), /* @__PURE__ */ Do.jsx("div", { ref: m, className: "plasma-container" });
}, sa = document.querySelector(".projects-shader");
if (sa && sa.dataset.plasmaMounted !== "1") {
  sa.dataset.plasmaMounted = "1", sa.classList.add("plasma-react-bits-active"), sa.querySelectorAll(".projects-aurora-canvas,.projects-heated-canvas,.projects-21st-shader-canvas,#projects-21st-shader-root").forEach((c) => c.remove());
  const f = document.createElement("div");
  f.id = "projects-plasma-root", f.setAttribute("aria-hidden", "true"), sa.prepend(f);
  const u = Lg.createRoot(f);
  u.render(
    /* @__PURE__ */ Do.jsx(
      gy,
      {
        color: "#011dc4",
        speed: 0.5,
        direction: "forward",
        scale: 1.2,
        opacity: 0.8,
        mouseInteractive: !0,
        renderScale: 0.55,
        maxDpr: 2,
        targetFps: 60,
        iterations: 65
      }
    )
  ), window.addEventListener("pagehide", () => u.unmount(), { once: !0 });
}
