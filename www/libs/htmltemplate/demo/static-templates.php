<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
    <script src="/libs/htmltemplate/js/htmltemplate.js"></script>
    <title>Html page</title>
</head>

<body>

<pre>
    If you have a lot of templates, it's probably better that you load the html templates statically,
    because then you don't need to use http requests (which take some time).
    
    This demo shows how to do it.
    We basically create a hidden div in which we write all our html templates.
    Then, we tell htpl to search the templates in that div, using the third argument of the loadTemplates method.
    
</pre>
<div id="container">

</div>
<div id="html_templates" style="display: none">
    <?php
    use HtmlTemplate\HtmlTemplate;

    require_once "bigbang.php"; // start the local universe (https://github.com/lingtalfi/TheScientist/blob/master/convention.portableAutoloader.eng.md)

    HtmlTemplate::$templateDir = __DIR__ . "/libs/htmltemplate/demo/templates";
    HtmlTemplate::writeTemplates('person.htpl');
    ?>
</div>

<script>
    (function ($) {
        $(document).ready(function () {

            htpl.dir = "/libs/htmltemplate/demo/templates"; // usually, you won't need this line, that's just because the demo has non default needs

            // we need to load all our templates first
            htpl.loadTemplates({
                person: "person.htpl"
            }, function () {




                // imagine we get rows from a call to an ajax service
                var personInfo = {
                    id: 6,
                    name: "marie",
                    value: "haberton"
                };


                // inject the rows using default mode (called map mode)
                $('#container').append(htpl.getHtml(personInfo, 'person'));


            }, 'html_templates');
        });
    })(jQuery);
</script>
</body>
</html>