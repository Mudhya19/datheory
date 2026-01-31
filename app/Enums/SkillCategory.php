<?php

namespace App\Enums;

/**
 * Skill categories for data specialist portfolio
 * Organized by domain and technology type
 */
enum SkillCategory: string
{
    // Programming Languages
    case PROGRAMMING = 'programming';

    // Data Tools & Frameworks
    case DATA_TOOLS = 'data_tools';

    // Databases
    case DATABASE = 'database';

    // Cloud & Infrastructure
    case CLOUD = 'cloud';

    // Visualization
    case VISUALIZATION = 'visualization';

    // Machine Learning & AI
    case ML_AI = 'ml_ai';

    // Other
    case OTHER = 'other';

    /**
     * Get human-readable label
     */
    public function label(): string
    {
        return match($this) {
            self::PROGRAMMING => 'Programming Languages',
            self::DATA_TOOLS => 'Data Tools & Frameworks',
            self::DATABASE => 'Databases',
            self::CLOUD => 'Cloud & Infrastructure',
            self::VISUALIZATION => 'Visualization',
            self::ML_AI => 'Machine Learning & AI',
            self::OTHER => 'Other',
        };
    }

    /**
     * Get sort order for display
     */
    public function order(): int
    {
        return match($this) {
            self::PROGRAMMING => 1,
            self::DATA_TOOLS => 2,
            self::ML_AI => 3,
            self::DATABASE => 4,
            self::CLOUD => 5,
            self::VISUALIZATION => 6,
            self::OTHER => 99,
        };
    }

    /**
     * Get all values
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * Get options for API/frontend
     */
    public static function options(): array
    {
        $options = array_map(fn($case) => [
            'value' => $case->value,
            'label' => $case->label(),
            'order' => $case->order(),
        ], self::cases());

        usort($options, fn($a, $b) => $a['order'] <=> $b['order']);

        return $options;
    }
}
