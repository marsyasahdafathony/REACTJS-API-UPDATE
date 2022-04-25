import React from "react";
import { Routes, Route } from "react-router-dom";

import Beranda from "./beranda";
import TentangSaya from "./tentangsaya";
import Karya from "./karya";
import Kontak from "./kontak";
import Gallery from '../pages/Gallery';
import Cart from "./cart";
import Pegawai from './Pegawai';


const Utama = () => {
  return(
    <Routes>
        <Route path="/" exact element={<Beranda/>} />
        <Route path="/tentangsaya" exact element={<TentangSaya/>} />
        <Route path="/karya" exact element={<Karya/>} />
        <Route path="/kontak" exact element={<Kontak/>} />
        <Route path="/gallery" exact element={<Gallery/>} />
        <Route path="/cart" exact element={<Cart/>} />
        <Route path="/Pegawai" exact element={<Pegawai/>} />

    </Routes>
  )
}

export default Utama;
