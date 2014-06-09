---
layout: post
title: Extension methods - An introduction
---

Extension methods were introduced in C# 3.0. The [MSDN](http://msdn.microsoft.com/en-us/library/bb308966.aspx#csharp3.0overview_topic3) defines it as follows:

> Extension methods are static methods that can be invoked using instance method syntax. In effect, extension methods make it possible to **extend existing types** and constructed types with additional methods. —[emphasis mine]

So extension methods allow you to extend existing types by defining static methods, which can then be called as if they were instance methods. Let's see how this works.

### Example 1: simple extension method
Suppose we want to write a function to check if a `string`'s length is even. As the `string` class is part of the .NET framework, we can't add this new method by modifying its source code. Furthermore, as the `string` class is marked as `sealed`, it can't be extended. Our last resort is to define a static helper method:

{% highlight c# %}
public static class StringHelper
{
    public static bool HasEvenLength(string str)
    {
        return str.Length % 2 == 0;
    }
}
{% endhighlight %}

Invoking this method is simple:

{% highlight c# %}
StringHelper.HasEvenLength("abcd")
{% endhighlight %}

There is nothing wrong with this approach, but extension methods can improve upon this. First, we convert our static helper method to an extension method by prefixing the first parameter with `this`:

{% highlight c# %}
public static class StringExtensions
{
    public static bool HasEvenLength(this string str)
    {
        return str.Length % 2 == 0;
    }
}
{% endhighlight %}

Then we can call this (extension) method as if it was a regular instance method:

{% highlight c# %}
"abcd".HasEvenLength()
{% endhighlight %}

How does this work? Well, behind the scenes extension method calls are converted to regular static method calls:

{% highlight c# %}
StringExtensions.HasEvenLength("abcd")
{% endhighlight %}

Extension methods are thus nothing more that static methods in disguise. As such, everything you know about static methods also applies to extension methods. 

### Example 2: multiple parameters
Our previous example used a single parameter, but it is perfectly valid to create extension methods with more than one parameter (but not with less obviously):

{% highlight c# %}
public static class StringExtensions
{
    public static bool StartsWithFromIndex(this string str, string expectedStart, int index)
    {
        return str.Substring(index).StartsWith(expectedStart);
    }
}

"Hello, World".StartsWithFromIndex("World", 7) // Returns true
{% endhighlight %}

This will get converted by the compiler to:

{% highlight c# %}
StringExtensions.StartsWithFromIndex("Hello, World", "World", 7)
{% endhighlight %}

### Example 3: extending value types

Extension methods can be defined for any type. For example, if you often convert integers to their hexadecimal representation, you could define this extension method:

{% highlight c# %}
public static class IntExtensions
{
    public static string ToHex(this int val)
    {
        return val.ToString("X");
    }
} 

10.ToHex() // Returns A
{% endhighlight %}

### Limitations

- Extension methods can only be defined in static classes.

- You can only access public members of the class the extension method is applied to. This follows from the fact that extension methods are nothing more than plain static methods defined in static classes.

- You can only create extensions for methods; properties, indexers, operators and constructors cannot be extended.

- If an extension method has the exact same signature as a method defined in the extended type, the extension method will never be called.

- When you import a namespace containing extension methods, you automatically include *all* of them. You can't choose the ones you want to import, it is all or nothing.

### Warning: prevent overuse

Once people learn about extension methods, they often convert all their static helper methods to extension methods. However, this can lead to situations where a single type has over a hundred different methods, which makes finding methods harder.

To prevent this, ask yourself the following simple questions when deciding if a method should be defined as an extension method:

- How often do I use this method? If the method is not used often, don't make it an extension method.

- How much does it improve the clarity of the code? If the improvement is not self-evident, don't make it an extension method.

### Conclusion

All in all, extension methods are a great and very useful feature of C#. If used carefully and sparingly, they can really improve the clarity of your code.