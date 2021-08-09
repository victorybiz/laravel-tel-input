<?php

namespace Victorybiz\LaravelTelInput;

final class LaravelTelInputAssetLoader
{
    public static function outputStyles()
    {
        return view('laravel-tel-input::styles');
    }

    public static function outputScripts()
    {
        return view('laravel-tel-input::scripts');
    }
}
