<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Throwable  $e
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function render($request, Throwable $e)
    {
        // If the request wants JSON, return a JSON response for API errors
        if ($request->is('api/*') || $request->wantsJson()) {
            return $this->handleApiException($request, $e);
        }

        return parent::render($request, $e);
    }

    /**
     * Handle API exceptions and return JSON response
     */
    private function handleApiException(Request $request, Throwable $e): JsonResponse
    {
        $statusCode = $this->getStatusCode($e);

        return response()->json([
            'success' => false,
            'message' => $this->getErrorMessage($e),
            'data' => null,
            'error_code' => $e::class,
        ], $statusCode);
    }

    /**
     * Get appropriate status code based on exception type
     */
    private function getStatusCode(Throwable $e): int
    {
        return match (true) {
            $e instanceof \Illuminate\Auth\AuthenticationException => 401,
            $e instanceof \Illuminate\Auth\Access\AuthorizationException => 403,
            $e instanceof \Illuminate\Http\Exceptions\HttpResponseException => 400,
            $e instanceof \Illuminate\Validation\ValidationException => 42,
            $e instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException => 404,
            $e instanceof \Symfony\Component\HttpKernel\Exception\HttpExceptionInterface => $e->getStatusCode(),
            default => 500,
        };
    }

    /**
     * Get appropriate error message based on exception type
     */
    private function getErrorMessage(Throwable $e): string
    {
        if ($e instanceof \Illuminate\Auth\AuthenticationException) {
            return 'Unauthenticated.';
        } elseif ($e instanceof \Illuminate\Auth\Access\AuthorizationException) {
            return 'This action is unauthorized.';
        } elseif ($e instanceof \Illuminate\Validation\ValidationException) {
            return $e->getMessage();
        } elseif ($e instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException) {
            return 'Resource not found.';
        } elseif ($e instanceof \Illuminate\Http\Exceptions\HttpResponseException) {
            return $e->getMessage();
        } else {
            return $e->getMessage();
        }
    }
}
