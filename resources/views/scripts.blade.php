@isset($jsPath)
  <script>
    const laravelTelInputConfig = @json(config('laravel-tel-input.options'));
    {!! file_get_contents($jsPath) !!}
  </script>
@endisset