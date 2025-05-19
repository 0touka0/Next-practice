<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'first_name' => 'required',
            'last_name' => 'required',
            'gender' => 'required',
            'email' => 'required|email',
            'tell_1' => 'required|numeric|digits_between:1,5',
            'tell_2' => 'required|numeric|digits_between:1,5',
            'tell_3' => 'required|numeric|digits_between:1,5',
            'address' => 'required',
            'category_id' => 'required',
            'detail' => 'required|max:120',
        ];
    }

    public function messages()
    {
        return [
            'first_name.required' => '姓を入力してください',
            'last_name.required' => '名を入力してください',
            'gender.required' => '性別を選択してください',
            'email.required' => 'メールアドレスを入力してください',
            'email.email' => 'メールアドレスはメール形式で入力してください',
            'tell_1.required' => '電話番号を入力してください',
            'tell_1.numeric' => '電話番号は数字で入力してください',
            'tell_1.digits_between' => '電話番号は5桁までの数字で入力してください',
            'tell_2.required' => '電話番号を入力してください',
            'tell_2.numeric' => '電話番号は数字で入力してください',
            'tell_2.digits_between' => '電話番号は5桁までの数字で入力してください',
            'tell_3.required' => '電話番号を入力してください',
            'tell_3.numeric' => '電話番号は数字で入力してください',
            'tell_3.digits_between' => '電話番号は5桁までの数字で入力してください',
            'address.required' => '住所を入力してください',
            'category_id.required' => 'お問い合わせの種類を選択してください',
            'detail.required' => 'お問い合わせ内容を入力してください',
            'detail.max' => 'お問合せ内容は120文字以内で入力してください',
        ];
    }
}
