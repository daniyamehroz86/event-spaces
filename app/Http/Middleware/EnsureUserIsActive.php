<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class EnsureUserIsActive
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = Auth::user();

        if ($user) {
            // Check if the user's status is correct (active or inactive)
            if ($user->status != 'active') {
                if (!$request->routeIs('dashboard')) {
                    return redirect()->route('dashboard');
                }
            }

            // Check if the user type matches one of the allowed roles (admin or host)
            if (!in_array($user->type, $roles)) {
                abort(403, 'You do not have permission to access this page.');
            }
        }

        return $next($request);
    }
}
