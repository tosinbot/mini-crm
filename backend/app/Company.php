<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'logo',
        'website'
        
    ];

    protected $dates = ['deleted_at'];

     public function employee()
    {
        return $this->hasMany('App\Employee', 'company');
    }

    public static function getValidationRule () {
        return [
            'name' => 'required',
            'email' => 'email|unique:companies',
            'logo' => 'nullable|dimensions:min_width=100,min_height=100'
        ];
    }

    public static function getEditValidationRule () {
        return [
            'name' => 'required',
            'email' => 'email',
            'logo' => 'nullable|dimensions:min_width=100,min_height=100'
        ];
    }
}
