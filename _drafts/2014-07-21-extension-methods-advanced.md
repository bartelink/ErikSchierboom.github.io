---
layout: post
title: Extension methods - Advanced
---

In the [Extension methods - An introduction]({% post_url 2014-06-23-extension-methods-an-introduction %}) post, we discussed the basics of working with extension methods. This post will delve deeper into the matter and show some more advanced usages of extension methods.

### Generated IL code

TODO


### Use in older versions of the .NET framework

That is because extension methods are nothing more than a compiler trick, syntactic sugar if you like. What the compiler does is convert the `"abcd".HasEvenLength()` call to its static `StringExtensions.HasEvenLength("abcd")` form and then continue compilation as usual. This means that it is also possible to [use extension methods on older versions of the .NET framework](http://www.danielmoth.com/Blog/Using-Extension-Methods-In-Fx-20-Projects.aspx).