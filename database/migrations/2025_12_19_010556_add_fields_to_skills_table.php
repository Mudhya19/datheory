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
        Schema::table('skills', function (Blueprint $table) {
            if (!Schema::hasColumn('skills', 'proficiency')) {
                $table->integer('proficiency')->nullable();
            }
            if (!Schema::hasColumn('skills', 'icon_url')) {
                $table->string('icon_url')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('skills', function (Blueprint $table) {
            if (Schema::hasColumn('skills', 'proficiency')) {
                $table->dropColumn('proficiency');
            }
            if (Schema::hasColumn('skills', 'icon_url')) {
                $table->dropColumn('icon_url');
            }
        });
    }
};
