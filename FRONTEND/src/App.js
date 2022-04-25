import React from "react";
import Utama from "./components/utama";
import { Link } from "react-router-dom";


class App extends React.Component{
  render(){
    return(
      <div>
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
  <div class="container-fluid">
    <a class="navbar-brand" Link to="/"><h3>Perpus.com</h3> </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link to="/" class="nav-link ">Beranda</Link>
         </li>
         <li class="nav-item ">
          <Link to="/tentangsaya" class="nav-link ">Tentang Saya</Link>
                </li>
                <li class="nav-item 2">
                  <Link to="/karya" class="nav-link ">Karya</Link>
                </li>
                <li class="nav-item ">
                  <Link to="/kontak" class="nav-link ">Kontak</Link>
                </li>
                <li class="nav-item ">
                  <Link to="/gallery" class=" nav-link ">Gallery</Link>
                </li>
                <li class="nav-item ">
                  <Link to="/Cart" class=" nav-link ">Cart</Link>
                </li>
                <li class="nav-item ">
                <Link to="/Pegawai" class="nav-link">Daftar Pegawai</Link> 
                </li>
 

          </ul>
    </div>
  </div>
</nav>

      <div>
        <p class="mt-5"><Utama /></p>
      </div>
    </div>
    )
  }
}

export default App;
