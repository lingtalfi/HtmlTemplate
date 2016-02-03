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
You load them once at the beginning of your page, then you can use them when needed.

To load the templates, we use the loadTemplates method.
To use a template, we use the getHtml method.



Methods
----------

### loadTemplates

```js
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
loadTemplates: function (templates, fnLoaded);
```


### getHtml

```js
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
getHtml: function (data, tpl, dataType);
```



html templates notation
----------------------------

To create a placeholder, prefix it with the dollar ($) symbol.
That's all there is to it, really.



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

			htpl.dir = "/libs/htmltemplate/demo/templates"; // usually, you won't need this line, that's just because the demo has non default needs

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

			htpl.dir = "/libs/htmltemplate/demo/templates"; // usually, you won't need this line, that's just because the demo has non default needs

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



Related
-----------

- [phptemplate](https://github.com/lingtalfi/PhpTemplate): a simple template system for static code 




History Log
------------------
    
- 3.0.0 -- 2016-02-02

    - the library is now static, and the object is htpl
    
- 2.0.0 -- 2016-02-01

    - moved loadTemplate to loadTemplates to get rid of async problems
    
- 1.0.0 -- 2016-01-31

    - initial commit
    
    






