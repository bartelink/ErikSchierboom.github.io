/// <reference path="../typings/tsd.d.ts" />

import $ = require('jquery');

export interface Controller {
	run(): void;
}

export class CollectionController implements Controller {

    run() {
    	this.setupViewModeSwitcher();
    }

    setupViewModeSwitcher() {
    	var viewModeSwitcher = $('.view-mode-switcher');
    	var viewModeSwitcherReferences = $(viewModeSwitcher.data('references'));

    	viewModeSwitcher.on('click', 'a', function(element:JQueryEventObject) {
    		viewModeSwitcherReferences.removeClass('grid list');
    		viewModeSwitcherReferences.addClass($(this).data('view-mode'));
            return false;
    	});
    }
}

export class AlbumsController extends CollectionController {} 

export class MoviesController extends CollectionController {}