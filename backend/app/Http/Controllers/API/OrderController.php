<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Artwork;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        return Order::with('items.artwork')->latest()->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string',
            'customer_email' => 'required|email',
            'customer_address' => 'required|string',
            'items' => 'required|array',
            'items.*.artwork_id' => 'required|exists:artworks,id',
            'items.*.quantity' => 'integer|min:1',
        ]);

        $order = DB::transaction(function () use ($validated) {
             $order = Order::create([
                 'customer_name' => $validated['customer_name'],
                 'customer_email' => $validated['customer_email'],
                 'customer_address' => $validated['customer_address'],
                 'total_amount' => 0,
                 'status' => 'pending'
             ]);

             $calculatedTotal = 0;

             foreach ($validated['items'] as $item) {
                 $artwork = Artwork::find($item['artwork_id']);
                 if (!$artwork || $artwork->status === 'sold') continue;

                 $price = $artwork->price;
                 $quantity = $item['quantity'] ?? 1;
                 $subtotal = $price * $quantity;
                 $calculatedTotal += $subtotal;

                 OrderItem::create([
                     'order_id' => $order->id,
                     'artwork_id' => $artwork->id,
                     'price' => $price,
                     'quantity' => $quantity,
                 ]);

                 // Mark as sold
                 $artwork->update(['status' => 'sold']);
             }

             $order->update(['total_amount' => $calculatedTotal]);
             return $order;
        });

        return response()->json($order->load('items'), 201);
    }

    public function show(Order $order)
    {
        return $order->load('items.artwork');
    }
}
