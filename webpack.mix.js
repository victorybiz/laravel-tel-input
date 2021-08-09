const mix = require('laravel-mix');

mix.js('resources/js/laravel-tel-input.js', 'public/js')
    .postCss("resources/css/laravel-tel-input.css", "public/css", [
        // require("tailwindcss"),
    ]);