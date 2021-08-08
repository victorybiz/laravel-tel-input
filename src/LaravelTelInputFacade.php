<?php

namespace Victorybiz\LaravelTelInput;

use Illuminate\Support\Facades\Facade;

/**
 * @see \Victorybiz\LaravelTelInput\Skeleton\SkeletonClass
 */
class LaravelTelInputFacade extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'laravel-tel-input';
    }
}
