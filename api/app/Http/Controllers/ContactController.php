<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Http\Requests\ContactRequest;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::all();
        return response()->json($contacts, 200);
    }

    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();
        return response()->json(['message' => 'お問い合わせを削除しました'], 200);
    }

    public function tempStore(ContactRequest $request)
    {
        $request->session()->put('contact', $request->all());
        return response()->json(['message' => 'お問い合わせを確認しました'], 200);
    }

    public function sessionData(Request $request)
    {
        $contact = $request->session()->get('contact');
        return response()->json($contact);
    }

    public function contactStore(ContactRequest $request)
    {
        $contact = Contact::create($request->all());
        $request->session()->forget('contact');
        return response()->json(['message' => 'お問い合わせを受け付けました'], 200);
    }
}
