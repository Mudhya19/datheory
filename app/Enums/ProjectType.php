<?php

namespace App\Enums;

/**
 * Project types for data specialist portfolio
 * Represents the three main domains of data work
 */
enum ProjectType: string
{
    case DATA_SCIENCE = 'data_science';
    case DATA_ANALYSIS = 'data_analysis';
    case DATA_ENGINEERING = 'data_engineering';

    /**
     * Get human-readable label for the project type
     */
    public function label(): string
    {
        return match($this) {
            self::DATA_SCIENCE => 'Data Science',
            self::DATA_ANALYSIS => 'Data Analysis',
            self::DATA_ENGINEERING => 'Data Engineering',
        };
    }

    /**
     * Get description of what this type involves
     */
    public function description(): string
    {
        return match($this) {
            self::DATA_SCIENCE => 'Machine learning, predictive modeling, and statistical analysis projects',
            self::DATA_ANALYSIS => 'Business intelligence, dashboards, and exploratory data analysis',
            self::DATA_ENGINEERING => 'Data pipelines, ETL processes, and infrastructure projects',
        };
    }

    /**
     * Get all project types as array for validation/dropdown
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * Get all types with labels for API response
     */
    public static function options(): array
    {
        return array_map(fn($case) => [
            'value' => $case->value,
            'label' => $case->label(),
            'description' => $case->description(),
        ], self::cases());
    }
}
