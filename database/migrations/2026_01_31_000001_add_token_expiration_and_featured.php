<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('admin_users', function (Blueprint $table) {
            $table->timestamp('token_expires_at')->nullable()->after('remember_token');
        });

        // Add featured column to projects if it doesn't exist
        Schema::table('projects', function (Blueprint $table) {
            if (!Schema::hasColumn('projects', 'featured')) {
                $table->boolean('featured')->default(false)->after('is_published');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('admin_users', function (Blueprint $table) {
            $table->dropColumn('token_expires_at');
        });

        Schema::table('projects', function (Blueprint $table) {
            if (Schema::hasColumn('projects', 'featured')) {
                $table->dropColumn('featured');
            }
        });
    }
};
