define(["require", "exports", 'jquery'], function(require, exports, $) {
    var AlbumsController = (function () {
        function AlbumsController() {
        }
        AlbumsController.prototype.run = function () {
            var viewModeSwitcher = $('.view-mode-switcher');
            var viewModeSwitcherReferences = $(viewModeSwitcher.data('references'));

            viewModeSwitcher.on('click', 'a', function (element) {
                viewModeSwitcherReferences.removeClass('grid list');
                viewModeSwitcherReferences.addClass($(this).data('view-mode'));
            });
        };
        return AlbumsController;
    })();
    exports.AlbumsController = AlbumsController;
});
