<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ArtistApplication extends Model
{
    protected $fillable = [
        'name',
        'email',
        'specialty',
        'message',
        'portfolio_file',
        'status',
    ];
}
