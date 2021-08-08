@isset($cssPath)
  <style>{!! file_get_contents($cssPath) !!}</style>
@endisset