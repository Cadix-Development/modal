import * as Ne from "vue";
import { computed as $, provide as Ce, createBlock as C, createCommentVNode as L, openBlock as x, unref as m, mergeProps as P, onUnmounted as _, onBeforeMount as ft, onMounted as Z, watch as B, createElementBlock as K, Fragment as Oe, renderSlot as E, ref as h, h as F, readonly as mt, markRaw as Ue, nextTick as X, toValue as pt, inject as ae, onBeforeUnmount as fe, useAttrs as _e, defineComponent as A, toRefs as Ke, normalizeProps as vt, guardReactiveProps as gt, withCtx as w, createVNode as S, getCurrentInstance as Q, Teleport as yt, toHandlerKey as ht, camelize as xt, effectScope as qe, Comment as wt, cloneVNode as bt, getCurrentScope as Et, onScopeDispose as Ct, reactive as Xe, watchEffect as q, normalizeStyle as Ot, createElementVNode as W, normalizeClass as J, Transition as Ae, resolveDynamicComponent as $e, withModifiers as At } from "vue";
import { usePage as Ve, router as te } from "@inertiajs/vue3";
import { mergeDataIntoQueryString as $t } from "@inertiajs/core";
import me from "axios";
const z = {
  type: "modal",
  navigate: !1,
  modal: {
    closeButton: !0,
    closeExplicitly: !1,
    maxWidth: "2xl",
    paddingClasses: "p-4 sm:p-6",
    panelClasses: "bg-white rounded",
    position: "center"
  },
  slideover: {
    closeButton: !0,
    closeExplicitly: !1,
    maxWidth: "md",
    paddingClasses: "p-4 sm:p-6",
    panelClasses: "bg-white min-h-screen",
    position: "right"
  }
};
class Mt {
  constructor() {
    this.config = z, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(z));
  }
  put(t, n) {
    if (typeof t == "object") {
      this.config = {
        type: t.type ?? z.type,
        navigate: t.navigate ?? z.navigate,
        modal: { ...z.modal, ...t.modal ?? {} },
        slideover: { ...z.slideover, ...t.slideover ?? {} }
      };
      return;
    }
    const o = t.split(".");
    let a = this.config;
    for (let s = 0; s < o.length - 1; s++) {
      const r = o[s];
      a[r] == null && (a[r] = {}), a = a[r];
    }
    const l = o[o.length - 1];
    a[l] = n;
  }
  get(t) {
    if (typeof t > "u")
      return this.config;
    const n = t.split(".");
    let o = this.config;
    for (const a of n) {
      if (o[a] === void 0)
        return null;
      o = o[a];
    }
    return o;
  }
}
const ve = new Mt(), ao = () => ve.reset(), lo = (e, t) => ve.put(e, t), Me = (e) => ve.get(e), H = (e, t) => ve.get(e ? `slideover.${t}` : `modal.${t}`);
function St(e, t) {
  return e = typeof e == "string" ? new URL(e, window.location.origin) : e, t = typeof t == "string" ? new URL(t, window.location.origin) : t, `${e.origin}${e.pathname}` == `${t.origin}${t.pathname}`;
}
function we(e = "inertiaui_modal_") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${e}${crypto.randomUUID()}` : `${e}${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`;
}
function G(e) {
  return typeof e == "string" ? e.toLowerCase() : e;
}
function Bt(e, t, n = !1) {
  let o = t;
  if (n && (o = t.map(G)), Array.isArray(e))
    return e.filter((l) => {
      const s = n ? G(l) : l;
      return !o.includes(s);
    });
  const a = e;
  return Object.keys(a).reduce((l, s) => {
    const r = n ? G(s) : s;
    return o.includes(r) || (l[s] = a[s]), l;
  }, {});
}
function ze(e, t, n = !1) {
  let o = t;
  if (n && (o = t.map(G)), Array.isArray(e))
    return e.filter((l) => {
      const s = n ? G(l) : l;
      return o.includes(s);
    });
  const a = e;
  return Object.keys(a).reduce((l, s) => {
    const r = n ? G(s) : s;
    return o.includes(r) && (l[s] = a[s]), l;
  }, {});
}
function Dt(e) {
  if (Array.isArray(e))
    return e.filter((n) => n !== null);
  const t = e;
  return Object.keys(t).reduce((n, o) => {
    const a = t[o];
    return a !== null && (n[o] = a), n;
  }, {});
}
function It(e, t = 3, n = 10) {
  return new Promise((o, a) => {
    let l = e();
    if (l) {
      o(l);
      return;
    }
    let s = t * 1e3 / n;
    const r = setInterval(() => {
      if (l = e(), l) {
        clearInterval(r), o(l);
        return;
      }
      --s <= 0 && (clearInterval(r), a(new Error("Condition not met in time")));
    }, n);
  });
}
function ie(e) {
  return e ? (e = e.replace(/_/g, "-"), e = e.replace(/-+/g, "-"), /[A-Z]/.test(e) ? (e = e.replace(/\s+/g, "").replace(/_/g, "").replace(/(?:^|\s|-)+([A-Za-z])/g, (t, n) => n.toUpperCase()), e = e.replace(/(.)(?=[A-Z])/g, "$1-"), e.toLowerCase()) : e) : "";
}
const He = {
  __name: "ModalRenderer",
  props: {
    index: {
      type: Number,
      required: !0
    }
  },
  setup(e) {
    const t = e, n = le(), o = $(() => n.stack.value[t.index]);
    return Ce("modalContext", o), (a, l) => o.value?.component ? (x(), C(m(o).component, P({ key: 0 }, m(ze)(o.value.props ?? {}, o.value.getComponentPropKeys(), !0), {
      onModalEvent: l[0] || (l[0] = (s, ...r) => o.value.emit(s, ...r))
    }), null, 16)) : L("", !0);
  }
}, Pt = {
  __name: "ModalRoot",
  setup(e) {
    const t = le(), n = Ve();
    let o = !1, a = null, l = !1;
    _(te.on("start", () => o = !0)), _(te.on("finish", () => o = !1)), _(
      te.on("navigate", (r) => {
        const i = r.detail.page.props._inertiaui_modal;
        if (!i) {
          a && t.closeAll(), t.setBaseUrl(null), l = !1;
          return;
        }
        a = i, t.setBaseUrl(i.baseUrl), t.pushFromResponseData(i, {}, () => {
          if (!i.baseUrl) {
            console.error("No base url in modal response data so cannot navigate back");
            return;
          }
          !o && window.location.href !== i.baseUrl && te.visit(i.baseUrl, {
            preserveScroll: !0,
            preserveState: !0
          });
        });
      })
    );
    const s = (r) => (r.headers["X-InertiaUI-Modal-Base-Url"] = t.getBaseUrl() ?? (l ? n.props._inertiaui_modal?.baseUrl : null), r);
    return ft(() => me.interceptors.request.use(s)), Z(() => l = !!n.props._inertiaui_modal), _(() => me.interceptors.request.eject(s)), B(
      () => n.props?._inertiaui_modal,
      (r, i) => {
        r && i && r.component === i.component && St(r.url, i.url) && t.stack.value[0]?.updateProps(r.props ?? {});
      }
    ), (r, i) => (x(), K(Oe, null, [
      E(r.$slots, "default"),
      m(t).stack.value.length ? (x(), C(He, {
        key: 0,
        index: 0
      })) : L("", !0)
    ], 64));
  }
};
let ne = null;
const be = h({}), oe = h(null), O = h([]), pe = h({}), kt = (e) => {
  ne = e;
}, ro = (e) => {
  e.resolveComponent && (ne = e.resolveComponent);
};
class Lt {
  constructor(t, n, o = {}, a, l) {
    this.getComponentPropKeys = () => {
      if (!this.component)
        return [];
      const r = this.component;
      return Array.isArray(r.props) ? r.props : r.props ? Object.keys(r.props) : [];
    }, this.getParentModal = () => {
      const r = this.index.value;
      return r < 1 ? null : O.value.slice(0, r).reverse().find((i) => i.isOpen) ?? null;
    }, this.getChildModal = () => {
      const r = this.index.value;
      return r === O.value.length - 1 ? null : O.value.slice(r + 1).find((i) => i.isOpen) ?? null;
    }, this.show = () => {
      const r = this.index.value;
      if (r > -1) {
        if (O.value[r].isOpen)
          return;
        O.value[r].isOpen = !0, O.value[r].shouldRender = !0;
      }
    }, this.close = () => {
      const r = this.index.value;
      if (r > -1) {
        if (!O.value[r].isOpen)
          return;
        Object.keys(this.listeners).forEach((i) => {
          this.off(i);
        }), O.value[r].isOpen = !1, this.onCloseCallback?.(), this.onCloseCallback = void 0;
      }
    }, this.setOpen = (r) => {
      r ? this.show() : this.close();
    }, this.afterLeave = () => {
      const r = this.index.value;
      if (r > -1) {
        if (O.value[r].isOpen)
          return;
        O.value[r].shouldRender = !1, this.afterLeaveCallback?.(), this.afterLeaveCallback = void 0;
      }
      r === 0 && (O.value = []);
    }, this.on = (r, i) => {
      r = ie(r), this.listeners[r] = this.listeners[r] ?? [], this.listeners[r].push(i);
    }, this.off = (r, i) => {
      r = ie(r), i ? this.listeners[r] = this.listeners[r]?.filter((d) => d !== i) ?? [] : delete this.listeners[r];
    }, this.emit = (r, ...i) => {
      this.listeners[ie(r)]?.forEach((d) => d(...i));
    }, this.registerEventListenersFromAttrs = (r) => {
      const i = [];
      return Object.keys(r).filter((d) => d.startsWith("on")).forEach((d) => {
        const c = ie(d).replace(/^on-/, ""), u = r[d];
        typeof u == "function" && (this.on(c, u), i.push(() => this.off(c, u)));
      }), () => i.forEach((d) => d());
    }, this.reload = (r = {}) => {
      let i = Object.keys(this.response.props);
      if (r.only && (i = r.only), r.except && (i = Bt(i, r.except)), !this.response?.url)
        return;
      const d = (r.method ?? "get").toLowerCase(), c = r.data ?? {};
      r.onStart?.(), me({
        url: this.response.url,
        method: d,
        data: d === "get" ? {} : c,
        params: d === "get" ? c : {},
        headers: {
          ...r.headers ?? {},
          Accept: "text/html, application/xhtml+xml",
          "X-Inertia": !0,
          "X-Inertia-Partial-Component": this.response.component,
          "X-Inertia-Version": this.response.version,
          "X-Inertia-Partial-Data": i.join(","),
          "X-InertiaUI-Modal": we(),
          "X-InertiaUI-Modal-Use-Router": 0,
          "X-InertiaUI-Modal-Base-Url": oe.value ?? ""
        }
      }).then((u) => {
        this.updateProps(u.data.props), r.onSuccess?.(u);
      }).catch((u) => {
        r.onError?.(u);
      }).finally(() => {
        r.onFinish?.();
      });
    }, this.updateProps = (r) => {
      Object.assign(this.props.value, r);
    }, this.id = n.id ?? we(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = t, this.props = h(n.props ?? {}), this.response = n, this.config = o, this.onCloseCallback = a, this.afterLeaveCallback = l;
    const s = be.value[this.id];
    if (s) {
      this.config = {
        ...this.config,
        ...s.config ?? {}
      };
      const r = s.onClose, i = s.onAfterLeave;
      r && (this.onCloseCallback = a ? () => {
        a(), r();
      } : r), i && (this.afterLeaveCallback = l ? () => {
        l(), i();
      } : i), delete be.value[this.id];
    }
    this.index = $(() => O.value.findIndex((r) => r.id === this.id)), this.onTopOfStack = $(() => O.value.length < 2 ? !0 : O.value.map((i) => ({
      id: i.id,
      shouldRender: i.shouldRender
    })).reverse().find((i) => i.shouldRender)?.id === this.id);
  }
}
function Nt(e, t) {
  pe.value[e] = { name: e, callback: t };
}
function Tt(e, t = {}, n, o) {
  if (!pe.value[e])
    throw new Error(`The local modal "${e}" has not been registered.`);
  const a = Se(null, { props: {} }, t, n, o);
  return a.name = e, pe.value[e].callback(a), a;
}
function Ye(e, t = {}, n, o) {
  return ne ? ne(e.component).then(
    (a) => Se(Ue(a), e, t, n, o)
  ) : Promise.reject(new Error("resolveComponent has not been set"));
}
function Rt(e, t, n = {}, o = {}, a = {}, l, s, r = "brackets", i = !1) {
  const d = we();
  return new Promise((c, u) => {
    if (e.startsWith("#")) {
      c(Tt(e.substring(1), a, l, s));
      return;
    }
    const [p, f] = $t(
      t,
      e || "",
      n,
      r
    ), v = i && O.value.length === 0;
    if (O.value.length === 0 && (oe.value = typeof window < "u" ? window.location.href : ""), o = {
      ...o,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": Ve().version,
      "X-InertiaUI-Modal": d,
      "X-InertiaUI-Modal-Use-Router": v ? 1 : 0,
      "X-InertiaUI-Modal-Base-Url": oe.value ?? ""
    }, v)
      return be.value[d] = { config: a, onClose: l, onAfterLeave: s }, te.visit(p, {
        method: t,
        data: f,
        headers: o,
        preserveScroll: !0,
        preserveState: !0,
        onError: u,
        onFinish: () => It(() => O.value[0]).then((g) => c(g))
      });
    me({ url: p, method: t, data: f, headers: o }).then(
      (g) => Ye(g.data, a, l, s).then(c)
    ).catch(u);
  });
}
function Ft(e) {
  const t = e.response?.meta?.deferredProps;
  t && Object.keys(t).forEach((n) => {
    e.reload({ only: t[n] });
  });
}
function Se(e, t, n = {}, o, a) {
  const l = new Lt(e, t, n, o, a);
  return O.value.push(l), Ft(l), X(() => l.show()), l;
}
const Wt = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], so = (e, t) => (t.resolveComponent && (ne = t.resolveComponent), () => F(Pt, () => F(e, t)));
function le() {
  return {
    setComponentResolver: kt,
    getBaseUrl: () => oe.value,
    setBaseUrl: (e) => oe.value = e,
    stack: mt(O),
    push: Se,
    pushFromResponseData: Ye,
    closeAll: () => [...O.value].reverse().forEach((e) => e.close()),
    reset: () => O.value = [],
    visit: Rt,
    registerLocalModal: Nt,
    removeLocalModal: (e) => delete pe.value[e]
  };
}
function io() {
  return pt(ae("modalContext", null));
}
const uo = {
  __name: "Deferred",
  props: {
    data: {
      type: [String, Array],
      required: !0
    }
  },
  setup(e) {
    const t = e, n = ae("modalContext");
    if (!n)
      throw new Error("Deferred component must be used inside a Modal component");
    const o = $(() => (Array.isArray(t.data) ? t.data : [t.data]).every((l) => n.value.props[l] !== void 0));
    return (a, l) => o.value ? E(a.$slots, "default", { key: 0 }) : E(a.$slots, "fallback", { key: 1 });
  }
}, jt = /* @__PURE__ */ Object.assign({
  inheritAttrs: !1
}, {
  __name: "HeadlessModal",
  props: {
    name: {
      type: String,
      required: !1
    },
    // The slideover prop in on top because we need to know if it's a slideover
    // before we can determine the defaule value of other props
    slideover: {
      type: Boolean,
      default: null
    },
    closeButton: {
      type: Boolean,
      default: null
    },
    closeExplicitly: {
      type: Boolean,
      default: null
    },
    maxWidth: {
      type: String,
      default: null
    },
    paddingClasses: {
      type: [Boolean, String],
      default: null
    },
    panelClasses: {
      type: [Boolean, String],
      default: null
    },
    position: {
      type: String,
      default: null
    }
  },
  emits: ["modal-event", "focus", "blur", "close", "success"],
  setup(e, { expose: t, emit: n }) {
    const o = e, a = le(), l = o.name ? h({}) : ae("modalContext"), s = $(() => {
      const f = l.value.config?.slideover ?? o.slideover ?? Me("type") === "slideover";
      return {
        slideover: f,
        closeButton: o.closeButton ?? H(f, "closeButton"),
        closeExplicitly: o.closeExplicitly ?? H(f, "closeExplicitly"),
        maxWidth: o.maxWidth ?? H(f, "maxWidth"),
        paddingClasses: o.paddingClasses ?? H(f, "paddingClasses"),
        panelClasses: o.panelClasses ?? H(f, "panelClasses"),
        position: o.position ?? H(f, "position"),
        ...l.value.config
      };
    });
    o.name && (a.registerLocalModal(o.name, function(f) {
      l.value = f, d();
    }), fe(() => {
      a.removeLocalModal(o.name);
    })), Z(() => {
      o.name || d();
    });
    const r = h(null);
    fe(() => r.value?.());
    const i = _e();
    function d() {
      r.value = l.value.registerEventListenersFromAttrs(i);
    }
    const c = n;
    function u(f, ...v) {
      c("modal-event", f, ...v);
    }
    t({
      emit: u,
      afterLeave: () => l.value?.afterLeave(),
      close: () => l.value?.close(),
      reload: (...f) => l.value?.reload(...f),
      setOpen: (...f) => l.value?.setOpen(...f),
      getChildModal: () => l.value?.getChildModal(),
      getParentModal: () => l.value?.getParentModal(),
      get config() {
        return l.value?.config;
      },
      get id() {
        return l.value?.id;
      },
      get index() {
        return l.value?.index;
      },
      get isOpen() {
        return l.value?.isOpen;
      },
      get modalContext() {
        return l.value?.modalContext;
      },
      get onTopOfStack() {
        return l.value?.onTopOfStack;
      },
      get shouldRender() {
        return l.value?.shouldRender;
      }
    }), B(
      () => l.value?.onTopOfStack,
      (f, v) => {
        f && !v ? c("focus") : !f && v && c("blur");
      }
    ), B(
      () => l.value?.isOpen,
      (f) => {
        c(f ? "success" : "close");
      },
      { immediate: !0 }
    );
    const p = $(() => a.stack.value.find((f) => f.shouldRender && f.index > l.value.index)?.index);
    return (f, v) => (x(), K(Oe, null, [
      m(l).shouldRender ? E(f.$slots, "default", {
        key: 0,
        id: m(l).id,
        afterLeave: m(l).afterLeave,
        close: m(l).close,
        config: s.value,
        emit: u,
        getChildModal: m(l).getChildModal,
        getParentModal: m(l).getParentModal,
        index: m(l).index,
        isOpen: m(l).isOpen,
        modalContext: m(l),
        onTopOfStack: m(l).onTopOfStack,
        reload: m(l).reload,
        setOpen: m(l).setOpen,
        shouldRender: m(l).shouldRender
      }) : L("", !0),
      p.value ? (x(), C(He, {
        key: 1,
        index: p.value
      }, null, 8, ["index"])) : L("", !0)
    ], 64));
  }
});
function Be(e, t) {
  const n = typeof e == "string" && !t ? `${e}Context` : t, o = Symbol(n);
  return [(a) => {
    const l = ae(o, a);
    if (l || l === null)
      return l;
    throw new Error(
      `Injection \`${o.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(
        ", "
      )}` : `\`${e}\``}`
    );
  }, (a) => (Ce(o, a), a)];
}
function Je(e, t, n) {
  const o = n.originalEvent.target, a = new CustomEvent(e, {
    bubbles: !1,
    cancelable: !0,
    detail: n
  });
  t && o.addEventListener(e, t, { once: !0 }), o.dispatchEvent(a);
}
function Ge(e) {
  return Et() ? (Ct(e), !0) : !1;
}
function Ut(e) {
  let t = !1, n;
  const o = qe(!0);
  return (...a) => (t || (n = o.run(() => e(...a)), t = !0), n);
}
function _t(e) {
  let t = 0, n, o;
  const a = () => {
    t -= 1, o && t <= 0 && (o.stop(), n = void 0, o = void 0);
  };
  return (...l) => (t += 1, n || (o = qe(!0), n = o.run(() => e(...l))), Ge(a), n);
}
function De(e) {
  return typeof e == "function" ? e() : m(e);
}
const V = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Kt = (e) => typeof e < "u", qt = Object.prototype.toString, Xt = (e) => qt.call(e) === "[object Object]", Vt = () => {
}, Te = /* @__PURE__ */ zt();
function zt() {
  var e, t;
  return V && ((e = window?.navigator) == null ? void 0 : e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((t = window?.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent));
}
function Ht(e) {
  return Q();
}
function Yt(e, t) {
  Ht() && fe(e, t);
}
function re(e) {
  var t;
  const n = De(e);
  return (t = n?.$el) != null ? t : n;
}
const Ie = V ? window : void 0;
function Ze(...e) {
  let t, n, o, a;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n, o, a] = e, t = Ie) : [t, n, o, a] = e, !t)
    return Vt;
  Array.isArray(n) || (n = [n]), Array.isArray(o) || (o = [o]);
  const l = [], s = () => {
    l.forEach((c) => c()), l.length = 0;
  }, r = (c, u, p, f) => (c.addEventListener(u, p, f), () => c.removeEventListener(u, p, f)), i = B(
    () => [re(t), De(a)],
    ([c, u]) => {
      if (s(), !c)
        return;
      const p = Xt(u) ? { ...u } : u;
      l.push(
        ...n.flatMap((f) => o.map((v) => r(c, f, v, p)))
      );
    },
    { immediate: !0, flush: "post" }
  ), d = () => {
    i(), s();
  };
  return Ge(d), d;
}
function Jt(e) {
  return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function Gt(...e) {
  let t, n, o = {};
  e.length === 3 ? (t = e[0], n = e[1], o = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], o = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
  const {
    target: a = Ie,
    eventName: l = "keydown",
    passive: s = !1,
    dedupe: r = !1
  } = o, i = Jt(t);
  return Ze(a, l, (d) => {
    d.repeat && De(r) || i(d) && n(d);
  }, s);
}
function Zt() {
  const e = h(!1), t = Q();
  return t && Z(() => {
    e.value = !0;
  }, t), e;
}
function Qt(e) {
  return JSON.parse(JSON.stringify(e));
}
function en(e, t, n, o = {}) {
  var a, l, s;
  const {
    clone: r = !1,
    passive: i = !1,
    eventName: d,
    deep: c = !1,
    defaultValue: u,
    shouldEmit: p
  } = o, f = Q(), v = n || f?.emit || ((a = f?.$emit) == null ? void 0 : a.bind(f)) || ((s = (l = f?.proxy) == null ? void 0 : l.$emit) == null ? void 0 : s.bind(f?.proxy));
  let g = d;
  g = g || `update:${t.toString()}`;
  const y = (M) => r ? typeof r == "function" ? r(M) : Qt(M) : M, b = () => Kt(e[t]) ? y(e[t]) : u, D = (M) => {
    p ? p(M) && v(g, M) : v(g, M);
  };
  if (i) {
    const M = b(), N = h(M);
    let I = !1;
    return B(
      () => e[t],
      (se) => {
        I || (I = !0, N.value = y(se), X(() => I = !1));
      }
    ), B(
      N,
      (se) => {
        !I && (se !== e[t] || c) && D(se);
      },
      { deep: c }
    ), N;
  } else
    return $({
      get() {
        return b();
      },
      set(M) {
        D(M);
      }
    });
}
function Pe(e) {
  return e ? e.flatMap((t) => t.type === Oe ? Pe(t.children) : [t]) : [];
}
function j() {
  let e = document.activeElement;
  if (e == null)
    return null;
  for (; e != null && e.shadowRoot != null && e.shadowRoot.activeElement != null; )
    e = e.shadowRoot.activeElement;
  return e;
}
function ge(e) {
  if (e === null || typeof e != "object")
    return !1;
  const t = Object.getPrototypeOf(e);
  return t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null || Symbol.iterator in e ? !1 : Symbol.toStringTag in e ? Object.prototype.toString.call(e) === "[object Module]" : !0;
}
function Ee(e, t, n = ".", o) {
  if (!ge(t))
    return Ee(e, {}, n);
  const a = Object.assign({}, t);
  for (const l in e) {
    if (l === "__proto__" || l === "constructor")
      continue;
    const s = e[l];
    s != null && (Array.isArray(s) && Array.isArray(a[l]) ? a[l] = [...s, ...a[l]] : ge(s) && ge(a[l]) ? a[l] = Ee(
      s,
      a[l],
      (n ? `${n}.` : "") + l.toString()
    ) : a[l] = s);
  }
  return a;
}
function tn(e) {
  return (...t) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    t.reduce((n, o) => Ee(n, o, ""), {})
  );
}
const nn = tn(), [Qe] = Be("ConfigProvider");
let on = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", an = (e = 21) => {
  let t = "", n = e;
  for (; n--; )
    t += on[Math.random() * 64 | 0];
  return t;
};
const ln = _t(() => {
  const e = h(/* @__PURE__ */ new Map()), t = h(), n = $(() => {
    for (const s of e.value.values())
      if (s)
        return !0;
    return !1;
  }), o = Qe({
    scrollBody: h(!0)
  });
  let a = null;
  const l = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.body.style.removeProperty("--scrollbar-width"), document.body.style.overflow = t.value ?? "", Te && a?.(), t.value = void 0;
  };
  return B(n, (s, r) => {
    var i;
    if (!V)
      return;
    if (!s) {
      r && l();
      return;
    }
    t.value === void 0 && (t.value = document.body.style.overflow);
    const d = window.innerWidth - document.documentElement.clientWidth, c = { padding: d, margin: 0 }, u = (i = o.scrollBody) != null && i.value ? typeof o.scrollBody.value == "object" ? nn({
      padding: o.scrollBody.value.padding === !0 ? d : o.scrollBody.value.padding,
      margin: o.scrollBody.value.margin === !0 ? d : o.scrollBody.value.margin
    }, c) : c : { padding: 0, margin: 0 };
    d > 0 && (document.body.style.paddingRight = typeof u.padding == "number" ? `${u.padding}px` : String(u.padding), document.body.style.marginRight = typeof u.margin == "number" ? `${u.margin}px` : String(u.margin), document.body.style.setProperty("--scrollbar-width", `${d}px`), document.body.style.overflow = "hidden"), Te && (a = Ze(
      document,
      "touchmove",
      (p) => sn(p),
      { passive: !1 }
    )), X(() => {
      document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
    });
  }, { immediate: !0, flush: "sync" }), e;
});
function rn(e) {
  const t = an(6), n = ln();
  n.value.set(t, e);
  const o = $({
    get: () => n.value.get(t) ?? !1,
    set: (a) => n.value.set(t, a)
  });
  return Yt(() => {
    n.value.delete(t);
  }), o;
}
function et(e) {
  const t = window.getComputedStyle(e);
  if (t.overflowX === "scroll" || t.overflowY === "scroll" || t.overflowX === "auto" && e.clientWidth < e.scrollWidth || t.overflowY === "auto" && e.clientHeight < e.scrollHeight)
    return !0;
  {
    const n = e.parentNode;
    return !(n instanceof Element) || n.tagName === "BODY" ? !1 : et(n);
  }
}
function sn(e) {
  const t = e || window.event, n = t.target;
  return n instanceof Element && et(n) ? !1 : t.touches.length > 1 ? !0 : (t.preventDefault && t.cancelable && t.preventDefault(), !1);
}
function ke(e) {
  const t = Q(), n = t?.type.emits, o = {};
  return n != null && n.length || console.warn(
    `No emitted event found. Please check component: ${t?.type.__name}`
  ), n?.forEach((a) => {
    o[ht(xt(a))] = (...l) => e(a, ...l);
  }), o;
}
function k() {
  const e = Q(), t = h(), n = $(() => {
    var s, r;
    return ["#text", "#comment"].includes((s = t.value) == null ? void 0 : s.$el.nodeName) ? (r = t.value) == null ? void 0 : r.$el.nextElementSibling : re(t);
  }), o = Object.assign({}, e.exposed), a = {};
  for (const s in e.props)
    Object.defineProperty(a, s, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[s]
    });
  if (Object.keys(o).length > 0)
    for (const s in o)
      Object.defineProperty(a, s, {
        enumerable: !0,
        configurable: !0,
        get: () => o[s]
      });
  Object.defineProperty(a, "$el", {
    enumerable: !0,
    configurable: !0,
    get: () => e.vnode.el
  }), e.exposed = a;
  function l(s) {
    t.value = s, s && (Object.defineProperty(a, "$el", {
      enumerable: !0,
      configurable: !0,
      get: () => s instanceof Element ? s : s.$el
    }), e.exposed = a);
  }
  return { forwardRef: l, currentRef: t, currentElement: n };
}
var un = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, Y = /* @__PURE__ */ new WeakMap(), ue = /* @__PURE__ */ new WeakMap(), de = {}, ye = 0, tt = function(e) {
  return e && (e.host || tt(e.parentNode));
}, dn = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var o = tt(n);
    return o && e.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, cn = function(e, t, n, o) {
  var a = dn(t, Array.isArray(e) ? e : [e]);
  de[n] || (de[n] = /* @__PURE__ */ new WeakMap());
  var l = de[n], s = [], r = /* @__PURE__ */ new Set(), i = new Set(a), d = function(u) {
    !u || r.has(u) || (r.add(u), d(u.parentNode));
  };
  a.forEach(d);
  var c = function(u) {
    !u || i.has(u) || Array.prototype.forEach.call(u.children, function(p) {
      if (r.has(p))
        c(p);
      else
        try {
          var f = p.getAttribute(o), v = f !== null && f !== "false", g = (Y.get(p) || 0) + 1, y = (l.get(p) || 0) + 1;
          Y.set(p, g), l.set(p, y), s.push(p), g === 1 && v && ue.set(p, !0), y === 1 && p.setAttribute(n, "true"), v || p.setAttribute(o, "true");
        } catch (b) {
          console.error("aria-hidden: cannot operate on ", p, b);
        }
    });
  };
  return c(t), r.clear(), ye++, function() {
    s.forEach(function(u) {
      var p = Y.get(u) - 1, f = l.get(u) - 1;
      Y.set(u, p), l.set(u, f), p || (ue.has(u) || u.removeAttribute(o), ue.delete(u)), f || u.removeAttribute(n);
    }), ye--, ye || (Y = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakMap(), ue = /* @__PURE__ */ new WeakMap(), de = {});
  };
}, fn = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(e) ? e : [e]), a = un(e);
  return a ? (o.push.apply(o, Array.from(a.querySelectorAll("[aria-live]"))), cn(o, a, n, "aria-hidden")) : function() {
    return null;
  };
};
function mn(e) {
  let t;
  B(() => re(e), (n) => {
    n ? t = fn(n) : t && t();
  }), _(() => {
    t && t();
  });
}
let pn = 0;
function Re(e, t = "radix") {
  const n = Qe({ useId: void 0 });
  return Ne.useId ? `${t}-${Ne.useId()}` : n.useId ? `${t}-${n.useId()}` : `${t}-${++pn}`;
}
function vn(e, t) {
  const n = h(e);
  function o(a) {
    return t[n.value][a] ?? n.value;
  }
  return {
    state: n,
    dispatch: (a) => {
      n.value = o(a);
    }
  };
}
const Le = A({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(e, { attrs: t, slots: n }) {
    return () => {
      var o, a;
      if (!n.default)
        return null;
      const l = Pe(n.default()), s = l.findIndex((c) => c.type !== wt);
      if (s === -1)
        return l;
      const r = l[s];
      (o = r.props) == null || delete o.ref;
      const i = r.props ? P(t, r.props) : t;
      t.class && (a = r.props) != null && a.class && delete r.props.class;
      const d = bt(r, i);
      for (const c in i)
        c.startsWith("on") && (d.props || (d.props = {}), d.props[c] = i[c]);
      return l.length === 1 ? d : (l[s] = d, l);
    };
  }
}), ee = A({
  name: "Primitive",
  inheritAttrs: !1,
  props: {
    asChild: {
      type: Boolean,
      default: !1
    },
    as: {
      type: [String, Object],
      default: "div"
    }
  },
  setup(e, { attrs: t, slots: n }) {
    const o = e.asChild ? "template" : e.as;
    return typeof o == "string" && ["area", "img", "input"].includes(o) ? () => F(o, t) : o !== "template" ? () => F(e.as, t, { default: n.default }) : () => F(Le, t, { default: n.default });
  }
});
function nt() {
  const e = h(), t = $(() => {
    var n, o;
    return ["#text", "#comment"].includes((n = e.value) == null ? void 0 : n.$el.nodeName) ? (o = e.value) == null ? void 0 : o.$el.nextElementSibling : re(e);
  });
  return {
    primitiveElement: e,
    currentElement: t
  };
}
function gn(e, t) {
  var n;
  const o = h({}), a = h("none"), l = h(e), s = e.value ? "mounted" : "unmounted";
  let r;
  const i = ((n = t.value) == null ? void 0 : n.ownerDocument.defaultView) ?? Ie, { state: d, dispatch: c } = vn(s, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  }), u = (y) => {
    var b;
    if (V) {
      const D = new CustomEvent(y, { bubbles: !1, cancelable: !1 });
      (b = t.value) == null || b.dispatchEvent(D);
    }
  };
  B(
    e,
    async (y, b) => {
      var D;
      const M = b !== y;
      if (await X(), M) {
        const N = a.value, I = ce(t.value);
        y ? (c("MOUNT"), u("enter"), I === "none" && u("after-enter")) : I === "none" || ((D = o.value) == null ? void 0 : D.display) === "none" ? (c("UNMOUNT"), u("leave"), u("after-leave")) : b && N !== I ? (c("ANIMATION_OUT"), u("leave")) : (c("UNMOUNT"), u("after-leave"));
      }
    },
    { immediate: !0 }
  );
  const p = (y) => {
    const b = ce(t.value), D = b.includes(
      y.animationName
    ), M = d.value === "mounted" ? "enter" : "leave";
    if (y.target === t.value && D && (u(`after-${M}`), c("ANIMATION_END"), !l.value)) {
      const N = t.value.style.animationFillMode;
      t.value.style.animationFillMode = "forwards", r = i?.setTimeout(() => {
        var I;
        ((I = t.value) == null ? void 0 : I.style.animationFillMode) === "forwards" && (t.value.style.animationFillMode = N);
      });
    }
    y.target === t.value && b === "none" && c("ANIMATION_END");
  }, f = (y) => {
    y.target === t.value && (a.value = ce(t.value));
  }, v = B(
    t,
    (y, b) => {
      y ? (o.value = getComputedStyle(y), y.addEventListener("animationstart", f), y.addEventListener("animationcancel", p), y.addEventListener("animationend", p)) : (c("ANIMATION_END"), r !== void 0 && i?.clearTimeout(r), b?.removeEventListener("animationstart", f), b?.removeEventListener("animationcancel", p), b?.removeEventListener("animationend", p));
    },
    { immediate: !0 }
  ), g = B(d, () => {
    const y = ce(t.value);
    a.value = d.value === "mounted" ? y : "none";
  });
  return _(() => {
    v(), g();
  }), {
    isPresent: $(
      () => ["mounted", "unmountSuspended"].includes(d.value)
    )
  };
}
function ce(e) {
  return e && getComputedStyle(e).animationName || "none";
}
const ot = A({
  name: "Presence",
  props: {
    present: {
      type: Boolean,
      required: !0
    },
    forceMount: {
      type: Boolean
    }
  },
  slots: {},
  setup(e, { slots: t, expose: n }) {
    var o;
    const { present: a, forceMount: l } = Ke(e), s = h(), { isPresent: r } = gn(a, s);
    n({ present: r });
    let i = t.default({ present: r });
    i = Pe(i || []);
    const d = Q();
    if (i && i?.length > 1) {
      const c = (o = d?.parent) != null && o.type.name ? `<${d.parent.type.name} />` : "component";
      throw new Error(
        [
          `Detected an invalid children for \`${c}\` for  \`Presence\` component.`,
          "",
          "Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
          "You can apply a few solutions:",
          [
            "Provide a single child element so that `presence` directive attach correctly.",
            "Ensure the first child is an actual element instead of a raw text node or comment node."
          ].map((u) => `  - ${u}`).join(`
`)
        ].join(`
`)
      );
    }
    return () => l.value || a.value || r.value ? F(t.default({ present: r })[0], {
      ref: (c) => {
        const u = re(c);
        return typeof u?.hasAttribute > "u" || (u != null && u.hasAttribute("data-radix-popper-content-wrapper") ? s.value = u.firstElementChild : s.value = u), u;
      }
    }) : null;
  }
}), [U, yn] = Be("DialogRoot"), hn = /* @__PURE__ */ A({
  inheritAttrs: !1,
  __name: "DialogRoot",
  props: {
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: !1 },
    modal: { type: Boolean, default: !0 }
  },
  emits: ["update:open"],
  setup(e, { emit: t }) {
    const n = e, o = en(n, "open", t, {
      defaultValue: n.defaultOpen,
      passive: n.open === void 0
    }), a = h(), l = h(), { modal: s } = Ke(n);
    return yn({
      open: o,
      modal: s,
      openModal: () => {
        o.value = !0;
      },
      onOpenChange: (r) => {
        o.value = r;
      },
      onOpenToggle: () => {
        o.value = !o.value;
      },
      contentId: "",
      titleId: "",
      descriptionId: "",
      triggerElement: a,
      contentElement: l
    }), (r, i) => E(r.$slots, "default", { open: m(o) });
  }
}), xn = /* @__PURE__ */ A({
  __name: "Teleport",
  props: {
    to: { default: "body" },
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = Zt();
    return (n, o) => m(t) || n.forceMount ? (x(), C(yt, {
      key: 0,
      to: n.to,
      disabled: n.disabled
    }, [
      E(n.$slots, "default")
    ], 8, ["to", "disabled"])) : L("", !0);
  }
}), wn = /* @__PURE__ */ A({
  __name: "DialogPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = e;
    return (n, o) => (x(), C(m(xn), vt(gt(t)), {
      default: w(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), bn = "dismissableLayer.pointerDownOutside", En = "dismissableLayer.focusOutside";
function at(e, t) {
  const n = t.closest(
    "[data-dismissable-layer]"
  ), o = e.dataset.dismissableLayer === "" ? e : e.querySelector(
    "[data-dismissable-layer]"
  ), a = Array.from(
    e.ownerDocument.querySelectorAll("[data-dismissable-layer]")
  );
  return !!(n && o === n || a.indexOf(o) < a.indexOf(n));
}
function Cn(e, t) {
  var n;
  const o = ((n = t?.value) == null ? void 0 : n.ownerDocument) ?? globalThis?.document, a = h(!1), l = h(() => {
  });
  return q((s) => {
    if (!V)
      return;
    const r = async (d) => {
      const c = d.target;
      if (t != null && t.value) {
        if (at(t.value, c)) {
          a.value = !1;
          return;
        }
        if (d.target && !a.value) {
          let u = function() {
            Je(
              bn,
              e,
              p
            );
          };
          const p = { originalEvent: d };
          d.pointerType === "touch" ? (o.removeEventListener("click", l.value), l.value = u, o.addEventListener("click", l.value, {
            once: !0
          })) : u();
        } else
          o.removeEventListener("click", l.value);
        a.value = !1;
      }
    }, i = window.setTimeout(() => {
      o.addEventListener("pointerdown", r);
    }, 0);
    s(() => {
      window.clearTimeout(i), o.removeEventListener("pointerdown", r), o.removeEventListener("click", l.value);
    });
  }), {
    onPointerDownCapture: () => a.value = !0
  };
}
function On(e, t) {
  var n;
  const o = ((n = t?.value) == null ? void 0 : n.ownerDocument) ?? globalThis?.document, a = h(!1);
  return q((l) => {
    if (!V)
      return;
    const s = async (r) => {
      t != null && t.value && (await X(), !(!t.value || at(t.value, r.target)) && r.target && !a.value && Je(
        En,
        e,
        { originalEvent: r }
      ));
    };
    o.addEventListener("focusin", s), l(() => o.removeEventListener("focusin", s));
  }), {
    onFocusCapture: () => a.value = !0,
    onBlurCapture: () => a.value = !1
  };
}
const T = Xe({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), An = /* @__PURE__ */ A({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "dismiss"],
  setup(e, { emit: t }) {
    const n = e, o = t, { forwardRef: a, currentElement: l } = k(), s = $(
      () => {
        var v;
        return ((v = l.value) == null ? void 0 : v.ownerDocument) ?? globalThis.document;
      }
    ), r = $(() => T.layersRoot), i = $(() => l.value ? Array.from(r.value).indexOf(l.value) : -1), d = $(() => T.layersWithOutsidePointerEventsDisabled.size > 0), c = $(() => {
      const v = Array.from(r.value), [g] = [...T.layersWithOutsidePointerEventsDisabled].slice(-1), y = v.indexOf(g);
      return i.value >= y;
    }), u = Cn(async (v) => {
      const g = [...T.branches].some(
        (y) => y?.contains(v.target)
      );
      !c.value || g || (o("pointerDownOutside", v), o("interactOutside", v), await X(), v.defaultPrevented || o("dismiss"));
    }, l), p = On((v) => {
      [...T.branches].some(
        (g) => g?.contains(v.target)
      ) || (o("focusOutside", v), o("interactOutside", v), v.defaultPrevented || o("dismiss"));
    }, l);
    Gt("Escape", (v) => {
      i.value === r.value.size - 1 && (o("escapeKeyDown", v), v.defaultPrevented || o("dismiss"));
    });
    let f;
    return q((v) => {
      l.value && (n.disableOutsidePointerEvents && (T.layersWithOutsidePointerEventsDisabled.size === 0 && (f = s.value.body.style.pointerEvents, s.value.body.style.pointerEvents = "none"), T.layersWithOutsidePointerEventsDisabled.add(l.value)), r.value.add(l.value), v(() => {
        n.disableOutsidePointerEvents && T.layersWithOutsidePointerEventsDisabled.size === 1 && (s.value.body.style.pointerEvents = f);
      }));
    }), q((v) => {
      v(() => {
        l.value && (r.value.delete(l.value), T.layersWithOutsidePointerEventsDisabled.delete(l.value));
      });
    }), (v, g) => (x(), C(m(ee), {
      ref: m(a),
      "as-child": v.asChild,
      as: v.as,
      "data-dismissable-layer": "",
      style: Ot({
        pointerEvents: d.value ? c.value ? "auto" : "none" : void 0
      }),
      onFocusCapture: m(p).onFocusCapture,
      onBlurCapture: m(p).onBlurCapture,
      onPointerdownCapture: m(u).onPointerDownCapture
    }, {
      default: w(() => [
        E(v.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "style", "onFocusCapture", "onBlurCapture", "onPointerdownCapture"]));
  }
}), he = "focusScope.autoFocusOnMount", xe = "focusScope.autoFocusOnUnmount", Fe = { bubbles: !1, cancelable: !0 };
function $n(e, { select: t = !1 } = {}) {
  const n = j();
  for (const o of e)
    if (R(o, { select: t }), j() !== n)
      return !0;
}
function Mn(e) {
  const t = lt(e), n = We(t, e), o = We(t.reverse(), e);
  return [n, o];
}
function lt(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (o) => {
      const a = o.tagName === "INPUT" && o.type === "hidden";
      return o.disabled || o.hidden || a ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function We(e, t) {
  for (const n of e)
    if (!Sn(n, { upTo: t }))
      return n;
}
function Sn(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden")
    return !0;
  for (; e; ) {
    if (t !== void 0 && e === t)
      return !1;
    if (getComputedStyle(e).display === "none")
      return !0;
    e = e.parentElement;
  }
  return !1;
}
function Bn(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function R(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = j();
    e.focus({ preventScroll: !0 }), e !== n && Bn(e) && t && e.select();
  }
}
const Dn = Ut(() => h([]));
function In() {
  const e = Dn();
  return {
    add(t) {
      const n = e.value[0];
      t !== n && n?.pause(), e.value = je(e.value, t), e.value.unshift(t);
    },
    remove(t) {
      var n;
      e.value = je(e.value, t), (n = e.value[0]) == null || n.resume();
    }
  };
}
function je(e, t) {
  const n = [...e], o = n.indexOf(t);
  return o !== -1 && n.splice(o, 1), n;
}
function Pn(e) {
  return e.filter((t) => t.tagName !== "A");
}
const kn = /* @__PURE__ */ A({
  __name: "FocusScope",
  props: {
    loop: { type: Boolean, default: !1 },
    trapped: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["mountAutoFocus", "unmountAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, o = t, { currentRef: a, currentElement: l } = k(), s = h(null), r = In(), i = Xe({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    });
    q((c) => {
      if (!V)
        return;
      const u = l.value;
      if (!n.trapped)
        return;
      function p(y) {
        if (i.paused || !u)
          return;
        const b = y.target;
        u.contains(b) ? s.value = b : R(s.value, { select: !0 });
      }
      function f(y) {
        if (i.paused || !u)
          return;
        const b = y.relatedTarget;
        b !== null && (u.contains(b) || R(s.value, { select: !0 }));
      }
      function v(y) {
        u.contains(s.value) || R(u);
      }
      document.addEventListener("focusin", p), document.addEventListener("focusout", f);
      const g = new MutationObserver(v);
      u && g.observe(u, { childList: !0, subtree: !0 }), c(() => {
        document.removeEventListener("focusin", p), document.removeEventListener("focusout", f), g.disconnect();
      });
    }), q(async (c) => {
      const u = l.value;
      if (await X(), !u)
        return;
      r.add(i);
      const p = j();
      if (!u.contains(p)) {
        const f = new CustomEvent(he, Fe);
        u.addEventListener(he, (v) => o("mountAutoFocus", v)), u.dispatchEvent(f), f.defaultPrevented || ($n(Pn(lt(u)), {
          select: !0
        }), j() === p && R(u));
      }
      c(() => {
        u.removeEventListener(he, (g) => o("mountAutoFocus", g));
        const f = new CustomEvent(xe, Fe), v = (g) => {
          o("unmountAutoFocus", g);
        };
        u.addEventListener(xe, v), u.dispatchEvent(f), setTimeout(() => {
          f.defaultPrevented || R(p ?? document.body, { select: !0 }), u.removeEventListener(xe, v), r.remove(i);
        }, 0);
      });
    });
    function d(c) {
      if (!n.loop && !n.trapped || i.paused)
        return;
      const u = c.key === "Tab" && !c.altKey && !c.ctrlKey && !c.metaKey, p = j();
      if (u && p) {
        const f = c.currentTarget, [v, g] = Mn(f);
        v && g ? !c.shiftKey && p === g ? (c.preventDefault(), n.loop && R(v, { select: !0 })) : c.shiftKey && p === v && (c.preventDefault(), n.loop && R(g, { select: !0 })) : p === f && c.preventDefault();
      }
    }
    return (c, u) => (x(), C(m(ee), {
      ref_key: "currentRef",
      ref: a,
      tabindex: "-1",
      "as-child": c.asChild,
      as: c.as,
      onKeydown: d
    }, {
      default: w(() => [
        E(c.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
});
function Ln(e) {
  return e ? "open" : "closed";
}
const Nn = "DialogTitle", Tn = "DialogContent";
function Rn({
  titleName: e = Nn,
  contentName: t = Tn,
  componentLink: n = "dialog.html#title",
  titleId: o,
  descriptionId: a,
  contentElement: l
}) {
  const s = `Warning: \`${t}\` requires a \`${e}\` for the component to be accessible for screen reader users.

If you want to hide the \`${e}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://www.radix-vue.com/components/${n}`, r = `Warning: Missing \`Description\` or \`aria-describedby="undefined"\` for ${t}.`;
  Z(() => {
    var i;
    document.getElementById(o) || console.warn(s);
    const d = (i = l.value) == null ? void 0 : i.getAttribute("aria-describedby");
    a && d && (document.getElementById(a) || console.warn(r));
  });
}
const rt = /* @__PURE__ */ A({
  __name: "DialogContentImpl",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, o = t, a = U(), { forwardRef: l, currentElement: s } = k();
    return a.titleId || (a.titleId = Re(void 0, "radix-vue-dialog-title")), a.descriptionId || (a.descriptionId = Re(void 0, "radix-vue-dialog-description")), Z(() => {
      a.contentElement = s, j() !== document.body && (a.triggerElement.value = j());
    }), process.env.NODE_ENV !== "production" && Rn({
      titleName: "DialogTitle",
      contentName: "DialogContent",
      componentLink: "dialog.html#title",
      titleId: a.titleId,
      descriptionId: a.descriptionId,
      contentElement: s
    }), (r, i) => (x(), C(m(kn), {
      "as-child": "",
      loop: "",
      trapped: n.trapFocus,
      onMountAutoFocus: i[5] || (i[5] = (d) => o("openAutoFocus", d)),
      onUnmountAutoFocus: i[6] || (i[6] = (d) => o("closeAutoFocus", d))
    }, {
      default: w(() => [
        S(m(An), P({
          id: m(a).contentId,
          ref: m(l),
          as: r.as,
          "as-child": r.asChild,
          "disable-outside-pointer-events": r.disableOutsidePointerEvents,
          role: "dialog",
          "aria-describedby": m(a).descriptionId,
          "aria-labelledby": m(a).titleId,
          "data-state": m(Ln)(m(a).open.value)
        }, r.$attrs, {
          onDismiss: i[0] || (i[0] = (d) => m(a).onOpenChange(!1)),
          onEscapeKeyDown: i[1] || (i[1] = (d) => o("escapeKeyDown", d)),
          onFocusOutside: i[2] || (i[2] = (d) => o("focusOutside", d)),
          onInteractOutside: i[3] || (i[3] = (d) => o("interactOutside", d)),
          onPointerDownOutside: i[4] || (i[4] = (d) => o("pointerDownOutside", d))
        }), {
          default: w(() => [
            E(r.$slots, "default")
          ]),
          _: 3
        }, 16, ["id", "as", "as-child", "disable-outside-pointer-events", "aria-describedby", "aria-labelledby", "data-state"])
      ]),
      _: 3
    }, 8, ["trapped"]));
  }
}), Fn = /* @__PURE__ */ A({
  __name: "DialogContentModal",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, o = t, a = U(), l = ke(o), { forwardRef: s, currentElement: r } = k();
    return mn(r), (i, d) => (x(), C(rt, P({ ...n, ...m(l) }, {
      ref: m(s),
      "trap-focus": m(a).open.value,
      "disable-outside-pointer-events": !0,
      onCloseAutoFocus: d[0] || (d[0] = (c) => {
        var u;
        c.defaultPrevented || (c.preventDefault(), (u = m(a).triggerElement.value) == null || u.focus());
      }),
      onPointerDownOutside: d[1] || (d[1] = (c) => {
        const u = c.detail.originalEvent, p = u.button === 0 && u.ctrlKey === !0;
        (u.button === 2 || p) && c.preventDefault();
      }),
      onFocusOutside: d[2] || (d[2] = (c) => {
        c.preventDefault();
      })
    }), {
      default: w(() => [
        E(i.$slots, "default")
      ]),
      _: 3
    }, 16, ["trap-focus"]));
  }
}), Wn = /* @__PURE__ */ A({
  __name: "DialogContentNonModal",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, o = ke(t);
    k();
    const a = U(), l = h(!1), s = h(!1);
    return (r, i) => (x(), C(rt, P({ ...n, ...m(o) }, {
      "trap-focus": !1,
      "disable-outside-pointer-events": !1,
      onCloseAutoFocus: i[0] || (i[0] = (d) => {
        var c;
        d.defaultPrevented || (l.value || (c = m(a).triggerElement.value) == null || c.focus(), d.preventDefault()), l.value = !1, s.value = !1;
      }),
      onInteractOutside: i[1] || (i[1] = (d) => {
        var c;
        d.defaultPrevented || (l.value = !0, d.detail.originalEvent.type === "pointerdown" && (s.value = !0));
        const u = d.target;
        (c = m(a).triggerElement.value) != null && c.contains(u) && d.preventDefault(), d.detail.originalEvent.type === "focusin" && s.value && d.preventDefault();
      })
    }), {
      default: w(() => [
        E(r.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), st = /* @__PURE__ */ A({
  __name: "DialogContent",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, o = t, a = U(), l = ke(o), { forwardRef: s } = k();
    return (r, i) => (x(), C(m(ot), {
      present: r.forceMount || m(a).open.value
    }, {
      default: w(() => [
        m(a).modal.value ? (x(), C(Fn, P({
          key: 0,
          ref: m(s)
        }, { ...n, ...m(l), ...r.$attrs }), {
          default: w(() => [
            E(r.$slots, "default")
          ]),
          _: 3
        }, 16)) : (x(), C(Wn, P({
          key: 1,
          ref: m(s)
        }, { ...n, ...m(l), ...r.$attrs }), {
          default: w(() => [
            E(r.$slots, "default")
          ]),
          _: 3
        }, 16))
      ]),
      _: 3
    }, 8, ["present"]));
  }
}), jn = /* @__PURE__ */ A({
  __name: "DialogOverlayImpl",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = U();
    return rn(!0), k(), (n, o) => (x(), C(m(ee), {
      as: n.as,
      "as-child": n.asChild,
      "data-state": m(t).open.value ? "open" : "closed",
      style: { "pointer-events": "auto" }
    }, {
      default: w(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "data-state"]));
  }
}), Un = /* @__PURE__ */ A({
  __name: "DialogOverlay",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = U(), { forwardRef: n } = k();
    return (o, a) => {
      var l;
      return (l = m(t)) != null && l.modal.value ? (x(), C(m(ot), {
        key: 0,
        present: o.forceMount || m(t).open.value
      }, {
        default: w(() => [
          S(jn, P(o.$attrs, {
            ref: m(n),
            as: o.as,
            "as-child": o.asChild
          }), {
            default: w(() => [
              E(o.$slots, "default")
            ]),
            _: 3
          }, 16, ["as", "as-child"])
        ]),
        _: 3
      }, 8, ["present"])) : L("", !0);
    };
  }
}), _n = /* @__PURE__ */ A({
  __name: "DialogClose",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(e) {
    const t = e;
    k();
    const n = U();
    return (o, a) => (x(), C(m(ee), P(t, {
      type: o.as === "button" ? "button" : void 0,
      onClick: a[0] || (a[0] = (l) => m(n).onOpenChange(!1))
    }), {
      default: w(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["type"]));
  }
}), it = /* @__PURE__ */ A({
  __name: "DialogTitle",
  props: {
    asChild: { type: Boolean },
    as: { default: "h2" }
  },
  setup(e) {
    const t = e, n = U();
    return k(), (o, a) => (x(), C(m(ee), P(t, {
      id: m(n).titleId
    }), {
      default: w(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["id"]));
  }
}), ut = /* @__PURE__ */ A({
  __name: "VisuallyHidden",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    return k(), (t, n) => (x(), C(m(ee), {
      as: t.as,
      "as-child": t.asChild,
      style: {
        // See: https://github.com/twbs/bootstrap/blob/master/scss/mixins/_screen-reader.scss
        position: "absolute",
        border: 0,
        width: "1px",
        display: "inline-block",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        wordWrap: "normal"
      }
    }, {
      default: w(() => [
        E(t.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
}), [dt] = Be("CollectionProvider");
A({
  name: "CollectionSlot",
  setup(e, { slots: t }) {
    const n = dt(), { primitiveElement: o, currentElement: a } = nt();
    return B(a, () => {
      n.collectionRef.value = a.value;
    }), () => F(Le, { ref: o }, t);
  }
});
A({
  name: "CollectionItem",
  inheritAttrs: !1,
  props: {
    value: {
      // It accepts any value
      validator: () => !0
    }
  },
  setup(e, { slots: t, attrs: n }) {
    const o = dt(), { primitiveElement: a, currentElement: l } = nt();
    return q((s) => {
      if (l.value) {
        const r = Ue(l.value);
        o.itemMap.value.set(r, { ref: l.value, value: e.value }), s(() => o.itemMap.value.delete(r));
      }
    }), () => F(Le, { ...n, [o.attrName]: "", ref: a }, t);
  }
});
function Kn() {
  if (typeof matchMedia == "function")
    return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine";
}
Kn();
const ct = {
  __name: "CloseButton",
  setup(e) {
    return (t, n) => (x(), C(m(_n), { class: "im-close-button text-gray-400 hover:text-gray-500" }, {
      default: w(() => [...n[0] || (n[0] = [
        W("span", { class: "sr-only" }, "Close", -1),
        W("svg", {
          class: "size-6",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "2",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [
          W("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M6 18L18 6M6 6l12 12"
          })
        ], -1)
      ])]),
      _: 1
    }));
  }
}, qn = { class: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4" }, Xn = ["data-inertiaui-modal-entered"], Vn = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, zn = {
  __name: "ModalContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(e) {
    const t = h(!1);
    return (n, o) => (x(), K("div", qn, [
      W("div", {
        class: J(["im-modal-positioner flex min-h-full justify-center", {
          "items-start": e.config.position === "top",
          "items-center": e.config.position === "center",
          "items-end": e.config.position === "bottom"
        }])
      }, [
        S(Ae, {
          appear: "",
          "enter-from-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          "enter-to-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-from-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-to-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          onAfterEnter: o[2] || (o[2] = (a) => t.value = !0),
          onAfterLeave: e.modalContext.afterLeave
        }, {
          default: w(() => [
            S(m(st), {
              "aria-describedby": void 0,
              class: J({
                "im-modal-wrapper w-full transition duration-300 ease-in-out": !0,
                "blur-sm": !e.modalContext.onTopOfStack,
                "sm:max-w-sm": e.config.maxWidth == "sm",
                "sm:max-w-md": e.config.maxWidth == "md",
                "sm:max-w-md md:max-w-lg": e.config.maxWidth == "lg",
                "sm:max-w-md md:max-w-xl": e.config.maxWidth == "xl",
                "sm:max-w-md md:max-w-xl lg:max-w-2xl": e.config.maxWidth == "2xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl": e.config.maxWidth == "3xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": e.config.maxWidth == "4xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": e.config.maxWidth == "5xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": e.config.maxWidth == "6xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": e.config.maxWidth == "7xl"
              }),
              onEscapeKeyDown: o[0] || (o[0] = (a) => e.config?.closeExplicitly && a.preventDefault()),
              onInteractOutside: o[1] || (o[1] = (a) => e.config?.closeExplicitly && a.preventDefault())
            }, {
              default: w(() => [
                S(m(ut), { "as-child": "" }, {
                  default: w(() => [
                    S(m(it))
                  ]),
                  _: 1
                }),
                W("div", {
                  class: J(["im-modal-content relative", [e.config.paddingClasses, e.config.panelClasses]]),
                  "data-inertiaui-modal-entered": t.value
                }, [
                  e.config.closeButton ? (x(), K("div", Vn, [
                    S(ct)
                  ])) : L("", !0),
                  E(n.$slots, "default", {
                    modalContext: e.modalContext,
                    config: e.config
                  })
                ], 10, Xn)
              ]),
              _: 3
            }, 8, ["class"])
          ]),
          _: 3
        }, 8, ["onAfterLeave"])
      ], 2)
    ]));
  }
}, Hn = { class: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden" }, Yn = ["data-inertiaui-modal-entered"], Jn = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, Gn = {
  __name: "SlideoverContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(e) {
    const t = h(!1);
    return (n, o) => (x(), K("div", Hn, [
      W("div", {
        class: J(["im-slideover-positioner flex min-h-full items-center", {
          "justify-start rtl:justify-end": e.config.position === "left",
          "justify-end rtl:justify-start": e.config.position === "right"
        }])
      }, [
        S(Ae, {
          appear: "",
          "enter-from-class": "opacity-0 " + (e.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          "enter-to-class": "opacity-100 translate-x-0",
          "leave-from-class": "opacity-100 translate-x-0",
          "leave-to-class": "opacity-0 " + (e.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          onAfterEnter: o[2] || (o[2] = (a) => t.value = !0),
          onAfterLeave: e.modalContext.afterLeave
        }, {
          default: w(() => [
            S(m(st), {
              "aria-describedby": void 0,
              class: J({
                "im-slideover-wrapper w-full transition duration-300 ease-in-out": !0,
                "blur-sm": !e.modalContext.onTopOfStack,
                "sm:max-w-sm": e.config.maxWidth == "sm",
                "sm:max-w-md": e.config.maxWidth == "md",
                "sm:max-w-md md:max-w-lg": e.config.maxWidth == "lg",
                "sm:max-w-md md:max-w-xl": e.config.maxWidth == "xl",
                "sm:max-w-md md:max-w-xl lg:max-w-2xl": e.config.maxWidth == "2xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl": e.config.maxWidth == "3xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": e.config.maxWidth == "4xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": e.config.maxWidth == "5xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": e.config.maxWidth == "6xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": e.config.maxWidth == "7xl"
              }),
              onEscapeKeyDown: o[0] || (o[0] = (a) => e.config?.closeExplicitly && a.preventDefault()),
              onInteractOutside: o[1] || (o[1] = (a) => e.config?.closeExplicitly && a.preventDefault())
            }, {
              default: w(() => [
                S(m(ut), { "as-child": "" }, {
                  default: w(() => [
                    S(m(it))
                  ]),
                  _: 1
                }),
                W("div", {
                  class: J(["im-slideover-content relative", [e.config.paddingClasses, e.config.panelClasses]]),
                  "data-inertiaui-modal-entered": t.value
                }, [
                  e.config.closeButton ? (x(), K("div", Jn, [
                    S(ct)
                  ])) : L("", !0),
                  E(n.$slots, "default", {
                    modalContext: e.modalContext,
                    config: e.config
                  })
                ], 10, Yn)
              ]),
              _: 3
            }, 8, ["class"])
          ]),
          _: 3
        }, 8, ["enter-from-class", "leave-to-class", "onAfterLeave"])
      ], 2)
    ]));
  }
}, Zn = ["data-inertiaui-modal-id", "data-inertiaui-modal-index", "aria-hidden"], Qn = {
  key: 1,
  class: "im-backdrop fixed inset-0 z-30 bg-black/75"
}, co = {
  __name: "Modal",
  emits: ["after-leave", "blur", "close", "focus", "success"],
  setup(e, { expose: t }) {
    const n = h(null), o = h(!1);
    return t({
      afterLeave: () => n.value?.afterLeave(),
      close: () => n.value?.close(),
      emit: (...a) => n.value?.emit(...a),
      getChildModal: () => n.value?.getChildModal(),
      getParentModal: () => n.value?.getParentModal(),
      reload: (...a) => n.value?.reload(...a),
      setOpen: (...a) => n.value?.setOpen(...a),
      get config() {
        return n.value?.config;
      },
      get id() {
        return n.value?.id;
      },
      get index() {
        return n.value?.index;
      },
      get isOpen() {
        return n.value?.isOpen;
      },
      get modalContext() {
        return n.value?.modalContext;
      },
      get onTopOfStack() {
        return n.value?.onTopOfStack;
      },
      get shouldRender() {
        return n.value?.shouldRender;
      }
    }), (a, l) => (x(), C(jt, {
      ref_key: "modal",
      ref: n,
      onSuccess: l[2] || (l[2] = (s) => a.$emit("success")),
      onClose: l[3] || (l[3] = (s) => a.$emit("close")),
      onFocus: l[4] || (l[4] = (s) => a.$emit("focus")),
      onBlur: l[5] || (l[5] = (s) => a.$emit("blur"))
    }, {
      default: w(({
        afterLeave: s,
        close: r,
        config: i,
        emit: d,
        getChildModal: c,
        getParentModal: u,
        id: p,
        index: f,
        isOpen: v,
        modalContext: g,
        onTopOfStack: y,
        reload: b,
        setOpen: D,
        shouldRender: M
      }) => [
        S(m(hn), {
          open: v,
          "onUpdate:open": D
        }, {
          default: w(() => [
            S(m(wn), null, {
              default: w(() => [
                W("div", {
                  "data-inertiaui-modal-id": p,
                  "data-inertiaui-modal-index": f,
                  class: "im-dialog relative z-20",
                  "aria-hidden": !y
                }, [
                  f === 0 && y ? (x(), C(Ae, {
                    key: 0,
                    appear: !o.value,
                    "enter-active-class": "transition transform ease-in-out duration-300",
                    "enter-from-class": "opacity-0",
                    "enter-to-class": "opacity-100",
                    "leave-active-class": "transition transform ease-in-out duration-300",
                    "leave-from-class": "opacity-100",
                    "leave-to-class": "opacity-0",
                    onAfterAppear: l[0] || (l[0] = (N) => o.value = !0)
                  }, {
                    default: w(() => [
                      S(m(Un), { class: "im-backdrop fixed inset-0 z-30 bg-black/75" })
                    ]),
                    _: 1
                  }, 8, ["appear"])) : L("", !0),
                  f > 0 && y ? (x(), K("div", Qn)) : L("", !0),
                  (x(), C($e(i?.slideover ? Gn : zn), {
                    "modal-context": g,
                    config: i,
                    onAfterLeave: l[1] || (l[1] = (N) => a.$emit("after-leave"))
                  }, {
                    default: w(() => [
                      E(a.$slots, "default", {
                        id: p,
                        afterLeave: s,
                        close: r,
                        config: i,
                        emit: d,
                        getChildModal: c,
                        getParentModal: u,
                        index: f,
                        isOpen: v,
                        modalContext: g,
                        onTopOfStack: y,
                        reload: b,
                        setOpen: D,
                        shouldRender: M
                      })
                    ]),
                    _: 2
                  }, 1064, ["modal-context", "config"]))
                ], 8, Zn)
              ]),
              _: 2
            }, 1024)
          ]),
          _: 2
        }, 1032, ["open", "onUpdate:open"])
      ]),
      _: 3
    }, 512));
  }
}, fo = {
  __name: "ModalLink",
  props: {
    href: {
      type: String,
      required: !0
    },
    method: {
      type: String,
      default: "get"
    },
    data: {
      type: Object,
      default: () => ({})
    },
    as: {
      type: String,
      default: "a"
    },
    headers: {
      type: Object,
      default: () => ({})
    },
    queryStringArrayFormat: {
      type: String,
      default: "brackets"
    },
    navigate: {
      type: Boolean,
      default: null
    },
    // Passthrough to Modal.vue
    closeButton: {
      type: Boolean,
      required: !1,
      default: null
    },
    closeExplicitly: {
      type: Boolean,
      required: !1,
      default: null
    },
    maxWidth: {
      type: String,
      required: !1,
      default: null
    },
    paddingClasses: {
      type: [Boolean, String],
      required: !1,
      default: null
    },
    panelClasses: {
      type: [Boolean, String],
      required: !1,
      default: null
    },
    position: {
      type: String,
      required: !1,
      default: null
    },
    slideover: {
      type: Boolean,
      required: !1,
      default: null
    }
  },
  emits: ["after-leave", "blur", "close", "error", "focus", "start", "success"],
  setup(e, { emit: t }) {
    const n = e, o = h(!1), a = le(), l = h(null);
    Ce("modalContext", l);
    const s = t, r = h(!1), i = $(() => n.navigate ?? Me("navigate"));
    B(
      () => l.value?.onTopOfStack,
      (g) => {
        l.value && (g && r.value ? s("focus") : g || s("blur"), r.value = !g);
      }
    );
    const d = h(null);
    fe(() => {
      d.value?.();
    });
    const c = _e();
    function u() {
      d.value = l.value.registerEventListenersFromAttrs(c);
    }
    B(l, (g, y) => {
      g && !y && (u(), s("success"));
    });
    function p() {
      s("close");
    }
    function f() {
      l.value = null, s("after-leave");
    }
    function v() {
      o.value || (n.href.startsWith("#") || (o.value = !0, s("start")), a.visit(
        n.href,
        n.method,
        n.data,
        n.headers,
        Dt(ze(n, Wt)),
        p,
        f,
        n.queryStringArrayFormat,
        i.value
      ).then((g) => {
        l.value = g;
      }).catch((g) => s("error", g)).finally(() => o.value = !1));
    }
    return (g, y) => (x(), C($e(e.as), P(m(c), {
      href: e.href,
      onClick: At(v, ["prevent"])
    }), {
      default: w(() => [
        E(g.$slots, "default", { loading: o.value })
      ]),
      _: 3
    }, 16, ["href"]));
  }
}, mo = {
  __name: "WhenVisible",
  props: {
    data: [String, Array],
    params: Object,
    buffer: { type: Number, default: 0 },
    as: { type: String, default: "div" },
    always: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, n = ae("modalContext");
    if (!n)
      throw new Error("Deferred component must be used inside a Modal component");
    const o = h(!1), a = h(!1), l = h(null);
    let s = null;
    const r = () => {
      if (t.data)
        return { only: Array.isArray(t.data) ? t.data : [t.data] };
      if (!t.params)
        throw new Error("You must provide either a `data` or `params` prop.");
      return t.params;
    };
    return Z(() => {
      l.value && (s = new IntersectionObserver(
        (d) => {
          if (!d[0].isIntersecting || (t.always || s.disconnect(), a.value))
            return;
          a.value = !0;
          const c = r();
          n.value.reload({
            ...c,
            onStart: () => {
              a.value = !0, c.onStart?.();
            },
            onFinish: () => {
              o.value = !0, a.value = !1, c.onFinish?.();
            }
          });
        },
        { rootMargin: `${t.buffer}px` }
      ), s.observe(l.value));
    }), _(() => s?.disconnect()), (d, c) => (x(), C($e(t.as), {
      ref_key: "rootElement",
      ref: l
    }, {
      default: w(() => [
        o.value ? E(d.$slots, "default", { key: 0 }) : E(d.$slots, "fallback", { key: 1 })
      ]),
      _: 3
    }, 512));
  }
};
function po(e, t = {}) {
  return le().visit(
    e,
    t.method ?? "get",
    t.data ?? {},
    t.headers ?? {},
    t.config ?? {},
    t.onClose,
    t.onAfterLeave,
    t.queryStringArrayFormat ?? "brackets",
    t.navigate ?? Me("navigate")
  ).then((n) => {
    const o = t.listeners ?? {};
    return Object.keys(o).forEach((a) => {
      const l = a.replace(/([A-Z])/g, "-$1").toLowerCase();
      n.on(l, o[a]);
    }), n;
  });
}
export {
  uo as Deferred,
  jt as HeadlessModal,
  co as Modal,
  fo as ModalLink,
  Pt as ModalRoot,
  mo as WhenVisible,
  Me as getConfig,
  ro as initFromPageProps,
  lo as putConfig,
  so as renderApp,
  ao as resetConfig,
  io as useModal,
  po as visitModal
};
