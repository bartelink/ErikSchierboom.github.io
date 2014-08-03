---
layout:  page
title:   Album collection
---

<div class="view-mode-switcher" data-references="#albums">
	<a href="#" data-view-mode="grid"><i class="fa fa-th"></i></a>
	<a href="#" data-view-mode="list"><i class="fa fa-th-list"></i></a>	
</div>

<div id="albums" class="collection grid">
{% for album in site.data.albums %}
  <div class="collection-item album">
  	<img src="/images/albums/{{ album.filename }}" title="Cover of {{ album.title }} - {{ album.artist }} ({{ album.year }})" />

  	<div class="collection-item-info" {% if album.artist == %} style="display: none;"{% endif %}>{{ album.artist }}</div>
    <div class="collection-item-info">{{ album.title }}</div>
    <div class="collection-item-info">{{ album.year }}</div>
  </div>
{% endfor %}
</div>