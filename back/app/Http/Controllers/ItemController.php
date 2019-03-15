<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Item;


class ItemController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $item = new Item([
        'name' => $request->get('name'),
        'price' => $request->get('price')
      ]);
      $item->save();
       // return response()->json('Successfully added');
    }
    public function index()
    {
    return Item::get();
    }
    public function show($id)
    {
        // Show single product
        return Item::find($id);
    }

    public function update(Request $request, $id)
    {
        // Update the Product
        if ($id != null) {
            Item::where('id', $id)->update($request->all());  
        }
    }

    public function destroy($id)
    {
        // Delete the Product
        if ($id != null) {
            $item = Item::find($id);
            $item->delete();    
        }
  }
}
