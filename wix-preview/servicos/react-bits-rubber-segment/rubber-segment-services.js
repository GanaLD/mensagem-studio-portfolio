var Ic = { exports: {} }, nu = {};
var kg;
function Tb() {
  if (kg) return nu;
  kg = 1;
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
  return nu.Fragment = l, nu.jsx = o, nu.jsxs = o, nu;
}
var Wg;
function bb() {
  return Wg || (Wg = 1, Ic.exports = Tb()), Ic.exports;
}
var zn = bb(), $c = { exports: {} }, ft = {};
var Ig;
function Eb() {
  if (Ig) return ft;
  Ig = 1;
  var a = /* @__PURE__ */ Symbol.for("react.transitional.element"), l = /* @__PURE__ */ Symbol.for("react.portal"), o = /* @__PURE__ */ Symbol.for("react.fragment"), r = /* @__PURE__ */ Symbol.for("react.strict_mode"), c = /* @__PURE__ */ Symbol.for("react.profiler"), d = /* @__PURE__ */ Symbol.for("react.consumer"), h = /* @__PURE__ */ Symbol.for("react.context"), y = /* @__PURE__ */ Symbol.for("react.forward_ref"), v = /* @__PURE__ */ Symbol.for("react.suspense"), S = /* @__PURE__ */ Symbol.for("react.memo"), p = /* @__PURE__ */ Symbol.for("react.lazy"), g = /* @__PURE__ */ Symbol.for("react.activity"), b = /* @__PURE__ */ Symbol.for("react.view_transition"), _ = Symbol.iterator;
  function z(A) {
    return A === null || typeof A != "object" ? null : (A = _ && A[_] || A["@@iterator"], typeof A == "function" ? A : null);
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
  }, U = Object.assign, L = {};
  function j(A, H, I) {
    this.props = A, this.context = H, this.refs = L, this.updater = I || w;
  }
  j.prototype.isReactComponent = {}, j.prototype.setState = function(A, H) {
    if (typeof A != "object" && typeof A != "function" && A != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, A, H, "setState");
  }, j.prototype.forceUpdate = function(A) {
    this.updater.enqueueForceUpdate(this, A, "forceUpdate");
  };
  function Q() {
  }
  Q.prototype = j.prototype;
  function B(A, H, I) {
    this.props = A, this.context = H, this.refs = L, this.updater = I || w;
  }
  var k = B.prototype = new Q();
  k.constructor = B, U(k, j.prototype), k.isPureReactComponent = !0;
  var ot = Array.isArray;
  function Z() {
  }
  var q = { H: null, A: null, T: null, S: null }, st = Object.prototype.hasOwnProperty;
  function J(A, H, I) {
    var $ = I.ref;
    return {
      $$typeof: a,
      type: A,
      key: H,
      ref: $ !== void 0 ? $ : null,
      props: I
    };
  }
  function ct(A, H) {
    return J(A.type, H, A.props);
  }
  function gt(A) {
    return typeof A == "object" && A !== null && A.$$typeof === a;
  }
  function Yt(A) {
    var H = { "=": "=0", ":": "=2" };
    return "$" + A.replace(/[=:]/g, function(I) {
      return H[I];
    });
  }
  var Ot = /\/+/g;
  function Tt(A, H) {
    return typeof A == "object" && A !== null && A.key != null ? Yt("" + A.key) : H.toString(36);
  }
  function G(A) {
    switch (A.status) {
      case "fulfilled":
        return A.value;
      case "rejected":
        throw A.reason;
      default:
        switch (typeof A.status == "string" ? A.then(Z, Z) : (A.status = "pending", A.then(
          function(H) {
            A.status === "pending" && (A.status = "fulfilled", A.value = H);
          },
          function(H) {
            A.status === "pending" && (A.status = "rejected", A.reason = H);
          }
        )), A.status) {
          case "fulfilled":
            return A.value;
          case "rejected":
            throw A.reason;
        }
    }
    throw A;
  }
  function W(A, H, I, $, dt) {
    var bt = typeof A;
    (bt === "undefined" || bt === "boolean") && (A = null);
    var St = !1;
    if (A === null) St = !0;
    else
      switch (bt) {
        case "bigint":
        case "string":
        case "number":
          St = !0;
          break;
        case "object":
          switch (A.$$typeof) {
            case a:
            case l:
              St = !0;
              break;
            case p:
              return St = A._init, W(
                St(A._payload),
                H,
                I,
                $,
                dt
              );
          }
      }
    if (St)
      return dt = dt(A), St = $ === "" ? "." + Tt(A, 0) : $, ot(dt) ? (I = "", St != null && (I = St.replace(Ot, "$&/") + "/"), W(dt, H, I, "", function(be) {
        return be;
      })) : dt != null && (gt(dt) && (dt = ct(
        dt,
        I + (dt.key == null || A && A.key === dt.key ? "" : ("" + dt.key).replace(
          Ot,
          "$&/"
        ) + "/") + St
      )), H.push(dt)), 1;
    St = 0;
    var tt = $ === "" ? "." : $ + ":";
    if (ot(A))
      for (var lt = 0; lt < A.length; lt++)
        $ = A[lt], bt = tt + Tt($, lt), St += W(
          $,
          H,
          I,
          bt,
          dt
        );
    else if (lt = z(A), typeof lt == "function")
      for (A = lt.call(A), lt = 0; !($ = A.next()).done; )
        $ = $.value, bt = tt + Tt($, lt++), St += W(
          $,
          H,
          I,
          bt,
          dt
        );
    else if (bt === "object") {
      if (typeof A.then == "function")
        return W(
          G(A),
          H,
          I,
          $,
          dt
        );
      throw H = String(A), Error(
        "Objects are not valid as a React child (found: " + (H === "[object Object]" ? "object with keys {" + Object.keys(A).join(", ") + "}" : H) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return St;
  }
  function Y(A, H, I) {
    if (A == null) return A;
    var $ = [], dt = 0;
    return W(A, $, "", "", function(bt) {
      return H.call(I, bt, dt++);
    }), $;
  }
  function at(A) {
    if (A._status === -1) {
      var H = A._result, I = H();
      I.then(
        function($) {
          (A._status === 0 || A._status === -1) && (A._status = 1, A._result = $, I.status === void 0 && (I.status = "fulfilled", I.value = $));
        },
        function($) {
          (A._status === 0 || A._status === -1) && (A._status = 2, A._result = $, I.status === void 0 && (I.status = "rejected", I.reason = $));
        }
      ), A._status === -1 && (A._status = 0, A._result = I);
    }
    if (A._status === 1) return A._result.default;
    throw A._result;
  }
  var ht = typeof reportError == "function" ? reportError : function(A) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var H = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof A == "object" && A !== null && typeof A.message == "string" ? String(A.message) : String(A),
        error: A
      });
      if (!window.dispatchEvent(H)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", A);
      return;
    }
    console.error(A);
  };
  function Qt(A) {
    var H = q.T, I = {};
    I.types = H !== null ? H.types : null, q.T = I;
    try {
      var $ = A(), dt = q.S;
      dt !== null && dt(I, $), typeof $ == "object" && $ !== null && typeof $.then == "function" && $.then(Z, ht);
    } catch (bt) {
      ht(bt);
    } finally {
      H !== null && I.types !== null && (H.types = I.types), q.T = H;
    }
  }
  function Se(A) {
    var H = q.T;
    if (H !== null) {
      var I = H.types;
      I === null ? H.types = [A] : I.indexOf(A) === -1 && I.push(A);
    } else Qt(Se.bind(null, A));
  }
  var ce = {
    map: Y,
    forEach: function(A, H, I) {
      Y(
        A,
        function() {
          H.apply(this, arguments);
        },
        I
      );
    },
    count: function(A) {
      var H = 0;
      return Y(A, function() {
        H++;
      }), H;
    },
    toArray: function(A) {
      return Y(A, function(H) {
        return H;
      }) || [];
    },
    only: function(A) {
      if (!gt(A))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return A;
    }
  };
  return ft.Activity = g, ft.Children = ce, ft.Component = j, ft.Fragment = o, ft.Profiler = c, ft.PureComponent = B, ft.StrictMode = r, ft.Suspense = v, ft.ViewTransition = b, ft.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = q, ft.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(A) {
      return q.H.useMemoCache(A);
    }
  }, ft.addTransitionType = Se, ft.cache = function(A) {
    return function() {
      return A.apply(null, arguments);
    };
  }, ft.cacheSignal = function() {
    return null;
  }, ft.cloneElement = function(A, H, I) {
    if (A == null)
      throw Error(
        "The argument must be a React element, but you passed " + A + "."
      );
    var $ = U({}, A.props), dt = A.key;
    if (H != null)
      for (bt in H.key !== void 0 && (dt = "" + H.key), H)
        !st.call(H, bt) || bt === "key" || bt === "__self" || bt === "__source" || bt === "ref" && H.ref === void 0 || ($[bt] = H[bt]);
    var bt = arguments.length - 2;
    if (bt === 1) $.children = I;
    else if (1 < bt) {
      for (var St = Array(bt), tt = 0; tt < bt; tt++)
        St[tt] = arguments[tt + 2];
      $.children = St;
    }
    return J(A.type, dt, $);
  }, ft.createContext = function(A) {
    return A = {
      $$typeof: h,
      _currentValue: A,
      _currentValue2: A,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, A.Provider = A, A.Consumer = {
      $$typeof: d,
      _context: A
    }, A;
  }, ft.createElement = function(A, H, I) {
    var $, dt = {}, bt = null;
    if (H != null)
      for ($ in H.key !== void 0 && (bt = "" + H.key), H)
        st.call(H, $) && $ !== "key" && $ !== "__self" && $ !== "__source" && (dt[$] = H[$]);
    var St = arguments.length - 2;
    if (St === 1) dt.children = I;
    else if (1 < St) {
      for (var tt = Array(St), lt = 0; lt < St; lt++)
        tt[lt] = arguments[lt + 2];
      dt.children = tt;
    }
    if (A && A.defaultProps)
      for ($ in St = A.defaultProps, St)
        dt[$] === void 0 && (dt[$] = St[$]);
    return J(A, bt, dt);
  }, ft.createRef = function() {
    return { current: null };
  }, ft.forwardRef = function(A) {
    return { $$typeof: y, render: A };
  }, ft.isValidElement = gt, ft.lazy = function(A) {
    return {
      $$typeof: p,
      _payload: { _status: -1, _result: A },
      _init: at
    };
  }, ft.memo = function(A, H) {
    return {
      $$typeof: S,
      type: A,
      compare: H === void 0 ? null : H
    };
  }, ft.startTransition = Qt, ft.unstable_useCacheRefresh = function() {
    return q.H.useCacheRefresh();
  }, ft.use = function(A) {
    return q.H.use(A);
  }, ft.useActionState = function(A, H, I) {
    return q.H.useActionState(A, H, I);
  }, ft.useCallback = function(A, H) {
    return q.H.useCallback(A, H);
  }, ft.useContext = function(A) {
    return q.H.useContext(A);
  }, ft.useDebugValue = function() {
  }, ft.useDeferredValue = function(A, H) {
    return q.H.useDeferredValue(A, H);
  }, ft.useEffect = function(A, H) {
    return q.H.useEffect(A, H);
  }, ft.useEffectEvent = function(A) {
    return q.H.useEffectEvent(A);
  }, ft.useId = function() {
    return q.H.useId();
  }, ft.useImperativeHandle = function(A, H, I) {
    return q.H.useImperativeHandle(A, H, I);
  }, ft.useInsertionEffect = function(A, H) {
    return q.H.useInsertionEffect(A, H);
  }, ft.useLayoutEffect = function(A, H) {
    return q.H.useLayoutEffect(A, H);
  }, ft.useMemo = function(A, H) {
    return q.H.useMemo(A, H);
  }, ft.useOptimistic = function(A, H) {
    return q.H.useOptimistic(A, H);
  }, ft.useReducer = function(A, H, I) {
    return q.H.useReducer(A, H, I);
  }, ft.useRef = function(A) {
    return q.H.useRef(A);
  }, ft.useState = function(A) {
    return q.H.useState(A);
  }, ft.useSyncExternalStore = function(A, H, I) {
    return q.H.useSyncExternalStore(
      A,
      H,
      I
    );
  }, ft.useTransition = function() {
    return q.H.useTransition();
  }, ft.version = "19.3.0", ft;
}
var $g;
function Jf() {
  return $g || ($g = 1, $c.exports = Eb()), $c.exports;
}
var it = Jf(), tf = { exports: {} }, iu = {}, ef = { exports: {} }, nf = {};
var t0;
function Ab() {
  return t0 || (t0 = 1, (function(a) {
    function l(G, W) {
      var Y = G.length;
      G.push(W);
      t: for (; 0 < Y; ) {
        var at = Y - 1 >>> 1, ht = G[at];
        if (0 < c(ht, W))
          G[at] = W, G[Y] = ht, Y = at;
        else break t;
      }
    }
    function o(G) {
      return G.length === 0 ? null : G[0];
    }
    function r(G) {
      if (G.length === 0) return null;
      var W = G[0], Y = G.pop();
      if (Y !== W) {
        G[0] = Y;
        t: for (var at = 0, ht = G.length, Qt = ht >>> 1; at < Qt; ) {
          var Se = 2 * (at + 1) - 1, ce = G[Se], A = Se + 1, H = G[A];
          if (0 > c(ce, Y))
            A < ht && 0 > c(H, ce) ? (G[at] = H, G[A] = Y, at = A) : (G[at] = ce, G[Se] = Y, at = Se);
          else if (A < ht && 0 > c(H, Y))
            G[at] = H, G[A] = Y, at = A;
          else break t;
        }
      }
      return W;
    }
    function c(G, W) {
      var Y = G.sortIndex - W.sortIndex;
      return Y !== 0 ? Y : G.id - W.id;
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
    var v = [], S = [], p = 1, g = null, b = 3, _ = !1, z = !1, w = !1, U = !1, L = typeof setTimeout == "function" ? setTimeout : null, j = typeof clearTimeout == "function" ? clearTimeout : null, Q = typeof setImmediate < "u" ? setImmediate : null;
    function B(G) {
      for (var W = o(S); W !== null; ) {
        if (W.callback === null) r(S);
        else if (W.startTime <= G)
          r(S), W.sortIndex = W.expirationTime, l(v, W);
        else break;
        W = o(S);
      }
    }
    function k(G) {
      if (w = !1, B(G), !z)
        if (o(v) !== null)
          z = !0, ot || (ot = !0, gt());
        else {
          var W = o(S);
          W !== null && Tt(k, W.startTime - G);
        }
    }
    var ot = !1, Z = -1, q = 5, st = -1;
    function J() {
      return U ? !0 : !(a.unstable_now() - st < q);
    }
    function ct() {
      if (U = !1, ot) {
        var G = a.unstable_now();
        st = G;
        var W = !0;
        try {
          t: {
            z = !1, w && (w = !1, j(Z), Z = -1), _ = !0;
            var Y = b;
            try {
              e: {
                for (B(G), g = o(v); g !== null && !(g.expirationTime > G && J()); ) {
                  var at = g.callback;
                  if (typeof at == "function") {
                    g.callback = null, b = g.priorityLevel;
                    var ht = at(
                      g.expirationTime <= G
                    );
                    if (G = a.unstable_now(), typeof ht == "function") {
                      g.callback = ht, B(G), W = !0;
                      break e;
                    }
                    g === o(v) && r(v), B(G);
                  } else r(v);
                  g = o(v);
                }
                if (g !== null) W = !0;
                else {
                  var Qt = o(S);
                  Qt !== null && Tt(
                    k,
                    Qt.startTime - G
                  ), W = !1;
                }
              }
              break t;
            } finally {
              g = null, b = Y, _ = !1;
            }
            W = void 0;
          }
        } finally {
          W ? gt() : ot = !1;
        }
      }
    }
    var gt;
    if (typeof Q == "function")
      gt = function() {
        Q(ct);
      };
    else if (typeof MessageChannel < "u") {
      var Yt = new MessageChannel(), Ot = Yt.port2;
      Yt.port1.onmessage = ct, gt = function() {
        Ot.postMessage(null);
      };
    } else
      gt = function() {
        L(ct, 0);
      };
    function Tt(G, W) {
      Z = L(function() {
        G(a.unstable_now());
      }, W);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(G) {
      G.callback = null;
    }, a.unstable_forceFrameRate = function(G) {
      0 > G || 125 < G ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : q = 0 < G ? Math.floor(1e3 / G) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return b;
    }, a.unstable_next = function(G) {
      switch (b) {
        case 1:
        case 2:
        case 3:
          var W = 3;
          break;
        default:
          W = b;
      }
      var Y = b;
      b = W;
      try {
        return G();
      } finally {
        b = Y;
      }
    }, a.unstable_requestPaint = function() {
      U = !0;
    }, a.unstable_runWithPriority = function(G, W) {
      switch (G) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          G = 3;
      }
      var Y = b;
      b = G;
      try {
        return W();
      } finally {
        b = Y;
      }
    }, a.unstable_scheduleCallback = function(G, W, Y) {
      var at = a.unstable_now();
      switch (typeof Y == "object" && Y !== null ? (Y = Y.delay, Y = typeof Y == "number" && 0 < Y ? at + Y : at) : Y = at, G) {
        case 1:
          var ht = -1;
          break;
        case 2:
          ht = 250;
          break;
        case 5:
          ht = 1073741823;
          break;
        case 4:
          ht = 1e4;
          break;
        default:
          ht = 5e3;
      }
      return ht = Y + ht, G = {
        id: p++,
        callback: W,
        priorityLevel: G,
        startTime: Y,
        expirationTime: ht,
        sortIndex: -1
      }, Y > at ? (G.sortIndex = Y, l(S, G), o(v) === null && G === o(S) && (w ? (j(Z), Z = -1) : w = !0, Tt(k, Y - at))) : (G.sortIndex = ht, l(v, G), z || _ || (z = !0, ot || (ot = !0, gt()))), G;
    }, a.unstable_shouldYield = J, a.unstable_wrapCallback = function(G) {
      var W = b;
      return function() {
        var Y = b;
        b = W;
        try {
          return G.apply(this, arguments);
        } finally {
          b = Y;
        }
      };
    };
  })(nf)), nf;
}
var e0;
function Mb() {
  return e0 || (e0 = 1, ef.exports = Ab()), ef.exports;
}
var af = { exports: {} }, pe = {};
var n0;
function Db() {
  if (n0) return pe;
  n0 = 1;
  var a = Jf();
  function l(p) {
    var g = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      g += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        g += "&args[]=" + encodeURIComponent(arguments[b]);
    }
    return "Minified React error #" + p + "; visit " + g + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  function y(p, g, b) {
    var _ = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: _ == null ? null : _ === h ? h : "" + _,
      children: p,
      containerInfo: g,
      implementation: b
    };
  }
  var v = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function S(p, g) {
    if (p === "font") return "";
    if (typeof g == "string")
      return g === "use-credentials" ? g : "";
  }
  return pe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, pe.browser = function(p) {
    return { $$typeof: d, _reason: p };
  }, pe.createPortal = function(p, g) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!g || g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)
      throw Error(l(299));
    return y(p, g, null, b);
  }, pe.flushSync = function(p) {
    var g = v.T, b = r.p;
    try {
      if (v.T = null, r.p = 2, p) return p();
    } finally {
      v.T = g, r.p = b, r.d.f();
    }
  }, pe.preconnect = function(p, g) {
    typeof p == "string" && (g ? (g = g.crossOrigin, g = typeof g == "string" ? g === "use-credentials" ? g : "" : void 0) : g = null, r.d.C(p, g));
  }, pe.prefetchDNS = function(p) {
    typeof p == "string" && r.d.D(p);
  }, pe.preinit = function(p, g) {
    if (typeof p == "string" && g && typeof g.as == "string") {
      var b = g.as, _ = S(b, g.crossOrigin), z = typeof g.integrity == "string" ? g.integrity : void 0, w = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
      b === "style" ? r.d.S(
        p,
        typeof g.precedence == "string" ? g.precedence : void 0,
        {
          crossOrigin: _,
          integrity: z,
          fetchPriority: w
        }
      ) : b === "script" && r.d.X(p, {
        crossOrigin: _,
        integrity: z,
        fetchPriority: w,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0
      });
    }
  }, pe.preinitModule = function(p, g) {
    if (typeof p == "string")
      if (typeof g == "object" && g !== null) {
        if (g.as == null || g.as === "script") {
          var b = S(
            g.as,
            g.crossOrigin
          );
          r.d.M(p, {
            crossOrigin: b,
            integrity: typeof g.integrity == "string" ? g.integrity : void 0,
            nonce: typeof g.nonce == "string" ? g.nonce : void 0,
            fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0
          });
        }
      } else g == null && r.d.M(p);
  }, pe.preload = function(p, g) {
    if (typeof p == "string" && typeof g == "object" && g !== null && typeof g.as == "string") {
      var b = g.as, _ = S(b, g.crossOrigin);
      r.d.L(p, b, {
        crossOrigin: _,
        integrity: typeof g.integrity == "string" ? g.integrity : void 0,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0,
        type: typeof g.type == "string" ? g.type : void 0,
        fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0,
        referrerPolicy: typeof g.referrerPolicy == "string" ? g.referrerPolicy : void 0,
        imageSrcSet: typeof g.imageSrcSet == "string" ? g.imageSrcSet : void 0,
        imageSizes: typeof g.imageSizes == "string" ? g.imageSizes : void 0,
        media: typeof g.media == "string" ? g.media : void 0
      });
    }
  }, pe.preloadModule = function(p, g) {
    if (typeof p == "string")
      if (g) {
        var b = S(g.as, g.crossOrigin);
        r.d.m(p, {
          as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
          crossOrigin: b,
          integrity: typeof g.integrity == "string" ? g.integrity : void 0,
          nonce: typeof g.nonce == "string" ? g.nonce : void 0,
          fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0
        });
      } else r.d.m(p);
  }, pe.requestFormReset = function(p) {
    r.d.r(p);
  }, pe.unstable_batchedUpdates = function(p, g) {
    return p(g);
  }, pe.useFormState = function(p, g, b) {
    return v.H.useFormState(p, g, b);
  }, pe.useFormStatus = function() {
    return v.H.useHostTransitionStatus();
  }, pe.version = "19.3.0", pe;
}
var i0;
function Cb() {
  if (i0) return af.exports;
  i0 = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (l) {
        console.error(l);
      }
  }
  return a(), af.exports = Db(), af.exports;
}
var a0;
function xb() {
  if (a0) return iu;
  a0 = 1;
  var a = Mb(), l = Jf(), o = Cb();
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
  function v(t) {
    if (d(t) !== t)
      throw Error(r(188));
  }
  function S(t) {
    var e = t.alternate;
    if (!e) {
      if (e = d(t), e === null) throw Error(r(188));
      return e !== t ? null : t;
    }
    for (var n = t, i = e; ; ) {
      var u = n.return;
      if (u === null) break;
      var s = u.alternate;
      if (s === null) {
        if (i = u.return, i !== null) {
          n = i;
          continue;
        }
        break;
      }
      if (u.child === s.child) {
        for (s = u.child; s; ) {
          if (s === n) return v(u), t;
          if (s === i) return v(u), e;
          s = s.sibling;
        }
        throw Error(r(188));
      }
      if (n.return !== i.return) n = u, i = s;
      else {
        for (var f = !1, m = u.child; m; ) {
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
        if (!f) {
          for (m = s.child; m; ) {
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
          if (!f) throw Error(r(189));
        }
      }
      if (n.alternate !== i) throw Error(r(190));
    }
    if (n.tag !== 3) throw Error(r(188));
    return n.stateNode.current === n ? t : e;
  }
  function p(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = p(t), e !== null) return e;
      t = t.sibling;
    }
    return null;
  }
  function g(t, e, n, i, u, s) {
    for (; t !== null; ) {
      if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && n(t, i, u, s) || (t.tag !== 22 || t.memoizedState === null) && (e || t.tag !== 5 && t.tag !== 27) && g(
        t.child,
        e,
        n,
        i,
        u,
        s
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
  function _(t) {
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
  function U(t) {
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
  var L = null, j = null;
  function Q(t, e, n) {
    return t === n ? !0 : t === e ? (L = t, !0) : !1;
  }
  function B(t, e, n) {
    return t === n ? (j = t, !1) : t === e ? (j !== null && (L = t), !0) : !1;
  }
  function k(t) {
    if (t === null) return null;
    do
      t = t === null ? null : t.return;
    while (t && t.tag !== 5 && t.tag !== 27 && t.tag !== 3);
    return t || null;
  }
  function ot(t, e, n) {
    for (var i = 0, u = t; u; u = n(u)) i++;
    u = 0;
    for (var s = e; s; s = n(s)) u++;
    for (; 0 < i - u; ) t = n(t), i--;
    for (; 0 < u - i; ) e = n(e), u--;
    for (; i--; ) {
      if (t === e || e !== null && t === e.alternate)
        return t;
      t = n(t), e = n(e);
    }
    return null;
  }
  var Z = Object.assign, q = /* @__PURE__ */ Symbol.for("react.element"), st = /* @__PURE__ */ Symbol.for("react.transitional.element"), J = /* @__PURE__ */ Symbol.for("react.portal"), ct = /* @__PURE__ */ Symbol.for("react.fragment"), gt = /* @__PURE__ */ Symbol.for("react.strict_mode"), Yt = /* @__PURE__ */ Symbol.for("react.profiler"), Ot = /* @__PURE__ */ Symbol.for("react.consumer"), Tt = /* @__PURE__ */ Symbol.for("react.context"), G = /* @__PURE__ */ Symbol.for("react.forward_ref"), W = /* @__PURE__ */ Symbol.for("react.suspense"), Y = /* @__PURE__ */ Symbol.for("react.suspense_list"), at = /* @__PURE__ */ Symbol.for("react.memo"), ht = /* @__PURE__ */ Symbol.for("react.lazy"), Qt = /* @__PURE__ */ Symbol.for("react.activity"), Se = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), ce = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), A = /* @__PURE__ */ Symbol.for("react.view_transition"), H = /* @__PURE__ */ Symbol.for("react.recoverable"), I = Symbol.iterator;
  function $(t) {
    return t === null || typeof t != "object" ? null : (t = I && t[I] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var dt = /* @__PURE__ */ Symbol.for("react.client.reference");
  function bt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === dt ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case ct:
        return "Fragment";
      case Yt:
        return "Profiler";
      case gt:
        return "StrictMode";
      case W:
        return "Suspense";
      case Y:
        return "SuspenseList";
      case Qt:
        return "Activity";
      case A:
        return "ViewTransition";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case J:
          return "Portal";
        case Tt:
          return t.displayName || "Context";
        case Ot:
          return (t._context.displayName || "Context") + ".Consumer";
        case G:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case at:
          return e = t.displayName || null, e !== null ? e : bt(t.type) || "Memo";
        case ht:
          e = t._payload, t = t._init;
          try {
            return bt(t(e));
          } catch {
          }
      }
    return null;
  }
  var St = Array.isArray, tt = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, lt = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, be = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, kn = [], un = -1;
  function Ee(t) {
    return { current: t };
  }
  function Bt(t) {
    0 > un || (t.current = kn[un], kn[un] = null, un--);
  }
  function X(t, e) {
    un++, kn[un] = t.current, t.current = e;
  }
  var F = Ee(null), pt = Ee(null), xt = Ee(null), _t = Ee(null);
  function Zt(t, e) {
    switch (X(xt, e), X(pt, t), X(F, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? lg(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = lg(e), t = ug(e, t);
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
    Bt(F), X(F, t);
  }
  function Re() {
    Bt(F), Bt(pt), Bt(xt);
  }
  function aa(t) {
    var e = t.memoizedState;
    e !== null && (Fa._currentValue = e.memoizedState, X(_t, t)), e = F.current;
    var n = ug(e, t.type);
    e !== n && (X(pt, t), X(F, n));
  }
  function la(t) {
    pt.current === t && (Bt(F), Bt(pt)), _t.current === t && (Bt(_t), Fa._currentValue = be);
  }
  var Wn, ua;
  function sn(t) {
    if (Wn === void 0)
      try {
        throw Error();
      } catch (n) {
        var e = n.stack.trim().match(/\n( *(at )?)/);
        Wn = e && e[1] || "", ua = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Wn + t + ua;
  }
  var sa = !1;
  function ol(t, e) {
    if (!t || sa) return "";
    sa = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var i = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var N = function() {
                throw Error();
              };
              if (Object.defineProperty(N.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(N, []);
                } catch (K) {
                  var M = K;
                }
                Reflect.construct(t, [], N);
              } else {
                try {
                  N.call();
                } catch (K) {
                  M = K;
                }
                N = !1;
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
                  }), N = !0, new t();
                } finally {
                  N && (O !== void 0 ? Object.defineProperty(t.prototype, "props", O) : delete t.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (K) {
                M = K;
              }
              (N = t()) && typeof N.catch == "function" && N.catch(function() {
              });
            }
          } catch (K) {
            if (K && M && typeof K.stack == "string")
              return [K.stack, M.stack];
          }
          return [null, null];
        }
      };
      i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        i.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        i.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var s = i.DetermineComponentFrameRoot(), f = s[0], m = s[1];
      if (f && m) {
        var T = f.split(`
`), C = m.split(`
`);
        for (u = i = 0; i < T.length && !T[i].includes("DetermineComponentFrameRoot"); )
          i++;
        for (; u < C.length && !C[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (i === T.length || u === C.length)
          for (i = T.length - 1, u = C.length - 1; 1 <= i && 0 <= u && T[i] !== C[u]; )
            u--;
        for (; 1 <= i && 0 <= u; i--, u--)
          if (T[i] !== C[u]) {
            if (i !== 1 || u !== 1)
              do
                if (i--, u--, 0 > u || T[i] !== C[u]) {
                  var R = `
` + T[i].replace(" at new ", " at ");
                  return t.displayName && R.includes("<anonymous>") && (R = R.replace("<anonymous>", t.displayName)), R;
                }
              while (1 <= i && 0 <= u);
            break;
          }
      }
    } finally {
      sa = !1, Error.prepareStackTrace = n;
    }
    return (n = t ? t.displayName || t.name : "") ? sn(n) : "";
  }
  function M1(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return sn(t.type);
      case 16:
        return sn("Lazy");
      case 13:
        return t.child !== e && e !== null ? sn("Suspense Fallback") : sn("Suspense");
      case 19:
        return sn("SuspenseList");
      case 0:
      case 15:
        return ol(t.type, !1);
      case 11:
        return ol(t.type.render, !1);
      case 1:
        return ol(t.type, !0);
      case 31:
        return sn("Activity");
      case 30:
        return sn("ViewTransition");
      default:
        return "";
    }
  }
  function xh(t) {
    try {
      var e = "", n = null;
      do
        e += M1(t, n), n = t, t = t.return;
      while (t);
      return e;
    } catch (i) {
      return `
Error generating stack: ` + i.message + `
` + i.stack;
    }
  }
  var Eo = Object.prototype.hasOwnProperty, Ao = a.unstable_scheduleCallback, Mo = a.unstable_cancelCallback, D1 = a.unstable_shouldYield, C1 = a.unstable_requestPaint, Le = a.unstable_now, x1 = a.unstable_getCurrentPriorityLevel, Oh = a.unstable_ImmediatePriority, Rh = a.unstable_UserBlockingPriority, Tu = a.unstable_NormalPriority, O1 = a.unstable_LowPriority, zh = a.unstable_IdlePriority, R1 = a.log, z1 = a.unstable_setDisableYieldValue, rl = null, He = null;
  function In(t) {
    if (typeof R1 == "function" && z1(t), He && typeof He.setStrictMode == "function")
      try {
        He.setStrictMode(rl, t);
      } catch {
      }
  }
  var je = Math.clz32 ? Math.clz32 : N1, _1 = Math.log, V1 = Math.LN2;
  function N1(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (_1(t) / V1 | 0) | 0;
  }
  var bu = 256, Eu = 262144, Au = 4194304;
  function Ri(t) {
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
  function Mu(t, e, n) {
    var i = t.pendingLanes;
    if (i === 0) return 0;
    var u = 0, s = t.suspendedLanes, f = t.pingedLanes;
    t = t.warmLanes;
    var m = i & 134217727;
    return m !== 0 ? (i = m & ~s, i !== 0 ? u = Ri(i) : (f &= m, f !== 0 ? u = Ri(f) : n || (n = m & ~t, n !== 0 && (u = Ri(n))))) : (m = i & ~s, m !== 0 ? u = Ri(m) : f !== 0 ? u = Ri(f) : n || (n = i & ~t, n !== 0 && (u = Ri(n)))), u === 0 ? 0 : e !== 0 && e !== u && (e & s) === 0 && (s = u & -u, n = e & -e, s >= n || s === 32 && (n & 4194048) !== 0) ? e : u;
  }
  function cl(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function _h(t, e) {
    (e & 8) !== 0 && (e |= e & 32);
    var n = t.entangledLanes;
    if (n !== 0)
      for (t = t.entanglements, n &= e; 0 < n; ) {
        var i = 31 - je(n), u = 1 << i;
        e |= t[i], n &= ~u;
      }
    return e;
  }
  function U1(t, e) {
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
  function Vh() {
    var t = Au;
    return Au <<= 1, (Au & 62914560) === 0 && (Au = 4194304), t;
  }
  function Do(t) {
    for (var e = [], n = 0; 31 > n; n++) e.push(t);
    return e;
  }
  function fl(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function w1(t, e, n, i, u, s) {
    var f = t.pendingLanes;
    t.pendingLanes = n, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= n, t.entangledLanes &= n, t.errorRecoveryDisabledLanes &= n, t.shellSuspendCounter = 0;
    var m = t.entanglements, T = t.expirationTimes, C = t.hiddenUpdates;
    for (n = f & ~n; 0 < n; ) {
      var R = 31 - je(n), N = 1 << R;
      m[R] = 0, T[R] = -1;
      var M = C[R];
      if (M !== null)
        for (C[R] = null, R = 0; R < M.length; R++) {
          var O = M[R];
          O !== null && (O.lane &= -536870913);
        }
      n &= ~N;
    }
    i !== 0 && Nh(t, i, 0), s !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= s & ~(f & ~e));
  }
  function Nh(t, e, n) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var i = 31 - je(e);
    t.entangledLanes |= e, t.entanglements[i] = t.entanglements[i] | 1073741824 | n & 261930;
  }
  function Uh(t, e) {
    var n = t.entangledLanes |= e;
    for (t = t.entanglements; n; ) {
      var i = 31 - je(n), u = 1 << i;
      u & e | t[i] & e && (t[i] |= e), n &= ~u;
    }
  }
  function wh(t, e) {
    var n = e & -e;
    return n = (n & 42) !== 0 ? 1 : Co(n), (n & (t.suspendedLanes | e)) !== 0 ? 0 : n;
  }
  function Co(t) {
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
  function xo(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Bh() {
    var t = lt.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Xg(t.type));
  }
  function Lh(t, e) {
    var n = lt.p;
    try {
      return lt.p = t, e();
    } finally {
      lt.p = n;
    }
  }
  var Nn = Math.random().toString(36).slice(2), fe = "__reactFiber$" + Nn, ze = "__reactProps$" + Nn, oa = "__reactContainer$" + Nn, Hh = "__reactEvents$" + Nn, B1 = "__reactListeners$" + Nn, L1 = "__reactHandles$" + Nn, jh = "__reactResources$" + Nn, hl = "__reactMarker$" + Nn, Du = "__reactLoad$" + Nn;
  function Cu(t) {
    delete t[fe], delete t[ze], delete t[B1], delete t[L1];
  }
  function zi(t) {
    var e;
    if (e = t[fe]) return e;
    for (var n = t.parentNode; n; ) {
      if (e = n[oa] || n[fe]) {
        if (n = e.alternate, e.child !== null || n !== null && n.child !== null)
          for (t = Ag(t); t !== null; ) {
            if (n = t[fe]) return n;
            t = Ag(t);
          }
        return e;
      }
      t = n, n = t.parentNode;
    }
    return null;
  }
  function ra(t) {
    if (t = t[fe] || t[oa]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function dl(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(r(33));
  }
  function ca(t) {
    var e = t[jh];
    return e || (e = t[jh] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function ue(t) {
    t[hl] = !0;
  }
  function Yh(t) {
    t[Du] = void 0;
  }
  var qh = /* @__PURE__ */ new Set(), Gh = {};
  function _i(t, e) {
    fa(t, e), fa(t + "Capture", e);
  }
  function fa(t, e) {
    for (Gh[t] = e, t = 0; t < e.length; t++)
      qh.add(e[t]);
  }
  var H1 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Xh = {}, Qh = {};
  function j1(t) {
    return Eo.call(Qh, t) ? !0 : Eo.call(Xh, t) ? !1 : H1.test(t) ? Qh[t] = !0 : (Xh[t] = !0, !1);
  }
  var Rt = !1;
  function Zh() {
    var t = Rt;
    return Rt = !1, t;
  }
  function xu(t, e, n) {
    if (j1(e))
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
  function Ou(t, e, n) {
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
  function Un(t, e, n, i) {
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
  function Ye(t) {
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
  function Kh(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function Y1(t, e, n) {
    var i = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      e
    );
    if (!t.hasOwnProperty(e) && typeof i < "u" && typeof i.get == "function" && typeof i.set == "function") {
      var u = i.get, s = i.set;
      return Object.defineProperty(t, e, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(f) {
          n = "" + f, s.call(this, f);
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
  function Oo(t) {
    if (!t._valueTracker) {
      var e = Kh(t) ? "checked" : "value";
      t._valueTracker = Y1(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function Jh(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var n = e.getValue(), i = "";
    return t && (i = Kh(t) ? t.checked ? "true" : "false" : t.value), t = i, t !== n ? (e.setValue(t), !0) : !1;
  }
  var q1 = /[\n"\\]/g;
  function Fe(t) {
    return t.replace(
      q1,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ro(t, e, n, i, u, s, f, m) {
    t.name = "", f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? t.type = f : t.removeAttribute("type"), e != null ? f === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + Ye(e)) : t.value !== "" + Ye(e) && (t.value = "" + Ye(e)) : f !== "submit" && f !== "reset" || t.removeAttribute("value"), e != null ? f === "number" && t.value == e ? zo(t, Ye(t.value)) : zo(t, Ye(e)) : n != null ? zo(t, Ye(n)) : i != null && t.removeAttribute("value"), u == null && s != null && (t.defaultChecked = !!s), u != null && (t.checked = u && typeof u != "function" && typeof u != "symbol"), m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? t.name = "" + Ye(m) : t.removeAttribute("name");
  }
  function Fh(t, e, n, i, u, s, f, m) {
    if (s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (t.type = s), e != null || n != null) {
      if (!(s !== "submit" && s !== "reset" || e != null)) {
        Oo(t);
        return;
      }
      n = n != null ? "" + Ye(n) : "", e = e != null ? "" + Ye(e) : n, m || e === t.value || (t.value = e), t.defaultValue = e;
    }
    i = i ?? u, i = typeof i != "function" && typeof i != "symbol" && !!i, t.checked = m ? t.checked : !!i, t.defaultChecked = !!i, f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (t.name = f), Oo(t);
  }
  function zo(t, e) {
    t.defaultValue !== "" + e && (t.defaultValue = "" + e);
  }
  function ha(t, e, n, i) {
    if (t = t.options, e) {
      e = {};
      for (var u = 0; u < n.length; u++)
        e["$" + n[u]] = !0;
      for (n = 0; n < t.length; n++)
        u = e.hasOwnProperty("$" + t[n].value), t[n].selected !== u && (t[n].selected = u), u && i && (t[n].defaultSelected = !0);
    } else {
      for (n = "" + Ye(n), e = null, u = 0; u < t.length; u++) {
        if (t[u].value === n) {
          t[u].selected = !0, i && (t[u].defaultSelected = !0);
          return;
        }
        e !== null || t[u].disabled || (e = t[u]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function Ph(t, e, n) {
    if (e != null && (e = "" + Ye(e), e !== t.value && (t.value = e), n == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = n != null ? "" + Ye(n) : "";
  }
  function kh(t, e, n, i) {
    if (e == null) {
      if (i != null) {
        if (n != null) throw Error(r(92));
        if (St(i)) {
          if (1 < i.length) throw Error(r(93));
          i = i[0];
        }
        n = i;
      }
      n == null && (n = ""), e = n;
    }
    n = Ye(e), t.defaultValue = n, i = t.textContent, i === n && i !== "" && i !== null && (t.value = i), Oo(t);
  }
  function da(t, e) {
    if (e) {
      var n = t.firstChild;
      if (n && n === t.lastChild && n.nodeType === 3) {
        n.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var G1 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Wh(t, e, n) {
    var i = e.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? i ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : i ? t.setProperty(e, n) : typeof n != "number" || n === 0 || G1.has(e) ? e === "float" ? t.cssFloat = n : t[e] = ("" + n).trim() : t[e] = n + "px";
  }
  function Ih(t, e, n) {
    if (e != null && typeof e != "object")
      throw Error(r(62));
    if (t = t.style, n != null) {
      for (var i in n)
        !n.hasOwnProperty(i) || e != null && e.hasOwnProperty(i) || (i.indexOf("--") === 0 ? t.setProperty(i, "") : i === "float" ? t.cssFloat = "" : t[i] = "", Rt = !0);
      for (var u in e)
        i = e[u], e.hasOwnProperty(u) && n[u] !== i && (Wh(t, u, i), Rt = !0);
    } else
      for (var s in e)
        e.hasOwnProperty(s) && Wh(t, s, e[s]);
  }
  function _o(t) {
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
  var X1 = /* @__PURE__ */ new Map([
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
  ]), Q1 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ru(t) {
    return Q1.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function pn() {
  }
  var Vo = null;
  function No(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var ma = null, ya = null;
  function $h(t) {
    var e = ra(t);
    if (e && (t = e.stateNode)) {
      var n = t[ze] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (Ro(
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
              'input[name="' + Fe(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < n.length; e++) {
              var i = n[e];
              if (i !== t && i.form === t.form) {
                var u = i[ze] || null;
                if (!u) throw Error(r(90));
                Ro(
                  i,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
                );
              }
            }
            for (e = 0; e < n.length; e++)
              i = n[e], i.form === t.form && Jh(i);
          }
          break t;
        case "textarea":
          Ph(t, n.value, n.defaultValue);
          break t;
        case "select":
          e = n.value, e != null && ha(t, !!n.multiple, e, !1);
      }
    }
  }
  var Uo = !1;
  function td(t, e, n) {
    if (Uo) return t(e, n);
    Uo = !0;
    try {
      var i = t(e);
      return i;
    } finally {
      if (Uo = !1, (ma !== null || ya !== null) && (Rs(), ma && (e = ma, t = ya, ya = ma = null, $h(e), t)))
        for (e = 0; e < t.length; e++) $h(t[e]);
    }
  }
  function ml(t, e) {
    var n = t.stateNode;
    if (n === null) return null;
    var i = n[ze] || null;
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
  var wn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), wo = !1;
  if (wn)
    try {
      var yl = {};
      Object.defineProperty(yl, "passive", {
        get: function() {
          wo = !0;
        }
      }), window.addEventListener("test", yl, yl), window.removeEventListener("test", yl, yl);
    } catch {
      wo = !1;
    }
  var $n = null, Bo = null, zu = null;
  function ed() {
    if (zu) return zu;
    var t, e = Bo, n = e.length, i, u = "value" in $n ? $n.value : $n.textContent, s = u.length;
    for (t = 0; t < n && e[t] === u[t]; t++) ;
    var f = n - t;
    for (i = 1; i <= f && e[n - i] === u[s - i]; i++) ;
    return zu = u.slice(t, 1 < i ? 1 - i : void 0);
  }
  function _u(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Vu() {
    return !0;
  }
  function nd() {
    return !1;
  }
  function Ae(t) {
    function e(n, i, u, s, f) {
      this._reactName = n, this._targetInst = u, this.type = i, this.nativeEvent = s, this.target = f, this.currentTarget = null;
      for (var m in t)
        t.hasOwnProperty(m) && (n = t[m], this[m] = n ? n(s) : s[m]);
      return this.isDefaultPrevented = (s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1) ? Vu : nd, this.isPropagationStopped = nd, this;
    }
    return Z(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Vu);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Vu);
      },
      persist: function() {
      },
      isPersistent: Vu
    }), e;
  }
  var ti = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Nu = Ae(ti), gl = Z({}, ti, { view: 0, detail: 0 }), Z1 = Ae(gl), Lo, Ho, pl, Uu = Z({}, gl, {
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
    getModifierState: Yo,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== pl && (pl && t.type === "mousemove" ? (Lo = t.screenX - pl.screenX, Ho = t.screenY - pl.screenY) : Ho = Lo = 0, pl = t), Lo);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Ho;
    }
  }), id = Ae(Uu), K1 = Z({}, Uu, { dataTransfer: 0 }), J1 = Ae(K1), F1 = Z({}, gl, { relatedTarget: 0 }), jo = Ae(F1), P1 = Z({}, ti, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), k1 = Ae(P1), W1 = Z({}, ti, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), I1 = Ae(W1), $1 = Z({}, ti, { data: 0 }), ad = Ae($1), tS = {
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
  }, eS = {
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
  }, nS = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function iS(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = nS[t]) ? !!e[t] : !1;
  }
  function Yo() {
    return iS;
  }
  var aS = Z({}, gl, {
    key: function(t) {
      if (t.key) {
        var e = tS[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = _u(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? eS[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Yo,
    charCode: function(t) {
      return t.type === "keypress" ? _u(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? _u(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), lS = Ae(aS), uS = Z({}, Uu, {
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
  }), ld = Ae(uS), sS = Z({}, ti, { submitter: 0 }), oS = Ae(sS), rS = Z({}, gl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Yo
  }), cS = Ae(rS), fS = Z({}, ti, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), hS = Ae(fS), dS = Z({}, Uu, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), mS = Ae(dS), yS = Z({}, ti, {
    newState: 0,
    oldState: 0,
    source: 0
  }), gS = Ae(yS), pS = [9, 13, 27, 32], qo = wn && "CompositionEvent" in window, vl = null;
  wn && "documentMode" in document && (vl = document.documentMode);
  var vS = wn && "TextEvent" in window && !vl, ud = wn && (!qo || vl && 8 < vl && 11 >= vl), sd = " ", od = !1;
  function rd(t, e) {
    switch (t) {
      case "keyup":
        return pS.indexOf(e.keyCode) !== -1;
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
  function cd(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var ga = !1;
  function SS(t, e) {
    switch (t) {
      case "compositionend":
        return cd(e);
      case "keypress":
        return e.which !== 32 ? null : (od = !0, sd);
      case "textInput":
        return t = e.data, t === sd && od ? null : t;
      default:
        return null;
    }
  }
  function TS(t, e) {
    if (ga)
      return t === "compositionend" || !qo && rd(t, e) ? (t = ed(), zu = Bo = $n = null, ga = !1, t) : null;
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
        return ud && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var bS = {
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
  function fd(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!bS[t.type] : e === "textarea";
  }
  function hd(t, e, n, i) {
    ma ? ya ? ya.push(i) : ya = [i] : ma = i, e = ws(e, "onChange"), 0 < e.length && (n = new Nu(
      "onChange",
      "change",
      null,
      n,
      i
    ), t.push({ event: n, listeners: e }));
  }
  var Sl = null, Tl = null;
  function ES(t) {
    $y(t, 0);
  }
  function wu(t) {
    var e = dl(t);
    if (Jh(e)) return t;
  }
  function dd(t, e) {
    if (t === "change") return e;
  }
  var md = !1;
  if (wn) {
    var Go;
    if (wn) {
      var Xo = "oninput" in document;
      if (!Xo) {
        var yd = document.createElement("div");
        yd.setAttribute("oninput", "return;"), Xo = typeof yd.oninput == "function";
      }
      Go = Xo;
    } else Go = !1;
    md = Go && (!document.documentMode || 9 < document.documentMode);
  }
  function gd() {
    Sl && (Sl.detachEvent("onpropertychange", pd), Tl = Sl = null);
  }
  function pd(t) {
    if (t.propertyName === "value" && wu(Tl)) {
      var e = [];
      hd(
        e,
        Tl,
        t,
        No(t)
      ), td(ES, e);
    }
  }
  function AS(t, e, n) {
    t === "focusin" ? (gd(), Sl = e, Tl = n, Sl.attachEvent("onpropertychange", pd)) : t === "focusout" && gd();
  }
  function MS(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return wu(Tl);
  }
  function DS(t, e) {
    if (t === "click") return wu(e);
  }
  function CS(t, e) {
    if (t === "input" || t === "change")
      return wu(e);
  }
  function xS(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var qe = typeof Object.is == "function" ? Object.is : xS;
  function bl(t, e) {
    if (qe(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var n = Object.keys(t), i = Object.keys(e);
    if (n.length !== i.length) return !1;
    for (i = 0; i < n.length; i++) {
      var u = n[i];
      if (!Eo.call(e, u) || !qe(t[u], e[u]))
        return !1;
    }
    return !0;
  }
  function Qo(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  function vd(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Sd(t, e) {
    var n = vd(t);
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
      n = vd(n);
    }
  }
  function Td(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? Td(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function bd(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = Qo(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var n = typeof e.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) t = e.contentWindow;
      else break;
      e = Qo(t.document);
    }
    return e;
  }
  function Zo(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var OS = wn && "documentMode" in document && 11 >= document.documentMode, pa = null, Ko = null, El = null, Jo = !1;
  function Ed(t, e, n) {
    var i = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Jo || pa == null || pa !== Qo(i) || (i = pa, "selectionStart" in i && Zo(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
      anchorNode: i.anchorNode,
      anchorOffset: i.anchorOffset,
      focusNode: i.focusNode,
      focusOffset: i.focusOffset
    }), El && bl(El, i) || (El = i, i = ws(Ko, "onSelect"), 0 < i.length && (e = new Nu(
      "onSelect",
      "select",
      null,
      e,
      n
    ), t.push({ event: e, listeners: i }), e.target = pa)));
  }
  function Vi(t, e) {
    var n = {};
    return n[t.toLowerCase()] = e.toLowerCase(), n["Webkit" + t] = "webkit" + e, n["Moz" + t] = "moz" + e, n;
  }
  var va = {
    animationend: Vi("Animation", "AnimationEnd"),
    animationiteration: Vi("Animation", "AnimationIteration"),
    animationstart: Vi("Animation", "AnimationStart"),
    transitionrun: Vi("Transition", "TransitionRun"),
    transitionstart: Vi("Transition", "TransitionStart"),
    transitioncancel: Vi("Transition", "TransitionCancel"),
    transitionend: Vi("Transition", "TransitionEnd")
  }, Fo = {}, Ad = {};
  wn && (Ad = document.createElement("div").style, "AnimationEvent" in window || (delete va.animationend.animation, delete va.animationiteration.animation, delete va.animationstart.animation), "TransitionEvent" in window || delete va.transitionend.transition);
  function Ni(t) {
    if (Fo[t]) return Fo[t];
    if (!va[t]) return t;
    var e = va[t], n;
    for (n in e)
      if (e.hasOwnProperty(n) && n in Ad)
        return Fo[t] = e[n];
    return t;
  }
  var Md = Ni("animationend"), Dd = Ni("animationiteration"), Cd = Ni("animationstart"), RS = Ni("transitionrun"), zS = Ni("transitionstart"), _S = Ni("transitioncancel"), xd = Ni("transitionend"), Od = /* @__PURE__ */ new Map(), Po = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Po.push("scrollEnd");
  function on(t, e) {
    Od.set(t, e), _i(e, [t]);
  }
  var VS = 0;
  function Bn(t, e) {
    if (t.name != null && t.name !== "auto") return t.name;
    if (e.autoName !== null) return e.autoName;
    t = hn.identifierPrefix;
    var n = VS++;
    return t = "_" + t + "t_" + n.toString(32) + "_", e.autoName = t;
  }
  function Rd(t) {
    if (t == null || typeof t == "string")
      return t;
    var e = null, n = Ha;
    if (n !== null)
      for (var i = 0; i < n.length; i++) {
        var u = t[n[i]];
        if (u != null) {
          if (u === "none") return "none";
          e = e == null ? u : e + (" " + u);
        }
      }
    return e ?? t.default;
  }
  function Ln(t, e) {
    return t = Rd(t), e = Rd(e), e == null ? t === "auto" ? null : t : e === "auto" ? null : e;
  }
  var Bu = typeof reportError == "function" ? reportError : function(t) {
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
  }, Pe = [], Sa = 0, ko = 0;
  function Lu() {
    for (var t = Sa, e = ko = Sa = 0; e < t; ) {
      var n = Pe[e];
      Pe[e++] = null;
      var i = Pe[e];
      Pe[e++] = null;
      var u = Pe[e];
      Pe[e++] = null;
      var s = Pe[e];
      if (Pe[e++] = null, i !== null && u !== null) {
        var f = i.pending;
        f === null ? u.next = u : (u.next = f.next, f.next = u), i.pending = u;
      }
      s !== 0 && zd(n, u, s);
    }
  }
  function Hu(t, e, n, i) {
    Pe[Sa++] = t, Pe[Sa++] = e, Pe[Sa++] = n, Pe[Sa++] = i, ko |= i, t.lanes |= i, t = t.alternate, t !== null && (t.lanes |= i);
  }
  function Wo(t, e, n, i) {
    return Hu(t, e, n, i), ju(t);
  }
  function Ui(t, e) {
    return Hu(t, null, null, e), ju(t);
  }
  function zd(t, e, n) {
    t.lanes |= n;
    var i = t.alternate;
    i !== null && (i.lanes |= n);
    for (var u = !1, s = t.return; s !== null; )
      s.childLanes |= n, i = s.alternate, i !== null && (i.childLanes |= n), s.tag === 22 && (t = s.stateNode, t === null || t._visibility & 1 || (u = !0)), t = s, s = s.return;
    return t.tag === 3 ? (s = t.stateNode, u && e !== null && (u = 31 - je(n), t = s.hiddenUpdates, i = t[u], i === null ? t[u] = [e] : i.push(e), e.lane = n | 536870912), s) : null;
  }
  function ju(t) {
    if (50 < Ql)
      throw Ql = 0, Os = null, Error(r(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Ta = {};
  function NS(t, e, n, i) {
    this.tag = t, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function _e(t, e, n, i) {
    return new NS(t, e, n, i);
  }
  function Io(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Hn(t, e) {
    var n = t.alternate;
    return n === null ? (n = _e(
      t.tag,
      e,
      t.key,
      t.mode
    ), n.elementType = t.elementType, n.type = t.type, n.stateNode = t.stateNode, n.alternate = t, t.alternate = n) : (n.pendingProps = e, n.type = t.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = t.flags & 1206910976, n.childLanes = t.childLanes, n.lanes = t.lanes, n.child = t.child, n.memoizedProps = t.memoizedProps, n.memoizedState = t.memoizedState, n.updateQueue = t.updateQueue, e = t.dependencies, n.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, n.sibling = t.sibling, n.index = t.index, n.ref = t.ref, n.refCleanup = t.refCleanup, n;
  }
  function _d(t, e) {
    t.flags &= 1206910978;
    var n = t.alternate;
    return n === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = n.childLanes, t.lanes = n.lanes, t.child = n.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = n.memoizedProps, t.memoizedState = n.memoizedState, t.updateQueue = n.updateQueue, t.type = n.type, e = n.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function Yu(t, e, n, i, u, s) {
    var f = 0;
    if (i = t, typeof i == "function") Io(i) && (f = 1);
    else if (typeof i == "string")
      f = sb(
        t,
        n,
        F.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (i) {
        case Qt:
          return t = _e(31, n, e, u), t.elementType = Qt, t.lanes = s, t;
        case ct:
          return wi(n.children, u, s, e);
        case gt:
          f = 8, u |= 24;
          break;
        case Yt:
          return t = _e(12, n, e, u | 2), t.elementType = Yt, t.lanes = s, t;
        case W:
          return t = _e(13, n, e, u), t.elementType = W, t.lanes = s, t;
        case Y:
          return t = _e(19, n, e, u), t.elementType = Y, t.lanes = s, t;
        case Se:
        case A:
          return t = u | 32, t = _e(30, n, e, t), t.elementType = A, t.lanes = s, t.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, t;
        default:
          if (typeof i == "object" && i !== null)
            switch (i.$$typeof) {
              case Tt:
                f = 10;
                break t;
              case Ot:
                f = 9;
                break t;
              case G:
                f = 11;
                break t;
              case at:
                f = 14;
                break t;
              case ht:
                f = 16, i = null;
                break t;
            }
          f = 29, n = Error(
            r(130, t === null ? "null" : typeof t, "")
          ), i = null;
      }
    return e = _e(f, n, e, u), e.elementType = t, e.type = i, e.lanes = s, e;
  }
  function wi(t, e, n, i) {
    return t = _e(7, t, i, e), t.lanes = n, t;
  }
  function $o(t, e, n) {
    return t = _e(6, t, null, e), t.lanes = n, t;
  }
  function Vd(t) {
    var e = _e(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function tr(t, e, n) {
    return e = _e(
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
  function ke(t, e) {
    if (typeof t == "object" && t !== null) {
      var n = Nd.get(t);
      return n !== void 0 ? n : (e = {
        value: t,
        source: e,
        stack: xh(e)
      }, Nd.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: xh(e)
    };
  }
  var ba = [], Ea = 0, qu = null, Al = 0, We = [], Ie = 0, ei = null, vn = 1, Sn = "";
  function jn(t, e) {
    ba[Ea++] = Al, ba[Ea++] = qu, qu = t, Al = e;
  }
  function Ud(t, e, n) {
    We[Ie++] = vn, We[Ie++] = Sn, We[Ie++] = ei, ei = t;
    var i = vn;
    t = Sn;
    var u = 32 - je(i) - 1;
    i &= ~(1 << u), n += 1;
    var s = 32 - je(e) + u;
    if (30 < s) {
      var f = u - u % 5;
      s = (i & (1 << f) - 1).toString(32), i >>= f, u -= f, vn = 1 << 32 - je(e) + u | n << u | i, Sn = s + t;
    } else
      vn = 1 << s | n << u | i, Sn = t;
  }
  function Gu(t) {
    t.return !== null && (jn(t, 1), Ud(t, 1, 0));
  }
  function er(t) {
    for (; t === qu; )
      qu = ba[--Ea], ba[Ea] = null, Al = ba[--Ea], ba[Ea] = null;
    for (; t === ei; )
      ei = We[--Ie], We[Ie] = null, Sn = We[--Ie], We[Ie] = null, vn = We[--Ie], We[Ie] = null;
  }
  function wd(t, e) {
    We[Ie++] = vn, We[Ie++] = Sn, We[Ie++] = ei, vn = e.id, Sn = e.overflow, ei = t;
  }
  var se = null, Gt = null, vt = !1, ni = null, $e = !1, nr = Error(r(519));
  function ii(t) {
    var e = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ml(ke(e, t)), nr;
  }
  function Bd(t) {
    var e = t.stateNode, n = t.type, i = t.memoizedProps;
    switch (e[fe] = t, e[ze] = i, n) {
      case "dialog":
        At("cancel", e), At("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        At("load", e);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Kl.length; n++)
          At(Kl[n], e);
        break;
      case "source":
        At("error", e);
        break;
      case "img":
      case "image":
      case "link":
        At("error", e), At("load", e);
        break;
      case "details":
        At("toggle", e);
        break;
      case "input":
        At("invalid", e), Fh(
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
        At("invalid", e);
        break;
      case "textarea":
        At("invalid", e), kh(e, i.value, i.defaultValue, i.children);
    }
    n = i.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || e.textContent === "" + n || i.suppressHydrationWarning === !0 || ig(e.textContent, n) ? (i.popover != null && (At("beforetoggle", e), At("toggle", e)), i.onScroll != null && At("scroll", e), i.onScrollEnd != null && At("scrollend", e), i.onClick != null && (e.onclick = pn), e = !0) : e = !1, e || ii(t, !0);
  }
  function Xu(t) {
    for (se = t.return; se; )
      switch (se.tag) {
        case 5:
        case 31:
        case 13:
          $e = !1;
          return;
        case 27:
        case 3:
          $e = !0;
          return;
        default:
          se = se.return;
      }
  }
  function Aa(t) {
    if (t !== se) return !1;
    if (!vt) return Xu(t), vt = !0, !1;
    var e = t.tag, n;
    if ((n = e !== 3 && e !== 27) && ((n = e === 5) && (n = t.type, n = !(n !== "form" && n !== "button") || Vc(t.type, t.memoizedProps)), n = !n), n && Gt && ii(t), Xu(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      Gt = Eg(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      Gt = Eg(t);
    } else
      e === 27 ? (e = Gt, Si(t.type) ? (t = qc, qc = null, Gt = t) : Gt = e) : Gt = se ? en(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Bi() {
    Gt = se = null, vt = !1;
  }
  function ir() {
    var t = ni;
    return t !== null && (Ue === null ? Ue = t : Ue.push.apply(
      Ue,
      t
    ), ni = null), t;
  }
  function Ml(t) {
    ni === null ? ni = [t] : ni.push(t);
  }
  var ar = Ee(null), Li = null, Yn = null;
  function ai(t, e, n) {
    X(ar, e._currentValue), e._currentValue = n;
  }
  function qn(t) {
    t._currentValue = ar.current, Bt(ar);
  }
  function Qu(t, e, n) {
    for (; t !== null; ) {
      var i = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, i !== null && (i.childLanes |= e)) : i !== null && (i.childLanes & e) !== e && (i.childLanes |= e), t === n) break;
      t = t.return;
    }
  }
  function lr(t, e, n, i) {
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var s = u.dependencies;
      if (s !== null) {
        var f = u.child;
        s = s.firstContext;
        t: for (; s !== null; ) {
          var m = s;
          s = u;
          for (var T = 0; T < e.length; T++)
            if (m.context === e[T]) {
              s.lanes |= n, m = s.alternate, m !== null && (m.lanes |= n), Qu(
                s.return,
                n,
                t
              ), i || (f = null);
              break t;
            }
          s = m.next;
        }
      } else if (u.tag === 18) {
        if (f = u.return, f === null) throw Error(r(341));
        f.lanes |= n, s = f.alternate, s !== null && (s.lanes |= n), Qu(f, n, t), f = null;
      } else
        u.tag === 13 && u.memoizedState !== null && u.memoizedState.dehydrated === null ? (u.lanes |= n, f = u.alternate, f !== null && (f.lanes |= n), Qu(
          u.return,
          n,
          t
        ), f = u.child, f = f !== null ? f.sibling : null) : f = u.child;
      if (f !== null) f.return = u;
      else
        for (f = u; f !== null; ) {
          if (f === t) {
            f = null;
            break;
          }
          if (u = f.sibling, u !== null) {
            u.return = f.return, f = u;
            break;
          }
          f = f.return;
        }
      u = f;
    }
  }
  function Hi(t, e, n, i) {
    t = null;
    for (var u = e, s = !1; u !== null; ) {
      if (!s) {
        if ((u.flags & 524288) !== 0) s = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var f = u.alternate;
        if (f === null) throw Error(r(387));
        if (f = f.memoizedProps, f !== null) {
          var m = u.type;
          qe(u.pendingProps.value, f.value) || (t !== null ? t.push(m) : t = [m]);
        }
      } else if (u === _t.current) {
        if (f = u.alternate, f === null) throw Error(r(387));
        f.memoizedState.memoizedState !== u.memoizedState.memoizedState && (t !== null ? t.push(Fa) : t = [Fa]);
      }
      u = u.return;
    }
    return t !== null && lr(
      e,
      t,
      n,
      i
    ), e.flags |= 262144, t !== null;
  }
  function Zu(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!qe(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function ji(t) {
    Li = t, Yn = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function he(t) {
    return Ld(Li, t);
  }
  function Ku(t, e) {
    return Li === null && ji(t), Ld(t, e);
  }
  function Ld(t, e) {
    var n = e._currentValue;
    if (e = { context: e, memoizedValue: n, next: null }, Yn === null) {
      if (t === null) throw Error(r(308));
      Yn = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else Yn = Yn.next = e;
    return n;
  }
  var US = typeof AbortController < "u" ? AbortController : function() {
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
  }, wS = a.unstable_scheduleCallback, BS = a.unstable_NormalPriority, It = {
    $$typeof: Tt,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function ur() {
    return {
      controller: new US(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Dl(t) {
    t.refCount--, t.refCount === 0 && wS(BS, function() {
      t.controller.abort();
    });
  }
  function Hd(t, e) {
    if ((t.pendingLanes & 4194048) !== 0) {
      var n = t.transitionTypes;
      for (n === null && (n = t.transitionTypes = []), t = 0; t < e.length; t++) {
        var i = e[t];
        n.indexOf(i) === -1 && n.push(i);
      }
    }
  }
  var Cl = null;
  function LS(t) {
    var e = t.transitionTypes;
    return t.transitionTypes = null, e;
  }
  var xl = null, sr = 0, Yi = 0, Ma = null;
  function HS(t, e) {
    if (xl === null) {
      var n = xl = [];
      sr = 0, Yi = Ac(), Ma = {
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
    if (--sr === 0 && (Cl = null, xl !== null)) {
      Ma !== null && (Ma.status = "fulfilled");
      var t = xl;
      xl = null, Yi = 0, Ma = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function jS(t, e) {
    var n = [], i = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        n.push(u);
      }
    };
    return t.then(
      function() {
        i.status = "fulfilled", i.value = e;
        for (var u = 0; u < n.length; u++) (0, n[u])(e);
      },
      function(u) {
        for (i.status = "rejected", i.reason = u, u = 0; u < n.length; u++)
          (0, n[u])(void 0);
      }
    ), i;
  }
  var Yd = tt.S;
  tt.S = function(t, e) {
    if (Vy = Le(), typeof e == "object" && e !== null && typeof e.then == "function" && HS(t, e), Cl !== null)
      for (var n = Ga; n !== null; )
        Hd(n, Cl), n = n.next;
    if (n = t.types, n !== null) {
      for (var i = Ga; i !== null; )
        Hd(i, n), i = i.next;
      if (Yi !== 0) {
        i = Cl, i === null && (i = Cl = []);
        for (var u = 0; u < n.length; u++) {
          var s = n[u];
          i.indexOf(s) === -1 && i.push(s);
        }
      }
    }
    Yd !== null && Yd(t, e);
  };
  var qi = Ee(null);
  function or() {
    var t = qi.current;
    return t !== null ? t : qt.pooledCache;
  }
  function Ju(t, e) {
    e === null ? X(qi, qi.current) : X(qi, e.pool);
  }
  function qd() {
    var t = or();
    return t === null ? null : { parent: It._currentValue, pool: t };
  }
  var Da = Error(r(460)), rr = Error(r(474)), Fu = Error(r(542)), Pu = { then: function() {
  } };
  function Gd(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Xd(t, e, n) {
    switch (n = t[n], n === void 0 ? t.push(e) : n !== e && (e.then(pn, pn), e = n), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, Zd(t), t === void 0 && !("reason" in e) ? Error(r(600)) : t;
      default:
        if (typeof e.status == "string") e.then(pn, pn);
        else {
          if (t = qt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(r(482));
          t = e, t.status = "pending", t.then(
            function(i) {
              if (e.status === "pending") {
                var u = e;
                u.status = "fulfilled", u.value = i;
              }
            },
            function(i) {
              if (e.status === "pending") {
                var u = e;
                u.status = "rejected", u.reason = i;
              }
            }
          );
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw t = e.reason, Zd(t), t;
        }
        throw Xi = e, Da;
    }
  }
  function Gi(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (Xi = n, Da) : n;
    }
  }
  var Xi = null;
  function Qd() {
    if (Xi === null) throw Error(r(459));
    var t = Xi;
    return Xi = null, t;
  }
  function Zd(t) {
    if (t === Da || t === Fu)
      throw Error(r(483));
  }
  var Ca = null, Ol = 0;
  function ku(t) {
    var e = Ol;
    return Ol += 1, Ca === null && (Ca = []), Xd(Ca, t, e);
  }
  function li(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function Wu(t, e) {
    throw e.$$typeof === q ? Error(r(525)) : (t = Object.prototype.toString.call(e), Error(
      r(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function Kd(t) {
    function e(D, E) {
      if (t) {
        var x = D.deletions;
        x === null ? (D.deletions = [E], D.flags |= 16) : x.push(E);
      }
    }
    function n(D, E) {
      if (!t) return null;
      for (; E !== null; )
        e(D, E), E = E.sibling;
      return null;
    }
    function i(D) {
      for (var E = /* @__PURE__ */ new Map(); D !== null; )
        D.key === null ? E.set(D.index, D) : E.set(D.key, D), D = D.sibling;
      return E;
    }
    function u(D, E) {
      return D = Hn(D, E), D.index = 0, D.sibling = null, D;
    }
    function s(D, E, x) {
      return D.index = x, t ? (x = D.alternate, x !== null ? (x = x.index, x < E ? (D.flags |= 2, E) : x) : (D.flags |= 134217730, E)) : (D.flags |= 1048576, E);
    }
    function f(D) {
      return t && D.alternate === null && (D.flags |= 134217730), D;
    }
    function m(D, E, x, V) {
      return E === null || E.tag !== 6 ? (E = $o(x, D.mode, V), E.return = D, E) : (E = u(E, x), E.return = D, E);
    }
    function T(D, E, x, V) {
      var P = x.type;
      return P === ct ? (D = R(
        D,
        E,
        x.props.children,
        V,
        x.key
      ), li(D, x), D) : E !== null && (E.elementType === P || typeof P == "object" && P !== null && P.$$typeof === ht && Gi(P) === E.type) ? (E = u(E, x.props), li(E, x), E.return = D, E) : (E = Yu(
        x.type,
        x.key,
        x.props,
        null,
        D.mode,
        V
      ), li(E, x), E.return = D, E);
    }
    function C(D, E, x, V) {
      return E === null || E.tag !== 4 || E.stateNode.containerInfo !== x.containerInfo || E.stateNode.implementation !== x.implementation ? (E = tr(x, D.mode, V), E.return = D, E) : (E = u(E, x.children || []), E.return = D, E);
    }
    function R(D, E, x, V, P) {
      return E === null || E.tag !== 7 ? (E = wi(
        x,
        D.mode,
        V,
        P
      ), E.return = D, E) : (E = u(E, x), E.return = D, E);
    }
    function N(D, E, x) {
      if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint")
        return E = $o(
          "" + E,
          D.mode,
          x
        ), E.return = D, E;
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case st:
            return x = Yu(
              E.type,
              E.key,
              E.props,
              null,
              D.mode,
              x
            ), li(x, E), x.return = D, x;
          case J:
            return E = tr(
              E,
              D.mode,
              x
            ), E.return = D, E;
          case ht:
            return E = Gi(E), N(D, E, x);
        }
        if (St(E) || $(E))
          return E = wi(
            E,
            D.mode,
            x,
            null
          ), E.return = D, E;
        if (typeof E.then == "function")
          return N(D, ku(E), x);
        if (E.$$typeof === Tt)
          return N(
            D,
            Ku(D, E),
            x
          );
        Wu(D, E);
      }
      return null;
    }
    function M(D, E, x, V) {
      var P = E !== null ? E.key : null;
      if (typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint")
        return P !== null ? null : m(D, E, "" + x, V);
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case st:
            return x.key === P ? T(D, E, x, V) : null;
          case J:
            return x.key === P ? C(D, E, x, V) : null;
          case ht:
            return x = Gi(x), M(D, E, x, V);
        }
        if (St(x) || $(x))
          return P !== null ? null : R(D, E, x, V, null);
        if (typeof x.then == "function")
          return M(
            D,
            E,
            ku(x),
            V
          );
        if (x.$$typeof === Tt)
          return M(
            D,
            E,
            Ku(D, x),
            V
          );
        Wu(D, x);
      }
      return null;
    }
    function O(D, E, x, V, P) {
      if (typeof V == "string" && V !== "" || typeof V == "number" || typeof V == "bigint")
        return D = D.get(x) || null, m(E, D, "" + V, P);
      if (typeof V == "object" && V !== null) {
        switch (V.$$typeof) {
          case st:
            return D = D.get(
              V.key === null ? x : V.key
            ) || null, T(E, D, V, P);
          case J:
            return D = D.get(
              V.key === null ? x : V.key
            ) || null, C(E, D, V, P);
          case ht:
            return V = Gi(V), O(
              D,
              E,
              x,
              V,
              P
            );
        }
        if (St(V) || $(V))
          return D = D.get(x) || null, R(E, D, V, P, null);
        if (typeof V.then == "function")
          return O(
            D,
            E,
            x,
            ku(V),
            P
          );
        if (V.$$typeof === Tt)
          return O(
            D,
            E,
            x,
            Ku(E, V),
            P
          );
        Wu(E, V);
      }
      return null;
    }
    function K(D, E, x, V) {
      for (var P = null, Dt = null, ut = E, rt = E = 0, ee = null; ut !== null && rt < x.length; rt++) {
        ut.index > rt ? (ee = ut, ut = null) : ee = ut.sibling;
        var Ct = M(
          D,
          ut,
          x[rt],
          V
        );
        if (Ct === null) {
          ut === null && (ut = ee);
          break;
        }
        t && ut && Ct.alternate === null && e(D, ut), E = s(Ct, E, rt), Dt === null ? P = Ct : Dt.sibling = Ct, Dt = Ct, ut = ee;
      }
      if (rt === x.length)
        return n(D, ut), vt && jn(D, rt), P;
      if (ut === null) {
        for (; rt < x.length; rt++)
          ut = N(D, x[rt], V), ut !== null && (E = s(
            ut,
            E,
            rt
          ), Dt === null ? P = ut : Dt.sibling = ut, Dt = ut);
        return vt && jn(D, rt), P;
      }
      for (ut = i(ut); rt < x.length; rt++)
        ee = O(
          ut,
          D,
          rt,
          x[rt],
          V
        ), ee !== null && (t && (Ct = ee.alternate, Ct !== null && ut.delete(Ct.key === null ? rt : Ct.key)), E = s(
          ee,
          E,
          rt
        ), Dt === null ? P = ee : Dt.sibling = ee, Dt = ee);
      return t && ut.forEach(function(Mi) {
        return e(D, Mi);
      }), vt && jn(D, rt), P;
    }
    function et(D, E, x, V) {
      if (x == null) throw Error(r(151));
      for (var P = null, Dt = null, ut = E, rt = E = 0, ee = null, Ct = x.next(); ut !== null && !Ct.done; rt++, Ct = x.next()) {
        ut.index > rt ? (ee = ut, ut = null) : ee = ut.sibling;
        var Mi = M(D, ut, Ct.value, V);
        if (Mi === null) {
          ut === null && (ut = ee);
          break;
        }
        t && ut && Mi.alternate === null && e(D, ut), E = s(Mi, E, rt), Dt === null ? P = Mi : Dt.sibling = Mi, Dt = Mi, ut = ee;
      }
      if (Ct.done)
        return n(D, ut), vt && jn(D, rt), P;
      if (ut === null) {
        for (; !Ct.done; rt++, Ct = x.next())
          Ct = N(D, Ct.value, V), Ct !== null && (E = s(Ct, E, rt), Dt === null ? P = Ct : Dt.sibling = Ct, Dt = Ct);
        return vt && jn(D, rt), P;
      }
      for (ut = i(ut); !Ct.done; rt++, Ct = x.next())
        Ct = O(ut, D, rt, Ct.value, V), Ct !== null && (t && (ee = Ct.alternate, ee !== null && ut.delete(
          ee.key === null ? rt : ee.key
        )), E = s(Ct, E, rt), Dt === null ? P = Ct : Dt.sibling = Ct, Dt = Ct);
      return t && ut.forEach(function(Sb) {
        return e(D, Sb);
      }), vt && jn(D, rt), P;
    }
    function yt(D, E, x, V) {
      if (typeof x == "object" && x !== null && x.type === ct && x.key === null && x.props.ref === void 0 && (x = x.props.children), typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case st:
            t: {
              for (var P = x.key; E !== null; ) {
                if (E.key === P) {
                  if (P = x.type, P === ct) {
                    if (E.tag === 7) {
                      n(
                        D,
                        E.sibling
                      ), V = u(
                        E,
                        x.props.children
                      ), li(V, x), V.return = D, D = V;
                      break t;
                    }
                  } else if (E.elementType === P || typeof P == "object" && P !== null && P.$$typeof === ht && Gi(P) === E.type) {
                    n(
                      D,
                      E.sibling
                    ), V = u(E, x.props), li(V, x), V.return = D, D = V;
                    break t;
                  }
                  n(D, E);
                  break;
                } else e(D, E);
                E = E.sibling;
              }
              x.type === ct ? (V = wi(
                x.props.children,
                D.mode,
                V,
                x.key
              ), li(V, x), V.return = D, D = V) : (V = Yu(
                x.type,
                x.key,
                x.props,
                null,
                D.mode,
                V
              ), li(V, x), V.return = D, D = V);
            }
            return f(D);
          case J:
            t: {
              for (P = x.key; E !== null; ) {
                if (E.key === P)
                  if (E.tag === 4 && E.stateNode.containerInfo === x.containerInfo && E.stateNode.implementation === x.implementation) {
                    n(
                      D,
                      E.sibling
                    ), V = u(E, x.children || []), V.return = D, D = V;
                    break t;
                  } else {
                    n(D, E);
                    break;
                  }
                else e(D, E);
                E = E.sibling;
              }
              V = tr(x, D.mode, V), V.return = D, D = V;
            }
            return f(D);
          case ht:
            return x = Gi(x), yt(
              D,
              E,
              x,
              V
            );
        }
        if (St(x))
          return K(
            D,
            E,
            x,
            V
          );
        if ($(x)) {
          if (P = $(x), typeof P != "function") throw Error(r(150));
          return x = P.call(x), et(
            D,
            E,
            x,
            V
          );
        }
        if (typeof x.then == "function")
          return yt(
            D,
            E,
            ku(x),
            V
          );
        if (x.$$typeof === Tt)
          return yt(
            D,
            E,
            Ku(D, x),
            V
          );
        Wu(D, x);
      }
      return typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint" ? (x = "" + x, E !== null && E.tag === 6 ? (n(D, E.sibling), V = u(E, x), V.return = D, D = V) : (n(D, E), V = $o(x, D.mode, V), V.return = D, D = V), f(D)) : n(D, E);
    }
    return function(D, E, x, V) {
      try {
        Ol = 0;
        var P = yt(
          D,
          E,
          x,
          V
        );
        return Ca = null, P;
      } catch (ut) {
        if (ut === Da || ut === Fu) throw ut;
        var Dt = _e(29, ut, null, D.mode);
        return Dt.lanes = V, Dt.return = D, Dt;
      }
    };
  }
  var Qi = Kd(!0), Jd = Kd(!1), ui = !1;
  function cr(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function fr(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function si(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function oi(t, e, n) {
    var i = t.updateQueue;
    if (i === null) return null;
    if (i = i.shared, (zt & 2) !== 0) {
      var u = i.pending;
      return u === null ? e.next = e : (e.next = u.next, u.next = e), i.pending = e, e = ju(t), zd(t, null, n), e;
    }
    return Hu(t, i, e, n), ju(t);
  }
  function Rl(t, e, n) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (n & 4194048) !== 0)) {
      var i = e.lanes;
      i &= t.pendingLanes, n |= i, e.lanes = n, Uh(t, n);
    }
  }
  function hr(t, e) {
    var n = t.updateQueue, i = t.alternate;
    if (i !== null && (i = i.updateQueue, n === i)) {
      var u = null, s = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var f = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          s === null ? u = s = f : s = s.next = f, n = n.next;
        } while (n !== null);
        s === null ? u = s = e : s = s.next = e;
      } else u = s = e;
      n = {
        baseState: i.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: s,
        shared: i.shared,
        callbacks: i.callbacks
      }, t.updateQueue = n;
      return;
    }
    t = n.lastBaseUpdate, t === null ? n.firstBaseUpdate = e : t.next = e, n.lastBaseUpdate = e;
  }
  var dr = !1;
  function zl() {
    if (dr) {
      var t = Ma;
      if (t !== null) throw t;
    }
  }
  function _l(t, e, n, i) {
    dr = !1;
    var u = t.updateQueue;
    ui = !1;
    var s = u.firstBaseUpdate, f = u.lastBaseUpdate, m = u.shared.pending;
    if (m !== null) {
      u.shared.pending = null;
      var T = m, C = T.next;
      T.next = null, f === null ? s = C : f.next = C, f = T;
      var R = t.alternate;
      R !== null && (R = R.updateQueue, m = R.lastBaseUpdate, m !== f && (m === null ? R.firstBaseUpdate = C : m.next = C, R.lastBaseUpdate = T));
    }
    if (s !== null) {
      var N = u.baseState;
      f = 0, R = C = T = null, m = s;
      do {
        var M = m.lane & -536870913, O = M !== m.lane;
        if (O ? (Mt & M) === M : (i & M) === M) {
          M !== 0 && M === Yi && (dr = !0), R !== null && (R = R.next = {
            lane: 0,
            tag: m.tag,
            payload: m.payload,
            callback: null,
            next: null
          });
          t: {
            var K = t, et = m;
            M = e;
            var yt = n;
            switch (et.tag) {
              case 1:
                if (K = et.payload, typeof K == "function") {
                  N = K.call(yt, N, M);
                  break t;
                }
                N = K;
                break t;
              case 3:
                K.flags = K.flags & -65537 | 128;
              case 0:
                if (K = et.payload, M = typeof K == "function" ? K.call(yt, N, M) : K, M == null) break t;
                N = Z({}, N, M);
                break t;
              case 2:
                ui = !0;
            }
          }
          M = m.callback, M !== null && (t.flags |= 64, O && (t.flags |= 8192), O = u.callbacks, O === null ? u.callbacks = [M] : O.push(M));
        } else
          O = {
            lane: M,
            tag: m.tag,
            payload: m.payload,
            callback: m.callback,
            next: null
          }, R === null ? (C = R = O, T = N) : R = R.next = O, f |= M;
        if (m = m.next, m === null) {
          if (m = u.shared.pending, m === null)
            break;
          O = m, m = O.next, O.next = null, u.lastBaseUpdate = O, u.shared.pending = null;
        }
      } while (!0);
      R === null && (T = N), u.baseState = T, u.firstBaseUpdate = C, u.lastBaseUpdate = R, s === null && (u.shared.lanes = 0), yi |= f, t.lanes = f, t.memoizedState = N;
    }
  }
  function Fd(t, e) {
    if (typeof t != "function")
      throw Error(r(191, t));
    t.call(e);
  }
  function Pd(t, e) {
    var n = t.callbacks;
    if (n !== null)
      for (t.callbacks = null, t = 0; t < n.length; t++)
        Fd(n[t], e);
  }
  var ri = Ee(null), Iu = Ee(0);
  function kd(t, e) {
    t = Kn, X(Iu, t), X(ri, e), Kn = t | e.baseLanes;
  }
  function mr() {
    X(Iu, Kn), X(ri, ri.current);
  }
  function yr() {
    Kn = Iu.current, Bt(ri), Bt(Iu);
  }
  var de = Ee(null), Te = null;
  function ci(t) {
    var e = t.alternate;
    X(me, me.current & 1), X(de, t), Te === null && (e === null || ri.current !== null || e.memoizedState !== null) && (Te = t);
  }
  function gr(t) {
    X(me, me.current), X(de, t), Te === null && (Te = t);
  }
  function Wd(t) {
    t.tag === 22 ? (X(me, me.current), X(de, t), Te === null && (Te = t)) : fi();
  }
  function fi() {
    X(me, me.current), X(de, de.current);
  }
  function Ge(t) {
    Bt(de), Te === t && (Te = null), Bt(me);
  }
  var me = Ee(0);
  function Vl(t, e) {
    X(de, de.current), X(me, e);
  }
  function pr(t) {
    Bt(me), Bt(de), Te === t && (Te = null);
  }
  function $u(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var n = e.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || jc(n) || Yc(n)))
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
  var Gn = 0, mt = null, Lt = null, $t = null, ts = !1, xa = !1, Zi = !1, es = 0, Nl = 0, Oa = null, YS = 0;
  function Ft() {
    throw Error(r(321));
  }
  function vr(t, e) {
    if (e === null) return !1;
    for (var n = 0; n < e.length && n < t.length; n++)
      if (!qe(t[n], e[n])) return !1;
    return !0;
  }
  function Sr(t, e, n, i, u, s) {
    return Gn = s, mt = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, tt.H = t === null || t.memoizedState === null ? Um : wm, Zi = !1, s = n(i, u), Zi = !1, xa && (s = $d(
      e,
      n,
      i,
      u
    )), Id(t), s;
  }
  function Id(t) {
    tt.H = os;
    var e = Lt !== null && Lt.next !== null;
    if (Gn = 0, $t = Lt = mt = null, ts = !1, Nl = 0, Oa = null, e) throw Error(r(300));
    t === null || te || (t = t.dependencies, t !== null && Zu(t) && (te = !0));
  }
  function $d(t, e, n, i) {
    mt = t;
    var u = 0;
    do {
      if (xa && (Oa = null), Nl = 0, xa = !1, 25 <= u) throw Error(r(301));
      if (u += 1, $t = Lt = null, t.updateQueue != null) {
        var s = t.updateQueue;
        s.lastEffect = null, s.events = null, s.stores = null, s.memoCache != null && (s.memoCache.index = 0);
      }
      tt.H = FS, s = e(n, i);
    } while (xa);
    return s;
  }
  function qS() {
    var t = tt.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? Ul(e) : e, t = t.useState()[0], (Lt !== null ? Lt.memoizedState : null) !== t && (mt.flags |= 1024), e;
  }
  function Tr() {
    var t = es !== 0;
    return es = 0, t;
  }
  function br(t, e, n) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~n;
  }
  function Er(t) {
    if (ts) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      ts = !1;
    }
    Gn = 0, $t = Lt = mt = null, xa = !1, Nl = es = 0, Oa = null;
  }
  function Me() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return $t === null ? mt.memoizedState = $t = t : $t = $t.next = t, $t;
  }
  function Wt() {
    if (Lt === null) {
      var t = mt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Lt.next;
    var e = $t === null ? mt.memoizedState : $t.next;
    if (e !== null)
      $t = e, Lt = t;
    else {
      if (t === null)
        throw mt.alternate === null ? Error(r(467)) : Error(r(310));
      Lt = t, t = {
        memoizedState: Lt.memoizedState,
        baseState: Lt.baseState,
        baseQueue: Lt.baseQueue,
        queue: Lt.queue,
        next: null
      }, $t === null ? mt.memoizedState = $t = t : $t = $t.next = t;
    }
    return $t;
  }
  function ns() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ul(t) {
    var e = Nl;
    return Nl += 1, Oa === null && (Oa = []), t = Xd(Oa, t, e), e = mt, ($t === null ? e.memoizedState : $t.next) === null && (e = e.alternate, tt.H = e === null || e.memoizedState === null ? Um : wm), t;
  }
  function is(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Ul(t);
      if (t.$$typeof === H) return;
      if (t.$$typeof === Tt) return he(t);
    }
    throw Error(r(438, String(t)));
  }
  function Ar(t) {
    var e = null, n = mt.updateQueue;
    if (n !== null && (e = n.memoCache), e == null) {
      var i = mt.alternate;
      i !== null && (i = i.updateQueue, i !== null && (i = i.memoCache, i != null && (e = {
        data: i.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), n === null && (n = ns(), mt.updateQueue = n), n.memoCache = e, n = e.data[e.index], n === void 0)
      for (n = e.data[e.index] = Array(t), i = 0; i < t; i++)
        n[i] = ce;
    return e.index++, n;
  }
  function Xn(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function as(t) {
    var e = Wt();
    return Mr(e, Lt, t);
  }
  function Mr(t, e, n) {
    var i = t.queue;
    if (i === null) throw Error(r(311));
    i.lastRenderedReducer = n;
    var u = t.baseQueue, s = i.pending;
    if (s !== null) {
      if (u !== null) {
        var f = u.next;
        u.next = s.next, s.next = f;
      }
      e.baseQueue = u = s, i.pending = null;
    }
    if (s = t.baseState, u === null) t.memoizedState = s;
    else {
      e = u.next;
      var m = f = null, T = null, C = e, R = !1;
      do {
        var N = C.lane & -536870913;
        if (N !== C.lane ? (Mt & N) === N : (Gn & N) === N) {
          var M = C.revertLane;
          if (M === 0)
            T !== null && (T = T.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: C.action,
              hasEagerState: C.hasEagerState,
              eagerState: C.eagerState,
              next: null
            }), N === Yi && (R = !0);
          else if ((Gn & M) === M) {
            C = C.next, M === Yi && (R = !0);
            continue;
          } else
            N = {
              lane: 0,
              revertLane: C.revertLane,
              gesture: null,
              action: C.action,
              hasEagerState: C.hasEagerState,
              eagerState: C.eagerState,
              next: null
            }, T === null ? (m = T = N, f = s) : T = T.next = N, mt.lanes |= M, yi |= M;
          N = C.action, Zi && n(s, N), s = C.hasEagerState ? C.eagerState : n(s, N);
        } else
          M = {
            lane: N,
            revertLane: C.revertLane,
            gesture: C.gesture,
            action: C.action,
            hasEagerState: C.hasEagerState,
            eagerState: C.eagerState,
            next: null
          }, T === null ? (m = T = M, f = s) : T = T.next = M, mt.lanes |= N, yi |= N;
        C = C.next;
      } while (C !== null && C !== e);
      if (T === null ? f = s : T.next = m, !qe(s, t.memoizedState) && (te = !0, R && (n = Ma, n !== null)))
        throw n;
      t.memoizedState = s, t.baseState = f, t.baseQueue = T, i.lastRenderedState = s;
    }
    return u === null && (i.lanes = 0), [t.memoizedState, i.dispatch];
  }
  function Dr(t) {
    var e = Wt(), n = e.queue;
    if (n === null) throw Error(r(311));
    n.lastRenderedReducer = t;
    var i = n.dispatch, u = n.pending, s = e.memoizedState;
    if (u !== null) {
      n.pending = null;
      var f = u = u.next;
      do
        s = t(s, f.action), f = f.next;
      while (f !== u);
      qe(s, e.memoizedState) || (te = !0), e.memoizedState = s, e.baseQueue === null && (e.baseState = s), n.lastRenderedState = s;
    }
    return [s, i];
  }
  function tm(t, e, n) {
    var i = mt, u = Wt(), s = vt;
    if (s) {
      if (n === void 0) throw Error(r(407));
      n = n();
    } else n = e();
    var f = !qe(
      (Lt || u).memoizedState,
      n
    );
    if (f && (u.memoizedState = n, te = !0), u = u.queue, Or(im.bind(null, i, u, t), [
      t
    ]), t = u.getSnapshot !== e || f || $t !== null && ($t.memoizedState.tag & 1) !== 0, Ra(
      t ? 9 : 8,
      { destroy: void 0 },
      nm.bind(null, i, u, n, e),
      null
    ), t) {
      if (i.flags |= 2048, qt === null) throw Error(r(349));
      s || (Gn & 127) !== 0 || em(i, e, n);
    }
    return n;
  }
  function em(t, e, n) {
    t.flags |= 16384, t = { getSnapshot: e, value: n }, e = mt.updateQueue, e === null ? (e = ns(), mt.updateQueue = e, e.stores = [t]) : (n = e.stores, n === null ? e.stores = [t] : n.push(t));
  }
  function nm(t, e, n, i) {
    e.value = n, e.getSnapshot = i, am(e) && lm(t);
  }
  function im(t, e, n) {
    return n(function() {
      am(e) && lm(t);
    });
  }
  function am(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var n = e();
      return !qe(t, n);
    } catch {
      return !0;
    }
  }
  function lm(t) {
    var e = Ui(t, 2);
    e !== null && we(e, t, 2);
  }
  function Cr(t) {
    var e = Me();
    if (typeof t == "function") {
      var n = t;
      if (t = n(), Zi) {
        In(!0);
        try {
          n();
        } finally {
          In(!1);
        }
      }
    }
    return e.memoizedState = e.baseState = t, e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Xn,
      lastRenderedState: t
    }, e;
  }
  function um(t, e, n, i) {
    return t.baseState = n, Mr(
      t,
      Lt,
      typeof i == "function" ? i : Xn
    );
  }
  function GS(t, e, n, i, u) {
    if (ss(t)) throw Error(r(485));
    if (t = e.action, t !== null) {
      var s = {
        payload: u,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(f) {
          s.listeners.push(f);
        }
      };
      tt.T !== null ? n(!0) : s.isTransition = !1, i(s), n = e.pending, n === null ? (s.next = e.pending = s, sm(e, s)) : (s.next = n.next, e.pending = n.next = s);
    }
  }
  function sm(t, e) {
    var n = e.action, i = e.payload, u = t.state;
    if (e.isTransition) {
      var s = tt.T, f = {};
      f.types = s !== null ? s.types : null, tt.T = f;
      try {
        var m = n(u, i), T = tt.S;
        T !== null && T(f, m), om(t, e, m);
      } catch (C) {
        xr(t, e, C);
      } finally {
        s !== null && f.types !== null && (s.types = f.types), tt.T = s;
      }
    } else
      try {
        s = n(u, i), om(t, e, s);
      } catch (C) {
        xr(t, e, C);
      }
  }
  function om(t, e, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(i) {
        rm(t, e, i);
      },
      function(i) {
        return xr(t, e, i);
      }
    ) : rm(t, e, n);
  }
  function rm(t, e, n) {
    e.status = "fulfilled", e.value = n, cm(e), t.state = n, e = t.pending, e !== null && (n = e.next, n === e ? t.pending = null : (n = n.next, e.next = n, sm(t, n)));
  }
  function xr(t, e, n) {
    var i = t.pending;
    if (t.pending = null, i !== null) {
      i = i.next;
      do
        e.status = "rejected", e.reason = n, cm(e), e = e.next;
      while (e !== i);
    }
    t.action = null;
  }
  function cm(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function fm(t, e) {
    return e;
  }
  function hm(t, e) {
    if (vt) {
      var n = qt.formState;
      if (n !== null) {
        t: {
          var i = mt;
          if (vt) {
            if (Gt) {
              e: {
                for (var u = Gt, s = $e; u.nodeType !== 8; ) {
                  if (!s) {
                    u = null;
                    break e;
                  }
                  if (u = en(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break e;
                  }
                }
                s = u.data, u = s === "F!" || s === "F" ? u : null;
              }
              if (u) {
                Gt = en(
                  u.nextSibling
                ), i = u.data === "F!";
                break t;
              }
            }
            ii(i);
          }
          i = !1;
        }
        i && (e = n[0]);
      }
    }
    return n = Me(), n.memoizedState = n.baseState = e, i = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: fm,
      lastRenderedState: e
    }, n.queue = i, n = _m.bind(
      null,
      mt,
      i
    ), i.dispatch = n, i = Cr(!1), s = Nr.bind(
      null,
      mt,
      !1,
      i.queue
    ), i = Me(), u = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, i.queue = u, n = GS.bind(
      null,
      mt,
      u,
      s,
      n
    ), u.dispatch = n, i.memoizedState = t, [e, n, !1];
  }
  function dm(t) {
    var e = Wt();
    return mm(e, Lt, t);
  }
  function mm(t, e, n) {
    if (e = Mr(
      t,
      e,
      fm
    )[0], t = as(Xn)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var i = Ul(e);
      } catch (f) {
        throw f === Da ? Fu : f;
      }
    else i = e;
    e = Wt();
    var u = e.queue, s = u.dispatch;
    return n !== e.memoizedState && (mt.flags |= 2048, Ra(
      9,
      { destroy: void 0 },
      XS.bind(null, u, n),
      null
    )), [i, s, t];
  }
  function XS(t, e) {
    t.action = e;
  }
  function ym(t) {
    var e = Wt(), n = Lt;
    if (n !== null)
      return mm(e, n, t);
    Wt(), e = e.memoizedState, n = Wt();
    var i = n.queue.dispatch;
    return n.memoizedState = t, [e, i, !1];
  }
  function Ra(t, e, n, i) {
    return t = { tag: t, create: n, deps: i, inst: e, next: null }, e = mt.updateQueue, e === null && (e = ns(), mt.updateQueue = e), n = e.lastEffect, n === null ? e.lastEffect = t.next = t : (i = n.next, n.next = t, t.next = i, e.lastEffect = t), t;
  }
  function gm() {
    return Wt().memoizedState;
  }
  function ls(t, e, n, i) {
    var u = Me();
    mt.flags |= t, u.memoizedState = Ra(
      1 | e,
      { destroy: void 0 },
      n,
      i === void 0 ? null : i
    );
  }
  function us(t, e, n, i) {
    var u = Wt();
    i = i === void 0 ? null : i;
    var s = u.memoizedState.inst;
    Lt !== null && i !== null && vr(i, Lt.memoizedState.deps) ? u.memoizedState = Ra(e, s, n, i) : (mt.flags |= t, u.memoizedState = Ra(
      1 | e,
      s,
      n,
      i
    ));
  }
  function pm(t, e) {
    ls(8390656, 8, t, e);
  }
  function Or(t, e) {
    us(2048, 8, t, e);
  }
  function QS(t) {
    mt.flags |= 4;
    var e = mt.updateQueue;
    if (e === null)
      e = ns(), mt.updateQueue = e, e.events = [t];
    else {
      var n = e.events;
      n === null ? e.events = [t] : n.push(t);
    }
  }
  function vm(t) {
    var e = Wt().memoizedState;
    return QS({ ref: e, nextImpl: t }), function() {
      if ((zt & 2) !== 0) throw Error(r(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function Sm(t, e) {
    return us(4, 2, t, e);
  }
  function Tm(t, e) {
    return us(4, 4, t, e);
  }
  function bm(t, e) {
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
  function Em(t, e, n) {
    n = n != null ? n.concat([t]) : null, us(4, 4, bm.bind(null, e, t), n);
  }
  function Rr() {
  }
  function Am(t, e) {
    var n = Wt();
    e = e === void 0 ? null : e;
    var i = n.memoizedState;
    return e !== null && vr(e, i[1]) ? i[0] : (n.memoizedState = [t, e], t);
  }
  function Mm(t, e) {
    var n = Wt();
    e = e === void 0 ? null : e;
    var i = n.memoizedState;
    if (e !== null && vr(e, i[1]))
      return i[0];
    if (i = t(), Zi) {
      In(!0);
      try {
        t();
      } finally {
        In(!1);
      }
    }
    return n.memoizedState = [i, e], i;
  }
  function zr(t, e, n) {
    return n === void 0 || (Gn & 1073741824) !== 0 && (Mt & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = n, t = Uy(), mt.lanes |= t, yi |= t, n);
  }
  function Dm(t, e, n, i) {
    return qe(n, e) ? n : ri.current !== null ? (t = zr(t, n, i), qe(t, e) || (te = !0), t) : (Gn & 106) === 0 || (Gn & 1073741824) !== 0 && (Mt & 261930) === 0 ? (te = !0, t.memoizedState = n) : (t = Uy(), mt.lanes |= t, yi |= t, e);
  }
  function Cm(t, e, n, i, u) {
    var s = lt.p;
    lt.p = s !== 0 && 8 > s ? s : 8;
    var f = tt.T, m = {};
    m.types = f !== null ? f.types : null, tt.T = m, Nr(t, !1, e, n);
    try {
      var T = u(), C = tt.S;
      if (C !== null && C(m, T), T !== null && typeof T == "object" && typeof T.then == "function") {
        var R = jS(
          T,
          i
        );
        wl(
          t,
          e,
          R,
          Ke(t)
        );
      } else
        wl(
          t,
          e,
          i,
          Ke(t)
        );
    } catch (N) {
      wl(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: N },
        Ke()
      );
    } finally {
      lt.p = s, f !== null && m.types !== null && (f.types = m.types), tt.T = f;
    }
  }
  function ZS() {
  }
  function _r(t, e, n, i) {
    if (t.tag !== 5) throw Error(r(476));
    var u = xm(t).queue;
    Cm(
      t,
      u,
      e,
      be,
      n === null ? ZS : function() {
        return Om(t), n(i);
      }
    );
  }
  function xm(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: be,
      baseState: be,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Xn,
        lastRenderedState: be
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
        lastRenderedReducer: Xn,
        lastRenderedState: n
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function Om(t) {
    var e = xm(t);
    e.next === null && (e = t.alternate.memoizedState), wl(
      t,
      e.next.queue,
      {},
      Ke()
    );
  }
  function Vr() {
    return he(Fa);
  }
  function Rm() {
    return Wt().memoizedState;
  }
  function zm() {
    return Wt().memoizedState;
  }
  function KS(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var n = Ke();
          t = si(n);
          var i = oi(e, t, n);
          i !== null && (we(i, e, n), Rl(i, e, n)), e = { cache: ur() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function JS(t, e, n) {
    var i = Ke();
    n = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ss(t) ? Vm(e, n) : (n = Wo(t, e, n, i), n !== null && (we(n, t, i), Nm(n, e, i)));
  }
  function _m(t, e, n) {
    var i = Ke();
    wl(t, e, n, i);
  }
  function wl(t, e, n, i) {
    var u = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (ss(t)) Vm(e, u);
    else {
      var s = t.alternate;
      if (t.lanes === 0 && (s === null || s.lanes === 0) && (s = e.lastRenderedReducer, s !== null))
        try {
          var f = e.lastRenderedState, m = s(f, n);
          if (u.hasEagerState = !0, u.eagerState = m, qe(m, f))
            return Hu(t, e, u, 0), qt === null && Lu(), !1;
        } catch {
        }
      if (n = Wo(t, e, u, i), n !== null)
        return we(n, t, i), Nm(n, e, i), !0;
    }
    return !1;
  }
  function Nr(t, e, n, i) {
    if (i = {
      lane: 2,
      revertLane: Ac(),
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ss(t)) {
      if (e) throw Error(r(479));
    } else
      e = Wo(
        t,
        n,
        i,
        2
      ), e !== null && we(e, t, 2);
  }
  function ss(t) {
    var e = t.alternate;
    return t === mt || e !== null && e === mt;
  }
  function Vm(t, e) {
    xa = ts = !0;
    var n = t.pending;
    n === null ? e.next = e : (e.next = n.next, n.next = e), t.pending = e;
  }
  function Nm(t, e, n) {
    if ((n & 4194048) !== 0) {
      var i = e.lanes;
      i &= t.pendingLanes, n |= i, e.lanes = n, Uh(t, n);
    }
  }
  var os = {
    readContext: he,
    use: is,
    useCallback: Ft,
    useContext: Ft,
    useEffect: Ft,
    useImperativeHandle: Ft,
    useLayoutEffect: Ft,
    useInsertionEffect: Ft,
    useMemo: Ft,
    useReducer: Ft,
    useRef: Ft,
    useState: Ft,
    useDebugValue: Ft,
    useDeferredValue: Ft,
    useTransition: Ft,
    useSyncExternalStore: Ft,
    useId: Ft,
    useHostTransitionStatus: Ft,
    useFormState: Ft,
    useActionState: Ft,
    useOptimistic: Ft,
    useMemoCache: Ft,
    useCacheRefresh: Ft,
    useEffectEvent: Ft
  }, Um = {
    readContext: he,
    use: is,
    useCallback: function(t, e) {
      return Me().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: he,
    useEffect: pm,
    useImperativeHandle: function(t, e, n) {
      n = n != null ? n.concat([t]) : null, ls(
        4194308,
        4,
        bm.bind(null, e, t),
        n
      );
    },
    useLayoutEffect: function(t, e) {
      return ls(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      ls(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var n = Me();
      e = e === void 0 ? null : e;
      var i = t();
      if (Zi) {
        In(!0);
        try {
          t();
        } finally {
          In(!1);
        }
      }
      return n.memoizedState = [i, e], i;
    },
    useReducer: function(t, e, n) {
      var i = Me();
      if (n !== void 0) {
        var u = n(e);
        if (Zi) {
          In(!0);
          try {
            n(e);
          } finally {
            In(!1);
          }
        }
      } else u = e;
      return i.memoizedState = i.baseState = u, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: u
      }, i.queue = t, t = t.dispatch = JS.bind(
        null,
        mt,
        t
      ), [i.memoizedState, t];
    },
    useRef: function(t) {
      var e = Me();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = Cr(t);
      var e = t.queue, n = _m.bind(null, mt, e);
      return e.dispatch = n, [t.memoizedState, n];
    },
    useDebugValue: Rr,
    useDeferredValue: function(t, e) {
      var n = Me();
      return zr(n, t, e);
    },
    useTransition: function() {
      var t = Cr(!1);
      return t = Cm.bind(
        null,
        mt,
        t.queue,
        !0,
        !1
      ), Me().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, n) {
      var i = mt, u = Me();
      if (vt) {
        if (n === void 0)
          throw Error(r(407));
        n = n();
      } else {
        if (n = e(), qt === null)
          throw Error(r(349));
        (Mt & 127) !== 0 || em(i, e, n);
      }
      u.memoizedState = n;
      var s = { value: n, getSnapshot: e };
      return u.queue = s, pm(im.bind(null, i, s, t), [
        t
      ]), i.flags |= 2048, Ra(
        9,
        { destroy: void 0 },
        nm.bind(
          null,
          i,
          s,
          n,
          e
        ),
        null
      ), n;
    },
    useId: function() {
      var t = Me(), e = qt.identifierPrefix;
      if (vt) {
        var n = Sn, i = vn;
        n = (i & ~(1 << 32 - je(i) - 1)).toString(32) + n, e = "_" + e + "R_" + n, n = es++, 0 < n && (e += "H" + n.toString(32)), e += "_";
      } else
        n = YS++, e = "_" + e + "r_" + n.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: Vr,
    useFormState: hm,
    useActionState: hm,
    useOptimistic: function(t) {
      var e = Me();
      e.memoizedState = e.baseState = t;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = n, e = Nr.bind(
        null,
        mt,
        !0,
        n
      ), n.dispatch = e, [t, e];
    },
    useMemoCache: Ar,
    useCacheRefresh: function() {
      return Me().memoizedState = KS.bind(
        null,
        mt
      );
    },
    useEffectEvent: function(t) {
      var e = Me(), n = { impl: t };
      return e.memoizedState = n, function() {
        if ((zt & 2) !== 0)
          throw Error(r(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, wm = {
    readContext: he,
    use: is,
    useCallback: Am,
    useContext: he,
    useEffect: Or,
    useImperativeHandle: Em,
    useInsertionEffect: Sm,
    useLayoutEffect: Tm,
    useMemo: Mm,
    useReducer: as,
    useRef: gm,
    useState: function() {
      return as(Xn);
    },
    useDebugValue: Rr,
    useDeferredValue: function(t, e) {
      var n = Wt();
      return Dm(
        n,
        Lt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = as(Xn)[0], e = Wt().memoizedState;
      return [
        typeof t == "boolean" ? t : Ul(t),
        e
      ];
    },
    useSyncExternalStore: tm,
    useId: Rm,
    useHostTransitionStatus: Vr,
    useFormState: dm,
    useActionState: dm,
    useOptimistic: function(t, e) {
      var n = Wt();
      return um(n, Lt, t, e);
    },
    useMemoCache: Ar,
    useCacheRefresh: zm,
    useEffectEvent: vm
  }, FS = {
    readContext: he,
    use: is,
    useCallback: Am,
    useContext: he,
    useEffect: Or,
    useImperativeHandle: Em,
    useInsertionEffect: Sm,
    useLayoutEffect: Tm,
    useMemo: Mm,
    useReducer: Dr,
    useRef: gm,
    useState: function() {
      return Dr(Xn);
    },
    useDebugValue: Rr,
    useDeferredValue: function(t, e) {
      var n = Wt();
      return Lt === null ? zr(n, t, e) : Dm(
        n,
        Lt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Dr(Xn)[0], e = Wt().memoizedState;
      return [
        typeof t == "boolean" ? t : Ul(t),
        e
      ];
    },
    useSyncExternalStore: tm,
    useId: Rm,
    useHostTransitionStatus: Vr,
    useFormState: ym,
    useActionState: ym,
    useOptimistic: function(t, e) {
      var n = Wt();
      return Lt !== null ? um(n, Lt, t, e) : (n.baseState = t, [t, n.queue.dispatch]);
    },
    useMemoCache: Ar,
    useCacheRefresh: zm,
    useEffectEvent: vm
  };
  function Ur(t, e, n, i) {
    e = t.memoizedState, n = n(i, e), n = n == null ? e : Z({}, e, n), t.memoizedState = n, t.lanes === 0 && (t.updateQueue.baseState = n);
  }
  var wr = {
    enqueueSetState: function(t, e, n) {
      t = t._reactInternals;
      var i = Ke(), u = si(i);
      u.payload = e, n != null && (u.callback = n), e = oi(t, u, i), e !== null && (we(e, t, i), Rl(e, t, i));
    },
    enqueueReplaceState: function(t, e, n) {
      t = t._reactInternals;
      var i = Ke(), u = si(i);
      u.tag = 1, u.payload = e, n != null && (u.callback = n), e = oi(t, u, i), e !== null && (we(e, t, i), Rl(e, t, i));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var n = Ke(), i = si(n);
      i.tag = 2, e != null && (i.callback = e), e = oi(t, i, n), e !== null && (we(e, t, n), Rl(e, t, n));
    }
  };
  function Bm(t, e, n, i, u, s, f) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(i, s, f) : e.prototype && e.prototype.isPureReactComponent ? !bl(n, i) || !bl(u, s) : !0;
  }
  function Lm(t, e, n, i) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(n, i), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(n, i), e.state !== t && wr.enqueueReplaceState(e, e.state, null);
  }
  function Ki(t, e) {
    var n = e;
    if ("ref" in e) {
      n = {};
      for (var i in e)
        i !== "ref" && (n[i] = e[i]);
    }
    if (t = t.defaultProps) {
      n === e && (n = Z({}, n));
      for (var u in t)
        n[u] === void 0 && (n[u] = t[u]);
    }
    return n;
  }
  function Hm(t) {
    Bu(t);
  }
  function jm(t) {
    console.error(t);
  }
  function Ym(t) {
    Bu(t);
  }
  function rs(t, e) {
    try {
      var n = t.onUncaughtError;
      n(e.value, { componentStack: e.stack });
    } catch (i) {
      setTimeout(function() {
        throw i;
      });
    }
  }
  function qm(t, e, n) {
    try {
      var i = t.onCaughtError;
      i(n.value, {
        componentStack: n.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function Br(t, e, n) {
    return n = si(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      rs(t, e);
    }, n;
  }
  function Gm(t) {
    return t = si(t), t.tag = 3, t;
  }
  function Xm(t, e, n, i) {
    var u = n.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var s = i.value;
      t.payload = function() {
        return u(s);
      }, t.callback = function() {
        qm(e, n, i);
      };
    }
    var f = n.stateNode;
    f !== null && typeof f.componentDidCatch == "function" && (t.callback = function() {
      qm(e, n, i), typeof u != "function" && (gi === null ? gi = /* @__PURE__ */ new Set([this]) : gi.add(this));
      var m = i.stack;
      this.componentDidCatch(i.value, {
        componentStack: m !== null ? m : ""
      });
    });
  }
  function PS(t, e, n, i, u) {
    if (n.flags |= 32768, i !== null && typeof i == "object" && typeof i.then == "function") {
      if (e = n.alternate, e !== null && Hi(
        e,
        n,
        u,
        !0
      ), n = de.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
          case 19:
            return Te === null ? zs() : n.alternate === null && Pt === 0 && (Pt = 3), n.flags &= -257, n.flags |= 65536, n.lanes = u, i === Pu ? n.flags |= 16384 : (e = n.updateQueue, e === null ? n.updateQueue = /* @__PURE__ */ new Set([i]) : e.add(i), Tc(t, i, u)), !1;
          case 22:
            return n.flags |= 65536, i === Pu ? n.flags |= 16384 : (e = n.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([i])
            }, n.updateQueue = e) : (n = e.retryQueue, n === null ? e.retryQueue = /* @__PURE__ */ new Set([i]) : n.add(i)), Tc(t, i, u)), !1;
        }
        throw Error(r(435, n.tag));
      }
      return Tc(t, i, u), zs(), !1;
    }
    if (vt)
      return e = de.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = u, i !== nr && (t = Error(r(422), { cause: i }), Ml(ke(t, n)))) : (i !== nr && (e = Error(r(423), {
        cause: i
      }), Ml(
        ke(e, n)
      )), t = t.current.alternate, t.flags |= 65536, u &= -u, t.lanes |= u, i = ke(i, n), u = Br(
        t.stateNode,
        i,
        u
      ), hr(t, u), Pt !== 4 && (Pt = 2)), !1;
    var s = Error(r(520), { cause: i });
    if (s = ke(s, n), Xl === null ? Xl = [s] : Xl.push(s), Pt !== 4 && (Pt = 2), e === null) return !0;
    i = ke(i, n), n = e;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, t = u & -u, n.lanes |= t, t = Br(n.stateNode, i, t), hr(n, t), !1;
        case 1:
          if (e = n.type, s = n.stateNode, (n.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || s !== null && typeof s.componentDidCatch == "function" && (gi === null || !gi.has(s))))
            return n.flags |= 65536, u &= -u, n.lanes |= u, u = Gm(u), Xm(
              u,
              t,
              n,
              i
            ), hr(n, u), !1;
          break;
        case 22:
          if (n.memoizedState !== null)
            return n.flags |= 65536, !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var Lr = Error(r(461)), te = !1;
  function ae(t, e, n, i) {
    e.child = t === null ? Jd(e, null, n, i) : Qi(
      e,
      t.child,
      n,
      i
    );
  }
  function Qm(t, e, n, i, u) {
    n = n.render;
    var s = e.ref;
    if ("ref" in i) {
      var f = {};
      for (var m in i)
        m !== "ref" && (f[m] = i[m]);
    } else f = i;
    return ji(e), i = Sr(
      t,
      e,
      n,
      f,
      s,
      u
    ), m = Tr(), t !== null && !te ? (br(t, e, u), Qn(t, e, u)) : (vt && m && Gu(e), e.flags |= 1, ae(t, e, i, u), e.child);
  }
  function Zm(t, e, n, i, u) {
    if (t === null) {
      var s = n.type;
      return typeof s == "function" && !Io(s) && s.defaultProps === void 0 && n.compare === null ? (e.tag = 15, e.type = s, Km(
        t,
        e,
        s,
        i,
        u
      )) : (t = Yu(
        n.type,
        null,
        i,
        e,
        e.mode,
        u
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (s = t.child, !Zr(t, u)) {
      var f = s.memoizedProps;
      if (n = n.compare, n = n !== null ? n : bl, n(f, i) && t.ref === e.ref)
        return Qn(t, e, u);
    }
    return e.flags |= 1, t = Hn(s, i), t.ref = e.ref, t.return = e, e.child = t;
  }
  function Km(t, e, n, i, u) {
    if (t !== null) {
      var s = t.memoizedProps;
      if (bl(s, i) && t.ref === e.ref)
        if (te = !1, e.pendingProps = i = s, Zr(t, u))
          (t.flags & 131072) !== 0 && (te = !0);
        else
          return e.lanes = t.lanes, Qn(t, e, u);
    }
    return Hr(
      t,
      e,
      n,
      i,
      u
    );
  }
  function Jm(t, e, n, i) {
    var u = i.children, s = t !== null ? t.memoizedState : null;
    if (t === null && e.stateNode === null && (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), i.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (s = s !== null ? s.baseLanes | n : n, t !== null) {
          for (i = e.child = t.child, u = 0; i !== null; )
            u = u | i.lanes | i.childLanes, i = i.sibling;
          i = u & ~s;
        } else i = 0, e.child = null;
        return Fm(
          t,
          e,
          s,
          n,
          i
        );
      }
      if ((n & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Ju(
          e,
          s !== null ? s.cachePool : null
        ), s !== null ? kd(e, s) : mr(), Wd(e);
      else
        return i = e.lanes = 536870912, Fm(
          t,
          e,
          s !== null ? s.baseLanes | n : n,
          n,
          i
        );
    } else
      s !== null ? (Ju(e, s.cachePool), kd(e, s), fi(), e.memoizedState = null) : (t !== null && Ju(e, null), mr(), fi());
    return ae(t, e, u, n), e.child;
  }
  function Bl(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function Fm(t, e, n, i, u) {
    var s = or();
    return s = s === null ? null : { parent: It._currentValue, pool: s }, e.memoizedState = {
      baseLanes: n,
      cachePool: s
    }, t !== null && Ju(e, null), mr(), Wd(e), t !== null && Hi(t, e, i, !0), e.childLanes = u, null;
  }
  function cs(t, e) {
    return e = fs(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Pm(t, e, n) {
    return Qi(e, t.child, null, n), t = cs(e, e.pendingProps), t.flags |= 2, Ge(e), e.memoizedState = null, t;
  }
  function kS(t, e, n) {
    var i = e.pendingProps, u = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (vt) {
        if (i.mode === "hidden")
          return t = cs(e, i), e.lanes = 536870912, t.memoizedState = { baseLanes: 0, cachePool: null }, Bl(null, t);
        if (gr(e), (t = Gt) ? (t = bg(
          t,
          $e
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: ei !== null ? { id: vn, overflow: Sn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = Vd(t), n.return = e, e.child = n, se = e, Gt = null)) : t = null, t === null) throw ii(e);
        return e.lanes = 536870912, null;
      }
      return cs(e, i);
    }
    var s = t.memoizedState;
    if (s !== null) {
      var f = s.dehydrated;
      if (gr(e), u)
        if (e.flags & 256)
          e.flags &= -257, e = Pm(
            t,
            e,
            n
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(r(558));
      else if (te || Hi(t, e, n, !1), u = (n & t.childLanes) !== 0, te || u) {
        if (ri.current === null) {
          if (i = qt, i !== null && (f = wh(i, n), f !== 0 && f !== s.retryLane))
            throw s.retryLane = f, Ui(t, f), we(i, t, f), Lr;
          zs();
        }
        e = Pm(
          t,
          e,
          n
        );
      } else
        t = s.treeContext, Gt = en(f.nextSibling), se = e, vt = !0, ni = null, $e = !1, t !== null && wd(e, t), e = cs(e, i), e.flags |= 134221824;
      return e;
    }
    return t = Hn(t.child, {
      mode: i.mode,
      children: i.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function za(t, e) {
    var n = e.ref;
    if (n === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(r(284));
      (t === null || t.ref !== n) && (e.flags |= 4194816);
    }
  }
  function Hr(t, e, n, i, u) {
    return ji(e), n = Sr(
      t,
      e,
      n,
      i,
      void 0,
      u
    ), i = Tr(), t !== null && !te ? (br(t, e, u), Qn(t, e, u)) : (vt && i && Gu(e), e.flags |= 1, ae(t, e, n, u), e.child);
  }
  function km(t, e, n, i, u, s) {
    return ji(e), e.updateQueue = null, n = $d(
      e,
      i,
      n,
      u
    ), Id(t), i = Tr(), t !== null && !te ? (br(t, e, s), Qn(t, e, s)) : (vt && i && Gu(e), e.flags |= 1, ae(t, e, n, s), e.child);
  }
  function Wm(t, e, n, i, u) {
    if (ji(e), e.stateNode === null) {
      var s = Ta, f = n.contextType;
      typeof f == "object" && f !== null && (s = he(f)), s = new n(i, s), e.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null, s.updater = wr, e.stateNode = s, s._reactInternals = e, s = e.stateNode, s.props = i, s.state = e.memoizedState, s.refs = {}, cr(e), f = n.contextType, s.context = typeof f == "object" && f !== null ? he(f) : Ta, s.state = e.memoizedState, f = n.getDerivedStateFromProps, typeof f == "function" && (Ur(
        e,
        n,
        f,
        i
      ), s.state = e.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof s.getSnapshotBeforeUpdate == "function" || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (f = s.state, typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount(), f !== s.state && wr.enqueueReplaceState(s, s.state, null), _l(e, i, s, u), zl(), s.state = e.memoizedState), typeof s.componentDidMount == "function" && (e.flags |= 4194308), i = !0;
    } else if (t === null) {
      s = e.stateNode;
      var m = e.memoizedProps, T = Ki(n, m);
      s.props = T;
      var C = s.context, R = n.contextType;
      f = Ta, typeof R == "object" && R !== null && (f = he(R));
      var N = n.getDerivedStateFromProps;
      R = typeof N == "function" || typeof s.getSnapshotBeforeUpdate == "function", m = e.pendingProps !== m, R || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (m || C !== f) && Lm(
        e,
        s,
        i,
        f
      ), ui = !1;
      var M = e.memoizedState;
      s.state = M, _l(e, i, s, u), zl(), C = e.memoizedState, m || M !== C || ui ? (typeof N == "function" && (Ur(
        e,
        n,
        N,
        i
      ), C = e.memoizedState), (T = ui || Bm(
        e,
        n,
        T,
        i,
        M,
        C,
        f
      )) ? (R || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = i, e.memoizedState = C), s.props = i, s.state = C, s.context = f, i = T) : (typeof s.componentDidMount == "function" && (e.flags |= 4194308), i = !1);
    } else {
      s = e.stateNode, fr(t, e), f = e.memoizedProps, R = Ki(n, f), s.props = R, N = e.pendingProps, M = s.context, C = n.contextType, T = Ta, typeof C == "object" && C !== null && (T = he(C)), m = n.getDerivedStateFromProps, (C = typeof m == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (f !== N || M !== T) && Lm(
        e,
        s,
        i,
        T
      ), ui = !1, M = e.memoizedState, s.state = M, _l(e, i, s, u), zl();
      var O = e.memoizedState;
      f !== N || M !== O || ui || t !== null && t.dependencies !== null && Zu(t.dependencies) ? (typeof m == "function" && (Ur(
        e,
        n,
        m,
        i
      ), O = e.memoizedState), (R = ui || Bm(
        e,
        n,
        R,
        i,
        M,
        O,
        T
      ) || t !== null && t.dependencies !== null && Zu(t.dependencies)) ? (C || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(i, O, T), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(
        i,
        O,
        T
      )), typeof s.componentDidUpdate == "function" && (e.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || f === t.memoizedProps && M === t.memoizedState || (e.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || f === t.memoizedProps && M === t.memoizedState || (e.flags |= 1024), e.memoizedProps = i, e.memoizedState = O), s.props = i, s.state = O, s.context = T, i = R) : (typeof s.componentDidUpdate != "function" || f === t.memoizedProps && M === t.memoizedState || (e.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || f === t.memoizedProps && M === t.memoizedState || (e.flags |= 1024), i = !1);
    }
    return s = i, za(t, e), i = (e.flags & 128) !== 0, s || i ? (s = e.stateNode, n = i && typeof n.getDerivedStateFromError != "function" ? null : s.render(), e.flags |= 1, t !== null && i ? (e.child = Qi(
      e,
      t.child,
      null,
      u
    ), e.child = Qi(
      e,
      null,
      n,
      u
    )) : ae(t, e, n, u), e.memoizedState = s.state, t = e.child) : t = Qn(
      t,
      e,
      u
    ), t;
  }
  function Im(t, e, n, i) {
    return Bi(), e.flags |= 256, ae(t, e, n, i), e.child;
  }
  var jr = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Yr(t) {
    return { baseLanes: t, cachePool: qd() };
  }
  function qr(t, e, n) {
    return t = t !== null ? t.childLanes & ~n : 0, e && (t |= Ze), t;
  }
  function $m(t, e, n) {
    var i = e.pendingProps, u = !1, s = (e.flags & 128) !== 0, f;
    if ((f = s) || (f = t !== null && t.memoizedState === null ? !1 : (me.current & 2) !== 0), f && (u = !0, e.flags &= -129), f = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (vt) {
        if (u ? ci(e) : fi(), (t = Gt) ? (t = bg(
          t,
          $e
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: ei !== null ? { id: vn, overflow: Sn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = Vd(t), n.return = e, e.child = n, se = e, Gt = null)) : t = null, t === null) throw ii(e);
        return Yc(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      return s = i.children, i = i.fallback, u ? (fi(), u = e.mode, s = fs(
        { mode: "hidden", children: s },
        u
      ), i = wi(
        i,
        u,
        n,
        null
      ), s.return = e, i.return = e, s.sibling = i, e.child = s, i = e.child, i.memoizedState = Yr(n), i.childLanes = qr(
        t,
        f,
        n
      ), e.memoizedState = jr, Bl(null, i)) : (ci(e), Gr(e, s));
    }
    var m = t.memoizedState;
    if (m !== null) {
      var T = m.dehydrated;
      if (T !== null)
        return WS(
          t,
          e,
          s,
          f,
          i,
          T,
          m,
          n
        );
    }
    return u ? (fi(), u = i.fallback, s = e.mode, m = t.child, T = m.sibling, i = Hn(m, {
      mode: "hidden",
      children: i.children
    }), i.subtreeFlags = m.subtreeFlags & 1206910976, T !== null ? u = Hn(T, u) : (u = wi(
      u,
      s,
      n,
      null
    ), u.flags |= 2), u.return = e, i.return = e, i.sibling = u, e.child = i, Bl(null, i), i = e.child, u = t.child.memoizedState, u === null ? u = Yr(n) : (s = u.cachePool, s !== null ? (m = It._currentValue, s = s.parent !== m ? { parent: m, pool: m } : s) : s = qd(), u = {
      baseLanes: u.baseLanes | n,
      cachePool: s
    }), i.memoizedState = u, i.childLanes = qr(
      t,
      f,
      n
    ), e.memoizedState = jr, Bl(t.child, i)) : (ci(e), n = t.child, t = n.sibling, n = Hn(n, {
      mode: "visible",
      children: i.children
    }), n.return = e, n.sibling = null, t !== null && (f = e.deletions, f === null ? (e.deletions = [t], e.flags |= 16) : f.push(t)), e.child = n, e.memoizedState = null, n);
  }
  function Gr(t, e) {
    return e = fs(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function fs(t, e) {
    return t = _e(22, t, null, e), t.lanes = 0, t;
  }
  function hs(t, e, n) {
    return Qi(e, t.child, null, n), t = Gr(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function WS(t, e, n, i, u, s, f, m) {
    if (n)
      return e.flags & 256 ? (ci(e), e.flags &= -257, hs(
        t,
        e,
        m
      )) : e.memoizedState !== null ? (fi(), e.child = t.child, e.flags |= 128, null) : (fi(), s = u.fallback, f = e.mode, u = fs(
        { mode: "visible", children: u.children },
        f
      ), s = wi(
        s,
        f,
        m,
        null
      ), s.flags |= 2, u.return = e, s.return = e, u.sibling = s, e.child = u, Qi(e, t.child, null, m), u = e.child, u.memoizedState = Yr(m), u.childLanes = qr(
        t,
        i,
        m
      ), e.memoizedState = jr, Bl(null, u));
    if (ci(e), Yc(s)) {
      if (i = s.nextSibling && s.nextSibling.dataset, i) var T = i.dgst;
      return i = T, i !== "" && (u = Error(r(419)), u.stack = "", u.digest = i, Ml({ value: u, source: null, stack: null })), hs(
        t,
        e,
        m
      );
    }
    if (te || Hi(t, e, m, !1), i = (m & t.childLanes) !== 0, te || i) {
      if (ri.current !== null)
        return hs(
          t,
          e,
          m
        );
      if (i = qt, i !== null && (u = wh(
        i,
        m
      ), u !== 0 && u !== f.retryLane))
        throw f.retryLane = u, Ui(t, u), we(i, t, u), Lr;
      return jc(s) || zs(), hs(
        t,
        e,
        m
      );
    }
    return jc(s) ? (e.flags |= 192, e.child = t.child, null) : (t = f.treeContext, Gt = en(s.nextSibling), se = e, vt = !0, ni = null, $e = !1, t !== null && wd(e, t), e = Gr(
      e,
      u.children
    ), e.flags |= 134221824, e);
  }
  function ty(t, e, n) {
    t.lanes |= e;
    var i = t.alternate;
    i !== null && (i.lanes |= e), Qu(t.return, e, n);
  }
  function ey(t) {
    for (var e = null; t !== null; ) {
      var n = t.alternate;
      n !== null && $u(n) === null && (e = t), t = t.sibling;
    }
    return e;
  }
  function ds(t, e, n, i, u, s) {
    var f = t.memoizedState;
    f === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: i,
      tail: n,
      tailMode: u,
      treeForkCount: s
    } : (f.isBackwards = e, f.rendering = null, f.renderingStartTime = 0, f.last = i, f.tail = n, f.tailMode = u, f.treeForkCount = s);
  }
  function Xr(t) {
    var e = t.child;
    for (t.child = null; e !== null; ) {
      var n = e.sibling;
      e.sibling = t.child, t.child = e, e = n;
    }
  }
  function Qr(t, e, n) {
    var i = e.pendingProps, u = i.revealOrder, s = i.tail;
    i = i.children;
    var f = me.current;
    if (e.flags & 128)
      return Vl(e, f), null;
    var m = (f & 2) !== 0;
    if (m ? (f = f & 1 | 2, e.flags |= 128) : f &= 1, Vl(e, f), u === "backwards" && t !== null ? (Xr(t), ae(t, e, i, n), Xr(t)) : ae(t, e, i, n), i = vt ? Al : 0, !m && t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && ty(t, n, e);
        else if (t.tag === 19)
          ty(t, n, e);
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
    switch (u) {
      case "backwards":
        n = ey(e.child), n === null ? (u = e.child, e.child = null) : (u = n.sibling, n.sibling = null, Xr(e)), ds(
          e,
          !0,
          u,
          null,
          s,
          i
        );
        break;
      case "unstable_legacy-backwards":
        for (n = null, u = e.child, e.child = null; u !== null; ) {
          if (t = u.alternate, t !== null && $u(t) === null) {
            e.child = u;
            break;
          }
          t = u.sibling, u.sibling = n, n = u, u = t;
        }
        ds(
          e,
          !0,
          n,
          null,
          s,
          i
        );
        break;
      case "together":
        ds(
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
        n = ey(e.child), n === null ? (u = e.child, e.child = null) : (u = n.sibling, n.sibling = null), ds(
          e,
          !1,
          u,
          n,
          s,
          i
        );
    }
    return e.child;
  }
  function ny(t, e, n) {
    var i = e.pendingProps;
    return ai(e, e.type, i.value), ae(t, e, i.children, n), e.child;
  }
  function Qn(t, e, n) {
    if (t !== null && (e.dependencies = t.dependencies), yi |= e.lanes, (n & e.childLanes) === 0)
      if (t !== null) {
        if (Hi(
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
      for (t = e.child, n = Hn(t, t.pendingProps), e.child = n, n.return = e; t.sibling !== null; )
        t = t.sibling, n = n.sibling = Hn(t, t.pendingProps), n.return = e;
      n.sibling = null;
    }
    return e.child;
  }
  function Zr(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Zu(t)));
  }
  function IS(t, e, n) {
    switch (e.tag) {
      case 3:
        Zt(e, e.stateNode.containerInfo), ai(e, It, t.memoizedState.cache), Bi();
        break;
      case 27:
      case 5:
        aa(e);
        break;
      case 4:
        Zt(e, e.stateNode.containerInfo);
        break;
      case 10:
        ai(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 31:
        if (e.memoizedState !== null)
          return e.flags |= 128, gr(e), null;
        break;
      case 13:
        var i = e.memoizedState;
        if (i !== null) {
          if (i.dehydrated !== null)
            return ci(e), e.flags |= 128, null;
          i = Hi(
            t,
            e,
            n,
            !1
          );
          var u = e.child.childLanes;
          return i || (n & u) !== 0 ? $m(t, e, n) : (ci(e), t = Qn(
            t,
            e,
            n
          ), t !== null ? t.sibling : null);
        }
        ci(e);
        break;
      case 19:
        if (e.flags & 128)
          return Qr(
            t,
            e,
            n
          );
        if (u = (t.flags & 128) !== 0, i = (n & e.childLanes) !== 0, i || (Hi(
          t,
          e,
          n,
          !1
        ), i = (n & e.childLanes) !== 0), u) {
          if (i)
            return Qr(
              t,
              e,
              n
            );
          e.flags |= 128;
        }
        if (u = e.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), Vl(e, me.current), i) break;
        return null;
      case 22:
        return e.lanes = 0, Jm(
          t,
          e,
          n,
          e.pendingProps
        );
      case 24:
        ai(e, It, t.memoizedState.cache);
    }
    return Qn(t, e, n);
  }
  function iy(t, e, n) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        te = !0;
      else {
        if (!Zr(t, n) && (e.flags & 128) === 0)
          return te = !1, IS(
            t,
            e,
            n
          );
        te = (t.flags & 131072) !== 0;
      }
    else
      te = !1, vt && (e.flags & 1048576) !== 0 && Ud(e, Al, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var i = e.pendingProps;
          if (t = Gi(e.elementType), e.type = t, typeof t == "function")
            Io(t) ? (i = Ki(t, i), e.tag = 1, e = Wm(
              null,
              e,
              t,
              i,
              n
            )) : (e.tag = 0, e = Hr(
              null,
              e,
              t,
              i,
              n
            ));
          else {
            if (t != null) {
              var u = t.$$typeof;
              if (u === G) {
                e.tag = 11, e = Qm(
                  null,
                  e,
                  t,
                  i,
                  n
                );
                break t;
              } else if (u === at) {
                e.tag = 14, e = Zm(
                  null,
                  e,
                  t,
                  i,
                  n
                );
                break t;
              } else if (u === Tt) {
                e.tag = 10, e.type = t, e = ny(
                  null,
                  e,
                  n
                );
                break t;
              }
            }
            throw e = bt(t) || t, Error(r(306, e, ""));
          }
        }
        return e;
      case 0:
        return Hr(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 1:
        return i = e.type, u = Ki(
          i,
          e.pendingProps
        ), Wm(
          t,
          e,
          i,
          u,
          n
        );
      case 3:
        t: {
          if (Zt(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(r(387));
          i = e.pendingProps;
          var s = e.memoizedState;
          u = s.element, fr(t, e), _l(e, i, null, n);
          var f = e.memoizedState;
          if (i = f.cache, ai(e, It, i), i !== s.cache && lr(
            e,
            [It],
            n,
            !0
          ), zl(), i = f.element, s.isDehydrated)
            if (s = {
              element: i,
              isDehydrated: !1,
              cache: f.cache
            }, e.updateQueue.baseState = s, e.memoizedState = s, e.flags & 256) {
              e = Im(
                t,
                e,
                i,
                n
              );
              break t;
            } else if (i !== u) {
              u = ke(
                Error(r(424)),
                e
              ), Ml(u), e = Im(
                t,
                e,
                i,
                n
              );
              break t;
            } else
              for (t = e.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, Gt = en(t.firstChild), se = e, vt = !0, ni = null, $e = !0, n = Jd(
                e,
                null,
                i,
                n
              ), e.child = n; n; )
                n.flags = n.flags & -3 | 134221824, n = n.sibling;
          else {
            if (Bi(), i === u) {
              e = Qn(
                t,
                e,
                n
              );
              break t;
            }
            ae(t, e, i, n);
          }
          e = e.child;
        }
        return e;
      case 26:
        return za(t, e), t === null ? (n = Og(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = n : vt || (e.stateNode = sg(
          e.type,
          e.pendingProps,
          xt.current,
          e
        )) : e.memoizedState = Og(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return aa(e), t === null && vt && (i = e.stateNode = Mg(
          e.type,
          e.pendingProps,
          xt.current
        ), se = e, $e = !0, u = Gt, Si(e.type) ? (qc = u, Gt = en(i.firstChild)) : Gt = u), ae(
          t,
          e,
          e.pendingProps.children,
          n
        ), za(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && vt && ((u = i = Gt) && (i = KT(
          i,
          e.type,
          e.pendingProps,
          $e
        ), i !== null ? (e.stateNode = i, se = e, Gt = en(i.firstChild), $e = !1, u = !0) : u = !1), u || ii(e)), aa(e), u = e.type, s = e.pendingProps, f = t !== null ? t.memoizedProps : null, i = s.children, Vc(u, s) ? i = null : f !== null && Vc(u, f) && (e.flags |= 32), e.memoizedState !== null && (u = Sr(
          t,
          e,
          qS,
          null,
          null,
          n
        ), Fa._currentValue = u), za(t, e), ae(t, e, i, n), e.child;
      case 6:
        return t === null && vt && ((t = n = Gt) && (n = JT(
          n,
          e.pendingProps,
          $e
        ), n !== null ? (e.stateNode = n, se = e, Gt = null, t = !0) : t = !1), t || ii(e)), null;
      case 13:
        return $m(t, e, n);
      case 4:
        return Zt(
          e,
          e.stateNode.containerInfo
        ), i = e.pendingProps, t === null ? e.child = Qi(
          e,
          null,
          i,
          n
        ) : ae(t, e, i, n), e.child;
      case 11:
        return Qm(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 7:
        return i = e.pendingProps, za(t, e), ae(t, e, i, n), e.child;
      case 8:
        return ae(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 12:
        return ae(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 10:
        return ny(t, e, n);
      case 9:
        return u = e.type._context, i = e.pendingProps.children, ji(e), u = he(u), i = i(u), e.flags |= 1, ae(t, e, i, n), e.child;
      case 14:
        return Zm(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 15:
        return Km(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 19:
        return Qr(t, e, n);
      case 31:
        return kS(t, e, n);
      case 22:
        return Jm(
          t,
          e,
          n,
          e.pendingProps
        );
      case 24:
        return ji(e), i = he(It), t === null ? (u = or(), u === null && (u = qt, s = ur(), u.pooledCache = s, s.refCount++, s !== null && (u.pooledCacheLanes |= n), u = s), e.memoizedState = { parent: i, cache: u }, cr(e), ai(e, It, u)) : ((t.lanes & n) !== 0 && (fr(t, e), _l(e, null, null, n), zl()), u = t.memoizedState, s = e.memoizedState, u.parent !== i ? (u = { parent: i, cache: i }, e.memoizedState = u, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = u), ai(e, It, i)) : (i = s.cache, ai(e, It, i), i !== u.cache && lr(
          e,
          [It],
          n,
          !0
        ))), ae(
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
        }), i = e.pendingProps, i.name != null && i.name !== "auto" ? e.flags |= t === null ? 18882560 : 18874368 : vt && Gu(e), t !== null && t.memoizedProps.name !== i.name ? e.flags |= 4194816 : za(t, e), ae(t, e, i.children, n), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(r(156, e.tag));
  }
  function Zn(t) {
    t.flags |= 4;
  }
  function Kr(t, e, n, i, u) {
    var s;
    if ((s = (t.mode & 32) !== 0) && (s = n === null ? Vg(e, i) : Vg(e, i) && (i.src !== n.src || i.srcSet !== n.srcSet)), s) {
      if (t.flags |= 16777216, (u & 335544128) === u)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (Hy()) t.flags |= 8192;
        else
          throw Xi = Pu, rr;
    } else t.flags &= -16777217;
  }
  function ay(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Ng(e))
      if (Hy()) t.flags |= 8192;
      else
        throw Xi = Pu, rr;
  }
  function ms(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? Vh() : 536870912, t.lanes |= e, wa |= e);
  }
  function Ll(t, e) {
    if (!vt)
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
  function Xt(t) {
    var e = t.alternate !== null && t.alternate.child === t.child, n = 0, i = 0;
    if (e)
      for (var u = t.child; u !== null; )
        n |= u.lanes | u.childLanes, i |= u.subtreeFlags & 1206910976, i |= u.flags & 1206910976, u.return = t, u = u.sibling;
    else
      for (u = t.child; u !== null; )
        n |= u.lanes | u.childLanes, i |= u.subtreeFlags, i |= u.flags, u.return = t, u = u.sibling;
    return t.subtreeFlags |= i, t.childLanes = n, e;
  }
  function $S(t, e, n) {
    var i = e.pendingProps;
    switch (er(e), e.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Xt(e), null;
      case 1:
        return Xt(e), null;
      case 3:
        return n = e.stateNode, i = null, t !== null && (i = t.memoizedState.cache), e.memoizedState.cache !== i && (e.flags |= 2048), qn(It), Re(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (t === null || t.child === null) && (Aa(e) ? Zn(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, ir())), Xt(e), null;
      case 26:
        var u = e.type, s = e.memoizedState;
        return t === null ? (Zn(e), s !== null ? (Xt(e), ay(e, s)) : (Xt(e), Kr(
          e,
          u,
          null,
          i,
          n
        ))) : s ? s !== t.memoizedState ? (Zn(e), Xt(e), ay(e, s)) : (Xt(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== i && Zn(e), Xt(e), Kr(
          e,
          u,
          t,
          i,
          n
        )), null;
      case 27:
        if (la(e), n = xt.current, u = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== i && Zn(e);
        else {
          if (!i) {
            if (e.stateNode === null)
              throw Error(r(166));
            return Xt(e), e.subtreeFlags &= -33554433, null;
          }
          t = F.current, Aa(e) ? Bd(e) : (t = Mg(u, i, n), e.stateNode = t, Zn(e));
        }
        return Xt(e), e.subtreeFlags &= -33554433, null;
      case 5:
        if (la(e), u = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== i && Zn(e);
        else {
          if (!i) {
            if (e.stateNode === null)
              throw Error(r(166));
            return Xt(e), e.subtreeFlags &= -33554433, null;
          }
          if (s = F.current, Aa(e))
            Bd(e);
          else {
            var f = Fl(
              xt.current
            );
            switch (s) {
              case 1:
                s = f.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                s = f.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    s = f.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    s = f.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    s = f.createElement("div"), s.innerHTML = "<script><\/script>", s = s.removeChild(
                      s.firstChild
                    );
                    break;
                  case "select":
                    s = typeof i.is == "string" ? f.createElement("select", {
                      is: i.is
                    }) : f.createElement("select"), i.multiple ? s.multiple = !0 : i.size && (s.size = i.size);
                    break;
                  default:
                    s = typeof i.is == "string" ? f.createElement(u, { is: i.is }) : f.createElement(u);
                }
            }
            s[fe] = e, s[ze] = i;
            t: for (f = e.child; f !== null; ) {
              if (f.tag === 5 || f.tag === 6)
                s.appendChild(f.stateNode);
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
            e.stateNode = s;
            t: switch (ge(s, u, i), u) {
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
            i && Zn(e);
          }
        }
        return Xt(e), e.subtreeFlags &= -33554433, Kr(
          e,
          e.type,
          t === null ? null : t.memoizedProps,
          e.pendingProps,
          n
        ), null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== i && Zn(e);
        else {
          if (typeof i != "string" && e.stateNode === null)
            throw Error(r(166));
          if (t = xt.current, Aa(e)) {
            if (t = e.stateNode, n = e.memoizedProps, i = null, u = se, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  i = u.memoizedProps;
              }
            t[fe] = e, t = !!(t.nodeValue === n || i !== null && i.suppressHydrationWarning === !0 || ig(t.nodeValue, n)), t || ii(e, !0);
          } else
            t = Fl(t).createTextNode(
              i
            ), t[fe] = e, e.stateNode = t;
        }
        return Xt(e), null;
      case 31:
        if (n = e.memoizedState, t === null || t.memoizedState !== null) {
          if (i = Aa(e), n !== null) {
            if (t === null) {
              if (!i) throw Error(r(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(557));
              t[fe] = e;
            } else
              Bi(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Xt(e), t = !1;
          } else
            n = ir(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), t = !0;
          if (!t)
            return e.flags & 256 ? (Ge(e), e) : (Ge(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(r(558));
        }
        return Xt(e), null;
      case 13:
        if (i = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (u = Aa(e), i !== null && i.dehydrated !== null) {
            if (t === null) {
              if (!u) throw Error(r(318));
              if (u = e.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(r(317));
              u[fe] = e;
            } else
              Bi(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Xt(e), u = !1;
          } else
            u = ir(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return e.flags & 256 ? (Ge(e), e) : (Ge(e), null);
        }
        return Ge(e), (e.flags & 128) !== 0 ? (e.lanes = n, e) : (n = i !== null, t = t !== null && t.memoizedState !== null, n && (i = e.child, u = null, i.alternate !== null && i.alternate.memoizedState !== null && i.alternate.memoizedState.cachePool !== null && (u = i.alternate.memoizedState.cachePool.pool), s = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (s = i.memoizedState.cachePool.pool), s !== u && (i.flags |= 2048)), n !== t && n && (e.child.flags |= 8192), ms(e, e.updateQueue), Xt(e), null);
      case 4:
        return Re(), t === null && xc(e.stateNode.containerInfo), e.flags |= 67108864, Xt(e), null;
      case 10:
        return qn(e.type), Xt(e), null;
      case 19:
        if (pr(e), i = e.memoizedState, i === null) return Xt(e), null;
        if (u = (e.flags & 128) !== 0, s = i.rendering, s === null)
          if (u) Ll(i, !1);
          else {
            if (Pt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (s = $u(t), s !== null) {
                  for (e.flags |= 128, Ll(i, !1), t = s.updateQueue, e.updateQueue = t, ms(e, t), e.subtreeFlags = 0, t = n, n = e.child; n !== null; )
                    _d(n, t), n = n.sibling;
                  return Vl(
                    e,
                    me.current & 1 | 2
                  ), vt && jn(e, i.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            i.tail !== null && Le() > Cs && (e.flags |= 128, u = !0, Ll(i, !1), e.lanes = 4194304);
          }
        else {
          if (!u)
            if (t = $u(s), t !== null) {
              if (e.flags |= 128, u = !0, t = t.updateQueue, e.updateQueue = t, ms(e, t), Ll(i, !0), i.tail === null && i.tailMode !== "collapsed" && i.tailMode !== "visible" && !s.alternate && !vt)
                return Xt(e), null;
            } else
              2 * Le() - i.renderingStartTime > Cs && n !== 536870912 && (e.flags |= 128, u = !0, Ll(i, !1), e.lanes = 4194304);
          i.isBackwards ? (s.sibling = e.child, e.child = s) : (t = i.last, t !== null ? t.sibling = s : e.child = s, i.last = s);
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
          return i.rendering = t, i.tail = t.sibling, i.renderingStartTime = Le(), t.sibling = null, s = me.current, s = u ? s & 1 | 2 : s & 1, i.tailMode === "visible" || i.tailMode === "collapsed" || !n || vt ? Vl(e, s) : (n = s, X(de, e), X(me, n), Te === null && (Te = e)), vt && jn(e, i.treeForkCount), t;
        }
        return Xt(e), null;
      case 22:
      case 23:
        return Ge(e), yr(), i = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== i && (e.flags |= 8192) : i && (e.flags |= 8192), i ? (n & 536870912) !== 0 && (e.flags & 128) === 0 && (Xt(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Xt(e), n = e.updateQueue, n !== null && ms(e, n.retryQueue), n = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), i = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), i !== n && (e.flags |= 2048), t !== null && Bt(qi), null;
      case 24:
        return n = null, t !== null && (n = t.memoizedState.cache), e.memoizedState.cache !== n && (e.flags |= 2048), qn(It), Xt(e), null;
      case 25:
        return null;
      case 30:
        return e.flags |= 33554432, Xt(e), null;
    }
    throw Error(r(156, e.tag));
  }
  function tT(t, e) {
    switch (er(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return qn(It), Re(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return la(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (Ge(e), e.alternate === null)
            throw Error(r(340));
          Bi();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (Ge(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(r(340));
          Bi();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return pr(e), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, t = e.memoizedState, t !== null && (t.rendering = null, t.tail = null), e.flags |= 4, e) : null;
      case 4:
        return Re(), null;
      case 10:
        return qn(e.type), null;
      case 22:
      case 23:
        return Ge(e), yr(), t !== null && Bt(qi), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return qn(It), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function ly(t, e) {
    switch (er(e), e.tag) {
      case 3:
        qn(It), Re();
        break;
      case 26:
      case 27:
      case 5:
        la(e);
        break;
      case 4:
        Re();
        break;
      case 31:
        e.memoizedState !== null && Ge(e);
        break;
      case 13:
        Ge(e);
        break;
      case 19:
        pr(e);
        break;
      case 10:
        qn(e.type);
        break;
      case 22:
      case 23:
        Ge(e), yr(), t !== null && Bt(qi);
        break;
      case 24:
        qn(It);
    }
  }
  function Hl(t, e) {
    try {
      var n = e.updateQueue, i = n !== null ? n.lastEffect : null;
      if (i !== null) {
        var u = i.next;
        n = u;
        do {
          if ((n.tag & t) === t) {
            i = void 0;
            var s = n.create, f = n.inst;
            i = s(), f.destroy = i;
          }
          n = n.next;
        } while (n !== u);
      }
    } catch (m) {
      Ut(e, e.return, m);
    }
  }
  function hi(t, e, n) {
    try {
      var i = e.updateQueue, u = i !== null ? i.lastEffect : null;
      if (u !== null) {
        var s = u.next;
        i = s;
        do {
          if ((i.tag & t) === t) {
            var f = i.inst, m = f.destroy;
            if (m !== void 0) {
              f.destroy = void 0, u = e;
              var T = n, C = m;
              try {
                C();
              } catch (R) {
                Ut(
                  u,
                  T,
                  R
                );
              }
            }
          }
          i = i.next;
        } while (i !== s);
      }
    } catch (R) {
      Ut(e, e.return, R);
    }
  }
  function uy(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var n = t.stateNode;
      try {
        Pd(e, n);
      } catch (i) {
        Ut(t, t.return, i);
      }
    }
  }
  function sy(t, e, n) {
    n.props = Ki(
      t.type,
      t.memoizedProps
    ), n.state = t.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (i) {
      Ut(t, e, i);
    }
  }
  function Tn(t, e) {
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
            var u = t.stateNode, s = Bn(t.memoizedProps, u);
            (u.ref === null || u.ref.name !== s) && (u.ref = mg(s)), i = u.ref;
            break;
          case 7:
            if (t.stateNode === null) {
              var f = new Je(t);
              g(
                t.child,
                !1,
                QT,
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
      Ut(t, e, m);
    }
  }
  function ye(t, e) {
    var n = t.ref, i = t.refCleanup;
    if (n !== null)
      if (typeof i == "function")
        try {
          i();
        } catch (u) {
          Ut(t, e, u);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (u) {
          Ut(t, e, u);
        }
      else n.current = null;
  }
  function ys(t, e) {
    if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && t.alternate === null && e !== null)
      for (var n = 0; n < e.length; n++)
        Tg(
          t.stateNode,
          e[n]
        );
  }
  function oy(t) {
    for (var e = t.return; e !== null && (Fr(e) && Tg(t.stateNode, e.stateNode), !Jr(e)); )
      e = e.return;
  }
  function jl(t) {
    for (var e = t.return; e !== null && (Fr(e) && ZT(t.stateNode, e.stateNode), !Jr(e)); )
      e = e.return;
  }
  function Jr(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 27;
  }
  function Fr(t) {
    return t && t.tag === 7 && t.stateNode !== null;
  }
  function Pr(t) {
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
    } catch (u) {
      Ut(t, t.return, u);
    }
  }
  function kr(t, e, n) {
    try {
      var i = t.stateNode;
      CT(i, t.type, n, e), i[ze] = e;
    } catch (u) {
      Ut(t, t.return, u);
    }
  }
  function ry(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Si(t.type) || t.tag === 4;
  }
  function Wr(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || ry(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Si(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Ir(t, e, n, i) {
    var u = t.tag;
    if (u === 5 || u === 6)
      u = t.stateNode, e ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(u, e) : (e = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, e.appendChild(u), n = n._reactRootContainer, n != null || e.onclick !== null || (e.onclick = pn)), ys(t, i), Rt = !0;
    else if (u !== 4 && (u === 27 && (ys(t, i), i = null, Si(t.type) && (n = t.stateNode, e = null)), t = t.child, t !== null))
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
  function gs(t, e, n, i) {
    var u = t.tag;
    if (u === 5 || u === 6)
      u = t.stateNode, e ? n.insertBefore(u, e) : n.appendChild(u), ys(t, i), Rt = !0;
    else if (u !== 4 && (u === 27 && (ys(t, i), i = null, Si(t.type) && (n = t.stateNode)), t = t.child, t !== null))
      for (gs(
        t,
        e,
        n,
        i
      ), t = t.sibling; t !== null; )
        gs(
          t,
          e,
          n,
          i
        ), t = t.sibling;
  }
  function cy(t) {
    var e = t.stateNode, n = t.memoizedProps;
    try {
      for (var i = t.type, u = e.attributes; u.length; )
        e.removeAttributeNode(u[0]);
      ge(e, i, n), e[fe] = t, e[ze] = n;
    } catch (s) {
      Ut(t, t.return, s);
    }
  }
  var ps = !1, Xe = null;
  function fy(t) {
    (t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (ps = !0);
  }
  var bn = null;
  function hy() {
    var t = bn;
    return bn = null, t;
  }
  var Ve = 0;
  function _a(t, e, n, i, u) {
    return Ve = 0, dy(
      t.child,
      e,
      n,
      i,
      u
    );
  }
  function dy(t, e, n, i, u) {
    for (var s = !1; t !== null; ) {
      if (t.tag === 5) {
        var f = t.stateNode;
        if (i !== null) {
          var m = wc(f);
          i.push(m), m.view && (s = !0);
        } else
          s || wc(f).view && (s = !0);
        ps = !0, hg(
          f,
          Ve === 0 ? e : e + "_" + Ve,
          n
        ), Ve++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && u || dy(
        t.child,
        e,
        n,
        i,
        u
      ) && (s = !0));
      t = t.sibling;
    }
    return s;
  }
  function En(t, e) {
    for (; t !== null; )
      t.tag === 5 ? dg(t.stateNode, t.memoizedProps) : (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && e || En(
        t.child,
        e
      )), t = t.sibling;
  }
  function vs(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if ((t.tag !== 22 || t.memoizedState === null) && (vs(t), t.tag === 30 && (t.flags & 18874368) !== 0 && t.stateNode.paired)) {
          var e = t.memoizedProps;
          if (e.name == null || e.name === "auto")
            throw Error(r(544));
          var n = e.name;
          e = Ln(e.default, e.share), e !== "none" && (_a(
            t,
            n,
            e,
            null,
            !1
          ) || En(t.child, !1));
        }
        t = t.sibling;
      }
  }
  function $r(t, e) {
    if (t.tag === 30) {
      var n = t.stateNode, i = t.memoizedProps, u = Bn(i, n), s = Ln(
        i.default,
        n.paired ? i.share : i.enter
      );
      s !== "none" ? _a(t, u, s, null, !1) ? (vs(t), n.paired || e || ja(t, i.onEnter)) : En(t.child, !1) : vs(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        $r(t, e), t = t.sibling;
    else vs(t);
  }
  function tc(t) {
    if (Xe !== null && Xe.size !== 0) {
      var e = Xe;
      if ((t.subtreeFlags & 18874368) !== 0)
        for (t = t.child; t !== null; ) {
          if (t.tag !== 22 || t.memoizedState === null) {
            if (t.tag === 30 && (t.flags & 18874368) !== 0) {
              var n = t.memoizedProps, i = n.name;
              if (i != null && i !== "auto") {
                var u = e.get(i);
                if (u !== void 0) {
                  var s = Ln(
                    n.default,
                    n.share
                  );
                  if (s !== "none" && (_a(
                    t,
                    i,
                    s,
                    null,
                    !1
                  ) ? (s = t.stateNode, u.paired = s, s.paired = u, ja(t, n.onShare)) : En(t.child, !1)), e.delete(i), e.size === 0) break;
                }
              }
            }
            tc(t);
          }
          t = t.sibling;
        }
    }
  }
  function ec(t) {
    if (t.tag === 30) {
      var e = t.memoizedProps, n = Bn(e, t.stateNode), i = Xe !== null ? Xe.get(n) : void 0, u = Ln(
        e.default,
        i !== void 0 ? e.share : e.exit
      );
      u !== "none" && (_a(t, n, u, null, !1) ? i !== void 0 ? (u = t.stateNode, i.paired = u, u.paired = i, Xe.delete(n), ja(t, e.onShare)) : ja(t, e.onExit) : En(t.child, !1)), Xe !== null && tc(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        ec(t), t = t.sibling;
    else
      Xe !== null && tc(t);
  }
  function my(t) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var e = t.memoizedProps, n = Bn(e, t.stateNode);
        e = Ln(e.default, e.update), t.flags &= -5, e !== "none" && _a(
          t,
          n,
          e,
          t.memoizedState = [],
          !1
        );
      } else
        (t.subtreeFlags & 33554432) !== 0 && my(t);
      t = t.sibling;
    }
  }
  function nc(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if (t.tag !== 22 || t.memoizedState === null) {
          if (t.tag === 30 && (t.flags & 18874368) !== 0) {
            var e = t.stateNode;
            e.paired !== null && (e.paired = null, En(t.child, !1));
          }
          nc(t);
        }
        t = t.sibling;
      }
  }
  function Ss(t) {
    if (t.tag === 30)
      t.stateNode.paired = null, En(t.child, !1), nc(t);
    else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Ss(t), t = t.sibling;
    else nc(t);
  }
  function yy(t) {
    for (t = t.child; t !== null; )
      t.tag === 30 ? En(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && yy(t), t = t.sibling;
  }
  function ic(t, e, n, i, u, s, f) {
    for (var m = !1; e !== null; ) {
      if (e.tag === 5) {
        var T = e.stateNode;
        if (s !== null && Ve < s.length) {
          var C = s[Ve], R = wc(T);
          (C.view || R.view) && (m = !0);
          var N;
          if (N = (t.flags & 4) === 0)
            if (R.clip) N = !0;
            else {
              N = C.rect;
              var M = R.rect;
              N = N.y !== M.y || N.x !== M.x || N.height !== M.height || N.width !== M.width;
            }
          N && (t.flags |= 4), R.abs ? R = !C.abs : (C = C.rect, R = R.rect, R = C.height !== R.height || C.width !== R.width), R && (t.flags |= 32);
        } else t.flags |= 32;
        (t.flags & 4) !== 0 && hg(
          T,
          Ve === 0 ? n : n + "_" + Ve,
          u
        ), m && (t.flags & 4) !== 0 || (bn === null && (bn = []), bn.push(
          T,
          Ve === 0 ? i : i + "_" + Ve,
          e.memoizedProps
        )), Ve++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && f ? t.flags |= e.flags & 32 : ic(
        t,
        e.child,
        n,
        i,
        u,
        s,
        f
      ) && (m = !0));
      e = e.sibling;
    }
    return m;
  }
  function gy(t, e) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var n = t.memoizedProps, i = t.stateNode, u = Bn(n, i), s = Ln(n.default, n.update), f;
        f = t.memoizedState, t.memoizedState = null, i = t;
        var m = t.child;
        Ve = 0, u = ic(
          i,
          m,
          u,
          u,
          s,
          f,
          !1
        ), (t.flags & 4) !== 0 && u && ja(t, n.onUpdate);
      } else
        (t.subtreeFlags & 33554432) !== 0 && gy(t);
      t = t.sibling;
    }
  }
  var oe = !1, Vt = !1, An = !1, ac = !1, py = typeof WeakSet == "function" ? WeakSet : Set, re = null, Mn = !1, Yl = !1, Ts = !1, lc = !1;
  function eT(t, e, n) {
    if (t = t.containerInfo, zc = Pa, t = bd(t), Zo(t)) {
      if ("selectionStart" in t)
        var i = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          i = (i = t.ownerDocument) && i.defaultView || window;
          var u = i.getSelection && i.getSelection();
          if (u && u.rangeCount !== 0) {
            i = u.anchorNode;
            var s = u.anchorOffset, f = u.focusNode;
            u = u.focusOffset;
            try {
              i.nodeType, f.nodeType;
            } catch {
              i = null;
              break t;
            }
            var m = 0, T = -1, C = -1, R = 0, N = 0, M = t, O = null;
            e: for (; ; ) {
              for (var K; M !== i || s !== 0 && M.nodeType !== 3 || (T = m + s), M !== f || u !== 0 && M.nodeType !== 3 || (C = m + u), M.nodeType === 3 && (m += M.nodeValue.length), (K = M.firstChild) !== null; )
                O = M, M = K;
              for (; ; ) {
                if (M === t) break e;
                if (O === i && ++R === s && (T = m), O === f && ++N === u && (C = m), (K = M.nextSibling) !== null) break;
                M = O, O = M.parentNode;
              }
              M = K;
            }
            i = T === -1 || C === -1 ? null : { start: T, end: C };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (_c = { focusedElem: t, selectionRange: i }, Pa = !1, n = (n & 335544064) === n, re = e, e = n ? 9270 : 1024; re !== null; ) {
      if (t = re, n && (i = t.deletions, i !== null))
        for (s = 0; s < i.length; s++)
          n && ec(i[s]);
      if (t.alternate === null && (t.flags & 2) !== 0)
        n && fy(t), bs(n);
      else {
        if (t.tag === 22) {
          if (i = t.alternate, t.memoizedState !== null) {
            i !== null && i.memoizedState === null && n && ec(i), bs(n);
            continue;
          } else if (i !== null && i.memoizedState !== null) {
            n && fy(t), bs(n);
            continue;
          }
        }
        i = t.child, (t.subtreeFlags & e) !== 0 && i !== null ? (i.return = t, re = i) : (n && my(t), bs(n));
      }
    }
    Xe = null;
  }
  function bs(t) {
    for (; re !== null; ) {
      var e = re, n = t, i = e.alternate, u = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ((u & 1024) !== 0 && i !== null) {
            n = void 0, u = i.memoizedProps, i = i.memoizedState;
            var s = e.stateNode;
            try {
              var f = Ki(
                e.type,
                u
              );
              n = s.getSnapshotBeforeUpdate(
                f,
                i
              ), s.__reactInternalSnapshotBeforeUpdate = n;
            } catch (m) {
              Ut(e, e.return, m);
            }
          }
          break;
        case 3:
          if ((u & 1024) !== 0) {
            if (i = e.stateNode.containerInfo, n = i.nodeType, n === 9)
              Hc(i);
            else if (n === 1)
              switch (i.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  Hc(i);
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
          n && i !== null && (n = Bn(
            i.memoizedProps,
            i.stateNode
          ), u = e.memoizedProps, u = Ln(u.default, u.update), u !== "none" && _a(
            i,
            n,
            u,
            i.memoizedState = [],
            !0
          ));
          break;
        default:
          if ((u & 1024) !== 0) throw Error(r(163));
      }
      if (i = e.sibling, i !== null) {
        i.return = e.return, re = i;
        break;
      }
      re = e.return;
    }
  }
  function vy(t, e, n) {
    var i = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        Dn(t, n), i & 4 && Hl(5, n);
        break;
      case 1:
        if (Dn(t, n), i & 4)
          if (t = n.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (f) {
              Ut(n, n.return, f);
            }
          else {
            var u = Ki(
              n.type,
              e.memoizedProps
            );
            e = e.memoizedState;
            try {
              t.componentDidUpdate(
                u,
                e,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (f) {
              Ut(
                n,
                n.return,
                f
              );
            }
          }
        i & 64 && uy(n), i & 512 && Tn(n, n.return);
        break;
      case 3:
        if (Dn(t, n), i & 64 && (t = n.updateQueue, t !== null)) {
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
            Pd(t, e);
          } catch (f) {
            Ut(n, n.return, f);
          }
        }
        break;
      case 27:
        e === null && i & 4 && cy(n);
      case 26:
      case 5:
        Dn(t, n), e === null && i & 4 && Pr(n), i & 512 && Tn(n, n.return);
        break;
      case 12:
        Dn(t, n);
        break;
      case 31:
        Dn(t, n), i & 4 && Ey(t, n);
        break;
      case 13:
        Dn(t, n), i & 4 && Ay(t, n), i & 64 && (t = n.memoizedState, t !== null && (t = t.dehydrated, t !== null && (n = dT.bind(
          null,
          n
        ), FT(t, n))));
        break;
      case 22:
        if (i = n.memoizedState !== null || oe, !i) {
          var s = e !== null && e.memoizedState !== null || Vt;
          e = oe, u = Vt, oe = i, (Vt = s) && !u ? (i = 2, (n.subtreeFlags & 8772) !== 0 && (i |= 1), fn(
            t,
            n,
            i
          )) : Dn(t, n), oe = e, Vt = u;
        }
        break;
      case 30:
        Dn(t, n), i & 512 && Tn(n, n.return);
        break;
      case 7:
        i & 512 && Tn(n, n.return);
      default:
        Dn(t, n);
    }
  }
  function uc(t, e) {
    for (t = t.child; t !== null; )
      Sy(t, e), t = t.sibling;
  }
  function Sy(t, e) {
    switch (t.tag) {
      case 5:
      case 26:
        try {
          var n = t.stateNode;
          if (e) {
            var i = n.style;
            typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
          } else {
            var u = t.stateNode, s = t.memoizedProps.style, f = s != null && s.hasOwnProperty("display") ? s.display : null;
            u.style.display = f == null || typeof f == "boolean" ? "" : ("" + f).trim();
          }
        } catch (T) {
          Ut(t, t.return, T);
        }
        sc(t, e);
        break;
      case 6:
        try {
          t.stateNode.nodeValue = e ? "" : t.memoizedProps, Rt = !0;
        } catch (T) {
          Ut(t, t.return, T);
        }
        break;
      case 18:
        try {
          var m = t.stateNode;
          e ? fg(m, !0) : fg(t.stateNode, !1);
        } catch (T) {
          Ut(t, t.return, T);
        }
        break;
      case 22:
      case 23:
        t.memoizedState === null && uc(t, e);
        break;
      default:
        uc(t, e);
    }
  }
  function sc(t, e) {
    if (t.subtreeFlags & 67108864)
      for (t = t.child; t !== null; ) {
        t: {
          var n = t, i = e;
          switch (n.tag) {
            case 4:
              Sy(n, i);
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
  function Ty(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, Ty(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && Cu(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Kt = null, Ne = !1;
  function rn(t, e, n) {
    for (n = n.child; n !== null; )
      by(t, e, n), n = n.sibling;
  }
  function by(t, e, n) {
    if (He && typeof He.onCommitFiberUnmount == "function")
      try {
        He.onCommitFiberUnmount(rl, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        Vt || ye(n, e), rn(
          t,
          e,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !Vt && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        Vt || ye(n, e), jl(n);
        var i = Kt, u = Ne;
        Si(n.type) && (Kt = n.stateNode, Ne = !1), rn(
          t,
          e,
          n
        ), Dg(
          n.stateNode,
          n.type,
          n.memoizedProps
        ), Kt = i, Ne = u;
        break;
      case 5:
        Vt || ye(n, e), jl(n);
      case 6:
        if (n.tag === 6 && jl(n), i = Kt, u = Ne, Kt = null, rn(
          t,
          e,
          n
        ), Kt = i, Ne = u, Kt !== null)
          if (Ne)
            try {
              (Kt.nodeType === 9 ? Kt.body : Kt.nodeName === "HTML" ? Kt.ownerDocument.body : Kt).removeChild(n.stateNode), Rt = !0;
            } catch (s) {
              Ut(
                n,
                e,
                s
              );
            }
          else
            try {
              Kt.removeChild(n.stateNode), Rt = !0;
            } catch (s) {
              Ut(
                n,
                e,
                s
              );
            }
        break;
      case 18:
        Kt !== null && (Ne ? (t = Kt, cg(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          n.stateNode
        ), ka(t)) : cg(Kt, n.stateNode));
        break;
      case 4:
        i = Kt, u = Ne, Kt = n.stateNode.containerInfo, Ne = !0, rn(
          t,
          e,
          n
        ), Kt = i, Ne = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        hi(2, n, e), Vt || hi(4, n, e), rn(
          t,
          e,
          n
        );
        break;
      case 1:
        Vt || (ye(n, e), i = n.stateNode, typeof i.componentWillUnmount == "function" && sy(
          n,
          e,
          i
        )), rn(
          t,
          e,
          n
        );
        break;
      case 21:
        rn(
          t,
          e,
          n
        );
        break;
      case 22:
        Vt = (i = Vt) || n.memoizedState !== null, rn(
          t,
          e,
          n
        ), Vt = i;
        break;
      case 30:
        ye(n, e), rn(
          t,
          e,
          n
        );
        break;
      case 7:
        Vt || ye(n, e), rn(
          t,
          e,
          n
        );
        break;
      default:
        rn(
          t,
          e,
          n
        );
    }
  }
  function Ey(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        ka(t);
      } catch (n) {
        Ut(e, e.return, n);
      }
    }
  }
  function Ay(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        ka(t);
      } catch (n) {
        Ut(e, e.return, n);
      }
  }
  function nT(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new py()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new py()), e;
      default:
        throw Error(r(435, t.tag));
    }
  }
  function Es(t, e) {
    var n = nT(t);
    e.forEach(function(i) {
      if (!n.has(i)) {
        n.add(i);
        var u = mT.bind(null, t, i);
        i.then(u, u);
      }
    });
  }
  function De(t, e, n) {
    var i = e.deletions;
    if (i !== null)
      for (var u = 0; u < i.length; u++) {
        var s = i[u], f = t, m = e, T = m;
        t: for (; T !== null; ) {
          switch (T.tag) {
            case 27:
              if (Si(T.type)) {
                Kt = T.stateNode, Ne = !1;
                break t;
              }
              break;
            case 5:
              Kt = T.stateNode, Ne = !1;
              break t;
            case 3:
            case 4:
              Kt = T.stateNode.containerInfo, Ne = !0;
              break t;
          }
          T = T.return;
        }
        if (Kt === null) throw Error(r(160));
        by(f, m, s), Kt = null, Ne = !1, f = s.alternate, f !== null && (f.return = null), s.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        My(e, t, n), e = e.sibling;
  }
  var cn = null;
  function My(t, e, n) {
    var i = t.alternate, u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (u & 4 && (i = t.updateQueue, i = i !== null ? i.events : null, i !== null))
          for (var s = 0; s < i.length; s++) {
            var f = i[s];
            f.ref.impl = f.nextImpl;
          }
        De(e, t, n), Ce(t), u & 4 && (hi(3, t, t.return), Hl(3, t), hi(5, t, t.return));
        break;
      case 1:
        De(e, t, n), Ce(t), u & 512 && (Vt || i === null || ye(i, i.return)), u & 64 && oe && (t = t.updateQueue, t !== null && (e = t.callbacks, e !== null && (n = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = n === null ? e : n.concat(e))));
        break;
      case 26:
        if (s = cn, De(e, t, n), Ce(t), u & 512 && (Vt || i === null || ye(i, i.return)), u & 4)
          if (u = i !== null ? i.memoizedState : null, n = t.memoizedState, i === null)
            if (n === null)
              if (t.stateNode === null)
                if (oe)
                  t.stateNode = sg(
                    t.type,
                    t.memoizedProps,
                    e.containerInfo,
                    t
                  );
                else {
                  t: {
                    e = t.type, n = t.memoizedProps, u = s.ownerDocument || s;
                    e: switch (e) {
                      case "title":
                        i = u.getElementsByTagName("title")[0], (!i || i[hl] || i[fe] || i.namespaceURI === "http://www.w3.org/2000/svg" || i.hasAttribute("itemprop")) && (i = u.createElement(e), u.head.insertBefore(
                          i,
                          u.querySelector("head > title")
                        )), ge(i, e, n), i[fe] = t, ue(i), e = i;
                        break t;
                      case "link":
                        if (s = _g(
                          "link",
                          "href",
                          u
                        ).get(e + (n.href || ""))) {
                          for (f = 0; f < s.length; f++)
                            if (i = s[f], i.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && i.getAttribute("rel") === (n.rel == null ? null : n.rel) && i.getAttribute("title") === (n.title == null ? null : n.title) && i.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                              s.splice(f, 1);
                              break e;
                            }
                        }
                        i = u.createElement(e), ge(i, e, n), u.head.appendChild(i);
                        break;
                      case "meta":
                        if (s = _g(
                          "meta",
                          "content",
                          u
                        ).get(e + (n.content || ""))) {
                          for (f = 0; f < s.length; f++)
                            if (i = s[f], i.getAttribute("content") === (n.content == null ? null : "" + n.content) && i.getAttribute("name") === (n.name == null ? null : n.name) && i.getAttribute("property") === (n.property == null ? null : n.property) && i.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && i.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                              s.splice(f, 1);
                              break e;
                            }
                        }
                        i = u.createElement(e), ge(i, e, n), u.head.appendChild(i);
                        break;
                      default:
                        throw Error(r(468, e));
                    }
                    i[fe] = t, ue(i), e = i;
                  }
                  t.stateNode = e;
                }
              else
                oe || Zc(s, t.type, t.stateNode);
            else
              t.stateNode = zg(
                s,
                n,
                t.memoizedProps
              );
          else
            u !== n ? (u === null ? (e = i.stateNode, e === null || Vt || e.parentNode.removeChild(e)) : u.count--, n === null ? oe || Zc(s, t.type, t.stateNode) : zg(s, n, t.memoizedProps)) : n === null && t.stateNode !== null && kr(
              t,
              t.memoizedProps,
              i.memoizedProps
            );
        break;
      case 27:
        De(e, t, n), Ce(t), u & 512 && (Vt || i === null || ye(i, i.return)), i !== null && u & 4 && kr(
          t,
          t.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (s = An, An = !1, De(e, t, n), An = s, Ce(t), u & 512 && (Vt || i === null || ye(i, i.return)), t.flags & 32) {
          e = t.stateNode;
          try {
            da(e, ""), Rt = !0;
          } catch (R) {
            Ut(t, t.return, R);
          }
        }
        u & 4 && t.stateNode != null && (e = t.memoizedProps, kr(
          t,
          e,
          i !== null ? i.memoizedProps : e
        )), u & 1024 && (ac = !0);
        break;
      case 6:
        if (De(e, t, n), Ce(t), u & 4) {
          if (t.stateNode === null)
            throw Error(r(162));
          e = t.memoizedProps, n = t.stateNode;
          try {
            n.nodeValue = e, Rt = !0;
          } catch (R) {
            Ut(t, t.return, R);
          }
        }
        break;
      case 3:
        if (Rt = !1, Ls = null, s = cn, cn = Pl(e.containerInfo), De(e, t, n), cn = s, Ce(t), u & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            ka(e.containerInfo);
          } catch (R) {
            Ut(t, t.return, R);
          }
        ac && (ac = !1, Dy(t)), Rt = !1;
        break;
      case 4:
        u = An, An = oe, i = Zh(), s = cn, cn = Pl(
          t.stateNode.containerInfo
        ), De(e, t, n), Ce(t), cn = s, Rt && Yl && (Ts = !0), Rt = i, An = u;
        break;
      case 12:
        De(e, t, n), Ce(t);
        break;
      case 31:
        De(e, t, n), Ce(t), u & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, Es(t, e)));
        break;
      case 13:
        De(e, t, n), Ce(t), t.child.flags & 8192 && t.memoizedState !== null != (i !== null && i.memoizedState !== null) && (Ds = Le()), u & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, Es(t, e)));
        break;
      case 22:
        s = t.memoizedState !== null, f = i !== null && i.memoizedState !== null;
        var m = oe, T = Vt, C = An;
        oe = m || s, An = C || s, Vt = T || f, De(e, t, n), Vt = T, An = C, oe = m, Ce(t), u & 8192 && (e = t.stateNode, e._visibility = s ? e._visibility & -2 : e._visibility | 1, !s || i === null || f || oe || Vt || (e = f || Vt, n = oe, i = Vt, oe = s || oe, Vt = e, di(t, 2), oe = n, Vt = i), !s && An || uc(t, s)), u & 4 && (e = t.updateQueue, e !== null && (n = e.retryQueue, n !== null && (e.retryQueue = null, Es(t, n))));
        break;
      case 19:
        De(e, t, n), Ce(t), u & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, Es(t, e)));
        break;
      case 30:
        u & 512 && (Vt || i === null || ye(i, i.return)), u = Zh(), s = Yl, f = (n & 335544064) === n, m = t.memoizedProps, Yl = f && Ln(
          m.default,
          m.update
        ) !== "none", De(e, t, n), Ce(t), f && i !== null && Rt && (t.flags |= 4), Yl = s, Rt = u;
        break;
      case 21:
        break;
      case 7:
        u & 512 && (Vt || i === null || ye(i, i.return)), i && i.stateNode !== null && (i.stateNode._fragmentFiber = t);
      default:
        De(e, t, n), Ce(t);
    }
  }
  function Ce(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var n, i = t.return; i !== null; ) {
          if (ry(i)) {
            n = i;
            break;
          }
          i = i.return;
        }
        i = null;
        for (var u = t.return; u !== null; ) {
          if (Fr(u)) {
            var s = u.stateNode;
            i === null ? i = [s] : i.push(s);
          }
          if (Jr(u)) break;
          u = u.return;
        }
        var f = i;
        if (n == null) throw Error(r(160));
        switch (n.tag) {
          case 27:
            var m = n.stateNode, T = Wr(t);
            gs(
              t,
              T,
              m,
              f
            );
            break;
          case 5:
            var C = n.stateNode;
            n.flags & 32 && (da(C, ""), n.flags &= -33);
            var R = Wr(t);
            gs(
              t,
              R,
              C,
              f
            );
            break;
          case 3:
          case 4:
            var N = n.stateNode.containerInfo, M = Wr(t);
            Ir(
              t,
              M,
              N,
              f
            );
            break;
          default:
            throw Error(r(161));
        }
      } catch (O) {
        Ut(t, t.return, O);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function Dy(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        Dy(e), e.tag === 5 && e.flags & 1024 && (e = e.stateNode, Pa = !0, e.reset(), Pa = !1), t = t.sibling;
      }
  }
  function Va(t, e) {
    if (e.subtreeFlags & 9270)
      for (e = e.child; e !== null; )
        Cy(e, t), e = e.sibling;
    else gy(e);
  }
  function Cy(t, e) {
    var n = t.alternate;
    if (n === null) $r(t, !1);
    else
      switch (t.tag) {
        case 3:
          if (lc = Mn = !1, hy(), Va(e, t), !Mn && !Ts) {
            if (t = bn, t !== null)
              for (var i = 0; i < t.length; i += 3) {
                n = t[i];
                var u = t[i + 1];
                dg(n, t[i + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate(
                  { opacity: [0, 0], pointerEvents: ["none", "none"] },
                  {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition-group(" + u + ")"
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
            )), lc = !0;
          }
          bn = null;
          break;
        case 5:
          Va(e, t);
          break;
        case 4:
          i = Mn, Mn = !1, Va(e, t), Mn && (Ts = !0), Mn = i;
          break;
        case 22:
          t.memoizedState === null && (n.memoizedState !== null ? $r(t, !1) : Va(e, t));
          break;
        case 30:
          i = Mn, u = hy(), Mn = !1, Va(e, t), Mn && (t.flags |= 4);
          var s = t.memoizedProps, f = t.stateNode;
          e = Bn(s, f), f = Bn(n.memoizedProps, f);
          var m = Ln(s.default, s.update);
          m === "none" ? e = !1 : (s = n.memoizedState, n.memoizedState = null, n = t.child, Ve = 0, e = ic(
            t,
            n,
            e,
            f,
            m,
            s,
            !0
          ), Ve !== (s === null ? 0 : s.length) && (t.flags |= 32)), (t.flags & 4) !== 0 && e ? (ja(
            t,
            t.memoizedProps.onUpdate
          ), bn = u) : u !== null && (u.push.apply(u, bn), bn = u), Mn = (t.flags & 32) !== 0 ? !0 : i;
          break;
        default:
          Va(e, t);
      }
  }
  function Dn(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        vy(t, e.alternate, e), e = e.sibling;
  }
  function di(t, e) {
    for (t = t.child; t !== null; ) {
      var n = t, i = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          hi(4, n, n.return), di(
            n,
            i
          );
          break;
        case 1:
          ye(n, n.return);
          var u = n.stateNode;
          typeof u.componentWillUnmount == "function" && sy(
            n,
            n.return,
            u
          ), di(
            n,
            i
          );
          break;
        case 27:
          (i & 2) !== 0 && Dg(
            n.stateNode,
            n.type,
            n.memoizedProps
          );
        case 5:
          ye(n, n.return), n.tag !== 5 && n.tag !== 27 || jl(n), di(
            n,
            i
          );
          break;
        case 6:
          jl(n);
          break;
        case 26:
          ye(n, n.return), u = n.stateNode, n.memoizedState !== null || u === null || Vt || u.parentNode.removeChild(u), di(
            n,
            i
          );
          break;
        case 22:
          n.memoizedState === null && di(
            n,
            i
          );
          break;
        case 30:
          ye(n, n.return), di(
            n,
            i
          );
          break;
        case 7:
          ye(n, n.return);
        default:
          di(
            n,
            i
          );
      }
      t = t.sibling;
    }
  }
  function fn(t, e, n) {
    for (n = (e.subtreeFlags & 8772) !== 0 ? n : n & -2, e = e.child; e !== null; ) {
      var i = e.alternate, u = t, s = e, f = s.flags, m = (n & 1) !== 0;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          fn(
            u,
            s,
            n
          ), Hl(4, s);
          break;
        case 1:
          if (fn(
            u,
            s,
            n
          ), i = s, u = i.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (R) {
              Ut(i, i.return, R);
            }
          if (i = s, u = i.updateQueue, u !== null) {
            var T = i.stateNode;
            try {
              var C = u.shared.hiddenCallbacks;
              if (C !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < C.length; u++)
                  Fd(C[u], T);
            } catch (R) {
              Ut(i, i.return, R);
            }
          }
          m && f & 64 && uy(s), Tn(s, s.return);
          break;
        case 27:
          (n & 2) !== 0 && cy(s);
        case 5:
          s.tag !== 5 && s.tag !== 27 || oy(s), fn(
            u,
            s,
            n
          ), m && i === null && f & 4 && Pr(s), Tn(s, s.return);
          break;
        case 6:
          oy(s);
          break;
        case 26:
          T = s.stateNode, s.memoizedState !== null || T === null || oe || Zc(
            Pl(T.ownerDocument),
            s.type,
            T
          ), fn(
            u,
            s,
            n
          ), m && i === null && f & 4 && Pr(s), Tn(s, s.return);
          break;
        case 12:
          fn(
            u,
            s,
            n
          );
          break;
        case 31:
          fn(
            u,
            s,
            n
          ), m && f & 4 && Ey(u, s);
          break;
        case 13:
          fn(
            u,
            s,
            n
          ), m && f & 4 && Ay(u, s);
          break;
        case 22:
          s.memoizedState === null && fn(
            u,
            s,
            n
          ), Tn(s, s.return);
          break;
        case 30:
          fn(
            u,
            s,
            n
          ), Tn(s, s.return);
          break;
        case 7:
          Tn(s, s.return);
        default:
          fn(
            u,
            s,
            n
          );
      }
      e = e.sibling;
    }
  }
  function oc(t, e) {
    var n = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== n && (t != null && t.refCount++, n != null && Dl(n));
  }
  function rc(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Dl(t));
  }
  function tn(t, e, n, i) {
    var u = (n & 335544064) === n;
    if (e.subtreeFlags & (u ? 10262 : 10256))
      for (e = e.child; e !== null; )
        xy(
          t,
          e,
          n,
          i
        ), e = e.sibling;
    else u && yy(e);
  }
  function xy(t, e, n, i) {
    var u = (n & 335544064) === n;
    u && e.alternate === null && e.return !== null && e.return.alternate !== null && Ss(e);
    var s = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        tn(
          t,
          e,
          n,
          i
        ), s & 2048 && Hl(9, e);
        break;
      case 1:
        tn(
          t,
          e,
          n,
          i
        );
        break;
      case 3:
        tn(
          t,
          e,
          n,
          i
        ), u && lc && (t = t.containerInfo, t = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, t.style.viewTransitionName === "root" && (t.style.viewTransitionName = ""), t = t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "none" && (t.style.viewTransitionName = "")), s & 2048 && (s = null, e.alternate !== null && (s = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== s && (e.refCount++, s != null && Dl(s)));
        break;
      case 12:
        if (s & 2048) {
          tn(
            t,
            e,
            n,
            i
          ), s = e.stateNode;
          try {
            var f = e.memoizedProps, m = f.id, T = f.onPostCommit;
            typeof T == "function" && T(
              m,
              e.alternate === null ? "mount" : "update",
              s.passiveEffectDuration,
              -0
            );
          } catch (C) {
            Ut(e, e.return, C);
          }
        } else
          tn(
            t,
            e,
            n,
            i
          );
        break;
      case 31:
        tn(
          t,
          e,
          n,
          i
        );
        break;
      case 13:
        tn(
          t,
          e,
          n,
          i
        );
        break;
      case 23:
        break;
      case 22:
        f = e.stateNode, m = e.alternate, e.memoizedState !== null ? (u && m !== null && m.memoizedState === null && Ss(m), f._visibility & 2 ? tn(
          t,
          e,
          n,
          i
        ) : ql(
          t,
          e
        )) : (u && m !== null && m.memoizedState !== null && Ss(e), f._visibility & 2 ? tn(
          t,
          e,
          n,
          i
        ) : (f._visibility |= 2, Na(
          t,
          e,
          n,
          i,
          (e.subtreeFlags & 10256) !== 0 || !1
        ))), s & 2048 && oc(m, e);
        break;
      case 24:
        tn(
          t,
          e,
          n,
          i
        ), s & 2048 && rc(e.alternate, e);
        break;
      case 30:
        u && (s = e.alternate, s !== null && (En(s.child, !0), En(e.child, !0))), tn(
          t,
          e,
          n,
          i
        );
        break;
      default:
        tn(
          t,
          e,
          n,
          i
        );
    }
  }
  function Na(t, e, n, i, u) {
    for (u = u && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var s = t, f = e, m = n, T = i, C = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          Na(
            s,
            f,
            m,
            T,
            u
          ), Hl(8, f);
          break;
        case 23:
          break;
        case 22:
          var R = f.stateNode;
          f.memoizedState !== null ? R._visibility & 2 ? Na(
            s,
            f,
            m,
            T,
            u
          ) : ql(
            s,
            f
          ) : (R._visibility |= 2, Na(
            s,
            f,
            m,
            T,
            u
          )), u && C & 2048 && oc(
            f.alternate,
            f
          );
          break;
        case 24:
          Na(
            s,
            f,
            m,
            T,
            u
          ), u && C & 2048 && rc(f.alternate, f);
          break;
        default:
          Na(
            s,
            f,
            m,
            T,
            u
          );
      }
      e = e.sibling;
    }
  }
  function ql(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var n = t, i = e, u = i.flags;
        switch (i.tag) {
          case 22:
            ql(n, i), u & 2048 && oc(
              i.alternate,
              i
            );
            break;
          case 24:
            ql(n, i), u & 2048 && rc(i.alternate, i);
            break;
          default:
            ql(n, i);
        }
        e = e.sibling;
      }
  }
  var Ji = 8192;
  function Fi(t, e, n) {
    if (t.subtreeFlags & Ji)
      for (t = t.child; t !== null; )
        Oy(
          t,
          e,
          n
        ), t = t.sibling;
  }
  function Oy(t, e, n) {
    switch (t.tag) {
      case 26:
        Fi(
          t,
          e,
          n
        ), t.flags & Ji && (t.memoizedState !== null ? ob(
          n,
          cn,
          t.memoizedState,
          t.memoizedProps
        ) : (t = t.stateNode, (e & 335544128) === e && wg(n, t)));
        break;
      case 5:
        Fi(
          t,
          e,
          n
        ), t.flags & Ji && (t = t.stateNode, (e & 335544128) === e && wg(n, t));
        break;
      case 3:
      case 4:
        var i = cn;
        cn = Pl(t.stateNode.containerInfo), Fi(
          t,
          e,
          n
        ), cn = i;
        break;
      case 22:
        t.memoizedState === null && (i = t.alternate, i !== null && i.memoizedState !== null ? (i = Ji, Ji = 16777216, Fi(
          t,
          e,
          n
        ), Ji = i) : Fi(
          t,
          e,
          n
        ));
        break;
      case 30:
        if ((t.flags & Ji) !== 0 && (i = t.memoizedProps.name, i != null && i !== "auto")) {
          var u = t.stateNode;
          u.paired = null, Xe === null && (Xe = /* @__PURE__ */ new Map()), Xe.set(i, u);
        }
        Fi(
          t,
          e,
          n
        );
        break;
      default:
        Fi(
          t,
          e,
          n
        );
    }
  }
  function Ry(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function Gl(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          re = i, _y(
            i,
            t
          );
        }
      Ry(t);
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
        Gl(t), t.flags & 2048 && hi(9, t, t.return);
        break;
      case 3:
        Gl(t);
        break;
      case 12:
        Gl(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, As(t)) : Gl(t);
        break;
      default:
        Gl(t);
    }
  }
  function As(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          re = i, _y(
            i,
            t
          );
        }
      Ry(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          hi(8, e, e.return), As(e);
          break;
        case 22:
          n = e.stateNode, n._visibility & 2 && (n._visibility &= -3, As(e));
          break;
        default:
          As(e);
      }
      t = t.sibling;
    }
  }
  function _y(t, e) {
    for (; re !== null; ) {
      var n = re;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          hi(8, n, e);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var i = n.memoizedState.cachePool.pool;
            i != null && i.refCount++;
          }
          break;
        case 24:
          Dl(n.memoizedState.cache);
      }
      if (i = n.child, i !== null) i.return = n, re = i;
      else
        t: for (n = t; re !== null; ) {
          i = re;
          var u = i.sibling, s = i.return;
          if (Ty(i), i === n) {
            re = null;
            break t;
          }
          if (u !== null) {
            u.return = s, re = u;
            break t;
          }
          re = s;
        }
    }
  }
  var iT = {
    getCacheForType: function(t) {
      var e = he(It), n = e.data.get(t);
      return n === void 0 && (n = t(), e.data.set(t, n)), n;
    },
    cacheSignal: function() {
      return he(It).controller.signal;
    }
  }, aT = typeof WeakMap == "function" ? WeakMap : Map, zt = 0, qt = null, Et = null, Mt = 0, Nt = 0, Qe = null, mi = !1, Ua = !1, cc = !1, Kn = 0, Pt = 0, yi = 0, Pi = 0, Ms = 0, Ze = 0, wa = 0, Xl = null, Ue = null, fc = !1, Ds = 0, Vy = 0, Cs = 1 / 0, xs = null, gi = null, Jt = 0, hn = null, ki = null, Cn = 0, hc = 0, dc = null, Ny = null, Ba = null, La = null, Ha = null, Ql = 0, Os = null;
  function Ke() {
    return (zt & 2) !== 0 && Mt !== 0 ? Mt & -Mt : tt.T !== null ? Ac() : Bh();
  }
  function Uy() {
    if (Ze === 0)
      if ((Mt & 536870912) === 0 || vt) {
        var t = Eu;
        Eu <<= 1, (Eu & 3932160) === 0 && (Eu = 262144), Ze = t;
      } else Ze = 536870912;
    return t = de.current, t !== null && (t.flags |= 32), Ze;
  }
  function ja(t, e) {
    if (e != null) {
      var n = t.stateNode, i = n.ref;
      i === null && (i = n.ref = mg(
        Bn(t.memoizedProps, n)
      )), La === null && (La = []), La.push(e.bind(null, i));
    }
  }
  function we(t, e, n) {
    (t === qt && (Nt === 2 || Nt === 9) || t.cancelPendingCommit !== null) && (Ya(t, 0), pi(
      t,
      Mt,
      Ze,
      !1
    )), fl(t, n), ((zt & 2) === 0 || t !== qt) && (t === qt && ((zt & 2) === 0 && (Pi |= n), Pt === 4 && pi(
      t,
      Mt,
      Ze,
      !1
    )), xn(t));
  }
  function wy(t, e, n) {
    if ((zt & 6) !== 0) throw Error(r(327));
    var i = !n && (e & 127) === 0 && (e & t.expiredLanes) === 0 || cl(t, e), u = i ? sT(t, e) : yc(t, e, !0), s = i;
    do {
      if (u === 0) {
        Ua && !i && pi(t, e, 0, !1);
        break;
      } else {
        if (n = t.current.alternate, s && !lT(n)) {
          u = yc(t, e, !1), s = !1;
          continue;
        }
        if (u === 2) {
          if (s = e, t.errorRecoveryDisabledLanes & s)
            var f = 0;
          else
            f = t.pendingLanes & -536870913, f = f !== 0 ? f : f & 536870912 ? 536870912 : 0;
          if (f !== 0) {
            e = f;
            t: {
              var m = t;
              u = Xl;
              var T = m.current.memoizedState.isDehydrated;
              if (T && (Ya(m, f).flags |= 256), f = yc(
                m,
                f,
                !1
              ), f !== 2 && f !== 6) {
                if (cc && !T) {
                  m.errorRecoveryDisabledLanes |= s, Pi |= s, u = 4;
                  break t;
                }
                s = Ue, Ue = u, s !== null && (Ue === null ? Ue = s : Ue.push.apply(
                  Ue,
                  s
                ));
              }
              u = f;
            }
            if (s = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Ya(t, 0), pi(t, e, 0, !0);
          break;
        }
        t: {
          switch (i = t, s = u, s) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((e & 4194048) !== e && (e & 62914560) !== e)
                break;
            case 6:
              pi(
                i,
                e,
                Ze,
                !mi
              );
              break t;
            case 2:
              Ue = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((e & 62914560) === e && (u = Ds + 300 - Le(), 10 < u)) {
            if (pi(
              i,
              e,
              Ze,
              !mi
            ), Mu(i, 0, !0) !== 0) break t;
            Cn = e, i.timeoutHandle = Uc(
              By.bind(
                null,
                i,
                n,
                Ue,
                xs,
                fc,
                e,
                Ze,
                Pi,
                wa,
                mi,
                s,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break t;
          }
          By(
            i,
            n,
            Ue,
            xs,
            fc,
            e,
            Ze,
            Pi,
            wa,
            mi,
            s,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    xn(t);
  }
  function By(t, e, n, i, u, s, f, m, T, C, R, N, M, O) {
    t.timeoutHandle = -1;
    var K = e.subtreeFlags, et = (s & 335544064) === s;
    if (N = null, (et || K & 8192 || (K & 16785408) === 16785408) && (N = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: pn
    }, Xe = null, Oy(
      e,
      s,
      N
    ), et && (K = N, et = t.containerInfo, et = (et.nodeType === 9 ? et : et.ownerDocument).__reactViewTransition, et != null && (K.count++, K.waitingForViewTransition = !0, K = Il.bind(K), et.finished.then(K, K))), K = (s & 62914560) === s ? Ds - Le() : (s & 4194048) === s ? Vy - Le() : 0, K = rb(
      N,
      K
    ), K !== null)) {
      Cn = s, t.cancelPendingCommit = K(
        Qy.bind(
          null,
          t,
          e,
          s,
          n,
          i,
          u,
          f,
          m,
          T,
          C,
          R,
          N,
          null,
          M,
          O
        )
      ), pi(t, s, f, !C);
      return;
    }
    Qy(
      t,
      e,
      s,
      n,
      i,
      u,
      f,
      m,
      T,
      C,
      R,
      N
    );
  }
  function lT(t) {
    for (var e = t; ; ) {
      var n = e.tag;
      if ((n === 0 || n === 11 || n === 15) && e.flags & 16384 && (n = e.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var i = 0; i < n.length; i++) {
          var u = n[i], s = u.getSnapshot;
          u = u.value;
          try {
            if (!qe(s(), u)) return !1;
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
  function pi(t, e, n, i) {
    e = _h(t, e), e &= ~Ms, e &= ~Pi, t.suspendedLanes |= e, t.pingedLanes &= ~e, i && (t.warmLanes |= e), i = t.expirationTimes;
    for (var u = e; 0 < u; ) {
      var s = 31 - je(u), f = 1 << s;
      i[s] = -1, u &= ~f;
    }
    n !== 0 && Nh(t, n, e);
  }
  function Rs() {
    return (zt & 6) === 0 ? (Zl(0), !1) : !0;
  }
  function mc() {
    if (Et !== null) {
      if (Nt === 0)
        var t = Et.return;
      else
        t = Et, Yn = Li = null, Er(t), Ca = null, Ol = 0, t = Et;
      for (; t !== null; )
        ly(t.alternate, t), t = t.return;
      Et = null;
    }
  }
  function Ya(t, e) {
    var n = t.timeoutHandle;
    return n !== -1 && (t.timeoutHandle = -1, RT(n)), n = t.cancelPendingCommit, n !== null && (t.cancelPendingCommit = null, n()), Cn = 0, mc(), qt = t, Et = n = Hn(t.current, null), Mt = e, Nt = 0, Qe = null, mi = !1, Ua = cl(t, e), cc = !1, wa = Ze = Ms = Pi = yi = Pt = 0, Ue = Xl = null, fc = !1, Kn = _h(t, e), Lu(), n;
  }
  function Ly(t, e) {
    mt = null, tt.H = os, e === Da || e === Fu ? (e = Qd(), Nt = 3) : e === rr ? (e = Qd(), Nt = 4) : Nt = e === Lr ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, Qe = e, Et === null && (Pt = 1, rs(
      t,
      ke(e, t.current)
    ));
  }
  function Hy() {
    var t = de.current;
    return t === null ? !0 : (Mt & 4194048) === Mt ? Te === null : (Mt & 62914560) === Mt || (Mt & 536870912) !== 0 ? t === Te : !1;
  }
  function jy() {
    var t = tt.H;
    return tt.H = os, t === null ? os : t;
  }
  function Yy() {
    var t = tt.A;
    return tt.A = iT, t;
  }
  function zs() {
    Pt = 4, mi || (Mt & 4194048) !== Mt && de.current !== null || (Ua = !0), (yi & 134217727) === 0 && (Pi & 134217727) === 0 || qt === null || pi(
      qt,
      Mt,
      Ze,
      !1
    );
  }
  function yc(t, e, n) {
    var i = zt;
    zt |= 2;
    var u = jy(), s = Yy();
    (qt !== t || Mt !== e) && (xs = null, Ya(t, e)), e = !1;
    var f = Pt;
    t: do
      try {
        if (Nt !== 0 && Et !== null) {
          var m = Et, T = Qe;
          switch (Nt) {
            case 8:
              mc(), f = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              de.current === null && (e = !0);
              var C = Nt;
              if (Nt = 0, Qe = null, qa(t, m, T, C), n && Ua) {
                f = 0;
                break t;
              }
              break;
            default:
              C = Nt, Nt = 0, Qe = null, qa(t, m, T, C);
          }
        }
        uT(), f = Pt;
        break;
      } catch (R) {
        Ly(t, R);
      }
    while (!0);
    return e && t.shellSuspendCounter++, Yn = Li = null, zt = i, tt.H = u, tt.A = s, Et === null && (qt = null, Mt = 0, Lu()), f;
  }
  function uT() {
    for (; Et !== null; ) qy(Et);
  }
  function sT(t, e) {
    var n = zt;
    zt |= 2;
    var i = jy(), u = Yy();
    qt !== t || Mt !== e ? (xs = null, Cs = Le() + 500, Ya(t, e)) : Ua = cl(
      t,
      e
    );
    t: do
      try {
        if (Nt !== 0 && Et !== null) {
          e = Et;
          var s = Qe;
          e: switch (Nt) {
            case 1:
              Nt = 0, Qe = null, qa(t, e, s, 1);
              break;
            case 2:
            case 9:
              if (Gd(s)) {
                Nt = 0, Qe = null, Gy(e);
                break;
              }
              e = function() {
                Nt !== 2 && Nt !== 9 || qt !== t || (Nt = 7), xn(t);
              }, s.then(e, e);
              break t;
            case 3:
              Nt = 7;
              break t;
            case 4:
              Nt = 5;
              break t;
            case 7:
              Gd(s) ? (Nt = 0, Qe = null, Gy(e)) : (Nt = 0, Qe = null, qa(t, e, s, 7));
              break;
            case 5:
              var f = null;
              switch (Et.tag) {
                case 26:
                  f = Et.memoizedState;
                case 5:
                case 27:
                  var m = Et;
                  if (f ? Ng(f) : m.stateNode.complete) {
                    Nt = 0, Qe = null;
                    var T = m.sibling;
                    if (T !== null) Et = T;
                    else {
                      var C = m.return;
                      C !== null ? (Et = C, _s(C)) : Et = null;
                    }
                    break e;
                  }
              }
              Nt = 0, Qe = null, qa(t, e, s, 5);
              break;
            case 6:
              Nt = 0, Qe = null, qa(t, e, s, 6);
              break;
            case 8:
              mc(), Pt = 6;
              break t;
            default:
              throw Error(r(462));
          }
        }
        oT();
        break;
      } catch (R) {
        Ly(t, R);
      }
    while (!0);
    return Yn = Li = null, tt.H = i, tt.A = u, zt = n, Et !== null ? 0 : (qt = null, Mt = 0, Lu(), Pt);
  }
  function oT() {
    for (; Et !== null && !D1(); )
      qy(Et);
  }
  function qy(t) {
    var e = iy(t.alternate, t, Kn);
    t.memoizedProps = t.pendingProps, e === null ? _s(t) : Et = e;
  }
  function Gy(t) {
    var e = t, n = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = km(
          n,
          e,
          e.pendingProps,
          e.type,
          void 0,
          Mt
        );
        break;
      case 11:
        e = km(
          n,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          Mt
        );
        break;
      case 5:
        Er(e);
        var i = e;
        i === se && (vt ? (Xu(i), i.tag === 5 && i.stateNode != null && (Gt = i.stateNode)) : (Xu(i), vt = !0));
      default:
        ly(n, e), e = Et = _d(e, Kn), e = iy(n, e, Kn);
    }
    t.memoizedProps = t.pendingProps, e === null ? _s(t) : Et = e;
  }
  function qa(t, e, n, i) {
    Yn = Li = null, Er(e), Ca = null, Ol = 0;
    var u = e.return;
    try {
      if (PS(
        t,
        u,
        e,
        n,
        Mt
      )) {
        Pt = 1, rs(
          t,
          ke(n, t.current)
        ), Et = null;
        return;
      }
    } catch (s) {
      if (u !== null) throw Et = u, s;
      Pt = 1, rs(
        t,
        ke(n, t.current)
      ), Et = null;
      return;
    }
    e.flags & 32768 ? (vt || i === 1 ? t = !0 : Ua || (Mt & 536870912) !== 0 ? t = !1 : (mi = t = !0, (i === 2 || i === 9 || i === 3 || i === 6) && (i = de.current, i !== null && i.tag === 13 && (i.flags |= 16384))), Xy(e, t)) : _s(e);
  }
  function _s(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Xy(
          e,
          mi
        );
        return;
      }
      t = e.return;
      var n = $S(
        e.alternate,
        e,
        Kn
      );
      if (n !== null) {
        Et = n;
        return;
      }
      if (e = e.sibling, e !== null) {
        Et = e;
        return;
      }
      Et = e = t;
    } while (e !== null);
    Pt === 0 && (Pt = 5);
  }
  function Xy(t, e) {
    do {
      var n = tT(t.alternate, t);
      if (n !== null) {
        n.flags &= 32767, Et = n;
        return;
      }
      if (n = t.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !e && (t = t.sibling, t !== null)) {
        Et = t;
        return;
      }
      Et = t = n;
    } while (t !== null);
    Pt = 6, Et = null;
  }
  function Qy(t, e, n, i, u, s, f, m, T, C, R, N) {
    t.cancelPendingCommit = null;
    do
      Vs();
    while (Jt !== 0);
    if ((zt & 6) !== 0) throw Error(r(327));
    if (e !== null) {
      if (e === t.current) throw Error(r(177));
      t === qt && (Et = qt = null, Mt = 0), ki = e, hn = t, Cn = n, dc = u, Ny = i, rT(
        t,
        e,
        n,
        f,
        m,
        T,
        N
      );
    }
  }
  function rT(t, e, n, i, u, s, f) {
    var m = e.lanes | e.childLanes;
    if (hc = m, m |= ko, w1(
      t,
      n,
      m,
      i,
      u,
      s
    ), La = null, (n & 335544064) === n ? (Ha = LS(t), i = 10262) : (Ha = null, i = 10256), (e.subtreeFlags & i) !== 0 || (e.flags & i) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, yT(Tu, function() {
      return Sc(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), ps = !1, i = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || i) {
      i = tt.T, tt.T = null, u = lt.p, lt.p = 2, s = zt, zt |= 4;
      try {
        eT(t, e, n);
      } finally {
        zt = s, lt.p = u, tt.T = i;
      }
    }
    Jt = 1, ps ? Ba = wT(
      f,
      t.containerInfo,
      Ha,
      gc,
      pc,
      fT,
      vc,
      Sc,
      cT
    ) : (gc(), pc(), vc());
  }
  function cT(t) {
    if (Jt !== 0) {
      var e = hn.onRecoverableError;
      e(t, { componentStack: null });
    }
  }
  function fT() {
    Jt === 3 && (Jt = 0, Cy(ki, hn), Jt = 4);
  }
  function gc() {
    if (Jt === 1) {
      Jt = 0;
      var t = hn, e = ki, n = Cn, i = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || i) {
        i = tt.T, tt.T = null;
        var u = lt.p;
        lt.p = 2;
        var s = zt;
        zt |= 4;
        try {
          Yl = Ts = !1, My(e, t, n), n = _c;
          var f = bd(t.containerInfo), m = n.focusedElem, T = n.selectionRange;
          if (f !== m && m && m.ownerDocument && Td(
            m.ownerDocument.documentElement,
            m
          )) {
            if (T !== null && Zo(m)) {
              var C = T.start, R = T.end;
              if (R === void 0 && (R = C), "selectionStart" in m)
                m.selectionStart = C, m.selectionEnd = Math.min(
                  R,
                  m.value.length
                );
              else {
                var N = m.ownerDocument || document, M = N && N.defaultView || window;
                if (M.getSelection) {
                  var O = M.getSelection(), K = m.textContent.length, et = Math.min(T.start, K), yt = T.end === void 0 ? et : Math.min(T.end, K);
                  !O.extend && et > yt && (f = yt, yt = et, et = f);
                  var D = Sd(
                    m,
                    et
                  ), E = Sd(
                    m,
                    yt
                  );
                  if (D && E && (O.rangeCount !== 1 || O.anchorNode !== D.node || O.anchorOffset !== D.offset || O.focusNode !== E.node || O.focusOffset !== E.offset)) {
                    var x = N.createRange();
                    x.setStart(D.node, D.offset), O.removeAllRanges(), et > yt ? (O.addRange(x), O.extend(E.node, E.offset)) : (x.setEnd(E.node, E.offset), O.addRange(x));
                  }
                }
              }
            }
            for (N = [], O = m; O = O.parentNode; )
              O.nodeType === 1 && N.push({
                element: O,
                left: O.scrollLeft,
                top: O.scrollTop
              });
            for (typeof m.focus == "function" && m.focus(), m = 0; m < N.length; m++) {
              var V = N[m];
              V.element.scrollLeft = V.left, V.element.scrollTop = V.top;
            }
          }
          Pa = !!zc, _c = zc = null;
        } finally {
          zt = s, lt.p = u, tt.T = i;
        }
      }
      t.current = e, Jt = 2;
    }
  }
  function pc() {
    if (Jt === 2) {
      Jt = 0;
      var t = hn, e = ki, n = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || n) {
        n = tt.T, tt.T = null;
        var i = lt.p;
        lt.p = 2;
        var u = zt;
        zt |= 4;
        try {
          vy(t, e.alternate, e);
        } finally {
          zt = u, lt.p = i, tt.T = n;
        }
      }
      Jt = 3;
    }
  }
  function vc() {
    if (Jt === 4 || Jt === 3) {
      Jt = 0;
      var t = Ba;
      Ba = null, C1();
      var e = hn, n = ki, i = Cn, u = Ny, s = (i & 335544064) === i ? 10262 : 10256;
      if ((n.subtreeFlags & s) !== 0 || (n.flags & s) !== 0 ? Jt = 5 : (Jt = 0, ki = hn = null, Zy(e, e.pendingLanes)), s = e.pendingLanes, s === 0 && (gi = null), xo(i), n = n.stateNode, He && typeof He.onCommitFiberRoot == "function")
        try {
          He.onCommitFiberRoot(
            rl,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (u !== null) {
        n = tt.T, s = lt.p, lt.p = 2, tt.T = null;
        try {
          for (var f = e.onRecoverableError, m = 0; m < u.length; m++) {
            var T = u[m];
            f(T.value, {
              componentStack: T.stack
            });
          }
        } finally {
          tt.T = n, lt.p = s;
        }
      }
      if (u = La, f = Ha, Ha = null, u !== null && (La = null, f === null && (f = []), t !== null))
        for (T = 0; T < u.length; T++)
          n = (0, u[T])(
            f
          ), n !== void 0 && t.finished.finally(n);
      (Cn & 3) !== 0 && Vs(), xn(e), s = e.pendingLanes, (i & 261930) !== 0 && (s & 42) !== 0 ? e === Os ? Ql++ : (Ql = 0, Os = e) : (Ql = 0, Os = null), Zl(0);
    }
  }
  function Zy(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, Dl(e)));
  }
  function Vs() {
    return Ba !== null && (Ba.skipTransition(), Ba = null), gc(), pc(), vc(), Sc();
  }
  function Sc() {
    if (Jt !== 5) return !1;
    var t = hn, e = hc;
    hc = 0;
    var n = xo(Cn), i = tt.T, u = lt.p;
    try {
      lt.p = 32 > n ? 32 : n, tt.T = null, n = dc, dc = null;
      var s = hn, f = Cn;
      if (Jt = 0, ki = hn = null, Cn = 0, (zt & 6) !== 0) throw Error(r(331));
      var m = zt;
      if (zt |= 4, zy(s.current), xy(
        s,
        s.current,
        f,
        n
      ), zt = m, Zl(0, !1), He && typeof He.onPostCommitFiberRoot == "function")
        try {
          He.onPostCommitFiberRoot(rl, s);
        } catch {
        }
      return !0;
    } finally {
      lt.p = u, tt.T = i, Zy(t, e);
    }
  }
  function Ky(t, e, n) {
    e = ke(n, e), e = Br(t.stateNode, e, 2), t = oi(t, e, 2), t !== null && (fl(t, 2), xn(t));
  }
  function Ut(t, e, n) {
    if (t.tag === 3)
      Ky(t, t, n);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          Ky(
            e,
            t,
            n
          );
          break;
        } else if (e.tag === 1) {
          var i = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (gi === null || !gi.has(i))) {
            t = ke(n, t), n = Gm(2), i = oi(e, n, 2), i !== null && (Xm(
              n,
              i,
              e,
              t
            ), fl(i, 2), xn(i));
            break;
          }
        }
        e = e.return;
      }
  }
  function Tc(t, e, n) {
    var i = t.pingCache;
    if (i === null) {
      i = t.pingCache = new aT();
      var u = /* @__PURE__ */ new Set();
      i.set(e, u);
    } else
      u = i.get(e), u === void 0 && (u = /* @__PURE__ */ new Set(), i.set(e, u));
    u.has(n) || (cc = !0, u.add(n), t = hT.bind(null, t, e, n), e.then(t, t));
  }
  function hT(t, e, n) {
    var i = t.pingCache;
    i !== null && i.delete(e), t.pingedLanes |= t.suspendedLanes & n, t.warmLanes &= ~n, qt === t && (Mt & n) === n && ((Pt === 4 || Pt === 3 && (Mt & 62914560) === Mt && 300 > Le() - Ds) && (zt & 2) === 0 ? Ya(t, 0) : Ms |= n, wa === Mt && (wa = 0)), xn(t);
  }
  function Jy(t, e) {
    e === 0 && (e = Vh()), t = Ui(t, e), t !== null && (fl(t, e), xn(t));
  }
  function dT(t) {
    var e = t.memoizedState, n = 0;
    e !== null && (n = e.retryLane), Jy(t, n);
  }
  function mT(t, e) {
    var n = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var i = t.stateNode, u = t.memoizedState;
        u !== null && (n = u.retryLane);
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
    i !== null && i.delete(e), Jy(t, n);
  }
  function yT(t, e) {
    return Ao(t, e);
  }
  var Ga = null, Xa = null, bc = !1, Ns = !1, Ec = !1, vi = 0;
  function xn(t) {
    t !== Xa && t.next === null && (Xa === null ? Ga = Xa = t : Xa = Xa.next = t), Ns = !0, bc || (bc = !0, pT());
  }
  function Zl(t, e) {
    if (!Ec && Ns) {
      Ec = !0;
      do
        for (var n = !1, i = Ga; i !== null; ) {
          if (t !== 0) {
            var u = i.pendingLanes;
            if (u === 0) var s = 0;
            else {
              var f = i.suspendedLanes, m = i.pingedLanes;
              s = (1 << 31 - je(42 | t) + 1) - 1, s &= u & ~(f & ~m), s = s & 201326741 ? s & 201326741 | 1 : s ? s | 2 : 0;
            }
            s !== 0 && (n = !0, Wy(i, s));
          } else
            s = Mt, s = Mu(
              i,
              i === qt ? s : 0,
              i.cancelPendingCommit !== null || i.timeoutHandle !== -1
            ), (s & 3) === 0 || cl(i, s) || (n = !0, Wy(i, s));
          i = i.next;
        }
      while (n);
      Ec = !1;
    }
  }
  function gT() {
    Fy();
  }
  function Fy() {
    Ns = bc = !1;
    var t = 0;
    vi !== 0 && OT() && (t = vi);
    for (var e = Le(), n = null, i = Ga; i !== null; ) {
      var u = i.next, s = Py(i, e);
      s === 0 ? (i.next = null, n === null ? Ga = u : n.next = u, u === null && (Xa = n)) : (n = i, (t !== 0 || (s & 3) !== 0) && (Ns = !0)), i = u;
    }
    Jt !== 0 && Jt !== 5 || Zl(t), vi !== 0 && (vi = 0);
  }
  function Py(t, e) {
    for (var n = t.suspendedLanes, i = t.pingedLanes, u = t.expirationTimes, s = t.pendingLanes & -62914561; 0 < s; ) {
      var f = 31 - je(s), m = 1 << f, T = u[f];
      T === -1 ? ((m & n) === 0 || (m & i) !== 0) && (u[f] = U1(m, e)) : T <= e && (t.expiredLanes |= m), s &= ~m;
    }
    if (e = qt, n = Mt, n = Mu(
      t,
      t === e ? n : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), i = t.callbackNode, n === 0 || t === e && (Nt === 2 || Nt === 9) || t.cancelPendingCommit !== null)
      return i !== null && i !== null && Mo(i), t.callbackNode = null, t.callbackPriority = 0;
    if ((n & 3) === 0 || cl(t, n)) {
      if (e = n & -n, e === t.callbackPriority) return e;
      switch (i !== null && Mo(i), xo(n)) {
        case 2:
        case 8:
          n = Rh;
          break;
        case 32:
          n = Tu;
          break;
        case 268435456:
          n = zh;
          break;
        default:
          n = Tu;
      }
      return i = ky.bind(null, t), n = Ao(n, i), t.callbackPriority = e, t.callbackNode = n, e;
    }
    return i !== null && i !== null && Mo(i), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function ky(t, e) {
    if (Jt !== 0 && Jt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var n = t.callbackNode;
    if (Vs() && t.callbackNode !== n)
      return null;
    var i = Mt;
    return i = Mu(
      t,
      t === qt ? i : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), i === 0 ? null : (wy(t, i, e), Py(t, Le()), t.callbackNode != null && t.callbackNode === n ? ky.bind(null, t) : null);
  }
  function Wy(t, e) {
    if (Vs()) return null;
    wy(t, e, !0);
  }
  function pT() {
    zT(function() {
      (zt & 6) !== 0 ? Ao(
        Oh,
        gT
      ) : Fy();
    });
  }
  function Ac() {
    if (vi === 0) {
      var t = Yi;
      t === 0 && (t = bu, bu <<= 1, (bu & 261888) === 0 && (bu = 256)), vi = t;
    }
    return vi;
  }
  function Iy(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Ru(t);
  }
  function vT(t, e, n, i, u) {
    if (e === "submit" && n && n.stateNode === u) {
      var s = Iy(
        (u[ze] || null).action
      ), f = i.submitter;
      f && (e = (e = f[ze] || null) ? Iy(e.formAction) : f.getAttribute("formAction"), e !== null && (s = e, f = null));
      var m = new Nu(
        "action",
        "action",
        null,
        i,
        u
      );
      t.push({
        event: m,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (i.defaultPrevented) {
                if (vi !== 0) {
                  var T = new FormData(u, f);
                  _r(
                    n,
                    {
                      pending: !0,
                      data: T,
                      method: u.method,
                      action: s
                    },
                    null,
                    T
                  );
                }
              } else
                typeof s == "function" && (m.preventDefault(), T = new FormData(u, f), _r(
                  n,
                  {
                    pending: !0,
                    data: T,
                    method: u.method,
                    action: s
                  },
                  s,
                  T
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var Mc = 0; Mc < Po.length; Mc++) {
    var Dc = Po[Mc], ST = Dc.toLowerCase(), TT = Dc[0].toUpperCase() + Dc.slice(1);
    on(
      ST,
      "on" + TT
    );
  }
  on(Md, "onAnimationEnd"), on(Dd, "onAnimationIteration"), on(Cd, "onAnimationStart"), on("dblclick", "onDoubleClick"), on("focusin", "onFocus"), on("focusout", "onBlur"), on(RS, "onTransitionRun"), on(zS, "onTransitionStart"), on(_S, "onTransitionCancel"), on(xd, "onTransitionEnd"), fa("onMouseEnter", ["mouseout", "mouseover"]), fa("onMouseLeave", ["mouseout", "mouseover"]), fa("onPointerEnter", ["pointerout", "pointerover"]), fa("onPointerLeave", ["pointerout", "pointerover"]), _i(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), _i(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), _i("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), _i(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), _i(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), _i(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Kl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), bT = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Kl)
  );
  function $y(t, e) {
    e = (e & 4) !== 0;
    for (var n = 0; n < t.length; n++) {
      var i = t[n], u = i.event;
      i = i.listeners;
      t: {
        var s = void 0;
        if (e)
          for (var f = i.length - 1; 0 <= f; f--) {
            var m = i[f], T = m.instance, C = m.currentTarget;
            if (m = m.listener, T !== s && u.isPropagationStopped())
              break t;
            s = m, u.currentTarget = C;
            try {
              s(u);
            } catch (R) {
              Bu(R);
            }
            u.currentTarget = null, s = T;
          }
        else
          for (f = 0; f < i.length; f++) {
            if (m = i[f], T = m.instance, C = m.currentTarget, m = m.listener, T !== s && u.isPropagationStopped())
              break t;
            s = m, u.currentTarget = C;
            try {
              s(u);
            } catch (R) {
              Bu(R);
            }
            u.currentTarget = null, s = T;
          }
      }
    }
  }
  function At(t, e) {
    var n = e[Hh];
    n === void 0 && (n = e[Hh] = /* @__PURE__ */ new Set());
    var i = t + "__bubble";
    n.has(i) || (tg(e, t, 2, !1), n.add(i));
  }
  function Cc(t, e, n) {
    var i = 0;
    e && (i |= 4), tg(
      n,
      t,
      i,
      e
    );
  }
  var Us = "_reactListening" + Math.random().toString(36).slice(2);
  function xc(t) {
    if (!t[Us]) {
      t[Us] = !0, qh.forEach(function(n) {
        n !== "selectionchange" && (bT.has(n) || Cc(n, !1, t), Cc(n, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[Us] || (e[Us] = !0, Cc("selectionchange", !1, e));
    }
  }
  function tg(t, e, n, i) {
    switch (Xg(e)) {
      case 2:
        var u = db;
        break;
      case 8:
        u = mb;
        break;
      default:
        u = Jc;
    }
    n = u.bind(
      null,
      e,
      n,
      t
    ), u = void 0, !wo || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (u = !0), i ? u !== void 0 ? t.addEventListener(e, n, {
      capture: !0,
      passive: u
    }) : t.addEventListener(e, n, !0) : u !== void 0 ? t.addEventListener(e, n, {
      passive: u
    }) : t.addEventListener(e, n, !1);
  }
  function Oc(t, e, n, i, u) {
    var s = i;
    if ((e & 1) === 0 && (e & 2) === 0 && i !== null)
      t: for (; ; ) {
        if (i === null) return;
        var f = i.tag;
        if (f === 3 || f === 4) {
          var m = i.stateNode.containerInfo;
          if (m === u) break;
          if (f === 4)
            for (f = i.return; f !== null; ) {
              var T = f.tag;
              if ((T === 3 || T === 4) && f.stateNode.containerInfo === u)
                return;
              f = f.return;
            }
          for (; m !== null; ) {
            if (f = zi(m), f === null) return;
            if (T = f.tag, T === 5 || T === 6 || T === 26 || T === 27) {
              i = s = f;
              continue t;
            }
            m = m.parentNode;
          }
        }
        i = i.return;
      }
    td(function() {
      var C = s, R = No(n), N = [];
      t: {
        var M = Od.get(t);
        if (M !== void 0) {
          var O = Nu, K = t;
          switch (t) {
            case "keypress":
              if (_u(n) === 0) break t;
            case "keydown":
            case "keyup":
              O = lS;
              break;
            case "focusin":
              K = "focus", O = jo;
              break;
            case "focusout":
              K = "blur", O = jo;
              break;
            case "beforeblur":
            case "afterblur":
              O = jo;
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
              O = id;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              O = J1;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              O = cS;
              break;
            case Md:
            case Dd:
            case Cd:
              O = k1;
              break;
            case xd:
              O = hS;
              break;
            case "scroll":
            case "scrollend":
              O = Z1;
              break;
            case "wheel":
              O = mS;
              break;
            case "copy":
            case "cut":
            case "paste":
              O = I1;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              O = ld;
              break;
            case "submit":
              O = oS;
              break;
            case "toggle":
            case "beforetoggle":
              O = gS;
          }
          var et = (e & 4) !== 0, yt = !et && (t === "scroll" || t === "scrollend"), D = et ? M !== null ? M + "Capture" : null : M;
          et = [];
          for (var E = C, x; E !== null; ) {
            var V = E;
            if (x = V.stateNode, V = V.tag, V !== 5 && V !== 26 && V !== 27 || x === null || D === null || (V = ml(E, D), V != null && et.push(
              Jl(E, V, x)
            )), yt) break;
            E = E.return;
          }
          0 < et.length && (M = new O(
            M,
            K,
            null,
            n,
            R
          ), N.push({ event: M, listeners: et }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (O = t === "mouseover" || t === "pointerover", M = t === "mouseout" || t === "pointerout", O && n !== Vo && (K = n.relatedTarget || n.fromElement) && (zi(K) || K[oa]))
            break t;
          (M || O) && (K = R.window === R ? R : (O = R.ownerDocument) ? O.defaultView || O.parentWindow : window, M ? (O = n.relatedTarget || n.toElement, M = C, O = O ? zi(O) : null, O !== null && (yt = d(O), et = O.tag, O !== yt || et !== 5 && et !== 27 && et !== 6) && (O = null)) : (M = null, O = C), M !== O && (et = id, V = "onMouseLeave", D = "onMouseEnter", E = "mouse", (t === "pointerout" || t === "pointerover") && (et = ld, V = "onPointerLeave", D = "onPointerEnter", E = "pointer"), yt = M == null ? K : dl(M), x = O == null ? K : dl(O), K = new et(
            V,
            E + "leave",
            M,
            n,
            R
          ), K.target = yt, K.relatedTarget = x, V = null, zi(R) === C && (et = new et(
            D,
            E + "enter",
            O,
            n,
            R
          ), et.target = x, et.relatedTarget = yt, V = et), yt = V, et = M && O ? ot(
            M,
            O,
            ET
          ) : null, M !== null && eg(
            N,
            K,
            M,
            et,
            !1
          ), O !== null && yt !== null && eg(
            N,
            yt,
            O,
            et,
            !0
          )));
        }
        t: {
          if (M = C ? dl(C) : window, O = M.nodeName && M.nodeName.toLowerCase(), O === "select" || O === "input" && M.type === "file")
            var P = dd;
          else if (fd(M))
            if (md)
              P = CS;
            else {
              P = MS;
              var Dt = AS;
            }
          else
            O = M.nodeName, !O || O.toLowerCase() !== "input" || M.type !== "checkbox" && M.type !== "radio" ? C && _o(C.elementType) && (P = dd) : P = DS;
          if (P && (P = P(t, C))) {
            hd(
              N,
              P,
              n,
              R
            );
            break t;
          }
          Dt && Dt(t, M, C);
        }
        switch (Dt = C ? dl(C) : window, t) {
          case "focusin":
            (fd(Dt) || Dt.contentEditable === "true") && (pa = Dt, Ko = C, El = null);
            break;
          case "focusout":
            El = Ko = pa = null;
            break;
          case "mousedown":
            Jo = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Jo = !1, Ed(N, n, R);
            break;
          case "selectionchange":
            if (OS) break;
          case "keydown":
          case "keyup":
            Ed(N, n, R);
        }
        var ut;
        if (qo)
          t: {
            switch (t) {
              case "compositionstart":
                var rt = "onCompositionStart";
                break t;
              case "compositionend":
                rt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                rt = "onCompositionUpdate";
                break t;
            }
            rt = void 0;
          }
        else
          ga ? rd(t, n) && (rt = "onCompositionEnd") : t === "keydown" && n.keyCode === 229 && (rt = "onCompositionStart");
        rt && (ud && n.locale !== "ko" && (ga || rt !== "onCompositionStart" ? rt === "onCompositionEnd" && ga && (ut = ed()) : ($n = R, Bo = "value" in $n ? $n.value : $n.textContent, ga = !0)), Dt = ws(C, rt), 0 < Dt.length && (rt = new ad(
          rt,
          t,
          null,
          n,
          R
        ), N.push({ event: rt, listeners: Dt }), ut ? rt.data = ut : (ut = cd(n), ut !== null && (rt.data = ut)))), (ut = vS ? SS(t, n) : TS(t, n)) && (rt = ws(C, "onBeforeInput"), 0 < rt.length && (Dt = new ad(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          R
        ), N.push({
          event: Dt,
          listeners: rt
        }), Dt.data = ut)), vT(
          N,
          t,
          C,
          n,
          R
        );
      }
      $y(N, e);
    });
  }
  function Jl(t, e, n) {
    return {
      instance: t,
      listener: e,
      currentTarget: n
    };
  }
  function ws(t, e) {
    for (var n = e + "Capture", i = []; t !== null; ) {
      var u = t, s = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || s === null || (u = ml(t, n), u != null && i.unshift(
        Jl(t, u, s)
      ), u = ml(t, e), u != null && i.push(
        Jl(t, u, s)
      )), t.tag === 3) return i;
      t = t.return;
    }
    return [];
  }
  function ET(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function eg(t, e, n, i, u) {
    for (var s = e._reactName, f = []; n !== null && n !== i; ) {
      var m = n, T = m.alternate, C = m.stateNode;
      if (m = m.tag, T !== null && T === i) break;
      m !== 5 && m !== 26 && m !== 27 || C === null || (T = C, u ? (C = ml(n, s), C != null && f.unshift(
        Jl(n, C, T)
      )) : u || (C = ml(n, s), C != null && f.push(
        Jl(n, C, T)
      ))), n = n.return;
    }
    f.length !== 0 && t.push({ event: e, listeners: f });
  }
  var AT = /\r\n?/g, MT = /\u0000|\uFFFD/g;
  function ng(t) {
    return (typeof t == "string" ? t : "" + t).replace(AT, `
`).replace(MT, "");
  }
  function ig(t, e) {
    return e = ng(e), ng(t) === e;
  }
  function wt(t, e, n, i, u, s) {
    switch (n) {
      case "children":
        if (typeof i == "string")
          e === "body" || e === "textarea" && i === "" || da(t, i);
        else if (typeof i == "number" || typeof i == "bigint")
          e !== "body" && da(t, "" + i);
        else return;
        break;
      case "className":
        Ou(t, "class", i);
        break;
      case "tabIndex":
        Ou(t, "tabindex", i);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ou(t, n, i);
        break;
      case "style":
        Ih(t, i, s);
        return;
      case "data":
        if (e !== "object") {
          Ou(t, "data", i);
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
        i = Ru(i), t.setAttribute(n, i);
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
          typeof s == "function" && (n === "formAction" ? (e !== "input" && wt(t, e, "name", u.name, u, null), wt(
            t,
            e,
            "formEncType",
            u.formEncType,
            u,
            null
          ), wt(
            t,
            e,
            "formMethod",
            u.formMethod,
            u,
            null
          ), wt(
            t,
            e,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (wt(t, e, "encType", u.encType, u, null), wt(t, e, "method", u.method, u, null), wt(t, e, "target", u.target, u, null)));
        if (i == null || typeof i == "symbol" || typeof i == "boolean") {
          t.removeAttribute(n);
          break;
        }
        i = Ru(i), t.setAttribute(n, i);
        break;
      case "onClick":
        i != null && (t.onclick = pn);
        return;
      case "onScroll":
        i != null && At("scroll", t);
        return;
      case "onScrollEnd":
        i != null && At("scrollend", t);
        return;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(r(61));
          if (n = i.__html, n != null) {
            if (u.children != null) throw Error(r(60));
            s?.__html !== n && (t.innerHTML = n);
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
        n = Ru(i), t.setAttributeNS(
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
        At("beforetoggle", t), At("toggle", t), xu(t, "popover", i);
        break;
      case "xlinkActuate":
        Un(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          i
        );
        break;
      case "xlinkArcrole":
        Un(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          i
        );
        break;
      case "xlinkRole":
        Un(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          i
        );
        break;
      case "xlinkShow":
        Un(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          i
        );
        break;
      case "xlinkTitle":
        Un(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          i
        );
        break;
      case "xlinkType":
        Un(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          i
        );
        break;
      case "xmlBase":
        Un(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          i
        );
        break;
      case "xmlLang":
        Un(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          i
        );
        break;
      case "xmlSpace":
        Un(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          i
        );
        break;
      case "is":
        xu(t, "is", i);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N")
          n = X1.get(n) || n, xu(t, n, i);
        else return;
    }
    Rt = !0;
  }
  function Rc(t, e, n, i, u, s) {
    switch (n) {
      case "style":
        Ih(t, i, s);
        return;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(r(61));
          if (n = i.__html, n != null) {
            if (u.children != null) throw Error(r(60));
            s?.__html !== n && (t.innerHTML = n);
          }
        }
        break;
      case "children":
        if (typeof i == "string") da(t, i);
        else if (typeof i == "number" || typeof i == "bigint")
          da(t, "" + i);
        else return;
        break;
      case "onScroll":
        i != null && At("scroll", t);
        return;
      case "onScrollEnd":
        i != null && At("scrollend", t);
        return;
      case "onClick":
        i != null && (t.onclick = pn);
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
        if (!Gh.hasOwnProperty(n))
          t: {
            if (n[0] === "o" && n[1] === "n" && (u = n.endsWith("Capture"), s = n.slice(2, u ? n.length - 7 : void 0), e = t[ze] || null, e = e != null ? e[n] : null, typeof e == "function" && t.removeEventListener(s, e, u), typeof i == "function")) {
              typeof e != "function" && e !== null && (n in t ? t[n] = null : t.hasAttribute(n) && t.removeAttribute(n)), t.addEventListener(s, i, u);
              break t;
            }
            Rt = !0, n in t ? t[n] = i : i === !0 ? t.setAttribute(n, "") : xu(t, n, i);
          }
        return;
    }
    Rt = !0;
  }
  function ge(t, e, n) {
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
        At("error", t), At("load", t);
        var i = !1, u = !1, s;
        for (s in n)
          if (n.hasOwnProperty(s)) {
            var f = n[s];
            if (f != null)
              switch (s) {
                case "src":
                  i = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, e));
                default:
                  wt(t, e, s, f, n, null);
              }
          }
        u && wt(t, e, "srcSet", n.srcSet, n, null), i && wt(t, e, "src", n.src, n, null);
        return;
      case "input":
        At("invalid", t);
        var m = s = f = u = null, T = null, C = null;
        for (i in n)
          if (n.hasOwnProperty(i)) {
            var R = n[i];
            if (R != null)
              switch (i) {
                case "name":
                  u = R;
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
                  s = R;
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
                  wt(t, e, i, R, n, null);
              }
          }
        Fh(
          t,
          s,
          m,
          T,
          C,
          f,
          u,
          !1
        );
        return;
      case "select":
        At("invalid", t), i = f = s = null;
        for (u in n)
          if (n.hasOwnProperty(u) && (m = n[u], m != null))
            switch (u) {
              case "value":
                s = m;
                break;
              case "defaultValue":
                f = m;
                break;
              case "multiple":
                i = m;
              default:
                wt(t, e, u, m, n, null);
            }
        e = s, n = f, t.multiple = !!i, e != null ? ha(t, !!i, e, !1) : n != null && ha(t, !!i, n, !0);
        return;
      case "textarea":
        At("invalid", t), s = u = i = null;
        for (f in n)
          if (n.hasOwnProperty(f) && (m = n[f], m != null))
            switch (f) {
              case "value":
                i = m;
                break;
              case "defaultValue":
                u = m;
                break;
              case "children":
                s = m;
                break;
              case "dangerouslySetInnerHTML":
                if (m != null) throw Error(r(91));
                break;
              default:
                wt(t, e, f, m, n, null);
            }
        kh(t, i, u, s);
        return;
      case "option":
        for (T in n)
          n.hasOwnProperty(T) && (i = n[T], i != null) && (T === "selected" ? t.selected = i && typeof i != "function" && typeof i != "symbol" : wt(t, e, T, i, n, null));
        return;
      case "dialog":
        At("beforetoggle", t), At("toggle", t), At("cancel", t), At("close", t);
        break;
      case "iframe":
      case "object":
        At("load", t);
        break;
      case "video":
      case "audio":
        for (i = 0; i < Kl.length; i++)
          At(Kl[i], t);
        break;
      case "image":
        At("error", t), At("load", t);
        break;
      case "details":
        At("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        At("error", t), At("load", t);
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
                wt(t, e, C, i, n, null);
            }
        return;
      default:
        if (_o(e)) {
          for (R in n)
            n.hasOwnProperty(R) && (i = n[R], i !== void 0 && Rc(
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
      n.hasOwnProperty(m) && (i = n[m], i != null && wt(t, e, m, i, n, null));
  }
  var DT = {};
  function CT(t, e, n, i) {
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
        var u = null, s = null, f = null, m = null, T = null, C = null, R = null;
        for (O in n) {
          var N = n[O];
          if (n.hasOwnProperty(O) && N != null)
            switch (O) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                T = N;
              default:
                i.hasOwnProperty(O) || wt(t, e, O, null, i, N);
            }
        }
        for (var M in i) {
          var O = i[M];
          if (N = n[M], i.hasOwnProperty(M) && (O != null || N != null))
            switch (M) {
              case "type":
                O !== N && (Rt = !0), s = O;
                break;
              case "name":
                O !== N && (Rt = !0), u = O;
                break;
              case "checked":
                O !== N && (Rt = !0), C = O;
                break;
              case "defaultChecked":
                O !== N && (Rt = !0), R = O;
                break;
              case "value":
                O !== N && (Rt = !0), f = O;
                break;
              case "defaultValue":
                O !== N && (Rt = !0), m = O;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (O != null)
                  throw Error(r(137, e));
                break;
              default:
                O !== N && wt(
                  t,
                  e,
                  M,
                  O,
                  i,
                  N
                );
            }
        }
        Ro(
          t,
          f,
          m,
          T,
          C,
          R,
          s,
          u
        );
        return;
      case "select":
        O = f = m = M = null;
        for (s in n)
          if (T = n[s], n.hasOwnProperty(s) && T != null)
            switch (s) {
              case "value":
                break;
              case "multiple":
                O = T;
              default:
                i.hasOwnProperty(s) || wt(
                  t,
                  e,
                  s,
                  null,
                  i,
                  T
                );
            }
        for (u in i)
          if (s = i[u], T = n[u], i.hasOwnProperty(u) && (s != null || T != null))
            switch (u) {
              case "value":
                s !== T && (Rt = !0), M = s;
                break;
              case "defaultValue":
                s !== T && (Rt = !0), m = s;
                break;
              case "multiple":
                s !== T && (Rt = !0), f = s;
              default:
                s !== T && wt(
                  t,
                  e,
                  u,
                  s,
                  i,
                  T
                );
            }
        e = m, n = f, i = O, M != null ? ha(t, !!n, M, !1) : !!i != !!n && (e != null ? ha(t, !!n, e, !0) : ha(t, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        O = M = null;
        for (m in n)
          if (u = n[m], n.hasOwnProperty(m) && u != null && !i.hasOwnProperty(m))
            switch (m) {
              case "value":
                break;
              case "children":
                break;
              default:
                wt(t, e, m, null, i, u);
            }
        for (f in i)
          if (u = i[f], s = n[f], i.hasOwnProperty(f) && (u != null || s != null))
            switch (f) {
              case "value":
                u !== s && (Rt = !0), M = u;
                break;
              case "defaultValue":
                u !== s && (Rt = !0), O = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(r(91));
                break;
              default:
                u !== s && wt(t, e, f, u, i, s);
            }
        Ph(t, M, O);
        return;
      case "option":
        for (var K in n)
          M = n[K], n.hasOwnProperty(K) && M != null && !i.hasOwnProperty(K) && (K === "selected" ? t.selected = !1 : wt(
            t,
            e,
            K,
            null,
            i,
            M
          ));
        for (T in i)
          M = i[T], O = n[T], i.hasOwnProperty(T) && M !== O && (M != null || O != null) && (T === "selected" ? (M !== O && (Rt = !0), t.selected = M && typeof M != "function" && typeof M != "symbol") : wt(
            t,
            e,
            T,
            M,
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
        for (var et in n)
          M = n[et], n.hasOwnProperty(et) && M != null && !i.hasOwnProperty(et) && wt(t, e, et, null, i, M);
        for (C in i)
          if (M = i[C], O = n[C], i.hasOwnProperty(C) && M !== O && (M != null || O != null))
            switch (C) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (M != null)
                  throw Error(r(137, e));
                break;
              default:
                wt(
                  t,
                  e,
                  C,
                  M,
                  i,
                  O
                );
            }
        return;
      default:
        if (_o(e)) {
          for (var yt in n)
            M = n[yt], n.hasOwnProperty(yt) && M !== void 0 && !i.hasOwnProperty(yt) && Rc(
              t,
              e,
              yt,
              void 0,
              i,
              M
            );
          for (R in i)
            M = i[R], O = n[R], !i.hasOwnProperty(R) || M === O || M === void 0 && O === void 0 || Rc(
              t,
              e,
              R,
              M,
              i,
              O
            );
          return;
        }
    }
    for (var D in n)
      M = n[D], n.hasOwnProperty(D) && M != null && !i.hasOwnProperty(D) && wt(t, e, D, null, i, M);
    for (N in i)
      M = i[N], O = n[N], !i.hasOwnProperty(N) || M === O || M == null && O == null || wt(t, e, N, M, i, O);
  }
  function ag(t) {
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
  function xT() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, n = performance.getEntriesByType("resource"), i = 0; i < n.length; i++) {
        var u = n[i], s = u.transferSize, f = u.initiatorType, m = u.duration;
        if (s && m && ag(f)) {
          for (f = 0, m = u.responseEnd, i += 1; i < n.length; i++) {
            var T = n[i], C = T.startTime;
            if (C > m) break;
            var R = T.transferSize, N = T.initiatorType;
            R && ag(N) && (T = T.responseEnd, f += R * (T < m ? 1 : (m - C) / (T - C)));
          }
          if (--i, e += 8 * (s + f) / (u.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var zc = null, _c = null;
  function Fl(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function lg(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function ug(t, e) {
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
  function sg(t, e, n, i) {
    return n = Fl(
      n
    ).createElement(t), n[fe] = i, n[ze] = e, ge(n, t, e), ue(n), n;
  }
  function Vc(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var Nc = null;
  function OT() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Nc ? !1 : (Nc = t, !0) : (Nc = null, !1);
  }
  var Uc = typeof setTimeout == "function" ? setTimeout : void 0, RT = typeof clearTimeout == "function" ? clearTimeout : void 0, og = typeof Promise == "function" ? Promise : void 0, rg = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Uc, zT = typeof queueMicrotask == "function" ? queueMicrotask : typeof og < "u" ? function(t) {
    return og.resolve(null).then(t).catch(_T);
  } : Uc;
  function _T(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Si(t) {
    return t === "head";
  }
  function cg(t, e) {
    var n = e, i = 0;
    do {
      var u = n.nextSibling;
      if (t.removeChild(n), u && u.nodeType === 8)
        if (n = u.data, n === "/$" || n === "/&") {
          if (i === 0) {
            t.removeChild(u), ka(e);
            return;
          }
          i--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          i++;
        else if (n === "html")
          Gc(
            t.ownerDocument.documentElement
          );
        else if (n === "head") {
          n = t.ownerDocument.head, Gc(n);
          for (var s = n.firstChild; s; ) {
            var f = s.nextSibling, m = s.nodeName;
            s[hl] || m === "SCRIPT" || m === "STYLE" || m === "LINK" && s.rel.toLowerCase() === "stylesheet" || n.removeChild(s), s = f;
          }
        } else
          n === "body" && Gc(t.ownerDocument.body);
      n = u;
    } while (n);
    ka(e);
  }
  function fg(t, e) {
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
  function hg(t, e, n) {
    if (e = CSS.escape(e) !== e ? "r-" + btoa(e).replace(/=/g, "") : e, t.style.viewTransitionName = e, n != null && (t.style.viewTransitionClass = n), n = getComputedStyle(t), n.display === "inline") {
      if (e = t.getClientRects(), e.length === 1) var i = 1;
      else
        for (var u = i = 0; u < e.length; u++) {
          var s = e[u];
          0 < s.width && 0 < s.height && i++;
        }
      i === 1 && (t = t.style, t.display = e.length === 1 ? "inline-block" : "block", t.marginTop = "-" + n.paddingTop, t.marginBottom = "-" + n.paddingBottom);
    }
  }
  function dg(t, e) {
    t = t.style, e = e.style;
    var n = e != null ? e.hasOwnProperty("viewTransitionName") ? e.viewTransitionName : e.hasOwnProperty("view-transition-name") ? e["view-transition-name"] : null : null;
    t.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = e != null ? e.hasOwnProperty("viewTransitionClass") ? e.viewTransitionClass : e.hasOwnProperty("view-transition-class") ? e["view-transition-class"] : null : null, t.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), t.display === "inline-block" && (e == null ? t.display = t.margin = "" : (n = e.display, t.display = n == null || typeof n == "boolean" ? "" : n, n = e.margin, n != null ? t.margin = n : (n = e.hasOwnProperty("marginTop") ? e.marginTop : e["margin-top"], t.marginTop = n == null || typeof n == "boolean" ? "" : n, e = e.hasOwnProperty("marginBottom") ? e.marginBottom : e["margin-bottom"], t.marginBottom = e == null || typeof e == "boolean" ? "" : e)));
  }
  function VT(t, e, n) {
    return n = n.ownerDocument.defaultView, {
      rect: t,
      abs: e.position === "absolute" || e.position === "fixed",
      clip: e.clipPath !== "none" || e.overflow !== "visible" || e.filter !== "none" || e.mask !== "none" || e.mask !== "none" || e.borderRadius !== "0px",
      view: 0 <= t.bottom && 0 <= t.right && t.top <= n.innerHeight && t.left <= n.innerWidth
    };
  }
  function wc(t) {
    var e = t.getBoundingClientRect(), n = getComputedStyle(t);
    return VT(e, n, t);
  }
  function NT(t) {
    return t.documentElement.clientHeight;
  }
  function UT(t) {
    this.addEventListener("load", t), this.addEventListener("error", t);
  }
  function wT(t, e, n, i, u, s, f, m, T) {
    var C = e.nodeType === 9 ? e : e.ownerDocument;
    try {
      var R = C.startViewTransition({
        update: function() {
          var M = C.defaultView, O = M.navigation && M.navigation.transition, K = C.fonts.status;
          i();
          var et = [];
          if (K === "loaded" && (NT(C), C.fonts.status === "loading" && et.push(C.fonts.ready)), K = et.length, t !== null)
            for (var yt = t.suspenseyImages, D = 0, E = 0; E < yt.length; E++) {
              var x = yt[E];
              if (!x.complete) {
                var V = x.getBoundingClientRect();
                if (0 < V.bottom && 0 < V.right && V.top < M.innerHeight && V.left < M.innerWidth) {
                  if (D += Ug(x), D > Hs) {
                    et.length = K;
                    break;
                  }
                  x = new Promise(
                    UT.bind(x)
                  ), et.push(x);
                }
              }
            }
          if (0 < et.length)
            return M = Promise.race([
              Promise.all(et),
              new Promise(function(P) {
                return setTimeout(P, 500);
              })
            ]).then(u, u), (O ? Promise.allSettled([O.finished, M]) : M).then(s, s);
          if (u(), O)
            return O.finished.then(
              s,
              s
            );
          s();
        },
        types: n
      });
      C.__reactViewTransition = R;
      var N = [];
      return R.ready.then(
        function() {
          for (var M = C.documentElement.getAnimations({
            subtree: !0
          }), O = 0; O < M.length; O++) {
            var K = M[O], et = K.effect, yt = et.pseudoElement;
            if (yt != null && yt.startsWith("::view-transition")) {
              N.push(K), K = et.getKeyframes();
              for (var D = yt = void 0, E = !0, x = 0; x < K.length; x++) {
                var V = K[x], P = V.width;
                if (yt === void 0) yt = P;
                else if (yt !== P) {
                  E = !1;
                  break;
                }
                if (P = V.height, D === void 0) D = P;
                else if (D !== P) {
                  E = !1;
                  break;
                }
                delete V.width, delete V.height, V.transform === "none" && delete V.transform;
              }
              E && yt !== void 0 && D !== void 0 && (et.setKeyframes(K), E = getComputedStyle(
                et.target,
                et.pseudoElement
              ), E.width !== yt || E.height !== D) && (E = K[0], E.width = yt, E.height = D, E = K[K.length - 1], E.width = yt, E.height = D, et.setKeyframes(K));
            }
          }
          f();
        },
        function(M) {
          C.__reactViewTransition === R && (C.__reactViewTransition = null);
          try {
            typeof M == "object" && M !== null && M.name === "InvalidStateError" && (M.message === "View transition was skipped because document visibility state is hidden." || M.message === "Skipping view transition because document visibility state has become hidden." || M.message === "Skipping view transition because viewport size changed." || M.message === "Transition was aborted because of invalid state") && (M = null), M !== null && T(M);
          } finally {
            i(), u(), f();
          }
        }
      ), R.finished.finally(function() {
        for (var M = 0; M < N.length; M++)
          N[M].cancel();
        C.__reactViewTransition === R && (C.__reactViewTransition = null), m();
      }), R;
    } catch {
      return i(), u(), f(), null;
    }
  }
  function Wi(t, e) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + t + "(" + e + ")";
  }
  Wi.prototype.animate = function(t, e) {
    return e = typeof e == "number" ? { duration: e } : Z({}, e), e.pseudoElement = this._selector, this._scope.animate(t, e);
  }, Wi.prototype.getAnimations = function() {
    for (var t = this._scope, e = this._selector, n = t.getAnimations({ subtree: !0 }), i = [], u = 0; u < n.length; u++) {
      var s = n[u].effect;
      s !== null && s.target === t && s.pseudoElement === e && i.push(n[u]);
    }
    return i;
  }, Wi.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function mg(t) {
    return {
      name: t,
      group: new Wi("group", t),
      imagePair: new Wi("image-pair", t),
      old: new Wi("old", t),
      new: new Wi("new", t)
    };
  }
  function Je(t) {
    this._fragmentFiber = t, this._observers = this._eventListeners = null;
  }
  Je.prototype.addEventListener = function(t, e, n) {
    var i = null, u = null;
    if (!(n != null && typeof n != "boolean" && (i = n.signal || null, i !== null && i.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var s = this._eventListeners;
      if (gg(s, t, e, n) === -1) {
        var f = this, m = e;
        n != null && typeof n != "boolean" && n.once === !0 && (m = function(T) {
          f.removeEventListener(
            t,
            e,
            n
          ), typeof e == "function" ? e.call(this, T) : e.handleEvent(T);
        }), i !== null && (u = f.removeEventListener.bind(
          f,
          t,
          e,
          n
        ), i.addEventListener("abort", u, { once: !0 }), u = i.removeEventListener.bind(i, "abort", u)), i = Qa(n), s.push({
          type: t,
          listener: e,
          optionsOrUseCapture: n,
          attachedListener: m,
          cleanup: u
        }), g(
          this._fragmentFiber.child,
          !1,
          BT,
          t,
          m,
          i
        );
      }
      this._eventListeners = s;
    }
  };
  function BT(t, e, n, i) {
    return U(t).addEventListener(
      e,
      n,
      i
    ), !1;
  }
  Je.prototype.removeEventListener = function(t, e, n) {
    var i = this._eventListeners;
    if (i !== null && (e = gg(
      i,
      t,
      e,
      n
    ), e !== -1)) {
      var u = i[e];
      n = u.attachedListener;
      var s = u.cleanup;
      u = Qa(u.optionsOrUseCapture), g(
        this._fragmentFiber.child,
        !1,
        LT,
        t,
        n,
        u
      ), i.splice(e, 1), s !== null && s();
    }
  };
  function LT(t, e, n, i) {
    return U(t).removeEventListener(
      e,
      n,
      i
    ), !1;
  }
  function Qa(t) {
    return t != null && typeof t != "boolean" && (t.once === !0 || t.signal instanceof AbortSignal) ? { capture: t.capture, passive: t.passive } : t;
  }
  function yg(t) {
    return t == null ? "c=0" : typeof t == "boolean" ? "c=" + (t ? "1" : "0") : "c=" + (t.capture ? "1" : "0");
  }
  function gg(t, e, n, i) {
    if (t.length === 0) return -1;
    i = yg(i);
    for (var u = 0; u < t.length; u++) {
      var s = t[u];
      if (s.type === e && s.listener === n && yg(s.optionsOrUseCapture) === i)
        return u;
    }
    return -1;
  }
  Je.prototype.dispatchEvent = function(t) {
    var e = b(
      this._fragmentFiber
    );
    if (e === null) return !0;
    e = U(e);
    var n = this._eventListeners;
    if (n !== null && 0 < n.length || !t.bubbles) {
      var i = e.nodeType === 9 ? e.createComment("") : document.createTextNode("");
      if (n)
        for (var u = 0; u < n.length; u++) {
          var s = n[u];
          i.addEventListener(
            s.type,
            s.attachedListener,
            Qa(s.optionsOrUseCapture)
          );
        }
      if (e.appendChild(i), t = i.dispatchEvent(t), n)
        for (u = 0; u < n.length; u++)
          s = n[u], i.removeEventListener(
            s.type,
            s.attachedListener,
            Qa(s.optionsOrUseCapture)
          );
      return e.removeChild(i), t;
    }
    return e.dispatchEvent(t);
  }, Je.prototype.focus = function(t) {
    g(
      this._fragmentFiber.child,
      !0,
      pg,
      t,
      void 0,
      void 0
    );
  };
  function pg(t, e) {
    return t.tag === 6 ? !1 : (t = U(t), PT(t, e));
  }
  Je.prototype.focusLast = function(t) {
    var e = [];
    g(
      this._fragmentFiber.child,
      !0,
      Bc,
      e,
      void 0,
      void 0
    );
    for (var n = e.length - 1; 0 <= n && !pg(e[n], t); n--) ;
  };
  function Bc(t, e) {
    return e.push(t), !1;
  }
  Je.prototype.blur = function() {
    var t = b(
      this._fragmentFiber
    );
    t !== null && (t = U(t), t = Fl(t).activeElement, t !== null && g(
      this._fragmentFiber.child,
      !1,
      HT,
      t,
      void 0,
      void 0
    ));
  };
  function HT(t, e) {
    return t.tag === 6 ? !1 : (t = U(t), t === e || t.contains(e) ? (e.blur(), !0) : !1);
  }
  Je.prototype.observeUsing = function(t) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(t), g(
      this._fragmentFiber.child,
      !1,
      jT,
      t,
      void 0,
      void 0
    );
  };
  function jT(t, e) {
    return t.tag === 6 || (t = U(t), e.observe(t)), !1;
  }
  Je.prototype.unobserveUsing = function(t) {
    var e = this._observers;
    if (e !== null && e.has(t)) {
      e.delete(t), g(
        this._fragmentFiber.child,
        !1,
        YT,
        t,
        void 0,
        void 0
      );
      for (var n = e = 0; n < dn.length; n++) {
        var i = dn[n];
        i.fragmentInstance === this && i.observer === t ? t.unobserve(i.instance) : dn[e++] = i;
      }
      dn.length = e;
    }
  };
  function YT(t, e) {
    return t.tag === 6 || (t = U(t), e.unobserve(t)), !1;
  }
  var dn = [], Lc = !1;
  function qT(t, e, n) {
    dn.push({
      fragmentInstance: t,
      observer: e,
      instance: n
    }), Lc || (Lc = !0, kT(function() {
      Lc = !1;
      var i = dn;
      dn = [];
      for (var u = 0; u < i.length; u++) {
        var s = i[u];
        s.observer.unobserve(s.instance);
      }
    }));
  }
  Je.prototype.getClientRects = function() {
    var t = [];
    return g(
      this._fragmentFiber.child,
      !1,
      GT,
      t,
      void 0,
      void 0
    ), t;
  };
  function GT(t, e) {
    if (t.tag === 6) {
      t = t.stateNode;
      var n = t.ownerDocument.createRange();
      n.selectNodeContents(t), e.push.apply(e, n.getClientRects());
    } else
      t = U(t), e.push.apply(e, t.getClientRects());
    return !1;
  }
  Je.prototype.getRootNode = function(t) {
    var e = b(
      this._fragmentFiber
    );
    return e === null ? this : U(e).getRootNode(t);
  }, Je.prototype.compareDocumentPosition = function(t) {
    var e = b(
      this._fragmentFiber
    );
    if (e === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var n = [];
    g(
      this._fragmentFiber.child,
      !1,
      Bc,
      n,
      void 0,
      void 0
    );
    var i = U(e);
    if (n.length === 0) {
      if (n = i, _(this._fragmentFiber)) {
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
      var u = i = n.compareDocumentPosition(t);
      return n === t ? u = Node.DOCUMENT_POSITION_CONTAINS : i & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = z(e)[1], n === null ? u = Node.DOCUMENT_POSITION_PRECEDING : (t = U(n).compareDocumentPosition(
        t
      ), u = t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), u |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    e = U(n[0]), u = U(n[n.length - 1]);
    var s = _(this._fragmentFiber) ? e.parentElement : i;
    if (s == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    i = s.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY, s = s.compareDocumentPosition(u) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var f = e.compareDocumentPosition(t), m = u.compareDocumentPosition(t), T = f & Node.DOCUMENT_POSITION_CONTAINED_BY || m & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return m = i && s && f & Node.DOCUMENT_POSITION_FOLLOWING && m & Node.DOCUMENT_POSITION_PRECEDING, e = i && e === t || s && u === t || T || m ? Node.DOCUMENT_POSITION_CONTAINED_BY : !i && e === t || !s && u === t ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : f, e & Node.DOCUMENT_POSITION_DISCONNECTED || e & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || XT(
      e,
      this._fragmentFiber,
      n[0],
      n[n.length - 1],
      t
    ) ? e : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function XT(t, e, n, i, u) {
    var s = zi(u);
    if (t & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (n = !!s)
        t: {
          for (; s !== null; ) {
            if (s.tag === 7 && (s === e || s.alternate === e)) {
              n = !0;
              break t;
            }
            s = s.return;
          }
          n = !1;
        }
      return n;
    }
    if (t & Node.DOCUMENT_POSITION_CONTAINS) {
      if (s === null)
        return s = u.ownerDocument, u === s || u === s.documentElement || u === s.body;
      t: {
        for (s = e, e = b(e); s !== null; ) {
          if (!(s.tag !== 5 && s.tag !== 3 && s.tag !== 27 || s !== e && s.alternate !== e)) {
            s = !0;
            break t;
          }
          s = s.return;
        }
        s = !1;
      }
      return s;
    }
    return t & Node.DOCUMENT_POSITION_PRECEDING ? ((e = !!s) && !(e = s === n) && (e = ot(
      n,
      s,
      k
    ), e === null ? e = !1 : (g(
      e,
      !0,
      Q,
      s,
      n
    ), s = L, L = null, e = s !== null)), e) : t & Node.DOCUMENT_POSITION_FOLLOWING ? ((e = !!s) && !(e = s === i) && (e = ot(
      i,
      s,
      k
    ), e === null ? e = !1 : (g(
      e,
      !0,
      B,
      s,
      i
    ), s = L, j = L = null, e = s !== null)), e) : !1;
  }
  function vg(t, e) {
    var n = t.ownerDocument.createRange();
    n.selectNodeContents(t), t = n.getBoundingClientRect(), window.scrollTo(
      window.scrollX + t.left,
      e ? window.scrollY + t.top : window.scrollY + t.bottom - window.innerHeight
    );
  }
  Je.prototype.scrollIntoView = function(t) {
    if (typeof t == "object") throw Error(r(566));
    var e = [];
    g(
      this._fragmentFiber.child,
      !1,
      Bc,
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
        t = U(i), vg(t, n);
        return;
      }
      if (i = U(i), i.nodeType !== 9) {
        if (i.nodeType === 11) {
          n = "host" in i ? i.host : null, n !== null && n.scrollIntoView(t);
          return;
        }
        i.scrollIntoView(t);
      }
    }
    for (i = n ? e.length - 1 : 0; i !== (n ? -1 : e.length); ) {
      var u = e[i];
      u.tag === 6 ? (u = U(u), vg(u, n)) : U(u).scrollIntoView(t), i += n ? -1 : 1;
    }
  };
  function QT(t, e) {
    return t = U(t), Sg(t, e), !1;
  }
  function Sg(t, e) {
    t.reactFragments == null && (t.reactFragments = /* @__PURE__ */ new Set()), t.reactFragments.add(e);
  }
  function Tg(t, e) {
    var n = e._eventListeners;
    if (n !== null)
      for (var i = 0; i < n.length; i++) {
        var u = n[i];
        t.addEventListener(
          u.type,
          u.attachedListener,
          Qa(u.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (n = e._observers, n !== null && n.forEach(function(s) {
      for (var f = 0, m = 0; m < dn.length; m++) {
        var T = dn[m];
        (T.fragmentInstance !== e || T.observer !== s || T.instance !== t) && (dn[f++] = T);
      }
      dn.length = f, s.observe(t);
    }), Sg(t, e));
  }
  function ZT(t, e) {
    var n = e._eventListeners;
    if (n !== null)
      for (var i = 0; i < n.length; i++) {
        var u = n[i];
        t.removeEventListener(
          u.type,
          u.attachedListener,
          Qa(u.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (n = e._observers, n !== null && n.forEach(function(s) {
      typeof s.rootMargin == "string" ? qT(
        e,
        s,
        t
      ) : s.unobserve(t);
    }), t.reactFragments != null && t.reactFragments.delete(e));
  }
  function Hc(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var n = e;
      switch (e = e.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Hc(n), Cu(n);
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
  function KT(t, e, n, i) {
    for (; t.nodeType === 1; ) {
      var u = n;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!i && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (i) {
        if (!t[hl])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (s = t.getAttribute("rel"), s === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (s !== u.rel || t.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || t.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (s = t.getAttribute("src"), (s !== (u.src == null ? null : u.src) || t.getAttribute("type") !== (u.type == null ? null : u.type) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && s && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var s = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && t.getAttribute("name") === s)
          return t;
      } else return t;
      if (t = en(t.nextSibling), t === null) break;
    }
    return null;
  }
  function JT(t, e, n) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = en(t.nextSibling), t === null)) return null;
    return t;
  }
  function bg(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = en(t.nextSibling), t === null)) return null;
    return t;
  }
  function jc(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Yc(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function FT(t, e) {
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
  function en(t) {
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
  var qc = null;
  function Eg(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var n = t.data;
        if (n === "/$" || n === "/&") {
          if (e === 0)
            return en(t.nextSibling);
          e--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Ag(t) {
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
  function PT(t, e) {
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
  function kT(t) {
    rg(function() {
      rg(function(e) {
        return t(e);
      });
    });
  }
  function Mg(t, e, n) {
    switch (e = Fl(n), t) {
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
  function Dg(t, e, n) {
    for (var i in n) {
      var u = n[i];
      n.hasOwnProperty(i) && u != null && wt(t, e, i, null, DT, u);
    }
    n.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === pn && (t.onclick = null), Cu(t);
  }
  function Gc(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    Cu(t);
  }
  var nn = /* @__PURE__ */ new Map(), Cg = /* @__PURE__ */ new Set();
  function Pl(t) {
    if (typeof t.getRootNode == "function") {
      var e = t.getRootNode();
      if (e.nodeType === 9 || e.nodeType === 11) return e;
    }
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Jn = lt.d;
  lt.d = {
    f: WT,
    r: IT,
    D: $T,
    C: tb,
    L: eb,
    m: nb,
    X: ab,
    S: ib,
    M: lb
  };
  function WT() {
    var t = Jn.f(), e = Rs();
    return t || e;
  }
  function IT(t) {
    var e = ra(t);
    e !== null && e.tag === 5 && e.type === "form" ? Om(e) : Jn.r(t);
  }
  var Za = typeof document > "u" ? null : document;
  function xg(t, e, n) {
    var i = Za;
    if (i && typeof e == "string" && e) {
      var u = Fe(e);
      u = 'link[rel="' + t + '"][href="' + u + '"]', typeof n == "string" && (u += '[crossorigin="' + n + '"]'), Cg.has(u) || (Cg.add(u), t = { rel: t, crossOrigin: n, href: e }, i.querySelector(u) === null && (e = i.createElement("link"), ge(e, "link", t), ue(e), i.head.appendChild(e)));
    }
  }
  function $T(t) {
    Jn.D(t), xg("dns-prefetch", t, null);
  }
  function tb(t, e) {
    Jn.C(t, e), xg("preconnect", t, e);
  }
  function eb(t, e, n) {
    Jn.L(t, e, n);
    var i = Za;
    if (i && t && e) {
      var u = 'link[rel="preload"][as="' + Fe(e) + '"]';
      e === "image" && n && n.imageSrcSet ? (u += '[imagesrcset="' + Fe(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (u += '[imagesizes="' + Fe(
        n.imageSizes
      ) + '"]')) : u += '[href="' + Fe(t) + '"]';
      var s = u;
      switch (e) {
        case "style":
          s = Ka(t);
          break;
        case "script":
          s = Ja(t);
      }
      if (!(nn.has(s) || (t = Z(
        {
          rel: "preload",
          href: e === "image" && n && n.imageSrcSet ? void 0 : t,
          as: e
        },
        n
      ), nn.set(s, t), i.querySelector(u) !== null || e === "style" && i.querySelector(kl(s)) || e === "script" && i.querySelector(Wl(s))))) {
        var f = i.createElement("link");
        ge(f, "link", t), e === "style" && (f[Du] = !0, f.onload = f.onerror = function() {
          Yh(f);
        }), ue(f), i.head.appendChild(f);
      }
    }
  }
  function nb(t, e) {
    Jn.m(t, e);
    var n = Za;
    if (n && t) {
      var i = e && typeof e.as == "string" ? e.as : "script", u = 'link[rel="modulepreload"][as="' + Fe(i) + '"][href="' + Fe(t) + '"]', s = u;
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          s = Ja(t);
      }
      if (!nn.has(s) && (t = Z({ rel: "modulepreload", href: t }, e), nn.set(s, t), n.querySelector(u) === null)) {
        switch (i) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(Wl(s)))
              return;
        }
        i = n.createElement("link"), ge(i, "link", t), ue(i), n.head.appendChild(i);
      }
    }
  }
  function ib(t, e, n) {
    Jn.S(t, e, n);
    var i = Za;
    if (i && t) {
      var u = ca(i).hoistableStyles, s = Ka(t);
      e = e || "default";
      var f = u.get(s);
      if (!f) {
        var m = { loading: 0, preload: null };
        if (f = i.querySelector(
          kl(s)
        ))
          m.loading = 5;
        else {
          t = Z(
            { rel: "stylesheet", href: t, "data-precedence": e },
            n
          ), (n = nn.get(s)) && Xc(t, n);
          var T = f = i.createElement("link");
          ue(T), ge(T, "link", t), T._p = new Promise(function(C, R) {
            T.onload = C, T.onerror = R;
          }), T.addEventListener("load", function() {
            m.loading |= 1;
          }), T.addEventListener("error", function() {
            m.loading |= 2;
          }), m.loading |= 4, Bs(f, e, i);
        }
        f = {
          type: "stylesheet",
          instance: f,
          count: 1,
          state: m
        }, u.set(s, f);
      }
    }
  }
  function ab(t, e) {
    Jn.X(t, e);
    var n = Za;
    if (n && t) {
      var i = ca(n).hoistableScripts, u = Ja(t), s = i.get(u);
      s || (s = n.querySelector(Wl(u)), s || (t = Z({ src: t, async: !0 }, e), (e = nn.get(u)) && Qc(t, e), s = n.createElement("script"), ue(s), ge(s, "link", t), n.head.appendChild(s)), s = {
        type: "script",
        instance: s,
        count: 1,
        state: null
      }, i.set(u, s));
    }
  }
  function lb(t, e) {
    Jn.M(t, e);
    var n = Za;
    if (n && t) {
      var i = ca(n).hoistableScripts, u = Ja(t), s = i.get(u);
      s || (s = n.querySelector(Wl(u)), s || (t = Z({ src: t, async: !0, type: "module" }, e), (e = nn.get(u)) && Qc(t, e), s = n.createElement("script"), ue(s), ge(s, "link", t), n.head.appendChild(s)), s = {
        type: "script",
        instance: s,
        count: 1,
        state: null
      }, i.set(u, s));
    }
  }
  function Og(t, e, n, i) {
    var u = (u = xt.current) ? Pl(u) : null;
    if (!u) throw Error(r(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (n = Ka(n.href), e = ca(
          u
        ).hoistableStyles, i = e.get(n), i || (i = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(n, i)), i) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          t = Ka(n.href);
          var s = ca(
            u
          ).hoistableStyles, f = s.get(t);
          if (f || (u = u.ownerDocument || u, f = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, s.set(t, f), (s = u.querySelector(
            kl(t)
          )) ? s._p || (f.instance = s, f.state.loading = 5) : (s = nn.get(t), s || (s = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, nn.set(t, s)), ub(
            u,
            t,
            s,
            f.state
          ))), e && i === null)
            throw Error(r(528, ""));
          return f;
        }
        if (e && i !== null)
          throw Error(r(529, ""));
        return null;
      case "script":
        return e = n.async, n = n.src, typeof n == "string" && e && typeof e != "function" && typeof e != "symbol" ? (n = Ja(n), e = ca(
          u
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
  function Ka(t) {
    return 'href="' + Fe(t) + '"';
  }
  function kl(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Rg(t) {
    return Z({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function ub(t, e, n, i) {
    if (e = t.querySelector(
      'link[rel="preload"][as="style"][' + e + "]"
    )) {
      if (e[Du] !== !0) {
        i.loading = 1;
        return;
      }
    } else
      e = t.createElement("link"), e[Du] = !0, e.onload = e.onerror = Yh.bind(null, e), ge(e, "link", n), ue(e), t.head.appendChild(e);
    i.preload = e, e.addEventListener("load", function() {
      return i.loading |= 1;
    }), e.addEventListener("error", function() {
      return i.loading |= 2;
    });
  }
  function Ja(t) {
    return '[src="' + Fe(t) + '"]';
  }
  function Wl(t) {
    return "script[async]" + t;
  }
  function zg(t, e, n) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var i = t.querySelector(
            'style[data-href~="' + Fe(n.href) + '"]'
          );
          if (i)
            return e.instance = i, ue(i), i;
          var u = Z({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return i = (t.ownerDocument || t).createElement(
            "style"
          ), ue(i), ge(i, "style", u), Bs(i, n.precedence, t), e.instance = i;
        case "stylesheet":
          u = Ka(n.href);
          var s = t.querySelector(
            kl(u)
          );
          if (s)
            return e.state.loading |= 4, e.instance = s, ue(s), s;
          i = Rg(n), (u = nn.get(u)) && Xc(i, u), s = (t.ownerDocument || t).createElement("link"), ue(s);
          var f = s;
          return f._p = new Promise(function(m, T) {
            f.onload = m, f.onerror = T;
          }), ge(s, "link", i), e.state.loading |= 4, Bs(s, n.precedence, t), e.instance = s;
        case "script":
          return s = Ja(n.src), (u = t.querySelector(
            Wl(s)
          )) ? (e.instance = u, ue(u), u) : (i = n, (u = nn.get(s)) && (i = Z({}, n), Qc(i, u)), t = t.ownerDocument || t, u = t.createElement("script"), ue(u), ge(u, "link", i), t.head.appendChild(u), e.instance = u);
        case "void":
          return null;
        default:
          throw Error(r(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (i = e.instance, e.state.loading |= 4, Bs(i, n.precedence, t));
    return e.instance;
  }
  function Bs(t, e, n) {
    for (var i = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = i.length ? i[i.length - 1] : null, s = u, f = 0; f < i.length; f++) {
      var m = i[f];
      if (m.dataset.precedence === e) s = m;
      else if (s !== u) break;
    }
    s ? s.parentNode.insertBefore(t, s.nextSibling) : (e = n.nodeType === 9 ? n.head : n, e.insertBefore(t, e.firstChild));
  }
  function Xc(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function Qc(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var Ls = null;
  function _g(t, e, n) {
    if (Ls === null) {
      var i = /* @__PURE__ */ new Map(), u = Ls = /* @__PURE__ */ new Map();
      u.set(n, i);
    } else
      u = Ls, i = u.get(n), i || (i = /* @__PURE__ */ new Map(), u.set(n, i));
    if (i.has(t)) return i;
    for (i.set(t, null), n = n.getElementsByTagName(t), u = 0; u < n.length; u++) {
      var s = n[u];
      if (!(s[hl] || s[fe] || t === "link" && s.getAttribute("rel") === "stylesheet") && s.namespaceURI !== "http://www.w3.org/2000/svg") {
        var f = s.getAttribute(e) || "";
        f = t + f;
        var m = i.get(f);
        m ? m.push(s) : i.set(f, [s]);
      }
    }
    return i;
  }
  function Zc(t, e, n) {
    t = t.ownerDocument || t, t.head.insertBefore(
      n,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function sb(t, e, n) {
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
  function Vg(t, e) {
    return t === "img" && e.src != null && e.src !== "" && e.onLoad == null && e.loading !== "lazy";
  }
  function Ng(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function Ug(t) {
    return (t.width || 100) * (t.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function wg(t, e) {
    typeof e.decode == "function" && (t.imgCount++, e.complete || (t.imgBytes += Ug(e), t.suspenseyImages.push(e)), t = cb.bind(t), e.decode().then(t, t));
  }
  function ob(t, e, n, i) {
    if (n.type === "stylesheet" && (typeof i.media != "string" || matchMedia(i.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var u = Ka(i.href), s = e.querySelector(
          kl(u)
        );
        if (s) {
          e = s._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = Il.bind(t), e.then(t, t)), n.state.loading |= 4, n.instance = s, ue(s);
          return;
        }
        s = e.ownerDocument || e, i = Rg(i), (u = nn.get(u)) && Xc(i, u), s = s.createElement("link"), ue(s);
        var f = s;
        f._p = new Promise(function(m, T) {
          f.onload = m, f.onerror = T;
        }), ge(s, "link", i), n.instance = s;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(n, e), (e = n.state.preload) && (n.state.loading & 3) === 0 && (t.count++, n = Il.bind(t), e.addEventListener("load", n), e.addEventListener("error", n));
    }
  }
  var Hs = 0;
  function rb(t, e) {
    return t.stylesheets && t.count === 0 && Ys(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(n) {
      var i = setTimeout(function() {
        if (t.stylesheets && Ys(t, t.stylesheets), t.unsuspend) {
          var s = t.unsuspend;
          t.unsuspend = null, s();
        }
      }, 6e4 + e);
      0 < t.imgBytes && Hs === 0 && (Hs = 62500 * xT());
      var u = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Ys(t, t.stylesheets), t.unsuspend)) {
            var s = t.unsuspend;
            t.unsuspend = null, s();
          }
        },
        (t.imgBytes > Hs ? 50 : 800) + e
      );
      return t.unsuspend = n, function() {
        t.unsuspend = null, clearTimeout(i), clearTimeout(u);
      };
    } : null;
  }
  function Bg(t) {
    if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
      if (t.stylesheets) Ys(t, t.stylesheets);
      else if (t.unsuspend) {
        var e = t.unsuspend;
        t.unsuspend = null, e();
      }
    }
  }
  function Il() {
    this.count--, Bg(this);
  }
  function cb() {
    this.imgCount--, Bg(this);
  }
  var js = null;
  function Ys(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, js = /* @__PURE__ */ new Map(), e.forEach(fb, t), js = null, Il.call(t));
  }
  function fb(t, e) {
    if (!(e.state.loading & 4)) {
      var n = js.get(t);
      if (n) var i = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), js.set(t, n);
        for (var u = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), s = 0; s < u.length; s++) {
          var f = u[s];
          (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") && (n.set(f.dataset.precedence, f), i = f);
        }
        i && n.set(null, i);
      }
      u = e.instance, f = u.getAttribute("data-precedence"), s = n.get(f) || i, s === i && n.set(null, u), n.set(f, u), this.count++, i = Il.bind(this), u.addEventListener("load", i), u.addEventListener("error", i), s ? s.parentNode.insertBefore(u, s.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(u, t.firstChild)), e.state.loading |= 4;
    }
  }
  var Fa = {
    $$typeof: Tt,
    Provider: null,
    Consumer: null,
    _currentValue: be,
    _currentValue2: be,
    _threadCount: 0
  };
  function hb(t, e, n, i, u, s, f, m, T) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Do(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Do(0), this.hiddenUpdates = Do(null), this.identifierPrefix = i, this.onUncaughtError = u, this.onCaughtError = s, this.onRecoverableError = f, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = T, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Lg(t, e, n, i, u, s, f, m, T, C, R, N) {
    return t = new hb(
      t,
      e,
      n,
      f,
      T,
      C,
      R,
      N,
      m
    ), e = 1, s === !0 && (e |= 24), s = _e(3, null, null, e), t.current = s, s.stateNode = t, e = ur(), e.refCount++, t.pooledCache = e, e.refCount++, s.memoizedState = {
      element: i,
      isDehydrated: n,
      cache: e
    }, cr(s), t;
  }
  function Hg(t) {
    return t ? (t = Ta, t) : Ta;
  }
  function jg(t, e, n, i, u, s) {
    u = Hg(u), i.context === null ? i.context = u : i.pendingContext = u, i = si(e), i.payload = { element: n }, s = s === void 0 ? null : s, s !== null && (i.callback = s), n = oi(t, i, e), n !== null && (we(n, t, e), Rl(n, t, e));
  }
  function Yg(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var n = t.retryLane;
      t.retryLane = n !== 0 && n < e ? n : e;
    }
  }
  function Kc(t, e) {
    Yg(t, e), (t = t.alternate) && Yg(t, e);
  }
  function qg(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Ui(t, 67108864);
      e !== null && we(e, t, 67108864), Kc(t, 67108864);
    }
  }
  function Gg(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Ke();
      e = Co(e);
      var n = Ui(t, e);
      n !== null && we(n, t, e), Kc(t, e);
    }
  }
  var Pa = !0;
  function db(t, e, n, i) {
    var u = tt.T;
    tt.T = null;
    var s = lt.p;
    try {
      lt.p = 2, Jc(t, e, n, i);
    } finally {
      lt.p = s, tt.T = u;
    }
  }
  function mb(t, e, n, i) {
    var u = tt.T;
    tt.T = null;
    var s = lt.p;
    try {
      lt.p = 8, Jc(t, e, n, i);
    } finally {
      lt.p = s, tt.T = u;
    }
  }
  function Jc(t, e, n, i) {
    if (Pa) {
      var u = Fc(i);
      if (u === null)
        Oc(
          t,
          e,
          i,
          qs,
          n
        ), Qg(t, i);
      else if (gb(
        u,
        t,
        e,
        n,
        i
      ))
        i.stopPropagation();
      else if (Qg(t, i), e & 4 && -1 < yb.indexOf(t)) {
        for (; u !== null; ) {
          var s = ra(u);
          if (s !== null)
            switch (s.tag) {
              case 3:
                if (s = s.stateNode, s.current.memoizedState.isDehydrated) {
                  var f = Ri(s.pendingLanes);
                  if (f !== 0) {
                    var m = s;
                    for (m.pendingLanes |= 2, m.entangledLanes |= 2; f; ) {
                      var T = 1 << 31 - je(f);
                      m.entanglements[1] |= T, f &= ~T;
                    }
                    xn(s), (zt & 6) === 0 && (Cs = Le() + 500, Zl(0));
                  }
                }
                break;
              case 31:
              case 13:
                m = Ui(s, 2), m !== null && we(m, s, 2), Rs(), Kc(s, 2);
            }
          if (s = Fc(i), s === null && Oc(
            t,
            e,
            i,
            qs,
            n
          ), s === u) break;
          u = s;
        }
        u !== null && i.stopPropagation();
      } else
        Oc(
          t,
          e,
          i,
          null,
          n
        );
    }
  }
  function Fc(t) {
    return t = No(t), Pc(t);
  }
  var qs = null;
  function Pc(t) {
    if (qs = null, t = zi(t), t !== null) {
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
    return qs = t, null;
  }
  function Xg(t) {
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
        switch (x1()) {
          case Oh:
            return 2;
          case Rh:
            return 8;
          case Tu:
          case O1:
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
  var kc = !1, Ti = null, bi = null, Ei = null, $l = /* @__PURE__ */ new Map(), tu = /* @__PURE__ */ new Map(), Ai = [], yb = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Qg(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        Ti = null;
        break;
      case "dragenter":
      case "dragleave":
        bi = null;
        break;
      case "mouseover":
      case "mouseout":
        Ei = null;
        break;
      case "pointerover":
      case "pointerout":
        $l.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        tu.delete(e.pointerId);
    }
  }
  function eu(t, e, n, i, u, s) {
    return t === null || t.nativeEvent !== s ? (t = {
      blockedOn: e,
      domEventName: n,
      eventSystemFlags: i,
      nativeEvent: s,
      targetContainers: [u]
    }, e !== null && (e = ra(e), e !== null && qg(e)), t) : (t.eventSystemFlags |= i, e = t.targetContainers, u !== null && e.indexOf(u) === -1 && e.push(u), t);
  }
  function gb(t, e, n, i, u) {
    switch (e) {
      case "focusin":
        return Ti = eu(
          Ti,
          t,
          e,
          n,
          i,
          u
        ), !0;
      case "dragenter":
        return bi = eu(
          bi,
          t,
          e,
          n,
          i,
          u
        ), !0;
      case "mouseover":
        return Ei = eu(
          Ei,
          t,
          e,
          n,
          i,
          u
        ), !0;
      case "pointerover":
        var s = u.pointerId;
        return $l.set(
          s,
          eu(
            $l.get(s) || null,
            t,
            e,
            n,
            i,
            u
          )
        ), !0;
      case "gotpointercapture":
        return s = u.pointerId, tu.set(
          s,
          eu(
            tu.get(s) || null,
            t,
            e,
            n,
            i,
            u
          )
        ), !0;
    }
    return !1;
  }
  function Zg(t) {
    var e = zi(t.target);
    if (e !== null) {
      var n = d(e);
      if (n !== null) {
        if (e = n.tag, e === 13) {
          if (e = h(n), e !== null) {
            t.blockedOn = e, Lh(t.priority, function() {
              Gg(n);
            });
            return;
          }
        } else if (e === 31) {
          if (e = y(n), e !== null) {
            t.blockedOn = e, Lh(t.priority, function() {
              Gg(n);
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
  function Gs(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var n = Fc(t.nativeEvent);
      if (n === null) {
        n = t.nativeEvent;
        var i = new n.constructor(
          n.type,
          n
        );
        Vo = i, n.target.dispatchEvent(i), Vo = null;
      } else
        return e = ra(n), e !== null && qg(e), t.blockedOn = n, !1;
      e.shift();
    }
    return !0;
  }
  function Kg(t, e, n) {
    Gs(t) && n.delete(e);
  }
  function pb() {
    kc = !1, Ti !== null && Gs(Ti) && (Ti = null), bi !== null && Gs(bi) && (bi = null), Ei !== null && Gs(Ei) && (Ei = null), $l.forEach(Kg), tu.forEach(Kg);
  }
  function Xs(t, e) {
    t.blockedOn === e && (t.blockedOn = null, kc || (kc = !0, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      pb
    )));
  }
  var Qs = null;
  function Jg(t) {
    Qs !== t && (Qs = t, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      function() {
        Qs === t && (Qs = null);
        for (var e = 0; e < t.length; e += 3) {
          var n = t[e], i = t[e + 1], u = t[e + 2];
          if (typeof i != "function") {
            if (Pc(i || n) === null)
              continue;
            break;
          }
          var s = ra(n);
          s !== null && (t.splice(e, 3), e -= 3, _r(
            s,
            {
              pending: !0,
              data: u,
              method: n.method,
              action: i
            },
            i,
            u
          ));
        }
      }
    ));
  }
  function ka(t) {
    function e(T) {
      return Xs(T, t);
    }
    Ti !== null && Xs(Ti, t), bi !== null && Xs(bi, t), Ei !== null && Xs(Ei, t), $l.forEach(e), tu.forEach(e);
    for (var n = 0; n < Ai.length; n++) {
      var i = Ai[n];
      i.blockedOn === t && (i.blockedOn = null);
    }
    for (; 0 < Ai.length && (n = Ai[0], n.blockedOn === null); )
      Zg(n), n.blockedOn === null && Ai.shift();
    if (n = (t.ownerDocument || t).$$reactFormReplay, n != null)
      for (i = 0; i < n.length; i += 3) {
        var u = n[i], s = n[i + 1], f = u[ze] || null;
        if (typeof s == "function")
          f || Jg(n);
        else if (f) {
          var m = null;
          if (s && s.hasAttribute("formAction")) {
            if (u = s, f = s[ze] || null)
              m = f.formAction;
            else if (Pc(u) !== null) continue;
          } else m = f.action;
          typeof m == "function" ? n[i + 1] = m : (n.splice(i, 3), i -= 3), Jg(n);
        }
      }
  }
  function Fg() {
    function t(s) {
      s.canIntercept && s.info === "react-transition" && s.intercept({
        handler: function() {
          return new Promise(function(f) {
            return u = f;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function e() {
      u !== null && (u(), u = null), i || setTimeout(n, 20);
    }
    function n() {
      if (!i && !navigation.transition) {
        var s = navigation.currentEntry;
        s && s.url != null && navigation.navigate(s.url, {
          state: s.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var i = !1, u = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", e), navigation.addEventListener("navigateerror", e), setTimeout(n, 100), function() {
        i = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", e), navigation.removeEventListener("navigateerror", e), u !== null && (u(), u = null);
      };
    }
  }
  function Wc(t) {
    this._internalRoot = t;
  }
  Zs.prototype.render = Wc.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(r(409));
    var n = e.current, i = Ke();
    jg(n, i, t, e, null, null);
  }, Zs.prototype.unmount = Wc.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      jg(t.current, 2, null, t, null, null), Rs(), e[oa] = null;
    }
  };
  function Zs(t) {
    this._internalRoot = t;
  }
  Zs.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = Bh();
      t = { blockedOn: null, target: t, priority: e };
      for (var n = 0; n < Ai.length && e !== 0 && e < Ai[n].priority; n++) ;
      Ai.splice(n, 0, t), n === 0 && Zg(t);
    }
  };
  var Pg = l.version;
  if (Pg !== "19.3.0")
    throw Error(
      r(
        527,
        Pg,
        "19.3.0"
      )
    );
  lt.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(r(188)) : (t = Object.keys(t).join(","), Error(r(268, t)));
    return t = S(e), t = t !== null ? p(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var vb = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: tt,
    reconcilerVersion: "19.3.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ks = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ks.isDisabled && Ks.supportsFiber)
      try {
        rl = Ks.inject(
          vb
        ), He = Ks;
      } catch {
      }
  }
  return iu.createRoot = function(t, e) {
    if (!c(t)) throw Error(r(299));
    var n = !1, i = "", u = Hm, s = jm, f = Ym;
    return e != null && (e.unstable_strictMode === !0 && (n = !0), e.identifierPrefix !== void 0 && (i = e.identifierPrefix), e.onUncaughtError !== void 0 && (u = e.onUncaughtError), e.onCaughtError !== void 0 && (s = e.onCaughtError), e.onRecoverableError !== void 0 && (f = e.onRecoverableError)), e = Lg(
      t,
      1,
      !1,
      null,
      null,
      n,
      i,
      null,
      u,
      s,
      f,
      Fg
    ), t[oa] = e.current, xc(t), new Wc(e);
  }, iu.hydrateRoot = function(t, e, n) {
    if (!c(t)) throw Error(r(299));
    var i = !1, u = "", s = Hm, f = jm, m = Ym, T = null;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (u = n.identifierPrefix), n.onUncaughtError !== void 0 && (s = n.onUncaughtError), n.onCaughtError !== void 0 && (f = n.onCaughtError), n.onRecoverableError !== void 0 && (m = n.onRecoverableError), n.formState !== void 0 && (T = n.formState)), e = Lg(
      t,
      1,
      !0,
      e,
      n ?? null,
      i,
      u,
      T,
      s,
      f,
      m,
      Fg
    ), e.context = Hg(null), n = e.current, i = Ke(), i = Co(i), u = si(i), u.callback = null, oi(n, u, i), n = i, e.current.lanes = n, fl(e, n), xn(e), t[oa] = e.current, xc(t), new Zs(e);
  }, iu.version = "19.3.0", iu;
}
var l0;
function Ob() {
  if (l0) return tf.exports;
  l0 = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (l) {
        console.error(l);
      }
  }
  return a(), tf.exports = xb(), tf.exports;
}
var Rb = Ob();
const zp = it.createContext({});
function Ff(a) {
  const l = it.useRef(null);
  return l.current === null && (l.current = a()), l.current;
}
const zb = typeof window < "u", _p = zb ? it.useLayoutEffect : it.useEffect, Pf = /* @__PURE__ */ it.createContext(null);
function kf(a, l) {
  a.indexOf(l) === -1 && a.push(l);
}
function nl(a, l) {
  const o = a.indexOf(l);
  o > -1 && a.splice(o, 1);
}
const Vn = (a, l, o) => o > l ? l : o < a ? a : o;
let go = () => {
};
const Ci = {}, Vp = (a) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(a), Np = (a) => typeof a == "object" && a !== null, Up = (a) => /^0[^.\s]+$/u.test(a);
// @__NO_SIDE_EFFECTS__
function wp(a) {
  let l;
  return () => (l === void 0 && (l = a()), l);
}
const ln = /* @__NO_SIDE_EFFECTS__ */ (a) => a, gu = (...a) => a.reduce((l, o) => (r) => o(l(r))), il = /* @__NO_SIDE_EFFECTS__ */ (a, l, o) => {
  const r = l - a;
  return r ? (o - a) / r : 1;
};
class Wf {
  constructor() {
    this.subscriptions = [];
  }
  add(l) {
    return kf(this.subscriptions, l), () => nl(this.subscriptions, l);
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
const Be = /* @__NO_SIDE_EFFECTS__ */ (a) => a * 1e3, an = /* @__NO_SIDE_EFFECTS__ */ (a) => a / 1e3, Bp = /* @__NO_SIDE_EFFECTS__ */ (a, l) => l ? a * (1e3 / l) : 0, _b = (a, l, o) => {
  const r = l - a;
  return ((o - a) % r + r) % r + a;
}, Lp = (a, l, o) => (((1 - 3 * o + 3 * l) * a + (3 * o - 6 * l)) * a + 3 * l) * a, Vb = 1e-7, Nb = 12;
function Ub(a, l, o, r, c) {
  let d, h, y = 0;
  do
    h = l + (o - l) / 2, d = Lp(h, r, c) - a, d > 0 ? o = h : l = h;
  while (Math.abs(d) > Vb && ++y < Nb);
  return h;
}
// @__NO_SIDE_EFFECTS__
function pu(a, l, o, r) {
  if (a === l && o === r)
    return ln;
  const c = (d) => Ub(d, 0, 1, a, o);
  return (d) => d === 0 || d === 1 ? d : Lp(c(d), l, r);
}
const Hp = /* @__NO_SIDE_EFFECTS__ */ (a) => (l) => l <= 0.5 ? a(2 * l) / 2 : (2 - a(2 * (1 - l))) / 2, If = /* @__NO_SIDE_EFFECTS__ */ (a) => (l) => 1 - a(1 - l), jp = /* @__PURE__ */ pu(0.33, 1.53, 0.69, 0.99), $f = /* @__PURE__ */ If(jp), Yp = /* @__PURE__ */ Hp($f), qp = (a) => a >= 1 ? 1 : (a *= 2) < 1 ? 0.5 * $f(a) : 0.5 * (2 - Math.pow(2, -10 * (a - 1))), th = (a) => 1 - Math.sin(Math.acos(a)), Gp = /* @__PURE__ */ If(th), Xp = /* @__PURE__ */ Hp(th), wb = /* @__PURE__ */ pu(0.42, 0, 1, 1), Bb = /* @__PURE__ */ pu(0, 0, 0.58, 1), Qp = /* @__PURE__ */ pu(0.42, 0, 0.58, 1), Zp = /* @__NO_SIDE_EFFECTS__ */ (a) => Array.isArray(a) && typeof a[0] != "number";
// @__NO_SIDE_EFFECTS__
function Kp(a, l) {
  return /* @__PURE__ */ Zp(a) ? a[_b(0, a.length, l)] : a;
}
const Jp = /* @__NO_SIDE_EFFECTS__ */ (a) => Array.isArray(a) && typeof a[0] == "number", Lb = {
  linear: ln,
  easeIn: wb,
  easeInOut: Qp,
  easeOut: Bb,
  circIn: th,
  circInOut: Xp,
  circOut: Gp,
  backIn: $f,
  backInOut: Yp,
  backOut: jp,
  anticipate: qp
}, Hb = (a) => typeof a == "string", u0 = (a) => {
  if (/* @__PURE__ */ Jp(a)) {
    go(a.length === 4);
    const [l, o, r, c] = a;
    return /* @__PURE__ */ pu(l, o, r, c);
  } else if (Hb(a))
    return Lb[a];
  return a;
}, Js = [
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
function jb(a) {
  let l = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), r = !1, c = !1;
  const d = /* @__PURE__ */ new WeakSet();
  let h = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function y(S) {
    d.has(S) && (v.schedule(S), a()), S(h);
  }
  const v = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (S, p = !1, g = !1) => {
      const _ = g && r ? l : o;
      return p && d.add(S), _.add(S), S;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (S) => {
      o.delete(S), d.delete(S);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (S) => {
      if (h = S, r) {
        c = !0;
        return;
      }
      r = !0;
      const p = l;
      l = o, o = p, l.forEach(y), l.clear(), r = !1, c && (c = !1, v.process(S));
    }
  };
  return v;
}
const Yb = 40;
function Fp(a, l) {
  let o = !1, r = !0;
  const c = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, d = () => o = !0, h = Js.reduce((Q, B) => (Q[B] = jb(d), Q), {}), { setup: y, read: v, resolveKeyframes: S, preUpdate: p, update: g, preRender: b, render: _, postRender: z } = h, w = () => {
    const Q = Ci.useManualTiming, B = Q ? c.timestamp : performance.now();
    o = !1, Q || (c.delta = r ? 1e3 / 60 : Math.max(Math.min(B - c.timestamp, Yb), 1)), c.timestamp = B, c.isProcessing = !0, y.process(c), v.process(c), S.process(c), p.process(c), g.process(c), b.process(c), _.process(c), z.process(c), c.isProcessing = !1, o && l && (r = !1, a(w));
  }, U = () => {
    o = !0, r = !0, c.isProcessing || a(w);
  };
  return { schedule: Js.reduce((Q, B) => {
    const k = h[B];
    return Q[B] = (ot, Z = !1, q = !1) => (o || U(), k.schedule(ot, Z, q)), Q;
  }, {}), cancel: (Q) => {
    for (let B = 0; B < Js.length; B++)
      h[Js[B]].cancel(Q);
  }, state: c, steps: h };
}
const { schedule: jt, cancel: Pn, state: ve, steps: lf } = /* @__PURE__ */ Fp(typeof requestAnimationFrame < "u" ? requestAnimationFrame : ln, !0);
let Ws;
function qb() {
  Ws = void 0;
}
const xe = {
  now: () => (Ws === void 0 && xe.set(ve.isProcessing || Ci.useManualTiming ? ve.timestamp : performance.now()), Ws),
  set: (a) => {
    Ws = a, queueMicrotask(qb);
  }
}, Pp = (a) => (l) => typeof l == "string" && l.startsWith(a), kp = /* @__PURE__ */ Pp("--"), Gb = /* @__PURE__ */ Pp("var(--"), eh = (a) => Gb(a) ? Xb.test(a.split("/*")[0].trim()) : !1, Xb = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function s0(a) {
  return typeof a != "string" ? !1 : a.split("/*")[0].includes("var(--");
}
const ll = {
  test: (a) => typeof a == "number",
  parse: parseFloat,
  transform: (a) => a
}, fu = {
  ...ll,
  transform: (a) => Vn(0, 1, a)
}, Fs = {
  ...ll,
  default: 1
}, uu = (a) => Math.round(a * 1e5) / 1e5, nh = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function Qb(a) {
  return a == null;
}
const Zb = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, ih = (a, l) => (o) => !!(typeof o == "string" && Zb.test(o) && o.startsWith(a) || l && !Qb(o) && Object.prototype.hasOwnProperty.call(o, l)), Wp = (a, l, o) => (r) => {
  if (typeof r != "string")
    return r;
  const [c, d, h, y] = r.match(nh);
  return {
    [a]: parseFloat(c),
    [l]: parseFloat(d),
    [o]: parseFloat(h),
    alpha: y !== void 0 ? parseFloat(y) : 1
  };
}, Kb = (a) => Vn(0, 255, a), uf = {
  ...ll,
  transform: (a) => Math.round(Kb(a))
}, ta = {
  test: /* @__PURE__ */ ih("rgb", "red"),
  parse: /* @__PURE__ */ Wp("red", "green", "blue"),
  transform: ({ red: a, green: l, blue: o, alpha: r = 1 }) => "rgba(" + uf.transform(a) + ", " + uf.transform(l) + ", " + uf.transform(o) + ", " + uu(fu.transform(r)) + ")"
};
function Jb(a) {
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
  parse: Jb,
  transform: ta.transform
}, vu = /* @__NO_SIDE_EFFECTS__ */ (a) => ({
  test: (l) => typeof l == "string" && l.endsWith(a) && l.split(" ").length === 1,
  parse: parseFloat,
  transform: (l) => `${l}${a}`
}), Fn = /* @__PURE__ */ vu("deg"), _n = /* @__PURE__ */ vu("%"), nt = /* @__PURE__ */ vu("px"), Fb = /* @__PURE__ */ vu("vh"), Pb = /* @__PURE__ */ vu("vw"), o0 = {
  ..._n,
  parse: (a) => _n.parse(a) / 100,
  transform: (a) => _n.transform(a * 100)
}, $a = {
  test: /* @__PURE__ */ ih("hsl", "hue"),
  parse: /* @__PURE__ */ Wp("hue", "saturation", "lightness"),
  transform: ({ hue: a, saturation: l, lightness: o, alpha: r = 1 }) => "hsla(" + Math.round(a) + ", " + _n.transform(uu(l)) + ", " + _n.transform(uu(o)) + ", " + uu(fu.transform(r)) + ")"
}, ie = {
  test: (a) => ta.test(a) || Af.test(a) || $a.test(a),
  parse: (a) => ta.test(a) ? ta.parse(a) : $a.test(a) ? $a.parse(a) : Af.parse(a),
  transform: (a) => typeof a == "string" ? a : a.hasOwnProperty("red") ? ta.transform(a) : $a.transform(a),
  getAnimatableNone: (a) => {
    const l = ie.parse(a);
    return l.alpha = 0, ie.transform(l);
  }
}, kb = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Wb(a) {
  return isNaN(a) && typeof a == "string" && (a.match(nh)?.length || 0) + (a.match(kb)?.length || 0) > 0;
}
const Ip = "number", $p = "color", Ib = "var", $b = "var(", r0 = "${}", tE = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function al(a) {
  const l = a.toString(), o = [], r = {
    color: [],
    number: [],
    var: []
  }, c = [];
  let d = 0;
  const y = l.replace(tE, (v) => (ie.test(v) ? (r.color.push(d), c.push($p), o.push(ie.parse(v))) : v.startsWith($b) ? (r.var.push(d), c.push(Ib), o.push(v)) : (r.number.push(d), c.push(Ip), o.push(parseFloat(v))), ++d, r0)).split(r0);
  return { values: o, split: y, indexes: r, types: c };
}
function eE(a) {
  return al(a).values;
}
function tv({ split: a, types: l }) {
  const o = a.length;
  return (r) => {
    let c = "";
    for (let d = 0; d < o; d++)
      if (c += a[d], r[d] !== void 0) {
        const h = l[d];
        h === Ip ? c += uu(r[d]) : h === $p ? c += ie.transform(r[d]) : c += r[d];
      }
    return c;
  };
}
function nE(a) {
  return tv(al(a));
}
const iE = (a) => typeof a == "number" ? 0 : ie.test(a) ? ie.getAnimatableNone(a) : a, aE = (a, l) => typeof a == "number" ? l?.trim().endsWith("/") ? a : 0 : iE(a);
function lE(a) {
  const l = al(a);
  return tv(l)(l.values.map((r, c) => aE(r, l.split[c])));
}
const gn = {
  test: Wb,
  parse: eE,
  createTransformer: nE,
  getAnimatableNone: lE
};
function sf(a, l, o) {
  return o < 0 && (o += 1), o > 1 && (o -= 1), o < 1 / 6 ? a + (l - a) * 6 * o : o < 1 / 2 ? l : o < 2 / 3 ? a + (l - a) * (2 / 3 - o) * 6 : a;
}
function uE({ hue: a, saturation: l, lightness: o, alpha: r }) {
  a /= 360, l /= 100, o /= 100;
  let c = 0, d = 0, h = 0;
  if (!l)
    c = d = h = o;
  else {
    const y = o < 0.5 ? o * (1 + l) : o + l - o * l, v = 2 * o - y;
    c = sf(v, y, a + 1 / 3), d = sf(v, y, a), h = sf(v, y, a - 1 / 3);
  }
  return {
    red: Math.round(c * 255),
    green: Math.round(d * 255),
    blue: Math.round(h * 255),
    alpha: r
  };
}
function uo(a, l) {
  return (o) => o > 0 ? l : a;
}
const Ht = (a, l, o) => a + (l - a) * o, of = (a, l, o) => {
  const r = a * a, c = o * (l * l - r) + r;
  return c < 0 ? 0 : Math.sqrt(c);
}, sE = [Af, ta, $a], oE = (a) => sE.find((l) => l.test(a));
function c0(a) {
  const l = oE(a);
  if (!l)
    return !1;
  let o = l.parse(a);
  return l === $a && (o = uE(o)), o;
}
const f0 = (a, l) => {
  const o = c0(a), r = c0(l);
  if (!o || !r)
    return uo(a, l);
  const c = { ...o };
  return (d) => (c.red = of(o.red, r.red, d), c.green = of(o.green, r.green, d), c.blue = of(o.blue, r.blue, d), c.alpha = Ht(o.alpha, r.alpha, d), ta.transform(c));
}, Mf = /* @__PURE__ */ new Set(["none", "hidden"]);
function rE(a, l) {
  return Mf.has(a) ? (o) => o <= 0 ? a : l : (o) => o >= 1 ? l : a;
}
function cE(a, l) {
  return (o) => Ht(a, l, o);
}
function ah(a) {
  return typeof a == "number" ? cE : typeof a == "string" ? eh(a) ? uo : ie.test(a) ? f0 : dE : Array.isArray(a) ? ev : typeof a == "object" ? ie.test(a) ? f0 : fE : uo;
}
function ev(a, l) {
  const o = [...a], r = o.length, c = a.map((d, h) => ah(d)(d, l[h]));
  return (d) => {
    for (let h = 0; h < r; h++)
      o[h] = c[h](d);
    return o;
  };
}
function fE(a, l) {
  const o = { ...a, ...l }, r = {};
  for (const c in o)
    a[c] !== void 0 && l[c] !== void 0 && (r[c] = ah(a[c])(a[c], l[c]));
  return (c) => {
    for (const d in r)
      o[d] = r[d](c);
    return o;
  };
}
function hE(a, l) {
  const o = [], r = { color: 0, var: 0, number: 0 };
  for (let c = 0; c < l.values.length; c++) {
    const d = l.types[c], h = a.indexes[d][r[d]], y = a.values[h] ?? 0;
    o[c] = y, r[d]++;
  }
  return o;
}
const dE = (a, l) => {
  const o = gn.createTransformer(l), r = al(a), c = al(l);
  return r.indexes.var.length === c.indexes.var.length && r.indexes.color.length === c.indexes.color.length && r.indexes.number.length >= c.indexes.number.length ? Mf.has(a) && !c.values.length || Mf.has(l) && !r.values.length ? rE(a, l) : gu(ev(hE(r, c), c.values), o) : uo(a, l);
};
function nv(a, l, o) {
  return typeof a == "number" && typeof l == "number" && typeof o == "number" ? Ht(a, l, o) : ah(a)(a, l);
}
const mE = (a) => {
  const l = ({ timestamp: o }) => a(o);
  return {
    start: (o = !0) => jt.update(l, o),
    stop: () => Pn(l),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => ve.isProcessing ? ve.timestamp : xe.now()
  };
}, iv = (a, l, o = 10) => {
  let r = "";
  const c = Math.max(Math.round(l / o), 2);
  for (let d = 0; d < c; d++)
    r += Math.round(a(d / (c - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${r.substring(0, r.length - 2)})`;
}, so = 2e4;
function lh(a) {
  let l = 0;
  const o = 50;
  let r = a.next(l);
  for (; !r.done && l < so; )
    l += o, r = a.next(l);
  return l >= so ? 1 / 0 : l;
}
function av(a, l = 100, o) {
  const r = o({ ...a, keyframes: [0, l] }), c = Math.min(lh(r), so);
  return {
    type: "keyframes",
    ease: (d) => r.next(c * d).value / l,
    duration: /* @__PURE__ */ an(c)
  };
}
const kt = {
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
function Df(a, l) {
  return a * Math.sqrt(1 - l * l);
}
const yE = 12;
function gE(a, l, o) {
  let r = o;
  for (let c = 1; c < yE; c++)
    r = r - a(r) / l(r);
  return r;
}
const rf = 1e-3;
function pE({ duration: a = kt.duration, bounce: l = kt.bounce, velocity: o = kt.velocity, mass: r = kt.mass }) {
  let c, d, h = 1 - l;
  h = Vn(kt.minDamping, kt.maxDamping, h), a = Vn(kt.minDuration, kt.maxDuration, /* @__PURE__ */ an(a)), h < 1 ? (c = (S) => {
    const p = S * h, g = p * a, b = p - o, _ = Df(S, h), z = Math.exp(-g);
    return rf - b / _ * z;
  }, d = (S) => {
    const g = S * h * a, b = g * o + o, _ = Math.pow(h, 2) * Math.pow(S, 2) * a, z = Math.exp(-g), w = Df(Math.pow(S, 2), h);
    return (-c(S) + rf > 0 ? -1 : 1) * ((b - _) * z) / w;
  }) : (c = (S) => {
    const p = Math.exp(-S * a), g = (S - o) * a + 1;
    return -rf + p * g;
  }, d = (S) => {
    const p = Math.exp(-S * a), g = (o - S) * (a * a);
    return p * g;
  });
  const y = 5 / a, v = gE(c, d, y);
  if (a = /* @__PURE__ */ Be(a), isNaN(v))
    return {
      stiffness: kt.stiffness,
      damping: kt.damping,
      duration: a
    };
  {
    const S = Math.pow(v, 2) * r;
    return {
      stiffness: S,
      damping: h * 2 * Math.sqrt(r * S),
      duration: a
    };
  }
}
const vE = ["duration", "bounce"], SE = ["stiffness", "damping", "mass"];
function h0(a, l) {
  return l.some((o) => a[o] !== void 0);
}
function TE(a) {
  let l = {
    velocity: kt.velocity,
    stiffness: kt.stiffness,
    damping: kt.damping,
    mass: kt.mass,
    isResolvedFromDuration: !1,
    ...a
  };
  if (!h0(a, SE) && h0(a, vE))
    if (l.velocity = 0, a.visualDuration) {
      const o = a.visualDuration, r = 2 * Math.PI / (o * 1.2), c = r * r, d = 2 * Vn(0.05, 1, 1 - (a.bounce || 0)) * Math.sqrt(c);
      l = {
        ...l,
        mass: kt.mass,
        stiffness: c,
        damping: d
      };
    } else {
      const o = pE({ ...a, velocity: 0 });
      l = {
        ...l,
        ...o,
        mass: kt.mass
      }, l.isResolvedFromDuration = !0;
    }
  return l;
}
function hu(a = kt.visualDuration, l = kt.bounce) {
  const o = typeof a != "object" ? {
    visualDuration: a,
    keyframes: [0, 1],
    bounce: l
  } : a;
  let { restSpeed: r, restDelta: c } = o;
  const d = o.keyframes[0], h = o.keyframes[o.keyframes.length - 1], y = { done: !1, value: d }, { stiffness: v, damping: S, mass: p, duration: g, velocity: b, isResolvedFromDuration: _ } = TE({
    ...o,
    velocity: -/* @__PURE__ */ an(o.velocity || 0)
  }), z = b || 0, w = S / (2 * Math.sqrt(v * p)), U = h - d, L = /* @__PURE__ */ an(Math.sqrt(v / p)), j = Math.abs(U) < 5;
  r || (r = j ? kt.restSpeed.granular : kt.restSpeed.default), c || (c = j ? kt.restDelta.granular : kt.restDelta.default);
  let Q, B, k, ot, Z, q;
  if (w < 1)
    k = Df(L, w), ot = (z + w * L * U) / k, Q = (J) => {
      const ct = Math.exp(-w * L * J);
      return h - ct * (ot * Math.sin(k * J) + U * Math.cos(k * J));
    }, Z = w * L * ot + U * k, q = w * L * U - ot * k, B = (J) => Math.exp(-w * L * J) * (Z * Math.sin(k * J) + q * Math.cos(k * J));
  else if (w === 1) {
    Q = (ct) => h - Math.exp(-L * ct) * (U + (z + L * U) * ct);
    const J = z + L * U;
    B = (ct) => Math.exp(-L * ct) * (L * J * ct - z);
  } else {
    const J = L * Math.sqrt(w * w - 1);
    Q = (Ot) => {
      const Tt = Math.exp(-w * L * Ot), G = Math.min(J * Ot, 300);
      return h - Tt * ((z + w * L * U) * Math.sinh(G) + J * U * Math.cosh(G)) / J;
    };
    const ct = (z + w * L * U) / J, gt = w * L * ct - U * J, Yt = w * L * U - ct * J;
    B = (Ot) => {
      const Tt = Math.exp(-w * L * Ot), G = Math.min(J * Ot, 300);
      return Tt * (gt * Math.sinh(G) + Yt * Math.cosh(G));
    };
  }
  const st = {
    calculatedDuration: _ && g || null,
    velocity: (J) => /* @__PURE__ */ Be(B(J)),
    next: (J) => {
      if (!_ && w < 1) {
        const gt = Math.exp(-w * L * J), Yt = Math.sin(k * J), Ot = Math.cos(k * J), Tt = h - gt * (ot * Yt + U * Ot), G = /* @__PURE__ */ Be(gt * (Z * Yt + q * Ot));
        return y.done = Math.abs(G) <= r && Math.abs(h - Tt) <= c, y.value = y.done ? h : Tt, y;
      }
      const ct = Q(J);
      if (_)
        y.done = J >= g;
      else {
        const gt = /* @__PURE__ */ Be(B(J));
        y.done = Math.abs(gt) <= r && Math.abs(h - ct) <= c;
      }
      return y.value = y.done ? h : ct, y;
    },
    toString: () => {
      const J = Math.min(lh(st), so), ct = iv((gt) => st.next(J * gt).value, J, 30);
      return J + "ms " + ct;
    },
    toTransition: () => {
    }
  };
  return st;
}
hu.applyToOptions = (a) => {
  const l = av(a, 100, hu);
  return a.ease = l.ease, a.duration = /* @__PURE__ */ Be(l.duration), a.type = "keyframes", a;
};
const bE = 5;
function lv(a, l, o) {
  const r = Math.max(l - bE, 0);
  return /* @__PURE__ */ Bp(o - a(r), l - r);
}
function Cf({ keyframes: a, velocity: l = 0, power: o = 0.8, timeConstant: r = 325, bounceDamping: c = 10, bounceStiffness: d = 500, modifyTarget: h, min: y, max: v, restDelta: S = 0.5, restSpeed: p }) {
  const g = a[0], b = {
    done: !1,
    value: g
  }, _ = (q) => y !== void 0 && q < y || v !== void 0 && q > v, z = (q) => y === void 0 ? v : v === void 0 || Math.abs(y - q) < Math.abs(v - q) ? y : v;
  let w = o * l;
  const U = g + w, L = h === void 0 ? U : h(U);
  L !== U && (w = L - g);
  const j = (q) => -w * Math.exp(-q / r), Q = (q) => L + j(q), B = (q) => {
    const st = j(q), J = Q(q);
    b.done = Math.abs(st) <= S, b.value = b.done ? L : J;
  };
  let k, ot;
  const Z = (q) => {
    _(b.value) && (k = q, ot = hu({
      keyframes: [b.value, z(b.value)],
      velocity: lv(Q, q, b.value),
      // TODO: This should be passing * 1000
      damping: c,
      stiffness: d,
      restDelta: S,
      restSpeed: p
    }));
  };
  return Z(0), {
    calculatedDuration: null,
    next: (q) => {
      let st = !1;
      return !ot && k === void 0 && (st = !0, B(q), Z(q)), k !== void 0 && q >= k ? ot.next(q - k) : (!st && B(q), b);
    }
  };
}
function EE(a, l, o) {
  const r = [], c = o || Ci.mix || nv, d = a.length - 1;
  for (let h = 0; h < d; h++) {
    let y = c(a[h], a[h + 1]);
    if (l) {
      const v = Array.isArray(l) ? l[h] || ln : l;
      y = gu(v, y);
    }
    r.push(y);
  }
  return r;
}
function uv(a, l, { clamp: o = !0, ease: r, mixer: c } = {}) {
  const d = a.length;
  if (go(d === l.length), d === 1)
    return () => l[0];
  if (d === 2 && l[0] === l[1])
    return () => l[1];
  const h = a[0] === a[1];
  a[0] > a[d - 1] && (a = [...a].reverse(), l = [...l].reverse());
  const y = EE(l, r, c), v = y.length, S = (p) => {
    if (h && p < a[0])
      return l[0];
    let g = 0;
    if (v > 1)
      for (; g < a.length - 2 && !(p < a[g + 1]); g++)
        ;
    const b = /* @__PURE__ */ il(a[g], a[g + 1], p);
    return y[g](b);
  };
  return o ? (p) => S(Vn(a[0], a[d - 1], p)) : S;
}
function sv(a, l) {
  const o = a[a.length - 1];
  for (let r = 1; r <= l; r++) {
    const c = /* @__PURE__ */ il(0, l, r);
    a.push(Ht(o, 1, c));
  }
}
function ov(a) {
  const l = [0];
  return sv(l, a.length - 1), l;
}
function AE(a, l) {
  return a.map((o) => o * l);
}
function ME(a, l) {
  return a.map(() => l || Qp).splice(0, a.length - 1);
}
function su({ duration: a = 300, keyframes: l, times: o, ease: r = "easeInOut" }) {
  const c = /* @__PURE__ */ Zp(r) ? r.map(u0) : u0(r), d = {
    done: !1,
    value: l[0]
  }, h = AE(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    o && o.length === l.length ? o : ov(l),
    a
  ), y = uv(h, l, {
    ease: Array.isArray(c) ? c : ME(l, c)
  });
  return {
    calculatedDuration: a,
    next: (v) => (d.value = y(v), d.done = v >= a, d)
  };
}
const DE = (a) => a !== null;
function po(a, { repeat: l, repeatType: o = "loop" }, r, c = 1) {
  const d = a.filter(DE), y = c < 0 || l && o !== "loop" && l % 2 === 1 ? 0 : d.length - 1;
  return !y || r === void 0 ? d[y] : r;
}
const CE = {
  decay: Cf,
  inertia: Cf,
  tween: su,
  keyframes: su,
  spring: hu
};
function rv(a) {
  typeof a.type == "string" && (a.type = CE[a.type]);
}
class uh {
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
const xE = (a) => a / 100;
class oo extends uh {
  constructor(l) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: o } = this.options;
      o && o.updatedAt !== xe.now() && this.tick(xe.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = l, this.initAnimation(), this.play(), l.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: l } = this;
    rv(l);
    const { type: o = su, repeat: r = 0, repeatDelay: c = 0, repeatType: d, velocity: h = 0 } = l;
    let { keyframes: y } = l;
    const v = o || su;
    v !== su && typeof y[0] != "number" && (this.mixKeyframes = gu(xE, nv(y[0], y[1])), y = [0, 100]);
    const S = v({ ...l, keyframes: y });
    d === "mirror" && (this.mirroredGenerator = v({
      ...l,
      keyframes: [...y].reverse(),
      velocity: -h
    })), S.calculatedDuration === null && (S.calculatedDuration = lh(S));
    const { calculatedDuration: p } = S;
    this.calculatedDuration = p, this.resolvedDuration = p + c, this.totalDuration = this.resolvedDuration * (r + 1) - c, this.generator = S;
  }
  updateTime(l) {
    const o = Math.round(l - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = o;
  }
  tick(l, o = !1) {
    const { generator: r, totalDuration: c, mixKeyframes: d, mirroredGenerator: h, resolvedDuration: y, calculatedDuration: v } = this;
    if (this.startTime === null)
      return r.next(0);
    const { delay: S = 0, keyframes: p, repeat: g, repeatType: b, repeatDelay: _, type: z, onUpdate: w, finalKeyframe: U } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, l) : this.speed < 0 && (this.startTime = Math.min(l - c / this.speed, this.startTime)), o ? this.currentTime = l : this.updateTime(l);
    const L = this.currentTime - S * (this.playbackSpeed >= 0 ? 1 : -1), j = this.playbackSpeed >= 0 ? L < 0 : L > c;
    this.currentTime = Math.max(L, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = c);
    let Q = this.currentTime, B = r;
    if (g) {
      const q = Math.min(this.currentTime, c) / y;
      let st = Math.floor(q), J = q % 1;
      !J && q >= 1 && (J = 1), J === 1 && st--, st = Math.min(st, g + 1), st % 2 && (b === "reverse" ? (J = 1 - J, _ && (J -= _ / y)) : b === "mirror" && (B = h)), Q = Vn(0, 1, J) * y;
    }
    let k;
    j ? (this.delayState.value = p[0], k = this.delayState) : k = B.next(Q), d && !j && (k.value = d(k.value));
    let { done: ot } = k;
    !j && v !== null && (ot = this.playbackSpeed >= 0 ? this.currentTime >= c : this.currentTime <= 0);
    const Z = this.holdTime === null && (this.state === "finished" || this.state === "running" && ot);
    return Z && z !== Cf && (k.value = po(p, this.options, U, this.speed)), w && w(k.value), Z && this.finish(), k;
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
    return /* @__PURE__ */ an(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: l = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ an(l);
  }
  get time() {
    return /* @__PURE__ */ an(this.currentTime);
  }
  set time(l) {
    l = /* @__PURE__ */ Be(l), this.currentTime = l, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = l : this.driver && (this.startTime = this.driver.now() - l / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = l, this.tick(l));
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
    return lv((r) => this.generator.next(r).value, l, o);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(l) {
    const o = this.playbackSpeed !== l;
    o && this.driver && this.updateTime(xe.now()), this.playbackSpeed = l, o && this.driver && (this.time = /* @__PURE__ */ an(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: l = mE, startTime: o } = this.options;
    this.driver || (this.driver = l((c) => this.tick(c))), this.options.onPlay?.();
    const r = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = r) : this.holdTime !== null ? this.startTime = r - this.holdTime : this.startTime || (this.startTime = o ?? r), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(xe.now()), this.holdTime = this.currentTime;
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
function OE(a) {
  for (let l = 1; l < a.length; l++)
    a[l] ?? (a[l] = a[l - 1]);
}
const ea = (a) => a * 180 / Math.PI, xf = (a) => {
  const l = ea(Math.atan2(a[1], a[0]));
  return Of(l);
}, RE = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (a) => (Math.abs(a[0]) + Math.abs(a[3])) / 2,
  rotate: xf,
  rotateZ: xf,
  skewX: (a) => ea(Math.atan(a[1])),
  skewY: (a) => ea(Math.atan(a[2])),
  skew: (a) => (Math.abs(a[1]) + Math.abs(a[2])) / 2
}, Of = (a) => (a = a % 360, a < 0 && (a += 360), a), d0 = xf, m0 = (a) => Math.sqrt(a[0] * a[0] + a[1] * a[1]), y0 = (a) => Math.sqrt(a[4] * a[4] + a[5] * a[5]), zE = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: m0,
  scaleY: y0,
  scale: (a) => (m0(a) + y0(a)) / 2,
  rotateX: (a) => Of(ea(Math.atan2(a[6], a[5]))),
  rotateY: (a) => Of(ea(Math.atan2(-a[2], a[0]))),
  rotateZ: d0,
  rotate: d0,
  skewX: (a) => ea(Math.atan(a[4])),
  skewY: (a) => ea(Math.atan(a[1])),
  skew: (a) => (Math.abs(a[1]) + Math.abs(a[4])) / 2
};
function Rf(a) {
  return a.includes("scale") ? 1 : 0;
}
function zf(a, l) {
  if (!a || a === "none")
    return Rf(l);
  const o = a.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let r, c;
  if (o)
    r = zE, c = o;
  else {
    const y = a.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    r = RE, c = y;
  }
  if (!c)
    return Rf(l);
  const d = r[l], h = c[1].split(",").map(VE);
  return typeof d == "function" ? d(h) : h[d];
}
const _E = (a, l) => {
  const { transform: o = "none" } = getComputedStyle(a);
  return zf(o, l);
};
function VE(a) {
  return parseFloat(a.trim());
}
const ul = [
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
], sl = /* @__PURE__ */ new Set([...ul, "pathRotation"]), g0 = (a) => a === ll || a === nt, NE = /* @__PURE__ */ new Set(["x", "y", "z"]), UE = ul.filter((a) => !NE.has(a));
function wE(a) {
  const l = [];
  return UE.forEach((o) => {
    const r = a.getValue(o);
    r !== void 0 && (l.push([o, r.get()]), r.set(o.startsWith("scale") ? 1 : 0));
  }), l;
}
const Di = {
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
  x: (a, { transform: l }) => zf(l, "x"),
  y: (a, { transform: l }) => zf(l, "y")
};
Di.translateX = Di.x;
Di.translateY = Di.y;
const na = /* @__PURE__ */ new Set();
let _f = !1, Vf = !1, Nf = !1;
function cv() {
  if (Vf) {
    const a = Array.from(na).filter((r) => r.needsMeasurement), l = new Set(a.map((r) => r.element)), o = /* @__PURE__ */ new Map();
    l.forEach((r) => {
      const c = wE(r);
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
  Vf = !1, _f = !1, na.forEach((a) => a.complete(Nf)), na.clear();
}
function fv() {
  na.forEach((a) => {
    a.readKeyframes(), a.needsMeasurement && (Vf = !0);
  });
}
function BE() {
  Nf = !0, fv(), cv(), Nf = !1;
}
class sh {
  constructor(l, o, r, c, d, h = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...l], this.onComplete = o, this.name = r, this.motionValue = c, this.element = d, this.isAsync = h;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (na.add(this), _f || (_f = !0, jt.read(fv), jt.resolveKeyframes(cv))) : (this.readKeyframes(), this.complete());
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
    OE(l);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, l), na.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (na.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const LE = (a) => a.startsWith("--");
function hv(a, l, o) {
  LE(l) ? a.style.setProperty(l, o) : a.style[l] = o;
}
const HE = {};
function dv(a, l) {
  const o = /* @__PURE__ */ wp(a);
  return () => HE[l] ?? o();
}
const jE = /* @__PURE__ */ dv(() => window.ScrollTimeline !== void 0, "scrollTimeline"), mv = /* @__PURE__ */ dv(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), lu = ([a, l, o, r]) => `cubic-bezier(${a}, ${l}, ${o}, ${r})`, p0 = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ lu([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ lu([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ lu([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ lu([0.33, 1.53, 0.69, 0.99])
};
function yv(a, l) {
  if (a)
    return typeof a == "function" ? mv() ? iv(a, l) : "ease-out" : /* @__PURE__ */ Jp(a) ? lu(a) : Array.isArray(a) ? a.map((o) => yv(o, l) || p0.easeOut) : p0[a];
}
function YE(a, l, o, { delay: r = 0, duration: c = 300, repeat: d = 0, repeatType: h = "loop", ease: y = "easeOut", times: v } = {}, S = void 0) {
  const p = {
    [l]: o
  };
  v && (p.offset = v);
  const g = yv(y, c);
  Array.isArray(g) && (p.easing = g);
  const b = {
    delay: r,
    duration: c,
    easing: Array.isArray(g) ? "linear" : g,
    fill: "both",
    iterations: d + 1,
    direction: h === "reverse" ? "alternate" : "normal"
  };
  return S && (b.pseudoElement = S), a.animate(p, b);
}
function oh(a) {
  return typeof a == "function" && "applyToOptions" in a;
}
function qE({ type: a, ...l }) {
  return oh(a) && mv() ? a.applyToOptions(l) : (l.duration ?? (l.duration = 300), l.ease ?? (l.ease = "easeOut"), l);
}
class gv extends uh {
  constructor(l) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !l)
      return;
    const { element: o, name: r, keyframes: c, pseudoElement: d, allowFlatten: h = !1, finalKeyframe: y, onComplete: v } = l;
    this.isPseudoElement = !!d, this.allowFlatten = h, this.options = l, go(typeof l.type != "string");
    const S = qE(l);
    this.animation = YE(o, r, c, S, d), S.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !d) {
        const p = po(c, this.options, y, this.speed);
        this.updateMotionValue && this.updateMotionValue(p), hv(o, r, p), this.animation.cancel();
      }
      v?.(), this.notifyFinished();
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
    return /* @__PURE__ */ an(Number(l));
  }
  get iterationDuration() {
    const { delay: l = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ an(l);
  }
  get time() {
    return /* @__PURE__ */ an(Number(this.animation.currentTime) || 0);
  }
  set time(l) {
    const o = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ Be(l), o && this.animation.pause();
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, l && jE() ? (this.animation.timeline = l, o && (this.animation.rangeStart = o), r && (this.animation.rangeEnd = r), ln) : c(this);
  }
}
const pv = {
  anticipate: qp,
  backInOut: Yp,
  circInOut: Xp
};
function GE(a) {
  return a in pv;
}
function XE(a) {
  typeof a.ease == "string" && GE(a.ease) && (a.ease = pv[a.ease]);
}
const cf = 10;
class QE extends gv {
  constructor(l) {
    XE(l), rv(l), super(l), l.startTime !== void 0 && l.autoplay !== !1 && (this.startTime = l.startTime), this.options = l;
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
    const y = new oo({
      ...h,
      autoplay: !1
    }), v = Math.max(cf, xe.now() - this.startTime), S = Vn(0, cf, v - cf), p = y.sample(v).value, { name: g } = this.options;
    d && g && hv(d, g, p), o.setWithVelocity(y.sample(Math.max(0, v - S)).value, p, S), y.stop();
  }
}
const v0 = (a, l) => l === "zIndex" ? !1 : !!(typeof a == "number" || Array.isArray(a) || typeof a == "string" && // It's animatable if we have a string
(gn.test(a) || a === "0") && // And it contains numbers and/or colors
!a.startsWith("url("));
function ZE(a) {
  const l = a[0];
  if (a.length === 1)
    return !0;
  for (let o = 0; o < a.length; o++)
    if (a[o] !== l)
      return !0;
}
function KE(a, l, o, r) {
  const c = a[0];
  if (c === null)
    return !1;
  if (l === "display" || l === "visibility")
    return !0;
  const d = a[a.length - 1], h = v0(c, l), y = v0(d, l);
  return !h || !y ? !1 : ZE(a) || (o === "spring" || oh(o)) && r;
}
function Uf(a) {
  a.duration = 0, a.type = "keyframes";
}
const vv = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform",
  "backgroundColor"
]), JE = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function FE(a) {
  for (let l = 0; l < a.length; l++)
    if (typeof a[l] == "string" && JE.test(a[l]))
      return !0;
  return !1;
}
const PE = /* @__PURE__ */ new Set([
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
]), kE = /* @__PURE__ */ wp(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function WE(a) {
  const { motionValue: l, name: o, repeatDelay: r, repeatType: c, damping: d, type: h, keyframes: y } = a, v = l?.owner?.current;
  if (!(v instanceof HTMLElement) && !(v instanceof SVGElement))
    return !1;
  const { onUpdate: S, transformTemplate: p } = l.owner.getProps();
  return kE() && o && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (vv.has(o) || PE.has(o) && FE(y)) && (o !== "transform" || !p) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !S && !r && c !== "mirror" && d !== 0 && h !== "inertia";
}
const IE = 40;
class $E extends uh {
  constructor({ autoplay: l = !0, delay: o = 0, type: r = "keyframes", repeat: c = 0, repeatDelay: d = 0, repeatType: h = "loop", keyframes: y, name: v, motionValue: S, element: p, ...g }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = xe.now();
    const b = {
      autoplay: l,
      delay: o,
      type: r,
      repeat: c,
      repeatDelay: d,
      repeatType: h,
      name: v,
      motionValue: S,
      element: p,
      ...g
    }, _ = p?.KeyframeResolver || sh;
    this.keyframeResolver = new _(y, (z, w, U) => this.onKeyframesResolved(z, w, b, !U), v, S, p), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(l, o, r, c) {
    this.keyframeResolver = void 0;
    const { name: d, type: h, velocity: y, delay: v, isHandoff: S, onUpdate: p } = r;
    this.resolvedAt = xe.now();
    let g = !0;
    KE(l, d, h, y) || (g = !1, (Ci.instantAnimations || !v) && p?.(po(l, r, o)), l[0] = l[l.length - 1], Uf(r), r.repeat = 0);
    const _ = {
      startTime: c ? this.resolvedAt ? this.resolvedAt - this.createdAt > IE ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: o,
      ...r,
      keyframes: l
    }, z = g && !S && WE(_), w = _.motionValue?.owner?.current;
    let U;
    if (z)
      try {
        U = new QE({
          ..._,
          element: w
        });
      } catch {
        U = new oo(_);
      }
    else
      U = new oo(_);
    U.finished.then(() => {
      this.notifyFinished();
    }).catch(ln), this.pendingTimeline && (this.stopTimeline = U.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = U;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(l, o) {
    return this.finished.finally(l).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), BE()), this._animation;
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
class tA {
  constructor(l) {
    this.stop = () => this.runAll("stop"), this.animations = l.filter(Boolean);
  }
  get finished() {
    return Promise.all(this.animations.map((l) => l.finished));
  }
  /**
   * TODO: Filter out cancelled or stopped animations before returning
   */
  getAll(l) {
    return this.animations[0][l];
  }
  setAll(l, o) {
    for (let r = 0; r < this.animations.length; r++)
      this.animations[r][l] = o;
  }
  attachTimeline(l) {
    const o = this.animations.map((r) => r.attachTimeline(l));
    return () => {
      o.forEach((r, c) => {
        r && r(), this.animations[c].stop();
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(l) {
    this.setAll("time", l);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(l) {
    this.setAll("speed", l);
  }
  get state() {
    return this.getAll("state");
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    return S0(this.animations, "duration");
  }
  get iterationDuration() {
    return S0(this.animations, "iterationDuration");
  }
  runAll(l) {
    this.animations.forEach((o) => o[l]());
  }
  play() {
    this.runAll("play");
  }
  pause() {
    this.runAll("pause");
  }
  cancel() {
    this.runAll("cancel");
  }
  complete() {
    this.runAll("complete");
  }
}
function S0(a, l) {
  let o = 0;
  for (let r = 0; r < a.length; r++) {
    const c = a[r][l];
    c !== null && c > o && (o = c);
  }
  return o;
}
class eA extends tA {
  then(l, o) {
    return this.finished.finally(l).then(() => {
    });
  }
}
function Sv(a, l, o, r = 0, c = 1) {
  const d = Array.from(a).sort((S, p) => S.sortNodePosition(p)).indexOf(l), h = a.size, y = (h - 1) * r;
  return typeof o == "function" ? o(d, h) : c === 1 ? d * r : y - d * r;
}
const T0 = 30, nA = (a) => !isNaN(parseFloat(a)), ou = {
  current: void 0
};
class iA {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(l, o = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (r) => {
      const c = xe.now();
      if (this.updatedAt !== c && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(r), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const d of this.dependents)
          d.dirty();
    }, this.hasAnimated = !1, this.setCurrent(l), this.owner = o.owner;
  }
  setCurrent(l) {
    this.current = l, this.updatedAt = xe.now(), this.canTrackVelocity === null && l !== void 0 && (this.canTrackVelocity = nA(this.current));
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
      r(), jt.read(() => {
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
    return ou.current && ou.current.push(this), this.current;
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
    const l = xe.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || l - this.updatedAt > T0)
      return 0;
    const o = Math.min(this.updatedAt - this.prevUpdatedAt, T0);
    return /* @__PURE__ */ Bp(parseFloat(this.current) - parseFloat(this.prevFrameValue), o);
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
function xi(a, l) {
  return new iA(a, l);
}
function Tv(a, l) {
  if (a?.inherit && l) {
    const { inherit: o, ...r } = a;
    return { ...l, ...r };
  }
  return a;
}
function rh(a, l) {
  const o = a?.[l] ?? a?.default ?? a;
  return o !== a ? Tv(o, a) : o;
}
const aA = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, lA = (a) => ({
  type: "spring",
  stiffness: 550,
  damping: a === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), uA = {
  type: "keyframes",
  duration: 0.8
}, sA = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, oA = (a, { keyframes: l }) => l.length > 2 ? uA : sl.has(a) ? a.startsWith("scale") ? lA(l[1]) : aA : sA, rA = /* @__PURE__ */ new Set([
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
function cA(a) {
  for (const l in a)
    if (!rA.has(l))
      return !0;
  return !1;
}
const ch = (a, l, o, r = {}, c, d) => (h) => {
  const y = rh(r, a) || {}, v = y.delay || r.delay || 0;
  let { elapsed: S = 0 } = r;
  S = S - /* @__PURE__ */ Be(v);
  const p = {
    keyframes: Array.isArray(o) ? o : [null, o],
    ease: "easeOut",
    velocity: l.getVelocity(),
    ...y,
    delay: -S,
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
  cA(y) || Object.assign(p, oA(a, p)), p.duration && (p.duration = /* @__PURE__ */ Be(p.duration)), p.repeatDelay && (p.repeatDelay = /* @__PURE__ */ Be(p.repeatDelay)), p.from !== void 0 && (p.keyframes[0] = p.from);
  let g = !1;
  if ((p.type === !1 || p.duration === 0 && !p.repeatDelay) && (Uf(p), p.delay === 0 && (g = !0)), (Ci.instantAnimations || Ci.skipAnimations || c?.shouldSkipAnimations || y.skipAnimations) && (g = !0, Uf(p), p.delay = 0), p.allowFlatten = !y.type && !y.ease, g && !d && l.get() !== void 0) {
    const b = po(p.keyframes, y);
    if (b !== void 0) {
      jt.update(() => {
        p.onUpdate(b), p.onComplete();
      });
      return;
    }
  }
  return y.isSync ? new oo(p) : new $E(p);
}, fA = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function hA(a) {
  const l = fA.exec(a);
  if (!l)
    return [,];
  const [, o, r, c] = l;
  return [`--${o ?? r}`, c];
}
function bv(a, l, o = 1) {
  const [r, c] = hA(a);
  if (!r)
    return;
  const d = window.getComputedStyle(l).getPropertyValue(r);
  if (d) {
    const h = d.trim();
    return Vp(h) ? parseFloat(h) : h;
  }
  return eh(c) ? bv(c, l, o + 1) : c;
}
function b0(a) {
  const l = [{}, {}];
  return a?.values.forEach((o, r) => {
    l[0][r] = o.get(), l[1][r] = o.getVelocity();
  }), l;
}
function fh(a, l, o, r) {
  if (typeof l == "function") {
    const [c, d] = b0(r);
    l = l(o !== void 0 ? o : a.custom, c, d);
  }
  if (typeof l == "string" && (l = a.variants && a.variants[l]), typeof l == "function") {
    const [c, d] = b0(r);
    l = l(o !== void 0 ? o : a.custom, c, d);
  }
  return l;
}
function ia(a, l, o) {
  const r = a.getProps();
  return fh(r, l, o !== void 0 ? o : r.custom, a);
}
const Ev = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...ul
]), wf = (a) => Array.isArray(a);
function dA(a, l, o) {
  a.hasValue(l) ? a.getValue(l).set(o) : a.addValue(l, xi(o));
}
function mA(a) {
  return wf(a) ? a[a.length - 1] || 0 : a;
}
function yA(a, l) {
  const o = ia(a, l);
  let { transitionEnd: r = {}, transition: c = {}, ...d } = o || {};
  d = { ...d, ...r };
  for (const h in d) {
    const y = mA(d[h]);
    dA(a, h, y);
  }
}
const le = (a) => !!(a && a.getVelocity);
function gA(a) {
  return !!(le(a) && a.add);
}
function Bf(a, l) {
  const o = a.getValue("willChange");
  if (gA(o))
    return o.add(l);
  if (!o && Ci.WillChange) {
    const r = new Ci.WillChange("auto");
    a.addValue("willChange", r), r.add(l);
  }
}
function hh(a) {
  return a.replace(/([A-Z])/g, (l) => `-${l.toLowerCase()}`);
}
const pA = "framerAppearId", Av = "data-" + hh(pA);
function Mv(a) {
  return a.props[Av];
}
function vA({ protectedKeys: a, needsAnimating: l }, o) {
  const r = a.hasOwnProperty(o) && l[o] !== !0;
  return l[o] = !1, r;
}
function dh(a, l, { delay: o = 0, transitionOverride: r, type: c } = {}) {
  let { transition: d, transitionEnd: h, ...y } = l;
  const v = a.getDefaultTransition();
  d = d ? Tv(d, v) : v;
  const S = d?.reduceMotion, p = d?.skipAnimations;
  r && (d = r);
  const g = [], b = c && a.animationState && a.animationState.getState()[c], _ = d?.path;
  _ && _.animateVisualElement(a, y, d, o, g);
  for (const z in y) {
    const w = a.getValue(z, a.latestValues[z] ?? null), U = y[z];
    if (U === void 0 || b && vA(b, z))
      continue;
    const L = {
      delay: o,
      ...rh(d || {}, z)
    };
    p && (L.skipAnimations = !0);
    const j = w.get();
    if (j !== void 0 && !w.isAnimating() && !Array.isArray(U) && U === j && !L.velocity) {
      jt.update(() => w.set(U));
      continue;
    }
    let Q = !1;
    if (window.MotionHandoffAnimation) {
      const ot = Mv(a);
      if (ot) {
        const Z = window.MotionHandoffAnimation(ot, z, jt);
        Z !== null && (L.startTime = Z, Q = !0);
      }
    }
    Bf(a, z);
    const B = S ?? a.shouldReduceMotion;
    w.start(ch(z, w, U, B && Ev.has(z) ? { type: !1 } : L, a, Q));
    const k = w.animation;
    k && g.push(k);
  }
  if (h) {
    const z = () => jt.update(() => {
      h && yA(a, h);
    });
    g.length ? Promise.all(g).then(z) : z();
  }
  return g;
}
function Lf(a, l, o = {}) {
  const r = ia(a, l, o.type === "exit" ? a.presenceContext?.custom : void 0);
  let { transition: c = a.getDefaultTransition() || {} } = r || {};
  o.transitionOverride && (c = o.transitionOverride);
  const d = r ? () => Promise.all(dh(a, r, o)) : () => Promise.resolve(), h = a.variantChildren && a.variantChildren.size ? (v = 0) => {
    const { delayChildren: S = 0, staggerChildren: p, staggerDirection: g } = c;
    return SA(a, l, v, S, p, g, o);
  } : () => Promise.resolve(), { when: y } = c;
  if (y) {
    const [v, S] = y === "beforeChildren" ? [d, h] : [h, d];
    return v().then(() => S());
  } else
    return Promise.all([d(), h(o.delay)]);
}
function SA(a, l, o = 0, r = 0, c = 0, d = 1, h) {
  const y = [];
  for (const v of a.variantChildren)
    v.notify("AnimationStart", l), y.push(Lf(v, l, {
      ...h,
      delay: o + (typeof r == "function" ? 0 : r) + Sv(a.variantChildren, v, r, c, d)
    }).then(() => v.notify("AnimationComplete", l)));
  return Promise.all(y);
}
function TA(a, l, o = {}) {
  a.notify("AnimationStart", l);
  let r;
  if (Array.isArray(l)) {
    const c = l.map((d) => Lf(a, d, o));
    r = Promise.all(c);
  } else if (typeof l == "string")
    r = Lf(a, l, o);
  else {
    const c = typeof l == "function" ? ia(a, l, o.custom) : l;
    r = Promise.all(dh(a, c, o));
  }
  return r.then(() => {
    a.notify("AnimationComplete", l);
  });
}
const bA = {
  test: (a) => a === "auto",
  parse: (a) => a
}, Dv = (a) => (l) => l.test(a), Cv = [ll, nt, _n, Fn, Pb, Fb, bA], E0 = (a) => Cv.find(Dv(a));
function EA(a) {
  return typeof a == "number" ? a === 0 : a !== null ? a === "none" || a === "0" || Up(a) : !0;
}
const AA = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function MA(a) {
  const [l, o] = a.slice(0, -1).split("(");
  if (l === "drop-shadow")
    return a;
  const [r] = o.match(nh) || [];
  if (!r)
    return a;
  const c = o.replace(r, "");
  let d = AA.has(l) ? 1 : 0;
  return r !== o && (d *= 100), l + "(" + d + c + ")";
}
const DA = /\b([a-z-]*)\(.*?\)/gu, Hf = {
  ...gn,
  getAnimatableNone: (a) => {
    const l = a.match(DA);
    return l ? l.map(MA).join(" ") : a;
  }
}, jf = {
  ...gn,
  getAnimatableNone: (a) => {
    const l = gn.parse(a);
    return gn.createTransformer(a)(l.map((r) => typeof r == "number" ? 0 : typeof r == "object" ? { ...r, alpha: 1 } : r));
  }
}, A0 = {
  ...ll,
  transform: Math.round
}, CA = {
  rotate: Fn,
  /**
   * Internal channel for `transition.path` orientToPath. Composed onto
   * `rotate` at the transform-build sites so the user's `rotate` is
   * never read or overwritten. Not part of `transformPropOrder`.
   */
  pathRotation: Fn,
  rotateX: Fn,
  rotateY: Fn,
  rotateZ: Fn,
  scale: Fs,
  scaleX: Fs,
  scaleY: Fs,
  scaleZ: Fs,
  skew: Fn,
  skewX: Fn,
  skewY: Fn,
  distance: nt,
  translateX: nt,
  translateY: nt,
  translateZ: nt,
  x: nt,
  y: nt,
  z: nt,
  perspective: nt,
  transformPerspective: nt,
  opacity: fu,
  originX: o0,
  originY: o0,
  originZ: nt
}, ro = {
  // Border props
  borderWidth: nt,
  borderTopWidth: nt,
  borderRightWidth: nt,
  borderBottomWidth: nt,
  borderLeftWidth: nt,
  borderRadius: nt,
  borderTopLeftRadius: nt,
  borderTopRightRadius: nt,
  borderBottomRightRadius: nt,
  borderBottomLeftRadius: nt,
  // Positioning props
  width: nt,
  maxWidth: nt,
  height: nt,
  maxHeight: nt,
  top: nt,
  right: nt,
  bottom: nt,
  left: nt,
  inset: nt,
  insetBlock: nt,
  insetBlockStart: nt,
  insetBlockEnd: nt,
  insetInline: nt,
  insetInlineStart: nt,
  insetInlineEnd: nt,
  // Spacing props
  padding: nt,
  paddingTop: nt,
  paddingRight: nt,
  paddingBottom: nt,
  paddingLeft: nt,
  paddingBlock: nt,
  paddingBlockStart: nt,
  paddingBlockEnd: nt,
  paddingInline: nt,
  paddingInlineStart: nt,
  paddingInlineEnd: nt,
  margin: nt,
  marginTop: nt,
  marginRight: nt,
  marginBottom: nt,
  marginLeft: nt,
  marginBlock: nt,
  marginBlockStart: nt,
  marginBlockEnd: nt,
  marginInline: nt,
  marginInlineStart: nt,
  marginInlineEnd: nt,
  // Typography
  fontSize: nt,
  // Misc
  backgroundPositionX: nt,
  backgroundPositionY: nt,
  ...CA,
  zIndex: A0,
  // SVG
  fillOpacity: fu,
  strokeOpacity: fu,
  numOctaves: A0
}, xA = {
  ...ro,
  // Color props
  color: ie,
  backgroundColor: ie,
  outlineColor: ie,
  fill: ie,
  stroke: ie,
  // Border props
  borderColor: ie,
  borderTopColor: ie,
  borderRightColor: ie,
  borderBottomColor: ie,
  borderLeftColor: ie,
  filter: Hf,
  WebkitFilter: Hf,
  mask: jf,
  WebkitMask: jf
}, xv = (a) => xA[a], OA = /* @__PURE__ */ new Set([Hf, jf]);
function Ov(a, l) {
  let o = xv(a);
  return OA.has(o) || (o = gn), o.getAnimatableNone ? o.getAnimatableNone(l) : void 0;
}
const RA = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function zA(a, l, o) {
  let r = 0, c;
  for (; r < a.length && !c; ) {
    const d = a[r];
    typeof d == "string" && !RA.has(d) && al(d).values.length && (c = a[r]), r++;
  }
  if (c && o)
    for (const d of l)
      a[d] = Ov(o, c);
}
class _A extends sh {
  constructor(l, o, r, c, d) {
    super(l, o, r, c, d, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: l, element: o, name: r } = this;
    if (!o || !o.current)
      return;
    super.readKeyframes();
    for (let p = 0; p < l.length; p++) {
      let g = l[p];
      if (typeof g == "string" && (g = g.trim(), eh(g))) {
        const b = bv(g, o.current);
        b !== void 0 && (l[p] = b), p === l.length - 1 && (this.finalKeyframe = g);
      }
    }
    if (this.resolveNoneKeyframes(), !Ev.has(r) || l.length !== 2)
      return;
    const [c, d] = l, h = E0(c), y = E0(d), v = s0(c), S = s0(d);
    if (v !== S && Di[r]) {
      this.needsMeasurement = !0;
      return;
    }
    if (h !== y)
      if (g0(h) && g0(y))
        for (let p = 0; p < l.length; p++) {
          const g = l[p];
          typeof g == "string" && (l[p] = parseFloat(g));
        }
      else Di[r] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: l, name: o } = this, r = [];
    for (let c = 0; c < l.length; c++)
      (l[c] === null || EA(l[c])) && r.push(c);
    r.length && zA(l, r, o);
  }
  measureInitialState() {
    const { element: l, unresolvedKeyframes: o, name: r } = this;
    if (!l || !l.current)
      return;
    r === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Di[r](l.measureViewportBox(), window.getComputedStyle(l.current)), o[0] = this.measuredOrigin;
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
    r[d] = Di[o](l.measureViewportBox(), window.getComputedStyle(l.current)), h !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = h), this.removedTransforms?.length && this.removedTransforms.forEach(([y, v]) => {
      l.getValue(y).set(v);
    }), this.resolveNoneKeyframes();
  }
}
const mh = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius"
];
function yh(a, l, o) {
  if (a == null)
    return [];
  if (a instanceof EventTarget)
    return [a];
  if (typeof a == "string") {
    let r = document;
    l && (r = l.current);
    const c = o?.[a] ?? r.querySelectorAll(a);
    return c ? Array.from(c) : [];
  }
  return Array.from(a).filter((r) => r != null);
}
const Yf = (a, l) => l && typeof a == "number" ? l.transform(a) : a;
function VA(a) {
  return Np(a) && "offsetHeight" in a && !("ownerSVGElement" in a);
}
const { schedule: gh } = /* @__PURE__ */ Fp(queueMicrotask, !1), yn = {
  x: !1,
  y: !1
};
function Rv() {
  return yn.x || yn.y;
}
function NA(a) {
  return a === "x" || a === "y" ? yn[a] ? null : (yn[a] = !0, () => {
    yn[a] = !1;
  }) : yn.x || yn.y ? null : (yn.x = yn.y = !0, () => {
    yn.x = yn.y = !1;
  });
}
function zv(a, l) {
  const o = yh(a), r = new AbortController(), c = {
    passive: !0,
    ...l,
    signal: r.signal
  };
  return [o, c, () => r.abort()];
}
function UA(a) {
  return !(a.pointerType === "touch" || Rv());
}
function wA(a, l, o = {}) {
  const [r, c, d] = zv(a, o);
  return r.forEach((h) => {
    let y = !1, v = !1, S;
    const p = () => {
      h.removeEventListener("pointerleave", z);
    }, g = (U) => {
      S && (S(U), S = void 0), p();
    }, b = (U) => {
      y = !1, window.removeEventListener("pointerup", b), window.removeEventListener("pointercancel", b), v && (v = !1, g(U));
    }, _ = () => {
      y = !0, window.addEventListener("pointerup", b, c), window.addEventListener("pointercancel", b, c);
    }, z = (U) => {
      if (U.pointerType !== "touch") {
        if (y) {
          v = !0;
          return;
        }
        g(U);
      }
    }, w = (U) => {
      if (!UA(U))
        return;
      v = !1;
      const L = l(h, U);
      typeof L == "function" && (S = L, h.addEventListener("pointerleave", z, c));
    };
    h.addEventListener("pointerenter", w, c), h.addEventListener("pointerdown", _, c);
  }), d;
}
const _v = (a, l) => l ? a === l ? !0 : _v(a, l.parentElement) : !1, ph = (a) => a.pointerType === "mouse" ? typeof a.button != "number" || a.button <= 0 : a.isPrimary !== !1, BA = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function LA(a) {
  return BA.has(a.tagName) || a.isContentEditable === !0;
}
const HA = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function jA(a) {
  return HA.has(a.tagName) || a.isContentEditable === !0;
}
const Is = /* @__PURE__ */ new WeakSet();
function M0(a) {
  return (l) => {
    l.key === "Enter" && a(l);
  };
}
function ff(a, l) {
  a.dispatchEvent(new PointerEvent("pointer" + l, { isPrimary: !0, bubbles: !0 }));
}
const YA = (a, l) => {
  const o = a.currentTarget;
  if (!o)
    return;
  const r = M0(() => {
    if (Is.has(o))
      return;
    ff(o, "down");
    const c = M0(() => {
      ff(o, "up");
    }), d = () => ff(o, "cancel");
    o.addEventListener("keyup", c, l), o.addEventListener("blur", d, l);
  });
  o.addEventListener("keydown", r, l), o.addEventListener("blur", () => o.removeEventListener("keydown", r), l);
};
function D0(a) {
  return ph(a) && !Rv();
}
const C0 = /* @__PURE__ */ new WeakSet();
function qA(a, l, o = {}) {
  const [r, c, d] = zv(a, o), h = (y) => {
    const v = y.currentTarget;
    if (!D0(y) || C0.has(y))
      return;
    Is.add(v), o.stopPropagation && C0.add(y);
    const S = l(v, y), p = { ...c, capture: !0 }, g = (z, w) => {
      window.removeEventListener("pointerup", b, p), window.removeEventListener("pointercancel", _, p), Is.has(v) && Is.delete(v), D0(z) && typeof S == "function" && S(z, { success: w });
    }, b = (z) => {
      g(z, v === window || v === document || o.useGlobalTarget || _v(v, z.target));
    }, _ = (z) => {
      g(z, !1);
    };
    window.addEventListener("pointerup", b, p), window.addEventListener("pointercancel", _, p);
  };
  return r.forEach((y) => {
    (o.useGlobalTarget ? window : y).addEventListener("pointerdown", h, c), VA(y) && (y.addEventListener("focus", (S) => YA(S, c)), !LA(y) && !y.hasAttribute("tabindex") && (y.tabIndex = 0));
  }), d;
}
function vo(a) {
  return Np(a) && "ownerSVGElement" in a;
}
const $s = /* @__PURE__ */ new WeakMap();
let to;
const Vv = (a, l, o) => (r, c) => c && c[0] ? c[0][a + "Size"] : vo(r) && "getBBox" in r ? r.getBBox()[l] : r[o], GA = /* @__PURE__ */ Vv("inline", "width", "offsetWidth"), XA = /* @__PURE__ */ Vv("block", "height", "offsetHeight");
function QA({ target: a, borderBoxSize: l }) {
  $s.get(a)?.forEach((o) => {
    o(a, {
      get width() {
        return GA(a, l);
      },
      get height() {
        return XA(a, l);
      }
    });
  });
}
function ZA(a) {
  a.forEach(QA);
}
function KA() {
  typeof ResizeObserver > "u" || (to = new ResizeObserver(ZA));
}
function JA(a, l) {
  to || KA();
  const o = yh(a);
  return o.forEach((r) => {
    let c = $s.get(r);
    c || (c = /* @__PURE__ */ new Set(), $s.set(r, c)), c.add(l), to?.observe(r);
  }), () => {
    o.forEach((r) => {
      const c = $s.get(r);
      c?.delete(l), c?.size || to?.unobserve(r);
    });
  };
}
const eo = /* @__PURE__ */ new Set();
let tl;
function FA() {
  tl = () => {
    const a = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    eo.forEach((l) => l(a));
  }, window.addEventListener("resize", tl);
}
function PA(a) {
  return eo.add(a), tl || FA(), () => {
    eo.delete(a), !eo.size && typeof tl == "function" && (window.removeEventListener("resize", tl), tl = void 0);
  };
}
function x0(a, l) {
  return typeof a == "function" ? PA(a) : JA(a, l);
}
function Nv(a) {
  return vo(a) && a.tagName === "svg";
}
function kA(...a) {
  const l = !Array.isArray(a[0]), o = l ? 0 : -1, r = a[0 + o], c = a[1 + o], d = a[2 + o], h = a[3 + o], y = uv(c, d, h);
  return l ? y(r) : y;
}
const WA = [...Cv, ie, gn], IA = (a) => WA.find(Dv(a)), O0 = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), el = () => ({
  x: O0(),
  y: O0()
}), R0 = () => ({ min: 0, max: 0 }), ne = () => ({
  x: R0(),
  y: R0()
}), du = /* @__PURE__ */ new WeakMap();
function So(a) {
  return a !== null && typeof a == "object" && typeof a.start == "function";
}
function mu(a) {
  return typeof a == "string" || Array.isArray(a);
}
const vh = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Sh = ["initial", ...vh];
function To(a) {
  return So(a.animate) || Sh.some((l) => mu(a[l]));
}
function Uv(a) {
  return !!(To(a) || a.variants);
}
function $A(a, l, o) {
  for (const r in l) {
    const c = l[r], d = o[r];
    if (le(c))
      a.addValue(r, c);
    else if (le(d))
      a.addValue(r, xi(c, { owner: a }));
    else if (d !== c)
      if (a.hasValue(r)) {
        const h = a.getValue(r);
        h.liveStyle === !0 ? h.jump(c) : h.hasAnimated || h.set(c);
      } else {
        const h = a.getStaticValue(r);
        a.addValue(r, xi(h !== void 0 ? h : c, { owner: a }));
      }
  }
  for (const r in o)
    l[r] === void 0 && a.removeValue(r);
  return l;
}
const co = { current: null }, Th = { current: !1 }, t2 = typeof window < "u";
function wv() {
  if (Th.current = !0, !!t2)
    if (window.matchMedia) {
      const a = window.matchMedia("(prefers-reduced-motion)"), l = () => co.current = a.matches;
      a.addEventListener("change", l), l();
    } else
      co.current = !1;
}
const z0 = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let fo = {};
function Bv(a) {
  fo = a;
}
function e2() {
  return fo;
}
class Lv {
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
  constructor({ parent: l, props: o, presenceContext: r, reducedMotionConfig: c, skipAnimations: d, blockInitialAnimation: h, visualState: y }, v = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = sh, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const _ = xe.now();
      this.renderScheduledAt < _ && (this.renderScheduledAt = _, jt.render(this.render, !1, !0));
    };
    const { latestValues: S, renderState: p } = y;
    this.latestValues = S, this.baseTarget = { ...S }, this.initialValues = o.initial ? { ...S } : {}, this.renderState = p, this.parent = l, this.props = o, this.presenceContext = r, this.depth = l ? l.depth + 1 : 0, this.reducedMotionConfig = c, this.skipAnimationsConfig = d, this.options = v, this.blockInitialAnimation = !!h, this.isControllingVariants = To(o), this.isVariantNode = Uv(o), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(l && l.current);
    const { willChange: g, ...b } = this.scrapeMotionValuesFromProps(o, {}, this);
    for (const _ in b) {
      const z = b[_];
      S[_] !== void 0 && le(z) && z.set(S[_]);
    }
  }
  mount(l) {
    if (this.hasBeenMounted)
      for (const o in this.initialValues)
        this.values.get(o)?.jump(this.initialValues[o]), this.latestValues[o] = this.initialValues[o];
    this.current = l, du.set(l, this), this.projection && !this.projection.instance && this.projection.mount(l), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((o, r) => this.bindToMotionValue(r, o)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (Th.current || wv(), this.shouldReduceMotion = co.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), Pn(this.notifyUpdate), Pn(this.render), this.valueSubscriptions.forEach((l) => l()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
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
    if (this.valueSubscriptions.has(l) && this.valueSubscriptions.get(l)(), o.accelerate && vv.has(l) && this.current instanceof HTMLElement) {
      const { factory: h, keyframes: y, times: v, ease: S, duration: p } = o.accelerate, g = new gv({
        element: this.current,
        name: l,
        keyframes: y,
        times: v,
        ease: S,
        duration: /* @__PURE__ */ Be(p)
      }), b = h(g);
      this.valueSubscriptions.set(l, () => {
        b(), g.cancel();
      });
      return;
    }
    const r = sl.has(l);
    r && this.onBindTransform && this.onBindTransform();
    const c = o.on("change", (h) => {
      this.latestValues[l] = h, this.props.onUpdate && jt.preRender(this.notifyUpdate), r && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
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
    for (l in fo) {
      const o = fo[l];
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : ne();
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
    for (let r = 0; r < z0.length; r++) {
      const c = z0[r];
      this.propEventSubscriptions[c] && (this.propEventSubscriptions[c](), delete this.propEventSubscriptions[c]);
      const d = "on" + c, h = l[d];
      h && (this.propEventSubscriptions[c] = this.on(c, h));
    }
    this.prevMotionValues = $A(this, this.scrapeMotionValuesFromProps(l, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return r === void 0 && o !== void 0 && (r = xi(o === null ? void 0 : o, { owner: this }), this.addValue(l, r)), r;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(l, o) {
    let r = this.latestValues[l] !== void 0 || !this.current ? this.latestValues[l] : this.getBaseTargetFromProps(this.props, l) ?? this.readValueFromInstance(this.current, l, this.options);
    return r != null && (typeof r == "string" && (Vp(r) || Up(r)) ? r = parseFloat(r) : !IA(r) && gn.test(o) && (r = Ov(l, o)), this.setBaseTarget(l, le(r) ? r.get() : r)), le(r) ? r.get() : r;
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
      const d = fh(this.props, o, this.presenceContext?.custom);
      d && (r = d[l]);
    }
    if (o && r !== void 0)
      return r;
    const c = this.getBaseTargetFromProps(this.props, l);
    return c !== void 0 && !le(c) ? c : this.initialValues[l] !== void 0 && r === void 0 ? void 0 : this.baseTarget[l];
  }
  on(l, o) {
    return this.events[l] || (this.events[l] = new Wf()), this.events[l].add(o);
  }
  notify(l, ...o) {
    this.events[l] && this.events[l].notify(...o);
  }
  scheduleRenderMicrotask() {
    gh.render(this.render);
  }
}
class Hv extends Lv {
  constructor() {
    super(...arguments), this.KeyframeResolver = _A;
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
    le(l) && (this.childSubscription = l.on("change", (o) => {
      this.current && (this.current.textContent = `${o}`);
    }));
  }
}
class Oi {
  constructor(l) {
    this.isMounted = !1, this.node = l;
  }
  update() {
  }
}
function jv({ top: a, left: l, right: o, bottom: r }) {
  return {
    x: { min: l, max: o },
    y: { min: a, max: r }
  };
}
function n2({ x: a, y: l }) {
  return { top: l.min, right: a.max, bottom: l.max, left: a.min };
}
function i2(a, l) {
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
function hf(a) {
  return a === void 0 || a === 1;
}
function qf({ scale: a, scaleX: l, scaleY: o }) {
  return !hf(a) || !hf(l) || !hf(o);
}
function $i(a) {
  return qf(a) || Yv(a) || a.z || a.rotate || a.rotateX || a.rotateY || a.skewX || a.skewY;
}
function Yv(a) {
  return _0(a.x) || _0(a.y);
}
function _0(a) {
  return a && a !== "0%";
}
function ho(a, l, o) {
  const r = a - o, c = l * r;
  return o + c;
}
function V0(a, l, o, r, c) {
  return c !== void 0 && (a = ho(a, c, r)), ho(a, o, r) + l;
}
function Gf(a, l = 0, o = 1, r, c) {
  a.min = V0(a.min, l, o, r, c), a.max = V0(a.max, l, o, r, c);
}
function qv(a, { x: l, y: o }) {
  Gf(a.x, l.translate, l.scale, l.originPoint), Gf(a.y, o.translate, o.scale, o.originPoint);
}
const N0 = 0.999999999999, U0 = 1.0000000000001;
function a2(a, l, o, r = !1) {
  const c = o.length;
  if (!c)
    return;
  l.x = l.y = 1;
  let d, h;
  for (let y = 0; y < c; y++) {
    d = o[y], h = d.projectionDelta;
    const { visualElement: v } = d.options;
    v && v.props.style && v.props.style.display === "contents" || (r && d.options.layoutScroll && d.scroll && d !== d.root && (Rn(a.x, -d.scroll.offset.x), Rn(a.y, -d.scroll.offset.y)), h && (l.x *= h.x.scale, l.y *= h.y.scale, qv(a, h)), r && $i(d.latestValues) && no(a, d.latestValues, d.layout?.layoutBox));
  }
  l.x < U0 && l.x > N0 && (l.x = 1), l.y < U0 && l.y > N0 && (l.y = 1);
}
function Rn(a, l) {
  a.min += l, a.max += l;
}
function w0(a, l, o, r, c = 0.5) {
  const d = Ht(a.min, a.max, c);
  Gf(a, l, o, d, r);
}
function B0(a, l) {
  return typeof a == "string" ? parseFloat(a) / 100 * (l.max - l.min) : a;
}
function no(a, l, o) {
  const r = o ?? a;
  w0(a.x, B0(l.x, r.x), l.scaleX, l.scale, l.originX), w0(a.y, B0(l.y, r.y), l.scaleY, l.scale, l.originY);
}
function Gv(a, l) {
  return jv(i2(a.getBoundingClientRect(), l));
}
function l2(a, l, o) {
  const r = Gv(a, o), { scroll: c } = l;
  return c && (Rn(r.x, c.offset.x), Rn(r.y, c.offset.y)), r;
}
const u2 = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, s2 = ul.length;
function o2(a, l, o) {
  let r = "", c = !0;
  for (let h = 0; h < s2; h++) {
    const y = ul[h], v = a[y];
    if (v === void 0)
      continue;
    let S = !0;
    if (typeof v == "number")
      S = v === (y.startsWith("scale") ? 1 : 0);
    else {
      const p = parseFloat(v);
      S = y.startsWith("scale") ? p === 1 : p === 0;
    }
    if (!S || o) {
      const p = Yf(v, ro[y]);
      if (!S) {
        c = !1;
        const g = u2[y] || y;
        r += `${g}(${p}) `;
      }
      o && (l[y] = p);
    }
  }
  const d = a.pathRotation;
  return d && (c = !1, r += `rotate(${Yf(d, ro.pathRotation)}) `), r = r.trim(), o ? r = o(l, c ? "" : r) : c && (r = "none"), r;
}
function bh(a, l, o) {
  const { style: r, vars: c, transformOrigin: d } = a;
  let h = !1, y = !1;
  for (const v in l) {
    const S = l[v];
    if (sl.has(v)) {
      h = !0;
      continue;
    } else if (kp(v)) {
      c[v] = S;
      continue;
    } else {
      const p = Yf(S, ro[v]);
      v.startsWith("origin") ? (y = !0, d[v] = p) : r[v] = p;
    }
  }
  if (l.transform || (h || o ? r.transform = o2(l, a.transform, o) : r.transform && (r.transform = "none")), y) {
    const { originX: v = "50%", originY: S = "50%", originZ: p = 0 } = d;
    r.transformOrigin = `${v} ${S} ${p}`;
  }
}
function Xv(a, { style: l, vars: o }, r, c) {
  const d = a.style;
  let h;
  for (h in l)
    d[h] = l[h];
  c?.applyProjectionStyles(d, r);
  for (h in o)
    d.setProperty(h, o[h]);
}
function L0(a, l) {
  return l.max === l.min ? 0 : a / (l.max - l.min) * 100;
}
const au = {
  correct: (a, l) => {
    if (!l.target)
      return a;
    if (typeof a == "string")
      if (nt.test(a))
        a = parseFloat(a);
      else
        return a;
    const o = L0(a, l.target.x), r = L0(a, l.target.y);
    return `${o}% ${r}%`;
  }
}, r2 = {
  correct: (a, { treeScale: l, projectionDelta: o }) => {
    const r = a, c = gn.parse(a);
    if (c.length > 5)
      return r;
    const d = gn.createTransformer(a), h = typeof c[0] != "number" ? 1 : 0, y = o.x.scale * l.x, v = o.y.scale * l.y;
    c[0 + h] /= y, c[1 + h] /= v;
    const S = Ht(y, v, 0.5);
    return typeof c[2 + h] == "number" && (c[2 + h] /= S), typeof c[3 + h] == "number" && (c[3 + h] /= S), d(c);
  }
}, Xf = {
  borderRadius: {
    ...au,
    applyTo: [...mh]
  },
  borderTopLeftRadius: au,
  borderTopRightRadius: au,
  borderBottomLeftRadius: au,
  borderBottomRightRadius: au,
  boxShadow: r2
};
function Qv(a, { layout: l, layoutId: o }) {
  return sl.has(a) || a.startsWith("origin") || (l || o !== void 0) && (!!Xf[a] || a === "opacity");
}
function Eh(a, l, o) {
  const r = a.style, c = l?.style, d = {};
  if (!r)
    return d;
  for (const h in r)
    (le(r[h]) || c && le(c[h]) || Qv(h, a) || o?.getValue(h)?.liveStyle !== void 0) && (d[h] = r[h]);
  return d;
}
function c2(a) {
  return window.getComputedStyle(a);
}
class Zv extends Hv {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = Xv;
  }
  mount(l) {
    go(!!l.style), super.mount(l);
  }
  readValueFromInstance(l, o) {
    if (sl.has(o))
      return this.projection?.isProjecting ? Rf(o) : _E(l, o);
    {
      const r = c2(l), c = (kp(o) ? r.getPropertyValue(o) : r[o]) || 0;
      return typeof c == "string" ? c.trim() : c;
    }
  }
  measureInstanceViewportBox(l, { transformPagePoint: o }) {
    return Gv(l, o);
  }
  build(l, o, r) {
    bh(l, o, r.transformTemplate);
  }
  scrapeMotionValuesFromProps(l, o, r) {
    return Eh(l, o, r);
  }
}
function f2(a, l) {
  return a in l;
}
class h2 extends Lv {
  constructor() {
    super(...arguments), this.type = "object";
  }
  readValueFromInstance(l, o) {
    if (f2(o, l)) {
      const r = l[o];
      if (typeof r == "string" || typeof r == "number")
        return r;
    }
  }
  getBaseTargetFromProps() {
  }
  removeValueFromRenderState(l, o) {
    delete o.output[l];
  }
  measureInstanceViewportBox() {
    return ne();
  }
  build(l, o) {
    Object.assign(l.output, o);
  }
  renderInstance(l, { output: o }) {
    Object.assign(l, o);
  }
  sortInstanceNodePosition() {
    return 0;
  }
}
const d2 = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, m2 = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function y2(a, l, o = 1, r = 0, c = !0) {
  a.pathLength = 1;
  const d = c ? d2 : m2;
  a[d.offset] = `${-r}`, a[d.array] = `${l} ${o}`;
}
const g2 = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function Kv(a, {
  attrX: l,
  attrY: o,
  attrScale: r,
  pathLength: c,
  pathSpacing: d = 1,
  pathOffset: h = 0,
  // This is object creation, which we try to avoid per-frame.
  ...y
}, v, S, p) {
  if (bh(a, y, S), v) {
    a.style.viewBox && (a.attrs.viewBox = a.style.viewBox);
    return;
  }
  a.attrs = a.style, a.style = {};
  const { attrs: g, style: b } = a;
  g.transform && (b.transform = g.transform, delete g.transform), (b.transform || g.transformOrigin) && (b.transformOrigin = g.transformOrigin ?? "50% 50%", delete g.transformOrigin), b.transform && (b.transformBox = p?.transformBox ?? "fill-box", delete g.transformBox);
  for (const _ of g2)
    g[_] !== void 0 && (b[_] = g[_], delete g[_]);
  l !== void 0 && (g.x = l), o !== void 0 && (g.y = o), r !== void 0 && (g.scale = r), c !== void 0 && y2(g, c, d, h, !1);
}
const Jv = /* @__PURE__ */ new Set([
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
]), Fv = (a) => typeof a == "string" && a.toLowerCase() === "svg";
function p2(a, l, o, r) {
  Xv(a, l, void 0, r);
  for (const c in l.attrs)
    a.setAttribute(Jv.has(c) ? c : hh(c), l.attrs[c]);
}
function Pv(a, l, o) {
  const r = Eh(a, l, o);
  for (const c in a)
    if (le(a[c]) || le(l[c])) {
      const d = ul.indexOf(c) !== -1 ? "attr" + c.charAt(0).toUpperCase() + c.substring(1) : c;
      r[d] = a[c];
    }
  return r;
}
class kv extends Hv {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = ne;
  }
  getBaseTargetFromProps(l, o) {
    return l[o];
  }
  readValueFromInstance(l, o) {
    if (sl.has(o)) {
      const r = xv(o);
      return r && r.default || 0;
    }
    return o = Jv.has(o) ? o : hh(o), l.getAttribute(o);
  }
  scrapeMotionValuesFromProps(l, o, r) {
    return Pv(l, o, r);
  }
  build(l, o, r) {
    Kv(l, o, this.isSVGTag, r.transformTemplate, r.style);
  }
  renderInstance(l, o, r, c) {
    p2(l, o, r, c);
  }
  mount(l) {
    this.isSVGTag = Fv(l.tagName), super.mount(l);
  }
}
const v2 = Sh.length;
function Wv(a) {
  if (!a)
    return;
  if (!a.isControllingVariants) {
    const o = a.parent ? Wv(a.parent) || {} : {};
    return a.props.initial !== void 0 && (o.initial = a.props.initial), o;
  }
  const l = {};
  for (let o = 0; o < v2; o++) {
    const r = Sh[o], c = a.props[r];
    (mu(c) || c === !1) && (l[r] = c);
  }
  return l;
}
function Iv(a, l) {
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
const S2 = [...vh].reverse(), T2 = vh.length;
function b2(a) {
  return (l) => Promise.all(l.map(({ animation: o, options: r }) => TA(a, o, r)));
}
function E2(a) {
  let l = b2(a), o = H0(), r = !0, c = !1;
  const d = (S) => (p, g) => {
    const b = ia(a, g, S === "exit" ? a.presenceContext?.custom : void 0);
    if (b) {
      const { transition: _, transitionEnd: z, ...w } = b;
      p = { ...p, ...w, ...z };
    }
    return p;
  };
  function h(S) {
    l = S(a);
  }
  function y(S) {
    const { props: p } = a, g = Wv(a.parent) || {}, b = [], _ = /* @__PURE__ */ new Set();
    let z = {}, w = 1 / 0;
    for (let L = 0; L < T2; L++) {
      const j = S2[L], Q = o[j], B = p[j] !== void 0 ? p[j] : g[j], k = mu(B), ot = j === S ? Q.isActive : null;
      ot === !1 && (w = L);
      let Z = B === g[j] && B !== p[j] && k;
      if (Z && (r || c) && a.manuallyAnimateOnMount && (Z = !1), Q.protectedKeys = { ...z }, // If it isn't active and hasn't *just* been set as inactive
      !Q.isActive && ot === null || // If we didn't and don't have any defined prop for this animation type
      !B && !Q.prevProp || // Or if the prop doesn't define an animation
      So(B) || typeof B == "boolean")
        continue;
      if (j === "exit" && Q.isActive && ot !== !0) {
        Q.prevResolvedValues && (z = {
          ...z,
          ...Q.prevResolvedValues
        });
        continue;
      }
      const q = A2(Q.prevProp, B);
      let st = q || // If we're making this variant active, we want to always make it active
      j === S && Q.isActive && !Z && k || // If we removed a higher-priority variant (i is in reverse order)
      L > w && k, J = !1;
      const ct = Array.isArray(B) ? B : [B];
      let gt = ct.reduce(d(j), {});
      ot === !1 && (gt = {});
      const { prevResolvedValues: Yt = {} } = Q, Ot = {
        ...Yt,
        ...gt
      }, Tt = (Y) => {
        st = !0, _.has(Y) && (J = !0, _.delete(Y)), Q.needsAnimating[Y] = !0;
        const at = a.getValue(Y);
        at && (at.liveStyle = !1);
      };
      for (const Y in Ot) {
        const at = gt[Y], ht = Yt[Y];
        if (z.hasOwnProperty(Y))
          continue;
        let Qt = !1;
        wf(at) && wf(ht) ? Qt = !Iv(at, ht) || q : Qt = at !== ht, Qt ? at != null ? Tt(Y) : _.add(Y) : at !== void 0 && _.has(Y) ? Tt(Y) : Q.protectedKeys[Y] = !0;
      }
      Q.prevProp = B, Q.prevResolvedValues = gt, Q.isActive && (z = { ...z, ...gt }), (r || c) && a.blockInitialAnimation && (st = !1);
      const G = Z && q;
      st && (!G || J) && b.push(...ct.map((Y) => {
        const at = { type: j };
        if (typeof Y == "string" && (r || c) && !G && a.manuallyAnimateOnMount && a.parent) {
          const { parent: ht } = a, Qt = ia(ht, Y);
          if (ht.enteringChildren && Qt) {
            const { delayChildren: Se } = Qt.transition || {};
            at.delay = Sv(ht.enteringChildren, a, Se);
          }
        }
        return {
          animation: Y,
          options: at
        };
      }));
    }
    if (_.size) {
      const L = {};
      if (typeof p.initial != "boolean") {
        const j = ia(a, Array.isArray(p.initial) ? p.initial[0] : p.initial);
        j && j.transition && (L.transition = j.transition);
      }
      _.forEach((j) => {
        const Q = a.getBaseTarget(j), B = a.getValue(j);
        B && (B.liveStyle = !0), L[j] = Q ?? null;
      }), b.push({ animation: L });
    }
    let U = !!b.length;
    return r && (p.initial === !1 || p.initial === p.animate) && !a.manuallyAnimateOnMount && (U = !1), r = !1, c = !1, U ? l(b) : Promise.resolve();
  }
  function v(S, p) {
    if (o[S].isActive === p)
      return Promise.resolve();
    a.variantChildren?.forEach((b) => b.animationState?.setActive(S, p)), o[S].isActive = p;
    const g = y(S);
    for (const b in o)
      o[b].protectedKeys = {};
    return g;
  }
  return {
    animateChanges: y,
    setActive: v,
    setAnimateFunction: h,
    getState: () => o,
    reset: () => {
      o = H0(), c = !0;
    }
  };
}
function A2(a, l) {
  return typeof l == "string" ? l !== a : Array.isArray(l) ? !Iv(l, a) : !1;
}
function Ii(a = !1) {
  return {
    isActive: a,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function H0() {
  return {
    animate: Ii(!0),
    whileInView: Ii(),
    whileHover: Ii(),
    whileTap: Ii(),
    whileDrag: Ii(),
    whileFocus: Ii(),
    exit: Ii()
  };
}
function Qf(a, l) {
  a.min = l.min, a.max = l.max;
}
function mn(a, l) {
  Qf(a.x, l.x), Qf(a.y, l.y);
}
function j0(a, l) {
  a.translate = l.translate, a.scale = l.scale, a.originPoint = l.originPoint, a.origin = l.origin;
}
const $v = 1e-4, M2 = 1 - $v, D2 = 1 + $v, t1 = 0.01, C2 = 0 - t1, x2 = 0 + t1;
function Oe(a) {
  return a.max - a.min;
}
function O2(a, l, o) {
  return Math.abs(a - l) <= o;
}
function Y0(a, l, o, r = 0.5) {
  a.origin = r, a.originPoint = Ht(l.min, l.max, a.origin), a.scale = Oe(o) / Oe(l), a.translate = Ht(o.min, o.max, a.origin) - a.originPoint, (a.scale >= M2 && a.scale <= D2 || isNaN(a.scale)) && (a.scale = 1), (a.translate >= C2 && a.translate <= x2 || isNaN(a.translate)) && (a.translate = 0);
}
function ru(a, l, o, r) {
  Y0(a.x, l.x, o.x, r ? r.originX : void 0), Y0(a.y, l.y, o.y, r ? r.originY : void 0);
}
function q0(a, l, o, r = 0) {
  const c = r ? Ht(o.min, o.max, r) : o.min;
  a.min = c + l.min, a.max = a.min + Oe(l);
}
function R2(a, l, o, r) {
  q0(a.x, l.x, o.x, r?.x), q0(a.y, l.y, o.y, r?.y);
}
function G0(a, l, o, r = 0) {
  const c = r ? Ht(o.min, o.max, r) : o.min;
  a.min = l.min - c, a.max = a.min + Oe(l);
}
function mo(a, l, o, r) {
  G0(a.x, l.x, o.x, r?.x), G0(a.y, l.y, o.y, r?.y);
}
function X0(a, l, o, r, c) {
  return a -= l, a = ho(a, 1 / o, r), c !== void 0 && (a = ho(a, 1 / c, r)), a;
}
function z2(a, l = 0, o = 1, r = 0.5, c, d = a, h = a) {
  if (_n.test(l) && (l = parseFloat(l), l = Ht(h.min, h.max, l / 100) - h.min), typeof l != "number")
    return;
  let y = Ht(d.min, d.max, r);
  a === d && (y -= l), a.min = X0(a.min, l, o, y, c), a.max = X0(a.max, l, o, y, c);
}
function Q0(a, l, [o, r, c], d, h) {
  z2(a, l[o], l[r], l[c], l.scale, d, h);
}
const _2 = ["x", "scaleX", "originX"], V2 = ["y", "scaleY", "originY"];
function Z0(a, l, o, r) {
  Q0(a.x, l, _2, o ? o.x : void 0, r ? r.x : void 0), Q0(a.y, l, V2, o ? o.y : void 0, r ? r.y : void 0);
}
function K0(a) {
  return a.translate === 0 && a.scale === 1;
}
function e1(a) {
  return K0(a.x) && K0(a.y);
}
function J0(a, l) {
  return a.min === l.min && a.max === l.max;
}
function N2(a, l) {
  return J0(a.x, l.x) && J0(a.y, l.y);
}
function F0(a, l) {
  return Math.round(a.min) === Math.round(l.min) && Math.round(a.max) === Math.round(l.max);
}
function n1(a, l) {
  return F0(a.x, l.x) && F0(a.y, l.y);
}
function P0(a) {
  return Oe(a.x) / Oe(a.y);
}
function k0(a, l) {
  return a.translate === l.translate && a.scale === l.scale && a.originPoint === l.originPoint;
}
function On(a) {
  return [a("x"), a("y")];
}
function U2(a, l, o) {
  let r = "";
  const c = a.x.translate / l.x, d = a.y.translate / l.y, h = o?.z || 0;
  if ((c || d || h) && (r = `translate3d(${c}px, ${d}px, ${h}px) `), (l.x !== 1 || l.y !== 1) && (r += `scale(${1 / l.x}, ${1 / l.y}) `), o) {
    const { transformPerspective: S, rotate: p, pathRotation: g, rotateX: b, rotateY: _, skewX: z, skewY: w } = o;
    S && (r = `perspective(${S}px) ${r}`), p && (r += `rotate(${p}deg) `), g && (r += `rotate(${g}deg) `), b && (r += `rotateX(${b}deg) `), _ && (r += `rotateY(${_}deg) `), z && (r += `skewX(${z}deg) `), w && (r += `skewY(${w}deg) `);
  }
  const y = a.x.scale * l.x, v = a.y.scale * l.y;
  return (y !== 1 || v !== 1) && (r += `scale(${y}, ${v})`), r || "none";
}
const w2 = mh.length, W0 = (a) => typeof a == "string" ? parseFloat(a) : a, I0 = (a) => typeof a == "number" || nt.test(a);
function B2(a, l, o, r, c, d) {
  c ? (a.opacity = Ht(0, o.opacity ?? 1, L2(r)), a.opacityExit = Ht(l.opacity ?? 1, 0, H2(r))) : d && (a.opacity = Ht(l.opacity ?? 1, o.opacity ?? 1, r));
  for (let h = 0; h < w2; h++) {
    const y = mh[h];
    let v = $0(l, y), S = $0(o, y);
    if (v === void 0 && S === void 0)
      continue;
    v || (v = 0), S || (S = 0), v === 0 || S === 0 || I0(v) === I0(S) ? (a[y] = Math.max(Ht(W0(v), W0(S), r), 0), (_n.test(S) || _n.test(v)) && (a[y] += "%")) : a[y] = S;
  }
  (l.rotate || o.rotate) && (a.rotate = Ht(l.rotate || 0, o.rotate || 0, r));
}
function $0(a, l) {
  return a[l] !== void 0 ? a[l] : a.borderRadius;
}
const L2 = /* @__PURE__ */ i1(0, 0.5, Gp), H2 = /* @__PURE__ */ i1(0.5, 0.95, ln);
function i1(a, l, o) {
  return (r) => r < a ? 0 : r > l ? 1 : o(/* @__PURE__ */ il(a, l, r));
}
function a1(a, l, o) {
  const r = le(a) ? a : xi(a);
  return r.start(ch("", r, l, o)), r.animation;
}
function yu(a, l, o, r = { passive: !0 }) {
  return a.addEventListener(l, o, r), () => a.removeEventListener(l, o, r);
}
const j2 = (a, l) => a.depth - l.depth;
class Y2 {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(l) {
    kf(this.children, l), this.isDirty = !0;
  }
  remove(l) {
    nl(this.children, l), this.isDirty = !0;
  }
  forEach(l) {
    this.isDirty && this.children.sort(j2), this.isDirty = !1, this.children.forEach(l);
  }
}
function q2(a, l) {
  const o = xe.now(), r = ({ timestamp: c }) => {
    const d = c - o;
    d >= l && (Pn(r), a(d - l));
  };
  return jt.setup(r, !0), () => Pn(r);
}
function io(a) {
  return le(a) ? a.get() : a;
}
class G2 {
  constructor() {
    this.members = [];
  }
  add(l) {
    kf(this.members, l);
    for (let o = this.members.length - 1; o >= 0; o--) {
      const r = this.members[o];
      if (r === l || r === this.lead || r === this.prevLead)
        continue;
      const c = r.instance;
      (!c || c.isConnected === !1) && !r.snapshot && (nl(this.members, r), r.unmount());
    }
    l.scheduleRender();
  }
  remove(l) {
    if (nl(this.members, l), l === this.prevLead && (this.prevLead = void 0), l === this.lead) {
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
const ao = {
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
}, df = ["", "X", "Y", "Z"], X2 = 1e3;
let Q2 = 0;
function mf(a, l, o, r) {
  const { latestValues: c } = l;
  c[a] && (o[a] = c[a], l.setStaticValue(a, 0), r && (r[a] = 0));
}
function l1(a) {
  if (a.hasCheckedOptimisedAppear = !0, a.root === a)
    return;
  const { visualElement: l } = a.options;
  if (!l)
    return;
  const o = Mv(l);
  if (window.MotionHasOptimisedAnimation(o, "transform")) {
    const { layout: c, layoutId: d } = a.options;
    window.MotionCancelOptimisedAnimation(o, "transform", jt, !(c || d));
  }
  const { parent: r } = a;
  r && !r.hasCheckedOptimisedAppear && l1(r);
}
function u1({ attachResizeListener: a, defaultParent: l, measureScroll: o, checkIsScrollRoot: r, resetTransform: c }) {
  return class {
    constructor(h = {}, y = l?.()) {
      this.id = Q2++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(J2), this.nodes.forEach($2), this.nodes.forEach(tM), this.nodes.forEach(F2);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = h, this.root = y ? y.root || y : this, this.path = y ? [...y.path, y] : [], this.parent = y, this.depth = y ? y.depth + 1 : 0;
      for (let v = 0; v < this.path.length; v++)
        this.path[v].shouldResetTransform = !0;
      this.root === this && (this.nodes = new Y2());
    }
    addEventListener(h, y) {
      return this.eventHandlers.has(h) || this.eventHandlers.set(h, new Wf()), this.eventHandlers.get(h).add(y);
    }
    notifyListeners(h, ...y) {
      const v = this.eventHandlers.get(h);
      v && v.notify(...y);
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
      this.isSVG = vo(h) && !Nv(h), this.instance = h;
      const { layoutId: y, layout: v, visualElement: S } = this.options;
      if (S && !S.current && S.mount(h), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (v || y) && (this.isLayoutDirty = !0), a) {
        let p, g = 0;
        const b = () => this.root.updateBlockedByResize = !1;
        jt.read(() => {
          g = window.innerWidth;
        }), a(h, () => {
          const _ = window.innerWidth;
          _ !== g && (g = _, this.root.updateBlockedByResize = !0, p && p(), p = q2(b, 250), ao.hasAnimatedSinceResize && (ao.hasAnimatedSinceResize = !1, this.nodes.forEach(np)));
        });
      }
      y && this.root.registerSharedNode(y, this), this.options.animate !== !1 && S && (y || v) && this.addEventListener("didUpdate", ({ delta: p, hasLayoutChanged: g, hasRelativeLayoutChanged: b, layout: _ }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const z = this.options.transition || S.getDefaultTransition() || lM, { onLayoutAnimationStart: w, onLayoutAnimationComplete: U } = S.getProps(), L = !this.targetLayout || !n1(this.targetLayout, _), j = !g && b;
        if (this.options.layoutRoot || this.resumeFrom || j || g && (L || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const Q = {
            ...rh(z, "layout"),
            onPlay: w,
            onComplete: U
          };
          (S.shouldReduceMotion || this.options.layoutRoot) && (Q.delay = 0, Q.type = !1), this.startAnimation(Q), this.setAnimationOrigin(p, j, Q.path);
        } else
          g || np(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = _;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const h = this.getStack();
      h && h.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), Pn(this.updateProjection);
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
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(eM), this.animationId++);
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
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && l1(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let p = 0; p < this.path.length; p++) {
        const g = this.path[p];
        g.shouldResetTransform = !0, (typeof g.latestValues.x == "string" || typeof g.latestValues.y == "string") && (g.isLayoutDirty = !0), g.updateScroll("snapshot"), g.options.layoutRoot && g.willUpdate(!1);
      }
      const { layoutId: y, layout: v } = this.options;
      if (y === void 0 && !v)
        return;
      const S = this.getTransformTemplate();
      this.prevTransformTemplateValue = S ? S(this.latestValues, "") : void 0, this.updateSnapshot(), h && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        const v = this.updateBlockedByResize;
        this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), v && this.nodes.forEach(k2), this.nodes.forEach(tp);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(ep);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(W2), this.nodes.forEach(I2), this.nodes.forEach(Z2), this.nodes.forEach(K2)) : this.nodes.forEach(ep), this.clearAllSnapshots();
      const y = xe.now();
      ve.delta = Vn(0, 1e3 / 60, y - ve.timestamp), ve.timestamp = y, ve.isProcessing = !0, lf.update.process(ve), lf.preRender.process(ve), lf.render.process(ve), ve.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, gh.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(P2), this.sharedNodes.forEach(nM);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, jt.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      jt.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !Oe(this.snapshot.measuredBox.x) && !Oe(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let v = 0; v < this.path.length; v++)
          this.path[v].updateScroll();
      const h = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected || (this.layoutCorrected = ne()), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: y } = this.options;
      y && y.notify("LayoutMeasure", this.layout.layoutBox, h ? h.layoutBox : void 0);
    }
    updateScroll(h = "measure") {
      let y = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === h && (y = !1), y && this.instance) {
        const v = r(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: h,
          isRoot: v,
          offset: o(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : v
        };
      }
    }
    resetTransform() {
      if (!c)
        return;
      const h = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, y = this.projectionDelta && !e1(this.projectionDelta), v = this.getTransformTemplate(), S = v ? v(this.latestValues, "") : void 0, p = S !== this.prevTransformTemplateValue;
      h && this.instance && (y || $i(this.latestValues) || p) && (c(this.instance, S), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(h = !0) {
      const y = this.measurePageBox();
      let v = this.removeElementScroll(y);
      return h && (v = this.removeTransform(v)), uM(v), {
        animationId: this.root.animationId,
        measuredBox: y,
        layoutBox: v,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement: h } = this.options;
      if (!h)
        return ne();
      const y = h.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(sM))) {
        const { scroll: S } = this.root;
        S && (Rn(y.x, S.offset.x), Rn(y.y, S.offset.y));
      }
      return y;
    }
    removeElementScroll(h) {
      const y = ne();
      if (mn(y, h), this.scroll?.wasRoot)
        return y;
      for (let v = 0; v < this.path.length; v++) {
        const S = this.path[v], { scroll: p, options: g } = S;
        S !== this.root && p && g.layoutScroll && (p.wasRoot && mn(y, h), Rn(y.x, p.offset.x), Rn(y.y, p.offset.y));
      }
      return y;
    }
    applyTransform(h, y = !1, v) {
      const S = v || ne();
      mn(S, h);
      for (let p = 0; p < this.path.length; p++) {
        const g = this.path[p];
        !y && g.options.layoutScroll && g.scroll && g !== g.root && (Rn(S.x, -g.scroll.offset.x), Rn(S.y, -g.scroll.offset.y)), $i(g.latestValues) && no(S, g.latestValues, g.layout?.layoutBox);
      }
      return $i(this.latestValues) && no(S, this.latestValues, this.layout?.layoutBox), S;
    }
    removeTransform(h) {
      const y = ne();
      mn(y, h);
      for (let v = 0; v < this.path.length; v++) {
        const S = this.path[v];
        if (!$i(S.latestValues))
          continue;
        let p;
        S.instance && (qf(S.latestValues) && S.updateSnapshot(), p = ne(), mn(p, S.measurePageBox())), Z0(y, S.latestValues, S.snapshot?.layoutBox, p);
      }
      return $i(this.latestValues) && Z0(y, this.latestValues), y;
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
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== ve.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(h = !1) {
      const y = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = y.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = y.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = y.isSharedProjectionDirty);
      const v = !!this.resumingFrom || this !== y;
      if (!(h || v && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: p, layoutId: g } = this.options;
      if (!this.layout || !(p || g))
        return;
      this.resolvedRelativeTargetAt = ve.timestamp;
      const b = this.getClosestProjectingParent();
      b && this.linkedParentVersion !== b.layoutVersion && !b.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && b && b.layout ? this.createRelativeTarget(b, this.layout.layoutBox, b.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = ne(), this.targetWithTransforms = ne()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), R2(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : mn(this.target, this.layout.layoutBox), qv(this.target, this.targetDelta)) : mn(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && b && !!b.resumingFrom == !!this.resumingFrom && !b.options.layoutScroll && b.target && this.animationProgress !== 1 ? this.createRelativeTarget(b, this.target, b.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || qf(this.parent.latestValues) || Yv(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(h, y, v) {
      this.relativeParent = h, this.linkedParentVersion = h.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = ne(), this.relativeTargetOrigin = ne(), mo(this.relativeTargetOrigin, y, v, this.options.layoutAnchor || void 0), mn(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      const h = this.getLead(), y = !!this.resumingFrom || this !== h;
      let v = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (v = !1), y && (this.isSharedProjectionDirty || this.isTransformDirty) && (v = !1), this.resolvedRelativeTargetAt === ve.timestamp && (v = !1), v)
        return;
      const { layout: S, layoutId: p } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(S || p))
        return;
      mn(this.layoutCorrected, this.layout.layoutBox);
      const g = this.treeScale.x, b = this.treeScale.y;
      a2(this.layoutCorrected, this.treeScale, this.path, y), h.layout && !h.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (h.target = h.layout.layoutBox, h.targetWithTransforms = ne());
      const { target: _ } = h;
      if (!_) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (j0(this.prevProjectionDelta.x, this.projectionDelta.x), j0(this.prevProjectionDelta.y, this.projectionDelta.y)), ru(this.projectionDelta, this.layoutCorrected, _, this.latestValues), (this.treeScale.x !== g || this.treeScale.y !== b || !k0(this.projectionDelta.x, this.prevProjectionDelta.x) || !k0(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", _));
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
      this.prevProjectionDelta = el(), this.projectionDelta = el(), this.projectionDeltaWithTransform = el();
    }
    setAnimationOrigin(h, y = !1, v) {
      const S = this.snapshot, p = S ? S.latestValues : {}, g = { ...this.latestValues }, b = el();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !y;
      const _ = ne(), z = S ? S.source : void 0, w = this.layout ? this.layout.source : void 0, U = z !== w, L = this.getStack(), j = !L || L.members.length <= 1, Q = !!(U && !j && this.options.crossfade === !0 && !this.path.some(aM));
      this.animationProgress = 0;
      let B;
      const k = v?.interpolateProjection(h);
      this.mixTargetDelta = (ot) => {
        const Z = ot / 1e3, q = k?.(Z);
        q ? (b.x.translate = q.x, b.x.scale = Ht(h.x.scale, 1, Z), b.x.origin = h.x.origin, b.x.originPoint = h.x.originPoint, b.y.translate = q.y, b.y.scale = Ht(h.y.scale, 1, Z), b.y.origin = h.y.origin, b.y.originPoint = h.y.originPoint) : (ip(b.x, h.x, Z), ip(b.y, h.y, Z)), this.setTargetDelta(b), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (mo(_, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), iM(this.relativeTarget, this.relativeTargetOrigin, _, Z), B && N2(this.relativeTarget, B) && (this.isProjectionDirty = !1), B || (B = ne()), mn(B, this.relativeTarget)), U && (this.animationValues = g, B2(g, p, this.latestValues, Z, Q, j)), q && q.rotate !== void 0 && (this.animationValues || (this.animationValues = g), this.animationValues.pathRotation = q.rotate), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = Z;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(h) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (Pn(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = jt.update(() => {
        ao.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = xi(0)), this.motionValue.jump(0, !1), this.currentAnimation = a1(this.motionValue, [0, 1e3], {
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
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(X2), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const h = this.getLead();
      let { targetWithTransforms: y, target: v, layout: S, latestValues: p } = h;
      if (!(!y || !v || !S)) {
        if (this !== h && this.layout && S && s1(this.options.animationType, this.layout.layoutBox, S.layoutBox)) {
          v = this.target || ne();
          const g = Oe(this.layout.layoutBox.x);
          v.x.min = h.target.x.min, v.x.max = v.x.min + g;
          const b = Oe(this.layout.layoutBox.y);
          v.y.min = h.target.y.min, v.y.max = v.y.min + b;
        }
        mn(y, v), no(y, p), ru(this.projectionDeltaWithTransform, this.layoutCorrected, y, p);
      }
    }
    registerSharedNode(h, y) {
      this.sharedNodes.has(h) || this.sharedNodes.set(h, new G2()), this.sharedNodes.get(h).add(y);
      const S = y.options.initialPromotionConfig;
      y.promote({
        transition: S ? S.transition : void 0,
        preserveFollowOpacity: S && S.shouldPreserveFollowOpacity ? S.shouldPreserveFollowOpacity(y) : void 0
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
    promote({ needsReset: h, transition: y, preserveFollowOpacity: v } = {}) {
      const S = this.getStack();
      S && S.promote(this, v), h && (this.projectionDelta = void 0, this.needsReset = !0), y && this.setOptions({ transition: y });
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
      const { latestValues: v } = h;
      if ((v.z || v.rotate || v.rotateX || v.rotateY || v.rotateZ || v.skewX || v.skewY) && (y = !0), !y)
        return;
      const S = {};
      v.z && mf("z", h, S, this.animationValues);
      for (let p = 0; p < df.length; p++)
        mf(`rotate${df[p]}`, h, S, this.animationValues), mf(`skew${df[p]}`, h, S, this.animationValues);
      h.render();
      for (const p in S)
        h.setStaticValue(p, S[p]), this.animationValues && (this.animationValues[p] = S[p]);
      h.scheduleRender();
    }
    applyProjectionStyles(h, y) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        h.visibility = "hidden";
        return;
      }
      const v = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, h.visibility = "", h.opacity = "", h.pointerEvents = io(y?.pointerEvents) || "", h.transform = v ? v(this.latestValues, "") : "none";
        return;
      }
      const S = this.getLead();
      if (!this.projectionDelta || !this.layout || !S.target) {
        this.options.layoutId && (h.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, h.pointerEvents = io(y?.pointerEvents) || ""), this.hasProjected && !$i(this.latestValues) && (h.transform = v ? v({}, "") : "none", this.hasProjected = !1);
        return;
      }
      h.visibility = "";
      const p = S.animationValues || S.latestValues;
      this.applyTransformsToTarget();
      let g = U2(this.projectionDeltaWithTransform, this.treeScale, p);
      v && (g = v(p, g)), h.transform = g;
      const { x: b, y: _ } = this.projectionDelta;
      h.transformOrigin = `${b.origin * 100}% ${_.origin * 100}% 0`, S.animationValues ? h.opacity = S === this ? p.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : p.opacityExit : h.opacity = S === this ? p.opacity !== void 0 ? p.opacity : "" : p.opacityExit !== void 0 ? p.opacityExit : 0;
      for (const z in Xf) {
        if (p[z] === void 0)
          continue;
        const { correct: w, applyTo: U, isCSSVariable: L } = Xf[z], j = g === "none" ? p[z] : w(p[z], S);
        if (U) {
          const Q = U.length;
          for (let B = 0; B < Q; B++)
            h[U[B]] = j;
        } else
          L ? this.options.visualElement.renderState.vars[z] = j : h[z] = j;
      }
      this.options.layoutId && (h.pointerEvents = S === this ? io(y?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((h) => h.currentAnimation?.stop()), this.root.nodes.forEach(tp), this.root.sharedNodes.clear();
    }
  };
}
function Z2(a) {
  a.updateLayout();
}
function K2(a) {
  const l = a.resumeFrom?.snapshot || a.snapshot;
  if (a.isLead() && a.layout && l && a.hasListeners("didUpdate")) {
    const { layoutBox: o, measuredBox: r } = a.layout, { animationType: c } = a.options, d = l.source !== a.layout.source;
    if (c === "size")
      On((p) => {
        const g = d ? l.measuredBox[p] : l.layoutBox[p], b = Oe(g);
        g.min = o[p].min, g.max = g.min + b;
      });
    else if (c === "x" || c === "y") {
      const p = c === "x" ? "y" : "x";
      Qf(d ? l.measuredBox[p] : l.layoutBox[p], o[p]);
    } else s1(c, l.layoutBox, o) && On((p) => {
      const g = d ? l.measuredBox[p] : l.layoutBox[p], b = Oe(o[p]);
      g.max = g.min + b, a.relativeTarget && !a.currentAnimation && (a.isProjectionDirty = !0, a.relativeTarget[p].max = a.relativeTarget[p].min + b);
    });
    const h = el();
    ru(h, o, l.layoutBox);
    const y = el();
    d ? ru(y, a.applyTransform(r, !0), l.measuredBox) : ru(y, o, l.layoutBox);
    const v = !e1(h);
    let S = !1;
    if (!a.resumeFrom) {
      const p = a.getClosestProjectingParent();
      if (p && !p.resumeFrom) {
        const { snapshot: g, layout: b } = p;
        if (g && b) {
          const _ = a.options.layoutAnchor || void 0, z = ne();
          mo(z, l.layoutBox, g.layoutBox, _);
          const w = ne();
          mo(w, o, b.layoutBox, _), n1(z, w) || (S = !0), p.options.layoutRoot && (a.relativeTarget = w, a.relativeTargetOrigin = z, a.relativeParent = p);
        }
      }
    }
    a.notifyListeners("didUpdate", {
      layout: o,
      snapshot: l,
      delta: y,
      layoutDelta: h,
      hasLayoutChanged: v,
      hasRelativeLayoutChanged: S
    });
  } else if (a.isLead()) {
    const { onExitComplete: o } = a.options;
    o && o();
  }
  a.options.transition = void 0;
}
function J2(a) {
  a.parent && (a.isProjecting() || (a.isProjectionDirty = a.parent.isProjectionDirty), a.isSharedProjectionDirty || (a.isSharedProjectionDirty = !!(a.isProjectionDirty || a.parent.isProjectionDirty || a.parent.isSharedProjectionDirty)), a.isTransformDirty || (a.isTransformDirty = a.parent.isTransformDirty));
}
function F2(a) {
  a.isProjectionDirty = a.isSharedProjectionDirty = a.isTransformDirty = !1;
}
function P2(a) {
  a.clearSnapshot();
}
function tp(a) {
  a.clearMeasurements();
}
function k2(a) {
  a.isLayoutDirty = !0, a.updateLayout();
}
function ep(a) {
  a.isLayoutDirty = !1;
}
function W2(a) {
  a.isAnimationBlocked && a.layout && !a.isLayoutDirty && (a.snapshot = a.layout, a.isLayoutDirty = !0);
}
function I2(a) {
  const { visualElement: l } = a.options;
  l && l.getProps().onBeforeLayoutMeasure && l.notify("BeforeLayoutMeasure"), a.resetTransform();
}
function np(a) {
  a.finishAnimation(), a.targetDelta = a.relativeTarget = a.target = void 0, a.isProjectionDirty = !0;
}
function $2(a) {
  a.resolveTargetDelta();
}
function tM(a) {
  a.calcProjection();
}
function eM(a) {
  a.resetSkewAndRotation();
}
function nM(a) {
  a.removeLeadSnapshot();
}
function ip(a, l, o) {
  a.translate = Ht(l.translate, 0, o), a.scale = Ht(l.scale, 1, o), a.origin = l.origin, a.originPoint = l.originPoint;
}
function ap(a, l, o, r) {
  a.min = Ht(l.min, o.min, r), a.max = Ht(l.max, o.max, r);
}
function iM(a, l, o, r) {
  ap(a.x, l.x, o.x, r), ap(a.y, l.y, o.y, r);
}
function aM(a) {
  return a.animationValues && a.animationValues.opacityExit !== void 0;
}
const lM = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, lp = (a) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(a), up = lp("applewebkit/") && !lp("chrome/") ? Math.round : ln;
function sp(a) {
  a.min = up(a.min), a.max = up(a.max);
}
function uM(a) {
  sp(a.x), sp(a.y);
}
function s1(a, l, o) {
  return a === "position" || a === "preserve-aspect" && !O2(P0(l), P0(o), 0.2);
}
function sM(a) {
  return a !== a.root && a.scroll?.wasRoot;
}
const oM = u1({
  attachResizeListener: (a, l) => yu(a, "resize", l),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body?.scrollTop || 0
  }),
  checkIsScrollRoot: () => !0
}), yf = {
  current: void 0
}, o1 = u1({
  measureScroll: (a) => ({
    x: a.scrollLeft,
    y: a.scrollTop
  }),
  defaultParent: () => {
    if (!yf.current) {
      const a = new oM({});
      a.mount(window), a.setOptions({ layoutScroll: !0 }), yf.current = a;
    }
    return yf.current;
  },
  resetTransform: (a, l) => {
    a.style.transform = l !== void 0 ? l : "none";
  },
  checkIsScrollRoot: (a) => window.getComputedStyle(a).position === "fixed"
}), Ah = it.createContext({
  transformPagePoint: (a) => a,
  isStatic: !1,
  reducedMotion: "never"
});
function rM(a = !0) {
  const l = it.useContext(Pf);
  if (l === null)
    return [!0, null];
  const { isPresent: o, onExitComplete: r, register: c } = l, d = it.useId();
  it.useEffect(() => {
    if (a)
      return c(d);
  }, [a]);
  const h = it.useCallback(() => a && r && r(d), [d, r, a]);
  return !o && r ? [!1, h] : [!0];
}
const r1 = it.createContext({ strict: !1 }), op = {
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
let rp = !1;
function cM() {
  if (rp)
    return;
  const a = {};
  for (const l in op)
    a[l] = {
      isEnabled: (o) => op[l].some((r) => !!o[r])
    };
  Bv(a), rp = !0;
}
function c1() {
  return cM(), e2();
}
function fM(a) {
  const l = c1();
  for (const o in a)
    l[o] = {
      ...l[o],
      ...a[o]
    };
  Bv(l);
}
const hM = /* @__PURE__ */ new Set([
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
function yo(a) {
  return a.startsWith("while") || a.startsWith("drag") && a !== "draggable" || a.startsWith("layout") || a.startsWith("onTap") || a.startsWith("onPan") || a.startsWith("onLayout") || hM.has(a);
}
let f1 = (a) => !yo(a);
function dM(a) {
  typeof a == "function" && (f1 = (l) => l.startsWith("on") ? !yo(l) : a(l));
}
try {
  dM(require("@emotion/is-prop-valid").default);
} catch {
}
function mM(a, l, o) {
  const r = {};
  for (const c in a)
    c === "values" && typeof a.values == "object" || le(a[c]) || (f1(c) || o === !0 && yo(c) || !l && !yo(c) || // If trying to use native HTML drag events, forward drag listeners
    a.draggable && c.startsWith("onDrag")) && (r[c] = a[c]);
  return r;
}
const bo = /* @__PURE__ */ it.createContext({});
function yM(a, l) {
  if (To(a)) {
    const { initial: o, animate: r } = a;
    return {
      initial: o === !1 || mu(o) ? o : void 0,
      animate: mu(r) ? r : void 0
    };
  }
  return a.inherit !== !1 ? l : {};
}
function gM(a) {
  const { initial: l, animate: o } = yM(a, it.useContext(bo));
  return it.useMemo(() => ({ initial: l, animate: o }), [cp(l), cp(o)]);
}
function cp(a) {
  return Array.isArray(a) ? a.join(" ") : a;
}
const Mh = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function h1(a, l, o) {
  for (const r in l)
    !le(l[r]) && !Qv(r, o) && (a[r] = l[r]);
}
function pM({ transformTemplate: a }, l) {
  return it.useMemo(() => {
    const o = Mh();
    return bh(o, l, a), Object.assign({}, o.vars, o.style);
  }, [l]);
}
function vM(a, l) {
  const o = a.style || {}, r = {};
  return h1(r, o, a), Object.assign(r, pM(a, l)), r;
}
function SM(a, l) {
  const o = {}, r = vM(a, l);
  return a.drag && a.dragListener !== !1 && (o.draggable = !1, r.userSelect = r.WebkitUserSelect = r.WebkitTouchCallout = "none", r.touchAction = a.drag === !0 ? "none" : `pan-${a.drag === "x" ? "y" : "x"}`), a.tabIndex === void 0 && (a.onTap || a.onTapStart || a.whileTap) && (o.tabIndex = 0), o.style = r, o;
}
const d1 = () => ({
  ...Mh(),
  attrs: {}
});
function TM(a, l, o, r) {
  const c = it.useMemo(() => {
    const d = d1();
    return Kv(d, l, Fv(r), a.transformTemplate, a.style), {
      ...d.attrs,
      style: { ...d.style }
    };
  }, [l]);
  if (a.style) {
    const d = {};
    h1(d, a.style, a), c.style = { ...d, ...c.style };
  }
  return c;
}
const bM = [
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
function Dh(a) {
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
      !!(bM.indexOf(a) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(a))
    )
  );
}
function EM(a, l, o, { latestValues: r }, c, d = !1, h) {
  const v = (h ?? Dh(a) ? TM : SM)(l, r, c, a), S = mM(l, typeof a == "string", d), p = a !== it.Fragment ? { ...S, ...v, ref: o } : {}, { children: g } = l, b = it.useMemo(() => le(g) ? g.get() : g, [g]);
  return it.createElement(a, {
    ...p,
    children: b
  });
}
function AM({ scrapeMotionValuesFromProps: a, createRenderState: l }, o, r, c) {
  return {
    latestValues: MM(o, r, c, a),
    renderState: l()
  };
}
function MM(a, l, o, r) {
  const c = {}, d = r(a, {});
  for (const b in d)
    c[b] = io(d[b]);
  let { initial: h, animate: y } = a;
  const v = To(a), S = Uv(a);
  l && S && !v && a.inherit !== !1 && (h === void 0 && (h = l.initial), y === void 0 && (y = l.animate));
  let p = o ? o.initial === !1 : !1;
  p = p || h === !1;
  const g = p ? y : h;
  if (g && typeof g != "boolean" && !So(g)) {
    const b = Array.isArray(g) ? g : [g];
    for (let _ = 0; _ < b.length; _++) {
      const z = fh(a, b[_]);
      if (z) {
        const { transitionEnd: w, transition: U, ...L } = z;
        for (const j in L) {
          let Q = L[j];
          if (Array.isArray(Q)) {
            const B = p ? Q.length - 1 : 0;
            Q = Q[B];
          }
          Q !== null && (c[j] = Q);
        }
        for (const j in w)
          c[j] = w[j];
      }
    }
  }
  return c;
}
const m1 = (a) => (l, o) => {
  const r = it.useContext(bo), c = it.useContext(Pf), d = () => AM(a, l, r, c);
  return o ? d() : Ff(d);
}, DM = /* @__PURE__ */ m1({
  scrapeMotionValuesFromProps: Eh,
  createRenderState: Mh
}), CM = /* @__PURE__ */ m1({
  scrapeMotionValuesFromProps: Pv,
  createRenderState: d1
}), xM = /* @__PURE__ */ Symbol.for("motionComponentSymbol");
function OM(a, l, o) {
  const r = it.useRef(o);
  it.useInsertionEffect(() => {
    r.current = o;
  });
  const c = it.useRef(null);
  return it.useCallback((d) => {
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
const y1 = it.createContext({});
function Ia(a) {
  return a && typeof a == "object" && Object.prototype.hasOwnProperty.call(a, "current");
}
function RM(a, l, o, r, c, d) {
  const { visualElement: h } = it.useContext(bo), y = it.useContext(r1), v = it.useContext(Pf), S = it.useContext(Ah), p = S.reducedMotion, g = S.skipAnimations, b = it.useRef(null), _ = it.useRef(!1);
  r = r || y.renderer, !b.current && r && (b.current = r(a, {
    visualState: l,
    parent: h,
    props: o,
    presenceContext: v,
    blockInitialAnimation: v ? v.initial === !1 : !1,
    reducedMotionConfig: p,
    skipAnimations: g,
    isSVG: d
  }), _.current && b.current && (b.current.manuallyAnimateOnMount = !0));
  const z = b.current, w = it.useContext(y1);
  z && !z.projection && c && (z.type === "html" || z.type === "svg") && zM(b.current, o, c, w);
  const U = it.useRef(!1);
  it.useInsertionEffect(() => {
    z && U.current && z.update(o, v);
  });
  const L = o[Av], j = it.useRef(!!L && typeof window < "u" && !window.MotionHandoffIsComplete?.(L) && window.MotionHasOptimisedAnimation?.(L));
  return _p(() => {
    _.current = !0, z && (U.current = !0, window.MotionIsMounted = !0, z.updateFeatures(), z.scheduleRenderMicrotask(), j.current && z.animationState && z.animationState.animateChanges());
  }), it.useEffect(() => {
    z && (!j.current && z.animationState && z.animationState.animateChanges(), j.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(L);
    }), j.current = !1), z.enteringChildren = void 0);
  }), z;
}
function zM(a, l, o, r) {
  const { layoutId: c, layout: d, drag: h, dragConstraints: y, layoutScroll: v, layoutRoot: S, layoutAnchor: p, layoutCrossfade: g } = l;
  a.projection = new o(a.latestValues, l["data-framer-portal-id"] ? void 0 : g1(a.parent)), a.projection.setOptions({
    layoutId: c,
    layout: d,
    alwaysMeasureLayout: !!h || y && Ia(y),
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
    crossfade: g,
    layoutScroll: v,
    layoutRoot: S,
    layoutAnchor: p
  });
}
function g1(a) {
  if (a)
    return a.options.allowProjection !== !1 ? a.projection : g1(a.parent);
}
function gf(a, { forwardMotionProps: l = !1, type: o } = {}, r, c) {
  r && fM(r);
  const d = o ? o === "svg" : Dh(a), h = d ? CM : DM;
  function y(S, p) {
    let g;
    const b = {
      ...it.useContext(Ah),
      ...S,
      layoutId: _M(S)
    }, { isStatic: _ } = b, z = gM(S), w = h(S, _);
    if (!_ && typeof window < "u") {
      VM();
      const U = NM(b);
      g = U.MeasureLayout, z.visualElement = RM(a, w, b, c, U.ProjectionNode, d);
    }
    return zn.jsxs(bo.Provider, { value: z, children: [g && z.visualElement ? zn.jsx(g, { visualElement: z.visualElement, ...b }) : null, EM(a, S, OM(w, z.visualElement, p), w, _, l, d)] });
  }
  y.displayName = `motion.${typeof a == "string" ? a : `create(${a.displayName ?? a.name ?? ""})`}`;
  const v = it.forwardRef(y);
  return v[xM] = a, v;
}
function _M({ layoutId: a }) {
  const l = it.useContext(zp).id;
  return l && a !== void 0 ? l + "-" + a : a;
}
function VM(a, l) {
  it.useContext(r1).strict;
}
function NM(a) {
  const l = c1(), { drag: o, layout: r } = l;
  if (!o && !r)
    return {};
  const c = { ...o, ...r };
  return {
    MeasureLayout: o?.isEnabled(a) || r?.isEnabled(a) ? c.MeasureLayout : void 0,
    ProjectionNode: c.ProjectionNode
  };
}
function UM(a, l) {
  if (typeof Proxy > "u")
    return gf;
  const o = /* @__PURE__ */ new Map(), r = (d, h) => gf(d, h, a, l), c = (d, h) => r(d, h);
  return new Proxy(c, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (d, h) => h === "create" ? r : (o.has(h) || o.set(h, gf(h, void 0, a, l)), o.get(h))
  });
}
const wM = (a, l) => l.isSVG ?? Dh(a) ? new kv(l) : new Zv(l, {
  allowProjection: a !== it.Fragment
});
class BM extends Oi {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(l) {
    super(l), l.animationState || (l.animationState = E2(l));
  }
  updateAnimationControlsSubscription() {
    const { animate: l } = this.node.getProps();
    So(l) && (this.unmountControls = l.subscribe(this.node));
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
let LM = 0;
class HM extends Oi {
  constructor() {
    super(...arguments), this.id = LM++, this.isExitComplete = !1;
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
          const y = ia(this.node, d, h);
          if (y) {
            const { transition: v, transitionEnd: S, ...p } = y;
            for (const g in p)
              this.node.getValue(g)?.jump(p[g]);
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
const jM = {
  animation: {
    Feature: BM
  },
  exit: {
    Feature: HM
  }
};
function Su(a) {
  return {
    point: {
      x: a.pageX,
      y: a.pageY
    }
  };
}
const YM = (a) => (l) => ph(l) && a(l, Su(l));
function cu(a, l, o, r) {
  return yu(a, l, YM(o), r);
}
const p1 = ({ current: a }) => a ? a.ownerDocument.defaultView : null, fp = (a, l) => Math.abs(a - l);
function qM(a, l) {
  const o = fp(a.x, l.x), r = fp(a.y, l.y);
  return Math.sqrt(o ** 2 + r ** 2);
}
const hp = /* @__PURE__ */ new Set(["auto", "scroll"]);
class v1 {
  constructor(l, o, { transformPagePoint: r, contextWindow: c = window, dragSnapToOrigin: d = !1, distanceThreshold: h = 3, element: y } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (z) => {
      this.handleScroll(z.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = Ps(this.lastRawMoveEventInfo, this.transformPagePoint));
      const z = pf(this.lastMoveEventInfo, this.history), w = this.startEvent !== null, U = qM(z.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!w && !U)
        return;
      const { point: L } = z, { timestamp: j } = ve;
      this.history.push({ ...L, timestamp: j });
      const { onStart: Q, onMove: B } = this.handlers;
      w || (Q && Q(this.lastMoveEvent, z), this.startEvent = this.lastMoveEvent), B && B(this.lastMoveEvent, z);
    }, this.handlePointerMove = (z, w) => {
      this.lastMoveEvent = z, this.lastRawMoveEventInfo = w, this.lastMoveEventInfo = Ps(w, this.transformPagePoint), jt.update(this.updatePoint, !0);
    }, this.handlePointerUp = (z, w) => {
      this.end();
      const { onEnd: U, onSessionEnd: L, resumeAnimation: j } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && j && j(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const Q = pf(z.type === "pointercancel" ? this.lastMoveEventInfo : Ps(w, this.transformPagePoint), this.history);
      this.startEvent && U && U(z, Q), L && L(z, Q);
    }, !ph(l))
      return;
    this.dragSnapToOrigin = d, this.handlers = o, this.transformPagePoint = r, this.distanceThreshold = h, this.contextWindow = c || window;
    const v = Su(l), S = Ps(v, this.transformPagePoint), { point: p } = S, { timestamp: g } = ve;
    this.history = [{ ...p, timestamp: g }];
    const { onSessionStart: b } = o;
    b && b(l, pf(S, this.history));
    const _ = { passive: !0, capture: !0 };
    this.removeListeners = gu(cu(this.contextWindow, "pointermove", this.handlePointerMove, _), cu(this.contextWindow, "pointerup", this.handlePointerUp, _), cu(this.contextWindow, "pointercancel", this.handlePointerUp, _)), y && this.startScrollTracking(y);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(l) {
    let o = l.parentElement;
    for (; o; ) {
      const r = getComputedStyle(o);
      (hp.has(r.overflowX) || hp.has(r.overflowY)) && this.scrollPositions.set(o, {
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
    d.x === 0 && d.y === 0 || (r ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += d.x, this.lastMoveEventInfo.point.y += d.y) : this.history.length > 0 && (this.history[0].x -= d.x, this.history[0].y -= d.y), this.scrollPositions.set(l, c), jt.update(this.updatePoint, !0));
  }
  updateHandlers(l) {
    this.handlers = l;
  }
  end() {
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), Pn(this.updatePoint);
  }
}
function Ps(a, l) {
  return l ? { point: l(a.point) } : a;
}
function dp(a, l) {
  return { x: a.x - l.x, y: a.y - l.y };
}
function pf({ point: a }, l) {
  return {
    point: a,
    delta: dp(a, S1(l)),
    offset: dp(a, GM(l)),
    velocity: XM(l, 0.1)
  };
}
function GM(a) {
  return a[0];
}
function S1(a) {
  return a[a.length - 1];
}
function XM(a, l) {
  if (a.length < 2)
    return { x: 0, y: 0 };
  let o = a.length - 1, r = null;
  const c = S1(a);
  for (; o >= 0 && (r = a[o], !(c.timestamp - r.timestamp > /* @__PURE__ */ Be(l))); )
    o--;
  if (!r)
    return { x: 0, y: 0 };
  r === a[0] && a.length > 2 && c.timestamp - r.timestamp > /* @__PURE__ */ Be(l) * 2 && (r = a[1]);
  const d = /* @__PURE__ */ an(c.timestamp - r.timestamp);
  if (d === 0)
    return { x: 0, y: 0 };
  const h = {
    x: (c.x - r.x) / d,
    y: (c.y - r.y) / d
  };
  return h.x === 1 / 0 && (h.x = 0), h.y === 1 / 0 && (h.y = 0), h;
}
function QM(a, { min: l, max: o }, r) {
  return l !== void 0 && a < l ? a = r ? Ht(l, a, r.min) : Math.max(a, l) : o !== void 0 && a > o && (a = r ? Ht(o, a, r.max) : Math.min(a, o)), a;
}
function mp(a, l, o) {
  return {
    min: l !== void 0 ? a.min + l : void 0,
    max: o !== void 0 ? a.max + o - (a.max - a.min) : void 0
  };
}
function ZM(a, { top: l, left: o, bottom: r, right: c }) {
  return {
    x: mp(a.x, o, c),
    y: mp(a.y, l, r)
  };
}
function yp(a, l) {
  let o = l.min - a.min, r = l.max - a.max;
  return l.max - l.min < a.max - a.min && ([o, r] = [r, o]), { min: o, max: r };
}
function KM(a, l) {
  return {
    x: yp(a.x, l.x),
    y: yp(a.y, l.y)
  };
}
function JM(a, l) {
  let o = 0.5;
  const r = Oe(a), c = Oe(l);
  return c > r ? o = /* @__PURE__ */ il(l.min, l.max - r, a.min) : r > c && (o = /* @__PURE__ */ il(a.min, a.max - c, l.min)), Vn(0, 1, o);
}
function FM(a, l) {
  const o = {};
  return l.min !== void 0 && (o.min = l.min - a.min), l.max !== void 0 && (o.max = l.max - a.min), o;
}
const Zf = 0.35;
function PM(a = Zf) {
  return a === !1 ? a = 0 : a === !0 && (a = Zf), {
    x: gp(a, "left", "right"),
    y: gp(a, "top", "bottom")
  };
}
function gp(a, l, o) {
  return {
    min: pp(a, l),
    max: pp(a, o)
  };
}
function pp(a, l) {
  return typeof a == "number" ? a : a[l] || 0;
}
const kM = /* @__PURE__ */ new WeakMap();
class WM {
  constructor(l) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = ne(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = l;
  }
  start(l, { snapToCursor: o = !1, distanceThreshold: r } = {}) {
    const { presenceContext: c } = this.visualElement;
    if (c && c.isPresent === !1)
      return;
    const d = (g) => {
      o && this.snapToCursor(Su(g).point), this.stopAnimation();
    }, h = (g, b) => {
      const { drag: _, dragPropagation: z, onDragStart: w } = this.getProps();
      if (_ && !z && (this.openDragLock && this.openDragLock(), this.openDragLock = NA(_), !this.openDragLock))
        return;
      this.latestPointerEvent = g, this.latestPanInfo = b, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), On((L) => {
        let j = this.getAxisMotionValue(L).get() || 0;
        if (_n.test(j)) {
          const { projection: Q } = this.visualElement;
          if (Q && Q.layout) {
            const B = Q.layout.layoutBox[L];
            B && (j = Oe(B) * (parseFloat(j) / 100));
          }
        }
        this.originPoint[L] = j;
      }), w && jt.update(() => w(g, b), !1, !0), Bf(this.visualElement, "transform");
      const { animationState: U } = this.visualElement;
      U && U.setActive("whileDrag", !0);
    }, y = (g, b) => {
      this.latestPointerEvent = g, this.latestPanInfo = b;
      const { dragPropagation: _, dragDirectionLock: z, onDirectionLock: w, onDrag: U } = this.getProps();
      if (!_ && !this.openDragLock)
        return;
      const { offset: L } = b;
      if (z && this.currentDirection === null) {
        this.currentDirection = $M(L), this.currentDirection !== null && w && w(this.currentDirection);
        return;
      }
      this.updateAxis("x", b.point, L), this.updateAxis("y", b.point, L), this.visualElement.render(), U && jt.update(() => U(g, b), !1, !0);
    }, v = (g, b) => {
      this.latestPointerEvent = g, this.latestPanInfo = b, this.stop(g, b), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, S = () => {
      const { dragSnapToOrigin: g } = this.getProps();
      (g || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: p } = this.getProps();
    this.panSession = new v1(l, {
      onSessionStart: d,
      onStart: h,
      onMove: y,
      onSessionEnd: v,
      resumeAnimation: S
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: p,
      distanceThreshold: r,
      contextWindow: p1(this.visualElement),
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
    y && jt.postRender(() => y(r, c));
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
    if (!r || !ks(l, c, this.currentDirection))
      return;
    const d = this.getAxisMotionValue(l);
    let h = this.originPoint[l] + r[l];
    this.constraints && this.constraints[l] && (h = QM(h, this.constraints[l], this.elastic[l])), d.set(h);
  }
  resolveConstraints() {
    const { dragConstraints: l, dragElastic: o } = this.getProps(), r = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, c = this.constraints;
    l && Ia(l) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : l && r ? this.constraints = ZM(r.layoutBox, l) : this.constraints = !1, this.elastic = PM(o), c !== this.constraints && !Ia(l) && r && this.constraints && !this.hasMutatedConstraints && On((d) => {
      this.constraints !== !1 && this.getAxisMotionValue(d) && (this.constraints[d] = FM(r.layoutBox[d], this.constraints[d]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: l, onMeasureDragConstraints: o } = this.getProps();
    if (!l || !Ia(l))
      return !1;
    const r = l.current, { projection: c } = this.visualElement;
    if (!c || !c.layout)
      return !1;
    c.root && (c.root.scroll = void 0, c.root.updateScroll());
    const d = l2(r, c.root, this.visualElement.getTransformPagePoint());
    let h = KM(c.layout.layoutBox, d);
    if (o) {
      const y = o(n2(h));
      this.hasMutatedConstraints = !!y, y && (h = jv(y));
    }
    return h;
  }
  startAnimation(l) {
    const { drag: o, dragMomentum: r, dragElastic: c, dragTransition: d, dragSnapToOrigin: h, onDragTransitionEnd: y } = this.getProps(), v = this.constraints || {}, S = On((p) => {
      if (!ks(p, o, this.currentDirection))
        return;
      let g = v && v[p] || {};
      (h === !0 || h === p) && (g = { min: 0, max: 0 });
      const b = c ? 200 : 1e6, _ = c ? 40 : 1e7, z = {
        type: "inertia",
        velocity: r ? l[p] : 0,
        bounceStiffness: b,
        bounceDamping: _,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...d,
        ...g
      };
      return this.startAxisValueAnimation(p, z);
    });
    return Promise.all(S).then(y);
  }
  startAxisValueAnimation(l, o) {
    const r = this.getAxisMotionValue(l);
    return Bf(this.visualElement, l), r.start(ch(l, r, 0, o, this.visualElement, !1));
  }
  stopAnimation() {
    On((l) => this.getAxisMotionValue(l).stop());
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
    On((o) => {
      const { drag: r } = this.getProps();
      if (!ks(o, r, this.currentDirection))
        return;
      const { projection: c } = this.visualElement, d = this.getAxisMotionValue(o);
      if (c && c.layout) {
        const { min: h, max: y } = c.layout.layoutBox[o], v = d.get() || 0;
        d.set(l[o] - Ht(h, y, 0.5) + v);
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
    if (!Ia(o) || !r || !this.constraints)
      return;
    this.stopAnimation();
    const c = { x: 0, y: 0 };
    On((h) => {
      const y = this.getAxisMotionValue(h);
      if (y && this.constraints !== !1) {
        const v = y.get();
        c[h] = JM({ min: v, max: v }, this.constraints[h]);
      }
    });
    const { transformTemplate: d } = this.visualElement.getProps();
    this.visualElement.current.style.transform = d ? d({}, "") : "none", r.root && r.root.updateScroll(), r.updateLayout(), this.constraints = !1, this.resolveConstraints(), On((h) => {
      if (!ks(h, l, null))
        return;
      const y = this.getAxisMotionValue(h), { min: v, max: S } = this.constraints[h];
      y.set(Ht(v, S, c[h]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    kM.set(this.visualElement, this);
    const l = this.visualElement.current, o = cu(l, "pointerdown", (S) => {
      const { drag: p, dragListener: g = !0 } = this.getProps(), b = S.target, _ = b !== l && jA(b);
      p && g && !_ && this.start(S);
    });
    let r;
    const c = () => {
      const { dragConstraints: S } = this.getProps();
      Ia(S) && S.current && (this.constraints = this.resolveRefConstraints(), r || (r = IM(l, S.current, () => this.scalePositionWithinConstraints())));
    }, { projection: d } = this.visualElement, h = d.addEventListener("measure", c);
    d && !d.layout && (d.root && d.root.updateScroll(), d.updateLayout()), jt.read(c);
    const y = yu(window, "resize", () => this.scalePositionWithinConstraints()), v = d.addEventListener("didUpdate", (({ delta: S, hasLayoutChanged: p }) => {
      this.isDragging && p && (On((g) => {
        const b = this.getAxisMotionValue(g);
        b && (this.originPoint[g] += S[g].translate, b.set(b.get() + S[g].translate));
      }), this.visualElement.render());
    }));
    return () => {
      y(), o(), h(), v && v(), r && r();
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
function vp(a) {
  let l = !0;
  return () => {
    if (l) {
      l = !1;
      return;
    }
    a();
  };
}
function IM(a, l, o) {
  const r = x0(a, vp(o)), c = x0(l, vp(o));
  return () => {
    r(), c();
  };
}
function ks(a, l, o) {
  return (l === !0 || l === a) && (o === null || o === a);
}
function $M(a, l = 10) {
  let o = null;
  return Math.abs(a.y) > l ? o = "y" : Math.abs(a.x) > l && (o = "x"), o;
}
class t3 extends Oi {
  constructor(l) {
    super(l), this.removeGroupControls = ln, this.removeListeners = ln, this.controls = new WM(l);
  }
  mount() {
    const { dragControls: l } = this.node.getProps();
    l && (this.removeGroupControls = l.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || ln;
  }
  update() {
    const { dragControls: l } = this.node.getProps(), { dragControls: o } = this.node.prevProps || {};
    l !== o && (this.removeGroupControls(), l && (this.removeGroupControls = l.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
  }
}
const vf = (a) => (l, o) => {
  a && jt.update(() => a(l, o), !1, !0);
};
class e3 extends Oi {
  constructor() {
    super(...arguments), this.removePointerDownListener = ln;
  }
  onPointerDown(l) {
    this.session = new v1(l, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: p1(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: l, onPanStart: o, onPan: r, onPanEnd: c } = this.node.getProps();
    return {
      onSessionStart: vf(l),
      onStart: vf(o),
      onMove: vf(r),
      onEnd: (d, h) => {
        delete this.session, c && jt.postRender(() => c(d, h));
      }
    };
  }
  mount() {
    this.removePointerDownListener = cu(this.node.current, "pointerdown", (l) => this.onPointerDown(l));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let Sf = !1;
class n3 extends it.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: l, layoutGroup: o, switchLayoutGroup: r, layoutId: c } = this.props, { projection: d } = l;
    d && (o.group && o.group.add(d), r && r.register && c && r.register(d), Sf && d.root.didUpdate(), d.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), d.setOptions({
      ...d.options,
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    })), ao.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(l) {
    const { layoutDependency: o, visualElement: r, drag: c, isPresent: d } = this.props, { projection: h } = r;
    return h && (h.isPresent = d, l.layoutDependency !== o && h.setOptions({
      ...h.options,
      layoutDependency: o
    }), Sf = !0, c || l.layoutDependency !== o || o === void 0 || l.isPresent !== d ? h.willUpdate() : this.safeToRemove(), l.isPresent !== d && (d ? h.promote() : h.relegate() || jt.postRender(() => {
      const y = h.getStack();
      (!y || !y.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { visualElement: l, layoutAnchor: o } = this.props, { projection: r } = l;
    r && (r.options.layoutAnchor = o, r.root.didUpdate(), gh.postRender(() => {
      !r.currentAnimation && r.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: l, layoutGroup: o, switchLayoutGroup: r } = this.props, { projection: c } = l;
    Sf = !0, c && (c.scheduleCheckAfterUnmount(), o && o.group && o.group.remove(c), r && r.deregister && r.deregister(c));
  }
  safeToRemove() {
    const { safeToRemove: l } = this.props;
    l && l();
  }
  render() {
    return null;
  }
}
function T1(a) {
  const [l, o] = rM(), r = it.useContext(zp);
  return zn.jsx(n3, { ...a, layoutGroup: r, switchLayoutGroup: it.useContext(y1), isPresent: l, safeToRemove: o });
}
const i3 = {
  pan: {
    Feature: e3
  },
  drag: {
    Feature: t3,
    ProjectionNode: o1,
    MeasureLayout: T1
  }
};
function Sp(a, l, o) {
  const { props: r } = a;
  a.animationState && r.whileHover && a.animationState.setActive("whileHover", o === "Start");
  const c = "onHover" + o, d = r[c];
  d && jt.postRender(() => d(l, Su(l)));
}
class a3 extends Oi {
  mount() {
    const { current: l } = this.node;
    l && (this.unmount = wA(l, (o, r) => (Sp(this.node, r, "Start"), (c) => Sp(this.node, c, "End"))));
  }
  unmount() {
  }
}
class l3 extends Oi {
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
    this.unmount = gu(yu(this.node.current, "focus", () => this.onFocus()), yu(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Tp(a, l, o) {
  const { props: r } = a;
  if (a.current instanceof HTMLButtonElement && a.current.disabled)
    return;
  a.animationState && r.whileTap && a.animationState.setActive("whileTap", o === "Start");
  const c = "onTap" + (o === "End" ? "" : o), d = r[c];
  d && jt.postRender(() => d(l, Su(l)));
}
class u3 extends Oi {
  mount() {
    const { current: l } = this.node;
    if (!l)
      return;
    const { globalTapTarget: o, propagate: r } = this.node.props;
    this.unmount = qA(l, (c, d) => (Tp(this.node, d, "Start"), (h, { success: y }) => Tp(this.node, h, y ? "End" : "Cancel")), {
      useGlobalTarget: o,
      stopPropagation: r?.tap === !1
    });
  }
  unmount() {
  }
}
const Kf = /* @__PURE__ */ new WeakMap(), Tf = /* @__PURE__ */ new WeakMap(), s3 = (a) => {
  const l = Kf.get(a.target);
  l && l(a);
}, o3 = (a) => {
  a.forEach(s3);
};
function r3({ root: a, ...l }) {
  const o = a || document;
  Tf.has(o) || Tf.set(o, {});
  const r = Tf.get(o), c = JSON.stringify(l);
  return r[c] || (r[c] = new IntersectionObserver(o3, { root: a, ...l })), r[c];
}
function c3(a, l, o) {
  const r = r3(l);
  return Kf.set(a, o), r.observe(a), () => {
    Kf.delete(a), r.unobserve(a);
  };
}
const f3 = {
  some: 0,
  all: 1
};
class h3 extends Oi {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: l = {} } = this.node.getProps(), { root: o, margin: r, amount: c = "some", once: d } = l, h = {
      root: o ? o.current : void 0,
      rootMargin: r,
      threshold: typeof c == "number" ? c : f3[c]
    }, y = (v) => {
      const { isIntersecting: S } = v;
      if (this.isInView === S || (this.isInView = S, d && !S && this.hasEnteredView))
        return;
      S && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", S);
      const { onViewportEnter: p, onViewportLeave: g } = this.node.getProps(), b = S ? p : g;
      b && b(v);
    };
    this.stopObserver = c3(this.node.current, h, y);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: l, prevProps: o } = this.node;
    ["amount", "margin", "root"].some(d3(l, o)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function d3({ viewport: a = {} }, { viewport: l = {} } = {}) {
  return (o) => a[o] !== l[o];
}
const m3 = {
  inView: {
    Feature: h3
  },
  tap: {
    Feature: u3
  },
  focus: {
    Feature: l3
  },
  hover: {
    Feature: a3
  }
}, y3 = {
  layout: {
    ProjectionNode: o1,
    MeasureLayout: T1
  }
}, g3 = {
  ...jM,
  ...m3,
  ...i3,
  ...y3
}, p3 = /* @__PURE__ */ UM(g3, wM);
function lo(a) {
  const l = Ff(() => xi(a)), { isStatic: o } = it.useContext(Ah);
  if (o) {
    const [, r] = it.useState(a);
    it.useEffect(() => l.on("change", r), []);
  }
  return l;
}
function b1(a, l) {
  const o = lo(l()), r = () => o.set(l());
  return r(), _p(() => {
    const c = () => jt.preRender(r, !1, !0), d = a.map((h) => h.on("change", c));
    return () => {
      d.forEach((h) => h()), Pn(r);
    };
  }), o;
}
function v3(a) {
  ou.current = [], a();
  const l = b1(ou.current, a);
  return ou.current = void 0, l;
}
function S3(a, l, o, r) {
  if (typeof a == "function")
    return v3(a);
  const d = kA(l, o, r), h = Array.isArray(a) ? bp(a, d) : bp([a], ([v]) => d(v)), y = Array.isArray(a) ? void 0 : a.accelerate;
  return y && !y.isTransformed && typeof l != "function" && Array.isArray(o) && r?.clamp !== !1 && (h.accelerate = {
    ...y,
    times: l,
    keyframes: o,
    isTransformed: !0
  }), h;
}
function bp(a, l) {
  const o = Ff(() => []);
  return b1(a, () => {
    o.length = 0;
    const r = a.length;
    for (let c = 0; c < r; c++)
      o[c] = a[c].get();
    return l(o);
  });
}
function T3() {
  !Th.current && wv();
  const [a] = it.useState(co.current);
  return a;
}
function Ch(a) {
  return typeof a == "object" && !Array.isArray(a);
}
function E1(a, l, o, r) {
  return a == null ? [] : typeof a == "string" && Ch(l) ? yh(a, o, r) : a instanceof NodeList ? Array.from(a) : Array.isArray(a) ? a.filter((c) => c != null) : [a];
}
function b3(a, l, o) {
  return a * (l + 1) + o * l;
}
function Ep(a, l, o, r) {
  return typeof l == "number" ? l : l.startsWith("-") || l.startsWith("+") ? Math.max(0, a + parseFloat(l)) : l === "<" ? o : l.startsWith("<") ? Math.max(0, o + parseFloat(l.slice(1))) : r.get(l) ?? a;
}
function E3(a, l, o) {
  for (let r = 0; r < a.length; r++) {
    const c = a[r];
    c.at > l && c.at < o && (nl(a, c), r--);
  }
}
function A3(a, l, o, r, c, d) {
  E3(a, c, d);
  for (let h = 0; h < l.length; h++)
    a.push({
      value: l[h],
      at: Ht(c, d, r[h]),
      easing: /* @__PURE__ */ Kp(o, h)
    });
}
function M3(a, l, o = 0) {
  const r = l + 1 + l * o;
  for (let c = 0; c < a.length; c++)
    a[c] = a[c] / r;
}
function D3(a, l) {
  return a.at === l.at ? a.value === null ? 1 : l.value === null ? -1 : 0 : a.at - l.at;
}
const C3 = "easeInOut", x3 = 20;
function O3(a, { defaultTransition: l = {}, ...o } = {}, r, c) {
  const d = l.duration || 0.3, h = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Map(), v = {}, S = /* @__PURE__ */ new Map();
  let p = 0, g = 0, b = 0;
  for (let _ = 0; _ < a.length; _++) {
    const z = a[_];
    if (typeof z == "string") {
      S.set(z, g);
      continue;
    } else if (!Array.isArray(z)) {
      S.set(z.name, Ep(g, z.at, p, S));
      continue;
    }
    let [w, U, L = {}] = z;
    L.at !== void 0 && (g = Ep(g, L.at, p, S));
    let j = 0;
    const Q = (B, k, ot, Z = 0, q = 0) => {
      const st = R3(B), { delay: J = 0, times: ct = ov(st), type: gt = l.type || "keyframes", repeat: Yt, repeatType: Ot, repeatDelay: Tt = 0, ...G } = k;
      let { ease: W = l.ease || "easeOut", duration: Y } = k;
      const at = typeof J == "function" ? J(Z, q) : J, ht = st.length, Qt = oh(gt) ? gt : c?.[gt || "keyframes"];
      if (ht <= 2 && Qt) {
        let H = 100;
        if (ht === 2 && V3(st)) {
          const dt = st[1] - st[0];
          H = Math.abs(dt);
        }
        const I = {
          ...l,
          ...G
        };
        Y !== void 0 && (I.duration = /* @__PURE__ */ Be(Y));
        const $ = av(I, H, Qt);
        W = $.ease, Y = $.duration;
      }
      Y ?? (Y = d);
      const Se = g + at;
      ct.length === 1 && ct[0] === 0 && (ct[1] = 1);
      const ce = ct.length - st.length;
      if (ce > 0 && sv(ct, ce), st.length === 1 && st.unshift(null), Yt && Yt < x3) {
        const H = Y > 0 ? Tt / Y : 0;
        Y = b3(Y, Yt, Tt);
        const I = [...st], $ = [...ct];
        W = Array.isArray(W) ? [...W] : [W];
        const dt = [...W], bt = Ot === "reverse" || Ot === "mirror";
        let St = I, tt = dt;
        bt && (St = [...I].reverse(), Ot === "reverse" && (tt = [...dt].reverse().map((lt) => typeof lt == "function" ? /* @__PURE__ */ If(lt) : lt)));
        for (let lt = 0; lt < Yt; lt++) {
          const be = bt && lt % 2 === 0, kn = be ? St : I, un = be ? tt : dt, Ee = (lt + 1) * (1 + H);
          H > 0 && (st.push(st[st.length - 1]), ct.push(Ee), W.push("linear")), st.push(...kn);
          for (let Bt = 0; Bt < kn.length; Bt++)
            ct.push($[Bt] + Ee), W.push(Bt === 0 ? "linear" : /* @__PURE__ */ Kp(un, Bt - 1));
        }
        M3(ct, Yt, H);
      }
      const A = Se + Y;
      A3(ot, st, W, ct, Se, A), j = Math.max(at + Y, j), b = Math.max(A, b);
    };
    if (le(w)) {
      const B = Ap(w, y);
      Q(U, L, Mp("default", B));
    } else {
      const B = E1(w, U, r, v), k = B.length;
      for (let ot = 0; ot < k; ot++) {
        U = U, L = L;
        const Z = B[ot], q = Ap(Z, y);
        for (const st in U)
          Q(U[st], z3(L, st), Mp(st, q), ot, k);
      }
    }
    p = g, g += j;
  }
  return y.forEach((_, z) => {
    for (const w in _) {
      const U = _[w];
      U.sort(D3);
      const L = [], j = [], Q = [];
      for (let Z = 0; Z < U.length; Z++) {
        const { at: q, value: st, easing: J } = U[Z];
        L.push(st), j.push(/* @__PURE__ */ il(0, b, q)), Q.push(J || "easeOut");
      }
      j[0] !== 0 && (j.unshift(0), L.unshift(L[0]), Q.unshift(C3)), j[j.length - 1] !== 1 && (j.push(1), L.push(null)), h.has(z) || h.set(z, {
        keyframes: {},
        transition: {}
      });
      const B = h.get(z);
      B.keyframes[w] = L;
      const { type: k, ...ot } = l;
      B.transition[w] = {
        ...ot,
        duration: b,
        ease: Q,
        times: j,
        ...o
      };
    }
  }), h;
}
function Ap(a, l) {
  return !l.has(a) && l.set(a, {}), l.get(a);
}
function Mp(a, l) {
  return l[a] || (l[a] = []), l[a];
}
function R3(a) {
  return Array.isArray(a) ? a : [a];
}
function z3(a, l) {
  return a && a[l] ? {
    ...a,
    ...a[l]
  } : { ...a };
}
const _3 = (a) => typeof a == "number", V3 = (a) => a.every(_3);
function N3(a) {
  const l = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        transform: {},
        transformOrigin: {},
        style: {},
        vars: {},
        attrs: {}
      },
      latestValues: {}
    }
  }, o = vo(a) && !Nv(a) ? new kv(l) : new Zv(l);
  o.mount(a), du.set(a, o);
}
function U3(a) {
  const l = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  }, o = new h2(l);
  o.mount(a), du.set(a, o);
}
function w3(a, l) {
  return le(a) || typeof a == "number" || typeof a == "string" && !Ch(l);
}
function A1(a, l, o, r) {
  const c = [];
  if (w3(a, l))
    c.push(a1(a, Ch(l) && l.default || l, o && (o.default || o)));
  else {
    if (a == null)
      return c;
    const d = E1(a, l, r), h = d.length;
    for (let y = 0; y < h; y++) {
      const v = d[y], S = v instanceof Element ? N3 : U3;
      du.has(v) || S(v);
      const p = du.get(v), g = { ...o };
      "delay" in g && typeof g.delay == "function" && (g.delay = g.delay(y, h)), c.push(...dh(p, { ...l, transition: g }, {}));
    }
  }
  return c;
}
function B3(a, l, o) {
  const r = [], c = a.map((h) => {
    if (Array.isArray(h) && typeof h[0] == "function") {
      const y = h[0], v = xi(0);
      return v.on("change", y), h.length === 1 ? [v, [0, 1]] : h.length === 2 ? [v, [0, 1], h[1]] : [v, h[1], h[2]];
    }
    return h;
  });
  return O3(c, l, o, { spring: hu }).forEach(({ keyframes: h, transition: y }, v) => {
    r.push(...A1(v, h, y));
  }), r;
}
function L3(a) {
  return Array.isArray(a) && a.some(Array.isArray);
}
function H3(a = {}) {
  const { scope: l, reduceMotion: o, skipAnimations: r } = a;
  function c(d, h, y) {
    let v = [], S;
    const p = {};
    if (o !== void 0 && (p.reduceMotion = o), r !== void 0 && (p.skipAnimations = r), L3(d)) {
      const { onComplete: b, ..._ } = h || {};
      typeof b == "function" && (S = b), v = B3(d, { ...p, ..._ }, l);
    } else {
      const { onComplete: b, ..._ } = y || {};
      typeof b == "function" && (S = b), v = A1(d, h, { ...p, ..._ }, l);
    }
    const g = new eA(v);
    return S && g.finished.then(S), l && (l.animations.push(g), g.finished.then(() => {
      nl(l.animations, g);
    })), g;
  }
  return c;
}
const Wa = H3(), j3 = p3, Y3 = [0.23, 1, 0.32, 1], bf = { type: "spring", duration: 0.3, bounce: 0 }, q3 = { type: "spring", duration: 0.4, bounce: 0.2 }, G3 = { type: "spring", duration: 0.16, bounce: 0 }, X3 = 0.19, Q3 = 0.15, Z3 = 110, Dp = 2e3, K3 = 4, J3 = 10, Cp = 0.55, xp = {
  sm: { height: 28, font: 12, pad: 10, min: 36 },
  md: { height: 36, font: 13, pad: 14, min: 44 },
  lg: { height: 44, font: 14, pad: 18, min: 48 }
}, Ef = (a, l, o) => Math.min(o, Math.max(l, a)), Op = (a, l) => a * l * Cp / (l + Cp * Math.abs(a)), F3 = (a, l) => {
  const o = 1 - 0.1 * Math.pow(0.05, l / 100);
  return a / 1e3 * o / (1 - o);
}, P3 = (a, l) => {
  const o = a.filter(([y]) => l - y <= 100);
  if (o.length < 2) return 0;
  const [r, c] = o[0], [d, h] = o[o.length - 1];
  return d - r >= 8 ? (h - c) / (d - r) * 1e3 : 0;
}, k3 = (a, l) => {
  let o = 0;
  for (let r = 1; r < a.length; r++)
    Math.abs((a[r].l + a[r].r) / 2 - l) < Math.abs((a[o].l + a[o].r) / 2 - l) && (o = r);
  return o;
};
function W3({
  items: a,
  value: l,
  defaultValue: o,
  onChange: r,
  trackColor: c = "#27272a",
  thumbColor: d = "#fafafa",
  textColor: h = "#fafafa",
  activeTextColor: y = "#18181b",
  size: v = "md",
  radius: S = 10,
  inset: p = 3,
  equalSlots: g = !0,
  stretch: b = 100,
  squash: _ = 3,
  speed: z = 1,
  glide: w = 75,
  draggable: U = !0,
  disabled: L = !1,
  className: j = "",
  "aria-label": Q = "Segmented control"
}) {
  const B = a.map((X) => typeof X == "string" ? { value: X, label: X } : X), [k, ot] = it.useState(o ?? B[0]?.value), Z = l !== void 0 ? l : k, q = Math.max(
    0,
    B.findIndex((X) => X.value === Z)
  ), st = T3(), J = it.useRef(null), ct = it.useRef([]), gt = it.useRef([]), Yt = it.useRef(null), Ot = it.useRef(q), Tt = it.useRef(0), G = it.useRef(null), W = it.useRef(0), Y = lo(0), at = lo(0), ht = lo(0), Qt = Math.max(0, S - p), Se = S3(
    () => `inset(0 ${Math.max(0, ht.get() - at.get())}px 0 ${Math.max(0, Y.get())}px round ${Qt}px)`
  ), ce = (X) => X / z, A = (X) => {
    const F = gt.current[X];
    F && (clearTimeout(Tt.current), W.current += 1, Y.jump(F.l), at.jump(F.r));
  }, H = () => {
    const X = J.current;
    if (!X) return;
    const F = X.getBoundingClientRect();
    Yt.current = F, gt.current = B.map((pt, xt) => {
      const _t = ct.current[xt];
      if (!_t) return { l: 0, r: 0 };
      const Zt = _t.getBoundingClientRect();
      return { l: Zt.left - F.left - p, r: Zt.right - F.left - p };
    }), ht.set(F.width - p * 2), A(Ot.current);
  }, I = B.map((X) => X.value).join("|");
  it.useLayoutEffect(() => {
    H();
    const X = new ResizeObserver(H);
    return J.current && X.observe(J.current), typeof document < "u" && document.fonts && document.fonts.ready.then(H), () => X.disconnect();
  }, [I, v, p, g]), it.useEffect(() => {
    !G.current && Ot.current !== q && (Ot.current = q, A(q));
  }), it.useEffect(
    () => () => {
      clearTimeout(Tt.current), Y.stop(), at.stop();
    },
    [Y, at]
  );
  const $ = (X) => {
    Ot.current = X, X !== q && (l === void 0 && ot(B[X].value), r?.(B[X].value, X));
  }, dt = (X, F, pt, xt) => {
    const _t = gt.current[X];
    if (!_t) return;
    const Zt = ++W.current, Re = Math.sign((_t.l + _t.r) / 2 - (Y.get() + at.get()) / 2) || 1, [aa, la, Wn, ua] = Re > 0 ? [at, _t.r, Y, _t.l] : [Y, _t.l, at, _t.r], sn = (ol) => Ef(F === null ? ol.getVelocity() : F, -Dp, Dp);
    Wa(aa, la, {
      ...pt ? q3 : bf,
      duration: ce(pt ? 0.4 : 0.3),
      velocity: sn(aa)
    });
    const sa = sn(Wn);
    if (!xt || _ <= 0) {
      Wa(Wn, ua, { ...bf, duration: ce(0.3), velocity: sa });
      return;
    }
    Wa(Wn, ua + Re * _, { ...bf, duration: ce(0.3), velocity: sa }).then(() => {
      W.current === Zt && Wa(Wn, ua, { ...G3, duration: ce(0.16) });
    });
  }, bt = (X, F) => {
    const pt = gt.current[X], xt = gt.current[F];
    if (!pt || !xt) return;
    if (clearTimeout(Tt.current), W.current += 1, st) {
      Y.jump(xt.l), at.jump(xt.r);
      return;
    }
    const _t = b / 100, Zt = { duration: ce(X3), ease: Y3 };
    Wa(Y, xt.l + (Math.min(pt.l, xt.l) - xt.l) * _t, Zt), Wa(at, xt.r + (Math.max(pt.r, xt.r) - xt.r) * _t, Zt), Tt.current = setTimeout(() => dt(F, null, !1, !0), ce(Q3) * 1e3);
  }, St = (X) => X.clientX - (Yt.current ? Yt.current.left : 0) - p, tt = (X, F) => {
    if (L || G.current || X.button !== 0) return;
    Yt.current = J.current.getBoundingClientRect();
    try {
      X.currentTarget.setPointerCapture(X.pointerId);
    } catch {
    }
    const pt = St(X), xt = U && pt >= Y.get() && pt <= at.get();
    G.current = { id: X.pointerId, x0: pt, slot: F, onThumb: xt, live: !1, offset: 0, w: 0, hist: [[X.timeStamp, pt]] }, xt ? (clearTimeout(Tt.current), W.current += 1, Y.stop(), at.stop()) : st || (X.currentTarget.dataset.pressed = "");
  }, lt = (X) => {
    const F = G.current;
    if (!F || X.pointerId !== F.id || !F.onThumb) return;
    const pt = St(X);
    if (F.hist.push([X.timeStamp, pt]), F.hist.length > 8 && F.hist.shift(), !F.live) {
      if (Math.abs(pt - F.x0) < K3) return;
      F.live = !0, F.offset = pt - Y.get(), F.w = at.get() - Y.get(), J.current && (J.current.dataset.held = "");
    }
    const xt = ht.get(), _t = pt - F.offset, Zt = xt - F.w;
    if (st) {
      const Re = Ef(_t, 0, Zt);
      Y.set(Re), at.set(Re + F.w);
    } else _t < 0 ? (Y.set(0), at.set(F.w - Op(-_t, F.w))) : _t > Zt ? (at.set(xt), Y.set(Zt + Op(_t - Zt, F.w))) : (Y.set(_t), at.set(_t + F.w));
  }, be = () => {
    const X = G.current;
    G.current = null, J.current && delete J.current.dataset.held;
    const F = ct.current[X.slot];
    return F && delete F.dataset.pressed, X;
  }, kn = (X) => {
    const F = G.current;
    if (!F || X.pointerId !== F.id) return;
    be();
    const pt = St(X);
    if (!F.live) {
      if (Math.abs(pt - F.x0) <= J3 && F.slot !== Ot.current) {
        const Re = Ot.current;
        $(F.slot), bt(Re, F.slot);
      }
      return;
    }
    const xt = P3(F.hist, X.timeStamp), _t = Math.abs(xt) > Z3;
    let Zt = k3(gt.current, (Y.get() + at.get()) / 2 + F3(xt, w));
    _t && Zt === Ot.current && (Zt = Ef(Zt + Math.sign(xt), 0, B.length - 1)), $(Zt), st ? A(Zt) : dt(Zt, xt, _t, _t);
  }, un = (X) => {
    const F = G.current;
    !F || X.pointerId !== F.id || (be(), F.live && (st ? A(Ot.current) : dt(Ot.current, null, !1, !1)));
  }, Ee = (X) => {
    if (L) return;
    const F = B.length - 1;
    let pt = null;
    X.key === "ArrowRight" || X.key === "ArrowDown" ? pt = Math.min(F, q + 1) : X.key === "ArrowLeft" || X.key === "ArrowUp" ? pt = Math.max(0, q - 1) : X.key === "Home" ? pt = 0 : X.key === "End" && (pt = F), pt !== null && (X.preventDefault(), pt !== q && ($(pt), A(pt), ct.current[pt]?.focus()));
  }, Bt = xp[v] || xp.md;
  return /* @__PURE__ */ zn.jsxs(
    "div",
    {
      ref: J,
      role: "radiogroup",
      "aria-label": Q,
      "aria-disabled": L || void 0,
      "data-equal": g ? "" : void 0,
      "data-draggable": U && !L ? "" : void 0,
      className: `rubber-segment${j ? ` ${j}` : ""}`,
      style: {
        "--rs-track": c,
        "--rs-thumb": d,
        "--rs-ink": h,
        "--rs-ink-active": y,
        "--rs-radius": `${S}px`,
        "--rs-inset": `${p}px`,
        "--rs-thumb-radius": `${Qt}px`,
        "--rs-h": `${Bt.height}px`,
        "--rs-font": `${Bt.font}px`,
        "--rs-pad": `${Bt.pad}px`,
        "--rs-min": `${Bt.min}px`
      },
      onPointerMove: lt,
      onPointerUp: kn,
      onPointerCancel: un,
      onLostPointerCapture: un,
      children: [
        B.map((X, F) => /* @__PURE__ */ zn.jsxs(
          "button",
          {
            ref: (pt) => {
              ct.current[F] = pt;
            },
            type: "button",
            role: "radio",
            "aria-checked": F === q,
            tabIndex: F === q ? 0 : -1,
            disabled: L,
            className: "rubber-segment__item",
            onPointerDown: (pt) => tt(pt, F),
            onKeyDown: Ee,
            children: [
              X.icon,
              X.label
            ]
          },
          X.value
        )),
        /* @__PURE__ */ zn.jsx(j3.div, { className: "rubber-segment__thumb", "aria-hidden": "true", style: { clipPath: Se }, children: B.map((X) => /* @__PURE__ */ zn.jsxs("span", { className: "rubber-segment__item rubber-segment__copy", children: [
          X.icon,
          X.label
        ] }, X.value)) })
      ]
    }
  );
}
const I3 = [
  "Todos",
  "Social Media",
  "Vídeo",
  "Produção",
  "Motion e VFX",
  "Fotos",
  "Manipulação",
  "Identidade",
  "Campanhas",
  "E-commerce",
  "Narrativa Visual",
  "3D",
  "Web / HTML"
];
function Rp() {
  const a = document.querySelector(".filters-wrap"), l = document.getElementById("filters"), o = document.getElementById("catalog"), r = document.querySelector(".top");
  if (!a || !l || !o || document.getElementById("rubber-segment-services-root")) return;
  const c = Array.from(l.querySelectorAll("[data-cat]")).map((B) => B.dataset.cat || B.textContent?.trim() || "").filter(Boolean), d = c.length ? c : I3, h = document.createElement("div");
  h.id = "rubber-segment-services-root", h.setAttribute("aria-label", "Categorias de serviços"), l.classList.add("ms-legacy-filters-hidden"), l.setAttribute("aria-hidden", "true"), a.appendChild(h);
  let y = "Todos", v = null, S = 0, p = 0;
  const g = () => {
    const B = Math.max(0, Math.round(r?.getBoundingClientRect().height || 74)), k = Math.max(0, Math.round(a.getBoundingClientRect().height || 62));
    return B + k + 18;
  }, b = () => {
    const B = Array.from(
      o.querySelectorAll(".category[data-service-category]")
    );
    if (!B.length) return y;
    if (B.length === 1)
      return B[0].dataset.serviceCategory || y;
    const k = g();
    if (o.getBoundingClientRect().top > k) return "Todos";
    let Z = "Todos";
    for (const q of B)
      if (q.getBoundingClientRect().top <= k)
        Z = q.dataset.serviceCategory || Z;
      else
        break;
    return Z;
  }, _ = () => {
    requestAnimationFrame(() => {
      h.querySelector(
        '.rubber-segment__item[aria-checked="true"]'
      )?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "nearest",
        inline: "center"
      });
    });
  }, z = () => {
    S = 0;
    const B = b();
    !B || B === y || (y = B, v?.(B), _());
  }, w = () => {
    S || (S = requestAnimationFrame(z));
  }, U = (B) => {
    y = B, v?.(B), Array.from(
      l.querySelectorAll("[data-cat]")
    ).find((ot) => ot.dataset.cat === B)?.click(), clearTimeout(p), p = window.setTimeout(() => {
      w(), _();
    }, 120);
  };
  function L() {
    const [B, k] = it.useState(() => b());
    return it.useEffect(() => (y = B, v = k, _(), () => {
      v === k && (v = null);
    }), [B]), /* @__PURE__ */ zn.jsx("div", { className: "ms-rubber-segment-scroll", children: /* @__PURE__ */ zn.jsx(
      W3,
      {
        items: d,
        value: B,
        onChange: (ot) => U(String(ot)),
        trackColor: "rgba(9, 13, 15, 0.88)",
        thumbColor: "#35D39A",
        textColor: "#F4F4EF",
        activeTextColor: "#04130D",
        size: "md",
        radius: 18,
        inset: 4,
        equalSlots: !1,
        stretch: 100,
        squash: 4,
        speed: 1,
        glide: 75,
        draggable: !0,
        "aria-label": "Categorias de serviços",
        className: "ms-services-rubber-segment"
      }
    ) });
  }
  const j = Rb.createRoot(h);
  j.render(/* @__PURE__ */ zn.jsx(L, {})), addEventListener("scroll", w, { passive: !0 }), addEventListener("resize", w, { passive: !0 }), addEventListener("orientationchange", w, { passive: !0 });
  const Q = new MutationObserver(() => {
    clearTimeout(p), p = window.setTimeout(w, 30);
  });
  Q.observe(o, { childList: !0, subtree: !1 }), Q.observe(l, { childList: !0 }), w(), window.addEventListener(
    "pagehide",
    () => {
      Q.disconnect(), clearTimeout(p), j.unmount();
    },
    { once: !0 }
  );
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Rp, { once: !0 }) : Rp();
