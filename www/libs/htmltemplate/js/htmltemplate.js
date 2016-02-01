function HtmlTemplate(options) {

    var d = $.extend({
        /**
         * The url of the directory where templates reside
         */
        dir: "/templates"
    }, options);


    var loadedTpls = {};

    /**
     * map:templates, array of alias => template relative path
     */
    this.loadTemplates = function (templates, fnLoaded) {
        var n = 0;
        for (var i in templates) {
            n++;
        }

        function decrementAndFire() {
            n--;
            if (0 === n) {
                fnLoaded();
            }
        }

        for (var alias in templates) {
            loadTemplate(alias, templates[alias], decrementAndFire);
        }
    };


    /**
     * str:tplAlias
     */
    this.getHtml = function (data, tpl, dataType) {
        if (tpl in loadedTpls) {

            var raw = loadedTpls[tpl];
            dataType = dataType || 'map';

            switch (dataType) {
                case 'map':
                    return processMap(raw, data);
                    break;
                case 'rows':
                    return processRows(raw, data);
                    break;
                default:
                    devError("Invalid dataType: " + dataType);
                    return "";
                    break;
            }
        }
        else {
            devError("Template not loaded: " + tpl);
            return "";
        }
    };


    function fetchTemplate(t, fnSuccess) {
        if (null !== t) {
            var url = d.dir + "/" + t;
            $.get(url, fnSuccess).fail(function () {
                devError("template not found: " + url);
            });
        }
        else {
            devError("template not set");
        }
    }

    function processMap(raw, data) {
        for (var name in data) {
            var value = data[name];
            var reg = new RegExp('\\$' + name, 'g');
            raw = raw.replace(reg, value);
        }
        return raw;
    }

    function processRows(raw, data) {
        var s = '';
        for (var i in data) {
            s += processMap(raw, data[i]);
        }
        return s;
    }

    function loadTemplate(alias, relativePath, fnLoaded) {
        if (alias in loadedTpls) {
            fnLoaded && fnLoaded();
        }
        else {
            fetchTemplate(relativePath, function (content) {
                loadedTpls[alias] = content;
                fnLoaded && fnLoaded();
            });
        }
    }

    function devError(m) {
        alert("htmltemplate devError: " + m);
    }

}


