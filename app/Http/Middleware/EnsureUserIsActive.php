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
            // If the user is a regular 'user', send to welcome directly
            if ($user->type === 'user') {
                return redirect()->route('home');
            }

            // For 'admin' or 'host' types, check if the user is active
            if (in_array($user->type, ['admin', 'host'])) {
                if ($user->status !== 'active') {
                    return redirect()->route('dashboard');
                }

                // Continue processing for admin or host (e.g., allow request)
                return $next($request);
            }

            // If type is not recognized
            abort(403, 'You do not have permission to access this page.');
        }

        return $next($request);
    }
}
