var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'jquery'], function(require, exports, $) {
    var CollectionController = (function () {
        function CollectionController() {
        }
        CollectionController.prototype.run = function () {
            this.setupViewModeSwitcher();
        };

        CollectionController.prototype.setupViewModeSwitcher = function () {
            var viewModeSwitcher = $('.view-mode-switcher');
            var viewModeSwitcherReferences = $(viewModeSwitcher.data('references'));

            viewModeSwitcher.on('click', 'a', function (element) {
                viewModeSwitcherReferences.removeClass('grid list');
                viewModeSwitcherReferences.addClass($(this).data('view-mode'));
                return false;
            });
        };
        return CollectionController;
    })();
    exports.CollectionController = CollectionController;

    var AlbumsController = (function (_super) {
        __extends(AlbumsController, _super);
        function AlbumsController() {
            _super.apply(this, arguments);
        }
        return AlbumsController;
    })(CollectionController);
    exports.AlbumsController = AlbumsController;

    var MoviesController = (function (_super) {
        __extends(MoviesController, _super);
        function MoviesController() {
            _super.apply(this, arguments);
        }
        return MoviesController;
    })(CollectionController);
    exports.MoviesController = MoviesController;
});
