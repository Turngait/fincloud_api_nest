<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class User extends Model
{
    use HasFactory;
    protected $table = 'user';
    public $timestamps = false;
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


    /**
     * Check credentials
     * 
     * @param string $email
     * @param string $pass
     * 
     * @return array
     */
    public function signIn(string $email, string $pass): array {
        $user = $this->getUserByEmail($email);
        if(!$user) return ["status" => 403, "id" => null];

        $pass = $this->createPassword($pass, $user->paper);
        if($pass === $user->pass) return ["status" => 200, "id" => $user->id];

        return ["status" => 403, "id" => null];
    }

    /**
     * Create new user
     * 
     * @param string $email
     * @param string $pass
     * @param string $name
     * 
     * @return array
     */
    public function signUp(string $email, string $pass, string $name): array {
        $oldUser = $this->getUserByEmail($email);
        if($oldUser) return ['status' => 409, 'id' => null];

        $paper = $this->createHashFromDate();
        $token = $this->createHashFromDate();
        $passHash = $this->createPassword($pass, $paper);
        $newUser = static::create([
            'name' => $name,
            'email' => $email,
            'pass' => $passHash,
            'token' => $token,
            'paper' => $paper,
            'created_at' => date(DATE_ATOM)
        ]);

        if($newUser) return ['status' => 202, 'id' => $newUser->id];
        return ['status' => 500, 'id' => null];
    }

    /**
     * Change name of user
     * 
     * @param string $name
     * @param int $id
     * 
     * @return array
     */
    public function changeUserName(string $name, int $id) {
        $user = $this->getUserById($id);
        if(!$user) return ["status" => 404, "msg" => "User doesn't exist"];
        $user->name = $name;
        $user->save();

        if($user->isClean()) return ["status" => 200, "msg" => ""];
        return ["status" => 500, "msg" => "Something goes wrong"];
    }

    /**
     * Return User by email
     * 
     * @param string $email
     * 
     * @return User
     */
    public function getUserByEmail(string $email) {
        return static::where('email', $email)->first();
    }

    /**
     * Return User by id
     * 
     * @param int $id
     * 
     * @return User
     */
    public function getUserById(int $id) {
        return static::find($id);
    }

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
