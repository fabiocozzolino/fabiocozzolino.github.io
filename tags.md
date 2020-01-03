---
id: 2482
title: Tags
date: 2016-04-01T00:48:03+00:00
author: fabiocozzolino
layout: page
permalink: /tags/
guid: http://www.fabiocozzolino.eu/?page_id=2482
---
{% capture site_tags %}{% for tag in site.tags %}{{ tag | first }}{% unless forloop.last %},{% endunless %}{% endfor %}{% endcapture %}
{% assign tag_words = site_tags | split:',' | sort %}

<section class="blog-tags">
  <h1>Tags in Blog</h1>
  <ul class="tags">
<!--  cycles through tag list and creates header row of all tags used in site with accompanying per-tag counts...-->
  {% for item in (0..site.tags.size) %}{% unless forloop.last %}
    {% capture this_word %}{{ tag_words[item] | strip_newlines }}{% endcapture %}
    <li ><a href="#{{ this_word | cgi_escape }}" class="tag">{{ this_word }} <span>({{ site.tags[this_word].size }})</span></a></li>
  {% endunless %}{% endfor %}
  </ul>
<!--cycles through tag list and creates subheader for each tag name...-->
  {% for item in (0..site.tags.size) %}{% unless forloop.last %}
    {% capture this_word %}{{ tag_words[item] | strip_newlines }}{% endcapture %}
  <h2 id="{{ this_word | cgi_escape }}">{{ this_word }}</h2>
<!--  lists all posts corresponding to specific tag...-->
    {% for post in site.tags[this_word] %}{% if post.title != null %}
    <div class="tag-list">
        <span><a href="{{ post.url }}">{{ post.title }}</a></span>
        <small><span>| {{ post.date | date_to_string }}</span></small>
    </div>
    {% endif %}{% endfor %}
  {% endunless %}{% endfor %}
</section>
