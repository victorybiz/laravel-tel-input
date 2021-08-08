@isset($jsPath)
  <script>
    const laravelTelInputConfig = @json(config('tel-input.options'));
    {!! file_get_contents($jsPath) !!}
  </script>
@endisset