HtmlTemplate
=================
2016-01-31


A simple template system to work with jquery.



htmltemplate can be installed as a [planet](https://github.com/lingtalfi/Observer/blob/master/article/article.planetReference.eng.md).


jquery is a dependency.




Features
------------

- lightweight (less than 150 lines of code)
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

Then, at the beginning of your code, call all the templates you are going to use on the page, using the loadTemplates method.
This method loads all the selected templates in memory, so that you don't have to worry about async problems then. 

Note that you can choose meaningful/handy aliases to refer to your templates later in your code.


Once the templates are loaded, you can use the getHtml method, which injects data in a template of your choice,
and returns the resulting string.

The getHtml method works like this:


```abap
str:html    getHtml ( mixed:data, str:templateAlias, str|null:dataType=map )
```



### dataTypes

Using the dataType argument, you can change how the data is being treated.
The default dataType is "map", which allows you to pass a map of place holders.

If you are working with rows though, there is a "rows" mode, which accepts a rows array directly.

The available data types are:

- map: handle a map (javascript associative array)
- rows: array of maps



### html templates notation

To create a placeholder, prefix it with the dollar ($) symbol. 
That's all there is to it, for now.


Other examples
-------------------

The examples are available in the [demos](https://github.com/lingtalfi/HtmlTemplate/tree/master/www/libs/htmltemplate/demo).

### rows mode 

Here is how you would use the rows mode:

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
			// we need to load all our templates first
			htpl.loadTemplates({
				person: "person.htpl"
			}, function () {
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
				// inject the rows using rows mode
				$('#container').append(htpl.getHtml(rows, 'person', 'rows'));
			});
		});
	})(jQuery);
</script>


</body>
</html>
```



### mixing modes

Here is how you would mix map mode and rows mode.
Beside the "person template", there is another container template which contains the following:

```html
<div class="container">$persons</div>
```

Then the html code looks like this:

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
			// we need to load all our templates first
			htpl.loadTemplates({
				person: "person.htpl",
				container: "container.htpl"
			}, function () {
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
				// inject the rows using default mode (called map mode)
				$('#container').append(htpl.getHtml({persons: htpl.getHtml(rows, 'person', 'rows')}, 'container'));
			});
		});
	})(jQuery);
</script>


</body>
</html>
```







History Log
------------------
    
- 2.0.0 -- 2016-02-01

    - moved loadTemplate to loadTemplates to get rid of async problems
    
- 1.0.0 -- 2016-01-31

    - initial commit
    
    






