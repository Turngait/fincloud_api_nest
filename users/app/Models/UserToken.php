<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserToken extends Model
{
    use HasFactory;

    protected $table = 'user_tokens';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'token',
        'created_at'
    ];

    /**
     * Add new user's token to DB
     * 
     * @param int $user_id
     * 
     * @return string
     */
    public function addToken(int $user_id): string | null {
        $token = $this->createHashFromDate();

        $newToken = static::create([
            'user_id' => $user_id,
            'token' => $token,
            'created_at' => date(DATE_ATOM)
        ]);
        if($newToken) return $token;
        return null;
    }

    private function createHashFromDate(): string {
        return md5(date(DATE_ATOM));
    }
}
