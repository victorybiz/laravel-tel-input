<?php

namespace Victorybiz\LaravelTelInput;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\View;

class LaravelTelInputServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     */
    public function boot()
    {
        /*
         * Optional methods to load your package assets
         */
        // $this->loadTranslationsFrom(__DIR__.'/../resources/lang', 'laravel-tel-input');
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'laravel-tel-input');
        // $this->loadMigrationsFrom(__DIR__.'/../database/migrations');
        // $this->loadRoutesFrom(__DIR__.'/routes.php');

        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__.'/../config/config.php' => config_path('laravel-tel-input.php'),
            ], 'laravel-tel-input:config');

            // Publishing the views.
            // $this->publishes([
            //     __DIR__.'/../resources/views' => resource_path('views/vendor/laravel-tel-input'),
            // ], 'laravel-tel-input:views');

            // Publishing assets.
            /*$this->publishes([
                __DIR__.'/../resources/assets' => public_path('vendor/laravel-tel-input'),
            ], 'assets');*/

            // Publishing the translation files.
            /*$this->publishes([
                __DIR__.'/../resources/lang' => resource_path('lang/vendor/laravel-tel-input'),
            ], 'lang');*/

            // Registering package commands.
            // $this->commands([]);
        }

        // Registering the blade components.
        Blade::component(config('laravel-tel-input.component-name', 'tel-input'), LaravelTelInput::class);

        Blade::directive('laravelTelInputStyles', function () {
            return "<?php echo \\Victorybiz\\LaravelTelInput\\LaravelTelInputAssetLoader::outputStyles(); ?>";
        });
        Blade::directive('laravelTelInputScripts', function () {            
            return "<?php echo \\Victorybiz\\LaravelTelInput\\LaravelTelInputAssetLoader::outputScripts(); ?>";
        });

        View::composer('laravel-tel-input::assets', function ($view) {
            $view->cssPath = __DIR__ . '/../public/css/laravel-tel-input.css';
            $view->jsPath = __DIR__.'/../public/js/laravel-tel-input.js';
            // $view->cssPath = __DIR__ . '/../resources/css/laravel-tel-input.css';
            // $view->jsPath = __DIR__.'/../resources/js/laravel-tel-input.js';
        });
    }

    /**
     * Register the application services.
     */
    public function register()
    {
        // Automatically apply the package configuration
        $this->mergeConfigFrom(__DIR__.'/../config/config.php', 'laravel-tel-input');

        // Register the main class to use with the facade
        $this->app->singleton('laravel-tel-input', function () {
            return new LaravelTelInput;
        });
    }
}
