<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller; 
use App\User; 
use Illuminate\Support\Facades\Auth; 
use Illuminate\Validation\ValidationException;
use Validator;


class AuthController extends Controller
{
	/** 
     * login api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function login(Request $request){ 

        $validator = Validator::make($request->all(), User::getValidationRule());
		if ($validator->fails()) { 
            return response()->json(['error'=>$validator->errors()], Response::HTTP_UNAUTHORIZED);            
        }

        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){ 
            $user = Auth::user(); 
            $success['token'] =  $user->createToken('miniCRM')-> accessToken; 
            return response()->json(['status'=>'success','message'=>'Login successful','data' => $success], Response::HTTP_OK); 
        } 
        else{ 
            return response()->json(['status'=>'error','message'=>'Email or password is incorrect'], Response::HTTP_UNAUTHORIZED); 
        } 
    }
	/** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function register(Request $request) 
    { 
        $validator = Validator::make($request->all(), User::getRegisterValidationRule());
		if ($validator->fails()) { 
            return response()->json(['error'=>$validator->errors()], Response::HTTP_UNAUTHORIZED);            
        }
		$input = $request->all(); 
        $input['password'] = bcrypt($input['password']); 
        $user = User::create($input); 
        $success['token'] =  $user->createToken('miniCRM')-> accessToken; 
        $success['name'] =  $user->name;
		return response()->json(['success'=>$success], Response::HTTP_OK); 
    }
	/** 
     * details api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function details() 
    { 
        $user = Auth::user(); 
        return response()->json(['success' => $user], Response::HTTP_OK); 
    } 

}
