<?php

namespace App\Http\Controllers;


use Validator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

use App\Company;

class CompaniesController extends Controller
{

	public function index(){

    	return Company::all();
    }

    public function view($id){

    	$company = Company::find($id);

    	if($company){
    		return response()->json(['status'=>'success', 'message'=>'company_found','data'=>$company],Response::HTTP_OK);
    	}

    	return response()->json(['status'=>'error', 'message'=>'company_not_found'],Response::HTTP_CREATED);
    }

    public function update(Request $request, $id){

    	$company = Company::find($id);

    	$validator = Validator::make($request->all(), Company::getEditValidationRule());
		if ($validator->fails()) { 
            return response()->json(['error'=>$validator->errors()], Response::HTTP_CREATED);            
        }

    	if($company){

    		if ($request->has('name'))
			    {
			    	$company->name = $request->input('name');
			    }

			if ($request->has('email'))
			    {
			    	$company->email = $request->input('email');
			    }
			if ($request->has('logo'))
			    {
			    	$company->logo = $request->file('logo');
			    }
			if ($request->has('website'))
			    {
			    	$company->website = $request->input('website');
			    }

			$company->save();

    		return response()->json(['status'=>'success', 'message'=>'company_updated','data'=>$company],Response::HTTP_OK);
    	}

    	return response()->json(['status'=>'error', 'message'=>'company_not_found'],Response::HTTP_CREATED);
    }

    public function create(Request $request){
        
        $validator = Validator::make($request->all(), Company::getValidationRule());
		if ($validator->fails()) { 
            return response()->json(['error'=>$validator->errors()], Response::HTTP_CREATED);            
        }

        $company = new Company;
        if(!$request->hasFile('logo')){
            $response = Company::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'website' => $request->input('website')
            ]);
        }else{
            $response = Company::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'logo' => $request->file('logo')->store('public/logos'),
                'website' => $request->input('website')
            ]);
        }

        if($response)
            return response()->json(['status'=>'success', 'message'=>'company_created','data'=>$response],Response::HTTP_OK);
        return response()->json(['status'=>'error', 'message'=>'company_creation_failed'],Response::HTTP_CREATED);
    }

    public function delete(Request $request, $id)
    {
        $company = Company::find($id);

        if($company){
        	$company->delete();

        	return response()->json(['status'=>'success', 'message'=>'company_deleted'],Response::HTTP_OK);
    	}

        return response()->json(['status'=>'error', 'message'=>'company_not_found'],Response::HTTP_CREATED);
    }

    
}
