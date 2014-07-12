---
layout:  page
title:   Album collection
---

<div class="view-mode-switcher" data-references="#albums-list">
	<a href="#" data-view-mode="grid"><i class="fa fa-th"></i></a>
	<a href="#" data-view-mode="list"><i class="fa fa-th-list"></i></a>	
</div>

<div id="albums-list" class="grid">
{% for album in site.data.albums %}
  <div class="album">
  	<img src="/images/albums/{{ album.filename }}" title="Cover of {{ album.title }} - {{ album.artist }} ({{ album.year }})" />

  	<div class="album-info album-artist" {% if album.artist == %} style="display: none;"{% endif %}>{{ album.artist }}</div>
    <div class="album-info album-title">{{ album.title }}</div>
    <div class="album-info album-year">{{ album.year }}</div>
  </div>
{% endfor %}
</div>