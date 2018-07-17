<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->increments('id');
            $table->string('firstname', 100);
            $table->string('lastname', 100);
            $table->integer('company')->nullable();
            $table->string('email')->nullable();
            $table->string('phone', 15)->nullable();
            $table->softDeletes();
            $table->timestamps();

            // $table->foreign('company')->references('id')->on('companies');
        }); 
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employees');
    }
}
