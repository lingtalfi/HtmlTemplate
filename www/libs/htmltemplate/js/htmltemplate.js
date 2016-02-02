(function () {


    /**
     * Internal cache, array of tplAlias => tplRelUrl
     */

    var loadedTpls = {};


    window.htpl = {
        /**
         * string, the url of the directory where templates reside.
         */
        dir: "/templates",
        /**
         * 
         * Load the given templates and execute the given callback.
         * 
         * 
         * @param templates - map, the templates to load. 
         *                          It's an array of alias => template relative url
         * @param fnLoaded - callback, the callback to execute once the templates are ready.                          
         *                          
         */
        loadTemplates: function (templates, fnLoaded) {
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
        },
        /**
         * Inject data in the given template, using the given method.
         * 
         * @param data - mixed, the data to inject into the template, can be of any type,
         *                      works along with the dataType parameter.
         * @param tpl - string, the alias of the template to use
         * @param dataType - string, represents the method used to inject the data into the template,
         *                          can be one of:
         *                          
         *                              - map (default), assumes that the data is a simple map of properties,
         *                                              which keys are the name of the placeholders (placeholders are used
         *                                              in the template),
         *                                              and which values are the values to replace them with.
         *                                              
         *                              - rows, assumes that the data is an array of map (as described above).
         * 
         * 
         */
        getHtml: function (data, tpl, dataType) {
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
        }
    };


    function fetchTemplate(t, fnSuccess) {
        if (null !== t) {
            var url = htpl.dir + "/" + t;
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

})();


