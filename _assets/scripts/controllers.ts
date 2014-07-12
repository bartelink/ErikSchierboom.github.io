/// <reference path="../../typings/jquery/jquery.d.ts" />

import $ = require('jquery');

export interface Controller {
	run(): void;
}

export class AlbumsController implements Controller {

    run() {
    	var viewModeSwitcher = $('.view-mode-switcher');
    	var viewModeSwitcherReferences = $(viewModeSwitcher.data('references'));

    	viewModeSwitcher.on('click', 'a', function(element:JQueryEventObject) {
    		viewModeSwitcherReferences.removeClass('grid list');
    		viewModeSwitcherReferences.addClass($(this).data('view-mode'));
    	});    	
    }
}