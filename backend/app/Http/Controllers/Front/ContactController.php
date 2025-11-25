<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactFormRequest;
use App\Models\ContactMessage;

class ContactController extends Controller
{
    public function index()
    {
        return view('front.contact');
    }

    public function store(ContactFormRequest $request)
    {
        ContactMessage::create($request->validated());

        return redirect()->back()->with('success', 'Votre message a été envoyé avec succès !');
    }
}
