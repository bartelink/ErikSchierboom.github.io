
/// <reference path="../../typings/requirejs/require.d.ts" />

requirejs.config({
    'baseUrl': '/scripts',
    'paths': {      
      'jquery': '//code.jquery.com/jquery-1.11.0.min'
    }
});

requirejs(['jquery', 'app'], ($:JQueryStatic, app:any) => $(() => new app.App().run()));