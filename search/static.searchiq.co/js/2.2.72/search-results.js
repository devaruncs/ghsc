(function() {
    var E = SiqContainer.getLogger("search-results.js(" + (new Date).getTime() + ")"),
        V = SiqContainer.isMobile(),
        z = [],
        r = [],
        Ea = SiqConfig.multiSelectFacetEnabled ? "OR" : "AND",
        H = function(b) {
            return b.replace(/^(https?:)?\/\/(www.)?([^\/]+)(\/[\w\W]*)?$/i, "$3")
        },
        h = function(b) {
            return b.replace(/</g, "\x26lt;").replace(/>/g, "\x26gt;")
        },
        W = function() {
            if (SiqConfig.resultPageUrl && 0 <= SiqConfig.resultPageUrl.indexOf("*")) {
                var b = SiqConfig.resultPageUrl.split("*"),
                    h = location.href.indexOf(b[0]) + b[0].length,
                    b = 1 < b.length &&
                    b[1].length ? location.href.substring(h).indexOf(b[1]) + h : 0 <= location.href.indexOf("?") ? location.href.substring(h).indexOf("?") + h : location.href.length,
                    h = location.href.substring(h, Math.max(h, b));
                return decodeURIComponent(h.replace(/\+/g, " "))
            }
            h = decodeURIComponent;
            b = (b = (new RegExp("[\\?\x26]" + SiqConfig.queryParameter + "\x3d([^\x26#]*)")).exec(location.href)) ? b[1] || "" : "";
            return h(b.replace(/\+/g, " "))
        },
        ja = H(location.href),
        ka = function() {
            var b = document.getElementsByTagName("script"),
                h;
            for (h = 0; h < b.length; h +=
                1)
                if (/www\.google-analytics\.com\/analytics\.js/.test(b[h].src)) return "ga"
        }(),
        la = SiqConfig.jsVersion,
        J = window.siq_engine_key,
        D = SiqConfig.defaultThumbnailUrl,
        b, ia = function() {
            if (siq_S("#siq_search_results").hasClass("siq_search_results")) E("STOP RESULT PAGE SCRIPT EXECUTION");
            else {
                siq_S("#siq_search_results").addClass("siq_search_results search-results-cont loading");
                var v = "\x3cdiv class\x3d'siq_searchWrapper'\x3e",
                    v = v + "\x3cdiv class\x3d'siq_searchTop'\x3e",
                    v = v + "\x3cdiv class\x3d'siq_searchInner'\x3e",
                    v = v + "\x3c/div\x3e",
                    v = v + "\x3cdiv class\x3d'srch-poweredbysiq'\x3e";
                SiqConfig.hideLogo || (v += "\x3cdiv\x3e " + (SiqConfig.autocompleteTextPoweredBy ? SiqConfig.autocompleteTextPoweredBy : "powered by") + " \x3ca target\x3d'_blank' href\x3d'http://searchiq.co'\x3eSearchIQ \x3cspan class\x3d\"siq-visually-hidden\"\x3ethis link opens in a new tab\x3c/span\x3e\x3c/a\x3e\x3c/div\x3e");
                var v = v + "\x3c/div\x3e",
                    v = v + "\x3c/div\x3e",
                    v = v + "\x3c/div\x3e",
                    t = [
                        [SiqConfig.customSearchResultsOrderRelevanceText ? SiqConfig.customSearchResultsOrderRelevanceText :
                            "Relevance", "relevance"
                        ],
                        [SiqConfig.customSearchResultsOrderNewestText ? SiqConfig.customSearchResultsOrderNewestText : "Newest", "newest"],
                        [SiqConfig.customSearchResultsOrderOldestText ? SiqConfig.customSearchResultsOrderOldestText : "Oldest", "oldest"]
                    ],
                    I = window.siq_baseUrl,
                    O = I + "css/" + la + (SiqConfig.enableResultsPageFacet ? "/search-result-pro.css" : "/search-result.css"),
                    ia = siq_cached_api_endpoint + "css/" + J + "/custom.css?v\x3d" + la + "\x26cb\x3d" + Math.ceil(9999999 * Math.random()),
                    p = [],
                    u = null,
                    P = "f" == SiqConfig.queryParameter ?
                    "sf" : "f",
                    Q = "dtf" == SiqConfig.queryParameter ? "sdtf" : "dtf",
                    w = null,
                    A = null,
                    Fa = location.search.toString().replace(/^\?/, "").split("\x26");
                siq_S(Fa).each(function() {
                    var a = this.split("\x3d", 2);
                    2 > a.length || (a[0] == P ? (a = decodeURIComponent(a[1]).split("|", 3), 3 > a.length || p.push({
                        field: a[0],
                        humanValue: a[1],
                        value: a[2]
                    })) : a[0] == Q ? u = decodeURIComponent(a[1]) : "postTypes" == a[0] ? w = decodeURIComponent(a[1]) : "siqACFilters" == a[0] && (A = decodeURIComponent(a[1])))
                });
                var y = function(a, c) {
                        c = "undefined" == typeof c ? "" : c + ": ";
                        "undefined" !=
                        typeof b && 1 == b.debug ? (E("\x3d\x3d\x3d\x3d siq_log start \x3d\x3d\x3d\x3d\x3d " + c), E(a), E("\x3d\x3d\x3d\x3d siq_log end \x3d\x3d\x3d\x3d\x3d ")) : "undefined" != typeof b && 0 == b.debug || !ma.debug || (E("\x3d\x3d\x3d\x3d siq_log start \x3d\x3d\x3d\x3d\x3d " + c), E(a), E("\x3d\x3d\x3d\x3d siq_log end \x3d\x3d\x3d\x3d\x3d "))
                    },
                    B = function() {
                        return navigator.userAgent.match(/MSIE ([0-9]+)\./) ? !0 : !1
                    };
                B.version = function() {
                    return navigator.userAgent.match(/MSIE ([0-9]+)\./) ? RegExp.$1 : !1
                };
                var C = {
                        title_font: {
                            className: "div.search-results-title a",
                            property: "font-family"
                        },
                        title_color: {
                            className: "div.search-results-title a",
                            property: "color"
                        },
                        title_size: {
                            className: "div.search-results-title a",
                            property: "font-size"
                        },
                        title_highlight_font: {
                            className: "div.search-results-title a em",
                            property: "font-family"
                        },
                        title_highlight_color: {
                            className: "div.search-results-title a em",
                            property: "color"
                        },
                        title_highlight_size: {
                            className: "div.search-results-title a em",
                            property: "font-size"
                        },
                        author_font: {
                            className: ".sr-R-author",
                            property: "font-family"
                        },
                        author_color: {
                            className: ".sr-R-author",
                            property: "color"
                        },
                        author_size: {
                            className: ".sr-R-author",
                            property: "font-size"
                        },
                        link_font: {
                            className: ".sr-R-link",
                            property: "font-family"
                        },
                        link_color: {
                            className: ".sr-R-link",
                            property: "color"
                        },
                        link_size: {
                            className: ".sr-R-link",
                            property: "font-size"
                        },
                        desc_enable: {
                            className: ".sr-R-cont div",
                            property: "display"
                        },
                        desc_font: {
                            className: ".sr-R-cont div",
                            property: "font-family"
                        },
                        desc_color: {
                            className: ".sr-R-cont div",
                            property: "color"
                        },
                        desc_size: {
                            className: ".sr-R-cont div",
                            property: "font-size"
                        },
                        desc_highlight_font: {
                            className: ".sr-R-cont div em",
                            property: "font-family"
                        },
                        desc_highlight_color: {
                            className: ".sr-R-cont div em",
                            property: "color"
                        },
                        desc_highlight_size: {
                            className: ".sr-R-cont div em",
                            property: "font-size"
                        },
                        desc_length: {
                            className: ".sr-R-cont div",
                            property: ""
                        },
                        category_font: {
                            className: ".sr-R-categories ul li",
                            property: "font-family"
                        },
                        category_color: {
                            className: ".sr-R-categories ul li",
                            property: "color"
                        },
                        category_size: {
                            className: ".sr-R-categories ul li",
                            property: "font-size"
                        },
                        tag_font: {
                            className: ".sr-R-tags ul li",
                            property: "font-family"
                        },
                        tag_color: {
                            className: ".sr-R-tags ul li",
                            property: "color"
                        },
                        tag_size: {
                            className: ".sr-R-tags ul li",
                            property: "font-size"
                        },
                        img_enable: {
                            className: ".search-results-L",
                            property: "display",
                            condition: 0,
                            related: {
                                className: ".search-results-R",
                                value: "width:100%!important;"
                            }
                        },
                        img_width: {
                            className: ".search-results-L img",
                            property: "width"
                        },
                        img_height: {
                            className: ".search-results-L img",
                            property: "height"
                        },
                        sort_enable: {
                            className: ".siq_filter_sort.siq_sort",
                            property: ""
                        },
                        searchbox_enable: {
                            className: ".siq_searchForm",
                            property: ""
                        }
                    },
                    ma = {
                        engineKey: "",
                        scriptBaseUrl: "",
                        apiBaseUrl: window.siq_api_endpoint,
                        apiAjaxSearchEndpoint: "search/results",
                        siteUrl: "",
                        searchUrl: "",
                        searchBoxQuery: "",
                        query: "",
                        page: 1,
                        itemsperpage: 10,
                        prettyPermalinks: 0,
                        removeCurrentResult: 0,
                        filter: SiqConfig.sortBy ? SiqConfig.sortBy : "relevance",
                        style: "",
                        postTypes: null !== w ? w : SiqConfig.postTypesForSearch,
                        apiEndPoint: "",
                        mainElementClass: "siq_search_results",
                        loadingClass: "loading",
                        singleElementClass: "search-results-row",
                        singleElementExtraClass: "siq-single-result",
                        paginationClass: "_siq_pagination",
                        bodyClass: "siq_search_page",
                        inputBoxId: "siq_ajax_search",
                        inputBoxClass: "siq_searchBox",
                        formClass: "siq_searchForm",
                        searchTopClass: "siq_searchTop",
                        messageClass: "siq_message",
                        errorClass: "siq_error",
                        errorDefaultText: SiqConfig.noRecordsFoundText ? SiqConfig.noRecordsFoundText : "No records found",
                        serverDownText: "Either the server is down or or there is no network. Please try again.",
                        searchBoxMainClass: "siq_search_ajax siq_search_box",
                        submitButtonClass: "siq_ajax_submit",
                        searchKeywordBoxClass: "siq_search_keyword",
                        searchResultKeywordWrap: "search_result_kw_wrap",
                        searchResultKeywordClass: "keyword",
                        filterOuterBoxClass: "siq_filters hide",
                        filterBoxClass: "siq_filter",
                        filterLabelClass: "filterLabel",
                        filterValueClass: "filterValue siq-sort-results",
                        filterSortByClass: "siq_sort",
                        filterSortByText: "Sort By:",
                        resultImageClass: "search-results-L",
                        resultTextClass: "search-results-R",
                        resultTextHeadingClass: "search-results-title",
                        resultCategoryWrapperClass: "sr-R-categories",
                        resultAuthorClass: "sr-R-author",
                        resultLinkClass: "sr-R-link",
                        resultDescClass: "sr-R-cont",
                        resultCategoryHeadingClass: "categoriesMain",
                        resultSingleCatClass: "siq-cat",
                        resultTagsWrapperClass: "sr-R-tags",
                        resultTagsHeadingClass: "tagsMain",
                        resultSingleTagClass: "siq-tag",
                        paginationCurrentClass: "current",
                        paginationActiveClass: "active",
                        paginationDisabledClass: "disabled",
                        paginationPreviousClass: "prev",
                        paginationNextClass: "next",
                        paginationSingleLinkClass: "_siq_pagination_single_link",
                        partnerResultClass: "_siq_partner_result",
                        is_wordpress: 0,
                        show_images: SiqConfig.customSearchThumbnailsEnabled,
                        debug: !0,
                        dataTableClass: "siq_data_table",
                        dataSearchareaClass: "siq_searcharea_table",
                        searchAreaLeftTd: "searchAreaLeftTd",
                        searchAreaRightTd: "searchAreaRightTd",
                        searchFiltersLeftTd: "searchFiltersLeftTd",
                        searchFiltersRightTd: "searchFiltersRightTd",
                        imageTd: "imageTd",
                        contentTd: "contentTd",
                        scrollAnimationDelay: 500
                    },
                    na = function() {
                        return navigator.userAgent.match(/MSIE ([0-9]+)\./) ? !0 : !1
                    },
                    X = function() {
                        return navigator.userAgent.match(/MSIE ([0-9]+)\./) ? RegExp.$1 : !1
                    },
                    Ga = function() {
                        siq_S(document).on("click", ".search-results-title a", function(a, c) {
                            var e = siq_S(this);
                            if (siq_S(this).hasClass(b.partnerResultClass) ||
                                0 < siq_S(this).parents("." + b.partnerResultClass).length) return !0;
                            if ("undefined" == typeof c) {
                                var d = siq_S(this).parents(".search-results-row").attr("class");
                                c = "json";
                                var d = /siq-single-([0-9a-f]+)/g.exec(d),
                                    f = b.engineKey,
                                    g = "";
                                if (siq_S(this).attr("data-engineKey")) {
                                    var l = siq_S(this).attr("data-engineKey");
                                    l && l != f && (g = f, f = l)
                                }
                                if (!b.query || "" === b.query.replace(/^\s+|\s+$/g, "")) return !0;
                                l = b.apiBaseUrl + "search/log?q\x3d" + b.query;
                                l += "\x26documentId\x3d" + d[1];
                                l = l + ("\x26engineKey\x3d" + f) + "\x26autocomplete\x3d0";
                                g && (l += "\x26refEngineKey\x3d" + g);
                                B() && 8 <= parseInt(B.version(), 10) && window.XDomainRequest && (c = "jsonp");
                                siq_S.ajax({
                                    method: "GET",
                                    url: l,
                                    data: {},
                                    dataType: c,
                                    async: !1
                                }).done(function(a) {
                                    "_blank" == e[0].target ? window.open(e[0].href) : window.location.href = e[0].href
                                }).fail(function() {
                                    "_blank" == e[0].target ? window.open(e[0].href) : window.location.href = e[0].href
                                });
                                a.preventDefault()
                            }
                        })
                    },
                    oa = function(a, c, b) {
                        if (!document.getElementById(a)) {
                            var e = document.getElementsByTagName("head")[0],
                                f = document.createElement("link");
                            f.id = a;
                            f.rel = "stylesheet";
                            f.type = "text/css";
                            f.href = c;
                            f.media = "all";
                            (a = document.getElementById(b)) ? a.parentNode.insertBefore(f, a): e.appendChild(f)
                        }
                    },
                    pa = function() {
                        var a = document.createElement("style");
                        a.type = "text/css";
                        a.styleSheet ? a.styleSheet.cssText = b.style.replace(/body \.siq_search_results \.search-results-row\.siq-single-result/g, "body #siq_search_results .search-results-row.siq-single-result") : a.appendChild(document.createTextNode(b.style.replace(/body \.siq_search_results \.search-results-row\.siq-single-result/g,
                            "body #siq_search_results .search-results-row.siq-single-result")));
                        document.getElementsByTagName("head")[0].appendChild(a)
                    },
                    Ha = function() {
                        var a = "",
                            c;
                        for (c in C) "undefined" != typeof b[c] && "undefined" != typeof C[c].className && "" != C[c].className && (a += ".siq_search_results .search-results-row.siq-single-result " + C[c].className, a += "{", -1 < C[c].property.indexOf("font-size") && (a += "line-height:", a += qa("line-height", b[c]) + "!important;"), a += C[c].property + ":", a += qa(C[c].property, b[c]) + "!important;", a += "}\n\r",
                            "undefined" != typeof C[c].condition && b[c] == C[c].condition && (a += ".siq_search_results .search-results-row.siq-single-result " + C[c].related.className, a += "{" + C[c].related.value + "}\n\r"));
                        0 == a.length && "undefined" != typeof window.siq_styleVar && (a = window.siq_styleVar);
                        0 < a.length && (b.style = a, pa())
                    },
                    qa = function(a, b) {
                        switch (a) {
                            case "font-family":
                                a = b;
                                break;
                            case "font-size":
                            case "line-height":
                            case "width":
                            case "height":
                                "string" == typeof b ? (b = b.toLowerCase(), a = -1 < b.indexOf("px") ? b : b + "px") : a = b + "px";
                                break;
                            case "color":
                                a =
                                    b;
                                break;
                            case "display":
                                a = 0 == b || 0 == b ? "none" : "inline-block";
                                break;
                            default:
                                a = b
                        }
                        return a
                    },
                    S = function() {
                        var a;
                        a = "" + ("\x3cdiv class\x3d'" + b.searchBoxMainClass + "'\x3e");
                        a += "\x3ctable class\x3d'" + b.dataSearchareaClass + "'\x3e";
                        a += "\x3ctr\x3e";
                        if ("undefined" == typeof b.searchbox_enable || 0 != b.searchbox_enable) a += "\x3ctd class\x3d'" + b.searchAreaLeftTd + "' colspan\x3d'2'\x3e", a += "\x3cform action\x3d'" + (SiqConfig.resultPageUrl || "").replace(/^https?:/, "") + "'\x3e", a += "\x3cinput value\x3d'' placeholder\x3d'" + (SiqConfig.customSearchBarPlaceholder ?
                            SiqConfig.customSearchBarPlaceholder : "Enter your search term") + "' type\x3d'text' name\x3d'" + SiqConfig.queryParameter + "' id\x3d'" + b.inputBoxId + "' class\x3d'" + b.inputBoxId + "' aria-label\x3d\"Field for entering a search query\" /\x3e\x3cinput type\x3d'submit' name\x3d'" + b.submitButtonClass + "' class\x3d'" + b.submitButtonClass + '\' aria-label\x3d"Submit Search Query" /\x3e', w && (a += "\x3cinput type\x3d'hidden' name\x3d'postTypes' value\x3d'" + h(w) + "'/\x3e"), A && (a += "\x3cinput type\x3d'hidden' name\x3d'siqACFilters' value\x3d'" +
                            h(A) + "'/\x3e"), a += "\x3c/form\x3e\x3c/td\x3e";
                        a = a + "\x3c/tr\x3e\x3ctr\x3e" + ("\x3ctd class\x3d'" + b.searchFiltersLeftTd + "'\x3e");
                        a += R("", "", "", !1);
                        a = a + "\x3c/td\x3e" + ("\x3ctd class\x3d'" + b.searchFiltersRightTd + "'\x3e");
                        var c;
                        c = "" + ("\x3cdiv class\x3d'" + b.filterOuterBoxClass + "'\x3e");
                        if ("undefined" == typeof b.sort_enable || 0 != b.sort_enable) {
                            c += "\x3cdiv class\x3d'" + b.filterBoxClass + " " + b.filterSortByClass + "'\x3e";
                            c += '\x3cselect aria-label\x3d"Sort results by"\x3e';
                            for (var e in t)
                                if ("string" == typeof t[e][1]) {
                                    var d =
                                        "" != b.filter && b.filter == t[e][1] ? "selected\x3d'selected'" : "";
                                    c += "\x3coption value\x3d'" + t[e][1] + "' " + d + "\x3e" + t[e][0] + "\x3c/option\x3e"
                                }
                            SiqConfig.enablePopularitySorting && (d = "" != b.filter && "popularity" == b.filter ? "selected\x3d'selected'" : "", c += "\x3coption value\x3d'-popularity' " + d + "\x3ePopularity\x3c/option\x3e");
                            c += '\x3c/select\x3e\x3cdiv class\x3d"siq-mobile-sort-icon"\x3e\x3cselect class\x3d"siq-mobile-sort-dd" aria-label\x3d"Sort results by"\x3e';
                            for (e in t) "string" == typeof t[e][1] && (d = "" != b.filter &&
                                b.filter == t[e][1] ? "selected\x3d'selected'" : "", c += "\x3coption value\x3d'" + t[e][1] + "' " + d + "\x3e" + t[e][0] + "\x3c/option\x3e");
                            c += '\x3c/select\x3e\x3cdiv class\x3d"siq-mobile-sort-dd-title"\x3eSort\x3c/div\x3e\x3cul class\x3d"siq-mobile-sort-dd-list" style\x3d"display: none;"\x3e';
                            for (e in t) "string" == typeof t[e][1] && (c += "\x3cli data-sort\x3d'" + t[e][1] + "' " + ("" != b.filter && b.filter == t[e][1] ? "class\x3d'siq-sort-selected'" : "") + "\x3e" + t[e][0] + "\x3c/option\x3e");
                            c += "\x3c/ul\x3e\x3c/div\x3e\x3c/div\x3e"
                        }
                        SiqConfig.enableResultsPageFacet &&
                            (c += '\x3cdiv class\x3d"siq-grdfilter"\x3e\x3cul\x3e\x3cli\x3e\x3ca href\x3d"javascript:;" class\x3d"siq-show-hide-facet"\x3e\x3cimg src\x3d"' + I + 'img/facet-filter.svg" alt\x3d"Hide or show facet options"\x3e\x3cspan class\x3d"siq-visually-hidden"\x3ehide or show facet options\x3c/span\x3e\x3c/a\x3e\x3c/li\x3e\x3c/ul\x3e\x3c/div\x3e', c = c + '\x3cdiv class\x3d"siq-grdfilter-mobile"\x3e\x3cul\x3e\x3cli\x3e\x3ca href\x3d"javascript:;" class\x3d"siq-show-hide-facet-btn"\x3eFilter\x3c/a\x3e\x3c/li\x3e\x3c/ul\x3e\x3c/div\x3e\x3cdiv class\x3d"siq-toglicons"\x3e\x3cul\x3e' +
                                ('\x3cli class\x3d"siq-list-view siq-view-layout ' + ("GRID" !== SiqConfig.resultPageLayout ? "siq-view-active" : "") + '" data-siqlayout\x3d"LIST"\x3e\x3ca href\x3d"javascript:;" aria-label\x3d"List view"\x3e\x3cimg src\x3d"' + I + 'img/list-view.png" alt\x3d"view results in list view"/\x3e\x3c/a\x3e\x3c/li\x3e'), c += '\x3cli class\x3d"siq-grid-view siq-view-layout ' + ("GRID" === SiqConfig.resultPageLayout ? "siq-view-active" : "") + '" data-siqlayout\x3d"GRID"\x3e\x3ca href\x3d"javascript:;" aria-label\x3d"Grid view"\x3e\x3cimg src\x3d"' +
                                I + 'img/grid-view.png" alt\x3d"view results in grid view"/\x3e\x3c/a\x3e\x3c/li\x3e', c += "\x3c/ul\x3e\x3c/div\x3e");
                        a += c + "\x3c/div\x3e";
                        return a + "\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e"
                    },
                    R = function(a, c, e, d, f) {
                        var g = "";
                        if ("undefined" != typeof a && "undefined" != typeof c && "undefined" != typeof e && 0 < c && 0 < e) var l = (a + 1) * c,
                            l = e > l ? l : e,
                            g = g + '\x3cdiv class\x3d"siq-show-result"\x3e\x3cdiv\x3e',
                            q = SiqConfig.customSearchResultsInfoText ? SiqConfig.customSearchResultsInfoText : "Showing ##offset## to ##limit## of ##total## Results",
                            q = q.replace("##offset##", "\x3cspan\x3e" + (f ? 1 : a * c + 1).toLocaleString() + "\x3c/span\x3e"),
                            q = q.replace("##limit##", "\x3cspan\x3e" + l.toLocaleString() + "\x3c/span\x3e"),
                            q = q.replace("##total##", "\x3cspan\x3e" + e.toLocaleString() + "\x3c/span\x3e"),
                            g = g + (q + " for '" + h(b.query) + "'"),
                            g = g + "\x3c/div\x3e\x3c/div\x3e";
                        if (d) siq_S("." + b.searchFiltersLeftTd).html(g);
                        else return g
                    },
                    ra = function(a) {
                        var c = "";
                        if (SiqConfig.showAuthorAndDate && "undefined" != typeof a.author && null != a.author)
                            for (var e in a.author) "string" == typeof a.author[e] &&
                                (c += a.author[e] + (e == a.author.length - 1 ? "" : ", "));
                        if ("" != c) {
                            a = a.timestamp;
                            if ("undefined" != typeof a && null != a && "" != a) {
                                var d;
                                try {
                                    var f = new Date(a),
                                        g = f.getMonth(),
                                        l = f.getFullYear(),
                                        q = f.getDate(),
                                        m = q.toString(),
                                        q = 11 == q || 12 == q || 13 == q ? q + "th" : 1 == m.substring(m.length - 1, m.length) ? q + "st" : 2 == m.substring(m.length - 1, m.length) ? q + "nd" : 3 == m.substring(m.length - 1, m.length) ? q + "rd" : q + "th";
                                    d = [
                                        ["Jan", "January"],
                                        ["Feb", "February"],
                                        ["Mar", "March"],
                                        ["Apr", "April"],
                                        ["May", "May"],
                                        ["Jun", "June"],
                                        ["Jul", "July"],
                                        ["Aug", "August"],
                                        ["Sep", "September"],
                                        ["Oct", "October"],
                                        ["Nov", "November"],
                                        ["Dec", "December"]
                                    ][g][0] + " " + q + ", " + l
                                } catch (k) {
                                    d = ""
                                }
                                a = "" != d ? " on " + d : "";
                                "" !== a && (a = '\x3cspan class\x3d"siq-record-date"\x3e' + a + "\x3c/span\x3e")
                            }
                            return "\x3cdiv class\x3d'" + b.resultAuthorClass + "'\x3eby " + c + a + "\x3c/div\x3e"
                        }
                        return ""
                    },
                    sa = function(a) {
                        var c = "";
                        if (SiqConfig.showCategory && "undefined" != typeof a.categories && null != a.categories && 0 < a.categories.length) {
                            var c = c + ("\x3cdiv class\x3d'" + b.resultCategoryWrapperClass + "'\x3e"),
                                c = c + "\x3cul\x3e",
                                e = 0,
                                d;
                            for (d in a.categories)
                                if ("string" == typeof a.categories[d] && (c += "\x3cli\x3e" + F(a.categories[d]) + "\x3c/li\x3e", e++, 2 <= e)) break;
                            c += "\x3c/ul\x3e\x3c/div\x3e"
                        }
                        return c
                    },
                    ta = function(a) {
                        var c = "";
                        if (SiqConfig.showTag && "undefined" != typeof a.tags && null != a.tags && 0 < a.tags.length) {
                            var c = c + ("\x3cdiv class\x3d'" + b.resultTagsWrapperClass + "'\x3e"),
                                c = c + "\x3cul\x3e",
                                e = 0,
                                d;
                            for (d in a.tags)
                                if ("string" == typeof a.tags[d] && (c += "\x3cli\x3e" + F(a.tags[d]) + "\x3c/li\x3e", e++, 2 <= e)) break;
                            c += "\x3c/ul\x3e\x3c/div\x3e"
                        }
                        return c
                    },
                    Y = H(location.href),
                    Z = function(a) {
                        var b = [];
                        a.thumbnail_large_url && (H(a.thumbnail_large_url) == Y && b.push(a.thumbnail_large_url.replace(/^https?:/i, "")), b.push(a.thumbnail_large_url));
                        a.image && a.image instanceof Array && 0 < a.image.length && (a.image[0] && "false" != a.image[0] && (H(a.image[0]) == Y && b.push(a.image[0].replace(/^https?:/i, "")), b.push(a.image[0])), 1 < a.image.length && a.image[1] && "false" != a.image[1] && (H(a.image[1]) == Y && b.push(a.image[1].replace(/^https?:/i, "")), b.push(a.image[1])));
                        return b
                    },
                    T = function(a) {
                        return !!a.thumbnail_large_url ||
                            !!a.image && a.image instanceof Array && 0 < a.image.length && (!!a.image[0] && "false" != a.image[0] || 1 < a.image.length && !!a.image[1] && "false" != a.image[1])
                    };
                window.SIQ_showNextImgRP = window.SIQ_showNextImgRP || function(a, b) {
                    var c = parseInt(b.getAttribute("data-siq_img_index")) + 1;
                    c < a.length && (b.setAttribute("data-siq_img_index", c), b.src = a[c], c === a.length - 1 && siq_S(b).parents("#siq_search_results .has-image").removeClass("has-image").addClass("no-image"))
                };
                var ua = function(a, c) {
                        c = "" + ("\x3cdiv class\x3d'" + b.singleElementClass +
                            " " + b.singleElementExtraClass + " siq-single-" + a.externalId + "'\x3e");
                        var e = T(a) ? "has-image" : "no-image";
                        c += "\x3cdiv class\x3d'" + b.resultTextClass + " " + e + "'\x3e";
                        c += "\x3ctable class\x3d'" + b.dataTableClass + "'\x3e\x3ctr\x3e";
                        c += "\x3ctd class\x3d'" + b.imageTd + " " + e + "'\x3e";
                        var d = "";
                        if (1 == b.show_images) {
                            T(a);
                            var f = Z(a),
                                g = I + "img/siq-img-thumbnail.png";
                            D = null != D ? D : g;
                            f.push(D);
                            g != D && f.push(g);
                            g = 'alt\x3d"' + (a.title || "") + '"';
                            d += "\x3cdiv class\x3d'" + b.resultImageClass + " " + e + "'\x3e";
                            d += '\x3cimg src\x3d"' + f[0] + '" data-siq_img_index\x3d"0" onerror\x3d"SIQ_showNextImgRP([\'' +
                                f.join("','") + "'], this)\" onload\x3d\"SiqContainer.triggerEvent(siq_S(this).parents('._siq_main_searchbox').find('.siq-scrollbox')[0] || document, 'siq-scrollbox-resize')\" " + g + " /\x3e";
                            a.merchantLogoUrl ? d += '\x3cimg src\x3d"' + a.merchantLogoUrl + '" class\x3d"siq-merchant-logo" onerror\x3d"siq_S(this).remove()" ' + g + " /\x3e" : a.merchantUrl ? d += '\x3cimg src\x3d"' + a.merchantUrl.replace(/^(https?:\/\/)?/, "//") + '/favicon.ico" class\x3d"siq-merchant-logo" onerror\x3d"siq_S(this).remove()" ' + g + " /\x3e" : a.merchant &&
                                (d += '\x3cimg src\x3d"' + a.merchant.replace(/^(https?:\/\/)?/, "//") + '/favicon.ico" class\x3d"siq-merchant-logo" onerror\x3d"siq_S(this).remove()" ' + g + " /\x3e");
                            d += "\x3c/div\x3e"
                        }
                        c = c + d + "\x3c/td\x3e" + ("\x3ctd class\x3d'" + b.contentTd + "'\x3e");
                        e = a.url;
                        H(e) == ja && (e = e.replace(/^https?:/i, ""));
                        c += "\x3cdiv class\x3d'" + b.resultTextHeadingClass + "'\x3e\x3ca" + (SiqConfig.openResultInTab ? ' target\x3d"_blank"' : "") + " href\x3d'" + e + "' class\x3d'siq-partner-result' data-engineKey\x3d'" + a.engineKey + "'\x3e" + a.title + "\x3c/a\x3e\x3c/div\x3e";
                        "number" === typeof a.regularPrice && (c += "\x3cdiv class\x3d'siq-prdtls-price'\x3e", "number" === typeof a.salePrice && a.salePrice < a.regularPrice ? (c += "\x3cspan\x3e" + K(a) + L(a.salePrice) + M(a), c += "\x3cspan class\x3d'striked-price'\x3e" + K(a) + L(a.regularPrice) + M(a) + "\x3c/span\x3e\x3c/span\x3e") : c += "\x3cspan\x3e" + K(a) + L(a.regularPrice) + M(a) + "\x3c/span\x3e", c += "\x3c/div\x3e");
                        d = ra(a);
                        f = sa(a);
                        g = ta(a);
                        if (d || f || g || SiqConfig.crossSiteSearchOnPage) c += "\x3cdiv class\x3d'srch-res-info'\x3e", SiqConfig.crossSiteSearchOnPage &&
                            a.domain && (c += "\x3cspan class\x3d'siq-domain-name'\x3e" + a.domain + "\x3c/span\x3e\x26nbsp;\x26nbsp;"), c = c + (d + "\x26nbsp;\x26nbsp;") + (f + "\x26nbsp;\x26nbsp;"), c += g, c += "\x3c/div\x3e";
                        SiqConfig.showPostLink && e && (c += "\x3cdiv class\x3d'srch-res-info'\x3e", c = e.match(/^\/\//i) ? c + ("\x3cdiv class\x3d'" + b.resultLinkClass + "'\x3e" + location.protocol + e + "\x3c/div\x3e") : c + ("\x3cdiv class\x3d'" + b.resultLinkClass + "'\x3e" + e + "\x3c/div\x3e"), c += "\x3c/div\x3e");
                        e = "";
                        "undefined" != typeof b.desc_length && 0 < parseInt(b.desc_length) &&
                            ((d = 0, f = parseInt(b.desc_length), g = a.documentType || "post", (SiqConfig.descriptionFields && SiqConfig.descriptionFields[g] || !a.body) && a.excerpt || !a.body) ? a.excerpt && (-1 < a.excerpt.indexOf("\x3cem\x3e") && 250 != f && (d = a.excerpt.indexOf("\x3cem\x3e"), 5 <= d && (d -= 3), f = d + f), e = a.excerpt.substring(d, f)) : (-1 < a.body.indexOf("\x3cem\x3e") && 250 != f && (d = a.body.indexOf("\x3cem\x3e"), 5 <= d && (d -= 3), f = d + f), e = a.body.substring(d, f)));
                        e && (0 > e.indexOf("\x3cem\x3e") && 250 < e.length && (e = e.substring(0, 250)), c += "\x3cdiv class\x3d'" + b.resultDescClass +
                            "'\x3e\x3cdiv\x3e..." + e + "...\x3c/div\x3e\x3c/div\x3e");
                        c += "\x3c/div\x3e";
                        c += "\x3cdiv class\x3d'srch-det-arrow'\x3e\x3cdiv class\x3d'img-responsive'\x3e\x3c/div\x3e\x3c/div\x3e";
                        c += "\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e";
                        return c += "\x3c/div\x3e"
                    },
                    aa = function(a, c, e) {
                        c = b.searchUrl;
                        var d = encodeURIComponent(b.query),
                            f = b.prettyPermalinks,
                            g = "?"; - 1 < c.indexOf("?") && (g = "\x26");
                        var l = a - 1,
                            q = a + 1,
                            m = e - 1,
                            k = "",
                            n;
                        if (1 < e) {
                            a < e && (k += "\x3cdiv class\x3d'siq-pagination-load-more'\x3e\x3ca href\x3d'javascript:;' id\x3d'siq-load-more-btn' aria-label\x3d'Load more'\x3e\x3cspan\x3eLoad More\x3c/span\x3e\x3c/a\x3e\x3c/div\x3e");
                            k += "\x3cdiv class\x3d'" + b.paginationClass + "' aria-label\x3d'Search results pages' role\x3d'navigation'\x3e\x3cul\x3e";
                            k += '\x3cli class\x3d"siq-pagination-list-item"\x3e';
                            1 < a ? (urlp = 1 == f ? c + l + "/?" + SiqConfig.queryParameter + "\x3d" + h(d) : c + g + "_siq_page\x3d" + l + "\x26_siq_sort\x3d" + b.filter + "\x26" + SiqConfig.queryParameter + "\x3d" + h(d), k += '\x3ca href\x3d"' + urlp + "\" data-page_num\x3d'" + l + "' class\x3d'" + b.paginationActiveClass + " " + b.paginationPreviousClass + " " + b.paginationSingleLinkClass + "' aria-label\x3d'Go to previous page, page " +
                                l + "'\x3e\x26laquo; " + (SiqConfig.paginationPrevText ? SiqConfig.paginationPrevText : "Prev") + "\x26nbsp;\x26nbsp;\x3c/a\x3e") : k += "\x3cspan class\x3d'" + b.paginationDisabledClass + "'\x3e\x26laquo; " + (SiqConfig.paginationPrevText ? SiqConfig.paginationPrevText : "Prev") + "\x26nbsp;\x26nbsp;\x3c/span\x3e";
                            k += "\x3c/li\x3e";
                            if (9 > e)
                                for (n = 1; n <= e; n++) k += '\x3cli class\x3d"siq-pagination-list-item"\x3e', n == a ? k += "\x3cspan class\x3d'" + b.paginationCurrentClass + "' aria-label\x3d'Current page, page " + n + "'\x3e" + n + "\x3c/span\x3e" :
                                    (urlc = 1 == f ? c + n + "/?" + SiqConfig.queryParameter + "\x3d" + h(d) : c + g + "_siq_page\x3d" + n + "\x26_siq_sort\x3d" + b.filter + "\x26" + SiqConfig.queryParameter + "\x3d" + h(d), k += '\x3ca href\x3d"' + urlc + "\" data-page_num\x3d'" + n + "' class\x3d'" + b.paginationSingleLinkClass + "' aria-label\x3d'Go to page " + n + "'\x3e" + n + "\x3c/a\x3e"), k += "\x3c/li\x3e";
                            else if (7 < e)
                                if (3 > a) {
                                    for (n = 1; 6 > n; n++) k += '\x3cli class\x3d"siq-pagination-list-item"\x3e', n == a ? k += "\x3cspan class\x3d'" + b.paginationCurrentClass + "' aria-label\x3d'Current page, page " +
                                        n + "'\x3e" + n + "\x3c/span\x3e" : (urlc1 = 1 == f ? c + n + "/?" + SiqConfig.queryParameter + "\x3d" + h(d) : c + g + "_siq_page\x3d" + n + "\x26_siq_sort\x3d" + b.filter + "\x26" + SiqConfig.queryParameter + "\x3d" + h(d), k += '\x3ca href\x3d"' + urlc1 + "\" data-page_num\x3d'" + n + "' class\x3d'" + b.paginationSingleLinkClass + "' aria-label\x3d'Go to page " + n + "'\x3e" + n + "\x3c/a\x3e"), k += "\x3c/li\x3e";
                                    k += '\x3cli class\x3d"siq-pagination-list-item"\x3e...\x3c/li\x3e';
                                    urllpml = 1 == f ? c + m + "/?" + SiqConfig.queryParameter + "\x3d" + h(d) : c + g + "_siq_page\x3d" + m + "\x26_siq_sort\x3d" +
                                        b.filter + "\x26" + SiqConfig.queryParameter + "\x3d" + h(d);
                                    urllastpage = 1 == f ? c + e + "/?" + SiqConfig.queryParameter + "\x3d" + h(d) : c + g + "_siq_page\x3d" + e + "\x26_siq_sort\x3d" + b.filter + "\x26" + SiqConfig.queryParameter + "\x3d" + h(d);
                                    k = k + '\x3cli class\x3d"siq-pagination-list-item"\x3e' + ('\x3ca href\x3d"' + urllastpage + "\" data-page_num\x3d'" + e + "' class\x3d'" + b.paginationSingleLinkClass + "' aria-label\x3d'Go to page " + e + ", last page'\x3e" + e + "\x3c/a\x3e");
                                    k += "\x3c/li\x3e"
                                } else if (e - 2 > a && 2 < a) {
                                url1 = 1 == f ? c + "1/?" + SiqConfig.queryParameter +
                                    "\x3d" + h(d) : c + g + "_siq_page\x3d1\x26_siq_sort\x3d" + b.filter + "\x26" + SiqConfig.queryParameter + "\x3d" + h(d);
                                url2 = 1 == f ? c + "2/?" + SiqConfig.queryParameter + "\x3d" + h(d) : c + g + "_siq_page\x3d2\x26_siq_sort\x3d" + b.filter + "\x26" + SiqConfig.queryParameter + "\x3d" + h(d);
                                k = k + '\x3cli class\x3d"siq-pagination-list-item"\x3e' + ('\x3ca href\x3d"' + url1 + "\" data-page_num\x3d'1' class\x3d'" + b.paginationSingleLinkClass + "' aria-label\x3d'Go to page 1'\x3e1\x3c/a\x3e");
                                k += "\x3c/li\x3e";
                                2 < a - 1 && (k += '\x3cli class\x3d"siq-pagination-list-item"\x3e...\x3c/li\x3e');
                                for (n = a - 1; n <= a + 1; n++) k += '\x3cli class\x3d"siq-pagination-list-item"\x3e', n == a ? k += "\x3cspan class\x3d'" + b.paginationCurrentClass + "' aria-label\x3d'Page " + n + ", current page'\x3e" + n + "\x3c/span\x3e" : (urlc1 = 1 == f ? c + n + "/?" + SiqConfig.queryParameter + "\x3d" + h(d) : c + g + "_siq_page\x3d" + n + "\x26_siq_sort\x3d" + b.filter + "\x26" + SiqConfig.queryParameter + "\x3d" + h(d), k += '\x3ca href\x3d"' + urlc1 + "\" data-page_num\x3d'" + n + "' class\x3d'" + b.paginationSingleLinkClass + "' aria-label\x3d'Go to page " + n + "'\x3e" + n + "\x3c/a\x3e"),
                                    k += "\x3c/li\x3e";
                                k += '\x3cli class\x3d"siq-pagination-list-item"\x3e...\x3c/li\x3e';
                                urllpml = 1 == f ? c + m + "/?" + SiqConfig.queryParameter + "\x3d" + h(d) : c + g + "_siq_page\x3d" + m + "\x26_siq_sort\x3d" + b.filter + "\x26" + SiqConfig.queryParameter + "\x3d" + h(d);
                                urllastpage = 1 == f ? c + e + "/?" + SiqConfig.queryParameter + "\x3d" + h(d) : c + g + "_siq_page\x3d" + e + "\x26_siq_sort\x3d" + b.filter + "\x26" + SiqConfig.queryParameter + "\x3d" + h(d);
                                k = k + '\x3cli class\x3d"siq-pagination-list-item"\x3e' + ('\x3ca href\x3d"' + urllastpage + "\" data-page_num\x3d'" +
                                    e + "' class\x3d'" + b.paginationSingleLinkClass + "' aria-label\x3d'Go to page " + e + ", last page'\x3e" + e + "\x3c/a\x3e");
                                k += "\x3c/li\x3e"
                            } else
                                for (url1 = 1 == f ? c + "1/?" + SiqConfig.queryParameter + "\x3d" + h(d) : c + g + "_siq_page\x3d1\x26_siq_sort\x3d" + b.filter + "\x26" + SiqConfig.queryParameter + "\x3d" + h(d), url2 = 1 == f ? c + "2/?" + SiqConfig.queryParameter + "\x3d" + h(d) : c + g + "_siq_page\x3d2\x26_siq_sort\x3d" + b.filter + "\x26" + SiqConfig.queryParameter + "\x3d" + h(d), k = k + '\x3cli class\x3d"siq-pagination-list-item"\x3e' + ('\x3ca href\x3d"' +
                                        url1 + "\" data-page_num\x3d'1' class\x3d'" + b.paginationSingleLinkClass + "' aria-label\x3d'Go to page 1'\x3e1\x3c/a\x3e"), k += "\x3c/li\x3e", 2 < e - 4 && (k += '\x3cli class\x3d"siq-pagination-list-item"\x3e...\x3c/li\x3e'), n = e - 4; n <= e; n++) k += '\x3cli class\x3d"siq-pagination-list-item"\x3e', n == a ? k += "\x3cspan class\x3d'" + b.paginationCurrentClass + "'\x3e" + n + "\x3c/span\x3e" : (urlcl = 1 == f ? c + n + "/?" + SiqConfig.queryParameter + "\x3d" + h(d) : c + g + "_siq_page\x3d" + n + "\x26_siq_sort\x3d" + b.filter + "\x26" + SiqConfig.queryParameter + "\x3d" +
                                    h(d), k += '\x3ca href\x3d"' + urlcl + "\" data-page_num\x3d'" + n + "' class\x3d'" + b.paginationSingleLinkClass + "' aria-label\x3d'Go to page " + n + "'\x3e" + n + "\x3c/a\x3e"), k += "\x3c/li\x3e";
                            k += '\x3cli class\x3d"siq-pagination-list-item"\x3e';
                            a < n - 1 ? (urln = 1 == f ? c + q + "/?" + SiqConfig.queryParameter + "\x3d" + h(d) : c + g + "_siq_page\x3d" + q + "\x26_siq_sort\x3d" + b.filter + "\x26" + SiqConfig.queryParameter + "\x3d" + h(d), k += '\x3ca href\x3d"' + urln + "\" data-page_num\x3d'" + q + "' class\x3d'" + b.paginationActiveClass + " " + b.paginationNextClass +
                                " " + b.paginationSingleLinkClass + "' aria-label\x3d'Go to next page, page " + q + "'\x3e\x26nbsp;\x26nbsp;" + (SiqConfig.paginationNextText ? SiqConfig.paginationNextText : "Next") + " \x26raquo;\x3c/a\x3e") : k += "\x3cspan class\x3d'" + b.paginationDisabledClass + "'\x3e\x26nbsp;\x26nbsp;" + (SiqConfig.paginationNextText ? SiqConfig.paginationNextText : "Next") + " \x26raquo;\x3c/span\x3e";
                            k += "\x3c/li\x3e\x3c/ul\x3e\x3c/div\x3e"
                        }
                        return k
                    },
                    ba = function() {
                        var a = [];
                        null != p && (a = p);
                        var b = {};
                        siq_S(a).each(function() {
                            b[this.field] ?
                                b[this.field].push(0 < this.value.indexOf('" AND ') ? "(" + this.value + ")" : this.value) : b[this.field] = [0 < this.value.indexOf('" AND ') ? "(" + this.value + ")" : this.value]
                        });
                        var a = [],
                            e;
                        for (e in b)
                            if (b.hasOwnProperty(e)) {
                                var d = b[e];
                                a.push(1 < d.length ? "(" + d.join(" " + Ea + " ") + ")" : d[0])
                            }
                        e = a.join(" AND ");
                        return 0 < e.length ? (1 < a.length || 0 > e.indexOf("(") ? "(" + e + ")" : e) + " AND " : ""
                    },
                    za = function(a, c, e) {
                        if (a.hasClass(b.mainElementClass) && SiqConfig.enableResultsPageFacet) {
                            window.siq_search_no_records = !1;
                            "undefined" != typeof c.main &&
                                "undefined" != typeof c.main.totalResults && 0 == c.main.totalResults && (window.siq_search_no_records = !0);
                            SiqConfig.multiSelectFacetEnabled && (0 === z.length && c.main.facetedSearchInfos && 0 < c.main.facetedSearchInfos.length ? z = c.main.facetedSearchInfos : c.main.facetedSearchInfos = z);
                            var d = c.main.facetedSearchInfos;
                            (va = SiqConfig.enableResultsPageFacet && d instanceof Array && 0 < d.length ? 1 != d.length || -1 != d[0].order || 1 != d[0].results.length || u ? !0 : !1 : !1) ? (a.removeClass("siq-filter-off"), a.addClass("siq-filter-on siq-filter-visible")) :
                            (a.removeClass("siq-filter-on"), a.addClass("siq-filter-off"));
                            a.removeClass(b.loadingClass);
                            e || (a.find("." + b.singleElementClass).remove(), a.find("." + b.paginationClass).remove(), a.find(".siq-pagination-load-more").remove());
                            0 == a.children(".siq-prodfacet-contR").length ? a.append('\x3cdiv class\x3d"siq-prodfacet-contL"\x3e\x3c/div\x3e\x3cdiv class\x3d"siq-prodfacet-contR"\x3e\x3c/div\x3e') : (a.children(".siq-prodfacet-contR").removeAttr("style"), a.hasClass("siq-filter-on") && !ca() ? (a.addClass("siq-filter-invisible").removeClass("siq-filter-visible"),
                                a.children(".siq-prodfacet-contR").css("width", "100%")) : a.hasClass("siq-filter-on") && a.removeClass("siq-filter-invisible").addClass("siq-filter-visible"));
                            e || (d = a.children(".siq-prodfacet-contL"), d.html(""), c.main.facetedSearchInfos && 0 < c.main.facetedSearchInfos.length && d.append(Ia(c.main.facetedSearchInfos)));
                            d = a.children(".siq-prodfacet-contR");
                            d.removeClass(b.loadingClass);
                            if (!e && 0 == b.removeCurrentResult && 0 == a.find("." + b.searchKeywordBoxClass).length) {
                                var f;
                                f = S();
                                d.append(f);
                                siq_S("body").addClass(b.bodyClass);
                                siq_S("#" + b.inputBoxId).outerWidth();
                                siq_S("#" + b.inputBoxId).addClass(b.inputBoxClass).wrap(v).parents("form").addClass(b.formClass);
                                siq_S("#" + b.inputBoxId).parents("." + b.searchTopClass).prepend("\x3cspan class\x3d'closeThis'\x3e\x3c/span\x3e")
                            }
                            if ("GRID" === SiqConfig.resultPageLayout) {
                                var g = siq_S(".siq-prdrslts-box").length;
                                if ("undefined" != typeof c.main.records && 0 < c.main.records.length || SiqConfig.crossSiteSearchOnPage && "undefined" != typeof c.partners && "undefined" != typeof c.partners.records && 0 < c.partners.records.length) {
                                    window.siq_search_no_records &&
                                        (c.main = c.partners);
                                    f = c.main.records;
                                    R(c.main.currentPage, c.main.recordsPerPage, c.main.totalResults, !0, e);
                                    siq_S(".siq_filters").removeClass("hide");
                                    var l, q = "";
                                    e || (q = aa(c.main.currentPage + 1, c.main.recordsPerPage, c.main.numPages));
                                    e || d.append('\x3cdiv class\x3d"siq-prdrslts-row"\x3e\x3cdiv class\x3d"siq-prdrslts-cont"\x3e\x3ctable class\x3d"siq-prdgrid-cont"\x3e\x3ctbody\x3e\x3c/tbody\x3e\x3c/table\x3e\x3c/div\x3e\x3c/div\x3e');
                                    var m = d.find(".siq-prdrslts-cont table.siq-prdgrid-cont tbody tr:eq(0) td").length,
                                        m = e && 0 < m ? m : Math.max(Math.floor(wa() / 221), 2),
                                        k = d.find(".siq-prdrslts-cont table.siq-prdgrid-cont tbody"),
                                        n = g,
                                        p = 100 / m + "%";
                                    d.find(".siq-prdrslts-cont table.siq-prdgrid-cont tbody td").not(".siq-prdrslts-box").remove();
                                    for (var h in f)
                                        if ("undefined" != typeof f[h].externalId && "undefined" != typeof f[h].url && "undefined" != typeof f[h].title) {
                                            l = f[h];
                                            var x = I + "img/siq-img-thumbnail.png";
                                            D = null != D ? D : x;
                                            var x = '\x3cdiv class\x3d"siq-prdrslts-box-inner"\x3e',
                                                r = l.url;
                                            H(r) == ja && (r = r.replace(/^https?:/i, ""));
                                            x += "\x3ca " +
                                                (SiqConfig.openResultInTab ? ' target\x3d"_blank"' : "") + ' class\x3d"siq-prdbx" href\x3d"' + r + '" data-engineKey\x3d"' + l.engineKey + '"\x3e';
                                            if (1 == b.show_images) var x = x + '\x3cdiv class\x3d"siq-prdimg"\x3e',
                                                r = T(l),
                                                Ja = Z(l),
                                                w = 'alt\x3d"' + l.title + '"',
                                                x = r ? x + ('\x3cimg src\x3d"' + Ja[0] + '" onerror\x3d"this.src\x3d\'' + D + "'\" " + w + " /\x3e") : x + ("\x3cimg src\x3d'" + D + "' " + w + " /\x3e"),
                                                x = x + "\x3c/div\x3e";
                                            x = x + '\x3cdiv class\x3d"siq-prdtls"\x3e' + ("\x3ch3\x3e" + F(l.title) + "\x3c/h3\x3e");
                                            "number" === typeof l.regularPrice && (x += "\x3cdiv class\x3d'siq-prdtls-price'\x3e",
                                                "number" === typeof l.salePrice && l.salePrice < l.regularPrice ? (x += "\x3ch4\x3e" + K(l) + L(l.salePrice) + M(l) + "\x3c/h4\x3e", x += "\x3ch5\x3e" + K(l) + L(l.regularPrice) + M(l) + "\x3c/h5\x3e") : x += "\x3ch4\x3e" + K(l) + L(l.regularPrice) + M(l) + "\x3c/h4\x3e", x += "\x3c/div\x3e");
                                            "undefined" !== typeof l.rating && null !== l.rating && (x = x + "\x3cdiv class\x3d'siq-prdratings'\x3e\x3cul\x3e" + ('\x3cli\x3e\x3cdiv class\x3d"siq-starratings"\x3e\x3cdiv class\x3d"siq-starratings-top" style\x3d"width: ' + l.rating / 5 * 100 + '%"\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3c/div\x3e \x3cdiv class\x3d"siq-starratings-bottom"\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3c/div\x3e \x3c/div\x3e\x3c/li\x3e'),
                                                "undefined" !== typeof l.ratingCount && null !== l.ratingCount && (x += "\x26nbsp;\x3cli\x3e(" + l.ratingCount + ")\x3c/li\x3e"), x += "\x3c/ul\x3e\x3c/div\x3e");
                                            l = x + "\x3c/div\x3e\x3c/a\x3e\x3c/div\x3e";
                                            0 == n % m && k.append("\x3ctr\x3e\x3c/tr\x3e");
                                            k.find("tr:last").append("\x3ctd class\x3d'siq-prdrslts-box' style\x3d'width:" + p + "'\x3e" + l + "\x3c/td\x3e");
                                            n++;
                                            g++
                                        }
                                    for (; 0 != n++ % m;) k.find("tr:last").append("\x3ctd style\x3d'width:" + p + "'\x3e\x3c/td\x3e");
                                    e && c.main.currentPage === c.main.numPages - 1 && siq_S("#siq-load-more-btn").remove();
                                    "" != q && d.append(q)
                                } else d.removeClass(b.loadingClass), d.append("\x3cdiv class\x3d'" + b.messageClass + " " + b.errorClass + "'\x3e" + b.errorDefaultText + "\x3c/div\x3e")
                            } else if (h = siq_S("#siq_search_results .search-results-row.siq-single-result").length, f = !1, "undefined" != typeof c.main.records && 0 < c.main.records.length || SiqConfig.crossSiteSearchOnPage && "undefined" != typeof c.partners && "undefined" != typeof c.partners.records && 0 < c.partners.records.length) {
                                window.siq_search_no_records && (c.main = c.partners, f = !0);
                                q = c.main.records;
                                R(c.main.currentPage, c.main.recordsPerPage, c.main.totalResults, !0, e);
                                siq_S(".siq_filters").removeClass("hide");
                                k = "";
                                e || (k = aa(c.main.currentPage + 1, c.main.recordsPerPage, c.main.numPages));
                                for (g in q) "undefined" != typeof q[g].externalId && "undefined" != typeof q[g].url && "undefined" != typeof q[g].title && (m = ua(q[g], f), 0 == h ? 0 == d.find(".siq-ads-top").length ? (n = "\x3cdiv class\x3d'siq-ads siq-ads-top'\x3e\x3c/div\x3e", d.append(n), d.append(m)) : (siq_S(m).insertAfter(".siq-ads-top"), siq_S(".siq-ads-top").show()) :
                                    0 == h % 3 ? (n = "siq-ads-number-" + h / 3, 0 == d.find("." + n).length ? (n = "\x3cdiv class\x3d'siq-ads siq-ads-middle " + n + "'\x3e\x3c/div\x3e", e ? (siq_S(n).insertBefore(d.find(".siq-pagination-load-more")), siq_S(m).insertBefore(d.find(".siq-pagination-load-more"))) : (d.append(n), d.append(m))) : (siq_S(m).insertAfter("." + n), siq_S("." + n).show())) : e ? siq_S(m).insertBefore(d.find(".siq-pagination-load-more")) : (n = d.find("." + b.singleElementClass + ":last"), siq_S(m).insertAfter(n)), h == q.length - 1 && (0 == d.find(".siq-ads-bottom").length ?
                                        (n = "\x3cdiv class\x3d'siq-ads siq-ads-bottom'\x3e\x3c/div\x3e", d.append(n)) : siq_S(".siq-ads-bottom").show()), h++);
                                e && (siq_S(".siq-ads-bottom").insertBefore(siq_S(".siq-pagination-load-more")), c.main.currentPage === c.main.numPages - 1 && siq_S("#siq-load-more-btn").remove());
                                "" != k && d.append(k)
                            } else d.removeClass(b.loadingClass), d.append("\x3cdiv class\x3d'" + b.messageClass + " " + b.errorClass + "'\x3e" + b.errorDefaultText + "\x3c/div\x3e");
                            680 >= siq_S(window).width() && a.outerWidth() > siq_S(window).width() ? a.css("width",
                                .98 * siq_S(window).width()) : a.removeAttr("style");
                            e || xa()
                        } else {
                            window.siq_search_no_records = !1;
                            "undefined" != typeof c.main && "undefined" != typeof c.main.totalResults && 0 == c.main.totalResults && (window.siq_search_no_records = !0);
                            a.removeClass(b.loadingClass);
                            e || (a.find("." + b.singleElementClass).remove(), a.find("." + b.paginationClass).remove(), a.find(".siq-pagination-load-more").remove());
                            e || 0 != b.removeCurrentResult || 0 != a.find("." + b.searchKeywordBoxClass).length || (h = S(), a.append(h), siq_S("body").addClass(b.bodyClass),
                                siq_S("#" + b.inputBoxId).outerWidth(), siq_S("#" + b.inputBoxId).addClass(b.inputBoxClass).wrap(v).parents("form").addClass(b.formClass), siq_S("#" + b.inputBoxId).parents("." + b.searchTopClass).prepend("\x3cspan class\x3d'closeThis'\x3e\x3c/span\x3e"));
                            h = siq_S("#siq_search_results .search-results-row.siq-single-result").length;
                            g = !1;
                            if ("undefined" != typeof c.main.records && 0 < c.main.records.length || SiqConfig.crossSiteSearchOnPage && "undefined" != typeof c.partners && "undefined" != typeof c.partners.records && 0 < c.partners.records.length) {
                                window.siq_search_no_records &&
                                    (c.main = c.partners, g = !0);
                                f = c.main.records;
                                R(c.main.currentPage, c.main.recordsPerPage, c.main.totalResults, !0, e);
                                siq_S(".siq_filters").removeClass("hide");
                                m = "";
                                e || (m = aa(c.main.currentPage + 1, c.main.recordsPerPage, c.main.numPages));
                                for (d in f) "undefined" != typeof f[d].externalId && "undefined" != typeof f[d].url && "undefined" != typeof f[d].title && (q = ua(f[d], g), 0 == h ? 0 == a.find(".siq-ads-top").length ? (k = "\x3cdiv class\x3d'siq-ads siq-ads-top'\x3e\x3c/div\x3e", a.append(k), a.append(q)) : (siq_S(q).insertAfter(".siq-ads-top"),
                                    siq_S(".siq-ads-top").show()) : 0 == h % 3 ? (k = "siq-ads-number-" + h / 3, 0 == a.find("." + k).length ? (k = "\x3cdiv class\x3d'siq-ads siq-ads-middle " + k + "'\x3e\x3c/div\x3e", e ? (siq_S(k).insertBefore(a.find(".siq-pagination-load-more")), siq_S(q).insertBefore(a.find(".siq-pagination-load-more"))) : (a.append(k), a.append(q))) : (siq_S(q).insertAfter("." + k), siq_S("." + k).show())) : e ? siq_S(q).insertBefore(a.find(".siq-pagination-load-more")) : (k = a.find("." + b.singleElementClass + ":last"), siq_S(q).insertAfter(k)), h == f.length - 1 && (0 ==
                                    a.find(".siq-ads-bottom").length ? (k = "\x3cdiv class\x3d'siq-ads siq-ads-bottom'\x3e\x3c/div\x3e", a.append(k)) : siq_S(".siq-ads-bottom").show()), h++);
                                e && (siq_S(".siq-ads-bottom").insertBefore(siq_S(".siq-pagination-load-more")), c.main.currentPage === c.main.numPages - 1 && siq_S("#siq-load-more-btn").remove());
                                "" != m && a.append(m)
                            } else a.removeClass(b.loadingClass), a.append("\x3cdiv class\x3d'" + b.messageClass + " " + b.errorClass + "'\x3e" + b.errorDefaultText + "\x3c/div\x3e");
                            680 >= siq_S(window).width() && a.outerWidth() >
                                siq_S(window).width() ? a.css("width", .98 * siq_S(window).width()) : a.removeAttr("style");
                            0 == b.removeCurrentResult && xa()
                        }
                        window.siq_S && window.siq_reloadFeed && SiqContainer.triggerEvent(document, "custom-search-page-results-loaded");
                        SiqContainer.triggerEvent(document, "siq-search-page-results-render-complete");
                        a: {
                            a = document.cookie.split(";");
                            for (c = 0; c < a.length; c++) {
                                for (e = a[c];
                                    " " == e.charAt(0);) e = e.substring(1);
                                if (0 == e.indexOf("search_enter\x3d")) {
                                    a = e.substring(13, e.length);
                                    break a
                                }
                            }
                            a = ""
                        }
                        if ("" !== a) try {
                            document.cookie =
                                "search_enter\x3d;expires\x3dThu, 01 Jan 1970 00:00:00 UTC; path\x3d/;";
                            var t = window.location.pathname + window.location.search;
                            if ("undefined" !== typeof ka && "" !== ka) {
                                try {
                                    gtag("event", "page_view", {
                                        page_path: t
                                    })
                                } catch (ya) {
                                    try {
                                        ga("send", "pageview", t)
                                    } catch (Ka) {
                                        console.error(Ka)
                                    }
                                }
                                window.google_tag_manager.dataLayer.gtmLoad && dataLayer.push({
                                    event: "pageview",
                                    page: {
                                        path: t
                                    }
                                })
                            }
                        } catch (ya) {
                            console.error(ya)
                        }
                    },
                    F = function(a) {
                        return a.replace(/'/g, "\x26apos;").replace(/"/g, "\x26quot;").replace(/</g, "\x26lt;").replace(/>/g,
                            "\x26gt;").replace(/&lt;(\/?em)&gt;/g, "\x3c$1\x3e")
                    },
                    L = function(a) {
                        a = (a + "").split(".");
                        1 == a.length ? a.push("00") : 1 == a[1].length && (a[1] += "0");
                        return a.join(".")
                    },
                    K = function(a) {
                        if ("undefined" !== typeof a.currencySymbol && "undefined" !== typeof a.currencySymbolPosition) {
                            if ("LEFT" === a.currencySymbolPosition) return a.currencySymbol;
                            if ("LEFT_SPACE" === a.currencySymbolPosition) return a.currencySymbol + "\x26nbsp;"
                        }
                        return ""
                    },
                    M = function(a) {
                        if ("undefined" !== typeof a.currencySymbol && "undefined" !== typeof a.currencySymbolPosition) {
                            if ("RIGHT" ===
                                a.currencySymbolPosition) return a.currencySymbol;
                            if ("RIGHT_SPACE" === a.currencySymbolPosition) return "\x26nbsp;" + a.currencySymbol
                        }
                        return ""
                    },
                    va = !1,
                    ca = function() {
                        return va && siq_S(".siq-prodfacet-contL").is(":visible")
                    },
                    wa = function() {
                        return siq_S("#siq_search_results").innerWidth() * (ca() ? .73 : 1)
                    };
                siq_S(document).on("siq-search-page-results-render-complete", function() {
                    0 < siq_S("#siq-load-more-btn").length && !siq_S("#siq-load-more-btn").is(":visible") && siq_S("html, body").animate({
                            scrollTop: siq_S("#" + b.mainElementClass).offset().top
                        },
                        b.scrollAnimationDelay)
                });
                siq_S(document).on("click", ".siq-mobile-sort-dd-list li", function() {
                    siq_S(this).addClass("siq-sort-selected").siblings().removeAttr("class");
                    var a = siq_S(this).attr("data-sort");
                    siq_S(".siq-mobile-sort-icon .siq-mobile-sort-dd-list").fadeOut();
                    siq_S(".siq-mobile-sort-dd-overlay").remove();
                    siq_S(".siq-mobile-sort-icon select").val(a).change()
                });
                siq_S(document).on("click", ".siq-mobile-sort-dd-title", function() {
                    siq_S(".siq-mobile-sort-icon .siq-mobile-sort-dd-list li.siq-sort-selected").removeClass("siq-sort-selected");
                    siq_S(".siq-mobile-sort-icon .siq-mobile-sort-dd-list li[data-sort\x3d" + siq_S(".siq-mobile-sort-icon select").val() + "]").addClass("siq-sort-selected");
                    siq_S(".siq-mobile-sort-icon .siq-mobile-sort-dd-list").fadeToggle()
                });
                siq_S(document).on("click", function(a) {
                    !siq_S(a.target).is(".siq-mobile-sort-icon") && 0 == siq_S(".siq-mobile-sort-icon").find(a.target).length && siq_S(".siq-mobile-sort-dd-list").is(":visible") && siq_S(".siq-mobile-sort-dd-list").fadeToggle()
                });
                var da = function(a) {
                        if (1 == b.is_wordpress) window.location.href =
                            b.siteUrl + "/?s\x3d" + encodeURIComponent(b.query) + "\x26siq_e\x3d1";
                        else if (a.removeClass(b.loadingClass), 0 == a.find("." + b.messageClass).length) {
                            var c;
                            c = S();
                            a.append(c);
                            a.append("\x3cdiv class\x3d'" + b.singleElementClass + " " + b.singleElementExtraClass + "'\x3e\x3cdiv class\x3d'" + b.messageClass + " " + b.errorClass + "'\x3e" + b.errorDefaultText + "\x3c/div\x3e\x3c/div\x3e")
                        }
                    },
                    Aa = function(a) {
                        a.removeClass("loading");
                        if (0 == a.find("." + b.messageClass).length)
                            if (1 == b.is_wordpress) a.append("\x3cdiv class\x3d'" + b.messageClass +
                                " " + b.errorClass + "'\x3e" + b.serverDownText + "\x3c/div\x3e");
                            else {
                                var c;
                                c = S();
                                a.append(c);
                                a.append("\x3cdiv class\x3d'" + b.singleElementClass + " " + b.singleElementExtraClass + "'\x3e\x3cdiv class\x3d'" + b.messageClass + " " + b.errorClass + "'\x3e" + b.serverDownText + "\x3c/div\x3e\x3c/div\x3e")
                            }
                    },
                    U = null,
                    Ba = function() {
                        if (history.pushState) {
                            var a = "";
                            0 <= SiqConfig.resultPageUrl.indexOf("*") && (a = SiqConfig.resultPageUrl.replace("*", encodeURIComponent(window.siq_search_query)));
                            a += location.search.replace(new RegExp("(\\?|\x26)" +
                                SiqConfig.queryParameter + "\x3d[^\x26]*"), "$1" + SiqConfig.queryParameter + "\x3d" + window.siq_search_query).replace(/(\?|&)_siq_page=[^&]*/, "$1_siq_page\x3d" + (b.page + 1));
                            !a.match(new RegExp("(\\?" + SiqConfig.queryParameter + "\x3d|\\?.*\x26" + SiqConfig.queryParameter + "\x3d)")) && 0 > SiqConfig.resultPageUrl.indexOf("*") && (a += (0 > a.indexOf("?") ? "?" : "\x26") + SiqConfig.queryParameter + "\x3d" + window.siq_search_query);
                            a.match(/(\?_siq_page=|\?.*&_siq_page=)/) || (a += (0 > a.indexOf("?") ? "?" : "\x26") + "_siq_page\x3d" + (b.page +
                                1));
                            for (var a = a.match(/(\?|&)_siq_sort=[^&]*/) ? a.replace(/(\?|&)_siq_sort=[^&]*/, "$1_siq_sort\x3d" + b.filter) : a + ((0 > a.indexOf("?") ? "?" : "\x26") + "_siq_sort\x3d" + b.filter), a = a.replace(new RegExp("[\\?\x26](" + P + "|" + Q + ")\x3d[^\x26]*", "g"), ""), c = 0; c < p.length; c++) var e = p[c],
                                a = a + ((0 > a.indexOf("?") ? "?" : "\x26") + P + "\x3d" + encodeURIComponent(e.field + "|" + e.humanValue + "|" + e.value));
                            u && (a += (0 > a.indexOf("?") ? "?" : "\x26") + Q + "\x3d" + encodeURIComponent(u));
                            history.pushState({
                                    query: window.siq_search_query,
                                    page: b.page
                                }, "",
                                a)
                        }
                    },
                    ea = function(a) {
                        setTimeout(function() {
                            siq_S(".filterValue.siq-sort-results li.selected").removeClass("selected");
                            siq_S(".filterValue.siq-sort-results li a[alt\x3d" + a + "]").parent().addClass("selected");
                            siq_S(".siq_filter.siq_sort select").val(a)
                        })
                    },
                    N = function(a) {
                        var c = U = Math.random(),
                            e = siq_S("." + b.mainElementClass),
                            d = 0 === b.removeCurrentResult && 0 < e.find(".siq_filters").length;
                        V || e.hasClass(b.loadingClass) || e.addClass(b.loadingClass);
                        1 == b.removeCurrentResult ? (e.find("." + b.singleElementClass).remove(),
                            e.find("." + b.paginationClass).remove(), e.find(".siq-pagination-load-more").remove(), e.find("." + b.messageClass).remove(), e.find(".siq_filters").addClass("hide"), e.find(".siq-prdrslts-row").remove(), e.find("." + b.searchFiltersLeftTd).html(""), window.siq_reloadFeed ? e.find(".siq-ads").remove() : e.find(".siq-ads").hide()) : d || ("undefined" != typeof b.style && "string" == typeof b.style && "" != b.style ? pa() : Ha(), --b.page);
                        var f = b.apiBaseUrl + b.apiAjaxSearchEndpoint,
                            g = document.createElement("div");
                        g.innerHTML = h(b.query);
                        g = g.firstChild ? g.firstChild.nodeValue : "";
                        window.siq_search_query = g;
                        a && (E("Update URL in the browser address line"), Ba());
                        y("plain: " + b.query + "\n\runescape: " + decodeURIComponent(g) + "\n\rdecoded: " + g + "\n\rencoded:" + encodeURIComponent(g), "query string is");
                        var l = b.filter;
                        g.replace(/\s+/g, "") || "relevance" !== l || (l = "newest");
                        ea(l);
                        a = f;
                        f += "?q\x3d" + encodeURIComponent(ba() + g);
                        f += "\x26engineKey\x3d" + b.engineKey;
                        f += "\x26page\x3d" + b.page;
                        f += "\x26itemsPerPage\x3d" + b.itemsperpage;
                        f += "\x26group\x3d" + (SiqConfig.crossSiteSearchOnPage ?
                            1 : 0);
                        f = f + ("\x26sortby\x3d" + l) + "\x26autocomplete\x3d0";
                        u && "_siq_all_posts" !== u ? f += "\x26documentTypes\x3d" + encodeURIComponent(u) : null !== w && (f += "\x26documentTypes\x3d" + encodeURIComponent(w));
                        null !== A && (f += "\x26filter\x3d" + encodeURIComponent(A));
                        a += "?q\x3d" + encodeURIComponent(g);
                        a += "\x26engineKey\x3d" + b.engineKey;
                        a = a + "\x26page\x3d0\x26itemsPerPage\x3d1" + ("\x26group\x3d" + (SiqConfig.crossSiteSearchOnPage ? 1 : 0));
                        a = a + ("\x26sortby\x3d" + l) + "\x26autocomplete\x3d0";
                        u && "_siq_all_posts" !== u || null !== w && (a += "\x26documentTypes\x3d" +
                            encodeURIComponent(w));
                        null !== A && (a += "\x26filter\x3d" + encodeURIComponent(A));
                        y(f, "url is");
                        try {
                            siq_S.support.cors = !0;
                            y(B(), "Browser is IE");
                            y(B.version(), "IE Version");
                            B() && 8 <= parseInt(B.version(), 10) && window.XDomainRequest && (f += "\x26callback\x3d?", a += "\x26callback\x3d?");
                            var q = null,
                                m = null,
                                k = function() {
                                    if (SiqConfig.multiSelectFacetEnabled)
                                        if (null !== q && null !== m) z = m.main.facetedSearchInfos || [];
                                        else return;
                                    else if (null === q) return;
                                    za(e, q, d);
                                    if ("undefined" != typeof q.interleave && "undefined" != q.interleave.records &&
                                        0 < q.interleave.records.length) {
                                        var a = q.interleave.records;
                                        loadedAds = a;
                                        for (var c = document.getElementsByClassName("siq-ads"), g = Math.min(c.length, a.length), f = 0; f < g; f++) {
                                            var k = c[f],
                                                h = a[f],
                                                p;
                                            p = "" + ("\x3ca target\x3d'_blank' href\x3d'" + h.url + "'\x3e");
                                            responseString = "";
                                            checkImage = "undefined" != typeof h.image && h.image instanceof Array && 1 < h.image.length && ("" != h.image[0] && "false" != h.image[0] || "" != h.image[1] && "false" != h.image[1]) ? "has-image" : "no-image";
                                            responseString += "\x3cdiv class\x3d'" + b.resultTextClass + " " +
                                                checkImage + "'\x3e";
                                            responseString += "\x3ctable class\x3d'" + b.dataTableClass + "'\x3e\x3ctr\x3e";
                                            var r = responseString += "\x3ctd class\x3d'" + b.imageTd + " " + checkImage + "'\x3e",
                                                u = h,
                                                w = checkImage,
                                                t = "";
                                            T(u);
                                            var v = Z(u);
                                            "has-image" == w && u.image instanceof Array && (u = 'alt\x3d"' + (u.title || "") + '"', t = t + '\x3cdiv class\x3d"search-results-L has-image"\x3e' + ('\x3cimg src\x3d"' + v[0] + '" data-siq_img_index\x3d"0" onerror\x3d"SIQ_showNextImgRP([\'' + v.join("','") + "'], this)\" onload\x3d\"SiqContainer.triggerEvent(siq_S(this).parents('._siq_main_searchbox').find('.siq-scrollbox')[0] || document, 'siq-scrollbox-resize')\" " +
                                                u + " /\x3e"), t += "\x3c/div\x3e");
                                            responseString = r + t;
                                            responseString += "\x3c/td\x3e";
                                            responseString += "\x3ctd class\x3d'" + b.contentTd + "'\x3e";
                                            responseString += "\x3cdiv class\x3d'" + b.resultTextHeadingClass + "'\x3e\x3ca target\x3d'_blank' href\x3d'" + h.url + "' class\x3d'siq-partner-result'\x3e" + h.title + "\x3c/a\x3e\x3c/div\x3e";
                                            r = ra(h);
                                            t = sa(h);
                                            v = ta(h);
                                            if (r || t || v || h.domain) responseString += "\x3cdiv class\x3d'srch-res-info'\x3e", h.domain && (responseString += "\x3cspan class\x3d'siq-domain-name'\x3e" + h.domain + "\x3c/span\x3e\x26nbsp;\x26nbsp;"),
                                                responseString += r + "\x26nbsp;\x26nbsp;", responseString += t + "\x26nbsp;\x26nbsp;", responseString += v, responseString += "\x3c/div\x3e";
                                            "undefined" != typeof b.desc_length && 0 < parseInt(b.desc_length) && (r = 0, t = parseInt(b.desc_length), "undefined" != typeof h.body && (-1 < h.body.indexOf("\x3cem\x3e") && 250 != t && (r = h.body.indexOf("\x3cem\x3e"), 5 <= r && (r -= 3), t = r + t), h.body = h.body.substring(r, t)));
                                            "undefined" != typeof h.body && (responseString += "\x3cdiv class\x3d'" + b.resultDescClass + "'\x3e\x3cdiv\x3e" + h.body + "\x3c/div\x3e\x3c/div\x3e");
                                            responseString += "\x3c/div\x3e";
                                            responseString += "\x3cdiv class\x3d'srch-sponsoredtitle'\x3e";
                                            responseString += "    \x3ch5\x3eAds by Ad.net\x3c/h5\x3e";
                                            responseString += "    \x3cdiv class\x3d'clear'\x3e\x3c/div\x3e";
                                            responseString += " \x3c/div\x3e";
                                            responseString += "\x3cdiv class\x3d'srch-det-arrow'\x3e\x3cdiv class\x3d'img-responsive'\x3e\x3c/div\x3e\x3c/div\x3e";
                                            responseString += "\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e";
                                            p += responseString;
                                            k.innerHTML = p + "\x3c/a\x3e";
                                            c[f].style.display = "block";
                                            c[f].classList.add("search-sponsored-row");
                                            c[f].classList.add("clearfix")
                                        }
                                    }
                                    ea(l)
                                },
                                g = function(a, b, e) {
                                    siq_S.getJSON(a, function(a) {
                                        c == U && (a = eval(a), b(a))
                                    }).fail(e)
                                };
                            g(f, function(a) {
                                q = a;
                                k()
                            }, function(a, b, c) {
                                y(a, "Fail jqXHR ERROR");
                                da(e)
                            });
                            SiqConfig.multiSelectFacetEnabled && g(a, function(a) {
                                m = a;
                                k()
                            }, function(a, b, c) {
                                y(a, "Fail jqXHR ERROR");
                                da(e)
                            })
                        } catch (n) {
                            Aa(e)
                        }
                    },
                    fa = function(a) {
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
                    ha = function(a) {
                        var b = [],
                            e;
                        for (e in a) a.hasOwnProperty(e) && b.push(e);
                        return b
                    },
                    Ca = function(a, b) {
                        if (!SiqConfig.multiSelectFacetEnabled) return !1;
                        b = ha(b);
                        if (1 != b.length) return !1;
                        b = b[0];
                        if (0 > a.order && u === b) return !0;
                        for (var c = 0; c < p.length; ++c)
                            if (p[c].field == a.field && p[c].humanValue === b) return !0;
                        return !1
                    },
                    Ia = function(a) {
                        var b = "";
                        if ("undefined" !== typeof a && a instanceof Array && 0 < a.length) {
                            var e, d, b = b + '\x3cdiv class\x3d"siq-fctclose"\x3e\x3ch4\x3eFilter Options\x3c/h4\x3e\x3ca href\x3d"javascript:;"\x3e\x3ci class\x3d"siq-fa siq-fa-close"\x3e\x3c/i\x3e\x3cspan class\x3d"siq-visually-hidden"\x3eFilter out results\x3c/span\x3e\x3c/a\x3e\x3cdiv class\x3d"siq-clear"\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d\'siq-rp-blogrfct-facet\'\x3e';
                            for (e = 0; e < a.length; e++) {
                                var f = a[e];
                                if (!(0 > f.order && !u && 2 > f.results.length || 0 == f.results.length || "NUMBER" == f.type && f.results[0].min > f.results[0].max)) {
                                    b += '\x3cdiv class\x3d"siq-rp-facet-row siq-rp-facet-' + f.label.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-") + '"\x3e';
                                    b += '\x3cbutton class\x3d"siq-rp-accordion siq-rp-active"\x3e' + f.label + "\x3c/button\x3e";
                                    b += '\x3cdiv class\x3d"siq-rp-panel siq-rp-show"\x3e';
                                    if (0 > f.order) u && (b += "\x3ca href\x3d'javascript:;' class\x3d'siq-rp-applied-type-filter' data-filter-field\x3d'post_type' data-filter-val\x3d'" +
                                        u + "'\x3e" + u + "\x3c/a\x3e");
                                    else if ("STRING" === f.type)
                                        for (d = 0; d < p.length; ++d) p[d].field == f.field && (b += "\x3ca href\x3d'javascript:;' class\x3d'siq-rp-applied-filter' data-filter-field\x3d'" + p[d].field + "' data-filter-val\x3d'" + F(p[d].value) + "'\x3e" + F(p[d].humanValue) + "\x3c/a\x3e");
                                    else if ("RATING" === f.type)
                                        for (d = 0; d < p.length; ++d) p[d].field == f.field && (b += "\x3ca href\x3d'javascript:;' class\x3d'siq-rp-applied-filter' data-filter-field\x3d'" + p[d].field + "' data-filter-val\x3d'" + p[d].value + "'\x3e" + p[d].humanValue +
                                            "\x3c/a\x3e");
                                    else if ("DATE" === f.type)
                                        for (d = 0; d < p.length; ++d) p[d].field == f.field && (b += "\x3ca href\x3d'javascript:;' class\x3d'siq-rp-applied-filter' data-filter-field\x3d'" + p[d].field + "' data-filter-val\x3d'" + p[d].value + "'\x3e" + fa(p[d].humanValue) + "\x3c/a\x3e");
                                    else if ("NUMBER" === f.type)
                                        for (d = 0; d < p.length; ++d) p[d].field == f.field && (b += "\x3ca href\x3d'javascript:;' class\x3d'siq-rp-applied-filter' data-filter-field\x3d'" + p[d].field + "' data-filter-val\x3d'" + p[d].value + "'\x3e" + p[d].humanValue + "\x3c/a\x3e");
                                    switch (f.type) {
                                        case "STRING":
                                            0 <= f.order && (b += '\x3cinput class\x3d"siq-rp-facet-filter siq-hidden" data-siq-filter-field\x3d"' + f.field + '" data-type\x3d"' + f.type + '" data-order\x3d"' + f.order + '" type\x3d"text" placeholder\x3d"Search for ' + F(f.label) + '" aria-label\x3d"Field for entering a ' + F(f.label) + ' name to filter results"/\x3e');
                                        case "DATE":
                                            var b = 0 <= f.order ? b + ('\x3cul class\x3d"siq-rp-term-list siq-clearfix" data-siq-filter-field\x3d"' + f.field + '" data-siq-filter-order\x3d"' + f.order + '" data-siq-filter-type\x3d"' +
                                                    f.type + '" data-siq-filter-query-field\x3d"' + f.queryField + '" data-siq-filter-documenttype\x3d"' + (f.postType || "_siq_all_posts") + '"\x3e') : b + '\x3cul class\x3d"siq-rp-postType-list siq-clearfix"\x3e',
                                                g = null;
                                            for (d = 0; d < p.length; ++d) p[d].field == f.field && (g = p[d].humanValue);
                                            var l = 0;
                                            for (d = 0; d < f.results.length; d++) {
                                                var q = f.results[d],
                                                    m = ha(q);
                                                if (1 == m.length) {
                                                    m = m[0];
                                                    if ("DATE" === f.type && m === g) break;
                                                    if (!Ca(f, q)) {
                                                        l++;
                                                        if (0 <= f.order) {
                                                            var k = "DATE" === f.type ? f.queryField + ":[" + (null == q[m].fromDateStr ? "*" : q[m].fromDateStr) +
                                                                " TO " + (null == q[m].toDateStr ? "*" : q[m].toDateStr) + "]" : f.queryField + ":\x26quot;" + m.replace('"', "\\\x26quot;") + "\x26quot;";
                                                            f.postType && "_siq_all_posts" != f.postType && (k += " AND documentType:\x26quot;" + f.postType + "\x26quot;");
                                                            b += '\x3cli class\x3d"siq-rp-term-item ' + (3 < l ? "siq-rp-toggleable" : "") + '" data-siq-filter-val\x3d"' + k + '" data-siq-filter-humanvalue\x3d"' + m.replace('"', "\x26quot;") + '"\x3e';
                                                            b += '\x3ca href\x3d"#" title\x3d"' + ("DATE" === f.type ? fa(m) : F(m)) + '"\x3e' + ("DATE" === f.type ? fa(m) : F(m)) + (SiqConfig.multiSelectFacetEnabled ?
                                                                "" : "\x3ch4\x3e(" + ("DATE" === f.type ? q[m].count : q[m]) + ")\x3c/h4\x3e") + "\x3c/a\x3e"
                                                        } else b += '\x3cli class\x3d"siq-rp-postType-item ' + (3 < l ? "siq-rp-toggleable" : "") + '" data-siq-filter-val\x3d"' + m + '"\x3e', b += '\x3ca href\x3d"#" title\x3d"' + ("_siq_all_posts" == m ? "All post types" : m) + '"\x3e' + ("_siq_all_posts" == m ? "All post types" : m) + (SiqConfig.multiSelectFacetEnabled ? "" : "\x3ch4\x3e(" + q[m] + ")\x3c/h4\x3e") + "\x3c/a\x3e";
                                                        b += "\x3c/li\x3e"
                                                    }
                                                }
                                            }
                                            3 < l && (b += '\x3cli class\x3d"siq-rp-more" tabindex\x3d"0"\x3e+ Show More\x3c/li\x3e');
                                            b += "\x3c/ul\x3e";
                                            break;
                                        case "NUMBER":
                                            b += '\x3cdiv class\x3d"siq-rp-filter-options-cont"\x3e';
                                            b += '\x3cdiv class\x3d"siq-rp-ui-slider siq-rp-ui-slider-horizontal siq-rp-ui-widget siq-rp-ui-widget-content siq-rp-ui-corner-all" data-siq-min\x3d"' + f.results[0].min + '" data-siq-max\x3d"' + f.results[0].max + '" data-siq-filter-field\x3d"' + f.field + '" data-siq-filter-order\x3d"' + f.order + '" data-siq-filter-type\x3d"' + f.type + '" data-siq-filter-query-field\x3d"' + f.queryField + '" data-siq-filter-documenttype\x3d"' +
                                                (f.postType || "_siq_all_posts") + '"\x3e';
                                            b += '\x3cdiv class\x3d"siq-rp-ui-slider-range siq-rp-ui-widget-header siq-rp-ui-corner-all" style\x3d"left: 0%; right: 0%;"\x3e\x3c/div\x3e';
                                            b += '\x3cspan class\x3d"siq-rp-ui-slider-handle siq-rp-ui-state-default siq-rp-ui-corner-all siq-rp-slider-min" style\x3d"left: 0%" tabindex\x3d"0"\x3e\x3c/span\x3e';
                                            b += '\x3cspan class\x3d"siq-rp-ui-slider-handle siq-rp-ui-state-default siq-rp-ui-corner-all siq-rp-slider-max" style\x3d"left: 100%" tabindex\x3d"0"\x3e\x3c/span\x3e';
                                            b += "\x3c/div\x3e";
                                            b += '\x3cp class\x3d"siq-rp-slider-text"\x3e\x3cinput readonly type\x3d"text" value\x3d"' + f.results[0].min + " - " + f.results[0].max + '"\x3e\x3c/p\x3e';
                                            b += "\x3c/div\x3e";
                                            break;
                                        case "RATING":
                                            b += '\x3cul class\x3d"siq-rp-term-list siq-clearfix" data-siq-filter-field\x3d"' + f.field + '" data-siq-filter-order\x3d"' + f.order + '" data-siq-filter-type\x3d"' + f.type + '" data-siq-filter-query-field\x3d"' + f.queryField + '" data-siq-filter-documenttype\x3d"' + (f.postType || "_siq_all_posts") + '"\x3e';
                                            for (d = 5; 1 <=
                                                d; --d) m = "r" + d, "undefined" != typeof f.results[0][m] && (k = f.queryField + ":\x3e\x3d" + d, f.postType && "_siq_all_posts" != f.postType && (k += " AND documentType:\x26quot;" + f.postType + "\x26quot;"), b += '\x3cli class\x3d"siq-rp-term-item" data-siq-filter-val\x3d"' + k + '" data-siq-filter-humanvalue\x3d"' + d + ' \x26amp; more stars"\x3e', b += '\x3ca href\x3d"#" title\x3d"' + d + ' \x26amp; more stars"\x3e' + ('\x3cdiv class\x3d"siq-starratings"\x3e \x3cdiv class\x3d"siq-starratings-top" style\x3d"width: ' + d / 5 * 100 + '% !important;"\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3c/div\x3e \x3cdiv class\x3d"siq-starratings-bottom"\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3cspan\x3e\x26#9733;\x3c/span\x3e\x3c/div\x3e \x3c/div\x3e') +
                                                (SiqConfig.multiSelectFacetEnabled ? "" : "\x3ch4\x3e(" + f.results[0][m] + ")\x3c/h4\x3e") + "\x3c/a\x3e", b += "\x3c/li\x3e");
                                            b += "\x3c/ul\x3e"
                                    }
                                    b += "\x3c/div\x3e\x3c/div\x3e"
                                }
                            }
                            b += "\x3c/div\x3e"
                        }
                        return b
                    },
                    La = function(a, b) {
                        var c;
                        c = "" + ('\x3cul class\x3d"siq-rp-term-list siq-clearfix" data-siq-filter-field\x3d"' + a.field + '" data-siq-filter-order\x3d"' + a.order + '" data-siq-filter-type\x3d"' + a.type + '" data-siq-filter-query-field\x3d"' + a.queryField + '" data-siq-filter-documenttype\x3d"' + (a.postType || "_siq_all_posts") + '"\x3e');
                        for (var d = 0; d < p.length; ++d);
                        for (j = d = 0; j < a.results.length; j++) {
                            var f = a.results[j],
                                g = ha(f);
                            if (1 == g.length && (g = g[0], !Ca(a, f))) {
                                d++;
                                var l = a.queryField + ":\x26quot;" + g + "\x26quot;";
                                a.postType && "_siq_all_posts" != a.postType && (l += " AND documentType:\x26quot;" + a.postType + "\x26quot;");
                                c += '\x3cli class\x3d"siq-rp-term-item ' + (3 < d && !b ? "siq-rp-toggleable" : "") + '" data-siq-filter-val\x3d"' + l + '" data-siq-filter-humanvalue\x3d"' + g + '"\x3e';
                                c += '\x3ca href\x3d"#" title\x3d"' + g + '"\x3e' + g + (SiqConfig.multiSelectFacetEnabled ?
                                    "" : "\x3ch4\x3e(" + f[g] + ")\x3c/h4\x3e") + "\x3c/a\x3e";
                                c += "\x3c/li\x3e"
                            }
                        }
                        3 < d && (c = b ? c + '\x3cli class\x3d"siq-rp-more" tabindex\x3d"0"\x3e- Show Less\x3c/li\x3e' : c + '\x3cli class\x3d"siq-rp-more" tabindex\x3d"0"\x3e+ Show More\x3c/li\x3e');
                        return c + "\x3c/ul\x3e"
                    },
                    G = function() {
                        var a = U = Math.random(),
                            c = siq_S("#siq_search_results"),
                            e = c.find(".siq-prodfacet-contR");
                        e.hasClass(b.loadingClass) || e.addClass(b.loadingClass);
                        1 === b.removeCurrentResult && (e.find("." + b.singleElementClass).remove(), e.find(".siq-prdrslts-row").remove(),
                            e.find(".siq-pagination-load-more").remove(), e.find("." + b.paginationClass).remove(), e.find("." + b.messageClass).remove(), e.find(".siq_filters").addClass("hide"), e.find("." + b.searchFiltersLeftTd).html(""), window.siq_reloadFeed ? e.find(".siq-ads").remove() : e.find(".siq-ads").hide());
                        var e = b.apiBaseUrl + b.apiAjaxSearchEndpoint,
                            d = document.createElement("div");
                        d.innerHTML = h(b.query);
                        d = d.firstChild ? d.firstChild.nodeValue : "";
                        window.siq_search_query = d;
                        1 === b.removeCurrentResult && Ba();
                        y("plain: " + b.query + "\n\runescape: " +
                            decodeURIComponent(d) + "\n\rdecoded: " + d + "\n\rencoded:" + encodeURIComponent(d), "query string is");
                        var f = b.filter;
                        d.replace(/\s+/g, "") || "relevance" !== f || (f = "newest");
                        ea(f);
                        e += "?q\x3d" + encodeURIComponent(ba() + d);
                        e += "\x26engineKey\x3d" + b.engineKey;
                        e += "\x26page\x3d" + b.page;
                        e += "\x26itemsPerPage\x3d" + b.itemsperpage;
                        e += "\x26group\x3d" + (SiqConfig.crossSiteSearchOnPage ? 1 : 0);
                        e = e + ("\x26sortby\x3d" + f) + "\x26autocomplete\x3d0";
                        u && "_siq_all_posts" !== u ? e += "\x26documentTypes\x3d" + encodeURIComponent(u) : null !== w && (e +=
                            "\x26documentTypes\x3d" + encodeURIComponent(w));
                        null !== A && (e += "\x26filter\x3d" + encodeURIComponent(A));
                        y(e, "url is");
                        try {
                            siq_S.support.cors = !0, y(B(), "Browser is IE"), y(B.version(), "IE Version"), B() && 8 <= parseInt(B.version(), 10) && window.XDomainRequest && (e += "\x26callback\x3d?"), siq_S.getJSON(e, function(g) {
                                a == U && (g = eval(g), za(c, g, 0 === b.removeCurrentResult))
                            }).fail(function(a, b, d) {
                                y(a, "Fail jqXHR ERROR");
                                da(c)
                            })
                        } catch (g) {
                            Aa(c)
                        }
                    };
                siq_S(document).on("click", "#siq-load-more-btn", function(a) {
                    a = siq_S("." + b.mainElementClass);
                    if (a.hasClass(b.loadingClass) || a.children(".siq-prodfacet-contR").hasClass(b.loadingClass)) return !1;
                    b.removeCurrentResult = 0;
                    b.page++;
                    0 < siq_S(".siq-rp-blogrfct-facet").length ? G() : N(!1);
                    return !1
                });
                var Da = !1,
                    xa = function() {
                        if (!Da) {
                            Da = !0;
                            if (SiqConfig.enableResultsPageFacet) {
                                var a = function(a, b) {
                                    siq_S(a).children("ul").replaceWith(La(b, !0))
                                };
                                siq_S(document).on("keyup", "input.siq-rp-facet-filter", function() {
                                    var c = siq_S(this).val(),
                                        d = this,
                                        e = siq_S(this).attr("data-siq-filter-field"),
                                        f = b.query;
                                    setTimeout(function() {
                                        if (c ==
                                            siq_S(d).val()) {
                                            var g = b.apiBaseUrl + "search/facets",
                                                g = g + ("?q\x3d" + encodeURIComponent((SiqConfig.multiSelectFacetEnabled ? "" : ba()) + f)),
                                                g = g + ("\x26facetQuery\x3d" + encodeURIComponent(e + ":" + c)),
                                                g = g + ("\x26engineKey\x3d" + encodeURIComponent(b.engineKey));
                                            u && "_siq_all_posts" !== u ? SiqConfig.multiSelectFacetEnabled || (g += "\x26documentTypes\x3d" + encodeURIComponent(u)) : null !== w && (g += "\x26documentTypes\x3d" + encodeURIComponent(w));
                                            null !== A && (g += "\x26filter\x3d" + encodeURIComponent(A));
                                            na() && 8 <= parseInt(X(), 10) && window.XDomainRequest ?
                                                (siq_S("body").addClass("ie_" + parseInt(X())), siq_ajax({
                                                    dataType: "jsonp",
                                                    url: g + "",
                                                    data: "",
                                                    success: function(b) {
                                                        b = eval(b);
                                                        c == siq_S(d).val() && a(siq_S(d).parent(), b)
                                                    },
                                                    error: function(b, g, e) {
                                                        c == siq_S(d).val() && a(siq_S(d).parent(), null)
                                                    }
                                                })) : siq_S.getJSON(g, function(b) {
                                                    b = eval(b);
                                                    c == siq_S(d).val() && a(siq_S(d).parent(), b)
                                                }).fail(function(b) {
                                                    c == siq_S(d).val() && a(siq_S(d).parent(), null)
                                                })
                                        }
                                    }, 200)
                                })
                            }
                            var c = function() {
                                if ("GRID" === SiqConfig.resultPageLayout) {
                                    var b = Math.max(Math.floor(wa() / 221), 2),
                                        a = siq_S(".siq-prodfacet-contR .siq-prdrslts-cont table.siq-prdgrid-cont tbody"),
                                        c = 0,
                                        d = 100 / b + "%";
                                    siq_S("#siq_search_results .siq-prodfacet-contR .siq-prdrslts-row table td").each(function() {
                                        var g = siq_S(this);
                                        "" === g.text().trim() ? g.remove() : (0 == c++ % b && a.append("\x3ctr\x3e\x3c/tr\x3e"), a.find("tr:last").append(g), g.css("width", d))
                                    });
                                    siq_S("#siq_search_results .siq-prodfacet-contR .siq-prdrslts-row table tr").each(function() {
                                        0 == siq_S(this).find("td").length && siq_S(this).remove()
                                    });
                                    for (var e = Math.max(0, b - siq_S("#siq_search_results .siq-prodfacet-contR .siq-prdrslts-row table td").length),
                                            f = 0; f < e; ++f) a.find("tr:last").append('\x3ctd style\x3d"width: ' + d + '"\x3e\x3c/td\x3e')
                                }
                            };
                            siq_S(document).on("click", ".siq-grdfilter a.siq-show-hide-facet,.siq-fctclose,.siq-grdfilter-mobile a.siq-show-hide-facet-btn", function() {
                                ca() ? (siq_S("#siq_search_results").removeClass("siq-filter-visible").addClass("siq-filter-invisible"), siq_S("#siq_search_results .siq-prodfacet-contL").hide(300), siq_S("#siq_search_results .siq-prodfacet-contR").animate({
                                    width: "100%"
                                }, 320, c)) : (siq_S("#siq_search_results").removeClass("siq-filter-invisible").addClass("siq-filter-visible"),
                                    siq_S("#siq_search_results .siq-prodfacet-contL").show(300), siq_S("#siq_search_results .siq-prodfacet-contR").animate({
                                        width: "73%"
                                    }, 250, c))
                            });
                            siq_S(document).on("click", ".siq-rp-postType-item", function(a) {
                                u = siq_S(this).data("siq-filter-val");
                                b.removeCurrentResult = 1;
                                b.page = 0;
                                var c;
                                for (a = 0; a < r.length; a++)
                                    if (-1 === r[a].order) {
                                        c = r[a];
                                        break
                                    }
                                if (!c)
                                    for (a = 0; a < z.length; a++)
                                        if (-1 === z[a].order) {
                                            c = z[a];
                                            r.push(c);
                                            break
                                        }
                                G()
                            });
                            siq_S(document).on("click", ".siq-sort-results a", function() {
                                siq_S(this).parent("li").hasClass("selected") ||
                                    (b.filter = siq_S(this).attr("alt"), b.removeCurrentResult = 1, b.page = 0, 0 < siq_S(".siq-rp-blogrfct-facet").length ? G() : N(!0), siq_S(".siq-sort-results a").parents("li").removeClass("selected"), siq_S(this).parent("li").addClass("selected"));
                                return !1
                            });
                            siq_S(document).on("change", "#siq_search_results .siq_filter.siq_sort select", function() {
                                b.filter = siq_S(this).val();
                                b.removeCurrentResult = 1;
                                b.page = 0;
                                0 < siq_S(".siq-rp-blogrfct-facet").length ? G() : N(!0)
                            });
                            siq_S(document).on("click", "." + b.paginationSingleLinkClass,
                                function(a) {
                                    if (!(siq_S(a.target).is("#siq-load-more-btn") || 0 < siq_S("#siq-load-more-btn").has(a.target).length)) {
                                        a = parseInt(siq_S(this).attr("data-page_num")) - 1;
                                        if (0 > a) return;
                                        b.removeCurrentResult = 1;
                                        b.page = a;
                                        0 < siq_S(".siq-rp-blogrfct-facet").length ? G() : N(!0)
                                    }
                                    return !1
                                });
                            var e = !1,
                                d = function() {
                                    var a = "FORM" === this.tagName ? siq_S(this) : siq_S(this).parents("form:eq(0)");
                                    if (0 < a.parents(".siq_search_results").length) {
                                        var c = a.find("input.siq_searchBox").val(),
                                            c = b.apiBaseUrl + "search/results?q\x3d" + encodeURIComponent(c.replace(/[<>()\/]+/g,
                                                " ")) + "\x26engineKey\x3d" + J + "\x26group\x3d" + (SiqConfig.crossSiteSearchOnPage ? 1 : 0) + "\x26itemsPerPage\x3d" + SiqConfig.customSearchNumRecords + "\x26enter\x3d1";
                                        na() && 8 <= parseInt(X(), 10) && window.XDomainRequest ? siq_ajax({
                                            method: "GET",
                                            url: c,
                                            data: {},
                                            dataType: "jsonp"
                                        }) : siq_S.ajax({
                                            method: "GET",
                                            url: c,
                                            data: {},
                                            dataType: "json"
                                        })
                                    }
                                    b.removeCurrentResult = 1;
                                    window.siq_reloadFeed = !0;
                                    b.keepPage || (b.page = 0);
                                    b.keepPage = !1;
                                    b.query = a.find("input.siq_searchBox").val().replace(/[<>()\/]+/g, " ");
                                    V || (a.find("input.siq_searchBox").val(""),
                                        a.find("input.siq_searchBox").blur());
                                    N(!e);
                                    siq_S("body").click();
                                    return e = !1
                                };
                            siq_S(window).on("popstate", function(a) {
                                var c = location.search.toString().replace(/^\?/, "").split("\x26");
                                p = [];
                                A = w = u = null;
                                siq_S(c).each(function() {
                                    var a = this.split("\x3d", 2);
                                    2 > a.length || (a[0] == P ? (a = decodeURIComponent(a[1]).split("|", 3), 3 > a.length || p.push({
                                        field: a[0],
                                        humanValue: a[1],
                                        value: a[2]
                                    })) : a[0] == Q ? u = decodeURIComponent(a[1]) : "postTypes" == a[0] ? w = decodeURIComponent(a[1]) : "siqACFilters" == a[0] && (A = decodeURIComponent(a[1])))
                                });
                                e = !0;
                                b.page = a.originalEvent && a.originalEvent.state && a.originalEvent.state.page ? a.originalEvent.state.page : 0;
                                b.keepPage = !0;
                                a.originalEvent && a.originalEvent.state && a.originalEvent.state.query ? siq_S(".siq_search_results form input[type\x3dtext]#siq_ajax_search").val(a.originalEvent.state.query) : siq_S(".siq_search_results form input[type\x3dtext]#siq_ajax_search").val(W());
                                siq_S(".siq_search_results form").submit()
                            });
                            siq_S("#siq_search_results div.siq_search_ajax.siq_search_box form").off("submit").on("submit",
                                d);
                            siq_S(".siq_search_results form input[type\x3dtext]#siq_ajax_search").on("keypress", function(a) {
                                13 === a.keyCode && (a = new Date, a.setTime(a.getTime() + 6E4), a = "expires\x3d" + a.toUTCString(), document.cookie = "search_enter\x3d1;" + a + ";path\x3d/")
                            });
                            if (V) siq_S(".siq_search_results form input[type\x3dtext]#siq_ajax_search").on("keyup", function(a) {
                                var b = this;
                                setTimeout(function() {
                                    d.apply(b)
                                })
                            });
                            siq_S("#siq_search_results div.siq_search_ajax.siq_search_box form .inp-srch-btn").off("click").on("click", d);
                            siq_S(document).on("click",
                                ".siq-rp-accordion",
                                function(a) {
                                    siq_S(this).toggleClass("siq-rp-active");
                                    siq_S(this).parent().children("div.siq-rp-panel").toggleClass("siq-rp-show")
                                });
                            siq_S(document).on("click", ".siq-rp-more", function(a) {
                                a = "+ Show More" === siq_S(this).text().trim();
                                siq_S(this).text(a ? "- Show Less" : "+ Show More");
                                siq_S(this).parent().children(".siq-rp-term-item, .siq-rp-postType-item").each(function(a, b) {
                                    2 < a && siq_S(b).toggleClass("siq-rp-toggleable")
                                });
                                a ? siq_S(this).parents(".siq-rp-panel:first").find(".siq-rp-facet-filter").removeClass("siq-hidden") :
                                    siq_S(this).parents(".siq-rp-panel:first").find(".siq-rp-facet-filter").addClass("siq-hidden")
                            });
                            var f = function(a, b) {
                                var c = a.offset(),
                                    d = a.width(),
                                    c = b - c.left,
                                    e = a.children(".siq-rp-slider-min"),
                                    f = a.children(".siq-rp-slider-max");
                                if (e.hasClass("siq-rp-slider-handler-active")) b = e;
                                else if (f.hasClass("siq-rp-slider-handler-active")) b = f;
                                else {
                                    var g = Math.abs(e.offset().left - b);
                                    b = Math.abs(f.offset().left - b);
                                    b = g < b ? e : f
                                }
                                b.addClass("siq-rp-slider-handler-active");
                                c = c / d * 100;
                                e = a.data("siq-min");
                                f = a.data("siq-max");
                                d = a.next().children("input").val().split(" - ");
                                b.hasClass("siq-rp-slider-min") ? (d[0] = Math.max(e, Math.min(Math.floor((f - e) * c / 100 + e), d[1])), c = Math.max(0, 100 * (d[0] - e) / (f - e)), b.css("left", c + "%"), a.children(".siq-rp-ui-slider-range").css("left", c + "%")) : (d[1] = Math.min(f, Math.max(Math.ceil((f - e) * c / 100 + e), d[0])), c = Math.min(100, 100 * (d[1] - e) / (f - e)), b.css("left", c + "%"), a.children(".siq-rp-ui-slider-range").css("right", 100 - c + "%"));
                                a.next().children("input").val(d[0] + " - " + d[1])
                            };
                            siq_S(document).on("mousedown",
                                ".siq-rp-ui-slider",
                                function(a) {
                                    siq_S(this).addClass("siq-rp-ui-slider-moving");
                                    f(siq_S(this), a.pageX)
                                });
                            siq_S(document).on("mousemove", function(a) {
                                0 < siq_S(".siq-rp-ui-slider.siq-rp-ui-slider-moving").length && (f(siq_S(".siq-rp-ui-slider.siq-rp-ui-slider-moving"), a.pageX), a.preventDefault())
                            });
                            siq_S(document).on("mouseup", function(a) {
                                if (0 < siq_S(".siq-rp-ui-slider.siq-rp-ui-slider-moving").length) {
                                    var c = siq_S(".siq-rp-ui-slider.siq-rp-ui-slider-moving").data("siq-filter-field"),
                                        d = c + ":[" + siq_S(".siq-rp-ui-slider.siq-rp-ui-slider-moving").next().find("input").val().replace("-",
                                            "TO") + "]",
                                        e = siq_S(".siq-rp-ui-slider.siq-rp-ui-slider-moving").data("siq-filter-documenttype");
                                    e && "_siq_all_posts" != e && (d += ' AND documentType:"' + e + '"');
                                    for (e = 0; e < p.length; ++e) p[e].field == c && (p = p.slice(0, e).concat(p.slice(e + 1)));
                                    p.push({
                                        value: d,
                                        field: c,
                                        humanValue: siq_S(".siq-rp-ui-slider.siq-rp-ui-slider-moving").next().find("input").val()
                                    });
                                    b.removeCurrentResult = 1;
                                    b.page = 0;
                                    for (var f, e = 0; e < r.length; e++)
                                        if (r[e].field === c) {
                                            f = r[e];
                                            break
                                        }
                                    if (!f)
                                        for (e = 0; e < z.length; e++)
                                            if (z[e].field === c) {
                                                f = z[e];
                                                r.push(f);
                                                break
                                            }
                                    G();
                                    siq_S(".siq-rp-ui-slider.siq-rp-ui-slider-moving").removeClass("siq-rp-ui-slider-moving");
                                    siq_S(".siq-rp-slider-handler-active").removeClass("siq-rp-slider-handler-active");
                                    a.preventDefault()
                                }
                            });
                            siq_S(document).on("click", ".siq-rp-applied-filter", function() {
                                for (var a = siq_S(this).attr("data-filter-val"), c = siq_S(this).attr("data-filter-field"), e = 0, d = 0; d < p.length; ++d) p[d].field === c && (p[d].value === a ? p = p.slice(0, d).concat(p.slice(d + 1)) : e++);
                                b.removeCurrentResult = 1;
                                b.page = 0;
                                if (0 === e)
                                    for (d = 0; d <
                                        r.length; d++)
                                        if (r[d].field === c) {
                                            r.splice(d, 1);
                                            break
                                        }
                                G()
                            });
                            siq_S(document).on("click", ".siq-rp-applied-type-filter", function() {
                                u = null;
                                b.removeCurrentResult = 1;
                                for (var a = b.page = 0; a < r.length; a++)
                                    if (-1 === r[a].order) {
                                        r.splice(a, 1);
                                        break
                                    }
                                G()
                            });
                            siq_S(document).on("click", ".siq-rp-term-item", function(a) {
                                a = siq_S(this).data("siq-filter-val");
                                var c = siq_S(this).parent().data("siq-filter-field"),
                                    d = siq_S(this).parent().data("siq-filter-type"),
                                    e = siq_S(this).data("siq-filter-humanvalue");
                                if (null == p) p = [];
                                else
                                    for (var f =
                                            0; f < p.length; ++f)
                                        if (p[f].field == c) {
                                            if ("STRING" == d && p[f].value == a) return;
                                            "STRING" != d && (p = p.slice(0, f).concat(p.slice(f + 1)))
                                        }
                                p.push({
                                    value: a,
                                    field: c,
                                    humanValue: e
                                });
                                b.removeCurrentResult = 1;
                                b.page = 0;
                                for (var g, f = 0; f < r.length; f++)
                                    if (r[f].field === c) {
                                        g = r[f];
                                        break
                                    }
                                if (!g)
                                    for (f = 0; f < z.length; f++)
                                        if (z[f].field === c) {
                                            g = z[f];
                                            r.push(g);
                                            break
                                        }
                                G()
                            });
                            siq_S(document).on("click", "#siq_search_results .siq-view-layout", function(a) {
                                if (!siq_S(this).hasClass("siq-view-active")) {
                                    var b = siq_S(this).data("siqlayout");
                                    a: {
                                        a = location.href;
                                        var c = encodeURIComponent("_siq_view"),
                                            d = encodeURIComponent(b),
                                            e;
                                        if (0 <= a.indexOf("?")) {
                                            if (0 <= a.indexOf("?" + c + "\x3d")) e = a.indexOf("?" + c + "\x3d");
                                            else if (0 <= a.indexOf("\x26" + c + "\x3d")) e = a.indexOf("\x26" + c + "\x3d");
                                            else {
                                                a = a + "\x26" + c + "\x3d" + d;
                                                break a
                                            }
                                            b = a.indexOf("\x26", e + 1);
                                            c = a.substr(0, e + 1) + c + "\x3d" + d;
                                            0 <= b && (c += a.substr(b));
                                            a = c
                                        } else a = a + "?" + c + "\x3d" + d
                                    }
                                    location.href = a.replace(/_siq_page=\d+&?/, "")
                                }
                            })
                        }
                    };
                (function(a) {
                    y(a[0], "default variables");
                    oa("siq-search-style", O, "siq_custom_css");
                    oa("siq_custom_css",
                        ia);
                    try {
                        if (a[0] && "object" === typeof a[0] && "undefined" == typeof b) try {
                            var c = ma,
                                e = a[0],
                                d;
                            for (d in e) e.hasOwnProperty(d) && ("true" == e[d] ? e[d] = !0 : "false" == e[d] && (e[d] = !1), c[d] = e[d]);
                            b = c;
                            b.query = W();
                            if ("undefined" == b.page || 1 == b.page) {
                                var f = /[\?&]_siq_page=([^&#]*)/.exec(location.href);
                                b.page = f && f[1] ? decodeURIComponent(f[1]) : 1
                            }
                            if ("undefined" == b.filter) f = /[\?&]_siq_sort=([^&#]*)/.exec(location.href), b.filter = f && f[1] ? decodeURIComponent(f[1]) : "relevance";
                            else if ("relevance" == b.filter.toLowerCase() || "newest" ==
                                b.filter.toLowerCase() || "oldest" == b.filter.toLowerCase()) f = /[\?&]_siq_sort=([^&#]*)/.exec(location.href), b.filter = f && f[1] ? decodeURIComponent(f[1]) : b.filter.toLowerCase();
                            if ("undefined" == b.searchBoxQuery || "" == b.searchBoxQuery) b.searchBoxQuery = b.query;
                            if ("undefined" == b.searchUrl || "" == b.searchUrl) b.searchUrl = "";
                            "undefined" != typeof siq_site_url && "" != siq_site_url && (b.siteUrl = siq_site_url);
                            "undefined" != typeof siq_style && "" != siq_style && (b.style = siq_style);
                            "undefined" != typeof siq_api_endpoint && "" != siq_api_endpoint &&
                                (b.apiBaseUrl = I.replace(/^(https?:)?\/\/(pub|static)\.searchiq\.(xyz|co)/, "//api.searchiq.co") + "api/");
                            "undefined" != typeof siq_api_autoComp && "" != siq_api_autoComp && (b.apiAjaxSearchEndpoint = siq_api_autoComp);
                            "undefined" != typeof J && "" != J && (b.engineKey = J);
                            "undefined" != typeof SiqConfig.postTypesForSearch && "" != SiqConfig.postTypesForSearch && (b.postTypes = null !== w ? w : SiqConfig.postTypesForSearch);
                            if ("undefined" == typeof b.desc_length || "" == b.desc_length) b.desc_length = 250 * (SiqConfig.descriptionSegments ? SiqConfig.descriptionSegments :
                                1);
                            "undefined" == typeof window.siq_search_query && (window.siq_search_query = b.query);
                            "undefined" != typeof SiqConfig.customSearchNumRecords && "" != SiqConfig.customSearchNumRecords && (b.itemsperpage = SiqConfig.customSearchNumRecords);
                            N();
                            Ga()
                        } catch (g) {
                            y(g, "assigning variables to options")
                        }
                    } catch (g) {
                        y(g, "error assigning variables to options")
                    }
                })(arguments)
            }
        },
        O = window.dwAjaxConfig || {};
    O.query = W();
    O.engineKey = J;
    O.engineKey ? (SiqContainer.waitAndRun(function() {
            return !!window.siq_S && 0 < window.siq_S("#siq_search_results").length
        },
        function() {
            ia(O)
        }, 200, 2E4), setTimeout(function() {
        SiqContainer.triggerEvent(document, "siq-search-js-loaded")
    })) : E("csl: No engine key passed in!")
})();