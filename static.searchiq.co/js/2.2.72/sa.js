(function() {
    var k = 'input[name\x3d"' + SiqConfig.searchBoxName + '"],input[name\x3d"' + SiqConfig.queryParameter + '"]',
        l = function(a) {
            return a.replace(/^https?:\/\/(www\.)?([^\/$]+)(\/[^$]*)$/i, "$2").toLowerCase()
        },
        t = function(a, b, c) {
            b = "\x3d" == b ? "\x3d\x3d" : b;
            a = a.split(".");
            c = c.split(".");
            for (var e = Math.max(a.length, c.length), f, d, g = 0, h = 0; h < e && !g; h++) f = parseInt(a[h], 10) || 0, d = parseInt(c[h], 10) || 0, f < d && (g = 1), f > d && (g = -1);
            return eval("0" + b + g)
        },
        m = function(a, b) {
            return (a = (new RegExp("[\\?\x26]" + b + "\x3d([^\x26#]*)")).exec(a)) ?
                a[1] || "" : ""
        },
        u = function() {
            var a = location.href;
            return m(a, SiqConfig.searchBoxName) || m(a, SiqConfig.queryParameter)
        },
        v = function() {
            var a = !1,
                b = navigator.userAgent || navigator.vendor || window.opera;
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(b) ||
                /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0,
                    4))) a = !0;
            return a
        },
        n = function() {
            return navigator.userAgent.match(/MSIE ([0-9]+)\./) ? !0 : !1
        },
        p = function() {
            return navigator.userAgent.match(/MSIE ([0-9]+)\./) ? RegExp.$1 : !1
        },
        q = function() {
            if (!t(SiqConfig.jsVersion, "\x3c", "1.5.1")) siq_S(document).on("click", "a", function(a) {
                if ((new RegExp("(\\?|\x26)" + SiqConfig.searchBoxName + "\x3d")).test(location.href) && 0 === siq_S("#siq_search_results").length && !(0 < siq_S(this).parents("._siq_main_searchbox").length)) {
                    var b = siq_S(this);
                    if ("undefined" == typeof window.siq_search_query &&
                        (window.siq_search_query = u(), !window.siq_search_query)) return;
                    if (l(b[0].href) === l(window.location.href)) {
                        var c = siq_api_endpoint + "search/log?q\x3d" + encodeURIComponent(siq_search_query) + "\x26documentURL\x3d" + encodeURIComponent(b[0].href) + "\x26engineKey\x3d" + siq_engine_key + "\x26autocomplete\x3d0\x26documentTypes\x3d" + encodeURIComponent(SiqConfig.postTypesForSearch),
                            e = "json";
                        n() && 8 <= parseInt(p(), 10) && window.XDomainRequest && (e = "jsonp");
                        siq_S.ajax({
                            method: "GET",
                            url: c,
                            data: {},
                            dataType: e,
                            async: !1
                        }).done(function(a) {
                            "_blank" ==
                            b[0].target ? window.open(b[0].href) : window.location.href = b[0].href
                        }).fail(function() {
                            "_blank" == b[0].target ? window.open(b[0].href) : window.location.href = b[0].href
                        });
                        a.preventDefault();
                        return !1
                    }
                }
            })
        },
        r = function() {
            var a = !1;
            siq_S(document).on("submit", function(b) {
                var c = b.target;
                if ("FORM" == c.tagName && 0 != siq_S(c).find(k).length) {
                    if (a) return SiqConfig.resultPageUrl ? !1 : !0;
                    a = !0;
                    if (!v() || !SiqConfig.mobileEnabled) {
                        var e = "f" == SiqConfig.queryParameter ? "sf" : "f",
                            f = "dtf" == SiqConfig.queryParameter ? "sdtf" : "dtf";
                        if (0 ==
                            siq_S(c).parents(".siq_search_results").length) {
                            var d = siq_S(c).find(k).val();
                            b = siq_api_endpoint + "search/results?q\x3d" + encodeURIComponent(d) + "\x26engineKey\x3d" + siq_engine_key + "\x26group\x3d" + (SiqConfig.crossSiteSearchOnPage ? 1 : 0) + "\x26itemsPerPage\x3d" + SiqConfig.customSearchNumRecords + "\x26enter\x3d1";
                            d = function(b) {
                                return SiqConfig.resultPageUrl ? function() {
                                    var a = "";
                                    0 < siq_S(c).find("input[type\x3dhidden][name\x3d" + f + "]").length && (a += "\x26" + f + "\x3d" + encodeURIComponent(siq_S(c).find("input[type\x3dhidden][name\x3d" +
                                        f + "]:last").val()));
                                    siq_S(c).find("input[type\x3dhidden][name\x3d" + e + "]").each(function() {
                                        a += "\x26" + e + "\x3d" + encodeURIComponent(siq_S(this).val())
                                    });
                                    siq_S(c).find("input[type\x3dhidden][name\x3dpostTypes]").each(function() {
                                        a += "\x26postTypes\x3d" + encodeURIComponent(siq_S(this).val())
                                    });
                                    siq_S(c).find("input[type\x3dhidden][name\x3dsiqACFilters]").each(function() {
                                        a += "\x26siqACFilters\x3d" + encodeURIComponent(siq_S(this).val())
                                    });
                                    0 <= SiqConfig.resultPageUrl.indexOf("*") ? location.href = SiqConfig.resultPageUrl.replace(/^https?:/i,
                                        "").replace("*", encodeURIComponent(b)) + (a ? (/\?/.test(SiqConfig.resultPageUrl) ? "\x26" : "?") + a : "") : location.href = SiqConfig.resultPageUrl.replace(/^https?:/i, "") + (/\?/.test(SiqConfig.resultPageUrl) ? "\x26" : "?") + encodeURIComponent(SiqConfig.queryParameter) + "\x3d" + encodeURIComponent(b) + a
                                } : function() {}
                            }(d);
                            n() && 8 <= parseInt(p(), 10) && window.XDomainRequest ? siq_ajax({
                                method: "GET",
                                url: b,
                                data: {},
                                dataType: "jsonp",
                                jsonpCallback: d
                            }) : siq_S.ajax({
                                method: "GET",
                                url: b,
                                data: {},
                                dataType: "json",
                                complete: d
                            });
                            if (SiqConfig.resultPageUrl) return !1
                        }
                    }
                }
            })
        };
    SiqContainer.waitAndRun(function() {
        return !!window.siq_S
    }, function() {
        siq_S.isReady ? (q(), r()) : siq_S(function() {
            q();
            r()
        })
    }, 200, 2E4)
})();