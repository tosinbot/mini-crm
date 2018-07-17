<?php

namespace App\Http\Controllers;


use Validator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

use App\Employee;

class EmployeesController extends Controller
{

	public function index(){

    	return Employee::with('company')->get();
    }

    public function view($id){

    	$employee = Employee::with('company')->find($id);

    	if($employee){
    		return response()->json(['status'=>'success', 'message'=>'employee_found','data'=>$employee],Response::HTTP_OK);
    	}

    	return response()->json(['status'=>'error', 'message'=>'employee_not_found'],Response::HTTP_CREATED);
    }

    public function update(Request $request, $id){

    	$employee = Employee::find($id);

    	$validator = Validator::make($request->all(), Employee::getEditValidationRule());
		if ($validator->fails()) { 
            return response()->json(['error'=>$validator->errors()], Response::HTTP_CREATED);            
        }

    	if($employee){

    		if ($request->has('firstname'))
			    {
			    	$employee->firstname = $request->input('firstname');
			    }

			if ($request->has('lastname'))
			    {
			    	$employee->lastname = $request->input('lastname');
			    }
			if ($request->has('company'))
			    {
			    	$employee->company = $request->input('company');
			    }
			if ($request->has('email'))
			    {
			    	$employee->email = $request->input('email');
			    }
			if ($request->has('phone'))
			    {
			    	$employee->phone = $request->input('phone');
			    }

			$employee->save();

    		return response()->json(['status'=>'success', 'message'=>'employee_updated','data'=>$employee],Response::HTTP_OK);
    	}

    	return response()->json(['status'=>'error', 'message'=>'employee_not_found'],Response::HTTP_CREATED);
    }

    public function create(Request $request){
        
        $validator = Validator::make($request->all(), Employee::getValidationRule());
		if ($validator->fails()) { 
            return response()->json(['error'=>$validator->errors()], Response::HTTP_CREATED);            
        }

        $employee = new Employee;
        $employee = $request->all();

        $response = Employee::create($employee);

        if($response)
            return response()->json(['status'=>'success', 'message'=>'employee_created','data'=>$response],Response::HTTP_OK);
        return response()->json(['status'=>'error', 'message'=>'employee_creation_failed'],Response::HTTP_CREATED);
    }

    public function delete(Request $request, $id)
    {
        $employee = Employee::find($id);

        if($employee){
        	$employee->delete();

        	return response()->json(['status'=>'success', 'message'=>'employee_deleted'],Response::HTTP_OK);
    	}

        return response()->json(['status'=>'error', 'message'=>'employee_not_found'],Response::HTTP_CREATED);
    }

    
}
