---
published: true
---
## Inline variable declaration in C# 7

I like to write clean and small code, who don't want? The C# team is doing a lot of works in this direction. One of the recent features that I like is the inline variable declaration with C# 7.
What do I mean? Let's see the code. Think about a Try_Something_ method, something about the DateTime.TryParse, you write:

    DateTime result;
    if (DateTime.TryParse(input, out result))
        DoSomething(result);
    else
        Console.WriteLine("Can't parse DateTime");

the new feature will enable you to write something like this:

    if (DateTime.TryParse(input, out DateTime result))
        DoSomething(result);
    else
        Console.WriteLine("Can't parse DateTime");

Cool!
