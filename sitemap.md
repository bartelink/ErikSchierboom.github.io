---
layout:  page
title:   Sitemap
sitemap: false
---

## Pages
<ul>
  {% for page in site.pages %}
    {% if page.sitemap == null or !page.sitemap %}
    <li>
      <a href="{{ page.url }}" title="{{ page.title }}">{{ page.title }}</a>
    </li>
    {% endif %}
  {% endfor %}
</ul>

## Posts

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
