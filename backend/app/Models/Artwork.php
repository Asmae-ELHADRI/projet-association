<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Artwork extends Model
{
    protected $fillable = [
        'artist_id',
        'title',
        'description',
        'style',
        'dimensions',
        'price',
        'image_path',
        'status',
    ];

    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }
}
