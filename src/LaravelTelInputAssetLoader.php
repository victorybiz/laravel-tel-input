<?php

namespace Victorybiz\LaravelTelInput;

final class LaravelTelInputAssetLoader
{
    public static function outputStyles()
    {
        return view('laravel-tel-input::assets')->withType('styles');
    }

    public static function outputScripts()
    {
        return view('laravel-tel-input::assets')->withType('scripts');
    }
}
