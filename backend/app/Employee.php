<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employee extends Model
{

    use SoftDeletes;

    protected $fillable = [
        'firstname',
        'lastname',
        'company',
        'email',
        'phone'
        
    ];

    protected $dates = ['deleted_at'];

    public function company()
    {
        return $this->belongsTo('App\Company', 'company');
    }

    public static function getValidationRule () {
        return [
            'firstname' => 'required',
            'lastname' => 'required',
            'email' => 'email|unique:employees',
            'phone' => 'numeric|min:11'
        ];
    }

    public static function getEditValidationRule () {
        return [
            'firstname' => 'required',
            'lastname' => 'required',
            'email' => 'email',
            'phone' => 'numeric|min:11'
        ];
    }
}
