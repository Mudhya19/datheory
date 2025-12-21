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
        Schema::table('profiles', function (Blueprint $table) {
            if (!Schema::hasColumn('profiles', 'avatar_url')) {
                $table->string('avatar_url')->nullable();
            }
            if (!Schema::hasColumn('profiles', 'location')) {
                $table->string('location')->nullable();
            }
            if (!Schema::hasColumn('profiles', 'social_links')) {
                $table->json('social_links')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            if (Schema::hasColumn('profiles', 'avatar_url')) {
                $table->dropColumn('avatar_url');
            }
            if (Schema::hasColumn('profiles', 'location')) {
                $table->dropColumn('location');
            }
            if (Schema::hasColumn('profiles', 'social_links')) {
                $table->dropColumn('social_links');
            }
        });
    }
};
