<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Artist extends Model
{
    protected $fillable = [
        'name',
        'specialty',
        'bio',
        'portfolio_url',
        'image_path',
        'is_member',
    ];
}
