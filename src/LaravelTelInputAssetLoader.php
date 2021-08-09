<?php

namespace Victorybiz\LaravelTelInput;

final class LaravelTelInputAssetLoader
{
    public function outputStyles()
    {
        return view('laravel-tel-input::styles');
    }

    public function outputScripts()
    {
        return view('laravel-tel-input::scripts');
    }
}
