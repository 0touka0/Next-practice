<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'content',
    ];

    public function contacts()
    {
        return $this->hasMany('App\Models\Contact');
    }
}
