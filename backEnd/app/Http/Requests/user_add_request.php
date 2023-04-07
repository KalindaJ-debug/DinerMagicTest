<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class user_add_request extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = $this->user();

        return $user != null && $user->tokenCan('create');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required'],
            'email'  => ['required', 'email'], 
            'password'  => ['required', 'min:4'],
            'access_level'  => ['required'],
            'created_by' => ['required']
        ];
    }
}
