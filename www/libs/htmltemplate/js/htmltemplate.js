function HtmlTemplate(options) {

    var d = $.extend({
        /**
         * The url of the directory where templates reside
         */
        dir: "/templates"
    }, options);


    var loadedTpls = {};

    var currentTemplate = null;


    this.loadTemplate = function (t, fnLoaded) {
        if (t in loadedTpls) {
            currentTemplate = t;
            fnLoaded && fnLoaded();
        }
        else{
            fetchTemplate(t, function(content){
                currentTemplate = t;
                loadedTpls[t] = content;
                fnLoaded && fnLoaded();
            });
        }
    };

    this.getHtml = function (data) {
        if(currentTemplate in loadedTpls){
            var raw = loadedTpls[currentTemplate];
            return injectData(raw, data);
        }
        else{
            devError("Template not loaded: " + currentTemplate);
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
    
    function injectData(raw, data){
        for(var name in data){
            var value = data[name];
            var reg = new RegExp('\\$' + name, 'g');
            raw = raw.replace(reg, value);
        }
        return raw;
    }

    function devError(m) {
        alert("htmltemplate devError: " + m);
    }

}


