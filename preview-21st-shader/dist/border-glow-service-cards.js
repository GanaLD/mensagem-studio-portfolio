var E0 = { exports: {} }, un = {};
var km;
function ih() {
  if (km) return un;
  km = 1;
  var b = /* @__PURE__ */ Symbol.for("react.transitional.element"), B = /* @__PURE__ */ Symbol.for("react.fragment");
  function X(g, F, ul) {
    var Tl = null;
    if (ul !== void 0 && (Tl = "" + ul), F.key !== void 0 && (Tl = "" + F.key), "key" in F) {
      ul = {};
      for (var ql in F)
        ql !== "key" && (ul[ql] = F[ql]);
    } else ul = F;
    return F = ul.ref, {
      $$typeof: b,
      type: g,
      key: Tl,
      ref: F !== void 0 ? F : null,
      props: ul
    };
  }
  return un.Fragment = B, un.jsx = X, un.jsxs = X, un;
}
var Pm;
function oh() {
  return Pm || (Pm = 1, E0.exports = ih()), E0.exports;
}
var en = oh(), z0 = { exports: {} }, an = {}, b0 = { exports: {} }, _0 = {};
var ls;
function vh() {
  return ls || (ls = 1, (function(b) {
    function B(O, q) {
      var G = O.length;
      O.push(q);
      l: for (; 0 < G; ) {
        var dl = G - 1 >>> 1, al = O[dl];
        if (0 < F(al, q))
          O[dl] = q, O[G] = al, G = dl;
        else break l;
      }
    }
    function X(O) {
      return O.length === 0 ? null : O[0];
    }
    function g(O) {
      if (O.length === 0) return null;
      var q = O[0], G = O.pop();
      if (G !== q) {
        O[0] = G;
        l: for (var dl = 0, al = O.length, Ht = al >>> 1; dl < Ht; ) {
          var kt = 2 * (dl + 1) - 1, Ju = O[kt], v = kt + 1, z = O[v];
          if (0 > F(Ju, G))
            v < al && 0 > F(z, Ju) ? (O[dl] = z, O[v] = G, dl = v) : (O[dl] = Ju, O[kt] = G, dl = kt);
          else if (v < al && 0 > F(z, G))
            O[dl] = z, O[v] = G, dl = v;
          else break l;
        }
      }
      return q;
    }
    function F(O, q) {
      var G = O.sortIndex - q.sortIndex;
      return G !== 0 ? G : O.id - q.id;
    }
    if (b.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var ul = performance;
      b.unstable_now = function() {
        return ul.now();
      };
    } else {
      var Tl = Date, ql = Tl.now();
      b.unstable_now = function() {
        return Tl.now() - ql;
      };
    }
    var vl = [], sl = [], H = 1, S = null, R = 3, bl = !1, Wl = !1, Vl = !1, yl = !1, et = typeof setTimeout == "function" ? setTimeout : null, Pl = typeof clearTimeout == "function" ? clearTimeout : null, El = typeof setImmediate < "u" ? setImmediate : null;
    function nl(O) {
      for (var q = X(sl); q !== null; ) {
        if (q.callback === null) g(sl);
        else if (q.startTime <= O)
          g(sl), q.sortIndex = q.expirationTime, B(vl, q);
        else break;
        q = X(sl);
      }
    }
    function Ol(O) {
      if (Vl = !1, nl(O), !Wl)
        if (X(vl) !== null)
          Wl = !0, fl || (fl = !0, yt());
        else {
          var q = X(sl);
          q !== null && Gl(Ol, q.startTime - O);
        }
    }
    var fl = !1, Z = -1, x = 5, Bl = -1;
    function Il() {
      return yl ? !0 : !(b.unstable_now() - Bl < x);
    }
    function Hl() {
      if (yl = !1, fl) {
        var O = b.unstable_now();
        Bl = O;
        var q = !0;
        try {
          l: {
            Wl = !1, Vl && (Vl = !1, Pl(Z), Z = -1), bl = !0;
            var G = R;
            try {
              t: {
                for (nl(O), S = X(vl); S !== null && !(S.expirationTime > O && Il()); ) {
                  var dl = S.callback;
                  if (typeof dl == "function") {
                    S.callback = null, R = S.priorityLevel;
                    var al = dl(
                      S.expirationTime <= O
                    );
                    if (O = b.unstable_now(), typeof al == "function") {
                      S.callback = al, nl(O), q = !0;
                      break t;
                    }
                    S === X(vl) && g(vl), nl(O);
                  } else g(vl);
                  S = X(vl);
                }
                if (S !== null) q = !0;
                else {
                  var Ht = X(sl);
                  Ht !== null && Gl(
                    Ol,
                    Ht.startTime - O
                  ), q = !1;
                }
              }
              break l;
            } finally {
              S = null, R = G, bl = !1;
            }
            q = void 0;
          }
        } finally {
          q ? yt() : fl = !1;
        }
      }
    }
    var yt;
    if (typeof El == "function")
      yt = function() {
        El(Hl);
      };
    else if (typeof MessageChannel < "u") {
      var hu = new MessageChannel(), Ku = hu.port2;
      hu.port1.onmessage = Hl, yt = function() {
        Ku.postMessage(null);
      };
    } else
      yt = function() {
        et(Hl, 0);
      };
    function Gl(O, q) {
      Z = et(function() {
        O(b.unstable_now());
      }, q);
    }
    b.unstable_IdlePriority = 5, b.unstable_ImmediatePriority = 1, b.unstable_LowPriority = 4, b.unstable_NormalPriority = 3, b.unstable_Profiling = null, b.unstable_UserBlockingPriority = 2, b.unstable_cancelCallback = function(O) {
      O.callback = null;
    }, b.unstable_forceFrameRate = function(O) {
      0 > O || 125 < O ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : x = 0 < O ? Math.floor(1e3 / O) : 5;
    }, b.unstable_getCurrentPriorityLevel = function() {
      return R;
    }, b.unstable_next = function(O) {
      switch (R) {
        case 1:
        case 2:
        case 3:
          var q = 3;
          break;
        default:
          q = R;
      }
      var G = R;
      R = q;
      try {
        return O();
      } finally {
        R = G;
      }
    }, b.unstable_requestPaint = function() {
      yl = !0;
    }, b.unstable_runWithPriority = function(O, q) {
      switch (O) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          O = 3;
      }
      var G = R;
      R = O;
      try {
        return q();
      } finally {
        R = G;
      }
    }, b.unstable_scheduleCallback = function(O, q, G) {
      var dl = b.unstable_now();
      switch (typeof G == "object" && G !== null ? (G = G.delay, G = typeof G == "number" && 0 < G ? dl + G : dl) : G = dl, O) {
        case 1:
          var al = -1;
          break;
        case 2:
          al = 250;
          break;
        case 5:
          al = 1073741823;
          break;
        case 4:
          al = 1e4;
          break;
        default:
          al = 5e3;
      }
      return al = G + al, O = {
        id: H++,
        callback: q,
        priorityLevel: O,
        startTime: G,
        expirationTime: al,
        sortIndex: -1
      }, G > dl ? (O.sortIndex = G, B(sl, O), X(vl) === null && O === X(sl) && (Vl ? (Pl(Z), Z = -1) : Vl = !0, Gl(Ol, G - dl))) : (O.sortIndex = al, B(vl, O), Wl || bl || (Wl = !0, fl || (fl = !0, yt()))), O;
    }, b.unstable_shouldYield = Il, b.unstable_wrapCallback = function(O) {
      var q = R;
      return function() {
        var G = R;
        R = q;
        try {
          return O.apply(this, arguments);
        } finally {
          R = G;
        }
      };
    };
  })(_0)), _0;
}
var ts;
function yh() {
  return ts || (ts = 1, b0.exports = vh()), b0.exports;
}
var O0 = { exports: {} }, j = {};
var us;
function mh() {
  if (us) return j;
  us = 1;
  var b = /* @__PURE__ */ Symbol.for("react.transitional.element"), B = /* @__PURE__ */ Symbol.for("react.portal"), X = /* @__PURE__ */ Symbol.for("react.fragment"), g = /* @__PURE__ */ Symbol.for("react.strict_mode"), F = /* @__PURE__ */ Symbol.for("react.profiler"), ul = /* @__PURE__ */ Symbol.for("react.consumer"), Tl = /* @__PURE__ */ Symbol.for("react.context"), ql = /* @__PURE__ */ Symbol.for("react.forward_ref"), vl = /* @__PURE__ */ Symbol.for("react.suspense"), sl = /* @__PURE__ */ Symbol.for("react.memo"), H = /* @__PURE__ */ Symbol.for("react.lazy"), S = /* @__PURE__ */ Symbol.for("react.activity"), R = /* @__PURE__ */ Symbol.for("react.view_transition"), bl = Symbol.iterator;
  function Wl(v) {
    return v === null || typeof v != "object" ? null : (v = bl && v[bl] || v["@@iterator"], typeof v == "function" ? v : null);
  }
  var Vl = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, yl = Object.assign, et = {};
  function Pl(v, z, U) {
    this.props = v, this.context = z, this.refs = et, this.updater = U || Vl;
  }
  Pl.prototype.isReactComponent = {}, Pl.prototype.setState = function(v, z) {
    if (typeof v != "object" && typeof v != "function" && v != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, v, z, "setState");
  }, Pl.prototype.forceUpdate = function(v) {
    this.updater.enqueueForceUpdate(this, v, "forceUpdate");
  };
  function El() {
  }
  El.prototype = Pl.prototype;
  function nl(v, z, U) {
    this.props = v, this.context = z, this.refs = et, this.updater = U || Vl;
  }
  var Ol = nl.prototype = new El();
  Ol.constructor = nl, yl(Ol, Pl.prototype), Ol.isPureReactComponent = !0;
  var fl = Array.isArray;
  function Z() {
  }
  var x = { H: null, A: null, T: null, S: null }, Bl = Object.prototype.hasOwnProperty;
  function Il(v, z, U) {
    var C = U.ref;
    return {
      $$typeof: b,
      type: v,
      key: z,
      ref: C !== void 0 ? C : null,
      props: U
    };
  }
  function Hl(v, z) {
    return Il(v.type, z, v.props);
  }
  function yt(v) {
    return typeof v == "object" && v !== null && v.$$typeof === b;
  }
  function hu(v) {
    var z = { "=": "=0", ":": "=2" };
    return "$" + v.replace(/[=:]/g, function(U) {
      return z[U];
    });
  }
  var Ku = /\/+/g;
  function Gl(v, z) {
    return typeof v == "object" && v !== null && v.key != null ? hu("" + v.key) : z.toString(36);
  }
  function O(v) {
    switch (v.status) {
      case "fulfilled":
        return v.value;
      case "rejected":
        throw v.reason;
      default:
        switch (typeof v.status == "string" ? v.then(Z, Z) : (v.status = "pending", v.then(
          function(z) {
            v.status === "pending" && (v.status = "fulfilled", v.value = z);
          },
          function(z) {
            v.status === "pending" && (v.status = "rejected", v.reason = z);
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
  function q(v, z, U, C, I) {
    var k = typeof v;
    (k === "undefined" || k === "boolean") && (v = null);
    var ll = !1;
    if (v === null) ll = !0;
    else
      switch (k) {
        case "bigint":
        case "string":
        case "number":
          ll = !0;
          break;
        case "object":
          switch (v.$$typeof) {
            case b:
            case B:
              ll = !0;
              break;
            case H:
              return ll = v._init, q(
                ll(v._payload),
                z,
                U,
                C,
                I
              );
          }
      }
    if (ll)
      return I = I(v), ll = C === "" ? "." + Gl(v, 0) : C, fl(I) ? (U = "", ll != null && (U = ll.replace(Ku, "$&/") + "/"), q(I, z, U, "", function(Pt) {
        return Pt;
      })) : I != null && (yt(I) && (I = Hl(
        I,
        U + (I.key == null || v && v.key === I.key ? "" : ("" + I.key).replace(
          Ku,
          "$&/"
        ) + "/") + ll
      )), z.push(I)), 1;
    ll = 0;
    var M = C === "" ? "." : C + ":";
    if (fl(v))
      for (var Q = 0; Q < v.length; Q++)
        C = v[Q], k = M + Gl(C, Q), ll += q(
          C,
          z,
          U,
          k,
          I
        );
    else if (Q = Wl(v), typeof Q == "function")
      for (v = Q.call(v), Q = 0; !(C = v.next()).done; )
        C = C.value, k = M + Gl(C, Q++), ll += q(
          C,
          z,
          U,
          k,
          I
        );
    else if (k === "object") {
      if (typeof v.then == "function")
        return q(
          O(v),
          z,
          U,
          C,
          I
        );
      throw z = String(v), Error(
        "Objects are not valid as a React child (found: " + (z === "[object Object]" ? "object with keys {" + Object.keys(v).join(", ") + "}" : z) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ll;
  }
  function G(v, z, U) {
    if (v == null) return v;
    var C = [], I = 0;
    return q(v, C, "", "", function(k) {
      return z.call(U, k, I++);
    }), C;
  }
  function dl(v) {
    if (v._status === -1) {
      var z = v._result, U = z();
      U.then(
        function(C) {
          (v._status === 0 || v._status === -1) && (v._status = 1, v._result = C, U.status === void 0 && (U.status = "fulfilled", U.value = C));
        },
        function(C) {
          (v._status === 0 || v._status === -1) && (v._status = 2, v._result = C, U.status === void 0 && (U.status = "rejected", U.reason = C));
        }
      ), v._status === -1 && (v._status = 0, v._result = U);
    }
    if (v._status === 1) return v._result.default;
    throw v._result;
  }
  var al = typeof reportError == "function" ? reportError : function(v) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var z = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof v == "object" && v !== null && typeof v.message == "string" ? String(v.message) : String(v),
        error: v
      });
      if (!window.dispatchEvent(z)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", v);
      return;
    }
    console.error(v);
  };
  function Ht(v) {
    var z = x.T, U = {};
    U.types = z !== null ? z.types : null, x.T = U;
    try {
      var C = v(), I = x.S;
      I !== null && I(U, C), typeof C == "object" && C !== null && typeof C.then == "function" && C.then(Z, al);
    } catch (k) {
      al(k);
    } finally {
      z !== null && U.types !== null && (z.types = U.types), x.T = z;
    }
  }
  function kt(v) {
    var z = x.T;
    if (z !== null) {
      var U = z.types;
      U === null ? z.types = [v] : U.indexOf(v) === -1 && U.push(v);
    } else Ht(kt.bind(null, v));
  }
  var Ju = {
    map: G,
    forEach: function(v, z, U) {
      G(
        v,
        function() {
          z.apply(this, arguments);
        },
        U
      );
    },
    count: function(v) {
      var z = 0;
      return G(v, function() {
        z++;
      }), z;
    },
    toArray: function(v) {
      return G(v, function(z) {
        return z;
      }) || [];
    },
    only: function(v) {
      if (!yt(v))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return v;
    }
  };
  return j.Activity = S, j.Children = Ju, j.Component = Pl, j.Fragment = X, j.Profiler = F, j.PureComponent = nl, j.StrictMode = g, j.Suspense = vl, j.ViewTransition = R, j.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = x, j.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(v) {
      return x.H.useMemoCache(v);
    }
  }, j.addTransitionType = kt, j.cache = function(v) {
    return function() {
      return v.apply(null, arguments);
    };
  }, j.cacheSignal = function() {
    return null;
  }, j.cloneElement = function(v, z, U) {
    if (v == null)
      throw Error(
        "The argument must be a React element, but you passed " + v + "."
      );
    var C = yl({}, v.props), I = v.key;
    if (z != null)
      for (k in z.key !== void 0 && (I = "" + z.key), z)
        !Bl.call(z, k) || k === "key" || k === "__self" || k === "__source" || k === "ref" && z.ref === void 0 || (C[k] = z[k]);
    var k = arguments.length - 2;
    if (k === 1) C.children = U;
    else if (1 < k) {
      for (var ll = Array(k), M = 0; M < k; M++)
        ll[M] = arguments[M + 2];
      C.children = ll;
    }
    return Il(v.type, I, C);
  }, j.createContext = function(v) {
    return v = {
      $$typeof: Tl,
      _currentValue: v,
      _currentValue2: v,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, v.Provider = v, v.Consumer = {
      $$typeof: ul,
      _context: v
    }, v;
  }, j.createElement = function(v, z, U) {
    var C, I = {}, k = null;
    if (z != null)
      for (C in z.key !== void 0 && (k = "" + z.key), z)
        Bl.call(z, C) && C !== "key" && C !== "__self" && C !== "__source" && (I[C] = z[C]);
    var ll = arguments.length - 2;
    if (ll === 1) I.children = U;
    else if (1 < ll) {
      for (var M = Array(ll), Q = 0; Q < ll; Q++)
        M[Q] = arguments[Q + 2];
      I.children = M;
    }
    if (v && v.defaultProps)
      for (C in ll = v.defaultProps, ll)
        I[C] === void 0 && (I[C] = ll[C]);
    return Il(v, k, I);
  }, j.createRef = function() {
    return { current: null };
  }, j.forwardRef = function(v) {
    return { $$typeof: ql, render: v };
  }, j.isValidElement = yt, j.lazy = function(v) {
    return {
      $$typeof: H,
      _payload: { _status: -1, _result: v },
      _init: dl
    };
  }, j.memo = function(v, z) {
    return {
      $$typeof: sl,
      type: v,
      compare: z === void 0 ? null : z
    };
  }, j.startTransition = Ht, j.unstable_useCacheRefresh = function() {
    return x.H.useCacheRefresh();
  }, j.use = function(v) {
    return x.H.use(v);
  }, j.useActionState = function(v, z, U) {
    return x.H.useActionState(v, z, U);
  }, j.useCallback = function(v, z) {
    return x.H.useCallback(v, z);
  }, j.useContext = function(v) {
    return x.H.useContext(v);
  }, j.useDebugValue = function() {
  }, j.useDeferredValue = function(v, z) {
    return x.H.useDeferredValue(v, z);
  }, j.useEffect = function(v, z) {
    return x.H.useEffect(v, z);
  }, j.useEffectEvent = function(v) {
    return x.H.useEffectEvent(v);
  }, j.useId = function() {
    return x.H.useId();
  }, j.useImperativeHandle = function(v, z, U) {
    return x.H.useImperativeHandle(v, z, U);
  }, j.useInsertionEffect = function(v, z) {
    return x.H.useInsertionEffect(v, z);
  }, j.useLayoutEffect = function(v, z) {
    return x.H.useLayoutEffect(v, z);
  }, j.useMemo = function(v, z) {
    return x.H.useMemo(v, z);
  }, j.useOptimistic = function(v, z) {
    return x.H.useOptimistic(v, z);
  }, j.useReducer = function(v, z, U) {
    return x.H.useReducer(v, z, U);
  }, j.useRef = function(v) {
    return x.H.useRef(v);
  }, j.useState = function(v) {
    return x.H.useState(v);
  }, j.useSyncExternalStore = function(v, z, U) {
    return x.H.useSyncExternalStore(
      v,
      z,
      U
    );
  }, j.useTransition = function() {
    return x.H.useTransition();
  }, j.version = "19.3.0", j;
}
var as;
function N0() {
  return as || (as = 1, O0.exports = mh()), O0.exports;
}
var A0 = { exports: {} }, Fl = {};
var es;
function sh() {
  if (es) return Fl;
  es = 1;
  var b = N0();
  function B(H) {
    var S = "https://react.dev/errors/" + H;
    if (1 < arguments.length) {
      S += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var R = 2; R < arguments.length; R++)
        S += "&args[]=" + encodeURIComponent(arguments[R]);
    }
    return "Minified React error #" + H + "; visit " + S + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function X() {
  }
  var g = {
    d: {
      f: X,
      r: function() {
        throw Error(B(522));
      },
      D: X,
      C: X,
      L: X,
      m: X,
      X,
      S: X,
      M: X
    },
    p: 0,
    findDOMNode: null
  }, F = /* @__PURE__ */ Symbol.for("react.portal"), ul = /* @__PURE__ */ Symbol.for("react.recoverable"), Tl = /* @__PURE__ */ Symbol.for("react.optimistic_key");
  function ql(H, S, R) {
    var bl = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: F,
      key: bl == null ? null : bl === Tl ? Tl : "" + bl,
      children: H,
      containerInfo: S,
      implementation: R
    };
  }
  var vl = b.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function sl(H, S) {
    if (H === "font") return "";
    if (typeof S == "string")
      return S === "use-credentials" ? S : "";
  }
  return Fl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = g, Fl.browser = function(H) {
    return { $$typeof: ul, _reason: H };
  }, Fl.createPortal = function(H, S) {
    var R = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!S || S.nodeType !== 1 && S.nodeType !== 9 && S.nodeType !== 11)
      throw Error(B(299));
    return ql(H, S, null, R);
  }, Fl.flushSync = function(H) {
    var S = vl.T, R = g.p;
    try {
      if (vl.T = null, g.p = 2, H) return H();
    } finally {
      vl.T = S, g.p = R, g.d.f();
    }
  }, Fl.preconnect = function(H, S) {
    typeof H == "string" && (S ? (S = S.crossOrigin, S = typeof S == "string" ? S === "use-credentials" ? S : "" : void 0) : S = null, g.d.C(H, S));
  }, Fl.prefetchDNS = function(H) {
    typeof H == "string" && g.d.D(H);
  }, Fl.preinit = function(H, S) {
    if (typeof H == "string" && S && typeof S.as == "string") {
      var R = S.as, bl = sl(R, S.crossOrigin), Wl = typeof S.integrity == "string" ? S.integrity : void 0, Vl = typeof S.fetchPriority == "string" ? S.fetchPriority : void 0;
      R === "style" ? g.d.S(
        H,
        typeof S.precedence == "string" ? S.precedence : void 0,
        {
          crossOrigin: bl,
          integrity: Wl,
          fetchPriority: Vl
        }
      ) : R === "script" && g.d.X(H, {
        crossOrigin: bl,
        integrity: Wl,
        fetchPriority: Vl,
        nonce: typeof S.nonce == "string" ? S.nonce : void 0
      });
    }
  }, Fl.preinitModule = function(H, S) {
    if (typeof H == "string")
      if (typeof S == "object" && S !== null) {
        if (S.as == null || S.as === "script") {
          var R = sl(
            S.as,
            S.crossOrigin
          );
          g.d.M(H, {
            crossOrigin: R,
            integrity: typeof S.integrity == "string" ? S.integrity : void 0,
            nonce: typeof S.nonce == "string" ? S.nonce : void 0,
            fetchPriority: typeof S.fetchPriority == "string" ? S.fetchPriority : void 0
          });
        }
      } else S == null && g.d.M(H);
  }, Fl.preload = function(H, S) {
    if (typeof H == "string" && typeof S == "object" && S !== null && typeof S.as == "string") {
      var R = S.as, bl = sl(R, S.crossOrigin);
      g.d.L(H, R, {
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
  }, Fl.preloadModule = function(H, S) {
    if (typeof H == "string")
      if (S) {
        var R = sl(S.as, S.crossOrigin);
        g.d.m(H, {
          as: typeof S.as == "string" && S.as !== "script" ? S.as : void 0,
          crossOrigin: R,
          integrity: typeof S.integrity == "string" ? S.integrity : void 0,
          nonce: typeof S.nonce == "string" ? S.nonce : void 0,
          fetchPriority: typeof S.fetchPriority == "string" ? S.fetchPriority : void 0
        });
      } else g.d.m(H);
  }, Fl.requestFormReset = function(H) {
    g.d.r(H);
  }, Fl.unstable_batchedUpdates = function(H, S) {
    return H(S);
  }, Fl.useFormState = function(H, S, R) {
    return vl.H.useFormState(H, S, R);
  }, Fl.useFormStatus = function() {
    return vl.H.useHostTransitionStatus();
  }, Fl.version = "19.3.0", Fl;
}
var ns;
function dh() {
  if (ns) return A0.exports;
  ns = 1;
  function b() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(b);
      } catch (B) {
        console.error(B);
      }
  }
  return b(), A0.exports = sh(), A0.exports;
}
var fs;
function hh() {
  if (fs) return an;
  fs = 1;
  var b = yh(), B = N0(), X = dh();
  function g(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var u = 2; u < arguments.length; u++)
        t += "&args[]=" + encodeURIComponent(arguments[u]);
    }
    return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function F(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function ul(l) {
    for (var t = l, u = t; u && !u.alternate; )
      t = u, (t.flags & 4098) !== 0 && (l = t.return), u = t.return;
    for (; t.return; ) t = t.return;
    return t.tag === 3 ? l : null;
  }
  function Tl(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function ql(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function vl(l) {
    if (ul(l) !== l)
      throw Error(g(188));
  }
  function sl(l) {
    var t = l.alternate;
    if (!t) {
      if (t = ul(l), t === null) throw Error(g(188));
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
          if (n === u) return vl(e), l;
          if (n === a) return vl(e), t;
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
  function H(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (t = H(l), t !== null) return t;
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
  function R(l) {
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
  function Wl(l) {
    var t = [null, null], u = R(l);
    return u === null || Vl(
      t,
      l,
      u.child,
      { foundSelf: !1 }
    ), t;
  }
  function Vl(l, t, u, a) {
    for (; u !== null; ) {
      if (u === t) a.foundSelf = !0;
      else if (u.tag === 5 || u.tag === 27 || u.tag === 6) {
        if (a.foundSelf) return l[1] = u, !0;
        l[0] = u;
      } else if ((u.tag !== 22 || u.memoizedState === null) && Vl(
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
  function yl(l) {
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
  var et = null, Pl = null;
  function El(l, t, u) {
    return l === u ? !0 : l === t ? (et = l, !0) : !1;
  }
  function nl(l, t, u) {
    return l === u ? (Pl = l, !1) : l === t ? (Pl !== null && (et = l), !0) : !1;
  }
  function Ol(l) {
    if (l === null) return null;
    do
      l = l === null ? null : l.return;
    while (l && l.tag !== 5 && l.tag !== 27 && l.tag !== 3);
    return l || null;
  }
  function fl(l, t, u) {
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
  var Z = Object.assign, x = /* @__PURE__ */ Symbol.for("react.element"), Bl = /* @__PURE__ */ Symbol.for("react.transitional.element"), Il = /* @__PURE__ */ Symbol.for("react.portal"), Hl = /* @__PURE__ */ Symbol.for("react.fragment"), yt = /* @__PURE__ */ Symbol.for("react.strict_mode"), hu = /* @__PURE__ */ Symbol.for("react.profiler"), Ku = /* @__PURE__ */ Symbol.for("react.consumer"), Gl = /* @__PURE__ */ Symbol.for("react.context"), O = /* @__PURE__ */ Symbol.for("react.forward_ref"), q = /* @__PURE__ */ Symbol.for("react.suspense"), G = /* @__PURE__ */ Symbol.for("react.suspense_list"), dl = /* @__PURE__ */ Symbol.for("react.memo"), al = /* @__PURE__ */ Symbol.for("react.lazy"), Ht = /* @__PURE__ */ Symbol.for("react.activity"), kt = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), Ju = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), v = /* @__PURE__ */ Symbol.for("react.view_transition"), z = /* @__PURE__ */ Symbol.for("react.recoverable"), U = Symbol.iterator;
  function C(l) {
    return l === null || typeof l != "object" ? null : (l = U && l[U] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var I = /* @__PURE__ */ Symbol.for("react.client.reference");
  function k(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === I ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case Hl:
        return "Fragment";
      case hu:
        return "Profiler";
      case yt:
        return "StrictMode";
      case q:
        return "Suspense";
      case G:
        return "SuspenseList";
      case Ht:
        return "Activity";
      case v:
        return "ViewTransition";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case Il:
          return "Portal";
        case Gl:
          return l.displayName || "Context";
        case Ku:
          return (l._context.displayName || "Context") + ".Consumer";
        case O:
          var t = l.render;
          return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
        case dl:
          return t = l.displayName || null, t !== null ? t : k(l.type) || "Memo";
        case al:
          t = l._payload, l = l._init;
          try {
            return k(l(t));
          } catch {
          }
      }
    return null;
  }
  var ll = Array.isArray, M = B.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = X.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Pt = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, jf = [], ga = -1;
  function jt(l) {
    return { current: l };
  }
  function pl(l) {
    0 > ga || (l.current = jf[ga], jf[ga] = null, ga--);
  }
  function gl(l, t) {
    ga++, jf[ga] = l.current, l.current = t;
  }
  var Zt = jt(null), ie = jt(null), gu = jt(null), nn = jt(null);
  function fn(l, t) {
    switch (gl(gu, t), gl(ie, l), gl(Zt, null), t.nodeType) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? cm(l) : 0;
        break;
      default:
        if (l = t.tagName, t = t.namespaceURI)
          t = cm(t), l = im(t, l);
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
    pl(Zt), gl(Zt, l);
  }
  function ra() {
    pl(Zt), pl(ie), pl(gu);
  }
  function Zf(l) {
    var t = l.memoizedState;
    t !== null && (ee._currentValue = t.memoizedState, gl(nn, l)), t = Zt.current;
    var u = im(t, l.type);
    t !== u && (gl(ie, l), gl(Zt, u));
  }
  function cn(l) {
    ie.current === l && (pl(Zt), pl(ie)), nn.current === l && (pl(nn), ee._currentValue = Pt);
  }
  var Vf, M0;
  function ru(l) {
    if (Vf === void 0)
      try {
        throw Error();
      } catch (u) {
        var t = u.stack.trim().match(/\n( *(at )?)/);
        Vf = t && t[1] || "", M0 = -1 < u.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < u.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Vf + l + M0;
  }
  var pf = !1;
  function xf(l, t) {
    if (!l || pf) return "";
    pf = !0;
    var u = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var E = function() {
                throw Error();
              };
              if (Object.defineProperty(E.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(E, []);
                } catch (_) {
                  var y = _;
                }
                Reflect.construct(l, [], E);
              } else {
                try {
                  E.call();
                } catch (_) {
                  y = _;
                }
                E = !1;
                try {
                  var h = Object.getOwnPropertyDescriptor(
                    l.prototype,
                    "props"
                  );
                  Object.defineProperty(l.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), E = !0, new l();
                } finally {
                  E && (h !== void 0 ? Object.defineProperty(l.prototype, "props", h) : delete l.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (_) {
                y = _;
              }
              (E = l()) && typeof E.catch == "function" && E.catch(function() {
              });
            }
          } catch (_) {
            if (_ && y && typeof _.stack == "string")
              return [_.stack, y.stack];
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
`), s = c.split(`
`);
        for (e = a = 0; a < i.length && !i[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; e < s.length && !s[e].includes(
          "DetermineComponentFrameRoot"
        ); )
          e++;
        if (a === i.length || e === s.length)
          for (a = i.length - 1, e = s.length - 1; 1 <= a && 0 <= e && i[a] !== s[e]; )
            e--;
        for (; 1 <= a && 0 <= e; a--, e--)
          if (i[a] !== s[e]) {
            if (a !== 1 || e !== 1)
              do
                if (a--, e--, 0 > e || i[a] !== s[e]) {
                  var r = `
` + i[a].replace(" at new ", " at ");
                  return l.displayName && r.includes("<anonymous>") && (r = r.replace("<anonymous>", l.displayName)), r;
                }
              while (1 <= a && 0 <= e);
            break;
          }
      }
    } finally {
      pf = !1, Error.prepareStackTrace = u;
    }
    return (u = l ? l.displayName || l.name : "") ? ru(u) : "";
  }
  function ms(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return ru(l.type);
      case 16:
        return ru("Lazy");
      case 13:
        return l.child !== t && t !== null ? ru("Suspense Fallback") : ru("Suspense");
      case 19:
        return ru("SuspenseList");
      case 0:
      case 15:
        return xf(l.type, !1);
      case 11:
        return xf(l.type.render, !1);
      case 1:
        return xf(l.type, !0);
      case 31:
        return ru("Activity");
      case 30:
        return ru("ViewTransition");
      default:
        return "";
    }
  }
  function D0(l) {
    try {
      var t = "", u = null;
      do
        t += ms(l, u), u = l, l = l.return;
      while (l);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var Lf = Object.prototype.hasOwnProperty, Kf = b.unstable_scheduleCallback, Jf = b.unstable_cancelCallback, ss = b.unstable_shouldYield, ds = b.unstable_requestPaint, mt = b.unstable_now, hs = b.unstable_getCurrentPriorityLevel, U0 = b.unstable_ImmediatePriority, C0 = b.unstable_UserBlockingPriority, on = b.unstable_NormalPriority, gs = b.unstable_LowPriority, R0 = b.unstable_IdlePriority, rs = b.log, Ss = b.unstable_setDisableYieldValue, oe = null, st = null;
  function Su(l) {
    if (typeof rs == "function" && Ss(l), st && typeof st.setStrictMode == "function")
      try {
        st.setStrictMode(oe, l);
      } catch {
      }
  }
  var dt = Math.clz32 ? Math.clz32 : zs, Ts = Math.log, Es = Math.LN2;
  function zs(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (Ts(l) / Es | 0) | 0;
  }
  var vn = 256, yn = 262144, mn = 4194304;
  function wu(l) {
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
  function sn(l, t, u) {
    var a = l.pendingLanes;
    if (a === 0) return 0;
    var e = 0, n = l.suspendedLanes, f = l.pingedLanes;
    l = l.warmLanes;
    var c = a & 134217727;
    return c !== 0 ? (a = c & ~n, a !== 0 ? e = wu(a) : (f &= c, f !== 0 ? e = wu(f) : u || (u = c & ~l, u !== 0 && (e = wu(u))))) : (c = a & ~n, c !== 0 ? e = wu(c) : f !== 0 ? e = wu(f) : u || (u = a & ~l, u !== 0 && (e = wu(u)))), e === 0 ? 0 : t !== 0 && t !== e && (t & n) === 0 && (n = e & -e, u = t & -t, n >= u || n === 32 && (u & 4194048) !== 0) ? t : e;
  }
  function ve(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function H0(l, t) {
    (t & 8) !== 0 && (t |= t & 32);
    var u = l.entangledLanes;
    if (u !== 0)
      for (l = l.entanglements, u &= t; 0 < u; ) {
        var a = 31 - dt(u), e = 1 << a;
        t |= l[a], u &= ~e;
      }
    return t;
  }
  function bs(l, t) {
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
  function Y0() {
    var l = mn;
    return mn <<= 1, (mn & 62914560) === 0 && (mn = 4194304), l;
  }
  function wf(l) {
    for (var t = [], u = 0; 31 > u; u++) t.push(l);
    return t;
  }
  function ye(l, t) {
    l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function _s(l, t, u, a, e, n) {
    var f = l.pendingLanes;
    l.pendingLanes = u, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= u, l.entangledLanes &= u, l.errorRecoveryDisabledLanes &= u, l.shellSuspendCounter = 0;
    var c = l.entanglements, i = l.expirationTimes, s = l.hiddenUpdates;
    for (u = f & ~u; 0 < u; ) {
      var r = 31 - dt(u), E = 1 << r;
      c[r] = 0, i[r] = -1;
      var y = s[r];
      if (y !== null)
        for (s[r] = null, r = 0; r < y.length; r++) {
          var h = y[r];
          h !== null && (h.lane &= -536870913);
        }
      u &= ~E;
    }
    a !== 0 && q0(l, a, 0), n !== 0 && e === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(f & ~t));
  }
  function q0(l, t, u) {
    l.pendingLanes |= t, l.suspendedLanes &= ~t;
    var a = 31 - dt(t);
    l.entangledLanes |= t, l.entanglements[a] = l.entanglements[a] | 1073741824 | u & 261930;
  }
  function B0(l, t) {
    var u = l.entangledLanes |= t;
    for (l = l.entanglements; u; ) {
      var a = 31 - dt(u), e = 1 << a;
      e & t | l[a] & t && (l[a] |= t), u &= ~e;
    }
  }
  function G0(l, t) {
    var u = t & -t;
    return u = (u & 42) !== 0 ? 1 : $f(u), (u & (l.suspendedLanes | t)) !== 0 ? 0 : u;
  }
  function $f(l) {
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
  function X0() {
    var l = Q.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : Km(l.type));
  }
  function Q0(l, t) {
    var u = Q.p;
    try {
      return Q.p = l, t();
    } finally {
      Q.p = u;
    }
  }
  var lu = Math.random().toString(36).slice(2), xl = "__reactFiber$" + lu, nt = "__reactProps$" + lu, Sa = "__reactContainer$" + lu, j0 = "__reactEvents$" + lu, Os = "__reactListeners$" + lu, As = "__reactHandles$" + lu, Z0 = "__reactResources$" + lu, me = "__reactMarker$" + lu, dn = "__reactLoad$" + lu;
  function hn(l) {
    delete l[xl], delete l[nt], delete l[Os], delete l[As];
  }
  function $u(l) {
    var t;
    if (t = l[xl]) return t;
    for (var u = l.parentNode; u; ) {
      if (t = u[Sa] || u[xl]) {
        if (u = t.alternate, t.child !== null || u !== null && u.child !== null)
          for (l = Am(l); l !== null; ) {
            if (u = l[xl]) return u;
            l = Am(l);
          }
        return t;
      }
      l = u, u = l.parentNode;
    }
    return null;
  }
  function Ta(l) {
    if (l = l[xl] || l[Sa]) {
      var t = l.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return l;
    }
    return null;
  }
  function se(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(g(33));
  }
  function Ea(l) {
    var t = l[Z0];
    return t || (t = l[Z0] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Xl(l) {
    l[me] = !0;
  }
  function V0(l) {
    l[dn] = void 0;
  }
  var p0 = /* @__PURE__ */ new Set(), x0 = {};
  function Fu(l, t) {
    za(l, t), za(l + "Capture", t);
  }
  function za(l, t) {
    for (x0[l] = t, l = 0; l < t.length; l++)
      p0.add(t[l]);
  }
  var Ns = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), L0 = {}, K0 = {};
  function Ms(l) {
    return Lf.call(K0, l) ? !0 : Lf.call(L0, l) ? !1 : Ns.test(l) ? K0[l] = !0 : (L0[l] = !0, !1);
  }
  var P = !1;
  function J0() {
    var l = P;
    return P = !1, l;
  }
  function gn(l, t, u) {
    if (Ms(t))
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
  function rn(l, t, u) {
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
  function tu(l, t, u, a) {
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
  function ht(l) {
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
  function w0(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Ds(l, t, u) {
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
      var t = w0(l) ? "checked" : "value";
      l._valueTracker = Ds(
        l,
        t,
        "" + l[t]
      );
    }
  }
  function $0(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var u = t.getValue(), a = "";
    return l && (a = w0(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== u ? (t.setValue(l), !0) : !1;
  }
  var Us = /[\n"\\]/g;
  function _t(l) {
    return l.replace(
      Us,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function If(l, t, u, a, e, n, f, c) {
    l.name = "", f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? l.type = f : l.removeAttribute("type"), t != null ? f === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + ht(t)) : l.value !== "" + ht(t) && (l.value = "" + ht(t)) : f !== "submit" && f !== "reset" || l.removeAttribute("value"), t != null ? f === "number" && l.value == t ? kf(l, ht(l.value)) : kf(l, ht(t)) : u != null ? kf(l, ht(u)) : a != null && l.removeAttribute("value"), e == null && n != null && (l.defaultChecked = !!n), e != null && (l.checked = e && typeof e != "function" && typeof e != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.name = "" + ht(c) : l.removeAttribute("name");
  }
  function F0(l, t, u, a, e, n, f, c) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (l.type = n), t != null || u != null) {
      if (!(n !== "submit" && n !== "reset" || t != null)) {
        Wf(l);
        return;
      }
      u = u != null ? "" + ht(u) : "", t = t != null ? "" + ht(t) : u, c || t === l.value || (l.value = t), l.defaultValue = t;
    }
    a = a ?? e, a = typeof a != "function" && typeof a != "symbol" && !!a, l.checked = c ? l.checked : !!a, l.defaultChecked = !!a, f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (l.name = f), Wf(l);
  }
  function kf(l, t) {
    l.defaultValue !== "" + t && (l.defaultValue = "" + t);
  }
  function ba(l, t, u, a) {
    if (l = l.options, t) {
      t = {};
      for (var e = 0; e < u.length; e++)
        t["$" + u[e]] = !0;
      for (u = 0; u < l.length; u++)
        e = t.hasOwnProperty("$" + l[u].value), l[u].selected !== e && (l[u].selected = e), e && a && (l[u].defaultSelected = !0);
    } else {
      for (u = "" + ht(u), t = null, e = 0; e < l.length; e++) {
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
    if (t != null && (t = "" + ht(t), t !== l.value && (l.value = t), u == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = u != null ? "" + ht(u) : "";
  }
  function I0(l, t, u, a) {
    if (t == null) {
      if (a != null) {
        if (u != null) throw Error(g(92));
        if (ll(a)) {
          if (1 < a.length) throw Error(g(93));
          a = a[0];
        }
        u = a;
      }
      u == null && (u = ""), t = u;
    }
    u = ht(t), l.defaultValue = u, a = l.textContent, a === u && a !== "" && a !== null && (l.value = a), Wf(l);
  }
  function _a(l, t) {
    if (t) {
      var u = l.firstChild;
      if (u && u === l.lastChild && u.nodeType === 3) {
        u.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var Cs = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function k0(l, t, u) {
    var a = t.indexOf("--") === 0;
    u == null || typeof u == "boolean" || u === "" ? a ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : a ? l.setProperty(t, u) : typeof u != "number" || u === 0 || Cs.has(t) ? t === "float" ? l.cssFloat = u : l[t] = ("" + u).trim() : l[t] = u + "px";
  }
  function P0(l, t, u) {
    if (t != null && typeof t != "object")
      throw Error(g(62));
    if (l = l.style, u != null) {
      for (var a in u)
        !u.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "", P = !0);
      for (var e in t)
        a = t[e], t.hasOwnProperty(e) && u[e] !== a && (k0(l, e, a), P = !0);
    } else
      for (var n in t)
        t.hasOwnProperty(n) && k0(l, n, t[n]);
  }
  function Pf(l) {
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
  var Rs = /* @__PURE__ */ new Map([
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
  ]), Hs = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Sn(l) {
    return Hs.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function Vt() {
  }
  var lc = null;
  function tc(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var Oa = null, Aa = null;
  function lo(l) {
    var t = Ta(l);
    if (t && (l = t.stateNode)) {
      var u = l[nt] || null;
      l: switch (l = t.stateNode, t.type) {
        case "input":
          if (If(
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
              'input[name="' + _t(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < u.length; t++) {
              var a = u[t];
              if (a !== l && a.form === l.form) {
                var e = a[nt] || null;
                if (!e) throw Error(g(90));
                If(
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
              a = u[t], a.form === l.form && $0(a);
          }
          break l;
        case "textarea":
          W0(l, u.value, u.defaultValue);
          break l;
        case "select":
          t = u.value, t != null && ba(l, !!u.multiple, t, !1);
      }
    }
  }
  var uc = !1;
  function to(l, t, u) {
    if (uc) return l(t, u);
    uc = !0;
    try {
      var a = l(t);
      return a;
    } finally {
      if (uc = !1, (Oa !== null || Aa !== null) && (Tf(), Oa && (t = Oa, l = Aa, Aa = Oa = null, lo(t), l)))
        for (t = 0; t < l.length; t++) lo(l[t]);
    }
  }
  function de(l, t) {
    var u = l.stateNode;
    if (u === null) return null;
    var a = u[nt] || null;
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
  var uu = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ac = !1;
  if (uu)
    try {
      var he = {};
      Object.defineProperty(he, "passive", {
        get: function() {
          ac = !0;
        }
      }), window.addEventListener("test", he, he), window.removeEventListener("test", he, he);
    } catch {
      ac = !1;
    }
  var Tu = null, ec = null, Tn = null;
  function uo() {
    if (Tn) return Tn;
    var l, t = ec, u = t.length, a, e = "value" in Tu ? Tu.value : Tu.textContent, n = e.length;
    for (l = 0; l < u && t[l] === e[l]; l++) ;
    var f = u - l;
    for (a = 1; a <= f && t[u - a] === e[n - a]; a++) ;
    return Tn = e.slice(l, 1 < a ? 1 - a : void 0);
  }
  function En(l) {
    var t = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function zn() {
    return !0;
  }
  function ao() {
    return !1;
  }
  function lt(l) {
    function t(u, a, e, n, f) {
      this._reactName = u, this._targetInst = e, this.type = a, this.nativeEvent = n, this.target = f, this.currentTarget = null;
      for (var c in l)
        l.hasOwnProperty(c) && (u = l[c], this[c] = u ? u(n) : n[c]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? zn : ao, this.isPropagationStopped = ao, this;
    }
    return Z(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var u = this.nativeEvent;
        u && (u.preventDefault ? u.preventDefault() : typeof u.returnValue != "unknown" && (u.returnValue = !1), this.isDefaultPrevented = zn);
      },
      stopPropagation: function() {
        var u = this.nativeEvent;
        u && (u.stopPropagation ? u.stopPropagation() : typeof u.cancelBubble != "unknown" && (u.cancelBubble = !0), this.isPropagationStopped = zn);
      },
      persist: function() {
      },
      isPersistent: zn
    }), t;
  }
  var Eu = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, bn = lt(Eu), ge = Z({}, Eu, { view: 0, detail: 0 }), Ys = lt(ge), nc, fc, re, _n = Z({}, ge, {
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
    getModifierState: ic,
    button: 0,
    buttons: 0,
    relatedTarget: function(l) {
      return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
    },
    movementX: function(l) {
      return "movementX" in l ? l.movementX : (l !== re && (re && l.type === "mousemove" ? (nc = l.screenX - re.screenX, fc = l.screenY - re.screenY) : fc = nc = 0, re = l), nc);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : fc;
    }
  }), eo = lt(_n), qs = Z({}, _n, { dataTransfer: 0 }), Bs = lt(qs), Gs = Z({}, ge, { relatedTarget: 0 }), cc = lt(Gs), Xs = Z({}, Eu, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Qs = lt(Xs), js = Z({}, Eu, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), Zs = lt(js), Vs = Z({}, Eu, { data: 0 }), no = lt(Vs), ps = {
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
  }, xs = {
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
  }, Ls = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Ks(l) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(l) : (l = Ls[l]) ? !!t[l] : !1;
  }
  function ic() {
    return Ks;
  }
  var Js = Z({}, ge, {
    key: function(l) {
      if (l.key) {
        var t = ps[l.key] || l.key;
        if (t !== "Unidentified") return t;
      }
      return l.type === "keypress" ? (l = En(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? xs[l.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: ic,
    charCode: function(l) {
      return l.type === "keypress" ? En(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? En(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), ws = lt(Js), $s = Z({}, _n, {
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
  }), fo = lt($s), Fs = Z({}, Eu, { submitter: 0 }), Ws = lt(Fs), Is = Z({}, ge, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: ic
  }), ks = lt(Is), Ps = Z({}, Eu, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), ld = lt(Ps), td = Z({}, _n, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), ud = lt(td), ad = Z({}, Eu, {
    newState: 0,
    oldState: 0,
    source: 0
  }), ed = lt(ad), nd = [9, 13, 27, 32], oc = uu && "CompositionEvent" in window, Se = null;
  uu && "documentMode" in document && (Se = document.documentMode);
  var fd = uu && "TextEvent" in window && !Se, co = uu && (!oc || Se && 8 < Se && 11 >= Se), io = " ", oo = !1;
  function vo(l, t) {
    switch (l) {
      case "keyup":
        return nd.indexOf(t.keyCode) !== -1;
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
  function yo(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var Na = !1;
  function cd(l, t) {
    switch (l) {
      case "compositionend":
        return yo(t);
      case "keypress":
        return t.which !== 32 ? null : (oo = !0, io);
      case "textInput":
        return l = t.data, l === io && oo ? null : l;
      default:
        return null;
    }
  }
  function id(l, t) {
    if (Na)
      return l === "compositionend" || !oc && vo(l, t) ? (l = uo(), Tn = ec = Tu = null, Na = !1, l) : null;
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
        return co && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var od = {
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
  function mo(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!od[l.type] : t === "textarea";
  }
  function so(l, t, u, a) {
    Oa ? Aa ? Aa.push(a) : Aa = [a] : Oa = a, t = Af(t, "onChange"), 0 < t.length && (u = new bn(
      "onChange",
      "change",
      null,
      u,
      a
    ), l.push({ event: u, listeners: t }));
  }
  var Te = null, Ee = null;
  function vd(l) {
    tm(l, 0);
  }
  function On(l) {
    var t = se(l);
    if ($0(t)) return l;
  }
  function ho(l, t) {
    if (l === "change") return t;
  }
  var go = !1;
  if (uu) {
    var vc;
    if (uu) {
      var yc = "oninput" in document;
      if (!yc) {
        var ro = document.createElement("div");
        ro.setAttribute("oninput", "return;"), yc = typeof ro.oninput == "function";
      }
      vc = yc;
    } else vc = !1;
    go = vc && (!document.documentMode || 9 < document.documentMode);
  }
  function So() {
    Te && (Te.detachEvent("onpropertychange", To), Ee = Te = null);
  }
  function To(l) {
    if (l.propertyName === "value" && On(Ee)) {
      var t = [];
      so(
        t,
        Ee,
        l,
        tc(l)
      ), to(vd, t);
    }
  }
  function yd(l, t, u) {
    l === "focusin" ? (So(), Te = t, Ee = u, Te.attachEvent("onpropertychange", To)) : l === "focusout" && So();
  }
  function md(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return On(Ee);
  }
  function sd(l, t) {
    if (l === "click") return On(t);
  }
  function dd(l, t) {
    if (l === "input" || l === "change")
      return On(t);
  }
  function hd(l, t) {
    return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
  }
  var gt = typeof Object.is == "function" ? Object.is : hd;
  function ze(l, t) {
    if (gt(l, t)) return !0;
    if (typeof l != "object" || l === null || typeof t != "object" || t === null)
      return !1;
    var u = Object.keys(l), a = Object.keys(t);
    if (u.length !== a.length) return !1;
    for (a = 0; a < u.length; a++) {
      var e = u[a];
      if (!Lf.call(t, e) || !gt(l[e], t[e]))
        return !1;
    }
    return !0;
  }
  function mc(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  function Eo(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function zo(l, t) {
    var u = Eo(l);
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
      u = Eo(u);
    }
  }
  function bo(l, t) {
    return l && t ? l === t ? !0 : l && l.nodeType === 3 ? !1 : t && t.nodeType === 3 ? bo(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function _o(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var t = mc(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var u = typeof t.contentWindow.location.href == "string";
      } catch {
        u = !1;
      }
      if (u) l = t.contentWindow;
      else break;
      t = mc(l.document);
    }
    return t;
  }
  function sc(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
  }
  var gd = uu && "documentMode" in document && 11 >= document.documentMode, Ma = null, dc = null, be = null, hc = !1;
  function Oo(l, t, u) {
    var a = u.window === u ? u.document : u.nodeType === 9 ? u : u.ownerDocument;
    hc || Ma == null || Ma !== mc(a) || (a = Ma, "selectionStart" in a && sc(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), be && ze(be, a) || (be = a, a = Af(dc, "onSelect"), 0 < a.length && (t = new bn(
      "onSelect",
      "select",
      null,
      t,
      u
    ), l.push({ event: t, listeners: a }), t.target = Ma)));
  }
  function Wu(l, t) {
    var u = {};
    return u[l.toLowerCase()] = t.toLowerCase(), u["Webkit" + l] = "webkit" + t, u["Moz" + l] = "moz" + t, u;
  }
  var Da = {
    animationend: Wu("Animation", "AnimationEnd"),
    animationiteration: Wu("Animation", "AnimationIteration"),
    animationstart: Wu("Animation", "AnimationStart"),
    transitionrun: Wu("Transition", "TransitionRun"),
    transitionstart: Wu("Transition", "TransitionStart"),
    transitioncancel: Wu("Transition", "TransitionCancel"),
    transitionend: Wu("Transition", "TransitionEnd")
  }, gc = {}, Ao = {};
  uu && (Ao = document.createElement("div").style, "AnimationEvent" in window || (delete Da.animationend.animation, delete Da.animationiteration.animation, delete Da.animationstart.animation), "TransitionEvent" in window || delete Da.transitionend.transition);
  function Iu(l) {
    if (gc[l]) return gc[l];
    if (!Da[l]) return l;
    var t = Da[l], u;
    for (u in t)
      if (t.hasOwnProperty(u) && u in Ao)
        return gc[l] = t[u];
    return l;
  }
  var No = Iu("animationend"), Mo = Iu("animationiteration"), Do = Iu("animationstart"), rd = Iu("transitionrun"), Sd = Iu("transitionstart"), Td = Iu("transitioncancel"), Uo = Iu("transitionend"), Co = /* @__PURE__ */ new Map(), rc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  rc.push("scrollEnd");
  function Yt(l, t) {
    Co.set(l, t), Fu(t, [l]);
  }
  var Ed = 0;
  function au(l, t) {
    if (l.name != null && l.name !== "auto") return l.name;
    if (t.autoName !== null) return t.autoName;
    l = Xt.identifierPrefix;
    var u = Ed++;
    return l = "_" + l + "t_" + u.toString(32) + "_", t.autoName = l;
  }
  function Ro(l) {
    if (l == null || typeof l == "string")
      return l;
    var t = null, u = $a;
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
  function eu(l, t) {
    return l = Ro(l), t = Ro(t), t == null ? l === "auto" ? null : l : t === "auto" ? null : t;
  }
  var An = typeof reportError == "function" ? reportError : function(l) {
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
  }, Ot = [], Ua = 0, Sc = 0;
  function Nn() {
    for (var l = Ua, t = Sc = Ua = 0; t < l; ) {
      var u = Ot[t];
      Ot[t++] = null;
      var a = Ot[t];
      Ot[t++] = null;
      var e = Ot[t];
      Ot[t++] = null;
      var n = Ot[t];
      if (Ot[t++] = null, a !== null && e !== null) {
        var f = a.pending;
        f === null ? e.next = e : (e.next = f.next, f.next = e), a.pending = e;
      }
      n !== 0 && Ho(u, e, n);
    }
  }
  function Mn(l, t, u, a) {
    Ot[Ua++] = l, Ot[Ua++] = t, Ot[Ua++] = u, Ot[Ua++] = a, Sc |= a, l.lanes |= a, l = l.alternate, l !== null && (l.lanes |= a);
  }
  function Tc(l, t, u, a) {
    return Mn(l, t, u, a), Dn(l);
  }
  function ku(l, t) {
    return Mn(l, null, null, t), Dn(l);
  }
  function Ho(l, t, u) {
    l.lanes |= u;
    var a = l.alternate;
    a !== null && (a.lanes |= u);
    for (var e = !1, n = l.return; n !== null; )
      n.childLanes |= u, a = n.alternate, a !== null && (a.childLanes |= u), n.tag === 22 && (l = n.stateNode, l === null || l._visibility & 1 || (e = !0)), l = n, n = n.return;
    return l.tag === 3 ? (n = l.stateNode, e && t !== null && (e = 31 - dt(u), l = n.hiddenUpdates, a = l[e], a === null ? l[e] = [t] : a.push(t), t.lane = u | 536870912), n) : null;
  }
  function Dn(l) {
    if (50 < Le)
      throw Le = 0, Sf = null, Error(g(185));
    for (var t = l.return; t !== null; )
      l = t, t = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var Ca = {};
  function zd(l, t, u, a) {
    this.tag = l, this.key = u, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function ft(l, t, u, a) {
    return new zd(l, t, u, a);
  }
  function Ec(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function nu(l, t) {
    var u = l.alternate;
    return u === null ? (u = ft(
      l.tag,
      t,
      l.key,
      l.mode
    ), u.elementType = l.elementType, u.type = l.type, u.stateNode = l.stateNode, u.alternate = l, l.alternate = u) : (u.pendingProps = t, u.type = l.type, u.flags = 0, u.subtreeFlags = 0, u.deletions = null), u.flags = l.flags & 1206910976, u.childLanes = l.childLanes, u.lanes = l.lanes, u.child = l.child, u.memoizedProps = l.memoizedProps, u.memoizedState = l.memoizedState, u.updateQueue = l.updateQueue, t = l.dependencies, u.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, u.sibling = l.sibling, u.index = l.index, u.ref = l.ref, u.refCleanup = l.refCleanup, u;
  }
  function Yo(l, t) {
    l.flags &= 1206910978;
    var u = l.alternate;
    return u === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = u.childLanes, l.lanes = u.lanes, l.child = u.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = u.memoizedProps, l.memoizedState = u.memoizedState, l.updateQueue = u.updateQueue, l.type = u.type, t = u.dependencies, l.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), l;
  }
  function Un(l, t, u, a, e, n) {
    var f = 0;
    if (a = l, typeof a == "function") Ec(a) && (f = 1);
    else if (typeof a == "string")
      f = F1(
        l,
        u,
        Zt.current
      ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      l: switch (a) {
        case Ht:
          return l = ft(31, u, t, e), l.elementType = Ht, l.lanes = n, l;
        case Hl:
          return Pu(u.children, e, n, t);
        case yt:
          f = 8, e |= 24;
          break;
        case hu:
          return l = ft(12, u, t, e | 2), l.elementType = hu, l.lanes = n, l;
        case q:
          return l = ft(13, u, t, e), l.elementType = q, l.lanes = n, l;
        case G:
          return l = ft(19, u, t, e), l.elementType = G, l.lanes = n, l;
        case kt:
        case v:
          return l = e | 32, l = ft(30, u, t, l), l.elementType = v, l.lanes = n, l.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, l;
        default:
          if (typeof a == "object" && a !== null)
            switch (a.$$typeof) {
              case Gl:
                f = 10;
                break l;
              case Ku:
                f = 9;
                break l;
              case O:
                f = 11;
                break l;
              case dl:
                f = 14;
                break l;
              case al:
                f = 16, a = null;
                break l;
            }
          f = 29, u = Error(
            g(130, l === null ? "null" : typeof l, "")
          ), a = null;
      }
    return t = ft(f, u, t, e), t.elementType = l, t.type = a, t.lanes = n, t;
  }
  function Pu(l, t, u, a) {
    return l = ft(7, l, a, t), l.lanes = u, l;
  }
  function zc(l, t, u) {
    return l = ft(6, l, null, t), l.lanes = u, l;
  }
  function qo(l) {
    var t = ft(18, null, null, 0);
    return t.stateNode = l, t;
  }
  function bc(l, t, u) {
    return t = ft(
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
  var Bo = /* @__PURE__ */ new WeakMap();
  function At(l, t) {
    if (typeof l == "object" && l !== null) {
      var u = Bo.get(l);
      return u !== void 0 ? u : (t = {
        value: l,
        source: t,
        stack: D0(t)
      }, Bo.set(l, t), t);
    }
    return {
      value: l,
      source: t,
      stack: D0(t)
    };
  }
  var Ra = [], Ha = 0, Cn = null, _e = 0, Nt = [], Mt = 0, zu = null, pt = 1, xt = "";
  function fu(l, t) {
    Ra[Ha++] = _e, Ra[Ha++] = Cn, Cn = l, _e = t;
  }
  function Go(l, t, u) {
    Nt[Mt++] = pt, Nt[Mt++] = xt, Nt[Mt++] = zu, zu = l;
    var a = pt;
    l = xt;
    var e = 32 - dt(a) - 1;
    a &= ~(1 << e), u += 1;
    var n = 32 - dt(t) + e;
    if (30 < n) {
      var f = e - e % 5;
      n = (a & (1 << f) - 1).toString(32), a >>= f, e -= f, pt = 1 << 32 - dt(t) + e | u << e | a, xt = n + l;
    } else
      pt = 1 << n | u << e | a, xt = l;
  }
  function Rn(l) {
    l.return !== null && (fu(l, 1), Go(l, 1, 0));
  }
  function _c(l) {
    for (; l === Cn; )
      Cn = Ra[--Ha], Ra[Ha] = null, _e = Ra[--Ha], Ra[Ha] = null;
    for (; l === zu; )
      zu = Nt[--Mt], Nt[Mt] = null, xt = Nt[--Mt], Nt[Mt] = null, pt = Nt[--Mt], Nt[Mt] = null;
  }
  function Xo(l, t) {
    Nt[Mt++] = pt, Nt[Mt++] = xt, Nt[Mt++] = zu, pt = t.id, xt = t.overflow, zu = l;
  }
  var Ql = null, rl = null, L = !1, bu = null, Dt = !1, Oc = Error(g(519));
  function _u(l) {
    var t = Error(
      g(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Oe(At(t, l)), Oc;
  }
  function Qo(l) {
    var t = l.stateNode, u = l.type, a = l.memoizedProps;
    switch (t[xl] = l, t[nt] = a, u) {
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
        for (u = 0; u < Je.length; u++)
          J(Je[u], t);
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
        J("invalid", t), I0(t, a.value, a.defaultValue, a.children);
    }
    u = a.children, typeof u != "string" && typeof u != "number" && typeof u != "bigint" || t.textContent === "" + u || a.suppressHydrationWarning === !0 || nm(t.textContent, u) ? (a.popover != null && (J("beforetoggle", t), J("toggle", t)), a.onScroll != null && J("scroll", t), a.onScrollEnd != null && J("scrollend", t), a.onClick != null && (t.onclick = Vt), t = !0) : t = !1, t || _u(l, !0);
  }
  function Hn(l) {
    for (Ql = l.return; Ql; )
      switch (Ql.tag) {
        case 5:
        case 31:
        case 13:
          Dt = !1;
          return;
        case 27:
        case 3:
          Dt = !0;
          return;
        default:
          Ql = Ql.return;
      }
  }
  function Ya(l) {
    if (l !== Ql) return !1;
    if (!L) return Hn(l), L = !0, !1;
    var t = l.tag, u;
    if ((u = t !== 3 && t !== 27) && ((u = t === 5) && (u = l.type, u = !(u !== "form" && u !== "button") || l0(l.type, l.memoizedProps)), u = !u), u && rl && _u(l), Hn(l), t === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(g(317));
      rl = Om(l);
    } else if (t === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(g(317));
      rl = Om(l);
    } else
      t === 27 ? (t = rl, ju(l.type) ? (l = o0, o0 = null, rl = l) : rl = t) : rl = Ql ? Ct(l.stateNode.nextSibling) : null;
    return !0;
  }
  function la() {
    rl = Ql = null, L = !1;
  }
  function Ac() {
    var l = bu;
    return l !== null && (ot === null ? ot = l : ot.push.apply(
      ot,
      l
    ), bu = null), l;
  }
  function Oe(l) {
    bu === null ? bu = [l] : bu.push(l);
  }
  var Nc = jt(null), ta = null, cu = null;
  function Ou(l, t, u) {
    gl(Nc, t._currentValue), t._currentValue = u;
  }
  function iu(l) {
    l._currentValue = Nc.current, pl(Nc);
  }
  function Yn(l, t, u) {
    for (; l !== null; ) {
      var a = l.alternate;
      if ((l.childLanes & t) !== t ? (l.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), l === u) break;
      l = l.return;
    }
  }
  function Mc(l, t, u, a) {
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
  function ua(l, t, u, a) {
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
          gt(e.pendingProps.value, f.value) || (l !== null ? l.push(c) : l = [c]);
        }
      } else if (e === nn.current) {
        if (f = e.alternate, f === null) throw Error(g(387));
        f.memoizedState.memoizedState !== e.memoizedState.memoizedState && (l !== null ? l.push(ee) : l = [ee]);
      }
      e = e.return;
    }
    return l !== null && Mc(
      t,
      l,
      u,
      a
    ), t.flags |= 262144, l !== null;
  }
  function qn(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!gt(
        l.context._currentValue,
        l.memoizedValue
      ))
        return !0;
      l = l.next;
    }
    return !1;
  }
  function aa(l) {
    ta = l, cu = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function Ll(l) {
    return jo(ta, l);
  }
  function Bn(l, t) {
    return ta === null && aa(l), jo(l, t);
  }
  function jo(l, t) {
    var u = t._currentValue;
    if (t = { context: t, memoizedValue: u, next: null }, cu === null) {
      if (l === null) throw Error(g(308));
      cu = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
    } else cu = cu.next = t;
    return u;
  }
  var bd = typeof AbortController < "u" ? AbortController : function() {
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
  }, _d = b.unstable_scheduleCallback, Od = b.unstable_NormalPriority, Dl = {
    $$typeof: Gl,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Dc() {
    return {
      controller: new bd(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Ae(l) {
    l.refCount--, l.refCount === 0 && _d(Od, function() {
      l.controller.abort();
    });
  }
  function Zo(l, t) {
    if ((l.pendingLanes & 4194048) !== 0) {
      var u = l.transitionTypes;
      for (u === null && (u = l.transitionTypes = []), l = 0; l < t.length; l++) {
        var a = t[l];
        u.indexOf(a) === -1 && u.push(a);
      }
    }
  }
  var Ne = null;
  function Ad(l) {
    var t = l.transitionTypes;
    return l.transitionTypes = null, t;
  }
  var Me = null, Uc = 0, ea = 0, qa = null;
  function Nd(l, t) {
    if (Me === null) {
      var u = Me = [];
      Uc = 0, ea = Ki(), qa = {
        status: "pending",
        value: void 0,
        then: function(a) {
          u.push(a);
        }
      };
    }
    return Uc++, t.then(Vo, Vo), t;
  }
  function Vo() {
    if (--Uc === 0 && (Ne = null, Me !== null)) {
      qa !== null && (qa.status = "fulfilled");
      var l = Me;
      Me = null, ea = 0, qa = null;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function Md(l, t) {
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
  var po = M.S;
  M.S = function(l, t) {
    if (qy = mt(), typeof t == "object" && t !== null && typeof t.then == "function" && Nd(l, t), Ne !== null)
      for (var u = ka; u !== null; )
        Zo(u, Ne), u = u.next;
    if (u = l.types, u !== null) {
      for (var a = ka; a !== null; )
        Zo(a, u), a = a.next;
      if (ea !== 0) {
        a = Ne, a === null && (a = Ne = []);
        for (var e = 0; e < u.length; e++) {
          var n = u[e];
          a.indexOf(n) === -1 && a.push(n);
        }
      }
    }
    po !== null && po(l, t);
  };
  var na = jt(null);
  function Cc() {
    var l = na.current;
    return l !== null ? l : hl.pooledCache;
  }
  function Gn(l, t) {
    t === null ? gl(na, na.current) : gl(na, t.pool);
  }
  function xo() {
    var l = Cc();
    return l === null ? null : { parent: Dl._currentValue, pool: l };
  }
  var Ba = Error(g(460)), Rc = Error(g(474)), Xn = Error(g(542)), Qn = { then: function() {
  } };
  function Lo(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function Ko(l, t, u) {
    switch (u = l[u], u === void 0 ? l.push(t) : u !== t && (t.then(Vt, Vt), t = u), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw l = t.reason, wo(l), l === void 0 && !("reason" in t) ? Error(g(600)) : l;
      default:
        if (typeof t.status == "string") t.then(Vt, Vt);
        else {
          if (l = hl, l !== null && 100 < l.shellSuspendCounter)
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
            throw l = t.reason, wo(l), l;
        }
        throw ca = t, Ba;
    }
  }
  function fa(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (u) {
      throw u !== null && typeof u == "object" && typeof u.then == "function" ? (ca = u, Ba) : u;
    }
  }
  var ca = null;
  function Jo() {
    if (ca === null) throw Error(g(459));
    var l = ca;
    return ca = null, l;
  }
  function wo(l) {
    if (l === Ba || l === Xn)
      throw Error(g(483));
  }
  var Ga = null, De = 0;
  function jn(l) {
    var t = De;
    return De += 1, Ga === null && (Ga = []), Ko(Ga, l, t);
  }
  function Au(l, t) {
    t = t.props.ref, l.ref = t !== void 0 ? t : null;
  }
  function Zn(l, t) {
    throw t.$$typeof === x ? Error(g(525)) : (l = Object.prototype.toString.call(t), Error(
      g(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l
      )
    ));
  }
  function $o(l) {
    function t(m, o) {
      if (l) {
        var d = m.deletions;
        d === null ? (m.deletions = [o], m.flags |= 16) : d.push(o);
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
      return m = nu(m, o), m.index = 0, m.sibling = null, m;
    }
    function n(m, o, d) {
      return m.index = d, l ? (d = m.alternate, d !== null ? (d = d.index, d < o ? (m.flags |= 2, o) : d) : (m.flags |= 134217730, o)) : (m.flags |= 1048576, o);
    }
    function f(m) {
      return l && m.alternate === null && (m.flags |= 134217730), m;
    }
    function c(m, o, d, T) {
      return o === null || o.tag !== 6 ? (o = zc(d, m.mode, T), o.return = m, o) : (o = e(o, d), o.return = m, o);
    }
    function i(m, o, d, T) {
      var A = d.type;
      return A === Hl ? (m = r(
        m,
        o,
        d.props.children,
        T,
        d.key
      ), Au(m, d), m) : o !== null && (o.elementType === A || typeof A == "object" && A !== null && A.$$typeof === al && fa(A) === o.type) ? (o = e(o, d.props), Au(o, d), o.return = m, o) : (o = Un(
        d.type,
        d.key,
        d.props,
        null,
        m.mode,
        T
      ), Au(o, d), o.return = m, o);
    }
    function s(m, o, d, T) {
      return o === null || o.tag !== 4 || o.stateNode.containerInfo !== d.containerInfo || o.stateNode.implementation !== d.implementation ? (o = bc(d, m.mode, T), o.return = m, o) : (o = e(o, d.children || []), o.return = m, o);
    }
    function r(m, o, d, T, A) {
      return o === null || o.tag !== 7 ? (o = Pu(
        d,
        m.mode,
        T,
        A
      ), o.return = m, o) : (o = e(o, d), o.return = m, o);
    }
    function E(m, o, d) {
      if (typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint")
        return o = zc(
          "" + o,
          m.mode,
          d
        ), o.return = m, o;
      if (typeof o == "object" && o !== null) {
        switch (o.$$typeof) {
          case Bl:
            return d = Un(
              o.type,
              o.key,
              o.props,
              null,
              m.mode,
              d
            ), Au(d, o), d.return = m, d;
          case Il:
            return o = bc(
              o,
              m.mode,
              d
            ), o.return = m, o;
          case al:
            return o = fa(o), E(m, o, d);
        }
        if (ll(o) || C(o))
          return o = Pu(
            o,
            m.mode,
            d,
            null
          ), o.return = m, o;
        if (typeof o.then == "function")
          return E(m, jn(o), d);
        if (o.$$typeof === Gl)
          return E(
            m,
            Bn(m, o),
            d
          );
        Zn(m, o);
      }
      return null;
    }
    function y(m, o, d, T) {
      var A = o !== null ? o.key : null;
      if (typeof d == "string" && d !== "" || typeof d == "number" || typeof d == "bigint")
        return A !== null ? null : c(m, o, "" + d, T);
      if (typeof d == "object" && d !== null) {
        switch (d.$$typeof) {
          case Bl:
            return d.key === A ? i(m, o, d, T) : null;
          case Il:
            return d.key === A ? s(m, o, d, T) : null;
          case al:
            return d = fa(d), y(m, o, d, T);
        }
        if (ll(d) || C(d))
          return A !== null ? null : r(m, o, d, T, null);
        if (typeof d.then == "function")
          return y(
            m,
            o,
            jn(d),
            T
          );
        if (d.$$typeof === Gl)
          return y(
            m,
            o,
            Bn(m, d),
            T
          );
        Zn(m, d);
      }
      return null;
    }
    function h(m, o, d, T, A) {
      if (typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint")
        return m = m.get(d) || null, c(o, m, "" + T, A);
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case Bl:
            return m = m.get(
              T.key === null ? d : T.key
            ) || null, i(o, m, T, A);
          case Il:
            return m = m.get(
              T.key === null ? d : T.key
            ) || null, s(o, m, T, A);
          case al:
            return T = fa(T), h(
              m,
              o,
              d,
              T,
              A
            );
        }
        if (ll(T) || C(T))
          return m = m.get(d) || null, r(o, m, T, A, null);
        if (typeof T.then == "function")
          return h(
            m,
            o,
            d,
            jn(T),
            A
          );
        if (T.$$typeof === Gl)
          return h(
            m,
            o,
            d,
            Bn(o, T),
            A
          );
        Zn(o, T);
      }
      return null;
    }
    function _(m, o, d, T) {
      for (var A = null, $ = null, D = o, Y = o = 0, Rl = null; D !== null && Y < d.length; Y++) {
        D.index > Y ? (Rl = D, D = null) : Rl = D.sibling;
        var W = y(
          m,
          D,
          d[Y],
          T
        );
        if (W === null) {
          D === null && (D = Rl);
          break;
        }
        l && D && W.alternate === null && t(m, D), o = n(W, o, Y), $ === null ? A = W : $.sibling = W, $ = W, D = Rl;
      }
      if (Y === d.length)
        return u(m, D), L && fu(m, Y), A;
      if (D === null) {
        for (; Y < d.length; Y++)
          D = E(m, d[Y], T), D !== null && (o = n(
            D,
            o,
            Y
          ), $ === null ? A = D : $.sibling = D, $ = D);
        return L && fu(m, Y), A;
      }
      for (D = a(D); Y < d.length; Y++)
        Rl = h(
          D,
          m,
          Y,
          d[Y],
          T
        ), Rl !== null && (l && (W = Rl.alternate, W !== null && D.delete(W.key === null ? Y : W.key)), o = n(
          Rl,
          o,
          Y
        ), $ === null ? A = Rl : $.sibling = Rl, $ = Rl);
      return l && D.forEach(function(Lu) {
        return t(m, Lu);
      }), L && fu(m, Y), A;
    }
    function N(m, o, d, T) {
      if (d == null) throw Error(g(151));
      for (var A = null, $ = null, D = o, Y = o = 0, Rl = null, W = d.next(); D !== null && !W.done; Y++, W = d.next()) {
        D.index > Y ? (Rl = D, D = null) : Rl = D.sibling;
        var Lu = y(m, D, W.value, T);
        if (Lu === null) {
          D === null && (D = Rl);
          break;
        }
        l && D && Lu.alternate === null && t(m, D), o = n(Lu, o, Y), $ === null ? A = Lu : $.sibling = Lu, $ = Lu, D = Rl;
      }
      if (W.done)
        return u(m, D), L && fu(m, Y), A;
      if (D === null) {
        for (; !W.done; Y++, W = d.next())
          W = E(m, W.value, T), W !== null && (o = n(W, o, Y), $ === null ? A = W : $.sibling = W, $ = W);
        return L && fu(m, Y), A;
      }
      for (D = a(D); !W.done; Y++, W = d.next())
        W = h(D, m, Y, W.value, T), W !== null && (l && (Rl = W.alternate, Rl !== null && D.delete(
          Rl.key === null ? Y : Rl.key
        )), o = n(W, o, Y), $ === null ? A = W : $.sibling = W, $ = W);
      return l && D.forEach(function(ch) {
        return t(m, ch);
      }), L && fu(m, Y), A;
    }
    function p(m, o, d, T) {
      if (typeof d == "object" && d !== null && d.type === Hl && d.key === null && d.props.ref === void 0 && (d = d.props.children), typeof d == "object" && d !== null) {
        switch (d.$$typeof) {
          case Bl:
            l: {
              for (var A = d.key; o !== null; ) {
                if (o.key === A) {
                  if (A = d.type, A === Hl) {
                    if (o.tag === 7) {
                      u(
                        m,
                        o.sibling
                      ), T = e(
                        o,
                        d.props.children
                      ), Au(T, d), T.return = m, m = T;
                      break l;
                    }
                  } else if (o.elementType === A || typeof A == "object" && A !== null && A.$$typeof === al && fa(A) === o.type) {
                    u(
                      m,
                      o.sibling
                    ), T = e(o, d.props), Au(T, d), T.return = m, m = T;
                    break l;
                  }
                  u(m, o);
                  break;
                } else t(m, o);
                o = o.sibling;
              }
              d.type === Hl ? (T = Pu(
                d.props.children,
                m.mode,
                T,
                d.key
              ), Au(T, d), T.return = m, m = T) : (T = Un(
                d.type,
                d.key,
                d.props,
                null,
                m.mode,
                T
              ), Au(T, d), T.return = m, m = T);
            }
            return f(m);
          case Il:
            l: {
              for (A = d.key; o !== null; ) {
                if (o.key === A)
                  if (o.tag === 4 && o.stateNode.containerInfo === d.containerInfo && o.stateNode.implementation === d.implementation) {
                    u(
                      m,
                      o.sibling
                    ), T = e(o, d.children || []), T.return = m, m = T;
                    break l;
                  } else {
                    u(m, o);
                    break;
                  }
                else t(m, o);
                o = o.sibling;
              }
              T = bc(d, m.mode, T), T.return = m, m = T;
            }
            return f(m);
          case al:
            return d = fa(d), p(
              m,
              o,
              d,
              T
            );
        }
        if (ll(d))
          return _(
            m,
            o,
            d,
            T
          );
        if (C(d)) {
          if (A = C(d), typeof A != "function") throw Error(g(150));
          return d = A.call(d), N(
            m,
            o,
            d,
            T
          );
        }
        if (typeof d.then == "function")
          return p(
            m,
            o,
            jn(d),
            T
          );
        if (d.$$typeof === Gl)
          return p(
            m,
            o,
            Bn(m, d),
            T
          );
        Zn(m, d);
      }
      return typeof d == "string" && d !== "" || typeof d == "number" || typeof d == "bigint" ? (d = "" + d, o !== null && o.tag === 6 ? (u(m, o.sibling), T = e(o, d), T.return = m, m = T) : (u(m, o), T = zc(d, m.mode, T), T.return = m, m = T), f(m)) : u(m, o);
    }
    return function(m, o, d, T) {
      try {
        De = 0;
        var A = p(
          m,
          o,
          d,
          T
        );
        return Ga = null, A;
      } catch (D) {
        if (D === Ba || D === Xn) throw D;
        var $ = ft(29, D, null, m.mode);
        return $.lanes = T, $.return = m, $;
      }
    };
  }
  var ia = $o(!0), Fo = $o(!1), Nu = !1;
  function Hc(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Yc(l, t) {
    l = l.updateQueue, t.updateQueue === l && (t.updateQueue = {
      baseState: l.baseState,
      firstBaseUpdate: l.firstBaseUpdate,
      lastBaseUpdate: l.lastBaseUpdate,
      shared: l.shared,
      callbacks: null
    });
  }
  function Mu(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function Du(l, t, u) {
    var a = l.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (tl & 2) !== 0) {
      var e = a.pending;
      return e === null ? t.next = t : (t.next = e.next, e.next = t), a.pending = t, t = Dn(l), Ho(l, null, u), t;
    }
    return Mn(l, a, t, u), Dn(l);
  }
  function Ue(l, t, u) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (u & 4194048) !== 0)) {
      var a = t.lanes;
      a &= l.pendingLanes, u |= a, t.lanes = u, B0(l, u);
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
  var Bc = !1;
  function Ce() {
    if (Bc) {
      var l = qa;
      if (l !== null) throw l;
    }
  }
  function Re(l, t, u, a) {
    Bc = !1;
    var e = l.updateQueue;
    Nu = !1;
    var n = e.firstBaseUpdate, f = e.lastBaseUpdate, c = e.shared.pending;
    if (c !== null) {
      e.shared.pending = null;
      var i = c, s = i.next;
      i.next = null, f === null ? n = s : f.next = s, f = i;
      var r = l.alternate;
      r !== null && (r = r.updateQueue, c = r.lastBaseUpdate, c !== f && (c === null ? r.firstBaseUpdate = s : c.next = s, r.lastBaseUpdate = i));
    }
    if (n !== null) {
      var E = e.baseState;
      f = 0, r = s = i = null, c = n;
      do {
        var y = c.lane & -536870913, h = y !== c.lane;
        if (h ? (w & y) === y : (a & y) === y) {
          y !== 0 && y === ea && (Bc = !0), r !== null && (r = r.next = {
            lane: 0,
            tag: c.tag,
            payload: c.payload,
            callback: null,
            next: null
          });
          l: {
            var _ = l, N = c;
            y = t;
            var p = u;
            switch (N.tag) {
              case 1:
                if (_ = N.payload, typeof _ == "function") {
                  E = _.call(p, E, y);
                  break l;
                }
                E = _;
                break l;
              case 3:
                _.flags = _.flags & -65537 | 128;
              case 0:
                if (_ = N.payload, y = typeof _ == "function" ? _.call(p, E, y) : _, y == null) break l;
                E = Z({}, E, y);
                break l;
              case 2:
                Nu = !0;
            }
          }
          y = c.callback, y !== null && (l.flags |= 64, h && (l.flags |= 8192), h = e.callbacks, h === null ? e.callbacks = [y] : h.push(y));
        } else
          h = {
            lane: y,
            tag: c.tag,
            payload: c.payload,
            callback: c.callback,
            next: null
          }, r === null ? (s = r = h, i = E) : r = r.next = h, f |= y;
        if (c = c.next, c === null) {
          if (c = e.shared.pending, c === null)
            break;
          h = c, c = h.next, h.next = null, e.lastBaseUpdate = h, e.shared.pending = null;
        }
      } while (!0);
      r === null && (i = E), e.baseState = i, e.firstBaseUpdate = s, e.lastBaseUpdate = r, n === null && (e.shared.lanes = 0), Bu |= f, l.lanes = f, l.memoizedState = E;
    }
  }
  function Wo(l, t) {
    if (typeof l != "function")
      throw Error(g(191, l));
    l.call(t);
  }
  function Io(l, t) {
    var u = l.callbacks;
    if (u !== null)
      for (l.callbacks = null, l = 0; l < u.length; l++)
        Wo(u[l], t);
  }
  var Uu = jt(null), Vn = jt(0);
  function ko(l, t) {
    l = su, gl(Vn, l), gl(Uu, t), su = l | t.baseLanes;
  }
  function Gc() {
    gl(Vn, su), gl(Uu, Uu.current);
  }
  function Xc() {
    su = Vn.current, pl(Uu), pl(Vn);
  }
  var Kl = jt(null), kl = null;
  function Cu(l) {
    var t = l.alternate;
    gl(Jl, Jl.current & 1), gl(Kl, l), kl === null && (t === null || Uu.current !== null || t.memoizedState !== null) && (kl = l);
  }
  function Qc(l) {
    gl(Jl, Jl.current), gl(Kl, l), kl === null && (kl = l);
  }
  function Po(l) {
    l.tag === 22 ? (gl(Jl, Jl.current), gl(Kl, l), kl === null && (kl = l)) : Ru();
  }
  function Ru() {
    gl(Jl, Jl.current), gl(Kl, Kl.current);
  }
  function rt(l) {
    pl(Kl), kl === l && (kl = null), pl(Jl);
  }
  var Jl = jt(0);
  function He(l, t) {
    gl(Kl, Kl.current), gl(Jl, t);
  }
  function jc(l) {
    pl(Jl), pl(Kl), kl === l && (kl = null);
  }
  function pn(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var u = t.memoizedState;
        if (u !== null && (u = u.dehydrated, u === null || c0(u) || i0(u)))
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
  var ou = 0, V = null, ml = null, Ul = null, xn = !1, Xa = !1, oa = !1, Ln = 0, Ye = 0, Qa = null, Dd = 0;
  function Al() {
    throw Error(g(321));
  }
  function Zc(l, t) {
    if (t === null) return !1;
    for (var u = 0; u < t.length && u < l.length; u++)
      if (!gt(l[u], t[u])) return !1;
    return !0;
  }
  function Vc(l, t, u, a, e, n) {
    return ou = n, V = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, M.H = l === null || l.memoizedState === null ? Gv : Xv, oa = !1, n = u(a, e), oa = !1, Xa && (n = tv(
      t,
      u,
      a,
      e
    )), lv(l), n;
  }
  function lv(l) {
    M.H = In;
    var t = ml !== null && ml.next !== null;
    if (ou = 0, Ul = ml = V = null, xn = !1, Ye = 0, Qa = null, t) throw Error(g(300));
    l === null || Cl || (l = l.dependencies, l !== null && qn(l) && (Cl = !0));
  }
  function tv(l, t, u, a) {
    V = l;
    var e = 0;
    do {
      if (Xa && (Qa = null), Ye = 0, Xa = !1, 25 <= e) throw Error(g(301));
      if (e += 1, Ul = ml = null, l.updateQueue != null) {
        var n = l.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      M.H = Gd, n = t(u, a);
    } while (Xa);
    return n;
  }
  function Ud() {
    var l = M.H, t = l.useState()[0];
    return t = typeof t.then == "function" ? qe(t) : t, l = l.useState()[0], (ml !== null ? ml.memoizedState : null) !== l && (V.flags |= 1024), t;
  }
  function pc() {
    var l = Ln !== 0;
    return Ln = 0, l;
  }
  function xc(l, t, u) {
    t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~u;
  }
  function Lc(l) {
    if (xn) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        t !== null && (t.pending = null), l = l.next;
      }
      xn = !1;
    }
    ou = 0, Ul = ml = V = null, Xa = !1, Ye = Ln = 0, Qa = null;
  }
  function tt() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ul === null ? V.memoizedState = Ul = l : Ul = Ul.next = l, Ul;
  }
  function Ml() {
    if (ml === null) {
      var l = V.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = ml.next;
    var t = Ul === null ? V.memoizedState : Ul.next;
    if (t !== null)
      Ul = t, ml = l;
    else {
      if (l === null)
        throw V.alternate === null ? Error(g(467)) : Error(g(310));
      ml = l, l = {
        memoizedState: ml.memoizedState,
        baseState: ml.baseState,
        baseQueue: ml.baseQueue,
        queue: ml.queue,
        next: null
      }, Ul === null ? V.memoizedState = Ul = l : Ul = Ul.next = l;
    }
    return Ul;
  }
  function Kn() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function qe(l) {
    var t = Ye;
    return Ye += 1, Qa === null && (Qa = []), l = Ko(Qa, l, t), t = V, (Ul === null ? t.memoizedState : Ul.next) === null && (t = t.alternate, M.H = t === null || t.memoizedState === null ? Gv : Xv), l;
  }
  function Jn(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return qe(l);
      if (l.$$typeof === z) return;
      if (l.$$typeof === Gl) return Ll(l);
    }
    throw Error(g(438, String(l)));
  }
  function Kc(l) {
    var t = null, u = V.updateQueue;
    if (u !== null && (t = u.memoCache), t == null) {
      var a = V.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
        data: a.data.map(function(e) {
          return e.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), u === null && (u = Kn(), V.updateQueue = u), u.memoCache = t, u = t.data[t.index], u === void 0)
      for (u = t.data[t.index] = Array(l), a = 0; a < l; a++)
        u[a] = Ju;
    return t.index++, u;
  }
  function vu(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function wn(l) {
    var t = Ml();
    return Jc(t, ml, l);
  }
  function Jc(l, t, u) {
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
      var c = f = null, i = null, s = t, r = !1;
      do {
        var E = s.lane & -536870913;
        if (E !== s.lane ? (w & E) === E : (ou & E) === E) {
          var y = s.revertLane;
          if (y === 0)
            i !== null && (i = i.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: s.action,
              hasEagerState: s.hasEagerState,
              eagerState: s.eagerState,
              next: null
            }), E === ea && (r = !0);
          else if ((ou & y) === y) {
            s = s.next, y === ea && (r = !0);
            continue;
          } else
            E = {
              lane: 0,
              revertLane: s.revertLane,
              gesture: null,
              action: s.action,
              hasEagerState: s.hasEagerState,
              eagerState: s.eagerState,
              next: null
            }, i === null ? (c = i = E, f = n) : i = i.next = E, V.lanes |= y, Bu |= y;
          E = s.action, oa && u(n, E), n = s.hasEagerState ? s.eagerState : u(n, E);
        } else
          y = {
            lane: E,
            revertLane: s.revertLane,
            gesture: s.gesture,
            action: s.action,
            hasEagerState: s.hasEagerState,
            eagerState: s.eagerState,
            next: null
          }, i === null ? (c = i = y, f = n) : i = i.next = y, V.lanes |= E, Bu |= E;
        s = s.next;
      } while (s !== null && s !== t);
      if (i === null ? f = n : i.next = c, !gt(n, l.memoizedState) && (Cl = !0, r && (u = qa, u !== null)))
        throw u;
      l.memoizedState = n, l.baseState = f, l.baseQueue = i, a.lastRenderedState = n;
    }
    return e === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
  }
  function wc(l) {
    var t = Ml(), u = t.queue;
    if (u === null) throw Error(g(311));
    u.lastRenderedReducer = l;
    var a = u.dispatch, e = u.pending, n = t.memoizedState;
    if (e !== null) {
      u.pending = null;
      var f = e = e.next;
      do
        n = l(n, f.action), f = f.next;
      while (f !== e);
      gt(n, t.memoizedState) || (Cl = !0), t.memoizedState = n, t.baseQueue === null && (t.baseState = n), u.lastRenderedState = n;
    }
    return [n, a];
  }
  function uv(l, t, u) {
    var a = V, e = Ml(), n = L;
    if (n) {
      if (u === void 0) throw Error(g(407));
      u = u();
    } else u = t();
    var f = !gt(
      (ml || e).memoizedState,
      u
    );
    if (f && (e.memoizedState = u, Cl = !0), e = e.queue, Wc(nv.bind(null, a, e, l), [
      l
    ]), l = e.getSnapshot !== t || f || Ul !== null && (Ul.memoizedState.tag & 1) !== 0, ja(
      l ? 9 : 8,
      { destroy: void 0 },
      ev.bind(null, a, e, u, t),
      null
    ), l) {
      if (a.flags |= 2048, hl === null) throw Error(g(349));
      n || (ou & 127) !== 0 || av(a, t, u);
    }
    return u;
  }
  function av(l, t, u) {
    l.flags |= 16384, l = { getSnapshot: t, value: u }, t = V.updateQueue, t === null ? (t = Kn(), V.updateQueue = t, t.stores = [l]) : (u = t.stores, u === null ? t.stores = [l] : u.push(l));
  }
  function ev(l, t, u, a) {
    t.value = u, t.getSnapshot = a, fv(t) && cv(l);
  }
  function nv(l, t, u) {
    return u(function() {
      fv(t) && cv(l);
    });
  }
  function fv(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var u = t();
      return !gt(l, u);
    } catch {
      return !0;
    }
  }
  function cv(l) {
    var t = ku(l, 2);
    t !== null && vt(t, l, 2);
  }
  function $c(l) {
    var t = tt();
    if (typeof l == "function") {
      var u = l;
      if (l = u(), oa) {
        Su(!0);
        try {
          u();
        } finally {
          Su(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = l, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: vu,
      lastRenderedState: l
    }, t;
  }
  function iv(l, t, u, a) {
    return l.baseState = u, Jc(
      l,
      ml,
      typeof a == "function" ? a : vu
    );
  }
  function Cd(l, t, u, a, e) {
    if (Wn(l)) throw Error(g(485));
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
      M.T !== null ? u(!0) : n.isTransition = !1, a(n), u = t.pending, u === null ? (n.next = t.pending = n, ov(t, n)) : (n.next = u.next, t.pending = u.next = n);
    }
  }
  function ov(l, t) {
    var u = t.action, a = t.payload, e = l.state;
    if (t.isTransition) {
      var n = M.T, f = {};
      f.types = n !== null ? n.types : null, M.T = f;
      try {
        var c = u(e, a), i = M.S;
        i !== null && i(f, c), vv(l, t, c);
      } catch (s) {
        Fc(l, t, s);
      } finally {
        n !== null && f.types !== null && (n.types = f.types), M.T = n;
      }
    } else
      try {
        n = u(e, a), vv(l, t, n);
      } catch (s) {
        Fc(l, t, s);
      }
  }
  function vv(l, t, u) {
    u !== null && typeof u == "object" && typeof u.then == "function" ? u.then(
      function(a) {
        yv(l, t, a);
      },
      function(a) {
        return Fc(l, t, a);
      }
    ) : yv(l, t, u);
  }
  function yv(l, t, u) {
    t.status = "fulfilled", t.value = u, mv(t), l.state = u, t = l.pending, t !== null && (u = t.next, u === t ? l.pending = null : (u = u.next, t.next = u, ov(l, u)));
  }
  function Fc(l, t, u) {
    var a = l.pending;
    if (l.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = u, mv(t), t = t.next;
      while (t !== a);
    }
    l.action = null;
  }
  function mv(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function sv(l, t) {
    return t;
  }
  function dv(l, t) {
    if (L) {
      var u = hl.formState;
      if (u !== null) {
        l: {
          var a = V;
          if (L) {
            if (rl) {
              t: {
                for (var e = rl, n = Dt; e.nodeType !== 8; ) {
                  if (!n) {
                    e = null;
                    break t;
                  }
                  if (e = Ct(
                    e.nextSibling
                  ), e === null) {
                    e = null;
                    break t;
                  }
                }
                n = e.data, e = n === "F!" || n === "F" ? e : null;
              }
              if (e) {
                rl = Ct(
                  e.nextSibling
                ), a = e.data === "F!";
                break l;
              }
            }
            _u(a);
          }
          a = !1;
        }
        a && (t = u[0]);
      }
    }
    return u = tt(), u.memoizedState = u.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: sv,
      lastRenderedState: t
    }, u.queue = a, u = Yv.bind(
      null,
      V,
      a
    ), a.dispatch = u, a = $c(!1), n = ti.bind(
      null,
      V,
      !1,
      a.queue
    ), a = tt(), e = {
      state: t,
      dispatch: null,
      action: l,
      pending: null
    }, a.queue = e, u = Cd.bind(
      null,
      V,
      e,
      n,
      u
    ), e.dispatch = u, a.memoizedState = l, [t, u, !1];
  }
  function hv(l) {
    var t = Ml();
    return gv(t, ml, l);
  }
  function gv(l, t, u) {
    if (t = Jc(
      l,
      t,
      sv
    )[0], l = wn(vu)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = qe(t);
      } catch (f) {
        throw f === Ba ? Xn : f;
      }
    else a = t;
    t = Ml();
    var e = t.queue, n = e.dispatch;
    return u !== t.memoizedState && (V.flags |= 2048, ja(
      9,
      { destroy: void 0 },
      Rd.bind(null, e, u),
      null
    )), [a, n, l];
  }
  function Rd(l, t) {
    l.action = t;
  }
  function rv(l) {
    var t = Ml(), u = ml;
    if (u !== null)
      return gv(t, u, l);
    Ml(), t = t.memoizedState, u = Ml();
    var a = u.queue.dispatch;
    return u.memoizedState = l, [t, a, !1];
  }
  function ja(l, t, u, a) {
    return l = { tag: l, create: u, deps: a, inst: t, next: null }, t = V.updateQueue, t === null && (t = Kn(), V.updateQueue = t), u = t.lastEffect, u === null ? t.lastEffect = l.next = l : (a = u.next, u.next = l, l.next = a, t.lastEffect = l), l;
  }
  function Sv() {
    return Ml().memoizedState;
  }
  function $n(l, t, u, a) {
    var e = tt();
    V.flags |= l, e.memoizedState = ja(
      1 | t,
      { destroy: void 0 },
      u,
      a === void 0 ? null : a
    );
  }
  function Fn(l, t, u, a) {
    var e = Ml();
    a = a === void 0 ? null : a;
    var n = e.memoizedState.inst;
    ml !== null && a !== null && Zc(a, ml.memoizedState.deps) ? e.memoizedState = ja(t, n, u, a) : (V.flags |= l, e.memoizedState = ja(
      1 | t,
      n,
      u,
      a
    ));
  }
  function Tv(l, t) {
    $n(8390656, 8, l, t);
  }
  function Wc(l, t) {
    Fn(2048, 8, l, t);
  }
  function Hd(l) {
    V.flags |= 4;
    var t = V.updateQueue;
    if (t === null)
      t = Kn(), V.updateQueue = t, t.events = [l];
    else {
      var u = t.events;
      u === null ? t.events = [l] : u.push(l);
    }
  }
  function Ev(l) {
    var t = Ml().memoizedState;
    return Hd({ ref: t, nextImpl: l }), function() {
      if ((tl & 2) !== 0) throw Error(g(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function zv(l, t) {
    return Fn(4, 2, l, t);
  }
  function bv(l, t) {
    return Fn(4, 4, l, t);
  }
  function _v(l, t) {
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
  function Ov(l, t, u) {
    u = u != null ? u.concat([l]) : null, Fn(4, 4, _v.bind(null, t, l), u);
  }
  function Ic() {
  }
  function Av(l, t) {
    var u = Ml();
    t = t === void 0 ? null : t;
    var a = u.memoizedState;
    return t !== null && Zc(t, a[1]) ? a[0] : (u.memoizedState = [l, t], l);
  }
  function Nv(l, t) {
    var u = Ml();
    t = t === void 0 ? null : t;
    var a = u.memoizedState;
    if (t !== null && Zc(t, a[1]))
      return a[0];
    if (a = l(), oa) {
      Su(!0);
      try {
        l();
      } finally {
        Su(!1);
      }
    }
    return u.memoizedState = [a, t], a;
  }
  function kc(l, t, u) {
    return u === void 0 || (ou & 1073741824) !== 0 && (w & 261930) === 0 ? l.memoizedState = t : (l.memoizedState = u, l = Gy(), V.lanes |= l, Bu |= l, u);
  }
  function Mv(l, t, u, a) {
    return gt(u, t) ? u : Uu.current !== null ? (l = kc(l, u, a), gt(l, t) || (Cl = !0), l) : (ou & 106) === 0 || (ou & 1073741824) !== 0 && (w & 261930) === 0 ? (Cl = !0, l.memoizedState = u) : (l = Gy(), V.lanes |= l, Bu |= l, t);
  }
  function Dv(l, t, u, a, e) {
    var n = Q.p;
    Q.p = n !== 0 && 8 > n ? n : 8;
    var f = M.T, c = {};
    c.types = f !== null ? f.types : null, M.T = c, ti(l, !1, t, u);
    try {
      var i = e(), s = M.S;
      if (s !== null && s(c, i), i !== null && typeof i == "object" && typeof i.then == "function") {
        var r = Md(
          i,
          a
        );
        Be(
          l,
          t,
          r,
          zt(l)
        );
      } else
        Be(
          l,
          t,
          a,
          zt(l)
        );
    } catch (E) {
      Be(
        l,
        t,
        { then: function() {
        }, status: "rejected", reason: E },
        zt()
      );
    } finally {
      Q.p = n, f !== null && c.types !== null && (f.types = c.types), M.T = f;
    }
  }
  function Yd() {
  }
  function Pc(l, t, u, a) {
    if (l.tag !== 5) throw Error(g(476));
    var e = Uv(l).queue;
    Dv(
      l,
      e,
      t,
      Pt,
      u === null ? Yd : function() {
        return Cv(l), u(a);
      }
    );
  }
  function Uv(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: Pt,
      baseState: Pt,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: vu,
        lastRenderedState: Pt
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
        lastRenderedReducer: vu,
        lastRenderedState: u
      },
      next: null
    }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
  }
  function Cv(l) {
    var t = Uv(l);
    t.next === null && (t = l.alternate.memoizedState), Be(
      l,
      t.next.queue,
      {},
      zt()
    );
  }
  function li() {
    return Ll(ee);
  }
  function Rv() {
    return Ml().memoizedState;
  }
  function Hv() {
    return Ml().memoizedState;
  }
  function qd(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var u = zt();
          l = Mu(u);
          var a = Du(t, l, u);
          a !== null && (vt(a, t, u), Ue(a, t, u)), t = { cache: Dc() }, l.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Bd(l, t, u) {
    var a = zt();
    u = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: u,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Wn(l) ? qv(t, u) : (u = Tc(l, t, u, a), u !== null && (vt(u, l, a), Bv(u, t, a)));
  }
  function Yv(l, t, u) {
    var a = zt();
    Be(l, t, u, a);
  }
  function Be(l, t, u, a) {
    var e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: u,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Wn(l)) qv(t, e);
    else {
      var n = l.alternate;
      if (l.lanes === 0 && (n === null || n.lanes === 0) && (n = t.lastRenderedReducer, n !== null))
        try {
          var f = t.lastRenderedState, c = n(f, u);
          if (e.hasEagerState = !0, e.eagerState = c, gt(c, f))
            return Mn(l, t, e, 0), hl === null && Nn(), !1;
        } catch {
        }
      if (u = Tc(l, t, e, a), u !== null)
        return vt(u, l, a), Bv(u, t, a), !0;
    }
    return !1;
  }
  function ti(l, t, u, a) {
    if (a = {
      lane: 2,
      revertLane: Ki(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Wn(l)) {
      if (t) throw Error(g(479));
    } else
      t = Tc(
        l,
        u,
        a,
        2
      ), t !== null && vt(t, l, 2);
  }
  function Wn(l) {
    var t = l.alternate;
    return l === V || t !== null && t === V;
  }
  function qv(l, t) {
    Xa = xn = !0;
    var u = l.pending;
    u === null ? t.next = t : (t.next = u.next, u.next = t), l.pending = t;
  }
  function Bv(l, t, u) {
    if ((u & 4194048) !== 0) {
      var a = t.lanes;
      a &= l.pendingLanes, u |= a, t.lanes = u, B0(l, u);
    }
  }
  var In = {
    readContext: Ll,
    use: Jn,
    useCallback: Al,
    useContext: Al,
    useEffect: Al,
    useImperativeHandle: Al,
    useLayoutEffect: Al,
    useInsertionEffect: Al,
    useMemo: Al,
    useReducer: Al,
    useRef: Al,
    useState: Al,
    useDebugValue: Al,
    useDeferredValue: Al,
    useTransition: Al,
    useSyncExternalStore: Al,
    useId: Al,
    useHostTransitionStatus: Al,
    useFormState: Al,
    useActionState: Al,
    useOptimistic: Al,
    useMemoCache: Al,
    useCacheRefresh: Al,
    useEffectEvent: Al
  }, Gv = {
    readContext: Ll,
    use: Jn,
    useCallback: function(l, t) {
      return tt().memoizedState = [
        l,
        t === void 0 ? null : t
      ], l;
    },
    useContext: Ll,
    useEffect: Tv,
    useImperativeHandle: function(l, t, u) {
      u = u != null ? u.concat([l]) : null, $n(
        4194308,
        4,
        _v.bind(null, t, l),
        u
      );
    },
    useLayoutEffect: function(l, t) {
      return $n(4194308, 4, l, t);
    },
    useInsertionEffect: function(l, t) {
      $n(4, 2, l, t);
    },
    useMemo: function(l, t) {
      var u = tt();
      t = t === void 0 ? null : t;
      var a = l();
      if (oa) {
        Su(!0);
        try {
          l();
        } finally {
          Su(!1);
        }
      }
      return u.memoizedState = [a, t], a;
    },
    useReducer: function(l, t, u) {
      var a = tt();
      if (u !== void 0) {
        var e = u(t);
        if (oa) {
          Su(!0);
          try {
            u(t);
          } finally {
            Su(!1);
          }
        }
      } else e = t;
      return a.memoizedState = a.baseState = e, l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: e
      }, a.queue = l, l = l.dispatch = Bd.bind(
        null,
        V,
        l
      ), [a.memoizedState, l];
    },
    useRef: function(l) {
      var t = tt();
      return l = { current: l }, t.memoizedState = l;
    },
    useState: function(l) {
      l = $c(l);
      var t = l.queue, u = Yv.bind(null, V, t);
      return t.dispatch = u, [l.memoizedState, u];
    },
    useDebugValue: Ic,
    useDeferredValue: function(l, t) {
      var u = tt();
      return kc(u, l, t);
    },
    useTransition: function() {
      var l = $c(!1);
      return l = Dv.bind(
        null,
        V,
        l.queue,
        !0,
        !1
      ), tt().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, t, u) {
      var a = V, e = tt();
      if (L) {
        if (u === void 0)
          throw Error(g(407));
        u = u();
      } else {
        if (u = t(), hl === null)
          throw Error(g(349));
        (w & 127) !== 0 || av(a, t, u);
      }
      e.memoizedState = u;
      var n = { value: u, getSnapshot: t };
      return e.queue = n, Tv(nv.bind(null, a, n, l), [
        l
      ]), a.flags |= 2048, ja(
        9,
        { destroy: void 0 },
        ev.bind(
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
      var l = tt(), t = hl.identifierPrefix;
      if (L) {
        var u = xt, a = pt;
        u = (a & ~(1 << 32 - dt(a) - 1)).toString(32) + u, t = "_" + t + "R_" + u, u = Ln++, 0 < u && (t += "H" + u.toString(32)), t += "_";
      } else
        u = Dd++, t = "_" + t + "r_" + u.toString(32) + "_";
      return l.memoizedState = t;
    },
    useHostTransitionStatus: li,
    useFormState: dv,
    useActionState: dv,
    useOptimistic: function(l) {
      var t = tt();
      t.memoizedState = t.baseState = l;
      var u = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = u, t = ti.bind(
        null,
        V,
        !0,
        u
      ), u.dispatch = t, [l, t];
    },
    useMemoCache: Kc,
    useCacheRefresh: function() {
      return tt().memoizedState = qd.bind(
        null,
        V
      );
    },
    useEffectEvent: function(l) {
      var t = tt(), u = { impl: l };
      return t.memoizedState = u, function() {
        if ((tl & 2) !== 0)
          throw Error(g(440));
        return u.impl.apply(void 0, arguments);
      };
    }
  }, Xv = {
    readContext: Ll,
    use: Jn,
    useCallback: Av,
    useContext: Ll,
    useEffect: Wc,
    useImperativeHandle: Ov,
    useInsertionEffect: zv,
    useLayoutEffect: bv,
    useMemo: Nv,
    useReducer: wn,
    useRef: Sv,
    useState: function() {
      return wn(vu);
    },
    useDebugValue: Ic,
    useDeferredValue: function(l, t) {
      var u = Ml();
      return Mv(
        u,
        ml.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = wn(vu)[0], t = Ml().memoizedState;
      return [
        typeof l == "boolean" ? l : qe(l),
        t
      ];
    },
    useSyncExternalStore: uv,
    useId: Rv,
    useHostTransitionStatus: li,
    useFormState: hv,
    useActionState: hv,
    useOptimistic: function(l, t) {
      var u = Ml();
      return iv(u, ml, l, t);
    },
    useMemoCache: Kc,
    useCacheRefresh: Hv,
    useEffectEvent: Ev
  }, Gd = {
    readContext: Ll,
    use: Jn,
    useCallback: Av,
    useContext: Ll,
    useEffect: Wc,
    useImperativeHandle: Ov,
    useInsertionEffect: zv,
    useLayoutEffect: bv,
    useMemo: Nv,
    useReducer: wc,
    useRef: Sv,
    useState: function() {
      return wc(vu);
    },
    useDebugValue: Ic,
    useDeferredValue: function(l, t) {
      var u = Ml();
      return ml === null ? kc(u, l, t) : Mv(
        u,
        ml.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = wc(vu)[0], t = Ml().memoizedState;
      return [
        typeof l == "boolean" ? l : qe(l),
        t
      ];
    },
    useSyncExternalStore: uv,
    useId: Rv,
    useHostTransitionStatus: li,
    useFormState: rv,
    useActionState: rv,
    useOptimistic: function(l, t) {
      var u = Ml();
      return ml !== null ? iv(u, ml, l, t) : (u.baseState = l, [l, u.queue.dispatch]);
    },
    useMemoCache: Kc,
    useCacheRefresh: Hv,
    useEffectEvent: Ev
  };
  function ui(l, t, u, a) {
    t = l.memoizedState, u = u(a, t), u = u == null ? t : Z({}, t, u), l.memoizedState = u, l.lanes === 0 && (l.updateQueue.baseState = u);
  }
  var ai = {
    enqueueSetState: function(l, t, u) {
      l = l._reactInternals;
      var a = zt(), e = Mu(a);
      e.payload = t, u != null && (e.callback = u), t = Du(l, e, a), t !== null && (vt(t, l, a), Ue(t, l, a));
    },
    enqueueReplaceState: function(l, t, u) {
      l = l._reactInternals;
      var a = zt(), e = Mu(a);
      e.tag = 1, e.payload = t, u != null && (e.callback = u), t = Du(l, e, a), t !== null && (vt(t, l, a), Ue(t, l, a));
    },
    enqueueForceUpdate: function(l, t) {
      l = l._reactInternals;
      var u = zt(), a = Mu(u);
      a.tag = 2, t != null && (a.callback = t), t = Du(l, a, u), t !== null && (vt(t, l, u), Ue(t, l, u));
    }
  };
  function Qv(l, t, u, a, e, n, f) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(a, n, f) : t.prototype && t.prototype.isPureReactComponent ? !ze(u, a) || !ze(e, n) : !0;
  }
  function jv(l, t, u, a) {
    l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(u, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(u, a), t.state !== l && ai.enqueueReplaceState(t, t.state, null);
  }
  function va(l, t) {
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
  function Zv(l) {
    An(l);
  }
  function Vv(l) {
    console.error(l);
  }
  function pv(l) {
    An(l);
  }
  function kn(l, t) {
    try {
      var u = l.onUncaughtError;
      u(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function xv(l, t, u) {
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
  function ei(l, t, u) {
    return u = Mu(u), u.tag = 3, u.payload = { element: null }, u.callback = function() {
      kn(l, t);
    }, u;
  }
  function Lv(l) {
    return l = Mu(l), l.tag = 3, l;
  }
  function Kv(l, t, u, a) {
    var e = u.type.getDerivedStateFromError;
    if (typeof e == "function") {
      var n = a.value;
      l.payload = function() {
        return e(n);
      }, l.callback = function() {
        xv(t, u, a);
      };
    }
    var f = u.stateNode;
    f !== null && typeof f.componentDidCatch == "function" && (l.callback = function() {
      xv(t, u, a), typeof e != "function" && (Gu === null ? Gu = /* @__PURE__ */ new Set([this]) : Gu.add(this));
      var c = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: c !== null ? c : ""
      });
    });
  }
  function Xd(l, t, u, a, e) {
    if (u.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = u.alternate, t !== null && ua(
        t,
        u,
        e,
        !0
      ), u = Kl.current, u !== null) {
        switch (u.tag) {
          case 31:
          case 13:
          case 19:
            return kl === null ? Ef() : u.alternate === null && Nl === 0 && (Nl = 3), u.flags &= -257, u.flags |= 65536, u.lanes = e, a === Qn ? u.flags |= 16384 : (t = u.updateQueue, t === null ? u.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), pi(l, a, e)), !1;
          case 22:
            return u.flags |= 65536, a === Qn ? u.flags |= 16384 : (t = u.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, u.updateQueue = t) : (u = t.retryQueue, u === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : u.add(a)), pi(l, a, e)), !1;
        }
        throw Error(g(435, u.tag));
      }
      return pi(l, a, e), Ef(), !1;
    }
    if (L)
      return t = Kl.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = e, a !== Oc && (l = Error(g(422), { cause: a }), Oe(At(l, u)))) : (a !== Oc && (t = Error(g(423), {
        cause: a
      }), Oe(
        At(t, u)
      )), l = l.current.alternate, l.flags |= 65536, e &= -e, l.lanes |= e, a = At(a, u), e = ei(
        l.stateNode,
        a,
        e
      ), qc(l, e), Nl !== 4 && (Nl = 2)), !1;
    var n = Error(g(520), { cause: a });
    if (n = At(n, u), xe === null ? xe = [n] : xe.push(n), Nl !== 4 && (Nl = 2), t === null) return !0;
    a = At(a, u), u = t;
    do {
      switch (u.tag) {
        case 3:
          return u.flags |= 65536, l = e & -e, u.lanes |= l, l = ei(u.stateNode, a, l), qc(u, l), !1;
        case 1:
          if (t = u.type, n = u.stateNode, (u.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (Gu === null || !Gu.has(n))))
            return u.flags |= 65536, e &= -e, u.lanes |= e, e = Lv(e), Kv(
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
  var ni = Error(g(461)), Cl = !1;
  function Yl(l, t, u, a) {
    t.child = l === null ? Fo(t, null, u, a) : ia(
      t,
      l.child,
      u,
      a
    );
  }
  function Jv(l, t, u, a, e) {
    u = u.render;
    var n = t.ref;
    if ("ref" in a) {
      var f = {};
      for (var c in a)
        c !== "ref" && (f[c] = a[c]);
    } else f = a;
    return aa(t), a = Vc(
      l,
      t,
      u,
      f,
      n,
      e
    ), c = pc(), l !== null && !Cl ? (xc(l, t, e), yu(l, t, e)) : (L && c && Rn(t), t.flags |= 1, Yl(l, t, a, e), t.child);
  }
  function wv(l, t, u, a, e) {
    if (l === null) {
      var n = u.type;
      return typeof n == "function" && !Ec(n) && n.defaultProps === void 0 && u.compare === null ? (t.tag = 15, t.type = n, $v(
        l,
        t,
        n,
        a,
        e
      )) : (l = Un(
        u.type,
        null,
        a,
        t,
        t.mode,
        e
      ), l.ref = t.ref, l.return = t, t.child = l);
    }
    if (n = l.child, !si(l, e)) {
      var f = n.memoizedProps;
      if (u = u.compare, u = u !== null ? u : ze, u(f, a) && l.ref === t.ref)
        return yu(l, t, e);
    }
    return t.flags |= 1, l = nu(n, a), l.ref = t.ref, l.return = t, t.child = l;
  }
  function $v(l, t, u, a, e) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (ze(n, a) && l.ref === t.ref)
        if (Cl = !1, t.pendingProps = a = n, si(l, e))
          (l.flags & 131072) !== 0 && (Cl = !0);
        else
          return t.lanes = l.lanes, yu(l, t, e);
    }
    return fi(
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
        ), n !== null ? ko(t, n) : Gc(), Po(t);
      else
        return a = t.lanes = 536870912, Wv(
          l,
          t,
          n !== null ? n.baseLanes | u : u,
          u,
          a
        );
    } else
      n !== null ? (Gn(t, n.cachePool), ko(t, n), Ru(), t.memoizedState = null) : (l !== null && Gn(t, null), Gc(), Ru());
    return Yl(l, t, e, u), t.child;
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
    var n = Cc();
    return n = n === null ? null : { parent: Dl._currentValue, pool: n }, t.memoizedState = {
      baseLanes: u,
      cachePool: n
    }, l !== null && Gn(t, null), Gc(), Po(t), l !== null && ua(l, t, a, !0), t.childLanes = e, null;
  }
  function Pn(l, t) {
    return t = lf(
      { mode: t.mode, children: t.children },
      l.mode
    ), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function Iv(l, t, u) {
    return ia(t, l.child, null, u), l = Pn(t, t.pendingProps), l.flags |= 2, rt(t), t.memoizedState = null, l;
  }
  function Qd(l, t, u) {
    var a = t.pendingProps, e = (t.flags & 128) !== 0;
    if (t.flags &= -129, l === null) {
      if (L) {
        if (a.mode === "hidden")
          return l = Pn(t, a), t.lanes = 536870912, l.memoizedState = { baseLanes: 0, cachePool: null }, Ge(null, l);
        if (Qc(t), (l = rl) ? (l = _m(
          l,
          Dt
        ), l = l !== null && l.data === "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: zu !== null ? { id: pt, overflow: xt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, u = qo(l), u.return = t, t.child = u, Ql = t, rl = null)) : l = null, l === null) throw _u(t);
        return t.lanes = 536870912, null;
      }
      return Pn(t, a);
    }
    var n = l.memoizedState;
    if (n !== null) {
      var f = n.dehydrated;
      if (Qc(t), e)
        if (t.flags & 256)
          t.flags &= -257, t = Iv(
            l,
            t,
            u
          );
        else if (t.memoizedState !== null)
          t.child = l.child, t.flags |= 128, t = null;
        else throw Error(g(558));
      else if (Cl || ua(l, t, u, !1), e = (u & l.childLanes) !== 0, Cl || e) {
        if (Uu.current === null) {
          if (a = hl, a !== null && (f = G0(a, u), f !== 0 && f !== n.retryLane))
            throw n.retryLane = f, ku(l, f), vt(a, l, f), ni;
          Ef();
        }
        t = Iv(
          l,
          t,
          u
        );
      } else
        l = n.treeContext, rl = Ct(f.nextSibling), Ql = t, L = !0, bu = null, Dt = !1, l !== null && Xo(t, l), t = Pn(t, a), t.flags |= 134221824;
      return t;
    }
    return l = nu(l.child, {
      mode: a.mode,
      children: a.children
    }), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function Za(l, t) {
    var u = t.ref;
    if (u === null)
      l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof u != "function" && typeof u != "object")
        throw Error(g(284));
      (l === null || l.ref !== u) && (t.flags |= 4194816);
    }
  }
  function fi(l, t, u, a, e) {
    return aa(t), u = Vc(
      l,
      t,
      u,
      a,
      void 0,
      e
    ), a = pc(), l !== null && !Cl ? (xc(l, t, e), yu(l, t, e)) : (L && a && Rn(t), t.flags |= 1, Yl(l, t, u, e), t.child);
  }
  function kv(l, t, u, a, e, n) {
    return aa(t), t.updateQueue = null, u = tv(
      t,
      a,
      u,
      e
    ), lv(l), a = pc(), l !== null && !Cl ? (xc(l, t, n), yu(l, t, n)) : (L && a && Rn(t), t.flags |= 1, Yl(l, t, u, n), t.child);
  }
  function Pv(l, t, u, a, e) {
    if (aa(t), t.stateNode === null) {
      var n = Ca, f = u.contextType;
      typeof f == "object" && f !== null && (n = Ll(f)), n = new u(a, n), t.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = ai, t.stateNode = n, n._reactInternals = t, n = t.stateNode, n.props = a, n.state = t.memoizedState, n.refs = {}, Hc(t), f = u.contextType, n.context = typeof f == "object" && f !== null ? Ll(f) : Ca, n.state = t.memoizedState, f = u.getDerivedStateFromProps, typeof f == "function" && (ui(
        t,
        u,
        f,
        a
      ), n.state = t.memoizedState), typeof u.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (f = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), f !== n.state && ai.enqueueReplaceState(n, n.state, null), Re(t, a, n, e), Ce(), n.state = t.memoizedState), typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (l === null) {
      n = t.stateNode;
      var c = t.memoizedProps, i = va(u, c);
      n.props = i;
      var s = n.context, r = u.contextType;
      f = Ca, typeof r == "object" && r !== null && (f = Ll(r));
      var E = u.getDerivedStateFromProps;
      r = typeof E == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = t.pendingProps !== c, r || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || s !== f) && jv(
        t,
        n,
        a,
        f
      ), Nu = !1;
      var y = t.memoizedState;
      n.state = y, Re(t, a, n, e), Ce(), s = t.memoizedState, c || y !== s || Nu ? (typeof E == "function" && (ui(
        t,
        u,
        E,
        a
      ), s = t.memoizedState), (i = Nu || Qv(
        t,
        u,
        i,
        a,
        y,
        s,
        f
      )) ? (r || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = s), n.props = a, n.state = s, n.context = f, a = i) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      n = t.stateNode, Yc(l, t), f = t.memoizedProps, r = va(u, f), n.props = r, E = t.pendingProps, y = n.context, s = u.contextType, i = Ca, typeof s == "object" && s !== null && (i = Ll(s)), c = u.getDerivedStateFromProps, (s = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (f !== E || y !== i) && jv(
        t,
        n,
        a,
        i
      ), Nu = !1, y = t.memoizedState, n.state = y, Re(t, a, n, e), Ce();
      var h = t.memoizedState;
      f !== E || y !== h || Nu || l !== null && l.dependencies !== null && qn(l.dependencies) ? (typeof c == "function" && (ui(
        t,
        u,
        c,
        a
      ), h = t.memoizedState), (r = Nu || Qv(
        t,
        u,
        r,
        a,
        y,
        h,
        i
      ) || l !== null && l.dependencies !== null && qn(l.dependencies)) ? (s || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(a, h, i), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
        a,
        h,
        i
      )), typeof n.componentDidUpdate == "function" && (t.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || f === l.memoizedProps && y === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || f === l.memoizedProps && y === l.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = h), n.props = a, n.state = h, n.context = i, a = r) : (typeof n.componentDidUpdate != "function" || f === l.memoizedProps && y === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || f === l.memoizedProps && y === l.memoizedState || (t.flags |= 1024), a = !1);
    }
    return n = a, Za(l, t), a = (t.flags & 128) !== 0, n || a ? (n = t.stateNode, u = a && typeof u.getDerivedStateFromError != "function" ? null : n.render(), t.flags |= 1, l !== null && a ? (t.child = ia(
      t,
      l.child,
      null,
      e
    ), t.child = ia(
      t,
      null,
      u,
      e
    )) : Yl(l, t, u, e), t.memoizedState = n.state, l = t.child) : l = yu(
      l,
      t,
      e
    ), l;
  }
  function ly(l, t, u, a) {
    return la(), t.flags |= 256, Yl(l, t, u, a), t.child;
  }
  var ci = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function ii(l) {
    return { baseLanes: l, cachePool: xo() };
  }
  function oi(l, t, u) {
    return l = l !== null ? l.childLanes & ~u : 0, t && (l |= Et), l;
  }
  function ty(l, t, u) {
    var a = t.pendingProps, e = !1, n = (t.flags & 128) !== 0, f;
    if ((f = n) || (f = l !== null && l.memoizedState === null ? !1 : (Jl.current & 2) !== 0), f && (e = !0, t.flags &= -129), f = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
      if (L) {
        if (e ? Cu(t) : Ru(), (l = rl) ? (l = _m(
          l,
          Dt
        ), l = l !== null && l.data !== "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: zu !== null ? { id: pt, overflow: xt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, u = qo(l), u.return = t, t.child = u, Ql = t, rl = null)) : l = null, l === null) throw _u(t);
        return i0(l) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      return n = a.children, a = a.fallback, e ? (Ru(), e = t.mode, n = lf(
        { mode: "hidden", children: n },
        e
      ), a = Pu(
        a,
        e,
        u,
        null
      ), n.return = t, a.return = t, n.sibling = a, t.child = n, a = t.child, a.memoizedState = ii(u), a.childLanes = oi(
        l,
        f,
        u
      ), t.memoizedState = ci, Ge(null, a)) : (Cu(t), vi(t, n));
    }
    var c = l.memoizedState;
    if (c !== null) {
      var i = c.dehydrated;
      if (i !== null)
        return jd(
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
    return e ? (Ru(), e = a.fallback, n = t.mode, c = l.child, i = c.sibling, a = nu(c, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = c.subtreeFlags & 1206910976, i !== null ? e = nu(i, e) : (e = Pu(
      e,
      n,
      u,
      null
    ), e.flags |= 2), e.return = t, a.return = t, a.sibling = e, t.child = a, Ge(null, a), a = t.child, e = l.child.memoizedState, e === null ? e = ii(u) : (n = e.cachePool, n !== null ? (c = Dl._currentValue, n = n.parent !== c ? { parent: c, pool: c } : n) : n = xo(), e = {
      baseLanes: e.baseLanes | u,
      cachePool: n
    }), a.memoizedState = e, a.childLanes = oi(
      l,
      f,
      u
    ), t.memoizedState = ci, Ge(l.child, a)) : (Cu(t), u = l.child, l = u.sibling, u = nu(u, {
      mode: "visible",
      children: a.children
    }), u.return = t, u.sibling = null, l !== null && (f = t.deletions, f === null ? (t.deletions = [l], t.flags |= 16) : f.push(l)), t.child = u, t.memoizedState = null, u);
  }
  function vi(l, t) {
    return t = lf(
      { mode: "visible", children: t },
      l.mode
    ), t.return = l, l.child = t;
  }
  function lf(l, t) {
    return l = ft(22, l, null, t), l.lanes = 0, l;
  }
  function tf(l, t, u) {
    return ia(t, l.child, null, u), l = vi(
      t,
      t.pendingProps.children
    ), l.flags |= 2, t.memoizedState = null, l;
  }
  function jd(l, t, u, a, e, n, f, c) {
    if (u)
      return t.flags & 256 ? (Cu(t), t.flags &= -257, tf(
        l,
        t,
        c
      )) : t.memoizedState !== null ? (Ru(), t.child = l.child, t.flags |= 128, null) : (Ru(), n = e.fallback, f = t.mode, e = lf(
        { mode: "visible", children: e.children },
        f
      ), n = Pu(
        n,
        f,
        c,
        null
      ), n.flags |= 2, e.return = t, n.return = t, e.sibling = n, t.child = e, ia(t, l.child, null, c), e = t.child, e.memoizedState = ii(c), e.childLanes = oi(
        l,
        a,
        c
      ), t.memoizedState = ci, Ge(null, e));
    if (Cu(t), i0(n)) {
      if (a = n.nextSibling && n.nextSibling.dataset, a) var i = a.dgst;
      return a = i, a !== "" && (e = Error(g(419)), e.stack = "", e.digest = a, Oe({ value: e, source: null, stack: null })), tf(
        l,
        t,
        c
      );
    }
    if (Cl || ua(l, t, c, !1), a = (c & l.childLanes) !== 0, Cl || a) {
      if (Uu.current !== null)
        return tf(
          l,
          t,
          c
        );
      if (a = hl, a !== null && (e = G0(
        a,
        c
      ), e !== 0 && e !== f.retryLane))
        throw f.retryLane = e, ku(l, e), vt(a, l, e), ni;
      return c0(n) || Ef(), tf(
        l,
        t,
        c
      );
    }
    return c0(n) ? (t.flags |= 192, t.child = l.child, null) : (l = f.treeContext, rl = Ct(n.nextSibling), Ql = t, L = !0, bu = null, Dt = !1, l !== null && Xo(t, l), t = vi(
      t,
      e.children
    ), t.flags |= 134221824, t);
  }
  function uy(l, t, u) {
    l.lanes |= t;
    var a = l.alternate;
    a !== null && (a.lanes |= t), Yn(l.return, t, u);
  }
  function ay(l) {
    for (var t = null; l !== null; ) {
      var u = l.alternate;
      u !== null && pn(u) === null && (t = l), l = l.sibling;
    }
    return t;
  }
  function uf(l, t, u, a, e, n) {
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
  function yi(l) {
    var t = l.child;
    for (l.child = null; t !== null; ) {
      var u = t.sibling;
      t.sibling = l.child, l.child = t, t = u;
    }
  }
  function mi(l, t, u) {
    var a = t.pendingProps, e = a.revealOrder, n = a.tail;
    a = a.children;
    var f = Jl.current;
    if (t.flags & 128)
      return He(t, f), null;
    var c = (f & 2) !== 0;
    if (c ? (f = f & 1 | 2, t.flags |= 128) : f &= 1, He(t, f), e === "backwards" && l !== null ? (yi(l), Yl(l, t, a, u), yi(l)) : Yl(l, t, a, u), a = L ? _e : 0, !c && l !== null && (l.flags & 128) !== 0)
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && uy(l, u, t);
        else if (l.tag === 19)
          uy(l, u, t);
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
        u = ay(t.child), u === null ? (e = t.child, t.child = null) : (e = u.sibling, u.sibling = null, yi(t)), uf(
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
          if (l = e.alternate, l !== null && pn(l) === null) {
            t.child = e;
            break;
          }
          l = e.sibling, e.sibling = u, u = e, e = l;
        }
        uf(
          t,
          !0,
          u,
          null,
          n,
          a
        );
        break;
      case "together":
        uf(
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
        u = ay(t.child), u === null ? (e = t.child, t.child = null) : (e = u.sibling, u.sibling = null), uf(
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
  function ey(l, t, u) {
    var a = t.pendingProps;
    return Ou(t, t.type, a.value), Yl(l, t, a.children, u), t.child;
  }
  function yu(l, t, u) {
    if (l !== null && (t.dependencies = l.dependencies), Bu |= t.lanes, (u & t.childLanes) === 0)
      if (l !== null) {
        if (ua(
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
      for (l = t.child, u = nu(l, l.pendingProps), t.child = u, u.return = t; l.sibling !== null; )
        l = l.sibling, u = u.sibling = nu(l, l.pendingProps), u.return = t;
      u.sibling = null;
    }
    return t.child;
  }
  function si(l, t) {
    return (l.lanes & t) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && qn(l)));
  }
  function Zd(l, t, u) {
    switch (t.tag) {
      case 3:
        fn(t, t.stateNode.containerInfo), Ou(t, Dl, l.memoizedState.cache), la();
        break;
      case 27:
      case 5:
        Zf(t);
        break;
      case 4:
        fn(t, t.stateNode.containerInfo);
        break;
      case 10:
        Ou(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Qc(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null) {
          if (a.dehydrated !== null)
            return Cu(t), t.flags |= 128, null;
          a = ua(
            l,
            t,
            u,
            !1
          );
          var e = t.child.childLanes;
          return a || (u & e) !== 0 ? ty(l, t, u) : (Cu(t), l = yu(
            l,
            t,
            u
          ), l !== null ? l.sibling : null);
        }
        Cu(t);
        break;
      case 19:
        if (t.flags & 128)
          return mi(
            l,
            t,
            u
          );
        if (e = (l.flags & 128) !== 0, a = (u & t.childLanes) !== 0, a || (ua(
          l,
          t,
          u,
          !1
        ), a = (u & t.childLanes) !== 0), e) {
          if (a)
            return mi(
              l,
              t,
              u
            );
          t.flags |= 128;
        }
        if (e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null, e.lastEffect = null), He(t, Jl.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, Fv(
          l,
          t,
          u,
          t.pendingProps
        );
      case 24:
        Ou(t, Dl, l.memoizedState.cache);
    }
    return yu(l, t, u);
  }
  function ny(l, t, u) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps)
        Cl = !0;
      else {
        if (!si(l, u) && (t.flags & 128) === 0)
          return Cl = !1, Zd(
            l,
            t,
            u
          );
        Cl = (l.flags & 131072) !== 0;
      }
    else
      Cl = !1, L && (t.flags & 1048576) !== 0 && Go(t, _e, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (l = fa(t.elementType), t.type = l, typeof l == "function")
            Ec(l) ? (a = va(l, a), t.tag = 1, t = Pv(
              null,
              t,
              l,
              a,
              u
            )) : (t.tag = 0, t = fi(
              null,
              t,
              l,
              a,
              u
            ));
          else {
            if (l != null) {
              var e = l.$$typeof;
              if (e === O) {
                t.tag = 11, t = Jv(
                  null,
                  t,
                  l,
                  a,
                  u
                );
                break l;
              } else if (e === dl) {
                t.tag = 14, t = wv(
                  null,
                  t,
                  l,
                  a,
                  u
                );
                break l;
              } else if (e === Gl) {
                t.tag = 10, t.type = l, t = ey(
                  null,
                  t,
                  u
                );
                break l;
              }
            }
            throw t = k(l) || l, Error(g(306, t, ""));
          }
        }
        return t;
      case 0:
        return fi(
          l,
          t,
          t.type,
          t.pendingProps,
          u
        );
      case 1:
        return a = t.type, e = va(
          a,
          t.pendingProps
        ), Pv(
          l,
          t,
          a,
          e,
          u
        );
      case 3:
        l: {
          if (fn(
            t,
            t.stateNode.containerInfo
          ), l === null) throw Error(g(387));
          a = t.pendingProps;
          var n = t.memoizedState;
          e = n.element, Yc(l, t), Re(t, a, null, u);
          var f = t.memoizedState;
          if (a = f.cache, Ou(t, Dl, a), a !== n.cache && Mc(
            t,
            [Dl],
            u,
            !0
          ), Ce(), a = f.element, n.isDehydrated)
            if (n = {
              element: a,
              isDehydrated: !1,
              cache: f.cache
            }, t.updateQueue.baseState = n, t.memoizedState = n, t.flags & 256) {
              t = ly(
                l,
                t,
                a,
                u
              );
              break l;
            } else if (a !== e) {
              e = At(
                Error(g(424)),
                t
              ), Oe(e), t = ly(
                l,
                t,
                a,
                u
              );
              break l;
            } else
              for (l = t.stateNode.containerInfo, l.nodeType === 9 ? l = l.body : l = l.nodeName === "HTML" ? l.ownerDocument.body : l, rl = Ct(l.firstChild), Ql = t, L = !0, bu = null, Dt = !0, u = Fo(
                t,
                null,
                a,
                u
              ), t.child = u; u; )
                u.flags = u.flags & -3 | 134221824, u = u.sibling;
          else {
            if (la(), a === e) {
              t = yu(
                l,
                t,
                u
              );
              break l;
            }
            Yl(l, t, a, u);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Za(l, t), l === null ? (u = Cm(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = u : L || (t.stateNode = om(
          t.type,
          t.pendingProps,
          gu.current,
          t
        )) : t.memoizedState = Cm(
          t.type,
          l.memoizedProps,
          t.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return Zf(t), l === null && L && (a = t.stateNode = Nm(
          t.type,
          t.pendingProps,
          gu.current
        ), Ql = t, Dt = !0, e = rl, ju(t.type) ? (o0 = e, rl = Ct(a.firstChild)) : rl = e), Yl(
          l,
          t,
          t.pendingProps.children,
          u
        ), Za(l, t), l === null && (t.flags |= 4194304), t.child;
      case 5:
        return l === null && L && ((e = a = rl) && (a = q1(
          a,
          t.type,
          t.pendingProps,
          Dt
        ), a !== null ? (t.stateNode = a, Ql = t, rl = Ct(a.firstChild), Dt = !1, e = !0) : e = !1), e || _u(t)), Zf(t), e = t.type, n = t.pendingProps, f = l !== null ? l.memoizedProps : null, a = n.children, l0(e, n) ? a = null : f !== null && l0(e, f) && (t.flags |= 32), t.memoizedState !== null && (e = Vc(
          l,
          t,
          Ud,
          null,
          null,
          u
        ), ee._currentValue = e), Za(l, t), Yl(l, t, a, u), t.child;
      case 6:
        return l === null && L && ((l = u = rl) && (u = B1(
          u,
          t.pendingProps,
          Dt
        ), u !== null ? (t.stateNode = u, Ql = t, rl = null, l = !0) : l = !1), l || _u(t)), null;
      case 13:
        return ty(l, t, u);
      case 4:
        return fn(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, l === null ? t.child = ia(
          t,
          null,
          a,
          u
        ) : Yl(l, t, a, u), t.child;
      case 11:
        return Jv(
          l,
          t,
          t.type,
          t.pendingProps,
          u
        );
      case 7:
        return a = t.pendingProps, Za(l, t), Yl(l, t, a, u), t.child;
      case 8:
        return Yl(
          l,
          t,
          t.pendingProps.children,
          u
        ), t.child;
      case 12:
        return Yl(
          l,
          t,
          t.pendingProps.children,
          u
        ), t.child;
      case 10:
        return ey(l, t, u);
      case 9:
        return e = t.type._context, a = t.pendingProps.children, aa(t), e = Ll(e), a = a(e), t.flags |= 1, Yl(l, t, a, u), t.child;
      case 14:
        return wv(
          l,
          t,
          t.type,
          t.pendingProps,
          u
        );
      case 15:
        return $v(
          l,
          t,
          t.type,
          t.pendingProps,
          u
        );
      case 19:
        return mi(l, t, u);
      case 31:
        return Qd(l, t, u);
      case 22:
        return Fv(
          l,
          t,
          u,
          t.pendingProps
        );
      case 24:
        return aa(t), a = Ll(Dl), l === null ? (e = Cc(), e === null && (e = hl, n = Dc(), e.pooledCache = n, n.refCount++, n !== null && (e.pooledCacheLanes |= u), e = n), t.memoizedState = { parent: a, cache: e }, Hc(t), Ou(t, Dl, e)) : ((l.lanes & u) !== 0 && (Yc(l, t), Re(t, null, null, u), Ce()), e = l.memoizedState, n = t.memoizedState, e.parent !== a ? (e = { parent: a, cache: a }, t.memoizedState = e, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = e), Ou(t, Dl, a)) : (a = n.cache, Ou(t, Dl, a), a !== e.cache && Mc(
          t,
          [Dl],
          u,
          !0
        ))), Yl(
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
        }), a = t.pendingProps, a.name != null && a.name !== "auto" ? t.flags |= l === null ? 18882560 : 18874368 : L && Rn(t), l !== null && l.memoizedProps.name !== a.name ? t.flags |= 4194816 : Za(l, t), Yl(l, t, a.children, u), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(g(156, t.tag));
  }
  function mu(l) {
    l.flags |= 4;
  }
  function di(l, t, u, a, e) {
    var n;
    if ((n = (l.mode & 32) !== 0) && (n = u === null ? qm(t, a) : qm(t, a) && (a.src !== u.src || a.srcSet !== u.srcSet)), n) {
      if (l.flags |= 16777216, (e & 335544128) === e)
        if (l.stateNode.complete) l.flags |= 8192;
        else if (Zy()) l.flags |= 8192;
        else
          throw ca = Qn, Rc;
    } else l.flags &= -16777217;
  }
  function fy(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !Bm(t))
      if (Zy()) l.flags |= 8192;
      else
        throw ca = Qn, Rc;
  }
  function af(l, t) {
    t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? Y0() : 536870912, l.lanes |= t, Ka |= t);
  }
  function Xe(l, t) {
    if (!L)
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
  function Sl(l) {
    var t = l.alternate !== null && l.alternate.child === l.child, u = 0, a = 0;
    if (t)
      for (var e = l.child; e !== null; )
        u |= e.lanes | e.childLanes, a |= e.subtreeFlags & 1206910976, a |= e.flags & 1206910976, e.return = l, e = e.sibling;
    else
      for (e = l.child; e !== null; )
        u |= e.lanes | e.childLanes, a |= e.subtreeFlags, a |= e.flags, e.return = l, e = e.sibling;
    return l.subtreeFlags |= a, l.childLanes = u, t;
  }
  function Vd(l, t, u) {
    var a = t.pendingProps;
    switch (_c(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Sl(t), null;
      case 1:
        return Sl(t), null;
      case 3:
        return u = t.stateNode, a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), iu(Dl), ra(), u.pendingContext && (u.context = u.pendingContext, u.pendingContext = null), (l === null || l.child === null) && (Ya(t) ? mu(t) : l === null || l.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Ac())), Sl(t), null;
      case 26:
        var e = t.type, n = t.memoizedState;
        return l === null ? (mu(t), n !== null ? (Sl(t), fy(t, n)) : (Sl(t), di(
          t,
          e,
          null,
          a,
          u
        ))) : n ? n !== l.memoizedState ? (mu(t), Sl(t), fy(t, n)) : (Sl(t), t.flags &= -16777217) : (l = l.memoizedProps, l !== a && mu(t), Sl(t), di(
          t,
          e,
          l,
          a,
          u
        )), null;
      case 27:
        if (cn(t), u = gu.current, e = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && mu(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(g(166));
            return Sl(t), t.subtreeFlags &= -33554433, null;
          }
          l = Zt.current, Ya(t) ? Qo(t) : (l = Nm(e, a, u), t.stateNode = l, mu(t));
        }
        return Sl(t), t.subtreeFlags &= -33554433, null;
      case 5:
        if (cn(t), e = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && mu(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(g(166));
            return Sl(t), t.subtreeFlags &= -33554433, null;
          }
          if (n = Zt.current, Ya(t))
            Qo(t);
          else {
            var f = $e(
              gu.current
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
            n[xl] = t, n[nt] = a;
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
            l: switch ($l(n, e, a), e) {
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
            a && mu(t);
          }
        }
        return Sl(t), t.subtreeFlags &= -33554433, di(
          t,
          t.type,
          l === null ? null : l.memoizedProps,
          t.pendingProps,
          u
        ), null;
      case 6:
        if (l && t.stateNode != null)
          l.memoizedProps !== a && mu(t);
        else {
          if (typeof a != "string" && t.stateNode === null)
            throw Error(g(166));
          if (l = gu.current, Ya(t)) {
            if (l = t.stateNode, u = t.memoizedProps, a = null, e = Ql, e !== null)
              switch (e.tag) {
                case 27:
                case 5:
                  a = e.memoizedProps;
              }
            l[xl] = t, l = !!(l.nodeValue === u || a !== null && a.suppressHydrationWarning === !0 || nm(l.nodeValue, u)), l || _u(t, !0);
          } else
            l = $e(l).createTextNode(
              a
            ), l[xl] = t, t.stateNode = l;
        }
        return Sl(t), null;
      case 31:
        if (u = t.memoizedState, l === null || l.memoizedState !== null) {
          if (a = Ya(t), u !== null) {
            if (l === null) {
              if (!a) throw Error(g(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(g(557));
              l[xl] = t;
            } else
              la(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Sl(t), l = !1;
          } else
            u = Ac(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = u), l = !0;
          if (!l)
            return t.flags & 256 ? (rt(t), t) : (rt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(g(558));
        }
        return Sl(t), null;
      case 13:
        if (a = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (e = Ya(t), a !== null && a.dehydrated !== null) {
            if (l === null) {
              if (!e) throw Error(g(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(g(317));
              e[xl] = t;
            } else
              la(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Sl(t), e = !1;
          } else
            e = Ac(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), e = !0;
          if (!e)
            return t.flags & 256 ? (rt(t), t) : (rt(t), null);
        }
        return rt(t), (t.flags & 128) !== 0 ? (t.lanes = u, t) : (u = a !== null, l = l !== null && l.memoizedState !== null, u && (a = t.child, e = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (e = a.alternate.memoizedState.cachePool.pool), n = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (n = a.memoizedState.cachePool.pool), n !== e && (a.flags |= 2048)), u !== l && u && (t.child.flags |= 8192), af(t, t.updateQueue), Sl(t), null);
      case 4:
        return ra(), l === null && Fi(t.stateNode.containerInfo), t.flags |= 67108864, Sl(t), null;
      case 10:
        return iu(t.type), Sl(t), null;
      case 19:
        if (jc(t), a = t.memoizedState, a === null) return Sl(t), null;
        if (e = (t.flags & 128) !== 0, n = a.rendering, n === null)
          if (e) Xe(a, !1);
          else {
            if (Nl !== 0 || l !== null && (l.flags & 128) !== 0)
              for (l = t.child; l !== null; ) {
                if (n = pn(l), n !== null) {
                  for (t.flags |= 128, Xe(a, !1), l = n.updateQueue, t.updateQueue = l, af(t, l), t.subtreeFlags = 0, l = u, u = t.child; u !== null; )
                    Yo(u, l), u = u.sibling;
                  return He(
                    t,
                    Jl.current & 1 | 2
                  ), L && fu(t, a.treeForkCount), t.child;
                }
                l = l.sibling;
              }
            a.tail !== null && mt() > gf && (t.flags |= 128, e = !0, Xe(a, !1), t.lanes = 4194304);
          }
        else {
          if (!e)
            if (l = pn(n), l !== null) {
              if (t.flags |= 128, e = !0, l = l.updateQueue, t.updateQueue = l, af(t, l), Xe(a, !0), a.tail === null && a.tailMode !== "collapsed" && a.tailMode !== "visible" && !n.alternate && !L)
                return Sl(t), null;
            } else
              2 * mt() - a.renderingStartTime > gf && u !== 536870912 && (t.flags |= 128, e = !0, Xe(a, !1), t.lanes = 4194304);
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
          return a.rendering = l, a.tail = l.sibling, a.renderingStartTime = mt(), l.sibling = null, n = Jl.current, n = e ? n & 1 | 2 : n & 1, a.tailMode === "visible" || a.tailMode === "collapsed" || !u || L ? He(t, n) : (u = n, gl(Kl, t), gl(Jl, u), kl === null && (kl = t)), L && fu(t, a.treeForkCount), l;
        }
        return Sl(t), null;
      case 22:
      case 23:
        return rt(t), Xc(), a = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (u & 536870912) !== 0 && (t.flags & 128) === 0 && (Sl(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Sl(t), u = t.updateQueue, u !== null && af(t, u.retryQueue), u = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== u && (t.flags |= 2048), l !== null && pl(na), null;
      case 24:
        return u = null, l !== null && (u = l.memoizedState.cache), t.memoizedState.cache !== u && (t.flags |= 2048), iu(Dl), Sl(t), null;
      case 25:
        return null;
      case 30:
        return t.flags |= 33554432, Sl(t), null;
    }
    throw Error(g(156, t.tag));
  }
  function pd(l, t) {
    switch (_c(t), t.tag) {
      case 1:
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 3:
        return iu(Dl), ra(), l = t.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (t.flags = l & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return cn(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (rt(t), t.alternate === null)
            throw Error(g(340));
          la();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 13:
        if (rt(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(g(340));
          la();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 19:
        return jc(t), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null), t.flags |= 4, t) : null;
      case 4:
        return ra(), null;
      case 10:
        return iu(t.type), null;
      case 22:
      case 23:
        return rt(t), Xc(), l !== null && pl(na), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 24:
        return iu(Dl), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function cy(l, t) {
    switch (_c(t), t.tag) {
      case 3:
        iu(Dl), ra();
        break;
      case 26:
      case 27:
      case 5:
        cn(t);
        break;
      case 4:
        ra();
        break;
      case 31:
        t.memoizedState !== null && rt(t);
        break;
      case 13:
        rt(t);
        break;
      case 19:
        jc(t);
        break;
      case 10:
        iu(t.type);
        break;
      case 22:
      case 23:
        rt(t), Xc(), l !== null && pl(na);
        break;
      case 24:
        iu(Dl);
    }
  }
  function Qe(l, t) {
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
      il(t, t.return, c);
    }
  }
  function Hu(l, t, u) {
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
              var i = u, s = c;
              try {
                s();
              } catch (r) {
                il(
                  e,
                  i,
                  r
                );
              }
            }
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (r) {
      il(t, t.return, r);
    }
  }
  function iy(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var u = l.stateNode;
      try {
        Io(t, u);
      } catch (a) {
        il(l, l.return, a);
      }
    }
  }
  function oy(l, t, u) {
    u.props = va(
      l.type,
      l.memoizedProps
    ), u.state = l.memoizedState;
    try {
      u.componentWillUnmount();
    } catch (a) {
      il(l, t, a);
    }
  }
  function Lt(l, t) {
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
            var e = l.stateNode, n = au(l.memoizedProps, e);
            (e.ref === null || e.ref.name !== n) && (e.ref = gm(n)), a = e.ref;
            break;
          case 7:
            if (l.stateNode === null) {
              var f = new bt(l);
              S(
                l.child,
                !1,
                H1,
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
      il(l, t, c);
    }
  }
  function wl(l, t) {
    var u = l.ref, a = l.refCleanup;
    if (u !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (e) {
          il(l, t, e);
        } finally {
          l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
        }
      else if (typeof u == "function")
        try {
          u(null);
        } catch (e) {
          il(l, t, e);
        }
      else u.current = null;
  }
  function ef(l, t) {
    if ((l.tag === 5 || l.tag === 27 || l.tag === 6) && l.alternate === null && t !== null)
      for (var u = 0; u < t.length; u++)
        bm(
          l.stateNode,
          t[u]
        );
  }
  function vy(l) {
    for (var t = l.return; t !== null && (gi(t) && bm(l.stateNode, t.stateNode), !hi(t)); )
      t = t.return;
  }
  function je(l) {
    for (var t = l.return; t !== null && (gi(t) && Y1(l.stateNode, t.stateNode), !hi(t)); )
      t = t.return;
  }
  function hi(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 27;
  }
  function gi(l) {
    return l && l.tag === 7 && l.stateNode !== null;
  }
  function ri(l) {
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
      il(l, l.return, e);
    }
  }
  function Si(l, t, u) {
    try {
      var a = l.stateNode;
      d1(a, l.type, u, t), a[nt] = t;
    } catch (e) {
      il(l, l.return, e);
    }
  }
  function yy(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && ju(l.type) || l.tag === 4;
  }
  function Ti(l) {
    l: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || yy(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && ju(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function Ei(l, t, u, a) {
    var e = l.tag;
    if (e === 5 || e === 6)
      e = l.stateNode, t ? (u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u).insertBefore(e, t) : (t = u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u, t.appendChild(e), u = u._reactRootContainer, u != null || t.onclick !== null || (t.onclick = Vt)), ef(l, a), P = !0;
    else if (e !== 4 && (e === 27 && (ef(l, a), a = null, ju(l.type) && (u = l.stateNode, t = null)), l = l.child, l !== null))
      for (Ei(
        l,
        t,
        u,
        a
      ), l = l.sibling; l !== null; )
        Ei(
          l,
          t,
          u,
          a
        ), l = l.sibling;
  }
  function nf(l, t, u, a) {
    var e = l.tag;
    if (e === 5 || e === 6)
      e = l.stateNode, t ? u.insertBefore(e, t) : u.appendChild(e), ef(l, a), P = !0;
    else if (e !== 4 && (e === 27 && (ef(l, a), a = null, ju(l.type) && (u = l.stateNode)), l = l.child, l !== null))
      for (nf(
        l,
        t,
        u,
        a
      ), l = l.sibling; l !== null; )
        nf(
          l,
          t,
          u,
          a
        ), l = l.sibling;
  }
  function my(l) {
    var t = l.stateNode, u = l.memoizedProps;
    try {
      for (var a = l.type, e = t.attributes; e.length; )
        t.removeAttributeNode(e[0]);
      $l(t, a, u), t[xl] = l, t[nt] = u;
    } catch (n) {
      il(l, l.return, n);
    }
  }
  var ff = !1, St = null;
  function sy(l) {
    (l.tag === 30 || (l.subtreeFlags & 33554432) !== 0) && (ff = !0);
  }
  var Kt = null;
  function dy() {
    var l = Kt;
    return Kt = null, l;
  }
  var ct = 0;
  function Va(l, t, u, a, e) {
    return ct = 0, hy(
      l.child,
      t,
      u,
      a,
      e
    );
  }
  function hy(l, t, u, a, e) {
    for (var n = !1; l !== null; ) {
      if (l.tag === 5) {
        var f = l.stateNode;
        if (a !== null) {
          var c = a0(f);
          a.push(c), c.view && (n = !0);
        } else
          n || a0(f).view && (n = !0);
        ff = !0, dm(
          f,
          ct === 0 ? t : t + "_" + ct,
          u
        ), ct++;
      } else (l.tag !== 22 || l.memoizedState === null) && (l.tag === 30 && e || hy(
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
  function Jt(l, t) {
    for (; l !== null; )
      l.tag === 5 ? hm(l.stateNode, l.memoizedProps) : (l.tag !== 22 || l.memoizedState === null) && (l.tag === 30 && t || Jt(
        l.child,
        t
      )), l = l.sibling;
  }
  function cf(l) {
    if ((l.subtreeFlags & 18874368) !== 0)
      for (l = l.child; l !== null; ) {
        if ((l.tag !== 22 || l.memoizedState === null) && (cf(l), l.tag === 30 && (l.flags & 18874368) !== 0 && l.stateNode.paired)) {
          var t = l.memoizedProps;
          if (t.name == null || t.name === "auto")
            throw Error(g(544));
          var u = t.name;
          t = eu(t.default, t.share), t !== "none" && (Va(
            l,
            u,
            t,
            null,
            !1
          ) || Jt(l.child, !1));
        }
        l = l.sibling;
      }
  }
  function zi(l, t) {
    if (l.tag === 30) {
      var u = l.stateNode, a = l.memoizedProps, e = au(a, u), n = eu(
        a.default,
        u.paired ? a.share : a.enter
      );
      n !== "none" ? Va(l, e, n, null, !1) ? (cf(l), u.paired || t || Fa(l, a.onEnter)) : Jt(l.child, !1) : cf(l);
    } else if ((l.subtreeFlags & 33554432) !== 0)
      for (l = l.child; l !== null; )
        zi(l, t), l = l.sibling;
    else cf(l);
  }
  function bi(l) {
    if (St !== null && St.size !== 0) {
      var t = St;
      if ((l.subtreeFlags & 18874368) !== 0)
        for (l = l.child; l !== null; ) {
          if (l.tag !== 22 || l.memoizedState === null) {
            if (l.tag === 30 && (l.flags & 18874368) !== 0) {
              var u = l.memoizedProps, a = u.name;
              if (a != null && a !== "auto") {
                var e = t.get(a);
                if (e !== void 0) {
                  var n = eu(
                    u.default,
                    u.share
                  );
                  if (n !== "none" && (Va(
                    l,
                    a,
                    n,
                    null,
                    !1
                  ) ? (n = l.stateNode, e.paired = n, n.paired = e, Fa(l, u.onShare)) : Jt(l.child, !1)), t.delete(a), t.size === 0) break;
                }
              }
            }
            bi(l);
          }
          l = l.sibling;
        }
    }
  }
  function _i(l) {
    if (l.tag === 30) {
      var t = l.memoizedProps, u = au(t, l.stateNode), a = St !== null ? St.get(u) : void 0, e = eu(
        t.default,
        a !== void 0 ? t.share : t.exit
      );
      e !== "none" && (Va(l, u, e, null, !1) ? a !== void 0 ? (e = l.stateNode, a.paired = e, e.paired = a, St.delete(u), Fa(l, t.onShare)) : Fa(l, t.onExit) : Jt(l.child, !1)), St !== null && bi(l);
    } else if ((l.subtreeFlags & 33554432) !== 0)
      for (l = l.child; l !== null; )
        _i(l), l = l.sibling;
    else
      St !== null && bi(l);
  }
  function gy(l) {
    for (l = l.child; l !== null; ) {
      if (l.tag === 30) {
        var t = l.memoizedProps, u = au(t, l.stateNode);
        t = eu(t.default, t.update), l.flags &= -5, t !== "none" && Va(
          l,
          u,
          t,
          l.memoizedState = [],
          !1
        );
      } else
        (l.subtreeFlags & 33554432) !== 0 && gy(l);
      l = l.sibling;
    }
  }
  function Oi(l) {
    if ((l.subtreeFlags & 18874368) !== 0)
      for (l = l.child; l !== null; ) {
        if (l.tag !== 22 || l.memoizedState === null) {
          if (l.tag === 30 && (l.flags & 18874368) !== 0) {
            var t = l.stateNode;
            t.paired !== null && (t.paired = null, Jt(l.child, !1));
          }
          Oi(l);
        }
        l = l.sibling;
      }
  }
  function of(l) {
    if (l.tag === 30)
      l.stateNode.paired = null, Jt(l.child, !1), Oi(l);
    else if ((l.subtreeFlags & 33554432) !== 0)
      for (l = l.child; l !== null; )
        of(l), l = l.sibling;
    else Oi(l);
  }
  function ry(l) {
    for (l = l.child; l !== null; )
      l.tag === 30 ? Jt(l.child, !1) : (l.subtreeFlags & 33554432) !== 0 && ry(l), l = l.sibling;
  }
  function Ai(l, t, u, a, e, n, f) {
    for (var c = !1; t !== null; ) {
      if (t.tag === 5) {
        var i = t.stateNode;
        if (n !== null && ct < n.length) {
          var s = n[ct], r = a0(i);
          (s.view || r.view) && (c = !0);
          var E;
          if (E = (l.flags & 4) === 0)
            if (r.clip) E = !0;
            else {
              E = s.rect;
              var y = r.rect;
              E = E.y !== y.y || E.x !== y.x || E.height !== y.height || E.width !== y.width;
            }
          E && (l.flags |= 4), r.abs ? r = !s.abs : (s = s.rect, r = r.rect, r = s.height !== r.height || s.width !== r.width), r && (l.flags |= 32);
        } else l.flags |= 32;
        (l.flags & 4) !== 0 && dm(
          i,
          ct === 0 ? u : u + "_" + ct,
          e
        ), c && (l.flags & 4) !== 0 || (Kt === null && (Kt = []), Kt.push(
          i,
          ct === 0 ? a : a + "_" + ct,
          t.memoizedProps
        )), ct++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && f ? l.flags |= t.flags & 32 : Ai(
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
  function Sy(l, t) {
    for (l = l.child; l !== null; ) {
      if (l.tag === 30) {
        var u = l.memoizedProps, a = l.stateNode, e = au(u, a), n = eu(u.default, u.update), f;
        f = l.memoizedState, l.memoizedState = null, a = l;
        var c = l.child;
        ct = 0, e = Ai(
          a,
          c,
          e,
          e,
          n,
          f,
          !1
        ), (l.flags & 4) !== 0 && e && Fa(l, u.onUpdate);
      } else
        (l.subtreeFlags & 33554432) !== 0 && Sy(l);
      l = l.sibling;
    }
  }
  var jl = !1, el = !1, wt = !1, Ni = !1, Ty = typeof WeakSet == "function" ? WeakSet : Set, Zl = null, $t = !1, Ze = !1, vf = !1, Mi = !1;
  function xd(l, t, u) {
    if (l = l.containerInfo, ki = ne, l = _o(l), sc(l)) {
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
            var c = 0, i = -1, s = -1, r = 0, E = 0, y = l, h = null;
            t: for (; ; ) {
              for (var _; y !== a || n !== 0 && y.nodeType !== 3 || (i = c + n), y !== f || e !== 0 && y.nodeType !== 3 || (s = c + e), y.nodeType === 3 && (c += y.nodeValue.length), (_ = y.firstChild) !== null; )
                h = y, y = _;
              for (; ; ) {
                if (y === l) break t;
                if (h === a && ++r === n && (i = c), h === f && ++E === e && (s = c), (_ = y.nextSibling) !== null) break;
                y = h, h = y.parentNode;
              }
              y = _;
            }
            a = i === -1 || s === -1 ? null : { start: i, end: s };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Pi = { focusedElem: l, selectionRange: a }, ne = !1, u = (u & 335544064) === u, Zl = t, t = u ? 9270 : 1024; Zl !== null; ) {
      if (l = Zl, u && (a = l.deletions, a !== null))
        for (n = 0; n < a.length; n++)
          u && _i(a[n]);
      if (l.alternate === null && (l.flags & 2) !== 0)
        u && sy(l), yf(u);
      else {
        if (l.tag === 22) {
          if (a = l.alternate, l.memoizedState !== null) {
            a !== null && a.memoizedState === null && u && _i(a), yf(u);
            continue;
          } else if (a !== null && a.memoizedState !== null) {
            u && sy(l), yf(u);
            continue;
          }
        }
        a = l.child, (l.subtreeFlags & t) !== 0 && a !== null ? (a.return = l, Zl = a) : (u && gy(l), yf(u));
      }
    }
    St = null;
  }
  function yf(l) {
    for (; Zl !== null; ) {
      var t = Zl, u = l, a = t.alternate, e = t.flags;
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
              var f = va(
                t.type,
                e
              );
              u = n.getSnapshotBeforeUpdate(
                f,
                a
              ), n.__reactInternalSnapshotBeforeUpdate = u;
            } catch (c) {
              il(t, t.return, c);
            }
          }
          break;
        case 3:
          if ((e & 1024) !== 0) {
            if (a = t.stateNode.containerInfo, u = a.nodeType, u === 9)
              f0(a);
            else if (u === 1)
              switch (a.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  f0(a);
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
          u && a !== null && (u = au(
            a.memoizedProps,
            a.stateNode
          ), e = t.memoizedProps, e = eu(e.default, e.update), e !== "none" && Va(
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
        a.return = t.return, Zl = a;
        break;
      }
      Zl = t.return;
    }
  }
  function Ey(l, t, u) {
    var a = u.flags;
    switch (u.tag) {
      case 0:
      case 11:
      case 15:
        Ft(l, u), a & 4 && Qe(5, u);
        break;
      case 1:
        if (Ft(l, u), a & 4)
          if (l = u.stateNode, t === null)
            try {
              l.componentDidMount();
            } catch (f) {
              il(u, u.return, f);
            }
          else {
            var e = va(
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
              il(
                u,
                u.return,
                f
              );
            }
          }
        a & 64 && iy(u), a & 512 && Lt(u, u.return);
        break;
      case 3:
        if (Ft(l, u), a & 64 && (l = u.updateQueue, l !== null)) {
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
            Io(l, t);
          } catch (f) {
            il(u, u.return, f);
          }
        }
        break;
      case 27:
        t === null && a & 4 && my(u);
      case 26:
      case 5:
        Ft(l, u), t === null && a & 4 && ri(u), a & 512 && Lt(u, u.return);
        break;
      case 12:
        Ft(l, u);
        break;
      case 31:
        Ft(l, u), a & 4 && Oy(l, u);
        break;
      case 13:
        Ft(l, u), a & 4 && Ay(l, u), a & 64 && (l = u.memoizedState, l !== null && (l = l.dehydrated, l !== null && (u = t1.bind(
          null,
          u
        ), G1(l, u))));
        break;
      case 22:
        if (a = u.memoizedState !== null || jl, !a) {
          var n = t !== null && t.memoizedState !== null || el;
          t = jl, e = el, jl = a, (el = n) && !e ? (a = 2, (u.subtreeFlags & 8772) !== 0 && (a |= 1), Gt(
            l,
            u,
            a
          )) : Ft(l, u), jl = t, el = e;
        }
        break;
      case 30:
        Ft(l, u), a & 512 && Lt(u, u.return);
        break;
      case 7:
        a & 512 && Lt(u, u.return);
      default:
        Ft(l, u);
    }
  }
  function Di(l, t) {
    for (l = l.child; l !== null; )
      zy(l, t), l = l.sibling;
  }
  function zy(l, t) {
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
          il(l, l.return, i);
        }
        Ui(l, t);
        break;
      case 6:
        try {
          l.stateNode.nodeValue = t ? "" : l.memoizedProps, P = !0;
        } catch (i) {
          il(l, l.return, i);
        }
        break;
      case 18:
        try {
          var c = l.stateNode;
          t ? sm(c, !0) : sm(l.stateNode, !1);
        } catch (i) {
          il(l, l.return, i);
        }
        break;
      case 22:
      case 23:
        l.memoizedState === null && Di(l, t);
        break;
      default:
        Di(l, t);
    }
  }
  function Ui(l, t) {
    if (l.subtreeFlags & 67108864)
      for (l = l.child; l !== null; ) {
        l: {
          var u = l, a = t;
          switch (u.tag) {
            case 4:
              zy(u, a);
              break l;
            case 22:
              u.memoizedState === null && Ui(u, a);
              break l;
            default:
              Ui(u, a);
          }
        }
        l = l.sibling;
      }
  }
  function by(l) {
    var t = l.alternate;
    t !== null && (l.alternate = null, by(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && hn(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var zl = null, it = !1;
  function qt(l, t, u) {
    for (u = u.child; u !== null; )
      _y(l, t, u), u = u.sibling;
  }
  function _y(l, t, u) {
    if (st && typeof st.onCommitFiberUnmount == "function")
      try {
        st.onCommitFiberUnmount(oe, u);
      } catch {
      }
    switch (u.tag) {
      case 26:
        el || wl(u, t), qt(
          l,
          t,
          u
        ), u.memoizedState ? u.memoizedState.count-- : u.stateNode && !el && (u = u.stateNode, u.parentNode.removeChild(u));
        break;
      case 27:
        el || wl(u, t), je(u);
        var a = zl, e = it;
        ju(u.type) && (zl = u.stateNode, it = !1), qt(
          l,
          t,
          u
        ), Mm(
          u.stateNode,
          u.type,
          u.memoizedProps
        ), zl = a, it = e;
        break;
      case 5:
        el || wl(u, t), je(u);
      case 6:
        if (u.tag === 6 && je(u), a = zl, e = it, zl = null, qt(
          l,
          t,
          u
        ), zl = a, it = e, zl !== null)
          if (it)
            try {
              (zl.nodeType === 9 ? zl.body : zl.nodeName === "HTML" ? zl.ownerDocument.body : zl).removeChild(u.stateNode), P = !0;
            } catch (n) {
              il(
                u,
                t,
                n
              );
            }
          else
            try {
              zl.removeChild(u.stateNode), P = !0;
            } catch (n) {
              il(
                u,
                t,
                n
              );
            }
        break;
      case 18:
        zl !== null && (it ? (l = zl, mm(
          l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
          u.stateNode
        ), fe(l)) : mm(zl, u.stateNode));
        break;
      case 4:
        a = zl, e = it, zl = u.stateNode.containerInfo, it = !0, qt(
          l,
          t,
          u
        ), zl = a, it = e;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Hu(2, u, t), el || Hu(4, u, t), qt(
          l,
          t,
          u
        );
        break;
      case 1:
        el || (wl(u, t), a = u.stateNode, typeof a.componentWillUnmount == "function" && oy(
          u,
          t,
          a
        )), qt(
          l,
          t,
          u
        );
        break;
      case 21:
        qt(
          l,
          t,
          u
        );
        break;
      case 22:
        el = (a = el) || u.memoizedState !== null, qt(
          l,
          t,
          u
        ), el = a;
        break;
      case 30:
        wl(u, t), qt(
          l,
          t,
          u
        );
        break;
      case 7:
        el || wl(u, t), qt(
          l,
          t,
          u
        );
        break;
      default:
        qt(
          l,
          t,
          u
        );
    }
  }
  function Oy(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        fe(l);
      } catch (u) {
        il(t, t.return, u);
      }
    }
  }
  function Ay(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        fe(l);
      } catch (u) {
        il(t, t.return, u);
      }
  }
  function Ld(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new Ty()), t;
      case 22:
        return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new Ty()), t;
      default:
        throw Error(g(435, l.tag));
    }
  }
  function mf(l, t) {
    var u = Ld(l);
    t.forEach(function(a) {
      if (!u.has(a)) {
        u.add(a);
        var e = u1.bind(null, l, a);
        a.then(e, e);
      }
    });
  }
  function ut(l, t, u) {
    var a = t.deletions;
    if (a !== null)
      for (var e = 0; e < a.length; e++) {
        var n = a[e], f = l, c = t, i = c;
        l: for (; i !== null; ) {
          switch (i.tag) {
            case 27:
              if (ju(i.type)) {
                zl = i.stateNode, it = !1;
                break l;
              }
              break;
            case 5:
              zl = i.stateNode, it = !1;
              break l;
            case 3:
            case 4:
              zl = i.stateNode.containerInfo, it = !0;
              break l;
          }
          i = i.return;
        }
        if (zl === null) throw Error(g(160));
        _y(f, c, n), zl = null, it = !1, f = n.alternate, f !== null && (f.return = null), n.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Ny(t, l, u), t = t.sibling;
  }
  var Bt = null;
  function Ny(l, t, u) {
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
        ut(t, l, u), at(l), e & 4 && (Hu(3, l, l.return), Qe(3, l), Hu(5, l, l.return));
        break;
      case 1:
        ut(t, l, u), at(l), e & 512 && (el || a === null || wl(a, a.return)), e & 64 && jl && (l = l.updateQueue, l !== null && (t = l.callbacks, t !== null && (u = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = u === null ? t : u.concat(t))));
        break;
      case 26:
        if (n = Bt, ut(t, l, u), at(l), e & 512 && (el || a === null || wl(a, a.return)), e & 4)
          if (e = a !== null ? a.memoizedState : null, u = l.memoizedState, a === null)
            if (u === null)
              if (l.stateNode === null)
                if (jl)
                  l.stateNode = om(
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
                        a = e.getElementsByTagName("title")[0], (!a || a[me] || a[xl] || a.namespaceURI === "http://www.w3.org/2000/svg" || a.hasAttribute("itemprop")) && (a = e.createElement(t), e.head.insertBefore(
                          a,
                          e.querySelector("head > title")
                        )), $l(a, t, u), a[xl] = l, Xl(a), t = a;
                        break l;
                      case "link":
                        if (n = Ym(
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
                        a = e.createElement(t), $l(a, t, u), e.head.appendChild(a);
                        break;
                      case "meta":
                        if (n = Ym(
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
                        a = e.createElement(t), $l(a, t, u), e.head.appendChild(a);
                        break;
                      default:
                        throw Error(g(468, t));
                    }
                    a[xl] = l, Xl(a), t = a;
                  }
                  l.stateNode = t;
                }
              else
                jl || s0(n, l.type, l.stateNode);
            else
              l.stateNode = Hm(
                n,
                u,
                l.memoizedProps
              );
          else
            e !== u ? (e === null ? (t = a.stateNode, t === null || el || t.parentNode.removeChild(t)) : e.count--, u === null ? jl || s0(n, l.type, l.stateNode) : Hm(n, u, l.memoizedProps)) : u === null && l.stateNode !== null && Si(
              l,
              l.memoizedProps,
              a.memoizedProps
            );
        break;
      case 27:
        ut(t, l, u), at(l), e & 512 && (el || a === null || wl(a, a.return)), a !== null && e & 4 && Si(
          l,
          l.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (n = wt, wt = !1, ut(t, l, u), wt = n, at(l), e & 512 && (el || a === null || wl(a, a.return)), l.flags & 32) {
          t = l.stateNode;
          try {
            _a(t, ""), P = !0;
          } catch (r) {
            il(l, l.return, r);
          }
        }
        e & 4 && l.stateNode != null && (t = l.memoizedProps, Si(
          l,
          t,
          a !== null ? a.memoizedProps : t
        )), e & 1024 && (Ni = !0);
        break;
      case 6:
        if (ut(t, l, u), at(l), e & 4) {
          if (l.stateNode === null)
            throw Error(g(162));
          t = l.memoizedProps, u = l.stateNode;
          try {
            u.nodeValue = t, P = !0;
          } catch (r) {
            il(l, l.return, r);
          }
        }
        break;
      case 3:
        if (P = !1, Mf = null, n = Bt, Bt = Fe(t.containerInfo), ut(t, l, u), Bt = n, at(l), e & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            fe(t.containerInfo);
          } catch (r) {
            il(l, l.return, r);
          }
        Ni && (Ni = !1, My(l)), P = !1;
        break;
      case 4:
        e = wt, wt = jl, a = J0(), n = Bt, Bt = Fe(
          l.stateNode.containerInfo
        ), ut(t, l, u), at(l), Bt = n, P && Ze && (vf = !0), P = a, wt = e;
        break;
      case 12:
        ut(t, l, u), at(l);
        break;
      case 31:
        ut(t, l, u), at(l), e & 4 && (t = l.updateQueue, t !== null && (l.updateQueue = null, mf(l, t)));
        break;
      case 13:
        ut(t, l, u), at(l), l.child.flags & 8192 && l.memoizedState !== null != (a !== null && a.memoizedState !== null) && (hf = mt()), e & 4 && (t = l.updateQueue, t !== null && (l.updateQueue = null, mf(l, t)));
        break;
      case 22:
        n = l.memoizedState !== null, f = a !== null && a.memoizedState !== null;
        var c = jl, i = el, s = wt;
        jl = c || n, wt = s || n, el = i || f, ut(t, l, u), el = i, wt = s, jl = c, at(l), e & 8192 && (t = l.stateNode, t._visibility = n ? t._visibility & -2 : t._visibility | 1, !n || a === null || f || jl || el || (t = f || el, u = jl, a = el, jl = n || jl, el = t, Yu(l, 2), jl = u, el = a), !n && wt || Di(l, n)), e & 4 && (t = l.updateQueue, t !== null && (u = t.retryQueue, u !== null && (t.retryQueue = null, mf(l, u))));
        break;
      case 19:
        ut(t, l, u), at(l), e & 4 && (t = l.updateQueue, t !== null && (l.updateQueue = null, mf(l, t)));
        break;
      case 30:
        e & 512 && (el || a === null || wl(a, a.return)), e = J0(), n = Ze, f = (u & 335544064) === u, c = l.memoizedProps, Ze = f && eu(
          c.default,
          c.update
        ) !== "none", ut(t, l, u), at(l), f && a !== null && P && (l.flags |= 4), Ze = n, P = e;
        break;
      case 21:
        break;
      case 7:
        e & 512 && (el || a === null || wl(a, a.return)), a && a.stateNode !== null && (a.stateNode._fragmentFiber = l);
      default:
        ut(t, l, u), at(l);
    }
  }
  function at(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var u, a = l.return; a !== null; ) {
          if (yy(a)) {
            u = a;
            break;
          }
          a = a.return;
        }
        a = null;
        for (var e = l.return; e !== null; ) {
          if (gi(e)) {
            var n = e.stateNode;
            a === null ? a = [n] : a.push(n);
          }
          if (hi(e)) break;
          e = e.return;
        }
        var f = a;
        if (u == null) throw Error(g(160));
        switch (u.tag) {
          case 27:
            var c = u.stateNode, i = Ti(l);
            nf(
              l,
              i,
              c,
              f
            );
            break;
          case 5:
            var s = u.stateNode;
            u.flags & 32 && (_a(s, ""), u.flags &= -33);
            var r = Ti(l);
            nf(
              l,
              r,
              s,
              f
            );
            break;
          case 3:
          case 4:
            var E = u.stateNode.containerInfo, y = Ti(l);
            Ei(
              l,
              y,
              E,
              f
            );
            break;
          default:
            throw Error(g(161));
        }
      } catch (h) {
        il(l, l.return, h);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function My(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        My(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, ne = !0, t.reset(), ne = !1), l = l.sibling;
      }
  }
  function pa(l, t) {
    if (t.subtreeFlags & 9270)
      for (t = t.child; t !== null; )
        Dy(t, l), t = t.sibling;
    else Sy(t);
  }
  function Dy(l, t) {
    var u = l.alternate;
    if (u === null) zi(l, !1);
    else
      switch (l.tag) {
        case 3:
          if (Mi = $t = !1, dy(), pa(t, l), !$t && !vf) {
            if (l = Kt, l !== null)
              for (var a = 0; a < l.length; a += 3) {
                u = l[a];
                var e = l[a + 1];
                hm(u, l[a + 2]), u = u.ownerDocument.documentElement, u !== null && u.animate(
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
            )), Mi = !0;
          }
          Kt = null;
          break;
        case 5:
          pa(t, l);
          break;
        case 4:
          a = $t, $t = !1, pa(t, l), $t && (vf = !0), $t = a;
          break;
        case 22:
          l.memoizedState === null && (u.memoizedState !== null ? zi(l, !1) : pa(t, l));
          break;
        case 30:
          a = $t, e = dy(), $t = !1, pa(t, l), $t && (l.flags |= 4);
          var n = l.memoizedProps, f = l.stateNode;
          t = au(n, f), f = au(u.memoizedProps, f);
          var c = eu(n.default, n.update);
          c === "none" ? t = !1 : (n = u.memoizedState, u.memoizedState = null, u = l.child, ct = 0, t = Ai(
            l,
            u,
            t,
            f,
            c,
            n,
            !0
          ), ct !== (n === null ? 0 : n.length) && (l.flags |= 32)), (l.flags & 4) !== 0 && t ? (Fa(
            l,
            l.memoizedProps.onUpdate
          ), Kt = e) : e !== null && (e.push.apply(e, Kt), Kt = e), $t = (l.flags & 32) !== 0 ? !0 : a;
          break;
        default:
          pa(t, l);
      }
  }
  function Ft(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Ey(l, t.alternate, t), t = t.sibling;
  }
  function Yu(l, t) {
    for (l = l.child; l !== null; ) {
      var u = l, a = t;
      switch (u.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Hu(4, u, u.return), Yu(
            u,
            a
          );
          break;
        case 1:
          wl(u, u.return);
          var e = u.stateNode;
          typeof e.componentWillUnmount == "function" && oy(
            u,
            u.return,
            e
          ), Yu(
            u,
            a
          );
          break;
        case 27:
          (a & 2) !== 0 && Mm(
            u.stateNode,
            u.type,
            u.memoizedProps
          );
        case 5:
          wl(u, u.return), u.tag !== 5 && u.tag !== 27 || je(u), Yu(
            u,
            a
          );
          break;
        case 6:
          je(u);
          break;
        case 26:
          wl(u, u.return), e = u.stateNode, u.memoizedState !== null || e === null || el || e.parentNode.removeChild(e), Yu(
            u,
            a
          );
          break;
        case 22:
          u.memoizedState === null && Yu(
            u,
            a
          );
          break;
        case 30:
          wl(u, u.return), Yu(
            u,
            a
          );
          break;
        case 7:
          wl(u, u.return);
        default:
          Yu(
            u,
            a
          );
      }
      l = l.sibling;
    }
  }
  function Gt(l, t, u) {
    for (u = (t.subtreeFlags & 8772) !== 0 ? u : u & -2, t = t.child; t !== null; ) {
      var a = t.alternate, e = l, n = t, f = n.flags, c = (u & 1) !== 0;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Gt(
            e,
            n,
            u
          ), Qe(4, n);
          break;
        case 1:
          if (Gt(
            e,
            n,
            u
          ), a = n, e = a.stateNode, typeof e.componentDidMount == "function")
            try {
              e.componentDidMount();
            } catch (r) {
              il(a, a.return, r);
            }
          if (a = n, e = a.updateQueue, e !== null) {
            var i = a.stateNode;
            try {
              var s = e.shared.hiddenCallbacks;
              if (s !== null)
                for (e.shared.hiddenCallbacks = null, e = 0; e < s.length; e++)
                  Wo(s[e], i);
            } catch (r) {
              il(a, a.return, r);
            }
          }
          c && f & 64 && iy(n), Lt(n, n.return);
          break;
        case 27:
          (u & 2) !== 0 && my(n);
        case 5:
          n.tag !== 5 && n.tag !== 27 || vy(n), Gt(
            e,
            n,
            u
          ), c && a === null && f & 4 && ri(n), Lt(n, n.return);
          break;
        case 6:
          vy(n);
          break;
        case 26:
          i = n.stateNode, n.memoizedState !== null || i === null || jl || s0(
            Fe(i.ownerDocument),
            n.type,
            i
          ), Gt(
            e,
            n,
            u
          ), c && a === null && f & 4 && ri(n), Lt(n, n.return);
          break;
        case 12:
          Gt(
            e,
            n,
            u
          );
          break;
        case 31:
          Gt(
            e,
            n,
            u
          ), c && f & 4 && Oy(e, n);
          break;
        case 13:
          Gt(
            e,
            n,
            u
          ), c && f & 4 && Ay(e, n);
          break;
        case 22:
          n.memoizedState === null && Gt(
            e,
            n,
            u
          ), Lt(n, n.return);
          break;
        case 30:
          Gt(
            e,
            n,
            u
          ), Lt(n, n.return);
          break;
        case 7:
          Lt(n, n.return);
        default:
          Gt(
            e,
            n,
            u
          );
      }
      t = t.sibling;
    }
  }
  function Ci(l, t) {
    var u = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== u && (l != null && l.refCount++, u != null && Ae(u));
  }
  function Ri(l, t) {
    l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Ae(l));
  }
  function Ut(l, t, u, a) {
    var e = (u & 335544064) === u;
    if (t.subtreeFlags & (e ? 10262 : 10256))
      for (t = t.child; t !== null; )
        Uy(
          l,
          t,
          u,
          a
        ), t = t.sibling;
    else e && ry(t);
  }
  function Uy(l, t, u, a) {
    var e = (u & 335544064) === u;
    e && t.alternate === null && t.return !== null && t.return.alternate !== null && of(t);
    var n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Ut(
          l,
          t,
          u,
          a
        ), n & 2048 && Qe(9, t);
        break;
      case 1:
        Ut(
          l,
          t,
          u,
          a
        );
        break;
      case 3:
        Ut(
          l,
          t,
          u,
          a
        ), e && Mi && (l = l.containerInfo, l = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, l.style.viewTransitionName === "root" && (l.style.viewTransitionName = ""), l = l.ownerDocument.documentElement, l !== null && l.style.viewTransitionName === "none" && (l.style.viewTransitionName = "")), n & 2048 && (n = null, t.alternate !== null && (n = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== n && (t.refCount++, n != null && Ae(n)));
        break;
      case 12:
        if (n & 2048) {
          Ut(
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
          } catch (s) {
            il(t, t.return, s);
          }
        } else
          Ut(
            l,
            t,
            u,
            a
          );
        break;
      case 31:
        Ut(
          l,
          t,
          u,
          a
        );
        break;
      case 13:
        Ut(
          l,
          t,
          u,
          a
        );
        break;
      case 23:
        break;
      case 22:
        f = t.stateNode, c = t.alternate, t.memoizedState !== null ? (e && c !== null && c.memoizedState === null && of(c), f._visibility & 2 ? Ut(
          l,
          t,
          u,
          a
        ) : Ve(
          l,
          t
        )) : (e && c !== null && c.memoizedState !== null && of(t), f._visibility & 2 ? Ut(
          l,
          t,
          u,
          a
        ) : (f._visibility |= 2, xa(
          l,
          t,
          u,
          a,
          (t.subtreeFlags & 10256) !== 0 || !1
        ))), n & 2048 && Ci(c, t);
        break;
      case 24:
        Ut(
          l,
          t,
          u,
          a
        ), n & 2048 && Ri(t.alternate, t);
        break;
      case 30:
        e && (n = t.alternate, n !== null && (Jt(n.child, !0), Jt(t.child, !0))), Ut(
          l,
          t,
          u,
          a
        );
        break;
      default:
        Ut(
          l,
          t,
          u,
          a
        );
    }
  }
  function xa(l, t, u, a, e) {
    for (e = e && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var n = l, f = t, c = u, i = a, s = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          xa(
            n,
            f,
            c,
            i,
            e
          ), Qe(8, f);
          break;
        case 23:
          break;
        case 22:
          var r = f.stateNode;
          f.memoizedState !== null ? r._visibility & 2 ? xa(
            n,
            f,
            c,
            i,
            e
          ) : Ve(
            n,
            f
          ) : (r._visibility |= 2, xa(
            n,
            f,
            c,
            i,
            e
          )), e && s & 2048 && Ci(
            f.alternate,
            f
          );
          break;
        case 24:
          xa(
            n,
            f,
            c,
            i,
            e
          ), e && s & 2048 && Ri(f.alternate, f);
          break;
        default:
          xa(
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
  function Ve(l, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var u = l, a = t, e = a.flags;
        switch (a.tag) {
          case 22:
            Ve(u, a), e & 2048 && Ci(
              a.alternate,
              a
            );
            break;
          case 24:
            Ve(u, a), e & 2048 && Ri(a.alternate, a);
            break;
          default:
            Ve(u, a);
        }
        t = t.sibling;
      }
  }
  var ya = 8192;
  function ma(l, t, u) {
    if (l.subtreeFlags & ya)
      for (l = l.child; l !== null; )
        Cy(
          l,
          t,
          u
        ), l = l.sibling;
  }
  function Cy(l, t, u) {
    switch (l.tag) {
      case 26:
        ma(
          l,
          t,
          u
        ), l.flags & ya && (l.memoizedState !== null ? W1(
          u,
          Bt,
          l.memoizedState,
          l.memoizedProps
        ) : (l = l.stateNode, (t & 335544128) === t && Xm(u, l)));
        break;
      case 5:
        ma(
          l,
          t,
          u
        ), l.flags & ya && (l = l.stateNode, (t & 335544128) === t && Xm(u, l));
        break;
      case 3:
      case 4:
        var a = Bt;
        Bt = Fe(l.stateNode.containerInfo), ma(
          l,
          t,
          u
        ), Bt = a;
        break;
      case 22:
        l.memoizedState === null && (a = l.alternate, a !== null && a.memoizedState !== null ? (a = ya, ya = 16777216, ma(
          l,
          t,
          u
        ), ya = a) : ma(
          l,
          t,
          u
        ));
        break;
      case 30:
        if ((l.flags & ya) !== 0 && (a = l.memoizedProps.name, a != null && a !== "auto")) {
          var e = l.stateNode;
          e.paired = null, St === null && (St = /* @__PURE__ */ new Map()), St.set(a, e);
        }
        ma(
          l,
          t,
          u
        );
        break;
      default:
        ma(
          l,
          t,
          u
        );
    }
  }
  function Ry(l) {
    var t = l.alternate;
    if (t !== null && (l = t.child, l !== null)) {
      t.child = null;
      do
        t = l.sibling, l.sibling = null, l = t;
      while (l !== null);
    }
  }
  function pe(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var u = 0; u < t.length; u++) {
          var a = t[u];
          Zl = a, Yy(
            a,
            l
          );
        }
      Ry(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        Hy(l), l = l.sibling;
  }
  function Hy(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        pe(l), l.flags & 2048 && Hu(9, l, l.return);
        break;
      case 3:
        pe(l);
        break;
      case 12:
        pe(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, sf(l)) : pe(l);
        break;
      default:
        pe(l);
    }
  }
  function sf(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var u = 0; u < t.length; u++) {
          var a = t[u];
          Zl = a, Yy(
            a,
            l
          );
        }
      Ry(l);
    }
    for (l = l.child; l !== null; ) {
      switch (t = l, t.tag) {
        case 0:
        case 11:
        case 15:
          Hu(8, t, t.return), sf(t);
          break;
        case 22:
          u = t.stateNode, u._visibility & 2 && (u._visibility &= -3, sf(t));
          break;
        default:
          sf(t);
      }
      l = l.sibling;
    }
  }
  function Yy(l, t) {
    for (; Zl !== null; ) {
      var u = Zl;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          Hu(8, u, t);
          break;
        case 23:
        case 22:
          if (u.memoizedState !== null && u.memoizedState.cachePool !== null) {
            var a = u.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Ae(u.memoizedState.cache);
      }
      if (a = u.child, a !== null) a.return = u, Zl = a;
      else
        l: for (u = l; Zl !== null; ) {
          a = Zl;
          var e = a.sibling, n = a.return;
          if (by(a), a === u) {
            Zl = null;
            break l;
          }
          if (e !== null) {
            e.return = n, Zl = e;
            break l;
          }
          Zl = n;
        }
    }
  }
  var Kd = {
    getCacheForType: function(l) {
      var t = Ll(Dl), u = t.data.get(l);
      return u === void 0 && (u = l(), t.data.set(l, u)), u;
    },
    cacheSignal: function() {
      return Ll(Dl).controller.signal;
    }
  }, Jd = typeof WeakMap == "function" ? WeakMap : Map, tl = 0, hl = null, K = null, w = 0, cl = 0, Tt = null, qu = !1, La = !1, Hi = !1, su = 0, Nl = 0, Bu = 0, sa = 0, df = 0, Et = 0, Ka = 0, xe = null, ot = null, Yi = !1, hf = 0, qy = 0, gf = 1 / 0, rf = null, Gu = null, _l = 0, Xt = null, da = null, Wt = 0, qi = 0, Bi = null, By = null, Ja = null, wa = null, $a = null, Le = 0, Sf = null;
  function zt() {
    return (tl & 2) !== 0 && w !== 0 ? w & -w : M.T !== null ? Ki() : X0();
  }
  function Gy() {
    if (Et === 0)
      if ((w & 536870912) === 0 || L) {
        var l = yn;
        yn <<= 1, (yn & 3932160) === 0 && (yn = 262144), Et = l;
      } else Et = 536870912;
    return l = Kl.current, l !== null && (l.flags |= 32), Et;
  }
  function Fa(l, t) {
    if (t != null) {
      var u = l.stateNode, a = u.ref;
      a === null && (a = u.ref = gm(
        au(l.memoizedProps, u)
      )), wa === null && (wa = []), wa.push(t.bind(null, a));
    }
  }
  function vt(l, t, u) {
    (l === hl && (cl === 2 || cl === 9) || l.cancelPendingCommit !== null) && (Wa(l, 0), Xu(
      l,
      w,
      Et,
      !1
    )), ye(l, u), ((tl & 2) === 0 || l !== hl) && (l === hl && ((tl & 2) === 0 && (sa |= u), Nl === 4 && Xu(
      l,
      w,
      Et,
      !1
    )), It(l));
  }
  function Xy(l, t, u) {
    if ((tl & 6) !== 0) throw Error(g(327));
    var a = !u && (t & 127) === 0 && (t & l.expiredLanes) === 0 || ve(l, t), e = a ? Fd(l, t) : Xi(l, t, !0), n = a;
    do {
      if (e === 0) {
        La && !a && Xu(l, t, 0, !1);
        break;
      } else {
        if (u = l.current.alternate, n && !wd(u)) {
          e = Xi(l, t, !1), n = !1;
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
              e = xe;
              var i = c.current.memoizedState.isDehydrated;
              if (i && (Wa(c, f).flags |= 256), f = Xi(
                c,
                f,
                !1
              ), f !== 2 && f !== 6) {
                if (Hi && !i) {
                  c.errorRecoveryDisabledLanes |= n, sa |= n, e = 4;
                  break l;
                }
                n = ot, ot = e, n !== null && (ot === null ? ot = n : ot.push.apply(
                  ot,
                  n
                ));
              }
              e = f;
            }
            if (n = !1, e !== 2) continue;
          }
        }
        if (e === 1) {
          Wa(l, 0), Xu(l, t, 0, !0);
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
                Et,
                !qu
              );
              break l;
            case 2:
              ot = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(g(329));
          }
          if ((t & 62914560) === t && (e = hf + 300 - mt(), 10 < e)) {
            if (Xu(
              a,
              t,
              Et,
              !qu
            ), sn(a, 0, !0) !== 0) break l;
            Wt = t, a.timeoutHandle = u0(
              Qy.bind(
                null,
                a,
                u,
                ot,
                rf,
                Yi,
                t,
                Et,
                sa,
                Ka,
                qu,
                n,
                "Throttled",
                -0,
                0
              ),
              e
            );
            break l;
          }
          Qy(
            a,
            u,
            ot,
            rf,
            Yi,
            t,
            Et,
            sa,
            Ka,
            qu,
            n,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    It(l);
  }
  function Qy(l, t, u, a, e, n, f, c, i, s, r, E, y, h) {
    l.timeoutHandle = -1;
    var _ = t.subtreeFlags, N = (n & 335544064) === n;
    if (E = null, (N || _ & 8192 || (_ & 16785408) === 16785408) && (E = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: Vt
    }, St = null, Cy(
      t,
      n,
      E
    ), N && (_ = E, N = l.containerInfo, N = (N.nodeType === 9 ? N : N.ownerDocument).__reactViewTransition, N != null && (_.count++, _.waitingForViewTransition = !0, _ = ke.bind(_), N.finished.then(_, _))), _ = (n & 62914560) === n ? hf - mt() : (n & 4194048) === n ? qy - mt() : 0, _ = I1(
      E,
      _
    ), _ !== null)) {
      Wt = n, l.cancelPendingCommit = _(
        Jy.bind(
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
          s,
          r,
          E,
          null,
          y,
          h
        )
      ), Xu(l, n, f, !s);
      return;
    }
    Jy(
      l,
      t,
      n,
      u,
      a,
      e,
      f,
      c,
      i,
      s,
      r,
      E
    );
  }
  function wd(l) {
    for (var t = l; ; ) {
      var u = t.tag;
      if ((u === 0 || u === 11 || u === 15) && t.flags & 16384 && (u = t.updateQueue, u !== null && (u = u.stores, u !== null)))
        for (var a = 0; a < u.length; a++) {
          var e = u[a], n = e.getSnapshot;
          e = e.value;
          try {
            if (!gt(n(), e)) return !1;
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
    t = H0(l, t), t &= ~df, t &= ~sa, l.suspendedLanes |= t, l.pingedLanes &= ~t, a && (l.warmLanes |= t), a = l.expirationTimes;
    for (var e = t; 0 < e; ) {
      var n = 31 - dt(e), f = 1 << n;
      a[n] = -1, e &= ~f;
    }
    u !== 0 && q0(l, u, t);
  }
  function Tf() {
    return (tl & 6) === 0 ? (Ke(0), !1) : !0;
  }
  function Gi() {
    if (K !== null) {
      if (cl === 0)
        var l = K.return;
      else
        l = K, cu = ta = null, Lc(l), Ga = null, De = 0, l = K;
      for (; l !== null; )
        cy(l.alternate, l), l = l.return;
      K = null;
    }
  }
  function Wa(l, t) {
    var u = l.timeoutHandle;
    return u !== -1 && (l.timeoutHandle = -1, r1(u)), u = l.cancelPendingCommit, u !== null && (l.cancelPendingCommit = null, u()), Wt = 0, Gi(), hl = l, K = u = nu(l.current, null), w = t, cl = 0, Tt = null, qu = !1, La = ve(l, t), Hi = !1, Ka = Et = df = sa = Bu = Nl = 0, ot = xe = null, Yi = !1, su = H0(l, t), Nn(), u;
  }
  function jy(l, t) {
    V = null, M.H = In, t === Ba || t === Xn ? (t = Jo(), cl = 3) : t === Rc ? (t = Jo(), cl = 4) : cl = t === ni ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Tt = t, K === null && (Nl = 1, kn(
      l,
      At(t, l.current)
    ));
  }
  function Zy() {
    var l = Kl.current;
    return l === null ? !0 : (w & 4194048) === w ? kl === null : (w & 62914560) === w || (w & 536870912) !== 0 ? l === kl : !1;
  }
  function Vy() {
    var l = M.H;
    return M.H = In, l === null ? In : l;
  }
  function py() {
    var l = M.A;
    return M.A = Kd, l;
  }
  function Ef() {
    Nl = 4, qu || (w & 4194048) !== w && Kl.current !== null || (La = !0), (Bu & 134217727) === 0 && (sa & 134217727) === 0 || hl === null || Xu(
      hl,
      w,
      Et,
      !1
    );
  }
  function Xi(l, t, u) {
    var a = tl;
    tl |= 2;
    var e = Vy(), n = py();
    (hl !== l || w !== t) && (rf = null, Wa(l, t)), t = !1;
    var f = Nl;
    l: do
      try {
        if (cl !== 0 && K !== null) {
          var c = K, i = Tt;
          switch (cl) {
            case 8:
              Gi(), f = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              Kl.current === null && (t = !0);
              var s = cl;
              if (cl = 0, Tt = null, Ia(l, c, i, s), u && La) {
                f = 0;
                break l;
              }
              break;
            default:
              s = cl, cl = 0, Tt = null, Ia(l, c, i, s);
          }
        }
        $d(), f = Nl;
        break;
      } catch (r) {
        jy(l, r);
      }
    while (!0);
    return t && l.shellSuspendCounter++, cu = ta = null, tl = a, M.H = e, M.A = n, K === null && (hl = null, w = 0, Nn()), f;
  }
  function $d() {
    for (; K !== null; ) xy(K);
  }
  function Fd(l, t) {
    var u = tl;
    tl |= 2;
    var a = Vy(), e = py();
    hl !== l || w !== t ? (rf = null, gf = mt() + 500, Wa(l, t)) : La = ve(
      l,
      t
    );
    l: do
      try {
        if (cl !== 0 && K !== null) {
          t = K;
          var n = Tt;
          t: switch (cl) {
            case 1:
              cl = 0, Tt = null, Ia(l, t, n, 1);
              break;
            case 2:
            case 9:
              if (Lo(n)) {
                cl = 0, Tt = null, Ly(t);
                break;
              }
              t = function() {
                cl !== 2 && cl !== 9 || hl !== l || (cl = 7), It(l);
              }, n.then(t, t);
              break l;
            case 3:
              cl = 7;
              break l;
            case 4:
              cl = 5;
              break l;
            case 7:
              Lo(n) ? (cl = 0, Tt = null, Ly(t)) : (cl = 0, Tt = null, Ia(l, t, n, 7));
              break;
            case 5:
              var f = null;
              switch (K.tag) {
                case 26:
                  f = K.memoizedState;
                case 5:
                case 27:
                  var c = K;
                  if (f ? Bm(f) : c.stateNode.complete) {
                    cl = 0, Tt = null;
                    var i = c.sibling;
                    if (i !== null) K = i;
                    else {
                      var s = c.return;
                      s !== null ? (K = s, zf(s)) : K = null;
                    }
                    break t;
                  }
              }
              cl = 0, Tt = null, Ia(l, t, n, 5);
              break;
            case 6:
              cl = 0, Tt = null, Ia(l, t, n, 6);
              break;
            case 8:
              Gi(), Nl = 6;
              break l;
            default:
              throw Error(g(462));
          }
        }
        Wd();
        break;
      } catch (r) {
        jy(l, r);
      }
    while (!0);
    return cu = ta = null, M.H = a, M.A = e, tl = u, K !== null ? 0 : (hl = null, w = 0, Nn(), Nl);
  }
  function Wd() {
    for (; K !== null && !ss(); )
      xy(K);
  }
  function xy(l) {
    var t = ny(l.alternate, l, su);
    l.memoizedProps = l.pendingProps, t === null ? zf(l) : K = t;
  }
  function Ly(l) {
    var t = l, u = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = kv(
          u,
          t,
          t.pendingProps,
          t.type,
          void 0,
          w
        );
        break;
      case 11:
        t = kv(
          u,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          w
        );
        break;
      case 5:
        Lc(t);
        var a = t;
        a === Ql && (L ? (Hn(a), a.tag === 5 && a.stateNode != null && (rl = a.stateNode)) : (Hn(a), L = !0));
      default:
        cy(u, t), t = K = Yo(t, su), t = ny(u, t, su);
    }
    l.memoizedProps = l.pendingProps, t === null ? zf(l) : K = t;
  }
  function Ia(l, t, u, a) {
    cu = ta = null, Lc(t), Ga = null, De = 0;
    var e = t.return;
    try {
      if (Xd(
        l,
        e,
        t,
        u,
        w
      )) {
        Nl = 1, kn(
          l,
          At(u, l.current)
        ), K = null;
        return;
      }
    } catch (n) {
      if (e !== null) throw K = e, n;
      Nl = 1, kn(
        l,
        At(u, l.current)
      ), K = null;
      return;
    }
    t.flags & 32768 ? (L || a === 1 ? l = !0 : La || (w & 536870912) !== 0 ? l = !1 : (qu = l = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Kl.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Ky(t, l)) : zf(t);
  }
  function zf(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        Ky(
          t,
          qu
        );
        return;
      }
      l = t.return;
      var u = Vd(
        t.alternate,
        t,
        su
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
    Nl === 0 && (Nl = 5);
  }
  function Ky(l, t) {
    do {
      var u = pd(l.alternate, l);
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
    Nl = 6, K = null;
  }
  function Jy(l, t, u, a, e, n, f, c, i, s, r, E) {
    l.cancelPendingCommit = null;
    do
      bf();
    while (_l !== 0);
    if ((tl & 6) !== 0) throw Error(g(327));
    if (t !== null) {
      if (t === l.current) throw Error(g(177));
      l === hl && (K = hl = null, w = 0), da = t, Xt = l, Wt = u, Bi = e, By = a, Id(
        l,
        t,
        u,
        f,
        c,
        i,
        E
      );
    }
  }
  function Id(l, t, u, a, e, n, f) {
    var c = t.lanes | t.childLanes;
    if (qi = c, c |= Sc, _s(
      l,
      u,
      c,
      a,
      e,
      n
    ), wa = null, (u & 335544064) === u ? ($a = Ad(l), a = 10262) : ($a = null, a = 10256), (t.subtreeFlags & a) !== 0 || (t.flags & a) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, a1(on, function() {
      return Vi(), null;
    })) : (l.callbackNode = null, l.callbackPriority = 0), ff = !1, a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
      a = M.T, M.T = null, e = Q.p, Q.p = 2, n = tl, tl |= 4;
      try {
        xd(l, t, u);
      } finally {
        tl = n, Q.p = e, M.T = a;
      }
    }
    _l = 1, ff ? Ja = _1(
      f,
      l.containerInfo,
      $a,
      Qi,
      ji,
      Pd,
      Zi,
      Vi,
      kd
    ) : (Qi(), ji(), Zi());
  }
  function kd(l) {
    if (_l !== 0) {
      var t = Xt.onRecoverableError;
      t(l, { componentStack: null });
    }
  }
  function Pd() {
    _l === 3 && (_l = 0, Dy(da, Xt), _l = 4);
  }
  function Qi() {
    if (_l === 1) {
      _l = 0;
      var l = Xt, t = da, u = Wt, a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        a = M.T, M.T = null;
        var e = Q.p;
        Q.p = 2;
        var n = tl;
        tl |= 4;
        try {
          Ze = vf = !1, Ny(t, l, u), u = Pi;
          var f = _o(l.containerInfo), c = u.focusedElem, i = u.selectionRange;
          if (f !== c && c && c.ownerDocument && bo(
            c.ownerDocument.documentElement,
            c
          )) {
            if (i !== null && sc(c)) {
              var s = i.start, r = i.end;
              if (r === void 0 && (r = s), "selectionStart" in c)
                c.selectionStart = s, c.selectionEnd = Math.min(
                  r,
                  c.value.length
                );
              else {
                var E = c.ownerDocument || document, y = E && E.defaultView || window;
                if (y.getSelection) {
                  var h = y.getSelection(), _ = c.textContent.length, N = Math.min(i.start, _), p = i.end === void 0 ? N : Math.min(i.end, _);
                  !h.extend && N > p && (f = p, p = N, N = f);
                  var m = zo(
                    c,
                    N
                  ), o = zo(
                    c,
                    p
                  );
                  if (m && o && (h.rangeCount !== 1 || h.anchorNode !== m.node || h.anchorOffset !== m.offset || h.focusNode !== o.node || h.focusOffset !== o.offset)) {
                    var d = E.createRange();
                    d.setStart(m.node, m.offset), h.removeAllRanges(), N > p ? (h.addRange(d), h.extend(o.node, o.offset)) : (d.setEnd(o.node, o.offset), h.addRange(d));
                  }
                }
              }
            }
            for (E = [], h = c; h = h.parentNode; )
              h.nodeType === 1 && E.push({
                element: h,
                left: h.scrollLeft,
                top: h.scrollTop
              });
            for (typeof c.focus == "function" && c.focus(), c = 0; c < E.length; c++) {
              var T = E[c];
              T.element.scrollLeft = T.left, T.element.scrollTop = T.top;
            }
          }
          ne = !!ki, Pi = ki = null;
        } finally {
          tl = n, Q.p = e, M.T = a;
        }
      }
      l.current = t, _l = 2;
    }
  }
  function ji() {
    if (_l === 2) {
      _l = 0;
      var l = Xt, t = da, u = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || u) {
        u = M.T, M.T = null;
        var a = Q.p;
        Q.p = 2;
        var e = tl;
        tl |= 4;
        try {
          Ey(l, t.alternate, t);
        } finally {
          tl = e, Q.p = a, M.T = u;
        }
      }
      _l = 3;
    }
  }
  function Zi() {
    if (_l === 4 || _l === 3) {
      _l = 0;
      var l = Ja;
      Ja = null, ds();
      var t = Xt, u = da, a = Wt, e = By, n = (a & 335544064) === a ? 10262 : 10256;
      if ((u.subtreeFlags & n) !== 0 || (u.flags & n) !== 0 ? _l = 5 : (_l = 0, da = Xt = null, wy(t, t.pendingLanes)), n = t.pendingLanes, n === 0 && (Gu = null), Ff(a), u = u.stateNode, st && typeof st.onCommitFiberRoot == "function")
        try {
          st.onCommitFiberRoot(
            oe,
            u,
            void 0,
            (u.current.flags & 128) === 128
          );
        } catch {
        }
      if (e !== null) {
        u = M.T, n = Q.p, Q.p = 2, M.T = null;
        try {
          for (var f = t.onRecoverableError, c = 0; c < e.length; c++) {
            var i = e[c];
            f(i.value, {
              componentStack: i.stack
            });
          }
        } finally {
          M.T = u, Q.p = n;
        }
      }
      if (e = wa, f = $a, $a = null, e !== null && (wa = null, f === null && (f = []), l !== null))
        for (i = 0; i < e.length; i++)
          u = (0, e[i])(
            f
          ), u !== void 0 && l.finished.finally(u);
      (Wt & 3) !== 0 && bf(), It(t), n = t.pendingLanes, (a & 261930) !== 0 && (n & 42) !== 0 ? t === Sf ? Le++ : (Le = 0, Sf = t) : (Le = 0, Sf = null), Ke(0);
    }
  }
  function wy(l, t) {
    (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, Ae(t)));
  }
  function bf() {
    return Ja !== null && (Ja.skipTransition(), Ja = null), Qi(), ji(), Zi(), Vi();
  }
  function Vi() {
    if (_l !== 5) return !1;
    var l = Xt, t = qi;
    qi = 0;
    var u = Ff(Wt), a = M.T, e = Q.p;
    try {
      Q.p = 32 > u ? 32 : u, M.T = null, u = Bi, Bi = null;
      var n = Xt, f = Wt;
      if (_l = 0, da = Xt = null, Wt = 0, (tl & 6) !== 0) throw Error(g(331));
      var c = tl;
      if (tl |= 4, Hy(n.current), Uy(
        n,
        n.current,
        f,
        u
      ), tl = c, Ke(0, !1), st && typeof st.onPostCommitFiberRoot == "function")
        try {
          st.onPostCommitFiberRoot(oe, n);
        } catch {
        }
      return !0;
    } finally {
      Q.p = e, M.T = a, wy(l, t);
    }
  }
  function $y(l, t, u) {
    t = At(u, t), t = ei(l.stateNode, t, 2), l = Du(l, t, 2), l !== null && (ye(l, 2), It(l));
  }
  function il(l, t, u) {
    if (l.tag === 3)
      $y(l, l, u);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          $y(
            t,
            l,
            u
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (Gu === null || !Gu.has(a))) {
            l = At(u, l), u = Lv(2), a = Du(t, u, 2), a !== null && (Kv(
              u,
              a,
              t,
              l
            ), ye(a, 2), It(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function pi(l, t, u) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new Jd();
      var e = /* @__PURE__ */ new Set();
      a.set(t, e);
    } else
      e = a.get(t), e === void 0 && (e = /* @__PURE__ */ new Set(), a.set(t, e));
    e.has(u) || (Hi = !0, e.add(u), l = l1.bind(null, l, t, u), t.then(l, l));
  }
  function l1(l, t, u) {
    var a = l.pingCache;
    a !== null && a.delete(t), l.pingedLanes |= l.suspendedLanes & u, l.warmLanes &= ~u, hl === l && (w & u) === u && ((Nl === 4 || Nl === 3 && (w & 62914560) === w && 300 > mt() - hf) && (tl & 2) === 0 ? Wa(l, 0) : df |= u, Ka === w && (Ka = 0)), It(l);
  }
  function Fy(l, t) {
    t === 0 && (t = Y0()), l = ku(l, t), l !== null && (ye(l, t), It(l));
  }
  function t1(l) {
    var t = l.memoizedState, u = 0;
    t !== null && (u = t.retryLane), Fy(l, u);
  }
  function u1(l, t) {
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
    a !== null && a.delete(t), Fy(l, u);
  }
  function a1(l, t) {
    return Kf(l, t);
  }
  var ka = null, Pa = null, xi = !1, _f = !1, Li = !1, Qu = 0;
  function It(l) {
    l !== Pa && l.next === null && (Pa === null ? ka = Pa = l : Pa = Pa.next = l), _f = !0, xi || (xi = !0, n1());
  }
  function Ke(l, t) {
    if (!Li && _f) {
      Li = !0;
      do
        for (var u = !1, a = ka; a !== null; ) {
          if (l !== 0) {
            var e = a.pendingLanes;
            if (e === 0) var n = 0;
            else {
              var f = a.suspendedLanes, c = a.pingedLanes;
              n = (1 << 31 - dt(42 | l) + 1) - 1, n &= e & ~(f & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (u = !0, Py(a, n));
          } else
            n = w, n = sn(
              a,
              a === hl ? n : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (n & 3) === 0 || ve(a, n) || (u = !0, Py(a, n));
          a = a.next;
        }
      while (u);
      Li = !1;
    }
  }
  function e1() {
    Wy();
  }
  function Wy() {
    _f = xi = !1;
    var l = 0;
    Qu !== 0 && g1() && (l = Qu);
    for (var t = mt(), u = null, a = ka; a !== null; ) {
      var e = a.next, n = Iy(a, t);
      n === 0 ? (a.next = null, u === null ? ka = e : u.next = e, e === null && (Pa = u)) : (u = a, (l !== 0 || (n & 3) !== 0) && (_f = !0)), a = e;
    }
    _l !== 0 && _l !== 5 || Ke(l), Qu !== 0 && (Qu = 0);
  }
  function Iy(l, t) {
    for (var u = l.suspendedLanes, a = l.pingedLanes, e = l.expirationTimes, n = l.pendingLanes & -62914561; 0 < n; ) {
      var f = 31 - dt(n), c = 1 << f, i = e[f];
      i === -1 ? ((c & u) === 0 || (c & a) !== 0) && (e[f] = bs(c, t)) : i <= t && (l.expiredLanes |= c), n &= ~c;
    }
    if (t = hl, u = w, u = sn(
      l,
      l === t ? u : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a = l.callbackNode, u === 0 || l === t && (cl === 2 || cl === 9) || l.cancelPendingCommit !== null)
      return a !== null && a !== null && Jf(a), l.callbackNode = null, l.callbackPriority = 0;
    if ((u & 3) === 0 || ve(l, u)) {
      if (t = u & -u, t === l.callbackPriority) return t;
      switch (a !== null && Jf(a), Ff(u)) {
        case 2:
        case 8:
          u = C0;
          break;
        case 32:
          u = on;
          break;
        case 268435456:
          u = R0;
          break;
        default:
          u = on;
      }
      return a = ky.bind(null, l), u = Kf(u, a), l.callbackPriority = t, l.callbackNode = u, t;
    }
    return a !== null && a !== null && Jf(a), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function ky(l, t) {
    if (_l !== 0 && _l !== 5)
      return l.callbackNode = null, l.callbackPriority = 0, null;
    var u = l.callbackNode;
    if (bf() && l.callbackNode !== u)
      return null;
    var a = w;
    return a = sn(
      l,
      l === hl ? a : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a === 0 ? null : (Xy(l, a, t), Iy(l, mt()), l.callbackNode != null && l.callbackNode === u ? ky.bind(null, l) : null);
  }
  function Py(l, t) {
    if (bf()) return null;
    Xy(l, t, !0);
  }
  function n1() {
    S1(function() {
      (tl & 6) !== 0 ? Kf(
        U0,
        e1
      ) : Wy();
    });
  }
  function Ki() {
    if (Qu === 0) {
      var l = ea;
      l === 0 && (l = vn, vn <<= 1, (vn & 261888) === 0 && (vn = 256)), Qu = l;
    }
    return Qu;
  }
  function lm(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : Sn(l);
  }
  function f1(l, t, u, a, e) {
    if (t === "submit" && u && u.stateNode === e) {
      var n = lm(
        (e[nt] || null).action
      ), f = a.submitter;
      f && (t = (t = f[nt] || null) ? lm(t.formAction) : f.getAttribute("formAction"), t !== null && (n = t, f = null));
      var c = new bn(
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
                  Pc(
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
                typeof n == "function" && (c.preventDefault(), i = new FormData(e, f), Pc(
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
  for (var Ji = 0; Ji < rc.length; Ji++) {
    var wi = rc[Ji], c1 = wi.toLowerCase(), i1 = wi[0].toUpperCase() + wi.slice(1);
    Yt(
      c1,
      "on" + i1
    );
  }
  Yt(No, "onAnimationEnd"), Yt(Mo, "onAnimationIteration"), Yt(Do, "onAnimationStart"), Yt("dblclick", "onDoubleClick"), Yt("focusin", "onFocus"), Yt("focusout", "onBlur"), Yt(rd, "onTransitionRun"), Yt(Sd, "onTransitionStart"), Yt(Td, "onTransitionCancel"), Yt(Uo, "onTransitionEnd"), za("onMouseEnter", ["mouseout", "mouseover"]), za("onMouseLeave", ["mouseout", "mouseover"]), za("onPointerEnter", ["pointerout", "pointerover"]), za("onPointerLeave", ["pointerout", "pointerover"]), Fu(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Fu(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Fu("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Fu(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Fu(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Fu(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Je = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), o1 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Je)
  );
  function tm(l, t) {
    t = (t & 4) !== 0;
    for (var u = 0; u < l.length; u++) {
      var a = l[u], e = a.event;
      a = a.listeners;
      l: {
        var n = void 0;
        if (t)
          for (var f = a.length - 1; 0 <= f; f--) {
            var c = a[f], i = c.instance, s = c.currentTarget;
            if (c = c.listener, i !== n && e.isPropagationStopped())
              break l;
            n = c, e.currentTarget = s;
            try {
              n(e);
            } catch (r) {
              An(r);
            }
            e.currentTarget = null, n = i;
          }
        else
          for (f = 0; f < a.length; f++) {
            if (c = a[f], i = c.instance, s = c.currentTarget, c = c.listener, i !== n && e.isPropagationStopped())
              break l;
            n = c, e.currentTarget = s;
            try {
              n(e);
            } catch (r) {
              An(r);
            }
            e.currentTarget = null, n = i;
          }
      }
    }
  }
  function J(l, t) {
    var u = t[j0];
    u === void 0 && (u = t[j0] = /* @__PURE__ */ new Set());
    var a = l + "__bubble";
    u.has(a) || (um(t, l, 2, !1), u.add(a));
  }
  function $i(l, t, u) {
    var a = 0;
    t && (a |= 4), um(
      u,
      l,
      a,
      t
    );
  }
  var Of = "_reactListening" + Math.random().toString(36).slice(2);
  function Fi(l) {
    if (!l[Of]) {
      l[Of] = !0, p0.forEach(function(u) {
        u !== "selectionchange" && (o1.has(u) || $i(u, !1, l), $i(u, !0, l));
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[Of] || (t[Of] = !0, $i("selectionchange", !1, t));
    }
  }
  function um(l, t, u, a) {
    switch (Km(t)) {
      case 2:
        var e = th;
        break;
      case 8:
        e = uh;
        break;
      default:
        e = h0;
    }
    u = e.bind(
      null,
      t,
      u,
      l
    ), e = void 0, !ac || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (e = !0), a ? e !== void 0 ? l.addEventListener(t, u, {
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
            if (f = $u(c), f === null) return;
            if (i = f.tag, i === 5 || i === 6 || i === 26 || i === 27) {
              a = n = f;
              continue l;
            }
            c = c.parentNode;
          }
        }
        a = a.return;
      }
    to(function() {
      var s = n, r = tc(u), E = [];
      l: {
        var y = Co.get(l);
        if (y !== void 0) {
          var h = bn, _ = l;
          switch (l) {
            case "keypress":
              if (En(u) === 0) break l;
            case "keydown":
            case "keyup":
              h = ws;
              break;
            case "focusin":
              _ = "focus", h = cc;
              break;
            case "focusout":
              _ = "blur", h = cc;
              break;
            case "beforeblur":
            case "afterblur":
              h = cc;
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
              h = eo;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              h = Bs;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              h = ks;
              break;
            case No:
            case Mo:
            case Do:
              h = Qs;
              break;
            case Uo:
              h = ld;
              break;
            case "scroll":
            case "scrollend":
              h = Ys;
              break;
            case "wheel":
              h = ud;
              break;
            case "copy":
            case "cut":
            case "paste":
              h = Zs;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              h = fo;
              break;
            case "submit":
              h = Ws;
              break;
            case "toggle":
            case "beforetoggle":
              h = ed;
          }
          var N = (t & 4) !== 0, p = !N && (l === "scroll" || l === "scrollend"), m = N ? y !== null ? y + "Capture" : null : y;
          N = [];
          for (var o = s, d; o !== null; ) {
            var T = o;
            if (d = T.stateNode, T = T.tag, T !== 5 && T !== 26 && T !== 27 || d === null || m === null || (T = de(o, m), T != null && N.push(
              we(o, T, d)
            )), p) break;
            o = o.return;
          }
          0 < N.length && (y = new h(
            y,
            _,
            null,
            u,
            r
          ), E.push({ event: y, listeners: N }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (h = l === "mouseover" || l === "pointerover", y = l === "mouseout" || l === "pointerout", h && u !== lc && (_ = u.relatedTarget || u.fromElement) && ($u(_) || _[Sa]))
            break l;
          (y || h) && (_ = r.window === r ? r : (h = r.ownerDocument) ? h.defaultView || h.parentWindow : window, y ? (h = u.relatedTarget || u.toElement, y = s, h = h ? $u(h) : null, h !== null && (p = ul(h), N = h.tag, h !== p || N !== 5 && N !== 27 && N !== 6) && (h = null)) : (y = null, h = s), y !== h && (N = eo, T = "onMouseLeave", m = "onMouseEnter", o = "mouse", (l === "pointerout" || l === "pointerover") && (N = fo, T = "onPointerLeave", m = "onPointerEnter", o = "pointer"), p = y == null ? _ : se(y), d = h == null ? _ : se(h), _ = new N(
            T,
            o + "leave",
            y,
            u,
            r
          ), _.target = p, _.relatedTarget = d, T = null, $u(r) === s && (N = new N(
            m,
            o + "enter",
            h,
            u,
            r
          ), N.target = d, N.relatedTarget = p, T = N), p = T, N = y && h ? fl(
            y,
            h,
            v1
          ) : null, y !== null && am(
            E,
            _,
            y,
            N,
            !1
          ), h !== null && p !== null && am(
            E,
            p,
            h,
            N,
            !0
          )));
        }
        l: {
          if (y = s ? se(s) : window, h = y.nodeName && y.nodeName.toLowerCase(), h === "select" || h === "input" && y.type === "file")
            var A = ho;
          else if (mo(y))
            if (go)
              A = dd;
            else {
              A = md;
              var $ = yd;
            }
          else
            h = y.nodeName, !h || h.toLowerCase() !== "input" || y.type !== "checkbox" && y.type !== "radio" ? s && Pf(s.elementType) && (A = ho) : A = sd;
          if (A && (A = A(l, s))) {
            so(
              E,
              A,
              u,
              r
            );
            break l;
          }
          $ && $(l, y, s);
        }
        switch ($ = s ? se(s) : window, l) {
          case "focusin":
            (mo($) || $.contentEditable === "true") && (Ma = $, dc = s, be = null);
            break;
          case "focusout":
            be = dc = Ma = null;
            break;
          case "mousedown":
            hc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            hc = !1, Oo(E, u, r);
            break;
          case "selectionchange":
            if (gd) break;
          case "keydown":
          case "keyup":
            Oo(E, u, r);
        }
        var D;
        if (oc)
          l: {
            switch (l) {
              case "compositionstart":
                var Y = "onCompositionStart";
                break l;
              case "compositionend":
                Y = "onCompositionEnd";
                break l;
              case "compositionupdate":
                Y = "onCompositionUpdate";
                break l;
            }
            Y = void 0;
          }
        else
          Na ? vo(l, u) && (Y = "onCompositionEnd") : l === "keydown" && u.keyCode === 229 && (Y = "onCompositionStart");
        Y && (co && u.locale !== "ko" && (Na || Y !== "onCompositionStart" ? Y === "onCompositionEnd" && Na && (D = uo()) : (Tu = r, ec = "value" in Tu ? Tu.value : Tu.textContent, Na = !0)), $ = Af(s, Y), 0 < $.length && (Y = new no(
          Y,
          l,
          null,
          u,
          r
        ), E.push({ event: Y, listeners: $ }), D ? Y.data = D : (D = yo(u), D !== null && (Y.data = D)))), (D = fd ? cd(l, u) : id(l, u)) && (Y = Af(s, "onBeforeInput"), 0 < Y.length && ($ = new no(
          "onBeforeInput",
          "beforeinput",
          null,
          u,
          r
        ), E.push({
          event: $,
          listeners: Y
        }), $.data = D)), f1(
          E,
          l,
          s,
          u,
          r
        );
      }
      tm(E, t);
    });
  }
  function we(l, t, u) {
    return {
      instance: l,
      listener: t,
      currentTarget: u
    };
  }
  function Af(l, t) {
    for (var u = t + "Capture", a = []; l !== null; ) {
      var e = l, n = e.stateNode;
      if (e = e.tag, e !== 5 && e !== 26 && e !== 27 || n === null || (e = de(l, u), e != null && a.unshift(
        we(l, e, n)
      ), e = de(l, t), e != null && a.push(
        we(l, e, n)
      )), l.tag === 3) return a;
      l = l.return;
    }
    return [];
  }
  function v1(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function am(l, t, u, a, e) {
    for (var n = t._reactName, f = []; u !== null && u !== a; ) {
      var c = u, i = c.alternate, s = c.stateNode;
      if (c = c.tag, i !== null && i === a) break;
      c !== 5 && c !== 26 && c !== 27 || s === null || (i = s, e ? (s = de(u, n), s != null && f.unshift(
        we(u, s, i)
      )) : e || (s = de(u, n), s != null && f.push(
        we(u, s, i)
      ))), u = u.return;
    }
    f.length !== 0 && l.push({ event: t, listeners: f });
  }
  var y1 = /\r\n?/g, m1 = /\u0000|\uFFFD/g;
  function em(l) {
    return (typeof l == "string" ? l : "" + l).replace(y1, `
`).replace(m1, "");
  }
  function nm(l, t) {
    return t = em(t), em(l) === t;
  }
  function ol(l, t, u, a, e, n) {
    switch (u) {
      case "children":
        if (typeof a == "string")
          t === "body" || t === "textarea" && a === "" || _a(l, a);
        else if (typeof a == "number" || typeof a == "bigint")
          t !== "body" && _a(l, "" + a);
        else return;
        break;
      case "className":
        rn(l, "class", a);
        break;
      case "tabIndex":
        rn(l, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        rn(l, u, a);
        break;
      case "style":
        P0(l, a, n);
        return;
      case "data":
        if (t !== "object") {
          rn(l, "data", a);
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
        a = Sn(a), l.setAttribute(u, a);
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
          typeof n == "function" && (u === "formAction" ? (t !== "input" && ol(l, t, "name", e.name, e, null), ol(
            l,
            t,
            "formEncType",
            e.formEncType,
            e,
            null
          ), ol(
            l,
            t,
            "formMethod",
            e.formMethod,
            e,
            null
          ), ol(
            l,
            t,
            "formTarget",
            e.formTarget,
            e,
            null
          )) : (ol(l, t, "encType", e.encType, e, null), ol(l, t, "method", e.method, e, null), ol(l, t, "target", e.target, e, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(u);
          break;
        }
        a = Sn(a), l.setAttribute(u, a);
        break;
      case "onClick":
        a != null && (l.onclick = Vt);
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
        u = Sn(a), l.setAttributeNS(
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
        tu(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        tu(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        tu(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        tu(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        tu(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        tu(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        tu(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        tu(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        tu(
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
          u = Rs.get(u) || u, gn(l, u, a);
        else return;
    }
    P = !0;
  }
  function Ii(l, t, u, a, e, n) {
    switch (u) {
      case "style":
        P0(l, a, n);
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
        if (typeof a == "string") _a(l, a);
        else if (typeof a == "number" || typeof a == "bigint")
          _a(l, "" + a);
        else return;
        break;
      case "onScroll":
        a != null && J("scroll", l);
        return;
      case "onScrollEnd":
        a != null && J("scrollend", l);
        return;
      case "onClick":
        a != null && (l.onclick = Vt);
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
        if (!x0.hasOwnProperty(u))
          l: {
            if (u[0] === "o" && u[1] === "n" && (e = u.endsWith("Capture"), n = u.slice(2, e ? u.length - 7 : void 0), t = l[nt] || null, t = t != null ? t[u] : null, typeof t == "function" && l.removeEventListener(n, t, e), typeof a == "function")) {
              typeof t != "function" && t !== null && (u in l ? l[u] = null : l.hasAttribute(u) && l.removeAttribute(u)), l.addEventListener(n, a, e);
              break l;
            }
            P = !0, u in l ? l[u] = a : a === !0 ? l.setAttribute(u, "") : gn(l, u, a);
          }
        return;
    }
    P = !0;
  }
  function $l(l, t, u) {
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
                  ol(l, t, n, f, u, null);
              }
          }
        e && ol(l, t, "srcSet", u.srcSet, u, null), a && ol(l, t, "src", u.src, u, null);
        return;
      case "input":
        J("invalid", l);
        var c = n = f = e = null, i = null, s = null;
        for (a in u)
          if (u.hasOwnProperty(a)) {
            var r = u[a];
            if (r != null)
              switch (a) {
                case "name":
                  e = r;
                  break;
                case "type":
                  f = r;
                  break;
                case "checked":
                  i = r;
                  break;
                case "defaultChecked":
                  s = r;
                  break;
                case "value":
                  n = r;
                  break;
                case "defaultValue":
                  c = r;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (r != null)
                    throw Error(g(137, t));
                  break;
                default:
                  ol(l, t, a, r, u, null);
              }
          }
        F0(
          l,
          n,
          c,
          i,
          s,
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
                ol(l, t, e, c, u, null);
            }
        t = n, u = f, l.multiple = !!a, t != null ? ba(l, !!a, t, !1) : u != null && ba(l, !!a, u, !0);
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
                ol(l, t, f, c, u, null);
            }
        I0(l, a, e, n);
        return;
      case "option":
        for (i in u)
          u.hasOwnProperty(i) && (a = u[i], a != null) && (i === "selected" ? l.selected = a && typeof a != "function" && typeof a != "symbol" : ol(l, t, i, a, u, null));
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
        for (a = 0; a < Je.length; a++)
          J(Je[a], l);
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
        for (s in u)
          if (u.hasOwnProperty(s) && (a = u[s], a != null))
            switch (s) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(g(137, t));
              default:
                ol(l, t, s, a, u, null);
            }
        return;
      default:
        if (Pf(t)) {
          for (r in u)
            u.hasOwnProperty(r) && (a = u[r], a !== void 0 && Ii(
              l,
              t,
              r,
              a,
              u,
              void 0
            ));
          return;
        }
    }
    for (c in u)
      u.hasOwnProperty(c) && (a = u[c], a != null && ol(l, t, c, a, u, null));
  }
  var s1 = {};
  function d1(l, t, u, a) {
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
        var e = null, n = null, f = null, c = null, i = null, s = null, r = null;
        for (h in u) {
          var E = u[h];
          if (u.hasOwnProperty(h) && E != null)
            switch (h) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                i = E;
              default:
                a.hasOwnProperty(h) || ol(l, t, h, null, a, E);
            }
        }
        for (var y in a) {
          var h = a[y];
          if (E = u[y], a.hasOwnProperty(y) && (h != null || E != null))
            switch (y) {
              case "type":
                h !== E && (P = !0), n = h;
                break;
              case "name":
                h !== E && (P = !0), e = h;
                break;
              case "checked":
                h !== E && (P = !0), s = h;
                break;
              case "defaultChecked":
                h !== E && (P = !0), r = h;
                break;
              case "value":
                h !== E && (P = !0), f = h;
                break;
              case "defaultValue":
                h !== E && (P = !0), c = h;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (h != null)
                  throw Error(g(137, t));
                break;
              default:
                h !== E && ol(
                  l,
                  t,
                  y,
                  h,
                  a,
                  E
                );
            }
        }
        If(
          l,
          f,
          c,
          i,
          s,
          r,
          n,
          e
        );
        return;
      case "select":
        h = f = c = y = null;
        for (n in u)
          if (i = u[n], u.hasOwnProperty(n) && i != null)
            switch (n) {
              case "value":
                break;
              case "multiple":
                h = i;
              default:
                a.hasOwnProperty(n) || ol(
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
                n !== i && (P = !0), y = n;
                break;
              case "defaultValue":
                n !== i && (P = !0), c = n;
                break;
              case "multiple":
                n !== i && (P = !0), f = n;
              default:
                n !== i && ol(
                  l,
                  t,
                  e,
                  n,
                  a,
                  i
                );
            }
        t = c, u = f, a = h, y != null ? ba(l, !!u, y, !1) : !!a != !!u && (t != null ? ba(l, !!u, t, !0) : ba(l, !!u, u ? [] : "", !1));
        return;
      case "textarea":
        h = y = null;
        for (c in u)
          if (e = u[c], u.hasOwnProperty(c) && e != null && !a.hasOwnProperty(c))
            switch (c) {
              case "value":
                break;
              case "children":
                break;
              default:
                ol(l, t, c, null, a, e);
            }
        for (f in a)
          if (e = a[f], n = u[f], a.hasOwnProperty(f) && (e != null || n != null))
            switch (f) {
              case "value":
                e !== n && (P = !0), y = e;
                break;
              case "defaultValue":
                e !== n && (P = !0), h = e;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (e != null) throw Error(g(91));
                break;
              default:
                e !== n && ol(l, t, f, e, a, n);
            }
        W0(l, y, h);
        return;
      case "option":
        for (var _ in u)
          y = u[_], u.hasOwnProperty(_) && y != null && !a.hasOwnProperty(_) && (_ === "selected" ? l.selected = !1 : ol(
            l,
            t,
            _,
            null,
            a,
            y
          ));
        for (i in a)
          y = a[i], h = u[i], a.hasOwnProperty(i) && y !== h && (y != null || h != null) && (i === "selected" ? (y !== h && (P = !0), l.selected = y && typeof y != "function" && typeof y != "symbol") : ol(
            l,
            t,
            i,
            y,
            a,
            h
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
        for (var N in u)
          y = u[N], u.hasOwnProperty(N) && y != null && !a.hasOwnProperty(N) && ol(l, t, N, null, a, y);
        for (s in a)
          if (y = a[s], h = u[s], a.hasOwnProperty(s) && y !== h && (y != null || h != null))
            switch (s) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (y != null)
                  throw Error(g(137, t));
                break;
              default:
                ol(
                  l,
                  t,
                  s,
                  y,
                  a,
                  h
                );
            }
        return;
      default:
        if (Pf(t)) {
          for (var p in u)
            y = u[p], u.hasOwnProperty(p) && y !== void 0 && !a.hasOwnProperty(p) && Ii(
              l,
              t,
              p,
              void 0,
              a,
              y
            );
          for (r in a)
            y = a[r], h = u[r], !a.hasOwnProperty(r) || y === h || y === void 0 && h === void 0 || Ii(
              l,
              t,
              r,
              y,
              a,
              h
            );
          return;
        }
    }
    for (var m in u)
      y = u[m], u.hasOwnProperty(m) && y != null && !a.hasOwnProperty(m) && ol(l, t, m, null, a, y);
    for (E in a)
      y = a[E], h = u[E], !a.hasOwnProperty(E) || y === h || y == null && h == null || ol(l, t, E, y, a, h);
  }
  function fm(l) {
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
  function h1() {
    if (typeof performance.getEntriesByType == "function") {
      for (var l = 0, t = 0, u = performance.getEntriesByType("resource"), a = 0; a < u.length; a++) {
        var e = u[a], n = e.transferSize, f = e.initiatorType, c = e.duration;
        if (n && c && fm(f)) {
          for (f = 0, c = e.responseEnd, a += 1; a < u.length; a++) {
            var i = u[a], s = i.startTime;
            if (s > c) break;
            var r = i.transferSize, E = i.initiatorType;
            r && fm(E) && (i = i.responseEnd, f += r * (i < c ? 1 : (c - s) / (i - s)));
          }
          if (--a, t += 8 * (n + f) / (e.duration / 1e3), l++, 10 < l) break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
  }
  var ki = null, Pi = null;
  function $e(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function cm(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function im(l, t) {
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
  function om(l, t, u, a) {
    return u = $e(
      u
    ).createElement(l), u[xl] = a, u[nt] = t, $l(u, l, t), Xl(u), u;
  }
  function l0(l, t) {
    return l === "textarea" || l === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var t0 = null;
  function g1() {
    var l = window.event;
    return l && l.type === "popstate" ? l === t0 ? !1 : (t0 = l, !0) : (t0 = null, !1);
  }
  var u0 = typeof setTimeout == "function" ? setTimeout : void 0, r1 = typeof clearTimeout == "function" ? clearTimeout : void 0, vm = typeof Promise == "function" ? Promise : void 0, ym = typeof requestAnimationFrame == "function" ? requestAnimationFrame : u0, S1 = typeof queueMicrotask == "function" ? queueMicrotask : typeof vm < "u" ? function(l) {
    return vm.resolve(null).then(l).catch(T1);
  } : u0;
  function T1(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function ju(l) {
    return l === "head";
  }
  function mm(l, t) {
    var u = t, a = 0;
    do {
      var e = u.nextSibling;
      if (l.removeChild(u), e && e.nodeType === 8)
        if (u = e.data, u === "/$" || u === "/&") {
          if (a === 0) {
            l.removeChild(e), fe(t);
            return;
          }
          a--;
        } else if (u === "$" || u === "$?" || u === "$~" || u === "$!" || u === "&")
          a++;
        else if (u === "html")
          v0(
            l.ownerDocument.documentElement
          );
        else if (u === "head") {
          u = l.ownerDocument.head, v0(u);
          for (var n = u.firstChild; n; ) {
            var f = n.nextSibling, c = n.nodeName;
            n[me] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && n.rel.toLowerCase() === "stylesheet" || u.removeChild(n), n = f;
          }
        } else
          u === "body" && v0(l.ownerDocument.body);
      u = e;
    } while (u);
    fe(t);
  }
  function sm(l, t) {
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
  function dm(l, t, u) {
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
  function hm(l, t) {
    l = l.style, t = t.style;
    var u = t != null ? t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null : null;
    l.viewTransitionName = u == null || typeof u == "boolean" ? "" : ("" + u).trim(), u = t != null ? t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null : null, l.viewTransitionClass = u == null || typeof u == "boolean" ? "" : ("" + u).trim(), l.display === "inline-block" && (t == null ? l.display = l.margin = "" : (u = t.display, l.display = u == null || typeof u == "boolean" ? "" : u, u = t.margin, u != null ? l.margin = u : (u = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], l.marginTop = u == null || typeof u == "boolean" ? "" : u, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], l.marginBottom = t == null || typeof t == "boolean" ? "" : t)));
  }
  function E1(l, t, u) {
    return u = u.ownerDocument.defaultView, {
      rect: l,
      abs: t.position === "absolute" || t.position === "fixed",
      clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
      view: 0 <= l.bottom && 0 <= l.right && l.top <= u.innerHeight && l.left <= u.innerWidth
    };
  }
  function a0(l) {
    var t = l.getBoundingClientRect(), u = getComputedStyle(l);
    return E1(t, u, l);
  }
  function z1(l) {
    return l.documentElement.clientHeight;
  }
  function b1(l) {
    this.addEventListener("load", l), this.addEventListener("error", l);
  }
  function _1(l, t, u, a, e, n, f, c, i) {
    var s = t.nodeType === 9 ? t : t.ownerDocument;
    try {
      var r = s.startViewTransition({
        update: function() {
          var y = s.defaultView, h = y.navigation && y.navigation.transition, _ = s.fonts.status;
          a();
          var N = [];
          if (_ === "loaded" && (z1(s), s.fonts.status === "loading" && N.push(s.fonts.ready)), _ = N.length, l !== null)
            for (var p = l.suspenseyImages, m = 0, o = 0; o < p.length; o++) {
              var d = p[o];
              if (!d.complete) {
                var T = d.getBoundingClientRect();
                if (0 < T.bottom && 0 < T.right && T.top < y.innerHeight && T.left < y.innerWidth) {
                  if (m += Gm(d), m > Df) {
                    N.length = _;
                    break;
                  }
                  d = new Promise(
                    b1.bind(d)
                  ), N.push(d);
                }
              }
            }
          if (0 < N.length)
            return y = Promise.race([
              Promise.all(N),
              new Promise(function(A) {
                return setTimeout(A, 500);
              })
            ]).then(e, e), (h ? Promise.allSettled([h.finished, y]) : y).then(n, n);
          if (e(), h)
            return h.finished.then(
              n,
              n
            );
          n();
        },
        types: u
      });
      s.__reactViewTransition = r;
      var E = [];
      return r.ready.then(
        function() {
          for (var y = s.documentElement.getAnimations({
            subtree: !0
          }), h = 0; h < y.length; h++) {
            var _ = y[h], N = _.effect, p = N.pseudoElement;
            if (p != null && p.startsWith("::view-transition")) {
              E.push(_), _ = N.getKeyframes();
              for (var m = p = void 0, o = !0, d = 0; d < _.length; d++) {
                var T = _[d], A = T.width;
                if (p === void 0) p = A;
                else if (p !== A) {
                  o = !1;
                  break;
                }
                if (A = T.height, m === void 0) m = A;
                else if (m !== A) {
                  o = !1;
                  break;
                }
                delete T.width, delete T.height, T.transform === "none" && delete T.transform;
              }
              o && p !== void 0 && m !== void 0 && (N.setKeyframes(_), o = getComputedStyle(
                N.target,
                N.pseudoElement
              ), o.width !== p || o.height !== m) && (o = _[0], o.width = p, o.height = m, o = _[_.length - 1], o.width = p, o.height = m, N.setKeyframes(_));
            }
          }
          f();
        },
        function(y) {
          s.__reactViewTransition === r && (s.__reactViewTransition = null);
          try {
            typeof y == "object" && y !== null && y.name === "InvalidStateError" && (y.message === "View transition was skipped because document visibility state is hidden." || y.message === "Skipping view transition because document visibility state has become hidden." || y.message === "Skipping view transition because viewport size changed." || y.message === "Transition was aborted because of invalid state") && (y = null), y !== null && i(y);
          } finally {
            a(), e(), f();
          }
        }
      ), r.finished.finally(function() {
        for (var y = 0; y < E.length; y++)
          E[y].cancel();
        s.__reactViewTransition === r && (s.__reactViewTransition = null), c();
      }), r;
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
  function gm(l) {
    return {
      name: l,
      group: new ha("group", l),
      imagePair: new ha("image-pair", l),
      old: new ha("old", l),
      new: new ha("new", l)
    };
  }
  function bt(l) {
    this._fragmentFiber = l, this._observers = this._eventListeners = null;
  }
  bt.prototype.addEventListener = function(l, t, u) {
    var a = null, e = null;
    if (!(u != null && typeof u != "boolean" && (a = u.signal || null, a !== null && a.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var n = this._eventListeners;
      if (Sm(n, l, t, u) === -1) {
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
        ), a.addEventListener("abort", e, { once: !0 }), e = a.removeEventListener.bind(a, "abort", e)), a = le(u), n.push({
          type: l,
          listener: t,
          optionsOrUseCapture: u,
          attachedListener: c,
          cleanup: e
        }), S(
          this._fragmentFiber.child,
          !1,
          O1,
          l,
          c,
          a
        );
      }
      this._eventListeners = n;
    }
  };
  function O1(l, t, u, a) {
    return yl(l).addEventListener(
      t,
      u,
      a
    ), !1;
  }
  bt.prototype.removeEventListener = function(l, t, u) {
    var a = this._eventListeners;
    if (a !== null && (t = Sm(
      a,
      l,
      t,
      u
    ), t !== -1)) {
      var e = a[t];
      u = e.attachedListener;
      var n = e.cleanup;
      e = le(e.optionsOrUseCapture), S(
        this._fragmentFiber.child,
        !1,
        A1,
        l,
        u,
        e
      ), a.splice(t, 1), n !== null && n();
    }
  };
  function A1(l, t, u, a) {
    return yl(l).removeEventListener(
      t,
      u,
      a
    ), !1;
  }
  function le(l) {
    return l != null && typeof l != "boolean" && (l.once === !0 || l.signal instanceof AbortSignal) ? { capture: l.capture, passive: l.passive } : l;
  }
  function rm(l) {
    return l == null ? "c=0" : typeof l == "boolean" ? "c=" + (l ? "1" : "0") : "c=" + (l.capture ? "1" : "0");
  }
  function Sm(l, t, u, a) {
    if (l.length === 0) return -1;
    a = rm(a);
    for (var e = 0; e < l.length; e++) {
      var n = l[e];
      if (n.type === t && n.listener === u && rm(n.optionsOrUseCapture) === a)
        return e;
    }
    return -1;
  }
  bt.prototype.dispatchEvent = function(l) {
    var t = R(
      this._fragmentFiber
    );
    if (t === null) return !0;
    t = yl(t);
    var u = this._eventListeners;
    if (u !== null && 0 < u.length || !l.bubbles) {
      var a = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
      if (u)
        for (var e = 0; e < u.length; e++) {
          var n = u[e];
          a.addEventListener(
            n.type,
            n.attachedListener,
            le(n.optionsOrUseCapture)
          );
        }
      if (t.appendChild(a), l = a.dispatchEvent(l), u)
        for (e = 0; e < u.length; e++)
          n = u[e], a.removeEventListener(
            n.type,
            n.attachedListener,
            le(n.optionsOrUseCapture)
          );
      return t.removeChild(a), l;
    }
    return t.dispatchEvent(l);
  }, bt.prototype.focus = function(l) {
    S(
      this._fragmentFiber.child,
      !0,
      Tm,
      l,
      void 0,
      void 0
    );
  };
  function Tm(l, t) {
    return l.tag === 6 ? !1 : (l = yl(l), X1(l, t));
  }
  bt.prototype.focusLast = function(l) {
    var t = [];
    S(
      this._fragmentFiber.child,
      !0,
      e0,
      t,
      void 0,
      void 0
    );
    for (var u = t.length - 1; 0 <= u && !Tm(t[u], l); u--) ;
  };
  function e0(l, t) {
    return t.push(l), !1;
  }
  bt.prototype.blur = function() {
    var l = R(
      this._fragmentFiber
    );
    l !== null && (l = yl(l), l = $e(l).activeElement, l !== null && S(
      this._fragmentFiber.child,
      !1,
      N1,
      l,
      void 0,
      void 0
    ));
  };
  function N1(l, t) {
    return l.tag === 6 ? !1 : (l = yl(l), l === t || l.contains(t) ? (t.blur(), !0) : !1);
  }
  bt.prototype.observeUsing = function(l) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(l), S(
      this._fragmentFiber.child,
      !1,
      M1,
      l,
      void 0,
      void 0
    );
  };
  function M1(l, t) {
    return l.tag === 6 || (l = yl(l), t.observe(l)), !1;
  }
  bt.prototype.unobserveUsing = function(l) {
    var t = this._observers;
    if (t !== null && t.has(l)) {
      t.delete(l), S(
        this._fragmentFiber.child,
        !1,
        D1,
        l,
        void 0,
        void 0
      );
      for (var u = t = 0; u < Qt.length; u++) {
        var a = Qt[u];
        a.fragmentInstance === this && a.observer === l ? l.unobserve(a.instance) : Qt[t++] = a;
      }
      Qt.length = t;
    }
  };
  function D1(l, t) {
    return l.tag === 6 || (l = yl(l), t.unobserve(l)), !1;
  }
  var Qt = [], n0 = !1;
  function U1(l, t, u) {
    Qt.push({
      fragmentInstance: l,
      observer: t,
      instance: u
    }), n0 || (n0 = !0, Q1(function() {
      n0 = !1;
      var a = Qt;
      Qt = [];
      for (var e = 0; e < a.length; e++) {
        var n = a[e];
        n.observer.unobserve(n.instance);
      }
    }));
  }
  bt.prototype.getClientRects = function() {
    var l = [];
    return S(
      this._fragmentFiber.child,
      !1,
      C1,
      l,
      void 0,
      void 0
    ), l;
  };
  function C1(l, t) {
    if (l.tag === 6) {
      l = l.stateNode;
      var u = l.ownerDocument.createRange();
      u.selectNodeContents(l), t.push.apply(t, u.getClientRects());
    } else
      l = yl(l), t.push.apply(t, l.getClientRects());
    return !1;
  }
  bt.prototype.getRootNode = function(l) {
    var t = R(
      this._fragmentFiber
    );
    return t === null ? this : yl(t).getRootNode(l);
  }, bt.prototype.compareDocumentPosition = function(l) {
    var t = R(
      this._fragmentFiber
    );
    if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var u = [];
    S(
      this._fragmentFiber.child,
      !1,
      e0,
      u,
      void 0,
      void 0
    );
    var a = yl(t);
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
      return u === l ? e = Node.DOCUMENT_POSITION_CONTAINS : a & Node.DOCUMENT_POSITION_CONTAINED_BY && (u = Wl(t)[1], u === null ? e = Node.DOCUMENT_POSITION_PRECEDING : (l = yl(u).compareDocumentPosition(
        l
      ), e = l === 0 || l & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), e |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    t = yl(u[0]), e = yl(u[u.length - 1]);
    var n = bl(this._fragmentFiber) ? t.parentElement : a;
    if (n == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    a = n.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, n = n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var f = t.compareDocumentPosition(l), c = e.compareDocumentPosition(l), i = f & Node.DOCUMENT_POSITION_CONTAINED_BY || c & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return c = a && n && f & Node.DOCUMENT_POSITION_FOLLOWING && c & Node.DOCUMENT_POSITION_PRECEDING, t = a && t === l || n && e === l || i || c ? Node.DOCUMENT_POSITION_CONTAINED_BY : !a && t === l || !n && e === l ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : f, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || R1(
      t,
      this._fragmentFiber,
      u[0],
      u[u.length - 1],
      l
    ) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function R1(l, t, u, a, e) {
    var n = $u(e);
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
        for (n = t, t = R(t); n !== null; ) {
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
    return l & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!n) && !(t = n === u) && (t = fl(
      u,
      n,
      Ol
    ), t === null ? t = !1 : (S(
      t,
      !0,
      El,
      n,
      u
    ), n = et, et = null, t = n !== null)), t) : l & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!n) && !(t = n === a) && (t = fl(
      a,
      n,
      Ol
    ), t === null ? t = !1 : (S(
      t,
      !0,
      nl,
      n,
      a
    ), n = et, Pl = et = null, t = n !== null)), t) : !1;
  }
  function Em(l, t) {
    var u = l.ownerDocument.createRange();
    u.selectNodeContents(l), l = u.getBoundingClientRect(), window.scrollTo(
      window.scrollX + l.left,
      t ? window.scrollY + l.top : window.scrollY + l.bottom - window.innerHeight
    );
  }
  bt.prototype.scrollIntoView = function(l) {
    if (typeof l == "object") throw Error(g(566));
    var t = [];
    S(
      this._fragmentFiber.child,
      !1,
      e0,
      t,
      void 0,
      void 0
    );
    var u = l !== !1;
    if (t.length === 0) {
      var a = Wl(
        this._fragmentFiber
      );
      if (a = u ? a[1] || a[0] || R(this._fragmentFiber) : a[0] || a[1], a === null) return;
      if (a.tag === 6) {
        l = yl(a), Em(l, u);
        return;
      }
      if (a = yl(a), a.nodeType !== 9) {
        if (a.nodeType === 11) {
          u = "host" in a ? a.host : null, u !== null && u.scrollIntoView(l);
          return;
        }
        a.scrollIntoView(l);
      }
    }
    for (a = u ? t.length - 1 : 0; a !== (u ? -1 : t.length); ) {
      var e = t[a];
      e.tag === 6 ? (e = yl(e), Em(e, u)) : yl(e).scrollIntoView(l), a += u ? -1 : 1;
    }
  };
  function H1(l, t) {
    return l = yl(l), zm(l, t), !1;
  }
  function zm(l, t) {
    l.reactFragments == null && (l.reactFragments = /* @__PURE__ */ new Set()), l.reactFragments.add(t);
  }
  function bm(l, t) {
    var u = t._eventListeners;
    if (u !== null)
      for (var a = 0; a < u.length; a++) {
        var e = u[a];
        l.addEventListener(
          e.type,
          e.attachedListener,
          le(e.optionsOrUseCapture)
        );
      }
    l.nodeType !== 3 && (u = t._observers, u !== null && u.forEach(function(n) {
      for (var f = 0, c = 0; c < Qt.length; c++) {
        var i = Qt[c];
        (i.fragmentInstance !== t || i.observer !== n || i.instance !== l) && (Qt[f++] = i);
      }
      Qt.length = f, n.observe(l);
    }), zm(l, t));
  }
  function Y1(l, t) {
    var u = t._eventListeners;
    if (u !== null)
      for (var a = 0; a < u.length; a++) {
        var e = u[a];
        l.removeEventListener(
          e.type,
          e.attachedListener,
          le(e.optionsOrUseCapture)
        );
      }
    l.nodeType !== 3 && (u = t._observers, u !== null && u.forEach(function(n) {
      typeof n.rootMargin == "string" ? U1(
        t,
        n,
        l
      ) : n.unobserve(l);
    }), l.reactFragments != null && l.reactFragments.delete(t));
  }
  function f0(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var u = t;
      switch (t = t.nextSibling, u.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          f0(u), hn(u);
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
  function q1(l, t, u, a) {
    for (; l.nodeType === 1; ) {
      var e = u;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden"))
          break;
      } else if (a) {
        if (!l[me])
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
      if (l = Ct(l.nextSibling), l === null) break;
    }
    return null;
  }
  function B1(l, t, u) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !u || (l = Ct(l.nextSibling), l === null)) return null;
    return l;
  }
  function _m(l, t) {
    for (; l.nodeType !== 8; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t || (l = Ct(l.nextSibling), l === null)) return null;
    return l;
  }
  function c0(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function i0(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
  }
  function G1(l, t) {
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
  function Ct(l) {
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
  var o0 = null;
  function Om(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var u = l.data;
        if (u === "/$" || u === "/&") {
          if (t === 0)
            return Ct(l.nextSibling);
          t--;
        } else
          u !== "$" && u !== "$!" && u !== "$?" && u !== "$~" && u !== "&" || t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function Am(l) {
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
  function X1(l, t) {
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
  function Q1(l) {
    ym(function() {
      ym(function(t) {
        return l(t);
      });
    });
  }
  function Nm(l, t, u) {
    switch (t = $e(u), l) {
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
  function Mm(l, t, u) {
    for (var a in u) {
      var e = u[a];
      u.hasOwnProperty(a) && e != null && ol(l, t, a, null, s1, e);
    }
    u.dangerouslySetInnerHTML != null && (l.textContent = ""), l.onclick === Vt && (l.onclick = null), hn(l);
  }
  function v0(l) {
    for (var t = l.attributes; t.length; )
      l.removeAttributeNode(t[0]);
    hn(l);
  }
  var Rt = /* @__PURE__ */ new Map(), Dm = /* @__PURE__ */ new Set();
  function Fe(l) {
    if (typeof l.getRootNode == "function") {
      var t = l.getRootNode();
      if (t.nodeType === 9 || t.nodeType === 11) return t;
    }
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  var du = Q.d;
  Q.d = {
    f: j1,
    r: Z1,
    D: V1,
    C: p1,
    L: x1,
    m: L1,
    X: J1,
    S: K1,
    M: w1
  };
  function j1() {
    var l = du.f(), t = Tf();
    return l || t;
  }
  function Z1(l) {
    var t = Ta(l);
    t !== null && t.tag === 5 && t.type === "form" ? Cv(t) : du.r(l);
  }
  var te = typeof document > "u" ? null : document;
  function Um(l, t, u) {
    var a = te;
    if (a && typeof t == "string" && t) {
      var e = _t(t);
      e = 'link[rel="' + l + '"][href="' + e + '"]', typeof u == "string" && (e += '[crossorigin="' + u + '"]'), Dm.has(e) || (Dm.add(e), l = { rel: l, crossOrigin: u, href: t }, a.querySelector(e) === null && (t = a.createElement("link"), $l(t, "link", l), Xl(t), a.head.appendChild(t)));
    }
  }
  function V1(l) {
    du.D(l), Um("dns-prefetch", l, null);
  }
  function p1(l, t) {
    du.C(l, t), Um("preconnect", l, t);
  }
  function x1(l, t, u) {
    du.L(l, t, u);
    var a = te;
    if (a && l && t) {
      var e = 'link[rel="preload"][as="' + _t(t) + '"]';
      t === "image" && u && u.imageSrcSet ? (e += '[imagesrcset="' + _t(
        u.imageSrcSet
      ) + '"]', typeof u.imageSizes == "string" && (e += '[imagesizes="' + _t(
        u.imageSizes
      ) + '"]')) : e += '[href="' + _t(l) + '"]';
      var n = e;
      switch (t) {
        case "style":
          n = ue(l);
          break;
        case "script":
          n = ae(l);
      }
      if (!(Rt.has(n) || (l = Z(
        {
          rel: "preload",
          href: t === "image" && u && u.imageSrcSet ? void 0 : l,
          as: t
        },
        u
      ), Rt.set(n, l), a.querySelector(e) !== null || t === "style" && a.querySelector(We(n)) || t === "script" && a.querySelector(Ie(n))))) {
        var f = a.createElement("link");
        $l(f, "link", l), t === "style" && (f[dn] = !0, f.onload = f.onerror = function() {
          V0(f);
        }), Xl(f), a.head.appendChild(f);
      }
    }
  }
  function L1(l, t) {
    du.m(l, t);
    var u = te;
    if (u && l) {
      var a = t && typeof t.as == "string" ? t.as : "script", e = 'link[rel="modulepreload"][as="' + _t(a) + '"][href="' + _t(l) + '"]', n = e;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = ae(l);
      }
      if (!Rt.has(n) && (l = Z({ rel: "modulepreload", href: l }, t), Rt.set(n, l), u.querySelector(e) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (u.querySelector(Ie(n)))
              return;
        }
        a = u.createElement("link"), $l(a, "link", l), Xl(a), u.head.appendChild(a);
      }
    }
  }
  function K1(l, t, u) {
    du.S(l, t, u);
    var a = te;
    if (a && l) {
      var e = Ea(a).hoistableStyles, n = ue(l);
      t = t || "default";
      var f = e.get(n);
      if (!f) {
        var c = { loading: 0, preload: null };
        if (f = a.querySelector(
          We(n)
        ))
          c.loading = 5;
        else {
          l = Z(
            { rel: "stylesheet", href: l, "data-precedence": t },
            u
          ), (u = Rt.get(n)) && y0(l, u);
          var i = f = a.createElement("link");
          Xl(i), $l(i, "link", l), i._p = new Promise(function(s, r) {
            i.onload = s, i.onerror = r;
          }), i.addEventListener("load", function() {
            c.loading |= 1;
          }), i.addEventListener("error", function() {
            c.loading |= 2;
          }), c.loading |= 4, Nf(f, t, a);
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
  function J1(l, t) {
    du.X(l, t);
    var u = te;
    if (u && l) {
      var a = Ea(u).hoistableScripts, e = ae(l), n = a.get(e);
      n || (n = u.querySelector(Ie(e)), n || (l = Z({ src: l, async: !0 }, t), (t = Rt.get(e)) && m0(l, t), n = u.createElement("script"), Xl(n), $l(n, "link", l), u.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(e, n));
    }
  }
  function w1(l, t) {
    du.M(l, t);
    var u = te;
    if (u && l) {
      var a = Ea(u).hoistableScripts, e = ae(l), n = a.get(e);
      n || (n = u.querySelector(Ie(e)), n || (l = Z({ src: l, async: !0, type: "module" }, t), (t = Rt.get(e)) && m0(l, t), n = u.createElement("script"), Xl(n), $l(n, "link", l), u.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(e, n));
    }
  }
  function Cm(l, t, u, a) {
    var e = (e = gu.current) ? Fe(e) : null;
    if (!e) throw Error(g(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof u.precedence == "string" && typeof u.href == "string" ? (u = ue(u.href), t = Ea(
          e
        ).hoistableStyles, a = t.get(u), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, t.set(u, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (u.rel === "stylesheet" && typeof u.href == "string" && typeof u.precedence == "string") {
          l = ue(u.href);
          var n = Ea(
            e
          ).hoistableStyles, f = n.get(l);
          if (f || (e = e.ownerDocument || e, f = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, n.set(l, f), (n = e.querySelector(
            We(l)
          )) ? n._p || (f.instance = n, f.state.loading = 5) : (n = Rt.get(l), n || (n = {
            rel: "preload",
            as: "style",
            href: u.href,
            crossOrigin: u.crossOrigin,
            integrity: u.integrity,
            media: u.media,
            hrefLang: u.hrefLang,
            referrerPolicy: u.referrerPolicy
          }, Rt.set(l, n)), $1(
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
        return t = u.async, u = u.src, typeof u == "string" && t && typeof t != "function" && typeof t != "symbol" ? (u = ae(u), t = Ea(
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
  function ue(l) {
    return 'href="' + _t(l) + '"';
  }
  function We(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function Rm(l) {
    return Z({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function $1(l, t, u, a) {
    if (t = l.querySelector(
      'link[rel="preload"][as="style"][' + t + "]"
    )) {
      if (t[dn] !== !0) {
        a.loading = 1;
        return;
      }
    } else
      t = l.createElement("link"), t[dn] = !0, t.onload = t.onerror = V0.bind(null, t), $l(t, "link", u), Xl(t), l.head.appendChild(t);
    a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    });
  }
  function ae(l) {
    return '[src="' + _t(l) + '"]';
  }
  function Ie(l) {
    return "script[async]" + l;
  }
  function Hm(l, t, u) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = l.querySelector(
            'style[data-href~="' + _t(u.href) + '"]'
          );
          if (a)
            return t.instance = a, Xl(a), a;
          var e = Z({}, u, {
            "data-href": u.href,
            "data-precedence": u.precedence,
            href: null,
            precedence: null
          });
          return a = (l.ownerDocument || l).createElement(
            "style"
          ), Xl(a), $l(a, "style", e), Nf(a, u.precedence, l), t.instance = a;
        case "stylesheet":
          e = ue(u.href);
          var n = l.querySelector(
            We(e)
          );
          if (n)
            return t.state.loading |= 4, t.instance = n, Xl(n), n;
          a = Rm(u), (e = Rt.get(e)) && y0(a, e), n = (l.ownerDocument || l).createElement("link"), Xl(n);
          var f = n;
          return f._p = new Promise(function(c, i) {
            f.onload = c, f.onerror = i;
          }), $l(n, "link", a), t.state.loading |= 4, Nf(n, u.precedence, l), t.instance = n;
        case "script":
          return n = ae(u.src), (e = l.querySelector(
            Ie(n)
          )) ? (t.instance = e, Xl(e), e) : (a = u, (e = Rt.get(n)) && (a = Z({}, u), m0(a, e)), l = l.ownerDocument || l, e = l.createElement("script"), Xl(e), $l(e, "link", a), l.head.appendChild(e), t.instance = e);
        case "void":
          return null;
        default:
          throw Error(g(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, Nf(a, u.precedence, l));
    return t.instance;
  }
  function Nf(l, t, u) {
    for (var a = u.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), e = a.length ? a[a.length - 1] : null, n = e, f = 0; f < a.length; f++) {
      var c = a[f];
      if (c.dataset.precedence === t) n = c;
      else if (n !== e) break;
    }
    n ? n.parentNode.insertBefore(l, n.nextSibling) : (t = u.nodeType === 9 ? u.head : u, t.insertBefore(l, t.firstChild));
  }
  function y0(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
  }
  function m0(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
  }
  var Mf = null;
  function Ym(l, t, u) {
    if (Mf === null) {
      var a = /* @__PURE__ */ new Map(), e = Mf = /* @__PURE__ */ new Map();
      e.set(u, a);
    } else
      e = Mf, a = e.get(u), a || (a = /* @__PURE__ */ new Map(), e.set(u, a));
    if (a.has(l)) return a;
    for (a.set(l, null), u = u.getElementsByTagName(l), e = 0; e < u.length; e++) {
      var n = u[e];
      if (!(n[me] || n[xl] || l === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var f = n.getAttribute(t) || "";
        f = l + f;
        var c = a.get(f);
        c ? c.push(n) : a.set(f, [n]);
      }
    }
    return a;
  }
  function s0(l, t, u) {
    l = l.ownerDocument || l, l.head.insertBefore(
      u,
      t === "title" ? l.querySelector("head > title") : null
    );
  }
  function F1(l, t, u) {
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
  function Bm(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function Gm(l) {
    return (l.width || 100) * (l.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function Xm(l, t) {
    typeof t.decode == "function" && (l.imgCount++, t.complete || (l.imgBytes += Gm(t), l.suspenseyImages.push(t)), l = k1.bind(l), t.decode().then(l, l));
  }
  function W1(l, t, u, a) {
    if (u.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (u.state.loading & 4) === 0) {
      if (u.instance === null) {
        var e = ue(a.href), n = t.querySelector(
          We(e)
        );
        if (n) {
          t = n._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = ke.bind(l), t.then(l, l)), u.state.loading |= 4, u.instance = n, Xl(n);
          return;
        }
        n = t.ownerDocument || t, a = Rm(a), (e = Rt.get(e)) && y0(a, e), n = n.createElement("link"), Xl(n);
        var f = n;
        f._p = new Promise(function(c, i) {
          f.onload = c, f.onerror = i;
        }), $l(n, "link", a), u.instance = n;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(u, t), (t = u.state.preload) && (u.state.loading & 3) === 0 && (l.count++, u = ke.bind(l), t.addEventListener("load", u), t.addEventListener("error", u));
    }
  }
  var Df = 0;
  function I1(l, t) {
    return l.stylesheets && l.count === 0 && Cf(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(u) {
      var a = setTimeout(function() {
        if (l.stylesheets && Cf(l, l.stylesheets), l.unsuspend) {
          var n = l.unsuspend;
          l.unsuspend = null, n();
        }
      }, 6e4 + t);
      0 < l.imgBytes && Df === 0 && (Df = 62500 * h1());
      var e = setTimeout(
        function() {
          if (l.waitingForImages = !1, l.count === 0 && (l.stylesheets && Cf(l, l.stylesheets), l.unsuspend)) {
            var n = l.unsuspend;
            l.unsuspend = null, n();
          }
        },
        (l.imgBytes > Df ? 50 : 800) + t
      );
      return l.unsuspend = u, function() {
        l.unsuspend = null, clearTimeout(a), clearTimeout(e);
      };
    } : null;
  }
  function Qm(l) {
    if (l.count === 0 && (l.imgCount === 0 || !l.waitingForImages)) {
      if (l.stylesheets) Cf(l, l.stylesheets);
      else if (l.unsuspend) {
        var t = l.unsuspend;
        l.unsuspend = null, t();
      }
    }
  }
  function ke() {
    this.count--, Qm(this);
  }
  function k1() {
    this.imgCount--, Qm(this);
  }
  var Uf = null;
  function Cf(l, t) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, Uf = /* @__PURE__ */ new Map(), t.forEach(P1, l), Uf = null, ke.call(l));
  }
  function P1(l, t) {
    if (!(t.state.loading & 4)) {
      var u = Uf.get(l);
      if (u) var a = u.get(null);
      else {
        u = /* @__PURE__ */ new Map(), Uf.set(l, u);
        for (var e = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), n = 0; n < e.length; n++) {
          var f = e[n];
          (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") && (u.set(f.dataset.precedence, f), a = f);
        }
        a && u.set(null, a);
      }
      e = t.instance, f = e.getAttribute("data-precedence"), n = u.get(f) || a, n === a && u.set(null, e), u.set(f, e), this.count++, a = ke.bind(this), e.addEventListener("load", a), e.addEventListener("error", a), n ? n.parentNode.insertBefore(e, n.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(e, l.firstChild)), t.state.loading |= 4;
    }
  }
  var ee = {
    $$typeof: Gl,
    Provider: null,
    Consumer: null,
    _currentValue: Pt,
    _currentValue2: Pt,
    _threadCount: 0
  };
  function lh(l, t, u, a, e, n, f, c, i) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = wf(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = wf(0), this.hiddenUpdates = wf(null), this.identifierPrefix = a, this.onUncaughtError = e, this.onCaughtError = n, this.onRecoverableError = f, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = i, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function jm(l, t, u, a, e, n, f, c, i, s, r, E) {
    return l = new lh(
      l,
      t,
      u,
      f,
      i,
      s,
      r,
      E,
      c
    ), t = 1, n === !0 && (t |= 24), n = ft(3, null, null, t), l.current = n, n.stateNode = l, t = Dc(), t.refCount++, l.pooledCache = t, t.refCount++, n.memoizedState = {
      element: a,
      isDehydrated: u,
      cache: t
    }, Hc(n), l;
  }
  function Zm(l) {
    return l ? (l = Ca, l) : Ca;
  }
  function Vm(l, t, u, a, e, n) {
    e = Zm(e), a.context === null ? a.context = e : a.pendingContext = e, a = Mu(t), a.payload = { element: u }, n = n === void 0 ? null : n, n !== null && (a.callback = n), u = Du(l, a, t), u !== null && (vt(u, l, t), Ue(u, l, t));
  }
  function pm(l, t) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var u = l.retryLane;
      l.retryLane = u !== 0 && u < t ? u : t;
    }
  }
  function d0(l, t) {
    pm(l, t), (l = l.alternate) && pm(l, t);
  }
  function xm(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = ku(l, 67108864);
      t !== null && vt(t, l, 67108864), d0(l, 67108864);
    }
  }
  function Lm(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = zt();
      t = $f(t);
      var u = ku(l, t);
      u !== null && vt(u, l, t), d0(l, t);
    }
  }
  var ne = !0;
  function th(l, t, u, a) {
    var e = M.T;
    M.T = null;
    var n = Q.p;
    try {
      Q.p = 2, h0(l, t, u, a);
    } finally {
      Q.p = n, M.T = e;
    }
  }
  function uh(l, t, u, a) {
    var e = M.T;
    M.T = null;
    var n = Q.p;
    try {
      Q.p = 8, h0(l, t, u, a);
    } finally {
      Q.p = n, M.T = e;
    }
  }
  function h0(l, t, u, a) {
    if (ne) {
      var e = g0(a);
      if (e === null)
        Wi(
          l,
          t,
          a,
          Rf,
          u
        ), Jm(l, a);
      else if (eh(
        e,
        l,
        t,
        u,
        a
      ))
        a.stopPropagation();
      else if (Jm(l, a), t & 4 && -1 < ah.indexOf(l)) {
        for (; e !== null; ) {
          var n = Ta(e);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                  var f = wu(n.pendingLanes);
                  if (f !== 0) {
                    var c = n;
                    for (c.pendingLanes |= 2, c.entangledLanes |= 2; f; ) {
                      var i = 1 << 31 - dt(f);
                      c.entanglements[1] |= i, f &= ~i;
                    }
                    It(n), (tl & 6) === 0 && (gf = mt() + 500, Ke(0));
                  }
                }
                break;
              case 31:
              case 13:
                c = ku(n, 2), c !== null && vt(c, n, 2), Tf(), d0(n, 2);
            }
          if (n = g0(a), n === null && Wi(
            l,
            t,
            a,
            Rf,
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
  function g0(l) {
    return l = tc(l), r0(l);
  }
  var Rf = null;
  function r0(l) {
    if (Rf = null, l = $u(l), l !== null) {
      var t = ul(l);
      if (t === null) l = null;
      else {
        var u = t.tag;
        if (u === 13) {
          if (l = Tl(t), l !== null) return l;
          l = null;
        } else if (u === 31) {
          if (l = ql(t), l !== null) return l;
          l = null;
        } else if (u === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return Rf = l, null;
  }
  function Km(l) {
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
        switch (hs()) {
          case U0:
            return 2;
          case C0:
            return 8;
          case on:
          case gs:
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
  var S0 = !1, Zu = null, Vu = null, pu = null, Pe = /* @__PURE__ */ new Map(), ln = /* @__PURE__ */ new Map(), xu = [], ah = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Jm(l, t) {
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
        pu = null;
        break;
      case "pointerover":
      case "pointerout":
        Pe.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        ln.delete(t.pointerId);
    }
  }
  function tn(l, t, u, a, e, n) {
    return l === null || l.nativeEvent !== n ? (l = {
      blockedOn: t,
      domEventName: u,
      eventSystemFlags: a,
      nativeEvent: n,
      targetContainers: [e]
    }, t !== null && (t = Ta(t), t !== null && xm(t)), l) : (l.eventSystemFlags |= a, t = l.targetContainers, e !== null && t.indexOf(e) === -1 && t.push(e), l);
  }
  function eh(l, t, u, a, e) {
    switch (t) {
      case "focusin":
        return Zu = tn(
          Zu,
          l,
          t,
          u,
          a,
          e
        ), !0;
      case "dragenter":
        return Vu = tn(
          Vu,
          l,
          t,
          u,
          a,
          e
        ), !0;
      case "mouseover":
        return pu = tn(
          pu,
          l,
          t,
          u,
          a,
          e
        ), !0;
      case "pointerover":
        var n = e.pointerId;
        return Pe.set(
          n,
          tn(
            Pe.get(n) || null,
            l,
            t,
            u,
            a,
            e
          )
        ), !0;
      case "gotpointercapture":
        return n = e.pointerId, ln.set(
          n,
          tn(
            ln.get(n) || null,
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
  function wm(l) {
    var t = $u(l.target);
    if (t !== null) {
      var u = ul(t);
      if (u !== null) {
        if (t = u.tag, t === 13) {
          if (t = Tl(u), t !== null) {
            l.blockedOn = t, Q0(l.priority, function() {
              Lm(u);
            });
            return;
          }
        } else if (t === 31) {
          if (t = ql(u), t !== null) {
            l.blockedOn = t, Q0(l.priority, function() {
              Lm(u);
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
  function Hf(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var u = g0(l.nativeEvent);
      if (u === null) {
        u = l.nativeEvent;
        var a = new u.constructor(
          u.type,
          u
        );
        lc = a, u.target.dispatchEvent(a), lc = null;
      } else
        return t = Ta(u), t !== null && xm(t), l.blockedOn = u, !1;
      t.shift();
    }
    return !0;
  }
  function $m(l, t, u) {
    Hf(l) && u.delete(t);
  }
  function nh() {
    S0 = !1, Zu !== null && Hf(Zu) && (Zu = null), Vu !== null && Hf(Vu) && (Vu = null), pu !== null && Hf(pu) && (pu = null), Pe.forEach($m), ln.forEach($m);
  }
  function Yf(l, t) {
    l.blockedOn === t && (l.blockedOn = null, S0 || (S0 = !0, b.unstable_scheduleCallback(
      b.unstable_NormalPriority,
      nh
    )));
  }
  var qf = null;
  function Fm(l) {
    qf !== l && (qf = l, b.unstable_scheduleCallback(
      b.unstable_NormalPriority,
      function() {
        qf === l && (qf = null);
        for (var t = 0; t < l.length; t += 3) {
          var u = l[t], a = l[t + 1], e = l[t + 2];
          if (typeof a != "function") {
            if (r0(a || u) === null)
              continue;
            break;
          }
          var n = Ta(u);
          n !== null && (l.splice(t, 3), t -= 3, Pc(
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
  function fe(l) {
    function t(i) {
      return Yf(i, l);
    }
    Zu !== null && Yf(Zu, l), Vu !== null && Yf(Vu, l), pu !== null && Yf(pu, l), Pe.forEach(t), ln.forEach(t);
    for (var u = 0; u < xu.length; u++) {
      var a = xu[u];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < xu.length && (u = xu[0], u.blockedOn === null); )
      wm(u), u.blockedOn === null && xu.shift();
    if (u = (l.ownerDocument || l).$$reactFormReplay, u != null)
      for (a = 0; a < u.length; a += 3) {
        var e = u[a], n = u[a + 1], f = e[nt] || null;
        if (typeof n == "function")
          f || Fm(u);
        else if (f) {
          var c = null;
          if (n && n.hasAttribute("formAction")) {
            if (e = n, f = n[nt] || null)
              c = f.formAction;
            else if (r0(e) !== null) continue;
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
  function T0(l) {
    this._internalRoot = l;
  }
  Bf.prototype.render = T0.prototype.render = function(l) {
    var t = this._internalRoot;
    if (t === null) throw Error(g(409));
    var u = t.current, a = zt();
    Vm(u, a, l, t, null, null);
  }, Bf.prototype.unmount = T0.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      Vm(l.current, 2, null, l, null, null), Tf(), t[Sa] = null;
    }
  };
  function Bf(l) {
    this._internalRoot = l;
  }
  Bf.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var t = X0();
      l = { blockedOn: null, target: l, priority: t };
      for (var u = 0; u < xu.length && t !== 0 && t < xu[u].priority; u++) ;
      xu.splice(u, 0, l), u === 0 && wm(l);
    }
  };
  var Im = B.version;
  if (Im !== "19.3.0")
    throw Error(
      g(
        527,
        Im,
        "19.3.0"
      )
    );
  Q.findDOMNode = function(l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function" ? Error(g(188)) : (l = Object.keys(l).join(","), Error(g(268, l)));
    return l = sl(t), l = l !== null ? H(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var fh = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: M,
    reconcilerVersion: "19.3.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Gf = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Gf.isDisabled && Gf.supportsFiber)
      try {
        oe = Gf.inject(
          fh
        ), st = Gf;
      } catch {
      }
  }
  return an.createRoot = function(l, t) {
    if (!F(l)) throw Error(g(299));
    var u = !1, a = "", e = Zv, n = Vv, f = pv;
    return t != null && (t.unstable_strictMode === !0 && (u = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (e = t.onUncaughtError), t.onCaughtError !== void 0 && (n = t.onCaughtError), t.onRecoverableError !== void 0 && (f = t.onRecoverableError)), t = jm(
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
    ), l[Sa] = t.current, Fi(l), new T0(t);
  }, an.hydrateRoot = function(l, t, u) {
    if (!F(l)) throw Error(g(299));
    var a = !1, e = "", n = Zv, f = Vv, c = pv, i = null;
    return u != null && (u.unstable_strictMode === !0 && (a = !0), u.identifierPrefix !== void 0 && (e = u.identifierPrefix), u.onUncaughtError !== void 0 && (n = u.onUncaughtError), u.onCaughtError !== void 0 && (f = u.onCaughtError), u.onRecoverableError !== void 0 && (c = u.onRecoverableError), u.formState !== void 0 && (i = u.formState)), t = jm(
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
    ), t.context = Zm(null), u = t.current, a = zt(), a = $f(a), e = Mu(a), e.callback = null, Du(u, e, a), u = a, t.current.lanes = u, ye(t, u), It(t), l[Sa] = t.current, Fi(l), new Bf(t);
  }, an.version = "19.3.0", an;
}
var cs;
function gh() {
  if (cs) return z0.exports;
  cs = 1;
  function b() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(b);
      } catch (B) {
        console.error(B);
      }
  }
  return b(), z0.exports = hh(), z0.exports;
}
var rh = gh(), ce = N0();
function Sh(b) {
  const B = b.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  return B ? { h: parseFloat(B[1]), s: parseFloat(B[2]), l: parseFloat(B[3]) } : { h: 40, s: 80, l: 80 };
}
function Th(b, B) {
  const { h: X, s: g, l: F } = Sh(b), ul = `${X}deg ${g}% ${F}%`, Tl = [100, 60, 50, 40, 30, 20, 10], ql = ["", "-60", "-50", "-40", "-30", "-20", "-10"], vl = {};
  for (let sl = 0; sl < Tl.length; sl++)
    vl[`--glow-color${ql[sl]}`] = `hsl(${ul} / ${Math.min(Tl[sl] * B, 100)}%)`;
  return vl;
}
const Eh = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"], zh = ["--gradient-one", "--gradient-two", "--gradient-three", "--gradient-four", "--gradient-five", "--gradient-six", "--gradient-seven"], bh = [0, 1, 2, 0, 1, 2, 1];
function _h(b) {
  const B = {};
  for (let X = 0; X < 7; X++) {
    const g = b[Math.min(bh[X], b.length - 1)];
    B[zh[X]] = `radial-gradient(at ${Eh[X]}, ${g} 0px, transparent 50%)`;
  }
  return B["--gradient-base"] = `linear-gradient(${b[0]} 0 100%)`, B;
}
function Oh(b) {
  const B = b.trim().replace("#", "");
  if (!/^[\da-f]{3}([\da-f]{3})?$/i.test(B)) return !1;
  const X = B.length === 3 ? B.split("").map((Tl) => Tl + Tl).join("") : B, g = parseInt(X.slice(0, 2), 16), F = parseInt(X.slice(2, 4), 16), ul = parseInt(X.slice(4, 6), 16);
  return g * 0.2126 + F * 0.7152 + ul * 0.0722 > 180;
}
function ys(b) {
  return 1 - Math.pow(1 - b, 3);
}
function is(b) {
  return b * b * b;
}
function Xf({ start: b = 0, end: B = 100, duration: X = 1e3, delay: g = 0, ease: F = ys, onUpdate: ul, onEnd: Tl }) {
  const ql = performance.now() + g;
  function vl() {
    const sl = performance.now() - ql, H = Math.min(sl / X, 1);
    ul(b + (B - b) * F(H)), H < 1 ? requestAnimationFrame(vl) : Tl && Tl();
  }
  setTimeout(() => requestAnimationFrame(vl), g);
}
const Ah = ({
  children: b,
  className: B = "",
  edgeSensitivity: X = 30,
  glowColor: g = "40 80",
  backgroundColor: F = "#120F17",
  borderRadius: ul = 28,
  glowRadius: Tl = 40,
  glowIntensity: ql = 1,
  coneSpread: vl = 25,
  animated: sl = !1,
  colors: H = ["#c084fc", "#f472b6", "#38bdf8"],
  fillOpacity: S = 0.5
}) => {
  const R = ce.useRef(null), bl = ce.useCallback((El) => {
    const { width: nl, height: Ol } = El.getBoundingClientRect();
    return [nl / 2, Ol / 2];
  }, []), Wl = ce.useCallback((El, nl, Ol) => {
    const [fl, Z] = bl(El), x = nl - fl, Bl = Ol - Z;
    let Il = 1 / 0, Hl = 1 / 0;
    return x !== 0 && (Il = fl / Math.abs(x)), Bl !== 0 && (Hl = Z / Math.abs(Bl)), Math.min(Math.max(1 / Math.min(Il, Hl), 0), 1);
  }, [bl]), Vl = ce.useCallback((El, nl, Ol) => {
    const [fl, Z] = bl(El), x = nl - fl, Bl = Ol - Z;
    if (x === 0 && Bl === 0) return 0;
    let Hl = Math.atan2(Bl, x) * (180 / Math.PI) + 90;
    return Hl < 0 && (Hl += 360), Hl;
  }, [bl]), yl = ce.useCallback((El) => {
    const nl = R.current;
    if (!nl) return;
    const Ol = nl.getBoundingClientRect(), fl = El.clientX - Ol.left, Z = El.clientY - Ol.top, x = Wl(nl, fl, Z), Bl = Vl(nl, fl, Z);
    nl.style.setProperty("--edge-proximity", `${(x * 100).toFixed(3)}`), nl.style.setProperty("--cursor-angle", `${Bl.toFixed(3)}deg`);
  }, [Wl, Vl]);
  ce.useEffect(() => {
    if (!sl || !R.current) return;
    const El = R.current, nl = 110, Ol = 465;
    El.classList.add("sweep-active"), El.style.setProperty("--cursor-angle", `${nl}deg`), Xf({ duration: 500, onUpdate: (fl) => El.style.setProperty("--edge-proximity", fl) }), Xf({ ease: is, duration: 1500, end: 50, onUpdate: (fl) => {
      El.style.setProperty("--cursor-angle", `${(Ol - nl) * (fl / 100) + nl}deg`);
    } }), Xf({ ease: ys, delay: 1500, duration: 2250, start: 50, end: 100, onUpdate: (fl) => {
      El.style.setProperty("--cursor-angle", `${(Ol - nl) * (fl / 100) + nl}deg`);
    } }), Xf({
      ease: is,
      delay: 2500,
      duration: 1500,
      start: 100,
      end: 0,
      onUpdate: (fl) => El.style.setProperty("--edge-proximity", fl),
      onEnd: () => El.classList.remove("sweep-active")
    });
  }, [sl]);
  const et = Th(g, ql), Pl = Oh(F);
  return /* @__PURE__ */ en.jsxs(
    "div",
    {
      ref: R,
      onPointerMove: yl,
      className: `border-glow-card${Pl ? "border-glow-card--light" : ""} ${B}`,
      style: {
        "--card-bg": F,
        "--edge-sensitivity": X,
        "--border-radius": `${ul}px`,
        "--glow-padding": `${Tl}px`,
        "--cone-spread": vl,
        "--fill-opacity": S,
        ...et,
        ..._h(H)
      },
      children: [
        /* @__PURE__ */ en.jsx("span", { className: "edge-light" }),
        /* @__PURE__ */ en.jsx("div", { className: "border-glow-inner", children: b })
      ]
    }
  );
}, Qf = /* @__PURE__ */ new Map();
function os() {
  const b = Array.from(
    document.querySelectorAll("#msServicesDeck .ms3d-card")
  );
  for (const B of b) {
    if (Qf.has(B) || B.dataset.reactBitsBorderGlow === "1") continue;
    const X = B.querySelector(":scope > .ms3d-inner");
    if (!X) continue;
    const g = X.innerHTML;
    X.remove(), B.dataset.reactBitsBorderGlow = "1", B.classList.add("ms-react-bits-border-glow-card");
    const F = document.createElement("div");
    F.className = "ms-react-bits-border-glow-host", B.appendChild(F);
    const ul = rh.createRoot(F);
    ul.render(
      /* @__PURE__ */ en.jsx(
        Ah,
        {
          className: "ms-react-bits-border-glow",
          edgeSensitivity: 28,
          glowColor: "48 90 86",
          backgroundColor: "rgba(7, 12, 20, 0.28)",
          borderRadius: 22,
          glowRadius: 38,
          glowIntensity: 0.82,
          coneSpread: 24,
          colors: ["#f6f1d9", "#4169e1", "#c9ff36"],
          fillOpacity: 0.18,
          children: /* @__PURE__ */ en.jsx(
            "div",
            {
              className: "ms3d-inner",
              dangerouslySetInnerHTML: { __html: g }
            }
          )
        }
      )
    ), Qf.set(B, { root: ul, host: F });
  }
}
function vs() {
  os();
  const b = new MutationObserver(() => os());
  b.observe(document.documentElement, {
    childList: !0,
    subtree: !0
  }), window.addEventListener(
    "pagehide",
    () => {
      b.disconnect();
      for (const { root: B } of Qf.values()) B.unmount();
      Qf.clear();
    },
    { once: !0 }
  );
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", vs, { once: !0 }) : vs();
