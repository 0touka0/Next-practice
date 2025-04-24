<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        then: function () {
            // ✅ ここでレートリミッターを定義します！
            Illuminate\Support\Facades\RateLimiter::for('api', function (Illuminate\Http\Request $request) {
                return Illuminate\Cache\RateLimiting\Limit::perMinute(60)->by(
                    $request->user()?->id ?: $request->ip()
                );
            });
        }
    )
    ->withMiddleware(function (Middleware $middleware) {
        // APIミドルウェアグループの設定
        $middleware->group('api', [
            \Illuminate\Session\Middleware\StartSession::class,
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
            'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
