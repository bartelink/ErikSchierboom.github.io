/// <reference path="../typings/jquery/jquery.d.ts" />

import $ = require('jquery')
import controllers = require('./controllers')

export class App {

    run () {
    	var controller = this.getController();

        if (controller == null) {
            return;
        }

        controller.run();
    }

    getController(): controllers.Controller {
        switch (this.getPageUrl()) {
            case '/albums/':
                return new controllers.AlbumsController();
            case '/movies/':
                return new controllers.MoviesController();
            default:
                return null;
        }
    }

    getPageUrl() {
    	return $('body').attr('id');
    }
}