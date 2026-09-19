var Ic = { exports: {} }, Zl = {};
var F0;
function ab() {
  if (F0) return Zl;
  F0 = 1;
  var a = /* @__PURE__ */ Symbol.for("react.transitional.element"), l = /* @__PURE__ */ Symbol.for("react.fragment");
  function o(r, c, d) {
    var h = null;
    if (d !== void 0 && (h = "" + d), c.key !== void 0 && (h = "" + c.key), "key" in c) {
      d = {};
      for (var y in c)
        y !== "key" && (d[y] = c[y]);
    } else d = c;
    return c = d.ref, {
      $$typeof: a,
      type: r,
      key: h,
      ref: c !== void 0 ? c : null,
      props: d
    };
  }
  return Zl.Fragment = l, Zl.jsx = o, Zl.jsxs = o, Zl;
}
var k0;
function lb() {
  return k0 || (k0 = 1, Ic.exports = ab()), Ic.exports;
}
var $ = lb(), Wc = { exports: {} }, ct = {};
var P0;
function sb() {
  if (P0) return ct;
  P0 = 1;
  var a = /* @__PURE__ */ Symbol.for("react.transitional.element"), l = /* @__PURE__ */ Symbol.for("react.portal"), o = /* @__PURE__ */ Symbol.for("react.fragment"), r = /* @__PURE__ */ Symbol.for("react.strict_mode"), c = /* @__PURE__ */ Symbol.for("react.profiler"), d = /* @__PURE__ */ Symbol.for("react.consumer"), h = /* @__PURE__ */ Symbol.for("react.context"), y = /* @__PURE__ */ Symbol.for("react.forward_ref"), S = /* @__PURE__ */ Symbol.for("react.suspense"), v = /* @__PURE__ */ Symbol.for("react.memo"), g = /* @__PURE__ */ Symbol.for("react.lazy"), p = /* @__PURE__ */ Symbol.for("react.activity"), b = /* @__PURE__ */ Symbol.for("react.view_transition"), N = Symbol.iterator;
  function z(E) {
    return E === null || typeof E != "object" ? null : (E = N && E[N] || E["@@iterator"], typeof E == "function" ? E : null);
  }
  var w = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, _ = Object.assign, H = {};
  function G(E, Y, it) {
    this.props = E, this.context = Y, this.refs = H, this.updater = it || w;
  }
  G.prototype.isReactComponent = {}, G.prototype.setState = function(E, Y) {
    if (typeof E != "object" && typeof E != "function" && E != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, E, Y, "setState");
  }, G.prototype.forceUpdate = function(E) {
    this.updater.enqueueForceUpdate(this, E, "forceUpdate");
  };
  function X() {
  }
  X.prototype = G.prototype;
  function L(E, Y, it) {
    this.props = E, this.context = Y, this.refs = H, this.updater = it || w;
  }
  var k = L.prototype = new X();
  k.constructor = L, _(k, G.prototype), k.isPureReactComponent = !0;
  var st = Array.isArray;
  function J() {
  }
  var Q = { H: null, A: null, T: null, S: null }, ot = Object.prototype.hasOwnProperty;
  function W(E, Y, it) {
    var at = it.ref;
    return {
      $$typeof: a,
      type: E,
      key: Y,
      ref: at !== void 0 ? at : null,
      props: it
    };
  }
  function dt(E, Y) {
    return W(E.type, Y, E.props);
  }
  function Tt(E) {
    return typeof E == "object" && E !== null && E.$$typeof === a;
  }
  function Yt(E) {
    var Y = { "=": "=0", ":": "=2" };
    return "$" + E.replace(/[=:]/g, function(it) {
      return Y[it];
    });
  }
  var qt = /\/+/g;
  function Ct(E, Y) {
    return typeof E == "object" && E !== null && E.key != null ? Yt("" + E.key) : Y.toString(36);
  }
  function Z(E) {
    switch (E.status) {
      case "fulfilled":
        return E.value;
      case "rejected":
        throw E.reason;
      default:
        switch (typeof E.status == "string" ? E.then(J, J) : (E.status = "pending", E.then(
          function(Y) {
            E.status === "pending" && (E.status = "fulfilled", E.value = Y);
          },
          function(Y) {
            E.status === "pending" && (E.status = "rejected", E.reason = Y);
          }
        )), E.status) {
          case "fulfilled":
            return E.value;
          case "rejected":
            throw E.reason;
        }
    }
    throw E;
  }
  function V(E, Y, it, at, bt) {
    var Et = typeof E;
    (Et === "undefined" || Et === "boolean") && (E = null);
    var xt = !1;
    if (E === null) xt = !0;
    else
      switch (Et) {
        case "bigint":
        case "string":
        case "number":
          xt = !0;
          break;
        case "object":
          switch (E.$$typeof) {
            case a:
            case l:
              xt = !0;
              break;
            case g:
              return xt = E._init, V(
                xt(E._payload),
                Y,
                it,
                at,
                bt
              );
          }
      }
    if (xt)
      return bt = bt(E), xt = at === "" ? "." + Ct(E, 0) : at, st(bt) ? (it = "", xt != null && (it = xt.replace(qt, "$&/") + "/"), V(bt, Y, it, "", function(Mn) {
        return Mn;
      })) : bt != null && (Tt(bt) && (bt = dt(
        bt,
        it + (bt.key == null || E && E.key === bt.key ? "" : ("" + bt.key).replace(
          qt,
          "$&/"
        ) + "/") + xt
      )), Y.push(bt)), 1;
    xt = 0;
    var nt = at === "" ? "." : at + ":";
    if (st(E))
      for (var rt = 0; rt < E.length; rt++)
        at = E[rt], Et = nt + Ct(at, rt), xt += V(
          at,
          Y,
          it,
          Et,
          bt
        );
    else if (rt = z(E), typeof rt == "function")
      for (E = rt.call(E), rt = 0; !(at = E.next()).done; )
        at = at.value, Et = nt + Ct(at, rt++), xt += V(
          at,
          Y,
          it,
          Et,
          bt
        );
    else if (Et === "object") {
      if (typeof E.then == "function")
        return V(
          Z(E),
          Y,
          it,
          at,
          bt
        );
      throw Y = String(E), Error(
        "Objects are not valid as a React child (found: " + (Y === "[object Object]" ? "object with keys {" + Object.keys(E).join(", ") + "}" : Y) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return xt;
  }
  function j(E, Y, it) {
    if (E == null) return E;
    var at = [], bt = 0;
    return V(E, at, "", "", function(Et) {
      return Y.call(it, Et, bt++);
    }), at;
  }
  function P(E) {
    if (E._status === -1) {
      var Y = E._result, it = Y();
      it.then(
        function(at) {
          (E._status === 0 || E._status === -1) && (E._status = 1, E._result = at, it.status === void 0 && (it.status = "fulfilled", it.value = at));
        },
        function(at) {
          (E._status === 0 || E._status === -1) && (E._status = 2, E._result = at, it.status === void 0 && (it.status = "rejected", it.reason = at));
        }
      ), E._status === -1 && (E._status = 0, E._result = it);
    }
    if (E._status === 1) return E._result.default;
    throw E._result;
  }
  var F = typeof reportError == "function" ? reportError : function(E) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var Y = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof E == "object" && E !== null && typeof E.message == "string" ? String(E.message) : String(E),
        error: E
      });
      if (!window.dispatchEvent(Y)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", E);
      return;
    }
    console.error(E);
  };
  function Dt(E) {
    var Y = Q.T, it = {};
    it.types = Y !== null ? Y.types : null, Q.T = it;
    try {
      var at = E(), bt = Q.S;
      bt !== null && bt(it, at), typeof at == "object" && at !== null && typeof at.then == "function" && at.then(J, F);
    } catch (Et) {
      F(Et);
    } finally {
      Y !== null && it.types !== null && (Y.types = it.types), Q.T = Y;
    }
  }
  function Bt(E) {
    var Y = Q.T;
    if (Y !== null) {
      var it = Y.types;
      it === null ? Y.types = [E] : it.indexOf(E) === -1 && it.push(E);
    } else Dt(Bt.bind(null, E));
  }
  var ze = {
    map: j,
    forEach: function(E, Y, it) {
      j(
        E,
        function() {
          Y.apply(this, arguments);
        },
        it
      );
    },
    count: function(E) {
      var Y = 0;
      return j(E, function() {
        Y++;
      }), Y;
    },
    toArray: function(E) {
      return j(E, function(Y) {
        return Y;
      }) || [];
    },
    only: function(E) {
      if (!Tt(E))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return E;
    }
  };
  return ct.Activity = p, ct.Children = ze, ct.Component = G, ct.Fragment = o, ct.Profiler = c, ct.PureComponent = L, ct.StrictMode = r, ct.Suspense = S, ct.ViewTransition = b, ct.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Q, ct.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(E) {
      return Q.H.useMemoCache(E);
    }
  }, ct.addTransitionType = Bt, ct.cache = function(E) {
    return function() {
      return E.apply(null, arguments);
    };
  }, ct.cacheSignal = function() {
    return null;
  }, ct.cloneElement = function(E, Y, it) {
    if (E == null)
      throw Error(
        "The argument must be a React element, but you passed " + E + "."
      );
    var at = _({}, E.props), bt = E.key;
    if (Y != null)
      for (Et in Y.key !== void 0 && (bt = "" + Y.key), Y)
        !ot.call(Y, Et) || Et === "key" || Et === "__self" || Et === "__source" || Et === "ref" && Y.ref === void 0 || (at[Et] = Y[Et]);
    var Et = arguments.length - 2;
    if (Et === 1) at.children = it;
    else if (1 < Et) {
      for (var xt = Array(Et), nt = 0; nt < Et; nt++)
        xt[nt] = arguments[nt + 2];
      at.children = xt;
    }
    return W(E.type, bt, at);
  }, ct.createContext = function(E) {
    return E = {
      $$typeof: h,
      _currentValue: E,
      _currentValue2: E,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, E.Provider = E, E.Consumer = {
      $$typeof: d,
      _context: E
    }, E;
  }, ct.createElement = function(E, Y, it) {
    var at, bt = {}, Et = null;
    if (Y != null)
      for (at in Y.key !== void 0 && (Et = "" + Y.key), Y)
        ot.call(Y, at) && at !== "key" && at !== "__self" && at !== "__source" && (bt[at] = Y[at]);
    var xt = arguments.length - 2;
    if (xt === 1) bt.children = it;
    else if (1 < xt) {
      for (var nt = Array(xt), rt = 0; rt < xt; rt++)
        nt[rt] = arguments[rt + 2];
      bt.children = nt;
    }
    if (E && E.defaultProps)
      for (at in xt = E.defaultProps, xt)
        bt[at] === void 0 && (bt[at] = xt[at]);
    return W(E, Et, bt);
  }, ct.createRef = function() {
    return { current: null };
  }, ct.forwardRef = function(E) {
    return { $$typeof: y, render: E };
  }, ct.isValidElement = Tt, ct.lazy = function(E) {
    return {
      $$typeof: g,
      _payload: { _status: -1, _result: E },
      _init: P
    };
  }, ct.memo = function(E, Y) {
    return {
      $$typeof: v,
      type: E,
      compare: Y === void 0 ? null : Y
    };
  }, ct.startTransition = Dt, ct.unstable_useCacheRefresh = function() {
    return Q.H.useCacheRefresh();
  }, ct.use = function(E) {
    return Q.H.use(E);
  }, ct.useActionState = function(E, Y, it) {
    return Q.H.useActionState(E, Y, it);
  }, ct.useCallback = function(E, Y) {
    return Q.H.useCallback(E, Y);
  }, ct.useContext = function(E) {
    return Q.H.useContext(E);
  }, ct.useDebugValue = function() {
  }, ct.useDeferredValue = function(E, Y) {
    return Q.H.useDeferredValue(E, Y);
  }, ct.useEffect = function(E, Y) {
    return Q.H.useEffect(E, Y);
  }, ct.useEffectEvent = function(E) {
    return Q.H.useEffectEvent(E);
  }, ct.useId = function() {
    return Q.H.useId();
  }, ct.useImperativeHandle = function(E, Y, it) {
    return Q.H.useImperativeHandle(E, Y, it);
  }, ct.useInsertionEffect = function(E, Y) {
    return Q.H.useInsertionEffect(E, Y);
  }, ct.useLayoutEffect = function(E, Y) {
    return Q.H.useLayoutEffect(E, Y);
  }, ct.useMemo = function(E, Y) {
    return Q.H.useMemo(E, Y);
  }, ct.useOptimistic = function(E, Y) {
    return Q.H.useOptimistic(E, Y);
  }, ct.useReducer = function(E, Y, it) {
    return Q.H.useReducer(E, Y, it);
  }, ct.useRef = function(E) {
    return Q.H.useRef(E);
  }, ct.useState = function(E) {
    return Q.H.useState(E);
  }, ct.useSyncExternalStore = function(E, Y, it) {
    return Q.H.useSyncExternalStore(
      E,
      Y,
      it
    );
  }, ct.useTransition = function() {
    return Q.H.useTransition();
  }, ct.version = "19.3.0", ct;
}
var I0;
function Jf() {
  return I0 || (I0 = 1, Wc.exports = sb()), Wc.exports;
}
var q = Jf(), $c = { exports: {} }, Kl = {}, tf = { exports: {} }, ef = {};
var W0;
function ub() {
  return W0 || (W0 = 1, (function(a) {
    function l(Z, V) {
      var j = Z.length;
      Z.push(V);
      t: for (; 0 < j; ) {
        var P = j - 1 >>> 1, F = Z[P];
        if (0 < c(F, V))
          Z[P] = V, Z[j] = F, j = P;
        else break t;
      }
    }
    function o(Z) {
      return Z.length === 0 ? null : Z[0];
    }
    function r(Z) {
      if (Z.length === 0) return null;
      var V = Z[0], j = Z.pop();
      if (j !== V) {
        Z[0] = j;
        t: for (var P = 0, F = Z.length, Dt = F >>> 1; P < Dt; ) {
          var Bt = 2 * (P + 1) - 1, ze = Z[Bt], E = Bt + 1, Y = Z[E];
          if (0 > c(ze, j))
            E < F && 0 > c(Y, ze) ? (Z[P] = Y, Z[E] = j, P = E) : (Z[P] = ze, Z[Bt] = j, P = Bt);
          else if (E < F && 0 > c(Y, j))
            Z[P] = Y, Z[E] = j, P = E;
          else break t;
        }
      }
      return V;
    }
    function c(Z, V) {
      var j = Z.sortIndex - V.sortIndex;
      return j !== 0 ? j : Z.id - V.id;
    }
    if (a.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      a.unstable_now = function() {
        return d.now();
      };
    } else {
      var h = Date, y = h.now();
      a.unstable_now = function() {
        return h.now() - y;
      };
    }
    var S = [], v = [], g = 1, p = null, b = 3, N = !1, z = !1, w = !1, _ = !1, H = typeof setTimeout == "function" ? setTimeout : null, G = typeof clearTimeout == "function" ? clearTimeout : null, X = typeof setImmediate < "u" ? setImmediate : null;
    function L(Z) {
      for (var V = o(v); V !== null; ) {
        if (V.callback === null) r(v);
        else if (V.startTime <= Z)
          r(v), V.sortIndex = V.expirationTime, l(S, V);
        else break;
        V = o(v);
      }
    }
    function k(Z) {
      if (w = !1, L(Z), !z)
        if (o(S) !== null)
          z = !0, st || (st = !0, Tt());
        else {
          var V = o(v);
          V !== null && Ct(k, V.startTime - Z);
        }
    }
    var st = !1, J = -1, Q = 5, ot = -1;
    function W() {
      return _ ? !0 : !(a.unstable_now() - ot < Q);
    }
    function dt() {
      if (_ = !1, st) {
        var Z = a.unstable_now();
        ot = Z;
        var V = !0;
        try {
          t: {
            z = !1, w && (w = !1, G(J), J = -1), N = !0;
            var j = b;
            try {
              e: {
                for (L(Z), p = o(S); p !== null && !(p.expirationTime > Z && W()); ) {
                  var P = p.callback;
                  if (typeof P == "function") {
                    p.callback = null, b = p.priorityLevel;
                    var F = P(
                      p.expirationTime <= Z
                    );
                    if (Z = a.unstable_now(), typeof F == "function") {
                      p.callback = F, L(Z), V = !0;
                      break e;
                    }
                    p === o(S) && r(S), L(Z);
                  } else r(S);
                  p = o(S);
                }
                if (p !== null) V = !0;
                else {
                  var Dt = o(v);
                  Dt !== null && Ct(
                    k,
                    Dt.startTime - Z
                  ), V = !1;
                }
              }
              break t;
            } finally {
              p = null, b = j, N = !1;
            }
            V = void 0;
          }
        } finally {
          V ? Tt() : st = !1;
        }
      }
    }
    var Tt;
    if (typeof X == "function")
      Tt = function() {
        X(dt);
      };
    else if (typeof MessageChannel < "u") {
      var Yt = new MessageChannel(), qt = Yt.port2;
      Yt.port1.onmessage = dt, Tt = function() {
        qt.postMessage(null);
      };
    } else
      Tt = function() {
        H(dt, 0);
      };
    function Ct(Z, V) {
      J = H(function() {
        Z(a.unstable_now());
      }, V);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(Z) {
      Z.callback = null;
    }, a.unstable_forceFrameRate = function(Z) {
      0 > Z || 125 < Z ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Q = 0 < Z ? Math.floor(1e3 / Z) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return b;
    }, a.unstable_next = function(Z) {
      switch (b) {
        case 1:
        case 2:
        case 3:
          var V = 3;
          break;
        default:
          V = b;
      }
      var j = b;
      b = V;
      try {
        return Z();
      } finally {
        b = j;
      }
    }, a.unstable_requestPaint = function() {
      _ = !0;
    }, a.unstable_runWithPriority = function(Z, V) {
      switch (Z) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          Z = 3;
      }
      var j = b;
      b = Z;
      try {
        return V();
      } finally {
        b = j;
      }
    }, a.unstable_scheduleCallback = function(Z, V, j) {
      var P = a.unstable_now();
      switch (typeof j == "object" && j !== null ? (j = j.delay, j = typeof j == "number" && 0 < j ? P + j : P) : j = P, Z) {
        case 1:
          var F = -1;
          break;
        case 2:
          F = 250;
          break;
        case 5:
          F = 1073741823;
          break;
        case 4:
          F = 1e4;
          break;
        default:
          F = 5e3;
      }
      return F = j + F, Z = {
        id: g++,
        callback: V,
        priorityLevel: Z,
        startTime: j,
        expirationTime: F,
        sortIndex: -1
      }, j > P ? (Z.sortIndex = j, l(v, Z), o(S) === null && Z === o(v) && (w ? (G(J), J = -1) : w = !0, Ct(k, j - P))) : (Z.sortIndex = F, l(S, Z), z || N || (z = !0, st || (st = !0, Tt()))), Z;
    }, a.unstable_shouldYield = W, a.unstable_wrapCallback = function(Z) {
      var V = b;
      return function() {
        var j = b;
        b = V;
        try {
          return Z.apply(this, arguments);
        } finally {
          b = j;
        }
      };
    };
  })(ef)), ef;
}
var $0;
function ob() {
  return $0 || ($0 = 1, tf.exports = ub()), tf.exports;
}
var nf = { exports: {} }, he = {};
var tp;
function rb() {
  if (tp) return he;
  tp = 1;
  var a = Jf();
  function l(g) {
    var p = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        p += "&args[]=" + encodeURIComponent(arguments[b]);
    }
    return "Minified React error #" + g + "; visit " + p + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o() {
  }
  var r = {
    d: {
      f: o,
      r: function() {
        throw Error(l(522));
      },
      D: o,
      C: o,
      L: o,
      m: o,
      X: o,
      S: o,
      M: o
    },
    p: 0,
    findDOMNode: null
  }, c = /* @__PURE__ */ Symbol.for("react.portal"), d = /* @__PURE__ */ Symbol.for("react.recoverable"), h = /* @__PURE__ */ Symbol.for("react.optimistic_key");
  function y(g, p, b) {
    var N = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: N == null ? null : N === h ? h : "" + N,
      children: g,
      containerInfo: p,
      implementation: b
    };
  }
  var S = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function v(g, p) {
    if (g === "font") return "";
    if (typeof p == "string")
      return p === "use-credentials" ? p : "";
  }
  return he.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, he.browser = function(g) {
    return { $$typeof: d, _reason: g };
  }, he.createPortal = function(g, p) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(l(299));
    return y(g, p, null, b);
  }, he.flushSync = function(g) {
    var p = S.T, b = r.p;
    try {
      if (S.T = null, r.p = 2, g) return g();
    } finally {
      S.T = p, r.p = b, r.d.f();
    }
  }, he.preconnect = function(g, p) {
    typeof g == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, r.d.C(g, p));
  }, he.prefetchDNS = function(g) {
    typeof g == "string" && r.d.D(g);
  }, he.preinit = function(g, p) {
    if (typeof g == "string" && p && typeof p.as == "string") {
      var b = p.as, N = v(b, p.crossOrigin), z = typeof p.integrity == "string" ? p.integrity : void 0, w = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      b === "style" ? r.d.S(
        g,
        typeof p.precedence == "string" ? p.precedence : void 0,
        {
          crossOrigin: N,
          integrity: z,
          fetchPriority: w
        }
      ) : b === "script" && r.d.X(g, {
        crossOrigin: N,
        integrity: z,
        fetchPriority: w,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0
      });
    }
  }, he.preinitModule = function(g, p) {
    if (typeof g == "string")
      if (typeof p == "object" && p !== null) {
        if (p.as == null || p.as === "script") {
          var b = v(
            p.as,
            p.crossOrigin
          );
          r.d.M(g, {
            crossOrigin: b,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0,
            fetchPriority: typeof p.fetchPriority == "string" ? p.fetchPriority : void 0
          });
        }
      } else p == null && r.d.M(g);
  }, he.preload = function(g, p) {
    if (typeof g == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
      var b = p.as, N = v(b, p.crossOrigin);
      r.d.L(g, b, {
        crossOrigin: N,
        integrity: typeof p.integrity == "string" ? p.integrity : void 0,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0,
        type: typeof p.type == "string" ? p.type : void 0,
        fetchPriority: typeof p.fetchPriority == "string" ? p.fetchPriority : void 0,
        referrerPolicy: typeof p.referrerPolicy == "string" ? p.referrerPolicy : void 0,
        imageSrcSet: typeof p.imageSrcSet == "string" ? p.imageSrcSet : void 0,
        imageSizes: typeof p.imageSizes == "string" ? p.imageSizes : void 0,
        media: typeof p.media == "string" ? p.media : void 0
      });
    }
  }, he.preloadModule = function(g, p) {
    if (typeof g == "string")
      if (p) {
        var b = v(p.as, p.crossOrigin);
        r.d.m(g, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: b,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0,
          nonce: typeof p.nonce == "string" ? p.nonce : void 0,
          fetchPriority: typeof p.fetchPriority == "string" ? p.fetchPriority : void 0
        });
      } else r.d.m(g);
  }, he.requestFormReset = function(g) {
    r.d.r(g);
  }, he.unstable_batchedUpdates = function(g, p) {
    return g(p);
  }, he.useFormState = function(g, p, b) {
    return S.H.useFormState(g, p, b);
  }, he.useFormStatus = function() {
    return S.H.useHostTransitionStatus();
  }, he.version = "19.3.0", he;
}
var ep;
function Eg() {
  if (ep) return nf.exports;
  ep = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (l) {
        console.error(l);
      }
  }
  return a(), nf.exports = rb(), nf.exports;
}
var np;
function cb() {
  if (np) return Kl;
  np = 1;
  var a = ob(), l = Jf(), o = Eg();
  function r(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        e += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function c(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function d(t) {
    for (var e = t, n = e; n && !n.alternate; )
      e = n, (e.flags & 4098) !== 0 && (t = e.return), n = e.return;
    for (; e.return; ) e = e.return;
    return e.tag === 3 ? t : null;
  }
  function h(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function y(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function S(t) {
    if (d(t) !== t)
      throw Error(r(188));
  }
  function v(t) {
    var e = t.alternate;
    if (!e) {
      if (e = d(t), e === null) throw Error(r(188));
      return e !== t ? null : t;
    }
    for (var n = t, i = e; ; ) {
      var s = n.return;
      if (s === null) break;
      var u = s.alternate;
      if (u === null) {
        if (i = s.return, i !== null) {
          n = i;
          continue;
        }
        break;
      }
      if (s.child === u.child) {
        for (u = s.child; u; ) {
          if (u === n) return S(s), t;
          if (u === i) return S(s), e;
          u = u.sibling;
        }
        throw Error(r(188));
      }
      if (n.return !== i.return) n = s, i = u;
      else {
        for (var f = !1, m = s.child; m; ) {
          if (m === n) {
            f = !0, n = s, i = u;
            break;
          }
          if (m === i) {
            f = !0, i = s, n = u;
            break;
          }
          m = m.sibling;
        }
        if (!f) {
          for (m = u.child; m; ) {
            if (m === n) {
              f = !0, n = u, i = s;
              break;
            }
            if (m === i) {
              f = !0, i = u, n = s;
              break;
            }
            m = m.sibling;
          }
          if (!f) throw Error(r(189));
        }
      }
      if (n.alternate !== i) throw Error(r(190));
    }
    if (n.tag !== 3) throw Error(r(188));
    return n.stateNode.current === n ? t : e;
  }
  function g(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = g(t), e !== null) return e;
      t = t.sibling;
    }
    return null;
  }
  function p(t, e, n, i, s, u) {
    for (; t !== null; ) {
      if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && n(t, i, s, u) || (t.tag !== 22 || t.memoizedState === null) && (e || t.tag !== 5 && t.tag !== 27) && p(
        t.child,
        e,
        n,
        i,
        s,
        u
      ))
        return !0;
      t = t.sibling;
    }
    return !1;
  }
  function b(t) {
    for (t = t.return; t !== null; ) {
      if (t.tag === 3 || t.tag === 5 || t.tag === 27) return t;
      t = t.return;
    }
    return null;
  }
  function N(t) {
    var e = !1;
    for (t = t.return; t !== null && (t.tag === 4 && (e = !0), !(t.tag === 3 || t.tag === 5 || t.tag === 27)); )
      t = t.return;
    return e;
  }
  function z(t) {
    var e = [null, null], n = b(t);
    return n === null || w(
      e,
      t,
      n.child,
      { foundSelf: !1 }
    ), e;
  }
  function w(t, e, n, i) {
    for (; n !== null; ) {
      if (n === e) i.foundSelf = !0;
      else if (n.tag === 5 || n.tag === 27 || n.tag === 6) {
        if (i.foundSelf) return t[1] = n, !0;
        t[0] = n;
      } else if ((n.tag !== 22 || n.memoizedState === null) && w(
        t,
        e,
        n.child,
        i
      ))
        return !0;
      n = n.sibling;
    }
    return !1;
  }
  function _(t) {
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
  var H = null, G = null;
  function X(t, e, n) {
    return t === n ? !0 : t === e ? (H = t, !0) : !1;
  }
  function L(t, e, n) {
    return t === n ? (G = t, !1) : t === e ? (G !== null && (H = t), !0) : !1;
  }
  function k(t) {
    if (t === null) return null;
    do
      t = t === null ? null : t.return;
    while (t && t.tag !== 5 && t.tag !== 27 && t.tag !== 3);
    return t || null;
  }
  function st(t, e, n) {
    for (var i = 0, s = t; s; s = n(s)) i++;
    s = 0;
    for (var u = e; u; u = n(u)) s++;
    for (; 0 < i - s; ) t = n(t), i--;
    for (; 0 < s - i; ) e = n(e), s--;
    for (; i--; ) {
      if (t === e || e !== null && t === e.alternate)
        return t;
      t = n(t), e = n(e);
    }
    return null;
  }
  var J = Object.assign, Q = /* @__PURE__ */ Symbol.for("react.element"), ot = /* @__PURE__ */ Symbol.for("react.transitional.element"), W = /* @__PURE__ */ Symbol.for("react.portal"), dt = /* @__PURE__ */ Symbol.for("react.fragment"), Tt = /* @__PURE__ */ Symbol.for("react.strict_mode"), Yt = /* @__PURE__ */ Symbol.for("react.profiler"), qt = /* @__PURE__ */ Symbol.for("react.consumer"), Ct = /* @__PURE__ */ Symbol.for("react.context"), Z = /* @__PURE__ */ Symbol.for("react.forward_ref"), V = /* @__PURE__ */ Symbol.for("react.suspense"), j = /* @__PURE__ */ Symbol.for("react.suspense_list"), P = /* @__PURE__ */ Symbol.for("react.memo"), F = /* @__PURE__ */ Symbol.for("react.lazy"), Dt = /* @__PURE__ */ Symbol.for("react.activity"), Bt = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), ze = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), E = /* @__PURE__ */ Symbol.for("react.view_transition"), Y = /* @__PURE__ */ Symbol.for("react.recoverable"), it = Symbol.iterator;
  function at(t) {
    return t === null || typeof t != "object" ? null : (t = it && t[it] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var bt = /* @__PURE__ */ Symbol.for("react.client.reference");
  function Et(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === bt ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case dt:
        return "Fragment";
      case Yt:
        return "Profiler";
      case Tt:
        return "StrictMode";
      case V:
        return "Suspense";
      case j:
        return "SuspenseList";
      case Dt:
        return "Activity";
      case E:
        return "ViewTransition";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case W:
          return "Portal";
        case Ct:
          return t.displayName || "Context";
        case qt:
          return (t._context.displayName || "Context") + ".Consumer";
        case Z:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case P:
          return e = t.displayName || null, e !== null ? e : Et(t.type) || "Memo";
        case F:
          e = t._payload, t = t._init;
          try {
            return Et(t(e));
          } catch {
          }
      }
    return null;
  }
  var xt = Array.isArray, nt = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, rt = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Mn = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, po = [], Pi = -1;
  function on(t) {
    return { current: t };
  }
  function le(t) {
    0 > Pi || (t.current = po[Pi], po[Pi] = null, Pi--);
  }
  function jt(t, e) {
    Pi++, po[Pi] = t.current, t.current = e;
  }
  var rn = on(null), Ia = on(null), Gn = on(null), os = on(null);
  function rs(t, e) {
    switch (jt(Gn, e), jt(Ia, t), jt(rn, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? i0(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = i0(e), t = a0(e, t);
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
    le(rn), jt(rn, t);
  }
  function Ii() {
    le(rn), le(Ia), le(Gn);
  }
  function go(t) {
    var e = t.memoizedState;
    e !== null && (La._currentValue = e.memoizedState, jt(os, t)), e = rn.current;
    var n = a0(e, t.type);
    e !== n && (jt(Ia, t), jt(rn, n));
  }
  function cs(t) {
    Ia.current === t && (le(rn), le(Ia)), os.current === t && (le(os), La._currentValue = Mn);
  }
  var vo, xh;
  function Xn(t) {
    if (vo === void 0)
      try {
        throw Error();
      } catch (n) {
        var e = n.stack.trim().match(/\n( *(at )?)/);
        vo = e && e[1] || "", xh = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + vo + t + xh;
  }
  var So = !1;
  function To(t, e) {
    if (!t || So) return "";
    So = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var i = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var B = function() {
                throw Error();
              };
              if (Object.defineProperty(B.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(B, []);
                } catch (K) {
                  var x = K;
                }
                Reflect.construct(t, [], B);
              } else {
                try {
                  B.call();
                } catch (K) {
                  x = K;
                }
                B = !1;
                try {
                  var O = Object.getOwnPropertyDescriptor(
                    t.prototype,
                    "props"
                  );
                  Object.defineProperty(t.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), B = !0, new t();
                } finally {
                  B && (O !== void 0 ? Object.defineProperty(t.prototype, "props", O) : delete t.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (K) {
                x = K;
              }
              (B = t()) && typeof B.catch == "function" && B.catch(function() {
              });
            }
          } catch (K) {
            if (K && x && typeof K.stack == "string")
              return [K.stack, x.stack];
          }
          return [null, null];
        }
      };
      i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var s = Object.getOwnPropertyDescriptor(
        i.DetermineComponentFrameRoot,
        "name"
      );
      s && s.configurable && Object.defineProperty(
        i.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var u = i.DetermineComponentFrameRoot(), f = u[0], m = u[1];
      if (f && m) {
        var T = f.split(`
`), C = m.split(`
`);
        for (s = i = 0; i < T.length && !T[i].includes("DetermineComponentFrameRoot"); )
          i++;
        for (; s < C.length && !C[s].includes(
          "DetermineComponentFrameRoot"
        ); )
          s++;
        if (i === T.length || s === C.length)
          for (i = T.length - 1, s = C.length - 1; 1 <= i && 0 <= s && T[i] !== C[s]; )
            s--;
        for (; 1 <= i && 0 <= s; i--, s--)
          if (T[i] !== C[s]) {
            if (i !== 1 || s !== 1)
              do
                if (i--, s--, 0 > s || T[i] !== C[s]) {
                  var R = `
` + T[i].replace(" at new ", " at ");
                  return t.displayName && R.includes("<anonymous>") && (R = R.replace("<anonymous>", t.displayName)), R;
                }
              while (1 <= i && 0 <= s);
            break;
          }
      }
    } finally {
      So = !1, Error.prepareStackTrace = n;
    }
    return (n = t ? t.displayName || t.name : "") ? Xn(n) : "";
  }
  function o1(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Xn(t.type);
      case 16:
        return Xn("Lazy");
      case 13:
        return t.child !== e && e !== null ? Xn("Suspense Fallback") : Xn("Suspense");
      case 19:
        return Xn("SuspenseList");
      case 0:
      case 15:
        return To(t.type, !1);
      case 11:
        return To(t.type.render, !1);
      case 1:
        return To(t.type, !0);
      case 31:
        return Xn("Activity");
      case 30:
        return Xn("ViewTransition");
      default:
        return "";
    }
  }
  function Mh(t) {
    try {
      var e = "", n = null;
      do
        e += o1(t, n), n = t, t = t.return;
      while (t);
      return e;
    } catch (i) {
      return `
Error generating stack: ` + i.message + `
` + i.stack;
    }
  }
  var bo = Object.prototype.hasOwnProperty, Eo = a.unstable_scheduleCallback, Ao = a.unstable_cancelCallback, r1 = a.unstable_shouldYield, c1 = a.unstable_requestPaint, Oe = a.unstable_now, f1 = a.unstable_getCurrentPriorityLevel, Ch = a.unstable_ImmediatePriority, Dh = a.unstable_UserBlockingPriority, fs = a.unstable_NormalPriority, h1 = a.unstable_LowPriority, zh = a.unstable_IdlePriority, d1 = a.log, m1 = a.unstable_setDisableYieldValue, Wa = null, Re = null;
  function Qn(t) {
    if (typeof d1 == "function" && m1(t), Re && typeof Re.setStrictMode == "function")
      try {
        Re.setStrictMode(Wa, t);
      } catch {
      }
  }
  var Ne = Math.clz32 ? Math.clz32 : g1, y1 = Math.log, p1 = Math.LN2;
  function g1(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (y1(t) / p1 | 0) | 0;
  }
  var hs = 256, ds = 262144, ms = 4194304;
  function bi(t) {
    var e = t & 42;
    if (e !== 0) return e;
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
  function ys(t, e, n) {
    var i = t.pendingLanes;
    if (i === 0) return 0;
    var s = 0, u = t.suspendedLanes, f = t.pingedLanes;
    t = t.warmLanes;
    var m = i & 134217727;
    return m !== 0 ? (i = m & ~u, i !== 0 ? s = bi(i) : (f &= m, f !== 0 ? s = bi(f) : n || (n = m & ~t, n !== 0 && (s = bi(n))))) : (m = i & ~u, m !== 0 ? s = bi(m) : f !== 0 ? s = bi(f) : n || (n = i & ~t, n !== 0 && (s = bi(n)))), s === 0 ? 0 : e !== 0 && e !== s && (e & u) === 0 && (u = s & -s, n = e & -e, u >= n || u === 32 && (n & 4194048) !== 0) ? e : s;
  }
  function $a(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function Oh(t, e) {
    (e & 8) !== 0 && (e |= e & 32);
    var n = t.entangledLanes;
    if (n !== 0)
      for (t = t.entanglements, n &= e; 0 < n; ) {
        var i = 31 - Ne(n), s = 1 << i;
        e |= t[i], n &= ~s;
      }
    return e;
  }
  function v1(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
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
        return e + 5e3;
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
  function Rh() {
    var t = ms;
    return ms <<= 1, (ms & 62914560) === 0 && (ms = 4194304), t;
  }
  function xo(t) {
    for (var e = [], n = 0; 31 > n; n++) e.push(t);
    return e;
  }
  function tl(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function S1(t, e, n, i, s, u) {
    var f = t.pendingLanes;
    t.pendingLanes = n, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= n, t.entangledLanes &= n, t.errorRecoveryDisabledLanes &= n, t.shellSuspendCounter = 0;
    var m = t.entanglements, T = t.expirationTimes, C = t.hiddenUpdates;
    for (n = f & ~n; 0 < n; ) {
      var R = 31 - Ne(n), B = 1 << R;
      m[R] = 0, T[R] = -1;
      var x = C[R];
      if (x !== null)
        for (C[R] = null, R = 0; R < x.length; R++) {
          var O = x[R];
          O !== null && (O.lane &= -536870913);
        }
      n &= ~B;
    }
    i !== 0 && Nh(t, i, 0), u !== 0 && s === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(f & ~e));
  }
  function Nh(t, e, n) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var i = 31 - Ne(e);
    t.entangledLanes |= e, t.entanglements[i] = t.entanglements[i] | 1073741824 | n & 261930;
  }
  function _h(t, e) {
    var n = t.entangledLanes |= e;
    for (t = t.entanglements; n; ) {
      var i = 31 - Ne(n), s = 1 << i;
      s & e | t[i] & e && (t[i] |= e), n &= ~s;
    }
  }
  function Vh(t, e) {
    var n = e & -e;
    return n = (n & 42) !== 0 ? 1 : Mo(n), (n & (t.suspendedLanes | e)) !== 0 ? 0 : n;
  }
  function Mo(t) {
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
  function Co(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function wh() {
    var t = rt.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : q0(t.type));
  }
  function Uh(t, e) {
    var n = rt.p;
    try {
      return rt.p = t, e();
    } finally {
      rt.p = n;
    }
  }
  var Cn = Math.random().toString(36).slice(2), se = "__reactFiber$" + Cn, Ee = "__reactProps$" + Cn, Wi = "__reactContainer$" + Cn, Bh = "__reactEvents$" + Cn, T1 = "__reactListeners$" + Cn, b1 = "__reactHandles$" + Cn, jh = "__reactResources$" + Cn, el = "__reactMarker$" + Cn, ps = "__reactLoad$" + Cn;
  function gs(t) {
    delete t[se], delete t[Ee], delete t[T1], delete t[b1];
  }
  function Ei(t) {
    var e;
    if (e = t[se]) return e;
    for (var n = t.parentNode; n; ) {
      if (e = n[Wi] || n[se]) {
        if (n = e.alternate, e.child !== null || n !== null && n.child !== null)
          for (t = b0(t); t !== null; ) {
            if (n = t[se]) return n;
            t = b0(t);
          }
        return e;
      }
      t = n, n = t.parentNode;
    }
    return null;
  }
  function $i(t) {
    if (t = t[se] || t[Wi]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function nl(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(r(33));
  }
  function ta(t) {
    var e = t[jh];
    return e || (e = t[jh] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function ee(t) {
    t[el] = !0;
  }
  function Lh(t) {
    t[ps] = void 0;
  }
  var Hh = /* @__PURE__ */ new Set(), Yh = {};
  function Ai(t, e) {
    ea(t, e), ea(t + "Capture", e);
  }
  function ea(t, e) {
    for (Yh[t] = e, t = 0; t < e.length; t++)
      Hh.add(e[t]);
  }
  var E1 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), qh = {}, Gh = {};
  function A1(t) {
    return bo.call(Gh, t) ? !0 : bo.call(qh, t) ? !1 : E1.test(t) ? Gh[t] = !0 : (qh[t] = !0, !1);
  }
  var At = !1;
  function Xh() {
    var t = At;
    return At = !1, t;
  }
  function vs(t, e, n) {
    if (A1(e))
      if (n === null) t.removeAttribute(e);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var i = e.toLowerCase().slice(0, 5);
            if (i !== "data-" && i !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, n);
      }
  }
  function Ss(t, e, n) {
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
      t.setAttribute(e, n);
    }
  }
  function Dn(t, e, n, i) {
    if (i === null) t.removeAttribute(n);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(n);
          return;
      }
      t.setAttributeNS(e, n, i);
    }
  }
  function _e(t) {
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
  function Qh(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function x1(t, e, n) {
    var i = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      e
    );
    if (!t.hasOwnProperty(e) && typeof i < "u" && typeof i.get == "function" && typeof i.set == "function") {
      var s = i.get, u = i.set;
      return Object.defineProperty(t, e, {
        configurable: !0,
        get: function() {
          return s.call(this);
        },
        set: function(f) {
          n = "" + f, u.call(this, f);
        }
      }), Object.defineProperty(t, e, {
        enumerable: i.enumerable
      }), {
        getValue: function() {
          return n;
        },
        setValue: function(f) {
          n = "" + f;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[e];
        }
      };
    }
  }
  function Do(t) {
    if (!t._valueTracker) {
      var e = Qh(t) ? "checked" : "value";
      t._valueTracker = x1(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function Zh(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var n = e.getValue(), i = "";
    return t && (i = Qh(t) ? t.checked ? "true" : "false" : t.value), t = i, t !== n ? (e.setValue(t), !0) : !1;
  }
  var M1 = /[\n"\\]/g;
  function qe(t) {
    return t.replace(
      M1,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function zo(t, e, n, i, s, u, f, m) {
    t.name = "", f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? t.type = f : t.removeAttribute("type"), e != null ? f === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + _e(e)) : t.value !== "" + _e(e) && (t.value = "" + _e(e)) : f !== "submit" && f !== "reset" || t.removeAttribute("value"), e != null ? f === "number" && t.value == e ? Oo(t, _e(t.value)) : Oo(t, _e(e)) : n != null ? Oo(t, _e(n)) : i != null && t.removeAttribute("value"), s == null && u != null && (t.defaultChecked = !!u), s != null && (t.checked = s && typeof s != "function" && typeof s != "symbol"), m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? t.name = "" + _e(m) : t.removeAttribute("name");
  }
  function Kh(t, e, n, i, s, u, f, m) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), e != null || n != null) {
      if (!(u !== "submit" && u !== "reset" || e != null)) {
        Do(t);
        return;
      }
      n = n != null ? "" + _e(n) : "", e = e != null ? "" + _e(e) : n, m || e === t.value || (t.value = e), t.defaultValue = e;
    }
    i = i ?? s, i = typeof i != "function" && typeof i != "symbol" && !!i, t.checked = m ? t.checked : !!i, t.defaultChecked = !!i, f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (t.name = f), Do(t);
  }
  function Oo(t, e) {
    t.defaultValue !== "" + e && (t.defaultValue = "" + e);
  }
  function na(t, e, n, i) {
    if (t = t.options, e) {
      e = {};
      for (var s = 0; s < n.length; s++)
        e["$" + n[s]] = !0;
      for (n = 0; n < t.length; n++)
        s = e.hasOwnProperty("$" + t[n].value), t[n].selected !== s && (t[n].selected = s), s && i && (t[n].defaultSelected = !0);
    } else {
      for (n = "" + _e(n), e = null, s = 0; s < t.length; s++) {
        if (t[s].value === n) {
          t[s].selected = !0, i && (t[s].defaultSelected = !0);
          return;
        }
        e !== null || t[s].disabled || (e = t[s]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function Jh(t, e, n) {
    if (e != null && (e = "" + _e(e), e !== t.value && (t.value = e), n == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = n != null ? "" + _e(n) : "";
  }
  function Fh(t, e, n, i) {
    if (e == null) {
      if (i != null) {
        if (n != null) throw Error(r(92));
        if (xt(i)) {
          if (1 < i.length) throw Error(r(93));
          i = i[0];
        }
        n = i;
      }
      n == null && (n = ""), e = n;
    }
    n = _e(e), t.defaultValue = n, i = t.textContent, i === n && i !== "" && i !== null && (t.value = i), Do(t);
  }
  function ia(t, e) {
    if (e) {
      var n = t.firstChild;
      if (n && n === t.lastChild && n.nodeType === 3) {
        n.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var C1 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function kh(t, e, n) {
    var i = e.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? i ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : i ? t.setProperty(e, n) : typeof n != "number" || n === 0 || C1.has(e) ? e === "float" ? t.cssFloat = n : t[e] = ("" + n).trim() : t[e] = n + "px";
  }
  function Ph(t, e, n) {
    if (e != null && typeof e != "object")
      throw Error(r(62));
    if (t = t.style, n != null) {
      for (var i in n)
        !n.hasOwnProperty(i) || e != null && e.hasOwnProperty(i) || (i.indexOf("--") === 0 ? t.setProperty(i, "") : i === "float" ? t.cssFloat = "" : t[i] = "", At = !0);
      for (var s in e)
        i = e[s], e.hasOwnProperty(s) && n[s] !== i && (kh(t, s, i), At = !0);
    } else
      for (var u in e)
        e.hasOwnProperty(u) && kh(t, u, e[u]);
  }
  function Ro(t) {
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
  ]), z1 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ts(t) {
    return z1.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function cn() {
  }
  var No = null;
  function _o(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var aa = null, la = null;
  function Ih(t) {
    var e = $i(t);
    if (e && (t = e.stateNode)) {
      var n = t[Ee] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (zo(
            t,
            n.value,
            n.defaultValue,
            n.defaultValue,
            n.checked,
            n.defaultChecked,
            n.type,
            n.name
          ), e = n.name, n.type === "radio" && e != null) {
            for (n = t; n.parentNode; ) n = n.parentNode;
            for (n = n.querySelectorAll(
              'input[name="' + qe(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < n.length; e++) {
              var i = n[e];
              if (i !== t && i.form === t.form) {
                var s = i[Ee] || null;
                if (!s) throw Error(r(90));
                zo(
                  i,
                  s.value,
                  s.defaultValue,
                  s.defaultValue,
                  s.checked,
                  s.defaultChecked,
                  s.type,
                  s.name
                );
              }
            }
            for (e = 0; e < n.length; e++)
              i = n[e], i.form === t.form && Zh(i);
          }
          break t;
        case "textarea":
          Jh(t, n.value, n.defaultValue);
          break t;
        case "select":
          e = n.value, e != null && na(t, !!n.multiple, e, !1);
      }
    }
  }
  var Vo = !1;
  function Wh(t, e, n) {
    if (Vo) return t(e, n);
    Vo = !0;
    try {
      var i = t(e);
      return i;
    } finally {
      if (Vo = !1, (aa !== null || la !== null) && (Tu(), aa && (e = aa, t = la, la = aa = null, Ih(e), t)))
        for (e = 0; e < t.length; e++) Ih(t[e]);
    }
  }
  function il(t, e) {
    var n = t.stateNode;
    if (n === null) return null;
    var i = n[Ee] || null;
    if (i === null) return null;
    n = i[e];
    t: switch (e) {
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
        (i = !i.disabled) || (t = t.type, i = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !i;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (n && typeof n != "function")
      throw Error(
        r(231, e, typeof n)
      );
    return n;
  }
  var zn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), wo = !1;
  if (zn)
    try {
      var al = {};
      Object.defineProperty(al, "passive", {
        get: function() {
          wo = !0;
        }
      }), window.addEventListener("test", al, al), window.removeEventListener("test", al, al);
    } catch {
      wo = !1;
    }
  var Zn = null, Uo = null, bs = null;
  function $h() {
    if (bs) return bs;
    var t, e = Uo, n = e.length, i, s = "value" in Zn ? Zn.value : Zn.textContent, u = s.length;
    for (t = 0; t < n && e[t] === s[t]; t++) ;
    var f = n - t;
    for (i = 1; i <= f && e[n - i] === s[u - i]; i++) ;
    return bs = s.slice(t, 1 < i ? 1 - i : void 0);
  }
  function Es(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function As() {
    return !0;
  }
  function td() {
    return !1;
  }
  function pe(t) {
    function e(n, i, s, u, f) {
      this._reactName = n, this._targetInst = s, this.type = i, this.nativeEvent = u, this.target = f, this.currentTarget = null;
      for (var m in t)
        t.hasOwnProperty(m) && (n = t[m], this[m] = n ? n(u) : u[m]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? As : td, this.isPropagationStopped = td, this;
    }
    return J(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = As);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = As);
      },
      persist: function() {
      },
      isPersistent: As
    }), e;
  }
  var Kn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, xs = pe(Kn), ll = J({}, Kn, { view: 0, detail: 0 }), O1 = pe(ll), Bo, jo, sl, Ms = J({}, ll, {
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
    getModifierState: Ho,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== sl && (sl && t.type === "mousemove" ? (Bo = t.screenX - sl.screenX, jo = t.screenY - sl.screenY) : jo = Bo = 0, sl = t), Bo);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : jo;
    }
  }), ed = pe(Ms), R1 = J({}, Ms, { dataTransfer: 0 }), N1 = pe(R1), _1 = J({}, ll, { relatedTarget: 0 }), Lo = pe(_1), V1 = J({}, Kn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), w1 = pe(V1), U1 = J({}, Kn, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), B1 = pe(U1), j1 = J({}, Kn, { data: 0 }), nd = pe(j1), L1 = {
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
  }, H1 = {
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
  }, Y1 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function q1(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = Y1[t]) ? !!e[t] : !1;
  }
  function Ho() {
    return q1;
  }
  var G1 = J({}, ll, {
    key: function(t) {
      if (t.key) {
        var e = L1[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = Es(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? H1[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Ho,
    charCode: function(t) {
      return t.type === "keypress" ? Es(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Es(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), X1 = pe(G1), Q1 = J({}, Ms, {
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
  }), id = pe(Q1), Z1 = J({}, Kn, { submitter: 0 }), K1 = pe(Z1), J1 = J({}, ll, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ho
  }), F1 = pe(J1), k1 = J({}, Kn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), P1 = pe(k1), I1 = J({}, Ms, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), W1 = pe(I1), $1 = J({}, Kn, {
    newState: 0,
    oldState: 0,
    source: 0
  }), tS = pe($1), eS = [9, 13, 27, 32], Yo = zn && "CompositionEvent" in window, ul = null;
  zn && "documentMode" in document && (ul = document.documentMode);
  var nS = zn && "TextEvent" in window && !ul, ad = zn && (!Yo || ul && 8 < ul && 11 >= ul), ld = " ", sd = !1;
  function ud(t, e) {
    switch (t) {
      case "keyup":
        return eS.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function od(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var sa = !1;
  function iS(t, e) {
    switch (t) {
      case "compositionend":
        return od(e);
      case "keypress":
        return e.which !== 32 ? null : (sd = !0, ld);
      case "textInput":
        return t = e.data, t === ld && sd ? null : t;
      default:
        return null;
    }
  }
  function aS(t, e) {
    if (sa)
      return t === "compositionend" || !Yo && ud(t, e) ? (t = $h(), bs = Uo = Zn = null, sa = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
          if (e.char && 1 < e.char.length)
            return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return ad && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var lS = {
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
  function rd(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!lS[t.type] : e === "textarea";
  }
  function cd(t, e, n, i) {
    aa ? la ? la.push(i) : la = [i] : aa = i, e = Cu(e, "onChange"), 0 < e.length && (n = new xs(
      "onChange",
      "change",
      null,
      n,
      i
    ), t.push({ event: n, listeners: e }));
  }
  var ol = null, rl = null;
  function sS(t) {
    Iy(t, 0);
  }
  function Cs(t) {
    var e = nl(t);
    if (Zh(e)) return t;
  }
  function fd(t, e) {
    if (t === "change") return e;
  }
  var hd = !1;
  if (zn) {
    var qo;
    if (zn) {
      var Go = "oninput" in document;
      if (!Go) {
        var dd = document.createElement("div");
        dd.setAttribute("oninput", "return;"), Go = typeof dd.oninput == "function";
      }
      qo = Go;
    } else qo = !1;
    hd = qo && (!document.documentMode || 9 < document.documentMode);
  }
  function md() {
    ol && (ol.detachEvent("onpropertychange", yd), rl = ol = null);
  }
  function yd(t) {
    if (t.propertyName === "value" && Cs(rl)) {
      var e = [];
      cd(
        e,
        rl,
        t,
        _o(t)
      ), Wh(sS, e);
    }
  }
  function uS(t, e, n) {
    t === "focusin" ? (md(), ol = e, rl = n, ol.attachEvent("onpropertychange", yd)) : t === "focusout" && md();
  }
  function oS(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Cs(rl);
  }
  function rS(t, e) {
    if (t === "click") return Cs(e);
  }
  function cS(t, e) {
    if (t === "input" || t === "change")
      return Cs(e);
  }
  function fS(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var Ve = typeof Object.is == "function" ? Object.is : fS;
  function cl(t, e) {
    if (Ve(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var n = Object.keys(t), i = Object.keys(e);
    if (n.length !== i.length) return !1;
    for (i = 0; i < n.length; i++) {
      var s = n[i];
      if (!bo.call(e, s) || !Ve(t[s], e[s]))
        return !1;
    }
    return !0;
  }
  function Xo(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  function pd(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function gd(t, e) {
    var n = pd(t);
    t = 0;
    for (var i; n; ) {
      if (n.nodeType === 3) {
        if (i = t + n.textContent.length, t <= e && i >= e)
          return { node: n, offset: e - t };
        t = i;
      }
      t: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break t;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = pd(n);
    }
  }
  function vd(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? vd(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function Sd(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = Xo(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var n = typeof e.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) t = e.contentWindow;
      else break;
      e = Xo(t.document);
    }
    return e;
  }
  function Qo(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var hS = zn && "documentMode" in document && 11 >= document.documentMode, ua = null, Zo = null, fl = null, Ko = !1;
  function Td(t, e, n) {
    var i = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Ko || ua == null || ua !== Xo(i) || (i = ua, "selectionStart" in i && Qo(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
      anchorNode: i.anchorNode,
      anchorOffset: i.anchorOffset,
      focusNode: i.focusNode,
      focusOffset: i.focusOffset
    }), fl && cl(fl, i) || (fl = i, i = Cu(Zo, "onSelect"), 0 < i.length && (e = new xs(
      "onSelect",
      "select",
      null,
      e,
      n
    ), t.push({ event: e, listeners: i }), e.target = ua)));
  }
  function xi(t, e) {
    var n = {};
    return n[t.toLowerCase()] = e.toLowerCase(), n["Webkit" + t] = "webkit" + e, n["Moz" + t] = "moz" + e, n;
  }
  var oa = {
    animationend: xi("Animation", "AnimationEnd"),
    animationiteration: xi("Animation", "AnimationIteration"),
    animationstart: xi("Animation", "AnimationStart"),
    transitionrun: xi("Transition", "TransitionRun"),
    transitionstart: xi("Transition", "TransitionStart"),
    transitioncancel: xi("Transition", "TransitionCancel"),
    transitionend: xi("Transition", "TransitionEnd")
  }, Jo = {}, bd = {};
  zn && (bd = document.createElement("div").style, "AnimationEvent" in window || (delete oa.animationend.animation, delete oa.animationiteration.animation, delete oa.animationstart.animation), "TransitionEvent" in window || delete oa.transitionend.transition);
  function Mi(t) {
    if (Jo[t]) return Jo[t];
    if (!oa[t]) return t;
    var e = oa[t], n;
    for (n in e)
      if (e.hasOwnProperty(n) && n in bd)
        return Jo[t] = e[n];
    return t;
  }
  var Ed = Mi("animationend"), Ad = Mi("animationiteration"), xd = Mi("animationstart"), dS = Mi("transitionrun"), mS = Mi("transitionstart"), yS = Mi("transitioncancel"), Md = Mi("transitionend"), Cd = /* @__PURE__ */ new Map(), Fo = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Fo.push("scrollEnd");
  function We(t, e) {
    Cd.set(t, e), Ai(e, [t]);
  }
  var pS = 0;
  function On(t, e) {
    if (t.name != null && t.name !== "auto") return t.name;
    if (e.autoName !== null) return e.autoName;
    t = nn.identifierPrefix;
    var n = pS++;
    return t = "_" + t + "t_" + n.toString(32) + "_", e.autoName = t;
  }
  function Dd(t) {
    if (t == null || typeof t == "string")
      return t;
    var e = null, n = za;
    if (n !== null)
      for (var i = 0; i < n.length; i++) {
        var s = t[n[i]];
        if (s != null) {
          if (s === "none") return "none";
          e = e == null ? s : e + (" " + s);
        }
      }
    return e ?? t.default;
  }
  function Rn(t, e) {
    return t = Dd(t), e = Dd(e), e == null ? t === "auto" ? null : t : e === "auto" ? null : e;
  }
  var Ds = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var e = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(e)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, Ge = [], ra = 0, ko = 0;
  function zs() {
    for (var t = ra, e = ko = ra = 0; e < t; ) {
      var n = Ge[e];
      Ge[e++] = null;
      var i = Ge[e];
      Ge[e++] = null;
      var s = Ge[e];
      Ge[e++] = null;
      var u = Ge[e];
      if (Ge[e++] = null, i !== null && s !== null) {
        var f = i.pending;
        f === null ? s.next = s : (s.next = f.next, f.next = s), i.pending = s;
      }
      u !== 0 && zd(n, s, u);
    }
  }
  function Os(t, e, n, i) {
    Ge[ra++] = t, Ge[ra++] = e, Ge[ra++] = n, Ge[ra++] = i, ko |= i, t.lanes |= i, t = t.alternate, t !== null && (t.lanes |= i);
  }
  function Po(t, e, n, i) {
    return Os(t, e, n, i), Rs(t);
  }
  function Ci(t, e) {
    return Os(t, null, null, e), Rs(t);
  }
  function zd(t, e, n) {
    t.lanes |= n;
    var i = t.alternate;
    i !== null && (i.lanes |= n);
    for (var s = !1, u = t.return; u !== null; )
      u.childLanes |= n, i = u.alternate, i !== null && (i.childLanes |= n), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (s = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, s && e !== null && (s = 31 - Ne(n), t = u.hiddenUpdates, i = t[s], i === null ? t[s] = [e] : i.push(e), e.lane = n | 536870912), u) : null;
  }
  function Rs(t) {
    if (50 < Vl)
      throw Vl = 0, Su = null, Error(r(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var ca = {};
  function gS(t, e, n, i) {
    this.tag = t, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ae(t, e, n, i) {
    return new gS(t, e, n, i);
  }
  function Io(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Nn(t, e) {
    var n = t.alternate;
    return n === null ? (n = Ae(
      t.tag,
      e,
      t.key,
      t.mode
    ), n.elementType = t.elementType, n.type = t.type, n.stateNode = t.stateNode, n.alternate = t, t.alternate = n) : (n.pendingProps = e, n.type = t.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = t.flags & 1206910976, n.childLanes = t.childLanes, n.lanes = t.lanes, n.child = t.child, n.memoizedProps = t.memoizedProps, n.memoizedState = t.memoizedState, n.updateQueue = t.updateQueue, e = t.dependencies, n.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, n.sibling = t.sibling, n.index = t.index, n.ref = t.ref, n.refCleanup = t.refCleanup, n;
  }
  function Od(t, e) {
    t.flags &= 1206910978;
    var n = t.alternate;
    return n === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = n.childLanes, t.lanes = n.lanes, t.child = n.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = n.memoizedProps, t.memoizedState = n.memoizedState, t.updateQueue = n.updateQueue, t.type = n.type, e = n.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function Ns(t, e, n, i, s, u) {
    var f = 0;
    if (i = t, typeof i == "function") Io(i) && (f = 1);
    else if (typeof i == "string")
      f = ZT(
        t,
        n,
        rn.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (i) {
        case Dt:
          return t = Ae(31, n, e, s), t.elementType = Dt, t.lanes = u, t;
        case dt:
          return Di(n.children, s, u, e);
        case Tt:
          f = 8, s |= 24;
          break;
        case Yt:
          return t = Ae(12, n, e, s | 2), t.elementType = Yt, t.lanes = u, t;
        case V:
          return t = Ae(13, n, e, s), t.elementType = V, t.lanes = u, t;
        case j:
          return t = Ae(19, n, e, s), t.elementType = j, t.lanes = u, t;
        case Bt:
        case E:
          return t = s | 32, t = Ae(30, n, e, t), t.elementType = E, t.lanes = u, t.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, t;
        default:
          if (typeof i == "object" && i !== null)
            switch (i.$$typeof) {
              case Ct:
                f = 10;
                break t;
              case qt:
                f = 9;
                break t;
              case Z:
                f = 11;
                break t;
              case P:
                f = 14;
                break t;
              case F:
                f = 16, i = null;
                break t;
            }
          f = 29, n = Error(
            r(130, t === null ? "null" : typeof t, "")
          ), i = null;
      }
    return e = Ae(f, n, e, s), e.elementType = t, e.type = i, e.lanes = u, e;
  }
  function Di(t, e, n, i) {
    return t = Ae(7, t, i, e), t.lanes = n, t;
  }
  function Wo(t, e, n) {
    return t = Ae(6, t, null, e), t.lanes = n, t;
  }
  function Rd(t) {
    var e = Ae(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function $o(t, e, n) {
    return e = Ae(
      4,
      t.children !== null ? t.children : [],
      t.key,
      e
    ), e.lanes = n, e.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, e;
  }
  var Nd = /* @__PURE__ */ new WeakMap();
  function Xe(t, e) {
    if (typeof t == "object" && t !== null) {
      var n = Nd.get(t);
      return n !== void 0 ? n : (e = {
        value: t,
        source: e,
        stack: Mh(e)
      }, Nd.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: Mh(e)
    };
  }
  var fa = [], ha = 0, _s = null, hl = 0, Qe = [], Ze = 0, Jn = null, fn = 1, hn = "";
  function _n(t, e) {
    fa[ha++] = hl, fa[ha++] = _s, _s = t, hl = e;
  }
  function _d(t, e, n) {
    Qe[Ze++] = fn, Qe[Ze++] = hn, Qe[Ze++] = Jn, Jn = t;
    var i = fn;
    t = hn;
    var s = 32 - Ne(i) - 1;
    i &= ~(1 << s), n += 1;
    var u = 32 - Ne(e) + s;
    if (30 < u) {
      var f = s - s % 5;
      u = (i & (1 << f) - 1).toString(32), i >>= f, s -= f, fn = 1 << 32 - Ne(e) + s | n << s | i, hn = u + t;
    } else
      fn = 1 << u | n << s | i, hn = t;
  }
  function Vs(t) {
    t.return !== null && (_n(t, 1), _d(t, 1, 0));
  }
  function tr(t) {
    for (; t === _s; )
      _s = fa[--ha], fa[ha] = null, hl = fa[--ha], fa[ha] = null;
    for (; t === Jn; )
      Jn = Qe[--Ze], Qe[Ze] = null, hn = Qe[--Ze], Qe[Ze] = null, fn = Qe[--Ze], Qe[Ze] = null;
  }
  function Vd(t, e) {
    Qe[Ze++] = fn, Qe[Ze++] = hn, Qe[Ze++] = Jn, fn = e.id, hn = e.overflow, Jn = t;
  }
  var ne = null, Lt = null, mt = !1, Fn = null, Ke = !1, er = Error(r(519));
  function kn(t) {
    var e = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw dl(Xe(e, t)), er;
  }
  function wd(t) {
    var e = t.stateNode, n = t.type, i = t.memoizedProps;
    switch (e[se] = t, e[Ee] = i, n) {
      case "dialog":
        pt("cancel", e), pt("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        pt("load", e);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Ul.length; n++)
          pt(Ul[n], e);
        break;
      case "source":
        pt("error", e);
        break;
      case "img":
      case "image":
      case "link":
        pt("error", e), pt("load", e);
        break;
      case "details":
        pt("toggle", e);
        break;
      case "input":
        pt("invalid", e), Kh(
          e,
          i.value,
          i.defaultValue,
          i.checked,
          i.defaultChecked,
          i.type,
          i.name,
          !0
        );
        break;
      case "select":
        pt("invalid", e);
        break;
      case "textarea":
        pt("invalid", e), Fh(e, i.value, i.defaultValue, i.children);
    }
    n = i.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || e.textContent === "" + n || i.suppressHydrationWarning === !0 || e0(e.textContent, n) ? (i.popover != null && (pt("beforetoggle", e), pt("toggle", e)), i.onScroll != null && pt("scroll", e), i.onScrollEnd != null && pt("scrollend", e), i.onClick != null && (e.onclick = cn), e = !0) : e = !1, e || kn(t, !0);
  }
  function ws(t) {
    for (ne = t.return; ne; )
      switch (ne.tag) {
        case 5:
        case 31:
        case 13:
          Ke = !1;
          return;
        case 27:
        case 3:
          Ke = !0;
          return;
        default:
          ne = ne.return;
      }
  }
  function da(t) {
    if (t !== ne) return !1;
    if (!mt) return ws(t), mt = !0, !1;
    var e = t.tag, n;
    if ((n = e !== 3 && e !== 27) && ((n = e === 5) && (n = t.type, n = !(n !== "form" && n !== "button") || Nc(t.type, t.memoizedProps)), n = !n), n && Lt && kn(t), ws(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      Lt = T0(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      Lt = T0(t);
    } else
      e === 27 ? (e = Lt, fi(t.type) ? (t = Yc, Yc = null, Lt = t) : Lt = e) : Lt = ne ? Fe(t.stateNode.nextSibling) : null;
    return !0;
  }
  function zi() {
    Lt = ne = null, mt = !1;
  }
  function nr() {
    var t = Fn;
    return t !== null && (Ce === null ? Ce = t : Ce.push.apply(
      Ce,
      t
    ), Fn = null), t;
  }
  function dl(t) {
    Fn === null ? Fn = [t] : Fn.push(t);
  }
  var ir = on(null), Oi = null, Vn = null;
  function Pn(t, e, n) {
    jt(ir, e._currentValue), e._currentValue = n;
  }
  function wn(t) {
    t._currentValue = ir.current, le(ir);
  }
  function Us(t, e, n) {
    for (; t !== null; ) {
      var i = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, i !== null && (i.childLanes |= e)) : i !== null && (i.childLanes & e) !== e && (i.childLanes |= e), t === n) break;
      t = t.return;
    }
  }
  function ar(t, e, n, i) {
    var s = t.child;
    for (s !== null && (s.return = t); s !== null; ) {
      var u = s.dependencies;
      if (u !== null) {
        var f = s.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var m = u;
          u = s;
          for (var T = 0; T < e.length; T++)
            if (m.context === e[T]) {
              u.lanes |= n, m = u.alternate, m !== null && (m.lanes |= n), Us(
                u.return,
                n,
                t
              ), i || (f = null);
              break t;
            }
          u = m.next;
        }
      } else if (s.tag === 18) {
        if (f = s.return, f === null) throw Error(r(341));
        f.lanes |= n, u = f.alternate, u !== null && (u.lanes |= n), Us(f, n, t), f = null;
      } else
        s.tag === 13 && s.memoizedState !== null && s.memoizedState.dehydrated === null ? (s.lanes |= n, f = s.alternate, f !== null && (f.lanes |= n), Us(
          s.return,
          n,
          t
        ), f = s.child, f = f !== null ? f.sibling : null) : f = s.child;
      if (f !== null) f.return = s;
      else
        for (f = s; f !== null; ) {
          if (f === t) {
            f = null;
            break;
          }
          if (s = f.sibling, s !== null) {
            s.return = f.return, f = s;
            break;
          }
          f = f.return;
        }
      s = f;
    }
  }
  function Ri(t, e, n, i) {
    t = null;
    for (var s = e, u = !1; s !== null; ) {
      if (!u) {
        if ((s.flags & 524288) !== 0) u = !0;
        else if ((s.flags & 262144) !== 0) break;
      }
      if (s.tag === 10) {
        var f = s.alternate;
        if (f === null) throw Error(r(387));
        if (f = f.memoizedProps, f !== null) {
          var m = s.type;
          Ve(s.pendingProps.value, f.value) || (t !== null ? t.push(m) : t = [m]);
        }
      } else if (s === os.current) {
        if (f = s.alternate, f === null) throw Error(r(387));
        f.memoizedState.memoizedState !== s.memoizedState.memoizedState && (t !== null ? t.push(La) : t = [La]);
      }
      s = s.return;
    }
    return t !== null && ar(
      e,
      t,
      n,
      i
    ), e.flags |= 262144, t !== null;
  }
  function Bs(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Ve(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Ni(t) {
    Oi = t, Vn = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function ue(t) {
    return Ud(Oi, t);
  }
  function js(t, e) {
    return Oi === null && Ni(t), Ud(t, e);
  }
  function Ud(t, e) {
    var n = e._currentValue;
    if (e = { context: e, memoizedValue: n, next: null }, Vn === null) {
      if (t === null) throw Error(r(308));
      Vn = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else Vn = Vn.next = e;
    return n;
  }
  var vS = typeof AbortController < "u" ? AbortController : function() {
    var t = [], e = this.signal = {
      aborted: !1,
      addEventListener: function(n, i) {
        t.push(i);
      }
    };
    this.abort = function() {
      e.aborted = !0, t.forEach(function(n) {
        return n();
      });
    };
  }, SS = a.unstable_scheduleCallback, TS = a.unstable_NormalPriority, Ft = {
    $$typeof: Ct,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function lr() {
    return {
      controller: new vS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function ml(t) {
    t.refCount--, t.refCount === 0 && SS(TS, function() {
      t.controller.abort();
    });
  }
  function Bd(t, e) {
    if ((t.pendingLanes & 4194048) !== 0) {
      var n = t.transitionTypes;
      for (n === null && (n = t.transitionTypes = []), t = 0; t < e.length; t++) {
        var i = e[t];
        n.indexOf(i) === -1 && n.push(i);
      }
    }
  }
  var yl = null;
  function bS(t) {
    var e = t.transitionTypes;
    return t.transitionTypes = null, e;
  }
  var pl = null, sr = 0, _i = 0, ma = null;
  function ES(t, e) {
    if (pl === null) {
      var n = pl = [];
      sr = 0, _i = Ec(), ma = {
        status: "pending",
        value: void 0,
        then: function(i) {
          n.push(i);
        }
      };
    }
    return sr++, e.then(jd, jd), e;
  }
  function jd() {
    if (--sr === 0 && (yl = null, pl !== null)) {
      ma !== null && (ma.status = "fulfilled");
      var t = pl;
      pl = null, _i = 0, ma = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function AS(t, e) {
    var n = [], i = {
      status: "pending",
      value: null,
      reason: null,
      then: function(s) {
        n.push(s);
      }
    };
    return t.then(
      function() {
        i.status = "fulfilled", i.value = e;
        for (var s = 0; s < n.length; s++) (0, n[s])(e);
      },
      function(s) {
        for (i.status = "rejected", i.reason = s, s = 0; s < n.length; s++)
          (0, n[s])(void 0);
      }
    ), i;
  }
  var Ld = nt.S;
  nt.S = function(t, e) {
    if (Ry = Oe(), typeof e == "object" && e !== null && typeof e.then == "function" && ES(t, e), yl !== null)
      for (var n = _a; n !== null; )
        Bd(n, yl), n = n.next;
    if (n = t.types, n !== null) {
      for (var i = _a; i !== null; )
        Bd(i, n), i = i.next;
      if (_i !== 0) {
        i = yl, i === null && (i = yl = []);
        for (var s = 0; s < n.length; s++) {
          var u = n[s];
          i.indexOf(u) === -1 && i.push(u);
        }
      }
    }
    Ld !== null && Ld(t, e);
  };
  var Vi = on(null);
  function ur() {
    var t = Vi.current;
    return t !== null ? t : Vt.pooledCache;
  }
  function Ls(t, e) {
    e === null ? jt(Vi, Vi.current) : jt(Vi, e.pool);
  }
  function Hd() {
    var t = ur();
    return t === null ? null : { parent: Ft._currentValue, pool: t };
  }
  var ya = Error(r(460)), or = Error(r(474)), Hs = Error(r(542)), Ys = { then: function() {
  } };
  function Yd(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function qd(t, e, n) {
    switch (n = t[n], n === void 0 ? t.push(e) : n !== e && (e.then(cn, cn), e = n), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, Xd(t), t === void 0 && !("reason" in e) ? Error(r(600)) : t;
      default:
        if (typeof e.status == "string") e.then(cn, cn);
        else {
          if (t = Vt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(r(482));
          t = e, t.status = "pending", t.then(
            function(i) {
              if (e.status === "pending") {
                var s = e;
                s.status = "fulfilled", s.value = i;
              }
            },
            function(i) {
              if (e.status === "pending") {
                var s = e;
                s.status = "rejected", s.reason = i;
              }
            }
          );
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw t = e.reason, Xd(t), t;
        }
        throw Ui = e, ya;
    }
  }
  function wi(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (Ui = n, ya) : n;
    }
  }
  var Ui = null;
  function Gd() {
    if (Ui === null) throw Error(r(459));
    var t = Ui;
    return Ui = null, t;
  }
  function Xd(t) {
    if (t === ya || t === Hs)
      throw Error(r(483));
  }
  var pa = null, gl = 0;
  function qs(t) {
    var e = gl;
    return gl += 1, pa === null && (pa = []), qd(pa, t, e);
  }
  function In(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function Gs(t, e) {
    throw e.$$typeof === Q ? Error(r(525)) : (t = Object.prototype.toString.call(e), Error(
      r(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function Qd(t) {
    function e(M, A) {
      if (t) {
        var D = M.deletions;
        D === null ? (M.deletions = [A], M.flags |= 16) : D.push(A);
      }
    }
    function n(M, A) {
      if (!t) return null;
      for (; A !== null; )
        e(M, A), A = A.sibling;
      return null;
    }
    function i(M) {
      for (var A = /* @__PURE__ */ new Map(); M !== null; )
        M.key === null ? A.set(M.index, M) : A.set(M.key, M), M = M.sibling;
      return A;
    }
    function s(M, A) {
      return M = Nn(M, A), M.index = 0, M.sibling = null, M;
    }
    function u(M, A, D) {
      return M.index = D, t ? (D = M.alternate, D !== null ? (D = D.index, D < A ? (M.flags |= 2, A) : D) : (M.flags |= 134217730, A)) : (M.flags |= 1048576, A);
    }
    function f(M) {
      return t && M.alternate === null && (M.flags |= 134217730), M;
    }
    function m(M, A, D, U) {
      return A === null || A.tag !== 6 ? (A = Wo(D, M.mode, U), A.return = M, A) : (A = s(A, D), A.return = M, A);
    }
    function T(M, A, D, U) {
      var I = D.type;
      return I === dt ? (M = R(
        M,
        A,
        D.props.children,
        U,
        D.key
      ), In(M, D), M) : A !== null && (A.elementType === I || typeof I == "object" && I !== null && I.$$typeof === F && wi(I) === A.type) ? (A = s(A, D.props), In(A, D), A.return = M, A) : (A = Ns(
        D.type,
        D.key,
        D.props,
        null,
        M.mode,
        U
      ), In(A, D), A.return = M, A);
    }
    function C(M, A, D, U) {
      return A === null || A.tag !== 4 || A.stateNode.containerInfo !== D.containerInfo || A.stateNode.implementation !== D.implementation ? (A = $o(D, M.mode, U), A.return = M, A) : (A = s(A, D.children || []), A.return = M, A);
    }
    function R(M, A, D, U, I) {
      return A === null || A.tag !== 7 ? (A = Di(
        D,
        M.mode,
        U,
        I
      ), A.return = M, A) : (A = s(A, D), A.return = M, A);
    }
    function B(M, A, D) {
      if (typeof A == "string" && A !== "" || typeof A == "number" || typeof A == "bigint")
        return A = Wo(
          "" + A,
          M.mode,
          D
        ), A.return = M, A;
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case ot:
            return D = Ns(
              A.type,
              A.key,
              A.props,
              null,
              M.mode,
              D
            ), In(D, A), D.return = M, D;
          case W:
            return A = $o(
              A,
              M.mode,
              D
            ), A.return = M, A;
          case F:
            return A = wi(A), B(M, A, D);
        }
        if (xt(A) || at(A))
          return A = Di(
            A,
            M.mode,
            D,
            null
          ), A.return = M, A;
        if (typeof A.then == "function")
          return B(M, qs(A), D);
        if (A.$$typeof === Ct)
          return B(
            M,
            js(M, A),
            D
          );
        Gs(M, A);
      }
      return null;
    }
    function x(M, A, D, U) {
      var I = A !== null ? A.key : null;
      if (typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint")
        return I !== null ? null : m(M, A, "" + D, U);
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case ot:
            return D.key === I ? T(M, A, D, U) : null;
          case W:
            return D.key === I ? C(M, A, D, U) : null;
          case F:
            return D = wi(D), x(M, A, D, U);
        }
        if (xt(D) || at(D))
          return I !== null ? null : R(M, A, D, U, null);
        if (typeof D.then == "function")
          return x(
            M,
            A,
            qs(D),
            U
          );
        if (D.$$typeof === Ct)
          return x(
            M,
            A,
            js(M, D),
            U
          );
        Gs(M, D);
      }
      return null;
    }
    function O(M, A, D, U, I) {
      if (typeof U == "string" && U !== "" || typeof U == "number" || typeof U == "bigint")
        return M = M.get(D) || null, m(A, M, "" + U, I);
      if (typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case ot:
            return M = M.get(
              U.key === null ? D : U.key
            ) || null, T(A, M, U, I);
          case W:
            return M = M.get(
              U.key === null ? D : U.key
            ) || null, C(A, M, U, I);
          case F:
            return U = wi(U), O(
              M,
              A,
              D,
              U,
              I
            );
        }
        if (xt(U) || at(U))
          return M = M.get(D) || null, R(A, M, U, I, null);
        if (typeof U.then == "function")
          return O(
            M,
            A,
            D,
            qs(U),
            I
          );
        if (U.$$typeof === Ct)
          return O(
            M,
            A,
            D,
            js(A, U),
            I
          );
        Gs(A, U);
      }
      return null;
    }
    function K(M, A, D, U) {
      for (var I = null, vt = null, lt = A, ut = A = 0, It = null; lt !== null && ut < D.length; ut++) {
        lt.index > ut ? (It = lt, lt = null) : It = lt.sibling;
        var St = x(
          M,
          lt,
          D[ut],
          U
        );
        if (St === null) {
          lt === null && (lt = It);
          break;
        }
        t && lt && St.alternate === null && e(M, lt), A = u(St, A, ut), vt === null ? I = St : vt.sibling = St, vt = St, lt = It;
      }
      if (ut === D.length)
        return n(M, lt), mt && _n(M, ut), I;
      if (lt === null) {
        for (; ut < D.length; ut++)
          lt = B(M, D[ut], U), lt !== null && (A = u(
            lt,
            A,
            ut
          ), vt === null ? I = lt : vt.sibling = lt, vt = lt);
        return mt && _n(M, ut), I;
      }
      for (lt = i(lt); ut < D.length; ut++)
        It = O(
          lt,
          M,
          ut,
          D[ut],
          U
        ), It !== null && (t && (St = It.alternate, St !== null && lt.delete(St.key === null ? ut : St.key)), A = u(
          It,
          A,
          ut
        ), vt === null ? I = It : vt.sibling = It, vt = It);
      return t && lt.forEach(function(pi) {
        return e(M, pi);
      }), mt && _n(M, ut), I;
    }
    function tt(M, A, D, U) {
      if (D == null) throw Error(r(151));
      for (var I = null, vt = null, lt = A, ut = A = 0, It = null, St = D.next(); lt !== null && !St.done; ut++, St = D.next()) {
        lt.index > ut ? (It = lt, lt = null) : It = lt.sibling;
        var pi = x(M, lt, St.value, U);
        if (pi === null) {
          lt === null && (lt = It);
          break;
        }
        t && lt && pi.alternate === null && e(M, lt), A = u(pi, A, ut), vt === null ? I = pi : vt.sibling = pi, vt = pi, lt = It;
      }
      if (St.done)
        return n(M, lt), mt && _n(M, ut), I;
      if (lt === null) {
        for (; !St.done; ut++, St = D.next())
          St = B(M, St.value, U), St !== null && (A = u(St, A, ut), vt === null ? I = St : vt.sibling = St, vt = St);
        return mt && _n(M, ut), I;
      }
      for (lt = i(lt); !St.done; ut++, St = D.next())
        St = O(lt, M, ut, St.value, U), St !== null && (t && (It = St.alternate, It !== null && lt.delete(
          It.key === null ? ut : It.key
        )), A = u(St, A, ut), vt === null ? I = St : vt.sibling = St, vt = St);
      return t && lt.forEach(function(ib) {
        return e(M, ib);
      }), mt && _n(M, ut), I;
    }
    function ht(M, A, D, U) {
      if (typeof D == "object" && D !== null && D.type === dt && D.key === null && D.props.ref === void 0 && (D = D.props.children), typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case ot:
            t: {
              for (var I = D.key; A !== null; ) {
                if (A.key === I) {
                  if (I = D.type, I === dt) {
                    if (A.tag === 7) {
                      n(
                        M,
                        A.sibling
                      ), U = s(
                        A,
                        D.props.children
                      ), In(U, D), U.return = M, M = U;
                      break t;
                    }
                  } else if (A.elementType === I || typeof I == "object" && I !== null && I.$$typeof === F && wi(I) === A.type) {
                    n(
                      M,
                      A.sibling
                    ), U = s(A, D.props), In(U, D), U.return = M, M = U;
                    break t;
                  }
                  n(M, A);
                  break;
                } else e(M, A);
                A = A.sibling;
              }
              D.type === dt ? (U = Di(
                D.props.children,
                M.mode,
                U,
                D.key
              ), In(U, D), U.return = M, M = U) : (U = Ns(
                D.type,
                D.key,
                D.props,
                null,
                M.mode,
                U
              ), In(U, D), U.return = M, M = U);
            }
            return f(M);
          case W:
            t: {
              for (I = D.key; A !== null; ) {
                if (A.key === I)
                  if (A.tag === 4 && A.stateNode.containerInfo === D.containerInfo && A.stateNode.implementation === D.implementation) {
                    n(
                      M,
                      A.sibling
                    ), U = s(A, D.children || []), U.return = M, M = U;
                    break t;
                  } else {
                    n(M, A);
                    break;
                  }
                else e(M, A);
                A = A.sibling;
              }
              U = $o(D, M.mode, U), U.return = M, M = U;
            }
            return f(M);
          case F:
            return D = wi(D), ht(
              M,
              A,
              D,
              U
            );
        }
        if (xt(D))
          return K(
            M,
            A,
            D,
            U
          );
        if (at(D)) {
          if (I = at(D), typeof I != "function") throw Error(r(150));
          return D = I.call(D), tt(
            M,
            A,
            D,
            U
          );
        }
        if (typeof D.then == "function")
          return ht(
            M,
            A,
            qs(D),
            U
          );
        if (D.$$typeof === Ct)
          return ht(
            M,
            A,
            js(M, D),
            U
          );
        Gs(M, D);
      }
      return typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint" ? (D = "" + D, A !== null && A.tag === 6 ? (n(M, A.sibling), U = s(A, D), U.return = M, M = U) : (n(M, A), U = Wo(D, M.mode, U), U.return = M, M = U), f(M)) : n(M, A);
    }
    return function(M, A, D, U) {
      try {
        gl = 0;
        var I = ht(
          M,
          A,
          D,
          U
        );
        return pa = null, I;
      } catch (lt) {
        if (lt === ya || lt === Hs) throw lt;
        var vt = Ae(29, lt, null, M.mode);
        return vt.lanes = U, vt.return = M, vt;
      }
    };
  }
  var Bi = Qd(!0), Zd = Qd(!1), Wn = !1;
  function rr(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function cr(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function $n(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function ti(t, e, n) {
    var i = t.updateQueue;
    if (i === null) return null;
    if (i = i.shared, (Mt & 2) !== 0) {
      var s = i.pending;
      return s === null ? e.next = e : (e.next = s.next, s.next = e), i.pending = e, e = Rs(t), zd(t, null, n), e;
    }
    return Os(t, i, e, n), Rs(t);
  }
  function vl(t, e, n) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (n & 4194048) !== 0)) {
      var i = e.lanes;
      i &= t.pendingLanes, n |= i, e.lanes = n, _h(t, n);
    }
  }
  function fr(t, e) {
    var n = t.updateQueue, i = t.alternate;
    if (i !== null && (i = i.updateQueue, n === i)) {
      var s = null, u = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var f = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          u === null ? s = u = f : u = u.next = f, n = n.next;
        } while (n !== null);
        u === null ? s = u = e : u = u.next = e;
      } else s = u = e;
      n = {
        baseState: i.baseState,
        firstBaseUpdate: s,
        lastBaseUpdate: u,
        shared: i.shared,
        callbacks: i.callbacks
      }, t.updateQueue = n;
      return;
    }
    t = n.lastBaseUpdate, t === null ? n.firstBaseUpdate = e : t.next = e, n.lastBaseUpdate = e;
  }
  var hr = !1;
  function Sl() {
    if (hr) {
      var t = ma;
      if (t !== null) throw t;
    }
  }
  function Tl(t, e, n, i) {
    hr = !1;
    var s = t.updateQueue;
    Wn = !1;
    var u = s.firstBaseUpdate, f = s.lastBaseUpdate, m = s.shared.pending;
    if (m !== null) {
      s.shared.pending = null;
      var T = m, C = T.next;
      T.next = null, f === null ? u = C : f.next = C, f = T;
      var R = t.alternate;
      R !== null && (R = R.updateQueue, m = R.lastBaseUpdate, m !== f && (m === null ? R.firstBaseUpdate = C : m.next = C, R.lastBaseUpdate = T));
    }
    if (u !== null) {
      var B = s.baseState;
      f = 0, R = C = T = null, m = u;
      do {
        var x = m.lane & -536870913, O = x !== m.lane;
        if (O ? (gt & x) === x : (i & x) === x) {
          x !== 0 && x === _i && (hr = !0), R !== null && (R = R.next = {
            lane: 0,
            tag: m.tag,
            payload: m.payload,
            callback: null,
            next: null
          });
          t: {
            var K = t, tt = m;
            x = e;
            var ht = n;
            switch (tt.tag) {
              case 1:
                if (K = tt.payload, typeof K == "function") {
                  B = K.call(ht, B, x);
                  break t;
                }
                B = K;
                break t;
              case 3:
                K.flags = K.flags & -65537 | 128;
              case 0:
                if (K = tt.payload, x = typeof K == "function" ? K.call(ht, B, x) : K, x == null) break t;
                B = J({}, B, x);
                break t;
              case 2:
                Wn = !0;
            }
          }
          x = m.callback, x !== null && (t.flags |= 64, O && (t.flags |= 8192), O = s.callbacks, O === null ? s.callbacks = [x] : O.push(x));
        } else
          O = {
            lane: x,
            tag: m.tag,
            payload: m.payload,
            callback: m.callback,
            next: null
          }, R === null ? (C = R = O, T = B) : R = R.next = O, f |= x;
        if (m = m.next, m === null) {
          if (m = s.shared.pending, m === null)
            break;
          O = m, m = O.next, O.next = null, s.lastBaseUpdate = O, s.shared.pending = null;
        }
      } while (!0);
      R === null && (T = B), s.baseState = T, s.firstBaseUpdate = C, s.lastBaseUpdate = R, u === null && (s.shared.lanes = 0), ui |= f, t.lanes = f, t.memoizedState = B;
    }
  }
  function Kd(t, e) {
    if (typeof t != "function")
      throw Error(r(191, t));
    t.call(e);
  }
  function Jd(t, e) {
    var n = t.callbacks;
    if (n !== null)
      for (t.callbacks = null, t = 0; t < n.length; t++)
        Kd(n[t], e);
  }
  var ei = on(null), Xs = on(0);
  function Fd(t, e) {
    t = Hn, jt(Xs, t), jt(ei, e), Hn = t | e.baseLanes;
  }
  function dr() {
    jt(Xs, Hn), jt(ei, ei.current);
  }
  function mr() {
    Hn = Xs.current, le(ei), le(Xs);
  }
  var oe = on(null), ye = null;
  function ni(t) {
    var e = t.alternate;
    jt(re, re.current & 1), jt(oe, t), ye === null && (e === null || ei.current !== null || e.memoizedState !== null) && (ye = t);
  }
  function yr(t) {
    jt(re, re.current), jt(oe, t), ye === null && (ye = t);
  }
  function kd(t) {
    t.tag === 22 ? (jt(re, re.current), jt(oe, t), ye === null && (ye = t)) : ii();
  }
  function ii() {
    jt(re, re.current), jt(oe, oe.current);
  }
  function we(t) {
    le(oe), ye === t && (ye = null), le(re);
  }
  var re = on(0);
  function bl(t, e) {
    jt(oe, oe.current), jt(re, e);
  }
  function pr(t) {
    le(re), le(oe), ye === t && (ye = null);
  }
  function Qs(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var n = e.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || Lc(n) || Hc(n)))
          return e;
      } else if (e.tag === 19 && e.memoizedProps.revealOrder !== "independent") {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    return null;
  }
  var Un = 0, ft = null, _t = null, kt = null, Zs = !1, ga = !1, ji = !1, Ks = 0, El = 0, va = null, xS = 0;
  function Qt() {
    throw Error(r(321));
  }
  function gr(t, e) {
    if (e === null) return !1;
    for (var n = 0; n < e.length && n < t.length; n++)
      if (!Ve(t[n], e[n])) return !1;
    return !0;
  }
  function vr(t, e, n, i, s, u) {
    return Un = u, ft = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, nt.H = t === null || t.memoizedState === null ? _m : Vm, ji = !1, u = n(i, s), ji = !1, ga && (u = Id(
      e,
      n,
      i,
      s
    )), Pd(t), u;
  }
  function Pd(t) {
    nt.H = $s;
    var e = _t !== null && _t.next !== null;
    if (Un = 0, kt = _t = ft = null, Zs = !1, El = 0, va = null, e) throw Error(r(300));
    t === null || Pt || (t = t.dependencies, t !== null && Bs(t) && (Pt = !0));
  }
  function Id(t, e, n, i) {
    ft = t;
    var s = 0;
    do {
      if (ga && (va = null), El = 0, ga = !1, 25 <= s) throw Error(r(301));
      if (s += 1, kt = _t = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      nt.H = _S, u = e(n, i);
    } while (ga);
    return u;
  }
  function MS() {
    var t = nt.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? Al(e) : e, t = t.useState()[0], (_t !== null ? _t.memoizedState : null) !== t && (ft.flags |= 1024), e;
  }
  function Sr() {
    var t = Ks !== 0;
    return Ks = 0, t;
  }
  function Tr(t, e, n) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~n;
  }
  function br(t) {
    if (Zs) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      Zs = !1;
    }
    Un = 0, kt = _t = ft = null, ga = !1, El = Ks = 0, va = null;
  }
  function ge() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return kt === null ? ft.memoizedState = kt = t : kt = kt.next = t, kt;
  }
  function Jt() {
    if (_t === null) {
      var t = ft.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = _t.next;
    var e = kt === null ? ft.memoizedState : kt.next;
    if (e !== null)
      kt = e, _t = t;
    else {
      if (t === null)
        throw ft.alternate === null ? Error(r(467)) : Error(r(310));
      _t = t, t = {
        memoizedState: _t.memoizedState,
        baseState: _t.baseState,
        baseQueue: _t.baseQueue,
        queue: _t.queue,
        next: null
      }, kt === null ? ft.memoizedState = kt = t : kt = kt.next = t;
    }
    return kt;
  }
  function Js() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Al(t) {
    var e = El;
    return El += 1, va === null && (va = []), t = qd(va, t, e), e = ft, (kt === null ? e.memoizedState : kt.next) === null && (e = e.alternate, nt.H = e === null || e.memoizedState === null ? _m : Vm), t;
  }
  function Fs(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Al(t);
      if (t.$$typeof === Y) return;
      if (t.$$typeof === Ct) return ue(t);
    }
    throw Error(r(438, String(t)));
  }
  function Er(t) {
    var e = null, n = ft.updateQueue;
    if (n !== null && (e = n.memoCache), e == null) {
      var i = ft.alternate;
      i !== null && (i = i.updateQueue, i !== null && (i = i.memoCache, i != null && (e = {
        data: i.data.map(function(s) {
          return s.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), n === null && (n = Js(), ft.updateQueue = n), n.memoCache = e, n = e.data[e.index], n === void 0)
      for (n = e.data[e.index] = Array(t), i = 0; i < t; i++)
        n[i] = ze;
    return e.index++, n;
  }
  function Bn(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function ks(t) {
    var e = Jt();
    return Ar(e, _t, t);
  }
  function Ar(t, e, n) {
    var i = t.queue;
    if (i === null) throw Error(r(311));
    i.lastRenderedReducer = n;
    var s = t.baseQueue, u = i.pending;
    if (u !== null) {
      if (s !== null) {
        var f = s.next;
        s.next = u.next, u.next = f;
      }
      e.baseQueue = s = u, i.pending = null;
    }
    if (u = t.baseState, s === null) t.memoizedState = u;
    else {
      e = s.next;
      var m = f = null, T = null, C = e, R = !1;
      do {
        var B = C.lane & -536870913;
        if (B !== C.lane ? (gt & B) === B : (Un & B) === B) {
          var x = C.revertLane;
          if (x === 0)
            T !== null && (T = T.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: C.action,
              hasEagerState: C.hasEagerState,
              eagerState: C.eagerState,
              next: null
            }), B === _i && (R = !0);
          else if ((Un & x) === x) {
            C = C.next, x === _i && (R = !0);
            continue;
          } else
            B = {
              lane: 0,
              revertLane: C.revertLane,
              gesture: null,
              action: C.action,
              hasEagerState: C.hasEagerState,
              eagerState: C.eagerState,
              next: null
            }, T === null ? (m = T = B, f = u) : T = T.next = B, ft.lanes |= x, ui |= x;
          B = C.action, ji && n(u, B), u = C.hasEagerState ? C.eagerState : n(u, B);
        } else
          x = {
            lane: B,
            revertLane: C.revertLane,
            gesture: C.gesture,
            action: C.action,
            hasEagerState: C.hasEagerState,
            eagerState: C.eagerState,
            next: null
          }, T === null ? (m = T = x, f = u) : T = T.next = x, ft.lanes |= B, ui |= B;
        C = C.next;
      } while (C !== null && C !== e);
      if (T === null ? f = u : T.next = m, !Ve(u, t.memoizedState) && (Pt = !0, R && (n = ma, n !== null)))
        throw n;
      t.memoizedState = u, t.baseState = f, t.baseQueue = T, i.lastRenderedState = u;
    }
    return s === null && (i.lanes = 0), [t.memoizedState, i.dispatch];
  }
  function xr(t) {
    var e = Jt(), n = e.queue;
    if (n === null) throw Error(r(311));
    n.lastRenderedReducer = t;
    var i = n.dispatch, s = n.pending, u = e.memoizedState;
    if (s !== null) {
      n.pending = null;
      var f = s = s.next;
      do
        u = t(u, f.action), f = f.next;
      while (f !== s);
      Ve(u, e.memoizedState) || (Pt = !0), e.memoizedState = u, e.baseQueue === null && (e.baseState = u), n.lastRenderedState = u;
    }
    return [u, i];
  }
  function Wd(t, e, n) {
    var i = ft, s = Jt(), u = mt;
    if (u) {
      if (n === void 0) throw Error(r(407));
      n = n();
    } else n = e();
    var f = !Ve(
      (_t || s).memoizedState,
      n
    );
    if (f && (s.memoizedState = n, Pt = !0), s = s.queue, Dr(em.bind(null, i, s, t), [
      t
    ]), t = s.getSnapshot !== e || f || kt !== null && (kt.memoizedState.tag & 1) !== 0, Sa(
      t ? 9 : 8,
      { destroy: void 0 },
      tm.bind(null, i, s, n, e),
      null
    ), t) {
      if (i.flags |= 2048, Vt === null) throw Error(r(349));
      u || (Un & 127) !== 0 || $d(i, e, n);
    }
    return n;
  }
  function $d(t, e, n) {
    t.flags |= 16384, t = { getSnapshot: e, value: n }, e = ft.updateQueue, e === null ? (e = Js(), ft.updateQueue = e, e.stores = [t]) : (n = e.stores, n === null ? e.stores = [t] : n.push(t));
  }
  function tm(t, e, n, i) {
    e.value = n, e.getSnapshot = i, nm(e) && im(t);
  }
  function em(t, e, n) {
    return n(function() {
      nm(e) && im(t);
    });
  }
  function nm(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var n = e();
      return !Ve(t, n);
    } catch {
      return !0;
    }
  }
  function im(t) {
    var e = Ci(t, 2);
    e !== null && De(e, t, 2);
  }
  function Mr(t) {
    var e = ge();
    if (typeof t == "function") {
      var n = t;
      if (t = n(), ji) {
        Qn(!0);
        try {
          n();
        } finally {
          Qn(!1);
        }
      }
    }
    return e.memoizedState = e.baseState = t, e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Bn,
      lastRenderedState: t
    }, e;
  }
  function am(t, e, n, i) {
    return t.baseState = n, Ar(
      t,
      _t,
      typeof i == "function" ? i : Bn
    );
  }
  function CS(t, e, n, i, s) {
    if (Ws(t)) throw Error(r(485));
    if (t = e.action, t !== null) {
      var u = {
        payload: s,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(f) {
          u.listeners.push(f);
        }
      };
      nt.T !== null ? n(!0) : u.isTransition = !1, i(u), n = e.pending, n === null ? (u.next = e.pending = u, lm(e, u)) : (u.next = n.next, e.pending = n.next = u);
    }
  }
  function lm(t, e) {
    var n = e.action, i = e.payload, s = t.state;
    if (e.isTransition) {
      var u = nt.T, f = {};
      f.types = u !== null ? u.types : null, nt.T = f;
      try {
        var m = n(s, i), T = nt.S;
        T !== null && T(f, m), sm(t, e, m);
      } catch (C) {
        Cr(t, e, C);
      } finally {
        u !== null && f.types !== null && (u.types = f.types), nt.T = u;
      }
    } else
      try {
        u = n(s, i), sm(t, e, u);
      } catch (C) {
        Cr(t, e, C);
      }
  }
  function sm(t, e, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(i) {
        um(t, e, i);
      },
      function(i) {
        return Cr(t, e, i);
      }
    ) : um(t, e, n);
  }
  function um(t, e, n) {
    e.status = "fulfilled", e.value = n, om(e), t.state = n, e = t.pending, e !== null && (n = e.next, n === e ? t.pending = null : (n = n.next, e.next = n, lm(t, n)));
  }
  function Cr(t, e, n) {
    var i = t.pending;
    if (t.pending = null, i !== null) {
      i = i.next;
      do
        e.status = "rejected", e.reason = n, om(e), e = e.next;
      while (e !== i);
    }
    t.action = null;
  }
  function om(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function rm(t, e) {
    return e;
  }
  function cm(t, e) {
    if (mt) {
      var n = Vt.formState;
      if (n !== null) {
        t: {
          var i = ft;
          if (mt) {
            if (Lt) {
              e: {
                for (var s = Lt, u = Ke; s.nodeType !== 8; ) {
                  if (!u) {
                    s = null;
                    break e;
                  }
                  if (s = Fe(
                    s.nextSibling
                  ), s === null) {
                    s = null;
                    break e;
                  }
                }
                u = s.data, s = u === "F!" || u === "F" ? s : null;
              }
              if (s) {
                Lt = Fe(
                  s.nextSibling
                ), i = s.data === "F!";
                break t;
              }
            }
            kn(i);
          }
          i = !1;
        }
        i && (e = n[0]);
      }
    }
    return n = ge(), n.memoizedState = n.baseState = e, i = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: rm,
      lastRenderedState: e
    }, n.queue = i, n = Om.bind(
      null,
      ft,
      i
    ), i.dispatch = n, i = Mr(!1), u = _r.bind(
      null,
      ft,
      !1,
      i.queue
    ), i = ge(), s = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, i.queue = s, n = CS.bind(
      null,
      ft,
      s,
      u,
      n
    ), s.dispatch = n, i.memoizedState = t, [e, n, !1];
  }
  function fm(t) {
    var e = Jt();
    return hm(e, _t, t);
  }
  function hm(t, e, n) {
    if (e = Ar(
      t,
      e,
      rm
    )[0], t = ks(Bn)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var i = Al(e);
      } catch (f) {
        throw f === ya ? Hs : f;
      }
    else i = e;
    e = Jt();
    var s = e.queue, u = s.dispatch;
    return n !== e.memoizedState && (ft.flags |= 2048, Sa(
      9,
      { destroy: void 0 },
      DS.bind(null, s, n),
      null
    )), [i, u, t];
  }
  function DS(t, e) {
    t.action = e;
  }
  function dm(t) {
    var e = Jt(), n = _t;
    if (n !== null)
      return hm(e, n, t);
    Jt(), e = e.memoizedState, n = Jt();
    var i = n.queue.dispatch;
    return n.memoizedState = t, [e, i, !1];
  }
  function Sa(t, e, n, i) {
    return t = { tag: t, create: n, deps: i, inst: e, next: null }, e = ft.updateQueue, e === null && (e = Js(), ft.updateQueue = e), n = e.lastEffect, n === null ? e.lastEffect = t.next = t : (i = n.next, n.next = t, t.next = i, e.lastEffect = t), t;
  }
  function mm() {
    return Jt().memoizedState;
  }
  function Ps(t, e, n, i) {
    var s = ge();
    ft.flags |= t, s.memoizedState = Sa(
      1 | e,
      { destroy: void 0 },
      n,
      i === void 0 ? null : i
    );
  }
  function Is(t, e, n, i) {
    var s = Jt();
    i = i === void 0 ? null : i;
    var u = s.memoizedState.inst;
    _t !== null && i !== null && gr(i, _t.memoizedState.deps) ? s.memoizedState = Sa(e, u, n, i) : (ft.flags |= t, s.memoizedState = Sa(
      1 | e,
      u,
      n,
      i
    ));
  }
  function ym(t, e) {
    Ps(8390656, 8, t, e);
  }
  function Dr(t, e) {
    Is(2048, 8, t, e);
  }
  function zS(t) {
    ft.flags |= 4;
    var e = ft.updateQueue;
    if (e === null)
      e = Js(), ft.updateQueue = e, e.events = [t];
    else {
      var n = e.events;
      n === null ? e.events = [t] : n.push(t);
    }
  }
  function pm(t) {
    var e = Jt().memoizedState;
    return zS({ ref: e, nextImpl: t }), function() {
      if ((Mt & 2) !== 0) throw Error(r(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function gm(t, e) {
    return Is(4, 2, t, e);
  }
  function vm(t, e) {
    return Is(4, 4, t, e);
  }
  function Sm(t, e) {
    if (typeof e == "function") {
      t = t();
      var n = e(t);
      return function() {
        typeof n == "function" ? n() : e(null);
      };
    }
    if (e != null)
      return t = t(), e.current = t, function() {
        e.current = null;
      };
  }
  function Tm(t, e, n) {
    n = n != null ? n.concat([t]) : null, Is(4, 4, Sm.bind(null, e, t), n);
  }
  function zr() {
  }
  function bm(t, e) {
    var n = Jt();
    e = e === void 0 ? null : e;
    var i = n.memoizedState;
    return e !== null && gr(e, i[1]) ? i[0] : (n.memoizedState = [t, e], t);
  }
  function Em(t, e) {
    var n = Jt();
    e = e === void 0 ? null : e;
    var i = n.memoizedState;
    if (e !== null && gr(e, i[1]))
      return i[0];
    if (i = t(), ji) {
      Qn(!0);
      try {
        t();
      } finally {
        Qn(!1);
      }
    }
    return n.memoizedState = [i, e], i;
  }
  function Or(t, e, n) {
    return n === void 0 || (Un & 1073741824) !== 0 && (gt & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = n, t = _y(), ft.lanes |= t, ui |= t, n);
  }
  function Am(t, e, n, i) {
    return Ve(n, e) ? n : ei.current !== null ? (t = Or(t, n, i), Ve(t, e) || (Pt = !0), t) : (Un & 106) === 0 || (Un & 1073741824) !== 0 && (gt & 261930) === 0 ? (Pt = !0, t.memoizedState = n) : (t = _y(), ft.lanes |= t, ui |= t, e);
  }
  function xm(t, e, n, i, s) {
    var u = rt.p;
    rt.p = u !== 0 && 8 > u ? u : 8;
    var f = nt.T, m = {};
    m.types = f !== null ? f.types : null, nt.T = m, _r(t, !1, e, n);
    try {
      var T = s(), C = nt.S;
      if (C !== null && C(m, T), T !== null && typeof T == "object" && typeof T.then == "function") {
        var R = AS(
          T,
          i
        );
        xl(
          t,
          e,
          R,
          Le(t)
        );
      } else
        xl(
          t,
          e,
          i,
          Le(t)
        );
    } catch (B) {
      xl(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: B },
        Le()
      );
    } finally {
      rt.p = u, f !== null && m.types !== null && (f.types = m.types), nt.T = f;
    }
  }
  function OS() {
  }
  function Rr(t, e, n, i) {
    if (t.tag !== 5) throw Error(r(476));
    var s = Mm(t).queue;
    xm(
      t,
      s,
      e,
      Mn,
      n === null ? OS : function() {
        return Cm(t), n(i);
      }
    );
  }
  function Mm(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: Mn,
      baseState: Mn,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Bn,
        lastRenderedState: Mn
      },
      next: null
    };
    var n = {};
    return e.next = {
      memoizedState: n,
      baseState: n,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Bn,
        lastRenderedState: n
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function Cm(t) {
    var e = Mm(t);
    e.next === null && (e = t.alternate.memoizedState), xl(
      t,
      e.next.queue,
      {},
      Le()
    );
  }
  function Nr() {
    return ue(La);
  }
  function Dm() {
    return Jt().memoizedState;
  }
  function zm() {
    return Jt().memoizedState;
  }
  function RS(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var n = Le();
          t = $n(n);
          var i = ti(e, t, n);
          i !== null && (De(i, e, n), vl(i, e, n)), e = { cache: lr() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function NS(t, e, n) {
    var i = Le();
    n = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ws(t) ? Rm(e, n) : (n = Po(t, e, n, i), n !== null && (De(n, t, i), Nm(n, e, i)));
  }
  function Om(t, e, n) {
    var i = Le();
    xl(t, e, n, i);
  }
  function xl(t, e, n, i) {
    var s = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Ws(t)) Rm(e, s);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = e.lastRenderedReducer, u !== null))
        try {
          var f = e.lastRenderedState, m = u(f, n);
          if (s.hasEagerState = !0, s.eagerState = m, Ve(m, f))
            return Os(t, e, s, 0), Vt === null && zs(), !1;
        } catch {
        }
      if (n = Po(t, e, s, i), n !== null)
        return De(n, t, i), Nm(n, e, i), !0;
    }
    return !1;
  }
  function _r(t, e, n, i) {
    if (i = {
      lane: 2,
      revertLane: Ec(),
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ws(t)) {
      if (e) throw Error(r(479));
    } else
      e = Po(
        t,
        n,
        i,
        2
      ), e !== null && De(e, t, 2);
  }
  function Ws(t) {
    var e = t.alternate;
    return t === ft || e !== null && e === ft;
  }
  function Rm(t, e) {
    ga = Zs = !0;
    var n = t.pending;
    n === null ? e.next = e : (e.next = n.next, n.next = e), t.pending = e;
  }
  function Nm(t, e, n) {
    if ((n & 4194048) !== 0) {
      var i = e.lanes;
      i &= t.pendingLanes, n |= i, e.lanes = n, _h(t, n);
    }
  }
  var $s = {
    readContext: ue,
    use: Fs,
    useCallback: Qt,
    useContext: Qt,
    useEffect: Qt,
    useImperativeHandle: Qt,
    useLayoutEffect: Qt,
    useInsertionEffect: Qt,
    useMemo: Qt,
    useReducer: Qt,
    useRef: Qt,
    useState: Qt,
    useDebugValue: Qt,
    useDeferredValue: Qt,
    useTransition: Qt,
    useSyncExternalStore: Qt,
    useId: Qt,
    useHostTransitionStatus: Qt,
    useFormState: Qt,
    useActionState: Qt,
    useOptimistic: Qt,
    useMemoCache: Qt,
    useCacheRefresh: Qt,
    useEffectEvent: Qt
  }, _m = {
    readContext: ue,
    use: Fs,
    useCallback: function(t, e) {
      return ge().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: ue,
    useEffect: ym,
    useImperativeHandle: function(t, e, n) {
      n = n != null ? n.concat([t]) : null, Ps(
        4194308,
        4,
        Sm.bind(null, e, t),
        n
      );
    },
    useLayoutEffect: function(t, e) {
      return Ps(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      Ps(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var n = ge();
      e = e === void 0 ? null : e;
      var i = t();
      if (ji) {
        Qn(!0);
        try {
          t();
        } finally {
          Qn(!1);
        }
      }
      return n.memoizedState = [i, e], i;
    },
    useReducer: function(t, e, n) {
      var i = ge();
      if (n !== void 0) {
        var s = n(e);
        if (ji) {
          Qn(!0);
          try {
            n(e);
          } finally {
            Qn(!1);
          }
        }
      } else s = e;
      return i.memoizedState = i.baseState = s, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: s
      }, i.queue = t, t = t.dispatch = NS.bind(
        null,
        ft,
        t
      ), [i.memoizedState, t];
    },
    useRef: function(t) {
      var e = ge();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = Mr(t);
      var e = t.queue, n = Om.bind(null, ft, e);
      return e.dispatch = n, [t.memoizedState, n];
    },
    useDebugValue: zr,
    useDeferredValue: function(t, e) {
      var n = ge();
      return Or(n, t, e);
    },
    useTransition: function() {
      var t = Mr(!1);
      return t = xm.bind(
        null,
        ft,
        t.queue,
        !0,
        !1
      ), ge().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, n) {
      var i = ft, s = ge();
      if (mt) {
        if (n === void 0)
          throw Error(r(407));
        n = n();
      } else {
        if (n = e(), Vt === null)
          throw Error(r(349));
        (gt & 127) !== 0 || $d(i, e, n);
      }
      s.memoizedState = n;
      var u = { value: n, getSnapshot: e };
      return s.queue = u, ym(em.bind(null, i, u, t), [
        t
      ]), i.flags |= 2048, Sa(
        9,
        { destroy: void 0 },
        tm.bind(
          null,
          i,
          u,
          n,
          e
        ),
        null
      ), n;
    },
    useId: function() {
      var t = ge(), e = Vt.identifierPrefix;
      if (mt) {
        var n = hn, i = fn;
        n = (i & ~(1 << 32 - Ne(i) - 1)).toString(32) + n, e = "_" + e + "R_" + n, n = Ks++, 0 < n && (e += "H" + n.toString(32)), e += "_";
      } else
        n = xS++, e = "_" + e + "r_" + n.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: Nr,
    useFormState: cm,
    useActionState: cm,
    useOptimistic: function(t) {
      var e = ge();
      e.memoizedState = e.baseState = t;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = n, e = _r.bind(
        null,
        ft,
        !0,
        n
      ), n.dispatch = e, [t, e];
    },
    useMemoCache: Er,
    useCacheRefresh: function() {
      return ge().memoizedState = RS.bind(
        null,
        ft
      );
    },
    useEffectEvent: function(t) {
      var e = ge(), n = { impl: t };
      return e.memoizedState = n, function() {
        if ((Mt & 2) !== 0)
          throw Error(r(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, Vm = {
    readContext: ue,
    use: Fs,
    useCallback: bm,
    useContext: ue,
    useEffect: Dr,
    useImperativeHandle: Tm,
    useInsertionEffect: gm,
    useLayoutEffect: vm,
    useMemo: Em,
    useReducer: ks,
    useRef: mm,
    useState: function() {
      return ks(Bn);
    },
    useDebugValue: zr,
    useDeferredValue: function(t, e) {
      var n = Jt();
      return Am(
        n,
        _t.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = ks(Bn)[0], e = Jt().memoizedState;
      return [
        typeof t == "boolean" ? t : Al(t),
        e
      ];
    },
    useSyncExternalStore: Wd,
    useId: Dm,
    useHostTransitionStatus: Nr,
    useFormState: fm,
    useActionState: fm,
    useOptimistic: function(t, e) {
      var n = Jt();
      return am(n, _t, t, e);
    },
    useMemoCache: Er,
    useCacheRefresh: zm,
    useEffectEvent: pm
  }, _S = {
    readContext: ue,
    use: Fs,
    useCallback: bm,
    useContext: ue,
    useEffect: Dr,
    useImperativeHandle: Tm,
    useInsertionEffect: gm,
    useLayoutEffect: vm,
    useMemo: Em,
    useReducer: xr,
    useRef: mm,
    useState: function() {
      return xr(Bn);
    },
    useDebugValue: zr,
    useDeferredValue: function(t, e) {
      var n = Jt();
      return _t === null ? Or(n, t, e) : Am(
        n,
        _t.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = xr(Bn)[0], e = Jt().memoizedState;
      return [
        typeof t == "boolean" ? t : Al(t),
        e
      ];
    },
    useSyncExternalStore: Wd,
    useId: Dm,
    useHostTransitionStatus: Nr,
    useFormState: dm,
    useActionState: dm,
    useOptimistic: function(t, e) {
      var n = Jt();
      return _t !== null ? am(n, _t, t, e) : (n.baseState = t, [t, n.queue.dispatch]);
    },
    useMemoCache: Er,
    useCacheRefresh: zm,
    useEffectEvent: pm
  };
  function Vr(t, e, n, i) {
    e = t.memoizedState, n = n(i, e), n = n == null ? e : J({}, e, n), t.memoizedState = n, t.lanes === 0 && (t.updateQueue.baseState = n);
  }
  var wr = {
    enqueueSetState: function(t, e, n) {
      t = t._reactInternals;
      var i = Le(), s = $n(i);
      s.payload = e, n != null && (s.callback = n), e = ti(t, s, i), e !== null && (De(e, t, i), vl(e, t, i));
    },
    enqueueReplaceState: function(t, e, n) {
      t = t._reactInternals;
      var i = Le(), s = $n(i);
      s.tag = 1, s.payload = e, n != null && (s.callback = n), e = ti(t, s, i), e !== null && (De(e, t, i), vl(e, t, i));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var n = Le(), i = $n(n);
      i.tag = 2, e != null && (i.callback = e), e = ti(t, i, n), e !== null && (De(e, t, n), vl(e, t, n));
    }
  };
  function wm(t, e, n, i, s, u, f) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(i, u, f) : e.prototype && e.prototype.isPureReactComponent ? !cl(n, i) || !cl(s, u) : !0;
  }
  function Um(t, e, n, i) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(n, i), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(n, i), e.state !== t && wr.enqueueReplaceState(e, e.state, null);
  }
  function Li(t, e) {
    var n = e;
    if ("ref" in e) {
      n = {};
      for (var i in e)
        i !== "ref" && (n[i] = e[i]);
    }
    if (t = t.defaultProps) {
      n === e && (n = J({}, n));
      for (var s in t)
        n[s] === void 0 && (n[s] = t[s]);
    }
    return n;
  }
  function Bm(t) {
    Ds(t);
  }
  function jm(t) {
    console.error(t);
  }
  function Lm(t) {
    Ds(t);
  }
  function tu(t, e) {
    try {
      var n = t.onUncaughtError;
      n(e.value, { componentStack: e.stack });
    } catch (i) {
      setTimeout(function() {
        throw i;
      });
    }
  }
  function Hm(t, e, n) {
    try {
      var i = t.onCaughtError;
      i(n.value, {
        componentStack: n.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null
      });
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  function Ur(t, e, n) {
    return n = $n(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      tu(t, e);
    }, n;
  }
  function Ym(t) {
    return t = $n(t), t.tag = 3, t;
  }
  function qm(t, e, n, i) {
    var s = n.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var u = i.value;
      t.payload = function() {
        return s(u);
      }, t.callback = function() {
        Hm(e, n, i);
      };
    }
    var f = n.stateNode;
    f !== null && typeof f.componentDidCatch == "function" && (t.callback = function() {
      Hm(e, n, i), typeof s != "function" && (oi === null ? oi = /* @__PURE__ */ new Set([this]) : oi.add(this));
      var m = i.stack;
      this.componentDidCatch(i.value, {
        componentStack: m !== null ? m : ""
      });
    });
  }
  function VS(t, e, n, i, s) {
    if (n.flags |= 32768, i !== null && typeof i == "object" && typeof i.then == "function") {
      if (e = n.alternate, e !== null && Ri(
        e,
        n,
        s,
        !0
      ), n = oe.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
          case 19:
            return ye === null ? bu() : n.alternate === null && Zt === 0 && (Zt = 3), n.flags &= -257, n.flags |= 65536, n.lanes = s, i === Ys ? n.flags |= 16384 : (e = n.updateQueue, e === null ? n.updateQueue = /* @__PURE__ */ new Set([i]) : e.add(i), Sc(t, i, s)), !1;
          case 22:
            return n.flags |= 65536, i === Ys ? n.flags |= 16384 : (e = n.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([i])
            }, n.updateQueue = e) : (n = e.retryQueue, n === null ? e.retryQueue = /* @__PURE__ */ new Set([i]) : n.add(i)), Sc(t, i, s)), !1;
        }
        throw Error(r(435, n.tag));
      }
      return Sc(t, i, s), bu(), !1;
    }
    if (mt)
      return e = oe.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = s, i !== er && (t = Error(r(422), { cause: i }), dl(Xe(t, n)))) : (i !== er && (e = Error(r(423), {
        cause: i
      }), dl(
        Xe(e, n)
      )), t = t.current.alternate, t.flags |= 65536, s &= -s, t.lanes |= s, i = Xe(i, n), s = Ur(
        t.stateNode,
        i,
        s
      ), fr(t, s), Zt !== 4 && (Zt = 2)), !1;
    var u = Error(r(520), { cause: i });
    if (u = Xe(u, n), _l === null ? _l = [u] : _l.push(u), Zt !== 4 && (Zt = 2), e === null) return !0;
    i = Xe(i, n), n = e;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, t = s & -s, n.lanes |= t, t = Ur(n.stateNode, i, t), fr(n, t), !1;
        case 1:
          if (e = n.type, u = n.stateNode, (n.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (oi === null || !oi.has(u))))
            return n.flags |= 65536, s &= -s, n.lanes |= s, s = Ym(s), qm(
              s,
              t,
              n,
              i
            ), fr(n, s), !1;
          break;
        case 22:
          if (n.memoizedState !== null)
            return n.flags |= 65536, !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var Br = Error(r(461)), Pt = !1;
  function $t(t, e, n, i) {
    e.child = t === null ? Zd(e, null, n, i) : Bi(
      e,
      t.child,
      n,
      i
    );
  }
  function Gm(t, e, n, i, s) {
    n = n.render;
    var u = e.ref;
    if ("ref" in i) {
      var f = {};
      for (var m in i)
        m !== "ref" && (f[m] = i[m]);
    } else f = i;
    return Ni(e), i = vr(
      t,
      e,
      n,
      f,
      u,
      s
    ), m = Sr(), t !== null && !Pt ? (Tr(t, e, s), jn(t, e, s)) : (mt && m && Vs(e), e.flags |= 1, $t(t, e, i, s), e.child);
  }
  function Xm(t, e, n, i, s) {
    if (t === null) {
      var u = n.type;
      return typeof u == "function" && !Io(u) && u.defaultProps === void 0 && n.compare === null ? (e.tag = 15, e.type = u, Qm(
        t,
        e,
        u,
        i,
        s
      )) : (t = Ns(
        n.type,
        null,
        i,
        e,
        e.mode,
        s
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (u = t.child, !Qr(t, s)) {
      var f = u.memoizedProps;
      if (n = n.compare, n = n !== null ? n : cl, n(f, i) && t.ref === e.ref)
        return jn(t, e, s);
    }
    return e.flags |= 1, t = Nn(u, i), t.ref = e.ref, t.return = e, e.child = t;
  }
  function Qm(t, e, n, i, s) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (cl(u, i) && t.ref === e.ref)
        if (Pt = !1, e.pendingProps = i = u, Qr(t, s))
          (t.flags & 131072) !== 0 && (Pt = !0);
        else
          return e.lanes = t.lanes, jn(t, e, s);
    }
    return jr(
      t,
      e,
      n,
      i,
      s
    );
  }
  function Zm(t, e, n, i) {
    var s = i.children, u = t !== null ? t.memoizedState : null;
    if (t === null && e.stateNode === null && (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), i.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | n : n, t !== null) {
          for (i = e.child = t.child, s = 0; i !== null; )
            s = s | i.lanes | i.childLanes, i = i.sibling;
          i = s & ~u;
        } else i = 0, e.child = null;
        return Km(
          t,
          e,
          u,
          n,
          i
        );
      }
      if ((n & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Ls(
          e,
          u !== null ? u.cachePool : null
        ), u !== null ? Fd(e, u) : dr(), kd(e);
      else
        return i = e.lanes = 536870912, Km(
          t,
          e,
          u !== null ? u.baseLanes | n : n,
          n,
          i
        );
    } else
      u !== null ? (Ls(e, u.cachePool), Fd(e, u), ii(), e.memoizedState = null) : (t !== null && Ls(e, null), dr(), ii());
    return $t(t, e, s, n), e.child;
  }
  function Ml(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function Km(t, e, n, i, s) {
    var u = ur();
    return u = u === null ? null : { parent: Ft._currentValue, pool: u }, e.memoizedState = {
      baseLanes: n,
      cachePool: u
    }, t !== null && Ls(e, null), dr(), kd(e), t !== null && Ri(t, e, i, !0), e.childLanes = s, null;
  }
  function eu(t, e) {
    return e = nu(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Jm(t, e, n) {
    return Bi(e, t.child, null, n), t = eu(e, e.pendingProps), t.flags |= 2, we(e), e.memoizedState = null, t;
  }
  function wS(t, e, n) {
    var i = e.pendingProps, s = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (mt) {
        if (i.mode === "hidden")
          return t = eu(e, i), e.lanes = 536870912, t.memoizedState = { baseLanes: 0, cachePool: null }, Ml(null, t);
        if (yr(e), (t = Lt) ? (t = S0(
          t,
          Ke
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: Jn !== null ? { id: fn, overflow: hn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = Rd(t), n.return = e, e.child = n, ne = e, Lt = null)) : t = null, t === null) throw kn(e);
        return e.lanes = 536870912, null;
      }
      return eu(e, i);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var f = u.dehydrated;
      if (yr(e), s)
        if (e.flags & 256)
          e.flags &= -257, e = Jm(
            t,
            e,
            n
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(r(558));
      else if (Pt || Ri(t, e, n, !1), s = (n & t.childLanes) !== 0, Pt || s) {
        if (ei.current === null) {
          if (i = Vt, i !== null && (f = Vh(i, n), f !== 0 && f !== u.retryLane))
            throw u.retryLane = f, Ci(t, f), De(i, t, f), Br;
          bu();
        }
        e = Jm(
          t,
          e,
          n
        );
      } else
        t = u.treeContext, Lt = Fe(f.nextSibling), ne = e, mt = !0, Fn = null, Ke = !1, t !== null && Vd(e, t), e = eu(e, i), e.flags |= 134221824;
      return e;
    }
    return t = Nn(t.child, {
      mode: i.mode,
      children: i.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Ta(t, e) {
    var n = e.ref;
    if (n === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(r(284));
      (t === null || t.ref !== n) && (e.flags |= 4194816);
    }
  }
  function jr(t, e, n, i, s) {
    return Ni(e), n = vr(
      t,
      e,
      n,
      i,
      void 0,
      s
    ), i = Sr(), t !== null && !Pt ? (Tr(t, e, s), jn(t, e, s)) : (mt && i && Vs(e), e.flags |= 1, $t(t, e, n, s), e.child);
  }
  function Fm(t, e, n, i, s, u) {
    return Ni(e), e.updateQueue = null, n = Id(
      e,
      i,
      n,
      s
    ), Pd(t), i = Sr(), t !== null && !Pt ? (Tr(t, e, u), jn(t, e, u)) : (mt && i && Vs(e), e.flags |= 1, $t(t, e, n, u), e.child);
  }
  function km(t, e, n, i, s) {
    if (Ni(e), e.stateNode === null) {
      var u = ca, f = n.contextType;
      typeof f == "object" && f !== null && (u = ue(f)), u = new n(i, u), e.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = wr, e.stateNode = u, u._reactInternals = e, u = e.stateNode, u.props = i, u.state = e.memoizedState, u.refs = {}, rr(e), f = n.contextType, u.context = typeof f == "object" && f !== null ? ue(f) : ca, u.state = e.memoizedState, f = n.getDerivedStateFromProps, typeof f == "function" && (Vr(
        e,
        n,
        f,
        i
      ), u.state = e.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (f = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), f !== u.state && wr.enqueueReplaceState(u, u.state, null), Tl(e, i, u, s), Sl(), u.state = e.memoizedState), typeof u.componentDidMount == "function" && (e.flags |= 4194308), i = !0;
    } else if (t === null) {
      u = e.stateNode;
      var m = e.memoizedProps, T = Li(n, m);
      u.props = T;
      var C = u.context, R = n.contextType;
      f = ca, typeof R == "object" && R !== null && (f = ue(R));
      var B = n.getDerivedStateFromProps;
      R = typeof B == "function" || typeof u.getSnapshotBeforeUpdate == "function", m = e.pendingProps !== m, R || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (m || C !== f) && Um(
        e,
        u,
        i,
        f
      ), Wn = !1;
      var x = e.memoizedState;
      u.state = x, Tl(e, i, u, s), Sl(), C = e.memoizedState, m || x !== C || Wn ? (typeof B == "function" && (Vr(
        e,
        n,
        B,
        i
      ), C = e.memoizedState), (T = Wn || wm(
        e,
        n,
        T,
        i,
        x,
        C,
        f
      )) ? (R || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = i, e.memoizedState = C), u.props = i, u.state = C, u.context = f, i = T) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), i = !1);
    } else {
      u = e.stateNode, cr(t, e), f = e.memoizedProps, R = Li(n, f), u.props = R, B = e.pendingProps, x = u.context, C = n.contextType, T = ca, typeof C == "object" && C !== null && (T = ue(C)), m = n.getDerivedStateFromProps, (C = typeof m == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (f !== B || x !== T) && Um(
        e,
        u,
        i,
        T
      ), Wn = !1, x = e.memoizedState, u.state = x, Tl(e, i, u, s), Sl();
      var O = e.memoizedState;
      f !== B || x !== O || Wn || t !== null && t.dependencies !== null && Bs(t.dependencies) ? (typeof m == "function" && (Vr(
        e,
        n,
        m,
        i
      ), O = e.memoizedState), (R = Wn || wm(
        e,
        n,
        R,
        i,
        x,
        O,
        T
      ) || t !== null && t.dependencies !== null && Bs(t.dependencies)) ? (C || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(i, O, T), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        i,
        O,
        T
      )), typeof u.componentDidUpdate == "function" && (e.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || f === t.memoizedProps && x === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || f === t.memoizedProps && x === t.memoizedState || (e.flags |= 1024), e.memoizedProps = i, e.memoizedState = O), u.props = i, u.state = O, u.context = T, i = R) : (typeof u.componentDidUpdate != "function" || f === t.memoizedProps && x === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || f === t.memoizedProps && x === t.memoizedState || (e.flags |= 1024), i = !1);
    }
    return u = i, Ta(t, e), i = (e.flags & 128) !== 0, u || i ? (u = e.stateNode, n = i && typeof n.getDerivedStateFromError != "function" ? null : u.render(), e.flags |= 1, t !== null && i ? (e.child = Bi(
      e,
      t.child,
      null,
      s
    ), e.child = Bi(
      e,
      null,
      n,
      s
    )) : $t(t, e, n, s), e.memoizedState = u.state, t = e.child) : t = jn(
      t,
      e,
      s
    ), t;
  }
  function Pm(t, e, n, i) {
    return zi(), e.flags |= 256, $t(t, e, n, i), e.child;
  }
  var Lr = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Hr(t) {
    return { baseLanes: t, cachePool: Hd() };
  }
  function Yr(t, e, n) {
    return t = t !== null ? t.childLanes & ~n : 0, e && (t |= je), t;
  }
  function Im(t, e, n) {
    var i = e.pendingProps, s = !1, u = (e.flags & 128) !== 0, f;
    if ((f = u) || (f = t !== null && t.memoizedState === null ? !1 : (re.current & 2) !== 0), f && (s = !0, e.flags &= -129), f = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (mt) {
        if (s ? ni(e) : ii(), (t = Lt) ? (t = S0(
          t,
          Ke
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: Jn !== null ? { id: fn, overflow: hn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = Rd(t), n.return = e, e.child = n, ne = e, Lt = null)) : t = null, t === null) throw kn(e);
        return Hc(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      return u = i.children, i = i.fallback, s ? (ii(), s = e.mode, u = nu(
        { mode: "hidden", children: u },
        s
      ), i = Di(
        i,
        s,
        n,
        null
      ), u.return = e, i.return = e, u.sibling = i, e.child = u, i = e.child, i.memoizedState = Hr(n), i.childLanes = Yr(
        t,
        f,
        n
      ), e.memoizedState = Lr, Ml(null, i)) : (ni(e), qr(e, u));
    }
    var m = t.memoizedState;
    if (m !== null) {
      var T = m.dehydrated;
      if (T !== null)
        return US(
          t,
          e,
          u,
          f,
          i,
          T,
          m,
          n
        );
    }
    return s ? (ii(), s = i.fallback, u = e.mode, m = t.child, T = m.sibling, i = Nn(m, {
      mode: "hidden",
      children: i.children
    }), i.subtreeFlags = m.subtreeFlags & 1206910976, T !== null ? s = Nn(T, s) : (s = Di(
      s,
      u,
      n,
      null
    ), s.flags |= 2), s.return = e, i.return = e, i.sibling = s, e.child = i, Ml(null, i), i = e.child, s = t.child.memoizedState, s === null ? s = Hr(n) : (u = s.cachePool, u !== null ? (m = Ft._currentValue, u = u.parent !== m ? { parent: m, pool: m } : u) : u = Hd(), s = {
      baseLanes: s.baseLanes | n,
      cachePool: u
    }), i.memoizedState = s, i.childLanes = Yr(
      t,
      f,
      n
    ), e.memoizedState = Lr, Ml(t.child, i)) : (ni(e), n = t.child, t = n.sibling, n = Nn(n, {
      mode: "visible",
      children: i.children
    }), n.return = e, n.sibling = null, t !== null && (f = e.deletions, f === null ? (e.deletions = [t], e.flags |= 16) : f.push(t)), e.child = n, e.memoizedState = null, n);
  }
  function qr(t, e) {
    return e = nu(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function nu(t, e) {
    return t = Ae(22, t, null, e), t.lanes = 0, t;
  }
  function iu(t, e, n) {
    return Bi(e, t.child, null, n), t = qr(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function US(t, e, n, i, s, u, f, m) {
    if (n)
      return e.flags & 256 ? (ni(e), e.flags &= -257, iu(
        t,
        e,
        m
      )) : e.memoizedState !== null ? (ii(), e.child = t.child, e.flags |= 128, null) : (ii(), u = s.fallback, f = e.mode, s = nu(
        { mode: "visible", children: s.children },
        f
      ), u = Di(
        u,
        f,
        m,
        null
      ), u.flags |= 2, s.return = e, u.return = e, s.sibling = u, e.child = s, Bi(e, t.child, null, m), s = e.child, s.memoizedState = Hr(m), s.childLanes = Yr(
        t,
        i,
        m
      ), e.memoizedState = Lr, Ml(null, s));
    if (ni(e), Hc(u)) {
      if (i = u.nextSibling && u.nextSibling.dataset, i) var T = i.dgst;
      return i = T, i !== "" && (s = Error(r(419)), s.stack = "", s.digest = i, dl({ value: s, source: null, stack: null })), iu(
        t,
        e,
        m
      );
    }
    if (Pt || Ri(t, e, m, !1), i = (m & t.childLanes) !== 0, Pt || i) {
      if (ei.current !== null)
        return iu(
          t,
          e,
          m
        );
      if (i = Vt, i !== null && (s = Vh(
        i,
        m
      ), s !== 0 && s !== f.retryLane))
        throw f.retryLane = s, Ci(t, s), De(i, t, s), Br;
      return Lc(u) || bu(), iu(
        t,
        e,
        m
      );
    }
    return Lc(u) ? (e.flags |= 192, e.child = t.child, null) : (t = f.treeContext, Lt = Fe(u.nextSibling), ne = e, mt = !0, Fn = null, Ke = !1, t !== null && Vd(e, t), e = qr(
      e,
      s.children
    ), e.flags |= 134221824, e);
  }
  function Wm(t, e, n) {
    t.lanes |= e;
    var i = t.alternate;
    i !== null && (i.lanes |= e), Us(t.return, e, n);
  }
  function $m(t) {
    for (var e = null; t !== null; ) {
      var n = t.alternate;
      n !== null && Qs(n) === null && (e = t), t = t.sibling;
    }
    return e;
  }
  function au(t, e, n, i, s, u) {
    var f = t.memoizedState;
    f === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: i,
      tail: n,
      tailMode: s,
      treeForkCount: u
    } : (f.isBackwards = e, f.rendering = null, f.renderingStartTime = 0, f.last = i, f.tail = n, f.tailMode = s, f.treeForkCount = u);
  }
  function Gr(t) {
    var e = t.child;
    for (t.child = null; e !== null; ) {
      var n = e.sibling;
      e.sibling = t.child, t.child = e, e = n;
    }
  }
  function Xr(t, e, n) {
    var i = e.pendingProps, s = i.revealOrder, u = i.tail;
    i = i.children;
    var f = re.current;
    if (e.flags & 128)
      return bl(e, f), null;
    var m = (f & 2) !== 0;
    if (m ? (f = f & 1 | 2, e.flags |= 128) : f &= 1, bl(e, f), s === "backwards" && t !== null ? (Gr(t), $t(t, e, i, n), Gr(t)) : $t(t, e, i, n), i = mt ? hl : 0, !m && t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Wm(t, n, e);
        else if (t.tag === 19)
          Wm(t, n, e);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (s) {
      case "backwards":
        n = $m(e.child), n === null ? (s = e.child, e.child = null) : (s = n.sibling, n.sibling = null, Gr(e)), au(
          e,
          !0,
          s,
          null,
          u,
          i
        );
        break;
      case "unstable_legacy-backwards":
        for (n = null, s = e.child, e.child = null; s !== null; ) {
          if (t = s.alternate, t !== null && Qs(t) === null) {
            e.child = s;
            break;
          }
          t = s.sibling, s.sibling = n, n = s, s = t;
        }
        au(
          e,
          !0,
          n,
          null,
          u,
          i
        );
        break;
      case "together":
        au(
          e,
          !1,
          null,
          null,
          void 0,
          i
        );
        break;
      case "independent":
        e.memoizedState = null;
        break;
      default:
        n = $m(e.child), n === null ? (s = e.child, e.child = null) : (s = n.sibling, n.sibling = null), au(
          e,
          !1,
          s,
          n,
          u,
          i
        );
    }
    return e.child;
  }
  function ty(t, e, n) {
    var i = e.pendingProps;
    return Pn(e, e.type, i.value), $t(t, e, i.children, n), e.child;
  }
  function jn(t, e, n) {
    if (t !== null && (e.dependencies = t.dependencies), ui |= e.lanes, (n & e.childLanes) === 0)
      if (t !== null) {
        if (Ri(
          t,
          e,
          n,
          !1
        ), (n & e.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && e.child !== t.child)
      throw Error(r(153));
    if (e.child !== null) {
      for (t = e.child, n = Nn(t, t.pendingProps), e.child = n, n.return = e; t.sibling !== null; )
        t = t.sibling, n = n.sibling = Nn(t, t.pendingProps), n.return = e;
      n.sibling = null;
    }
    return e.child;
  }
  function Qr(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Bs(t)));
  }
  function BS(t, e, n) {
    switch (e.tag) {
      case 3:
        rs(e, e.stateNode.containerInfo), Pn(e, Ft, t.memoizedState.cache), zi();
        break;
      case 27:
      case 5:
        go(e);
        break;
      case 4:
        rs(e, e.stateNode.containerInfo);
        break;
      case 10:
        Pn(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 31:
        if (e.memoizedState !== null)
          return e.flags |= 128, yr(e), null;
        break;
      case 13:
        var i = e.memoizedState;
        if (i !== null) {
          if (i.dehydrated !== null)
            return ni(e), e.flags |= 128, null;
          i = Ri(
            t,
            e,
            n,
            !1
          );
          var s = e.child.childLanes;
          return i || (n & s) !== 0 ? Im(t, e, n) : (ni(e), t = jn(
            t,
            e,
            n
          ), t !== null ? t.sibling : null);
        }
        ni(e);
        break;
      case 19:
        if (e.flags & 128)
          return Xr(
            t,
            e,
            n
          );
        if (s = (t.flags & 128) !== 0, i = (n & e.childLanes) !== 0, i || (Ri(
          t,
          e,
          n,
          !1
        ), i = (n & e.childLanes) !== 0), s) {
          if (i)
            return Xr(
              t,
              e,
              n
            );
          e.flags |= 128;
        }
        if (s = e.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), bl(e, re.current), i) break;
        return null;
      case 22:
        return e.lanes = 0, Zm(
          t,
          e,
          n,
          e.pendingProps
        );
      case 24:
        Pn(e, Ft, t.memoizedState.cache);
    }
    return jn(t, e, n);
  }
  function ey(t, e, n) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        Pt = !0;
      else {
        if (!Qr(t, n) && (e.flags & 128) === 0)
          return Pt = !1, BS(
            t,
            e,
            n
          );
        Pt = (t.flags & 131072) !== 0;
      }
    else
      Pt = !1, mt && (e.flags & 1048576) !== 0 && _d(e, hl, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var i = e.pendingProps;
          if (t = wi(e.elementType), e.type = t, typeof t == "function")
            Io(t) ? (i = Li(t, i), e.tag = 1, e = km(
              null,
              e,
              t,
              i,
              n
            )) : (e.tag = 0, e = jr(
              null,
              e,
              t,
              i,
              n
            ));
          else {
            if (t != null) {
              var s = t.$$typeof;
              if (s === Z) {
                e.tag = 11, e = Gm(
                  null,
                  e,
                  t,
                  i,
                  n
                );
                break t;
              } else if (s === P) {
                e.tag = 14, e = Xm(
                  null,
                  e,
                  t,
                  i,
                  n
                );
                break t;
              } else if (s === Ct) {
                e.tag = 10, e.type = t, e = ty(
                  null,
                  e,
                  n
                );
                break t;
              }
            }
            throw e = Et(t) || t, Error(r(306, e, ""));
          }
        }
        return e;
      case 0:
        return jr(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 1:
        return i = e.type, s = Li(
          i,
          e.pendingProps
        ), km(
          t,
          e,
          i,
          s,
          n
        );
      case 3:
        t: {
          if (rs(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(r(387));
          i = e.pendingProps;
          var u = e.memoizedState;
          s = u.element, cr(t, e), Tl(e, i, null, n);
          var f = e.memoizedState;
          if (i = f.cache, Pn(e, Ft, i), i !== u.cache && ar(
            e,
            [Ft],
            n,
            !0
          ), Sl(), i = f.element, u.isDehydrated)
            if (u = {
              element: i,
              isDehydrated: !1,
              cache: f.cache
            }, e.updateQueue.baseState = u, e.memoizedState = u, e.flags & 256) {
              e = Pm(
                t,
                e,
                i,
                n
              );
              break t;
            } else if (i !== s) {
              s = Xe(
                Error(r(424)),
                e
              ), dl(s), e = Pm(
                t,
                e,
                i,
                n
              );
              break t;
            } else
              for (t = e.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, Lt = Fe(t.firstChild), ne = e, mt = !0, Fn = null, Ke = !0, n = Zd(
                e,
                null,
                i,
                n
              ), e.child = n; n; )
                n.flags = n.flags & -3 | 134221824, n = n.sibling;
          else {
            if (zi(), i === s) {
              e = jn(
                t,
                e,
                n
              );
              break t;
            }
            $t(t, e, i, n);
          }
          e = e.child;
        }
        return e;
      case 26:
        return Ta(t, e), t === null ? (n = C0(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = n : mt || (e.stateNode = l0(
          e.type,
          e.pendingProps,
          Gn.current,
          e
        )) : e.memoizedState = C0(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return go(e), t === null && mt && (i = e.stateNode = E0(
          e.type,
          e.pendingProps,
          Gn.current
        ), ne = e, Ke = !0, s = Lt, fi(e.type) ? (Yc = s, Lt = Fe(i.firstChild)) : Lt = s), $t(
          t,
          e,
          e.pendingProps.children,
          n
        ), Ta(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && mt && ((s = i = Lt) && (i = RT(
          i,
          e.type,
          e.pendingProps,
          Ke
        ), i !== null ? (e.stateNode = i, ne = e, Lt = Fe(i.firstChild), Ke = !1, s = !0) : s = !1), s || kn(e)), go(e), s = e.type, u = e.pendingProps, f = t !== null ? t.memoizedProps : null, i = u.children, Nc(s, u) ? i = null : f !== null && Nc(s, f) && (e.flags |= 32), e.memoizedState !== null && (s = vr(
          t,
          e,
          MS,
          null,
          null,
          n
        ), La._currentValue = s), Ta(t, e), $t(t, e, i, n), e.child;
      case 6:
        return t === null && mt && ((t = n = Lt) && (n = NT(
          n,
          e.pendingProps,
          Ke
        ), n !== null ? (e.stateNode = n, ne = e, Lt = null, t = !0) : t = !1), t || kn(e)), null;
      case 13:
        return Im(t, e, n);
      case 4:
        return rs(
          e,
          e.stateNode.containerInfo
        ), i = e.pendingProps, t === null ? e.child = Bi(
          e,
          null,
          i,
          n
        ) : $t(t, e, i, n), e.child;
      case 11:
        return Gm(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 7:
        return i = e.pendingProps, Ta(t, e), $t(t, e, i, n), e.child;
      case 8:
        return $t(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 12:
        return $t(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 10:
        return ty(t, e, n);
      case 9:
        return s = e.type._context, i = e.pendingProps.children, Ni(e), s = ue(s), i = i(s), e.flags |= 1, $t(t, e, i, n), e.child;
      case 14:
        return Xm(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 15:
        return Qm(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 19:
        return Xr(t, e, n);
      case 31:
        return wS(t, e, n);
      case 22:
        return Zm(
          t,
          e,
          n,
          e.pendingProps
        );
      case 24:
        return Ni(e), i = ue(Ft), t === null ? (s = ur(), s === null && (s = Vt, u = lr(), s.pooledCache = u, u.refCount++, u !== null && (s.pooledCacheLanes |= n), s = u), e.memoizedState = { parent: i, cache: s }, rr(e), Pn(e, Ft, s)) : ((t.lanes & n) !== 0 && (cr(t, e), Tl(e, null, null, n), Sl()), s = t.memoizedState, u = e.memoizedState, s.parent !== i ? (s = { parent: i, cache: i }, e.memoizedState = s, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = s), Pn(e, Ft, i)) : (i = u.cache, Pn(e, Ft, i), i !== s.cache && ar(
          e,
          [Ft],
          n,
          !0
        ))), $t(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 30:
        return e.stateNode === null && (e.stateNode = {
          autoName: null,
          paired: null,
          clones: null,
          ref: null
        }), i = e.pendingProps, i.name != null && i.name !== "auto" ? e.flags |= t === null ? 18882560 : 18874368 : mt && Vs(e), t !== null && t.memoizedProps.name !== i.name ? e.flags |= 4194816 : Ta(t, e), $t(t, e, i.children, n), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(r(156, e.tag));
  }
  function Ln(t) {
    t.flags |= 4;
  }
  function Zr(t, e, n, i, s) {
    var u;
    if ((u = (t.mode & 32) !== 0) && (u = n === null ? R0(e, i) : R0(e, i) && (i.src !== n.src || i.srcSet !== n.srcSet)), u) {
      if (t.flags |= 16777216, (s & 335544128) === s)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (By()) t.flags |= 8192;
        else
          throw Ui = Ys, or;
    } else t.flags &= -16777217;
  }
  function ny(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !N0(e))
      if (By()) t.flags |= 8192;
      else
        throw Ui = Ys, or;
  }
  function lu(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? Rh() : 536870912, t.lanes |= e, Ma |= e);
  }
  function Cl(t, e) {
    if (!mt)
      switch (t.tailMode) {
        case "visible":
          break;
        case "collapsed":
          for (var n = t.tail, i = null; n !== null; )
            n.alternate !== null && (i = n), n = n.sibling;
          i === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : i.sibling = null;
          break;
        default:
          for (e = t.tail, n = null; e !== null; )
            e.alternate !== null && (n = e), e = e.sibling;
          n === null ? t.tail = null : n.sibling = null;
      }
  }
  function Ht(t) {
    var e = t.alternate !== null && t.alternate.child === t.child, n = 0, i = 0;
    if (e)
      for (var s = t.child; s !== null; )
        n |= s.lanes | s.childLanes, i |= s.subtreeFlags & 1206910976, i |= s.flags & 1206910976, s.return = t, s = s.sibling;
    else
      for (s = t.child; s !== null; )
        n |= s.lanes | s.childLanes, i |= s.subtreeFlags, i |= s.flags, s.return = t, s = s.sibling;
    return t.subtreeFlags |= i, t.childLanes = n, e;
  }
  function jS(t, e, n) {
    var i = e.pendingProps;
    switch (tr(e), e.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ht(e), null;
      case 1:
        return Ht(e), null;
      case 3:
        return n = e.stateNode, i = null, t !== null && (i = t.memoizedState.cache), e.memoizedState.cache !== i && (e.flags |= 2048), wn(Ft), Ii(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (t === null || t.child === null) && (da(e) ? Ln(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, nr())), Ht(e), null;
      case 26:
        var s = e.type, u = e.memoizedState;
        return t === null ? (Ln(e), u !== null ? (Ht(e), ny(e, u)) : (Ht(e), Zr(
          e,
          s,
          null,
          i,
          n
        ))) : u ? u !== t.memoizedState ? (Ln(e), Ht(e), ny(e, u)) : (Ht(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== i && Ln(e), Ht(e), Zr(
          e,
          s,
          t,
          i,
          n
        )), null;
      case 27:
        if (cs(e), n = Gn.current, s = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== i && Ln(e);
        else {
          if (!i) {
            if (e.stateNode === null)
              throw Error(r(166));
            return Ht(e), e.subtreeFlags &= -33554433, null;
          }
          t = rn.current, da(e) ? wd(e) : (t = E0(s, i, n), e.stateNode = t, Ln(e));
        }
        return Ht(e), e.subtreeFlags &= -33554433, null;
      case 5:
        if (cs(e), s = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== i && Ln(e);
        else {
          if (!i) {
            if (e.stateNode === null)
              throw Error(r(166));
            return Ht(e), e.subtreeFlags &= -33554433, null;
          }
          if (u = rn.current, da(e))
            wd(e);
          else {
            var f = jl(
              Gn.current
            );
            switch (u) {
              case 1:
                u = f.createElementNS(
                  "http://www.w3.org/2000/svg",
                  s
                );
                break;
              case 2:
                u = f.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  s
                );
                break;
              default:
                switch (s) {
                  case "svg":
                    u = f.createElementNS(
                      "http://www.w3.org/2000/svg",
                      s
                    );
                    break;
                  case "math":
                    u = f.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      s
                    );
                    break;
                  case "script":
                    u = f.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof i.is == "string" ? f.createElement("select", {
                      is: i.is
                    }) : f.createElement("select"), i.multiple ? u.multiple = !0 : i.size && (u.size = i.size);
                    break;
                  default:
                    u = typeof i.is == "string" ? f.createElement(s, { is: i.is }) : f.createElement(s);
                }
            }
            u[se] = e, u[Ee] = i;
            t: for (f = e.child; f !== null; ) {
              if (f.tag === 5 || f.tag === 6)
                u.appendChild(f.stateNode);
              else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                f.child.return = f, f = f.child;
                continue;
              }
              if (f === e) break t;
              for (; f.sibling === null; ) {
                if (f.return === null || f.return === e)
                  break t;
                f = f.return;
              }
              f.sibling.return = f.return, f = f.sibling;
            }
            e.stateNode = u;
            t: switch (fe(u, s, i), s) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                i = !!i.autoFocus;
                break t;
              case "img":
                i = !0;
                break t;
              default:
                i = !1;
            }
            i && Ln(e);
          }
        }
        return Ht(e), e.subtreeFlags &= -33554433, Zr(
          e,
          e.type,
          t === null ? null : t.memoizedProps,
          e.pendingProps,
          n
        ), null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== i && Ln(e);
        else {
          if (typeof i != "string" && e.stateNode === null)
            throw Error(r(166));
          if (t = Gn.current, da(e)) {
            if (t = e.stateNode, n = e.memoizedProps, i = null, s = ne, s !== null)
              switch (s.tag) {
                case 27:
                case 5:
                  i = s.memoizedProps;
              }
            t[se] = e, t = !!(t.nodeValue === n || i !== null && i.suppressHydrationWarning === !0 || e0(t.nodeValue, n)), t || kn(e, !0);
          } else
            t = jl(t).createTextNode(
              i
            ), t[se] = e, e.stateNode = t;
        }
        return Ht(e), null;
      case 31:
        if (n = e.memoizedState, t === null || t.memoizedState !== null) {
          if (i = da(e), n !== null) {
            if (t === null) {
              if (!i) throw Error(r(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(557));
              t[se] = e;
            } else
              zi(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Ht(e), t = !1;
          } else
            n = nr(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), t = !0;
          if (!t)
            return e.flags & 256 ? (we(e), e) : (we(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(r(558));
        }
        return Ht(e), null;
      case 13:
        if (i = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (s = da(e), i !== null && i.dehydrated !== null) {
            if (t === null) {
              if (!s) throw Error(r(318));
              if (s = e.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(r(317));
              s[se] = e;
            } else
              zi(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Ht(e), s = !1;
          } else
            s = nr(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = s), s = !0;
          if (!s)
            return e.flags & 256 ? (we(e), e) : (we(e), null);
        }
        return we(e), (e.flags & 128) !== 0 ? (e.lanes = n, e) : (n = i !== null, t = t !== null && t.memoizedState !== null, n && (i = e.child, s = null, i.alternate !== null && i.alternate.memoizedState !== null && i.alternate.memoizedState.cachePool !== null && (s = i.alternate.memoizedState.cachePool.pool), u = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (u = i.memoizedState.cachePool.pool), u !== s && (i.flags |= 2048)), n !== t && n && (e.child.flags |= 8192), lu(e, e.updateQueue), Ht(e), null);
      case 4:
        return Ii(), t === null && Cc(e.stateNode.containerInfo), e.flags |= 67108864, Ht(e), null;
      case 10:
        return wn(e.type), Ht(e), null;
      case 19:
        if (pr(e), i = e.memoizedState, i === null) return Ht(e), null;
        if (s = (e.flags & 128) !== 0, u = i.rendering, u === null)
          if (s) Cl(i, !1);
          else {
            if (Zt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (u = Qs(t), u !== null) {
                  for (e.flags |= 128, Cl(i, !1), t = u.updateQueue, e.updateQueue = t, lu(e, t), e.subtreeFlags = 0, t = n, n = e.child; n !== null; )
                    Od(n, t), n = n.sibling;
                  return bl(
                    e,
                    re.current & 1 | 2
                  ), mt && _n(e, i.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            i.tail !== null && Oe() > gu && (e.flags |= 128, s = !0, Cl(i, !1), e.lanes = 4194304);
          }
        else {
          if (!s)
            if (t = Qs(u), t !== null) {
              if (e.flags |= 128, s = !0, t = t.updateQueue, e.updateQueue = t, lu(e, t), Cl(i, !0), i.tail === null && i.tailMode !== "collapsed" && i.tailMode !== "visible" && !u.alternate && !mt)
                return Ht(e), null;
            } else
              2 * Oe() - i.renderingStartTime > gu && n !== 536870912 && (e.flags |= 128, s = !0, Cl(i, !1), e.lanes = 4194304);
          i.isBackwards ? (u.sibling = e.child, e.child = u) : (t = i.last, t !== null ? t.sibling = u : e.child = u, i.last = u);
        }
        if (i.tail !== null) {
          t = i.tail;
          t: {
            for (n = t; n !== null; ) {
              if (n.alternate !== null) {
                n = !1;
                break t;
              }
              n = n.sibling;
            }
            n = !0;
          }
          return i.rendering = t, i.tail = t.sibling, i.renderingStartTime = Oe(), t.sibling = null, u = re.current, u = s ? u & 1 | 2 : u & 1, i.tailMode === "visible" || i.tailMode === "collapsed" || !n || mt ? bl(e, u) : (n = u, jt(oe, e), jt(re, n), ye === null && (ye = e)), mt && _n(e, i.treeForkCount), t;
        }
        return Ht(e), null;
      case 22:
      case 23:
        return we(e), mr(), i = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== i && (e.flags |= 8192) : i && (e.flags |= 8192), i ? (n & 536870912) !== 0 && (e.flags & 128) === 0 && (Ht(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Ht(e), n = e.updateQueue, n !== null && lu(e, n.retryQueue), n = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), i = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), i !== n && (e.flags |= 2048), t !== null && le(Vi), null;
      case 24:
        return n = null, t !== null && (n = t.memoizedState.cache), e.memoizedState.cache !== n && (e.flags |= 2048), wn(Ft), Ht(e), null;
      case 25:
        return null;
      case 30:
        return e.flags |= 33554432, Ht(e), null;
    }
    throw Error(r(156, e.tag));
  }
  function LS(t, e) {
    switch (tr(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return wn(Ft), Ii(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return cs(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (we(e), e.alternate === null)
            throw Error(r(340));
          zi();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (we(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(r(340));
          zi();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return pr(e), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, t = e.memoizedState, t !== null && (t.rendering = null, t.tail = null), e.flags |= 4, e) : null;
      case 4:
        return Ii(), null;
      case 10:
        return wn(e.type), null;
      case 22:
      case 23:
        return we(e), mr(), t !== null && le(Vi), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return wn(Ft), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function iy(t, e) {
    switch (tr(e), e.tag) {
      case 3:
        wn(Ft), Ii();
        break;
      case 26:
      case 27:
      case 5:
        cs(e);
        break;
      case 4:
        Ii();
        break;
      case 31:
        e.memoizedState !== null && we(e);
        break;
      case 13:
        we(e);
        break;
      case 19:
        pr(e);
        break;
      case 10:
        wn(e.type);
        break;
      case 22:
      case 23:
        we(e), mr(), t !== null && le(Vi);
        break;
      case 24:
        wn(Ft);
    }
  }
  function Dl(t, e) {
    try {
      var n = e.updateQueue, i = n !== null ? n.lastEffect : null;
      if (i !== null) {
        var s = i.next;
        n = s;
        do {
          if ((n.tag & t) === t) {
            i = void 0;
            var u = n.create, f = n.inst;
            i = u(), f.destroy = i;
          }
          n = n.next;
        } while (n !== s);
      }
    } catch (m) {
      Rt(e, e.return, m);
    }
  }
  function ai(t, e, n) {
    try {
      var i = e.updateQueue, s = i !== null ? i.lastEffect : null;
      if (s !== null) {
        var u = s.next;
        i = u;
        do {
          if ((i.tag & t) === t) {
            var f = i.inst, m = f.destroy;
            if (m !== void 0) {
              f.destroy = void 0, s = e;
              var T = n, C = m;
              try {
                C();
              } catch (R) {
                Rt(
                  s,
                  T,
                  R
                );
              }
            }
          }
          i = i.next;
        } while (i !== u);
      }
    } catch (R) {
      Rt(e, e.return, R);
    }
  }
  function ay(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var n = t.stateNode;
      try {
        Jd(e, n);
      } catch (i) {
        Rt(t, t.return, i);
      }
    }
  }
  function ly(t, e, n) {
    n.props = Li(
      t.type,
      t.memoizedProps
    ), n.state = t.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (i) {
      Rt(t, e, i);
    }
  }
  function dn(t, e) {
    try {
      var n = t.ref;
      if (n !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var i = t.stateNode;
            break;
          case 30:
            var s = t.stateNode, u = On(t.memoizedProps, s);
            (s.ref === null || s.ref.name !== u) && (s.ref = h0(u)), i = s.ref;
            break;
          case 7:
            if (t.stateNode === null) {
              var f = new He(t);
              p(
                t.child,
                !1,
                zT,
                f,
                void 0,
                void 0
              ), t.stateNode = f;
            }
            i = t.stateNode;
            break;
          default:
            i = t.stateNode;
        }
        typeof n == "function" ? t.refCleanup = n(i) : n.current = i;
      }
    } catch (m) {
      Rt(t, e, m);
    }
  }
  function ce(t, e) {
    var n = t.ref, i = t.refCleanup;
    if (n !== null)
      if (typeof i == "function")
        try {
          i();
        } catch (s) {
          Rt(t, e, s);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (s) {
          Rt(t, e, s);
        }
      else n.current = null;
  }
  function su(t, e) {
    if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && t.alternate === null && e !== null)
      for (var n = 0; n < e.length; n++)
        v0(
          t.stateNode,
          e[n]
        );
  }
  function sy(t) {
    for (var e = t.return; e !== null && (Jr(e) && v0(t.stateNode, e.stateNode), !Kr(e)); )
      e = e.return;
  }
  function zl(t) {
    for (var e = t.return; e !== null && (Jr(e) && OT(t.stateNode, e.stateNode), !Kr(e)); )
      e = e.return;
  }
  function Kr(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 27;
  }
  function Jr(t) {
    return t && t.tag === 7 && t.stateNode !== null;
  }
  function Fr(t) {
    var e = t.type, n = t.memoizedProps, i = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && i.focus();
          break t;
        case "img":
          n.src ? i.src = n.src : n.srcSet && (i.srcset = n.srcSet);
      }
    } catch (s) {
      Rt(t, t.return, s);
    }
  }
  function kr(t, e, n) {
    try {
      var i = t.stateNode;
      cT(i, t.type, n, e), i[Ee] = e;
    } catch (s) {
      Rt(t, t.return, s);
    }
  }
  function uy(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && fi(t.type) || t.tag === 4;
  }
  function Pr(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || uy(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && fi(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Ir(t, e, n, i) {
    var s = t.tag;
    if (s === 5 || s === 6)
      s = t.stateNode, e ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(s, e) : (e = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, e.appendChild(s), n = n._reactRootContainer, n != null || e.onclick !== null || (e.onclick = cn)), su(t, i), At = !0;
    else if (s !== 4 && (s === 27 && (su(t, i), i = null, fi(t.type) && (n = t.stateNode, e = null)), t = t.child, t !== null))
      for (Ir(
        t,
        e,
        n,
        i
      ), t = t.sibling; t !== null; )
        Ir(
          t,
          e,
          n,
          i
        ), t = t.sibling;
  }
  function uu(t, e, n, i) {
    var s = t.tag;
    if (s === 5 || s === 6)
      s = t.stateNode, e ? n.insertBefore(s, e) : n.appendChild(s), su(t, i), At = !0;
    else if (s !== 4 && (s === 27 && (su(t, i), i = null, fi(t.type) && (n = t.stateNode)), t = t.child, t !== null))
      for (uu(
        t,
        e,
        n,
        i
      ), t = t.sibling; t !== null; )
        uu(
          t,
          e,
          n,
          i
        ), t = t.sibling;
  }
  function oy(t) {
    var e = t.stateNode, n = t.memoizedProps;
    try {
      for (var i = t.type, s = e.attributes; s.length; )
        e.removeAttributeNode(s[0]);
      fe(e, i, n), e[se] = t, e[Ee] = n;
    } catch (u) {
      Rt(t, t.return, u);
    }
  }
  var ou = !1, Ue = null;
  function ry(t) {
    (t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (ou = !0);
  }
  var mn = null;
  function cy() {
    var t = mn;
    return mn = null, t;
  }
  var xe = 0;
  function ba(t, e, n, i, s) {
    return xe = 0, fy(
      t.child,
      e,
      n,
      i,
      s
    );
  }
  function fy(t, e, n, i, s) {
    for (var u = !1; t !== null; ) {
      if (t.tag === 5) {
        var f = t.stateNode;
        if (i !== null) {
          var m = wc(f);
          i.push(m), m.view && (u = !0);
        } else
          u || wc(f).view && (u = !0);
        ou = !0, c0(
          f,
          xe === 0 ? e : e + "_" + xe,
          n
        ), xe++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && s || fy(
        t.child,
        e,
        n,
        i,
        s
      ) && (u = !0));
      t = t.sibling;
    }
    return u;
  }
  function yn(t, e) {
    for (; t !== null; )
      t.tag === 5 ? f0(t.stateNode, t.memoizedProps) : (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && e || yn(
        t.child,
        e
      )), t = t.sibling;
  }
  function ru(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if ((t.tag !== 22 || t.memoizedState === null) && (ru(t), t.tag === 30 && (t.flags & 18874368) !== 0 && t.stateNode.paired)) {
          var e = t.memoizedProps;
          if (e.name == null || e.name === "auto")
            throw Error(r(544));
          var n = e.name;
          e = Rn(e.default, e.share), e !== "none" && (ba(
            t,
            n,
            e,
            null,
            !1
          ) || yn(t.child, !1));
        }
        t = t.sibling;
      }
  }
  function Wr(t, e) {
    if (t.tag === 30) {
      var n = t.stateNode, i = t.memoizedProps, s = On(i, n), u = Rn(
        i.default,
        n.paired ? i.share : i.enter
      );
      u !== "none" ? ba(t, s, u, null, !1) ? (ru(t), n.paired || e || Oa(t, i.onEnter)) : yn(t.child, !1) : ru(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Wr(t, e), t = t.sibling;
    else ru(t);
  }
  function $r(t) {
    if (Ue !== null && Ue.size !== 0) {
      var e = Ue;
      if ((t.subtreeFlags & 18874368) !== 0)
        for (t = t.child; t !== null; ) {
          if (t.tag !== 22 || t.memoizedState === null) {
            if (t.tag === 30 && (t.flags & 18874368) !== 0) {
              var n = t.memoizedProps, i = n.name;
              if (i != null && i !== "auto") {
                var s = e.get(i);
                if (s !== void 0) {
                  var u = Rn(
                    n.default,
                    n.share
                  );
                  if (u !== "none" && (ba(
                    t,
                    i,
                    u,
                    null,
                    !1
                  ) ? (u = t.stateNode, s.paired = u, u.paired = s, Oa(t, n.onShare)) : yn(t.child, !1)), e.delete(i), e.size === 0) break;
                }
              }
            }
            $r(t);
          }
          t = t.sibling;
        }
    }
  }
  function tc(t) {
    if (t.tag === 30) {
      var e = t.memoizedProps, n = On(e, t.stateNode), i = Ue !== null ? Ue.get(n) : void 0, s = Rn(
        e.default,
        i !== void 0 ? e.share : e.exit
      );
      s !== "none" && (ba(t, n, s, null, !1) ? i !== void 0 ? (s = t.stateNode, i.paired = s, s.paired = i, Ue.delete(n), Oa(t, e.onShare)) : Oa(t, e.onExit) : yn(t.child, !1)), Ue !== null && $r(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        tc(t), t = t.sibling;
    else
      Ue !== null && $r(t);
  }
  function hy(t) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var e = t.memoizedProps, n = On(e, t.stateNode);
        e = Rn(e.default, e.update), t.flags &= -5, e !== "none" && ba(
          t,
          n,
          e,
          t.memoizedState = [],
          !1
        );
      } else
        (t.subtreeFlags & 33554432) !== 0 && hy(t);
      t = t.sibling;
    }
  }
  function ec(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if (t.tag !== 22 || t.memoizedState === null) {
          if (t.tag === 30 && (t.flags & 18874368) !== 0) {
            var e = t.stateNode;
            e.paired !== null && (e.paired = null, yn(t.child, !1));
          }
          ec(t);
        }
        t = t.sibling;
      }
  }
  function cu(t) {
    if (t.tag === 30)
      t.stateNode.paired = null, yn(t.child, !1), ec(t);
    else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        cu(t), t = t.sibling;
    else ec(t);
  }
  function dy(t) {
    for (t = t.child; t !== null; )
      t.tag === 30 ? yn(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && dy(t), t = t.sibling;
  }
  function nc(t, e, n, i, s, u, f) {
    for (var m = !1; e !== null; ) {
      if (e.tag === 5) {
        var T = e.stateNode;
        if (u !== null && xe < u.length) {
          var C = u[xe], R = wc(T);
          (C.view || R.view) && (m = !0);
          var B;
          if (B = (t.flags & 4) === 0)
            if (R.clip) B = !0;
            else {
              B = C.rect;
              var x = R.rect;
              B = B.y !== x.y || B.x !== x.x || B.height !== x.height || B.width !== x.width;
            }
          B && (t.flags |= 4), R.abs ? R = !C.abs : (C = C.rect, R = R.rect, R = C.height !== R.height || C.width !== R.width), R && (t.flags |= 32);
        } else t.flags |= 32;
        (t.flags & 4) !== 0 && c0(
          T,
          xe === 0 ? n : n + "_" + xe,
          s
        ), m && (t.flags & 4) !== 0 || (mn === null && (mn = []), mn.push(
          T,
          xe === 0 ? i : i + "_" + xe,
          e.memoizedProps
        )), xe++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && f ? t.flags |= e.flags & 32 : nc(
        t,
        e.child,
        n,
        i,
        s,
        u,
        f
      ) && (m = !0));
      e = e.sibling;
    }
    return m;
  }
  function my(t, e) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var n = t.memoizedProps, i = t.stateNode, s = On(n, i), u = Rn(n.default, n.update), f;
        f = t.memoizedState, t.memoizedState = null, i = t;
        var m = t.child;
        xe = 0, s = nc(
          i,
          m,
          s,
          s,
          u,
          f,
          !1
        ), (t.flags & 4) !== 0 && s && Oa(t, n.onUpdate);
      } else
        (t.subtreeFlags & 33554432) !== 0 && my(t);
      t = t.sibling;
    }
  }
  var ie = !1, zt = !1, pn = !1, ic = !1, yy = typeof WeakSet == "function" ? WeakSet : Set, ae = null, gn = !1, Ol = !1, fu = !1, ac = !1;
  function HS(t, e, n) {
    if (t = t.containerInfo, Oc = Ha, t = Sd(t), Qo(t)) {
      if ("selectionStart" in t)
        var i = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          i = (i = t.ownerDocument) && i.defaultView || window;
          var s = i.getSelection && i.getSelection();
          if (s && s.rangeCount !== 0) {
            i = s.anchorNode;
            var u = s.anchorOffset, f = s.focusNode;
            s = s.focusOffset;
            try {
              i.nodeType, f.nodeType;
            } catch {
              i = null;
              break t;
            }
            var m = 0, T = -1, C = -1, R = 0, B = 0, x = t, O = null;
            e: for (; ; ) {
              for (var K; x !== i || u !== 0 && x.nodeType !== 3 || (T = m + u), x !== f || s !== 0 && x.nodeType !== 3 || (C = m + s), x.nodeType === 3 && (m += x.nodeValue.length), (K = x.firstChild) !== null; )
                O = x, x = K;
              for (; ; ) {
                if (x === t) break e;
                if (O === i && ++R === u && (T = m), O === f && ++B === s && (C = m), (K = x.nextSibling) !== null) break;
                x = O, O = x.parentNode;
              }
              x = K;
            }
            i = T === -1 || C === -1 ? null : { start: T, end: C };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (Rc = { focusedElem: t, selectionRange: i }, Ha = !1, n = (n & 335544064) === n, ae = e, e = n ? 9270 : 1024; ae !== null; ) {
      if (t = ae, n && (i = t.deletions, i !== null))
        for (u = 0; u < i.length; u++)
          n && tc(i[u]);
      if (t.alternate === null && (t.flags & 2) !== 0)
        n && ry(t), hu(n);
      else {
        if (t.tag === 22) {
          if (i = t.alternate, t.memoizedState !== null) {
            i !== null && i.memoizedState === null && n && tc(i), hu(n);
            continue;
          } else if (i !== null && i.memoizedState !== null) {
            n && ry(t), hu(n);
            continue;
          }
        }
        i = t.child, (t.subtreeFlags & e) !== 0 && i !== null ? (i.return = t, ae = i) : (n && hy(t), hu(n));
      }
    }
    Ue = null;
  }
  function hu(t) {
    for (; ae !== null; ) {
      var e = ae, n = t, i = e.alternate, s = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ((s & 1024) !== 0 && i !== null) {
            n = void 0, s = i.memoizedProps, i = i.memoizedState;
            var u = e.stateNode;
            try {
              var f = Li(
                e.type,
                s
              );
              n = u.getSnapshotBeforeUpdate(
                f,
                i
              ), u.__reactInternalSnapshotBeforeUpdate = n;
            } catch (m) {
              Rt(e, e.return, m);
            }
          }
          break;
        case 3:
          if ((s & 1024) !== 0) {
            if (i = e.stateNode.containerInfo, n = i.nodeType, n === 9)
              jc(i);
            else if (n === 1)
              switch (i.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  jc(i);
                  break;
                default:
                  i.textContent = "";
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
          n && i !== null && (n = On(
            i.memoizedProps,
            i.stateNode
          ), s = e.memoizedProps, s = Rn(s.default, s.update), s !== "none" && ba(
            i,
            n,
            s,
            i.memoizedState = [],
            !0
          ));
          break;
        default:
          if ((s & 1024) !== 0) throw Error(r(163));
      }
      if (i = e.sibling, i !== null) {
        i.return = e.return, ae = i;
        break;
      }
      ae = e.return;
    }
  }
  function py(t, e, n) {
    var i = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        vn(t, n), i & 4 && Dl(5, n);
        break;
      case 1:
        if (vn(t, n), i & 4)
          if (t = n.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (f) {
              Rt(n, n.return, f);
            }
          else {
            var s = Li(
              n.type,
              e.memoizedProps
            );
            e = e.memoizedState;
            try {
              t.componentDidUpdate(
                s,
                e,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (f) {
              Rt(
                n,
                n.return,
                f
              );
            }
          }
        i & 64 && ay(n), i & 512 && dn(n, n.return);
        break;
      case 3:
        if (vn(t, n), i & 64 && (t = n.updateQueue, t !== null)) {
          if (e = null, n.child !== null)
            switch (n.child.tag) {
              case 27:
              case 5:
                e = n.child.stateNode;
                break;
              case 1:
                e = n.child.stateNode;
            }
          try {
            Jd(t, e);
          } catch (f) {
            Rt(n, n.return, f);
          }
        }
        break;
      case 27:
        e === null && i & 4 && oy(n);
      case 26:
      case 5:
        vn(t, n), e === null && i & 4 && Fr(n), i & 512 && dn(n, n.return);
        break;
      case 12:
        vn(t, n);
        break;
      case 31:
        vn(t, n), i & 4 && Ty(t, n);
        break;
      case 13:
        vn(t, n), i & 4 && by(t, n), i & 64 && (t = n.memoizedState, t !== null && (t = t.dehydrated, t !== null && (n = IS.bind(
          null,
          n
        ), _T(t, n))));
        break;
      case 22:
        if (i = n.memoizedState !== null || ie, !i) {
          var u = e !== null && e.memoizedState !== null || zt;
          e = ie, s = zt, ie = i, (zt = u) && !s ? (i = 2, (n.subtreeFlags & 8772) !== 0 && (i |= 1), en(
            t,
            n,
            i
          )) : vn(t, n), ie = e, zt = s;
        }
        break;
      case 30:
        vn(t, n), i & 512 && dn(n, n.return);
        break;
      case 7:
        i & 512 && dn(n, n.return);
      default:
        vn(t, n);
    }
  }
  function lc(t, e) {
    for (t = t.child; t !== null; )
      gy(t, e), t = t.sibling;
  }
  function gy(t, e) {
    switch (t.tag) {
      case 5:
      case 26:
        try {
          var n = t.stateNode;
          if (e) {
            var i = n.style;
            typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
          } else {
            var s = t.stateNode, u = t.memoizedProps.style, f = u != null && u.hasOwnProperty("display") ? u.display : null;
            s.style.display = f == null || typeof f == "boolean" ? "" : ("" + f).trim();
          }
        } catch (T) {
          Rt(t, t.return, T);
        }
        sc(t, e);
        break;
      case 6:
        try {
          t.stateNode.nodeValue = e ? "" : t.memoizedProps, At = !0;
        } catch (T) {
          Rt(t, t.return, T);
        }
        break;
      case 18:
        try {
          var m = t.stateNode;
          e ? r0(m, !0) : r0(t.stateNode, !1);
        } catch (T) {
          Rt(t, t.return, T);
        }
        break;
      case 22:
      case 23:
        t.memoizedState === null && lc(t, e);
        break;
      default:
        lc(t, e);
    }
  }
  function sc(t, e) {
    if (t.subtreeFlags & 67108864)
      for (t = t.child; t !== null; ) {
        t: {
          var n = t, i = e;
          switch (n.tag) {
            case 4:
              gy(n, i);
              break t;
            case 22:
              n.memoizedState === null && sc(n, i);
              break t;
            default:
              sc(n, i);
          }
        }
        t = t.sibling;
      }
  }
  function vy(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, vy(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && gs(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Gt = null, Me = !1;
  function $e(t, e, n) {
    for (n = n.child; n !== null; )
      Sy(t, e, n), n = n.sibling;
  }
  function Sy(t, e, n) {
    if (Re && typeof Re.onCommitFiberUnmount == "function")
      try {
        Re.onCommitFiberUnmount(Wa, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        zt || ce(n, e), $e(
          t,
          e,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !zt && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        zt || ce(n, e), zl(n);
        var i = Gt, s = Me;
        fi(n.type) && (Gt = n.stateNode, Me = !1), $e(
          t,
          e,
          n
        ), A0(
          n.stateNode,
          n.type,
          n.memoizedProps
        ), Gt = i, Me = s;
        break;
      case 5:
        zt || ce(n, e), zl(n);
      case 6:
        if (n.tag === 6 && zl(n), i = Gt, s = Me, Gt = null, $e(
          t,
          e,
          n
        ), Gt = i, Me = s, Gt !== null)
          if (Me)
            try {
              (Gt.nodeType === 9 ? Gt.body : Gt.nodeName === "HTML" ? Gt.ownerDocument.body : Gt).removeChild(n.stateNode), At = !0;
            } catch (u) {
              Rt(
                n,
                e,
                u
              );
            }
          else
            try {
              Gt.removeChild(n.stateNode), At = !0;
            } catch (u) {
              Rt(
                n,
                e,
                u
              );
            }
        break;
      case 18:
        Gt !== null && (Me ? (t = Gt, o0(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          n.stateNode
        ), Ya(t)) : o0(Gt, n.stateNode));
        break;
      case 4:
        i = Gt, s = Me, Gt = n.stateNode.containerInfo, Me = !0, $e(
          t,
          e,
          n
        ), Gt = i, Me = s;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ai(2, n, e), zt || ai(4, n, e), $e(
          t,
          e,
          n
        );
        break;
      case 1:
        zt || (ce(n, e), i = n.stateNode, typeof i.componentWillUnmount == "function" && ly(
          n,
          e,
          i
        )), $e(
          t,
          e,
          n
        );
        break;
      case 21:
        $e(
          t,
          e,
          n
        );
        break;
      case 22:
        zt = (i = zt) || n.memoizedState !== null, $e(
          t,
          e,
          n
        ), zt = i;
        break;
      case 30:
        ce(n, e), $e(
          t,
          e,
          n
        );
        break;
      case 7:
        zt || ce(n, e), $e(
          t,
          e,
          n
        );
        break;
      default:
        $e(
          t,
          e,
          n
        );
    }
  }
  function Ty(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Ya(t);
      } catch (n) {
        Rt(e, e.return, n);
      }
    }
  }
  function by(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Ya(t);
      } catch (n) {
        Rt(e, e.return, n);
      }
  }
  function YS(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new yy()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new yy()), e;
      default:
        throw Error(r(435, t.tag));
    }
  }
  function du(t, e) {
    var n = YS(t);
    e.forEach(function(i) {
      if (!n.has(i)) {
        n.add(i);
        var s = WS.bind(null, t, i);
        i.then(s, s);
      }
    });
  }
  function ve(t, e, n) {
    var i = e.deletions;
    if (i !== null)
      for (var s = 0; s < i.length; s++) {
        var u = i[s], f = t, m = e, T = m;
        t: for (; T !== null; ) {
          switch (T.tag) {
            case 27:
              if (fi(T.type)) {
                Gt = T.stateNode, Me = !1;
                break t;
              }
              break;
            case 5:
              Gt = T.stateNode, Me = !1;
              break t;
            case 3:
            case 4:
              Gt = T.stateNode.containerInfo, Me = !0;
              break t;
          }
          T = T.return;
        }
        if (Gt === null) throw Error(r(160));
        Sy(f, m, u), Gt = null, Me = !1, f = u.alternate, f !== null && (f.return = null), u.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        Ey(e, t, n), e = e.sibling;
  }
  var tn = null;
  function Ey(t, e, n) {
    var i = t.alternate, s = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (s & 4 && (i = t.updateQueue, i = i !== null ? i.events : null, i !== null))
          for (var u = 0; u < i.length; u++) {
            var f = i[u];
            f.ref.impl = f.nextImpl;
          }
        ve(e, t, n), Se(t), s & 4 && (ai(3, t, t.return), Dl(3, t), ai(5, t, t.return));
        break;
      case 1:
        ve(e, t, n), Se(t), s & 512 && (zt || i === null || ce(i, i.return)), s & 64 && ie && (t = t.updateQueue, t !== null && (e = t.callbacks, e !== null && (n = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = n === null ? e : n.concat(e))));
        break;
      case 26:
        if (u = tn, ve(e, t, n), Se(t), s & 512 && (zt || i === null || ce(i, i.return)), s & 4)
          if (s = i !== null ? i.memoizedState : null, n = t.memoizedState, i === null)
            if (n === null)
              if (t.stateNode === null)
                if (ie)
                  t.stateNode = l0(
                    t.type,
                    t.memoizedProps,
                    e.containerInfo,
                    t
                  );
                else {
                  t: {
                    e = t.type, n = t.memoizedProps, s = u.ownerDocument || u;
                    e: switch (e) {
                      case "title":
                        i = s.getElementsByTagName("title")[0], (!i || i[el] || i[se] || i.namespaceURI === "http://www.w3.org/2000/svg" || i.hasAttribute("itemprop")) && (i = s.createElement(e), s.head.insertBefore(
                          i,
                          s.querySelector("head > title")
                        )), fe(i, e, n), i[se] = t, ee(i), e = i;
                        break t;
                      case "link":
                        if (u = O0(
                          "link",
                          "href",
                          s
                        ).get(e + (n.href || ""))) {
                          for (f = 0; f < u.length; f++)
                            if (i = u[f], i.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && i.getAttribute("rel") === (n.rel == null ? null : n.rel) && i.getAttribute("title") === (n.title == null ? null : n.title) && i.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                              u.splice(f, 1);
                              break e;
                            }
                        }
                        i = s.createElement(e), fe(i, e, n), s.head.appendChild(i);
                        break;
                      case "meta":
                        if (u = O0(
                          "meta",
                          "content",
                          s
                        ).get(e + (n.content || ""))) {
                          for (f = 0; f < u.length; f++)
                            if (i = u[f], i.getAttribute("content") === (n.content == null ? null : "" + n.content) && i.getAttribute("name") === (n.name == null ? null : n.name) && i.getAttribute("property") === (n.property == null ? null : n.property) && i.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && i.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                              u.splice(f, 1);
                              break e;
                            }
                        }
                        i = s.createElement(e), fe(i, e, n), s.head.appendChild(i);
                        break;
                      default:
                        throw Error(r(468, e));
                    }
                    i[se] = t, ee(i), e = i;
                  }
                  t.stateNode = e;
                }
              else
                ie || Qc(u, t.type, t.stateNode);
            else
              t.stateNode = z0(
                u,
                n,
                t.memoizedProps
              );
          else
            s !== n ? (s === null ? (e = i.stateNode, e === null || zt || e.parentNode.removeChild(e)) : s.count--, n === null ? ie || Qc(u, t.type, t.stateNode) : z0(u, n, t.memoizedProps)) : n === null && t.stateNode !== null && kr(
              t,
              t.memoizedProps,
              i.memoizedProps
            );
        break;
      case 27:
        ve(e, t, n), Se(t), s & 512 && (zt || i === null || ce(i, i.return)), i !== null && s & 4 && kr(
          t,
          t.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (u = pn, pn = !1, ve(e, t, n), pn = u, Se(t), s & 512 && (zt || i === null || ce(i, i.return)), t.flags & 32) {
          e = t.stateNode;
          try {
            ia(e, ""), At = !0;
          } catch (R) {
            Rt(t, t.return, R);
          }
        }
        s & 4 && t.stateNode != null && (e = t.memoizedProps, kr(
          t,
          e,
          i !== null ? i.memoizedProps : e
        )), s & 1024 && (ic = !0);
        break;
      case 6:
        if (ve(e, t, n), Se(t), s & 4) {
          if (t.stateNode === null)
            throw Error(r(162));
          e = t.memoizedProps, n = t.stateNode;
          try {
            n.nodeValue = e, At = !0;
          } catch (R) {
            Rt(t, t.return, R);
          }
        }
        break;
      case 3:
        if (At = !1, zu = null, u = tn, tn = Ll(e.containerInfo), ve(e, t, n), tn = u, Se(t), s & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            Ya(e.containerInfo);
          } catch (R) {
            Rt(t, t.return, R);
          }
        ic && (ic = !1, Ay(t)), At = !1;
        break;
      case 4:
        s = pn, pn = ie, i = Xh(), u = tn, tn = Ll(
          t.stateNode.containerInfo
        ), ve(e, t, n), Se(t), tn = u, At && Ol && (fu = !0), At = i, pn = s;
        break;
      case 12:
        ve(e, t, n), Se(t);
        break;
      case 31:
        ve(e, t, n), Se(t), s & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, du(t, e)));
        break;
      case 13:
        ve(e, t, n), Se(t), t.child.flags & 8192 && t.memoizedState !== null != (i !== null && i.memoizedState !== null) && (pu = Oe()), s & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, du(t, e)));
        break;
      case 22:
        u = t.memoizedState !== null, f = i !== null && i.memoizedState !== null;
        var m = ie, T = zt, C = pn;
        ie = m || u, pn = C || u, zt = T || f, ve(e, t, n), zt = T, pn = C, ie = m, Se(t), s & 8192 && (e = t.stateNode, e._visibility = u ? e._visibility & -2 : e._visibility | 1, !u || i === null || f || ie || zt || (e = f || zt, n = ie, i = zt, ie = u || ie, zt = e, li(t, 2), ie = n, zt = i), !u && pn || lc(t, u)), s & 4 && (e = t.updateQueue, e !== null && (n = e.retryQueue, n !== null && (e.retryQueue = null, du(t, n))));
        break;
      case 19:
        ve(e, t, n), Se(t), s & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, du(t, e)));
        break;
      case 30:
        s & 512 && (zt || i === null || ce(i, i.return)), s = Xh(), u = Ol, f = (n & 335544064) === n, m = t.memoizedProps, Ol = f && Rn(
          m.default,
          m.update
        ) !== "none", ve(e, t, n), Se(t), f && i !== null && At && (t.flags |= 4), Ol = u, At = s;
        break;
      case 21:
        break;
      case 7:
        s & 512 && (zt || i === null || ce(i, i.return)), i && i.stateNode !== null && (i.stateNode._fragmentFiber = t);
      default:
        ve(e, t, n), Se(t);
    }
  }
  function Se(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var n, i = t.return; i !== null; ) {
          if (uy(i)) {
            n = i;
            break;
          }
          i = i.return;
        }
        i = null;
        for (var s = t.return; s !== null; ) {
          if (Jr(s)) {
            var u = s.stateNode;
            i === null ? i = [u] : i.push(u);
          }
          if (Kr(s)) break;
          s = s.return;
        }
        var f = i;
        if (n == null) throw Error(r(160));
        switch (n.tag) {
          case 27:
            var m = n.stateNode, T = Pr(t);
            uu(
              t,
              T,
              m,
              f
            );
            break;
          case 5:
            var C = n.stateNode;
            n.flags & 32 && (ia(C, ""), n.flags &= -33);
            var R = Pr(t);
            uu(
              t,
              R,
              C,
              f
            );
            break;
          case 3:
          case 4:
            var B = n.stateNode.containerInfo, x = Pr(t);
            Ir(
              t,
              x,
              B,
              f
            );
            break;
          default:
            throw Error(r(161));
        }
      } catch (O) {
        Rt(t, t.return, O);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function Ay(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        Ay(e), e.tag === 5 && e.flags & 1024 && (e = e.stateNode, Ha = !0, e.reset(), Ha = !1), t = t.sibling;
      }
  }
  function Ea(t, e) {
    if (e.subtreeFlags & 9270)
      for (e = e.child; e !== null; )
        xy(e, t), e = e.sibling;
    else my(e);
  }
  function xy(t, e) {
    var n = t.alternate;
    if (n === null) Wr(t, !1);
    else
      switch (t.tag) {
        case 3:
          if (ac = gn = !1, cy(), Ea(e, t), !gn && !fu) {
            if (t = mn, t !== null)
              for (var i = 0; i < t.length; i += 3) {
                n = t[i];
                var s = t[i + 1];
                f0(n, t[i + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate(
                  { opacity: [0, 0], pointerEvents: ["none", "none"] },
                  {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition-group(" + s + ")"
                  }
                );
              }
            t = e.containerInfo, t = t.nodeType === 9 ? t.documentElement : t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "" && (t.style.viewTransitionName = "none", t.animate(
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
            )), ac = !0;
          }
          mn = null;
          break;
        case 5:
          Ea(e, t);
          break;
        case 4:
          i = gn, gn = !1, Ea(e, t), gn && (fu = !0), gn = i;
          break;
        case 22:
          t.memoizedState === null && (n.memoizedState !== null ? Wr(t, !1) : Ea(e, t));
          break;
        case 30:
          i = gn, s = cy(), gn = !1, Ea(e, t), gn && (t.flags |= 4);
          var u = t.memoizedProps, f = t.stateNode;
          e = On(u, f), f = On(n.memoizedProps, f);
          var m = Rn(u.default, u.update);
          m === "none" ? e = !1 : (u = n.memoizedState, n.memoizedState = null, n = t.child, xe = 0, e = nc(
            t,
            n,
            e,
            f,
            m,
            u,
            !0
          ), xe !== (u === null ? 0 : u.length) && (t.flags |= 32)), (t.flags & 4) !== 0 && e ? (Oa(
            t,
            t.memoizedProps.onUpdate
          ), mn = s) : s !== null && (s.push.apply(s, mn), mn = s), gn = (t.flags & 32) !== 0 ? !0 : i;
          break;
        default:
          Ea(e, t);
      }
  }
  function vn(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        py(t, e.alternate, e), e = e.sibling;
  }
  function li(t, e) {
    for (t = t.child; t !== null; ) {
      var n = t, i = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ai(4, n, n.return), li(
            n,
            i
          );
          break;
        case 1:
          ce(n, n.return);
          var s = n.stateNode;
          typeof s.componentWillUnmount == "function" && ly(
            n,
            n.return,
            s
          ), li(
            n,
            i
          );
          break;
        case 27:
          (i & 2) !== 0 && A0(
            n.stateNode,
            n.type,
            n.memoizedProps
          );
        case 5:
          ce(n, n.return), n.tag !== 5 && n.tag !== 27 || zl(n), li(
            n,
            i
          );
          break;
        case 6:
          zl(n);
          break;
        case 26:
          ce(n, n.return), s = n.stateNode, n.memoizedState !== null || s === null || zt || s.parentNode.removeChild(s), li(
            n,
            i
          );
          break;
        case 22:
          n.memoizedState === null && li(
            n,
            i
          );
          break;
        case 30:
          ce(n, n.return), li(
            n,
            i
          );
          break;
        case 7:
          ce(n, n.return);
        default:
          li(
            n,
            i
          );
      }
      t = t.sibling;
    }
  }
  function en(t, e, n) {
    for (n = (e.subtreeFlags & 8772) !== 0 ? n : n & -2, e = e.child; e !== null; ) {
      var i = e.alternate, s = t, u = e, f = u.flags, m = (n & 1) !== 0;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          en(
            s,
            u,
            n
          ), Dl(4, u);
          break;
        case 1:
          if (en(
            s,
            u,
            n
          ), i = u, s = i.stateNode, typeof s.componentDidMount == "function")
            try {
              s.componentDidMount();
            } catch (R) {
              Rt(i, i.return, R);
            }
          if (i = u, s = i.updateQueue, s !== null) {
            var T = i.stateNode;
            try {
              var C = s.shared.hiddenCallbacks;
              if (C !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < C.length; s++)
                  Kd(C[s], T);
            } catch (R) {
              Rt(i, i.return, R);
            }
          }
          m && f & 64 && ay(u), dn(u, u.return);
          break;
        case 27:
          (n & 2) !== 0 && oy(u);
        case 5:
          u.tag !== 5 && u.tag !== 27 || sy(u), en(
            s,
            u,
            n
          ), m && i === null && f & 4 && Fr(u), dn(u, u.return);
          break;
        case 6:
          sy(u);
          break;
        case 26:
          T = u.stateNode, u.memoizedState !== null || T === null || ie || Qc(
            Ll(T.ownerDocument),
            u.type,
            T
          ), en(
            s,
            u,
            n
          ), m && i === null && f & 4 && Fr(u), dn(u, u.return);
          break;
        case 12:
          en(
            s,
            u,
            n
          );
          break;
        case 31:
          en(
            s,
            u,
            n
          ), m && f & 4 && Ty(s, u);
          break;
        case 13:
          en(
            s,
            u,
            n
          ), m && f & 4 && by(s, u);
          break;
        case 22:
          u.memoizedState === null && en(
            s,
            u,
            n
          ), dn(u, u.return);
          break;
        case 30:
          en(
            s,
            u,
            n
          ), dn(u, u.return);
          break;
        case 7:
          dn(u, u.return);
        default:
          en(
            s,
            u,
            n
          );
      }
      e = e.sibling;
    }
  }
  function uc(t, e) {
    var n = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== n && (t != null && t.refCount++, n != null && ml(n));
  }
  function oc(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && ml(t));
  }
  function Je(t, e, n, i) {
    var s = (n & 335544064) === n;
    if (e.subtreeFlags & (s ? 10262 : 10256))
      for (e = e.child; e !== null; )
        My(
          t,
          e,
          n,
          i
        ), e = e.sibling;
    else s && dy(e);
  }
  function My(t, e, n, i) {
    var s = (n & 335544064) === n;
    s && e.alternate === null && e.return !== null && e.return.alternate !== null && cu(e);
    var u = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Je(
          t,
          e,
          n,
          i
        ), u & 2048 && Dl(9, e);
        break;
      case 1:
        Je(
          t,
          e,
          n,
          i
        );
        break;
      case 3:
        Je(
          t,
          e,
          n,
          i
        ), s && ac && (t = t.containerInfo, t = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, t.style.viewTransitionName === "root" && (t.style.viewTransitionName = ""), t = t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "none" && (t.style.viewTransitionName = "")), u & 2048 && (u = null, e.alternate !== null && (u = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== u && (e.refCount++, u != null && ml(u)));
        break;
      case 12:
        if (u & 2048) {
          Je(
            t,
            e,
            n,
            i
          ), u = e.stateNode;
          try {
            var f = e.memoizedProps, m = f.id, T = f.onPostCommit;
            typeof T == "function" && T(
              m,
              e.alternate === null ? "mount" : "update",
              u.passiveEffectDuration,
              -0
            );
          } catch (C) {
            Rt(e, e.return, C);
          }
        } else
          Je(
            t,
            e,
            n,
            i
          );
        break;
      case 31:
        Je(
          t,
          e,
          n,
          i
        );
        break;
      case 13:
        Je(
          t,
          e,
          n,
          i
        );
        break;
      case 23:
        break;
      case 22:
        f = e.stateNode, m = e.alternate, e.memoizedState !== null ? (s && m !== null && m.memoizedState === null && cu(m), f._visibility & 2 ? Je(
          t,
          e,
          n,
          i
        ) : Rl(
          t,
          e
        )) : (s && m !== null && m.memoizedState !== null && cu(e), f._visibility & 2 ? Je(
          t,
          e,
          n,
          i
        ) : (f._visibility |= 2, Aa(
          t,
          e,
          n,
          i,
          (e.subtreeFlags & 10256) !== 0 || !1
        ))), u & 2048 && uc(m, e);
        break;
      case 24:
        Je(
          t,
          e,
          n,
          i
        ), u & 2048 && oc(e.alternate, e);
        break;
      case 30:
        s && (u = e.alternate, u !== null && (yn(u.child, !0), yn(e.child, !0))), Je(
          t,
          e,
          n,
          i
        );
        break;
      default:
        Je(
          t,
          e,
          n,
          i
        );
    }
  }
  function Aa(t, e, n, i, s) {
    for (s = s && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var u = t, f = e, m = n, T = i, C = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          Aa(
            u,
            f,
            m,
            T,
            s
          ), Dl(8, f);
          break;
        case 23:
          break;
        case 22:
          var R = f.stateNode;
          f.memoizedState !== null ? R._visibility & 2 ? Aa(
            u,
            f,
            m,
            T,
            s
          ) : Rl(
            u,
            f
          ) : (R._visibility |= 2, Aa(
            u,
            f,
            m,
            T,
            s
          )), s && C & 2048 && uc(
            f.alternate,
            f
          );
          break;
        case 24:
          Aa(
            u,
            f,
            m,
            T,
            s
          ), s && C & 2048 && oc(f.alternate, f);
          break;
        default:
          Aa(
            u,
            f,
            m,
            T,
            s
          );
      }
      e = e.sibling;
    }
  }
  function Rl(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var n = t, i = e, s = i.flags;
        switch (i.tag) {
          case 22:
            Rl(n, i), s & 2048 && uc(
              i.alternate,
              i
            );
            break;
          case 24:
            Rl(n, i), s & 2048 && oc(i.alternate, i);
            break;
          default:
            Rl(n, i);
        }
        e = e.sibling;
      }
  }
  var Hi = 8192;
  function Yi(t, e, n) {
    if (t.subtreeFlags & Hi)
      for (t = t.child; t !== null; )
        Cy(
          t,
          e,
          n
        ), t = t.sibling;
  }
  function Cy(t, e, n) {
    switch (t.tag) {
      case 26:
        Yi(
          t,
          e,
          n
        ), t.flags & Hi && (t.memoizedState !== null ? KT(
          n,
          tn,
          t.memoizedState,
          t.memoizedProps
        ) : (t = t.stateNode, (e & 335544128) === e && V0(n, t)));
        break;
      case 5:
        Yi(
          t,
          e,
          n
        ), t.flags & Hi && (t = t.stateNode, (e & 335544128) === e && V0(n, t));
        break;
      case 3:
      case 4:
        var i = tn;
        tn = Ll(t.stateNode.containerInfo), Yi(
          t,
          e,
          n
        ), tn = i;
        break;
      case 22:
        t.memoizedState === null && (i = t.alternate, i !== null && i.memoizedState !== null ? (i = Hi, Hi = 16777216, Yi(
          t,
          e,
          n
        ), Hi = i) : Yi(
          t,
          e,
          n
        ));
        break;
      case 30:
        if ((t.flags & Hi) !== 0 && (i = t.memoizedProps.name, i != null && i !== "auto")) {
          var s = t.stateNode;
          s.paired = null, Ue === null && (Ue = /* @__PURE__ */ new Map()), Ue.set(i, s);
        }
        Yi(
          t,
          e,
          n
        );
        break;
      default:
        Yi(
          t,
          e,
          n
        );
    }
  }
  function Dy(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function Nl(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          ae = i, Oy(
            i,
            t
          );
        }
      Dy(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        zy(t), t = t.sibling;
  }
  function zy(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Nl(t), t.flags & 2048 && ai(9, t, t.return);
        break;
      case 3:
        Nl(t);
        break;
      case 12:
        Nl(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, mu(t)) : Nl(t);
        break;
      default:
        Nl(t);
    }
  }
  function mu(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          ae = i, Oy(
            i,
            t
          );
        }
      Dy(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          ai(8, e, e.return), mu(e);
          break;
        case 22:
          n = e.stateNode, n._visibility & 2 && (n._visibility &= -3, mu(e));
          break;
        default:
          mu(e);
      }
      t = t.sibling;
    }
  }
  function Oy(t, e) {
    for (; ae !== null; ) {
      var n = ae;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          ai(8, n, e);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var i = n.memoizedState.cachePool.pool;
            i != null && i.refCount++;
          }
          break;
        case 24:
          ml(n.memoizedState.cache);
      }
      if (i = n.child, i !== null) i.return = n, ae = i;
      else
        t: for (n = t; ae !== null; ) {
          i = ae;
          var s = i.sibling, u = i.return;
          if (vy(i), i === n) {
            ae = null;
            break t;
          }
          if (s !== null) {
            s.return = u, ae = s;
            break t;
          }
          ae = u;
        }
    }
  }
  var qS = {
    getCacheForType: function(t) {
      var e = ue(Ft), n = e.data.get(t);
      return n === void 0 && (n = t(), e.data.set(t, n)), n;
    },
    cacheSignal: function() {
      return ue(Ft).controller.signal;
    }
  }, GS = typeof WeakMap == "function" ? WeakMap : Map, Mt = 0, Vt = null, yt = null, gt = 0, Ot = 0, Be = null, si = !1, xa = !1, rc = !1, Hn = 0, Zt = 0, ui = 0, qi = 0, yu = 0, je = 0, Ma = 0, _l = null, Ce = null, cc = !1, pu = 0, Ry = 0, gu = 1 / 0, vu = null, oi = null, Xt = 0, nn = null, Gi = null, Sn = 0, fc = 0, hc = null, Ny = null, Ca = null, Da = null, za = null, Vl = 0, Su = null;
  function Le() {
    return (Mt & 2) !== 0 && gt !== 0 ? gt & -gt : nt.T !== null ? Ec() : wh();
  }
  function _y() {
    if (je === 0)
      if ((gt & 536870912) === 0 || mt) {
        var t = ds;
        ds <<= 1, (ds & 3932160) === 0 && (ds = 262144), je = t;
      } else je = 536870912;
    return t = oe.current, t !== null && (t.flags |= 32), je;
  }
  function Oa(t, e) {
    if (e != null) {
      var n = t.stateNode, i = n.ref;
      i === null && (i = n.ref = h0(
        On(t.memoizedProps, n)
      )), Da === null && (Da = []), Da.push(e.bind(null, i));
    }
  }
  function De(t, e, n) {
    (t === Vt && (Ot === 2 || Ot === 9) || t.cancelPendingCommit !== null) && (Ra(t, 0), ri(
      t,
      gt,
      je,
      !1
    )), tl(t, n), ((Mt & 2) === 0 || t !== Vt) && (t === Vt && ((Mt & 2) === 0 && (qi |= n), Zt === 4 && ri(
      t,
      gt,
      je,
      !1
    )), Tn(t));
  }
  function Vy(t, e, n) {
    if ((Mt & 6) !== 0) throw Error(r(327));
    var i = !n && (e & 127) === 0 && (e & t.expiredLanes) === 0 || $a(t, e), s = i ? ZS(t, e) : mc(t, e, !0), u = i;
    do {
      if (s === 0) {
        xa && !i && ri(t, e, 0, !1);
        break;
      } else {
        if (n = t.current.alternate, u && !XS(n)) {
          s = mc(t, e, !1), u = !1;
          continue;
        }
        if (s === 2) {
          if (u = e, t.errorRecoveryDisabledLanes & u)
            var f = 0;
          else
            f = t.pendingLanes & -536870913, f = f !== 0 ? f : f & 536870912 ? 536870912 : 0;
          if (f !== 0) {
            e = f;
            t: {
              var m = t;
              s = _l;
              var T = m.current.memoizedState.isDehydrated;
              if (T && (Ra(m, f).flags |= 256), f = mc(
                m,
                f,
                !1
              ), f !== 2 && f !== 6) {
                if (rc && !T) {
                  m.errorRecoveryDisabledLanes |= u, qi |= u, s = 4;
                  break t;
                }
                u = Ce, Ce = s, u !== null && (Ce === null ? Ce = u : Ce.push.apply(
                  Ce,
                  u
                ));
              }
              s = f;
            }
            if (u = !1, s !== 2) continue;
          }
        }
        if (s === 1) {
          Ra(t, 0), ri(t, e, 0, !0);
          break;
        }
        t: {
          switch (i = t, u = s, u) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((e & 4194048) !== e && (e & 62914560) !== e)
                break;
            case 6:
              ri(
                i,
                e,
                je,
                !si
              );
              break t;
            case 2:
              Ce = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((e & 62914560) === e && (s = pu + 300 - Oe(), 10 < s)) {
            if (ri(
              i,
              e,
              je,
              !si
            ), ys(i, 0, !0) !== 0) break t;
            Sn = e, i.timeoutHandle = Vc(
              wy.bind(
                null,
                i,
                n,
                Ce,
                vu,
                cc,
                e,
                je,
                qi,
                Ma,
                si,
                u,
                "Throttled",
                -0,
                0
              ),
              s
            );
            break t;
          }
          wy(
            i,
            n,
            Ce,
            vu,
            cc,
            e,
            je,
            qi,
            Ma,
            si,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Tn(t);
  }
  function wy(t, e, n, i, s, u, f, m, T, C, R, B, x, O) {
    t.timeoutHandle = -1;
    var K = e.subtreeFlags, tt = (u & 335544064) === u;
    if (B = null, (tt || K & 8192 || (K & 16785408) === 16785408) && (B = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: cn
    }, Ue = null, Cy(
      e,
      u,
      B
    ), tt && (K = B, tt = t.containerInfo, tt = (tt.nodeType === 9 ? tt : tt.ownerDocument).__reactViewTransition, tt != null && (K.count++, K.waitingForViewTransition = !0, K = ql.bind(K), tt.finished.then(K, K))), K = (u & 62914560) === u ? pu - Oe() : (u & 4194048) === u ? Ry - Oe() : 0, K = JT(
      B,
      K
    ), K !== null)) {
      Sn = u, t.cancelPendingCommit = K(
        Gy.bind(
          null,
          t,
          e,
          u,
          n,
          i,
          s,
          f,
          m,
          T,
          C,
          R,
          B,
          null,
          x,
          O
        )
      ), ri(t, u, f, !C);
      return;
    }
    Gy(
      t,
      e,
      u,
      n,
      i,
      s,
      f,
      m,
      T,
      C,
      R,
      B
    );
  }
  function XS(t) {
    for (var e = t; ; ) {
      var n = e.tag;
      if ((n === 0 || n === 11 || n === 15) && e.flags & 16384 && (n = e.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var i = 0; i < n.length; i++) {
          var s = n[i], u = s.getSnapshot;
          s = s.value;
          try {
            if (!Ve(u(), s)) return !1;
          } catch {
            return !1;
          }
        }
      if (n = e.child, e.subtreeFlags & 16384 && n !== null)
        n.return = e, e = n;
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    }
    return !0;
  }
  function ri(t, e, n, i) {
    e = Oh(t, e), e &= ~yu, e &= ~qi, t.suspendedLanes |= e, t.pingedLanes &= ~e, i && (t.warmLanes |= e), i = t.expirationTimes;
    for (var s = e; 0 < s; ) {
      var u = 31 - Ne(s), f = 1 << u;
      i[u] = -1, s &= ~f;
    }
    n !== 0 && Nh(t, n, e);
  }
  function Tu() {
    return (Mt & 6) === 0 ? (wl(0), !1) : !0;
  }
  function dc() {
    if (yt !== null) {
      if (Ot === 0)
        var t = yt.return;
      else
        t = yt, Vn = Oi = null, br(t), pa = null, gl = 0, t = yt;
      for (; t !== null; )
        iy(t.alternate, t), t = t.return;
      yt = null;
    }
  }
  function Ra(t, e) {
    var n = t.timeoutHandle;
    return n !== -1 && (t.timeoutHandle = -1, dT(n)), n = t.cancelPendingCommit, n !== null && (t.cancelPendingCommit = null, n()), Sn = 0, dc(), Vt = t, yt = n = Nn(t.current, null), gt = e, Ot = 0, Be = null, si = !1, xa = $a(t, e), rc = !1, Ma = je = yu = qi = ui = Zt = 0, Ce = _l = null, cc = !1, Hn = Oh(t, e), zs(), n;
  }
  function Uy(t, e) {
    ft = null, nt.H = $s, e === ya || e === Hs ? (e = Gd(), Ot = 3) : e === or ? (e = Gd(), Ot = 4) : Ot = e === Br ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, Be = e, yt === null && (Zt = 1, tu(
      t,
      Xe(e, t.current)
    ));
  }
  function By() {
    var t = oe.current;
    return t === null ? !0 : (gt & 4194048) === gt ? ye === null : (gt & 62914560) === gt || (gt & 536870912) !== 0 ? t === ye : !1;
  }
  function jy() {
    var t = nt.H;
    return nt.H = $s, t === null ? $s : t;
  }
  function Ly() {
    var t = nt.A;
    return nt.A = qS, t;
  }
  function bu() {
    Zt = 4, si || (gt & 4194048) !== gt && oe.current !== null || (xa = !0), (ui & 134217727) === 0 && (qi & 134217727) === 0 || Vt === null || ri(
      Vt,
      gt,
      je,
      !1
    );
  }
  function mc(t, e, n) {
    var i = Mt;
    Mt |= 2;
    var s = jy(), u = Ly();
    (Vt !== t || gt !== e) && (vu = null, Ra(t, e)), e = !1;
    var f = Zt;
    t: do
      try {
        if (Ot !== 0 && yt !== null) {
          var m = yt, T = Be;
          switch (Ot) {
            case 8:
              dc(), f = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              oe.current === null && (e = !0);
              var C = Ot;
              if (Ot = 0, Be = null, Na(t, m, T, C), n && xa) {
                f = 0;
                break t;
              }
              break;
            default:
              C = Ot, Ot = 0, Be = null, Na(t, m, T, C);
          }
        }
        QS(), f = Zt;
        break;
      } catch (R) {
        Uy(t, R);
      }
    while (!0);
    return e && t.shellSuspendCounter++, Vn = Oi = null, Mt = i, nt.H = s, nt.A = u, yt === null && (Vt = null, gt = 0, zs()), f;
  }
  function QS() {
    for (; yt !== null; ) Hy(yt);
  }
  function ZS(t, e) {
    var n = Mt;
    Mt |= 2;
    var i = jy(), s = Ly();
    Vt !== t || gt !== e ? (vu = null, gu = Oe() + 500, Ra(t, e)) : xa = $a(
      t,
      e
    );
    t: do
      try {
        if (Ot !== 0 && yt !== null) {
          e = yt;
          var u = Be;
          e: switch (Ot) {
            case 1:
              Ot = 0, Be = null, Na(t, e, u, 1);
              break;
            case 2:
            case 9:
              if (Yd(u)) {
                Ot = 0, Be = null, Yy(e);
                break;
              }
              e = function() {
                Ot !== 2 && Ot !== 9 || Vt !== t || (Ot = 7), Tn(t);
              }, u.then(e, e);
              break t;
            case 3:
              Ot = 7;
              break t;
            case 4:
              Ot = 5;
              break t;
            case 7:
              Yd(u) ? (Ot = 0, Be = null, Yy(e)) : (Ot = 0, Be = null, Na(t, e, u, 7));
              break;
            case 5:
              var f = null;
              switch (yt.tag) {
                case 26:
                  f = yt.memoizedState;
                case 5:
                case 27:
                  var m = yt;
                  if (f ? N0(f) : m.stateNode.complete) {
                    Ot = 0, Be = null;
                    var T = m.sibling;
                    if (T !== null) yt = T;
                    else {
                      var C = m.return;
                      C !== null ? (yt = C, Eu(C)) : yt = null;
                    }
                    break e;
                  }
              }
              Ot = 0, Be = null, Na(t, e, u, 5);
              break;
            case 6:
              Ot = 0, Be = null, Na(t, e, u, 6);
              break;
            case 8:
              dc(), Zt = 6;
              break t;
            default:
              throw Error(r(462));
          }
        }
        KS();
        break;
      } catch (R) {
        Uy(t, R);
      }
    while (!0);
    return Vn = Oi = null, nt.H = i, nt.A = s, Mt = n, yt !== null ? 0 : (Vt = null, gt = 0, zs(), Zt);
  }
  function KS() {
    for (; yt !== null && !r1(); )
      Hy(yt);
  }
  function Hy(t) {
    var e = ey(t.alternate, t, Hn);
    t.memoizedProps = t.pendingProps, e === null ? Eu(t) : yt = e;
  }
  function Yy(t) {
    var e = t, n = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = Fm(
          n,
          e,
          e.pendingProps,
          e.type,
          void 0,
          gt
        );
        break;
      case 11:
        e = Fm(
          n,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          gt
        );
        break;
      case 5:
        br(e);
        var i = e;
        i === ne && (mt ? (ws(i), i.tag === 5 && i.stateNode != null && (Lt = i.stateNode)) : (ws(i), mt = !0));
      default:
        iy(n, e), e = yt = Od(e, Hn), e = ey(n, e, Hn);
    }
    t.memoizedProps = t.pendingProps, e === null ? Eu(t) : yt = e;
  }
  function Na(t, e, n, i) {
    Vn = Oi = null, br(e), pa = null, gl = 0;
    var s = e.return;
    try {
      if (VS(
        t,
        s,
        e,
        n,
        gt
      )) {
        Zt = 1, tu(
          t,
          Xe(n, t.current)
        ), yt = null;
        return;
      }
    } catch (u) {
      if (s !== null) throw yt = s, u;
      Zt = 1, tu(
        t,
        Xe(n, t.current)
      ), yt = null;
      return;
    }
    e.flags & 32768 ? (mt || i === 1 ? t = !0 : xa || (gt & 536870912) !== 0 ? t = !1 : (si = t = !0, (i === 2 || i === 9 || i === 3 || i === 6) && (i = oe.current, i !== null && i.tag === 13 && (i.flags |= 16384))), qy(e, t)) : Eu(e);
  }
  function Eu(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        qy(
          e,
          si
        );
        return;
      }
      t = e.return;
      var n = jS(
        e.alternate,
        e,
        Hn
      );
      if (n !== null) {
        yt = n;
        return;
      }
      if (e = e.sibling, e !== null) {
        yt = e;
        return;
      }
      yt = e = t;
    } while (e !== null);
    Zt === 0 && (Zt = 5);
  }
  function qy(t, e) {
    do {
      var n = LS(t.alternate, t);
      if (n !== null) {
        n.flags &= 32767, yt = n;
        return;
      }
      if (n = t.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !e && (t = t.sibling, t !== null)) {
        yt = t;
        return;
      }
      yt = t = n;
    } while (t !== null);
    Zt = 6, yt = null;
  }
  function Gy(t, e, n, i, s, u, f, m, T, C, R, B) {
    t.cancelPendingCommit = null;
    do
      Au();
    while (Xt !== 0);
    if ((Mt & 6) !== 0) throw Error(r(327));
    if (e !== null) {
      if (e === t.current) throw Error(r(177));
      t === Vt && (yt = Vt = null, gt = 0), Gi = e, nn = t, Sn = n, hc = s, Ny = i, JS(
        t,
        e,
        n,
        f,
        m,
        T,
        B
      );
    }
  }
  function JS(t, e, n, i, s, u, f) {
    var m = e.lanes | e.childLanes;
    if (fc = m, m |= ko, S1(
      t,
      n,
      m,
      i,
      s,
      u
    ), Da = null, (n & 335544064) === n ? (za = bS(t), i = 10262) : (za = null, i = 10256), (e.subtreeFlags & i) !== 0 || (e.flags & i) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, $S(fs, function() {
      return vc(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), ou = !1, i = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || i) {
      i = nt.T, nt.T = null, s = rt.p, rt.p = 2, u = Mt, Mt |= 4;
      try {
        HS(t, e, n);
      } finally {
        Mt = u, rt.p = s, nt.T = i;
      }
    }
    Xt = 1, ou ? Ca = ST(
      f,
      t.containerInfo,
      za,
      yc,
      pc,
      kS,
      gc,
      vc,
      FS
    ) : (yc(), pc(), gc());
  }
  function FS(t) {
    if (Xt !== 0) {
      var e = nn.onRecoverableError;
      e(t, { componentStack: null });
    }
  }
  function kS() {
    Xt === 3 && (Xt = 0, xy(Gi, nn), Xt = 4);
  }
  function yc() {
    if (Xt === 1) {
      Xt = 0;
      var t = nn, e = Gi, n = Sn, i = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || i) {
        i = nt.T, nt.T = null;
        var s = rt.p;
        rt.p = 2;
        var u = Mt;
        Mt |= 4;
        try {
          Ol = fu = !1, Ey(e, t, n), n = Rc;
          var f = Sd(t.containerInfo), m = n.focusedElem, T = n.selectionRange;
          if (f !== m && m && m.ownerDocument && vd(
            m.ownerDocument.documentElement,
            m
          )) {
            if (T !== null && Qo(m)) {
              var C = T.start, R = T.end;
              if (R === void 0 && (R = C), "selectionStart" in m)
                m.selectionStart = C, m.selectionEnd = Math.min(
                  R,
                  m.value.length
                );
              else {
                var B = m.ownerDocument || document, x = B && B.defaultView || window;
                if (x.getSelection) {
                  var O = x.getSelection(), K = m.textContent.length, tt = Math.min(T.start, K), ht = T.end === void 0 ? tt : Math.min(T.end, K);
                  !O.extend && tt > ht && (f = ht, ht = tt, tt = f);
                  var M = gd(
                    m,
                    tt
                  ), A = gd(
                    m,
                    ht
                  );
                  if (M && A && (O.rangeCount !== 1 || O.anchorNode !== M.node || O.anchorOffset !== M.offset || O.focusNode !== A.node || O.focusOffset !== A.offset)) {
                    var D = B.createRange();
                    D.setStart(M.node, M.offset), O.removeAllRanges(), tt > ht ? (O.addRange(D), O.extend(A.node, A.offset)) : (D.setEnd(A.node, A.offset), O.addRange(D));
                  }
                }
              }
            }
            for (B = [], O = m; O = O.parentNode; )
              O.nodeType === 1 && B.push({
                element: O,
                left: O.scrollLeft,
                top: O.scrollTop
              });
            for (typeof m.focus == "function" && m.focus(), m = 0; m < B.length; m++) {
              var U = B[m];
              U.element.scrollLeft = U.left, U.element.scrollTop = U.top;
            }
          }
          Ha = !!Oc, Rc = Oc = null;
        } finally {
          Mt = u, rt.p = s, nt.T = i;
        }
      }
      t.current = e, Xt = 2;
    }
  }
  function pc() {
    if (Xt === 2) {
      Xt = 0;
      var t = nn, e = Gi, n = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || n) {
        n = nt.T, nt.T = null;
        var i = rt.p;
        rt.p = 2;
        var s = Mt;
        Mt |= 4;
        try {
          py(t, e.alternate, e);
        } finally {
          Mt = s, rt.p = i, nt.T = n;
        }
      }
      Xt = 3;
    }
  }
  function gc() {
    if (Xt === 4 || Xt === 3) {
      Xt = 0;
      var t = Ca;
      Ca = null, c1();
      var e = nn, n = Gi, i = Sn, s = Ny, u = (i & 335544064) === i ? 10262 : 10256;
      if ((n.subtreeFlags & u) !== 0 || (n.flags & u) !== 0 ? Xt = 5 : (Xt = 0, Gi = nn = null, Xy(e, e.pendingLanes)), u = e.pendingLanes, u === 0 && (oi = null), Co(i), n = n.stateNode, Re && typeof Re.onCommitFiberRoot == "function")
        try {
          Re.onCommitFiberRoot(
            Wa,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (s !== null) {
        n = nt.T, u = rt.p, rt.p = 2, nt.T = null;
        try {
          for (var f = e.onRecoverableError, m = 0; m < s.length; m++) {
            var T = s[m];
            f(T.value, {
              componentStack: T.stack
            });
          }
        } finally {
          nt.T = n, rt.p = u;
        }
      }
      if (s = Da, f = za, za = null, s !== null && (Da = null, f === null && (f = []), t !== null))
        for (T = 0; T < s.length; T++)
          n = (0, s[T])(
            f
          ), n !== void 0 && t.finished.finally(n);
      (Sn & 3) !== 0 && Au(), Tn(e), u = e.pendingLanes, (i & 261930) !== 0 && (u & 42) !== 0 ? e === Su ? Vl++ : (Vl = 0, Su = e) : (Vl = 0, Su = null), wl(0);
    }
  }
  function Xy(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, ml(e)));
  }
  function Au() {
    return Ca !== null && (Ca.skipTransition(), Ca = null), yc(), pc(), gc(), vc();
  }
  function vc() {
    if (Xt !== 5) return !1;
    var t = nn, e = fc;
    fc = 0;
    var n = Co(Sn), i = nt.T, s = rt.p;
    try {
      rt.p = 32 > n ? 32 : n, nt.T = null, n = hc, hc = null;
      var u = nn, f = Sn;
      if (Xt = 0, Gi = nn = null, Sn = 0, (Mt & 6) !== 0) throw Error(r(331));
      var m = Mt;
      if (Mt |= 4, zy(u.current), My(
        u,
        u.current,
        f,
        n
      ), Mt = m, wl(0, !1), Re && typeof Re.onPostCommitFiberRoot == "function")
        try {
          Re.onPostCommitFiberRoot(Wa, u);
        } catch {
        }
      return !0;
    } finally {
      rt.p = s, nt.T = i, Xy(t, e);
    }
  }
  function Qy(t, e, n) {
    e = Xe(n, e), e = Ur(t.stateNode, e, 2), t = ti(t, e, 2), t !== null && (tl(t, 2), Tn(t));
  }
  function Rt(t, e, n) {
    if (t.tag === 3)
      Qy(t, t, n);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          Qy(
            e,
            t,
            n
          );
          break;
        } else if (e.tag === 1) {
          var i = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (oi === null || !oi.has(i))) {
            t = Xe(n, t), n = Ym(2), i = ti(e, n, 2), i !== null && (qm(
              n,
              i,
              e,
              t
            ), tl(i, 2), Tn(i));
            break;
          }
        }
        e = e.return;
      }
  }
  function Sc(t, e, n) {
    var i = t.pingCache;
    if (i === null) {
      i = t.pingCache = new GS();
      var s = /* @__PURE__ */ new Set();
      i.set(e, s);
    } else
      s = i.get(e), s === void 0 && (s = /* @__PURE__ */ new Set(), i.set(e, s));
    s.has(n) || (rc = !0, s.add(n), t = PS.bind(null, t, e, n), e.then(t, t));
  }
  function PS(t, e, n) {
    var i = t.pingCache;
    i !== null && i.delete(e), t.pingedLanes |= t.suspendedLanes & n, t.warmLanes &= ~n, Vt === t && (gt & n) === n && ((Zt === 4 || Zt === 3 && (gt & 62914560) === gt && 300 > Oe() - pu) && (Mt & 2) === 0 ? Ra(t, 0) : yu |= n, Ma === gt && (Ma = 0)), Tn(t);
  }
  function Zy(t, e) {
    e === 0 && (e = Rh()), t = Ci(t, e), t !== null && (tl(t, e), Tn(t));
  }
  function IS(t) {
    var e = t.memoizedState, n = 0;
    e !== null && (n = e.retryLane), Zy(t, n);
  }
  function WS(t, e) {
    var n = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var i = t.stateNode, s = t.memoizedState;
        s !== null && (n = s.retryLane);
        break;
      case 19:
        i = t.stateNode;
        break;
      case 22:
        i = t.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    i !== null && i.delete(e), Zy(t, n);
  }
  function $S(t, e) {
    return Eo(t, e);
  }
  var _a = null, Va = null, Tc = !1, xu = !1, bc = !1, ci = 0;
  function Tn(t) {
    t !== Va && t.next === null && (Va === null ? _a = Va = t : Va = Va.next = t), xu = !0, Tc || (Tc = !0, eT());
  }
  function wl(t, e) {
    if (!bc && xu) {
      bc = !0;
      do
        for (var n = !1, i = _a; i !== null; ) {
          if (t !== 0) {
            var s = i.pendingLanes;
            if (s === 0) var u = 0;
            else {
              var f = i.suspendedLanes, m = i.pingedLanes;
              u = (1 << 31 - Ne(42 | t) + 1) - 1, u &= s & ~(f & ~m), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (n = !0, ky(i, u));
          } else
            u = gt, u = ys(
              i,
              i === Vt ? u : 0,
              i.cancelPendingCommit !== null || i.timeoutHandle !== -1
            ), (u & 3) === 0 || $a(i, u) || (n = !0, ky(i, u));
          i = i.next;
        }
      while (n);
      bc = !1;
    }
  }
  function tT() {
    Ky();
  }
  function Ky() {
    xu = Tc = !1;
    var t = 0;
    ci !== 0 && hT() && (t = ci);
    for (var e = Oe(), n = null, i = _a; i !== null; ) {
      var s = i.next, u = Jy(i, e);
      u === 0 ? (i.next = null, n === null ? _a = s : n.next = s, s === null && (Va = n)) : (n = i, (t !== 0 || (u & 3) !== 0) && (xu = !0)), i = s;
    }
    Xt !== 0 && Xt !== 5 || wl(t), ci !== 0 && (ci = 0);
  }
  function Jy(t, e) {
    for (var n = t.suspendedLanes, i = t.pingedLanes, s = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var f = 31 - Ne(u), m = 1 << f, T = s[f];
      T === -1 ? ((m & n) === 0 || (m & i) !== 0) && (s[f] = v1(m, e)) : T <= e && (t.expiredLanes |= m), u &= ~m;
    }
    if (e = Vt, n = gt, n = ys(
      t,
      t === e ? n : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), i = t.callbackNode, n === 0 || t === e && (Ot === 2 || Ot === 9) || t.cancelPendingCommit !== null)
      return i !== null && i !== null && Ao(i), t.callbackNode = null, t.callbackPriority = 0;
    if ((n & 3) === 0 || $a(t, n)) {
      if (e = n & -n, e === t.callbackPriority) return e;
      switch (i !== null && Ao(i), Co(n)) {
        case 2:
        case 8:
          n = Dh;
          break;
        case 32:
          n = fs;
          break;
        case 268435456:
          n = zh;
          break;
        default:
          n = fs;
      }
      return i = Fy.bind(null, t), n = Eo(n, i), t.callbackPriority = e, t.callbackNode = n, e;
    }
    return i !== null && i !== null && Ao(i), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Fy(t, e) {
    if (Xt !== 0 && Xt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var n = t.callbackNode;
    if (Au() && t.callbackNode !== n)
      return null;
    var i = gt;
    return i = ys(
      t,
      t === Vt ? i : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), i === 0 ? null : (Vy(t, i, e), Jy(t, Oe()), t.callbackNode != null && t.callbackNode === n ? Fy.bind(null, t) : null);
  }
  function ky(t, e) {
    if (Au()) return null;
    Vy(t, e, !0);
  }
  function eT() {
    mT(function() {
      (Mt & 6) !== 0 ? Eo(
        Ch,
        tT
      ) : Ky();
    });
  }
  function Ec() {
    if (ci === 0) {
      var t = _i;
      t === 0 && (t = hs, hs <<= 1, (hs & 261888) === 0 && (hs = 256)), ci = t;
    }
    return ci;
  }
  function Py(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Ts(t);
  }
  function nT(t, e, n, i, s) {
    if (e === "submit" && n && n.stateNode === s) {
      var u = Py(
        (s[Ee] || null).action
      ), f = i.submitter;
      f && (e = (e = f[Ee] || null) ? Py(e.formAction) : f.getAttribute("formAction"), e !== null && (u = e, f = null));
      var m = new xs(
        "action",
        "action",
        null,
        i,
        s
      );
      t.push({
        event: m,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (i.defaultPrevented) {
                if (ci !== 0) {
                  var T = new FormData(s, f);
                  Rr(
                    n,
                    {
                      pending: !0,
                      data: T,
                      method: s.method,
                      action: u
                    },
                    null,
                    T
                  );
                }
              } else
                typeof u == "function" && (m.preventDefault(), T = new FormData(s, f), Rr(
                  n,
                  {
                    pending: !0,
                    data: T,
                    method: s.method,
                    action: u
                  },
                  u,
                  T
                ));
            },
            currentTarget: s
          }
        ]
      });
    }
  }
  for (var Ac = 0; Ac < Fo.length; Ac++) {
    var xc = Fo[Ac], iT = xc.toLowerCase(), aT = xc[0].toUpperCase() + xc.slice(1);
    We(
      iT,
      "on" + aT
    );
  }
  We(Ed, "onAnimationEnd"), We(Ad, "onAnimationIteration"), We(xd, "onAnimationStart"), We("dblclick", "onDoubleClick"), We("focusin", "onFocus"), We("focusout", "onBlur"), We(dS, "onTransitionRun"), We(mS, "onTransitionStart"), We(yS, "onTransitionCancel"), We(Md, "onTransitionEnd"), ea("onMouseEnter", ["mouseout", "mouseover"]), ea("onMouseLeave", ["mouseout", "mouseover"]), ea("onPointerEnter", ["pointerout", "pointerover"]), ea("onPointerLeave", ["pointerout", "pointerover"]), Ai(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Ai(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Ai("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Ai(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Ai(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Ai(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Ul = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), lT = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ul)
  );
  function Iy(t, e) {
    e = (e & 4) !== 0;
    for (var n = 0; n < t.length; n++) {
      var i = t[n], s = i.event;
      i = i.listeners;
      t: {
        var u = void 0;
        if (e)
          for (var f = i.length - 1; 0 <= f; f--) {
            var m = i[f], T = m.instance, C = m.currentTarget;
            if (m = m.listener, T !== u && s.isPropagationStopped())
              break t;
            u = m, s.currentTarget = C;
            try {
              u(s);
            } catch (R) {
              Ds(R);
            }
            s.currentTarget = null, u = T;
          }
        else
          for (f = 0; f < i.length; f++) {
            if (m = i[f], T = m.instance, C = m.currentTarget, m = m.listener, T !== u && s.isPropagationStopped())
              break t;
            u = m, s.currentTarget = C;
            try {
              u(s);
            } catch (R) {
              Ds(R);
            }
            s.currentTarget = null, u = T;
          }
      }
    }
  }
  function pt(t, e) {
    var n = e[Bh];
    n === void 0 && (n = e[Bh] = /* @__PURE__ */ new Set());
    var i = t + "__bubble";
    n.has(i) || (Wy(e, t, 2, !1), n.add(i));
  }
  function Mc(t, e, n) {
    var i = 0;
    e && (i |= 4), Wy(
      n,
      t,
      i,
      e
    );
  }
  var Mu = "_reactListening" + Math.random().toString(36).slice(2);
  function Cc(t) {
    if (!t[Mu]) {
      t[Mu] = !0, Hh.forEach(function(n) {
        n !== "selectionchange" && (lT.has(n) || Mc(n, !1, t), Mc(n, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[Mu] || (e[Mu] = !0, Mc("selectionchange", !1, e));
    }
  }
  function Wy(t, e, n, i) {
    switch (q0(e)) {
      case 2:
        var s = IT;
        break;
      case 8:
        s = WT;
        break;
      default:
        s = Kc;
    }
    n = s.bind(
      null,
      e,
      n,
      t
    ), s = void 0, !wo || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (s = !0), i ? s !== void 0 ? t.addEventListener(e, n, {
      capture: !0,
      passive: s
    }) : t.addEventListener(e, n, !0) : s !== void 0 ? t.addEventListener(e, n, {
      passive: s
    }) : t.addEventListener(e, n, !1);
  }
  function Dc(t, e, n, i, s) {
    var u = i;
    if ((e & 1) === 0 && (e & 2) === 0 && i !== null)
      t: for (; ; ) {
        if (i === null) return;
        var f = i.tag;
        if (f === 3 || f === 4) {
          var m = i.stateNode.containerInfo;
          if (m === s) break;
          if (f === 4)
            for (f = i.return; f !== null; ) {
              var T = f.tag;
              if ((T === 3 || T === 4) && f.stateNode.containerInfo === s)
                return;
              f = f.return;
            }
          for (; m !== null; ) {
            if (f = Ei(m), f === null) return;
            if (T = f.tag, T === 5 || T === 6 || T === 26 || T === 27) {
              i = u = f;
              continue t;
            }
            m = m.parentNode;
          }
        }
        i = i.return;
      }
    Wh(function() {
      var C = u, R = _o(n), B = [];
      t: {
        var x = Cd.get(t);
        if (x !== void 0) {
          var O = xs, K = t;
          switch (t) {
            case "keypress":
              if (Es(n) === 0) break t;
            case "keydown":
            case "keyup":
              O = X1;
              break;
            case "focusin":
              K = "focus", O = Lo;
              break;
            case "focusout":
              K = "blur", O = Lo;
              break;
            case "beforeblur":
            case "afterblur":
              O = Lo;
              break;
            case "click":
              if (n.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              O = ed;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              O = N1;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              O = F1;
              break;
            case Ed:
            case Ad:
            case xd:
              O = w1;
              break;
            case Md:
              O = P1;
              break;
            case "scroll":
            case "scrollend":
              O = O1;
              break;
            case "wheel":
              O = W1;
              break;
            case "copy":
            case "cut":
            case "paste":
              O = B1;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              O = id;
              break;
            case "submit":
              O = K1;
              break;
            case "toggle":
            case "beforetoggle":
              O = tS;
          }
          var tt = (e & 4) !== 0, ht = !tt && (t === "scroll" || t === "scrollend"), M = tt ? x !== null ? x + "Capture" : null : x;
          tt = [];
          for (var A = C, D; A !== null; ) {
            var U = A;
            if (D = U.stateNode, U = U.tag, U !== 5 && U !== 26 && U !== 27 || D === null || M === null || (U = il(A, M), U != null && tt.push(
              Bl(A, U, D)
            )), ht) break;
            A = A.return;
          }
          0 < tt.length && (x = new O(
            x,
            K,
            null,
            n,
            R
          ), B.push({ event: x, listeners: tt }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (O = t === "mouseover" || t === "pointerover", x = t === "mouseout" || t === "pointerout", O && n !== No && (K = n.relatedTarget || n.fromElement) && (Ei(K) || K[Wi]))
            break t;
          (x || O) && (K = R.window === R ? R : (O = R.ownerDocument) ? O.defaultView || O.parentWindow : window, x ? (O = n.relatedTarget || n.toElement, x = C, O = O ? Ei(O) : null, O !== null && (ht = d(O), tt = O.tag, O !== ht || tt !== 5 && tt !== 27 && tt !== 6) && (O = null)) : (x = null, O = C), x !== O && (tt = ed, U = "onMouseLeave", M = "onMouseEnter", A = "mouse", (t === "pointerout" || t === "pointerover") && (tt = id, U = "onPointerLeave", M = "onPointerEnter", A = "pointer"), ht = x == null ? K : nl(x), D = O == null ? K : nl(O), K = new tt(
            U,
            A + "leave",
            x,
            n,
            R
          ), K.target = ht, K.relatedTarget = D, U = null, Ei(R) === C && (tt = new tt(
            M,
            A + "enter",
            O,
            n,
            R
          ), tt.target = D, tt.relatedTarget = ht, U = tt), ht = U, tt = x && O ? st(
            x,
            O,
            sT
          ) : null, x !== null && $y(
            B,
            K,
            x,
            tt,
            !1
          ), O !== null && ht !== null && $y(
            B,
            ht,
            O,
            tt,
            !0
          )));
        }
        t: {
          if (x = C ? nl(C) : window, O = x.nodeName && x.nodeName.toLowerCase(), O === "select" || O === "input" && x.type === "file")
            var I = fd;
          else if (rd(x))
            if (hd)
              I = cS;
            else {
              I = oS;
              var vt = uS;
            }
          else
            O = x.nodeName, !O || O.toLowerCase() !== "input" || x.type !== "checkbox" && x.type !== "radio" ? C && Ro(C.elementType) && (I = fd) : I = rS;
          if (I && (I = I(t, C))) {
            cd(
              B,
              I,
              n,
              R
            );
            break t;
          }
          vt && vt(t, x, C);
        }
        switch (vt = C ? nl(C) : window, t) {
          case "focusin":
            (rd(vt) || vt.contentEditable === "true") && (ua = vt, Zo = C, fl = null);
            break;
          case "focusout":
            fl = Zo = ua = null;
            break;
          case "mousedown":
            Ko = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Ko = !1, Td(B, n, R);
            break;
          case "selectionchange":
            if (hS) break;
          case "keydown":
          case "keyup":
            Td(B, n, R);
        }
        var lt;
        if (Yo)
          t: {
            switch (t) {
              case "compositionstart":
                var ut = "onCompositionStart";
                break t;
              case "compositionend":
                ut = "onCompositionEnd";
                break t;
              case "compositionupdate":
                ut = "onCompositionUpdate";
                break t;
            }
            ut = void 0;
          }
        else
          sa ? ud(t, n) && (ut = "onCompositionEnd") : t === "keydown" && n.keyCode === 229 && (ut = "onCompositionStart");
        ut && (ad && n.locale !== "ko" && (sa || ut !== "onCompositionStart" ? ut === "onCompositionEnd" && sa && (lt = $h()) : (Zn = R, Uo = "value" in Zn ? Zn.value : Zn.textContent, sa = !0)), vt = Cu(C, ut), 0 < vt.length && (ut = new nd(
          ut,
          t,
          null,
          n,
          R
        ), B.push({ event: ut, listeners: vt }), lt ? ut.data = lt : (lt = od(n), lt !== null && (ut.data = lt)))), (lt = nS ? iS(t, n) : aS(t, n)) && (ut = Cu(C, "onBeforeInput"), 0 < ut.length && (vt = new nd(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          R
        ), B.push({
          event: vt,
          listeners: ut
        }), vt.data = lt)), nT(
          B,
          t,
          C,
          n,
          R
        );
      }
      Iy(B, e);
    });
  }
  function Bl(t, e, n) {
    return {
      instance: t,
      listener: e,
      currentTarget: n
    };
  }
  function Cu(t, e) {
    for (var n = e + "Capture", i = []; t !== null; ) {
      var s = t, u = s.stateNode;
      if (s = s.tag, s !== 5 && s !== 26 && s !== 27 || u === null || (s = il(t, n), s != null && i.unshift(
        Bl(t, s, u)
      ), s = il(t, e), s != null && i.push(
        Bl(t, s, u)
      )), t.tag === 3) return i;
      t = t.return;
    }
    return [];
  }
  function sT(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function $y(t, e, n, i, s) {
    for (var u = e._reactName, f = []; n !== null && n !== i; ) {
      var m = n, T = m.alternate, C = m.stateNode;
      if (m = m.tag, T !== null && T === i) break;
      m !== 5 && m !== 26 && m !== 27 || C === null || (T = C, s ? (C = il(n, u), C != null && f.unshift(
        Bl(n, C, T)
      )) : s || (C = il(n, u), C != null && f.push(
        Bl(n, C, T)
      ))), n = n.return;
    }
    f.length !== 0 && t.push({ event: e, listeners: f });
  }
  var uT = /\r\n?/g, oT = /\u0000|\uFFFD/g;
  function t0(t) {
    return (typeof t == "string" ? t : "" + t).replace(uT, `
`).replace(oT, "");
  }
  function e0(t, e) {
    return e = t0(e), t0(t) === e;
  }
  function Nt(t, e, n, i, s, u) {
    switch (n) {
      case "children":
        if (typeof i == "string")
          e === "body" || e === "textarea" && i === "" || ia(t, i);
        else if (typeof i == "number" || typeof i == "bigint")
          e !== "body" && ia(t, "" + i);
        else return;
        break;
      case "className":
        Ss(t, "class", i);
        break;
      case "tabIndex":
        Ss(t, "tabindex", i);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ss(t, n, i);
        break;
      case "style":
        Ph(t, i, u);
        return;
      case "data":
        if (e !== "object") {
          Ss(t, "data", i);
          break;
        }
      case "src":
      case "href":
        if (i === "" && (e !== "a" || n !== "href")) {
          t.removeAttribute(n);
          break;
        }
        if (i == null || typeof i == "function" || typeof i == "symbol" || typeof i == "boolean") {
          t.removeAttribute(n);
          break;
        }
        i = Ts(i), t.setAttribute(n, i);
        break;
      case "action":
      case "formAction":
        if (typeof i == "function") {
          t.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (n === "formAction" ? (e !== "input" && Nt(t, e, "name", s.name, s, null), Nt(
            t,
            e,
            "formEncType",
            s.formEncType,
            s,
            null
          ), Nt(
            t,
            e,
            "formMethod",
            s.formMethod,
            s,
            null
          ), Nt(
            t,
            e,
            "formTarget",
            s.formTarget,
            s,
            null
          )) : (Nt(t, e, "encType", s.encType, s, null), Nt(t, e, "method", s.method, s, null), Nt(t, e, "target", s.target, s, null)));
        if (i == null || typeof i == "symbol" || typeof i == "boolean") {
          t.removeAttribute(n);
          break;
        }
        i = Ts(i), t.setAttribute(n, i);
        break;
      case "onClick":
        i != null && (t.onclick = cn);
        return;
      case "onScroll":
        i != null && pt("scroll", t);
        return;
      case "onScrollEnd":
        i != null && pt("scrollend", t);
        return;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(r(61));
          if (n = i.__html, n != null) {
            if (s.children != null) throw Error(r(60));
            u?.__html !== n && (t.innerHTML = n);
          }
        }
        break;
      case "multiple":
        t.multiple = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "muted":
        t.muted = i && typeof i != "function" && typeof i != "symbol";
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
        if (i == null || typeof i == "function" || typeof i == "boolean" || typeof i == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        n = Ts(i), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          n
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
        i != null && typeof i != "function" && typeof i != "symbol" ? t.setAttribute(n, i) : t.removeAttribute(n);
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
        i && typeof i != "function" && typeof i != "symbol" ? t.setAttribute(n, "") : t.removeAttribute(n);
        break;
      case "capture":
      case "download":
        i === !0 ? t.setAttribute(n, "") : i !== !1 && i != null && typeof i != "function" && typeof i != "symbol" ? t.setAttribute(n, i) : t.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        i != null && typeof i != "function" && typeof i != "symbol" && !isNaN(i) && 1 <= i ? t.setAttribute(n, i) : t.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        i == null || typeof i == "function" || typeof i == "symbol" || isNaN(i) ? t.removeAttribute(n) : t.setAttribute(n, i);
        break;
      case "popover":
        pt("beforetoggle", t), pt("toggle", t), vs(t, "popover", i);
        break;
      case "xlinkActuate":
        Dn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          i
        );
        break;
      case "xlinkArcrole":
        Dn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          i
        );
        break;
      case "xlinkRole":
        Dn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          i
        );
        break;
      case "xlinkShow":
        Dn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          i
        );
        break;
      case "xlinkTitle":
        Dn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          i
        );
        break;
      case "xlinkType":
        Dn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          i
        );
        break;
      case "xmlBase":
        Dn(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          i
        );
        break;
      case "xmlLang":
        Dn(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          i
        );
        break;
      case "xmlSpace":
        Dn(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          i
        );
        break;
      case "is":
        vs(t, "is", i);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N")
          n = D1.get(n) || n, vs(t, n, i);
        else return;
    }
    At = !0;
  }
  function zc(t, e, n, i, s, u) {
    switch (n) {
      case "style":
        Ph(t, i, u);
        return;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(r(61));
          if (n = i.__html, n != null) {
            if (s.children != null) throw Error(r(60));
            u?.__html !== n && (t.innerHTML = n);
          }
        }
        break;
      case "children":
        if (typeof i == "string") ia(t, i);
        else if (typeof i == "number" || typeof i == "bigint")
          ia(t, "" + i);
        else return;
        break;
      case "onScroll":
        i != null && pt("scroll", t);
        return;
      case "onScrollEnd":
        i != null && pt("scrollend", t);
        return;
      case "onClick":
        i != null && (t.onclick = cn);
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
        if (!Yh.hasOwnProperty(n))
          t: {
            if (n[0] === "o" && n[1] === "n" && (s = n.endsWith("Capture"), u = n.slice(2, s ? n.length - 7 : void 0), e = t[Ee] || null, e = e != null ? e[n] : null, typeof e == "function" && t.removeEventListener(u, e, s), typeof i == "function")) {
              typeof e != "function" && e !== null && (n in t ? t[n] = null : t.hasAttribute(n) && t.removeAttribute(n)), t.addEventListener(u, i, s);
              break t;
            }
            At = !0, n in t ? t[n] = i : i === !0 ? t.setAttribute(n, "") : vs(t, n, i);
          }
        return;
    }
    At = !0;
  }
  function fe(t, e, n) {
    switch (e) {
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
        pt("error", t), pt("load", t);
        var i = !1, s = !1, u;
        for (u in n)
          if (n.hasOwnProperty(u)) {
            var f = n[u];
            if (f != null)
              switch (u) {
                case "src":
                  i = !0;
                  break;
                case "srcSet":
                  s = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, e));
                default:
                  Nt(t, e, u, f, n, null);
              }
          }
        s && Nt(t, e, "srcSet", n.srcSet, n, null), i && Nt(t, e, "src", n.src, n, null);
        return;
      case "input":
        pt("invalid", t);
        var m = u = f = s = null, T = null, C = null;
        for (i in n)
          if (n.hasOwnProperty(i)) {
            var R = n[i];
            if (R != null)
              switch (i) {
                case "name":
                  s = R;
                  break;
                case "type":
                  f = R;
                  break;
                case "checked":
                  T = R;
                  break;
                case "defaultChecked":
                  C = R;
                  break;
                case "value":
                  u = R;
                  break;
                case "defaultValue":
                  m = R;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (R != null)
                    throw Error(r(137, e));
                  break;
                default:
                  Nt(t, e, i, R, n, null);
              }
          }
        Kh(
          t,
          u,
          m,
          T,
          C,
          f,
          s,
          !1
        );
        return;
      case "select":
        pt("invalid", t), i = f = u = null;
        for (s in n)
          if (n.hasOwnProperty(s) && (m = n[s], m != null))
            switch (s) {
              case "value":
                u = m;
                break;
              case "defaultValue":
                f = m;
                break;
              case "multiple":
                i = m;
              default:
                Nt(t, e, s, m, n, null);
            }
        e = u, n = f, t.multiple = !!i, e != null ? na(t, !!i, e, !1) : n != null && na(t, !!i, n, !0);
        return;
      case "textarea":
        pt("invalid", t), u = s = i = null;
        for (f in n)
          if (n.hasOwnProperty(f) && (m = n[f], m != null))
            switch (f) {
              case "value":
                i = m;
                break;
              case "defaultValue":
                s = m;
                break;
              case "children":
                u = m;
                break;
              case "dangerouslySetInnerHTML":
                if (m != null) throw Error(r(91));
                break;
              default:
                Nt(t, e, f, m, n, null);
            }
        Fh(t, i, s, u);
        return;
      case "option":
        for (T in n)
          n.hasOwnProperty(T) && (i = n[T], i != null) && (T === "selected" ? t.selected = i && typeof i != "function" && typeof i != "symbol" : Nt(t, e, T, i, n, null));
        return;
      case "dialog":
        pt("beforetoggle", t), pt("toggle", t), pt("cancel", t), pt("close", t);
        break;
      case "iframe":
      case "object":
        pt("load", t);
        break;
      case "video":
      case "audio":
        for (i = 0; i < Ul.length; i++)
          pt(Ul[i], t);
        break;
      case "image":
        pt("error", t), pt("load", t);
        break;
      case "details":
        pt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        pt("error", t), pt("load", t);
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
        for (C in n)
          if (n.hasOwnProperty(C) && (i = n[C], i != null))
            switch (C) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, e));
              default:
                Nt(t, e, C, i, n, null);
            }
        return;
      default:
        if (Ro(e)) {
          for (R in n)
            n.hasOwnProperty(R) && (i = n[R], i !== void 0 && zc(
              t,
              e,
              R,
              i,
              n,
              void 0
            ));
          return;
        }
    }
    for (m in n)
      n.hasOwnProperty(m) && (i = n[m], i != null && Nt(t, e, m, i, n, null));
  }
  var rT = {};
  function cT(t, e, n, i) {
    switch (e) {
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
        var s = null, u = null, f = null, m = null, T = null, C = null, R = null;
        for (O in n) {
          var B = n[O];
          if (n.hasOwnProperty(O) && B != null)
            switch (O) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                T = B;
              default:
                i.hasOwnProperty(O) || Nt(t, e, O, null, i, B);
            }
        }
        for (var x in i) {
          var O = i[x];
          if (B = n[x], i.hasOwnProperty(x) && (O != null || B != null))
            switch (x) {
              case "type":
                O !== B && (At = !0), u = O;
                break;
              case "name":
                O !== B && (At = !0), s = O;
                break;
              case "checked":
                O !== B && (At = !0), C = O;
                break;
              case "defaultChecked":
                O !== B && (At = !0), R = O;
                break;
              case "value":
                O !== B && (At = !0), f = O;
                break;
              case "defaultValue":
                O !== B && (At = !0), m = O;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (O != null)
                  throw Error(r(137, e));
                break;
              default:
                O !== B && Nt(
                  t,
                  e,
                  x,
                  O,
                  i,
                  B
                );
            }
        }
        zo(
          t,
          f,
          m,
          T,
          C,
          R,
          u,
          s
        );
        return;
      case "select":
        O = f = m = x = null;
        for (u in n)
          if (T = n[u], n.hasOwnProperty(u) && T != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                O = T;
              default:
                i.hasOwnProperty(u) || Nt(
                  t,
                  e,
                  u,
                  null,
                  i,
                  T
                );
            }
        for (s in i)
          if (u = i[s], T = n[s], i.hasOwnProperty(s) && (u != null || T != null))
            switch (s) {
              case "value":
                u !== T && (At = !0), x = u;
                break;
              case "defaultValue":
                u !== T && (At = !0), m = u;
                break;
              case "multiple":
                u !== T && (At = !0), f = u;
              default:
                u !== T && Nt(
                  t,
                  e,
                  s,
                  u,
                  i,
                  T
                );
            }
        e = m, n = f, i = O, x != null ? na(t, !!n, x, !1) : !!i != !!n && (e != null ? na(t, !!n, e, !0) : na(t, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        O = x = null;
        for (m in n)
          if (s = n[m], n.hasOwnProperty(m) && s != null && !i.hasOwnProperty(m))
            switch (m) {
              case "value":
                break;
              case "children":
                break;
              default:
                Nt(t, e, m, null, i, s);
            }
        for (f in i)
          if (s = i[f], u = n[f], i.hasOwnProperty(f) && (s != null || u != null))
            switch (f) {
              case "value":
                s !== u && (At = !0), x = s;
                break;
              case "defaultValue":
                s !== u && (At = !0), O = s;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(r(91));
                break;
              default:
                s !== u && Nt(t, e, f, s, i, u);
            }
        Jh(t, x, O);
        return;
      case "option":
        for (var K in n)
          x = n[K], n.hasOwnProperty(K) && x != null && !i.hasOwnProperty(K) && (K === "selected" ? t.selected = !1 : Nt(
            t,
            e,
            K,
            null,
            i,
            x
          ));
        for (T in i)
          x = i[T], O = n[T], i.hasOwnProperty(T) && x !== O && (x != null || O != null) && (T === "selected" ? (x !== O && (At = !0), t.selected = x && typeof x != "function" && typeof x != "symbol") : Nt(
            t,
            e,
            T,
            x,
            i,
            O
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
        for (var tt in n)
          x = n[tt], n.hasOwnProperty(tt) && x != null && !i.hasOwnProperty(tt) && Nt(t, e, tt, null, i, x);
        for (C in i)
          if (x = i[C], O = n[C], i.hasOwnProperty(C) && x !== O && (x != null || O != null))
            switch (C) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (x != null)
                  throw Error(r(137, e));
                break;
              default:
                Nt(
                  t,
                  e,
                  C,
                  x,
                  i,
                  O
                );
            }
        return;
      default:
        if (Ro(e)) {
          for (var ht in n)
            x = n[ht], n.hasOwnProperty(ht) && x !== void 0 && !i.hasOwnProperty(ht) && zc(
              t,
              e,
              ht,
              void 0,
              i,
              x
            );
          for (R in i)
            x = i[R], O = n[R], !i.hasOwnProperty(R) || x === O || x === void 0 && O === void 0 || zc(
              t,
              e,
              R,
              x,
              i,
              O
            );
          return;
        }
    }
    for (var M in n)
      x = n[M], n.hasOwnProperty(M) && x != null && !i.hasOwnProperty(M) && Nt(t, e, M, null, i, x);
    for (B in i)
      x = i[B], O = n[B], !i.hasOwnProperty(B) || x === O || x == null && O == null || Nt(t, e, B, x, i, O);
  }
  function n0(t) {
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
  function fT() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, n = performance.getEntriesByType("resource"), i = 0; i < n.length; i++) {
        var s = n[i], u = s.transferSize, f = s.initiatorType, m = s.duration;
        if (u && m && n0(f)) {
          for (f = 0, m = s.responseEnd, i += 1; i < n.length; i++) {
            var T = n[i], C = T.startTime;
            if (C > m) break;
            var R = T.transferSize, B = T.initiatorType;
            R && n0(B) && (T = T.responseEnd, f += R * (T < m ? 1 : (m - C) / (T - C)));
          }
          if (--i, e += 8 * (u + f) / (s.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Oc = null, Rc = null;
  function jl(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function i0(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function a0(t, e) {
    if (t === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function l0(t, e, n, i) {
    return n = jl(
      n
    ).createElement(t), n[se] = i, n[Ee] = e, fe(n, t, e), ee(n), n;
  }
  function Nc(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var _c = null;
  function hT() {
    var t = window.event;
    return t && t.type === "popstate" ? t === _c ? !1 : (_c = t, !0) : (_c = null, !1);
  }
  var Vc = typeof setTimeout == "function" ? setTimeout : void 0, dT = typeof clearTimeout == "function" ? clearTimeout : void 0, s0 = typeof Promise == "function" ? Promise : void 0, u0 = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Vc, mT = typeof queueMicrotask == "function" ? queueMicrotask : typeof s0 < "u" ? function(t) {
    return s0.resolve(null).then(t).catch(yT);
  } : Vc;
  function yT(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function fi(t) {
    return t === "head";
  }
  function o0(t, e) {
    var n = e, i = 0;
    do {
      var s = n.nextSibling;
      if (t.removeChild(n), s && s.nodeType === 8)
        if (n = s.data, n === "/$" || n === "/&") {
          if (i === 0) {
            t.removeChild(s), Ya(e);
            return;
          }
          i--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          i++;
        else if (n === "html")
          qc(
            t.ownerDocument.documentElement
          );
        else if (n === "head") {
          n = t.ownerDocument.head, qc(n);
          for (var u = n.firstChild; u; ) {
            var f = u.nextSibling, m = u.nodeName;
            u[el] || m === "SCRIPT" || m === "STYLE" || m === "LINK" && u.rel.toLowerCase() === "stylesheet" || n.removeChild(u), u = f;
          }
        } else
          n === "body" && qc(t.ownerDocument.body);
      n = s;
    } while (n);
    Ya(e);
  }
  function r0(t, e) {
    var n = t;
    t = 0;
    do {
      var i = n.nextSibling;
      if (n.nodeType === 1 ? e ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (e ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), i && i.nodeType === 8)
        if (n = i.data, n === "/$") {
          if (t === 0) break;
          t--;
        } else
          n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || t++;
      n = i;
    } while (n);
  }
  function c0(t, e, n) {
    if (e = CSS.escape(e) !== e ? "r-" + btoa(e).replace(/=/g, "") : e, t.style.viewTransitionName = e, n != null && (t.style.viewTransitionClass = n), n = getComputedStyle(t), n.display === "inline") {
      if (e = t.getClientRects(), e.length === 1) var i = 1;
      else
        for (var s = i = 0; s < e.length; s++) {
          var u = e[s];
          0 < u.width && 0 < u.height && i++;
        }
      i === 1 && (t = t.style, t.display = e.length === 1 ? "inline-block" : "block", t.marginTop = "-" + n.paddingTop, t.marginBottom = "-" + n.paddingBottom);
    }
  }
  function f0(t, e) {
    t = t.style, e = e.style;
    var n = e != null ? e.hasOwnProperty("viewTransitionName") ? e.viewTransitionName : e.hasOwnProperty("view-transition-name") ? e["view-transition-name"] : null : null;
    t.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = e != null ? e.hasOwnProperty("viewTransitionClass") ? e.viewTransitionClass : e.hasOwnProperty("view-transition-class") ? e["view-transition-class"] : null : null, t.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), t.display === "inline-block" && (e == null ? t.display = t.margin = "" : (n = e.display, t.display = n == null || typeof n == "boolean" ? "" : n, n = e.margin, n != null ? t.margin = n : (n = e.hasOwnProperty("marginTop") ? e.marginTop : e["margin-top"], t.marginTop = n == null || typeof n == "boolean" ? "" : n, e = e.hasOwnProperty("marginBottom") ? e.marginBottom : e["margin-bottom"], t.marginBottom = e == null || typeof e == "boolean" ? "" : e)));
  }
  function pT(t, e, n) {
    return n = n.ownerDocument.defaultView, {
      rect: t,
      abs: e.position === "absolute" || e.position === "fixed",
      clip: e.clipPath !== "none" || e.overflow !== "visible" || e.filter !== "none" || e.mask !== "none" || e.mask !== "none" || e.borderRadius !== "0px",
      view: 0 <= t.bottom && 0 <= t.right && t.top <= n.innerHeight && t.left <= n.innerWidth
    };
  }
  function wc(t) {
    var e = t.getBoundingClientRect(), n = getComputedStyle(t);
    return pT(e, n, t);
  }
  function gT(t) {
    return t.documentElement.clientHeight;
  }
  function vT(t) {
    this.addEventListener("load", t), this.addEventListener("error", t);
  }
  function ST(t, e, n, i, s, u, f, m, T) {
    var C = e.nodeType === 9 ? e : e.ownerDocument;
    try {
      var R = C.startViewTransition({
        update: function() {
          var x = C.defaultView, O = x.navigation && x.navigation.transition, K = C.fonts.status;
          i();
          var tt = [];
          if (K === "loaded" && (gT(C), C.fonts.status === "loading" && tt.push(C.fonts.ready)), K = tt.length, t !== null)
            for (var ht = t.suspenseyImages, M = 0, A = 0; A < ht.length; A++) {
              var D = ht[A];
              if (!D.complete) {
                var U = D.getBoundingClientRect();
                if (0 < U.bottom && 0 < U.right && U.top < x.innerHeight && U.left < x.innerWidth) {
                  if (M += _0(D), M > Ou) {
                    tt.length = K;
                    break;
                  }
                  D = new Promise(
                    vT.bind(D)
                  ), tt.push(D);
                }
              }
            }
          if (0 < tt.length)
            return x = Promise.race([
              Promise.all(tt),
              new Promise(function(I) {
                return setTimeout(I, 500);
              })
            ]).then(s, s), (O ? Promise.allSettled([O.finished, x]) : x).then(u, u);
          if (s(), O)
            return O.finished.then(
              u,
              u
            );
          u();
        },
        types: n
      });
      C.__reactViewTransition = R;
      var B = [];
      return R.ready.then(
        function() {
          for (var x = C.documentElement.getAnimations({
            subtree: !0
          }), O = 0; O < x.length; O++) {
            var K = x[O], tt = K.effect, ht = tt.pseudoElement;
            if (ht != null && ht.startsWith("::view-transition")) {
              B.push(K), K = tt.getKeyframes();
              for (var M = ht = void 0, A = !0, D = 0; D < K.length; D++) {
                var U = K[D], I = U.width;
                if (ht === void 0) ht = I;
                else if (ht !== I) {
                  A = !1;
                  break;
                }
                if (I = U.height, M === void 0) M = I;
                else if (M !== I) {
                  A = !1;
                  break;
                }
                delete U.width, delete U.height, U.transform === "none" && delete U.transform;
              }
              A && ht !== void 0 && M !== void 0 && (tt.setKeyframes(K), A = getComputedStyle(
                tt.target,
                tt.pseudoElement
              ), A.width !== ht || A.height !== M) && (A = K[0], A.width = ht, A.height = M, A = K[K.length - 1], A.width = ht, A.height = M, tt.setKeyframes(K));
            }
          }
          f();
        },
        function(x) {
          C.__reactViewTransition === R && (C.__reactViewTransition = null);
          try {
            typeof x == "object" && x !== null && x.name === "InvalidStateError" && (x.message === "View transition was skipped because document visibility state is hidden." || x.message === "Skipping view transition because document visibility state has become hidden." || x.message === "Skipping view transition because viewport size changed." || x.message === "Transition was aborted because of invalid state") && (x = null), x !== null && T(x);
          } finally {
            i(), s(), f();
          }
        }
      ), R.finished.finally(function() {
        for (var x = 0; x < B.length; x++)
          B[x].cancel();
        C.__reactViewTransition === R && (C.__reactViewTransition = null), m();
      }), R;
    } catch {
      return i(), s(), f(), null;
    }
  }
  function Xi(t, e) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + t + "(" + e + ")";
  }
  Xi.prototype.animate = function(t, e) {
    return e = typeof e == "number" ? { duration: e } : J({}, e), e.pseudoElement = this._selector, this._scope.animate(t, e);
  }, Xi.prototype.getAnimations = function() {
    for (var t = this._scope, e = this._selector, n = t.getAnimations({ subtree: !0 }), i = [], s = 0; s < n.length; s++) {
      var u = n[s].effect;
      u !== null && u.target === t && u.pseudoElement === e && i.push(n[s]);
    }
    return i;
  }, Xi.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function h0(t) {
    return {
      name: t,
      group: new Xi("group", t),
      imagePair: new Xi("image-pair", t),
      old: new Xi("old", t),
      new: new Xi("new", t)
    };
  }
  function He(t) {
    this._fragmentFiber = t, this._observers = this._eventListeners = null;
  }
  He.prototype.addEventListener = function(t, e, n) {
    var i = null, s = null;
    if (!(n != null && typeof n != "boolean" && (i = n.signal || null, i !== null && i.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var u = this._eventListeners;
      if (m0(u, t, e, n) === -1) {
        var f = this, m = e;
        n != null && typeof n != "boolean" && n.once === !0 && (m = function(T) {
          f.removeEventListener(
            t,
            e,
            n
          ), typeof e == "function" ? e.call(this, T) : e.handleEvent(T);
        }), i !== null && (s = f.removeEventListener.bind(
          f,
          t,
          e,
          n
        ), i.addEventListener("abort", s, { once: !0 }), s = i.removeEventListener.bind(i, "abort", s)), i = wa(n), u.push({
          type: t,
          listener: e,
          optionsOrUseCapture: n,
          attachedListener: m,
          cleanup: s
        }), p(
          this._fragmentFiber.child,
          !1,
          TT,
          t,
          m,
          i
        );
      }
      this._eventListeners = u;
    }
  };
  function TT(t, e, n, i) {
    return _(t).addEventListener(
      e,
      n,
      i
    ), !1;
  }
  He.prototype.removeEventListener = function(t, e, n) {
    var i = this._eventListeners;
    if (i !== null && (e = m0(
      i,
      t,
      e,
      n
    ), e !== -1)) {
      var s = i[e];
      n = s.attachedListener;
      var u = s.cleanup;
      s = wa(s.optionsOrUseCapture), p(
        this._fragmentFiber.child,
        !1,
        bT,
        t,
        n,
        s
      ), i.splice(e, 1), u !== null && u();
    }
  };
  function bT(t, e, n, i) {
    return _(t).removeEventListener(
      e,
      n,
      i
    ), !1;
  }
  function wa(t) {
    return t != null && typeof t != "boolean" && (t.once === !0 || t.signal instanceof AbortSignal) ? { capture: t.capture, passive: t.passive } : t;
  }
  function d0(t) {
    return t == null ? "c=0" : typeof t == "boolean" ? "c=" + (t ? "1" : "0") : "c=" + (t.capture ? "1" : "0");
  }
  function m0(t, e, n, i) {
    if (t.length === 0) return -1;
    i = d0(i);
    for (var s = 0; s < t.length; s++) {
      var u = t[s];
      if (u.type === e && u.listener === n && d0(u.optionsOrUseCapture) === i)
        return s;
    }
    return -1;
  }
  He.prototype.dispatchEvent = function(t) {
    var e = b(
      this._fragmentFiber
    );
    if (e === null) return !0;
    e = _(e);
    var n = this._eventListeners;
    if (n !== null && 0 < n.length || !t.bubbles) {
      var i = e.nodeType === 9 ? e.createComment("") : document.createTextNode("");
      if (n)
        for (var s = 0; s < n.length; s++) {
          var u = n[s];
          i.addEventListener(
            u.type,
            u.attachedListener,
            wa(u.optionsOrUseCapture)
          );
        }
      if (e.appendChild(i), t = i.dispatchEvent(t), n)
        for (s = 0; s < n.length; s++)
          u = n[s], i.removeEventListener(
            u.type,
            u.attachedListener,
            wa(u.optionsOrUseCapture)
          );
      return e.removeChild(i), t;
    }
    return e.dispatchEvent(t);
  }, He.prototype.focus = function(t) {
    p(
      this._fragmentFiber.child,
      !0,
      y0,
      t,
      void 0,
      void 0
    );
  };
  function y0(t, e) {
    return t.tag === 6 ? !1 : (t = _(t), VT(t, e));
  }
  He.prototype.focusLast = function(t) {
    var e = [];
    p(
      this._fragmentFiber.child,
      !0,
      Uc,
      e,
      void 0,
      void 0
    );
    for (var n = e.length - 1; 0 <= n && !y0(e[n], t); n--) ;
  };
  function Uc(t, e) {
    return e.push(t), !1;
  }
  He.prototype.blur = function() {
    var t = b(
      this._fragmentFiber
    );
    t !== null && (t = _(t), t = jl(t).activeElement, t !== null && p(
      this._fragmentFiber.child,
      !1,
      ET,
      t,
      void 0,
      void 0
    ));
  };
  function ET(t, e) {
    return t.tag === 6 ? !1 : (t = _(t), t === e || t.contains(e) ? (e.blur(), !0) : !1);
  }
  He.prototype.observeUsing = function(t) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(t), p(
      this._fragmentFiber.child,
      !1,
      AT,
      t,
      void 0,
      void 0
    );
  };
  function AT(t, e) {
    return t.tag === 6 || (t = _(t), e.observe(t)), !1;
  }
  He.prototype.unobserveUsing = function(t) {
    var e = this._observers;
    if (e !== null && e.has(t)) {
      e.delete(t), p(
        this._fragmentFiber.child,
        !1,
        xT,
        t,
        void 0,
        void 0
      );
      for (var n = e = 0; n < an.length; n++) {
        var i = an[n];
        i.fragmentInstance === this && i.observer === t ? t.unobserve(i.instance) : an[e++] = i;
      }
      an.length = e;
    }
  };
  function xT(t, e) {
    return t.tag === 6 || (t = _(t), e.unobserve(t)), !1;
  }
  var an = [], Bc = !1;
  function MT(t, e, n) {
    an.push({
      fragmentInstance: t,
      observer: e,
      instance: n
    }), Bc || (Bc = !0, wT(function() {
      Bc = !1;
      var i = an;
      an = [];
      for (var s = 0; s < i.length; s++) {
        var u = i[s];
        u.observer.unobserve(u.instance);
      }
    }));
  }
  He.prototype.getClientRects = function() {
    var t = [];
    return p(
      this._fragmentFiber.child,
      !1,
      CT,
      t,
      void 0,
      void 0
    ), t;
  };
  function CT(t, e) {
    if (t.tag === 6) {
      t = t.stateNode;
      var n = t.ownerDocument.createRange();
      n.selectNodeContents(t), e.push.apply(e, n.getClientRects());
    } else
      t = _(t), e.push.apply(e, t.getClientRects());
    return !1;
  }
  He.prototype.getRootNode = function(t) {
    var e = b(
      this._fragmentFiber
    );
    return e === null ? this : _(e).getRootNode(t);
  }, He.prototype.compareDocumentPosition = function(t) {
    var e = b(
      this._fragmentFiber
    );
    if (e === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var n = [];
    p(
      this._fragmentFiber.child,
      !1,
      Uc,
      n,
      void 0,
      void 0
    );
    var i = _(e);
    if (n.length === 0) {
      if (n = i, N(this._fragmentFiber)) {
        t: {
          for (e = this._fragmentFiber.return; e !== null; ) {
            if (e.tag === 4) {
              e = e.stateNode.containerInfo;
              break t;
            }
            if (e.tag === 3 || e.tag === 5 || e.tag === 27)
              break;
            e = e.return;
          }
          e = null;
        }
        e != null && (n = e);
      }
      e = this._fragmentFiber;
      var s = i = n.compareDocumentPosition(t);
      return n === t ? s = Node.DOCUMENT_POSITION_CONTAINS : i & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = z(e)[1], n === null ? s = Node.DOCUMENT_POSITION_PRECEDING : (t = _(n).compareDocumentPosition(
        t
      ), s = t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), s |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    e = _(n[0]), s = _(n[n.length - 1]);
    var u = N(this._fragmentFiber) ? e.parentElement : i;
    if (u == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    i = u.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY, u = u.compareDocumentPosition(s) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var f = e.compareDocumentPosition(t), m = s.compareDocumentPosition(t), T = f & Node.DOCUMENT_POSITION_CONTAINED_BY || m & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return m = i && u && f & Node.DOCUMENT_POSITION_FOLLOWING && m & Node.DOCUMENT_POSITION_PRECEDING, e = i && e === t || u && s === t || T || m ? Node.DOCUMENT_POSITION_CONTAINED_BY : !i && e === t || !u && s === t ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : f, e & Node.DOCUMENT_POSITION_DISCONNECTED || e & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || DT(
      e,
      this._fragmentFiber,
      n[0],
      n[n.length - 1],
      t
    ) ? e : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function DT(t, e, n, i, s) {
    var u = Ei(s);
    if (t & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (n = !!u)
        t: {
          for (; u !== null; ) {
            if (u.tag === 7 && (u === e || u.alternate === e)) {
              n = !0;
              break t;
            }
            u = u.return;
          }
          n = !1;
        }
      return n;
    }
    if (t & Node.DOCUMENT_POSITION_CONTAINS) {
      if (u === null)
        return u = s.ownerDocument, s === u || s === u.documentElement || s === u.body;
      t: {
        for (u = e, e = b(e); u !== null; ) {
          if (!(u.tag !== 5 && u.tag !== 3 && u.tag !== 27 || u !== e && u.alternate !== e)) {
            u = !0;
            break t;
          }
          u = u.return;
        }
        u = !1;
      }
      return u;
    }
    return t & Node.DOCUMENT_POSITION_PRECEDING ? ((e = !!u) && !(e = u === n) && (e = st(
      n,
      u,
      k
    ), e === null ? e = !1 : (p(
      e,
      !0,
      X,
      u,
      n
    ), u = H, H = null, e = u !== null)), e) : t & Node.DOCUMENT_POSITION_FOLLOWING ? ((e = !!u) && !(e = u === i) && (e = st(
      i,
      u,
      k
    ), e === null ? e = !1 : (p(
      e,
      !0,
      L,
      u,
      i
    ), u = H, G = H = null, e = u !== null)), e) : !1;
  }
  function p0(t, e) {
    var n = t.ownerDocument.createRange();
    n.selectNodeContents(t), t = n.getBoundingClientRect(), window.scrollTo(
      window.scrollX + t.left,
      e ? window.scrollY + t.top : window.scrollY + t.bottom - window.innerHeight
    );
  }
  He.prototype.scrollIntoView = function(t) {
    if (typeof t == "object") throw Error(r(566));
    var e = [];
    p(
      this._fragmentFiber.child,
      !1,
      Uc,
      e,
      void 0,
      void 0
    );
    var n = t !== !1;
    if (e.length === 0) {
      var i = z(
        this._fragmentFiber
      );
      if (i = n ? i[1] || i[0] || b(this._fragmentFiber) : i[0] || i[1], i === null) return;
      if (i.tag === 6) {
        t = _(i), p0(t, n);
        return;
      }
      if (i = _(i), i.nodeType !== 9) {
        if (i.nodeType === 11) {
          n = "host" in i ? i.host : null, n !== null && n.scrollIntoView(t);
          return;
        }
        i.scrollIntoView(t);
      }
    }
    for (i = n ? e.length - 1 : 0; i !== (n ? -1 : e.length); ) {
      var s = e[i];
      s.tag === 6 ? (s = _(s), p0(s, n)) : _(s).scrollIntoView(t), i += n ? -1 : 1;
    }
  };
  function zT(t, e) {
    return t = _(t), g0(t, e), !1;
  }
  function g0(t, e) {
    t.reactFragments == null && (t.reactFragments = /* @__PURE__ */ new Set()), t.reactFragments.add(e);
  }
  function v0(t, e) {
    var n = e._eventListeners;
    if (n !== null)
      for (var i = 0; i < n.length; i++) {
        var s = n[i];
        t.addEventListener(
          s.type,
          s.attachedListener,
          wa(s.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (n = e._observers, n !== null && n.forEach(function(u) {
      for (var f = 0, m = 0; m < an.length; m++) {
        var T = an[m];
        (T.fragmentInstance !== e || T.observer !== u || T.instance !== t) && (an[f++] = T);
      }
      an.length = f, u.observe(t);
    }), g0(t, e));
  }
  function OT(t, e) {
    var n = e._eventListeners;
    if (n !== null)
      for (var i = 0; i < n.length; i++) {
        var s = n[i];
        t.removeEventListener(
          s.type,
          s.attachedListener,
          wa(s.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (n = e._observers, n !== null && n.forEach(function(u) {
      typeof u.rootMargin == "string" ? MT(
        e,
        u,
        t
      ) : u.unobserve(t);
    }), t.reactFragments != null && t.reactFragments.delete(e));
  }
  function jc(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var n = e;
      switch (e = e.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          jc(n), gs(n);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(n);
    }
  }
  function RT(t, e, n, i) {
    for (; t.nodeType === 1; ) {
      var s = n;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!i && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (i) {
        if (!t[el])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (u = t.getAttribute("rel"), u === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (u !== s.rel || t.getAttribute("href") !== (s.href == null || s.href === "" ? null : s.href) || t.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin) || t.getAttribute("title") !== (s.title == null ? null : s.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (u = t.getAttribute("src"), (u !== (s.src == null ? null : s.src) || t.getAttribute("type") !== (s.type == null ? null : s.type) || t.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin)) && u && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var u = s.name == null ? null : "" + s.name;
        if (s.type === "hidden" && t.getAttribute("name") === u)
          return t;
      } else return t;
      if (t = Fe(t.nextSibling), t === null) break;
    }
    return null;
  }
  function NT(t, e, n) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = Fe(t.nextSibling), t === null)) return null;
    return t;
  }
  function S0(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Fe(t.nextSibling), t === null)) return null;
    return t;
  }
  function Lc(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Hc(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function _T(t, e) {
    var n = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = e;
    else if (t.data !== "$?" || n.readyState !== "loading")
      e();
    else {
      var i = function() {
        e(), n.removeEventListener("DOMContentLoaded", i);
      };
      n.addEventListener("DOMContentLoaded", i), t._reactRetry = i;
    }
  }
  function Fe(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (e = t.data, e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&" || e === "F!" || e === "F")
          break;
        if (e === "/$" || e === "/&") return null;
      }
    }
    return t;
  }
  var Yc = null;
  function T0(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var n = t.data;
        if (n === "/$" || n === "/&") {
          if (e === 0)
            return Fe(t.nextSibling);
          e--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function b0(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var n = t.data;
        if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
          if (e === 0) return t;
          e--;
        } else n !== "/$" && n !== "/&" || e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function VT(t, e) {
    function n() {
      i = !0;
    }
    if (t.ownerDocument.activeElement === t) return !0;
    var i = !1;
    try {
      t.ownerDocument.addEventListener("focus", n, !0), (t.focus || HTMLElement.prototype.focus).call(t, e);
    } finally {
      t.ownerDocument.removeEventListener("focus", n, !0);
    }
    return i;
  }
  function wT(t) {
    u0(function() {
      u0(function(e) {
        return t(e);
      });
    });
  }
  function E0(t, e, n) {
    switch (e = jl(n), t) {
      case "html":
        if (t = e.documentElement, !t) throw Error(r(452));
        return t;
      case "head":
        if (t = e.head, !t) throw Error(r(453));
        return t;
      case "body":
        if (t = e.body, !t) throw Error(r(454));
        return t;
      default:
        throw Error(r(451));
    }
  }
  function A0(t, e, n) {
    for (var i in n) {
      var s = n[i];
      n.hasOwnProperty(i) && s != null && Nt(t, e, i, null, rT, s);
    }
    n.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === cn && (t.onclick = null), gs(t);
  }
  function qc(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    gs(t);
  }
  var ke = /* @__PURE__ */ new Map(), x0 = /* @__PURE__ */ new Set();
  function Ll(t) {
    if (typeof t.getRootNode == "function") {
      var e = t.getRootNode();
      if (e.nodeType === 9 || e.nodeType === 11) return e;
    }
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Yn = rt.d;
  rt.d = {
    f: UT,
    r: BT,
    D: jT,
    C: LT,
    L: HT,
    m: YT,
    X: GT,
    S: qT,
    M: XT
  };
  function UT() {
    var t = Yn.f(), e = Tu();
    return t || e;
  }
  function BT(t) {
    var e = $i(t);
    e !== null && e.tag === 5 && e.type === "form" ? Cm(e) : Yn.r(t);
  }
  var Ua = typeof document > "u" ? null : document;
  function M0(t, e, n) {
    var i = Ua;
    if (i && typeof e == "string" && e) {
      var s = qe(e);
      s = 'link[rel="' + t + '"][href="' + s + '"]', typeof n == "string" && (s += '[crossorigin="' + n + '"]'), x0.has(s) || (x0.add(s), t = { rel: t, crossOrigin: n, href: e }, i.querySelector(s) === null && (e = i.createElement("link"), fe(e, "link", t), ee(e), i.head.appendChild(e)));
    }
  }
  function jT(t) {
    Yn.D(t), M0("dns-prefetch", t, null);
  }
  function LT(t, e) {
    Yn.C(t, e), M0("preconnect", t, e);
  }
  function HT(t, e, n) {
    Yn.L(t, e, n);
    var i = Ua;
    if (i && t && e) {
      var s = 'link[rel="preload"][as="' + qe(e) + '"]';
      e === "image" && n && n.imageSrcSet ? (s += '[imagesrcset="' + qe(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (s += '[imagesizes="' + qe(
        n.imageSizes
      ) + '"]')) : s += '[href="' + qe(t) + '"]';
      var u = s;
      switch (e) {
        case "style":
          u = Ba(t);
          break;
        case "script":
          u = ja(t);
      }
      if (!(ke.has(u) || (t = J(
        {
          rel: "preload",
          href: e === "image" && n && n.imageSrcSet ? void 0 : t,
          as: e
        },
        n
      ), ke.set(u, t), i.querySelector(s) !== null || e === "style" && i.querySelector(Hl(u)) || e === "script" && i.querySelector(Yl(u))))) {
        var f = i.createElement("link");
        fe(f, "link", t), e === "style" && (f[ps] = !0, f.onload = f.onerror = function() {
          Lh(f);
        }), ee(f), i.head.appendChild(f);
      }
    }
  }
  function YT(t, e) {
    Yn.m(t, e);
    var n = Ua;
    if (n && t) {
      var i = e && typeof e.as == "string" ? e.as : "script", s = 'link[rel="modulepreload"][as="' + qe(i) + '"][href="' + qe(t) + '"]', u = s;
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = ja(t);
      }
      if (!ke.has(u) && (t = J({ rel: "modulepreload", href: t }, e), ke.set(u, t), n.querySelector(s) === null)) {
        switch (i) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(Yl(u)))
              return;
        }
        i = n.createElement("link"), fe(i, "link", t), ee(i), n.head.appendChild(i);
      }
    }
  }
  function qT(t, e, n) {
    Yn.S(t, e, n);
    var i = Ua;
    if (i && t) {
      var s = ta(i).hoistableStyles, u = Ba(t);
      e = e || "default";
      var f = s.get(u);
      if (!f) {
        var m = { loading: 0, preload: null };
        if (f = i.querySelector(
          Hl(u)
        ))
          m.loading = 5;
        else {
          t = J(
            { rel: "stylesheet", href: t, "data-precedence": e },
            n
          ), (n = ke.get(u)) && Gc(t, n);
          var T = f = i.createElement("link");
          ee(T), fe(T, "link", t), T._p = new Promise(function(C, R) {
            T.onload = C, T.onerror = R;
          }), T.addEventListener("load", function() {
            m.loading |= 1;
          }), T.addEventListener("error", function() {
            m.loading |= 2;
          }), m.loading |= 4, Du(f, e, i);
        }
        f = {
          type: "stylesheet",
          instance: f,
          count: 1,
          state: m
        }, s.set(u, f);
      }
    }
  }
  function GT(t, e) {
    Yn.X(t, e);
    var n = Ua;
    if (n && t) {
      var i = ta(n).hoistableScripts, s = ja(t), u = i.get(s);
      u || (u = n.querySelector(Yl(s)), u || (t = J({ src: t, async: !0 }, e), (e = ke.get(s)) && Xc(t, e), u = n.createElement("script"), ee(u), fe(u, "link", t), n.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, i.set(s, u));
    }
  }
  function XT(t, e) {
    Yn.M(t, e);
    var n = Ua;
    if (n && t) {
      var i = ta(n).hoistableScripts, s = ja(t), u = i.get(s);
      u || (u = n.querySelector(Yl(s)), u || (t = J({ src: t, async: !0, type: "module" }, e), (e = ke.get(s)) && Xc(t, e), u = n.createElement("script"), ee(u), fe(u, "link", t), n.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, i.set(s, u));
    }
  }
  function C0(t, e, n, i) {
    var s = (s = Gn.current) ? Ll(s) : null;
    if (!s) throw Error(r(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (n = Ba(n.href), e = ta(
          s
        ).hoistableStyles, i = e.get(n), i || (i = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(n, i)), i) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          t = Ba(n.href);
          var u = ta(
            s
          ).hoistableStyles, f = u.get(t);
          if (f || (s = s.ownerDocument || s, f = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, f), (u = s.querySelector(
            Hl(t)
          )) ? u._p || (f.instance = u, f.state.loading = 5) : (u = ke.get(t), u || (u = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, ke.set(t, u)), QT(
            s,
            t,
            u,
            f.state
          ))), e && i === null)
            throw Error(r(528, ""));
          return f;
        }
        if (e && i !== null)
          throw Error(r(529, ""));
        return null;
      case "script":
        return e = n.async, n = n.src, typeof n == "string" && e && typeof e != "function" && typeof e != "symbol" ? (n = ja(n), e = ta(
          s
        ).hoistableScripts, i = e.get(n), i || (i = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(n, i)), i) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(r(444, t));
    }
  }
  function Ba(t) {
    return 'href="' + qe(t) + '"';
  }
  function Hl(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function D0(t) {
    return J({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function QT(t, e, n, i) {
    if (e = t.querySelector(
      'link[rel="preload"][as="style"][' + e + "]"
    )) {
      if (e[ps] !== !0) {
        i.loading = 1;
        return;
      }
    } else
      e = t.createElement("link"), e[ps] = !0, e.onload = e.onerror = Lh.bind(null, e), fe(e, "link", n), ee(e), t.head.appendChild(e);
    i.preload = e, e.addEventListener("load", function() {
      return i.loading |= 1;
    }), e.addEventListener("error", function() {
      return i.loading |= 2;
    });
  }
  function ja(t) {
    return '[src="' + qe(t) + '"]';
  }
  function Yl(t) {
    return "script[async]" + t;
  }
  function z0(t, e, n) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var i = t.querySelector(
            'style[data-href~="' + qe(n.href) + '"]'
          );
          if (i)
            return e.instance = i, ee(i), i;
          var s = J({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return i = (t.ownerDocument || t).createElement(
            "style"
          ), ee(i), fe(i, "style", s), Du(i, n.precedence, t), e.instance = i;
        case "stylesheet":
          s = Ba(n.href);
          var u = t.querySelector(
            Hl(s)
          );
          if (u)
            return e.state.loading |= 4, e.instance = u, ee(u), u;
          i = D0(n), (s = ke.get(s)) && Gc(i, s), u = (t.ownerDocument || t).createElement("link"), ee(u);
          var f = u;
          return f._p = new Promise(function(m, T) {
            f.onload = m, f.onerror = T;
          }), fe(u, "link", i), e.state.loading |= 4, Du(u, n.precedence, t), e.instance = u;
        case "script":
          return u = ja(n.src), (s = t.querySelector(
            Yl(u)
          )) ? (e.instance = s, ee(s), s) : (i = n, (s = ke.get(u)) && (i = J({}, n), Xc(i, s)), t = t.ownerDocument || t, s = t.createElement("script"), ee(s), fe(s, "link", i), t.head.appendChild(s), e.instance = s);
        case "void":
          return null;
        default:
          throw Error(r(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (i = e.instance, e.state.loading |= 4, Du(i, n.precedence, t));
    return e.instance;
  }
  function Du(t, e, n) {
    for (var i = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), s = i.length ? i[i.length - 1] : null, u = s, f = 0; f < i.length; f++) {
      var m = i[f];
      if (m.dataset.precedence === e) u = m;
      else if (u !== s) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (e = n.nodeType === 9 ? n.head : n, e.insertBefore(t, e.firstChild));
  }
  function Gc(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function Xc(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var zu = null;
  function O0(t, e, n) {
    if (zu === null) {
      var i = /* @__PURE__ */ new Map(), s = zu = /* @__PURE__ */ new Map();
      s.set(n, i);
    } else
      s = zu, i = s.get(n), i || (i = /* @__PURE__ */ new Map(), s.set(n, i));
    if (i.has(t)) return i;
    for (i.set(t, null), n = n.getElementsByTagName(t), s = 0; s < n.length; s++) {
      var u = n[s];
      if (!(u[el] || u[se] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var f = u.getAttribute(e) || "";
        f = t + f;
        var m = i.get(f);
        m ? m.push(u) : i.set(f, [u]);
      }
    }
    return i;
  }
  function Qc(t, e, n) {
    t = t.ownerDocument || t, t.head.insertBefore(
      n,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function ZT(t, e, n) {
    if (n === 1 || e.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "")
          break;
        return !0;
      case "link":
        if (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" || e.onLoad || e.onError)
          break;
        return e.rel === "stylesheet" ? (t = e.disabled, typeof e.precedence == "string" && t == null) : !0;
      case "script":
        if (e.async && typeof e.async != "function" && typeof e.async != "symbol" && !e.onLoad && !e.onError && e.src && typeof e.src == "string")
          return !0;
    }
    return !1;
  }
  function R0(t, e) {
    return t === "img" && e.src != null && e.src !== "" && e.onLoad == null && e.loading !== "lazy";
  }
  function N0(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function _0(t) {
    return (t.width || 100) * (t.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function V0(t, e) {
    typeof e.decode == "function" && (t.imgCount++, e.complete || (t.imgBytes += _0(e), t.suspenseyImages.push(e)), t = FT.bind(t), e.decode().then(t, t));
  }
  function KT(t, e, n, i) {
    if (n.type === "stylesheet" && (typeof i.media != "string" || matchMedia(i.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var s = Ba(i.href), u = e.querySelector(
          Hl(s)
        );
        if (u) {
          e = u._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = ql.bind(t), e.then(t, t)), n.state.loading |= 4, n.instance = u, ee(u);
          return;
        }
        u = e.ownerDocument || e, i = D0(i), (s = ke.get(s)) && Gc(i, s), u = u.createElement("link"), ee(u);
        var f = u;
        f._p = new Promise(function(m, T) {
          f.onload = m, f.onerror = T;
        }), fe(u, "link", i), n.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(n, e), (e = n.state.preload) && (n.state.loading & 3) === 0 && (t.count++, n = ql.bind(t), e.addEventListener("load", n), e.addEventListener("error", n));
    }
  }
  var Ou = 0;
  function JT(t, e) {
    return t.stylesheets && t.count === 0 && Nu(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(n) {
      var i = setTimeout(function() {
        if (t.stylesheets && Nu(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + e);
      0 < t.imgBytes && Ou === 0 && (Ou = 62500 * fT());
      var s = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Nu(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > Ou ? 50 : 800) + e
      );
      return t.unsuspend = n, function() {
        t.unsuspend = null, clearTimeout(i), clearTimeout(s);
      };
    } : null;
  }
  function w0(t) {
    if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
      if (t.stylesheets) Nu(t, t.stylesheets);
      else if (t.unsuspend) {
        var e = t.unsuspend;
        t.unsuspend = null, e();
      }
    }
  }
  function ql() {
    this.count--, w0(this);
  }
  function FT() {
    this.imgCount--, w0(this);
  }
  var Ru = null;
  function Nu(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Ru = /* @__PURE__ */ new Map(), e.forEach(kT, t), Ru = null, ql.call(t));
  }
  function kT(t, e) {
    if (!(e.state.loading & 4)) {
      var n = Ru.get(t);
      if (n) var i = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), Ru.set(t, n);
        for (var s = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < s.length; u++) {
          var f = s[u];
          (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") && (n.set(f.dataset.precedence, f), i = f);
        }
        i && n.set(null, i);
      }
      s = e.instance, f = s.getAttribute("data-precedence"), u = n.get(f) || i, u === i && n.set(null, s), n.set(f, s), this.count++, i = ql.bind(this), s.addEventListener("load", i), s.addEventListener("error", i), u ? u.parentNode.insertBefore(s, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(s, t.firstChild)), e.state.loading |= 4;
    }
  }
  var La = {
    $$typeof: Ct,
    Provider: null,
    Consumer: null,
    _currentValue: Mn,
    _currentValue2: Mn,
    _threadCount: 0
  };
  function PT(t, e, n, i, s, u, f, m, T) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = xo(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = xo(0), this.hiddenUpdates = xo(null), this.identifierPrefix = i, this.onUncaughtError = s, this.onCaughtError = u, this.onRecoverableError = f, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = T, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function U0(t, e, n, i, s, u, f, m, T, C, R, B) {
    return t = new PT(
      t,
      e,
      n,
      f,
      T,
      C,
      R,
      B,
      m
    ), e = 1, u === !0 && (e |= 24), u = Ae(3, null, null, e), t.current = u, u.stateNode = t, e = lr(), e.refCount++, t.pooledCache = e, e.refCount++, u.memoizedState = {
      element: i,
      isDehydrated: n,
      cache: e
    }, rr(u), t;
  }
  function B0(t) {
    return t ? (t = ca, t) : ca;
  }
  function j0(t, e, n, i, s, u) {
    s = B0(s), i.context === null ? i.context = s : i.pendingContext = s, i = $n(e), i.payload = { element: n }, u = u === void 0 ? null : u, u !== null && (i.callback = u), n = ti(t, i, e), n !== null && (De(n, t, e), vl(n, t, e));
  }
  function L0(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var n = t.retryLane;
      t.retryLane = n !== 0 && n < e ? n : e;
    }
  }
  function Zc(t, e) {
    L0(t, e), (t = t.alternate) && L0(t, e);
  }
  function H0(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Ci(t, 67108864);
      e !== null && De(e, t, 67108864), Zc(t, 67108864);
    }
  }
  function Y0(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Le();
      e = Mo(e);
      var n = Ci(t, e);
      n !== null && De(n, t, e), Zc(t, e);
    }
  }
  var Ha = !0;
  function IT(t, e, n, i) {
    var s = nt.T;
    nt.T = null;
    var u = rt.p;
    try {
      rt.p = 2, Kc(t, e, n, i);
    } finally {
      rt.p = u, nt.T = s;
    }
  }
  function WT(t, e, n, i) {
    var s = nt.T;
    nt.T = null;
    var u = rt.p;
    try {
      rt.p = 8, Kc(t, e, n, i);
    } finally {
      rt.p = u, nt.T = s;
    }
  }
  function Kc(t, e, n, i) {
    if (Ha) {
      var s = Jc(i);
      if (s === null)
        Dc(
          t,
          e,
          i,
          _u,
          n
        ), G0(t, i);
      else if (tb(
        s,
        t,
        e,
        n,
        i
      ))
        i.stopPropagation();
      else if (G0(t, i), e & 4 && -1 < $T.indexOf(t)) {
        for (; s !== null; ) {
          var u = $i(s);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var f = bi(u.pendingLanes);
                  if (f !== 0) {
                    var m = u;
                    for (m.pendingLanes |= 2, m.entangledLanes |= 2; f; ) {
                      var T = 1 << 31 - Ne(f);
                      m.entanglements[1] |= T, f &= ~T;
                    }
                    Tn(u), (Mt & 6) === 0 && (gu = Oe() + 500, wl(0));
                  }
                }
                break;
              case 31:
              case 13:
                m = Ci(u, 2), m !== null && De(m, u, 2), Tu(), Zc(u, 2);
            }
          if (u = Jc(i), u === null && Dc(
            t,
            e,
            i,
            _u,
            n
          ), u === s) break;
          s = u;
        }
        s !== null && i.stopPropagation();
      } else
        Dc(
          t,
          e,
          i,
          null,
          n
        );
    }
  }
  function Jc(t) {
    return t = _o(t), Fc(t);
  }
  var _u = null;
  function Fc(t) {
    if (_u = null, t = Ei(t), t !== null) {
      var e = d(t);
      if (e === null) t = null;
      else {
        var n = e.tag;
        if (n === 13) {
          if (t = h(e), t !== null) return t;
          t = null;
        } else if (n === 31) {
          if (t = y(e), t !== null) return t;
          t = null;
        } else if (n === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return _u = t, null;
  }
  function q0(t) {
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
        switch (f1()) {
          case Ch:
            return 2;
          case Dh:
            return 8;
          case fs:
          case h1:
            return 32;
          case zh:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var kc = !1, hi = null, di = null, mi = null, Gl = /* @__PURE__ */ new Map(), Xl = /* @__PURE__ */ new Map(), yi = [], $T = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function G0(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        hi = null;
        break;
      case "dragenter":
      case "dragleave":
        di = null;
        break;
      case "mouseover":
      case "mouseout":
        mi = null;
        break;
      case "pointerover":
      case "pointerout":
        Gl.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Xl.delete(e.pointerId);
    }
  }
  function Ql(t, e, n, i, s, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: e,
      domEventName: n,
      eventSystemFlags: i,
      nativeEvent: u,
      targetContainers: [s]
    }, e !== null && (e = $i(e), e !== null && H0(e)), t) : (t.eventSystemFlags |= i, e = t.targetContainers, s !== null && e.indexOf(s) === -1 && e.push(s), t);
  }
  function tb(t, e, n, i, s) {
    switch (e) {
      case "focusin":
        return hi = Ql(
          hi,
          t,
          e,
          n,
          i,
          s
        ), !0;
      case "dragenter":
        return di = Ql(
          di,
          t,
          e,
          n,
          i,
          s
        ), !0;
      case "mouseover":
        return mi = Ql(
          mi,
          t,
          e,
          n,
          i,
          s
        ), !0;
      case "pointerover":
        var u = s.pointerId;
        return Gl.set(
          u,
          Ql(
            Gl.get(u) || null,
            t,
            e,
            n,
            i,
            s
          )
        ), !0;
      case "gotpointercapture":
        return u = s.pointerId, Xl.set(
          u,
          Ql(
            Xl.get(u) || null,
            t,
            e,
            n,
            i,
            s
          )
        ), !0;
    }
    return !1;
  }
  function X0(t) {
    var e = Ei(t.target);
    if (e !== null) {
      var n = d(e);
      if (n !== null) {
        if (e = n.tag, e === 13) {
          if (e = h(n), e !== null) {
            t.blockedOn = e, Uh(t.priority, function() {
              Y0(n);
            });
            return;
          }
        } else if (e === 31) {
          if (e = y(n), e !== null) {
            t.blockedOn = e, Uh(t.priority, function() {
              Y0(n);
            });
            return;
          }
        } else if (e === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Vu(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var n = Jc(t.nativeEvent);
      if (n === null) {
        n = t.nativeEvent;
        var i = new n.constructor(
          n.type,
          n
        );
        No = i, n.target.dispatchEvent(i), No = null;
      } else
        return e = $i(n), e !== null && H0(e), t.blockedOn = n, !1;
      e.shift();
    }
    return !0;
  }
  function Q0(t, e, n) {
    Vu(t) && n.delete(e);
  }
  function eb() {
    kc = !1, hi !== null && Vu(hi) && (hi = null), di !== null && Vu(di) && (di = null), mi !== null && Vu(mi) && (mi = null), Gl.forEach(Q0), Xl.forEach(Q0);
  }
  function wu(t, e) {
    t.blockedOn === e && (t.blockedOn = null, kc || (kc = !0, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      eb
    )));
  }
  var Uu = null;
  function Z0(t) {
    Uu !== t && (Uu = t, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      function() {
        Uu === t && (Uu = null);
        for (var e = 0; e < t.length; e += 3) {
          var n = t[e], i = t[e + 1], s = t[e + 2];
          if (typeof i != "function") {
            if (Fc(i || n) === null)
              continue;
            break;
          }
          var u = $i(n);
          u !== null && (t.splice(e, 3), e -= 3, Rr(
            u,
            {
              pending: !0,
              data: s,
              method: n.method,
              action: i
            },
            i,
            s
          ));
        }
      }
    ));
  }
  function Ya(t) {
    function e(T) {
      return wu(T, t);
    }
    hi !== null && wu(hi, t), di !== null && wu(di, t), mi !== null && wu(mi, t), Gl.forEach(e), Xl.forEach(e);
    for (var n = 0; n < yi.length; n++) {
      var i = yi[n];
      i.blockedOn === t && (i.blockedOn = null);
    }
    for (; 0 < yi.length && (n = yi[0], n.blockedOn === null); )
      X0(n), n.blockedOn === null && yi.shift();
    if (n = (t.ownerDocument || t).$$reactFormReplay, n != null)
      for (i = 0; i < n.length; i += 3) {
        var s = n[i], u = n[i + 1], f = s[Ee] || null;
        if (typeof u == "function")
          f || Z0(n);
        else if (f) {
          var m = null;
          if (u && u.hasAttribute("formAction")) {
            if (s = u, f = u[Ee] || null)
              m = f.formAction;
            else if (Fc(s) !== null) continue;
          } else m = f.action;
          typeof m == "function" ? n[i + 1] = m : (n.splice(i, 3), i -= 3), Z0(n);
        }
      }
  }
  function K0() {
    function t(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(f) {
            return s = f;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function e() {
      s !== null && (s(), s = null), i || setTimeout(n, 20);
    }
    function n() {
      if (!i && !navigation.transition) {
        var u = navigation.currentEntry;
        u && u.url != null && navigation.navigate(u.url, {
          state: u.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var i = !1, s = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", e), navigation.addEventListener("navigateerror", e), setTimeout(n, 100), function() {
        i = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", e), navigation.removeEventListener("navigateerror", e), s !== null && (s(), s = null);
      };
    }
  }
  function Pc(t) {
    this._internalRoot = t;
  }
  Bu.prototype.render = Pc.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(r(409));
    var n = e.current, i = Le();
    j0(n, i, t, e, null, null);
  }, Bu.prototype.unmount = Pc.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      j0(t.current, 2, null, t, null, null), Tu(), e[Wi] = null;
    }
  };
  function Bu(t) {
    this._internalRoot = t;
  }
  Bu.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = wh();
      t = { blockedOn: null, target: t, priority: e };
      for (var n = 0; n < yi.length && e !== 0 && e < yi[n].priority; n++) ;
      yi.splice(n, 0, t), n === 0 && X0(t);
    }
  };
  var J0 = l.version;
  if (J0 !== "19.3.0")
    throw Error(
      r(
        527,
        J0,
        "19.3.0"
      )
    );
  rt.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(r(188)) : (t = Object.keys(t).join(","), Error(r(268, t)));
    return t = v(e), t = t !== null ? g(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var nb = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: nt,
    reconcilerVersion: "19.3.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ju = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ju.isDisabled && ju.supportsFiber)
      try {
        Wa = ju.inject(
          nb
        ), Re = ju;
      } catch {
      }
  }
  return Kl.createRoot = function(t, e) {
    if (!c(t)) throw Error(r(299));
    var n = !1, i = "", s = Bm, u = jm, f = Lm;
    return e != null && (e.unstable_strictMode === !0 && (n = !0), e.identifierPrefix !== void 0 && (i = e.identifierPrefix), e.onUncaughtError !== void 0 && (s = e.onUncaughtError), e.onCaughtError !== void 0 && (u = e.onCaughtError), e.onRecoverableError !== void 0 && (f = e.onRecoverableError)), e = U0(
      t,
      1,
      !1,
      null,
      null,
      n,
      i,
      null,
      s,
      u,
      f,
      K0
    ), t[Wi] = e.current, Cc(t), new Pc(e);
  }, Kl.hydrateRoot = function(t, e, n) {
    if (!c(t)) throw Error(r(299));
    var i = !1, s = "", u = Bm, f = jm, m = Lm, T = null;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (s = n.identifierPrefix), n.onUncaughtError !== void 0 && (u = n.onUncaughtError), n.onCaughtError !== void 0 && (f = n.onCaughtError), n.onRecoverableError !== void 0 && (m = n.onRecoverableError), n.formState !== void 0 && (T = n.formState)), e = U0(
      t,
      1,
      !0,
      e,
      n ?? null,
      i,
      s,
      T,
      u,
      f,
      m,
      K0
    ), e.context = B0(null), n = e.current, i = Le(), i = Mo(i), s = $n(i), s.callback = null, ti(n, s, i), n = i, e.current.lanes = n, tl(e, n), Tn(e), t[Wi] = e.current, Cc(t), new Bu(e);
  }, Kl.version = "19.3.0", Kl;
}
var ip;
function fb() {
  if (ip) return $c.exports;
  ip = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (l) {
        console.error(l);
      }
  }
  return a(), $c.exports = cb(), $c.exports;
}
var hb = fb();
const Ff = q.createContext({});
function kf(a) {
  const l = q.useRef(null);
  return l.current === null && (l.current = a()), l.current;
}
const db = typeof window < "u", Pf = db ? q.useLayoutEffect : q.useEffect, ro = /* @__PURE__ */ q.createContext(null);
function If(a, l) {
  a.indexOf(l) === -1 && a.push(l);
}
function Wu(a, l) {
  const o = a.indexOf(l);
  o > -1 && a.splice(o, 1);
}
const xn = (a, l, o) => o > l ? l : o < a ? a : o;
let co = () => {
};
const vi = {}, Ag = (a) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(a), xg = (a) => typeof a == "object" && a !== null, Mg = (a) => /^0[^.\s]+$/u.test(a);
// @__NO_SIDE_EFFECTS__
function Cg(a) {
  let l;
  return () => (l === void 0 && (l = a()), l);
}
const Ie = /* @__NO_SIDE_EFFECTS__ */ (a) => a, as = (...a) => a.reduce((l, o) => (r) => o(l(r))), ts = /* @__NO_SIDE_EFFECTS__ */ (a, l, o) => {
  const r = l - a;
  return r ? (o - a) / r : 1;
};
class Wf {
  constructor() {
    this.subscriptions = [];
  }
  add(l) {
    return If(this.subscriptions, l), () => Wu(this.subscriptions, l);
  }
  notify(l, o, r) {
    const c = this.subscriptions.length;
    if (c)
      if (c === 1)
        this.subscriptions[0](l, o, r);
      else
        for (let d = 0; d < c; d++) {
          const h = this.subscriptions[d];
          h && h(l, o, r);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const Ye = /* @__NO_SIDE_EFFECTS__ */ (a) => a * 1e3, Pe = /* @__NO_SIDE_EFFECTS__ */ (a) => a / 1e3, Dg = /* @__NO_SIDE_EFFECTS__ */ (a, l) => l ? a * (1e3 / l) : 0, zg = (a, l, o) => (((1 - 3 * o + 3 * l) * a + (3 * o - 6 * l)) * a + 3 * l) * a, mb = 1e-7, yb = 12;
function pb(a, l, o, r, c) {
  let d, h, y = 0;
  do
    h = l + (o - l) / 2, d = zg(h, r, c) - a, d > 0 ? o = h : l = h;
  while (Math.abs(d) > mb && ++y < yb);
  return h;
}
// @__NO_SIDE_EFFECTS__
function ls(a, l, o, r) {
  if (a === l && o === r)
    return Ie;
  const c = (d) => pb(d, 0, 1, a, o);
  return (d) => d === 0 || d === 1 ? d : zg(c(d), l, r);
}
const Og = /* @__NO_SIDE_EFFECTS__ */ (a) => (l) => l <= 0.5 ? a(2 * l) / 2 : (2 - a(2 * (1 - l))) / 2, Rg = /* @__NO_SIDE_EFFECTS__ */ (a) => (l) => 1 - a(1 - l), Ng = /* @__PURE__ */ ls(0.33, 1.53, 0.69, 0.99), $f = /* @__PURE__ */ Rg(Ng), _g = /* @__PURE__ */ Og($f), Vg = (a) => a >= 1 ? 1 : (a *= 2) < 1 ? 0.5 * $f(a) : 0.5 * (2 - Math.pow(2, -10 * (a - 1))), th = (a) => 1 - Math.sin(Math.acos(a)), wg = /* @__PURE__ */ Rg(th), Ug = /* @__PURE__ */ Og(th), gb = /* @__PURE__ */ ls(0.42, 0, 1, 1), vb = /* @__PURE__ */ ls(0, 0, 0.58, 1), Bg = /* @__PURE__ */ ls(0.42, 0, 0.58, 1), Sb = /* @__NO_SIDE_EFFECTS__ */ (a) => Array.isArray(a) && typeof a[0] != "number", jg = /* @__NO_SIDE_EFFECTS__ */ (a) => Array.isArray(a) && typeof a[0] == "number", Tb = {
  linear: Ie,
  easeIn: gb,
  easeInOut: Bg,
  easeOut: vb,
  circIn: th,
  circInOut: Ug,
  circOut: wg,
  backIn: $f,
  backInOut: _g,
  backOut: Ng,
  anticipate: Vg
}, bb = (a) => typeof a == "string", ap = (a) => {
  if (/* @__PURE__ */ jg(a)) {
    co(a.length === 4);
    const [l, o, r, c] = a;
    return /* @__PURE__ */ ls(l, o, r, c);
  } else if (bb(a))
    return Tb[a];
  return a;
}, Lu = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
function Eb(a) {
  let l = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), r = !1, c = !1;
  const d = /* @__PURE__ */ new WeakSet();
  let h = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function y(v) {
    d.has(v) && (S.schedule(v), a()), v(h);
  }
  const S = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (v, g = !1, p = !1) => {
      const N = p && r ? l : o;
      return g && d.add(v), N.add(v), v;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (v) => {
      o.delete(v), d.delete(v);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (v) => {
      if (h = v, r) {
        c = !0;
        return;
      }
      r = !0;
      const g = l;
      l = o, o = g, l.forEach(y), l.clear(), r = !1, c && (c = !1, S.process(v));
    }
  };
  return S;
}
const Ab = 40;
function Lg(a, l) {
  let o = !1, r = !0;
  const c = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, d = () => o = !0, h = Lu.reduce((X, L) => (X[L] = Eb(d), X), {}), { setup: y, read: S, resolveKeyframes: v, preUpdate: g, update: p, preRender: b, render: N, postRender: z } = h, w = () => {
    const X = vi.useManualTiming, L = X ? c.timestamp : performance.now();
    o = !1, X || (c.delta = r ? 1e3 / 60 : Math.max(Math.min(L - c.timestamp, Ab), 1)), c.timestamp = L, c.isProcessing = !0, y.process(c), S.process(c), v.process(c), g.process(c), p.process(c), b.process(c), N.process(c), z.process(c), c.isProcessing = !1, o && l && (r = !1, a(w));
  }, _ = () => {
    o = !0, r = !0, c.isProcessing || a(w);
  };
  return { schedule: Lu.reduce((X, L) => {
    const k = h[L];
    return X[L] = (st, J = !1, Q = !1) => (o || _(), k.schedule(st, J, Q)), X;
  }, {}), cancel: (X) => {
    for (let L = 0; L < Lu.length; L++)
      h[Lu[L]].cancel(X);
  }, state: c, steps: h };
}
const { schedule: Ut, cancel: Si, state: de, steps: af } = /* @__PURE__ */ Lg(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Ie, !0);
let Xu;
function xb() {
  Xu = void 0;
}
const Te = {
  now: () => (Xu === void 0 && Te.set(de.isProcessing || vi.useManualTiming ? de.timestamp : performance.now()), Xu),
  set: (a) => {
    Xu = a, queueMicrotask(xb);
  }
}, Hg = (a) => (l) => typeof l == "string" && l.startsWith(a), Yg = /* @__PURE__ */ Hg("--"), Mb = /* @__PURE__ */ Hg("var(--"), eh = (a) => Mb(a) ? Cb.test(a.split("/*")[0].trim()) : !1, Cb = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function lp(a) {
  return typeof a != "string" ? !1 : a.split("/*")[0].includes("var(--");
}
const Fa = {
  test: (a) => typeof a == "number",
  parse: parseFloat,
  transform: (a) => a
}, es = {
  ...Fa,
  transform: (a) => xn(0, 1, a)
}, Hu = {
  ...Fa,
  default: 1
}, Pl = (a) => Math.round(a * 1e5) / 1e5, nh = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function Db(a) {
  return a == null;
}
const zb = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, ih = (a, l) => (o) => !!(typeof o == "string" && zb.test(o) && o.startsWith(a) || l && !Db(o) && Object.prototype.hasOwnProperty.call(o, l)), qg = (a, l, o) => (r) => {
  if (typeof r != "string")
    return r;
  const [c, d, h, y] = r.match(nh);
  return {
    [a]: parseFloat(c),
    [l]: parseFloat(d),
    [o]: parseFloat(h),
    alpha: y !== void 0 ? parseFloat(y) : 1
  };
}, Ob = (a) => xn(0, 255, a), lf = {
  ...Fa,
  transform: (a) => Math.round(Ob(a))
}, Ki = {
  test: /* @__PURE__ */ ih("rgb", "red"),
  parse: /* @__PURE__ */ qg("red", "green", "blue"),
  transform: ({ red: a, green: l, blue: o, alpha: r = 1 }) => "rgba(" + lf.transform(a) + ", " + lf.transform(l) + ", " + lf.transform(o) + ", " + Pl(es.transform(r)) + ")"
};
function Rb(a) {
  let l = "", o = "", r = "", c = "";
  return a.length > 5 ? (l = a.substring(1, 3), o = a.substring(3, 5), r = a.substring(5, 7), c = a.substring(7, 9)) : (l = a.substring(1, 2), o = a.substring(2, 3), r = a.substring(3, 4), c = a.substring(4, 5), l += l, o += o, r += r, c += c), {
    red: parseInt(l, 16),
    green: parseInt(o, 16),
    blue: parseInt(r, 16),
    alpha: c ? parseInt(c, 16) / 255 : 1
  };
}
const Af = {
  test: /* @__PURE__ */ ih("#"),
  parse: Rb,
  transform: Ki.transform
}, ss = /* @__NO_SIDE_EFFECTS__ */ (a) => ({
  test: (l) => typeof l == "string" && l.endsWith(a) && l.split(" ").length === 1,
  parse: parseFloat,
  transform: (l) => `${l}${a}`
}), qn = /* @__PURE__ */ ss("deg"), An = /* @__PURE__ */ ss("%"), et = /* @__PURE__ */ ss("px"), Nb = /* @__PURE__ */ ss("vh"), _b = /* @__PURE__ */ ss("vw"), sp = {
  ...An,
  parse: (a) => An.parse(a) / 100,
  transform: (a) => An.transform(a * 100)
}, Xa = {
  test: /* @__PURE__ */ ih("hsl", "hue"),
  parse: /* @__PURE__ */ qg("hue", "saturation", "lightness"),
  transform: ({ hue: a, saturation: l, lightness: o, alpha: r = 1 }) => "hsla(" + Math.round(a) + ", " + An.transform(Pl(l)) + ", " + An.transform(Pl(o)) + ", " + Pl(es.transform(r)) + ")"
}, Wt = {
  test: (a) => Ki.test(a) || Af.test(a) || Xa.test(a),
  parse: (a) => Ki.test(a) ? Ki.parse(a) : Xa.test(a) ? Xa.parse(a) : Af.parse(a),
  transform: (a) => typeof a == "string" ? a : a.hasOwnProperty("red") ? Ki.transform(a) : Xa.transform(a),
  getAnimatableNone: (a) => {
    const l = Wt.parse(a);
    return l.alpha = 0, Wt.transform(l);
  }
}, Vb = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function wb(a) {
  return isNaN(a) && typeof a == "string" && (a.match(nh)?.length || 0) + (a.match(Vb)?.length || 0) > 0;
}
const Gg = "number", Xg = "color", Ub = "var", Bb = "var(", up = "${}", jb = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Ka(a) {
  const l = a.toString(), o = [], r = {
    color: [],
    number: [],
    var: []
  }, c = [];
  let d = 0;
  const y = l.replace(jb, (S) => (Wt.test(S) ? (r.color.push(d), c.push(Xg), o.push(Wt.parse(S))) : S.startsWith(Bb) ? (r.var.push(d), c.push(Ub), o.push(S)) : (r.number.push(d), c.push(Gg), o.push(parseFloat(S))), ++d, up)).split(up);
  return { values: o, split: y, indexes: r, types: c };
}
function Lb(a) {
  return Ka(a).values;
}
function Qg({ split: a, types: l }) {
  const o = a.length;
  return (r) => {
    let c = "";
    for (let d = 0; d < o; d++)
      if (c += a[d], r[d] !== void 0) {
        const h = l[d];
        h === Gg ? c += Pl(r[d]) : h === Xg ? c += Wt.transform(r[d]) : c += r[d];
      }
    return c;
  };
}
function Hb(a) {
  return Qg(Ka(a));
}
const Yb = (a) => typeof a == "number" ? 0 : Wt.test(a) ? Wt.getAnimatableNone(a) : a, qb = (a, l) => typeof a == "number" ? l?.trim().endsWith("/") ? a : 0 : Yb(a);
function Gb(a) {
  const l = Ka(a);
  return Qg(l)(l.values.map((r, c) => qb(r, l.split[c])));
}
const un = {
  test: wb,
  parse: Lb,
  createTransformer: Hb,
  getAnimatableNone: Gb
};
function sf(a, l, o) {
  return o < 0 && (o += 1), o > 1 && (o -= 1), o < 1 / 6 ? a + (l - a) * 6 * o : o < 1 / 2 ? l : o < 2 / 3 ? a + (l - a) * (2 / 3 - o) * 6 : a;
}
function Xb({ hue: a, saturation: l, lightness: o, alpha: r }) {
  a /= 360, l /= 100, o /= 100;
  let c = 0, d = 0, h = 0;
  if (!l)
    c = d = h = o;
  else {
    const y = o < 0.5 ? o * (1 + l) : o + l - o * l, S = 2 * o - y;
    c = sf(S, y, a + 1 / 3), d = sf(S, y, a), h = sf(S, y, a - 1 / 3);
  }
  return {
    red: Math.round(c * 255),
    green: Math.round(d * 255),
    blue: Math.round(h * 255),
    alpha: r
  };
}
function $u(a, l) {
  return (o) => o > 0 ? l : a;
}
const wt = (a, l, o) => a + (l - a) * o, uf = (a, l, o) => {
  const r = a * a, c = o * (l * l - r) + r;
  return c < 0 ? 0 : Math.sqrt(c);
}, Qb = [Af, Ki, Xa], Zb = (a) => Qb.find((l) => l.test(a));
function op(a) {
  const l = Zb(a);
  if (!l)
    return !1;
  let o = l.parse(a);
  return l === Xa && (o = Xb(o)), o;
}
const rp = (a, l) => {
  const o = op(a), r = op(l);
  if (!o || !r)
    return $u(a, l);
  const c = { ...o };
  return (d) => (c.red = uf(o.red, r.red, d), c.green = uf(o.green, r.green, d), c.blue = uf(o.blue, r.blue, d), c.alpha = wt(o.alpha, r.alpha, d), Ki.transform(c));
}, xf = /* @__PURE__ */ new Set(["none", "hidden"]);
function Kb(a, l) {
  return xf.has(a) ? (o) => o <= 0 ? a : l : (o) => o >= 1 ? l : a;
}
function Jb(a, l) {
  return (o) => wt(a, l, o);
}
function ah(a) {
  return typeof a == "number" ? Jb : typeof a == "string" ? eh(a) ? $u : Wt.test(a) ? rp : Pb : Array.isArray(a) ? Zg : typeof a == "object" ? Wt.test(a) ? rp : Fb : $u;
}
function Zg(a, l) {
  const o = [...a], r = o.length, c = a.map((d, h) => ah(d)(d, l[h]));
  return (d) => {
    for (let h = 0; h < r; h++)
      o[h] = c[h](d);
    return o;
  };
}
function Fb(a, l) {
  const o = { ...a, ...l }, r = {};
  for (const c in o)
    a[c] !== void 0 && l[c] !== void 0 && (r[c] = ah(a[c])(a[c], l[c]));
  return (c) => {
    for (const d in r)
      o[d] = r[d](c);
    return o;
  };
}
function kb(a, l) {
  const o = [], r = { color: 0, var: 0, number: 0 };
  for (let c = 0; c < l.values.length; c++) {
    const d = l.types[c], h = a.indexes[d][r[d]], y = a.values[h] ?? 0;
    o[c] = y, r[d]++;
  }
  return o;
}
const Pb = (a, l) => {
  const o = un.createTransformer(l), r = Ka(a), c = Ka(l);
  return r.indexes.var.length === c.indexes.var.length && r.indexes.color.length === c.indexes.color.length && r.indexes.number.length >= c.indexes.number.length ? xf.has(a) && !c.values.length || xf.has(l) && !r.values.length ? Kb(a, l) : as(Zg(kb(r, c), c.values), o) : $u(a, l);
};
function Kg(a, l, o) {
  return typeof a == "number" && typeof l == "number" && typeof o == "number" ? wt(a, l, o) : ah(a)(a, l);
}
const Ib = (a) => {
  const l = ({ timestamp: o }) => a(o);
  return {
    start: (o = !0) => Ut.update(l, o),
    stop: () => Si(l),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => de.isProcessing ? de.timestamp : Te.now()
  };
}, Jg = (a, l, o = 10) => {
  let r = "";
  const c = Math.max(Math.round(l / o), 2);
  for (let d = 0; d < c; d++)
    r += Math.round(a(d / (c - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${r.substring(0, r.length - 2)})`;
}, to = 2e4;
function lh(a) {
  let l = 0;
  const o = 50;
  let r = a.next(l);
  for (; !r.done && l < to; )
    l += o, r = a.next(l);
  return l >= to ? 1 / 0 : l;
}
function Wb(a, l = 100, o) {
  const r = o({ ...a, keyframes: [0, l] }), c = Math.min(lh(r), to);
  return {
    type: "keyframes",
    ease: (d) => r.next(c * d).value / l,
    duration: /* @__PURE__ */ Pe(c)
  };
}
const Kt = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
};
function Mf(a, l) {
  return a * Math.sqrt(1 - l * l);
}
const $b = 12;
function tE(a, l, o) {
  let r = o;
  for (let c = 1; c < $b; c++)
    r = r - a(r) / l(r);
  return r;
}
const of = 1e-3;
function eE({ duration: a = Kt.duration, bounce: l = Kt.bounce, velocity: o = Kt.velocity, mass: r = Kt.mass }) {
  let c, d, h = 1 - l;
  h = xn(Kt.minDamping, Kt.maxDamping, h), a = xn(Kt.minDuration, Kt.maxDuration, /* @__PURE__ */ Pe(a)), h < 1 ? (c = (v) => {
    const g = v * h, p = g * a, b = g - o, N = Mf(v, h), z = Math.exp(-p);
    return of - b / N * z;
  }, d = (v) => {
    const p = v * h * a, b = p * o + o, N = Math.pow(h, 2) * Math.pow(v, 2) * a, z = Math.exp(-p), w = Mf(Math.pow(v, 2), h);
    return (-c(v) + of > 0 ? -1 : 1) * ((b - N) * z) / w;
  }) : (c = (v) => {
    const g = Math.exp(-v * a), p = (v - o) * a + 1;
    return -of + g * p;
  }, d = (v) => {
    const g = Math.exp(-v * a), p = (o - v) * (a * a);
    return g * p;
  });
  const y = 5 / a, S = tE(c, d, y);
  if (a = /* @__PURE__ */ Ye(a), isNaN(S))
    return {
      stiffness: Kt.stiffness,
      damping: Kt.damping,
      duration: a
    };
  {
    const v = Math.pow(S, 2) * r;
    return {
      stiffness: v,
      damping: h * 2 * Math.sqrt(r * v),
      duration: a
    };
  }
}
const nE = ["duration", "bounce"], iE = ["stiffness", "damping", "mass"];
function cp(a, l) {
  return l.some((o) => a[o] !== void 0);
}
function aE(a) {
  let l = {
    velocity: Kt.velocity,
    stiffness: Kt.stiffness,
    damping: Kt.damping,
    mass: Kt.mass,
    isResolvedFromDuration: !1,
    ...a
  };
  if (!cp(a, iE) && cp(a, nE))
    if (l.velocity = 0, a.visualDuration) {
      const o = a.visualDuration, r = 2 * Math.PI / (o * 1.2), c = r * r, d = 2 * xn(0.05, 1, 1 - (a.bounce || 0)) * Math.sqrt(c);
      l = {
        ...l,
        mass: Kt.mass,
        stiffness: c,
        damping: d
      };
    } else {
      const o = eE({ ...a, velocity: 0 });
      l = {
        ...l,
        ...o,
        mass: Kt.mass
      }, l.isResolvedFromDuration = !0;
    }
  return l;
}
function eo(a = Kt.visualDuration, l = Kt.bounce) {
  const o = typeof a != "object" ? {
    visualDuration: a,
    keyframes: [0, 1],
    bounce: l
  } : a;
  let { restSpeed: r, restDelta: c } = o;
  const d = o.keyframes[0], h = o.keyframes[o.keyframes.length - 1], y = { done: !1, value: d }, { stiffness: S, damping: v, mass: g, duration: p, velocity: b, isResolvedFromDuration: N } = aE({
    ...o,
    velocity: -/* @__PURE__ */ Pe(o.velocity || 0)
  }), z = b || 0, w = v / (2 * Math.sqrt(S * g)), _ = h - d, H = /* @__PURE__ */ Pe(Math.sqrt(S / g)), G = Math.abs(_) < 5;
  r || (r = G ? Kt.restSpeed.granular : Kt.restSpeed.default), c || (c = G ? Kt.restDelta.granular : Kt.restDelta.default);
  let X, L, k, st, J, Q;
  if (w < 1)
    k = Mf(H, w), st = (z + w * H * _) / k, X = (W) => {
      const dt = Math.exp(-w * H * W);
      return h - dt * (st * Math.sin(k * W) + _ * Math.cos(k * W));
    }, J = w * H * st + _ * k, Q = w * H * _ - st * k, L = (W) => Math.exp(-w * H * W) * (J * Math.sin(k * W) + Q * Math.cos(k * W));
  else if (w === 1) {
    X = (dt) => h - Math.exp(-H * dt) * (_ + (z + H * _) * dt);
    const W = z + H * _;
    L = (dt) => Math.exp(-H * dt) * (H * W * dt - z);
  } else {
    const W = H * Math.sqrt(w * w - 1);
    X = (qt) => {
      const Ct = Math.exp(-w * H * qt), Z = Math.min(W * qt, 300);
      return h - Ct * ((z + w * H * _) * Math.sinh(Z) + W * _ * Math.cosh(Z)) / W;
    };
    const dt = (z + w * H * _) / W, Tt = w * H * dt - _ * W, Yt = w * H * _ - dt * W;
    L = (qt) => {
      const Ct = Math.exp(-w * H * qt), Z = Math.min(W * qt, 300);
      return Ct * (Tt * Math.sinh(Z) + Yt * Math.cosh(Z));
    };
  }
  const ot = {
    calculatedDuration: N && p || null,
    velocity: (W) => /* @__PURE__ */ Ye(L(W)),
    next: (W) => {
      if (!N && w < 1) {
        const Tt = Math.exp(-w * H * W), Yt = Math.sin(k * W), qt = Math.cos(k * W), Ct = h - Tt * (st * Yt + _ * qt), Z = /* @__PURE__ */ Ye(Tt * (J * Yt + Q * qt));
        return y.done = Math.abs(Z) <= r && Math.abs(h - Ct) <= c, y.value = y.done ? h : Ct, y;
      }
      const dt = X(W);
      if (N)
        y.done = W >= p;
      else {
        const Tt = /* @__PURE__ */ Ye(L(W));
        y.done = Math.abs(Tt) <= r && Math.abs(h - dt) <= c;
      }
      return y.value = y.done ? h : dt, y;
    },
    toString: () => {
      const W = Math.min(lh(ot), to), dt = Jg((Tt) => ot.next(W * Tt).value, W, 30);
      return W + "ms " + dt;
    },
    toTransition: () => {
    }
  };
  return ot;
}
eo.applyToOptions = (a) => {
  const l = Wb(a, 100, eo);
  return a.ease = l.ease, a.duration = /* @__PURE__ */ Ye(l.duration), a.type = "keyframes", a;
};
const lE = 5;
function Fg(a, l, o) {
  const r = Math.max(l - lE, 0);
  return /* @__PURE__ */ Dg(o - a(r), l - r);
}
function Cf({ keyframes: a, velocity: l = 0, power: o = 0.8, timeConstant: r = 325, bounceDamping: c = 10, bounceStiffness: d = 500, modifyTarget: h, min: y, max: S, restDelta: v = 0.5, restSpeed: g }) {
  const p = a[0], b = {
    done: !1,
    value: p
  }, N = (Q) => y !== void 0 && Q < y || S !== void 0 && Q > S, z = (Q) => y === void 0 ? S : S === void 0 || Math.abs(y - Q) < Math.abs(S - Q) ? y : S;
  let w = o * l;
  const _ = p + w, H = h === void 0 ? _ : h(_);
  H !== _ && (w = H - p);
  const G = (Q) => -w * Math.exp(-Q / r), X = (Q) => H + G(Q), L = (Q) => {
    const ot = G(Q), W = X(Q);
    b.done = Math.abs(ot) <= v, b.value = b.done ? H : W;
  };
  let k, st;
  const J = (Q) => {
    N(b.value) && (k = Q, st = eo({
      keyframes: [b.value, z(b.value)],
      velocity: Fg(X, Q, b.value),
      // TODO: This should be passing * 1000
      damping: c,
      stiffness: d,
      restDelta: v,
      restSpeed: g
    }));
  };
  return J(0), {
    calculatedDuration: null,
    next: (Q) => {
      let ot = !1;
      return !st && k === void 0 && (ot = !0, L(Q), J(Q)), k !== void 0 && Q >= k ? st.next(Q - k) : (!ot && L(Q), b);
    }
  };
}
function sE(a, l, o) {
  const r = [], c = o || vi.mix || Kg, d = a.length - 1;
  for (let h = 0; h < d; h++) {
    let y = c(a[h], a[h + 1]);
    if (l) {
      const S = Array.isArray(l) ? l[h] || Ie : l;
      y = as(S, y);
    }
    r.push(y);
  }
  return r;
}
function uE(a, l, { clamp: o = !0, ease: r, mixer: c } = {}) {
  const d = a.length;
  if (co(d === l.length), d === 1)
    return () => l[0];
  if (d === 2 && l[0] === l[1])
    return () => l[1];
  const h = a[0] === a[1];
  a[0] > a[d - 1] && (a = [...a].reverse(), l = [...l].reverse());
  const y = sE(l, r, c), S = y.length, v = (g) => {
    if (h && g < a[0])
      return l[0];
    let p = 0;
    if (S > 1)
      for (; p < a.length - 2 && !(g < a[p + 1]); p++)
        ;
    const b = /* @__PURE__ */ ts(a[p], a[p + 1], g);
    return y[p](b);
  };
  return o ? (g) => v(xn(a[0], a[d - 1], g)) : v;
}
function oE(a, l) {
  const o = a[a.length - 1];
  for (let r = 1; r <= l; r++) {
    const c = /* @__PURE__ */ ts(0, l, r);
    a.push(wt(o, 1, c));
  }
}
function rE(a) {
  const l = [0];
  return oE(l, a.length - 1), l;
}
function cE(a, l) {
  return a.map((o) => o * l);
}
function fE(a, l) {
  return a.map(() => l || Bg).splice(0, a.length - 1);
}
function Il({ duration: a = 300, keyframes: l, times: o, ease: r = "easeInOut" }) {
  const c = /* @__PURE__ */ Sb(r) ? r.map(ap) : ap(r), d = {
    done: !1,
    value: l[0]
  }, h = cE(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    o && o.length === l.length ? o : rE(l),
    a
  ), y = uE(h, l, {
    ease: Array.isArray(c) ? c : fE(l, c)
  });
  return {
    calculatedDuration: a,
    next: (S) => (d.value = y(S), d.done = S >= a, d)
  };
}
const hE = (a) => a !== null;
function fo(a, { repeat: l, repeatType: o = "loop" }, r, c = 1) {
  const d = a.filter(hE), y = c < 0 || l && o !== "loop" && l % 2 === 1 ? 0 : d.length - 1;
  return !y || r === void 0 ? d[y] : r;
}
const dE = {
  decay: Cf,
  inertia: Cf,
  tween: Il,
  keyframes: Il,
  spring: eo
};
function kg(a) {
  typeof a.type == "string" && (a.type = dE[a.type]);
}
class sh {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((l) => {
      this.resolve = l;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(l, o) {
    return this.finished.then(l, o);
  }
}
const mE = (a) => a / 100;
class no extends sh {
  constructor(l) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: o } = this.options;
      o && o.updatedAt !== Te.now() && this.tick(Te.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = l, this.initAnimation(), this.play(), l.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: l } = this;
    kg(l);
    const { type: o = Il, repeat: r = 0, repeatDelay: c = 0, repeatType: d, velocity: h = 0 } = l;
    let { keyframes: y } = l;
    const S = o || Il;
    S !== Il && typeof y[0] != "number" && (this.mixKeyframes = as(mE, Kg(y[0], y[1])), y = [0, 100]);
    const v = S({ ...l, keyframes: y });
    d === "mirror" && (this.mirroredGenerator = S({
      ...l,
      keyframes: [...y].reverse(),
      velocity: -h
    })), v.calculatedDuration === null && (v.calculatedDuration = lh(v));
    const { calculatedDuration: g } = v;
    this.calculatedDuration = g, this.resolvedDuration = g + c, this.totalDuration = this.resolvedDuration * (r + 1) - c, this.generator = v;
  }
  updateTime(l) {
    const o = Math.round(l - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = o;
  }
  tick(l, o = !1) {
    const { generator: r, totalDuration: c, mixKeyframes: d, mirroredGenerator: h, resolvedDuration: y, calculatedDuration: S } = this;
    if (this.startTime === null)
      return r.next(0);
    const { delay: v = 0, keyframes: g, repeat: p, repeatType: b, repeatDelay: N, type: z, onUpdate: w, finalKeyframe: _ } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, l) : this.speed < 0 && (this.startTime = Math.min(l - c / this.speed, this.startTime)), o ? this.currentTime = l : this.updateTime(l);
    const H = this.currentTime - v * (this.playbackSpeed >= 0 ? 1 : -1), G = this.playbackSpeed >= 0 ? H < 0 : H > c;
    this.currentTime = Math.max(H, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = c);
    let X = this.currentTime, L = r;
    if (p) {
      const Q = Math.min(this.currentTime, c) / y;
      let ot = Math.floor(Q), W = Q % 1;
      !W && Q >= 1 && (W = 1), W === 1 && ot--, ot = Math.min(ot, p + 1), ot % 2 && (b === "reverse" ? (W = 1 - W, N && (W -= N / y)) : b === "mirror" && (L = h)), X = xn(0, 1, W) * y;
    }
    let k;
    G ? (this.delayState.value = g[0], k = this.delayState) : k = L.next(X), d && !G && (k.value = d(k.value));
    let { done: st } = k;
    !G && S !== null && (st = this.playbackSpeed >= 0 ? this.currentTime >= c : this.currentTime <= 0);
    const J = this.holdTime === null && (this.state === "finished" || this.state === "running" && st);
    return J && z !== Cf && (k.value = fo(g, this.options, _, this.speed)), w && w(k.value), J && this.finish(), k;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(l, o) {
    return this.finished.then(l, o);
  }
  get duration() {
    return /* @__PURE__ */ Pe(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: l = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Pe(l);
  }
  get time() {
    return /* @__PURE__ */ Pe(this.currentTime);
  }
  set time(l) {
    l = /* @__PURE__ */ Ye(l), this.currentTime = l, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = l : this.driver && (this.startTime = this.driver.now() - l / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = l, this.tick(l));
  }
  /**
   * Returns the generator's velocity at the current time in units/second.
   * Uses the analytical derivative when available (springs), avoiding
   * the MotionValue's frame-dependent velocity estimation.
   */
  getGeneratorVelocity() {
    const l = this.currentTime;
    if (l <= 0)
      return this.options.velocity || 0;
    if (this.generator.velocity)
      return this.generator.velocity(l);
    const o = this.generator.next(l).value;
    return Fg((r) => this.generator.next(r).value, l, o);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(l) {
    const o = this.playbackSpeed !== l;
    o && this.driver && this.updateTime(Te.now()), this.playbackSpeed = l, o && this.driver && (this.time = /* @__PURE__ */ Pe(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: l = Ib, startTime: o } = this.options;
    this.driver || (this.driver = l((c) => this.tick(c))), this.options.onPlay?.();
    const r = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = r) : this.holdTime !== null ? this.startTime = r - this.holdTime : this.startTime || (this.startTime = o ?? r), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(Te.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    this.notifyFinished(), this.teardown(), this.state = "finished", this.options.onComplete?.();
  }
  cancel() {
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), this.options.onCancel?.();
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(l) {
    return this.startTime = 0, this.tick(l, !0);
  }
  attachTimeline(l) {
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), l.observe(this);
  }
}
function yE(a) {
  for (let l = 1; l < a.length; l++)
    a[l] ?? (a[l] = a[l - 1]);
}
const Ji = (a) => a * 180 / Math.PI, Df = (a) => {
  const l = Ji(Math.atan2(a[1], a[0]));
  return zf(l);
}, pE = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (a) => (Math.abs(a[0]) + Math.abs(a[3])) / 2,
  rotate: Df,
  rotateZ: Df,
  skewX: (a) => Ji(Math.atan(a[1])),
  skewY: (a) => Ji(Math.atan(a[2])),
  skew: (a) => (Math.abs(a[1]) + Math.abs(a[2])) / 2
}, zf = (a) => (a = a % 360, a < 0 && (a += 360), a), fp = Df, hp = (a) => Math.sqrt(a[0] * a[0] + a[1] * a[1]), dp = (a) => Math.sqrt(a[4] * a[4] + a[5] * a[5]), gE = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: hp,
  scaleY: dp,
  scale: (a) => (hp(a) + dp(a)) / 2,
  rotateX: (a) => zf(Ji(Math.atan2(a[6], a[5]))),
  rotateY: (a) => zf(Ji(Math.atan2(-a[2], a[0]))),
  rotateZ: fp,
  rotate: fp,
  skewX: (a) => Ji(Math.atan(a[4])),
  skewY: (a) => Ji(Math.atan(a[1])),
  skew: (a) => (Math.abs(a[1]) + Math.abs(a[4])) / 2
};
function Of(a) {
  return a.includes("scale") ? 1 : 0;
}
function Rf(a, l) {
  if (!a || a === "none")
    return Of(l);
  const o = a.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let r, c;
  if (o)
    r = gE, c = o;
  else {
    const y = a.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    r = pE, c = y;
  }
  if (!c)
    return Of(l);
  const d = r[l], h = c[1].split(",").map(SE);
  return typeof d == "function" ? d(h) : h[d];
}
const vE = (a, l) => {
  const { transform: o = "none" } = getComputedStyle(a);
  return Rf(o, l);
};
function SE(a) {
  return parseFloat(a.trim());
}
const ka = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], Pa = /* @__PURE__ */ new Set([...ka, "pathRotation"]), mp = (a) => a === Fa || a === et, TE = /* @__PURE__ */ new Set(["x", "y", "z"]), bE = ka.filter((a) => !TE.has(a));
function EE(a) {
  const l = [];
  return bE.forEach((o) => {
    const r = a.getValue(o);
    r !== void 0 && (l.push([o, r.get()]), r.set(o.startsWith("scale") ? 1 : 0));
  }), l;
}
const gi = {
  // Dimensions
  width: ({ x: a }, { paddingLeft: l = "0", paddingRight: o = "0", boxSizing: r }) => {
    const c = a.max - a.min;
    return r === "border-box" ? c : c - parseFloat(l) - parseFloat(o);
  },
  height: ({ y: a }, { paddingTop: l = "0", paddingBottom: o = "0", boxSizing: r }) => {
    const c = a.max - a.min;
    return r === "border-box" ? c : c - parseFloat(l) - parseFloat(o);
  },
  top: (a, { top: l }) => parseFloat(l),
  left: (a, { left: l }) => parseFloat(l),
  bottom: ({ y: a }, { top: l }) => parseFloat(l) + (a.max - a.min),
  right: ({ x: a }, { left: l }) => parseFloat(l) + (a.max - a.min),
  // Transform
  x: (a, { transform: l }) => Rf(l, "x"),
  y: (a, { transform: l }) => Rf(l, "y")
};
gi.translateX = gi.x;
gi.translateY = gi.y;
const Fi = /* @__PURE__ */ new Set();
let Nf = !1, _f = !1, Vf = !1;
function Pg() {
  if (_f) {
    const a = Array.from(Fi).filter((r) => r.needsMeasurement), l = new Set(a.map((r) => r.element)), o = /* @__PURE__ */ new Map();
    l.forEach((r) => {
      const c = EE(r);
      c.length && (o.set(r, c), r.render());
    }), a.forEach((r) => r.measureInitialState()), l.forEach((r) => {
      r.render();
      const c = o.get(r);
      c && c.forEach(([d, h]) => {
        r.getValue(d)?.set(h);
      });
    }), a.forEach((r) => r.measureEndState()), a.forEach((r) => {
      r.suspendedScrollY !== void 0 && window.scrollTo(0, r.suspendedScrollY);
    });
  }
  _f = !1, Nf = !1, Fi.forEach((a) => a.complete(Vf)), Fi.clear();
}
function Ig() {
  Fi.forEach((a) => {
    a.readKeyframes(), a.needsMeasurement && (_f = !0);
  });
}
function AE() {
  Vf = !0, Ig(), Pg(), Vf = !1;
}
class uh {
  constructor(l, o, r, c, d, h = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...l], this.onComplete = o, this.name = r, this.motionValue = c, this.element = d, this.isAsync = h;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Fi.add(this), Nf || (Nf = !0, Ut.read(Ig), Ut.resolveKeyframes(Pg))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: l, name: o, element: r, motionValue: c } = this;
    if (l[0] === null) {
      const d = c?.get(), h = l[l.length - 1];
      if (d !== void 0)
        l[0] = d;
      else if (r && o) {
        const y = r.readValue(o, h);
        y != null && (l[0] = y);
      }
      l[0] === void 0 && (l[0] = h), c && d === void 0 && c.set(l[0]);
    }
    yE(l);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(l = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, l), Fi.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (Fi.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const xE = (a) => a.startsWith("--");
function Wg(a, l, o) {
  xE(l) ? a.style.setProperty(l, o) : a.style[l] = o;
}
const ME = {};
function $g(a, l) {
  const o = /* @__PURE__ */ Cg(a);
  return () => ME[l] ?? o();
}
const CE = /* @__PURE__ */ $g(() => window.ScrollTimeline !== void 0, "scrollTimeline"), tv = /* @__PURE__ */ $g(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), kl = ([a, l, o, r]) => `cubic-bezier(${a}, ${l}, ${o}, ${r})`, yp = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ kl([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ kl([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ kl([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ kl([0.33, 1.53, 0.69, 0.99])
};
function ev(a, l) {
  if (a)
    return typeof a == "function" ? tv() ? Jg(a, l) : "ease-out" : /* @__PURE__ */ jg(a) ? kl(a) : Array.isArray(a) ? a.map((o) => ev(o, l) || yp.easeOut) : yp[a];
}
function DE(a, l, o, { delay: r = 0, duration: c = 300, repeat: d = 0, repeatType: h = "loop", ease: y = "easeOut", times: S } = {}, v = void 0) {
  const g = {
    [l]: o
  };
  S && (g.offset = S);
  const p = ev(y, c);
  Array.isArray(p) && (g.easing = p);
  const b = {
    delay: r,
    duration: c,
    easing: Array.isArray(p) ? "linear" : p,
    fill: "both",
    iterations: d + 1,
    direction: h === "reverse" ? "alternate" : "normal"
  };
  return v && (b.pseudoElement = v), a.animate(g, b);
}
function nv(a) {
  return typeof a == "function" && "applyToOptions" in a;
}
function zE({ type: a, ...l }) {
  return nv(a) && tv() ? a.applyToOptions(l) : (l.duration ?? (l.duration = 300), l.ease ?? (l.ease = "easeOut"), l);
}
class iv extends sh {
  constructor(l) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !l)
      return;
    const { element: o, name: r, keyframes: c, pseudoElement: d, allowFlatten: h = !1, finalKeyframe: y, onComplete: S } = l;
    this.isPseudoElement = !!d, this.allowFlatten = h, this.options = l, co(typeof l.type != "string");
    const v = zE(l);
    this.animation = DE(o, r, c, v, d), v.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !d) {
        const g = fo(c, this.options, y, this.speed);
        this.updateMotionValue && this.updateMotionValue(g), Wg(o, r, g), this.animation.cancel();
      }
      S?.(), this.notifyFinished();
    };
  }
  play() {
    this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.finish?.();
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = !0;
    const { state: l } = this;
    l === "idle" || l === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    const l = this.options?.element;
    !this.isPseudoElement && l?.isConnected && this.animation.commitStyles?.();
  }
  get duration() {
    const l = this.animation.effect?.getComputedTiming?.().duration || 0;
    return /* @__PURE__ */ Pe(Number(l));
  }
  get iterationDuration() {
    const { delay: l = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Pe(l);
  }
  get time() {
    return /* @__PURE__ */ Pe(Number(this.animation.currentTime) || 0);
  }
  set time(l) {
    const o = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ Ye(l), o && this.animation.pause();
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(l) {
    l < 0 && (this.finishedTime = null), this.animation.playbackRate = l;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime);
  }
  set startTime(l) {
    this.manualStartTime = this.animation.startTime = l;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: l, rangeStart: o, rangeEnd: r, observe: c }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, l && CE() ? (this.animation.timeline = l, o && (this.animation.rangeStart = o), r && (this.animation.rangeEnd = r), Ie) : c(this);
  }
}
const av = {
  anticipate: Vg,
  backInOut: _g,
  circInOut: Ug
};
function OE(a) {
  return a in av;
}
function RE(a) {
  typeof a.ease == "string" && OE(a.ease) && (a.ease = av[a.ease]);
}
const rf = 10;
class NE extends iv {
  constructor(l) {
    RE(l), kg(l), super(l), l.startTime !== void 0 && l.autoplay !== !1 && (this.startTime = l.startTime), this.options = l;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read committed styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(l) {
    const { motionValue: o, onUpdate: r, onComplete: c, element: d, ...h } = this.options;
    if (!o)
      return;
    if (l !== void 0) {
      o.set(l);
      return;
    }
    const y = new no({
      ...h,
      autoplay: !1
    }), S = Math.max(rf, Te.now() - this.startTime), v = xn(0, rf, S - rf), g = y.sample(S).value, { name: p } = this.options;
    d && p && Wg(d, p, g), o.setWithVelocity(y.sample(Math.max(0, S - v)).value, g, v), y.stop();
  }
}
const pp = (a, l) => l === "zIndex" ? !1 : !!(typeof a == "number" || Array.isArray(a) || typeof a == "string" && // It's animatable if we have a string
(un.test(a) || a === "0") && // And it contains numbers and/or colors
!a.startsWith("url("));
function _E(a) {
  const l = a[0];
  if (a.length === 1)
    return !0;
  for (let o = 0; o < a.length; o++)
    if (a[o] !== l)
      return !0;
}
function VE(a, l, o, r) {
  const c = a[0];
  if (c === null)
    return !1;
  if (l === "display" || l === "visibility")
    return !0;
  const d = a[a.length - 1], h = pp(c, l), y = pp(d, l);
  return !h || !y ? !1 : _E(a) || (o === "spring" || nv(o)) && r;
}
function wf(a) {
  a.duration = 0, a.type = "keyframes";
}
const lv = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform",
  "backgroundColor"
]), wE = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function UE(a) {
  for (let l = 0; l < a.length; l++)
    if (typeof a[l] == "string" && wE.test(a[l]))
      return !0;
  return !1;
}
const BE = /* @__PURE__ */ new Set([
  "color",
  "backgroundColor",
  "outlineColor",
  "fill",
  "stroke",
  "borderColor",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor"
]), jE = /* @__PURE__ */ Cg(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function LE(a) {
  const { motionValue: l, name: o, repeatDelay: r, repeatType: c, damping: d, type: h, keyframes: y } = a, S = l?.owner?.current;
  if (!(S instanceof HTMLElement) && !(S instanceof SVGElement))
    return !1;
  const { onUpdate: v, transformTemplate: g } = l.owner.getProps();
  return jE() && o && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (lv.has(o) || BE.has(o) && UE(y)) && (o !== "transform" || !g) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !v && !r && c !== "mirror" && d !== 0 && h !== "inertia";
}
const HE = 40;
class YE extends sh {
  constructor({ autoplay: l = !0, delay: o = 0, type: r = "keyframes", repeat: c = 0, repeatDelay: d = 0, repeatType: h = "loop", keyframes: y, name: S, motionValue: v, element: g, ...p }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = Te.now();
    const b = {
      autoplay: l,
      delay: o,
      type: r,
      repeat: c,
      repeatDelay: d,
      repeatType: h,
      name: S,
      motionValue: v,
      element: g,
      ...p
    }, N = g?.KeyframeResolver || uh;
    this.keyframeResolver = new N(y, (z, w, _) => this.onKeyframesResolved(z, w, b, !_), S, v, g), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(l, o, r, c) {
    this.keyframeResolver = void 0;
    const { name: d, type: h, velocity: y, delay: S, isHandoff: v, onUpdate: g } = r;
    this.resolvedAt = Te.now();
    let p = !0;
    VE(l, d, h, y) || (p = !1, (vi.instantAnimations || !S) && g?.(fo(l, r, o)), l[0] = l[l.length - 1], wf(r), r.repeat = 0);
    const N = {
      startTime: c ? this.resolvedAt ? this.resolvedAt - this.createdAt > HE ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: o,
      ...r,
      keyframes: l
    }, z = p && !v && LE(N), w = N.motionValue?.owner?.current;
    let _;
    if (z)
      try {
        _ = new NE({
          ...N,
          element: w
        });
      } catch {
        _ = new no(N);
      }
    else
      _ = new no(N);
    _.finished.then(() => {
      this.notifyFinished();
    }).catch(Ie), this.pendingTimeline && (this.stopTimeline = _.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = _;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(l, o) {
    return this.finished.finally(l).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), AE()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(l) {
    this.animation.time = l;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(l) {
    this.animation.speed = l;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(l) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(l) : this.pendingTimeline = l, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
  }
}
function sv(a, l, o, r = 0, c = 1) {
  const d = Array.from(a).sort((v, g) => v.sortNodePosition(g)).indexOf(l), h = a.size, y = (h - 1) * r;
  return typeof o == "function" ? o(d, h) : c === 1 ? d * r : y - d * r;
}
const gp = 30, qE = (a) => !isNaN(parseFloat(a));
class GE {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(l, o = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (r) => {
      const c = Te.now();
      if (this.updatedAt !== c && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(r), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const d of this.dependents)
          d.dirty();
    }, this.hasAnimated = !1, this.setCurrent(l), this.owner = o.owner;
  }
  setCurrent(l) {
    this.current = l, this.updatedAt = Te.now(), this.canTrackVelocity === null && l !== void 0 && (this.canTrackVelocity = qE(this.current));
  }
  setPrevFrameValue(l = this.current) {
    this.prevFrameValue = l, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(l) {
    return this.on("change", l);
  }
  on(l, o) {
    this.events[l] || (this.events[l] = new Wf());
    const r = this.events[l].add(o);
    return l === "change" ? () => {
      r(), Ut.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : r;
  }
  clearListeners() {
    for (const l in this.events)
      this.events[l].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(l, o) {
    this.passiveEffect = l, this.stopPassiveEffect = o;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(l) {
    this.passiveEffect ? this.passiveEffect(l, this.updateAndNotify) : this.updateAndNotify(l);
  }
  setWithVelocity(l, o, r) {
    this.set(o), this.prev = void 0, this.prevFrameValue = l, this.prevUpdatedAt = this.updatedAt - r;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(l, o = !0) {
    this.updateAndNotify(l), this.prev = l, this.prevUpdatedAt = this.prevFrameValue = void 0, o && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    this.events.change?.notify(this.current);
  }
  addDependent(l) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(l);
  }
  removeDependent(l) {
    this.dependents && this.dependents.delete(l);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const l = Te.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || l - this.updatedAt > gp)
      return 0;
    const o = Math.min(this.updatedAt - this.prevUpdatedAt, gp);
    return /* @__PURE__ */ Dg(parseFloat(this.current) - parseFloat(this.prevFrameValue), o);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(l) {
    return this.stop(), new Promise((o) => {
      this.hasAnimated = !0, this.animation = l(o), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.dependents?.clear(), this.events.destroy?.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function Ja(a, l) {
  return new GE(a, l);
}
function uv(a, l) {
  if (a?.inherit && l) {
    const { inherit: o, ...r } = a;
    return { ...l, ...r };
  }
  return a;
}
function oh(a, l) {
  const o = a?.[l] ?? a?.default ?? a;
  return o !== a ? uv(o, a) : o;
}
const XE = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, QE = (a) => ({
  type: "spring",
  stiffness: 550,
  damping: a === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), ZE = {
  type: "keyframes",
  duration: 0.8
}, KE = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, JE = (a, { keyframes: l }) => l.length > 2 ? ZE : Pa.has(a) ? a.startsWith("scale") ? QE(l[1]) : XE : KE, FE = /* @__PURE__ */ new Set([
  "when",
  "delay",
  "delayChildren",
  "staggerChildren",
  "staggerDirection",
  "repeat",
  "repeatType",
  "repeatDelay",
  "from",
  "elapsed"
]);
function kE(a) {
  for (const l in a)
    if (!FE.has(l))
      return !0;
  return !1;
}
const rh = (a, l, o, r = {}, c, d) => (h) => {
  const y = oh(r, a) || {}, S = y.delay || r.delay || 0;
  let { elapsed: v = 0 } = r;
  v = v - /* @__PURE__ */ Ye(S);
  const g = {
    keyframes: Array.isArray(o) ? o : [null, o],
    ease: "easeOut",
    velocity: l.getVelocity(),
    ...y,
    delay: -v,
    onUpdate: (b) => {
      l.set(b), y.onUpdate && y.onUpdate(b);
    },
    onComplete: () => {
      h(), y.onComplete && y.onComplete();
    },
    name: a,
    motionValue: l,
    element: d ? void 0 : c
  };
  kE(y) || Object.assign(g, JE(a, g)), g.duration && (g.duration = /* @__PURE__ */ Ye(g.duration)), g.repeatDelay && (g.repeatDelay = /* @__PURE__ */ Ye(g.repeatDelay)), g.from !== void 0 && (g.keyframes[0] = g.from);
  let p = !1;
  if ((g.type === !1 || g.duration === 0 && !g.repeatDelay) && (wf(g), g.delay === 0 && (p = !0)), (vi.instantAnimations || vi.skipAnimations || c?.shouldSkipAnimations || y.skipAnimations) && (p = !0, wf(g), g.delay = 0), g.allowFlatten = !y.type && !y.ease, p && !d && l.get() !== void 0) {
    const b = fo(g.keyframes, y);
    if (b !== void 0) {
      Ut.update(() => {
        g.onUpdate(b), g.onComplete();
      });
      return;
    }
  }
  return y.isSync ? new no(g) : new YE(g);
}, PE = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function IE(a) {
  const l = PE.exec(a);
  if (!l)
    return [,];
  const [, o, r, c] = l;
  return [`--${o ?? r}`, c];
}
function ov(a, l, o = 1) {
  const [r, c] = IE(a);
  if (!r)
    return;
  const d = window.getComputedStyle(l).getPropertyValue(r);
  if (d) {
    const h = d.trim();
    return Ag(h) ? parseFloat(h) : h;
  }
  return eh(c) ? ov(c, l, o + 1) : c;
}
function vp(a) {
  const l = [{}, {}];
  return a?.values.forEach((o, r) => {
    l[0][r] = o.get(), l[1][r] = o.getVelocity();
  }), l;
}
function ch(a, l, o, r) {
  if (typeof l == "function") {
    const [c, d] = vp(r);
    l = l(o !== void 0 ? o : a.custom, c, d);
  }
  if (typeof l == "string" && (l = a.variants && a.variants[l]), typeof l == "function") {
    const [c, d] = vp(r);
    l = l(o !== void 0 ? o : a.custom, c, d);
  }
  return l;
}
function ki(a, l, o) {
  const r = a.getProps();
  return ch(r, l, o !== void 0 ? o : r.custom, a);
}
const rv = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...ka
]), Uf = (a) => Array.isArray(a);
function WE(a, l, o) {
  a.hasValue(l) ? a.getValue(l).set(o) : a.addValue(l, Ja(o));
}
function $E(a) {
  return Uf(a) ? a[a.length - 1] || 0 : a;
}
function tA(a, l) {
  const o = ki(a, l);
  let { transitionEnd: r = {}, transition: c = {}, ...d } = o || {};
  d = { ...d, ...r };
  for (const h in d) {
    const y = $E(d[h]);
    WE(a, h, y);
  }
}
const me = (a) => !!(a && a.getVelocity);
function eA(a) {
  return !!(me(a) && a.add);
}
function Bf(a, l) {
  const o = a.getValue("willChange");
  if (eA(o))
    return o.add(l);
  if (!o && vi.WillChange) {
    const r = new vi.WillChange("auto");
    a.addValue("willChange", r), r.add(l);
  }
}
function fh(a) {
  return a.replace(/([A-Z])/g, (l) => `-${l.toLowerCase()}`);
}
const nA = "framerAppearId", cv = "data-" + fh(nA);
function fv(a) {
  return a.props[cv];
}
function iA({ protectedKeys: a, needsAnimating: l }, o) {
  const r = a.hasOwnProperty(o) && l[o] !== !0;
  return l[o] = !1, r;
}
function hv(a, l, { delay: o = 0, transitionOverride: r, type: c } = {}) {
  let { transition: d, transitionEnd: h, ...y } = l;
  const S = a.getDefaultTransition();
  d = d ? uv(d, S) : S;
  const v = d?.reduceMotion, g = d?.skipAnimations;
  r && (d = r);
  const p = [], b = c && a.animationState && a.animationState.getState()[c], N = d?.path;
  N && N.animateVisualElement(a, y, d, o, p);
  for (const z in y) {
    const w = a.getValue(z, a.latestValues[z] ?? null), _ = y[z];
    if (_ === void 0 || b && iA(b, z))
      continue;
    const H = {
      delay: o,
      ...oh(d || {}, z)
    };
    g && (H.skipAnimations = !0);
    const G = w.get();
    if (G !== void 0 && !w.isAnimating() && !Array.isArray(_) && _ === G && !H.velocity) {
      Ut.update(() => w.set(_));
      continue;
    }
    let X = !1;
    if (window.MotionHandoffAnimation) {
      const st = fv(a);
      if (st) {
        const J = window.MotionHandoffAnimation(st, z, Ut);
        J !== null && (H.startTime = J, X = !0);
      }
    }
    Bf(a, z);
    const L = v ?? a.shouldReduceMotion;
    w.start(rh(z, w, _, L && rv.has(z) ? { type: !1 } : H, a, X));
    const k = w.animation;
    k && p.push(k);
  }
  if (h) {
    const z = () => Ut.update(() => {
      h && tA(a, h);
    });
    p.length ? Promise.all(p).then(z) : z();
  }
  return p;
}
function jf(a, l, o = {}) {
  const r = ki(a, l, o.type === "exit" ? a.presenceContext?.custom : void 0);
  let { transition: c = a.getDefaultTransition() || {} } = r || {};
  o.transitionOverride && (c = o.transitionOverride);
  const d = r ? () => Promise.all(hv(a, r, o)) : () => Promise.resolve(), h = a.variantChildren && a.variantChildren.size ? (S = 0) => {
    const { delayChildren: v = 0, staggerChildren: g, staggerDirection: p } = c;
    return aA(a, l, S, v, g, p, o);
  } : () => Promise.resolve(), { when: y } = c;
  if (y) {
    const [S, v] = y === "beforeChildren" ? [d, h] : [h, d];
    return S().then(() => v());
  } else
    return Promise.all([d(), h(o.delay)]);
}
function aA(a, l, o = 0, r = 0, c = 0, d = 1, h) {
  const y = [];
  for (const S of a.variantChildren)
    S.notify("AnimationStart", l), y.push(jf(S, l, {
      ...h,
      delay: o + (typeof r == "function" ? 0 : r) + sv(a.variantChildren, S, r, c, d)
    }).then(() => S.notify("AnimationComplete", l)));
  return Promise.all(y);
}
function lA(a, l, o = {}) {
  a.notify("AnimationStart", l);
  let r;
  if (Array.isArray(l)) {
    const c = l.map((d) => jf(a, d, o));
    r = Promise.all(c);
  } else if (typeof l == "string")
    r = jf(a, l, o);
  else {
    const c = typeof l == "function" ? ki(a, l, o.custom) : l;
    r = Promise.all(hv(a, c, o));
  }
  return r.then(() => {
    a.notify("AnimationComplete", l);
  });
}
const sA = {
  test: (a) => a === "auto",
  parse: (a) => a
}, dv = (a) => (l) => l.test(a), mv = [Fa, et, An, qn, _b, Nb, sA], Sp = (a) => mv.find(dv(a));
function uA(a) {
  return typeof a == "number" ? a === 0 : a !== null ? a === "none" || a === "0" || Mg(a) : !0;
}
const oA = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function rA(a) {
  const [l, o] = a.slice(0, -1).split("(");
  if (l === "drop-shadow")
    return a;
  const [r] = o.match(nh) || [];
  if (!r)
    return a;
  const c = o.replace(r, "");
  let d = oA.has(l) ? 1 : 0;
  return r !== o && (d *= 100), l + "(" + d + c + ")";
}
const cA = /\b([a-z-]*)\(.*?\)/gu, Lf = {
  ...un,
  getAnimatableNone: (a) => {
    const l = a.match(cA);
    return l ? l.map(rA).join(" ") : a;
  }
}, Hf = {
  ...un,
  getAnimatableNone: (a) => {
    const l = un.parse(a);
    return un.createTransformer(a)(l.map((r) => typeof r == "number" ? 0 : typeof r == "object" ? { ...r, alpha: 1 } : r));
  }
}, Tp = {
  ...Fa,
  transform: Math.round
}, fA = {
  rotate: qn,
  /**
   * Internal channel for `transition.path` orientToPath. Composed onto
   * `rotate` at the transform-build sites so the user's `rotate` is
   * never read or overwritten. Not part of `transformPropOrder`.
   */
  pathRotation: qn,
  rotateX: qn,
  rotateY: qn,
  rotateZ: qn,
  scale: Hu,
  scaleX: Hu,
  scaleY: Hu,
  scaleZ: Hu,
  skew: qn,
  skewX: qn,
  skewY: qn,
  distance: et,
  translateX: et,
  translateY: et,
  translateZ: et,
  x: et,
  y: et,
  z: et,
  perspective: et,
  transformPerspective: et,
  opacity: es,
  originX: sp,
  originY: sp,
  originZ: et
}, io = {
  // Border props
  borderWidth: et,
  borderTopWidth: et,
  borderRightWidth: et,
  borderBottomWidth: et,
  borderLeftWidth: et,
  borderRadius: et,
  borderTopLeftRadius: et,
  borderTopRightRadius: et,
  borderBottomRightRadius: et,
  borderBottomLeftRadius: et,
  // Positioning props
  width: et,
  maxWidth: et,
  height: et,
  maxHeight: et,
  top: et,
  right: et,
  bottom: et,
  left: et,
  inset: et,
  insetBlock: et,
  insetBlockStart: et,
  insetBlockEnd: et,
  insetInline: et,
  insetInlineStart: et,
  insetInlineEnd: et,
  // Spacing props
  padding: et,
  paddingTop: et,
  paddingRight: et,
  paddingBottom: et,
  paddingLeft: et,
  paddingBlock: et,
  paddingBlockStart: et,
  paddingBlockEnd: et,
  paddingInline: et,
  paddingInlineStart: et,
  paddingInlineEnd: et,
  margin: et,
  marginTop: et,
  marginRight: et,
  marginBottom: et,
  marginLeft: et,
  marginBlock: et,
  marginBlockStart: et,
  marginBlockEnd: et,
  marginInline: et,
  marginInlineStart: et,
  marginInlineEnd: et,
  // Typography
  fontSize: et,
  // Misc
  backgroundPositionX: et,
  backgroundPositionY: et,
  ...fA,
  zIndex: Tp,
  // SVG
  fillOpacity: es,
  strokeOpacity: es,
  numOctaves: Tp
}, hA = {
  ...io,
  // Color props
  color: Wt,
  backgroundColor: Wt,
  outlineColor: Wt,
  fill: Wt,
  stroke: Wt,
  // Border props
  borderColor: Wt,
  borderTopColor: Wt,
  borderRightColor: Wt,
  borderBottomColor: Wt,
  borderLeftColor: Wt,
  filter: Lf,
  WebkitFilter: Lf,
  mask: Hf,
  WebkitMask: Hf
}, yv = (a) => hA[a], dA = /* @__PURE__ */ new Set([Lf, Hf]);
function pv(a, l) {
  let o = yv(a);
  return dA.has(o) || (o = un), o.getAnimatableNone ? o.getAnimatableNone(l) : void 0;
}
const mA = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function yA(a, l, o) {
  let r = 0, c;
  for (; r < a.length && !c; ) {
    const d = a[r];
    typeof d == "string" && !mA.has(d) && Ka(d).values.length && (c = a[r]), r++;
  }
  if (c && o)
    for (const d of l)
      a[d] = pv(o, c);
}
class pA extends uh {
  constructor(l, o, r, c, d) {
    super(l, o, r, c, d, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: l, element: o, name: r } = this;
    if (!o || !o.current)
      return;
    super.readKeyframes();
    for (let g = 0; g < l.length; g++) {
      let p = l[g];
      if (typeof p == "string" && (p = p.trim(), eh(p))) {
        const b = ov(p, o.current);
        b !== void 0 && (l[g] = b), g === l.length - 1 && (this.finalKeyframe = p);
      }
    }
    if (this.resolveNoneKeyframes(), !rv.has(r) || l.length !== 2)
      return;
    const [c, d] = l, h = Sp(c), y = Sp(d), S = lp(c), v = lp(d);
    if (S !== v && gi[r]) {
      this.needsMeasurement = !0;
      return;
    }
    if (h !== y)
      if (mp(h) && mp(y))
        for (let g = 0; g < l.length; g++) {
          const p = l[g];
          typeof p == "string" && (l[g] = parseFloat(p));
        }
      else gi[r] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: l, name: o } = this, r = [];
    for (let c = 0; c < l.length; c++)
      (l[c] === null || uA(l[c])) && r.push(c);
    r.length && yA(l, r, o);
  }
  measureInitialState() {
    const { element: l, unresolvedKeyframes: o, name: r } = this;
    if (!l || !l.current)
      return;
    r === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = gi[r](l.measureViewportBox(), window.getComputedStyle(l.current)), o[0] = this.measuredOrigin;
    const c = o[o.length - 1];
    c !== void 0 && l.getValue(r, c).jump(c, !1);
  }
  measureEndState() {
    const { element: l, name: o, unresolvedKeyframes: r } = this;
    if (!l || !l.current)
      return;
    const c = l.getValue(o);
    c && c.jump(this.measuredOrigin, !1);
    const d = r.length - 1, h = r[d];
    r[d] = gi[o](l.measureViewportBox(), window.getComputedStyle(l.current)), h !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = h), this.removedTransforms?.length && this.removedTransforms.forEach(([y, S]) => {
      l.getValue(y).set(S);
    }), this.resolveNoneKeyframes();
  }
}
const hh = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius"
];
function gv(a, l, o) {
  if (a == null)
    return [];
  if (a instanceof EventTarget)
    return [a];
  if (typeof a == "string") {
    let r = document;
    const c = o?.[a] ?? r.querySelectorAll(a);
    return c ? Array.from(c) : [];
  }
  return Array.from(a).filter((r) => r != null);
}
const Yf = (a, l) => l && typeof a == "number" ? l.transform(a) : a;
function Qu(a) {
  return xg(a) && "offsetHeight" in a && !("ownerSVGElement" in a);
}
const { schedule: dh } = /* @__PURE__ */ Lg(queueMicrotask, !1), sn = {
  x: !1,
  y: !1
};
function vv() {
  return sn.x || sn.y;
}
function gA(a) {
  return a === "x" || a === "y" ? sn[a] ? null : (sn[a] = !0, () => {
    sn[a] = !1;
  }) : sn.x || sn.y ? null : (sn.x = sn.y = !0, () => {
    sn.x = sn.y = !1;
  });
}
function Sv(a, l) {
  const o = gv(a), r = new AbortController(), c = {
    passive: !0,
    ...l,
    signal: r.signal
  };
  return [o, c, () => r.abort()];
}
function vA(a) {
  return !(a.pointerType === "touch" || vv());
}
function SA(a, l, o = {}) {
  const [r, c, d] = Sv(a, o);
  return r.forEach((h) => {
    let y = !1, S = !1, v;
    const g = () => {
      h.removeEventListener("pointerleave", z);
    }, p = (_) => {
      v && (v(_), v = void 0), g();
    }, b = (_) => {
      y = !1, window.removeEventListener("pointerup", b), window.removeEventListener("pointercancel", b), S && (S = !1, p(_));
    }, N = () => {
      y = !0, window.addEventListener("pointerup", b, c), window.addEventListener("pointercancel", b, c);
    }, z = (_) => {
      if (_.pointerType !== "touch") {
        if (y) {
          S = !0;
          return;
        }
        p(_);
      }
    }, w = (_) => {
      if (!vA(_))
        return;
      S = !1;
      const H = l(h, _);
      typeof H == "function" && (v = H, h.addEventListener("pointerleave", z, c));
    };
    h.addEventListener("pointerenter", w, c), h.addEventListener("pointerdown", N, c);
  }), d;
}
const Tv = (a, l) => l ? a === l ? !0 : Tv(a, l.parentElement) : !1, mh = (a) => a.pointerType === "mouse" ? typeof a.button != "number" || a.button <= 0 : a.isPrimary !== !1, TA = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function bA(a) {
  return TA.has(a.tagName) || a.isContentEditable === !0;
}
const EA = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function AA(a) {
  return EA.has(a.tagName) || a.isContentEditable === !0;
}
const Zu = /* @__PURE__ */ new WeakSet();
function bp(a) {
  return (l) => {
    l.key === "Enter" && a(l);
  };
}
function cf(a, l) {
  a.dispatchEvent(new PointerEvent("pointer" + l, { isPrimary: !0, bubbles: !0 }));
}
const xA = (a, l) => {
  const o = a.currentTarget;
  if (!o)
    return;
  const r = bp(() => {
    if (Zu.has(o))
      return;
    cf(o, "down");
    const c = bp(() => {
      cf(o, "up");
    }), d = () => cf(o, "cancel");
    o.addEventListener("keyup", c, l), o.addEventListener("blur", d, l);
  });
  o.addEventListener("keydown", r, l), o.addEventListener("blur", () => o.removeEventListener("keydown", r), l);
};
function Ep(a) {
  return mh(a) && !vv();
}
const Ap = /* @__PURE__ */ new WeakSet();
function MA(a, l, o = {}) {
  const [r, c, d] = Sv(a, o), h = (y) => {
    const S = y.currentTarget;
    if (!Ep(y) || Ap.has(y))
      return;
    Zu.add(S), o.stopPropagation && Ap.add(y);
    const v = l(S, y), g = { ...c, capture: !0 }, p = (z, w) => {
      window.removeEventListener("pointerup", b, g), window.removeEventListener("pointercancel", N, g), Zu.has(S) && Zu.delete(S), Ep(z) && typeof v == "function" && v(z, { success: w });
    }, b = (z) => {
      p(z, S === window || S === document || o.useGlobalTarget || Tv(S, z.target));
    }, N = (z) => {
      p(z, !1);
    };
    window.addEventListener("pointerup", b, g), window.addEventListener("pointercancel", N, g);
  };
  return r.forEach((y) => {
    (o.useGlobalTarget ? window : y).addEventListener("pointerdown", h, c), Qu(y) && (y.addEventListener("focus", (v) => xA(v, c)), !bA(y) && !y.hasAttribute("tabindex") && (y.tabIndex = 0));
  }), d;
}
function yh(a) {
  return xg(a) && "ownerSVGElement" in a;
}
const Ku = /* @__PURE__ */ new WeakMap();
let Ju;
const bv = (a, l, o) => (r, c) => c && c[0] ? c[0][a + "Size"] : yh(r) && "getBBox" in r ? r.getBBox()[l] : r[o], CA = /* @__PURE__ */ bv("inline", "width", "offsetWidth"), DA = /* @__PURE__ */ bv("block", "height", "offsetHeight");
function zA({ target: a, borderBoxSize: l }) {
  Ku.get(a)?.forEach((o) => {
    o(a, {
      get width() {
        return CA(a, l);
      },
      get height() {
        return DA(a, l);
      }
    });
  });
}
function OA(a) {
  a.forEach(zA);
}
function RA() {
  typeof ResizeObserver > "u" || (Ju = new ResizeObserver(OA));
}
function NA(a, l) {
  Ju || RA();
  const o = gv(a);
  return o.forEach((r) => {
    let c = Ku.get(r);
    c || (c = /* @__PURE__ */ new Set(), Ku.set(r, c)), c.add(l), Ju?.observe(r);
  }), () => {
    o.forEach((r) => {
      const c = Ku.get(r);
      c?.delete(l), c?.size || Ju?.unobserve(r);
    });
  };
}
const Fu = /* @__PURE__ */ new Set();
let Qa;
function _A() {
  Qa = () => {
    const a = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    Fu.forEach((l) => l(a));
  }, window.addEventListener("resize", Qa);
}
function VA(a) {
  return Fu.add(a), Qa || _A(), () => {
    Fu.delete(a), !Fu.size && typeof Qa == "function" && (window.removeEventListener("resize", Qa), Qa = void 0);
  };
}
function xp(a, l) {
  return typeof a == "function" ? VA(a) : NA(a, l);
}
function wA(a) {
  return yh(a) && a.tagName === "svg";
}
const UA = [...mv, Wt, un], BA = (a) => UA.find(dv(a)), Mp = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), Za = () => ({
  x: Mp(),
  y: Mp()
}), Cp = () => ({ min: 0, max: 0 }), te = () => ({
  x: Cp(),
  y: Cp()
}), jA = /* @__PURE__ */ new WeakMap();
function ho(a) {
  return a !== null && typeof a == "object" && typeof a.start == "function";
}
function ns(a) {
  return typeof a == "string" || Array.isArray(a);
}
const ph = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], gh = ["initial", ...ph];
function mo(a) {
  return ho(a.animate) || gh.some((l) => ns(a[l]));
}
function Ev(a) {
  return !!(mo(a) || a.variants);
}
function LA(a, l, o) {
  for (const r in l) {
    const c = l[r], d = o[r];
    if (me(c))
      a.addValue(r, c);
    else if (me(d))
      a.addValue(r, Ja(c, { owner: a }));
    else if (d !== c)
      if (a.hasValue(r)) {
        const h = a.getValue(r);
        h.liveStyle === !0 ? h.jump(c) : h.hasAnimated || h.set(c);
      } else {
        const h = a.getStaticValue(r);
        a.addValue(r, Ja(h !== void 0 ? h : c, { owner: a }));
      }
  }
  for (const r in o)
    l[r] === void 0 && a.removeValue(r);
  return l;
}
const ao = { current: null }, vh = { current: !1 }, HA = typeof window < "u";
function Av() {
  if (vh.current = !0, !!HA)
    if (window.matchMedia) {
      const a = window.matchMedia("(prefers-reduced-motion)"), l = () => ao.current = a.matches;
      a.addEventListener("change", l), l();
    } else
      ao.current = !1;
}
const Dp = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let lo = {};
function xv(a) {
  lo = a;
}
function YA() {
  return lo;
}
class qA {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(l, o, r) {
    return {};
  }
  constructor({ parent: l, props: o, presenceContext: r, reducedMotionConfig: c, skipAnimations: d, blockInitialAnimation: h, visualState: y }, S = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = uh, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const N = Te.now();
      this.renderScheduledAt < N && (this.renderScheduledAt = N, Ut.render(this.render, !1, !0));
    };
    const { latestValues: v, renderState: g } = y;
    this.latestValues = v, this.baseTarget = { ...v }, this.initialValues = o.initial ? { ...v } : {}, this.renderState = g, this.parent = l, this.props = o, this.presenceContext = r, this.depth = l ? l.depth + 1 : 0, this.reducedMotionConfig = c, this.skipAnimationsConfig = d, this.options = S, this.blockInitialAnimation = !!h, this.isControllingVariants = mo(o), this.isVariantNode = Ev(o), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(l && l.current);
    const { willChange: p, ...b } = this.scrapeMotionValuesFromProps(o, {}, this);
    for (const N in b) {
      const z = b[N];
      v[N] !== void 0 && me(z) && z.set(v[N]);
    }
  }
  mount(l) {
    if (this.hasBeenMounted)
      for (const o in this.initialValues)
        this.values.get(o)?.jump(this.initialValues[o]), this.latestValues[o] = this.initialValues[o];
    this.current = l, jA.set(l, this), this.projection && !this.projection.instance && this.projection.mount(l), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((o, r) => this.bindToMotionValue(r, o)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (vh.current || Av(), this.shouldReduceMotion = ao.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), Si(this.notifyUpdate), Si(this.render), this.valueSubscriptions.forEach((l) => l()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
    for (const l in this.events)
      this.events[l].clear();
    for (const l in this.features) {
      const o = this.features[l];
      o && (o.unmount(), o.isMounted = !1);
    }
    this.current = null;
  }
  addChild(l) {
    this.children.add(l), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(l);
  }
  removeChild(l) {
    this.children.delete(l), this.enteringChildren && this.enteringChildren.delete(l);
  }
  bindToMotionValue(l, o) {
    if (this.valueSubscriptions.has(l) && this.valueSubscriptions.get(l)(), o.accelerate && lv.has(l) && this.current instanceof HTMLElement) {
      const { factory: h, keyframes: y, times: S, ease: v, duration: g } = o.accelerate, p = new iv({
        element: this.current,
        name: l,
        keyframes: y,
        times: S,
        ease: v,
        duration: /* @__PURE__ */ Ye(g)
      }), b = h(p);
      this.valueSubscriptions.set(l, () => {
        b(), p.cancel();
      });
      return;
    }
    const r = Pa.has(l);
    r && this.onBindTransform && this.onBindTransform();
    const c = o.on("change", (h) => {
      this.latestValues[l] = h, this.props.onUpdate && Ut.preRender(this.notifyUpdate), r && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let d;
    typeof window < "u" && window.MotionCheckAppearSync && (d = window.MotionCheckAppearSync(this, l, o)), this.valueSubscriptions.set(l, () => {
      c(), d && d();
    });
  }
  sortNodePosition(l) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== l.type ? 0 : this.sortInstanceNodePosition(this.current, l.current);
  }
  updateFeatures() {
    let l = "animation";
    for (l in lo) {
      const o = lo[l];
      if (!o)
        continue;
      const { isEnabled: r, Feature: c } = o;
      if (!this.features[l] && c && r(this.props) && (this.features[l] = new c(this)), this.features[l]) {
        const d = this.features[l];
        d.isMounted ? d.update() : (d.mount(), d.isMounted = !0);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : te();
  }
  getStaticValue(l) {
    return this.latestValues[l];
  }
  setStaticValue(l, o) {
    this.latestValues[l] = o;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(l, o) {
    (l.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = l, this.prevPresenceContext = this.presenceContext, this.presenceContext = o;
    for (let r = 0; r < Dp.length; r++) {
      const c = Dp[r];
      this.propEventSubscriptions[c] && (this.propEventSubscriptions[c](), delete this.propEventSubscriptions[c]);
      const d = "on" + c, h = l[d];
      h && (this.propEventSubscriptions[c] = this.on(c, h));
    }
    this.prevMotionValues = LA(this, this.scrapeMotionValuesFromProps(l, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(l) {
    return this.props.variants ? this.props.variants[l] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(l) {
    const o = this.getClosestVariantNode();
    if (o)
      return o.variantChildren && o.variantChildren.add(l), () => o.variantChildren.delete(l);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(l, o) {
    const r = this.values.get(l);
    o !== r && (r && this.removeValue(l), this.bindToMotionValue(l, o), this.values.set(l, o), this.latestValues[l] = o.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(l) {
    this.values.delete(l);
    const o = this.valueSubscriptions.get(l);
    o && (o(), this.valueSubscriptions.delete(l)), delete this.latestValues[l], this.removeValueFromRenderState(l, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(l) {
    return this.values.has(l);
  }
  getValue(l, o) {
    if (this.props.values && this.props.values[l])
      return this.props.values[l];
    let r = this.values.get(l);
    return r === void 0 && o !== void 0 && (r = Ja(o === null ? void 0 : o, { owner: this }), this.addValue(l, r)), r;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(l, o) {
    let r = this.latestValues[l] !== void 0 || !this.current ? this.latestValues[l] : this.getBaseTargetFromProps(this.props, l) ?? this.readValueFromInstance(this.current, l, this.options);
    return r != null && (typeof r == "string" && (Ag(r) || Mg(r)) ? r = parseFloat(r) : !BA(r) && un.test(o) && (r = pv(l, o)), this.setBaseTarget(l, me(r) ? r.get() : r)), me(r) ? r.get() : r;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(l, o) {
    this.baseTarget[l] = o;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(l) {
    const { initial: o } = this.props;
    let r;
    if (typeof o == "string" || typeof o == "object") {
      const d = ch(this.props, o, this.presenceContext?.custom);
      d && (r = d[l]);
    }
    if (o && r !== void 0)
      return r;
    const c = this.getBaseTargetFromProps(this.props, l);
    return c !== void 0 && !me(c) ? c : this.initialValues[l] !== void 0 && r === void 0 ? void 0 : this.baseTarget[l];
  }
  on(l, o) {
    return this.events[l] || (this.events[l] = new Wf()), this.events[l].add(o);
  }
  notify(l, ...o) {
    this.events[l] && this.events[l].notify(...o);
  }
  scheduleRenderMicrotask() {
    dh.render(this.render);
  }
}
class Mv extends qA {
  constructor() {
    super(...arguments), this.KeyframeResolver = pA;
  }
  sortInstanceNodePosition(l, o) {
    return l.compareDocumentPosition(o) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(l, o) {
    const r = l.style;
    return r ? r[o] : void 0;
  }
  removeValueFromRenderState(l, { vars: o, style: r }) {
    delete o[l], delete r[l];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: l } = this.props;
    me(l) && (this.childSubscription = l.on("change", (o) => {
      this.current && (this.current.textContent = `${o}`);
    }));
  }
}
class Ti {
  constructor(l) {
    this.isMounted = !1, this.node = l;
  }
  update() {
  }
}
function Cv({ top: a, left: l, right: o, bottom: r }) {
  return {
    x: { min: l, max: o },
    y: { min: a, max: r }
  };
}
function GA({ x: a, y: l }) {
  return { top: l.min, right: a.max, bottom: l.max, left: a.min };
}
function XA(a, l) {
  if (!l)
    return a;
  const o = l({ x: a.left, y: a.top }), r = l({ x: a.right, y: a.bottom });
  return {
    top: o.y,
    left: o.x,
    bottom: r.y,
    right: r.x
  };
}
function ff(a) {
  return a === void 0 || a === 1;
}
function qf({ scale: a, scaleX: l, scaleY: o }) {
  return !ff(a) || !ff(l) || !ff(o);
}
function Zi(a) {
  return qf(a) || Dv(a) || a.z || a.rotate || a.rotateX || a.rotateY || a.skewX || a.skewY;
}
function Dv(a) {
  return zp(a.x) || zp(a.y);
}
function zp(a) {
  return a && a !== "0%";
}
function so(a, l, o) {
  const r = a - o, c = l * r;
  return o + c;
}
function Op(a, l, o, r, c) {
  return c !== void 0 && (a = so(a, c, r)), so(a, o, r) + l;
}
function Gf(a, l = 0, o = 1, r, c) {
  a.min = Op(a.min, l, o, r, c), a.max = Op(a.max, l, o, r, c);
}
function zv(a, { x: l, y: o }) {
  Gf(a.x, l.translate, l.scale, l.originPoint), Gf(a.y, o.translate, o.scale, o.originPoint);
}
const Rp = 0.999999999999, Np = 1.0000000000001;
function QA(a, l, o, r = !1) {
  const c = o.length;
  if (!c)
    return;
  l.x = l.y = 1;
  let d, h;
  for (let y = 0; y < c; y++) {
    d = o[y], h = d.projectionDelta;
    const { visualElement: S } = d.options;
    S && S.props.style && S.props.style.display === "contents" || (r && d.options.layoutScroll && d.scroll && d !== d.root && (En(a.x, -d.scroll.offset.x), En(a.y, -d.scroll.offset.y)), h && (l.x *= h.x.scale, l.y *= h.y.scale, zv(a, h)), r && Zi(d.latestValues) && ku(a, d.latestValues, d.layout?.layoutBox));
  }
  l.x < Np && l.x > Rp && (l.x = 1), l.y < Np && l.y > Rp && (l.y = 1);
}
function En(a, l) {
  a.min += l, a.max += l;
}
function _p(a, l, o, r, c = 0.5) {
  const d = wt(a.min, a.max, c);
  Gf(a, l, o, d, r);
}
function Vp(a, l) {
  return typeof a == "string" ? parseFloat(a) / 100 * (l.max - l.min) : a;
}
function ku(a, l, o) {
  const r = o ?? a;
  _p(a.x, Vp(l.x, r.x), l.scaleX, l.scale, l.originX), _p(a.y, Vp(l.y, r.y), l.scaleY, l.scale, l.originY);
}
function Ov(a, l) {
  return Cv(XA(a.getBoundingClientRect(), l));
}
function ZA(a, l, o) {
  const r = Ov(a, o), { scroll: c } = l;
  return c && (En(r.x, c.offset.x), En(r.y, c.offset.y)), r;
}
const KA = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, JA = ka.length;
function FA(a, l, o) {
  let r = "", c = !0;
  for (let h = 0; h < JA; h++) {
    const y = ka[h], S = a[y];
    if (S === void 0)
      continue;
    let v = !0;
    if (typeof S == "number")
      v = S === (y.startsWith("scale") ? 1 : 0);
    else {
      const g = parseFloat(S);
      v = y.startsWith("scale") ? g === 1 : g === 0;
    }
    if (!v || o) {
      const g = Yf(S, io[y]);
      if (!v) {
        c = !1;
        const p = KA[y] || y;
        r += `${p}(${g}) `;
      }
      o && (l[y] = g);
    }
  }
  const d = a.pathRotation;
  return d && (c = !1, r += `rotate(${Yf(d, io.pathRotation)}) `), r = r.trim(), o ? r = o(l, c ? "" : r) : c && (r = "none"), r;
}
function Sh(a, l, o) {
  const { style: r, vars: c, transformOrigin: d } = a;
  let h = !1, y = !1;
  for (const S in l) {
    const v = l[S];
    if (Pa.has(S)) {
      h = !0;
      continue;
    } else if (Yg(S)) {
      c[S] = v;
      continue;
    } else {
      const g = Yf(v, io[S]);
      S.startsWith("origin") ? (y = !0, d[S] = g) : r[S] = g;
    }
  }
  if (l.transform || (h || o ? r.transform = FA(l, a.transform, o) : r.transform && (r.transform = "none")), y) {
    const { originX: S = "50%", originY: v = "50%", originZ: g = 0 } = d;
    r.transformOrigin = `${S} ${v} ${g}`;
  }
}
function Rv(a, { style: l, vars: o }, r, c) {
  const d = a.style;
  let h;
  for (h in l)
    d[h] = l[h];
  c?.applyProjectionStyles(d, r);
  for (h in o)
    d.setProperty(h, o[h]);
}
function wp(a, l) {
  return l.max === l.min ? 0 : a / (l.max - l.min) * 100;
}
const Jl = {
  correct: (a, l) => {
    if (!l.target)
      return a;
    if (typeof a == "string")
      if (et.test(a))
        a = parseFloat(a);
      else
        return a;
    const o = wp(a, l.target.x), r = wp(a, l.target.y);
    return `${o}% ${r}%`;
  }
}, kA = {
  correct: (a, { treeScale: l, projectionDelta: o }) => {
    const r = a, c = un.parse(a);
    if (c.length > 5)
      return r;
    const d = un.createTransformer(a), h = typeof c[0] != "number" ? 1 : 0, y = o.x.scale * l.x, S = o.y.scale * l.y;
    c[0 + h] /= y, c[1 + h] /= S;
    const v = wt(y, S, 0.5);
    return typeof c[2 + h] == "number" && (c[2 + h] /= v), typeof c[3 + h] == "number" && (c[3 + h] /= v), d(c);
  }
}, Xf = {
  borderRadius: {
    ...Jl,
    applyTo: [...hh]
  },
  borderTopLeftRadius: Jl,
  borderTopRightRadius: Jl,
  borderBottomLeftRadius: Jl,
  borderBottomRightRadius: Jl,
  boxShadow: kA
};
function Nv(a, { layout: l, layoutId: o }) {
  return Pa.has(a) || a.startsWith("origin") || (l || o !== void 0) && (!!Xf[a] || a === "opacity");
}
function Th(a, l, o) {
  const r = a.style, c = l?.style, d = {};
  if (!r)
    return d;
  for (const h in r)
    (me(r[h]) || c && me(c[h]) || Nv(h, a) || o?.getValue(h)?.liveStyle !== void 0) && (d[h] = r[h]);
  return d;
}
function PA(a) {
  return window.getComputedStyle(a);
}
class IA extends Mv {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = Rv;
  }
  mount(l) {
    co(!!l.style), super.mount(l);
  }
  readValueFromInstance(l, o) {
    if (Pa.has(o))
      return this.projection?.isProjecting ? Of(o) : vE(l, o);
    {
      const r = PA(l), c = (Yg(o) ? r.getPropertyValue(o) : r[o]) || 0;
      return typeof c == "string" ? c.trim() : c;
    }
  }
  measureInstanceViewportBox(l, { transformPagePoint: o }) {
    return Ov(l, o);
  }
  build(l, o, r) {
    Sh(l, o, r.transformTemplate);
  }
  scrapeMotionValuesFromProps(l, o, r) {
    return Th(l, o, r);
  }
}
const WA = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, $A = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function tx(a, l, o = 1, r = 0, c = !0) {
  a.pathLength = 1;
  const d = c ? WA : $A;
  a[d.offset] = `${-r}`, a[d.array] = `${l} ${o}`;
}
const ex = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function _v(a, {
  attrX: l,
  attrY: o,
  attrScale: r,
  pathLength: c,
  pathSpacing: d = 1,
  pathOffset: h = 0,
  // This is object creation, which we try to avoid per-frame.
  ...y
}, S, v, g) {
  if (Sh(a, y, v), S) {
    a.style.viewBox && (a.attrs.viewBox = a.style.viewBox);
    return;
  }
  a.attrs = a.style, a.style = {};
  const { attrs: p, style: b } = a;
  p.transform && (b.transform = p.transform, delete p.transform), (b.transform || p.transformOrigin) && (b.transformOrigin = p.transformOrigin ?? "50% 50%", delete p.transformOrigin), b.transform && (b.transformBox = g?.transformBox ?? "fill-box", delete p.transformBox);
  for (const N of ex)
    p[N] !== void 0 && (b[N] = p[N], delete p[N]);
  l !== void 0 && (p.x = l), o !== void 0 && (p.y = o), r !== void 0 && (p.scale = r), c !== void 0 && tx(p, c, d, h, !1);
}
const Vv = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]), wv = (a) => typeof a == "string" && a.toLowerCase() === "svg";
function nx(a, l, o, r) {
  Rv(a, l, void 0, r);
  for (const c in l.attrs)
    a.setAttribute(Vv.has(c) ? c : fh(c), l.attrs[c]);
}
function Uv(a, l, o) {
  const r = Th(a, l, o);
  for (const c in a)
    if (me(a[c]) || me(l[c])) {
      const d = ka.indexOf(c) !== -1 ? "attr" + c.charAt(0).toUpperCase() + c.substring(1) : c;
      r[d] = a[c];
    }
  return r;
}
class ix extends Mv {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = te;
  }
  getBaseTargetFromProps(l, o) {
    return l[o];
  }
  readValueFromInstance(l, o) {
    if (Pa.has(o)) {
      const r = yv(o);
      return r && r.default || 0;
    }
    return o = Vv.has(o) ? o : fh(o), l.getAttribute(o);
  }
  scrapeMotionValuesFromProps(l, o, r) {
    return Uv(l, o, r);
  }
  build(l, o, r) {
    _v(l, o, this.isSVGTag, r.transformTemplate, r.style);
  }
  renderInstance(l, o, r, c) {
    nx(l, o, r, c);
  }
  mount(l) {
    this.isSVGTag = wv(l.tagName), super.mount(l);
  }
}
const ax = gh.length;
function Bv(a) {
  if (!a)
    return;
  if (!a.isControllingVariants) {
    const o = a.parent ? Bv(a.parent) || {} : {};
    return a.props.initial !== void 0 && (o.initial = a.props.initial), o;
  }
  const l = {};
  for (let o = 0; o < ax; o++) {
    const r = gh[o], c = a.props[r];
    (ns(c) || c === !1) && (l[r] = c);
  }
  return l;
}
function jv(a, l) {
  if (!Array.isArray(l))
    return !1;
  const o = l.length;
  if (o !== a.length)
    return !1;
  for (let r = 0; r < o; r++)
    if (l[r] !== a[r])
      return !1;
  return !0;
}
const lx = [...ph].reverse(), sx = ph.length;
function ux(a) {
  return (l) => Promise.all(l.map(({ animation: o, options: r }) => lA(a, o, r)));
}
function ox(a) {
  let l = ux(a), o = Up(), r = !0, c = !1;
  const d = (v) => (g, p) => {
    const b = ki(a, p, v === "exit" ? a.presenceContext?.custom : void 0);
    if (b) {
      const { transition: N, transitionEnd: z, ...w } = b;
      g = { ...g, ...w, ...z };
    }
    return g;
  };
  function h(v) {
    l = v(a);
  }
  function y(v) {
    const { props: g } = a, p = Bv(a.parent) || {}, b = [], N = /* @__PURE__ */ new Set();
    let z = {}, w = 1 / 0;
    for (let H = 0; H < sx; H++) {
      const G = lx[H], X = o[G], L = g[G] !== void 0 ? g[G] : p[G], k = ns(L), st = G === v ? X.isActive : null;
      st === !1 && (w = H);
      let J = L === p[G] && L !== g[G] && k;
      if (J && (r || c) && a.manuallyAnimateOnMount && (J = !1), X.protectedKeys = { ...z }, // If it isn't active and hasn't *just* been set as inactive
      !X.isActive && st === null || // If we didn't and don't have any defined prop for this animation type
      !L && !X.prevProp || // Or if the prop doesn't define an animation
      ho(L) || typeof L == "boolean")
        continue;
      if (G === "exit" && X.isActive && st !== !0) {
        X.prevResolvedValues && (z = {
          ...z,
          ...X.prevResolvedValues
        });
        continue;
      }
      const Q = rx(X.prevProp, L);
      let ot = Q || // If we're making this variant active, we want to always make it active
      G === v && X.isActive && !J && k || // If we removed a higher-priority variant (i is in reverse order)
      H > w && k, W = !1;
      const dt = Array.isArray(L) ? L : [L];
      let Tt = dt.reduce(d(G), {});
      st === !1 && (Tt = {});
      const { prevResolvedValues: Yt = {} } = X, qt = {
        ...Yt,
        ...Tt
      }, Ct = (j) => {
        ot = !0, N.has(j) && (W = !0, N.delete(j)), X.needsAnimating[j] = !0;
        const P = a.getValue(j);
        P && (P.liveStyle = !1);
      };
      for (const j in qt) {
        const P = Tt[j], F = Yt[j];
        if (z.hasOwnProperty(j))
          continue;
        let Dt = !1;
        Uf(P) && Uf(F) ? Dt = !jv(P, F) || Q : Dt = P !== F, Dt ? P != null ? Ct(j) : N.add(j) : P !== void 0 && N.has(j) ? Ct(j) : X.protectedKeys[j] = !0;
      }
      X.prevProp = L, X.prevResolvedValues = Tt, X.isActive && (z = { ...z, ...Tt }), (r || c) && a.blockInitialAnimation && (ot = !1);
      const Z = J && Q;
      ot && (!Z || W) && b.push(...dt.map((j) => {
        const P = { type: G };
        if (typeof j == "string" && (r || c) && !Z && a.manuallyAnimateOnMount && a.parent) {
          const { parent: F } = a, Dt = ki(F, j);
          if (F.enteringChildren && Dt) {
            const { delayChildren: Bt } = Dt.transition || {};
            P.delay = sv(F.enteringChildren, a, Bt);
          }
        }
        return {
          animation: j,
          options: P
        };
      }));
    }
    if (N.size) {
      const H = {};
      if (typeof g.initial != "boolean") {
        const G = ki(a, Array.isArray(g.initial) ? g.initial[0] : g.initial);
        G && G.transition && (H.transition = G.transition);
      }
      N.forEach((G) => {
        const X = a.getBaseTarget(G), L = a.getValue(G);
        L && (L.liveStyle = !0), H[G] = X ?? null;
      }), b.push({ animation: H });
    }
    let _ = !!b.length;
    return r && (g.initial === !1 || g.initial === g.animate) && !a.manuallyAnimateOnMount && (_ = !1), r = !1, c = !1, _ ? l(b) : Promise.resolve();
  }
  function S(v, g) {
    if (o[v].isActive === g)
      return Promise.resolve();
    a.variantChildren?.forEach((b) => b.animationState?.setActive(v, g)), o[v].isActive = g;
    const p = y(v);
    for (const b in o)
      o[b].protectedKeys = {};
    return p;
  }
  return {
    animateChanges: y,
    setActive: S,
    setAnimateFunction: h,
    getState: () => o,
    reset: () => {
      o = Up(), c = !0;
    }
  };
}
function rx(a, l) {
  return typeof l == "string" ? l !== a : Array.isArray(l) ? !jv(l, a) : !1;
}
function Qi(a = !1) {
  return {
    isActive: a,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function Up() {
  return {
    animate: Qi(!0),
    whileInView: Qi(),
    whileHover: Qi(),
    whileTap: Qi(),
    whileDrag: Qi(),
    whileFocus: Qi(),
    exit: Qi()
  };
}
function Qf(a, l) {
  a.min = l.min, a.max = l.max;
}
function ln(a, l) {
  Qf(a.x, l.x), Qf(a.y, l.y);
}
function Bp(a, l) {
  a.translate = l.translate, a.scale = l.scale, a.originPoint = l.originPoint, a.origin = l.origin;
}
const Lv = 1e-4, cx = 1 - Lv, fx = 1 + Lv, Hv = 0.01, hx = 0 - Hv, dx = 0 + Hv;
function be(a) {
  return a.max - a.min;
}
function mx(a, l, o) {
  return Math.abs(a - l) <= o;
}
function jp(a, l, o, r = 0.5) {
  a.origin = r, a.originPoint = wt(l.min, l.max, a.origin), a.scale = be(o) / be(l), a.translate = wt(o.min, o.max, a.origin) - a.originPoint, (a.scale >= cx && a.scale <= fx || isNaN(a.scale)) && (a.scale = 1), (a.translate >= hx && a.translate <= dx || isNaN(a.translate)) && (a.translate = 0);
}
function Wl(a, l, o, r) {
  jp(a.x, l.x, o.x, r ? r.originX : void 0), jp(a.y, l.y, o.y, r ? r.originY : void 0);
}
function Lp(a, l, o, r = 0) {
  const c = r ? wt(o.min, o.max, r) : o.min;
  a.min = c + l.min, a.max = a.min + be(l);
}
function yx(a, l, o, r) {
  Lp(a.x, l.x, o.x, r?.x), Lp(a.y, l.y, o.y, r?.y);
}
function Hp(a, l, o, r = 0) {
  const c = r ? wt(o.min, o.max, r) : o.min;
  a.min = l.min - c, a.max = a.min + be(l);
}
function uo(a, l, o, r) {
  Hp(a.x, l.x, o.x, r?.x), Hp(a.y, l.y, o.y, r?.y);
}
function Yp(a, l, o, r, c) {
  return a -= l, a = so(a, 1 / o, r), c !== void 0 && (a = so(a, 1 / c, r)), a;
}
function px(a, l = 0, o = 1, r = 0.5, c, d = a, h = a) {
  if (An.test(l) && (l = parseFloat(l), l = wt(h.min, h.max, l / 100) - h.min), typeof l != "number")
    return;
  let y = wt(d.min, d.max, r);
  a === d && (y -= l), a.min = Yp(a.min, l, o, y, c), a.max = Yp(a.max, l, o, y, c);
}
function qp(a, l, [o, r, c], d, h) {
  px(a, l[o], l[r], l[c], l.scale, d, h);
}
const gx = ["x", "scaleX", "originX"], vx = ["y", "scaleY", "originY"];
function Gp(a, l, o, r) {
  qp(a.x, l, gx, o ? o.x : void 0, r ? r.x : void 0), qp(a.y, l, vx, o ? o.y : void 0, r ? r.y : void 0);
}
function Xp(a) {
  return a.translate === 0 && a.scale === 1;
}
function Yv(a) {
  return Xp(a.x) && Xp(a.y);
}
function Qp(a, l) {
  return a.min === l.min && a.max === l.max;
}
function Sx(a, l) {
  return Qp(a.x, l.x) && Qp(a.y, l.y);
}
function Zp(a, l) {
  return Math.round(a.min) === Math.round(l.min) && Math.round(a.max) === Math.round(l.max);
}
function qv(a, l) {
  return Zp(a.x, l.x) && Zp(a.y, l.y);
}
function Kp(a) {
  return be(a.x) / be(a.y);
}
function Jp(a, l) {
  return a.translate === l.translate && a.scale === l.scale && a.originPoint === l.originPoint;
}
function bn(a) {
  return [a("x"), a("y")];
}
function Tx(a, l, o) {
  let r = "";
  const c = a.x.translate / l.x, d = a.y.translate / l.y, h = o?.z || 0;
  if ((c || d || h) && (r = `translate3d(${c}px, ${d}px, ${h}px) `), (l.x !== 1 || l.y !== 1) && (r += `scale(${1 / l.x}, ${1 / l.y}) `), o) {
    const { transformPerspective: v, rotate: g, pathRotation: p, rotateX: b, rotateY: N, skewX: z, skewY: w } = o;
    v && (r = `perspective(${v}px) ${r}`), g && (r += `rotate(${g}deg) `), p && (r += `rotate(${p}deg) `), b && (r += `rotateX(${b}deg) `), N && (r += `rotateY(${N}deg) `), z && (r += `skewX(${z}deg) `), w && (r += `skewY(${w}deg) `);
  }
  const y = a.x.scale * l.x, S = a.y.scale * l.y;
  return (y !== 1 || S !== 1) && (r += `scale(${y}, ${S})`), r || "none";
}
const bx = hh.length, Fp = (a) => typeof a == "string" ? parseFloat(a) : a, kp = (a) => typeof a == "number" || et.test(a);
function Ex(a, l, o, r, c, d) {
  c ? (a.opacity = wt(0, o.opacity ?? 1, Ax(r)), a.opacityExit = wt(l.opacity ?? 1, 0, xx(r))) : d && (a.opacity = wt(l.opacity ?? 1, o.opacity ?? 1, r));
  for (let h = 0; h < bx; h++) {
    const y = hh[h];
    let S = Pp(l, y), v = Pp(o, y);
    if (S === void 0 && v === void 0)
      continue;
    S || (S = 0), v || (v = 0), S === 0 || v === 0 || kp(S) === kp(v) ? (a[y] = Math.max(wt(Fp(S), Fp(v), r), 0), (An.test(v) || An.test(S)) && (a[y] += "%")) : a[y] = v;
  }
  (l.rotate || o.rotate) && (a.rotate = wt(l.rotate || 0, o.rotate || 0, r));
}
function Pp(a, l) {
  return a[l] !== void 0 ? a[l] : a.borderRadius;
}
const Ax = /* @__PURE__ */ Gv(0, 0.5, wg), xx = /* @__PURE__ */ Gv(0.5, 0.95, Ie);
function Gv(a, l, o) {
  return (r) => r < a ? 0 : r > l ? 1 : o(/* @__PURE__ */ ts(a, l, r));
}
function Mx(a, l, o) {
  const r = me(a) ? a : Ja(a);
  return r.start(rh("", r, l, o)), r.animation;
}
function is(a, l, o, r = { passive: !0 }) {
  return a.addEventListener(l, o, r), () => a.removeEventListener(l, o, r);
}
const Cx = (a, l) => a.depth - l.depth;
class Dx {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(l) {
    If(this.children, l), this.isDirty = !0;
  }
  remove(l) {
    Wu(this.children, l), this.isDirty = !0;
  }
  forEach(l) {
    this.isDirty && this.children.sort(Cx), this.isDirty = !1, this.children.forEach(l);
  }
}
function zx(a, l) {
  const o = Te.now(), r = ({ timestamp: c }) => {
    const d = c - o;
    d >= l && (Si(r), a(d - l));
  };
  return Ut.setup(r, !0), () => Si(r);
}
function Pu(a) {
  return me(a) ? a.get() : a;
}
class Ox {
  constructor() {
    this.members = [];
  }
  add(l) {
    If(this.members, l);
    for (let o = this.members.length - 1; o >= 0; o--) {
      const r = this.members[o];
      if (r === l || r === this.lead || r === this.prevLead)
        continue;
      const c = r.instance;
      (!c || c.isConnected === !1) && !r.snapshot && (Wu(this.members, r), r.unmount());
    }
    l.scheduleRender();
  }
  remove(l) {
    if (Wu(this.members, l), l === this.prevLead && (this.prevLead = void 0), l === this.lead) {
      const o = this.members[this.members.length - 1];
      o && this.promote(o);
    }
  }
  relegate(l) {
    for (let o = this.members.indexOf(l) - 1; o >= 0; o--) {
      const r = this.members[o];
      if (r.isPresent !== !1 && r.instance?.isConnected !== !1)
        return this.promote(r), !0;
    }
    return !1;
  }
  promote(l, o) {
    const r = this.lead;
    if (l !== r && (this.prevLead = r, this.lead = l, l.show(), r)) {
      r.updateSnapshot(), l.scheduleRender();
      const { layoutDependency: c } = r.options, { layoutDependency: d } = l.options;
      (c === void 0 || c !== d) && (l.resumeFrom = r, o && (r.preserveOpacity = !0), r.snapshot && (l.snapshot = r.snapshot, l.snapshot.latestValues = r.animationValues || r.latestValues), l.root?.isUpdating && (l.isLayoutDirty = !0)), l.options.crossfade === !1 && r.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((l) => {
      l.options.onExitComplete?.(), l.resumingFrom?.options.onExitComplete?.();
    });
  }
  scheduleRender() {
    this.members.forEach((l) => l.instance && l.scheduleRender(!1));
  }
  removeLeadSnapshot() {
    this.lead?.snapshot && (this.lead.snapshot = void 0);
  }
}
const Iu = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1
}, hf = ["", "X", "Y", "Z"], Rx = 1e3;
let Nx = 0;
function df(a, l, o, r) {
  const { latestValues: c } = l;
  c[a] && (o[a] = c[a], l.setStaticValue(a, 0), r && (r[a] = 0));
}
function Xv(a) {
  if (a.hasCheckedOptimisedAppear = !0, a.root === a)
    return;
  const { visualElement: l } = a.options;
  if (!l)
    return;
  const o = fv(l);
  if (window.MotionHasOptimisedAnimation(o, "transform")) {
    const { layout: c, layoutId: d } = a.options;
    window.MotionCancelOptimisedAnimation(o, "transform", Ut, !(c || d));
  }
  const { parent: r } = a;
  r && !r.hasCheckedOptimisedAppear && Xv(r);
}
function Qv({ attachResizeListener: a, defaultParent: l, measureScroll: o, checkIsScrollRoot: r, resetTransform: c }) {
  return class {
    constructor(h = {}, y = l?.()) {
      this.id = Nx++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(wx), this.nodes.forEach(Yx), this.nodes.forEach(qx), this.nodes.forEach(Ux);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = h, this.root = y ? y.root || y : this, this.path = y ? [...y.path, y] : [], this.parent = y, this.depth = y ? y.depth + 1 : 0;
      for (let S = 0; S < this.path.length; S++)
        this.path[S].shouldResetTransform = !0;
      this.root === this && (this.nodes = new Dx());
    }
    addEventListener(h, y) {
      return this.eventHandlers.has(h) || this.eventHandlers.set(h, new Wf()), this.eventHandlers.get(h).add(y);
    }
    notifyListeners(h, ...y) {
      const S = this.eventHandlers.get(h);
      S && S.notify(...y);
    }
    hasListeners(h) {
      return this.eventHandlers.has(h);
    }
    /**
     * Lifecycles
     */
    mount(h) {
      if (this.instance)
        return;
      this.isSVG = yh(h) && !wA(h), this.instance = h;
      const { layoutId: y, layout: S, visualElement: v } = this.options;
      if (v && !v.current && v.mount(h), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (S || y) && (this.isLayoutDirty = !0), a) {
        let g, p = 0;
        const b = () => this.root.updateBlockedByResize = !1;
        Ut.read(() => {
          p = window.innerWidth;
        }), a(h, () => {
          const N = window.innerWidth;
          N !== p && (p = N, this.root.updateBlockedByResize = !0, g && g(), g = zx(b, 250), Iu.hasAnimatedSinceResize && (Iu.hasAnimatedSinceResize = !1, this.nodes.forEach($p)));
        });
      }
      y && this.root.registerSharedNode(y, this), this.options.animate !== !1 && v && (y || S) && this.addEventListener("didUpdate", ({ delta: g, hasLayoutChanged: p, hasRelativeLayoutChanged: b, layout: N }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const z = this.options.transition || v.getDefaultTransition() || Kx, { onLayoutAnimationStart: w, onLayoutAnimationComplete: _ } = v.getProps(), H = !this.targetLayout || !qv(this.targetLayout, N), G = !p && b;
        if (this.options.layoutRoot || this.resumeFrom || G || p && (H || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const X = {
            ...oh(z, "layout"),
            onPlay: w,
            onComplete: _
          };
          (v.shouldReduceMotion || this.options.layoutRoot) && (X.delay = 0, X.type = !1), this.startAnimation(X), this.setAnimationOrigin(g, G, X.path);
        } else
          p || $p(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = N;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const h = this.getStack();
      h && h.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), Si(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1;
    }
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(Gx), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: h } = this.options;
      return h && h.getProps().transformTemplate;
    }
    willUpdate(h = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && Xv(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let g = 0; g < this.path.length; g++) {
        const p = this.path[g];
        p.shouldResetTransform = !0, (typeof p.latestValues.x == "string" || typeof p.latestValues.y == "string") && (p.isLayoutDirty = !0), p.updateScroll("snapshot"), p.options.layoutRoot && p.willUpdate(!1);
      }
      const { layoutId: y, layout: S } = this.options;
      if (y === void 0 && !S)
        return;
      const v = this.getTransformTemplate();
      this.prevTransformTemplateValue = v ? v(this.latestValues, "") : void 0, this.updateSnapshot(), h && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        const S = this.updateBlockedByResize;
        this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), S && this.nodes.forEach(jx), this.nodes.forEach(Ip);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(Wp);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(Lx), this.nodes.forEach(Hx), this.nodes.forEach(_x), this.nodes.forEach(Vx)) : this.nodes.forEach(Wp), this.clearAllSnapshots();
      const y = Te.now();
      de.delta = xn(0, 1e3 / 60, y - de.timestamp), de.timestamp = y, de.isProcessing = !0, af.update.process(de), af.preRender.process(de), af.render.process(de), de.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, dh.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(Bx), this.sharedNodes.forEach(Xx);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, Ut.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      Ut.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !be(this.snapshot.measuredBox.x) && !be(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let S = 0; S < this.path.length; S++)
          this.path[S].updateScroll();
      const h = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected || (this.layoutCorrected = te()), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: y } = this.options;
      y && y.notify("LayoutMeasure", this.layout.layoutBox, h ? h.layoutBox : void 0);
    }
    updateScroll(h = "measure") {
      let y = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === h && (y = !1), y && this.instance) {
        const S = r(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: h,
          isRoot: S,
          offset: o(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : S
        };
      }
    }
    resetTransform() {
      if (!c)
        return;
      const h = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, y = this.projectionDelta && !Yv(this.projectionDelta), S = this.getTransformTemplate(), v = S ? S(this.latestValues, "") : void 0, g = v !== this.prevTransformTemplateValue;
      h && this.instance && (y || Zi(this.latestValues) || g) && (c(this.instance, v), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(h = !0) {
      const y = this.measurePageBox();
      let S = this.removeElementScroll(y);
      return h && (S = this.removeTransform(S)), Jx(S), {
        animationId: this.root.animationId,
        measuredBox: y,
        layoutBox: S,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement: h } = this.options;
      if (!h)
        return te();
      const y = h.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(Fx))) {
        const { scroll: v } = this.root;
        v && (En(y.x, v.offset.x), En(y.y, v.offset.y));
      }
      return y;
    }
    removeElementScroll(h) {
      const y = te();
      if (ln(y, h), this.scroll?.wasRoot)
        return y;
      for (let S = 0; S < this.path.length; S++) {
        const v = this.path[S], { scroll: g, options: p } = v;
        v !== this.root && g && p.layoutScroll && (g.wasRoot && ln(y, h), En(y.x, g.offset.x), En(y.y, g.offset.y));
      }
      return y;
    }
    applyTransform(h, y = !1, S) {
      const v = S || te();
      ln(v, h);
      for (let g = 0; g < this.path.length; g++) {
        const p = this.path[g];
        !y && p.options.layoutScroll && p.scroll && p !== p.root && (En(v.x, -p.scroll.offset.x), En(v.y, -p.scroll.offset.y)), Zi(p.latestValues) && ku(v, p.latestValues, p.layout?.layoutBox);
      }
      return Zi(this.latestValues) && ku(v, this.latestValues, this.layout?.layoutBox), v;
    }
    removeTransform(h) {
      const y = te();
      ln(y, h);
      for (let S = 0; S < this.path.length; S++) {
        const v = this.path[S];
        if (!Zi(v.latestValues))
          continue;
        let g;
        v.instance && (qf(v.latestValues) && v.updateSnapshot(), g = te(), ln(g, v.measurePageBox())), Gp(y, v.latestValues, v.snapshot?.layoutBox, g);
      }
      return Zi(this.latestValues) && Gp(y, this.latestValues), y;
    }
    setTargetDelta(h) {
      this.targetDelta = h, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(h) {
      this.options = {
        ...this.options,
        ...h,
        crossfade: h.crossfade !== void 0 ? h.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== de.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(h = !1) {
      const y = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = y.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = y.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = y.isSharedProjectionDirty);
      const S = !!this.resumingFrom || this !== y;
      if (!(h || S && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: g, layoutId: p } = this.options;
      if (!this.layout || !(g || p))
        return;
      this.resolvedRelativeTargetAt = de.timestamp;
      const b = this.getClosestProjectingParent();
      b && this.linkedParentVersion !== b.layoutVersion && !b.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && b && b.layout ? this.createRelativeTarget(b, this.layout.layoutBox, b.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = te(), this.targetWithTransforms = te()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), yx(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : ln(this.target, this.layout.layoutBox), zv(this.target, this.targetDelta)) : ln(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && b && !!b.resumingFrom == !!this.resumingFrom && !b.options.layoutScroll && b.target && this.animationProgress !== 1 ? this.createRelativeTarget(b, this.target, b.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || qf(this.parent.latestValues) || Dv(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(h, y, S) {
      this.relativeParent = h, this.linkedParentVersion = h.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = te(), this.relativeTargetOrigin = te(), uo(this.relativeTargetOrigin, y, S, this.options.layoutAnchor || void 0), ln(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      const h = this.getLead(), y = !!this.resumingFrom || this !== h;
      let S = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (S = !1), y && (this.isSharedProjectionDirty || this.isTransformDirty) && (S = !1), this.resolvedRelativeTargetAt === de.timestamp && (S = !1), S)
        return;
      const { layout: v, layoutId: g } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(v || g))
        return;
      ln(this.layoutCorrected, this.layout.layoutBox);
      const p = this.treeScale.x, b = this.treeScale.y;
      QA(this.layoutCorrected, this.treeScale, this.path, y), h.layout && !h.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (h.target = h.layout.layoutBox, h.targetWithTransforms = te());
      const { target: N } = h;
      if (!N) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Bp(this.prevProjectionDelta.x, this.projectionDelta.x), Bp(this.prevProjectionDelta.y, this.projectionDelta.y)), Wl(this.projectionDelta, this.layoutCorrected, N, this.latestValues), (this.treeScale.x !== p || this.treeScale.y !== b || !Jp(this.projectionDelta.x, this.prevProjectionDelta.x) || !Jp(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", N));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(h = !0) {
      if (this.options.visualElement?.scheduleRender(), h) {
        const y = this.getStack();
        y && y.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = Za(), this.projectionDelta = Za(), this.projectionDeltaWithTransform = Za();
    }
    setAnimationOrigin(h, y = !1, S) {
      const v = this.snapshot, g = v ? v.latestValues : {}, p = { ...this.latestValues }, b = Za();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !y;
      const N = te(), z = v ? v.source : void 0, w = this.layout ? this.layout.source : void 0, _ = z !== w, H = this.getStack(), G = !H || H.members.length <= 1, X = !!(_ && !G && this.options.crossfade === !0 && !this.path.some(Zx));
      this.animationProgress = 0;
      let L;
      const k = S?.interpolateProjection(h);
      this.mixTargetDelta = (st) => {
        const J = st / 1e3, Q = k?.(J);
        Q ? (b.x.translate = Q.x, b.x.scale = wt(h.x.scale, 1, J), b.x.origin = h.x.origin, b.x.originPoint = h.x.originPoint, b.y.translate = Q.y, b.y.scale = wt(h.y.scale, 1, J), b.y.origin = h.y.origin, b.y.originPoint = h.y.originPoint) : (tg(b.x, h.x, J), tg(b.y, h.y, J)), this.setTargetDelta(b), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (uo(N, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), Qx(this.relativeTarget, this.relativeTargetOrigin, N, J), L && Sx(this.relativeTarget, L) && (this.isProjectionDirty = !1), L || (L = te()), ln(L, this.relativeTarget)), _ && (this.animationValues = p, Ex(p, g, this.latestValues, J, X, G)), Q && Q.rotate !== void 0 && (this.animationValues || (this.animationValues = p), this.animationValues.pathRotation = Q.rotate), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = J;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(h) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (Si(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = Ut.update(() => {
        Iu.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = Ja(0)), this.motionValue.jump(0, !1), this.currentAnimation = Mx(this.motionValue, [0, 1e3], {
          ...h,
          velocity: 0,
          isSync: !0,
          onUpdate: (y) => {
            this.mixTargetDelta(y), h.onUpdate && h.onUpdate(y);
          },
          onComplete: () => {
            h.onComplete && h.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const h = this.getStack();
      h && h.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(Rx), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const h = this.getLead();
      let { targetWithTransforms: y, target: S, layout: v, latestValues: g } = h;
      if (!(!y || !S || !v)) {
        if (this !== h && this.layout && v && Zv(this.options.animationType, this.layout.layoutBox, v.layoutBox)) {
          S = this.target || te();
          const p = be(this.layout.layoutBox.x);
          S.x.min = h.target.x.min, S.x.max = S.x.min + p;
          const b = be(this.layout.layoutBox.y);
          S.y.min = h.target.y.min, S.y.max = S.y.min + b;
        }
        ln(y, S), ku(y, g), Wl(this.projectionDeltaWithTransform, this.layoutCorrected, y, g);
      }
    }
    registerSharedNode(h, y) {
      this.sharedNodes.has(h) || this.sharedNodes.set(h, new Ox()), this.sharedNodes.get(h).add(y);
      const v = y.options.initialPromotionConfig;
      y.promote({
        transition: v ? v.transition : void 0,
        preserveFollowOpacity: v && v.shouldPreserveFollowOpacity ? v.shouldPreserveFollowOpacity(y) : void 0
      });
    }
    isLead() {
      const h = this.getStack();
      return h ? h.lead === this : !0;
    }
    getLead() {
      const { layoutId: h } = this.options;
      return h ? this.getStack()?.lead || this : this;
    }
    getPrevLead() {
      const { layoutId: h } = this.options;
      return h ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      const { layoutId: h } = this.options;
      if (h)
        return this.root.sharedNodes.get(h);
    }
    promote({ needsReset: h, transition: y, preserveFollowOpacity: S } = {}) {
      const v = this.getStack();
      v && v.promote(this, S), h && (this.projectionDelta = void 0, this.needsReset = !0), y && this.setOptions({ transition: y });
    }
    relegate() {
      const h = this.getStack();
      return h ? h.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: h } = this.options;
      if (!h)
        return;
      let y = !1;
      const { latestValues: S } = h;
      if ((S.z || S.rotate || S.rotateX || S.rotateY || S.rotateZ || S.skewX || S.skewY) && (y = !0), !y)
        return;
      const v = {};
      S.z && df("z", h, v, this.animationValues);
      for (let g = 0; g < hf.length; g++)
        df(`rotate${hf[g]}`, h, v, this.animationValues), df(`skew${hf[g]}`, h, v, this.animationValues);
      h.render();
      for (const g in v)
        h.setStaticValue(g, v[g]), this.animationValues && (this.animationValues[g] = v[g]);
      h.scheduleRender();
    }
    applyProjectionStyles(h, y) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        h.visibility = "hidden";
        return;
      }
      const S = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, h.visibility = "", h.opacity = "", h.pointerEvents = Pu(y?.pointerEvents) || "", h.transform = S ? S(this.latestValues, "") : "none";
        return;
      }
      const v = this.getLead();
      if (!this.projectionDelta || !this.layout || !v.target) {
        this.options.layoutId && (h.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, h.pointerEvents = Pu(y?.pointerEvents) || ""), this.hasProjected && !Zi(this.latestValues) && (h.transform = S ? S({}, "") : "none", this.hasProjected = !1);
        return;
      }
      h.visibility = "";
      const g = v.animationValues || v.latestValues;
      this.applyTransformsToTarget();
      let p = Tx(this.projectionDeltaWithTransform, this.treeScale, g);
      S && (p = S(g, p)), h.transform = p;
      const { x: b, y: N } = this.projectionDelta;
      h.transformOrigin = `${b.origin * 100}% ${N.origin * 100}% 0`, v.animationValues ? h.opacity = v === this ? g.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : g.opacityExit : h.opacity = v === this ? g.opacity !== void 0 ? g.opacity : "" : g.opacityExit !== void 0 ? g.opacityExit : 0;
      for (const z in Xf) {
        if (g[z] === void 0)
          continue;
        const { correct: w, applyTo: _, isCSSVariable: H } = Xf[z], G = p === "none" ? g[z] : w(g[z], v);
        if (_) {
          const X = _.length;
          for (let L = 0; L < X; L++)
            h[_[L]] = G;
        } else
          H ? this.options.visualElement.renderState.vars[z] = G : h[z] = G;
      }
      this.options.layoutId && (h.pointerEvents = v === this ? Pu(y?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((h) => h.currentAnimation?.stop()), this.root.nodes.forEach(Ip), this.root.sharedNodes.clear();
    }
  };
}
function _x(a) {
  a.updateLayout();
}
function Vx(a) {
  const l = a.resumeFrom?.snapshot || a.snapshot;
  if (a.isLead() && a.layout && l && a.hasListeners("didUpdate")) {
    const { layoutBox: o, measuredBox: r } = a.layout, { animationType: c } = a.options, d = l.source !== a.layout.source;
    if (c === "size")
      bn((g) => {
        const p = d ? l.measuredBox[g] : l.layoutBox[g], b = be(p);
        p.min = o[g].min, p.max = p.min + b;
      });
    else if (c === "x" || c === "y") {
      const g = c === "x" ? "y" : "x";
      Qf(d ? l.measuredBox[g] : l.layoutBox[g], o[g]);
    } else Zv(c, l.layoutBox, o) && bn((g) => {
      const p = d ? l.measuredBox[g] : l.layoutBox[g], b = be(o[g]);
      p.max = p.min + b, a.relativeTarget && !a.currentAnimation && (a.isProjectionDirty = !0, a.relativeTarget[g].max = a.relativeTarget[g].min + b);
    });
    const h = Za();
    Wl(h, o, l.layoutBox);
    const y = Za();
    d ? Wl(y, a.applyTransform(r, !0), l.measuredBox) : Wl(y, o, l.layoutBox);
    const S = !Yv(h);
    let v = !1;
    if (!a.resumeFrom) {
      const g = a.getClosestProjectingParent();
      if (g && !g.resumeFrom) {
        const { snapshot: p, layout: b } = g;
        if (p && b) {
          const N = a.options.layoutAnchor || void 0, z = te();
          uo(z, l.layoutBox, p.layoutBox, N);
          const w = te();
          uo(w, o, b.layoutBox, N), qv(z, w) || (v = !0), g.options.layoutRoot && (a.relativeTarget = w, a.relativeTargetOrigin = z, a.relativeParent = g);
        }
      }
    }
    a.notifyListeners("didUpdate", {
      layout: o,
      snapshot: l,
      delta: y,
      layoutDelta: h,
      hasLayoutChanged: S,
      hasRelativeLayoutChanged: v
    });
  } else if (a.isLead()) {
    const { onExitComplete: o } = a.options;
    o && o();
  }
  a.options.transition = void 0;
}
function wx(a) {
  a.parent && (a.isProjecting() || (a.isProjectionDirty = a.parent.isProjectionDirty), a.isSharedProjectionDirty || (a.isSharedProjectionDirty = !!(a.isProjectionDirty || a.parent.isProjectionDirty || a.parent.isSharedProjectionDirty)), a.isTransformDirty || (a.isTransformDirty = a.parent.isTransformDirty));
}
function Ux(a) {
  a.isProjectionDirty = a.isSharedProjectionDirty = a.isTransformDirty = !1;
}
function Bx(a) {
  a.clearSnapshot();
}
function Ip(a) {
  a.clearMeasurements();
}
function jx(a) {
  a.isLayoutDirty = !0, a.updateLayout();
}
function Wp(a) {
  a.isLayoutDirty = !1;
}
function Lx(a) {
  a.isAnimationBlocked && a.layout && !a.isLayoutDirty && (a.snapshot = a.layout, a.isLayoutDirty = !0);
}
function Hx(a) {
  const { visualElement: l } = a.options;
  l && l.getProps().onBeforeLayoutMeasure && l.notify("BeforeLayoutMeasure"), a.resetTransform();
}
function $p(a) {
  a.finishAnimation(), a.targetDelta = a.relativeTarget = a.target = void 0, a.isProjectionDirty = !0;
}
function Yx(a) {
  a.resolveTargetDelta();
}
function qx(a) {
  a.calcProjection();
}
function Gx(a) {
  a.resetSkewAndRotation();
}
function Xx(a) {
  a.removeLeadSnapshot();
}
function tg(a, l, o) {
  a.translate = wt(l.translate, 0, o), a.scale = wt(l.scale, 1, o), a.origin = l.origin, a.originPoint = l.originPoint;
}
function eg(a, l, o, r) {
  a.min = wt(l.min, o.min, r), a.max = wt(l.max, o.max, r);
}
function Qx(a, l, o, r) {
  eg(a.x, l.x, o.x, r), eg(a.y, l.y, o.y, r);
}
function Zx(a) {
  return a.animationValues && a.animationValues.opacityExit !== void 0;
}
const Kx = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, ng = (a) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(a), ig = ng("applewebkit/") && !ng("chrome/") ? Math.round : Ie;
function ag(a) {
  a.min = ig(a.min), a.max = ig(a.max);
}
function Jx(a) {
  ag(a.x), ag(a.y);
}
function Zv(a, l, o) {
  return a === "position" || a === "preserve-aspect" && !mx(Kp(l), Kp(o), 0.2);
}
function Fx(a) {
  return a !== a.root && a.scroll?.wasRoot;
}
const kx = Qv({
  attachResizeListener: (a, l) => is(a, "resize", l),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body?.scrollTop || 0
  }),
  checkIsScrollRoot: () => !0
}), mf = {
  current: void 0
}, Kv = Qv({
  measureScroll: (a) => ({
    x: a.scrollLeft,
    y: a.scrollTop
  }),
  defaultParent: () => {
    if (!mf.current) {
      const a = new kx({});
      a.mount(window), a.setOptions({ layoutScroll: !0 }), mf.current = a;
    }
    return mf.current;
  },
  resetTransform: (a, l) => {
    a.style.transform = l !== void 0 ? l : "none";
  },
  checkIsScrollRoot: (a) => window.getComputedStyle(a).position === "fixed"
}), bh = q.createContext({
  transformPagePoint: (a) => a,
  isStatic: !1,
  reducedMotion: "never"
});
function lg(a, l) {
  if (typeof a == "function")
    return a(l);
  a != null && (a.current = l);
}
function Px(...a) {
  return (l) => {
    let o = !1;
    const r = a.map((c) => {
      const d = lg(c, l);
      return !o && typeof d == "function" && (o = !0), d;
    });
    if (o)
      return () => {
        for (let c = 0; c < r.length; c++) {
          const d = r[c];
          typeof d == "function" ? d() : lg(a[c], null);
        }
      };
  };
}
function Ix(...a) {
  return q.useCallback(Px(...a), a);
}
class Wx extends q.Component {
  getSnapshotBeforeUpdate(l) {
    const o = this.props.childRef.current;
    if (Qu(o) && l.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const r = o.offsetParent, c = Qu(r) && r.offsetWidth || 0, d = Qu(r) && r.offsetHeight || 0, h = getComputedStyle(o), y = this.props.sizeRef.current;
      y.height = parseFloat(h.height), y.width = parseFloat(h.width), y.top = o.offsetTop, y.left = o.offsetLeft, y.right = c - y.width - y.left, y.bottom = d - y.height - y.top, y.direction = h.direction;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function $x({ children: a, isPresent: l, anchorX: o, anchorY: r, root: c, pop: d }) {
  const h = q.useId(), y = q.useRef(null), S = q.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    direction: "ltr"
  }), { nonce: v } = q.useContext(bh), g = d !== !1 ? a.props?.ref ?? a?.ref : void 0, p = Ix(y, g);
  return q.useInsertionEffect(() => {
    const { width: b, height: N, top: z, left: w, right: _, bottom: H, direction: G } = S.current;
    if (l || d === !1 || !y.current || !b || !N)
      return;
    const X = G === "rtl", L = o === "left" ? X ? `right: ${_}` : `left: ${w}` : X ? `left: ${w}` : `right: ${_}`, k = r === "bottom" ? `bottom: ${H}` : `top: ${z}`;
    y.current.dataset.motionPopId = h;
    const st = document.createElement("style");
    v && (st.nonce = v);
    const J = c ?? document.head;
    return J.appendChild(st), st.sheet && st.sheet.insertRule(`
          [data-motion-pop-id="${h}"] {
            position: absolute !important;
            width: ${b}px !important;
            height: ${N}px !important;
            ${L}px !important;
            ${k}px !important;
          }
        `), () => {
      y.current?.removeAttribute("data-motion-pop-id"), J.contains(st) && J.removeChild(st);
    };
  }, [l]), $.jsx(Wx, { isPresent: l, childRef: y, sizeRef: S, pop: d, children: d === !1 ? a : q.cloneElement(a, { ref: p }) });
}
const t2 = ({ children: a, initial: l, isPresent: o, onExitComplete: r, custom: c, presenceAffectsLayout: d, mode: h, anchorX: y, anchorY: S, root: v }) => {
  const g = kf(e2), p = q.useId(), b = q.useRef(o), N = q.useRef(r);
  Pf(() => {
    b.current = o, N.current = r;
  });
  let z = !0, w = q.useMemo(() => (z = !1, {
    id: p,
    initial: l,
    isPresent: o,
    custom: c,
    onExitComplete: (_) => {
      g.set(_, !0);
      for (const H of g.values())
        if (!H)
          return;
      r && r();
    },
    register: (_) => (g.set(_, !1), () => {
      g.delete(_), !b.current && !g.size && N.current?.();
    })
  }), [o, g, r]);
  return d && z && (w = { ...w }), q.useMemo(() => {
    g.forEach((_, H) => g.set(H, !1));
  }, [o]), q.useEffect(() => {
    !o && !g.size && r && r();
  }, [o]), a = $.jsx($x, { pop: h === "popLayout", isPresent: o, anchorX: y, anchorY: S, root: v, children: a }), $.jsx(ro.Provider, { value: w, children: a });
};
function e2() {
  return /* @__PURE__ */ new Map();
}
function Jv(a = !0) {
  const l = q.useContext(ro);
  if (l === null)
    return [!0, null];
  const { isPresent: o, onExitComplete: r, register: c } = l, d = q.useId();
  q.useEffect(() => {
    if (a)
      return c(d);
  }, [a]);
  const h = q.useCallback(() => a && r && r(d), [d, r, a]);
  return !o && r ? [!1, h] : [!0];
}
const Yu = (a) => a.key || "";
function sg(a) {
  const l = [];
  return q.Children.forEach(a, (o) => {
    q.isValidElement(o) && l.push(o);
  }), l;
}
const n2 = ({ children: a, custom: l, initial: o = !0, onExitComplete: r, presenceAffectsLayout: c = !0, mode: d = "sync", propagate: h = !1, anchorX: y = "left", anchorY: S = "top", root: v }) => {
  const [g, p] = Jv(h), b = q.useMemo(() => sg(a), [a]), N = h && !g ? [] : b.map(Yu), z = q.useRef(!0), w = q.useRef(b), _ = kf(() => /* @__PURE__ */ new Map()), H = q.useRef(/* @__PURE__ */ new Set()), [G, X] = q.useState(b), [L, k] = q.useState(b);
  Pf(() => {
    z.current = !1, w.current = b;
    for (let Q = 0; Q < L.length; Q++) {
      const ot = Yu(L[Q]);
      N.includes(ot) ? (_.delete(ot), H.current.delete(ot)) : _.get(ot) !== !0 && _.set(ot, !1);
    }
  }, [L, N.length, N.join("-")]);
  const st = [];
  if (b !== G) {
    let Q = [...b];
    for (let ot = 0; ot < L.length; ot++) {
      const W = L[ot], dt = Yu(W);
      N.includes(dt) || (Q.splice(ot, 0, W), st.push(W));
    }
    return d === "wait" && st.length && (Q = st), k(sg(Q)), X(b), null;
  }
  const { forceRender: J } = q.useContext(Ff);
  return $.jsx($.Fragment, { children: L.map((Q) => {
    const ot = Yu(Q), W = h && !g ? !1 : b === L || N.includes(ot), dt = () => {
      if (H.current.has(ot))
        return;
      if (_.has(ot))
        H.current.add(ot), _.set(ot, !0);
      else
        return;
      let Tt = !0;
      _.forEach((Yt) => {
        Yt || (Tt = !1);
      }), Tt && (J?.(), k(w.current), h && p?.(), r && r());
    };
    return $.jsx(t2, { isPresent: W, initial: !z.current || o ? void 0 : !1, custom: l, presenceAffectsLayout: c, mode: d, root: v, onExitComplete: W ? void 0 : dt, anchorX: y, anchorY: S, children: Q }, ot);
  }) });
}, Fv = q.createContext({ strict: !1 }), ug = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
};
let og = !1;
function i2() {
  if (og)
    return;
  const a = {};
  for (const l in ug)
    a[l] = {
      isEnabled: (o) => ug[l].some((r) => !!o[r])
    };
  xv(a), og = !0;
}
function kv() {
  return i2(), YA();
}
function a2(a) {
  const l = kv();
  for (const o in a)
    l[o] = {
      ...l[o],
      ...a[o]
    };
  xv(l);
}
const l2 = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "propagate",
  "ignoreStrict",
  "viewport"
]);
function oo(a) {
  return a.startsWith("while") || a.startsWith("drag") && a !== "draggable" || a.startsWith("layout") || a.startsWith("onTap") || a.startsWith("onPan") || a.startsWith("onLayout") || l2.has(a);
}
let Pv = (a) => !oo(a);
function s2(a) {
  typeof a == "function" && (Pv = (l) => l.startsWith("on") ? !oo(l) : a(l));
}
try {
  s2(require("@emotion/is-prop-valid").default);
} catch {
}
function u2(a, l, o) {
  const r = {};
  for (const c in a)
    c === "values" && typeof a.values == "object" || me(a[c]) || (Pv(c) || o === !0 && oo(c) || !l && !oo(c) || // If trying to use native HTML drag events, forward drag listeners
    a.draggable && c.startsWith("onDrag")) && (r[c] = a[c]);
  return r;
}
const yo = /* @__PURE__ */ q.createContext({});
function o2(a, l) {
  if (mo(a)) {
    const { initial: o, animate: r } = a;
    return {
      initial: o === !1 || ns(o) ? o : void 0,
      animate: ns(r) ? r : void 0
    };
  }
  return a.inherit !== !1 ? l : {};
}
function r2(a) {
  const { initial: l, animate: o } = o2(a, q.useContext(yo));
  return q.useMemo(() => ({ initial: l, animate: o }), [rg(l), rg(o)]);
}
function rg(a) {
  return Array.isArray(a) ? a.join(" ") : a;
}
const Eh = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function Iv(a, l, o) {
  for (const r in l)
    !me(l[r]) && !Nv(r, o) && (a[r] = l[r]);
}
function c2({ transformTemplate: a }, l) {
  return q.useMemo(() => {
    const o = Eh();
    return Sh(o, l, a), Object.assign({}, o.vars, o.style);
  }, [l]);
}
function f2(a, l) {
  const o = a.style || {}, r = {};
  return Iv(r, o, a), Object.assign(r, c2(a, l)), r;
}
function h2(a, l) {
  const o = {}, r = f2(a, l);
  return a.drag && a.dragListener !== !1 && (o.draggable = !1, r.userSelect = r.WebkitUserSelect = r.WebkitTouchCallout = "none", r.touchAction = a.drag === !0 ? "none" : `pan-${a.drag === "x" ? "y" : "x"}`), a.tabIndex === void 0 && (a.onTap || a.onTapStart || a.whileTap) && (o.tabIndex = 0), o.style = r, o;
}
const Wv = () => ({
  ...Eh(),
  attrs: {}
});
function d2(a, l, o, r) {
  const c = q.useMemo(() => {
    const d = Wv();
    return _v(d, l, wv(r), a.transformTemplate, a.style), {
      ...d.attrs,
      style: { ...d.style }
    };
  }, [l]);
  if (a.style) {
    const d = {};
    Iv(d, a.style, a), c.style = { ...d, ...c.style };
  }
  return c;
}
const m2 = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function Ah(a) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof a != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    a.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(m2.indexOf(a) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(a))
    )
  );
}
function y2(a, l, o, { latestValues: r }, c, d = !1, h) {
  const S = (h ?? Ah(a) ? d2 : h2)(l, r, c, a), v = u2(l, typeof a == "string", d), g = a !== q.Fragment ? { ...v, ...S, ref: o } : {}, { children: p } = l, b = q.useMemo(() => me(p) ? p.get() : p, [p]);
  return q.createElement(a, {
    ...g,
    children: b
  });
}
function p2({ scrapeMotionValuesFromProps: a, createRenderState: l }, o, r, c) {
  return {
    latestValues: g2(o, r, c, a),
    renderState: l()
  };
}
function g2(a, l, o, r) {
  const c = {}, d = r(a, {});
  for (const b in d)
    c[b] = Pu(d[b]);
  let { initial: h, animate: y } = a;
  const S = mo(a), v = Ev(a);
  l && v && !S && a.inherit !== !1 && (h === void 0 && (h = l.initial), y === void 0 && (y = l.animate));
  let g = o ? o.initial === !1 : !1;
  g = g || h === !1;
  const p = g ? y : h;
  if (p && typeof p != "boolean" && !ho(p)) {
    const b = Array.isArray(p) ? p : [p];
    for (let N = 0; N < b.length; N++) {
      const z = ch(a, b[N]);
      if (z) {
        const { transitionEnd: w, transition: _, ...H } = z;
        for (const G in H) {
          let X = H[G];
          if (Array.isArray(X)) {
            const L = g ? X.length - 1 : 0;
            X = X[L];
          }
          X !== null && (c[G] = X);
        }
        for (const G in w)
          c[G] = w[G];
      }
    }
  }
  return c;
}
const $v = (a) => (l, o) => {
  const r = q.useContext(yo), c = q.useContext(ro), d = () => p2(a, l, r, c);
  return o ? d() : kf(d);
}, v2 = /* @__PURE__ */ $v({
  scrapeMotionValuesFromProps: Th,
  createRenderState: Eh
}), S2 = /* @__PURE__ */ $v({
  scrapeMotionValuesFromProps: Uv,
  createRenderState: Wv
}), T2 = /* @__PURE__ */ Symbol.for("motionComponentSymbol");
function b2(a, l, o) {
  const r = q.useRef(o);
  q.useInsertionEffect(() => {
    r.current = o;
  });
  const c = q.useRef(null);
  return q.useCallback((d) => {
    d && a.onMount?.(d), l && (d ? l.mount(d) : l.unmount());
    const h = r.current;
    if (typeof h == "function")
      if (d) {
        const y = h(d);
        typeof y == "function" && (c.current = y);
      } else c.current ? (c.current(), c.current = null) : h(d);
    else h && (h.current = d);
  }, [l]);
}
const t1 = q.createContext({});
function Ga(a) {
  return a && typeof a == "object" && Object.prototype.hasOwnProperty.call(a, "current");
}
function E2(a, l, o, r, c, d) {
  const { visualElement: h } = q.useContext(yo), y = q.useContext(Fv), S = q.useContext(ro), v = q.useContext(bh), g = v.reducedMotion, p = v.skipAnimations, b = q.useRef(null), N = q.useRef(!1);
  r = r || y.renderer, !b.current && r && (b.current = r(a, {
    visualState: l,
    parent: h,
    props: o,
    presenceContext: S,
    blockInitialAnimation: S ? S.initial === !1 : !1,
    reducedMotionConfig: g,
    skipAnimations: p,
    isSVG: d
  }), N.current && b.current && (b.current.manuallyAnimateOnMount = !0));
  const z = b.current, w = q.useContext(t1);
  z && !z.projection && c && (z.type === "html" || z.type === "svg") && A2(b.current, o, c, w);
  const _ = q.useRef(!1);
  q.useInsertionEffect(() => {
    z && _.current && z.update(o, S);
  });
  const H = o[cv], G = q.useRef(!!H && typeof window < "u" && !window.MotionHandoffIsComplete?.(H) && window.MotionHasOptimisedAnimation?.(H));
  return Pf(() => {
    N.current = !0, z && (_.current = !0, window.MotionIsMounted = !0, z.updateFeatures(), z.scheduleRenderMicrotask(), G.current && z.animationState && z.animationState.animateChanges());
  }), q.useEffect(() => {
    z && (!G.current && z.animationState && z.animationState.animateChanges(), G.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(H);
    }), G.current = !1), z.enteringChildren = void 0);
  }), z;
}
function A2(a, l, o, r) {
  const { layoutId: c, layout: d, drag: h, dragConstraints: y, layoutScroll: S, layoutRoot: v, layoutAnchor: g, layoutCrossfade: p } = l;
  a.projection = new o(a.latestValues, l["data-framer-portal-id"] ? void 0 : e1(a.parent)), a.projection.setOptions({
    layoutId: c,
    layout: d,
    alwaysMeasureLayout: !!h || y && Ga(y),
    visualElement: a,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof d == "string" ? d : "both",
    initialPromotionConfig: r,
    crossfade: p,
    layoutScroll: S,
    layoutRoot: v,
    layoutAnchor: g
  });
}
function e1(a) {
  if (a)
    return a.options.allowProjection !== !1 ? a.projection : e1(a.parent);
}
function yf(a, { forwardMotionProps: l = !1, type: o } = {}, r, c) {
  r && a2(r);
  const d = o ? o === "svg" : Ah(a), h = d ? S2 : v2;
  function y(v, g) {
    let p;
    const b = {
      ...q.useContext(bh),
      ...v,
      layoutId: x2(v)
    }, { isStatic: N } = b, z = r2(v), w = h(v, N);
    if (!N && typeof window < "u") {
      M2();
      const _ = C2(b);
      p = _.MeasureLayout, z.visualElement = E2(a, w, b, c, _.ProjectionNode, d);
    }
    return $.jsxs(yo.Provider, { value: z, children: [p && z.visualElement ? $.jsx(p, { visualElement: z.visualElement, ...b }) : null, y2(a, v, b2(w, z.visualElement, g), w, N, l, d)] });
  }
  y.displayName = `motion.${typeof a == "string" ? a : `create(${a.displayName ?? a.name ?? ""})`}`;
  const S = q.forwardRef(y);
  return S[T2] = a, S;
}
function x2({ layoutId: a }) {
  const l = q.useContext(Ff).id;
  return l && a !== void 0 ? l + "-" + a : a;
}
function M2(a, l) {
  q.useContext(Fv).strict;
}
function C2(a) {
  const l = kv(), { drag: o, layout: r } = l;
  if (!o && !r)
    return {};
  const c = { ...o, ...r };
  return {
    MeasureLayout: o?.isEnabled(a) || r?.isEnabled(a) ? c.MeasureLayout : void 0,
    ProjectionNode: c.ProjectionNode
  };
}
function D2(a, l) {
  if (typeof Proxy > "u")
    return yf;
  const o = /* @__PURE__ */ new Map(), r = (d, h) => yf(d, h, a, l), c = (d, h) => r(d, h);
  return new Proxy(c, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (d, h) => h === "create" ? r : (o.has(h) || o.set(h, yf(h, void 0, a, l)), o.get(h))
  });
}
const z2 = (a, l) => l.isSVG ?? Ah(a) ? new ix(l) : new IA(l, {
  allowProjection: a !== q.Fragment
});
class O2 extends Ti {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(l) {
    super(l), l.animationState || (l.animationState = ox(l));
  }
  updateAnimationControlsSubscription() {
    const { animate: l } = this.node.getProps();
    ho(l) && (this.unmountControls = l.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: l } = this.node.getProps(), { animate: o } = this.node.prevProps || {};
    l !== o && this.updateAnimationControlsSubscription();
  }
  unmount() {
    this.node.animationState.reset(), this.unmountControls?.();
  }
}
let R2 = 0;
class N2 extends Ti {
  constructor() {
    super(...arguments), this.id = R2++, this.isExitComplete = !1;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: l, onExitComplete: o } = this.node.presenceContext, { isPresent: r } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || l === r)
      return;
    if (l && r === !1) {
      if (this.isExitComplete) {
        const { initial: d, custom: h } = this.node.getProps();
        if (typeof d == "string" || typeof d == "object" && d !== null && !Array.isArray(d)) {
          const y = ki(this.node, d, h);
          if (y) {
            const { transition: S, transitionEnd: v, ...g } = y;
            for (const p in g)
              this.node.getValue(p)?.jump(g[p]);
          }
        }
        this.node.animationState.reset(), this.node.animationState.animateChanges();
      } else
        this.node.animationState.setActive("exit", !1);
      this.isExitComplete = !1;
      return;
    }
    const c = this.node.animationState.setActive("exit", !l);
    o && !l && c.then(() => {
      this.isExitComplete = !0, o(this.id);
    });
  }
  mount() {
    const { register: l, onExitComplete: o } = this.node.presenceContext || {};
    o && o(this.id), l && (this.unmount = l(this.id));
  }
  unmount() {
  }
}
const _2 = {
  animation: {
    Feature: O2
  },
  exit: {
    Feature: N2
  }
};
function us(a) {
  return {
    point: {
      x: a.pageX,
      y: a.pageY
    }
  };
}
const V2 = (a) => (l) => mh(l) && a(l, us(l));
function $l(a, l, o, r) {
  return is(a, l, V2(o), r);
}
const n1 = ({ current: a }) => a ? a.ownerDocument.defaultView : null, cg = (a, l) => Math.abs(a - l);
function w2(a, l) {
  const o = cg(a.x, l.x), r = cg(a.y, l.y);
  return Math.sqrt(o ** 2 + r ** 2);
}
const fg = /* @__PURE__ */ new Set(["auto", "scroll"]);
class i1 {
  constructor(l, o, { transformPagePoint: r, contextWindow: c = window, dragSnapToOrigin: d = !1, distanceThreshold: h = 3, element: y } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (z) => {
      this.handleScroll(z.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = qu(this.lastRawMoveEventInfo, this.transformPagePoint));
      const z = pf(this.lastMoveEventInfo, this.history), w = this.startEvent !== null, _ = w2(z.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!w && !_)
        return;
      const { point: H } = z, { timestamp: G } = de;
      this.history.push({ ...H, timestamp: G });
      const { onStart: X, onMove: L } = this.handlers;
      w || (X && X(this.lastMoveEvent, z), this.startEvent = this.lastMoveEvent), L && L(this.lastMoveEvent, z);
    }, this.handlePointerMove = (z, w) => {
      this.lastMoveEvent = z, this.lastRawMoveEventInfo = w, this.lastMoveEventInfo = qu(w, this.transformPagePoint), Ut.update(this.updatePoint, !0);
    }, this.handlePointerUp = (z, w) => {
      this.end();
      const { onEnd: _, onSessionEnd: H, resumeAnimation: G } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && G && G(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const X = pf(z.type === "pointercancel" ? this.lastMoveEventInfo : qu(w, this.transformPagePoint), this.history);
      this.startEvent && _ && _(z, X), H && H(z, X);
    }, !mh(l))
      return;
    this.dragSnapToOrigin = d, this.handlers = o, this.transformPagePoint = r, this.distanceThreshold = h, this.contextWindow = c || window;
    const S = us(l), v = qu(S, this.transformPagePoint), { point: g } = v, { timestamp: p } = de;
    this.history = [{ ...g, timestamp: p }];
    const { onSessionStart: b } = o;
    b && b(l, pf(v, this.history));
    const N = { passive: !0, capture: !0 };
    this.removeListeners = as($l(this.contextWindow, "pointermove", this.handlePointerMove, N), $l(this.contextWindow, "pointerup", this.handlePointerUp, N), $l(this.contextWindow, "pointercancel", this.handlePointerUp, N)), y && this.startScrollTracking(y);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(l) {
    let o = l.parentElement;
    for (; o; ) {
      const r = getComputedStyle(o);
      (fg.has(r.overflowX) || fg.has(r.overflowY)) && this.scrollPositions.set(o, {
        x: o.scrollLeft,
        y: o.scrollTop
      }), o = o.parentElement;
    }
    this.scrollPositions.set(window, {
      x: window.scrollX,
      y: window.scrollY
    }), window.addEventListener("scroll", this.onElementScroll, {
      capture: !0
    }), window.addEventListener("scroll", this.onWindowScroll), this.removeScrollListeners = () => {
      window.removeEventListener("scroll", this.onElementScroll, {
        capture: !0
      }), window.removeEventListener("scroll", this.onWindowScroll);
    };
  }
  /**
   * Handle scroll compensation during drag.
   *
   * For element scroll: adjusts history origin since pageX/pageY doesn't change.
   * For window scroll: adjusts lastMoveEventInfo since pageX/pageY would change.
   */
  handleScroll(l) {
    const o = this.scrollPositions.get(l);
    if (!o)
      return;
    const r = l === window, c = r ? { x: window.scrollX, y: window.scrollY } : {
      x: l.scrollLeft,
      y: l.scrollTop
    }, d = { x: c.x - o.x, y: c.y - o.y };
    d.x === 0 && d.y === 0 || (r ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += d.x, this.lastMoveEventInfo.point.y += d.y) : this.history.length > 0 && (this.history[0].x -= d.x, this.history[0].y -= d.y), this.scrollPositions.set(l, c), Ut.update(this.updatePoint, !0));
  }
  updateHandlers(l) {
    this.handlers = l;
  }
  end() {
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), Si(this.updatePoint);
  }
}
function qu(a, l) {
  return l ? { point: l(a.point) } : a;
}
function hg(a, l) {
  return { x: a.x - l.x, y: a.y - l.y };
}
function pf({ point: a }, l) {
  return {
    point: a,
    delta: hg(a, a1(l)),
    offset: hg(a, U2(l)),
    velocity: B2(l, 0.1)
  };
}
function U2(a) {
  return a[0];
}
function a1(a) {
  return a[a.length - 1];
}
function B2(a, l) {
  if (a.length < 2)
    return { x: 0, y: 0 };
  let o = a.length - 1, r = null;
  const c = a1(a);
  for (; o >= 0 && (r = a[o], !(c.timestamp - r.timestamp > /* @__PURE__ */ Ye(l))); )
    o--;
  if (!r)
    return { x: 0, y: 0 };
  r === a[0] && a.length > 2 && c.timestamp - r.timestamp > /* @__PURE__ */ Ye(l) * 2 && (r = a[1]);
  const d = /* @__PURE__ */ Pe(c.timestamp - r.timestamp);
  if (d === 0)
    return { x: 0, y: 0 };
  const h = {
    x: (c.x - r.x) / d,
    y: (c.y - r.y) / d
  };
  return h.x === 1 / 0 && (h.x = 0), h.y === 1 / 0 && (h.y = 0), h;
}
function j2(a, { min: l, max: o }, r) {
  return l !== void 0 && a < l ? a = r ? wt(l, a, r.min) : Math.max(a, l) : o !== void 0 && a > o && (a = r ? wt(o, a, r.max) : Math.min(a, o)), a;
}
function dg(a, l, o) {
  return {
    min: l !== void 0 ? a.min + l : void 0,
    max: o !== void 0 ? a.max + o - (a.max - a.min) : void 0
  };
}
function L2(a, { top: l, left: o, bottom: r, right: c }) {
  return {
    x: dg(a.x, o, c),
    y: dg(a.y, l, r)
  };
}
function mg(a, l) {
  let o = l.min - a.min, r = l.max - a.max;
  return l.max - l.min < a.max - a.min && ([o, r] = [r, o]), { min: o, max: r };
}
function H2(a, l) {
  return {
    x: mg(a.x, l.x),
    y: mg(a.y, l.y)
  };
}
function Y2(a, l) {
  let o = 0.5;
  const r = be(a), c = be(l);
  return c > r ? o = /* @__PURE__ */ ts(l.min, l.max - r, a.min) : r > c && (o = /* @__PURE__ */ ts(a.min, a.max - c, l.min)), xn(0, 1, o);
}
function q2(a, l) {
  const o = {};
  return l.min !== void 0 && (o.min = l.min - a.min), l.max !== void 0 && (o.max = l.max - a.min), o;
}
const Zf = 0.35;
function G2(a = Zf) {
  return a === !1 ? a = 0 : a === !0 && (a = Zf), {
    x: yg(a, "left", "right"),
    y: yg(a, "top", "bottom")
  };
}
function yg(a, l, o) {
  return {
    min: pg(a, l),
    max: pg(a, o)
  };
}
function pg(a, l) {
  return typeof a == "number" ? a : a[l] || 0;
}
const X2 = /* @__PURE__ */ new WeakMap();
class Q2 {
  constructor(l) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = te(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = l;
  }
  start(l, { snapToCursor: o = !1, distanceThreshold: r } = {}) {
    const { presenceContext: c } = this.visualElement;
    if (c && c.isPresent === !1)
      return;
    const d = (p) => {
      o && this.snapToCursor(us(p).point), this.stopAnimation();
    }, h = (p, b) => {
      const { drag: N, dragPropagation: z, onDragStart: w } = this.getProps();
      if (N && !z && (this.openDragLock && this.openDragLock(), this.openDragLock = gA(N), !this.openDragLock))
        return;
      this.latestPointerEvent = p, this.latestPanInfo = b, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), bn((H) => {
        let G = this.getAxisMotionValue(H).get() || 0;
        if (An.test(G)) {
          const { projection: X } = this.visualElement;
          if (X && X.layout) {
            const L = X.layout.layoutBox[H];
            L && (G = be(L) * (parseFloat(G) / 100));
          }
        }
        this.originPoint[H] = G;
      }), w && Ut.update(() => w(p, b), !1, !0), Bf(this.visualElement, "transform");
      const { animationState: _ } = this.visualElement;
      _ && _.setActive("whileDrag", !0);
    }, y = (p, b) => {
      this.latestPointerEvent = p, this.latestPanInfo = b;
      const { dragPropagation: N, dragDirectionLock: z, onDirectionLock: w, onDrag: _ } = this.getProps();
      if (!N && !this.openDragLock)
        return;
      const { offset: H } = b;
      if (z && this.currentDirection === null) {
        this.currentDirection = K2(H), this.currentDirection !== null && w && w(this.currentDirection);
        return;
      }
      this.updateAxis("x", b.point, H), this.updateAxis("y", b.point, H), this.visualElement.render(), _ && Ut.update(() => _(p, b), !1, !0);
    }, S = (p, b) => {
      this.latestPointerEvent = p, this.latestPanInfo = b, this.stop(p, b), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, v = () => {
      const { dragSnapToOrigin: p } = this.getProps();
      (p || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: g } = this.getProps();
    this.panSession = new i1(l, {
      onSessionStart: d,
      onStart: h,
      onMove: y,
      onSessionEnd: S,
      resumeAnimation: v
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: g,
      distanceThreshold: r,
      contextWindow: n1(this.visualElement),
      element: this.visualElement.current
    });
  }
  /**
   * @internal
   */
  stop(l, o) {
    const r = l || this.latestPointerEvent, c = o || this.latestPanInfo, d = this.isDragging;
    if (this.cancel(), !d || !c || !r)
      return;
    const { velocity: h } = c;
    this.startAnimation(h);
    const { onDragEnd: y } = this.getProps();
    y && Ut.postRender(() => y(r, c));
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = !1;
    const { projection: l, animationState: o } = this.visualElement;
    l && (l.isAnimationBlocked = !1), this.endPanSession();
    const { dragPropagation: r } = this.getProps();
    !r && this.openDragLock && (this.openDragLock(), this.openDragLock = null), o && o.setActive("whileDrag", !1);
  }
  /**
   * Clean up the pan session without modifying other drag state.
   * This is used during unmount to ensure event listeners are removed
   * without affecting projection animations or drag locks.
   * @internal
   */
  endPanSession() {
    this.panSession && this.panSession.end(), this.panSession = void 0;
  }
  updateAxis(l, o, r) {
    const { drag: c } = this.getProps();
    if (!r || !Gu(l, c, this.currentDirection))
      return;
    const d = this.getAxisMotionValue(l);
    let h = this.originPoint[l] + r[l];
    this.constraints && this.constraints[l] && (h = j2(h, this.constraints[l], this.elastic[l])), d.set(h);
  }
  resolveConstraints() {
    const { dragConstraints: l, dragElastic: o } = this.getProps(), r = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, c = this.constraints;
    l && Ga(l) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : l && r ? this.constraints = L2(r.layoutBox, l) : this.constraints = !1, this.elastic = G2(o), c !== this.constraints && !Ga(l) && r && this.constraints && !this.hasMutatedConstraints && bn((d) => {
      this.constraints !== !1 && this.getAxisMotionValue(d) && (this.constraints[d] = q2(r.layoutBox[d], this.constraints[d]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: l, onMeasureDragConstraints: o } = this.getProps();
    if (!l || !Ga(l))
      return !1;
    const r = l.current, { projection: c } = this.visualElement;
    if (!c || !c.layout)
      return !1;
    c.root && (c.root.scroll = void 0, c.root.updateScroll());
    const d = ZA(r, c.root, this.visualElement.getTransformPagePoint());
    let h = H2(c.layout.layoutBox, d);
    if (o) {
      const y = o(GA(h));
      this.hasMutatedConstraints = !!y, y && (h = Cv(y));
    }
    return h;
  }
  startAnimation(l) {
    const { drag: o, dragMomentum: r, dragElastic: c, dragTransition: d, dragSnapToOrigin: h, onDragTransitionEnd: y } = this.getProps(), S = this.constraints || {}, v = bn((g) => {
      if (!Gu(g, o, this.currentDirection))
        return;
      let p = S && S[g] || {};
      (h === !0 || h === g) && (p = { min: 0, max: 0 });
      const b = c ? 200 : 1e6, N = c ? 40 : 1e7, z = {
        type: "inertia",
        velocity: r ? l[g] : 0,
        bounceStiffness: b,
        bounceDamping: N,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...d,
        ...p
      };
      return this.startAxisValueAnimation(g, z);
    });
    return Promise.all(v).then(y);
  }
  startAxisValueAnimation(l, o) {
    const r = this.getAxisMotionValue(l);
    return Bf(this.visualElement, l), r.start(rh(l, r, 0, o, this.visualElement, !1));
  }
  stopAnimation() {
    bn((l) => this.getAxisMotionValue(l).stop());
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(l) {
    const o = `_drag${l.toUpperCase()}`, c = this.visualElement.getProps()[o];
    return c || this.visualElement.getValue(l, this.visualElement.latestValues[l] ?? 0);
  }
  snapToCursor(l) {
    bn((o) => {
      const { drag: r } = this.getProps();
      if (!Gu(o, r, this.currentDirection))
        return;
      const { projection: c } = this.visualElement, d = this.getAxisMotionValue(o);
      if (c && c.layout) {
        const { min: h, max: y } = c.layout.layoutBox[o], S = d.get() || 0;
        d.set(l[o] - wt(h, y, 0.5) + S);
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: l, dragConstraints: o } = this.getProps(), { projection: r } = this.visualElement;
    if (!Ga(o) || !r || !this.constraints)
      return;
    this.stopAnimation();
    const c = { x: 0, y: 0 };
    bn((h) => {
      const y = this.getAxisMotionValue(h);
      if (y && this.constraints !== !1) {
        const S = y.get();
        c[h] = Y2({ min: S, max: S }, this.constraints[h]);
      }
    });
    const { transformTemplate: d } = this.visualElement.getProps();
    this.visualElement.current.style.transform = d ? d({}, "") : "none", r.root && r.root.updateScroll(), r.updateLayout(), this.constraints = !1, this.resolveConstraints(), bn((h) => {
      if (!Gu(h, l, null))
        return;
      const y = this.getAxisMotionValue(h), { min: S, max: v } = this.constraints[h];
      y.set(wt(S, v, c[h]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    X2.set(this.visualElement, this);
    const l = this.visualElement.current, o = $l(l, "pointerdown", (v) => {
      const { drag: g, dragListener: p = !0 } = this.getProps(), b = v.target, N = b !== l && AA(b);
      g && p && !N && this.start(v);
    });
    let r;
    const c = () => {
      const { dragConstraints: v } = this.getProps();
      Ga(v) && v.current && (this.constraints = this.resolveRefConstraints(), r || (r = Z2(l, v.current, () => this.scalePositionWithinConstraints())));
    }, { projection: d } = this.visualElement, h = d.addEventListener("measure", c);
    d && !d.layout && (d.root && d.root.updateScroll(), d.updateLayout()), Ut.read(c);
    const y = is(window, "resize", () => this.scalePositionWithinConstraints()), S = d.addEventListener("didUpdate", (({ delta: v, hasLayoutChanged: g }) => {
      this.isDragging && g && (bn((p) => {
        const b = this.getAxisMotionValue(p);
        b && (this.originPoint[p] += v[p].translate, b.set(b.get() + v[p].translate));
      }), this.visualElement.render());
    }));
    return () => {
      y(), o(), h(), S && S(), r && r();
    };
  }
  getProps() {
    const l = this.visualElement.getProps(), { drag: o = !1, dragDirectionLock: r = !1, dragPropagation: c = !1, dragConstraints: d = !1, dragElastic: h = Zf, dragMomentum: y = !0 } = l;
    return {
      ...l,
      drag: o,
      dragDirectionLock: r,
      dragPropagation: c,
      dragConstraints: d,
      dragElastic: h,
      dragMomentum: y
    };
  }
}
function gg(a) {
  let l = !0;
  return () => {
    if (l) {
      l = !1;
      return;
    }
    a();
  };
}
function Z2(a, l, o) {
  const r = xp(a, gg(o)), c = xp(l, gg(o));
  return () => {
    r(), c();
  };
}
function Gu(a, l, o) {
  return (l === !0 || l === a) && (o === null || o === a);
}
function K2(a, l = 10) {
  let o = null;
  return Math.abs(a.y) > l ? o = "y" : Math.abs(a.x) > l && (o = "x"), o;
}
class J2 extends Ti {
  constructor(l) {
    super(l), this.removeGroupControls = Ie, this.removeListeners = Ie, this.controls = new Q2(l);
  }
  mount() {
    const { dragControls: l } = this.node.getProps();
    l && (this.removeGroupControls = l.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || Ie;
  }
  update() {
    const { dragControls: l } = this.node.getProps(), { dragControls: o } = this.node.prevProps || {};
    l !== o && (this.removeGroupControls(), l && (this.removeGroupControls = l.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
  }
}
const gf = (a) => (l, o) => {
  a && Ut.update(() => a(l, o), !1, !0);
};
class F2 extends Ti {
  constructor() {
    super(...arguments), this.removePointerDownListener = Ie;
  }
  onPointerDown(l) {
    this.session = new i1(l, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: n1(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: l, onPanStart: o, onPan: r, onPanEnd: c } = this.node.getProps();
    return {
      onSessionStart: gf(l),
      onStart: gf(o),
      onMove: gf(r),
      onEnd: (d, h) => {
        delete this.session, c && Ut.postRender(() => c(d, h));
      }
    };
  }
  mount() {
    this.removePointerDownListener = $l(this.node.current, "pointerdown", (l) => this.onPointerDown(l));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let vf = !1;
class k2 extends q.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: l, layoutGroup: o, switchLayoutGroup: r, layoutId: c } = this.props, { projection: d } = l;
    d && (o.group && o.group.add(d), r && r.register && c && r.register(d), vf && d.root.didUpdate(), d.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), d.setOptions({
      ...d.options,
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    })), Iu.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(l) {
    const { layoutDependency: o, visualElement: r, drag: c, isPresent: d } = this.props, { projection: h } = r;
    return h && (h.isPresent = d, l.layoutDependency !== o && h.setOptions({
      ...h.options,
      layoutDependency: o
    }), vf = !0, c || l.layoutDependency !== o || o === void 0 || l.isPresent !== d ? h.willUpdate() : this.safeToRemove(), l.isPresent !== d && (d ? h.promote() : h.relegate() || Ut.postRender(() => {
      const y = h.getStack();
      (!y || !y.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { visualElement: l, layoutAnchor: o } = this.props, { projection: r } = l;
    r && (r.options.layoutAnchor = o, r.root.didUpdate(), dh.postRender(() => {
      !r.currentAnimation && r.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: l, layoutGroup: o, switchLayoutGroup: r } = this.props, { projection: c } = l;
    vf = !0, c && (c.scheduleCheckAfterUnmount(), o && o.group && o.group.remove(c), r && r.deregister && r.deregister(c));
  }
  safeToRemove() {
    const { safeToRemove: l } = this.props;
    l && l();
  }
  render() {
    return null;
  }
}
function l1(a) {
  const [l, o] = Jv(), r = q.useContext(Ff);
  return $.jsx(k2, { ...a, layoutGroup: r, switchLayoutGroup: q.useContext(t1), isPresent: l, safeToRemove: o });
}
const P2 = {
  pan: {
    Feature: F2
  },
  drag: {
    Feature: J2,
    ProjectionNode: Kv,
    MeasureLayout: l1
  }
};
function vg(a, l, o) {
  const { props: r } = a;
  a.animationState && r.whileHover && a.animationState.setActive("whileHover", o === "Start");
  const c = "onHover" + o, d = r[c];
  d && Ut.postRender(() => d(l, us(l)));
}
class I2 extends Ti {
  mount() {
    const { current: l } = this.node;
    l && (this.unmount = SA(l, (o, r) => (vg(this.node, r, "Start"), (c) => vg(this.node, c, "End"))));
  }
  unmount() {
  }
}
class W2 extends Ti {
  constructor() {
    super(...arguments), this.isActive = !1;
  }
  onFocus() {
    let l = !1;
    try {
      l = this.node.current.matches(":focus-visible");
    } catch {
      l = !0;
    }
    !l || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
  }
  mount() {
    this.unmount = as(is(this.node.current, "focus", () => this.onFocus()), is(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Sg(a, l, o) {
  const { props: r } = a;
  if (a.current instanceof HTMLButtonElement && a.current.disabled)
    return;
  a.animationState && r.whileTap && a.animationState.setActive("whileTap", o === "Start");
  const c = "onTap" + (o === "End" ? "" : o), d = r[c];
  d && Ut.postRender(() => d(l, us(l)));
}
class $2 extends Ti {
  mount() {
    const { current: l } = this.node;
    if (!l)
      return;
    const { globalTapTarget: o, propagate: r } = this.node.props;
    this.unmount = MA(l, (c, d) => (Sg(this.node, d, "Start"), (h, { success: y }) => Sg(this.node, h, y ? "End" : "Cancel")), {
      useGlobalTarget: o,
      stopPropagation: r?.tap === !1
    });
  }
  unmount() {
  }
}
const Kf = /* @__PURE__ */ new WeakMap(), Sf = /* @__PURE__ */ new WeakMap(), t3 = (a) => {
  const l = Kf.get(a.target);
  l && l(a);
}, e3 = (a) => {
  a.forEach(t3);
};
function n3({ root: a, ...l }) {
  const o = a || document;
  Sf.has(o) || Sf.set(o, {});
  const r = Sf.get(o), c = JSON.stringify(l);
  return r[c] || (r[c] = new IntersectionObserver(e3, { root: a, ...l })), r[c];
}
function i3(a, l, o) {
  const r = n3(l);
  return Kf.set(a, o), r.observe(a), () => {
    Kf.delete(a), r.unobserve(a);
  };
}
const a3 = {
  some: 0,
  all: 1
};
class l3 extends Ti {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: l = {} } = this.node.getProps(), { root: o, margin: r, amount: c = "some", once: d } = l, h = {
      root: o ? o.current : void 0,
      rootMargin: r,
      threshold: typeof c == "number" ? c : a3[c]
    }, y = (S) => {
      const { isIntersecting: v } = S;
      if (this.isInView === v || (this.isInView = v, d && !v && this.hasEnteredView))
        return;
      v && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", v);
      const { onViewportEnter: g, onViewportLeave: p } = this.node.getProps(), b = v ? g : p;
      b && b(S);
    };
    this.stopObserver = i3(this.node.current, h, y);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: l, prevProps: o } = this.node;
    ["amount", "margin", "root"].some(s3(l, o)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function s3({ viewport: a = {} }, { viewport: l = {} } = {}) {
  return (o) => a[o] !== l[o];
}
const u3 = {
  inView: {
    Feature: l3
  },
  tap: {
    Feature: $2
  },
  focus: {
    Feature: W2
  },
  hover: {
    Feature: I2
  }
}, o3 = {
  layout: {
    ProjectionNode: Kv,
    MeasureLayout: l1
  }
}, r3 = {
  ..._2,
  ...u3,
  ...P2,
  ...o3
}, s1 = /* @__PURE__ */ D2(r3, z2);
function u1() {
  !vh.current && Av();
  const [a] = q.useState(ao.current);
  return a;
}
var c3 = Eg();
const f3 = () => typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `f_${Math.random().toString(36).slice(2, 9)}`, h3 = { type: "spring", stiffness: 560, damping: 34, mass: 0.7 };
function qa(a, l) {
  return a.find((o) => o.id === l);
}
function Tf(a, l) {
  return a?.operators.find((o) => o.value === l);
}
function d3(a, l) {
  if (!l.length) return { text: "Select…", empty: !0, glyphs: [] };
  const o = (d) => a?.find((h) => h.value === d), r = (d) => o(d)?.label ?? d, c = l.map((d) => o(d)?.glyph).filter(Boolean).slice(0, 3);
  return l.length === 1 ? { text: r(l[0]), empty: !1, glyphs: c } : l.length <= 3 ? { text: l.map(r).join(", "), empty: !1, glyphs: c } : {
    text: `${r(l[0])} +${l.length - 1}`,
    empty: !1,
    glyphs: c
  };
}
function m3({ anchorKey: a, onClose: l, children: o, labelledBy: r }) {
  const c = q.useRef(null), d = u1(), [h, y] = q.useState(null), [S, v] = q.useState(!1), [g, p] = q.useState(
    null
  );
  q.useLayoutEffect(() => {
    const N = document.querySelector(
      `[data-fb-anchor="${a}"]`
    );
    y(N), v(!!N?.closest(".dark"));
  }, [a]);
  const b = q.useRef(a);
  return b.current = a, q.useEffect(
    () => () => {
      document.querySelector(`[data-fb-anchor="${b.current}"]`)?.focus();
    },
    []
  ), q.useLayoutEffect(() => {
    if (!h) return;
    const N = () => {
      const z = c.current;
      if (!z) return;
      const w = h.getBoundingClientRect(), _ = z.offsetWidth, H = z.offsetHeight, G = 6;
      let X = w.left, L = w.bottom + G;
      X = Math.min(X, window.innerWidth - _ - 8), X = Math.max(8, X), L + H > window.innerHeight - 8 && (L = w.top - G - H), p({ top: L, left: X });
    };
    return N(), window.addEventListener("resize", N), window.addEventListener("scroll", N, !0), () => {
      window.removeEventListener("resize", N), window.removeEventListener("scroll", N, !0);
    };
  }, [h]), q.useEffect(() => {
    const N = (w) => {
      c.current && !c.current.contains(w.target) && !(h && h.contains(w.target)) && l();
    }, z = (w) => {
      w.key === "Escape" && (w.stopPropagation(), l());
    };
    return document.addEventListener("pointerdown", N, !0), document.addEventListener("keydown", z, !0), () => {
      document.removeEventListener("pointerdown", N, !0), document.removeEventListener("keydown", z, !0);
    };
  }, [h, l]), c3.createPortal(
    /* @__PURE__ */ $.jsx("div", { className: S ? "dark" : "", style: { display: "contents" }, children: /* @__PURE__ */ $.jsx(
      s1.div,
      {
        ref: c,
        role: "dialog",
        "aria-labelledby": r,
        initial: d ? !1 : { opacity: 0, y: -3, scale: 0.985 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.12, ease: [0.2, 0.8, 0.2, 1] },
        style: {
          position: "fixed",
          top: g?.top ?? -9999,
          left: g?.left ?? -9999,
          zIndex: 60
        },
        className: "min-w-[13rem] max-w-[18rem] overflow-hidden rounded-lg border border-zinc-950/10 bg-white shadow-lg shadow-zinc-950/10 dark:border-white/10 dark:bg-zinc-900 dark:shadow-black/40",
        children: o
      }
    ) }),
    document.body
  );
}
function bf({
  items: a,
  multi: l,
  loading: o,
  error: r,
  searchable: c = !0,
  placeholder: d = "Filter…",
  onQuery: h,
  onPick: y,
  onRetry: S,
  labelId: v
}) {
  const [g, p] = q.useState(""), [b, N] = q.useState(0), z = q.useId(), w = q.useRef(null), _ = q.useRef(null), H = q.useMemo(() => {
    if (h) return a;
    const L = g.trim().toLowerCase();
    return L ? a.filter((k) => k.label.toLowerCase().includes(L)) : a;
  }, [a, g, h]);
  q.useEffect(() => {
    const L = requestAnimationFrame(() => w.current?.focus());
    return () => cancelAnimationFrame(L);
  }, []), q.useEffect(() => {
    N((L) => Math.min(L, Math.max(0, H.length - 1)));
  }, [H.length]), q.useEffect(() => {
    _.current?.querySelector(
      `[data-idx="${b}"]`
    )?.scrollIntoView({ block: "nearest" });
  }, [b]);
  const G = (L) => {
    const k = H[L];
    k && y(k.value);
  }, X = (L) => {
    L.key === "ArrowDown" ? (L.preventDefault(), N((k) => Math.min(k + 1, H.length - 1))) : L.key === "ArrowUp" ? (L.preventDefault(), N((k) => Math.max(k - 1, 0))) : L.key === "Home" ? (L.preventDefault(), N(0)) : L.key === "End" ? (L.preventDefault(), N(H.length - 1)) : L.key === "Enter" && (L.preventDefault(), G(b));
  };
  return /* @__PURE__ */ $.jsxs("div", { children: [
    c && /* @__PURE__ */ $.jsx("div", { className: "border-b border-zinc-950/8 p-1.5 dark:border-white/8", children: /* @__PURE__ */ $.jsx(
      "input",
      {
        ref: w,
        role: "combobox",
        "aria-expanded": "true",
        "aria-controls": z,
        "aria-activedescendant": H[b] ? `${z}-${b}` : void 0,
        "aria-labelledby": v,
        value: g,
        onChange: (L) => {
          p(L.target.value), h?.(L.target.value);
        },
        onKeyDown: X,
        placeholder: d,
        className: "w-full bg-transparent px-1.5 py-1 text-[13px] text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-500",
        autoComplete: "off",
        spellCheck: !1
      }
    ) }),
    /* @__PURE__ */ $.jsxs(
      "ul",
      {
        ref: _,
        id: z,
        role: "listbox",
        "aria-multiselectable": l || void 0,
        "aria-labelledby": v,
        className: "max-h-60 overflow-y-auto p-1",
        onKeyDown: X,
        tabIndex: -1,
        children: [
          o && /* @__PURE__ */ $.jsxs("li", { className: "flex items-center gap-2 px-2 py-3 text-[13px] text-zinc-500 dark:text-zinc-400", children: [
            /* @__PURE__ */ $.jsx(v3, {}),
            " Loading options…"
          ] }),
          r && !o && /* @__PURE__ */ $.jsxs("li", { className: "px-2 py-2.5 text-[13px]", children: [
            /* @__PURE__ */ $.jsx("p", { className: "text-zinc-600 dark:text-zinc-300", children: "Couldn’t load options." }),
            /* @__PURE__ */ $.jsx(
              "button",
              {
                type: "button",
                onClick: S,
                className: "mt-1 rounded-md px-1.5 py-0.5 text-[13px] font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-2 hover:decoration-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 dark:text-zinc-100 dark:decoration-zinc-600",
                children: "Try again"
              }
            )
          ] }),
          !o && !r && H.length === 0 && /* @__PURE__ */ $.jsx("li", { className: "px-2 py-3 text-[13px] text-zinc-500 dark:text-zinc-400", children: "No matches" }),
          !o && !r && H.map((L, k) => {
            const st = k === b;
            return /* @__PURE__ */ $.jsxs(
              "li",
              {
                id: `${z}-${k}`,
                "data-idx": k,
                role: "option",
                "aria-selected": l ? !!L.selected : st,
                onMouseEnter: () => N(k),
                onClick: () => y(L.value),
                className: [
                  "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-[13px]",
                  st ? "bg-zinc-100 dark:bg-white/10" : "bg-transparent",
                  "text-zinc-800 dark:text-zinc-100"
                ].join(" "),
                children: [
                  l && /* @__PURE__ */ $.jsx(
                    "span",
                    {
                      "aria-hidden": !0,
                      className: [
                        "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[4px] border transition-colors",
                        L.selected ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900" : "border-zinc-300 dark:border-zinc-600"
                      ].join(" "),
                      children: L.selected && /* @__PURE__ */ $.jsx(Tg, {})
                    }
                  ),
                  L.glyph && /* @__PURE__ */ $.jsx("span", { className: "shrink-0", "aria-hidden": !0, children: L.glyph }),
                  /* @__PURE__ */ $.jsx("span", { className: "truncate", children: L.label }),
                  !l && L.selected && /* @__PURE__ */ $.jsx("span", { className: "ml-auto text-zinc-500 dark:text-zinc-400", children: /* @__PURE__ */ $.jsx(Tg, {}) })
                ]
              },
              L.value
            );
          })
        ]
      }
    )
  ] });
}
const Ef = q.forwardRef(
  function({
    role: l,
    children: o,
    onOpen: r,
    registerRef: c,
    tabIndex: d,
    ariaLabel: h,
    anchorKey: y,
    onFocus: S,
    muted: v,
    active: g,
    flash: p
  }, b) {
    return /* @__PURE__ */ $.jsx(
      "button",
      {
        type: "button",
        ref: c,
        tabIndex: d,
        "aria-label": h,
        "aria-haspopup": "listbox",
        "aria-expanded": g,
        "data-fb-anchor": y,
        onFocus: S,
        onClick: r,
        "data-flash": p ? "" : void 0,
        className: [
          "relative flex items-center gap-1 whitespace-nowrap px-2 py-[4px] text-[13px] leading-[1.35] transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500/70",
          "active:scale-[0.98]",
          v ? "text-zinc-500 dark:text-zinc-400" : "text-zinc-800 dark:text-zinc-100",
          g ? "bg-zinc-200/70 dark:bg-white/[0.12]" : "hover:bg-zinc-200/60 dark:hover:bg-white/[0.08]",
          l === "field" ? "rounded-l-md font-medium" : "",
          "data-[flash]:animate-[fb-flash_620ms_ease-out]"
        ].join(" "),
        children: o
      }
    );
  }
);
function y3({
  fields: a,
  value: l,
  onChange: o,
  addLabel: r = "Filter",
  emptyLabel: c = "Add filter",
  disabled: d,
  className: h,
  "aria-label": y = "Filters"
}) {
  const S = u1(), [v, g] = q.useState(null), [p, b] = q.useState(null), N = q.useRef([]), [z, w] = q.useState(0), [_, H] = q.useState({}), G = [];
  l.forEach((V) => {
    G.push({ filterId: V.id, kind: "field" }), G.push({ filterId: V.id, kind: "operator" }), G.push({ filterId: V.id, kind: "value" }), G.push({ filterId: V.id, kind: "remove" });
  }), G.push({ kind: "add" }), q.useEffect(() => {
    z > G.length - 1 && w(G.length - 1);
  }, [G.length, z]);
  const X = (V) => {
    const j = Math.max(0, Math.min(V, G.length - 1));
    w(j), N.current[j]?.focus();
  }, L = (V) => {
    if (v) return;
    const j = G.length - 1;
    if (V.key === "ArrowRight")
      V.preventDefault(), X(z >= j ? 0 : z + 1);
    else if (V.key === "ArrowLeft")
      V.preventDefault(), X(z <= 0 ? j : z - 1);
    else if (V.key === "Home")
      V.preventDefault(), X(0);
    else if (V.key === "End")
      V.preventDefault(), X(j);
    else if (V.key === "Backspace" || V.key === "Delete") {
      const P = G[z];
      P?.filterId && (V.preventDefault(), ot(P.filterId, z));
    }
  }, k = (V) => {
    const j = qa(a, V);
    if (!j) return;
    const P = {
      id: f3(),
      field: V,
      operator: j.operators[0]?.value ?? "is",
      values: []
    };
    o([...l, P]), g({ kind: "value", filterId: P.id });
  }, st = (V, j) => {
    const P = qa(a, j);
    o(
      l.map(
        (F) => F.id === V ? {
          ...F,
          field: j,
          operator: P?.operators[0]?.value ?? F.operator,
          values: []
        } : F
      )
    ), g({ kind: "value", filterId: V });
  }, J = (V, j) => {
    const P = l.find((Bt) => Bt.id === V), F = qa(a, P?.field ?? ""), Dt = Tf(F, j);
    o(
      l.map(
        (Bt) => Bt.id === V ? {
          ...Bt,
          operator: j,
          values: Dt?.multi ? Bt.values : Bt.values.slice(0, 1)
        } : Bt
      )
    ), g(null);
  }, Q = (V, j, P) => {
    o(
      l.map((F) => {
        if (F.id !== V) return F;
        if (!P) return { ...F, values: [j] };
        const Dt = F.values.includes(j);
        return {
          ...F,
          values: Dt ? F.values.filter((Bt) => Bt !== j) : [...F.values, j]
        };
      })
    ), b(V), window.setTimeout(() => b((F) => F === V ? null : F), 640), P || g(null);
  }, ot = (V, j) => {
    o(l.filter((F) => F.id !== V)), g(null);
    const P = Math.max(0, (j ?? z) - 1);
    requestAnimationFrame(() => X(P));
  }, W = () => {
    o([]), g(null), requestAnimationFrame(() => X(0));
  }, dt = q.useCallback(
    (V, j = "") => {
      V.loadOptions && (H((P) => ({
        ...P,
        [V.id]: { loading: !0, error: !1, options: P[V.id]?.options ?? [] }
      })), V.loadOptions(j).then(
        (P) => H((F) => ({
          ...F,
          [V.id]: { loading: !1, error: !1, options: P }
        }))
      ).catch(
        () => H((P) => ({
          ...P,
          [V.id]: { loading: !1, error: !0, options: [] }
        }))
      ));
    },
    []
  );
  q.useEffect(() => {
    if (!v || v.kind !== "value") return;
    const V = l.find((P) => P.id === v.filterId), j = qa(a, V?.field ?? "");
    j?.loadOptions && !_[j.id]?.options.length && dt(j);
  }, [v]);
  let Tt = 0;
  const Yt = () => {
    const V = Tt++;
    return {
      idx: V,
      register: (j) => N.current[V] = j,
      tabIndex: V === z ? 0 : -1,
      onFocus: () => w(V)
    };
  }, qt = v ? v.kind === "add" ? "add" : `${v.filterId}:${v.kind}` : null, Ct = () => {
    if (!v) return null;
    if (v.kind === "add" || v.kind === "field") {
      const E = a.map((Y) => ({
        value: Y.id,
        label: Y.label,
        glyph: Y.icon
      }));
      return /* @__PURE__ */ $.jsx(
        bf,
        {
          labelId: "fb-field-label",
          items: E,
          multi: !1,
          onPick: (Y) => v.kind === "add" ? k(Y) : st(v.filterId, Y)
        },
        qt
      );
    }
    const V = l.find((E) => E.id === v.filterId), j = qa(a, V?.field ?? "");
    if (!V || !j) return null;
    if (v.kind === "operator") {
      const E = j.operators.map((Y) => ({
        value: Y.value,
        label: Y.label,
        selected: Y.value === V.operator
      }));
      return /* @__PURE__ */ $.jsx(
        bf,
        {
          labelId: "fb-op-label",
          items: E,
          multi: !1,
          searchable: E.length > 6,
          onPick: (Y) => J(V.id, Y)
        },
        qt
      );
    }
    const F = !!Tf(j, V.operator)?.multi, Dt = j.loadOptions ? _[j.id] : void 0, ze = (j.loadOptions ? Dt?.options ?? [] : j.options ?? []).map((E) => ({
      value: E.value,
      label: E.label,
      glyph: E.glyph,
      selected: V.values.includes(E.value)
    }));
    return /* @__PURE__ */ $.jsx(
      bf,
      {
        labelId: "fb-value-label",
        items: ze,
        multi: F,
        loading: Dt?.loading,
        error: Dt?.error,
        onQuery: j.loadOptions ? (E) => dt(j, E) : void 0,
        onRetry: () => dt(j),
        onPick: (E) => Q(V.id, E, F)
      },
      qt
    );
  }, Z = l.length > 1;
  return /* @__PURE__ */ $.jsxs(
    "div",
    {
      role: "toolbar",
      "aria-label": y,
      "aria-orientation": "horizontal",
      "aria-disabled": d || void 0,
      onKeyDown: L,
      className: [
        "flex flex-wrap items-center gap-1.5",
        d ? "pointer-events-none opacity-50" : "",
        h ?? ""
      ].join(" "),
      children: [
        /* @__PURE__ */ $.jsx("style", { children: `
@keyframes fb-flash {
  0% { background-color: rgba(59, 130, 246, 0.18); }
  100% { background-color: transparent; }
}
@media (prefers-reduced-motion: reduce) {
  @keyframes fb-flash {
    0%, 100% { background-color: transparent; }
  }
}
` }),
        /* @__PURE__ */ $.jsx(n2, { initial: !1, mode: "popLayout", children: l.map((V) => {
          const j = qa(a, V.field), P = Tf(j, V.operator), F = d3(
            j?.loadOptions ? _[j.id]?.options : j?.options,
            V.values
          ), Dt = Yt(), Bt = Yt(), ze = Yt(), E = Yt(), Y = p === V.id;
          return /* @__PURE__ */ $.jsxs(
            s1.div,
            {
              layout: !S,
              initial: S ? !1 : { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              exit: S ? { opacity: 0 } : { opacity: 0, scale: 0.9 },
              transition: h3,
              className: "group flex items-stretch overflow-hidden rounded-md border border-zinc-950/[0.09] bg-zinc-100/80 dark:border-white/[0.08] dark:bg-white/[0.05]",
              children: [
                /* @__PURE__ */ $.jsxs(
                  Ef,
                  {
                    role: "field",
                    registerRef: Dt.register,
                    tabIndex: Dt.tabIndex,
                    onFocus: Dt.onFocus,
                    anchorKey: `${V.id}:field`,
                    active: v?.kind === "field" && v.filterId === V.id,
                    ariaLabel: `Field: ${j?.label ?? V.field}. Edit field.`,
                    onOpen: () => {
                      g({ kind: "field", filterId: V.id });
                    },
                    children: [
                      j?.icon && /* @__PURE__ */ $.jsx("span", { className: "text-zinc-500 dark:text-zinc-400", "aria-hidden": !0, children: j.icon }),
                      j?.label ?? V.field
                    ]
                  }
                ),
                /* @__PURE__ */ $.jsx(
                  "span",
                  {
                    "aria-hidden": !0,
                    className: "w-px self-stretch bg-zinc-950/[0.07] dark:bg-white/[0.08]"
                  }
                ),
                /* @__PURE__ */ $.jsx(
                  Ef,
                  {
                    role: "operator",
                    registerRef: Bt.register,
                    tabIndex: Bt.tabIndex,
                    onFocus: Bt.onFocus,
                    anchorKey: `${V.id}:operator`,
                    muted: !0,
                    active: v?.kind === "operator" && v.filterId === V.id,
                    ariaLabel: `Operator: ${P?.label ?? V.operator}. Edit operator.`,
                    onOpen: () => {
                      g({ kind: "operator", filterId: V.id });
                    },
                    children: P?.label ?? V.operator
                  }
                ),
                /* @__PURE__ */ $.jsx(
                  "span",
                  {
                    "aria-hidden": !0,
                    className: "w-px self-stretch bg-zinc-950/[0.07] dark:bg-white/[0.08]"
                  }
                ),
                /* @__PURE__ */ $.jsxs(
                  Ef,
                  {
                    role: "value",
                    registerRef: ze.register,
                    tabIndex: ze.tabIndex,
                    onFocus: ze.onFocus,
                    anchorKey: `${V.id}:value`,
                    muted: F.empty,
                    active: v?.kind === "value" && v.filterId === V.id,
                    flash: Y,
                    ariaLabel: `Value: ${F.empty ? "none selected" : F.text}. Edit value.`,
                    onOpen: () => {
                      g({ kind: "value", filterId: V.id });
                    },
                    children: [
                      !F.empty && F.glyphs.length > 0 && /* @__PURE__ */ $.jsx("span", { className: "flex shrink-0 items-center gap-0.5", "aria-hidden": !0, children: F.glyphs.map((it, at) => /* @__PURE__ */ $.jsx("span", { className: "flex items-center", children: it }, at)) }),
                      /* @__PURE__ */ $.jsx("span", { className: "max-w-[12rem] truncate font-medium text-zinc-900 dark:text-zinc-50", children: F.empty ? /* @__PURE__ */ $.jsx("span", { className: "font-normal text-zinc-400 dark:text-zinc-500", children: F.text }) : F.text })
                    ]
                  }
                ),
                /* @__PURE__ */ $.jsx(
                  "button",
                  {
                    type: "button",
                    ref: E.register,
                    tabIndex: E.tabIndex,
                    onFocus: E.onFocus,
                    onClick: () => ot(V.id, E.idx),
                    "aria-label": `Remove ${j?.label ?? V.field} filter`,
                    className: "flex items-center px-1.5 text-zinc-400 transition-colors hover:bg-zinc-200/60 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500/70 active:scale-[0.98] dark:text-zinc-500 dark:hover:bg-white/[0.08] dark:hover:text-zinc-200",
                    children: /* @__PURE__ */ $.jsx(g3, {})
                  }
                )
              ]
            },
            V.id
          );
        }) }),
        (() => {
          const V = Yt(), j = l.length === 0;
          return /* @__PURE__ */ $.jsxs(
            "button",
            {
              type: "button",
              ref: V.register,
              tabIndex: V.tabIndex,
              onFocus: V.onFocus,
              "data-fb-anchor": "add",
              "aria-label": j ? c : r,
              "aria-haspopup": "listbox",
              "aria-expanded": v?.kind === "add",
              onClick: () => {
                g({ kind: "add" });
              },
              className: [
                "flex items-center gap-1 rounded-md border border-dashed px-2 py-[6px] text-[13px] font-medium leading-none transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 active:scale-[0.98]",
                "border-zinc-300 text-zinc-600 hover:border-zinc-400 hover:bg-zinc-100 hover:text-zinc-900",
                "dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:bg-white/[0.06] dark:hover:text-zinc-100"
              ].join(" "),
              children: [
                /* @__PURE__ */ $.jsx(p3, {}),
                j ? c : r
              ]
            }
          );
        })(),
        Z && /* @__PURE__ */ $.jsx(
          "button",
          {
            type: "button",
            onClick: W,
            className: "ml-0.5 rounded-md px-2 py-[6px] text-[13px] leading-none text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 dark:text-zinc-400 dark:hover:bg-white/[0.06] dark:hover:text-zinc-100",
            children: "Clear"
          }
        ),
        v && qt && /* @__PURE__ */ $.jsx(m3, { anchorKey: qt, onClose: () => g(null), children: Ct() })
      ]
    }
  );
}
function p3() {
  return /* @__PURE__ */ $.jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", "aria-hidden": !0, children: /* @__PURE__ */ $.jsx(
    "path",
    {
      d: "M6 2.5v7M2.5 6h7",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round"
    }
  ) });
}
function g3() {
  return /* @__PURE__ */ $.jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", "aria-hidden": !0, children: /* @__PURE__ */ $.jsx(
    "path",
    {
      d: "M3 3l6 6M9 3l-6 6",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round"
    }
  ) });
}
function Tg() {
  return /* @__PURE__ */ $.jsx("svg", { width: "11", height: "11", viewBox: "0 0 12 12", fill: "none", "aria-hidden": !0, children: /* @__PURE__ */ $.jsx(
    "path",
    {
      d: "M2.5 6.2l2.2 2.3L9.5 3.7",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) });
}
function v3() {
  return /* @__PURE__ */ $.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 14 14",
      fill: "none",
      "aria-hidden": !0,
      className: "animate-spin",
      children: [
        /* @__PURE__ */ $.jsx(
          "circle",
          {
            cx: "7",
            cy: "7",
            r: "5.5",
            stroke: "currentColor",
            strokeOpacity: "0.2",
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ $.jsx(
          "path",
          {
            d: "M12.5 7A5.5 5.5 0 0 0 7 1.5",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round"
          }
        )
      ]
    }
  );
}
const bg = [
  "3D",
  "Social Media",
  "Audiovisual",
  "Motion",
  "Campanhas",
  "Produto",
  "IA",
  "E-commerce",
  "Manipulação",
  "Design"
];
function S3() {
  return Array.from(document.querySelectorAll(".card")).map((a) => {
    const l = (a.dataset.cats || a.dataset.cat || "").split("|").map((o) => o.trim()).filter(Boolean);
    return {
      el: a,
      slug: a.dataset.projectSlug || a.querySelector("h2")?.textContent?.trim() || "",
      title: a.querySelector("h2")?.textContent?.trim() || a.dataset.projectSlug || "Projeto",
      categories: l
    };
  });
}
function T3(a) {
  const l = new Set(a.flatMap((d) => d.categories)), r = [
    ...bg.filter((d) => l.has(d)),
    ...Array.from(l).filter((d) => !bg.includes(d))
  ].map((d) => ({
    value: d,
    label: d
  })), c = a.filter((d) => d.slug).map((d) => ({
    value: d.slug,
    label: d.title
  }));
  return [
    {
      id: "category",
      label: "Categoria",
      operators: [
        { value: "is", label: "é" },
        { value: "is_not", label: "não é" },
        { value: "is_any", label: "é qualquer um de", multi: !0 }
      ],
      options: r
    },
    {
      id: "project",
      label: "Projeto",
      operators: [
        { value: "is", label: "é" },
        { value: "is_not", label: "não é" }
      ],
      options: c
    }
  ];
}
function b3(a, l) {
  if (!l.values.length) return !0;
  if (l.field === "category") {
    if (l.operator === "is")
      return a.categories.includes(l.values[0]);
    if (l.operator === "is_not")
      return !a.categories.includes(l.values[0]);
    if (l.operator === "is_any")
      return l.values.some((o) => a.categories.includes(o));
  }
  if (l.field === "project") {
    if (l.operator === "is")
      return a.slug === l.values[0];
    if (l.operator === "is_not")
      return a.slug !== l.values[0];
  }
  return !0;
}
function E3() {
  const a = q.useMemo(() => S3(), []), l = q.useMemo(() => T3(a), [a]), [o, r] = q.useState([]);
  return q.useEffect(() => {
    a.forEach((c) => {
      c.el.hidden = !o.every((d) => b3(c, d));
    }), document.dispatchEvent(
      new CustomEvent("ms:portfolio-filter-change", {
        detail: { filters: o }
      })
    );
  }, [a, o]), q.useEffect(
    () => () => {
      a.forEach((c) => {
        c.el.hidden = !1;
      });
    },
    [a]
  ), /* @__PURE__ */ $.jsx("div", { className: "dark w-full", children: /* @__PURE__ */ $.jsx(
    y3,
    {
      fields: l,
      value: o,
      onChange: r,
      addLabel: "Filtro",
      emptyLabel: "Filtrar projetos",
      "aria-label": "Filtros de projetos",
      className: "w-full"
    }
  ) });
}
const Fl = document.getElementById("filters");
if (Fl) {
  Fl.innerHTML = "", Fl.className = "", Fl.dataset.reactFilterMounted = "1";
  const a = hb.createRoot(Fl);
  a.render(
    /* @__PURE__ */ $.jsx(q.StrictMode, { children: /* @__PURE__ */ $.jsx(E3, {}) })
  ), window.addEventListener(
    "pagehide",
    () => {
      a.unmount();
    },
    { once: !0 }
  );
}
