@if($type == 'styles')

  @isset($cssPath)
    <style>{!! file_get_contents($cssPath) !!}</style>
  @endisset

@elseif($type == 'scripts')

  @isset($jsPath)
    <script async>
        var laravelTelInputConfig = @json(config('laravel-tel-input.options'));
        {!! file_get_contents($jsPath) !!}
    </script>
  @endisset

@endif