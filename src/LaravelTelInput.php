<?php

namespace Victorybiz\LaravelTelInput;

use Illuminate\View\Component;

class LaravelTelInput extends Component
{
    public $id;
    public $name;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(string $id = null, string $name = 'phone')
    {
        $this->id = $id;
        $this->name = $name;

        if (!$this->name) {
            $this->name = 'phone-' . uniqid();
        }
        if (!$this->id) {
            $this->id = $this->name;
        }
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('laravel-tel-input::components.laravel-tel-input');
    }
}
