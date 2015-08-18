!function t(e, i, n) {
    function s(r, a) {
        if (!i[r]) {
            if (!e[r]) {
                var l = "function" == typeof require && require;
                if (!a && l) return l(r, !0);
                if (o) return o(r, !0);
                throw new Error("Cannot find module '" + r + "'");
            }
            var h = i[r] = {
                exports: {}
            };
            e[r][0].call(h.exports, function(t) {
                var i = e[r][1][t];
                return s(i ? i : t);
            }, h, h.exports, t, e, i, n);
        }
        return i[r].exports;
    }
    for (var o = "function" == typeof require && require, r = 0; r < n.length; r++) s(n[r]);
    return s;
}({
    1: [ function(t, e, i) {
        "use strict";
        var n = t("./handlebars/base"), s = t("./handlebars/safe-string")["default"], o = t("./handlebars/exception")["default"], r = t("./handlebars/utils"), a = t("./handlebars/runtime"), l = function() {
            var t = new n.HandlebarsEnvironment();
            return r.extend(t, n), t.SafeString = s, t.Exception = o, t.Utils = r, t.VM = a, 
            t.template = function(e) {
                return a.template(e, t);
            }, t;
        }, h = l();
        h.create = l, i["default"] = h;
    }, {
        "./handlebars/base": 2,
        "./handlebars/exception": 3,
        "./handlebars/runtime": 4,
        "./handlebars/safe-string": 5,
        "./handlebars/utils": 6
    } ],
    2: [ function(t, e, i) {
        "use strict";
        function n(t, e) {
            this.helpers = t || {}, this.partials = e || {}, s(this);
        }
        function s(t) {
            t.registerHelper("helperMissing", function(t) {
                if (2 === arguments.length) return void 0;
                throw new a("Missing helper: '" + t + "'");
            }), t.registerHelper("blockHelperMissing", function(e, i) {
                var n = i.inverse || function() {}, s = i.fn;
                return p(e) && (e = e.call(this)), e === !0 ? s(this) : e === !1 || null == e ? n(this) : u(e) ? e.length > 0 ? t.helpers.each(e, i) : n(this) : s(e);
            }), t.registerHelper("each", function(t, e) {
                var i, n = e.fn, s = e.inverse, o = 0, r = "";
                if (p(t) && (t = t.call(this)), e.data && (i = m(e.data)), t && "object" == typeof t) if (u(t)) for (var a = t.length; a > o; o++) i && (i.index = o, 
                i.first = 0 === o, i.last = o === t.length - 1), r += n(t[o], {
                    data: i
                }); else for (var l in t) t.hasOwnProperty(l) && (i && (i.key = l, i.index = o, 
                i.first = 0 === o), r += n(t[l], {
                    data: i
                }), o++);
                return 0 === o && (r = s(this)), r;
            }), t.registerHelper("if", function(t, e) {
                return p(t) && (t = t.call(this)), !e.hash.includeZero && !t || r.isEmpty(t) ? e.inverse(this) : e.fn(this);
            }), t.registerHelper("unless", function(e, i) {
                return t.helpers["if"].call(this, e, {
                    fn: i.inverse,
                    inverse: i.fn,
                    hash: i.hash
                });
            }), t.registerHelper("with", function(t, e) {
                return p(t) && (t = t.call(this)), r.isEmpty(t) ? void 0 : e.fn(t);
            }), t.registerHelper("log", function(e, i) {
                var n = i.data && null != i.data.level ? parseInt(i.data.level, 10) : 1;
                t.log(n, e);
            });
        }
        function o(t, e) {
            g.log(t, e);
        }
        var r = t("./utils"), a = t("./exception")["default"], l = "1.3.0";
        i.VERSION = l;
        var h = 4;
        i.COMPILER_REVISION = h;
        var c = {
            1: "<= 1.0.rc.2",
            2: "== 1.0.0-rc.3",
            3: "== 1.0.0-rc.4",
            4: ">= 1.0.0"
        };
        i.REVISION_CHANGES = c;
        var u = r.isArray, p = r.isFunction, d = r.toString, f = "[object Object]";
        i.HandlebarsEnvironment = n, n.prototype = {
            constructor: n,
            logger: g,
            log: o,
            registerHelper: function(t, e, i) {
                if (d.call(t) === f) {
                    if (i || e) throw new a("Arg not supported with multiple helpers");
                    r.extend(this.helpers, t);
                } else i && (e.not = i), this.helpers[t] = e;
            },
            registerPartial: function(t, e) {
                d.call(t) === f ? r.extend(this.partials, t) : this.partials[t] = e;
            }
        };
        var g = {
            methodMap: {
                0: "debug",
                1: "info",
                2: "warn",
                3: "error"
            },
            DEBUG: 0,
            INFO: 1,
            WARN: 2,
            ERROR: 3,
            level: 3,
            log: function(t, e) {
                if (g.level <= t) {
                    var i = g.methodMap[t];
                    "undefined" != typeof console && console[i] && console[i].call(console, e);
                }
            }
        };
        i.logger = g, i.log = o;
        var m = function(t) {
            var e = {};
            return r.extend(e, t), e;
        };
        i.createFrame = m;
    }, {
        "./exception": 3,
        "./utils": 6
    } ],
    3: [ function(t, e, i) {
        "use strict";
        function n(t, e) {
            var i;
            e && e.firstLine && (i = e.firstLine, t += " - " + i + ":" + e.firstColumn);
            for (var n = Error.prototype.constructor.call(this, t), o = 0; o < s.length; o++) this[s[o]] = n[s[o]];
            i && (this.lineNumber = i, this.column = e.firstColumn);
        }
        var s = [ "description", "fileName", "lineNumber", "message", "name", "number", "stack" ];
        n.prototype = new Error(), i["default"] = n;
    }, {} ],
    4: [ function(t, e, i) {
        "use strict";
        function n(t) {
            var e = t && t[0] || 1, i = u;
            if (e !== i) {
                if (i > e) {
                    var n = p[i], s = p[e];
                    throw new c("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + n + ") or downgrade your runtime to an older version (" + s + ").");
                }
                throw new c("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + t[1] + ").");
            }
        }
        function s(t, e) {
            if (!e) throw new c("No environment passed to template");
            var i = function(t, i, n, s, o, r) {
                var a = e.VM.invokePartial.apply(this, arguments);
                if (null != a) return a;
                if (e.compile) {
                    var l = {
                        helpers: s,
                        partials: o,
                        data: r
                    };
                    return o[i] = e.compile(t, {
                        data: void 0 !== r
                    }, e), o[i](n, l);
                }
                throw new c("The partial " + i + " could not be compiled when running in runtime-only mode");
            }, n = {
                escapeExpression: h.escapeExpression,
                invokePartial: i,
                programs: [],
                program: function(t, e, i) {
                    var n = this.programs[t];
                    return i ? n = r(t, e, i) : n || (n = this.programs[t] = r(t, e)), n;
                },
                merge: function(t, e) {
                    var i = t || e;
                    return t && e && t !== e && (i = {}, h.extend(i, e), h.extend(i, t)), i;
                },
                programWithDepth: e.VM.programWithDepth,
                noop: e.VM.noop,
                compilerInfo: null
            };
            return function(i, s) {
                s = s || {};
                var o, r, a = s.partial ? s : e;
                s.partial || (o = s.helpers, r = s.partials);
                var l = t.call(n, a, i, o, r, s.data);
                return s.partial || e.VM.checkRevision(n.compilerInfo), l;
            };
        }
        function o(t, e, i) {
            var n = Array.prototype.slice.call(arguments, 3), s = function(t, s) {
                return s = s || {}, e.apply(this, [ t, s.data || i ].concat(n));
            };
            return s.program = t, s.depth = n.length, s;
        }
        function r(t, e, i) {
            var n = function(t, n) {
                return n = n || {}, e(t, n.data || i);
            };
            return n.program = t, n.depth = 0, n;
        }
        function a(t, e, i, n, s, o) {
            var r = {
                partial: !0,
                helpers: n,
                partials: s,
                data: o
            };
            if (void 0 === t) throw new c("The partial " + e + " could not be found");
            return t instanceof Function ? t(i, r) : void 0;
        }
        function l() {
            return "";
        }
        var h = t("./utils"), c = t("./exception")["default"], u = t("./base").COMPILER_REVISION, p = t("./base").REVISION_CHANGES;
        i.checkRevision = n, i.template = s, i.programWithDepth = o, i.program = r, i.invokePartial = a, 
        i.noop = l;
    }, {
        "./base": 2,
        "./exception": 3,
        "./utils": 6
    } ],
    5: [ function(t, e, i) {
        "use strict";
        function n(t) {
            this.string = t;
        }
        n.prototype.toString = function() {
            return "" + this.string;
        }, i["default"] = n;
    }, {} ],
    6: [ function(t, e, i) {
        "use strict";
        function n(t) {
            return l[t] || "&amp;";
        }
        function s(t, e) {
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        }
        function o(t) {
            return t instanceof a ? t.toString() : t || 0 === t ? (t = "" + t, c.test(t) ? t.replace(h, n) : t) : "";
        }
        function r(t) {
            return t || 0 === t ? d(t) && 0 === t.length ? !0 : !1 : !0;
        }
        var a = t("./safe-string")["default"], l = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;"
        }, h = /[&<>"'`]/g, c = /[&<>"'`]/;
        i.extend = s;
        var u = Object.prototype.toString;
        i.toString = u;
        var p = function(t) {
            return "function" == typeof t;
        };
        p(/x/) && (p = function(t) {
            return "function" == typeof t && "[object Function]" === u.call(t);
        });
        var p;
        i.isFunction = p;
        var d = Array.isArray || function(t) {
            return t && "object" == typeof t ? "[object Array]" === u.call(t) : !1;
        };
        i.isArray = d, i.escapeExpression = o, i.isEmpty = r;
    }, {
        "./safe-string": 5
    } ],
    7: [ function(t, e) {
        e.exports = t("./dist/cjs/handlebars.runtime");
    }, {
        "./dist/cjs/handlebars.runtime": 1
    } ],
    8: [ function(t, e) {
        e.exports = t("handlebars/runtime")["default"];
    }, {
        "handlebars/runtime": 7
    } ],
    9: [ function(t, e) {
        e.exports = t("hbsfy/runtime");
    }, {
        "hbsfy/runtime": 8
    } ],
    10: [ function(t, e) {
        (function(i) {
            e.exports = function(e) {
                var n = i.jQuery;
                i.jQuery = e, t("./jquery-ui-1.10.4.custom.min.js"), delete i.jQuery, n && (i.jQuery = n);
            };
        }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
        "./jquery-ui-1.10.4.custom.min.js": 11
    } ],
    11: [ function() {
        !function(t, e) {
            function i(e, i) {
                var s, o, r, a = e.nodeName.toLowerCase();
                return "area" === a ? (s = e.parentNode, o = s.name, e.href && o && "map" === s.nodeName.toLowerCase() ? (r = t("img[usemap=#" + o + "]")[0], 
                !!r && n(r)) : !1) : (/input|select|textarea|button|object/.test(a) ? !e.disabled : "a" === a ? e.href || i : i) && n(e);
            }
            function n(e) {
                return t.expr.filters.visible(e) && !t(e).parents().addBack().filter(function() {
                    return "hidden" === t.css(this, "visibility");
                }).length;
            }
            var s = 0, o = /^ui-id-\d+$/;
            t.ui = t.ui || {}, t.extend(t.ui, {
                version: "1.10.4",
                keyCode: {
                    BACKSPACE: 8,
                    COMMA: 188,
                    DELETE: 46,
                    DOWN: 40,
                    END: 35,
                    ENTER: 13,
                    ESCAPE: 27,
                    HOME: 36,
                    LEFT: 37,
                    NUMPAD_ADD: 107,
                    NUMPAD_DECIMAL: 110,
                    NUMPAD_DIVIDE: 111,
                    NUMPAD_ENTER: 108,
                    NUMPAD_MULTIPLY: 106,
                    NUMPAD_SUBTRACT: 109,
                    PAGE_DOWN: 34,
                    PAGE_UP: 33,
                    PERIOD: 190,
                    RIGHT: 39,
                    SPACE: 32,
                    TAB: 9,
                    UP: 38
                }
            }), t.fn.extend({
                focus: function(e) {
                    return function(i, n) {
                        return "number" == typeof i ? this.each(function() {
                            var e = this;
                            setTimeout(function() {
                                t(e).focus(), n && n.call(e);
                            }, i);
                        }) : e.apply(this, arguments);
                    };
                }(t.fn.focus),
                scrollParent: function() {
                    var e;
                    return e = t.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                        return /(relative|absolute|fixed)/.test(t.css(this, "position")) && /(auto|scroll)/.test(t.css(this, "overflow") + t.css(this, "overflow-y") + t.css(this, "overflow-x"));
                    }).eq(0) : this.parents().filter(function() {
                        return /(auto|scroll)/.test(t.css(this, "overflow") + t.css(this, "overflow-y") + t.css(this, "overflow-x"));
                    }).eq(0), /fixed/.test(this.css("position")) || !e.length ? t(document) : e;
                },
                zIndex: function(i) {
                    if (i !== e) return this.css("zIndex", i);
                    if (this.length) for (var n, s, o = t(this[0]); o.length && o[0] !== document; ) {
                        if (n = o.css("position"), ("absolute" === n || "relative" === n || "fixed" === n) && (s = parseInt(o.css("zIndex"), 10), 
                        !isNaN(s) && 0 !== s)) return s;
                        o = o.parent();
                    }
                    return 0;
                },
                uniqueId: function() {
                    return this.each(function() {
                        this.id || (this.id = "ui-id-" + ++s);
                    });
                },
                removeUniqueId: function() {
                    return this.each(function() {
                        o.test(this.id) && t(this).removeAttr("id");
                    });
                }
            }), t.extend(t.expr[":"], {
                data: t.expr.createPseudo ? t.expr.createPseudo(function(e) {
                    return function(i) {
                        return !!t.data(i, e);
                    };
                }) : function(e, i, n) {
                    return !!t.data(e, n[3]);
                },
                focusable: function(e) {
                    return i(e, !isNaN(t.attr(e, "tabindex")));
                },
                tabbable: function(e) {
                    var n = t.attr(e, "tabindex"), s = isNaN(n);
                    return (s || n >= 0) && i(e, !s);
                }
            }), t("<a>").outerWidth(1).jquery || t.each([ "Width", "Height" ], function(i, n) {
                function s(e, i, n, s) {
                    return t.each(o, function() {
                        i -= parseFloat(t.css(e, "padding" + this)) || 0, n && (i -= parseFloat(t.css(e, "border" + this + "Width")) || 0), 
                        s && (i -= parseFloat(t.css(e, "margin" + this)) || 0);
                    }), i;
                }
                var o = "Width" === n ? [ "Left", "Right" ] : [ "Top", "Bottom" ], r = n.toLowerCase(), a = {
                    innerWidth: t.fn.innerWidth,
                    innerHeight: t.fn.innerHeight,
                    outerWidth: t.fn.outerWidth,
                    outerHeight: t.fn.outerHeight
                };
                t.fn["inner" + n] = function(i) {
                    return i === e ? a["inner" + n].call(this) : this.each(function() {
                        t(this).css(r, s(this, i) + "px");
                    });
                }, t.fn["outer" + n] = function(e, i) {
                    return "number" != typeof e ? a["outer" + n].call(this, e) : this.each(function() {
                        t(this).css(r, s(this, e, !0, i) + "px");
                    });
                };
            }), t.fn.addBack || (t.fn.addBack = function(t) {
                return this.add(null == t ? this.prevObject : this.prevObject.filter(t));
            }), t("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (t.fn.removeData = function(e) {
                return function(i) {
                    return arguments.length ? e.call(this, t.camelCase(i)) : e.call(this);
                };
            }(t.fn.removeData)), t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), 
            t.support.selectstart = "onselectstart" in document.createElement("div"), t.fn.extend({
                disableSelection: function() {
                    return this.bind((t.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(t) {
                        t.preventDefault();
                    });
                },
                enableSelection: function() {
                    return this.unbind(".ui-disableSelection");
                }
            }), t.extend(t.ui, {
                plugin: {
                    add: function(e, i, n) {
                        var s, o = t.ui[e].prototype;
                        for (s in n) o.plugins[s] = o.plugins[s] || [], o.plugins[s].push([ i, n[s] ]);
                    },
                    call: function(t, e, i) {
                        var n, s = t.plugins[e];
                        if (s && t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType) for (n = 0; s.length > n; n++) t.options[s[n][0]] && s[n][1].apply(t.element, i);
                    }
                },
                hasScroll: function(e, i) {
                    if ("hidden" === t(e).css("overflow")) return !1;
                    var n = i && "left" === i ? "scrollLeft" : "scrollTop", s = !1;
                    return e[n] > 0 ? !0 : (e[n] = 1, s = e[n] > 0, e[n] = 0, s);
                }
            });
        }(jQuery), function(t, e) {
            var i = 0, n = Array.prototype.slice, s = t.cleanData;
            t.cleanData = function(e) {
                for (var i, n = 0; null != (i = e[n]); n++) try {
                    t(i).triggerHandler("remove");
                } catch (o) {}
                s(e);
            }, t.widget = function(i, n, s) {
                var o, r, a, l, h = {}, c = i.split(".")[0];
                i = i.split(".")[1], o = c + "-" + i, s || (s = n, n = t.Widget), t.expr[":"][o.toLowerCase()] = function(e) {
                    return !!t.data(e, o);
                }, t[c] = t[c] || {}, r = t[c][i], a = t[c][i] = function(t, i) {
                    return this._createWidget ? (arguments.length && this._createWidget(t, i), e) : new a(t, i);
                }, t.extend(a, r, {
                    version: s.version,
                    _proto: t.extend({}, s),
                    _childConstructors: []
                }), l = new n(), l.options = t.widget.extend({}, l.options), t.each(s, function(i, s) {
                    return t.isFunction(s) ? (h[i] = function() {
                        var t = function() {
                            return n.prototype[i].apply(this, arguments);
                        }, e = function(t) {
                            return n.prototype[i].apply(this, t);
                        };
                        return function() {
                            var i, n = this._super, o = this._superApply;
                            return this._super = t, this._superApply = e, i = s.apply(this, arguments), this._super = n, 
                            this._superApply = o, i;
                        };
                    }(), e) : (h[i] = s, e);
                }), a.prototype = t.widget.extend(l, {
                    widgetEventPrefix: r ? l.widgetEventPrefix || i : i
                }, h, {
                    constructor: a,
                    namespace: c,
                    widgetName: i,
                    widgetFullName: o
                }), r ? (t.each(r._childConstructors, function(e, i) {
                    var n = i.prototype;
                    t.widget(n.namespace + "." + n.widgetName, a, i._proto);
                }), delete r._childConstructors) : n._childConstructors.push(a), t.widget.bridge(i, a);
            }, t.widget.extend = function(i) {
                for (var s, o, r = n.call(arguments, 1), a = 0, l = r.length; l > a; a++) for (s in r[a]) o = r[a][s], 
                r[a].hasOwnProperty(s) && o !== e && (i[s] = t.isPlainObject(o) ? t.isPlainObject(i[s]) ? t.widget.extend({}, i[s], o) : t.widget.extend({}, o) : o);
                return i;
            }, t.widget.bridge = function(i, s) {
                var o = s.prototype.widgetFullName || i;
                t.fn[i] = function(r) {
                    var a = "string" == typeof r, l = n.call(arguments, 1), h = this;
                    return r = !a && l.length ? t.widget.extend.apply(null, [ r ].concat(l)) : r, a ? this.each(function() {
                        var n, s = t.data(this, o);
                        return s ? t.isFunction(s[r]) && "_" !== r.charAt(0) ? (n = s[r].apply(s, l), n !== s && n !== e ? (h = n && n.jquery ? h.pushStack(n.get()) : n, 
                        !1) : e) : t.error("no such method '" + r + "' for " + i + " widget instance") : t.error("cannot call methods on " + i + " prior to initialization; attempted to call method '" + r + "'");
                    }) : this.each(function() {
                        var e = t.data(this, o);
                        e ? e.option(r || {})._init() : t.data(this, o, new s(r, this));
                    }), h;
                };
            }, t.Widget = function() {}, t.Widget._childConstructors = [], t.Widget.prototype = {
                widgetName: "widget",
                widgetEventPrefix: "",
                defaultElement: "<div>",
                options: {
                    disabled: !1,
                    create: null
                },
                _createWidget: function(e, n) {
                    n = t(n || this.defaultElement || this)[0], this.element = t(n), this.uuid = i++, 
                    this.eventNamespace = "." + this.widgetName + this.uuid, this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), 
                    this.bindings = t(), this.hoverable = t(), this.focusable = t(), n !== this && (t.data(n, this.widgetFullName, this), 
                    this._on(!0, this.element, {
                        remove: function(t) {
                            t.target === n && this.destroy();
                        }
                    }), this.document = t(n.style ? n.ownerDocument : n.document || n), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), 
                    this._create(), this._trigger("create", null, this._getCreateEventData()), this._init();
                },
                _getCreateOptions: t.noop,
                _getCreateEventData: t.noop,
                _create: t.noop,
                _init: t.noop,
                destroy: function() {
                    this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)), 
                    this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), 
                    this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), 
                    this.focusable.removeClass("ui-state-focus");
                },
                _destroy: t.noop,
                widget: function() {
                    return this.element;
                },
                option: function(i, n) {
                    var s, o, r, a = i;
                    if (0 === arguments.length) return t.widget.extend({}, this.options);
                    if ("string" == typeof i) if (a = {}, s = i.split("."), i = s.shift(), s.length) {
                        for (o = a[i] = t.widget.extend({}, this.options[i]), r = 0; s.length - 1 > r; r++) o[s[r]] = o[s[r]] || {}, 
                        o = o[s[r]];
                        if (i = s.pop(), 1 === arguments.length) return o[i] === e ? null : o[i];
                        o[i] = n;
                    } else {
                        if (1 === arguments.length) return this.options[i] === e ? null : this.options[i];
                        a[i] = n;
                    }
                    return this._setOptions(a), this;
                },
                _setOptions: function(t) {
                    var e;
                    for (e in t) this._setOption(e, t[e]);
                    return this;
                },
                _setOption: function(t, e) {
                    return this.options[t] = e, "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!e).attr("aria-disabled", e), 
                    this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), 
                    this;
                },
                enable: function() {
                    return this._setOption("disabled", !1);
                },
                disable: function() {
                    return this._setOption("disabled", !0);
                },
                _on: function(i, n, s) {
                    var o, r = this;
                    "boolean" != typeof i && (s = n, n = i, i = !1), s ? (n = o = t(n), this.bindings = this.bindings.add(n)) : (s = n, 
                    n = this.element, o = this.widget()), t.each(s, function(s, a) {
                        function l() {
                            return i || r.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof a ? r[a] : a).apply(r, arguments) : e;
                        }
                        "string" != typeof a && (l.guid = a.guid = a.guid || l.guid || t.guid++);
                        var h = s.match(/^(\w+)\s*(.*)$/), c = h[1] + r.eventNamespace, u = h[2];
                        u ? o.delegate(u, c, l) : n.bind(c, l);
                    });
                },
                _off: function(t, e) {
                    e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, 
                    t.unbind(e).undelegate(e);
                },
                _delay: function(t, e) {
                    function i() {
                        return ("string" == typeof t ? n[t] : t).apply(n, arguments);
                    }
                    var n = this;
                    return setTimeout(i, e || 0);
                },
                _hoverable: function(e) {
                    this.hoverable = this.hoverable.add(e), this._on(e, {
                        mouseenter: function(e) {
                            t(e.currentTarget).addClass("ui-state-hover");
                        },
                        mouseleave: function(e) {
                            t(e.currentTarget).removeClass("ui-state-hover");
                        }
                    });
                },
                _focusable: function(e) {
                    this.focusable = this.focusable.add(e), this._on(e, {
                        focusin: function(e) {
                            t(e.currentTarget).addClass("ui-state-focus");
                        },
                        focusout: function(e) {
                            t(e.currentTarget).removeClass("ui-state-focus");
                        }
                    });
                },
                _trigger: function(e, i, n) {
                    var s, o, r = this.options[e];
                    if (n = n || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), 
                    i.target = this.element[0], o = i.originalEvent) for (s in o) s in i || (i[s] = o[s]);
                    return this.element.trigger(i, n), !(t.isFunction(r) && r.apply(this.element[0], [ i ].concat(n)) === !1 || i.isDefaultPrevented());
                }
            }, t.each({
                show: "fadeIn",
                hide: "fadeOut"
            }, function(e, i) {
                t.Widget.prototype["_" + e] = function(n, s, o) {
                    "string" == typeof s && (s = {
                        effect: s
                    });
                    var r, a = s ? s === !0 || "number" == typeof s ? i : s.effect || i : e;
                    s = s || {}, "number" == typeof s && (s = {
                        duration: s
                    }), r = !t.isEmptyObject(s), s.complete = o, s.delay && n.delay(s.delay), r && t.effects && t.effects.effect[a] ? n[e](s) : a !== e && n[a] ? n[a](s.duration, s.easing, o) : n.queue(function(i) {
                        t(this)[e](), o && o.call(n[0]), i();
                    });
                };
            });
        }(jQuery), function(t) {
            var e = !1;
            t(document).mouseup(function() {
                e = !1;
            }), t.widget("ui.mouse", {
                version: "1.10.4",
                options: {
                    cancel: "input,textarea,button,select,option",
                    distance: 1,
                    delay: 0
                },
                _mouseInit: function() {
                    var e = this;
                    this.element.bind("mousedown." + this.widgetName, function(t) {
                        return e._mouseDown(t);
                    }).bind("click." + this.widgetName, function(i) {
                        return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), 
                        i.stopImmediatePropagation(), !1) : void 0;
                    }), this.started = !1;
                },
                _mouseDestroy: function() {
                    this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
                },
                _mouseDown: function(i) {
                    if (!e) {
                        this._mouseStarted && this._mouseUp(i), this._mouseDownEvent = i;
                        var n = this, s = 1 === i.which, o = "string" == typeof this.options.cancel && i.target.nodeName ? t(i.target).closest(this.options.cancel).length : !1;
                        return s && !o && this._mouseCapture(i) ? (this.mouseDelayMet = !this.options.delay, 
                        this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                            n.mouseDelayMet = !0;
                        }, this.options.delay)), this._mouseDistanceMet(i) && this._mouseDelayMet(i) && (this._mouseStarted = this._mouseStart(i) !== !1, 
                        !this._mouseStarted) ? (i.preventDefault(), !0) : (!0 === t.data(i.target, this.widgetName + ".preventClickEvent") && t.removeData(i.target, this.widgetName + ".preventClickEvent"), 
                        this._mouseMoveDelegate = function(t) {
                            return n._mouseMove(t);
                        }, this._mouseUpDelegate = function(t) {
                            return n._mouseUp(t);
                        }, t(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), 
                        i.preventDefault(), e = !0, !0)) : !0;
                    }
                },
                _mouseMove: function(e) {
                    return t.ui.ie && (!document.documentMode || 9 > document.documentMode) && !e.button ? this._mouseUp(e) : this._mouseStarted ? (this._mouseDrag(e), 
                    e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, 
                    this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted);
                },
                _mouseUp: function(e) {
                    return t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), 
                    this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), 
                    this._mouseStop(e)), !1;
                },
                _mouseDistanceMet: function(t) {
                    return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance;
                },
                _mouseDelayMet: function() {
                    return this.mouseDelayMet;
                },
                _mouseStart: function() {},
                _mouseDrag: function() {},
                _mouseStop: function() {},
                _mouseCapture: function() {
                    return !0;
                }
            });
        }(jQuery), function(t, e) {
            function i(t, e, i) {
                return [ parseFloat(t[0]) * (d.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (d.test(t[1]) ? i / 100 : 1) ];
            }
            function n(e, i) {
                return parseInt(t.css(e, i), 10) || 0;
            }
            function s(e) {
                var i = e[0];
                return 9 === i.nodeType ? {
                    width: e.width(),
                    height: e.height(),
                    offset: {
                        top: 0,
                        left: 0
                    }
                } : t.isWindow(i) ? {
                    width: e.width(),
                    height: e.height(),
                    offset: {
                        top: e.scrollTop(),
                        left: e.scrollLeft()
                    }
                } : i.preventDefault ? {
                    width: 0,
                    height: 0,
                    offset: {
                        top: i.pageY,
                        left: i.pageX
                    }
                } : {
                    width: e.outerWidth(),
                    height: e.outerHeight(),
                    offset: e.offset()
                };
            }
            t.ui = t.ui || {};
            var o, r = Math.max, a = Math.abs, l = Math.round, h = /left|center|right/, c = /top|center|bottom/, u = /[\+\-]\d+(\.[\d]+)?%?/, p = /^\w+/, d = /%$/, f = t.fn.position;
            t.position = {
                scrollbarWidth: function() {
                    if (o !== e) return o;
                    var i, n, s = t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), r = s.children()[0];
                    return t("body").append(s), i = r.offsetWidth, s.css("overflow", "scroll"), n = r.offsetWidth, 
                    i === n && (n = s[0].clientWidth), s.remove(), o = i - n;
                },
                getScrollInfo: function(e) {
                    var i = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"), n = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"), s = "scroll" === i || "auto" === i && e.width < e.element[0].scrollWidth, o = "scroll" === n || "auto" === n && e.height < e.element[0].scrollHeight;
                    return {
                        width: o ? t.position.scrollbarWidth() : 0,
                        height: s ? t.position.scrollbarWidth() : 0
                    };
                },
                getWithinInfo: function(e) {
                    var i = t(e || window), n = t.isWindow(i[0]), s = !!i[0] && 9 === i[0].nodeType;
                    return {
                        element: i,
                        isWindow: n,
                        isDocument: s,
                        offset: i.offset() || {
                            left: 0,
                            top: 0
                        },
                        scrollLeft: i.scrollLeft(),
                        scrollTop: i.scrollTop(),
                        width: n ? i.width() : i.outerWidth(),
                        height: n ? i.height() : i.outerHeight()
                    };
                }
            }, t.fn.position = function(e) {
                if (!e || !e.of) return f.apply(this, arguments);
                e = t.extend({}, e);
                var o, d, g, m, v, b, y = t(e.of), w = t.position.getWithinInfo(e.within), x = t.position.getScrollInfo(w), _ = (e.collision || "flip").split(" "), C = {};
                return b = s(y), y[0].preventDefault && (e.at = "left top"), d = b.width, g = b.height, 
                m = b.offset, v = t.extend({}, m), t.each([ "my", "at" ], function() {
                    var t, i, n = (e[this] || "").split(" ");
                    1 === n.length && (n = h.test(n[0]) ? n.concat([ "center" ]) : c.test(n[0]) ? [ "center" ].concat(n) : [ "center", "center" ]), 
                    n[0] = h.test(n[0]) ? n[0] : "center", n[1] = c.test(n[1]) ? n[1] : "center", t = u.exec(n[0]), 
                    i = u.exec(n[1]), C[this] = [ t ? t[0] : 0, i ? i[0] : 0 ], e[this] = [ p.exec(n[0])[0], p.exec(n[1])[0] ];
                }), 1 === _.length && (_[1] = _[0]), "right" === e.at[0] ? v.left += d : "center" === e.at[0] && (v.left += d / 2), 
                "bottom" === e.at[1] ? v.top += g : "center" === e.at[1] && (v.top += g / 2), o = i(C.at, d, g), 
                v.left += o[0], v.top += o[1], this.each(function() {
                    var s, h, c = t(this), u = c.outerWidth(), p = c.outerHeight(), f = n(this, "marginLeft"), b = n(this, "marginTop"), T = u + f + n(this, "marginRight") + x.width, P = p + b + n(this, "marginBottom") + x.height, E = t.extend({}, v), k = i(C.my, c.outerWidth(), c.outerHeight());
                    "right" === e.my[0] ? E.left -= u : "center" === e.my[0] && (E.left -= u / 2), "bottom" === e.my[1] ? E.top -= p : "center" === e.my[1] && (E.top -= p / 2), 
                    E.left += k[0], E.top += k[1], t.support.offsetFractions || (E.left = l(E.left), 
                    E.top = l(E.top)), s = {
                        marginLeft: f,
                        marginTop: b
                    }, t.each([ "left", "top" ], function(i, n) {
                        t.ui.position[_[i]] && t.ui.position[_[i]][n](E, {
                            targetWidth: d,
                            targetHeight: g,
                            elemWidth: u,
                            elemHeight: p,
                            collisionPosition: s,
                            collisionWidth: T,
                            collisionHeight: P,
                            offset: [ o[0] + k[0], o[1] + k[1] ],
                            my: e.my,
                            at: e.at,
                            within: w,
                            elem: c
                        });
                    }), e.using && (h = function(t) {
                        var i = m.left - E.left, n = i + d - u, s = m.top - E.top, o = s + g - p, l = {
                            target: {
                                element: y,
                                left: m.left,
                                top: m.top,
                                width: d,
                                height: g
                            },
                            element: {
                                element: c,
                                left: E.left,
                                top: E.top,
                                width: u,
                                height: p
                            },
                            horizontal: 0 > n ? "left" : i > 0 ? "right" : "center",
                            vertical: 0 > o ? "top" : s > 0 ? "bottom" : "middle"
                        };
                        u > d && d > a(i + n) && (l.horizontal = "center"), p > g && g > a(s + o) && (l.vertical = "middle"), 
                        l.important = r(a(i), a(n)) > r(a(s), a(o)) ? "horizontal" : "vertical", e.using.call(this, t, l);
                    }), c.offset(t.extend(E, {
                        using: h
                    }));
                });
            }, t.ui.position = {
                fit: {
                    left: function(t, e) {
                        var i, n = e.within, s = n.isWindow ? n.scrollLeft : n.offset.left, o = n.width, a = t.left - e.collisionPosition.marginLeft, l = s - a, h = a + e.collisionWidth - o - s;
                        e.collisionWidth > o ? l > 0 && 0 >= h ? (i = t.left + l + e.collisionWidth - o - s, 
                        t.left += l - i) : t.left = h > 0 && 0 >= l ? s : l > h ? s + o - e.collisionWidth : s : l > 0 ? t.left += l : h > 0 ? t.left -= h : t.left = r(t.left - a, t.left);
                    },
                    top: function(t, e) {
                        var i, n = e.within, s = n.isWindow ? n.scrollTop : n.offset.top, o = e.within.height, a = t.top - e.collisionPosition.marginTop, l = s - a, h = a + e.collisionHeight - o - s;
                        e.collisionHeight > o ? l > 0 && 0 >= h ? (i = t.top + l + e.collisionHeight - o - s, 
                        t.top += l - i) : t.top = h > 0 && 0 >= l ? s : l > h ? s + o - e.collisionHeight : s : l > 0 ? t.top += l : h > 0 ? t.top -= h : t.top = r(t.top - a, t.top);
                    }
                },
                flip: {
                    left: function(t, e) {
                        var i, n, s = e.within, o = s.offset.left + s.scrollLeft, r = s.width, l = s.isWindow ? s.scrollLeft : s.offset.left, h = t.left - e.collisionPosition.marginLeft, c = h - l, u = h + e.collisionWidth - r - l, p = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0, d = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0, f = -2 * e.offset[0];
                        0 > c ? (i = t.left + p + d + f + e.collisionWidth - r - o, (0 > i || a(c) > i) && (t.left += p + d + f)) : u > 0 && (n = t.left - e.collisionPosition.marginLeft + p + d + f - l, 
                        (n > 0 || u > a(n)) && (t.left += p + d + f));
                    },
                    top: function(t, e) {
                        var i, n, s = e.within, o = s.offset.top + s.scrollTop, r = s.height, l = s.isWindow ? s.scrollTop : s.offset.top, h = t.top - e.collisionPosition.marginTop, c = h - l, u = h + e.collisionHeight - r - l, p = "top" === e.my[1], d = p ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0, f = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0, g = -2 * e.offset[1];
                        0 > c ? (n = t.top + d + f + g + e.collisionHeight - r - o, t.top + d + f + g > c && (0 > n || a(c) > n) && (t.top += d + f + g)) : u > 0 && (i = t.top - e.collisionPosition.marginTop + d + f + g - l, 
                        t.top + d + f + g > u && (i > 0 || u > a(i)) && (t.top += d + f + g));
                    }
                },
                flipfit: {
                    left: function() {
                        t.ui.position.flip.left.apply(this, arguments), t.ui.position.fit.left.apply(this, arguments);
                    },
                    top: function() {
                        t.ui.position.flip.top.apply(this, arguments), t.ui.position.fit.top.apply(this, arguments);
                    }
                }
            }, function() {
                var e, i, n, s, o, r = document.getElementsByTagName("body")[0], a = document.createElement("div");
                e = document.createElement(r ? "div" : "body"), n = {
                    visibility: "hidden",
                    width: 0,
                    height: 0,
                    border: 0,
                    margin: 0,
                    background: "none"
                }, r && t.extend(n, {
                    position: "absolute",
                    left: "-1000px",
                    top: "-1000px"
                });
                for (o in n) e.style[o] = n[o];
                e.appendChild(a), i = r || document.documentElement, i.insertBefore(e, i.firstChild), 
                a.style.cssText = "position: absolute; left: 10.7432222px;", s = t(a).offset().left, 
                t.support.offsetFractions = s > 10 && 11 > s, e.innerHTML = "", i.removeChild(e);
            }();
        }(jQuery), function(t) {
            t.widget("ui.draggable", t.ui.mouse, {
                version: "1.10.4",
                widgetEventPrefix: "drag",
                options: {
                    addClasses: !0,
                    appendTo: "parent",
                    axis: !1,
                    connectToSortable: !1,
                    containment: !1,
                    cursor: "auto",
                    cursorAt: !1,
                    grid: !1,
                    handle: !1,
                    helper: "original",
                    iframeFix: !1,
                    opacity: !1,
                    refreshPositions: !1,
                    revert: !1,
                    revertDuration: 500,
                    scope: "default",
                    scroll: !0,
                    scrollSensitivity: 20,
                    scrollSpeed: 20,
                    snap: !1,
                    snapMode: "both",
                    snapTolerance: 20,
                    stack: !1,
                    zIndex: !1,
                    drag: null,
                    start: null,
                    stop: null
                },
                _create: function() {
                    "original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), 
                    this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), 
                    this._mouseInit();
                },
                _destroy: function() {
                    this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), 
                    this._mouseDestroy();
                },
                _mouseCapture: function(e) {
                    var i = this.options;
                    return this.helper || i.disabled || t(e.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(e), 
                    this.handle ? (t(i.iframeFix === !0 ? "iframe" : i.iframeFix).each(function() {
                        t("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
                            width: this.offsetWidth + "px",
                            height: this.offsetHeight + "px",
                            position: "absolute",
                            opacity: "0.001",
                            zIndex: 1e3
                        }).css(t(this).offset()).appendTo("body");
                    }), !0) : !1);
                },
                _mouseStart: function(e) {
                    var i = this.options;
                    return this.helper = this._createHelper(e), this.helper.addClass("ui-draggable-dragging"), 
                    this._cacheHelperProportions(), t.ui.ddmanager && (t.ui.ddmanager.current = this), 
                    this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), 
                    this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), 
                    this.offset = this.positionAbs = this.element.offset(), this.offset = {
                        top: this.offset.top - this.margins.top,
                        left: this.offset.left - this.margins.left
                    }, this.offset.scroll = !1, t.extend(this.offset, {
                        click: {
                            left: e.pageX - this.offset.left,
                            top: e.pageY - this.offset.top
                        },
                        parent: this._getParentOffset(),
                        relative: this._getRelativeOffset()
                    }), this.originalPosition = this.position = this._generatePosition(e), this.originalPageX = e.pageX, 
                    this.originalPageY = e.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), 
                    this._setContainment(), this._trigger("start", e) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), 
                    t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._mouseDrag(e, !0), 
                    t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0);
                },
                _mouseDrag: function(e, i) {
                    if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()), 
                    this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), 
                    !i) {
                        var n = this._uiHash();
                        if (this._trigger("drag", e, n) === !1) return this._mouseUp({}), !1;
                        this.position = n.position;
                    }
                    return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), 
                    this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), 
                    t.ui.ddmanager && t.ui.ddmanager.drag(this, e), !1;
                },
                _mouseStop: function(e) {
                    var i = this, n = !1;
                    return t.ui.ddmanager && !this.options.dropBehaviour && (n = t.ui.ddmanager.drop(this, e)), 
                    this.dropped && (n = this.dropped, this.dropped = !1), "original" !== this.options.helper || t.contains(this.element[0].ownerDocument, this.element[0]) ? ("invalid" === this.options.revert && !n || "valid" === this.options.revert && n || this.options.revert === !0 || t.isFunction(this.options.revert) && this.options.revert.call(this.element, n) ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                        i._trigger("stop", e) !== !1 && i._clear();
                    }) : this._trigger("stop", e) !== !1 && this._clear(), !1) : !1;
                },
                _mouseUp: function(e) {
                    return t("div.ui-draggable-iframeFix").each(function() {
                        this.parentNode.removeChild(this);
                    }), t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e), t.ui.mouse.prototype._mouseUp.call(this, e);
                },
                cancel: function() {
                    return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), 
                    this;
                },
                _getHandle: function(e) {
                    return this.options.handle ? !!t(e.target).closest(this.element.find(this.options.handle)).length : !0;
                },
                _createHelper: function(e) {
                    var i = this.options, n = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [ e ])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
                    return n.parents("body").length || n.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), 
                    n[0] === this.element[0] || /(fixed|absolute)/.test(n.css("position")) || n.css("position", "absolute"), 
                    n;
                },
                _adjustOffsetFromHelper: function(e) {
                    "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                        left: +e[0],
                        top: +e[1] || 0
                    }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), 
                    "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top);
                },
                _getParentOffset: function() {
                    var e = this.offsetParent.offset();
                    return "absolute" === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), 
                    e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
                        top: 0,
                        left: 0
                    }), {
                        top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                        left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                    };
                },
                _getRelativeOffset: function() {
                    if ("relative" === this.cssPosition) {
                        var t = this.element.position();
                        return {
                            top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                            left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                        };
                    }
                    return {
                        top: 0,
                        left: 0
                    };
                },
                _cacheMargins: function() {
                    this.margins = {
                        left: parseInt(this.element.css("marginLeft"), 10) || 0,
                        top: parseInt(this.element.css("marginTop"), 10) || 0,
                        right: parseInt(this.element.css("marginRight"), 10) || 0,
                        bottom: parseInt(this.element.css("marginBottom"), 10) || 0
                    };
                },
                _cacheHelperProportions: function() {
                    this.helperProportions = {
                        width: this.helper.outerWidth(),
                        height: this.helper.outerHeight()
                    };
                },
                _setContainment: function() {
                    var e, i, n, s = this.options;
                    return s.containment ? "window" === s.containment ? (this.containment = [ t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, t(window).scrollLeft() + t(window).width() - this.helperProportions.width - this.margins.left, t(window).scrollTop() + (t(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ], 
                    void 0) : "document" === s.containment ? (this.containment = [ 0, 0, t(document).width() - this.helperProportions.width - this.margins.left, (t(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ], 
                    void 0) : s.containment.constructor === Array ? (this.containment = s.containment, 
                    void 0) : ("parent" === s.containment && (s.containment = this.helper[0].parentNode), 
                    i = t(s.containment), n = i[0], n && (e = "hidden" !== i.css("overflow"), this.containment = [ (parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (e ? Math.max(n.scrollWidth, n.offsetWidth) : n.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(n.scrollHeight, n.offsetHeight) : n.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom ], 
                    this.relative_container = i), void 0) : (this.containment = null, void 0);
                },
                _convertPositionTo: function(e, i) {
                    i || (i = this.position);
                    var n = "absolute" === e ? 1 : -1, s = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
                    return this.offset.scroll || (this.offset.scroll = {
                        top: s.scrollTop(),
                        left: s.scrollLeft()
                    }), {
                        top: i.top + this.offset.relative.top * n + this.offset.parent.top * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * n,
                        left: i.left + this.offset.relative.left * n + this.offset.parent.left * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * n
                    };
                },
                _generatePosition: function(e) {
                    var i, n, s, o, r = this.options, a = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, l = e.pageX, h = e.pageY;
                    return this.offset.scroll || (this.offset.scroll = {
                        top: a.scrollTop(),
                        left: a.scrollLeft()
                    }), this.originalPosition && (this.containment && (this.relative_container ? (n = this.relative_container.offset(), 
                    i = [ this.containment[0] + n.left, this.containment[1] + n.top, this.containment[2] + n.left, this.containment[3] + n.top ]) : i = this.containment, 
                    e.pageX - this.offset.click.left < i[0] && (l = i[0] + this.offset.click.left), 
                    e.pageY - this.offset.click.top < i[1] && (h = i[1] + this.offset.click.top), e.pageX - this.offset.click.left > i[2] && (l = i[2] + this.offset.click.left), 
                    e.pageY - this.offset.click.top > i[3] && (h = i[3] + this.offset.click.top)), r.grid && (s = r.grid[1] ? this.originalPageY + Math.round((h - this.originalPageY) / r.grid[1]) * r.grid[1] : this.originalPageY, 
                    h = i ? s - this.offset.click.top >= i[1] || s - this.offset.click.top > i[3] ? s : s - this.offset.click.top >= i[1] ? s - r.grid[1] : s + r.grid[1] : s, 
                    o = r.grid[0] ? this.originalPageX + Math.round((l - this.originalPageX) / r.grid[0]) * r.grid[0] : this.originalPageX, 
                    l = i ? o - this.offset.click.left >= i[0] || o - this.offset.click.left > i[2] ? o : o - this.offset.click.left >= i[0] ? o - r.grid[0] : o + r.grid[0] : o)), 
                    {
                        top: h - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top),
                        left: l - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)
                    };
                },
                _clear: function() {
                    this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), 
                    this.helper = null, this.cancelHelperRemoval = !1;
                },
                _trigger: function(e, i, n) {
                    return n = n || this._uiHash(), t.ui.plugin.call(this, e, [ i, n ]), "drag" === e && (this.positionAbs = this._convertPositionTo("absolute")), 
                    t.Widget.prototype._trigger.call(this, e, i, n);
                },
                plugins: {},
                _uiHash: function() {
                    return {
                        helper: this.helper,
                        position: this.position,
                        originalPosition: this.originalPosition,
                        offset: this.positionAbs
                    };
                }
            }), t.ui.plugin.add("draggable", "connectToSortable", {
                start: function(e, i) {
                    var n = t(this).data("ui-draggable"), s = n.options, o = t.extend({}, i, {
                        item: n.element
                    });
                    n.sortables = [], t(s.connectToSortable).each(function() {
                        var i = t.data(this, "ui-sortable");
                        i && !i.options.disabled && (n.sortables.push({
                            instance: i,
                            shouldRevert: i.options.revert
                        }), i.refreshPositions(), i._trigger("activate", e, o));
                    });
                },
                stop: function(e, i) {
                    var n = t(this).data("ui-draggable"), s = t.extend({}, i, {
                        item: n.element
                    });
                    t.each(n.sortables, function() {
                        this.instance.isOver ? (this.instance.isOver = 0, n.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, 
                        this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(e), 
                        this.instance.options.helper = this.instance.options._helper, "original" === n.options.helper && this.instance.currentItem.css({
                            top: "auto",
                            left: "auto"
                        })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", e, s));
                    });
                },
                drag: function(e, i) {
                    var n = t(this).data("ui-draggable"), s = this;
                    t.each(n.sortables, function() {
                        var o = !1, r = this;
                        this.instance.positionAbs = n.positionAbs, this.instance.helperProportions = n.helperProportions, 
                        this.instance.offset.click = n.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (o = !0, 
                        t.each(n.sortables, function() {
                            return this.instance.positionAbs = n.positionAbs, this.instance.helperProportions = n.helperProportions, 
                            this.instance.offset.click = n.offset.click, this !== r && this.instance._intersectsWith(this.instance.containerCache) && t.contains(r.instance.element[0], this.instance.element[0]) && (o = !1), 
                            o;
                        })), o ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = t(s).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), 
                        this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                            return i.helper[0];
                        }, e.target = this.instance.currentItem[0], this.instance._mouseCapture(e, !0), 
                        this.instance._mouseStart(e, !0, !0), this.instance.offset.click.top = n.offset.click.top, 
                        this.instance.offset.click.left = n.offset.click.left, this.instance.offset.parent.left -= n.offset.parent.left - this.instance.offset.parent.left, 
                        this.instance.offset.parent.top -= n.offset.parent.top - this.instance.offset.parent.top, 
                        n._trigger("toSortable", e), n.dropped = this.instance.element, n.currentItem = n.element, 
                        this.instance.fromOutside = n), this.instance.currentItem && this.instance._mouseDrag(e)) : this.instance.isOver && (this.instance.isOver = 0, 
                        this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", e, this.instance._uiHash(this.instance)), 
                        this.instance._mouseStop(e, !0), this.instance.options.helper = this.instance.options._helper, 
                        this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), 
                        n._trigger("fromSortable", e), n.dropped = !1);
                    });
                }
            }), t.ui.plugin.add("draggable", "cursor", {
                start: function() {
                    var e = t("body"), i = t(this).data("ui-draggable").options;
                    e.css("cursor") && (i._cursor = e.css("cursor")), e.css("cursor", i.cursor);
                },
                stop: function() {
                    var e = t(this).data("ui-draggable").options;
                    e._cursor && t("body").css("cursor", e._cursor);
                }
            }), t.ui.plugin.add("draggable", "opacity", {
                start: function(e, i) {
                    var n = t(i.helper), s = t(this).data("ui-draggable").options;
                    n.css("opacity") && (s._opacity = n.css("opacity")), n.css("opacity", s.opacity);
                },
                stop: function(e, i) {
                    var n = t(this).data("ui-draggable").options;
                    n._opacity && t(i.helper).css("opacity", n._opacity);
                }
            }), t.ui.plugin.add("draggable", "scroll", {
                start: function() {
                    var e = t(this).data("ui-draggable");
                    e.scrollParent[0] !== document && "HTML" !== e.scrollParent[0].tagName && (e.overflowOffset = e.scrollParent.offset());
                },
                drag: function(e) {
                    var i = t(this).data("ui-draggable"), n = i.options, s = !1;
                    i.scrollParent[0] !== document && "HTML" !== i.scrollParent[0].tagName ? (n.axis && "x" === n.axis || (i.overflowOffset.top + i.scrollParent[0].offsetHeight - e.pageY < n.scrollSensitivity ? i.scrollParent[0].scrollTop = s = i.scrollParent[0].scrollTop + n.scrollSpeed : e.pageY - i.overflowOffset.top < n.scrollSensitivity && (i.scrollParent[0].scrollTop = s = i.scrollParent[0].scrollTop - n.scrollSpeed)), 
                    n.axis && "y" === n.axis || (i.overflowOffset.left + i.scrollParent[0].offsetWidth - e.pageX < n.scrollSensitivity ? i.scrollParent[0].scrollLeft = s = i.scrollParent[0].scrollLeft + n.scrollSpeed : e.pageX - i.overflowOffset.left < n.scrollSensitivity && (i.scrollParent[0].scrollLeft = s = i.scrollParent[0].scrollLeft - n.scrollSpeed))) : (n.axis && "x" === n.axis || (e.pageY - t(document).scrollTop() < n.scrollSensitivity ? s = t(document).scrollTop(t(document).scrollTop() - n.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < n.scrollSensitivity && (s = t(document).scrollTop(t(document).scrollTop() + n.scrollSpeed))), 
                    n.axis && "y" === n.axis || (e.pageX - t(document).scrollLeft() < n.scrollSensitivity ? s = t(document).scrollLeft(t(document).scrollLeft() - n.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < n.scrollSensitivity && (s = t(document).scrollLeft(t(document).scrollLeft() + n.scrollSpeed)))), 
                    s !== !1 && t.ui.ddmanager && !n.dropBehaviour && t.ui.ddmanager.prepareOffsets(i, e);
                }
            }), t.ui.plugin.add("draggable", "snap", {
                start: function() {
                    var e = t(this).data("ui-draggable"), i = e.options;
                    e.snapElements = [], t(i.snap.constructor !== String ? i.snap.items || ":data(ui-draggable)" : i.snap).each(function() {
                        var i = t(this), n = i.offset();
                        this !== e.element[0] && e.snapElements.push({
                            item: this,
                            width: i.outerWidth(),
                            height: i.outerHeight(),
                            top: n.top,
                            left: n.left
                        });
                    });
                },
                drag: function(e, i) {
                    var n, s, o, r, a, l, h, c, u, p, d = t(this).data("ui-draggable"), f = d.options, g = f.snapTolerance, m = i.offset.left, v = m + d.helperProportions.width, b = i.offset.top, y = b + d.helperProportions.height;
                    for (u = d.snapElements.length - 1; u >= 0; u--) a = d.snapElements[u].left, l = a + d.snapElements[u].width, 
                    h = d.snapElements[u].top, c = h + d.snapElements[u].height, a - g > v || m > l + g || h - g > y || b > c + g || !t.contains(d.snapElements[u].item.ownerDocument, d.snapElements[u].item) ? (d.snapElements[u].snapping && d.options.snap.release && d.options.snap.release.call(d.element, e, t.extend(d._uiHash(), {
                        snapItem: d.snapElements[u].item
                    })), d.snapElements[u].snapping = !1) : ("inner" !== f.snapMode && (n = g >= Math.abs(h - y), 
                    s = g >= Math.abs(c - b), o = g >= Math.abs(a - v), r = g >= Math.abs(l - m), n && (i.position.top = d._convertPositionTo("relative", {
                        top: h - d.helperProportions.height,
                        left: 0
                    }).top - d.margins.top), s && (i.position.top = d._convertPositionTo("relative", {
                        top: c,
                        left: 0
                    }).top - d.margins.top), o && (i.position.left = d._convertPositionTo("relative", {
                        top: 0,
                        left: a - d.helperProportions.width
                    }).left - d.margins.left), r && (i.position.left = d._convertPositionTo("relative", {
                        top: 0,
                        left: l
                    }).left - d.margins.left)), p = n || s || o || r, "outer" !== f.snapMode && (n = g >= Math.abs(h - b), 
                    s = g >= Math.abs(c - y), o = g >= Math.abs(a - m), r = g >= Math.abs(l - v), n && (i.position.top = d._convertPositionTo("relative", {
                        top: h,
                        left: 0
                    }).top - d.margins.top), s && (i.position.top = d._convertPositionTo("relative", {
                        top: c - d.helperProportions.height,
                        left: 0
                    }).top - d.margins.top), o && (i.position.left = d._convertPositionTo("relative", {
                        top: 0,
                        left: a
                    }).left - d.margins.left), r && (i.position.left = d._convertPositionTo("relative", {
                        top: 0,
                        left: l - d.helperProportions.width
                    }).left - d.margins.left)), !d.snapElements[u].snapping && (n || s || o || r || p) && d.options.snap.snap && d.options.snap.snap.call(d.element, e, t.extend(d._uiHash(), {
                        snapItem: d.snapElements[u].item
                    })), d.snapElements[u].snapping = n || s || o || r || p);
                }
            }), t.ui.plugin.add("draggable", "stack", {
                start: function() {
                    var e, i = this.data("ui-draggable").options, n = t.makeArray(t(i.stack)).sort(function(e, i) {
                        return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0);
                    });
                    n.length && (e = parseInt(t(n[0]).css("zIndex"), 10) || 0, t(n).each(function(i) {
                        t(this).css("zIndex", e + i);
                    }), this.css("zIndex", e + n.length));
                }
            }), t.ui.plugin.add("draggable", "zIndex", {
                start: function(e, i) {
                    var n = t(i.helper), s = t(this).data("ui-draggable").options;
                    n.css("zIndex") && (s._zIndex = n.css("zIndex")), n.css("zIndex", s.zIndex);
                },
                stop: function(e, i) {
                    var n = t(this).data("ui-draggable").options;
                    n._zIndex && t(i.helper).css("zIndex", n._zIndex);
                }
            });
        }(jQuery), function(t) {
            function e(t, e, i) {
                return t > e && e + i > t;
            }
            t.widget("ui.droppable", {
                version: "1.10.4",
                widgetEventPrefix: "drop",
                options: {
                    accept: "*",
                    activeClass: !1,
                    addClasses: !0,
                    greedy: !1,
                    hoverClass: !1,
                    scope: "default",
                    tolerance: "intersect",
                    activate: null,
                    deactivate: null,
                    drop: null,
                    out: null,
                    over: null
                },
                _create: function() {
                    var e, i = this.options, n = i.accept;
                    this.isover = !1, this.isout = !0, this.accept = t.isFunction(n) ? n : function(t) {
                        return t.is(n);
                    }, this.proportions = function() {
                        return arguments.length ? (e = arguments[0], void 0) : e ? e : e = {
                            width: this.element[0].offsetWidth,
                            height: this.element[0].offsetHeight
                        };
                    }, t.ui.ddmanager.droppables[i.scope] = t.ui.ddmanager.droppables[i.scope] || [], 
                    t.ui.ddmanager.droppables[i.scope].push(this), i.addClasses && this.element.addClass("ui-droppable");
                },
                _destroy: function() {
                    for (var e = 0, i = t.ui.ddmanager.droppables[this.options.scope]; i.length > e; e++) i[e] === this && i.splice(e, 1);
                    this.element.removeClass("ui-droppable ui-droppable-disabled");
                },
                _setOption: function(e, i) {
                    "accept" === e && (this.accept = t.isFunction(i) ? i : function(t) {
                        return t.is(i);
                    }), t.Widget.prototype._setOption.apply(this, arguments);
                },
                _activate: function(e) {
                    var i = t.ui.ddmanager.current;
                    this.options.activeClass && this.element.addClass(this.options.activeClass), i && this._trigger("activate", e, this.ui(i));
                },
                _deactivate: function(e) {
                    var i = t.ui.ddmanager.current;
                    this.options.activeClass && this.element.removeClass(this.options.activeClass), 
                    i && this._trigger("deactivate", e, this.ui(i));
                },
                _over: function(e) {
                    var i = t.ui.ddmanager.current;
                    i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), 
                    this._trigger("over", e, this.ui(i)));
                },
                _out: function(e) {
                    var i = t.ui.ddmanager.current;
                    i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), 
                    this._trigger("out", e, this.ui(i)));
                },
                _drop: function(e, i) {
                    var n = i || t.ui.ddmanager.current, s = !1;
                    return n && (n.currentItem || n.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                        var e = t.data(this, "ui-droppable");
                        return e.options.greedy && !e.options.disabled && e.options.scope === n.options.scope && e.accept.call(e.element[0], n.currentItem || n.element) && t.ui.intersect(n, t.extend(e, {
                            offset: e.element.offset()
                        }), e.options.tolerance) ? (s = !0, !1) : void 0;
                    }), s ? !1 : this.accept.call(this.element[0], n.currentItem || n.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), 
                    this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", e, this.ui(n)), 
                    this.element) : !1) : !1;
                },
                ui: function(t) {
                    return {
                        draggable: t.currentItem || t.element,
                        helper: t.helper,
                        position: t.position,
                        offset: t.positionAbs
                    };
                }
            }), t.ui.intersect = function(t, i, n) {
                if (!i.offset) return !1;
                var s, o, r = (t.positionAbs || t.position.absolute).left, a = (t.positionAbs || t.position.absolute).top, l = r + t.helperProportions.width, h = a + t.helperProportions.height, c = i.offset.left, u = i.offset.top, p = c + i.proportions().width, d = u + i.proportions().height;
                switch (n) {
                  case "fit":
                    return r >= c && p >= l && a >= u && d >= h;

                  case "intersect":
                    return r + t.helperProportions.width / 2 > c && p > l - t.helperProportions.width / 2 && a + t.helperProportions.height / 2 > u && d > h - t.helperProportions.height / 2;

                  case "pointer":
                    return s = (t.positionAbs || t.position.absolute).left + (t.clickOffset || t.offset.click).left, 
                    o = (t.positionAbs || t.position.absolute).top + (t.clickOffset || t.offset.click).top, 
                    e(o, u, i.proportions().height) && e(s, c, i.proportions().width);

                  case "touch":
                    return (a >= u && d >= a || h >= u && d >= h || u > a && h > d) && (r >= c && p >= r || l >= c && p >= l || c > r && l > p);

                  default:
                    return !1;
                }
            }, t.ui.ddmanager = {
                current: null,
                droppables: {
                    "default": []
                },
                prepareOffsets: function(e, i) {
                    var n, s, o = t.ui.ddmanager.droppables[e.options.scope] || [], r = i ? i.type : null, a = (e.currentItem || e.element).find(":data(ui-droppable)").addBack();
                    t: for (n = 0; o.length > n; n++) if (!(o[n].options.disabled || e && !o[n].accept.call(o[n].element[0], e.currentItem || e.element))) {
                        for (s = 0; a.length > s; s++) if (a[s] === o[n].element[0]) {
                            o[n].proportions().height = 0;
                            continue t;
                        }
                        o[n].visible = "none" !== o[n].element.css("display"), o[n].visible && ("mousedown" === r && o[n]._activate.call(o[n], i), 
                        o[n].offset = o[n].element.offset(), o[n].proportions({
                            width: o[n].element[0].offsetWidth,
                            height: o[n].element[0].offsetHeight
                        }));
                    }
                },
                drop: function(e, i) {
                    var n = !1;
                    return t.each((t.ui.ddmanager.droppables[e.options.scope] || []).slice(), function() {
                        this.options && (!this.options.disabled && this.visible && t.ui.intersect(e, this, this.options.tolerance) && (n = this._drop.call(this, i) || n), 
                        !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && (this.isout = !0, 
                        this.isover = !1, this._deactivate.call(this, i)));
                    }), n;
                },
                dragStart: function(e, i) {
                    e.element.parentsUntil("body").bind("scroll.droppable", function() {
                        e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i);
                    });
                },
                drag: function(e, i) {
                    e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i), t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function() {
                        if (!this.options.disabled && !this.greedyChild && this.visible) {
                            var n, s, o, r = t.ui.intersect(e, this, this.options.tolerance), a = !r && this.isover ? "isout" : r && !this.isover ? "isover" : null;
                            a && (this.options.greedy && (s = this.options.scope, o = this.element.parents(":data(ui-droppable)").filter(function() {
                                return t.data(this, "ui-droppable").options.scope === s;
                            }), o.length && (n = t.data(o[0], "ui-droppable"), n.greedyChild = "isover" === a)), 
                            n && "isover" === a && (n.isover = !1, n.isout = !0, n._out.call(n, i)), this[a] = !0, 
                            this["isout" === a ? "isover" : "isout"] = !1, this["isover" === a ? "_over" : "_out"].call(this, i), 
                            n && "isout" === a && (n.isout = !1, n.isover = !0, n._over.call(n, i)));
                        }
                    });
                },
                dragStop: function(e, i) {
                    e.element.parentsUntil("body").unbind("scroll.droppable"), e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i);
                }
            };
        }(jQuery), function(t) {
            function e(t) {
                return parseInt(t, 10) || 0;
            }
            function i(t) {
                return !isNaN(parseInt(t, 10));
            }
            t.widget("ui.resizable", t.ui.mouse, {
                version: "1.10.4",
                widgetEventPrefix: "resize",
                options: {
                    alsoResize: !1,
                    animate: !1,
                    animateDuration: "slow",
                    animateEasing: "swing",
                    aspectRatio: !1,
                    autoHide: !1,
                    containment: !1,
                    ghost: !1,
                    grid: !1,
                    handles: "e,s,se",
                    helper: !1,
                    maxHeight: null,
                    maxWidth: null,
                    minHeight: 10,
                    minWidth: 10,
                    zIndex: 90,
                    resize: null,
                    start: null,
                    stop: null
                },
                _create: function() {
                    var e, i, n, s, o, r = this, a = this.options;
                    if (this.element.addClass("ui-resizable"), t.extend(this, {
                        _aspectRatio: !!a.aspectRatio,
                        aspectRatio: a.aspectRatio,
                        originalElement: this.element,
                        _proportionallyResizeElements: [],
                        _helper: a.helper || a.ghost || a.animate ? a.helper || "ui-resizable-helper" : null
                    }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                        position: this.element.css("position"),
                        width: this.element.outerWidth(),
                        height: this.element.outerHeight(),
                        top: this.element.css("top"),
                        left: this.element.css("left")
                    })), this.element = this.element.parent().data("ui-resizable", this.element.data("ui-resizable")), 
                    this.elementIsWrapper = !0, this.element.css({
                        marginLeft: this.originalElement.css("marginLeft"),
                        marginTop: this.originalElement.css("marginTop"),
                        marginRight: this.originalElement.css("marginRight"),
                        marginBottom: this.originalElement.css("marginBottom")
                    }), this.originalElement.css({
                        marginLeft: 0,
                        marginTop: 0,
                        marginRight: 0,
                        marginBottom: 0
                    }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), 
                    this._proportionallyResizeElements.push(this.originalElement.css({
                        position: "static",
                        zoom: 1,
                        display: "block"
                    })), this.originalElement.css({
                        margin: this.originalElement.css("margin")
                    }), this._proportionallyResize()), this.handles = a.handles || (t(".ui-resizable-handle", this.element).length ? {
                        n: ".ui-resizable-n",
                        e: ".ui-resizable-e",
                        s: ".ui-resizable-s",
                        w: ".ui-resizable-w",
                        se: ".ui-resizable-se",
                        sw: ".ui-resizable-sw",
                        ne: ".ui-resizable-ne",
                        nw: ".ui-resizable-nw"
                    } : "e,s,se"), this.handles.constructor === String) for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), 
                    e = this.handles.split(","), this.handles = {}, i = 0; e.length > i; i++) n = t.trim(e[i]), 
                    o = "ui-resizable-" + n, s = t("<div class='ui-resizable-handle " + o + "'></div>"), 
                    s.css({
                        zIndex: a.zIndex
                    }), "se" === n && s.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[n] = ".ui-resizable-" + n, 
                    this.element.append(s);
                    this._renderAxis = function(e) {
                        var i, n, s, o;
                        e = e || this.element;
                        for (i in this.handles) this.handles[i].constructor === String && (this.handles[i] = t(this.handles[i], this.element).show()), 
                        this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (n = t(this.handles[i], this.element), 
                        o = /sw|ne|nw|se|n|s/.test(i) ? n.outerHeight() : n.outerWidth(), s = [ "padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left" ].join(""), 
                        e.css(s, o), this._proportionallyResize()), t(this.handles[i]).length;
                    }, this._renderAxis(this.element), this._handles = t(".ui-resizable-handle", this.element).disableSelection(), 
                    this._handles.mouseover(function() {
                        r.resizing || (this.className && (s = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), 
                        r.axis = s && s[1] ? s[1] : "se");
                    }), a.autoHide && (this._handles.hide(), t(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
                        a.disabled || (t(this).removeClass("ui-resizable-autohide"), r._handles.show());
                    }).mouseleave(function() {
                        a.disabled || r.resizing || (t(this).addClass("ui-resizable-autohide"), r._handles.hide());
                    })), this._mouseInit();
                },
                _destroy: function() {
                    this._mouseDestroy();
                    var e, i = function(e) {
                        t(e).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove();
                    };
                    return this.elementIsWrapper && (i(this.element), e = this.element, this.originalElement.css({
                        position: e.css("position"),
                        width: e.outerWidth(),
                        height: e.outerHeight(),
                        top: e.css("top"),
                        left: e.css("left")
                    }).insertAfter(e), e.remove()), this.originalElement.css("resize", this.originalResizeStyle), 
                    i(this.originalElement), this;
                },
                _mouseCapture: function(e) {
                    var i, n, s = !1;
                    for (i in this.handles) n = t(this.handles[i])[0], (n === e.target || t.contains(n, e.target)) && (s = !0);
                    return !this.options.disabled && s;
                },
                _mouseStart: function(i) {
                    var n, s, o, r = this.options, a = this.element.position(), l = this.element;
                    return this.resizing = !0, /absolute/.test(l.css("position")) ? l.css({
                        position: "absolute",
                        top: l.css("top"),
                        left: l.css("left")
                    }) : l.is(".ui-draggable") && l.css({
                        position: "absolute",
                        top: a.top,
                        left: a.left
                    }), this._renderProxy(), n = e(this.helper.css("left")), s = e(this.helper.css("top")), 
                    r.containment && (n += t(r.containment).scrollLeft() || 0, s += t(r.containment).scrollTop() || 0), 
                    this.offset = this.helper.offset(), this.position = {
                        left: n,
                        top: s
                    }, this.size = this._helper ? {
                        width: this.helper.width(),
                        height: this.helper.height()
                    } : {
                        width: l.width(),
                        height: l.height()
                    }, this.originalSize = this._helper ? {
                        width: l.outerWidth(),
                        height: l.outerHeight()
                    } : {
                        width: l.width(),
                        height: l.height()
                    }, this.originalPosition = {
                        left: n,
                        top: s
                    }, this.sizeDiff = {
                        width: l.outerWidth() - l.width(),
                        height: l.outerHeight() - l.height()
                    }, this.originalMousePosition = {
                        left: i.pageX,
                        top: i.pageY
                    }, this.aspectRatio = "number" == typeof r.aspectRatio ? r.aspectRatio : this.originalSize.width / this.originalSize.height || 1, 
                    o = t(".ui-resizable-" + this.axis).css("cursor"), t("body").css("cursor", "auto" === o ? this.axis + "-resize" : o), 
                    l.addClass("ui-resizable-resizing"), this._propagate("start", i), !0;
                },
                _mouseDrag: function(e) {
                    var i, n = this.helper, s = {}, o = this.originalMousePosition, r = this.axis, a = this.position.top, l = this.position.left, h = this.size.width, c = this.size.height, u = e.pageX - o.left || 0, p = e.pageY - o.top || 0, d = this._change[r];
                    return d ? (i = d.apply(this, [ e, u, p ]), this._updateVirtualBoundaries(e.shiftKey), 
                    (this._aspectRatio || e.shiftKey) && (i = this._updateRatio(i, e)), i = this._respectSize(i, e), 
                    this._updateCache(i), this._propagate("resize", e), this.position.top !== a && (s.top = this.position.top + "px"), 
                    this.position.left !== l && (s.left = this.position.left + "px"), this.size.width !== h && (s.width = this.size.width + "px"), 
                    this.size.height !== c && (s.height = this.size.height + "px"), n.css(s), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), 
                    t.isEmptyObject(s) || this._trigger("resize", e, this.ui()), !1) : !1;
                },
                _mouseStop: function(e) {
                    this.resizing = !1;
                    var i, n, s, o, r, a, l, h = this.options, c = this;
                    return this._helper && (i = this._proportionallyResizeElements, n = i.length && /textarea/i.test(i[0].nodeName), 
                    s = n && t.ui.hasScroll(i[0], "left") ? 0 : c.sizeDiff.height, o = n ? 0 : c.sizeDiff.width, 
                    r = {
                        width: c.helper.width() - o,
                        height: c.helper.height() - s
                    }, a = parseInt(c.element.css("left"), 10) + (c.position.left - c.originalPosition.left) || null, 
                    l = parseInt(c.element.css("top"), 10) + (c.position.top - c.originalPosition.top) || null, 
                    h.animate || this.element.css(t.extend(r, {
                        top: l,
                        left: a
                    })), c.helper.height(c.size.height), c.helper.width(c.size.width), this._helper && !h.animate && this._proportionallyResize()), 
                    t("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), 
                    this._propagate("stop", e), this._helper && this.helper.remove(), !1;
                },
                _updateVirtualBoundaries: function(t) {
                    var e, n, s, o, r, a = this.options;
                    r = {
                        minWidth: i(a.minWidth) ? a.minWidth : 0,
                        maxWidth: i(a.maxWidth) ? a.maxWidth : 1 / 0,
                        minHeight: i(a.minHeight) ? a.minHeight : 0,
                        maxHeight: i(a.maxHeight) ? a.maxHeight : 1 / 0
                    }, (this._aspectRatio || t) && (e = r.minHeight * this.aspectRatio, s = r.minWidth / this.aspectRatio, 
                    n = r.maxHeight * this.aspectRatio, o = r.maxWidth / this.aspectRatio, e > r.minWidth && (r.minWidth = e), 
                    s > r.minHeight && (r.minHeight = s), r.maxWidth > n && (r.maxWidth = n), r.maxHeight > o && (r.maxHeight = o)), 
                    this._vBoundaries = r;
                },
                _updateCache: function(t) {
                    this.offset = this.helper.offset(), i(t.left) && (this.position.left = t.left), 
                    i(t.top) && (this.position.top = t.top), i(t.height) && (this.size.height = t.height), 
                    i(t.width) && (this.size.width = t.width);
                },
                _updateRatio: function(t) {
                    var e = this.position, n = this.size, s = this.axis;
                    return i(t.height) ? t.width = t.height * this.aspectRatio : i(t.width) && (t.height = t.width / this.aspectRatio), 
                    "sw" === s && (t.left = e.left + (n.width - t.width), t.top = null), "nw" === s && (t.top = e.top + (n.height - t.height), 
                    t.left = e.left + (n.width - t.width)), t;
                },
                _respectSize: function(t) {
                    var e = this._vBoundaries, n = this.axis, s = i(t.width) && e.maxWidth && e.maxWidth < t.width, o = i(t.height) && e.maxHeight && e.maxHeight < t.height, r = i(t.width) && e.minWidth && e.minWidth > t.width, a = i(t.height) && e.minHeight && e.minHeight > t.height, l = this.originalPosition.left + this.originalSize.width, h = this.position.top + this.size.height, c = /sw|nw|w/.test(n), u = /nw|ne|n/.test(n);
                    return r && (t.width = e.minWidth), a && (t.height = e.minHeight), s && (t.width = e.maxWidth), 
                    o && (t.height = e.maxHeight), r && c && (t.left = l - e.minWidth), s && c && (t.left = l - e.maxWidth), 
                    a && u && (t.top = h - e.minHeight), o && u && (t.top = h - e.maxHeight), t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : t.top = null, 
                    t;
                },
                _proportionallyResize: function() {
                    if (this._proportionallyResizeElements.length) {
                        var t, e, i, n, s, o = this.helper || this.element;
                        for (t = 0; this._proportionallyResizeElements.length > t; t++) {
                            if (s = this._proportionallyResizeElements[t], !this.borderDif) for (this.borderDif = [], 
                            i = [ s.css("borderTopWidth"), s.css("borderRightWidth"), s.css("borderBottomWidth"), s.css("borderLeftWidth") ], 
                            n = [ s.css("paddingTop"), s.css("paddingRight"), s.css("paddingBottom"), s.css("paddingLeft") ], 
                            e = 0; i.length > e; e++) this.borderDif[e] = (parseInt(i[e], 10) || 0) + (parseInt(n[e], 10) || 0);
                            s.css({
                                height: o.height() - this.borderDif[0] - this.borderDif[2] || 0,
                                width: o.width() - this.borderDif[1] - this.borderDif[3] || 0
                            });
                        }
                    }
                },
                _renderProxy: function() {
                    var e = this.element, i = this.options;
                    this.elementOffset = e.offset(), this._helper ? (this.helper = this.helper || t("<div style='overflow:hidden;'></div>"), 
                    this.helper.addClass(this._helper).css({
                        width: this.element.outerWidth() - 1,
                        height: this.element.outerHeight() - 1,
                        position: "absolute",
                        left: this.elementOffset.left + "px",
                        top: this.elementOffset.top + "px",
                        zIndex: ++i.zIndex
                    }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element;
                },
                _change: {
                    e: function(t, e) {
                        return {
                            width: this.originalSize.width + e
                        };
                    },
                    w: function(t, e) {
                        var i = this.originalSize, n = this.originalPosition;
                        return {
                            left: n.left + e,
                            width: i.width - e
                        };
                    },
                    n: function(t, e, i) {
                        var n = this.originalSize, s = this.originalPosition;
                        return {
                            top: s.top + i,
                            height: n.height - i
                        };
                    },
                    s: function(t, e, i) {
                        return {
                            height: this.originalSize.height + i
                        };
                    },
                    se: function(e, i, n) {
                        return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [ e, i, n ]));
                    },
                    sw: function(e, i, n) {
                        return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [ e, i, n ]));
                    },
                    ne: function(e, i, n) {
                        return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [ e, i, n ]));
                    },
                    nw: function(e, i, n) {
                        return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [ e, i, n ]));
                    }
                },
                _propagate: function(e, i) {
                    t.ui.plugin.call(this, e, [ i, this.ui() ]), "resize" !== e && this._trigger(e, i, this.ui());
                },
                plugins: {},
                ui: function() {
                    return {
                        originalElement: this.originalElement,
                        element: this.element,
                        helper: this.helper,
                        position: this.position,
                        size: this.size,
                        originalSize: this.originalSize,
                        originalPosition: this.originalPosition
                    };
                }
            }), t.ui.plugin.add("resizable", "animate", {
                stop: function(e) {
                    var i = t(this).data("ui-resizable"), n = i.options, s = i._proportionallyResizeElements, o = s.length && /textarea/i.test(s[0].nodeName), r = o && t.ui.hasScroll(s[0], "left") ? 0 : i.sizeDiff.height, a = o ? 0 : i.sizeDiff.width, l = {
                        width: i.size.width - a,
                        height: i.size.height - r
                    }, h = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null, c = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
                    i.element.animate(t.extend(l, c && h ? {
                        top: c,
                        left: h
                    } : {}), {
                        duration: n.animateDuration,
                        easing: n.animateEasing,
                        step: function() {
                            var n = {
                                width: parseInt(i.element.css("width"), 10),
                                height: parseInt(i.element.css("height"), 10),
                                top: parseInt(i.element.css("top"), 10),
                                left: parseInt(i.element.css("left"), 10)
                            };
                            s && s.length && t(s[0]).css({
                                width: n.width,
                                height: n.height
                            }), i._updateCache(n), i._propagate("resize", e);
                        }
                    });
                }
            }), t.ui.plugin.add("resizable", "containment", {
                start: function() {
                    var i, n, s, o, r, a, l, h = t(this).data("ui-resizable"), c = h.options, u = h.element, p = c.containment, d = p instanceof t ? p.get(0) : /parent/.test(p) ? u.parent().get(0) : p;
                    d && (h.containerElement = t(d), /document/.test(p) || p === document ? (h.containerOffset = {
                        left: 0,
                        top: 0
                    }, h.containerPosition = {
                        left: 0,
                        top: 0
                    }, h.parentData = {
                        element: t(document),
                        left: 0,
                        top: 0,
                        width: t(document).width(),
                        height: t(document).height() || document.body.parentNode.scrollHeight
                    }) : (i = t(d), n = [], t([ "Top", "Right", "Left", "Bottom" ]).each(function(t, s) {
                        n[t] = e(i.css("padding" + s));
                    }), h.containerOffset = i.offset(), h.containerPosition = i.position(), h.containerSize = {
                        height: i.innerHeight() - n[3],
                        width: i.innerWidth() - n[1]
                    }, s = h.containerOffset, o = h.containerSize.height, r = h.containerSize.width, 
                    a = t.ui.hasScroll(d, "left") ? d.scrollWidth : r, l = t.ui.hasScroll(d) ? d.scrollHeight : o, 
                    h.parentData = {
                        element: d,
                        left: s.left,
                        top: s.top,
                        width: a,
                        height: l
                    }));
                },
                resize: function(e) {
                    var i, n, s, o, r = t(this).data("ui-resizable"), a = r.options, l = r.containerOffset, h = r.position, c = r._aspectRatio || e.shiftKey, u = {
                        top: 0,
                        left: 0
                    }, p = r.containerElement;
                    p[0] !== document && /static/.test(p.css("position")) && (u = l), h.left < (r._helper ? l.left : 0) && (r.size.width = r.size.width + (r._helper ? r.position.left - l.left : r.position.left - u.left), 
                    c && (r.size.height = r.size.width / r.aspectRatio), r.position.left = a.helper ? l.left : 0), 
                    h.top < (r._helper ? l.top : 0) && (r.size.height = r.size.height + (r._helper ? r.position.top - l.top : r.position.top), 
                    c && (r.size.width = r.size.height * r.aspectRatio), r.position.top = r._helper ? l.top : 0), 
                    r.offset.left = r.parentData.left + r.position.left, r.offset.top = r.parentData.top + r.position.top, 
                    i = Math.abs((r._helper ? r.offset.left - u.left : r.offset.left - u.left) + r.sizeDiff.width), 
                    n = Math.abs((r._helper ? r.offset.top - u.top : r.offset.top - l.top) + r.sizeDiff.height), 
                    s = r.containerElement.get(0) === r.element.parent().get(0), o = /relative|absolute/.test(r.containerElement.css("position")), 
                    s && o && (i -= Math.abs(r.parentData.left)), i + r.size.width >= r.parentData.width && (r.size.width = r.parentData.width - i, 
                    c && (r.size.height = r.size.width / r.aspectRatio)), n + r.size.height >= r.parentData.height && (r.size.height = r.parentData.height - n, 
                    c && (r.size.width = r.size.height * r.aspectRatio));
                },
                stop: function() {
                    var e = t(this).data("ui-resizable"), i = e.options, n = e.containerOffset, s = e.containerPosition, o = e.containerElement, r = t(e.helper), a = r.offset(), l = r.outerWidth() - e.sizeDiff.width, h = r.outerHeight() - e.sizeDiff.height;
                    e._helper && !i.animate && /relative/.test(o.css("position")) && t(this).css({
                        left: a.left - s.left - n.left,
                        width: l,
                        height: h
                    }), e._helper && !i.animate && /static/.test(o.css("position")) && t(this).css({
                        left: a.left - s.left - n.left,
                        width: l,
                        height: h
                    });
                }
            }), t.ui.plugin.add("resizable", "alsoResize", {
                start: function() {
                    var e = t(this).data("ui-resizable"), i = e.options, n = function(e) {
                        t(e).each(function() {
                            var e = t(this);
                            e.data("ui-resizable-alsoresize", {
                                width: parseInt(e.width(), 10),
                                height: parseInt(e.height(), 10),
                                left: parseInt(e.css("left"), 10),
                                top: parseInt(e.css("top"), 10)
                            });
                        });
                    };
                    "object" != typeof i.alsoResize || i.alsoResize.parentNode ? n(i.alsoResize) : i.alsoResize.length ? (i.alsoResize = i.alsoResize[0], 
                    n(i.alsoResize)) : t.each(i.alsoResize, function(t) {
                        n(t);
                    });
                },
                resize: function(e, i) {
                    var n = t(this).data("ui-resizable"), s = n.options, o = n.originalSize, r = n.originalPosition, a = {
                        height: n.size.height - o.height || 0,
                        width: n.size.width - o.width || 0,
                        top: n.position.top - r.top || 0,
                        left: n.position.left - r.left || 0
                    }, l = function(e, n) {
                        t(e).each(function() {
                            var e = t(this), s = t(this).data("ui-resizable-alsoresize"), o = {}, r = n && n.length ? n : e.parents(i.originalElement[0]).length ? [ "width", "height" ] : [ "width", "height", "top", "left" ];
                            t.each(r, function(t, e) {
                                var i = (s[e] || 0) + (a[e] || 0);
                                i && i >= 0 && (o[e] = i || null);
                            }), e.css(o);
                        });
                    };
                    "object" != typeof s.alsoResize || s.alsoResize.nodeType ? l(s.alsoResize) : t.each(s.alsoResize, function(t, e) {
                        l(t, e);
                    });
                },
                stop: function() {
                    t(this).removeData("resizable-alsoresize");
                }
            }), t.ui.plugin.add("resizable", "ghost", {
                start: function() {
                    var e = t(this).data("ui-resizable"), i = e.options, n = e.size;
                    e.ghost = e.originalElement.clone(), e.ghost.css({
                        opacity: .25,
                        display: "block",
                        position: "relative",
                        height: n.height,
                        width: n.width,
                        margin: 0,
                        left: 0,
                        top: 0
                    }).addClass("ui-resizable-ghost").addClass("string" == typeof i.ghost ? i.ghost : ""), 
                    e.ghost.appendTo(e.helper);
                },
                resize: function() {
                    var e = t(this).data("ui-resizable");
                    e.ghost && e.ghost.css({
                        position: "relative",
                        height: e.size.height,
                        width: e.size.width
                    });
                },
                stop: function() {
                    var e = t(this).data("ui-resizable");
                    e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0));
                }
            }), t.ui.plugin.add("resizable", "grid", {
                resize: function() {
                    var e = t(this).data("ui-resizable"), i = e.options, n = e.size, s = e.originalSize, o = e.originalPosition, r = e.axis, a = "number" == typeof i.grid ? [ i.grid, i.grid ] : i.grid, l = a[0] || 1, h = a[1] || 1, c = Math.round((n.width - s.width) / l) * l, u = Math.round((n.height - s.height) / h) * h, p = s.width + c, d = s.height + u, f = i.maxWidth && p > i.maxWidth, g = i.maxHeight && d > i.maxHeight, m = i.minWidth && i.minWidth > p, v = i.minHeight && i.minHeight > d;
                    i.grid = a, m && (p += l), v && (d += h), f && (p -= l), g && (d -= h), /^(se|s|e)$/.test(r) ? (e.size.width = p, 
                    e.size.height = d) : /^(ne)$/.test(r) ? (e.size.width = p, e.size.height = d, e.position.top = o.top - u) : /^(sw)$/.test(r) ? (e.size.width = p, 
                    e.size.height = d, e.position.left = o.left - c) : (d - h > 0 ? (e.size.height = d, 
                    e.position.top = o.top - u) : (e.size.height = h, e.position.top = o.top + s.height - h), 
                    p - l > 0 ? (e.size.width = p, e.position.left = o.left - c) : (e.size.width = l, 
                    e.position.left = o.left + s.width - l));
                }
            });
        }(jQuery), function(t) {
            t.widget("ui.selectable", t.ui.mouse, {
                version: "1.10.4",
                options: {
                    appendTo: "body",
                    autoRefresh: !0,
                    distance: 0,
                    filter: "*",
                    tolerance: "touch",
                    selected: null,
                    selecting: null,
                    start: null,
                    stop: null,
                    unselected: null,
                    unselecting: null
                },
                _create: function() {
                    var e, i = this;
                    this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function() {
                        e = t(i.options.filter, i.element[0]), e.addClass("ui-selectee"), e.each(function() {
                            var e = t(this), i = e.offset();
                            t.data(this, "selectable-item", {
                                element: this,
                                $element: e,
                                left: i.left,
                                top: i.top,
                                right: i.left + e.outerWidth(),
                                bottom: i.top + e.outerHeight(),
                                startselected: !1,
                                selected: e.hasClass("ui-selected"),
                                selecting: e.hasClass("ui-selecting"),
                                unselecting: e.hasClass("ui-unselecting")
                            });
                        });
                    }, this.refresh(), this.selectees = e.addClass("ui-selectee"), this._mouseInit(), 
                    this.helper = t("<div class='ui-selectable-helper'></div>");
                },
                _destroy: function() {
                    this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), 
                    this._mouseDestroy();
                },
                _mouseStart: function(e) {
                    var i = this, n = this.options;
                    this.opos = [ e.pageX, e.pageY ], this.options.disabled || (this.selectees = t(n.filter, this.element[0]), 
                    this._trigger("start", e), t(n.appendTo).append(this.helper), this.helper.css({
                        left: e.pageX,
                        top: e.pageY,
                        width: 0,
                        height: 0
                    }), n.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
                        var n = t.data(this, "selectable-item");
                        n.startselected = !0, e.metaKey || e.ctrlKey || (n.$element.removeClass("ui-selected"), 
                        n.selected = !1, n.$element.addClass("ui-unselecting"), n.unselecting = !0, i._trigger("unselecting", e, {
                            unselecting: n.element
                        }));
                    }), t(e.target).parents().addBack().each(function() {
                        var n, s = t.data(this, "selectable-item");
                        return s ? (n = !e.metaKey && !e.ctrlKey || !s.$element.hasClass("ui-selected"), 
                        s.$element.removeClass(n ? "ui-unselecting" : "ui-selected").addClass(n ? "ui-selecting" : "ui-unselecting"), 
                        s.unselecting = !n, s.selecting = n, s.selected = n, n ? i._trigger("selecting", e, {
                            selecting: s.element
                        }) : i._trigger("unselecting", e, {
                            unselecting: s.element
                        }), !1) : void 0;
                    }));
                },
                _mouseDrag: function(e) {
                    if (this.dragged = !0, !this.options.disabled) {
                        var i, n = this, s = this.options, o = this.opos[0], r = this.opos[1], a = e.pageX, l = e.pageY;
                        return o > a && (i = a, a = o, o = i), r > l && (i = l, l = r, r = i), this.helper.css({
                            left: o,
                            top: r,
                            width: a - o,
                            height: l - r
                        }), this.selectees.each(function() {
                            var i = t.data(this, "selectable-item"), h = !1;
                            i && i.element !== n.element[0] && ("touch" === s.tolerance ? h = !(i.left > a || o > i.right || i.top > l || r > i.bottom) : "fit" === s.tolerance && (h = i.left > o && a > i.right && i.top > r && l > i.bottom), 
                            h ? (i.selected && (i.$element.removeClass("ui-selected"), i.selected = !1), i.unselecting && (i.$element.removeClass("ui-unselecting"), 
                            i.unselecting = !1), i.selecting || (i.$element.addClass("ui-selecting"), i.selecting = !0, 
                            n._trigger("selecting", e, {
                                selecting: i.element
                            }))) : (i.selecting && ((e.metaKey || e.ctrlKey) && i.startselected ? (i.$element.removeClass("ui-selecting"), 
                            i.selecting = !1, i.$element.addClass("ui-selected"), i.selected = !0) : (i.$element.removeClass("ui-selecting"), 
                            i.selecting = !1, i.startselected && (i.$element.addClass("ui-unselecting"), i.unselecting = !0), 
                            n._trigger("unselecting", e, {
                                unselecting: i.element
                            }))), i.selected && (e.metaKey || e.ctrlKey || i.startselected || (i.$element.removeClass("ui-selected"), 
                            i.selected = !1, i.$element.addClass("ui-unselecting"), i.unselecting = !0, n._trigger("unselecting", e, {
                                unselecting: i.element
                            })))));
                        }), !1;
                    }
                },
                _mouseStop: function(e) {
                    var i = this;
                    return this.dragged = !1, t(".ui-unselecting", this.element[0]).each(function() {
                        var n = t.data(this, "selectable-item");
                        n.$element.removeClass("ui-unselecting"), n.unselecting = !1, n.startselected = !1, 
                        i._trigger("unselected", e, {
                            unselected: n.element
                        });
                    }), t(".ui-selecting", this.element[0]).each(function() {
                        var n = t.data(this, "selectable-item");
                        n.$element.removeClass("ui-selecting").addClass("ui-selected"), n.selecting = !1, 
                        n.selected = !0, n.startselected = !0, i._trigger("selected", e, {
                            selected: n.element
                        });
                    }), this._trigger("stop", e), this.helper.remove(), !1;
                }
            });
        }(jQuery), function(t) {
            function e(t, e, i) {
                return t > e && e + i > t;
            }
            function i(t) {
                return /left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display"));
            }
            t.widget("ui.sortable", t.ui.mouse, {
                version: "1.10.4",
                widgetEventPrefix: "sort",
                ready: !1,
                options: {
                    appendTo: "parent",
                    axis: !1,
                    connectWith: !1,
                    containment: !1,
                    cursor: "auto",
                    cursorAt: !1,
                    dropOnEmpty: !0,
                    forcePlaceholderSize: !1,
                    forceHelperSize: !1,
                    grid: !1,
                    handle: !1,
                    helper: "original",
                    items: "> *",
                    opacity: !1,
                    placeholder: !1,
                    revert: !1,
                    scroll: !0,
                    scrollSensitivity: 20,
                    scrollSpeed: 20,
                    scope: "default",
                    tolerance: "intersect",
                    zIndex: 1e3,
                    activate: null,
                    beforeStop: null,
                    change: null,
                    deactivate: null,
                    out: null,
                    over: null,
                    receive: null,
                    remove: null,
                    sort: null,
                    start: null,
                    stop: null,
                    update: null
                },
                _create: function() {
                    var t = this.options;
                    this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), 
                    this.floating = this.items.length ? "x" === t.axis || i(this.items[0].item) : !1, 
                    this.offset = this.element.offset(), this._mouseInit(), this.ready = !0;
                },
                _destroy: function() {
                    this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
                    for (var t = this.items.length - 1; t >= 0; t--) this.items[t].item.removeData(this.widgetName + "-item");
                    return this;
                },
                _setOption: function(e, i) {
                    "disabled" === e ? (this.options[e] = i, this.widget().toggleClass("ui-sortable-disabled", !!i)) : t.Widget.prototype._setOption.apply(this, arguments);
                },
                _mouseCapture: function(e, i) {
                    var n = null, s = !1, o = this;
                    return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(e), 
                    t(e.target).parents().each(function() {
                        return t.data(this, o.widgetName + "-item") === o ? (n = t(this), !1) : void 0;
                    }), t.data(e.target, o.widgetName + "-item") === o && (n = t(e.target)), n ? !this.options.handle || i || (t(this.options.handle, n).find("*").addBack().each(function() {
                        this === e.target && (s = !0);
                    }), s) ? (this.currentItem = n, this._removeCurrentsFromItems(), !0) : !1 : !1);
                },
                _mouseStart: function(e, i, n) {
                    var s, o, r = this.options;
                    if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(e), 
                    this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), 
                    this.offset = this.currentItem.offset(), this.offset = {
                        top: this.offset.top - this.margins.top,
                        left: this.offset.left - this.margins.left
                    }, t.extend(this.offset, {
                        click: {
                            left: e.pageX - this.offset.left,
                            top: e.pageY - this.offset.top
                        },
                        parent: this._getParentOffset(),
                        relative: this._getRelativeOffset()
                    }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), 
                    this.originalPosition = this._generatePosition(e), this.originalPageX = e.pageX, 
                    this.originalPageY = e.pageY, r.cursorAt && this._adjustOffsetFromHelper(r.cursorAt), 
                    this.domPosition = {
                        prev: this.currentItem.prev()[0],
                        parent: this.currentItem.parent()[0]
                    }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), 
                    r.containment && this._setContainment(), r.cursor && "auto" !== r.cursor && (o = this.document.find("body"), 
                    this.storedCursor = o.css("cursor"), o.css("cursor", r.cursor), this.storedStylesheet = t("<style>*{ cursor: " + r.cursor + " !important; }</style>").appendTo(o)), 
                    r.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), 
                    this.helper.css("opacity", r.opacity)), r.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), 
                    this.helper.css("zIndex", r.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), 
                    this._trigger("start", e, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), 
                    !n) for (s = this.containers.length - 1; s >= 0; s--) this.containers[s]._trigger("activate", e, this._uiHash(this));
                    return t.ui.ddmanager && (t.ui.ddmanager.current = this), t.ui.ddmanager && !r.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), 
                    this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(e), 
                    !0;
                },
                _mouseDrag: function(e) {
                    var i, n, s, o, r = this.options, a = !1;
                    for (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), 
                    this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < r.scrollSensitivity ? this.scrollParent[0].scrollTop = a = this.scrollParent[0].scrollTop + r.scrollSpeed : e.pageY - this.overflowOffset.top < r.scrollSensitivity && (this.scrollParent[0].scrollTop = a = this.scrollParent[0].scrollTop - r.scrollSpeed), 
                    this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < r.scrollSensitivity ? this.scrollParent[0].scrollLeft = a = this.scrollParent[0].scrollLeft + r.scrollSpeed : e.pageX - this.overflowOffset.left < r.scrollSensitivity && (this.scrollParent[0].scrollLeft = a = this.scrollParent[0].scrollLeft - r.scrollSpeed)) : (e.pageY - t(document).scrollTop() < r.scrollSensitivity ? a = t(document).scrollTop(t(document).scrollTop() - r.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < r.scrollSensitivity && (a = t(document).scrollTop(t(document).scrollTop() + r.scrollSpeed)), 
                    e.pageX - t(document).scrollLeft() < r.scrollSensitivity ? a = t(document).scrollLeft(t(document).scrollLeft() - r.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < r.scrollSensitivity && (a = t(document).scrollLeft(t(document).scrollLeft() + r.scrollSpeed))), 
                    a !== !1 && t.ui.ddmanager && !r.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)), 
                    this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), 
                    this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), 
                    i = this.items.length - 1; i >= 0; i--) if (n = this.items[i], s = n.item[0], o = this._intersectsWithPointer(n), 
                    o && n.instance === this.currentContainer && s !== this.currentItem[0] && this.placeholder[1 === o ? "next" : "prev"]()[0] !== s && !t.contains(this.placeholder[0], s) && ("semi-dynamic" === this.options.type ? !t.contains(this.element[0], s) : !0)) {
                        if (this.direction = 1 === o ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(n)) break;
                        this._rearrange(e, n), this._trigger("change", e, this._uiHash());
                        break;
                    }
                    return this._contactContainers(e), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), 
                    this._trigger("sort", e, this._uiHash()), this.lastPositionAbs = this.positionAbs, 
                    !1;
                },
                _mouseStop: function(e, i) {
                    if (e) {
                        if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), 
                        this.options.revert) {
                            var n = this, s = this.placeholder.offset(), o = this.options.axis, r = {};
                            o && "x" !== o || (r.left = s.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)), 
                            o && "y" !== o || (r.top = s.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)), 
                            this.reverting = !0, t(this.helper).animate(r, parseInt(this.options.revert, 10) || 500, function() {
                                n._clear(e);
                            });
                        } else this._clear(e, i);
                        return !1;
                    }
                },
                cancel: function() {
                    if (this.dragging) {
                        this._mouseUp({
                            target: null
                        }), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                        for (var e = this.containers.length - 1; e >= 0; e--) this.containers[e]._trigger("deactivate", null, this._uiHash(this)), 
                        this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)), 
                        this.containers[e].containerCache.over = 0);
                    }
                    return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), 
                    "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), 
                    t.extend(this, {
                        helper: null,
                        dragging: !1,
                        reverting: !1,
                        _noFinalSort: null
                    }), this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)), 
                    this;
                },
                serialize: function(e) {
                    var i = this._getItemsAsjQuery(e && e.connected), n = [];
                    return e = e || {}, t(i).each(function() {
                        var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/);
                        i && n.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]));
                    }), !n.length && e.key && n.push(e.key + "="), n.join("&");
                },
                toArray: function(e) {
                    var i = this._getItemsAsjQuery(e && e.connected), n = [];
                    return e = e || {}, i.each(function() {
                        n.push(t(e.item || this).attr(e.attribute || "id") || "");
                    }), n;
                },
                _intersectsWith: function(t) {
                    var e = this.positionAbs.left, i = e + this.helperProportions.width, n = this.positionAbs.top, s = n + this.helperProportions.height, o = t.left, r = o + t.width, a = t.top, l = a + t.height, h = this.offset.click.top, c = this.offset.click.left, u = "x" === this.options.axis || n + h > a && l > n + h, p = "y" === this.options.axis || e + c > o && r > e + c, d = u && p;
                    return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? d : e + this.helperProportions.width / 2 > o && r > i - this.helperProportions.width / 2 && n + this.helperProportions.height / 2 > a && l > s - this.helperProportions.height / 2;
                },
                _intersectsWithPointer: function(t) {
                    var i = "x" === this.options.axis || e(this.positionAbs.top + this.offset.click.top, t.top, t.height), n = "y" === this.options.axis || e(this.positionAbs.left + this.offset.click.left, t.left, t.width), s = i && n, o = this._getDragVerticalDirection(), r = this._getDragHorizontalDirection();
                    return s ? this.floating ? r && "right" === r || "down" === o ? 2 : 1 : o && ("down" === o ? 2 : 1) : !1;
                },
                _intersectsWithSides: function(t) {
                    var i = e(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height), n = e(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width), s = this._getDragVerticalDirection(), o = this._getDragHorizontalDirection();
                    return this.floating && o ? "right" === o && n || "left" === o && !n : s && ("down" === s && i || "up" === s && !i);
                },
                _getDragVerticalDirection: function() {
                    var t = this.positionAbs.top - this.lastPositionAbs.top;
                    return 0 !== t && (t > 0 ? "down" : "up");
                },
                _getDragHorizontalDirection: function() {
                    var t = this.positionAbs.left - this.lastPositionAbs.left;
                    return 0 !== t && (t > 0 ? "right" : "left");
                },
                refresh: function(t) {
                    return this._refreshItems(t), this.refreshPositions(), this;
                },
                _connectWith: function() {
                    var t = this.options;
                    return t.connectWith.constructor === String ? [ t.connectWith ] : t.connectWith;
                },
                _getItemsAsjQuery: function(e) {
                    function i() {
                        a.push(this);
                    }
                    var n, s, o, r, a = [], l = [], h = this._connectWith();
                    if (h && e) for (n = h.length - 1; n >= 0; n--) for (o = t(h[n]), s = o.length - 1; s >= 0; s--) r = t.data(o[s], this.widgetFullName), 
                    r && r !== this && !r.options.disabled && l.push([ t.isFunction(r.options.items) ? r.options.items.call(r.element) : t(r.options.items, r.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), r ]);
                    for (l.push([ t.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                        options: this.options,
                        item: this.currentItem
                    }) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this ]), 
                    n = l.length - 1; n >= 0; n--) l[n][0].each(i);
                    return t(a);
                },
                _removeCurrentsFromItems: function() {
                    var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
                    this.items = t.grep(this.items, function(t) {
                        for (var i = 0; e.length > i; i++) if (e[i] === t.item[0]) return !1;
                        return !0;
                    });
                },
                _refreshItems: function(e) {
                    this.items = [], this.containers = [ this ];
                    var i, n, s, o, r, a, l, h, c = this.items, u = [ [ t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, {
                        item: this.currentItem
                    }) : t(this.options.items, this.element), this ] ], p = this._connectWith();
                    if (p && this.ready) for (i = p.length - 1; i >= 0; i--) for (s = t(p[i]), n = s.length - 1; n >= 0; n--) o = t.data(s[n], this.widgetFullName), 
                    o && o !== this && !o.options.disabled && (u.push([ t.isFunction(o.options.items) ? o.options.items.call(o.element[0], e, {
                        item: this.currentItem
                    }) : t(o.options.items, o.element), o ]), this.containers.push(o));
                    for (i = u.length - 1; i >= 0; i--) for (r = u[i][1], a = u[i][0], n = 0, h = a.length; h > n; n++) l = t(a[n]), 
                    l.data(this.widgetName + "-item", r), c.push({
                        item: l,
                        instance: r,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    });
                },
                refreshPositions: function(e) {
                    this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
                    var i, n, s, o;
                    for (i = this.items.length - 1; i >= 0; i--) n = this.items[i], n.instance !== this.currentContainer && this.currentContainer && n.item[0] !== this.currentItem[0] || (s = this.options.toleranceElement ? t(this.options.toleranceElement, n.item) : n.item, 
                    e || (n.width = s.outerWidth(), n.height = s.outerHeight()), o = s.offset(), n.left = o.left, 
                    n.top = o.top);
                    if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this); else for (i = this.containers.length - 1; i >= 0; i--) o = this.containers[i].element.offset(), 
                    this.containers[i].containerCache.left = o.left, this.containers[i].containerCache.top = o.top, 
                    this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), 
                    this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
                    return this;
                },
                _createPlaceholder: function(e) {
                    e = e || this;
                    var i, n = e.options;
                    n.placeholder && n.placeholder.constructor !== String || (i = n.placeholder, n.placeholder = {
                        element: function() {
                            var n = e.currentItem[0].nodeName.toLowerCase(), s = t("<" + n + ">", e.document[0]).addClass(i || e.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                            return "tr" === n ? e.currentItem.children().each(function() {
                                t("<td>&#160;</td>", e.document[0]).attr("colspan", t(this).attr("colspan") || 1).appendTo(s);
                            }) : "img" === n && s.attr("src", e.currentItem.attr("src")), i || s.css("visibility", "hidden"), 
                            s;
                        },
                        update: function(t, s) {
                            (!i || n.forcePlaceholderSize) && (s.height() || s.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10)), 
                            s.width() || s.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10)));
                        }
                    }), e.placeholder = t(n.placeholder.element.call(e.element, e.currentItem)), e.currentItem.after(e.placeholder), 
                    n.placeholder.update(e, e.placeholder);
                },
                _contactContainers: function(n) {
                    var s, o, r, a, l, h, c, u, p, d, f = null, g = null;
                    for (s = this.containers.length - 1; s >= 0; s--) if (!t.contains(this.currentItem[0], this.containers[s].element[0])) if (this._intersectsWith(this.containers[s].containerCache)) {
                        if (f && t.contains(this.containers[s].element[0], f.element[0])) continue;
                        f = this.containers[s], g = s;
                    } else this.containers[s].containerCache.over && (this.containers[s]._trigger("out", n, this._uiHash(this)), 
                    this.containers[s].containerCache.over = 0);
                    if (f) if (1 === this.containers.length) this.containers[g].containerCache.over || (this.containers[g]._trigger("over", n, this._uiHash(this)), 
                    this.containers[g].containerCache.over = 1); else {
                        for (r = 1e4, a = null, d = f.floating || i(this.currentItem), l = d ? "left" : "top", 
                        h = d ? "width" : "height", c = this.positionAbs[l] + this.offset.click[l], o = this.items.length - 1; o >= 0; o--) t.contains(this.containers[g].element[0], this.items[o].item[0]) && this.items[o].item[0] !== this.currentItem[0] && (!d || e(this.positionAbs.top + this.offset.click.top, this.items[o].top, this.items[o].height)) && (u = this.items[o].item.offset()[l], 
                        p = !1, Math.abs(u - c) > Math.abs(u + this.items[o][h] - c) && (p = !0, u += this.items[o][h]), 
                        r > Math.abs(u - c) && (r = Math.abs(u - c), a = this.items[o], this.direction = p ? "up" : "down"));
                        if (!a && !this.options.dropOnEmpty) return;
                        if (this.currentContainer === this.containers[g]) return;
                        a ? this._rearrange(n, a, null, !0) : this._rearrange(n, null, this.containers[g].element, !0), 
                        this._trigger("change", n, this._uiHash()), this.containers[g]._trigger("change", n, this._uiHash(this)), 
                        this.currentContainer = this.containers[g], this.options.placeholder.update(this.currentContainer, this.placeholder), 
                        this.containers[g]._trigger("over", n, this._uiHash(this)), this.containers[g].containerCache.over = 1;
                    }
                },
                _createHelper: function(e) {
                    var i = this.options, n = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [ e, this.currentItem ])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;
                    return n.parents("body").length || t("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(n[0]), 
                    n[0] === this.currentItem[0] && (this._storedCSS = {
                        width: this.currentItem[0].style.width,
                        height: this.currentItem[0].style.height,
                        position: this.currentItem.css("position"),
                        top: this.currentItem.css("top"),
                        left: this.currentItem.css("left")
                    }), (!n[0].style.width || i.forceHelperSize) && n.width(this.currentItem.width()), 
                    (!n[0].style.height || i.forceHelperSize) && n.height(this.currentItem.height()), 
                    n;
                },
                _adjustOffsetFromHelper: function(e) {
                    "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                        left: +e[0],
                        top: +e[1] || 0
                    }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), 
                    "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top);
                },
                _getParentOffset: function() {
                    this.offsetParent = this.helper.offsetParent();
                    var e = this.offsetParent.offset();
                    return "absolute" === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), 
                    e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
                        top: 0,
                        left: 0
                    }), {
                        top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                        left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                    };
                },
                _getRelativeOffset: function() {
                    if ("relative" === this.cssPosition) {
                        var t = this.currentItem.position();
                        return {
                            top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                            left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                        };
                    }
                    return {
                        top: 0,
                        left: 0
                    };
                },
                _cacheMargins: function() {
                    this.margins = {
                        left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                        top: parseInt(this.currentItem.css("marginTop"), 10) || 0
                    };
                },
                _cacheHelperProportions: function() {
                    this.helperProportions = {
                        width: this.helper.outerWidth(),
                        height: this.helper.outerHeight()
                    };
                },
                _setContainment: function() {
                    var e, i, n, s = this.options;
                    "parent" === s.containment && (s.containment = this.helper[0].parentNode), ("document" === s.containment || "window" === s.containment) && (this.containment = [ 0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, t("document" === s.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (t("document" === s.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ]), 
                    /^(document|window|parent)$/.test(s.containment) || (e = t(s.containment)[0], i = t(s.containment).offset(), 
                    n = "hidden" !== t(e).css("overflow"), this.containment = [ i.left + (parseInt(t(e).css("borderLeftWidth"), 10) || 0) + (parseInt(t(e).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(t(e).css("borderTopWidth"), 10) || 0) + (parseInt(t(e).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (n ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(t(e).css("borderLeftWidth"), 10) || 0) - (parseInt(t(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (n ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(t(e).css("borderTopWidth"), 10) || 0) - (parseInt(t(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top ]);
                },
                _convertPositionTo: function(e, i) {
                    i || (i = this.position);
                    var n = "absolute" === e ? 1 : -1, s = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, o = /(html|body)/i.test(s[0].tagName);
                    return {
                        top: i.top + this.offset.relative.top * n + this.offset.parent.top * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : s.scrollTop()) * n,
                        left: i.left + this.offset.relative.left * n + this.offset.parent.left * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : s.scrollLeft()) * n
                    };
                },
                _generatePosition: function(e) {
                    var i, n, s = this.options, o = e.pageX, r = e.pageY, a = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, l = /(html|body)/i.test(a[0].tagName);
                    return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), 
                    this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (o = this.containment[0] + this.offset.click.left), 
                    e.pageY - this.offset.click.top < this.containment[1] && (r = this.containment[1] + this.offset.click.top), 
                    e.pageX - this.offset.click.left > this.containment[2] && (o = this.containment[2] + this.offset.click.left), 
                    e.pageY - this.offset.click.top > this.containment[3] && (r = this.containment[3] + this.offset.click.top)), 
                    s.grid && (i = this.originalPageY + Math.round((r - this.originalPageY) / s.grid[1]) * s.grid[1], 
                    r = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - s.grid[1] : i + s.grid[1] : i, 
                    n = this.originalPageX + Math.round((o - this.originalPageX) / s.grid[0]) * s.grid[0], 
                    o = this.containment ? n - this.offset.click.left >= this.containment[0] && n - this.offset.click.left <= this.containment[2] ? n : n - this.offset.click.left >= this.containment[0] ? n - s.grid[0] : n + s.grid[0] : n)), 
                    {
                        top: r - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : l ? 0 : a.scrollTop()),
                        left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : l ? 0 : a.scrollLeft())
                    };
                },
                _rearrange: function(t, e, i, n) {
                    i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling), 
                    this.counter = this.counter ? ++this.counter : 1;
                    var s = this.counter;
                    this._delay(function() {
                        s === this.counter && this.refreshPositions(!n);
                    });
                },
                _clear: function(t, e) {
                    function i(t, e, i) {
                        return function(n) {
                            i._trigger(t, n, e._uiHash(e));
                        };
                    }
                    this.reverting = !1;
                    var n, s = [];
                    if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), 
                    this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                        for (n in this._storedCSS) ("auto" === this._storedCSS[n] || "static" === this._storedCSS[n]) && (this._storedCSS[n] = "");
                        this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
                    } else this.currentItem.show();
                    for (this.fromOutside && !e && s.push(function(t) {
                        this._trigger("receive", t, this._uiHash(this.fromOutside));
                    }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || s.push(function(t) {
                        this._trigger("update", t, this._uiHash());
                    }), this !== this.currentContainer && (e || (s.push(function(t) {
                        this._trigger("remove", t, this._uiHash());
                    }), s.push(function(t) {
                        return function(e) {
                            t._trigger("receive", e, this._uiHash(this));
                        };
                    }.call(this, this.currentContainer)), s.push(function(t) {
                        return function(e) {
                            t._trigger("update", e, this._uiHash(this));
                        };
                    }.call(this, this.currentContainer)))), n = this.containers.length - 1; n >= 0; n--) e || s.push(i("deactivate", this, this.containers[n])), 
                    this.containers[n].containerCache.over && (s.push(i("out", this, this.containers[n])), 
                    this.containers[n].containerCache.over = 0);
                    if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), 
                    this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), 
                    this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), 
                    this.dragging = !1, this.cancelHelperRemoval) {
                        if (!e) {
                            for (this._trigger("beforeStop", t, this._uiHash()), n = 0; s.length > n; n++) s[n].call(this, t);
                            this._trigger("stop", t, this._uiHash());
                        }
                        return this.fromOutside = !1, !1;
                    }
                    if (e || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), 
                    this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, 
                    !e) {
                        for (n = 0; s.length > n; n++) s[n].call(this, t);
                        this._trigger("stop", t, this._uiHash());
                    }
                    return this.fromOutside = !1, !0;
                },
                _trigger: function() {
                    t.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel();
                },
                _uiHash: function(e) {
                    var i = e || this;
                    return {
                        helper: i.helper,
                        placeholder: i.placeholder || t([]),
                        position: i.position,
                        originalPosition: i.originalPosition,
                        offset: i.positionAbs,
                        item: i.currentItem,
                        sender: e ? e.element : null
                    };
                }
            });
        }(jQuery), function(t, e) {
            function i() {
                return ++s;
            }
            function n(t) {
                return t = t.cloneNode(!1), t.hash.length > 1 && decodeURIComponent(t.href.replace(o, "")) === decodeURIComponent(location.href.replace(o, ""));
            }
            var s = 0, o = /#.*$/;
            t.widget("ui.tabs", {
                version: "1.10.4",
                delay: 300,
                options: {
                    active: null,
                    collapsible: !1,
                    event: "click",
                    heightStyle: "content",
                    hide: null,
                    show: null,
                    activate: null,
                    beforeActivate: null,
                    beforeLoad: null,
                    load: null
                },
                _create: function() {
                    var e = this, i = this.options;
                    this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", i.collapsible).delegate(".ui-tabs-nav > li", "mousedown" + this.eventNamespace, function(e) {
                        t(this).is(".ui-state-disabled") && e.preventDefault();
                    }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
                        t(this).closest("li").is(".ui-state-disabled") && this.blur();
                    }), this._processTabs(), i.active = this._initialActive(), t.isArray(i.disabled) && (i.disabled = t.unique(i.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"), function(t) {
                        return e.tabs.index(t);
                    }))).sort()), this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(i.active) : t(), 
                    this._refresh(), this.active.length && this.load(i.active);
                },
                _initialActive: function() {
                    var i = this.options.active, n = this.options.collapsible, s = location.hash.substring(1);
                    return null === i && (s && this.tabs.each(function(n, o) {
                        return t(o).attr("aria-controls") === s ? (i = n, !1) : e;
                    }), null === i && (i = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === i || -1 === i) && (i = this.tabs.length ? 0 : !1)), 
                    i !== !1 && (i = this.tabs.index(this.tabs.eq(i)), -1 === i && (i = n ? !1 : 0)), 
                    !n && i === !1 && this.anchors.length && (i = 0), i;
                },
                _getCreateEventData: function() {
                    return {
                        tab: this.active,
                        panel: this.active.length ? this._getPanelForTab(this.active) : t()
                    };
                },
                _tabKeydown: function(i) {
                    var n = t(this.document[0].activeElement).closest("li"), s = this.tabs.index(n), o = !0;
                    if (!this._handlePageNav(i)) {
                        switch (i.keyCode) {
                          case t.ui.keyCode.RIGHT:
                          case t.ui.keyCode.DOWN:
                            s++;
                            break;

                          case t.ui.keyCode.UP:
                          case t.ui.keyCode.LEFT:
                            o = !1, s--;
                            break;

                          case t.ui.keyCode.END:
                            s = this.anchors.length - 1;
                            break;

                          case t.ui.keyCode.HOME:
                            s = 0;
                            break;

                          case t.ui.keyCode.SPACE:
                            return i.preventDefault(), clearTimeout(this.activating), this._activate(s), e;

                          case t.ui.keyCode.ENTER:
                            return i.preventDefault(), clearTimeout(this.activating), this._activate(s === this.options.active ? !1 : s), 
                            e;

                          default:
                            return;
                        }
                        i.preventDefault(), clearTimeout(this.activating), s = this._focusNextTab(s, o), 
                        i.ctrlKey || (n.attr("aria-selected", "false"), this.tabs.eq(s).attr("aria-selected", "true"), 
                        this.activating = this._delay(function() {
                            this.option("active", s);
                        }, this.delay));
                    }
                },
                _panelKeydown: function(e) {
                    this._handlePageNav(e) || e.ctrlKey && e.keyCode === t.ui.keyCode.UP && (e.preventDefault(), 
                    this.active.focus());
                },
                _handlePageNav: function(i) {
                    return i.altKey && i.keyCode === t.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), 
                    !0) : i.altKey && i.keyCode === t.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), 
                    !0) : e;
                },
                _findNextTab: function(e, i) {
                    function n() {
                        return e > s && (e = 0), 0 > e && (e = s), e;
                    }
                    for (var s = this.tabs.length - 1; -1 !== t.inArray(n(), this.options.disabled); ) e = i ? e + 1 : e - 1;
                    return e;
                },
                _focusNextTab: function(t, e) {
                    return t = this._findNextTab(t, e), this.tabs.eq(t).focus(), t;
                },
                _setOption: function(t, i) {
                    return "active" === t ? (this._activate(i), e) : "disabled" === t ? (this._setupDisabled(i), 
                    e) : (this._super(t, i), "collapsible" === t && (this.element.toggleClass("ui-tabs-collapsible", i), 
                    i || this.options.active !== !1 || this._activate(0)), "event" === t && this._setupEvents(i), 
                    "heightStyle" === t && this._setupHeightStyle(i), e);
                },
                _tabId: function(t) {
                    return t.attr("aria-controls") || "ui-tabs-" + i();
                },
                _sanitizeSelector: function(t) {
                    return t ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : "";
                },
                refresh: function() {
                    var e = this.options, i = this.tablist.children(":has(a[href])");
                    e.disabled = t.map(i.filter(".ui-state-disabled"), function(t) {
                        return i.index(t);
                    }), this._processTabs(), e.active !== !1 && this.anchors.length ? this.active.length && !t.contains(this.tablist[0], this.active[0]) ? this.tabs.length === e.disabled.length ? (e.active = !1, 
                    this.active = t()) : this._activate(this._findNextTab(Math.max(0, e.active - 1), !1)) : e.active = this.tabs.index(this.active) : (e.active = !1, 
                    this.active = t()), this._refresh();
                },
                _refresh: function() {
                    this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), 
                    this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
                        "aria-selected": "false",
                        tabIndex: -1
                    }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                        "aria-expanded": "false",
                        "aria-hidden": "true"
                    }), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
                        "aria-selected": "true",
                        tabIndex: 0
                    }), this._getPanelForTab(this.active).show().attr({
                        "aria-expanded": "true",
                        "aria-hidden": "false"
                    })) : this.tabs.eq(0).attr("tabIndex", 0);
                },
                _processTabs: function() {
                    var e = this;
                    this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist"), 
                    this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                        role: "tab",
                        tabIndex: -1
                    }), this.anchors = this.tabs.map(function() {
                        return t("a", this)[0];
                    }).addClass("ui-tabs-anchor").attr({
                        role: "presentation",
                        tabIndex: -1
                    }), this.panels = t(), this.anchors.each(function(i, s) {
                        var o, r, a, l = t(s).uniqueId().attr("id"), h = t(s).closest("li"), c = h.attr("aria-controls");
                        n(s) ? (o = s.hash, r = e.element.find(e._sanitizeSelector(o))) : (a = e._tabId(h), 
                        o = "#" + a, r = e.element.find(o), r.length || (r = e._createPanel(a), r.insertAfter(e.panels[i - 1] || e.tablist)), 
                        r.attr("aria-live", "polite")), r.length && (e.panels = e.panels.add(r)), c && h.data("ui-tabs-aria-controls", c), 
                        h.attr({
                            "aria-controls": o.substring(1),
                            "aria-labelledby": l
                        }), r.attr("aria-labelledby", l);
                    }), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel");
                },
                _getList: function() {
                    return this.tablist || this.element.find("ol,ul").eq(0);
                },
                _createPanel: function(e) {
                    return t("<div>").attr("id", e).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0);
                },
                _setupDisabled: function(e) {
                    t.isArray(e) && (e.length ? e.length === this.anchors.length && (e = !0) : e = !1);
                    for (var i, n = 0; i = this.tabs[n]; n++) e === !0 || -1 !== t.inArray(n, e) ? t(i).addClass("ui-state-disabled").attr("aria-disabled", "true") : t(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");
                    this.options.disabled = e;
                },
                _setupEvents: function(e) {
                    var i = {
                        click: function(t) {
                            t.preventDefault();
                        }
                    };
                    e && t.each(e.split(" "), function(t, e) {
                        i[e] = "_eventHandler";
                    }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(this.anchors, i), 
                    this._on(this.tabs, {
                        keydown: "_tabKeydown"
                    }), this._on(this.panels, {
                        keydown: "_panelKeydown"
                    }), this._focusable(this.tabs), this._hoverable(this.tabs);
                },
                _setupHeightStyle: function(e) {
                    var i, n = this.element.parent();
                    "fill" === e ? (i = n.height(), i -= this.element.outerHeight() - this.element.height(), 
                    this.element.siblings(":visible").each(function() {
                        var e = t(this), n = e.css("position");
                        "absolute" !== n && "fixed" !== n && (i -= e.outerHeight(!0));
                    }), this.element.children().not(this.panels).each(function() {
                        i -= t(this).outerHeight(!0);
                    }), this.panels.each(function() {
                        t(this).height(Math.max(0, i - t(this).innerHeight() + t(this).height()));
                    }).css("overflow", "auto")) : "auto" === e && (i = 0, this.panels.each(function() {
                        i = Math.max(i, t(this).height("").height());
                    }).height(i));
                },
                _eventHandler: function(e) {
                    var i = this.options, n = this.active, s = t(e.currentTarget), o = s.closest("li"), r = o[0] === n[0], a = r && i.collapsible, l = a ? t() : this._getPanelForTab(o), h = n.length ? this._getPanelForTab(n) : t(), c = {
                        oldTab: n,
                        oldPanel: h,
                        newTab: a ? t() : o,
                        newPanel: l
                    };
                    e.preventDefault(), o.hasClass("ui-state-disabled") || o.hasClass("ui-tabs-loading") || this.running || r && !i.collapsible || this._trigger("beforeActivate", e, c) === !1 || (i.active = a ? !1 : this.tabs.index(o), 
                    this.active = r ? t() : o, this.xhr && this.xhr.abort(), h.length || l.length || t.error("jQuery UI Tabs: Mismatching fragment identifier."), 
                    l.length && this.load(this.tabs.index(o), e), this._toggle(e, c));
                },
                _toggle: function(e, i) {
                    function n() {
                        o.running = !1, o._trigger("activate", e, i);
                    }
                    function s() {
                        i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), r.length && o.options.show ? o._show(r, o.options.show, n) : (r.show(), 
                        n());
                    }
                    var o = this, r = i.newPanel, a = i.oldPanel;
                    this.running = !0, a.length && this.options.hide ? this._hide(a, this.options.hide, function() {
                        i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), s();
                    }) : (i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), a.hide(), 
                    s()), a.attr({
                        "aria-expanded": "false",
                        "aria-hidden": "true"
                    }), i.oldTab.attr("aria-selected", "false"), r.length && a.length ? i.oldTab.attr("tabIndex", -1) : r.length && this.tabs.filter(function() {
                        return 0 === t(this).attr("tabIndex");
                    }).attr("tabIndex", -1), r.attr({
                        "aria-expanded": "true",
                        "aria-hidden": "false"
                    }), i.newTab.attr({
                        "aria-selected": "true",
                        tabIndex: 0
                    });
                },
                _activate: function(e) {
                    var i, n = this._findActive(e);
                    n[0] !== this.active[0] && (n.length || (n = this.active), i = n.find(".ui-tabs-anchor")[0], 
                    this._eventHandler({
                        target: i,
                        currentTarget: i,
                        preventDefault: t.noop
                    }));
                },
                _findActive: function(e) {
                    return e === !1 ? t() : this.tabs.eq(e);
                },
                _getIndex: function(t) {
                    return "string" == typeof t && (t = this.anchors.index(this.anchors.filter("[href$='" + t + "']"))), 
                    t;
                },
                _destroy: function() {
                    this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), 
                    this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), 
                    this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), 
                    this.tabs.add(this.panels).each(function() {
                        t.data(this, "ui-tabs-destroy") ? t(this).remove() : t(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role");
                    }), this.tabs.each(function() {
                        var e = t(this), i = e.data("ui-tabs-aria-controls");
                        i ? e.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : e.removeAttr("aria-controls");
                    }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "");
                },
                enable: function(i) {
                    var n = this.options.disabled;
                    n !== !1 && (i === e ? n = !1 : (i = this._getIndex(i), n = t.isArray(n) ? t.map(n, function(t) {
                        return t !== i ? t : null;
                    }) : t.map(this.tabs, function(t, e) {
                        return e !== i ? e : null;
                    })), this._setupDisabled(n));
                },
                disable: function(i) {
                    var n = this.options.disabled;
                    if (n !== !0) {
                        if (i === e) n = !0; else {
                            if (i = this._getIndex(i), -1 !== t.inArray(i, n)) return;
                            n = t.isArray(n) ? t.merge([ i ], n).sort() : [ i ];
                        }
                        this._setupDisabled(n);
                    }
                },
                load: function(e, i) {
                    e = this._getIndex(e);
                    var s = this, o = this.tabs.eq(e), r = o.find(".ui-tabs-anchor"), a = this._getPanelForTab(o), l = {
                        tab: o,
                        panel: a
                    };
                    n(r[0]) || (this.xhr = t.ajax(this._ajaxSettings(r, i, l)), this.xhr && "canceled" !== this.xhr.statusText && (o.addClass("ui-tabs-loading"), 
                    a.attr("aria-busy", "true"), this.xhr.success(function(t) {
                        setTimeout(function() {
                            a.html(t), s._trigger("load", i, l);
                        }, 1);
                    }).complete(function(t, e) {
                        setTimeout(function() {
                            "abort" === e && s.panels.stop(!1, !0), o.removeClass("ui-tabs-loading"), a.removeAttr("aria-busy"), 
                            t === s.xhr && delete s.xhr;
                        }, 1);
                    })));
                },
                _ajaxSettings: function(e, i, n) {
                    var s = this;
                    return {
                        url: e.attr("href"),
                        beforeSend: function(e, o) {
                            return s._trigger("beforeLoad", i, t.extend({
                                jqXHR: e,
                                ajaxSettings: o
                            }, n));
                        }
                    };
                },
                _getPanelForTab: function(e) {
                    var i = t(e).attr("aria-controls");
                    return this.element.find(this._sanitizeSelector("#" + i));
                }
            });
        }(jQuery);
    }, {} ],
    12: [ function(t, e) {
        e.exports = t("jquery");
    }, {
        jquery: 13
    } ],
    13: [ function(t, e) {
        !function(t, i) {
            "object" == typeof e && "object" == typeof e.exports ? e.exports = t.document ? i(t, !0) : function(t) {
                if (!t.document) throw new Error("jQuery requires a window with a document");
                return i(t);
            } : i(t);
        }("undefined" != typeof window ? window : this, function(t, e) {
            function i(t) {
                var e = t.length, i = Z.type(t);
                return "function" === i || Z.isWindow(t) ? !1 : 1 === t.nodeType && e ? !0 : "array" === i || 0 === e || "number" == typeof e && e > 0 && e - 1 in t;
            }
            function n(t, e, i) {
                if (Z.isFunction(e)) return Z.grep(t, function(t, n) {
                    return !!e.call(t, n, t) !== i;
                });
                if (e.nodeType) return Z.grep(t, function(t) {
                    return t === e !== i;
                });
                if ("string" == typeof e) {
                    if (ae.test(e)) return Z.filter(e, t, i);
                    e = Z.filter(e, t);
                }
                return Z.grep(t, function(t) {
                    return U.call(e, t) >= 0 !== i;
                });
            }
            function s(t, e) {
                for (;(t = t[e]) && 1 !== t.nodeType; ) ;
                return t;
            }
            function o(t) {
                var e = fe[t] = {};
                return Z.each(t.match(de) || [], function(t, i) {
                    e[i] = !0;
                }), e;
            }
            function r() {
                K.removeEventListener("DOMContentLoaded", r, !1), t.removeEventListener("load", r, !1), 
                Z.ready();
            }
            function a() {
                Object.defineProperty(this.cache = {}, 0, {
                    get: function() {
                        return {};
                    }
                }), this.expando = Z.expando + a.uid++;
            }
            function l(t, e, i) {
                var n;
                if (void 0 === i && 1 === t.nodeType) if (n = "data-" + e.replace(we, "-$1").toLowerCase(), 
                i = t.getAttribute(n), "string" == typeof i) {
                    try {
                        i = "true" === i ? !0 : "false" === i ? !1 : "null" === i ? null : +i + "" === i ? +i : ye.test(i) ? Z.parseJSON(i) : i;
                    } catch (s) {}
                    be.set(t, e, i);
                } else i = void 0;
                return i;
            }
            function h() {
                return !0;
            }
            function c() {
                return !1;
            }
            function u() {
                try {
                    return K.activeElement;
                } catch (t) {}
            }
            function p(t, e) {
                return Z.nodeName(t, "table") && Z.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t;
            }
            function d(t) {
                return t.type = (null !== t.getAttribute("type")) + "/" + t.type, t;
            }
            function f(t) {
                var e = je.exec(t.type);
                return e ? t.type = e[1] : t.removeAttribute("type"), t;
            }
            function g(t, e) {
                for (var i = 0, n = t.length; n > i; i++) ve.set(t[i], "globalEval", !e || ve.get(e[i], "globalEval"));
            }
            function m(t, e) {
                var i, n, s, o, r, a, l, h;
                if (1 === e.nodeType) {
                    if (ve.hasData(t) && (o = ve.access(t), r = ve.set(e, o), h = o.events)) {
                        delete r.handle, r.events = {};
                        for (s in h) for (i = 0, n = h[s].length; n > i; i++) Z.event.add(e, s, h[s][i]);
                    }
                    be.hasData(t) && (a = be.access(t), l = Z.extend({}, a), be.set(e, l));
                }
            }
            function v(t, e) {
                var i = t.getElementsByTagName ? t.getElementsByTagName(e || "*") : t.querySelectorAll ? t.querySelectorAll(e || "*") : [];
                return void 0 === e || e && Z.nodeName(t, e) ? Z.merge([ t ], i) : i;
            }
            function b(t, e) {
                var i = e.nodeName.toLowerCase();
                "input" === i && Te.test(t.type) ? e.checked = t.checked : ("input" === i || "textarea" === i) && (e.defaultValue = t.defaultValue);
            }
            function y(e, i) {
                var n, s = Z(i.createElement(e)).appendTo(i.body), o = t.getDefaultComputedStyle && (n = t.getDefaultComputedStyle(s[0])) ? n.display : Z.css(s[0], "display");
                return s.detach(), o;
            }
            function w(t) {
                var e = K, i = Me[t];
                return i || (i = y(t, e), "none" !== i && i || (Re = (Re || Z("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement), 
                e = Re[0].contentDocument, e.write(), e.close(), i = y(t, e), Re.detach()), Me[t] = i), 
                i;
            }
            function x(t, e, i) {
                var n, s, o, r, a = t.style;
                return i = i || Be(t), i && (r = i.getPropertyValue(e) || i[e]), i && ("" !== r || Z.contains(t.ownerDocument, t) || (r = Z.style(t, e)), 
                Fe.test(r) && qe.test(e) && (n = a.width, s = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = r, 
                r = i.width, a.width = n, a.minWidth = s, a.maxWidth = o)), void 0 !== r ? r + "" : r;
            }
            function _(t, e) {
                return {
                    get: function() {
                        return t() ? (delete this.get, void 0) : (this.get = e).apply(this, arguments);
                    }
                };
            }
            function C(t, e) {
                if (e in t) return e;
                for (var i = e[0].toUpperCase() + e.slice(1), n = e, s = Qe.length; s--; ) if (e = Qe[s] + i, 
                e in t) return e;
                return n;
            }
            function T(t, e, i) {
                var n = Xe.exec(e);
                return n ? Math.max(0, n[1] - (i || 0)) + (n[2] || "px") : e;
            }
            function P(t, e, i, n, s) {
                for (var o = i === (n ? "border" : "content") ? 4 : "width" === e ? 1 : 0, r = 0; 4 > o; o += 2) "margin" === i && (r += Z.css(t, i + _e[o], !0, s)), 
                n ? ("content" === i && (r -= Z.css(t, "padding" + _e[o], !0, s)), "margin" !== i && (r -= Z.css(t, "border" + _e[o] + "Width", !0, s))) : (r += Z.css(t, "padding" + _e[o], !0, s), 
                "padding" !== i && (r += Z.css(t, "border" + _e[o] + "Width", !0, s)));
                return r;
            }
            function E(t, e, i) {
                var n = !0, s = "width" === e ? t.offsetWidth : t.offsetHeight, o = Be(t), r = "border-box" === Z.css(t, "boxSizing", !1, o);
                if (0 >= s || null == s) {
                    if (s = x(t, e, o), (0 > s || null == s) && (s = t.style[e]), Fe.test(s)) return s;
                    n = r && (G.boxSizingReliable() || s === t.style[e]), s = parseFloat(s) || 0;
                }
                return s + P(t, e, i || (r ? "border" : "content"), n, o) + "px";
            }
            function k(t, e) {
                for (var i, n, s, o = [], r = 0, a = t.length; a > r; r++) n = t[r], n.style && (o[r] = ve.get(n, "olddisplay"), 
                i = n.style.display, e ? (o[r] || "none" !== i || (n.style.display = ""), "" === n.style.display && Ce(n) && (o[r] = ve.access(n, "olddisplay", w(n.nodeName)))) : (s = Ce(n), 
                "none" === i && s || ve.set(n, "olddisplay", s ? i : Z.css(n, "display"))));
                for (r = 0; a > r; r++) n = t[r], n.style && (e && "none" !== n.style.display && "" !== n.style.display || (n.style.display = e ? o[r] || "" : "none"));
                return t;
            }
            function S(t, e, i, n, s) {
                return new S.prototype.init(t, e, i, n, s);
            }
            function N() {
                return setTimeout(function() {
                    Ge = void 0;
                }), Ge = Z.now();
            }
            function I(t, e) {
                var i, n = 0, s = {
                    height: t
                };
                for (e = e ? 1 : 0; 4 > n; n += 2 - e) i = _e[n], s["margin" + i] = s["padding" + i] = t;
                return e && (s.opacity = s.width = t), s;
            }
            function D(t, e, i) {
                for (var n, s = (ii[e] || []).concat(ii["*"]), o = 0, r = s.length; r > o; o++) if (n = s[o].call(i, e, t)) return n;
            }
            function H(t, e, i) {
                var n, s, o, r, a, l, h, c, u = this, p = {}, d = t.style, f = t.nodeType && Ce(t), g = ve.get(t, "fxshow");
                i.queue || (a = Z._queueHooks(t, "fx"), null == a.unqueued && (a.unqueued = 0, l = a.empty.fire, 
                a.empty.fire = function() {
                    a.unqueued || l();
                }), a.unqueued++, u.always(function() {
                    u.always(function() {
                        a.unqueued--, Z.queue(t, "fx").length || a.empty.fire();
                    });
                })), 1 === t.nodeType && ("height" in e || "width" in e) && (i.overflow = [ d.overflow, d.overflowX, d.overflowY ], 
                h = Z.css(t, "display"), c = "none" === h ? ve.get(t, "olddisplay") || w(t.nodeName) : h, 
                "inline" === c && "none" === Z.css(t, "float") && (d.display = "inline-block")), 
                i.overflow && (d.overflow = "hidden", u.always(function() {
                    d.overflow = i.overflow[0], d.overflowX = i.overflow[1], d.overflowY = i.overflow[2];
                }));
                for (n in e) if (s = e[n], Je.exec(s)) {
                    if (delete e[n], o = o || "toggle" === s, s === (f ? "hide" : "show")) {
                        if ("show" !== s || !g || void 0 === g[n]) continue;
                        f = !0;
                    }
                    p[n] = g && g[n] || Z.style(t, n);
                } else h = void 0;
                if (Z.isEmptyObject(p)) "inline" === ("none" === h ? w(t.nodeName) : h) && (d.display = h); else {
                    g ? "hidden" in g && (f = g.hidden) : g = ve.access(t, "fxshow", {}), o && (g.hidden = !f), 
                    f ? Z(t).show() : u.done(function() {
                        Z(t).hide();
                    }), u.done(function() {
                        var e;
                        ve.remove(t, "fxshow");
                        for (e in p) Z.style(t, e, p[e]);
                    });
                    for (n in p) r = D(f ? g[n] : 0, n, u), n in g || (g[n] = r.start, f && (r.end = r.start, 
                    r.start = "width" === n || "height" === n ? 1 : 0));
                }
            }
            function A(t, e) {
                var i, n, s, o, r;
                for (i in t) if (n = Z.camelCase(i), s = e[n], o = t[i], Z.isArray(o) && (s = o[1], 
                o = t[i] = o[0]), i !== n && (t[n] = o, delete t[i]), r = Z.cssHooks[n], r && "expand" in r) {
                    o = r.expand(o), delete t[n];
                    for (i in o) i in t || (t[i] = o[i], e[i] = s);
                } else e[n] = s;
            }
            function z(t, e, i) {
                var n, s, o = 0, r = ei.length, a = Z.Deferred().always(function() {
                    delete l.elem;
                }), l = function() {
                    if (s) return !1;
                    for (var e = Ge || N(), i = Math.max(0, h.startTime + h.duration - e), n = i / h.duration || 0, o = 1 - n, r = 0, l = h.tweens.length; l > r; r++) h.tweens[r].run(o);
                    return a.notifyWith(t, [ h, o, i ]), 1 > o && l ? i : (a.resolveWith(t, [ h ]), 
                    !1);
                }, h = a.promise({
                    elem: t,
                    props: Z.extend({}, e),
                    opts: Z.extend(!0, {
                        specialEasing: {}
                    }, i),
                    originalProperties: e,
                    originalOptions: i,
                    startTime: Ge || N(),
                    duration: i.duration,
                    tweens: [],
                    createTween: function(e, i) {
                        var n = Z.Tween(t, h.opts, e, i, h.opts.specialEasing[e] || h.opts.easing);
                        return h.tweens.push(n), n;
                    },
                    stop: function(e) {
                        var i = 0, n = e ? h.tweens.length : 0;
                        if (s) return this;
                        for (s = !0; n > i; i++) h.tweens[i].run(1);
                        return e ? a.resolveWith(t, [ h, e ]) : a.rejectWith(t, [ h, e ]), this;
                    }
                }), c = h.props;
                for (A(c, h.opts.specialEasing); r > o; o++) if (n = ei[o].call(h, t, c, h.opts)) return n;
                return Z.map(c, D, h), Z.isFunction(h.opts.start) && h.opts.start.call(t, h), Z.fx.timer(Z.extend(l, {
                    elem: t,
                    anim: h,
                    queue: h.opts.queue
                })), h.progress(h.opts.progress).done(h.opts.done, h.opts.complete).fail(h.opts.fail).always(h.opts.always);
            }
            function O(t) {
                return function(e, i) {
                    "string" != typeof e && (i = e, e = "*");
                    var n, s = 0, o = e.toLowerCase().match(de) || [];
                    if (Z.isFunction(i)) for (;n = o[s++]; ) "+" === n[0] ? (n = n.slice(1) || "*", 
                    (t[n] = t[n] || []).unshift(i)) : (t[n] = t[n] || []).push(i);
                };
            }
            function j(t, e, i, n) {
                function s(a) {
                    var l;
                    return o[a] = !0, Z.each(t[a] || [], function(t, a) {
                        var h = a(e, i, n);
                        return "string" != typeof h || r || o[h] ? r ? !(l = h) : void 0 : (e.dataTypes.unshift(h), 
                        s(h), !1);
                    }), l;
                }
                var o = {}, r = t === yi;
                return s(e.dataTypes[0]) || !o["*"] && s("*");
            }
            function L(t, e) {
                var i, n, s = Z.ajaxSettings.flatOptions || {};
                for (i in e) void 0 !== e[i] && ((s[i] ? t : n || (n = {}))[i] = e[i]);
                return n && Z.extend(!0, t, n), t;
            }
            function W(t, e, i) {
                for (var n, s, o, r, a = t.contents, l = t.dataTypes; "*" === l[0]; ) l.shift(), 
                void 0 === n && (n = t.mimeType || e.getResponseHeader("Content-Type"));
                if (n) for (s in a) if (a[s] && a[s].test(n)) {
                    l.unshift(s);
                    break;
                }
                if (l[0] in i) o = l[0]; else {
                    for (s in i) {
                        if (!l[0] || t.converters[s + " " + l[0]]) {
                            o = s;
                            break;
                        }
                        r || (r = s);
                    }
                    o = o || r;
                }
                return o ? (o !== l[0] && l.unshift(o), i[o]) : void 0;
            }
            function R(t, e, i, n) {
                var s, o, r, a, l, h = {}, c = t.dataTypes.slice();
                if (c[1]) for (r in t.converters) h[r.toLowerCase()] = t.converters[r];
                for (o = c.shift(); o; ) if (t.responseFields[o] && (i[t.responseFields[o]] = e), 
                !l && n && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = o, o = c.shift()) if ("*" === o) o = l; else if ("*" !== l && l !== o) {
                    if (r = h[l + " " + o] || h["* " + o], !r) for (s in h) if (a = s.split(" "), a[1] === o && (r = h[l + " " + a[0]] || h["* " + a[0]])) {
                        r === !0 ? r = h[s] : h[s] !== !0 && (o = a[0], c.unshift(a[1]));
                        break;
                    }
                    if (r !== !0) if (r && t["throws"]) e = r(e); else try {
                        e = r(e);
                    } catch (u) {
                        return {
                            state: "parsererror",
                            error: r ? u : "No conversion from " + l + " to " + o
                        };
                    }
                }
                return {
                    state: "success",
                    data: e
                };
            }
            function M(t, e, i, n) {
                var s;
                if (Z.isArray(e)) Z.each(e, function(e, s) {
                    i || Ti.test(t) ? n(t, s) : M(t + "[" + ("object" == typeof s ? e : "") + "]", s, i, n);
                }); else if (i || "object" !== Z.type(e)) n(t, e); else for (s in e) M(t + "[" + s + "]", e[s], i, n);
            }
            function q(t) {
                return Z.isWindow(t) ? t : 9 === t.nodeType && t.defaultView;
            }
            var F = [], B = F.slice, $ = F.concat, X = F.push, U = F.indexOf, Y = {}, V = Y.toString, Q = Y.hasOwnProperty, G = {}, K = t.document, J = "2.1.3", Z = function(t, e) {
                return new Z.fn.init(t, e);
            }, te = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ee = /^-ms-/, ie = /-([\da-z])/gi, ne = function(t, e) {
                return e.toUpperCase();
            };
            Z.fn = Z.prototype = {
                jquery: J,
                constructor: Z,
                selector: "",
                length: 0,
                toArray: function() {
                    return B.call(this);
                },
                get: function(t) {
                    return null != t ? 0 > t ? this[t + this.length] : this[t] : B.call(this);
                },
                pushStack: function(t) {
                    var e = Z.merge(this.constructor(), t);
                    return e.prevObject = this, e.context = this.context, e;
                },
                each: function(t, e) {
                    return Z.each(this, t, e);
                },
                map: function(t) {
                    return this.pushStack(Z.map(this, function(e, i) {
                        return t.call(e, i, e);
                    }));
                },
                slice: function() {
                    return this.pushStack(B.apply(this, arguments));
                },
                first: function() {
                    return this.eq(0);
                },
                last: function() {
                    return this.eq(-1);
                },
                eq: function(t) {
                    var e = this.length, i = +t + (0 > t ? e : 0);
                    return this.pushStack(i >= 0 && e > i ? [ this[i] ] : []);
                },
                end: function() {
                    return this.prevObject || this.constructor(null);
                },
                push: X,
                sort: F.sort,
                splice: F.splice
            }, Z.extend = Z.fn.extend = function() {
                var t, e, i, n, s, o, r = arguments[0] || {}, a = 1, l = arguments.length, h = !1;
                for ("boolean" == typeof r && (h = r, r = arguments[a] || {}, a++), "object" == typeof r || Z.isFunction(r) || (r = {}), 
                a === l && (r = this, a--); l > a; a++) if (null != (t = arguments[a])) for (e in t) i = r[e], 
                n = t[e], r !== n && (h && n && (Z.isPlainObject(n) || (s = Z.isArray(n))) ? (s ? (s = !1, 
                o = i && Z.isArray(i) ? i : []) : o = i && Z.isPlainObject(i) ? i : {}, r[e] = Z.extend(h, o, n)) : void 0 !== n && (r[e] = n));
                return r;
            }, Z.extend({
                expando: "jQuery" + (J + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function(t) {
                    throw new Error(t);
                },
                noop: function() {},
                isFunction: function(t) {
                    return "function" === Z.type(t);
                },
                isArray: Array.isArray,
                isWindow: function(t) {
                    return null != t && t === t.window;
                },
                isNumeric: function(t) {
                    return !Z.isArray(t) && t - parseFloat(t) + 1 >= 0;
                },
                isPlainObject: function(t) {
                    return "object" !== Z.type(t) || t.nodeType || Z.isWindow(t) ? !1 : t.constructor && !Q.call(t.constructor.prototype, "isPrototypeOf") ? !1 : !0;
                },
                isEmptyObject: function(t) {
                    var e;
                    for (e in t) return !1;
                    return !0;
                },
                type: function(t) {
                    return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? Y[V.call(t)] || "object" : typeof t;
                },
                globalEval: function(t) {
                    var e, i = eval;
                    t = Z.trim(t), t && (1 === t.indexOf("use strict") ? (e = K.createElement("script"), 
                    e.text = t, K.head.appendChild(e).parentNode.removeChild(e)) : i(t));
                },
                camelCase: function(t) {
                    return t.replace(ee, "ms-").replace(ie, ne);
                },
                nodeName: function(t, e) {
                    return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase();
                },
                each: function(t, e, n) {
                    var s, o = 0, r = t.length, a = i(t);
                    if (n) {
                        if (a) for (;r > o && (s = e.apply(t[o], n), s !== !1); o++) ; else for (o in t) if (s = e.apply(t[o], n), 
                        s === !1) break;
                    } else if (a) for (;r > o && (s = e.call(t[o], o, t[o]), s !== !1); o++) ; else for (o in t) if (s = e.call(t[o], o, t[o]), 
                    s === !1) break;
                    return t;
                },
                trim: function(t) {
                    return null == t ? "" : (t + "").replace(te, "");
                },
                makeArray: function(t, e) {
                    var n = e || [];
                    return null != t && (i(Object(t)) ? Z.merge(n, "string" == typeof t ? [ t ] : t) : X.call(n, t)), 
                    n;
                },
                inArray: function(t, e, i) {
                    return null == e ? -1 : U.call(e, t, i);
                },
                merge: function(t, e) {
                    for (var i = +e.length, n = 0, s = t.length; i > n; n++) t[s++] = e[n];
                    return t.length = s, t;
                },
                grep: function(t, e, i) {
                    for (var n, s = [], o = 0, r = t.length, a = !i; r > o; o++) n = !e(t[o], o), n !== a && s.push(t[o]);
                    return s;
                },
                map: function(t, e, n) {
                    var s, o = 0, r = t.length, a = i(t), l = [];
                    if (a) for (;r > o; o++) s = e(t[o], o, n), null != s && l.push(s); else for (o in t) s = e(t[o], o, n), 
                    null != s && l.push(s);
                    return $.apply([], l);
                },
                guid: 1,
                proxy: function(t, e) {
                    var i, n, s;
                    return "string" == typeof e && (i = t[e], e = t, t = i), Z.isFunction(t) ? (n = B.call(arguments, 2), 
                    s = function() {
                        return t.apply(e || this, n.concat(B.call(arguments)));
                    }, s.guid = t.guid = t.guid || Z.guid++, s) : void 0;
                },
                now: Date.now,
                support: G
            }), Z.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
                Y["[object " + e + "]"] = e.toLowerCase();
            });
            var se = function(t) {
                function e(t, e, i, n) {
                    var s, o, r, a, l, h, u, d, f, g;
                    if ((e ? e.ownerDocument || e : M) !== H && D(e), e = e || H, i = i || [], a = e.nodeType, 
                    "string" != typeof t || !t || 1 !== a && 9 !== a && 11 !== a) return i;
                    if (!n && z) {
                        if (11 !== a && (s = be.exec(t))) if (r = s[1]) {
                            if (9 === a) {
                                if (o = e.getElementById(r), !o || !o.parentNode) return i;
                                if (o.id === r) return i.push(o), i;
                            } else if (e.ownerDocument && (o = e.ownerDocument.getElementById(r)) && W(e, o) && o.id === r) return i.push(o), 
                            i;
                        } else {
                            if (s[2]) return J.apply(i, e.getElementsByTagName(t)), i;
                            if ((r = s[3]) && x.getElementsByClassName) return J.apply(i, e.getElementsByClassName(r)), 
                            i;
                        }
                        if (x.qsa && (!O || !O.test(t))) {
                            if (d = u = R, f = e, g = 1 !== a && t, 1 === a && "object" !== e.nodeName.toLowerCase()) {
                                for (h = P(t), (u = e.getAttribute("id")) ? d = u.replace(we, "\\$&") : e.setAttribute("id", d), 
                                d = "[id='" + d + "'] ", l = h.length; l--; ) h[l] = d + p(h[l]);
                                f = ye.test(t) && c(e.parentNode) || e, g = h.join(",");
                            }
                            if (g) try {
                                return J.apply(i, f.querySelectorAll(g)), i;
                            } catch (m) {} finally {
                                u || e.removeAttribute("id");
                            }
                        }
                    }
                    return k(t.replace(le, "$1"), e, i, n);
                }
                function i() {
                    function t(i, n) {
                        return e.push(i + " ") > _.cacheLength && delete t[e.shift()], t[i + " "] = n;
                    }
                    var e = [];
                    return t;
                }
                function n(t) {
                    return t[R] = !0, t;
                }
                function s(t) {
                    var e = H.createElement("div");
                    try {
                        return !!t(e);
                    } catch (i) {
                        return !1;
                    } finally {
                        e.parentNode && e.parentNode.removeChild(e), e = null;
                    }
                }
                function o(t, e) {
                    for (var i = t.split("|"), n = t.length; n--; ) _.attrHandle[i[n]] = e;
                }
                function r(t, e) {
                    var i = e && t, n = i && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || Y) - (~t.sourceIndex || Y);
                    if (n) return n;
                    if (i) for (;i = i.nextSibling; ) if (i === e) return -1;
                    return t ? 1 : -1;
                }
                function a(t) {
                    return function(e) {
                        var i = e.nodeName.toLowerCase();
                        return "input" === i && e.type === t;
                    };
                }
                function l(t) {
                    return function(e) {
                        var i = e.nodeName.toLowerCase();
                        return ("input" === i || "button" === i) && e.type === t;
                    };
                }
                function h(t) {
                    return n(function(e) {
                        return e = +e, n(function(i, n) {
                            for (var s, o = t([], i.length, e), r = o.length; r--; ) i[s = o[r]] && (i[s] = !(n[s] = i[s]));
                        });
                    });
                }
                function c(t) {
                    return t && "undefined" != typeof t.getElementsByTagName && t;
                }
                function u() {}
                function p(t) {
                    for (var e = 0, i = t.length, n = ""; i > e; e++) n += t[e].value;
                    return n;
                }
                function d(t, e, i) {
                    var n = e.dir, s = i && "parentNode" === n, o = F++;
                    return e.first ? function(e, i, o) {
                        for (;e = e[n]; ) if (1 === e.nodeType || s) return t(e, i, o);
                    } : function(e, i, r) {
                        var a, l, h = [ q, o ];
                        if (r) {
                            for (;e = e[n]; ) if ((1 === e.nodeType || s) && t(e, i, r)) return !0;
                        } else for (;e = e[n]; ) if (1 === e.nodeType || s) {
                            if (l = e[R] || (e[R] = {}), (a = l[n]) && a[0] === q && a[1] === o) return h[2] = a[2];
                            if (l[n] = h, h[2] = t(e, i, r)) return !0;
                        }
                    };
                }
                function f(t) {
                    return t.length > 1 ? function(e, i, n) {
                        for (var s = t.length; s--; ) if (!t[s](e, i, n)) return !1;
                        return !0;
                    } : t[0];
                }
                function g(t, i, n) {
                    for (var s = 0, o = i.length; o > s; s++) e(t, i[s], n);
                    return n;
                }
                function m(t, e, i, n, s) {
                    for (var o, r = [], a = 0, l = t.length, h = null != e; l > a; a++) (o = t[a]) && (!i || i(o, n, s)) && (r.push(o), 
                    h && e.push(a));
                    return r;
                }
                function v(t, e, i, s, o, r) {
                    return s && !s[R] && (s = v(s)), o && !o[R] && (o = v(o, r)), n(function(n, r, a, l) {
                        var h, c, u, p = [], d = [], f = r.length, v = n || g(e || "*", a.nodeType ? [ a ] : a, []), b = !t || !n && e ? v : m(v, p, t, a, l), y = i ? o || (n ? t : f || s) ? [] : r : b;
                        if (i && i(b, y, a, l), s) for (h = m(y, d), s(h, [], a, l), c = h.length; c--; ) (u = h[c]) && (y[d[c]] = !(b[d[c]] = u));
                        if (n) {
                            if (o || t) {
                                if (o) {
                                    for (h = [], c = y.length; c--; ) (u = y[c]) && h.push(b[c] = u);
                                    o(null, y = [], h, l);
                                }
                                for (c = y.length; c--; ) (u = y[c]) && (h = o ? te(n, u) : p[c]) > -1 && (n[h] = !(r[h] = u));
                            }
                        } else y = m(y === r ? y.splice(f, y.length) : y), o ? o(null, r, y, l) : J.apply(r, y);
                    });
                }
                function b(t) {
                    for (var e, i, n, s = t.length, o = _.relative[t[0].type], r = o || _.relative[" "], a = o ? 1 : 0, l = d(function(t) {
                        return t === e;
                    }, r, !0), h = d(function(t) {
                        return te(e, t) > -1;
                    }, r, !0), c = [ function(t, i, n) {
                        var s = !o && (n || i !== S) || ((e = i).nodeType ? l(t, i, n) : h(t, i, n));
                        return e = null, s;
                    } ]; s > a; a++) if (i = _.relative[t[a].type]) c = [ d(f(c), i) ]; else {
                        if (i = _.filter[t[a].type].apply(null, t[a].matches), i[R]) {
                            for (n = ++a; s > n && !_.relative[t[n].type]; n++) ;
                            return v(a > 1 && f(c), a > 1 && p(t.slice(0, a - 1).concat({
                                value: " " === t[a - 2].type ? "*" : ""
                            })).replace(le, "$1"), i, n > a && b(t.slice(a, n)), s > n && b(t = t.slice(n)), s > n && p(t));
                        }
                        c.push(i);
                    }
                    return f(c);
                }
                function y(t, i) {
                    var s = i.length > 0, o = t.length > 0, r = function(n, r, a, l, h) {
                        var c, u, p, d = 0, f = "0", g = n && [], v = [], b = S, y = n || o && _.find.TAG("*", h), w = q += null == b ? 1 : Math.random() || .1, x = y.length;
                        for (h && (S = r !== H && r); f !== x && null != (c = y[f]); f++) {
                            if (o && c) {
                                for (u = 0; p = t[u++]; ) if (p(c, r, a)) {
                                    l.push(c);
                                    break;
                                }
                                h && (q = w);
                            }
                            s && ((c = !p && c) && d--, n && g.push(c));
                        }
                        if (d += f, s && f !== d) {
                            for (u = 0; p = i[u++]; ) p(g, v, r, a);
                            if (n) {
                                if (d > 0) for (;f--; ) g[f] || v[f] || (v[f] = G.call(l));
                                v = m(v);
                            }
                            J.apply(l, v), h && !n && v.length > 0 && d + i.length > 1 && e.uniqueSort(l);
                        }
                        return h && (q = w, S = b), g;
                    };
                    return s ? n(r) : r;
                }
                var w, x, _, C, T, P, E, k, S, N, I, D, H, A, z, O, j, L, W, R = "sizzle" + 1 * new Date(), M = t.document, q = 0, F = 0, B = i(), $ = i(), X = i(), U = function(t, e) {
                    return t === e && (I = !0), 0;
                }, Y = 1 << 31, V = {}.hasOwnProperty, Q = [], G = Q.pop, K = Q.push, J = Q.push, Z = Q.slice, te = function(t, e) {
                    for (var i = 0, n = t.length; n > i; i++) if (t[i] === e) return i;
                    return -1;
                }, ee = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ie = "[\\x20\\t\\r\\n\\f]", ne = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", se = ne.replace("w", "w#"), oe = "\\[" + ie + "*(" + ne + ")(?:" + ie + "*([*^$|!~]?=)" + ie + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + se + "))|)" + ie + "*\\]", re = ":(" + ne + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + oe + ")*)|.*)\\)|)", ae = new RegExp(ie + "+", "g"), le = new RegExp("^" + ie + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ie + "+$", "g"), he = new RegExp("^" + ie + "*," + ie + "*"), ce = new RegExp("^" + ie + "*([>+~]|" + ie + ")" + ie + "*"), ue = new RegExp("=" + ie + "*([^\\]'\"]*?)" + ie + "*\\]", "g"), pe = new RegExp(re), de = new RegExp("^" + se + "$"), fe = {
                    ID: new RegExp("^#(" + ne + ")"),
                    CLASS: new RegExp("^\\.(" + ne + ")"),
                    TAG: new RegExp("^(" + ne.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + oe),
                    PSEUDO: new RegExp("^" + re),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ie + "*(even|odd|(([+-]|)(\\d*)n|)" + ie + "*(?:([+-]|)" + ie + "*(\\d+)|))" + ie + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + ee + ")$", "i"),
                    needsContext: new RegExp("^" + ie + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ie + "*((?:-\\d)?\\d*)" + ie + "*\\)|)(?=[^-]|$)", "i")
                }, ge = /^(?:input|select|textarea|button)$/i, me = /^h\d$/i, ve = /^[^{]+\{\s*\[native \w/, be = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ye = /[+~]/, we = /'|\\/g, xe = new RegExp("\\\\([\\da-f]{1,6}" + ie + "?|(" + ie + ")|.)", "ig"), _e = function(t, e, i) {
                    var n = "0x" + e - 65536;
                    return n !== n || i ? e : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320);
                }, Ce = function() {
                    D();
                };
                try {
                    J.apply(Q = Z.call(M.childNodes), M.childNodes), Q[M.childNodes.length].nodeType;
                } catch (Te) {
                    J = {
                        apply: Q.length ? function(t, e) {
                            K.apply(t, Z.call(e));
                        } : function(t, e) {
                            for (var i = t.length, n = 0; t[i++] = e[n++]; ) ;
                            t.length = i - 1;
                        }
                    };
                }
                x = e.support = {}, T = e.isXML = function(t) {
                    var e = t && (t.ownerDocument || t).documentElement;
                    return e ? "HTML" !== e.nodeName : !1;
                }, D = e.setDocument = function(t) {
                    var e, i, n = t ? t.ownerDocument || t : M;
                    return n !== H && 9 === n.nodeType && n.documentElement ? (H = n, A = n.documentElement, 
                    i = n.defaultView, i && i !== i.top && (i.addEventListener ? i.addEventListener("unload", Ce, !1) : i.attachEvent && i.attachEvent("onunload", Ce)), 
                    z = !T(n), x.attributes = s(function(t) {
                        return t.className = "i", !t.getAttribute("className");
                    }), x.getElementsByTagName = s(function(t) {
                        return t.appendChild(n.createComment("")), !t.getElementsByTagName("*").length;
                    }), x.getElementsByClassName = ve.test(n.getElementsByClassName), x.getById = s(function(t) {
                        return A.appendChild(t).id = R, !n.getElementsByName || !n.getElementsByName(R).length;
                    }), x.getById ? (_.find.ID = function(t, e) {
                        if ("undefined" != typeof e.getElementById && z) {
                            var i = e.getElementById(t);
                            return i && i.parentNode ? [ i ] : [];
                        }
                    }, _.filter.ID = function(t) {
                        var e = t.replace(xe, _e);
                        return function(t) {
                            return t.getAttribute("id") === e;
                        };
                    }) : (delete _.find.ID, _.filter.ID = function(t) {
                        var e = t.replace(xe, _e);
                        return function(t) {
                            var i = "undefined" != typeof t.getAttributeNode && t.getAttributeNode("id");
                            return i && i.value === e;
                        };
                    }), _.find.TAG = x.getElementsByTagName ? function(t, e) {
                        return "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t) : x.qsa ? e.querySelectorAll(t) : void 0;
                    } : function(t, e) {
                        var i, n = [], s = 0, o = e.getElementsByTagName(t);
                        if ("*" === t) {
                            for (;i = o[s++]; ) 1 === i.nodeType && n.push(i);
                            return n;
                        }
                        return o;
                    }, _.find.CLASS = x.getElementsByClassName && function(t, e) {
                        return z ? e.getElementsByClassName(t) : void 0;
                    }, j = [], O = [], (x.qsa = ve.test(n.querySelectorAll)) && (s(function(t) {
                        A.appendChild(t).innerHTML = "<a id='" + R + "'></a><select id='" + R + "-\f]' msallowcapture=''><option selected=''></option></select>", 
                        t.querySelectorAll("[msallowcapture^='']").length && O.push("[*^$]=" + ie + "*(?:''|\"\")"), 
                        t.querySelectorAll("[selected]").length || O.push("\\[" + ie + "*(?:value|" + ee + ")"), 
                        t.querySelectorAll("[id~=" + R + "-]").length || O.push("~="), t.querySelectorAll(":checked").length || O.push(":checked"), 
                        t.querySelectorAll("a#" + R + "+*").length || O.push(".#.+[+~]");
                    }), s(function(t) {
                        var e = n.createElement("input");
                        e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && O.push("name" + ie + "*[*^$|!~]?="), 
                        t.querySelectorAll(":enabled").length || O.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), 
                        O.push(",.*:");
                    })), (x.matchesSelector = ve.test(L = A.matches || A.webkitMatchesSelector || A.mozMatchesSelector || A.oMatchesSelector || A.msMatchesSelector)) && s(function(t) {
                        x.disconnectedMatch = L.call(t, "div"), L.call(t, "[s!='']:x"), j.push("!=", re);
                    }), O = O.length && new RegExp(O.join("|")), j = j.length && new RegExp(j.join("|")), 
                    e = ve.test(A.compareDocumentPosition), W = e || ve.test(A.contains) ? function(t, e) {
                        var i = 9 === t.nodeType ? t.documentElement : t, n = e && e.parentNode;
                        return t === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n)));
                    } : function(t, e) {
                        if (e) for (;e = e.parentNode; ) if (e === t) return !0;
                        return !1;
                    }, U = e ? function(t, e) {
                        if (t === e) return I = !0, 0;
                        var i = !t.compareDocumentPosition - !e.compareDocumentPosition;
                        return i ? i : (i = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1, 
                        1 & i || !x.sortDetached && e.compareDocumentPosition(t) === i ? t === n || t.ownerDocument === M && W(M, t) ? -1 : e === n || e.ownerDocument === M && W(M, e) ? 1 : N ? te(N, t) - te(N, e) : 0 : 4 & i ? -1 : 1);
                    } : function(t, e) {
                        if (t === e) return I = !0, 0;
                        var i, s = 0, o = t.parentNode, a = e.parentNode, l = [ t ], h = [ e ];
                        if (!o || !a) return t === n ? -1 : e === n ? 1 : o ? -1 : a ? 1 : N ? te(N, t) - te(N, e) : 0;
                        if (o === a) return r(t, e);
                        for (i = t; i = i.parentNode; ) l.unshift(i);
                        for (i = e; i = i.parentNode; ) h.unshift(i);
                        for (;l[s] === h[s]; ) s++;
                        return s ? r(l[s], h[s]) : l[s] === M ? -1 : h[s] === M ? 1 : 0;
                    }, n) : H;
                }, e.matches = function(t, i) {
                    return e(t, null, null, i);
                }, e.matchesSelector = function(t, i) {
                    if ((t.ownerDocument || t) !== H && D(t), i = i.replace(ue, "='$1']"), !(!x.matchesSelector || !z || j && j.test(i) || O && O.test(i))) try {
                        var n = L.call(t, i);
                        if (n || x.disconnectedMatch || t.document && 11 !== t.document.nodeType) return n;
                    } catch (s) {}
                    return e(i, H, null, [ t ]).length > 0;
                }, e.contains = function(t, e) {
                    return (t.ownerDocument || t) !== H && D(t), W(t, e);
                }, e.attr = function(t, e) {
                    (t.ownerDocument || t) !== H && D(t);
                    var i = _.attrHandle[e.toLowerCase()], n = i && V.call(_.attrHandle, e.toLowerCase()) ? i(t, e, !z) : void 0;
                    return void 0 !== n ? n : x.attributes || !z ? t.getAttribute(e) : (n = t.getAttributeNode(e)) && n.specified ? n.value : null;
                }, e.error = function(t) {
                    throw new Error("Syntax error, unrecognized expression: " + t);
                }, e.uniqueSort = function(t) {
                    var e, i = [], n = 0, s = 0;
                    if (I = !x.detectDuplicates, N = !x.sortStable && t.slice(0), t.sort(U), I) {
                        for (;e = t[s++]; ) e === t[s] && (n = i.push(s));
                        for (;n--; ) t.splice(i[n], 1);
                    }
                    return N = null, t;
                }, C = e.getText = function(t) {
                    var e, i = "", n = 0, s = t.nodeType;
                    if (s) {
                        if (1 === s || 9 === s || 11 === s) {
                            if ("string" == typeof t.textContent) return t.textContent;
                            for (t = t.firstChild; t; t = t.nextSibling) i += C(t);
                        } else if (3 === s || 4 === s) return t.nodeValue;
                    } else for (;e = t[n++]; ) i += C(e);
                    return i;
                }, _ = e.selectors = {
                    cacheLength: 50,
                    createPseudo: n,
                    match: fe,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(t) {
                            return t[1] = t[1].replace(xe, _e), t[3] = (t[3] || t[4] || t[5] || "").replace(xe, _e), 
                            "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4);
                        },
                        CHILD: function(t) {
                            return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), 
                            t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]), 
                            t;
                        },
                        PSEUDO: function(t) {
                            var e, i = !t[6] && t[2];
                            return fe.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : i && pe.test(i) && (e = P(i, !0)) && (e = i.indexOf(")", i.length - e) - i.length) && (t[0] = t[0].slice(0, e), 
                            t[2] = i.slice(0, e)), t.slice(0, 3));
                        }
                    },
                    filter: {
                        TAG: function(t) {
                            var e = t.replace(xe, _e).toLowerCase();
                            return "*" === t ? function() {
                                return !0;
                            } : function(t) {
                                return t.nodeName && t.nodeName.toLowerCase() === e;
                            };
                        },
                        CLASS: function(t) {
                            var e = B[t + " "];
                            return e || (e = new RegExp("(^|" + ie + ")" + t + "(" + ie + "|$)")) && B(t, function(t) {
                                return e.test("string" == typeof t.className && t.className || "undefined" != typeof t.getAttribute && t.getAttribute("class") || "");
                            });
                        },
                        ATTR: function(t, i, n) {
                            return function(s) {
                                var o = e.attr(s, t);
                                return null == o ? "!=" === i : i ? (o += "", "=" === i ? o === n : "!=" === i ? o !== n : "^=" === i ? n && 0 === o.indexOf(n) : "*=" === i ? n && o.indexOf(n) > -1 : "$=" === i ? n && o.slice(-n.length) === n : "~=" === i ? (" " + o.replace(ae, " ") + " ").indexOf(n) > -1 : "|=" === i ? o === n || o.slice(0, n.length + 1) === n + "-" : !1) : !0;
                            };
                        },
                        CHILD: function(t, e, i, n, s) {
                            var o = "nth" !== t.slice(0, 3), r = "last" !== t.slice(-4), a = "of-type" === e;
                            return 1 === n && 0 === s ? function(t) {
                                return !!t.parentNode;
                            } : function(e, i, l) {
                                var h, c, u, p, d, f, g = o !== r ? "nextSibling" : "previousSibling", m = e.parentNode, v = a && e.nodeName.toLowerCase(), b = !l && !a;
                                if (m) {
                                    if (o) {
                                        for (;g; ) {
                                            for (u = e; u = u[g]; ) if (a ? u.nodeName.toLowerCase() === v : 1 === u.nodeType) return !1;
                                            f = g = "only" === t && !f && "nextSibling";
                                        }
                                        return !0;
                                    }
                                    if (f = [ r ? m.firstChild : m.lastChild ], r && b) {
                                        for (c = m[R] || (m[R] = {}), h = c[t] || [], d = h[0] === q && h[1], p = h[0] === q && h[2], 
                                        u = d && m.childNodes[d]; u = ++d && u && u[g] || (p = d = 0) || f.pop(); ) if (1 === u.nodeType && ++p && u === e) {
                                            c[t] = [ q, d, p ];
                                            break;
                                        }
                                    } else if (b && (h = (e[R] || (e[R] = {}))[t]) && h[0] === q) p = h[1]; else for (;(u = ++d && u && u[g] || (p = d = 0) || f.pop()) && ((a ? u.nodeName.toLowerCase() !== v : 1 !== u.nodeType) || !++p || (b && ((u[R] || (u[R] = {}))[t] = [ q, p ]), 
                                    u !== e)); ) ;
                                    return p -= s, p === n || p % n === 0 && p / n >= 0;
                                }
                            };
                        },
                        PSEUDO: function(t, i) {
                            var s, o = _.pseudos[t] || _.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                            return o[R] ? o(i) : o.length > 1 ? (s = [ t, t, "", i ], _.setFilters.hasOwnProperty(t.toLowerCase()) ? n(function(t, e) {
                                for (var n, s = o(t, i), r = s.length; r--; ) n = te(t, s[r]), t[n] = !(e[n] = s[r]);
                            }) : function(t) {
                                return o(t, 0, s);
                            }) : o;
                        }
                    },
                    pseudos: {
                        not: n(function(t) {
                            var e = [], i = [], s = E(t.replace(le, "$1"));
                            return s[R] ? n(function(t, e, i, n) {
                                for (var o, r = s(t, null, n, []), a = t.length; a--; ) (o = r[a]) && (t[a] = !(e[a] = o));
                            }) : function(t, n, o) {
                                return e[0] = t, s(e, null, o, i), e[0] = null, !i.pop();
                            };
                        }),
                        has: n(function(t) {
                            return function(i) {
                                return e(t, i).length > 0;
                            };
                        }),
                        contains: n(function(t) {
                            return t = t.replace(xe, _e), function(e) {
                                return (e.textContent || e.innerText || C(e)).indexOf(t) > -1;
                            };
                        }),
                        lang: n(function(t) {
                            return de.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(xe, _e).toLowerCase(), 
                            function(e) {
                                var i;
                                do if (i = z ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return i = i.toLowerCase(), 
                                i === t || 0 === i.indexOf(t + "-"); while ((e = e.parentNode) && 1 === e.nodeType);
                                return !1;
                            };
                        }),
                        target: function(e) {
                            var i = t.location && t.location.hash;
                            return i && i.slice(1) === e.id;
                        },
                        root: function(t) {
                            return t === A;
                        },
                        focus: function(t) {
                            return t === H.activeElement && (!H.hasFocus || H.hasFocus()) && !!(t.type || t.href || ~t.tabIndex);
                        },
                        enabled: function(t) {
                            return t.disabled === !1;
                        },
                        disabled: function(t) {
                            return t.disabled === !0;
                        },
                        checked: function(t) {
                            var e = t.nodeName.toLowerCase();
                            return "input" === e && !!t.checked || "option" === e && !!t.selected;
                        },
                        selected: function(t) {
                            return t.parentNode && t.parentNode.selectedIndex, t.selected === !0;
                        },
                        empty: function(t) {
                            for (t = t.firstChild; t; t = t.nextSibling) if (t.nodeType < 6) return !1;
                            return !0;
                        },
                        parent: function(t) {
                            return !_.pseudos.empty(t);
                        },
                        header: function(t) {
                            return me.test(t.nodeName);
                        },
                        input: function(t) {
                            return ge.test(t.nodeName);
                        },
                        button: function(t) {
                            var e = t.nodeName.toLowerCase();
                            return "input" === e && "button" === t.type || "button" === e;
                        },
                        text: function(t) {
                            var e;
                            return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase());
                        },
                        first: h(function() {
                            return [ 0 ];
                        }),
                        last: h(function(t, e) {
                            return [ e - 1 ];
                        }),
                        eq: h(function(t, e, i) {
                            return [ 0 > i ? i + e : i ];
                        }),
                        even: h(function(t, e) {
                            for (var i = 0; e > i; i += 2) t.push(i);
                            return t;
                        }),
                        odd: h(function(t, e) {
                            for (var i = 1; e > i; i += 2) t.push(i);
                            return t;
                        }),
                        lt: h(function(t, e, i) {
                            for (var n = 0 > i ? i + e : i; --n >= 0; ) t.push(n);
                            return t;
                        }),
                        gt: h(function(t, e, i) {
                            for (var n = 0 > i ? i + e : i; ++n < e; ) t.push(n);
                            return t;
                        })
                    }
                }, _.pseudos.nth = _.pseudos.eq;
                for (w in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) _.pseudos[w] = a(w);
                for (w in {
                    submit: !0,
                    reset: !0
                }) _.pseudos[w] = l(w);
                return u.prototype = _.filters = _.pseudos, _.setFilters = new u(), P = e.tokenize = function(t, i) {
                    var n, s, o, r, a, l, h, c = $[t + " "];
                    if (c) return i ? 0 : c.slice(0);
                    for (a = t, l = [], h = _.preFilter; a; ) {
                        (!n || (s = he.exec(a))) && (s && (a = a.slice(s[0].length) || a), l.push(o = [])), 
                        n = !1, (s = ce.exec(a)) && (n = s.shift(), o.push({
                            value: n,
                            type: s[0].replace(le, " ")
                        }), a = a.slice(n.length));
                        for (r in _.filter) !(s = fe[r].exec(a)) || h[r] && !(s = h[r](s)) || (n = s.shift(), 
                        o.push({
                            value: n,
                            type: r,
                            matches: s
                        }), a = a.slice(n.length));
                        if (!n) break;
                    }
                    return i ? a.length : a ? e.error(t) : $(t, l).slice(0);
                }, E = e.compile = function(t, e) {
                    var i, n = [], s = [], o = X[t + " "];
                    if (!o) {
                        for (e || (e = P(t)), i = e.length; i--; ) o = b(e[i]), o[R] ? n.push(o) : s.push(o);
                        o = X(t, y(s, n)), o.selector = t;
                    }
                    return o;
                }, k = e.select = function(t, e, i, n) {
                    var s, o, r, a, l, h = "function" == typeof t && t, u = !n && P(t = h.selector || t);
                    if (i = i || [], 1 === u.length) {
                        if (o = u[0] = u[0].slice(0), o.length > 2 && "ID" === (r = o[0]).type && x.getById && 9 === e.nodeType && z && _.relative[o[1].type]) {
                            if (e = (_.find.ID(r.matches[0].replace(xe, _e), e) || [])[0], !e) return i;
                            h && (e = e.parentNode), t = t.slice(o.shift().value.length);
                        }
                        for (s = fe.needsContext.test(t) ? 0 : o.length; s-- && (r = o[s], !_.relative[a = r.type]); ) if ((l = _.find[a]) && (n = l(r.matches[0].replace(xe, _e), ye.test(o[0].type) && c(e.parentNode) || e))) {
                            if (o.splice(s, 1), t = n.length && p(o), !t) return J.apply(i, n), i;
                            break;
                        }
                    }
                    return (h || E(t, u))(n, e, !z, i, ye.test(t) && c(e.parentNode) || e), i;
                }, x.sortStable = R.split("").sort(U).join("") === R, x.detectDuplicates = !!I, 
                D(), x.sortDetached = s(function(t) {
                    return 1 & t.compareDocumentPosition(H.createElement("div"));
                }), s(function(t) {
                    return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href");
                }) || o("type|href|height|width", function(t, e, i) {
                    return i ? void 0 : t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2);
                }), x.attributes && s(function(t) {
                    return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value");
                }) || o("value", function(t, e, i) {
                    return i || "input" !== t.nodeName.toLowerCase() ? void 0 : t.defaultValue;
                }), s(function(t) {
                    return null == t.getAttribute("disabled");
                }) || o(ee, function(t, e, i) {
                    var n;
                    return i ? void 0 : t[e] === !0 ? e.toLowerCase() : (n = t.getAttributeNode(e)) && n.specified ? n.value : null;
                }), e;
            }(t);
            Z.find = se, Z.expr = se.selectors, Z.expr[":"] = Z.expr.pseudos, Z.unique = se.uniqueSort, 
            Z.text = se.getText, Z.isXMLDoc = se.isXML, Z.contains = se.contains;
            var oe = Z.expr.match.needsContext, re = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, ae = /^.[^:#\[\.,]*$/;
            Z.filter = function(t, e, i) {
                var n = e[0];
                return i && (t = ":not(" + t + ")"), 1 === e.length && 1 === n.nodeType ? Z.find.matchesSelector(n, t) ? [ n ] : [] : Z.find.matches(t, Z.grep(e, function(t) {
                    return 1 === t.nodeType;
                }));
            }, Z.fn.extend({
                find: function(t) {
                    var e, i = this.length, n = [], s = this;
                    if ("string" != typeof t) return this.pushStack(Z(t).filter(function() {
                        for (e = 0; i > e; e++) if (Z.contains(s[e], this)) return !0;
                    }));
                    for (e = 0; i > e; e++) Z.find(t, s[e], n);
                    return n = this.pushStack(i > 1 ? Z.unique(n) : n), n.selector = this.selector ? this.selector + " " + t : t, 
                    n;
                },
                filter: function(t) {
                    return this.pushStack(n(this, t || [], !1));
                },
                not: function(t) {
                    return this.pushStack(n(this, t || [], !0));
                },
                is: function(t) {
                    return !!n(this, "string" == typeof t && oe.test(t) ? Z(t) : t || [], !1).length;
                }
            });
            var le, he = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, ce = Z.fn.init = function(t, e) {
                var i, n;
                if (!t) return this;
                if ("string" == typeof t) {
                    if (i = "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3 ? [ null, t, null ] : he.exec(t), 
                    !i || !i[1] && e) return !e || e.jquery ? (e || le).find(t) : this.constructor(e).find(t);
                    if (i[1]) {
                        if (e = e instanceof Z ? e[0] : e, Z.merge(this, Z.parseHTML(i[1], e && e.nodeType ? e.ownerDocument || e : K, !0)), 
                        re.test(i[1]) && Z.isPlainObject(e)) for (i in e) Z.isFunction(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
                        return this;
                    }
                    return n = K.getElementById(i[2]), n && n.parentNode && (this.length = 1, this[0] = n), 
                    this.context = K, this.selector = t, this;
                }
                return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : Z.isFunction(t) ? "undefined" != typeof le.ready ? le.ready(t) : t(Z) : (void 0 !== t.selector && (this.selector = t.selector, 
                this.context = t.context), Z.makeArray(t, this));
            };
            ce.prototype = Z.fn, le = Z(K);
            var ue = /^(?:parents|prev(?:Until|All))/, pe = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
            Z.extend({
                dir: function(t, e, i) {
                    for (var n = [], s = void 0 !== i; (t = t[e]) && 9 !== t.nodeType; ) if (1 === t.nodeType) {
                        if (s && Z(t).is(i)) break;
                        n.push(t);
                    }
                    return n;
                },
                sibling: function(t, e) {
                    for (var i = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && i.push(t);
                    return i;
                }
            }), Z.fn.extend({
                has: function(t) {
                    var e = Z(t, this), i = e.length;
                    return this.filter(function() {
                        for (var t = 0; i > t; t++) if (Z.contains(this, e[t])) return !0;
                    });
                },
                closest: function(t, e) {
                    for (var i, n = 0, s = this.length, o = [], r = oe.test(t) || "string" != typeof t ? Z(t, e || this.context) : 0; s > n; n++) for (i = this[n]; i && i !== e; i = i.parentNode) if (i.nodeType < 11 && (r ? r.index(i) > -1 : 1 === i.nodeType && Z.find.matchesSelector(i, t))) {
                        o.push(i);
                        break;
                    }
                    return this.pushStack(o.length > 1 ? Z.unique(o) : o);
                },
                index: function(t) {
                    return t ? "string" == typeof t ? U.call(Z(t), this[0]) : U.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
                },
                add: function(t, e) {
                    return this.pushStack(Z.unique(Z.merge(this.get(), Z(t, e))));
                },
                addBack: function(t) {
                    return this.add(null == t ? this.prevObject : this.prevObject.filter(t));
                }
            }), Z.each({
                parent: function(t) {
                    var e = t.parentNode;
                    return e && 11 !== e.nodeType ? e : null;
                },
                parents: function(t) {
                    return Z.dir(t, "parentNode");
                },
                parentsUntil: function(t, e, i) {
                    return Z.dir(t, "parentNode", i);
                },
                next: function(t) {
                    return s(t, "nextSibling");
                },
                prev: function(t) {
                    return s(t, "previousSibling");
                },
                nextAll: function(t) {
                    return Z.dir(t, "nextSibling");
                },
                prevAll: function(t) {
                    return Z.dir(t, "previousSibling");
                },
                nextUntil: function(t, e, i) {
                    return Z.dir(t, "nextSibling", i);
                },
                prevUntil: function(t, e, i) {
                    return Z.dir(t, "previousSibling", i);
                },
                siblings: function(t) {
                    return Z.sibling((t.parentNode || {}).firstChild, t);
                },
                children: function(t) {
                    return Z.sibling(t.firstChild);
                },
                contents: function(t) {
                    return t.contentDocument || Z.merge([], t.childNodes);
                }
            }, function(t, e) {
                Z.fn[t] = function(i, n) {
                    var s = Z.map(this, e, i);
                    return "Until" !== t.slice(-5) && (n = i), n && "string" == typeof n && (s = Z.filter(n, s)), 
                    this.length > 1 && (pe[t] || Z.unique(s), ue.test(t) && s.reverse()), this.pushStack(s);
                };
            });
            var de = /\S+/g, fe = {};
            Z.Callbacks = function(t) {
                t = "string" == typeof t ? fe[t] || o(t) : Z.extend({}, t);
                var e, i, n, s, r, a, l = [], h = !t.once && [], c = function(o) {
                    for (e = t.memory && o, i = !0, a = s || 0, s = 0, r = l.length, n = !0; l && r > a; a++) if (l[a].apply(o[0], o[1]) === !1 && t.stopOnFalse) {
                        e = !1;
                        break;
                    }
                    n = !1, l && (h ? h.length && c(h.shift()) : e ? l = [] : u.disable());
                }, u = {
                    add: function() {
                        if (l) {
                            var i = l.length;
                            !function o(e) {
                                Z.each(e, function(e, i) {
                                    var n = Z.type(i);
                                    "function" === n ? t.unique && u.has(i) || l.push(i) : i && i.length && "string" !== n && o(i);
                                });
                            }(arguments), n ? r = l.length : e && (s = i, c(e));
                        }
                        return this;
                    },
                    remove: function() {
                        return l && Z.each(arguments, function(t, e) {
                            for (var i; (i = Z.inArray(e, l, i)) > -1; ) l.splice(i, 1), n && (r >= i && r--, 
                            a >= i && a--);
                        }), this;
                    },
                    has: function(t) {
                        return t ? Z.inArray(t, l) > -1 : !(!l || !l.length);
                    },
                    empty: function() {
                        return l = [], r = 0, this;
                    },
                    disable: function() {
                        return l = h = e = void 0, this;
                    },
                    disabled: function() {
                        return !l;
                    },
                    lock: function() {
                        return h = void 0, e || u.disable(), this;
                    },
                    locked: function() {
                        return !h;
                    },
                    fireWith: function(t, e) {
                        return !l || i && !h || (e = e || [], e = [ t, e.slice ? e.slice() : e ], n ? h.push(e) : c(e)), 
                        this;
                    },
                    fire: function() {
                        return u.fireWith(this, arguments), this;
                    },
                    fired: function() {
                        return !!i;
                    }
                };
                return u;
            }, Z.extend({
                Deferred: function(t) {
                    var e = [ [ "resolve", "done", Z.Callbacks("once memory"), "resolved" ], [ "reject", "fail", Z.Callbacks("once memory"), "rejected" ], [ "notify", "progress", Z.Callbacks("memory") ] ], i = "pending", n = {
                        state: function() {
                            return i;
                        },
                        always: function() {
                            return s.done(arguments).fail(arguments), this;
                        },
                        then: function() {
                            var t = arguments;
                            return Z.Deferred(function(i) {
                                Z.each(e, function(e, o) {
                                    var r = Z.isFunction(t[e]) && t[e];
                                    s[o[1]](function() {
                                        var t = r && r.apply(this, arguments);
                                        t && Z.isFunction(t.promise) ? t.promise().done(i.resolve).fail(i.reject).progress(i.notify) : i[o[0] + "With"](this === n ? i.promise() : this, r ? [ t ] : arguments);
                                    });
                                }), t = null;
                            }).promise();
                        },
                        promise: function(t) {
                            return null != t ? Z.extend(t, n) : n;
                        }
                    }, s = {};
                    return n.pipe = n.then, Z.each(e, function(t, o) {
                        var r = o[2], a = o[3];
                        n[o[1]] = r.add, a && r.add(function() {
                            i = a;
                        }, e[1 ^ t][2].disable, e[2][2].lock), s[o[0]] = function() {
                            return s[o[0] + "With"](this === s ? n : this, arguments), this;
                        }, s[o[0] + "With"] = r.fireWith;
                    }), n.promise(s), t && t.call(s, s), s;
                },
                when: function(t) {
                    var e, i, n, s = 0, o = B.call(arguments), r = o.length, a = 1 !== r || t && Z.isFunction(t.promise) ? r : 0, l = 1 === a ? t : Z.Deferred(), h = function(t, i, n) {
                        return function(s) {
                            i[t] = this, n[t] = arguments.length > 1 ? B.call(arguments) : s, n === e ? l.notifyWith(i, n) : --a || l.resolveWith(i, n);
                        };
                    };
                    if (r > 1) for (e = new Array(r), i = new Array(r), n = new Array(r); r > s; s++) o[s] && Z.isFunction(o[s].promise) ? o[s].promise().done(h(s, n, o)).fail(l.reject).progress(h(s, i, e)) : --a;
                    return a || l.resolveWith(n, o), l.promise();
                }
            });
            var ge;
            Z.fn.ready = function(t) {
                return Z.ready.promise().done(t), this;
            }, Z.extend({
                isReady: !1,
                readyWait: 1,
                holdReady: function(t) {
                    t ? Z.readyWait++ : Z.ready(!0);
                },
                ready: function(t) {
                    (t === !0 ? --Z.readyWait : Z.isReady) || (Z.isReady = !0, t !== !0 && --Z.readyWait > 0 || (ge.resolveWith(K, [ Z ]), 
                    Z.fn.triggerHandler && (Z(K).triggerHandler("ready"), Z(K).off("ready"))));
                }
            }), Z.ready.promise = function(e) {
                return ge || (ge = Z.Deferred(), "complete" === K.readyState ? setTimeout(Z.ready) : (K.addEventListener("DOMContentLoaded", r, !1), 
                t.addEventListener("load", r, !1))), ge.promise(e);
            }, Z.ready.promise();
            var me = Z.access = function(t, e, i, n, s, o, r) {
                var a = 0, l = t.length, h = null == i;
                if ("object" === Z.type(i)) {
                    s = !0;
                    for (a in i) Z.access(t, e, a, i[a], !0, o, r);
                } else if (void 0 !== n && (s = !0, Z.isFunction(n) || (r = !0), h && (r ? (e.call(t, n), 
                e = null) : (h = e, e = function(t, e, i) {
                    return h.call(Z(t), i);
                })), e)) for (;l > a; a++) e(t[a], i, r ? n : n.call(t[a], a, e(t[a], i)));
                return s ? t : h ? e.call(t) : l ? e(t[0], i) : o;
            };
            Z.acceptData = function(t) {
                return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType;
            }, a.uid = 1, a.accepts = Z.acceptData, a.prototype = {
                key: function(t) {
                    if (!a.accepts(t)) return 0;
                    var e = {}, i = t[this.expando];
                    if (!i) {
                        i = a.uid++;
                        try {
                            e[this.expando] = {
                                value: i
                            }, Object.defineProperties(t, e);
                        } catch (n) {
                            e[this.expando] = i, Z.extend(t, e);
                        }
                    }
                    return this.cache[i] || (this.cache[i] = {}), i;
                },
                set: function(t, e, i) {
                    var n, s = this.key(t), o = this.cache[s];
                    if ("string" == typeof e) o[e] = i; else if (Z.isEmptyObject(o)) Z.extend(this.cache[s], e); else for (n in e) o[n] = e[n];
                    return o;
                },
                get: function(t, e) {
                    var i = this.cache[this.key(t)];
                    return void 0 === e ? i : i[e];
                },
                access: function(t, e, i) {
                    var n;
                    return void 0 === e || e && "string" == typeof e && void 0 === i ? (n = this.get(t, e), 
                    void 0 !== n ? n : this.get(t, Z.camelCase(e))) : (this.set(t, e, i), void 0 !== i ? i : e);
                },
                remove: function(t, e) {
                    var i, n, s, o = this.key(t), r = this.cache[o];
                    if (void 0 === e) this.cache[o] = {}; else {
                        Z.isArray(e) ? n = e.concat(e.map(Z.camelCase)) : (s = Z.camelCase(e), e in r ? n = [ e, s ] : (n = s, 
                        n = n in r ? [ n ] : n.match(de) || [])), i = n.length;
                        for (;i--; ) delete r[n[i]];
                    }
                },
                hasData: function(t) {
                    return !Z.isEmptyObject(this.cache[t[this.expando]] || {});
                },
                discard: function(t) {
                    t[this.expando] && delete this.cache[t[this.expando]];
                }
            };
            var ve = new a(), be = new a(), ye = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, we = /([A-Z])/g;
            Z.extend({
                hasData: function(t) {
                    return be.hasData(t) || ve.hasData(t);
                },
                data: function(t, e, i) {
                    return be.access(t, e, i);
                },
                removeData: function(t, e) {
                    be.remove(t, e);
                },
                _data: function(t, e, i) {
                    return ve.access(t, e, i);
                },
                _removeData: function(t, e) {
                    ve.remove(t, e);
                }
            }), Z.fn.extend({
                data: function(t, e) {
                    var i, n, s, o = this[0], r = o && o.attributes;
                    if (void 0 === t) {
                        if (this.length && (s = be.get(o), 1 === o.nodeType && !ve.get(o, "hasDataAttrs"))) {
                            for (i = r.length; i--; ) r[i] && (n = r[i].name, 0 === n.indexOf("data-") && (n = Z.camelCase(n.slice(5)), 
                            l(o, n, s[n])));
                            ve.set(o, "hasDataAttrs", !0);
                        }
                        return s;
                    }
                    return "object" == typeof t ? this.each(function() {
                        be.set(this, t);
                    }) : me(this, function(e) {
                        var i, n = Z.camelCase(t);
                        if (o && void 0 === e) {
                            if (i = be.get(o, t), void 0 !== i) return i;
                            if (i = be.get(o, n), void 0 !== i) return i;
                            if (i = l(o, n, void 0), void 0 !== i) return i;
                        } else this.each(function() {
                            var i = be.get(this, n);
                            be.set(this, n, e), -1 !== t.indexOf("-") && void 0 !== i && be.set(this, t, e);
                        });
                    }, null, e, arguments.length > 1, null, !0);
                },
                removeData: function(t) {
                    return this.each(function() {
                        be.remove(this, t);
                    });
                }
            }), Z.extend({
                queue: function(t, e, i) {
                    var n;
                    return t ? (e = (e || "fx") + "queue", n = ve.get(t, e), i && (!n || Z.isArray(i) ? n = ve.access(t, e, Z.makeArray(i)) : n.push(i)), 
                    n || []) : void 0;
                },
                dequeue: function(t, e) {
                    e = e || "fx";
                    var i = Z.queue(t, e), n = i.length, s = i.shift(), o = Z._queueHooks(t, e), r = function() {
                        Z.dequeue(t, e);
                    };
                    "inprogress" === s && (s = i.shift(), n--), s && ("fx" === e && i.unshift("inprogress"), 
                    delete o.stop, s.call(t, r, o)), !n && o && o.empty.fire();
                },
                _queueHooks: function(t, e) {
                    var i = e + "queueHooks";
                    return ve.get(t, i) || ve.access(t, i, {
                        empty: Z.Callbacks("once memory").add(function() {
                            ve.remove(t, [ e + "queue", i ]);
                        })
                    });
                }
            }), Z.fn.extend({
                queue: function(t, e) {
                    var i = 2;
                    return "string" != typeof t && (e = t, t = "fx", i--), arguments.length < i ? Z.queue(this[0], t) : void 0 === e ? this : this.each(function() {
                        var i = Z.queue(this, t, e);
                        Z._queueHooks(this, t), "fx" === t && "inprogress" !== i[0] && Z.dequeue(this, t);
                    });
                },
                dequeue: function(t) {
                    return this.each(function() {
                        Z.dequeue(this, t);
                    });
                },
                clearQueue: function(t) {
                    return this.queue(t || "fx", []);
                },
                promise: function(t, e) {
                    var i, n = 1, s = Z.Deferred(), o = this, r = this.length, a = function() {
                        --n || s.resolveWith(o, [ o ]);
                    };
                    for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; r--; ) i = ve.get(o[r], t + "queueHooks"), 
                    i && i.empty && (n++, i.empty.add(a));
                    return a(), s.promise(e);
                }
            });
            var xe = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, _e = [ "Top", "Right", "Bottom", "Left" ], Ce = function(t, e) {
                return t = e || t, "none" === Z.css(t, "display") || !Z.contains(t.ownerDocument, t);
            }, Te = /^(?:checkbox|radio)$/i;
            !function() {
                var t = K.createDocumentFragment(), e = t.appendChild(K.createElement("div")), i = K.createElement("input");
                i.setAttribute("type", "radio"), i.setAttribute("checked", "checked"), i.setAttribute("name", "t"), 
                e.appendChild(i), G.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, 
                e.innerHTML = "<textarea>x</textarea>", G.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue;
            }();
            var Pe = "undefined";
            G.focusinBubbles = "onfocusin" in t;
            var Ee = /^key/, ke = /^(?:mouse|pointer|contextmenu)|click/, Se = /^(?:focusinfocus|focusoutblur)$/, Ne = /^([^.]*)(?:\.(.+)|)$/;
            Z.event = {
                global: {},
                add: function(t, e, i, n, s) {
                    var o, r, a, l, h, c, u, p, d, f, g, m = ve.get(t);
                    if (m) for (i.handler && (o = i, i = o.handler, s = o.selector), i.guid || (i.guid = Z.guid++), 
                    (l = m.events) || (l = m.events = {}), (r = m.handle) || (r = m.handle = function(e) {
                        return typeof Z !== Pe && Z.event.triggered !== e.type ? Z.event.dispatch.apply(t, arguments) : void 0;
                    }), e = (e || "").match(de) || [ "" ], h = e.length; h--; ) a = Ne.exec(e[h]) || [], 
                    d = g = a[1], f = (a[2] || "").split(".").sort(), d && (u = Z.event.special[d] || {}, 
                    d = (s ? u.delegateType : u.bindType) || d, u = Z.event.special[d] || {}, c = Z.extend({
                        type: d,
                        origType: g,
                        data: n,
                        handler: i,
                        guid: i.guid,
                        selector: s,
                        needsContext: s && Z.expr.match.needsContext.test(s),
                        namespace: f.join(".")
                    }, o), (p = l[d]) || (p = l[d] = [], p.delegateCount = 0, u.setup && u.setup.call(t, n, f, r) !== !1 || t.addEventListener && t.addEventListener(d, r, !1)), 
                    u.add && (u.add.call(t, c), c.handler.guid || (c.handler.guid = i.guid)), s ? p.splice(p.delegateCount++, 0, c) : p.push(c), 
                    Z.event.global[d] = !0);
                },
                remove: function(t, e, i, n, s) {
                    var o, r, a, l, h, c, u, p, d, f, g, m = ve.hasData(t) && ve.get(t);
                    if (m && (l = m.events)) {
                        for (e = (e || "").match(de) || [ "" ], h = e.length; h--; ) if (a = Ne.exec(e[h]) || [], 
                        d = g = a[1], f = (a[2] || "").split(".").sort(), d) {
                            for (u = Z.event.special[d] || {}, d = (n ? u.delegateType : u.bindType) || d, p = l[d] || [], 
                            a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), r = o = p.length; o--; ) c = p[o], 
                            !s && g !== c.origType || i && i.guid !== c.guid || a && !a.test(c.namespace) || n && n !== c.selector && ("**" !== n || !c.selector) || (p.splice(o, 1), 
                            c.selector && p.delegateCount--, u.remove && u.remove.call(t, c));
                            r && !p.length && (u.teardown && u.teardown.call(t, f, m.handle) !== !1 || Z.removeEvent(t, d, m.handle), 
                            delete l[d]);
                        } else for (d in l) Z.event.remove(t, d + e[h], i, n, !0);
                        Z.isEmptyObject(l) && (delete m.handle, ve.remove(t, "events"));
                    }
                },
                trigger: function(e, i, n, s) {
                    var o, r, a, l, h, c, u, p = [ n || K ], d = Q.call(e, "type") ? e.type : e, f = Q.call(e, "namespace") ? e.namespace.split(".") : [];
                    if (r = a = n = n || K, 3 !== n.nodeType && 8 !== n.nodeType && !Se.test(d + Z.event.triggered) && (d.indexOf(".") >= 0 && (f = d.split("."), 
                    d = f.shift(), f.sort()), h = d.indexOf(":") < 0 && "on" + d, e = e[Z.expando] ? e : new Z.Event(d, "object" == typeof e && e), 
                    e.isTrigger = s ? 2 : 3, e.namespace = f.join("."), e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
                    e.result = void 0, e.target || (e.target = n), i = null == i ? [ e ] : Z.makeArray(i, [ e ]), 
                    u = Z.event.special[d] || {}, s || !u.trigger || u.trigger.apply(n, i) !== !1)) {
                        if (!s && !u.noBubble && !Z.isWindow(n)) {
                            for (l = u.delegateType || d, Se.test(l + d) || (r = r.parentNode); r; r = r.parentNode) p.push(r), 
                            a = r;
                            a === (n.ownerDocument || K) && p.push(a.defaultView || a.parentWindow || t);
                        }
                        for (o = 0; (r = p[o++]) && !e.isPropagationStopped(); ) e.type = o > 1 ? l : u.bindType || d, 
                        c = (ve.get(r, "events") || {})[e.type] && ve.get(r, "handle"), c && c.apply(r, i), 
                        c = h && r[h], c && c.apply && Z.acceptData(r) && (e.result = c.apply(r, i), e.result === !1 && e.preventDefault());
                        return e.type = d, s || e.isDefaultPrevented() || u._default && u._default.apply(p.pop(), i) !== !1 || !Z.acceptData(n) || h && Z.isFunction(n[d]) && !Z.isWindow(n) && (a = n[h], 
                        a && (n[h] = null), Z.event.triggered = d, n[d](), Z.event.triggered = void 0, a && (n[h] = a)), 
                        e.result;
                    }
                },
                dispatch: function(t) {
                    t = Z.event.fix(t);
                    var e, i, n, s, o, r = [], a = B.call(arguments), l = (ve.get(this, "events") || {})[t.type] || [], h = Z.event.special[t.type] || {};
                    if (a[0] = t, t.delegateTarget = this, !h.preDispatch || h.preDispatch.call(this, t) !== !1) {
                        for (r = Z.event.handlers.call(this, t, l), e = 0; (s = r[e++]) && !t.isPropagationStopped(); ) for (t.currentTarget = s.elem, 
                        i = 0; (o = s.handlers[i++]) && !t.isImmediatePropagationStopped(); ) (!t.namespace_re || t.namespace_re.test(o.namespace)) && (t.handleObj = o, 
                        t.data = o.data, n = ((Z.event.special[o.origType] || {}).handle || o.handler).apply(s.elem, a), 
                        void 0 !== n && (t.result = n) === !1 && (t.preventDefault(), t.stopPropagation()));
                        return h.postDispatch && h.postDispatch.call(this, t), t.result;
                    }
                },
                handlers: function(t, e) {
                    var i, n, s, o, r = [], a = e.delegateCount, l = t.target;
                    if (a && l.nodeType && (!t.button || "click" !== t.type)) for (;l !== this; l = l.parentNode || this) if (l.disabled !== !0 || "click" !== t.type) {
                        for (n = [], i = 0; a > i; i++) o = e[i], s = o.selector + " ", void 0 === n[s] && (n[s] = o.needsContext ? Z(s, this).index(l) >= 0 : Z.find(s, this, null, [ l ]).length), 
                        n[s] && n.push(o);
                        n.length && r.push({
                            elem: l,
                            handlers: n
                        });
                    }
                    return a < e.length && r.push({
                        elem: this,
                        handlers: e.slice(a)
                    }), r;
                },
                props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                fixHooks: {},
                keyHooks: {
                    props: "char charCode key keyCode".split(" "),
                    filter: function(t, e) {
                        return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), 
                        t;
                    }
                },
                mouseHooks: {
                    props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                    filter: function(t, e) {
                        var i, n, s, o = e.button;
                        return null == t.pageX && null != e.clientX && (i = t.target.ownerDocument || K, 
                        n = i.documentElement, s = i.body, t.pageX = e.clientX + (n && n.scrollLeft || s && s.scrollLeft || 0) - (n && n.clientLeft || s && s.clientLeft || 0), 
                        t.pageY = e.clientY + (n && n.scrollTop || s && s.scrollTop || 0) - (n && n.clientTop || s && s.clientTop || 0)), 
                        t.which || void 0 === o || (t.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), t;
                    }
                },
                fix: function(t) {
                    if (t[Z.expando]) return t;
                    var e, i, n, s = t.type, o = t, r = this.fixHooks[s];
                    for (r || (this.fixHooks[s] = r = ke.test(s) ? this.mouseHooks : Ee.test(s) ? this.keyHooks : {}), 
                    n = r.props ? this.props.concat(r.props) : this.props, t = new Z.Event(o), e = n.length; e--; ) i = n[e], 
                    t[i] = o[i];
                    return t.target || (t.target = K), 3 === t.target.nodeType && (t.target = t.target.parentNode), 
                    r.filter ? r.filter(t, o) : t;
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    focus: {
                        trigger: function() {
                            return this !== u() && this.focus ? (this.focus(), !1) : void 0;
                        },
                        delegateType: "focusin"
                    },
                    blur: {
                        trigger: function() {
                            return this === u() && this.blur ? (this.blur(), !1) : void 0;
                        },
                        delegateType: "focusout"
                    },
                    click: {
                        trigger: function() {
                            return "checkbox" === this.type && this.click && Z.nodeName(this, "input") ? (this.click(), 
                            !1) : void 0;
                        },
                        _default: function(t) {
                            return Z.nodeName(t.target, "a");
                        }
                    },
                    beforeunload: {
                        postDispatch: function(t) {
                            void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result);
                        }
                    }
                },
                simulate: function(t, e, i, n) {
                    var s = Z.extend(new Z.Event(), i, {
                        type: t,
                        isSimulated: !0,
                        originalEvent: {}
                    });
                    n ? Z.event.trigger(s, null, e) : Z.event.dispatch.call(e, s), s.isDefaultPrevented() && i.preventDefault();
                }
            }, Z.removeEvent = function(t, e, i) {
                t.removeEventListener && t.removeEventListener(e, i, !1);
            }, Z.Event = function(t, e) {
                return this instanceof Z.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, 
                this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && t.returnValue === !1 ? h : c) : this.type = t, 
                e && Z.extend(this, e), this.timeStamp = t && t.timeStamp || Z.now(), this[Z.expando] = !0, 
                void 0) : new Z.Event(t, e);
            }, Z.Event.prototype = {
                isDefaultPrevented: c,
                isPropagationStopped: c,
                isImmediatePropagationStopped: c,
                preventDefault: function() {
                    var t = this.originalEvent;
                    this.isDefaultPrevented = h, t && t.preventDefault && t.preventDefault();
                },
                stopPropagation: function() {
                    var t = this.originalEvent;
                    this.isPropagationStopped = h, t && t.stopPropagation && t.stopPropagation();
                },
                stopImmediatePropagation: function() {
                    var t = this.originalEvent;
                    this.isImmediatePropagationStopped = h, t && t.stopImmediatePropagation && t.stopImmediatePropagation(), 
                    this.stopPropagation();
                }
            }, Z.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, function(t, e) {
                Z.event.special[t] = {
                    delegateType: e,
                    bindType: e,
                    handle: function(t) {
                        var i, n = this, s = t.relatedTarget, o = t.handleObj;
                        return (!s || s !== n && !Z.contains(n, s)) && (t.type = o.origType, i = o.handler.apply(this, arguments), 
                        t.type = e), i;
                    }
                };
            }), G.focusinBubbles || Z.each({
                focus: "focusin",
                blur: "focusout"
            }, function(t, e) {
                var i = function(t) {
                    Z.event.simulate(e, t.target, Z.event.fix(t), !0);
                };
                Z.event.special[e] = {
                    setup: function() {
                        var n = this.ownerDocument || this, s = ve.access(n, e);
                        s || n.addEventListener(t, i, !0), ve.access(n, e, (s || 0) + 1);
                    },
                    teardown: function() {
                        var n = this.ownerDocument || this, s = ve.access(n, e) - 1;
                        s ? ve.access(n, e, s) : (n.removeEventListener(t, i, !0), ve.remove(n, e));
                    }
                };
            }), Z.fn.extend({
                on: function(t, e, i, n, s) {
                    var o, r;
                    if ("object" == typeof t) {
                        "string" != typeof e && (i = i || e, e = void 0);
                        for (r in t) this.on(r, e, i, t[r], s);
                        return this;
                    }
                    if (null == i && null == n ? (n = e, i = e = void 0) : null == n && ("string" == typeof e ? (n = i, 
                    i = void 0) : (n = i, i = e, e = void 0)), n === !1) n = c; else if (!n) return this;
                    return 1 === s && (o = n, n = function(t) {
                        return Z().off(t), o.apply(this, arguments);
                    }, n.guid = o.guid || (o.guid = Z.guid++)), this.each(function() {
                        Z.event.add(this, t, n, i, e);
                    });
                },
                one: function(t, e, i, n) {
                    return this.on(t, e, i, n, 1);
                },
                off: function(t, e, i) {
                    var n, s;
                    if (t && t.preventDefault && t.handleObj) return n = t.handleObj, Z(t.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), 
                    this;
                    if ("object" == typeof t) {
                        for (s in t) this.off(s, e, t[s]);
                        return this;
                    }
                    return (e === !1 || "function" == typeof e) && (i = e, e = void 0), i === !1 && (i = c), 
                    this.each(function() {
                        Z.event.remove(this, t, i, e);
                    });
                },
                trigger: function(t, e) {
                    return this.each(function() {
                        Z.event.trigger(t, e, this);
                    });
                },
                triggerHandler: function(t, e) {
                    var i = this[0];
                    return i ? Z.event.trigger(t, e, i, !0) : void 0;
                }
            });
            var Ie = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, De = /<([\w:]+)/, He = /<|&#?\w+;/, Ae = /<(?:script|style|link)/i, ze = /checked\s*(?:[^=]|=\s*.checked.)/i, Oe = /^$|\/(?:java|ecma)script/i, je = /^true\/(.*)/, Le = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, We = {
                option: [ 1, "<select multiple='multiple'>", "</select>" ],
                thead: [ 1, "<table>", "</table>" ],
                col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
                tr: [ 2, "<table><tbody>", "</tbody></table>" ],
                td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
                _default: [ 0, "", "" ]
            };
            We.optgroup = We.option, We.tbody = We.tfoot = We.colgroup = We.caption = We.thead, 
            We.th = We.td, Z.extend({
                clone: function(t, e, i) {
                    var n, s, o, r, a = t.cloneNode(!0), l = Z.contains(t.ownerDocument, t);
                    if (!(G.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || Z.isXMLDoc(t))) for (r = v(a), 
                    o = v(t), n = 0, s = o.length; s > n; n++) b(o[n], r[n]);
                    if (e) if (i) for (o = o || v(t), r = r || v(a), n = 0, s = o.length; s > n; n++) m(o[n], r[n]); else m(t, a);
                    return r = v(a, "script"), r.length > 0 && g(r, !l && v(t, "script")), a;
                },
                buildFragment: function(t, e, i, n) {
                    for (var s, o, r, a, l, h, c = e.createDocumentFragment(), u = [], p = 0, d = t.length; d > p; p++) if (s = t[p], 
                    s || 0 === s) if ("object" === Z.type(s)) Z.merge(u, s.nodeType ? [ s ] : s); else if (He.test(s)) {
                        for (o = o || c.appendChild(e.createElement("div")), r = (De.exec(s) || [ "", "" ])[1].toLowerCase(), 
                        a = We[r] || We._default, o.innerHTML = a[1] + s.replace(Ie, "<$1></$2>") + a[2], 
                        h = a[0]; h--; ) o = o.lastChild;
                        Z.merge(u, o.childNodes), o = c.firstChild, o.textContent = "";
                    } else u.push(e.createTextNode(s));
                    for (c.textContent = "", p = 0; s = u[p++]; ) if ((!n || -1 === Z.inArray(s, n)) && (l = Z.contains(s.ownerDocument, s), 
                    o = v(c.appendChild(s), "script"), l && g(o), i)) for (h = 0; s = o[h++]; ) Oe.test(s.type || "") && i.push(s);
                    return c;
                },
                cleanData: function(t) {
                    for (var e, i, n, s, o = Z.event.special, r = 0; void 0 !== (i = t[r]); r++) {
                        if (Z.acceptData(i) && (s = i[ve.expando], s && (e = ve.cache[s]))) {
                            if (e.events) for (n in e.events) o[n] ? Z.event.remove(i, n) : Z.removeEvent(i, n, e.handle);
                            ve.cache[s] && delete ve.cache[s];
                        }
                        delete be.cache[i[be.expando]];
                    }
                }
            }), Z.fn.extend({
                text: function(t) {
                    return me(this, function(t) {
                        return void 0 === t ? Z.text(this) : this.empty().each(function() {
                            (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = t);
                        });
                    }, null, t, arguments.length);
                },
                append: function() {
                    return this.domManip(arguments, function(t) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var e = p(this, t);
                            e.appendChild(t);
                        }
                    });
                },
                prepend: function() {
                    return this.domManip(arguments, function(t) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var e = p(this, t);
                            e.insertBefore(t, e.firstChild);
                        }
                    });
                },
                before: function() {
                    return this.domManip(arguments, function(t) {
                        this.parentNode && this.parentNode.insertBefore(t, this);
                    });
                },
                after: function() {
                    return this.domManip(arguments, function(t) {
                        this.parentNode && this.parentNode.insertBefore(t, this.nextSibling);
                    });
                },
                remove: function(t, e) {
                    for (var i, n = t ? Z.filter(t, this) : this, s = 0; null != (i = n[s]); s++) e || 1 !== i.nodeType || Z.cleanData(v(i)), 
                    i.parentNode && (e && Z.contains(i.ownerDocument, i) && g(v(i, "script")), i.parentNode.removeChild(i));
                    return this;
                },
                empty: function() {
                    for (var t, e = 0; null != (t = this[e]); e++) 1 === t.nodeType && (Z.cleanData(v(t, !1)), 
                    t.textContent = "");
                    return this;
                },
                clone: function(t, e) {
                    return t = null == t ? !1 : t, e = null == e ? t : e, this.map(function() {
                        return Z.clone(this, t, e);
                    });
                },
                html: function(t) {
                    return me(this, function(t) {
                        var e = this[0] || {}, i = 0, n = this.length;
                        if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
                        if ("string" == typeof t && !Ae.test(t) && !We[(De.exec(t) || [ "", "" ])[1].toLowerCase()]) {
                            t = t.replace(Ie, "<$1></$2>");
                            try {
                                for (;n > i; i++) e = this[i] || {}, 1 === e.nodeType && (Z.cleanData(v(e, !1)), 
                                e.innerHTML = t);
                                e = 0;
                            } catch (s) {}
                        }
                        e && this.empty().append(t);
                    }, null, t, arguments.length);
                },
                replaceWith: function() {
                    var t = arguments[0];
                    return this.domManip(arguments, function(e) {
                        t = this.parentNode, Z.cleanData(v(this)), t && t.replaceChild(e, this);
                    }), t && (t.length || t.nodeType) ? this : this.remove();
                },
                detach: function(t) {
                    return this.remove(t, !0);
                },
                domManip: function(t, e) {
                    t = $.apply([], t);
                    var i, n, s, o, r, a, l = 0, h = this.length, c = this, u = h - 1, p = t[0], g = Z.isFunction(p);
                    if (g || h > 1 && "string" == typeof p && !G.checkClone && ze.test(p)) return this.each(function(i) {
                        var n = c.eq(i);
                        g && (t[0] = p.call(this, i, n.html())), n.domManip(t, e);
                    });
                    if (h && (i = Z.buildFragment(t, this[0].ownerDocument, !1, this), n = i.firstChild, 
                    1 === i.childNodes.length && (i = n), n)) {
                        for (s = Z.map(v(i, "script"), d), o = s.length; h > l; l++) r = i, l !== u && (r = Z.clone(r, !0, !0), 
                        o && Z.merge(s, v(r, "script"))), e.call(this[l], r, l);
                        if (o) for (a = s[s.length - 1].ownerDocument, Z.map(s, f), l = 0; o > l; l++) r = s[l], 
                        Oe.test(r.type || "") && !ve.access(r, "globalEval") && Z.contains(a, r) && (r.src ? Z._evalUrl && Z._evalUrl(r.src) : Z.globalEval(r.textContent.replace(Le, "")));
                    }
                    return this;
                }
            }), Z.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function(t, e) {
                Z.fn[t] = function(t) {
                    for (var i, n = [], s = Z(t), o = s.length - 1, r = 0; o >= r; r++) i = r === o ? this : this.clone(!0), 
                    Z(s[r])[e](i), X.apply(n, i.get());
                    return this.pushStack(n);
                };
            });
            var Re, Me = {}, qe = /^margin/, Fe = new RegExp("^(" + xe + ")(?!px)[a-z%]+$", "i"), Be = function(e) {
                return e.ownerDocument.defaultView.opener ? e.ownerDocument.defaultView.getComputedStyle(e, null) : t.getComputedStyle(e, null);
            };
            !function() {
                function e() {
                    r.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", 
                    r.innerHTML = "", s.appendChild(o);
                    var e = t.getComputedStyle(r, null);
                    i = "1%" !== e.top, n = "4px" === e.width, s.removeChild(o);
                }
                var i, n, s = K.documentElement, o = K.createElement("div"), r = K.createElement("div");
                r.style && (r.style.backgroundClip = "content-box", r.cloneNode(!0).style.backgroundClip = "", 
                G.clearCloneStyle = "content-box" === r.style.backgroundClip, o.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", 
                o.appendChild(r), t.getComputedStyle && Z.extend(G, {
                    pixelPosition: function() {
                        return e(), i;
                    },
                    boxSizingReliable: function() {
                        return null == n && e(), n;
                    },
                    reliableMarginRight: function() {
                        var e, i = r.appendChild(K.createElement("div"));
                        return i.style.cssText = r.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", 
                        i.style.marginRight = i.style.width = "0", r.style.width = "1px", s.appendChild(o), 
                        e = !parseFloat(t.getComputedStyle(i, null).marginRight), s.removeChild(o), r.removeChild(i), 
                        e;
                    }
                }));
            }(), Z.swap = function(t, e, i, n) {
                var s, o, r = {};
                for (o in e) r[o] = t.style[o], t.style[o] = e[o];
                s = i.apply(t, n || []);
                for (o in e) t.style[o] = r[o];
                return s;
            };
            var $e = /^(none|table(?!-c[ea]).+)/, Xe = new RegExp("^(" + xe + ")(.*)$", "i"), Ue = new RegExp("^([+-])=(" + xe + ")", "i"), Ye = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            }, Ve = {
                letterSpacing: "0",
                fontWeight: "400"
            }, Qe = [ "Webkit", "O", "Moz", "ms" ];
            Z.extend({
                cssHooks: {
                    opacity: {
                        get: function(t, e) {
                            if (e) {
                                var i = x(t, "opacity");
                                return "" === i ? "1" : i;
                            }
                        }
                    }
                },
                cssNumber: {
                    columnCount: !0,
                    fillOpacity: !0,
                    flexGrow: !0,
                    flexShrink: !0,
                    fontWeight: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0
                },
                cssProps: {
                    "float": "cssFloat"
                },
                style: function(t, e, i, n) {
                    if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                        var s, o, r, a = Z.camelCase(e), l = t.style;
                        return e = Z.cssProps[a] || (Z.cssProps[a] = C(l, a)), r = Z.cssHooks[e] || Z.cssHooks[a], 
                        void 0 === i ? r && "get" in r && void 0 !== (s = r.get(t, !1, n)) ? s : l[e] : (o = typeof i, 
                        "string" === o && (s = Ue.exec(i)) && (i = (s[1] + 1) * s[2] + parseFloat(Z.css(t, e)), 
                        o = "number"), null != i && i === i && ("number" !== o || Z.cssNumber[a] || (i += "px"), 
                        G.clearCloneStyle || "" !== i || 0 !== e.indexOf("background") || (l[e] = "inherit"), 
                        r && "set" in r && void 0 === (i = r.set(t, i, n)) || (l[e] = i)), void 0);
                    }
                },
                css: function(t, e, i, n) {
                    var s, o, r, a = Z.camelCase(e);
                    return e = Z.cssProps[a] || (Z.cssProps[a] = C(t.style, a)), r = Z.cssHooks[e] || Z.cssHooks[a], 
                    r && "get" in r && (s = r.get(t, !0, i)), void 0 === s && (s = x(t, e, n)), "normal" === s && e in Ve && (s = Ve[e]), 
                    "" === i || i ? (o = parseFloat(s), i === !0 || Z.isNumeric(o) ? o || 0 : s) : s;
                }
            }), Z.each([ "height", "width" ], function(t, e) {
                Z.cssHooks[e] = {
                    get: function(t, i, n) {
                        return i ? $e.test(Z.css(t, "display")) && 0 === t.offsetWidth ? Z.swap(t, Ye, function() {
                            return E(t, e, n);
                        }) : E(t, e, n) : void 0;
                    },
                    set: function(t, i, n) {
                        var s = n && Be(t);
                        return T(t, i, n ? P(t, e, n, "border-box" === Z.css(t, "boxSizing", !1, s), s) : 0);
                    }
                };
            }), Z.cssHooks.marginRight = _(G.reliableMarginRight, function(t, e) {
                return e ? Z.swap(t, {
                    display: "inline-block"
                }, x, [ t, "marginRight" ]) : void 0;
            }), Z.each({
                margin: "",
                padding: "",
                border: "Width"
            }, function(t, e) {
                Z.cssHooks[t + e] = {
                    expand: function(i) {
                        for (var n = 0, s = {}, o = "string" == typeof i ? i.split(" ") : [ i ]; 4 > n; n++) s[t + _e[n] + e] = o[n] || o[n - 2] || o[0];
                        return s;
                    }
                }, qe.test(t) || (Z.cssHooks[t + e].set = T);
            }), Z.fn.extend({
                css: function(t, e) {
                    return me(this, function(t, e, i) {
                        var n, s, o = {}, r = 0;
                        if (Z.isArray(e)) {
                            for (n = Be(t), s = e.length; s > r; r++) o[e[r]] = Z.css(t, e[r], !1, n);
                            return o;
                        }
                        return void 0 !== i ? Z.style(t, e, i) : Z.css(t, e);
                    }, t, e, arguments.length > 1);
                },
                show: function() {
                    return k(this, !0);
                },
                hide: function() {
                    return k(this);
                },
                toggle: function(t) {
                    return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                        Ce(this) ? Z(this).show() : Z(this).hide();
                    });
                }
            }), Z.Tween = S, S.prototype = {
                constructor: S,
                init: function(t, e, i, n, s, o) {
                    this.elem = t, this.prop = i, this.easing = s || "swing", this.options = e, this.start = this.now = this.cur(), 
                    this.end = n, this.unit = o || (Z.cssNumber[i] ? "" : "px");
                },
                cur: function() {
                    var t = S.propHooks[this.prop];
                    return t && t.get ? t.get(this) : S.propHooks._default.get(this);
                },
                run: function(t) {
                    var e, i = S.propHooks[this.prop];
                    return this.pos = e = this.options.duration ? Z.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : t, 
                    this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
                    i && i.set ? i.set(this) : S.propHooks._default.set(this), this;
                }
            }, S.prototype.init.prototype = S.prototype, S.propHooks = {
                _default: {
                    get: function(t) {
                        var e;
                        return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (e = Z.css(t.elem, t.prop, ""), 
                        e && "auto" !== e ? e : 0) : t.elem[t.prop];
                    },
                    set: function(t) {
                        Z.fx.step[t.prop] ? Z.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[Z.cssProps[t.prop]] || Z.cssHooks[t.prop]) ? Z.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now;
                    }
                }
            }, S.propHooks.scrollTop = S.propHooks.scrollLeft = {
                set: function(t) {
                    t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now);
                }
            }, Z.easing = {
                linear: function(t) {
                    return t;
                },
                swing: function(t) {
                    return .5 - Math.cos(t * Math.PI) / 2;
                }
            }, Z.fx = S.prototype.init, Z.fx.step = {};
            var Ge, Ke, Je = /^(?:toggle|show|hide)$/, Ze = new RegExp("^(?:([+-])=|)(" + xe + ")([a-z%]*)$", "i"), ti = /queueHooks$/, ei = [ H ], ii = {
                "*": [ function(t, e) {
                    var i = this.createTween(t, e), n = i.cur(), s = Ze.exec(e), o = s && s[3] || (Z.cssNumber[t] ? "" : "px"), r = (Z.cssNumber[t] || "px" !== o && +n) && Ze.exec(Z.css(i.elem, t)), a = 1, l = 20;
                    if (r && r[3] !== o) {
                        o = o || r[3], s = s || [], r = +n || 1;
                        do a = a || ".5", r /= a, Z.style(i.elem, t, r + o); while (a !== (a = i.cur() / n) && 1 !== a && --l);
                    }
                    return s && (r = i.start = +r || +n || 0, i.unit = o, i.end = s[1] ? r + (s[1] + 1) * s[2] : +s[2]), 
                    i;
                } ]
            };
            Z.Animation = Z.extend(z, {
                tweener: function(t, e) {
                    Z.isFunction(t) ? (e = t, t = [ "*" ]) : t = t.split(" ");
                    for (var i, n = 0, s = t.length; s > n; n++) i = t[n], ii[i] = ii[i] || [], ii[i].unshift(e);
                },
                prefilter: function(t, e) {
                    e ? ei.unshift(t) : ei.push(t);
                }
            }), Z.speed = function(t, e, i) {
                var n = t && "object" == typeof t ? Z.extend({}, t) : {
                    complete: i || !i && e || Z.isFunction(t) && t,
                    duration: t,
                    easing: i && e || e && !Z.isFunction(e) && e
                };
                return n.duration = Z.fx.off ? 0 : "number" == typeof n.duration ? n.duration : n.duration in Z.fx.speeds ? Z.fx.speeds[n.duration] : Z.fx.speeds._default, 
                (null == n.queue || n.queue === !0) && (n.queue = "fx"), n.old = n.complete, n.complete = function() {
                    Z.isFunction(n.old) && n.old.call(this), n.queue && Z.dequeue(this, n.queue);
                }, n;
            }, Z.fn.extend({
                fadeTo: function(t, e, i, n) {
                    return this.filter(Ce).css("opacity", 0).show().end().animate({
                        opacity: e
                    }, t, i, n);
                },
                animate: function(t, e, i, n) {
                    var s = Z.isEmptyObject(t), o = Z.speed(e, i, n), r = function() {
                        var e = z(this, Z.extend({}, t), o);
                        (s || ve.get(this, "finish")) && e.stop(!0);
                    };
                    return r.finish = r, s || o.queue === !1 ? this.each(r) : this.queue(o.queue, r);
                },
                stop: function(t, e, i) {
                    var n = function(t) {
                        var e = t.stop;
                        delete t.stop, e(i);
                    };
                    return "string" != typeof t && (i = e, e = t, t = void 0), e && t !== !1 && this.queue(t || "fx", []), 
                    this.each(function() {
                        var e = !0, s = null != t && t + "queueHooks", o = Z.timers, r = ve.get(this);
                        if (s) r[s] && r[s].stop && n(r[s]); else for (s in r) r[s] && r[s].stop && ti.test(s) && n(r[s]);
                        for (s = o.length; s--; ) o[s].elem !== this || null != t && o[s].queue !== t || (o[s].anim.stop(i), 
                        e = !1, o.splice(s, 1));
                        (e || !i) && Z.dequeue(this, t);
                    });
                },
                finish: function(t) {
                    return t !== !1 && (t = t || "fx"), this.each(function() {
                        var e, i = ve.get(this), n = i[t + "queue"], s = i[t + "queueHooks"], o = Z.timers, r = n ? n.length : 0;
                        for (i.finish = !0, Z.queue(this, t, []), s && s.stop && s.stop.call(this, !0), 
                        e = o.length; e--; ) o[e].elem === this && o[e].queue === t && (o[e].anim.stop(!0), 
                        o.splice(e, 1));
                        for (e = 0; r > e; e++) n[e] && n[e].finish && n[e].finish.call(this);
                        delete i.finish;
                    });
                }
            }), Z.each([ "toggle", "show", "hide" ], function(t, e) {
                var i = Z.fn[e];
                Z.fn[e] = function(t, n, s) {
                    return null == t || "boolean" == typeof t ? i.apply(this, arguments) : this.animate(I(e, !0), t, n, s);
                };
            }), Z.each({
                slideDown: I("show"),
                slideUp: I("hide"),
                slideToggle: I("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(t, e) {
                Z.fn[t] = function(t, i, n) {
                    return this.animate(e, t, i, n);
                };
            }), Z.timers = [], Z.fx.tick = function() {
                var t, e = 0, i = Z.timers;
                for (Ge = Z.now(); e < i.length; e++) t = i[e], t() || i[e] !== t || i.splice(e--, 1);
                i.length || Z.fx.stop(), Ge = void 0;
            }, Z.fx.timer = function(t) {
                Z.timers.push(t), t() ? Z.fx.start() : Z.timers.pop();
            }, Z.fx.interval = 13, Z.fx.start = function() {
                Ke || (Ke = setInterval(Z.fx.tick, Z.fx.interval));
            }, Z.fx.stop = function() {
                clearInterval(Ke), Ke = null;
            }, Z.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, Z.fn.delay = function(t, e) {
                return t = Z.fx ? Z.fx.speeds[t] || t : t, e = e || "fx", this.queue(e, function(e, i) {
                    var n = setTimeout(e, t);
                    i.stop = function() {
                        clearTimeout(n);
                    };
                });
            }, function() {
                var t = K.createElement("input"), e = K.createElement("select"), i = e.appendChild(K.createElement("option"));
                t.type = "checkbox", G.checkOn = "" !== t.value, G.optSelected = i.selected, e.disabled = !0, 
                G.optDisabled = !i.disabled, t = K.createElement("input"), t.value = "t", t.type = "radio", 
                G.radioValue = "t" === t.value;
            }();
            var ni, si, oi = Z.expr.attrHandle;
            Z.fn.extend({
                attr: function(t, e) {
                    return me(this, Z.attr, t, e, arguments.length > 1);
                },
                removeAttr: function(t) {
                    return this.each(function() {
                        Z.removeAttr(this, t);
                    });
                }
            }), Z.extend({
                attr: function(t, e, i) {
                    var n, s, o = t.nodeType;
                    if (t && 3 !== o && 8 !== o && 2 !== o) return typeof t.getAttribute === Pe ? Z.prop(t, e, i) : (1 === o && Z.isXMLDoc(t) || (e = e.toLowerCase(), 
                    n = Z.attrHooks[e] || (Z.expr.match.bool.test(e) ? si : ni)), void 0 === i ? n && "get" in n && null !== (s = n.get(t, e)) ? s : (s = Z.find.attr(t, e), 
                    null == s ? void 0 : s) : null !== i ? n && "set" in n && void 0 !== (s = n.set(t, i, e)) ? s : (t.setAttribute(e, i + ""), 
                    i) : (Z.removeAttr(t, e), void 0));
                },
                removeAttr: function(t, e) {
                    var i, n, s = 0, o = e && e.match(de);
                    if (o && 1 === t.nodeType) for (;i = o[s++]; ) n = Z.propFix[i] || i, Z.expr.match.bool.test(i) && (t[n] = !1), 
                    t.removeAttribute(i);
                },
                attrHooks: {
                    type: {
                        set: function(t, e) {
                            if (!G.radioValue && "radio" === e && Z.nodeName(t, "input")) {
                                var i = t.value;
                                return t.setAttribute("type", e), i && (t.value = i), e;
                            }
                        }
                    }
                }
            }), si = {
                set: function(t, e, i) {
                    return e === !1 ? Z.removeAttr(t, i) : t.setAttribute(i, i), i;
                }
            }, Z.each(Z.expr.match.bool.source.match(/\w+/g), function(t, e) {
                var i = oi[e] || Z.find.attr;
                oi[e] = function(t, e, n) {
                    var s, o;
                    return n || (o = oi[e], oi[e] = s, s = null != i(t, e, n) ? e.toLowerCase() : null, 
                    oi[e] = o), s;
                };
            });
            var ri = /^(?:input|select|textarea|button)$/i;
            Z.fn.extend({
                prop: function(t, e) {
                    return me(this, Z.prop, t, e, arguments.length > 1);
                },
                removeProp: function(t) {
                    return this.each(function() {
                        delete this[Z.propFix[t] || t];
                    });
                }
            }), Z.extend({
                propFix: {
                    "for": "htmlFor",
                    "class": "className"
                },
                prop: function(t, e, i) {
                    var n, s, o, r = t.nodeType;
                    if (t && 3 !== r && 8 !== r && 2 !== r) return o = 1 !== r || !Z.isXMLDoc(t), o && (e = Z.propFix[e] || e, 
                    s = Z.propHooks[e]), void 0 !== i ? s && "set" in s && void 0 !== (n = s.set(t, i, e)) ? n : t[e] = i : s && "get" in s && null !== (n = s.get(t, e)) ? n : t[e];
                },
                propHooks: {
                    tabIndex: {
                        get: function(t) {
                            return t.hasAttribute("tabindex") || ri.test(t.nodeName) || t.href ? t.tabIndex : -1;
                        }
                    }
                }
            }), G.optSelected || (Z.propHooks.selected = {
                get: function(t) {
                    var e = t.parentNode;
                    return e && e.parentNode && e.parentNode.selectedIndex, null;
                }
            }), Z.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
                Z.propFix[this.toLowerCase()] = this;
            });
            var ai = /[\t\r\n\f]/g;
            Z.fn.extend({
                addClass: function(t) {
                    var e, i, n, s, o, r, a = "string" == typeof t && t, l = 0, h = this.length;
                    if (Z.isFunction(t)) return this.each(function(e) {
                        Z(this).addClass(t.call(this, e, this.className));
                    });
                    if (a) for (e = (t || "").match(de) || []; h > l; l++) if (i = this[l], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(ai, " ") : " ")) {
                        for (o = 0; s = e[o++]; ) n.indexOf(" " + s + " ") < 0 && (n += s + " ");
                        r = Z.trim(n), i.className !== r && (i.className = r);
                    }
                    return this;
                },
                removeClass: function(t) {
                    var e, i, n, s, o, r, a = 0 === arguments.length || "string" == typeof t && t, l = 0, h = this.length;
                    if (Z.isFunction(t)) return this.each(function(e) {
                        Z(this).removeClass(t.call(this, e, this.className));
                    });
                    if (a) for (e = (t || "").match(de) || []; h > l; l++) if (i = this[l], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(ai, " ") : "")) {
                        for (o = 0; s = e[o++]; ) for (;n.indexOf(" " + s + " ") >= 0; ) n = n.replace(" " + s + " ", " ");
                        r = t ? Z.trim(n) : "", i.className !== r && (i.className = r);
                    }
                    return this;
                },
                toggleClass: function(t, e) {
                    var i = typeof t;
                    return "boolean" == typeof e && "string" === i ? e ? this.addClass(t) : this.removeClass(t) : Z.isFunction(t) ? this.each(function(i) {
                        Z(this).toggleClass(t.call(this, i, this.className, e), e);
                    }) : this.each(function() {
                        if ("string" === i) for (var e, n = 0, s = Z(this), o = t.match(de) || []; e = o[n++]; ) s.hasClass(e) ? s.removeClass(e) : s.addClass(e); else (i === Pe || "boolean" === i) && (this.className && ve.set(this, "__className__", this.className), 
                        this.className = this.className || t === !1 ? "" : ve.get(this, "__className__") || "");
                    });
                },
                hasClass: function(t) {
                    for (var e = " " + t + " ", i = 0, n = this.length; n > i; i++) if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(ai, " ").indexOf(e) >= 0) return !0;
                    return !1;
                }
            });
            var li = /\r/g;
            Z.fn.extend({
                val: function(t) {
                    var e, i, n, s = this[0];
                    {
                        if (arguments.length) return n = Z.isFunction(t), this.each(function(i) {
                            var s;
                            1 === this.nodeType && (s = n ? t.call(this, i, Z(this).val()) : t, null == s ? s = "" : "number" == typeof s ? s += "" : Z.isArray(s) && (s = Z.map(s, function(t) {
                                return null == t ? "" : t + "";
                            })), e = Z.valHooks[this.type] || Z.valHooks[this.nodeName.toLowerCase()], e && "set" in e && void 0 !== e.set(this, s, "value") || (this.value = s));
                        });
                        if (s) return e = Z.valHooks[s.type] || Z.valHooks[s.nodeName.toLowerCase()], e && "get" in e && void 0 !== (i = e.get(s, "value")) ? i : (i = s.value, 
                        "string" == typeof i ? i.replace(li, "") : null == i ? "" : i);
                    }
                }
            }), Z.extend({
                valHooks: {
                    option: {
                        get: function(t) {
                            var e = Z.find.attr(t, "value");
                            return null != e ? e : Z.trim(Z.text(t));
                        }
                    },
                    select: {
                        get: function(t) {
                            for (var e, i, n = t.options, s = t.selectedIndex, o = "select-one" === t.type || 0 > s, r = o ? null : [], a = o ? s + 1 : n.length, l = 0 > s ? a : o ? s : 0; a > l; l++) if (i = n[l], 
                            !(!i.selected && l !== s || (G.optDisabled ? i.disabled : null !== i.getAttribute("disabled")) || i.parentNode.disabled && Z.nodeName(i.parentNode, "optgroup"))) {
                                if (e = Z(i).val(), o) return e;
                                r.push(e);
                            }
                            return r;
                        },
                        set: function(t, e) {
                            for (var i, n, s = t.options, o = Z.makeArray(e), r = s.length; r--; ) n = s[r], 
                            (n.selected = Z.inArray(n.value, o) >= 0) && (i = !0);
                            return i || (t.selectedIndex = -1), o;
                        }
                    }
                }
            }), Z.each([ "radio", "checkbox" ], function() {
                Z.valHooks[this] = {
                    set: function(t, e) {
                        return Z.isArray(e) ? t.checked = Z.inArray(Z(t).val(), e) >= 0 : void 0;
                    }
                }, G.checkOn || (Z.valHooks[this].get = function(t) {
                    return null === t.getAttribute("value") ? "on" : t.value;
                });
            }), Z.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(t, e) {
                Z.fn[e] = function(t, i) {
                    return arguments.length > 0 ? this.on(e, null, t, i) : this.trigger(e);
                };
            }), Z.fn.extend({
                hover: function(t, e) {
                    return this.mouseenter(t).mouseleave(e || t);
                },
                bind: function(t, e, i) {
                    return this.on(t, null, e, i);
                },
                unbind: function(t, e) {
                    return this.off(t, null, e);
                },
                delegate: function(t, e, i, n) {
                    return this.on(e, t, i, n);
                },
                undelegate: function(t, e, i) {
                    return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", i);
                }
            });
            var hi = Z.now(), ci = /\?/;
            Z.parseJSON = function(t) {
                return JSON.parse(t + "");
            }, Z.parseXML = function(t) {
                var e, i;
                if (!t || "string" != typeof t) return null;
                try {
                    i = new DOMParser(), e = i.parseFromString(t, "text/xml");
                } catch (n) {
                    e = void 0;
                }
                return (!e || e.getElementsByTagName("parsererror").length) && Z.error("Invalid XML: " + t), 
                e;
            };
            var ui = /#.*$/, pi = /([?&])_=[^&]*/, di = /^(.*?):[ \t]*([^\r\n]*)$/gm, fi = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, gi = /^(?:GET|HEAD)$/, mi = /^\/\//, vi = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, bi = {}, yi = {}, wi = "*/".concat("*"), xi = t.location.href, _i = vi.exec(xi.toLowerCase()) || [];
            Z.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: xi,
                    type: "GET",
                    isLocal: fi.test(_i[1]),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": wi,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },
                    contents: {
                        xml: /xml/,
                        html: /html/,
                        json: /json/
                    },
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText",
                        json: "responseJSON"
                    },
                    converters: {
                        "* text": String,
                        "text html": !0,
                        "text json": Z.parseJSON,
                        "text xml": Z.parseXML
                    },
                    flatOptions: {
                        url: !0,
                        context: !0
                    }
                },
                ajaxSetup: function(t, e) {
                    return e ? L(L(t, Z.ajaxSettings), e) : L(Z.ajaxSettings, t);
                },
                ajaxPrefilter: O(bi),
                ajaxTransport: O(yi),
                ajax: function(t, e) {
                    function i(t, e, i, r) {
                        var l, c, v, b, w, _ = e;
                        2 !== y && (y = 2, a && clearTimeout(a), n = void 0, o = r || "", x.readyState = t > 0 ? 4 : 0, 
                        l = t >= 200 && 300 > t || 304 === t, i && (b = W(u, x, i)), b = R(u, b, x, l), 
                        l ? (u.ifModified && (w = x.getResponseHeader("Last-Modified"), w && (Z.lastModified[s] = w), 
                        w = x.getResponseHeader("etag"), w && (Z.etag[s] = w)), 204 === t || "HEAD" === u.type ? _ = "nocontent" : 304 === t ? _ = "notmodified" : (_ = b.state, 
                        c = b.data, v = b.error, l = !v)) : (v = _, (t || !_) && (_ = "error", 0 > t && (t = 0))), 
                        x.status = t, x.statusText = (e || _) + "", l ? f.resolveWith(p, [ c, _, x ]) : f.rejectWith(p, [ x, _, v ]), 
                        x.statusCode(m), m = void 0, h && d.trigger(l ? "ajaxSuccess" : "ajaxError", [ x, u, l ? c : v ]), 
                        g.fireWith(p, [ x, _ ]), h && (d.trigger("ajaxComplete", [ x, u ]), --Z.active || Z.event.trigger("ajaxStop")));
                    }
                    "object" == typeof t && (e = t, t = void 0), e = e || {};
                    var n, s, o, r, a, l, h, c, u = Z.ajaxSetup({}, e), p = u.context || u, d = u.context && (p.nodeType || p.jquery) ? Z(p) : Z.event, f = Z.Deferred(), g = Z.Callbacks("once memory"), m = u.statusCode || {}, v = {}, b = {}, y = 0, w = "canceled", x = {
                        readyState: 0,
                        getResponseHeader: function(t) {
                            var e;
                            if (2 === y) {
                                if (!r) for (r = {}; e = di.exec(o); ) r[e[1].toLowerCase()] = e[2];
                                e = r[t.toLowerCase()];
                            }
                            return null == e ? null : e;
                        },
                        getAllResponseHeaders: function() {
                            return 2 === y ? o : null;
                        },
                        setRequestHeader: function(t, e) {
                            var i = t.toLowerCase();
                            return y || (t = b[i] = b[i] || t, v[t] = e), this;
                        },
                        overrideMimeType: function(t) {
                            return y || (u.mimeType = t), this;
                        },
                        statusCode: function(t) {
                            var e;
                            if (t) if (2 > y) for (e in t) m[e] = [ m[e], t[e] ]; else x.always(t[x.status]);
                            return this;
                        },
                        abort: function(t) {
                            var e = t || w;
                            return n && n.abort(e), i(0, e), this;
                        }
                    };
                    if (f.promise(x).complete = g.add, x.success = x.done, x.error = x.fail, u.url = ((t || u.url || xi) + "").replace(ui, "").replace(mi, _i[1] + "//"), 
                    u.type = e.method || e.type || u.method || u.type, u.dataTypes = Z.trim(u.dataType || "*").toLowerCase().match(de) || [ "" ], 
                    null == u.crossDomain && (l = vi.exec(u.url.toLowerCase()), u.crossDomain = !(!l || l[1] === _i[1] && l[2] === _i[2] && (l[3] || ("http:" === l[1] ? "80" : "443")) === (_i[3] || ("http:" === _i[1] ? "80" : "443")))), 
                    u.data && u.processData && "string" != typeof u.data && (u.data = Z.param(u.data, u.traditional)), 
                    j(bi, u, e, x), 2 === y) return x;
                    h = Z.event && u.global, h && 0 === Z.active++ && Z.event.trigger("ajaxStart"), 
                    u.type = u.type.toUpperCase(), u.hasContent = !gi.test(u.type), s = u.url, u.hasContent || (u.data && (s = u.url += (ci.test(s) ? "&" : "?") + u.data, 
                    delete u.data), u.cache === !1 && (u.url = pi.test(s) ? s.replace(pi, "$1_=" + hi++) : s + (ci.test(s) ? "&" : "?") + "_=" + hi++)), 
                    u.ifModified && (Z.lastModified[s] && x.setRequestHeader("If-Modified-Since", Z.lastModified[s]), 
                    Z.etag[s] && x.setRequestHeader("If-None-Match", Z.etag[s])), (u.data && u.hasContent && u.contentType !== !1 || e.contentType) && x.setRequestHeader("Content-Type", u.contentType), 
                    x.setRequestHeader("Accept", u.dataTypes[0] && u.accepts[u.dataTypes[0]] ? u.accepts[u.dataTypes[0]] + ("*" !== u.dataTypes[0] ? ", " + wi + "; q=0.01" : "") : u.accepts["*"]);
                    for (c in u.headers) x.setRequestHeader(c, u.headers[c]);
                    if (u.beforeSend && (u.beforeSend.call(p, x, u) === !1 || 2 === y)) return x.abort();
                    w = "abort";
                    for (c in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) x[c](u[c]);
                    if (n = j(yi, u, e, x)) {
                        x.readyState = 1, h && d.trigger("ajaxSend", [ x, u ]), u.async && u.timeout > 0 && (a = setTimeout(function() {
                            x.abort("timeout");
                        }, u.timeout));
                        try {
                            y = 1, n.send(v, i);
                        } catch (_) {
                            if (!(2 > y)) throw _;
                            i(-1, _);
                        }
                    } else i(-1, "No Transport");
                    return x;
                },
                getJSON: function(t, e, i) {
                    return Z.get(t, e, i, "json");
                },
                getScript: function(t, e) {
                    return Z.get(t, void 0, e, "script");
                }
            }), Z.each([ "get", "post" ], function(t, e) {
                Z[e] = function(t, i, n, s) {
                    return Z.isFunction(i) && (s = s || n, n = i, i = void 0), Z.ajax({
                        url: t,
                        type: e,
                        dataType: s,
                        data: i,
                        success: n
                    });
                };
            }), Z._evalUrl = function(t) {
                return Z.ajax({
                    url: t,
                    type: "GET",
                    dataType: "script",
                    async: !1,
                    global: !1,
                    "throws": !0
                });
            }, Z.fn.extend({
                wrapAll: function(t) {
                    var e;
                    return Z.isFunction(t) ? this.each(function(e) {
                        Z(this).wrapAll(t.call(this, e));
                    }) : (this[0] && (e = Z(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), 
                    e.map(function() {
                        for (var t = this; t.firstElementChild; ) t = t.firstElementChild;
                        return t;
                    }).append(this)), this);
                },
                wrapInner: function(t) {
                    return Z.isFunction(t) ? this.each(function(e) {
                        Z(this).wrapInner(t.call(this, e));
                    }) : this.each(function() {
                        var e = Z(this), i = e.contents();
                        i.length ? i.wrapAll(t) : e.append(t);
                    });
                },
                wrap: function(t) {
                    var e = Z.isFunction(t);
                    return this.each(function(i) {
                        Z(this).wrapAll(e ? t.call(this, i) : t);
                    });
                },
                unwrap: function() {
                    return this.parent().each(function() {
                        Z.nodeName(this, "body") || Z(this).replaceWith(this.childNodes);
                    }).end();
                }
            }), Z.expr.filters.hidden = function(t) {
                return t.offsetWidth <= 0 && t.offsetHeight <= 0;
            }, Z.expr.filters.visible = function(t) {
                return !Z.expr.filters.hidden(t);
            };
            var Ci = /%20/g, Ti = /\[\]$/, Pi = /\r?\n/g, Ei = /^(?:submit|button|image|reset|file)$/i, ki = /^(?:input|select|textarea|keygen)/i;
            Z.param = function(t, e) {
                var i, n = [], s = function(t, e) {
                    e = Z.isFunction(e) ? e() : null == e ? "" : e, n[n.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e);
                };
                if (void 0 === e && (e = Z.ajaxSettings && Z.ajaxSettings.traditional), Z.isArray(t) || t.jquery && !Z.isPlainObject(t)) Z.each(t, function() {
                    s(this.name, this.value);
                }); else for (i in t) M(i, t[i], e, s);
                return n.join("&").replace(Ci, "+");
            }, Z.fn.extend({
                serialize: function() {
                    return Z.param(this.serializeArray());
                },
                serializeArray: function() {
                    return this.map(function() {
                        var t = Z.prop(this, "elements");
                        return t ? Z.makeArray(t) : this;
                    }).filter(function() {
                        var t = this.type;
                        return this.name && !Z(this).is(":disabled") && ki.test(this.nodeName) && !Ei.test(t) && (this.checked || !Te.test(t));
                    }).map(function(t, e) {
                        var i = Z(this).val();
                        return null == i ? null : Z.isArray(i) ? Z.map(i, function(t) {
                            return {
                                name: e.name,
                                value: t.replace(Pi, "\r\n")
                            };
                        }) : {
                            name: e.name,
                            value: i.replace(Pi, "\r\n")
                        };
                    }).get();
                }
            }), Z.ajaxSettings.xhr = function() {
                try {
                    return new XMLHttpRequest();
                } catch (t) {}
            };
            var Si = 0, Ni = {}, Ii = {
                0: 200,
                1223: 204
            }, Di = Z.ajaxSettings.xhr();
            t.attachEvent && t.attachEvent("onunload", function() {
                for (var t in Ni) Ni[t]();
            }), G.cors = !!Di && "withCredentials" in Di, G.ajax = Di = !!Di, Z.ajaxTransport(function(t) {
                var e;
                return G.cors || Di && !t.crossDomain ? {
                    send: function(i, n) {
                        var s, o = t.xhr(), r = ++Si;
                        if (o.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields) for (s in t.xhrFields) o[s] = t.xhrFields[s];
                        t.mimeType && o.overrideMimeType && o.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                        for (s in i) o.setRequestHeader(s, i[s]);
                        e = function(t) {
                            return function() {
                                e && (delete Ni[r], e = o.onload = o.onerror = null, "abort" === t ? o.abort() : "error" === t ? n(o.status, o.statusText) : n(Ii[o.status] || o.status, o.statusText, "string" == typeof o.responseText ? {
                                    text: o.responseText
                                } : void 0, o.getAllResponseHeaders()));
                            };
                        }, o.onload = e(), o.onerror = e("error"), e = Ni[r] = e("abort");
                        try {
                            o.send(t.hasContent && t.data || null);
                        } catch (a) {
                            if (e) throw a;
                        }
                    },
                    abort: function() {
                        e && e();
                    }
                } : void 0;
            }), Z.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /(?:java|ecma)script/
                },
                converters: {
                    "text script": function(t) {
                        return Z.globalEval(t), t;
                    }
                }
            }), Z.ajaxPrefilter("script", function(t) {
                void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET");
            }), Z.ajaxTransport("script", function(t) {
                if (t.crossDomain) {
                    var e, i;
                    return {
                        send: function(n, s) {
                            e = Z("<script>").prop({
                                async: !0,
                                charset: t.scriptCharset,
                                src: t.url
                            }).on("load error", i = function(t) {
                                e.remove(), i = null, t && s("error" === t.type ? 404 : 200, t.type);
                            }), K.head.appendChild(e[0]);
                        },
                        abort: function() {
                            i && i();
                        }
                    };
                }
            });
            var Hi = [], Ai = /(=)\?(?=&|$)|\?\?/;
            Z.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function() {
                    var t = Hi.pop() || Z.expando + "_" + hi++;
                    return this[t] = !0, t;
                }
            }), Z.ajaxPrefilter("json jsonp", function(e, i, n) {
                var s, o, r, a = e.jsonp !== !1 && (Ai.test(e.url) ? "url" : "string" == typeof e.data && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && Ai.test(e.data) && "data");
                return a || "jsonp" === e.dataTypes[0] ? (s = e.jsonpCallback = Z.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, 
                a ? e[a] = e[a].replace(Ai, "$1" + s) : e.jsonp !== !1 && (e.url += (ci.test(e.url) ? "&" : "?") + e.jsonp + "=" + s), 
                e.converters["script json"] = function() {
                    return r || Z.error(s + " was not called"), r[0];
                }, e.dataTypes[0] = "json", o = t[s], t[s] = function() {
                    r = arguments;
                }, n.always(function() {
                    t[s] = o, e[s] && (e.jsonpCallback = i.jsonpCallback, Hi.push(s)), r && Z.isFunction(o) && o(r[0]), 
                    r = o = void 0;
                }), "script") : void 0;
            }), Z.parseHTML = function(t, e, i) {
                if (!t || "string" != typeof t) return null;
                "boolean" == typeof e && (i = e, e = !1), e = e || K;
                var n = re.exec(t), s = !i && [];
                return n ? [ e.createElement(n[1]) ] : (n = Z.buildFragment([ t ], e, s), s && s.length && Z(s).remove(), 
                Z.merge([], n.childNodes));
            };
            var zi = Z.fn.load;
            Z.fn.load = function(t, e, i) {
                if ("string" != typeof t && zi) return zi.apply(this, arguments);
                var n, s, o, r = this, a = t.indexOf(" ");
                return a >= 0 && (n = Z.trim(t.slice(a)), t = t.slice(0, a)), Z.isFunction(e) ? (i = e, 
                e = void 0) : e && "object" == typeof e && (s = "POST"), r.length > 0 && Z.ajax({
                    url: t,
                    type: s,
                    dataType: "html",
                    data: e
                }).done(function(t) {
                    o = arguments, r.html(n ? Z("<div>").append(Z.parseHTML(t)).find(n) : t);
                }).complete(i && function(t, e) {
                    r.each(i, o || [ t.responseText, e, t ]);
                }), this;
            }, Z.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(t, e) {
                Z.fn[e] = function(t) {
                    return this.on(e, t);
                };
            }), Z.expr.filters.animated = function(t) {
                return Z.grep(Z.timers, function(e) {
                    return t === e.elem;
                }).length;
            };
            var Oi = t.document.documentElement;
            Z.offset = {
                setOffset: function(t, e, i) {
                    var n, s, o, r, a, l, h, c = Z.css(t, "position"), u = Z(t), p = {};
                    "static" === c && (t.style.position = "relative"), a = u.offset(), o = Z.css(t, "top"), 
                    l = Z.css(t, "left"), h = ("absolute" === c || "fixed" === c) && (o + l).indexOf("auto") > -1, 
                    h ? (n = u.position(), r = n.top, s = n.left) : (r = parseFloat(o) || 0, s = parseFloat(l) || 0), 
                    Z.isFunction(e) && (e = e.call(t, i, a)), null != e.top && (p.top = e.top - a.top + r), 
                    null != e.left && (p.left = e.left - a.left + s), "using" in e ? e.using.call(t, p) : u.css(p);
                }
            }, Z.fn.extend({
                offset: function(t) {
                    if (arguments.length) return void 0 === t ? this : this.each(function(e) {
                        Z.offset.setOffset(this, t, e);
                    });
                    var e, i, n = this[0], s = {
                        top: 0,
                        left: 0
                    }, o = n && n.ownerDocument;
                    if (o) return e = o.documentElement, Z.contains(e, n) ? (typeof n.getBoundingClientRect !== Pe && (s = n.getBoundingClientRect()), 
                    i = q(o), {
                        top: s.top + i.pageYOffset - e.clientTop,
                        left: s.left + i.pageXOffset - e.clientLeft
                    }) : s;
                },
                position: function() {
                    if (this[0]) {
                        var t, e, i = this[0], n = {
                            top: 0,
                            left: 0
                        };
                        return "fixed" === Z.css(i, "position") ? e = i.getBoundingClientRect() : (t = this.offsetParent(), 
                        e = this.offset(), Z.nodeName(t[0], "html") || (n = t.offset()), n.top += Z.css(t[0], "borderTopWidth", !0), 
                        n.left += Z.css(t[0], "borderLeftWidth", !0)), {
                            top: e.top - n.top - Z.css(i, "marginTop", !0),
                            left: e.left - n.left - Z.css(i, "marginLeft", !0)
                        };
                    }
                },
                offsetParent: function() {
                    return this.map(function() {
                        for (var t = this.offsetParent || Oi; t && !Z.nodeName(t, "html") && "static" === Z.css(t, "position"); ) t = t.offsetParent;
                        return t || Oi;
                    });
                }
            }), Z.each({
                scrollLeft: "pageXOffset",
                scrollTop: "pageYOffset"
            }, function(e, i) {
                var n = "pageYOffset" === i;
                Z.fn[e] = function(s) {
                    return me(this, function(e, s, o) {
                        var r = q(e);
                        return void 0 === o ? r ? r[i] : e[s] : (r ? r.scrollTo(n ? t.pageXOffset : o, n ? o : t.pageYOffset) : e[s] = o, 
                        void 0);
                    }, e, s, arguments.length, null);
                };
            }), Z.each([ "top", "left" ], function(t, e) {
                Z.cssHooks[e] = _(G.pixelPosition, function(t, i) {
                    return i ? (i = x(t, e), Fe.test(i) ? Z(t).position()[e] + "px" : i) : void 0;
                });
            }), Z.each({
                Height: "height",
                Width: "width"
            }, function(t, e) {
                Z.each({
                    padding: "inner" + t,
                    content: e,
                    "": "outer" + t
                }, function(i, n) {
                    Z.fn[n] = function(n, s) {
                        var o = arguments.length && (i || "boolean" != typeof n), r = i || (n === !0 || s === !0 ? "margin" : "border");
                        return me(this, function(e, i, n) {
                            var s;
                            return Z.isWindow(e) ? e.document.documentElement["client" + t] : 9 === e.nodeType ? (s = e.documentElement, 
                            Math.max(e.body["scroll" + t], s["scroll" + t], e.body["offset" + t], s["offset" + t], s["client" + t])) : void 0 === n ? Z.css(e, i, r) : Z.style(e, i, n, r);
                        }, e, o ? n : void 0, o, null);
                    };
                });
            }), Z.fn.size = function() {
                return this.length;
            }, Z.fn.andSelf = Z.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
                return Z;
            });
            var ji = t.jQuery, Li = t.$;
            return Z.noConflict = function(e) {
                return t.$ === Z && (t.$ = Li), e && t.jQuery === Z && (t.jQuery = ji), Z;
            }, typeof e === Pe && (t.jQuery = t.$ = Z), Z;
        });
    }, {} ],
    14: [ function(t, e, i) {
        function n(t, e, i, n) {
            if (n.data.type) {
                var s = n.data.type, o = n.data.method || null, r = n.data.payload || n.data.data;
                s === t && o === e && i(r, n.source);
            }
        }
        i.send = function(t, e, i, n) {
            t.postMessage({
                type: e,
                method: i,
                data: n,
                payload: n
            }, "*");
        }, i.listen = function(t, e, i, s) {
            var o = n.bind(null, e, i, s);
            return t.addEventListener("message", o, !1), {
                target: t,
                handler: o
            };
        }, i.stop = function(t) {
            t.target.removeEventListener("message", t.handler, !1);
        };
    }, {} ],
    15: [ function(t, e) {
        function i(t) {
            this.win_ = t, this.listeners_ = [];
        }
        var n = t("./api");
        e.exports = function(t) {
            return new i(t);
        }, i.prototype.remove = function() {
            this.stop();
        }, i.prototype.send = function(t, e, i) {
            n.send(this.win_.parent, t, e, i);
        }, i.prototype.listen = function(t, e, i) {
            var s = n.listen(this.win_, t, e, i);
            return this.listeners_.push(s), s;
        }, i.prototype.stop = function(t) {
            this.listeners_ = this.listeners_.filter(function(e) {
                return t && t !== e ? !0 : (n.stop(e), !1);
            });
        };
    }, {
        "./api": 14
    } ],
    16: [ function(t, e) {
        function i(t) {
            this.api_ = n(t), this.engagement_ = s(t);
        }
        var n = t("../../lib/widget"), s = t("../engagement");
        e.exports = function(t) {
            return new i(t);
        }, i.prototype.remove = function() {
            this.api_.remove(), this.engagement_.remove();
        }, i.prototype.startImageUpload = function(t, e, i) {
            this.api_.send("asset", "image", {
                data: t,
                id: e || null,
                progress: !!i
            });
        }, i.prototype.onImageUpload = function(t, e) {
            var i = this.api_.listen("asset", "image", function(n) {
                e && e !== n.id || 1 === n.progress && (e && this.api_.stop(i), t(n.path));
            }.bind(this));
        }, i.prototype.onImageProgress = function(t, e) {
            var i = this.api_.listen("asset", "image", function(n) {
                return e && e !== n.id ? void 0 : 1 === n.progress ? (e && this.api_.stop(i), void 0) : (t(n.progress), 
                void 0);
            }.bind(this));
        }, i.prototype.uploadImage = function(t, e, i) {
            var n = "id-" + Math.floor(4294967295 * Math.random()) + Math.floor(4294967295 * Math.random());
            this.startImageUpload(t, n, !!i), this.onImageUpload(e, n), i && this.onImageProgress(i, n);
        };
    }, {
        "../../lib/widget": 15,
        "../engagement": 17
    } ],
    17: [ function(t, e) {
        function i(t) {
            this.iOSNative_ = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/.test(t.navigator.userAgent), 
            this.api_ = r(t), this.win_ = t, this.doc_ = t.document, this.engagementFinishedHandlerBound_ = this.engagementFinishedHandler_.bind(this), 
            this.engagementHandlerBound_ = this.engagementHandler_.bind(this), this.iOSNative_ ? (this.api_.listen("engagement", "blur", this.engagementFinishedHandlerBound_), 
            this.doc_.addEventListener("touchstart", this.engagementHandlerBound_)) : (this.win_.addEventListener("blur", this.engagementFinishedHandlerBound_), 
            this.doc_.addEventListener("mousedown", this.engagementHandlerBound_)), this.win_.addEventListener("unload", this.engagementFinishedHandlerBound_), 
            this.doc_.addEventListener("keypress", this.engagementHandlerBound_), this.lastEngagement_ = null, 
            this.engagementStartTime_ = null, this.inactivityTimeout_ = null;
        }
        function n(t) {
            var e;
            return t.__S9EngagementHandler ? (e = t.__S9EngagementHandler, e.count++) : (e = new i(t), 
            e.count = 1, t.__S9EngagementHandler = e), e;
        }
        function s(t) {
            return t.count;
        }
        function o(t, e) {
            t.count--, 0 == t.count && (e.__S9EngagementHandler = void 0);
        }
        var r = t("../../lib/widget");
        e.exports = function(t) {
            return n(t);
        }, i.prototype.ENGAGEMENT_THROTTLE_MS_ = 500, i.prototype.INACTIVITY_TIMEOUT_DURATION_MS_ = 6e5, 
        i.prototype.remove = function() {
            1 == s(this) && (this.api_.remove(), this.iOSNative_ ? this.doc_.removeEventListener("touchstart", this.engagementHandlerBound_, !1) : (this.win_.removeEventListener("blur", this.engagementFinishedHandlerBound_, !1), 
            this.doc_.removeEventListener("mousedown", this.engagementHandlerBound_, !1)), this.doc_.removeEventListener("keypress", this.engagementHandlerBound_, !1), 
            this.win_.removeEventListener("unload", this.engagementFinishedHandlerBound_, !1), 
            this.inactivityTimeout_ && clearTimeout(this.inactivityTimeout_)), o(this, this.win_);
        }, i.prototype.sendEngagement = function(t) {
            this.api_.send("analytics", "interaction", t);
        }, i.prototype.engagementFinishedHandler_ = function() {
            this.sendEngagementEnd_(new Date());
        }, i.prototype.engagementHandler_ = function() {
            var t = new Date();
            null === this.engagementStartTime_ && (this.engagementStartTime_ = t);
            var e = {
                category: "automatic",
                action: "engagement",
                value: t.getTime() - this.engagementStartTime_.getTime()
            };
            this.sendEngagementThrottled_(e);
        }, i.prototype.sendEngagementThrottled_ = function(t) {
            var e = new Date();
            (!this.lastEngagement_ || this.lastEngagement_ && e.getTime() - this.lastEngagement_.getTime() > this.ENGAGEMENT_THROTTLE_MS_) && (this.sendEngagement(t), 
            this.lastEngagement_ = e), this.inactivityTimeout_ && clearTimeout(this.inactivityTimeout_), 
            this.inactivityTimeout_ = setTimeout(function() {
                this.sendEngagementEnd_(this.lastEngagement_);
            }.bind(this), this.INACTIVITY_TIMEOUT_DURATION_MS_);
        }, i.prototype.sendEngagementEnd_ = function(t) {
            if (null != this.engagementStartTime_) {
                var e = t.getTime() - this.engagementStartTime_.getTime();
                this.sendEngagement({
                    category: "automatic",
                    action: "engagement_end",
                    value: e
                }), this.engagementStartTime_ = null;
            }
        };
    }, {
        "../../lib/widget": 15
    } ],
    18: [ function(t, e) {
        var i = t("./index"), n = t("inkling-widget-api/widget/configuration")(window);
        e.exports = function(t, e) {
            i(t, function(i, s) {
                if (i) return e(i, null);
                var o = t.buildParams || null, r = t.buildJSON || function(t) {
                    return t;
                };
                s.set = function(t) {
                    var e = r(t);
                    o ? n.set(o(e)) : (n.setJSON(e), n.set({}));
                }, e(null, s);
            });
        };
    }, {
        "./index": 19,
        "inkling-widget-api/widget/configuration": 22
    } ],
    19: [ function(t, e) {
        function i(t) {
            return Array.isArray(t) ? t.map(function(t) {
                return i(t);
            }) : "object" == typeof t ? Object.keys(t).reduce(function(e, i) {
                return e[i] = t[i], e;
            }, {}) : t;
        }
        var n = t("inkling-widget-api/widget/params")(window);
        e.exports = function(t, e) {
            var s = -1 !== [ "localhost", "svn.inkling.com" ].indexOf(document.location.hostname), o = t.parseParams, r = t.parseJSON || function(t) {
                return t;
            }, a = s ? t.defaults : null;
            n.getJSON(function(t, s) {
                var l = null;
                if (!t) {
                    var h = n.get();
                    l = s ? s : 0 !== Object.keys(h).length ? o(h) : a || {}, l = r(l);
                }
                e(t, t ? null : {
                    get: function() {
                        return i(l);
                    }
                });
            });
        };
    }, {
        "inkling-widget-api/widget/params": 24
    } ],
    20: [ function(t, e) {
        e.exports = t(14);
    }, {} ],
    21: [ function(t, e) {
        e.exports = t(15);
    }, {
        "./api": 20
    } ],
    22: [ function(t, e) {
        function i(t) {
            this.api_ = n(t), this.params_ = s(t), this.engagement_ = o(t);
        }
        var n = t("../../lib/widget"), s = t("../params/index"), o = t("../engagement");
        e.exports = function(t) {
            return new i(t);
        }, i.prototype.remove = function() {
            this.api_.remove(), this.params_.remove(), this.engagement_.remove();
        }, i.prototype.get = function() {
            return this.params_.get();
        }, i.prototype.set = function(t) {
            this.api_.send("configuration", "set", t);
        }, i.prototype.getJSON = function(t) {
            this.params_.getJSON(t);
        }, i.prototype.setJSON = function(t) {
            this.api_.send("configuration", "file", t);
        };
    }, {
        "../../lib/widget": 21,
        "../engagement": 23,
        "../params/index": 24
    } ],
    23: [ function(t, e) {
        e.exports = t(17);
    }, {
        "../../lib/widget": 21
    } ],
    24: [ function(t, e) {
        function i(t) {
            this.win_ = t, this.engagement_ = o(t);
        }
        function n(t) {
            return t.slice(1).split("&").reduce(function(t, e) {
                var i = e.split("="), n = decodeURIComponent(i[0]), s = i.length > 1 ? decodeURIComponent(i[1]) : null;
                return n && (t[n] = s), t;
            }, {});
        }
        var s = "configFile", o = t("../engagement");
        e.exports = function(t) {
            return new i(t);
        }, i.prototype.remove = function() {
            this.engagement_.remove();
        }, i.prototype.get = function() {
            var t = n(this.win_.location.search);
            return Object.keys(t).reduce(function(e, i) {
                return i !== s && (e[i] = t[i]), e;
            }, {});
        }, i.prototype.getJSON = function(t) {
            var e = n(this.win_.location.search)[s];
            if (!e) return t(null, null), void 0;
            var i = new XMLHttpRequest();
            i.onreadystatechange = function() {
                if (4 === i.readyState) if (200 === i.status || 0 === i.status) {
                    var e = null;
                    try {
                        e = JSON.parse(i.responseText);
                    } catch (n) {}
                    t(e ? null : new Error("Failed to parse the JSON config file."), e);
                } else t(new Error("Failed to load config file."), null);
            }, i.open("GET", e, !0), i.send();
        };
    }, {
        "../engagement": 23
    } ],
    25: [ function(t, e, i) {
        var n = t("inkling-jquery");
        i.defaults = t("./defaults"), i.parseParams = function(t) {
            var e = {
                title: t.title,
                question: t.question,
                hint: t.hint,
                correct: t.correct,
                answers: null,
                shuffle: "true" === t.shuffle,
                imgSrc: t.imgSrc
            };
            try {
                e.answers = n.parseJSON(t.answers);
            } catch (i) {}
            return e;
        }, i.parseJSON = function(t) {
            if (n.isEmptyObject(t)) return {
                title: "",
                question: "Edit this widget and replace this question with your own content.",
                hint: "",
                correct: "answer1",
                answers: [ {
                    answer: "The first answer.",
                    optionalText: ""
                }, {
                    answer: "The second answer.",
                    optionalText: ""
                } ],
                shuffle: !1,
                imgSrc: ""
            };
            var e = Array.isArray(t.answers) ? t.answers.map(function(t) {
                return {
                    answer: t.answer || "",
                    optionalText: t.optionalText || ""
                };
            }) : [ {
                answer: "",
                optionalText: ""
            } ];
            return {
                title: t.title || "",
                question: t.question || "",
                hint: t.hint || "",
                correct: t.correct || "",
                answers: e,
                shuffle: "boolean" == typeof t.shuffle ? t.shuffle : !1,
                imgSrc: t.imgSrc || ""
            };
        };
    }, {
        "./defaults": 26,
        "inkling-jquery": 12
    } ],
    26: [ function(t, e) {
        e.exports = {
            title: "Question 1",
            question: "In photosynthesis, plants use carbon from _______ to make sugar and other organic molecules.",
            answers: [ {
                optionalText: "The nucleaus should be identifiable by the nuclear envelope, the double-membrane that surrounds it.",
                answer: "water"
            }, {
                optionalText: "Less than 1% of the atmosphere is CO2, but that is enough to support photosynthesiLess than 1% of the atmosphere is CO2, but that is enough to support photosynthesisLess than 1% of the atmosphere is CO2, but that is enough to support photosynthesisLess than 1% of the atmosphere is CO2, but that is enough to support photosynthesisLess than 1% of the atmosphere is CO2, but that is enough to support photosynthesisLess than 1% of the atmosphere is CO2, but that is enough to support photosynthesiss.",
                answer: "carbon dioxide"
            }, {
                optionalText: "The nucleaus should be identifiable by the nuclear envelope, the double-membrane that surrounds it.",
                answer: "cholorphyll"
            }, {
                optionalText: "The nucleaus should be identifiable by the nuclear envelope, the double-membrane that surrounds it.",
                answer: "the Sun"
            }, {
                optionalText: "The nucleaus should be identifiable by the nuclear envelope, the double-membrane that surrounds it.The nucleaus should be identifiable by the nuclear envelope, the double-membrane that surrounds it.e nucleaus should be identifiable by the nuclear envelope, the double-membrane that surrounds it.The nucleaus should be identifiable by the nuclear envelope, the double-membrane that surrounds it.e nucleaus should be identifiable by the nuclear envelope, the double-membrane that surrounds it.The nucleaus should be identifiable by the nucleaus should be identifiable by the nuclear envelope, the double-membrane that surrounds it.The nucleaus should be identifiable by the nuclear envelope, the double-membrane that surrounds it.e nuclear envelope, the double-membrane that surrounds it.",
                answer: "soil"
            } ],
            hint: "see page gjk;afhaijfi;ajf;ajf;aejfi;oaejf;iajsd;flkasdkf;jakls;jf;lksadjf;lkasdjf;lakjf;klajdfkl;4",
            correct: "answer2",
            shuffle: !0,
            imgSrc: ""
        };
    }, {} ],
    27: [ function(t) {
        (function(e) {
            function i() {
                g("#imageGroup").css("display", "table"), g(".imageEditor").addClass("disabled"), 
                g(".imageEditor").removeClass("enabled"), document.getElementById("imagePicker").disabled = !0, 
                g(".imageEditor").removeAttr("name");
            }
            function n() {
                for (var t = 0; t < m.answers.length; t++) {
                    var n = {
                        answerData: [ {
                            number: t + 1,
                            enumeration: e.enumerations[t],
                            answer: m.answers[t].answer,
                            optionalText: m.answers[t].optionalText
                        } ]
                    };
                    g(".answer_set").append(y(n)), e.numAnswers++, g(".answer" + (t + 1)).data("number", t + 1);
                }
                if (g("#question textarea").val(m.question), g("#question .promptText")[0].innerHTML = "Hint", 
                g(".answer_set .promptText").each(function() {
                    g(this).html("Not Quite"), g(this).addClass("incorrect");
                }), g("#question .optionalText").val(m.hint), m.correct) {
                    var l = g("." + m.correct);
                    g("." + m.correct + " .switch input").attr("checked", "true"), l.find(".promptText").html("That's Correct!"), 
                    l.find(".promptText").removeClass("incorrect"), l.find(".promptText").addClass("correct");
                }
                m.shuffle && g(".panel .checkbox input").attr("checked", "true"), g("textarea").each(function() {
                    g(this).css("height", g(this)[0].scrollHeight + 2 + "px");
                }), g("input, textarea").on("input", function() {
                    g(this).css("height", "auto"), g(this).css("height", g(this)[0].scrollHeight + 2 + "px"), 
                    v();
                }), g("#addButton").click(function(t) {
                    t.stopPropagation(), h();
                }), g(".panel .checkbox").click(function() {
                    v();
                }), g(".sortable").on("sortupdate", function() {
                    var t = 0;
                    g(".answer_set .btnEdit").each(function() {
                        g(this).data("number", ++t);
                    });
                    var i = 0;
                    g(".answer_set .btnEdit .enumeration").each(function() {
                        g(this).text(e.enumerations[i++]);
                    }), v();
                }), m.imgSrc ? (g(".image").html(g("<img />", {
                    src: m.imgSrc,
                    id: "imageContainer"
                })), i(), u(), c()) : f(), g(".answer_set").delegate(".btn-trash", "click", function() {
                    g(this).parent().remove(), e.numAnswers--, e.numAnswers < 8 && g("#addButton").css("display", "inline-block"), 
                    o(), v(), g(this).hasClass("correct_answer") || s();
                }), a(), r();
            }
            function s() {
                0 === g(".btnEdit input:checkbox:checked").length && p("Warning: you have not set a correct answer!");
            }
            function o() {
                var t = 0;
                g(".answer_set .btnEdit .enumeration").each(function() {
                    g(this).text(e.enumerations[t++]);
                });
                var i = 0;
                g(".answer_set .btnEdit").each(function() {
                    var t = g(this);
                    g.each(g(this)[0].classList, function(e, i) {
                        i.indexOf("answer") > -1 && t.removeClass(i);
                    }), g(this).addClass("answer" + (i + 1)), g(this).data("number", ++i);
                });
            }
            function r() {
                g(".answerBlock").hover(function() {
                    g(this).find(".btn-trash").stop(!0, !0).animate({
                        opacity: 1
                    });
                }, function() {
                    g(this).find(".btn-trash").animate({
                        opacity: 0
                    });
                });
            }
            function a() {
                g(".answer_set").delegate(".check", "click", function() {
                    var t = g(this);
                    0 !== g(this).parents(".btnEdit").find("input.check:checked").length ? (g(this).parents(".btnEdit").find(".promptText").removeClass("incorrect"), 
                    g(this).parents(".btnEdit").find(".promptText").addClass("correct"), g(this).parents(".btnEdit").find(".promptText").html("That's Correct!")) : (g(this).parents(".btnEdit").find(".promptText").addClass("incorrect"), 
                    g(this).parents(".btnEdit").find(".promptText").removeClass("correct"), g(this).parents(".btnEdit").find(".promptText").html("Not Quite")), 
                    g(".btnEdit input:checkbox:checked").each(function() {
                        return g(this)[0] !== t[0] ? (g(this).attr("checked", !1), g(this).parents(".btnEdit").find(".promptText").removeClass("correct"), 
                        g(this).parents(".btnEdit").find(".promptText").addClass("incorrect"), g(this).parents(".btnEdit").find(".promptText").html("Not Quite"), 
                        !1) : void 0;
                    }), s(), v();
                });
            }
            function l() {
                var t, e = [], i = 1;
                g(".answerBlock").each(function() {
                    t = g(this).find(".answerInput").val();
                    var n = g(this).find(".optionalText").val();
                    e.push({
                        answer: t,
                        optionalText: n
                    }), i++;
                });
                var n = g(".btnEdit input:checkbox:checked").parents(".btnEdit").data("number"), s = n ? "answer" + n : "";
                return {
                    question: g("#question .answerInput").val(),
                    answers: e,
                    title: m.title,
                    hint: g("#question .optionalText").val(),
                    correct: s,
                    shuffle: 1 === g(".panel input:checkbox:checked").length,
                    imgSrc: m.imgSrc ? m.imgSrc : ""
                };
            }
            function h() {
                var t = {
                    answerData: [ {
                        number: e.numAnswers + 1,
                        enumeration: e.enumerations[e.numAnswers],
                        answer: ""
                    } ]
                }, i = y(t);
                g(".answer_set").append(i), g(".sortable").sortable("refresh"), g(".answer" + (e.numAnswers + 1) + " .promptText").html("Not Quite"), 
                g(".answer" + (e.numAnswers + 1) + " .promptText").addClass("incorrect"), r(), g(".answer" + (e.numAnswers + 1)).data("number", e.numAnswers + 1), 
                g("input, textarea").on("input", function() {
                    g(this).css("height", "auto"), g(this).css("height", g(this)[0].scrollHeight + 2 + "px"), 
                    v();
                }), e.numAnswers++, v(), e.numAnswers >= 8 && g("#addButton").css("display", "none");
            }
            function c() {
                g(".btn-delete").click(function() {
                    g("#imageGroup").fadeOut(150, function() {
                        g("#imageGroup").css("display", "none"), g("#imageContainer")[0].src = "";
                    }), g(".imageEditor").removeClass("disabled"), g(".imageEditor").addClass("enabled"), 
                    g(".imageEditor").attr("name", "Add Image"), document.getElementById("imagePicker").disabled = !1, 
                    m.imgSrc = "", v(), f();
                });
            }
            function u() {
                g("#swapButton").change(function() {
                    var t = document.getElementById("swapButton").files[0];
                    t && (g("#imageContainer").fadeOut(400), g(".image").append(w), d(t));
                });
            }
            function p(t) {
                var e = g(".overlay-mask"), i = g(".dialog-box");
                i.show(), e.addClass("overlay-mask-visible");
                var n = g(".confirmDelete"), s = g(".cancelDelete");
                g(".dialogText h4").html(t), n.on("click", function() {
                    g(this).off("click"), g(".confirmation").hide(), g(".overlay-mask").removeClass("overlay-mask-visible");
                }), s.on("click", function() {
                    n.off("click"), g(".confirmation").hide(), e.removeClass("overlay-mask-visible");
                });
            }
            function d(t) {
                b.uploadImage(t, function(t) {
                    if (t) {
                        m.imgSrc = t;
                        var e = g("#imageContainer");
                        e[0].src = t, e.fadeIn(500), g(".load-container").fadeOut(500, function() {
                            g(".load-container").remove();
                        }), v();
                    }
                }.bind(this), function(t) {
                    var e = 100 * t;
                    g(".load-progress").width(e + "%");
                }.bind(this));
            }
            function f() {
                g("#imagePicker").change(function() {
                    var t = document.getElementById("imagePicker").files[0];
                    t && (i(), g(".image").append(w), d(t)), g(this).val(""), c(), u();
                });
            }
            var g = window.$ = t("inkling-jquery");
            t("../widget_template/js/editor.js");
            var m, v, b = t("inkling-widget-api/widget/asset")(window), y = t("../templates/answer_editor.hbs");
            t("inkling-widget-config/editor")(t("./config"), function(t, e) {
                var i = e.get();
                m = i, v = function() {
                    e.set(l());
                }, g(function() {
                    n();
                });
            });
            var m;
            e.enumerations = [ "A", "B", "C", "D", "E", "F", "G", "H" ], e.numAnswers = 0;
            var w = '<span class="load-container"><span class="load-progress"></span></span>';
        }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
        "../templates/answer_editor.hbs": 28,
        "../widget_template/js/editor.js": 29,
        "./config": 25,
        "inkling-jquery": 12,
        "inkling-widget-api/widget/asset": 16,
        "inkling-widget-config/editor": 18
    } ],
    28: [ function(t, e) {
        var i = t("inkling-handlebars/runtime");
        e.exports = i.template(function(t, e, i, n, s) {
            function o(t, e) {
                var n, s, o = "";
                return o += '\n    <div class="answerBlock">\n        <li class="btnEdit answer', 
                (s = i.number) ? n = s.call(t, {
                    hash: {},
                    data: e
                }) : (s = t && t.number, n = typeof s === l ? s.call(t, {
                    hash: {},
                    data: e
                }) : s), o += h(n) + '"><span class="enumeration">', (s = i.enumeration) ? n = s.call(t, {
                    hash: {},
                    data: e
                }) : (s = t && t.enumeration, n = typeof s === l ? s.call(t, {
                    hash: {},
                    data: e
                }) : s), o += h(n) + '</span>\n        <label class="switch"><input type="checkbox" class="check" /><span class="switch-label"></span></label>\n            <textarea class="answerInput" placeholder = "Add Answer" rows="1">', 
                (s = i.answer) ? n = s.call(t, {
                    hash: {},
                    data: e
                }) : (s = t && t.answer, n = typeof s === l ? s.call(t, {
                    hash: {},
                    data: e
                }) : s), o += h(n) + '</textarea>\n\n            <div class="promptText"></div>\n            <textarea class="optionalText"placeholder="Add Feedback (Optional)" rows= "1">', 
                (s = i.optionalText) ? n = s.call(t, {
                    hash: {},
                    data: e
                }) : (s = t && t.optionalText, n = typeof s === l ? s.call(t, {
                    hash: {},
                    data: e
                }) : s), o += h(n) + '</textarea>\n        </li>\n        <button class="button btn-trash" name="Delete Choice"></button>\n    </div>\n';
            }
            this.compilerInfo = [ 4, ">= 1.0.0" ], i = this.merge(i, t.helpers), s = s || {};
            var r, a = "", l = "function", h = this.escapeExpression, c = this;
            return r = i.each.call(e, e && e.answerData, {
                hash: {},
                inverse: c.noop,
                fn: c.program(1, o, s),
                data: s
            }), (r || 0 === r) && (a += r), a += "\n";
        });
    }, {
        "inkling-handlebars/runtime": 9
    } ],
    29: [ function(t) {
        (function(e) {
            function i() {
                s("html").click(function() {
                    s(".select-menu--faux .select-menu-list").fadeOut(100);
                }), s(".select-menu").each(function() {
                    var t;
                    t = '<ul class="select-menu--faux"><li class="selected-value">select menu</li> <ul class="select-menu-list">', 
                    s(this).children("option").each(function() {
                        t += s(this).is(":selected") ? '<li class="select-menu-option option--selected" data-value="' + this.value + '">' + this.text + "</li>" : '<li class="select-menu-option" data-value="' + this.value + '">' + this.text + "</li>";
                    }), t += "</ul></span>", s(this).after(t), s(this).next().children(".selected-value").text(s(this).children(":selected").text());
                }), s(".select-menu--faux").click(function() {
                    event.stopPropagation();
                }), s(".selected-value").click(function() {
                    s(this).parent().addClass("menu--active"), s(this).siblings(".select-menu-list").fadeIn(100);
                }), s(".select-menu-option").click(function() {
                    var t = s(this).text(), e = s(this).attr("data-value");
                    s(this).siblings().removeClass("option--selected"), s(this).addClass("option--selected"), 
                    s(this).parent().siblings(".selected-value").text(t), s(this).parent().parent().prev().val(e), 
                    s(this).parents(".select-menu--faux").removeClass("menu--active"), s(this).parent(".select-menu-list").delay(200).fadeOut(100);
                });
            }
            function n() {
                s(".sortable").sortableMenu(), s(".selectable").selectableMenu(), s(".editable li").editableMenu(), 
                s(".btn-edit").on("click", function() {
                    s(this).siblings(".inner-text").attr("contentEditable", !0).focus(), s(this).parent().addClass("editing");
                }), s(".panel").panelTabs(), i();
            }
            var s = t("inkling-jquery");
            t("inkling-jquery-ui")(s);
            var o = s;
            !function(t) {
                t.fn.sortableMenu = function() {
                    return this.sortable({
                        placeholder: "sort-placeholder",
                        update: function() {
                            var i = 0;
                            t(".answer_set .btnEdit").each(function() {
                                t(this).data("number", ++i);
                            });
                            var n = 0;
                            t(".answer_set .btnEdit .enumeration").each(function() {
                                t(this).text(e.enumerations[n++]);
                            });
                        },
                        stop: function(t, e) {
                            e.item.height("auto");
                        }
                    }), t(".sort-placeholder").css({
                        height: t(".btnEdit").height(),
                        "margin-top": t(".btnEdit").css("margin-top")
                    }), this.mousedown(function() {
                        t(this).parents(".panel-content").css({
                            overflow: "hidden"
                        });
                    }), this.on("sortstart", function(e) {
                        t(".sort-placeholder").css("height", t(e.toElement).css("height"));
                    }), this;
                };
            }(o), function(t) {
                t.prototype.selectableMenu = function() {
                    return this.selectable(), this;
                };
            }(o), function(t) {
                t.prototype.editableMenu = function() {
                    var e;
                    return this.on("click", ".btn-remove", function() {
                        t(this).parent().fadeOut(300, function() {
                            t(this).remove();
                        });
                    }), this.on("click", ".btn-edit", function() {
                        t(this).siblings(".inner-text").attr("contentEditable", !0).focus(), t(this).parent().addClass("editing"), 
                        e = t(this).siblings(".inner-text").text();
                    }), this.dblclick(function() {
                        t(this).children(".inner-text").attr("contentEditable", !0).focus(), t(this).addClass("editing"), 
                        e = t(this).children(".inner-text").text();
                    }), this.on("keydown", ".inner-text", function(i) {
                        13 === i.keyCode && (i.preventDefault(), t(this).attr("contentEditable", !1), t(this).parent().removeClass("editing")), 
                        27 === i.keyCode && (i.preventDefault(), t(this).attr("contentEditable", !1), t(this).parent().removeClass("editing"), 
                        t(this).text(e));
                    }), this.children(".inner-text").blur(function() {
                        t(this).attr("contentEditable", !1), t(this).parent().removeClass("editing");
                    }), this;
                };
            }(o), function(t) {
                t.prototype.panelTabs = function() {
                    return this.tabs(), this.find(".menu-underline").width(t(".ui-state-active").width()), 
                    this.find(".panel-tab").click(function() {
                        t(".menu-underline").width(t(this).width()).css({
                            "-webkit-transform": "translateX(" + t(this).position().left + "px)",
                            "-moz-transform": "translateX(" + t(this).position().left + "px)",
                            transform: "translateX(" + t(this).position().left + "px)"
                        });
                    }), this;
                };
            }(o), s(function() {
                n();
            });
        }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
        "inkling-jquery": 12,
        "inkling-jquery-ui": 10
    } ]
}, {}, [ 27 ]);