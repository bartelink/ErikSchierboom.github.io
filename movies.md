---
layout:  page
title:   Movie collection
---

<div class="view-mode-switcher" data-references="#movies">
	<a href="#" data-view-mode="grid"><i class="fa fa-th"></i></a>
	<a href="#" data-view-mode="list"><i class="fa fa-th-list"></i></a>	
</div>

<div id="movies" class="collection grid">
{% for movie in site.data.movies %}
  <div class="collection-item movie">
  	<img src="/images/movies/{{ movie.filename }}" title="Cover of {{ movie.title }} ({{ movie.year }})" />

    <div class="collection-item-info">{{ movie.title }}</div>
    <div class="collection-item-info">{{ movie.year }}</div>
  </div>
{% endfor %}
</div>