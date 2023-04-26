<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;
    protected $table = 'user';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'pass',
        'token',
        'paper',
        'created_at'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'pass',
    ];

    private function createPassword(string $pass, string $paper): string {
        $salt = config('auth.salt');
        $hash = md5($pass);
        return $paper.$hash.$salt;
    }

    private function createHashFromDate(): string {
        return md5(date(DATE_ATOM));
    }

    private function createHashForRecovery(string $email): string {
        $salt = config('auth.salt2');
        return md5($email.$salt);
    }
}
