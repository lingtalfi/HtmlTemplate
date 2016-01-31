HtmlTemplate
=================
2016-01-31


A simple template system to work with jquery.



htmltemplate can be installed as a [planet](https://github.com/lingtalfi/Observer/blob/master/article/article.planetReference.eng.md).


jquery is a dependency.




Features
------------

- lightweight (70 lines of code)
- simple placeholder replacement system
- well organized workflow




Example
-------------

First create your html template, use the dollar symbol to prefix a variable.


```html 
<div class="person" data-id="$id">
	<div class="row">
		<span class="name">$name</span>
		<span class="value">$value</span>
	</div>
</div>
```


Then call it from your page.

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
    <script src="/libs/htmltemplate/js/htmltemplate.js"></script>
    <title>Html page</title>
</head>

<body>

<div id="container">

</div>


<script>
    (function ($) {
        $(document).ready(function () {

            var htpl = new HtmlTemplate({
                // the default value for dir is /templates, but for this demo I changed it
                dir: "/libs/htmltemplate/demo/templates"
            });


            // imagine we get rows from a call to an ajax service
            var rows = [
                {
                    id: 6,
                    name: "marie",
                    value: "haberton"
                },
                {
                    id: 7,
                    name: "pierre",
                    value: "samuel"
                }
            ];


            htpl.loadTemplate('person.htpl', function () {
                for (var i in rows) {
                    $('#container').append(htpl.getHtml(rows[i]));
                }
            });


        });
    })(jQuery);
</script>


</body>
</html>
```



How does it work?
---------------------

There is a template directory which contains all your html templates.

Then, when you need to use a template, use the loadTemplate method.

Once the template is loaded, you can use the getHtml method, which injects data in your template 
and returns the resulting string.


### html templates notation

To create a placeholder, prefix it with the dollar ($) symbol. 
That's all there is to it, for now.



History Log
------------------
    
- 1.0.0 -- 2016-01-31

    - initial commit
    
    






