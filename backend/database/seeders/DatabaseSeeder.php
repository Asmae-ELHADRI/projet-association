<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@association.com'],
            [
                'name' => 'Admin Association',
                'password' => Hash::make('password'),
            ]
        );

        \App\Models\Artist::create([
            'name' => 'Vincent van Gogh',
            'specialty' => 'Peintre',
            'bio' => 'Célèbre peintre post-impressionniste néerlandais.',
            'is_member' => true
        ]);

        \App\Models\Event::create([
            'title' => 'Vernissage Automne 2026',
            'description' => 'Exposition des nouvelles œuvres des membres.',
            'date' => '2026-10-15 18:00:00',
            'location' => 'Berkane, Centre Culturel'
        ]);

        \App\Models\Announcement::create([
            'title' => 'Nouvelle Adhésion Ouverte',
            'content' => 'Rejoignez notre communauté d\'artistes passionnés.'
        ]);

        $artist = \App\Models\Artist::first();

        if($artist) {
            \App\Models\Artwork::create([
                'artist_id' => $artist->id,
                'title' => 'Paysage lumineux',
                'style' => 'Impressionnisme',
                'price' => 1500,
                'dimensions' => '60x80',
                'description' => 'Une belle scène.',
                'image_path' => '/images/logo1.png', // Using existing image for now
                'status' => 'available'
            ]);

            \App\Models\Artwork::create([
                'artist_id' => $artist->id,
                'title' => 'Portrait bleu',
                'style' => 'Moderne',
                'price' => 800,
                'dimensions' => '50x70',
                'description' => 'Portrait expressif.',
                'image_path' => '/images/logo1.png',
                'status' => 'available'
            ]);
        }
    }
}
