<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Http\Requests\ContactRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use League\Csv\Writer;

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

    public function export()
    {
        $contacts = Contact::with('category')->get();
        
        $csv = Writer::createFromString('');
        $csv->setOutputBOM(Writer::BOM_UTF8);
        
        $csv->insertOne([
            'ID',
            '姓',
            '名',
            '性別',
            'メールアドレス',
            '電話番号',
            '住所',
            '建物名',
            'お問い合わせ種類',
            'お問い合わせ内容',
            '作成日時'
        ]);

        foreach ($contacts as $contact) {
            $gender = match($contact->gender) {
                1 => '男性',
                2 => '女性',
                default => 'その他'
            };

            $address = str_replace(["\r\n", "\r", "\n"], ' ', $contact->address);
            $detail = str_replace(["\r\n", "\r", "\n"], ' ', $contact->detail);
            $building = str_replace(["\r\n", "\r", "\n"], ' ', $contact->building);

            $csv->insertOne([
                $contact->id,
                $contact->last_name,
                $contact->first_name,
                $gender,
                $contact->email,
                $contact->tell,
                $address,
                $building,
                $contact->category->content,
                $detail,
                $contact->created_at
            ]);
        }

        $headers = [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="contacts.csv"',
        ];

        return Response::make($csv->toString(), 200, $headers);
    }
}
