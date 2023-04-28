<?php

namespace App\Http\Controllers;

use App\Http\Requests\SignInRequest;
use App\Models\User;
use App\Models\UserToken;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function testDBConnectionAction() {

        return "<h1>Test from Controller</h1>";
    }

    // TODO Add validation of all requests
    public function signInAction(SignInRequest $request) {
        $user = new User;
        $validatedRequest = $request->validated();
        $data = $user->signIn($validatedRequest['email'], $validatedRequest['pass']);
        if($data["status"] === 200) {
            $token = new UserToken;
            return response()->json(["status" => $data["status"], "data" => ["id" => $data["id"], "token" => $token->addToken($data["id"]), "msg" => ""]]);
        }
        else {
            return response()->json(["status" => $data["status"], "data" => ["id" => null, "token" => "", "msg" => "Wrong email or password"]]);
        }
    }

    public function signUpAction(Request $request) {
        $user = new User;
        $data = $user->signUp($request->email, $request->pass, $request->name);
        if($data["status"] === 202) {
            $token = new UserToken;
            return response()->json(["status" => $data["status"], "data" => ["id" => $data["id"],"token" => $token->addToken($data["id"]), "msg" => ""]]);
        }
        else if($data["status"] === 409) {
            return response()->json(["status" => $data["status"], "data" => ["id" => null,"token" => "", "msg" => "User with such email is exist"]]);
        }
        else {
            return response()->json(["status" => $data["status"], "data" => ["id" => null,"token" => "", "msg" => ""]]);
        }
    }

    public function returnUserIdAction(Request $request) {
        $data = UserToken::where("token", $request->token)->first();
        if($data) return response()->json(["status" => 200, "data" => ["id" => $data->user_id, "token" => $data->token, "msg" => ""]]);
        return response()->json(["status" => 404, "data" => ["id" => null, "token" => $request->token, "msg" => "Wrong token"]]);
    }

    public function changeUserNameAction(Request $request) {
        $userByToken = UserToken::where("token", $request->token)->first();
        if(!$userByToken) return response()->json(["status" => 404, "data" => ["isUpdated" => false,"msg" => "Wrong token"]]);

        $user = new User;
        $data = $user->changeUserName($request->name, $userByToken->user_id);
        return response()->json(["status" => $data["status"], "data" => ["isUpdated" => $data["status"] === 200, "msg" => $data["msg"]]]);
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
