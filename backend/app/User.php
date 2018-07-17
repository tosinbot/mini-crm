<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];


    public static function getValidationRule () {
        return [
            'email' => 'required|email',
            'password' => 'required'
        ];
    }

    public static function getRegisterValidationRule () {
        return [ 
            'name' => 'required', 
            'email' => 'required|email', 
            'password' => 'required|confirmed', 
            'password_confirmation' => 'required', 
        ];
    }
}
