---
layout:   post
title:    Numbers and culture
comments: true
tags:     [C#, .NET]
---

Converting a string to a number is a common use case. This C# code converts a string to a double:

{% highlight c# %}
string numberString = "25.78";
double number = double.Parse(numberString);
{% endhighlight %}

However, there is a potential bug in this code, can you spot it? If not, try to run the following code:

{% highlight c# %}
Thread.CurrentThread.CurrentCulture = new CultureInfo("es");

string numberString = "25.78";
double number = double.Parse(numberString);
{% endhighlight %}

You'll see that the `Parse()` call throws a `FormatException`. This is due to the current culture (Spanish) using the `","` string as the decimal separator, whereas the string being parsed uses the `"."` string.

There are two ways to solve this problem:

1. Fix it for *all* `Parse()` calls by setting the current culture to one with the correct number format.
2. Fix it for each `Parse()` call individually by using an overload that lets you specify the culture to use.

Although the first option might be tempting, one has to be very careful with this method as the current culture is used in more than just the parse methods. An example of this is the `ToString()` method, which also uses the current culture to determine its output:

{% highlight c# %}
Thread.CurrentThread.CurrentCulture = new CultureInfo("en");
25.78.ToString(); // Returns "25.78"

Thread.CurrentThread.CurrentCulture = new CultureInfo("es");
25.78.ToString(); // Returns "25,78"
{% endhighlight %}

Unless you are sure you want to change the culture for all methods, the second option is thus more safe:

{% highlight c# %}
string numberString = "25,78";
double number = double.Parse(numberString, new CultureInfo("es"));
{% endhighlight %}

### Invariant culture
With what we know now, you probably expect this code to be correct:

{% highlight c# %}
string numberString = "25.78";
double number = double.Parse(numberString, new CultureInfo("en"));
{% endhighlight %}

Unfortunately, you would be wrong. The problem is that cultures are not fixed; they are subject to user modification and updates to the .NET framework or operating system. On systems where the decimal separator for the English culture was changed, the above code would throw a `FormatException`.

Luckily, the .NET framework contains a predefined culture that is almost identical to the English culture but is *not* subject to modification. This culture is known as the *invariant* culture, and can be used through the [`CultureInfo.InvariantCulture`](http://msdn.microsoft.com/en-us/library/system.globalization.cultureinfo.invariantculture\(v=vs.110\).aspx) property. 

As the invariant culture is guaranteed to use the `"."` string as its decimal separator, we can fix our bug:

{% highlight c# %}
string numberString = "25.78";
double number = double.Parse(numberString, CultureInfo.InvariantCulture);
{% endhighlight %}

This code works on every system, no matter what changes were made to its configuration.

### Retrieving the number format
The decimal separator string used by a culture can be found by accessing its `NumberFormat.NumberDecimalSeparator` property:

{% highlight c# %}
// Returns: "."
new CultureInfo("en").NumberFormat.NumberDecimalSeparator;
    
// Returns: ","
new CultureInfo("es").NumberFormat.NumberDecimalSeparator;

// Returns: "."
CultureInfo.InvariantCulture.NumberFormat.NumberDecimalSeparator;

// Returns: "<depends on the current culture>"
CultureInfo.CurrentCulture.NumberFormat.NumberDecimalSeparator;
{% endhighlight %}

The `NumberFormat` property also exposes other number related values:

{% highlight c# %}
// Returns: "$"
new CultureInfo("en").NumberFormat.CurrencySymbol;
    
// Returns: "Infinito"
new CultureInfo("es").NumberFormat.PositiveInfinitySymbol;

// Returns: 2
new CultureInfo("fr").NumberFormat.NumberDecimalDigits;
{% endhighlight %}

You can thus check a culture's number format at runtime. Note that the examples above asume an unmodified culture.

### Defining your own number format
When we passed a `CultureInfo` instance to our parse method, we were calling an overload that takes an [`IFormatProvider`](http://msdn.microsoft.com/en-us/library/system.iformatprovider\(v=vs.110\).aspx) instance. Interestingly, the culture's `NumberFormat` property is of type `NumberFormatInfo` which *also* implements `IFormatProvider`. This means that instead of supplying a culture, you could also pass its `NumberFormat` property to the parse methods:

{% highlight c# %}
string numberString = "25.78";
double number = double.Parse(numberString, new CultureInfo("en").NumberFormat);
{% endhighlight %}

The nice thing about the `NumberFormatInfo` type is that is easy to customize. Here we create a number format where the `"#"` string serves as the decimal separator:

{% highlight c# %}
var numberFormatInfo = new NumberFormatInfo();
numberFormatInfo.NumberDecimalSeparator = "#";
    
string numberString = "25#78";

// This will correctly parse the number string to a double
double number = double.Parse(numberString, numberFormatInfo);

25.78.ToString(numberFormatInfo); // Returns "25#78"
{% endhighlight %}

This approach gives your total freedom on which format to use for parsing and formatting numbers.

### Temporarily changing culture
If you want a block of code to execute using a different culture, the simple option is to store the current culture, set the new culture and finally restore the culture to its original value. This helper class makes changing the culture for a code block easy:

{% highlight c# %}
public class CultureScope : IDisposable
{
    private readonly CultureInfo originalCulture;

    public CultureScope(string culture)
    {
        this.originalCulture = Thread.CurrentThread.CurrentCulture;
        Thread.CurrentThread.CurrentCulture = new CultureInfo(culture);
    }

    public void Dispose()
    {
        Thread.CurrentThread.CurrentCulture = this.originalCulture;
    }
}
{% endhighlight %}

We can now use this class as follows:

{% highlight c# %}
Thread.CurrentThread.CurrentCulture = new CultureInfo("en");

// Current culture is now English
25.78.ToString(); // Returns "25.78"

using (CultureScope cultureScope = new CultureScope("es"))
{
    // All code executed in this block uses the Spanish culture
    25.78.ToString(); // Returns "25,78"
}

// Current culture is once again English
25.78.ToString(); // Returns "25.78"
{% endhighlight %}

The trick we use is to have the `CultureScope` class implement `IDisposable`.  This allows us to take advantage of the `using` keyword, which guarantees that at the end of its scope the `Dispose()` method is called, where the culture is restored to its original value.

### Convert methods
In this article, we have focused on the `Parse()` method defined on the number types themselves. There is another common way to convert a string to a number, which is to use the `Convert` class:

{% highlight c# %}
string numberString = "25.78";
double number = Convert.ToDouble(numberString);
{% endhighlight %}

Everything we have learned about cultures and the `Parse()` methods also applies to the `Convert` methods. Thus, the `Convert` methods also use the current culture when converting numbers and they also have overloads that take an `IFormatProvider` instance:

{% highlight c# %}
string numberString = "25,78";
double number = Convert.ToDouble(numberString, new CultureInfo("es"));
{% endhighlight %}

### Summary
Converting strings to numbers and vice versa is a common use case. It is therefore important to know the potential pitfalls when dealing with cultures. Luckily, explicitly providing the culture is a simple solution to this problem, especially with the convenient invariant culture.