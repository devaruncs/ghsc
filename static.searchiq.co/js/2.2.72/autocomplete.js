(function() {
    var r = [],
        m = [],
        ha = SiqConfig.multiSelectFacetEnabled ? "OR" : "AND",
        y = function(f) {
            return f.replace(/^(https?:)?\/\/(www.)?([^\/]+)(\/[\w\W]*)?$/i, "$3")
        },
        ia = y(location.href),
        z = !1,
        L = 'input[name\x3d"' + SiqConfig.searchBoxName + '"]',
        x = 'input[name\x3d"' + SiqConfig.queryParameter + '"],input[name\x3d"' + SiqConfig.searchBoxName + '"]',
        t = function(f) {
            return f.replace(/'/g, "\x26apos;").replace(/"/g, "\x26quot;").replace(/</g, "\x26lt;").replace(/>/g, "\x26gt;").replace(/&lt;(\/?em)&gt;/g, "\x3c$1\x3e")
        };
    SiqContainer.waitAndRun(function() {
            return !!window.siq_S
        },
        function() {
            var f = [],
                k = null,
                p = !0,
                M = "",
                v, u, C, F = !1,
                N, D = function() {
                    return navigator.userAgent.match(/MSIE ([0-9]+)\./) ? !0 : !1
                },
                w = function() {
                    return navigator.userAgent.match(/MSIE ([0-9]+)\./) ? RegExp.$1 : !1
                },
                O = "f" == SiqConfig.queryParameter ? "sf" : "f",
                W = "dtf" == SiqConfig.queryParameter ? "sdtf" : "dtf",
                P = function(f) {
                    !f.siqfixed && (f.siqfixed = !0, siq_S(f).is(L) || siq_S(f).is(x)) && (siq_S(f).attr("autocomplete", "off"), SiqConfig.resultPageUrl && (siq_S(f).parents("form:eq(0)").attr("action", SiqConfig.resultPageUrl.replace(/^https?:/i,
                        "")), siq_S(f).attr("name", SiqConfig.queryParameter)))
                },
                X = null;
            (function() {
                function G() {
                    siq_S("body\x3e.holdResults").each(function() {
                        if (siq_S(this).is(":visible") && siq_S(this).hasClass("holdResults") && !siq_S(this).parent().hasClass("siq_overlaycont")) {
                            var a = 0,
                                b, c = siq_S(document).width(),
                                a = siq_S(this);
                            try {
                                b = (b = a.attr("class").match(/\d+/)[0]) ? b : ""
                            } catch (e) {}
                            b = b ? siq_S(".siq_searchIndex-" + b) : siq_S(this).parent().find("input:eq(0)");
                            if (0 == b.outerWidth()) setTimeout(arguments.callee, 200);
                            else {
                                var d = (a =
                                        0 < siq_S(this).children(".siq-filter-on").length) ? 550 : SiqConfig.bannerScript ? 320 : 300,
                                    d = null == SiqConfig.autocompleteWidth ? Math.max(b.outerWidth(), d) : Math.max(d, parseInt(SiqConfig.autocompleteWidth)),
                                    g = SiqConfig.enableAutocompleteFacet ? a ? .61 * Math.round(d - 2) - (SiqConfig.showACImages ? 72 : 22) : d - (SiqConfig.showACImages ? 72 : 22) : d - (SiqConfig.showACImages ? 64 : 12);
                                siq_S("._siq_main_searchbox li.siq-autocomplete div.siq_resultRight.siq-has-no-price").each(function(a, b) {
                                    b.setAttribute("style", "width:" + g + "px!important;")
                                });
                                siq_S(this).attr("style", "width:" + d + "px!important");
                                a = b.offset().left;
                                a = b.offset().left;
                                d != b.outerWidth() && (a -= (d - b.outerWidth()) / 2);
                                b = b.offset().top + b.outerHeight(!1);
                                a + d > c ? a = a - (a + d - c) - 5 : 0 > a && a + d != c && (a = 0);
                                F && (b -= window.scrollY);
                                b -= "relative" == siq_S("body").css("position") || "absolute" == siq_S("body").css("position") ? siq_S("body").offset().top : 0;
                                a -= "relative" == siq_S("body").css("position") || "absolute" == siq_S("body").css("position") ? siq_S("body").offset().left : 0;
                                siq_S(this).css({
                                    left: a,
                                    top: b
                                })
                            }
                        }
                    })
                }

                function ja(a) {
                    var b = a.split(/<\/?em>/i);
                    /^<\/?em>/i.test(a) && "" !== b[0] && b.splice(0, 0, "");
                    /<\/?em>$/i.test(a) && "" !== b[b.length - 1] && b.splice(b.length, 0, "");
                    if (1 == b.length) return a;
                    a = "";
                    for (var c = 0; c < b.length; c++) a += b[c].replace(/<\/?(e(m(>)?)?)?/i, ""), 0 == c % 2 ? c + 1 < b.length && ("..." !== b[c + 1] || c + 2 != b.length) && (a += "\x3cem\x3e") : c + 1 == b.length ? 0 <= a.indexOf("...") ? "..." !== b[c] && (a = a.replace("...", "\x3c/em\x3e...")) : a += "\x3c/em\x3e" : a += "\x3c/em\x3e";
                    return a
                }

                function Y(a, b, c) {
                    var d = siq_engine_key,
                        g = "";
                    (a.hasClass("siq-autocomplete") ||
                        0 < a.parents(".siq-autocomplete").size()) && a.parents(".siq-autocomplete").attr("data-engineKey") && a.parents(".siq-autocomplete").attr("data-engineKey") != siq_engine_key && (g = d, d = a.parents(".siq-autocomplete").attr("data-engineKey"));
                    b = /siq-autocomplete-([0-9a-f]+)/g.exec(b);
                    c = encodeURIComponent(c).replace(/^\s+|\s+$/g, "");
                    if ("" === c) return !0;
                    d = siq_api_endpoint + "search/log?q\x3d" + c + "\x26documentId\x3d" + b[1] + "\x26engineKey\x3d" + d + "\x26autocomplete\x3d1\x26refEngineKey\x3d" + g;
                    D() && 8 <= parseInt(w(), 10) && window.XDomainRequest ?
                        siq_ajax({
                            method: "GET",
                            url: d,
                            data: {},
                            dataType: "jsonp",
                            async: !1
                        }).done(function() {
                            p && (enterFlaf = !1, "_blank" == a[0].target ? window.open(a[0].href) : window.location.href = a[0].href)
                        }).fail(function() {
                            p && (enterFlaf = !1, "_blank" == a[0].target ? window.open(a[0].href) : window.location.href = a[0].href)
                        }) : siq_S.ajax({
                            method: "GET",
                            url: d,
                            data: {},
                            dataType: "json",
                            async: !1
                        }).done(function() {
                            p && (enterFlaf = !1, "_blank" == a[0].target ? window.open(a[0].href) : window.location.href = a[0].href)
                        }).fail(function() {
                            p && (enterFlaf = !1, "_blank" ==
                                a[0].target ? window.open(a[0].href) : window.location.href = a[0].href)
                        })
                }

                function Z(a, b) {
                    "INPUT" == a.target.nodeName && (C = a.target);
                    a = siq_S("body").find(".holdResults._siq_main_searchbox");
                    if (0 < a.length && 0 < a.find(".siq-autocomplete").length) {
                        a.parents(".siq_searchInner").find("input.siq_searchBox").trigger("blur");
                        var c = a.find(".siq-autocomplete").length;
                        "up" == b ? u = "undefined" == typeof v ? c - 1 : 0 < u ? u - 1 : c - 1 : "down" == b && (u = "undefined" == typeof v ? 0 : u < c - 1 ? u + 1 : 0);
                        "undefined" != typeof u && (a.find(".siq-autocomplete").removeClass("highlighted"),
                            v = a.find(".siq-autocomplete").eq(u), b = v.offset().top, !aa(v) && b > siq_S(window).scrollTop() ? siq_S("html, body").animate({
                                scrollTop: siq_S(window).scrollTop() + v.outerHeight() + 75
                            }, 500) : !aa(v) && b < siq_S(window).scrollTop() && siq_S("html, body").animate({
                                scrollTop: b - 75
                            }, 500), v.addClass("highlighted"))
                    }
                }

                function aa(a) {
                    elementToBeChecked = a;
                    a = siq_S(window).scrollTop();
                    var b = a + siq_S(window).height(),
                        c = siq_S(elementToBeChecked).offset().top;
                    return c + siq_S(elementToBeChecked).height() <= b && c >= a
                }

                function ba() {
                    if ((100 <=
                            siq_S(this).scrollLeft() || N) && 0 == F) {
                        if (/Chrome/i.test(navigator.userAgent) && /Android/i.test(navigator.userAgent) || N) F = !0
                    } else F = !1
                }

                function H() {
                    0 < siq_S("._siq_main_searchbox").length && 0 <= siq_S("._siq_main_searchbox").attr("style").indexOf("display:none") || (G(), 680 >= siq_S(window).width() && siq_S(".siq_search_results").outerWidth() > siq_S(window).width() ? siq_S(".siq_search_results").css("width", .98 * siq_S(window).width()) : siq_S(".siq_search_results").removeAttr("style"))
                }
                N = /Windows Phone/i.test(navigator.userAgent);
                siq_S(window).on("load", function() {
                    D() && siq_S("body").addClass("ie_" + parseInt(w()))
                });
                siq_S(document).on("click", ".siq_searchForm .siq_searchWrapper.siq_searchHover .siq_searchTop .searchWrapperLabel, .siq_searchForm .holdResults ul li .resultsMore, .siq_searchForm .inp-srch-btn", function() {
                    siq_S(this).parents("form.siq_searchForm").submit()
                });
                siq_S(document).on("click", ".holdResults .searchWrapperLabel, .holdResults ul li .resultsMore", function() {
                    if (0 < siq_S(this).parents(".holdResults").length &&
                        /^.*?siq_searchIndexResult-(\d+).*$/.test(siq_S(this).parents(".holdResults")[0].className)) {
                        var a = siq_S(this).parents(".holdResults")[0].className.replace(/^.*?siq_searchIndexResult-(\d+).*$/, "$1");
                        siq_S("input.siq_searchIndex-" + a).val(siq_S("input.siq_searchIndex-" + a).val().replace(/[<>()\/]+/g, " "));
                        0 < siq_S("input.siq_searchIndex-" + a).parents("form").length && (siq_S("input.siq_searchIndex-" + a).parents("form")[0].submit && "object" == typeof siq_S("input.siq_searchIndex-" + a).parents("form")[0].submit ?
                            siq_S(siq_S("input.siq_searchIndex-" + a).parents("form")[0].submit).click() : siq_S("input.siq_searchIndex-" + a).parents("form").submit())
                    } else siq_S("#siq_search_results form.siq_searchForm input.siq_searchBox").val(siq_S("#siq_search_results form.siq_searchForm input.siq_searchBox").val().replace(/[<>()\/]+/g, " ")), siq_S("#siq_search_results form.siq_searchForm").submit()
                });
                siq_S(document).on("submit", "form.siq_searchForm", function() {
                    var a = siq_S(this).find("input.siq_searchBox");
                    a.val(a.val().replace(/[<>()\/]+/g,
                        " "))
                });
                siq_S(document).on("focus", L, function(a) {
                    P(this)
                });
                siq_S(function() {
                    siq_S(L).each(function() {
                        P(this)
                    })
                });
                var ka = function() {
                        var a = 0;
                        siq_S(x).each(function() {
                            for (;
                                /^[\w\W]*\b(siq_searchIndex-(\d+))\b[\w\W]*$/.test(siq_S(this).attr("class"));) siq_S(this).removeClass(siq_S(this).attr("class").replace(/^[\w\W]*\b(siq_searchIndex-(\d+))\b[\w\W]*$/, "$1"));
                            siq_S(this).addClass("siq_searchIndex-" + a++)
                        });
                        var b = siq_S(".siq_searchIndex-" + a);
                        1 >= b.length || b.each(function() {
                            var b = siq_S(x).index(this);
                            siq_S(this).removeClass("siq_searchIndex-" +
                                a).addClass("siq_searchIndex-" + b)
                        })
                    },
                    ca = function(a) {
                        return siq_S(x).index(a)
                    };
                siq_S(document).on("keyup", x, function(a) {
                    if (!(SiqContainer.isMobile() && 0 < siq_S(this).parents("#siq_search_results").length)) {
                        a.preventDefault();
                        var b = siq_S(this);
                        a = b.val();
                        var c = (b.parents(".siq_search_results"), !1);
                        if (SiqConfig.disableAutocomplete && !c) return !0;
                        ka();
                        c = ca(b);
                        setTimeout(function() {
                            b.focus()
                        }, 5);
                        if (0 == b.parents("#wpadminbar").length)
                            if (!b.hasClass("siq_searchBox")) b.addClass("siq_searchBox"), b.parents("form").addClass("siq_searchForm"),
                                b.addClass("siq_searchIndex-" + c);
                            else {
                                if (!b.hasClass("siq_searchIndex-" + c)) {
                                    for (; 0 < siq_S(".siq_searchIndex-" + c).length;) c++;
                                    b.addClass("siq_searchIndex-" + c)
                                }
                            }
                        else return !1;
                        b.attr("autocomplete", "off");
                        if ("" != M && M == a) return !1;
                        M = a;
                        c = b.parents(".siq_searchWrapper");
                        siq_S(document).width();
                        b.offset();
                        "" != a ? (clearTimeout(X), X = setTimeout(function() {
                            if (!p) {
                                var a = b.val();
                                if ("" != a) {
                                    var c = siq_api_endpoint + "search/results",
                                        c = c + ("?q\x3d" + encodeURIComponent(I() + a.replace(/[<>()\/]+/g, " "))),
                                        c = c + ("\x26engineKey\x3d" +
                                            siq_engine_key),
                                        c = c + "\x26page\x3d0" + ("\x26itemsPerPage\x3d" + SiqConfig.autocompleteNumRecords),
                                        c = c + ("\x26group\x3d" + (SiqConfig.crossSiteSearch ? 1 : 0)),
                                        c = c + "\x26autocomplete\x3d1";
                                    k && "_siq_all_posts" !== k ? c += "\x26documentTypes\x3d" + encodeURIComponent(k) : 0 < b.parents("form:eq(0)").length && 0 < b.parents("form:eq(0)").find("input[name\x3dpostTypes]").length ? c += "\x26documentTypes\x3d" + encodeURIComponent(b.parents("form:eq(0)").find("input[name\x3dpostTypes]").val()) : 1 === b.parent().children("input[name\x3dpostTypes]").length &&
                                        (c += "\x26documentTypes\x3d" + encodeURIComponent(b.parent().children("input[name\x3dpostTypes]").val()));
                                    0 < b.parents("form:eq(0)").length && 0 < b.parents("form:eq(0)").find("input[name\x3dsiqACFilters]").length ? c += "\x26filter\x3d" + encodeURIComponent(b.parents("form:eq(0)").find("input[name\x3dsiqACFilters]").val()) : 1 === b.parent().children("input[name\x3dsiqACFilters]").length && (c += "\x26filter\x3d" + encodeURIComponent(b.parent().children("input[name\x3dsiqACFilters]").val()));
                                    var e = siq_api_endpoint + "search/results",
                                        e = e + ("?q\x3d" + encodeURIComponent(a.replace(/[<>()\/]+/g, " "))),
                                        e = e + ("\x26engineKey\x3d" + siq_engine_key),
                                        e = e + "\x26page\x3d0\x26itemsPerPage\x3d1" + ("\x26group\x3d" + (SiqConfig.crossSiteSearch ? 1 : 0)),
                                        e = e + "\x26autocomplete\x3d1";
                                    k && "_siq_all_posts" !== k || (0 < b.parents("form:eq(0)").length && 0 < b.parents("form:eq(0)").find("input[name\x3dpostTypes]").length ? e += "\x26documentTypes\x3d" + encodeURIComponent(b.parents("form:eq(0)").find("input[name\x3dpostTypes]").val()) : 1 === b.parent().children("input[name\x3dpostTypes]").length &&
                                        (e += "\x26documentTypes\x3d" + encodeURIComponent(b.parent().children("input[name\x3dpostTypes]").val())));
                                    0 < b.parents("form:eq(0)").length && 0 < b.parents("form:eq(0)").find("input[name\x3dsiqACFilters]").length ? e += "\x26filter\x3d" + encodeURIComponent(b.parents("form:eq(0)").find("input[name\x3dsiqACFilters]").val()) : 1 === b.parent().children("input[name\x3dsiqACFilters]").length && (e += "\x26filter\x3d" + encodeURIComponent(b.parent().children("input[name\x3dsiqACFilters]").val()));
                                    siq_S.support.cors = !0;
                                    var a =
                                        function(a, b, c) {
                                            D() && 8 <= parseInt(w(), 10) && window.XDomainRequest ? (siq_S("body").addClass("ie_" + parseInt(w())), siq_ajax({
                                                dataType: "jsonp",
                                                url: a + "",
                                                data: "",
                                                success: b,
                                                error: c
                                            })) : siq_S.getJSON(a, b).fail(c)
                                        },
                                        n = null,
                                        h = null,
                                        f = function() {
                                            SiqConfig.multiSelectFacetEnabled ? null !== n && null !== h && (r = h.main.facetedSearchInfos, J(b, n)) : null !== n && J(b, n)
                                        };
                                    a(c, function(a) {
                                        p || (n = eval(a), n.main.query == I() + b.val().replace(/[<>()\/]+/g, " ") && f())
                                    }, function() {
                                        p || A()
                                    });
                                    SiqConfig.multiSelectFacetEnabled && a(e, function(a) {
                                        p ||
                                            (h = eval(a), f())
                                    }, function() {})
                                }
                            }
                        }, 200)) : (A(), c.removeClass("siq_searchResultWrapper"), c.removeClass("siq_searchHover"))
                    }
                });
                var I = function() {
                        var a = [];
                        null != f && (a = f);
                        var b = {};
                        siq_S(a).each(function() {
                            b[this.field] ? b[this.field].push(0 < this.value.indexOf('" AND ') ? "(" + this.value + ")" : this.value) : b[this.field] = [0 < this.value.indexOf('" AND ') ? "(" + this.value + ")" : this.value]
                        });
                        var a = [],
                            c;
                        for (c in b)
                            if (b.hasOwnProperty(c)) {
                                var d = b[c];
                                a.push(1 < d.length ? "(" + d.join(" " + ha + " ") + ")" : d[0])
                            }
                        c = a.join(" AND ");
                        return 0 <
                            c.length ? (1 < a.length || 0 > c.indexOf("(") ? "(" + c + ")" : c) + " AND " : ""
                    },
                    Q = function(a) {
                        var b = [],
                            c;
                        for (c in a) a.hasOwnProperty(c) && b.push(c);
                        return b
                    },
                    la = function(a, b) {
                        var c;
                        c = "" + ('\x3cul class\x3d"siq-term-list siq-clearfix" data-siq-filter-field\x3d"' + a.field + '" data-siq-filter-order\x3d"' + a.order + '" data-siq-filter-type\x3d"' + a.type + '" data-siq-filter-query-field\x3d"' + a.queryField + '" data-siq-filter-documenttype\x3d"' + a.postType + '"\x3e');
                        for (var d = 0; d < f.length; ++d);
                        for (var g = d = 0; g < a.results.length; g++) {
                            var e =
                                a.results[g],
                                n = Q(e);
                            if (1 == n.length && (n = n[0], !da(a, e))) {
                                d++;
                                var h = a.queryField + ":\x26quot;" + t(n) + "\x26quot;";
                                a.postType && "_siq_all_posts" != a.postType && (h += " AND documentType:\x26quot;" + a.postType + "\x26quot;");
                                c += '\x3cli class\x3d"siq-term-item ' + (3 < d && !b ? "siq-toggleable" : "") + '" data-siq-filter-val\x3d"' + t(h) + '" data-siq-filter-humanvalue\x3d"' + t(n) + '"\x3e';
                                c += '\x3ca href\x3d"javascript:;"\x3e' + t(n) + (SiqConfig.multiSelectFacetEnabled ? "" : "\x3ch4\x3e(" + e[n] + ")\x3c/h4\x3e") + "\x3c/a\x3e";
                                c += "\x3c/li\x3e"
                            }
                        }
                        3 <
                            d && (c = b ? c + '\x3cli class\x3d"siq-more"\x3e- Show Less\x3c/li\x3e' : c + '\x3cli class\x3d"siq-more"\x3e+ Show More\x3c/li\x3e');
                        return c + "\x3c/ul\x3e"
                    };
                if (SiqConfig.enableAutocompleteFacet) {
                    var K = function(a, b) {
                        siq_S(a).children("ul").replaceWith(la(b, !0))
                    };
                    siq_S(document).on("keyup", "input.siq-ac-facet-filter", function() {
                        var a = siq_S(this).val(),
                            b = this,
                            c = siq_S(this).attr("data-siq-filter-field"),
                            d = B(siq_S(this).parents(".holdResults")),
                            g = siq_S(".siq_searchIndex-" + d),
                            e = g.val();
                        setTimeout(function() {
                            if (a ==
                                siq_S(b).val()) {
                                var d = siq_api_endpoint + "search/facets",
                                    d = d + ("?q\x3d" + encodeURIComponent((SiqConfig.multiSelectFacetEnabled ? "" : I()) + e.replace(/[<>()\/]+/g, " "))),
                                    d = d + ("\x26facetQuery\x3d" + encodeURIComponent(c + ":" + a)),
                                    d = d + ("\x26engineKey\x3d" + encodeURIComponent(siq_engine_key));
                                k && "_siq_all_posts" !== k ? SiqConfig.multiSelectFacetEnabled || (d += "\x26documentTypes\x3d" + encodeURIComponent(k)) : 0 < g.parents("form:eq(0)").length && 0 < g.parents("form:eq(0)").find("input[name\x3dpostTypes]").length ? d += "\x26documentTypes\x3d" +
                                    encodeURIComponent(g.parents("form:eq(0)").find("input[name\x3dpostTypes]").val()) : 1 === g.parent().children("input[name\x3dpostTypes]").length && (d += "\x26documentTypes\x3d" + encodeURIComponent(g.parent().children("input[name\x3dpostTypes]").val()));
                                0 < g.parents("form:eq(0)").length && 0 < g.parents("form:eq(0)").find("input[name\x3dsiqACFilters]").length ? d += "\x26filter\x3d" + encodeURIComponent(g.parents("form:eq(0)").find("input[name\x3dsiqACFilters]").val()) : 1 === g.parent().children("input[name\x3dsiqACFilters]").length &&
                                    (d += "\x26filter\x3d" + encodeURIComponent(g.parent().children("input[name\x3dsiqACFilters]").val()));
                                D() && 8 <= parseInt(w(), 10) && window.XDomainRequest ? (siq_S("body").addClass("ie_" + parseInt(w())), siq_ajax({
                                    dataType: "jsonp",
                                    url: d + "",
                                    data: "",
                                    success: function(c) {
                                        c = eval(c);
                                        e == g.val() && a == siq_S(b).val() && K(siq_S(b).parent().parent(), c)
                                    },
                                    error: function() {
                                        e == g.val() && a == siq_S(b).val() && K(siq_S(b).parent().parent(), null)
                                    }
                                })) : siq_S.getJSON(d, function(c) {
                                    c = eval(c);
                                    e == g.val() && a == siq_S(b).val() && K(siq_S(b).parent().parent(),
                                        c)
                                }).fail(function(c) {
                                    e == g.val() && a == siq_S(b).val() && K(siq_S(b).parent().parent(), null)
                                })
                            }
                        }, 200)
                    })
                }
                var R = y(location.href),
                    ma = function(a) {
                        var b = [];
                        a.thumbnail_small_url && (y(a.thumbnail_small_url) == R && b.push(a.thumbnail_small_url.replace(/^https?:/i, "")), b.push(a.thumbnail_small_url));
                        a.image && a.image instanceof Array && 0 < a.image.length && (a.image[0] && "false" != a.image[0] && (y(a.image[0]) == R && b.push(a.image[0].replace(/^https?:/i, "")), b.push(a.image[0])), 1 < a.image.length && a.image[1] && "false" != a.image[1] &&
                            (y(a.image[1]) == R && b.push(a.image[1].replace(/^https?:/i, "")), b.push(a.image[1])));
                        null != SiqConfig.defaultThumbnailUrl && b.push(SiqConfig.defaultThumbnailUrl);
                        return b
                    };
                window.SIQ_showNextImg = window.SIQ_showNextImg || function(a, b) {
                    var c = parseInt(b.getAttribute("data-siq_img_index")) + 1;
                    c < a.length ? (b.setAttribute("data-siq_img_index", c), b.src = a[c]) : (siq_S(b).parent().removeClass("has-image").addClass("no-image"), siq_S(b).replaceWith("\x3cspan class\x3d'no-img'\x3e\x3c/span\x3e"));
                    siq_S(b).parents("._siq_main_searchbox").find(".siq-scrollbox").trigger("siq-scrollbox-resize")
                };
                var A = function() {
                        var a = document.getElementById("siq_searchIndexResult");
                        a && (a.parentNode.removeChild(a), z = !1)
                    },
                    na = function() {
                        var a = document.createElement("DIV");
                        a.id = "siq_searchIndexResult";
                        a.className = "holdResults _siq_main_searchbox";
                        var b;
                        SiqConfig.enableAutocompleteFacet ? (b = "\x3cspan class\x3d'topArrow'\x3e\x3c/span\x3e\x3cdiv class\x3d'siq-blogrfct-cont siq-clearfix siq-filter-off'\x3e\x3cdiv class\x3d'siq-blogrfct-srchmain'\x3e\x3cul\x3e" + ("\x3cli class\x3d'sectionHead'\x3e\x3ch3\x3e" + SiqConfig.autocompleteTextResults +
                            "\x3c/h3\x3e\x3c/li\x3e"), b += "\x3cli class\x3d'siq-tabswrp'\x3e\x3cdiv class\x3d'siq-tbaram'\x3e\x3cdiv class\x3d'siq-tabcontent current'\x3e\x3cul id\x3d'siq-searchResultItems'\x3e", SiqConfig.hideLogo || (b += "\x3cli class\x3d'siq-powered-by'\x3e" + SiqConfig.autocompleteTextPoweredBy + " \x3ca href\x3d'https://searchiq.co/' target\x3d'_blank'\x3eSearchIQ\x3c/a\x3e\x3c/li\x3e"), b += "\x3c/ul\x3e\x3c/div\x3e\x3c/div\x3e\x3c/li\x3e\x3c/ul\x3e\x3c/div\x3e\x3c/div\x3e") : (b = "\x3cspan class\x3d'topArrow'\x3e\x3c/span\x3e\x3cul id\x3d'siq-searchResultItems'\x3e\x3cli class\x3d'sectionHead'\x3e\x3ch3\x3e" +
                            SiqConfig.autocompleteTextResults, SiqConfig.hideLogo || (b += "\x3cdiv class\x3d'siq-powered-by'\x3e" + SiqConfig.autocompleteTextPoweredBy + " \x3ca href\x3d'https://searchiq.co/' target\x3d'_blank'\x3eSearchIQ\x3c/a\x3e\x3c/div\x3e"), b += "\x3c/h3\x3e\x3c/li\x3e\x3c/ul\x3e");
                        a.innerHTML = b;
                        document.body.appendChild(a);
                        return a
                    },
                    oa = function(a) {
                        y(a) == ia && (a = a.replace(/^https?:/i, ""));
                        return a
                    },
                    pa = function(a, b, c, d) {
                        var g = document.createElement("LI");
                        g.className = "siq-autocomplete siq-autocomplete-" + a.externalId;
                        if (c || d) g.className += " siq-autocomplete-sponsored";
                        g.setAttribute("data-enginekey", a.engineKey);
                        var e = document.createElement("A");
                        e.href = oa(a.url);
                        if (b || SiqConfig.openResultInTab) e.target = "_blank";
                        g.appendChild(e);
                        if (SiqConfig.showACImages) {
                            var f = !!a.thumbnail_small_url || !!a.image && a.image instanceof Array && 0 < a.image.length && (!!a.image[0] && "false" != a.image[0] || 1 < a.image.length && !!a.image[1] && "false" != a.image[1]) || null != SiqConfig.defaultThumbnailUrl,
                                h = ma(a);
                            b = document.createElement("DIV");
                            b.className =
                                "siq_resultLeft " + (null != SiqConfig.defaultThumbnailUrl || f ? "has-image" : "no-image") + " " + ("resize" === SiqConfig.thumbnailType ? "resize" : "crop");
                            e.appendChild(b);
                            f ? (f = document.createElement("IMG"), f.setAttribute("alt", a.title.replace(/<[^>]*>/g, "")), f.setAttribute("data-siq_img_index", 0), f.onerror = function() {
                                SIQ_showNextImg(h, this)
                            }, f.onload = function() {
                                siq_S(this).parents("._siq_main_searchbox").find(".siq-scrollbox").trigger("siq-scrollbox-resize")
                            }, f.src = h[0]) : (f = document.createElement("SPAN"), f.className =
                                "no-img");
                            b.appendChild(f)
                        }
                        b = document.createElement("DIV");
                        f = SiqConfig.enableAutocompleteFacet && "number" === typeof a.regularPrice;
                        b.className = "siq_resultRight" + (SiqConfig.showACImages ? "" : " no-show-image") + (f ? "" : " siq-has-no-price");
                        e.appendChild(b);
                        var k = document.createElement("H3");
                        b.appendChild(k);
                        var q = 84 < a.title.length ? ja(a.title.replace(/^([\w\W]{1,84})[^a-zA-Z0-9][\w\W]*$/, "$1") + "...") : a.title;
                        k.innerHTML = t(q);
                        if (f && "number" === typeof a.rating) {
                            q = document.createElement("DIV");
                            q.className = "siq-starratings";
                            b.appendChild(q);
                            var l = document.createElement("DIV");
                            l.className = "siq-starratings-top";
                            l.style = "width:" + a.rating / 5 * 100 + "%!important";
                            q.appendChild(l);
                            for (f = 0; 5 > f; f++) k = document.createElement("SPAN"), k.innerHTML = "\x26#9733;", l.appendChild(k);
                            l = document.createElement("DIV");
                            l.className = "siq-starratings-bottom";
                            q.appendChild(l);
                            for (f = 0; 5 > f; f++) k = document.createElement("SPAN"), k.innerHTML = "\x26#9733;", l.appendChild(k)
                        }
                        a.domain && (SiqConfig.crossSiteSearch || c) ? (c = document.createElement("P"), c.appendChild(document.createTextNode(a.domain +
                            (d ? " | Sponsored" : ""))), b.appendChild(c)) : d && (c = document.createElement("P"), c.appendChild(document.createTextNode("Sponsored")), b.appendChild(c));
                        "number" === typeof a.regularPrice && (d = document.createElement("DIV"), d.className = "siq_prdprice", e.appendChild(d), e = document.createElement("P"), "number" === typeof a.salePrice && a.salePrice < a.regularPrice ? (e.innerHTML += S(a) + T(a.salePrice) + U(a), e.innerHTML += "\x3cspan class\x3d'striked-price'\x3e" + S(a) + T(a.regularPrice) + U(a) + "\x3c/span\x3e") : e.innerHTML = S(a) + T(a.regularPrice) +
                            U(a), d.appendChild(e));
                        return g
                    },
                    V = function(a, b, c, d) {
                        var g = [],
                            e;
                        if (0 < a.totalResults)
                            for (e = 0; e < a.records.length; e++) g.push(pa(a.records[e], b, c, d));
                        return g
                    },
                    qa = function(a) {
                        var b = a.interleave && a.interleave.records && 0 < a.interleave.records.length,
                            c = V(a.main, !1, !1, !1),
                            d = c.length;
                        if (b) {
                            var g = V(a.interleave, !0, !0, !0),
                                e = c.length;
                            0 == e && c.push(g[0]);
                            for (b = 0; b < g.length; b++)
                                if (e >= 2 * b + 1) c.splice(2 * b + b, 0, g[b]);
                                else break
                        }
                        a.bottom && a.bottom.records && 0 < a.bottom.records.length && (b = V(a.bottom, !0, !1, !1), 0 < b.length &&
                            (g = document.createElement("LI"), g.className = "sectionHead", e = document.createElement("H3"), e.appendChild(document.createTextNode("Also Recommended")), g.appendChild(e), c = c.concat(g, b)));
                        for (var g = document.getElementById("siq-searchResultItems"), e = g.childNodes, f = [], b = 0; b < e.length; b++) {
                            var h = e[b];
                            "LI" === h.tagName && (0 == b && "sectionHead" === h.className || "siq-powered-by" === h.className || f.push(h))
                        }
                        for (b = 0; b < f.length; b++) g.removeChild(f[b]);
                        f = null;
                        if (g.hasChildNodes())
                            for (e = g.childNodes, b = 0; b < e.length; b++)
                                if ("sectionHead" !==
                                    e[b].className) {
                                    f = e[b];
                                    break
                                }
                        for (b = 0; b < c.length; b++) null !== f ? g.insertBefore(c[b], f) : g.appendChild(c[b]);
                        f = g.childNodes[g.childNodes.length - 1];
                        "siq-powered-by" !== f.className && (f = null);
                        c = document.createElement("LI");
                        c.className = "resultsMoreLi";
                        b = document.createElement("A");
                        b.href = "javascript:;";
                        b.className = "resultsMore";
                        b.appendChild(document.createTextNode(SiqConfig.autocompleteTextMoreLink.replace("#", a.main.totalResults)));
                        c.appendChild(b);
                        0 < d && (null === f ? g.appendChild(c) : g.insertBefore(c, f))
                    },
                    ra =
                    function() {
                        if (SiqConfig.bannerScript) {
                            var a = document.getElementById("siq-searchResultItems");
                            if (a) {
                                var b = a.hasChildNodes() && "siq-powered-by" == a.childNodes[0].className ? a.childNodes[0] : null,
                                    c = document.createElement("DIV");
                                c.setAttribute("style", "display:block!important;position:absolute!important;top:-5000px!important;height:-5000px!important;");
                                null === b ? a.appendChild(c) : a.insertBefore(c, b);
                                var d = document.createElement("IFRAME");
                                d.id = "siq-iframe-banner";
                                d.setAttribute("style", "display:block!important;width:300px!important;height:250px!important;padding:0!important;border:0px!important;margin:10px auto!important;clear:both!important;position:absolute!important;top:-5000px!important;height:-5000px!important;");
                                d.frameBorder = 0;
                                d.marginHeight = 0;
                                d.marginWidth = 0;
                                null === b ? a.appendChild(d) : a.insertBefore(d, b);
                                if (a = d.contentDocument) {
                                    a.write("\x3c!DOCTYPE html\x3e\x3chtml\x3e\x3chead\x3e\x3c/head\x3e\x3cbody\x3e" + SiqConfig.bannerScript + "\x3c/body\x3e\x3c/html\x3e");
                                    var g = a.getElementsByTagName("body");
                                    if (g && 0 < g.length) {
                                        g = g[0];
                                        g.setAttribute("style", "overflow:hidden");
                                        var e = setInterval(function() {
                                            for (var a = g.childNodes, b = [], f = 0; f < a.length; f++) {
                                                var k = a[f],
                                                    l = k.tagName;
                                                "SCRIPT" !== l && "STYLE" !== l && "NOSCRIPT" !== l && b.push(k)
                                            }
                                            0 <
                                                b.length && (d.setAttribute("style", "display:block!important;width:300px!important;height:250px!important;padding:0!important;border:0px!important;margin: 5px auto 10px!important;clear:both!important;"), c.setAttribute("style", "display:block!important;clear:both!important;font-size: 11px!important;text-align: right!important;margin: 0px auto !important;width: 300px!important;color: #bdbdbd!important;height:13px!important;"), siq_S(".siq-scrollbox").trigger("siq-scrollbox-resize"), e && (clearInterval(e),
                                                    e = !1))
                                        }, 200);
                                        setTimeout(function() {
                                            e && (clearInterval(e), e = !1)
                                        }, 1E4)
                                    }
                                }
                            }
                        }
                    },
                    sa = function(a) {
                        SiqConfig.multiSelectFacetEnabled && (0 === r.length && 0 < a.main.facetedSearchInfos ? r = a.main.facetedSearchInfos : a.main.facetedSearchInfos = r);
                        var b;
                        var c = a.main.facetedSearchInfos;
                        b = SiqConfig.enableAutocompleteFacet && c instanceof Array && 0 < c.length ? 1 != c.length || -1 != c[0].order || 1 != c[0].results.length || k ? !0 : !1 : !1;
                        var c = document.getElementById("siq_searchIndexResult").childNodes[1],
                            d = null,
                            g = c.childNodes,
                            e;
                        for (e = 0; e < g.length; e++) {
                            var n =
                                g[e];
                            if ("siq-blogrfct-facet" === n.className) {
                                d = n;
                                break
                            }
                        }
                        null !== d && c.removeChild(d);
                        if (b) {
                            c.className = c.className.replace(/siq-filter-(on|off)/g, "") + " siq-filter-on";
                            b = document.createElement("DIV");
                            b.className = "siq-blogrfct-facet";
                            a = a.main.facetedSearchInfos;
                            d = "";
                            if ("undefined" !== typeof a && a instanceof Array && 0 < a.length)
                                for (var h, g = 0; g < a.length; g++)
                                    if (e = a[g], !(0 > e.order && !k && 2 > e.results.length || 0 == e.results.length || "NUMBER" == e.type && e.results[0].min > e.results[0].max)) {
                                        d += '\x3cdiv class\x3d"siq-facet-row siq-facet-' +
                                            e.label.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-") + '"\x3e';
                                        d += '\x3cbutton class\x3d"siq-accordion siq-active"\x3e' + t(e.label) + "\x3c/button\x3e";
                                        d += '\x3cdiv class\x3d"siq-panel siq-show"\x3e';
                                        if (0 > e.order) k && (d += "\x3ca href\x3d'javascript:;' class\x3d'siq-applied-type-filter' data-filter-field\x3d'post_type' data-filter-val\x3d'" + k + "'\x3e" + k + "\x3c/a\x3e");
                                        else if ("STRING" === e.type)
                                            for (h = 0; h < f.length; ++h) f[h].field == e.field && (d += "\x3ca href\x3d'javascript:;' class\x3d'siq-applied-filter' data-filter-field\x3d'" +
                                                f[h].field + "' data-filter-val\x3d'" + t(f[h].value) + "'\x3e" + t(f[h].humanValue) + "\x3c/a\x3e");
                                        else if ("RATING" === e.type)
                                            for (h = 0; h < f.length; ++h) f[h].field == e.field && (d += "\x3ca href\x3d'javascript:;' class\x3d'siq-applied-filter' data-filter-field\x3d'" + f[h].field + "' data-filter-val\x3d'" + f[h].value + "'\x3e" + f[h].humanValue + "\x3c/a\x3e");
                                        else if ("DATE" === e.type)
                                            for (h = 0; h < f.length; ++h) f[h].field == e.field && (d += "\x3ca href\x3d'javascript:;' class\x3d'siq-applied-filter' data-filter-field\x3d'" + f[h].field +
                                                "' data-filter-val\x3d'" + f[h].value + "'\x3e" + ea(f[h].humanValue) + "\x3c/a\x3e");
                                        else if ("NUMBER" === e.type)
                                            for (h = 0; h < f.length; ++h) f[h].field == e.field && (d += "\x3ca href\x3d'javascript:;' class\x3d'siq-applied-filter' data-filter-field\x3d'" + f[h].field + "' data-filter-val\x3d'" + f[h].value + "'\x3e" + f[h].humanValue + "\x3c/a\x3e");
                                        switch (e.type) {
                                            case "STRING":
                                                0 <= e.order && (d += '\x3cdiv class\x3d"siq-ac-facet-filter-wrp"\x3e\x3cinput class\x3d"siq-ac-facet-filter siq-hidden" data-siq-filter-field\x3d"' + e.field +
                                                    '" data-type\x3d"' + e.type + '" data-order\x3d"' + e.order + '" type\x3d"text"/\x3e\x3c/div\x3e');
                                            case "DATE":
                                                d = 0 <= e.order ? d + ('\x3cul class\x3d"siq-term-list siq-clearfix" data-siq-filter-field\x3d"' + e.field + '" data-siq-filter-query-field\x3d"' + e.queryField + '" data-siq-filter-documenttype\x3d"' + e.postType + '" data-siq-filter-order\x3d"' + e.order + '" data-siq-filter-type\x3d"' + e.type + '"\x3e') : d + '\x3cul class\x3d"siq-postType-list siq-clearfix"\x3e';
                                                n = null;
                                                for (h = 0; h < f.length; ++h) f[h].field == e.field && (n = f[h].humanValue);
                                                var m = 0;
                                                for (h = 0; h < e.results.length; h++) {
                                                    var q = e.results[h],
                                                        l = Q(q);
                                                    if (1 == l.length) {
                                                        l = l[0];
                                                        if ("DATE" === e.type && l === n) break;
                                                        if (!da(e, q)) {
                                                            m++;
                                                            if (0 <= e.order) {
                                                                var p = "DATE" === e.type ? e.queryField + ":[" + (null == q[l].fromDateStr ? "*" : q[l].fromDateStr) + " TO " + (null == q[l].toDateStr ? "*" : q[l].toDateStr) + "]" : e.queryField + ":\x26quot;" + l.replace('"', "\\\x26quot;") + "\x26quot;";
                                                                e.postType && "_siq_all_posts" != e.postType && (p += " AND documentType:\x26quot;" + e.postType + "\x26quot;");
                                                                d += '\x3cli class\x3d"siq-term-item ' + (3 < m ?
                                                                    "siq-toggleable" : "") + '" data-siq-filter-val\x3d"' + t(p) + '" data-siq-filter-humanvalue\x3d"' + t(l) + '"\x3e';
                                                                d += '\x3ca href\x3d"javascript:;"\x3e' + ("DATE" === e.type ? ea(l) : t(l)) + (SiqConfig.multiSelectFacetEnabled ? "" : "\x3ch4\x3e(" + ("DATE" === e.type ? q[l].count : q[l]) + ")\x3c/h4\x3e") + "\x3c/a\x3e"
                                                            } else d += '\x3cli class\x3d"siq-postType-item ' + (3 < m ? "siq-toggleable" : "") + '" data-siq-filter-val\x3d"' + l + '"\x3e', d += '\x3ca href\x3d"javascript:;"\x3e' + ("_siq_all_posts" == l ? "All post types" : l) + (SiqConfig.multiSelectFacetEnabled ?
                                                                "" : "\x3ch4\x3e(" + q[l] + ")\x3c/h4\x3e") + "\x3c/a\x3e";
                                                            d += "\x3c/li\x3e"
                                                        }
                                                    }
                                                }
                                                3 < m && (d += '\x3cli class\x3d"siq-more"\x3e+ Show More\x3c/li\x3e');
                                                d += "\x3c/ul\x3e";
                                                break;
                                            case "NUMBER":
                                                d += '\x3cdiv class\x3d"siq-filter-options-cont"\x3e';
                                                d += '\x3cdiv class\x3d"siq-ui-slider siq-ui-slider-horizontal siq-ui-widget siq-ui-widget-content siq-ui-corner-all" data-siq-min\x3d"' + e.results[0].min + '" data-siq-max\x3d"' + e.results[0].max + '" data-siq-filter-field\x3d"' + e.field + '" data-siq-filter-query-field\x3d"' + e.queryField +
                                                    '" data-siq-filter-documenttype\x3d"' + e.postType + '" data-siq-filter-order\x3d"' + e.order + '" data-siq-filter-type\x3d"' + e.type + '"\x3e';
                                                d += '\x3cspan class\x3d"siq-ui-slider-handle siq-ui-state-default siq-ui-corner-all siq-slider-min" style\x3d"left: 0%" tabindex\x3d"0"\x3e\x3c/span\x3e';
                                                d += '\x3cspan class\x3d"siq-ui-slider-handle siq-ui-state-default siq-ui-corner-all siq-slider-max" style\x3d"left: 100%" tabindex\x3d"0"\x3e\x3c/span\x3e';
                                                d += "\x3c/div\x3e";
                                                d += '\x3cp\x3e\x3cinput readonly type\x3d"text" value\x3d"' +
                                                    e.results[0].min + " - " + e.results[0].max + '"\x3e\x3c/p\x3e';
                                                d += "\x3c/div\x3e";
                                                break;
                                            case "RATING":
                                                d += '\x3cul class\x3d"siq-term-list siq-clearfix" data-siq-filter-field\x3d"' + e.field + '" data-siq-filter-order\x3d"' + e.order + '" data-siq-filter-type\x3d"' + e.type + '" data-siq-filter-query-field\x3d"' + e.queryField + '" data-siq-filter-documenttype\x3d"' + e.postType + '"\x3e';
                                                for (h = 5; 1 <= h; --h) l = "r" + h, "undefined" != typeof e.results[0][l] && (p = e.queryField + ":\x3e\x3d" + h, e.postType && "_siq_all_posts" != e.postType && (p +=
                                                        " AND documentType:\x26quot;" + e.postType + "\x26quot;"), d += '\x3cli class\x3d"siq-term-item" data-siq-filter-val\x3d"' + p + '" data-siq-filter-humanvalue\x3d"' + h + ' \x26amp; more stars"\x3e', d += '\x3ca href\x3d"javascript:;"\x3e' + ('\x3cdiv class\x3d"siq-starratings"\x3e \x3cdiv class\x3d"siq-starratings-top" style\x3d"width: ' + h / 5 * 100 + '% !important;"\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3c/div\x3e \x3cdiv class\x3d"siq-starratings-bottom"\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3c/div\x3e \x3c/div\x3e') +
                                                    (SiqConfig.multiSelectFacetEnabled ? "" : "\x3ch4\x3e(" + e.results[0][l] + ")\x3c/h4\x3e") + "\x3c/a\x3e", d += "\x3c/li\x3e");
                                                d += "\x3c/ul\x3e"
                                        }
                                        d += "\x3c/div\x3e\x3c/div\x3e"
                                    }
                            b.innerHTML = "\x3cdiv class\x3d'siq-scrollbox'\x3e" + d + "\x3c/div\x3e\x3cdiv style\x3d'position: absolute!important; z-index: 1!important; margin: 0px!important; padding: 0px!important; right: 61%!important; top: 11px!important;'\x3e\x3cdiv class\x3d'siq-scroll-track'\x3e\x3ca href\x3d'javascript:;' class\x3d'siq-scroll-handle' style\x3d'position: absolute!important; z-index: 1!important; top: 0px!important;'\x3e\x3c/a\x3e\x3c/div\x3e\x3c/div\x3e";
                            c.insertBefore(b, c.childNodes[0])
                        } else c.className = c.className.replace(/siq-filter-(on|off)/g, "") + " siq-filter-off"
                    },
                    J = function(a, b) {
                        var c = b && void 0 !== b.interleave && b.interleave && b.interleave.records && 0 < b.interleave.records.length,
                            d = b && void 0 !== b.main && b.main && b.main.totalResults && 0 < b.main.totalResults,
                            g = b && void 0 !== b.partners && b.partners && b.partners.totalResults && 0 < b.partners.totalResults;
                        b && (d || c || g) ? (c = document.getElementById("siq_searchIndexResult"), c || (c = na(), ra()), c.setAttribute("style", ""),
                            a = ca(a) + "", c.className = c.className.replace(/siq_searchIndexResult-\d+/, "") + " siq_searchIndexResult-" + a, qa(b), sa(b), G(), z = !0, b = siq_S(".siq-blogrfct-facet:visible"), 0 < b.length && (b.attr("style", "display:none!important"), b.attr("style", "max-height: " + b.parent().height() + "px!important;min-height: " + b.parent().height() + "px!important;"), b.children(".siq-scrollbox").trigger("siq-scrollbox-resize")), setTimeout(function() {
                                siq_S(document).trigger("siq-autocomplete-render-complete")
                            }, 0)) : A()
                    },
                    ea = function(a) {
                        switch (a) {
                            case "today":
                                return "Today";
                            case "yesterday":
                                return "Yesterday";
                            case "past_week":
                                return "Past week";
                            case "past_month":
                                return "Past month";
                            case "past_year":
                                return "Past year"
                        }
                    },
                    da = function(a, b) {
                        if (!SiqConfig.multiSelectFacetEnabled) return !1;
                        b = Q(b);
                        if (1 != b.length) return !1;
                        b = b[0];
                        if (0 > a.order && k === b) return !0;
                        for (var c = 0; c < f.length; ++c)
                            if (f[c].field == a.field && f[c].humanValue === b) return !0;
                        return !1
                    },
                    T = function(a) {
                        a = (a + "").split(".");
                        1 == a.length ? a.push("00") : 1 == a[1].length && (a[1] += "0");
                        return a.join(".")
                    },
                    S = function(a) {
                        if ("undefined" !==
                            typeof a.currencySymbol && "undefined" !== typeof a.currencySymbolPosition) {
                            if ("LEFT" === a.currencySymbolPosition) return a.currencySymbol;
                            if ("LEFT_SPACE" === a.currencySymbolPosition) return a.currencySymbol + "\x26nbsp;"
                        }
                        return ""
                    },
                    U = function(a) {
                        if ("undefined" !== typeof a.currencySymbol && "undefined" !== typeof a.currencySymbolPosition) {
                            if ("RIGHT" === a.currencySymbolPosition) return a.currencySymbol;
                            if ("RIGHT_SPACE" === a.currencySymbolPosition) return "\x26nbsp;" + a.currencySymbol
                        }
                        return ""
                    };
                siq_S(document).on("mouseenter",
                    "h1 a, h2 a, h3 a, h4 a, h5 a, h6 a",
                    function() {
                        if (0 < siq_S(this).find(".siq_wp_search_result_title").length) {
                            var a = siq_S(this).find(".siq_wp_search_result_title");
                            if (0 == a.parents(".siq-post").length) {
                                var b = a.attr("class"),
                                    b = /siq-post-([0-9]+)/g.exec(b);
                                "undefined" != typeof b && null != b && (a.parent().addClass("siq-post siq-post-" + b[1]), a.removeClass("siq-post").removeClass("siq-post-" + b[1]))
                            }
                        }
                    });
                siq_S(document).on("mouseup touchstart click", "body", function(a) {
                    var b = siq_S(".holdResults"),
                        c = siq_S(x);
                    0 < siq_S("body\x3e.holdResults").length &&
                        !b.is(a.target) && 0 === b.has(a.target).length && !c.is(a.target) && !c.hasClass("siq-overlaySearchBox") && (siq_S(".siq_searchWrapper").removeClass("siq_searchResultWrapper").removeClass("siq_searchHover"), k = null, f = [], setTimeout(function() {
                            A()
                        }, 10))
                });
                siq_S(document).on("blur focus", "body", function(a) {
                    var b;
                    siq_S(x).each(function() {
                        siq_S(this).is(a.target) && (b = siq_S(this))
                    });
                    b && !b.hasClass("siq-overlaySearchBox") && b.attr("class") && b.attr("class").match(/\bsiq_searchIndex-(\d+)\b/g)
                });
                siq_S(document).on("mouseenter",
                    ".siq_searchBox",
                    function() {
                        u = -1;
                        siq_S(this).attr("autocomplete", "off");
                        0 < siq_S(".holdResults .siq-autocomplete.highlighted").length && siq_S(".holdResults .siq-autocomplete").removeClass("highlighted")
                    });
                siq_S(document).on("mouseenter", ".siq_searchWrapper", function() {
                    if (!siq_S(this).hasClass("siq_searchHover")) {
                        siq_S(this).addClass("siq_searchHover");
                        if (0 < siq_S(this).parents(".siq_search_results").length) b = siq_S(this).find(".holdResults");
                        else try {
                            var a = siq_S(this).find(".siq_searchBox").attr("class").match(/\d+/)[0];
                            if (a = a ? a : "") var b = siq_S("body").find(".siq_searchIndexResult-" + a)
                        } catch (c) {}
                        "undefined" != typeof b && (0 < b.find(".siq-autocomplete").length || 0 < b.find(".no-result").length ? (siq_S(this).addClass("siq_searchResultWrapper").addClass("siq_searchHover"), b.attr("style", "display:block!important"), G()) : (siq_S(this).removeClass("siq_searchResultWrapper").removeClass("siq_searchHover"), b.attr("style", "display:none!important"), z = !1))
                    }
                });
                siq_S(document).on("mouseleave", ".siq_searchWrapper", function(a) {
                    var b = siq_S(this);
                    if (0 < siq_S(this).parents(".siq_search_results").length) d = siq_S(this).find(".holdResults");
                    else try {
                        var c = siq_S(this).find(".siq_searchBox").attr("class").match(/\d+/)[0];
                        if (c = c ? c : "") var d = siq_S("body").find(".siq_searchIndexResult-" + c)
                    } catch (g) {}
                    "undefined" == typeof d || b.is(a.target) || 0 !== b.has(a.target).length || (siq_S(this).removeClass("siq_searchResultWrapper").removeClass("siq_searchHover"), d.hide(), z = !1)
                });
                siq_S(document).on("click", ".siq-autocomplete a", function(a) {
                    if (0 < siq_S(this).parents(".siq_search_results").length) a =
                        siq_S(this).parents(".siq_searchInner").find("input.siq_searchBox").val();
                    else {
                        a = siq_S(this).parents(".holdResults._siq_main_searchbox").attr("class").replace(/^[\w\W]*?\bsiq_searchIndexResult-(\d+)\b[\w\W]*$/, "$1");
                        if (!/^\d+$/.test(a) || 1 > siq_S(".siq_searchIndex-" + a).length) return;
                        a = siq_S(".siq_searchIndex-" + a).val()
                    }
                    if (siq_S(this).hasClass("siq-recommended-link") || 0 < siq_S(this).parents(".siq-recommended-link").length) {
                        var b = siq_S(this).attr("href");
                        siq_S(this).attr("href", b + "\x26q\x3d" + a)
                    } else return Y(siq_S(this),
                        siq_S(this).parents("li").attr("class"), a)
                });
                siq_S(document).on("click", ".siq-accordion", function(a) {
                    siq_S(this).toggleClass("siq-active");
                    siq_S(this).parent().children("div.siq-panel").toggleClass("siq-show");
                    siq_S(this).parents(".siq-scrollbox").trigger("siq-scrollbox-resize")
                });
                siq_S(document).on("click", ".siq-more", function(a) {
                    a = "+ Show More" === siq_S(this).text().replace(/(^\s+|\s+$)/g, "");
                    siq_S(this).text(a ? "- Show Less" : "+ Show More");
                    siq_S(this).parent().children(".siq-term-item").each(function(a,
                        c) {
                        2 < a && siq_S(c).toggleClass("siq-toggleable")
                    });
                    a ? siq_S(this).parents(".siq-panel:first").find(".siq-ac-facet-filter").removeClass("siq-hidden") : siq_S(this).parents(".siq-panel:first").find(".siq-ac-facet-filter").addClass("siq-hidden");
                    siq_S(this).parents(".siq-scrollbox").trigger("siq-scrollbox-resize")
                });
                var fa = function(a, b) {
                    var c = a.offset(),
                        d = a.width(),
                        c = b - c.left,
                        g = a.children(".siq-slider-min"),
                        e = a.children(".siq-slider-max");
                    if (g.hasClass("siq-slider-handler-active")) b = g;
                    else if (e.hasClass("siq-slider-handler-active")) b =
                        e;
                    else {
                        var f = Math.abs(g.offset().left - b);
                        b = Math.abs(e.offset().left - b);
                        b = f < b ? g : e
                    }
                    b.addClass("siq-slider-handler-active");
                    d = c / d * 100;
                    c = a.data("siq-min");
                    g = a.data("siq-max");
                    e = a.next().children("input").val().split(" - ");
                    b.hasClass("siq-slider-min") ? (e[0] = Math.max(c, Math.min(Math.floor((g - c) * d / 100 + c), e[1])), b.css("left", Math.max(0, 100 * (e[0] - c) / (g - c)) + "%")) : (e[1] = Math.min(g, Math.max(Math.ceil((g - c) * d / 100 + c), e[0])), b.css("left", Math.min(100, 100 * (e[1] - c) / (g - c)) + "%"));
                    a.next().children("input").val(e[0] +
                        " - " + e[1])
                };
                siq_S(document).on("mousedown", ".siq-ui-slider", function(a) {
                    siq_S(this).addClass("siq-ui-slider-moving");
                    fa(siq_S(this), a.pageX)
                });
                var ga = function(a, b, c, d) {
                    var g = a.find("a"),
                        e = a.prev().outerHeight(!0),
                        f = g.parent().height();
                    b = 100 * (c - b) / f;
                    a.parent()[0].scrollTop = d + b * e / 100;
                    d = g.attr("style");
                    d = d.replace(/top:\d+(\.\d+)?%!important;/, "top:" + 100 * a.parent()[0].scrollTop / e + "%!important;");
                    g.attr("style", d)
                };
                siq_S(document).on("mousemove", function(a) {
                    if (0 < siq_S(".siq-ui-slider.siq-ui-slider-moving").length) fa(siq_S(".siq-ui-slider.siq-ui-slider-moving"),
                        a.pageX), a.preventDefault();
                    else if (0 < siq_S(".siq-scroll-handle-active").length) {
                        var b = siq_S(".siq-scroll-handle-active"),
                            c = b.data("siq-last-y"),
                            d = b.data("siq-last-scroll-top");
                        ga(b.parent().parent(), c, a.pageY, d);
                        a.preventDefault()
                    }
                });
                var E = function(a) {
                        var b = siq_S(".siq_searchIndex-" + a);
                        a = siq_S(".siq_searchIndex-" + a).parents("form:first");
                        a.find("input[type\x3dhidden][name\x3d" + O + "], input[type\x3dhidden][name\x3d" + W + "]").remove();
                        null != k && "_siq_all_posts" !== k && a.append("\x3cinput type\x3d'hidden' name\x3d'" +
                            W + "' value\x3d'" + k + "' /\x3e");
                        if (null != f)
                            for (var c = 0; c < f.length; ++c) a.append("\x3cinput type\x3d'hidden' name\x3d'" + O + "' value\x3d'' /\x3e"), a.find("input[type\x3dhidden][name\x3d" + O + "]:last").val(f[c].field + "|" + f[c].humanValue + "|" + f[c].value);
                        var d = b.val();
                        a = siq_api_endpoint + "search/results";
                        a += "?q\x3d" + encodeURIComponent(I() + d.replace(/[<>()\/]+/g, " "));
                        a += "\x26engineKey\x3d" + siq_engine_key;
                        a = a + "\x26page\x3d0" + ("\x26itemsPerPage\x3d" + SiqConfig.autocompleteNumRecords);
                        a += "\x26group\x3d" + (SiqConfig.crossSiteSearch ?
                            1 : 0);
                        k && "_siq_all_posts" !== k ? a += "\x26documentTypes\x3d" + encodeURIComponent(k) : 0 < b.parents("form:eq(0)").length && 0 < b.parents("form:eq(0)").find("input[name\x3dpostTypes]").length ? a += "\x26documentTypes\x3d" + encodeURIComponent(b.parents("form:eq(0)").find("input[name\x3dpostTypes]").val()) : 1 === b.parent().children("input[name\x3dpostTypes]").length && (a += "\x26documentTypes\x3d" + encodeURIComponent(b.parent().children("input[name\x3dpostTypes]").val()));
                        0 < b.parents("form:eq(0)").length && 0 < b.parents("form:eq(0)").find("input[name\x3dsiqACFilters]").length ?
                            a += "\x26filter\x3d" + encodeURIComponent(b.parents("form:eq(0)").find("input[name\x3dsiqACFilters]").val()) : 1 === b.parent().children("input[name\x3dsiqACFilters]").length && (a += "\x26filter\x3d" + encodeURIComponent(b.parent().children("input[name\x3dsiqACFilters]").val()));
                        a += "\x26autocomplete\x3d1";
                        D() && 8 <= parseInt(w(), 10) && window.XDomainRequest ? (siq_S("body").addClass("ie_" + parseInt(w())), siq_ajax({
                                dataType: "jsonp",
                                url: a + "",
                                data: "",
                                success: function(a) {
                                    a = eval(a);
                                    d == b.val() && J(b, a)
                                },
                                error: function() {
                                    A()
                                }
                            })) :
                            siq_S.getJSON(a, function(a) {
                                a = eval(a);
                                d == b.val() && J(b, a)
                            }).fail(function() {
                                A()
                            })
                    },
                    B = function(a) {
                        a = a.attr("class").split(/\s+/);
                        var b;
                        for (b = 0; b < a.length; ++b) {
                            var c = a[b];
                            if (/siq_searchIndexResult-\d+/.test(c)) return c.replace(/siq_searchIndexResult-(\d+)/, "$1")
                        }
                        return null
                    };
                siq_S(document).on("mouseup", function(a) {
                    if (0 < siq_S(".siq-ui-slider.siq-ui-slider-moving").length) {
                        var b = siq_S(".siq-ui-slider.siq-ui-slider-moving").data("siq-filter-query-field"),
                            c = b + ":[" + siq_S(".siq-ui-slider.siq-ui-slider-moving").next().find("input").val().replace("-",
                                "TO") + "]",
                            d = siq_S(".siq-ui-slider.siq-ui-slider-moving").data("siq-filter-documenttype");
                        d && "_siq_all_posts" != d && (c += ' AND documentType:"' + d + '"');
                        for (d = 0; d < f.length; ++d) f[d].field == b && (f = f.slice(0, d).concat(f.slice(d + 1)));
                        f.push({
                            value: c,
                            field: b,
                            humanValue: siq_S(".siq-ui-slider.siq-ui-slider-moving").next().find("input").val()
                        });
                        for (var g, d = 0; d < m.length; d++)
                            if (m[d].field === b) {
                                g = m[d];
                                break
                            }
                        if (!g)
                            for (d = 0; d < r.length; d++)
                                if (r[d].field === b) {
                                    g = r[d];
                                    m.push(g);
                                    break
                                }
                        E(B(siq_S(".siq-ui-slider.siq-ui-slider-moving").parents(".holdResults")));
                        siq_S(".siq-ui-slider.siq-ui-slider-moving").removeClass("siq-ui-slider-moving");
                        siq_S(".siq-slider-handler-active").removeClass("siq-slider-handler-active");
                        a.preventDefault()
                    }
                    0 < siq_S(".siq-scroll-handle-active").length && (siq_S(".siq-scroll-handle-active").removeClass("siq-scroll-handle-active"), a.preventDefault())
                });
                siq_S(document).on("click", ".siq-applied-filter", function() {
                    for (var a = siq_S(this).attr("data-filter-val"), b = siq_S(this).attr("data-filter-field"), c = 0, d = 0; d < f.length; ++d) f[d].field ==
                        b && (f[d].value == a ? f = f.slice(0, d).concat(f.slice(d + 1)) : c++);
                    if (0 === c)
                        for (; d < m.length; d++)
                            if (m[d].field === b) {
                                m.splice(d, 1);
                                break
                            }
                    E(B(siq_S(this).parents(".holdResults")))
                });
                siq_S(document).on("click", ".siq-applied-type-filter", function() {
                    k = null;
                    for (var a; a < m.length; a++)
                        if (-1 === m[a].order) {
                            m.splice(a, 1);
                            break
                        }
                    E(B(siq_S(this).parents(".holdResults")))
                });
                siq_S(document).on("click", ".siq-term-item", function() {
                    var a = siq_S(this).data("siq-filter-val"),
                        b = siq_S(this).parent().data("siq-filter-field"),
                        c = siq_S(this).parent().data("siq-filter-type"),
                        d = siq_S(this).data("siq-filter-humanvalue");
                    if (null == f) f = [];
                    else
                        for (var g = 0; g < f.length; ++g)
                            if (f[g].field == b) {
                                if ("STRING" == c && f[g].value == a) return;
                                "STRING" != c && (f = f.slice(0, g).concat(f.slice(g + 1)))
                            }
                    f.push({
                        value: a,
                        field: b,
                        humanValue: d
                    });
                    for (var e, g = 0; g < m.length; g++)
                        if (m[g].field === b) {
                            e = m[g];
                            break
                        }
                    if (!e)
                        for (g = 0; g < r.length; g++)
                            if (r[g].field === b) {
                                e = r[g];
                                m.push(e);
                                break
                            }
                    E(B(siq_S(this).parents(".holdResults")))
                });
                siq_S(document).on("click", ".siq-postType-item", function(a) {
                    k = siq_S(this).data("siq-filter-val");
                    var b;
                    for (a = 0; a < m.length; a++)
                        if (-1 === m[a].order) {
                            b = m[a];
                            break
                        }
                    if (!b)
                        for (a = 0; a < r.length; a++)
                            if (-1 === r[a].order) {
                                b = r[a];
                                m.push(b);
                                break
                            }
                    E(B(siq_S(this).parents(".holdResults")))
                });
                siq_S(document).on("keydown", function(a) {
                    a.target && "INPUT" === a.target.tagName && P(a.target);
                    a = a || window.event;
                    switch (a.which || a.keyCode) {
                        case 38:
                            1 == z && (a.preventDefault(), Z(a, "up"));
                            break;
                        case 40:
                            1 == z && (a.preventDefault(), Z(a, "down"));
                            break;
                        case 13:
                            p = !0;
                            if (0 < siq_S(".holdResults").length && 0 < siq_S(".holdResults .siq-autocomplete.highlighted").length) {
                                a.preventDefault();
                                var b = "";
                                "INPUT" == a.target.nodeName && (C = a.target, b = siq_S(C).val());
                                0 < siq_S(C).parents(".siq_search_results").length || b ? b || (b = siq_S(C).parents(".siq_searchInner").find("input.siq_searchBox").val()) : b = siq_S("body").find(".holdResults._siq_main_searchbox").find("span.searchWord").html();
                                a = siq_S(".holdResults .siq-autocomplete.highlighted");
                                Y(a.find("a"), a.attr("class"), b)
                            }
                            break;
                        default:
                            p = !1
                    }
                });
                siq_S(document).on("siq-scrollbox-resize", ".siq-scrollbox", function() {
                    var a = function(a) {
                        return function() {
                            var b =
                                a.next(),
                                d = b.attr("style").replace(/;height:\s\d[^$]+/, ""),
                                d = d + (";height: " + b.parent().outerHeight() + "px!important");
                            b.attr("style", d);
                            b.children(".siq-scroll-track").attr("style", "height: 100%!important;");
                            var f = b.find("a"),
                                d = a.outerHeight(!0),
                                d = "height:" + Math.min(100, 100 * b.parent().height() / d) + "%!important;" + ("top:" + 100 * b.parent()[0].scrollTop / d + "%!important;");
                            f.attr("style", d + "position:absolute!important;");
                            b = siq_S(".siq-blogrfct-facet:visible");
                            0 < b.length && (b.attr("style", "display:none!important"),
                                b.attr("style", "max-height: " + b.parent().height() + "px!important;min-height: " + b.parent().height() + "px!important;"))
                        }
                    }(siq_S(this));
                    a();
                    setTimeout(a, 300)
                });
                siq_S(document).on("siq-scrollbox-scroll", ".siq-scrollbox", function() {
                    var a = siq_S(this),
                        b = a.next(),
                        c = b.find("a"),
                        a = a.outerHeight(!0),
                        b = "height:" + Math.min(100, 100 * b.parent().height() / a) + "%!important;" + ("top:" + 100 * b.parent()[0].scrollTop / a + "%!important;");
                    c.attr("style", b + "position:absolute!important;")
                });
                siq_S(document).on("wheel", ".siq-scrollbox",
                    function(a) {
                        siq_S(this).parent().each(function() {
                            this.scrollTop += a.originalEvent.deltaY
                        });
                        siq_S(this).trigger("siq-scrollbox-scroll");
                        a.preventDefault()
                    });
                siq_S(document).on("mousedown", ".siq-scroll-handle", function(a) {
                    siq_S(this).addClass("siq-scroll-handle-active");
                    siq_S(this).data("siq-last-y", a.pageY);
                    siq_S(this).data("siq-last-scroll-top", siq_S(this).parent().parent().parent()[0].scrollTop);
                    a.preventDefault()
                });
                siq_S(document).on("mousedown", ".siq-scroll-track", function(a) {
                    var b = siq_S(this).children("a"),
                        c = b.offset().top + b.height() / 2,
                        d = siq_S(this).parent().parent()[0].scrollTop;
                    ga(siq_S(this).parent(), c, a.pageY, d);
                    b.addClass("siq-scroll-handle-active");
                    b.data("siq-last-y", a.pageY);
                    b.data("siq-last-scroll-top", siq_S(this).parent().parent()[0].scrollTop);
                    a.preventDefault()
                });
                siq_S(document).scroll(function() {
                    ba()
                });
                siq_S(window).on("orientationchange", function() {
                    ba();
                    G()
                });
                window.attachEvent ? (window.attachEvent("onresize", function() {
                        H("attach")
                    }), window.attachEvent("onscroll", function() {
                        H("attach")
                    })) :
                    window.addEventListener && (window.addEventListener("resize", function() {
                        H("add")
                    }, !0), window.addEventListener("scroll", function() {
                        H("add")
                    }, !0));
                siq_S(function() {
                    if (0 < siq_S(".siq_search_results").length) siq_S("body").on("siq_search_results_loaded", function() {
                        logEvent()
                    });
                    else siq_S("body").on("siq_vars_loaded", function() {
                        logEvent()
                    });
                    window.siq_script_ready = !0
                });
                (function() {
                    var a = document.createElement("LINK");
                    a.href = siq_baseUrl + "css/" + SiqConfig.jsVersion + (SiqConfig.enableAutocompleteFacet ? "/autocomplete-pro.css" :
                        "/autocomplete.css");
                    a.rel = "stylesheet";
                    a.id = "siq_autocomplete_remote_css";
                    var b = document.getElementById("siq_custom_css");
                    b ? b.parentNode.insertBefore(a, b) : document.getElementsByTagName("HEAD")[0].appendChild(a);
                    window.siq_autocompleteStyleVar && (a = document.createElement("STYLE"), a.type = "text/css", a.styleSheet ? a.styleSheet.cssText = window.siq_autocompleteStyleVar : a.appendChild(document.createTextNode(window.siq_autocompleteStyleVar)), document.getElementsByTagName("head")[0].appendChild(a))
                })();
                (function() {
                    if (!document.getElementById("siq_custom_css")) {
                        var a =
                            document.createElement("LINK");
                        a.href = siq_cached_api_endpoint + "css/" + siq_engine_key + "/custom.css?v\x3d" + SiqConfig.jsVersion + "\x26cb\x3d" + Math.ceil(9999999 * Math.random());
                        a.rel = "stylesheet";
                        a.id = "siq_custom_css";
                        document.getElementsByTagName("HEAD")[0].appendChild(a)
                    }
                })(window.siq_engine_key)
            })()
        }, 200, 2E4)
})();