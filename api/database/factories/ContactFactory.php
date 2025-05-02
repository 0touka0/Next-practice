<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contact>
 */
class ContactFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "category_id" => fake()->numberBetween(1, 5),
            "first_name" => fake()->firstName(),
            "last_name" => fake()->lastName(),
            "gender" => fake()->numberBetween(1, 3),
            "email" => fake()->email(),
            "tell" => fake()->phoneNumber(),
            "address" => fake()->address(),
            "building" => fake()->buildingNumber(),
            "detail" => fake()->text(),
            "created_at" => fake()->dateTimeBetween("-1 year", "now"),
            "updated_at" => fake()->dateTimeBetween("-1 year", "now"),
        ];
    }
}
