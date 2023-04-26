<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function testDBConnectionAction() {
        $user = User::first();
        dd($user);
        return "<h1>Test from Controller</h1>";
    }

    public function signInAction() {
        return "Sign in";
    }

    public function signUpAction() {
        return "Sign Up";
    }

    public function returnUserIdAction() {
        return "User ID";
    }

    public function changeUserNameAction() {
        return "Name is changed";
    }

    public function changeUserPassAction() {
        return "Pass is changed";
    }

    public function returnUserDataAction() {
        return "User data";
    }

    public function restoreUserPassAction() {
        return "Restore user pass";
    }
}
